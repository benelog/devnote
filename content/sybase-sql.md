## object

```
Object-Nameing  Convention
   1)  Objcet  Name
      (1) Table, default, Procedure등 모두 해당됨
      (2) 대 소문을 구분하여, 최대 30characters
      (3) Object name identify ? db, owber, table (puds2. Friend)-dbo일 경우 생략가능
   2) Transact ? SQL
      (1) 대 소문자 구분 없음(select  or  SELECT)
      (2) 축약형가능(procedure:proc, execute: exec, transaction: tran 등)
   3) 타 DB와  Join
      1>  select  a.name, b.amount from friend a, pubs ... charg b
      2> where a.id = b.id
      3> go
   4) Object 종류 - Table, View, Index, Default, Rule, Procedure, Trigger등이 있음
```

## alter table

자료출처 : <http://blog.naver.com/skytango?Redirect=Log&logNo=100005088296>

alter table시 다음과 같은 에러메시지가 나면

```
The 'select into' database option is not enabled for database 'kems'. ALTER
TABLE with data copy cannot be done. Set the 'select into' database option and
re-run.
```

```sql
use master
go
sp_dboption DB명 , "select into", true
go
use DB명
go
checkpoint
go
```

sp_dboption 할 때 다음과 같은 메시지를 보신다면...

```
The transaction log in database master is almost full. Your transaction is
being suspended until space is made available in the log.
```

```sql
dump tran master with no_log
go
```

```sql
alter table NationVisited  modify orgPriorConsultCnt  int null
```

## key constraint 더하기

```sql
ALTER TABLE CM_MAINCD ADD CONSTRAINT CM_MAINCD_PK
PRIMARY KEY ( MAIN_CD )

ALTER TABLE CMMAIN_CD ADD CONSTRAINT CM_SUBCD_FK01
FOREIGN KEY ( MAIN_CD )
REFERENCES CM_MAINCD ( MAIN_CD)
```

## temp테이블을 이용한 페이징

```sql
-- 첫번째 방법(토탈값 구할때 조인해서 구하는 방법)
SET ROWCOUNT 12000             -- 페이지 * rows

SELECT ROWNUM = IDENTITY(6),
       *
  INTO #ATHENA_DVD_USER_INFO_TEMP
FROM   ATHENA_DVD_USER_INFO
WHERE  USER_ID LIKE '1%'

SELECT A.*, B.TOTAL
FROM   #ATHENA_DVD_USER_INFO_TEMP A,
       (SELECT COUNT(*) TOTAL
        FROM   ATHENA_DVD_USER_INFO
        WHERE  USER_ID LIKE '1%') B
WHERE  ROWNUM BETWEEN 11991 AND 12000  -- (페이지- 1) * rows +1 and 페이지 * rows

SET ROWCOUNT 0

DROP TABLE #ATHENA_DVD_USER_INFO_TEMP
```

```sql
-- 두번째 방법(토탈값 구할때 DECLARE 이용해서 구하는 방법)
DECLARE @TOTAL INT
    SELECT @TOTAL = COUNT(*)
    FROM   ATHENA_DVD_USER_INFO
    WHERE  USER_ID LIKE '1%'
SET ROWCOUNT 12000             -- 페이지 * rows

SELECT ROWNUM = IDENTITY(6),
       *
  INTO #ATHENA_DVD_USER_INFO_TEMP
FROM   ATHENA_DVD_USER_INFO
WHERE  USER_ID LIKE '1%'

SELECT *, @TOTAL TOTAL
FROM   #ATHENA_DVD_USER_INFO_TEMP
WHERE  ROWNUM BETWEEN 11991 AND 12000  -- (페이지- 1) * rows +1 and 페이지 * rows

SET ROWCOUNT 0

DROP TABLE #ATHENA_DVD_USER_INFO_TEMP
```

## 동적 쿼리 만들기

검색화면에서 입력된 조건값으로

1. declare, if..else 등을 활용하여 조건별 문장을 생성
2. exec(문자열) 구문 활용하여 실행

예제) sql-mapping.xml

```sql
declare @sql varchar(40)
declare @where_cond varchar(30)

select @sql = "select  *  from ATHENA_DVD_USER_INFO"
select @where_cond = " where user_id = '11'"
exec(@sql+@where_cond)
```

## 반복문 효과 쿼리

```sql
set rowcount 0
declare @index numeric(3)
declare @rows  numeric(4)
declare @cont varchar(2000)
declare @cd  char(3)

drop table #TEMP00

select A.CD, A.CD_NM, isnull(B.CNT,0) CNT
into #TEMP00
from AM_IA_CD A,
(select ORG_CD, DISP_KIND_CD, COUNT(*) as CNT
from AM_IDEN_DISP
where ORG_CD = '090000000000' and YEAR = '2005'
group by ORG_CD, DISP_KIND_CD) B
where A.ORG_CD = B.ORG_CD
      AND A.CD = B.DISP_KIND_CD
     AND  A.CD_TYPE = 'TO03'
and A.ORG_CD = '090000000000'  and CD!='000000000'

set @index =1
set @cd  = '000'
select @rows   = count(*) from #TEMP00

set rowcount 1
while (@index <= @rows   )
begin
select @cd =  CD from #TEMP00 where CD > @cd

select @cont =  @cont + (case when @index>1 then ',' end) + CD_NM + ' ' + convert(varchar,CNT) + '건'  from #TEMP00
                              where CD > @cd
select @index = @index+1

end

select @cont
drop table #TEMP00
set rowcount 0
```

## 날짜 함수

### DATEADD

지정한 날짜에 시간 간격을 더하여 새 datetime 값을 반환

```sql
USE PUBS
SELECT * FROM Titles

SELECT title_id, title, pubdate, DATEADD(DD,10,pubdate) as '10일더함'
FROM Titles
```

### DATEDIFF

지정한 두 날짜 간에 교차되는 날짜와 시간 경계값을 반환합

```sql
SELECT title_id, title, pubdate,
 DATEDIFF(yy,pubdate,getdate()) as '현재날짜와의 연도차이'
FROM Titles
```

(자세한 내용은 아래 "datediff 함수 설명" 참고)

### DATENAME

지정한 날짜의 특정 날짜 부분을 나타내는 문자열을 반환

```sql
SELECT DATENAME(dw,GETDATE()) as '요일' --결과 : 현재날짜의 요일 출력
--dw : 1~7 중 1 이 일요일
SELECT DATENAME(mm, GETDATE()) as '월'  --결과 : 8월 이므로 8 출력
```

### DATEPART

지정한 날짜의 특정 날짜 부분을 나타내는 정수를 반환

```sql
SELECT DATEPART(mm,GETDATE()) AS '월' --결과 : 8
SELECT DATEPART(dy,GETDATE()) AS '일년 중 오늘까지의 날짜 수' --결과 : 218
```

### GETDATE

현재 시스템의 날짜와 시간 반환

```sql
SELECT GETDATE()  --결과 :2004-08-05 19:02:11.420
```

### YEAR

지정한 날짜의 연도 부분을 표시하는 정수를 반환

```sql
SELECT title_id, title, pubdate,YEAR(pubdate) as '연도'
FROM Titles
```

### MONTH

지정된 날짜의 월 부분을 나타내는 정수를 반환

```sql
SELECT title_id, title, pubdate,MONTH(pubdate) as '월'
FROM Titles
```

### DAY

지정한 날짜의 일 부분을 나타내는 정수를 반환

```sql
SELECT title_id, title, pubdate,DAY(pubdate) as '일'
FROM Titles
```

### datediff 함수 설명

DATEDIFF : 지정한 두 날짜 간에 교차되는 날짜와 시간 경계값을 반환합니다.

구문

```sql
DATEDIFF ( datepart , startdate , enddate )
```

인수

datepart

차이를 계산할 날짜 부분을 지정하는 매개 변수입니다. 다음은 Microsoft® SQL Server™에서 인식하는 날짜 부분과 약어입니다.

| 날짜 부분   | 약어     |
|-------------|----------|
| Year        | yy, yyyy |
| quarter     | qq, q    |
| Month       | mm, m    |
| dayofyear   | dy, y    |
| Day         | dd, d    |
| Week        | wk, ww   |
| Hour        | hh       |
| minute      | mi, n    |
| second      | ss, s    |
| millisecond | ms       |

startdate

계산의 시작 날짜입니다. startdate는 날짜 형식에서 datetime 또는 smalldatetime 값이나 문자열을 반환하는 식입니다.

smalldatetime은 분 단위로만 정확하므로 smalldatetime 값을 사용할 경우 초와 밀리초는 항상 0입니다.

연도의 마지막 두 자리 숫자만 지정할 경우 two digit year cutoff 구성 옵션 값의 마지막 두 자리 숫자보다 작거나 같은 값은 구분 기준 연도와 같은 세기에 해당합니다. 이 옵션 값의 마지막 두 자리 숫자보다 큰 값은 구분 기준 연도보다 이전 세기에 해당합니다. 예를 들어, two digit year cutoff가 2049(기본값)일 경우 49는 2049년으로 해석되고 2050은 1950년으로 해석됩니다. 이러한 애매함을 피하기 위해 네 자리 연도를 사용하십시오.

시간 값 지정에 대한 자세한 내용은 시간 형식을 참조하십시오. 날짜 지정에 대한 자세한 내용은 datetime 및 smalldatetime을 참조하십시오.

enddate

계산의 종료 날짜입니다. enddate는 날짜 형식에서 datetime 또는 smalldatetime 값이나 문자열을 반환하는 식입니다.

반환 형식 : integer

비고

enddate에서 startdate를 뺍니다. startdate가 enddate보다 크면 음수 값이 반환됩니다.

DATEDIFF의 경우, 결과가 정수 값의 범위를 벗어나면 오류가 발생합니다. 밀리초의 경우, 최대값은 24일, 20시간, 31분, 23.647초입니다. 초의 경우, 최대값은 68년입니다.

분, 초, 밀리초 등 교차된 경계값을 계산하는 방법은 DATEDIFF의 결과가 모든 데이터 형식에서 일관성을 유지시킵니다. 결과는 첫 번째 날짜와 두 번째 날짜 사이에 겹쳐지는 datepart 경계값에 해당하는 부호 있는 정수값입니다. 예를 들어, 1월 4일 일요일과 1월 11일 일요일 사이의 주 수는 1입니다.

예제

다음은 pubs 데이터베이스의 titles 테이블에 대해 현재 날짜와 출판 날짜 간의 일 수 차이를 확인하는 예제입니다.

```sql
USE pubs
GO
SELECT DATEDIFF(day, pubdate, getdate()) AS no_of_days
FROM titles
GO
```

## 날짜형(datetime)의 문자열 변환시 style number

subase에서 `select convert(varchar,getdate(),112)`로 찍어보면 오늘 날짜가 20070831 형식으로 나오죠. 이런 형식들이 정리된 자료를 한 번 만들어 보았습니다.

제가 쓰는 sybase 버전은 12.5.3입니다. (`select @@version`)으로 확인할 수 있죠)

`select convert(varchar,날짜데이터, convertType)` 형식으로 쓰고 ***convertType*** 위치에 숫자가 들어갈 때 옆에 적힌 형식대로 나온다고 보시면 됩니다. 예시로 옆에 찍힌 날짜는 2007년 8월27일입니다.

### Style number

```
0 = Aug 27 2007  5:28PM
1 = 08/27/07
2 = 07.08.27
3 = 27/08/07
4 = 27.08.07
5 = 27-08-07
6 = 27 Aug 07
7 = Aug 27, 07
8 = 17:23:35
9 = Aug 27 2007  5:28:08:563PM
10 = 08-27-07
11 = 07/08/27
12 = 070827
13 = 07/27/08
14 = 08/07/27
15 = 27/07/08
16 = Aug 23 2007 17:28:08
18 = 15:17:08
19 = 5:11:39:086PM
20 = 17:12:30:633
21 = 07/08/27
22 = 07/08/27
100 = Aug 27 2007  5:28PM
101 = 08/27/2007
102 = 2007.08.07
103 = 27/08/2007
104 = 27.08.2007
105 = 27-08-2007
106 = 27 Aug 2007
107 = Aug 27, 2007
108 = 17:28:08
109 = Aug 27 2007 5:28:08:563PM
110 = 08-27-2007
111 = 2007/08/27
112 = 20070827
113 = 2007/27/08
114 = 08/2007/27
115 = 27/2007/08
116 = Aug 23 2007 17:28:08
```

### 응용

오늘날짜를 YYYYMMDD로

```sql
select convert(char,GETDATE(),112)
```

현재 날짜 하루전을 yymmdd형식으로 출력

```sql
select convert(char(8), DATEADD(DD,-1,getdate()) ,112)
```

2007년 8월 27일 전날을 출력. string -> datetime은 convert라는 함수를 사용하지 않고 내부적(implicit)으로 자동으로 변경됩니다

```sql
select convert(char(8), DATEADD(DD,-1,'20070827') ,112)
```

현재 분일초,밀리세컨드까지: 152515853

```sql
select str_replace( convert(varchar,getdate(),20),':',null)
```

현재 연월일시분초밀리세컨드를 다 붙여서

```sql
select convert(varchar,GETDATE(),112) || str_replace( convert(varchar,getdate(),20),':',null)
```

## 문자 함수

### 문자치환

```sql
declare @STR1 varchar(100), @STR2  varchar(100), @STR3 varchar(100)
set @STR1 = '가나다라마바사아 인간은 8020가나다라'
set @STR2 = '8020'
set @STR3 = '8010'

select @STR1

select str_replace(@STR1,@STR2,@STR3)
```

복잡하게 하면

- <http://infocenter.sybase.com/help/index.jsp?topic=/com.sybase.help.ase_15.0.blocks/html/blocks/blocks213.htm>

```sql
select substring(@STR1, 1, charindex(@STR2 ,@STR1) -1) + @STR3
+ substring(@STR1, charindex(@STR2 ,@STR1) + datalength(@STR2), datalength(@STR1))
```

### 특정 문자 근처를 출력

```sql
declare @STR1 varchar(100), @KEYWORD  varchar(100)
set @STR1 = '가나다라마바사아 인간은 가나다라'
set @KEYWORD = '인간'
select substring(@STR1, charindex(@KEYWORD ,@STR1) - 3, datalength(@KEYWORD) + 3 )
```

### 문자반복

```sql
SELECT REPLICATE('0', 3 - DATALENGTH(c1)) + c1 AS [Varchar Column], REPLICATE('0', 3 - DATALENGTH(c2)) + c2 AS [Char Column] FROM t1
```

## Related
- [[sybase]]
- [[sybase-training]]
- [[sybase-admin]]
- [[sql]]
