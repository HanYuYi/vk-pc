<template>
  <div class="sponsor">

    <div class="swiper-parent" :class="[{'left-bright': leftBright}, {'right-bright': rightBright}, {'load-finish': pageIndex === 0}]">
      <div v-if="reRender" class="preserve">
        <swiper class="sponsor-swiper" :options="mySwiperOptions">
          <swiper-slide v-for="(image, index) in sponsorList"
                        :key="index"
                        :style="{backgroundImage: `url(${image})`}"/>
        </swiper>

        <!-- 左右箭头-->
        <div class="swiper-button-prev"
             slot="button-prev"
             @mouseenter="leftBright = true"
             @mouseleave="leftBright = false"></div>
        <div class="swiper-button-next"
             slot="button-next"
             @mouseenter="rightBright = true"
             @mouseleave="rightBright = false"></div>

        <!-- 左右暂时图片的块-->
        <div class="prev-block"
             @mouseenter="leftBright = true"
             @mouseleave="leftBright = false"
             @click="slideSwitch(0)">
          <img :src="prevNumImg" alt="">
          <!-- 不展示左边的数字和prev英文 -->
          <!-- <div class="index"><hr><b>{{ prevNum }}</b></div>
          <div class="eng-index">PREV</div> -->
        </div>
        <div class="next-block"
             @mouseenter="rightBright = true"
             @mouseleave="rightBright = false"
             @click="slideSwitch(1)">
          <img :src="nextNumImg" alt="">
          <!-- 当前的图片索引展示 -->
          <div class="index" style="opacity:0"><b>{{ swiperIndex > sponsorList.length ? 1 : swiperIndex }}</b><hr></div>
          <!-- 下一张图片的索引 -->
          <!-- <div class="index"><b>{{ nextNum }}</b><hr></div> -->
          <div class="eng-index">NEXT</div>
        </div>

        <div class="pagination-box">
          <hr>
          <div class="sponsor-swiper-pagination"></div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

const swiperEl = document.getElementsByClassName("sponsor-swiper")

export default {
  name: 'sponsor',
  props: ["pageIndex"],
  components: { Swiper, SwiperSlide },
  data() {
    return {
      swiperIndex: 0,
      sponsorList: [
        require("../../../assets/vkStyle/sponsor_1.jpg"),
        require("../../../assets/vkStyle/sponsor_2.jpg"),
        require("../../../assets/vkStyle/sponsor_3.jpg"),
        require("../../../assets/vkStyle/sponsor_4.jpg"),
        require("../../../assets/vkStyle/sponsor_5.jpg"),
        require("../../../assets/vkStyle/sponsor_6.jpg")
      ],
      mySwiperOptions: {
        loop: true,
        autoplay: { delay: 4000, disableOnInteraction: false },
        grabCursor : true,
        pagination: { el: '.sponsor-swiper-pagination', clickable: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        on: {
          slideChange: () => {
            this.swiperIndex = swiperEl[0].swiper.activeIndex
          }
        }
      },
      leftBright: false,
      rightBright: false,
      reRender: true,
      reRenderTimer: null
    }
  },
  computed: {
    // loop 模式下需要计算 swiper 的 index
    prevNum() {
      if (this.swiperIndex === 1) {
        return this.sponsorList.length
      }
      if (this.swiperIndex === 0) {
        return this.sponsorList.length - 1
      }
      if (this.swiperIndex === this.sponsorList.length) {
        return this.sponsorList.length - 1
      }
      if ((this.swiperIndex - this.sponsorList.length) >= 0) {
        return this.sponsorList.length
      }
      return this.swiperIndex - 1
    },
    prevNumImg() {
      return require(`../../../assets/vkStyle/sponsor_${this.prevNum}.jpg`)
    },
    nextNumImg() {
      return require(`../../../assets/vkStyle/sponsor_${this.nextNum}.jpg`)
    },
    // loop 模式下需要计算 swiper 的 index
    nextNum() {
      if ((this.swiperIndex - this.sponsorList.length) > 0) {
        return 2
      }
      if ((this.swiperIndex - this.sponsorList.length) === 0) {
        return 1
      }
      return this.swiperIndex + 1
    }
  },
  mounted () {
    window.addEventListener("resize", () => {
      clearTimeout(this.reRenderTimer)
      this.reRender = false
      this.reRenderTimer = setTimeout(() => {
        this.reRender = true
        clearTimeout(this.reRenderTimer)
      }, 100)
    })
  },
  methods: {
    // 在loop模式下精确获取index
    slideSwitch(dir) {
      if (dir) {
        swiperEl[0].swiper.slideNext()
      } else {
        swiperEl[0].swiper.slidePrev()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.sponsor {
  width: 100%;
  height: 100%;
  background: url("../../../assets/vkStyle/sponsor_bg.jpg") no-repeat;
  background-position: center center;
  overflow: hidden;
  perspective: 1500px;
  .swiper-parent {
    border-top: 0.1px solid transparent;
    width: 4.759rem;
    margin: 264px auto 0;
    position: relative;
    transform-style: preserve-3d;
    &:before, &:after {
      position: absolute;
      z-index: 2;
      top: 0;
      content: "";
      width: 17px;
      height: 2.464rem;
      background: url("../../../assets/vkStyle/icon.png") no-repeat;
      opacity: 0.5;
      transition: opacity 0.3s;
    }
    &:before {
      left: 0;
      background-image: url("../../../assets/vkStyle/swiper_parent_l.png");
      background-size: 100% 100%;
    }
    &:after {
      right: 0;
      background-image: url("../../../assets/vkStyle/swiper_parent_r.png");
      background-size: 100% 100%;
    }

    .preserve {
      opacity: 0;
      transform: rotateX(90deg);
      transform-origin: bottom;
      .sponsor-swiper {
        width: 4.315rem;
        height: 2.464rem;
        position: relative;
        .swiper-slide {
          background-size: 100% 100%;
        }
      }

      .swiper-button-prev, .swiper-button-next {
        width: 163px;
        height: 54px;
        background: url("../../../assets/vkStyle/icon.png") no-repeat;
        margin-top: -46px;
        transition: transform 0.3s;
        &:before, &:after {
          display: none;
        }
      }
      .swiper-button-prev {
        left: -163px;
        background-position: -10px -230px;
      }
      .swiper-button-next {
        right: -163px;
        background-position: -10px -313px;
      }
      .prev-block, .next-block {
        position: absolute;
        z-index: 1;
        bottom: 41px;
        width: 1.169rem;
        height: 0.729rem;
        cursor: pointer;
        background-position: 0 0.423rem;
        background-repeat: no-repeat;
        img {
          height: 0.542rem;
          position: absolute;
          top: 0;
          left: 0;
          pointer-events: none;
          opacity: 0.6;
        }
        .index {
          margin-top: 0.323rem;
          width: 0.726rem;
          display: flex;
          justify-content: space-between;
          position: relative;
          z-index: 1;
          hr {
            margin-top: 0.133rem;
            display: inline-block;
            width: 0.301rem;
            height: 1px;
            border: 0;
            background-color: #07f1b7;
          }
          b {
            font-family: YouSheBiaoTiHei;
            font-size: 0.444rem;
            line-height: 0.275rem;
            color: #07f1b7;
          }
        }
        .eng-index {
          font-size: 0.16rem;
          line-height: 0.097rem;
          font-family: YouSheBiaoTiHei;
          color: #ffffff;
          opacity: 0.4;
          transition: opacity 0.3s;
        }
      }
      .prev-block {
        left: -0.951rem;
        background-image: url("../../../assets/vkStyle/prev_block.png");
        background-size: 100% auto;
        img {
          left: auto;
          right: 0;
        }
        .index {
          margin-left: 0.235rem;
        }
        .eng-index {
          text-align: left;
          margin-left: 0.275rem;
        }
      }
      .next-block {
        right: -0.951rem;
        background-image: url("../../../assets/vkStyle/next_block.png");
        background-size: 100% auto;
        .index {
          margin-left: 0.2rem;
        }
        .eng-index {
          text-align: right;
          margin-right: 0.298rem;
        }
      }
      .pagination-box {
        width: 4.315rem;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        margin-top: 0.111rem;
        hr {
          flex: 1;
          height: 0.008rem;
          background-color: #fff;
          border: 0;
          margin-top: 0.044rem;
        }
        .sponsor-swiper-pagination {
          display: inline-block;
          text-align: right;
          height: 18px;
          margin-left: 0.071rem;

          /deep/ .swiper-pagination-bullet {
            width: 18px;
            height: 18px;
            border-radius: 0;
            background: transparent;
            opacity: 1;
            position: relative;
            border: 1px solid transparent;
            box-sizing: border-box;
            margin: 0 0.055rem;

            &:before {
              position: absolute;
              content: "";
              top: 4px;
              left: 4px;
              width: 8px;
              height: 8px;
              background: #ffffff;
            }

            &.swiper-pagination-bullet-active {
              border-color: #07f1b7;

              &:before {
                background: #07f1b7;
              }
            }

            &:last-child {
              margin: 0 0 0 0.055rem;
            }
          }
        }
      }
    }

    &.load-finish {
      .preserve {
        transform: rotateX(0deg);
        opacity: 1;
        transition: opacity 0.8s, transform 0.8s;
      }
    }

    &.left-bright {
      &:before {
        opacity: 1;
      }
      .swiper-button-prev {
        transform: translateX(-10px);
      }
      .prev-block {
        .eng-index {
          opacity: 1;
        }
      }
    }
    &.right-bright {
      &:after {
        opacity: 1;
      }
      .swiper-button-next {
        transform: translateX(10px);
      }
      .next-block {
        .eng-index {
          opacity: 1;
        }
      }
    }
  }
}
</style>
