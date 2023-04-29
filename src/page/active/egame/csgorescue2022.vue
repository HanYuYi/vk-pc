<template>
  <div class="csgorescue2022">

    <p class="date-time">{{ initInfo.active_show_time || '加载中...' }}</p>

    <!-- 内容-->
    <h1 class="csgorescue2022-title content-title"></h1>
    <!-- 描述-->
    <p class="csgorescue2022-desc">
      活动期间， 凡当日首充≥{{amountForDay}}且在电竞游戏(LPL夏季赛)中累计产生负盈利≥{{initInfo.active_setting[0] ? initInfo.active_setting[0].profit : 0}}的会员，即可在次日领取电竞负盈利的救援金。
    </p>
    <!-- table-->
    <div class="csgorescue2022-table-panel">
      <table>
        <tr>
          <td>当日首充</td>
          <td colspan="5">当日首充≥500且在指定游戏场馆中投注2022英雄联盟LPL夏季赛相关盘口</td>
        </tr>
        <tr>
          <td>当日累计负盈利</td>
          <td v-for="(item, index) in initInfo.active_setting" :key="index">≥{{ item.profit }}</td>
        </tr>
        <tr>
          <td>次日可领救援金</td>
          <td v-for="(item, index) in initInfo.active_setting" :key="index">{{ item.bonus }}元</td>
        </tr>
        <tr>
          <td>彩金流水限制</td>
          <td colspan="5">电竞游戏1倍流水</td>
        </tr>
      </table>
    </div>

    <!-- 昨日累计负盈利-->
    <p v-if="initInfo.is_login" class="csgorescue2022-profit">
      <span v-if="initInfo.status === 0 || initInfo.status === 1">昨日累计负盈利 {{ formatNumber(initInfo.yesterday_profit) }} 元</span>
      <span v-if="initInfo.status === 2 || initInfo.status === 3 || initInfo.status === 4">{{ initInfo.status_tips }}</span>
    </p>

    <!-- 领取-->
    <div class="csgorescue2022-amount">
      <h3><i></i>今日{{initInfo.status === 1 ? '已' : '可'}}领：
        <span v-if="initInfo.is_login && (initInfo.status === 0 || initInfo.status === 1)">{{ initInfo.today_bonus }}</span>
        <span v-else>0</span>
        元
      </h3>
      <template v-if="initInfo.is_login">
        <button v-if="initInfo.status === 0" @click="showApplyDialog"></button>
        <button v-else-if="initInfo.status === 1" class="received"></button>
        <button v-else-if="initInfo.status === 2 || initInfo.status === 3 || initInfo.status === 4" class="disabled"></button>
        <button v-else @click="clickTip"></button>
      </template>
      <button v-else @click="clickTip"></button>
    </div>

    <!-- 规则-->
    <h1 class="csgorescue2022-title rule-title"></h1>
    <ul class="csgorescue2022-rule">
      <li><i>1</i>电竞游戏场馆仅限：小艾电竞、IM电竞，本活动每日结算时的盈亏将累计计算。<br>例：会员A当日首充≥{{amountForDay}}，投注指定赛事结算后，小艾电竞盈利5000，IM电竞负盈利10000，则该会员当日累积结算为负盈利5000，次日可领取88元的救援彩金。</li>
      <li><i>2</i>VIP会员每日未提款前的累计有效存款都视为首充。</li>
      <li><i>3</i>满足条件的会员需在产生负盈利的次日（00:00:00至23:59:59）期间在本活动页面申请此优惠活动，逾期则视为自动放弃。</li>
      <li><i>4</i>申请获得的奖金将自动派发至会员所选择的的电竞游戏钱包中，活动奖金需在电竞游戏中完成1倍流水即可转出；当会员对应电竞游戏钱包余额≤原电竞钱包余额且无未结算注单时，系统将自动判定已完成活动规定的有效流水，活动流水未完成前不可再次申请本活动。</li>
      <li><i>5</i>此活动领取当天不与电竞首存活动、PT首存活动、打虎英雄救援金活动、棋牌游戏救援金活动、VIP月救援金活动共享，每位会员每日仅限申请一次。</li>
      <li><i>6</i>有效投注额仅计算产生输赢结果的注单，电竞赔率＜1.5，走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效投注。</li>
      <li><i>7</i>每位有效玩家、每一手机号码、电子邮箱、相同银行卡、每一个IP地址、每一台电脑者只能享受一次优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利。VKGAME对本活动保有最终解释权。</li>
    </ul>

    <div class="csgorescue2022-back">
      <router-link to="/active"/>
    </div>

    <Csgorescue2022Take :visible.sync="takeVisible" :params="initInfo" @successBack="getInit"/>
  </div>
</template>

<script>
import Csgorescue2022Take from './csgorescue2022Take'
import { mapState } from 'vuex'
import { formatNumberSplit } from '@/utils/util'

export default {
  name: 'csgorescue2022',
  components: { Csgorescue2022Take },
  data() {
    return {
      takeVisible: false,
      amountForDay: 500,
      initInfo:{
        active_setting: []
      },
      loading: false
    }
  },
  watch: {
    isLogin() {
      this.getInit()
    }
  },
  computed: {
    ...mapState(["isLogin"])
  },
  mounted () {
    this.getInit()
    console.info("lpl活动状态：status", [
      [0, "可领取"],
      [1, "已领取"],
      [2, "有活动流水未完成"],
      [3, "今日已参与XXX活动，暂不可参与本活动"],
      [4, "昨日未达领取条件，今日暂不可领取"]
    ])
  },
  methods: {
    formatNumber(money){
      return formatNumberSplit(money)
    },
    // 初始化活动信息
    getInit() {
      this.loading = true
      this.$http(this.ApiSetting.active.getResuce2022Init)
        .then(res => {
          if(res.status === 1 && res.data) {
            this.initInfo = res.data;
          } else {
            this.initInfo = {
              active_setting: []
            }
          }
          console.info("初始化lpl活动信息：", res)
        })
        .finally(() => {
          this.loading = false
        })
    },
    // 点击提示
    clickTip() {
      if (this.loading) {
        this.$message({ message: "加载中，请稍等...", type: "warning" })
        return
      }
      this.$message({ message: this.initInfo.status_tips, type: "warning" })
    },
    // 开启立即领取
    showApplyDialog() {
      this.takeVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
.csgorescue2022 {
  overflow: hidden;
  background: url("../../../assets/active/csgorescue2022/banner.jpg") no-repeat center 80px;
  .date-time {
    margin-top: 555px;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: #fff;
  }
  &-title {
    width: 909px;
    height: 114px;
  }
  .content-title {
    margin: 123px auto 0;
    background: url("../../../assets/active/csgorescue2022/title_main.png") no-repeat;
  }
  .rule-title {
    margin: 49px auto 0;
    background: url("../../../assets/active/csgorescue2022/rule_title.png") no-repeat;
  }
  &-desc {
    margin: 22px auto 0;
    font-size: 14px;
    line-height: 14px;
    text-align: center;
    color: #c0bdc8;
  }
  &-table-panel {
    margin: 29px auto 0;
    width: 1028px;
    height: 179px;
    background: url("../../../assets/active/csgorescue2022/table_bg.png") no-repeat;
    overflow: hidden;
    table {
      width: calc(100% - 8px);
      margin: 16px auto 0;
      color: #fff;
      font-size: 14px;
      tr {
        td {
          border-top: 1px solid #b33642;
          border-left: 1px solid #b33642;
          text-align: center;
          height: 40px;
          &:first-child {
            width: 191px;
            border-left: 0;
          }
        }
        &:first-child {
          td {
            border-top: 0;
          }
        }
      }
    }
  }
  &-profit {
    margin-top: 29px;
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
  &-amount {
    margin: 30px auto 0;
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
      color: #c0bdc8;
      flex: 1;
      i {
        vertical-align: middle;
        display: inline-block;
        margin: 0 13px 0 23px;
        width: 28px;
        height: 30px;
        background: url("../../../assets/active/csgorescue2022/amount_icon.png");
      }
      span {
        color: #ed272c;
      }
    }
    button {
      width: 236px;
      height: 82px;
      margin-top: -12px;
      border: 0;
      outline: 0;
      background: url("../../../assets/active/csgorescue2022/get_amount_btn.png") no-repeat;
      cursor: pointer;
      &.received {
        cursor: no-drop;
        background: url("../../../assets/active/csgorescue2022/get_amount_received.png") no-repeat;
      }
      &.disabled {
        cursor: no-drop;
        background: url("../../../assets/active/csgorescue2022/get_amount_disabled.png") no-repeat;
      }
    }
  }

  &-rule {
    width: 1028px;
    height: 459px;
    padding-top: 45px;
    margin: 20px auto 0;
    background: url("../../../assets/active/csgorescue2022/rule_panel_icon.png") no-repeat;
    li {
      margin: 14px 0 0 164px;
      width: 760px;
      font-size: 14px;
      line-height: 24px;
      color: #c0bdc8;
      position: relative;
      i {
        display: inline-block;
        position: absolute;
        content: "";
        left: -33px;
        top: 5px;
        width: 22px;
        height: 22px;
        text-align: center;
        line-height: 22px;
        background: url("../../../assets/active/csgorescue2022/rule_num.png") no-repeat;
        font-size: 12px;
        color: #fff;
      }
      &:first-child {
        margin: 0 0 0 164px;
      }
    }
  }
  &-back {
    margin: 35px 0 5px;
    text-align: center;
    a {
      display: inline-block;
      width: 304px;
      height: 110px;
      background: url("../../../assets/active/csgorescue2022/back.png") no-repeat;
    }
  }
}
</style>
