
class newPromise {
  constructor(fn) {
    this.state = 'pending';//pending fulfilled rejected
    this.value = undefined;
    this.reason = undefined;
    this.resolveCallbacks = [];// 当pending状态下，存储成功的回调
    this.rejectCallbacks = [];

    const resolveHandler = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.resolveCallbacks.forEach(fn => fn(this.value));
      }
    };
    const rejectHandler = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.rejectCallbacks.forEach(fn => fn(this.value));
      }
    };
    try {
      fn(resolveHandler, rejectHandler);
    } catch (error) {
      rejectHandler(error);
    }
  }
  then(fn1, fn2) {
    fn1 = typeof fn1 === 'function' ? fn1 : (v) => v;
    fn2 = typeof fn2 === 'function' ? fn2 : (e) => e;
    if (this.state === 'pending') {
      const p1 = new newPromise((resolve, reject) => {
        this.resolveCallbacks.push(() => {
          try {
            const newValue = fn1(this.value);
            resolve(newValue);
          } catch (error) {
            reject(error);
          }
        });
        this.rejectCallbacks.push(() => {
          try {
            const newReason = fn2(this.reason);
            resolve(newReason);
          } catch (error) {
            reject(error);
          }
        });
      });
      return p1;
    }
    if (this.state === 'fulfilled') {
      return new newPromise((resolve, reject) => {
        try {
          const v = fn1(this.value);
          resolve(v);
        } catch (error) {
          reject(error);
        }
      });
    }
    if (this.state === 'rejected') {
      const p1 = new newPromise((resolve, reject) => {
        try {
          const newReason = fn2(this.reason);
          reject(newReason);
        } catch (error) {
          reject(error);
        }
      });
    }
  }
  catch(fn) {
    return this.then(null, fn);
  }
}

export default newPromise;

function deepClone(obj = {}) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  let result;
  if (obj instanceof Array) {
    result = [];
  } else {
    result = {};
  }
  for (const key in obj) {
    if (Object.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key]);
    }
  }
  return result;
}