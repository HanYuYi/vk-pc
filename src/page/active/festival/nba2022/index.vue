<template>
  <div class="NBA2022-page">
    <div class="game-time">活动时间：{{active_show_time}}</div>
    <div class="nav-wrapper d-flex align-center justify-space-between">
      <div class="nav" @click="activeNav = i" :class="[`nav-${item.key}`,{'nav-active': i == activeNav}]"
        v-for="(item, i) in navMenu" :key="i">
        <span class="light"><i></i></span>
      </div>
    </div>
    <div v-cloak>
    <transition name="fade" mode="out-in">
      <main class="main-bet" v-if="activeNav == 0" key="bet">
        <div class="module-block">
          <div class="big-title title-nr"></div>
          <div class="content-wrapper nr-border">
            <div class="desc">活动期间，会员当日首充≥100元且在体育场馆投注【NBA季后赛】中累计有效投注额≥3,000元，即可申请优惠彩金，最高可领888元。</div>
            <div class="table">
              <table width="100%" border="0" align="center" cellspacing="0">
                <thead>
                  <tr>
                    <th>累计有效投注(￥)</th>
                    <th>赠送彩金(￥)</th>
                    <th>彩金流水要求</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, i) in initDataBet.active_setting.info" :key="i">
                    <td>{{toThousands(item.bet_amount)}}+</td>
                    <td>{{item.bonus}}</td>
                    <td v-if="i == 0" rowspan="9" style="line-height: 1.29;">体育{{active_bet_limit}}倍有效流水</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="btn-wrapper d-flex align-center justify-center">
              <div class="left-btn d-flex align-center justify-center">
                <div class="money-icon"></div>
                <div class="money-tips">
                  今日{{status == 1 ? '已' : '可'}}领: <span class="red num">
                    {{ status != 0 && status != 1 ? '0' : bonus }}
                  </span> 元
                </div>
              </div>
              <div @click="getBonus" class="right-btn" :class="{
              'right-btn-forbid': status == 2,
              'right-btn-avai': status == 1 || modiStatus == 1,
              }"></div>
            </div>
            <div class="btn-desc">
              <span class="border-bottom" v-if="status == 0 || status == 1">昨日累计有效投注 {{toThousands(yesterAmount)}}
                元</span>
              <span class="border-bottom" v-if="status == 2">昨日未达到领取条件，今日暂不可领取</span>
            </div>
          </div>
        </div>
        <div class="module-block">
          <div class="big-title title-gz"></div>
          <div class="content-wrapper gz-border">
            <ol>
              <li>
                每日未发起提款前的存款都视为首充。体育游戏场馆包含：威客体育、FB体育、BTI体育、皇冠体育、平博Sports、沙巴体育、IM体育。
              </li>
              <li>参与此活动优惠的会员需当日首充≥100元，且在体育场馆投注【NBA季后赛】赛事盘口。</li>
              <li>每日累计投注有效流水达到对应的额度即可领取彩金，领取时间为次日 00:30:00-23:59:59，指定时间内未领取视为自动放弃；投注返利金需完成5倍体育有效流水。</li>
              <li>用户在领取投注返利金时选择将其领取至对应的体育游戏钱包（威客体育、FB体育、BTI体育、皇冠体育、平博Sports、沙巴体育、IM体育七选一），活动流水未完成前不可再次申请。</li>
              <li>此优惠活动领取当天不与威客体育加油站活动共享。有效流水仅计算产生输赢结果的注单，亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>
                  0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水。</li>
              <li>
                每位有效玩家、每个手机号码、电子邮箱、IP地址、每张银行卡、每台设备只能享受一次优惠，参与用户必须先绑定银行卡。对违规的用户，VKGAME保留无期限审核，和扣回红利及产生的利润权利。本活动最终解释权归VKGAME所有。
              </li>
            </ol>
          </div>
        </div>
      </main>
      <main class="main-bonus" v-if="activeNav == 1" key="win">
        <div class="module-block">
          <div class="big-title title-nr"></div>
          <div class="content-wrapper nr-border">
            <div class="desc">活动期间，会员当日首充≥100元且在体育场馆投注【NBA季后赛】中累计产生盈利≥3,000元，即可申请优惠彩金，最高可领388元。</div>
            <div class="table">
              <table width="100%" border="0" align="center" cellspacing="0">
                <thead>
                  <tr>
                    <th>累计盈利(￥)</th>
                    <th>Lv0-3(￥)</th>
                    <th>Lv4-7(￥)</th>
                    <th>Lv8-11(￥)</th>
                    <th>Lv12(￥)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>3,000+</td>
                    <td>6</td>
                    <td>8</td>
                    <td>18</td>
                    <td>188</td>
                  </tr>
                  <tr>
                    <td>50,000+</td>
                    <td>8</td>
                    <td>18</td>
                    <td>28</td>
                    <td>288</td>
                  </tr>
                  <tr>
                    <td>100,000+</td>
                    <td>18</td>
                    <td>28</td>
                    <td>38</td>
                    <td>388</td>
                  </tr>
                  <tr>
                    <td class="spec-td">投注场馆要求</td>
                    <td colspan="4">威客体育、FB体育、BTI体育、皇冠体育、平博Sports、沙巴体育、IM体育</td>
                  </tr>
                  <tr>
                    <td class="spec-td">彩金流水要求</td>
                    <td colspan="4">体育{{active_bet_limit}}倍有效流水</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="btn-wrapper d-flex align-center justify-center">
              <div class="left-btn d-flex align-center justify-center">
                <div class="money-icon"></div>
                <div class="money-tips">
                  今日{{status == 1 ? '已' : '可'}}领: <span class="red num">
                    {{ status != 0 && status != 1 ? 0 : bonus }}
                  </span> 元
                </div>
              </div>
              <div @click="getBonus" class="right-btn" :class="{
                'right-btn-forbid': status == 2,
                'right-btn-avai': status == 1 || modiStatus ==1,
              }"></div>
            </div>
            <div class="btn-desc">
              <span class="border-bottom" v-if="status == 0 || status == 1">昨日累计盈利 {{toThousands(yesterAmount)}} 元</span>
              <span class="border-bottom" v-if="status == 2">昨日未达到领取条件，今日暂不可领取</span>
            </div>
          </div>
        </div>
        <div class="module-block">
          <div class="big-title title-gz"></div>
          <div class="content-wrapper gz-border">
            <ol>
              <li>
                每日未发起提款前的存款都视为首充。体育游戏场馆包含：威客体育、FB体育、BTI体育、皇冠体育、平博Sports、沙巴体育、IM体育。
              </li>
              <li>参与此活动优惠的会员需当日首充≥100元，且在体育场馆投注【NBA季后赛】赛事盘口。</li>
              <li>每日累计体育场馆盈利达到对应的额度即可领取彩金，领取时间为次日 00:30:00-23:59:59，指定时间内未领取视为自动放弃；盈利返利金需完成8倍体育有效流水。</li>
              <li>用户在领取投注返利金时选择将其领取至对应的体育游戏钱包（威客体育、FB体育、BTI体育、皇冠体育、平博Sports、沙巴体育、IM体育七选一），活动流水未完成前不可再次申请。</li>
              <li>此优惠活动领取当天不与体育连赢投注加码活动共享。彩金流水要求：仅计算产生输赢结果的注单，亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>
                  0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水。</li>
              <li>
                每位有效玩家、每个手机号码、电子邮箱、IP地址、每张银行卡、每台设备只能享受一次优惠，参与用户必须先绑定银行卡。对违规的用户，VKGAME保留无期限审核，和扣回红利及产生的利润权利。本活动最终解释权归VKGAME所有。
              </li>
            </ol>
          </div>
        </div>
      </main>
    </transition>
    </div>
    <div @click="$router.push('/active')" class="back-btn"></div>
    <el-dialog :close-on-click-modal="false" :append-to-body="true" custom-class="NBA2022-dialog" width="670px"
      top="20vh" :visible.sync="showDio" center>
      <div slot="title">温馨提示</div>
      <div class="content-wrapper">
        <div class="desc">领取<span class="red num">{{bonus}}</span>元彩金至</div>
        <div class="wallet-wrapper d-flex">
          <div @click="walletIndex = i" class="wallet-block" :class="{'wallet-block-active': i == walletIndex}"
            v-for="(item, i) in walletList" :key="i">
            {{item.name}}
          </div>
        </div>
        <div @click="transfer" class="confirm-btn"></div>
        <div class="impo-desc d-flex align-center justify-center">
          <div class="im-icon"></div>
          <div class="im-desc"><span class="red num">{{active_bet_limit}}倍</span>流水即可转出</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { toThousands } from '@/utils/util'
export default {
  name: 'nba2022',
  data() {
    return {
      showDio: false,
      modiStatus: 0,
      activeNav: 0,
      navMenu: [
        { key: 'bet', label: '(投注)返利不停' },
        { key: 'bonus', label: '(盈利)喜上加喜' }
      ],
      active_show_time: '',
      active_id: 0,
      initDataBet: {
        active_bet_limit: 5,
        active_setting: {
          info: [
            {
              bet_amount: 3000,
              bonus: 8
            },
            {
              bet_amount: 8000,
              bonus: 18
            },
            {
              bet_amount: 15000,
              bonus: 38
            },
            {
              bet_amount: 30000,
              bonus: 58
            },
            {
              bet_amount: 60000,
              bonus: 88
            },
            {
              bet_amount: 100000,
              bonus: 188
            },
            {
              bet_amount: 300000,
              bonus: 388
            },
            {
              bet_amount: 500000,
              bonus: 588
            },
            {
              bet_amount: 1000000,
              bonus: 888
            }
          ]
        },
        today_bonus: 0,
        status: 0,
        yesterday_bet: 0,
        active_type: 1,
        status_tips: ''
      },
      initDataWin: {
        active_bet_limit: 8,
        active_setting: {},
        today_bonus: 0,
        status: 0,
        yesterday_profit: 0,
        active_type: 2,
        status_tips: ''
      },
      walletIndex: 0,
      walletList: [
        { name: '威客体育钱包', code: 'SABACV' },
        { name: 'FB体育钱包', code: 'FB' },
        { name: 'BTI体育钱包', code: 'BTI' },
        { name: '皇冠体育钱包', code: 'CROWN' },
        { name: '平博体育钱包', code: 'PINNACLE' },
        { name: '沙巴体育钱包', code: 'SABA' },
        { name: 'IM体育钱包', code: 'IMSB' }
      ],
      loadBet: false,
      loadWin: false,
      ajaxLoad: false,
    }
  },
  created() {
    this.init()
  },
  computed: {
    ...mapState(['isLogin']),
    active_bet_limit() {
      return this.activeNav == 0 ? this.initDataBet.active_bet_limit : this.initDataWin.active_bet_limit
    },
    active_setting() {
      return this.activeNav == 0 ? this.initDataBet.active_setting : this.initDataWin.active_setting
    },
    bonus() {
      return this.activeNav == 0 ? this.initDataBet.today_bonus : this.initDataWin.today_bonus
    },
    // 状态： 0  可领   1 已领取 2 昨日未达到领取条件  *** 其他状态
    status() {
      return this.activeNav == 0 ? this.initDataBet.status : this.initDataWin.status
    },
    yesterAmount() {
      return this.activeNav == 0 ? this.initDataBet.yesterday_bet : this.initDataWin.yesterday_profit
    },
    active_type() {
      return this.activeNav == 0 ? this.initDataBet.active_type : this.initDataWin.active_type
    },
    status_tips() {
      return this.activeNav == 0 ? this.initDataBet.status_tips : this.initDataWin.status_tips
    }
  },
  methods: {
    toThousands(num) {
      return toThousands(num)
    },
    init() {
      this.$http(this.ApiSetting.active.nba2022.getNbaInit)
        .then(res => {
          console.log('res', res)
          if (res.status == 1 && res.data) {
            this.active_show_time = res.data.active_show_time
            this.active_id = res.data.active_id
            if (res.data.wallet_list.length) {
              this.walletList = res.data.wallet_list
            }
          }
        })
      this.initBet()
      this.initWin()
    },
    closeDio() {
      this.showDio = false
    },
    getBonus() {
      if (this.isLogin) {
        if (this.status == 1 || this.status == 2) {
          return;
        } else if (this.status == 0) {
          this.walletIndex = 0
          this.showDio = true
        } else {
          return this.$message({ message: this.status_tips, type: 'warning' })
        }
      } else {
        return this.$message({ message: '请您先登录', type: 'warning' })
      }
    },
    transfer() {
      if (this.ajaxLoad) {
        return
      }
      this.ajaxLoad = true
      this.$http(this.ApiSetting.user.transferSubmit, {
        from: 'NM',
        to: this.walletList[this.walletIndex].code,
        money: this.bonus,
        active_id: this.active_id,
        active_type: this.active_type
      })
        .then(res => {
          if (res.status == 1) {
            this.$message({
              message: `【${this.bonus}】元彩金已转入您的【${this.walletList[this.walletIndex].name}】,需${this.active_bet_limit}倍流水即可转出!`,
              type: 'success'
            })
            this.modiStatus = 1
            this.closeDio()
            if (this.activeNav == 0) {
              this.initBet()
            } else {
              this.initWin()
            }
          }
          this.ajaxLoad = false
        }, err => {
          this.ajaxLoad = false
        })
    },
    initBet() {
      if (this.loadBet) {
        return
      }
      this.loadBet = true
      this.$http(this.ApiSetting.active.nba2022.getNbaBetInit)
        .then(res => {
          console.log('NBA投注返利初始化', res)
          this.loadBet = false
          if (res.status == 1 && res.data) {
            this.initDataBet = res.data
            this.modiStatus = 0
          }
        })
        .catch(err => {
          this.loadBet = false
        })
    },
    initWin() {
      if (this.loadWin) {
        return
      }
      this.loadWin = true
      this.$http(this.ApiSetting.active.nba2022.getNbaWinInit)
        .then(res => {
          console.log('NBA盈利初始化', res)
          this.loadWin = false
          if (res.status == 1 && res.data) {
            this.initDataWin = res.data
            this.modiStatus = 0
          }
        })
        .catch(err => {
          this.loadWin = false
        })
    },
  }
}
</script>

<style lang="less" scoped>
@keyframes light {
  0% {
    left: -180px;
  }

  25% {
    left: 460px;
  }

  100% {
    left: 460px;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: all .2s;
}
.fade-enter,
.fade-leave-to
  {
  transform: translateY(40px);
}

.NBA2022-page {
  min-height: 100vh;
  background: url('~@/assets/active/sports/nba2022/bg.jpg') center top no-repeat;
  padding-top: 686px;
  padding-bottom: 51px;
  overflow: hidden;
  position: relative;
  color: #fff;

  .red {
    color: #ff225e;
  }

  .num {
    font-family: Roboto;
    font-size: 20px;
  }

  .game-time {
    width: 530px;
    margin: auto;
    text-align: center;
    font-size: 18px;
    line-height: 1;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: -5.5px;
      width: 32px;
      height: 29px;
      background: url('~@/assets/active/sports/nba2022/time-left.png') center no-repeat;
      background-size: 100% 100%;
    }

    &::after {
      content: '';
      position: absolute;
      right: 0;
      top: -5.5px;
      width: 32px;
      height: 29px;
      background: url('~@/assets/active/sports/nba2022/time-right.png') center no-repeat;
      background-size: 100% 100%;
    }
  }

  .nav-wrapper {
    width: 910px;
    margin: auto;
    margin-top: 151px;

    .nav {
      cursor: pointer;
      width: 440px;
      height: 90px;
      background-position: center;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      position: relative;
      overflow: hidden;
      transition: filter 0.1s;

      .light {
        cursor: pointer;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;

        i {
          position: absolute;
          left: -200px;
          top: 0;
          width: 180px;
          height: 100%;
          transform: skewx(-25deg);
        }
      }

      &:hover {
        filter: contrast(110%);
      }

      &.nav-bet {
        background-image: url('~@/assets/active/sports/nba2022/bet.png');

        .light {
          i {
            background-image: linear-gradient(269deg, rgba(255, 219, 157, 0), rgba(255, 255, 255, 0.15), rgba(255, 219, 157, 0));
            animation: light 3s 2s linear infinite;
          }
        }

        &.nav-active {
          background-image: url('~@/assets/active/sports/nba2022/bet-active.png');
        }
      }

      &.nav-bonus {
        background-image: url('~@/assets/active/sports/nba2022/win.jpg');

        .light {
          i {
            background-image: linear-gradient(269deg, rgba(255, 219, 157, 0), rgba(255, 255, 255, 0.15), rgba(255, 219, 157, 0));
            animation: light 3s 2.5s linear infinite;
          }
        }


        &.nav-active {
          background-image: url('~@/assets/active/sports/nba2022/win-active.jpg');
        }
      }
    }
  }

  .module-block {
    margin-top: 50px;
  }

  main {
    width: 1031px;
    margin: auto;

    .table {
      width: 910px;
    }

    .big-title {
      margin: auto;
      width: 274px;
      height: 69px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100% 100%;
      margin-bottom: 18px;

      &.title-nr {
        background-image: url('~@/assets/active/sports/nba2022/title-nr.png');
      }

      &.title-gz {
        background-image: url('~@/assets/active/sports/nba2022/title-gz.png');
      }
    }

    .content-wrapper {
      width: 100%;
      box-sizing: border-box;
      background-size: 100% 100%;

      .desc {
        font-size: 14px;
        color: #d7e3ff;
        text-align: center;
        margin-bottom: 38px;
        line-height: 1;
      }

      ol {
        padding-left: 0;
        list-style: decimal;
      }

      li {
        list-style: decimal;
        margin-bottom: 15px;
        position: relative;
        line-height: 1.71;

        &:last-of-type {
          margin-bottom: 0;
        }

        &::marker {
          color: transparent;
        }

        &::before {
          content: '';
          position: absolute;
          top: 1px;
          left: -31px;
          width: 18px;
          height: 18px;
          background: url('~@/assets/active/sports/nba2022/num-icon.png') center no-repeat;
          background-size: 100% 100%;
        }
      }
    }

    &.main-bet {
      .nr-border {
        padding: 40px 56px 40px 65px;
        height: 773px;
        background: url('~@/assets/active/sports/nba2022/border-nr.png') center no-repeat;
      }

      .gz-border {
        font-size: 14px;
        color: #d7e3ff;
        padding: 50px 103px 50px 136px;
        height: 433px;
        background: url('~@/assets/active/sports/nba2022/border-gz.png') center no-repeat;
      }
    }

    &.main-bonus {
      .nr-border {
        padding: 40px 56px 40px 65px;
        height: 577px;
        background: url('~@/assets/active/sports/nba2022/win-border-nr.png') center no-repeat;
      }

      .gz-border {
        font-size: 14px;
        color: #d7e3ff;
        padding: 50px 103px 50px 136px;
        height: 457px;
        background: url('~@/assets/active/sports/nba2022/win-border-gz.png') center no-repeat;
      }
    }
  }

  table {
    box-sizing: border-box;
    text-align: center;
    border-right: solid 1px #fe0043;

    th {
      font-size: 16px;
      font-weight: bold;
      height: 50px;
      box-sizing: border-box;
      box-shadow: inset 0px -2px 8.4px 1.6px rgba(250, 37, 93, 0.4);
      border-left: solid 1px #fe0043;
      border-bottom: solid 1px #fe0043;
      background-image: linear-gradient(to top, #982742, #c81544);
    }

    td {
      font-size: 16px;
      height: 50px;
      box-sizing: border-box;
      border-left: solid 1px #fe0043;
      border-bottom: solid 1px #fe0043;

      &.spec-td {
        font-weight: bold;
        background-image: linear-gradient(to top, #982742, #c81544);
        box-shadow: inset 0px -2px 8.4px 1.6px rgba(250, 37, 93, 0.4);
      }
    }

    tr {
      &:nth-child(odd) {
        background-color: #872139;
      }

      &:nth-child(even) {
        background-color: #9a2742;
      }
    }
  }

  .btn-wrapper {
    margin: auto;
    margin-top: 30px;
    color: #d7e3ff;
    font-size: 18px;

    .left-btn {
      width: 312px;
      height: 60px;
      box-sizing: border-box;
      border-style: solid;
      border-width: 2px;
      border-image-source: linear-gradient(to top, #ff0043, #930c2f);
      border-image-slice: 1;
    }

    .money-icon {
      width: 28px;
      height: 30px;
      background: url('~@/assets/active/sports/nba2022/money-icon.png') center no-repeat;
      background-size: 100% 100%;
      margin-right: 13px;
    }

    .right-btn {
      cursor: pointer;
      margin-left: -2px;
      width: 221px;
      height: 60px;
      background: url('~@/assets/active/sports/nba2022/get-btn.png') center no-repeat;
      background-size: 100% 100%;

      &:hover {
        background-image: url('~@/assets/active/sports/nba2022/get-btn-hover.png');
      }

      &.right-btn-forbid {
        cursor: not-allowed;
        background-image: url('~@/assets/active/sports/nba2022/forbi.png');
      }

      &.right-btn-avai {
        cursor: not-allowed;
        background-image: url('~@/assets/active/sports/nba2022/avai.png');
      }
    }
  }

  .btn-desc {
    text-align: center;
    margin: 28px auto 0;
    font-size: 18px;

    .border-bottom {
      position: relative;
      transform-style: preserve-3d;

      &::before {
        content: '';
        position: absolute;
        bottom: -3px;
        left: 0;
        width: 100%;
        height: 8px;
        background-color: #cb334b;
        z-index: -1;
      }
    }
  }

  .back-btn {
    cursor: pointer;
    margin: auto;
    margin-top: 50px;
    width: 211px;
    height: 64px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
    background-image: url('~@/assets/active/sports/nba2022/back-btn.png');

    &:hover {
      background-image: url('~@/assets/active/sports/nba2022/back-btn-hover.png');
    }
  }
}

/deep/.NBA2022-dialog {
  background-color: #101b36;
  border: solid 1px #e24f78;
  height: 373px;

  .red {
    color: #ff225e;
  }

  .num {
    font-family: Roboto;
    font-size: 20px;
    font-weight: bold;
  }

  .el-dialog__header {
    box-shadow: inset 0px -2px 8.4px 1.6px rgba(250, 37, 93, 0.4);
    background-image: linear-gradient(to top, #982742, #c81544);
    font-weight: bold;
    background-color: transparent;

    .el-dialog__headerbtn {
      top: -58px;
      right: -6px;

      .el-dialog__close {
        width: 37px;
        height: 37px;
        background: url('~@/assets/active/sports/nba2022/close-icon.png') center no-repeat;
        background-size: 100% 100%;
      }
    }
  }

  .el-dialog__body {
    box-sizing: border-box;
    padding-left: 39px;
    padding-right: 38px;
    color: #d7e3ff;
  }

  .desc {
    font-size: 16px;
    color: #fff;
  }

  .wallet-wrapper {
    margin-top: 22px;
    flex-wrap: wrap;

    .wallet-block {
      cursor: pointer;
      width: 140px;
      height: 50px;
      box-sizing: border-box;
      border: solid 1px #485471;
      background-color: #152041;
      margin-right: 10px;
      margin-bottom: 10px;
      line-height: 50px;
      position: relative;

      &:nth-child(4n) {
        margin-right: 0;
      }

      &.wallet-block-active {
        border-color: #ff225e;
        background-color: #0f1b38;
        color: #ff0043;
        font-weight: bold;

        &::after {
          content: '';
          position: absolute;
          right: 0;
          bottom: 0;
          width: 30px;
          height: 30px;
          background: url('~@/assets/active/sports/nba2022/gou.png') center no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }

  .confirm-btn {
    margin: 20px auto;
    cursor: pointer;
    width: 221px;
    height: 50px;
    background: url('~@/assets/active/sports/nba2022/confirm.png') center no-repeat;
    background-size: 100% 100%;

    &:hover {
      background-image: url('~@/assets/active/sports/nba2022/confirm-hover.png');
    }
  }

  .impo-desc {
    color: #c0bdc8;
    font-size: 14px;

    .num {
      font-size: 14px;
    }

    .im-icon {
      width: 18px;
      height: 18px;
      background: url('~@/assets/active/sports/nba2022/im-icon.png') center no-repeat;
      background-size: 100% 100%;
      margin-right: 7px;
    }
  }
}
</style>
