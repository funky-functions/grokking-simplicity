# 10~11

# 본문을 함수로 감싸서 넘기기

```jsx
function withLogging(f){
console.log(f); // ƒ (){
                //    console.log(user);
                //   }
    try{
        f();
    } catch (e) {
        console.log(e);
    }
}
user = 'kms';
withLogging(function(){
                console.log(user);
            });
```

# 본문을 함수 식별자로 전달하기

```jsx
function withLogging(f, v){
console.log(f); // ƒ log() { [native code] }
    try{
        f(v);
    } catch (e) {
        console.log(e);
    }
}
user = 'kms';
withLogging(console.log, user);
```