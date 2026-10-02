## Data Integration

- <http://en.wikipedia.org/wiki/Data_integration>
  - Data integration is the process of combining data residing at different sources and providing the user with a unified view of these data

폭넓은 의미에서의 EAI는 전체 시스템 통합을 의미한다. 즉 Presentation Layer간의 통합, Application 간의 통합, Data 간의 통합을 모두 포함한 개념이지만, 현재 일반적으로 사용하는 EAI는 Application 간의 통합을 지칭한다. (참고: Presentation Layer간의 통합은 Enterprise Portal, Data간의 통합은 Data Integration Solution 등을 통해서 이루어 진다.)

## Apache Flink

### 구조

- JobManager
  - 사용자의 플링크 잡(Flink job)을 요청받고 분산 환경에서 실행할 수 있는 실행 그래프(Execution graph)로 변환
  - 생성된 태스크(Task)를 태스크 매니저에게 할당
- TaskManager
  - 잡 매니저의 태스크 요청을 받으면 해당 태스크를 수행하고 그 결과를 다시 잡 매니저에게 보고
  - TaskSlot : 실제로 태스크를 수행하는 주체. CPU의 코어 수와 동일하게 태스크 슬롯을 할당하는 것을 권장
- Data source
  - Split : 잡 매니저가 태스크 매니저에게 전달하는 객체로, 외부 시스템에서 데이터를 읽어와야 할 위치나 기준이 담긴 실 구현된 객체
  - SplitEnumerator : 잡 매니저에 존재하며, 태스크 매니저에게 스플릿을 할당하는 역할을 수행
  - SourceReader : 태스크 매니저에 존재하며, 잡 매니저에게 스플릿을 요청하고 할당받은 스플릿을 기반으로 외부 시스템에서 데이터를 읽어옴
- CheckPoint : 플링크 잡의 상태(State)를 사용자가 정의한 저장소에 주기적으로 저장하는 기능

### 사례

- 카카오 사례
  - [아파치 플링크와 CDC의 만남. 플링크 CDC 맛보기](https://tech.kakao.com/posts/632)
    - '예를 들어, 대규모 MySQL 테이블은 내부 레코드의 수가 수천만에서 수억을 넘는 경우들이 있습니다. 이런 환경에서 디비지움 방식을 사용할 경우, 애플리케이션의 최적화 정도나 테이블 레코드의 크기에 따라 차이가 있지만, 초당 만개 이상의 레코드를 가져오기가 쉽지 않습니다.'
  - [Apache Iceberg와 Flink CDC 심층 탐구](https://tech.kakao.com/posts/656)
  - [대용량 데이터베이스 동기화를 위한 최적의 CDC 시스템 구축기 / if(kakaoAI)2024](https://www.youtube.com/watch?v=PeNHKxadNos)
- [6개월 만에 연간 수십조를 처리하는 DB CDC 복제 도구 무중단/무장애 교체하기](https://d2.naver.com/helloworld/6388660)

## Migration 사례

- <https://stripe.com/blog/online-migrations>
  - 1\. Dual writing
  - 2\. Changing all read paths
  - 3\. Changing all write paths
  - 4\. Removing old data
- <https://www.theguardian.com/info/2018/nov/30/bye-bye-mongo-hello-postgres>
  - MongoDB 에서 PostgreSQL로 전환

## ETL

- <http://www.manageability.org/blog/stuff/open-source-etl>
- <http://blogs.ittoolbox.com/emergingtech/afletcher/archives/open-source-catalogue-etl-9191>
- <http://swik.net/ETL+Java>
- <http://scriptella.javaforge.com/>

### KETL

- <http://www.ketl.org/>

XML, JDBC, and SOAP. LDAP, JMS

XML파일 미지원. 문서화 다소 부족.

### ETL integrator

로그에 logkit사용...

Open-ESB 프로젝트의 하위... SOA로 노출 서비스 노출..

ETL Service Engine is a Java Business Integration (JSR-208) based Service Engine which can expose the ETL operations as web services and is part of OpenESB

### Scriptella

- [Load CSV data into a database (Scriptella ETL tool)](http://snippets.dzone.com/posts/show/3508)
- [How to execute Scriptella ETL files](http://snippets.dzone.com/posts/show/4862)

### Jitterbit

- Training
- Consulting
- Mentorshiop
- Support 만 유료

중앙 메타데이터 저장공간

Central metadata repository

### Apatar

특이한 점은 Flcikr Amazon Saleforce.com 등과 직접 된다는 점.

매쉬업 data를 붓는 툴

스케쥴러 제공

### SSIS

#### SOAP

- <http://www.rickgaribay.net/archive/2006/12/21/Distributed-SQL-Server-Integration-Services.aspx>
- <http://marcusrosen.blogspot.com/2008/04/sql-server-2005-integration-service.html>

### Smook

### CloverETL

- <http://www.cloveretl.org/>

CloverETL

- FTP/SFTP/HTTP/HTTPS , JMS, LDAP, SOAP 지원
- Graph-Node-Edge의 계층적 개념
- JDBC layer를 통해 DB접근
- 주요 DB에 대해서는 (Oracle, MS SQL< DB2, Infomix, Sybase, MySQL, PostrreSQL) Nativelly support
- 기본 API..
- Apache common Logging 사용 - Log4j 사용가능
- Library서의 API활용, 설정으로 활용, GUI툴로 설정 작성

CloverETL Enterprise Server

- WebServices style of API for managing execution of graphs (allows for rapid implementation of any WebService)
- runs in app.container (Tomcat, JBoss, WebSphere, GlassFish, ..etc..) on any platform with JVM (Unix, Windows, Linux, AS/400 and many more)

CloverGUI

- free for non-commercial use.
- Ecliopse plug-in으로서 제공

### Talend

#### JasperETL

JasperSoft Open Source Business Intelligence Suite의 일부분

JasperServer

<http://jasperforge.org/sf/projects/jasperetl>

- JasperServer – interactive and managed reporting for JasperReports
  - Report Scheduling and Distribution
- JasperReports – pixel-perfect reports for screen or print
- JasperAnalysis – interactive data analysis / OLAP server
- JapserStudio - powerful graphical interactive & production report designer
- JasperETL – high performance data integration

Professional (상용)

- Support 강화
- Multi-user metadata repository
- CPU Balancer
- Distant Run
- Activity Monitoring Console (AMC) monitors job events (successes, failures, warnings, etc.), execution times and data volumes from within JasperETL

### ETL 비교자료

#### 전반적 비교

- <http://mysqlbarbeque.blogspot.com/2008/03/open-source-etl-tools-vs-commerical-etl.html>
- <http://blogs.ittoolbox.com/bi/websphere/archives/wiki-wednesday-comparing-talend-and-pentaho-kettle-open-source-etl-tools-16294>
- <http://mediaproducts.gartner.com/reprints/sas/vol5/article8/article8.html>

#### 성능비교

- <http://marcrussel.files.wordpress.com/2007/08/benchmark-tos-vs-kettle.pdf>
- <http://marcrussel.files.wordpress.com/2008/10/etlbenchmarks_manappsc221008.pdf>

## Children

- [[pentaho-data-integration]]

## Related
- [[distributed-processing]]
- [[hadoop]]
- [[pentaho-data-integration]]
- [[soa]]
- [[flat-file]]
