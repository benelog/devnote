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

## server registry

- <http://infocenter.sybase.com/help/index.jsp?topic=/com.sybase.dc38421_1500/html/ntconfig/X40217.htm>

## Related
- [[sybase]]
- [[db-lock]]
- [[db-transation]]
- [[db]]
