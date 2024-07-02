interface ShoppingItem {
  name: string;
  price: number;
}

let shopping_cart: ShoppingItem[] = [];

// 원래 코드
function add_item_to_cart(name: string, price: number) {
  const item = make_cart_item(name, price);
  shopping_cart = add_item(shopping_cart, item);
  const total = calc_total(shopping_cart);
  // update_shipping_icons(shipping_cart);
  // update_tax_dom(total);
  // const cart_copy = deepCopy(shopping_cart);
  // black_friday_promotion(cart_copy);
  // shopping_cart = deepCopy(cart_copy);
}

// -------- 리팩토링1. 방어적 복사 코드 분리 --------
// TODO: 방어적 복사 코드 재사용
function black_friday_promotion_safe(cart: ShoppingItem[]) {
  // const cart_copy = deepCopy(cart);
  // black_friday_promotion(cart_copy);
  // return deepCopy(cart_copy);
}

function refactored_add_item_to_cart(name: string, price: number) {
  const item = make_cart_item(name, price);
  shopping_cart = add_item(shopping_cart, item);
  const total = calc_total(shopping_cart);
  // update_shipping_icons(shipping_cart);
  // update_tax_dom(total);
  // 분리한 함수 호출
  // shopping_cart = black_friday_promotion_safe(shopping_cart);
}

function make_cart_item(name: string, price: number) {
  return {
    name,
    price,
  };
}

function add_item(cart: ShoppingItem[], item: ShoppingItem) {
  return [...cart, item];
}

function calc_total(cart: ShoppingItem[]) {
  return cart.reduce((acc, cur) => acc + cur.price, 0);
}
