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

## 운영자매뉴얼(TmaxSoft)

jeus 페이지의 운영자매뉴얼(TmaxSoft, 2005)에서 WebtoB 관련 부분을 옮겼다.

### 1.3 WebtoB

WebtoB는 Tmaxsoft에서 자체 개발한 Web Server로써 WAS인 JEUS와 연동되어 Web Services를 수행하는 제품으로 Server의 가장 앞 단에서 클라이언트의 요청을 받아들이고 처리하는 역할을 담당한다.

**1.3.1 소프트웨어 구성**

![WebtoB 소프트웨어 구성](https://raw.githubusercontent.com/benelog/devnote/master/attachments/158473_blip000001.png)

WebtoB는 World Wide Web 환경에서 HTTP 프로토콜을 통하여 전달된 브라우저의 요구를 처리하는 Web Server이다. WebtoB는 세계 유명 Web Server보다 월등히 우수한 성능을 보장할 뿐 아니라, 기존 Web Server가 가지고 있는 한계점들을 완벽하게 개선함으로써 Web 환경을 구축하는 데 있어 고성능과 안정성이라는 두 가지 효과를 모두 얻을 수 있다.

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

### 4.1 WebtoB 튜닝 팁들

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

## Related
- [[jeus]]
- [[jeus-tuning]]
- [[apache-httpd]]
- [[http-server]]
