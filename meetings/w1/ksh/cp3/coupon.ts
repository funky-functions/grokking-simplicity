// 1. 데이터베이스에서 가져온 구독자 데이터
interface Subscriber {
  email: string;
  rec_count: number;
}

const subscriber1: Subscriber = {
  email: "test@example.com",
  rec_count: 16,
};

// 2. 쿠폰 등급
type CouponRank = "best" | "good" | "bad";

// 3. 쿠폰 등급을 결정하는 것은 함수
// JS에서 계산은 함수로 구현
// 계산은 입력값으로 출력값을 만드는 것
function subCouponRank(subscriber: Subscriber) {
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

const couponList: Coupon[] = [coupon1, coupon2, coupon3];

// 5. 특정 등급의 쿠폰 목록 선택하는 계산은 함수
// - 입력값 : 전체 쿠폰 목록, 선택할 등급
// - 출력값 : 선택한 등급을 가진 쿠폰 코드 목록
function selectCouponsByRank(coupons: Coupon[], rank: CouponRank) {
  const codes: string[] = [];
  coupons.forEach((coupon: Coupon) => {
    coupon.rank === rank && codes.push(coupon.code);
  });
  return codes;
}

// 결과값
console.log("best 쿠폰 리스트 : ", selectCouponsByRank(couponList, "best")); //  best 쿠폰 리스트 :  [ '50PERCENT' ]
