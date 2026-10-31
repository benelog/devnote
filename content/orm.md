- [Object-relational impedance mismatch](http://en.wikipedia.org/wiki/Object-Relational_impedance_mismatch)
- <http://martinfowler.com/eaaCatalog/activeRecord.html>

## 기술비교

- <http://db.apache.org/jdo/jdo_v_jpa.html>
- [iBATIS, Hibernate, and JPA: Which is right for you?](http://www.javaworld.com/javaworld/jw-07-2008/jw-07-orm-comparison.html)
- [Hibernate, iBATIS 그리고 JPA중.. 당신의 선택은.?](http://blog.openframework.or.kr/50)

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

## Children
- [[jpa]]

## Related
- [[jdbc]]
- [[spring-data-jdbc]]
- [[spring-db]]
