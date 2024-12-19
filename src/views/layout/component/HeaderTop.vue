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
  </div>
</template>

<script>
   import { mapMutations, mapGetters } from 'vuex';
export default {

  data () {
    return {
    };
  },
  computed: {
    ...mapGetters(['menuIsOpen']),

  },
  methods: {
    ...mapMutations([
          'UPDATE_DATA'
      ]),
    changeMenuOpenStatus (flag) {
      console.log(flag, 'flag');
      // this.$store.commit('updateState',{
      //   key:'menuIsOpen',
      //   value:flag
      // })
      this.UPDATE_DATA({
        key: 'menuIsOpen',
        value: flag
      });
    },
  },
};
</script>
<style lang="less">
.header-wrapper {
  background-color: sandybrown;
  height: 50px;
  width: 100%;
  .toggle-icon-wrapper {
    .iconfont {
      font-size: 26px;
      color: #fff;
    }
  }
}
</style>
