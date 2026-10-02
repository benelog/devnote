jeus 페이지의 운영자매뉴얼(TmaxSoft, 2005)에서 튜닝 부분을 옮겼다. WebtoB 튜닝 팁은 webtob 페이지에 있다.

## 4. Java 그리고 JEUS 튜닝 팁들

### 4.2 Java 튜닝 팁

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

### 4.3 JEUS Tuning Tips

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

## 5. OS Parameter 튜닝

### 5.1 Linux OS

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

### 5.2 Solaris OS 튜닝 권장

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

## Related
- [[jeus]]
- [[webtob]]
- [[jvm]]
- [[java-gc]]
- [[jdbc]]
- [[linux-network]]
