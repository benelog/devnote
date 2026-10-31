일시 : 2005/

## 버전정보

ASE engine의 서버 - ASE(Adaptive Server Enterprise)
현재 15버전까지 나와있음. 12.5 버전 가장 많이 사용

SQL엔진을 Sybase에서 개발했다가 MS에 기술이전후 ASE로 명칭변경(11.5버전부터)

## Client tool

- isql - 텍스트형태로 쿼리전달
- jisql- GUI환경 (java로 개발)
- Sqladvantange - GUI환경 (c로 개발)
- Sybase-central - 관리자 작업을 GUI

## isql을 이용한 접속 방법

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

## shutdown과 start 방법

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

## DB에서 사용할 수 있는 언어

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

## 기본 database

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

create table `#a.tab`은 임시테이블. 임시로 tempdb의 디스크영역에 쓴다. session종료되면 자동으로 없어진다.

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

## isql의 syntax

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

## 테이블 생성과 identity

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

## 환경변경

1. 서버 : 메모리영역, 동시 connect session수, 동시 lock수, device 수 - sp_configure
2. DB : default property 등.. - sp_dboption
3. session - set

## 저장 구조와 datatype

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

## dbo, select into, DML

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

## view

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

## index

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

## 2005.03.17 Sybase 교육

- create table `#테이블명` : session specific한 temporary table 생성..
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

## batch에 들어갈 수 없는 명령어

- create default
- create rule
- create procedure
- create trigger
- declare cursor
- use

위의 명령어 다음에는 바로 go가 와야 하므로 batch에 들어갈 수 없다.

batch안에서 생성된 변수는 batch가 끝나면 소멸된다.

동일한 object를 drop하고 creation 하는 문장을 동시에 한 batch에 넣을 수 없다.

## 변수사용시 주의점

변수를 할당하는 문장과 그 변수를 다시 사용하는 문장은 분리된 문장으로 나와야 한다.

변수는 배열이 아니므로 select절의 결과로 대입되는 값이 여러개일 경우 마지막 값이 들어간다.

한번 사용한 변수가 값이 초기화되지 않고 다시사용될때, 그변수가 결과값이 없는 select절의 칼럼값이 대입된다하더라도, null값이 나오지 않고 앞에서 정의한값이 나온다.

static sql에서는 컬럼명과 테이블명은 변수로 받을 수 없다.

## 동적SQL에서 못 쓰는 문장들

- exec,excute
- transaction control 문장
- 임시테이블을 생성하는 create 문장
- use

## transaction

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

## lock

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

## isolation level

```sql
set transaction isolation level 0
```

- dirty read -> 다른 트랜잭션에서 commit 되지 않은 데이터를 읽음
- Nonrepeatable read -> 동일한 transaction 내에서 반복되는 쿼리에 다른 값이 나올 수 있다..
- Phantom Read ->

@@isolation 변수에서 조회가능. default값은 1

## 에러메시지 정의

```sql
sp_addmessage 20001,"a_tab not found"
```

메시지 번호는 20000번 이상으로 정의. sysusermessages 테이블에 저장된다.
에러메시지 호출 방법  raiseerror 20001

syscomments에 procedure에 대한 ddl문이 저장되어 있다.
sysprocedure에 procedure에 대한 query tree를 저장.
매번 parsing을 거치지 않으므로 효율적이다.

sp_helptext 함수명 : 함수에 대한 ddl

## Related
- [[sybase]]
- [[sybase-sql]]
- [[sybase-admin]]
- [[db-transaction]]
- [[db-lock]]
