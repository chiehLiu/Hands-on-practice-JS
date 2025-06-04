// What is promise?
// Promise 是一種用來處理非同步操作的物件，它代表了一個可能在未來某個時間點完成或失敗的操作。
// Promise 有三種狀態：
// 1. Pending（等待中）：初始狀態，既不是成功也不是失敗。
// 2. Fulfilled（已完成）：操作成功完成，並且有一個結果值。
// 3. Rejected（已拒絕）：操作失敗，並且有一個錯誤原因。






// Promise.all

// 這邊精簡版只處理 Array ，但實際上 Promise.all 可以處理任何可迭代的物件例如 Set、Map 等等。
// Promise.all 會接受一個可迭代的物件這邊以陣列做舉例，並返回一個新的 promise 並且他會 resolve 一個陣列，這個陣列包含了所有 promise 的結果。

// 如果其中一個 promise 被 reject，則整個 Promise.all 會被 reject，並且不會等待其他 promise 完成。
// 如果所有的 promise 都被 resolve，則 Promise.all 會 resolve 一個包含所有結果的陣列。


function promiseAll(promises) {
  if (!Array.isArray(promises)) {
    return new TypeError("Arguments must be an array");
  }

  if (promises.length === 0) {
    return Promise.resolve([]);
  }

  const outputs = [];
  let resolveCounter = 0;

  return new Promise((resolve, reject) => {
    promiseAll.forEach((promise, index) => {
      promise
        .then((value) =>{
          outputs[index] = value;
          resolveCounter += 1;
          if (resolveCounter === promises.length) {
            resolve(outputs);
          }
        })
        .catch(reject);
    });
  });
}

// 使用範例
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "foo");
});

Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values); // [3, 42, 'foo']
});


// 處理所有迭代物件的完整版本
function promiseAll(promises) {

  // 檢查 promises 是否為可迭代物件
  const isIterable = 
    ((typeof promises === "object" && promises !== null) || typeof promises === "string") &&
      // 這邊的 type 為 function 的意思是，該 iterable 有實作 Symbol.iterator 方法，代表它可以被 for...of 或展開運算符（...）所迭代
      typeof promises[Symbol.iterator] === "function";
  
  if (!isIterable) {
    return new TypeError("Arguments must be an iterable object");
  }

  promises = Array.from(promises); // 將可迭代物件轉換為陣列

  if (promises.length === 0) {
    return Promise.resolve([]);
  }
  
  const outputs = [];
  let resolveCounter = 0;

  return new Promise((resolve, reject) => {

    function handleResolution(value, index) {
      outputs[index] = value;
      resolveCounter += 1;
      if (resolveCounter === promises.length) {
        resolve(outputs);
      }
    }

    promises.forEach((promise, index) => {
      // 檢查 promise 是否為一個物件，並且有 then 方法
      // 這樣可以處理非 Promise 的物件，例如普通值或其他類型的物件
      // 如果是 Promise，則調用它的 then 方法
      // 如果是普通值，則直接處理該值

      if (
          typeof promise === 'object' &&
          'then' in promise &&
          typeof promise.then === 'function'
        ) {
        promise
          .then((value) => handleResolution(value, index))
          .catch(reject);
      } else {
        handleResolution(promise, index);
      }
    })

    // promises.forEach((promise, index) => {
    //   if (promise.then) {
    //     promise()
    //       .then((value) => handleResolution(value, index))
    //       .catch(reject);
    //   } else {
    //     handleResolution(promise, index);
    //   }
    // })
  })
}