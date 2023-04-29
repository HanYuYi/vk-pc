<template>
  <div class="left-aside" :class="{'animate__animated animate__bounceInLeft': isAnima}">
    <!-- 展开 -->
    <div class="expand-wrapper" :class="[`expand-wrapper-${item.label}`, { 'de-wrapper': !item.isExpand }]"
      v-for="(item, i) in displayLeftData" :key="i">
      <template v-if="item.isExpand">
        <i class="anniversary_aside_close" @click.stop="close(item.active_id)"></i>
        <div class="inner-wa" @click.stop="toLink(item)">
          <div class="keep-btn" @click.stop="keepLabel(item, i)" :class="{ 'keep-btn-cd': item.is_show_countdown }">
            <div class="text">收起</div>
          </div>
          <img v-if="item.is_show_countdown" :class="`ex-img-${item.label}`" :src="item.excdImg" alt="">
          <img v-else :class="`ex-img-${item.label}`" :src="item.exImg" alt="">
          <div class="count-down-block" :class="`cd-block-${item.label}`" v-if="item.is_show_countdown">
            <span class="num">{{ item.days }}</span><span class="miao">天</span> <span class="num">{{ item.hours
            }}</span><span class="miao">时</span>
            <span class="num">{{ item.minutes }}</span><span class="miao">分</span>
          </div>
        </div>
      </template>
      <template v-else>
        <i class="anniversary_aside_close" @click.stop="close(item.active_id)"></i>
        <div class="inner-wa" @click.stop="toLink(item)">
          <div class="open-btn" @click.stop="keepLabel(item, i)" :class="{ 'open-btn-cd': item.is_show_countdown }">
            <div class="text">展开</div>
          </div>
          <img class="de-img" :src="item.deImg" alt="">
          <!-- <div class="img-border"></div> -->
          <div class="count-down-wrapper" v-if="item.is_show_countdown">
            <div class="cd-btn" :style="{ backgroundImage: `url(${item.cdbtn})` }">
              <span class="num">{{ item.days }}</span>天 <span class="num">{{ item.hours }}</span>时 <span class="num">{{
              item.minutes
              }}</span>分
            </div>
          </div>
        </div>
      </template>
      <!-- 提前加载图片 -->
      <img style="visibility: hidden" :src="item.deImg" alt="">
      <img style="visibility: hidden" :src="item.cdbtn" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'leftaside',
  data () {
    return {
      // 128: s12;130: 世界杯
      isAnima: false,
      leftData: []
    }
  },
  watch: {
    leftData (val) {
      if (val.length) {
        this.isAnima = true
        const timer = setTimeout(() => {
          this.isAnima = false
          clearTimeout(timer)
        }, 1200)
      }
    },
    $route (val) {
      console.log('左侧检测到路由变化了', val)
      if (val.path) {
        this.isAnima = true
        const timer = setTimeout(() => {
          this.isAnima = false
          clearTimeout(timer)
        }, 1200)
      }
    }
  },
  created () {
    if (sessionStorage.getItem('leftaide')) {
      this.leftData = JSON.parse(sessionStorage.getItem('leftaide'))
    } else {
      this.init()
    }
  },
  computed: {
    displayLeftData () {
      const route = this.$route.path
      if (route == '/active/lols12' || route == '/active/lols12sub' || route == '/active/dotati11') {
        return this.leftData.filter(item => item.active_id != 128)
      }
      if (route == '/active/worldcup2022' || route == '/active/worldcup2022sub') {
        return this.leftData.filter(item => item.active_id != 130)
      }
      return this.leftData.filter(item => item.url !== route)
    }
  },
  methods: {
    toLink (item) {
      this.$router.push(item.url)
    },
    pad (val, len) {
      val = String(val)
      len = len || 2
      while (val.length < len) {
        val = '0' + val
      }
      return val
    },
    close (id) {
      console.log(id)
      this.leftData = this.leftData.filter(item => item.active_id != id)
      sessionStorage.setItem('leftaide', JSON.stringify(this.leftData))
    },
    secTrans (totalSeconds) {
      let days, hours, minutes, seconds
      days = Math.floor(totalSeconds / (24 * 60 * 60))
      hours = this.pad(Math.floor((totalSeconds - days * 24 * 60 * 60) / 3600))
      minutes = this.pad(Math.floor((totalSeconds - days * 24 * 60 * 60 - hours * 60 * 60) / 60))
      seconds = this.pad(Math.floor(totalSeconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60))
      return { days, hours, minutes, seconds }
    },
    init () {
      this.$http(this.ApiSetting.active.leftActiveList)
        .then(res => {
          if (res.status == 1 && res.data) {
            // key:main用于该组件，如果有多个key，说明配置了活动页临时导航
            // main是左下角的活动导航，每个页面都显示
            // 其他key的数据是临时活动导航，仅在特定的活动页展示
            if (Object.keys(res.data).length > 1 && res.data.other.length) {
              this.$store.commit('setLeftTempoNav', res.data.other)
              localStorage.setLeftTempoNav = JSON.stringify(res.data.other)
            }
            if (res.data.main) {
              let displayList = res.data.main.filter(item => item.is_show)
              this.leftData = displayList.map(item => {
                let timeObj
                if (item.is_show_countdown && item.countdown_time) {
                  timeObj = this.secTrans(item.countdown_time)
                }
                let obj = {
                  deImg: item.countdown_src['de'],
                  exImg: item.countdown_src['expand-bg'],
                  excdImg: item.countdown_src['expand-bg-cd'],
                  cdbtn: item.countdown_src['btn'],
                  lightImg: item.countdown_src['light'],
                  downTimer: null
                }

                if (item.active_id === 128) {
                  return { ...item, label: 's12', isExpand: true, ...obj, ...timeObj }
                } else if (item.active_id === 130) {
                  return { ...item, label: 'worldcup', isExpand: true, ...obj, ...timeObj }
                } else if (item.active_id === 159) {
                  return { ...item, label: 'christmas', isExpand: true, ...obj, ...timeObj }
                } else if (item.is_nomal === 0) {
                  return { ...item, label: 'special', isExpand: true, ...obj, ...timeObj }
                } else {
                  return { ...item, isExpand: true, ...obj, ...timeObj }
                }
              })

              // 倒计时
              for (const item of this.leftData) {
                if (item.is_show_countdown && item.countdown_time) {
                  this.handlerCountDown(item)
                }
              }
            }
          }
        })
    },
    handlerCountDown (row) {
      clearInterval(row.downTimer)
      row.downTimer = setInterval(() => {
        let timeStamp = row.countdown_time
        row.countdown_time -= 1
        let timeObj = this.secTrans(timeStamp)
        // console.log('倒计时计算', row, timeObj, { ...row, ...timeObj })
        row.days = timeObj.days
        row.hours = timeObj.hours
        row.minutes = timeObj.minutes
        row.seconds = timeObj.seconds
        if (timeStamp <= 0) {
          clearInterval(row.downTimer)
          this.init()
        }
        this.$forceUpdate()
      }, 1000)
    },
    keepLabel (item, i) {
      console.log('当前', item, i)
      this.leftData = this.leftData.map((ele) => {
        if (item.active_id == ele.active_id) {
          return { ...ele, isExpand: !item.isExpand }
        } else {
          return ele
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
img {
  transition: width .3s;
}
.left-aside {
  position: fixed;
  z-index: 99;
  left: 4px;
  bottom: 34px;
  min-height: 140px;
  min-width: 160px;
  .inner-wa {
    cursor: pointer;
    height: 100%;
    width: 100%;

    &:hover {
      .img-border {
        opacity: 1;
      }
    }

  }

  .anniversary_aside_close {
    position: absolute;
    z-index: 150;
    bottom: 170px;
    right: -30px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: url("../assets/anniversary_aside_close_icon.png");
    cursor: pointer;
    opacity: 0.6;
    transition: opacity 0.3s;

    &:hover {
      opacity: 1;
    }
  }

  .count-down-wrapper {
    // cursor: pointer;
    position: absolute;
    bottom: -15px;
    left: 11px;
    z-index: 140px;

    .cd-btn {
      // cursor: pointer;
      text-align: center;
      line-height: 34px;
      width: 138px;
      height: 34px;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      font-size: 12px;
      font-weight: 600;
      color: #f34064;
    }

    .num {
      font-family: Roboto;
      font-size: 18.5px;
      font-weight: bold;
      letter-spacing: 0.46px;
      color: #fff;
      margin-left: 2px;
      margin-right: 2px;

      &:first-child {
        margin-left: 0;
      }
    }
  }

  .open-btn {
    cursor: pointer;
    position: absolute;
    font-size: 12px;
    bottom: 63.5px;
    right: -24px;
    width: 36px;
    height: 33px;
    box-sizing: border-box;
    padding-top: 2px;
    padding-right: 7px;
    color: #fff;
    border: solid 1px rgba(234, 223, 212, 0.2);
    background-color: rgba(0, 0, 0, 0.2);
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;

    .text {
      float: right;
      width: 12px;
      word-wrap: break-word;
      word-break: break-all;
      line-height: 1.1;
    }

    &.open-btn-cd {
      transform: none;
    }

    &:hover {
      border-color: #07f1b7;

      .text {
        font-weight: bold;
        color: #07f1b7;
      }
    }
  }

  .keep-btn {
    cursor: pointer;
    position: absolute;
    bottom: 78px;
    right: -24px;
    font-size: 12px;
    width: 44px;
    height: 58px;
    box-sizing: border-box;
    padding-top: 15px;
    padding-right: 6px;
    color: #fff;
    border: solid 1px rgba(234, 223, 212, 0.2);
    background-color: rgba(0, 0, 0, 0.2);
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;

    .text {
      float: right;
      width: 12px;
      word-wrap: break-word;
      word-break: break-all;
      line-height: 1.1;
    }

    &:hover {
      border-color: #07f1b7;

      .img-border {
        opacity: 1;
      }

      .text {
        font-weight: bold;
        color: #07f1b7;
      }
    }
  }

  .expand-wrapper {
    position: relative;
    height: 190px;
    z-index: 100;
    margin-top: 26px;
    transition: width .5s;

    &.expand-wrapper-nowidth {
      display: none;
    }

    .count-down-block {
      width: 100%;
      position: absolute;
      bottom: 68px;
      left: 0;
      text-align: center;
      font-size: 12px;
      font-weight: bold;

      &.cd-block-s12 {

        .miao {
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: none;
          background-image: linear-gradient(to top, #ffe9c5, #ffe9c5);
          -webkit-text-stroke: 0.5px #7f471a;
        }

        .num {
          font-family: Roboto;
          font-size: 19px;
          font-weight: bold;
          color: #fff;
        }
      }

      &.cd-block-worldcup {
        .miao {
          color: #f34064;
          letter-spacing: 0.39px;
          margin-left: 2px;
          margin-right: 6px;
          font-size: 15px;
        }

        .num {
          letter-spacing: 0.58px;
          font-family: Roboto;
          font-size: 23px;
          font-weight: bold;
          color: #fff;
        }
      }
    }

    &.expand-wrapper-christmas,
    &.expand-wrapper-special {
      width: 305px;

      .keep-btn {
        right: -6px;
      }
      .open-btn {
        bottom: 77px;
      }
      .de-img {
        height: 187px;
      }
    }

    &.expand-wrapper-s12 {
      width: 311px;

      .keep-btn {
        bottom: 96px;
        right: -2px;
      }
    }

    &.expand-wrapper-worldcup {
      width: 289px;
      height: 190px;

      .anniversary_aside_close {
        bottom: 160px;
        right: -52px;
      }

      .count-down-block {
        width: 220px;
        bottom: 20px;
        right: 0;
        left: unset;
      }
    }

  }

  .de-wrapper {
    width: 160px !important;

    &.de-wrapper-nowidth {
      display: none;
    }

    .img-border {
      border-radius: 50%;
      width: 160px;
      height: 160px;
      box-sizing: border-box;
      border: solid 1px #07f1b7;
      position: absolute;
      left: 0;
      bottom: 0;
      opacity: 0;
    }

    // &:hover {
    //   .open-btn {
    //     border-color: #07f1b7;
    //   }

    //   .img-border {
    //     opacity: 1;
    //   }

    //   .text {
    //     font-weight: bold;
    //     color: #07f1b7;
    //   }
    // }
  }

  .de-img {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 160px;
    height: 160px;
  }

  .ex-img-s12 {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 311px;
    height: 160px;
    clip-path: polygon(0 0, 289px 0, 289px 95px, 311px 95px, 311px 190px, 0 190px);
  }
  .ex-img-christmas,
  .ex-img-special {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 305px;
    height: 177px;
    clip-path: polygon(0 0, 289px 0, 289px 95px, 311px 95px, 311px 190px, 0 190px);
  }

  .ex-img-worldcup {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 289px;
    height: 190px;
  }
}
</style>
