출처 : <http://blog.naver.com/uxtrazom>

## 1. Data type

### Oracle

| Datatype | 설 명 |
|----|----|
| VARCHAR2(size) | size 만큼 2000개까지 문자열 데이터 저장. 가변형. |
| CHAR(size) | size 만큼 255개 문자까지 문자열 데이터 저장. 고정형. |
| NUMBER | 실수형 데이터 저장 NUMBER(p,s) |
| NUMBER(p,s) | 숫자데이터를 저장. p는 최대자리수, s는 소수점 이하 자리수 |
| DATE | BC 4712년 1월 1일부터 AD 4712년 12월 31일까지의 날짜를저장<br>* 기본 날짜 형식은 'DD-MON-YY' 임 |
| LONG | 2GB의 문자까지 문자열 데이터를 저장. |
| 비고사항 | * CHAR과 VARCHAR2의 사용<br>- 데이터의 update가 잦은 칼럼은 char형은 씀.<br>- 한 칼럼에서 고정된 길이의 데이터를 입력할 경우는 char형, 가변형길이의 데이터를 입력할 경우는 varchar를 사용. |

### MS-SQL

| Datatype | 설 명 |
|----|----|
| VARCHAR2(size) | 가변길이 문자열. 자신의 실제길이로 저장됨. |
| CHAR(size) | 고정 문자열, 최대값은 8000 |
| NCHAR(n) | 고정길이 유니코드 문자셋 저장. CHAR는 1바이트를 사용함에비해, NCHAR는 2바이트를 사용. 최대 4000. |
| NVARCHAR(n) | 가변길이 유니코드 문자셋. |
| TEXT(n) | 최대 2GB까지의 고정길이 문자열 저장 |
| NTEXT(n) | 큰 가변 길이 문자 데이터 저장. TEXT는 1바이트, NTEXT는 2바이트사용. |
| INT | 정수값 표현. 4바이트. |
| SMALLINT | 정수값 표현. 2바이트(-32768~32767 |
| TINYINT | 음이 아닌 정수값 표현. 1바이트(0~255) |
| DECIMAL(p,[s]) | 고정 소수점 값. |
| NUMBER(p,[s]) | DECIMAL과 동의어. |
| REAL | 부동소수점 값 |
| FLOAT[(p)] | 부동소수점 값 |
| MONEY | 화폐값을 표현 하는 데 사용. 8바이트 |
| SMALLMONEY | MONEY와 같지만, 4바이트 사용. |
| DATETIME | 4바이트의 정수값으로 저장되는 DATE와 TIME을 저장. |
| SMALLDATETIME | 2바이트의 정수값으로 저장되는 DATE와 TIME을 저장 |

### Informix

| Datatype | 설 명 |
|----|----|
| VARCHAR(a,b) | 가변길이 문자열. 자신의 실제길이로 저장됨. Max 255 |
| CHAR(size) | 고정 문자열, 최대값은 32767 byte |
| TEXT | 최대 2GB까지의 고정길이 문자열 저장 blobspace공간을 만들어저장하는 것이 IO향상됨 |
| Byte | 최대 2Gb까지의 바이너리 데이터 저장blobspace공간을 만들어별도로 저장 |
| INT | 정수값 표현. 4바이트. |
| SMALLINT | 정수값 표현. 2바이트(-32768~32767 |
| SERIAL | 서버에 의해 자동적으로 1씩 증가 내부적 int와 동일 |
| DECIMAL(p,[s]) | 고정 소수점 값. ? 숫자형은 모두 decimal로 하는 것이 좋다.엔진에서 decimal로 처리 |
| REAL | 부동소수점 값 |
| FLOAT | 16자리 부동소수점 값 |
| SMALLFLOTE | 8자리 부동 소수점 |
| MONEY | 화폐값을 표현 하는 데 사용. Decimal 형태로 저장되며 $와 소수점뒤에 두자리 표시 DBMONY='\';export DBMONEY |
| DATETIME INTERVAL | 4바이트의 정수값으로 저장되는 DATE와 TIME을 저장. |
| DATE | 2바이트의 정수값으로 저장되는 DATE만 저장 DBDATE=y4md/;exportDBDATE |

### SQL3 type

Informix 9.x, oracle 8.x이상 버젼에서 비정형 데이더를저장, 검색하기 위한 확장형 타입과 ORDBMS의 특징인 object type을지원한다.

- clob : 문자열 데이터를 저장
- blob : 바이너리 데이터를 저장
- list, multiset, set : 한 컬럼에 여러 데이터 저장
- named row type, unnamed row type : type을 상속받아 테이블을생성할 수 있음
- user define function 및 user define type을 생성
- cast 함수를 이용하여 type의 확장지원
- Informix : lvarchar,int8,Serial8 type 새롭게 지원

## 2. 데이터 저장 공간

- Oracle
  - 데이터베이스(oracle instance당 한 개가 존재) > 테이블스페이스(system, nonsystem tablespace로 나누어 장치간 적절히스토리지를 분배해야 함, 물리적인 공간) > 세그먼트 ( 테이블세그먼트, 인텍스 세그먼트, 임시세그먼트, 롤백세그먼트 :tablespace에 있는 여러 datafile에 걸처서 생성할 수 있음) > datafile(물리적 공간) > 익스텐트( 연속된 블록의 집합 ) > 데이터 블록 (가장 작은단위의 저장공간)
- MS-SQL
  - 데이터 베이스 ( system database : master,tempdb,msdb,model userdatabase로 나누며 user database는 여러 개 생성할 수 있음 ) > 주데이터 파일( .mdf ), 보조 데이터 파일( .ndf), 로그 데이터 파일 (.ldf ) > 익스텐트 > 블럭
- Informix
  - dbspace ( system, nonsystem dbspace로 구별하여 생성해야 함 ) > chunk (물리적인 데이터 공간) > database ( 한 dbspace에 여러 개의데이터베이스 생성 가능 ) > chunk(물리적은 공간 cook device, rawdevice로 구성할 수 있음) > tablespace ( extent들의 연속된 공간 ) > extent > page

## 3. 테이블 정보 보기 및 sql query tool

Oracle - sqlplus를 이용해서 server에 connection

```sql
SELECT * FROM tab;
DESC table_name
```

MS-SQL

- Enterprise Manager를 이용해서 비주얼 볼 수 있음

Informix - dbaccess를 이용해서 볼 수 있음.

- Dbaccess -> 메뉴에서 table -> database선택 -> table선택.
- Dbshcema 툴을 이용
  - `dbschema -ㅇ >>filename` 하여 filename을 vi로 열어본다.
  - 옵션을 보려면 `dbschema - -`

## 4. SQL 문 이용 가이드

### 4.1 NULL

비고 : oracle,Informix 동일

- 이용할 수도 없고, 값이 할당되어 있지도 않고, 알려져 있지않은 또는 적용불가능한 값을 의미.
- 0이나 공백(space)와 같은 것이 아님.
- NULL 값을 포함한 산술 표현식 결과는 NULL임.

NVL 함수 이용.

- NULL 값은 NVL함수를 이용하여 다른 값으로 대치할 수 있음.
- 사용가능한 datatype은 날짜, 문자 및 숫자형.
- 구문 : NVL(expr1, expr2)
  - expr1 : 널값을 포함할 수 있는 값이거나 표현식
  - expr2 : 널값을 전환하여 사용할 값

```sql
NVL(hiredate, '01-JAN-95')
NVL(job, 'FRESH MAN')
NVL(comm, 1000)
```

권장 사항 : nvl함수를 자주 쓰는 것은 성능에 걸림돌이 될 수 있음.따라서 컬럼에 공백이 들어가지 않도록 하는 것이 성능향상에좋다.table을 생성할 때 default값을 주어 nvl 함수대신 default값을가지고 구분할 수 있도록 한다.

### 4.2 합성문자

비고 : oracle,Informix 동일

- 칼럼과 문자 또는 칼럼과 다른 칼럼을 연결
- 두 개의 수직바(||)에 의해 이루어짐.
- 문자 표현식의 결과에 의해 새로운 칼럼이 생성됨.

```sql
SELECT ename||ename
FROM emp;
```

- Literal 이란 SELECT 리스트에 포함된 문자, 표현식 또는숫자임.
- 날짜 및 문자값은 단일 인용부호로 둘러쌈.

```sql
SELECT job||' is job of '||ename FROM emp;
```

### 4.3 조건절 사용

Oracle

- 비교 연산자 : =, >, >=, <, <=
- SQL 연산자
  - between .....and... : 두 값사이의 값
  - in(list) : 리스트 중 하나와 같은 값을 가지는 값
  - like : 문자 패턴과 일치하는 값
  - is null : 널값인 것
- 논리 연산자 : and, or, not ( 우선순위 and -> or )
- 부정 연산자
  - 비교 연산자 : !=(VAX,UNIX, PC), ^=(IBM), <>(all OS)
  - SQL 연산자 : not between....and...., not in(list), not like, isnot null

Informix

- 부정 비교 연산자는 <>를 쓴다.
- Like는 %만을 이용하여 검색 가능하며, matches는 *만을이용한다.

### 4.4 함수

**Oracle**

구문

- function_name(column|expr, [arg1, arg2,....])
  - function_name : 함수의 이름
  - column : 데이터베이스에 존재하는 칼럼명
  - expr : 어떤 문자열 또는 계산된 표현식
  - arg1, arg1,... : 함수에 의해 사용될 인수
- 함수는 데이터 값을 조작함.
- 인수를 받아들여 한 개의 값을 return
- 각각의 행에 적용됨.
- 행당 하나의 결과를 돌려줌
- datatype을 바꾸어 줌.
- 중첩하여 사용하는 것이 가능함.

문자함수

- LOWER(column/expr) : 알파벳 문자를 소문자로 바꾸어 줌.
- UPPER(column/expr) : 알파벳 문자를 대준자로 바꾸어 줌.
- SUBSTR(column/expr,m[, n]) : 문자값 중에서 m위치에서 n 문자길이에해당하는 문자를 돌려줌. Informix 에서는 substr을 써야만 index를탄다.
- LENGTH(column/expr) : 문자개수를 값으로 돌려줌.
- NVL(expr1, expt2) : 첫번째 값이 널이면 두번째 값으로 바꾸어줌.
- LTRIM(' lee'); 공백을 왼쪽으로 밀어준다.
- RTRIM('Lee ');

```sql
SELECT ename, job, deptno FROM emp WHERE lower(job) ='clerk';
```

숫자함수

- ROUND(column/expr, n) : column/expr의 값을 소수점 n자리까지반올림. n이 없으면 소수점은 없어지고, 음수라면 소수점의왼쪽자리만큼 반올림됨.
- TRUNC(column/expr, n) : column/expr의 값을 소수점 n자리까지 버림n이 없으면 소수점은 없어지고, 음수라면 소수점의 왼쪽자리만큼버림.
- MOD(m, n) : m값을 n으로 나누고 남은 나머지를 return

날짜함수

- date + number : 날수를 날짜에 더함. 결과는 date.
- date - number : 날짜에서 날수를 뺌. 결과는 date.
- date - date : 날짜에서 날짜를 뺌. 결과는 날수.
- date + date/24 : 시간을 날짜에 더함. 결과는 date
- MONTHS_BETWEEN(date1, date2) : 두 날짜 사이의 달수를찾아줌.
- ADD_MONTHS(date, n) : 날짜에 n달을 추가
- NEXT_DAY(date, 'char') : date 다음의 첫번째 해당요일('char')일자.
- LAST_DAY(date) : date를 포함하고 있는 달의 마지막날

```sql
select ename,(sysdate-hiredate)/7 weeks from emp where deptno =20
oder by week;
```

전환함수

- 숫자 또는 날짜값을 fmt 모델을 사용하여 varchar2 문자열로바꿈.
- TO_CHAR(date, 'fmt')
  - fmt 형식모델은 단일 인용부호로 에워싸야 하고, 대소문자 구별이있음.
  - 형식 모델은 어떠한 날짜 형식 요소도 포함할 수 있고, 날짜값은 콤마에 의해 구분됨.
  - 결과에 일, 월의 이름은 자동적으로 공백으로 덧붙여 짐.
  - 공백 및 선행제로를 없애기 위해서는 'fm'을 사용
- TO_CHAR(number, 'fmt') - 대소문자 구별
  - 9 : 숫자위치(9의 수는 폭을 결정)
  - 0 : 0을 나타냄
  - $ : 달러기호 예) `to_char(sal,'fm$9,999,999')`
  - . : 위치에 소수점(999.999 --> 123.2)
  - , : 위치에 콤마 (999,999,999 --> 1,234)

```sql
select ename, to_char(hiredate, 'fmDD "of" Month YYYY') start_date from emp
where hiredate like '%87';
-- soctt 19 of April 1987 <- 결과값
```

- TO_NUMBER 함수
  - `to_number(char)` 예) `to_number(to_char(empno))`
- TO_DATE 함수
  - `to_date(char[, 'fmt'])` 예) `to_date('1981/05/10','yyyy/mm/dd');`

그룹함수

- 그룹당 하나의 결과를 return
- 그룹함수들은 SELECT 절 및 HAVING 절에 쓸 수 있음.
- SELECT 문장에서 GROUP BY 절은 행들을 작은 그룹으로 나눔.
- HAVING 절은 그룹을 제한함.

그룹함수의 종류

- AVG() : 널값을 제외한 행의 평균값
- COUNT() : 행의 개수. expr은 널값이 아닌 것을, '*'를 사용하면 중복및 널값을 갖는 것도 포함.
- MAX() : 최대값 : 어떤 데이터 type도 쓴다.
- MIN() : 최소값: "
- STDDEV() : 널값을 제외한 표준편차
- SUM() : 널값을 제외한 합계
- VARIANCE() : 널값을 제외한 분산

**Informix**

| 구분 | 함수명 | 구문 | 설명 | Ver. |
|----|----|----|----|----|
| 날자함수 | DATE | DATE(char1) | 비날자형 값을 날자로 변환 | ALL |
| | DAY | DAY(d1) | 날자형값중 일을 구함 | ALL |
| | MONTH | MONTH(d1) | 날자형값중 월을 구함 | ALL |
| | WEEKDAY | WEEKDAY(d1) | 날자형값중 요일을 구함 | ALL |
| | YEAR | YEAR(d1) | 날자형값중 년을 구함 | ALL |
| | EXTEND | EXTEND(d1 | 날자형값을 지정한 길이로 조정함 | ALL |
| | MDY | | 비날자형 값을 날자로 변환 | ALL |
| 산술함수 | ABS | ABS(n) | n의 절대값 구함 | ALL |
| | MOD | MOD(m,n) | m을 n으로 나눈 나머지 구함 | ALL |
| | POW | POW(m) | 값의 n제곱 구함 | ALL |
| | ROOT | ROOT(m) | 제곱근 구함 | ALL |
| | ROUND | ROUND(m,n) | m의 값을 n자리수 위치 기준으로 반올림 | ALL |
| | SQRT | | | ALL |
| | TRUNC | TRUNC(m,n) | m의 값을 n자리수 위치 기준으로 반올림 | ALL |
| 로그함수 | EXP | | | ALL |
| | LOGN | | | ALL |
| | LOG10 | | | ALL |
| 삼각함수 | SIN | | SIN 함수 | ALL |
| | COS | | COS 함수 | ALL |
| | TAN | | TAN 함수 | ALL |
| | ASIN | | | ALL |
| | ACOS | | | ALL |
| | ATAN | | | ALL |
| | ATAN2 | | | ALL |
| String 함수 | LENGTH | LENGTH(char1) | Charter 길이 구하기 | ALL |
| | TRIM | TRIM(char1) | 공백 자르기 | ALL |
| 집계함수 | COUNT | COUNT(*) | 건수 구하기 | ALL |
| | AVG | AVG(m) | 평균 구하기 | ALL |
| | MIN | MIN(n) | 최소값 구하기 | ALL |
| | MAX | MAX(m) | 최대값 구하기 | ALL |
| | SUM | SUM(n) | 합 구하기 | ALL |
| | RANGE | RANGE(m) | 최대값과 최소값 차 구하기 | ALL |
| | STDEV | STDEV(n) | 표준편차 구하기 | ALL |
| | VARIANCE | VARIANCE(m) | 분산 구하기 | ALL |
| 기타함수 | DBINFO | DBINFO(KEYWORD) | | ALL |
| | TODAY | | 오늘날자 | ALL |
| | CURRENT | | 현재 날자+ 시분초 | ALL |
| | USER | | 사용자 이름 | ALL |
| | SITENAME | | HOST명 구하기 | ALL |
| | DBSERVERNAME | | INFORMIXSERVER 명 구하기 | ALL |
| | NVL | NVL(m,n) | m값을 검사 NULL 이면 n값을 Return | 7.3Y |
| | DECODE | DECODE(c1,a1,A1,b1,B1,c1,C1,D1) | Multi-Case 문 | 7.3Y |
| | CASE | | SELECT 문에서 CASE 비교 | 7.3Y |
| | INITCAP | INITCAP(char1) | 첫글자 대문자 | 7.3Y |
| | UPPER | UPPER(char1) | 대문자로 | ALL |
| | LOWER | LOWER(char1) | 소문자로 | ALL |
| | REPLACE | REPLACE(char1,search_string[,replacement_string]) | search_string 의 각 문자를 대응하는 replacement_string 으로치환 . replacement_string이 미지정이면 serach_string 을 제거 | 7.3Y |
| | SUBSTR | SUNSTR(char,m[n] | char의 m번째 문자부터 n개의 문자를 취한다 . | 7.3Y |
| | LPAD | LPAD(char1,n,[char2]) | Char1의 왼쪽에 Char2를 덧붇여 전체가 n문자로 되도록한다 .Char2가 미지정이면 blank 적용 | 7.3Y |
| | RPAD | RPAD(char1,n,[char2]) | Char1의 오른쪽에 Char2를 덧붇여 전체가 n문자로 되도록한다 .Char2가 미지정이면 blank 적용 | 7.3Y |
| SPL로 제공되는 함수 | CEIL | | n 보다 크거나 같은 최소 정수 | |
| | NEXT_DAY | | | |

### 4.5 Having절의 사용

Having 절에 조건을 줌으로서 그룹을 제한할 수 있다.

예) job이 vp로 시작하지 않는 사람들을 job별로 급여의 합계를구한다음 급여합계가 5000이상인 job과 그 합계를 구하라.

```sql
Select job,sum(sal) payroll from emp
Where job not like 'VP%' Group by job having sum(sal) >5000;
```

### 4.6 JOIN

Join을 쓰는 목적은 Cartesian product를 막고 정규화 된 테이블 간데이터를 가져올 때.

오라클

1. equi join
   - join시 table alias를 주어서 쓰는 것이속도 향상에 좋음.
2. non-equijoin
3. self join
   - 같은 테이블에 대해 두개의 가명을줌.
4. outer join : 정상적으로 조인 조건을 만족하지 못하는 행들을 보기위해
   - outer join의 연산자는 (+)를 붙임..모자라는 곳에 붙임..in 명령어 사용 못함.

SQL은 **inner**,outer join이라고명령을 써준다.

### 4.7 SubQuery

- subquery는 다른 SQL 문장안에 존재하는 SELECT 구문을 말함.
- 주 질의가 실행되기 전에 일단 한번 먼저 실행되어 그 결과는 주질의의 조건으로 사용됨.
- subquery에는 ORDER BY 절을 사용할 수 없음.

```sql
SELECT select_list
FROM tables
WHERE expr operator (SELECT select_list FROM table);
```

오라클은 where 조건절 및 from절에도 subquery ( inline View )를실행할 수 있지만 informix는 inline view가 지원되지 않는다.

### 4.8 HINT 사용

Informix

- SQL을 어떠한 방법으로 실행할 것인가를 결정을 optimizer에게 지시
- index, join 방법을 지정할 수 있다.
  - INDEX, AVOID_INDEX, FULL, AVOID_FULL
  - ORDERED : join의 대상 테이블에 대한 join순서를 테이블 순서대로하도록 한다.
  - USE_NL,AVOID_NL,USE_HASH, AVIOD_HASH : NL은 nested loop join을말함.
  - FIRST_ROWS, ALL_ROWS (default)
  - FIRST N 질의 결과 중 n개의 row를 가져옴.

```sql
-- 1.
select --+ index(esalary_index) name,salary from emp e
where e.dno=1 and e.salary >50000;

-- 2.
select {+ avoid_full(e), index(esalary_indx) } name, salary
where e.dno = 1 and e.salary >50000;

-- 3.
select --+ ORDEREDname,title,dept
from dept,job,emp where title = 'aaa'and emp.dno = dept.dno;

-- 4.
select --+ first_rows name,age from employee e,department
where e.dept_no = d.dept_no;
```

### 4.9 ROWID

- 각 행의 주소를 반환하며, 반환되는 데이터는 ROWID 데이터타입을가짐.
- ROWID는 행에 접근하는 가장 빠른 방법임.
- 어떻게 테이블의 데이터 행들이 저장되었는 지 보여주고, 한 테이블의각 행에 유일성을 줌.

```sql
Select rowid,ename from emp;
```

### 4.10 ROWNUM

오라클

- 검색될 테이블의 칼럼 데이터 행의순서를 반환하는 pseudocolumn이며, 첫번째 행은 1로 시작.
- ROWNUM을 이용하여 반환되는 행의 수를 제한할 수 있음

예) 사원중 급여를 적게 받는 사람 순서대로 다섯명을 나타내라.

```sql
select ename,sal from ( select ename, sal from emp group by sal,ename)
where rownum <= 5;
```

subquery에서는 order by를 쓸 수없으므로 같은 역할을 하는 group by를 이용

Informix

자체적인 함수가 제공되지 않는다.하지만 Informix ius 9.x버전부터 지원되는 UDF (user definefunction)을 만들어 활용할 수 있음.

SQL : top n [percent]구문

- 순위별로 체크하여 반환되는 행의수를 제한할 수 있음.
- 행의 개수를 쓰거나 percent 구문을 이용
- with ties : 마지막 등수가 여러명일 때

```sql
select top 4 with ties employeeID, LastName, HireDate
from Employees order by hiredate desc
```

### 4.11 테이블 생성

ansi 표준으로 만드는 것이 좋음.

Oracle: subquery를 이용한 테이블 생성방법

- As subquery를 이용하여 테이블 생성
- subquery에서의 컬럼수와 생성하는 컬럼이 일치해야 함.
- 컬럼명과 default 값, 무결성 제약조건만이 subquery를 이용해생성됨
- NOT NULL 만이 복사됨

```sql
create table emp_20 AS select empno,emame,hiredate,job
from emp where deptno = 20; -- 데이터 까지 복제..
```

Informix :

테이블을 DataBase가 저장된 space외에 다른 space에 생성할 수 있을뿐만 아니라 컬럼까지도 다른 space에 저장할 수 있다.

```sql
create table aaa ( a int, b char(10) in space2);
```

성능 향상 법 : 모든 DBMS에서 테이블을 생성시 테이블 저장량을예측하여, extend size 및 저장할 곳을 적절히 분산하여 생성해야 한다.또한 index 저장 할 곳도 각 DBMS성격에 맞게 구축해야 한다.

테이블이 대용량일 경우는 분할 하여 저장하는 것이 좋다.

분할 방법 :

- 가급적 remainder를 쓰지 않는다.
- 여러 디스크에 분산하여 설계한다.
- Expressino의 조건은 가급적 숫자형 type( date포함 )하는 것이좋다.
- 테이블 전체에 거처 조회가 된다면 round robin방법을 쓰는 것이좋다.
- 인텍스는 fragment하지 않고 별도의 dbspace 한곳에 저장한다.
- 100만 건 이상의 테이블을 고려 대상으로 한다.

1. round robin방법 : 컬럼이 insert시 dbs1,dbs2,dbs3에 순차적으로저장

```sql
create table rtable ( col_1 int,cal_2 char(20) )
fragment by round robin in dbs1,dbs2,dbs3
extent size 10000 next size 3000;
```

2. expression 방법 : 조건을 주어 조건에 맞는 space에 저장

```sql
create table rtable ( col_1 int,cal_2 char(20) )
fragment by expression
col_1 <=100 and col_1 >=1 in dbs1
col_1 <=200 and col_1 > 100 in dbs2
remainder in dbs3 ;
```

3. hash 방법 : DBMS의 function을 이용해 space에 저장

```sql
create table rtable ( col_1 int,cal_2 char(20) )
fragment by expression
mod(col_1,3) = 0 in dbs1
mod(col_1,3) = 1 in dbs2
mod(col_1,3) = 2 in dbs3 ;
```

### 4.12 인덱스 생성 조건

- 컬럼이 WHERE 절이나 join 조건에 자주 사용되어야 함
- 컬럼이 넓은 범위의 값을 가지고 있어야 함
- 컬럼이 null value를 많이 가지고 있어야 함
- 두 개나 그 이상의 컬럼이 같이 WHERE절이나 join조건에 자주사용되어야 함
- 테이블이 매우 크고, 대부분의 질의결과가 행들중 10~15%만을가져오는 것이 좋음
- 많은 인덱스는 항상 질의속도를 높이지는 않음
- 테이블이 만약 다음과 같은 조건이라면 인덱스를 생성하는 것이 좋지않음
  - 테이블이 너무 작음
  - 컬럼이 질의에서 조건절에 자주 사용되지 않음
  - 대부분의 질의결과가 10~15% 이상의 행들을 결과로 가져옴
  - 테이블의 변경이 자주 일어나는 경우

### 4.13 시스템 권한

Oracle

권한부여

- 80개 이상의 권한이 있음
- DBA(Database Administrator)는 상위 레벨의 시스템 권한을가짐
  - 새로운 사용자 생성 : CREATE USER(다른 사람에게 유저를 생성할 수있는 권한을 줄 수도 있음)
  - 사용자 삭제 : DROP USER
  - 테이블 삭제 : DROP ANY TABLE(어떤 사람의 테이블도 삭제할 수있음)
  - 테이블 백업 : BACKUP ANY TABLE(export utility를 이용하여 어떤사람의 테이블도 백업할 수 있음)
- DBA는 CREATE USER 명령을 통해 사용자를 생성함

```sql
CREATE USER user_name IDENTIFIED BY password;
ALTER USER user_name IDENTIFIED BY password;
```

- 사용자를 생성하면 DBA는 GRANT 명령을 실행하여 사용자에게 권한을부여할 수 있음
- 사용자는 다음의 시스템 권한을 가짐
  - CREATE SESSION : 시스템에 접속할 수 있도록 함.
  - CREATE TABLE : 테이블을 생성할 수 있도록 함
  - CREATE SEQUENCE : 시퀀스를 생성할 수 있도록 함
  - CREATE VIEW : 뷰를 생성할 수 있도록 함
  - CREATE PROCEDURE : 프로시져를 생성할 수 있도록 함
- 구문

```sql
GRANT privilege [,privilege,....] TO user_name [, user....];
```

Role

- Role이란 사용자에게 줄 수 있는 연관있는 권한들을 모아둔 그룹을말함
- role을 사용함으로써 사용자에게 권한을 주고 다시 회수하는 것을쉽게 다룰 수 있음

```sql
CREATE ROLE role_name;
grant create table,create view to man;
grant man to kim
```

권한 회수

- revoke 명령어를 사용

Informix

- 별도의 DB유저를 생성하지 않고system 유저를 이용. 따라서 system에 유저를 생성하고 로긴 스크립트(.cshrc , .profile, NT의 글로벌 변수)에 인포믹스 유저의 스크립트를copy하는 것으로 작업 종결.
- DBA는 informix로 login 했을때 부여 되며, 각 유저의 권한을 설정할수 있음.
  - DBA,RESOURCE,CONNECT 의 권한을 부여할수 있으며, DB level, table level의 DML 작업 권한을 부여 할 수있음.
- 뒤에 자세히 설명

SQL

- user 관리는 두가지 방법을 제공함
  - Database에 생성 방법과 system유저를 이용하는 방법
  - 처음 설치 시 user생성 방법을 물어보며, default admin은 sa passwd는없음.

### 4.14 load, unload

UNLOAD

```sql
UNLOAD TO 파일명 SELECT 문
-- 예)
unload to 'new_cust' select * from customer where customer_num > 120;
```

LOAD

```sql
LOAD FROM 파일명 INSERT문
-- 예)
load from 'new_cust' insert into customer;
```

```
121|a|b|c|d|
122|aa|bb|cc|dd|
```

## Children
- [[informix]]

## Related
- [[db]]
- [[db-lock]]
- [[db-transation]]
- [[oracle-db]]
- [[sql]]
- [[sql-tunning]]
