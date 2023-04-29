<template>
  <div class="wonderful-moments">
    <div class="video-box" :class="{'load-finish': pageIndex === 3}">
      <div class="actual-size">
        <video v-if="pageIndex === 3" ref="videoRef" playsinline controls preload :class="{brightness: !videoStatus}" poster="../../../assets/vkStyle/poster.jpg">
          <source src="/static/video/vk_style.mp4" type="video/mp4">
        </video>
        <div class="video-btn" :class="[videoStatus ? 'pause' : 'play']" @click="playPause"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'wonderfulMoments',
  props: ["pageIndex"],
  data() {
    return {
      videoStatus: 0,
      eventMountedList: [null, null]
    }
  },
  watch: {
    pageIndex(num) {
      if (num === 3) {
        this.videoHandler()
      } else {
        const myVideo = this.$refs.videoRef
        if (myVideo) {
          myVideo.removeEventListener("play", this.eventMountedList[0])
          myVideo.removeEventListener("pause", this.eventMountedList[1])
        }
      }
    }
  },
  methods: {
    // 播放、暂停控制
    playPause() {
      const myVideo = this.$refs.videoRef
      if (myVideo.paused) {
        this.videoStatus = 1
        myVideo.play()
      } else {
        this.videoStatus = 0
        myVideo.pause()
      }
    },
    // 事件执行器
    videoHandler() {
      this.$nextTick(() => {
        const myVideo = this.$refs.videoRef
        myVideo.addEventListener("play", this.eventMountedList[0] = () => {
          this.videoStatus = 1
        })
        myVideo.addEventListener("pause", this.eventMountedList[1] = () => {
          this.videoStatus = 0
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.wonderful-moments {
  width: 100%;
  height: 100%;
  background: url("../../../assets/vkStyle/wonderful_moments_bg.jpg") no-repeat;
  background-position: center center;
  overflow: hidden;

  .video-box {
    width: 5.409rem;
    height: 3.514rem;
    margin: 184px auto 0;
    background: url("../../../assets/vkStyle/video_box_bg.png");
    background-size: 100% 100%;
    overflow: hidden;
    opacity: 0;
    transform: scale(1.6,1.6);
    .actual-size {
      width: 4.528rem;
      height: 2.508rem;
      background: #000000;
      margin: 0.502rem 0 0 0.44rem;
      position: relative;
      &:hover {
        .video-btn {
          opacity: 1;
        }
      }
      video {
        max-width: 100%;
        max-height: 100%;
        width: 100%;
        &.brightness {
          filter: brightness(0.50);
        }
      }
      .video-btn {
        position: absolute;
        width: 168px;
        height: 77px;
        top: calc((100% - 77px) / 2);
        left: calc((100% - 168px) / 2);
        cursor: pointer;
        background: url("../../../assets/vkStyle/icon.png") no-repeat;
        opacity: 0;
        transition: opacity 0.5s;
        &.play {
          background-position: -10px -484px;
        }
        &.pause {
          background-position: -341px -484px;
        }
      }
    }
    &.load-finish {
      opacity: 1;
      transform: scale(1,1);
      transition: opacity 1s, transform 1s;
    }
  }
}
</style>
