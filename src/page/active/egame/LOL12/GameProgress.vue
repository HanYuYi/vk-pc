<template>
  <div class="GameProgress-page">
    <div class="block block-ssjc" :class="{ 'block-ssjc-tts': activeType == 3 }">
      <div class="border"></div>
      <div class="display">
        <div class="title-wrapper">
          <div class="title title-ssjc">赛事进程</div>
          <div class="right-wrapper">
            <div class="match-type-wrapper d-flex align-center">
              <div @click="swiMatchType(item)" class="ri-coner-btn"
                :class="{ 'ri-coner-btn-active': item.type == activeType }" v-for="(item, i) in matchType" :key="i">
                {{ item.name }}</div>
            </div>
          </div>
        </div>
        <div class="d-flex align-center justify-center">
          <div class="table DYL-table" v-show="activeType == 1 || activeType == 2">
            <div class="table-head justify-space-between">
              <span class="table-title DYL-title">积分榜</span>
              <div class="group-wrapper d-flex">
                <span class="group-nav nav-ab" @click="activeGroup = group.id"
                  :class="{ 'group-nav-active': activeGroup == group.id }" v-for="(group, i) in groupType" :key="i">
                  {{ group.name }}
                </span>
              </div>
            </div>
            <div class="table-body">
              <table v-if="cuRankArr.length" width="100%" border="0" align="center" cellspacing="0">
                <thead>
                  <tr>
                    <th>排名</th>
                    <th>队伍名称</th>
                    <th>胜/负</th>
                    <th>积分</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, i) in cuRankArr" :key="item.team_name + i">
                    <td>
                      <span class="num-icon num-gj" v-if="i == 0"></span>
                      <span class="num-icon num-yj" v-else-if="i == 1"></span>
                      <span v-else>{{ i + 1 }}</span>
                    </td>
                    <td>{{ item.team_name }}</td>
                    <td>{{ item.team_win }}/{{ item.team_lost }}</td>
                    <td>{{ item.team_point }}</td>
                  </tr>
                  <template v-if="cuRankArr.length && cuRankArr.length < 5">
                    <tr v-for="i in (5 - cuRankArr.length)" :key="i">
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </template>
                </tbody>
              </table>
              <!-- <div v-if="!ajaxLoading&&!cuRankArr.length" class="no-cont theme">暂无数据</div> -->
              <template v-if="!ajaxLoading && (!cuRankArr.length)">
                <div class="no-data-wrapper d-flex flex-column align-center">
                  <img class="no-data-logo" width="134" height="136" src="~@/assets/active/lols12/new/no-data-logo.png"
                    alt="">
                  <div class="no-data-text">暂无数据!</div>
                </div>
              </template>
              <Loading v-if="ajaxLoading" class="list-loading" :color="'#bf9854'" />
            </div>
          </div>
          <div class="table DEL-table" v-show="activeType == 1 || activeType == 2">
            <div class="table-head justify-center">
              <div class="group-wrapper-del">
                <swiper ref="dayswiper" class=" group-wrapper-swiper" :options="swiperDayOption">
                  <swiper-slide class="group-nav" @click.native="changeDay(day)"
                    :class="{ 'group-nav-active': activeDay == day.id }" v-for="(day, i) in DayArr" :key="i">
                    {{ day.name }}
                  </swiper-slide>
                </swiper>
                <div class="swiper-button-prev-day" slot="button-prev"></div>
                <div class="swiper-button-next-day" slot="button-next"></div>
              </div>
            </div>
            <div class="table-body">
              <template v-if="matchDetail.length">
                <div class="row-match" v-for="(item, i) in matchDetail" :key="item.id + i">
                  <div class="left-block">
                    <div>{{ formatDate(item.match_time * 1000, 'HH:mm MM月dd日').split(' ')[0] }}<br />
                      {{ formatDate(item.match_time * 1000, 'HH:mm MM月dd日').split(' ')[1] }}
                    </div>
                  </div>
                  <div class="right-block d-flex align-center justify-space-between" v-lazy-container="lazyMatchAvatar">
                    <div class="left-team d-flex align-center justify-center">
                      <img width="52" height="52" :data-src="item.team_home_logo" alt="">
                      <div class="team-name">{{ item.team_home_name }}</div>
                    </div>
                    <div class="center-score">
                      {{ item.team_home_win }} : {{ item.team_away_win }}
                    </div>
                    <div class="right-team d-flex align-center justify-center">
                      <div class="team-name">{{ item.team_away_name }}</div>
                      <img width="52" height="52" :data-src="item.team_away_logo" alt="">
                    </div>
                  </div>
                </div>
              </template>
              <template v-if="!gameProceLoading && (!matchDetail.length)">
                <div class="no-data-wrapper d-flex flex-column align-center">
                  <img class="no-data-logo" width="134" height="136" src="~@/assets/active/lols12/new/no-data-logo.png"
                    alt="">
                  <div class="no-data-text">暂无数据!</div>
                </div>
              </template>
              <Loading v-if="gameProceLoading" class="list-loading" :color="'#bf9854'" />
            </div>
          </div>
          <div class="table TTS-table" v-show="activeType == 3">
            <div class="table-head justify-space-between">
              <span class="table-title TTS-title">
                2022全球总决赛之路
                <span class="time">{{ matchRes.date}}</span>
              </span>
            </div>
            <div v-if="!gameProceLoading" class="table-body">
              <div class="box quarter-knockout">
                <div class="team-vs-list">
                  <div class="box-title">1/4决赛(八强淘汰赛)</div>
                  <div class="vs-box" v-for="(item, i) in matchDetail.slice(0, 4)" :key="i + item.id">
                    <div class="game-time">
                      {{ item.match_time
                      ? formatDate(item.match_time * 1000, 'MM月dd日 cnweek HH: mm')
                      : '待定' }}</div>
                    <div class="team-block team-one">
                      <img width="36" height="36" v-lazy="{
                        src: item.team_home_logo,
                        error: lazyMatchAvatar.error,
                        loading: lazyMatchAvatar.loading
                      }" alt="" />
                      <div class="teame-name">{{ item.team_home_name ? item.team_home_name : '待定' }}</div>
                      <div class="teame-num">{{ item.team_home_win }}</div>
                    </div>
                    <div class="team-block team-two">
                      <img width="36" height="36" v-lazy="{
                        src: item.team_away_logo,
                        error: lazyMatchAvatar.error,
                        loading: lazyMatchAvatar.loading
                      }" alt="" />
                      <div class="teame-name">{{ item.team_away_name ? item.team_away_name : '待定' }}</div>
                      <div class="teame-num">{{ item.team_away_win }}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="box quarter-final">
                <div class="team-vs-list">
                  <div class="box-title">半决赛</div>
                  <div class="vs-box" v-for="(item, i) in matchDetail.slice(4, 6)" :key="i + item.id">
                    <div class="game-time">
                      {{ item.match_time
                      ? formatDate(item.match_time * 1000, 'MM月dd日 cnweek HH: mm')
                      : '待定' }}</div>
                    <div class="team-block team-one">
                      <img width="36" height="36" v-lazy="{
                        src: item.team_home_logo,
                        error: lazyMatchAvatar.error,
                        loading: lazyMatchAvatar.loading
                      }" alt="" />
                      <div class="teame-name">{{ item.team_home_name ? item.team_home_name : '待定' }}</div>
                      <div class="teame-num">{{ item.team_home_win }}</div>
                    </div>
                    <div class="team-block team-two">
                      <img width="36" height="36" v-lazy="{
                        src: item.team_away_logo,
                        error: lazyMatchAvatar.error,
                        loading: lazyMatchAvatar.loading
                      }"  alt="" />
                      <div class="teame-name">{{ item.team_away_name ? item.team_away_name : '待定' }}</div>
                      <div class="teame-num">{{ item.team_away_win }}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="box final">
                <div class="team-vs-list">
                  <div class="box-title">总决赛</div>
                  <div class="vs-box" v-for="(item, i) in matchDetail.slice(6)" :key="i + item.id">
                    <div class="game-time">
                      {{ item.match_time
                      ? formatDate(item.match_time * 1000, 'MM月dd日 cnweek HH: mm')
                      : '待定' }}</div>
                    <div class="team-block team-one">
                      <img width="36" height="36" v-lazy="{
                        src: item.team_home_logo,
                        error: lazyMatchAvatar.error,
                        loading: lazyMatchAvatar.loading
                      }" alt="" />
                      <div class="teame-name">{{ item.team_home_name ? item.team_home_name : '待定' }}</div>
                      <div class="teame-num">{{ item.team_home_win }}</div>
                    </div>
                    <div class="team-block team-two">
                      <img width="36" height="36" v-lazy="{
                        src: item.team_away_logo,
                        error: lazyMatchAvatar.error,
                        loading: lazyMatchAvatar.loading
                      }" alt="" />
                      <div class="teame-name">{{ item.team_away_name ? item.team_away_name : '待定' }}</div>
                      <div class="teame-num">{{ item.team_away_win }}</div>
                    </div>
                  </div>
                </div>
              </div>
              <span class="line" v-if="matchDetail.length"></span>
            </div>
            <div v-else class="table-body">
              <Loading v-if="gameProceLoading" class="list-loading" :color="'#bf9854'" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from '@/utils/util.js'
import { mapState } from 'vuex'
import Loading from '@/components/common/Loading.vue'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import { resolve } from 'promise'
export default {
  name: 'GameProgress',
  props: {
    matchId: {
      type: Number,
      default: 1
    },
    matchDay: {
      type: Number,
      default: 1
    },
  },
  data() {
    return {
      ajaxLoading: false,
      gameProceLoading: false,
      activeType: 1,
      activeGroup: 0,
      activeDay: 1,
      DayArr: [
        { id: 1, name: '第一天' },
        { id: 2, name: '第二天' },
        { id: 3, name: '第三天' },
        { id: 4, name: '第四天' },
        { id: 5, name: '第五天' },
        { id: 6, name: '第六天' },
        { id: 7, name: '第七天' },
      ],
      matchType: [
        { type: 1, name: '入围赛' },
        { type: 2, name: '小组赛' },
        { type: 3, name: '淘汰赛' },
      ],
      groupType: [],
      matchRes: {},
      matchDetail: [], // 赛事进程
      rankDetail: [], // 积分排行
      swiperDayOption: {
        slidesPerView: 5,
        allowTouchMove: false,
        observer: true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents: true,
        spaceBetween: 20,
        slidesPerGroup: 5,
        navigation: {
          nextEl: '.swiper-button-next-day',
          prevEl: '.swiper-button-prev-day'
        }
      },
    }
  },
  props: {
    matchDay: {
      type: Number,
      default: 1
    },
    matchId: {
      type: Number,
      default: 1
    },
  },
  components: {
    Loading,
    Swiper,
    SwiperSlide,
  },
  // created() {
  //   this.getGameVs()
  //   this.gameProcess()
  // },
  computed: {
    ...mapState([
      "lazyMatchAvatar"
    ]),
    cuRankArr() {
      if (this.activeType == 1) {
        return this.rankDetail.length ? this.rankDetail[this.activeGroup] : []
      }
      if (this.activeType == 2) {
        if (Array.isArray(this.rankDetail)) {
          return this.rankDetail.length ? this.rankDetail[this.activeGroup] : []
        } else {
          let arr = []
          const keysArr = Object.keys(this.rankDetail)
          if (keysArr.length) {
            this.groupType.forEach(item => {
              keysArr.forEach(key => {
                if (item.id == key) {
                  arr.push(this.rankDetail[key])
                } else {
                  arr.push([])
                }
              })
            })
            return arr.length ? arr[this.activeGroup] : []
          } else {
            return []
          }
        }
      }
      if (this.activeType == 3) {
        return []
      }
    }
  },
  methods: {
    changeDay(day) {
      if (day.id == this.activeDay) {
        return;
      }
      this.activeDay = day.id
      this.gameProcess()
    },
    formatDate(time, format) {
      return formatDate(time, format)
    },
    swiMatchType(item) {
      if (item.type == this.activeType || this.ajaxLoading || this.gameProceLoading || this.ajaxLoading || this.gameProceLoading) {
        return;
      }
      this.activeType = item.type
      this.activeDay = item.type == this.matchId ? this.matchDay : 1
      this.matchDetail = []
      this.activeDay = item.type == this.matchId ? this.matchDay : 1
      this.activeGroup = 0
      this.getGameVs()
      this.gameProcess().then(res => {
        if (res) {
          console.log(this.$refs.dayswiper)
          if (this.$refs.dayswiper) {
            this.$refs.dayswiper.$swiper.slideTo(this.activeDay - 1)
          }
        }
      })
    },
    // 积分榜
    getGameVs(matchID = this.activeType) {
      console.log('赛程积分, 入围赛？', matchID)
      if (this.ajaxLoading || matchID == 3) {
        return
      }
      this.ajaxLoading = true
      this.$http(this.ApiSetting.active.lols12.gameScore, {
        match_id: matchID
      })
        .then(res => {
          this.ajaxLoading = false
          if (res.status == 1 && res.data) {
            this.rankDetail = res.data.ranking
            this.groupType = res.data.title
          }
        })
        .catch(err => {
          this.ajaxLoading = false
        })
    },
    // 赛事进程
    gameProcess(matchID = this.activeType, day = this.activeDay) {
      return new Promise((resolve, reject) => {
        if (this.gameProceLoading) {
          return
        }
        this.gameProceLoading = true
        console.log('赛程详情请求参数', matchID, day)
        this.$http(this.ApiSetting.active.lols12.gameProcess, {
          match_id: matchID,
          day: day
        })
          .then(res => {
            this.gameProceLoading = false
            console.log('赛程详情', res)
            if (res.status == 1 && res.data) {
              this.matchRes = res.data
              this.matchDetail = res.data.list
              this.DayArr = res.data.title
              resolve(true)
            } else {
              resolve(false)
            }
          })
          .catch(err => {
            reject(err)
            this.gameProceLoading = false
          })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.GameProgress-page {
  .list-loading {
    position: absolute;
  }
  .block-ssjc {
    margin-top: 41px;
    height: 588px;

    &.block-ssjc-tts {
      height: 770px;

      .border {
        height: 220px;
      }
    }

    .title-wrapper .right-wrapper {
      padding-right: 82px;
      .match-type-wrapper {

        .ri-coner-btn {
          width: 90px;
          background-color: transparent;
          border-top-left-radius: 0;
          border-bottom-right-radius: 0;
          position: relative;
          &:nth-child(2) {
            border-left: none;
            border-right: none;
          }
          &:hover,
          &.ri-coner-btn-active {
            color: #fff;
            background-image: linear-gradient(to bottom, #258dff, #258dff);
            &::before {
              content: '';
              position: absolute;
              left: 0;
              box-sizing: border-box;
              width: 90px;
              height: 30px;
              border: 1px solid #000;
            }
          }
        }
      }
    }

    .border {
      height: 120px;
    }
  }
  .row-match {
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    border-style: solid;
    border-width: 2px;
    color: #d6b598;;
    font-size: 14px;
    font-weight: bold;
    border-image-source: linear-gradient(to top, #756049, #d6b598, #756049);
    border-image-slice: 1;
    border-left: none;
    border-right: none;
    border-top: none;
    .left-block {
      width: 132px;
      height: 100%;
      position: relative;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      &:after {
        content: '';
        height: 58px;
        width: 2px;
        background-color: rgba(255, 255, 255, 0.1);
        position: absolute;
        right: 0;
        top: 10px;
      }
    }
    .right-block {
      text-align: center;
      width: 100%;
      white-space: nowrap;
      .team-name {
        font-size: 14px;
      }
      .left-team {
        flex: 1;
        .team-name {
          min-width: 56px;
          text-align: center;
          margin-left: 16px;
        }
      }
      .center-score {
        flex: 0.5;
        font-family: roboto;
        min-width: 51px;
        font-size: 24px;
      }
      .right-team {
        flex: 1;
        .team-name {
          min-width: 56px;
          text-align: center;
          margin-right: 16px;
        }
      }
    }
  }
  .group-nav {
    cursor: pointer;
    display: inline-block;
    width: 52px;
    height: 32px;
    box-sizing: border-box;
    line-height: 30px;
    border: solid 1px #d6b598;
    text-align: center;
    font-size: 14px;
    color: #d6b598;
    position: relative;
    &.nav-ab {
      &:nth-child(2) {
        border-left: none;
      }
    }
    &:hover,
    &.group-nav-active {
      background-image: linear-gradient(to top, #258dff, #258dff);
      font-weight: bold;
      color: #fff;
      &::before {
        content: '';
        left: 0;
        position: absolute;
        width: 99%;
        height: 30px;
        box-sizing: border-box;
        border: solid 1px #000;
      }
    }
  }

  table {
    box-sizing: border-box;
    text-align: center;

    th {
      border-bottom: #000 1px solid;
      border-top: #000 1px solid;
      height: 64px;
      box-sizing: border-box;
      color: #fff;
      font-weight: bold;
      font-size: 14px;
      width: 25%;

      &:nth-child(2n) {
        background-color: rgba(37, 141, 255, 0.05);
      }
    }

    td {
      border-bottom: #000 1px solid;
      box-sizing: border-box;
      height: 65px;
      font-size: 14px;
      font-weight: bold;
      color: #d6b598;
      width: 25%;

      &:nth-child(2n) {
        background-color: rgba(37, 141, 255, 0.05);
      }
    }
  }

  .group-wrapper-del {
    width: 480px;
    position: relative;
    user-select: none;

    .swiper-button-prev-day,
    .swiper-button-next-day {
      background: url('~@/assets/active/lols12/new/sprite.png');
      cursor: pointer;
      position: absolute;
      top: 50%;
      z-index: 10;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #d6b598;
      font-size: 20px;
      font-weight: bold;
      width: 32px;
      height: 32px;
      box-sizing: border-box;
      line-height: 32px;
      transform: translate3d(-50%, -50%, 0);
    }

    .swiper-button-prev-day {
      background-position: -64px -1383px;
      left: -36px;
      right: auto;

      &:hover {
        background-position: -64px -1344px;
        color: #000;
      }

      &.swiper-button-disabled {
        background-position: -64px -1422px;
      }
    }

    .swiper-button-disabled {
      pointer-events: none;
    }

    .swiper-button-next-day {
      background-position: -104px -1383px;
      right: -70px;
      left: auto;

      &:hover {
        background-position: -104px -1344px;
        color: #000;
      }

      &.swiper-button-disabled {
        background-position: -104px -1422px;
      }
    }
  }

  .table {
    margin-top: 40px;
    box-sizing: border-box;

    .table-head {
      position: relative;
      text-align: left;
      width: 100%;
      height: 60px;
      line-height: 56px;
      padding: 0 21px 0 9px;
      box-sizing: border-box;
      border-style: solid;
      border-width: 2px;
      border-image-source: linear-gradient(to right, #756049, #d6b598, #756049);
      border-image-slice: 1;
      background-color: #3b3b3b;
      color: #fff;
      display: flex;
      align-items: center;

      .table-title {
        display: inline-block;
        font-size: 24px;
        font-weight: bold;

        &.TTS-title {
          .time {
            white-space: nowrap;
            line-height: 1;
            font-size: 20px;
            font-weight: bold;
            color: #fff;
            margin-left: 10px;
          }
        }
      }
    }

    .table-body {
      box-sizing: border-box;
      border-style: solid;
      border-width: 2px;
      border-image-source: linear-gradient(to right, #756049, #d6b598, #756049);
      border-image-slice: 1;
      border-top: none;
      background-color: #0a0a0c;
      min-height: 285px;
      position: relative;
      overflow: hidden;
      overflow-y: scroll;

      .no-cont {
        top: calc(50% + 20px);
      }
    }

    &.DYL-table {
      width: 400px;
      margin-right: 10px;

      .table-body {
        height: 392px;
      }
    }

    &.DEL-table {
      width: 670px;

      .group-nav {
        width: 80px;
        border-radius: 0;
        margin-left: 0;
        font-size: 18px;
      }

      .table-body {
        height: 392px;
        box-sizing: border-box;
      }
    }

    &.XZS-table {
      width: 1080px;
    }

    &.TTS-table {
      width: 1080px;

      .table-body {
        height: 574px;
        padding-left: 50px;

        .line {
          background: url('~@/assets/active/lols12/new/line.png') no-repeat;
          width: 472px;
          height: 394px;
          position: absolute;
          top: 100px;
          left: 304px;
        }
      }
    }
  }

  .team-tri-block {
    width: 204px;
    height: 40px;
  }

  .team-block {
    width: 254px;
    height: 40px;
    font-size: 14px;
    font-weight: bold;

    img {
      border-radius: 50%;
      background-size: 100% 100%;
      position: absolute;
      left: 24px;
      top: 2px;
    }

    .teame-name {
      position: absolute;
      left: 66px;
      font-size: 18px;
      font-weight: bold;
      line-height: 40px;
      top: 0px;
    }

    .teame-num {
      font-family: roboto;
      width: 30px;
      height: 40px;
      font-size: 18px;
      font-weight: bold;
      line-height: 40px;
      text-align: center;
      position: absolute;
      color: #258dff;
      top: 0px;
      right: 20px;
    }
  }

  .box-title {
    color: #fff;
    font-size: 12px;
    font-weight: bold;
    line-height: 20px;
    position: absolute;
    top: -44px;
    left: 51px;
  }
}

.game-time {
  font-size: 12px;
  line-height: 20px;
  color: #d6b598;
  position: absolute;
  top: -20px;
  left: 60px;
  z-index: 1;
}

.team-one {
  background: url('~@/assets/active/lols12/new/up-team.png') no-repeat center;
  background-size: cover;
  position: absolute;
  left: 20px;
  top: 0px;
  color: #000;

  &::before {
    content: '';
    transform: skewX(-30deg);
    width: 164px;
    height: 20px;
    line-height: 20px;
    position: absolute;
    top: -20px;
    left: 27px;
    pointer-events: none;
    background-color: #616161;
  }
  .teame-num {
    color: #fff !important;
  }
}

.team-two {
  background: url('~@/assets/active/lols12/new/down-team.png') no-repeat center;
  background-size: cover;
  position: absolute;
  left: 0px;
  top: 41px;
  color: #fff;
}

.box {
  width: 277px;
  height: auto;
  float: left;
  margin-right: 75px;

  .team-vs-list {
    width: 277px;
    height: auto;
    margin-top: 60px;
    position: relative;
    z-index: 1;

    .vs-box {
      width: 277px;
      height: 80px;
      position: relative;
      margin-bottom: 51px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  &.quarter-final {
    .team-vs-list {
      margin-top: 126px;

      .vs-box {
        margin-bottom: 182px;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  &.final {
    margin-right: 0;

    .team-vs-list {
      margin-top: 257px;
    }
  }
}
</style>