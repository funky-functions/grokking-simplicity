export {};
// shift() 에 COW 적용
// 1. 읽기와 쓰기 함수로 각각 분리 (책임이 분리되어 더 좋음)
// 배열의 맨 첫번째 값 읽기
function first_element(array: any[]) {
  return array[0];
}

// 쓰기
function drop_first(array: any[]) {
  // 값을 리턴할 필요 없음
  array.shift();
}

// 쓰기 동작에 COW 적용
function dropFirst(array: any[]) {
  const array_copy = array.slice();
  array_copy.shift();
  return array_copy;
}

// 이제 shift를 읽기와 쓰기로 분리하여 사용 가능

// 2. 함수에서 값을 2개 리턴
// TODO: 1. shift() 메서드를 바꿀 수 있도록 새로운 함수로 감싸기
// TODO: 2. COW 적용

function shift(array: any[]) {
  const array_copy = array.slice();
  const first = array_copy.shift();
  return {
    first,
    array: array_copy,
  };
}

// 1번 접근 방식으로 만든 함수를 활용할 수도 있음
// 2가지 함수 모두 계산이므로 쉽게 조합이 가능
function shift2(array: any[]) {
  return {
    first: first_element(array),
    array: dropFirst(array),
  };
}

// 제품 가격을 설정하는 원래 코드
function set_price(item: { [key: string]: any }, new_price: number) {
  item.price = new_price;
}

// COW 적용
function setPrice(item: { [key: string]: any }, new_price: number) {
  const item_copy = Object.assign({}, item);
  item_copy.price = new_price;
  return item_copy;
}

// 아이템 이름으로 가격 바꾸는 원래 코드
function set_price_by_name(
  cart: { [key: string]: any }[],
  name: string,
  price: number,
) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === name) cart[i].price = price;
  }
}

// COW 적용 (앞서 적용한 setPrice 활용)
function setPriceByName(
  cart: { [key: string]: any }[],
  name: string,
  price: number,
) {
  const cart_copy = cart.slice();
  // 아래는 안됨!
  // for (let item of cart_copy) {
  //   if (item.name === name) {
  //     item = setPrice(item, price);
  //   }
  // }
  for (let i = 0; i < cart_copy.length; i++) {
    if (cart_copy[i].name === name) {
      cart_copy[i] = setPrice(cart_copy[i], price);
    }
  }
  return cart_copy;
}

const testCart = [
  { name: "b", price: 1 },
  { name: "c", price: 2 },
];

console.log(setPriceByName(testCart, "c", 5)); // [ { name: 'b', price: 1 }, { name: 'c', price: 5 } ]

