<template>
  <div class="compensation">

    <dl class="match-panel">
      <dt class="panel-header">
        共<b>{{ initInfo.list.length }}</b>场包赔赛事
      </dt>
      <dd class="panel-body">
        <swiper :options="mySwiperOptions" class="compensation-swiper">
          <swiper-slide v-for="(item, index) in initInfo.list" :key="index" :class="{end: item.status === 1}">
            <div class="match-content">
              <h2 class="title">{{ item.game_name }}</h2>
              <p v-if="item.game_status === 5" class="time">进行中</p>
              <p v-else-if="item.game_status === 3 || item.game_status === 4" class="time">已结束</p>
              <p v-else class="time">{{ item.date_time }}</p>
              <div class="team-group">
                <div class="team-left">
                  <img v-lazy="{
                    src: item.l_team_logo,
                    error: $store.state.lazyMatchAvatar.error,
                    loading: $store.state.lazyMatchAvatar.loading
                  }"/>
                  <h5>
                    <Tooltip class="tooltip_2022" :content="item.l_team_name" placement="bottom">
                      <span>{{ item.l_team_name }}</span>
                    </Tooltip>
                  </h5>
                </div>
                <em></em>
                <div class="team-right">
                  <img v-lazy="{
                    src: item.r_team_logo,
                    error: $store.state.lazyMatchAvatar.error,
                    loading: $store.state.lazyMatchAvatar.loading
                  }"/>
                  <h5>
                    <Tooltip class="tooltip_2022" :content="item.r_team_name" placement="bottom">
                      <span>{{ item.r_team_name }}</span>
                    </Tooltip>
                  </h5>
                </div>
              </div>
            </div>
            <div class="match-footer">
              <!--game_status 1：不能存款   2：存款进行中   3：结束24小时内，可申请、展示按钮   4：彻底结束（超过24小时）   5：赛事进行中-->
              <button v-if="item.game_status === 3"
                      @click="toApplyBonus(item)"
                      class="world-cup2022-btn1">
                <span class="world-cup2022-sub-gradient-color">申请包赔金</span>
              </button>
              <template v-if="item.game_status === 1 || item.game_status === 2">
                <p v-if="item.game_status === 2 && item.hasOwnProperty('_countTimer')" class="deposit-time">
                  请在<strong>{{ item._timeLeft | handlerFormatCountTime }}</strong>内完成活动存款要求<br>
                  点击进入<router-link :to="{path:'/user/finance/'}">财务中心</router-link>
                </p>
                <p v-else class="deposit-time">
                  该场赛事要求存款时间<br>
                  {{ item.deposit_start_time * 1000 | formatDateByStr('MM-dd HH:mm') }}-{{ item.deposit_end_time * 1000 | formatDateByStr('MM-dd HH:mm') }}
                </p>
              </template>
            </div>
          </swiper-slide>
        </swiper>
        <div class="swiper-button-prev compensation-swiper-prev world-cup2022-sub-swiper-btn"
             slot="button-prev"></div>
        <div class="swiper-button-next compensation-swiper-next world-cup2022-sub-swiper-btn"
             slot="button-next"></div>
      </dd>
    </dl>

    <dl class="table-com">
      <dt class="table-com-title">
        <h3></h3>
        <p class="desc">威客电竞VIP会员在活动存款时间内存款并参与<span>指定体育赛事</span>的盘口投注，若单笔注单结算为负盈利，即可申请注单包赔，领取包赔金。</p>
      </dt>
      <dd class="table-com-content">
        <table>
          <thead>
            <tr>
              <th v-for="(title, index) in tableData.title" :key="index" :width="754 / 6">{{ title }}</th>
            </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in tableData.content[3].length" :key="index">
            <td>VIP{{ index }}</td>
            <td v-if="index === 0" :rowspan="tableData.content[3].length">{{ tableData.content[1] }}</td>
            <td v-if="index === 0" :rowspan="tableData.content[3].length">{{ tableData.content[2] }}</td>
            <td>{{ tableData.content[3][index] }}</td>
            <td>{{ tableData.content[4][index] }}</td>
            <td v-if="index === 0" :rowspan="tableData.content[3].length">{{ tableData.content[5] }}</td>
          </tr>
          </tbody>
        </table>
      </dd>
    </dl>

    <!-- 规则-->
    <dl class="rules">
      <dt></dt>
      <dd>
        <ul>
          <li><i>1</i><p>存款时间定义：每场赛事开赛前24小时内的累计存款，每次存款时间内的存款只可申请一次保险注单活动。<br>例：A场保单赛事时间为11月21日04:00，有效存款时间为11月20日04:00-11月21日04:00，在此期间会员累计存款≥100元；若会员参与本场赛事投注，单笔投注额≥100元即可参加A场保单赛事。</p></li>
          <li><i>2</i><p>参与包赔优惠的会员需要在体育赛事（威客体育、FB体育、BTI体育、平博Sports、皇冠体育、IM体育、沙巴体育）投注独赢，让球，大小，单双四个盘口，允许投注上半场或全场及滚球（不包括特殊盘口）；盘口赔率要求：投注指定赛事的赔率不得低于欧盘1.75、亚洲盘及马来盘0.75。</p></li>
          <li><i>3</i><p>申请包赔金的注单需为全输，若会员所投注的注单结算为输一半则视为无效注单，不可申请。</p></li>
          <li><i>4</i><p>符合条件的用户需在注单结算后的24小时内联系在线客服申请包赔金，逾期则视为自动放弃。</p></li>
          <li><i>5</i><p>此活动不与平台体育首存活动、世界杯专享救援金活动、威客体育包赔活动共享。若用户参与了体育首存，需先完成体育首存活动流水才可参加本活动；同样体育救援金与体育包赔活动不共享，活动同时进行时，只可选择一个参加。</p></li>
          <li><i>6</i><p>包赔金将在审核通过后的3日内派发至用户指定的体育钱包（威客体育、FB体育、BTI体育、平博Sports、皇冠体育、IM体育、沙巴体育七选一）中，包赔金需在所选游戏中完成对应的流水要求，流水未完成前不可再次申请本活动；当用户对应体育钱包余额≤原钱包余额且无未结算注单时，系统将自动判定已完成活动规定的有效流水。亚洲盘赔率<0.75、欧洲盘≤1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水。</p></li>
          <li><i>7</i><p>赛事取消或改期或其他原因导致赛事不能正常进行，则对应当期的保险投注优惠取消；若保单赛事因官方原因改变赛事时间，则有效存款时间从原开赛时间前24小时开始计算。</p></li>
          <li><i>8</i><p>每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能使用一个账号享受优惠。对违规的用户，VKGAME保留无限期审核， 和扣回红利及所产生的利润权利，本活动最终解释权归VKGAME所有。</p></li>
        </ul>
      </dd>
    </dl>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import { mapState } from 'vuex'
import { formatDate, formatCountTime } from '@/utils/util'

export default {
  name: 'compensation',
  components: { Swiper, SwiperSlide },
  data() {
    return {
      currentTime: Number.parseInt(Date.now() / 1000),

      initInfo: {
        list: []
      },

      mySwiperOptions: {
        slidesPerView: 2,
        spaceBetween: 53,
        navigation: { nextEl: '.compensation-swiper-next', prevEl: '.compensation-swiper-prev' },
      },

      tableData: {
        title: ["会员等级要求", "存款金额(￥)", "单笔投注金额(￥)", "包赔返利", "包赔金上限(￥)", "流水要求"],
        content: [
          "",
          "≥100",
          "≥100",
          ["10%", "12%", "15%", "15%", "15%", "18%", "18%", "18%", "20%", "20%", "20%", "25%", "30%"],
          [38, 68, 128, 168, 188, 258, 288, 388, 528, 688, 888, "1,888", "3,888"],
          "3倍体育流水"
        ]
      }
    }
  },
  watch: {
    isLogin(bool, oldBool) {
      if (Boolean(bool) !== Boolean(oldBool)) {
        this.initActiveData()
      }
    }
  },
  computed: {
    ...mapState(["isLogin"])
  },
  mounted () {
    this.initActiveData()
  },
  methods: {
    /**
     * 初始化活动信息
     * @return {Promise<void>}
     */
    async initActiveData () {
      try {
        const res = await this.$http(this.ApiSetting.active.worldCup2022Sub.worldCupIndemnityInit)
        console.info("初始化2022世界杯专享包赔3888信息：", res)
        if (res.status === 1 && res.data) {
          this.depositCountDown(res.data.list)
          this.initInfo = res.data
        }
      } catch (error) {
        console.info(error)
      }
    },

    /**
     * 赛事存款倒计时
     * @param list
     */
    depositCountDown(list) {
      const currentTime = Date.now() / 1000
      let timeLeft = 0
      if (list && list.length) {
        for (const item of list) {
          timeLeft = parseInt(Math.abs(item.deposit_end_time - currentTime))
          if (item.game_status === 2 && timeLeft <= 24 * 60 * 60) {
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
     * 申请包赔金
     * @param row
     */
    toApplyBonus (row) {
      if (!this.isLogin) {
        this.$message({ message: '请您先登录', type: 'warning' })
        return
      }
      if (row.status_tip && row.status_tip.length) {
        this.$message({ message: row.status_tip, type: 'warning' })
        return
      }
      this.openKfWindow()
    }
  },
  filters: {
    handlerFormatCountTime (time) {
      return formatCountTime(time)
    },

    formatDateByStr (time, formate) {
      return formatDate(time, formate)
    }
  },

  beforeDestroy () {
    if (this.initInfo.list && this.initInfo.list.length) {
      for (const item of this.initInfo.list) {
        if (item._countTimer) {
          clearInterval(item._countTimer)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.compensation {
  width: 1240px;
  margin: 55px auto 0;
  .match-panel {
    width: 1020px;
    margin: 0 auto;
    border-radius: 10px;
    box-shadow: 0px 1px 1px 0 rgba(255, 0, 57, 0.3), inset 0px 1px 3px 0 rgba(0, 0, 0, 0.4);
    border-top: 0.1px solid transparent;
    background-color: rgba(69, 8, 30, 0.4);
    height: 0;
    overflow: hidden;
    animation: show-body-animate 0.3s;
    animation-fill-mode: forwards;

    @keyframes show-body-animate {
      from { height: 0; }
      to { height: 368px; overflow: visible; }
    }

    .panel-header {
      margin-top: 24px;
      font-size: 20px;
      line-height: 22px;
      text-align: center;
      color: #fff;
      b {
        font-size: 22px;
        color: #fdf4aa;
      }
    }
    .panel-body {
      position: relative;
      margin-top: 29px;

      .compensation-swiper {
        width: 815px;
        height: 293px;
        .swiper-slide {
          background: url("../../../../assets/active/worldCup2022Sub/compensation_slide.png") no-repeat;
          .match-content {
            height: 204px;
            overflow: hidden;
            .title {
              margin-top: 26px;
              font-size: 14px;
              line-height: 14px;
              text-align: center;
              color: #ffedd1;
              font-weight: normal;
            }
            .time {
              margin-top: 9px;
              font-family: Roboto;
              font-size: 18px;
              font-weight: bold;
              line-height: 18px;
              text-align: center;
              color: #fff;
            }
            .team-group {
              width: 260px;
              margin: 18px auto 0;
              display: flex;
              justify-content: space-between;
              .team-left, .team-right {
                width: 63px;
                img {
                  height: 53px;
                }
                h5 {
                  width: 131px;
                  margin: 13px 0 0 -34px;
                  text-align: center;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  font-size: 16px;
                  font-weight: normal;
                  line-height: 16px;
                  color: #fff;
                }
              }
              em {
                display: block;
                width: 49px;
                height: 49px;
                background: url("../../../../assets/active/worldCup2022Sub/compensation_vs.png") no-repeat;
              }
            }
          }
          .match-footer {
            text-align: center;
            .world-cup2022-btn1 {
              margin: 12px auto 0;
            }
            .deposit-time {
              line-height: 21px;
              margin-top: 23px;
              font-family: Roboto;
              font-size: 16px;
              color: #ffedd1;
              a {
                text-decoration: underline;
              }
            }
          }
          &.end {
            .match-content {
              .time {
                font-size: 16px;
              }
            }
          }
        }
      }
      .swiper-button-prev, .swiper-button-next {
        top: 87px;
      }
      .swiper-button-prev {
        left: -34px;
      }
      .swiper-button-next {
        right: -34px;
        perspective: 3000px;
      }
    }
  }

  .table-com {
    .table-com-content {
      width: 770px;
      margin: 27px auto 0;
      table {
        width: 754px;
      }
    }
  }

  .rules {
    margin-top: 54px;
    margin-bottom: 19px;
  }
}
</style>
