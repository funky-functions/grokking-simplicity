/// TS2393: Duplicate function implementation. 에러 방지
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
  // update_shipping_icons(); // 구매 아이콘 업데이트
  // update_tax_dom(); // 세금을 DOM에 반영
}

function updateShippingIcons() {
  // A
  // const buy_buttons = get_buy_buttons_dom();
  // buy_buttons.forEach((button) => {
  //   const item = button.item;
  //   if (is_free_shipping(item.price, shopping_cart_total)) {
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
