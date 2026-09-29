<div id="header">

</div>

<div id="content">

<div class="paragraph">

[Session Replication in Tomcat 5 Clusters, Part
1](http://www.onjava.com/pub/a/onjava/2004/11/24/replication1.html)

</div>

<div class="sect1">

### Performance

<div class="sectionbody">

<div class="ulist">

- <a href="https://www.slideshare.net/Paganel/tomcatx-performancetuning" class="bare">https://www.slideshare.net/Paganel/tomcatx-performancetuning</a>
- <a href="https://medium.com/netflix-techblog/tuning-tomcat-for-a-high-throughput-fail-fast-system-e4d7b2fc163f" class="bare">https://medium.com/netflix-techblog/tuning-tomcat-for-a-high-throughput-fail-fast-system-e4d7b2fc163f</a>

  <div class="ulist">
  - acceptCount 에 대해 자세히 설명
  - 28 페이지에 NIO Connector 관련

  </div>
- <a href="https://medium.com/netflix-techblog/tuning-tomcat-for-a-high-throughput-fail-fast-system-e4d7b2fc163f" class="bare">https://medium.com/netflix-techblog/tuning-tomcat-for-a-high-throughput-fail-fast-system-e4d7b2fc163f</a>

  <div class="ulist">
  - 앞 단에 Apache Httpd 제거

  </div>

- <http://www.tomcatexpert.com/blog/2010/03/24/myth-or-truth-one-should-always-use-apache-httpd-front-apache-tomcat-improve-perform>

</div>

</div>

</div>

<div class="sect1">

### EL

<div class="sectionbody">

<div class="ulist">

- <https://issues.apache.org/jira/browse/EL-5>

</div>

<div class="paragraph">

tomcat 6에서는 EL 관련 라이브러리를 두가지를 사용

</div>

<div class="ulist">

- el-api.jar (EL 2.1 API)
- jasper-el.jar (Jasper 2 EL implementation)

</div>

<div class="paragraph">

그 반면 tomcat 5.5에서는 apache commons에 있는 EL을 사용 \*
<http://apache.tt.co.kr/tomcat/tomcat-5/v5.5.29/RELEASE-NOTES> \* <a
href=",+2nd+Edition/9780596101060/ch04.html#benchmark_results_for_serving_small_tex"
class="bare">,+2nd+Edition/9780596101060/ch04.html#benchmark_results_for_serving_small_tex</a>

</div>

</div>

</div>

<div class="sect1">

### Admin

<div class="sectionbody">

<div class="ulist">

- [Tomcat 4/5.x 의 Administration tool을 보자.](http://blog.naver.com/eclipse4j.do?Redirect=Log&logNo=120004176433)
- [tomcat 5.5.9 에 admin 설치 하기](http://blog.naver.com/hdyu12?Redirect=Log&logNo=10001167934)

- [Tomcat 서버 설치 및 환경 세팅](http://wiki.javajigi.net/pages/viewpage.action?pageId=381)
- [Tomcat 설정파일 server.xml 주석](http://blog.naver.com/harurun?Redirect=Log&logNo=120060048679)

</div>

</div>

</div>

<div class="sect1">

### Tomcat context

<div class="sectionbody">

<div class="ulist">

- [Tomcat에서 Context.xml을 이용한 자카르타 DBCP 설정](http://blog.naver.com/innoc99/140052476110)
- [Tomcat 5.5에서 context 설정](http://blog.naver.com/dulposooil/140047520131)
- <http://blog.naver.com/soulooso/60035921997>

- [단일 Tomcat 서버에서 가상 호스트 설정법과 각 호스트별 Manager 기능 설정](http://okjsp.pe.kr/seq/91825)

</div>

<div class="sect2">

#### Monitoring

<div class="ulist">

- [\[jconsole](http://www.tuning-java.com/171) JConsoled을 사용해서 Tomcat 5.5 모니터링 하기\]
- <a href="http://www.lambdaprobe.org/d/index.htm" class="bare">http://www.lambdaprobe.org/d/index.htm</a>
- [Memory leaks where the classloader cannot be garbage collected](http://opensource.atlassian.com/confluence/spring/pages/viewpage.action?pageId=2669)

</div>

</div>

</div>

</div>

<div class="sect1">

### Tomcat 7

<div class="sectionbody">

<div class="ulist">

- <http://java.dzone.com/articles/mark-thomas-apache-tomcat-7>

- <http://java.dzone.com/articles/memory-leak-protection-tomcat>
- [\[톰캣](http://whiteship.me/2599) 톰켓 7의 메모리 누수 방지\]

- <http://tomcat.apache.org/tomcat-6.0-doc/aio.html>
- <http://www.tomcatexpert.com/blog/2011/01/26/cross-site-scripting-xss-prevention-tomcat-7>

</div>

</div>

</div>

<div class="sect1">

### Tomcat classloader

<div class="sectionbody">

<div class="ulist">

- [톰캣 6.0 클래스로더 구조](http://whiteship.me/2587)
- <http://knight76.tistory.com/entry/sunmiscGC-%ED%81%B4%EB%9E%98%EC%8A%A4>

</div>

</div>

</div>

<div class="sect1">

### Tomcat cookie 관련 버그

<div class="sectionbody">

<div class="ulist">

- <https://issues.apache.org/bugzilla/show_bug.cgi?id=47429>
- <http://tomcat.apache.org/tomcat-6.0-doc/changelog.html>

</div>

</div>

</div>

<div class="sect1">

### 설정구성

<div class="sectionbody">

<div class="ulist">

- <http://www.tomcatexpert.com/blog/2010/06/16/deciding-between-modjk-modproxyhttp-and-modproxyajp>
- <http://www.infoq.com/presentations/Tuning-Tomcat-Mark-Thomas>
- <http://www.infoq.com/presentations/Diagnosing-Memory-Leaks>
- <http://wiki.apache.org/tomcat/MemoryLeakProtection>

</div>

</div>

</div>

<div class="sect1">

### Security

<div class="sectionbody">

<div class="ulist">

- <a href="http://mail-archives.apache.org/mod_mbox/www-announce/201201.mbox/%%3Ca%20href=" mailto:3c4f155cdc.8050804@apache.org"="">3C4F155CDC.8050804@apache.org</a>%3E"\>http://mail-archives.apache.org/mod_mbox/www-announce/201201.mbox/%<3C4F155CDC.8050804@apache.org>%3E
- <a href="http://mail-archives.apache.org/mod_mbox/www-announce/201201.mbox/%%3Ca%20href=" mailto:3c4f155ce2.3060301@apache.org"="">3C4F155CE2.3060301@apache.org</a>%3E"\>http://mail-archives.apache.org/mod_mbox/www-announce/201201.mbox/%<3C4F155CE2.3060301@apache.org>%3E

</div>

</div>

</div>

<div class="sect1">

### SSL

<div class="sectionbody">

<div class="ulist">

- Tomcat에 SSL 인증서 설치하기 : <http://whiteship.me/?p=13548>

</div>

</div>

</div>

<div class="sect1">

### Tomcat maven plugin

<div class="sectionbody">

<div class="paragraph">

<a href="https://github.com/apache/tomcat-maven-plugin"
class="bare">https://github.com/apache/tomcat-maven-plugin</a>

</div>

<div class="listingblock">

<div class="content">

``` highlight
<plugin>
        <groupId>org.apache.tomcat.maven</groupId>
        <artifactId>tomcat6-maven-plugin</artifactId>
        <version>2.0</version>
    </plugin>
    <plugin>
        <groupId>org.codehaus.mojo</groupId>
        <artifactId>tomcat-maven-plugin</artifactId>
        <version>1.1</version>
        <configuration>
            <path>/</path>
        </configuration>
    </plugin>
    <plugin>
        <groupId>org.apache.tomcat.maven</groupId>
        <artifactId>tomcat7-maven-plugin</artifactId>
        <version>2.1</version>
        <configuration>
            <path>/</path>
        </configuration>
    </plugin>
```

</div>

</div>

</div>

</div>

<div class="sect1">

### Embeded WAS

<div class="sectionbody">

<div class="ulist">

- [Local 개발환경에서 WAS를 띄우는 여러가지 방법](http://blog.benelog.net/2879657)
- [eclipse에 embedded tomcat 연결](http://www.slipp.net/wiki/pages/viewpage.action?pageId=16711743) (박재성)
- [IDE에서 embedded tomcat을 직접 실행할 때 발생하는 에러 해결](http://www.slipp.net/questions/208)
- [WTP 버리고 embedded tomcat 활용하자](http://www.slipp.net/questions/209)
- [UI 테스트에 Embeded Tomcat을 사용한 사례](https://github.com/benelog/tomcat-bed) (정상혁)

  <div class="ulist">
  - [WebApplicationServer.java](https://github.com/benelog/tomcat-bed/blob/master/tomcat-bed-test/src/test/java/net/benelog/tomcatbed/WebApplicationServer.java)

  </div>

</div>

</div>

</div>

</div>

## Enterprise Tomcat

- <http://www.mulesoft.com/tcat-server-tomcat-monitoring-diagnostics>
- <http://www.mulesoft.com/tcat-server-enterprise-tomcat-application-server?x_lf_kt=2&_x_lf_kvid=e72ee910-2004-4b68-8e7e-64718284664e>

### Tc server

- <http://www.theregister.co.uk/2010/05/04/jboss_pizza_hut_spring/>
- <http://blogs.vmware.com/performance/2010/09/performance-of-enterprise-java-applications-on-vmware-vsphere-41-and-springsource-tc-server.html>

## Tomcat JNDI 설정

- <http://tomcat.apache.org/tomcat-5.5-doc/jndi-datasource-examples-howto.html>
- <http://tomcat.apache.org/tomcat-6.0-doc/jndi-datasource-examples-howto.html>
- [Tomcat 5 JNDI DataSource를 통한 DB 커넥션 풀 사용](http://blog.naver.com/jambeer?Redirect=Log&logNo=90000104051)
- [Tomcat 5.5 JNDI Datasource](http://link.allblog.net/8031792/http://thlife.net/30)
- Tomcat 밖에서 JNDI 접근 : 지금은 안됨.
- [톰캣 JNDI 를 이용한 커넥션풀을 이클립스(dynamic web project)에서 적용하기](http://link.allblog.net/3565469/http://blog.naver.com/goodhi1010/120036524764)

## Tomcat cloud

### Tomcat + Memcached

## Tomcat encoding

1. GET

Tomcat Connector 항목(HTTP, AJP)의 URIEncoding 속성

```xml
<Connector port="8080" protocol="HTTP/1.1"
               connectionTimeout="20000"
               redirectPort="8443" URIEncoding="UTF-8"/>
```

2. POST

HTTP 요청의 Header에서 Context-Type 항목의 charset 속성값

```text
...
Context-Type: text/html; charset=ISO-8859-1
```

```xml
<filter>
  <filter-name>encodingFilter</filter-name>
  <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
  <init-param>
    <param-name>encoding</param-name>
    <param-value>UTF-8</param-value>
  </init-param>

  <init-param>
    <param-name>forceEncoding</param-name>
    <param-value>true</param-value>
  </init-param>
</filter>

<filter-mapping>
  <filter-name>encodingFilter</filter-name>
  <url-pattern>/*</url-pattern>
</filter-mapping>
```

3. JSP

```jsp
<%@page contentType="text/html; charset=UTF-8" %>
```

4. Response

`response.setContentType("text/html; charset=UTF-8")` 이나 `response.setCharacterEncoding("UTF-8")`

### 한글 코드 문제와 해결방법

```jsp
<%@ page contentType="text/html; charset=EUC_KR" %>

<%@ page contentType="text/html; charset=EUC_KR" %> ...

<% String userId = new String(request.getParameter("id").getBytes("Cp1252"), "EUC_KR");

...
```

JSP에서 Beans 사용하기 `<jsp:setProperty>`

JSP 문서

```jsp
<jsp:useBean scope="page"/>

<jsp:setProperty name="user" property="*"/>

<% user.toKorean(); %>
```

User Bean (User.java)

```java
import java.io.*;
import CharacterSet;

public class User {
    private String id;
    private String password;

    public void setId(String str) { id = str; }
    public void setPassword(String str) { password = str; }
    public String getId() { return id; }
    public String getPassword() { return password; }

    public void toKorean() {
        id = CharacterSet.toKorean(id);
    }
}
```

CharacterSet 클래스 (CharacterSet.java)

```java
import java.lang.*;
import java.io.*;

public class CharacterSet {
    public static String toKorean(String str) {
        try {
            return new String(str.getBytes("Cp1252"), "EUC_KR");
        } catch (UnsupportedEncodingException e) {
            return null;
        }
    }
}
```

### Web.xml

```xml
<filter>
<filter-name>Set Character Encoding</filter-name>
<filter-class>filters.SetCharacterEncodingFilter</filter-class>
<init-param>
<param-name>encoding</param-name>
<param-value>euc-kr</param-value>
</init-param>
</filter>
<filter-mapping>
<filter-name>Set Character Encoding</filter-name>
<url-pattern>/*</url-pattern>
</filter-mapping>
```

### Server.xml

### 설정파일

`/usr/local/share/jakarta-tomcat-5.0.19/conf/web.xml` charset추가

```xml
<mime-mapping>
<extension>htm</extension>
<mime-type>text/html;charset=euc-kr</mime-type>
</mime-mapping>
<mime-mapping>
<extension>html</extension>
<mime-type>text/html;charset=euc-kr</mime-type>
</mime-mapping>
```

`/usr/local/apache/conf/httpd.conf` 아래 두줄 추가

```apache
AddCharSet EUC-KR .euc-kr
AddDefaultCharSet EUC-KR
```

- <http://blog.naver.com/syberhiphop/10031746625>

## Tomcat web.xml 구조

web.xml이란

Deployment Descriptor로 각 어플리케이션의 환경을 설정하는 부분을 담당한다. WAR 파일이 패키지 될 때 같이 포함되며 root directory 밑에 /WEB-INF 디렉토리에 위치한다.

### web.xml 의 구조

xml 정의와 schema 선언

```xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<!DOCTYPE web-app PUBLIC "-//Sun Microsystems, Inc.//DTD Web Application 2.3//EN"
    "http://java.sun.com/dtd/web-app_2_3.dtd">
```

위 스키마는 sun 사에서 미리 정의된것이다.

웹 어플리케이션의 환경 설정

```xml
<web-app>
    <servlet>
      <servlet-name>사용되는 클래스명</servlet-name>
      <servlet-class>클래스 경로</servlet-class>
    </servlet>
    <mime-mapping>
      <extension>txt</extension>
      <mime-type>text/plain</mime-type>
    </mime-mapping>
    <welcome-file-list>
      <welcome-file>기본 파일 경로</welcome-file>
      <welcome-file>두번째 시작하는 파일 경로</welcome-file>
    </welcome-file-list>
    <taglib>
      <taglib-uri>태그라이브러리</taglib-uri>
      <taglib-location>경로</taglib-location>
    </taglib>
</web-app>
```

web.xml은 xml파일이다. 따라서 xml 작성과 동일한 규칙이 적용된다. 환경설정은 `<web-app>`으로 시작하고 `</web-app>`로 끝난다. 그외 삽입되는 요소로는 다음과 같다.

- ServletContext Init Parameters
- Session Configuration
- Servlet/JSP Definitions
- Servlet/JSP Mappings
- Mime Type Mappings
- Welcom File list
- Error Pages

### web.xml의 elements의 순서

각 element의 순서는 아래 순서에 따른다.

```text
<icon?>,
<display-name?>,
<description?>,
<distributable?>,
<context-param*>,
<filter*>,
<filter-mapping*>,
<listener*>,
<servlet*>,
<servlet-mapping*>,
<session-config?>,
<mime-mapping*>,
<welcome-file-list?>,
<error-page*>,
<taglib*>,
<resource-env-ref*>,
<resource-ref*>,
<security-constraint*>,
<login-config?>,
<security-role*>,
<env-entry*>,
<ejb-ref*>,
<ejb-local-ref*>
```

### 자주 쓰이는 elements 예제

```xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<!DOCTYPE web-app PUBLIC "-//Sun Microsystems, Inc.//DTD Web Application 2.3//EN"
    "http://java.sun.com/dtd/web-app_2_3.dtd">

<web-app>
    <display-name>어플리케이션 이름</display-name>
    <description>어플리케이션 설명</desccription>
    <!-- 서블릿 매핑 : 보안과 주소를 간략화 하기 위해 사용
        http://localhost/servlet/KCount 이렇게 사용가능  -->
    <servlet>
      <servlet-name>KCount</servlet-name>
      <servlet-class>kr.pe.kkaok.mycount.KCount</servlet-class>
    </servlet>
    <!-- load-on-startup 옵션은 서버 구동시 자동으로 시작 되도록 하는 것이다. -->
    <servlet>
      <servlet-name>PoolManager</servlet-name>
      <servlet-class>kr.pe.kkaok.jdbc.PoolManager</servlet-class>
      <load-on-startup>1</load-on-startup>
    </servlet>
    <!-- 서블릿 매핑 : 위에서 servlet 부분을 삭제한다.
        http://localhost/KCount 이렇게 사용가능  -->
    <servlet-mapping>
      <servlet-name>KCount</servlet-name>
      <url-pattern>/KCount</url-pattern>
    </servlet-mapping>
    <!-- /servlet/* 과 동일한 패턴의 요청이 들어오면 servlet으로 처리 -->
    <servlet-mapping>
      <servlet-name>invoker</servlet-name>
      <url-pattern>/servlet/*</url-pattern>
    </servlet-mapping>
    <!-- 세션 기간 설정 -->
    <session-config>
      <session-timeout>
        30
      </session-timeout>
    </session-config>
    <!-- mime 매핑 -->
    <mime-mapping>
      <extension>txt</extension>
      <mime-type>text/plain</mime-type>
    </mime-mapping>
    <!-- 시작페이지 설정 -->
    <welcome-file-list>
      <welcome-file>index.jsp</welcome-file>
      <welcome-file>index.html</welcome-file>
    </welcome-file-list>
    <!-- 존재하지 않는 페이지, 404에러시 처리 페이지 설정 -->
    <error-page>
      <error-code>404</error-code>
      <location>/error.jsp</location>
    </error-page>
    <!-- 태그 라이브러리 설정 -->
    <taglib>
      <taglib-uri>taglibs</taglib-uri>
      <taglib-location>/WEB-INF/taglibs-cache.tld</taglib-location>
    </taglib>
    <!-- resource 설정 -->
    <resource-ref>
      <res-ref-name>jdbc/jack1972</res-ref-name>
      <res-type>javax.sql.DataSource</res-type>
      <res-auth>Container</res-auth>
    </resource-ref>
</web-app>
```

\* 만약 톰캣 4에서 servelt에 접근이 안되는 경우 아래는 okjsp.pe.kr 운영자 kenu님의 처리 방법이다.

invoker 서블릿의 매핑이 보안문제로 막혀있어서 발생하는 문제로 `$CATALINA_HOME/conf/web.xml`를 열고 해당 부분의 주석을 제거한다.

```xml
<!-- The mapping for the invoker servlet -->
<servlet-mapping>
  <servlet-name>invoker</servlet-name>
  <url-pattern>/servlet/*</url-pattern>
</servlet-mapping>
```

security-constraint 엘리먼트를 `$CATALINA_HOME/conf/web.xml` 파일의 welcome-file-list 엘리먼트 아래쪽 `<web-app>` 에 중첩되게 복사합니다.

```xml
<welcome-file-list>
    <welcome-file>index.html</welcome-file>
    <welcome-file>index.htm</welcome-file>
    <welcome-file>index.jsp</welcome-file>
</welcome-file-list>

<security-constraint>
  <display-name>Default Servlet</display-name>
  <!-- Disable direct alls on the Default Servlet -->
  <web-resource-collection>
    <web-resource-name>Disallowed Location</web-resource-name>
    <url-pattern>/servlet/org.apache.catalina.servlets.DefaultServlet/*</url-pattern>
    <http-method>DELETE</http-method>
    <http-method>GET</http-method>
    <http-method>POST</http-method>
    <http-method>PUT</http-method>
  </web-resource-collection>
  <auth-constraint>
    <role-name></role-name>
  </auth-constraint>
</security-constraint>
```

톰캣을 재시동하고 테스트해보면 정상적으로 작동하는걸 확인할 수 있다.

## 페이지 지정 설정

```xml
<!-- welcome file -->
 <welcome-file-list>
  <welcome-file>index.html</welcome-file>
 </welcome-file-list>

<error-page>
  <exception-type>java.lang.Exception</exception-type>
  <location>/common/error.jsp</location>
</error-page>

<error-page>
  <error-code>404</error-code>
  <location>/common/error.jsp</location>
</error-page>
```

<div id="footer">

<div id="footer-text">

Last updated 2026-02-28 04:33:58 +0900

</div>

</div>

## Related
- [[jboss]]
- [[jetty]]
