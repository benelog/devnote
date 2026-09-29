## STMP 서버 테스트에 쓸수 있는 도구들

- Daemon 형 + 관리 UI
  - <https://github.com/tweakers/MockMock> : Web UI
  - <http://nilhcem.com/FakeSMTP/> : Desktop UI
- 라이브러리형
  - <https://greenmail-mail-test.github.io/greenmail/>

      참고
  - <https://github.com/voodoodyne/subethasmtp>

  - <https://github.com/kirviq/dumbster>

## Spring mail

JavaMailSenderImpl

- <http://www.javacodegeeks.com/2010/07/java-mail-spring-gmail-smtp.html>

## sendmail

- [Linux Mail Server ( SMTP : sendmail ) 설정 방법](http://blog.naver.com/jistol?Redirect=Log&logNo=80050760602)
- [sendmail : world writable directory 에러가 날 경우 조치방법](http://blog.naver.com/juan0812?Redirect=Log&logNo=40022908306)
- [sendmail 에서 550 5.7.1 에러가 발생합니다.](http://kldp.org/node/22394)

재시작

설치

- local-host-names 에 localhost 추가

```sh
/etc/rc.d/init.d/sendmail restart
```

## Related
- [[linux]]
- [[spring]]
