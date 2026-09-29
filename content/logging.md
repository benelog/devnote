- <https://blogs.apache.org/foundation/entry/apache_logging_services_project_announces>

- (배민 기술블로그)[로그 및 SQL 진입점 정보 추가 여정](https://techblog.woowahan.com/13429/)
- <http://java.dzone.com/articles/high-performance-and-smarter>
- <http://www.slf4j.org/>

## Log4j
- <http://logging.apache.org/log4j/1.2/publications.html>

### 활용법
- [Log4J 적용 사례(따라하기) - 손정호](http://blog.naver.com/julymorning4/100020021331)
- *단위테스트시 log4j*
- [JDBCAppender 사용에 대한 properties 파일 설정방법](http://blog.naver.com/sichiro/40049950380)

```properties
log4j.logger.org.apache.ftpserver.command=DEBUG, R
log4j.appender.R=org.apache.log4j.RollingFileAppender
log4j.appender.R.File=./res/log/log.gen
log4j.appender.R.MaxFileSize=10MB
log4j.appender.R.MaxBackupIndex=10
log4j.appender.R.layout=org.apache.log4j.PatternLayout
log4j.appender.R.layout.ConversionPattern=%C{1} %m%n
```

```properties
log4j.appender.db=org.apache.log4j.jdbc.JDBCAppender
log4j.appender.db.BufferSize=2
log4j.appender.db.URL=jdbc:microsoft:sqlserver://localhost:1433;databasename=college
log4j.appender.db.driver=com.microsoft.jdbc.sqlserver.SQLServerDriver
log4j.appender.db.user=sa
log4j.appender.db.password=sa
log4j.appender.db.sql=INSERT INTO LOG4J_LOG (ID,LOGINID,PRIORITY,LOGDATE,CLASS,METHOD,MSG) VALUES('%X{userId},%d{yyyy-MM-dd HH:mm:ss:}','%X{userId}','%p','%d{yyyy-MM-dd HH:mm:ss:mmm}','%C','%M','%m')
log4j.appender.db.layout=org.apache.log4j.PatternLayout
```

```xml
<appender name="fileLogger">
    <param name="File" value="/home1/log/xxx.log"/>
    <param name="datePattern" value="'.'yyyy-MM-dd" />
    <layout>
        <param name="ConversionPattern" value="%d{yyyy-MM-dd HH:mm:ss} [%-5p](%F:%L) %m%n"/>
    </layout>
</appender>

<root>
    <level value="DEBUG"/>
    <appender-ref ref="fileLogger"/>
</root>
```

```properties
log4j.rootLogger=DEBUG, R
log4j.appender.R=org.apache.log4j.RollingFileAppender
log4j.appender.R.File=./res/log/log.gen
log4j.appender.R.MaxFileSize=10MB
log4j.appender.R.MaxBackupIndex=10
log4j.appender.R.layout=org.apache.log4j.PatternLayout
log4j.appender.R.layout.ConversionPattern=[%5p] %d [%X{userName}] [%X{remoteIp}] %m%n
```

### log4j 확장
- [log4sql](http://sourceforge.net/projects/log4sql/)
- [Log4j JDBCAppender](http://www.dankomannhaupt.de/projects/)

```properties
log4j.logger.org.apache.ftpserver.command.STOR=INFO, JDBC_COMPARE_TEST
log4j.appender.JDBC_COMPARE_TEST=org.apache.log4j.jdbcplus.JDBCAppender
log4j.appender.JDBC_COMPARE_TEST.url=jdbc:hsqldb:hsql://localhost/sampledb
log4j.appender.JDBC_COMPARE_TEST.dbclass=org.hsqldb.jdbcDriver
log4j.appender.JDBC_COMPARE_TEST.username=sa
log4j.appender.JDBC_COMPARE_TEST.password=
log4j.appender.JDBC_COMPARE_TEST.sql=INSERT INTO LOGTEST (id, prio, cat, thread, msg, layout_msg, throwable, ndc, mdc, mdc2, info, addon, the_date, the_time, the_timestamp, created_by) VALUES (@INC@, '@PRIO@', '@CAT@', '@THREAD@', '@MSG@', '@LAYOUT:1@', '@THROWABLE@', '@NDC@', '@MDC:MyMDC@', '@MDC:MyMDC2@', '@TIMESTAMP@', '@LAYOUT@', null, null, null, 'me')
log4j.appender.JDBC_COMPARE_TEST.layout=org.apache.log4j.PatternLayout
log4j.appender.JDBC_COMPARE_TEST.layout.ConversionPattern=[%t] %m##%d{dd.MM.yyyy}#%d{HH:mm:ss}
log4j.appender.JDBC_COMPARE_TEST.layoutPartsDelimiter=#
```

- [Programmatically Configuring log4j - and the Future of Java Logging](http://robertmaldon.blogspot.com/2007/09/programmatically-configuring-log4j-and.html)

## SLF4j
- [Spring Framework에서 SLF4J의 설정 문제](http://blog.outsider.ne.kr/561)

### slf4j 이슈
안녕하세요.

저희 팀도 slf4j와 log4j이슈가 있었습니다.

**1. 버전 이슈**

1.5 버전 대 라이브러리와 1.6 버전 대 라이브러리에서 인터페이스 변화가 있습니다.

1.5.X

```java
public interface LocationAwareLogger extends Logger {

  final public int TRACE_INT = 00;
  final public int DEBUG_INT = 10;
  final public int INFO_INT = 20;
  final public int WARN_INT = 30;
  final public int ERROR_INT = 40;

  /**
   * Printing method which support for location information.
   *
   * @param marker
   * @param fqcn The fully qualified class name of the <b>caller</b>
   * @param level
   * @param message
   * @param t
   */
  public void log(Marker marker, String fqcn, int level, String message, Throwable t);

}
```

1.6.X

```java
public interface LocationAwareLogger extends Logger {

  final public int TRACE_INT = 00;
  final public int DEBUG_INT = 10;
  final public int INFO_INT = 20;
  final public int WARN_INT = 30;
  final public int ERROR_INT = 40;

  /**
   * Printing method with support for location information.
   *
   * @param marker
   * @param fqcn The fully qualified class name of the <b>caller</b>
   * @param level
   * @param message
   * @param t
   */
  public void log(Marker marker, String fqcn, int level, String message, Object[] argArray, Throwable t);

}
```

log 메서드의 파라미터가 틀립니다. argArray가 추가되었습니다. slf4j-log4j12 이 녀석의 Logger 구현체가 log4j와 호환성을 위해서 slf4j의 low level의 메서드인 log를 사용합니다.

이 문제는 maven의 dependency가 꼬여서 라이브러리간의 버전이 뒤틀릴 수가 있습니다.

제가 이 문제를 겪어 봤고요.

즉, slf4j를 안전하게 사용하시려면 pom.xml에 아래와 같이 버전을 맞춰주시면 됩니다.

```xml
<dependency>
   <groupId>org.slf4j</groupId>
   <artifactId>slf4j-api</artifactId>
   <version>1.6.1</version>
   <scope>compile</scope>
</dependency>
<dependency>
   <groupId>org.slf4j</groupId>
   <artifactId>slf4j-log4j12</artifactId>
   <version>1.6.1</version>
   <scope>compile</scope>
</dependency>
```

**--> Log4j와 연동할 경우 추가**

```xml
<dependency>
   <groupId>org.slf4j</groupId>
   <artifactId>jcl-over-slf4j</artifactId>
   <version>1.6.1</version>
   <scope>compile</scope>
</dependency>
```

**--> JCL 사용할 경우 추가**

물론 버전 업을 하려면 세 개 라이브러리 버전을 항상 같이 올려주셔야 합니다. (Spring 버전을 올릴 경우 모든 라이브러리 버전을 맞추듯이~)

**2. 기능 이슈**

slf4j에서 가장 돋이는 것이 메시지 포멧팅이 가능하다는 것입니다. 이는 아시다시피 로그 레벨에 맞지 않은 경우에 문자열 더하기 연산을 막아주기 때문이죠.

하지만 jcl-over-slf4j를 사용할 경우, 포멧팅에 필요한 argument를 넘길 수가 없어서 포메팅 기능을 사용할 수 없습니다. 전혀 slf4j가 도움이 되지 않습니다.

문자열 더하기 연산을 막기 위해서라도 isXXXEnabled로 감싸줘야 합니다.

즉, slf4j의 LoggerFactory를 바로 가져다 쓰지 않으면 아무런 이득이 없습니다. 오히려 호출구조에 hop만 생기게 되어 성능에 별 도움도 안됩니다.

**2.1. 기능이슈 해결방법!!**

결론은 slf4j의 강점을 활용하려면 jcl을 사용할 필요가 없습니다. 즉, slf4j-api, slf4j-log4j12여기 까지만 쓰고 LoggerFactory를 직접 사용합니다.

만일 운영중인 코드는 기존에 작성된 JCL 코드는 잘 동작하도록 그냥 냅두고요. isXXXEnabled로 감싸지 않은 부분은 찾아서 감싸주거나 slf4j로 전환하면 됩니다.

그리고 신규로 개발될 코드는 slf4j를 쓸 것인지 log4j를 쓸 것인지를 결정하여 둘 중에 하나 골라서 쓰시면 되지 않을까 싶네요.

**추가정보) JCL에서 LogFactory 구현체 찾기와 Log 구현체 찾기**

LogFactory는 LogFactory의 구현체를 찾고 그 구현체에서 Log객체를 생성하도록 구현되어 있습니다.

LogFactory는 LogFactory 구현제를 찾을 경우 시스템 프로퍼티에서 구현체 타입 정보를 구하고 그다음에 common-logging.properties에서 타입 정보를 구합니다.

그래도 없으면 META-INF/services/org.apache.commons.logging.LogFactory 파일에서 찾고 최종적으로는 기본 구현체인 LogFactoryImpl을 사용합니다.

LogFactoryImpl은 Log 구현체를 찾을 때 Log4j, JDK Logger, Simple Log 순으로 찾게 됩니다. 즉, 클래스 패스내에 Log4j가 있으면 Log4j가 1순위가 되죠.

그런데 jcl-over-slf4j에서는 META-INF/services/org.apache.commons.logging.LogFactory 에서 LogFactory 타입을 정의해 놓고 있습니다.

org.apache.commons.logging.impl.SLF4JLogFactory을 사용하며 내부적으로 bridge된 slf4j를 사용하도록 되어 있습니다.

만일!!! slf4j와 비슷한 다른 LogFactory 구현체가 META-INF/services/org.apache.commons.logging.LogFactory를 사용할 경우가 있다면 어떤 구현체가 로딩될지 아무도 모릅니다.

다른 LogFactory 구현체와 충돌 하지 않기 위해서 또 다른 JCL 구현체가 포함된 라이브러리가 있는지 항상 유의하셔야 합니다.

감사합니다.

## Related
- [[infra-monitoring]]
- [[log-anlaysis]]
- [[observability]]
- [[sre]]
