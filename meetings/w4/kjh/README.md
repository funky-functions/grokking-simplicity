## Intro: 함수 이름에서의 Code Smell과 리팩터링
Code Smell: 함수 본문에서 사용하는 어떤 값이 함수 이름에 나타난다면
- 함수 이름에 있는 암묵적 인자는 Code Smell이 된다
- 특징
  - 거의 똑같이 구현된 함수들이 존재 (불필요한 반복)
    - 함수 이름이 구현의 차이를 만들 뿐
  - 함수 이름이 구현에 있는 다른 부분을 가리킨다

리팩터링 1: 암묵적 인자를 드러내기
- 함수 이름에 있는 암묵적 인자를 명시적 인자로 바꾸기

리팩터링 2: 함수 본문을 콜백으로 바꾸기
- 함수 본문을 콜백으로 바꿔 고차함수로 만들기

## Code Smell: 함수 이름에 있는 암묵적 인자
### 예시) 함수 이름과 내부 동작이 거의 비슷한 함수들의 반복
```js
function setPriceByName(cart, name, price) {
  var item = cart[name];
  var newItem = objectSet(item, 'price', price);
  var newCart = objectSet(cart, name, newItem);
  return newCart;
}

function setShippingByName(cart, name, ship) {
  var item = cart[name];
  var newItem = objectSet(item, 'shipping', ship);
  var newCart = objectSet(cart, name, newItem);
  return newCart;
}

function setQuantityByName(cart, name, quant) {
  var item = cart[name];
  var newItem = objectSet(item, 'quantity', quant);
  var newCart = objectSet(cart, name, newItem);
  return newCart;
}

function setTaxByName(cart, name, tax) {
  var item = cart[name];
  var newItem = objectSet(item, 'tax', tax);
  var newCart = objectSet(cart, name, newItem);
  return newCart;
}

function objectSet(object, key, value) {
  var copy = Object.assign({}, object);
  copy[key] = value;
  return copy;
}
```

Code Smell 포인트
- 함수 이름에 있는 일부가 인자로 동작
  - 값을 명시적으로 전달하지 않고, 함수 이름의 일부로 전달

## 리팩터링 1: 암묵적 인자를 드러내기
- `megaMarts.ts` 확인

일급(first-class) 값으로 할 수 있는 것
- 변수에 할당
- 함수의 인자로 넘기기
- 함수의 리턴값으로 받기
- 배열이나 객체에 담기

리팩터링
- 필드명을 일급 값으로 만듬 (여기서는 string으로 만듬)
- 필드명에 오타가 올 경우를 대비하는 런타임 검사 추가

## 리팩터링 2: 함수 본문을 콜백으로 바꾸기

### 고차 함수
고차 함수(High order function)
- 다른 함수를 인자로 받을 수 있는 함수

### 함수 본문을 콜백으로 바꾸기
- `megaMarts.ts` 확인