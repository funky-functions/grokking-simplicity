### map() 함수 도출하기

```tsx
function emailsForCustomers(customers, goods, bests) {
	var emails = []
	for (var i = 0; i < customers.length; i++) {
		var customer = customers[i]
		var email = emailForCustomer(customer, goods, bests)
		emails.push(email)
	}
	return emails
}

[ forEach 고차함수로 변환하기 ]
function emailsForCustomers(customers, goods, bests) {
	var emails = [] // 앞부분
	forEach(customers, function(customer) {  // 본문
		var email = emailForCustomer(customer, goods,bests)
		emails.push(email)
	})
	return emails // 뒷부분
} 

중복되는 부분들이 존재하고 본문을 콜백으로 바꿔보자 

[ map()으로 빼내기 ]
function emailsForCustomers(customers, goods, bests) {
	return map(customers, function(customer) {
		return emailForCustomer(customer, goods, bests)
	}
}

map은 배열을 받아 하나씩 변환하여 같은 길이의 배열을 반환한다 
```

### 함수형 도구 map

```tsx
function map(array, f) { // 배열과 함수를 인자로
	var netArray = [] // 빈 배열
	forEach(array, function(element) {
		newArray.push(f(element)) //  원래 배열 항목으로 새로운 항목을 만들기 위해 f함수 부름
	})
	return newArray // 새로운 배열 반환
}
```

- emailsForCustomers에서 콜백함수 내 customer가 인자로 들어가는데 어디서 나온 것이며 동작은 되는 것인가?
    - `익명 함수` 를 사용해 `인라인` (이름을 붙여 쓰는 대신 쓰는 곳에서 `바로` 정의 하는 함수) 으로 정희했다.
    - 즉, customer가 x, y, apple 등으로 붙여도 동작한다는 의미이다.

### 함수를 전달하는 세 가지 방법

```tsx
[ 전역으로 정의하기 ]

function greet(name) {
	return "Hello, " + name
}

var friendGreetings = map(friendNames, greet)

[ 지역적으로 정의하기 ]
범위 밖에서는 쓸 수 없다

function greetEverybody(friends) { // 이 함수 범위 안에 있다
	var greeting
	if (language === "English") greeting = "Hello, "
	else greeting = "Salut, "
	
	var greet = function(name) {
		return greeting + name
	}
	
	return map(friends, greet)
}

[ 인라인으로 정의하기 ]

var friendGreetings = map(friendsNames, function(name) {
	return "Hello, " + name
})	
	
```

map() 함수는 예를 들어 객체 내에 프로퍼티가 없더라도 null값을 들어가게 만들어서 조심해서 사용해야 한다. 

즉, 의도치 않은 데이터가 들어갈 수 있기 때문이다. 

### 함수형 도구 : filter()

- filter()는 원 배열을 가지고 새로운 배열을 만드는 고차 함수

```tsx
function filter(array, f) { // 인자로 배열과 함수
	var newArray = []
	forEach(array, function(element) {
		if (f(element)) newArray.push(element) // 콜백 호출로 항목을 결과 배열에 넣을지 판단
	})
	return newArray
}
```

- filter()는 배열에서 `일부 항목` 을 선택하는 함수

```tsx
filter(customers, function(customer) {
	return customer.purchases.length === 0
})

아무것도 구입하지 않은 고객 배열 반환

[ map일 때 ]
var allEmails = map(customers, function(customer) {
	return customer.email
})

// map에서 null이 생길 수 있는 가능성을 filter로 처리한다.
[ filter일 때 ]
var emailsWithoutNulls = filter(emailsWithNulls, function(email) {
	return email !== null
})
```

### 함수형 도구 : reduce()

```tsx
function reduce(array, init, f) { // 배열, 초기값, 누적함수
	var accum = init // 누적 값 초기화
	forEach(array, function(element) {
		accum = f(accum, element)
	})
	return accum
}
```

- reduce()는 배열을 순회하면서 값을 누적 한다.

- 고려할 사항 2가지
    - 계산이 어떤 값에서 시작되는가?
        - 더하기면 0, 곱하기면 1 등으로 조심
    - 배열이 비어있다면 어떤 값을 리턴할 것인가?
        - 빈 문자열 배열을 사용하면 합친 문자열 결과는 빈 문자열이다.
- 숫자를 누적하는 것 뿐 아니라 문자열 합치는 과정 등 여러 방면에서 활용이 된다.

### 정리

- map()은 어떤 배열의 모든 항목에 함수를 적용해 `새로운 배열` 로 바꿉니다.
각 항목은 지정한 콜백함수에 의해 변환
- filter()는 어떤 배열의 하위 집합을 선택해 `새로운 배열` 을 만듭니다
특정 항목 선택 가능
- reduce()는 `초깃값` 을 가지고, 어떤 배열의 항목을 조합해 하나의 값을 만든다
데이터를 요약하거나 시퀀스를 하나의 값으로 만들 때 쓴다