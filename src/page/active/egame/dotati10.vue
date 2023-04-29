<template>
  <div ref="dotati10Ref" class="dotati10">
    <!-- 背景-->
    <div class="dotati10-bg">
      <video autoplay loop playsinline muted poster="../../../assets/active/dotati10/video_poster.jpg">
        <source src="../../../assets/active/dotati10/dotati10_video.mp4" type="video/mp4">
      </video>
      <div class="bottom-bg"></div>
    </div>
    <!-- slogan-->
    <div class="dotati10-title"></div>
    <!-- 赛事列表-->
    <dotati10BannerMatch/>
    <div class="active-tab">
      <button @click="activeIndex = 1" :class="{active: activeIndex === 1}">每日充值返利</button>
      <button @click="activeIndex = 2" :class="{active: activeIndex === 2}">瓜分百万奖池</button>
    </div>
    <!-- 活动面板-->
    <div class="active-panel">
      <!-- 活动一-->
      <dotati10Rebate ref="dotati10RebateRef" :visible="activeIndex" @visibleModal="visibleWalletModal = true" />
      <!-- 活动二-->
      <dotati10Jackpot :visible="activeIndex"  @visibleModal="openAwardRecordModal" @prizeData="openPrizeData" />
    </div>
    <!-- 每日充值返利-选择钱包dialog-->
    <dotati10WalletModal :visible.sync="visibleWalletModal" @callbackWallet="toReceiveDotati10Rebate" />
    <!-- 瓜分百万奖池-获奖记录dialog-->
    <dotati10AwardRecordModal :visible.sync="visibleAwardRecordModal" :noPrize="historyRecordNoPrize" />
    <!-- 瓜分百万奖池-静态奖品展示dialog-->
    <dotati10PrizeModel :visible.sync="visiblePrizeModal" :prizeList="prize_list" />
    <!-- 瓜分百万奖池-获奖提示dialog-->
    <dotati10WinningTipsModel v-if="activeIndex === 2" />
  </div>
</template>

<script>
import dotati10BannerMatch from './dotati10BannerMatch'
import dotati10Rebate from './dotati10Rebate'
import dotati10Jackpot from './dotati10Jackpot'
import dotati10WalletModal from './dotati10WalletModal'
import dotati10AwardRecordModal from './dotati10AwardRecordModal'
import dotati10PrizeModel from './dotati10PrizeModel'
import dotati10WinningTipsModel from './dotati10WinningTipsModel'

export default {
  name: 'dotati10',
  components: { dotati10BannerMatch, dotati10Rebate, dotati10Jackpot, dotati10WalletModal, dotati10AwardRecordModal, dotati10PrizeModel, dotati10WinningTipsModel },
  data () {
    return {
      activeIndex: 1,
      visibleWalletModal: false,
      visibleAwardRecordModal: false,
      visiblePrizeModal: false,
      prize_list: [],
      historyRecordNoPrize: false
    }
  },
  methods: {
    toReceiveDotati10Rebate (code) {
      this.$refs.dotati10RebateRef.receiveDotati10Rebate(code)
    },
    openPrizeData (list) {
      this.prize_list = list
      this.visiblePrizeModal = true
    },
    openAwardRecordModal (bool) {
      this.historyRecordNoPrize = bool
      this.visibleAwardRecordModal = true
    }
  }
}
</script>

<style lang="less" scoped>
@icon: url("../../../assets/active/dotati10/icon.png");

.dotati10 {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .dotati10-bg {
    position: absolute;
    margin-top: -295px;
    width: 100%;
    height: calc(100% + 295px);
    top: 0;
    left: 0;
    video {
      width: 100%;
    }
    .bottom-bg {
      margin-top: -3px;
      height: 100%;
      background: url("../../../assets/active/dotati10/bg.jpg") no-repeat 0 -154px;
    }
  }
  .dotati10-title {
    width: 1136px;
    height: 377px;
    margin-top: 283px;
    z-index: 1;
    background: url("../../../assets/active/dotati10/slogan.png");
  }
  .active-tab {
    text-align: center;
    margin-top: 5px;
    z-index: 1;
    button {
      width: 300px;
      height: 87px;
      cursor: pointer;
      outline: 0;
      border: 0;
      font-size: 26px;
      color: #ffe77b;
      background: @icon;
      background-position: -284px -147px;
      &:hover, &.active {
        background-position: -284px -27px;
        color: #fff;
      }
    }
  }
  .active-panel {
    z-index: 1;
  }

  //dialog工公样式
  /deep/ .dialog-panel {
    height: 454px;
    margin-top: calc((100vh - 454px) / 2) !important;
    border-style: solid;
    border-width: 2px;
    border-image-source: linear-gradient(to top, #4e5761, #705446);
    border-image-slice: 1;
    background-image: linear-gradient(to top, #14151a, #2d2018);
    box-shadow: 0 0 15px 0 #705446 inset;
    .el-dialog__header {
      height: 0;
      .el-dialog__headerbtn {
        width: 20px;
        height: 20px;
        top: 11px;
        right: 11px;
        .el-dialog__close {
          width: 20px;
          height: 20px;
          background: @icon;
          background-position: -692px -1096px;
          &:hover {
            background-position: -692px -1126px;
          }
        }
      }
    }

    .el-dialog__body {
      width: 400px;
      margin: 35px auto 0;
      padding: 0;
      .dialog-main {
        h1 {
          width: 400px;
          height: 56px;
          background: @icon;
          background-position: -783px -1457px;
          font-size: 26px;
          font-weight: bold;
          line-height: 56px;
          color: #442f1c;
          text-align: center;
          margin: 0 auto;
        }
        small {
          display: block;
          font-size: 14px;
          line-height: 14px;
          text-align: left;
          color: #f8e8b9;
          margin-top: 32px;
        }
        .submit {
          display: block;
          width: 130px;
          height: 39px;
          margin: 25px auto 0;
          outline: 0;
          border: 0;
          cursor: pointer;
          font-size: 18px;
          color: #442f1c;
          background: @icon;
          background-position: -1035px -1077px;
          &:hover {
            background-position: -1035px -1128px;
          }
        }
      }
    }
  }
}
</style>
