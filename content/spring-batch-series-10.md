스프링배치 연재 10편: JobLauncher와 Job, Step

## JobLauncher

JobLauncher는 이름 그대로 배치 Job을 실행시키는 역할을 한다. 해당 인터페이스를 살펴 보면 Job과 그 Job을 실행시키는데 쓰이는 변수인 JobParameters 클래스만을 파라미터로 받는 run메소드만이 정의되어 있다.

```java
public interface JobLauncher {
  JobExecution run(Job job, JobParameters jobParameters) throws JobExecutionAlreadyRunningException, JobRestartException;
}
```

리스트 12 : JobLauncher 인터페이스

기본 구현 클래스로는 SimpleJobLauncher가 제공된다. 이를 이용한 설정은 다음과 같다.

```xml
<bean id="jobLauncher" class="org.springframework.batch.core.launch.support.SimpleJobLauncher">
  <property name="jobRepository" ref="jobRepository" />
  <property name="taskExecutor">
    <bean class="org.springframework.core.task. SyncTaskExecutor " />
  </property>
</bean>
```

리스트 13 : SimpleJobLauncher 설정

jobRepository 속성은 위에서 계속 언급한 그 JobRepository 인터페이스를 구현한 클래스가 삽입된다.

taskExecutor는 Job실행을 어떤 방식으로 할 것인지를 지정할 수 있는 속성으로 org.springframework.core.task.TaskExecutor를 구현한 클래스가 들어가야 한다. TaskExecutor는 “void execute(Runnable task)” 메소드 하나만을 가지는 단순한 인터페이스로 JDK 1.5의 Executor 인터페이스와 같은 메소드 시그니처를 가진다. 스프링의 Core 패키지에서는 JDK 1.4와의 호환성을 위해서 이 인터페이스가 따로 분리되었다고 한다.

taskExecutor를 이용해서 Job을 동기적, 혹은 비동기적으로 실행할 수 있다. 별도로 설정하지 않으면 SyncTaskExecutor가 디폴트 클래스로 설정되어서 동기적으로 실행된다. 비동기적 방식으로 실행을 원할 때는 SimpleAsyncTaskExecutor 클래스를 지정한다. 대부분의 배치Job이 스케쥴러나 command line을 통해 실행되기 때문에 동기적 실행방식으로 해도 무난하겠지만, 만약 Job의 실행 이벤트가 웹application을 통해 전달되는 경우가 있다면 비동기적으로 실행되어야 할 것이다. 배치Job의 특성상 처리 시간이 오래 걸리는 작업이 많을 것이고, 그 시간동안 사용자가 웹브라우저에서 모래 시계를 보고 기다리게 하는 것은 바람직하지 못한 일이다. 사용자가 기다림을 못 참아 창을 닫거나 백스페이스를 누를 경우 어떻게 처리를 해야 할지 고민하는 것도 부담이 되는 작업이다. 피치 못하게 배치성 작성의 실행이 웹어플리케이션을 통하게 될 때는 비동기적으로 처리하고 ‘작업 처리 요청이 되었습니다. 몇 분 뒤에 확인을 해 보시기 바랍니다. ‘정도의 메시지로 사용자에게 이를 알리는 것이 안전한 방식으로 생각된다.

## Job과 Step

실행시킬 작업을 의미하는 Job 인터페이스는 아래 같이 정의된다.

```java
public interface Job {
   String getName();
   boolean isRestartable();
   void execute(JobExecution jobexecution)    throws JobExecutionException;
}
```

리스트 14 : JOB 인터페이스

해당 작업의 이름과 재시작 가능성여부의 속성을 반환하는 메소드와 작업을 실행시키는 excute메소드가 있다.

역시 기본 구현 클래스로 SimpleJob 클래스가 제공이 되고, jobRepository가 그 속성으로 들어간다. 아래와 같이 abstract한 bean 설정으로 해두고, 실제적인 Job들을 설정할 때 parent로 이를 활용하면, 반복적인 코드가 없는 설정을 할 수 있다.

```xml
<bean id="simpleJob" class="org.springframework.batch.core.job.SimpleJob" abstract="true">
  <property name="jobRepository" ref="jobRepository" />
</bean>
```

리스트 15 : parent로 쓰기 위한 simpleJob의 설정

스프링배치는 Job을 실행하는 것이 핵심적인 역할인데도, 실제적으로 Job설정에서는 크게 할 일이 없다. 대신 실제적인 수행 작업들은 SimpleJob이 가지고 있는 Step 들의 List를 통해 이루어 진다.

```java
public interface Step {
   String getName();
   boolean isAllowStartIfComplete();
   int getStartLimit();
   void execute(StepExecution stepexecution)   throws JobInterruptedException;
}
```

리스트 16 : STEP 인터페이스

이 Step 인터페이스를 구현하고 있는 클래스 중에 ItemOrientedStep라는 클래스가 있다. 지난달 연재에 많은 지면을 할애해서 설명했던 Item이라는 존재가 이 클래스를 통해 연결이 되는 것이다. 즉, 이 클래스가 Spring-batch-core 모듈과 Spring-batch-infrastructure 모듈을 있는 다리 역할을 한다고 볼 수 있다. ItemOrientedStep은 SimpleStepFactoryBean이라는 FactoryBean을 통해서 생성을 할 수 있다. Job과 마찬가지로 공통적인 설정인 abstarct로 선언해 두도록 하자.

```xml
<bean id="simpleStep" class="org.springframework.batch.core.step.item.SimpleStepFactoryBean" abstract="true">
  <property name="jobRepository" ref="jobRepository" />
  <property name="commitInterval" value="10" />
</bean>
```

리스트 17 : parent로 쓰기 위한 SimpleStep의 설정

commitInterval 속성은 첫 연재 때 설명한 것처럼, 적절한 transaction 단위를 가지고 가기 위해서 주기적인 commit 건수를 지정할 수 있는 속성이다.

위에서 잡은 abstract bean의 설정을 이용해 Job과 Step을 설정한 예는 다음과 같다.

```xml
<bean id="sampleJob" parent="simpleJob">
  <property name="steps">
    <bean parent="simpleStep">
      <property name="transactionManager" ref=" transactionManager " />
      <property name="itemReader" ref="sampleItemReader " />
      <property name="itemWriter" ref=" sampleItemWriter "/>
    </bean>
  </property>
</bean>
```

리스트 18 : Job과 Step의 설정 예

simpleJob의 steps속성은 java.util.List형이므로  여러 개의 Step설정이 당연히 가능하다. 그리고 Step설정에서의 itemReader와 itemWriter속성은 지난 시간에 나왔던 FlatFileItemReader등의 클래스가 들어가면 된다.

위의 설정만을 본다면 ItemOrientedStep이 직접 itemReader와 itemWriter를 멤버변수로 가지고 있는 것처럼 보일 수도 있겠지만, 내부의 실제적인 구현은 중간에 itemHandler라는 멤버변수가 itemReader와 itemWriter를 소유하고 있는 형태로 되어있다. SimpleStepFactoryBean을 사용한 설정이기에 보다 단순화된 구조로 설정이 가능한 것이다.

배치처리의 성격에 따라서는 이렇게 ItemReader와 ItemWriter를 활용한 구조가 맞지 않는 경우도 있을 것이다. 예를 들어 단순히 DB의 procedure호출만으로 끝나는 배치처리가 있다면 단순히 메소드 하나로 기능을 구현하고 싶어질 것이다.  그런 배치 프로그램을 위해서 TaskletStep이라는 클래스가 있고, TaskletStep이 내부에서 호출을 하는 Tasklet이라는 인터페이스가 정의되어 있다.

```java
public interface Tasklet {
   ExitStatus execute() throws Exception;
}
```

리스트 19 : tasklet 인터페이스

마찬가지로 taskletStep은 abstract한 bean으로 설정해 주면 편리하다.

```xml
<bean id="taskletStep" class="org.springframework.batch.core.step.tasklet.TaskletStep" abstract="true">
  <property name="jobRepository" ref="jobRepository" />
</bean>
```

아래 예는 스프링배치의 샘플프로젝트에서 제공되는 SystemCommandTasklet클래스를 이용해서 “echo hello”라는 명령어를 5초동안의 timeout시간을 두고 실행시키는 설정의 예이다. ItemOrientedStep과 마찬가지로 steps 속성 아래 직접 넣거나 `<ref bean=" helloStep "/>`의 형식으로 참조를 시켜서 Job에 포함시킬 수 있다.

```xml
<bean id="helloStep" parent="taskletStep">
  <property name="tasklet">
    <bean class="org.springframework.batch.sample.tasklet.SystemCommandTasklet">
      <property name="command" value="echo hello" />
      <property name="timeout" value="5000" />
    </bean>
  </property>
</bean>
```

샘플프로젝트에는FileDeletingTasklet, SystemCommandTasklet, DummyMessageSendingTasklet 등의 예제가 있어서 이를 참조할 수 있다. Tasklet을 구현한 클래스에서 업무DB에 접근하는 DAO를 삽입해서 쓸 수도 있을 것이다.

이렇게  Job을 구성하기 위해서는 많은 구성요소가 필요한 것 같지만, 실제로 코딩해야 할 클래스들은 ItemReader나 ItemWriter, Tasklet에 불과한 것을 알 수 있다. 그리고 ItemReader, ItemWriter도 전형적인 읽기와 쓰기 작업이라면 기본 제공 클래스를 이용한 설정으로 구성이 가능하기 때문에, 최종 개발자가 작성한 코드는 더욱 줄어들 수 있다.

## Command Line에서의 Job 실행

드디어 지금까지의 구성요소들을 조합해 배치잡을 실행해 볼 수 있는 방법이 나온다.

CommandLineJobRunner라는 클래스를 이용하면 main 메소드가 포함된 일반적인 java application처럼 스프링배치의 Job들을 실행할 수 있다.

```sh
java CommandLineJobRunner  [설정파일명] [job이름]
```

리스트 20 : CommandLineJobRunner  실행 형식

물론 지정한 설정파일에는 JobRepository, JobLauncher, Job 등의 구성요소들의 다 정의되어 있거나 정의된 다른 xml파일들의 import되어 있어야 할 것이다. 배치 Job 실행에 필요한 매개변수를 넘기고 싶을 때는 job이름 뒤에 [변수명=값]의  형태로 적어주면 된다. 여기에 지정된 값들을 JobParameters 클래스들로 접근이 가능하고, JobRepository에 의하여 기록된다. 여러 개의 변수가 지정이 가능하므로 Job이름 뒤의 매개변수가 들어갈 공간들은 전부 JobParameters 지정을 위해서 쓰인다고 볼 수 있다. JobParameters 객체는 JobInstance. getJobParameters() 메소드나 StepExcution. getJobParameters() 메소드를 통해서 얻을 수 있다.

개념적으로 본다면 한번의 논리적 Job실행 단위인 JobInstance는 job configuration과 대응되는 단위인 Job과 JobParameters의 결합체이다. 즉 하나의 JobIntance가 다른 JobIntance와 다른 성격을 가질 수 있는 것은 JobParameters에 의해서 결정된다고 볼 수 있다.

## 스케쥴러를 이용한 실행

스프링 배치에서는 별도의 스케쥴러가 제공되지는 않고 Cron이나 Quarz를 이용해서 실행스케쥴을 설정할 수 있다. Cron을 활용한다면 위에서 설명한 command line에서의 명령어를 crontab에 등록하면 될 것이다.

샘플프로젝트에서 예시로 나와있는 Quartz를 이용한 설정은 아래와 같다. 스프링에서 제공되는 Quartz 지원 클래스들을 활용하는 것이다.

```xml
<bean class="org.springframework.scheduling.quartz.SchedulerFactoryBean">
  <property name="triggers">
    <bean id="cronTrigger" class="org.springframework.scheduling.quartz.CronTriggerBean">
      <property name="jobDetail" ref="jobDetail" />
      <property name="cronExpression" value="0/10 * * * * ?" />
    </bean>
  </property>
</bean>

<bean id="jobDetail" class="org.springframework.scheduling.quartz.JobDetailBean">
  <property name="jobClass" value="org.springframework.batch.sample.quartz.JobLauncherDetails" />
  <property name="group" value="quartz-batch" />
  <property name="jobDataAsMap">
    <map>
      <entry key="jobName" value="footballJob"/>
      <entry key="jobLocator" value-ref="jobRegistry"/>
      <entry key="jobLauncher" value-ref="jobLauncher"/>
    </map>
  </property>
</bean>

<bean id="jobRegistry" class="org.springframework.batch.core.configuration.support.MapJobRegistry" />
```

리스트 21 : QUARZ를 이용한 스케쥴링

JobLauncherDetails 클래스는 org.springframework.scheduling.quartz.QuartzJobBean을 상속한 클래스로 jobLocator에서  jobName을 키로 해당 Job을 얻어와서 jobLauncher를 통해 실행을 시키는 절차를 수행한다. cronTrigger의 cronExpression속성은 cron과 똑 같은 형식으로 스케쥴을 지정할 수 있게 되어 있다.

JobLocator 인터페이스는 Job객체를 얻어올 수 있는 저장소를 확장성 있게 제공하기 위한 인터페이스이다.

```java
public interface JobLocator {
  Job getJob(String name) throws NoSuchJobException;
}
```

리스트 22 : JobLocator 인터페이스

위의 예제에서는 단순히 메모리에 등록하고 불러오는 MapJobRegistry를 활용하도록 되어 있으나, 필요에 따라 이 인터페이스를 구현해서 DB, Naming Server 등을 활용한 클래스를 만들 수 있을 것이다.

정상혁

## Related

- [[spring-batch-series]]
