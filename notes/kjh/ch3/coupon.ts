// JS에서 데이터는 객체, 문자열 등으로 정의
// DB에서 가져온 구독자 데이터
interface Subscriber {
  email: string;
  rec_count: number;
}

const subscriber1: Subscriber = {
  email: "john@naver.com",
  rec_count: 16,
};

// 쿠폰 등급
type CouponRank = "best" | "good" | "bad";

const rank1: CouponRank = "best";
const rank2: CouponRank = "good";

// JS에서 계산은 함수로 정의
// 쿠폰 등급을 결정하는 함수
function subCouponRank(subscriber: Subscriber): CouponRank {
  return subscriber.rec_count >= 10 ? "best" : "good";
}

// DB에서 가져온 쿠폰 데이터
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

// 특정 등급의 쿠폰을 선택하는 계산
// 보낼 쿠폰 코드 리스트를 반환
function selectCouponsByRank(coupons: Coupon[], rank: CouponRank) {
  const codes: string[] = [];
  coupons.forEach((coupon) => {
    if (coupon.rank === rank) codes.push(coupon.code);
  });
  return codes;
}

// console.log("best 쿠폰 리스트:", selectCouponsByRank(coupons1, "best")); // best 쿠폰 리스트: [ '50PERCENT' ]
