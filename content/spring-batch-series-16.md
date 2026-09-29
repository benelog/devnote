스프링배치 연재 16편: DB to XML 응용예제

## DB에서 2개 테이블을 엮어서 XML파일로 쓰기 예제

DB에서 부모-자식 간의 관계로 된 테이블을 읽어서 하나의 XML로 만드는 작업은 실무에서 흔하게 만날 수 있는 배치처리 사례이다. 다음의 예제에서는 팀 테이블(team)과 선수(player)테이블에 DB에 있다고 가정하고 이를 하나의 XML로 만드는 작업을 진행해보고자 한다. 팀 테이블과 선수테이블은 당연히 1대 다 관계로 이루어져 있다. 테이블을 생성하고 테스트로 몇 개의 데이터를 넣어주는 스크립트가 첨부파일([imaso-batch.zip](https://github.com/benelog/devnote/blob/master/attachments/1080304_imaso-batch.zip))에 포함되어 있다. (src/main/resources/data 폴더)

![baseball.GIF](https://raw.githubusercontent.com/benelog/devnote/master/attachments/1079858_baseball.GIF)

먼저 부모 테이블인 팀 테이블을 읽어오는 ItemReader를 작성해 보자. JdbcCursorItemReader클래스를 이용해서 쿼리와 그 결과를 Team의 도메인 오브젝트로 매핑할 수 있는 mapper를 지정한다. (리스트12)

```xml
<bean id="teamMasterReader" class="org.springframework.batch.item.database.JdbcCursorItemReader">
   <property name="dataSource" ref="dataSource" />
   <property name="mapper">
      <bean class="org.springframework.jdbc.core.BeanPropertyRowMapper" >
         <property name="mappedClass"  value="imaso.batch.domain.Team"/>
      </bean>
   </property>
   <property name="sql">
      <value> SELECT  team_id, team_name, symbol, rank FROM team</value>
   </property>
</bean>
```

리스트 12 : JDBC커서 방식으로 Team테이블 조회

간단한 코딩을 위해서 mapper에 BeanPropertyRowMapper를 사용하고 mappedClass속성을 team테이블의 내용을 담는 도메인 오브젝트인 Team클래스로 지정했다. Team 클래스는 team 테이블의 컬럼명이 그 멤버변수로 선언되고 있고, getter,setter를 가진 단순한 클래스이다. Java의 일반적인 명명규칙에 맞추어서 언더바(_)가 없이 camel casing으로 표기되어 있다. BeanPropertyRowMapper는 언더바와 camel casing간의 변환을 자동으로 해 주기 때문에 team_id의 컬럼도 setTeamId메소드를 통해서 값이 채워지게 된다. 만약 성능을 조금이라도 향상시키고 싶다면 다소의 추가 코딩을 하더라도 별도의 RowMapper를 구현해서 사용하기 바란다.

이제 team의 자식 테이블인 player를 읽을 차례다. 여러가지 방법이 있겠지만, DrvingQuery방식과 비슷하게 team 1건마다 그 팀에 소속하는 선수를 조회하는 쿼리를 던지는 방식을 사용해 보았다. 이를 위해 상위테이블만 읽어온 item object에서 그 자식 테이블을 읽어서 채워줄 수 있는 경우를 추상화하여 ItemWithChildrenReader라는 클래스를 작성해 보았다.

```java
public abstract class ItemWithChildrenReader extends DelegatingItemReader{

  public Object read() throws Exception {
    Object item = super.read();
    if(item==null) return null;
    setChildren(item);
    return item;
  }

  protected abstract void setChildren(Object item);

  public ItemWithChildrenReader() {}
}
```

리스트 13: 부모-자식 테이블 조회기능을 추상화한 클래스

이를 상속한 클래스에서 setChildren메소드를 구현하여 자식 테이블을 읽어서 넣도록 설계된 것이다.
Team테이블에서 읽어온 값에서 Player테이블을 채워줄 수 있는 ItemReader는 리스트 14와 같이 구현하였다.

```java
public class TeamReader extends ItemWithChildrenReader {
  private RowMapper mapper;
  private JdbcTemplate jdbcTemplate;
  private String sql;

  protected void setChildren(Object item) {
    Team team = (Team)item;
    Object[] params = new Object[]{team.getTeamId()};
    @SuppressWarnings("unchecked")
    List<Player> playerList = jdbcTemplate.query(sql, params, mapper);
    team.setPlayerList(playerList);
  }
  // private 멤버 객체에 대한 setter 생략
}
```

리스트 14ㅣ Player를 읽어서 Team에 넣어주는 클래스

setChild메소드 안에서 JdbcTemplate, RowMapper를 이용하여 player테이블의 건들을 읽어와서 team객체에 넣어준다. 만약 두 테이블을 연결시키는 키 속성명, 결과가 들어갈 속성명까지도 설정파일로 빼고 BeanUtils클래스의 setProperty, getProperty들을 활용한다면 보다 일반화시킨 클래스를 만들 수도 있다.
TeamReader의 설정에는 앞에서 나온 Team테이블을 읽어오는 TeamMasterRead를 itemReader속성으로 지정해 준다.

```xml
<bean id="teamReader"  class="imaso.batch.item.TeamReader">
   <property name="itemReader" ref="teamMasterReader" />
   <property name="sql">
      <value>
        SELECT team_id, player_id ,player_name, main_position
        FROM player  WHERE team_id = ?
      </value>
   </property>
   <!-- mapper, jdbctemplate에 대한 설정은 생략 -->
</bean>
```

리스트 15 : TEAM과 PLAYER를 같이 읽어오는 클래스의 설정

만약 위의 구현처럼 쿼리를 건마다 하나씩 던지고 싶지 않다면, 다소 구현이 복잡해 지더라도 team과 player 테이블 모두 team_id를 기준으로 정렬해서 조회한 후에 sorted merge 방식과 유사하게 양쪽 item들의 team_id값을 비교해 가면서 team에다 player를 붙여주는 구현도 가능하다.

그 다음은 읽어온 내용을 XML파일로 쓰는 기능은 StaxEventItemWriter와 XStream 라이브러리를 같이 사용해서 구성했다. XStream 라이브러리를 보다 잘 활용하기 위해서 반드시 프로젝트가 의존하고 있는 spring-oxm을 최신버전인 1.5.4로 참조해서 쓰기 바란다. 스프링배치의 샘플 프로젝트에서는 1.0.0버전을 참조하고 있는데, 당연히 최신버전에 비해 기능이 많이 빠져있다. 그리고 앞으로 설명한 아노테이션을 이용한 태그명 설정을 사용하기 위해서는 spring-oxm-tiger 라이브러리도 포함시켜야 한다. 예제에서 사용한 Maven2의 pom.xml파일은 첨부파일 내에 포함되어 있다.
생성시킬 XML파일의 형태는 team태그 밑에 team 컬럼의 속성들이 들어가고 player테이블의 내용은 team 태그 밑에서 player태그로 여러 번 반복된다. (리스트 16)

```xml
<content>
  <team> <team_id>1</team_id> <team_name>Lotte</team_name>
    <symbol>Giants</symbol><rank>1</rank>
    <player>
      <playerId>0</playerId> <player_name>이대호</player_name>
      <main_position>3루수</main_position>
    </player>
    <player>....</player> <player>....</player>
  <team>...</team>
  <team>...</team>
</content>
```

![baseballXml.GIF](https://raw.githubusercontent.com/benelog/devnote/master/attachments/1080044_baseballXml.GIF)

리스트 16 : 생성할 XML파일

앞의 teamReader에서 읽어온 내용을 쓰기 위한 StaxEventItemWriter을 리스트17과 같이 설정한다.

```xml
<bean id="teamXmlWriter"   class="org.springframework.batch.item.xml.StaxEventItemWriter">
    <property name="resource"  value="file:target/team.xml" />
    <property name="serializer" ref="teamSerializer" />
    <property name="rootTagName" value="content" />
    <property name="overwriteOutput" value="true" />
</bean>
<bean id="teamSerializer"  class="org.springframework.batch.item.xml.oxm.MarshallingEventWriterSerializer">
    <constructor-arg ref="teamMarshaller"/>
</bean>
```

리스트 17 : StaxEventItemWriter의 설정

루트태그명을 rootTagName에서 content로 지정하고 xml을 생성하는데 필요한 요소들을 serializer속성-> MarshallingEventWriterSerializer 클래스-> teamMarshaller 빈으로 연결시켜 주는 것까지는 기본적인 사용법과 별차이가 없다.
여기서 도메인 오브젝트인 Team과 Player클래스에서 태그를 연결하기 위한 설정을 편하게 하기 위해서 아노테이션을 사용했다. AnnotationXStreamMarshaller를 사용하면 도메인 오브젝트 내에서 리스트18처럼 태그를 지정해 줄 수 있다.

```java
public class Team {
  @XStreamAlias("team_id") private int teamId;
  @XStreamAlias("team_name") private String teamName;
  private String symbol;
  private int rank;
  @XStreamImplicit private List<Player> playerList;
```

리스트 18 : 태그명을 어노테이션으로 지정

@XStreamAlias 어노테이션을 이용해서 멤버변수의 이름과 태그명이 다른 경우에는 태그명을 명시해 준다. playerList필드처럼 Collection이면서, 그 필드의 이름 자체는 태그로 옮기어 지지 않을 경우에는 @XStreamImplicit 어노테이션을 이용한다. 즉, 우리가 만들고자 하는 샘픔에서 playerList속성과 대응되는 부분이 `<playerList><player/><player/></playerList>` 의 형식처럼 player태그를 playList태그가 한번 감싸고 있는 것이 아니고 바로 `<player/>`가 반복되는 형태이기 때문에 @XStreamImplicit가 붙어야 하는 것이다. Player클래스에서는 team_id 멤버 변수는 아예 태그로 옮기어 지지 않으므로 @XStreamOmitField 어노테이션을 붙여서 이를 명시했다. XStream의 annotation에 대한 자세한 설명은 페이지를 참고하기 바란다.
어노테이션을 사용하지 않는다면 AnnotationXStreamMarshaller의 상위클래스인 XStreamMarshaller 를 사용하고, implicitCollection, omittedFields의 속성에 Map의 형태로 생략할 필드들을 지정할 수 있다.
또 하나 주의할 점은 태그명에 언더바(_)가 들어가면 XStream에서는 디폴트로 그것을 언더바2개(__)로 바꾸어 준다는 점이다. 이 것은 XStream의 XmlFriendlyReplacer라는 클래스에서 하는 작업인데, 불행히도 현재의 AnnotationXStreamMarshaller클래스에서는 이 클래스를 바꿔치기 할 수 있는 기능이 없다. 그래서 AnnotationXStreamMarshaller를 상속하는 별도의 클래스를 만들고 XmlFriendlyReplacer를 끼워넣을 수 있도록 구현을 했다.

```java
public class ExtendedXStreamMarshaller extends AnnotationXStreamMarshaller{
  private XmlFriendlyReplacer replacer;

  protected void marshalSaxHandlers(Object graph,
      ContentHandler contentHandler, LexicalHandler lexicalHandler)
      throws XmlMappingException {
    SaxWriter saxWriter = new SaxWriter(replacer);
    saxWriter.setContentHandler(contentHandler);
    getXStream().marshal(graph, saxWriter);
  }
  //replacer에 대한 setter 생략
}
```

리스트 19 : XmlFriendlyReplacer 를 지정할 수 있는 확장 클래스

XmlFriendlyReplacer상속한 DummyReplacer를 만들고 여기서는 언더바를 더블언더바로 바꾸는 동작을 수행하지 않도록 만든 후 이를 setter로 설정했다.

```xml
<bean id="teamMarshaller" class="imaso.batch.item.support.ExtendedXStreamMarshaller">
   <property name="annotatedClasses">
     <list><value>imaso.batch.domain.Team</value>
         <value>imaso.batch.domain.Player</value>
     </list>
   </property>
   <property name="replacer">
      <bean class="imaso.batch.item.support.DummyReplacer"/>
   </property>
</bean>
```

리스트 20 : Marshaller설정

annotatedClasses속성으로 Team과 Player클래스를 지정해서 어노테이션을 XStream에서 인식할 수 있도록 해준다.
StaxEventItemReader에는 이 밖에도 다양한 형태의 Xml 생성을 돕는 속성들이 있다. Root태그 밑에 여러 속성들이 있다면 rootElementAttributes 속성에 Map형식으로 이를 지정할 수 있다. 예들 들어 `<content id="baseball">`으로 XMl이 시작한다면 id가 key이고 baseball이 value인 Map을 지정해 주면 된다. 그리고 headerItems속성으로는 루트 태그 아래에 추가로 들어갈 다른 태그들을 넣을 수 있다. 이와 함께 XStream에서 제공하는 Converter인터페이스를 구현하고 XStreamMarshaller 의 converters 속성으로 그것을 등록해 주면, 객체가 태그로 바뀌는 형식을 보다 정교하게 구현할 수도 있다. 자세한 내용은 첨부파일에 있는 예제를 참고하기 바란다.

ItemReader와 ItemWriter를 연결시키는 Step과 Job의 설정을 하면 모든 작업은 끝이 난다. 주의할 점은 SimpleStepFactoryBean에서는 ItemReader가 Writer가 바로 동시에 ItemStream이라면 자동으로 stream속성에 등록이 되는데, 다른 ItemStream객체가 있다면 따로 지정을 해 주어야 한다는 것이다. DelegatingItemReader안에 감싸져서 들어가는 itemReader와 같이, Step에 직접 등록되는 ItemReader가 아닌 경우도 여기에 해당한다. 리스트12와 15에서 보이듯이, teamMasterReader도 teamReader에 감싸져 있는 클래스인데, itemStream인 JdbcCursorItemReader클래스이므로, Step설정에서 streams에 지정되어 있어야지 open,update,close와 같은 메소드들이 제대로 호출될 수 있다.

```xml
<bean id="teamDbToXmlStep" parent="simpleStep">
  <property name="itemReader" ref="teamReader"/>
  <property name="itemWriter" ref="teamXmlWriter"/>
  <property name="streams" ref="teamMasterReader"/>
</bean>
```

리스트21: Step의 설정

## 첨부파일

- [imaso-batch.zip](https://github.com/benelog/devnote/blob/master/attachments/1080304_imaso-batch.zip)

정상혁

## Related

- [[spring-batch-series]]
