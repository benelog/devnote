- Jeus에서 다른 context의 클래스 파일을 참조하고자 할때 <http://openframework.or.kr/blog/?p=214>
- [JeusJDBC.pdf](https://github.com/benelog/devnote/blob/master/attachments/158484_JeusJDBC.pdf)
- [JeusJNDI관련.pdf](https://github.com/benelog/devnote/blob/master/attachments/158486_JeusJNDI%EA%B4%80%EB%A0%A8.pdf)
- [web class 변경 시 jeus 재구동 안하는 방법](http://blog.naver.com/phrack/80048636283)
- [노드명을 한글로 사용한 경우](http://blog.naver.com/phrack/80050788056)
- [\[JEUS, WebtoB\] 기본환경구성](http://blog.naver.com/loveji0702/140055315148)

## WebToB

```sh
wscfl -i http.m
```

```text
*ACCESS
access1 Order = "allow, deny", Allow = "all"
access2 Order = "allow, deny", Allow = "211.1.1.10, 211.1.1.20"
access3 Order = "allow, deny", Allow = "211.1.1.0/255.255.255.0"
access4 Order = "allow, deny", Deny = "all"

*URI
uri0         Uri      = "/examples", SvrType = JSV, AccessName = access1
*EXT
java      MimeType="text/html", SvrType = HTML, AccessName=access1
class     MimeType="text/html", SvrType = HTML, AccessName=access1
```

## Jeus 한글설정

```sh
scfg1
scfg1 is an alias for 'cd $JEUS_HOME/config/${HOST_NAME}/${HOST_NAME}_servlet_engine1'
```

WEBMain.xml 에서 encoding 부분 추가 또는 수정

```xml
<web-container>
    <redirect-stdout>true</redirect-stdout>
    <redirect-stderr>true</redirect-stderr>
    <context-group>
        <group-name>EduGroup</group-name>
        <group-docbase>webapps</group-docbase>
        <print-error-to-browser>true</print-error-to-browser>
        <encoding>
                <request-encoding>
                    <forced>EUC-KR</forced>
                </request-encoding>
                <response-encoding>
                    <forced>EUC-KR</forced>
                </response-encoding>
                <postdata-encoding>
                    <forced>EUC-KR</forced>
                </postdata-encoding>
        </encoding>
        <session-config>
            <timeout>20</timeout>
            <shared>true</shared>
            <persistent>true</persistent>
        </session-config>
        <jsp-engine>
            <keep-generated>true</keep-generated>
            <java-compiler>javac</java-compiler>
            <jsp-work-dir>/edudocs/jspwork</jsp-work-dir>
            <compile-encoding>EUC-KR</compile-encoding>
        </jsp-engine>
        <logging>
            <error-log>
                <target>file</target>
                <level>error</level>
                <buffer-size>0</buffer-size>
                <valid-day>1</valid-day>
            </error-log>
            <user-log>
                <target>file</target>
                <buffer-size>0</buffer-size>
                <valid-day>1</valid-day>
            </user-log>
            <access-log>
                <target>file</target>
                <buffer-size>0</buffer-size>
                <valid-day>1</valid-day>
                <log-format>
                    <time-format>default</time-format>
                </log-format>
            </access-log>
        </logging>
        <context>
            <context-name>default</context-name>
            <context-path>/</context-path>
        </context>
        <context>
            <context-name>examples</context-name>
            <context-path>/examples</context-path>
        </context>
        <webserver-connection>
            <webtob-listener>
                <listener-id>WebtobListener</listener-id>
                <port>9900</port>
                <output-buffer-size>8192</output-buffer-size>
                <webtob-address>localhost</webtob-address>
                <registration-id>EduGroup</registration-id>
                <hth-count>1</hth-count>
                <thread-pool>
                    <min>30</min>
                    <max>30</max>
                    <step>1</step>
                    <max-idle-time>1000</max-idle-time>
                </thread-pool>
            </webtob-listener>
<!--
            <http-listener>
                <listener-id>http1</listener-id>
                <port>8088</port>
                <output-buffer-size>8192</output-buffer-size>
                <thread-pool>
                    <min>25</min>
                    <max>30</max>
                    <step>2</step>
                    <max-idle-time>1000</max-idle-time>
                </thread-pool>
            </http-listener>
-->
        </webserver-connection>
    </context-group>
</web-container>
```

## 운영자매뉴얼(TmaxSoft)

별첨4]

**e-감사시스템 구축1차 사업 / 운영자 매뉴얼 (WebtoB / JEUS)**

2005. 7. 1

![](https://raw.githubusercontent.com/benelog/devnote/master/attachments/158472_blip000000.png)

관리본개정이력표

| 문서명 | 운영자 매뉴얼 |
|--------|---------------|

| 버전 | 날짜 | 내 용 | 부서 |
|------|------|-------|------|
| 1.0 | 2005. 07. 01 | 최초작성 | e-감사시스템구축 프로젝트 |

목 차

- 1. WEBTOB와 JEUS 소개 및 개요
  - 1.1 개요
  - 1.2 시스템 구성 및 환경
  - 1.3 WebtoB
    - 1.3.1 소프트웨어 구성
  - 1.4 JEUS
    - 1.4.1 소프트웨어 구성
- 2. WebtoB 관리 지침
  - 2.1 WebtoB 환경 파일
    - 2.1.1 환경 파일 경로
    - 2.1.2 환경 파일 설정 및 컴파일
  - 2.2 WebtoB 구동 및 종료
    - 2.2.1 WebtoB 구동
    - 2.2.2 WebtoB 종료
  - 2.3 wsadmin 사용하기
    - 2.3.1 요청에 대한 전체 건수 보기
    - 2.3.2 요청한 클라이언트의 정보보기
    - 2.3.3 \*SERVER 절에 선언한 서버들의 수행정보 보기
    - 2.3.4 전체 서비스 처리되는 상태정보 보기
    - 2.3.5 \*SERVER 절에 설정된 프로세스의 처리정보 보기
  - 2.4 로그 정보
- 3. JEUS 관리 지침
  - 3.1 JEUS 환경 파일
    - 3.1.1 환경 파일 경로
    - 3.1.2 환경 파일 설정
  - 3.2 JEUS 구동 및 종료
    - 3.2.1 JEUS 구동
    - 3.2.2 JEUS 종료
  - 3.3 jeusadmin 사용하기
    - 3.3.1 현재 떠있는 엔진 목록보기
    - 3.3.2 현재 떠 있는 엔진컨테이너 PID 목록보기
  - 3.4 webadmin 사용하기
    - 3.4.1 web container 의 상태정보 보기
    - 3.4.2 호출된 애플리케이션 정보보기
    - 3.4.3 Web Server(WebtoB) 와 JEUS 간의 연결 Thread 정보보기
  - 3.5 ejbadmin 사용하기
    - 3.5.1 ejb 로딩 정보보기
    - 3.5.2 모듈안에 포함된 EJB 정보보기
    - 3.5.3 모듈안에 포함된 EJB Pooling 현황 정보보기
  - 3.6 dbpooladmin
    - 3.6.1 정보보기
  - 3.7 로그 정보
    - 3.7.1 로그 파일 위치
    - 3.7.2 Servlet 엔진 로그
    - 3.7.3 EJB 엔진 로그
- 4. WebtoB, Java 그리고 JEUS 튜닝 팁들
  - 4.1 WebtoB 튜닝 팁들
    - 4.1.1 HTH 수
    - 4.1.2 프로세스 수
  - 4.2 Java 튜닝 팁
    - 4.2.1 JVM Heap 크기
  - 4.3 JEUS Tuning Tips
    - 4.3.1 Thread 수
    - 4.3.2 JDBC Datasource connection Pool
    - 4.3.3 Connection Pool 크기 설정
    - 4.3.4 Prepared Statements 캐싱과 statement fetch 크기 설정
- 5. OS Parameter 튜닝
  - 5.1 Linux OS
    - 5.1.1 Linux kernel parameter 와 Network parameter 튜닝
  - 5.2 Solaris OS 튜닝 권장
    - 5.2.1 Linux kernel parameter 와 Network parameter 튜닝

### 1. WebtoB와 JEUS 소개 및 개요

#### 1.1 개요

본 문서는 감사원 e-감사시스템구축 프로젝트에서 WebServer인 WebtoB와 WAS인 JEUS를 운영하는데 도움이 되고자 작성되었다.

편의상 본 문서를 참고할 대상은 WebtoB와 JEUS에 대해서 기본적인 지식을 가지고 있다고 가정하에 만들어 졌으며 시스템 및 WebtoB와 JEUS 운영중 기본 지침서가 되도록 하였다.

#### 1.2 시스템 구성 및 환경

시스템 서버의 시스템 구성과 그에 따른 WebtoB와 JEUS의 환경 파일을 통한 시스템 구성 현황에 대해서 살펴보고자 한다.

#### 1.3 WebtoB

WebtoB는 Tmaxsoft에서 자체 개발한 Web Server로써 WAS인 JEUS와 연동되어 Web Services를 수행하는 제품으로 Server의 가장 앞 단에서 클라이언트의 요청을 받아들이고 처리하는 역할을 담당한다.

**1.3.1 소프트웨어 구성**

![WebtoB 소프트웨어 구성](https://raw.githubusercontent.com/benelog/devnote/master/attachments/158473_blip000001.png)

WebtoB는 World Wide Web 환경에서 HTTP 프로토콜을 통하여 전달된 브라우저의 요구를 처리하는 Web Server이다. WebtoB는 세계 유명 Web Server보다 월등히 우수한 성능을 보장할 뿐 아니라, 기존 Web Server가 가지고 있는 한계점들을 완벽하게 개선함으로써 Web 환경을 구축하는 데 있어 고성능과 안정성이라는 두 가지 효과를 모두 얻을 수 있다.

#### 1.4 JEUS

JEUS (Java Enterprise-User Solution)는 인터넷으로 각광 받고 있는 Java를 기반으로 한 웹 솔루션으로, 웹 환경에서 어플리케이션을 운용하는 데 필요한 각종 서비스들을 제공해 주는 웹 어플리케이션 서버이다.

JEUS는 어플리케이션을 개발하고 실행할 수 있는 플랫폼 역할을 하면서, 트랜잭션 관리, 세션 유지, 부하 분산 등 다양한 기능을 제공할 뿐만 아니라, 계층화된 구조로 유연성과 기능 확장성이 우수해 비즈니스 로직을 손쉽고 효과적으로 구현할 수 있게 한다.

**1.4.1 소프트웨어 구성**

![JEUS 소프트웨어 구성](https://raw.githubusercontent.com/benelog/devnote/master/attachments/158474_blip000002.png)

- ![](https://raw.githubusercontent.com/benelog/devnote/master/attachments/158475_blip000003.png) **Web Server**
  - HTTP Listener를 통해 클라이언트의 요청을 받아들입니다.
  - 자체적인 Web Server와 함께 WebtoB나 Apache와 같은 기존의 웹 서버와도 연동이 가능합니다.
- ![](https://raw.githubusercontent.com/benelog/devnote/master/attachments/158476_blip000004.png) **System Management Servers**
  - 엔진들의 동작과 시스템의 관리를 위한 기반 구조를 제공합니다.
  - Naming Server, Security, JDBC Connection Pool 등의 기능으로 엔진들 사이의 동작을 이어 줍니다. 또한 Transaction Manager, JEUS Manager 등의 기능으로 트랜잭션, 장애 대책, 부하 조절, 로깅 등 전체 시스템을 관리하는 역할을 수행합니다.
- ![](https://raw.githubusercontent.com/benelog/devnote/master/attachments/158477_blip000005.png) **Engine Modules**
  - JSP, Servlet, EJB, JMS 등의 다양한 개발 모듈을 제공합니다.
  - 각각 다른 프로그래밍 모델을 바탕으로 개발된 서비스들이라 할지라도 하나의 웹 시스템 내에서 동작할 수 있는 환경을 제공해 줍니다.

### 2. WebtoB 관리 지침

#### 2.1 WebtoB 환경 파일

**2.1.1 환경 파일 경로**

`$WEBTODIR/config/http.m`이 기본적인 WebtoB 환경 설정 파일이다.

**2.1.2 환경 파일 설정 및 컴파일**

위에서 http.m파일을 vi나 Editor로 적절히 편집한 후 (세부적인 설정 사항은 매뉴얼을 참조하기 바란다.) `wscfl -i http.m` 형태로 컴파일 한 후 WebtoB를 다시 재 부팅하면 된다.

#### 2.2 WebtoB 구동 및 종료

**2.2.1 WebtoB 구동**

root 계정에서 wsboot 명령어를 실행하면 부팅이 된다.

JEUS와 연동하여 사용시에는 WebtoB를 먼저 구동한 후에 JEUS를 구동하여야 한다.

```text
실행)
wsboot
예)
[계정@hostname]wsboot
```

**2.2.2 WebtoB 종료**

root 계정에서 wsdown 을 치면 WebtoB를 종료 시킨다.

```text
실행)
wsdown
예)
[계정@hostname] wsdown
```

#### 2.3 wsadmin 사용하기

wsadmin은 WebtoB의 상태를 모니터링 하기 위한 console tool이다. 간단한 사용법은 다음과 같다.

```text
실행)
wsadmin
예)
[계정@hostname]wsadmin
--- Welcome to WebtoB Admin (Type "quit" to leave) ---
$$1 hostname (wsadm):
나오기)
quit
예)
$$1 hostname (wsadm): quit
ADM quit for node (hostname)
[계정@hostname]
```

**2.3.1 요청에 대한 전체 건수 보기**

```text
$$3 hostname (wsadm): ci -s
HTH 0: 102
HTH 1: 105
Total Connected Clients = 207
$$4 hostname (wsadm):
```

위의 정보는 HTH당 접속한 클라이언트의 개수를 보여준다. WebtoB단에 요청을 날리고 Connection이 유지되고 있는 클라이언트의 총 개수 정보이다.

연속 보기 : `r -i 2 -k 100 ci -s` (2초 간격으로 100번 반복하여 수행하기)

**2.3.2 요청한 클라이언트의 정보보기**

```text
$$2 hostname (wsadm): ci
HTH 0:
---------------------------------------------------------------------------------------------------------
cli_id status count lastin_time local_ipaddr:port remote_ipaddr usrname
---------------------------------------------------------------------------------------------------------
467 RDY 4 6 10.100.88.5:8088 10.104.90.237
HTH 1:
---------------------------------------------------------------------------------------------------------
cli_id status count lastin_time local_ipaddr:port remote_ipaddr usrname
---------------------------------------------------------------------------------------------------------
461 RDY 8 6 10.100.88.5:8088 10.104.90.237
---------------------------------------------------------------------------------------------------------
Total Connected Clients = 2
---------------------------------------------------------------------------------------------------------
$$3 hostname (wsadm):
```

RUN 이면 요청이 들어오고 있는 것을 의미하고, RDY는 대기상태를 의미한다. 해당 정보는 HTH당 보이게 된다.

**2.3.3 \*SERVER절에 선언한 서버들의 수행정보 보기**

```text
[계정@hostname]wsadmin
--- Welcome to WebtoB Admin (Type "quit" to leave) ---
$$1 hostname (wsadm): si
---------------------------------------------------------------------------------------------------------------
hth svrname (svri) status count qcount qpcount emcount rscount rbcount
---------------------------------------------------------------------------------------------------------------
0 html ( 0) RDY 21922 0 0 0 0 0
0 MyGroup ( 1) RDY 872 0 0 0 0 0
1 html ( 0) RDY 22374 0 0 0 0 0
1 MyGroup ( 1) RDY 840 0 0 0 0 0
$$2 hostname (wsadm):
```

해당 정보는 HTH당 보이게 되며, count는 총 처리건수, qcount는 현재 큐잉건수를 나타낸다.

연속 보기 : `r -i 1 -k 100 si` (1초 간격으로 100번 반복하여 수행하기)

**2.3.4 전체 서비스 처리되는 상태정보 보기**

```text
$$6 hostname (wsadm): st -s
HTH 0:
-----------------------------------------------------------------------------------------------------
svc_name count avg cq_count aq_count q_avg status
-----------------------------------------------------------------------------------------------------
htm 0 0.0000 0 0 0.0000 RDY
doc 22660 0.0081 0 0 0.0000 RDY
hwp 0 0.0000 0 0 0.0000 RDY
pdf 0 0.0000 0 0 0.0000 RDY
jsp 0 0.0000 0 0 0.0000 RDY
uri1 22421 4.2490 0 5922 6.7331 RDY
html 528 0.0022 0 0 0.0000 RDY
HTH 1:
-----------------------------------------------------------------------------------------------------
svc_name count avg cq_count aq_count q_avg status
-----------------------------------------------------------------------------------------------------
htm 22848 0.0020 0 0 0.0000 RDY
hwp 0 0.0000 0 0 0.0000 RDY
doc 0 0.0000 0 0 0.0000 RDY
pdf 0 0.0000 0 0 0.0000 RDY
jsp 0 0.0000 0 0 0.0000 RDY
hwp 0 0.0000 0 0 0.0000 RDY
uri1 22304 4.1742 0 4618 8.6335 RDY
html 541 0.0026 0 0 0.0000 RDY
$$7 hostname (wsadm):
```

위의 정보는 HTH당 보이며, ext, uri에 설정한 서비스의 상태가 보인다. Uri2가 만일 status NRDY로 표시된다면, WebtoB <-> JEUS 간의 연결설정이 제대로 안된것이다.

Count: 호출건수, avg: 호출처리 평균시간, cq_count: current queue count

Aq_count: All queue count로 webtob booting시부터 현재까지 전체 쌓인 큐잉건수를 나타낸다.

연속 보기 : `st -s -i 1 -k 100` (1초 간격으로 100번 반복하여 수행하기)

**2.3.5 \*SERVER절에 설정된 프로세스의 처리정보 보기**

```text
HTH 0(15520):
---------------------------------------------------------------------------
svr_name svgname spr_no(pid) status count avg(rt) svc
---------------------------------------------------------------------------
html htmlg 0( 15522) RDY 2353 0.0000( 0) -
html htmlg 1( 15529) RDY 2349 0.0000( 0) -
html htmlg 2( 15531) RDY 2350 0.0002( 0) -
html htmlg 3( 15523) RDY 2352 0.0013( 0) -
html htmlg 4( 15525) RDY 2351 0.0004( 0) -
html htmlg 5( 15527) RDY 2349 0.0000( 0) -
html htmlg 6( 15526) RDY 2347 0.0004( 0) -
html htmlg 7( 15528) RDY 2350 0.0023( 0)
html htmlg 8( 15530) RDY 2350 0.0013( 0) -
html htmlg 9( 15524) RDY 2345 0.0004( 0) -
MyGroup jsvg 20( 0) RDY 0 0.0000( 0) -
jengineid(hostname_servlet_engine1)
MyGroup jsvg 21( 1) RDY 0 0.0000( 0) -
jengineid(hostname_servlet_engine1)
MyGroup jsvg 22( 2) RDY 0 0.0000( 0) -
jengineid(hostname_servlet_engine1)
-- 중략 --
```

위의 정보에서 \*SERVER절에 설정한 MinProc만큼 서비스프로세스가 보이고, JEUS 쪽으로 연결된 MyGroup 이라는 서버프로세스도 보인다. 실시간으로 모니터링을 하게 되면,

```text
MyGroup jsvg 22( 2) RUN 0 0.0000( 0) - ur1(or jsp)
jengineid( hostname_servlet_engine1 )
```

위와 같이 uri2(or jsp)라고 나온다.

또한, JEUS단의 연결된 Web Container정보도 나오므로 어디로 서비스가 전달되고 있는지를 파악할 수가 있다.

연속 보기 : `st -p -i 1 -k 100` (1초 간격으로 100번 반복하여 수행하기)

#### 2.4 로그 정보

WebtoB에서 남기는 로그는 총4가지 종류의 로그들이 있다.

- syslog : WebtoB engine에서 남기는 로그로 WebtoB의 이상 유무를 체크하여 로그로 남긴다. 특이한 이상이 없는 한 많은 로그를 남기지 않는다. 일별로 생성된다.
  - 로그의 위치 `$WEBTOBDIR/log/syslog`
- usrlog : 개발자들이 코딩시 남기는 로그이다. 일별로 생성되지만 현재 남기는 로그는 없다.
  - 로그의 위치 `$WEBTOBDIR/log/syslog`
- accesslog : 클라이언트가 웹으로 접속시 호출하는 모든 uri정보를 남긴다. 그러므로 이 로그는 특히 신경을 써서 관리하여야 한다. 일별로 생성된다
  - 로그의 위치 `$WEBTOBDIR/log`
- errorlog : 클라이언트가 웹으로 접속하여 호출시 에러가 발생한 모든 uri정보를 남긴다. 일별로 생성된다
  - 로그의 위치 `$WEBTOBDIR/log`

### 3. JEUS 관리 지침

#### 3.1 JEUS 환경 파일

**3.1.1 환경 파일 경로**

`$JEUS_HOME/config/[hostname]/`에 환경 파일이 있다.

**3.1.2 환경 파일 설정**

환경 파일은 JEUS의 환경 설정파일 JEUSMain.xml과 각 ejb, servlet엔진 파일로 구성된다. JEUSMain.xml은 `$JEUS_HOME/config/[hostname]/JEUSMain.xml`에 위치하며 servlet엔진의 경우에는 각각 다음의 위치에 존재한다.

Servlet엔진의 환경 설정 파일

```text
$JEUS_HOME/config/[hostname]/[hostname]_servlet_[engine이름]/WEBMain.xml
```

EJB엔진의 환경 설정 파일

```text
$JEUS_HOME/config/[hostname]/[hostname]_ejb_[engine이름]/EJBMain.xml
```

각 환경 설정 파일 설정의 세부적인 내용에 대한 것은 매뉴얼을 참조 하기 바란다.

#### 3.2 JEUS 구동 및 종료

**3.2.1 JEUS 구동**

jboot를 실행하면 구동된다.

```text
실행)
jboot
예)
[계정@hostname] jboot
```

**3.2.2 JEUS 종료**

jdown을 실행하면 종료가 된다.

```text
실행)
jdown
예)
[계정@hostname] jdown
```

#### 3.3 jeusadmin 사용하기

```text
실행)
jeusadmin
예)
[계정@hostname]jeusadmin hostname
[ErrorMsgManager] Message Manager is initialized
[JeusCommander] JEUS 4.2.0.9 Jeus Manager Controller
[JeusCommander] Login
> administrator
[JeusCommander] Password
> jeusadmin <--- passwd값을 입력한다.
[JeusCommander] [admin] login successful
hostname>
도움말 실행)
help
예)
hostname> help
========================================================
 jeusadmin commands
- allenglist : get a list of all working engines
- boot [ |-ser] [ |-d] : boot Jeus Manager
ex> boot -d -> boot node dynamically with JEUSMain.xml
 - down : down JeusServer
---중략---
========================================================
hostname>
나오기)
exit
예)
hostname> exit
[root@hostname]
```

**3.3.1 현재 떠있는 엔진 목록보기**

hostname 서버에서 JVM 6개가 엔진 container로 구동중이며 2개의 container에서 servlet 엔진, 4개의 container에 ejb 엔진이 구동되고 있다.

```text
[계정@hostname] jeusadmin
[ErrorMsgManager] Message Manager is initialized
[JeusCommander] JEUS 4.2.0.9 Jeus Manager Controller
[JeusCommander] Login
> administrator
[JeusCommander] Password
> jeusadmin
[JeusCommander] [administrator] login successful
hostname> allenglist
hostname_servlet_engine1
hostname>
```

위와 같이 실행하면 모든 엔진 목록을 볼수 있다. 또한 위의 각 엔진들을 boot 또는 down을 시킬수 있다.(help 참조)

방법: starteng / downeng

**3.3.2 현재 떠 있는 엔진컨테이너 PID 목록보기**

엔진컨테이너는 각각의 엔진을 담는 그릇과 같은 것으로 JVM 1개를 의미한다

```text
hostname> pidlist
hostname_engine1 : 28588
hostname>
```

현재 운영중인 6개의 JVM에 대한 PID할당 정보를 얻을 수 있으며, 향후 문제 발생시 Thread Dump를 수행하기 위하여 (`kill -3`) 필요한 정보이기도 하다.

또한 위의 엔진컨테이너를 booting / down할 수도 있다. (help 명령어 참조)

방법 : startcon / downcon

예) `startcon hostname_engine1`

#### 3.4 webadmin 사용하기

```text
실행)
webadmin _servlet_
예)
[계정@hostname]/jeus/jeus42/bin >webadmin hostname_servlet_engine1
$ username : administrator
$ password : jeusadmin <--- passwd값을 입력한다.
[ErrorMsgManager] Message Manager is initialized
[2005.04.01 16:09:59] [TMLinkManager] accept thread is started
[2005.04.01 16:09:59] [TMClient] TMClient initailized
[2005.04.01 16:09:59] [JNSLocal_] Try to connect to 10.100.88.5:9438
[2005.04.01 16:09:59] [JNSLocal_] Connected to JNSServer IPAddress :9438
[2005.04.01 16:09:59] [JNSLocal_] Successfully started. (ID IPAddress :61301)
-- Welcome to JEUS Web Container(v3.3.7.2) Admin
$$1 [hostname:hostname_servlet_engine1]
도움말 실행)
help
예)
$$1 [hostname:hostname_servlet_engine1] help
-- Command list & Usages --
* st(stat) [OPTION] : report current state
-m memory state
-t thread state
-r the number of requests
-s session state
-d DB pool state
* ti [OPTION] : report detailed thread state
-p [addr:]port thread information
-r request information of threads
-a all information of threads
--- 중략 ---
나오기)
exit
예)
$$2 [hostname:hostname_servlet_engine1] exit
[root@hostname]/jeus/jeus42/bin>
```

**3.4.1 web container의 상태정보 보기**

```text
$$1 [hostname:hostname_servlet_engine1] st
-- WebContainer [hostname_servlet_engine1] --
< memory information >
VM Total Memory = 267255808 Bytes
VM Free Memory = 252605688 Bytes
-- ContextGroup [KUContextGroup] --
< thread information >
WebtobListener[port:9900] Current thread = 40, Wait Queue Count = 0, Max thread = 0
hth0 [port: 9300] live connections = 20
hth1 [port: 9901] live connections = 20
< request information >
__DEFAULT_CONTEXT__ : request = 0, avgTime = -1 ms
KUContext : request = 0, avgTime = -1 ms
< session information >
session clustering version : 1
number of local sessions : 2
Command is successfully achieved...
$$2 [hostname:hostname_servlet_engine1]
```

st 명령을 수행하게 되면 다음의 목록을 리스팅한다.

1) 해당 jvm의 메모리 사용현황 : `st -m`

2) DBConnectionPool의 실시간 사용현황 : `st -d`

3) Web Server와의 연결 정보 : `st -t`

4) 설정한 Context로 들어온 요청 count와 평균처리시간 : `st -r`

5) 유지하고 있는 Session 객체의 개수 : `st -s`

위에서 주의 깊게 보아야 할 것은 다음과 같다.

6) jvm의 메모리 사용현황을 통하여 애플리케이션상의 Memory leak 현상을 없는지 파악하여야 한다. 즉 jvm의 메모리 사용이 계속 증가하면 이를 의심해 보아야 한다.

7) DBConnectionPool의 Init DB conns 값 빼기 Free DB connections 의 개수가 0보다 크면 현재 사용되고 있는 connection의 개수를 나타내며, 이를 통해 호출 정도를 대략 파악할 수 있다. (단, DBConnectionPool type종류중 dummy는 모니터링이 불가능하다.)

- 일반 DB : shared, non-shared
- DB가 아닌 경우(예 AmdocsDriver) : shared:non-jeus, non-shared:non-jeus, dummy

3) Session Information을 통해서는 현재 login을 통하여 들어와 있는 유저수를 알 수 있다.

연속 보기 : `st -i 1 -k 100` (1초 간격으로 100번 반복하여 수행하기)

**3.4.2 호출된 애플리케이션 정보보기**

```text
$$2 [hostname:hostname_servlet_engine1] info
<<< WebContainer Name: hostname_servlet_engine1 >>>
#### ContextGroup : ContextGroup
#### Context : __DEFAULT_CONTEXT__
0:[WorkerServlet] class: jeus.servlet.servlets.WorkerServlet , total_reqs: 0
#### Context : KUContext
0:[/A/B/C.jsp] <Ready> jspfile: /A/B/C.jsp, total_reqs: 4
1:[/A/B/C.jsp] <Ready> jspfile: /A/B/C.jsp, total_reqs: 9
2:[/A/B/C.jsp] <Ready> jspfile: /A/B/C.jsp, total_reqs: 1
3:[/A/B/C.jsp] <Ready> jspfile: /A/B/C.jsp, total_reqs: 27
4:[test html] <NotLoaded> class: test.hnwhtml, total_reqs: 0
5:[/A/B/C.jsp] <Ready> jspfile: /A/B/C.jsp, total_reqs: 25
--- 중략 ---
```

각 ContextGroup안에 있는 Context별 호출된 애플리케이션의 호출빈도수를 알아 볼 수 있다. 이를 통해서 많이 호출되고 있는 애플리케이션를 축출할 수가 있다.

연속 보기 : `info -i 1 -k 100` (1초 간격으로 100번 반복하여 수행하기)

**3.4.3 Web Server(WebtoB)와 JEUS간의 연결 Thread 정보보기**

```text
$$13 [hostname:hostname_servlet_engine1] ti
-- Thread State [localhost:9300] --
[webtob-9300-w0][waiting, wt=135811 ms]
[webtob-9300-w1][waiting, wt=128943 ms]
[webtob-9300-w2][waiting, wt=125440 ms]
[webtob-9300-w3][waiting, wt=125019 ms]
--- 중략 ---
[webtob-9300-w37][waiting, wt=164001 ms]
[webtob-9300-w38][waiting, wt=160069 ms]
[webtob-9300-w39][waiting, wt=146275 ms]
[ total : 40 active : 0 idle : 40 ]
Command is successfully achieved...
$$14 [hostname:hostname_servlet_engine1]
```

위의 정보를 통하여 정보를 통하여 현재 실시간으로 들어오고 있는 uri 정보를 볼 수가 있다. 단 QueryString정보는 나타나지 않는다. 이를 보기위해서는 accesslog를 통하여 보아야 한다.

ti 정보를 통해서는 rt(=run time)라는 수행시간정보를 통하여 해당 호출된 서비스가 waiting에 빠졌는지, 처리가 얼마나 걸리는지를 실시간 모니터링 할 수가 있다. 만일 rt 시간이 비정상적으로 길어지거나, 모든 연결 Thread가 꽉차서 여유 공간이 없다면, waiting 또는 hanging 현상을 의심해보고 Thread Dump를 통하여 원인을 찾도록 한다.

```text
방법 : kill -3
추적 : webtob-9300-w39 해당 이러한 이름이 Thread Name이 된다.
위치 : 보통 stdout로 지정한 곳에 Thread Dump 내용이 남게 되며, Thread Name을 가지고 찾으면 된다.
```

PID정보는 jeusadmin의 pidlist 명령어를 통하여 servlet engine이 포함된 container의 PID를 넣도록 한다.

연속 보기 : `ti -i 1 -k 100` (1초 간격으로 100번 반복하여 수행하기)

```text
전체 정보보기 : ti -a
[webtob-9932-w0][waiting, 2003.02.27 09:54:35, wt=613162 ms][req=0, avgTime=0 ms, total=0][alive=true]
요청을 처리한 건수 및 처리시간 평균을 보여준다.
```

#### 3.5 ejbadmin 사용하기

```text
실행)
ejbadmin _ejb_
예)
hostname::/install DIR >ejbadmin sune10000_ejb_engine1
[ErrorMsgManager] Message Manager is initialized
[EJBServerCommander] JEUS 3.3.2.1 EJB Engine Controller
[EJBServerCommander] Login :
> admin
[EJBServerCommander] Password :
> <--- passwd값을 입력한다.
[hostname]_ejb_engine1 >
도움말 실행)
help
예)
[hostname]_ejb_engine1> help
=======================================================
ejbadmin command
- suspend [module name] : suspend services for the module
ex> suspend hello -> suspend hello module
- resume [module name] : resume services for the module
ex> resume hello -> resume hello module
- reload [module name] [ |-ser] [ |-f] : reload the module
ex> reload hello -ser -> reload hello as normal deployment using .ser config file
---중략---
======================================================
[hostname]_ejb_engine1>
나오기)
exit
예)
[hostname]_ejb_engine1> exit
hostname::/install DIR >
```

**3.5.1 ejb 로딩 정보보기**

```text
[hostname]_ejb_engine1> modulelist
ejb_module_name
[hostname]_ejb_engine1>
```

jeus는 ejb를 모듈단위로 관리된다. 현재 떠있는 모듈의 리스트를 볼 수가 있다. 부팅시 모듈을 띄우는 정보는 EJBMain.xml 파일에 라는 태그로 지정한다.

**3.5.2 모듈안에 포함된 EJB 정보보기**

```text
[hostname]_ejb_engine1> beanlist pfejabonmgr
A.B.C.D Bean : running
A.B.C.D Bean : running
A.B.C.D Bean : running
A.B.C.D Bean : running
----중략---
A.B.C.D Bean : running
A.B.C.D Bean : running
[hostname]_ejb_engine1>
```

beanlist 을 넣게 되면 해당 모듈에 포함된 EJB의 정보를 볼 수가 있다.

**3.5.3 모듈안에 포함된 EJB Pooling 현황 정보보기**

```text
[hostname]_ejb_engine1> moduleinfo module_name
[2005.04.01 17:07:32]
module-name : module_name
bean-name : A.B.C.D Bean
pooled bean : 0
active bean : 0
pooled conn : 0
active conn : 0
pooled thread : 0
active thread : 0
bean-name : A.B.C.D Bean
pooled bean : 0
active bean : 0
pooled conn : 0
active conn : 0
pooled thread : 0
active thread : 0
----중략----
[hostname]_ejb_engine1>
```

위의 정보를 통해서 moduleinfo 을 통해서 들어있는 전체 bean들의 Pooling 현황을 보거나, beaninfo 을 통해서 해당 bean Pooling 정보만을 얻어 낼 수가 있다. 위의 명령어를 통하여 active bean의 사용정도를 파악 할 수 있으며, waiting 현상에 및 장애에 대한 추측을 가능토록 하여준다.

```text
- command : moduleinfo module-name [option], beaninfo bean-name [option]
- option : -i (간격) , -k (횟수) [optional option]
module-name/bean-name을 all 이라고 주면 전체를 monitoring한다
```

#### 3.6 dbpooladmin

```text
실행)
dbpooladmin _
예)
hostname::/install DIR >dbpooladmin sune10000_engine1
[ErrorMsgManager] Message Manager is initialized
[2005.04.01 17:19:04] [TMLinkManager] accept thread is started
[2005.04.01 17:19:04] [TMClient] TMClient initailized
[ConnectionPoolController] JEUS 4.2 DB Connection Pool Controller
[ConnectionPoolController] Login :
> admin
[ConnectionPoolController] Password :
> <--- passwd값을 입력한다.
[hostname]_engine1>
도움말 실행)
help
예)
[hostname]_engine1> help
=======================================================
dbpooladmin command
- info : gather informations for connection pools in the engine container
- enable [connection pool name] : enable the connection pool
ex> enable mydbpool -> enable mydbpool
- disable [connection pool name] : disable the connection pool
ex> disable mydbpool -> disable mydbpool
- shrink [connection pool name] : shrink the size of the connection pool by closing idle connections
ex> shrink mydbpool -> shrink mydbpool
- resync [connection pool name] : resync global transaction statue for the connection pool
ex> resync mydbpool -> recover the status of the global transaction done with mydbpool
- reconfig [connection pool name] : reconfigurate configuration parameters
ex> reconfig mydbpool -> reconfig mydbpool
=======================================================
[hostname]_engine1>
나오기)
exit
예)
[hostname]_engine1> exit
hostname::/install DIR >
```

**3.6.1 정보보기**

```text
[hostname]_engine1> info
=======================================================
connection pool name : NonXADataSource
min size : 1
max size : 50
current size : 1
idle size : 1
wating : true
working : true
=======================================================
=======================================================
connection pool name : DataSource
min size : 20
max size : 100
current size : 20
idle size : 20
wating : true
working : true
=======================================================
[hostname]_engine1>
```

dbpooladmin은 현재 JeusMain.xml에 설정한 DataSource정보를 실시간으로 볼 수가 있다. Idle Size가 현재 사용할 수 있는 DB Connection을 의미하며, 만일 사이즈가 0이고, 오랜시간 지속된다면, DB Connection 유실을 의심해 볼 필요가 있다.

연속 보기 : `info -i 1 -k 100` (1초 간격으로 100번 반복하여 수행하기)

#### 3.7 로그 정보

**3.7.1 로그 파일 위치**

디폴트 설정은 `$JEUS_HOME/logs`에 로그 파일들이 위치한다.

**3.7.2 Servlet 엔진 로그**

Servlet엔진의 로그 `$JEUS_HOME/logs/[hostname]_servlet_[engine이름]` 디렉터리에 남는다.

**3.7.3 EJB 엔진 로그**

EJB엔진 로그는 `$JEUS_HOME/logs/[hostname]_ejb_[engine이름]` 디렉터리에 남는다.

Thread Dump를 남기는 방법은 다음과 같다.

- 방법 : `kill -3`
- 추적 : webtob-9900-w? 해당 이러한 이름이 Thread Name이 된다.
- 위치 : 보통 `$JEUS_HOME/logs/JeusServer/` 디렉토리에 날짜별로 생성되는 서버 로그에 Thread Dump 내용이 남게 되며, Thread Name을 가지고 찾으면 된다.

PID정보는 jeusadmin의 pidlist 명령어를 통하여 servlet engine이 포함된 container의 PID를 넣도록 한다.

연속 보기 : `ti -i 1 -k 100` (1초 간격으로 100번 반복하여 수행하기)

### 4. WebtoB, Java 그리고 JEUS 튜닝 팁들

#### 4.1 WebtoB 튜닝 팁들

**4.1.1 HTH수**

WebtoB 서버는 특정 프로세스에서 일반적인 브라우저에 관련된 모든 connection들을 관리한다. WebtoB와 연결된 사용자 connection은 HTH 프로세스에 의해서 관리되어진다. 보통 하나의 HTH 프로세스는 600~900 connection들을 처리한다. 그러나 보다 많은 서비스를 추가할 때는 HTH 프로세스의 수를 증가시켜 사용한다.

관련된 정보는 WebtoB를 구동하고 구동할 때 스크린에 최대 동시 사용자 수를 보여준다. 그래서 관리자들은 동시사용자 수를 가늠해야 한다. 그리고 그 정보를 통해서 HTH 수를 합리적으로 결정한다.

```text
$ wsboot
WSBOOT for node(javalab) is starting:
Welcome to WebtoB demo system: it will expire 2004/9/6
Today: 2004/6/8
WSBOOT: WSM is starting: Tue Jun 8 21:38:05 2004
WSBOOT: HTL is starting: Tue Jun 8 21:38:05 2004
WSBOOT: HTH is starting: Tue Jun 8 21:38:05 2004
Current WebtoB Configuration:
Number of client handler(HTH) = 1
Supported maximum user per node = 985
Supported maximum user per handler = 985
WSBOOT: SVR(htmls) is starting: Tue Jun 8 21:38:05 2004
WSBOOT: SVR(htmls) is starting: Tue Jun 8 21:38:05 2004
```

**4.1.2 프로세스 수**

WebtoB 서버에서 HTML, CGI와 SSI의 수는 분리되고 독립된 프로세스 수를 설정한다. 간단히 말해서 하나 프로세스가 모두 처리하는 경우는 없다. 그러나 각 서비스는 분리해서 조정되어질 수 있는 특별한 값 내에서 처리된다. 따라서 만약 관리자가 HTML이 많이 처리되는 것을 안다면 HTML 처리 프로세스들의 수를 증가 시키고 반대의 경우는 HTML 프로세스 수를 줄여서 불필요하게 메모리가 낭비되는 것을 방지한다.

```text
… …..
*SERVER
html SVGNAME = htmlg, MinProc = 2, MaxProc = 10
cgi SVGNAME = cgig, MinProc = 4, MaxProc = 10
ssi SVGNAME = ssig, MinProc = 2, MaxProc = 10
MyGroup SVGNAME = jsvg, MinProc = 10, MaxProc = 10
……… .
```

WebtoB 서버 환경 설정파일의 실제 애플리케이션 수은 각 서버 절의 MaxProc와 MinProc에 의해서 설정되어진다.

MaxProc는 사용될 수 있는 최대 프로세스 수를 의미한다. 이 영역의 범위는 WebtoB 서버가 조정할 수 있는 범위이다. 설정한 초기 값만큼 프로세스 수가 시작된 후 사용자 요청의 수가 MinProc보다 더 크게 되면 자동으로 MaxProc까지 증가된다.

#### 4.2 Java 튜닝 팁

**4.2.1 JVM Heap 크기**

JVM heap 크기는 얼마나 자주 얼마나 오랫동안 garbage collection에 VM이 시간을 소비하는지를 결정한다. Garbage collection의 비율은 애플리케이션에 의해서 좌우되고 garbage collection과 actual time을 분석한 후 조절할 수 있다.

Heap 크기를 튜닝 하는 목적은 JEUS 서버가 주어진 시간에 처리할 수 있는 클라이언트 수를 최대화하면 JVM이 garbage collection 하는 데 걸리는 시간을 최소화 하는 것이다. 벤치마킹 하는 동안 최대한의 성능을 보장하기 위해서 벤치마크를 실행하는 동안 garbage collection이 발생하지 않도록 보장하기 위해서 heap 크기를 크게 설정 할 수도 있다.

JEUS Container에 JVM Heap 설정

JVM Heap 크기를 설정하기 위해서 "`[JEUS_HOME]/config/[host name]/JEUSMain.xml`"에서 다음과 같이 수정한다.

```text
수정전:
…… .

container1
/>
…………
수정후:
…… .

container1
>-Xms512m -Xmx512m

…………
```

- Xms: 자바 애플리케이션 서버를 시작할 때 초기 메모리 설정
- Xmx: 자바 애플리케이션 서버가 사용할 수 있는 최대 메모리 설정

주의: -X옵션은 표준 옵션이 아니다 따라서 언급 없이 변경될 수 있다.

#### 4.3 JEUS Tuning Tips

**4.3.1 Thread수**

Thread 수는 애플리케이션의 프로세스 처리 속도와 관련된다. 만약 매우 속도가 빠르면 많은 CPU 시간을 thread 스위칭에서 소비되어짐을 확인 할 수 있다. 만약 속도가 낮으면 약간의 request들이 running queue에 들어 간다. 그리고 많은 request들이 waiting queue에 들어 간다. 일반적인 서버에 대해서 thread 수를 30~35개로 설정을 권장한다. 머신에 두개의 JEUS Container를 설정한다면 thread 수는 각 Container에서 약20개를 설정하는 것을 권장한다. 결론적으로 말하면 thread 수를 튜닝 할 때는 부하테스트를 통해서 조정한다.

JEUS 서버에서 thread 수를 조정하기 위해서 "`[JEUS_HOME]/config/[hostname]/[hostname]_servlet_[enginename]/WEBMain.xml`"의 설정 파일을 수정해야 한다.

WebtoB의 환경 파일(JSV 타입 서버 절의 MinProc, MaxProc-II.5 WebtoB서버 설정을 참조)과 아래의 WEBMain.xml에 굵게 표시된 부분인 thread 수와 같이 조정해야 한다.

```xml
…… ..

WebtoB1
true</disable-pipe>
<port>9900</port>
<hth-count>1</hth-count>
<WebtoB-address>localhost</WebtoB-address>
<registration-id>MyGroup</registration-id>
<thread-pool>
<min> 30 </min>
<max> 30 </max>
<step>2</step>
<max-idle-time>30000</max-idle-time>
<max-wait-queue>4</max-wait-queue>
</thread-pool>
</WebtoB-listener>
…… ..
```

**4.3.2 JDBC Datasource connection Pool**

일반적으로 DataSource connection pool의 수는 thread 수보다 약간 더 크거나 같게 설정한다. 그래서 우리는 "Maximum수" 설정을 35~45정도를 권장한다. (thread수를 30으로 가정하고)

주의 : JDBC 드라이버 파일(예. 오라클의 경우 classes12.zip)을 "`[JEUS_HOME]/lib/datasource`" 디렉터리에 복사해야 한다.

Datasource connection pool을 튜닝하기 위해서 "`[JEUS_HOME]/config/[hostname]/JEUSMain.xml`"에 설정해야 한다.

"JEUSMain.xml" 파일에 다음 부분을 추가한다.

```xml
……


<database>
<vendor>oracle</vendor>
<export-name> [JNDI export Name] </export-name>
<data-source-class-name>oracle.jdbc.pool.OracleConnectionPoolDataSource</data-source-class-name>
<data-source-type>ConnectionPooldatasource</data-source-type>
<database-name> [Oracle SID] </database-name>
<data-source-name>oracle.jdbc.pool.OracleConnectionPoolDataSource</data-source-name>
<user> [db user] </user>
<password> [db user password] </password>
<port-number>1521</port-number>
<server-name> [db server ip] </server-name>
<driver-type>thin</driver-type>
<connection-pool>
<pooling>
35
35
1
500000
```

**4.3.3 Connection Pool 크기 설정**

일반적으로 connection pool의 수는 thread 수보다 약간 더 크거나 같게 설정한다. 그래서 우리는 "Maximum수" 설정을 35~45정도를 권장한다. (thread수를 30으로 가정하고)

주의 : JDBC 드라이버 파일(예. 오라클의 경우 classes12.zip)을 "`[JEUS_HOME]/lib/datasource`" 디렉터리에 복사해야 한다.

connection pool을 설정은 위해서 "`[JEUS_HOME]/config/[hostname]/[hostname]_servlet_[engine name]/WEBMain.xml`"에 설정해야 한다

"WEBMain.xml" 파일에 다음 부분을 추가한다.

```xml
…… .
…… .

weather
shared
jdbc:oracle:thin:@xxx.xxx.xxx.xxx:1521:ora8i</connection-url>
<driver-class-name>oracle.jdbc.driver.OracleDriver</driver-class-name>
<connection-argument>user=scott;password=tiger</connection-argument>
<get-connection-timeout>30000</get-connection-timeout>
<db-pool-control>
<min> 35 </min>
<max> 40 </max>
<step>5</step>
<max-idle-time>30000</max-idle-time>
<max-alive-time>600000</max-alive-time>
</db-pool-control>
</db-connection-pool>
```

**4.3.4 Prepared Statements 캐싱과 statement fetch 크기 설정**

Prepared statement 캐싱은 application과 EJB에서 사용되는 각 prepared statement를 저장해서 사용되어질 수 있다. 이것으로 아주 큰 성능 향상을 얻을 수 있다.

하지만 또한 prepared statement 캐쉬는 제한 사항들은 가지고 있다: Database 객체가 변경되었을 때 에러가 발생할 수도 있다. 그래서 환경에 맞게 적절히 사용해야 한다. 다음은 DataSource를 사용할 때의 적용이다.

Prepared statement 캐싱의 크기를 설정하기 위해서는 "`[JEUS_HOME]/config/[hostname]/JEUSMain.xml`"에서 설정을 해야한다.

"JEUSMain.xml"에 설정한 2) JDBC Datasource connection pool 설정에 다음 굵게 표시된 부분을 추가 한다.

```xml
…… .

<resource>
<data-source>
<database>
<vendor>oracle</vendor>

<user>scott</user>
<password>tiger</password>
<port-number>1521</port-number>
<server-name>localhost</server-name>
<driver-type>thin</driver-type>
<connection-pool>
<stmt-caching-size>10</stmt-caching-size>
<stmt-fetch-size>10</stmt-fetch-size>
</connection-pool>
```

### 5. OS Parameter 튜닝

#### 5.1 Linux OS

다음 값은 Web Service를 위해서 권장하는 설정 값이다. 주의 할 것은 특수한 상황이 있을 수 있으므로 반드시 OS 관리자에게 확인 하고 설정하길 바란다.

**5.1.1 Linux kernel parameter와 Network parameter 튜닝**

다음 kernel과 network parameter는 "sysctl"이라는 명령어를 사용해서 설정을 한다.

Kernel parameters

| Parameter | 의미 | 권장 값 |
|----|----|----|
| fs.file-max | 이 parameter는 Linux가 할당할 수 있는 file handle의 최대 수를 설정한다. | 65535 |

Network parameters

| Parameter | 의미 | 권장 값 |
|----|----|----|
| net.ipv4.tcp_fin_timeout | tcp_fin_timeout 변수는 socket을 closing했을 때 얼마나 오랫동안 FIN-WAIT-2상태로 socket이 유지할 것인지를 kernel에게 알려준다. | 30 |
| net.ipv4.tcp_keepalive_time | Tcp_keepalive_time 변수는 TCP/IP stack에게 현재는 사용되어지지 않는 connection을 유지시켜주기 위해서 얼마나 자주 TCP keep alive packet들을 보내는 지를 말해준다. | 1800 |
| net.ipv4.ip_local_port_range | Ip_local_port_range 변수는 클라이언트 connection들이 사용할 port의 범위를 kernel에게 알려주는 두개의 정수 값으로 구성된다. | 32768 61000 |

Root계정으로 로그인 시스템 자원의 제한 값 조정

한 후 다음 명령어를 root shell 환경 파일에 설정을 한다.

| 명령어 | 의미 | 권장값 |
|--------|------|--------|
| `ulimit -n 4096` | 최대 file descriptor수 | 4096 |
| `ulimit -u unlimited` | 최대 사용자 프로세스 수 | unlimited |

#### 5.2 Solaris OS 튜닝 권장

다음 값은 Web Service를 위해서 권장하는 설정 값이다. 주의 할 것은 특수한 상황이 있을 수 있으므로 반드시 OS 관리자에게 확인 하고 설정하길 바란다.

**5.2.1 Linux kernel parameter와 Network parameter 튜닝**

- TCP 관련 권장 설정 (runtime 설정: Sun 서버를 reboot한 후에는 적용되지 않음)

```sh
ndd -set /dev/tcp tcp_time_wait_interval 3000
ndd -set /dev/tcp tcp_fin_wait_2_flush_interval 10000
ndd -set /dev/tcp tcp_keepalive_interval 300000
```

서버 reboot후에도 매번 설정 되게 하기 위해서는 다음과 같이 설정을 한다.

참조: Solaris Tunable Parameters Reference Manual 에서 발취

> To set a TCP/IP parameter across system reboots, include the appropriate ndd command in a system startup script. Use the following guidelines to create a system startup script to include ndd commands:
>
> - Create a script in the /etc/init.d directory and create links to it in the /etc/rc2.d , /etc/rc1.d , and /etc/rcS.d directories.
> - The script should run between the existing S69inet and S72inetsvc scripts.
> - Name the script with the S70 or S71 prefix. Scripts with the same prefix are run in some sequential way so it doesnt matter if there is more than one script with the same prefix.
> - See the README file in the /etc/init.d directory for more information on naming run control scripts.

- File Descriptor 설정 /etc/system에 다음 설정을 추가 하든지 ulimit로 설정한다.

```text
set rlim_fd_max=2048
```

- 첨부: [운영자매뉴얼(TmaxSoft).doc](https://github.com/benelog/devnote/blob/master/attachments/158471_%EC%9A%B4%EC%98%81%EC%9E%90%EB%A7%A4%EB%89%B4%EC%96%BC_TmaxSoft_.doc)

## Related
- [[servlet]]
- [[tomcat]]
- [[ejb]]
- [[jndi]]
- [[jdbc]]
- [[java-encoding]]
