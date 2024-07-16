export {};
interface ShoppingItem {
  name: string;
  price: number;
  quantity: number;
  size: number;
}

interface ShoppingCart {
  [key: string]: ShoppingItem;
}
// p.244 연습문제
// 비슷한 함수들의 반복을 막기 위해 암묵적 인자 명시하기
// function incrementQuantityByName(cart: ShoppingCart, name: string) {
//   const item = cart[name];
//   const quantity = item["quantity"];
//   const newQuantity = quantity + 1;
//   const newItem = objectSet(item, "quantity", newQuantity);
//   const newCart = objectSet(cart, name, newItem);
//   return newCart;
// }
// function incrementSizeByName(cart: ShoppingCart, name: string) {
//   const item = cart[name];
//   const size = item["size"];
//   const newSize = size + 1;
//   const newItem = objectSet(item, "size", newSize);
//   const newCart = objectSet(cart, name, newItem);
//   return newCart;
// }

function incrementFieldByName(
  cart: ShoppingCart,
  name: string,
  field: keyof ShoppingItem,
) {
  const item = cart[name];
  let fieldValue = item[field];
  if (typeof fieldValue === "number") fieldValue += 1;
  const newItem = objectSet(item, field, fieldValue);
  return objectSet(cart, name, newItem);
}

function objectSet<T extends ShoppingItem | ShoppingCart, K extends keyof T>(
  object: T,
  key: K,
  value: T[K],
): T {
  const copy = Object.assign({}, object);
  copy[key] = value;
  return copy;
}
