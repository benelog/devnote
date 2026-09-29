## Active 모드와 Passive 모드

<http://blog.naver.com/geeksblog/20028104462>

<http://wearekorean.co.kr/zbxe/400>

### Command로 접근

<http://linux.byexamples.com/archives/320/using-curl-to-access-ftp-server/>

<http://curl.haxx.se/docs/manual.html>

curl -T test.py <ftp://benelog.net:2121> -u user:password

curl -T test.py ftps://benelog.net:2121 -u user:password -k

wget <ftp://user:password@benelog.net/file.out>

### SFTP vs FTPS

- SFTP : SSH File Transfer Protocol. SSH Key 사용 . 1 port. firewell friendly
- FPTS = FTP over SSL

<http://www.codeguru.com/csharp/.net/net_general/internet/article.php/c14329/FTPS-vs-SFTP-What-to-Choose.htm>

<http://ezinearticles.com/?Security-of-SFTP-Vs-FTPS&id=4885637>

    With FTPS the control session is always encrypted, but the data session might not be. Why is this? Because with the control session encrypted the authentication is protected and you always want this (normal ftp uses clear text).

### Ftps 키 발급

-genkey -alias keyAlias -keyalg RSA -keypass pass0101 -storepass
pass0101 -keystore ftpkeystore.jks

## Command

ascii : 전송모드를 ASCII모드로 설정한다.(ascii또는 as)

binary : 전송모드를 BINARY모드로 설정한다.( binary또는 bi)

bell : 명령어 완료시에 벨소리를 나게한다.(bell)

bye : ftp접속을 종료하고 빠져나간다.(bye)

cd : remote시스템의 디렉토리를 변경한다.(cd 디렉토리명)

cdup : remote시스템에서 한단계 상위디렉토리로 이동한다.(cdup)

chmod : remote시스템의 파일퍼미션을 변경한다.(chmod 755 index.html)

close : ftp접속을 종료한다. (close)

delete : remote시스템의 파일을 삭제한다.(delete index.old)

dir : remote시스템의 디렉토리 내용을 디스플레이한다.(dir)

disconnect : ftp접속을 종료한다.(disconnect)

exit : ftp접속을 종료하고 빠져나간다.(exit)

get : 지정된 파일하나를 가져온다.(get index.html)

hash : 파일전송 도중에 "#"표시를 하여 전송중임을 나타낸다.(hash)

help : ftp명령어 도움말을 볼 수 있다.(help또는 help 명령어)

lcd : local시스템의 디렉토리를 변경한다.(lcd 디렉토리명)

ls : remote시스템의 디렉토리 내용을 디스플레이한다. (ls 또는 ls -l)

mdelete : 여러개의 파일을 한꺼번에 지울 때 사용한다.( mdelete \*.old)

mget : 여러개의 파일을 한꺼번에 가져오려할 때 사용한다. ( mget \*.gz)

mput : 한꺼번에 여러개의 파일을 remote시스템에 올린다.(mput \*.html)

open : ftp접속을 시도한다.(open 168.126.72.51또는 open
[ftp.kornet.net](ftp://ftp.kornet.net/))

prompt : 파일전송시에 확인과정을 거친다. on/off 토글 (prompt)

put : 하나의 파일을 remote시스템에 올린다.(put index.html)

pwd : remote시스템의 현재 작업디렉토리를 표시한다.(pwd)

quit : ftp접속을 종료하고 빠져나간다.(quit)

rstatus : remote시스템의 상황(version, 어디서, 접속ID등)을
표시한다.(rstatus)

rename : remote시스템의 파일명을 바꾼다.(remote 현재파일명 바꿀파일명)

rmdir : remote시스템의 디렉토리을 삭제한다.(rmdir 디렉토리명)

size :remote시스템에 있는 파일의 크기를 byte단위로 표시한다.(size
index.html)

status : 현재 연결된 ftp세션모드에 대한 설정을 보여준다.(status)

type : 전송모드를 설정한다.(type 또는 type ascii 또는 type binary)

## Java Ftp Client
### FTP Spec
- [List of raw FTP commands](http://www.nsftools.com/tips/RawFTP.htm)

### 다양한 FTP library 소개
- [Java FTP Tips](http://www.nsftools.com/tips/JavaFtp.htm)
- <http://javacan.tistory.com/113>
- [ftp Client](http://blog.naver.com/crowdy/150017503170)
- [FTP 파일업로드](http://blog.naver.com/poppppp/110030087066)

## Java Ftp Server
- [www.jscape.com/secureftpserver/](http://www.jscape.com/secureftpserver/)
- <http://www.jscape.com/secureftpserver/index.html?source=google>

### 성능비교
126MB, 파일 392개, 폴더 16개

- Mina : 45
- 알FTP서버 : 66
- Serv-U : 72
- Nofeel FTP server : slient log mode 67

## apache MINA FtpServer
### 설치정보
- <http://cwiki.apache.org/confluence/display/FTPSERVER/Building>

```sh
wget
tar xzvf ftpserver-1.0.4.tar.gz
```

boot.sh

```sh
nohup ./ftpd.sh res/conf/ftpd-typical.xml > startRecord.txt &
```

### 설정
- [Embedding FtpServer in 5 minutes](http://cwiki.apache.org/confluence/display/FTPSERVER/Embedding+FtpServer+in+5+minutes)

Spring 방식 설정

```xml
<beans:beans xmlns="http://mina.apache.org/ftpserver/spring/v1"
    xmlns:beans="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="
       http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-2.5.xsd
       http://mina.apache.org/ftpserver/spring/v1 http://mina.apache.org/ftpserver/ftpserver-1.0.xsd
       ">

    <server>
        <listeners>
            <nio-listener name="default" port="2121">
                <ssl>
                    <keystore file="mykeystore.jks" password="secret"/>
                </ssl>
            </nio-listener>
        </listeners>
        <file-user-manager file="users.properties" />
    </server>
</beans:beans>
```

```xml
    <beans:bean>
        <beans:property name="foo" value="123"/>
    </beans:bean>

    <server>
        <ftplets>
            <ftplet name="ftplet1">
                <beans:bean>
                    <beans:property name="foo" value="123"/>
                </beans:bean>
            </ftplet>
            <ftplet name="ftplet2">
                <beans:ref name="ftpletBean2" />
            </ftplet>
        </ftplets>
    </server>
</beans:beans>
```

```xml
<beans:beans xmlns="http://mina.apache.org/ftpserver/spring/v1"
    xmlns:beans="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="
       http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-2.5.xsd
       http://mina.apache.org/ftpserver/spring/v1 file:///home/niklas/workspaces/apache/ftpserver/core/src/main/resources/org/apache/ftpserver/config/spring/ftpserver-1.0.xsd
       ">
    <!--        http://mina.apache.org/ftpserver/spring/v1 http://mina.apache.org/ftpserver/ftpserver-1.0.xsd -->
    <server>
        <listeners>
            <nio-listener name="default" port="2222" implicit-ssl="true"  idle-timeout="60" local-address="1.2.3.4">
                <ssl>
                    <keystore file="mykeystore.jks" password="secret" key-password="otherSecret" />
                    <truststore file="mytruststore.jks" password="secret"/>
                </ssl>
                <data-connection idle-timeout="60">
                    <active enabled="true" local-address="1.2.3.4" local-port="2323" ip-check="true"/>
                    <passive ports="123-125" address="1.2.3.4" external-address="1.2.3.4" />
                </data-connection>
                <blacklist>1.2.3.0/16, 1.2.4.0/16, 1.2.3.4</blacklist>
            </nio-listener>
            <listener name="myCustomListener">
                <beans:bean />
            </listener>
        </listeners>
        <ftplets>
            <ftplet name="ftplet1">
                <beans:bean>
                    <beans:property name="foo" value="123"/>
                </beans:bean>
            </ftplet>
        </ftplets>
        <file-user-manager file="users.properties" encrypt-passwords="true" />
        <native-filesystem case-insensitive="false" create-home="true" />
        <commands use-default="false">
            <command name="MYHELP">
                <beans:bean />
            </command>
        </commands>
        <messages languages="se, no ,da" />
    </server>
</beans:beans>
```

```xml
<beans:beans xmlns="http://mina.apache.org/ftpserver/spring/v1"
    xmlns:beans="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="
       http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-2.5.xsd
       http://mina.apache.org/ftpserver/spring/v1 http://mina.apache.org/ftpserver/ftpserver-1.0.xsd
       ">

    <server />
</beans:beans>
```

### Passive port
```xml
<nio-listener name="default">
    <port>11201</port>
    <data-connection-configuration idle-timeout="120">
        <class>org.apache.ftpserver.DefaultDataConnectionConfiguration</class>
        <passive-ports>10125-10199</passive-ports>
    </data-connection-configuration>
</nio-listener>
```

### Apache Ftp Server + Spring
Apache FTP 서버( )는 Java기반의 오픈소스 FTP서버입니다.

Java기반의 모듈이라고 하면 성능이 안 나오지 않을까 걱정하시는 분도 계실 것 같습니다. 이전에 1.0.M3버전으로 제 PC에서 다른 FTP서버와 비교해서 테스트해본 결과는 아래와 같았습니다.

테스트 환경

- OS : Windows XP
- CPU : Intel® Core™ 2 Duo CPU E6750, 2.66GHz
- RAM : 2GB

업로드 테스트 데이터

- 용량 : 126MB
- 파일수 : 392개
- 폴더 : 16개

![Ftp_performance.GIF](https://raw.githubusercontent.com/benelog/devnote/master/attachments/1429048_Ftp_performance.GIF)

테스트 결과로 윈도우에서 돌아가는 다른 FTP서버와 비교했을 때 가장 빠른 속도를 보여주는 예상밖의 성능이 나왔었습니다. Linux등에서는 어떤지 몰라도 크게 성능을 걱정할 수준은 아닐 것으로 예상됩니다.

Apache Ftp서버는 설정만으로도 FTP에 부가적인 기능을 많이 사용할 수 있습니다. 예를 들면 Log4j의 설정을 이용해서 원하는 수준과 방식으로 로그를 기록할 수 있고, 사용자정보를 입력,조회 등의 쿼리만 설정 파일에 넣어주면 DB로 사용자를 관리할 수 있게도 해줍니다.

그리고 Java기반이다 보니, 직접 코딩을 해서 확장을 하는 것도 손쉽습니다. Apache FTP 서버에서 정의한 인터페이스대로 코딩을 하고 이를 설정파일에다 추가할 수도 있죠. 대표적으로 Ftplet과 같은 인터페이스가 있습니다.

활용사례로, Hadoop의 파일시스템인 HDFS(Hadoop Distributed File System)으로 파일을 올릴 수 있는 서버모듈도 이 Apache Ftp 서버를 이용해서 구현한 사례가 있습니다. FTP client프로그램으로 붙어서 직접 HDFS로 파일을 올리거나, 다른 프로그램에서 ftp프로토콜을 이용해 HDFS에 접근할 수 있는 것이죠.[^hdfs-ftp]

흥미로운 점은, 이 FTP서버에서는 스프링 방식의 설정을 지원한다는 것입니다. 예를 들면, 데이터베이스로 사용자를 관리할때, 익숙한 bean태그를 이용해서 datasource의 선언을 할 수 있습니다.

```xml
<db-user-manager encrypt-passwords = "clear">
    <data-source>
        <beans:bean>
            <beans:property name="driverClassName" value="${jdbc.driverClassName}" />
            <beans:property name="url" value="${jdbc.url}" />
            <beans:property name="username" value="${jdbc.username}" />
            <beans:property name="password" value="${jdbc.password}" />
            <beans:property name="initialSize" value="${dbpool.initialSize}" />
        </beans:bean>
    </data-source>
.....
```

더욱 재미있게도, 배포된 소스[^ftp-source]중 examples폴더를 보면, Spring DM을 이용해서 OSGI번들로 apache FTP서버를 활용하는 예제가 나옵니다. META-INF/spring/bundle-context.xml의 파일을 보면 아래와 같이 선언되어 있습니다.

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:osgi="http://www.springframework.org/schema/osgi"
    xmlns:ftp="http://mina.apache.org/ftpserver/spring/v1"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
       http://www.springframework.org/schema/osgi
       http://www.springframework.org/schema/osgi/spring-osgi.xsd
       http://mina.apache.org/ftpserver/spring/v1
       http://mina.apache.org/ftpserver/ftpserver-1.0.xsd ">
    <ftp:server>
        <ftp:listeners>
            <ftp:nio-listener name="default" port="2222" />
        </ftp:listeners>
        <ftp:ftplets>
            <ftp:ftplet name="ftplet1">
                <ref bean="ftplet" />
            </ftp:ftplet>
        </ftp:ftplets>
        <ftp:file-user-manager
            url="org/apache/ftpserver/example/osgiservice/users.properties" />
    </ftp:server>
    <osgi:service interface="org.apache.ftpserver.FtpServer"   ref="server">
    </osgi:service>
    <osgi:reference interface="org.apache.ftpserver.ftplet.Ftplet" />
    <bean
       init-method="init" destroy-method="destroy"    >
       <property name="server" ref="server" />
    </bean>

</beans>
```

FTP 서버 역할을 하면서 확장된 기능이 필요하고, 모듈을 재배포하는 도중에도 멈추지 않아야하는 서비스를 만들어야 할 때가 생긴다면, Apache Ftp Server + Spring DM의 조합을 사용해서 편하게 구현을 할 수 있을 것으로 보입니다.

[^hdfs-ftp]: HDFS로 접근하는 FTP서버에 대한 자료 : [HDFS over FTP](https://sites.google.com/a/iponweb.net/hadoop/Home/hdfs-over-ftp), [hadoop을 이용한 ftp server](http://www.gruter.co.kr/213)
[^ftp-source]: 에서 다운 받을 수 있습니다.

## Related
- [[async-server]]
- [[hadoop]]
- [[osgi]]
- [[spring]]
