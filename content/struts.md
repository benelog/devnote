- Struts Tip 모음 : <http://cafe.naver.com/javalove.cafe?iframe_url=/ArticleRead.nhn%3Farticleid=730>
- [Struts 1.3.5에서의 DispatchAction과 그의 형제들](http://blog.naver.com/phrack/80034462067)
- [\[XSS 취약점 보완\] Cross Site Scripting 방지 기법 - Struts ResponseUtils](http://blog.naver.com/phrack/80053722954)
- [\[Struts Taglib\] Weblogic 8.1에서 Error in using tag library uri='/tags/struts-html' prefix='html'](http://blog.naver.com/phrack/80054393082)

## RequestProcessor

한글처리 방법은 많겠지만.. kkang 이 권장하는 방식은 필터 기능을 이용하는것..

Struts 에서 제공해주는 RequestProcessor 라는 클래스가 실제 Controller 역활도 하지만 모델이 실행되기전의 Filter 기능도 한다고 볼수 있다.

RequestProcessor 클래스의 여러 메서드중 processPreprocess 메서드가 이런 필터 기능을 구현하기 가장 적당하다.

다른 processXXX 류의 메서드 호출 전에 호출이 된다..

결국.. RequestProcessor 클래스를 확장해서 processPreprocess 메서드를 구현하면 된다..

```java
package controler;

import org.apache.struts.action.RequestProcessor;
import javax.servlet.http.*;

public class MyRequestProcessor extends RequestProcessor {

    protected boolean processPreprocess(HttpServletRequest request,HttpServletResponse response){
        try {
        request.setCharacterEncoding("euc-kr");
        }catch(Exception e){
        }
        return true;
    }
}
```

struts-config.xml 에도 등록해야 하는데.. 아래처럼..

```xml
....
  </action-mappings>

  <controller processorClass="controler.MyRequestProcessor"/>

  <message-resources parameter="resources.MessageResources" />
```

## Struts file upload

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

## Tiles

### 비교

- <http://tiles.apache.org/framework/tutorial/pattern.html>

```xml
<definition name="MPSearchItemList" extends="main">
  <put name="body" value="/jsp/adm/mpm/search/AMADMPSearchItemList.jsp"/>
</definition>

<definition name="MPOrgSearchDeptListTile" path="/jsp/adm/mpm/search/AMADMPSearchDeptList.jsp">
  <put name="title" value="실시간모니터링 조회"/>
  <put name="actionURL" value="/MPOrgSearchDeptAction.do"/>
  <put name="formYear" value="/jsp/adm/mpm/ADMPOrgFormYearForList.jsp"/>
</definition>
```

```jsp
<bean:write name='item_count' />

<tiles:insert attribute="formYear"/>
```

- <http://java-ua.blogspot.com/2009/01/spring-mvc-freemarker-tiles-2.html>
- <http://tiles.apache.org/framework/tutorial/integration/freemarker.html>
- <http://tiles.apache.org/framework/tutorial/integration/velocity.html>

## Related
- [[struts2]]
- [[java-web-framework]]
- [[mvc]]
- [[jsp]]
- [[servlet]]
