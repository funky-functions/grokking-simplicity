### 정리

함수형 프로그래밍 
1. 불변 상태 만들어 부수효과 제거
2. 일급 객체 ( 함수형 구현 여부 )
3. 가독성 상승
4. 동시성 작업 안전하게 구현


액션, 계산, 데이터 분리
1. 액션 : 비순수 함수
2. 계산 : 순수 함수
3. 데이터 : 이벤트에 대한 사실

액션도 계산처럼 함수로 구현하기 때문에 함수만 보고 분간하기 힘들다. 액션도 일반적으로 입력과 출력이 필요하다.

데이터를 파악하는 것으로 시작해서 계산과 추가 데이터 도출 그리고 액션으로 모든 것을 묶는다
데이터는 사용하는 데 제약이 많고 액션은 가장 제약이 없다. 
데이터를 먼저 구현하고 계산을 구현한 후에 마지막으로 액션을 구현하는 것이 함수형 프로그래밍의 일반적인 구현 순서이다

### 같이 생각해볼 문제

##### 중첩된 순수함수도 순수함수인가?
-> 순수 함수에서 다른 순수 함수를 호출 (콜백 x)
"_외부 상태에 의존하지 않음_ "

##### p.52 이메일을 보내기 전에 왜 이메일을 만드는가? 

```ts
const { member_id, ...new_data } = formData;

const result = await editMember({
	...new_data,
	...(user.pwd && { pwd: new_data.pwd }),
	...(user.auth_k === 1 && {
			bandwidth: +new_data.bandwidth,
			storage: +new_data.storage,
			max_user: +new_data.max_user
		})
	},
	member_id
);

// 변수에 담고 인수로 넘기나? 바로 넘기나? 조건문을 써야되나?
// 계산을 따로 빼줘야 하나?

// 1. 그대로 간다 

// 2. 함수를 분리한다

const 계산함수 = (form_data:데이터타입, user_data:유저데이터타입):변환데이터타입 => {
	return ({
		...new_data,
		...(user.pwd && { pwd: new_data.pwd }),
		...(user.auth_k === 1 && {
			bandwidth: +new_data.bandwidth,
			storage: +new_data.storage,
			max_user: +new_data.max_user
		})
	});
}

const result = await editMember(계산함수(new_data, user), member_id);

// 3. 변수에 담고 던진다.
const 계산_데이터 = 계산함수(new_data, user);
const result = await editMember(계산_데이터, member_id);

// 4. 최대한 쪼개야 된다.
const 유저_권한_분류 = (auth_k: number) => {
	console.assert(auth_k > 2);
	switch (auth_k) { ...
	}
}
const 비밀번호_유무 = () => {
	...
}

```

##### p.80 전부 분리 ?

```ts
// 순차적 실행 
const 실행_함수 = (amount: number) => {
	const a_data = a(amount);
	const b_data = b(a_data);
	const c_data = c(b_data);
	const d_data = d(c_data);
	const e_data = e(d_data);
	return e_data;
}

// 전달
const 실행_함수 = (amount: number) => {
	return e(d(c(b(a( amount )))));
}
```
