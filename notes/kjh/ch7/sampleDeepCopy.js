// 깊은 복사를 이해하는 용도로만 활용
// Date 객체, 함수 등은 복사되지 않음,
function deepCopy(thing) {
  if (Array.isArray(thing)) {
    let copy = [];
    for (let i = 0; i < thing.length; i++) copy.push(deepCopy(thing[i]));
    return copy;
  } else if (thing === null) {
    return null;
  } else if (typeof thing === "object") {
    let copy = {};
    let keys = Object.keys(thing);
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      copy[key] = deepCopy(thing[key]);
    }
    return copy;
  } else {
    return thing;
  }
}
