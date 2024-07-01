export {};
// 연습문제 p.93
// 전역 변수 읽는 부분을 찾아 바꾸기
// 1. 전역 변수 shopping_cart 읽는 부분 1군데만 남기고 모두 제거
// 2. 미사용 shopping_cart_total 제거
interface ShoppingItem {
  name: string;
  price: number;
}

let shopping_cart: ShoppingItem[] = [];
let shopping_cart_total = 0;

function add_item(cart: ShoppingItem[], name: string, price: number) {
  return [...cart, { name, price }];
}

function add_item_to_cart(name: string, price: number) {
  // 유일하게 전역 변수 읽는 부분
  shopping_cart = add_item(shopping_cart, name, price);
  const total = calc_total(shopping_cart);
  set_cart_total_dom(total);
  update_shipping_icons(shopping_cart);
  update_tax_dom(total);
  shopping_cart_total = total;
}

function calc_total(shoppingCart: ShoppingItem[]) {
  return shoppingCart.reduce((acc, cur) => acc + cur.price, 0);
}

// 전역 변수 참조 대신 매개변수 추가
// 내부에서 호출하는 함수들에도 인수 전달
// 함수만의 역할 존재감이 없어서 호출하는 곳으로 합침
// function calc_cart_total(cart: ShoppingItem[]) {
//   const total = calc_total(cart);
//   set_cart_total_dom(total);
//   update_shipping_icons(cart);
//   update_tax_dom(total);
//   shopping_cart_total = total;
// }

function set_cart_total_dom(total: number) {
  //...
}

function update_shipping_icons(cart: ShoppingItem[]) {
  // const buttons = get_buy_buttons_dom();
  // buttons.forEach((button) => {
  //   const item = button.item;
  //   const new_cart = add_item(cart, item.name, item.price);
  //   if (gets_free_shipping(new_cart)) button.show_free_shipping_icon();
  //   else button.hide_free_shipping_icon();
  // });
}

function get_buy_buttons_dom() {
  // ...
}

function gets_free_shipping() {
  // ...
}

function update_tax_dom(total: number) {
  set_tax_dom(calc_tax(total));
}

function calc_tax(amount: number) {
  return amount * 0.1;
}

function set_tax_dom(tax: number) {
  // ...
}
