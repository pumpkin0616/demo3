<template>
  <div>
    <!-- <el-input type="textarea" v-model="inputValue" :rows="5" @input="handleInput" @focus="handleFocus"
      placeholder="请输入内容" ref="inputRef" /> -->
    <!-- <FixedPrefixTextarea v-model="inputValue" :fixedPrefix="fixedPrefix" placeholder="请输入内容" :rows="5" />
    <div class="text-display">{{ inputValue }}</div> -->
    <!-- <FixedPrefixTextarea v-model="inputValue1" :fixedPrefix="fixedPrefix1" placeholder="请输入内容" :rows="5" />
    <div class="text-display">{{ inputValue1 }}</div> -->
    <!-- <div v-for="(item, index) in arr" :key="index">
      <el-input type="textarea" v-model="item.a" placeholder="请输入内容" />
      <el-input type="textarea" v-model="item.b" placeholder="请输入内容" />
    </div>
    <el-button @click="handleClick">tijiao</el-button> -->
    <!-- <div v-for="(item, index) in '我是谁'" :key="index">
      {{ item }}
    </div> -->
    <!-- <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <FixedPrefixTextarea v-model="inputValue" :fixedPrefix="fixedPrefix" :fixedSuffix="fixedSuffix"
        placeholder="请输入中间内容" />
    </el-form>

    <div class="text-display">{{ inputValue }}</div>
    <form action="/submit" method="post" enctype="application/x-www-form-urlencoded">
      <input name="name" value="Tom" />
      <button type="submit">提交</button>
    </form> -->

    <child-form v-model="formData" />
  </div>
</template>

<script>
import FixedPrefixTextarea from './FixedPrefixTextarea.vue';
import ChildForm from './ChildForm.vue';
export default {
  data() {
    return {
      formData: {
        comment: '1232323232',
        age: 1
      },
      fixedPrefix: '由于以下原因：\n',
      inputValue: '由于以下原因：\n \n以下甄别结果进行了修改',
      fixedSuffix: '以下甄别结果进行了修改',
      arr: [
        { a: '1', b: '2' },
        { a: '2' }
      ],
      cloneArr: [],
      ruleForm: {
        inputValue: '由于以下原因：\n \n以下甄别结果进行了修改'
      }
    };
  },
  components: {
    FixedPrefixTextarea,
    ChildForm
  },
  created() {
    // window.open('/api/我是谁.doc');

    this.cloneArr = [
      { a: '1', b: '2' },
      { a: '2' }
    ];
  },
  methods: {
    // handleInput(val) {
    //   if (!val.startsWith(this.fixedPrefix)) {
    //     // 只保留用户输入部分
    //     val = this.fixedPrefix + val.slice(this.fixedPrefix.length);
    //   }
    //   this.inputValue = val;

    //   this.$nextTick(() => {
    //     this.correctCursor();
    //   });
    // },
    // handleFocus() {
    //   this.$nextTick(() => {
    //     this.correctCursor();
    //   });
    // },
    // correctCursor() {
    //   const textarea = this.$refs.inputRef?.$el.querySelector('textarea');
    //   if (!textarea) return;

    //   const fixedLength = this.fixedPrefix.length;

    //   // 如果光标跑到了固定内容前面，就拉回到固定内容后
    //   const { selectionStart, selectionEnd } = textarea;
    //   if (selectionStart < fixedLength || selectionEnd < fixedLength) {
    //     textarea.setSelectionRange(fixedLength, fixedLength);
    //   }
    // },


    diffArrays(oldArr, newArr) {
      const changes = [];

      const length = Math.max(oldArr.length, newArr.length);

      Array.from({ length }).forEach((_, i) => {
        const oldItem = oldArr[i] || {};
        const newItem = newArr[i] || {};

        const keys = new Set([...Object.keys(oldItem), ...Object.keys(newItem)]);
        keys.forEach(key => {
          if (oldItem[key] !== newItem[key]) {
            changes.push({
              index: i,
              key,
              oldValue: oldItem[key],
              newValue: newItem[key]
            });
          }
        });
      });

      return changes;
    },
    handleClick() {
      // console.log(this.tracker.getLogs());
      console.log(this.diffArrays(this.cloneArr, this.arr));
    }
  },
};
</script>

<style>
.text-display {
  white-space: pre-line;
}
</style>
