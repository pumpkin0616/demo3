<template>
  <el-form :model="localModel" label-width="60px">
    <el-form-item label="评论">
      <el-input v-model="localModel.comment" />
    </el-form-item>
    <el-form-item label="年龄">
      <el-input-number v-model="localModel.age" :min="0" />
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'FormEditor',
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      localModel: { ...this.value },
      isInternalUpdate: false
    };
  },
  watch: {
    value: {
      handler(newVal) {
        if (this.isInternalUpdate) {
          this.isInternalUpdate = false;
          return;
        }
        this.localModel = { ...newVal };
      },
      deep: true
    },
    localModel: {
      handler(newVal) {
        this.isInternalUpdate = true;
        this.$emit('input', { ...newVal });
      },
      deep: true
    }
  }
};
</script>