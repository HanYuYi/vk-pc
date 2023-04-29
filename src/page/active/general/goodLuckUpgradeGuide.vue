<template>
  <div class="guide-container">
    <h1>虚拟币存款教程</h1>
    <div class="guide-main">
      <swiper class="my-swiper deposit-swiper" :options="mySwiperOptions">
        <swiper-slide v-for="(item, index) in swiperData" :key="index">
          <div class="guide-content">
            <img v-for="(obj, i) in item.imgs" :key="i" :src="obj" alt="" :class="{'radius': radiusImgList.includes(swiperIndex + 1)}">
          </div>
        </swiper-slide>
      </swiper>
      <div class="swiper-button-prev deposit-swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next deposit-swiper-button-next" slot="button-next"></div>
      <div class="step-desc"><span>步骤{{ swiperIndex + 1 }}/{{ swiperData.length }}</span> :  {{ swiperData[swiperIndex].desc }}</div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

const swiperEl = document.getElementsByClassName('deposit-swiper')

export default {
  name: 'goodLuckUpgradeGuide',
  components: { Swiper, SwiperSlide },
  data () {
    return {
      swiperIndex: 0,
      swiperData: [
        {imgs: [require('../../../assets/active/goodLuckUpgrade/deposit_1.png'), require('../../../assets/active/goodLuckUpgrade/deposit_1_1.png')], desc: '点击“我的-充值”，或点击“账户-充值”；'},
        {imgs: [require('../../../assets/active/goodLuckUpgrade/deposit_2.png')], desc: '输入充值金额，选择充值线路，点击“立即充值”按钮；'},
        {imgs: [require('../../../assets/active/goodLuckUpgrade/deposit_3.png')], desc: '选择充值币种， 请务必正确选择币种，否则可能导致支付错误，无法上分；'},
        {imgs: [require('../../../assets/active/goodLuckUpgrade/deposit_4.png')], desc: '复制支付链接或保存二维码后，进入币安交易平台，进入后续支付流程：'},
        {imgs: [require('../../../assets/active/goodLuckUpgrade/deposit_5.jpg')], desc: '点击资产->资金账户->提现。'},
        {imgs: [require('../../../assets/active/goodLuckUpgrade/deposit_6.jpg')], desc: '在[链上提现] 中选择USDT- ERC20 后点击 [地址薄]。'},
        {imgs: [require('../../../assets/active/goodLuckUpgrade/deposit_7.jpg')], desc: '点击[添加地址]。'},
        {imgs: [require('../../../assets/active/goodLuckUpgrade/deposit_8.jpg')], desc: '使用页面中的扫码功能扫描刚刚保存在相册中的二维码，勾选[将该账户设置为免认证账户]后保存。'},
        {imgs: [require('../../../assets/active/goodLuckUpgrade/deposit_9.jpg'), require('../../../assets/active/goodLuckUpgrade/deposit_9_1.jpg')], desc: '在【资金账户】中点击【提现】，【提现】页面中选择【USDT】。'},
        {imgs: [require('../../../assets/active/goodLuckUpgrade/deposit_10.jpg')], desc: '选择【ERC20】后在地址簿中选择刚刚添加的平台存款地址并输入提现金额后点击【提交】（提现金额=存款页面显示的转入USDT数+手续费）。'},
        {imgs: [require('../../../assets/active/goodLuckUpgrade/deposit_11.png')], desc: '在第 ④ 步骤完成交易后，将交易ID粘贴至VKGAME“支付信息”页面的“区块链交易ID”输入框内，点击“支付完成”；'}
      ],
      radiusImgList: [],
      mySwiperOptions: {
        grabCursor: true,
        navigation: { nextEl: '.deposit-swiper-button-next', prevEl: '.deposit-swiper-button-prev' },
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
