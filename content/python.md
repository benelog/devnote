* http://metaleks.net/programming/the-evolution-of-a-python-programmer
* [Python 제너레이터+반복자의 마법](http://blog.dahlia.pe.kr/articles/2009/09/15/python-%EC%A0%9C%EB%84%88%EB%A0%88%EC%9D%B4%ED%84%B0%EB%B0%98%EB%B3%B5%EC%9E%90%EC%9D%98-%EB%A7%88%EB%B2%95)
* [Python으로 간결하고 테스트 가능하며 수준 높은 코드 쓰기](http://www.ibm.com/developerworks/kr/aix/library/au-cleancode/index.html)

## 프레임웍
* https://www.pylonsproject.org/
* http://flask.pocoo.org/

#### Evenlet
* http://codescience.wordpress.com/2011/09/05/non-blocking-io-node-js-and-pythons-eventlet/
* http://vodpod.com/watch/4072135-pycon-2010eventlet-asynchronous-io-with-a-synchronous-interface-141

## 테스트
* http://docs.python.org/library/doctest.html
* http://docs.python.org/library/unittest.html

## 예제

### 파일 읽기

```python
def read(file_name):

    file_content = open(file_name)

    while 1:

        line = file_content.readline()

        if not line:

            break

        print line

    file_content.close();
```

### Proxy 서버

* http://code.activestate.com/recipes/483732-asynchronous-port-forwarding/
    * `sudo python proxy.py -l 127.0.0.1 -p 80 -r 127.0.0.1 -P 8080`
