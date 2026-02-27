# [cron-expression-descriptor](https://github.com/voidburn/cron-expression-descriptor) 활용 예제

``` java
  private static void logCronDescription(String cron) {
    var options = new CronExpressionParser.Options();
    options.setUseJavaEeScheduleExpression(true); // 요일 선언이 0이면 일요일으로 인식
    options.setVerbose(true);
    options.setLocale("ko");

    String description = CronExpressionDescriptor.getDescription(cron, options);
    log.info("Cron :{}, Description :{}", cron, description);
  }
```

<div class="formalpara">

<div class="title">

결과

</div>

    Cron :0 0,10 0 * * 0, Description :시간 이후 0 및 10분, 00:00, 매일, 일요일에만

</div>

# DST

- [Pacific Time Zone (PT) vs Pacific Satndard Zone (PST) vs Pacific
  Daylight Zone (PDT)](https://m.blog.naver.com/elviz1/221649940876)
- [서머타임과 배치작업](https://meetup.nhncloud.com/posts/232)

## Related
- [[job-scheduling]]
- [[quartz]]
