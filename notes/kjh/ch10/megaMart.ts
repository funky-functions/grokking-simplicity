export {};
interface ShoppingItem {
  name: string;
  price: number;
}

interface ShoppingCart {
  [key: string]: ShoppingItem;
}

// 코드 스멜: 암묵적 인자 price
// TODO: 리팩터링1: 암묵적 인자를 명시하기
function setPriceByName(cart: ShoppingCart, name: string, price: number) {
  const item = cart[name];
  const newItem = objectSet(item, "price", price);
  return objectSet(cart, name, newItem);
}

/* 예시
cart = setPriceByName(cart, "shoe", 13);
cart = setQuantityByName(cart, "shoe", 3);
cart = setShippingByName(cart, "shoe", 0);
cart = setTaxByName(cart, "shoe", 2.34);
*/

// -------- 리팩터링1: 암묵적 인자를 명시하기 --------
// field를 일급 값으로 만듬
function setFieldByName(
  cart: ShoppingCart,
  name: string,
  field: keyof ShoppingItem,
  value: string | number,
) {
  // 런타임 검사를 추가할 수도 있음 (타입스크립트를 사용하여 정적 체크를 하고 있지만)
  // const  validItemFields = ["price", "quantity", "shipping", "tax"];
  // if (!validItemFields.include(field)) throw new Error("Not a valid item field");
  const item = cart[name];
  const newItem = objectSet(item, field, value);
  return objectSet(cart, name, newItem);
}

/* 예시
cart = setFieldByName(cart, "shoe", "price", 13);
cart = setFieldByName(cart, "shoe", "quantity", 3);
cart = setFieldByName(cart, "shoe", "shipping", 0);
cart = setFieldByName(cart, "shoe", "tax", 2.34);
*/

function objectSet<T extends ShoppingItem | ShoppingCart, K extends keyof T>(
  object: T,
  key: K,
  value: T[K],
): T {
  const copy = Object.assign({}, object);
  copy[key] = value;
  return copy;
}

// -------- 리팩터링2: 함수 본문을 콜백으로 바꾸기 --------
// 로깅 함수의 try catch 문을 함수로 감싸기
function withLogging(f: () => void) {
  try {
    f();
  } catch (err) {
    // logToSnapErrors(err); // 가상의 로깅 API
  }
}

withLogging(() => {});
