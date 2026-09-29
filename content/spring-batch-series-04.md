스프링배치 연재 4편: 스프링배치의 구조와 구성요소들

## 스프링 배치의 구조

스프링배치는 전형적인 배치 아키텍처 구조에 따라 4가지 영역으로 구분할 수 있다. (그림1 참조)

그림 1 배치처리 아키텍처 (출처: 스프링배치 레퍼런스 매뉴얼)

1. Run tier는 Application의 scheduling, 실행을 담당한다. 스프링배치에서는 따로 Scheduling의 기능은 제공하지 않고 Quartz같은 외부 모듈이나 Cron을 이용하도록 권고하고 있다.
2. Job Tier는 전체적인 Job의 수행을 책임진다. Job내의 각 Step들을 지정한 상태와 정책에 따라 순차적으로 수행한다.
3. Application tier는 Job을 수행하는데 필요한 component로 구성되어 있다.
4. Data tier는 Database, File, Queue 등 물리적 데이터소스와의 결합이 이루어지는 영역이다.

그리고 스프링배치의 모듈은 Core, Infrastructure, Application 모듈로 나누어 볼 수 있다. (그림2 참조)

그림 2 스프링배치모듈의 계층 구조(출처: 스프링배치 레퍼런스 매뉴얼)

Core 모듈은 batch job을 실행, 모니터링, 관리하는 API로 구성되어 있다. Job,Step, JobLaucher 등의 클래스가 여기에 소속된다. Infrastructure 모듈은 스프링배치 프레임웍의 실행 흐름의 틀이 되는 코드를 제공한다. ItemReader, ItemWriter 등의 클래스가 이에 속한다. Application은 최종개발자가 설정으로 Core 모듈의 클래스를 사용하고, Infrastructure 모듈의 인터페이스를 구현해서 개발하게 된다. Core와 Infrastructure 모듈은 Spring framework core에 의존적이고, Core는 Infrastructure에 의존적이다. (그림 3,4 참조)
이런 구조는 어플리케이션 개발자는 업무로직의 구현에만 집중하고 공통적인 기반기술은 프레임웍이 담당하게 한다.

그림 3 스프링배치 모듈간의 관계 (출처 : 스프링배치 홈)

## 주요 구성 요소

아래의 논리적 구성요소들은 Spring batch의 모듈을 이해하는 바탕이 된다. 향후 연재에서 각 요소들을 더 자세히 설명을 하겠지만, 앞으로 글을 읽어나갈 때 머리 속에 그 개념이 잘 떠오르지 않으면 우선 참고를 하기 바란다.

| 구성요소 | 설명 |
| --- | --- |
| Job | job configuration과 대응되는 단위. JobInstance를 어떻게 구성하고 실행할지에 대한 명세. Job interface를 구현하는 Spring bean으로 나타남 |
| JobInstance | 논리적인 Job 실행 |
| JobExecution | 한번의 Job의 실행 시도. 시작시간, 종료시간 ,상태(시작됨,완료,실패),종료상태의 속성을 가짐 |
| Step | Batch job을 구성하는 독립적인 하나의 단계 |
| Step Execution | 하나의 step을 실행하는 한번의 시도. 시작시간, 종료시간,상태,종료상태,commitCount,itemCount 의 속성을 가진다. |
| ExecutionContext | Key-value의 쌍으로 정보가 저장.Framework에 의해 관리, 영속성 유지. JobInstance의 scope에서 유지됨. 재시작, 통계정보 집계 등에 활용가능 ( 예: 이미 처리한 row만큼 건너뛰고 수행) |
| JobRepository | 각 구성요소들의 persistance를 유지하는 기능을 제공 |
| JobLocator | 지정한 이름으로 Job class를 얻어오는 역할. Job이 Spring의 applicationContext가 아닌 곳에서도 얻어올 수 있는 확장성 제공하기 위한 요소. |
| Item | 처리할 데이터의 가장 작은 구성 요소. ( 예)파일의 한 줄, DB의 한 Row, Xml의 특정 element ) |
| Chunk | 하나의 Transaction 안에서 처리된 Item들 |
| ItemReader | Step내에서 입력값을 불러오는 역할 더 이상 읽어올 Item이 없을 때에는 read()메소드에서 null값을 반환. 그 전까지는 순차적인 값을 리턴 |
| ItemWriter | Step내에서의 출력 |
| ItemStream | 자원을 열고 닫는 것이 필요한 Reader, writer에서 같이 구현하는 Interface |
| Tasklet | 단순 작업을 처리하는 Step내에서 사용하는 요소. System command, Store procedure 실행 등의 작업에 적합하다. |

표 1: 스프링배치의 구성요소

이 중 Job과 JobInstance, JobExcution의 관계는 다음과 같다.

Job은 특정 처리의 설정 전체와 대응되는 개념이다. 즉 매일 밤 12시에 도는 배치잡이 있다면 그 것이 바로 Job의 단위다.
그리고 JobInstance는 그 Job의 논리적인 한 번의 실행을 의미하는 말이다. 예를 들면 2007년5월5일 12시에 Job이 실행되는 것이다. Job interface의 구현 클래스가 JobInstance 인 것이 아니고 따로 JobInstance라는 클래스가 존재한다.

JobExecution은 그 실제적인 물리적인 한 번의 실행시도를 의미하는 단위이다. 하나의 JobInstance 내에서도 재시도 등의 정책에 따라 여러 번의 시도가 생길 수 있다. 예를 들어 2007년 5월 5일 12시에 실행하는 Job의 첫 번째 물리적인 시도가 JobExecution이다.

그림 5 Job과 JobInstance와 JobExcution (출처: 스프링배치 레퍼런스 매뉴얼)

Step과 StepExecution도 비슷한 관계이다. 하나의 Job은 그 안에 여러 개의 Step을 가질 수가 있다. 그리고 그 Step의 한번의 시도가 StepExecution이다.

그림 6 Job과 Step (출처: 스프링배치 레퍼런스 매뉴얼)

위의 클래스들이 가지는 메타데이터는 설정을 통해 메모리 혹은 DB를 사용해서 관리될 수 있다. 배치잡의 모니터링과 실행내역 추적을 위해서 별도의 DB테이블을 만들고 그 정보를 기록하는 코드들이 업무로직 처리 코드와 뒤섞여 있는 경우가 많은데, 스프링배치에서는 그런 수고를 덜 수가 있다. 메타데이터가 저장되는 DB 테이블들의 ERD는 아래와 같다. 테이블 이름만 보아도 알 수 있듯이 위에서 나온 JobExecution 등과 같은 Domain objects들과 그 속성들이 DB스키마로 녹아 들어가 있다.

그림 7 : 메타데이터 저장 테이블

## 샘플프로젝트

스프링배치에서 제공되는 샘플 프로젝트를 참조하는 것이 사용법의 이해에 도움이 될 것이다. SVN을 통해 <http://springframework.svn.sourceforge.net/svnroot/springframework> 에 접근하면 소스를 볼 수 있다. 이 중 trunk/spring-batch-samples 폴더나 tag밑에 있는 버전별 소스를 로컬로 checkout하면 바로 eclipse project로 불러드릴 수 있다. 스프링배치는 Maven에 의해서 라이브러리들이 관리된다. m2Eclipse나 q4e 같은 Eclipse plug-in을 사용하면 더욱 편리하게 프로젝트를 사용해 볼 수 있다. Mvn install 명령을 내려서 라이브러리들을 설치되고 JUnit Test가 통과했다는 메시지가 보이면 설치가 성공한 것이다. 만약 trunk/spring-batch-samples에 있는 프로젝트를 빌드했을 때 Library를 찾을 수 없다는 메시지가 보이면 pom.xml 에서 group-id가 org.springframework.batch으로 되어 있는 모듈들의 version정보를 “1.1.2.RELEASE” 같이 현재 공식 배포된 최신 버전으로 수정해 준다.

샘플 프로젝트의 Job들이 쓰고 있는 기능들은 페이지에 표로 나와 있다.

## 스프링배치의 의미

스프링 배치의 문서에서는 ‘숙련된 배치 아키텍트는 누구라도 스프링 배치의 전체적인 개념이 친숙하고 편안할 것이다.’라는 말이 나와있다. 반대로 생각해본다면 스프링배치 모듈의 개념과 구조를 자세히 분석한다면 경험 많은 배치 아키텍트들에게서 많은 것을 배울 수 있다는 말도 될 것이다. 실제로 Websphere XD나 ETL 프로그램 들에서 스프링배치와 비슷한 구조, 용어가 많이 쓰이는 것을 찾아볼 수 있다.

정보 시스템의 환경이나 배치프로그램의 규모에 따라서 반드시 스프링배치 같은 프레임웍이 필요하지 않은 곳도 많을 것이다. 하지만 스프링배치의 모듈을 보면서 배울 수 있는 것들은 어느 배치처리 환경을 접할 때라도 유용한 분석과 설계의 틀을 제공할 것이라는 점은 확신한다.

## Related

- [[spring-batch-series]]
