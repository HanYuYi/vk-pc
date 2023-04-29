<template>
  <div v-cloak class="dota-mojor" :class="`bg-${activeTabIndex}`">

    <div class="animate-bg">
      <drift-post :baseBubbles="dataList" />
    </div>

    <h4 class="date">
      {{ initInfo.show_time || '加载中' }}
    </h4>

    <!-- 子活动tab-->
    <ul class="active-tab">
      <li v-for="num in 2"
          :key="num"
          @click="activeTabIndex = num"
          :class="[`tab-${num}`, {'active': activeTabIndex === num}, {'has-tag': num === 2}]"></li>
    </ul>

    <h1 class="active-title"></h1>

    <!-- 竞猜活动-->
    <div v-show="activeTabIndex === 1" class="guess-dota-mojor">

      <h6 class="active-content">活动期间，会员每日首存≥100元，完成每日精选赛事竞猜玩法“独赢”猜中，即可获得 8元奖金。</h6>

      <div class="guess-group">

        <button @click="viewGuessRecord" class="record-btn"><span>竞猜记录</span></button>

        <!-- 赛事-->
        <template v-if="firstActiveInfo.list.length">
          <swiper ref="dotaMojorSwiper"
                  :options="mySwiperOptions"
                  class="guess-swiper">
            <!--game_status 0：未开始   1：竞猜中   2：进行中   4：已结束-->
            <swiper-slide v-for="(item, index) in firstActiveInfo.list"
                          :key="index"
                          :class="[
                            {'not-started': item.game_status === 0 || item.game_status === 1},
                            {'progress': item.game_status === 2},
                            {'end': item.game_status === 3},
                          ]">

              <h2 class="match-title">
                <Tooltip class="tooltip_2022" :content="item.game_name" placement="bottom">
                  <span>{{ item.game_name }}</span>
                </Tooltip>
              </h2>

              <div class="match-content">
                <!-- 左侧战队-->
                <!-- result:   -1: 未开   0: 和局   -2: 输   >0: 赢队伍的id -->
                <div class="team-item team-left"
                     :class="[
                       {'already': item.guess_who_id === item.team_id_1},
                       {'win': item.guess_who_id === item.team_id_1 && item.result > 0},
                       {'lose': item.guess_who_id === item.team_id_1 && item.result === -2},
                       {'draw': item.guess_who_id === item.team_id_1 && item.result === 0}
                     ]">
                  <i class="team-logo">
                    <img v-lazy="{
                      src: item.l_team_logo,
                      error: $store.state.lazyMatchAvatar.error,
                      loading: $store.state.lazyMatchAvatar.loading
                    }">
                  </i>
                  <h5>
                    <Tooltip class="tooltip_2022" :content="item.l_team_name" placement="bottom">
                      <span>{{ item.l_team_name }}</span>
                    </Tooltip>
                  </h5>
                  <button v-if="item.game_status === 1 && item.guess_who_id === -1"
                          @click="toGuessing(item, 'team_id_1')"
                          class="guessing">
                    竞猜
                  </button>
                </div>

                <div class="team-center">
                  <p class="time">{{ item.date_time }}</p>
                  <em class="vs"></em>
                  <small class="game-type">{{ item.game_type }}</small>

                  <template v-if="item.game_status === 0 || item.game_status === 1 && swiperTransitionEnd">
                    <p v-if="item.game_status === 1 && item.hasOwnProperty('_countTimer')"
                       class="deposit-time">
                      <small style="margin-bottom: 14px">{{ item._timeLeft | handlerFormatCountTime }}</small><br>
                      竞猜倒计时
                    </p>
                    <p v-else class="deposit-time">
                      该场赛事要求竞猜时间<br>
                      <small style="margin-top: 14px">
                        {{ item.deposit_start_time * 1000 | formatDateByStr('MM.dd HH:mm') }}-{{ item.deposit_end_time * 1000 | formatDateByStr('MM.dd HH:mm') }}
                      </small>
                    </p>
                  </template>
                </div>

                <!-- 右侧战队-->
                <div class="team-item team-right"
                     :class="[
                       {'already': item.guess_who_id === item.team_id_2},
                       {'win': item.guess_who_id === item.team_id_2 && item.result > 0},
                       {'lose': item.guess_who_id === item.team_id_2 && item.result === -2},
                        {'draw': item.guess_who_id === item.team_id_2 && item.result === 0}
                     ]">
                  <i class="team-logo">
                    <img v-lazy="{
                      src: item.r_team_logo,
                      error: $store.state.lazyMatchAvatar.error,
                      loading: $store.state.lazyMatchAvatar.loading
                    }">
                  </i>
                  <h5>
                    <Tooltip class="tooltip_2022" :content="item.r_team_name" placement="bottom">
                      <span>{{ item.r_team_name }}</span>
                    </Tooltip>
                  </h5>
                  <button v-if="item.game_status === 1 && item.guess_who_id === -1"
                          @click="toGuessing(item, 'team_id_2')"
                          class="guessing">
                    竞猜
                  </button>
                </div>
              </div>

            </swiper-slide>
          </swiper>

          <!-- 左右箭头-->
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </template>
        <!-- 赛事为空时占位图-->
        <div v-else class="placeholder-pic"></div>

        <p class="info-count" style="margin: 16px auto 0">竞猜次数：
          <template v-if="initInfo.is_login"><span>{{ firstActiveInfo.quiz_times }}</span> 次</template>
          <template v-else>--</template>
        </p>

        <!-- 规则-->
        <dl class="rules">
          <dt></dt>
          <dd>
            <ul>
              <li><i>01.</i><p>每日未发起提款前的存款都视为首充。</p></li>
              <li><i>02.</i><p>当日会员每满足首存100元即可获得一次赛事竞猜；此竞猜次数仅限当天使用有效，隔日无效。</p></li>
              <li><i>03.</i><p>若赛事开赛时间为 00:00 点，则用户需要在指定时间内完成首存和赛事竞猜，即可竞猜成功。</p></li>
              <li><i>04.</i><p>此竞猜结果分为：输、和、赢；参与精选赛事竞猜结算（赢）猜中，即可获得8元奖金，若竞猜结果结算为“和”将会视为无效竞猜。</p></li>
              <li><i>05.</i><p>符合条件的用户只需等待当日赛事结束即可，工作人员将会在24小时内统一派彩，活动彩金将会添加至用户主钱包中，彩金流水需要完成全站5倍有效流水。</p></li>
              <li><i>06.</i><p>电竞赔率＜1.5、亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水；PT电子游戏中以下游戏不算有效流水：<activeptliushui color="#bae1e5" styleClass="dota-mojor-rule-liushui" />。</p></li>
              <li><i>07.</i><p>每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能使用一个账号享受优惠。对违规的用户，VKGAME保留无限期审核，和扣回红利及所产生的利润权利，本活动最终解释权归VKGAME所有。</p></li>
            </ul>
          </dd>
        </dl>
      </div>

    </div>

    <!-- 投注活动-->
    <div v-show="activeTabIndex === 2" class="rebate-dota-mojor">

      <h6 class="active-content">活动期间，会员每日在电竞场馆【ESL One柏林 Major】中累计有效流水≥5000，即可申请领取相应优惠彩金，最高可获得{{ maxBonusAmount | formatNumberByInteger }}元。</h6>

      <div class="rebate-panel">
        <table>
          <tr>
            <th>游戏场馆</th>
            <th>有效投注(￥)</th>
            <th>返利彩金(￥)</th>
            <th>流水要求</th>
          </tr>
          <tr v-for="(item, index) in lastActiveInfo.active_setting" :key="index">
            <td v-if="index === 0" :rowspan="lastActiveInfo.active_setting.length">
              <span v-for="(wallet, i) in playgroundList" :key="i">
                {{ wallet }}<br v-if="i < lastActiveInfo.wallet.length - 1">
              </span>
            </td>
            <td>{{ item.amount | formatNumberByInteger }}+</td>
            <td>{{ item.bonus | formatNumberByInteger }}</td>
            <td v-if="index === 0" :rowspan="lastActiveInfo.active_setting.length">
              电竞{{ lastActiveInfo.active_bet_limit }}倍有效流水
            </td>
          </tr>
        </table>
      </div>

      <p class="info-count" style="margin: 36px auto 0">
        <template v-if="initInfo.is_login">昨日累计有效投注 <span>{{ lastActiveInfo.yesterday_profit | formatNumberByFloat }}</span> 元，今日{{ lastActiveInfo.status === 3 ? '已' : '可' }}领 <span>{{ lastActiveInfo.today_bonus | formatNumberByFloat }}</span> 元</template>
        <template v-else>昨日累计有效投注 --，今日可领 --</template>
      </p>

      <button @click="receiveBonus"
              class="receive-rebate"
              :class="{'received': lastActiveInfo.status === 3}"></button>

      <!-- 规则-->
      <dl class="rules">
        <dt></dt>
        <dd>
          <ul>
            <li><i>01.</i><p>每日返利金需在本活动页面手动领取，每日仅限领取一次。</p></li>
            <li><i>02.</i><p>每日累计流水达到对应的额度即可领取彩金，领取时间为次日 00:30:00-23:59:59，指定时间内未领取视为自动放弃。</p></li>
            <li><i>03.</i><p>用户在领取【ESL One柏林 Major】每日返利金时选择将其领取至对应的电竞游戏钱包（{{ playgroundList.join("、") }}），每日返利金需完成3倍电竞有效流水，活动流水未完成前不可再次申请。</p></li>
            <li><i>04.</i><p>电竞游戏场馆仅限：{{ playgroundList.join("、") }}。有效投注额仅计算产生输赢结果的注单，电竞赔率＜1.5，走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效投注。</p></li>
            <li><i>05.</i><p>每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能使用一个账号享受优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利；VKGAME对本活动保有最终解释权。</p></li>
          </ul>
        </dd>
      </dl>

    </div>

    <!-- 回到首页-->
    <div class="dota-mojor-back-home">
      <router-link to="/active" />
    </div>

    <!-- 竞猜记录dialog-->
    <record-guess-dota-mojor :visible.sync="recordVisible" />

    <!-- 领取彩金dialog-->
    <receive-dota-mojor :visible.sync="receiveVisible"
                        :receive-bonus="lastActiveInfo.today_bonus"
                        :wallet-list="lastActiveInfo.wallet"
                        :active-id="initInfo.active_id"
                        :water-limit="lastActiveInfo.active_bet_limit"
                        @receive-back="initActiveData" />
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper"
import "swiper/css/swiper.css"
import { mapState } from "vuex"
import { formatDate, formatCountTime, formatNumberSplit } from "@/utils/util"
import recordGuessDotaMojor from "./recordGuessDotaMojor"
import receiveDotaMojor from "./receiveDotaMojor"
import driftPost from '../../../../components/drift-post'

export default {
  name: "dotaMojor",
  components: { driftPost, Swiper, SwiperSlide, recordGuessDotaMojor, receiveDotaMojor },
  data() {
    return {
      activeTabIndex: 1,

      swiperTransitionEnd: false,

      // 活动一数据
      firstActiveInfo: {
        status: false,
        tips: "数据加载中，请稍后...",
        // 竞猜次数
        quiz_times: 0,
        // 赛事list
        list: []
      },

      // 活动二数据
      lastActiveInfo: {
        status: false,
        status_tips: "数据加载中，请稍后...",
        // 昨日累计有效投注金额
        yesterday_profit: 0,
        // 今日可领金额
        today_bonus: 0,
        // 今日已领金额
        a_today_bonus: 0,
        // 返利列表
        active_setting: [],
        // 所需流水倍数
        active_bet_limit: 0,
        // 电竞钱包
        wallet: []
      },

      loading: false,
      initInfo: {
        is_login: false
      },

      // 赛事swiper options
      mySwiperOptions: {
        initialSlide: 0,
        effect: "coverflow",
        centeredSlides: true,
        slidesPerView: "auto",
        grabCursor : true,
        coverflowEffect: {
          rotate: 0,
          stretch: 548,
          depth: 220,
          slideShadows: false,
        },
        navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
        on: {
          transitionStart: () => {
            this.swiperTransitionEnd = false
          },
          transitionEnd: () => {
            this.swiperTransitionEnd = true
          }
        },
      },

      // 控制竞猜记录弹窗
      recordVisible: false,
      // 控制领取返不停彩金
      receiveVisible: false,
      guessingLoading: false,

      dataList: [
        require("../../../../assets/active/dotaMojor/fire1_r.png"),
        require("../../../../assets/active/dotaMojor/fire2_r.png"),
        require("../../../../assets/active/dotaMojor/fire3_r.png"),
        require("../../../../assets/active/dotaMojor/fire4_r.png"),
        require("../../../../assets/active/dotaMojor/fire5_r.png"),
        require("../../../../assets/active/dotaMojor/fire6_r.png"),
        require("../../../../assets/active/dotaMojor/fire7_r.png")
      ]
    }
  },

  computed: {
    ...mapState(["isLogin"]),

    minBetAmount() {
      if (!this.lastActiveInfo.active_setting.length) {
        return 0
      }
      return this.lastActiveInfo.active_setting[0].amount
    },

    maxBonusAmount() {
      if (!this.lastActiveInfo.active_setting.length) {
        return 0
      }
      return this.lastActiveInfo.active_setting[this.lastActiveInfo.active_setting.length - 1].bonus
    },

    playgroundList() {
      return this.lastActiveInfo.wallet.map(item => item.name ? item.name.replace("钱包", "") : "")
    }

  },

  watch: {
    isLogin() {
      this.initActiveData()
    }
  },

  mounted () {
    this.initActiveData()
  },

  methods: {
    /**
     * 初始化活动信息
     * @return {Promise<void>}
     */
    async initActiveData() {
      this.loading = true
      try {
        const res = await this.$http(this.ApiSetting.active.dotaMojor.activeInit)
        console.info("初始化dotaMojor活动信息：", res)
        if (res.status === 1 && res.data) {
          const { active_one, active_two } = res.data
          if (active_one) {
            this.firstActiveInfo = active_one
            if (active_one.list) {
              this.mySwiperOptions.initialSlide = this.setInitialSlide(active_one.list)
              if (this.mySwiperOptions.initialSlide === 0) {
                this.swiperTransitionEnd = true
              }
              this.depositCountDown(active_one.list)
            }
          }
          if (active_two) this.lastActiveInfo = active_two
          const filterRes = {...res.data}
          delete filterRes.active_one
          delete filterRes.active_two
          this.initInfo = filterRes
        }
        this.loading = false
      } catch (error) {
        this.loading = false
        throw error
      }
    },

    /**
     * 默认选中开始时间距离当前时间最近的赛事，如果没有即将开始的，选中第一条
     * @param list
     * @return {number}
     */
    setInitialSlide(list) {
      let initIndex = 0
      if (list.length <= 1) return initIndex
      const currentTime = Date.now() / 1000
      const timeList = list.map(item => item.start_time - currentTime > 0 ? item.start_time - currentTime : 0)
      const minIndex = timeList.indexOf(Math.min(...timeList))
      if (timeList[minIndex] === 0) {
        return initIndex
      }
      return minIndex
    },

    /**
     * 竞猜倒计时
     * @param list
     */
    depositCountDown(list) {
      const currentTime = Date.now() / 1000
      let timeLeft = 0
      if (list && list.length) {
        for (let i = 0; i < list.length; i++) {
          const item = list[i]
          timeLeft = parseInt(Math.abs(item.deposit_end_time - currentTime))
          // 竞猜进行中 且 距离结束时间 <= 1小时
          if (item.game_status === 1 && timeLeft <= 60 * 60) {
            this.$set(this.firstActiveInfo.list[i], "_timeLeft", timeLeft)
            this.$set(this.firstActiveInfo.list[i], "_countTimer", null)
            item._timeLeft = timeLeft
            item._countTimer = null

            clearInterval(item._countTimer)
            item._countTimer = setInterval(() => {
              item._timeLeft--
              if (item._timeLeft < 1) {
                clearInterval(item._countTimer)
                this.initActiveData()
              }
            }, 1000)
          }
        }
      }
    },

    /**
     * 去竞猜
     * @param row
     * @param teamKey
     * @return {Promise<void>}
     */
    async toGuessing (row, teamKey) {
      if (this.guessingLoading) {
        return
      }
      if (!this.firstActiveInfo.status) {
        this.$message({ message: this.firstActiveInfo.tips, type: "warning" })
        return
      }

      this.guessingLoading = true
      const params = { match_id: row.id, team_id: row[teamKey] }
      try {
        console.info("dota2 mojor活动1竞猜入参：", params)
        const res = await this.$http(this.ApiSetting.active.dotaMojor.guessDotaMajor, params)
        console.info("dota2 mojor活动1竞猜响应：", res)
        if (res.status === 1) {
          this.initActiveData()
          this.$message({ message: res.message, type: "success" })
        }
        this.guessingLoading = false
      } catch (error) {
        this.guessingLoading = false
        throw error
      }
    },

    /**
     * 查看竞猜记录
     */
    viewGuessRecord() {
      if (this.loading) {
        this.$message({ message: "数据加载中，请稍后...", type: "warning" })
        return
      }
      if (!this.initInfo.is_login) {
        this.$message({ message: "请您先登录", type: "warning" })
        return
      }
      this.recordVisible = true
    },

    /**
     * 选择领取钱包
     */
    receiveBonus() {
      if (this.lastActiveInfo.status === 3) return

      if (this.lastActiveInfo.status !== 0) {
        this.$message({ message: this.lastActiveInfo.status_tips, type: "warning" })
        return
      }
      this.receiveVisible = true
    }
  },

  filters: {
    handlerFormatCountTime (time) {
      return formatCountTime(time)
    },
    formatDateByStr (time, formate) {
      return formatDate(time, formate)
    },
    formatNumberByInteger (value) {
      const amount = formatNumberSplit(value)
      return amount.substring(0, amount.length - 3)
    },
    formatNumberByFloat (value) {
      return formatNumberSplit(value)
    }
  },
  beforeDestroy () {
    if (this.firstActiveInfo.list && this.firstActiveInfo.list.length) {
      for (const item of this.firstActiveInfo.list) {
        if (item._countTimer) {
          clearInterval(item._countTimer)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.ellipsis-txt {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.linear-txt {
  background-image: linear-gradient(to bottom, #fff, #a6c9dd);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.dota-mojor {
  border-top: 0.1px solid transparent;
  background-repeat: no-repeat;
  position: relative;

  &.bg-1 {
    background-position: center 80px;
    background-image: url("../../../../assets/active/dotaMojor/banner_1.png");
  }
  &.bg-2 {
    background-position: center 80px;
    background-image: url("../../../../assets/active/dotaMojor/banner_2.png");
  }

  .animate-bg {
    pointer-events: none;
    position: fixed;
    z-index: 9;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  .date {
    height: 48px;
    margin-top: 693px;
    text-align: center;
    font-size: 24px;
    line-height: 48px;
    color: #fff;
    font-weight: normal;
    background: url("../../../../assets/active/dotaMojor/date_bg.png") no-repeat center top;
  }

  .active-tab {
    width: 812px;
    margin: 82px auto 0;
    display: flex;
    justify-content: space-between;

    li {
      width: 400px;
      height: 100px;
      cursor: pointer;
      &.has-tag {
        position: relative;
        &::before {
          position: absolute;
          content: "";
          top: -12px;
          right: -39px;
          width: 114px;
          height: 43px;
          background: url("../../../../assets/active/dotaMojor/tab_2_tag.png") no-repeat center top;
        }
      }
    }
    .bgFn(@num) {
      .tab-@{num} {
        transition: transform 0.3s;
        background-image: url("../../../../assets/active/dotaMojor/tab_@{num}.png");
        &:hover {
          transform: scale(1.03, 1.03);
        }
        &.active {
          transition: none;
          background-image: url("../../../../assets/active/dotaMojor/tab_@{num}_active.png");
          &:hover {
            transform: scale(1, 1);
          }
        }
      }
    }
    .bgFn(1);
    .bgFn(2);
  }

  .active-title {
    margin-top: 32px;
    height: 108px;
    background: url("../../../../assets/active/dotaMojor/active_title.png") no-repeat center top;
  }

  .active-content {
    margin-top: 27px;
    font-weight: normal;
    font-size: 14px;
    color: #ffffff;
    text-align: center;
  }

  .guess-group {
    width: 1100px;
    margin: 47px auto 0;
    position: relative;
    .record-btn {
      width: 100px;
      height: 40px;
      position: absolute;
      outline: 0;
      border: 0;
      right: -2px;
      top: -81px;
      background: url("../../../../assets/active/dotaMojor/record_btn.png");
      cursor: pointer;
      span {
        .linear-txt;
        font-size: 16px;
      }
      &:hover {
        background: url("../../../../assets/active/dotaMojor/record_btn_hover.png");
      }
    }
    .guess-swiper {
      width: 1100px;
      height: 368px;
      overflow: hidden;

      .swiper-slide {
        width: 800px;
        height: inherit;
        background-image: url("../../../../assets/active/dotaMojor/group_item.png");
        filter: brightness(0.80);
        &::before {
          opacity: 0;
        }
        * {
          opacity: 0;
        }
        &.swiper-slide-active {
          filter: brightness(1);
          &::before {
            opacity: 1;
          }
          * {
            opacity: 1;
          }
        }

        &.not-started, &.progress, &.end {
          position: relative;
          &::before {
            position: absolute;
            width: 120px;
            height: 48px;
            top: 12px;
            right: 4px;
            font-size: 18px;
            line-height: 46px;
            text-align: center;
          }
        }
        &.not-started {
          &::before {
            content: "未开始";
            background: url("../../../../assets/active/dotaMojor/not_started_icon.png");
            color: #aed8e8;
          }
        }
        &.progress {
          &::before {
            content: "进行中";
            background: url("../../../../assets/active/dotaMojor/progress_icon.png");
            color: #d0f4ff;
          }
        }
        &.end {
          &::before {
            content: "已结束";
            background: url("../../../../assets/active/dotaMojor/end_icon.png");
            color: #728793;
          }
        }

        .match-title {
          width: 330px;
          margin: 16px auto 0;
          font-weight: normal;
          /deep/ .ivu-tooltip-rel {
            span {
              display: inline-block;
              width: 100%;
              font-size: 24px;
              text-align: center;
              .ellipsis-txt;
              .linear-txt;
            }
          }
        }

        .match-content {
          display: flex;
          width: 692px;
          margin: 18px auto 0;

          .team-item {
            width: 212px;
            text-align: center;
            &.already, &.win, &.lose, &.draw {
              width: 212px;
              height: 272px;
              background: url("../../../../assets/active/dotaMojor/team_already.png");
            }
            &.win, &.lose, &.draw {
              position: relative;
              &::before {
                position: absolute;
                content: "";
                top: 2px;
                left: 2px;
                width: 76px;
                height: 72px;
              }
            }
            &.win {
              &::before {
                background: url("../../../../assets/active/dotaMojor/win.png");
              }
            }
            &.lose {
              &::before {
                background: url("../../../../assets/active/dotaMojor/lose.png");
              }
            }
            &.draw {
              &::before {
                background: url("../../../../assets/active/dotaMojor/draw.png");
              }
            }
            .team-logo {
              display: inline-block;
              width: 128px;
              height: 128px;
              margin-top: 15px;
              background: url("../../../../assets/active/dotaMojor/team_logo_bg.png");
              img {
                margin-top: 17%;
                height: 60%;
                max-width: 60%;
              }
            }
            h5 {
              width: 100%;
              font-weight: normal;
              font-size: 20px;
              margin: 12px auto 0;
              color: #ffffff;
              /deep/ .ivu-tooltip-rel {
                span {
                  display: inline-block;
                  width: 100%;
                  .ellipsis-txt;
                }
              }
            }
            .guessing {
              width: 128px;
              height: 48px;
              margin-top: 20px;
              font-size: 16px;
              box-sizing: border-box;
              border-radius: 4px;
              color: #fff;
              border: 2px solid transparent;
              background-image: linear-gradient(#22547c, #336b87), linear-gradient(#4e83a2, #4e83a2);
              background-origin: border-box;
              background-clip: content-box, border-box;
              transition: all 0.2s;
              cursor: pointer;
              &:hover {
                background-image: linear-gradient(#227cac, #44acc5), linear-gradient(#44acc5, #44acc5);
              }
            }
          }

          .team-center {
            flex: 1;
            color: #ffffff;
            text-align: center;
            font-size: 16px;
            .time {
              margin-top: 10px;
            }
            .vs {
              margin: 10px auto 0;
              display: block;
              width: 99px;
              height: 84px;
              background: url("../../../../assets/active/dotaMojor/vs_icon.png") no-repeat;
            }
            .game-type {
              display: block;
              margin-top: 15px;
              font-size: 16px;
            }
            .deposit-time {
              margin-top: 45px;
              font-size: 14px;
              small {
                display: inline-block;
                font-size: 16px;
              }
            }
          }
        }
      }
    }

    .swiper-button-prev, .swiper-button-next {
      width: 98px;
      height: 98px;
      top: 139px;
      margin-top: 0;
      transition: transform 0.3s;
      &:before, &:after {
        display: none;
      }
    }
    .swiper-button-prev {
      left: 27px;
      background: url("../../../../assets/active/dotaMojor/swiper_prev.png") no-repeat center center;
      &:hover {
        background: url("../../../../assets/active/dotaMojor/swiper_prev_hover.png");
      }
    }
    .swiper-button-next {
      right: 27px;
      background: url("../../../../assets/active/dotaMojor/swiper_next.png") no-repeat center center;
      &:hover {
        background: url("../../../../assets/active/dotaMojor/swiper_next_hover.png");
      }
    }

    .placeholder-pic {
      margin: 0 auto;
      width: 800px;
      height: 360px;
      background: url("../../../../assets/active/dotaMojor/team_pic.png");
    }
  }

  .rebate-panel {
    margin: 36px auto 0;
    width: 1100px;
    height: 616px;
    background: url("../../../../assets/active/dotaMojor/rebate_bg.png");
    table {
      width: 100%;
      font-size: 14px;
      text-align: center;
      line-height: 61.6px;
      tr {
        th {
          font-weight: normal;
          color: #adc8c7;
        }
        td {
          width: 25%;
          color: #ffffff;
        }
      }
    }
  }

  .receive-rebate {
    display: block;
    margin: 38px auto 0;
    width: 240px;
    height: 72px;
    outline: 0;
    border: 0;
    background: url("../../../../assets/active/dotaMojor/receive_btn.png");
    transition: transform 0.3s;
    cursor: pointer;
    &:hover {
      transform: scale(1.03, 1.03);
    }
    &.received {
      cursor: auto;
      background: url("../../../../assets/active/dotaMojor/received_btn.png");
      &:hover {
        transform: none;
      }
    }
  }

  .info-count {
    width: fit-content;
    font-size: 16px;
    line-height: 48px;
    text-align: center;
    color: #fff;
    box-sizing: border-box;
    border-radius: 26px;
    border: 2px solid #192131;
    background: rgba(0,0,0,0.2);
    padding: 0 26px;
    span {
      color: #90fff1;
      font-size: 20px;
      vertical-align: top;
    }
  }

  .rules {
    width: 1104px;
    dt {
      height: 103px;
      background: url("../../../../assets/active/dotaMojor/rules_title.png") no-repeat center top;
    }
    dd {
      margin-top: 30px;
      overflow: hidden;
      ul {
        margin: 35px 78px 0 99px;
        li {
          margin-top: 2px;
          font-size: 14px;
          line-height: 34px;
          color: #bae1e5;
          display: flex;
          i {
            font-weight: bold;
            margin-right: 10px;
          }
        }
      }
    }
  }

  .guess-dota-mojor {
    .rules {
      margin: 50px auto 0;
      dd {
        height: 424px;
        background:  url("../../../../assets/active/dotaMojor/rule1_bg.png") no-repeat center top;
      }
    }
  }

  .rebate-dota-mojor {
    .rules {
      margin: 73px auto 0;
      dd {
        height: 344px;
        background:  url("../../../../assets/active/dotaMojor/rule2_bg.png") no-repeat center top;
      }
    }
  }

  .dota-mojor-back-home {
    padding: 23px 0;
    text-align: center;
    a {
      display: inline-block;
      width: 240px;
      height: 72px;
      background: url("../../../../assets/active/dotaMojor/back_home.png");
      transition: transform 0.3s;
      &:hover {
        transform: scale(1.03, 1.03);
      }
    }
  }
}
</style>
<style lang="less">
.dota-mojor-rule-liushui {
  border-color: #405a82;
  .ptgame_more_rule {
    tr {
      th {
        color: #405a82;
      }
    }
  }
  &[x-placement^=bottom] {
    .popper__arrow {
      border-bottom-color: #405a82;
    }
  }
  &[x-placement^="top"] {
    .popper__arrow {
      border-top-color: #405a82;
    }
  }
}
</style>

