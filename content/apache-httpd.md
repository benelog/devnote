<div id="header">

</div>

<div id="content">

<div class="paragraph">

소스 분석 거리 : <a
href="http://svn.apache.org/repos/asf/apr/apr/trunk/network_io/unix/sockets.c"
class="bare">http://svn.apache.org/repos/asf/apr/apr/trunk/network_io/unix/sockets.c</a>

</div>

<div class="sect1">

## Apache 설치

<div class="sectionbody">

<div class="sect2">

### yum을 이용해 설치 :

<div class="paragraph">

\$ yum install httpd httpd-devel

</div>

</div>

<div class="sect2">

### 다운받아 설치

<div class="paragraph">

[리눅스 - Apache
설치하기](http://blog.naver.com/tonyounmi?Redirect=Log&logNo=40047198497)

</div>

</div>

</div>

</div>

<div class="sect1">

## 명령어

<div class="sectionbody">

<div class="paragraph">

<div class="title">

/configure --prefix=/home1/irteam/apache2 --enable-rewrite --enable-so
--enable-mods-shared=most

</div>

service httpd start

</div>

<div class="paragraph">

httpd -t

</div>

<div class="paragraph">

httpd start

</div>

<div class="paragraph">

httpd status

</div>

<div class="paragraph">

apachectl configtest

</div>

<div class="paragraph">

apachectl graceful

</div>

</div>

</div>

<div class="sect1">

## Tomcat 연동

<div class="sectionbody">

<div class="ulist">

- [Apache 2.2 + PHP 5.2.7 + Tomcat 6.0 연동하기
  (톰캣편)](http://net4all.egloos.com/2164189)
- <http://tomcat.apache.org/connectors-doc/generic_howto/quick.html>
- [\[mod_jk](http://kwon37xi.egloos.com/1761178) Apache 2 + Tomcat 5.0 +
  mod_jk 1.2 on Linux 연동\] (권남)
- [\[Tomcat Apache 연동](http://www.tuning-java.com/185) 톰캣과 아파치
  연동(JDK 1.6 + Apache 2.2 + Tomcat 6.0)Tools/WAS\] (Tunning-java)

</div>

<div class="paragraph">

\<Connector port="8009" protocol="AJP/1.3" redirectPort="8443" /\> :

</div>

<div class="ulist">

- [\[tomcat](http://blog.openframework.or.kr/74) Apache, Tomcat
  연동하기\]
- <http://blog.naver.com/cycle98?Redirect=Log&logNo=140003166006>
- <http://blog.naver.com/eosdeath?Redirect=Log&logNo=140032477546>

  <div class="olist arabic">

  1.  LoadModule 설정

  2.  JkWorkersFile 설정 [ProxyAJP를 이용한 Apache2 + Tomcat 연동시
      중대한 보안
      문제](http://theeye.pe.kr/entry/how-to-block-apache-with-proxy-remote-request)

  </div>

</div>

<div class="paragraph">

<http://tomcat.apache.org/download-connectors.cgi?Preferred=http%3A%2F%2Fmirror.khlug.org%2Fapache%2F>

</div>

<div class="paragraph">

<http://suya55.springnote.com/pages/2098366>

</div>

</div>

</div>

<div class="sect1">

## Virtual host

<div class="sectionbody">

<div class="paragraph">

<http://kwon37xi.egloos.com/4544612>

</div>

<div class="paragraph">

<http://www.javacodegeeks.com/2012/04/virtual-host-apache-httpd-server-tomcat.html>

</div>

</div>

</div>

<div class="sect1">

## 로그

<div class="sectionbody">

<div class="paragraph">

[\[Apache HTTPD](http://kwon37xi.egloos.com/1717906) Log
rotation(logrotate)\]

</div>

</div>

</div>

<div class="sect1">

## Load balacing

<div class="sectionbody">

<div class="paragraph">

[apache + tomcat ajp load-balance
tip](http://tong.nate.com/bassdot/47781604)

</div>

<div class="paragraph">

[Apache 2.2 + mod_jk 1.2 ( load balancing ) + Tomcat 5.5 ( virtual
hosting )](http://blog.naver.com/jistol?Redirect=Log&logNo=80057344253)

</div>

<div class="paragraph">

[How to load balance Tomcat 5.5 with Apache on
Windows](http://thought-bytes.blogspot.com/2007/03/how-to-load-balance-tomcat-55-with.html)

</div>

</div>

</div>

<div class="sect1">

## 에러해결

<div class="sectionbody">

<div class="ulist">

- [Apache 403 Forbidden Error and
  Solution](http://www.cyberciti.biz/faq/apache-403-forbidden-error-and-solution/)
- <http://yamazsw.egloos.com/2230872>
- 에러 .htaccess :
  `.htaccess pcfg_openfile: unable to check htaccess file, ensure it is readable`

</div>

</div>

</div>

<div class="sect1">

## 보안

<div class="sectionbody">

<div class="ulist">

- [Image 펌질을
  막아보자](http://blog.daum.net/superman2up/8676327?srchid=BR1http%3A%2F%2Fblog.daum.net%2Fsuperman2up%2F8676327)

</div>

</div>

</div>

<div class="sect1">

## 설정

<div class="sectionbody">

<div class="ulist">

- [URL
  Rewriting](http://www.yourhtmlsource.com/sitemanagement/urlrewriting.html)
- [ETag 제거](http://dragonpapa.pe.kr/130033975559)

</div>

</div>

</div>

<div class="sect1">

## Performance Tuning

<div class="sectionbody">

<div class="ulist">

- [http://people.apache.org/sctemme/ApconUS2007/scalingup.pdf](http://people.apache.org/%3Csub%3Esctemme/ApconUS2007/scalingup.pdf)
- [Apache MaxClients와 Tomcat의 Full
  GC](http://helloworld.naver.com/helloworld/132178) : apche의
  maxClient값과 Tomcat의 maxThread, AJP의 backlog값을 결정할 때 고려할
  사안
- <http://blog.naver.com/PostView.nhn?blogId=sugyoo&logNo=20119924250> :
  Worker vs prefork

</div>

</div>

</div>

<div class="sect1">

## 아파치 설치

<div class="sectionbody">

<div class="paragraph">

Ubuntu 배포판 : <a
href="http://blog.naver.com/PostView.nhn?blogId=nimbusob&amp;logNo=179889399"
class="bare">http://blog.naver.com/PostView.nhn?blogId=nimbusob&amp;logNo=179889399</a>

</div>

<div class="sect2">

### 설치하기

<div class="paragraph">

sudo apt-get install apache2

</div>

<div class="sect3">

#### 실행

<div class="paragraph">

sudo /etc/init.d/apache2 restart

</div>

</div>

<div class="sect3">

#### 확인

<div class="paragraph">

기본 설치하면 /var/www에 index.html 이 읽어진다. index.html의 내용을
바꾼후 바뀐 내용이 반영되는지 본지

</div>

</div>

</div>

</div>

</div>

<div class="sect1">

## apxs 설치

<div class="sectionbody">

<div class="paragraph">

sudo apt-get install apache2-threaded-dev

</div>

</div>

</div>

<div class="sect1">

## 컴파일

<div class="sectionbody">

<div class="paragraph">

<div class="title">

/configure --with-apxs=/usr/bin/apxs2 --enable-EAPI

</div>

make

</div>

<div class="paragraph">

make install

</div>

</div>

</div>

</div>

<div id="footer">

<div id="footer-text">

Last updated 2026-02-28 04:33:58 +0900

</div>

</div>

## Related
- [[http-server]]
- [[nginx]]
