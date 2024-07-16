// 배열에 대한 COW 리팩터링
// ---- before ----
// function arraySet(array: any[], idx: number, value: any) {
//   const copy = array.slice();
//   copy[idx] = value;
//   return copy;
// }

// ---- after ----
// 배열을 변경하고 나서 일일이 COW 작성해주지 않아도 됨
function withArrayCopy(array: any[], modify: (copy: any[]) => void) {
  const copy = array.slice();
  modify(copy); // 함수 본문을 콜백 함수로 변경
  return copy;
}

function arraySet(array: any[], idx: number, value: any) {
  return withArrayCopy(array, (copy) => (copy[idx] = value)); // 함수 본문을 콜백 함수로 변경
}

// push(), drop_last(), drop_first()을 고차함수로 만들기
function push(array: any[], elem: any) {
  return withArrayCopy(array, (copy) => copy.push(elem));
}

function drop_last(array: any[]) {
  return withArrayCopy(array, (copy) => copy.pop());
}

function drop_first(array: any[]) {
  return withArrayCopy(array, (copy) => copy.shift());
}

// 객체에 대한 COW 리팩터링
// ---- before ----
// function objectSet(object: { [key: string]: any }, key: string, value: any) {
//   const copy = Object.assign({}, object);
//   copy[key] = value;
//   return copy;
// }
//
// function objectDelete(object: { [key: string]: any }, key: string) {
//   const copy = Object.assign({}, object);
//   delete copy[key];
//   return copy;
// }

// ---- after ----
// 객체의 프로퍼티를 변경할 때 일일이 COW 작성하지 않아도 됨
function withObjectCopy(
  object: { [key: string]: any },
  modify: (copy: { [key: string]: any }) => void,
) {
  const copy = Object.assign({}, object);
  modify(copy);
  return copy;
}

function objectSet(object: { [key: string]: any }, key: string, value: any) {
  return withObjectCopy(object, (copy) => {
    copy[key] = value;
  });
}

function objectDelete(object: { [key: string]: any }, key: string) {
  return withObjectCopy(object, (copy) => {
    delete copy[key];
  });
}
