<template>
  <div class="vpn-course">

    <p class="step-desc">{{swiperIndex + 1}}.{{swiperList[swiperIndex].desc}}。</p>

    <swiper class="vpn-swiper" :options="mySwiperOptions">
      <swiper-slide v-for="(item, index) in swiperList"
                    :key="index"
                    :style="{backgroundImage: `url(${item.img})`}">

      </swiper-slide>
    </swiper>

    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>

    <h3 class="step-title">步骤{{swiperIndex + 1}}/{{swiperList.length}}</h3>

  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

const swiperEl = document.getElementsByClassName('vpn-swiper')

export default {
  name: 'vpnCourse',
  components: { Swiper, SwiperSlide },
  data() {
    return {
      swiperIndex: 0,
      swiperList: [
        {img: require("../../assets/virtualCoiCourse/vpn_1.jpg"), desc: '点击下载快橙，选择Windows客户端进行安装'},
        {img: require("../../assets/virtualCoiCourse/vpn_2.jpg"), desc: '点击下载之后，将自动跳转到注册页面，进行注册'},
        {img: require("../../assets/virtualCoiCourse/vpn_3.jpg"), desc: '完成安装后，点击购买订阅，选择对应的使用天数进行充值'},
        {img: require("../../assets/virtualCoiCourse/vpn_4.jpg"), desc: '充值后，点击主页，即可选择地区线路'},
        {img: require("../../assets/virtualCoiCourse/vpn_5.jpg"), desc: '最后点击登陆，即可成功跳转IP地址'}
      ],
      mySwiperOptions: {
        grabCursor: true,
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        on: {
          slideChange: () => {
            this.swiperIndex = swiperEl[0].swiper.activeIndex
          }
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.vpn-course {
  width: 1262px;
  height: 628px;
  margin: 43px auto 0;
  background-image: url("../../assets/virtualCoiCourse/course_bg.png");
  overflow: hidden;
  position: relative;

  .step-title {
    font-size: 28px;
    line-height: 80px;
    text-align: center;
    color: #fff;
  }

  .vpn-swiper {
    width: 796px;
    height: 446px;
    margin: 0 auto;
    .swiper-wrapper {
      .swiper-slide {
      }
    }
  }

  .swiper-button-prev, .swiper-button-next {
    width: 56px;
    height: 76px;
    background-image: url("../../assets/virtualCoiCourse/icon.png");

    &::after {
      content: "";
    }

    &.swiper-button-disabled {
      opacity: 1;
    }
  }
  .swiper-button-prev {
    left: 145px;
    background-position: 0 -308px;
    &:hover {
      background-position: 0 -385px;
    }
  }
  .swiper-button-next {
    right: 145px;
    background-position: -58px -308px;
    &:hover {
      background-position: -58px -385px;
    }
  }

  .step-desc {
    margin-top: 10px;
    font-size: 24px;
    line-height: 76px;
    text-align: center;
    color: #fff;
  }
}
</style>
