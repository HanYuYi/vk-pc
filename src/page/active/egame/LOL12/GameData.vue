<template>
  <div class="gamedata-page">
    <div class="data-nav-wrapper" v-if="isS12GameBegin == 'before'">
      <div :class="{ 'game-nav-active': activeGameCode == item.tournament_code }" @click="changeGame(item, i)"
        class="game-nav" v-for="(item, i) in disGameMatch" :key="i">
        <div class="game-label" :class="`game-label-${item.tournament_code}`">{{item.tournament_name}}</div>
      </div>
    </div>
    <!-- 参赛战队 -->
    <div class="block block-CSZD" :style="isExpand && { height: `${incHeight + 734}px` }">
      <div class="border" :style="isExpand && { height: `${incHeight + 184}px` }"></div>
      <div class="display">
        <div class="title-wrapper">
          <div class="title title-cszd">参赛战队</div>
          <div class="right-wrapper">
            <div @click="$emit('toBetPage')" class="ri-coner-btn tobet-btn">去投票</div>
          </div>
        </div>
        <div class="team-wrapper" :style="isExpand && { height: `${incHeight + 260}px` }">
          <div class="team-card" :class="{ 'team-card-active': activeTeam == i }" @click="changeTeam(card, i)"
            v-for="(card, i) in teams" :key="i">
            <div class="bg"></div>
            <div class="rect"></div>
            <div class="display">
              <div class="team-logo-wrapper" v-lazy-container="lazyMatchAvatar">
                <img :data-src="card.team_image" alt="">
              </div>
              <div class="team-name">{{ card.team_name }}</div>
              <div class="team-score">{{ card.f_score }}</div>
            </div>
          </div>
          <Loading v-if="teamLoading" class="list-loading" :color="'#bf9854'" />
        </div>
        <div v-if="!teamLoading && teams.length > 8" class="up-down" @click="switchGlist">
          <div class="text">{{ isExpand ? '收起' : '查看更多' }}</div>
          <div class="icon" :class="{ 'icon-rate': isExpand }"></div>
        </div>
        <div class="team-detail d-flex align-center" :style="teams.length <= 8 && 'margin-top:70px'">
          <div class="team-block d-flex flex-column align-center" v-lazy-container="lazyMatchAvatar">
            <img width="140" height="140" :data-src="currentTeam.team_image" alt="">
            <div class="team-name">{{ currentTeam.team_name }}</div>
            <!-- <div class="team-score">LFL评分:{{ currentOriginTeam.f_score ? currentOriginTeam.f_score : '暂无' }}</div> -->
          </div>
          <template v-if="Object.keys(currentTeam).length">
            <div class="team-member-wrapper">
              <swiper ref="playerSwipRef" :options="mySwiperOptions" v-show="playerSwip.length && !playerLoading"
                class="team-member-swiper">
                <swiper-slide v-for="(page, i) in playerSwip" :key="i">
                  <div class="d-flex flex-wrap">
                    <div class="member" v-for="(person, i) in page" :key="i">
                      <img width="120" height="122" v-lazy="{
                        src: person.image_thumb,
                        error: lazyS12Avatar.error,
                        loading: lazyS12Avatar.loading
                      }" alt="">
                      <div class="member-name">{{ person.nickname }}</div>
                    </div>
                  </div>
                </swiper-slide>
              </swiper>
              <Loading v-if="playerLoading" class="list-loading" :color="'#bf9854'" />
              <div class="swiper-button-prev" slot="button-prev">
                <div class="btn"></div>
              </div>
              <div class="swiper-button-next" slot="button-next">
                <div class="btn"></div>
              </div>
            </div>
            <div class="win-wrapper d-flex flex-column align-center">
              <div class="sl-wrapper">
                <div class="sl">
                  <i-circle v-if="!isSwitching" :percent="Math.round(percent)" :size="90" trail-color="#000000"
                    stroke-color="#258dff">
                    <span class="num">{{ Math.round(percent) }}%</span>
                    <div class="text">胜率</div>
                  </i-circle>
                </div>
                <div class="text">{{ currentTeam.win ? currentTeam.win : 0 }}胜 {{ currentTeam.lose ? currentTeam.lose : 0}}败
                </div>
              </div>
              <div class="kda-wrapper">
                <div class="kda d-flex flex-column align-center justify-center">
                  <div class="num">{{ currentTeam.KDA ? currentTeam.KDA : 0 }}</div>
                  <div class="text bold kda-text">
                    {{ currentTeam.kills ? currentTeam.kills : 0 }}/<span class="white">{{
                    currentTeam.deaths ? currentTeam.deaths : 0
                    }}</span>/{{ currentTeam.assists ? currentTeam.assists : 0 }}</div>
                </div>
                <div class="text">KDA</div>
              </div>
            </div>
            <div class="output-wrapper d-flex flex-wrap align-center">
              <div class="rect">
                <div class="up">{{ currentTeam.totalDamageDealtToChampions ? currentTeam.totalDamageDealtToChampions : 0
                }}
                </div>
                <div class="down">分均输出</div>
              </div>
              <div class="rect">
                <div class="up">{{ currentTeam.money ? currentTeam.money : 0 }}
                </div>
                <div class="down">分均经济</div>
              </div>
              <div class="rect">
                <div class="up">{{ currentTeam.hits ? currentTeam.hits : 0 }}
                </div>
                <div class="down">分均补刀</div>
              </div>
              <div class="rect">
                <div class="up">{{ currentTeam.first_blood_rate ? currentTeam.first_blood_rate : 0 }}
                </div>
                <div class="down">一血率</div>
              </div>
              <div class="rect">
                <div class="up">{{ currentTeam.towers ? currentTeam.towers : 0 }}
                </div>
                <div class="down">场地推塔</div>
              </div>
              <div class="rect">
                <div class="up">{{ currentTeam.baron_rate ? currentTeam.baron_rate : 0 }}
                </div>
                <div class="down">大龙控制率</div>
              </div>
            </div>
          </template>
          <template v-if="!playerLoading && (!Object.keys(currentTeam).length)">
            <div class="no-data-wrapper d-flex flex-column align-center justify-center"
              style="height:332px;position:relative;top: 0;left:420px;transform: translate3d(0,0,0);">
              <img class="no-data-logo" width="134" height="136" src="~@/assets/active/lols12/new/no-data-logo.png" alt="">
              <div class="no-data-text">暂无数据!</div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <!-- 数据概览 -->
    <div class="block block-SJGL">
      <div class="border"></div>
      <div class="display">
        <div class="title-wrapper">
          <div class="title title-sjgl">数据概览</div>
          <div class="right-wrapper"></div>
        </div>
        <DataOverview :gamecode="activeGameCode" />
      </div>
    </div>
    <!-- 最佳阵容 -->
    <best-lineup :gamecode="activeGameCode" />
  </div>
</template>

<script>
import Loading from '@/components/common/Loading.vue'
import DataOverview from './DataOverview.vue'
import BestLineup from './BestLineup.vue'
import { mapState } from 'vuex'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  name: 'GameData',
  props: {
    // 四个夏季赛
    gamematch: {
      type: Array,
      default: () => []
    },
    // S12官方比赛是否开始
    isS12GameBegin: {
      type: [Boolean, String],
      default: false
    },
    // 父级拿到的S12战队列表
    s12team: {
      type: Array,
      default: () => []
    }
  },
  components: {
    Loading,
    Swiper,
    SwiperSlide,
    DataOverview,
    BestLineup
  },
  data() {
    return {
      tween: null,
      isSwitching: false, // 是否正在切换战队
      percent: 0,
      activeGameCode: '', // 当前赛季
      activeTeam: 0,
      teamLoading: false,
      playerLoading: false,
      isExpand: false,
      teams: [], // 赛季内的所有战队
      currentTeam: {}, // 当前战队的所有队员
      mySwiperOptions: {
        observer: true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents: true,
        allowTouchMove: false,
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
      },
    }
  },
  computed: {
    ...mapState([
      "lazyMatchAvatar",
      "lazyS12Avatar"
    ]),
    disGameMatch() {
      return this.isS12GameBegin == 'before' ? this.gamematch.filter(item => item.tournament_code != 's12') : this.gamematch
    },
    // 增加的高度
    incHeight() {
      return (Math.ceil(this.teams.length / 8) * 219) - 239
    },
    // 当前战队，使用战队接口的数据；不使用this.currentTeam队员接口的数据，因为分数对不上
    currentOriginTeam() {
      return this.teams.length ? this.teams[this.activeTeam] : { team_image: '', team_name: '' }
    },
    // 处理后的队员便于swiper
    playerSwip() {
      let arr = []
      if (this.currentTeam.players) {
        const page = Math.ceil(this.currentTeam.players.length / 6)
        for (let i = 0; i < page; i++) {
          arr.push(this.currentTeam.players.slice(i * 6, i * 6 + 6))
        }
      }
      return arr
    }
  },
  watch: {
    gamematch(val) {
      console.log('赛季变化了', val)
      if (val.length) {
        if (this.isS12GameBegin != 'before') {
          this.teamLoading = true
          console.log('S12开始了', this.s12team)
          this.activeGameCode = val[0].tournament_code
          // 监测到赛季变化时，有可能父组件还在请求S12，或者S12的战队数据没来的及传过来，即有S12数据，但这里拿不到
          if (this.s12team.length) {
            this.teamLoading = false
            this.teams = this.s12team
            this.getPlayer(this.activeGameCode, this.s12team[0].team_id)
          } else {
            // 父组件正在拿S12，这里继续请求S12，当前请求会取消，页面会一直loading
            const timer = setTimeout(() => {
              this.teamLoading = false
              clearTimeout(timer)
              if (this.s12team.length) {
                this.teams = this.s12team
                this.getPlayer(this.activeGameCode, this.s12team[0].team_id)
              } else {
                this.getTeam(this.activeGameCode)
              }
            }, 1500)
          }
        } else {
          this.activeGameCode = val[1].tournament_code
          this.getTeam(val[1].tournament_code)
        }
      }
    },
    currentTeam(val) {
      this.percent = 0
      if (this.tween) {
        this.tween.pause()
      }
      console.log('球队变化了', val, this.$data, this.percent)
      if (val && val.victory_rate) {
        this.isSwitching = false
        this.tween = TweenMax.to(this.$data, 6, {
          percent: Number(val.victory_rate),
        })
      }
    }
  },
  methods: {
    switchGlist() {
      this.isExpand = !this.isExpand
    },
    // 获取战队
    getTeam(gameCode = this.activeGameCode) {
      console.log('开始获取战队', gameCode)
      this.teamLoading = true
      this.teams = []
      this.$http(this.ApiSetting.active.lols12.getTeam, {
        tournament_code: gameCode
      })
        .then(res => {
          console.log('拿到战队数据', res)
          this.teamLoading = false
          if (res.status == 1) {
            this.teams = res.data
            this.getPlayer(gameCode, res.data[0].team_id)
          }
        })
        .finally(() => {
          this.teamLoading = false
        })
    },
    // 获取某个战队的参赛队员
    getPlayer(gameCode, teamId) {
      this.playerLoading = true
      this.currentTeam.players = []
      this.$http(this.ApiSetting.active.lols12.getPlayer, {
        tournament_code: gameCode,
        team_id: teamId
      })
        .then(res => {
          console.log('队员', gameCode, teamId, this.$refs.playerSwipRef)
          if (res.status == 1) {
            this.currentTeam = res.data
            if (this.$refs.playerSwipRef) {
              this.$refs.playerSwipRef.$swiper.slideTo(0)
            }
            this.playerLoading = false
          } else {
            this.playerLoading = false
          }
        })
    },
    // 选择夏季赛类型
    changeGame(item, i) {
      this.isSwitching = true
      this.activeTeam = 0
      this.percent = 0
      this.isExpand = false
      this.activeGameCode = item.tournament_code
      this.getTeam(item.tournament_code)
    },
    // 切换战队
    changeTeam(card, i) {
      console.log('切换战队', card, i)
      this.isSwitching = true
      this.percent = 0
      this.activeTeam = i
      this.getPlayer(this.activeGameCode, card.team_id)
    }
  }
}
</script>

<style lang="less" scoped>
.gamedata-page {
  margin: auto;
  width: 1246px;

  .list-loading {
    position: absolute;
  }

  .data-nav-wrapper {
    width: 100%;
    margin: 40px auto;
    display: flex;
    justify-content: center;
    position: relative;

    .game-nav {
      cursor: pointer;
      user-select: none;
      width: 136px;
      height: 40px;
      line-height: 38px;
      box-sizing: border-box;
      font-size: 24px;
      font-weight: bold;
      color: #d6b598;
      text-align: center;
      border: solid 1px #d6b598;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      margin-right: 20px;

      &:last-of-type {
        margin-right: 0;
      }
      &:hover,
      &.game-nav-active {
        .game-label {
          width: 130px;
          height: 34px;
          box-sizing: border-box;
          line-height: 32px;
          border: solid 1px #fff;
        }
        background-image: linear-gradient(to bottom, #5ea2e6, #1841b6);
        color: #000;
      }
    }
  }

  .block-CSZD {
    height: 734px;
    margin-top: 41px;

    .border {
      height: 184px;
    }

    .team-name {
      color: #fff;
      font-size: 18px;
      font-weight: bold;
    }

    .team-score {
      font-size: 14px;
      font-weight: bold;
      color:  #d6b598;
    }

    .team-wrapper {
      width: 100%;
      height: 236px;
      padding: 20px 10px 0;
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      transition: all 0.5s;
      overflow: hidden;
      position: relative;

      .team-card {
        cursor: pointer;
        position: relative;
        margin-bottom: 20px;
        margin-right: 20px;
        width: 130px;
        height: 199px;
        box-sizing: border-box;
        padding: 10px 5px 12px;
        text-align: center;
        border: solid 2px rgba(255, 235, 180, 0.2);
        transition: all .5s;
        will-change: scale;

        &:nth-child(8n) {
          margin-right: 0;
        }

        .team-logo-wrapper {
          width: 120px;
          height: 118px;
          background: url('~@/assets/active/lols12/new/sprite.png');
          background-position: -1581px -14px;
          display: flex;
          justify-content: center;
          align-items: center;

          img {
            width: 70px;
            height: 70px;
          }
        }

        .team-name {
          margin-top: 16px;
        }

        &::before {
          content: '';
          position: absolute;
          top: -5px;
          left: -5px;
          width: 13px;
          height: 13px;
          background: url('~@/assets/active/lols12/new/border-corner.png') no-repeat center center;
          background-size: 100% 100%;
        }

        &::after {
          content: '';
          position: absolute;
          bottom: -5px;
          right: -5px;
          width: 13px;
          height: 13px;
          background: url('~@/assets/active/lols12/new/border-corner.png') no-repeat center center;
          background-size: 100% 100%;
          transform: rotate(180deg);
        }

        .bg {
          pointer-events: none;
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          opacity: 0.13;
          background-image: linear-gradient(to bottom, #5ea2e6, #1841b6);
        }

        .rect {
          pointer-events: none;
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;

          &::before {
            content: '';
            position: absolute;
            top: -5px;
            right: -5px;
            width: 13px;
            height: 13px;
            background: url('~@/assets/active/lols12/new/border-corner.png') no-repeat center center;
            background-size: 100% 100%;
            transform: rotate(90deg);
          }

          &::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: -5px;
            width: 13px;
            height: 13px;
            background: url('~@/assets/active/lols12/new/border-corner.png') no-repeat center center;
            background-size: 100% 100%;
            transform: rotate(-90deg);
          }
        }

        &:hover {
          transform: scale(1.1);
        }

        &.team-card-active,
        &:hover {
          border: solid 1px #5ea2e6;

          .team-logo-wrapper {
            background: url('~@/assets/active/lols12/new/sprite.png');
            background-position: -1427px -14px;
          }

          .bg {
            opacity: 1;
            background-image: linear-gradient(to bottom, #5ea2e6, #1841b6);
          }

          .team-name {
            color: #fff;
          }

          .team-score {
            color: #fff;
          }
        }
      }
    }

    .team-detail {
      margin-top: 20px;
      width: 100%;
      box-sizing: border-box;
      padding: 0 6px;

      .team-member-wrapper {
        margin-left: 92px;
        margin-right: 104px;
        width: 426px;
        height: 332px;
        position: relative;
        user-select: none;

        .member {
          width: 124px;
          height: 156px;
          margin-right: 27px;
          margin-bottom: 20px;
          box-sizing: border-box;
          border: solid 2px #fff;;
          background-image: linear-gradient(to bottom, #5ea2e6, #1841b6);

          &:nth-child(3n) {
            margin-right: 0;
          }
        }

        .swiper-button-prev {
          opacity: 1;
          width: 44px;
          height: 84px;
          margin-top: 0;
          transform: translate(-76px, -50%);
          background: url('~@/assets/active/lols12/new/sprite.png');
          background-position: -26px -376px;

          &::after {
            content: '';
          }

          .btn {
            width: 17px;
            height: 33px;
            background: url('~@/assets/active/lols12/new/sprite.png');
            background-position: -395px -594px;
          }

          &:hover {
            .btn {
              background-position: -395px -676px;
            }
          }

          &.swiper-button-disabled {
            pointer-events: auto;
            cursor: not-allowed;

            .btn {
              background-position: -395px -635px;
            }
          }
        }

        .swiper-button-next {
          opacity: 1;
          width: 44px;
          height: 84px;
          margin-top: 0;
          transform: translate(76px, -50%);
          background: url('~@/assets/active/lols12/new/sprite.png');
          background-position: -26px -376px;

          &::after {
            content: '';
          }

          .btn {
            width: 17px;
            height: 33px;
            background: url('~@/assets/active/lols12/new/sprite.png');
            background-position: -423px -594px;
          }

          &:hover {
            .btn {
              background-position: -423px -676px;
            }
          }

          &.swiper-button-disabled {
            pointer-events: auto;
            cursor: not-allowed;

            .btn {
              background-position: -423px -635px;
            }
          }
        }

        .swiper-slide-active {
          .member {
            box-shadow: 0px 2px 8px 0 rgba(0, 0, 0, 0.8);
          }
        }

        .member-name {
          width: 120px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          background-color: #000;
          font-size: 14px;
          color:  #fff;
        }
      }

      .win-wrapper {
        text-align: center;

        .num {
          font-size: 24px;
          font-weight: bold;
          color: #fff;
        }

        .sl {
          width: 90px;
          height: 90px;
          position: relative;

          &::after {
            content: '';
            width: 86px;
            height: 86px;
            background: #000;
            position: absolute;
            top: 2px;
            left: 2px;
            border-radius: 50%;
            z-index: -1;
          }
        }

        .kda-wrapper {
          margin-top: 12px;
          position: relative;
        }

        .kda {
          width: 82px;
          height: 99px;
          background: url('~@/assets/active/lols12/new/sprite.png');
          background-position: -1297px -152px;

          .kda-text {
            position: relative;
            bottom: 4px;
          }
        }

        .text {
          font-size: 14px;
          color:  #d6b598;
          margin-top: 6px;
        }
      }

      .output-wrapper {
        text-align: center;
        width: 296px;
        margin-left: 42px;

        .rect {
          width: 90px;
          height: 52px;
          font-size: 14px;
          margin-right: 13px;
          margin-bottom: 74px;

          &:nth-child(3n) {
            margin-right: 0;
          }

          &:nth-child(4) {
            margin-bottom: 0;
          }

          &:nth-child(5) {
            margin-bottom: 0;
          }

          &:nth-child(6) {
            margin-bottom: 0;
          }

          .up {
            border-radius: 4px 4px 0 0;
            font-size: 18px;
            color:  #000;
            height: 26px;
            line-height: 26px;
            background-color: #d6b598;
          }

          .down {
            border-radius: 0 0 4px 4px;
            color: #fff;
            height: 26px;
            line-height: 26px;
            background-color: #0a0a0c;
          }
        }
      }
    }
  }

  .block-SJGL {
    height: 593px;

    .border {
      height: 43px;
    }
  }

  /deep/.block-ZJZR {
    height: 693px;
    overflow: hidden;

    .border {
      height: 143px;
    }
  }
}
</style>