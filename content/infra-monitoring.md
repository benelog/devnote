- <https://github.com/facebook/osquery>
- <https://github.com/oshi/oshi>
- <https://github.com/hyperic/sigar>
- <https://github.com/firehol/netdata>
- <https://github.com/KDAB/hotspot>

## Linux monitoring

### 메모리 체크

```sh
free
free -m
free -mt
cat /proc/meminfo
top
```

F, n 엔터

### vmstat

```sh
vmstat -a
```

- -a : buffer와 cache가 inact와 active
- -S : 단위 지정. k,K,m,M는 각각 1000, 1024, 1000000, 1048576로 나눈 값을 의미
- -f : forks
- -s : 이벤트와 메모리 사용량 통계
- -m : slab 정보
- -d : 디스크 정보
- -p : 디스크 파티션 정보 (fdisk –l 명령어로 어떤 파티션이 있는지 확인 가능함)

### iostat

- `iostat -x` : device 별로
- `iostat -xd 5`

## Related
- [[logging]]
- [[observability]]
- [[sre]]
- [[linux-memory]]
