<template>
  <div class="GetVotes-page">
    <!-- 我的战队 -->
    <div class="block block-myteam">
      <div class="border"></div>
      <div class="display">
        <div class="title-wrapper">
          <div class="title title-myteam">我的战队我来打CALL</div>
          <div class="right-wrapper">
            <div class="label label1">方法一</div>
          </div>
        </div>
        <div class="content-myteam">
          <div class="descc desc-myteam text-center">等级≥VIP1的会员每天可以免费获得一次打call机会，同一个战队累计打call 3次，即可免费获得一张选票。</div>
          <img width="546" height="400" class="gift-img" src="~@/assets/active/lols12/new/call.png" alt="" />
          <div class="confirm-btn" @click="toCall">去打CALL</div>
        </div>
      </div>
    </div>
    <!-- 充值加码 -->
    <div class="block block-czjm">
      <div class="border"></div>
      <div class="display">
        <div class="title-wrapper">
          <div class="title title-czjm">充值加码</div>
          <div class="right-wrapper">
            <div class="label label2">方法二</div>
          </div>
        </div>
        <div class="content-czjm">
          <div class="depo-nav-wrapper d-flex justify-center">
            <div @click="activedNM = i" :class="[`nav-${item.key}`, { 'nav-active': i == activedNM }]" class="nav"
              v-for="(item, i) in depoNavMenu" :key="i">
              <div class="text">{{item.name}}</div>
            </div>
          </div>
          <div class="descc desc-czjm" v-if="activedNM == 0">
            会员每日首充金额达到指定额度，即可兑换1张选票，会员需要依次按照档次层级兑换，500元、1,000元、3,000元、5,000元每个档次每日仅限兑换一次，<span
              style="color:#fff">10,000元档次可以无限兑换。</span>
          </div>
          <div v-if="activedNM == 0" class="exchange-box" style="top:310px">
            <div class="line">
              <div class="active-line" :style="{ width: `${depoMoreLineWidth}%` }"></div>
            </div>
            <div class="exchange-block" :class="{ 'exchange-block-active': item.isActive }"
              v-for="(item, i) in DepoAmountArea" :key="i">
              <div class="circle" :class="{ 'circle-exp': item.isExd }"></div>
              <div class="amount">{{ toThousands(item.num) }}元</div>
              <div @click="exchangeVote(1, 1, item, i)" class="ex-btn" :class="{ 'ex-btn-exp': item.isExd }">
                <template v-if="i == depoAmount.length - 1 && !item.isExd">
                  <span class="icon-ex"></span>
                  {{ item.isExd ? '已兑换' : '兑换' }}
                </template>
                <template v-else>
                  {{ item.isExd ? '已兑换' : '兑换' }}
                </template>
              </div>
              <transition name="bounce">
                <div
                  v-if="DepoLabelData.firstIndex != -1 && i == DepoLabelData.firstIndex && DepoLabelData.depoNeedAmount > 0"
                  class="label-wrapper">
                  <span>再充值{{ toThousands(DepoLabelData.depoNeedAmount) }}元<br />即可兑换</span>
                </div>
              </transition>
            </div>
          </div>
          <transition name="bounce-only">
            <div key="xnb" v-if="activedNM == 1" class="depo-xnb-wrapper">
              <img width="557" height="277" src="~@/assets/active/lols12/new/xnb.png" alt="">
            </div>
          </transition>
          <div class="block-bottom">
            <div class="btn-group d-flex justify-space-between" :class="{ 'btn-grounp-xnb': activedNM == 1 }">
              <div v-if="activedNM == 0" @click="exchangeVote(1, depoQuickVoAmount)" class="confirm-btn quick-ex-btn"
                :class="{ 'not-allow': depoQuickVoAmount == 0 }">
                一键兑换</div>
              <div @click="exchangeVote(6, 1)" v-if="activedNM == 1" class="confirm-btn"
                :class="{ 'not-allow': virtualExchange == 0 }">立即领取</div>
              <div @click="AuthRouterPush('/user/finance')" class="confirm-btn depo-now-btn">立即充值</div>
            </div>
            <div class="edu recharge-edu" :style="activedNM == 1 && 'visibility:hidden'">
              今日当前首充可兑换额度：{{ toThousands(depositExAmount) }}元
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 投注加码 -->
    <div class="block block-tzjm">
      <div class="display">
        <div class="title-wrapper">
          <div class="title title-tzjm">投注加码</div>
          <div class="right-wrapper">
            <div class="label label3">方法三</div>
          </div>
        </div>
        <div class="content-tzjm">
          <div class="descc desc-tzjm">
            会员每日电竞流水达到指定额度，即可兑换1张选票，会员需要依次按照档次层级兑换，100元、500元、1,000元、5,000元、10,000元每个档次每日仅限兑换一次，<span
              style="color:#fff">50,000元档次可以无限兑换。</span>
          </div>
          <div class="exchange-box">
            <div class="line">
              <div class="active-line" :style="{ width: `${betMoreLineWidth}%` }"></div>
            </div>
            <div class="exchange-block" :class="{ 'exchange-block-active': item.isActive }"
              v-for="(item, i) in betAmountArea" :key="i">
              <div class="circle" :class="{ 'circle-exp': item.isExd }"></div>
              <div class="amount">{{ toThousands(item.num) }}元</div>
              <div @click="exchangeVote(2, 1, item, i)" class="ex-btn" :class="{ 'ex-btn-exp': item.isExd }">
                <template v-if="i == betAmount.length - 1 && !item.isExd">
                  <span class="icon-ex"></span>
                  {{ item.isExd ? '已兑换' : '兑换' }}
                </template>
                <template v-else>
                  {{ item.isExd ? '已兑换' : '兑换' }}
                </template>
              </div>
              <transition name="bounce">
                <div
                  v-if="BetLabelData.firstIndex != -1 && i == BetLabelData.firstIndex && BetLabelData.betNeedAmount > 0"
                  class="label-wrapper">
                  <span>再投注{{ toThousands(BetLabelData.betNeedAmount) }}元<br />即可兑换
                  </span>
                </div>
              </transition>
            </div>
          </div>
          <div class="block-bottom">
            <div class="btn-group d-flex justify-space-between">
              <div @click="exchangeVote(2, betQuickVoAmount)" class="confirm-btn quick-ex-btn"
                :class="{ 'not-allow': betQuickVoAmount == 0 }">一键兑换</div>
              <div @click="AuthRouterPush('/xiaoaigame')" class="confirm-btn bet-now-btn">立即投注</div>
            </div>
            <div class="edu water-edu">
              今日当前流水可兑换额度：{{ toThousands(waterExAmount) }}元
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- v币兑换 -->
    <div class="block block-vb">
      <div class="border"></div>
      <div class="display">
        <div class="title-wrapper">
          <div class="title title-vb">V币兑换</div>
          <div class="right-wrapper">
            <div class="label label4">方法四</div>
          </div>
        </div>
        <div class="content-vb">
          <div class="descc desc-vb text-center">
            可在V币商城无限次兑换选票，还有更多精彩礼品在等待着您。
            <el-popover popper-class="lols12-intro-el-popper" placement="bottom" width="192" trigger="hover">
              <table width="100%" border="0" align="center" cellspacing="0" class="intro-table">
                <tr>
                  <th>等级</th>
                  <th>兑换次数</th>
                </tr>
                <tr>
                  <td>VIP1</td>
                  <td>2</td>
                </tr>
                <tr>
                  <td>VIP2</td>
                  <td>3</td>
                </tr>
                <tr>
                  <td>VIP3</td>
                  <td>3</td>
                </tr>
                <tr>
                  <td>VIP4</td>
                  <td>5</td>
                </tr>
                <tr>
                  <td>VIP5</td>
                  <td>5</td>
                </tr>
                <tr>
                  <td>VIP6</td>
                  <td>8</td>
                </tr>
                <tr>
                  <td>VIP7</td>
                  <td>8</td>
                </tr>
                <tr>
                  <td>VIP8</td>
                  <td>10</td>
                </tr>
                <tr>
                  <td>VIP9</td>
                  <td>10</td>
                </tr>
                <tr>
                  <td>VIP10</td>
                  <td>13</td>
                </tr>
                <tr>
                  <td>VIP11</td>
                  <td>13</td>
                </tr>
                <tr>
                  <td>VIP12</td>
                  <td>20</td>
                </tr>
              </table>
              <span slot="reference" class="intro">查看兑换说明</span>
            </el-popover>
          </div>
          <img width="524" height="523" class="vb-img" src="~@/assets/active/lols12/new/vb.png" alt="" />
          <div class="confirm-btn" @click="toVbMarket">前往商城兑换</div>
        </div>
      </div>
    </div>
    <!-- 活动规则 -->
    <div class="block block-gz">
      <div class="border"></div>
      <div class="display">
        <div class="title-wrapper">
          <div class="title title-gz">活动规则</div>
          <div class="right-wrapper">
          </div>
        </div>
        <div class="gz-content">
          <ol>
            <li>全平台等级≥VIP1的会员均可参与此活动，每位会员可以免费获得一张选票。</li>

            <li>未发起提款前的充值都被计算为首充。</li>

            <li>
              会员每日首充达到指定金额，即可兑换一张选票，会员在成功兑换后会扣除相应档位的充值额度，会员需要依次按照档次层级兑换，500元、1,000元、3,000元、5,000元每个档次每日仅限兑换一次，10,000元档次可以无限兑换。
            </li>

            <li>若用户当日使用虚拟币USDT首充任意金额，即可兑换一张选票。仅限当日兑换，隔日则无效。 </li>

            <li>
              威客电竞游戏包括：小艾电竞，RG电竞，IM电竞，每日电竞流水达到指定金额即可兑换1张选票，会员在成功兑换后会扣除相应档位的流水额度，会员需要依次按照档次层级兑换，100元、500元、1,000元、5,000元、10,000元每个档次每日仅限兑换一次，50,000元档次可以无限兑换。
            </li>

            <li>当日的首充与流水额度，仅限当日兑换，次日系统将会刷新首充与流水额度。 </li>

            <li>等级≥VIP1的会员每天可以免费获得一次打call机会，仅限当日使用，隔日则无效。</li>

            <li>会员为同一个战队累计打call每满3次，即可免费获得一张选票。 </li>

            <li>每位有效玩家、每个手机号码、电子邮箱、IP地址、每张银行卡、每台设备只能享受一次优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利；VKGAME对本活动保有最终解释权。</li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { toThousands } from '../../../../utils/util'
export default {
  name: 'GetVotes',
  props: {
    // 当前首充可兑换额度
    depositExAmount: {
      type: [Number, String],
      default: 0
    },
    // 当前流水可兑换额度
    waterExAmount: {
      type: [Number, String],
      default: 0
    },
    // 充值已兑换次数
    depositExdTimes: {
      type: [Number, String],
      default: 0
    },
    // 流水已兑换次数
    waterExdTimes: {
      type: [Number, String],
      default: 0
    },
    virtualExchange: {
      type: [Number],
      default: 0
    },
    isS12Begin: {
      type: [String, Boolean],
      default: ''
    }
  },
  data() {
    return {
      betAmount: [100, 500, 1000, 5000, 10000, 50000],
      depoAmount: [500, 1000, 3000, 5000, 10000],
      activedNM: 0,
      depoNavMenu: [
        { key: 'sc', name: '首充金额' },
        { key: 'xnb', name: '虚拟币充值额外兑换' },
      ]
    }
  },
  computed: {
    ...mapState([
      "isLogin"
    ]),
    // 可兑换额度大于0时，多出来的高亮线
    betMoreLineWidth() {
      const FixedWidth = this.activeLineWidth(this.betAmountArea)
      if (FixedWidth >= 0) {
        const { firstIndex, betNeedAmount } = this.BetLabelData
        if (firstIndex != -1 && betNeedAmount > 0 && betNeedAmount < this.betAmount[firstIndex]) {
          const halfWidth = 100 / ((this.betAmount.length - 1) * 2)
          return FixedWidth + halfWidth
        }
      }
      return FixedWidth
    },
    depoMoreLineWidth() {
      const FixedWidth = this.activeLineWidth(this.DepoAmountArea)
      if (FixedWidth >= 0) {
        const { firstIndex, depoNeedAmount } = this.DepoLabelData
        if (firstIndex != -1 && depoNeedAmount > 0 && depoNeedAmount < this.depoAmount[firstIndex]) {
          const halfWidth = 100 / ((this.depoAmount.length - 1) * 2)
          return FixedWidth + halfWidth
        }
      }
      return FixedWidth
    },
    BetLabelData() {
      const firstIndex = this.betAmountArea.findIndex(item => item.showLabel)
      const goalAmount = this.betAmount[firstIndex]
      const valiBetArr = this.betAmount.slice(this.waterExdTimes, firstIndex)
      const beforeAmount = valiBetArr.reduce((previousValue, currentValue) => previousValue + currentValue, 0)
      const remainAmount = this.waterExAmount - beforeAmount
      const betNeedAmount = remainAmount < goalAmount ? goalAmount - remainAmount : 0
      return { firstIndex, betNeedAmount }
    },
    DepoLabelData() {
      const firstIndex = this.DepoAmountArea.findIndex(item => item.showLabel)
      const goalAmount = this.depoAmount[firstIndex]
      const valiBetArr = this.depoAmount.slice(this.depositExdTimes, firstIndex)
      const beforeAmount = valiBetArr.reduce((previousValue, currentValue) => previousValue + currentValue, 0)
      const remainAmount = this.depositExAmount - beforeAmount
      const depoNeedAmount = remainAmount < goalAmount ? goalAmount - remainAmount : 0
      return { firstIndex, depoNeedAmount }
    },
    // isActive: 可兑换，isExd: 已经兑换过了
    betAmountArea() {
      let defaultArr = [
        { num: 100, isActive: false, isExd: false },
        { num: 500, isActive: false, isExd: false },
        { num: 1000, isActive: false, isExd: false },
        { num: 5000, isActive: false, isExd: false },
        { num: 10000, isActive: false, isExd: false },
        { num: 50000, isActive: false, isExd: false },
      ]
      const lastAmount = this.betAmount[this.betAmount.length - 1]
      let edu = this.waterExAmount
      return defaultArr.map((item, i) => {
        if (i < this.waterExdTimes) {
          // 如果已兑换次数大于数组长度，已经溢出了
          if (i == this.betAmount.length - 1) {
            // 剩余额度不足
            if (this.waterExAmount < lastAmount) {
              return { ...item, isActive: false, isExd: false, showLabel: true }
            } else {
              // 剩余额度还能兑几次
              const valiTimes = Math.floor((this.waterExAmount) / lastAmount)
              if (valiTimes > 0) {
                return { ...item, isActive: true, isExd: false }
              } else {
                return { ...item, isActive: true, isExd: true }
              }
            }
          }
          return { ...item, isActive: true, isExd: true }
        } else {
          if (edu >= item.num) {
            edu = edu - item.num
            return { ...item, isActive: true, isExd: false }
          }
          return { ...item, showLabel: true }
        }
      })
    },
    DepoAmountArea() {
      let defaultArr = [
        { num: 500, isActive: false, isExd: false },
        { num: 1000, isActive: false, isExd: false },
        { num: 3000, isActive: false, isExd: false },
        { num: 5000, isActive: false, isExd: false },
        { num: 10000, isActive: false, isExd: false },
      ]
      const lastAmount = this.depoAmount[this.depoAmount.length - 1]
      let edu = this.depositExAmount
      return defaultArr.map((item, i) => {
        if (i < this.depositExdTimes) {
          // 如果已兑换次数大于数组长度，已经溢出了
          if (i == this.depoAmount.length - 1) {
            // 剩余额度不足
            if (this.depositExAmount < lastAmount) {
              return { ...item, isActive: false, isExd: false, showLabel: true }
            } else {
              // 剩余额度还能兑几次
              const valiTimes = Math.floor((this.depositExAmount) / lastAmount)
              if (valiTimes > 0) {
                return { ...item, isActive: true, isExd: false }
              } else {
                return { ...item, isActive: true, isExd: true }
              }
            }
          }
          return { ...item, isActive: true, isExd: true }
        } else {
          if (edu >= item.num) {
            edu = edu - item.num
            return { ...item, isActive: true, isExd: false }
          }
          return { ...item, showLabel: true }
        }
      })
    },
    // 投注一键兑换可兑换的选票数量
    betQuickVoAmount() {
      const lastAmount = this.betAmount[this.betAmount.length - 1]
      const valiBetArr = this.betAmount.slice(this.waterExdTimes)
      const maxAmount = valiBetArr.reduce((previousValue, currentValue) => previousValue + currentValue, 0)
      if (this.waterExAmount > maxAmount) {
        return valiBetArr.length + Math.floor((this.waterExAmount - maxAmount) / lastAmount)
      }
      return this.betAmountArea.filter(item => item.isActive && !item.isExd).length
    },
    // 充值一键兑换可兑换的选票数量
    depoQuickVoAmount() {
      const lastAmount = this.depoAmount[this.depoAmount.length - 1]
      const valiBetArr = this.depoAmount.slice(this.depositExdTimes)
      const maxAmount = valiBetArr.reduce((previousValue, currentValue) => previousValue + currentValue, 0)
      if (this.depositExAmount > maxAmount) {
        return valiBetArr.length + Math.floor((this.depositExAmount - maxAmount) / lastAmount)
      }
      return this.DepoAmountArea.filter(item => item.isActive && !item.isExd).length
    },
  },
  methods: {
    toVbMarket() {
      if (!this.isLogin) {
        this.$message({ message: "请您先登录！", type: 'warning' })
        return
      }
      this.$router.push('/vbmarket')
    },
    toCall() {
      this.$emit("toCallPage")
    },
    toThousands(num) {
      return toThousands(num)
    },
    // 计算高亮线条的宽度
    activeLineWidth(arr) {
      let lastAcIndex = -1
      if (arr.length <= 1) {
        return 0;
      } else {
        // 一共几个区间
        const area = arr.length - 1
        arr.forEach((item, index) => {
          if (item.isActive) {
            lastAcIndex = index
          }
        })
        return lastAcIndex != -1 ? lastAcIndex * 100 / area : lastAcIndex
      }
    },
    // 兑换选票，统一到父组件处理
    // type：兑换来源 1:充值,2:投注,3:V币商城兑换,4:等级≥VIP1,5:打call兑换,6:虚拟币充值兑换
    // num：兑换选票数 默认 1 （大于1 则默认为一键兑换）
    exchangeVote(type, num, item, i) {
      if (type == 6 && this.virtualExchange == 0) {
        return;
      }
      if (num == 0) {
        return
      }
      if (item) {
        if (!item.isActive || item.isExd) {
          return
        }
      }
      if (!this.isLogin) {
        this.$message({ message: "请您先登录！", type: 'warning' })
        return
      }
      if (this.isS12Begin == 'before') {
        this.$message({ message: "活动尚未开始！", type: 'warning' })
        return
      }
      if (this.isS12Begin == 'after') {
        this.$message({ message: "活动已过期！", type: 'warning' })
        return
      }
      if (item) {
        if (type == 2 && i > this.waterExdTimes) {
          const num = this.betAmount[this.waterExdTimes]
          this.$message({ message: `请您先选择前面的${num}挡位兑换！`, type: 'warning' })
          return
        }
        if (type == 1 && i > this.depositExdTimes) {
          const num = this.depoAmount[this.depositExdTimes]
          this.$message({ message: `请您先选择前面的${num}挡位兑换！`, type: 'warning' })
          return
        }
      }
      this.$emit('exchangeVote', {
        from: type,
        num: num
      })
    },
    // 立即投注
    AuthRouterPush(path) {
      if (!this.isLogin) {
        this.$message({ message: "请您先登录！", type: 'warning' })
        return
      }
      this.$router.push(path)
    }
  }
}
</script>


<style lang="less">
.lols12-intro-el-popper {
  box-sizing: border-box;
  padding: 0 !important;
  border-width: 2px;
  border-color: #d6b598;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.35);

  &.el-popper[x-placement^=bottom] .popper__arrow {
    border-bottom-color: #d6b598;
  }

  &.el-popper[x-placement^=top] .popper__arrow {
    border-top-color: #d6b598;
  }

  .intro-table {
    font-size: 14px;
    font-weight: bold;
    color: #d6b598;
    text-align: center;

    th,
    td {
      height: 22px;
      line-height: 22px;
      width: 50%;
    }
  }
}
</style>
<style lang="less" scoped>
.bounce-only-enter-active,
.bounce-enter-active {
  animation: bounce-in .5s;
}

.bounce-leave-active {
  animation: bounce-in .5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}

.GetVotes-page {
  .right-wrapper {
    .label {
      color: #fff;
      font-size: 24px;
      font-weight: bold;
    }
  }

  .text-center {
    text-align: center;
  }

  .depo-nav-wrapper {
    position: absolute;
    top: 96px;
    left: 50%;
    transform: translate3d(-50%, 0, 0);

    .nav {
      user-select: none;
      cursor: pointer;
      position: relative;
      width: 221px;
      height: 41px;
      line-height: 41px;
      letter-spacing: -0.6px;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      background: url('~@/assets/active/lols12/new/sprite.png');
      background-position: -844px -313.5px;
      font-size: 20px;
      color: #eec494;
    }

    .nav-sc {

      &:hover,
      &.nav-active {
        background-position: -605px -314px;
        .text {
          color: #000;
          font-weight: bold;
        }
      }
    }

    .nav-xnb {
      margin-left: -24px;

      &:hover,
      &.nav-active {
        background-position: -605px -314px;
        .text {
          color: #000;
          font-weight: bold;
        }
      }
    }
  }

  .depo-xnb-wrapper {
    position: absolute;
    top: 185px;
    left: 313px;

    img {
      margin: auto;
      display: block;
    }
  }

  .exchange-box {
    position: absolute;
    top: 234px;
    left: 2px;
    width: 1198px;
    display: flex;
    justify-content: space-between;

    .line {
      z-index: -1;
      position: absolute;
      left: 50%;
      top: 18px;
      transform: translate3d(-50%, 0, 0);
      width: 1060px;
      height: 8px;
      background-color: #8c8c8c;

      .active-line {
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 10px;
        width: 0;
        height: 100%;
        background-color: #eec494;
        transition: width .5s;
      }
    }

    .exchange-block {
      position: relative;
      display: flex;
      width: 136px;
      flex-direction: column;
      align-items: center;

      .label-wrapper {
        position: absolute;
        top: -80px;
        width: 167px;
        text-align: center;
        height: 76px;
        font-size: 18px;
        font-weight: bold;
        display: flex;
        justify-content: center;
        color: #fff;
        letter-spacing: 1.8px;
        background: url('~@/assets/active/lols12/new/sprite.png');
        background-position: -940px -140px;

        span {
          margin-top: 9px;
        }
      }

      .circle {
        width: 44px;
        height: 44px;
        background: url('~@/assets/active/lols12/new/sprite.png');
        background-position: -1193px -136px;
      }

      .amount {
        color: #7a7a7a;
        font-size: 18px;
        line-height: 1;
        margin-top: 10px;
        margin-bottom: 17px;
      }

      .ex-btn {
        user-select: none;
        cursor: not-allowed;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 136px;
        line-height: 40px;
        height: 40px;
        color: #4b4b4b;
        font-size: 24px;
        font-weight: bold;
        background: url('~@/assets/active/lols12/new/sprite.png');
        background-position: -401px -466px;

        .icon-ex {
          width: 34px;
          height: 24px;
          display: inline-block;
          background: url('~@/assets/active/lols12/new/sprite.png');
          background-position: -10px -1478px;
        }
      }

      &.exchange-block-active {
        .circle {
          width: 44px;
          height: 44px;
          background: url('~@/assets/active/lols12/new/sprite.png');
          position: relative;
          background-position: -1125px -136px;

          &.circle-exp {
            &::before {
              content: '';
              display: block;
              width: 25px;
              height: 18px;
              position: absolute;
              left: 10px;
              top: 13px;
              background: url('~@/assets/active/lols12/new/sprite.png');
              background-position: -1136px -191px;
            }
          }
        }

        .amount {
          color: #fff;
        }

        .ex-btn {
          cursor: pointer;
          color: #000;
          background-position: -401px -416px;
          transition: all .5s;

          .icon-ex {
            background-position: -10px -1508px;
          }

          &:hover {
            transform: scale(1.05);
          }

          &.ex-btn-exp {
            cursor: not-allowed;
            color: #fff;
            background-position: -401px -366px;
            transition: none;

            &:hover {
              transform: scale(1);
            }
          }
        }
      }
    }
  }

  .btn-group {
    width: 344px;
    margin: auto;
    // margin-top: 40px;
  }

  .btn-grounp-xnb {
    margin-top: -13px;
  }

  .gift-img {
    z-index: -1;
    position: absolute;
    top: 60px;
    left: calc(50% + 20px);
    transform: translateX(-50%);
  }

  .vb-img {
    z-index: -1;
    position: absolute;
    top: 30px;
    left: calc(50% - 40px);
    transform: translateX(-50%);
  }

  .confirm-btn {
    margin: auto;
    user-select: none;
    cursor: pointer;
    background: url('~@/assets/active/lols12/new/sprite.png');
    background-position: -225px -477px;
    color: #eec494;
    width: 152px;
    height: 50px;
    line-height: 46px;
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    z-index: 2;

    &:hover {
      background: url('~@/assets/active/lols12/new/sprite.png');
      background-position: -225px -536px;
      color: #fff;
    }

    &.not-allow {
      cursor: not-allowed;
      background-position: -387px -536px;
      color: #fff;
    }
  }

  .descc {
    margin-top: 40px;
    padding: 0 9px;
    color: #d6b598;
    font-size: 14px;

    .intro {
      cursor: pointer;
      text-decoration: underline;
    }
  }

  .desc-czjm {
    position: absolute;
    margin-top: 0;
    top: 172px;
  }

  .edu {
    white-space: nowrap;
    margin-top: 20px;
    text-align: center;
    font-size: 14px;
    color: #eec494;
  }

  .block-tzjm {
    height: 524px;
  }

  .block-czjm {
    height: 600px;

    .border {
      height: 50px;
    }
  }

  .block-myteam {
    margin-top: 41px;
    height: 565px;

    .border {
      height: 15px;
    }

    .right-wrapper {
      width: 797px !important;
    }

    .confirm-btn {
      margin-top: 363px;
    }
  }

  .block-vb {
    height: 565px;

    .border {
      height: 15px;
    }

    .confirm-btn {
      margin-top: 363px;
    }
  }

  .block-gz {
    height: 608px;

    .border {
      height: 58px;
    }
  }

  .block-bottom {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
  }
}
</style>