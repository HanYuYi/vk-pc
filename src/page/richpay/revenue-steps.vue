<template>
  <div class="richpay_home_floor" style="margin-top: 60px">
    <dl class="main collapse_panel">
      <dt class="richpay_head" @click="collapse = !collapse" :class="{coll: collapse}">
        V富通钱包获取收益步骤<i class="fold_icon" :class="{open: !collapse}"></i>
      </dt>

      <transition name="slide-fade">
        <dd class="richpay_content" v-if="!collapse">
          <div class="step-panel">

            <swiper class="my-swiper" ref="swiperRef" :options="mySwiperOptions">
              <swiper-slide v-for="(item, index) in stepList" :key="index">
                <div class="index-for">{{ index + 1 }}</div>
                <div class="txt-box" @mouseover="stopSwiper" @mouseout="startSwiper">
                  <template v-if="typeof item === 'string'">
                    <p>{{ item }}</p>
                  </template>
                  <template v-else>
                    <p v-for="(txt, i) in item" :key="i" v-html="txt"></p>
                  </template>
                </div>
              </swiper-slide>
            </swiper>

            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>

          </div>
        </dd>
      </transition>
    </dl>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  name: 'revenue-steps',
  components: { Swiper, SwiperSlide },
  data () {
    return {
      collapse: true,
      stepList: [
        '将主钱包中完成提款流水要求的资金转入威客V富通钱包，转入资金最低1元起。',
        [
          '<span>A.</span> 单笔资金每小时派息一次，会持续派发七日，利息收益自动加入“未提利息”',
          '<span>B.</span> 若当日单笔存入≥1000元，且该笔资金存满6小时即可免费获得1次抽奖机会。会员每日最多可获取1次抽奖机会，抽奖次数最多可累计7次。'],
        [
          '<div style="white-space: nowrap"><span>A.</span> 当“未提利息”有额度时，您可随时点击“提息”</div>提出收益;',
          '<span>B.</span> 当已获得抽奖机会时，您可点击"立即抽奖"。'
        ],
        [
          '<span>A.</span> 您可将收益提至主钱包，也可提至V富通钱包继续收息。',
          '<span>B1.</span> 若抽中现金自动加入主钱包，1倍流水即可提款；',
          '<span>B2.</span> 若抽中翻倍券并使用，使用后当日内所有利息收益翻倍。'
        ]
      ],
      mySwiperOptions: {
        slidesPerView: "auto",
        grabCursor : true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        spaceBetween: 30,
        loopFillGroupWithBlank: true,
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        on: {
          init: () => {
            this.swiperEl = this.$refs.swiperRef
          },
        },
      },
      swiperEl: null
    }
  },
  methods: {
    stopSwiper() {
      if (!this.swiperEl) return
      this.swiperEl.$swiper.autoplay.stop()
    },
    startSwiper() {
      if (!this.swiperEl) return
      this.swiperEl.$swiper.autoplay.start()
    }
  }
}
</script>

<style lang="less" scoped>
.step-panel {
  margin-top: 39px;
  .my-swiper {
    width: 992px;
    height: 254px;
    .swiper-slide {
      width: 380px;
      height: 254px;
      position: relative;
      .index-for {
        z-index: 2;
        position: absolute;
        top: 0;
        left: 143px;
        width: 94px;
        height: 70px;
        background: url("../../assets/richpay/step_icon.png") no-repeat;
        font-size: 31px;
        line-height: 70px;
        text-align: center;
        color: #232656;
      }
      .txt-box {
        margin-top: 35px;
        box-sizing: border-box;
        border: solid 1px #83f9fd;
        width: 380px;
        height: 219px;
        display: flex;
        flex-wrap: wrap;
        align-content: center;
        &:hover {
          background: #383bb2;
        }
        p {
          font-size: 14px;
          padding: 0 40px;
          line-height: 24px;
          color: #fff;
          /deep/ span {
            color: #83f9fd;
          }
        }
      }
    }
  }
  .swiper-button-prev,.swiper-button-next {
    width: 30px;
    height: 44px;
    margin-top: 15px;
    &:after{
      content: "";
    }
  }
  .swiper-button-prev {
    background: url("../../assets/richpay/step_prev.png") no-repeat;
    left: 49px;
  }
  .swiper-button-next {
    background: url("../../assets/richpay/step_next.png") no-repeat;
    right: 49px;
  }
}
</style>
