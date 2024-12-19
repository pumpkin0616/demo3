<template>
  <div>
    <HeaderTop></HeaderTop>
    <router-view></router-view>
  </div>
</template>

<script>
import HeaderTop from './HeaderTop.vue';
export default {
  components: {
    HeaderTop
  }
};
</script>
<style></style>
