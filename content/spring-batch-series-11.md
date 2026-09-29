스프링배치 연재 11편: 재시작과 재시도

## Job의 재시작 관련 속성

Job의 인터페이스를 보면 isRestartable 이라는 메소드가 선언되어 있는 것을 볼 수 있다.  스프링배치가 제공하는 기본적인 구현클래스인 SimpleJob에서는 setRestartble (boolean)메소드를 통해서 isRestartable에서 반환할 값을 boolean값으로 선언해 줄 수 있다. 이 값은 같은 JobRepository안에 JobInstace가 존재할 시 한 번 더 실행하는 것을 허용할지 여부를 결정하는 속성이다. 명시적으로 설정이 없을 경우의 디폴트값은 false이다.

Job은 JobLaucher에 의해 실행되고, JobLauncher 안에서는 JobRepository를 통해서 JobExecution을 생성한다. 이 때 호출되는 JobRepository안의  createJobExecution메소드 내부에서는 이미 같은 JobInstance가 있을 때 현재 실행하고자 하는 Job이 restartable하지 않다면 JobRestartException을 발생하게 한다. 앞의 연재에 나왔던  각 구성요소들의 개념을 다시 떠올려보면 JobInstance는 논리적인 Job 실행이고 JobExecution은 물리적인 한번의 Job의 실행 시도임을 기억할 수 있을 것이다.

리스트1에서 SimpleJobRepository의 createJobExecution의 내부코드를 보면 이 과정을 직접 확인할 수 있다.

```java
JobInstance jobInstance = jobInstanceDao.getJobInstance(job, jobParameters);
……….
if(jobInstance != null) {
  if(!job.isRestartable())
    throw new JobRestartException("JobInstance already exists and is not restartable");
```

리스트 1 : SimpleJobRepository의 createJobExecution메소드 내부중 일부

첫째 줄에서 보이듯이 같은 JobInstance가 존재하는지를 찾는 것은 JobInstanceDao 에 의해 이루어 진다. JobInstanceDao 의 구현체들인 MapJobInstanceDao, JdbcJobInstanceDao에서 둘 다 Job의 이름과 JobParameter의 값들로 JobInstance의 동일성을 식별하게 되어 있다. DB테이블에 Meta데이터를 관리하는 JdbcJobInstanceDao에서는 JOB_NAME컬럼과  JOB_KEY 컬럼값으로 JobInstance를 인식하게 되어 있고, JOB_KEY 컬럼에 들어가는 값은 JobParameter로 넘어온 값들의 조합으로 이루어 진다. 같은 JobParameter를 가지는 Job을 반복해서 실행하고 Job의 restable이 false라면 JobRestartException을 받을 수 있음을 유의해서 이를 의도한 곳에 사용할 수 있어야 할 것이다.

JobIntanace의 논리적인 개념에 일치하게 JobParameter를 선택하는 것도 중요하다. 매일 한번 실행되는 배치잡이고, 오늘날짜로 입력된 데이터를 처리하는 배치잡이라면 무난하게 JobParameter에 오늘날짜를 넣을 수 있다. Job실행의 핵심 파라미터는 JobParameter에 포함시켜야지 약간의 코딩편의를 위해 DB쿼리에서 바로 현재 날짜를 얻어오는 방식은 피해야 할 것이다.

## Step의 재시작관련 속성

Step의 인터페이스에서는 startLimit와 allowStartIfComplete 속성의 getter 메소드가 있고, ItemOrientedStep와 TaskletStep같은 구현클래스들에서 setter메소드를 통해 getter에서 반환될 값을 설정한다.

startLimit의 디폴트값은 Integer.MAX_VALUE로, 아무 설정이 없으면 현실적으로 startLimit속성의 제한에 안 걸린다고 보면 된다. Step이 실행될 때 startLimit값이 지금 실행하고 있는 JobInstance내부에서 Step이 실행된 횟수보다 크지 않으면 StartLimitExceededException을 발생시킨다.  즉 startLimit가 2로 지정되어 있으면 3번째 실행에서 Exception을 내는 것이다.

allowStartIfComplete 속성은 그 Step을 포함하는 JobInstance가 재시도 중일 때,  앞 선 시도에서 성공한 Step이라도 다시 실행을 시킬 것인지를 지정하는 속성이다. 이 것이 true로 되어 있다면 Job을 재시도 시에도 이 Step을 건너뛰지 않는 것이다.  디폴트값은 false이므로 별다른 설정이 없다면 같은 JobInstance내에서 한번 성공한 StepExecution이 있다면 그 Step은 반복해서 실행되지 않는다.

## 건너뛰거나 재시도할 Exception 지정하기

배치처리 내에서 항상 모든 Exception이 전체 Job을 멈추는 것이 바람직하지 않은 경우도 많다. 예를 들어, 건건이 독립적인 데이터를 플랫파일을 읽어서 데이터베이스에 입력할 때, 파싱 중 에러가 난 플랫파일은 처리를 건너 뛰고 따로 그 기록을 남긴 후에  그 다음 파일을 파싱해서 한 건이라도 더 처리하는 것이 나은 업무상황도 있을 것이다.

SkipLimitStepFactoryBean을 이용한다면 복잡한 try catch 문 없이 설정만으로 Exception의 처리정책을 간단하게 지정할 수 있다. 가령 플랫파일 파싱 중에 생길수 있는 Exception인  FlatFileParseException은 10번까지는 그냥 넘어가도록 하려 리스트 2처럼 Step을 설정하면 된다.

```xml
<bean  id="skipSample"   class="org.springframework.batch.core.step.item.SkipLimitStepFactoryBean">
  <property name="skipLimit" value="10" />
  <property name="itemReader" ref="flatFileItemReader" />
  <property name="itemWriter" ref="itemWriter" />
  <property name="skippableExceptionClasses"
    value="org.springframework.batch.item.file.FlatFileParseException">
  </property>
</bean>
```

리스트 2 : 건너뛸 Exception지정 (출처 : 스프링배치 레퍼런스 매뉴얼)

skippableExceptionClasses속성은 java.lang.Class 클래스의 배열로 선언되어 있으므로 `<list>`와 `<value>` 태그를 이용해서 여러 개를 지정할 수도 있다. skipLimit속성으로 허용할 수 있는 skip의 한도를 정한다. 디폴트 값이 0이므로 skipLimit를 명시적으로 지정하지 않으면 skip관련 속성들의 지정이 의미가 없어진다.

건너뛰어야 될 Exception을 명시적으로 지정하지 않고, 반드시 현재 Step의 실행을 중단시켜야 할 Exception을 선언하는 방식도 가능하다. 리스트 3처럼  SkipLimitStepFactoryBean의 fatalExceptionClasses속성을 통해서 그것이 가능하다. SkippableExceptionClasses을 java.lang.Exception으로 설정해서 모든 Exception을 다 skip하지만 fatalExceptionClasses에 FileNotFoundException이 지정되어 있기 때문에 파일이 없는 경우에는 해당 Step이 실패하게 되는 것이다.

```xml
<property name="skippableExceptionClasses"    value="java.lang.Exception">
<property name="fatalExceptionClasses"   value="java.io.FileNotFoundException">
```

리스트 3 : 반드시 Step을 실패시킬 EXCEPTION을 명시적으로 지정

한편, 일시적인 이유로 잠시 발생했을 가능성이 큰 Exception에 대해서는 현재 Step 내에서 몇 차례 더 시도를 해보는 것이  효율적일 수 있다. SkipLimitStepFactoryBean의 retryableExceptionClasses속성과 retryLimit속성으로 재시도할 Exception들을 지정할 수있다. 리스트4는 DeadlockLoserDataAccessException에 대해서 3번까지 재시도를 설정하는 예이다.

```xml
<property name="retryableExceptionClasses"  value="org.springframework.dao.DeadlockLoserDataAccessException" />
<property name="retryLimit" value="3" />
```

리스트 4 : 재시도할 Exception 지정

그리고, 스프링의 TransactionAttribute 지정 기능을 이용해서 RollBack을 하지 않을 Exception을 지정할 수도 있다. ItemOrientedStep에 바로 transactionAttribute속성이 들어갈 수 있고, SkipLimitStepFactoryBean이나 SimpleStepFactoryBean에서 이를 선언하는 것이 가능하다.

```xml
<property name="transactionAttribute"  value="+org.springframework.batch.item.validator.ValidationException" />
```

리스트 5 : 트랜잭션 속성 지정

더하기표시(+)뒤에 있는 Exception은 발생시에도 RollBack을 시키지 않도록 지정된 것이다.

### 재시도 정책

재시도 관련 정책들은 RetryPolicy라는 인터페이스를 구현한 클래스로 지정하는데,  위에 나왔던SkipLimitStepFactoryBean에서는setRetryPolicy설정을 통해 이를 직접 설정하는 것도 가능하다.  가령 30초의 제한시간이 넘지 않았을 때만 재시도를 허용하는 정책을 설정한다고 하면 아래와 같이 가능하다.

```xml
<bean  id=”sampleStep"  class="org.springframework.batch.core.step.item.SkipLimitStepFactoryBean">
  <property name="retryPolicy" ref=”timeoutRetryPolicy”/>
</bean>
<bean id=”timeoutRetryPolicy”  class=” org.springframework.batch.retry.policy.TimeoutRetryPolicy”>
  <property name="timeout" value=”30000L”/>
</bean>
```

리스트 6 : 시간 제한의 재시도 정책 설정

단순한 설정을 보여주기 위해서 TimeOutRetryPolicy만 설정을 보여주였지만, 실제적용에서는 여러 개의 retryPolicy가 복잡적으로 쓰이는 경우가 많을 것이다. org.springframework.batch.retry.policy패키지안의 RetryPolicy를 구현한 클래스들은 아래와 같이 정리할 수 있다.

| 클래스 | 설명 |
|---|---|
| AlwaysRetryPolicy | 항상 재시도를 허용함 |
| NeverRetryPolicy | 첫시도만을 허용하고 재시도는 없음. |
| ExceptionClassifierRetryPolicy | Exception에 따라서 다른 내부적으로 다른 RetryPolicy를 적용시켜 줌. |
| TimeoutRetryPolicy | 한도시간 이내에서만 재시도를 허용 |
| SimpleRetryPolicy | 재시도가능한 Exception, 아닌 Exception을 지정해서 지정된 횟수 내에서만 재시도를 허용하는 정책 |
| CompositeRetryPolicy | 여러 개의 RetryPolicy들을 연결해서 호출하여 사용함. |
| RecoveryCallbackRetryPolicy | 앞선 시도에서의 정보를 가지고 있는 재시도 정책 (Stateful함) |

표 1 : 재시도 정책 클래스들

앞에서 나온 리스트3,4의 예제처럼 재시도하거나 꼭 멈추어할 Exception을 지정하는 설정을 하면 SkipLimitStepFactoryBean의 내부에서 ExceptionClassifierRetryPolicy안에 SimpleRetryPolicy 를 엮어서 넣어주는 알아서 작업을 해주게 되어있다.

정상혁

## Related

- [[spring-batch-series]]
