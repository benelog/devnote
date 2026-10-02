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

## Related
- [[tomcat]]
- [[servlet]]
- [[jsp]]
- [[file-upload]]
