<template>
  <div class="activity-site" :class="{'load-finish': pageIndex === 4}">

    <div class="site-center">

      <div v-if="reRender" class="preserve">
        <div class="swiper-parent">
          <swiper class="site-swiper" :options="mySwiperOptions">
            <swiper-slide v-for="(imgObj, index) in activitySiteList" :key="index" :style="{backgroundImage: `url(${imgObj})`}"/>
          </swiper>
        </div>

        <div class="swiper-button-prev site-swiper-prev" slot="button-prev"></div>
        <div class="swiper-button-next site-swiper-next" slot="button-next"></div>

        <div class="pagination-box">
          <hr>
          <div class="site-swiper-pagination"></div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  name: 'activitySite',
  props: ["pageIndex"],
  components: { Swiper, SwiperSlide },
  data() {
    return {
      mySwiperOptions: {
        loop : true,
        autoplay: { delay: 3000, disableOnInteraction: false },
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
          rotate: 0,
          stretch: 180,
          depth: 400,
          modifier: 1,
          slideShadows: false,
        },
        navigation: { nextEl: '.site-swiper-next', prevEl: '.site-swiper-prev' },
        pagination: { el: ".site-swiper-pagination", clickable: true }
      },
      activitySiteList: [
        require("../../../assets/vkStyle/activity_site_1.jpg"),
        require("../../../assets/vkStyle/activity_site_2.jpg"),
        require("../../../assets/vkStyle/activity_site_3.jpg"),
        require("../../../assets/vkStyle/activity_site_4.jpg"),
        require("../../../assets/vkStyle/activity_site_5.jpg"),
        require("../../../assets/vkStyle/activity_site_6.jpg"),
        require("../../../assets/vkStyle/activity_site_7.jpg")
      ],
      reRender: true,
      reRenderTimer: null
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
  }
}
</script>

<style lang="less" scoped>
.activity-site {
  width: 100%;
  height: 100%;
  background: url("../../../assets/vkStyle/activity_site_bg.jpg") no-repeat;
  background-position: center center;
  display: flex;
  justify-content: center;
  overflow: hidden;
  perspective: 2000px;
  .site-center {
    width: 6.3rem;
    height: 2.6rem;
    margin-top: 264px;
    position: relative;
    transform-style: preserve-3d;

    .preserve {
      width: inherit;
      height: inherit;
      opacity: 0;
      transform: rotateX(70deg) scale(0.3, 0.3) translateY(-1000px);

      .swiper-parent {
        width: 5.9rem;
        height: inherit;
        margin: 0 auto;
        overflow: hidden;
        position: relative;
        &:before, &:after {
          position: absolute;
          z-index: 2;
          top: 0;
          content: "";
          width: 3px;
          height: 2.464rem;
          background: url("../../../assets/vkStyle/img_box_be.png") no-repeat;
          background-size: 100% 100%;
        }
        &:before {
          left: 50%;
          transform: translateX(-2.2rem);
        }
        &:after {
          right: 50%;
          transform: translateX(2.2rem);
        }
        .site-swiper {
          // width: 2.878rem;
          // height: 1.645rem;
          width: 4.315rem;
          height: 2.464rem;
          overflow: visible;
          .swiper-slide {
            filter: brightness(0.30);
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
            &.swiper-slide-active {
              filter: brightness(1);
            }
          }
        }
      }
      .site-swiper-prev, .site-swiper-next {
        width: 25px;
        height: 54px;
        top: calc((2.464rem - 54px) / 2);
        background: url("../../../assets/vkStyle/icon.png") no-repeat;
        transition: transform 0.3s;
        &:after {
          display: none;
        }
      }
      .site-swiper-prev {
        left: -10px;
        background-position: -213px -496px;
        &:hover {
          transform: translateX(-5px);
        }
      }
      .site-swiper-next {
        right: -10px;
        background-position: -272px -496px;
        &:hover {
          transform: translateX(5px);
        }
      }
      .pagination-box {
        width: 2.878rem;
        margin: 0 auto;
        display: flex;
        justify-content: center;

        hr {
          flex: 1;
          height: 0.008rem;
          background-color: #fff;
          border: 0;
        }

        .site-swiper-pagination {
          display: inline-block;
          margin: -10px auto 0 10px;
          text-align: right;

          /deep/ .swiper-pagination-bullet {
            width: 18px;
            height: 18px;
            border-radius: 0;
            background: transparent;
            opacity: 1;
            position: relative;
            border: 1px solid transparent;
            box-sizing: border-box;
            margin: 0 9px;

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
              margin: 0 0 0 9px;
            }
          }
        }
      }
    }

  }
  &.load-finish {
    .site-center {
      .preserve {
        opacity: 1;
        transition: opacity 1.5s, transform 1.5s;
        transform: rotateX(0deg) scale(1, 1) translateY(0px);
      }
    }
  }
}
</style>
