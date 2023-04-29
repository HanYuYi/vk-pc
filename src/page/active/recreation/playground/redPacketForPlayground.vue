<template>
  <div class="red-packet-for-playground">

    <h6 class="active-content">活动期间，会员每日完成首充≥100元并转至以下场馆，即可获得抽红包机会，最高可获得8888元现金！</h6>

    <!-- 选择场馆-->
    <ul class="game-venues">
      <li v-for="(item, index) in gameVenuesList"
          :key="index"
          @click="gameVenuesIndex = index"
          :class="[
            {active: gameVenuesIndex === index},
            {shake: index === initInfo.my_venue - 1 && currentPlaygroundShake}
          ]">
        {{ item.title }}
      </li>
    </ul>

    <!-- 步骤条面板-->
    <div class="step-panel">
      <div class="step-container">
        <div :style="{width: `${speedOfProgress}px`}" class="progress"></div>
        <ul class="point-container">
          <li v-for="(item, index) in stepBarList"
              :key="index"
              :class="[
                {can: calcPointStatus(index) === 2},
                {received: calcPointStatus(index) === 1},
                {double: gameVenuesList[gameVenuesIndex] && gameVenuesList[gameVenuesIndex].title === '真人场馆' && index === stepBarList.length - 1}
                ]">
            <i></i>
            <p>{{ item.amount | formatNumberByInteger }}元</p>
            <div class="red-packet" @click="receiveBonus(index)"><span>{{ item.bonus }}</span></div>
          </li>
        </ul>
      </div>
    </div>

    <p class="money-tips amount">
      <span>今日累计首充转账金额：
        <template v-if="initInfo.is_login">{{ initInfo.my_transfer | formatNumberByFloat }}元</template>
        <template v-else>--</template>
      </span>
    </p>

    <!-- 首充转账按钮-->
    <div class="btn-area">
      <router-link v-if="initInfo.my_deposit < stepBarList[stepBarList.length - 1].amount"
                   to="/user/finance"
                   class="btn deposit">
      </router-link>
      <button @click="openTransferDialog" class="btn transfer"></button>
    </div>

    <p class="money-tips require"><span>红包流水要求：8倍流水</span></p>

    <dl class="rules">
      <dt></dt>
      <dd>
        <ul>
          <li><i>1</i><p>每日充值在未发起提现前都视为首充；若在申请此优惠前将存款从主钱包转出或发起提现，则不可申请此优惠。</p></li>
          <li><i>2</i><p>用户首存≥100元，在本活动页面选择对应场馆（真人场馆、棋牌场馆、电子场馆三选一）的游戏钱包完成转账，即可获得1次机会；如当日抽红包次数未使用，则隔日累计无效。</p></li>
          <li><i>3</i><p>若当日选择真人场馆，则当日可获抽红包上限次数为：6次；真人奖励翻倍x2：真人场馆完成5个抽红包阶段时，会额外获得1次机会。</p></li>
          <li><i>4</i><p>真人场馆包含：{{ gameVenuesMap.get("真人") && gameVenuesMap.get("真人").join("、") }}；棋牌场馆包含：{{ gameVenuesMap.get("棋牌") && gameVenuesMap.get("棋牌").join("、") }}；电子场馆包含：{{ gameVenuesMap.get("电子") && gameVenuesMap.get("电子").join("、") }}。</p></li>
          <li><i>5</i><p>活动彩金在领取成功后，将会自动添加至会员所选择的游戏钱包场馆中；需要完成此活动指定的8倍有效流水。当用户对应游戏钱包余额＜最低投注额且无未结算注单时，系统将自动判定已完成活动规定的有效流水。该活动流水未完成前不可再次申请。</p></li>
          <li><i>6</i><p>此活动领取当天不与平台的真人首存类，棋牌首存类、电玩首存类活动共享；有效流水仅计算产生输赢结果的注单；注单取消、对冲、未结算，PT电子游戏中以下游戏不算有效流水：<activeptliushui color="#c8bdbd" styleClass="playground-liushui" />。</p></li>
          <li><i>7</i><p>每位有效玩家、每个手机号码、电子邮箱、IP地址、每张银行卡、每台设备只能享受一次优惠，参与用户必须先绑定银行卡。对违规的用户，VKGAME保留无期限审核，和扣回红利及产生的利润权利。本活动最终解释权归VKGAME所有。</p></li>
        </ul>
      </dd>
    </dl>

    <!-- 转账dialog-->
    <transfer-for-playground :visible.sync="transferVisible"
                             :row="transferDialogRow"
                             @transfer-back="initActiveData" />
  </div>
</template>

<script>
import { formatNumberSplit } from "@/utils/util"
import transferForPlayground from "./dialogs/transferForPlayground"
import { mapState } from "vuex"

export default {
  name: "redPacketForPlayground",
  props: ["gameVenuesList", "gameVenuesMap"],
  components: { transferForPlayground },
  data() {
    return {
      initInfo: {
        is_login: false,
        // 用户已转账场馆 1:真人  2:棋牌  3:电子
        my_venue: 1,
        // 已领取红包次数
        my_joins: 0,
        // 已首充的金额
        my_deposit: 0,
        // 已首充且已转账金额
        my_transfer: 0
      },
      // 当前点击后所显示的场馆索引
      gameVenuesIndex: 0,

      stepBarList: [
        { amount: 100, bonus: '1.8~188' },
        { amount: 1000, bonus: '8.8~888' },
        { amount: 5000, bonus: '12.8~1888' },
        { amount: 10000, bonus: '18.8~3888' },
        { amount: 30000, bonus: '58.8~8888' }
      ],
      transferDialogRow: {},
      transferVisible: false,

      // 选择的场馆抖动提示
      currentPlaygroundShake: false
    }
  },
  watch: {
    isLogin() {
      this.initActiveData()
    }
  },
  computed: {
    ...mapState(["isLogin"]),

    /**
     * 剩余待转账金额
     */
    remainingAmount() {
      return this.initInfo.my_deposit - this.initInfo.my_transfer
    },
    /**
     * 进度条长度
     */
    speedOfProgress() {
      // 没有转账场馆
      if (this.initInfo.my_venue <= 0) return 0
      // 转账金额为0
      if (this.initInfo.my_deposit <= 0) return 0
      // 当前点击显示的场馆不是转账场馆
      if (this.gameVenuesIndex !== this.initInfo.my_venue - 1) return 0

      const totalLen = 916
      let receiveIndex = 0
      // 计算可领取的节点下标
      this.stepBarList.forEach((item, index) => {
        if (this.initInfo.my_transfer >= item.amount) {
          receiveIndex = index
        }
      })

      return totalLen / (this.stepBarList.length - 1) * receiveIndex
    }
  },
  mounted () {
    this.initActiveData()
  },
  methods: {
    /**
     * 获取活动信息
     * @return {Promise<void>}
     */
    async initActiveData() {
      try {
        const response = await this.$http(this.ApiSetting.active.playgroundActive.initRedPacketActive)
        console.info("娱乐专场活动1数据初始化：", response)
        if (response.status === 1 && response.data) {

          this.$emit("send-data", {
            date: response.data.active_show_time,
            bulletList: response.data.bullet_screen
          })
          // 已发起过转账
          if (response.data.my_venue > 0) {
            this.gameVenuesIndex = response.data.my_venue - 1
          }
          this.initInfo = response.data
        }
      } catch (e) {
        console.info(e)
      }
    },

    /**
     * 计算步骤条节点状态
     * @param index
     * @return {number} 0: 不可领取
     *                  1: 已领取
     *                  2: 可领取
     */
    calcPointStatus(index) {
      // 没有转账场馆
      if (this.initInfo.my_venue <= 0) return 0
      // 转账金额为0
      if (this.initInfo.my_deposit <= 0) return 0
      // 当前点击显示的场馆不是转账场馆
      if (this.gameVenuesIndex !== this.initInfo.my_venue - 1) return 0

      // 转账金额大于当前节点的金额
      if (this.initInfo.my_transfer >= this.stepBarList[index >= this.stepBarList.length ? index - 1 : index].amount) {
        // 真人场馆最后一个节点可以领取两次
        if (index === this.stepBarList.length - 1 && this.initInfo.my_venue === 1 && this.initInfo.my_joins - 1 === index) {
          return 2
        } else {
          if (this.initInfo.my_joins - 1 >= index) {
            return 1
          } else {
            return 2
          }
        }
      } else {
        // 转账金额小于当前节点的金额，当前节点为不可领取
        return 0
      }
    },

    /**
     * 点击立即转账
     */
    openTransferDialog() {
      if (!this.initInfo.is_login) {
        this.$message({ message: "请您先登录", type: "warning" })
        return
      }
      if (this.initInfo.my_venue > 0 && this.gameVenuesIndex !== this.initInfo.my_venue - 1) {
        this.$message({ message: `您今日已选择${this.gameVenuesList[this.initInfo.my_venue - 1].title}，不可向其他场馆转账`, type: "warning" })
        this.shakeMethod()
        return
      }
      // 后端提示前置
      if (this.initInfo.status !== 0) {
        this.$message({ message: this.initInfo.status_tips, type: "warning" })
        return
      }
      if (this.initInfo.my_deposit < this.stepBarList[0].amount) {
        this.$message({ message: "请先完成活动首充要求", type: "warning" })
        return
      }
      this.transferDialogRow = {
        walletList: this.gameVenuesList[this.gameVenuesIndex].game_list,
        quickAmountList: this.stepBarList.filter(item => this.remainingAmount >= item.amount),
        transferableAmount: this.remainingAmount,
        activeId: this.initInfo.active_id
      }
      this.transferVisible = true
    },

    /**
     * 点击红包领取彩金
     * @param index
     */
    receiveBonus(index) {
      if (!this.initInfo.is_login) {
        this.$message({ message: "请您先登录", type: "warning" })
        return
      }
      // 可领取 和 不可领取 都能点击
      if (this.calcPointStatus(index) !== 1) {
        if (this.initInfo.my_venue > 0 && this.gameVenuesIndex !== this.initInfo.my_venue - 1) {
          this.$message({ message: `您今日已选择${this.gameVenuesList[this.initInfo.my_venue - 1].title}，不可申请此优惠`, type: "warning" })
          this.shakeMethod()
          return
        }
        // 后端提示前置
        if (this.initInfo.bonus_status !== 0) {
          this.$message({ message: this.initInfo.bonus_status_tips, type: "warning" })
          return
        }
        // 按顺序领取
        if (index > 0) {
          for (let i = 0; i < index; i++) {
            if (this.calcPointStatus(i) === 2) {
              this.$message({ message: "请按照顺序依次领取", type: "warning" })
              return
            }
          }
        }
        this.$emit("receive-bonus", {
          walletList: this.gameVenuesList[this.gameVenuesIndex].game_list,
          leval: index + 1
        })
      }
    },

    shakeMethod() {
      this.currentPlaygroundShake = true
      let timer
      setTimeout(() => {
        timer = this.currentPlaygroundShake = false
        clearTimeout(timer)
      }, 300)
    }
  },
  filters: {
    formatNumberByInteger (value) {
      const amount = formatNumberSplit(value)
      return amount.substring(0, amount.length - 3)
    },
    formatNumberByFloat(value) {
      return formatNumberSplit(value)
    }
  }
}
</script>

<style lang="less" scoped>
.red-packet-for-playground {
  .game-venues {
    margin: 15px auto 0;
    width: 1240px;
    height: 37px;
    display: flex;
    justify-content: center;
    li {
      width: 165px;
      height: 37px;
      cursor: pointer;
      margin: 0 17.5px;
      background-color: #000;
      font-size: 14px;
      text-align: center;
      line-height: 33px;
      box-sizing: border-box;
      color: #fbde96;
      border: 2px solid transparent;
      background-image: linear-gradient(#000000, #000000), linear-gradient(#f2dea8, #930403);
      background-origin: border-box;
      background-clip: content-box, border-box;
      transition: all 0.2s;
      &.active {
        background-image: linear-gradient(#8e2324, #8e2324), linear-gradient(#930403, #f2dea8);
        box-shadow: 0px 1px 1px 0 rgba(255, 255, 255, 0.5), inset 0px 1px 3px 0 rgba(0, 0, 0, 0.4);
      }
      &.shake {
        animation: shake-animate 0.3s;
      }
      @keyframes shake-animate {
        0% {
          transform: translateX(0);
        }
        10% {
          transform: translateX(8px);
        }
        30% {
          transform: translateX(-8px);
        }
        50% {
          transform: translateX(8px);
        }
        70% {
          transform: translateX(-8px);
        }
        90% {
          transform: translateX(8px);
        }
        100% {
          transform: translateX(0);
        }
      }
    }
  }

  .step-panel {
    margin: 11px auto 0;
    width: 1200px;
    height: 280px;
    background: url("../../../../assets/active/playground/step_panel_bg.png") no-repeat;
    overflow: hidden;
    .step-container {
      margin: 39px auto 0;
      width: 920px;
      height: 16px;
      border-radius: 8px;
      box-shadow: 0px 0 4px 0 rgba(255, 255, 255, 0.2), inset 0px 1px 3px 0 rgba(0, 0, 0, 0.4);
      border: solid 1px rgba(0, 0, 0, 0.06);
      background-color: #000;
      position: relative;
      .progress {
        position: absolute;
        top: 2px;
        left: 2px;
        height: 12px;
        border-radius: 6px;
        box-shadow: 0px 12px 18px 0 rgba(0, 0, 0, 0.35), inset 0px 1px 0 0 rgba(255, 255, 255, 0.4);
        background-image: linear-gradient(to top, #761b1c, #ba3234);
        transition: width 0.3s;
      }
      .point-container {
        z-index: 1;
        position: relative;
        display: flex;
        justify-content: space-between;
        li {
          width: 20px;
          margin-top: -2px;
          i {
            display: block;
            width: inherit;
            height: 20px;
            border-radius: 10px;
            box-shadow: 0px 12px 18px 0 rgba(0, 0, 0, 0.35), inset 0px 3px 7px 0 rgba(0, 0, 0, 0.4);
            border: 2px solid transparent;
            box-sizing: border-box;
            border-image-slice: 1;
            background-image: linear-gradient(to bottom, #8e2324, #8e2324), linear-gradient(to top, #930403, #f2dea8);
            background-origin: border-box;
            background-clip: content-box, border-box;
          }
          p {
            color: #fbde96;
            margin-left: -61.5px;
            margin-top: 11px;
            font-family: Roboto;
            font-size: 16px;
            width: 143px;
            text-align: center;
          }
          .red-packet {
            border-top: 0.1px solid transparent;
            margin-left: -61.5px;
            margin-top: 13px;
            width: 143px;
            height: 155px;
            text-align: center;
            background: url("../../../../assets/active/playground/red_packet_disabled.png") no-repeat;
            cursor: pointer;
            span {
              display: block;
              margin-top: 89px;
              font-family: Roboto;
              font-size: 18px;
              font-weight: bold;
              background-image: linear-gradient(to bottom, #ffffff, #adadad);
              -webkit-background-clip: text;
              background-clip: text;
              -webkit-text-fill-color: transparent;
            }
          }
          &.can {
            p {
              color: #ffffff;
            }
            .red-packet {
              background: url("../../../../assets/active/playground/red_packet.png") no-repeat;
              span {
                background-image: linear-gradient(to bottom, #ffffff, #fff69d);
              }
            }
          }
          &.received {
            .red-packet {
              cursor: auto;
              background: url("../../../../assets/active/playground/red_packet_received.png") no-repeat;
              position: relative;
              span {
                background-image: linear-gradient(to bottom, #ffffff, #fff69d);
              }
              &::before {
                position: absolute;
                top: 15px;
                left: 0;
                width: 100%;
                text-align: center;
                content: "已领取";
                font-size: 18px;
                color: #b64a47;
                pointer-events: none;
              }
            }
          }
          &.double {
            .red-packet {
              position: relative;
              &::after {
                position: absolute;
                content: "";
                top: -16px;
                right: -10px;
                width: 71px;
                height: 71px;
                background: url("../../../../assets/active/playground/bonus_double.png");
              }
            }
          }
        }
      }
    }
  }

  .money-tips {
    width: max-content;
    margin: 0 auto;
    position: relative;
    &::after {
      position: absolute;
      content: "";
      left: 0;
      bottom: -2px;
      width: 100%;
      height: 10px;
      background-color: #8e2324;
    }
    span {
      position: relative;
      z-index: 2;
      font-family: Roboto;
      font-size: 18px;
      color: #fff;
    }
  }

  .amount {
    margin: 24px auto 0;
  }

  .btn-area {
    margin-top: 25px;
    display: flex;
    justify-content: center;
    .btn {
      width: 256px;
      height: 95px;
      margin: 0 12px;
      cursor: pointer;
      border: 0;
      outline: 0;
      transition: filter 0.1s;
      &:hover {
        filter: saturate(130%);
      }
    }
    .deposit {
      background: transparent url("../../../../assets/active/playground/deposit_btn.png") no-repeat;
    }
    .transfer {
      background: transparent url("../../../../assets/active/playground/transfer_btn.png") no-repeat;
    }
  }

  .require {
    margin: 18px auto 0;
  }

  .rules {
    margin: 53px auto 0;
    dd {
      height: 494px;
      background: transparent url("../../../../assets/active/playground/active_1_rule.png") no-repeat;
    }
  }
}
</style>
