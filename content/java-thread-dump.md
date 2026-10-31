- <https://dzone.com/articles/how-to-read-a-thread-dump>
- <https://d2.naver.com/helloworld/10963>

## 자주 쓰는 명령

jps -v

more dum.txt \| grep locked \| sort -i \| uniq -c \| sort -i : 같은
객체에 lock이 걸린것이 있는지 확인

## LWP 확인

ps –Lf –p \[pid\]

- UID: 사용자ID
- PID: 프로세스ID
- PPID: 부모프로세스 ID
- LWP : Light Weight Process. 쓰레드 ID
- C : 지속적으로 사용한 CPU 사용량
- NLWP : 해당 프로세스에서 사용하는 쓰레드의 수. LWP 개수
- STIME: 프로세스가 시작한 시간
- TTY: 해당 프로세스를 통제하는 터미널
- TIME: 시:분:초 형식의 CPU 점유시간
- CMD:프로세스를 수행시킨 명령어

ps -mo pid,lwp,stime,time,pcpu -p javapid

16진수 → 10진수

- Bash\> echo \$<span class="indexterm" primary="0x1acc"></span>0x1acc
- Bash\> echo \$<span class="indexterm" primary="16#1acc"></span>16#1acc
- Python\> print 0x1acc 10진수 → 16진수
- Python\> print hex(6860)
- Bash\> echo "obase=16;6860" \| bc

## 도구

- TDA : <https://java.net/projects/tda>
- Thread Logic : <https://java.net/projects/threadlogic>
- IBM Thread and Monitor Dump Analyzer for Java :
- <https://www.ibm.com/developerworks/mydeveloperworks/groups/service/html/communityview?communityUuid=2245aa39-fa5c-4475-b891-14c205f7333c>
- Samurai : <http://yusuke.homeip.net/samurai/en/index.html>

## Related
- [[java-profiling]]
