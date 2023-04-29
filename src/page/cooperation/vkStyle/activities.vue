<template>
  <div class="activities" :class="{'load-finish': pageIndex === 7 && activeList.length}">
    <div class="activities-center">

      <div class="preserve">
        <template v-if="reRender && activeList.length">
          <div class="swiper-parent">
            <swiper class="activities-swiper" :options="mySwiperOptions">
              <swiper-slide v-for="(item, index) in activeList"
                            :key="index"
                            :style="{backgroundImage: `url(${item.image_path})`}">
                <router-link :to="item.url"/>
              </swiper-slide>
            </swiper>
          </div>

          <div class="swiper-button-prev activities-swiper-prev" slot="button-prev"></div>
          <div class="swiper-button-next activities-swiper-next" slot="button-next"></div>

          <div class="pagination-box">
            <hr>
            <div class="activities-swiper-pagination"></div>
          </div>
        </template>
      </div>

      <router-link :to="isLogin ? '/' : '/register'" class="join-us" tag="a" target="_blank"/>

    </div>

  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import { mapState } from 'vuex'

export default {
  name: 'activities',
  components: { Swiper, SwiperSlide },
  props: ["pageIndex"],
  data() {
    return {
      mySwiperOptions: {
        initialSlide :0,
        loop: true,
        autoplay: { delay: 4000, disableOnInteraction: false },
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
          rotate: 0,
          stretch: 120,
          depth: 400,
          modifier: 1,
          slideShadows: false,
        },
        navigation: {nextEl: '.activities-swiper-next', prevEl: '.activities-swiper-prev'},
        pagination: {el: ".activities-swiper-pagination", clickable: true}
      },
      activeList: [],
      reRender: true,
      reRenderTimer: null
    }
  },
  computed: {
    ...mapState(["isLogin"])
  },
  mounted () {
    this.getActiveList()
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
    // 获取优惠活动数据
    getActiveList() {
      this.activeList = []
      this.$http(this.ApiSetting.index.getVkStyleList)
        .then(response => {
          const { status, data } = response
          if (status === 1 && data) {
            console.info("VK风采-优惠活动初始化", response)
            this.activeList = data
          }
        })
    }
  }
}
</script>

<style lang="less" scoped>
.activities {
  width: 100%;
  height: 100%;
  background: url("../../../assets/vkStyle/activities_bg.jpg") no-repeat;
  background-position: center center;
  display: flex;
  justify-content: center;
  overflow: hidden;
  perspective: 2000px;
  .activities-center {
    width: 6.3rem;
    height: 2.5rem;
    margin-top: 256px;
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
          height: 2.4rem;
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
        .activities-swiper {
          width: 4.3rem;
          height: 2.4rem;
          overflow: visible;
          .swiper-slide {
            background-repeat: no-repeat;
            background-size: contain;
            background-position: center;
            filter: brightness(0.30);
            &.swiper-slide-active {
              filter: brightness(1);
            }
            a {
              display: block;
              width: inherit;
              height: inherit;
            }
          }
        }
      }
      .activities-swiper-prev, .activities-swiper-next {
        width: 25px;
        height: 54px;
        top: calc((2.464rem - 54px) / 2);
        background: url("../../../assets/vkStyle/icon.png") no-repeat;
        transition: transform 0.3s;
        &:after {
          display: none;
        }
      }
      .activities-swiper-prev {
        left: -10px;
        background-position: -213px -496px;
        &:hover {
          transform: translateX(-5px);
        }
      }
      .activities-swiper-next {
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
        .activities-swiper-pagination {
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
            margin: 0 6px;
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
              margin: 0 0 0 6px;
            }
          }
        }
      }
    }

    .join-us {
      margin-top: 36px;
      display: inline-block;
      width: 280px;
      height: 53px;
      background: url("../../../assets/vkStyle/icon.png") no-repeat;
      background-position: -690px -211px;
      opacity: 0;
      transform: translateX(-1000px);
    }
  }

  &.load-finish {
    .activities-center {
      .preserve {
        opacity: 1;
        transition: opacity 1.5s, transform 1.5s;
        transform: rotateX(0deg) scale(1, 1) translateY(0px);
      }
      .join-us {
        opacity: 1;
        transform: translateX(0px);
        transition: opacity 0.6s, transform 0.6s;
        transition-delay: 1.5s;
      }
    }
  }
}
@media screen and (max-height:900px) {
  .activities {
    &.load-finish {
      .activities-center {
        .join-us {
          transform: translateX(16.875vw);
        }
      }
    }
  }
}
@media screen and (max-height:768px) {
  .activities {
    &.load-finish {
      .activities-center {
        margin-top: 230px;
        .join-us {
          margin-top: 20px;
          transform: translateX(15.37vw);
        }
      }
    }
  }
}
</style>
