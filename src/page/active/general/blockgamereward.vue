<template>
  <div class="blockgamereward-page">
    <div class="bg">
    <div class="content-wrapper">
      <div class="block">
        <div class="rect1"></div>
        <div class="rect2">
          <div class="title-img">活动时间</div>
        </div>
        <div class="display">
          <div class="time-title">{{initData.active_show_time || '-'}}</div>
        </div>
      </div>
    </div>
    <div class="content-wrapper">
      <div class="block">
        <div class="rect1"></div>
        <div class="rect2">
          <div class="title-img">活动内容</div>
        </div>
        <div class="display">
          <div>活动期间，会员每日首存≥500元，且在电玩场馆的FF区块链游戏中完成每个档次所需的有效流水≥3,000元，次日即可领取对应档位的彩金，最高可获得<span class="theme bold">2,592</span>元！</div>
          <div class="table-wrapper">
            <table width="100%" border="0" align="center" cellspacing="0">
              <thead>
                <tr>
                  <th>当日首充</th>
                  <th>所需有效投注</th>
                  <th>可获彩金</th>
                  <th>累计可获得</th>
                  <th>流水要求</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td rowspan="9">≥500元</td>
                  <td>3,000<span class="demi">元</span></td>
                  <td class="theme">8<span class="demi">元</span></td>
                  <td class="theme">8<span class="demi">元</span></td>
                  <td rowspan="9">电子游戏{{initData.active_bet_limit || 18}}倍流水</td>
                </tr>
                <tr>
                  <td>5,000<span class="demi">元</span></td>
                  <td class="theme">18<span class="demi">元</span></td>
                  <td class="theme">26<span class="demi">元</span></td>
                </tr>
                <tr>
                  <td>8,000<span class="demi">元</span></td>
                  <td class="theme">38<span class="demi">元</span></td>
                  <td class="theme">64<span class="demi">元</span></td>
                </tr>
                <tr>
                  <td>15,000<span class="demi">元</span></td>
                  <td class="theme">88<span class="demi">元</span></td>
                  <td class="theme">152<span class="demi">元</span></td>
                </tr>
                <tr>
                  <td>30,000<span class="demi">元</span></td>
                  <td class="theme">188<span class="demi">元</span></td>
                  <td class="theme">340<span class="demi">元</span></td>
                </tr>
                <tr>
                  <td>50,000<span class="demi">元</span></td>
                  <td class="theme">288<span class="demi">元</span></td>
                  <td class="theme">628<span class="demi">元</span></td>
                </tr>
                <tr>
                  <td>80,000<span class="demi">元</span></td>
                  <td class="theme">388<span class="demi">元</span></td>
                  <td class="theme">1,016<span class="demi">元</span></td>
                </tr>
                <tr>
                  <td>100,000<span class="demi">元</span></td>
                  <td class="theme">688<span class="demi">元</span></td>
                  <td class="theme">1,704<span class="demi">元</span></td>
                </tr>
                <tr>
                  <td>300,000<span class="demi">元</span></td>
                  <td class="theme">888<span class="demi">元</span></td>
                  <td class="theme">2,592<span class="demi">元</span></td>
                </tr>
              </tbody>
            </table>
            <div class="tips" v-if="initData.status == 0 || initData.status == 1">昨日累计有效流水{{toThousands(initData.yesterday_bet || 0)}}，今日<span v-if="initData.status == 1">已</span><span v-else>可</span>领<span class="theme">{{toThousands(initData.today_bonus || 0)}}</span>元</div>
            <div class="tips" v-if="initData.status == 2">昨日未达领取条件，今日暂不可领取</div>
            <div class="tips" v-if="initData.status == 3">有活动流水未完成</div>
            <div class="btn" :class="{'btn-not': initData.status == 1 || initData.status == 2 || initData.status == 3}" @click="getBonus">{{btnText}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="content-wrapper">
      <div class="block">
        <div class="rect1"></div>
        <div class="rect2">
          <div class="title-img">活动规则</div>
        </div>
        <div class="display">
          <div>
            <ol>
              <li>每日未发起提款前的存款都视为首充。会员在领取彩金时，活动会扣除相应档位的流水额度，需要依次按照档次层级领取。</li>
              <li>电玩游戏场馆仅限：FF区块链游戏；本活动每日结算时的有效投注流水当天将累计计算；彩金领取当天过后，若还剩有余的有效流水将会自动清除。</li>
              <li>例如：会员当日首充≥500，投注指定游戏结算后，FF区块链游戏有效投注8000，则该会员当日累积结算为有效投注8000，次日可领取64元的专属额外加码彩金。</li>
              <li>满足条件的会员需在产生有效投注流水的次日（00:00:00至23:59:59）期间在本活动页面申请此优惠活动，逾期则视为自动放弃。</li>
              <li>申请获得的彩金将自动派发至用户指定的的电子游戏钱包中，活动彩金需在电子游戏中完成18倍流水即可转出。当用户对应电子钱包余额≤原钱包余额且无未结算注单时，系统将自动判定已完成活动规定的有效流水，活动流水未完成前不可再次申请本活动。</li>
              <li>注单取消、对冲、未结算等不计算为有效流水。</li>
              <li>每位有效玩家、每个手机号码、电子邮箱、IP地址、每张银行卡、每台设备只能享受一次优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利；VKGAME对本活动保有最终解释权。</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-wrapper" @click="$router.push('/active')">
      回到活动首页
    </div>
    </div>
    <el-dialog
    :close-on-click-modal="false"
		:append-to-body="true"
    custom-class="blockgamereward-dialog" 
		width="480px"
		top="20vh"
		:visible.sync="showDialog"
		>
      <div class="close" @click="closeDio"></div>
      <div class="content-wrapper">
        <div class="rect1"></div>
        <div class="rect2"></div>
        <div class="display">
          <div class="label">可领彩金：<span class="theme bold">{{toThousands(initData.today_bonus || 0)}}</span> 元</div>
          <div class="center">
            <div class="desc">领取至</div>
            <div class="block">
              <div @click="chooseWallet(item, index)"
              :class="[{'wallet-active': index == activeIndex}, `${item.code}`]"
              class="wallet" v-for="(item, index) in walletArr" :key="index + item.code">{{item.title}}</div>
            </div>
          </div>
          <div class="btn" @click="transfer">确定</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { toThousands } from '../../../utils/util'
export default {
  name: 'blockgamereward',
  data() {
    return {
      activeIndex: 0,
      showDialog: false,
      walletArr: [
        {code: 'FUNFAIR', title: 'FF链游钱包'}
      ],
      initData: {
        status: 0,
        status_tips: '',
      },
      selectedObj: {},
      ajaxLoad: false
    }
  },
  created() {
    this.init()
  },
  computed: {
    ...mapState(['isLogin']),
    isShowTips() {
      return this.initData.status == 0 || this.initData.status == 1 || this.initData.status == 2 || this.initData.status == 3
    },
    btnText() {
      if(this.initData.status == 1) {
        return '今日已领取'
      } else {
        return '立即领取'
      }
    }
  },
  methods: {
    init() {
      this.$http(this.ApiSetting.active.blockgamereward)
      .then(res => {
        if(res.status == 1&&res.data) {
          this.initData = res.data
        }
      })
    },
    toThousands(num) {
      return toThousands(num)
    },
    getBonus() {
      if(this.isLogin) {
        // status状态： 0  可领   1 已领取  2 昨日未达到领取条件 3 活动流水未完成 4 其他
        if(this.initData.status == 1||this.initData.status == 2||this.initData.status == 3) {
          return;
        } else if(this.initData.status == 0) {
          this.selectedObj = this.walletArr[this.activeIndex]
          this.showDialog = true
        } else {
          this.$message({message: this.initData.status_tips, type: 'warning'})
          return;
        }
      } else {
				this.$message({message: '请您先登录', type: 'warning'})
				return;
      }
    },
    chooseWallet(item, index) {
      this.activeIndex = index
      this.selectedObj = this.walletArr[this.activeIndex]
    },
    closeDio() {
      this.activeIndex = 0
      this.selectedObj = this.walletArr[this.activeIndex]
      this.showDialog = false
    },
    transfer() {
      if (this.ajaxLoad) {
        return
      }
      this.ajaxLoad = true
      this.$http(this.ApiSetting.user.transferSubmit, {
        from: 'NM',
        to: this.selectedObj.code,
        money: this.initData.today_bonus,
        active_id: this.initData.active_id
      })
        .then(res => {
          if (res.status == 1) {
            this.$message({
              message: `【${this.initData.today_bonus}】元彩金已转入您的【${this.selectedObj.title}】,需${this.initData.active_bet_limit || 18}倍流水即可转出!`,
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
.blockgamereward-dialog {
  .el-dialog__header {
    display: none;
  }
  .el-dialog__body {
    padding: 0;
  }
  .close {
    position: absolute;
    top: -52px;
    right: 0;
    width: 22px;
    height: 22px;
    background-image: url('../../../assets/active/blockgamereward/close.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    cursor: pointer;
     &:hover {
      background-image: url('../../../assets/active/blockgamereward/close-h.png');
     }
  }
  .theme {
    color: #ffc972;
  }
  .bold {
    font-weight: bold;
  }
  .content-wrapper {
    position: relative;
    width: 480px;
    height: 425px;
    box-sizing: border-box;
    padding: 39px 64px 59px;
    color: #fff;
    .display {
      position: relative;
      .label {
        text-align: center;
        margin: auto;
        font-size: 24.5px;
        text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.46);
        width: 351px;
        height: 79px;
        line-height: 79px;
        background: url('../../../assets/active/blockgamereward/label.png') no-repeat center top;
        background-size: cover;
      }
      .center {
        width: 350px;
        margin: auto;
        .desc {
          font-size: 18px;
          text-align: left;
          margin-top: 29px;
          margin-bottom: 22px;
        }
        .block {
          display: flex;
          justify-content: space-between;
        }
        .wallet {
          cursor: pointer;
          position: relative;
          text-align: left;
          padding-left: 12px;
          box-sizing: border-box;
          width: 160px;
          height: 80px;
          line-height: 80px;
          font-size: 18px;
          color: #fff;
          border: solid 1px #8aaef9;
          &.AS {
            background-image: url('../../../assets/active/blockgamereward/AS.jpg'), linear-gradient(to top, #290260, #4f394f);
            background-repeat: no-repeat, no-repeat;
            background-position: center, center;
            background-size: contain, contain;
          }
          &.FUNFAIR {
            background-image: url('../../../assets/active/blockgamereward/FF.jpg'), linear-gradient(to top, #290260, #4f394f);
            background-repeat: no-repeat, no-repeat;
            background-position: center, center;
            background-size: contain, contain;
          }
        }
        .wallet-active {
          border: solid .01rem #ffc972;
          font-weight: bold;
          color: #ffc972;
          &::after {
            content: '';
            position: absolute;
            right: 0;
            bottom: 0;
            width: 25px;
            height: 27px;
            background: url('../../../assets/active/blockgamereward/gou.png') no-repeat center;
            background-size: 100% 100%;
          }
        }
      }
      .btn {
        padding: 0;
        margin: auto;
        margin-top: 60px;
        width: 160px;
        height: 40px;
        line-height: 40px;
        font-size: 18px;
        font-weight: bold;
        color: #281448;
        text-align: center;
        border-radius: 20px;
        border-style: solid;
        border-width: 1px;
        border-image-source: linear-gradient(to top, #233cf9, #9919da, #00eaf5);
        border-image-slice: 1;
        background-image: linear-gradient(to top, #ffc362, #fff), linear-gradient(to top, #233cf9, #9919da, #00eaf5);
        background-origin: border-box;
        background-clip: content-box, border-box;
        &:hover {
          cursor: pointer;
          border-image-source: linear-gradient(to top, #233cf9, #9919da, #00eaf5);
          border-image-slice: 1;
          background-image: linear-gradient(to bottom, #ffe7c7, #ff9e00), linear-gradient(to top, #233cf9, #9919da, #00eaf5);
          background-origin: border-box;
          background-clip: content-box, border-box;
        }
      }
    }
    &::before {
      content: '';
      position: absolute;
      box-sizing: border-box;
      width: 10px;
      height: 10px;
      top: 0;
      left: 0;
      background:transparent;
      border-right: solid 1px #afceff;
      border-bottom: solid 1px #afceff;
    }
    &::after {
      content: '';
      position: absolute;
      box-sizing: border-box;
      width: 10px;
      height: 10px;
      bottom: 0;
      right: 0;
      background:transparent;
      border-top: solid 1px #afceff;
      border-left: solid 1px #afceff;
    }
    .rect1 {
      position: absolute;
      box-sizing: border-box;
      pointer-events: none;
      user-select: none;
      top: 10px;
      left: 0;
      height: calc(100% - 20px);
      width: 100%;
      background-image: linear-gradient(to top, #290260, #4f394f);
      border-right: solid 1px #afceff;
      border-left: solid 1px #afceff;
      &::before {
        content: '';
        position: absolute;
        box-sizing: border-box;
        width: 10px;
        height: 10px;
        bottom: -10px;
        left: -1px;
        background:#290260;
        border-left: solid 1px #afceff;
        border-bottom: solid 1px #afceff;
      }
      &::after {
        content: '';
        position: absolute;
        box-sizing: border-box;
        width: 10px;
        height: 10px;
        top: -10px;
        right: -1px;
        background:#4f394f;
        border-top: solid 1px #afceff;
        border-right: solid 1px #afceff;
      }
    }
    .rect2 {
      position: absolute;
      box-sizing: border-box;
      pointer-events: none;
      user-select: none;
      top: 0;
      left: 010px;
      width: calc(100% - 20px);
      height: 100%;
      &::before {
        content: '';
        width: 100%;
        height: 10px;
        box-sizing: border-box;
        position: absolute;
        border-top: solid 1px #afceff;
        top: 0;
        left: 0;
        background: #4f394f;
      }
      &::after {
        content: '';
        width: 100%;
        height: 10px;
        box-sizing: border-box;
        position: absolute;
        border-bottom: solid 1px #afceff;
        bottom: 0;
        left: 0;
        background: #290260;
      }
    }
  }
}
</style>
<style lang="less" scoped>
.blockgamereward-page {
  min-height: 100vh;
  background-image: url('../../../assets/active/blockgamereward/banner.jpg'), linear-gradient(to top, #2b0560, #5100c1);
  background-repeat: no-repeat;
  background-position: center top;
  padding-top: 445px;
  padding-bottom: 51px;
  position: relative;
  .bg {
    background: url('../../../assets/active/blockgamereward/bg.png') no-repeat center 240px;
  }
  .theme {
    color: #ffc972;
  }
  .bold {
    font-weight: bold;
  }
  table {
    border-top: #8aaef9 1px solid;
    border-right: #8aaef9 1px solid;
    box-sizing: border-box;
    text-align: center;
    margin-bottom: 30px;
    th {
      border-left: #8aaef9 1px solid;
      border-bottom: #8aaef9 1px solid; 
      height: 50px;
      color: #fff;
      font-weight: bold;
      font-size: 18px;
      width: 20%;
    }
    td {
      border-left: #8aaef9 1px solid;
      border-bottom: #8aaef9 1px solid;
      height: 40px;
      font-size: 14px;
      color: #fff;
      width: 20%;
    }
  }
  .content-wrapper {
    margin-top: 90px;
    .display {
      position: relative;
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
    }
    .time-title {
      text-align: center;
    }
    .block {
      position: relative;
      color: #fff;
      font-size: 14px;
      box-sizing: border-box;
      margin: auto;
      width: 1240px;
      padding: 50px 233px 60px;
      &::before {
        content: '';
        position: absolute;
        box-sizing: border-box;
        width: 10px;
        height: 10px;
        top: 0;
        left: 0;
        background:transparent;
        border-right: solid 1px #afceff;
        border-bottom: solid 1px #afceff;
      }
      &::after {
        content: '';
        position: absolute;
        box-sizing: border-box;
        width: 10px;
        height: 10px;
        bottom: 0;
        right: 0;
        background:transparent;
        border-top: solid 1px #afceff;
        border-left: solid 1px #afceff;
      }
      .rect1 {
        position: absolute;
        box-sizing: border-box;
        pointer-events: none;
        user-select: none;
        top: 10px;
        left: 0;
        height: calc(100% - 20px);
        width: 100%;
        background-image: linear-gradient(to top, #290260, #4f394f);
        border-right: solid 1px #afceff;
        border-left: solid 1px #afceff;
        &::before {
          content: '';
          position: absolute;
          box-sizing: border-box;
          width: 10px;
          height: 10px;
          bottom: -10px;
          left: -1px;
          background:#290260;
          border-left: solid 1px #afceff;
          border-bottom: solid 1px #afceff;
        }
        &::after {
          content: '';
          position: absolute;
          box-sizing: border-box;
          width: 10px;
          height: 10px;
          top: -10px;
          right: -1px;
          background:#4f394f;
          border-top: solid 1px #afceff;
          border-right: solid 1px #afceff;
        }
      }
      .rect2 {
        position: absolute;
        box-sizing: border-box;
        pointer-events: none;
        user-select: none;
        top: 0;
        left: 010px;
        width: calc(100% - 20px);
        height: 100%;
        .title-img {
          position: absolute;
          left: 50%;
          top: -30px;
          transform: translateX(-50%);
          width: 226px;
          height: 60px;
          line-height: 60px;
          background: url('../../../assets/active/blockgamereward/tittle.png') no-repeat center;
          background-size: 100% 100%;
          font-size: 30px;
          color: #350378;
          font-family: vkFont;
          text-align: center;
        }
        &::before {
          content: '';
          width: 100%;
          height: 10px;
          box-sizing: border-box;
          position: absolute;
          border-top: solid 1px #afceff;
          top: 0;
          left: 0;
          background: #4f394f;
        }
        &::after {
          content: '';
          width: 100%;
          height: 10px;
          box-sizing: border-box;
          position: absolute;
          border-bottom: solid 1px #afceff;
          bottom: 0;
          left: 0;
          background: #290260;
        }
      }
    }
  }
  .table-wrapper {
    width: 776px;
    box-sizing: border-box;
    margin-top: 30px;
  }
  .tips {
    text-align: center;
  }
  .btn {
    margin: auto;
    margin-top: 20px;
    width: 160px;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    font-weight: bold;
    color: #281448;
    text-align: center;
    border-radius: 20px;
    border-style: solid;
    border-width: 1px;
    border-image-source: linear-gradient(to top, #233cf9, #9919da, #00eaf5);
    border-image-slice: 1;
    background-image: linear-gradient(to top, #ffc362, #fff), linear-gradient(to top, #233cf9, #9919da, #00eaf5);
    background-origin: border-box;
    background-clip: content-box, border-box;
    &:hover {
      cursor: pointer;
      border-image-source: linear-gradient(to top, #233cf9, #9919da, #00eaf5);
      border-image-slice: 1;
      background-image: linear-gradient(to bottom, #ffe7c7, #ff9e00), linear-gradient(to top, #233cf9, #9919da, #00eaf5);
      background-origin: border-box;
      background-clip: content-box, border-box;
    }
  }
  .btn-not {
    color: #707070;
    border-image-source: linear-gradient(to top, #7e7e7f, #fff);
    border-image-slice: 1;
    background-image: linear-gradient(to top, #c1c1c1, #f1f7ff), linear-gradient(to top, #7e7e7f, #fff);
    background-origin: border-box;
    background-clip: content-box, border-box;
    &:hover {
      color: #707070;
      border-image-source: linear-gradient(to top, #7e7e7f, #fff);
      border-image-slice: 1;
      background-image: linear-gradient(to top, #c1c1c1, #f1f7ff), linear-gradient(to top, #7e7e7f, #fff);
      background-origin: border-box;
      background-clip: content-box, border-box;
      cursor: not-allowed;
    }
  }
  .bottom-wrapper {
    margin: auto;
    margin-top: 53px;
    width: 259px;
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    color: #291449;
    text-align: center;
    border-radius: 25px;
    border-style: solid;
    border-width: 2px;
    border-image-source: linear-gradient(to top, #233cf9, #9919da, #00eaf5);
    border-image-slice: 1;
    background-image: linear-gradient(to top, #9ec4ff, #f1f7ff), linear-gradient(to top, #233cf9, #9919da, #00eaf5);
    background-origin: border-box;
    background-clip: content-box, border-box;
    cursor: pointer;
    &:hover {
      border-image-source: linear-gradient(to top, #233cf9, #9919da, #00eaf5);
      border-image-slice: 1;
      background-image: linear-gradient(to top, #478eff, #f1f7ff), linear-gradient(to top, #233cf9, #9919da, #00eaf5);
      background-origin: border-box;
      background-clip: content-box, border-box;
    }
  }
}
</style>