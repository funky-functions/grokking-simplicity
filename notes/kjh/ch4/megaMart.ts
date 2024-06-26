interface ShoppingItem {
  name: string;
  price: number;
}

const shopping_cart: ShoppingItem[] = []; // A -> 전역변수 이므로 액션
let shopping_cart_total = 0; // A

// 아이템을 카트에 담기
function add_item_to_cart(name: string, price: number) {
  // A -> 전역변수 바꾸므로 액션
  shopping_cart.push({
    name,
    price,
  });
}

// 카트 총 금액 계산
function calc_cart_total() {
  // A
  shopping_cart_total = 0;
  shopping_cart.forEach((item) => (shopping_cart_total += item.price));
  // set_cart_total_dom(); // 금액 합계를 DOM에 반영
  // update_shipping_icons(); // 구매 아이콘 업데이트
  // update_tax_dom(); // 세금을 DOM에 반영
}

// 구매 버튼들에 배송비 무료 아이콘을 추가할 수 있는 함수
function update_shipping_icons() {
  // A
  // const buy_buttons = get_buy_buttons_dom(); // DOM에서 값 읽는 것 -> 액션
  // buy_buttons.forEach((button) => {
  //   const item = button.item;
  // DOM 바꾸는 것 -> 액션
  //   if (item.price + shopping_cart_total >= 20) {
  //      button.show_free_shipping_icon();
  //   } else {
  //      button.hide_free_shipping_icon();
  //   }
  // });
}

// 장바구니 금액 합계에 10%의 세금을 계산
function update_tax_dom() {
  // A
  // 세금 계산하고 이를 DOM에 반영
  // set_tax_dom(shopping_cart_total * 0.1);
}

// -------- 리팩토링: 액션에서 계산 빼내기1 --------

// 카트 총 금액 계산
// TODO: 1. 총 금액 계산만하는 함수를 만들어서 분리 (서브루틴 추출)
// TODO: 2. 분리한 함수를 액션 -> 계산으로 변경
function refactored_calc_cart_total() {
  shopping_cart_total = refactored_calc_total(shopping_cart);
  // set_cart_total_dom(); // 금액 합계를 DOM에 반영
  // update_shipping_icons(); // 구매 아이콘 업데이트
  // update_tax_dom(); // 세금을 DOM에 반영
}

// 분리한 총 금액 계산하는 함수 (액션)
function calc_total() {
  shopping_cart_total = 0;
  shopping_cart.forEach((item) => (shopping_cart_total += item.price));
}

// 계산으로 변경
// 1. 전역변수 변경 대신 리턴값 추가: 명시적 출력 생성
// 2. 전역변수 입력 대신 매개변수 추가: 명시적 입력 생성
function refactored_calc_total(cart: ShoppingItem[]) {
  return cart.reduce((acc, cur) => acc + cur.price, 0);
}

// console.log(
//   refactored_calc_total([
//     {
//       name: "빵",
//       price: 1,
//     },
//     {
//       name: "술",
//       price: 10,
//     },
//     {
//       name: "고기",
//       price: 5,
//     },
//   ]),
// );

// -------- 리팩토링: 액션에서 계산 빼내기2 --------

// 아이템을 카트에 담기
// TODO: 1. 아이템을 장바구니 추가하는 함수를 분리
// TODO: 2. 분리한 함수를 액션 -> 계산으로 변경
function refactored_add_item_to_cart(name: string, price: number) {
  // A -> 전역변수 바꾸므로 액션
  shopping_cart.push({
    name,
    price,
  });
}

// 분리한 장바구니 추가 함수 (액션)
function add_item(name: string, price: number) {
  shopping_cart.push({
    name,
    price,
  });
}

// 계산으로 변경
// 1. 전역변수 변경 대신 리턴값 추가: 명시적 출력 생성
// 2. 전역변수 입력 대신 매개변수 추가: 명시적 입력 생성
function refactored_add_item(
  cart: ShoppingItem[],
  name: string,
  price: number,
) {
  return [...cart, { name, price }];
}

// -------- 리팩토링: 액션에서 계산 빼내기3 --------

// 장바구니 금액 합계에 10%의 세금을 계산
// 계산으로 변경
// TODO: 1. 세금만 계산하는 함수를 만들어서 분리
// TODO: 2. 분리한 함수를 액션 -> 계산으로 변경
function refactored_update_tax_dom(total_price: number) {
  const tax = calc_tax(total_price);
  // 세금 계산하고 이를 DOM에 반영
  // set_tax_dom(tax);
}

// 세금 계산만 하는 함수
function calc_tax(total_price: number) {
  const TAX_RATE = 0.1;
  return total_price * TAX_RATE;
}

// -------- 리팩토링: 액션에서 계산 빼내기4 --------

// 구매 버튼들에 배송비 무료 아이콘을 추가할 수 있는 함수
// TODO: 1. 배송비 무료 여부를 리턴하는 함수를 분리
// TODO: 2. 분리한 함수를 액션 -> 계산으로 변경
function refactored_update_shipping_icons() {
  // const buy_buttons = get_buy_buttons_dom();
  // buy_buttons.forEach((button) => {
  //   const item = button.item;
  //   if (is_free_shipping(item.price, shopping_cart_total)) {
  //      button.show_free_shipping_icon();
  //   } else {
  //      button.hide_free_shipping_icon();
  //   }
  // });
}

function is_free_shipping(item_price: number, total_price: number) {
  return item_price + total_price >= 20;
}
