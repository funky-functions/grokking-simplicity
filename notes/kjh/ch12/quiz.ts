// 연습문제
interface Customer {
  lastName: string;
  firstName: string;
  address: string;
  id: string;
}
// p.299 고객의 성, 이름, 주소가 담긴 객체로 이루어진 배열 만들기
function getCustomerInfoArray(customers: Customer[]) {
  return customers.map(({ lastName, firstName, address }) => {
    return { lastName, firstName, address };
  });
}

// p.304 filter를 활용하여 고객 아이디가 3으로 나눠 떨어지는 그룹을 고르기

function getTestGroup(customers: Customer[]) {
  return customers.filter((customer) => parseInt(customer.id) % 3 === 0);
}

// p.309
// 배열의 숫자를 모두 더하는 함수
function sum(numbers: number[]) {
  return numbers.reduce((acc, cur) => acc + cur, 0);
}

console.log(sum([1, 2, 3, 4, 5, 6])); // 21

// 배열의 숫자를 모두 곱하는 함수
function product(numbers: number[]) {
  return numbers.reduce((acc, cur) => acc * cur, 1);
}

console.log(product([1, 2, 3, 4, 5, 6])); // 720

// p.310 연습 문제
// reduce를 활용하여 숫자 배열에 있는 가장 큰 값과 가장 작은 값을 찾는 함수 만들기

// 배열에서 가장 작은 숫자 찾기
function min(numbers: number[]) {
  return numbers.reduce((acc, cur) => {
    if (acc > cur) return cur;
    return acc;
  }, Number.MAX_SAFE_INTEGER);
}

console.log(min([1, 10, 5, 8, -9])); // -9

// 배열에서 가장 큰 숫자 찾기
function max(numbers: number[]) {
  return numbers.reduce((acc, cur) => {
    if (acc < cur) return cur;
    return acc;
  }, Number.MIN_SAFE_INTEGER);
}

console.log(max([1, 10, 5, 8, -9])); // 10

// p.314
// reduce로 map 구현
function map(array: any[], f: (arg: any) => any) {
  return array.reduce((acc, cur) => {
    acc.push(f(cur));
    return acc;
  }, []);
}

console.log(map([1, 2, 3, 4, 5], (arg) => arg * arg)); // [ 1, 4, 9, 16, 25 ]

// reduce로 filter 구현
function filter(array: any[], f: (arg: any) => boolean) {
  return array.reduce((acc, cur) => {
    if (f(cur)) acc.push(cur);
    return acc;
  }, []);
}
