### 일급 함수 I

- 코드의 냄새와 중복을 없애 `추상화` 를 잘할 수 있는 `리팩터링 2개` 를 알아보자
이후 일급 함수 II에도 이어서 계속 사용될 것이다.
    - 코드의 냄새 : 더 큰 문제를 가져올 수 있는 코드

- 리팩터링
    - 암묵적 인자 드러내기
    - 함수 본문을 콜백으로 바꾸기

- 코드 냄새 킁킁 맡는 법
    - `함수 이름에 있는 암묵적 인자` 냄새는 아래의 2가지 특징을 가진다
        - 함수 구현이 거의 똑같다
        - 함수 이름이 구현의 차이를 만든다
        - Ex.
            - setPriceByName,  setQuantityByName, setShippingByName …

### 리팩터링 : 암묵적 인자 드러내기

- 함수 이름의 일부가 암묵적인자로 사용된다면 이를 드러내야 한다. 
즉, 리팩터링 할 수 있는 부분이다.

```tsx
리팩터링 단계
1. 함수 이름에 있는 암묵적 인자를 확인한다
2. 명시적인 인자를 추가한다
3. 함수 본문에 하드 코딩된 값을 새로운 인자로 바꾼다
4. 함수를 부르는 곳을 고친다. 
```

 

```tsx
[ 리팩터링 전 ]

cart = setPriceByName(cart, "shoe", 13)
cart = setTaxByName(cart, "shoe", 2.34)
...

[ 리팩터링 후 ]
cart = setFieldByName(cart, "shoe", 'price', 13)
cart = setFieldByName(cart, "shoe", 'tax', 2.34)
...

```

- 비슷한 함수를 `일반적인 함수` 하나로 바꾸어 만들었다.
- 필드명을 문자열로 넘기는 것은 안전하지 않다고 느낄 수 있으나 우선 현재 단계까지 알고 넘어가자. 추후에 자세히 다뤄질 예정임

### 일급인 것과 일급이 아닌 것을 구별하기

일급이 아닌것 : 수식 연산자, 반복문, 조건문, try/catch 블록 

예를 들면 연산자인 `+` 로 표현을 바로 하는게 아니라 const add = (a, b) { return a + b } 
이런 느낌인 것 같다 

왜냐면 `+` 연산자를 변수에 할당할 수 없기 때문에 `일급` 이라는 모습을 보이기 위해 나온 내용으로 보인다 

### 필드명을 문자열로 사용하면 버그가 생기지 않을까요

충분히 그렇게 생각 되어지기도 하고 책에서도 그렇게 나온다 

1. 컴파일 타임에 검사하는 방법 - 주로 정적 타입 시스템에서 사용
    1. Typescript 
2. 런타임  검사 - 함수를 실행할 때 마다 동작

### 반복문 예제 : 먹고 치우기

- `일급` 은 인자로 전달할 수 있다는 말 / `고차` 라는 말은 함수가 다른 함수를 인자로 받을 수 있다는 말. 일급 함수가 없다면 고차 함수를 만들 수 없다

```tsx
[ 먹고 치우기 - 변경 전 ]

for (var i = 0; i < foods.length; i++) {
	var food = foods[i]
	cook(food)
	eat(food)
}

for (var i = 0; i < dishes.length; i++) {
	var dish = dishes[i]
	wash(dish)
	dry(dish)
	putAway(dish)
}

---------------------------------------------

[ 먹고 치우기 - 변경 후 ]
forEach사용 진행 - 고차함수이며 함수를 인자로 받을 수 있다

forEach(foods, function(food) {
	cook(food)
	eat(food)
})

forEach(dishes, function(dish) {
	wash(dish)
	dry(dish)
	putAway(dish)
})

```

### 리팩터링 : 함수 본문을 콜백으로 바꾸기

```tsx
1. 본문과 본문의 `앞부분`과 `뒷부분`을 구분합니다
2. 전체를 함수로 빼냅니다
3. 본문 부분을 빼낸 함수의 인자로 전달한 함수로 바꿉니다
```

```tsx
try {
	saveUserData(user)
} catch (error) {
	logToSnapErrors(error)
}

[ 함수로 빼낸 코드 ]
function withLogging() {
	try {
		saveUserData(user)
	} catch (error) {
		logToSnapErrors(error)
	}
}

withLogging()

[ 콜백으로 빼낸 코드 ]
function withLogging(f) {
	try {
		f()
	} catch (error) {
		logToSnapErrors(error)
	}
}

withLogging(function() { saveUserData(user) })

```
