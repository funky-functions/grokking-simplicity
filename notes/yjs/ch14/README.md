### 중첩된 데이터에 함수형 도구 사용하기

- 객체를 다룰 수 있는 함수형 도구를 살펴보자

### 필드명을 명시적으로 만들기

- 사칙연산을 하는 중복되는 함수들이 있다면 (incrementField, doubleField…)
함수 이름에 있는 `암묵적 인자` 드러내기를 한다
- 추가적으로 아래의 경우 `함수 본문을 콜백으로 바꾸기` 과정도 진행해준다

```tsx
function incrementField(item, field) {
	var value = item[field]
	var newValue = value
	var newItem = objectSet(item, field, newValue)
	return newItem
}

///////////////// 변경 //////////////////////
function incrementField(item, field) {
	return updateField(item, field, function(value) {
		return value + 1
	}
}

function updateField(item, field, modify) {
	var value = item[field] // 값을 가져와서
	var newValue = modify(value) // 바꾸고
	var newItem = objectSet(item, field, newValue) // 설정
	return newItem
}
```

### 중첩된 update  시각화하기

```tsx
function incrementSize(item) {
	var options = item.options // 단계 1
	var size = options.size // 단계 2
	var newSize = size + 1 // 단계 3
	var newOptions = objectSet(options, 'size',  newSize)  // 단계 4
	var newItem = objectSet(item 'options', newOptions) // 단계 5
	return newItem
}
```

단계 1. 키를 가지고 객체에서 값을 조회

```tsx
shirt
	name: "shirt",
	price: 13
	options
		color: "blue",
		size: 3
```

단계 2. 키를 가지고 객체에서 값을 조회

- options 내의 size로 값을 조회하면 3이 나옴

단계 3 . 새로운 값을 생성 

3 → (size + 1) → 4

단계 4. 복사본 생성

변경된 size 값 4를 바탕으로 수정된 options 내용 복사본 생성

단계 5. 복사본 생성

수정되었던 options 복사본을 shirt 객체에 교체해주는 과정 

```tsx
shirt copy
name: "shirt",
price: 13
options copy
	color: "blue"
	size: 4
```

### 중첩된 데이터에 update() 사용하기

```tsx
function incrementSize(item) {
	var options = item.options // 단계 1
	var size = options.size // 단계 2
	var newSize = size + 1 // 단계 3
	var newOptions = objectSet(options, 'size',  newSize)  // 단계 4
	var newItem = objectSet(item 'options', newOptions) // 단계 5
	return newItem
}

////////////// 두 번 리팩토링 //////////////////
function incrementSize(item) {
	return update(item, 'options', function(options) {
		return update(options, 'size', increment)
	})
}

var shirt = { // 처리해야할 중첩된 데이터
	name: "shirt",
	price: 13,
	options: {
		color:  "blue",
		size: 3
	}
}
```

- 데이터가 중첩된 단계만큼 update를 호출하는 모습이 보인다
- 여기서 나는 냄새는 update 인자가 `암묵적 인자` 라는 것이다. 이를 명시적으로 바꿔야 한다

```tsx
function update2(item, key1, key2, modify) {
	return update(object, key1, function(value1) {
		return update(value1, key2, modify)
	})
}

function incrementSize(item) {
	return update2(item, 'options', 'size', function(size) {
		return size + 1
	})
}
```

- updateX의 경우 X만큼 중첩이 진행된다는 의미이다.
- 다만 현재  인자에도 key1, key2, key3… 이렇게 늘어나게 된다는 점과 많은 호출이 일어나는 점이 단점으로 보인다.
- 아래의 nestedUpdate 파트에서 살펴보자

### nestedUpdate() 도출하기

- 재귀를 활용하면서 함수 이름에 있는 암묵적 인자 냄새를 맡아 드러낸다

```tsx
function update0(value, modify) { // 키가 없는 경우에는 이제 재귀 호출을 하지 않아야 한다
	return modify(value)
}

function nestedUpdate(object, keys, modify) {
	if (keys.length === 0) {
		return modify(object)
	}
	var key1 = keys[0]
	var restOfKeys = drop_first(keys) // 
	return update(object, key1, function(value1) {
		return nestedUpdate(value1, restOfKeys, modify)
	})
}
```

- 재귀 사용 시 주의점
    - `종료 조건` 을 잘 만들어야 한다. 그래야 종료할 수 있기 때문
    - `재귀 호출` 즉, 최소 하나라도 있어야 한다.
    - `종료 조건에 다가가기` 최소 하나 이상의 인자가 줄어들어야 한다.

중첩된 객체에서 사용할 때 나중에 인자에서 위의 예시처럼 keys를 나타내는 배열이 길어지면 알아보기 어려운 경우가 존재한다. 

이럴 때 `추상화 벽` 을 만들어서 함수에 이름을 붙이도록 하는 것이다

```tsx
function updatePostById(category, id, modifyPost) {
	return nestedUpdate(category, ['posts', 'id'], modeifyPost)
}

function updateAuthor(post, modifyUser) {
	return update(post, 'author', modifyUser)
}

function capitalizeName(user) {
	return update(user, 'name', capitalize)
}

updatePostById(blogCategory, '12', function(post) {
	return updateAuthor(post, capitalizeUserName)
})
```

- 결과적으로 인자가 줄어들고, 내부 구조에 대해서는 알 필요가 많이 없어졌다. 
기존에서처럼 재귀에 로직들이 있으면 이를 알아봐야하는 점이 존재했지만, 그러한 수고가 조금 덜어진 것 이라고 보면 될 것 같다.
- 돌이켜보면 해당 부분도 작은 단계로 함수화 시키고 나누면서 단순화하기 위한 방법 같다. 
id값만 알면 알아서 작가의 이름을 대문자로 바꿔주는 로직으로 보인다.