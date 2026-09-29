## JSP 기본 code

### page Directive

용법 : `<%@ page {attribute="value"} %>`

```jsp
<%@ page session="false">
```

페이지 지시어의 속성 설명

| 속성 | 설명 |
|------|------|
| language="scriptLanguage" | 페이지를 컴파일할 서버측 언어가 무엇인지 기술 |
| extend="className" | 페이지가 상속한 부모클래스를 정의 |
| import="importList" | 페이지가 import하는 자바팩키지 리스트 기술 (,로 구분) |
| session="true\|false" | 페이지에 session 데이터가 이용되는지의 여부를 결정 (디폴트값:true) |
| buffer="none\|size in kb" | 출력 스트림의 버퍼크기를 결정(디폴트값:8kb) |
| autoFlush="true\|false" | 출력버퍼가 자동적으로 비워지는가 또는 버퍼가 차면 익셉션을 발생할것인가 여부를 결정 (디폴트값:true) |
| isThreadSafe="true\|false" | JSP엔진에게 이 페이지가 일시에 다중으로 서비스할 수 있는가의 여부를 알림 (디폴트값은 true, 만약 이 값이 false로 셋팅되었다면 SingleThreadModel 로 페이지가 작동합니다.) |
| info="text" | JSP페이지에 관한 정보를 나타낸다. Servlet.getServletInfo()메소드를 이용해 접근가능 |
| errorPage="error_uri" | JSP 익셉션을 다루는 에러 페이지의 상대경로를 나타냄 |
| isErrorPage="true\|false" | 페이지가 에러핸들링하는 페이지인가를 기술(디폴트값:false) |
| contentType="ctinfo" | 클라이언트로 보내질 response의 MIME타입과 캐릭터셋 |

※ 디폴트 값이 적용되므로 개발자는 이 속성을 모두를 정의해 줄 필요가 없습니다.

```jsp
<!-- Cache management -->
<%
response.setHeader("Cache-Control","no-cache");
response.setHeader("Pragma","no-cache");
response.setHeader("Expires","-1");
%>

<!-- Korean(한글) 사용을 위한 선언 -->
<%@ page contentType="text/html;charset=euc-kr" %>

<%@ page contentType="text/html;charset=euc-kr" pageEncoding="utf-8" %>

<!-- Protocol 정보 가져와서 비교하기 -->
<% request.getProtocol().equals("HTTP/1.1") %>
```

### Redirect

```java
response.sendRedirect("/path/filename.jsp");
```

### Forward

```java
RequestDispatcher dispatcher = request.getRequestDispatcher(url);
dispatcher.forward(request, response);
```

### include

- <http://blog.naver.com/jeany4u/20003492238>

### Cookie

- [\[Cookie\] Cookie 관련 메소드](http://cafe.naver.com/hermeswing.cafe?iframe_url=/ArticleRead.nhn%3Farticleid=73)

## JSTL

### EL

### JSTL자료

- Java One 컨퍼런스자료 [javaone_jstl.pdf](https://github.com/benelog/devnote/blob/master/attachments/160732_javaone_jstl.pdf)
- 태그설명 자료 <http://blog.naver.com/hcs50/80016044502>
- 첨부: [\[JSTL\]_jstl-1_0-fr-spec.pdf](https://github.com/benelog/devnote/blob/master/attachments/176400__JSTL__jstl-1_0-fr-spec.pdf)

### fn 태그

<http://blog.naver.com/doit5993/6740524>

```jsp
<c:if test="${fn:length(ftpAuthList) == 0}" >

</c:if>
```

<http://blog.naver.com/pistos2/80012600841>

static method 활용 태그 <http://blog.naver.com/haruma95/80009565986>

### fmt태그

```jsp
<fmt:formatDate value="${ftpAuth.request_time}" pattern="yyyy/MM/dd HH:mm:ss" />
```

```xml
<context-param>
    <param-name>javax.servlet.jsp.jstl.fmt.locale</param-name>
    <param-value>ko</param-value>
</context-param>
```

### 각종서버 변수 출력예제

예: 서버명 : `<c:out value="${pageContext.request.serverName}" />`

### fmt

<http://blog.naver.com/reomereome/40016433522>

당신은 JSTL을 쓰시겠습니까?

<http://czar.tistory.com/198>

jstl 1.0

jstl 1.1

### sql

### 자주쓰는 JSTL

선언

```jsp
<%@ taglib prefix="c" uri="" %>
```

객체 설정

```jsp
<c:set var="list_yn" value="false" scope="request"/>
```

출력

```jsp
<c:out value='${vo.attribute}'/>
```

반복

```jsp
<c:forEach var='customer' items='${customers}'>
      Current customer is <c:out value='${customer}'/>
</c:forEach>

<c:forEach var="name" varStatus="name"
begin="expression" end="expression" step="expression">
body content
```

조건 if

```jsp
<c:if test="${list_yn == 'false'}">
            조회된 결과가 없습니다.
</c:if>
```

조건 choose

```jsp
<c:choose>
   <c:when test="${detail.myWorkNum =='1' }">
    일의 번호가 1이군요.
   </c:when>

   <c:when test="${detail.myWorkNum =='2' }">
          일의 번호가 2이군요.
   </c:when>
   <c:otherwise>
지정된 일의 번호가 아니군요
   </c:otherwise>
</c:choose>
```

```jsp
<c:url value="${param.url}" var="url">
<c:param name="name" value="${param.name}"/>
<c:param name="pwd" value="${param.pwd}"/>
<c:param name="email" value="${param.email}"/>
</c:url>
<br/><b>The resulting URL is:</b>
<c:out value="${url}"/>
```

`<%= request.getContextPath() %>/servlet/info.UserInfo">`를 대신

- [\[taglib\] c:url 사용 시 주의 사항 (image, js, css 경로)](http://blog.naver.com/phrack/80105009259)

## Related
- [[servlet]]
- [[tomcat]]
- [[java-web-framework]]
- [[struts]]
- [[spring-mvc]]
