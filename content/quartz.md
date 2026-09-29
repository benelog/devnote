- <https://homoefficio.github.io/2019/09/28/Quartz-스케줄러-적용-아키텍처-개선-1/>
- <https://homoefficio.github.io/2019/09/29/Quartz-스케줄러-적용-아키텍처-개선-2/>
- <https://homoefficio.github.io/2019/09/29/Quartz-스케줄러-적용-아키텍처-개선-3/>

## Quartz

Spring 에서의 Quartz 지원클래스들

- org.springframework.scheduling.quartz.JobDetailBean
- org.springframework.scheduling.quartz.SimpleTriggerBean
- org.springframework.scheduling.quartz.CronTriggerBean
- org.springframework.scheduling.quartz.SchedulerFactoryBean
- org.springframework.scheduling.MethodInvokingJobDetailFactoryBean

- <http://www.ibm.com/developerworks/java/library/j-quartz/>
- <http://swik.net/OSGi/del.icio.us%2Ftag%2FOSGi/code.pst+%22+Blog+Archive+%22+OSGi+-+Spring+Quartz+job/b8qee>

### Clutering

- <http://www.codespot.net/blog/2010/12/quartz-where/>

### Code

```java
  public boolean startJob(final JobDetail jobDetail, final Trigger trigger) {

    try { // If we got one already with the same name... overwrite it.
      if (sched.getJobDetail(jobDetail.getName(), Scheduler.DEFAULT_GROUP) != null) {
        deleteJob(jobDetail.getName(), Scheduler.DEFAULT_GROUP);
      }
      sched.scheduleJob(jobDetail, trigger);
      OutputStream feedbackOutputStream = getFeedbackOutputStream();
      if (feedbackOutputStream != null) {
        feedbackOutputStream.write(Messages.getString("JobSchedulerComponent.INFO_0001").getBytes()); //$NON-NLS-1$
      }
    } catch (SchedulerException e) {
      error(e.getLocalizedMessage());
      return false;
    } catch (IOException e) {
      error(e.getLocalizedMessage());
      return false;
    }
    return true;
  }

  public boolean suspendJob(final String jobName, final String groupName) {
    try {
      sched.pauseJob(jobName, groupName);
    } catch (SchedulerException e) {
      error(e.getLocalizedMessage());
      return false;
    }
    return true;
  }

  public boolean deleteJob(final String jobName, final String groupName) {
    try {
      sched.deleteJob(jobName, groupName);
    } catch (SchedulerException e) {
      error(e.getLocalizedMessage());
      return false;
    }
    return true;
  }

  public boolean resumeJob(final String jobName, final String groupName) {

    try {

      sched.resumeJob(jobName, groupName);
    } catch (SchedulerException e) {
      error(e.getLocalizedMessage());
      return false;
    }
    return true;

  }

}
```

```java
    private Scheduler getSchedulerHandle(ServerModel serverModel) throws SchedulerException {
        Scheduler sche = null;
        if (isLocalHost(serverModel.getIp(), serverModel.getService())) {
            sche = localSche;
        } else {
            DirectSchedulerFactory sf = DirectSchedulerFactory.getInstance();
            sche = sf.getScheduler(serverModel.getQualifiedName());
            /*
             * if the shcheduler is not created yet.
             */
            if (sche == null) {
                sf.createRemoteScheduler(serverModel.getQualifiedName(), DirectSchedulerFactory.DEFAULT_INSTANCE_ID,
                    serverModel.getQualifiedName(), serverModel.getIp(), this.getPort());
                sche = sf.getScheduler(serverModel.getQualifiedName());
            }
        }
        if (sche == null) {
            throw new SchedulerException("can't find the scheduler");
        }
        return sche;
    }
```

### 스케쥴러 생성

```java
Scheduler sched = QuartzSystemListener.getSchedulerInstance();

StdSchedulerFactory sf = new StdSchedulerFactory();
sf.initialize(prop);
localSche = sf.getScheduler();
```

JobStore

### Listener

TriggerListener, JobListener, SchedulerListener

## Quartz Spring

- extends QuartzJobBean
- SimpleTriggerBean
- CronTriggerBean

### Spring활용

- Trigger->jobDetail(org.quartz.JobDetail)
- JobDetailBean은 extends JobDetail
- jobDataAsMap을 통해 Job
- QuartzJobBean은 Job을 implement

org.springframework.scheduling.quartz.MethodInvokingJobDetailFactoryBean

org.springframework.scheduling.quartz.JobDetailBean

을 상속한 클래스 또는

```xml
<bean class="org.springframework.scheduling.quartz.SchedulerFactoryBean">
  <property name="triggers">
    <list>
      <ref bean="testCronTriggerBean" />
    </list>
  </property>
</bean>

<bean id="testCronTriggerBean"
      class="org.springframework.scheduling.quartz.CronTriggerBean">
  <property name="jobDetail">
    <bean id="jobDetailBeanExternalAPIReq"
          class="org.springframework.scheduling.quartz.JobDetailBean">
      <property name="jobClass" ref="testJob"/>
    </bean>
  </property>
  <property name="cronExpression" value="0/30 * * * * ?" />
</bean>

<bean id="testJob" class="com.benelog.job.TestJob">
</bean>
```

---

```xml
<bean id="testJobCronTriggerBean"
      class="org.springframework.scheduling.quartz.CronTriggerBean">
    <property name="jobDetail">
        <bean
            class="org.springframework.scheduling.quartz.MethodInvokingJobDetailFactoryBean">
            <property name="targetObject" ref="testJob"/>
            <property name="targetMethod" value="execute"/>
        </bean>
    </property>
    <property name="cronExpression" value="0/30 * * * * ?" />
</bean>

<bean id="testJob" class="com.benelog.TestJob">
    <property name="schedulerMtrDAO" ref="schedulerMtrDAO" />
</bean>
```

## Related
- [[cron]]
- [[job-scheduling]]
- [[spring]]
