# ch8. 계층형 설계 1

## 소프트웨어 설계에 대한 실용적인 정의
코드를 만들고, 테스트하고, 유지보수하기 쉬운 프로그래밍 방법을 선택하기 위해 미적 감각을 사용하는 것

## 계층형 설계(Stratified Design)
바로 아래 계층의 함수로 지금 계층의 함수를 만드는 방법
- 코드를 추상화 계층으로 구성
- 각 계층을 볼 때, 다른 계층의 구체적인 내용을 몰라도 되도록

함수가 어떤 계층에 속해야 할지 정할 때 아래 내용을 참고
- 함수 이름: 함수의 의도를 알려주고 비슷한 목적의 이름을 가진 함수를 함께 묶을 수 있도록 힌트 제공
- 함수 본문: 중요한 세부사항을 제공

Mega Mart 예시
- 비즈니스 로직
  - gets_free_shipping(), calcTax()
- 장바구니를 위한 동작들
  - 이커머스 도메인에서 자주 쓰이는 함수들 
  - remove_item_by_name(), calc_total()
- 카피 온 라이트
  - removeItems(), add_element_last()
- 프로그래밍 언어
  - slice()

### 계층형 설계 패턴 중 가장 중요한 4가지
1. 직접 구현
2. 추상화 벽
3. 작은 인터페이스
4. 편리한 계층

### 패턴 1: 직접 구현
함수를 명확하고 아름답게 구현해 계층을 구성하기 위함
- 한 함수에서 서로 다른 계층의 함수가 혼재하면 코드가 명확하지 않아서 가독성이 떨어짐
- 예제 `megaMart.ts`의 freeTieClip 함수 확인

freeTieClip()의 직접 구현 패턴 적용 전
- JS 언어 레벨, 직접 만든 함수 등 서로 다른 추상화 단계들이 혼재하여 가독성 저하
- freeTieClip() 함수가
- `array index`, `for loop`, `make_item()`, `add_item()` 들을 호출
  - 이 중에서 `make_item()`, `add_item()` 함수들은 직접 만든 함수들이므로 나머지 JS 언어 레벨보다 추상화 수준 높음

직접 구현 패턴 적용 후
- freeTieClip() 함수가 비슷한 추상화 계층에 있는
- `isInCart()`, `make_item()`, `add_item()` 함수들 호출
- 가독성 증가 및 장바구니에 대해서 자세히 몰라도 됨

같은 계층에 있는 함수들은 같은 목적을 가져야 함
- 예) 
- `freeTieShipping()`, `gets_free_shipping()`, `cartTax()` -> 장바구니 비즈니스 로직
- `calcTax()` -> 이커머스 도메인에서 자주 쓰이는 동작

## 깨끗한 코드를 만들기 위해 함수를 추출하는 방법

### 반복문 빼내기
remove_item_by_name() 함수에서 반복문을 빼내서 새로운 함수 만들기
- 이유: 함수 내부에 COW 동작과 JS 언어기능의 서로 다른 레벨의 단계가 혼재
- JS 언어기능의 반복문을 빼내 새로운 함수로 바꾸기
- 예제 `megaMart.ts`의 removeItemsByName 함수 확인

## 소프트웨어 설계 시 계층 분리의 이점

### 직접 구현 패턴
- 한 단계의 구체화 수준에 관한 문제만 해결
- 모든 계층이 바로 아래 계층에 의존하도록 헬퍼 함수 만들기

### 계층형 설계의 장점
- 특정 구체화 단계에 집중할 수 있게 해줌 -> 가독성 향상 덕분에

### 계층형 설계를 쉽게 하려면
- 호출 그래프 그려보기
- 함수를 추출하여 더 일반적인 함수로 만들기(재사용성 강화)
  - 단순히 중복 코드를 제거하는 것이 아니라, 구현을 명확하게 하기 위함(명확하지 않은 코드를 감추고 헬퍼 함수 만듬)