## SOA

- [2008년 SOA 기술 전망](http://bcho.tistory.com/entry/2008%EB%85%84-SOA-%EC%A0%84%EB%A7%9D)
- [What is SOA? How to SOA?](http://bcho.tistory.com/entry/What-is-SOA-How-to-SOA)
- [Whoa There: SOA, SOA 2.0, ROA, WOA. An Acronym Too Far?](http://www.infoq.com/news/2008/06/whoa-woa)
- [\[마소 4월호 기고\] SaaS로 가는 길](http://arload.wordpress.com/2008/04/10/theroadtosaas/)
- [SOA를 공부하세요. 최고입니다.](http://bcho.tistory.com/357)
- <http://www.manning.com/davis/>
- <http://www.ibm.com/developerworks/webservices/library/ws-soa-method2/?ca=drs-t4805>
- <http://www.ibm.com/developerworks/webservices/library/ws-soa-granularity/>

### 뉴스

- [SOA 성패 전사 공감대에 달렸다](http://www.dt.co.kr/contents.htm?article_no=2008043002010660744001)

### WOA

- [웹지향아키텍처(WOA)](http://www.dt.co.kr/contents.html?article_no=2009013002011860744001)
- <http://en.wikipedia.org/wiki/Web_Oriented_Architecture>
- <http://blogs.gartner.com/nick_gall/2008/11/19/woa-putting-the-web-back-in-web-services/>
- [SOAP 기반 웹서비스와 RESTful 웹서비스 기술 비교](http://ettrends.etri.re.kr/PDFData/25-2_112_120.pdf)

### RPC style vs Document style

- <http://www.informit.com/articles/article.aspx?p=349749&seqNum=4>

## ESB

- <http://javamaster.wordpress.com/2009/08/19/esb-design-pattern-generic-proxy-pattern/>

## SOA 관련 강의

Business flexbility, 비즈니스 민첩성(agility)

비즈니스 측면에서 좀더 빨리 시장에 delivery하는 방향에 초점을 맞춘 아키텍쳐.

서비스 지향적으로. 시스템 통합

테크놀로지가 아니다. 아키텍쳐다.

100대 기업 조사 - 10년만에 업종의 80%가 바뀐다. 비즈니스에 빨리 대응해야함. responsiveness

비즈니스 펑션이 서비스로 노출되어있다.

표준화된 인터페이스 사용

Loosely coupled

Building block reuse : 모듈화 잘 되어있어 시스템간 조립 용이(레고 블록처럼)

Web Service 지향함.

- Service provider
- Service requester
- Service Brocker

모듈화하여 각 시스템에 역할과 책임 부여

| Portal | ESB |
|---|---|
| BPM Workflow | ESB |
| ISF | ESB |
| APP.Server | ESB |

ESB(Enterprise Service Bus) : 서비스 요청하면 연결시켜서 서비스를 제공하는.

- 많은 애플리케이션들의 연결 접점(endpoint)으로서 가능한 서비스 지향적인 메시지 백본(backbone)을 의미

오케스트라.

policy based Core Business Flexibility

어떤 것을 서비스하느냐가 가장 큰 관건 - Service Model 정의

Why SOA? For Integration? Reuse? MultiChannel? or B2B Connection?

참고자료: [SOA가_바꿔놓을_세상.pdf](https://github.com/benelog/devnote/blob/master/attachments/51912_SOA%EA%B0%80_%EB%B0%94%EA%BF%94%EB%86%93%EC%9D%84_%EC%84%B8%EC%83%81.pdf) (이호연씨 제공)

## Web service 개발 Life cycle

### 웹서비스 아키텍쳐의 구성요소

- 서비스를 등록하는 레지스트리
- 서비스 제공자
- 서비스 이용자

### 웹서비스 개발 시나리오의 단계

1. 서비스 인터페이스를 만든다.
2. 서비스 인터페이스를 발행한다.
3. 웹서비스를 생성하고 배포한다.
4. 서비스 구현부의 정의를 발행
5. 웹서비스를 사용자가 실행

### 웹서비스 개발 단계

#### 구축단계

웹 서비스를 개발하고 테스팅하며, 서비스 인터페이스와 구현부를 기술하는 단계를 포함함

웹 서비스의 구현부는 새로운 웹 서비스를 구현하는 방식으로 만들 수도 있음

기존의 애플리케이션을 웹 서비스로 전환하는 방식으로 만들 수도 있음

다른 웹 서비스와 애플리케이션을 조합해서 새로운 웹 서비스를 만들 수도 있음

#### 배포단계

서비스 인터페이스와 서비스 구현부에 대한 정의를 외부에 발행, 웹 서비스의 런타임 코드를 배포하는 과정

백엔드 레거시 시스템과의 통합 등을 포함

#### 실행단계

웹 서비스를 완전히 배포하고 동작할 수 있도록 하는 것

서비스 사용자는 서비스에 대한 내용들을 찾아볼 수 있고, 이 내용들을 바탕으로 사용하고자 하는 서비스 오퍼레이션을 실행할 수 있음

실행 단계의 기능에는 정적 바인딩과 동적 바인딩, 그리고 SOAP 메시징을 이용한 서비스 상호 작용 등이 있음.

레거시 시스템과의 상호 작용이 일어남

#### 관리단계

웹 서비스의 개발의 전체 생명주기에 관여

보안이나 가용성, 수행성능과 같은 각종 서비스 품질이 주요 관리 대상

## EAI

### EAI 정의

- <http://en.wikipedia.org/wiki/Enterprise_application_integration>

Enterprise Application Integration (EAI) is defined as the uses of software and computer systems architectural principles to integrate a set of enterprise computer applications.

가트너 그룹 : unrestricted sharing of data and business processes among any connected application or data sources in the enterprise

In 2003 it was reported that 70% of all EAI projects fail.

- [EAI 도입전략](http://bcho.tistory.com/entry/EAI-%EB%8F%84%EC%9E%85-%EC%A0%84%EB%9E%B5)
- <http://en.wikipedia.org/wiki/Enterprise_service_bus>
- <http://en.wikipedia.org/wiki/Data_integration>
- <http://en.wikipedia.org/wiki/Semantic_Integration>
- <http://en.wikipedia.org/wiki/Enterprise_Content_Integration>
- [http://www-306.ibm.com/software/data/integration/db2ii/editions_content.html](http://en.wikipedia.org/wiki/De_jure)
- [ETL vs EAI](http://bcho.tistory.com/334)

### EAI 프로그램들

- [Java Open Source EAI](http://www.manageability.org/blog/stuff/open-source-messaging-integration-transformation-routing-java/view)

#### opensyncro

- <http://opensyncro.org/>

Tomcat 위에서 돌아감. MySQL에 설정 데이터 저장

- <http://opensyncro.org/OpenSyncro_User_Manual_v2_2.pdf>

## Related
- [[data-integration]]
- [[messaging-queue]]
- [[rest]]
- [[rpc-protocol]]
- [[architecture]]
- [[msa-solutions]]
