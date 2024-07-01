export {};
interface ShoppingItem {
  name: string;
  price: number;
}

let shopping_cart: ShoppingItem[] = [];

// 장바구니에서 아이템 제거하는 함수
function remove_item_by_name(cart: ShoppingItem[], name: string) {
  let idx = null;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === name) idx = i;
  }
  if (idx !== null) cart.splice(idx, 1);
}

let sample_cart = [
  { name: "빵", price: 1 },
  { name: "케익", price: 2 },
  { name: "떡", price: 3 },
];

// remove_item_by_name(sample_cart, "케익");

// console.log(sample_cart); // [ { name: '빵', price: 1 }, { name: '떡', price: 3 } ]

// -------- 리팩토링 1. 장바구니에서 아이템 제거하는 함수에 COW 적용 --------
// TODO: 1. 복사본 만들기
// TODO: 2. 복사본 변경하기
// TODO: 3. 복사본 리턴
function refactored_remove_item_by_name(cart: ShoppingItem[], name: string) {
  const new_cart = cart.slice();
  let idx = null;
  for (let i = 0; i < new_cart.length; i++) {
    if (new_cart[i].name === name) idx = i;
  }
  if (idx !== null) new_cart.splice(idx, 1);
  return new_cart;
}

const result = refactored_remove_item_by_name(sample_cart, "케익");
console.log(result);
console.log("원본", sample_cart); // 원본 변경 안됨!

function delete_handler(name: string) {
  // 전역 변수 변경
  sample_cart = refactored_remove_item_by_name(sample_cart, name);
  // const total = calc_total(sample_cart);
  // update_shipping_icons(sample_cart);
  // update_tax_dom(total);
}

// -------- 리팩토링 2. 장바구니에서 아이템 제거하는 함수에 COW 적용 --------
// TODO: 1. splice() 일반화하는 removeItems() 만들기
// TODO: 2. removeItems()를 remove_item_by_name()에 적용
function removeItems(array: any[], idx: number, count: number) {
  // TODO: before
  // array.splice(idx, count);
  // TODO: after
  const copy = array.slice();
  copy.splice(idx, count);
  return copy;
}

function removeItemByName(cart: ShoppingItem[], name: string) {
  let idx = null;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === name) idx = i;
  }
  if (idx !== null) return removeItems(cart, idx, 1);
  // 값을 바꾸지 않으면 복사하지 않음
  return cart;
}
