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

## JDBC API 사용법

- [서블렛 + JDBC 연동시 코딩 고려사항 -제1탄-](http://www.javaservice.net/~java/bbs/read.cgi?m=devtip&b=servlet&c=r_p&n=968185187&k=JDBC&d=tb)
- [서블렛 + JDBC 연동시 코딩 고려사항 -제2탄-](http://www.javaservice.net/~java/bbs/read.cgi?m=devtip&b=servlet&c=r_p&n=968522077)
- [서블렛 + JDBC 연동시 코딩 고려사항 4](http://www03.zdnet.co.kr/news/enterprise/0,39031021,10048177,00.htm)
- [서블렛 + JDBC 연동시 코딩 고려사항 5](http://www03.zdnet.co.kr/news/enterprise/0,39031021,10048192,00.htm)
- [서블렛 + JDBC 연동시 코딩 고려사항 6](http://www.zdnet.co.kr/builder/dev/java/0,39031622,10048223,00.htm)

Statment를 안 가지면 maximum open cursor exceed ! 에러나 Limit on number
of statements exceeded 에러 발생

- [Top Ten Oracle JDBC Tips](http://www.onjava.com/pub/a/onjava/2001/12/19/oraclejdbc.html)
- JDBC 드라이버의 4가지 타입 : <http://www.onjava.com/pub/a/onjava/excerpt/javaentnut_2/index1.html>

## 각종 DBMS JDBC 드라이버 셋팅법 정리

- <http://blog.naver.com/jeany4u/20003041849>

## 에러 관련

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

## Children
- [[jdbc-url]]
- [[connection-pool]]

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
- [[java-encoding]]
