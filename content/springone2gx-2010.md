## TODO
- 요약 내용 정리
- 분석 내용 정리
- Spring social demo 준비

## 분석 - 스프링을 둘러싼 전략들

### '기술 포털' 스프링
- 인터넷 포털
  - CP사업자로부터 데이터를 받음
  - 일관되고 개선된UI를 제공
  - CP사에게 Traffic을 늘여주거나, 컨텐츠 비용 제공
- Spring
  - 다양한 기술 원천 제공처
    - Java EE(JPA,EJB, JSF, JaxRs 등) , 다른 오픈 소스
    - NoSQL, Social Service API, Cache 영역까지 확장
  - 유사한 기술 기술들의 일관된 programming mode, Interface 제공
    - DI, AOP, PSA
  - 원천 기술을 더 퍼뜨려주거나, 제공하는 인프라를 사용하도록 연결될 수 있음

### Portability By Spring
- Web Application Server등 Middleware를 바꿀 때
  - Spring container가 Middleware 완충지대
- 유사한 역할의 기술 인프라 를 바꿀 때
  - 예) Transaction을 JDBC수준에서 할 수도, JTA를 사용할 수도)
- 프레임웍을 바꿀 때
  - Dependency Injection만 사용한다면 Spring to Google Guice도 가능 (같은 @Inject Annotation 지원)
  - 이 수준에서는 완벽한 Portalbility를 감안하는 것이 실용적이지는 않다. (비교 예: Ansi SQL과 Vendor 특화된 SQL)

### VMWare의 전략
Vendor Lock-in 효과에 대한 우려를 불식시키기 위한 홍보

- Lock-in 가능성은 소비자 입장에서는 Risk 요인
  - 기존 인프라 제공보다 플랫폼 제공자에게 더 많은 것을 맡기게 됨
  - Lock-in이 된다면 플랫폼 사용자 입장에서는 향후 협상력 약화
  - 초기 의사결정의 장벽이 됨
- Lock-in의 Risk가 적다는 것을 강조
  - Cloud portability
    - Spring 어플리케이션은 Google, Saleforce.com, VMWare 등 Cloud 제공자에 관계없이 실행가능
    - 다른 Platform Cloud 사업자와 동일한 이해관계
      - Google과 Salesforce.com이 SpringOne의 주요 스폰서
  - Spring의 Container가 Middleware 완충지대 역할
    - 객체의 조립, Life Cycle관리는 Middleware 밖에서 처리
    - jar파일 upgrade가 미들웨어 업그레이드보다 간편함
  - VM레벨에서의 가상화를 하고 있는 Google App Engine이 가장 실질적 이득
    - OS Level의 가상화라면 이미 JVM의 portability 이점을 누리고 있음
- Platform Cloud의 차별화 요소
  - 안전성
  - 모니터링 도구
  - 가격 정책
  - 결국 '규모의 경제'와 '인프라 기술력'이 핵심

## (1) 키노트
2010년 10월 19일부터 22일까지 시카고에서 열리는 SpringOne2GX 2010 행사에 참석하고 있는 중입니다. 정리가 완벽하게 되지 않아도 중간중간 듣고 본 것들을 올리도록 하겠습니다.

#### 수정이력
1. (최초작성) 키노트의 내용을 발표 때 사용한 슬라이드 자료를 보면서 정리를 하려고 마음을 먹고 있었습니다. 그래서 특별히 메모도 하지 않고 있었는데, 키노트가 끝난 다음에서야 발표 자료가 아직 올라오지 않았다는 것을 알았습니다. 그래서 대략적으로 기억나는 것들을 같이 간 분들에게 물어보고 보완하면서 트위터에 올라온 글들(<http://twitter.com/#!/search/s2gx>)을 보고 회상한 내용으로 일단 정리합니다.

### 키노트의 제목은?
로드존슨은 첫장에 키노트의 제목을 표시하지 않고 '여기에 제목이 들어간다'는 슬라이드 템플릿에 있을법만 문구를 그대로 보여줍니다. 나름대로 웃음을 주려고 했던 의도도 있었지만, 지난 12개월동안 스프링 세계에 어떤 일이 일어났는지를 키노트에서 정리해야 하는데, 이번에는 그것이 쉽지 않았음을 이야기 합니다. 발표가 한참 지나서야 제목을 붙일 수 있도록 핵심주제들을 풀어주었습니다. 간단히 정리하면 '스프링의 성공요인이였던 Portability, Productivity, Innovation을 다음 10년에도 새로운 영역에서 이어서 가고, 개발자들이 더욱 핵심 비지니스 가치의 전달에 전념할 수 있도록 돕는다'라고 말할 수 있었습니다.

### 그동안 스프링 세계에 있었던 일들..
키노트 발표는 이번 컨퍼런스의 주요 후원자인 Accenture, Google, Saleforce.com에 대한 스폰서들에 대한 감사의 이야기로 시작되었습니다. 이번 컨퍼런스를 통해 비니지스 어플리케이션을 전통적인 데이터 센터에서 클라우드 환경으로 올리겠다는 비전을 강조할 것이라고 미리 예상을 했었고, 인터넷 업계, 시스템통합, SaaS 업계의 최강자들인 이들 세 업체가 그런 비전을 공유하고 후원업체로 전면에 나와 있다는 생각이 들었습니다.

이어서 얼마전에 발표되었던 vFabric cloud platform의 그림을 보여줍니다.

이 아키텍처에서 모니터링은 Hyperic, 메시징큐는 RabbitMQ, 캐슁을 위한 데이터그리드는 Gemfire가 들어가는데, 작년부터 스프링소스가 인수합병을 통해서 확보한 솔류션들입니다.

이어서 이런 솔류션들이 현재 얼마나 중요한 시스템에서 쓰이고 있는지 레퍼런스를 알려줍니다. Gemfire는 NASA나 펜타곤에서, RabbitMQ는 인도의 수많은 인구들의 주민등록 정보를 관리하는 곳에 들어가 있다고 합니다.

그리고 다른 스프링 프로젝트의 대표적인 발전도 정리해줍니다.

- Spring 3.1 : Cache abstraction, 환경에 특화된 bean 설정
- Spring Integration 2.0 : Spring Tools Suite를 통한 plugin지원, 더 많은 Adaptor 지원
- Spring Web flow 3.0 : Java flow Definition 지원 ( 이 이슈를 말한 것으로 짐작됩니다.)
- Grails : Spring Tools Suite에 추가된 Grails 지원 기능을 Demo로 보여주었습니다. 프로젝트 생성, Entity 생성, Grails command 입력등을 Eclipse 안에서 편하게 할 수 있고, Grails View에서 Grails에 구조에 맞는 디렉토리 구성을 더 편하게 볼 수 있었습니다.

개인적으로 Cache abstraction에 가장 관심이 가는데, 이 주제를 다룰 내일 유겐할러의 발표를 기대해 봅니다.

### 스프링의 지난 10년과 그 다음
로드존슨은 스프링 프레임웍이 이제 새로운 10년대를 맞이하고 있음을 강조합니다. 로드존슨이 직접 밝힌 스프링에서 가장 오래된 클래스는 RequstHandlerEvent.java로 2001년 1월 17일 처음 만들어졌습니다. (스프링의 오래된 클래스들에 대해서는 토비님이 쓰신 [스프링코드의 역사](http://toby.epril.com/?p=171) 글에서도 재밌는 정보들을 찾을 수 있습니다.) 로드 존슨의 큰 아들의 다음 생일이 10번째 생일인데, 걔가 스프링보다는 나이가 어리다고 합니다.

그렇게 10년을 지나오면서 스프링을 성공으로 이끌었던 핵심가치들은 Portability, Productivity, Innovation의 3가지 단어로 설명했습니다.

Jetty, Tomcat을 포함한 많은 Application Server들에서 Spring 애플리케이션이 돌아갈 수 있었떤 Portability는 이제 다음 목표를 이제 Google App Engine, VMForce와 같은 클라우스 서버 영역으로까지 나아가고 있습니다. 그리고 Grails, Spring Roo, Spring Tools Suite를 이용한 생산성 향상도 계속되고 있습니다. Spring Roo에서는 GWT 지원, Database reverese-engineering 기능이 포함된 다는 것을 홍보했습니다. 바이트코드 삽입(Instrumentation)을 통한 Application Monitoring 도구인 Spring Insight를 운영환경에서 사용할 수 있도록 성능저하가 없는 버전을 준비하고 있다고 합니다.

스프링이 나아가는 새로운 영역들 중에 Social media 결합, NoSQL 저장소 지원, 모바일 환경의 다양한 Client 지원 기능등이 특히나 신선한 소식이였습니다.

### 새로운 영역들

#### NoSql
로드존슨은 NoSQL을 Not only SQL이라고 풀어줬습니다. 전통적인 데이터 저장소였던 RDB도 나름대로의 영역을 지키겠지만, 이제는 RDB만으로는 해결할 수 없는 문제들이 많아 생겼다는 것입니다. 그렇다고 RDB를 배제하는 것이 아니라는 것을 Not only SQL이라는 말로 강조했다고 느껴졌습니다.

이미 GORM에서는 Redis를 지원하는 Addon을 넣었다는 소식을 이미 들은 적이 있습니다.

이날은 neo4j(<http://neo4j.org/>)를 이용한 GraphDB 지원에 대한 코드를 보여줬습니다. Graph DB는 친구사이 관계 같은 것이 저장되는 social media같은 서비스에 적합한 구조인데, 스프링과 neo4j의 결합은 원래 neo4j의 API를 쓰지 않고 annotation으로 필드 간의 관계를 설정하는 것이였습니다. 이것도 내부적으로는 Aspect J를 이용해서 동작한다고 했습니다. Graph DB를 위한 annotation은 JPA annotation과 같이 쓰여서 Domain object에서 관계형 DB와 Graph DB에 연결되는 정보를 동시에 볼 수 있었습니다. 로드존슨은 이를 polyglot persistence, cross repository라고 표현했습니다. 다수의 저장소를 활용할 때 Java Object가 그 연결정보의 구심점이 되는 모습이 간단한 코드에서 잘 보여졌습니다. Spring roo에서도 Neo4j를 위한 Addon이 들어갔다고 합니다.

Spring-data 프로젝트에서는 Graph DB이외에도 key-value, document, column 저장소들을 위한 하위 프로젝트가 진행되고 있었습니다.

#### Social Media와 다양한 client의 시대
로드존슨은 근래의 기술환경이 Mobile 환경의 다양한 Client와 브라우저에 대처해야 한다는 것을 상기시킵니다. 그리고 Twitter와 Facebook과 같이 Social Media와 연결된 개발도 중요한 이슈입니다. 스프링에서도 이에 대비하고 있는데, Spring-mobile과 Spring-social 프로젝트가 이와 관련되어 있습니다. 그리고 GreenHouse 프로젝트가 이들을 활용한 실제 예제가 되는 프로젝트입니다. GreenHouse는 URL로 들어가볼 수 있고, Spring 개발자들의 social network 기능을 할 수 있어 보였습니다. iPhone와 Android client가 있는데, iPhone client는 시뮬레이터를 통해서 데모를 보여줬습니다.

#### Missing link - Code to Cloud
로드존슨은 지금까지 스프링이 많은 영역들을 지원해왔지만, 그 중에 빠진 연결점(Missing Link)가 있었고, 그 부분은 소스관리, 이슈관리, Contious Integration, 배포에 관한 영역이였다고 합니다. 개발자들이 각각의 도구를 설치한다고 많은 시간을 소모하고 있는데, 이제 그 영역를 담당하는 Code to Cloud라는 통합 솔류션을 소개했습니다. 이 솔류션은 Git + Hudson + Bugzilla + Mylyn + STS을 엮은 것이였습니다. Tasktop이라는 업체와 제휴를 통해 이를 제공했고, 시연도 직접 Tasktop의 CEO가 나와서 했습니다.

- 관련기사 : <http://www.marketwire.com/press-release/VMware-Brings-the-Cloud-to-Developers-With-Code2Cloud-Application-Lifecycle-Tools-NYSE-VMW-1337583.htm>
- Spring2gx 2010에서의 시연 동영상 (<http://plixi.com/p/51699717> )

### 동영상
- <http://www.infoq.com/presentations/SpringOne-2GX-2010-Keynote>

## (2) Spring 3.0 -> 3.1 -> 3.2 Themes & Trends
스프링 프레임웍의 핵심 개발자 유겐할러는 "Spring 3.0 -> 3.1 -> 3.2 Themes & Trends"라는 제목으로 두번째 날 첫시간에 발표를 했습니다. 로드존슨은 [어느 인터뷰](http://www.yes24.com/24/goods/3691866)에서 지금까지 만났던 가장 뛰어난 개발자는 생각할 것도 없이 유겐할러라고 말한 적이 있었고, 그렇게 전적인 신임을 받고 있어서 인지 유겐할러는 스프링 core 모듈의 대부분의 코드를 만들었다고 합니다. 그래서 유겐할러는 스프링 커뮤니티에서 로드존슨에 버금가는 유명인인데, 예상대로 이 날 발표 장소에는 사람들이 꽉 차게 몰려왔습니다.

발표에 들어가기 전에, 스프링 3.0 버전을 쓰는 사람과, 그중 실제 3.0에 들어간 기능을 쓰는 사람들은 손을 들어봐라고 유겐할러가 이야기했는데, 절반 정도의 사람들이 손을 들었던 것 같습니다. 컨퍼런스에 와서 그 발표를 들은 사람을 대상으로 한 질문이라서 당연한 것일수도 있지만 3.0버전의 기능이 커뮤니티에서는 호응이 괜찮다는 느낌이 들었습니다.

유겐할러는 자신이 맡은 책임 중 핵심적인 것은 클라우드, 분산 캐쉬와 같은 최신의 경향(modern day trends)에 맞추어 스프링 Core에 어떤 것이 들어갈지를 결정하는 것이라고 했습니다. 뒤에서 설명된 3.1의 캐쉬 Abstraction, 3.2의 fork-join pool 지원 등이 그런 트렌드을 쫓아가기위한 대표적인 예였습니다.

3.1과 3.2는 3.0의 자연스러운 다음버전이라고 합니다. 큰 구조변화보다는 기능이 추가되는 성격의 버전이라는 의미라고 생각되었습니다.

![PA200046.JPG](http://lh3.ggpht.com/_oJrmz3UkGJk/TMi7bQod0BI/AAAAAAAAC0A/RLczgMLOAao/s800/PA200046.JPG)

### 릴리즈 일정
발표 중간 중간에 이야기한 향후 스프링버전의 릴리즈 일정은 아래와 같습니다.

- 3.0.5 : 2010년 10월에, 곧. 3.05 이후로 바로 3.1은 위한 마일스톤 버전으로 넘어간다고 했습니다.
- 3.1 M1: 2010년 11월 말
- 3.1 M2: 2011년 1월 초?
- 3.1 RC1 : 2011년 2월말?
- 3.1 GA : 2011년 3월말?
- 3.2 : 2011년 말 경

뒤로 갈수록 물음표(?)가 들어가 있고, 지금까지 일정을 정확히 지킨 적이 없었던 것으로 보아 실제로 저 일정에 나올 가능성은 적다고 예상됩니다. Spring 3.0도 2008년에 이야기할 때는 2009년 초에 나올 것이라고 말한 적이 있는데, 실제로 3.0.GA 버전이 릴리즈된 것은 2009년 12월이였습니다. ([스프링 이슈트래커로 본 Spring 3.0의 전망](http://toby.epril.com/?p=459), Spring Jira의 실제 release 날짜 참조)

일정관리를 엄격하게 안 하나 하는 생각도 들었는데, 공개 API의 모음인 프레임웍이라는 특성 때문에 일정보다는 완성도를 중요시 할 수 밖에 없을 것도 같았습니다. 두번째 날의 밤에 'Birds of a feather session'라고, 컨퍼런스의 트랙별로 발표자나 핵심개발자들과 이야기를 할 수 있는 자리를 마련해줬는데, 거기서 내부적으로 어떤 개발방법론을 쓰는지에 대한 질문이 나왔었습니다. 거기에서 스크럼 같은 일반적인 애자일 프랙티스를 따르기는 하는데, 프레임웍은 배포 한 후에 수정을 하는 것이 어렵기 떄문에 원래의 스크럼 방식과는 잘 맞지 않는 부분도 있다는 말이 답변 중에 나왔었습니다.

### A review : 3.0
3.0에 추가된 기능들을 되돌아 봤는데, 이미 널리 알려진 기능들이라서 자세히 옮기지는 않겠습니다.

- Annotated component model.(JSR 330, JSR 303, JavaConfig등)
- Rest Support
- Portlet 2.0 지원
- 스케쥴과 태스크 실행 개선
- Java EE6 지원

이중 JavaEE6에 대한 내용은 세번째 날 역시 유겐할러가 발표한 'Spring and JavaEE 6'라는 세션에서 자세하게 설명 되었습니다.

### A preview : 3.1
3.1에 추가되는 주요 테마들은 다음과 같습니다.

- Environment profiles for bean
- Java-based applicaion configuration
- Cache abstraction
- Conversation Managment
- Servlet 3.0, JSF 2.0, Groovy

#### Environment profiles for bean
이 기능은 bean 설정들을 환경별로 묶는 것을 지원합니다. 즉, 개발환경, 테스트환경, 운영환경에 맞는 bean 선언들을 그룹화해서 지정할 수 있게 하는 것이죠.
Bean 선언이나 Annotation선언에 Profile을 이름을 지정하는 방식이 될 것이라고 합니다.

Xml선언에는 다음과 같이 profile속성이 추가됩니다.

```xml
<beans .... profile="dev">
  <bean>...</bean>
  <bean>...</bean>
</beans>
```

Annotation으로는 @Profile 을 지정하게 됩니다.

```java
@Service
@Profile("dev")
class UserService{
.....
}
```

그리고 Inject 가능한 API 형식으로 환경에 대한 추상화도 지원할 것이라고 합니다.

보통 database의 URL 같은 속성들은 별도의 property 파일로 배서 관리하는 placeholders라는 기능을 쓰는데, 이 기능도 실제 환경에 의존적으로 placeholder를 나름대로 지정할 수 있는 기능이 나온다고 합니다.

#### Java-based applicaion configuration
이미 3.0에 JavaConfig 기능이 포함되어서 @Configuration, @Bean 등의 Annotation이 추가되었는데, 어떤 기능들이 더 추가되는 것일지 궁금했었습니다. 3.1에 들어가는 Java-based configuration은 tx나, aop 같은 custom name-space와 같은 선언들이 Java파일로도 가능하게 하는 것이였습니다. Spring Batch나 Security, Integration에서도 이러한 custom name-space들을 많이 쓰는데, 그런 설정들이 xml로 bean 선언을 할 때는 설정을 간편하게 하지만, JavaConfig로 옮기기에는 불편해서 아쉬웠던 점이 있습니다. Spring Batch에서 ItemReader, ItemWriter 선언을 JavaConfig로 옮겨보니 훨씬 코드가 짧아지고 Compile time의 validation 범위도 넓어져서 만족했었는데, Job과 Step의 선언은 custom namespace로 하는 것이 더 간편해서, XML에 남겨두었었습니다. 그리고 유사하게

[Enterpise Interation Patterns](http://www.amazon.com/Enterprise-Integration-Patterns-Designing-Deploying/dp/0321200683/ref=sr_1_1?ie=UTF8&qid=1287800130&sr=8-1)를 구현한 Apache Camel는 Java로 된 DSL을 지원하는데 반해서 Spring Integration은 간결한 선정을 하려면 Xml의 Custom name space를 사용해야 되어서 아쉬웠던 적이 있었습니다.(<http://java.dzone.com/articles/spring-integration-and-apache> 참조)

3.1에서 그렇게 javaConfig로도 추상화정도를 높인 선언을 할 수 있는 기능이 추가된다면, 스프링포트 폴리오의 다른 프로젝트에서도 많은 개선이 이루어질 것이라고 기대됩니다.

#### Cache Abstraction
현재도 스프링에 org.springframework.cache라는 패키지는 존재합니다. 그런데 아직까지는 EhCache에 대한 지원클래스만 있습니다. 3.1에서는 이 패키지를 채워넣을 것이고, 분산캐쉬를 기술과 연결되는 구현체도 포함될 것이라고 합니다. 기본적으로 EhCache, GemFire, Coherence를 지원한다고 밝혔습니다. 물론 인터페이스에 맞춰서 직접 구현하는 것도 가능하고, ConcurrentHashMap을 이용한 간단한 기본 구현체도 제공합니다.

발표가 끝난 뒤에 저와 같이 간 일행인 김훈민 대리가 직접 유겐할러에게 찾아가서 Memcached에 대한 지원 계획을 물어봤는데, out-of-box로 바로 쓸 수 있는 Adaptor는 아직까지는 계획에 없다고 했습니다. 여러 가지 라이센스 문제 등에 부딪힐 수 있어서 협의가 필요한데, 원한다면 이슈 등록을 하고 투표를 하라고 이야기했습니다. 개인적으로 Simple Spring Memecached( <http://code.google.com/p/simple-spring-memcached/>) 프로젝트와 유사한 Memcached 지원이 Spring Core에 들어갔으면 했는데, 다소 아쉬운 부분이였습니다.

많은 곳에서 이미 Annotation과 AOP를 활용해서 Cache를 활용해서 이미 예상을 했었는데, Spring 3.1에는 아래와 같이 Cache 지원을 위한 @Cacheable,@CacheEvict라는 Annotation이 추가됩니다.

```java
@Cacheable
public Owner loadOwner(int id) {
....
}

@Cacheable(condition="name.length<10")
public Owner loadOwner(String name){
....
}

@CacheEvict
public void deleteOwner(int id){
....
}
```

Annotation이 붙은 메소드의 signature와 파라미터로 캐쉬에 넣을 key로 인식하게 됩니다. 유겐할러는 이런 방식의 처리가 Cache의 전형적인 사용의 80% 유형정도를 차지할 것이라고 말했습니다. Cache Abstraction은 Cache의 모든 기능을 통합해서 같은 API로 묶는 것이라기보다는, 주요 쓰임새를 더 짧은 코드로 편하게 쓸 수 있게 하는데 초점이 맞춰진 것으로 보입니다. 정교한 캐쉬처리나 각각의 캐쉬 특성에 맞는 API사용 등은 직접 특정 Cache의 API를 당연히 사용해야겠죠.
그리고 transaction처리에 쓰는 PlatformTransactionManager와 비슷하게 CachedManager라는 SPI가 들어가고, tx namespace처럼 cache에 대한 namespace도 추가된다고 합니다. `<cache:annotation-driven />`과 같은 선언은 기존에 스프링을 쓰던 사람에게는 익숙하게 보입니다.

이미 EhCache를 Spring에서 활요할 때 쓰는 @Cacheable annotation이 있는데, 이 모델이 좀 더 확장될 것으로 보입니다. 아래 자료에 현재에도 사용가능한 방식이 나와 있습니다.

- <http://code.google.com/p/ehcache-spring-annotations/wiki/UsingCacheable>

#### Converstion management
Conversation session에 대한 추상화 계층을 추가될 예정이라고 합니다. 기본적으로 HttpSession을 포함하여 더욱 유연한 생존주기와 저장소를 제공한다고 했습니다.

보통 웹어플리케이션에서 여러 페이지간의 상태를 공유해야하는 Conversation 범위가 생길 수가 있는데, 보통 Session을 쓰는 것이 일반적이지만, 같은 윈도우에 있는 다른 탭이라도 같은 Session의 id가 먹는 상황이 있고, 수동적으로 이런 경계를 관리해야 할 때가 있습니다. 새로운 기능은 이런 것들을 위임할 수 있는 공통적인 기반을 제공한다고 합니다.

이 기능은 Spring Webflow의 3.0에도 바탕이 될 것이고 MVC나 JSF에도 공통적으로 쓰일 수 있다고 했습니다.

그리고 웹어플리케이션 뿐만이 아니라 메시징 환경에서 메시지 헤더 안에 conversation id를 포함시키는 쓰임새에도 적용가능하도록 Conversation을 위한 인터페이스는 범용적인 목적의 API가 될 것이라고 합니다.

#### Support for Servlet 3.0
Tomcat 7, GlassFish 3 등에서 Servlet 3.0 스펙을 지원하는 Container에 대한 지원이 포함됩니다.

web.xml에 명시적으로 프레임웍에 대한 Listener 선언을 하지 않고도 자동으로 deployment되는 옵션을 지원하고, 표준적인 파일업로드에 대한 지원이 된다고 합니다. 스프링의 MultipartResolver interface도 그 안에 포함될 것 같습니다.

#### Enchance Groovy Support
`<lang:groovy>` 로 xml 파일안에 Groovy를 쓸 수 있는 지원이 강화됩니다.

- base script classes
- custom bidings
- 스프링 빈들을 이름으로 암묵적으로 접근
- Velocity나 Freemarker 대신 쓰일 수 있는 Groovy 바탕의 Template 파일. Email 템플릿 같은 것에 사용할 수 있다고 하네요

#### c:namespace
Xml로 Bean 선언을 할 때 p namespace과 같은 역할을 하는 c namespace가 추가됩니다. p가 `<property name.. >` 에 대한 짧은 표현였다면, c는 `<constructor-arg>`를 간결하게 표현할 수 있게 줍니다.

아래와 코드와 같이 거의 p namespace와 사용법이 똑같아 보입니다.

```xml
<bean class="..." c:age="10/>
<bean class="..." c:family-ref="myFamily/>
```

### A sneak preview : 3.2
3.2에는 JDK 7을 바탕으로 추가될 수 있는 기능들을 계획하고 있었습니다. JDK 7은 2011년 7월에 release 예정이라서 3.2에 대한 Release도 당연히 그 뒤가 되겠습니다.

그리고 당연히 java 5, 6 user를 위한 기능도 있을 것이고, 그런 기능들은 Spring 3.1이 GA로 간 다음에 사용자들의 요청에 따라서 결정될 것이라고 합니다.

#### Java SE 7 Support
Spring 3.2의 초점은 JRE 7 을 가장 잘 쓰는 사용법이라고 했습니다. JDBC 4.1에 대한 지원과 Java concurrent 패지지에서 개선되는 fork-join 프레임웍에 대한 지원계획이 있었습니다.

#### 멀티코어의 Concurrent 프로그래밍에 초점
동시 요청보다 Core수가 더 많은 시나리오에 초점을 맞추어서 API제공을 계획하고 있다고 합니다. 예를 들면 Spring Batch에서 큰 Xml파일을 처리할 때와 같이, 처리 요청은 하나이기 때문에 요청 건별로 병렬처리르 하기가 힘들지만 자원소모가 커서 병렬처리를 했을 때의 이득이 큰 경우를 염두에 둔 것이였습니다. 그런 곳에 사용할 수 있는 특화된 ForkJoinPool이 Application context안에 들어갈 것이라고 했습니다.

## (3) Spring and Java EE 6, Synergy or Competition?

### 논쟁에 응하다
2010년 10월 4일, <http://www.theserverside.com> 에는 이제 프레임웍의 시대는 가고, Spring에서 Java EE6로 옮겨야 한다는 주장을 담은 글이 올라왔고, 뜨거운 논쟁거리가 되었습니다.

- [Moving from Spring to Java EE 6: The Age of Frameworks is Over](http://www.theserverside.com/news/thread.tss?track=NL-461&ad=790558&thread_id=61023&asrc=EM_NLN_12619056&uid=2873925)

과거 Java EE 스펙의 부족함 때문에 Spring이 떠올랐지만, 이제 Java EE 6에서는 그런 것들을 다 극복을 했으니 Java EE6로 갈아타자는 내용이였습니다.

이 글의 댓글에서부터 많은 반론이 올라왔고, 별도의 포스트로 쓰여진 아래와 같은 글들도 있었습니다.

- <http://raibledesigns.com/rd/entry/re_moving_from_spring_to>
- [Spring vs. Java EE and Why I Don't Care](http://jandiandme.blogspot.com/2010/10/spring-vs-java-ee-and-why-i-dont-care.html?utm_source=feedburner&utm_medium=twitter&utm_campaign=Feed%3A+jandiandme2+%28J+and+I+and+Me%29&utm_content=Twitter)

반론들에 포함된 공통적인 내용들은 아래와 같습니다.

- 크게 볼 때, Spring과 Java EE6 는 비슷한 프로그래밍 모델을 가진 부분이 많다. Annotation을 @Stateless을 쓸지, @Component 쓸지는 프로젝트의 성공여부를 결정지을 만큼 중요한 차이는 아니다.
- 그러나 Spring이 Tomcat, Jetty를 비롯한 더 많은 WAS에서 실행될 수 있다.
- Batch, Integration, Spring Roo 같은 Java EE 스펙이 미치지 못하는 영역을 스프링에서는 제공하고 있다.

Java EE 진영과 스프링 쪽의 갈등은 이미 뿌리가 깊습니다. 스프링의 시초가 된 코드가 있는 "Expert One-on-One J2EE Design and Development"책에는 EJB의 단점들이 날카롭게 지적되어 있고, 로드존슨과 유겐할러가 써서 최초로 스프링을 언급한 책은 이름부터가 "Expert One-on-One J2EE Development without EJB"였습니다. "with Spring"도 아닌 "without EJB"인 것이죠. EJB를 적용했을 때의 실패경험 때문인지 로드존슨은 EJB에 맺힌 것이 많아 보이고, 그런 것들이 앞의 저서들을 저술한 동기를 더 강하게 하지 않았을까하는 생각도 듭니다. 그래도 J2EE 시절만 해도 표준 스펙은 OS나 DB서버와 같이, low level의 기술을 제공하는 컨테이너로 인식이 되었는데, Java EE5 이후 실사용자 레벨의 컴퍼넌트 모델을 제공하기 시작하면서 JavaEE와 Spring은 경쟁관계로 인식이 됩니다. 사실 스펙을 정의하는 JavaEE와 구현기술인 Spring을 동등하게 비교할 수도 없고, Spring에서도 JavaEE스펙을 지원하는 부분이 있습니다. 하지만 JavaEE스펙을 더 지지하는 진영에서는 Spring을 사유기술일 뿐이고 JavaEE에 근거한 기술은 표준이라는 것을 계속 강조하면서 스프링을 공격하고 있습니다. 로드존슨은 이전에 올린 블로그 포스트의 댓글에서 오픈소스 기술인 Spring을 사유(proprietary)라고 표현한 것에 대해서는 그것은 의심스러운 용어일 뿐이라고 말한 적도 있습니다. (In any case, "proprietary" is a questionable term when we're talking about open source. )

마침 SpringOne2GX 컨퍼런스 직전에 또다시 이런 논쟁이 일어난 것이 흥미로웠고, 저는 로드존슨이 키노트에서 바로 이에 대한 반론을 하지 않을까 하는 기대도 했었습니다. 그런데 로드 존슨은 핵심가치 같은 큰 그림에서의 스프링이 추구하는 바를 이야기했고, 이 논쟁에 대한 직접적인 이야기는 하지 않았습니다.

바로 셋째날에 한 이 발표 "Spring and Java EE 6,Synergy or Competition?"에서 유겐할러가 그에 대한 구체적인 대답을 했습니다. 유겐할러는 최근 이런 논쟁들을 보고서 발표 제목을 바꾸었다고 했고 이미 발표 몇시간 전 팀블로그에 아래와 같은 글을 올려서 이날 발표에서 말할 내용을 먼저 공개하기도 했습니다. 저는 컨퍼런스가 끝난 후에야 이 글이 올라온 것을 보았는데, 발표에서 가장 뒷부분에 강조한 핵심내용이 정리되어 있었습니다.

뒤에서 언급되겠지만, 간단히 정리하면 JavaEE6 환경에서도 스프링을 사용하면 플랫폼에서 제공되는 기술들을 일관된 프로그래밍과 설정 모델로 조화시키고, 더 많은 기술과 환경을 조합할 수 있으면서, Java EE7보다 더 빨리 발전하는 기능들을 사용할 수 있는 것이라는 주장이였습니다.

사실 유겐할러는 이 날 발표와 비슷한 주제의 발표를 Java EE6 스펙의 확정 전에도 여러 번 한적이 있었습니다. 작년에 한 발표도 아래 링크에서 동영상으로 올라와 있습니다.

- <http://www.infoq.com/presentations/Spring-and-Java-EE-6-Jurgen-Holler>

확정된 스펙을 가지고 이야기 한 것이 작년에 한 위의 발표와 달랐던 점이였습니다. 발표 중에 유겐할러는 Spring 쪽에서도 오랫동안 EE 6 스펙의 확정을 기다렸다고 했고 EE6 확정 직후에 발표된 Spring 3.0에서도 EE6의 스펙을 많이 지원하고 있음을 강조했습니다. 발표 제목 중에 포함된 "Synergy or Competition"중, "Synergy"를 주장하고 싶었던 것이죠.

### 스프링의 역할
이 것은 이번 컨퍼런스 내내 키노트와 여러 세션에서 반복되어 언급된 말이였는데, 이 발표에서도 스프링을 사용하면 Java EE와 동등한 기능을 쓰면서도 어플리케이션을 어느 서버에서도 배포될 수 있다는 것을 강조했습니다. 대상 플랫폼의 런타임에 적용되어서, 서비스 추상화를 통해 공통적인 Programming model과 설정으로 개발을 할 수 있고, 전통적인 어플리케이션 서버 역할의 대안을 제공한다고 했습니다. Java EE 5의 스펙 중에서도 @PostConstruct, @PreDestoy , @PersistenceContext, @PersistenceUnit , @Resource, @EJB, @TransationAttribute 등의 많은 Annotation을 지원하는데, 원하는 Semantics에 따라서 조합하고 조화시켜(Mix & Match) 사용하라고 권장했습니다.

### Java EE6 스펙 리뷰와 스프링의 지원

#### Java EE 프로파일
JavaEE 프로파일은 EE 스펙 중 일부를 일부를 묶어서 구분하는 개념이였습니다. 가령 "Web Profile"이라고 하면 EE 스펙 중 웹기술에 해당하는 Servlet, JSP, jSTL, JTA, JPA, EJB 3.1 Lite를 포함하는 것이라고 했습니다. 그래서 벤더들이 초점을 두고 싶은 프로파일만 구현하고, 이미 지나간 잘 안 쓰이는 스펙에 대해서는 구현할 필요가 없이 그 분야의 프로파일에 대해서만 인증을 받을 수도 있다는 것입니다. 좋은 개념이기는 하나 현실적으로 웹프로파일만 구현하고 있는 벤더는 아직까지는 없다고 말했습니다. 그런데 컨퍼런스가 끝난 뒤에 SIwpas라는 Web Profile만 구현한 서버를 우연찮게 발견하기도 했습니다.

그리고 스프링은 플랫폼에서 어떤 라이브러리가 제공되던지 상관 없이 사용할 수 있으므로 Java EE 프로파일은 스프링에 영향을 미치지는 않는 개념입니다.

#### Servlet 3.0
Servlet 3.0 스펙에는 web.xml을 간결하게 해주는 "framework auto deployment"기능이 포함되고, 스프링도 자동배포 기능 추가를 계획하고 있었습니다. 그리고 비동기적인 Http처리인 Comet은 Spring MVC에서 특별한 request/reponse 형식으로 지원할 것이라고 했습니다. 당연히 이전 서블릿 스펙을 지원하는 서버에서의 하위호환성도 유지할 것이라고 합니다.

#### JSF 2.0
JSF 2.0에는 UI 컴퍼넌트 부분에서 Ajax 지원와 페이지 선언 언어 등이 개선됩니다.. 그리고 스프링의 @Component와 @Value와 유사한 역할인 @ManagedBean, @ManagedProperty 아노테이션이 있습니다. 스프링에서는 현재의 JSF지원 기능을 새 버전에 맞추어 이어나가면서 3.1버전에서는 JSF 지원을 더 확장할 수 있도록 연구 중에 있다고 했습니다.

#### JPA 2.0
JPA 2.0에는 쿼리 타임아웃, 표준화된 쿼리 힌트 등이 추가되었습니다. 역시 스프링에서는 현재의 JPA의 지원기능을 이어나가고, 트랜잭션 관리에서 JPA 2.0의 모든 기능을 다 열어준다고 했습니다. 이미 Spring 3.0에서 Hibernate, EclipseLink, OpenJPA 등의 최신버전들과 이런 기능들을 쓸 수 있다고 합니다.

#### JSR-303 Bean Validation
JSF 2.0과 JPA 2.0에서 동시에 지원하는 스펙인데, Spring 3.0에는 SpringMVC의 Validation기능으로 사용할 수 있습니다.

#### JAX-RS
JAX-RS((Java™ API for RESTful Web Services)는 REST방식의 웹요청 처리를 지원하는 표준 API입니다. 이미 Jersey같이 JAX-RS를 지원하는 프레임웍에서 Spring을 자연스럽게 같이 연결해서 사용할 수 있습니다.

아래 코드에 @Path 아노테이션은 JAX-RS에서 정의된 것인데, 여기에 스프링의 @Autowired를 같이 쓰고 있습니다.

```java
@Path("widgets")
public class WidgetsResource {
   @Autowired
   private WidgetsService service;
   @GET  @Path("{id}")  @Produces("text/html")
   public String getWidget(@PathParam("id") int id) { ... }
}

}
```

스프링 3.0에서도 Spring web MVC에서 나름대로의 스펙을 가진 REST지원 기능이 있습니다. 사실 위의 @Path와 @PathParam 은 스프링의 @RequestMapping, @RequsetParams 아노테이션과 무척 유사해보이는, 비슷한 프로그래밍 모델을 가지고 있습니다. 왜 스프링개발자들이 Spring MVC에서 JAX-RS를 바로 지원 안하고 나름대로의 스펙을 만들었는지에 대해서는, 스프링소스의 팀 블로그를 통해서 밝힌 적이 있습니다.

기존의 JAX-RS 스펙을 바로 지원하는 것도 프로토타이핑해봤지만, 자연스럽게 않게 억지로 끼워 맞추는 듯한 방식이 나왔고, 결국 Spring MVC사용자들에게 더 일관적이고 편한 방식을 제공하는 나름대로의 기능을 넣기로 결정했다는 것이였습니다. 결국 JAX-RS와 Spring MVC는 REST 지원부분에서 겹쳐지는 부분이 생겼고, 이를 두고 스프링은 표준 스펙을 존중하지 않는다는 비난을 하는 사람도 있었습니다.

이날 발표에서도 유겐할러는 Spring MVC는 근본적으로 MVC구조라서 View의 rendering을 하는 부분을 분리할 수 밖에 없고, 따라서 JAX-RS 방식과 달라질 수 밖에 없다고 했습니다. 그리고 Jersey, [RESTEasy](http://www.jboss.org/resteasy/), [Restlet](http://www.restlet.org/)와 같은 JAX-RS 구현체를 쓴다고 해도 Spring를 같이 쓸 수 있으니, 상황에 따라서 Spring MVC의 REST 기능이나 JAX-RS 구현체를 모두 골라서 쓸 수 있다고 했습니다. UI페이지와 REST요청을 같이 처리해야하는 어플리케이션에서는 Spring MVC로, 계층적인 리소스 구조처럼 REST 방식을 깊이까지 쓰는 어플리케이션이라면 JAX-RS 구현체를 쓰는 것처럼 말이죠. 스프링은 언제나 그래왔듯이 선택에 대한 것이라는 말을 덧붙였습니다. (Spring is (and always was) about choice),

그리고 JAX-RS 스펙은 Java EE6에서 독립적인 스펙이고, 다른 웹스펙과도 연관관계가 없고, JSF와 프로그래밍 모델도 다르다고 유겐할러는 설명했습니다. 스프링은 그런 관련성이 있는 스펙들을 일관성 있게 묶어가고 있다는 것을 대비시켜 보이기 위해서 굳이 그런 언급을 한 것이 아닐까하는 생각도 들었습니다.

#### EJB 3.1
EJB 3.1는 EJB 3.0에 singleton bean과 비동기 메소드 호출, JNDI 이름에 대한 Convention 제공 등의 기능이 추가된 것입니다. 그리고 Local session Bean과 Singleton Bean만을 가지는 "EJB 3.1 Lite"라는 것도 정의했습니다. 대부분의 서비스 객체가 원격호출이나 Object pooling이 없이 쓰이는 스프링의 방식과 유사한 것인데, 과거의 그런 기능들이 대부분의 상황에서 오버엔지니어링 이였음을 다시 한번 인정하는 스펙 추가가 아닌가 하는 생각이 들었습니다.

흥미로운 스펙은 컨테이너가 Lock 관리를 해준다는 것인데,(container-managed locking) 아래 코드에서 @Lock 아노테이션이 그런 역할을 하고 있습니다.

```java
@Singleton @Startup
@DependsOn({"OhterBean1","OtherBean2"})
public class SharedService {
    private Data sharedData;
    @Lock(READ)
    public String returnSharedDataValue(){
        return this.sharedData;
  }
}
```

그리고 @Singleton이 붙은 클래스의 모든 메소드는 기본적으로 쓰기 잠금이 걸린다고 합니다.

유겐할러는 이런 스펙이 불필요할 상황이 많을 것이라고 했는데, ConcurrentHashMap 같이 thread-safe를 감안한 자료구조를 선택할 수도 있고, synchronized나 volatile와 같은 키워드를 이용해서도 개발자가 그런 것들을 제어할 수도 있다고 했습니다. 아뭏든 이런 Lock에 대한 디폴트 값을 제외하고는 @Singleton으로 설정되는 Bean은 Spring이 관리하는 Bean과 상당히 유사해졌다고 말했습니다.

EJB가 컨테이너와 스프링과의 관계는 EJB 3.1에서도 변하지 않는다고 했습니다. EJB 스펙은 나름대로의 Container에 의해서 지원되는 것이고, 필요하다면 Spring에서 이를 접근할 수도 있는 것이죠. 그리고 EJB 3.1의 비동기 호출 스펙인 @Asynchronous은 @Aysnc 로 Spring에 반영되어, 영향을 주었다고 했습니다.

#### JSR-299 Web Beans - CDI(Contexts and Dependency Injection)
"Web beans"라는 이름으로 불렸던, 공식적으로는 "Contexts and Dependency injection"이라는 명칭으로 붙여진 이 스펙과 스프링을 눌러싼 논쟁들은 표준 제정 과정 당시에도 가장 뜨거운 화제였었고, 이 날 발표에서도 개인적으로 가장 관심이 가는 부분이였습니다. 이 스펙은 원래 JSF에서 Bean관리를 개선해서 JSF와 EJB를 잘 연결하는 역할을 위해 만들어졌지만, 점점 확정된 스펙으로 발전해 나갔습니다.

CDI에서는 Type-safe Depedency Injection, Interceptor, 이벤트 통지, Web conversation context 등의 풍부한 Dependency Injection모델을 Annotation을 통해서 제공합니다. javax.decorator, javax.context, javax.inject, javax.event 등에 다양한 패키지에 나눠서 들어가 있고, 이미 @Resource 등의 아노테이션이 있는 JSR-250이 담당하는 패키지인 javax.annotation, javax.interceptor 에도 추가되어 있습니다.

발표 슬라이드에는 나와있지 않지만, 여기서 유겐할러는 CDI의 부정적인 면들도 언급을 합니다. EJB 3.1이 이 Component 모델을 뒤에서 떠받치는 역할을 하지만, EJB와 CDI는 각각의 나름대로의 역할과 생명주기를 가지고 있는 그렇게 다른 Semantics가 섞이면 혼란을 불러 일으킬 수 있다고 합니다. 그런 혼란에서 오는 어려움은 그 날 발표 슬라이드나 어떤 슬라이드 내에서는 표현될 수 없고, 실제로 개발을 해보고 디버깅을 해서 겪어봐야지 알 수 있다고 했습니다.

그리고 이 스펙은 스프링의 프로그래밍 모델과 겹쳐지는 부분이 있고, Spring 3.1에서는 스프링의 원래 프로그래밍 모델을 더 발전시켜서 JSR-299과 표현력과 기능을 능가하겠다고 했습니다. 이미 Spring에서도 다양한 scope의 빈을 정의할 수도 있고, Stateful한 웹어플리케이션을 개발할 수 있다는 Spring Web Flow가 따로 프로젝트로 나와있지만, Spring 3.1에서 추가될 Conversation Management는 그런 것들을 더욱 일반화 시켜서 Spring Core 쪽으로 끌어올리겠다는 의미로 해석됩니다.

### Spring on Java EE6
앞에서 언급했듯이, 유겐할러는 발표의 뒷부분에서 최근 논쟁에 대한 대답들을 정리해서 설명해줍니다.

첫째, Java EE6 서버는 스프링이 참조하는 미들웨어를 제공하는 좋은 실행환경이라는 것입니다. Java EE6 서버에서 제공하는 Servlet 3.0, JSF 2.0, JPA 2.0 등의 플랫폼 기술들은 스프링은 소비자로서 사용할 수 있다고 했습니다. 그리고 다소 Java EE 스펙과 중복이 될 수 있는 부분인 EJB나 CDI관련 부분은 Java EE6 기능의 일부분에 불과하다는 것이였습니다. GlassFish에서는 코드량 기준으로 5% 정도만 차지할 뿐이고, 아마 5%가 넘는 다른 기능들도 사용하지 않고 있는 것이 많을 것이라고 했습니다.

둘째, 스프링을 사용하면 필요에 따라 더 넓은 기술을 선택할 수 있기 때문에 그것이 Java EE6 서버를 사용하는 자연스러운 방식이라느 것입니다. JSF대신 Wicket이나 GWT, EE clustering대신 Coherence 등을 쓸 수 있고, 스프링의 jar파일은 4MB 바이트 정도로 크지 않아서 이 용량이 문제가 되는 경우는 거의 없다고 했습니다.

셋째, Java EE6 서버 중 GlassFish만이 지금 GA(Generally Available)버전 이상인 상태이고, JBoss나 WebSphere는 아직 안정화된 버전이전이기 때문에 Java EE 6서버만을 선택한다면 실행환경에 제약이 있다고 했습니다. 스프링은 Tomcat 5,6,7버전, Java EE5 서버, 그리고 Google App Engine 같은 것에서도 돌아갈 수 있고, Java EE5를 쓰면서도 스프링을 사용하면 Hibernate 3.6 같은 구현체를 써서 EE6 스펙을 쓰는 선택도 가능하다고 했습니다. 다양한 플랫폼 환경에서 스프링이 조율역할을 한다는 것입니다. 실제로 최근에 올라온 [CDI - A Major Risk Factor in Java EE 6](http://www.dzone.com/links/r/cdi_a_major_risk_factor_in_java_ee_6.html)라는 글에서는 아직 안정화되지 않은 버전의 서버에서 CDI를 적용하다 어려움을 겪은 이야기가 있습니다.

넷째, EE6는 2009년 초 기술환경에 맞춘 것이고, 그 후로 지금까지 분산캐쉬, Cloud 등 많은 기술들이 중요하게 떠올랐는데, 그런 기술들을 스프링을 통해서 서버를 업그레이드할 필요없이 훨씬 빠른 시기에 지원받을 수 있다는 것입니다. 이번 컨퍼런스 내내 NoSQL, 분산 캐쉬, Social network 같은 다양한 주제들이 강조된 것도 그런 강점을 강조하기 위한 전략으로 보였습니다.

정리하자면 Spring과 Java EE6는 잘 맞는 궁합이면서 중복되는 역할의 라이브러리 용량은 현실적으로 문제될 것이 없으며, 스프링으로 더 다양한 기술과 실행환경을 활용하면서 일관된 프로그래밍 모델로 개발할 수 있다는 것이 핵심 주장이였습니다.

## (4) Spring Roo 관련 발표들
작년 SpringOne에서도 Spring Roo에 대한 발표가 있었고, Google IO 등 다른 컨퍼런스에서도 꾸준히 Spring Roo는 홍보되었지만, 이번 SpringOne에서는 부쩍 그 비중이 높게 느껴졌습니다.

키노트가 있었던 주행사장에는 Spring Roo, Spring, SpringSource, Groovy, Grails의 5개의 로고가 조명으로 비추어져 있었습니다. Groovy-Grais의 관계처럼 Spring-SpringRoo의 관계를 연상시켜서, Spring의 대표 기술로 홍보하려는 전략으로 보였습니다.

![PA220055.JPG](http://lh3.ggpht.com/_oJrmz3UkGJk/TMi7gUjZNII/AAAAAAAAC0A/hSU3s8E2XCk/s640/PA220055.JPG)
![PA220058.JPG](http://lh6.ggpht.com/_oJrmz3UkGJk/TMi7hDFNR_I/AAAAAAAAC0A/mWjWPk7bMPE/s912/PA220058.JPG)

그리고 행사 기념품으로 나온 배찌에서도, Spring,SpringSource, Goorvy, Grails, Tomcat 등과 함께 Spring Roo의 로고가 박힌 것이 포함되었습니다. Security나 Batch같이 이미 현장에서 더 많이 쓰이고 있는 하위 프로젝트들도 있는데, Roo만 특별대우 한다는 느낌까지 들 정도였습니다. 다른 프레임웍 기술만과는 차별된 Spring만의 강점을 강조하기 위해서 Spring Roo가 전면에 나왔다고 생각됩니다. 스프링에서 지원하는 기술이 많아질 수록, API들을 전파하는 것도 쉽지 않을 것인데, Spring Roo를 통해서 사용할 수 있는 방법을 제공하면 코드가 자동생성 되므로 사용법이 더 간편해 보인다는 장점이 있을 것입니다. 그리고 Roo가 그렇게 새로운 API 전파 창구의 역할을 수행한다면 Roo를 직접 사용하지 않는 사람도 Roo가 생성해주는 코드를 샘플로 활용할 수도 있을 것입니다. Spring 3.0.4에 포함된 `<mvc:default-servlet-handler/>`가 Roo에 바로 반영된 것이나, Neo4j의 Roo addon등이 그 예입니다.

컨퍼런스가 끝나고 몇일 뒤에 바로 Spring Roo 1.1.0 버전이 발표되었는데, 이번 컨퍼런스에서 1.1.0에 포함된 기능을 소개하는 발표가 많았습니다.

OSGi, GWT, GAE-J 지원, 검색서버인 Apache Solr 지원, Database reverse engineering 등 많은 발전을 보여줍니다. 아래 포스트에 있는 지난 1년간의 Roo의 commit 내력을 시각화한 그림에서도 그런 변화가 표현되었습니다.

벤알렉스 아저씨가 열심히 개발을 하는 모습이 보이는군요. 이번 컨퍼런스에 벤알렉스는 참석하지 않았고, 벤알렉스가 진행하기로 한 발표의 일부는 로드존슨이 직접 진행했습니다. 아파서 못 왔다고는 말했는데, 1.1 출시를 얼마 안 앞두고 마무리 작업 때문에 못 온 것이 아닌가 하는 생각도 들었습니다.

저는 Roo 관련 세션 중에 Add-On 개발 관련 세션에 들어갔었습니다. 아래 Url에 있는 toString addon을 샘플소스로 보라고 했는데, toString을 Addon도 크게 쉬워보이지는 않았습니다.

가장 흥미로운 이야기는 Roo에서 앞으로 iBatis, Spring jdbc 같은 JPA 이외의 Persistence 기술도 지원하겠다는 것이였습니다.

그리고 Maven 멀티 프로젝트를 언제 지원할 수 있으냐는 질문이 세션 중에 나왔는데, 명확한 일정을 확답을 하지 못한 것으로 봐서는 가까운 시일 내에 가능해지지는 않을 것 같습니다.

Roo 관련 발표 자료들은 아래에 공개되어 있습니다.

- [New Persistence Features in Spring Roo 1.1](http://www.slideshare.net/schmidtstefan/new-persistence-features-in-spring-roo-11)
- [Next Generation Spring MVC with Spring Roo](http://www.slideshare.net/schmidtstefan/next-generation-spring-mvc-with-spring-roo)
- [Spring Roo Add-On Development & Distribution](http://www.slideshare.net/schmidtstefan/spring-one2010addondev)

## (5) 분산 캐쉬
분산캐쉬는 이번 컨퍼런스에 단연 눈에 띄는 주제였습니다. Spring 3.1에서 Cache에 대한 Abstraction layer를 제공한다는 것이 발표되었고, 그에 대한 원천 기술을 제공하는 Terracotta와 Gemfire 솔류션을 소개하는 세션들도 있었습니다. Terracotta와 Gemfire가 비슷한 용도로 쓰일 수 있기 때문에 어떻게 보면 경쟁관계임에도 같이 홍보를 할 수 있는 자리를 마련해 주었다는 것이 흥미롭게 느껴졌습니다.

### Teracotta- BigMemory
Teracotta의 BigMemory 솔류션을 처음 본 것은 발표장 앞에 마련된 홍보데스크에서 였습니다. 아래 그림과 같이 "NO GC"라는 의미의 로고를 앞에 달고 나와서, 여러 홍보 데스크 중에서도 단연 눈길을 끌었습니다.

![no_gc.png](https://raw.githubusercontent.com/benelog/devnote/master/attachments/4228373_no_gc.png)

저는 Terracotta에서 진행하는 세션에는 들어가지 못하고 홍보데스크에 몇가지를 물어보았습니다. Memcached가 가장 Cache farm으로 많이 쓰이고 있는데, Terracotta의 EhCache는 그에 비해 어떤 특징이 있는냐는 질문을 했는데, Memcached가 읽기 작업이 많은 쓰임새에서는 강점을 보이지만, EhCache가 쓰기의 동기화등 보다 다양한 시나리오에 쓰일 수 있다고 했습니다. 그리고 Gemfire와 쓰임새가 겹칠 수도 있는데, 어떤 강점이 있는지에 대해서도 물어봤는데, Gemfire를 좀 더 쉽게 쓸 수 있도록 개선이 이루어지고 있지만, 아직까지는 EhCache가 보다 간편한 설정으로 편하게 쓸 수 있다는 이야기를 했습니다. 역시나 SpringSource가 주최한 행사다 보니 이 이야기를 하면서 주변을 살펴보면서 눈치를 보는 것처럼 느껴졌습니다 ^^;

같이 컨퍼런스에 갔던 김훈민 대리도 여러가지 질문을 했는데, BigMemory의 내부 구현 방식이 NIO의 direct buffer를 이용한 것이냐는 질문에, 홍보를 나오신 분은 아마도 그런 것 같다는 답변을 했습니다. 직접 제품을 만드시는 분은 아니라서 깊이는 몰라서 약간 자신없는 대답을 한 것 같았습니다.

![테라코타 책상에서 김훈민 대리](http://lh5.ggpht.com/_oJrmz3UkGJk/TMi7Wo0GJ6I/AAAAAAAAC0A/GgV8JyqOOLM/s640/IMG_20101019_174355.jpg)

테라코타 책상에서 김훈민 대리

하지만 BigMemory가

nio direct buffer

### Gemfire
SpringSource가 인수한 솔류션인 GemFire는 'Data-Grid '라고 불리고 있습니다. 분산캐쉬보다는 더 넓은 용도에 쓰일 수 있기 때문에 'Cache'라는 말을 솔류션 이름에 붙이지 않은 것 같습니다.

## (8) Spring social

```java
TwitterTemplate tw = new TwitterTemplate
List<String> friends = tw.getFriends("sanghyukjung");
```

```java
TripItTemplate ti = new TripItTemplate(인증키들...);
List<Trips> tripList = ti.getTrips();
```

## (10) 스프링소스 솔류션들
앞선 이야기에서 소개하지 못한 SpringSource의 솔류션들에 대한 내용을 정리해보았습니다.

- Hyperic
- RabbitMQ

## 스프링 프레임웍, 그 다음 발걸음은?
- 인프라운영의 효율성

## Related
- [[spring]]
- [[spring-roo]]
- [[server-cache]]
- [[no-sql]]
- [[cloud]]
- [[ejb]]
- [[jpa]]
- [[groovy]]
