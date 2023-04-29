<template>
  <div class="red-packet" :class="[customClass]">
    <slot></slot>
    <div id="redPacket"></div>
  </div>
</template>

<script>
export default {
  name: "red-packet",
  props: {
    num: {
      type: Number,
      default: 15
    },
    imgObj: {
      type: String,
      required: true
    },
    customClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      visible: false,
      w: 0,
      h: 0,
      containerEl: null,
      redPacketInfoList: []
    }
  },
  mounted () {
    document.body.appendChild(this.$el)
    this.w = window.innerWidth - 225.6
    this.h = window.innerHeight
    this.createRedPacket(this.num)
  },
  methods: {
    /**
     * 创建红包雨，并移动
     * @param num
     */
    createRedPacket(num) {
      this.containerEl = document.getElementById("redPacket")
      const sizes = ["small", "medium", "large"]
      const sizesNumList = [{w: 112.8, h: 149.6}, {w: 169.2, h: 225}, {w: 225.6, h: 300}]
      const sinw = this.w / num

      for (let i = 0; i < num; i++) {
        const redPacketEl = document.createElement("div")
        redPacketEl.style.backgroundImage = `url(${this.imgObj})`
        const sizeIndex = Math.ceil(Math.random() * 3) - 1
        const size = sizes[sizeIndex]
        this.redPacketInfoList.push(sizesNumList[sizeIndex])
        TweenMax.set(redPacketEl, {
          attr: { class: `round-${size}` },
          x: i * sinw + 50 ,
          y: (Math.random() * -42) - 283
        })

        this.containerEl.appendChild(redPacketEl)
        const currentRedPacket = TweenMax.to(redPacketEl, Math.random() * 5 + 5, {
          y: this.h + 100,
          ease: Linear.easeNone,
          repeat: -1,
          delay: -15
        })

        redPacketEl.onclick = () => {
          this.clickedRedPacket(currentRedPacket, redPacketEl, size)
          this.removeOtherRedPacket(i)
          this.$emit("clickFn")
        }
      }
    },

    /**
     * 被点击的红包
     * @param tweenMaxEl
     * @param el
     * @param elSize
     */
    clickedRedPacket(tweenMaxEl, el, elSize) {
      tweenMaxEl.pause()
      const sizeObj = {
        large: {w: 225.6, h: 300},
        medium: {w: 169.2, h: 225},
        small: {w: 112.8, h: 149.6},
      }
      TweenMax.to(el, 0.3, {
        x: (this.w + 225.6 - sizeObj[elSize].w) / 2,
        y: (this.h - sizeObj[elSize].h) / 2,
        ease: Linear.easeNone
      })

      TweenMax.from(el, 0.4, {scale: 1.2, repeat: -1, yoyo: true, delay: 0.4})
    },

    /**
     * 删除没被点击的红包
     * @param index
     */
    removeOtherRedPacket(index) {
      for (let i = this.containerEl.childNodes.length - 1; i >= 0; i--) {
        if (i !== index) {
          this.containerEl.removeChild(this.containerEl.childNodes[i])
        }
      }
    }
  },
}
</script>

<style lang="less" scoped>
.red-packet {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2016;
  background-color: rgba(0, 0, 0, 0.7);
  #redPacket {
    /deep/ .round-small, /deep/ .round-medium, /deep/ .round-large {
      background-repeat: no-repeat;
      background-size: 100% 100%;
      position: absolute;
      width: 241px;
      height: 283px;
      cursor: pointer;
      pointer-events: all;
    }

    /deep/ .round-medium {
      width: 212px;
      height: 250px;
    }

    /deep/ .round-small {
      width: 195px;
      height: 230px;
    }
  }
}
</style>
