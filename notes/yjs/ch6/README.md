## 변경 가능한 데이터 구조를 가진 언어에서 불변성 유지하기

- 중첩된 데이터 → 배열안에 객체, 객체 안에 배열 등

### 카피-온-라이트(copy-on-write)

- 불변성 원칙을 지키는 방법이다
- 데이터가 변경될 때 `복사` 하여 원 데이터의 변경을 막는다

- 세 단계로 나누어진다
    1. 복사본 만들기
    2. 복사본 변경하기(원하는 만큼)
    3. 복사본 리턴하기

- 카피-온-라이트는 `쓰기` 를 `읽기` 로 바꾼다
    - 왜? 원본 데이터 변경 없이 사본을 변경하여 리턴했기 때문에 `읽기`

```tsx
[ 변경 전 ]
function removeItems(array, idex, count) {
	array.splice(idx, count)
}

[ 카피-온-라이트 적용 코드 ]
function removeItems(array, idx, count) {
	let copy = array.slice() // 배열 복사
	copy.splice(idx, count)
	return copy
}

function remove_item_by_name(cart, name) {
	let idx = null
	for (let i =0; i < cart.length; i++) {
		if (cart[i].name === name) idx = i
	}
	if (idx !== null) return removeItems(cart, idx, 1)
	return cart
```

### 쓰기도하고 읽기도 하는 동작의 경우는?

- Ex) `.shift()` 메서드
    
    ```tsx
    let a = [1, 2, 3, 4]
    b = a.shift()
    console.log(b) // 1
    console.log(a) // [2, 3, 4]
    
    --------- 카피-온-라이트 --------------
    
    function shift(array) {
    	const array_copy = array.slice()
    	const first = array_copy.shift()
    	return {
    		first: first,
    		array: array_copy
    	}
    }
    ```
    

### 불변 데이터 구조를 읽는 것은 계산

- 변경 가능한 데이터를 읽는 것은 `액션`
- `쓰기` 는 데이터를 변경 가능한 구조로 만든다
- `쓰기` 가 없다면 데이터는 `변경 불가능` 한 데이터이다
- 불변 데이터 구조를 읽는 것은 `계산` 이다
    - 왜 계산일까?
        - 인자로 값을 받고 복사해서 사용한 다음 리턴 값을 주기 때문이다
- 쓰기를 `읽기` 로 바꾸면 `계산` 이 많아진다 → `액션` 이 줄어들음

### 애플리케이션에는 시간에 따라 변하는 상태가 있다

- 변경 가능한 데이터를 불변 데이터로 만들었지만서도 시간에 따라 변하는 상태를 어떻게 다루어야 되는가?
- 책에서 나오는 예시는 `shopping_cart` 전역변수이다.
- 이에 대한 경우는 추후 나올예정이나 `교체` 를 사용한다
- 즉, 추가하거나 삭제해도 읽기, 바꾸기, 쓰기와 같은 로직이 포함된 `교체` 를 통해 새 값을 만들어서 최신화 시켜준다

### 불변 데이터 구조는 충분히 빠르다

- 코드를 복사하는 것만 봐도 메모리를 많이 잡아먹지 않을까란 의문이 든다
- 변경 가능한 데이터 구조보다 메모리를 `더 많이 쓰고 느린 것` 은 맞아 보인다
- 그럼에도 불구하고 고성능 시스템을 구현하는 사례가 많은데 왜일까?
    - 언제든 최적화가 가능하다
        - 예상하기 힘든 부분, 속도가 느린 부분이 있다면 그 때 최적화
    - 가비지 콜렉터는 매우 빠르다
        - 각 언어에서 성능 개선을 위해 꾸준히 연구중이며 충분하다
    - 생각보다 많이 복사하지 않는다
        - `참조` 만 복사된다
            - 즉, 100개의 배열을 복사해도 얕은 복사를 진행하기 때문이다
            - 해당 부분은 `구조적 공유(Structual Sharing)` 라고 부르기도 한다
    - 빠른 구현체가 함수형 프로그래밍 언어에서 존재한다
        - 이러한 언어, 예를 들면 클로저(Clojure) 최대한 많은 구조를 공유하여 메모리를 적게 사용하고 가비지 콜렉터의 부담을 줄여준다
        - 자바스크립트로 적용한다면 `카피-온-라이트` 를 기반한 모습으로 보인다

### 객체에 대한 카피-온-라이트

- 현재까지는 배열로 다루었지만 객체에서도 알아보자
    - 방법은 똑같다
    1. 복사본 만들기
    2. 복사본 변경하기
    3. 복사본 리턴하기

- array.slice()가 복사하는 메서드이지만 객체에서는 `Object.assign()` 을 사용한다

```tsx
const object = {x: 1, y: 2}
Object.assign({}, object) // {x: 1, y: 2} - 빈 객체에 object를 복사한다는 의미로 보임
```

### 중첩된 쓰기를 읽기로 바꾸기

- 변경되는 부분을 복사하고 for문 순회해서 값 변경을 해준다. 이후 리턴

```tsx
[ 변경 전 ]
function setPriceByName(cart, name, price) {
	for (let i = 0; i < cart.length; i++) {
		if (cart[i].name === name) cart[i].price = price
	}
}

[ 변경 후 ]
function setPriceByName(cart, name, price) {
	var cartCopy = cart.slice()
	for (var i = 0; i < cartCopy.length; i++) {
		if (cartCopy[i].name === name) cartCopy[i] = setPrice(cartCopy[i], price)
	}
}

function setPrice(item, new_price) {
	var item_copy = Object.assign({}, item)
	item_copy.price = new_price
	return item_copy
}

```