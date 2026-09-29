Inversion of control 페이지 참조할 것

## ApplicationContext가 BeanFactory보다 좋은점
- MessageSource지원 (MessageSourceAware)
- Listener지원 (ApplicationEventPublisherAware)
- ResourceLoader지원 (ResourceLoaderAware)

## 빈정보 접근
- BeaNameAware
- BeanFactoryAware
- ApplicatoinContextAware

## 생명주기
- InitializingBean , init-method, @PostConstruct
- DiposableBean ,destroy-method, @PreDestroy

## 설정
- [Spring 2.0의 XML확장기능 (1)](http://toby.epril.com/?p=276)
- [Spring 2.0의 XML확장기능 (2)](http://toby.epril.com/?p=277)
- [InsideSpring (3) 스프링 밖에서 WebApplicationContext에 접근하기](http://toby.epril.com/?p=934)

## Annotation 기반
- @Resource : JSR-250 / EJB3 model
- @PostConstruct : InitializingBean#afterPropertiesSet()과 비슷
- @PreDestroy : DisposableBean#destroy()와 비슷
- @Component
  - *컴포넌트 자동감지 기능을 사용해보니..*

## DI관련 JSR
- [Dependency Injection 표준화?](http://toby.epril.com/?p=873)
- <http://www.adam-bien.com/roller/abien/entry/what_is_the_relation_between>

## Scope
singleton, prototype, request, session, global-session

## 설정 샘플
- 첨부: [springonline_final_050108[1].pdf](https://github.com/benelog/devnote/blob/master/attachments/536372_springonline_final_050108_1_.pdf)

## 퀴즈풀기

```xml
<bean id="info" class="a.b.c.Info" p:dao-ref="mydao" scope="prototype" />
<bean id="mydao" class="a.b.c.MyDao" />
```

- ApplicationContext aware
- `<aop:scoped-proxy/>`
- Method Injection
- @Configuable
- Arbitrary method replacement

## Spring container API
- ClassPathApplicationContext
- FileSstemXmlApplicationContext

## Spring DI sample

```xml
<bean id="jobRepository" class="org.springframework.batch.core.repository.support.SimpleJobRepository">
  <constructor-arg ref="mapJobInstanceDao" />
  <constructor-arg ref="mapStepExecutionDao" />
</bean>

<bean id="stockPremiunContentsBuildJob" parent="simpleJob">
  <property name="steps">
    <ref bean="recommendationBuildStep"/>
  </property>
</bean>
```

```xml
<constructor-arg><value>10</value></constructor-arg>
<constructor-arg><value type="long">10</value></constructor-arg>
<constructor-arg value="10"/>
```

### List

```xml
<list value-type="java.lang.Double"></list>

<list>
  <ref bean="testStep"/>
  <bean class="test.testStep"/>
</list>
```

### Map

```xml
<map>
  <entry>
    <key><value>test</value></key>
    <ref bean="testJob"/>
  </entry>
</map>

<map key-type="java.lang.Integer" value-type="java.lang.Double">
  <entry key="1" value="0.11"/>
</map>
```

### Property

```xml
<properites>
  <prop key="name">jsh<prop>
</properties>
```

### Set

```xml
<set value-type="java.lang.Integer">
  <value>1</value>
</set>
```

### 네임스페이스 활용
- p:속성명, p:속성명-ref

### Factory

```xml
<bean id="exampleBean" class="examples.ExampleBean2" factory-method="createInstance"/>

<bean id="myFactoryBean" class="..."/>
<bean id="exampleBean" factory-bean="myFactoryBean" factory-method="createInstance"/>
```

### AutoWire

```xml
<bean id="job" class="test.testJob" autowire="byName"/>
```

- byName, byType, constructor, autodetect = conectructor + byType

## Spring annotation 기반 설정

### @Required
- 필수 속성 지정
- RequiredAnnotationBeanPostProcessor 등록 또는 `<context:annotation-config/>`

### @Autowired
- AutowiredAnnotationBeanPostProcessor 등록 또는 `<context:annotation-config/>`
- 멤버필드나 메서드에 선언
- @Autowired(required=false)

```java
@Autowired
@Qualifier("main")
```

빈객체의 수식어는 `<qualifer>`태그를 이용해 지정.

```xml
<bean>
   <qualifier value="main'/>
</bean>
```

```java
@Autowired
publid void init(@Qulifier("testJob") Job job, Task task)
```

### @Resource
- @Resource(name="beanId")
- 메서드나 멤버객체에 다사용
- CommonAnnotationBeanPostProcessor 혹은 `<context:annotation-config/>`

### @PostConstruct @PreDestroy
- CommonAnnotationBeanPostProcessor 혹은 `<context:annotation-config/>`

### @Component

```xml
<context:component-scan
    base-package="com.nhncorp.smon.filemgr.action">
   <context:include-filter type="regex" expression=".*TestJob"/>
   <context:exclude-filter type="aspectj" expression="..*Task"/>
<context:component-scan>
```

- @Autowired나 @Required도 함께 사용가능

```java
@Component("testJob")
@Scope("prototype")
@Component
```

- filter의 type은 annotation, assignable, regex, asjpectj

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 xmlns:context="http://www.springframework.org/schema/context"
 xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
  http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">
```

## Spring context event
- `void publishEvent(ApplicationEvent event)`
- ApplicationListener
  - .onApplicationEvent
- ApplicationEvent
  - ContextRefreshEvent
  - ContextCloseEvent
  - ContextStartedEvent
  - ContextStoppedEvent

## Spring customEditor
- CustomEditorConfigurer
- java.beans.PropetyEditorSupport

```xml
<bean id="customEditorConfigurer" class="org.springframework.beans.factory.config.CustomEditorConfigurer">
  <property name="customEditors">
    <map>
      <entry key="int[]">
        <bean class="org.springframework.batch.support.IntArrayPropertyEditor" />
      </entry>
      <entry key="org.springframework.batch.item.file.transform.Range[]">
        <bean class="org.springframework.batch.item.file.transform.RangeArrayPropertyEditor" />
      </entry>
      <entry key="java.util.Date">
        <bean class="org.springframework.beans.propertyeditors.CustomDateEditor">
          <constructor-arg>
            <bean class="java.text.SimpleDateFormat">
              <constructor-arg value="yyyyMMdd" />
            </bean>
          </constructor-arg>
          <constructor-arg value="false" />
        </bean>
      </entry>
    </map>
  </property>
</bean>
```

## Spring message
- context.getMessage
- MessageSource
- ResourceBundleMessageSource
  - .setBasenames : 파일명 지정

```xml
<bean id="messageSource" class="org.springframework.context.support.ResourceBundleMessageSource">
  <property name="basename" value="message.error"/>
</bean>
```

- message.properties
- message_en.properties
- message_ko.properties

### Bean객체에서 사용하기
- MessageSourceAware
- MessageSourceAccessor
  - messageSource 속성지정
  - MessageSourceAccessor.getMessage

## Related
- [[dependency-injection]]
- [[spring]]
- [[spring-aop]]
- [[java-annotation]]
- [[spring-properties]]
