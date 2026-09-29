<figure>
<img src="http://dl.adminlife.net/regular_expressions_cheat_sheet.png"
alt="regular_expressions_cheat_sheet.png" />
</figure>

## 학습

## 도움사이트

- Java : <http://www.regexplanet.com/advanced/java/index.html>
- JavaScript : <https://regexr.com/>
- [http://www.regexper.com](http://www.regexper.com/)
- <http://regexpal.com/>
- <http://www.myezapp.com/apps/dev/regexp/show.ws>
- <http://blog.naver.com/ahndongju/100052756446>
- [RegEx Coach - 정규표현식 도우미 툴](http://swbae.egloos.com/1780067)
- [초보 개발자 코드 트레이닝, Part 5: 정규 표현식](http://www.ibm.com/developerworks/kr/library/s_issue/20080729/)
- [자바 정규 표현식 구현](http://www.slipp.net/wiki/pages/viewpage.action?pageId=950361) : 집 전화번호, 휴대폰 번호 검사 예제

## 예제

- style 태그 제거: `style=\"[^\"]*\"`
- slug 로 시작하는 라인 :\`^(Slug)(.\*)\n\`
- Hugo를 위해 tag 형식 바꾸기 : `^(tags\: )(.*?)\n` → `tags:[$2]\n---\n\n`

## Java 정규식
- <http://java.sun.com/javase/6/docs/api/java/util/regex/Pattern.html>
- [Java and Regular Expressions - Tutorial](http://www.vogella.de/articles/JavaRegularExpressions/article.html)

### HTML추출
```java
Pattern p = Pattern.compile("\\<(\\/?)(\\w+)*([^<>]*)>");
Matcher m = p.matcher(body);

body = m.replaceAll("");

String content = str.replaceAll("<(/)?([a-zA-Z]*)(\\s[a-zA-Z]*=[^>]*)?(\\s)*(/)?>", "");

str.replaceAll("(?:<!.*?(?:--.*?--\\s*)*.*?>)|(?:<(?:[^>'\"]*|\".*?\"|'.*?')+>)","");
```

### 그림파일 추출
```java
String source = "<img src=\"
String pattern = ")";
Pattern p = Pattern.compile(pattern);
Matcher m = p.matcher(source);
System.out.println();
while(m.find()) System.out.println(m.group());
```
