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

// 리팩토링!
