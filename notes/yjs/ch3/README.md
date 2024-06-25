## 액션과 계산, 데이터의 차이를 알기

### 액션과 계산, 데이터

1. 액션
    1. 실행 시점과 횟수에 의존
    2. 부수효과가 있는 함수라고도 불리며 예시로는 이메일 보내기, DB 읽기 등
2. 계산
    1. 입력으로 출력을 계산
    2. 순수 함수라고도 불리며 예시로는 최댓값 찾기, 이메일 주소 올바른지 확인 등
3. 데이터
    1. 이벤트에 대한 사실, 일어난 일의 결과를 기록
    2. 예시로 은행 API로 읽은 달러 수량, 사용자가 입력한 이메일 주소 등
    3. 웹 요청이라는 `이벤트` 를 통해 사용자 데이터가 DB에 저장된다

### 장보기 과정

1. 냉장고 확인하기
    1. 액션 - 냉장고 확인 시점에 따라 제품이 다르다
2. 운전해서 상점으로 가기
    1. 액션 - 두 번 운전하면 연료가 두 배로 든다
3. 필요한 것 구입하기
    1. 액션 - 구입한 시점에서 개수가 줄어들기 때문
4. 운전해서 집으로 오기
    1. 액션 - 집에 있는 상태라면 상점에서 집으로 못오기 때문에 `언제` 가 중요함

- 그렇다면 모두 액션인데 데이터와 계산은 없는걸까?
- 쪼개어서 보면 존재한다
- 하나만 예를 들어보겠다
    - 냉장고 확인하기 → 액션이나 냉장고가 가지고 있는 제품은 `데이터` 이다.

- 위와 같은 장보기 과정에서 알아야할 것
    - 액션 안에는 계산과 데이터, 또 다른 액션이 숨어 있을 수 있다
    - 더 작게 나누고 연결할 수 있다

### 쿠폰 마케팅 전략의 함수형 사고

- 쿠폰에 관심 있는 구독자에게 이메일로 쿠폰을 보내주는 서비스를 통해 코드 작성을 해보자

1) 이메일 데이터베이스 테이블

| email | rec_count |
| --- | --- |
| john@coldmail.com | 2 |
| sam@pmail.co | 16 |

2) 쿠폰 데이터베이스 테이블

| coupon | rank |
| --- | --- |
| PROMOTION | best |
| 10PERCENT | good |

- 함수형 사고를 할 시 아래와 같은 순서가 중요하다(데이터의 기반이 필요)
    1. 데이터를 먼저 만든다
    2. 데이터를 바탕으로 계산을 구현한 후
    3. 액션을 구현한다.

[ 과정 ]

1. 데이터베이스에서 구독자를 가져오기
    1. `액션`이며 이를 통해 얻은 구독자 목록은 `데이터`이다
2. 데이터베이스에서 쿠폰 목록 가져오기
    1. 위와 동일
3. 보내야할 이메일 목록 만들기
    1. 처리 과정 중 `필요한 데이터` 를 만들 수 있다
    2. 이메일 목록 계획하기는 `계산` 이며 구독자, 쿠폰 목록인 데이터를 통해
    `데이터`인 이메일 목록을 만든다
4. 이메일 전송하기
    1. 액션

위와 같은 과정이 큰 과정이고 세부적으로 나누어서 더 살펴봐야 한다. (책 44p~참고)

- 우리에게 필요한 조건 중 하나인 것을 예시로 들겠다
- 쿠폰 목록에서 `good, best` 쿠폰을 각각 선택해 목록을 만든다 → `계산`
- 이를 바탕으로 구독자가 `rec_count ≥ 10` 조건으로 쿠폰 등급 데이터를 만든다

### 쿠폰 보내는 과정 구현

```tsx
interface Subscriber {
  email: string;
  rec_count: number;
}

// coupon의 형태는 객체
interface Coupon {
  code: string;
  rank: string;
}

interface Email {
  from: string;
  to: string;
  subject: string;
  body: string;
}

// 쿠폰 예시
const couponsFromDB: Coupon[] = [
  {
    code: "PERCENT10",
    rank: "good",
  },
  {
    code: "PERCENT50",
    rank: "best",
  },
];

const subscribersFromDB: Subscriber[] = [
  {
    email: "sam@pmail.com",
    rec_count: 16,
  },
  {
    email: "sam2@pmail.com",
    rec_count: 9,
  },
];

/**
 * 구독자가 추천인 수가 10명 이상이면 best, 아니면 good 쿠폰 등급 부여
 * @param subscriber
 * @returns - 쿠폰 특정 등급
 */
const subCouponRank = (subscriber: Subscriber): string => {
  if (subscriber.rec_count >= 10) {
    return "best";
  } else {
    return "good";
  }
};

/**
 * 특정 등급의 쿠폰 목록을 선택하는 "계산"(호출 횟수에 영향 X)
 * @param coupons
 * @param rank
 * @returns - 특정 등급의 쿠폰 목록
 */
const selectCouponsByRank = (coupons: Coupon[], rank: string): string[] => {
  let result = [];
  for (let c = 0; c < coupons.length; c++) {
    const coupon = coupons[c];
    if (coupon.rank === rank) result.push(coupon.code);
  }
  return result;
};

/**
 * 구독자가 받을 이메일을 계획하는 "계산"
 * @param subscriber
 * @param goods
 * @param bests
 * @returns - 특정 등급에 해당하는 쿠폰들을 보내는 이메일
 */
const emailForSubscriber = (
  subscriber: Subscriber,
  goods: string[],
  bests: string[]
): Email => {
  const rank = subCouponRank(subscriber); // 구독자의 쿠폰 특정 등급
  if (rank === "best") {
    return {
      from: "newsletter@coupondog.co",
      to: subscriber.email,
      subject: "best 등급의 쿠폰들을 보내드려요",
      body: "best 쿠폰들의 종류 =>" + bests.join(", "),
    };
  } else {
    return {
      from: "newsletter@coupondog.co",
      to: subscriber.email,
      subject: "good 등급의 쿠폰들을 보내드려요",
      body: "good 쿠폰들의 종류 =>" + goods.join(", "),
    };
  }
};

/**
 * 보낼 이메일 목록을 준비하기 "계산"
 * @param subscribers
 * @param goods
 * @param bests
 * @returns 구독자들의 이메일 목록
 */
const emailsForSubscribers = (
  subscribers: Subscriber[],
  goods: string[],
  bests: string[]
): Email[] => {
  let emails = [];
  for (let s = 0; s < subscribers.length; s++) {
    const subscriber = subscribers[s];
    const email = emailForSubscriber(subscriber, goods, bests);
    emails.push(email);
  }
  return emails;
};

const sendIssue = () => {
  const coupons = couponsFromDB; // 더미데이터
  const goodCoupons = selectCouponsByRank(coupons, "good");
  const bestCoupons = selectCouponsByRank(coupons, "best");
  const subscribers = subscribersFromDB;
  const emails = emailsForSubscribers(subscribers, goodCoupons, bestCoupons);
  // 아래의 과정은 모든 이메일을 만든다.
  // 메모리 부족 가능성을 대비하여 책의 예시처럼 20개씩 끊어서 하는 것도 좋은 방법이다

  for (let e = 0; e < emails.length; e++) {
    const email = emails[e];
    // emailSystem.send(email)
  }

  // page와 subscribers의 갱신으로 아래와 같이 리팩토링 가능
  // let page = 0
  // let subscribers = subscribersFromDB(page);
  // while (subscribers.length > 0) {
  //   const emails = emailsForSubscribers(subscribers, goodCoupons, bestCoupons)
  //   for (let e = 0; e < emails.length; e++) {
  //     const email = emails[e]
  //     // emailSystem.send(email)
  //   }
  //   page++
  //   subscribers = subscribersFromDB(page);
  // }
};

sendIssue();
```

-