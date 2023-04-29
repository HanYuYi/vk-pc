<template>
  <div class="carefully-selected">

    <dl class="match-panel">
      <dt class="panel-header">
        <h2></h2>
        <p class="desc">
          活动期间，会员每日首存≥100元，完成每日精选赛事竞猜玩法“独赢”猜中，即可获得8元奖金。
          <button @click="openMyRecordDialog">竞猜记录</button>
        </p>
      </dt>
      <template v-if="!loading">
        <dd v-if="initInfo.list.length" class="panel-body" :class="{large: isLogin}">
          <swiper :options="mySwiperOptions" class="carefully-selected-swiper">
            <swiper-slide v-for="(item, index) in initInfo.list" :key="index">
              <h2 class="match-title">{{ item.game_name }}</h2>
              <div class="match-content">
                <!-- result:   -1: 未开  0: 和局，-2: 输， >0: 赢队伍的id -->
                <div class="team-left" :class="[
                    {'already': item.guess_who_id === item.team_id_1},
                    {'has-result': item.guess_who_id === item.team_id_1 && item.result !== -1},
                    {'win': item.guess_who_id === item.team_id_1 && item.result > 0},
                    {'lose': item.guess_who_id === item.team_id_1 && item.result === -2},
                    {'draw': item.guess_who_id === item.team_id_1 && item.result === 0}
                    ]">
                  <img v-lazy="{
                    src: item.l_team_logo,
                    error: $store.state.lazyMatchAvatar.error,
                    loading: $store.state.lazyMatchAvatar.loading
                  }" class="team-logo"/>
                  <h5>
                    <Tooltip class="tooltip_2022" :content="item.l_team_name" placement="bottom">
                      <span>{{ item.l_team_name }}</span>
                    </Tooltip>
                  </h5>
                  <!--  -1: 未开出   0: 和局   -2: 输  大于0: 赢队伍的id-->
                  <button v-if="item.game_status === 1 && item.guess_who_id === -1" @click="toGuessing(item, 'team_id_1')" class="guessing world-cup2022-btn1">
                    <span class="world-cup2022-sub-gradient-color">猜</span>
                  </button>
                </div>

                <div class="team-center">
                  <p class="time">{{ item.date_time }}</p>
                  <!--game_status 0：未开始   1：竞猜中   2：进行中   4：已结束-->
                  <i v-if="item.game_status === 0 || item.game_status === 1" class="game-status">未开始</i>
                  <i v-if="item.game_status === 2" class="game-status run">进行中</i>
                  <i v-if="item.game_status === 3" class="game-status end">已结束</i>
                  <em class="vs"></em>
                  <small class="game-type">{{ item.game_type }}</small>

                  <template v-if="item.game_status === 0 || item.game_status === 1">
                    <p v-if="item.game_status === 1 && item.hasOwnProperty('_countTimer')" class="deposit-time">
                      竞猜倒计时<br>
                      <small>{{ item._timeLeft | handlerFormatCountTime }}</small>
                    </p>
                    <p v-else class="deposit-time">
                      该场赛事要求竞猜时间<br>
                      <small>{{ item.deposit_start_time * 1000 | formatDateByStr('MM.dd HH:mm') }}-{{ item.deposit_end_time * 1000 | formatDateByStr('MM.dd HH:mm') }}</small>
                    </p>
                  </template>
                </div>

                <div class="team-right" :class="[
                    {'already': item.guess_who_id === item.team_id_2},
                    {'has-result': item.guess_who_id === item.team_id_2 && item.result !== -1},
                    {'win': item.guess_who_id === item.team_id_2 && item.result > 0},
                    {'lose': item.guess_who_id === item.team_id_2 && item.result === -2},
                    {'draw': item.guess_who_id === item.team_id_2 && item.result === 0}
                    ]">
                  <img v-lazy="{
                    src: item.r_team_logo,
                    error: $store.state.lazyMatchAvatar.error,
                    loading: $store.state.lazyMatchAvatar.loading
                  }" class="team-logo"/>
                  <h5>
                    <Tooltip class="tooltip_2022" :content="item.r_team_name" placement="bottom">
                      <span>{{ item.r_team_name }}</span>
                    </Tooltip>
                  </h5>
                  <button v-if="item.game_status === 1 && item.guess_who_id === -1" @click="toGuessing(item, 'team_id_2')" class="guessing world-cup2022-btn1">
                    <span class="world-cup2022-sub-gradient-color">猜</span>
                  </button>
                </div>
              </div>
            </swiper-slide>
          </swiper>
          <div class="swiper-button-prev carefully-selected-swiper-prev world-cup2022-sub-swiper-btn"
               slot="button-prev"></div>
          <div class="swiper-button-next carefully-selected-swiper-next world-cup2022-sub-swiper-btn"
               slot="button-next"></div>

          <p v-if="isLogin" class="remaining-times">可竞猜场次:{{ initInfo.quiz_times }}次</p>
        </dd>
        <dd v-else>
          <div class="placeholder-pic"></div>
        </dd>
      </template>
    </dl>

    <!-- 规则-->
    <dl class="rules">
      <dt></dt>
      <dd>
        <ul>
          <li><i>1</i><p>每日未发起提款前的存款都视为首充。</p></li>
          <li><i>2</i><p>当日会员每满足首存100元即可获得一次赛事竞猜；此竞猜次数仅限当天使用有效，隔日无效。</p></li>
          <li><i>3</i><p>若赛事时间为00:00，则用户需要在指定时间内完成首存和赛事竞猜，即可竞猜成功。</p></li>
          <li><i>4</i><p>此竞猜结果分为：输、和、赢；参与精选赛事 竞猜结算（赢）猜中，即可获得8元奖金，若竞猜结果结算为“和”将会视为无效竞猜。</p></li>
          <li><i>5</i><p>符合条件的用户只需等待当日赛事结束即可，工作人员将会在24小时内统一派彩，活动彩金将会添加至用户主钱包中，彩金流水需要完成全站5倍有效流水。</p></li>
          <li><i>6</i><p>电竞赔率＜1.5、亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水；PT电子游戏中以下游戏不算有效流水：<activeptliushui color="#ffffff" styleClass="world-cup2022-sub-rule-liushui" />。</p></li>
          <li><i>7</i><p>每位有效玩家、每个手机号码、电子邮箱、IP地址、每张银行卡、每台设备只能享受一次优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利；VKGAME对本活动保有最终解释权。</p></li>
        </ul>
      </dd>
    </dl>

    <!-- 申请记录 dialog-->
    <myRecord :visible.sync="myRecordVisible" />
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import myRecord from './dialogs/myRecord'
import { mapState } from 'vuex'
import { formatDate, formatCountTime } from '@/utils/util'

export default {
  name: 'carefullySelected',
  components: { Swiper, SwiperSlide, myRecord },
  data() {
    return {
      loading: false,
      initInfo: {
        list: []
      },

      mySwiperOptions: {
        navigation: { nextEl: '.carefully-selected-swiper-next', prevEl: '.carefully-selected-swiper-prev' }
      },
      myRecordVisible: false
    }
  },
  watch: {
    isLogin(bool, oldBool) {
      if (Boolean(bool) !== Boolean(oldBool)) {
        this.initActiveData(true)
      }
    }
  },
  computed: {
    ...mapState(["isLogin"])
  },
  mounted () {
    this.initActiveData(true)
  },
  methods: {
    /**
     * 初始化世界杯信息
     * @param isLoading
     * @return {Promise<void>}
     */
    async initActiveData (isLoading = false) {
      if (isLoading) this.loading = true
      try {
        const res = await this.$http(this.ApiSetting.active.worldCup2022Sub.worldCupSubInit)
        console.group(`${'-'.repeat(20)}2022世界杯精选赛事${'-'.repeat(20)}`)
        console.info("初始化2022世界杯精选赛事信息：", res)
        if (res.status === 1 && res.data) {
          this.depositCountDown(res.data.list)
          this.initInfo = res.data
          this.$emit("backTime", this.initInfo.show_time)
        }
        this.loading = false
      } catch (error) {
        console.info(error)
        this.loading = false
      }
    },

    /**
     * 竞猜倒计时
     * @param list
     */
    depositCountDown(list) {
      const currentTime = Date.now() / 1000
      let timeLeft = 0
      if (list && list.length) {
        for (const item of list) {
          timeLeft = parseInt(Math.abs(item.deposit_end_time - currentTime))
          if (item.game_status === 1 && timeLeft <= 60 * 60) {
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
      if (!this.isLogin) {
        this.$message({ message: '请您先登录', type: 'warning' })
        return
      }
      if (!this.initInfo.status) {
        this.$message({ message: this.initInfo.tips, type: 'warning' })
        return
      }

      const params = {
        match_id: row.id,
        team_id: row[teamKey]
      }
      try {
        console.info("2022世界杯精选赛竞猜入参：", params)
        const res = await this.$http(this.ApiSetting.active.worldCup2022Sub.worldWorldCupChosen, params)
        console.info("2022世界杯精选赛竞猜响应：", res)
        if (res.status === 1) {
          this.initActiveData()
          this.$message({ message: res.message, type: 'success' })
        }
      } catch (error) {
        console.info(error)
      }
    },

    /**
     * 开启竞猜记录dialog
     */
    openMyRecordDialog() {
      if (!this.isLogin) {
        this.$message({ message: '请您先登录', type: 'warning' })
        return
      }
      this.myRecordVisible = true
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
.carefully-selected {
  width: 1240px;
  margin: 55px auto 0;
  .match-panel {
    .panel-header {
      h2 {
        margin: 0 auto;
        width: 362px;
        height: 31px;
        background: url("../../../../assets/active/worldCup2022Sub/active_title.png") no-repeat center top;
      }
      .desc {
        text-align: center;
        margin-top: 12px;
        font-size: 14px;
        line-height: 30px;
        color: #fff;
        button {
          border: 0;
          background: url("../../../../assets/active/worldCup2022Sub/carefully_selected_record.png") no-repeat;
          width: 106px;
          height: 30px;
          cursor: pointer;
          font-size: 14px;
          line-height: 28px;
          color: #f34064;
          &:hover {
            filter: saturate(1.5);
          }
        }
      }
    }

    .panel-body {
      position: relative;
      overflow: hidden;
      margin-top: 25px;
      animation: show-body-animate 0.26s;
      animation-fill-mode: forwards;
      &.large {
        animation: show-body-animate-large 0.26s;
      }

      @keyframes show-body-animate {
        from { height: 0; }
        to { height: 289px; }
      }
      @keyframes show-body-animate-large {
        from { height: 0; }
        to { height: 325px; }
      }
      .carefully-selected-swiper {
        width: 790px;
        height: 288px;
        border-radius: 10px;
        box-shadow: 0px 1px 1px 0 rgba(255, 0, 57, 0.3), inset 0px 1px 3px 0 rgba(0, 0, 0, 0.4);
        background-color: rgba(69, 8, 30, 0.5);

        .swiper-slide {
          .match-title {
            width: fit-content;
            margin: 0 auto;
            font-weight: normal;
            line-height: 38px;
            padding: 0 26px;
            font-size: 16px;
            color: #000;
            background-image: linear-gradient(#fff, #ffe9c7);
            box-shadow: 0px 3px 0 0 rgba(0, 0, 0, 0.18);
            clip-path: polygon(0% 0%, 100% 0%, calc(100% - 18px) 100%, 18px 100%);
          }
          .match-content {
            margin: 0 auto;
            width: 497px;
            height: 250px;
            display: flex;
            justify-content: space-between;
            .team-left, .team-right {
              margin-top: 57px;
              width: 146px;
              text-align: center;
              h5 {
                font-weight: normal;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                font-size: 16px;
                width: 90%;
                margin: 10px auto 0;
                color: #ffffff;
              }
              .team-logo {
                max-width: 63px;
                height: 53px;
                margin-top: 20px;
              }
              .guessing {
                display: inline-block;
                margin-top: 22px;
                width: 100px;
                height: 41px;
                background: url("../../../../assets/active/worldCup2022Sub/my_guess_mini.png") no-repeat;
                &:hover {
                  background: url("../../../../assets/active/worldCup2022Sub/my_guess_mini_hover.png") no-repeat;
                }
                span {
                  top: 9px;
                }
              }
              &.already, &.has-result {
                position: relative;
                &:before {
                  position: absolute;
                  content: "";
                }
              }
              &.already {
                .team-logo {
                  position: relative;
                  z-index: 1;
                }
                &:before {
                  top: 0;
                  left: 0;
                  width: 146px;
                  height: 170px;
                  background: url("../../../../assets/active/worldCup2022Sub/game_already.png") no-repeat;
                }
              }
              &.has-result {
                &:before {
                  top: -9px;
                  left: auto;
                  right: 0;
                  width: 227px;
                  height: 179px;
                  background: url("../../../../assets/active/worldCup2022Sub/game_already_result.png") no-repeat;
                  z-index: 1;
                }
                .team-logo {
                  z-index: auto;
                }
                &.win, &.lose, &.draw {
                  &:after {
                    position: absolute;
                    content: "";
                    top: -25px;
                    left: 30px;
                    width: 88px;
                    height: 88px;
                    z-index: 2;
                  }
                }
                &.win {
                  &:after {
                    background: url("../../../../assets/active/worldCup2022Sub/game_win.png") no-repeat center;
                  }
                }
                &.lose {
                  &:after {
                    background: url("../../../../assets/active/worldCup2022Sub/game_lose.png") no-repeat center;
                  }
                }
                &.draw {
                  &:after {
                    background: url("../../../../assets/active/worldCup2022Sub/game_draw.png") no-repeat center;
                  }
                }
              }
            }
            .team-center {
              text-align: center;
              .time {
                font-family: Roboto;
                font-size: 18px;
                font-weight: bold;
                color: #fff;
                margin-top: 15px;
              }
              .game-status {
                margin-top: 10px;
                display: inline-block;
                width: 54px;
                height: 20px;
                border-radius: 4px;
                text-align: center;
                font-size: 12px;
                line-height: 18px;
                color: #fff;
                border: solid 1px #fff;
                font-style: normal;
                &.run {
                  color: #f34064;
                  border: solid 1px #f34064;
                }
                &.end {
                  color: #888888;
                  border: solid 1px #888888;
                }
              }
              .vs {
                margin: 12px auto 0;
                display: block;
                width: 49px;
                height: 49px;
                background: url("../../../../assets/active/worldCup2022Sub/compensation_vs.png") no-repeat;
              }
              .game-type {
                display: block;
                margin-top: 10px;
                font-size: 18px;
                font-weight: bold;
                color: #fff;
              }
              .deposit-time {
                margin-top: 12px;
                font-family: Roboto;
                font-size: 14px;
                color: #ffedd1;
                small {
                  font-size: 16px;
                }
              }
            }
          }
        }
      }
      .swiper-button-prev, .swiper-button-next {
        top: 132px;
      }
      .swiper-button-prev {
        left: 191px;
      }
      .swiper-button-next {
        right: 191px;
      }
    }
    .placeholder-pic {
      width: 790px;
      height: 288px;
      margin: 25px auto 0;
      border-radius: 11px;
      overflow: hidden;
      background: url("../../../../assets/active/worldCup2022Sub/carefully_selected_pic.jpg");
    }
    .remaining-times {
      margin-top: 20px;
      font-size: 16.5px;
      font-weight: bold;
      text-align: center;
      color: #ffedd1;
    }
  }

  .rules {
    margin-top: 46px;
    margin-bottom: 25px;
  }
}
</style>
<style lang="less">
.world-cup2022-sub-rule-liushui {
  border-color: #f34064;
  .ptgame_more_rule {
    tr {
      th {
        color: #f34064;
      }
    }
  }
  &[x-placement^=bottom] {
    .popper__arrow {
      border-bottom-color: #f34064;
    }
  }
  &[x-placement^="top"] {
    .popper__arrow {
      border-top-color: #f34064;
    }
  }
}
</style>
