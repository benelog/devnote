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

## Children

- [[beanutils]]

## Related
- [[beanutils]]
- [[guava]]
- [[java-io]]
- [[http-client]]
- [[java-string]]
