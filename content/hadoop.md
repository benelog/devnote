<http://developer.yahoo.com/blogs/hadoop/>

<http://lucene.apache.org/hadoop/> <http://en.wikipedia.org/wiki/Hadoop>

[Hadoop Korean User Group](http://www.hadoop.co.kr/)

[PlatformDay 후기](http://benelog.springnote.com/blog/jshan/78)

[hadoop summit 자료 공개](http://www.jaso.co.kr/253)

[Hadoop을 이용하지 않는 Map&Reduce](http://www.jaso.co.kr/260)

[Enterprise 시장에서의 mapreduce](http://www.jaso.co.kr/283)

<http://www.jco.or.kr/conference/data/10th/Merlin-1.zip>

[Hadoop DB](http://www.jaso.co.kr/368)

[RDBMS, Hadoop, Neptune](http://www.jaso.co.kr/364)

[아파치 하둡 맵리듀스 기반 애플리케이션 구현하기 Part
1](https://www.ibm.com/developerworks/mydeveloperworks/blogs/9e635b49-09e9-4c23-8999-a4d461aeace2/entry/274?lang=en)

[Hadoop을 이용한 분산 데이터 처리, Part 3: 애플리케이션
개발](http://www.ibm.com/developerworks/kr/library/l-hadoop-3/index.html)

[Apache Hadoop과 Dojo를 사용하여 저비용으로 비즈니스 인텔리전스 데이터
생성하기, Part 1: Apache Hadoop을 사용하여 기존 데이터
처리하기](http://www.ibm.com/developerworks/kr/library/wa-dojohadoop1/index.html)

## Hadoop 업체 제휴 상황

<http://kimws.wordpress.com/2012/02/01/%EB%B9%85%EB%8D%B0%EC%9D%B4%ED%84%B0-%EC%86%94%EB%A3%A8%EC%85%98-%EC%97%85%EC%B2%B4-%EA%B4%80%EA%B3%84%EC%99%80-%ED%95%98%EB%91%A1%EA%B8%B0%EC%88%A0%EA%B8%B0%EB%B0%98%EC%9D%98-%EC%8A%A4%ED%83%80/>

## 예제

[Hadoop을 이용한 Apache Log
분석](http://mimul.com/pebble/default/2011/11/05/1320482173560.html)

## Hadoop 간단 요약

내부적으로 분산 병렬 처리를 지원하고 사용자에게 모든 처리과정을 추상화한
인터페이스를 제공한다.

Hadoop was inspired by [Google](http://en.wikipedia.org/wiki/Google)'s
[MapReduce](http://en.wikipedia.org/wiki/MapReduce) and [Google File
System](http://en.wikipedia.org/wiki/GoogleFS) (GFS) papers.

HDFS filesystem uses

- [HBase](http://en.wikipedia.org/wiki/HBase) - [BigTable](http://en.wikipedia.org/wiki/BigTable)-model database.
-  : data warehouse infrastructure built on top of [Hadoop](http://wiki.apache.org/hadoop/). SQL-like query language, called QL, that HBase는 HDFS를 기반으로 하는 또 하나의 흥미로운 애플리케이션으로 Google BigTable과 비슷한 고성능 데이터베이스 시스템이다. 일반적인 파일 처리 대신 HBase는 데이터베이스 테이블을 입력 및 출력 양식으로 사용하여 MapReduce 처리를 수행한다.

### Eclipse plugin

<http://www.alphaworks.ibm.com/tech/mapreducetools/>

### 주요개념

 논문

[하둡 분산 파일 시스템: 구조와 설계(The Hadoop Distributed File System:
Architecture and Design)](http://virgo81.tistory.com/46)

    Linux에 mount

[hadoop을 linux 파일시스템으로 mount](http://www.jaso.co.kr/100)

### FTP

[hadoop을 이용한 ftp server](http://www.gruter.co.kr/213)

<https://issues.apache.org/jira/browse/HADOOP-3199?page=com.atlassian.jira.plugin.system.issuetabpanels:comment-tabpanel&focusedCommentId=12587077#action_12587077>

    https://sites.google.com/a/iponweb.net/hadoop/Home/hdfs-over-ftp[https://sites.google.com/a/iponweb.net/hadoop/Home/hdfs-over-ftp]

### Stream 얻기

Path

FileSystem

Configuration

### Hadoop command

hadoop fs -ls

bin/hadoop jar sims-batch.jar sims.batch.WriteTest

<http://www.mail-archive.com/core-user@hadoop.apache.org/msg07497.html>

### Database Inout

<http://developer.yahoo.net/blogs/hadoop/DBInputFormat.ppt>

<http://www.cloudera.com/blog/wp-content/uploads/DBInputFormat.pdf>

<http://www.cloudera.com/blog/2009/03/06/database-access-with-hadoop/>

<http://www.cloudera.com/blog/tag/dbinputformat/>

<http://www.mail-archive.com/core-user@hadoop.apache.org/msg07497.html>

<http://www.jaso.co.kr/308>

<http://www.jaso.co.kr/303>

DBOutputFormat

DBInputFormat

DBConfiguration

``` java
public int run(String[] arg0) throws Exception {
  JobConf conf = new JobConf(getConf(), LoadTable1.class);
  conf.setInputFormat(DBInputFormat.class);
  DBConfiguration.configureDB(conf, DATABASE_DRIVER_CLASS, CONNECT_URL, DB_USER, DB_PWD);
  DBInputFormat.setInput(conf, ose_epr_contract.class, "select CONTRACT_NUMBER from OSE_EPR_CONTRACT", "select COUNT(CONTRACT_NUMBER) from OSE_EPR_CONTRACT");
  FileOutputFormat.setOutputPath(conf, new Path(CONTRACT_OUTPUT_PATH));
  conf.setMapperClass(LoadMapper.class);

  conf.setNumReduceTasks(0); conf.setOutputKeyClass(Text.class);
  conf.setOutputValueClass(NullWritable.class);
  JobClient.runJob(conf); return 0; }
```

## Hadoop DB

<http://www.greenplum.com/>

<http://db.cs.yale.edu/hadoopdb/hadoopdb.html>

<http://db.cs.yale.edu/hadoopdb/hadoopdb.html>

## ZooKeeper

[zookeeper 살짝엿보기](http://www.jaso.co.kr/338)

[zookeeper 사용하기](http://www.jaso.co.kr/348)

## Hadoop + ETL

<http://www.slideshare.net/ydn/4-integration-patternshadoopsummit2010>

## Related
- [[data-integration]]
- [[distributed-processing]]
