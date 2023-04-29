<template>
  <div class="group-match">

    <template v-if="!loading">
      <dt class="left">
        <ul>
          <li @click="activeKey = '全部'" :class="{active: activeKey === '全部'}">全部</li>
          <li v-for="(key, index) in groupMatchDataKeyList"
              :key="index" :class="{active: activeKey === key}"
              @click="activeKey = key">
            {{ key }}组
          </li>
        </ul>
      </dt>

      <dd class="right">
        <dl>
          <dt class="right-head">
            <button class="slide-button prev" @click="headCurrentPage > 1 ? headCurrentPage = headCurrentPage - 1 : null"></button>
            <div class="scroll-head">
              <ul :style="{
                  width: `${headWidth}px`,
                  transform: `translateX(${headX}px)`
                }">
                <li v-for="(dateTime, index) in groupByDateMatchList"
                    :key="index"
                    @click="dateSelector(dateTime)"
                    :class="{active: activeDate === dateTime}">
                  <p>{{ dateTime | dateStrToFilter }}</p>
                  <p>周{{ dateTime | dateStrToWeek }}</p>
                </li>
              </ul>
            </div>
            <button class="slide-button next" @click="headCurrentPage < headTotalPage ? headCurrentPage = headCurrentPage + 1 : null"></button>
          </dt>
          <dd v-if="groupByDateMatchData.length" class="scroll-content" ref="scrollRef">
            <ul :style="{height: `${60 * groupByDateMatchData.length}px`}">
              <li v-for="(item, index) in groupByDateMatchData" :key="index">
                <small class="genus-group">{{ item.team_group }}组</small>
                <small v-if="item.status === 0" class="status">未开赛</small>
                <small v-if="item.status === 1" class="status">进行中</small>
                <small v-if="item.status === 2" class="status">已结束</small>
                <small class="time">{{ item.match_time }}</small>
                <h3 class="place-name" v-html="`${item.match_place}<h4>${item.en_gym}</h4>`"></h3>
                <div class="pk">
                  <p class="pk-left">
                    <b>{{ item.name_a }}</b>
                    <span><img :src="item.flag_a" alt=""></span>
                    <i :class="{'not-started': item.status === 0}" :style="{color: item.match_score_a >= item.match_score_b ? '#fff' : 'rgba(255, 255, 255, 0.5)'}">{{ item.match_score_a }}</i>
                  </p>
                  <em>:</em>
                  <p class="pk-right">
                    <b>{{ item.name_b }}</b>
                    <span><img :src="item.flag_b" alt=""></span>
                    <i :class="{'not-started': item.status === 0}" :style="{color: item.match_score_b >= item.match_score_a ? '#fff' : 'rgba(255, 255, 255, 0.5)'}">{{ item.match_score_b }}</i>
                  </p>
                </div>
              </li>
            </ul>
          </dd>
        </dl>
      </dd>
    </template>
    <div v-else class="world-cup2022-loading"></div>
  </div>
</template>

<script>
export default {
  name: 'groupMatch',
  props: ["today"],
  data() {
    return {
      activeKey: "全部",
      srcGroupMatchData: {},
      loading: false,
      groupMatchData: {},
      groupMatchDataKeyList: [],
      groupByDateMatchData: [],
      groupByDateMatchList: [],
      activeDate: null,
      activeDateTimer: null,
      headX: 0,
      headCurrentPage: 1,
      manualSelected: false,
      currentScrollTop: 0,
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
  watch: {
    // 右侧面板展示分组的对应数据
    activeKey(key) {
      this.headX = 0
      console.log('小组赛进程key变化了', key)
      if (key === "全部") {
        this.groupByDateMatchData = this.srcGroupMatchData.data
      } else {
        this.groupByDateMatchData = this.formatByFieldCupCountriesList(this.groupMatchData[key], "team_group")[key]
      }
      this.groupByDateMatchList = Object.keys(this.formatByFieldCupCountriesList(this.groupByDateMatchData, "match_date"))

      clearTimeout(this.activeDateTimer)
      this.activeDateTimer = setTimeout(() => {
        if (this.today) {
          this.activeDate = this.getDateInGroup(this.today, this.groupByDateMatchList)
          this.headCurrentPage = this.headCCPage
          this.dateSelector(this.activeDate)
        } else {
          this.activeDate = this.groupByDateMatchList[0]
          this.headCurrentPage = this.headCCPage
          this.dateSelector(this.activeDate)
        }
      }, 300)
    },

    activeDate(key) {
      const timer = setTimeout(() => {
        this.headCurrentPage = this.headCCPage
        clearTimeout(timer)
      }, 500)
    },

    // 监听切换战队信息头部分页
    headCurrentPage(newVal,oldVal) {
      const step = Math.abs(newVal - oldVal)
      if (newVal > oldVal) {
        this.moveDate("next", step)
      }
      if (newVal < oldVal) {
        this.moveDate("prev", step)
      }
    }
  },
  computed: {
    headCCPage() {
      if (this.groupByDateMatchList.length && this.activeDate) {
        const headIndex = this.groupByDateMatchList.indexOf(this.activeDate) + 1
        return Math.ceil(headIndex / 7)
      }
      return 1
    },
    isTT () {
      // 是否进入了淘汰赛
      if (this.today && new Date(this.today) > new Date('2022-12-03 03:00')) {
        return true
      } else {
        return false
      }
    },
    // 头部日期组件整个宽度
    headWidth () {
      return this.groupByDateMatchList.length * 117 + (this.groupByDateMatchList.length - 1) * 8
    },
    // 头部日期组件总页数
    headTotalPage() {
      return Math.ceil(this.groupByDateMatchList.length / 7)
    }
  },
  mounted () {
    this.getGroupMatchData()
  },
  methods: {
    // 赛事进程拿到today了，但是该组今天没有比赛，显示下一个有赛程的日期
    getDateInGroup(today, dataList) {
      // 该组有当天的比赛
      if(dataList.find(item => item === today)) {
        return today
      } else {
        const index = dataList.findIndex(item => new Date(item) > new Date(today))
        console.log('时间索引', index, this.isTT)
        if(index != -1) {
          return dataList[index]
        } else {
          const lastTime = dataList[dataList.length - 1]
          if (this.isTT || (new Date(lastTime) <= new Date(today))) {
            return dataList[dataList.length - 1]
          } else {
            return dataList[0]
          }
        }
      }
    },
    // 获取小组赛信息
    async getGroupMatchData () {
      this.loading = true
      const res = await this.$http(this.ApiSetting.active.worldCup2022.worldCupSchedule, { type: 1 })
      console.info("初始化2022世界杯赛事进程小组赛信息", res)

      if (res.status === 1 && res.data) {
        this.srcGroupMatchData = res.data
        if (res.data.data) {
          this.groupMatchData = this.formatByFieldCupCountriesList(res.data.data, "team_group")
          this.groupMatchDataKeyList = Object.keys(this.groupMatchData).sort()
          this.groupByDateMatchData = res.data.data
          this.groupByDateMatchList = Object.keys(this.formatByFieldCupCountriesList(res.data.data, "match_date"))
          const timer = setTimeout(() => {
            if (this.today) {
              if (this.isTT) {
                this.dateSelector('2022-12-03')
              } else {
                this.dateSelector(this.today)
              }
            } else {
              this.activeDate = this.groupByDateMatchList[0]
            }
            clearTimeout(timer)
          }, 500)
        }
      }
      this.loading = false
      this.switchContentScrollTop()
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

    // 点击头部日期组件的前进后退
    moveDate(direction, step) {
      if (this.groupByDateMatchList.length <= 7) return

      if (direction === "prev") {
        // 滚动到头部尽头
        if (this.headX < 0) {
          // 大于7天
          if (Math.abs(this.headX) > 117 * 7 + 8 * 7) {
            this.headX = this.headX + ((117 * 7 + 8 * 7) * step)
          } else {
            this.headX = 0
          }
        }
      }
      if (direction === "next") {
        // 滚动到尾部尽头
        if ((this.headWidth - Math.abs(this.headX)) > (117 * 7 + 8 * 6)) {
          // 大于7天
          if (this.headWidth - Math.abs(this.headX) > (117 * 7 + 8 * 7)) {
            this.headX = this.headX - ((117 * 7 + 8 * 7) * step)
          }
        }
      }
    },

    // 点击头部日期组件
    dateSelector(date) {
      this.manualSelected = true
      this.activeDate = date
      if (this.groupByDateMatchData.length) {
        for (let i = 0;i < this.groupByDateMatchData.length;i++) {
          if (this.groupByDateMatchData[i].match_date === date) {
            this.currentScrollTop = i * 60
            this.$refs.scrollRef.scrollTo(0, i * 60)
            break
          }
        }

        if (this.groupByDateMatchList.length <= 7 && this.groupByDateMatchData.length <= 6) {
          this.activeDate = date
        }
      }
    },

    // 监听战队面滚动时选中对相应的头部日期
    switchContentScrollTop() {
      this.$nextTick(() => {
        this.$refs.scrollRef.onscroll = e => {
          if (this.manualSelected && this.currentScrollTop === e.target.scrollTop) {
            this.manualSelected = false
          }
          if (this.manualSelected) return
          const currentTop = e.target.scrollTop
          const visibleIndex = Math.round(currentTop / 60)
          this.activeDate = this.groupByDateMatchData[visibleIndex].match_date

          if ((e.target.children[0].offsetHeight - currentTop) <= 370) {
            if (this.groupByDateMatchData[this.groupByDateMatchData.length - 1].match_date === this.groupByDateMatchList[this.groupByDateMatchList.length - 1]) {
              this.activeDate = this.groupByDateMatchList[this.groupByDateMatchList.length - 1]
            }
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.group-match {
  min-height: 100px;
  margin-top: -8px;
  display: flex;
  justify-content: space-between;

  .left {
    width: 241px;
    border-radius: 10px;
    background-color: #fff;

    ul {
      padding: 10px 0;

      li {
        text-indent: 30px;
        width: 220px;
        height: 48px;
        margin: 0 auto;
        font-size: 16px;
        line-height: 48px;
        color: #333;
        cursor: pointer;
        transition: all 0.2s;

        &:hover, &.active {
          color: #fff;
          border-radius: 10px;
          background-color: #710f2f;
        }
      }
    }
  }

  .right {
    width: 980px;
    border-radius: 10px;
    overflow: hidden;
    dl {

      .right-head {
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
              width: 117px;
              height: 50px;
              margin-right: 8px;
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

      .scroll-content {
        background-color: #fff;
        height: 360px;
        overflow-y: scroll;
        scroll-behavior: smooth;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        ul {
          li {
            display: flex;
            height: 60px;
            color: #333333;
            font-family: Roboto;
            border-bottom: 1px solid #e3e3e3;
            box-sizing: border-box;
            line-height: 60px;
            .genus-group {
              font-size: 14px;
              margin-left: 38px;
            }
            .status {
              font-size: 14px;
              margin-left: 45px;
              color: #666666;
            }
            .time {
              margin-left: 40px;
              font-size: 18px;
              font-weight: bold;
            }
            .place-name {
              width: 176px;
              font-weight: normal;
              line-height: 14px;
              margin: 15px 0 0 60px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              /deep/ h4 {
                width: inherit;
                font-size: 12px;
                line-height: 20px;
                color: #666;
                font-weight: normal;
                font-family: Roboto;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
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
                  width: 100px;
                  font-weight: normal;
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
                  &.not-started {
                    background: url("../../../../../assets/active/worldCup2022/score_bg_no_started.png") no-repeat;
                  }
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
</style>
