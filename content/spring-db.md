[Spring에서 데이터베이스
연결하기](http://www.ibm.com/developerworks/kr/library/tutorial/0704_patil/index.html)

jndi lookup

[IBM WebSphere Developer Technical Journal: IBM WebSphere Application
Server를 위한 Spring 애플리케이션 개발하기 — Part 2
(한글)](http://www.ibm.com/developerworks/kr/library/0604_patil/0604_patil2.html)

[Add Some Spring to Your Oracle JDBC
Access](http://www.oracle.com/technology/pub/articles/marx_spring.html?_template=/ocom/print)

[Dynamic DataSource
Routing](http://blog.springsource.com/2007/01/23/dynamic-datasource-routing/)

[여러개의 DB에 선택적으로
커넥션하기](http://hilldan.springnote.com/pages/1394856)

# SQLExceptionTranslator

<http://pietrowski.info/2008/09/how-to-extend-sqlerrorcodesfactory/>

# TX 선언

``` xml
<tx:advice id="txAdvice">

  <tx:attributes>

   <tx:method name="add*" propagation="REQUIRED"/>

  </tx:attributes>

</tx:advice>

<aop:config>

  <aop:advisor pointcut="execution(* *..*BO.*(...))" advice-ref="txAdvice"/>

</aop:config>

         <aop:advisor
         pointcut="execution(public * com.benelog.test..*.*BO.*(..))"
         advice-ref="txAdvice"/>

<tx:annotation-driven/>

<tx:annotation-driven transaction-manager="memberTransactionManager"/>
```

또는 \<bean
class="org.springframework.orm.jpa.support.PersistenceAnnotationBeanPostProcessor"/\>

[Spring, JPA, and JTA with Hibernate and
JOTM](http://erich.soomsam.net/2007/04/24/spring-jpa-and-jta-with-hibernate-and-jotm/)

Annocation 기반

``` xml
<tx:annotation-driven />
<tx:annotation-driven transaction-manager="txManager" />

 <property name="transactionAttributes">
   <props>
    <prop key="insert*">PROPAGATION_REQUIRED, **-RuntimeException**</prop>
    <prop key="update*">PROPAGATION_REQUIRED</prop>
    <prop key="*">PROPAGATION_REQUIRED</prop>
   </props>
  </property>
```

# 스프링 트랜잭션 관련 링크

[Spring에서 트랜잭션 관리](http://openframework.or.kr/blog/?p=324)

[스프링 트랜잭션 주의할 것](http://whiteship.me/2143)

[Propagation behavior](http://whiteship.tistory.com/703)

[Isolation levels](http://whiteship.tistory.com/704)

[SIA 6장 트랜잭션 관리 발표자료](http://whiteship.tistory.com/1266)

[Spring Transaction Management 선언적 트랜젝션
관리](http://gerions.egloos.com/4529457)

[ejb transaction attribute와 spring transactional propagation rules
비교](http://blog.empas.com/okks1367/15280905)

# JOTM

[spring 에서 JOTM 를 이용한 분산데이터베이스 transaction
처리](http://sslee05.egloos.com/4970203)

[JOTM을 이용한 트랜잭션 처리](http://javacan.tistory.com/entry/129)

# Sharding

DB적인 DB샤딩때 쓰는 DataSource routing (
<http://dev.anyframejava.org/docs/anyframe/plugin/optional/routingdatasource/1.0.0/reference/htmlsingle/routingdatasource.html>
참고 )

[
](https://github.com/spring-projects/spring-framework/blob/master/spring-jdbc/src/main/java/org/springframework/jdbc/datasource/lookup/AbstractRoutingDataSource.java)

[AbstractRoutingDataSource](https://github.com/spring-projects/spring-framework/blob/master/spring-jdbc/src/main/java/org/springframework/jdbc/datasource/lookup/AbstractRoutingDataSource.java)

# Best effort

- [Distributed transactions in Spring, with and without
  XA](http://www.javaworld.com/javaworld/jw-01-2009/jw-01-spring-transactions.html)
- <https://gist.github.com/anair-it/f92ac33bd6ac5d260961022dd06110f2>
- <https://jira.springsource.org/browse/SPR-3844>

## Related
- [[jdbc]]
- [[jpa]]
- [[orm]]
- [[spring-ai]]
- [[spring-batch]]
- [[spring-boot]]
- [[spring-changes]]
- [[spring-cloud]]
- [[spring-data-jdbc]]
- [[spring-hostname]]
- [[spring-integration]]
- [[spring-mvc]]
- [[spring-properties]]
- [[spring-resource-handling]]
- [[spring-security]]
- [[spring-shell]]
- [[spring-tips]]
- [[toby-spring]]
