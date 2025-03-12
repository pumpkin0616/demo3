<template>
  <div class="container">
    <div ref="box1" class="box box1"></div>
    <div class="resizer" @mousedown="startResize($event, 'box1', 'box2')"></div>
    <div ref="box2" class="box box2"></div>
    <div class="resizer" @mousedown="startResize($event, 'box2', 'box3')"></div>
    <div ref="box3" class="box box3"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isResizing: false,
      startX: 0,
      prevBox: null,
      nextBox: null,
      prevBoxWidth: 0,
      nextBoxWidth: 0,
    };
  },
  methods: {
    startResize (event, prev, next) {
      this.isResizing = true;
      this.startX = event.clientX;
      this.prevBox = this.$refs[prev];
      this.nextBox = this.$refs[next];

      this.prevBoxWidth = this.prevBox.offsetWidth;
      this.nextBoxWidth = this.nextBox.offsetWidth;

      document.addEventListener("mousemove", this.onMouseMove);
      document.addEventListener("mouseup", this.onMouseUp);
    },
    onMouseMove (event) {
      if (!this.isResizing) return;

      const moveX = event.clientX - this.startX;
      const newPrevWidth = this.prevBoxWidth + moveX;
      const newNextWidth = this.nextBoxWidth - moveX;

      if (newPrevWidth > 50 && newNextWidth > 50) {
        this.prevBox.style.width = `${newPrevWidth}px`;
        this.nextBox.style.width = `${newNextWidth}px`;
      }
    },
    onMouseUp () {
      console.log(1);
      this.isResizing = false;
      document.removeEventListener("mousemove", this.onMouseMove);
      document.removeEventListener("mouseup", this.onMouseUp);
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #f3f3f3;
}

.box {
  flex: 1;
  min-width: 50px;
  height: 100%;
  transition: width 0.1s;
}

.box1 { background: lightblue; }
.box2 { background: lightcoral; }
.box3 { background: lightgreen; }

.resizer {
  width: 5px;
  cursor: ew-resize;
  background-color: gray;
}
</style>
