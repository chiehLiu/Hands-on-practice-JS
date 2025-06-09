// 題目描述
// 實作一個 get  效用函式。它接收三個參數

// 一個物件
// 某個路徑
// 預設值
// 而此函式最後會返回路徑的值；如果該路徑不存在於給定的物件，則返回預設值。透過例子會比較好理解：

```javascript
// 範例
const object = { a: [{ b: { c: 3 } }] };

//=> 3
get(object, "a[0].b.c");

//=> 3
get(object, 'a[0]["b"]["c"]');

//=> 'default'
get(object, "a[100].b.c", "default");
```

function get(object, pathParam, defaultValue) {
  // 如果傳進來的 object 是 null 或 undefined 則直接返回 defaultValue
  if (object == null) {
    return defaultValue;
  }

  // count 是路徑的深度
  let count = 0;

  // 在正則中 \ 反斜線代表跳脫的意思：
  // \. 是指遇到 . 的時候，
  // \[\] 是指遇到 這兩個 [, ] 的時候都會做 split
  const path = Array.isArray(pathParam) ? pathParam : pathParam.split(/[\.\[\]]/); // 透過正則 把 . 或 [ ] 替換掉
  const length = path.length;

  ```javascript
  // 範例：將路徑字串轉換為陣列
  const str = "obj.prop1[prop2].value";
  const arr = str.split(/[\.\[\]]/);
  console.log(arr);
  // 輸出: ["obj", "prop1", "prop2", "", "value"]
  ```

  // 確保 object 不為 null 以及 count 小於路徑深度，所以當 count 等於路徑長度時，表示已經到達了路徑的最深處，則跳出迴圈
  while (object != null && count < length) {
    const key = path[count];
    if (key) {
      // 指派更深層的值給 object
      object = object[key];
    }
    count += 1;
  }

  // 如果 count 等於路徑長度，表示已經到達了路徑的最深處，則返回 object，否則返回 undefined
  const result = count && count === length ? object : undefined;
  
  // 如果 object 為 undefined，則返回 defaultValue
  return result === undefined ? defaultValue : result;
}