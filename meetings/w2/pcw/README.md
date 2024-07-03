### 데이터 불변성 

##### 얕은 복사

`카피 온 라이트`

p.133 생각보다 많이 복사하지 않는다 ?
데이터 구조의 최상위 단계만 복사 (얕은 복사) 사용
같은 메모리를 가리키는 참조에 대한 복사 (구조적 공유)
-> 더 적은 메모리를 사용하고 가비지 콜렉터의 부담을 줄인다. 

##### 깊은 복사

1. 재귀 함수 (다양한 타입 지원, 깊이에 따라 속도 차이 심함)
2. lodash (젤 느림)
3. JSON (지원 안하는 타입 많음)
4. structuredClone (제일 최신, 심볼 같은건 지원 x)


동작을 읽기, 쓰기 또는 둘 다로 분류하기
데이터를 바꾼다, 바꾸지 않는다.

불변한 데이터 
Object.freeze
깊어지면 deepFreeze

```ts
// 카피 온 라이트
export const updateTree = (data: any[], current_path: string, new_data: any[]) => {
	const copyData = [...data];
	for (const tree of copyData) {
		if (tree.path === current_path) {
			tree.items = [...new_data];
			break;
		}
	if (tree.items.length) {
		tree.items = updateTree(tree.items, current_path, new_data);
	}
	}
return copyData;
};

// 깊은 복사
static updateTree(data: any[], current_path: string, new_data: any[]) {
	const copyData = structuredClone(data);

	for (const tree of copyData) {
		if (tree.path === current_path) {
			const data = structuredClone(new_data);
			tree.items = data;
			break;
		}

		if (tree.items) {
			tree.items = this.updateTree(tree.items, current_path, new_data);
		}
	}
	return copyData;
}
```
얕은 복사
0.024169921875 ms
0.033935546875 ms
0.06298828125 ms

깊은 복사
0.009033203125 ms
0.051025390625 ms