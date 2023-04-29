<template>
  <div class="nba-2022">

    <!-- 活动时间-->
    <div class="title desc-panel">
      <h3>活动时间</h3>
      <p>{{ serverActiveInfo.start_time }}~{{serverActiveInfo.end_time}}</p>
    </div>

    <!-- 活动内容文案-->
    <div class="desc desc-panel">
      <h3>活动内容</h3>
      <p>活动期间，会员每日完成再存≥500元，即可享受高达10%的再存送最高388元；且每周在投注积分榜上名列前茅即可赢取8888元奖金哦！</p>
    </div>

    <!-- 子活动切换tab-->
    <ul class="tabs">
      <li class="tab-label"
          @click="tabsIndex = 1"
          :class="{'actived': tabsIndex === 1}">再存送</li>
      <li class="tab-label"
          @click="tabsIndex = 2"
          :class="{'actived': tabsIndex === 2}">周投注积分榜争霸赛</li>
    </ul>


    <transition name="tab-fade" mode="out-in">
      <!-- 再存送子活动-->
      <div v-if="tabsIndex === 1"
           key="1"
           class="tab-pane">
        <table>
          <tbody>
            <tr>
              <th>再存金额</th>
              <th>游戏场馆</th>
              <th>百分比</th>
              <th>彩金上限</th>
              <th>流水要求</th>
            </tr>
            <tr>
              <td>≥500元</td>
              <td>全部体育场馆</td>
              <td>10%</td>
              <td>388元</td>
              <td>(本金+彩金) x8</td>
            </tr>
          </tbody>
        </table>

        <button v-if="serverActiveInfo.is_login" @click="openChooseWallet" :class="{disabled: serverActiveInfo.keep_charging_status === -1}">
          {{ serverActiveInfo.keep_charging_status === -1 ? "今日已领取" : "立即领取" }}
        </button>
        <button v-else @click="openChooseWallet">
          立即领取
        </button>

        <dl class="rules">
          <dt>
            <div class="desc-panel">
              <h3>活动规则</h3>
            </div>
          </dt>
          <dd class="rules-panel">
            <ol>
              <li>本活动再存款定义为：用户每日的第二笔存款将视为再存，若用户在申请再存送优惠前将存款从主钱包转出或发起提款，则不可申请此优惠活动。活动彩金领取成功后需完成8倍有效流水要求，例：会员单笔再存500，申请此活动优惠，则需完成（500+50)x8=4400元的有效流水。</li>
              <li>符合条件的会员，可在优惠活动页面点击“立即领取”按钮，对应的活动彩金+本金在领取成功后将自动添加至会员所选择的体育游戏钱包中。</li>
              <li>此优惠活动领取当天不与USDT存款领三重好礼优惠活动、体育周存款优惠活动共享，用户在成功领取优惠彩金后，流水未完成前游戏钱包不能互转，以及再次申请活动彩金，每日仅限领取一次。体育游戏场馆包含：威客体育、皇冠体育、平博Sports、沙巴体育、IM体育。</li>
              <li>有效流水要求：亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水。</li>
              <li>每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能使用一个账号享受优惠。对违规的用户，VKGAME保留无限期审核，和扣回红利及所产生的利润权利，本活动最终解释权归VKGAME所有。</li>
            </ol>
          </dd>
        </dl>
      </div>

      <!-- 周投注积分榜争霸赛子活动-->
      <div v-if="tabsIndex === 2"
           key="2"
           class="tab-pane">
        <table class="integral-table">
          <tbody>
          <tr>
            <td>排名</td>
            <td v-for="num in integralActiveConf[0]" :key="num">{{ num }}</td>
          </tr>
          <tr>
            <td>红包奖励</td>
            <td v-for="amount in integralActiveConf[1]" :key="amount">{{ formatNumberFloat(amount) }}</td>
          </tr>
          <tr>
            <td>流水要求</td>
            <td colspan="10">5倍体育流水</td>
          </tr>
          </tbody>
        </table>

        <button v-if="serverActiveInfo.is_login" @click="openChooseWallet" :class="{disabled: serverActiveInfo.water_king_status === -1}">
          {{ serverActiveInfo.water_king_status === -1 ? "已领取" : "立即领取" }}
        </button>
        <button v-else @click="openChooseWallet">
          立即领取
        </button>

        <p class="take-remark"><i></i>彩金领取时间为每周一00:00:00-23:59:59</p>

        <!-- 活动排行榜-->
        <div class="ranking-list">

          <!-- 我的排名-->
          <div class="mine">
            <div class="ranking-brand">我的排名</div>
            <div class="content-main">
              <div class="container">
                <div class="core">
                  <template v-if="serverActiveInfo.is_login">
                    <template v-if="serverActiveInfo.water_king_info.self_data.is_monday && serverActiveInfo.water_king_info.self_data.last_water_rank">
                      <div class="temp">
                        <h6>我的上周有效流水</h6>
                        <h1>{{ formatNumber(serverActiveInfo.water_king_info.self_data.last_water_total) }}<small>元</small></h1>
                      </div>
                      <div v-if="serverActiveInfo.water_king_info.self_data.last_water_rank <= 50" class="temp cur-ranking">
                        <h6 class="no-weight">我的排名</h6>
                        <h1><small>第 </small>{{ serverActiveInfo.water_king_info.self_data.last_water_rank }}<small> 名</small></h1>
                      </div>
                      <div v-else class="temp cur-ranking">
                        <h6 class="no-weight">暂未入榜</h6>
                      </div>
                    </template>
                    <template v-else-if="!serverActiveInfo.water_king_info.self_data.is_monday && serverActiveInfo.water_king_info.self_data.this_water_total">
                      <div class="temp">
                        <h6>我的本周有效流水</h6>
                        <h1>{{ formatNumber(serverActiveInfo.water_king_info.self_data.this_water_total) }}<small>元</small></h1>
                      </div>
                    </template>
                    <template v-else>
                      <div class="temp">
                        <h6>暂无有效流水，您还未入榜</h6>
                      </div>
                    </template>
                  </template>
                  <template v-else>
                    <div class="temp">
                      <h6 class="no-weight">登录以查看</h6>
                    </div>
                  </template>
                </div>
                <p class="take-remark">
                  <i></i>
                  NBA季后赛排名数据每日
                  <span style="display: block;text-align: left;margin-top: 3px">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    00:00:00左右更新
                  </span>
                </p>
              </div>
            </div>
          </div>

          <!-- 上周排名-->
          <div class="week">
            <div class="ranking-brand">上周排名</div>
            <div class="content-main">
              <div class="container">
                <template v-if="serverActiveInfo.water_king_info.last_week_ranks && serverActiveInfo.water_king_info.last_week_ranks.length">
                  <!-- 前三名-->
                  <div class="three-up">
                    <div class="user-line">
                      <span class="order">{{lastWeekChampionRow.water_rank}}.</span>
                      <div class="avatar" style="border-color: #fdd84b">
                        <i class="champion"></i>
                        <img :src="lastWeekChampionRow.head_image">
                        <div class="user_level lv1"
                             :class="['lv' + lastWeekChampionRow.vip]">
                          <span></span>
                        </div>
                      </div>
                      <small class="username">{{lastWeekChampionRow.username}}</small>
                    </div>
                    <div class="no-champion">
                      <div v-for="(item, index) in lastWeekSecondAndThirdRow"
                           :key="index"
                           class="user-line">
                        <span class="order">{{ item.water_rank }}.</span>
                        <div class="avatar" :style="{'border-color': index === 0 ? '#d6e0e5' : '#bb8a5e'}">
                          <i v-if="item.water_rank === 2" class="runner"></i>
                          <i v-else class="third"></i>
                          <img :src="item.head_image">
                          <div class="user_level"
                               :class="['lv' + item.vip]">
                            <span></span>
                          </div>
                        </div>
                        <small class="username">{{ item.username }}</small>
                      </div>
                    </div>
                  </div>
                  <!-- 其它滚动排名-->
                  <div class="flow-up">
                    <ul class="other-up"
                        :style="{transition: `${ranking1Y < 0 ? 'transform 0.3s' : 'transform 0s'}`, transform: `translateY(${ranking1Y}px)`}">
                      <li v-for="(item, index) in lastWeekOtherRow"
                          :key="index"
                          class="user-line">
                        <span class="order">{{ item.water_rank }}.</span>
                        <div class="avatar">
                          <img :src="item.head_image">
                          <div v-show="!(ranking1Y < 0 && index < 2)"
                               class="user_level"
                               :class="['lv' + item.vip]">
                            <span></span>
                          </div>
                        </div>
                        <small class="username">{{ item.username }}</small>
                      </li>
                    </ul>
                  </div>
                </template>
                <div v-else class="not-rank">暂无排名</div>
              </div>
            </div>
          </div>

          <!-- 本周排名-->
          <div class="week">
            <div class="ranking-brand">本周排名</div>
            <div class="content-main">
              <div class="container">
                <template v-if="serverActiveInfo.water_king_info.current_week_ranks && serverActiveInfo.water_king_info.current_week_ranks.length">
                  <!-- 前三名-->
                  <div class="three-up">
                    <div class="user-line">
                      <span class="order">{{thisWeekChampionRow.water_rank}}.</span>
                      <div class="avatar" style="border-color: #fdd84b">
                        <i class="champion"></i>
                        <img :src="thisWeekChampionRow.head_image">
                        <div class="user_level"
                             :class="['lv' + thisWeekChampionRow.vip]">
                          <span></span>
                        </div>
                      </div>
                      <small class="username">{{ thisWeekChampionRow.username }}</small>
                    </div>
                    <div class="no-champion">
                      <div v-for="(item, index) in thisWeekSecondAndThirdRow"
                           :key="index"
                           class="user-line">
                        <span class="order">{{ item.water_rank }}.</span>
                        <div class="avatar" :style="{'border-color': index === 0 ? '#d6e0e5' : '#bb8a5e'}">
                          <i v-if="item.water_rank === 2" class="runner"></i>
                          <i v-else class="third"></i>
                          <img :src="item.head_image">
                          <div class="user_level"
                               :class="['lv' + item.vip]">
                            <span></span>
                          </div>
                        </div>
                        <small class="username">{{ item.username }}</small>
                      </div>
                    </div>
                  </div>
                  <!-- 其它滚动排名-->
                  <div class="flow-up">
                    <ul class="other-up"
                        :style="{transition: `${ranking2Y < 0 ? 'transform 0.3s' : 'transform 0s'}`, transform: `translateY(${ranking2Y}px)`}">
                      <li v-for="(item, index) in thisWeekOtherRow"
                          :key="index"
                          class="user-line">
                        <span class="order">{{ item.water_rank }}.</span>
                        <div class="avatar">
                          <img :src="item.head_image">
                          <div v-show="!(ranking2Y < 0 && index < 2)"
                               class="user_level"
                               :class="['lv' + item.vip]">
                            <span></span>
                          </div>
                        </div>
                        <small class="username">{{ item.username }}</small>
                      </li>
                    </ul>
                  </div>
                </template>
                <div v-else class="not-rank">暂无排名</div>
              </div>
            </div>
          </div>
        </div>

        <dl class="rules">
          <dt>
            <div class="desc-panel">
              <h3>活动规则</h3>
            </div>
          </dt>
          <dd class="rules-panel">
            <ol>
              <li>周投注积分榜争霸赛排名前50的会员需于每周一在活动页面领取彩金，领取时间为每周一00:00:00-23:59:59，逾期则视为自动放弃，彩金需完成活动规定的5倍体育有效流水。</li>
              <li>用户在领取周投注积分榜红包时选择将其领取至对应的体育游戏钱包，当用户钱包余额≤原钱包余额且无未结算注单时，系统将自动判定已完成活动规定的有效流水，每周仅限领取一次，活动流水未完成前不可再次申请。</li>
              <li>此优惠活动不与威客体育加油站活动共享，参与周投注积分榜优惠的会员需要在体育赛事（威客体育、平博Sports、皇冠体育、沙巴体育、IM体育）投注NBA季后赛的赛事，每周只计算会员在NBA季后赛的有效投注注单流水。</li>
              <li>有效流水要求：亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水。</li>
              <li>每位有效玩家、每个手机号码、电子邮箱、IP地址、每张银行卡、每台设备只能享受一次优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利；VKGAME对本活动保有最终解释权。</li>
            </ol>
          </dd>
        </dl>
      </div>
    </transition>

    <!-- 底部返回按钮部分-->
    <div class="back">
      <router-link to="/active"><span>回到活动首页</span></router-link>
    </div>

    <!-- 选择钱包-->
    <ChooseWallet :visible.sync="chooseWalletVisible"
                  :title="chooseWalletTitle"
                  :params="chooseWalletParams" @callback="openWinThePrize" />
    <!-- 中奖信息-->
    <WinThePrize :visible.sync="winThePrizeVisible"
                 :bouns="winThePrizeBouns" />
  </div>
</template>

<script>
import { formatNumberSplit } from '@/utils/util'
import ChooseWallet from "./chooseWallet"
import WinThePrize from "./winThePrize"
import { mapState } from 'vuex'

export default {
  name: "nbaIndependent",
  components: { ChooseWallet, WinThePrize },
  data () {
    return {
      tabsIndex: 1,
      integralActiveConf: [
        [1, 2, 3, 4, 5, 6, 7, 8, 9, "10-50"],
        [8888, 5888, 1888, 888, 588, 388, 188, 88, 68, 18]
      ],
      ranking1Y: 0,
      ranking2Y: 0,
      chooseWalletTitle: "",
      chooseWalletParams: {},
      chooseWalletVisible: false,
      winThePrizeBouns: 0,
      winThePrizeVisible: false,
      serverActiveInfo: {
        water_king_info: {}
      },
      lastWeekOtherRow: [],// 上周排名 其它滚动排名
      thisWeekOtherRow: [] // 本周排名 其它滚动排名
    }
  },
  computed: {
    ...mapState(['isLogin']),
    // 上周排名 第一名
    lastWeekChampionRow() {
      return this.serverActiveInfo.water_king_info.last_week_ranks[0]
    },
    // 上周排名 第二名，第三名
    lastWeekSecondAndThirdRow () {
      return this.serverActiveInfo.water_king_info.last_week_ranks.slice(1, 3)
    },
    // 本周排名 第一名
    thisWeekChampionRow() {
      return this.serverActiveInfo.water_king_info.current_week_ranks[0]
    },
    // 本周排名 第二名，第三名
    thisWeekSecondAndThirdRow() {
      return this.serverActiveInfo.water_king_info.current_week_ranks.slice(1, 3)
    }
  },
  watch: {
    isLogin () {
      this.initActiveData()
    }
  },
  mounted () {
    this.initActiveData()
    this.tabsIndex = 2
  },
  methods: {
    formatNumber (num) {
      return formatNumberSplit(num)
    },
    formatNumberFloat (num) {
      let tvalue = formatNumberSplit(num)
      return tvalue.substring(0,tvalue.length - 3)
    },
    // 初始化活动信息
    initActiveData () {
      this.$http(this.ApiSetting.active.nba2022.getNbaIndependentInit)
        .then(({ status, data }) => {
          if (data && status === 1) {
            this.serverActiveInfo = data
            this.setOtherRow()
            this.rollRanking()
          }
        })
    },
    /**
     * 设置上周排名、本周排名的其它滚动排名
     */
    setOtherRow() {
      const lastRanks = this.serverActiveInfo.water_king_info.last_week_ranks,
        curRanks = this.serverActiveInfo.water_king_info.current_week_ranks
      if (lastRanks.length) {
        this.lastWeekOtherRow = lastRanks.slice(3, lastRanks.length)
      }
      if (curRanks.length) {
        this.thisWeekOtherRow = curRanks.slice(3, curRanks.length)
      }
    },
    /**
     * 排行榜滚动
     */
    rollRanking () {
      const MIN_NUM = 9
      if (!(this.serverActiveInfo.water_king_info.last_week_ranks.length > MIN_NUM) &&
        !(this.serverActiveInfo.water_king_info.current_week_ranks.length > MIN_NUM)) {
        return false
      }
      let timer;
      clearInterval(timer)
      // 上周排行榜
      timer = setInterval(() => {
        if (this.serverActiveInfo.water_king_info.last_week_ranks.length > MIN_NUM) {
          this.ranking1Y -= 80
          const cloneRankingList = JSON.parse(JSON.stringify(this.lastWeekOtherRow))
          this.lastWeekOtherRow = cloneRankingList
          if (this.ranking1Y <= -160) {
            const group1 = cloneRankingList[0]
            const group2 = cloneRankingList[1]
            cloneRankingList.shift()
            cloneRankingList.shift()
            cloneRankingList.push(group1)
            cloneRankingList.push(group2)
            this.ranking1Y = 0
          }
        }
        // 本周排行榜
        if (this.serverActiveInfo.water_king_info.current_week_ranks.length > MIN_NUM) {
          this.ranking2Y -= 80
          const cloneRankingList = JSON.parse(JSON.stringify(this.thisWeekOtherRow))
          this.thisWeekOtherRow = cloneRankingList
          if (this.ranking2Y <= -160) {
            const group1 = cloneRankingList[0]
            const group2 = cloneRankingList[1]
            cloneRankingList.push(group1)
            cloneRankingList.push(group2)
            cloneRankingList.shift()
            cloneRankingList.shift()
            this.ranking2Y = 0
          }
        }
      }, 1000)
    },
    /**
     * 选择钱包
     */
    openChooseWallet () {
      // -1: 已领取  0： 不可领取 1： 可领取
      if (!this.serverActiveInfo.is_login) {
        this.$message({ message: "请您先登录", type: "warning" })
        return
      }
      if (this.tabsIndex === 1) {
        if (this.serverActiveInfo.keep_charging_status === -1) return
        if (this.serverActiveInfo.keep_charging_status === 0) {
          this.$message({ message: this.serverActiveInfo.keep_charging_tips, type: "warning" })
          return
        }
        this.chooseWalletTitle = "领取再存金"
        this.chooseWalletParams = {
          active_id: this.serverActiveInfo.keep_charging_id,
          money: this.serverActiveInfo.keep_charging_bonus
        }
      } else {
        if (this.serverActiveInfo.water_king_status === -1) return
        if (this.serverActiveInfo.water_king_status === 0) {
          this.$message({ message: this.serverActiveInfo.water_king_tips, type: "warning" })
          return
        }
        this.chooseWalletTitle = "领取奖励"
        this.chooseWalletParams = {
          active_id: this.serverActiveInfo.water_king_id,
          money: this.serverActiveInfo.water_king_bonus
        }
      }
      this.chooseWalletVisible = true
    },
    /**
     * 开启领取提示
     */
    openWinThePrize () {
      this.winThePrizeBouns = this.tabsIndex === 1
        ? this.serverActiveInfo.keep_charging_bonus
        : this.serverActiveInfo.water_king_bonus
      this.winThePrizeVisible = true
      this.initActiveData()
    }
  }

}
</script>

<style lang="less" scoped>
@icon: url("../../../../assets/active/nbaIndependent/icon.png") no-repeat;
@color1: #ffffff;
@color-theme: #1d70f1;

.nba-2022 {
  background-image: url("../../../../assets/active/nbaIndependent/banner.jpg");
  background-position: center top, left top;
  background-repeat: no-repeat;
  overflow: hidden;
  .desc-panel {
    color: @color1;
    text-align: center;
    h3 {
      width: 131px;
      margin: 0 auto;
      font-size: 20px;
      line-height: 20px;
      font-weight: normal;
      background: @icon;
      background-position: -726px -322px;
    }
    p {
      font-size: 14px;
      line-height: 14px;
      margin-top: 12px;
    }
  }
  .title {
    margin-top: 712px;
  }
  .desc {
    margin-top: 60px;
  }
  .tabs {
    margin-top: 60px;
    display: flex;
    justify-content: center;
    .tab-label {
      width: 613px;
      height: 82px;
      background: @icon;
      background-position: -32px -144px;
      margin: 0 6px;
      font-size: 24px;
      text-align: center;
      line-height: 72px;
      color: @color1;
      font-style: italic;
      cursor: pointer;
      transition: background-position 0.1s, font-size 0.1s, font-weight 0.1s;
      &.actived {
        font-size: 38px;
        background-position: -32px -40px;
        font-weight: bold;
      }
    }
  }
  .tab-fade-enter-active, .tab-fade-leave-active {
    transition: opacity .2s;
  }
  .tab-fade-enter, .tab-fade-leave-to {
    opacity: 0;
  }
  .tab-pane {
    table {
      width: 1240px;
      margin: 50px auto 0;
      text-align: center;
      border: 1px solid @color-theme;
      tr {
        line-height: 80px;
        color: @color1;
        th {
          background: @color-theme;
          border-right: 1px solid #03256f;
          box-sizing: border-box;
          font-size: 20px;
          font-weight: normal;
          &:last-child {
            border-right: 0;
          }
        }
        td {
          font-size: 14px;
          border-right: 1px solid @color-theme;
          box-sizing: border-box;
        }
      }
      &.integral-table {
        tr {
          td {
            width: 110px;
            border-bottom: 1px solid @color-theme;
            &:first-child {
              width: 140px;
              background-color: @color-theme;
              border-bottom: 1px solid #133e95;
              font-size: 20px;
            }
          }
        }
      }
    }
    button {
      display: block;
      width: 248px;
      height: 71px;
      background: @icon;
      background-position: -32px -269px;
      margin: 40px auto 0;
      font-size: 24px;
      color: @color1;
      border: 0;
      outline: 0;
      cursor: pointer;
      &:hover {
        background-position: -32px -367px;
      }
      &.disabled {
        background-position: -32px -465px;
        cursor: auto;
        color: #adadad;
      }
    }
    .take-remark {
      margin-top: 19px;
      font-size: 14px;
      line-height:14px;
      letter-spacing: 1.4px;
      text-align: center;
      color: @color1;
      i {
        display: inline-block;
        width: 0;
        height: 0;
        border-top: 5px solid transparent;
        border-left: 11px solid @color1;
        border-bottom: 5px solid transparent;
        margin-right: 5px;
      }
    }
    .ranking-list {
      width: 1240px;
      display: flex;
      margin: 51px auto 0;
      .ranking-brand {
        width: 197px;
        height: 63px;
        background: @icon;
        background-position: -692px -363px;
        color: @color1;
        font-size: 20px;
        font-style: italic;
        font-weight: bold;
        text-align: center;
        line-height: 54px;
        position: relative;
        &:before {
          position: absolute;
          bottom: 0;
          left: 0;
          content: "";
          border-bottom: 1px solid @color-theme;
        }
      }
      .content-main {
        overflow: hidden;
        background-color: @color-theme;
        margin-top: 6px;
        .container {
          height: 409px;
          background-color: @color-theme;
          margin: 6px 5px 5px;
          border: 1px solid #03256f;
          box-sizing: border-box;
        }
      }
      .mine {
        margin-right: 31px;
        .ranking-brand {
          &:before {
            width: 240px;
          }
        }
        .container {
          width: 230px;
          .core {
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 343px;
            .temp {
              width: 100%;
              .no-weight {
                font-weight: normal;
              }
              h6 {
                font-size: 14px;
                text-align: center;
                color: @color1;
              }
              h1 {
                font-size: 30px;
                font-weight: bold;
                text-align: center;
                color: #fdd84b;
                margin-top: 5px;
                small {
                  font-size: 14px;
                  font-weight: normal;
                }
              }
            }
            .cur-ranking {
              margin-top: 38px;
            }
          }
        }
      }
      .week {
        .ranking-brand {
          &:before {
            width: 468px;
          }
        }
        .container {
          width: 459px;
          overflow: hidden;
          .user-line {
            display: flex;
            justify-content: center;
            width: 100%;
            margin: 25px 0 0;
            .order {
              font-size: 14px;
              font-style: italic;
              line-height: 58px;
              color: @color1;
              margin-right: 7px;
            }
            .avatar  {
              border-radius: 50%;
              position: relative;
              width: 58px;
              height: 58px;
              border: 4px solid;
              border-color: #042671;
              box-sizing: border-box;
              background-color: #3d4150;
              img {
                width: 50px;
                height: 50px;
                border-radius: 50%;
              }
            }
            .username {
              display: block;
              width: 83px;
              height: 58px;
              line-height: 58px;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              font-size: 14px;
              font-style: italic;
              text-align: center;
              color: @color1;
              margin-left: 15px;
            }
            .user_level {
              margin-top: -5px;
            }
          }
          .three-up {
            .no-champion {
              display: flex;
              .user-line {
                margin: 7px 0 0;
              }
            }
            .champion, .runner, .third {
              position: absolute;
              top: -17px;
              left: 10px;
              display: inline-block;
              width: 32px;
              height: 20px;
              background: @icon;
              background-position: -375px -482px;
            }
            .runner {
              background-position: -445px -482px;
            }
            .third {
              background-position: -514px -482px;
            }
            .champion {
              top: -27px;
              height: 29px;
              background-position: -375px -473px;
            }
          }
          .flow-up {
            height: 260px;
            overflow: hidden;
            .other-up {
              display: flex;
              flex-wrap: wrap;
              .user-line {
                width: 50%;
                margin: 22px 0 0;
              }
            }
          }
          .not-rank {
            text-align: center;
            color: @color1;
            font-size: 14px;
            line-height: 409px;
          }
        }
        &:last-child {
          margin-left: 33px;
        }
      }
    }
    .rules {
      width: 1240px;
      margin: 60px auto 0;
      .rules-panel {
        background-color: @color-theme;
        margin-top: 30px;
        overflow: hidden;
        ol {
          width: calc(100% - 12px);
          height: calc(100% - 9px);
          margin: 5px 6px 4px;
          border: solid 1px #03256f;
          box-sizing: border-box;
          color: @color1;
          font-size: 14px;
          line-height: 25px;
          padding: 16px 228px 17px 243px;
          li {
            list-style: auto;
            margin-top: 13px;
            &:first-child{
              margin-top: 0px;
            }
          }
        }
      }
    }
  }
  .back {
    margin: 51px 0 41px;
    text-align: center;
    a {
      display: inline-block;
      width: 248px;
      height: 71px;
      font-size: 24px;
      line-height: 71px;
      letter-spacing: 1.2px;
      text-align: center;
      background: @icon;
      background-position: -337px -269px;
      color: @color1;
      &:hover {
        background-position: -337px -367px;
      }
    }
  }
}
</style>
