스프링배치 연재 8편: JDBC를 이용한 Cursor 기반의 DB 조회

## JDBC를 이용한 Cursor 기반의 DB 조회

배치에서 대용량 DB처리를 위해서는 읽은 내용 전체를 Collection으로 쌓지 않고 커서 기반의 처리가 가능해야 한다. JdbcCursorItemReader 클래스는 JDBC API를 감싸서 제공되는 ItemReader이다. dataSouce 속성으로 DB connection을 넣어올 수 있는 datasource를 지정하고, sql 속성에 실행할 쿼리, mapper 속성에 ResultSet에서 객체를 매핑하는 코드를 써주면 된다. 예제는 Hsql DB를 이용하여 조회를 수행한 것이다. RowMapper 인터페이스는 기존의 스프링을 통한 JDBC활용을 해 본 사람이라면 익숙할 것이다.

```java
public class ItemReaderPrint {
   public static void main(String[] args) throws Exception{
      jdbcDataSource dataSource = new jdbcDataSource();
      dataSource.setUser("sa");
      dataSource.setPassword("");
      dataSource.setDatabase("jdbc:hsqldb:hsql://localhost/sampledb");
      JdbcCursorItemReader reader = new JdbcCursorItemReader();
      reader.setDataSource(dataSource);
      reader.setSql("SELECT user_id, user_name FROM users");
      RowMapper mapper = new RowMapper(){
         public Object mapRow(ResultSet rs, int i) throws SQLException {
            Map<String, Object> item = new HashMap<String, Object>();
            item.put("id", rs.getString(1));
            item.put("name", rs.getString(2));
            return item;
         }
      };
      reader.setMapper(mapper);
      ExecutionContext context = new ExecutionContext();
      reader.open(context);
      Object item = null;
      while((item = reader.read())!= null) System.out.println(item);
      reader.close(context);
   }
}
```

리스트 22: DB 테이블에서 읽어서 객체로 만들어서 출력해보기

위의 코드를 설정으로 옮기어 본다면 리스트23과 같다.

```xml
<bean id="userReader"
      class="org.springframework.batch.item.database.JdbcCursorItemReader">
  <property name="dataSource" ref="dataSource" />
  <property name="mapper">
    <bean class="org.springframework.jdbc.core.ColumnMapRowMapper" />
  </property>
  <property name="sql">
    <value> SELECT user_id, user_name  FROM users</value>
  </property>
</bean>
<bean id="dataSource" class="org.apache.commons.dbcp.BasicDataSource">
  <property name="driverClassName" value="org.hsqldb.jdbcDriver" />
  <property name="url" value="jdbc:hsqldb:hsql://localhost/sampledb" />
  <property name="username" value="sa" />
  <property name="password" value="" />
</bean>
```

리스트 23: JdbcCursorItemReader의 설정

DB에서 읽은 Row를 Map으로 반환하도록 처음의 코드가 짜여져 있으므로, 스프링에서 제공하는 ColumnMapRowMapper를 사용해서 같은 기능을 수행하게 하였다. 위의 예시는 간단한 경우를 보여주기 위해서 Map을 사용했는데, 실무에서는 Domain Object를 따로 정의하는 것이 성능이나 코드가독성, 에러체크 용이성의 측면에서 더 유리할 것이다. 설정이 제대로 되어 있는지 확인해보기 위해서 리스트24처럼 테스트코드를 작성해보자. 위의 설정이 applicationContext.xml파일에 들어있다고 가정하고 getConfigLocations메소드 안에서 그 파일을 지정해 주었다.

```java
public class UserReaderTest extends
    AbstractTransactionalDataSourceSpringContextTests {

   protected String[] getConfigLocations() {
      return new String[] { "applicationContext.xml" };
   }

   public void testRead() throws UnexpectedInputException,
         NoWorkFoundException, ParseException, Exception {
      ItemReader reader = (ItemReader) getApplicationContext().getBean(
            "userReader");

      ExecutionContext context = new ExecutionContext();
      if (reader instanceof ItemStream)
         ((ItemStream) reader).open(context);
      Object item = null;
      int count = 0;
      while ((item = reader.read()) != null) {
         count++;
         System.out.println(item);
      }
      if (reader instanceof ItemStream)
         ((ItemStream) reader).close(context);
      assertTrue(count > 0);
   }
}
```

리스트24 : ItemReader의 간단한 테스트 클래스

정상혁

## Related

- [[spring-batch-series]]
