<template>
  <div class="data2major-page">
    <div class="bg">
      <div class="content-wrapper">
        <div class="time-block block">
          <div class="title">活动时间</div>
          <div class="text time-text">{{initData.active_show_time}}</div>
        </div>
      </div>
      <div class="content-wrapper">
        <div class="desc-block block">
          <div class="title">活动内容</div>
          <div class="text desc-text">会员每日首充≥100元且在【DOTA2阿灵顿Major】中累计有效流水达到指定金额，即可领取彩金。</div>
          <div class="table-wrapper">
            <table width="100%" border="0" align="center" cellspacing="0">
              <thead>
                <tr>
                  <th>有效投注</th>
                  <th>VIP1-3级</th>
                  <th>VIP4-6级</th>
                  <th>VIP7-9级</th>
                  <th>VIP10-12级</th>
                  <th>投注场馆要求</th>
                  <th>彩金流水要求</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>500+</td>
                  <td class="theme">18元</td>
                  <td class="theme">28元</td>
                  <td class="theme">38元</td>
                  <td class="theme">58元</td>
                  <td rowspan="4" style="line-height: 2.86;">小艾电竞<br/>IM电竞</td>
                  <td rowspan="4">{{initData.active_bet_limit}}倍电竞流水</td>
                </tr>
                <tr>
                  <td>5,000+</td>
                  <td class="theme">38元</td>
                  <td class="theme">58元</td>
                  <td class="theme">68元</td>
                  <td class="theme">88元</td>
                </tr>
                <tr>
                  <td>10,000+</td>
                  <td class="theme">68元</td>
                  <td class="theme">88元</td>
                  <td class="theme">128元</td>
                  <td class="theme">168元</td>
                </tr>
                <tr>
                  <td>50,000+</td>
                  <td class="theme">128元</td>
                  <td class="theme">168元</td>
                  <td class="theme">188元</td>
                  <td class="theme">288元</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="tips-block">
        <div class="tips" v-if="initData.status == 0 || initData.status == 1">昨日累计有效流水{{toThousands(initData.yesterday_bet || 0)}}，今日<span v-if="initData.status == 1">已</span><span v-else>可</span>领<span class="theme">{{toThousands(initData.today_bonus || 0)}}</span>元</div>
        <div class="tips" v-if="initData.status == 2">昨日未达领取条件，今日暂不可领取</div>
      </div>
      <div class="btn" :class="{'btn-disabled': initData.status == 1 || initData.status == 2}" @click="openDio">{{btnText}}</div>
      <div class="content-wrapper">
        <div class="gz-block block">
          <div class="title">活动规则</div>
          <div class="text gz-text">
              <ol>
                <li>电竞游戏场馆仅限：小艾电竞、IM电竞，有效流水将累计计算以上所有电竞游戏。</li>
                <li>会员每日未提款前的存款都视为首充。</li>
                <li>符合条件的会员需在次日在本活动页面手动领取，申请获得的彩金将自动派发至会员所选择的的电竞游戏钱包中，活动彩金需在电竞游戏中完成1倍流水即可转出，当会员对应电竞游戏钱包余额≤原电竞钱包余额且无未结算注单时，系统将自动判定已完成活动规定的有效流水，活动流水未完成前不可再次申请本活动。</li>
                <li>此优惠活动每天仅限领取一次，若当天会员未领取，则视为自动放弃。</li>
                <li>有效投注额仅计算产生输赢结果的注单，电竞赔率＜1.5，走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效投注。	</li>
                <li>每位有效玩家、每个手机号码、电子邮箱、IP地址、每张银行卡、每台设备只能享受一次优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利；VKGAME对本活动保有最终解释权。</li>
              </ol>
          </div>
        </div>
      </div>
      <div class="bottom-btn" @click="$router.push('/active')">回到活动首页</div>
    </div>
    <el-dialog
      @open="setModalOpacity"
      @close="setModalOpacity"
      :append-to-body="true"
      custom-class="data2major-dialog"
      width="690px"
      top="20vh"
      :visible.sync="showDio"
      >
        <div class="close" @click="closeDio"></div>
        <div class="content-wrapper">
          <div class="block">
            <div class="title">领取彩金至</div>
            <div class="wallet-wrapper">
              <div @click="chooseWallet(item, i)" class="wallet-btn" :class="{'wallet-btn-active': walletIndex == i}" v-for="(item, i) in walletList" :key="i">
                {{ item.name }}
              </div>
            </div>
            <div class="confirm-btn" @click="transfer">立即领取</div>
          </div>
        </div>
      </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { toThousands } from '../../../utils/util'
export default {
  name: 'data2major',
  data() {
    return {
      showDio: false,
      initData: {
        active_show_time: '～',
        active_bet_limit: '1', // 几倍流水可领取彩金
        status: 0, //状态： 0  可领 1 已领取 2 昨日未达到领取条件 ** 其他
        status_tips: '',
        today_bonus: 0
      },
      walletIndex: 0,
      walletList: [
        {name: "小艾电竞钱包", code: "EG"},
        {name: "IM电竞钱包", code: "IM"}
      ],
      ajaxLoad: false
    }
  },
  computed: {
    ...mapState(['isLogin']),
    btnText() {
      if(this.initData.status == 1) {
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
    setModalOpacity() {
      this.$nextTick(() => {
        const modalEl = document.querySelector(".v-modal")
        modalEl.style.opacity = this.showDio ? "0.8" : "0.5"
      })
    },
    toThousands(num) {
      return toThousands(num)
    },
    chooseWallet(item, i) {
      this.walletIndex = i
    },
    openDio() {
      if(this.isLogin) {
        if(this.initData.status == 1||this.initData.status == 2) {
          return;
        } else if(this.initData.status == 0) {
          this.walletIndex = 0
          this.showDio = true
        } else {
          this.$message({message: this.initData.status_tips, type: 'warning'})
          return;
        }
      } else {
        this.$message({message: '请您先登录', type: 'warning'})
				return;
      }
    },
    closeDio() {
      this.showDio = false
    },
    transfer() {
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
    },
    init() {
      this.$http(this.ApiSetting.active.data2major)
      .then(res => {
        if(res.status == 1&&res.data) {
          this.initData = res.data
        }
      })
    }
  }
}
</script>

<style lang="less">
.data2major-dialog {
  background-color: transparent;
  .el-dialog__header {
    display: none;
  }
  .el-dialog__body {
    padding: 0;
  }
  .close {
    position: absolute;
    top: -57px;
    right: 0;
    width: 29px;
    height: 28px;
    background-image: url('../../../assets/active/data2major/dio/close.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    cursor: pointer;
     &:hover {
      background-image: url('../../../assets/active/data2major/dio/close-active.png');
     }
  }
  .theme {
    color: #ffc972;
  }
  .content-wrapper {
    margin: auto;
    .block {
      position: relative;
      box-sizing: border-box;
      font-size: 18px;
      text-align: center;
      width: 100%;
      height: 331px;
      background: url('../../../assets/active/data2major/dio/1.png') no-repeat center top;
      background-size: contain;
      padding: 65px 69px 60px;
      margin: auto;
      &::before {
        content: '';
        position: absolute;
        box-sizing: border-box;
        left: 50%;
        transform: translateX(-50%);
        top: -12px;
        width: 750px;
        height: 25px;
        margin: auto;
        background: url('../../../assets/active/data2major/dio/label.png') no-repeat center top;
        background-size: contain;
      }
      .title {
        font-size: 30px;
        font-weight: bold;
        color: #00dafe;
        text-align: center;
        line-height: 1;
        position: absolute;
        top: -18px;
        left: 0;
        width: 100%;
        height: 32px;
      }
    }
    .wallet-wrapper {
      display: flex;
      flex-wrap: wrap;
    }
    .wallet-btn {
      cursor: pointer;
      text-align: center;
      width: 160px;
      height: 70px;
      line-height: 70px;
      font-size: 18px;
      color: #dbe4ff;
      margin-top: 20px;
      margin-right: 34px;
      border: solid 1px #00dafe;
      box-sizing: border-box;
      background-image: linear-gradient(to top, #142b5e, #005aa9);
      &:nth-of-type(3n) {
        margin-right: 0;
      }
    }
    .wallet-btn-active {
      border: none;
      font-weight: bold;
      color: #263080;
      background: url('../../../assets/active/data2major/dio/hook.jpg') no-repeat center top;
      background-size: contain;
    }
    .confirm-btn {
      cursor: pointer;
      margin: auto;
      margin-top: 60px;
      width: 206px;
      height: 64px;
      line-height:64px;
      background: url('../../../assets/active/data2major/btn.png') no-repeat center center;
      background-size: contain;
      font-size: 24px;
      color: #263080;
      text-align: center;
      font-weight: bold;
      &:hover {
        background: url('../../../assets/active/data2major/btn-active.png') no-repeat center center;
        background-size: contain;
      }
    }
    .btn-disabled {
      cursor: not-allowed;
      background: url('../../../assets/active/data2major/btn-disabled.png') no-repeat center center;
      background-size: contain;
      color: #444;
    }
  }
}
</style>
<style lang="less" scoped>
.data2major-page {
  min-height: 100vh;
  background-image: url('../../../assets/active/data2major/banner.jpg'), linear-gradient(to top, #061423, #1e296c);;
  background-repeat: no-repeat;
  background-position: center top;
  padding-top: 462px;
  padding-bottom: 70px;
  position: relative;
  .theme {
    color: #ffd23e !important;
  }
  table {
  border-top: #b4d1ff 1px solid;
  border-right: #b4d1ff 1px solid;
  box-sizing: border-box;
  text-align: center;
  th {
    border-left: #b4d1ff 1px solid;
    border-bottom: #b4d1ff 1px solid;
    height: 50px;
    line-height: 1.2;
    color: #fff;
    font-size: 18px;
    box-sizing: border-box;
  }
  td {
    border-left: #b4d1ff 1px solid;
    border-bottom: #b4d1ff 1px solid;
    height: 40px;
    line-height: 1.2;
    font-size: 14px;
    color: #fff;
    box-sizing: border-box;
  }
}
  .bg {
    background: url('../../../assets/active/data2major/bg.png') no-repeat center 240px;
  }
  .content-wrapper {
    margin: auto;
    margin-top: 76px;
    width: 1240px;
    .block {
      position: relative;
      box-sizing: border-box;
      width: 100%;
      padding: 43px 233px 60px;
      margin: auto;
      &::before {
        content: '';
        position: absolute;
        box-sizing: border-box;
        left: 0;
        top: -15px;
        width: 1240px;
        height: 32px;
        margin: auto;
        background: url('../../../assets/active/data2major/label.png') no-repeat center top;
        background-size: contain;
      }
      .title {
        font-size: 30px;
        font-weight: bold;
        color: #00dafe;
        text-align: center;
        line-height: 1;
        position: absolute;
        top: -15px;
        left: 0;
        width: 1240px;
        height: 32px;
      }
      .text {
        font-size: 14px;
        color: #fff;
      }
    }
    .time-block {
      height: 99px;
      background: url('../../../assets/active/data2major/1.png') no-repeat center top;
      background-size: contain;
      .time-text {
        text-align: center;
      }
    }
    .desc-block {
      height: 358px;
      background: url('../../../assets/active/data2major/2.png') no-repeat center top;
      background-size: contain;
      text-align: center;

    }
    .gz-block {
      margin: auto;
      height: 405px;
      background: url('../../../assets/active/data2major/3.png') no-repeat center top;
      background-size: contain;
    }
  }
  .bottom-btn {
    cursor: pointer;
    width: 260px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    margin: auto;
    margin-top: 49px;
    font-size: 18px;
    color: #263080;
    background: url('../../../assets/active/data2major/back-btn.png') no-repeat center center;
    background-size: contain;
    &:hover {
      background: url('../../../assets/active/data2major/back-active.png') no-repeat center center;
      background-size: contain;
      color: #291449;
    }
  }
  ol {
    padding-left: 12px;
    list-style: decimal;
    li {
      list-style: decimal;
      margin-bottom: 20px;
      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
  .table-wrapper {
    margin: auto;
    width: 776px;
    margin-top: 26px;
  }
  .tips-block {
    width: 1240px;
    margin: auto;
    color: #fff;
    text-align: center;
    font-size: 14px;
    line-height: 1;
    margin-top: 30px;
    margin-bottom: 20px;
  }
  .btn {
    user-select: none;
    cursor: pointer;
    margin: auto;
    width: 206px;
    height: 64px;
    line-height: 64px;
    background: url('../../../assets/active/data2major/btn.png') no-repeat center center;
    background-size: contain;
    font-size: 24px;
    color: #263080;
    text-align: center;
    font-weight: bold;
    &:hover {
      background: url('../../../assets/active/data2major/btn-active.png') no-repeat center center;
      background-size: contain;
    }
  }
  .btn-disabled {
    cursor: not-allowed;
    background: url('../../../assets/active/data2major/btn-disabled.png') no-repeat center center;
    background-size: contain;
    color: #444;
    &:hover {
      background: url('../../../assets/active/data2major/btn-disabled.png') no-repeat center center;
      background-size: contain;
    }
  }
}
</style>
