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

<div id="footer">

<div id="footer-text">

Last updated 2026-02-28 04:33:58 +0900

</div>

</div>

## Children
- [[web-xml]]

## Related
- [[jboss]]
- [[jetty]]
- [[java-encoding]]
- [[apache-httpd]]
