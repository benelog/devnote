참조하는 jar파일 확인

    pmap [pid] | grep jar

혹은 cat /proc/\<pid\>/smaps

    ps axuw | grep java | grep -v grep | awk '{print $2}' | while read P; do pmap $P | grep 'spring' ; done
- Apache MaxClients와 Tomcat의 Full GC
- JDBC internal timeout의 이해
- Garbage Collection과 Statement Pool

# Statement Cache

- <https://vladmihalcea.com/how-does-the-mysql-jdbc-driver-handle-prepared-statements/>
- <https://dev.mysql.com/doc/refman/5.6/en/statement-caching.html>

# Connection pool

- [iBatis와 DBCP
  바로알기](http://www.imaso.co.kr/?doc=bbs/gnuboard.php&bo_table=article&wr_id=40288)
  - iBatis는 JDBC 3.0이전에도 내부적으로 statement cache를 함. 그러나
    ibatis session level의 cache이기 때문에 Driver level cache보다
    효율이 떨어짐
  - evictor 스레드가 실행될 때는 timeBetweenEviction RunMillis \> 0
  - Evictor 스레드
    역할http://devyongsik.tistory.com/509\[<http://devyongsik.tistory.com/509>\]
- <http://java-source.net/open-source/connection-pools>

- [c3p0 - JDBC3 Connection and Statement
  Pooling](http://tom.tharrisx.homedns.org/javalib/c3p0-0.8.4.5/doc/)

## 모니터링

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

## DBCP

Race condition error : <https://issues.apache.org/jira/browse/DBCP-270>

The pool is initialized the first time one of the following methods is
invoked:
`getConnection, setLogwriter, setLoginTimeout, getLoginTimeout, getLogWriter.`

### testOnBorrow

- [http://geroros.hajima.net/entry/iBatis에서-커낵션-에러-날](http://geroros.hajima.net/entry/iBatis%EC%97%90%EC%84%9C-%EC%BB%A4%EB%82%B5%EC%85%98-%EC%97%90%EB%9F%AC-%EB%82%A0)-때

- [장시간 미사용된 DBCP 커넥션의 단절현상](http://blog.ajkuhn.com/33)

### removeAbandoned

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

### 성능비교

- JDBC SQL 구문에 클라이언트 정보 남기기 :
  <http://kwon37xi.egloos.com/4860051>

### JDBC API 사용법

- [서블렛 + JDBC 연동시 코딩 고려사항
  -제1탄-](http://www.javaservice.net/~java/bbs/read.cgi?m=devtip&b=servlet&c=r_p&n=968185187&k=JDBC&d=tb)
- [서블렛 + JDBC 연동시 코딩 고려사항
  -제2탄-](http://www.javaservice.net/~java/bbs/read.cgi?m=devtip&b=servlet&c=r_p&n=968522077)
- [서블렛 + JDBC 연동시 코딩 고려사항
  4](http://www03.zdnet.co.kr/news/enterprise/0,39031021,10048177,00.htm)
- [서블렛 + JDBC 연동시 코딩 고려사항
  5](http://www03.zdnet.co.kr/news/enterprise/0,39031021,10048192,00.htm)
- [서블렛 + JDBC 연동시 코딩 고려사항
  6](http://www.zdnet.co.kr/builder/dev/java/0,39031622,10048223,00.htm)

Statment를 안 가지면 maximum open cursor exceed ! 에러나 Limit on number
of statements exceeded 에러 발생

- [Top Ten Oracle JDBC
  Tips](http://www.onjava.com/pub/a/onjava/2001/12/19/oraclejdbc.html)
- JDBC 드라이버의 4가지 타입 :
  <http://www.onjava.com/pub/a/onjava/excerpt/javaentnut_2/index1.html>

### 각종 DBMS JDBC 드라이버 셋팅법 정리

- <http://blog.naver.com/jeany4u/20003041849>

### 에러 관련

- [Oracle
  Protocol-violation](http://www.javaservice.net/~java/bbs/data/jdbc/1031683974+/Protocol_Violation.doc)
- [ORA-01000: maximum open cursors exceeded
  조사](http://www.jakartaproject.com/board-read.do?boardId=dbtip&boardNo=116424143325438&command=READ&page=1&categoryId=-1)
- [ResultSet 의 close 메소드를 finally 에서 반드시 부르지 않아도 되는
  이유](http://sayjava.egloos.com/3628406#8145310)
- [JDBC 중복할당에 의한 WAS행(Hang)현상
  추적하기](http://www.javaservice.net/~java/bbs/read.cgi?m=apm&b=jscfaq&c=r_p&n=1130485838)

# Mysql

- <https://dev.mysql.com/doc/connector-j/8.0/en/connector-j-reference-configuration-properties.html>
- <https://kwonnam.pe.kr/wiki/database/mysql/jdbc>
  - MySQL에서는 `useServerPrepStmts=true` 를써야 Server side cache
    활성화됨 (default false)

# Fetch size

- <http://bleujin.tistory.com/152>
- <http://dev.mysql.com/doc/refman/5.1/en/connector-j-reference-implementation-notes.html>

- [http://java.sun.com/j2se/1.5.0/docs/api/java/sql/Statement.html#setFetchSize(int)](http://java.sun.com/j2se/1.5.0/docs/api/java/sql/Statement.html#setFetchSize%28int%29)
- <http://www.databasesandlife.com/reading-row-by-row-into-java-from-mysql/>
- <http://blog.naver.com/PostView.nhn?blogId=kang594&logNo=40515882&parentCategoryNo=8&viewDate=&currentPage=1&listtype=0>
- connector 버전 5.0.2이상에서는 useCursorFetch가 먹음 :
  <http://wiki.gxtechnical.com/commwiki/servlet/hwiki?Client+and+server+cursors+-+using+MySQL>

## autoreconnect=true

- <http://dev.mysql.com/doc/refman/5.1/en/connector-j-usagenotes-j2ee.html>

## Mysql batchupdate

- <http://swik.net/MySQL/Mark+Matthew/A+10x+Performance+Increase+for+Batch+INSERTs+With+MySQL+Connector%2FJ+Is+On+The+Way…​./cxj7h>

# BLOB image 관련

- [JSP나 서블릿에서 이미지 출력에
  관해서…​](http://javaservice.net/~java/bbs/read.cgi?m=devtip&b=servlet&c=r_p&n=1092807454&p=1&s=t)
- <http://blog.naver.com/yacjae/100020395789>

# 기타

- [\[DB](http://blog.openframework.or.kr/10) 가벼운 SQL 인터페이스..\]
- <http://java.dzone.com/articles/lightweight-sql-interfaces-jav>

## Children
- [[jdbc-url]]

## Related
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
