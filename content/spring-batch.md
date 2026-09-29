## 사례

- [Spring Batch 애플리케이션 성능 향상을 위한 주요 팁 / 제2회 Kakao Tech Meet](https://tech.kakao.com/2023/08/01/techmeet-spring-batch/)
  - Writer에서 다건을 병렬처리, UPDATE 몰아서 하기, batchUpdate 활용
  - <https://cheese10yun.github.io/spring-batch-update-performance/>
- [Batch Performance 극한으로 끌어올리기: 1억 건 데이터 처리를 위한 노력 / if(kakao)2022](https://www.youtube.com/watch?v=L9K0l65wMbQ)
  - Read
    - MySQL에서 limit, offset 지정방식의 페이징쿼리는 건수가 늘어갈 때 뒤로 갈수록 느려진다.
    - Cursor 조회로도 대량 데이터 조회 가능. 단 JpaCurSorItemReader는 사용하지 말것
  - Aggregation
    - MySQL에서 group by query 대신 Redis로 집계.command pipeline 을 활용하면 원격 호출 횟수를 최적화 할 수 있음.
  - Write
    - JDBC batchUpdate를 유도할 것
    - JPA는 성능최적화 관점에서 배치와 잘 맞지 않음
  - 배치 구동 환경
    - Spring Cloud Data Flow \* K82를 용해서 batch 스케쥴링, 오케스트레이션, 모니터링을 하고 있음.
- [오픈 소스를 활용한 게임 배치 플랫폼 개선 사례](https://www.slideshare.net/slideshow/ss-39145002/39145002)(NC 소프트)
- [오픈소스를 활용한 Batch 처리 플랫폼 공유](https://www.slideshare.net/slideshow/batch-8508863/8508863) (NHN 김용환 님, 2011 JCO 발표)

## 예제

- <https://github.com/mminella/Pro-Spring-Batch-source-code>
- <https://github.com/mminella/Spring-Batch-Talk>
- <https://github.com/mminella/Spring-Batch-Talk-2.0>

## JavaConfig

<http://blog.codecentric.de/en/2013/06/spring-batch-2-2-javaconfig-part-1-a-comparison-to-xml/>

- [Part 1 : A comparison to XML](http://blog.codecentric.de/en/2013/06/spring-batch-2-2-javaconfig-part-1-a-comparison-to-xml/)
- [Part 2 : JobParameters, ExecutionContext and StepScope ](http://blog.codecentric.de/en/2013/06/spring-batch-2-2-javaconfig-part-2-jobparameters-executioncontext-and-stepscope/)
- [Part 3 : Profiles and environments\</font\>](http://blog.codecentric.de/en/2013/06/spring-batch-2-2-javaconfig-part-3-profiles-and-environments/)
- [Part 4 : Job inheritance](http://blog.codecentric.de/en/2013/06/spring-batch-2-2-javaconfig-part-4-job-inheritance/)
- [Part 5 : Modular configurations](http://blog.codecentric.de/en/2013/06/spring-batch-2-2-javaconfig-part-5-modular-configurations/)
- [Part 6 : Partitioning and Multi-threaded Step](http://blog.codecentric.de/en/2013/07/spring-batch-2-2-javaconfig-part-6-partitioning-and-multi-threaded-step/)

## Transaction

- <https://blog.codecentric.de/en/2012/03/transactions-in-spring-batch-part-1-the-basics/>
- <https://blog.codecentric.de/en/2012/03/transactions-in-spring-batch-part-2-restart-cursor-based-reading-and-listeners/>
- <https://blog.codecentric.de/en/2012/03/transactions-in-spring-batch-part-3-skip-and-retry/>

## Architecture

- <https://blog.codecentric.de/en/2014/11/enterprise-java-batch-best-practice-architecture/>

## Monitoring

- <https://blog.codecentric.de/en/2013/04/monitoring-spring-batch-with-appdynamics/>
- <https://trifork.nl/blog/spring-boot-observability-spring-batch-jobs/>

### Spring Batch Metric

- <https://www.devkuma.com/docs/prometheus/spring-batch/>
- <https://velog.io/@roycewon/Spring-boot-%EB%AA%A8%EB%8B%88%ED%84%B0%EB%A7%81Prometheus-Grafana-docker> 해보기
- <https://grafana.com/grafana/dashboards/19004-spring-boot-statistics/>
- <https://github.com/spring-projects/spring-batch/blob/45b3c5ef93642f5fbd46302a38e24cd303927bb8/spring-batch-core/src/test/java/org/springframework/batch/core/observability/ObservabilitySampleStepTests.java>

## JSR 352

- JSR-352 소개 :

- Spring batch 3.0의 JSR-352 관련 스펙들 : <https://jira.springsource.org/issues/?jql=labels%20%3D%20JSR-352>
- 포럼에 관련 질문 : <http://forum.springsource.org/showthread.php?138022-Spring-Batch-and-JSR352>
- JSR-352와 Spring batch의 차이점 : <http://blog.codecentric.de/en/2013/07/spring-batch-and-jsr-352-batch-applications-for-the-java-platform-differences/>
- <http://blog.springsource.org/2013/08/23/spring-batch-3-0-milestone-1-released/>
- <https://github.com/mminella/jsr352-springbatch-and-you>
- <https://blog.codecentric.de/en/2013/11/batch-processing-java-enterprise-edition-jsr-352-jee7-spring-batch/>

## 핵심 commit

- retry 별도 프로젝트 분리 : <https://github.com/SpringSource/spring-batch/commit/e827990f08c04122538d4ec17b0e90b8aa7ed577>
- non-identifying job parameters <https://github.com/spring-projects/spring-batch/commit/557515df45c0f596588418d53c3f2bae3781c1c3>

### Spring Batch 6.0 개선

- RDB가 아닌 JobRepository 설정 편의성 개선
  - <https://github.com/spring-projects/spring-batch/issues/4718>
  - <https://github.com/spring-projects/spring-batch/commit/f7fcfaa4fdb1f762a3bc16c30750d646dc52a6ed>
  - <https://stackoverflow.com/questions/79482719/how-to-remove-h2-dependency-from-spring-batch-5/79492398#79492398>
- \[Make transaction manager optional in Tasklet and Chunk-Oriented steps\](<https://github.com/spring-projects/spring-batch/commit/76a65501f75fd0115d05d3dd6c90d085a8d8d110>)

## Spring Batch 6.0

- [Spring Batch 6.0 Migration Guide](https://github.com/spring-projects/spring-batch/wiki/Spring-Batch-6.0-Migration-Guide)
- (2025-08-20) [Spring Batch 6.0.0-M2 available now](https://spring.io/blog/2025/08/20/spring-batch-6)
- (2025-07-23) [Spring Batch 6.0.0-M1 is out!](https://spring.io/blog/2025/07/23/spring-batch-6)

## 배치 처리 일반

- <http://www.sqlteam.com/article/error-handling-in-long-running-batch-jobs>
- IBM's WebSphere XD Compute Grid
  - <http://www.ibm.com/developerworks/websphere/library/techarticles/0606_antani/0606_antani.html>

## Spring batch article

- [Spring batch overview](http://www.theserverside.com/tt/articles/article.tss?l=SpringBatchOverview)
- [Article: Spring Batch Overview](http://www.theserverside.com/news/thread.tss?thread_id=47506)
- [Spring-Batch : Domain Driven Design In Action](http://java-chimaera.blogspot.com/2008/11/spring-batch-domain-driven-design-in.html)
- <http://heuristicexception.wordpress.com/2008/09/26/batch-processing-in-web-applications/>
- <http://www.cforcoding.com/2009/07/spring-batch-or-how-not-to-design-api.html>
- <http://java.dzone.com/articles/getting-started-spring-batch>

## 공식자료

- Jira, Spring batch Jira RSS
- Scheduling : Quartz and [Flux](http://www.fluxcorp.com/)
- source Web Access : <http://fisheye3.cenqua.com/browse/springframework/spring-batch/trunk>
- 첨부: [pom.xml](https://github.com/benelog/devnote/blob/master/attachments/4253397_pom.xml)

## Spring batch와 Quartz

- Spring - 대용량 데이터에 대한 처리기능 제공
- Quartz - 스케쥴링
- 상호배타적인 개념이 아니다. SchedulerFactoryBean을 이용해 같이 사용

## 주요용어

- Item : An item represents the smallest ammount of complete data for processing. In the most simple terms this might mean a line in a file, a row in a database table, or a particular element in an XML file.
- Driving Query : A driving query identifies the set of work for a job to do
- Logicial Unit of Work (LUW) : A batch job iterates through a driving query (or another input source such as a file) to perform the set of work that the job must accomplish. Each iteration of work performed is a unit of work.
- Run Tier: The Run Tier is concerned with the scheduling and launching of the application. A vendor product is typically used in this tier to allow time-based and interdependent scheduling of batch jobs as well as providing parallel processing capabilities.
- Job Tier: The Job Tier is responsible for the overall execution of a batch job. It sequentially executes batch steps, ensuring that all steps are in the correct state and all appropriate policies are enforced.
- Application Tier: The Application Tier contains components required to execute the program. It contains specific tasklets that address the required batch functionality and enforces policies around a tasklet execution (e.g., commit intervals, capture of statistics, etc.)
- Data Tier: The Data Tier provides the integration with the physical data sources that might include databases, files, or queues. Note : In some cases the Job tier can be completely missing and in other cases one Job Script can start several Batch Job instances.

## version

버전 RC (Release Candidate) - 베타 버전(Beta Version) 보다 1단계 개선된 버전. 일반적으로 개발 도중의 제품은 알파 버전→베타 버전→제품 버전으로 진행되는데, 운용 체계 등 대규모 소프트웨어에 대해서 다양한 환경에서의 시험을 위해 베타 버전과 제품 버전 사이의 과정에서 추가로 수행되는 버전들이다. 그 제품을 도입하는 사용자에게 광범위하게 배포해, 실제 환경에서의 시험을 실시하고, 필요하면 RC1→RC2→RC3식으로 버전을 거친 후 최종 제품 버전으로 진행한다.

## 주목할 만한 기능

- ChainedItemReader
- ResourceItemReader
- InitializingDataSourceFactoryBean
- StaxEventItemWriter

### XStream쓸 때

marshal -> marshalStaxResult -> marshalXmlEventWriter -> marshalSaxHandlers

- SAXResult : `org.springframework.xml.transform.StaxResult`
- XMLEventWriter : `org.springframework.batch.item.xml.stax.NoStartEndDocumentStreamWriter`
- ContentHandler : `org.springframework.xml.stream.StaxEventContentHandler` (XMLEventWriter) - XStreamMarshaller.marshalXmlEventWriter에서 생성

NoStartEndDocumentStreamWriter

### Spring batch XML

```xml
<dependency>
    <groupId>org.springframework.ws</groupId>
    <artifactId>spring-ws-core</artifactId>
    <version>1.5.4</version>
    <exclusions>
        <exclusion>
            <groupId>org.springframework</groupId>
            <artifactId>spring-web</artifactId>
        </exclusion>
        <exclusion>
            <groupId>org.springframework</groupId>
            <artifactId>spring-webmvc</artifactId>
        </exclusion>
    </exclusions>
</dependency>
```

```xml
<bean id="regisonMarshaller" class="org.springframework.oxm.xstream.XStreamMarshaller">
    <property name="aliases">
        <map>
            <entry key="item" value="com.nhncorp.moca.etl.batch.domain.RegionSido" />
            <entry key="regionGugun" value="com.nhncorp.moca.etl.batch.domain.RegionGugun" />
            <entry key="sidoCode" value="java.lang.String" />
        </map>
    </property>
    <property name="implicitCollection">
        <map>
            <entry key="regionGugunList" value="com.nhncorp.moca.etl.batch.domain.RegionSido" />
        </map>
    </property>
</bean>
```

## 2.0 변화

- ExitStatus
- close(context) -< close()

## JobRepository 관련

2.0.0

- <http://jbaruch.wordpress.com/2010/04/27/integrating-mongodb-with-spring-batch/>

## 프로젝트 소개정보

- <http://www.springone2gx.com/conference/speaker/dave_syer>
- <http://www.springone2gx.com/conference/speaker/lucas_ward>
- [엑센추어, 오픈소스 프로젝트 「스프링 배치」참가](http://www.zdnet.co.kr/ArticleView.asp?artice_id=00000039157450)
- <http://twitter.com/david_syer>

## Spring batch 국내자료

- 정상혁
- 박찬욱님
- 백기선님
- 경구사님
  - [Spring batch 개발환경 설정](http://blog.naver.com/kyong94s/53401317)
- 김승권님
- 박재성님
- KSUG포럼

## Spring Batch Admin

- 소스 : <https://github.com/SpringSource/spring-batch-admin/blob/master/spring-batch-admin-manager/src/main/resources/META-INF/spring/batch/bootstrap/manager/data-source-context.xml>
- Bootstrap : <https://github.com/SpringSource/spring-batch-admin/tree/master/spring-batch-admin-manager/src/main/resources/META-INF/spring/batch/bootstrap>

## Spring Batch Admin 모듈 설치

Springsource에서 제공하는 Spring batch Admin 모듈 올리기

스프링배치 어드민 프로젝트는 Spring Batch로 만들어진 Job들의 실행이력을 조회하고 수동실행할 수 있는 기능을 제공하는 프로젝트입니다. 스프링배치에서는 Job과 Step의 실행이력 정보를 메타데이터 테이블에 저장을 하도록 되어 있습니다. 그런 메타정보가 저장되는 테이블의 레이아웃은 아래와 같습니다.

![meta-data-erd](https://raw.githubusercontent.com/benelog/devnote/master/attachments/3759629_meta-data-erd.png)

기존에 사용하고 있던 어플리케이션에서 스프링배치 어드민 모듈을 올릴 때는 아래와 같은 버전 업그레이드 작업을 해줘아합니다.

### Spring 3.0.2 upgrade

- pom.xml 수정
- 참고사항
  - RowMapper interface가 Generics를 지원함에 따라 ParameterizedRowMapper를 굳이 쓸 필요 없어졌음
  - 3.0.2에서는 ParameterizedRowMapper가 @Depreciated 표기되지는 않았으나 향후 될 수도 있으므로 보이면 수정하면 됨

### Spring Batch 2.1.1 upgrade

- pom.xml 수정
- xml 설정에 jobParameters 표기식을 사용하는 부분이 있다면 대괄호 앞 뒤에 "'" 포함 : 펀드, 환율 등

  ```
  jobParameters[input.file.name] -> jobParameters['input.file.name']
  ```

  - (Spring 3.0 + Spring batch 2.1.1일 때 고려해야하는 점임)
- job설정파일에서 spring-batch-2.0.xsd -> spring-batch-2.1.xsd
- AbstractJobTests가 @Deprecaited. JobLauncherTestUtils가 새로 추가됨. 돌아가는데는 문제 없으나 수정권장.
- TransactionAwareBufferedWriter의 생성자 변화
- 참고사항
  - Repository를 생성하는 DDL에서 BATCH_JOB_EXECUTION.EXIT_CODE, BATCH_STEP_EXECUTION.EXIT_CODE 컬럼이 VARCHAR(20) -> VARCHAR(100)으로 증가
  - 사용자가 확장한 코드명을 찍어주기 위한 것이라서 스키마 수정 없이도 않아도 기본 동작에는 문제 없음.

### Spring Batch Admin 추가

pom.xml에 Dependency와 Repository 선언에 추가

```xml
<dependency>
    <groupId>org.springframework.batch</groupId>
    <artifactId>spring-batch-admin-manager</artifactId>
    <version>1.0.0.CI-SNAPSHOT</version>
</dependency>
```

```xml
<repository>
    <id>spring-snapshots</id>
    <name>Spring Maven Snapshot Repository</name>
    <url>http://s3.amazonaws.com/maven.springframework.org/snapshot</url>
</repository>
```

- Job 선언 파일은 META-INF/spring/batch/jobs에 넣거나 그 안의 파일에서 include
- Job repository 등의 선언을 덮어쓰는 설정은 META-INF/spring/batch/override/ 에 추가
- 샘플 프로젝트 참조하여 web.xml 수정

### 초간단 Batch Admin 모듈

- [batchMonitor.jsp](https://github.com/benelog/devnote/blob/master/attachments/3759617_batchMonitor.jsp)

## Spring Batch Scalability

- PartitionHandler
- Remote partition

### Project

- <http://github.com/dsyer/spring-batch-grid>
- <http://github.com/dsyer/spring-batch-gridgain>

### Grid gain

- <http://gridgain.com/>
- <http://gridgain.com/screencast/grid_app_in_15min/screencast.html>

## Spring Batch retry

- <http://angelborroy.wordpress.com/2009/05/20/spring-batch-2-0-retry-a-tasklet/>

1. RetryTemplate 설정(java config or xml)

```java
@Bean
public RetryOperations deadLockRetry(){
    RetryTemplate template = new RetryTemplate();

    Map<Class<? extends Throwable>, Boolean> exceptions = new HashMap<Class<? extends Throwable>, Boolean>();
    exceptions.put(DeadlockLoserDataAccessException.class, true);
    SimpleRetryPolicy policy = new SimpleRetryPolicy(3,exceptions);
    template.setRetryPolicy(policy);
    return template;
}
```

2. AOP 설정

```xml
<bean id="retryAdvice"
     class="org.springframework.batch.retry.interceptor.RetryOperationsInterceptor">
  <property name="retryOperations" ref="deadLockRetry">

<aop:config>
  <aop:advisor pointcut="execution(execution(* com.nhncorp..클래스명.execute(..))" advice-ref="retryAdvice" order="-1"/>
</aop:config>
```

### JobRepository DeadLock

Transaction밖에서 retry 하라...

- <http://floatingcube.blogspot.com/2009/09/retry-spring-batch-job-due-to-database.html>

## Children

- [[spring-batch-series]]

## Related
