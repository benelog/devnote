## 자주 쓰는 쿼리

``` sql
SELECT nullable
  FROM all_tab_cols
 WHERE table_name = UPPER('테이블명')
   AND column_name = UPPER('컬럼명')
```

## 참고자료

- Oracle 10g에서 RBO desupport <http://download-east.oracle.com/docs/cd/B14117_01/server.101/b10763/compat.htm#sthref318>
- Use EXPLAIN PLAN and TKPROF To Tune Your Applications
- Proc c : <http://blog.naver.com/knbawe/100002483290>
- index 관련 자료 : <http://blog.naver.com/sswhite74/40001441448>
- DB link : <http://blog.naver.com/966138/60002347392>
- rollup, cube, grouping function : <http://blog.naver.com/knbawe/100002582940>
- Dictionary : <http://blog.naver.com/966138/60001657505>
- Trigger

### Toad

- 단축키 : <http://blog.naver.com/966138/60001106978>
- TOAD SQL Editor : <http://blog.naver.com/wonie777/120001742935>

### 설치

- [Redhat 9.0 기반에서 오라클 9.2.0 설치하기](http://blog.naver.com/deepinheart/20000824719)
- [리눅스8에오라클9i설치성공기](http://blog.naver.com/kalse/20000393619)

## ERROR

- [Search for Error Messages](http://tahiti.oracle.com/pls/db901/db901.error_search?remark=homepage&prefill=ORA)
- [Oracle Error : ORA-01000](http://www.function.kr/tc/44)
- <http://www.orafaq.com/wiki/ORA-01000>

## Index

index 재구성

```sql
alter index player_t_x6 rebuild unrevoerable
```

## Hint

```sql
/* +ORDERED */
```

## Partition

```
ORA-14400 :
DW_II2_STAT_LOG  inserted partition key does not map to any partition
ORA-14400 삽입된 분할영역키와 매핑되는 분할영역이 없음
```

```sql
ALTER TABLE DW_II2_STATS_LOG
 ADD PARTITION P2000905 VALUES LESS THAN ('20090601')
 TABLESPACE TS_SIMS_D001 PCTFREE 5 PCTUSED 80 INITRANS 1 MAXTRANS 255
 STORAGE ( INITIAL 500K NEXT 500K MINEXTENTS 1 MAXEXTENTS UNLIMITED PCTINCREASE 0)
 LOGGING;
```

- [PCTFREE와 PCTUSED](http://blog.naver.com/dazzilove?Redirect=Log&logNo=60034001525)

## DB link

- <http://blog.naver.com/hjc426?Redirect=Log&logNo=130036440607>

```sql
create public database link devdb
connect to udrims
identified by ****
using '(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=210.94.220.159)(PORT=1521))(CONNECT_DATA=(SID=ora10dev)))'
```

## 튜닝포인트 찾기

```sql
/* 과도한 DISK READ를 수행하는 SQL문을 V$SQLAREA 에서 검색해줌.
/* 원인 => 1) SQL문이 최적화 되지 않아 DISK READ를 많이 할 수 밖에 없는 쿼리일경우.
/* (INDEX가 없거나 사용되지 않을때)
/* 2) DB_BLOCK_BUFFERS 또는 SHARED_POOL_SIZE 가 작은 경우. (메모리가 적음)
/*--------------------------------------------------------------------------*/
```

과다한 DISK READ

```sql
SELECT BUFFER_GETS, SQL_TEXT FROM V$SQLAREA
WHERE BUFFER_GETS > 200000
  and PARSING_SCHEMA_NAME ='SIMS'
ORDER BY BUFFER_GETS DESC;
```

과도한 Logical Read

```sql
SELECT DISK_READS, SQL_TEXT FROM V$SQLAREA
WHERE DISK_READS > 10000
  and PARSING_SCHEMA_NAME ='SIMS'
ORDER BY DISK_READS DESC;
```

## Oracle Dictionary

인덱스명 조회

```sql
select table_name, index_name from user_indexes hwere table_name = 'player'
```

인덱스를 구성하는 컬럼조회

```sql
select index_name, column_name from user_ind_columns where table_name = 'player'
```

파티션

```sql
select * from user_part_tables
select * from user_tab_partitions
select * from user_part_key_columns
```

성능

```sql
SELECT BUFFER_GETS, SQL_TEXT FROM V$SQLAREA
WHERE BUFFER_GETS > 200000
  and PARSING_SCHEMA_NAME ='MYDB'
ORDER BY BUFFER_GETS DESC;

SELECT DISK_READS, SQL_TEXT FROM V$SQLAREA
WHERE DISK_READS > 10000
  and PARSING_SCHEMA_NAME ='MYDB'
ORDER BY DISK_READS DESC;
```

## Oracle tablespace

### table space 조회

SYSTEM 계정으로 들어가서

```sql
select tablespace_name, file_name, bytes/1024/1024 from dba_data_files where tablespace_name = '테이블명'
```

### Tablespace 상태변경

```sql
alter tablespace 이름 online;
alter tablespace 이름 offline normal;
```

(system tablespace, 활성롤백세그먼트를 가진 tablespace는 offline할수없다.)

### Tablespace 삭제순서

1. `alter tablespace 이름 offline normal;`
2. `drop tablespace 이름 including contents cascade constraints;`
3. OS 상에서 직접 해당 데이타파일들을 삭제.

### Tablespace 크기변경

- tablespace에 데이타파일 추가.
  - `alter tablespace 이름 add datafile '데이타파일절대경로' size 100M;`
- tablespace에 있는 데이타파일의 크기 변경 (수동)
  - `alter database datafile '데이타파일절대경로' resize 100M;`
  - 축소하는 경우는 데이타가 들어 있는 경우 하한선 이하로 내려가지는 않는다.
- tablespace에 있는 데이타파일의 크기 변경 (자동)
  - `alter database datafile '데이타파일절대경로' autoextend on next 10M maxsize 200M;`

### Datafile 이동

- alter tablespace 명령어 사용
  - 비system tablespace 의 데이타파일 이동
  - tablespace는 offline상태여야 한다
    1. `alter tablespace 이름 offline normal;`
    2. OS 상에서 직접 해당 데이타파일을 copy, move 한다.
    3. `alter tablespace 이름 rename datafile '원본data파일절대경로' to '옮길data파일절대경로';`
    4. `alter tablespace 이름 online;`
- alter database 명령어 사용
  - system tablespace, 비system tablespace의 데이타파일 이동에 둘다 사용가능
  - oracle mount 상태여야 한다
    1. 오라클 종료.
    2. OS 상에서 직접 해당 데이타파일을 copy, move 한다.
    3. 오라클 마운트한다.
    4. `alter database rename file '원본데이타파일절대경로' to '옮길데이타파일절대경로';`
    5. 오라클 오픈.

### tablespace를 읽기전용으로 만들기

```sql
alter tablespace 이름 read only;
```

(이 tablespace에대해 기존에 수행중이던 트랜잭션이 모두 끝난후 완전한 readOnly 로 바뀐다.)

### 특정 table을 다른 Tablespace 로 옮기는 방법

```sql
alter table 테이블명 move tablespace 테이블스페이스명;
```

### 특정 index를 다른 Tablespace 로 옮기는 방법

```sql
alter index 인텍스명 rebuild tablespace 테이블스페이스명;
```

### 참고 DataDictionary

```
V$TABLESPACE,    V$DATAFILE,     V$TEMPFILE
DBA_TABLESPACES, DBA_DATA_FILES, DBA_TEMP_FILES
USER_SEGMENTS
DBA_USER

DBA_TS_QUOTAS
```

## 현재 connection 조회 쿼리

```sql
SELECT Substr(username,1,12) username,
  SUBSTR(program,1,15) program,
  status,
  SUBSTR(To_Char(logon_time, 'day hh24:mi:ss'),1,15) logon_time,
  TRUNC(last_call_et/60) idle_minutes
 FROM v$session
 WHERE username IS NOT NULL
 AND username <> 'SYS'
 And username <> 'SYSTEM';
```

## Related
- [[jdbc]]
- [[jdbc-url]]
- [[no-sql]]
