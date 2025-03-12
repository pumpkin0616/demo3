// // utils/limitPromise.js
// class LimitPromise {
//   constructor (max) {
//     this._max = max || 5; // 最大并发数
//     this._count = 0; // 当前执行的任务数
//     this._taskQueue = []; // 任务队列
//   }

//   run (caller) {
//     return new Promise((resolve, reject) => {
//       const task = this._createTask(caller, resolve, reject);
//       if (this._count >= this._max) {
//         this._taskQueue.push(task); // 超过最大并发数，进入队列
//       } else {
//         task(); // 立即执行
//       }
//     });
//   }

//   _createTask (caller, resolve, reject) {
//     return () => {
//       this._count++;
//       caller()
//         .then(resolve)
//         .catch(reject)
//         .finally(() => {
//           this._count--; // 任务完成，减少并发计数
//           if (this._taskQueue.length > 0) {
//             const task = this._taskQueue.shift();
//             task(); // 取出队列中的任务执行
//           }
//         });
//     };
//   }
// }

// // 以 ES6 模块方式导出
// export default LimitPromise;
class LimitPromise {
  constructor (max) {
      this._max = max || 6; // 最大执行数量
      this._count = 0; // 当前执行的数量
      this._taskQueue = []; // 队列
      this.instance = null; // 实例 单例模式
  }

  run (caller) {
      return new Promise((resolve, reject) => {
          const task = this._createTask(caller, resolve, reject);
          // 当前执行的数量 > 最大执行数量，就加入队列排队；否则直接执行
          if (this._count >= this._max) {
              this._taskQueue.push(task);
          } else {
              task();
          }
      });
  }

  _createTask (caller, resolve, reject) {
      return () => {
          caller().then(res => {
              resolve(res);
          }).catch(err => {
              reject(err);
          }).finally(() => {
              // 执行完成
              this._count--;
              if (this._taskQueue.length > 0) {
                  // 取出队列中的首位执行
                  const task = this._taskQueue.shift();
                  task();
              }
          });
          this._count++;
      };
  }

  static getInstance (max) {
      if (!this.instance) {
          this.instance = new LimitPromise(max);
      }
      return this.instance;
  }
}
export default LimitPromise;
