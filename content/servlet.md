JSP의 문제점 : <http://www.servlets.com/soapbox/problems-jsp.html>

서블릿이란 <http://nettop.pe.kr/nettop/nettop3/link/servlet/servlet.htm>

[JAVA 웹프로그래머의 기본](http://youngrok.com/wiki/wiki.php/%C0%DA%B9%D9%C0%A5%C7%C1%B7%CE%B1%D7%B7%A1%B8%D3%C0%C7%B1%E2%BA%BB)

한스의 10가지 jsp tip

GET, POST, MULTI-PART <http://blog.naver.com/essbihan/100005665540>

    JSP 샘플코드

<http://blog.naver.com/parkjinhang/120004186612>

JSP 2.0에서 변한것

JSP 서블릿 한글문제

<http://blog.naver.com/sungback/90006711364>

HTML에서 웹브라이저가 알 수 있게 인코딩 설정

blob으로 저장된 이미지 파일을 웹에 입출력

[http://javaservice.net/%7Ejava/bbs/read.cgi?m=devtip&b=servlet&c=r_p&n=1092807454&p=1&s=t](http://javaservice.net/~java/bbs/read.cgi?m=devtip&b=servlet&c=r_p&n=1092807454&p=1&s=t)

<http://blog.naver.com/yacjae/100020395789>

    Generating Images with JSPs and Servlets : http://today.java.net/pub/a/today/2004/04/22/images.html[http://today.java.net/pub/a/today/2004/04/22/images.html]

filter 사용예 :

[WAR 파일](http://blog.naver.com/alucard99/35593101)

    http://java.sun.com/j2se/1.5.0/docs/guide/net/http-keepalive.html[http://java.sun.com/j2se/1.5.0/docs/guide/net/http-keepalive.html]

## 기본 스펙 설명

ServletConfig는 서블릿당 하나 ServletContext는 웹 애플리케이션 당 하나

Listener HttpSessionBindingListener : 자기자신이 Sessoin에 추가,변경될때
이벤트 받을 수 있음

RequestDispatcher RequestDispatcher view =
request.getRequsetDispatcher("result.jsp");

Session id 첫번째 응답은 쿠키와 URL재작성을 동시에 사용 (URL재작성은
;jsessionid=123445 의 형식) URL 재작성을 jsp에서 알아서 붙이려면
\<c:url\> 혹은 reqsponse.encodeURL(url);

## Servlet 3.0

<http://www.oracle.com/webfolder/technetwork/tutorials/obe/java/async-servlet/async-servlets.html>
AsyncServlet

<http://www.nurkiewicz.com/2011/03/tenfold-increase-in-server-throughput.html>
<https://github.com/nurkiewicz/token-bucket/blob/master/src/main/java/com/blogspot/nurkiewicz/download/DownloadServletHandler.java>

<https://dzone.com/articles/limited-usefulness>
<http://javacan.tistory.com/201>

Comet <https://www.ibm.com/developerworks/library/wa-cometjava/>

Tomcat의 BIO/NIO와 sync/Async Servlet과의 조합 :
<https://groups.google.com/forum/?utm_medium=email&utm_source=footer#!msg/ksug/cLTLVpYD6P4/NpYnZwRYk0QJ>

## WAS

- <http://www.simpleframework.org/>
- [모시스템 WAS 아키텍처](http://bcho.tistory.com/373)

### session 설정

```xml
<session-config>
        <session-timeout>30</session-timeout>
</session-config>
```

## Winstone, 경량 Servlet container

Winstone(<http://winstone.sourceforge.net/>)은 jar파일 하나로 실행되는 간단한 Servlet Container입니다.

FTP처럼 서버에 있는 파일을 다운로드 할 때나, 웹애플리케이션을 jar파일로 패키징해서 WAS 설치없이 독립적으로 실행되도록 만드는 용도로 사용할 수 있습니다.

참고로, Hudson에서도 winstone을 활용하고 있습니다. hudson.war를 WAS에 설치하지 않아도 java -jar 로 바로 실행시킬 수도 있는데, 이 기능이 Hudson 패키징 파일 안에 내장된 winstone을 이용하는 방식입니다.

이 winstone을 간단하게 활용하는 방법을 정리해봤습니다.

### FTP대용으로 쓰기

아래 URL에서 winstone의 jar파일이 제공됩니다.

<http://sourceforge.net/projects/winstone/files/>

저는 접근하기 편한 URL에 올려놓고 wget 으로 다운로드하고 있습니다.

```sh
wget benelog.net/winstone.jar
```

받은 파일을 java -jar로 간단하게 실행하면 됩니다.

현재 디렉토리를 최상위 폴더로 실행하려면 아래와 같이 하면 됩니다.

```sh
java -jar winstone.jar --webroot=.
```

http포트를 지정하려면 --httpPort 옵션을 붙이면 됩니다.

```sh
java -jar winstone.jar --webroot=. --httpPort=18080
```

그런다음 해당서버에 지정된 포트로 접근하면 디렉토리의 파일 목록이 뜹니다. FTP와는 다르게 비밀번호가 없이 접근이 되므로 보안문제가 염려된다면 외부에 공개되지 않은 포트로 띄어야 하겠습니다.

그외의 다양한 옵션은 Winstone의 사이트(<http://winstone.sourceforge.net/>)에 자세히 나와 있습니다.

### 웹애플리케이션을 jar파일 하나로 실행되도록 패키징

앞선 hudson의 사례처럼, 별도의 WAS설치 없이 웹어플리션 배포 파일 자체에 WAS를 내장하는 방식입니다.

Jetty를 애플리케이션 안에서 직접 심어서(Embedding) 실행시켜도 같은 효과가 있습니다. 제가 간단하게 만들었던, dumper라는 도구에서도 그 방식을 활용했습니다.

<https://github.com/benelog/dumper/blob/master/src/main/java/Start.java>

Jetty를 war파일 안에 패키징해서 독립적을 실행가능한 방식도 있습니다. 아래 자료에 설명되어 있습니다.

그런데 위의 방식은 따로 실행 시작점이 되는 클래스를 만들어줘야하고, maven설정을 다소 많이 고쳐야하는 단점이 있습니다.

이에 반해서 winstone은 소스파일은 하나도 건드릴 필요없이, maven 설정도 건드리지 않거나 약간만 추가해서 혼자서 실행되는 jar파일을 만들어줍니다.

아무런 설정이 없어도 아래와 같이 실행하면 taget 폴더 아래에 .jar파일을 만들어 줍니다.

```sh
mvn net.sf.alchim:winstone-maven-plugin:embed
```

그리고 pom.xml에 아래 설정을 추가하면 'mvn package'로 패키징을 할 때마다 war파일과 함께 독립실행 가능한 jar파일도 만들어줍니다.

```xml
      <plugin>
        <groupId>net.sf.alchim</groupId>
        <artifactId>winstone-maven-plugin</artifactId>
        <version>1.2</version>
        <executions>
          <execution>
            <phase>package</phase>
            <goals>
              <goal>embed</goal>
            </goals>
          </execution>
        </executions>
      </plugin>
```

제가 만든 예제인 간단하게 서버에 파일을 올리는 프로그램에서도 이 방식을 썼습니다. 아래의 pom.xml에 이 설정에 포함되어 있습니다.

위 프로젝트를 받고서 mvn package를 하면 target 폴더 아래에 uploader.jar가 생기는데 java -jar uploader.jar 만 하면 웹애플리케이션이 실행되는 것이죠.

### 어디에 쓸까?

직접 서비스 운영과 서버관리를 담당하는 일반적인 웹애플리션에서는 Winstone을 쓸 일이 그다지 많아보이지는 않습니다. 다만 Huson처럼 패키징해서 배포하고, 여러 가지 옵션을 제공하는 패키지성 웹애플리케이션에서는 고려해볼만도 합니다. 유사하게 Lucene바탕의 API서버인 Solr(<http://lucene.apache.org/solr/>)에서는 Jetty를 이용한 stand-alone 실행모드를 제공합니다. 그리고 간단히 소수의 인원이 쓰는 관리도구나, Desktop application 성격의 프로그램이라도 Swint, AWT대신 Web의 UI 기술을 이용하고 싶을 때도 Winstone할 포함한 패키징을 고려해볼만도 합니다.

하지만 비슷한 용도의 Jetty와 비교해볼 때 winstone이 유망하다고 생각하지는 않습니다. 2008년도 이후에는 프로젝트 업데이트가 안 되고 있어서 앞으로의 전망이 어두워보입니다. 계속 이런 상태라면 Hudson에서도 언젠가는 Jetty로 갈아타지 않을까하는 생각도 듭니다. 별도로 클래스를 만들지 않아도 되는 장점등도 언젠가는 Jetty에서도 제공될수 있어 보입니다. 그리고 jsp를 쓰는 프로젝트에서는 따로 라이브러리를 지정해야 하는 것도 다소 번거롭습니다.

그래도 Wistone은 알아두면 서버에서 파일 주고 받을 때라도 유용하게 쓸 수도 있고, 교육 용도의 실습 프로젝트, 취미용 프로젝트에도 편하게 활용해볼만한 도구입니다.

## Children
- [[jboss]]
- [[jetty]]
- [[tomcat]]
- [[jsp]]
- [[jeus]]

## Related
- [[api-design]]
- [[mvc]]
- [[rest]]
- [[spring-mvc]]
- [[web-xml]]
- [[file-upload]]
