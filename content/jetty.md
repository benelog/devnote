## Performance

- <https://wiki.eclipse.org/Jetty/Howto/High_Load>
  - Jetty 7,8에서는 Thread pool에서 사용하는 BlockingQueue 구현체를 직접 설정할수 있도록 되어 있었음
- <http://www.eclipse.org/jetty/documentation/current/limit-load.html>
  - Jetty 9에서는 maxConnections, acceptingInLowResources 등으로 Control

## Jetty

- [http://jetty.mortbay.org](http://jetty.mortbay.org/)
- <http://jetty.mortbay.org/jetty5/tut/Server.html>
- <http://javacan.tistory.com/entry/136>
- jetty @ eclipse - 경량 자바 웹 컨테이너가 이클립스 프로젝트 안으로-안으로

### Continuation

예제

### QosFilter

### Maven plugin

```xml
<plugin>
    <groupId>org.mortbay.jetty</groupId>
    <artifactId>maven-jetty-plugin</artifactId>
    <configuration>
        <scanIntervalSeconds>3</scanIntervalSeconds>
        <contextPath>/</contextPath>
        <connectors>
            <connector implementation="org.mortbay.jetty.nio.SelectChannelConnector">
                <port>8080</port>
            </connector>
        </connectors>
    </configuration>
</plugin>
```

```xml
<executions>
    <execution>
        <id>start-jetty</id>
        <phase>pre-integration-test</phase>
        <goals>
            <goal>run</goal>
        </goals>
        <configuration>
            <scanIntervalSeconds>0</scanIntervalSeconds>
            <daemon>true</daemon>
        </configuration>
    </execution>
    <execution>
        <id>stop-jetty</id>
        <phase>post-integration-test</phase>
        <goals>
            <goal>stop</goal>
        </goals>
    </execution>
</executions>
```

### Executable war

```java
import java.net.URL;
import java.security.ProtectionDomain;

import org.eclipse.jetty.server.Connector;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.bio.SocketConnector;
import org.eclipse.jetty.webapp.WebAppContext;

/**
 * @author benelog
 */
public class JettyStart {

    public static void main(String[] args) {
        Server server = new Server();
        SocketConnector connector = new SocketConnector();

        // Set some timeout options to make debugging easier.
        connector.setMaxIdleTime(1000 * 60 * 60);
        connector.setSoLingerTime(-1);
        connector.setPort(8080);
        server.setConnectors(new Connector[] { connector });

        WebAppContext context = new WebAppContext();
        context.setServer(server);
        context.setContextPath("/");

        ProtectionDomain protectionDomain = JettyStart.class.getProtectionDomain();
        URL location = protectionDomain.getCodeSource().getLocation();
        context.setWar(location.toExternalForm());

        server.setHandler(context);
        try {
            server.start();
            System.in.read();
            server.stop();
            server.join();
        } catch (Exception e) {
            e.printStackTrace();
            System.exit(100);
        }
    }
}
```

```sh
VM_OPTS=-XX:MaxPermSize=256m -XX:PermSize=128m -Xms128m -Xmx512m
```

## Related
- [[jboss]]
- [[tomcat]]
