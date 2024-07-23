# 13~14

# p.339 연습문제

### 제품들에서 원하는 타입의 재고량 합 구하기

```jsx
const products = [{  type : "tie"
                    , numberInInventory: 1}
                 , {  type : "shoes"
                    , numberInInventory: 2}
                 , {  type : "watch"
                    , numberInInventory: 3}
                 , {  type : "socks"
                    , numberInInventory: 4}
                 , {  type : "ring"
                    , numberInInventory: 5}
                 ];

function shoseAndSocksInventory(products){
	var inventory = 0;
	for(var p = 0; p < products.length; p++){
		var product = products[p];
		if(product.type === "shoes" || product.type === "socks"){
			inventory += product.numberInInventory;
		}
	}
	return inventory;
}
shoseAndSocksInventory(products);

// 변환
1. filter() 사용
function shoseAndSocksInventory(products){
	const inventory = 0; // reduce 초기값용
	
	//for(var p = 0; p < products.length; p++){
	//	var product = products[p];
	//	if(product.type === "shoes" || product.type === "socks"){
			inventory += product.numberInInventory; // map으로 바꾸기
	//	}
	//}
	
	const productFilter = filter(products, (product) =>{
		                      return ["shoes", "socks"].include(product.type);
	                      });
	return inventory;
}

2. map 사용
function shoseAndSocksInventory(products){
	const inventory = 0; // reduce 초기값용
	
	//for(var p = 0; p < products.length; p++){
	//	var product = products[p];
	//	if(product.type === "shoes" || product.type === "socks"){
			inventory += product.numberInInventory; // map으로 바꾸기
	//	}
	//}
	
	const productFilter = filter(products, (product) =>{
			                           return ["shoes", "socks"].include(product.type);
	                             });
	const productMap = map(productFilter, (product) => {
		                       return product.numberInInventory
	                       });
	return inventory;
}

3. reduce 사용
function shoseAndSocksInventory(products){
	//const inventory = 0; // reduce 초기값용
	
	//for(var p = 0; p < products.length; p++){
	//	var product = products[p];
	//	if(product.type === "shoes" || product.type === "socks"){
			//inventory += product.numberInInventory; // map으로 바꾸기
	//	}
	//}
	
	const productFilter = filter(products, (product) =>{
			                           return ["shoes", "socks"].includes(product.type);
	                             });
	const productMap = map(productFilter, (product) => {
		                       return product.numberInInventory
	                       });
	return inventory= reduce(productFilter, 0, plus);
}

function plus(a, b){
	return a + b;
}

4. 자바스크립트 Array 프로토타입 메서드 사용
function shoseAndSocksInventory(products, targetProduct){
	return products?.filter((product) => targetProduct.includes(product.type))
	                .map((product) => product.numberInInventory)
	                .reduce((a, b) => a + b, 0);
}

const products = [{  type : "tie"
                    , numberInInventory: 1}
                 , {  type : "shoes"
                    , numberInInventory: 2}
                 , {  type : "watch"
                    , numberInInventory: 3}
                 , {  type : "socks"
                    , numberInInventory: 4}
                 , {  type : "ring"
                    , numberInInventory: 5}
                 ];
                 
const targetProduct = ["shoes", "socks"];
shoseAndSocksInventory(products);

대부분의 사이트에서는 필터를 하는 기능이 있으면 화면에서 처리하지 않고
DB에서 조회조건에 맞게 다시 조회한다.

보통 데이터를 사용할 때는 특히 시변성이 강한 데이터는 DB나 서버의 메모리에서
가져오는게 올바른 방법
예시 장바구니에서 실시간으로 재고량 변동 or 가격변동(이벤트등)

filter(), map(), reduce()는 리액트에서 컴포넌트를 동적으로 만들어줄 때 유용

해당 장바구니의 데이터를 바로 받는거라면 DB에서 가공
SQL
SELECT SUM(NUMBER_IN_INVENTORY)
  FORM PRODUCT_INVENTORY
 WHERE 1=1
   AND TYPE IN ('shoes', 'socks');
```