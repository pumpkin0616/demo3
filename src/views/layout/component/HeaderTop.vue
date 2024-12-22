<template>
  <div class="header-wrapper">
    <div class="toggle-icon-wrapper">
      <!-- 展开时展示 -->
      <i
        class="iconfont icon-zhedie1"
        v-if="!menuIsOpen"
        @click="()=>changeMenuOpenStatus(true)"
      ></i>
      <!-- 折叠时展示 -->
      <i class="iconfont icon-zhedie2" @click="()=>changeMenuOpenStatus(false)" v-else></i>
    </div>
    <div>
      <span class="username">{{ userInfo?.username }}</span>
      <span class="log-out" @click="logOut">log out</span>
    </div>
  </div>
</template>

<script>
   import Cookies from 'js-cookie';
    import { mapMutations, mapState } from 'vuex';
    export default {
      data () {
        return {
        };
      },
      computed: {
        ...mapState('login', ['userInfo']),
        ...mapState('home', ['menuIsOpen']),
      },
      methods: {
        ...mapMutations('home', [
              'UPDATE_DATA'
          ]),
          ...mapMutations('login', [
              'REMOVE_USERINFO'
          ]),
        changeMenuOpenStatus (flag) {
          this.UPDATE_DATA({
            key: 'menuIsOpen',
            value: flag
          });
        },
        logOut () {
          // 跳转到登录页，同时传递当前路径作为 redirect 参数
          this.$router.push({ name: 'login', query: { redirect: this.$route.fullPath } });
          Cookies.set('username', '');
          Cookies.set('token', '');
          this.REMOVE_USERINFO();
        }
      },
    };
</script>
<style lang="less">
.header-wrapper {
  background-color: sandybrown;
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .toggle-icon-wrapper {
    .iconfont {
      font-size: 26px;
      color: #fff;
    }
  }
  .username{
    color: #fff;
    margin-right: 30px;
  }
  .log-out{
    color: #fff;
    margin-right: 30px;
    cursor: pointer;
  }
}
</style>
