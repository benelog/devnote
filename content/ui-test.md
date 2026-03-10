# Web page test

## HTTPUnit

- [http://httpunit.sourceforge.net](http://httpunit.sourceforge.net/)
- HTMLUnit과 유사. Http요청과 반응을 사용.
- <http://toby.epril.com/?p=153> \*
- 참고자료
- <http://blog.naver.com/jadin1?Redirect=Log&logNo=70018383230>
- 대표적 API <http://httpunit.sourceforge.net/doc/api/com/meterware/httpunit/WebResponse.html>

## HTMLUnit

- <http://htmlunit.sourceforge.net/> \*
- 웹브라우저를 시뮬레이트
- 참고자료
- <http://htmlunit.sourceforge.net/gettingStarted.html>
- <http://htmlunit.sourceforge.net/apidocs/com/gargoylesoftware/htmlunit/CookieManager.html>
- <http://htmlunit.sourceforge.net/apidocs/com/gargoylesoftware/htmlunit/html/HtmlPage.html>

## jwebunit

- <http://jwebunit.sourceforge.net/>
- Junit + HttpUnit의 테스트코드를 더욱 간결하게 만들어서 제공
- 참고자료
- Junit + HTMLUnit vs jwebUnit 코드비교 : <http://jwebunit.sourceforge.net/2.x/jwebunit-htmlunit-plugin/index.html>
- [jWebUnit 프레임웍으로 웹 애플리케이션 테스트를 간단하게!](http://blog.naver.com/minhan_nemo?Redirect=Log&logNo=40015688498)

public class HttpUnitTest { public static void main(String\[\] args) {
try { WebConversation wc = new WebConversation(); WebRequest request =
new GetMethodWebRequest("http://httpunit.sourceforge.net/index.html");
wc.setProxyServer( "your.proxy.com", 80 ); WebResponse response =
wc.getResponse(request); WebLink httpunitLink =
response.getFirstMatchingLink(WebLink.MATCH_CONTAINED_TEXT,"Cookbook");
response = httpunitLink.click(); System.out.println("Test successful
!!"); } catch (Exception e) { System.err.println("Exception: " + e); } }
}

## Selenium

- <http://www.openqa.org/selenium/> MockStrutsTestCase

[Canoo
WebTest](http://webtest.canoo.com/webtest/manual/WebTestHome.html)

<http://barcamp.tistory.com/tag/Selenium>

웹서비스 테스트 자동화와는 별 상관없는 작업을 위해…​\]

Selenium RC 를 사용해보자. I\]

Selenium RC 를 사용해보자. II\]

[Selenium을 이용한 테스트
전략](http://wiki.javajigi.net/pages/viewpage.action?pageId=294914)

[UsingSeleniumToNaverLogin
](http://openframework.or.kr/Wiki.jsp?page=UsingSeleniumToNaverLogin)

[Selenium RC를 이용한 웹 애플리케이션
테스트](http://www.ibm.com/developerworks/kr/library/wa-testweb/index.html)

## Watij

[WebDriver와 PageObject 패턴](http://toby.epril.com/?p=752)

## Web driver

[WebDriver와 PageObject 패턴](http://toby.epril.com/?p=752)

[웹드라이버(webdriver) pom.xml에 의존성
추가하기](http://whiteship.me/2223)

[webdriver - NextSteps](http://whiteship.me/2225)

[DBUnit + Cargo + Webdriver를 이용한 웹 테스트 삽질
중](http://whiteship.me/2224)

[webdriver - NextSteps](http://whiteship.me/2225)

## Cacus

- <http://jakarta.apache.org/cactus/>
- <http://jakarta.apache-korea.org/cactus/>
- [Cactus를 이용한 효율적인 테스트 전략](http://wiki.javajigi.net/pages/viewpage.action?pageId=279)

## Cargo

<http://cargo.codehaus.org/>

[Cargo 메이븐 플러그인 설정하기](http://whiteship.me/2226)

[Cargo의 TomcatManager](http://whiteship.me/2229)

## FIT

[웹 테스트 프레임워크(WebTUnit) 사용 시나리오 1. 웹 테스트 + 테스트
클래스 단위 데이터 관리](http://fit.c2.com/)

## 기타

[웹 통합 테스트 프레임워크 개발 중](http://whiteship.me/2236)

[웹 테스트 프레임워크(WebTUnit) 사용 시나리오 1. 웹 테스트 + 테스트
클래스 단위 데이터 관리](http://whiteship.me/2237)

[WebTUnit 사용 시나리오 2. 웹 테스트 + 테스트 메서드 단위 데이터
관리](http://whiteship.me/2238)

[WebTUnit 사용 시나리오 3. 테스트 데이터가 필요 없는
경우](http://whiteship.me/2239)

[WebTUnit에 CoC 적용 결과](http://whiteship.me/2243)

[WebTUnit 1.0 M1 배포합니다.](http://whiteship.me/2245)

# 사례

- [Selenium과 Cucumber를 활용해 웹 테스트 자동화하기 1](http://www.slipp.net/wiki/pages/viewpage.action?pageId=1736714)
- [Selenium과 Cucumber를 활용해 웹 테스트 자동화하기 2 - Feature별 실행](http://www.slipp.net/wiki/pages/viewpage.action?pageId=1736718)
- [Selenium과 Cucumber를 활용해 웹 테스트 자동화하기 3 - 브라우저 재사용](http://www.slipp.net/wiki/pages/viewpage.action?pageId=1736723)
