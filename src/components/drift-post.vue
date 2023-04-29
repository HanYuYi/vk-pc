<template>
  <canvas ref="canvasRef"></canvas>
</template>

<script>
export default {
  name: 'drift-post',
  props: {
    // 特效图片对象list
    baseBubbles: {
      type: Array,
      default: () => [
        require("../assets/login/fire1.png"),
        require("../assets/login/fire2.png"),
        require("../assets/login/fire3.png"),
        require("../assets/login/fire4.png"),
        require("../assets/login/fire5.png"),
        require("../assets/login/fire6.png"),
        require("../assets/login/fire7.png")
      ]
    },
    // 特效相对数量
    relativeNum: {
      type: Number,
      default: 5
    },
    // 特效飘落方向，目前只兼容上下两种，更多的自行扩展
    direction: {
      type: String,
      default: "to-top"
    },
    // 特效飘落速度
    speed: {
      type: Number,
      default: 0.2
    }
  },
  data() {
    return {
      canvas: null,
      ctx: null,
      time: 0,
      bubbles: []
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.canvas = this.$refs.canvasRef
      this.canvas.width = window.innerWidth
      this.canvas.height = window.innerHeight - 2
      this.ctx = this.canvas.getContext("2d")
      this.initData()
    })
  },
  methods: {
    //初始化 fire 数据
    initData() {
      const baseBubbles = this.baseBubbles.map(imgObj => this.loadImgFn(imgObj))

      let tempBubbles = []
      for (let i = 0;i < this.relativeNum;i++) {
        tempBubbles = tempBubbles.concat(baseBubbles)
      }
      for (let i = 0; i < tempBubbles.length; i++) {
        const dirObj = {
          "to-top": Number.parseFloat(`-${this.speed}`) - Math.random(),
          "to-bottom": this.speed + Math.random()
        }
        tempBubbles[i] = {
          imgU: tempBubbles[i],
          x: Math.random() * innerWidth,
          y: Math.random() * innerHeight,
          vx: 0.5 - Math.random(),
          vy: dirObj[this.direction]
        }
      }
      this.bubbles = tempBubbles
      this.loadAllImg()
    },
    // 装载图片
    loadAllImg() {
      const tempImg = [...this.bubbles].map(item => item.imgU)
      Promise.all( tempImg )
        .then(res => {
          for (let i = 0;i < res.length;i++) {
            this.bubbles[i].imgO = res[i]
          }
          this.loopFire()
        })
    },
    // 执行帧渲染
    loopFire() {
      this.time++
      this.canvas.width = innerWidth
      this.canvas.height = innerHeight
      this.bubbles.forEach(b => {
        b.x += b.vx
        b.y += b.vy
        this.limit(b)
        this.ctx.beginPath()
        this.ctx.drawImage(b.imgO, b.x, b.y, b.imgO.width, b.imgO.height)
      })
      requestAnimationFrame(this.loopFire)
    },
    // 溢出限制
    limit(d) {
      if (d.x < -d.imgO.width) d.x = innerWidth + d.imgO.width
      if (d.x > innerWidth + d.imgO.width) d.x = -d.imgO.width
      if (d.y < -d.imgO.height) d.y = innerHeight + d.imgO.height
      if (d.y > innerHeight + d.imgO.height) d.y = -d.imgO.height
    },
    // 图片预加载
    loadImgFn(url) {
      return new Promise((resolve, reject) => {
        const imgO = new Image()
        imgO.src = url
        imgO.onload = () => {
          resolve(imgO)
        }
        imgO.onerror = () => {
          reject(false)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
canvas {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>

