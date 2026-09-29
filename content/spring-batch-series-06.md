스프링배치 연재 6편: 플랫파일 읽기와 쓰기

## 플랫파일 읽기

ItemReader중에서 플랫파일을 읽을 수 있는FlatFileItemReader 클래스는 setter로 설정할 수 있는 아래의 속성들을 가지고 있다.

| 속성명 | 타입 | 설명 |
|----|----|----|
| resource | org.springframework.core.io.Resource | 읽어드릴 데이터의 위치를 지정 ( 파일이나 URL 등 ) |
| encoding | String | 읽을 인코딩 방식 . 디폴트는 "ISO-8859-1" |
| comments | String[] | 각 열의 이름 |
| fieldSetMapper | org.springframework.batch.item.file.mapping.FieldSetMapper | 행을 읽어서 저장한 객체인 FieldSet 을 다시 객체로 매핑시켜주는 멤버객체 |
| firstLineIsHeader | boolean | 첫 줄이 컬럼의 이름을 나타내는 헤더인지의 여부 |
| linesToSkip | int | 파일의 첫 부분에서 읽지 않고 넘어갈 줄 (line) 의 수 |
| lineTokenizer | org.springframework.batch.item.file.transform.LineTokenizer | 각 행을 읽어서 fieldSet 객체로 만들어주는 멤버객체 |
| recordSeparatorPolicy | org.springframework.batch.item.file.separator.RecordSeparatorPolicy | 각 행을 어떻게 구분할 것인지를 정의하는 멤버객체 |
| saveStatus | boolean | ExecutionContext 를 이용해서 상태를 저장할 것인지를 지정한다 . |

표 3 : FlatFileItemReader의 속성들

주요 속성들을 이용해서 내부적으로 파일을 읽는 과정은 다음과 같다. Resource를 통해서 읽을 자료를 불러 들이고, RecordSeparatorPolicy를 참조해서 각 행을 잘라 읽는다. 그 행은 lineTokenizer를 통해서 컬럼별로 잘라져서 fieldSet이라는 객체로 만들어 진다. 그 fieldSet은 fieldSetMapper를 이용해서 최종적으로 리턴할 객체로 변환된다.

Resource는 스프링 Core에 정의된 인터페이스이고, file system, URL, classpath, byte배열 등을 통해 읽어지는 자원들을 같은 형태로 추상화 시킬 수 있다. FileSystemResource, UrlResource, InputStreamResource, ByteArrayResource등의 구현클래스가 존재한다. FieldSet은 Jdbc의 ResultSet과 비슷한 개념으로 하나의 객체가 하나의 행에 대응되며, 그것을 구성하게 있는 컬럼에 여러 데이터 타입으로 접근할 수 있도록 추상화 인터페이스이다. FieldSetMapper와 LineTokenizer의 인터페이스는 아래와 같이 단순하게 정의되어 있다. FieldSetMapper는 Spring의 JdbcTempler에서 사용하던 RowMapper 인터페이스와 유사하다.

```java
public interface FieldSetMapper {
  Object mapLine(FieldSet fs) ;
}
```

리스트 4: FieldSetMapper 인터페이스

```java
public interface LineTokenizer{
  FieldSet tokenize(String line)
}
```

리스트 5 : LineTokenizer 인터페이스

FlatFileItemReader 클래스의 read메소드 내부를 보면 라인을 읽어서 FieldSet을 만들고, 그것을 다시 객체와 매핑시키는 과정이 눈에 잘 들어올 것이다.

```java
public Object read() throws Exception {
    String line = readLine();
    if (line != null)
        try {
            FieldSet tokenizedLine = tokenizer.tokenize(line);
            return fieldSetMapper.mapLine(tokenizedLine);
        } catch (RuntimeException ex) {
            //생략
        }
    else
        return null;
}
```

리스트 6: FlatFileItemReader의 read메서드 내부

파싱을 할 때 역할을 섬세하게 분리하다 보니 처음에는 다소 복잡해 보일 수도 있으나, 인터페이스의 이름과 역할을 연결시킨다면 그리 어렵지 않게 구조를 익힐 수 있을 것이다. StringTokenier 같은 클래스를 쓸 때보다 훨씬 유연성과 코드 가독성이 높아진 것을 알 수 있다.

LineTokenizer 는 구분자, 고정길이 등 기본적인 방식을 위한 기본 클래스들이 제공된다. 특별한 경우가 아니고는 최종개발자가 따로 구현할 필요는 없다.

- DelmitedLineTokenizer – 구분자(delimiter)로 구분된 파일을 위한 클래스. 예를 들면 “,”로 구분된 CSV파일을 읽을 때 쓸 수 있다.
- FixedLengthTokenizer – 각 행이 고정된 길이로 되어 있고, 고정된 위치로 속성값들을 구분하는 파일을 위한 클래스
- PrefixMatchingCompositeLineTokenizer – 각 행에서 prefix에 따라서 읽어드릴 방식이 달라지는 파일을 위한 클래스.

플랫파일을 읽는 간단한 예제를 통해서 API를 다시 한 번 살펴보도록 하겠다.

```java
import java.util.*;
import org.springframework.batch.item.ExecutionContext;
import org.springframework.batch.item.file.FlatFileItemReader;
import org.springframework.batch.item.file.mapping.FieldSet;
import org.springframework.batch.item.file.mapping.FieldSetMapper;
import org.springframework.batch.item.file.transform.DelimitedLineTokenizer;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;

public class FlatFilePrint {
   public static void main(String[] args) throws Exception{
      FlatFileItemReader reader = new FlatFileItemReader();
      reader.setEncoding("euc-kr");
      Resource resource = new FileSystemResource("d:/test.txt");
      reader.setResource(resource);
      DelimitedLineTokenizer tokenizer = new DelimitedLineTokenizer();
      tokenizer.setDelimiter(',');
      reader.setLineTokenizer(tokenizer);
      FieldSetMapper fieldSetMapper = new FieldSetMapper(){
         public Object mapLine(FieldSet fieldSet) {
            Map<String, Object> item = new HashMap<String, Object>();
            item.put("id", fieldSet.readString(0));
            item.put("name", fieldSet.readString(1));
            item.put("age", fieldSet.readInt(2));
            return item;
         }
      };
      reader.setFieldSetMapper(fieldSetMapper);
      ExecutionContext context = new ExecutionContext();
      reader.open(context);
      Object item = null;
      while((item = reader.read())!= null) System.out.println(item);
      reader.close(context);
   }
}
```

리스트 7 : FlatFileItemReader를 호출한 예

```text
benelog,정상혁,30
imaso,마소,30
david,김철수,21
```

리스트 8 : 읽을 파일 (D:/TEST.TXT)

```text
{id=benelog, age=30, name=정상혁}
{id=imaso, age=30, name=마소}
{id=david, age=21, name=김철수}
```

리스트 9 : 실행결과

Resource를 구현한 클래스 중에 하나인 FileSystemResource를 사용해서 “D:/test.txt”로 읽을 파일을 지정한다. 한 행이 한 레코드를 나타내고 있는 것 외에 레코드의 분리에 대한 특별한 규칙이 없으므로 RecordSeparatorPolicy는 별도로 지정하지 않아도 된다. 그리고 구분자로 된 파일을 읽는 것이므로 DelimitedLineTokenizer를 쓰는데, setDelimeter 메서드로 구분자인 ‘,’를 그것을 지정한다. 각 행을 Map에다 담는 FieldSetMapper를 정의하고 ItemReader에 넣어준다. 필수적인 모든 요소가 다 정의된 후 루프를 돌면서 하나씩 item의 값을 꺼내서 화면에 찍어보면 각각의 행이 Map으로 생성된 것을 확인할 수 있다.
fieldSet에서 각 컬럼의 값을 가지고 올 때, `fieldSet.readString(0);` 과 같이 순서로 가지고 올 수도 있지만, 각 lineTokenizer에서 컬럼의 이름이 지정되어 있다면 이름으로 값을 꺼내올 수도 있다.

```java
tokenizer.setNames(new String[] {"id", "name","age"});
//중간 코드 생략
FieldSetMapper fieldSetMapper = new FieldSetMapper(){
   public Object mapLine(FieldSet fieldSet) {
      Map<String, Object> item = new HashMap<String, Object>();
      item.put("id", fieldSet.readString("id"));
      item.put("name", fieldSet.readString("name"));
      item.put("age", fieldSet.readInt("age"));
      return item;
   }
};
```

리스트 10 : 이름을 지정해서 FieldSet에서 값을 가지고 오기

lineTokenzier에서 지정된 이름과 똑같이 key값을 지정하려면 FieldSet의 getNames 메소드를 이용해서 key값을 하나하나 지정하지 않아도 된다.

```java
FieldSetMapper fieldSetMapper = new FieldSetMapper(){
   public Object mapLine(FieldSet fieldSet) {
      Map<String, Object> item = new HashMap<String, Object>();
      for (String name : fieldSet.getNames()){
         item.put(name, fieldSet.readString(name));
      }
      return item;
   }
};
```

리스트 11 : FieldSet의 getNames 메소드 활용

위의 예제에서는 Item을 Map으로 생성시켰지만, 컬럼이 2~3개인 경우가 아니라면 사용자가 정의된Domain Object를 사용하는 것이 코드 가독성 측면과 컴파일시에 에러체크 범위를 더 높일 수 있다는 점에서 나을 것이다. 그렇게 한다면 `item.setName(fieldSet.readString("name"));` 과 같은 형태의 코드로 필드를 지정할 수 있다. 이 같이 Domain Object의 setter메소드가 지정하는 필드명과 fieldSet에서 가지고 오는 컬럼의 이름이 동일하게 된다면 FieldSetMapper의 정의는 단순 작업이 되어 버리는데, 이럴 경우BeanWrapperFieldSetMapper라는 클래스를 사용하고 스피링의 설정을 이용한다면 별도로 FieldSetMapper를 정의할 필요 없이 이 과정을 자동으로 수행하게 해준다.

```xml
<bean id="fieldSetMapper"
      class="org.springframework.batch.io.file.mapping.BeanWrapperFieldSetMapper">
    <property name="prototypeBeanName" value="person" />
</bean>
<bean id="person" class="sample.Person" scope="prototype" />
```

리스트 12 : BeanWrapperFieldSetMapper를 이용한 설정

BeanWrapperFieldSetMapper의 prototypeBeanName으로 지정된 bean은 Scope를 prototype으로 정의해야 하는 것을 유의하자. 매번 행마다 당연히 새로운 객체가 생성되어야 하기 때문이다. fieldSetMapper 뿐만 아니라 FlatFileItemReader의 속성을 전부 다 설정파일로 지정하는 것이 가능할 것이고, 이것이 원래의 스프링배치의 사용법이다.

플랫파일이 고정길이 방식일 때는 lineTokenzier부분만 다르게 정의되면 된다. 만약 위의 예제파일이 1부터 8까지 위치가 ID, 9부터 12까지가 이름, 13부터 14까지가 나이라면 아래와 같이 지정하면 된다. 범위의 위치가 0이 아닌 1부터 시작하는 것을 유의하자.

```java
FixedLengthTokenizer tokenizer = new FixedLengthTokenizer();
tokenizer.setNames(new String[] {"id", "name","age"});
Range[] ranges = new Range[3];
ranges[0] = new Range(1,8);
ranges[1] = new Range(9,12);
ranges[2] = new Range(13,14);
tokenizer.setColumns(ranges);
reader.setLineTokenizer(tokenizer);
```

리스트 13 : 고정길이 방식의 LineTokenizer지정

## 플랫파일로 쓰기

FlatFileItemReader의 구조를 충분히 이해했다면 플랫파일 쓰기는 어렵지 않게 활용할 수 있을 것이다. 각 행을 자르는 LineTokenizer는 FieldSet으로부터 각행을 구성하는 LineAggregator에 대응되고, FieldSetMapper대신에 item인 Object로부터 FieldSet을 생성해주는 FieldSetCreator가 존재한다. 즉, 쓸 객체를 FieldSetCreator에서 FieldSet을 만든 후 LineAggregator를 통해서 최종적으로 줄에 쓸 String을 만들어 준다.

```java
public interface LineAggregator {
   public String aggregate(FieldSet fieldSet);
}
```

리스트 14 : LineAggregator 인터페이스

```java
public interface FieldSetCreator {
    FieldSet mapItem(Object data);
}
```

리스트 15: FieldSetCreator 인터페이스

위의 구성요소들이 들어간 FlatFileWrite 의 사용법을 간단한 예제를 통해서 살펴보자

```java
import java.util.*;
import org.springframework.batch.item.ExecutionContext;
import org.springframework.batch.item.file.FlatFileItemWriter;
import org.springframework.batch.item.file.mapping.DefaultFieldSet;
import org.springframework.batch.item.file.mapping.FieldSet;
import org.springframework.batch.item.file.mapping.FieldSetCreator;
import org.springframework.batch.item.file.transform.DelimitedLineAggregator;
import org.springframework.core.io.FileSystemResource;

public class FlatFileWrite {
   public static void main(String[] args) throws Exception{
      FlatFileItemWriter writer = new FlatFileItemWriter();
      writer.setEncoding("euc-kr");
      DelimitedLineAggregator aggregator = new DelimitedLineAggregator();
      aggregator.setDelimiter(",");
      writer.setLineAggregator(aggregator);
      List<Map<String, String>> items = getItems();
      FieldSetCreator creator = new FieldSetCreator(){
         public FieldSet mapItem(Object item) {
            Map<String, String> itemMap = (Map<String, String>)item;
            return new DefaultFieldSet( new String[]{itemMap.get("id"),
                                                     itemMap.get("name")} );
         }
      };
      writer.setFieldSetCreator(creator);
      writer.setResource(new FileSystemResource("D:/testWrite.txt"));
      ExecutionContext context = new ExecutionContext();
      writer.open(context);
      int i=0;
      for(Object item : items){
         writer.write(item);
         if(i++%10==0) writer.flush();
      }
      writer.close(context);
   }

   private static List<Map<String, String>> getItems() {
      List<Map<String,String>> items = new ArrayList<Map<String,String>>();
      Map<String,String> item1 = new HashMap<String,String>();
      item1.put("id","benelog");
      item1.put("name","정상혁");
      items.add(item1);
      return items;
   }
}
```

리스트 16 : FlatFileItemWriter 호출 예제

Map으로 정의된 Item을 파일에 쓰는 예제이다. FieldSetCreator인터페이스를 이용해 Map을 FieldSet으로 바꾸어 주도록 구현한다. DefaultFieldSet은 String의 배열을 받아서 FieldSet을 생성해주는 기본 제공 클래스이다. LineAggregator는 구분자를 ‘,’로 하는 행을 생성할 것이므로 DelimitedLineAggregator를 사용하고 setDelimeter로 구분자를 지정한다.

정상혁

## Related

- [[spring-batch-series]]
