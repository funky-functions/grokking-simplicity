interface ShoppingItem {
  name: string;
  price: number;
}

interface Customer {
  purchases: ShoppingItem[];
}

// filter 적용

// ---- before ----
// function selectBestCustomers(customers: Customer[]) {
//   const newArray: Customer[] = [];
//   customers.forEach((customer) => {
//     if (customer.purchases.length >= 3) newArray.push(customer);
//   });
//   return newArray;
// }

// ---- after ----
function selectBestCustomers(customers: Customer[]) {
  // filter에 전달되는 콜백함수를 predicate 라고 함
  // predicate: true/false 를 반환하는 함수
  return customers.filter((customer) => customer.purchases.length >= 3);
}

// reduce 적용

// ---- before ----
// function countAllPurchases(customers: Customer[]) {
//   let total = 0;
//   customers.forEach((customer) => {
//     total = total + customer.purchases.length;
//   });
//   return total;
// }

// ---- after ----
function countAllPurchases(customers: Customer[]) {
  return customers.reduce((acc, cur) => acc + cur.purchases.length, 0);
}
