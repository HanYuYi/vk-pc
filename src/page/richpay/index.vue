<template>
  <div v-if="richpayInitData.is_use_richpay" class="vrich">

    <Banner/>

    <!--核心模块-->
    <Wallet @openWinningRecord="visible5 = true"
            @luckDrawBack="luckDrawSuccess"
            @transferOut="visible2 = true"
            @openInterest="visible1 = true"
            @openTransactionDetails="visible10 = true"/>

    <!--福利升级模块-->
    <WelfareTable @visibleRule="visible9 = true"/>

    <!--虚拟币使用教程模块-->
    <virtual-coin/>

    <!--五大特点和优势模块-->
    <Advantage/>

    <!--获取收益步骤轮播模块-->
    <Revenue-steps/>

    <!--钱包常见问题-->
    <Doubt/>

    <!--底部返回按钮部分-->
    <div class="back-active">
      <router-link to="/active"><span>回到活动首页</span></router-link>
    </div>

    <!--转出 dialog-->
    <Transfer-out :visible.sync="visible2" @back="transferOutBack"/>

    <!--转出成功后，参与活动领好礼 dialog-->
    <Transfer-out-gift :visible.sync="visible8" :params="transferOutBackParams"/>

    <!--交易明细 dialog-->
    <transaction-details :visible.sync="visible10"/>

    <!--提息 dialog-->
    <Withdrawal-interest :visible.sync="visible1"/>

    <!--抽奖 dialog-->
    <Luck-draw :visible.sync="visible3"
               :awardData="awardData"/>

    <!--中奖记录 dialog-->
    <Winning-record :visible.sync="visible5"/>

    <!--规则 dialog-->
    <Rules :visible.sync="visible9"/>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex"
import Banner from "./banner"
import Wallet from "./wallet"
import WinningRecord from "./winning-record"
import TransferOut from "./transfer-out"
import TransferOutGift from "./transfer-out-gift"
import LuckDraw from "./luck-draw"
import WithdrawalInterest from "./withdrawal-interest"
import Rules from "./rules"
import TransactionDetails from "./transaction-details"
import WelfareTable from "./welfare-table"
import VirtualCoin from "./virtual-coin"
import Advantage from "./advantage"
import RevenueSteps from "./revenue-steps"
import Doubt from "./doubt"


export default {
  name: "richpay",
  components: {
    Banner,
    Wallet,
    WinningRecord,
    TransferOut,
    TransferOutGift,
    LuckDraw,
    WithdrawalInterest,
    Rules,
    TransactionDetails,
    WelfareTable,
    VirtualCoin,
    Advantage,
    RevenueSteps,
    Doubt
  },
  computed: {
    ...mapState(["richpayInitData", "isLogin"])
  },
  data() {
    return {
      transferOutBackParams: {},
      visible1: false,
      visible2: false,
      visible3: false,
      visible5: false,
      visible8: false,
      visible9: false,
      visible10: false,
      awardData: {}
    }
  },
  watch: {
    isLogin () {
      this.getRichpayData()
    }
  },
  mounted () {
    this.getRichpayData().then(() => {
      if (!this.richpayInitData.is_use_richpay) {
        this.$router.replace('/')
      }
    })
  },
  methods: {
    ...mapActions(["getRichpayData"]),
    luckDrawSuccess (data) {
      this.awardData = data
      this.visible3 = true
    },
    transferOutBack (row) {
      let timer
      clearTimeout(timer)
      timer = setTimeout(() => {
        this.transferOutBackParams = row
        this.visible8 = true
        clearTimeout(timer)
      }, 500)
    }
  },
}
</script>

<style lang="less" scoped>
.vrich {
  background-image: url("../../assets/richpay/bg_left.png"),
    url("../../assets/richpay/bg_right.png"),
    url("../../assets/richpay/banner.jpg"),
    linear-gradient(to bottom,#5767BE,#17136c)!important;
  background-position: left 1030px, right 1030px, center -70px, center 960px;
  background-repeat: no-repeat, no-repeat, no-repeat;
  padding-bottom: 45px;
  .back-active {
    margin-top: 50px;
    text-align: center;
    a {
      display: inline-block;
      width: 280px;
      height: 60px;
      font-size: 18px;
      line-height: 60px;
      text-align: center;
      color: #9de1f3;
      background: url("../../assets/richpay/back_active.png") no-repeat;
      &:hover {
        background: url("../../assets/richpay/back_active_hover.png") no-repeat;
      }
    }
  }
}
</style>

<style lang="less">
//dialog公共样式
.public_richpay_dialog {
  background-color: transparent;
  width: 630px;
  .el-dialog__header {
    height: 80px;
    background-color: transparent;
    background-image: url("../../assets/richpay/dialog_header.png");
    background-repeat: no-repeat;
    .el-dialog__title {
      display: block;
      width: 100%;
      text-align: center;
      font-size: 29px;
      font-weight: bold;
      line-height: 66px;
      color: #fff;
    }
    .el-dialog__headerbtn {
      width: 30px;
      height: 30px;
      top: -59px;
      right: 11px;
      .el-dialog__close {
        width: inherit;
        height: inherit;
        background: url("../../assets/richpay/close_dialog.png") no-repeat;
        background-position: 0, 0;
        &:hover {
          background: url("../../assets/richpay/close_dialog_hover.png") no-repeat;
          background-position: 0, 0;
        }
      }
    }
  }
  .el-dialog__body {
    position: relative;
    padding: 0;
    background: #232656;
    border-left: 1px solid #37fcff;
    border-right: 1px solid #37fcff;
    box-sizing: border-box;
    &:before, &:after {
      position: absolute;
      left: -1px;
      width: calc(100% + 2px);
      content: "";
      z-index: 1;
    }
    &:before {
      height: 42px;
      background: url("../../assets/richpay/close_dialog_top.png") no-repeat;
      background-size: 100% 100%;
      top: -34px;
    }
    &:after {
      height: 39px;
      bottom: -39px;
      background: url("../../assets/richpay/close_dialog_bottom.png") no-repeat;
      background-size: 100% 100%;
    }
    .abs_panel {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;

      .richpay_btn {
        display: block;
        width: 160px;
        height: 46px;
        color: #fff;
        font-size: 18px;
        border: 0;
        outline: 0;
        cursor: pointer;
        background: url("../../assets/richpay/btn.png") no-repeat;
        &:hover, &.active {
          color: #aaf7ff;
          font-weight: bold;
          background: url("../../assets/richpay/btn_hover.png") no-repeat;
        }
        &.disabled {
          opacity: 0.6;
          color: #fff;
          cursor: no-drop;
          font-weight: normal;
          &:hover {
            background: url("../../assets/richpay/btn.png") no-repeat;
          }
          &.active {
            color: #aaf7ff;
            font-weight: bold;
            background: url("../../assets/richpay/btn_hover.png") no-repeat;
          }
        }
      }
    }
  }
}

.richpay_home_highlight {
  color: #83f9fd;
}
//首页面板公共样式
.richpay_home_floor {
  width: 1240px;
  margin: 56px auto 0;
  .main {
    position: relative;

    &.collapse_panel {
      .richpay_head {
        cursor: pointer;
        z-index: 2;
        .fold_icon {
          display: inline-block;
          width: 30px;
          height: 24px;
          background: url("../../assets/richpay/fold_head_icon.png") no-repeat;
          margin-left: 20px;
          vertical-align: middle;
          transition: transform 0.2s;
          &.open {
            transform: rotate(180deg);
          }
        }
        &.coll {
          background: url("../../assets/richpay/header_coll.png") no-repeat;
        }
      }
      .slide-fade-enter-active {
        transition: all 0.2s;
      }
      .slide-fade-leave-active {
        transition: all 0.2s;
      }
      .slide-fade-enter, .slide-fade-leave-to {
        transform: translateY(-30px);
        opacity: 0;
      }
    }

    .richpay_head {
      line-height: 64px;
      font-size: 30px;
      font-weight: bold;
      text-align: center;
      color: #fff;
      height: 80px;
      background: url("../../assets/richpay/richpay_home_floor_header.png") no-repeat;
    }

    .richpay_content {
      border-top: 1px solid transparent;
      position: relative;
      background: #232656;
      margin: 9px auto 82px;
      border-left: 1px solid #37fcff;
      border-right: 1px solid #37fcff;
      box-sizing: border-box;
      &:before, &:after {
        content: "";
        position: absolute;
        width: calc(100% + 2px);
        left: -1px;
      }
      &:before {
        height: 42px;
        background: url("../../assets/richpay/richpay_home_floor_top.png") no-repeat;
        top: -42px;
        z-index: 1;
      }
      &:after {
        height: 38px;
        background: url("../../assets/richpay/richpay_home_floor_bottom.png") no-repeat;
        bottom: -38px;
      }

      .richpay_btn {
        display: block;
        text-align: center;
        line-height: 46px;
        width: 160px;
        height: 46px;
        color: #fff;
        font-size: 18px;
        border: 0;
        outline: 0;
        cursor: pointer;
        background: url("../../assets/richpay/btn.png") no-repeat;

        &:hover, &.active {
          color: #aaf7ff;
          background: url("../../assets/richpay/btn_hover.png") no-repeat;
        }
      }
    }
  }
}
</style>
