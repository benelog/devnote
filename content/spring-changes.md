## Spring 2.5
- <http://toby.epril.com/?p=359>
- <http://www.infoq.com/articles/spring-2.5-part-1>

## Spring 3.0

- [Spring 3.0 (1) 프로젝트 구조와 빌드 시스템의 변화](http://toby.epril.com/?p=557)
- [Spring 3.0 (2) R-518 스프링의 새 모듈 OXM(Object/XML Mapping)](http://toby.epril.com/?p=561)
- [Spring 3.0 (3) R-543 Portlet Mocks, MVC 등등](http://toby.epril.com/?p=573)
- [Spring 3.0 (4) - Maven에서 Spring 3.0 최신버전 사용하기](http://toby.epril.com/?p=576)
- [Spring3.0 (5) - 스프링 모듈의 의존관계](http://toby.epril.com/?p=598)
- [Spring 3.0 (8) Core 모듈의 선택 라이브러리 분석](http://toby.epril.com/?p=614)
- [Spring 3.0 (10) AOP 모듈의 선택 라이브러리 분석](http://toby.epril.com/?p=618)
- [Spring 3.0 (11) Aspects 모듈의 선택 라이브러리 분석](http://toby.epril.com/?p=620)

- [Petclinic을 통해 스프링 3.0 주요기능 살펴보기](http://whiteship.me/2151)
- [OpenSprout Nexus 이용하여 스프링 3.0 라이브러리 추가하기](http://whiteship.me/2190)
- <http://www.opensprout.org:9060/browse/OSAF/osaf/trunk>

- [What’s new in Spring 3.0?](http://whiteship.me/2199)
- [\[스프링 3.0](http://whiteship.me/2423) @Valid 이론\]
- [\[스프링 3.0](http://whiteship.me/2424) @Valid 실습\]
- 스프링 3.0 애노테이션 기반 스케줄링\]

### Spring and Java EE5

- [Spring and Java EE 6](http://www.infoq.com/presentations/Spring-and-Java-EE-6-Jurgen-Holler)

Spring on J2EE 1.3

Java EE server as deployment plaform and system service provider

Spring as business component framework and infrasturucal orchestrator

upgrade: like system s/w, DB system

deloyment platform

java EE5

more than just a d3eployment platform with system service

user-lvel component model

## Spring 3.1

- <http://static.springsource.org/spring-framework/docs/3.1.x/spring-framework-reference/html/new-in-3.1.html>
- <http://static.springsource.org/spring-framework/docs/3.1.x/spring-framework-reference/html/migration-3.1.html>
- <http://static.springsource.org/spring/docs/3.1.x/changelog.txt>
- <http://static.springsource.org/spring-framework/docs/3.0.6.RELEASE_to_3.1.0.BUILD-SNAPSHOT/>
- <http://static.springsource.org/spring-framework/docs/3.1.x/javadoc-api/deprecated-list.html>

@MVC 하위 호환성 이슈

Spring @MVC에서 3.0 → 3.1 업그레이드는 WebArgumentResolver,
HandlerInterceptor 관련해서 하위 호환성 이슈가 있습니다. @MVC의 기반구조
변화는 어플리케이션 동작에 영향을 줍니다.

WebArgumentResolver와 HandlerInterceptor 모두
\<mvc:annotation-driven/\>을 쓸때는 주의해야합니다.

\<mvc:annotation-driven/\>에 의해 등록되는 MVC기반 클래스들이 아래와
같이 바뀌었기 때문인데요,

- HandlerMapping : DefaultAnnotationHandlerMapping → RequestMappingHadlerMapping
- HadlerAdaptor : AnnotationMethodHandlerAdapter → RequestMappingHandlerAdapter
- HandlerExceptionResolver : AnnotationMethodHandlerExceptionResolver → ExceptionHandlerExceptionResolver

      <mvc:annotation-driven/>을 선언 안 했을 때는 기본 사용 클래스는 변함이 없으므로 기존의 하위 호환성이 유지됩니다.

마찬기지로 \<mvc:annotation-drive/\> 대신
AnnotationMethodHandlerAdapter, DefaultAnnotationHandlerMapping를
수동으로 등록해도 마찬가지로 기존 클래스 동작에 변화가 없습니다.

그러나 \<mvc:annotation-driven/\> 선언을 쓰고 있다면 더 이상
AnnotationMethodHandlerAdapter, DefaultAnnotationHandlerMapping가 쓰이지
않습니다.

이렇게 바뀐 이유는 메서드 단위의 URL매핑에 보다 자연스러운 구조를
지원하기 위해서인데요..

토비의 Spring 3.1 VOl2의 '4.9 스프링 3.1의 @MVC (p633-669)'에 자세히
설명되어 있습니다.

WebArgumentResolver 관련

우선 WebArguemtResolver는 HandlerMethodArgumentResolver로
대처되었습니다.

같은 역할이면 HandlerMethodArgumentResolver로 새로 구현하는게 좋지만
WebArguemtResolver도 쓸 수 있도록 지원은 됩니다.

그러나 3.1에서 WebArgumentResolver를 그대로 쓰면 아래와 같은 차이점이
있습니다..

1.  WebArguementResolver에서 Exception이 발생하면
    무시된다.(<http://blog.naver.com/PostView.nhn?blogId=clotho95&logNo=140144711547>
    참조 )

2.  WebArguemtResolver가 HandlerInterceptor보다 먼저 호출된다.

만약 \<mvc:annotation-driven/\> + WebArguementResolver를 쓰는곳이 있다면
HandlerMethodArgumentResolver로 인터페이스를 바꿀 것을 권장합니다.

HandlerInterceptor 관련

\<mvc:annotation-drive/\> 을 쓸 경우 HandlerInterceptor에서 preHandle에
넘어오는 3번째 Parameter가 HandlerMethod의 형으로 넘어옵니다.

public boolean preHandle(HttpServletRequest request, HttpServletResponse
response, Object handler) throws Exception {

}

역시나 \<mvc:annotation-driven/\> 과 HandlerInterceptor를 같이 쓰면서 이
3번째 Object handler 메서드 파라미터를 활용하고 있다면 주의해야 합니다.

\<font face="나눔고딕, NanumGothic, 맑은 고딕, AppleGothic,
돋움"\>3.1에서는 \</font\>\<context:property-placeholder /\>으로 기본
등록되는 bean이 \<font face="나눔고딕, NanumGothic, 맑은 고딕,
AppleGothic, 돋움"\>PropertyPlaceholderConfigurer에서
PropertySourcesPlaceholderConfigurer로 바뀌었습니다.\</font\>

Properties파일을 직접 지정할 경우 동작은 거의 동일한데 없는 속성이
선언될경우 보다 적극적으로 에러를 내어 줍니다.\</font\>

\<font face="나눔고딕, NanumGothic, 맑은 고딕, AppleGothic, 돋움"
style="font-size: 9pt;"\>그리고 \</font\>\<font face="나눔고딕,
NanumGothic, 맑은 고딕, AppleGothic, 돋움"\>Spring 3.1.0 ~ 3.1.3
버전에서는 Properties XML 선언과 관련된 버그가 있으니 유의해야
합니다.\</font\>

### 스프링소스 블로그의 관련 자료

- <http://blog.springsource.org/2011/02/11/spring-framework-3-1-m1-released/>
- <http://blog.springsource.org/2011/02/14/spring-3-1-m1-introducing-profile/>
- <http://blog.springsource.org/2011/02/15/spring-3-1-m1-unified-property-management/>
- <http://blog.springsource.org/2011/06/09/spring-framework-3-1-m2-released/>
- <http://blog.springsource.org/2011/06/10/spring-3-1-m2-configuration-enhancements/>
- <http://blog.springsource.org/2011/06/21/spring-3-1-m2-testing-with-configuration-classes-and-profiles/>
- <http://blog.springsource.org/2011/10/12/spring-framework-3-1-rc1-released/>
- <http://blog.springsource.org/2011/12/13/spring-framework-3-1-goes-ga/>
- <http://blog.springsource.org/2012/04/06/migrating-to-spring-3-1-and-hibernate-4-1/>

### Toby님의 Spring 3.1 분석 자료

- [스프링 3.1 (1) JavaConfig의 위험성](http://toby.epril.com/?p=1168)
- [스프링 3.1 (2) HandlerInterceptor의 적용순서](http://toby.epril.com/?p=1172)
- [스프링 3.1 (3) @Enable~](http://toby.epril.com/?p=1174)
- [스프링 3.1 (4) Static @Bean 메소드](http://toby.epril.com/?p=1177)
- [스프링 3.1 (5) @Enable\*을 이용한 설정 재활용 기법 세미나 동영상 & 자료](http://toby.epril.com/?p=1179)
- [스프링 3.1 (6) web.xml의 활성 프로파일 설정](http://toby.epril.com/?p=1188)
- [스프링 3.1 (7) 프로퍼티 소스 추상화와 PropertySourcePlaceholderConfigurer](http://toby.epril.com/?p=1191)
- [스프링 3.1 (8) web.xml 없는 스프링 개발](http://toby.epril.com/?p=1205)
- [스프링 3.1 (9) 애노테이션은 상속되지 않는다?](http://toby.epril.com/?p=1207)
- [스프링 3.1 (10) 심심풀이 @RequestMapping 요청 조건 퀴즈](http://toby.epril.com/?p=1210)
- [스프링 3.1 (11) 심심풀이 @RequestMapping 요청 조건 퀴즈 풀이](http://toby.epril.com/?p=1212)

## Spring 3.2

<http://static.springsource.org/spring-framework/docs/3.2.x/spring-framework-reference/html/new-in-3.2.html>
<http://static.springsource.org/spring-framework/docs/3.2.0.RELEASE/spring-framework-reference/html/migration-3.2.html>
<http://static.springsource.org/spring/docs/3.2.x/changelog.txt>

<http://static.springsource.org/spring-framework/docs/3.2.x/javadoc-api/deprecated-list.html>

JDIFF :
<http://static.springsource.org/spring-framework/docs/3.1.3.RELEASE_to_3.2.0.RELEASE/>

<http://blog.springsource.org/2012/05/10/spring-mvc-3-2-preview-making-a-controller-method-asynchronous/>

### 스프링소스 블로그의 관련 자료

- <http://blog.springsource.org/2012/05/06/spring-mvc-3-2-preview-introducing-servlet-3-async-support/>
- <http://blog.springsource.org/2012/05/08/spring-mvc-3-2-preview-techniques-for-real-time-updates/>
- <http://blog.springsource.org/2012/05/10/spring-mvc-3-2-preview-making-a-controller-method-asynchronous/>
- <http://blog.springsource.org/2012/05/13/spring-mvc-3-2-preview-adding-long-polling-to-an-existing-web-application/>
- <http://blog.springsource.org/2012/11/05/spring-framework-3-2-rc1-released/>
- <http://blog.springsource.org/2012/11/12/spring-framework-3-2-rc1-spring-mvc-test-framework/>
- <http://blog.springsource.org/2012/12/13/spring-framework-3-2-goes-ga/>

RequestMappingHandlerAdapter에서 supportInternal 메소드 변화

<https://github.com/SpringSource/spring-framework/commit/acc75aa4b898a34dce42748df5b54624f8b3e9f2>

## Spring 4.0

- <http://blog.springsource.org/2013/05/21/spring-framework-4-0-m1-3-2-3-available/>
- <http://blog.springsource.org/2013/05/22/spring-framework-4-0-m1-websocket-support/>

## Spring I/O 2026

- [변화하는 스프링, 떠오르는 AI, 그리고 우리의 준비 (SpringCamp 2026, 고동균·최상현)](https://github.com/springcamp/presentations/blob/main/SpringCamp-2026-Presentations/%5B%EA%B3%A0%EB%8F%99%EA%B7%A0%EB%8B%98%2C%20%EC%B5%9C%EC%83%81%ED%98%84%EB%8B%98%5D%20Spring%20I_O%202026%20-%20%EB%B3%80%ED%99%94%ED%95%98%EB%8A%94%20%EC%8A%A4%ED%94%84%EB%A7%81%2C%20%EB%96%A0%EC%98%A4%EB%A5%B4%EB%8A%94%20AI%2C%20%EA%B7%B8%EB%A6%AC%EA%B3%A0%20%EC%9A%B0%EB%A6%AC%EC%9D%98%20%EC%A4%80%EB%B9%84.pptx)

## Spring One America 2008 참석기 링크 모음

### 토비님
- [SpringOneAmerica 2008 첫날](http://toby.epril.com/?p=508)
- [S1A 2008 둘째날 - Grails](http://toby.epril.com/?p=510)
- [S1A 2008 둘째날 SpringSecurity 2.5](http://toby.epril.com/?p=512)
- [S1A 2008 둘째날 정리](http://toby.epril.com/?p=514)
- [S1A 2008 셋째날 - Spring JavaConfig](http://toby.epril.com/?p=517)
- [S1A 2008 셋째날 정리](http://toby.epril.com/?p=521)
- [S1A 2008 넷째날 정리](http://toby.epril.com/?p=523)
- [S1A 2008 사진모음](http://toby.epril.com/?p=525)

### 허광남님
- [SpringOne America Day0 in LA](http://okjsp.tistory.com/1165643635)
- [스프링원 컨퍼런스 Day1](http://okjsp.tistory.com/1165643636)
- [마이애미 일출](http://okjsp.tistory.com/1165643637)
- [SpringOne 2008](http://okjsp.tistory.com/1165643638)
- [스프링원 2008 day2 스케치](http://okjsp.tistory.com/1165643639)
- [스프링에서 xml을 없앨 수만 있다면](http://okjsp.tistory.com/1165643640)
- [스프링원의 마지막 날](http://okjsp.tistory.com/1165643641)

## 스프링 유망기술

### 2008 올해의 스프링기술 Top 5
스프링이 이제 광범위한 영역을 수용하고 있고, 제가 잘 알지 못하는 부분도 많아서 선정하기가 쉽지 않았습니다. 당연히 치밀하고 공정한 기준이 적용되었을리는 없고, 여기저기서 들은 이야기를 엮어서 골랐다고 생각하시면 되겠습니다. ^^;

#### 5. Spring Security
권한,인증,보안 등의 모듈의 설계는 어느 시스템이나 필수적이고, 많은 고려 사항이 들어가야 하는 부분입니다. 그래서, 경험이 있는 개발자라면이 이 것이 원래 복잡한 영역이라는 것을 동의할 것입니다. 이 권한 등의 관련 모듈은 유연하면서 충분한 기능을 담도록 만들기가 쉽지 않고, 매번 새로운 시스템마다 반복적으로 설계, 개발되는 경우도 많습니다. 그렇기에 이 영역에서 Spring Security의 존재가 가치있게 느껴집니다. Spring이 간단한 개발을 괜히 복잡하게 만드는 것이 아니고, 필수적으로 복잡한 요구사항이 충족되어야 하는 영역을 이미 만들어진 모듈을 쓰면서도 더 유연한 구조를 제공을 한다는 것을 Spring Security를 통해서 보여주고, 공감을 이끌어낼 수 있다고 생각합니다. 그런 의미와 2008년 들어 더욱 빨라지고 있는 것으로 보이는 발전속도, 적용 사례의 증가가 돋보이기에 2008년의 Spring 기술중 하나로 선정했습니다.

#### 4. SpringSource Tool Suite
SpringSourceTool Suite는 스프링이 이제 개발자의 더 가까운 곳에서 더 자세히 개발을 도와주는 역할을 주겠다는 의미로 다가옵니다. 그리고 스프링의 상용제품 출시를 본격적으로 알리는 신호탄으로, 앞으로 앞으로의 스프링소스의 사업모델의 측면에서 보아도 이 제품이 중요한 분기점의 의미가 되지 않나하는 생각이 듭니다.

#### 3. Spring batch
이 블로그에 오시는 분들은 잘 아시다시피, 제가 올해 가장 큰 관심을 가졌던 배치 프레임웍입니다. Accenture의 현장경험이 잘 녹아들어가고 Spring기반의 기술이 이를 뒷받침해서 본격적으로 Java 배치프레임웍의 논의를 불러일으킨 기술이라고 생각합니다. 배치처리에 어떤 기능들이 필요할 지를 보다 고민하는 계기가 되고, 경험있는 개발자의 처리 방식을 참고하고 그대로 사용할 수도 있다는 것에서 스프링배치는 큰 의미가 있습니다. 아직 젊은 프로젝트라서 분산처리 같은, 성숙한 유사 모듈에 있는 기능들이 빠진 것들도 보이지만, 내년 2.0 발표 등으로 보다 강력한 프레임웍으로 발전해 나갈 것으로 예상됩니다.

#### 2. Spring 2.5
Spring 2.5가 발표된 것은 작년이였지만, 본격적으로 주변에서 적용되는 것을 본 것은 올해라고 느껴집니다. 개발자들이 하위 호환성에 대한 걱정을 크게 하지 않으면서 기존 모듈의 의존성을 Spring 2.0에서 2.5로 업그레이드하는 사례를 여러번 봤는데, 이런 현상은 Spring에 대한 신뢰성이 깊어졌으면서도 그 발전 속도에 개발자들이 적응을 하게 된 것 같다는 의미부여를 하고 싶습니다.

#### 1. Spring DM Server
이 기술의 발표 소식을 듣는 순간 과연 스프링의 영역이 어디까지 뻗어나갈까 하는 감탄이 들었습니다. 그리고 앞으로 퍼져나갈 OSGi 세상에서도 Spring이 단순 프레임웍 이상의 큰 역할을 할 것이라는 확신을 심어준 사건이였죠.

### 2009 유망 스프링 기술 Top

#### 5. Spring Web Flow
javascript, JSF 지원기능 등 더욱 확장된 영역으로, 이제는 앞으로는 기본 웹개발은 SpringMVC, 보다 많은 기능이 필요한 웹개발은 Spring Web Flow가 맞게 되지 않을까하는 예감이 듭니다.

#### 4. Spring Integration
현재 1.0 마일스톤 버전이 발표되어 있습니다. 1.0 최종버전이 나오면 본격적으로 Spring Integration을 적용해보고 싶어하는 개발자가 많을 것 같습니다. 데이터 연계(Integration) 모듈도 어느 시스템에나 있는 것이고, System Integration은 다양한 종류의 자원들을 동일한 방식으로 연결시켜주는 기능을 제공하므로, 많은 기대를 가지게 합니다.

#### 3. Spring DM
아마도 내년이 Spring DM의 본격적인 대중화 시기가 되었으면 합니다. 대부분의 개발자들에게 낯선 OSGi 세계에서도 스프링이 든든한 길잡이가 되어줄 것으로 믿습니다.

#### 2. Grails
이미 JVM위에서 돌고 있는 스크립트 언어가 200여가지라고 하죠. (<http://www.is-research.de/info/vmlanguages/> ) 필요한 영역에 따라 JVM위에서 돌아가는 Script언어를 사용하게 될 것이라는 예상은 몇년전부터 있어왔는데, 아직까지 그 기대에 비하면 적용된 곳이 많지 않아 보입니다. 그래도 JVM 위의 Script언어 중 가장 많이 알려진 Groovy 바탕 위에서 Ruby on Rails의 뜨거운 열풍을 탄 Grails를 SpringSource까지 밀어준다는 소식은 Java web개발의 대전환기가 멀지 않았다는 느낌을 들게 합니다.

#### 1. Spring 3.0
내년에는 Spring 3.0 정식버전이 발표될 예정으로 있습니다. 가장 영향력이 큰 Core 모듈이자, 어떤 기술들과 비교해도 스프링의 발전의 속도가 빠르다는 것을 확실히 느끼게 해주는 부분입니다.

## Related
- [[spring-mvc]]
- [[spring]]
