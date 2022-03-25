<template>
  <div class="main">
    <div>
      <video class="origin-video" ref="video" autoplay loop muted src="./green.mp4" style="width:300px;"></video>
    </div>
    <canvas ref="before" width="720" height="1280"></canvas>
    <canvas ref="after" width="720" height="1280"></canvas>
    <button @click="start">开始</button>
  </div>
</template>

<script>
import { wipe } from '../service/greenWiper'
export default {
  name: "HelloWorld",
  data() {
    return {
    };
  },
  mounted() {
    this.beforeCtx = this.$refs.before.getContext('2d')
    this.afterCtx = this.$refs.after.getContext('2d')
  },
  methods: {
    async start (time) {
      if(!this.lastTime && typeof time === 'number'){
        this.lastTime = time
      }
      if(time - this.lastTime > 39){
        this.beforeCtx.drawImage(this.$refs.video,0,0)
        const wiped = await wipe(this.beforeCtx.getImageData(0,0,720,1280))
        this.afterCtx.putImageData(wiped,0,0) 
      }

      requestAnimationFrame(this.start)
    },
  },
};
</script>

<style scoped>
.origin-video {
  width: 500px;
}
canvas {
  border: 1px solid #000;
  width: 500px;
}
</style>
