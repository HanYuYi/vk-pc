<template>
  <div class="ResurrectionGold-page">
    <div class="block block-fhj">
      <div class="border"></div>
      <div class="display">
        <div class="title title-hdnr">活动内容</div>
        <div class="desc">活动期间， 会员当日在电竞游戏(S12全球总决赛)中累计产生负盈利≥2,000元的会员，即可在次日领取电竞负盈利的救援金。</div>
        <div class="table">
          <div class="table-body">
            <table width="100%" border="0" align="center" cellspacing="0">
              <thead>
                <tr>
                  <th>会员等级要求</th>
                  <th>当日负盈利</th>
                  <th>救援金比例</th>
                  <th>救援金上限</th>
                  <th>流水要求</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>VIP1-VIP4</td>
                  <td>≥2,000元</td>
                  <td>0.20%</td>
                  <td class="blue">288</td>
                  <td rowspan="3">电竞1倍流水</td>
                </tr>
                <tr>
                  <td>VIP5-VIP8</td>
                  <td>≥5,000元</td>
                  <td>0.30%</td>
                  <td class="blue">388</td>
                </tr>
                <tr>
                  <td>VIP9-VIP12</td>
                  <td>≥20,000元</td>
                  <td>0.50%</td>
                  <td class="blue">888</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div :class="{ 'not-allow': initData.status == 1 || initData.status == 2 }" class="confirm-btn"
          @click="openDio">
          {{ btnText }}</div>
        <div class="desc" v-if="initData.status == 0 || initData.status == 1">昨日累计负盈利{{
          toThousands(initData.yesterday_bet || 0) }}元，今日<span v-if="initData.status == 1">已</span><span
            v-else>可</span>领<span class="white">{{ toThousands(initData.today_bonus || 0) }}</span>元
        </div>
        <div class="desc" v-if="initData.status == 2">昨日未达领取条件，今日暂不可领取</div>
      </div>
    </div>
    <!-- 活动规则 -->
    <div class="block block-gz">
      <div class="display">
        <div class="title title-hdgz">活动规则</div>
        <div class="gz-content">
          <ol>
            <li>电竞游戏场馆仅限：小艾电竞、RG电竞、IM电竞，本活动每日结算时的盈亏将累计计算。例：会员A当日投注指定赛事结算后，小艾电竞盈利5,000元，IM电竞负盈利10,000元，则该会员当日累积结算为负盈利5,000元。
            </li>

            <li>满足条件的会员需在产生负盈利的次日（00:00:00至23:59:59）期间在本活动页面申请此优惠活动，逾期则视为自动放弃。
            </li>

            <li>
              申请获得的奖金将自动派发至会员所选择的的电竞游戏钱包中，活动奖金需在电竞游戏中完成1倍流水即可转出；当会员对应电竞游戏钱包余额≤原电竞钱包余额且无未结算注单时，系统将自动判定已完成活动规定的有效流水，活动流水未完成前不可再次申请本活动。
            </li>

            <li>此活动领取当天不与电竞首存活动、PT首存活动、打虎英雄救援金活动、棋牌游戏救援金活动、VIP月救援金活动共享，每位会员每日仅限申请一次。
            </li>

            <li>有效投注额仅计算产生输赢结果的注单，电竞赔率＜1.5，走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效投注。
            </li>

            <li>每位有效玩家、每个手机号码、电子邮箱、IP地址、每张银行卡、每台设备只能享受一次优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利；VKGAME对本活动保有最终解释权。</li>
          </ol>
        </div>
      </div>
    </div>
    <el-dialog :lock-scroll="true" :append-to-body="true" width="764px" top="20vh" custom-class="lols12sub-Dialog"
      :visible.sync="isShowDio">
      <div class="close" @click="closeDio"></div>
      <div class="lols12sub-Dialog-wrapper getFhj-wrapper">
        <div class="border"></div>
        <div class="display">
          <div class="table">
            <div class="table-head">
              <span class="table-title lq-title">领取至</span>
            </div>
            <div class="table-body">
              <div class="d-flex justify-space-between" style="width:100%">
                <div class="btn-block" @click="walletIndex = i" :class="{ 'btn-block-active': walletIndex == i }"
                  v-for="(item, i) in walletList" :key="i">
                  {{ item.name }}
                </div>
              </div>
            </div>
            <div class="desc" v-if="initData.status == 0 || initData.status == 1">恭喜您<span
                v-if="initData.status == 1">已</span><span v-else>可</span>获得彩金：<span class="white">{{
                toThousands(initData.today_bonus || 0) }}</span>元
            </div>
            <div class="desc" v-else-if="initData.status == 2">昨日未达领取条件，今日暂不可领取</div>
            <div class="desc" style="visibility:hidden" v-else>XX</div>
            <div :class="{ 'not-allow': initData.status == 1 || initData.status == 2 }" class="confirm-btn"
              @click="confirm">确定</div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { toThousands } from '@/utils/util'
export default {
  name: 'ResurrectionGold',
  data() {
    return {
      isShowDio: false,
      initData: {
        active_show_time: '～',
        active_bet_limit: '1', // 几倍流水可领取彩金
        status: 0, //状态： 0  可领 1 已领取 2 昨日未达到领取条件 ** 其他
        status_tips: '',
        today_bonus: 0
      },
      walletIndex: 0,
      walletList: [
        { name: "小艾电竞钱包", code: "EG" },
        { name: "RG电竞钱包", code: "RG" },
        { name: "IM电竞钱包", code: "IM" }
      ],
      ajaxLoad: false
    }
  },
  computed: {
    ...mapState(['isLogin']),
    btnText() {
      if (this.initData.status == 1) {
        return '今日已领取'
      } else {
        return '立即领取'
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.$http(this.ApiSetting.active.lols12.sub.liveGoldInit)
        .then(res => {
          console.log('复活金初始化', res)
          if (res.status == 1 && res.data) {
            this.initData = res.data
          }
        })
    },
    toThousands(num) {
      return toThousands(num)
    },
    closeDio() {
      this.isShowDio = false
    },
    // 领取复活金
    openDio() {
      if (this.isLogin) {
        if (this.initData.status == 1 || this.initData.status == 2) {
          return;
        } else if (this.initData.status == 0) {
          this.walletIndex = 0
          this.isShowDio = true
        } else {
          this.$message({ message: this.initData.status_tips, type: 'warning' })
          return;
        }
      } else {
        this.$message({ message: '请您先登录', type: 'warning' })
        return;
      }
    },
    confirm() {
      if (this.ajaxLoad) {
        return
      }
      this.ajaxLoad = true
      this.$http(this.ApiSetting.user.transferSubmit, {
        from: 'NM',
        to: this.walletList[this.walletIndex].code,
        money: this.initData.today_bonus,
        active_id: this.initData.active_id
      })
        .then(res => {
          if (res.status == 1) {
            this.$message({
              message: `【${this.initData.today_bonus}】元彩金已转入您的【${this.walletList[this.walletIndex].name}】,需${this.initData.active_bet_limit || 1}倍流水即可转出!`,
              type: 'success'
            })
            this.initData.status = 1
            this.closeDio()
            this.init()
          }
          this.ajaxLoad = false
        }, err => {
          this.ajaxLoad = false
        })
    }
  }
}
</script>

<style lang="less">
.white {
  color: #fff !important;
}

.lols12sub-resugold-diolog {
  user-select: none;
  background: transparent;

  .el-dialog__header {
    display: none;
  }

  .el-dialog__body {
    padding: 0;
  }

  .close {
    cursor: pointer;
    position: absolute;
    bottom: -104px;
    left: 50%;
    transform: translateX(-50%);
    width: 64px;
    height: 64px;
    background: url('~@/assets/active/lols12/sub/sprite.png');
    background-position: -308px -194px;

    &:hover {
      background-position: -308px -274px;
    }
  }

  .lols12sub-dio-resuwrapper {
    height: 337px;
    width: 100%;
    box-sizing: border-box;
    border-style: solid;
    border-width: 2px;
    border-image-source: linear-gradient(to right, #563f19, #a3824b, #563f19);
    border-image-slice: 1;
    background-color: #0a0a0c;

    .resu-header {
      height: 60px;
      box-sizing: border-box;
      border-style: solid;
      border-width: 2px;
      border-image-source: linear-gradient(to right, #563f19, #a3824b, #563f19);
      border-image-slice: 1;
      border-top: none;
      border-left: none;
      border-right: none;
      background-color: #2d2517;
      font-size: 24px;
      color: #d6b598;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .resu-content {
      width: 100%;
      height: 273px;
      box-sizing: border-box;
      padding: 42px 94px;
      text-align: center;

      .desc {
        color: #d6b598;
        font-size: 14px;
        line-height: 1;
        margin-bottom: 40px;
      }

    }
  }

  .confirm-btn {
    margin: auto;
    margin-top: 40px;
    margin-bottom: 20px;
    user-select: none;
    cursor: pointer;
    background: url('~@/assets/active/lols12/sub/sprite.png');
    background-position: -118px -193px;
    color: #08e5fd;
    width: 152px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-weight: bold;
    font-size: 20px;

    &:hover {
      background: url('~@/assets/active/lols12/sub/sprite.png');
      background-position: -118px -253px;
      color: #fff;
    }

    &.not-allow {
      cursor: not-allowed;
      background-position: -118px -312px;
      color: #fff;
    }
  }
}
</style>