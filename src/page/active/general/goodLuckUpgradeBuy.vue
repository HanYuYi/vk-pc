<template>
  <div class="guide-container">
    <h1>虚拟币买币教程</h1>
    <div class="guide-main">
      <swiper class="my-swiper buy-swiper" :options="mySwiperOptions">
        <swiper-slide v-for="(item, index) in swiperData" :key="index">
          <div class="guide-content">
            <img v-for="(obj, i) in item.imgs" :key="i" :src="obj" alt="">
          </div>
        </swiper-slide>
      </swiper>
      <div class="swiper-button-prev buy-swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next buy-swiper-button-next" slot="button-next"></div>
      <div class="step-desc"><span>步骤{{ swiperIndex + 1 }}/{{ swiperData.length }}</span> :  {{ swiperData[swiperIndex].desc }}</div>
    </div>
  </div>
</template>

<script>
import {Swiper, SwiperSlide} from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

const swiperEl = document.getElementsByClassName('buy-swiper')

export default {
  name: 'goodLuckUpgradeBuy',
  components: { Swiper, SwiperSlide },
  data () {
    return {
      swiperIndex: 0,
      swiperData: [
        {imgs: [require('../../../assets/active/goodLuckUpgrade/buy_1.jpg')], desc: '在首页的[更多]中联系客服咨询转账手续费，然后至欧易APP首页点击【购买数字货币】。'},
        {imgs: [require('../../../assets/active/goodLuckUpgrade/buy_2.jpg'), require('../../../assets/active/goodLuckUpgrade/buy_2_1.jpg')], desc: '在【购买】页面中选择泰达币，输入购买金额，点击【购买USDT】，弹出购买方式，选择其中一种购买方式后点击【确认购买】。'},
        {imgs: [require('../../../assets/active/goodLuckUpgrade/buy_3.jpg')], desc: '订单生成后，请确认购买数量和购买方式无误后，点击【下一步】。'},
        {imgs: [require('../../../assets/active/goodLuckUpgrade/buy_4.jpg')], desc: '获得转账信息，需要在页面上规定的时间内完成转账，完成后点击【我已完成转账】即可，稍等片刻您的虚拟币会到账。'}
      ],
      mySwiperOptions: {
        grabCursor: true,
        navigation: { nextEl: '.buy-swiper-button-next', prevEl: '.buy-swiper-button-prev' },
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
