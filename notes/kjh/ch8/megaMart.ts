export {};
interface ShoppingItem {
  name: string;
  price: number;
}

// 넥타이 하나를 사면 무료로 넥타이 클립을 주는 코드
// 클립을 무료로 생성하기 위해 직접 cart 배열을 순회하므로 좋은 설계가 아님
function free_tie_clip(cart: ShoppingItem[]) {
  let hasTie = false;
  let hasTieClip = false;

  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    if (item.name === "tie") hasTie = true;
    if (item.name === "tie clip") hasTieClip = true;
  }

  if (hasTie && !hasTieClip) {
    const tieClip = make_item("tie clip", 0);
    return add_item(cart, tieClip);
  }
  return cart;
}

// -------- 리팩토링 1. 직접 구현 패턴 적용 --------
// TODO: 1. 장바구니 안에 특정 제품이 있는지 확인하는 함수 추가
function freeTieClip(cart: ShoppingItem[]) {
  const hasTie = isInCart(cart, "tie");
  const hasTieClip = isInCart(cart, "tie clip");

  if (hasTie && !hasTieClip) {
    const tieClip = make_item("tie clip", 0);
    return add_item(cart, tieClip);
  }
  return cart;
}

// 장바구니 안에 특정 제품이 있는지 확인하는 함수
function isInCart(cart: ShoppingItem[], name: string) {
  // for (let i = 0; i < cart.length; i++) {
  //   if (cart[i].name === name) return true;
  // }
  // return false;

  // 리팩토링
  // TODO: 재사용성 강화 및 계층 명확화
  // 1. 아래에서 구현할 indexOfItem 함수를 적용하거나
  // 2. findIndex 활용
  return cart.findIndex((item) => item.name === name) >= 0;
}

// 내부의 for loop 를 추상화해야 가독성이 올라간다
function remove_item_by_name(cart: ShoppingItem[], name: string) {
  let idx = null;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === name) idx = i;
  }
  if (idx !== null) return removeItems(cart, idx, 1);
  return cart;
}

// -------- 리팩토링 2. 반복문 빼내서 새로운 함수로 만들기 --------
// TODO: 1. 반복문 빼내서 새로운 함수로 만들기
function removeItemByName(cart: ShoppingItem[], name: string) {
  // let idx = indexOfItem(cart, name);
  // findIndex 활용
  const idx = cart.findIndex((item) => item.name === name);
  if (idx !== null) return removeItems(cart, idx, 1);
  return cart;
}

// 책에서는 특정 인덱스를 찾는 함수를 만들었지만, findIndex()를 사용하면 되지 굳이 새로 만들 필요가 있을까?
function indexOfItem(cart: ShoppingItem[], name: string) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === name) return i;
  }
  return null;
}

function make_item(name: string, price: number) {
  return { name, price };
}

function removeItems(array: ShoppingItem[], idx: number, count: number) {
  const copy = array.slice();
  copy.splice(idx, count);
  return copy;
}
