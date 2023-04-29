<template>
  <div class="vir-course">

    <div class="video-box">
      <video v-if="showVideo" loop playsinline controls preload :poster="posterUrl">
        <source :src="videoUrl" type="video/mp4">
      </video>
    </div>

    <ul class="video-selector">
      <li v-for="(txt, index) in ['ERC&TRC', '如何购买', '如何充值', '提款&卖币']"
          :key="index"
          @click="selectIndex = index;checkoutVideo()"
          :class="{active: selectIndex === index}">
        {{ txt }}
      </li>
    </ul>

  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'virCourse',
  data() {
    return {
      selectIndex: 0,
      showVideo: false,
      videoUrl: '',
      posterUrl: '',
      timer: null
    }
  },
  computed: {
    ...mapState(['richpayInitData']),
  },
  mounted () {
    this.getRichpayData().then(() => {
      this.checkoutVideo()
    })
  },
  methods: {
    ...mapActions(["getRichpayData"]),
    checkoutVideo() {
      this.showVideo = false
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.videoUrl = this.richpayInitData.video[this.selectIndex]
        this.posterUrl = require('../../assets/virtualCoiCourse/video_'+ this.selectIndex +'_poster.png')
        this.showVideo = true
        clearTimeout(this.timer)
      }, 300)
    }
  }
}
</script>

<style lang="less" scoped>
.vir-course {
  width: 1262px;
  height: 628px;
  margin: 43px auto 0;
  background-image: url("../../assets/virtualCoiCourse/course_bg.png");
  display: flex;

  .video-box {
    width: 796px;
    height: 446px;
    border: solid 2px #88fee1;
    background-color: #020202;
    box-sizing: border-box;
    margin: 77px 29px 0 71px;
    text-align: center;
    overflow: hidden;
    video {
      width: 100%;
    }
  }

  .video-selector {
    margin-top: 72px;
    li {
      width: 326px;
      height: 94px;
      margin-bottom: 31px;
      background-image: url("../../assets/virtualCoiCourse/selector_btn_bg.png");
      font-size: 28px;
      font-weight: bold;
      line-height: 84px;
      text-align: center;
      color: #fff;
      cursor: pointer;
      &:hover, &.active {
        color: #001fd3;
        background-image: url("../../assets/virtualCoiCourse/selector_btn_bg_active.png");
      }
    }
  }
}
</style>
