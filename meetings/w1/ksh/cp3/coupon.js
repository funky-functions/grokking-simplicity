// 1. 데이터베이스에서 가져온 구독자 데이터
var subscriber1 = {
    email: "test@example.com",
    rec_count: 16,
};
// const rank1: CouponRank = "best";
// const rank2: CouponRank = "good";
// 3. 쿠폰 등급을 결정하는 것은 함수
// JS에서 계산은 함수로 구현
// 계산은 입력값으로 출력값을 만드는 것
function subCouponRank(subscriber) {
    return subscriber.rec_count >= 10 ? "best" : "good";
}
var coupon1 = {
    code: "10PERCENT",
    rank: "bad",
};
var coupon2 = {
    code: "20PERCENT",
    rank: "good",
};
var coupon3 = {
    code: "50PERCENT",
    rank: "best",
};
var couponList = [coupon1, coupon2, coupon3];
// 5. 특정 등급의 쿠폰 목록 선택하는 계산은 함수
// 입력값 : 전체 쿠폰 목록, 선택할 등급
// 출력값 : 선택한 등급을 가진 쿠폰 코드 목록
function selectCouponsByRank(coupons, rank) {
    var codes = [];
    coupons.forEach(function (coupon) {
        coupon.rank === rank && codes.push(coupon.code);
    });
    return codes;
}
console.log("best 쿠폰 리스트 : ", selectCouponsByRank(couponList, "best"));
