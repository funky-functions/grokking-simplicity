## 액션에서 계산 빼내기

- 테스트하기 쉽고 재사용 하기 좋은 코드로 리팩터링 하는 방법을 예시를 통해 알아본다
- 

- 입력과 출력은 명시적이거나 암묵적일 수 있다

```tsx
var total = 0;
function add_to_total(amount) {
	console.log("Old total: " + total) // 전역변수를 읽는 것은 암묵적 입력, 콘솔 출력 또한 암묵적
	total += amount; // 전역변수 바꾸는 것도 암묵적 출력
	return total // return은 명시적 출력
}
```

- 함수에 이러한 입출력이 있으면 `액션` 이 된다

DOM업데이트는 함수에서 어떤 정보가 나와서 출력이다. 다만, 리턴값이 아니기에 `암묵적 출력` 이다.

전역변수를 읽는 것은 `암묵적 입력` 변경하는 것은 `암묵적 출력` 

### 액션에서 계산 빼내는 리팩토링 몇 가지

- 순서
    1. 계산에 해당하는 코드 분리
    2. 입력값은 인자로, 출력값을 리턴값으로 바꾼다

**[ 변경 전 ]**

```tsx
var shopping_cart = [] // 전역변수 가정
var shopping_cart_total = 0 // 전역변수 선언 가정

function calc_cart_total() {
	shopping_cart_total = 0 // 전역변수
	for (var i = 0; i < shopping_cart.length; i++) {
		var item = shpping_cart[i]
		shopping_cart_total += item.price
	}
	set_cart_total_dom()
	update_shipping_icons()
	update_tax_dom()
}

```

```tsx
// 아래 부분에 대해서 계산으로 뺄 수 있다
shopping_cart_total = 0 // 전역변수
for (var i = 0; i < shopping_cart.length; i++) {
	var item = shopping_cart[i]
	shopping_cart_total += item.price
}

1. 전역변수인 shopping_cart_total을 0으로 바꾸고, 
item.price에 따라 더해주면서 "출력"이 2개 존재
2. shopping_cart에 대한 전역변수를 읽어왔기 때문에 "입력" 1개 존재
```

```tsx
위의 1번 출력 2개에 대해서는 리턴 값으로 변경해준다

function calc_total() {
	var total = 0 // 지역 변수로 설정
	for (var i = 0; i < shopping_cart.length; i++) {
		var item = shopping_cart[i]
		total += item.price
	}
	return total
}

2번은 입력을 인자로 바꾸어준다

function calc_total(cart) {
	var total = 0 // 지역 변수로 설정
	for (var i = 0; i < cart.length; i++) {
		var item = cart[i]
		total += item.price
	}
	return total
}
```

## 계산 추출로 염두할 것

- 계산 코드를 찾아 빼기
- 새 함수에 암묵적 입력과 출력 찾기
- 압묵적 입력은 `인자` 암묵적 출력은 `리턴 값` 으로 바꾼다

인자와 리턴값은 바뀌지 않는 `불변 값` 이라는게 중요하다
