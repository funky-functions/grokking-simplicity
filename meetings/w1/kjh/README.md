## ch3. 액션과 계산, 데이터의 차이를 알기

### 액션, 계산, 데이터가 어떻게 다른지

액션
- 실행 시점과 횟수에 의존
- 사이드 이펙트, 사이드 이펙트가 있는 함수, 비순수 함수 라고도 함
- 예) 이메일 보내기, 데이터베이스 읽기

계산
- 입력으로 출력을 계산
- 순수 함수, 수학 함수라고도 함
- 예) 최댓값 찾기, 이메일 주소 유효성 검증

데이터
- 이벤트에 대한 사실
- 예) 유저가 입력한 이메일 주소

구현 순서
- 데이터 -> 계산 -> 액션

계산이 액션보다 좋은 이유
- 테스트 용이
- 정적 분석 쉬움 -> 자동화 테스트 용이?
- 조합해서 더 큰 계산을 만들 수 있음

애플리케이션에서 쓰임새
- 계산: 계획하거나 결정
- 데이터: 계산의 결과(계획하거나 결정한 것)
- 액션: 계산으로 만든 계획을 실행

모든 개발 과정에서 액션, 계산, 데이터를 구분할 수 있다
- 개발 전: 문제 정의 과정
  - 꼭 액션으로 처리해야 하는지?, 데이터로 처리할 수는 없는지
- 개발 중
  - 최대한 액션에서 계산 뽑아냄
  - 계산에서 데이터를 분리하려고 노력
- 개발 후
  - 숨은 액션 찾고 리팩토링

### 액션이 코드 전체로 퍼질 수 있다는 것 이해하기
송금 함수가 있다고 가정하면..
- 횟수가 중요하기 때문에 액션에 해당
- 이 함수를 호출하는 모든 함수가 액션이 됨
    - 액션을 호출하는 모든 함수는 액션

액션을 잘게 분해하자!

```
송금 함수(액션)

송금 대상을 만들고 송금하는 함수(액션)
- 송금 대상 만들기 (계산) -> 분리 필요
- 송금 함수 (액션) -> 액션이 섞여 있어서 함수 전체가 액션

```

액션 예시
- 함수 호출: 예) `alert("Hello world")`
- 메서드 호출: 예) `console.log("Hello world")`
- 생성자: 예) `new Date()`
    - 호출하는 시점에 따라 각기 다른 값을 가짐
- 표현식
    - 읽는 시점에 따라 값이 달라질 수 있음
    - 변수 참조: 예) `y`
    - 속성 참조: `user.first_name`
    - 배열 참조: `stack[0]`
- 상태
    - 값 할당: 예) `x = 3` -> 값 할당 이후의 다른 코드에 영향을 줌
    - 프로퍼티 제거: 예) delete user.first_name -> 제거 이후의 다른 코드에 영향을 줌

### 액션 사용시 권장 사항
1.가능한 액션 적게 사용

2.액션을 가능한 작게 만들기

3.액션이 외부 세계와 상호작용 하는 것을 제한
- 내부에는 데이터와 계산만 있고,
- 가장 바깥 쪽에만 액션이 있는 구조가 제일 이상적

4.액션이 호출 시점에 의존하는 것을 제한
- 호출 시점과 횟수에 덜 의존하게 만들기