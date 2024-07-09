export {};
interface ShoppingItem {
  name: string;
  price: number;
}

let shoppingCart: ShoppingItem[] = []; // A
let shoppingCartTotal = 0; // A

function addItemToCart(name: string, price: number) {
  // A
  shoppingCart = addItem(shoppingCart, name, price);
  calcCartTotal();
}

function addItem(cart: ShoppingItem[], name: string, price: number) {
  // C
  return [...cart, { name, price }];
}

function calcCartTotal() {
  // A
  shoppingCartTotal = calcTotal(shoppingCart);
  // set_cart_total_dom(); // 금액 합계를 DOM에 반영
  // 전달받은 장바구니 사용
  // update_shipping_icons(shoppingCart); // 구매 아이콘 업데이트
  // update_tax_dom(); // 세금을 DOM에 반영
}

function updateShippingIcons() {
  // A
  // const buy_buttons = get_buy_buttons_dom();
  // buy_buttons.forEach((button) => {
  //   const item = button.item;
  // 리팩토링1. 적용
  //   const newCart = add_item(shoppingCart, item.name, item.price);
  //   if (refactoredIsFreeShipping(newCart)) {
  //      button.show_free_shipping_icon();
  //   } else {
  //      button.hide_free_shipping_icon();
  //   }
  // });
}

function updateTaxDom() {
  // A
  // setTaxDom(calcTax(shoppingCartTotal);
}

function calcTotal(shoppingCart: ShoppingItem[]) {
  // C
  return shoppingCart.reduce((acc, cur) => acc + cur.price, 0);
}

function isFreeShipping(price: number, totalPrice: number) {
  // C
  return price + totalPrice >= 20;
}

function calcTax(amount: number) {
  // C
  return amount * 0.1;
}

// -------- 리팩토링1. 중복 줄이기 --------
// TODO: 1. 현재 장바구니 합계만 가지고 무료 배송 여부를 판단
// TODO: 2. 코드 중복 줄이기

function refactoredIsFreeShipping(cart: ShoppingItem[]) {
  // calcTotal 계산 재사용
  return calcTotal(cart) >= 20;
}

// -------- 리팩토링2. 암묵적 입출력 줄이기 --------
// TODO: 1. 전역변수 읽는 코드 바꾸기

function refactoredUpdateShippingIcons(cart: ShoppingItem[]) {
  // const buy_buttons = get_buy_buttons_dom();
  // buy_buttons.forEach((button) => {
  //   const item = button.item;
  // 전역 변수 대신 매개변수로 받은 장바구니 전달
  //   const newCart = add_item(cart, item.name, item.price);
  //   if (refactoredIsFreeShipping(newCart)) {
  //      button.show_free_shipping_icon();
  //   } else {
  //      button.hide_free_shipping_icon();
  //   }
  // });
}

// -------- 리팩토링3. 유틸 함수 활용 --------
// TODO: 1. 장바구니 뿐만 아니라 배열에 원소 추가할 때 어디서나 재사용 가능
function add_element_last(array: any[], elem: any) {
  // copy-on-write 패턴: 값을 바꿀 때 복사
  const new_array = array.slice();
  new_array.push(elem);
  return new_array;
}
