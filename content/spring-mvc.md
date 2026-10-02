- <http://blog.springsource.org/2012/08/29/integrating-spring-mvc-with-jquery-for-validation-rules/>
- <http://java.dzone.com/articles/using-restful-urls-your-spring>
- [How-To: JSR303 validation groups in Spring MVC 3 wizard-style controllers](http://blog.codeleak.pl/2011/03/how-to-jsr303-validation-groups-in.html)
- [Spring MVC 기초](http://javacan.tistory.com/entry/130)
- [Spring MVC에서 클라이언트 요청의 처리 과정](http://blog.naver.com/haruma95/80048524870)

## Mapping 설정
- HandlerMapping
  - .setOrder
- SimpleUrlHandlerMapping

```xml
<bean id="handlerMapping" class="org.springframework.web.servlet.handler.SimpleUrlHandlerMapping">
  <property name="mappings">
    <props>
      <prop key="...do">contentConroller</prop>
    </props>
  </property>
</bean>
```

- BeanNameUrlHandlerMapping
  - .setMappings
  - PropertiesFactoryBean을 이용하면 별도의 파일에서 설정 가능
- @RequestMapping
  - import org.springframework.web.bind.annotation.RequestMapping

## View
- ViewResolver
- InternalResourceViewResolver
  - .setViewClass, .setCache, .setPrefix, .setSuffix

## Controller
- MultiActionController
  - .setMethodNameResolver
- AbstractCommandController
  - .setCommandClass
- SimpleFormConroller
  - .setCommandName, .setCommandClass, .formBackingObject, .onSubmit, .showForm, .initBinder, .referenceData
- @Controller
  - import org.springframework.stereotype.Controller

## MethodNameResolver
- PropertiesMethodNameResolver
  - .setMappings
- ParameterMethodNameResolver
  - .setParamName, .setDefaultMethodName

## Model
- @ModelAttriutes

## Binder
- @InitBinder
- WebDataBinder
- ServletRequestDataBinder

## MultipartResolver
- ComonsMultipartResolver
  - .setMaxUploadSize, .setUploadTempDir

파일첨부 처리 방법

1. Request를 MultipartHttpServletRequest로 casting
2. PropertyEditorSupport를 상속, setValue에서 value instaceof MultipartFile 이면 FileUploadUtil.uploadFormFile사용.

## 커스텀 태그
- spring:bind

## 2.5
- <http://www.infoq.com/articles/spring-2.5-ii-spring-mvc>

## 3.0
- [Spring 3.0.1 mvc:annotation-driven 이 몰래 하는 짓](http://toby.epril.com/?p=989)
- <http://toby.epril.com/?p=982> : Spring 3.0 @MVC 메소드에서 자동으로 리턴 모델에 추가되는 것들
- [DispatcherServlet의 디폴트 대체(fallback) 전략](http://toby.epril.com/?p=980)
- [InsideSpring (3) 스프링 밖에서 WebApplicationContext에 접근하기](http://toby.epril.com/?p=934)

## Validation
- <http://blog.inflinx.com/2010/03/10/jsr-303-bean-validation-using-spring-3/>

## Converter
- [Spring 3 MVC HttpMessageConverter 기능으로 RESTful 웹 서비스 빌드](http://www.ibm.com/developerworks/kr/library/wa-restful/index.html)

## Spring web.xml

### Listener 설정

```xml
<context-param>
  <param-name>contextConfigLocation</param-name>
  <param-value>classpath:applicationContext.xml</param-value>
</context-param>

<listener>
  <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
</listener>
```

```java
WebApplicationContextUtils.getWebApplicationContext(getServlerContext());
```

### DispatcherServlet 설정
web.xml에 설정

```xml
<servlet>
    <servlet-name>dispatcher</servlet-name>
    <servlet-class>
        org.springframework.web.servlet.DispatcherServlet
    </servlet-class>
    <init-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>classpath:applicationContext.xml</param-value>
    </init-param>
</servlet>
<servlet-mapping>
    <servlet-name>dispatcher</servlet-name>
    <url-pattern>*.do</url-pattern>
</servlet-mapping>
```

## Related
- [[api-design]]
- [[mvc]]
- [[rest]]
- [[servlet]]
- [[spring-test]]
- [[java-encoding]]
- [[spring-resource-handling]]
- [[file-upload]]
