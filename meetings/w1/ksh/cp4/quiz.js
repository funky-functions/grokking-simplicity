let shopping_cart = []; // 전역변수 --> 액션
let shopping_cart_total = 0; // 전역변수 --> 액선

function add_item_to_cart(name, price) {
  shopping_cart = add_item(shopping_cart_total, name, price); //
  // shopping_cart_total: 전역변수를 읽음 --> 액선
  calc_cart_total();
}

function calc_cart_total() {
  shopping_cart_total = calc_cart_total(shopping_cart); // shopping_cart : 전역변수를 읽음 --> 액션
  set_cart_total_dom();
  update_shipping_icons();
  update_tax_dom();
}

function update_shipping_icons() {
  let buy_buttons = get_buy_buttons_dom();
  for (let i = 0; i < buy_buttons.length; i++) {
    let button = buy_buttons[i];
    let item = button.item;
    if (gets_free_shipping(item.price, shopping_cart_total)) {
      // shopping_cart_total : 전역변수를 읽음 --> 액션
      button.show_free_shipping_icon();
    } else button_hide_shipping_icon;
  }
}

function update_tax_dom() {
  set_tax_dom(calc_tax(shopping_cart_total)); // shopping_cart_total : 전역변수를 읽음 --> 액션
}

function add_item(cart, name, price) {
  let new_cart = cart.slice(); // 배열의 복사본 생성
  new_cart.push({ name, price });
  return new_cart; // 암묵적 입력과 출력이 없음
}

function calc_total(cart) {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    let item = cart[i];
    total += item.price;
  }
  return total;
}

function gets_free_shipping(price, total) {
  return price + total >= 20; // 암묵적 입력과 출력이 없음
}

function calc_tax(amount) {
  return amount * 0.1; // 암묵적 입력과 출력이 없음
}
