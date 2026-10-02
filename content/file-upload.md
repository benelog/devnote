## Struts

2. Struts에서 file UpLoad구현

Struts 에서 간단히 FileUpload 를 구현할수 있다.

물론 이용되는 라이브러리는 apache 의 Common 라이브러리이다.

우선 브라우저에서 보게될 화면을 아래처럼 구성한다.

```jsp
<%@page contentType="text/html"%>
<%@taglib uri="/WEB-INF/struts-bean.tld" prefix="bean"%>
<%@taglib uri="/WEB-INF/struts-html.tld" prefix="html"%>
<%@taglib uri="/WEB-INF/struts-logic.tld" prefix="logic"%>
<html>
<head><title>Login</title>
<html:base/>
</head>
<body>
<html:form action="/upload_ok.do" enctype="multipart/form-data">
<TABLE>
<TBODY>
<TR>
        <TH>title</TH> <TD><html:text property="title" /></TD>
</TR>
<TR>
        <TD colspan=2><html:file property="fileList[0]"  /></TD>
</TR>
<TR>
        <TD colspan=2><html:file property="fileList[1]"  /></TD>
</TR>
<TR>
        <TD colspan=2><html:file property="fileList[2]"  /></TD>
</TR>
<TR>
        <TD colspan=2><html:submit/></TD>
</TR>
</TBODY>
</TABLE>
</html:form>
</body>
</html>
```

여기에서 property 의 값은 마치 배열처럼 몇개라도 가능하다..

그 다음은 데이터를 받게되는 ActionForm 은 아래처럼 구현한다..

```java
package form;

import org.apache.struts.action.*;
import org.apache.struts.upload.FormFile;

/**
 * @author Administrator
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class UploadActionForm extends ActionForm {

    /**
     *
     */
    private FormFile[] fileList = new FormFile[10];
    private String title;

    public UploadActionForm() {
        super();
        // TODO Auto-generated constructor stub
    }

    /**
     * @return Returns the fileList.
     */
    public FormFile[] getFileList() {
        return fileList;
    }

    /**
     * @param fileList The fileList to set.
     */
    public void setFileList(FormFile[] fileList) {
        this.fileList = fileList;
    }

    /**
     * @return Returns the title.
     */
    public String getTitle() {
        return title;
    }

    /**
     * @param title The title to set.
     */
    public void setTitle(String title) {
        this.title = title;
    }
}
```

결국 struts 에서 제공되는 FormFile 클래스를 이용하는것이다. 어떤 파일도 이 타입으로 표현이 가능하기때문에 쉽게 핸들링 할수 있다.

Form 에 등록된 업로드 파일의 내용을 실제 파일로 만들어주는 기능이 필요한데 그를 위해 아래처럼 util 류의 클래스를 하나 만든다.

```java
/*
 * Created on 2006. 5. 20.
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package util;

import org.apache.struts.upload.*;
import java.io.*;

/**
 * @author Administrator
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class UploadUtil {

    /**
     *
     */
    public UploadUtil() {
        super();
        // TODO Auto-generated constructor stub
    }

    public static void doFileUpload(FormFile formFile, String path) throws FileNotFoundException, IOException {
        InputStream stream = formFile.getInputStream();
        String fileName = formFile.getFileName();
        OutputStream bos = new FileOutputStream(path+fileName);
        System.out.println("dddddddd"+path+fileName);
        int bytesRead = 0;
        byte[] buffer = new byte[8192];
        while ((bytesRead = stream.read(buffer, 0, 8192)) != -1) {
            System.out.println("333333333333");
            bos.write(buffer, 0, bytesRead);
        }
        bos.close();
        stream.close();
    }
}
```

그런 다음 Action 클래스에서 아래처럼 해주면 된다..

```java
public class UploadAction extends Action {

    /**
     *
     */
    public UploadAction() {
        super();
        // TODO Auto-generated constructor stub
    }

    public ActionForward execute(ActionMapping mapping, ActionForm form,
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        UploadActionForm boardForm = (UploadActionForm) form;
        String uploadPath = "D:\\workspace\\eclipse\\struts\\uplaod\\";
        try {
            for (int i = 0; i < boardForm.getFileList().length; i++) {
                FormFile f = boardForm.getFileList()[i];
                if (f == null || f.equals(""))
                    continue;
                String fileName = f.getFileName();
                if (fileName == null || fileName.equals(""))
                    continue;
                UploadUtil.doFileUpload(f, uploadPath);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return mapping.findForward("success");
    }
}
```

## Spring MVC

### Spring MVC 2.5을 활용한 파일업로드
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

#### Spring MVC 2.5 관련 자료
- <http://www.infoq.com/articles/spring-2.5-ii-spring-mvc>

### 간단하게 서버에 파일을 올리기 + MockMultipartFile을 이용한 테스트
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

## 테스트

### 파일 업로드를 하는 Servlet을 MockHttpServletRequest로 테스트하기
파일 update를 처리하는 Servlet도 Spring의 MockHttpSerlvetRequest와 MockHttpServletResponse로 테스트 할 수 있습니다.

다음 링크에 있는 소스를 참고했습니다.

request의 content 속성에 파일내용 등을 포함시켜 주면 됩니다.

아래 예제에서 Assert부분은 화면에 출력되는 문자열을 검사하는 방식인데, 테스트 하고자하는 목적에 따라 파일업로드가 되었을 때의 특정 위치에 파일이 생성된 것을 확인한다거나, 그 뒤에 호출되는 클래스를 행위검증하는 방식등을 다양하게 응용하실 수 있을 것입니다.

```java
public class UploadServletTest {
    UploadServlet servlet = new UploadServlet() ;
    MockHttpServletRequest request = new MockHttpServletRequest();
    MockHttpServletResponse response = new MockHttpServletResponse();
    private static final String ENDLINE = "\r\n";
    private static final String BOUNDARY = "qWeRtY";

    @Test
    public void testUploadNormalFile() throws Exception {
        // given
        String fileContent = "for upload test";
        String fileName = "message.txt";
        String reqContent = createContentWithFile(fileName, fileContent);
        request.setContent(reqContent.getBytes());
        request.setContentType("multipart/form-data; boundary=" + BOUNDARY);
        request.setMethod("POST");

        // when
        servlet.service(request, response);

        // then
        String output = response.getContentAsString();
        assertTrue("정상적으로 업로드 되었을 때에는", output.contains("File size"));
    }

    @Test
    public void testUploadEmptyFile() throws Exception {
        // given
        String fileContent = "";
        String fileName = "message.txt";
        String reqContent = createContentWithFile(fileName, fileContent);
        request.setContentType("multipart/form-data; boundary=" + BOUNDARY);
        request.setMethod("POST");
        request.setContent(reqContent.getBytes());

        // when
        servlet.service(request, response);

        // /then
        String output = response.getContentAsString();
        assertThat("빈 파일이 올라갔을 때에는", output, is("No binary data contains"));
    }

    private String createContentWithFile(String fileName, String fileContent) {
        StringBuilder reqContent = new StringBuilder();
        reqContent.append("--" + BOUNDARY + ENDLINE);
        reqContent.append("Content-Disposition: form-data; name=\"myfile\";"
                + " filename=\"" + fileName + "\"" + ENDLINE);
        reqContent.append(ENDLINE);
        reqContent.append(fileContent);
        reqContent.append(ENDLINE);
        reqContent.append("--" + BOUNDARY + "--" + ENDLINE);
        return reqContent.toString();
    }
}
```

참고로 Spring에서는 MockMultipartHttpServletRequest와 MockMultipartFile 같은, 첨부파일에 특화된 테스트 전용 클래스를 제공하기는 하지만, Spring MVC를 사용하지 않는 그냥 Servlet에서는 위의 방식처럼 MockHttpServletRequest을 사용해야 합니다.

## Related
- [[struts]]
- [[spring-mvc]]
- [[spring-test]]
- [[servlet]]
- [[web-xml]]
- [[mock]]
