- [iBatis와 DBCP 바로알기](http://www.imaso.co.kr/?doc=bbs/gnuboard.php&bo_table=article&wr_id=40288)
  - iBatis는 JDBC 3.0이전에도 내부적으로 statement cache를 함. 그러나 ibatis session level의 cache이기 때문에 Driver level cache보다 효율이 떨어짐
  - evictor 스레드가 실행될 때는 timeBetweenEviction RunMillis \> 0
  - Evictor 스레드 역할http://devyongsik.tistory.com/509\[<http://devyongsik.tistory.com/509>\]
- <http://java-source.net/open-source/connection-pools>

- [c3p0 - JDBC3 Connection and Statement Pooling](http://tom.tharrisx.homedns.org/javalib/c3p0-0.8.4.5/doc/)

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

- JDBC SQL 구문에 클라이언트 정보 남기기 : <http://kwon37xi.egloos.com/4860051>

## Related
- [[jdbc]]
- [[spring-db]]
- [[orm]]
- [[tomcat]]
