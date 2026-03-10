How to Design a Good API & Why it matters - Joshua Bloch

<http://www.infoq.com/presentations/effective-api-design> (Javapolis
2005)

(google에서 강연)

[Joshua Bloch: Bumper-Sticker API
Design](http://www.infoq.com/articles/API-Design-Joshua-Bloch)

APIs can be among a company’s greatest assets.

Can also be among company’s greatest liabilites.

Public APIs are forever- one chance to get it right.

If you program, you are an API designer.

Useful modules tent to get reused.

Thinking in terms of APIs impoves code quality.

Characteristics of a Good API

- Easy to learn
- Easy to use, even without documentation.
- Hard to misuse.
- Easy to read and maintain code that uses it
- Sufficiently powerful to satisfy requirement.
- Easy to Extend Appropriate to audience

요구사항보다 보다 일반적인 것 .

심지어 가장 뛰어난 디자이너도 실수를 한다.

# General Principle

- API should do one thing and do it well
- functionality should be easy to explain
- If it’s hard to name, that’s generally a bad sign.
- Good names drive development
- Amendable

API should be as small as possible but no smaller

You can always add, but you can never remove

    Implementations should not impact API

    Minimize accessibility of everty

    Make classes and members as private as possible

public classes shoud have no public fields (with the exception of
constants)

- Name should be largely self-expalnatory
- avoid cryptic abbreviation
- Be consistent-same word means same thing. API must coexist peacefully with platform.

      Minimize mutabillity

bad: Date, Calendar

Simple, thread-safe,

is-a relation

Stack extends Vector

Properties extends HashTable

Don’t make the client do anything the module could do

Class

Method

Fail fast-report errors as soon as possible after they occur.

Compile time is best. static typing, generics.

# Articles

<http://www.se-radio.net/podcast/2009-08/episode-143-api-design-jim-des-rivieres>

[User Interface Principle in API
Design](http://www.cafeaulait.org/slides/ad2006/UserInterfaceAPI.html)

[How to Design a
API](http://openide.netbeans.org/tutorial/api-design.html)

[Java API Design
Guidelines](http://www.artima.com/weblogs/viewpost.jsp?thread=142428)

[Java Collections API Design
FAQ](http://java.sun.com/j2se/1.5.0/docs/guide/collections/designfaq.html#14)

[JSRs aren’t appropriate for
classlibraries](http://publicobject.com/2007/09/jsrs-arent-appropriate-for.html)

[Java API Design
Guidelines](http://www.artima.com/forums/flat.jsp?forum=106&thread=142428)

javascript:void(0);\[<http://www.codeproject.com/KB/java/aQuicklookatAPIDesign.aspx>\]

[SoC(Separation of Concerns)는 복잡도를
증가시키는가?](http://toby.epril.com/?p=711)

[복잡함을 상대하는 기본적인 전략 - SoC](http://toby.epril.com/?p=714)

    http://wiki.apidesign.org/[http://wiki.apidesign.org]

## Static

## 응집도와 결합도

<http://www.threeriversinstitute.org/blog/?p=104>

## 사이트

<http://wiki.apidesign.org/wiki/APIDesignPatterns>

## Related
- [[mvc]]
- [[rest]]
- [[rpc-protocol]]
- [[servlet]]
- [[spring-mvc]]
