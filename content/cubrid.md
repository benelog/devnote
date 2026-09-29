## 페이징 쿼리

```sql
order by column for orderby_num() between 1 and 20
```

## 함수

```
ifnull --> nvl
now() --> sys_timestamp
dual --> db_root
```

## 날짜함수

```sql
TO_DATE( ? ,'YYYYMMDD')

SELECT to_date('11/16/2001') FROM db_root;
SELECT to_date('2001 11 16', 'YYYY MM DD') FROM db_root;

SELECT to_time('10:30:20 AM') FROM db_root;
SELECT to_time('HOUR: 10 MINUTE: 30 SECOND: 20', "HOUR:" HH24 " MINUTE:" MI "SECOND:" SS') FROM db_root;

SELECT to_timestamp('10:30:20 AM 12/25/2003') FROM db_root;
SELECT to_timestamp('YEAR: 2003 MONTH: 12 DAY:25 HOUR:10 MINUTE:30 SECOND: 20',
    '"YEAR:" YYYY  "MONTH:" MM  "DAY:" DD "HOUR:" HH24  "MINUTE:" MI
    "SECOND:" SS') FROM db_root;
```

## 자동증가

```sql
CREATE CLASS board1(
  idx INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL);
```

## Alter table

```sql
alter table gas_station rename COLUMN gas_station_seq as gas_station_seq_old;
alter table gas_station add COLUMN gas_station_seq  INTEGER NOT NULL;
```

## index 추가

```sql
CREATE INDEX index_web_doc_no
ON buz_web_doc ( web_doc_no)
```

## DataSource

`cubrid.jdbc.driver.CUBRIDDataSource`

```
Your transaction (index 4, dba@pandora|12977) has been unilaterally aborted by the system.
```

## Related
- [[db]]
- [[dbms-compare]]
- [[jdbc]]
- [[sql]]
