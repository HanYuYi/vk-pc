<template>
  <div class="data-home">

    <!-- 战队信息-->
    <div class="team">

      <dl class="left">
        <template v-if="!dataLoading">
          <dt>
            <button v-for="(obj, key, index) in scoreboardData"
                    :key="index"
                    @click="teamLeftActiveKey = key"
                    :class="{active: teamLeftActiveKey === key}">
              {{ key }}组
            </button>
          </dt>
          <dd>
            <table border="0" align="center" cellspacing="0" width="100%">
              <thead>
                <tr>
                  <th>排名</th>
                  <th class="align-left">国家</th>
                  <th>胜平负</th>
                  <th>净胜</th>
                  <th>积分</th>
                </tr>
              </thead>
              <tbody v-if="teamLeftActiveKey">
                <tr v-for="(item, index) in scoreboardData[teamLeftActiveKey]" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td class="align-left"><img :src="item.flag" alt="">{{ item.name }}</td>
                  <td>{{ item.match_win }}/{{ item.match_equal }}/{{ item.match_lose }}</td>
                  <td>{{ item.goal_differential }}</td>
                  <td>{{ item.score }}</td>
                </tr>
              </tbody>
            </table>
          </dd>
        </template>
        <dt v-else class="world-cup2022-loading"></dt>
      </dl>

      <div class="right">
        <template v-if="!teamRightDataLoading">
          <dl>
            <dt>
              <button class="slide-button prev" @click="teamHeadCurrentPage > 1 ? teamHeadCurrentPage = teamHeadCurrentPage - 1 : null"></button>
              <div class="scroll-head">
                <ul :style="{
                  width: `${teamRightHeadWidth}px`,
                  transform: `translateX(${teamHeadRightX}px)`
                }">
                  <li v-for="(dateTime, index) in teamRightData.dateList"
                      :key="index"
                      @click="teamRightDateSelector(dateTime)"
                      :class="{active: teamRightActiveDate === dateTime}">
                    <p>{{ dateTime | dateStrToFilter }}</p>
                    <p>周{{ dateTime | dateStrToWeek }}</p>
                  </li>
                </ul>
              </div>
              <button class="slide-button next" @click="teamHeadCurrentPage < teamHeadTotalPage ? teamHeadCurrentPage = teamHeadCurrentPage + 1 : null"></button>
            </dt>
            <dd ref="teamRightRef">
              <ul :style="{height: `${60 * teamRightData.data.length}px`}">
                <li v-for="(item, index) in teamRightData.data" :key="index">
                  <small class="date">{{ item.match_date }}</small>
                  <small class="time">{{ item.match_time }}</small>
                  <div class="pk">
                    <p class="pk-left">
                      <b>{{ item.name_a }}</b>
                      <span><img :src="item.flag_a" alt=""></span>
                      <i>{{ item.match_score_a }}</i>
                    </p>
                    <em>:</em>
                    <p class="pk-right">
                      <b>{{ item.name_b }}</b>
                      <span><img :src="item.flag_b" alt=""></span>
                      <i>{{ item.match_score_b }}</i>
                    </p>
                  </div>
                </li>
              </ul>
            </dd>
          </dl>
        </template>
        <dl v-else class="world-cup2022-loading"></dl>
      </div>
    </div>

    <!-- 球员介绍-->
    <div class="team-member">
      <h2 class="data-home-header">球员介绍<i></i></h2>

      <dl>
        <dt class="group">
          <template v-if="!countriesListForGroupLoading">
            <div class="group-left">
              <div class="group-item">
                <ul>
                  <li v-for="(obj, key, index) in splitCountriesListForGroup.a"
                      :key="index"
                      @click="!playerInfoLoading ? (groupItemActiveKeys.a = key, countriesSelectedKey = splitCountriesListForGroup.a[groupItemActiveKeys.a][0].cn_name) : null"
                      :class="{active: groupItemActiveKeys.a === key}">{{ key }}组</li>
                </ul>
              </div>
              <div class="group-country">
                <ul>
                  <li v-for="(row, index) in splitCountriesListForGroup.a[groupItemActiveKeys.a]"
                      :key="index"
                      @click="!playerInfoLoading ? countriesSelectedKey = row.cn_name : null"
                      :class="{active: countriesSelectedKey === row.cn_name}">
                    <img :src="row.flag" alt="">
                    <p>{{ row.cn_name }}</p>
                  </li>
                </ul>
              </div>
            </div>
            <div class="group-right">
              <div class="group-item">
                <ul>
                  <li v-for="(obj, key, index) in splitCountriesListForGroup.b"
                      :key="index"
                      @click="!playerInfoLoading ? (groupItemActiveKeys.b = key, countriesSelectedKey = splitCountriesListForGroup.b[groupItemActiveKeys.b][0].cn_name) : null"
                      :class="{active: groupItemActiveKeys.b === key}">{{ key }}组</li>
                </ul>
              </div>
              <div class="group-country">
                <ul>
                  <li v-for="(row, index) in splitCountriesListForGroup.b[groupItemActiveKeys.b]"
                      :key="index"
                      @click="!playerInfoLoading ? countriesSelectedKey = row.cn_name : null"
                      :class="{active: countriesSelectedKey === row.cn_name}">
                    <img :src="row.flag" alt="">
                    <p>{{ row.cn_name }}</p>
                  </li>
                </ul>
              </div>
            </div>
          </template>
          <div v-else class="world-cup2022-loading"></div>
        </dt>
        <dd class="details">
          <ul class="record">
            <li v-for="(item, index) in countriesSelectedRecordKeys" :key="index">
              <template v-if="index !== 1">
                <h1>{{ countriesSelectedRecord[item.field] }}</h1>
                <small>{{ item.title }}</small>
              </template>
              <template v-else>
                <h1 v-if="countriesSelectedRecord.history && countriesSelectedRecord.history.length">
                  {{ countriesSelectedRecord.history.split("").filter(num => num === "3").length }}/{{ countriesSelectedRecord.history.split("").filter(num => num === "1").length }}/{{ countriesSelectedRecord.history.split("").filter(num => num === "0").length }}
                </h1>
                <div v-if="countriesSelectedRecord.history && countriesSelectedRecord.history.length" class="sessions-box">
                  <span v-for="(num, i) in countriesSelectedRecord.history.split('')" :key="i">
                    <i v-if="num === '3'" class="win">胜</i>
                    <i v-if="num === '1'" class="equal">平</i>
                    <i v-if="num === '0'" class="lose">负</i>
                  </span>
                </div>
                <small>近10场战绩（胜/平/负）</small>
              </template>
            </li>
          </ul>

            <ul class="player-type">
              <template v-if="!playerInfoLoading">
                <li v-for="(arr, key, index) in playerInfo" :key="index">
                  <h5>{{ key }}</h5>
                  <div class="personnel-item">
                    <div v-for="(obj, i) in arr" :key="i" class="personnel-box">
                      <el-popover trigger="hover"
                                  placement="top"
                                  popper-class="p-worldCup2022-player"
                                  width="170">
                        <div class="personnel-item-popover">
                          <div class="avatar">
                            <img :src="obj.icon" alt="">
                          </div>
                          <p class="name">{{ obj.cn_name }}</p>
                          <p class="eng-name"> {{ obj.en_name }}</p>

                          <div class="average">
                            <div class="average-info">
                              <p class="project">身价：</p>
                              <p class="desc">{{ obj.worth }}</p>
                            </div>
                            <div class="average-info">
                              <p class="project">位置：</p>
                              <p class="desc">{{ obj.position }}</p>
                            </div>
                            <div class="average-info">
                              <p class="project">出生日期：</p>
                              <p class="desc">{{ obj.birthday }}</p>
                            </div>
                            <div class="average-info">
                              <p class="project">身高：</p>
                              <p class="desc">{{ obj.height }}</p>
                            </div>
                          </div>
                        </div>

                        <div slot="reference">
                          <i><img :src="obj.icon" alt=""></i>
                          <span>#{{ obj.num }} {{ obj.cn_name }}</span>
                        </div>
                      </el-popover>
                    </div>
                  </div>
                </li>
              </template>
              <li v-else class="world-cup2022-loading"></li>
            </ul>
        </dd>
      </dl>
    </div>

    <!-- 参赛国家-->
    <div class="from-country">
      <h2 class="data-home-header">参赛国家<i></i></h2>

      <div class="country-content">
        <template v-if="!countriesListForGroupLoading">
          <div class="team-map">
            <ul class="map-bg">
              <li v-for="(row, key, index) in countriesListForArea"
                  :key="index"
                  @click="selectedAreaKey = key"
                  :class="{active: selectedAreaKey === key}"
                  :style="{
                    left: `${countriesListForAreaPosition[key].x}px`,
                    top: `${countriesListForAreaPosition[key].y}px`
                  }">
                <button>{{ key }}({{row.length}})</button>
                <i></i>
              </li>
            </ul>
            <ul v-if="JSON.stringify(countriesListForArea) !== '{}'" class="country-flag">
              <li v-for="(item, index) in countriesListForArea[selectedAreaKey]"
                  :key="index"
                  :class="{active: selectedCountryIndex === index}"
                  @click="selectedCountryIndex = index">
                <img :src="item.flag" alt="">
                <p>{{ item.cn_name }}</p>
              </li>
            </ul>
          </div>
          <div class="team-desc">
            <dl>
              <dt>
                <div v-if="JSON.stringify(countriesListForArea) !== '{}'" class="country-desc">
                  <img :src="countriesListForArea[selectedAreaKey][selectedCountryIndex].flag" alt="">
                  <div class="info">
                    <h4>{{ countriesListForArea[selectedAreaKey][selectedCountryIndex].cn_name }}</h4>
                    <p v-if="countriesListForArea[selectedAreaKey][selectedCountryIndex].years">
                      {{ countriesListForArea[selectedAreaKey][selectedCountryIndex].years.split(',').length }}次夺冠
                    </p>
                  </div>
                </div>
                <ul v-if="JSON.stringify(countriesListForArea) !== '{}' && countriesListForArea[selectedAreaKey][selectedCountryIndex].years" class="country-crown">
                  <li v-for="(year, index) in countriesListForArea[selectedAreaKey][selectedCountryIndex].years.split(',')"
                      :key="index">
                    {{ year }}
                  </li>
                </ul>
              </dt>
              <dd v-if="JSON.stringify(countriesListForArea) !== '{}'" v-html="countriesListForArea[selectedAreaKey][selectedCountryIndex].remark"></dd>
            </dl>
          </div>
        </template>
        <div v-else class="world-cup2022-loading"></div>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'dataHome',
  props: ["scoreboardData", "dataLoading", "today"],
  data() {
    return {
      // 战队信息 左侧
      teamLeftActiveKey: null,

      // 战队信息 右侧
      teamHeadCurrentPage: 1,
      teamHeadRightX: 0,
      teamRightActiveDate: null,
      teamRightData: {
        dateList: [],
        data: []
      },
      teamRightDataLoading: false,
      manualSelected: false,
      currentScrollTop: 0,

      // 国家信息
      countriesList: [],

      // 球员介绍
      groupItemActiveKeys: {a: null, b: null},
      countriesListForOriginal: {},
      countriesListForGroup: {},
      countriesListForGroupLoading: false,
      countriesSelectedKey: null,
      countriesSelectedRecord: {},
      countriesSelectedRecordKeys: [
        { field: 'rank', title: '排名' },
        {},
        { field: 'goals_scored', title: '进球' },
        { field: 'goals_allowed', title: '失球' },
        { field: 'win_rate_one', title: '胜率' },
        { field: 'win_rate_two', title: '赢率' },
        { field: 'big_rate', title: '大率' },
      ],
      playerInfo: {},
      playerInfoLoading: false,

      // 参赛国家
      countriesListForArea: {},
      countriesListForAreaPosition: {
        '中北美洲': { x: 471, y: -29 },
        '亚洲': { x: 372, y: 42 },
        '南美洲': { x: 110, y: 166 },
        '大洋洲': { x: 446, y: 174 },
        '欧洲': { x: 214, y: 9 },
        '非洲': {x: 263, y: 128 }
      },
      selectedAreaKey: "欧洲",
      selectedCountryIndex: 0
    }
  },
  computed: {
    // 战队信息：右侧，计算战队信息头部日期整个宽度
    teamRightHeadWidth() {
      return this.teamRightData.dateList.length * 103 + (this.teamRightData.dateList.length - 1) * 7
    },

    // 球员介绍：将国家数据分为两组
    splitCountriesListForGroup() {
      return {
        a: {
          A: this.countriesListForGroup.A,
          B: this.countriesListForGroup.B,
          C: this.countriesListForGroup.C,
          D: this.countriesListForGroup.D
        },
        b: {
          E: this.countriesListForGroup.E,
          F: this.countriesListForGroup.F,
          G: this.countriesListForGroup.G,
          H: this.countriesListForGroup.H
        }
      }
    },

    // 战队信息：右侧，头部日期总页数
    teamHeadTotalPage() {
      return Math.ceil(this.teamRightData.dateList.length / 7)
    }
  },
  filters: {
    // 过滤yyyy-mm-dd => mm/dd
    dateStrToFilter(str) {
      const filterStr = str.replace(/-/g, "/").split("/")
      return `${filterStr[1]}/${filterStr[2]}`
    },
    dateStrToWeek(str) {
      const weekNum = new Date(str).getDay()
      const weekChinese = ['日', '一', '二', '三', '四', '五', '六']
      return weekChinese[weekNum]
    }
  },
  mounted () {
    this.getTeamRightDate()

    this.getWorldCupCountries()
  },
  watch: {
    // 战队信息：战队信息右侧，当收到父组件的值时，选中第一条
    scoreboardData(data) {
      if (JSON.stringify(data) !== "{}") {
        this.teamLeftActiveKey = Object.keys(data)[0]
      }
    },

    // 战队信息：右侧
    teamRightActiveDate(key) {
      const headIndex = this.teamRightData.dateList.indexOf(key) + 1
      this.teamHeadCurrentPage = Math.ceil(headIndex / 7)
    },

    // 战队信息：右侧，监听切换战队信息头部分页
    teamHeadCurrentPage(newVal, oldVal) {
      const step = Math.abs(newVal - oldVal)
      if (newVal > oldVal) {
        this.moveTeamRightDate("next", step)
      }
      if (newVal < oldVal) {
        this.moveTeamRightDate("prev", step)
      }
    },

    // 球员介绍：在选种国家改变时请求国家的球员信息
    countriesSelectedKey(key) {
      this.getWorldCupPlayers()

      for (const item of this.countriesListForOriginal) {
        if (item.cn_name === key) {
          this.countriesSelectedRecord = item
          break
        }
      }
    },

    // 参赛国家：切换洲的时候，选中国家的索引置为0
    selectedAreaKey() {
      this.selectedCountryIndex = 0
    }
  },
  methods: {
    ////////////////////// 战队信息 /////////////////////
    // 获取战队信息右侧信息
    async getTeamRightDate () {
      this.teamRightDataLoading = true
      const res = await this.$http(this.ApiSetting.active.worldCup2022.worldCupSchedule, { type: 0 })
      console.info("初始化2022世界杯首页右侧信息：", res)

      if (res.status === 1 && res.data) {
        // this.teamRightActiveDate = res.data.dateList[0]
        this.teamRightData = res.data
        const timer = setTimeout(() => {
          if (this.today) {
            this.teamRightDateSelector(this.today)
          } else {
            this.teamRightDateSelector(res.data.dateList[0])
          }
          clearTimeout(timer)
        }, 500)
      }
      this.teamRightDataLoading = false
      this.switchTeamRightScrollTop()
    },

    // 点击滚动战队信息右侧头部日期组件
    moveTeamRightDate(direction, step) {
      if (this.teamRightData.dateList.length <= 7) return

      if (direction === "prev") {
        // 滚动到头部尽头
        if (this.teamHeadRightX < 0) {
          // 大于7天
          if (Math.abs(this.teamHeadRightX) > 103 * 7 + 7 * 7) {
            this.teamHeadRightX = this.teamHeadRightX + ((103 * 7 + 7 * 7) * step)
          } else {
            this.teamHeadRightX = 0
          }
        }
      }
      if (direction === "next") {
        // 滚动到尾部尽头
        if ((this.teamRightHeadWidth - Math.abs(this.teamHeadRightX)) > (103 * 7 + 7 * 6)) {
          // 大于7天
          if (this.teamRightHeadWidth - Math.abs(this.teamHeadRightX) > (103 * 7 + 7 * 7)) {
            this.teamHeadRightX = this.teamHeadRightX - ((103 * 7 + 7 * 7) * step)
          }
        }
      }
    },

    // 战队右侧面板根据时间滚动
    teamRightDateSelector(date) {
      this.manualSelected = true
      this.teamRightActiveDate = date
      if (this.teamRightData.data.length) {
        for (let i = 0;i < this.teamRightData.data.length;i++) {
          if (this.teamRightData.data[i].match_date === date) {
            this.currentScrollTop = i * 60
            this.$refs.teamRightRef.scrollTo(0, i * 60)
            break
          }
        }
      }
    },

    // 监听战队右侧面滚动时选中对相应的头部日期
    switchTeamRightScrollTop() {
      this.$nextTick(() => {
        this.$refs.teamRightRef.onscroll = e => {
          if (this.manualSelected && this.currentScrollTop === e.target.scrollTop) {
            this.manualSelected = false
          }
          if (this.manualSelected) return
          const currentTop = e.target.scrollTop
          const visibleIndex = Math.round(currentTop / 60)
          this.teamRightActiveDate = this.teamRightData.data[visibleIndex].match_date

          // if ((e.target.children[0].offsetHeight - currentTop) <= 250) {
          //   if (this.teamRightData.data[this.teamRightData.data.length - 1].match_date === this.teamRightData.dateList[this.teamRightData.dateList.length - 1]) {
          //     this.teamRightActiveDate = this.teamRightData.dateList[this.teamRightData.dateList.length - 1]
          //   }
          // }
        }
      })
    },


    ////////////////////// 球员介绍 /////////////////////
    // 获取国家信息：球员介绍 和 参赛国家 模块共用
    async getWorldCupCountries () {
      this.countriesListForGroupLoading = true
      const res = await this.$http(this.ApiSetting.active.worldCup2022.worldCupCountries)
      // console.info("初始化2022世界杯首页国家信息", res)

      if (res.status === 1 && res.data) {
        this.countriesListForOriginal = res.data
        this.countriesListForGroup = this.formatByFieldCupCountriesList(res.data, "team_group")
        if (this.countriesListForGroup.A) {
          this.groupItemActiveKeys.a = "A"
          this.countriesSelectedKey = this.countriesListForGroup.A[0].cn_name
        }
        if (this.countriesListForGroup.E) {
          this.groupItemActiveKeys.b = "E"
        }

        this.countriesListForArea = this.formatByFieldCupCountriesList(res.data, "area")
      }
      this.countriesListForGroupLoading = false
    },

    // 根据自定义字段将国家信息分组
    formatByFieldCupCountriesList(list, field) {
      if (!list || !list.length) return {}
      const fieldObj = {}
      for (const item of list) {
        if (fieldObj[item[field]]) {
          fieldObj[item[field]].push(item)
        } else {
          fieldObj[item[field]] = []
          fieldObj[item[field]].push(item)
        }
      }
      return fieldObj
    },

    // 获取每个球员介绍信息
    async getWorldCupPlayers () {
      this.playerInfoLoading = true
      const res = await this.$http(this.ApiSetting.active.worldCup2022.worldCupPlayers, { nationality: this.countriesSelectedKey })
      // console.info("初始化2022世界杯首页球员介绍信息", res)

      if (res.status === 1 && res.data) {
        this.playerInfo = res.data
      }
      this.playerInfoLoading = false
    }
  }
}
</script>

<style lang="less">
.p-worldCup2022-player {
  box-shadow: 0px 3px 29px 0 rgba(0, 0, 0, 0.24);
  border: 0;
  background-color: #95233e;
  border-top-left-radius: 10px;
  border-bottom-right-radius: 10px;
  margin-left: -186px;
  .personnel-item-popover {
    .avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      margin: 5px auto 0;
      overflow: hidden;
      background-color: #f0f0f0;
      text-align: center;
      img {
        max-width: 36px;
        height: 36px;
      }
    }
    .name {
      margin: 5px 15px 0;
      font-size: 14px;
      font-weight: normal;
      text-align: center;
      color: #fff;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .eng-name {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      font-size: 12px;
      text-align: center;
      color: rgba(255, 255, 255, 0.5);
      margin: 0 15px;
    }
    .average {
      display: flex;
      flex-wrap: wrap;
      margin: 3px 15px 20px;
      .average-info {
        margin-top: 12px;
        &:nth-child(odd) {
          width: 70%;
        }
        &:nth-child(even) {
          width: 30%;
        }
        .project {
          font-size: 12px;
          color: #ffffff;
          color: rgba(255, 255, 255, 0.5);
        }
        .desc {
          margin-top: 2px;
          width: 100%;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          font-size: 12px;
          color: #ffffff;
        }
      }
    }
  }
  .popper__arrow {
    margin-left: 73px;
    border-top-color: #95233e!important;
    border-bottom-color: #95233e!important;
    &:after {
      border-top-color: #95233e!important;
      border-bottom-color: #95233e!important;
    }
  }
}
</style>
<style lang="less" scoped>
.data-home {
  .data-home-header {
    padding: 40px 0 30px;
    font-size: 18px;
    font-weight: bold;
    color: #fff;
    line-height: 20px;
    i {
      margin-left: 12px;
      display: inline-block;
      width: 76px;
      height: 20px;
      vertical-align: sub;
      background: url("../../../../../assets/active/worldCup2022/head_bg_1.png") no-repeat;
    }
  }

  .team {
    display: flex;
    justify-content: space-between;
    height: 300px;
    .left, .right {
      height: inherit;
      border-radius: 10px;
      overflow: hidden;
    }
    .left {
      background-color: #fff;
      width: 346px;
      dt {
        display: flex;
        justify-content: space-around;
        padding: 11px 4px 9px;
        button {
          width: 40px;
          height: 30px;
          border: 0;
          outline: 0;
          font-size: 14px;
          line-height: 30px;
          text-align: center;
          color: #540b23;
          background: transparent;
          cursor: pointer;
          &.active {
            border-radius: 15px;
            background-color: #710f2f;
            color: #fff;
          }
        }
      }
      dd {
        table {
          line-height: 50px;
          font-size: 14px;
          font-weight: bold;
          white-space: nowrap;
          tr {
            th {
              color: #a22541;
              background-color: #f3dada;
              &.align-left {
                text-align: left;
              }
            }
            td {
              text-align: center;
              color: #222;
              font-family: Roboto;
              &.align-left {
                text-align: left;
                width: 143px;
                text-overflow: ellipsis;
                overflow: hidden;
                img {
                  width: 30px;
                  margin-right: 7px;
                }
              }
            }
          }
          tbody {
            tr:nth-child(even) {
              background-color: #ededed;
            }
          }
        }
      }
    }
    .right {
      width: 874px;
      dl {
        dt {
          display: flex;
          justify-content: space-between;
          background-image: linear-gradient(to right, #A22440, #6e1d33);
          height: 60px;
          .slide-button {
            border: 0;
            outline: 0;
            width: 55px;
            height: inherit;
            cursor: pointer;
            &.prev {
              background: url("../../../../../assets/active/worldCup2022/dt_prev.png") no-repeat center;
            }
            &.next {
              background: url("../../../../../assets/active/worldCup2022/dt_next.png") no-repeat center;
            }
          }
          .scroll-head {
            overflow: hidden;
            width: calc(100% - 110px);
            ul {
              transition: transform 0.3s;
              display: flex;
              li {
                box-sizing: border-box;
                margin-top: 5px;
                width: 103px;
                height: 50px;
                margin-right: 7px;
                cursor: pointer;
                border: solid 1px;
                border-color: transparent;
                p {
                  text-align: center;
                  line-height: 15px;
                  font-size: 14px;
                  color: #fff;
                  font-family: Roboto;
                  &:first-child {
                    margin: 10px 0 2px;
                  }
                }
                &:hover {
                  p {
                    color: #fff69d;
                  }
                }
                &.active {
                  border-radius: 10px;
                  box-shadow: 0px 1px 1px 0 rgba(255, 0, 57, 0.5), inset 0px 1px 3px 0 rgba(0, 0, 0, 0.4);
                  border-color: rgba(0, 0, 0, 0.06);
                  background-color: rgba(69,8,30,0.2);
                  p {
                    color: #fff69d;
                  }
                }
                &:last-child {
                  margin-right: 0;
                }
              }
            }
          }
        }
        dd {
          background-color: #fff;
          height: 240px;
          overflow-y: scroll;
          scroll-behavior: smooth;
          ul {
            li {
              display: flex;
              height: 60px;
              color: #333333;
              font-family: Roboto;
              border-bottom: 1px solid #e3e3e3;
              box-sizing: border-box;
              line-height: 60px;
              .date {
                font-size: 14px;
                margin-left: 57px;
              }
              .time {
                margin-left: 40px;
                margin-right: 50px;
                font-size: 18px;
                font-weight: bold;
              }
              .pk {
                display: flex;
                width: 380px;
                p {
                  display: flex;
                  flex: 1;
                  font-size: 14px;
                  white-space: nowrap;

                  b {
                    width: 160px;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                  }
                  span {
                    display: block;

                    img {
                      width: 44px;
                    }
                  }

                  i {
                    display: inline-block;
                    margin-top: 12px;
                    width: 31px;
                    height: 36px;
                    line-height: 36px;
                    background: url("../../../../../assets/active/worldCup2022/score_bg.png") no-repeat;
                    font-size: 22px;
                    font-weight: bold;
                    text-align: center;
                    color: #fff;
                  }
                }

                .pk-left {
                  justify-content: flex-end;

                  b {
                    text-align: right;
                  }
                  span {
                    margin-left: 10px;
                  }

                  i {
                    margin-left: 38px;
                  }
                }

                .pk-right {
                  flex-direction: row-reverse;

                  span {
                    margin-right: 10px;
                  }

                  i {
                    margin-right: 38px;
                  }
                }

                em {
                  margin: 0 11px;
                  font-size: 22px;
                  font-weight: bold;
                  color: #333;
                }
              }
              &:last-child {
                border-color: transparent;
              }
            }
          }
        }
      }
    }
  }

  .team-member {
    dl {
      border-radius: 10px;
      background-image: linear-gradient(to right, #A22440, #6e1d33);
      .group {
        padding: 0 20px;
        height: 179px;
        display: flex;
        .group-item {
          margin-top: 8px;
          ul {
            display: flex;
            li {
              width: 64px;
              height: 38px;
              margin-right: 10px;
              text-align: center;
              line-height: 38px;
              font-size: 16px;
              color: #fff;
              cursor: pointer;
              border: solid 1px transparent;
              &:hover {
                color: #fff69d;
              }
              &.active {
                border-radius: 10px;
                color: #fff69d;
                font-weight: bold;
                box-shadow: 0px 1px 1px 0 rgba(255, 0, 57, 0.5), inset 0px 1px 3px 0 rgba(0, 0, 0, 0.4);
                border-color: rgba(0, 0, 0, 0.06);
                background-color: rgba(0,0,0,0.2);
              }
            }
          }
        }
        .group-country {
          margin-top: 13px;
          ul {
            display: flex;
            li {
              width: 118px;
              height: 99px;
              margin-right: 34px;
              border-radius: 10px;
              background-color: rgba(0, 0, 0, 0.08);
              text-align: center;
              cursor: pointer;
              box-sizing: border-box;
              border: solid 3px transparent;
              &:last-child {
                margin-right: 0;
              }
              img {
                margin-top: 15px;
                height: 43px;
              }
              p {
                margin-top: 10px;
                font-size: 12px;
                color: #fff;
              }
              &:hover, &.active {
                position: relative;
                background-color: #ffffff;
                border-color: #ff4469;
                &:after {
                  position: absolute;
                  content: "";
                  bottom: -10px;
                  left: 49.5px;
                  width: 17px;
                  height: 8px;
                  clip-path: polygon(100% 0, 0 0, 50% 100%);
                  background-color: #ff4469;
                }
                p {
                  color: #000;
                }
              }
            }
          }
        }
        .group-left, .group-right {
          width: 50%;
        }
        .group-left {
          position: relative;
          &:after {
            pointer-events: none;
            content: "";
            position: absolute;
            top: 74px;
            right: 0;
            width: 1px;
            height: 78px;
            opacity: 0.1;
            background-color: #fff;
          }
        }
        .group-right {
          .group-country {
            ul {
              justify-content: flex-end;
            }
          }
        }
      }
      .details {
        border-radius: 10px;
        background-color: #ededed;
        padding: 20px;
        .record {
          display: flex;
          justify-content: space-between;
          li {
            width: 140px;
            height: 100px;
            border-radius: 10px;
            background-color: #fff;
            text-align: center;
            h1 {
              margin-top: 25px;
              font-family: Roboto;
              font-size: 30px;
              font-weight: bold;
              color: #333;
            }
            small {
              margin-top: 23px;
              font-size: 14px;
              color: #333;
            }
            &:first-child {
              width: 121px;
            }
            &:nth-child(2) {
              width: 309px;
              h1 {
                margin-top: 13px;
                font-size: 20px;
              }
              .sessions-box {
                margin: 8px 20px 0;
                display: flex;
                justify-content: space-between;
                span {
                  display: block;
                  width: 24px;
                  height: 24px;
                  font-size: 13px;
                  text-align: center;
                  line-height: 24px;
                  i {
                    display: block;
                    border-radius: 50%;
                    &.win {
                      background-color: #f9e0e2;
                      color: #e34349;
                    }
                    &.equal {
                      background-color: #e4e4e4;
                      color: #4d4d4d;
                    }
                    &.lose {
                      background-color: #c4f5d5;
                      color: #009815;
                    }
                  }
                }
              }
              small {
                display: block;
                margin-top: 3px;
              }
            }
          }
        }

        .player-type {
          li {
            width: 100%;
            min-height: 100px;
            padding-bottom: 24px;
            margin-top: 12px;
            border-radius: 10px;
            background-color: #fff;
            font-size: 14px;
            color: #333;
            border-top: 0.1px solid transparent;

            &:first-child {
              margin-top: 10px;
            }
            h5 {
              font-size: 14px;
              color: #333;
              font-weight: normal;
              margin: 11px 0 0 16px;
            }

            .personnel-item {
              display: flex;
              flex-wrap: wrap;
              padding: 0 16px;
              .personnel-box {
                width: 25%;
                height: 36px;
                line-height: 36px;
                margin-top: 17px;
                cursor: pointer;
                i {
                  display: inline-block;
                  width: 36px;
                  height: 36px;
                  background-color: #f0f0f0;
                  border-radius: 50%;
                  margin-right: 12px;
                  overflow: hidden;
                  text-align: center;

                  img {
                    max-width: 36px;
                    height: inherit;
                  }
                }
                span {
                  display: inline-block;
                  width: 230px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
              }
            }
          }
        }
      }
    }
  }

  .from-country {
    .country-content {
      border-radius: 10px;
      height: 513px;
      overflow: hidden;
      display: flex;
      justify-content: space-between;
      background: url("../../../../../assets/active/worldCup2022/data_home_country.png") no-repeat;
      .team-map {
        display: flex;
        .map-bg {
          width: 578px;
          height: 294px;
          margin: 115px 0 0 18px;
          background: url("../../../../../assets/active/worldCup2022/data_home_map.png") no-repeat;
          position: relative;
          li {
            position: absolute;
            cursor: pointer;
            button {
              width: 101px;
              height: 36px;
              border-radius: 10px;
              box-shadow: 0px 8px 24px 0 rgba(0, 0, 0, 0.08);
              background-color: #fff;
              font-size: 15.5px;
              line-height: 36px;
              text-align: center;
              color: #333;
              border: 0;
              outline: 0;
              cursor: pointer;
              transition: all 0.3s;
              &:after {
                position: absolute;
                content: "";
                top: 36px;
                left: 45px;
                width: 11px;
                height: 5px;
                clip-path: polygon(100% 0, 0 0, 50% 100%);
                transition: all 0.3s;
                background-color: #ffffff;
              }
            }
            i {
              width: 17px;
              height: 22px;
              display: block;
              margin: 6px auto 0;
              background: url("../../../../../assets/active/worldCup2022/data_home_location.png") no-repeat;
            }
            &:hover, &.active {
              button {
                color: #fff;
                background-color: #9d233f;
                &:after {
                  background-color: #9d233f;
                }
              }
              i {
                background: url("../../../../../assets/active/worldCup2022/data_home_location_hover.png") no-repeat;
              }
            }
          }
        }
        .country-flag {
          width: 270px;
          height: 450px;
          margin: 44px 0 0 25px;
          display: flex;
          flex-flow: column;
          flex-wrap: wrap;
          li {
            width: 70px;
            height: 70px;
            margin: 0 20px 20px 0;
            text-align: center;
            cursor: pointer;
            transition: all 0.2s;
            img {
              margin-top: 9px;
              height: 32px;
            }
            p {
              margin-top: 5px;
              font-size: 14px;
              color: #333;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            &:hover, &.active {
              border-radius: 6px;
              box-shadow: 0px 9px 24px 0 rgba(0, 0, 0, 0.14);
              background-color: #fff;
            }
          }
        }
      }
      .team-desc  {
        width: 356px;
        dl {
          margin: 0 30px;
          dt {
            display: flex;
            margin: 41px 0 20px;
            height: 40px;
            justify-content: space-between;
            .country-desc {
              display: flex;
              img {
                display: block;
                width: 60px;
                margin-right: 11px;
              }
              .info {
                height: inherit;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                * {
                  width: 100%;
                }
                h4 {
                  font-size: 18px;
                  font-weight: normal;
                  color: #fff;
                }
                p {
                  font-size: 14px;
                  color: rgba(255, 255, 255, 0.5);
                  white-space: nowrap;
                }
              }
            }
            .country-crown {
              display: flex;
              height: inherit;
              text-align: right;
              li {
                margin: 0 3px;
                display: inline-block;
                height: inherit;
                padding-top: 31px;
                font-size: 12px;
                text-align: center;
                color: rgba(255, 255, 255, 0.5);
                background: url("../../../../../assets/active/worldCup2022/data_home_trophy.png") no-repeat center top;
              }
            }
          }
          dd {
            font-size: 14px;
            line-height: 1.71;
            color: #fff;
            text-indent: 30px;
          }
        }
      }
    }
  }
}
</style>
