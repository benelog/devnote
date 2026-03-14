## Coverage 개념

<http://www.javaranch.com/journal/2004/01/IntroToCodeCoverage.html>

<http://www.bullseye.com/coverage.html>

<http://www.bullseye.com/statementCoverage.html>

Decision coverage = Branch Coverage

<http://comjnl.oxfordjournals.org/cgi/content/abstract/bxm021v1>

branch coverage - is every conditional branch tested at least once?

## Code Coverage 측정 도구

### Cobertura

- <http://cobertura.sourceforge.net/>

``` xml
<plugin>
<groupId>org.codehaus.mojo</groupId>
<artifactId>cobertura-maven-plugin</artifactId>
<configuration>
<formats>
<format>html</format>
<format>xml</format>
</formats>
</configuration>
</plugin>
```

### Clover

- <http://www.atlassian.com/software/clover/>
- <http://www.cenqua.com/clover/> 상용

### emma

<http://emma.sourceforge.net/>

<http://www.eclemma.org/>

[\[eclemma](http://openframework.or.kr/blog/?p=369) Java Code Coverage\]

Code Pro Anlytix Pro

<http://www.instantiations.com/codepro/analytix/server/index.html>

## Related
- [[junit]]
- [[mock]]
- [[tdd]]
- [[test-quote]]
- [[test]]
- [[test-framework]]
