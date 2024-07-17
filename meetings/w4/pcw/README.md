
#### 콜백 함수 

콜백함수는 다른 함수에 인수로 전달되고 나중에 일부 이벤트나 비동기 작업에 대한 응답으로 실행되는 함수.

#### 고차 함수

고차 함수는 다른 함수를 인수로 사용하거나 함수를 결과로 반환할 수 있는 함수.

#### 일급 값
일급 값은 변수에 저장할 수 있고 인자로 전달하거나 함수의 리턴 값으로 사용할 수 있다.

```tsx
// p.262
withLogging( function(){ saveUserData(user)} );

// 질문
const handleEvent = (type: string) => e => {
	return addEvent(type);
}

// 익명 함수를 사용한다.
<Element onClick={() => addEvent(type)} />

// 고차 함수를 사용한다.
<Element onClick={handleEvent(type)} />

// 추가
<Element onClick={addEvent(type)} />

```

```ts
function withArrayCopy (copy:any[]) {
	const copy = array.slice();
	copy[idx] = value;
}
// empty
// 객체의 예시와 다름

```