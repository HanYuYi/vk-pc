<template>
  <div class="christmas2021">
    <!-- 雪花-->
    <div id="snow" class="christmas_snow"></div>

    <!-- 中奖弹幕-->
    <vue-baberrage
      :isShow="true"
      :barrageList="initInfo.win_list"
      :throttleGap="5000"
      :boxHeight="1000"
      :messageHeight="48"
      :lanesCount="10"
      :loop="false"
      class="christmas2021-baberrage">
    </vue-baberrage>

    <div class="christmas-tree" :class="{wobble: drawTimer !== null}"></div>

    <button @click="getRecordList" class="award-record">中奖<br>记录</button>
    <button @click="dialogStatus = 3" class="award-record view-gifts">查看<br>奖品</button>

    <div class="gift-panel">
      <!-- 进度条-->
      <ul class="progressbar">
        <li v-for="(item, index) in initInfo.active_setting" :key="index" :class="{done: lastLineIndex >= index}">
          <span v-if="item.status !== 1" class="deposit-tip">今日累计首充<br>{{ item.first_deposit }}元</span>
          <i>{{ index + 1 }}</i>
          <span
            v-if="item.status < 2 || nextStepIndex === index"
            class="line"
            :class="{lastLine: index === 0}"
            :style="{width: `${item.status < 2 ? `98%` : `${(item.first_deposit - item.need_deposit) / item.first_deposit * 100 * 1.64}px`}`}">
          </span>
          <span v-if="initInfo.is_login && item.status === 1" class="completed"></span>
        </li>
      </ul>
      <!-- 领取按钮-->
      <ul class="btns">
        <li v-for="(item, index) in initInfo.active_setting" :key="index" :class="[{available: item.status === 0 || item.status === 1}]">
          <button @click="handleReceiveAnAward(item, index)" :class="{drawing: luckDrawIndex === index}">
            <span v-if="item.status === 0">
              <i v-if="luckDrawIndex === index" class="loading"></i>摇一摇
            </span>
            <span v-else-if="item.status === 1">查看奖品</span>
            <span v-else>摇一摇</span>
          </button>
        </li>
      </ul>
    </div>

    <div class="rules">
      <h1></h1>
      <p class="explain-desc">{{ initInfo.active_show_time }}</p>

      <h1 class="explain-title"></h1>
      <p class="explain-desc">活动期间，会员当日达到指定首充金额即可获得一次抽奖机会，每位会员每日最高可获得{{ initInfo.active_setting.length }}次抽奖机会。</p>

      <h1 class="rule-title"></h1>
      <p>1.会员每日达到对应首充金额即可获得抽奖机会，每日首充最多可获得{{ initInfo.active_setting.length }}次抽奖机会，此抽奖机会仅当天有效。</p>
      <p>2.会员每日未发起提款前的存款都视为首充，例如首笔充值100元，未申请提款前，继续充值400元，则累计充值为500元；当日累计充值30000元即可获得{{ initInfo.active_setting.length }}次抽奖机会。若该抽奖机会当日未使用，则视为自动放弃。</p>
      <p>3.若奖品为实物奖品，请联系在线客服提供中奖兑换码，提供您的详细收货地址，我们将于次日安排发货，快递单号将会发送站内信通知。除此之外您也可以联系在线客服选择折现，实物奖品折现后无需流水即可提款。</p>
      <p>4.会员获得的现金奖品系统将自动派发至会员的主钱包中，需要完成全站1倍有效流水，电竞赔率＜1.5、亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水；PT电子游戏中以下游戏不算有效流水：<activeptliushui color="#ffffff"></activeptliushui>。</p>
      <p>5.每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能使用一个账号享受优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利。本活动最终解释权归VKGAME所有。</p>
    </div>

    <div class="back">
      <router-link to="/active">回到活动首页</router-link>
    </div>

    <!-- 雪花-->
    <div id="snowtwo" class="christmas_snow"></div>

    <!-- dialog-->
    <Christmas2021Dialog
      :visible.sync="dialogStatus"
      :prizeId.sync="prizeId">
    </Christmas2021Dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import Christmas2021Dialog from './christmas2021Dialog'
import { vueBaberrage, MESSAGE_TYPE } from 'vue-baberrage'
Vue.use(vueBaberrage)

export default {
  name: 'christmas2021',
  components: { Christmas2021Dialog },
  data () {
    return {
      initInfo: {
        active_setting: [],
        win_list: []
      },
      dialogStatus: 0,// 1: 记录  2: 中奖奖品  3: 所有奖品
      prizeId: 0,
      luckDrawIndex: null,
      drawTimer: null
    }
  },
  watch: {
    isLogin () {
      this.initActiveData()
    }
  },
  mounted() {
    this.initActiveData()
    this.$nextTick(()=> {
      this.startsnow('snow', 30)
      this.startsnow('snowtwo', 10)
    })
  },
  computed: {
    ...mapState(['isLogin']),
    // 是否是最后一步，模拟不显示进度条
    lastLineIndex () {
      let backIndex
      for (let i = 0; i < this.initInfo.active_setting.length; i++) {
        if (this.initInfo.active_setting[i].status === 0 || this.initInfo.active_setting[i].status === 1) {
          backIndex = i
        }
      }
      return backIndex
    },
    // 已完成的下一步索引
    nextStepIndex () {
      let backIndex
      for (let i = 0; i < this.initInfo.active_setting.length; i++) {
        if (this.initInfo.active_setting[i].status >= 2) {
          backIndex = i
          break
        }
      }
      return backIndex
    }
  },
  methods: {
    // 初始化活动数据
    initActiveData () {
      this.$http(this.ApiSetting.active.christmas2021Init)
        .then(({status, data}) => {
          if (status === 1 && data) {
            this.initInfo = { ...data, win_list: [] }
            this.addToList(data.win_list)
          } else {
            this.initInfo = {}
          }
        })
    },
    // push弹幕数据
    addToList(list) {
      let added = 0, timer
      clearInterval(timer)
      timer = setInterval(() => {
        this.initInfo.win_list = []
        if (list.length && added <= list.length) {
          const pushNum = Number.parseInt(Math.random() * (10 + 1))
          for (let i = 0; i < pushNum; i++) {
            if ((i + added) < list.length - 1) {
              this.initInfo.win_list.push({
                id: i + 1,
                msg: `${list[i + added].username}摇中 : ${list[i + added].desc}`,
                time: Math.random() * 50 + 5,
                type: MESSAGE_TYPE.NORMAL,
                barrageStyle: 'cus-style',
                extraWidth: 300
              })
            }
          }
          added += pushNum
          if (added >= list.length) {
            clearInterval(timer)
          }
        }
      }, 1000 * 40)
    },
    // 查看中奖记录
    getRecordList () {
      if (this.initInfo.is_login) {
       this.dialogStatus = 1
      } else {
        this.$message({ message: this.initInfo.active_setting[0].status_tips, type: 'warning' })
      }
    },
    // 摇一摇领礼物
    handleReceiveAnAward (row, index) {
      // 可抽奖
      if (row.status === 0) {
        if (this.luckDrawIndex) return false
        this.luckDrawIndex = index
        clearTimeout(this.drawTimer)
        this.drawTimer = setTimeout(() => {
          this.toDraw(row.type)
        },3000)
        return false
      }
      // 已抽奖
      if (row.status === 1) {
        this.prizeId = row.item_id
        this.dialogStatus = 2
        return false
      }
      this.$message({ message: row.status_tips, type: 'warning' })
    },
    // 开始抽奖
    toDraw (prizeType) {
      this.$http(this.ApiSetting.active.christmas2021GetDraw, { type: prizeType })
        .then(({status, data}) => {
          if (status === 1) {
            this.initActiveData()
            this.prizeId = data.id
            this.dialogStatus = 2
          }
        })
        .finally(() => {
          this.luckDrawIndex = null
          clearTimeout(this.drawTimer)
          this.drawTimer = null
        })
    },
    // 下雪动效
    startsnow(el, num) {
      const w = window.innerWidth - 112, h = 3000,
        container = document.getElementById(el),
        sizes = ['Small', 'Medium', 'Large'],
        types = ['round', 'star', 'real', 'sharp', 'ring']

      for (let i = 0; i < num; i++) {
        const snowflakeDiv = document.createElement('div');
        const sizeIndex = Math.ceil(Math.random() * 3) - 1; //get random number between 0 and 2
        const size = sizes[sizeIndex]; //get random size
        const typeIndex = Math.ceil(Math.random() * 5) - 1;
        const type = types[typeIndex];
        TweenMax.set(snowflakeDiv, {attr: {class: type + size}, x: R(0,w), y: R(-200,-150) });
        container.appendChild(snowflakeDiv);
        snowing(snowflakeDiv);
      }

      function snowing(element) {
        TweenMax.to(element, R(20,32), {y: h+100, ease: Linear.easeNone, repeat:-1, delay: - 33});
        TweenMax.to(element, R(4,8), {x: '+=100', repeat: -1, yoyo: true, ease: Sine.easeInOut});
        TweenMax.to(element, R(2,8), {rotation: R(0,360), repeat: -1, yoyo: true, ease:Sine.easeInOut, delay: - 5});
      }

      function R(min, max) {
        return min + Math.random() * (max-min)
      }
    }
  }
}
</script>

<style lang="less" scoped>
@icon: url("../../../assets/active/christmas2021/icon.png") no-repeat;

.christmas2021 {
  background: url("../../../assets/active/christmas2021/bg.jpg") no-repeat center top;
  overflow: hidden;
  position: relative;
  .christmas-tree {
    width: 473px;
    height: 596px;
    margin: 99px auto 0;
    background: url("../../../assets/active/christmas2021/christmas_tree.png") no-repeat;
    &.wobble {
      animation: wobble-fade 0.4s infinite;
      transform-origin: 50% 102%;
    }
    @keyframes wobble-fade {
      0% {
        transform: rotate(10deg);
      }
      50% {
        transform: rotate(-10deg);
      }
      100% {
        transform: rotate(10deg);
      }
    }
  }

  .award-record {
    position: absolute;
    top: 473px;
    right: 400px;
    width: 80px;
    height: 80px;
    border-radius: 10px;
    border: 0;
    outline: 0;
    box-shadow: 0px 2px 4px 0 rgba(0, 0, 0, 0.4), 0px 2px 8px 0 rgba(0, 0, 0, 0.3);
    background: @icon;
    background-position: -627px -41px;
    cursor: pointer;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    color: #fff;
    &:hover {
      background-position: -627px -171px;
    }
    &.view-gifts {
      top: 573px;
    }
  }

  .gift-panel {
    margin-top: 129px;

    .progressbar {
      text-align: center;

      li {
        display: inline-block;
        width: 207px;
        height: 8px;
        background-color: #c6c6c6;
        box-shadow: 0px 2px 4px 0 rgba(0, 0, 0, 0.2), 0px 2px 10px 0 rgba(0, 0, 0, 0.1);
        position: relative;

        &:first-child {
          width: 0;
          i {
            left: -20px;
          }
          .deposit-tip {
            left: -50px;
          }
          .completed {
            left: -23px;
          }
        }

        .deposit-tip {
          position: absolute;
          top: -58px;
          left: 157px;
          display: inline-block;
          width: 100px;
          font-size: 14px;
          line-height: 17px;
          letter-spacing: 0.7px;
          text-align: center;
          color: #fff;
        }

        i {
          position: absolute;
          z-index: 1;
          top: -17px;
          left: 185px;
          display: inline-block;
          width: 44px;
          height: 44px;
          background: @icon;
          background-position: -40px -94px;
          box-shadow: 0px 2px 4px 0 rgba(0, 0, 0, 0.2), 0px 2px 10px 0 rgba(0, 0, 0, 0.1);
          border-radius: 50%;
          font-size: 18px;
          font-weight: bold;
          line-height: 44px;
          text-align: center;
          color: #484848;
        }

        .line {
          position: absolute;
          top: 0;
          left: 22px;
          display: inline-block;
          width: 0;
          height: 100%;
          background-color: #b9a176;
          transition: width 0.4s;
        }

        &.done {
          i {
            background-position: -40px -35px;
            color: #c93345;
          }

          .line {
            width: 164px;
          }
        }

        .lastLine {
          width: 0 !important;
        }

        @keyframes myfirst {
          0% {
            transform: scale(0.2, 0.2);
          }
          30% {
            transform: scale(1.2, 1.2);
          }
          60% {
            transform: scale(0.8, 0.8);
          }
          90% {
            transform: scale(1, 1);
          }
        }

        .completed {
          position: absolute;
          top: -67px;
          left: 181px;
          display: inline-block;
          width: 67px;
          height: 43px;
          background: @icon;
          background-position: -28px -182px;
          animation: myfirst 0.4s;
        }
      }
    }

    .btns {
      text-align: center;
      margin-top: 32px;
      li {
        width: 207px;
        display: inline-block;
        button {
          width: 122px;
          height: 42px;
          border: 0;
          outline: 0;
          border-radius: 20px;
          background-image: linear-gradient(to top, #969696, #c6c6c6), linear-gradient(to top, #838383, #a8a8a8);
          box-shadow: 0px 2px 4px 0 rgba(0, 0, 0, 0.2), 0px 2px 8px 0 rgba(0, 0, 0, 0.1), inset 0px 2px 3px 0 #8d8d8d, inset 0px -2px 2px 0 rgba(45, 45, 45, 0.5);
          font-size: 16px;
          font-weight: bold;
          letter-spacing: 0.8px;
          color: #484848;
          cursor: pointer;
          transition: all 0.3s;
          position: relative;
          &.drawing {
            filter: brightness(0.70);
            cursor: auto;
            .loading{
              position: absolute;
              left: 51px;
              top: 11px;
              display: inline-block;
              width: 20px;
              height: 20px;
              background: url("../../../assets/btn-loader.gif") no-repeat center;
              background-size: 100% 100%;
              vertical-align: middle;
            }
          }
        }
        &.available {
          button {
            background-image: linear-gradient(to bottom, #fff, #ffc7a2);
            color: #c93345;
            box-shadow: 0px 2px 4px 0 rgba(0, 0, 0, 0.2), 0px 2px 8px 0 rgba(0, 0, 0, 0.1), inset 0px 2px 3px 0 #fefce1, inset 0px -2px 2px 0 #b0693b;
            &:hover {
              background-image: linear-gradient(to bottom, #ff8b3e, #ff4c4c);
              color: #ffffff;
              box-shadow: 0px 2px 4px 0 rgba(0, 0, 0, 0.2), 0px 2px 8px 0 rgba(0, 0, 0, 0.1), inset 0px 2px 3px 0 rgba(255, 255, 255, 0.4), inset 0px -2px 2px 0 rgba(0, 0, 0, 0.4);
            }
          }
        }
      }
    }
  }

  .rules {
    width: 1244px;
    margin: 167px auto 42px;
    text-align: center;
    color: #ffffff;
    font-size: 14px;
    padding-bottom: 61px;
    background: url("../../../assets/active/christmas2021/rules_bg.png") no-repeat;
    background-size: 100% 100%;
    h1 {
      display: inline-block;
      width: 109px;
      height: 22px;
      background: @icon;
      background-position: -398px -202px;
      margin-top: 49px;
      &.explain-title {
        background-position: -398px -252px;
        margin-top: 24px;
      }
      &.rule-title {
        background-position: -398px -301px;
        margin: 22px 0 17px;
      }
    }

    p {
      line-height: 22px;
      text-align: left;
      margin: 0 232px;
      &.explain-desc {
        text-align: center;
        margin-top: 15px;
      }
    }
  }

  .back {
    text-align: center;
    margin-bottom: 40px;
    a {
      display: inline-block;
      width: 160px;
      height: 40px;
      line-height: 40px;
      border-radius: 20px;
      box-shadow: 0px 2px 4px 0 rgba(0, 0, 0, 0.2), 0px 2px 8px 0 rgba(0, 0, 0, 0.1), inset 0px 2px 3px 0 #fefce1, inset 0px -2px 2px 0 #b0693b;
      background-image: linear-gradient(to bottom, #fff, #ffc7a2);
      font-size: 18px;
      font-weight: bold;
      letter-spacing: 0.9px;
      color: #c93345;
      transition: all 0.3s;
      &:hover {
        background-image: linear-gradient(to bottom, #ff8b3e, #ff4c4c);
        color: #ffffff;
      }
    }
  }
}

</style>

<style lang="less">
// 雪花
.christmas_snow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}
.roundSmall,
.roundMedium,
.roundLarge {
  background: #fff;
  border-radius: 50%;
  position: absolute;
  width: 3px;
  height: 3px;
}
.roundMedium {
  width: 4px;
  height: 4px;
}
.roundLarge {
  width: 5px;
  height: 5px;
  background: #fff;
  border-radius: 50%;
}
.starSmall,
.starMedium,
.starLarge {
  position: absolute;
  width: 10px;
  height: 10px;
  background: url("../../../assets/active/christmas2021/snow1.png");
  background-size: 100% 100%;
}
.starMedium {
  width: 15px;
  height: 13px;
  border-radius: 50%;
  background: #ffffff;
}
.starLarge {
  width: 20px;
  height: 20px;
}
.realSmall,
.realMedium,
.realLarge {
  position: absolute;
  width: 25px;
  height: 25px;
  background: url("../../../assets/active/christmas2021/snow4.png");
  background-size: 100% 100%;
}
.realMedium {
  width: 30px;
  height: 30px;
}
.realLarge {
  width: 40px;
  height: 40px;
}
.sharpSmall,
.sharpMedium,
.sharpLarge {
  position: absolute;
  width: 20px;
  height: 20px;
  background-size: 100% 100%;
  background: url("../../../assets/active/christmas2021/snow3.png");
  background-size: 100% 100%;
}
.sharpMedium {
  width: 28px;
  height: 28px;
}
.sharpLarge {
  width: 35px;
  height: 35px;
}
.ringSmall,
.ringMedium,
.ringLarge {
  position: absolute;
  width: 15px;
  height: 15px;
  background-image: url("../../../assets/active/christmas2021/snow2.png");
  background-size: 100% 100%;
}
.ringMedium {
  width: 25px;
  height: 25px;
}
.ringLarge {
  width: 35px;
  height: 35px;
}
#snowtwo {
  z-index: 5;
}

// 弹幕
.christmas2021-baberrage {
  height: calc(100% - 80px) !important;
  margin-top: 80px;
  pointer-events: none;
  .baberrage-lane {
    .cus-style {
      .normal {
        background-color: rgba(255, 255, 255, 0.8);
        font-size: 20px;
        color: #282828;
        padding: 0;
        .baberrage-avatar {
          width: 0;
        }
        .baberrage-msg {
          line-height: 48px;
          padding: 0 11px;
        }
      }
    }
  }
}
</style>
