### 타임라인 사이에 자원 공유하기

- 자원을 공유하지 않는 타임라인이 가장 좋다

### DOM이 업데이트되는 순서를 보장해야 합니다

- 클릭한 순서대로 DOM이 업데이트되어야 합니다
- 자료구조 큐를 활용하기도 한다

### 자바스크립트에서 큐 만들기

- 큐를 만들어서 동시에 실행되는 것과 전역변수를 지역변수로, 콜백 함수를 적용해본다

```tsx
function Queue() {
	var queue_items = []
	var working = false
	
	function runNext() {
		if (working) return // 동시에 실행되는 것을 막는다
		if (queue_items.length === 0) return // 비어있을 때 멈추도록 함
		working = true
		var cart = queue_items.shift()
		calc_cart_total(cart, function(total) {
			update_total_dom(total)
			working = false
			runNext()
		})
	}
	
	return function(cart) {
		queue_items.push(cart)
		setTimeout(runNext, 0)
	}
}

var update_total_queue = Queue() // 리턴된 함수를 원래 함수처럼 사용 가능
```

- DOM의 변경을 순서대로 하기위해  위처럼 자료구조 큐를 만들어 적용하였다
- 기존에는 전역변수로 queue_items, working 등으로  판단하였으나 지역변수로 만들어 액션을 줄인다.

### 원칙 : 공유하는 방법을 현실에서 착안하기

- 사람들이 자원을 공유하기 위해 `줄(Queue)` 을 서는 것을 보고 큐를 만들었다
- 인간은 언제나 자원을 공유하고, 컴퓨터는 방법을 모르기 때문에 직접 프로그래밍을 해준다

### 큐를 재사용할 수 있도록 만들기

`callback || function() {}` 콜백함수가 존재하는 경우에만 실행하도록 한다. 

- 없다면 기본적으로 빈 함수를 사용한다.
매개 변수로 콜백 함수를 기대하지만, `선택 사항` 인 경우에 유용하다

**[ 작업이 완료되었을 때 콜백 부르기 ]**

- 위의 기존 큐와 **비교하기**

```tsx
function Queue(worker) {
	var queue_items = [] // 일반적인 함수로 만들었기에 일반적인 이름 사용
	var working = false
	
	function runNext() {
		if (working) return // 동시에 실행되는 것을 막는다
		if (queue_items.length === 0) return // 비어있을 때 멈추도록 함
		working = true
		var item = queue_items.shift()
		worker(item.data, function(val) {
			working = false
			setTimeout(item.callback, 0, val)
			runNext()
		})
	}
	
	return function(data, callback) {
		queue_items.push({
			data: data,
			callback: callback || function() {}
		})
		setTimeout(runNext, 0)
	}
}

function calc_cart_worker(cart, done) {
	calc_cart_total(cart, function (total) {
		update_total_dom(total)
		done(total)
	})
}

var update_total_queue = Queue(calc_cart_worker) 
```

- Queue는 `동시성 기본형(자원을 안전하게 공유할 수 있는 재사용 가능한 코드)` 이고, 순서 보장을 해주는 도구이다.  즉, 큐가 실행 순서를 제한하며 원하는 동작대로 움직이게 해준다