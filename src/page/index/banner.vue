<template>
  <div class="banner" @mouseenter="isHover = true" @mouseleave="isHover = false">

    <swiper v-if="showBanner" class="home-swiper" :options="mySwiperOptions">
      <swiper-slide v-for="(item, index) in imgData"
                    :key="index"
                    :data-background="item.image_path"
                    class="swiper-lazy">
        <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
        <router-link v-if="item.url && item.url.length"
                     :to="item.url"/>
      </swiper-slide>

      <div class="swiper-button-prev home-swiper-prev" slot="button-prev"></div>
      <div class="swiper-button-next home-swiper-next" slot="button-next"></div>

    </swiper>

    <div class="home-swiper-pagination"></div>

  </div>

</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

const swiperEl = document.getElementsByClassName("home-swiper")

export default {
  name: 'banner',
  components: { Swiper, SwiperSlide },
  props: ["imgData"],
  data() {
    return {
      isHover: false,
      mySwiperOptions: {
        initialSlide :0,
        speed: 800,
        loop: true,
        autoplay: { delay: 3000, disableOnInteraction: false },
        grabCursor: true,
        navigation: { nextEl: '.home-swiper-next', prevEl: '.home-swiper-prev' },
        pagination: { el: '.home-swiper-pagination', clickable: true },
        lazy: {
          loadPrevNext: true
        }
      },
    }
  },
  watch: {
    isHover(bool) {
      if (swiperEl[0]) {
        bool ? swiperEl[0].swiper.autoplay.stop() : swiperEl[0].swiper.autoplay.start()
      }
    }
  },
  computed: {
    showBanner() {
      return this.imgData && this.imgData.length
    }
  }
}
</script>

<style lang="less" scoped>
.banner {
  position: relative;
  height: 630px;

  .home-swiper {
    width: 100%;
    height: inherit;

    .swiper-slide {
      background-repeat: no-repeat;
      background-position: center top;

      .swiper-lazy-preloader {
        width: 64px;
        height: 64px;
        background: url("../../assets/btn-loader.gif") no-repeat center;
        background-size: 100%;
        border: 0;
        animation: none;
        margin-left: -32px;
        margin-top: -32px;
      }
      a {
        display: block;
        width: inherit;
        height: inherit;
      }
    }

    .home-swiper-prev, .home-swiper-next {
      width: 28px;
      height: 44px;
      opacity: 0;
      transition: all 0.3s;
      &:after {
        display: none;
      }
    }
    .home-swiper-prev {
      left: 0;
      transform: translateX(0px);
      background: url("../../assets/index/banner_left.png");
    }
    .home-swiper-next {
      right: 0;
      transform: translateX(0px);
      background: url("../../assets/index/banner_right.png");
    }
  }

  .home-swiper-pagination {
    width: 100%;
    text-align: center;
    position: absolute;
    top: 557px;
    z-index: 1;
    /deep/ .swiper-pagination-bullet {
      width: 20px;
      height: 8px;
      opacity: 0.7;
      border-radius: 4px;
      background-color: #ffffff;
      margin: 0 4px;
      transition: width 0.8s;
      overflow: hidden;
      &.swiper-pagination-bullet-active {
        width: 38px;
        opacity: 1;
        box-shadow: inset 0 2px 0 0 rgba(201, 253, 238, 0.47);
        position: relative;
        &:before {
          position: absolute;
          top: 0;
          left: 0;
          content: "";
          width: inherit;
          height: inherit;
          background-image: linear-gradient(to right, #07e9f1, #07f1b7);
          animation: bullet-animate .8s;
          transform-origin: left;
          border-radius: 4px;
        }
      }

      @keyframes bullet-animate {
        from {
          transform: scaleX(0);
        }
        to {
          transform: scaleX(1);
        }
      }
    }
  }

  &:hover {
    .home-swiper {
      .home-swiper-prev, .home-swiper-next {
        opacity: 0.4;

        &:hover {
          opacity: 1;
        }
      }

      .home-swiper-prev {
        transform: translateX(33px);
      }

      .home-swiper-next {
        transform: translateX(-33px);
      }
    }
  }
}

</style>
