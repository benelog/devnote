## 관련 자료

identity 관련

```sql
ALTER TABLE gas_station ADD COLUMN ref_id NUMERIC(8,0) IDENTITY
```

- [\[sybase\]identity 속성](http://blog.naver.com/kvivaldi/60006272483)
- [Chained mode와 unchainde mode](http://blog.naver.com/kvivaldi/60006272511)
- [(T-SQL) 서버 측 동적 쿼리에서의 탈출](http://cafe.naver.com/zoum/9)

## Sybase 교육 내용

일시 : 2005/

### 버전정보

ASE engine의 서버 - ASE(Adaptive Server Enterprise)
현재 15버전까지 나와있음. 12.5 버전 가장 많이 사용

SQL엔진을 Sybase에서 개발했다가 MS에 기술이전후 ASE로 명칭변경(11.5버전부터)

### Client tool

- isql - 텍스트형태로 쿼리전달
- jisql- GUI환경 (java로 개발)
- Sqladvantange - GUI환경 (c로 개발)
- Sybase-central - 관리자 작업을 GUI

### isql을 이용한 접속 방법

```sh
os>isql -U    -P    -S
```

옵션은 대소문자 구별함

옵션내용

- -U(로그인명)
- -P(패스워드)
- -S(ASE서버명)

ASE서버명은 ASE를 인스톨시 DBA가 지정한다.

sa는 oracle의 sys,system과 같은 ASE의 가장 강력한 권한의 로그인

client에서 연결된 하나의 connection = session. 같은 로그인명으로 여러번 connect하면 각각의 하나의 ssession이 이루어진다.

ASE는 각각의 session을 unique한 ID로 서버에서 관리한다.

### shutdown과 start 방법

서버엔진 프로세스 확인

```sh
OS>showserver
```

-> dataserver (ASE의 엔진 프로세스. 이거 때 있어야 client에서 connect 할 수 있다.)

start

```sh
os>startserver -f run_서버명
```

shutdown.

```
is>isql -Usa -P -S
1> shutdown
2>go
```

### DB에서 사용할 수 있는 언어

1. sql (DDL,DML,DCL)
2. extension SQL
   - datatype ex)날짜는 datetime
   - clustered index
   - if,while
   - function 변수 (ex> @abc (oracledms :abc 형식)
3. system procedure
   - 시스템이 제공하는 stored procedure
   - sp_ 로 시작. 약 300여개

```
1>sp_help
2>go
```

데이터베이스에 어떤 object가 있는지 모여줌.

Db obejct의 종류

- table
- view
- index
- default,rule
- stored procedure
- trigger

```
1>sp_help object명
```

object에 대한 description

1),2),3)를 합쳐서 T-SQL (Transact-SQL)

### 기본 database

- ASE서버는 multi-database로 구성되어 있다.
- install하면 default로 5개의 database가 만들어 진다.
  - master :서버에 대한 환경이나 서버안에 있는 database에 대한 정보. master database가 이상이 있으면 startup이 안 될 수 있다.
  - model : templet database. system table들을 여기에서 카피해 간다. 깨지면 create database가 안 될 수도 있다.
  - tempdb: temporary table이 저장되어 있는 DB.
  - sybsystemdb :분산처리용 database
  - sysbsystemprocs : 시스템 프로시저가 저장되어 있는 DB

위의 5개는 DBA가 아닌 다른 user가 건드릴 수 없다.

create database a_db 시에 system table(system catalog)이 생긴다. sys,spt_ 로 시작.

- sysobjects
- syscolumns
- sysindexes

```
1>select * from a_tab
2>go
```

에서 테이블명,컬럼명, 인덱스 명이 있는지 system_table에서 체크한다.
create object를 할 때맏 system테이블에서 정보가 만들어진다.

create table #a.tab은 임시테이블. 임시로 tempdb의 디스크영역에 쓴다. session종료되면 자동으로 없어진다.

Optional DB (default로 생기지는 않음)

- pubs2 : sample database
- sybsyntax : sp_syntax에 의해서 사용
- dbccdb :dbcc checkstorage를 사용하기 위한 DB

생성법

```sh
# ASE-12.5/scripts
isql -Usa -P -S -i (옵션설치명)
# installpubs2
# ins_syn_sql
# installdbccdb
```

```
1>sp_syntax 'crate table'
 'sp_help'
```

(각 언어의 syntax를 보여줌)

DB의 존재여부확인 sp_helpdb

로그인 만들기(DBA만 가능)

```sql
sp_addlogin a_login, abc123,a.db
```

- a_login:로그인명
- abc123:패스워드
- a.db: 디폴트 database

```
1>select db_name()
```

현재 로그인이 어느 DB에 위치하고 있는지 (sa는 connect시 master에 위치)

default databse: 어떤 로그인 서버에 connect 했을 때 첫번째 위치하게되는 DB

```
2>use pubs2
```

(다른 db로 이동)

### isql의 syntax

- -U
- -P
- -S
- -i 스크립트실행. os의 prompt상에서 실행.
- -D 데이터베이스명
- -O 스크립트의 결과를 파일로 저장
- -w999 화면의 width정의

```
1>select..
2>insert ...
3>delete...
4>go
```

go 할 때마다 서버로 전달이 되므로 한번만 전달된다.

```
1>select..
2>go..
3>insert..
4>go..
```

매번 서버로전달..

batch : client에서 server로 전달되는 하나 이상의 query
중간에 에러가 나면 배치의 모든 query가 rollback이 된다.

- PC client에서 서버명 지정: dsedit(GUI환경). 서버명을 등록을 하면 `sybase\ini\sql.ini`에 저장
- 서버에서 다른 서버의 서버명지정: dscp(text환경)
- isql 편집
  - `1> !!` :system
  - `1>vi` : 바로 입력한 query를 편집
  - `1>reset` : query 취소
  - `1> :r` : 스크립트 부름
- 서버명 구성 : OS Hotst명+IP+port번호+protocol

### 테이블 생성과 identity

```sql
create table a_ab
( a_col numeric(1,) identity
 b_col char(10) null,
 c_col int not null)
```

object명이나 column명은 30자까지.

insert의 value뒤의 값들은 single quotation과 double quotation 둘 다 가능.

테이블 생성시 column의 property는 not null이 default로 생성.

identity는

1. 테이블당1개
2. numeric(?,0) 1씩 증가하므로 scale은 반드시 0. 삭제시 빈번호는 채워지지 않는다.
3. insert시 포함시킬 수 없음. insert시에 table명 뒤에 column list가 없어도 자동으로 제외됨.
4. start value는 1부터

numeric() -> default로 numeric(18,0)

```sql
1> alter table a_tabe
modify a_col numeric(2,0)
```

```sql
set indentity_insert a_tab on
insert ito a.tab(a_col,b_col,cOl_ values(5,"aaa",50)
```

### 환경변경

1. 서버 : 메모리영역, 동시 connect session수, 동시 lock수, device 수 - sp_configure
2. DB : default property 등.. - sp_dboption
3. session - set

### 저장 구조와 datatype

char(10)
varchar(10)

Data cache 메모리 영역에서 찾고 없으면 disk에서 찾는다.

Disk에 저장되는 물리적인 최소단위= page
page는 header와 offset으로 나누어져 있음.

one page의 size= 2k,8k,16k로 지정가능.
ASE를 인스톨 할 때 한번 지정가능..
result set이 클수록 page size를 크게 해 주는 것이 좋다.

```
1>select @@maxpagesize
```

default:2048 (2kb)
이중 header와 offset를 제외한다면 1962

만약 한 row가 24byte라면 1페이지에는 1962/24=81개의 row가 들어갈 수 있다.

- @variable -> local variable
- @@avariable -> global variable. 시스템에 의해서 생성. 변수를 만들거나 변경할 수 없다.
  - @@maxpagesize
  - @@ncharsize
  - @@version : 버전
  - @@spid : 세션의 ID
  - @@rowcount :바로전의 실행된 쿼리에 의해서 적용된 row수
  - @@error : 바로전에 수행된 에러번호 (없을 시에는 0)
  - @@identity : identity 컬럼에 마지막으로 insert된 값

memory 안에서 변경된 page= dirty page
메모리의 dirty페이지를 disk에 write해주는 것은
checkpoint와 housekeepr라는 task가 이 일을 해준다.

CFS=continous Free Space에 새로운 Data가 들어간다.

char(10) abc를 abcdef로 update하면 그 자리에 데이터가 들어간다.
varchar(10) abc를 abcdef로 update로 하면 CFS가 없으므로 새로운 공간으로 이동을 하게 된다.
따라서 공간은 varchar가 많이 줄일 수 있지만, update나 delete가 많은 데이터는 char를 추천.

테이블 명이나 칼럼병 변화

```sql
sp_rename "a_tab", "b_tab"
sp_rename "a_tab.a_col", "a_tab.z_col"
```

- go 5 : 5번 반복실행.

실수(float) datatype은 os에 dependent 하기 때문에 잘 쓰지 않는다.

nchar, nvachar -> 2byte를 사용했을 경우 쓸 수 있는 data. nchar(10)은 2byte 한글이 10개 들어갈 수 있다.

1 row는 하나의 페이지에 들어가야 한다. 1 row의 size는 페이지 크기를 넘어갈 수 없다.

text는 text page에 들어가고 실제적인 data page에는 16byte address에 저장된다. text는 여러개의 page에 나누어 저장될 수 있다.

unicode= 모든 문자를 16bit로 표현.
unicode를 지원하는 서버에서는 unichar,univarchar를 활용 할 수 있음.

image : 2기가 까지. text와 마찬가지로 data page에는 주소만.

concatnation시 char는 남은 빈공간까지 다 들어간다. char(5)의 "aa" ,"bb"가 있다면 두개의 칼럼을 더한다면 "aa   bb   "이 된다.

```sql
select convert(varchar(1),a_col) + b_col from abc
```

```sql
create table test2
(a_col int null,
b_col int default 0 null,
c_col varchar(20) default getdate() null)
```

null값이 들어올 시 default 값 지정.

default 조건의 삭제

```sql
alter table [테이블명]
drop consraint [constraint명]
```

sp_help 테이블명으로 보면 default절에 해당하는 constraint명이 나온다.

### dbo, select into, DML

dbo, object owner : dbo는 해당 DB의 모든 object에 대해서 접근할 수 있다.

select into : 테이블간의 copy. 테이블의 생성과 함꼐 data를 copy한다. 단 constraint나 index는 copy 되지 않는다.

다른 DB나 다른사용자의 table보기

```sql
select * from pubs2.a_user.titles;
```

만약 object owner가 dbo라면 user명은 생략가능.

```sql
select * from pubs2..titles;

select * into abc_copy from abc;
```

select into를 사용하기 위해서는 database option이 지정이 되어 있어야 한다.

```
1>use master
2>go

1>sp_dboption user02_db, "select into". true
2>go

1>use user02_db
2>go

1>checkpoint
2>go
```

- insert into publishers select ... from
- update set from 에서 조인이 가능.
- delete

```sql
delete a_tab
from a_tab, b_tab
where a_tab.a=b_tab.a
and a_ab.a="bb"
```

case : when에 없는 값은 null로 된다. where절로 제한을 하거나 else로 명시해 주지 않은 다른 값들일 경우 처리를 해준다.
else type -> 그대로 둔다.

### view

view의 특징 (virtual table)

1. network traffic을 줄여줄 수 있다.
2. select query를 simple하게 수행
3. 부분적인 권한을 부여하기 위해서

```sql
create view a_view
as
select
..
```

- select *를 해도 실제 칼럼 list로 칼럼명이 들어가게 된다. 즉, select * 로 view 생성후 alter table로 새로운 column을 추가해도, view에서는나타나지 않는다.
- sp_depends : 해당 object를 사용하는 object를 보여준다.

create view를 할때 syscomments라는 system table에 저장이 된다.
sp_helptext a.view 로 하면 view에 대한 정보를 보여준다.

### index

```sql
create index a_ind on a_tab(a_col)
```

- root level : index
- intermediate level : index page
- leaf level  : data page가 sort된 순서대로 저장

sp_helpindex: 인덱스 정보만본다.

index의 종류

- composite (index에 사용된 칼럼이 두개 이상)
- noncomposite (index에 사용된 칼럼이 하나)
- unique (index에 사용한 데이터가 유일성을 가짐)
- nonunique
- clustered
- nonclustered

noncluestred,nonunique가 default

clustered index를 생성하면 index에는 leaf level이 없고 index page는 바로 data page를 가리키게 되고, data page의 data row는 index_page의 순서대로 정렬된다.
테이블당 오직 1개만 만들 수 있다.

nonclustered index는 249개까지 만들 수 있다.

query plan 보는 방법

- set showplan on
- set noexec on : select 된 result set을 보여주지 않고 query plan만 보여줌.

### 2005.03.17 Sybase 교육

- create table #테이블명 : session specific한 temporary table 생성..
  - 같은 로그인이라도 다른 세션에서는 접근할 수없다.
  - grant도 줄 수 없다.
  - sp_help로 테이블을 확인할려면 tempdb로 이동해야 한다.
  - 세션종료시 삭제
- create table temdb..테이블명 : shareable한 temporary table 생성. 서버 restart시 삭제.
  - 단 sa로는 tempdb에 만들어도 다른 사용자가 볼 수가 없다.
- 시스템이나 user에 의해 생성된 모든 temporary table은 tempdb에 저장된다.

sp_who : 각각의 session에 대한 status

이 명령어실행시 hostname이 없는 것들 task
task : ASE서버가 쓰는 process

sysmessages 는 master db에만 유일하게 존재하는 시스템 테이블

sp_help sysobjects : name id type uid

```sql
select
object_id('name')
object_name(id)
db_id('name')
db_name(id)
user_id('name')
user_name(id)
```

시스템테이블

- sysojbects
- sysusers

### batch에 들어갈 수 없는 명령어

- create default
- create rule
- create procedure
- create trigger
- declare cursor
- use

위의 명령어 다음에는 바로 go가 와야 하므로 batch에 들어갈 수 없다.

batch안에서 생성된 변수는 batch가 끝나면 소멸된다.

동일한 object를 drop하고 creation 하는 문장을 동시에 한 batch에 넣을 수 없다.

### 변수사용시 주의점

변수를 할당하는 문장과 그 변수를 다시 사용하는 문장은 분리된 문장으로 나와야 한다.

변수는 배열이 아니므로 select절의 결과로 대입되는 값이 여러개일 경우 마지막 값이 들어간다.

한번 사용한 변수가 값이 초기화되지 않고 다시사용될때, 그변수가 결과값이 없는 select절의 칼럼값이 대입된다하더라도, null값이 나오지 않고 앞에서 정의한값이 나온다.

static sql에서는 컬럼명과 테이블명은 변수로 받을 수 없다.

### 동적SQL에서 못 쓰는 문장들

- exec,excute
- transaction control 문장
- 임시테이블을 생성하는 create 문장
- use

### transaction

unchained mode : 작업의 시작을 명시적으로 서버에 알림.

```sql
begin tran
commit tran
rollback tran
```

chained mode : 묵시적으로 쿼리가 시작됨과 동시에 서버에 트랜잭션의 시작을 알림.
commit tran, rollback tran으로

ASE의 default transanction mode는 unchained mode이다.

```sql
set chained on
```

unchained mode에서 begin tran을 명시하지 않은 모든 문장은 auto-commit이 된다.

- @@tranchained
  - 0- unchained
  - 1- chained
- @@transtate
  - 0-진행중
  - 1-commnit
  - 2-error
  - 3-rollback
- @@trancount
  - begin tran을 만날때마다 1씩 증가
  - commit tran을 만날때마다 1씩감소
  - roll back을 만나면 0
  - trancount가 0이면 transanction이 끝난상태

transaction 안에서 go라는 문장은 auto-commit이 아니고 네트워크를 몇번 타느냐만을 결정한다.
chained mode에서는 trancount가 0이 될 수가 없다. 즉 trancount를 조회하는 문장자체도 transaction이기 때문이다.

data cache에는 data page, index page , log page가 올라간다.
모든 database에는 data 영역과 transaction log 영역이 있다.
transaction log에는 insert,update,delete의 기록이 남는다.

transaction 종료와 동시에 transaction log에 기록.

auto-recovery : ASE의 서버가 data page와 transaction log를 일치화 시키는것.

DB backup

- dump database : data영역과 transaction log를 백업
- dump tran :로그영역만 backup

truncate와 delete from

테이블의 데이터를 전부 다 날릴떄 truncate가 더 빠르다. transaction log에 모든 정보를 남기지 않고 allocation 정보만를 남기기 때문.
begin tran 내에서 truncate를 쓸 수 없다.

select into 도 마찬가지

### lock

- lock type : S,X,U
- Lock scheme : APL,DPL,DRL
- LockScope : table,page,row
- Intent Lock
- DeadLock

shared lock이 걸려있는 페이지에 insert,update,delete를 걸면 transaction이 종료할때까지 wait가 걸린다.

eXclusive lock : insert,delete,update 중인 row가 있으면 select는 wait, insert,update,delete도 wait

Update lock : update 중이면 select는 ok insert,update,delete는 wait

- APL : All Page Lock Scheme : index page와 data page에 모두 lock를 건다. (Default lock scheme)
- DPL : Data Page Lock Scheme
- DRL : Data Rows Lock Scheme

select query 위주의 테이블이면 all page lock scheme이 좋고, insert,update,delete가 많다면 DataRow Lock Scheme을 할 수 밖에 없다. 그러나 Data row Lock shceme은 lock를 관리하기 위한 메모리 영역 자원이 많이 든다.

Lock Scope : 테이블 전체에 걸수 있는 lock 종류

1. isolation level 3 : 테이블 전체에 S lock
2. select from a_tab hold lock -> S lock
3. lock table -> S lock,X lock

Intent Lock : 테이블간에 상이상 락을 잡지 않도록 테이블 lock 상태를 flag로 표시함. sp_lock, sp_who 으로 확인 가능.

```sql
sp_config "lock scheme"  -- default lock scheme 확인
sp_config "lock scheme" ,0,  datarows
```

또는 create table 이나 alter table에서 `lock datarows`, `lock allpages` 의 라인을 추가

deadlock이 걸릴 경우 ASE에서 deadlocktune이라는 task가 강제로 하나를 rollback시킴.

```sql
cbcc checktable(table명)
```

### isolation level

```sql
set transaction isolation level 0
```

- dirty read -> 다른 트랜잭션에서 commit 되지 않은 데이터를 읽음
- Nonrepeatable read -> 동일한 transaction 내에서 반복되는 쿼리에 다른 값이 나올 수 있다..
- Phantom Read ->

@@isolation 변수에서 조회가능. default값은 1

### 에러메시지 정의

```sql
sp_addmessage 20001,"a_tab not found"
```

메시지 번호는 20000번 이상으로 정의. sysusermessages 테이블에 저장된다.
에러메시지 호출 방법  raiseerror 20001

syscomments에 procedure에 대한 ddl문이 저장되어 있다.
sysprocedure에 procedure에 대한 query tree를 저장.
매번 parsing을 거치지 않으므로 효율적이다.

sp_helptext 함수명 : 함수에 대한 ddl

## 관리 함수 등

- 테이블 레이아웃 : `sp_help 테이블명`
- 데이터베이스 상태 : `sp_helpdb 디비명`
- 데이터베이스 삭제 : `drop database 디비명`
- 현재사용중인 db보기 : `select db_name()`
- 현재의 사용량 보기 : `sp_spaceused`
- 락상태 파악 : `sp_lock`
- 현재 사용 중인 사용자 검색 : `sp_who`
- user 권한으로 생성된 테이블 보기 : `select name from sysobjects where type = 'U'`

```sql
select suser_id(), suser_name()
select user_id(), user_name()
```

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

## 사용자 추가

```sql
sp_addlogin '아이디','패스워드'
sp_adduser '아이디'
sp_dropuser '아이디'
```

```
% isql -Usa -Ppassword -Sservername
1> use master
2> go
1> sp_addlogin scott, tiger, test
2> go
1> use test
2> go
1> sp_adduser scott
2> go
```

```sql
exec  sp_addlogin  'homeusr', 'password', @defdb='ebaihome', @auth_mech = 'ASE'
exec sp_locklogin  'homeusr', 'unlock'
go

use ebaihome
go

exec sp_adduser 'homeusr' ,'homeusr' ,'public'
go
```

## 로그인 현황쿼리

sybase 로그인 id별 process 숫자 집계 쿼리

sa 계정으로 로그인해서,

```sql
select
   p.hostname,
   p.ipaddr,
   p.cnt,
   (select l.name from syslogins l where l.suid = p.suid) name
from
(select s.hostname, s.ipaddr, s.suid,
          count(*) cnt from sysprocesses s
group by s.hostname, s.ipaddr ,s.suid ) p
```

WAS에서 붙어 있는 현재 connection 갯수를 파악할 때 사용했습니다. 간단한 쿼리이고 비슷한 기능의 내부함수가 있을런지도 모르겠네요. 보통 WAS에서 설정한 connection pool의 max 숫자 아래로 나오고 있으나 초과하는 경우도 보입니다. 그럴 경우에는 해당 로그인 id로 붙을 때 WAS에서 제공하는 connection pool을 안 쓴 프로그램들이 존재하고 있다는 의미로 파악됩니다. 왠만하면 한 군데에서 pool관리하는것이 설정바꿀때도 편할텐데 말이죠.

혹시나 필요하신 분들이 찾으실 때 검색엔진에 잘 걸렸으면 하는 마음에 여기에 올려봅니다.

```
[User Environment]
        number of user connections = 100
```

```sql
select @@max_connections
```

- <http://infocenter.sybase.com/help/index.jsp?topic=/com.sybase.help.ase_15.0.sag1/html/sag1/sag1272.htm>

## lock걸린 쿼리 확인

### 락걸린 것 확인

```sql
sp_lock
```

### 메시지확인 가능하게 하기

```sql
dbcc traceon(3604)
go
```

dbcc traceon(3604)는 메세지를 화면에 뿌리기. 로그파일에 남기려면 dbcc traceon(3605)

### 해당 spid로 Lock이 걸린 sql문 확인

```sql
dbcc sqltext(463)
go
```

Lock을 발생시킨 sql문을 보내는 IP 체크

```sql
select * from sysprocesses where spid=102
go

sp_who "102"
go
```

플랜보기

```sql
sp_showplan 102, null, null, null
```

### 프로세스 kill

```sql
kill 463
go
```

## 쿼리 plan보기

```sql
set showplan on
go

set statistics io on
go

set statistics time on
go
```

## 용량추가

사용공간확인

```sql
sp_spaceused
```

디바이스 확인

```sql
select * from sysdevices
```

디바이스 추가

```sql
use master
disk init
name = "tempdb_dev6",
physname = "/db1data2/tempdb_dev6.dat",
size = "250M"
go
```

Database 확장

Database의 용량을 확장할 경우에는 기존 등록된 device 및 disk init에 의해 새로 등록된 device에 database를 확장한다.

```
1> alter  database  mydb  on  data_dev = 3
2> go
```

## backup과 restore

### backup

```sh
isql -Usa -P -i dumpbak.sql -odumpbak.log
```

Database dump를 위한 sql

```sql
use ebaidb1
go
dump database ebaidb1 to dump_database_dev
go
exit
```

transaction dump를 위한 sql

```sql
use ebaidb1
go
dump transaction ebaidb1 to dump_transaction_dev
go
exit
```

### restore

database restore

```sql
Load database ebaidb1 from dump_database_dev
```

transaction restore

```sql
Load tran ebaidb1 from dump_transaction_dev
```

## bcp

```
bcp [[database_name.]owner.]table_name[:slice_number] {in | out} datafile
[-m maxerrors] [-f formatfile] [-e errfile]
[-F firstrow] [-L lastrow] [-b batchsize]
[-n] [-c] [-t field_terminator] [-r row_terminator]
[-U username] [-P password] [-I interfaces_file] [-S server]
[-a display_charset] [-q datafile_charset] [-z language] [-v]
[-A packet size] [-J client character set]
[-T text or image size] [-E] [-g id_start_value] [-N] [-X]
[-M LabelName LabelValue] [-labeled]
[-K keytab_file] [-R remote_server_principal]
[-V [security_options]] [-Z security_mechanism] [-Q]
```

받기

```sh
bcp ebaidb1.ebaiusr.CM_USRINFO out usrinfo_060411.dat -SEBAIDB1 -c -Usa -P****
```

넣기

```sh
bcp ebaidb1.ebaiusr.CM_USRINFO in usrinfo_060411.dat -SEBAIDEV -c -Usa -P
```

일괄스크립트

```sql
use pubs2
go
select 'bcp pubs2..'+name+' out '+name+'.dat -c -Usa -P' from sysobjects where type='U'
go

select 'bcp pubs2..'+name+' in '+name+'.dat -c -Usa -P ' from sysobjects where type='U'
go
```

스크립트 실행

```sh
isql -Usa -P -ibcptest.sql -oresult.sql
```

in 옵션변경

bcp out은 그냥 out을 시키시면 되지만 in은 작업을 하나 해주셔야합니다.

```
1>sp_dboption ebaidb1,"select into/bulkcopy",true
2>go
1>use ebaidb1
2>go
1>checkpoint
2>go
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

## server registry

- <http://infocenter.sybase.com/help/index.jsp?topic=/com.sybase.dc38421_1500/html/ntconfig/X40217.htm>

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
- [[db]]
- [[db-lock]]
- [[db-transation]]
- [[dbms-compare]]
- [[jdbc]]
- [[sql]]
