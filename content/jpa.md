- [Spring JPA의 사실과 오해](https://www.slideshare.net/NHNFORWARD/nhnforward2019-2)
- <https://en.wikibooks.org/wiki/Java_Persistence>
- [JPA 구현 패턴](http://whiteship.me/2316)
- [Java Persistence 2.0의 잠금과 동시성](http://blog.sdnkorea.com/blog/846)
- [Slice를 사용하여 OpenJPA 애플리케이션 확장하기](http://www.ibm.com/developerworks/kr/library/os-openjpa/index.html)
- [AWS RDS와 Spring Cloud + JPA 시작하기](https://greencrayon00.wordpress.com/2015/10/16/aws-rds%EC%99%80-spring-cloud-jpa-%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0/)
- [AridPOJOs: Active Record스타일의 Dynamic Finder지원 GenericDao](http://toby.epril.com/?p=322)
- <http://code.google.com/p/warp-persist/wiki/Tutorials>

## Native query

- [JPA Native Query 사용시 DTO로 매핑 하기](https://medium.com/@SlackBeck/jpa-native-query-%EC%82%AC%EC%9A%A9%EC%8B%9C-dto%EB%A1%9C-%EB%A7%A4%ED%95%91-%ED%95%98%EA%B8%B0-64625780c758)
- [Spring Data JPA - Native Query](https://www.logicbig.com/tutorials/spring-framework/spring-data/native-query.html)

## Hibernate

- [\[메이븐](http://whiteship.me/2451) 하이버네이트 플러그인\]
- <http://code.google.com/p/hibernate-memcached/>
- [JPA 참고 자료](http://www.javajigi.net/pages/viewpage.action?pageId=278757380)
- <http://blog.frankel.ch/hibernate-hard-facts-part-6>

- [Hibernate와 OSAF 스크린캐스트](http://toby.epril.com/?p=374)

- [Hibernate without Database Bottlenecks](http://www.infoq.com/vendorcontent/show.action?vcr=262)

- [@Repository를 쓴다면 하이버네이트 예외 변환기 직접 만들 필요 없습니다.](http://whiteship.me/2043)
- Hibernate 기초 학습\[45 Batch Basic\]
- Hibernate 기초 학습\[46 n+1 select 문제의 대안이 되는 Batch size\]
- <http://hibernate.org/hib_docs/v3/reference/en/html/performance.html>
- [하이버네이트 매핑파일 was기동시 로딩시간이 길때..](http://forum.ksug.org/viewtopic.php?f=7&t=376&p=1770#p1770)
- [액티브 레코드 vs 하이버네이트](http://blog.naver.com/scroco?Redirect=Log&logNo=50008520295)
- [스프링 2.5 환경에서 하이버네이트 사용하기](http://whiteship.me/2140)

- [\[하이버네이트](http://whiteship.me/2312)롹킹과 성능 사이에 서다.\]
- [Hibernate에서 Annotation으로 Java Enum 과 MySQL의 enum 매핑](http://kwon37xi.egloos.com/4213045)
- <http://www.javaworld.com/javaworld/jw-08-2008/jw-08-hibernate-annotations.html>
- \[하이버네이트 컬럼 타입은 어떻게 명시하는게 좋을까?\]
- [\[OSAF 테스트 가이드 초안](http://whiteship.me/2362) DAO 통합 테스트\]
- \[하이버네이트 2차 캐싱 적용하기\]
- \[하이버네이트 1 + 2N select 문제 해결하기\]
- [\[하이버네이트 N+1 Select](http://whiteship.me/?p=12934) 문제 상황 재현\]
- [\[하이버네이트 N+1 Select](http://whiteship.me/?p=12950) Batch Patching으로 해결하기\]
- [\[하이버네이트 N+1 Select](http://whiteship.me/?p=12975) HQL Aggregation으로 해결하기\]
- [\[하이버네이트 N+1 Select](http://whiteship.me/?p=12988) Eager Fetching으로 해결하기\]
- [\[하이버네이트 N+1 Select](http://whiteship.me/?p=12997) Runtime Eager Fetching으로 해결하기\]
- \[하이버네이트 쿼리를 수정할 것이냐 모델을 수정할 것이냐…​\]
- [검색및 페이지 처리 구현하기](http://whiteship.me/2681)
- [\[하이버네이트](http://whiteship.me/?p=12700) 계층 구조당 테이블 매핑하기\]
- [하이버네이트 우수 실천법](http://gyumee.egloos.com/2764295)
- [Hibernate Performance Tips](http://www.javajigi.net/display/FRAMEWORK/Hibernate+Performance+Tips)
- <http://www.theserverside.com/discussions/thread.tss?thread_id=60426>
- [ JPA/Hibernate LazyLoading이 설정이 안 먹을 때 간단한 추적 방법](http://kwon37xi.egloos.com/4679102)
- [\[하이버네이트 성능 튜닝](http://whiteship.me/?p=12930) 패칭 전략\]
- [Hibernate 프록시 객체의 this 리턴 주의](http://javacan.tistory.com/212)

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

## Test

- <http://livingtao.blogspot.com/2007/08/unit-testing-with-junit-spring-and.html>
- <http://livingtao.blogspot.com/2007/07/achieve-automatic-transaction-rollback.html>
- [\[Debug](http://kwon37xi.egloos.com/3944496) Hibernate, dbutils, HSQLDB, Maven 삽질 몇 가지\]

## OpenSessionInView

- [Spring - Open Session In View](https://kingbbode.tistory.com/27)

## View

- <http://nonrepeatable.blogspot.com/2010/02/using-database-views-in-hibernate.html>

## Related
- [[orm]]
- [[spring-data-jdbc]]
- [[spring-db]]
