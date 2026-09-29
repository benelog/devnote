참조하는 jar파일 확인

    pmap [pid] | grep jar

혹은 cat /proc/\<pid\>/smaps

    ps axuw | grep java | grep -v grep | awk '{print $2}' | while read P; do pmap $P | grep 'spring' ; done
- Apache MaxClients와 Tomcat의 Full GC
- JDBC internal timeout의 이해
- Garbage Collection과 Statement Pool

## Statement Cache

- <https://vladmihalcea.com/how-does-the-mysql-jdbc-driver-handle-prepared-statements/>
- <https://dev.mysql.com/doc/refman/5.6/en/statement-caching.html>

## Connection pool

- [iBatis와 DBCP 바로알기](http://www.imaso.co.kr/?doc=bbs/gnuboard.php&bo_table=article&wr_id=40288)
  - iBatis는 JDBC 3.0이전에도 내부적으로 statement cache를 함. 그러나 ibatis session level의 cache이기 때문에 Driver level cache보다 효율이 떨어짐
  - evictor 스레드가 실행될 때는 timeBetweenEviction RunMillis \> 0
  - Evictor 스레드 역할http://devyongsik.tistory.com/509\[<http://devyongsik.tistory.com/509>\]
- <http://java-source.net/open-source/connection-pools>

- [c3p0 - JDBC3 Connection and Statement Pooling](http://tom.tharrisx.homedns.org/javalib/c3p0-0.8.4.5/doc/)

### 모니터링

- [jsp DBCP pool 모니터링 페이지](http://czar.tistory.com/297)

``` jsp
<%@ page language="java" contentType="text/html; charset=EUC-KR" %>
<%@ page import="
    java.util.*,
    javax.naming.*,
    javax.sql.*,
    org.apache.commons.beanutils.*,
    org.apache.commons.dbcp.*"
%>
<%
 Context initContext = new InitialContext();
 DataSource ds   = (DataSource)initContext.lookup("jdbc/Sims");
 BasicDataSource bds = (BasicDataSource)ds;

 try {
    Map<Object,Object> desc = BeanUtils.describe(bds);
%>
<%=desc%>
<%
 } catch(Exception e) {
  out.println(e.toString());
 }
%>
```

### DBCP

Race condition error : <https://issues.apache.org/jira/browse/DBCP-270>

The pool is initialized the first time one of the following methods is
invoked:
`getConnection, setLogwriter, setLoginTimeout, getLoginTimeout, getLogWriter.`

#### testOnBorrow

- [http://geroros.hajima.net/entry/iBatis에서-커낵션-에러-날](http://geroros.hajima.net/entry/iBatis%EC%97%90%EC%84%9C-%EC%BB%A4%EB%82%B5%EC%85%98-%EC%97%90%EB%9F%AC-%EB%82%A0)-때

- [장시간 미사용된 DBCP 커넥션의 단절현상](http://blog.ajkuhn.com/33)

#### removeAbandoned

- long connection의 경우 의도하지 않은 connection close 현상 발생 가능

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr>
<td style="text-align: left;"><p>&lt;bean id="masterDs"
class="org.apache.commons.dbcp.BasicDataSource" /&gt;</p>
<p>…​</p>
<p>&lt;property name="removeAbandoned" value="true" /&gt;</p>
<p>&lt;property name="removeAbandonedTimeout" value="30" /&gt;</p>
<p>…​</p>
<p>&lt;/bean&gt;</p></td>
</tr>
</tbody>
</table>

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr>
<td style="text-align: left;"><p>if(abandonedConfig != null &amp;&amp;
abandonedConfig.getRemoveAbandoned())</p>
<p>connectionPool = new AbandonedObjectPool(null, abandonedConfig);</p>
<p>else</p>
<p>connectionPool = new GenericObjectPool();</p>
<p>…​</p>
<p>dataSource = new PoolingDataSource(connectionPool);</p></td>
</tr>
</tbody>
</table>

|                                           |
|-------------------------------------------|
| conn = (Connection)\_pool.borrowObject(); |

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<tbody>
<tr>
<td style="text-align: left;"><p>if(config != null &amp;&amp;
config.getRemoveAbandoned() &amp;&amp; getNumIdle() &lt; 2 &amp;&amp;
getNumActive() &gt; getMaxActive() - 3)</p>
<p>removeAbandoned();</p>
<p>…</p>
<p>if(pc.getLastUsed() ⇐ timeout &amp;&amp; pc.getLastUsed() &gt;
0L)</p>
<p>remove.add(pc);</p>
<p>…</p>
<p>if(config == null</p></td>
<td style="text-align: left;"></td>
<td style="text-align: left;"><p>!config.getRemoveAbandoned())</p>
<p>break MISSING_BLOCK_LABEL_54;</p>
<p>synchronized(trace)</p>
<p>{</p>
<p>boolean foundObject = trace.remove(obj);</p></td>
</tr>
</tbody>
</table>

#### 성능비교

- JDBC SQL 구문에 클라이언트 정보 남기기 : <http://kwon37xi.egloos.com/4860051>

#### JDBC API 사용법

- [서블렛 + JDBC 연동시 코딩 고려사항 -제1탄-](http://www.javaservice.net/~java/bbs/read.cgi?m=devtip&b=servlet&c=r_p&n=968185187&k=JDBC&d=tb)
- [서블렛 + JDBC 연동시 코딩 고려사항 -제2탄-](http://www.javaservice.net/~java/bbs/read.cgi?m=devtip&b=servlet&c=r_p&n=968522077)
- [서블렛 + JDBC 연동시 코딩 고려사항 4](http://www03.zdnet.co.kr/news/enterprise/0,39031021,10048177,00.htm)
- [서블렛 + JDBC 연동시 코딩 고려사항 5](http://www03.zdnet.co.kr/news/enterprise/0,39031021,10048192,00.htm)
- [서블렛 + JDBC 연동시 코딩 고려사항 6](http://www.zdnet.co.kr/builder/dev/java/0,39031622,10048223,00.htm)

Statment를 안 가지면 maximum open cursor exceed ! 에러나 Limit on number
of statements exceeded 에러 발생

- [Top Ten Oracle JDBC Tips](http://www.onjava.com/pub/a/onjava/2001/12/19/oraclejdbc.html)
- JDBC 드라이버의 4가지 타입 : <http://www.onjava.com/pub/a/onjava/excerpt/javaentnut_2/index1.html>

#### 각종 DBMS JDBC 드라이버 셋팅법 정리

- <http://blog.naver.com/jeany4u/20003041849>

#### 에러 관련

- [Oracle Protocol-violation](http://www.javaservice.net/~java/bbs/data/jdbc/1031683974+/Protocol_Violation.doc)
- [ORA-01000: maximum open cursors exceeded 조사](http://www.jakartaproject.com/board-read.do?boardId=dbtip&boardNo=116424143325438&command=READ&page=1&categoryId=-1)
- [ResultSet 의 close 메소드를 finally 에서 반드시 부르지 않아도 되는 이유](http://sayjava.egloos.com/3628406#8145310)
- [JDBC 중복할당에 의한 WAS행(Hang)현상 추적하기](http://www.javaservice.net/~java/bbs/read.cgi?m=apm&b=jscfaq&c=r_p&n=1130485838)

## Mysql

- <https://dev.mysql.com/doc/connector-j/8.0/en/connector-j-reference-configuration-properties.html>
- <https://kwonnam.pe.kr/wiki/database/mysql/jdbc>
  - MySQL에서는 `useServerPrepStmts=true` 를써야 Server side cache 활성화됨 (default false)

## Fetch size

- <http://bleujin.tistory.com/152>
- <http://dev.mysql.com/doc/refman/5.1/en/connector-j-reference-implementation-notes.html>

- [http://java.sun.com/j2se/1.5.0/docs/api/java/sql/Statement.html#setFetchSize(int)](http://java.sun.com/j2se/1.5.0/docs/api/java/sql/Statement.html#setFetchSize%28int%29)
- <http://www.databasesandlife.com/reading-row-by-row-into-java-from-mysql/>
- <http://blog.naver.com/PostView.nhn?blogId=kang594&logNo=40515882&parentCategoryNo=8&viewDate=&currentPage=1&listtype=0>
- connector 버전 5.0.2이상에서는 useCursorFetch가 먹음 : <http://wiki.gxtechnical.com/commwiki/servlet/hwiki?Client+and+server+cursors+-+using+MySQL>

### autoreconnect=true

- <http://dev.mysql.com/doc/refman/5.1/en/connector-j-usagenotes-j2ee.html>

### Mysql batchupdate

- <http://swik.net/MySQL/Mark+Matthew/A+10x+Performance+Increase+for+Batch+INSERTs+With+MySQL+Connector%2FJ+Is+On+The+Way…​./cxj7h>

## BLOB image 관련

- [JSP나 서블릿에서 이미지 출력에 관해서…​](http://javaservice.net/~java/bbs/read.cgi?m=devtip&b=servlet&c=r_p&n=1092807454&p=1&s=t)
- <http://blog.naver.com/yacjae/100020395789>

### 이미지 저장

테이블 생성

```sql
create table test(
  img blob
);
```

```java
import sun.misc.*;
import java.sql.*;
import java.io.*;

public class test
{
    public static void main(String args[])
    {
        try {

            Class.forName("oracle.jdbc.driver.OracleDriver");
            Connection con = DriverManager.getConnection("jdbc:oracle:thin:@127.0.0.1:1521:orcl", "xxx", "xxx");
            con.setAutoCommit(false);

            File file = new File("Sample.jpg");
            FileInputStream fis = new FileInputStream(file);

            PreparedStatement ps = con.prepareStatement("insert into test (img) values (?)");
            ps.setBinaryStream(1, fis, (int)file.length());
            ps.executeUpdate();

            ps.close();
            con.close();
            fis.close();

        } catch(Exception e) {
            System.out.println(e.toString());
        }

    }
}
```

### DB에서 이미지 읽어서 웹으로 보여주기 JSP

```jsp
<%@ page import="java.sql.*, java.io.*"%><%
  String driver = "com.sybase.jdbc3.jdbc.SybDriver";
  String strUrl = "jdbc:sybase:Tds:11.22.1.111:1111/Dbname";
       //                   jdbc db           local      port  sid.
    Connection conn   = null;
    Statement  stmt   = null;
    PreparedStatement pstmt = null;
    ResultSet rs;
    ByteArrayOutputStream os = null;
    byte[] result = null;

       try{
            Class.forName(driver);
        }catch(Exception exception)        {
            System.out.println(exception);
        }

        try{
         Properties p=new Properties();
       p.put("user","ebaiusr");
       p.put("password","****");
          conn = DriverManager.getConnection(strUrl,p);

          // 디비에서 읽는다.
          pstmt = conn.prepareStatement("select PIC_FILE from PIC_FILE where RCN = '780728' ");
          rs = pstmt.executeQuery();
          if(rs.next()) {
            InputStream is = rs.getBinaryStream(1);
            os = new ByteArrayOutputStream();
            int i;
            while((i = is.read()) != -1) {
                os.write(i);
            }
            result = os.toByteArray();
            is.close();
            os.close();
            }
        } catch(Exception e) {
            out.println("error sql execute");
            out.println("result = " + e.toString());
        }
        finally
        {
            try {
                if(conn != null) conn.close();
            }
            catch(Exception e) {
                out.println("error conn close");
            }
        }
response.setContentType("image/jpeg");
ServletOutputStream oout = response.getOutputStream();
oout.write(result);
oout.flush();
oout.close();
%>
```

## 기타

- [\[DB](http://blog.openframework.or.kr/10) 가벼운 SQL 인터페이스..\]
- <http://java.dzone.com/articles/lightweight-sql-interfaces-jav>

## JDBC codes

### DB메타정보 알기

```java
import java.io.*;
import java.util.*;
import java.sql.*;

public class Test2 {

  public static void main(String[] args) throws SQLException, FileNotFoundException {
  try{

   try{
    Class.forName ("oracle.jdbc.driver.OracleDriver");
    DriverManager.registerDriver(new oracle.jdbc.driver.OracleDriver());

    Connection con =  DriverManager.getConnection("");
    Statement stmt = null;

    DatabaseMetaData dbm= con.getMetaData();
    System.out.println("Product Name :"+dbm.getDatabaseProductName());
    System.out.println("Product Version :"+dbm.getDatabaseProductVersion());
    System.out.println("Driver Major Version :"+dbm.getDriverMajorVersion());
    System.out.println("Driver Minor Version :"+dbm.getDriverMinorVersion());
    System.out.println("Driver Name :"+dbm.getDriverName());
    System.out.println("Driver Version :"+dbm.getDriverVersion());

   } catch (SQLException ex) {
    System.out.println("BulletinList:execList() : SQLException") ;
    System.out.println("SQLState : " + ex.getSQLState()) ;
    System.out.println("message : " + ex.getMessage()) ;
    System.out.println("Oracle Error Code : " + ex.getErrorCode() ) ;
   }

  }catch (Exception ee) {
   System.out.println("haha"+ee.getMessage());
  }
  }
}
```

### JSP에서 DataSource를 이용한 Connection 획득

```java
import java.sql.*;
import javax.sql.*;
import javax.naming.*;

...

Context ctx = new InitialContext();
// 이 객체가 JNDI에 미리 등록되어 있어야만 한다.
DataSource ds = (DataSource)ctx.lookup("jdbc/bookSampleDB");
Connection con = ds.getConnection("id", "password");
```

(JSP에서)

```jsp
<%@ page contentType = "text/html; charset=euc-kr" language="java" %>
<%@ page import = "java.sql.*" %>
<%@ page import = "javax.naming.*" %>
<%@ page import = "javax.sql.*" %>

<%
        Connection conn   = null;
        Statement  stmt   = null;
        ResultSet  rs     = null;
        try       {

        Context ctx = new InitialContext();
        // 이 객체가 JNDI에 미리 등록되어 있어야만 한다.
        DataSource ds = (DataSource)ctx.lookup("sybaseTXDS");
        Connection con = ds.getConnection();
        stmt = conn.createStatement();
        rs   = stmt.executeQuery("SELECT USR_ID, NAME, RCN, EMPLNUM FROM CM_USRINFO WHERE BAI_USR_YN = 'Y'");
%>
```

### 각종 Connection 획득방법

```java
public class DBHelper {
    private Connection connection   = null;
    public Connection getConnection(){
        return connection;
    }
    public DBHelper(String driver,String url,String user, String password){
        this(driver,url,user, password, null);
    }
    public DBHelper(){ }

    public void setConnectionFromDataSource(String dataSourceName) throws Exception{
        Context ctx = new InitialContext();
        DataSource ds = (DataSource)ctx.lookup(dataSourceName);
        connection = ds.getConnection();
    }

    public DBHelper(String propertyFileName){
        try {
            Properties prop = new Properties();
            prop.load(new FileInputStream(propertyFileName));
            setConnection(prop);
        } catch(Exception e) {
            e.printStackTrace();
        }
    }

    private void setConnection(Properties prop){
        String driver = prop.getProperty("driver");
        String url = prop.getProperty("url");
        try{
            Class.forName(driver);
        } catch(Exception e){
            e.printStackTrace();
        }
        try{
            connection = DriverManager.getConnection(url,prop);
            System.out.println("Connection Success");
        } catch(Exception e) {
            e.printStackTrace();
        }
    }

    public DBHelper(String driver,String url,String user, String password, String charSet){
        Properties prop = new Properties();
        prop.put("driver",driver);
        prop.put("url",url);
        prop.put("user",user);
        prop.put("password",password);
        if ( charSet != null) prop.put("charSet",charSet);
        setConnection(prop);
    }
```

### DB to DB insert

- [JDBC DataConversion(Using Metadata)](http://50001.com/language/javaside/lec/javapattern_info/se/jdbc/JDBC%20DataConversion%28Using%20Metadata%29.htm)

### Oracle Clob, Blob

- 첨부: [Oracle_Clob_Blob.doc](https://github.com/benelog/devnote/blob/master/attachments/406362_Oracle_Clob_Blob.doc)

### batchUpdate

```java
private static void batchUpdate(String url, String driver, Properties prop, String query) {
    Connection con =  null;
    PreparedStatement psmt  = null;
    try{
        Class.forName (driver);
        con = DriverManager.getConnection(url,prop);
        con.setAutoCommit(false);
        psmt = con.prepareStatement(query.toString());
        for(int i=1;i<=1000;i++){
            psmt.setString(1, "00");
            psmt.setString(2, String.valueOf(i));
            psmt.setString(3, "code:"+i);
            psmt.addBatch();
            System.out.println(i+"th row set");
            if(i%100==0)  {
                psmt.executeBatch();
                System.out.println("commit");
            }
        }
    } catch (Exception ex) {
        ex.printStackTrace();
    } finally {
        DbUtils.closeQuietly(psmt);
        DbUtils.closeQuietly(con);
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
- [[jdbc-url]]

## Related
- [[apache-commons]]
- [[db-lock]]
- [[db-normalization]]
- [[db-schema-tools]]
- [[db-transation]]
- [[derby]]
- [[mysql]]
- [[no-sql]]
- [[oracle-db]]
- [[orm]]
- [[security]]
- [[spring-data-jdbc]]
- [[spring-db]]
- [[sql-injection]]
