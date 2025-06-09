
//for...of 只是單純「依序」把 promises 裡的每個 promise 物件取出，對每個都註冊 then/catch。
//這個 loop 很快就會跑完，並不會等 promise 完成才跑下一個。
//真正決定 race 結果的是「哪個 promise 最先 settle」（fulfilled 或 rejected），而不是 for...of 什麼時候跑到那個 promise。

// 總結： for...of 只是同步註冊監聽，promise 什麼時候完成完全是非同步、獨立進行，race 的本質是「誰先 settle，誰就決定結果」

function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    for (const p of promises) {
      p.then((val) =>{
        resolve(val);
      }).catch((err) => {
        reject(err);
      })
    }
  });
}