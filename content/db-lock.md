## Locking

An automatic mechanism tht isolates data to prevent conflicting
modifications.

## Type of locks

### Shared Locks

Used for satements that read data(selects)

Other processes can read the data (put shared locks on the data), but no
process can alter the data.(put exclusive lock on the data)

### Exclusive Locks

Used for statements that change data(inserts, updates, deletes)

No other processes can read the data (put shared locks on the data) or
alter the data(put exclusvie locks on the page)

### Update Locks

Used for operations that may or may not change the data (updates,
deletes)

When the process first scans the data, it applies an update lock. Other
processes can place shared locks, but no process can place exclusive
locks or update locks on the data. If the operation placing the update
lock finds data that needs to be modified, the update lock is promoted
to an exclusive lock. If the operation does not find data that needs to
be modified, the pdate lock is released when the scan is complete.

### Deadlocks

Deadlocks occur when two or more transactions have locks on data, and
each transaction is waiting to acqure a lock on data that the other
transaction has locked.

## MS Sql Server

### 잠금 에스컬레이션

- locks 옵션에 지정된 잠금 수를 초과하지 앟았는가?
- 잠금을 걸어야할 행의 수가 전체의 25% 미만인가?
- 잠금 대상 행이 페이지 내에 불연속 되어 존재하는가?
- 자금 리스트를 관리할 메모리가 충분히존재하는가? (사용가능한 메모리의 최대 40%까지 작믁ㅁ에 관련된 메모리로 할당 가능)

## Related
- [[db-transaction]]
