<template>
  <div v-show="visible === 2" class="dotati10Jackpot">
    <p class="dotati10Jackpot-desc">{{initInfo.active_show_time}}</p>
    <p class="dotati10Jackpot-desc resettop">活动期间会员投注DOTA2【TI10赛事】即可参与此活动，并获得瓜分百万奖池的机会，累计投注越高获得大奖的概率越高哦。</p>
    <div class="amounts-today"><h1>{{ initInfo.amounts_today }}元</h1></div>

    <div class="prize-panel">
      <!-- 旋转的圆盘-->
      <div class="disk"></div>
      <div class="disk-model">
        <div class="disk-wrapper">
          <div @click="viewPrizeModel" class="treasure-box"></div>
          <button @click="viewAwardRecord" class="award-record"></button>
        </div>
        <ul :style="{'animation-play-state': prizePlayState ? 'paused' : 'running'}" class="prize">
          <li
            v-for="(item, index) in prizeList"
            :key="index" :style="{background: `url(${item.imgUrl})`, backgroundSize: '100% 100%', transform: `rotate(${item.rotate}deg)`}"
            @mouseenter="prizePlayState = true;toVisiblePrize(index)" @mouseleave="prizePlayState = false"></li>
        </ul>
      </div>
      <!-- 开奖时间-->
      <ul class="lottery-time">
        <li
          v-for="(item, index) in initInfo.lottery_time"
          :key="index"
          :style="{left: `${item.status === '2' ? item.immediatelyPosition[0] : item.position[0]}px`, top: `${item.status === '2' ? item.immediatelyPosition[1] : item.position[1]}px`}"
          :class="[{normal: item.status === '1'}, {immediately: item.status === '2'}]">
          <p>{{ item.date }}</p>
          <small v-if="item.status === '2'" class="countdown">倒计时 {{ downDate }}</small>
        </li>
      </ul>

      <!-- 圆盘光圈-->
      <ul class="aperture">
        <li v-for="num in lotteryTimeIndex" :key="num - 1" :style="{'background': `url(${apertureList[num - 1]})`}"></li>
      </ul>
    </div>

    <dotati10Rules :text="rulesText" />
    <!-- 奖品提示-->
    <div v-if="prizePlayState" class="prize-tips" :style="{left: `${currentPrizep.left}px`, top: `${currentPrizep.top}px`}">{{ currentPrizep.content }}</div>
  </div>
</template>

<script>
import dotati10Rules from './dotati10Rules'
import { getMousePos, formatCountTime } from '@/utils/util'
import {mapState} from 'vuex'

export default {
  name: 'dotati10Jackpot',
  components: { dotati10Rules },
  props: {
    visible: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      lotteryTimePos: [
        {position: [210, -113], immediatelyPosition: [166, -140]},
        {position: [516, 122], immediatelyPosition: [470, 87]},
        {position: [390, 450], immediatelyPosition: [348, 417]},
        {position: [35, 450], immediatelyPosition: [-7, 415]},
        {position: [-100, 122], immediatelyPosition: [-137, 100]}
      ],
      initInfo: {
        active_show_time: '',
        amounts_today: 0,
        lottery_time: [] // 0: 未开奖， 1: 已开奖， 2: 即将开奖
      },
      // 奖品
      prizeList: [
        {imgUrl: require('../../../assets/active/dotati10/prize1.png'), name: 'DOTA2水晶室女手办', rotate: -9},
        {imgUrl: require('../../../assets/active/dotati10/prize2.png'), name: '罗技G502有线鼠标', rotate: 51},
        {imgUrl: require('../../../assets/active/dotati10/prize3.png'), name: '雷蛇黑寡妇机械键盘', rotate: 111},
        {imgUrl: require('../../../assets/active/dotati10/prize4.jpg'), name: 'IPhone13 Pro', rotate: 171},
        {imgUrl: require('../../../assets/active/dotati10/prize5.png'), name: '傲风电竞桌椅套装', rotate: 231},
        {imgUrl: require('../../../assets/active/dotati10/prize6.png'), name: '最高可领388元现金', rotate: 291}
      ],
      prizePlayState: false,
      currentPrizep: {
        content: null,
        left: 0,
        top: 0
      },
      downDate: formatCountTime(0),
      downDateTimer: null,
      apertureList: [
        require('../../../assets/active/dotati10/aperture_1.png'),
        require('../../../assets/active/dotati10/aperture_2.png'),
        require('../../../assets/active/dotati10/aperture_3.png'),
        require('../../../assets/active/dotati10/aperture_4.png'),
        require('../../../assets/active/dotati10/aperture_5.png')
      ],
      rulesText: '<li> 此优惠活动仅计算会员在小艾电竞、小艾彩池电竞、IM电竞平台中投注DOTA2【TI10赛事】的累计有效流水。</li>' +
        '<li> 活动奖池共开奖5次，每次爆奖后会员的累计投注额将会清零重新计算，会员累计投注越高，中大奖的概率越高。</li>' +
        '<li> 会员获得的现金奖品系统将自动派发至会员的主钱包中，活动奖金完成电竞1倍流水，即可提款。</li>' +
        '<li> 若奖品为实物奖品，请联系在线客服，提供您的详细收货地址，我们将于次日安排发货，快递单号将会发送站内信通知。除此之外您也可以联系在线客服选择折现，实物奖品折现后无需流水即可提款。</li>' +
        '<li> 有效流水仅计算产生输赢结果的注单，电竞赔率＜1.5、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水。</li>' +
        '<li> 每位有效玩家、每一手机号码、电子邮箱、相同银行卡、每一个IP地址、每一台电脑者只能享受一次优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利。VKGAME对本活动保有最终解释权。'
    }
  },
  watch: {
    isLogin () {
      this.dividePrizePoolInit()
    },
    visible (num) {
      num === 2 && this.dividePrizePoolInit()
    }
  },
  computed: {
    ...mapState(['isLogin']),
    lotteryTimeIndex () {
      let lastStatus = 0
      this.initInfo.lottery_time.forEach((currentValue, index) => {
        if (currentValue.status - 0 > 0) {
          lastStatus = index
        }
      })
      if (lastStatus === this.initInfo.lottery_time.length - 1) {
        if (this.initInfo.lottery_time[this.initInfo.lottery_time.length - 1].status === '1') {
          lastStatus = 5
        }
      }
      return lastStatus
    },
    isNoPrize () {
      return this.initInfo.lottery_time.every(item => item.status === '0' || item.status === '2')
    }
  },
  mounted () {
    this.dividePrizePoolInit()
  },
  beforeDestroy () {
    clearInterval(this.downDateTimer)
  },
  methods: {
    // 初始话活动
    dividePrizePoolInit () {
      this.$http(this.ApiSetting.active.dotati10DividePrizePoolInit)
        .then(response => {
          if (response.status === 1 && response.data) {
            const filterLotteryTime = (response.data.lottery_time && response.data.lottery_time.length)
              ? this.setLotteryTimePosition(response.data.lottery_time, 'lotteryTimePos') : []
            this.initInfo = {...response.data, lottery_time: filterLotteryTime}
            // 开奖倒计时
            clearInterval(this.downDateTimer)
            const currentDownDate = filterLotteryTime.filter(item => item.status === '2')
            if (currentDownDate && currentDownDate.length) {
              const currentTime = new Date().getTime() / 1000
              this.downDate = formatCountTime(currentDownDate[0].downDate - currentTime)
              this.downDateMethod(currentDownDate[0].downDate - currentTime)
            }
          }
        })
    },
    // 设置位置工具
    setLotteryTimePosition (list, key) {
      for (let i = 0; i < list.length; i++) {
        list[i] = {...list[i], ...this[key][i]}
      }
      return list
    },
    // 奖品提示title
    toVisiblePrize (index) {
      const mousePosition = getMousePos()
      const newPrize = {
        left: mousePosition.x,
        top: mousePosition.y,
        content: this.prizeList[index].name
      }
      this.currentPrizep = newPrize
    },
    // 开奖倒计时
    downDateMethod (time) {
      let newTime = time
      this.downDateTimer = setInterval(() => {
        if (newTime >= 0) {
          this.downDate = formatCountTime(newTime)
          newTime--
        } else {
          clearInterval(this.downDateTimer)
        }
      }, 1000)
    },
    // 查看获奖记录
    viewAwardRecord () {
      if (!this.initInfo.is_login) return this.$message({ message: '请您先登录', type: 'warning' })
      this.$emit('visibleModal', this.isNoPrize)
    },
    // 查看宝盒所有奖品
    viewPrizeModel () {
      this.$emit('prizeData', this.prizeList)
    }
  }
}
</script>

<style lang="less" scoped>
@icon: url("../../../assets/active/dotati10/icon.png");

.dotati10Jackpot {
  z-index: 1;

  &-desc {
    max-width: 1030px;
    text-align: center;
    font-size: 26px;
    line-height: 26px;
    color: #f8e8b9;
    margin-top: 42px;

    &.resettop {
      margin-top: 24px;
      text-align: left;
      line-height: 32px;
    }
  }
  .amounts-today {
    width: 376px;
    height: 100px;
    margin: 40px auto 0;
    box-sizing: border-box;
    background: @icon;
    background-position: -985px -366px;
    border: 1px solid transparent;
    h1 {
      margin-top: 48px;
      font-size: 32px;
      text-align: center;
      color: #4b281c;
    }
  }
  .prize-panel {
    width: 1040px;
    height: 1008px;
    margin: 0 auto;
    position: relative;
    border: 1px solid transparent;
    box-sizing: border-box;
    .disk {
      width: 580px;
      height: 580px;
      margin: 353px auto 0;
      background: @icon;
      background-position: -30px -1118px;
      background-repeat: no-repeat;
      animation: disk-rotate 10s linear infinite;

      @keyframes disk-rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(-360deg); }
      }
    }
    .disk-model {
      width: 580px;
      height: 580px;
      position: absolute;
      top: 353px;
      left: 230px;
      border-radius: 50%;
      z-index: 2;
      .prize {
        width: 100%;
        height: 100%;
        animation: prize-rotate 10s linear infinite;
        li {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          border: 4px solid #dac170;
          box-sizing: border-box;
          position: absolute;
          transform-origin: 0 570px;
          top: -265px;
          left: 50%;
          opacity: 0.3;
          cursor: pointer;
          &:hover {
            opacity: 1;
          }
        }
      }
      @keyframes prize-rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      .disk-wrapper {
        position: absolute;
        top: 166px;
        left: 166px;
        z-index: 3;
        .treasure-box {
          width: 248px;
          height: 248px;
          background: @icon;
          background-position: -1212px -796px;
          cursor: pointer;
          //&:after {
          //  position: absolute;
          //  content: "";
          //  width: 120px;
          //  height: 110px;
          //  background: url("../../../assets/active/dotati10/treasure_box.gif");
          //}
        }
        .award-record {
          display: block;
          width: 122px;
          height: 39px;
          outline: 0;
          border: 0;
          margin: -40px auto 0;
          cursor: pointer;
          background: @icon;
          background-position: -1055px -876px;
          &:hover {
            background-position: -1055px -936px;
          }
        }
      }
    }
    .lottery-time {
      width: 580px;
      height: 580px;
      position: absolute;
      top: 353px;
      left: 230px;
      border-radius: 50%;
      z-index: 1;
      li {
        width: 160px;
        height: 160px;
        background: @icon;
        background-position: -365px -841px;
        position: absolute;
        font-size: 18px;
        text-align: center;
        color: #adadae;
        display: flex;
        p {
          width: 93px;
          margin: auto;
        }
        &.normal {
          background-position: -570px -841px;
          color: #ffffce;
        }
        &.immediately {
          width: 240px;
          height: 240px;
          background-position: -776px -805px;
          color: #ffffce;
          position: relative;
          p {
            margin-top: 90px;
          }
          .countdown {
            position: absolute;
            width: 100%;
            bottom: 51px;
            display: block;
            font-size: 20px;
            text-align: center;
            color: #fff;
            text-shadow: 0 0 7px #090c14;
          }
        }
      }
    }
    .aperture {
      position: absolute;
      top: 201px;
      left: 70px;
      li {
        position: absolute;
        top: 0;
        left: 0;
        width: 900px;
        height: 900px;
      }
    }
  }
  .prize-tips {
    position: absolute;
    display: block;
    padding: 0 20px;
    height: 34px;
    text-align: center;
    line-height: 34px;
    border-radius: 6px;
    background-image: linear-gradient(to top, #946823, #c48e24);
    border-top: 2px solid #f8e8b9;
    font-size: 14px;
    letter-spacing: 1.4px;
    color: #fff;
    z-index: 4;
  }
}

</style>
