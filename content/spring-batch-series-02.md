스프링배치 연재 2편: 대용량 처리 배치 프로그램을 만들 때 유의할 점

## 대용량 처리 배치 프로그램을 만들 때 유의할 점

일반적인 배치처리 프로그램에서 특히 대용량 자료처리를 할 때 주의점을 정리해 보고자 한다. 대부분 상식적인 이야기지만 이런 점들을 고려하지 않고 작성된 프로그램들이 Out-of-Memory와 같은 에러 메시지를 뿌리고 중지되어 있는 경우도 실제 개발현장에서 발견되기도 했었다.

첫째는 DB 조회 시에 메모리에 모든 건을 한꺼번에 올리지 말고, Cursor기반의 처리를 고려해야 한다는 것이다.
프레임웍 기반의 웹 개발에서는 다수건 데이터의 일반적인 조회방식은 List 객체로 그 값을 담아오는 것이다. 프레임웍에 따라 아래와 같은 메소드들을 사용할 것이다.

- [iBatis](http://ibatis.apache.org/) : SqlMapClient 인터페이스의 queryForList 메서드
- [Hibernate](http://www.hibernate.org/) : [Query](http://www.hibernate.org/hib_docs/v3/api/org/hibernate/Query.html) 인터페이스의 [list](http://www.hibernate.org/hib_docs/v3/api/org/hibernate/Query.html#list) 메소드
- [JPA](http://en.wikipedia.org/wiki/Java_Persistence_API) : [Query](http://java.sun.com/javaee/5/docs/api/javax/persistence/Query.html)인터페이스의 [getResultList](http://java.sun.com/javaee/5/docs/api/javax/persistence/Query.html#getResultList()) 메소드
- Spring에서 JDBC 활용 : JdbcTemplate 클래스의 query 메서드

이런 메소드들은 한 번에 불러오는 데이터가 한 화면에 보여질 정도의 용량에는 별 문제가 없다. 하지만, 배치잡에서는 수만건의 행을 한 번에 처리해야 할 수도 있는데 그 결과를 담은 List객체를 Heap memory에 다 수용할 수 있다고 장담할 수는 없을 것이다. JDBC의 ResultSet처럼 Cursor기반의 방식이라면 메모리의 크기를 신경쓰지 않고 한 건씩 처리할 수 있다. 프레임웍을 이용한 DB접근에 익숙한 개발자라면 JDBC API를 사용했을 때 코드가 길어지고 Exception 처리가 복잡해 지는 등 불편한 점이 많다고 느껴질 수도 있을 것이다. 개발환경이 Hibernate의 [ScrollableResults](http://www.hibernate.org/hib_docs/v3/api/org/hibernate/ScrollableResults.html)를 활용할 수 있다면 사용을 검토해 볼 수 있겠다.[^1]

그리고 Cursor 기반 방식도 전체 건의 처리에 시간이 오래 걸리는 작업이라면 DB제품이나 설정에 따라서는 Lock을 유발해서 시스템의 다른 기능들의 처리도 지연을 시킬 수도 있다. DB2와 같이 pessimistic locking을 주로 사용하는 DB에서는 더욱 그러하다.[^2] 이럴 경우를 대비해서 Driving Query에 의한 방식이 더 바람직할 때도 있다. 이것은 Primary Key값만을 먼저 쿼리해서 저장해 둔 후에, 한 건씩 상세조회 쿼리를 던져서 처리해 나가는 방식이다. 다만 이 방식은 많은 건수의 쿼리를 실행하게 되므로 전체 처리 시간은 Cursor방식보다 더 오래 걸릴 것이다. 해당 프로그램이 수행해야 하는 작업의 제약조건들과 데이터의 특성을 고려해서 적절한 선택을 해야 할 것이다.

둘째는 Stream과 이벤트 방식에 기반한 파일처리이다.
플랫파일이나 XML을 파일을 읽어오는 모듈을 만들 때는, 항상 메모리에 들어 갈 수 있는 작은 건의 데이터가 온다는 보장이 없는 한 전체 파일을 파싱해서 Collection과 같은 객체로 쌓는 작업은 하지 말아야 한다. 일정한 메모리 소모량만으로 대용량 처리를 하려면 Stream으로 읽어온 내용을 흘려 보내면서 처리해줘야 하는 것이다. XML파일의 처리라면 전체 문서를 메모리에 올려야 하는 DOM(Document Object Model)방식은 피해야 한다. SAX(Simple API for XML)나 StAX(Streaming API for XML)를 쓰는 것이 메모리 용량 초과문제도 겪지 않을 수 있고, 처리 속도 측면에서도 유리하다. SAX와 StAX는 이벤트 처리 기반이라는 점에서는 동일하다. SAX는 이벤트 핸들러가 parser로 부터 event를 받는 것이라서 사용자는 약속된 인터페이스에 정의된 call back 메소드의 구현을 통해서만 이벤트를 처리할 수 있다. StAX는 어플리케이션 코드가 그것을 당겨서 받아오는 방식으로(pull-based approach) 파싱처리의 컨트롤을 직접 유지할 수 있다는 장점이 있다. 따라서 StAX 기반의 XML처리가 배치에는 가장 적합하다고 보여진다.

셋째는 트랜잭션 처리에 관한 것이다. 일반적인 온라인 어플리케이션에서는 사용자가 보내는 event 한번에 하나의 트랜잭션을 묶어서 처리한다. 하지만 배치처리에서는 하나의 처리가 하나의 트랜잭션으로 관리되는 것은 문제의 소지가 많다.
몇 만 건 이상의 행과 같이 대용량 데이터를 다루는 경우에는 rollback segment같은 공간의 부족현상이 생길 수도 있다. Oracle과 같은 DB시스템에서 DBA들이 보통 긴 트랜잭션을 유지하는 batch job에 전용 roleback segment를 할당하는데 결국은 다른 session들이 사용할 수 있는 roll back segment를 사용하는 것은 똑같기 때문에 여전히 에러를 유발할 수 있다고 한다. 보다 작은 트랜잭션 단위를 가지고 가는 것이 근본적인 해결책이다.[^3]
그리고 에러가 나지 않을 경우에도 상대적으로 긴 처리 시간 동안 DB에 Lock을 걸리게 해서 전체 시스템에 병목을 만들 수도 있다. 사용자가 많은 웹 어플리케이션이 동시에 접근하는DB에서 배치처리를 돌릴 때는 이를 더 염두에 두어야 할 것이다.

개발자들은 실패시 재시도를 위해서 지난 번 처리한 영역까지 표시하거나 앞에 성공한 건들을 다 지워줘야 하는 처리가 번거롭기 때문에 이를 트랜잭션으로 해결하는 것을 선호할 수도 있다. 그러나 전체 건의 성공 또는 실패만이 의미가 있는 데이터라고 해도 긴 트랜잭션으로 생길 수 있는 문제점을 생각한다면, 실패 처리 기능을 트랜잭션에서 제공받기 전에 응용프로그램에서 적절한 로직으로 구현하는 것을 먼저 고민해야 한다.

심지어 해당하는 데이터의 업무적인 특성이 전체 성공, 전체 실패가 의미가 없는데도 개발자들이 웹 어플리케이션에서 하던 습관대로 당연히 하나의 트랜잭션으로 묶어보리는 경우도 많다. 건마다 독립성이 있는 데이터라면 한 두건의 처리 실패 때문에 앞에 성공한 건들도 다 rollback이 되어버리는 상황은 합리적이지 못하다. 더 많은 건의 데이터가 의도하지 않은 상태로 오래 유지될 수 있기 때문이다. 재시도 시에 다시 모든 데이터를 처리해야 하니 그 처리시간이 더 길어지는 단점도 있다. 배치처리의 에러가 발생 즉시 해결되지 않을 수도 있기 때문에 업무 규칙상으로 가능한 경우라면 부분적으로 성공한 건이라도 DB에 반영되는 것이 좋을 것이다. 데이터의 특성에 따라서 실패한 건은 DB 테이블의 Flag 필드로 구분할 수 있게 한다던지 별도의 파일로 쓰거나 아니면 성공한 줄 수만이라도 기록해서 재실행 때 참고할 수 있도록 고려해봐야 한다. 업무규칙에 따라 한 건이라도 실패를 만나면 바로 실행을 멈춰야 할 수도 있고, 아니면 실패한 건은 기록 후 Skip하고 다음 건으로 넘어가는 것이 더 들어맞는 상황도 있을 것이다. 다양한 처리 방식에 대한 고민과 이를 유연하게 수정할 수 있는 구조가 필요하다.

긴 트랜잭션이 문제점이 있다고 해서 반대로 데이터 매 건마다 따로 트랜잭션 처리를 하는 것도 성능상 좋지 못하다. 트랜잭션을 시작하고 끝낼 때 드는 비용도 감안해야 되기 때문이다. 즉, 지나치게 긴 트랜잭션은 실행시 자원의 한계에 부딪힐 가능성이 있어서 안정적이지 못하고, 너무 작은 트랜잭션 단위는 좋은 성능이 안 나온다. 따라서 자원상황과 처리속도를 감안한 적절한 행 단위를 묶어서 처리를 하는 것이 배치처리에서는 중요하다.[^4] WebSphere Compute Grid에서는 check-point algorithm을 time-based와 record-based 두 가지 방식으로 제공해서 이런 문제에 대한 해결책을 제시하고 있다.[^5] MS-SQL server에 포함된 [SQL Server Integration Services (SSIS)](http://www.microsoft.com/sql/technologies/integration/default.mspx)나 [Pentaho Data Integration](http://kettle.pentaho.org/) 같은 ETL 툴에서도 마찬가지로 commit size설정을 통해 트랜잭션 단위를 지정할 수 있다.

정상혁

[^1]: 관련 자료는 Hibernate 기초 학습[29] - HQL : list() vs iterate() vs. scroll()
[^2]: Pessimistic lock은 레코드가 변경되지 않을 때도 lock이 걸릴 수 있다. Database의 pessimistic locking과 optimistic locking의 차이점은 에서 간단한 설명을 볼 수 있다.
[^3]: Oracle의 rollback segment 부족현상에 대한 자세한 내용은 Misconception: Big batch jobs should use a ‘dedicated’ rollback segment 을 참조하기 바란다.
[^4]: High-volume Transaction Processing in J2EE 의 Job Partitioning and Chunking 단락 참조
[^5]: 해당 솔류션의 기능에 대해서는 [Solving Business Problems with WebSphere Extended Deployment](http://www.ibm.com/developerworks/websphere/library/techarticles/0606_antani/0606_antani.html) 자료에 나와있다.

## Related

- [[spring-batch-series]]
