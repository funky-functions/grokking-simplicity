// 연습문제 1. 아래 코드에 COW 적용하기
interface Email {
  subject: string;
  content: string;
}

let mailing_list: Email[] = [];

function add_contact(email: Email) {
  mailing_list.push(email);
}

function submit_form_handler(event: SubmitEvent) {
  let form = event.target;
  if (form) {
    // let email = form.elements["email"].value;
    let email = {
      subject: "Welcome",
      content: "Welcome to the Team!",
    };
    add_contact(email);
  }
}
// -------- 리팩토링 --------
function refactored_add_contact(list: Email[], email: Email) {
  // 1. 복사본 만들기
  // 2. 복사본 변경하기
  // 3. 복사본 리턴
  return [...list, email];
}

function refactored_submit_form_handler(event: SubmitEvent) {
  let form = event.target;
  if (form) {
    // let email = form.elements["email"].value;
    let email = {
      subject: "Welcome",
      content: "Welcome to the Team!",
    };
    mailing_list = refactored_add_contact(mailing_list, email);
  }
}

// 연습문제 2. pop() 메서드에 COW 적용하기
// 1. 읽기, 쓰기 함수로 분리
function last_element(array: any[]) {
  return array[array.length - 1];
}

function dropLast(array: any[]) {
  const array_copy = array.slice();
  array_copy.pop();
  return array_copy;
}

// 2. 값 2개를 리턴하는 함수로 만들기
function pop(array: any[]) {
  return {
    last: last_element(array),
    array: dropLast(array),
  };
}

// 연습문제 3. push() 메서드에 COW 적용하기
function push(array: any[], element: any) {
  return [...array, element];
}

// 연습문제 4. COW버전의 push() 메서드를 사용하여 add_contact() 함수 리팩터링
function addContact(list: Email[], email: Email) {
  return push(list, email);
}

// 연습문제 5. 배열 항목을 COW 방식으로 설정하는 arraySet() 함수 만들기
function arraySet(array: any[], idx: number, value: any) {
  const array_copy = array.slice();
  array_copy[idx] = value;
  return array_copy;
}

// 연습문제 6. COW 방식으로 객체에 값을 설정하는 objectSet() 함수 만들기
// 예) o["price"] = 37;
function objectSet(object: { [key: string]: any }, key: string, value: any) {
  const object_copy = Object.assign({}, object);
  object_copy[key] = value;
  return object_copy;
}

// 연습문제 7. 6번에서 만든 objectSet() 함수로 setPrice() 리팩터링하기
// 원래 코드
function set_price(item: { price: number }, new_price: number) {
  const item_copy = Object.assign({}, item);
  item_copy.price = new_price;
  return item_copy;
}
// 리팩토링
function setPrice(item: { price: number }, new_price: number) {
  return objectSet(item, "price", new_price);
}

// 연습문제 8. objectSet() 함수를 이용해 제품 갯수를 설정하는 setQuantity() 만들어보기
function setQuantity(item: { quantity: number }, new_quantity: number) {
  return objectSet(item, "quantity", new_quantity);
}

// 연습문제 9. 객체의 프로퍼티 제거하는 delete 연산은 COW 버전으로 만들기
function objectDelete(object: { [key: string]: any }, key: string) {
  const object_copy = Object.assign({}, object);
  delete object_copy[key];
  return object_copy;
}

// console.log(objectDelete({ a: 1, b: 2, c: 3 }, "b")); // { a: 1, c: 3 }

// 연습문제 10. 다음 중첩된 동작에 COW 적용하기
// 앞서 만든 setQuantity 활용!
function set_quantity_by_name(
  cart: { [key: string]: any },
  name: string,
  quantity: number,
) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === name) cart[i].quantity = quantity;
  }
}

function setQuantityByName(
  cart: { [key: string]: any },
  name: string,
  quantity: number,
) {
  const cart_copy = cart.slice();
  for (let i = 0; i < cart_copy.length; i++) {
    if (cart_copy[i].name === name) {
      cart_copy[i] = setQuantity(cart_copy[i], quantity);
    }
  }
  return cart_copy;
}

const testCart = [
  { name: "nike", quantity: 1 },
  { name: "adidas", quantity: 3 },
];

console.log(setQuantityByName(testCart, "adidas", 4)); // [ { name: 'nike', quantity: 1 }, { name: 'adidas', quantity: 4 } ]
