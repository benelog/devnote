- 소스 : <https://github.com/SpringSource/spring-batch-admin/blob/master/spring-batch-admin-manager/src/main/resources/META-INF/spring/batch/bootstrap/manager/data-source-context.xml>
- Bootstrap : <https://github.com/SpringSource/spring-batch-admin/tree/master/spring-batch-admin-manager/src/main/resources/META-INF/spring/batch/bootstrap>

## 모듈 설치

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
