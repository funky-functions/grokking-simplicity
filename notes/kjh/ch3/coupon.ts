// TS2393: Duplicate function implementation. 에러 방지
export {};
// JS에서 데이터는 객체, 문자열 등으로 정의
// 1. DB에서 가져온 구독자 데이터
interface Subscriber {
  email: string;
  rec_count: number;
}

const subscriber1: Subscriber = {
  email: "john@naver.com",
  rec_count: 16,
};

// 2. 쿠폰 등급
type CouponRank = "best" | "good" | "bad";

const rank1: CouponRank = "best";
const rank2: CouponRank = "good";

// JS에서 계산은 함수로 정의
// 3. 쿠폰 등급을 결정하는 함수
function subCouponRank(subscriber: Subscriber): CouponRank {
  return subscriber.rec_count >= 10 ? "best" : "good";
}

// 4. DB에서 가져온 쿠폰 데이터
interface Coupon {
  code: string;
  rank: CouponRank;
}

const coupon1: Coupon = {
  code: "10PERCENT",
  rank: "bad",
};

const coupon2: Coupon = {
  code: "20PERCENT",
  rank: "good",
};

const coupon3: Coupon = {
  code: "50PERCENT",
  rank: "best",
};

const coupons1 = [coupon1, coupon2, coupon3];

// 5. 특정 등급의 쿠폰을 선택하는 계산
// 보낼 쿠폰 코드 리스트를 반환
function selectCouponsByRank(coupons: Coupon[], rank: CouponRank) {
  const codes: string[] = [];
  coupons.forEach((coupon) => {
    if (coupon.rank === rank) codes.push(coupon.code);
  });
  return codes;
}

// 테스트
// console.log("best 쿠폰 리스트:", selectCouponsByRank(coupons1, "best")); // best 쿠폰 리스트: [ '50PERCENT' ]

// 6. 보낼 이메일 데이터
interface Message {
  from: string;
  to: string;
  subject: string;
  body: string;
}

// 7. 구독자들이 받을 이메일을 만드는 계산
// 구독자 리스트(1), good, best 쿠폰코드 리스트(5번 계산으로 만든)가 필요
function emailForSubscriber(
  subscriber: Subscriber,
  goodCoupons: string[],
  bestCoupons: string[],
) {
  const rank = subCouponRank(subscriber);
  const codes =
    rank === "best"
      ? bestCoupons.join(", ")
      : rank === "good"
        ? goodCoupons.join(", ")
        : "";

  return {
    from: "newsletter@coupondog.co",
    to: subscriber.email,
    subject: `Your ${rank} weekly coupons inside`,
    body: `Here are the ${rank} coupons: ${codes}`,
  };
}

// console.log(
//   emailForSubscriber(
//     subscriber1,
//     selectCouponsByRank(coupons1, "good"),
//     selectCouponsByRank(coupons1, "best"),
//   ),
// );
/*
 {
  from: 'newsletter@coupondog.co',
  to: 'john@naver.com',
  subject: 'Your best weekly coupons inside',
  body: 'Here are the best coupons: 50PERCENT'
}

  */

// 8. 보낼 이메일 목록 만들기 (계산)
function emailsForSubscribers(
  subscribers: Subscriber[],
  goodCoupons: string[],
  bestCoupons: string[],
) {
  const emails = [];
  return subscribers.map((subscriber) =>
    emailForSubscriber(subscriber, goodCoupons, bestCoupons),
  );
}

const subscribers1 = [
  subscriber1,
  {
    email: "sam@gmail.com",
    rec_count: 9,
  },
  {
    email: "park@gmail.com",
    rec_count: 12,
  },
  {
    email: "kim@gmail.com",
    rec_count: 10,
  },
];

// console.log(
//   emailsForSubscribers(
//     subscribers1,
//     selectCouponsByRank(coupons1, "good"),
//     selectCouponsByRank(coupons1, "best"),
//   ),
// );

// 9. 이메일 보내기 (액션)
// 한 번에 모든 이메일 목록을 미리 만듬
function sendIssue() {
  const coupons = fetchCouponsFromDB();
  const goodCoupons = selectCouponsByRank(coupons, "good");
  const bestCoupons = selectCouponsByRank(coupons, "best");
  const subscribers = fetchSubscribersFromDB();
  const emails = emailsForSubscribers(subscribers, goodCoupons, bestCoupons);
  // 이메일 발송
  // sendEmail(emails);
}

// 9-1. 이메일 보내기 (액션) 리팩토링
// 20개씩 묶어서 처리
function refactoredSendIssue() {
  const coupons = fetchCouponsFromDB();
  const goodCoupons = selectCouponsByRank(coupons, "good");
  const bestCoupons = selectCouponsByRank(coupons, "best");
  let page = 0;
  let subscribers = fetchSubscribersFromDBbyPage(page);
  while (subscribers.length > 0) {
    const emails = emailsForSubscribers(subscribers, goodCoupons, bestCoupons);
    // 이메일 발송
    // sendEmail(emails);
    page++;
    subscribers = fetchSubscribersFromDBbyPage(page);
  }
}

function fetchCouponsFromDB() {
  return coupons1;
}

// 한 번에 모든 구독자 불러오는 함수
function fetchSubscribersFromDB() {
  return subscribers1;
}

// page 단위로 20개씩 구독자 불러오는 함수
function fetchSubscribersFromDBbyPage(page: number) {
  // TODO: page 1개 당 20개씩 끊게 변경
  return subscribers1;
}
