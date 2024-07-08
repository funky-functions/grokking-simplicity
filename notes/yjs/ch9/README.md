## 계층형 설계 II

### 추상화 벽(패턴2)으로 구현을 감춥니다

- 세부 구현을 감춘 함수로 이루어진 계층
- 데이터 구조를 몰라도 함수를 사용할 수 있고, 추상화 벽 아래서의 로직은 추상화 벽에서 사용하고 있는 함수들이 어떻게 사용되는지는 신경 안써도 된다.
- 이러한 모양은 대칭적이며 API 등이 일종의 예시이다.

### 장바구니 데이터 구조 바꾸기

- 배열을 순서대로 검색하면서 제품을 찾는 것이 비효율적이기 때문에 이를 `객체` 로 바꿔 보자

```tsx
1. 장바구니에 상품 추가 

[ 변경 전 - 배열로 만든 장바구니 ]
function add_item(cart, item) {
	return add_element_last(cart, item)
}

[ 변경 후 - 객체로 만든 장바구니 ]
function add_item(cart, item) {
	return objectSet(cart, item.name, item) // 객체
}

2. 장바구니 내 총 가격 

[ 변경 전 - 배열로 만든 장바구니 ]
function calc_total(cart) {
	var total = 0
	
	for (var i = 0; i < cartCopy.length; i++) {
		var item = cart[i]
		total += iitem.price
	}
	return total
}

[ 변경 후 - 객체로 만든 장바구니 ]
function calc_total(cart) {
	var total = 0
	var names = Object.keys(cart) // 객체의 키값들을 배열로 받음
	
	for (var i = 0; i < names.length; i++) {
		var item = cart[names[i]]
		total += iitem.price
	}
	return total
}

3. 장바구니 내 품목 가격 변경
: 변경 전 보다 변경 후가 배열처럼 순서대로 모두 순회하지 않아도 되도록 수정이 된다.

[ 변경 전 - 배열로 만든 장바구니 ]
function setPriceByName(cart, name, price) {
	var cartCopy = cart.slice()
	for (var i = 0; i  < cartCopy.length; i++) {
		if (cartCopy[i].name  === name) cartCopy[i] = setPrice(cartCopy[i], price)
	}
	return cartCopy
}

[ 변경 후 - 객체로 만든 장바구니 ]
function setPriceByName(cart,  name, price) {
	if (isInCart(cart, name)) {
		var item = cart[name]
		var copy = setPrice(item, price)
		return objectSet(cart, name, copy)
	} else {
		var item = make_item(name, price)
		return objectSet(cart, name, item)
	}
}

4. 품목명을 통해 장바구니에 제거
: 제거해야할 품목의 배열 인덱스를 찾아야 하는 함수가 필요 없어진다  

[ 변경 전 - 배열로 만든 장바구니 ]
function remove_item_by_name(cart, name) {
	var idx = indexOfItem(cart, name)
	if (idx !== null) return splice(cart, idx, 1)
	return cart
}

function indexOfItem(cart, name) {
	for(var i = 0; i < cart.length; i++) {
		if (cart[i].name === name) return i
	}
	return null
}

[ 변경 후 - 객체로 만든 장바구니 ]
function remove_item_by_name(cart, name) {
	return objectDelete(cart, name)
}

5. 장바구니에 해당 아이템이 존재하는지 판단

[ 변경 전 - 배열로 만든 장바구니 ]
function isIncart(cart, name) {
	return indexOfItem(cart, name) !== null
}

[ 변경 후 - 객체로 만든 장바구니 ]
function isInCart(cart, name) {
	return cart.hasOwnProperty(name)
}
// hasOwnProperty : 항목이 있는지 확인하는 자바스크립트 객체 메서드
// 해당 메서드를 사용하면 cart의 항목만 살펴보고
// 그 상위 객체들에 대해서는 속성을 살펴보지 않는다
```

### 추상화 벽 리뷰

- 모든 추상화는 추상화 단계의 상위와 하위에 있는 코드들이 서로 `의존하지 않게` 정의한다
- 즉 추상화를 통해 쉽게 고치는 면이 나타나지만 그렇다고 모든 것을 추상화하는 것은 지양해야 한다.
- 신경쓰지 않아도 되는 것을 다루는 것을 중점으로 봐야한다. 그것이 추상화 벽의 핵심이다

### 패턴 3 : 작은 인터페이스

- 새로운 코드를 추가할 위치에 관한 것

- 시계 할인 마케팅을 할 때 추상화 벽 `안` 혹은 `위` 에 만들어야 한다.
- 마케팅 부서가 사용해야하기 때문에 `아래`에 만들면 안된다.

![alt text](<image (1).png>)

- 방법 1
    
    ```tsx
    function getsWatchDiscount(cart) {
    	var total = 0
    	var names = Object.keys(cart)
    	for( var i = 0; i < names.length; i++) {
    		var item = cart[names[i]]
    		total += item.price
    	}
    	return total > 100 && cart.hasOwnProperty("watch")
    }	
    ```
    
    - 장바구니에 직접 접근할 수 있으나 `같은 계층` 에 있는 함수를 사용할 수 없다
- 방법 2
    
    ```tsx
    function getsWatchDiscount(cart) {
    	var total = calcTotal(cart)
    	var hasWatch = isInCart("watch")
    	return total > 100 && hasWatch
    }
    ```
    
    - 데이터 구조를 직접 접근할 수 없다

### 추상화 벽 `위에 있는` 계층에 구현하는 것이 좋습니다

- 위의 방법 1에서 같은 계층에 있는 함수를 사용할 수 없다고 하였지만, 사용은 가능하다.
- 다만, 구조적 설계에서 망가지기 때문에 책에서 그런 표현을 정한 것 같다

- 추상화 벽으로 이미 마케팅 팀에서만 사용하고, 반복문 같은 구체적인 구현에 신경쓰지 않도록 만들었기 때문에 굳이 따지면 방법 1이 적합하지는 않다.

즉, 새로운 기능을 만들 때 하위 계층에 기능을 추가하거나 고치는 것보다 `상위 계층에` 만드는 것이 작은 인터페이스 패턴이라고 할 수 있다

### 패턴 4 : 편리한 계층

- 위의 패턴 1 ~ 3은 이상적인 계층 구성을 위한 것이라면 패턴 4는 실용적인 측면을 다룬다
- 위와 같은 추상화 과정이 거대해지면서 이러한 시간적 여유의 개발과 비즈니스의 시간 측면에서 다룰 때 딜레마가 생길 것이다
- 그래서 고민할 것이 `지금의 설계와 작업하는 코드가 편리한가?` 라고 느낀다면 설계는 조금 멈춰도 된다
- 반복문은 감싸지 않고, 호출 화살표가 길어진다는 등 계층이 섞여도 그대로 두는 것이다
- 반면에 코드가 지저분하고 구체적인 것을 너무 많이 알아야하는 상황 등이 온다면 `다시 패턴을 적용` 하면 된다

### 그래프로 알 수 있는 코드에 대한 정보는 무엇이 있을까?

- 호출 그래프는 세 가지 중요한 `비기능적 요구사항` 을 보여준다
- 기능적 요구사항 : 소프트웨어가 정확히 해야 하는 일
    - 예를 들어 세금에 대한 계산을 하면 올바른 계산 결과가 나온다
- 비기능적 요구사항
    - 테스트, 재사용, 유지보수 등을 생각 하는 것
    1. 유지보수성 : 요구 사항이 바뀌었을 때 가장 쉽게 고칠수 있는 코드는 어떤 코드?
    2. 테스트성 : 어떤 것을 테스트하는 것이 가장 중요한 것?
    3. 재사용성 : 어떤 함수가 재사용하기 좋은가?

![alt text](<image (2).png>)
![alt text](<image (3).png>)


