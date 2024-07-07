interface ShoppingItem {
  name: string;
  price: number;
}
// 연습문제. setPriceByName() 함수와 indexOfItem() 함수 중 하나로 재사용해서 리팩토링하기

function set_price_by_name(cart: ShoppingItem[], name: string, price: number) {
  const cartCopy = cart.slice();
  for (let i = 0; i < cartCopy.length; i++) {
    if (cartCopy[i].name === name) cartCopy[i] = setPrice(cartCopy[i], price);
  }
  return cartCopy;
}

function indexOfItem(cart: ShoppingItem[], name: string) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === name) return i;
  }
  return null;
}

// -------- 리팩토링 --------
// TODO: 1. indexOfItem 재사용하기
// TODO: 2. COW 패턴 적용(arraySet() 활용)
function setPriceByName(cart: ShoppingItem[], name: string, price: number) {
  // 1. 재사용
  // const cartCopy = cart.slice();
  // const idx = indexOfItem(cart, name);
  // // 또는 findIndex 사용하기
  // // const idx = cart.findIndex((item) => item.name === name);
  // if (idx !== null) cartCopy[idx] = setPrice(cartCopy[idx], price);
  // return cartCopy;

  // 2. COW 패턴 적용
  const idx = indexOfItem(cart, name);
  if (idx !== null) return arraySet(cart, idx, setPrice(cart[idx], price));
  return cart;
}

function setPrice(item: ShoppingItem, new_price: number) {
  return objectSet(item, "price", new_price);
}

function objectSet(object: ShoppingItem, key: string, value: string | number) {
  const object_copy = Object.assign({}, object);
  // @ts-ignore
  object_copy[key] = value;
  return object_copy;
}

function arraySet(array: ShoppingItem[], idx: number, value: ShoppingItem) {
  const copy = array.slice();
  copy[idx] = value;
  return copy;
}
