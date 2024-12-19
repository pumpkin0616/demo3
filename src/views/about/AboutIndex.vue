<template>
  <div>
    <el-form :model="numberValidateForm2" ref="numberValidateForm1" label-width="100px" class="demo-ruleForm" inline>
      <el-form-item
        label="姓名"
        prop="name"
        :rules="[
          { required: true, message: '姓名不能为空'},
        ]"
      >
        <el-input v-model.number="numberValidateForm2.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="年龄"
        prop="age"
        :rules="[
          { required: true, message: '年龄不能为空'},
          { type: 'number', message: '年龄必须为数字值'}
        ]"
      >
        <el-input v-model.number="numberValidateForm2.age" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('numberValidateForm1')">提交</el-button>
        <el-button @click="resetForm('numberValidateForm1')">重置</el-button>
      </el-form-item>
  </el-form>

  <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      numberValidateForm2: {
        age: ''
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    };
  },
  methods: {
    submitForm (formName) {
      console.log(this.numberValidateForm2, 'formName');

        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm (formName) {
        this.$refs[formName].resetFields();
      }
  }
};
</script>

<style>

</style>
