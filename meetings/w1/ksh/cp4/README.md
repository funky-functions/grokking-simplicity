# CP 4. 액션에서 계산 빼내기

## 1. 테스트와 재사용성

### 1) 테스트

- DOM 업데이트와 비즈니스 규칙은 분리되어야 함
- 전역변수가 없어야 함

### 2) 재사용성

- 전역변수에 의존하지 않아야 함
- DOM을 사용할 수 있는 곳에서 실행된다고 가정하면 안됨
- 함수가 결과값을 리턴해야 함

## 2. 액션, 계산, 데이터 구분하기

### 액션

- 전역변수를 바꾸는 것
- DOM에서 읽는 것 or 바꾸는 것

### 입력

- 인자 : `명시적 입력`
- 전역변수를 읽는 것 : `암묵적 입력`

### 출력

- 리턴값 : `명시적 출력`
- 전역변수를 바꾸는 것 : `암묵적 출력`
- 콘솔에 찍는 것 : `암묵적 출력`

<br/>

## 3. 암묵적 코드를 없앤 코드

> 원래 코드

```javascript
function calc_cart_total() {
  shopping_cart_total = 0; // 암묵적 출력
  // 계산에 해당되는 코드 시작
  for (let i = 0; i < shopping_cart.length; i++) {
    // shopping_cart : 암묵적 입력
    let item = shopping_cart[i]; // shopping_cart : 암묵적 입력
    shopping_cart_total += item.price; // 암묵적 출력
  }
  // 계산에 해당되는 코드 끝
  set_cart_total_dom();
  update_shipping_icons();
  update_tax_dom();
}
```

- `출력` : 전역변숫값을 바꿈
- `입력` : 전역변수값을 읽음

<br/>

> 암묵적 출력을 없앤 코드

```javascript
function calc_cart_total() {
  shopping_cart_total = calc_total(); // 리턴한 계산값을 전역변수에 할당
  set_cart_total_dom();
  update_shipping_icons();
  update_tax_dom();
}

function calc_total(cart) {
  let total = 0; // 지역변수
  for (let i = 0; i < cart.length; i++) {
    let item = cart[i];
    total += item.price; // 지역변수 사용
  }
  return total; // 지역변수 리턴
}
```

<br/>

> 암묵적 입력을 없앤 코드

```javascript
function calc_cart_total() {
  shopping_cart_total = calc_total(shopping_cart);
  // shopping_cart : 인자로 전달

  set_cart_total_dom();
  update_shipping_icons();
  update_tax_dom();
}

function calc_total(cart) {
  // cart: 전역변수 대신 인자를 만들어 사용
  var total = 0;
  for (var i = 0; i < shopping_cart.length; i++) {
    var item = shopping_cart[i];
    total += item.price;
  }
  return total;
}
```

<br/>

## 4. 액션에서 또 다른 계산 뻬내기

> 원래 코드

```javascript
function add_item__to_cart(name, price) {
  shopping_cart.push({
    name,
    price,
  });

  calc_cart_total();
}
```

<br/>

> 함수 추출하기 (계산 빼내기)

```javascript
function add_item_to_cart(name, price) {
  add_item(name, price);
  calc_cart_total();
}

function add_item(name, price) {
  shopping_cart.push({
    // push 함수로 배열을 바꾸고 있음 (암묵적 출력)
    // 전역변수인 shopping_cart 읽고 있음 (암묵적 입력)
    name,
    price,
  });
}
```

<br/>

> 암묵적 입력을 없앤 코드

```javascript
function add_item_to_cart(name, price) {
  add_item(shopping_cart, name, price);
  // shopping_cart : 전역변수를 인자로 넘김
  calc_cart_total();
}

function add_item(cart, name, price) {
  // cart : 인자를 추가
  cart.push({
    // 전역변수 대신 인자를 사용
    name,
    price,
  });
}
```

<br/>

> 암묵적 출력을 없앤 코드

```javascript
function add_item_to_cart(name, price) {
  shopping_cart = add_item(shopping_cart, name, price); // shopping_cart : 원래 함수에서 리턴값을 받아, 전역변수에 할당
  calc_cart_total();
}

function add_item(cart, name, price) {
  let new_cart = cart.slice(); // 복사본을 만들어 지역변수에 할당
  new_cart.push({
    // 복사본을 변경
    name,
    price,
  });
  return new_cart;
  // 복사본을 리턴
}
```

<br/>

## 5. 계산 추출을 단계별로 알아보기

1. 계산 코드를 찾아 빼내기 (새 함수 추출)
2. 새 함수에 암묵적 입력과 추출 찾기

- `암묵적 입력` : 함수를 부르는 동안 결과에 영향 줄 수 있는 것
- `암묵적 출력` : 함수 호출 결과로 영향 받는 것
- `입력` : 함수 인자를 포함해 밖에 있는 변수를 읽거나 DB에서 값을 가져오는 것
- `출력` : 리턴값을 포함해 전역변수를 바꾸거나 공유객체를 바꾸거나, 웹 요청을 보내는 것

3. '암묵적 입력'은 '인자'로, '암묵적 출력'은 '리턴값'으로 바꾸기

- `인자`와 `리턴값`은 바뀌지 않는 불변값이어야 함
