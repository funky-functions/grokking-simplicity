## p.79 연습문제 (1)

> 원래 코드

```javascript
function update_tax_dom() {
  set_tax_dom(shopping_cart_total * 0.1);
}
```

> 바꾼 코드

```javascript
function update_tax_dom() {
  set_tax_dom(calc_tax(shopping_cart_total));
}

function calc_tax(total) {
  return total * 0.1;
}
```

<br/>
<br/>

## p.82 연습문제 (2)

> 원래 코드

```javascript
function update_shipping_icons() {
  let buy_buttons = get_buy_buttons_dom();
  for (let i = 0; i < buy_buttons.length; i++) {
    let button = buy_buttons[i];
    let item = button.item;
    if (item.price + shopping_cart_total >= 20) {
      button.show_free_shipping_icon();
    } else button_hide_shipping_icon;
  }
}
```

> 바꾼 코드

```javascript
function update_shipping_icons() {
  let buy_buttons = get_buy_buttons_dom();
  for (let i = 0; i < buy_buttons.length; i++) {
    let button = buy_buttons[i];
    let item = button.item;
    if (gets_free_shipping(item.price, shopping_cart_total)) {
      button.show_free_shipping_icon();
    } else button_hide_shipping_icon;
  }
}

function gets_free_shipping(price, total) {
  return price + total >= 20;
}
```

<br/>
<br/>

## p.84 연습문제 (3)

> 전체 코드

`quiz.js` 참고
