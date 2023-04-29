<template>
  <div v-show="visible" class="s11activeRebate">
    <!-- 活动信息-->
    <div class="s11active-info">
      <h1>{{ initInfo.active_show_time[0] }}<small>{{ initInfo.active_show_time[1] }}</small></h1>
      <p>活动期间满足条件的会员，每日可领取一次存送优惠，彩金最高可获得{{ initInfo.bounsList && initInfo.bounsList.length
        ? initInfo.bounsList[initInfo.bounsList.length - 1].bouns : '' }}元！</p>
    </div>

    <div class="rebate-progress">
      <!-- 进度条-->
      <ul class="progressbar">
        <li v-for="(item, index) in initInfo.bounsList" :key="index" :class="{done: lastLineIndex === 0 ? (lastLineIndex > index) : (lastLineIndex >= index)}">
          <i></i>
          <span class="line" :class="{lastLine: lastLineIndex === index}"></span>
          <span v-if="initInfo.is_login && item.status === 2" class="completed"></span>
          <span v-if="!initInfo.is_login && index === 0" class="almostfinished-tip">登录后<br>查看可领彩金</span>
          <span v-if="initInfo.is_login && (firstNotReached === index && initInfo.needDeposit > 0 && !hasCompleted)" class="almostfinished-tip">再存款{{ initInfo.needDeposit }}元<br>即可获得</span>
        </li>
      </ul>
      <!-- 领取面板-->
      <ul class="panel">
        <li v-for="(item, index) in initInfo.bounsList" :key="index"
            :class="[{received: item.status === 2}, {available: item.status === 1 || item.status === 3}]">
          <h1>{{ item.bouns }}</h1>
          <p>存款{{ item.deposit }}元</p>
        </li>
      </ul>
      <!-- 领取按钮-->
      <ul class="btns">
        <li v-for="(item, index) in initInfo.bounsList" :key="index" :class="[{received: item.status === 2}, {available: item.status === 1 || item.status === 3}]">
          <button @click="openWalletDialog(item)">
            <span v-if="item.status === 2">已领取</span>
            <span v-else>领取</span>
          </button>
        </li>
      </ul>
      <p class="note"><small>*</small>以上所有彩金，流水要求为：（本金+彩金）3倍电竞流水</p>
    </div>

    <!-- 活动规则-->
    <ul class="rules">
      <li><i>1</i><p>符合条件的会员，可在优惠活动页面点击“立即领取”按钮，对应的存款本金+活动彩金在领取成功后将自动添加至会员选择的电竞游戏钱包中。会员每日未发起提款前的存款都视为首充。</p></li>
      <li><i>2</i><p>若会员在申请此优惠前将存款从主钱包转出或发起提款，则不可申请此优惠活动。</p></li>
      <li><i>3</i><p>会员领取成功后需在对应电竞钱包中完成有效流水要求，当会员对应电竞钱包余额＜最低投注额且无未结算注单时，系统将自动判定已完成活动规定的有效流水。例：会员当天首存200，申请此活动优惠，需完成（200+28）x3=684元的有效流水。</p></li>
      <li><i>4</i><p>此优惠活动每日仅限领取一次，领取当天不与TI10充值返利活动、新用户首存优惠活动、电子首存优惠活动、电竞首存优惠活动、体育周存款优惠活动、IM体育会员日优惠活动、IM沙巴首单包赔活动、VIP月存优惠活动、真人周存款优惠活动、棋牌周存款优惠活动共享，活动流水未完成前不可再次申请，当天未申请则视为自动放弃。</p></li>
      <li><i>5</i><p>有效流水仅计算产生输赢结果的注单，电竞赔率＜1.5、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水。</p></li>
      <li><i>6</i><p>每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能使用一个账号享受优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利；VKGAME对本活动保有最终解释权。</p></li>
    </ul>

    <!-- 回到活动首页-->
    <div class="back-active">
      <router-link to="/active"></router-link>
    </div>

    <!-- 选择钱包dialog-->
    <s11activeWalletDialog :visible.sync="walletDialogVisible" :loading="walletDialogLoading" @backCode="receiveLotteryMoney" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import s11activeWalletDialog from './s11activeWalletDialog'

export default {
  name: 's11activeRebate',
  components: { s11activeWalletDialog },
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  watch: {
    visible (bool) {
      if (bool) {
        this.initRebateData()
      }
    },
    isLogin () {
      this.initRebateData()
    }
  },
  mounted () {
    this.initRebateData()
  },
  data () {
    return {
      backupsBounsList: [],
      firstNotReached: null,
      initInfo: {
        active_show_time: [],
        // 0: 不能领取，1: 待领取，2: 已领取
        bounsList: [],
        max_bouns: 0,
        needDeposit: 0
      },
      walletDialogVisible: false,
      walletDialogLoading: false,
      currentAmount: 0
    }
  },
  computed: {
    ...mapState(['isLogin']),
    // 是否有已完成
    hasCompleted () {
      return this.initInfo.bounsList.some(item => item.status === 2)
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
  methods: {
    // 初始化活动数据
    initRebateData () {
      this.$http(this.ApiSetting.active.lolS11RebateInit)
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
    // 选择钱包
    openWalletDialog (row) {
      if (row.status === -1) return
      if (!this.initInfo.is_login) return this.$message({ message: '请您先登录', type: 'warning' })
      if (row.status === 1) {
        this.currentAmount = row.bouns
        this.walletDialogVisible = true
      } else {
        this.$message({ message: row.status_tips, type: 'warning' })
      }
    },
    // 提交领取彩金
    receiveLotteryMoney (code) {
      this.walletDialogLoading = true
      const xhr = this.$http(this.ApiSetting.user.transferSubmit, {
        from: 'NM',
        to: code,
        money: this.currentAmount,
        active_id: this.initInfo.active_id
      })
      xhr.then(({ status }) => {
        if (status === 1) {
          this.walletDialogVisible = false
          this.initRebateData()
          this.$message({ message: '彩金已经发放到您选中的游戏钱包中，请前往游戏钱包查看！', type: 'success' })
        }
      })
      xhr.finally(() => {
        this.walletDialogLoading = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
@icon: url("../../../assets/active/s11active/icon.png") no-repeat;

.s11activeRebate {
  .rebate-progress {
    margin-top: 117px;

    .progressbar {
      text-align: center;

      li {
        display: inline-block;
        width: 234px;
        height: 8px;
        background-color: #cccccc;
        position: relative;

        &:last-child {
          width: 0;
        }

        i {
          position: absolute;
          z-index: 1;
          top: -15px;
          left: -18px;
          display: inline-block;
          width: 30px;
          height: 36px;
          background: @icon;
          background-position: -341px -66px;
        }

        .line {
          position: absolute;
          top: 0;
          left: 0;
          display: inline-block;
          width: 0;
          height: 100%;
          background-color: #ad8c57;
          transition: width 0.4s;
        }

        &.done {
          i {
            background-position: -341px -17px;
          }

          .line {
            width: 100%;
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
          top: -92px;
          left: -28px;
          display: inline-block;
          width: 68px;
          height: 48px;
          background: @icon;
          background-position: -242px -9px;
          animation: myfirst 0.4s;
        }

        .almostfinished-tip {
          position: absolute;
          top: -99px;
          left: -87px;
          display: inline-block;
          width: 143px;
          height: 71px;
          background: @icon;
          background-position: -402px -13px;
          padding: 5px 12px 0;
          font-size: 18px;
          letter-spacing: 1.8px;
          text-align: center;
          color: #fff;
          line-height: 26px;
          animation: myfirst 0.4s;
        }
      }
    }

    .panel {
      text-align: center;
      margin-top: 47px;
      li {
        display: inline-block;
        width: 182px;
        height: 206px;
        background: @icon;
        background-position: -1669px -128px;
        box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.3);
        margin: 0 22px;
        h1 {
          font-size: 72px;
          line-height: 72px;
          font-weight: normal;
          margin-top: 69px;
          color: #f1f1f3;
        }
        p {
          font-size: 18px;
          line-height: 18px;
          letter-spacing: 0.9px;
          color: #ad8c57;
          margin-top: 33px;
        }
        &.received {
          background-position: -1211px -128px;
          h1 {
            color: #ad8c57;
          }
          p {
            color: #fff;
          }
        }
        &.available {
          background-position: -1440px -128px;
        }
      }
    }
    .btns {
      text-align: center;
      margin-top: 30px;
      li {
        width: 226px;
        display: inline-block;
        button {
          width: 130px;
          height: 42px;
          border: 0;
          outline: 0;
          background: @icon;
          background-position: -608px -37px;
          font-size: 24px;
          font-weight: bold;
          color: #888;
          cursor: pointer;
        }
        &.received {
          button {
            color: #ad8c57;
          }
        }
        &.available {
          button {
            color: #f1f1f3;
            background-position: -773px -37px;
            box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.3);
          }
        }
      }
    }
    .note {
      text-align: center;
      font-size: 14px;
      color: #313131;
      line-height: 14px;
      margin-top: 49px;
      small {
        font-size: 30px;
        color: #f84937;
        line-height: 14px;
        vertical-align: text-bottom;
        margin-right: 5px;
      }
    }
  }
  .rules {
    li {
      &:first-child {
        margin-top: 134px!important;
      }
    }
  }
}
</style>
