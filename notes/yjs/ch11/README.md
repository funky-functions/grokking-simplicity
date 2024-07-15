### 일급함수 II

### 카피-온-라이트 리팩터링하기

```tsx
카피-온-라이트 단계
1. 복사본을 만든다
2. 복사본을 변경한다
3. 복사본을 리턴한다
```

- 위의 과정을 `함수 본문을 콜백으로 바꾸기` 를 적용해보자
    - 본문과 앞부분, 뒷부분을 확인하기
    - 함수 빼내기
    - 콜백 빼내기

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

어떻게 보면 리팩터링 하고 나서 코드의 길이도 늘어나는 경우도 있다

그러나, 앞으로 추가적인 함수 작성이 없이도 `표준화된 원칙`, `새로운 동작에 원칙을 적용할 수 있으며` `여러 개를 변경할 때 최적화`가 가능하다.

### 함수를 리턴하는 함수

```tsx
// 해당 내용 중 일부를 생략하고 아래와 같이 익명 함수로 일단 만들어 보자
function (arg) {
	try {
		saveUserDataNoLogging(arg)
	} catch (error) {
		logToSnapErrors(error)
	}
}

function (arg) {
	try {
		fetchProductNoLogging(arg)
	} catch (error) {
		logToSnapErrors(error)
	}
}

위의 두 내용을 보니 중복되기도 하며 앞부분, 본문, 뒷부분으로 다시 나눌 수가 있다. 

그래서 함수 본문을 콜백으로 바꾸어 보자 

function wrapLogging(f) {
	return function(arg) {
		try {
			f(arg)
		} catch (error) {
			logToSnapErrors(error)
		}
	}
}

// 로그를 남기지 않는 함수를 변환하기 위해 wrapLoggin()함수를 부르고 변수에 할당
var saveUserDataWithLOgging = wrapLogging(saveUserDataNoLogging)

```

### 정리

- 고차 함수로 전체 프로그램을 만들면 더 좋지 않을까?
    - 우리 개발자는 탐구하고 실험을 해야한다. 고차함수로 만든 방법과 직관적인 방법을 비교하면서 무엇이 코드 읽기가 쉬운지, 중복 코드를 없애는지 등 따지면서 코드 작성을 해야한다.
- 고차 함수로 `패턴이나 원칙` 을 코드로 만들 수 있다
- 고차 함수는 중복 코드를 많이 줄여줄 수 는 있으나 가독성을 해칠 수 있다
