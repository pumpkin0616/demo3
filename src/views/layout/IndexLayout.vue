<template>
  <div class="layout">
    <div class="left-nav">
      <LeftNav/>
    </div>
    <div class="right-content">
      <RightContent/>
    </div>
  </div>
</template>

<script>
import LeftNav from './component/LeftNav.vue';
import RightContent from './component/RightContent.vue';
export default {
  components: {
    LeftNav,
    RightContent
  }
};
</script>
<style lang="less">
.layout{
  display: flex;
  .left-nav{
    // width: 200px;
    background: #112f50;
    // position: fixed;
    // left: 0;
    // top: 0;
    // bottom: 0;
    height: 100vh;

  }
  .right-content{
    width: 100%;
    flex: 1;
  }
}
</style>
