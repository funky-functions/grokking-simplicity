### 신뢰할 수 없는 코드를 쓰면서 불변성 지키기

- 카피-온-라이트를 모두 사용할 수도 없는 경우, 바꿀 수 없는 라이브러리를 사용하는 경우 등에 대해서는 어떻게 해야되는지 알아보자

### 레거시 코드와 불변성

- 카피-온-라이트 원칙을 지키면서 안전하게 함수를 사용할 수 있는 원칙을 `방어적 복사` 라고 한다.
- 레거시 코드의 경우 신뢰할 수 없는 코드기에 카피-온-라이트로 만들어진 일종의 `안전지대` 에 안팎으로 데이터가 변경될 수 있을 수 있다

방어적 복사는 `원본이 바뀌는 것` 을 막아준다. 신뢰할 수 없는 코드와 데이터를 주고 받는 문제를 푸는 방법은 `복사본` 을 만드는 것이다

안전지대를 기준으로 안팎으로 `깊은 복사본` 을 만들어서 대처한다 

### 방어적 복사 구현하기

- 인자로 들어온 값이 변경될 수도 있는 함수를 사용하면서 불변성을 지켜야 한다

```tsx
function add_item_to_cart(name, price) {
	var item = make_cart_item(name, price)
	shopping_cart = add_item(shopping_cart, item)
	var total = calc_total(shopping_cart)
	set_cart_total_dom(total)
	update_shipping_icons(shopping_cart)
	update_tax_dom(total)
	
	black_friday_promotion(shopping_cart) // 레거시 코드
}

[ 변경 후 ] 
function add_item_to_cart(name, price) {
	var item = make_cart_item(name, price)
	shopping_cart = add_item(shopping_cart, item)
	var total = calc_total(shopping_cart)
	set_cart_total_dom(total)
	update_shipping_icons(shopping_cart)
	update_tax_dom(total)
	
	shopping_cart = black_friday_promotion_safe(shopping_cart)
}

// 필요할 때 안전하게 쓸 수 있도록 함수를 분리
function black_friday_promotion_safe(cart) {
	var cart_copy = deepCopy(cart) // 데이터 전달 전 복사
	black_friday_promotion(cart_copy) // 참조된 cart_copy값을 바꿀 수도 있다
	return deepCopy(cart_copy) // 그래서 위의 함수에서 호출 관점에서 들어오는 데이터를 복사한다
}

black_friday_promotion에서 cart_copy가 전역으로 들어간 이후 바뀔 수도 있다
그래서 이후에 어디선가 다시 실행돼서 참조된 것이 장바구니에 영향을 가지 않도록
반환할 때도 깊은 복사를 해서 안전한 코드가 있는 곳에 보낸다
```

### 방어적 복사 규칙

- 규칙 1 - 데이터가 안전한 코드 `에서` 나갈 때 복사하기
    - 변경 불가능한 데이터가 신뢰할 수 없는 코드로 나갈 때
        1. 불변성 데이터를 위한 `깊은 복사본` 생성
        2. 신뢰할 수 없는 코드로 복사본 전달
- 규칙 2 - 안전한 코드 `로` 데이터가 들어올 때 복사하기
    - 신뢰할 수 없는 코드에서 변경될 수 도 있는 데이터가 들어올 때
        1. 변경될 수도 있는 데이터가 들어오면 `바로` 깊은 복사본 생성 후 `안전한 코드` 로 전달
        2. 복사본을 안전한 코드에서 사용

### 정리

- 깊은 복사본은 비용이 많이 들기에 오히려 레거시 코드부분을 카피-온-라이트로 변경한다면 더 효율적일 수 있다

- 방어적 복사는 데이터가 들어오고 나갈 때 복사본을 만든다
- 신뢰할 수 없는 코드와 함께 사용할 때 방어적 복사를 사용한다