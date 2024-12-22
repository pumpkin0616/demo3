<template>
  <div class="login-wrapper">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="login-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input
          type="username"
          v-model="ruleForm.username"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" class="login-btn">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import Cookie from 'js-cookie';

export default {
  data () {
    const validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          callback();
        }
      };
    const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
    return {
      ruleForm: {
        username: '',
        password: ''
      },

      rules: {
          username: [
            { validator: validateName, trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
        }
    };
  },
  methods: {
    ...mapMutations('login', ['SET_USERINFO']),

    login () {
     return new Promise((resolve) => {
        setTimeout(() => {
          if (this.ruleForm?.username && this.ruleForm?.password === '123') {
            resolve({
              code: 200,
              data: {
                username: this?.ruleForm?.username,
                token: 'myToken'
              },
              msg: 'success'
            });
          } else {
            resolve({
            code: 102,
            data: {},
            msg: '用户名或密码不正确'
          });
          }
        }, 100);
      });
    },
    async submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
          if (valid) {
            const { code, data, msg } = await this.login();
            if (code === 200) {
              this.SET_USERINFO(data);
              Cookie.set('username', data.username);
              Cookie.set('token', data.token);
              this.$message.success('登录成功');
              // this.$router.push('/');
              const redirect = this.$route.query.redirect || '/';
              this.$router.push(redirect);
            } else {
              this.$message.info(msg);
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
  },
};
</script>
<style lang="less" scoped>
.login-wrapper {
  background: rgb(242, 242, 242);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .login-ruleForm{
    width: 400px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 12px 40px 0px;
    background: #ffffff;
    padding: 30px;
    border-radius: 16px;
    /deep/ .el-form-item__label{
      color: rgb(96, 150, 255);
    }
  }
  .login-btn{
    width: 100%;
  }
}
</style>
