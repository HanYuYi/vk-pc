<template>
  <div v-show="visible" class="s11activeChallenge">
    <!-- 活动信息-->
    <div class="s11active-info">
      <h1>{{ initInfo.active_show_time[0] }}<small>{{ initInfo.active_show_time[1] }}</small></h1>
      <p>活动期间，会员投注【S11全球总决赛】赛事早盘，单场比赛的单笔有效投注≥{{ minBetAmount }}元，若出现以下事件即可领取相对应的彩金。</p>
    </div>
    <!-- 活动规则列表-->
    <div class="challenge-table">
      <table>
        <tr><th v-for="(title, index) in initInfo.active_table[0] || []" :key="index">{{ title }}</th></tr>
        <tr v-for="(item, index) in initInfo.active_table.slice(1, initInfo.active_table.length)" :key="index">
          <td v-for="(value, index) in item" :key="index">{{ value }}</td>
        </tr>
      </table>
      <p class="note"><small>*</small>以上所有彩金，流水要求为：1倍电竞流水&nbsp;&nbsp;&nbsp;&nbsp;电竞场馆要求：小艾电竞、小艾彩池电竞、RG电竞、IM电竞</p>
    </div>

    <!-- 联系客服-->
    <div class="contact-kf">
      <a @click="openKfWindow()"></a>
    </div>

    <!-- 活动规则-->
    <ul class="rules">
      <li><i>1</i><p>此优惠活动只计算会员在指定场馆中投注【S11全球总决赛】单场比赛的单笔有效投注，若投注其他赛事则不计算流水。</p></li>
      <li><i>2</i><p>此优惠活动只计算单场比赛中出现的事件而不计算事件出现的次数，会员每天只限领取一次彩金。</p></li>
      <li><i>3</i><p>参与此优惠的会员需要在【S11全球总决赛】中投注早盘。有效流水仅计算产生输赢结果的注单，电竞赔率＜1.5、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水。</p></li>
      <li><i>4</i><p>此活动中规定的事件，只要双方队伍中任何一名选手满足其中任何一个事件，会员即可领取彩金。符合条件的会员需在比赛结束后的24小时之内联系在线客服申请彩金，逾期则视为自动放弃。</p></li>
      <li><i>5</i><p>彩金将在审核通过后的3日内派发至用户指定的电竞钱包（小艾电竞、小艾彩池电竞、RG电竞、IM电竞）中，彩金需在所选游戏中完成对应的流水要求，流水未完成前不可再次申请本活动；当用户对应电竞钱包余额≤原钱包余额且无未结算注单时，系统将自动判定已完成活动规定的有效流水。电竞赔率＜1.5、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水。</p></li>
      <li><i>6</i><p>每位有效玩家、每一手机号码、电子邮箱、相同银行卡、每一个IP地址、每一台电脑者只能享受一次优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利。VKGAME对本活动保有最终解释权。</p></li>
    </ul>

    <!-- 回到活动首页-->
    <div class="back-active">
      <router-link to="/active"></router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 's11activeChallenge',
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  watch: {
    visible (bool) {
      if (bool) {
        this.initChallengeData()
      }
    }
  },
  computed: {
    minBetAmount () {
      const tableLength = this.initInfo.active_table.length
      const lastRow = tableLength ? this.initInfo.active_table[tableLength - 1] : []
      return lastRow.length ? lastRow[lastRow.length - 1] : 0
    }
  },
  data () {
    return {
      initInfo: {
        active_show_time: [],
        active_table: []
      }
    }
  },
  methods: {
    initChallengeData () {
      this.$http(this.ApiSetting.active.lolS11PlayChallangeInit)
        .then(response => {
          if (response.status === 1) {
            this.initInfo = response.data
          }
        })
    }
  }
}
</script>

<style lang="less" scoped>
@icon: url("../../../assets/active/s11active/icon.png") no-repeat;

.s11activeChallenge {
  .challenge-table {
    width: 1086px;
    margin: -8px auto 0;
    table {
      width: 100%;
      height: 522px;
      background: @icon;
      background-position: -1162px -528px;
      font-size: 28px;
      text-align: center;
      color: #313131;
      tr {
        width: 100%;
        line-height: 87px;
        th {
          color: #ffffff;
        }
        td {
          width: 25%;
        }
      }
    }
    .note {
      font-size: 14px;
      color: #313131;
      line-height: 14px;
      margin-top: 10px;
      small {
        font-size: 30px;
        color: #f84937;
        line-height: 14px;
        vertical-align: text-bottom;
        margin-right: 5px;
      }
    }
  }
  .contact-kf {
    text-align: center;
    margin-top: 46px;
    a {
      display: inline-block;
      width: 186px;
      height: 67px;
      background: @icon;
      background-position: -1252px -29px;
      cursor: pointer;
    }
  }
}
</style>
