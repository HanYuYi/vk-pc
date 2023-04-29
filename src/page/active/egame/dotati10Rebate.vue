<template>
  <div v-show="visible === 1" class="dotati10Rebate">
    <p class="dotati10Rebate-desc">{{initInfo.active_show_time}}</p>
    <p class="dotati10Rebate-desc resettop">活动期间满足条件的会员，每日可领取一次存送优惠，彩金最高可获得{{ initInfo.bounsList.length ? initInfo.bounsList[initInfo.bounsList.length - 1].bouns : '' }}元！</p>
    <div class="dotati10Rebate-progress">
      <ul class="progressbar">
        <li v-for="(item, index) in initInfo.bounsList" :key="item.id" :class="{done: lastLineIndex === 0 ? (lastLineIndex > index) : (lastLineIndex >= index)}">
          <i></i>
          <span class="line" :class="{lastLine: lastLineIndex === index}"></span>
          <span v-if="item.status === 0" class="completed"></span>
          <span v-if="!initInfo.is_login && index === 0" class="almostfinished-tip">登录后<br>查看可领彩金</span>
          <span v-if="initInfo.is_login && (firstNotReached === index && initInfo.needDeposit > 0 && !hasCompleted)" class="almostfinished-tip">再存款{{ initInfo.needDeposit }}元<br>即可获得</span>
        </li>
      </ul>
      <ul class="panel">
        <li v-for="item in initInfo.bounsList" :key="item.id"
            :class="[{received: item.status === 0}, {available: item.status === 1 || item.status === 3}]"
            @click="openWalletDialog(item)">
          <h1>{{ item.bouns }}</h1>
          <p>存款{{ item.deposit }}元</p>
        </li>
      </ul>
    </div>
    <dotati10Rules :text="rulesText"/>
  </div>
</template>

<script>
import dotati10Rules from './dotati10Rules'
import {mapState} from 'vuex'

export default {
  name: 'dotati10Rebate',
  components: { dotati10Rules },
  props: {
    visible: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      backupsBounsList: [],
      firstNotReached: null,
      initInfo: {
        is_login: 0,
        active_show_time: '',
        // 0:已领取, 1:待领取, 2: 不可领取
        bounsList: [],
        needDeposit: 0
      },
      walletAmount: null,
      rulesText: '<li> 符合条件的会员，可在优惠活动页面点击“立即领取”按钮，对应的存款本金+活动彩金在领取成功后将自动添加至会员选择的电竞游戏钱包中。会员每日未发起提款前的存款都视为首充。</li>' +
        '<li> 若会员在申请此优惠前将存款从主钱包转出或发起提款，则不可申请此优惠活动。</li>' +
        '<li> 会员领取成功后需在对应电竞钱包中完成有效流水要求，当会员对应电竞钱包余额＜最低投注额且无未结算注单时，系统将自动判定已完成活动规定的有效流水。例：会员当天首存200，申请此活动优惠，需完成（200+28）x3=684元的有效流水。</li>' +
        '<li> 此优惠活动每日仅限领取一次，领取当天不与新用户首存优惠活动、电子首存优惠活动、电竞首存优惠活动、BTi体育首存优惠活动、VIP月存优惠活动、真人周存款优惠活动、棋牌周存款优惠活动共享，活动流水未完成前不可再次申请，当天未申请则视为自动放弃。</li>' +
        '<li> 有效流水仅计算产生输赢结果的注单，电竞赔率＜1.5、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水。</li>' +
        '<li> 每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能使用一个账号享受优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利；VKGAME对本活动保有最终解释权。'
    }
  },
  watch: {
    isLogin () {
      this.initRebateData()
    },
    visible (num) {
      num === 1 && this.initRebateData()
    }
  },
  computed: {
    ...mapState(['isLogin']),
    // 是否有已完成
    hasCompleted () {
      let isCompleted = false
      for (let i = 0; i < this.initInfo.bounsList.length; i++) {
        if (this.initInfo.bounsList[i].status === 0) {
          isCompleted = true
          break
        }
      }
      return isCompleted
    },
    // 是否是最后一步，模拟不显示进度条
    lastLineIndex () {
      let backIndex = 0
      if (this.initInfo.max_bouns !== 0) {
        for (let i = 0; i < this.initInfo.bounsList.length; i++) {
          if (this.initInfo.bounsList[i].bouns === this.initInfo.max_bouns) {
            backIndex = i
            break
          }
        }
      }
      return backIndex
    }
  },
  mounted () {
    this.initRebateData()
  },
  methods: {
    // 初始化赛事数据
    initRebateData () {
      this.$http(this.ApiSetting.active.dotati10RebateInit)
        .then(response => {
          if (response.status === 1) {
            this.backupsBounsList = JSON.parse(JSON.stringify(response.data.bounsList))
            const newData = response.data
            if (newData.bounsList.length) {
              for (let i = 0; i < newData.bounsList.length; i++) {
                // 前端自定义不可点击状态
                newData.bounsList[i].status = -1
              }
            }
            this.initInfo = newData
            this.changeBounsListStatus()
          }
        })
    },
    // 延时改变领取状态，呈现过度动画
    changeBounsListStatus () {
      const _self = this
      function* stepChangeStatus () {
        for (let i = 0; i < _self.initInfo.bounsList.length; i++) {
          yield _self.initInfo.bounsList[i].status = _self.backupsBounsList[i].status
        }
      }
      let timer, inter
      clearTimeout(timer)
      clearInterval(inter)
      timer = setTimeout(() => {
        const fStep = stepChangeStatus()
        inter = setInterval(() => {
          const statusObj = fStep.next()
          if (statusObj.done) {
            clearInterval(inter)
            this.calcFirstNotReached()
          }
        }, 700)
      }, 700)
    },
    // 即将达成的状态
    calcFirstNotReached () {
      for (let i = 0; i < this.initInfo.bounsList.length; i++) {
        if (this.initInfo.bounsList[i].bouns === this.initInfo.max_bouns) {
          this.firstNotReached = i + 1
          break
        }
      }
    },
    // 打开选择钱包
    openWalletDialog (row) {
      if (!this.initInfo.is_login) return this.$message({ message: '请您先登录', type: 'warning' })
      if (row.status === 2 || row.status === 3) return this.$message({ message: row.status_tips, type: 'warning' })
      if (row.status === 1) {
        this.walletAmount = row.bouns
        this.$emit('visibleModal', true)
      }
    },
    // 提交领取彩金
    receiveDotati10Rebate (code) {
      const xhr = this.$http(this.ApiSetting.user.transferSubmit, {
        from: 'NM',
        to: code,
        money: this.walletAmount,
        active_id: this.initInfo.active_id
      })
      xhr.then(({ status }) => {
        if (status === 1) {
          this.$message({ message: '领取成功，请进入个人中心钱包查看！', type: 'success' })
          this.initRebateData()
        }
      })
      xhr.finally(() => {
        this.$parent.visibleWalletModal = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
@icon: url("../../../assets/active/dotati10/icon.png");

.dotati10Rebate {
  z-index: 1;
  &-desc {
    text-align: center;
    font-size: 26px;
    line-height: 26px;
    color: #f8e8b9;
    margin-top: 42px;
    &.resettop {
      margin-top: 24px;
    }
  }
  &-progress {
    margin-top: 145px;
    .progressbar {
      text-align: center;
      li {
        display: inline-block;
        width: 220px;
        height: 8px;
        background-color: #373737;
        position: relative;
        &:last-child {
          width: 0;
        }
        i {
          position: absolute;
          z-index: 1;
          top: -19px;
          left: -20px;
          display: inline-block;
          width: 40px;
          height: 40px;
          border: solid 3px #5a5c5b;
          background-color: #373737;
          border-radius: 50%;
          transition: background-image 0.8s,border 0.8s;
        }
        .line {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 2;
          display: inline-block;
          width: 0;
          height: 100%;
          background-image: linear-gradient(to top, #fabe3b, #fbcd4d);
          transition: width 0.4s;
        }
        &.done {
          i {
            border: solid 3px #7f5c25;
            background-image: linear-gradient(to top, #f89e13, #fde971);
          }
          .line {
            width: 100%;
          }
        }
        .lastLine {
          width: 0!important;
        }
        @keyframes myfirst {
          0% {transform: scale(0.2, 0.2);}
          30% {transform: scale(1.2, 1.2);}
          60% {transform: scale(0.8, 0.8);}
          90% {transform: scale(1, 1);}
        }
        .completed {
          position: absolute;
          top: -100px;
          left: -30px;
          display: inline-block;
          width: 90px;
          height: 80px;
          background: @icon;
          background-position: -733px -34px;
          animation: myfirst 0.4s;
        }
        .almostfinished-tip {
          position: absolute;
          top: -90px;
          left: -85px;
          display: inline-block;
          min-width: 136px;
          height: 56px;
          border-radius: 6px;
          border-top: 2px solid #f8e8b9;
          background-image: linear-gradient(to top, #946823, #c48e24);
          padding: 0 20px;
          font-size: 18px;
          letter-spacing: 1.8px;
          text-align: center;
          color: #fff;
          line-height: 26px;
          animation: myfirst 0.4s;
          &:before {
            position: absolute;
            content: "";
            left: 80px;
            bottom: -16px;
            display: inline-block;
            width: 0;
            height: 0;
            border-width: 8px;
            border-style: solid;
            border-color: #946823 transparent transparent transparent;
          }
        }
      }
    }
    .panel {
      text-align: center;
      margin-top: 45px;
      li {
        display: inline-block;
        width: 234px;
        height: 230px;
        background: @icon;
        background-position: -46px -825px;
        cursor: pointer;
        &.received {
          background-position: -46px -569px;
          h1 {
            background-image: linear-gradient(to top, #d7b769, #e7dfca), linear-gradient(to bottom, #ede1b7, #ede1b7);
            -webkit-background-clip: text;
            color: transparent;
          }
          p {
            color: #ede1b7;
          }
        }
        &.available {
          background-position: -46px -312px;
          h1 {
            background-image: linear-gradient(to top, #d7b769, #e7dfca), linear-gradient(to bottom, #ede1b7, #ede1b7);
            -webkit-background-clip: text;
            color: transparent;
          }
          p {
            color: #ede1b7;
          }
        }

        h1 {
          font-size: 48px;
          margin-top: 48px;
          color: #5f5f5f;
        }
        p {
          font-size: 18px;
          letter-spacing: 1.8px;
          color: #5f5f5f;
          margin-top: 17px;
        }
      }
    }
  }
}
</style>
