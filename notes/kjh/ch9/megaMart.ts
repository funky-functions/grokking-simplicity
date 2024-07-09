export {};
interface ShoppingItem {
  name: string;
  price: number;
}

// -------- 리팩토링1. 성능 개선을 위해 배열 순회 대신 객체 참조 방식으로 변경 --------
// TODO: 1. 장바구니를 배열에서 객체로 바꾸기
// 배열
function add_item(cart: ShoppingItem[], item: ShoppingItem) {
  return add_element_last(cart, item);
}
// 객체
function addItem(cart: any, item: ShoppingItem) {
  // return objectSet(cart, item.name, item);
}

// 배열
function calc_total(cart: ShoppingItem[]) {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    total += item.price;
  }
  return total;
}
// 객체
function calcTotal(cart: { [key: string]: ShoppingItem }) {
  let total = 0;
  const names = Object.keys(cart);
  for (let i = 0; i < names.length; i++) {
    const item = cart[names[i]];
    total += item.price;
  }
  return total;
}

// 배열
function set_price_by_name(cart: ShoppingItem[], name: string, price: number) {
  const cartCopy = cart.slice();
  for (let i = 0; i < cartCopy.length; i++) {
    // if (cartCopy[i].name === name) cartCopy[i] = setPrice(cartCopy[i], price);
  }
  return cartCopy;
}
// 객체
function setPriceByName(
  cart: { [key: string]: ShoppingItem },
  name: string,
  price: number,
) {
  if (isInCart(cart, name)) {
    const item = cart[name];
    // const copy = setPrice(item, price);
    // return objectSet(cart, name, copy);
  } else {
    // const item = make_item(name, price);
    // return objectSet(cart, name, item);
  }
}

// 배열
function remove_item_by_name(cart: ShoppingItem[], name: string) {
  const idx = indexOfItem(cart, name);
  // if (idx !== null) return splice(cart, idx, 1);
  return cart;
}
// 객체
function removeItemByName(cart: { [key: string]: ShoppingItem }, name: string) {
  // return objectDelete(cart, name);
}

// 배열
function indexOfItem(cart: ShoppingItem[], name: string) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === name) return i;
  }
  return null;
}

// 배열
function is_in_cart(cart: ShoppingItem[], name: string) {
  return indexOfItem(cart, name) !== null;
}
// 객체
function isInCart(cart: { [key: string]: ShoppingItem }, name: string) {
  return cart.hasOwnProperty(name);
}

function add_element_last(array: any[], elem: any) {
  const new_array = array.slice();
  new_array.push(elem);
  return new_array;
}

function objectSet(object: ShoppingItem, key: string, value: string | number) {
  const object_copy = Object.assign({}, object);
  // @ts-ignore
  object_copy[key] = value;
  return object_copy;
}
