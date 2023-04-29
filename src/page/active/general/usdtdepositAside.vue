<template>
  <div
    v-if="usdtdepositInitInfo.is_show === 1 && $route.path !== '/active/usdtdeposit' && sessionShow"
    class="usdtdeposit-aside"
    @click="$router.push('/active/usdtdeposit')">
    <img :src="usdtdepositInitInfo.img_src" alt="">
    <i class="aside-close" @click.stop="close"></i>
    <div v-if="typeof usdtdepositInitInfo.countdown_time === 'number'"
         class="aside_time"
         :style="{'background-image': `url(${usdtdepositInitInfo.countdown_src})`}">
      请在<span>{{ countDownTime }}</span>s内领取
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'usdtdepositAside',
  data () {
    return {
      usdtdepositInitInfo: {
        is_show: 0,
        countdown_time: null
      },
      sessionShow: true,
      countDownTime: '00:00',
      timer: null
    }
  },
  computed: {
    ...mapState(['isLogin', 'userInfo'])
  },
  watch: {
    isLogin () {
      this.getUsdtdepositInfo()
    }
  },
  mounted () {
    this.getUsdtdepositInfo()
    this.sessionShow = sessionStorage.getItem(`usdtdeposit-aside-${this.userInfo.username}`) == 'false' ? false : true
  },
  methods: {
    // 初始化活动信息
    getUsdtdepositInfo () {
      this.$http(this.ApiSetting.active.getUsdtDepositAlert)
        .then(response => {
          if (response.status === 1) {
            if (response.data.countdown_time) response.data.countdown_time = response.data.countdown_time * 1000
            if (response.data.countdown_time === 0) {
              response.data.countdown_time = null
            }
            this.usdtdepositInitInfo = response.data
            if (this.usdtdepositInitInfo.countdown_time > 0) {
              this.handlerCountDown()
            }
          }
        })
    },
    // 倒计时执行器
    handlerCountDown () {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        let timeStamp = this.usdtdepositInitInfo.countdown_time
        this.usdtdepositInitInfo.countdown_time -= 1000
        timeStamp = timeStamp / 1000
        const minute = Number.parseInt(timeStamp / 60)
        const second = timeStamp - (minute * 60)
        this.countDownTime = `${minute < 10 ? (minute < 1 ? '00' : `0${minute}`) : minute}` + ':' + `${second < 10 ? (second < 1 ? '00' : `0${second}`) : second}`
        if (timeStamp < 0) {
          clearInterval(this.timer)
        }
      }, 1000)
    },
    // 关闭
    close () {
      this.usdtdepositInitInfo.is_show = 0
      sessionStorage.setItem(`usdtdeposit-aside-${this.userInfo.username}`, 'false')
    }
  }
}
</script>

<style lang="less" scoped>
.usdtdeposit-aside {
  position: fixed;
  z-index: 99;
  right: 66px;
  top: 16%;
  margin-top: 254px;
  cursor: pointer;
  text-align: center;
  img {
    display: block;
    height: 200px;
  }
  .aside-close {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    width: 21px;
    height: 21px;
    cursor: pointer;
    background: url("../../../assets/active/anniversary2020/anniver_aside_close.png") no-repeat;
    background-size: 100% 100%;

    &:hover {
      background: url("../../../assets/active/anniversary2020/anniver_aside_close_hover.png") no-repeat;
      background-size: 100% 100%;
    }
  }
  .aside_time {
    width: 142px;
    height: 34px;
    margin: 0 auto;
    font-size: 16px;
    line-height: 32px;
    text-align: center;
    background-size: 100% 100%;
    color: #fff;
    span {
      color: #f8d5a1;
    }
  }
}
</style>
