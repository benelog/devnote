효과적인 애플리케이션 개발을 약속하는 프레임위크

- [Java EE가 Web 2.0을 만났을 때! (한글)](http://www.ibm.com/developerworks/kr/library/wa-aj-web2jee/index.html?ca=drs-kr)

마이크로소프트웨어 연재 시스템 통합을 위합 오픈소스 프레임워크 VSSH1

1. 2004/08 오픈소스를_이용한_시스템통합_그_즐거운_도전의_시작.pdf
2. 2004/09 첫번째_도전_스트럿츠와_벨로시티의_통합.pdf
3. 2004/10 결합도가_약한_아키텍처를_위한_대한기술_스프링.pdf
4. 2004/11 OR_매핑_도구의_선두_주자_하이버네이트.pdf

- 2004/11 특집1부 내게_딱맞는_프레임워크는_어디있을까.pdf
- 2004/04 특집3부 진화하는_개발환경_프레임워크를_부탁해.pdf
- 2004/12 특집1부 잘고른_프레임워크는_프로젝트_성공의_열쇠.pdf
- 2004/06 자바의 단맛, 쓴맛 6 아키텍쳐와_프레임웍에_대한_단상.pdf

2006/11 프레임웍 전략

- 1부 | 성공적인 프로젝트를 위한 프레임워크의 재발견
- 2부 | JBOSS 내부 구조 분석을 통한 프레임워크 이머전스의 미학
- 3부 | DxFramework를 이용한 닷넷 프레임워크 활용 전략
- 4부 | iBatis와 Acegi Securtiy를 이용한 자바 프레임워크 활용 전략
- 5부 | Django와 Seaside로 알아보는 대안 언어 프레임워크 활용 전략

마이크로소프트웨어 2003/09

- <http://java-source.net/>
- <http://cwiki.apache.org/S2WIKI/struts-2-spring-2-jpa-ajax.html>
- JDO : <http://cafe.naver.com/perfectjava.cafe?iframe_url=/ArticleRead.nhn%3Farticleid=64>
- The JaxMe JavaSource framework : 소스 생성

## Utils

- <http://blog.naver.com/uihwan74/50003983418>
- [Davisor Announces MS Word to PDF and HTML API](http://www.theserverside.com/news/thread.tss?thread_id=41942)
- <http://timeandmoney.sourceforge.net/>
- <http://www.eaipatterns.com/ramblings/40_marchnan.html>

## apache BCEL

```java
ClassParser("C:\path\ClassFile.class").parse().getPackageName();
```

## 객체생성

## JLine

- <http://jline.sourceforge.net/>

## View layer 기술

- <http://www.zkoss.org/>

## Domain Driven

### Rome

- <http://javacan.tistory.com/entry/ReadRSSAtomFeedUsingROME>

### Apache Click

- <http://www.ibm.com/developerworks/kr/library/wa-apacheclick/index.html>

## framework 개발원칙

- [Application Framework 개발의 원칙](http://toby.epril.com/?p=403)
- [A Framework is… / Kent Beck](http://toby.epril.com/?p=482)

A software framework is a set of classes that make up a reusable design for an application or, more commonly, one tier of an application

- <http://portal.acm.org/citation.cfm?id=1042246>

## 소프트웨어 재사용과 Framework

<http://www.frameworkslab.com/library/soft_reuse.htm>

### 1. Software 재 사용(Reuse) 기술과 Framework

프레임워크의 정의를 이해하기 위해서는 Software Reuse 기술을 먼저 이해해야 한다. Software의 Reuse 기술은 90년대초 객체 지향 시대에서부터 형성되어서 현재까지도 많은 개발 패러다임에서 주요한 기술로 자리잡고 있다. 초기 Copy & Paste level의 재사용에서 상속(inheritance)과 다형성(polymorphism)등 객체(Object)의 시대로, 그리고 점차 software 시스템의 복잡도와 크기, 통합의 요구가 증가하게 됨에 따라 이제는 하나의 Black Box 단위로 재사용하는 Component 기반의 소프트웨어 개발 방법이 패러다임의 메인 흐름으로 자리잡고 있다.

![Paradigm of Software Development](https://raw.githubusercontent.com/benelog/devnote/master/attachments/175114_tech1-forprincess.jpg)

그림. Paradigm of Software Development

위 그림에서 볼 수 있듯이 Framework 기술은 Software Reuse 분야에서 발전하고 있는 기술이다. 하나의 단일 Application을 개발하는 것이 아니고 다수의 Application을 제작하는 것에 목적을 두고 여기에 소요되는 생산성과 품질을 높이기 위해서 Application 마다 들어가는 필수적인 코드와 알고리즘, Object 와 Common Component를 가지고 어느 정도 이미 구성을 해서 Semi Application 레벨로 혹은 완성도를 높여서 Application Generator에 가깝게 만든 것을 프레임워크(Application Framework)라 부른다.

이러한 패러다임의 변화에 따라 프로그래밍 언어도 계속 해서 옷을 바꾸어서 서비스 하고 있다. 예를 들어 구조적 분석 설계 기법이 주된 시대에서는 C나 Pascal 등의 언어가 이의 개념을 서비스 하고 객체의 시대 에서는 추상화, 상속, 다형성 등을 지원하기 위한 C++이나 Java, Eiffel 같은 언어가 등장 하였다. SW Reuse에 대한 요구가 높아지면서 C++에서 발전된 Microsoft사의 COM/DCOM 기술, Java 진영에서는 프로그램 내에서 재 사용 가능한 Java Beans나 분산 환경에서 재 사용 가능한 EJB 기술이 등장 하게 되었다.

그렇다면 Framework의 구현체는 무엇이 있을까. 거의 Product Platform에 유사한 Microsoft사의 .NET Framework와 Java 에서는 Struts와 Turbine등 Open과 상용을 합친다면 Web Application Frameworks만 하더라도 50여개 이상이 존재한다.

### 2. Frameworks 정의와 구성 요소

> "A framework is a set of cooperating classes that make up a reusable design for a specific class of software." - R. Johnson

> "Frameworks are reusable designs of all or part of a software system described by a set of abstract classes and the way instances of those classes collaborate" - E. Fayad

Framework의 정의는 GoF Pattern으로 유명한 Ralph Johnson교수의 정의가 많이 인용된다. Software의 구체적인 부분에 해당하는 설계와 구현을 재 사용이 가능하게끔 일련의 협업화된 형태로 클래스들을 제공하는 것이 프레임워크다 라고 밝히고 있다.

프레임워크는 다른 재 사용의 개념보다 보다 더 애플리케이션 기술에 특화 되어 있다. 그러므로 컴포넌트나 패턴의 개념과는 달리 애플리케이션에 종속적인 구조를 가지고 간다. 하지만 잘 설계된 프레임워크는 반드시 확장이 가능하게끔 Hot Spot 이라고 하는 변경이 가능한 부분과 Frozen Spot이라고 하는 변경이 불가능 한 분분을 제공해서 이질의 확장 가능한 애플리케이션을 구현이 가능하게끔 도와준다.

- Framework은 semi-application이다
- Frameworks은 application generator이다
- Framework은 다수 application을 위한 Template을 제공한다.

Frameworks은 Application 제작에 필요한 다수의 Tool Box를 제공한다. 이 Tool Box는 블랙박스 형태의 컴포넌트와 달리 Architecture 와 Source Code, Pattern 등의 Complete 한 형태의 산출물이 포함되어 있다.

보다 더 명확한 정의를 위해서 Framework이 아닌 것을 들어 보자면,

- Framework은 web container 나 application server가 아니다.
- Framework은 단지 하나의 API가 아니다
- Framework은 완성된 Application이 아니다
- Framework은 component가 아니다
- Framework은 IDE가 아니며 개발 환경을 제공해 주지 않는다.

프레임워크은 구성요소에 따라서 분류가 가능한데 객체 기술이 포함되어 있지 않은 주로 통신 도메인에서 사용되는 C 기반의 Non-OO Frameworks과 주로 발전되어 왔던 Object Oriented Frameworks, 그리고 현재는 Object와 Component를 주된 요소로 구성한 Component Framework이 카테고리 상으로 계속 만들어 지고 있다. Component Framework은 대부분 MVC에 기반하여 구성되며 구성숙도에 따라서 System 레벨의 컴포넌트와 경우에 따라서 특정 도메인의 객체와 프로세스가 포함된 Business Component 등을 포함할 수도 있다.

그림. Component Framework의 Conceptual Diagram

위 에서도 언급했듯이 프레임워크의 구성요소는 최종 타겟이 되는 애플리케이션의 유형에 따라서 그 구성 클래스와 컴포넌트가 다양하다. 대부분의 차세대 애플리케이션이 엔터프라이즈 환경의 Web Architecture를 가지고 가기 때문에 현재 주로 나오고 있는 Framework은 Enterprise(분산) 환경의 Web Application Frameworks이 대 부분이며 기본적인 구성 컴포넌트가 다음과 같다.

- Object Pooling
- Task Management
- Hook Method(확장을 위한 요소)
- Server Page Engine
- Command Package
- Object Message (Asynchronous)
- Security
- exception 처리
- MQ 처리
- Log Handler
- Database Manager
- Configuration & Install Services
- WAS Deployment Service
- Event 처리와 i18n(국제화, internalization) 기능
- Asynchronous Request Processing 처리와 XML Support
- Report 기능 등

![General Framework의 구성 패키지](https://raw.githubusercontent.com/benelog/devnote/master/attachments/175118_li1-forprincess.jpg)

그림. General Framework의 구성 패키지

![J2EE 기반의 Component Architecture](https://raw.githubusercontent.com/benelog/devnote/master/attachments/175119_li3-forprincess.jpg)

그림. J2EE 기반의 Component Architecture

### 3. Application Framework의 분류 체계

프레임워크를 분류하는 기준은 크게 application의 유형에 따라서 나뉠수 있고, 기타 특정 기능들에 국한된 유틸리티 형태의 프레임워크와 전체 플랫폼을 구성하는 Enterprise Framework 으로도 다양한 관점으로 분류가 가능하다.

- ㄱ. Application Specific Frameworks
  - A. Web Application Frameworks
    - i. Full MVC Frameworks(Complete Application Frameworks)
      1. Expresso
      2. realMethods
      3. SOFIA 등
    - ii. Model(Database Integration) Frameworks(Data Frameworks)
      1. Avalon
      2. Maverick 4 Java, Maverick 4 NET 등
    - iii. View & Controller Frameworks
      1. IBM의 Echo
      2. Barracuda Presentation Framework
    - iv. Controller Frameworks
      1. Apache그릅의 Struts 등
  - B. Enterprise XML Frameworks
    - i. Cocoon Framework 등
- ㄴ. Functional Frameworks(Utility Framework)
  - A. 200여개 이상의 Open 및 상용 Framework
- ㄷ. Domain Specific Frameworks
  - A. Telecommunication
  - B. Manufacturing
    - i. Sematech의 EES 프레임워크
  - C. Financial
  - D. 기타 등등
- ㄹ. Vender Frameworks
  - A. Microsoft's .NET Frameworks
  - B. SUN One Application Frameworks
  - C. Oracle의 ADF(Application Development Framework)
- ㅁ. Machine related Frameworks
  - A. Ubiquitous Frameworks
  - B. Real Time & Embedded Framework 등
- ㅂ. Meta Frameworks
  - A. Keel Frameworks 등

### 4. Reference

- Struts
  - <http://jakarta.apache.org/struts/index.html>
- Expresso
  - <http://www.jcorporate.com/>
- Maverick
  - <http://mavnet.sourceforge.net/>
- Sun One Application Framework
  - R. Johnson교수의 Home Page

- 첨부: ![li2-forprincess.jpg](https://raw.githubusercontent.com/benelog/devnote/master/attachments/175117_li2-forprincess.jpg)

## Children

- [[search-engine]]
- [[ejb]]

## Related
- [[design-pattern]]
- [[java-web-framework]]
- [[spring]]
- [[ejb]]
- [[struts]]
- [[architecture]]
