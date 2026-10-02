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

## Spring MVC 2.5을 활용한 파일업로드
간단한 파일 업로드 기능을 만들어야 할 일이 생겨서, Spring 2.5의 annotation을 이용한 Action에서 이를 처리하게 했습니다. 실무에서 썼던 것을 더 단순한 예제로 재구성해서 정리해봅니다.

Maven의 pom.xml에 파일업로드 기능에서 참조하는 commons-fileupload 라이브러리에 대한 dependency를 추가합니다.

```xml
<dependency>
   <groupId>commons-fileupload</groupId>
   <artifactId>commons-fileupload</artifactId>
   <version>1.2.1</version>
</dependency>
```

web.xml에는 applicationContext 파일의 위치를 지정하고, *.do를 스프링에서 처리하도록 설정합니다.

```xml
<servlet>
  <servlet-name>dispatcher</servlet-name>
  <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
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

업로드 기능을 간단히 테스트할 수 있는 jsp페이지를 만들어봅니다. 단순히 파일 1개를 "file"이라는 변수명으로 업로드 요청을 하는 페이지입니다.

```jsp
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>업로드 테스트</title>
</head>
<body>
<form action="/study/upload.do" method="post" enctype="multipart/form-data">
<p>
    <label for="file">파일1 </label>
    <input type="file" name="file">
</p>
<p>
    <input type="submit" value="전송"/>
</p>
</form>
</body>
</html>
```

그리고 applicationContext파일을 아래와 같이 선언합니다. DefaultAnnotationHandlerMapping을 이용해서 annotation을 이용한 Controller 설정을 가능하게 합니다. `<context:component-scan/>` 태그를 사용해서, 설정을 scan할 패키지를 지정합니다. 그리고, 파일이 저장될 디렉토리는 `${repository.path}` 속성으로 표시했습니다. Maven의 resource filter기능을 이용해서 실행환경에 따라 다른 값을 넣게 하면 편리합니다.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:context="http://www.springframework.org/schema/context"
    xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">
    <bean class="org.springframework.web.servlet.mvc.annotation.DefaultAnnotationHandlerMapping">
        <property name="alwaysUseFullPath" value="true"/>
    </bean>
    <bean id="multipartResolver"
        class="org.springframework.web.multipart.commons.CommonsMultipartResolver"/>
    <bean id="respository" class="study.repository.FileRepository">
        <constructor-arg value="${repository.path}" />
    </bean>
    <context:component-scan base-package="study.action"/>
</beans>
```

실제적인 파일의 저장기능을 담당하는 클래스인 FileRepository에서는 간단하게 UIDD를 이용해서 키를 생성하고 path필드로 지정된 디렉토리에 저장을 해줍니다.

```java
package study.repository;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

public class FileRepository {
    private String path;

    public FileRepository(String path) {
        this.path = path;
        File saveFolder = new File(path);
        if(!saveFolder.exists() || saveFolder.isFile()){
            saveFolder.mkdirs();
        }
    }

    public String saveFile(MultipartFile sourcefile) throws IOException{
        if ((sourcefile==null)||(sourcefile.isEmpty())) return null;
        String key = UUID.randomUUID().toString();
        String targetFilePath = path+"/"+ key;
        sourcefile.transferTo(new File(targetFilePath));
        return key;
    }
}
```

추가적으로 키값을 넣어주면 파일을 반환해주는 메소드나, 파일의 종류나 날짜에 따라서 하위 디렉토리를 구분해서 생성하는 기능도 넣을 수 있을 것입니다. 그리고 더 확장한다면, 따로 주요 메서드를 선언한 Repository 라는 인터페이스를 정의하고, DB를 저장소로 활용하는 DbRepository 와 같이 이름 붙인 구현 클래스도 만들어 볼 수 있겠습니다.

그리고 @Controller , @RequestMapping, @RequestParam, @Autowired의 Anntation을 활용해서 Controller 클래스를 작성합니다. 업로드 후 화면에 키값만 뿌도록 해서 java.io.Writer클래스를 화면 출력을 위해 사용했습니다.

```java
package study.action;

import java.io.IOException;
import java.io.Writer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import study.repository.FileRepository;

@Controller
public class FileAction {
    private FileRepository respository;

    @Autowired
    public void setRespository(FileRepository respository) {
        this.respository = respository;
    }

    @RequestMapping("/upload.do")
    public void execute(@RequestParam("file") MultipartFile file,
            Writer out) throws IOException{
        String key = respository.saveFile(file);
        out.write(key);
    }
}
```

import 절을 빼면, 정말 몇줄 안됩니다. Struts, Webwork등 다른 MVC프레임웍의 Action단보다 더 유연하고, 생산성도 높아 보입니다. POJO 클래스이니 테스트코드 작성도 더 쉬워보입니다. MultipartFile 클래스는 MockMultiPartFile를 이용해서 테스트하면 됩니다. 최근 로드존슨이 인터뷰에서 한 말에 따르면 기존 Spring MVC의 Controller interface는 삭제될 것이라고 하네요.

### Spring MVC 2.5 관련 자료
- <http://www.infoq.com/articles/spring-2.5-ii-spring-mvc>

## 간단하게 서버에 파일을 올리기 + MockMultipartFile을 이용한 테스트
서버에 1,2개 파일만을 올려야할 때는 FTP를 따로 설치하는 일이 번거롭다고 느껴집니다. 그럴 때 간단하게 다운받아서 실행할 수 있는 웹어플리케이션을 만들어봤습니다.

jar파일 하나만 다운로드 받아서 바로 실행시키면 됩니다.

1. 다운로드

   ```sh
   wget benelog.net/uploader.jar
   ```

2. 실행

   ```sh
   java -jar uploader.jar (디폴트로 8080포트)
   java -jar uploader.jar --httpPort=2010 (포트지정)
   ```

3. 서버를 브라우저로 접속해서 파일을 올리기
   - 예) <http://localhost:8080/>

따로 Tomcat과 같은 WAS를 설치할 필요가 없도록 경량WAS인 Winstone(<http://winstone.sourceforge.net/>) 과 함께 패키징했습니다.

소스코드는 github에 올려놨습니다. ( <https://github.com/benelog/uploader/> )

특별한 코드는 없지만, 아래 클래스에서 MockMultipartFile를 이용해서 파일업로드에 대한 테스트코드를 만들면서 나름 재미있었습니다.

## Related
- [[api-design]]
- [[mvc]]
- [[rest]]
- [[servlet]]
- [[spring-test]]
- [[java-encoding]]
- [[spring-resource-handling]]
