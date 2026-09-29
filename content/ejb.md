- [망해가는 EJB 최후의 발악인가? Mastering EJB3 (4th Ed)](http://toby.epril.com/?p=163%3Cbr%3E) 네거티브 전략 그리고 Spring의 경쟁자

## EJB3

- [New Article: New Features in EJB 3.1 - Part 4](http://www.theserverside.com/news/thread.tss?thread_id=49749)

## Weblogic

<http://e-docs.bea.com/wls/docs81/jndi/jndi.html#467275>

```java
Context ctx = null;
Hashtable ht = new Hashtable();
ht.put(Context.INITIAL_CONTEXT_FACTORY,
"weblogic.jndi.WLInitialContextFactory");
ht.put(Context.PROVIDER_URL,"t3://localhost:7001");

try {
   ctx = new InitialContext(ht);
// Use the context in your program
} catch (NamingException e) {
// a failure occurred
} finally {
   try {ctx.close();}
   catch (Exception e) {
   // a failure occurred
   }

}
```

## Jeus

```java
Properties p = new Properties();
p.put("java.naming.provider.url", "10.22.101.41:7001");
p.put("java.naming.factory.initial", "jeus.jndi.JEUSContextFactory");
```

Jeus to Weblogic

- <http://technet.tmaxsoft.com/kr/popReadBoardForm.do?bbsCode=qna_jeus&seqNo=13692>

## J2EE Development Without EJB

목차

1. [왜 EJB 없는 J2EE 개발에 대해 이야기하는가?](http://cafe.naver.com/ArticleRead.nhn?clubid=11061109&listtype=A&boardtype=L&page=1&articleid=85)
2. [EJB 없는 J2EE 개발이 추구하는 목적](http://cafe.naver.com/ArticleRead.nhn?clubid=11061109&listtype=A&boardtype=L&page=1&articleid=86)
3. [대표적인 J2EE 아키텍처에 대한 비교](http://cafe.naver.com/ArticleRead.nhn?clubid=11061109&listtype=A&boardtype=L&page=1&articleid=87)
4. [요구사항을 가장 잘 충족시키는 가장 심플한 것을 찾으라.](http://cafe.naver.com/ArticleRead.nhn?clubid=11061109&listtype=A&boardtype=L&page=1&articleid=88)
5. [문제 많은 EJB, 그러나 EJB에서 배울 것은 많다.](http://cafe.naver.com/ArticleRead.nhn?clubid=11061109&listtype=A&boardtype=L&page=1&articleid=89)
6. [경량급 컨테이너와 IoC.](http://cafe.naver.com/ArticleRead.nhn?clubid=11061109&listtype=A&boardtype=L&page=1&articleid=90)

## Related
- [[jeus]]
- [[jndi]]
- [[java-framework]]
- [[spring]]
- [[java-ee-pattern]]
