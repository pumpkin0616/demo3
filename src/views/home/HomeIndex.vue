<template>
  <div class="box">
    <!-- <div class="box-item box-item-1"></div>
    <div class="box-item box-item-2"></div>
    <div class="box-item box-item-3"></div> -->
    <div class="absolute-item">我是浮动元素</div>
    <div>
      <span class="span-box">
        <span>2</span>
        <span>1</span>
      </span>
    </div>
  </div>
</template>

<script>
import newPromise from './homeIndex';
export default {
  data() {
    return {
      imgUrl: 'https://se1arch-operate.cdn.bcebos.com/c63f5b937296e91b1a9a79a63328b2a6.gif'
    };
  },
  async created() {
    this.loadImge(this.imgUrl).then(res => {
      console.log(res.width, 'resimg');

    }).catch((err) => {
      console.log(err);
    });
    const objcur = {
      name: "Alice",
      regularFunc() {
        setTimeout(() => {
          console.log(this); // 输出 "Alice"（this 指向 obj）

        }, 10);
      },
      arrowFunc: () => {
        console.log(this.name); // 输出 undefined（this 指向外层，如全局或模块作用域）
      }
    };
    objcur.regularFunc();
    objcur.arrowFunc();

    // const res = await this.loadImg();
    // console.log(res.width, 'res');
    // imgP.then((res) => {
    //   console.log(res.width, 'res');
    // });
    // const p1 = Promise.reject('123').catch((res) => {
    //   throw new Error('123');
    // });
    // p1.catch(res => {
    //   console.log(res);
    // });
    // console.log(p1, 'p1');
    // Promise.resolve().then(() => {
    //   console.log('1');
    //   throw new Error('errpr');
    // }).catch(() => {
    //   console.log('2');
    // }).catch(() => {
    //   console.log('3');
    // });
    // console.log('async start');
    // this.async1();
    // console.log('async end');

    // this.copy();

    // console.log('start');
    // const a = await 100;
    // console.log(a, 'a');
    // const b = await Promise.resolve(100);
    // console.log(b, 'b');
    // // eslint-disable-next-line prefer-promise-reject-errors
    // const c = await Promise.reject(100);
    // console.log(c, 'c');
    // console.log('end');
    //  const p1 = new newPromise((resolve,reject) => {
    //   // resolve(1);
    //   // reject('1');
    //  });

    //  console.log(p1,'p1');

    //  const p2 = new Promise((resolve,reject) => {
    //   resolve(1111);
    //   // reject('1');
    //  });
    //  console.log(p2,'p2');
    //  p2.then((res) => {
    //   console.log(res,'res');
    //  }).then(() => {
    //   console.log(1);
    //  });
    const obj = {
      a: 1,
      b: {
        c: 2,
        d: [
          { e: 1 }
        ]
      }
    };
    // console.log(this.deepClone(obj),'obj');
    // const obj2 = this.deepClone(obj);
    // obj2.b.d.e = '12121';
    // console.log('obj', obj);
    // console.log('obj2', obj2);

  },
  methods: {
    loadImge(src) {
      const p = new Promise((resolve, reject) => {
        const img = document.createElement('img');
        console.log('src');
        img.onload = () => {
          console.log('onload');
          resolve(img);
        };
        img.onerror = (err) => {
          reject(err);
        };
        img.src = src;

      });
      return p;
    },
    deepClone(obj = {}) {
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
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          result[key] = this.deepClone(obj[key]);
        }
      }
      return result;
    },
    copy() {
      if (Math.random() * 10 > 1) {
        this.copy = () => {
          console.log('1');
        };
      } else {
        this.copy = () => {
          console.log('2');
        };
      }
      this.copy();
    },
    async async1() {
      console.log('start async1');
      await this.async2();
      console.log('end async1');
    },
    async async2() {
      console.log('start async2');
    },
    loadImg() {
      const imgURL = "https://ydlunacommon-cdn.nosdn.127.net/9446f570a655917ad950fc7045014e41.jpg";
      const imgP = new Promise((resolve, reject) => {
        const img = document.createElement('img');
        img.src = imgURL;
        console.log('1');
        img.onload = () => {
          console.log('load');
          resolve(img);
        };
        img.onerror = () => {
          reject(new Error('error'));
        };
        console.log('2');
      });
      return imgP;
    }
  },
};
</script>

<style lang="less" scoped>
.box {
  width: 300px;
  height: 300px;
  padding: 10px;
  border: 1px solid #0f0;
  display: flex;
  justify-content: space-between;
  position: relative;

  .box-item {
    width: 80px;
    height: 80px;
    border-radius: 100px;
  }

  .box-item-1 {
    background: red;
  }

  .box-item-2 {
    background: yellow;
    align-self: center;
  }

  .box-item-3 {
    background: green;
    align-self: flex-end;
  }

  .absolute-item {
    width: 100px;
    height: 100px;
    background: red;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }

  .span-box {
    font-size: 20px;
    line-height: 200%;

    span {
      font-size: 16px;
      background: red;
    }
  }
}
</style>
