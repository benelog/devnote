- <https://google.github.io/eng-practices/review/reviewer/>
- [카카오스토리 팀의 코드 리뷰 도입 사례](http://tech.kakao.com/2016/02/04/code-review/)
- [thoughtbot의 코드 리뷰 가이드](http://haruair.com/blog/3116)

- <http://www.infoq.com/presentations/code-organization-large-projects> : Code Organization Guidelines for Large Code Bases - 유겐  휄러
- [Ten Commandments of Egoless  Programming](http://articles.techrepublic.com.com/5100-22-1045782.html)
- <http://en.wikipedia.org/wiki/Fagan_inspection>
- [code review 조사 자료](http://swprocess.egloos.com/2462137)

## Egoless Programming

* [Egoless Programming](http://lastmind.net/blog/2008/01/egoless-programming.html)
* <http://www.codinghorror.com/blog/archives/000584.html>
* <http://xrath.com/2009/09/egoless-programming-restarted/>

## 코드 쓰기

[Writing Software is Like …​Writing](http://www.artima.com/weblogs/viewpost.jsp?thread=255898)

## 도구

- [PR-AF](https://github.com/Agent-Field/pr-af): [AgentField](https://github.com/Agent-Field/agentfield) 기반 오픈소스 agentic PR reviewer
  - PR diff를 한 번 훑는 고정 체크리스트 방식이 아니라, PR마다 변경 구조를 분석해 커스텀 리뷰 전략과 리뷰 차원을 동적으로 만든다.
  - 병렬 reviewer agent를 띄우고, AST 기반 증거 추출·검증 레이어·falsifiability gate로 근거 없는 지적을 걸러내는 구조를 강조한다.
  - 개별 라인 문제뿐 아니라 파일 간 관계와 import/tag overlap을 묶어 compound vulnerability를 합성하는 심층 CI/CD 게이트 용도에 초점을 둔다.
  - `af call pr-af.review --in '{"pr_url": "https://github.com/owner/repo/pull/123"}'` 또는 HTTP API/GitHub Actions로 실행할 수 있으며, 500라인 PR 심층 리뷰 비용을 약 $0.80로 제시한다.

## 지속적인 Chapter 7 메모

- fault finding을 넘어선 협업
- 적은 오류
- 코딩표준 준수
- 빠른 학습 곡선
- 신뢰관계
- 비동기적인 pair programming(빠른 피드백..)

## Related
- [[static-analysis]]
