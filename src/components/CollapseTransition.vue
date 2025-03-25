<template>
  <transition
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
  >
    <div class="collapse-transition" :style="style">
      <slot />
    </div>
  </transition>
</template>

<script>
export default {
  name: "CollapseTransition",
  props: {
    isOpen: { // 父组件控制展开状态
      type: Boolean,
      default: true
    },
    minHeight: {
      type: String,
      default: "30px" // 折叠时的最小高度
    },
    maxHeight: {
      type: String,
      default: "1000px" // 展开时的最大高度
    }
  },
  data () {
    return {
      style: {
        maxHeight: '0', // 默认折叠时高度
        overflow: 'hidden', // 折叠时隐藏内容
        transition: 'max-height 0.3s ease' // 设置 max-height 的过渡动画
      }
    };
  },
  watch: {
    isOpen (newVal) {
      this.updateHeight(newVal); // 监听 isOpen 变化来更新高度
    }
  },
  methods: {
    beforeEnter () {
      this.style.maxHeight = '0'; // 进入前，折叠到最小高度
      this.style.overflow = "hidden"; // 防止折叠时出现滚动条
    },
    enter () {
      this.style.maxHeight = this.maxHeight; // 展开时设置为最大高度
      this.style.overflow = 'auto'; // 允许内容溢出并滚动
    },
    afterEnter () {
      this.style.maxHeight = 'none'; // 展开完成后，允许自动填充空间
      this.style.overflow = 'auto'; // 保持滚动
    },
    beforeLeave () {
      this.style.maxHeight = this.maxHeight; // 离开前，保持最大高度
      this.style.overflow = 'hidden'; // 防止动画过程中出现滚动条
    },
    leave () {
      this.style.maxHeight = '0'; // 离开时，折叠到最小高度
      this.style.overflow = 'hidden'; // 防止内容溢出
    },
    afterLeave () {
      this.style.maxHeight = '0'; // 保持折叠状态
      this.style.overflow = 'hidden'; // 隐藏溢出
    },
    updateHeight (isOpen) {
      if (isOpen) {
        this.style.maxHeight = this.maxHeight; // 展开时使用最大高度
      } else {
        this.style.maxHeight = '0'; // 折叠时使用最小高度
      }
    }
  }
};
</script>

<style scoped>
.collapse-transition {
  border: 1px solid #ccc;
  padding: 10px;
  background: lightblue;
  overflow: hidden; /* 关闭溢出，保证不会影响动画 */
}
</style>
