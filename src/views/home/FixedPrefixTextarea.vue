<!-- <template>
  <el-input type="textarea" v-model="innerValue" :rows="rows" :placeholder="placeholder" ref="inputRef"
    @input="onInput" />
</template>

<script>
export default {
  name: 'FixedPrefixTextarea',
  props: {
    value: String,
    fixedPrefix: {
      type: String,
      default: ''
    },
    placeholder: String,
    rows: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      innerValue: this.value || this.fixedPrefix,
      previousValue: this.value || this.fixedPrefix
    };
  },
  methods: {
    onInput(val) {
      // 防止删除固定前缀
      if (!val.startsWith(this.fixedPrefix)) {
        this.innerValue = this.previousValue;
        this.$message({
          type: 'info',
          message: '不可修改或删除'
        });
      } else {
        this.innerValue = val;
        this.previousValue = val;
        this.$emit('input', val);
      }
    },
  }
};
</script> -->
<template>
  <el-input type="textarea" v-model="innerValue" :rows="rows" :placeholder="placeholder" ref="inputRef"
    @input="onInput" />
</template>

<script>
import { Message } from 'element-ui';

export default {
  name: 'FixedPrefixTextarea',
  props: {
    value: String,
    fixedPrefix: {
      type: String,
      default: ''
    },
    fixedSuffix: {
      type: String,
      default: ''
    },
    placeholder: String,
    rows: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      innerValue: this.value || (this.fixedPrefix + this.fixedSuffix),
      previousValue: this.value || (this.fixedPrefix + this.fixedSuffix)
    };
  },
  created() {
    console.log(this.value, 'value');
  },
  watch: {
    // value(val) {
    //   if (val !== this.innerValue) {
    //     this.innerValue = val;
    //     this.previousValue = val;
    //   }
    // }
  },
  methods: {
    onInput(val) {
      const hasValidPrefix = val.startsWith(this.fixedPrefix);
      const hasValidSuffix = val.endsWith(this.fixedSuffix);
      console.log(hasValidSuffix, this.fixedSuffix, 'hasValidSuffix');
      if (!hasValidPrefix || !hasValidSuffix) {
        this.innerValue = this.previousValue;
        Message({
          type: 'info',
          message: '禁止修改固定前缀或后缀'
        });
        // this.$nextTick(() => {
        //   this.correctCursor();
        // });
      } else {
        this.innerValue = val;
        this.previousValue = val;
        this.$emit('input', val);
      }
    },
    // onFocus() {
    //   this.$nextTick(() => {
    //     this.correctCursor();
    //   });
    // },
    // correctCursor() {
    //   const textarea = this.$refs.inputRef?.$el.querySelector('textarea');
    //   if (!textarea) return;

    //   const prefixLen = this.fixedPrefix.length;
    //   const suffixStart = this.innerValue.length - this.fixedSuffix.length;

    //   const { selectionStart, selectionEnd } = textarea;

    //   // 如果光标在 prefix 前面或 suffix 后面，拉回到 prefix 后、suffix 前
    //   if (selectionStart < prefixLen || selectionStart > suffixStart || selectionEnd < prefixLen || selectionEnd > suffixStart) {
    //     textarea.setSelectionRange(prefixLen, suffixStart);
    //   }
    // }
  }
};
</script>