- [\[05\] JNDI (Java Naming And Directory Interface)의 이해 및 실습](http://blog.naver.com/fangxh_0919?Redirect=Log&logNo=120043282121)
- [JNDI](http://blog.naver.com/kvivaldi?Redirect=Log&logNo=60004720636)

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

## Related
- [[java]]
- [[servlet]]
- [[tomcat]]
- [[ejb]]
