스프링배치 연재 14편: 드라이빙쿼리 방식의 조회와 IBatis활용

## 드라이빙 쿼리 방식의 조회

앞선 연재에서 JdbcCursorItemReader를 이용한 Cursor방식의 조회에 대해서 소개했었다. 전체 데이터를 한꺼번에 메모리에 올리지 않기 때문에 대용량을 처리할 수 있는 방식이지만, DB2와 같이 비관적인(pessimistic) 락을 주로 사용하는 DB에서는 주의해서 사용해야 한다. Pessimistic lock은 레코드가 변경되지 않을 때도 락이 걸릴 수 있는데, Cursor를 사용하는 처리방식이 시간이 오래 걸리는 경우라면 오랫동안 lock을 유지할 수 있는 위험성이 생긴다. 이 것이 염려되는 상황이라면 한꺼번에 키 값만을 먼저 읽어서 메모리에 올린 후 한번에 조회하는 드라이빙 쿼리방식을 검토해 보아야 한다. 한 편으로는 이 방식은 전체 건수+1 만큼의 쿼리를 DB에 요청하게 되어 있으므로, Cursor 방식에 비해 전체 처리시간은 확연히 길어지게 된다. 사용하는 DB와 어플리케이션의 특성을 감안하고, 필요하다면 DBA나 같은 DB를 사용하는 다른 개발자와 충분한 상의를 해보도록 하자. 그리고, 전체 조회건수가 엄청나게 많아서 키값만을 메모리에 한번에 올리는 것조차 불가능한 상황이 올 수 있는지도 검토해보아야 할 것이다.

스프링배치에서는 DrivingQueryItemReader 클래스로 드라이빙 쿼리방식을 사용할 할 수 있다. 이 클래스의 keyCollector라는 속성이 이름 그대로 아이템의 키값을 먼저 읽어오는 역할을 한다. 이 속성은 리스트1과 같은 인터페이스로 선언되어 있다.

```java
public interface KeyCollector {
  List retrieveKeys(ExecutionContext executionContext);
  void updateContext(Object key, ExecutionContext executionContext);
}
```

리스트 1 : KeyCollector 인터페이스

KeyCollector 의 retrieveKeys메소드에서는 키값을 읽어와서 List형태로 반환하는 역할을 하고, updateContext 메소드에서는 작업이 중간에 실패하면 재시도를 위한 정보를 저장하는 작업을 수행하게 된다. 이런 처리를 위해 구현 클래스인 SingleColumnJdbcKeyCollector클래스에서는 재시도 시 실행시키는 쿼리를 담기 위한 restartSql 속성도 가지고 있다.

DB에 player 라는 테이블이 있고, Id라는 컬럼이 이 테이블의 주키값이라면 리스트2와 같이 드라이빙 쿼리를 이용하는 설정을 할 수 있다.

```xml
<bean id="playerReader"
  class="imaso.springbatch.PlayerReader">
  <property name="keyCollector">
    <bean class="org.springframework.batch.item.database.support.SingleColumnJdbcKeyCollector">
      <property name="sql">
         <value> SELECT id FROM player  ORDER BY id
         </value>
      </property>
      <property name="restartSql">
         <value> SELECT id FROM player WHERE id > ? ORDER BY id
         </value>
      </property>
      <property name="keyMapper" ref="playerMapper">
      <property name="jdbcTemplate" ref="jdbcTemplate">
    </bean>
  </property>
</bean>
```

리스트 2 : 드라이빙 쿼리 방식의 조회 설정

첫째 줄의 playerReader빈의 클래스로 지정된 PlayerReader 클래스는 리스트3과 같이 DrivingQueryItemReader를 상속한 클래스의 read메소드 안에서 상세조회 기능을 만들어 준다.

```java
public class PlayerReader extends DrivingQueryItemReader {
    public Object read(){
        Object item = super.read();
        //읽어온 item의 상세조회를 하기 위한 작업을 수행
}
```

리스트 3 : 드라이빙 쿼리를 바탕으로 상세조회를 하는 클래스

jdbcTemplate속성은 DataSource가 그 내부에 연결되어 있는 JdbcTemplate 클래스 설정 bean을 지정한다. keyMapper는 DB에서 조회된 키값인id를 Player테이블을 위한 도메인 오브젝트로 매핑해주기 위한 클래스로 스프링의 RowMapper 인터페이스를 구현하면 된다.

## IBatis의 활용

IbatisDrivingQueryItemReader클래스는 item의 상세 조회를 iBatis를 통해서 할 수 있게 한다. sql쿼리를 직접 지정하지 않고 iBatis의 sql설정파일에 있는 쿼리의 id를 넘기는 것이다. 앞에선 본 playerReader 예제를 iBatis를 활용한 클래스로 재구성하면 리스트4와 같다.

```xml
<bean id="playerReader"   class="imaso.springbatch.PlayerReader">
  <property name="keyCollector" ref="playerKeyCollector">
  <property name="detailsQueryId" value=" selectPlayerDetail "/>
  <property name="sqlMapClient" value=" sqlMapClient "/>
</bean>
```

리스트 4 : IBatis를 이용한 상세조회

detailsQueryId에 들어가는 속성이 sqlMap 설정 파일에 들어가 있는 쿼리의 id이고, sqlMapClient 는 iBatis에서 쓰는 DB접근을 위한 클래스이다. 도메인 오브젝트와의 매핑 등 쿼리실행에 대한 것들은 iBatis의 설정파일 내에서 지정된다.

웹Application에서 스프링과 iBatis를 연결시킬 때와 마찬가지로, sqlMapClient와 Datasource의 설정은 리스트5와 같이 SqlMapClientFactoryBean을 활용하면 된다.

```xml
<bean id="sqlMapClient"
   class="org.springframework.orm.ibatis.SqlMapClientFactoryBean">
  <property name="configLocation" value="classpath:datasource/sql-map-sample.xml" />
  <property name="dataSource" ref="sampleDataSource"/>
</bean>

<bean id="sampleDataSource" class="org.apache.commons.dbcp.BasicDataSource">
  <property name="driverClassName" value="${batch.jdbc.driver}" />
  <property name="username" value="${batch.jdbc.user}" />
  <property name="password" value="${batch.jdbc.password}" />
</bean>
```

리스트 5 : iBatis 관련 스프링 설정

`${batch.jdbc.driver}`처럼 변수로 지정된 부분은 스프링의 PropertyPlaceholderConfigurer클래스를 이용해서 다른 프로퍼티 파일에 지정된 것을 가지고 오거나 Maven의 resource filtering 기능을 이용해서 빌드 시에 개발,운영 등 각 환경에 맞는 값이 엮여지도록 할 수 있다.

KeyCollector를 사용할 때도, IBatisKeyCollector를 통해서 iBatis의 설정파일 속에 있는 쿼리를 가지고 올 수 있다. drivingQueryId라는 속성에 키값만을 조회할 쿼리의 id를 지정해주면 된다.

```xml
<bean id=" playerKeyCollector " class="org.springframework.batch.item.database.support.IbatisKeyCollector">
  <property name="drivingQueryId" value="selectAllPlayerId" />
  <property name="sqlMapClient" ref=" sqlMapClient " />
</bean>
```

리스트 6 : iBatis를 이용한 드라이빙 쿼리

마찬가지로 DB에 데이터를 입력할 때에도 유사하게 iBatis를 쓸 수 있다. 필자가 실무에서 활용하기 위해 만들어본 SimpleIbatisItemWriter 라는 클래스가 리스트7에 나와있다.

```java
public class SimpleIbatisItemWriter extends AbstractItemWriter{
  private String writingQueryId;
  private SqlMapClientTemplate sqlMapClientTemplate;
  public void write(Object item) throws Exception {
    sqlMapClientTemplate.insert(writingQueryId,item);
  }
  public void setSqlMapClient(SqlMapClient sqlMapClient) {
    sqlMapClientTemplate = new SqlMapClientTemplate(sqlMapClient);
  }
  //writingQueryId setter 메소드 생략
}
```

리스트 7 : iBatis를 활용한 DB입력

IBatisKeyCollector와 유사하지만 writingQueryId에 insert문이 들어가 있는 쿼리의 id를 지정해 준다는 것만 차이가 있다.

정상혁

## Related

- [[spring-batch-series]]
