<template>
  <div class="bonus-for-playground">

    <h6 class="active-content">活动期间，会员每日在以下场馆完成≥10,000元有效投注，次日即可申请领取相应优惠彩金，最高可获得1,888元！</h6>

    <!-- 活动列表-->
    <div class="bonus-panel">
      <table>
        <tr>
          <th>有效投注（元）</th>
          <th>返利彩金（元）</th>
          <th>游戏场馆</th>
        </tr>
        <tr v-for="(item, index) in bonusList" :key="index">
          <td width="202px">{{ item.amount | formatNumberByInteger }}+</td>
          <td width="202px">{{ item.bonus | formatNumberByInteger }}</td>
          <!-- 领取操作区-->
          <td v-if="index === 0" :rowspan="bonusList.length" class="operation-area">
            <ul>
              <li v-for="(receiveItem, i) in receiveBonus" :key="i">
                <h5>{{ receiveItem.conditions }}</h5>

                <el-popover v-if="isSecondDay"
                            trigger="hover"
                            placement="top"
                            popper-class="popover-playground"
                            width="170">

                  <div class="popover-txt">
                    昨日累计投注：{{ initInfo[receiveItem.tipsField] | formatNumberByFloat }}元
                  </div>
                  <div slot="reference">
                    <i class="popover-icon"></i>
                  </div>
                </el-popover>

                <button v-if="initInfo[receiveItem.statusField] && initInfo[receiveItem.statusField].status === 1"
                        class="disabled">今日已领取
                </button>
                <button v-else @click="receiveBonusMethod(i)">领取彩金</button>

              </li>
            </ul>
          </td>
        </tr>
      </table>
    </div>

    <router-link :to="{name: 'home', params: {game: '3'}}" class="to-play"></router-link>

    <dl class="rules">
      <dt></dt>
      <dd>
        <ul>
          <li><i>1</i><p>专享返利金需在本活动页面手动领取，单日仅限每个场馆可领1次；共3次。</p></li>
          <li><i>2</i><p>每日累计投注达到对应的额度即可领取彩金，领取时间为次日 00:30:00-23:59:59，指定时间内未领取视为自动放弃。</p></li>
          <li><i>3</i><p>用户在领取专享返利金时，需选择将其领取至对应的游戏场馆钱包（真人、棋牌、电子场馆），此彩金需完成活动对应场馆所需的有效流水倍数，活动流水未完成前不可再次申请。</p></li>
          <li><i>4</i><p>真人场馆包含：{{ gameVenuesMap.get("真人") && gameVenuesMap.get("真人").join("、") }}；棋牌场馆包含：{{ gameVenuesMap.get("棋牌") && gameVenuesMap.get("棋牌").join("、") }}；电子场馆包含：{{ gameVenuesMap.get("电子") && gameVenuesMap.get("电子").join("、") }}。</p></li>
          <li><i>5</i><p>有效流水仅计算产生输赢结果的注单；注单取消、对冲、未结算等不计算为有效流水，PT电子游戏中以下游戏不算有效流水：<activeptliushui color="#c8bdbd" styleClass="playground-liushui" />。</p></li>
          <li><i>6</i><p>每位有效玩家、每个手机号码、电子邮箱、IP地址、每张银行卡、每台设备只能享受一次优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利；VKGAME对本活动保有最终解释权。</p></li>
        </ul>
      </dd>
    </dl>
  </div>
</template>

<script>
import { formatNumberSplit } from "@/utils/util"
import { mapState } from "vuex"

export default {
  name: "bonusForPlayground",
  props: ["gameVenuesList", "gameVenuesMap"],
  data() {
    return {
      initInfo: {},
      bonusList: [
        { amount: 10000, bonus: 8 },
        { amount: 50000, bonus: 18 },
        { amount: 100000, bonus: 58 },
        { amount: 300000, bonus: 88 },
        { amount: 500000, bonus: 188 },
        { amount: 800000, bonus: 388 },
        { amount: 1500000, bonus: 888 },
        { amount: 3000000, bonus: 1888 }
      ],
      // status: 0：不可领取  1: 已领取  2: 可领取
      receiveBonus: [
        { conditions: "真人有效流水：5倍", tipsField: "zr_water", statusField: "zr_status" },
        { conditions: "棋牌有效流水：8倍", tipsField: "qp_water", statusField: "qp_status" },
        { conditions: "电玩有效流水：8倍", tipsField: "dz_water", statusField: "dz_status" },
      ]
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
     * 是否是活动开始第二天
     * @return {boolean}
     */
    isSecondDay() {
      if (!this.initInfo.active_start_time) return false
      const startTime = new Date(this.initInfo.active_start_time * 1000)
      const secondTime = new Date(`${startTime.getFullYear()}/${startTime.getMonth() + 1}/${startTime.getDate() + 1} 00:00:00`).getTime()
      if (Date.now() >= secondTime) {
        return true
      }
      return false
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
        const response = await this.$http(this.ApiSetting.active.playgroundActive.initWaterActive)
        console.info("娱乐专场活动2数据初始化：", response)
        if (response.status === 1 && response.data) {
          this.initInfo = response.data
        }
      } catch (e) {
        console.info(e)
      }
    },

    /**
     * 点击领取彩金
     * @param index
     */
    receiveBonusMethod(index) {
      if (!this.initInfo.is_login) {
        this.$message({ message: "请您先登录", type: "warning" })
        return
      }
      if (this.initInfo[this.receiveBonus[index].tipsField] < this.bonusList[0].amount) {
        this.$message({ message: "您昨日累计投注未达到活动要求", type: "warning" })
        return
      }
      this.$emit("receive-bonus", {
        walletList: this.gameVenuesList[index].game_list
      })
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
.bonus-for-playground {
  .bonus-panel {
    margin: 35px auto 0;
    width: 815px;
    height: 458px;
    background: url("../../../../assets/active/playground/bonus_panel.png") no-repeat;
    table {
      margin: 2px 0 0 8px;
      width: 799px;
      color: #ffffff;
      font-size: 14px;
      text-align: center;
      line-height: 50px;
      tr {
        th {
          color: #fbde96;
        }
        td {
          border-top: 1px solid #a34045;
          border-left: 1px solid #a34045;
          &:first-child {
            border-left: 0;
          }
          &.operation-area {
            position: relative;
            ul {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              display: flex;
              flex-wrap: wrap;

              li {
                width: 100%;
                height: calc(100% / 3);
                display: flex;
                justify-content: center;

                h5 {
                  font-weight: normal;
                  line-height: 135px;
                }

                .popover-icon {
                  margin: 58.5px 0 0 5px;
                  display: block;
                  width: 18px;
                  height: 18px;
                  background: url("../../../../assets/active/playground/popover_icon.png") no-repeat;
                  cursor: pointer;
                }

                button {
                  margin-top: 54px;
                  margin-left: 15px;
                  width: 86px;
                  height: 27px;
                  font-size: 14px;
                  font-weight: bold;
                  color: #88292a;
                  border: 0;
                  outline: 0;
                  clip-path: polygon(7% 0%, 100% 0%, 100% 80%, 93% 100%, 0% 100%, 0% 20%);
                  background-image: linear-gradient(to bottom, #f1cc73, #ffe4a2);
                  cursor: pointer;
                  &:hover {
                    background-image: linear-gradient(to top, #ffe3a0, #ffedc1);
                  }
                  &.disabled {
                    width: 94px;
                    background-image: linear-gradient(to bottom, #959595, #c8c8c8);
                    color: #5a5a5a;
                    pointer-events: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  .to-play {
    display: block;
    margin: 24px auto 0;
    width: 256px;
    height: 95px;
    background: url("../../../../assets/active/playground/to_play.png") no-repeat;
    transition: filter 0.1s;
    &:hover {
      filter: saturate(130%);
    }
  }

  .rules {
    margin: 23px auto 0;
    dd {
      height: 444px;
      background: transparent url("../../../../assets/active/playground/active_2_rule.png") no-repeat;
    }
  }
}
</style>
<style lang="less">
.popover-playground {
  padding: 0;
  border: 1.5px solid transparent;
  background-image: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), linear-gradient(#f2dea8, #930403);
  background-origin: border-box;
  background-clip: content-box, border-box;
  margin-left: 2px;
  .popover-txt {
    font-size: 12px;
    line-height: 25px;
    color: #fbde96;
    text-align: center;
  }

  .popper__arrow {
    bottom: -4px!important;
    border-top-color: rgba(0,0,0,0.7)!important;
    border-bottom-color: rgba(0,0,0,0.7)!important;
    &:after {
      border-top-color: rgba(0,0,0,0.7)!important;
      border-bottom-color: rgba(0,0,0,0.7)!important;
    }
  }
}
</style>
