<template>
  <div class="s11active">
    <!-- banner-->
    <div class="s11active-banner"><s11activeMatch /></div>
    <!-- 活动面板-->
    <div class="s11active-mian">
      <ul class="tab-wrapper">
        <li :class="[`tab-1`, {'actived': activeIndex === 1}]" @click="activeIndex = 1"></li>
        <li :class="[`tab-2`, {'actived': activeIndex === 2}]" @click="activeIndex = 2"></li>
      </ul>
      <div class="active-panel">
        <s11activeRebate :visible="activeIndex === 1" />
        <s11activeChallenge :visible="activeIndex === 2" />
      </div>
    </div>
  </div>
</template>

<script>
import s11activeMatch from './s11activeMatch'
import s11activeRebate from './s11activeRebate'
import s11activeChallenge from './s11activeChallenge'

export default {
  name: 's11active',
  components: { s11activeMatch, s11activeRebate, s11activeChallenge },
  data () {
    return {
      activeIndex: 1
    }
  }
}
</script>

<style lang="less" scoped>
@icon: url("../../../assets/active/s11active/icon.png") no-repeat;

.s11active {
  background: url("../../../assets/active/s11active/bg.jpg") no-repeat center top;
  overflow: hidden;
  .s11active-banner {
    margin-top: 615px;
  }
  .s11active-mian {
    overflow: hidden;
    margin-top: 32px;
    .tab-wrapper {
      width: 1086px;
      margin: 0 auto;
      padding-bottom: 14px;
      display: flex;
      justify-content: space-evenly;
      border: 0 solid transparent;
      border-bottom: 2px solid transparent;
      border-image: linear-gradient(to right,#6798fe,#374ef8) 1 10;
      li {
        width: 408px;
        height: 60px;
        background: @icon;
        cursor: pointer;
        &.tab-1 {
          background-position: -1879px -97px;
          &.actived {
            background-position:-1879px -10px;
          }
        }
        &.tab-2 {
          background-position: -1879px -271px;
          &.actived {
            background-position: -1879px -184px;
          }
        }
      }
    }
    .active-panel {
      margin-top: 30px;
      //活动信息公共样式
      /deep/ .s11active-info {
        width: 1086px;
        margin: 0 auto;
        display: flex;
        justify-content: right;
        h1 {
          color: #374ef8;
          font-size: 120px;
          font-weight: normal;
          line-height: 84px;
          margin-right: 15px;
          small {
            display: block;
            font-size: 41px;
            line-height: 66px;
          }
        }
        p {
          width: 744px;
          height: 142px;
          padding: 0 35px;
          background: @icon;
          background-position: -252px -159px;
          font-size: 26px;
          line-height: 1.69;
          color: #fff;
          display: flex;
          align-items: center;
        }
      }
      //活动信息公共样式
      /deep/ .rules {
        margin: 100px auto 0;
        width: 1075px;
        height: 492px;
        background: @icon;
        background-position: -20px -349px;
        overflow: hidden;
        li {
          width: 949px;
          font-size: 16px;
          color: #313131;
          margin: 13px auto 0;
          i {
            display: inline-block;
            width: 24px;
            height: 30px;
            background: @icon;
            background-position: -187px -20px;
            color: #fff;
            margin-right: 12px;
            text-align: center;
            line-height: 30px;
            vertical-align: top;
          }
          &:first-child {
            margin-top: 130px;
          }
          p {
            display: inline-block;
            width: calc(949px - 36px);
          }
        }
      }
      //回到活动首页公共样式
      /deep/ .back-active {
        text-align: center;
        margin: 40px 0 54px;
        a {
          display: inline-block;
          width: 246px;
          height: 87px;
          background: @icon;
          background-position: -922px -23px;
        }
      }
    }
  }
}
</style>
