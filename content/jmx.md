## 관련스펙
- [JSR 3: Java management Extensions](http://jcp.org/en/jsr/detail?id=3) (JMX Specification)
- [JSR 160 : Java Management Extendsion (JMX) Remote API 1.0](http://jcp.org/aboutJava/communityprocess/final/jsr160/index.html)

## API 문서
- <http://java.sun.com/j2se/1.5.0/docs/api/javax/management/package-summary.html>
- [Java Management[tm] Extensions (JMX) Download Information](http://java.sun.com/javase/technologies/core/mntr-mgmt/javamanagement/download.jsp)
- <http://java.sun.com/javase/technologies/core/mntr-mgmt/javamanagement/>

## Instrumental level
JMX로 관리가능한 리소스(JMX manageable resource)의 구현을 위한 스펙제공.

자원을 다루는 수단은 Mbean (Managed Bean)에 의해서 제공.

Mbean

- Standard MBean : Java Bean로 부터 파생된 디자인 패턴 (getter/setter)
- Dynamic MBean : 런타임시에 좀더 유연하도록 하는 인터페이스 정의를 사용.
- Model MBean : 동적으로 설치가능한 MBean
- Open MBean : 실행 중에 발견되는 객체의 정보를 확인하기 위한 MBean이 필요할 때 사용.

Notification 메커니즘: Mbean이 Notification Event를 생성하고 다른 레벨에 존재하는 컴포넌트에게 이 이벤트를 보냄.

## Agent level
직접 리소스를 제어하고 원격 관리 어플리케이션이 리소스를 콘트롤할 수 있도록 연결. MBean 서버와 MBean를 다루기 위한 에이전트 서비스로 구성

- Mbean 서버 - 관리기능을 갖는 오브젝트의 레지스트리.
- 에이전트 서비스 - MBean 서버에 등록된 MBean의 관리기능을 실행할 수 있는 오브젝트. 에이전트 서비스도 MBean이 되어 MBean서버를 통해 제어될 수 있다.

에이전트가 제공하는 기능

- MBean의 속성값을 얻고, 변경.
- MBean의 메소드를 수행.
- 모든 MBean에서 수행된 정보를 받는다.
- 기존 클래스나 새로 다운로드된 클래스의 새로운 MBean을 초기화하고 등록
- 기존 MBean들의 구현과 관련된 관리 정책을 처리하기 위해서 에이전트 서비스를 사용되도록 한다.

## Distributed Services Level
JMX 관리자를 구현하기 위한 인터페이스와 에이전트를 다루기 위한 컴포넌트를 제공. 에이전트와 MBean의 의미적인 내용을 관리화면으로 내보냄.

프로토콜은 local, RMI, JMX Connector API를 통해 새로운 방식 정의도 가능.

## 사용예
JDK에는 시스템정보 (CPU, Memory, Disk 등)의 정보를 가져올 수 있는 MBean을 제공

Apache, Tomcat등 에는 해당 서버정보를 가져올 수 있는 MBean 제공

JMX는 기본적으로 다섯 가지 모니터릿 정보를 제공한다.
System Apache Tomcat Error Log Database

### JConsole
- [\[jconsole\] JConsoled을 사용해서 Tomcat 5.5 모니터링 하기](http://www.tuning-java.com/171)

```sh
-Dcom.sun.management.jmxremote \
-Dcom.sun.management.jmxremote.port=8086 \
-Dcom.sun.management.jmxremote.ssl=false \
-Dcom.sun.management.jmxremote.authenticate=false \

-Dcom.sun.management.jmxremote.password.file=/home/benelog/jmxremote.password \
```

netstat -anp 로 확인

## 관련자료
- [Instrumenting applications with JMX](http://www-128.ibm.com/developerworks/java/library/j-jtp09196/index.html?ca=drs)
- [Monitoring and Management Using JMX](http://java.sun.com/j2se/1.5.0/docs/guide/management/agent.html)

### Spring 관련
- [JMX 지원](http://blog.naver.com/swiri2k?Redirect=Log&logNo=130009105363)

## Sample code
```java
MBeanServer server = ManagementFactory.getPlatformMBeanServer();
ObjectName name = new ObjectName("mbeantest:type=Speaker");
Speaker mbean = new Speaker();
server.registerMBean(mbean, name);

mbean.setMessage("How are you?");
while(true){
    mbean.say();
    Thread.sleep(1000);
}
```

```java
public class Speaker implements SpeakerMBean {
    private String message;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void say(){
        System.out.println(message);
    }

    public void clearMessage(){
        this.message = "no message";
    }
}
```

```java
public interface SpeakerMBean {
    public String getMessage();
    public void setMessage(String message);
    public void say();
    public void clearMessage();
}
```

## Lucy JMX
Lucy에서의 MBean으로 모니티터링 가능한 것들

### System
- cpuUsage : 현재 시스템 사용률
- loadAverage : 시스템 평균 부하의 평균 값
- freeMemory : 이용 가능한 메모리 사이즈
- usedMemory : 현재 사용 중인 메모리 사이즈
- totalMemory : 전체 메모리 사이즈

### Apache
- currentTps : 현재 TPS(Transaction Per Second)
- averageTps : 평균 TPS(Transaction Per Second)
- workCount : 수행 중인 thread 수
- idleCount :대기 중인 thread 수
- accessCount : 요청 수
- uptime :가동 시간

### Tomcat
- maxThreads : ThreadPool에서 사용 가능한 최대 Thread 개수
- currentThreadCount : ThreadPool에서 현재 사용 가능한(대기 중인) Thread 개수
- currentThreadsBusy : ThreadPool에서 현재 사용 중인 Thread 개수
- errorCount : 요청 처리 실패 개수

### Error Log
- project : 에러가 발생한 프로젝트 구분 정보
- server : 에러가 발생한 서버 구분 정보
- userid : 사용자 아이디(네이버 아이디, 한게임 아이디 등)
- logdt : 에러 발생 날짜
- loglevel : 에러 레벨(DEBUG, WARN, INFO, ERROR, FATAL)
- url : 에러가 발생한 URL
- form : 수행된 페이지에 대한 정보
- cookie : 수행된 페이지에 대한 쿠키정보
- referer : referer 정보
- agent : 브라우저 정보
- client : 접속한 클라이언트의 IP
- message : 에러 메시지
- location : 에러가 발생한 소스 상의 위치
- thrown : 발생한 예외에 대한 stack trace 정보
- thrownmessage :에러 메시지

### Database
- maxActive : 최대 active connection 개수
- maxIdle : 최대 idle connection 개수
- minIdle : 최소 idle connection 개수
- maxWait : 최대 connection 대기 시갂
- numActive : 현재 active connection 개수
- numIdle : 현재 idle connection 개수
- url : JDBC connection URL
- driverClassName : JDBC driver 클래스 이름
- username : JDBC 사용자 이름
- databaseId : oracle SID 또는 mysql database 이름
- queryTimeout : query timeout threshold(second)
- useConnectionWatcher : connection watcher 사용에 대한 설정 정보
- useSlowQueryWarn : slow query warning에 대한 설정 정보
- useSlowAcquireWarn : slow acquire warning에 대한 설정 정보

## Related
- [[java]]
- [[infra-monitoring]]
- [[java-profiling]]
- [[tomcat]]
- [[spring]]
