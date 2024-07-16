### 이번 주차는 정리 위주

- 일급 함수를 활용하여 코드의 냄새를 킁킁 맡아 중복을 없애고 추상화를 잘하도록 `리팩터링 2가지`의 방법을 소개한다.


### 1. 암묵적 인자 드러내기

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

- 일반적인 함수 하나로 바꾸어 만들었음


### 2. 함수 본문을 콜백으로 바꾸기

```tsx
1. 본문과 본문의 `앞부분`과 `뒷부분`을 구분합니다
2. 전체를 함수로 빼냅니다
3. 본문 부분을 빼낸 함수의 인자로 전달한 함수로 바꿉니다
```


```tsx
function arraySet(array, idx, value) {
	var copy = array.slice() // 앞부분
	copy[idx] = value // 본문
	return copy // 뒷부분
}

앞부분, 뒷부분은 거의 동일한 패턴을 가지고 있다

2. 함수 빼내기
function arraySet(array, idx, value) {
	var copy = array.slice()
	copy[idx] = value
	return copy
}

function withArrayCopy(array) {
	var copy = array.slice()
	copy[idx] = value
	return copy
}

3. 콜백 뺴내기
function arraySet(array, idx, value) {
	return withArrayCopy(array, function(copy) {
		copy[idx] = value
	})
}

function withArrayCopy(array, modify) {
	var copy = array.slice()
	modify(copy)
	return copy
}

```

위와 같은 리팩터링 과정들과 함께 고차함수들인 `map(), filter(), reduce()` 등을 활용하여 수정합니다

`표준화된 원칙`

`새로운 동작에 원칙 적용`

`여러 개를 변경할 때 최적화 적용` 


리팩터링을 통해 코드에 대해 위의 3가지에 대한 내용들을 적용하고 얻을 수 있다.