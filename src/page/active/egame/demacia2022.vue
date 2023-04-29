<template>
  <div class="demacia2022-page">
    <div class="float-block float-left"></div>
    <div class="float-block float-right"></div>
    <div class="animate-bg">
      <drift-post :baseBubbles="dataList" />
    </div>
    <p class="date-time">{{ initInfo.active_show_time || '加载中...' }}</p>
    <!-- 内容-->
    <h1 class="demacia2022-title content-title"></h1>
    <!-- 描述-->
    <p class="demacia2022-desc">
      活动期间，会员每日在电竞场馆中投注LPL春季赛赛事且有效投注≥5,000元，即可申请领取相应活动彩金，最高可获得8,888元。
    </p>
    <!-- table-->
    <div class="demacia2022-table-panel">
      <table width="100%" border="0" align="center" cellspacing="0">
        <tr>
          <td>累计有效投注(￥)</td>
          <td>返利彩金(￥)</td>
          <td>流水要求</td>
        </tr>
        <tr>
          <td>≥5,000</td>
          <td>18</td>
          <td rowspan="10">5倍电竞流水</td>
        </tr>
        <tr>
          <td>≥25,000</td>
          <td>38</td>
        </tr>
        <tr>
          <td>≥50,000</td>
          <td>58</td>
        </tr>
        <tr>
          <td>≥100,000</td>
          <td>88</td>
        </tr>
        <tr>
          <td>≥150,000</td>
          <td>188</td>
        </tr>
        <tr>
          <td>≥300,000</td>
          <td>388</td>
        </tr>
        <tr>
          <td>≥500,000</td>
          <td>588</td>
        </tr>
        <tr>
          <td>≥1,000,000</td>
          <td>888</td>
        </tr>
        <tr>
          <td>≥3,000,000</td>
          <td>1,288</td>
        </tr>
        <tr>
          <td>≥5,000,000</td>
          <td>8,888</td>
        </tr>
      </table>
    </div>
    <!-- 昨日累计负盈利-->
    <p v-if="isLogin" class="demacia2022-profit">
      <span v-if="initInfo.status === 0 || initInfo.status === 1">昨日累计有效投注 {{ formatNumber(initInfo.yesterday_profit) }}
        元</span>
      <span v-if="initInfo.status === 2 || initInfo.status === 3 || initInfo.status === 4">{{ initInfo.status_tips
      }}</span>
    </p>

    <!-- 领取-->
    <div class="demacia2022-amount">
      <h3><i></i>今日{{ initInfo.status === 1 ? '已' : '可' }}领：
        <span v-if="isLogin && (initInfo.status === 0 || initInfo.status === 1)">{{ initInfo.today_bonus
        }}</span>
        <span v-else>0</span>
        元
      </h3>
      <template v-if="isLogin">
        <button v-if="initInfo.status === 0" @click="showApplyDialog"></button>
        <button v-else-if="initInfo.status === 1" class="received"></button>
        <button v-else-if="initInfo.status === 2 || initInfo.status === 3 || initInfo.status === 4"
          class="disabled"></button>
        <button v-else @click="clickTip"></button>
      </template>
      <button v-else @click="clickTip"></button>
    </div>

    <!-- 规则-->
    <h1 class="demacia2022-title rule-title"></h1>
    <ul class="demacia2022-rule">
      <li>
        <i>1</i>电竞每日返利金需在本活动页面手动领取，每日仅限领取一次。
      </li>
      <li><i>2</i>每日累计流水达到对应的额度即可领取彩金，领取时间为次日 00:30:00-23:59:59，指定时间内未领取视为自动放弃。</li>
      <li><i>3</i>用户在领取电竞每日返利金时选择将其领取至对应的电竞游戏钱包（小艾电竞、RG电竞、IM电竞、TF电竞），电竞每日返利金需完成5倍电竞有效流水，活动流水未完成前不可再次申请。</li>
      <li>
        <i>4</i>有效流水仅计算产生输赢结果的注单，电竞赔率＜1.5、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水。
      </li>
      <li><i>5</i>每位有效玩家、每个手机号码、电子邮箱、IP地址、每张银行卡、每台设备只能享受一次优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利；VKGAME对本活动保有最终解释权。</li>
    </ul>

    <div class="demacia2022-back">
      <router-link to="/active" />
    </div>

      <el-dialog
      :visible.sync="visible"
      v-dir-center="visible"
      custom-class="demacia2022-dialog"
      width="484px"
      center
      title="领取彩金"
      :append-to-body="true"
      >
        <div @click="visible = false" class="dema-close"></div>
        <div class="wallet-wrapper d-flex flex-wrap">
          <div @click="walletIndex = index" :class="{ 'active-block': walletIndex  === index}" class="block d-flex align-center justify-center" v-for="(item, index) in walletList" :key="index">
             {{item.name}}
          </div>
        </div>
        <div @click="handleToTake" class="confirm-btn"></div>
        <div class="desc">5倍彩金流水转出</div>
      </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { formatNumberSplit } from '@/utils/util'
import DriftPost from '@/components/drift-post'
export default {
  name: 'demacia2022',
  components: {
    DriftPost
  },
  data () {
    return {
      visible: false,
      amountForDay: 500,
      loading: false,
      confirmloading: false,
      walletIndex: 0,
      walletList: [
        { name: '小艾电竞钱包', code: 'EG' },
        { name: 'TF电竞钱包', code: 'TF' },
        { name: 'IM电竞钱包', code: 'IM' }
      ],
      initInfo: {
        today_bonus: 0,
        yesterday_profit: 0,
        status: 0,
        active_setting: [
          { profit: 500, bonus: 12 },
          { profit: 2000, bonus: 58 },
          { profit: 5000, bonus: 88 },
          { profit: 20000, bonus: 388 },
          { profit: 50000, bonus: 888 }
        ]
      },
      dataList: [
        require('../../../assets/login/fire1.png'),
        require('../../../assets/login/fire2.png'),
        require('../../../assets/login/fire3.png'),
        require('../../../assets/login/fire4.png'),
        require('../../../assets/login/fire5.png'),
        require('../../../assets/login/fire6.png'),
        require('../../../assets/login/fire7.png')
      ]
    }
  },
  computed: {
    ...mapState(['isLogin'])
  },
  mounted () {
    this.getInit()
  },
  methods: {
    // 初始化活动信息
    getInit () {
      this.loading = true
      this.$http(this.ApiSetting.active.getResuce2022Init)
        .then(res => {
          if (res.status === 1 && res.data) {
            this.initInfo = res.data
            this.walletList = res.data.wallet
          }
          console.info('初始化德玛西亚：', res)
        })
        .finally(() => {
          this.loading = false
        })
    },
    formatNumber (money) {
      return formatNumberSplit(money)
    },
    clickTip () {
      if (this.loading) {
        this.$message({ message: '加载中，请稍等...', type: 'warning' })
        return
      }
      this.$message({ message: this.initInfo.status_tips, type: 'warning' })
    },
    showApplyDialog () {
      this.visible = true
    },
    handleToTake () {
      if (this.confirmloading) {
        return
      }
      let getParameter = {
        from: 'NM',
        to: this.walletList[this.walletIndex].code,
        money: this.initInfo.today_bonus,
        active_id: this.initInfo.active_id
      }
      console.info('德玛西亚领取参数：', getParameter)
      this.confirmloading = true
      this.$http(this.ApiSetting.user.transferSubmit, getParameter)
        .then(res => {
          console.info('德玛西亚领取响应：', res)
          this.confirmloading = false
          if (res.status === 1) {
            this.initInfo.status = 1
            this.walletIndex = 0
            this.visible = false
            this.$message({ message: res.message, type: 'success' })
            this.getInit()
          }
        })
        .finally(() => {
          this.confirmloading = false
        })
    }
  }
}
</script>

<style lang="less" scoped>
.animate-bg {
  pointer-events: none;
  position: absolute;
  z-index: 9;
  width: 100%;
  height: calc(100% - 1px);
  top: 0;
  left: 0;
}
@textcolor: #c0bdc8;
@keyframes updownleft {
  0% {
    transform: translate3d(-660px, -3%, 0);
  }
  100% {
    transform: translate3d(-660px, 3%, 0);
  }
}
@keyframes updownright {
  0% {
    transform: translate3d(660px, -3%, 0);
  }
  100% {
    transform: translate3d(660px, 3%, 0);
  }
}
.demacia2022-page {
  min-height: 100vh;
  max-height: 2150px;
  box-sizing: border-box;
  background-image: url('~@/assets/active/egame/demacia2022/bg.webp');
  background-position: center top;
  background-repeat: no-repeat;
  padding-top: 598px;
  overflow: hidden;
  position: relative;
  color: #fff;

  .float-block {
    position: absolute;
    width: 52px;
    height: 214px;
    top: 235px;
    &.float-left {
      animation: updownleft 1.2s linear alternate infinite;
      left: 50%;
      transform: translate3d(-660px, 0, 0);
      background: url("~@/assets/active/egame/demacia2022/float-left.png") no-repeat;
    }
    &.float-right {
      animation: updownright 1.2s linear alternate infinite;
      right: 50%;
      transform: translate3d(660px, 0, 0);
      background: url("~@/assets/active/egame/demacia2022/float-right.png") no-repeat;
    }
  }

  .date-time {
    text-align: center;
    font-size: 18px;
    line-height: 1;
    font-weight: bold;
    color: #fff;
  }

  .demacia2022-title {
    width: 909px;
    height: 114px;
  }

  .content-title {
    margin: 63px auto 0;
    background: url("~@/assets/active/egame/demacia2022/content-title.png") no-repeat;
  }

  .rule-title {
    margin: 50px auto 0;
    background: url("~@/assets/active/egame/demacia2022/rule-title.png") no-repeat;
  }

  .demacia2022-desc {
    margin: 22px auto 0;
    font-size: 14px;
    line-height: 14px;
    text-align: center;
    color: @textcolor;
  }

  .demacia2022-table-panel {
    margin: 30px auto 0;
    width: 1028px;
    height: 466px;
    background: url("~@/assets/active/egame/demacia2022/table.png") no-repeat;
    overflow: hidden;

    table {
      margin: 15px auto 0;
      color: #fff;
      font-size: 14px;
      width: 99.3%;

      tr {
        td {
          width: 33.333%;
          border-top: 1px solid #b33642;
          border-left: 1px solid #b33642;
          box-sizing: border-box;
          text-align: center;
          height: 41px;
          &:first-child {
            border-left: 0;
          }
        }

        &:first-child {
          td {
            border-top: 0;
            height: 40px;
            font-weight: bold;
          }
        }
      }
    }
  }

  .demacia2022-profit {
    margin-top: 33px;
    font-size: 18px;
    line-height: 18px;
    text-align: center;
    color: #fff;

    span {
      height: 23px;
      display: inline-block;
      border-bottom: 8px solid #b62620;
      box-sizing: border-box;
    }
  }

  .demacia2022-amount {
    margin: 33px auto 0;
    width: 532px;
    height: 60px;
    line-height: 54px;
    display: flex;
    justify-content: space-between;

    h3 {
      font-weight: normal;
      height: inherit;
      box-sizing: border-box;
      border: solid 2px #54494b;
      border-right: 0;
      background-color: #191919;
      font-size: 18px;
      color: @textcolor;
      flex: 1;
      display: flex;
      align-items: center;

      i {
        margin: 0 13px 0 23px;
        width: 28px;
        height: 30px;
        background: url("~@/assets/active/egame/demacia2022/amount_icon.png");
      }

      span {
        color: #ff5c32;
        margin-right: 4px;
      }
    }

    button {
      width: 236px;
      height: 82px;
      position: relative;
      top: -12px;
      border: 0;
      outline: 0;
      background: url("~@/assets/active/egame/demacia2022/get_amount_btn.png") no-repeat;
      cursor: pointer;
      &:hover {
        background-image: url('~@/assets/active/egame/demacia2022/btn-hover.png');
      }

      &.received {
        cursor: no-drop;
        background: url("~@/assets/active/egame/demacia2022/get_amount_received.webp") no-repeat;
      }

      &.disabled {
        cursor: no-drop;
        background: url("~@/assets/active/egame/demacia2022/get_amount_disabled.webp") no-repeat;
      }
    }
  }

  .demacia2022-rule {
    width: 1028px;
    height: 334px;
    box-sizing: border-box;
    padding-top: 42px;
    margin: 20px auto 0;
    background: url("~@/assets/active/egame/demacia2022/rule_panel_icon.png") no-repeat;

    li {
      margin: 14px 0 0 164px;
      width: 730px;
      font-size: 14px;
      line-height: 24px;
      color: @textcolor;
      position: relative;

      i {
        display: inline-block;
        position: absolute;
        content: "";
        left: -33px;
        top: 1px;
        width: 22px;
        height: 22px;
        text-align: center;
        line-height: 22px;
        background: url("~@/assets/active/egame/demacia2022/rule_num.png") no-repeat;
        font-size: 12px;
        color: #fff;
      }

      &:first-child {
        margin: 0 0 0 164px;
      }
    }
  }

  .demacia2022-back {
    text-align: center;

    a {
      margin: 40px auto 0;
      display: inline-block;
      width: 304px;
      height: 110px;
      background: url("~@/assets/active/egame/demacia2022/back.png") no-repeat;
      transition: transform .3s;
      &:hover {
        transform: scale(1.03);
        background-image: url("~@/assets/active/egame/demacia2022/back-hover.png")
      }
    }
  }
}
/deep/.demacia2022-dialog {
  background-color: transparent;
  .el-dialog__header {
    box-sizing: border-box;
    z-index: 2110;
    height: 48px;
    line-height: 48px;
    background-color: transparent;
    background: url('~@/assets/active/egame/demacia2022/head-bg.png') center top no-repeat;
    background-size: 100% 100%;
    position: relative;
    .el-dialog__title {
      color: #fff;
      font-weight: 600;
    }
    .el-dialog__headerbtn {
      width: 39px;
      height: 39px;
      right: -16px;
      top: -13px;
      .el-icon-close {
        width: 39px;
        height: 39px;
        background: url('~@/assets/active/egame/demacia2022/close.png') center no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  .el-dialog__body {
    padding: 40px 76px 20px;
    background: url('~@/assets/active/egame/demacia2022/dio-bg.png') center no-repeat;
    width: 100%;
    height: 294px;
    box-sizing: border-box;
    font-size: 16px;
    .wallet-wrapper {
      .block {
        cursor: pointer;
        color: #c0bdc8;
        width: 160px;
        height: 50px;
        box-sizing: border-box;
        background-color: #191919;;
        border: solid 1px #54494b;;
        box-shadow: inset 0 0 12px 0 #5f5254;
        margin-right: 10px;
        margin-bottom: 10px;
        &:nth-child(even) {
          margin-right: 0;
        }
        &.active-block {
          border-color: #dd2429;
          color: #ed272c;
          font-weight: 600;
          box-shadow: inset 0 0 12px 0 #dd2429;
        }
      }
    }
    .confirm-btn {
      cursor: pointer;
      user-select: none;
      margin: 5px auto 0;
      width: 236px;
      height: 82px;
      box-sizing: border-box;
      background: url('~@/assets/active/egame/demacia2022/confirm-btn.png') center no-repeat;
      background-size: 100% 100%;
      &:hover {
        background-image: url('~@/assets/active/egame/demacia2022/confirm-hover.png');
      }
    }
    .desc {
      margin-top: 3px;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.5);
    }
  }
}
</style>
