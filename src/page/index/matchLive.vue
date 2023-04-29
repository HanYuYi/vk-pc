<template>
  <dl v-if="liveTypeData.show_live !== 0" class="match-live">
    <dt class="title">
      <small>提供精彩赛事的现场直播</small>
    </dt>

    <!-- 直播赛事-->
    <dd v-if="liveTypeData.show_live === 1" class="content">
      <template v-if="!loading">
        <!-- 赛事类型tabs-->
        <ul class="tabs" :style="{width: `${Object.keys(liveTypeData.live).length * 162}px`}">
          <li v-for="(row, key) in liveTypeData.live"
              :key="key"
              :class="{active: activeKey === key}"
              @click="activeKey = key;calcMatchList()">
            <img :src="row.icon" alt="">
            <img :src="row.icon_hover" alt="">
            {{ row.name }}
          </li>
        </ul>


        <div class="tab-panel">
          <!-- 赛事列表-->
          <div class="match-select">
            <swiper class="match-live-swiper" :options="mySwiperOptions">
              <swiper-slide v-for="(item, index) in matchList"
                            :key="index"
                            :class="[
                              {'active': item._uid === playUid},
                              {'disabled': defaultInfoStatus}
                            ]">

                <h5 class="match-name d-flex justify-space-between">
                  <Tooltip class="tooltip_2022" :content="item.league_name" placement="bottom">
                    <span class="name-text">{{ item.league_name }}</span>
                  </Tooltip>
                  <em v-if="item.status === 2" class="live-tag run">直播中</em>
                  <em v-else class="live-tag">未开始</em>
                </h5>
                <div class="pk-main">
                  <div class="flag-box" :class="{
                    'flag-box-twoline': item.home_team_name && item.home_team_name.length >4 && item.home_team_name.length < 7,
                    'flag-box-ell': item.home_team_name && item.home_team_name.length > 6
                  }">
                    <div class="logo-bg">
                      <img v-lazy="{
                        src: item.home_team_pic,
                        error: $store.state.lazyMatchAvatar.error,
                        loading: $store.state.lazyMatchAvatar.loading
                      }"
                           alt="">
                    </div>
                    <span>
                      <Tooltip class="tooltip_2022" :content="item.home_team_name" placement="bottom-start">
                        {{ item.home_team_name }}
                      </Tooltip>
                    </span>
                  </div>

                  <em v-if="item.status === 2" class="date-time vs">VS</em>
                  <em v-else class="date-time" v-html="transferTime(item.show_time)">
                  </em>

                  <div class="flag-box" :class="{
                    'flag-box-twoline': item.away_team_name && item.away_team_name.length >4 && item.away_team_name.length < 7,
                    'flag-box-ell': item.away_team_name && item.away_team_name.length > 6
                  }">
                    <div class="logo-bg">
                      <img v-lazy="{
                        src: item.away_team_pic,
                        error: $store.state.lazyMatchAvatar.error,
                        loading: $store.state.lazyMatchAvatar.loading
                      }"
                           alt="">
                    </div>
                    <span>
                      <Tooltip class="tooltip_2022" :content="item.away_team_name" placement="bottom-end">
                        {{ item.away_team_name }}
                      </Tooltip>
                    </span>
                  </div>
                </div>
              </swiper-slide>
            </swiper>
            <div class="swiper-button-prev match-live-swiper-prev" slot="button-prev"></div>
            <div class="swiper-button-next match-live-swiper-next" slot="button-next"></div>
          </div>

          <!-- 赛事视频-->
          <div class="match-content">
            <div class="left">
              <!-- 赛事头部信息-->
              <div v-if="currentViewMatch" class="head-info">
                <!-- <div v-if="currentViewMatch.league_name" class="match-top-name">{{ currentViewMatch.league_name }}</div>
                <div v-if="currentViewMatch.home_team_name && currentViewMatch.away_team_name" class="center d-flex align-center">
                  <div class="left-team-name"
                   :class="{
                    'teamname-twoline': currentViewMatch.home_team_name && currentViewMatch.home_team_name.length >4 && currentViewMatch.home_team_name.length < 7,
                    'teamname-ell': currentViewMatch.home_team_name && currentViewMatch.home_team_name.length > 6
                  }">{{ currentViewMatch.home_team_name }}</div>
                  <div class="logo-bg">
                    <img v-lazy="{
                          src: currentViewMatch.home_team_pic,
                          error: $store.state.lazyMatchAvatar.error,
                          loading: $store.state.lazyMatchAvatar.loading
                        }"
                          alt="">
                  </div>
                  <em>VS</em>
                  <div class="logo-bg">
                    <img v-lazy="{
                          src: currentViewMatch.away_team_pic,
                          error: $store.state.lazyMatchAvatar.error,
                          loading: $store.state.lazyMatchAvatar.loading
                        }"
                          alt="">
                  </div>
                  <div class="right-team-name"
                  :class="{
                    'teamname-twoline': currentViewMatch.away_team_name && currentViewMatch.away_team_name.length >4 && currentViewMatch.away_team_name.length < 7,
                    'teamname-ell': currentViewMatch.away_team_name && currentViewMatch.away_team_name.length > 6
                  }">{{ currentViewMatch.away_team_name }}</div>
                </div> -->
                <div class="live-line">
                  <!-- 线路-->
                  <dl v-if="currentViewMatch.live_line_list && currentViewMatch.live_line_list.length > 1"
                      class="line-selector" :class="{show: lineSelectorVisible}">
                    <dt class="line-pla" @click.stop="lineSelectorVisible = !lineSelectorVisible">线路切换<i></i></dt>
                    <dd class="line-opt">
                      <a v-for="(item, index) in currentViewMatch.live_line_list"
                         :key="index"
                         :class="{active: currentMatchLineIndex === index}"
                         @click="switchVideoLine(index)">
                        {{ item.name }}
                      </a>
                    </dd>
                  </dl>
                </div>
                <template v-if="currentViewMatch.is_odds === 1">
                  <div class="pk-main">
                    <div class="flag-box">
                      <span :title="currentViewMatch.home_team_name">{{ currentViewMatch.home_team_name }}</span>
                      <div class="logo-bg">
                        <img v-lazy="{
                          src: currentViewMatch.home_team_pic,
                          error: $store.state.lazyMatchAvatar.error,
                          loading: $store.state.lazyMatchAvatar.loading
                        }"
                             alt="">
                      </div>
                    </div>
                    <em>VS</em>
                    <div class="flag-box">
                      <span :title="currentViewMatch.away_team_name">{{ currentViewMatch.away_team_name }}</span>
                      <div class="logo-bg">
                        <img v-lazy="{
                          src: currentViewMatch.away_team_pic,
                          error: $store.state.lazyMatchAvatar.error,
                          loading: $store.state.lazyMatchAvatar.loading
                        }"
                             alt="">
                      </div>
                    </div>
                  </div>
                  <p class="match-name" :title="currentViewMatch.league_name">{{ currentViewMatch.league_name }}</p>
                </template>
              </div>
              <div v-else class="head-info"></div>

              <!-- 赛事源容器-->
              <div class="match-video" ref="matchDPlayer"></div>
            </div>
            <!-- 赛事右侧面板-->
            <div v-if="currentViewMatch" class="right">
              <template v-if="currentViewMatch.is_odds === 1">
                <div class="team-name">
                  <p :title="currentViewMatch.home_team_name">{{ currentViewMatch.home_team_name }}</p>
                  <em>VS</em>
                  <p :title="currentViewMatch.away_team_name">{{ currentViewMatch.away_team_name }}</p>
                </div>

                <!--赔率 odds_type    0:体育  1:电竞-->
                <template v-if="currentViewMatch.odds_type === 0">
                  <dl class="match-ratio">
                    <dt>独赢盘</dt>
                    <dd class="ratio-type">
                      <div class="ratio-item">
                        <h3>主</h3>
                        <p>1.1</p>
                      </div>
                      <div class="ratio-item">
                        <h3>和</h3>
                        <p>2.2</p>
                      </div>
                      <div class="ratio-item">
                        <h3>客</h3>
                        <p>1.2</p>
                      </div>
                    </dd>
                  </dl>
                  <dl class="match-ratio">
                    <dt>让分盘</dt>
                    <dd class="ratio-type">
                      <div class="ratio-item">
                        <h3>+0.5</h3>
                        <p>1.9</p>
                      </div>
                      <div class="ratio-item">
                        <h3>-0.5</h3>
                        <p>0.6</p>
                      </div>
                    </dd>
                  </dl>
                  <dl class="match-ratio">
                    <dt>大小盘</dt>
                    <dd class="ratio-type alone">
                      <div class="ratio-item">
                        <h3>小4/1.1</h3>
                        <p>1.9</p>
                      </div>
                      <div class="ratio-item">
                        <h3>大4/1.1</h3>
                        <p>1.9</p>
                      </div>
                    </dd>
                  </dl>
                </template>
                <template v-if="currentViewMatch.odds_type === 1">
                  <dl class="match-ratio">
                    <dt>{{ currentViewMatch.l_team_name }}</dt>
                    <dd class="ratio-val">1.4</dd>
                  </dl>
                  <dl class="match-ratio">
                    <dt>胜负平</dt>
                    <dd class="ratio-val">0.6</dd>
                  </dl>
                  <dl class="match-ratio">
                    <dt>{{ currentViewMatch.r_team_name }}</dt>
                    <dd class="ratio-val">1.4</dd>
                  </dl>
                </template>
              </template>
              <template v-else-if="currentViewMatch.is_odds !== 1 || this.liveTypeData.live.default_info">
                <dl class="pk-main">
                  <dt>
                    <Tooltip class="tooltip_2022" :content="currentViewMatch.league_name" placement="bottom">
                      {{ currentViewMatch.league_name }}
                    </Tooltip>
                  </dt>
                  <dd class="pk-main-team">
                    <div class="flag-box">
                      <div class="logo-bg">
                        <img v-lazy="{
                          src: currentViewMatch.home_team_pic,
                          error: $store.state.lazyMatchAvatar.error,
                          loading: $store.state.lazyMatchAvatar.loading
                        }"
                             alt="">
                      </div>
                      <span>
                        <Tooltip class="tooltip_2022" :content="currentViewMatch.home_team_name" placement="bottom">
                          {{ currentViewMatch.home_team_name }}
                        </Tooltip>
                      </span>
                    </div>
                    <em>VS</em>
                    <div class="flag-box">
                      <div class="logo-bg">
                        <img v-lazy="{
                          src: currentViewMatch.away_team_pic,
                          error: $store.state.lazyMatchAvatar.error,
                          loading: $store.state.lazyMatchAvatar.loading
                        }"
                             alt="">
                      </div>
                      <span>
                        <Tooltip class="tooltip_2022" :content="currentViewMatch.away_team_name" placement="bottom">
                          {{ currentViewMatch.away_team_name }}
                        </Tooltip>
                      </span>
                    </div>
                  </dd>
                </dl>
              </template>

              <button v-if="this.liveTypeData.live.default_info ? this.currentViewMatch.is_show_bet_button : true" @click="handleToBet(currentViewMatch.bet_url_pc)" class="button_primary_2022 to-bet">投一注</button>
            </div>
            <div v-else class="right"></div>
          </div>
        </div>
      </template>
      <div v-else class="home_loading"></div>
    </dd>

    <!-- 默认-->
    <dd v-if="liveTypeData.show_live === 2" class="content-default">
      <div class="match-video" ref="matchDPlayer"></div>
    </dd>
  </dl>
</template>

<script>
// import flvjs from 'flv.js'
// import Hls from 'hls.js'
// window.flvjs = flvjs
// window.Hls = Hls
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import { mapState } from 'vuex'
import 'dplayer/dist/DPlayer.min.css'
import DPlayer from 'dplayer'
import { formatDate } from '../../utils/util'

const swiperEl = document.getElementsByClassName("match-live-swiper")

export default {
  name: 'matchLive',
  components: { Swiper, SwiperSlide },
  data() {
    return {
      activeKey: 'hot',
      loading: false,
      liveTypeData: {
        default: [],
        live: {},
        show_live: 1,
      },
      hasDefaultInfo: false,
      playUid: '',

      mySwiperOptions: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 30,
        threshold : 20,
        on: {
          click: () => {
            if (this.defaultInfoStatus) return
            const clickIndex = swiperEl[0].swiper.clickedIndex
            if (typeof clickIndex === 'number') {
              if (this.matchList[clickIndex].status !== 2) {
                this.$message({ message: "赛事暂未开始，敬请期待", type: "warning" })
                return
              }
              // 限制当前播放的赛事重复点击
              if (this.playUid === this.matchList[clickIndex]._uid) {
                return
              }
              this.currentViewMatchIndex = clickIndex
              this.playUid = this.matchList[this.currentViewMatchIndex]._uid
              this.currentViewMatch = this.matchList[this.currentViewMatchIndex]
              this.currentMatchLineIndex = 0
              this.initMatchVideo(true)
              this.hideLineSelector()
            }
          }
        },
        navigation: { nextEl: '.match-live-swiper-next', prevEl: '.match-live-swiper-prev' }
      },
      matchList: [],
      currentViewMatch: {},
      defaultInfoStatus: 0,
      currentViewMatchIndex: 0,
      currentMatchLineIndex: 0,
      lineSelectorVisible: false,
      dplayerHolder: null,
      msePalyer: null
    }
  },
  computed: {
    ...mapState(["isLogin"])
  },
  mounted () {
    this.getLiveData()
  },
  methods: {
    transferTime(time) {
      if(time.startsWith('今日')) {
        return time.trim().replace('日', '日<br/>')
      } else {
        return time
      }
    },
    /**
     * 请求直播赛事数据
     */
    getLiveData() {
      this.loading = true
      this.$http(this.ApiSetting.index.home.getLive)
        .then(res => {
          console.info("首页直播数据初始化：", res)
          this.loading = false
          if (res.status === 1 && res.data) {
            this.liveTypeData = res.data
            if (this.liveTypeData.show_live === 0) return

            this.calcMatchList()

            // 展示官宣视频
            if (this.liveTypeData.live.default_info) {
              this.defaultInfoStatus = 1
              this.currentViewMatch = {...this.liveTypeData.live.default_info}
              delete this.liveTypeData.live.default_info
              this.hasDefaultInfo = true
            } else {
              this.currentViewMatchIndex = 0
              for (const key in this.liveTypeData.live) {
                for (const [index, item] of Object.entries(this.liveTypeData.live[key].live_list)) {
                  item._uid = `${key}_${index}`
                }
              }
              this.currentViewMatch = this.liveTypeData.live[this.activeKey].live_list[0]
              if (this.liveTypeData.live[this.activeKey].live_list[0]) {
                this.playUid = this.liveTypeData.live[this.activeKey].live_list[0]._uid
              }
            }

            if (this.currentViewMatch || this.liveTypeData.show_live === 2) {
              // TODO
              // this.liveTypeData.live.hot.live_list[0].is_odds = 0

              this.$nextTick(() => {
                this.initMatchVideo(!this.hasDefaultInfo)
                this.liveTypeData.show_live !== 2 && this.hideLineSelector()

                this.$emit("load-count")
              })
            }

          }
        }).finally(() => {
          this.loading = false
        })

    },

    // 查找赛事直播类型
    calcMatchList() {
      this.matchList = []
      if (this.activeKey && this.liveTypeData.live[this.activeKey] && this.liveTypeData.live[this.activeKey].live_list) {
        this.matchList = this.liveTypeData.live[this.activeKey].live_list

        if (swiperEl[0]) {
          swiperEl[0].swiper.slideTo(0, 0)
        }
        // this.scrollToCurrentMatch()
      }
      if (swiperEl[0]) {
        swiperEl[0].swiper.slideTo(0, 0)
      }
    },

    // 切换tab后，定位swiper到当前播放的赛事分组
    scrollToCurrentMatch() {
      this.$nextTick(() => {
        if (JSON.stringify(this.currentViewMatch) !== '{}' && this.matchList.length) {
          swiperEl[0].swiper.slideTo(this.matchList.indexOf(this.currentViewMatch))
        }
      })
    },
    offStream () {
      if (this.dplayerHolder) {
        this.dplayerHolder.destroy()
        this.dplayerHolder = null
      }
      if (this.msePalyer) {
        this.msePalyer.destroy()
        this.msePalyer = null
      }
    },


    /**
     * 初始化赛事视频容器
     */
    initMatchVideo(isLive = true) {
      this.offStream()

      const videoSource = [
        '',
        this.liveTypeData.default.url
      ]
      if (isLive) {
        videoSource[0] = this.currentViewMatch && this.currentViewMatch.live_line_list[this.currentMatchLineIndex] ? this.currentViewMatch.live_line_list[this.currentMatchLineIndex].url : ''
      } else {
        // 展示官宣视频
        videoSource[0] = this.currentViewMatch.url
      }

      let videoUrl = ''
      if (this.liveTypeData.show_live === 2) {
        videoUrl = videoSource[1]
      } else {
        videoUrl = videoSource[0]
      }

      if (!videoUrl) return
      const MSEType = this.findMSEType(videoUrl)

      const videoContainer = this.$refs.matchDPlayer
      this.dplayerHolder = new DPlayer({
        container: videoContainer,
        live: this.liveTypeData.show_live === 1 ? isLive : true,
        theme: '#07f1b7',
        volume : 0,
        video: {
          url: videoUrl,
          duration: 0,
          // flv
          ...(MSEType === 'flv' && {
            type: 'customFlv',
            customType: {
              customFlv: (video, player) => {
                const flvPlayer = this.msePalyer = window.flvjs.createPlayer({
                  type: 'flv',
                  url: video.src,
                  config: { autoCleanupSourceBuffer: true }
                })
                flvPlayer.attachMediaElement(video)
                flvPlayer.load()

                flvPlayer.on(window.flvjs.Events.ERROR, (errorType, errorDetails, errorInfo) => {
                  // flvPlayer.pause()
                })
              }
            }
          }),

          // m3u8
          ...(MSEType === 'hls' && {
            type: 'customHls',
            customType: {
              customHls: (video, player) => {
                const hlsPlayer = this.msePalyer = new Hls()
                hlsPlayer.loadSource(video.src)
                hlsPlayer.attachMedia(video)

                hlsPlayer.on(Hls.Events.ERROR, (event, data) => {
                  // hlsPlayer.stopLoad()
                })
              }
            }
          })
        }
      })
      this.dplayerHolder.play()
      console.info(MSEType)
      console.info(videoUrl)

      this.dplayerHolder.on('resize', () => {
        videoContainer.style.height = [...videoContainer.classList].includes('dplayer-fulled') ? '100%' : '548px'
      })

    },

    /**
     * 返回媒体资源扩展类型
     */
    findMSEType(url) {
      let back = ''
      if (!url.length) return back
      const videoTypeMap = new Map([['flv', 'flv'], ['m3u8', 'hls']])
      for (const [key, value] of videoTypeMap) {
        if (url.includes(`.${key}`)) {
          back = value
          break
        }
      }
      return back
    },

    /**
     * 切换线路
     * @param index
     */
    switchVideoLine (index) {
      if (this.currentMatchLineIndex !== index) {
        this.currentMatchLineIndex = index
        this.initMatchVideo(true)
      }
      this.lineSelectorVisible = false
    },

    hideLineSelector() {
      document.body.onclick = () => {
        if (this.lineSelectorVisible) {
          this.lineSelectorVisible = false
        }
      }
    },

    // 去投注，跳转到赛事详情
    handleToBet (match) {
      this.$router.push({name: match.pc_jump_tag, params: {id: match.id, category_id: match.category_id} })
    },
  },

  filters: {
    formatDateStr (num, format) {
      return formatDate (num, format)
    }
  },

  beforeDestroy () {
    this.offStream()
  }
}
</script>

<style lang="less" scoped>
.match-live {
  width: 1240px;
  margin: 34px auto 0;
  .title {
    width: inherit;
    background: url("../../assets/index/live_title.png") center top no-repeat;
    text-align: center;
    overflow: hidden;
    small {
      display: block;
      margin-top: 84px;
      font-size: 14px;
      color: #acbae2;
    }
  }
  .content {
    margin: 37px auto 0;

    .tabs {
      margin: 0 auto;
      height: 64px;
      padding: 8px 8px;
      border-radius: 32px;
      border: solid 1px #4a5169;
      box-sizing: border-box;
      box-shadow: 0 3px 7px 0 rgba(0, 0, 0, 0.23), inset 0 3px 7px 0 rgba(140, 152, 201, 0.17);
      background-image: linear-gradient(to top, #252934, #343a4a);
      display: flex;

      li {
        margin: 0 8px;
        width: 170px;
        height: 48px;
        font-weight: bold;
        font-size: 16px;
        line-height: 48px;
        letter-spacing: 0.4px;
        text-align: center;
        color: #acbae2;
        border-radius: 24px;
        cursor: pointer;
        position: relative;
        transition: background-color 0.3s;

        img {
          vertical-align: middle;
          margin-right: -9px;

          &:nth-child(1n+1) {
            display: inline-block;
          }

          &:nth-child(2n+2) {
            display: none;
          }
        }

        &:hover {
          box-shadow: inset 0 9px 6px 0 rgba(21, 25, 34, 0.55);
          background-color: #1e222d;
        }

        &.active {
          transition: all 0.3s;
          color: #1e1e1e;
          box-shadow: inset 0 2px 0 0 rgba(201, 253, 238, 0.47);
          background-image: linear-gradient(to right, #07e9f1, #07f1b7);
          animation: tab-animate 0.6s ease;

          img {
            &:nth-child(1n+1) {
              display: none;
            }

            &:nth-child(2n+2) {
              display: inline-block;
            }
          }
        }

        @keyframes tab-animate {
          from {
            transform: scale(0, 0);
          }
          to {
            transform: scale(1, 1);
          }
        }
      }
    }
    .tab-panel {
      width: 100%;
      overflow: hidden;
      margin: 0 auto;
      .match-select {
        position: relative;
        height: 155px;
        margin-top: 30px;
        .match-live-swiper {
          margin: 0 auto;
          overflow: visible;
          width: 1210px;
          height: 155px;

          .swiper-slide {
            border-radius: 10px;
            box-shadow: 0 3px 7px 0 rgba(0, 0, 0, 0.23), inset 0 3px 7px 0 rgba(140, 152, 201, 0.17);
            border: solid 1px rgba(74, 81, 105, 0.23);
            box-sizing: border-box;
            background-image: linear-gradient(to top, #252934, #343a4a);
            opacity: 0;
            transition: all 0.8s, width 0.4s, border-color 0.5s;
            animation: swiper-slide-animate 0.8s;
            animation-fill-mode: forwards;
            cursor: pointer;
            &:hover {
              background-image: linear-gradient(to top, #252934, #505972);
              border-color: #252934;
            }
            &:before, &:after {
              pointer-events: none;
              content: "";
              position: absolute;
              border: 1px solid transparent;
              border-radius: 10px;
              width: 0;
              height: 0;
              opacity: 0;
            }
            &:before {
              top: -1px;
              left: -1px;
            }
            &:after {
              bottom: -1px;
              right: -1px;
            }

            @keyframes swiper-slide-animate {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }

            &.active {
              &:before, &:after {
                opacity: 1;
                width: 100%;
                height: 100%;
                transition: all 0.3s, width 0.05s;
              }
              &:before {
                border-top-color: #07f1b7;
                border-right-color: #07f1b7;

                /*border-image: linear-gradient(#07e9f1, #07f1b7) 1 repeat;
                border-image-width: 1px;
                border-image-outset: 0;*/
              }
              &:after {
                border-bottom-color: #07f1b7;
                border-left-color: #07f1b7;
              }
            }

            &.disabled {
              cursor: no-drop;
            }

            .match-name {
              font-size: 16px;
              letter-spacing: 0.45px;
              // text-align: center;
              color: #ffffff;
              width: 90%;
              margin: 11px auto 14px;
              font-weight: normal;
              .name-text {
                display: inline-block;
                width: 144px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }

            .pk-main {
              width: 199px;
              margin: 0 auto;
              display: flex;
              justify-content: space-between;

              .flag-box {
                width: 49px;
                &.flag-box-twoline {
                  span {
                    width: 70px;
                    margin-left: -10px;
                  }
                }
                &.flag-box-ell {
                  span {
                    /deep/ .ivu-tooltip-rel {
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                    }
                  }
                }

                .logo-bg {
                  height: 49px;
                  background: url("../../assets/index/team_logo_bg.png") no-repeat center center;
                  background-size: 100% auto;
                  border-radius: 50%;
                  overflow: hidden;
                  text-align: center;
                  line-height: 46px;

                  img {
                    width: 32px;
                  }
                }

                span {
                  margin-top: 10px;
                  margin-left: -26px;
                  display: block;
                  width: 101px;
                  font-size: 16px;
                  line-height: 16px;
                  letter-spacing: 0.4px;
                  text-align: center;
                  color: #acbae2;
                }
              }

              .date-time {
                text-align: center;
                font-size: 14px;
                color: #acbae2;
                line-height: 26px;
                &.today-time {
                  line-height: 48px;
                }
                &.vs {
                  font-size: 24px;
                  color: #6e7ba0;
                  line-height: 48px;
                }
              }
            }

            .live-tag {
              display: block;
              width: 62px;
              height: 24px;
              border-radius: 4px;
              box-sizing: border-box;
              border: 1px solid #6e7ba0;
              font-size: 16px;
              line-height: 20px;
              letter-spacing: 0.4px;
              text-align: center;
              color: #6e7ba0;
              &.run {
                color: #00f4bb;
                border-color: #07f1b7;
              }
            }
          }
        }

        .match-live-swiper-prev, .match-live-swiper-next {
          width: 28px;
          height: 44px;
          opacity: 0.4;
          transition: all 0.3s;
          &:after {
            display: none;
          }
          &:hover {
            opacity: 1;
          }
          &.swiper-button-disabled {
            opacity: 0.2;
            pointer-events: none;
          }
        }
        .match-live-swiper-prev {
          left: 0;
          background: url("../../assets/index/banner_left.png");
        }
        .match-live-swiper-next {
          right: 0;
          background: url("../../assets/index/banner_right.png");
        }
      }

      .match-content {
        margin-top: 30px;
        display: flex;
        justify-content: center;
        height: 644px;
        border-radius: 10px;
        border: solid 1px #4a5169;
        box-sizing: border-box;
        box-shadow: 0 3px 7px 0 rgba(0, 0, 0, 0.23), inset 0 3px 7px 0 rgba(140, 152, 201, 0.17);
        background-image: linear-gradient(to top, #252934, #343a4a);
        .left {
          width: 950px;
          margin-right: 30px;
          .head-info {
            height: 66px;
            line-height: 66px;
            font-size: 18px;
            color: #acbae2;
            letter-spacing: 0.45px;
            display: flex;
            flex-direction: row-reverse;
            justify-content: space-between;
            .match-top-name {
              width: 270px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .center {
              .left-team-name {
                line-height: 1;
                margin-right: 20px;
              }
              .right-team-name {
                line-height: 1;
                margin-left: 20px;
              }
              .teamname-ell {
                width: 148px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              em {
                margin: 0 40px;
              }
              .logo-bg {
                width: 49px;
                height: 49px;
                background: url("../../assets/index/team_logo_bg.png") no-repeat center center;
                background-size: 100% auto;
                border-radius: 50%;
                overflow: hidden;
                text-align: center;
                line-height: 46px;
                img {
                  width: 32px;
                }
              }
            }
            .match-name {
              width: 195px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: 16px;
              line-height: 66px;
            }
            .pk-main {
              margin: 0 auto;
              display: flex;
              justify-content: center;
              width: 560px;
              .flag-box {
                display: flex;
                .logo-bg {
                  margin-top: 8.5px;
                  width: 49px;
                  height: 49px;
                  background: url("../../assets/index/team_logo_bg.png") no-repeat center center;
                  background-size: 100% auto;
                  border-radius: 50%;
                  overflow: hidden;
                  text-align: center;
                  line-height: 46px;
                  img {
                    width: 32px;
                  }
                }
                span {
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  width: 150px;
                  font-size: 18px;
                  margin-right: 20px;
                  text-align: right;
                }
                &:last-child {
                  flex-direction: row-reverse;
                  span {
                    margin-right: 0;
                    margin-left: 20px;
                    text-align: left;
                  }
                }
              }
              em {
                display: block;
                width: 103px;
                text-align: center;
                line-height: 66px;
                font-size: 18px;
              }
            }
            .live-line {
              width: 195px;
              display: flex;
              flex-direction: row-reverse;
              .line-selector {
                position: relative;
                z-index: 10;
                margin-top: 13px;
                .line-pla {
                  width: 120px;
                  height: 40px;
                  border-radius: 6px;
                  border: solid 1px #00f4bb;
                  box-sizing: border-box;
                  font-size: 18px;
                  line-height: 38px;
                  color: #00f4bb;
                  text-align: center;
                  background-image: linear-gradient(#3c4153, #2b2f3b 10%);
                  cursor: pointer;
                  transition: opacity 0.3s;
                  &:hover {
                    opacity: 0.7;
                  }
                  i {
                    display: inline-block;
                    width: 14px;
                    height: 8px;
                    margin-left: 8px;
                    vertical-align: middle;
                    background: url("../../assets/icon_es.png") no-repeat;
                    background-position: -798px -94px;
                    transition: transform 0.3s;
                  }
                }
                .line-opt {
                  opacity: 0;
                  height: 0;
                  margin-top: 30px;
                  padding: 3px 0;
                  width: 120px;
                  border-radius: 6px;
                  background-color: #545f75;
                  overflow: hidden;
                  transition: all 0.3s;
                  a {
                    display: block;
                    padding: 0 13px;
                    line-height: 34px;
                    font-size: 14px;
                    color: #ffffff;
                    cursor: pointer;
                    &:hover, &.active {
                      background-color: #222431;
                      color: #00f4bb;
                    }
                  }
                }
                &.show {
                  .line-pla {
                    i {
                      transform: rotate(180deg);
                    }
                  }
                  .line-opt {
                    margin-top: 6px;
                    opacity: 1;
                    height: auto;
                  }
                }
              }
            }
          }

          .match-video {
            background-color: #111;
            height: 548px;
            /deep/ video {
              object-fit: contain;
            }
            /deep/ .dplayer-menu {
              width: 0;
              pointer-events: none;
            }
          }
        }
        .right {
          width: 200px;
          .team-name {
            display: flex;
            font-size: 18px;
            line-height: 18px;
            font-weight: bold;
            color: #ffffff;
            margin-top: 65px;
            margin-bottom: 21px;
            p {
              width: 72.5px;
              text-align: center;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            em {
              display: block;
              width: 55px;
              text-align: center;
            }
          }

          .match-ratio {
            text-align: center;
            dt {
              font-size: 18px;
              line-height: 18px;
              letter-spacing: 0.45px;
              text-align: center;
              color: #acbae2;
            }
            dd {
              height: 98px;
              margin-top: 10px;
              border-radius: 10px;
              box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.15);
              background-image: linear-gradient(to bottom, #3c4153, #2b2f3b);
              &.ratio-val {
                font-size: 18px;
                font-weight: bold;
                line-height: 98px;
                letter-spacing: 0.45px;
                text-align: center;
                color: #ffffff;
              }
              &.ratio-type {
                display: flex;
                justify-content: space-around;
                .ratio-item {
                  font-size: 18px;
                  line-height: 18px;
                  letter-spacing: 0.45px;
                  text-align: center;
                  h3 {
                    margin-top: 24px;
                    font-weight: normal;
                    color: #acbae2;
                  }
                  p {
                    margin-top: 16px;
                    color: #ffffff;
                    font-weight: bold;
                  }
                }
              }
              &.alone {
                display: flex;
                justify-content: space-between;
                background: transparent;
                box-shadow: none;
                .ratio-item {
                  width: 85px;
                  border-radius: 10px;
                  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.15);
                  background-image: linear-gradient(to bottom, #3c4153, #2b2f3b);
                }
              }
            }
            margin-bottom: 28px;
          }

          .pk-main {
            margin-top: 65px;
            font-size: 16px;
            line-height: 16px;
            text-align: center;
            color: #acbae2;
            dt {
              width: inherit;
              /deep/ .ivu-tooltip-rel {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
            .pk-main-team {
              margin: 35px 0 90px;
              .flag-box {
                width: 200px;
                height: 140px;
                border-radius: 10px;
                box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.15);
                background-image: linear-gradient(to bottom, #3c4153, #2b2f3b);
                overflow: hidden;
                .logo-bg {
                  margin: 29px auto 0;
                  width: 49px;
                  height: 49px;
                  background: url("../../assets/index/team_logo_bg.png") no-repeat center center;
                  background-size: 100% auto;
                  border-radius: 50%;
                  overflow: hidden;
                  text-align: center;
                  line-height: 46px;
                  img {
                    width: 32px;
                  }
                }
                span {
                  display: block;
                  width: 90%;
                  margin: 19px auto 0;
                  /deep/ .ivu-tooltip-rel {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  }
                }
              }
              em {
                line-height: 80px;
                font-size: 22px;
                font-weight: bold;
              }
            }
          }

          .to-bet {
            display: block;
            border-radius: 24px;
            font-size: 18px;
            font-weight: bold;
          }
        }
      }
    }
    .home_loading {
      height: 600px;
    }
  }

  .content-default {
    margin-top: 35px;
    padding: 60px 62px;
    border-radius: 10px;
    border: solid 1px #4a5169;
    box-sizing: border-box;
    box-shadow: 0 3px 7px 0 rgba(0, 0, 0, 0.23), inset 0 3px 7px 0 rgba(140, 152, 201, 0.17);
    background-image: linear-gradient(to top, #252934, #343a4a);

    .match-video {
      background-color: #111;
      height: 618px;
      /deep/ video {
        object-fit: contain;
      }
      /deep/ .dplayer-menu {
        width: 0;
        pointer-events: none;
      }
    }
  }
}
</style>
