### 함수형 도구 체이닝

- 함수형 도구를 조합해서 `복잡한 계산` 을 읽고 쓰기 쉬운 단계를 유지하도록 바꾼다
- 여러 단계를 하나로 조합하는 것을 `체이닝` 이라고 한다.

### 고객 커뮤니케이션팀은 계속 일하고 있습니다

- 우수 고객(3개 이상 구매)의 구매 중 가장 비싼 구매를 알려달라는 요청에 대한 코드

### 체인을 명확하게 만들기

```tsx
// 우수고객을 뽑아내고 고객 중 가장 많은 금액을 소비한 고객 뽑기
function biggestPurchaseBestCustomers(customers) {
  const bestCustomers = filter(
    customers,
    (customer) => customer.purchase.length >= 3
  );

  const biggestPurchases = map(bestCustomers, (customer) => {
    return maxKey(
      customer.purchases,
      { total: 0 },
      (purchase) => purchase.total
    );
  });

  return biggestPurchases;
}
```

### - 1 : 단계에 이름 붙이기

```tsx
function biggestPurchasesBestCustomers(customers) {
	var bestCustomers = selectBestCustomers(customers)
	var biggestPurchases = getBiggestPurchases(bestCustomers)
	return biggestPurchases
}

function selectBestCustomers(customers) { // 고차함수에 이름을 붙임
	return filter(customers, function(customer) {
		return customer.purchases.length >= 3
	}
}

function getBiggestPurchases(customers) {
	return map(customers, getBiggestPurchases)
}

function getBiggestPurchase(customer) {
	return maxKey(customer.purchases, { total: 0 }, function(purchase) {
		return purchase.total
	}
}

```

- 변경된 모습들을 보면 각 단계에 `이름` 을 붙여서 명확해지도록 하였다

### - 2 : 콜백에 이름 붙이기

```tsx
function biggestPurchasesBestCustomers(customers) {
	var bestCustomers = filter(customers, isGoodCustomer) // 콜백에 이름 붙임
	var biggestPurchases = map(bestCustomers, getBiggestPurchase) // 콜백에 이름 붙임
	return biggestPurchases
}

// 콜백에 이름 붙임
function selectBestCustomers(customer) {
	return customer.purchases.length >= 3
}

// 콜백에 이름 붙임
function getBiggestPurchase(customer) {
	return maxKey(customer.purchases, { total: 0 }, getPurchaseTotal)
}

function getPurchaseTotal(purchase) {
	return purchase.total
}

```

- 콜백을 빼내 이름을 붙여 재사용할 수 있게 만들었다
- 호출 그래프 상으로는 아래쪽에 위치하여 재사용하기 좋다.

### - 3: 두 방법을 비교

- 책에서는 일반적으로 두 번째 방법이 더 명확하다고 본다.
- 비교를 해서 어떤 방법이 더 좋은지 직접 실행해야 한다고 말한다.

### 고차함수 최적화

- 앞선 예시들에서 반복해서 고차함수를 여러번 쓰는 경우가 있다. map, filter 등 새로운 배열이 생기기 때문에 메모리를 잡아먹을 수 있고 비효율적이라고 볼 수 있다
- 하지만, 현대에는 `가비지 컬렉터` 가 빠르게 처리하기 때문에 크게 문제가 되지 않는다.

```tsx
1. 값 하나에 map() 두번 사용
var names = map(customers, getFullName)
var nameLengths = map(names, stringLength)

map() 한 번 사용해도 같다
var namesLengths = map(customers, function(customer) {
	return stringLength(getFullName(customer))
})
...
```

- 그렇지만 가독성을 더 떨어트릴 수도 있다고 볼 수 있다. 
즉, 병목이 생겼을 때 쓰는게 좋다. 하나로 통합해도 성능 상 큰 차이가 없으니..

### 반복문을 함수형 도구로 리팩터링하기

전략 1. 이해하고 다시 만들기

- 반복문이 어떤 일을 하는지 파악

전략 2. 단서를 찾아 리팩터링

- 반복문을 하나씩 선택하여 함수형 도구 체인으로 바꾼다

### 팁 1. 데이터 만들기

```tsx
var answer = []
var window = 5

for (var i = 0; i < array.length; i++) {
	var sum = 0
	var count = 0
	for (var w = 0; w < window; w++) {
		var idx = i + w
		if (dix < array.length) {
			sum += array[idx]
			count += 1
		}
	}
	answer.push(sum/count)
}

//////////////////////////////////////////
위의 과정에서 데이터를 만들려고하면 조건문에서 idx범위 처리하는 부분을 배열로 만들어 반복한다

var answer = []
var window = 5

for (var i = 0; i < array.length; i++) {
	var sum = 0
	var count = 0
	var subArray = array.slice(i, i + window)
	for (var w = 0; w < subArray.length; w++) {
		sum += subArray[w]
		count += 1
	}
	answer.push(sum/count)
}
```

### 팁 2: 한 번에 전체 배열을 조작하기

- 하위 배열을 만들었기에 배열 전체를 반복할 수 있다. 즉, 기존에는 map, filter, reduce와 같은 고차함수를 사용할 수 없었지만 이제는 가능하다

```tsx
var = answer = []
var window = 5

for (var i = 0; i < array.length; i++) {
	var subArray = array.slice(i, i + window)
	answer.push(average(subArray))
}
```

- 안 쪽 반복문 전체를 .slice()와 avarage()를 호출하는 코드로 바꾼다

### 팁 3: 작은 단계로 나누기

- `인덱스` 를 가지고 반복하는 모습이 있기에 작은 단계로 만든다.

```tsx
var indices = []
for (var i = 0; i < array.length; i++) {
	indices.push(i)
}

var window = 5
var answer = map(indices, function(i) {
	var subArray = array.slice(i, i + window)
	return average(subArray)
})

// 하위 배열을 만드는 일과 평균을 계산하는 일을 map함수 안에 두 가지를 수행한다.
// 이를 분리하고, 인덱스 배열을 만드는 코드를 유용하게 쓸 수 있도록 빼낸다

function range(start, end) {
	var ret = []
	for (var i = start; i < end; i++) {
		ret.push(i)
	}
	return ret
}

var window = 5
var indices = range(0, array.length) // 인덱스 배열 생성
var windows  = map(indices, function(i) { // 하위 배열 만들기
	return array.slice(i, i + window) 
})
var answer = map(windows, average) // 평균 계산하기
```

### 체이닝 팁 요약

- **데이터 만들기**
    - 배열 일부에 대해 동작하는 반복문이 존재하면 새로운 배열로 나누어 고차함수를 활용해 작업을 줄임
- **배열 전체를 다루기**
    - 반복문 대신 전체 배열을 한 번에 처리할 지 생각하는 단계
- **작은 단계로 나누기**
    - 함수 내 여러 단계를 활용한다면 작게, 단순하게 만들어서 이해하기 쉽게 한다.
- **보너스 : 조건문을 filter()로 바꾸기**
    - 조건문으로 거르는 부분을 filter로 적용
- **보너스 : 유용한 함수로 추출하기**
    - 반복될 수 있는, 재사용이 되는 함수로 유용하게 만들기
- **보너스 : 개선을 위해 실험하기**
    - 함수형 도구 체인을 만들면서 방법 조합

### 체이닝 디버깅을 위한 팁

- 고차 함수 활용은 `매우 추상적` 이다. 그래서 디버깅을 위한 3가지 방법이 있다

- **구체적인 것을 유지하기**
    - 각 단계에서 어떤 것을 하고 있는지 알기 쉽게 이름을 잘 짓는 것이 중요하다
- **출력해보기**
    - 예상한 대로 동작하는지 출력을 통해 확인해나간다
- **타입을 따라가 보기**

### 339p 연습문제

```tsx
function shoesAndSocksInventory(products) {
	var inventory = 0
	for (var p = 0; p < products.length; p++) {
		var product = products[p]
		if (product.type === "shoes" || product.type === "socks") {
			inventory += product.numberInInventory
		}
	}
}

///// -  변경 - ///////
function shoesAndSocksInventory(products) {
	var shoesAandSocks = filter(products, function(product) {
		return product.type === "shoes" || product.type === "socks"
	})
	var inventories = map(shoesAndSocks, function(product) {
		return product.numberInInventory
	})
	return reduce(inventories, 0, plus)
}
```

- filter, map, reduce활용
    - 데이터를 만들고, 배열 전체를 다루며 작은 단계로 나누면서 결과값을 반환해준다

```tsx
function maxKey(array, init, f) {
	return reduce(array, 
		init, 
		function(biggestSoFar, element) {
			if (f(biggestSoFar) > f(element)) {
				return biggestSoFar
			else
				return element
			})
}
```