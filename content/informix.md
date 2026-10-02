## 5. 인포믹스의 무결성 기능

### 5.1. 자료의 무결성 (ISOLATION)

ISOLATION의 개요

INFORMIX-ONLINE은 shared lock를사용하여 자료를 읽을 때4가지 수준의 격리수준을 제공한다.sharedlock는 다른 프로세스에서 자료를 읽을 수 있으나자료를 갱신할 수는없다.

ISOLATION의 종류

1. DIRTY READS
2. COMMITED READ
3. CURSOR STABILITY
4. REPEATABLE READ

DB별 default level 이 있음.

- NO logging mode DB : DirtyRead,
- Logging DB : Committed Read
- ANSI DB : Repeatable Read

1) DIRTY READS

프로세스들은 자료를 읽기 전에 lock의존재 여부를 확인하지 않으면 검색시, 사용자는 DIRTY DATA라 불리우는아직 변경이 완료되지 않은 행을 볼 수도 있다. 다음과 같은 경우유용하다

- 테이블이 정적일 경우
- 자료의 정확성보다는 자유로운 자료접근이 중요한 경우
- lock가 해제되기를 기다릴 수 없는경우

2) COMMITTED READS

실제로 행들을 lock하는 것이 아니라lock할 수 있는지 만을 조사한다.

적어도 프로세스가 읽고 있는시점에서는 그 행에 대한 트랜잭션이 완료되었음을 알 수있다.

3) CURSOR STABILITY

커서를 이용하여 읽어 들이는 각 행을shared lock한다. 다음 행을 검색하기 전까지 shared lock는 해제되지않는다.

이 격리 수준에서는 트랜잭션이 완료된행만을 보게 되며현재행을 검색하고 있는 동안에는 다른 프로세스가 그행을 수정할 수 없다.

* 격리 수준을CURSORSTABILITY로설정하고, 커서를 사용하지 않는다면 CURSOR STABILITY 는 COMMITEDREAD와 같이 작동된다.

4) REPEATABLE READS

이 격리 수준은 DB서버에 의해 검색되는모든 행을 shared lock한다. 이 모든 행들은 트랜잭션이 완료되기전까지 해제되지 않는다.

다른 프로세스들은 트랜잭션이 COMMIT되기 전까지 행을 갱신할 수없다.

집계함수를 쓰는 경우에 이 level을사용하게 되며, index가 없는 경우에는 사용하지 않는 것이 좋다.

격리 수준의 설정

프로세스 격리 수준을 설정하기 위해데이터베이스는 반드시 로깅을 지정해야 하며 격리 수준을 설정하기위하여 SET ISOLATION구문을 사용한다.

```sql
SET ISOLATION TO DIRTY READ;
SET ISOLATION TO COMMITED READ;
SET ISOLATION TO CURSOR STABILITY;
SET ISOLATION TO REPEATABLE READ;
```

### 5.2 Locking

다수의 사용자가 사용하는 시스템에서두개 이상의 프로그램이 동시에 수행될 수 있으며, 이러한 병행 처리시에 locking을 사용하여 다른 사용자들간의 충돌을 방지 할 수있다.

데이터베이스 수준의 Locking

```sql
DATABASE 데이타베이스명 EXCLUSIVE;
-- 예)
database stores_demo exclusive;
```

- 여러 테이블에 갱신이 일어날 때데이터베이스 수준의 lock를 사용한다.
- 데이터베이스의 구조를 변경할 때데이터베이스 수준의 lock를 사용한다.
- 데이터베이스를 백업받을 때데이터베이스 수준의 lock를 사용한다.
- 배타적(exclusive)lock를 해제하려면데이터베이스를 close하고 다시 open한다.

테이블 수준의 Locking

```sql
LOCK TABLE 테이블명 IN { SHARE | EXCLUSIVE } MODE ;
UNLOCK TABLE 테이블명;
SET LOCK MODE TO [ NOT ] WAIT [대기시간 ] ;

-- 예)
lock table customer in exclusive mode;
unlock table customer;
set lock mode to wait 20;
```

- Share mode : 다른 사용자들로부터lock된 테이블에 자료를 select만 허용.
- Exclusive mode : 다른 사용자들로부터lock된 테이블에 접근을 방지한다.

테이블 내의 대부분의 행에 영향을 주는일괄 처리 작업을 한다면 다른 사용자들과의 충돌을 막기 위해 테이블수준의 lock를 사용한다. 테이블의 구조를 변경하거나 색인을 생성할 때테이블 수준의 lock를 사용한다.

페이지,행 수준의 Locking

테이블을 생성할 때테이블의 행들을접근 시 사용하는 lock 모드를 설정한다. Page level lock는 페이지상의 하나의 행이 lock되는 경우에도 페이지 전체를 lock한다.

Row level lock는 요청된 행만lock한다.

테이블 생성시 기본값은 page levellock이다.

- 페이지 수준의 lock는 row level 의lock보다 병행성을 감소시키지만, 보다 적은 자원(시스템에서 허용하는lock 수)을 사용한다.
- 운영 시 lock이 자주 걸린다면table을 row level 로 변경하고 sql에서는 set lock mode to wait을주어 ap가 데이터에 접근할 때 lock 걸려 있으면 waiting하고 있다가lock 풀리면 접근 할 수 있도록 프로그램 하는 것이 좋다. 또한 lock이가급적 빨리 풀릴 수 있도록 sql튜닝을 하는 것이 좋다.

### 실습(3) - 보완성,무결성

1. items 테이블을 unload한다. items 테이블의 모든 행을 삭제한다. items 테이블을 load한다. 각각의 경우 items 테이블을 검색해 보고 생성된 자료 파일도 확인해본다.
2. 두 명의 사용자가 나누어 실습한다. 데이터베이스를 생성한 사용자(DBA)가 다음 각각의 SQL문을 실행할때 다른 사용자는 데이터베이스를 connect해 본다.

```sql
-- SQL 1
revoke dba from public
revoke resource from public
revoke connect from public
```

3. DBA가 데이터베이스에 connect권한을 부여한 후 다른 사용자는 다음 SQL문을 실행시켜 본다.

```sql
-- SQL 2
create index idx_cname on customer(담당자명);
lock table orders in exclusive mode;
unlock table orders;
```

4. DBA가 데이터베이스에 resource 권한을 부여한 후 다른 사용자는 다음 SQL문을 실행시켜 본다.

```sql
-- SQL 3
create index idx_cname on customer(담당자명);
lock table orders in exclusive mode;
unlock table orders;
```

5. 다음 SQL을 실행한 상태에서 다른 사용자가 데이터베이스를 선택해본다.

```sql
-- SQL 4
database user## exclusive;
```

6. 데이터베이스를 새로 connect하고 다음과 같은 SQL을 실행해본다.

user 1

```sql
drop database user## ;
create database user## with log;
grant connect to public;
begin work;
create table test (a date);
insert into test values (today);
lock table test in exclusive mode;

rollback work;
select * from test;
```

user 2

```sql
database user##;
select * from test;
set lock mode to wait 10;
select * from test;
set isolation to dirty read;
select * from test;
```

## 6. Informix DBMS SQL 성능 향상 기법

서론

1. Set Explain 의 출력을 해석하는 방법
2. Informix Optimizer의 역할
3. 성능향상을 위한 방법

- Root Dbspace 에는 최소한의 시스템 정보만 포함할 것
- UNIX File system 공간을 큰 정렬 파일로 채우면 UNIX 프로세스에서오류가능성
- 논리LOG를 LONG TRANSACTION으로 채우지 말것 : LOG TRX주의

### 6.1. OPTIMIZER

주어진 질의를 실행하기 전 가장 좋은 최선의 경로를 찾는 INFORMIX엔진의 한 부분

SET EXPLAIN ON : OPTIMIZER가 데이타에 접근하는데 선택한 경로를나타냄

SYSTEM CATALOG의 정보를 바탕으로 결정

1. 질의에 사용되는 테이블의 행수 : systables.nrows
2. 데이타에 사용되는 페이지수와 색인에 사용되는 페이지수 : systables.npused
3. Column값의 uniqueness : sysconstraints
4. 색인존재여부 : sysindexes
5. 데이타가 색인과 같은 순서 즉, cluster index인지 여부 : sysindexes.clust
6. root node에서 leafnode 까지 색인의 레벨수
7. 각 column에서 두번째로 큰 값과 두번째로 작은 값. optimizer는 이정보로 값의 범위를 대략적으로 알아낼 수 있슴 : syscolumns.colmin,colmax

위의 정보를 바탕으로 옵티마이저는가능한 모든 경로를 검색하고 각각 비용(디스크 접근, 필요한 CPU자원,네트워크 접근 등)을 추정하여 평가함.

- 테이블 조인 순서 결정
- Sequential scan의 수행 여부
- 임시 테이블의 작성 여부
- 색인 사용 여부 결정

where절에 필터 조건이 많아지고테이블이 많이 포함되면 결정과정이 더욱 복잡해지고 정확한 통계의중요성도 커짐

통계의 정확도

- 시스템 카달로그 정보는 UPDATESTATISTICS가 실행될 때에만 갱신됨
- 동적인 테이블에 대해서는 자주실행시킬 것
- UPDATE STATISTICS는 데이타베이스전체나 개별 테이블, 테이블의 칼럼, 내장 프로시저에 대하여 실행 할 수있음.

엔진이 최적화를 수행하는 시기

- 표준 SQL로 사용될 때마다 질의가최적화됨.
- SQL문이 반복 사용될 경우 PREPARE를사용하여 한번만 최적화 시킴
- STORED PROCEDURE의 경우 PROCEDURE 가만들어지거나 내장 PROCEDURE에 대하여 UPDATESTATISTICS가 실행될 때 SQL이 최적화 됨

질의가 갑자기 느려질 때

- 프로그램이 SET EXPLAIN ON을 사용하여문제 파악

### 6.2. 개발 시 고려사항

개발하는 동안 잘 실행되는질의가 실제적용에 들어가면옵티마이저가 완전히 다른 경로를 선택할 수 있슴 --> 실제환경의데이타베이스와 비슷한 크기의 시험데이타베이스에서 같은 데이타로질의를 실행

단순 명료한 시스템 설계에 충분한 시간을 갖는다.

Optimizer는 항상 최적의 query plan을 세우는 것은 아니다. 따라서optimizer가 좋은 역할을 하도록 factor - hint 기능 사용 ( index,full scan method)를 부여한다.

ESQL/C 코딩시 onconfig 파라메터의 FET_BUF_SIZE를 32767로 늘려놓아 커서 fetch 사이즈를 늘려 놓는다.

코딩 시 prepare 구문을 사용하여 SQL을 이용한다.

- prepare 시점에 SQL문장에 대하여 미리 parsing되고 query plan이생성된다.
- Execute 시점에는 처리해야 할 값만 넘겨주면 즉시 실행된다.

```c
Exec sql prepare ins_p from "insert into customer
( customer_num,fname,lname,company)values(0,?,?,?)";

Exec SQL execute ins_p using :fname,:lname,:company
```

### 6.3. 옵티마이저 제어

- SET OPTIMIZATION HIGH : 엔진이 모든 엑세스 경로를 검사
- SET OPTIMIZATION LOW : 초기 단계에서 가능성이 적은 옵션을제거하여 최적화 시간을 줄임.그러나 최적의 경로가 될 수 있는엑세스경로가 초반에 제거되어 버릴 수 있슴

Onconfig 환경 파일의 OPTCOMPIND 파라메터 고려

- OPTCOMPIND=2 (Default) : INDEX SCAN과 FULL SCAN 비용을 비교하여가장 효율적인 경로를 선택하도록 함
- OPTCOMPIND=0 : INDEX사용
- OPTCOMPIND=1 : OPTIMIZER가 2로 설정되었을 때처럼 작동. 단REPEATABLE READ가 선택되면 OPTCOMPIND가 0으로 설정되었을 때 처럼 작동

행을 모두 SCAN하면서 읽는 동안 전체테이블을 효과적으로 공유할 수 있슴

### 6.4. 옵티마이저를 위한 데이타분산

칼럼에서 데이타표본을 채취하여테이블 영역에 관한 정보를 다양한BIN에 저장하는 것으로 이루어짐 : 대형 테이블을 다룰 경우 유용한정보가 됨. 또한 UPDATE STATISTICS명령으로 각 칼럼 분포 정보를 생성할 수 있슴

- UPDATE STATISTICS HIGH FOR : 테이블의 모든 행 평가. 느린 대신정확함
- UPDATE STATISTICS MEDIUM FOR : 데이타 표본만 추출하여 실행
- UPDATE STATISTICS LOW FOR : 데이타 분포 정보를 얻지 않음

### 6.5. UPDATE STATISTICS 실행 계획

1. UPDATE STATISTICS문을 모든 테이블에 실행
2. 복합 색인의 첫번째 칼럼이나 질의의 한 부분으로 사용된 모든칼럼에는 UPDATE STATISTICS HIGH문을 실행하거나 테이블이 클 경우에는 `update statistics medium resolution 0.0598;`을 실행한다.
3. 복합 색인의 첫번째 칼럼이 아닌 모든 칼럼에 대해서 UPDATESTATISTICS LOW를 실행
4. UPDATE STATISTICS단계를 완료하면 DBSCHEMA UTILITY의 다음OPTION을 사용하여 데이타분포정보를 확인 할 수 있슴
   - 예) `dbschema -d databasename -hd tablename`
5. 위의 내용은 fragmentation 전략에 유용하게 사용할 수 있슴
6. 대형 정적 테이블에 대해서는 UPDATE STATISTICS를 재실행할 필요가없슴

### 6.6. SQL 질의 품질보증과 최적화

1. 큰 테이블에서는 순차적 검색을 하지 않는 것이 좋음
2. 임시 정렬FILE이 크게 생성되도록 하는 질의는 사용하지 말 것
3. Correlated Subquery를 사용
4. 서로 다른 칼럼에서 사용된 OR문은 옵티마이저의 색인 사용을방해하므로 색인이 있고 질의 계획에서 옵티마이저가 순차스캔을선택하면 UNION문의 사용을 고려할 것
5. 질의 초기에 가능하면 많은 행을 제거할 것
   - UPDATE STATISTICS HIGH 를 사용하면 옵티마이저에 데이타분포에 대한정보가 추가로 제공되므로 알맞은 테이블이 먼저 제거됨. INDEX SCAN이항상최선의 방법은 아님
6. 자료형을 변환하고 문자 칼럼을 비교하는 것. 가능하면 칼럼의자료형을 숫자형으로 바꿀 것. 조인 칼럼이 문자형이면 매 행마다 한바이트씩 비교함.
7. OR, LIKE, MATCH, 함수(MONTH, DAY, LENGTH등), 부정표현(!='NOUN'), 첫 문자를 제외한 하위 열 검색(POSTCODE[4,5] >10)등은 INDEX를 사용하지 못함
8. LOGGING된 데이타베이스에서 LONG TRANSACTION을 실행하지 말것,LONG TRANSACTION은 논리로그를 채워 데이타베이스를 손상시킬 위험이있슴
   - LOCK을 지나치게 많이 사용하는 것을막으려면 테이블을 EXCLUSIVE MODE로 LOCK할 것. LOCK을 지나치게사용하면 성능이 저하되고 또한 LOCK의 최대수에 도달하면 명령문이실행되지 않음
9. 필요한 칼럼만 선택할 것. FRONT END와 BACK END간의 통신이 줄고I/O도 줄어듬. 가능한 한 "SELECT *" 은 사용하지 말 것.
10. 데이타의 일정부분 집합이 WHERE 술어로 다시 선택되면 임시테이블을 사용할 것. 검색하고자 하는 테이블이 매우 클 경우 모든테이블을 임시 테이블로 선택하고 임시 테이블에서 재검색을 할것.
11. 옵티마이저가 가장 좋은 경로를 선택하도록 임시 테이블을 사용함.큰 테이블에서 임시 테이블로 행을 선택하고 임시 테이블을 나머지테이블에 조인하면 됨
12. 임시 테이블에 색인 사용
13. 임시 테이블에 UPDATE STATISTICS사용
14. 임시 테이블을 만들 경우 WITH NO LOG를 사용. 논리 로그에 쓰는오버헤드가 없어지므로 성능이 향상됨. 임시 테이블에 LONGTRANSACTION을 만들 가능성이 없어짐

## Related
- [[dbms-compare]]
- [[db]]
- [[db-lock]]
- [[db-transation]]
- [[sql-tunning]]
