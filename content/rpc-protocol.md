## GRPC

- guide 사례 : <https://cloud.google.com/apis/design/>

## Spring remote

- <http://blog.naver.com/swiri2k/130009105234>
- [Spring에서 제공하는 원격기술](http://blog.naver.com/tw4you/110034150704)

### JNDI

- <http://www.theserverside.com/news/thread.tss?thread_id=35474>

```properties
java.naming.factory.initial = org.servicemix.jbi.jndi.SpringInitialContextFactory
```

```xml
  <bean id="jndi" class="org.servicemix.jbi.jndi.DefaultContext">
    <property name="entries">
      <map>
        <entry key="jdbc/pxe__pm">
          <bean class="org.hsqldb.jdbc.jdbcDataSource">
            <property name="database" value="jdbc:hsqldb:mem:pxe"/>
          </bean>
        </entry>
      </map>
    </property>
```

## Related
- [[api-design]]
- [[rest]]
- [[jndi]]
- [[spring]]
