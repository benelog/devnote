<div id="header">

</div>

<div id="content">

<div class="paragraph">

[파이썬 구현들](http://skyul.tistory.com/309)

</div>

<div class="paragraph">

[파이썬은 멀티코어 줘도 쓰잘데기가 없나요?"에 대한 파이썬 2.6의
대답](http://openlook.org/blog/2008/06/28/python-multiprocessing/)

</div>

<div class="paragraph">

[파이썬 바인딩](http://skyul.tistory.com/266)

</div>

<div class="literalblock">

<div class="content">

    http://metaleks.net/programming/the-evolution-of-a-python-programmer[http://metaleks.net/programming/the-evolution-of-a-python-programmer]

</div>

</div>

<div class="paragraph">

[Python 제너레이터+반복자의
마법](http://blog.dahlia.pe.kr/articles/2009/09/15/python-%EC%A0%9C%EB%84%88%EB%A0%88%EC%9D%B4%ED%84%B0%EB%B0%98%EB%B3%B5%EC%9E%90%EC%9D%98-%EB%A7%88%EB%B2%95)

</div>

<div class="paragraph">

[Python으로 간결하고 테스트 가능하며 수준 높은 코드
쓰기](http://www.ibm.com/developerworks/kr/aix/library/au-cleancode/index.html)

</div>

<div class="paragraph">

<http://ipython.org/>

</div>

<div class="sect1">

## 입문서

<div class="sectionbody">

<div class="paragraph">

<http://learnpythonthehardway.org/book/>http://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-189-a-gentle-introduction-to-programming-using-python-january-iap-2008/\[<a
href="http://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-189-a-gentle-introduction-to-programming-using-python-january-iap-2008/"
class="bare">http://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-189-a-gentle-introduction-to-programming-using-python-january-iap-2008/</a>\]<http://stackoverflow.com/questions/3088/best-ways-to-teach-a-beginner-to-program>

</div>

</div>

</div>

<div class="sect1">

## 프레임웍

<div class="sectionbody">

<div class="paragraph">

<http://www.pylonsproject.org/>http://flask.pocoo.org/\[<a href="http://flask.pocoo.org/"
class="bare">http://flask.pocoo.org/</a>\]
<http://elixir.ematia.de/trac/wiki>

</div>

<div class="paragraph">

Learn Django: Create a Wiki in 20 minutes
<http://showmedo.com/videos/video?name=1100000&fromSeriesID=110>

</div>

<div class="sect3">

#### Evenlet

<div class="paragraph">

<http://codescience.wordpress.com/2011/09/05/non-blocking-io-node-js-and-pythons-eventlet/>

</div>

<div class="paragraph">

<http://vodpod.com/watch/4072135-pycon-2010eventlet-asynchronous-io-with-a-synchronous-interface-141>

</div>

</div>

</div>

</div>

<div class="sect1">

## 테스트

<div class="sectionbody">

<div class="paragraph">

<http://docs.python.org/library/doctest.html>
<http://docs.python.org/library/unittest.html>

</div>

</div>

</div>

<div class="sect1">

## 예제

<div class="sectionbody">

<div class="paragraph">

조각 코드 :
<http://coreapython.hosting.paran.com/howto/sebsauvage_net-%20Snyppets%20-%20Python%20snippets.htm>

</div>

<div class="sect2">

### 날짜 변환

<div class="paragraph">

[http://wiki.dgoon.net/doku.php?id=python:time-\_string](http://wiki.dgoon.net/doku.php?id=python:time_-%3Cem%3Estring)

</div>

<div class="paragraph">

파일 읽기

</div>

<div class="listingblock">

<div class="content">

``` highlight
def read(file_name):

    file_content = open(file_name)

    while 1:

        line = file_content.readline()

        if not line:

            break

        print line

    file_content.close();
```

</div>

</div>

</div>

<div class="sect2">

### Proxy 서버

<div class="paragraph">

<a
href="http://code.activestate.com/recipes/483732-asynchronous-port-forwarding/"
class="bare">http://code.activestate.com/recipes/483732-asynchronous-port-forwarding/</a>
sudo python proxy.py -l 127.0.0.1 -p 80 -r 127.0.0.1 -P 8080

</div>

</div>

</div>

</div>

</div>

<div id="footer">

<div id="footer-text">

Last updated 2026-02-28 04:33:58 +0900

</div>

</div>

## Related
