// 연습문제 1. payrollCalc() 에 방어적 복사 적용하기
// 원래 함수
function parollCalc(employee: any) {
  // return payrollChecks;
}

// 방어적 복사 적용
function payrollCalcSafe(employee: any) {
  // const employee_safe = deepCopy(employee);
  // const payrollChecks = payrollCalc(employee_safe);
  // return deepCopy(payrollChecks);
}

// 연습문제 2. 신뢰할 수 없는 코드에서 나오는 데이터를 방어적 복사하기
// 유저 정보가 바뀌면 실행할 콜백함수 전달
// userChanges.subscribe((user) => {
// 신뢰할 수 없는 코드에서 나오는 데이터 user가 불변적인지 모르므로, 깊은 복사
//   const user_copy = deepCopy(user);
//   processUser(user_copy);
// })
