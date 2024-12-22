<template>
  <div>
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#112f50"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="menuIsOpen"
      router
    >
      <el-menu-item index="/">首页</el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>我的</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/about">关于</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/product/list">商品列表</el-menu-item>
          <el-menu-item index="/product/detail">商品详情</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/user/list">用户列表</el-menu-item>
          <el-menu-item index="/user/detail">用户详情</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <!-- <el-menu-item index="4">
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item> -->
    </el-menu>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
export default {
  data () {
    return {
      // isCollapse: false,
    };
  },
  computed: {
    // isCollapse () {
    //   return this.$store.state.menuIsOpen;
    // }
    // ...mapGetters(['menuIsOpen']),
    ...mapState('home', ['menuIsOpen'])
  },
  mounted () {
    console.log(this.$route.path);
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.el-menu {
  border: none;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
