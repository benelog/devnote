[Java 한글 FAQ](http://blog.naver.com/dusttin/7928977)

[\[자바](http://blog.openframework.or.kr/97) 인코딩\]

[자바에서 한글 처리 문제 - 아직도냐…​](http://corund.egloos.com/2192664)

[Java 언어를 이용한 유니코드 서로게이트
프로그래밍](http://www.ibm.com/developerworks/kr/library/j-unicode/index.html)

## encoding 확인

    System.out.println("user.language:" + System.getProperty("user.language"));
    System.out.println("user.region:" +  System.getProperty("user.region"));
    System.out.println("file.encoding:" + System.getProperty("file.encoding"));

     Locale loc = Locale.getDefault();
     System.out.println("loc:" + loc);
     System.out.println("DisplayLanguage:" + loc.getDisplayLanguage());
     System.out.println("DisplayCountry:" + loc.getDisplayCountry());
     System.out.println(loc.getDisplayLanguage(Locale.US));
     System.out.println(loc.getDisplayCountry(Locale.US));
    String enc = new java.io.OutputStreamWriter(System.out).getEncoding();
    System.out.println("default encoding = " + enc);

## 잘못된 Encoding 테스트

    Charset utf8 = Charset.forName("UTF-8");

    @Test
    public void testWrongEncoding(){
     byte[] wrongInput = new byte[]{(byte) 0xF0,(byte) 0xA0,(byte) 0xAE,(byte) 0xB7,(byte) 0xE9,(byte) 0x87};
     String wrongText = new String(wrongInput, utf8);
     System.out.println(wrongText);
     byte[] bytesConvertedgain = wrongText.getBytes(utf8);
     assertArrayEquals(wrongInput, bytesConvertedgain);
    }

    @Test
    public void testRightEncoding(){
     byte[] input = new byte[]{(byte) 0xEC,(byte) 0xA0,(byte) 0x95,(byte) 0xEA,(byte) 0xB8,(byte) 0xB0
       ,(byte) 0xec, (byte) 0x88, (byte) 0x99};
     String text = new String(input, utf8);
     System.out.println(text);
     byte[] bytesConvertedgain = text.getBytes(utf8);
     assertArrayEquals(input, bytesConvertedgain);
    }

    @Test
    public void getBytesFromString(){
     String rightString = "정유현";
     byte[] rightInput = rightString.getBytes(utf8);
     for(byte each : rightInput){
      String hexCode = String.format("%h", each);
      System.out.println(hexCode);
     }
    }

재현

org.springframework.jdbc.UncategorizedSQLException: SqlMapClient
operation; uncategorized SQLException for SQL \[\]; SQL state \[HY000\];
error code \[1366\];

…​생략

--- Check the statement (update failed). --- Cause:
java.sql.SQLException: Incorrect string value:
'\xF0\xA0\xAE\xB7\xE9\x87…​' for column 'content' at row 1; nested
exception is com.ibatis.common.jdbc.exception.NestedSQLException:

Byte배열로 문제의 값을 직접 만들어서 넣어보면 같은 에러를 재현할 수
있습니다.

즉 잘못 들어온 값이 xF0\xA0\xAE\xB7\xE9\x87 이였으므로 이를 byte배열로
아래와 같이 선언해서 DB에 오면 같은 Exception과 에러코드를 확인할 수
있습니다.

Charset utf8 = Charset.forName("UTF-8"); byte\[\] input = new
byte\[\]{(byte)0xF0, (byte)0xA0, (byte)0xAE, (byte)0xB7, (byte)0xE9,
(byte)0x87}; String content = new String(input, utf8);

try { feedbackDAO.insertEncodeTest(content); } catch
(DataAccessException de) { SQLException se =
(SQLException)de.getCause(); System.out.println("errorCode" +
se.getErrorCode()); }

Production 코드 안에서 Exception 에러처리를 어떻게 하느냐는 다양한
전략이 가능합니다.

기존에 UncategorizedSQLException이 뜨고 있으므로 나름대로 해당
에러코드일 때 새로운 DataAccessException의 하위 클래스를 생성하도록
SQLErrorCodeSQLExceptionTranslator를 상속해서 정의하거나, classpath
root에 sql-error-codes.xm파일을 재정의해서 Sql 에러코드에 대응되는
Exception을 정의할 수도 있습니다.

## 한글 코드 문제와 해결방법

```jsp
<%@ page contentType="text/html; charset=EUC_KR" %>

<%@ page contentType="text/html; charset=EUC_KR" %> ...

<% String userId = new String(request.getParameter("id").getBytes("Cp1252"), "EUC_KR");

...
```

JSP에서 Beans 사용하기 `<jsp:setProperty>`

JSP 문서

```jsp
<jsp:useBean scope="page"/>

<jsp:setProperty name="user" property="*"/>

<% user.toKorean(); %>
```

User Bean (User.java)

```java
import java.io.*;
import CharacterSet;

public class User {
    private String id;
    private String password;

    public void setId(String str) { id = str; }
    public void setPassword(String str) { password = str; }
    public String getId() { return id; }
    public String getPassword() { return password; }

    public void toKorean() {
        id = CharacterSet.toKorean(id);
    }
}
```

CharacterSet 클래스 (CharacterSet.java)

```java
import java.lang.*;
import java.io.*;

public class CharacterSet {
    public static String toKorean(String str) {
        try {
            return new String(str.getBytes("Cp1252"), "EUC_KR");
        } catch (UnsupportedEncodingException e) {
            return null;
        }
    }
}
```

### Web.xml

```xml
<filter>
<filter-name>Set Character Encoding</filter-name>
<filter-class>filters.SetCharacterEncodingFilter</filter-class>
<init-param>
<param-name>encoding</param-name>
<param-value>euc-kr</param-value>
</init-param>
</filter>
<filter-mapping>
<filter-name>Set Character Encoding</filter-name>
<url-pattern>/*</url-pattern>
</filter-mapping>
```

### Server.xml

### 설정파일

`/usr/local/share/jakarta-tomcat-5.0.19/conf/web.xml` charset추가

```xml
<mime-mapping>
<extension>htm</extension>
<mime-type>text/html;charset=euc-kr</mime-type>
</mime-mapping>
<mime-mapping>
<extension>html</extension>
<mime-type>text/html;charset=euc-kr</mime-type>
</mime-mapping>
```

`/usr/local/apache/conf/httpd.conf` 아래 두줄 추가

```apache
AddCharSet EUC-KR .euc-kr
AddDefaultCharSet EUC-KR
```

- <http://blog.naver.com/syberhiphop/10031746625>

## Related
- [[encoding]]
- [[tomcat]]
