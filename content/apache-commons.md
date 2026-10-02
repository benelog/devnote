## Commons Lang
- [Jakarta Commons Lang 라이브러리로 toString() 메소드 구현하기](http://decoder.tistory.com/44)

```java
String date = DateFormatUtils.format(new Date(), "yyyy-MM-dd");
```

## Commons IO
- <http://commons.apache.org/io/apidocs/overview-tree.html>

```text
org.apache.commons.io.FilenameUtils
org.apache.commons.io.FileUtils
org.apache.commons.io.IOUtils
```

## CommonsBeanUtils
```java
import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.Map;
import org.apache.commons.beanutils.BeanUtils;

public class BeanUtilsExample {

    public static void main(String[] args) throws IllegalAccessException, InvocationTargetException, NoSuchMethodException{
        Map<String,String> bookMap = new HashMap<String,String>();
        bookMap.put("author", "jsh");
        bookMap.put("title", "Effective java");
        bookMap.put("price", "123");
        bookMap.put("bookmarks", "123");
        Book book = new Book();
        BeanUtils.copyProperties(book,bookMap);
        System.out.println(bookMap);
        System.out.println(book);
    }
}
```

```java
package xmltest;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

public class Book {
    private String author;
    private String title; public Book() {}
    private int price;
    private int[] bookmarks;

    public int[] getBookmarks() {
        return bookmarks;
    }
    public void setBookmarks(int[] bookmarks) {
        this.bookmarks = bookmarks;
    }
    public int getPrice() {
        return price;
    }
    public void setPrice(int price) {
        this.price = price;
    }
    public void setAuthor( String rhs ) { author = rhs; }
    public void setTitle( String rhs ) { title = rhs; }

    public String getAuthor() {
        return author;
    }
    public String getTitle() {
        return title;
    }
    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.MULTI_LINE_STYLE);
    }
}
```

## Http components
- <http://tech-tip.blogspot.com/2008/10/jakarta-commons-httpcomponents.html>

## apache commons collections
```java
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import junit.framework.TestCase;

import org.apache.commons.collections.CollectionUtils;

public class MapSubstractTest extends TestCase{

    public void testSubstract(){
        Map<String,String> source = new HashMap<String,String>();
        source.put("소주","삼겹살");
        source.put("양주","과일");
        source.put("맥주","감자튀김");
        source.put("고량주","물초면");
        Map<String,String> blackList = new HashMap<String,String>();
        blackList.put("고량주","물초면");
        Collection<Map.Entry> filetered = CollectionUtils.subtract(source.entrySet(),blackList.entrySet());
        System.out.println(filetered);
    }
}
```

## DbUtils

- [Commons-DbUtils](http://blog.naver.com/levin01/100011050694)
- [dbutils 활용방법](http://blog.naver.com/webman/30000419500)
- <http://commons.apache.org/dbutils/apidocs/index.html>

### apache commons DbUtils 활용하기

개발을 하다보면 간단한 화면 1~2개만 독립적으로 돌아가는 웹어플리케이션을 만들 때도 있습니다. 예를 들면 로그조회 프로그램 같은 것들이죠.

그런 곳에는 Hibernate나 iBatis를 쓰기에는 너무 거창하다는 느낌이 들기도 합니다. 그렇다고 JDBC로 날코딩하기는 성가실때, 이럴 때는 [apache commons DbUtils](http://commons.apache.org/dbutils/)를 써볼만 합니다.

- 다운로드 : <http://commons.apache.org/downloads/download_dbutils.cgi>
- API 문서 : <http://commons.apache.org/dbutils/apidocs/index.html>

JDBC에서 Connection, Statement,ResultSet의 close 글에 나온 것처럼 Connection을 닫는 번거로운 처리가 `DbUtils.closeQuietly(con);`로 끝나는 것만 해도 상당히 편합니다.

아래 예제는 DBUtils + JSTL로 간단한 조회화면을 만들어 본 것입니다.

```jsp
<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%@ page import = "java.sql.*" %>
<%@ page import = "java.util.Properties" %>
<%@ page import = "org.apache.commons.dbutils.DbUtils" %>
<%@ page import = "org.apache.commons.dbutils.QueryRunner" %>
<%@ page import = " org.apache.commons.dbutils.handlers.MapListHandler" %>
<%@ taglib prefix="c" uri="" %>
<%!
  private static final String SELECT_STMT =
                  "SELECT id, name, email, cell_phone_number FROM quiz_user";
%>
<%
 String url = "jdbc:hsqldb:hsql://localhost/sampledb";
 Properties prop = new Properties();
 prop.put("user","sa");
 prop.put("password","");
 Connection con =  null;
 try{
  Class.forName ("org.hsqldb.jdbcDriver");
  con = DriverManager.getConnection(url,prop);
        QueryRunner runner = new QueryRunner();
        Object resultList = runner.query(con,SELECT_STMT, new MapListHandler());
        request.setAttribute("list",resultList);
   } catch (SQLException ex) {

      throw new RuntimeException(ex);
   } finally {
     DbUtils.closeQuietly(con);
   }
 %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>사용자</title>
</head>
<body>
  <h1>사용자  조회</h1>
  <h2>사용자  목록</h2>
  <table>
   <tr>
    <th>id</th><th>이름</th><th>전화번호</th> <th>이메일</th>
 </tr>
    <c:forEach var="item" items="${list}" varStatus="status">
 <tr>
  <td>${item.id}</td>
  <td>${item.name}</td>
  <td>${item.cell_phone_number}</td>
  <td>${item.email}</td>
 </tr>
 </c:forEach>
  </table>
</body>
</html>
```

몇 년전에 DbUtils와 비슷한 클래스를 만든 적이 있었는데, 그때도 좀 찾아볼 걸 그랬나봅니다. 그러고 보면 저도 apache commons에 이미 있는 것을 많이도 만들어본 삽질의 시간들을 겪었었습니다. 신입 때 [commons beanutils](http://commons.apache.org/beanutils/)하고 [commons io](http://commons.apache.org/io/)에 포함된 것 비슷한 유틸리티 만들어 놓고 혼자서 뿌듯해 했었죠 -_-;

## Children

- [[beanutils]]

## Related
- [[beanutils]]
- [[guava]]
- [[java-io]]
- [[http-client]]
- [[java-string]]
- [[jdbc]]
