# 함수형 프로그래밍

# 계층형 설계 패턴

## 1. 직접구현

### p197 기억하세요

```jsx
// 배열 인덱스를 직접 참조
function setPriceByName(cart, name, price){
    const i = indexOfItem(cart, name);
    if(i !== null){
	      const item = cart[i];
	      return arraySet(cart, i, setPrice(item, price));
    }
    return cart;
}

function indexOfItem(cart, name){
    for(let i = 0; i < cart.length; i++){
        if(cart[i].name === name)
        return i;
    }
    return null;
}

// 배열 인덱스를 참조하지 않음
function setPriceByName(cart, name, price){
    const i = indexOfItem(cart, name);
    if(i !== null){
	      const item = arrayGet(cart, i);
	      return arraySet(cart, i, setPrice(item, price));
    }
    return cart;
}

function indexOfItem(cart, name){
    for(let i = 0; i < cart.length; i++){
        if(arrayGet(cart, i).name === name)
        return i;
    }
    return null;
}

function arrayGet(array, idx){
    return array[idx];
}
```

### 배열 인덱스를 직접 참조하면서 설계가 좋다고 느꼈을 때

- 보통 일반적인 방법
- 직관적이라서 이해하기 쉬움
- 배열의 기능을 바로 쓰는 거라 따로 코드를 관리할 필요가 없음

### 배열 인덱스를 직접 참조하지 않으면서 설계가 좋다고 느꼈을 때

- 분리된 계층이 필요할 때
- 공통으로 함수를 만들어서 사용하게 되면 소스 수정이 편리함
- 내가 원하는 스타일로 리턴 값을 만들 수 있음

## 2. 추상화 벽

### 추상화 벽을 사용할 때

서버에서 데이터를 받아서 처리해야 하지만 아직은 준비가 되지 않아 임시 데이터를 줘야 하는 경우와 같이 뭔가 바뀔 것을 알고 있지만 아직 준비되지 않은 경우에도 좋다.

## 3. 편리한 계층

- 비기능적 요구사항

1.**유지보수성**: 요구 사항이 바뀌었을 때 가장 쉽게 고칠 수 있는 코드는 어떤 코드인가?

→ 위로 연결된 것이 적은 함수가 바꾸기 쉽다. 호출 당하는 쪽보다는 호출하는 쪽이 쉽다.

2.**테스트성**: 어떤 것을 테스트하는 것이 가장 중요한가?

→ 위쪽으로 많이 연결된 함수를 테스트하는 것이 더 가치 있다.

3.**재사용성**: 어떤 함수가 재사용하기 좋은가?

→ 아래쪽에 함수가 적을수록 더 재사용하기 쉽다. 제일 낮은 단계 함수

## 궁금한 부분

테스트성: 아래쪽에 있는 함수를 어떻게??? 테스트 하지???