스프링배치 연재 9편: JobRepository

## JobRepository

스프링배치에서는 배치처리 중의 정보를 저장하기 위해 JobRepository라는 인터페이스를 사용한다. 스프링 배치의 실행 전반에 걸쳐 필수적인 역할을 하고, 다른 구성요소의 설정에도 삽입되기 때문에, JobRepository에 대해서 명확히 이해를 하고 넘어가는 것이 Job실행의 첫걸음이라고 할 수 있다. 이 인터페이스의 메소드들을 보면 알 수 있듯이 한번의Job의 실행 시도를 나타내는 JobExecution 클래스, 그 Job을 구성하는 단계인 Step의 실행시도인 StepExecution 클래스, 그리고 key-value쌍으로 값을 보관할 수 있는 공간인 ExecutionContext과 같은 구성요소들이 가지고 있는 정보들을 저장하고 갱신하는 역할을 한다.

```java
public interface JobRepository{
    public JobExecution createJobExecution(Job job, JobParameters jobparameters) throws .....;
    public void saveOrUpdate(JobExecution jobexecution);
    public void saveOrUpdate(StepExecution stepexecution);
    public void saveOrUpdateExecutionContext(StepExecution stepexecution);
    public StepExecution getLastStepExecution(JobInstance jobinstance, Step step);
    public int getStepExecutionCount(JobInstance jobinstance, Step step);
}
```

리스트 1 : JobRepository 인터페이스

JobRepository의 기본 구현 클래스로는 SimpleJobRepository 클래스가 제공된다. 이 클래스는 멤버변수로 스프링배치의 도메인 객체들의 Persistency를 유지하기 위한 DAO(Data Access Object)들을 가지고 있다. 그 DAO멤버들은JobInstanceDao, JobExecutionDao, StepExecutionDao의 인터페이스들로 정의된다.. SimpleJobRepository의 생성자를 보면 이들 DAO를 매개변수로 받게 되어 있는 것을 확인할 수 있다.

```java
public SimpleJobRepository(JobInstanceDao jobInstanceDao, JobExecutionDao jobExecutionDao, StepExecutionDao stepExecutionDao) {
  this.jobInstanceDao = jobInstanceDao;
  this.jobExecutionDao = jobExecutionDao;
  this.stepExecutionDao = stepExecutionDao;
}
```

리스트 2 : SimpleJobRepository 의 생성자

스프링에 대한 기본지식이 있다면 application context를 설정하는 파일에서 아래와 같이 생성자 injection을 통해 이 의존관계를 삽입할 수 있다는 것을 쉽게 떠올릴 것이다..

```xml
<bean id="jobRepository"
 class="org.springframework.batch.core.repository.support.SimpleJobRepository">
  <constructor-arg ref="jobInstanceDao" />
  <constructor-arg ref="jobExecutionDao" />
  <constructor-arg ref="stepExecutionDao" />
</bean>
```

리스트 3 : 생성자 삽입을 이용한 JobRepository 설정

이 각각의 DAO의 구현 클래스들로 그 정보를 DB에 저장하는 JDBC활용 클래스들(JdbcJobExecutionDao, JdbcJobInstanceDao, JdbcStepExecutionDao)과 메모리에 저장하는 Map활용 클래스 (MapJobExecutionDao, MapJobInstanceDao, MapStepExecutionDao)들이 제공된다.

배치처리의 실행정보들의 저장소로 메모리만 사용한다면 단순히 해당 클래스를 bean으로 등록해주는 것 만으로 사용이 가능하다. 예를 들면jobInstanceDao는 아래와 같이 설정을 한다.

```xml
<bean id="jobInstanceDao"
  class="org.springframework.batch.core.repository.dao.MapJobInstanceDao" />
```

리스트 4 : MapJobInstanceDao로 jobInstanceDao를 설정

JdbcJobInstanceDao,  JdbcStepExecutionDao 클래스도 같은 방식으로 선언을 하면 된다.

스프링배치에서는 JobRepository를 생성을 도와주는 FactoryBean클래스가 제공되어서 이를 사용하면 더욱 설정이 가능하다. 이에 따라 JobRepository에서 사용하는 DAO들을 모두 Map방식으로 쓰고 싶다면, 따로 DAO클래스들을 bean으로 선언할 필요 없이 MapJobRepositoryFactoryBean를 사용해서 하나의 bean 선언만으로 설정을 끝낼 수 있다. 아래와 같은 설정 방식은 스프링배치 버전 1.1.0 이후에서 지원된다.

```xml
<bean id="jobRepository"
  class="org.springframework.batch.core.repository.support.MapJobRepositoryFactoryBean" />
```

리스트 5 : MapJobRepositoryFactoryBean를 이용한 jobRepository설정

여러 개의 배치Job이 실행되는 실무 환경이라면 배치잡의 실행정보를 관리하기 위해 DB테이블을 설계해서 배치처리의 중간중간마다 배치실행과 관련된 메타데이터를 저장하는 경우가 많다. JobRepository에서 Jdbc계열 DAO를 쓰면 따로 그런 테이블을 설계하는 노력이나 메타데이터 저장 기능을 구현하지 않아도 된다.  Map DAO들을 쓸 때보다 다소 설정할 것이 늘어나지만 비슷한 기능을 개발자 스스로 만들 때 드는 노력에 비하면 아주 가벼운 작업이다.

JobRepository에서 쓰는 저장소로 DB 를 사용하기 위해서는 먼저 저장할 정보를 담을 테이블들이 생성되어 있어야 한다. 그 테이블들을 생성하는 스크립트는 spring-batch-core-버전.jar 파일내에 포함되어 있고, 스프링배치의 SVN저장소에서도 다운 받을 수도 있다. Spring-batch-core 프로젝트의 src/main/resource 폴더에서 schema-(DB명).sql의 파일명을 찾을 수 있을 것이다. 최근 스프링배치가 1.1.0으로 버전업 되면서 생긴 테이블 스키마의 변화가 생겼는데, 이에 따른 마이그레이션을 지원하는 스크립트도 제공된다.

(SVN저장소에서의 위치는 <https://springframework.svn.sourceforge.net/svnroot/springframework/spring-batch/trunk/spring-batch-core/src/main/resources/>)

DB를 사용할 경우 JobRespository에 삽입될 jobInstanceDao 의 설정은 아래와 같이 할 수 있다.

```xml
<bean id="jobInstanceDao"
 class="org.springframework.batch.core.repository.support.dao.JdbcJobInstanceDao" >
  <property name="jdbcTemplate" ref="jdbcTemplate" />
  <property name="jobIncrementer" ref="jobIncrementer" />
</bean>
```

리스트 6 : JdbcJobInstanceDao로 jobInstanceDao를 설정

JdbcJobInstanceDao 는 jdbcTemplate과 jobIncrementer 를 멤버객체로 가진다.

JDBC API 의 보다 편한 사용을 도와주는 JdbcTemplate클래스는 기존 스프링 사용자라면 친숙할 것이다.  JdbcTemplate은 dataSource속성을 통해 DB로부터 connection을 받아온다. 많이 쓰이고 있는 apache commons DBCP의 BasicDataSource를 활용한 설정은 아래와 같다.

```xml
<bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
  <property name="dataSource" ref="dataSource" />
</bean>
<bean id="dataSource" class="org.apache.commons.dbcp.BasicDataSource">
  <property name="driverClassName" value="${batch.jdbc.driver}" />
  <property name="url" value="${batch.jdbc.url}" />
  <property name="username" value="${batch.jdbc.user}" />
  <property name="password" value="${batch.jdbc.password}" />
</bean>
```

리스트 7 : jdbcTemplate과 dataSource의 설정

“${batch.jdbc.url}”와 같이 설정된 부분은 PropertyPlaceholderConfigurer 같은 클래스를 이용해서 별도의 property 파일을 통해 읽어오거나, 간단한 테스트라면 직접 치환해서 입력해볼 수 있다. JdbcJobInstanceDao,  JdbcStepExecutionDao 클래스도 같은 방식으로 선언을 하면 된다.

JdbcJobInstanceDao 의 jobIncrementer 멤버필드를 비롯해 stepExecutionDao는 stepExecutionIncrementer, jobExecutionDao는 jobExecutionIncrementer라는 속성을 가진다. 이들 Incrementer멤버들은 DB에서 각각의 도메인 객체와 대응되는 테이블에 row를 생성하는 과정에서 필요한 유일한 key값을 구하기 위해서 사용되며, 그 타입은 DataFieldMaxValueIncrementer로 선언되어 있다. 아래에서 이 타입의 인터페이스를 볼 수 있듯이, 단순히 DB에서 키로 쓸 int, long, String 형의 값들을 겹치지 않게 가지고 오는 역할만 한다.

```java
public interface DataFieldMaxValueIncrementer {
 public int nextIntValue() throws DataAccessException;
 public long nextLongValue() throws DataAccessException;
 public String nextStringValue() throws DataAccessException;
}
```

리스트 8 : DataFieldMaxValueIncrementer 인터페이스

스프링배치에서는 기본적으로 Db2, Derby, Hsql, Mysql, Oracle, Postgres, Sqlserver, Sybase 등의 주요 DB에 대한 DataFieldMaxValueIncrementer의 구현클래스가 제공되고 있다. 기본 구현클래스가 제공되지 않는 DB를 사용할 경우라도 다른 구현 클래스들을 참조하면 어렵지 않게 사용하는 DB의 특성에 맞는 Increamenter를 만들 수 있을 것이다.

이런 JDBC를 사용하는 JobRepository의 설정도 JobRepositoryFactoryBean을 이용하면 간단하게 사용할 수 있다.

```xml
<bean id="jobRepository"
  class="org.springframework.batch.execution.repository.JobRepositoryFactoryBean"
  <property name="databaseType" value="hsql" />
  <property name="dataSource" ref="dataSource" />
  <property name="transactionManager" ref="transactionManager" />
  <property name="IsolationLevelForCreate" value="ISOLATION_REPEATABLE_READ" />
</bean>
```

리스트 9 : JobRepositoryFactoryBean를 이용한 jobRepository설정

각각의 DAO에 대한 설정이 따로 필요 없어졌는데, databaseType의 값과 dataSource로 설정된 객체를 이용해서 필요한 JDBC DAO들을 다 만들어 준다. DAO에서 키값 생성을 위한 increamenter들은 내부적으로 DataFieldMaxValueIncrementerFactory을 이용해서 DB타입값에 따라 넣어주게 되어 있다. DatabaseType 속성의 값에 따라서 생성되는 DataFieldMaxValueIncrementer의 구현 클래스들은 아래 표에 정리되어 있다.

| DatabaseType | DataFieldMaxValueIncrementer |
|---|---|
| Db2 | DB2SequenceMaxValueIncrementer |
| Derby | DerbyMaxValueIncrementer |
| Hsql | HsqlMaxValueIncrementer |
| Mysq | MySQLMaxValueIncrementer |
| Oracle | OracleSequenceMaxValueIncrementer |
| Postgres | PostgreSQLSequenceMaxValueIncrementer |
| Sqlserver | SqlServerMaxValueIncrementer |
| Sybase | SybaseMaxValueIncrementer |

리스트 10 : DataFieldMaxValueIncrementerFactory를 통해서 생성되는 DataFieldMaxValueIncrementer

소스를 보면 알 수 있겠지만 databaseType값은 String형태이고 equals메소드를 통해 Incrementer클래스를 찾으므로 대소문자를 구분하게 되어 있다. 그리고, 표에 나와 있는 DatabaseType이 아닌 다른 값이 들어간다면 Exception이 발생하게 되어 있다.

그리고 JobRepositoryFactoryBean  transactionManager와  IsolationLevelForCreate 속성을 통해서 DB 트랜잭션에 관련된 설정이 이루어 지므로, 별도로 AOP를 이용해서 JobRepository에 필요한 트랜잭션 설정이 필요 없게 되었다. transactionManager의 설정은 아래와  같이 일반적으로 스프링에서 쓰던 방식대로 하면 된다.

```xml
<bean id="transactionManager"
  class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
  <property name="dataSource" ref="dataSource" />
</bean>
```

리스트 11 : transactionManager설정

IsolationLevelForCreate 속성은 따로 지정하지 않을 경우 디폴트 값인 ISOLATION_SERIALIZABLE으로 설정된다.

정상혁

## Related

- [[spring-batch-series]]
