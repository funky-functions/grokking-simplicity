## 더 좋은 액션 만들기

- 비즈니스 요구 사항에 맞춰 더 나은 설계를 해야한다
    - `코드의 냄새` 를 잘 맡아보자
        - 코드의 냄새는 큰 문제를 미리 알려준다
        - 중복된느 코드, 알맞지 않는 인자 등등

<aside>
💡 암묵적 입력과 출력은 적을수록 좋다

</aside>

- 액션에서 `계산` 으로 빼놓아도 남은 액션 중에서 암묵적 입력과 출력을 적게 할수록 좋다는 의미같다.

- 암묵적 출력이 있는 함수는 조심해서 사용해야 한다
    - 예를 들어 DOM을 바꾸는 암묵적 출력이 있는 함수를 쓸 때 결과는 필요하지만 DOM 등 다른 곳에 영향을 주기 싫다면 어떻게 해야될까?
    - 그래서 테스트하기가 어렵기 때문에 조심성이 필요하다

- 93p에 있는 연습문제의 코드를 바탕으로 `액션` 내 전역변수 사용을 인자로 받아 줄이고 불필요한 중복 코드를 줄여보자

```tsx
1. 장바구니에 상품 넣기

[ 변경 전 ] 
function add_item_to_cart(name, price) {
	shopping_cart = add_item(shopping_cart, name, price)
	calc_cart_total()
}

[ 변경 후 ] - 전역변수를 해당 부분만 읽는다
function add_item_to_cart(name, price) {
	shopping_cart = add_item(shopping_cart, name, price)
	calc_cart_total(shopping_cart)
}

2. 장바구니의 총합 및 dom업데이트 함수

[ 변경 전 ]
function calc_cart_total() {
	shopping_cart_total = calc_total(shopping_cart)
	set_cart_total_dom()
	update_shopping_icons(shopping_cart)
	update_tax_dom()
}

[ 변경 후 ] -> 인자로 cart
function calc_cart_total(cart) {
	const total = calc_total(cart)
	set_cart_total_dom(total)
	update_shopping_icons(cart)
	update_tax_dom(total)
	// shopping_cart_total = total
}

3. 장바구니 총합 dom수정
[ 변경 전 ]
function set_cart_total_dom() {
	...
	shopping_cart_total
	...
}

[ 변경 후 ] - 인자 추가
function set_cart_total_dom(total) {
	...
	total
	...
}

4. 배송비 관련 아이콘 변경 -> 개선 점 X, 

function update_shipping_icons(cart) {
	const buttons = get_buy_buttons_dom()
	for (let i = 0; i < buttons.length; i++) {
		const button = buttons[i]
		const item = button.item
		const new_cart = add_item(cart, item.name, item.price)
		if (gets_free_shipping(new_cart))
			button.show_free_shipping_icon()
		else
			button.hide_free_shipping_icon()
	}
}

5. 세금 dom 수정

[ 변경 전 ]
function update_tax_dom() {
	set_tax_dom(calc_tax(shopping_cart_total))
}

[ 변경 후 ] - 인자 추가
function update_tax_dom(total) {
	set_tax_dom(calc_tax(total))
}

```

```tsx
추가적으로 책에서는 조금 더 개선하자면 calc_cart_total에 대한 과한 로직이 되어있다 생각하여
add_item_to_cart 함수에 로직을 추가한다

function add_item_to_cart(name, price) {
	shopping_cart = add_item(shopping_cart, name, price)
	
	// 추가되는 부분(기존 calc_cart_total 함수 삭제)
	const total = calc_total(shopping_cart)
	set_cart_total_dom(total)
	update_shipping_icons(shopping_cart)
	update_tax_dom(total)
}

// 개인 의견
// 전역 변수를 건드리는 액션을 하나로 모으는 것으로 생각되면 이해가 되기도 하나
// 위의 함수는 장바구니에 아이템 추가지만 새로 들어가는 로직은 총합도 있기에
// 분리하는 부분도 이상해보이지는 않는다.
```

### 계산 분류하기

<aside>
💡 설계는 엉켜있는 코드를 푸는 것이다

</aside>

- 위의 예시는 cart, item에 대한 각각의 동작이 있고, 비즈니스 규칙이 존재한다
- 즉, 의미적으로 `계층` 을 만들어 기억하면 재사용, 유지보수, 테스트에서 용이해진다
- 함수를 통해 관심사 분리를 진행한다

99p를 기준으로 예시 코드

```tsx
function add_item(cart, name, price) {
	const new_cart = cart.slice() // 배열 복사
	new_cart.push({
		name: name,
		price: price
	})
	return new_cart
}

add_item(shopping_cart, "shoes", 3.45)

----- 변경 -----

cart, item에 대한 분리를 진행한다
function add_item(cart, item) {
	return add_element_last(cart, item)
}

function make_cart_item(name, price) {
	return {
		name: name,
		price: price
	}
}

그럼 추가할 1. 상품을 객체로 받아서 2. 장바구니의 마지막에 넣게 해준다

 
```

### 정리

- 암묵적 입력과 출력은 인자와 리턴값으로 바꿔 없애는 것이 좋다
- 설계는 엉켜있는 것을 푸는 것이며 `함수가 하나의 일` 을 하도록 하면 
개념을 중심으로 쉽게 구성이 가능하다