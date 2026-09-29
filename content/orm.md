- [Object-relational impedance mismatch](http://en.wikipedia.org/wiki/Object-Relational_impedance_mismatch)
- <http://martinfowler.com/eaaCatalog/activeRecord.html>

## 기술비교

- <http://db.apache.org/jdo/jdo_v_jpa.html>
- [iBATIS, Hibernate, and JPA: Which is right for you?](http://www.javaworld.com/javaworld/jw-07-2008/jw-07-orm-comparison.html)
- [Hibernate, iBATIS 그리고 JPA중.. 당신의 선택은.?](http://blog.openframework.or.kr/50)

## JPA

[JPA](jpa.adoc) 참조

## jOOQ

- <http://java.dzone.com/articles/no-more-need-orms>

## Sql2o

- <http://www.sql2o.org/>

## JBDI

- <http://jdbi.org/>

## Yank

- <https://github.com/timmolter/Yank>

## Empire DB

- <http://empire-db.apache.org/>

## EL SQL

SQL 전용 템플릿 엔진. <https://github.com/OpenGamma/ElSql>

## Hibernate

### Hibernate Cache

- <http://docs.jboss.org/hibernate/core/3.5/reference/en-US/html_single/#performance-cache>
- First level Cache
  - <http://blog.dynatrace.com/2009/02/16/understanding-caching-in-hibernate-part-one-the-session-cache/>
  - get과 load의 차이 : <http://gmarwaha.blogspot.com/2007/01/hibernate-difference-between-sessions.html>
- Query Cache
  - <http://tech.puredanger.com/2009/07/10/hibernate-query-cache/>
- Cache
  - <http://stackoverflow.com/questions/48733/how-to-maintain-hibernate-cache-consistency-running-two-java-applications>
  - <http://groups.google.com/group/hibernate-memcached/browse_thread/thread/271721007f682f75?pli=1>
- EHCache
- Memcached
  - <http://drorbr.blogspot.com/2010/02/beware-of-hibernates-readwrite-cache.html>
- SPI
  - <http://docs.jboss.org/hibernate/core/3.5/api/org/hibernate/cache/package-summary.html>
  - 질문.. CollectionRegion은 언제 쓰는것인가?

### Hibernate와 iBatis

전에 게시판에서 중국 개발자들이 하이버네이트를 많이 쓴다는 언급이 나왔었는데, 말 나온 김에 하이버네이트에 대한 이야기를 풀어볼까 합니다.

유독 중국에서만 하이버네이트 열풍이 부는 것일까요? 수천개의 job site의 결과를 수집해 온다는 indeed.com을 통해서 확인할 수 있는 Hibernate와 iBatis의 Job Trends 그래프를 보면 아래와 같습니다.

<http://www.indeed.com/jobtrends?q=%22hibernate%22%2C+%22ibatis%22&l=>

![job_trends.GIF](https://raw.githubusercontent.com/benelog/devnote/master/attachments/2064819_job_trends.GIF)

이 그래프를 본다면 indeed.com이 반영해주는 job market에서는 이제 하이버네이트가 iBatis에 비해서 압도적으로 개인경력에 도움이 되는 기술이라는 것을 알 수 있습니다. 이직이 잦은 IT업계의 특성을 감안해 본다면, 기술을 선택할 때 개발자들에게 이런 점들도 무시할 수 없는 요소일 것입니다. NHN에 들어오는 신입 중에서 여기에서 경력을 마칠 것이라고 생각하는 개발자는 별로 없을 것 같기도 합니다.

iBatis보다 하이버네이트의 학습비용이 크기 때문에 어디에서나 iBatis가 적절한 기술이라고 생각하시는 분들도 많을 것 같습니다. 하지만 학습비용을 평가할 때는, 그 학습효과로 얻어지는 생산성 향상 등의 이득을 감안이 되어야 하는데, 단기 성과에 지나치게 연연하여서 그 생산성 향상효과를 위한 학습투자를 꺼려하는 경우가 많다고 느껴집니다. 예제만 풍부하다면 새로운 기술이라도 의외로 1~2시간 안에 주된 활용법은 익힐 수 있는 개발자들이 많습니다. 그리고 인터넷 검색의 발달로 필요한 기술팁들을 빠르게 찾을 수 있게 되었다는 것도 학습비용을 줄일 수 있는 여건입니다. 저는 많은 IT조직에서 학습비용이 과대평가되고 있다고 생각합니다.

제가 하이버네이트를 처음 본 것은 2004년도에 했던 어느 프로젝트에서 였었는데, 옆의 팀에서 만든 모듈의 로그에서 이상한 쿼리들이 막 쏟아져 나오는 것을 보고 신기해서 소스코드를 찾아 봤던 적이 있었습니다. 처음보는 개발방식이였지만 어떤 의도로 쓰여진 코드인지 이해하는 것은 크게 어렵지 않았습니다. 그리고 그 팀에서는 신입급의 개발자들도 이미 있는 예제코드들을 보고 하이버네이트로 잘 개발을 하더군요. 단일 프로젝트 내의 생산성에 집착할 수 없는 SI프로젝트에서도 이미 2004년도에 쓰는 곳이 있었고, 코드가독성이나 신입이 배우기에 큰 무리가 없었다는 것을 보면 하이버네이트가 깜짝 놀랄만하게 어려운 엄청난 신기술은 아닌 것 같습니다. 그리고 중국대학생들의 졸업 과제 프로젝트에서도 거의 쓰인다고 하니, 중국대학생들보다는

직접 쿼리를 다 작성하는 방식으로 개발을 하다보면, 대부분의 쿼리는

- 단순개발, 지루함
- 하이버네이트와 성능
- 유지보수어려움

### Hibernate 도입문제

- [하이버네이트에 대한 오해, 미신 그리고 무지](http://toby.epril.com/?p=468)
- <http://bcho.tistory.com/308>

Relase it, 9장 용량안티패턴, 9.7 손으로 만든 SQL

'손으로 만든 SQL을 최소화하자'

ORM이 만든 쿼리는 예측가능하기 때문에, DBA가 튜닝하기 쉬운 반면

손으로 만든 SQL을 예측하기 어렵고, 인덱스가 없는 칼럼에 자주 조인, 너무 많은 테이블을 한꺼번에 조인 '성능킬러'

동적으로 생성되는 SQL은

## iBatis

- [\[iBatis\] DB별 \<insert\> 후 key 받기](http://blog.naver.com/bbokstae/30033236523)
- [iBatis에서 insert후 자동 sequence Key 값을 가져오는 설정 방법](http://otamot.tistory.com/65)
- [\[iBATIS\] iBATIS의 성능 문제Framework/iBATIS](http://www.tuning-java.com/251)

### 샘플코드

removeFirstPretend, open, close

```xml
<isNotEmpty prepend=" " property="startRowNo">
 ORDER BY wb.id FOR orderby_num() BETWEEN #startRowNo# and #endRowNo#
</isNotEmpty>
```

```xml
<result property="paramDelaySs" javaType="int" column="param_delay_ss"  jdbcType="NUMERIC" nullValue ="0"/>
```

### log4j 설정

```properties
log4j.logger.java.sql.Connection=DEBUG
log4j.logger.java.sql.Statement=DEBUG
log4j.logger.java.sql.ResultSet=DEBUG
log4j.logger.java.sql.PreparedStatement=DEBUG
```

### iBatis in Action

2장 55페이지

도메인 모델로 Map(이를 테면 HashMap, TreeMap)을 사용하는 것은 추천하지 않는다.

4장 112페이지

- 자바빈즈
  - 장점
    - 성능
    - 컴파일ㅇ시 강력한 타입검사
    - 컴파일시 이름검사
    - IDE에서의 리팩토링 지원
    - 형변환이 줄어듬.
  - 단점: 코드량의 증가
- Map
  - 장점: 코드량의 감소
  - 단점:
    - 느림
    - 컴파일시 검사하지 않음
    - 약한 타입
    - 실행시 오류 발생이 잦음
    - 리팩토링 지원 없음.

13.4 장 328 페이지

> 하지만 Map은 형편없는 도메인 모델이다. 그러므로 비즈니스 객체를 표현하기 위해 Map을 사용해서는 안된다. 이것은 단지 iBatis에 국한된 문제가 아니다. 어떤 퍼시스턴스 계층을 사용하든 간에 Map을 사용해서 도메인 모델을 나타내서는 아노딘다. ㅡ메dms 느리고 타입 안전성을 보장하지 않으며 자바빈즈보다 더 맣은 메모리를 사용한다. 그리고 예측할 수 없는 행동을 하고 유지보수하기도 어렵다. 현명하게 판단해서 Map을 사용하라.

### IBator

- [http://ibatis.apache.org/ibator.html](http://ibatis.apache.org/abator.html)

### myBatis

- <http://communityovercode.com/2010/06/mybatis-forks-apache-ibatis/>

### Cache

- <http://theeye.pe.kr/entry/knowing-oscache-model-on-integrated-ibatis>
- <http://code.google.com/p/ibatis-with-memcached>

## Related
- [[jdbc]]
- [[jpa]]
- [[spring-data-jdbc]]
- [[spring-db]]
