<template>
  <div class="world-cup2022" :class="[{'get-votes': tabActiveIndex === 2}, {'bonus': tabActiveIndex === 3}]">

    <h2 class="date"><p v-if="initInfo.active_show_time">活动时间 ：{{ initInfo.active_show_time }}</p></h2>

    <!-- 奖池-->
    <jackpot :loop="initInfo.is_open_jackpot" />

    <button class="world-cup2022-btn1 my-guess" @click="openMyGuess">
      <span class="world-cup2022-gradient-color">我的竞猜</span>
    </button>

    <!-- 活动tabs-->
    <div class="tabs" @mouseenter="setInTabsStatus" @mouseleave="hideSquare" @mousemove="moveSquare">
      <ul class="square" :style="{transform: `translateX(${squareLeft}px)`}">
        <li></li>
        <li class="large"></li>
        <li></li>
      </ul>

      <div v-for="(arr, index) in tabsList"
           :key="index"
           class="tab-item"
           :class="{active: tabActiveIndex === index}"
           @click="index > 1 ? (initInfo.next_stage ? tabActiveIndex = index : $message({ message: '敬请期待！', type: 'warning' })) : tabActiveIndex = index">
        <div class="slide-tab">
          <h2>{{ arr[0] }}</h2>
          <small>{{ arr[1] }}</small>
          <h2 class="world-cup2022-gradient-color">{{ arr[0] }}</h2>
          <small>{{ arr[1] }}</small>
        </div>
      </div>
    </div>

    <keep-alive>
      <!-- 赛事进程-->
      <eventProgress ref="eventprogress" v-if="tabActiveIndex === 0" :today="initInfo.next_date" :isLoad="scheduleLoad" />

      <!-- 赛事数据-->
      <eventData ref="eventdata" v-if="tabActiveIndex === 1" :today="initInfo.next_date" @scheduleLoadFinished="scheduleTime += 1" />

      <!-- 选票GET-->
      <getVotes v-if="tabActiveIndex === 2" :voteData="votesData" @changeTabs="bonusScroll = true;tabActiveIndex = 3" />

    </keep-alive>

    <!-- 百万奖池-->
    <bonus v-if="tabActiveIndex === 3"
           :guessType="guessingTypeList"
           :pageScroll.sync="bonusScroll"
           @pageScrollBack="pageScrollTop"
           @toGetVotes="tabActiveIndex = 2;pageScrollTop()"
           :voteTime="initInfo.vote_time"
           ref="bonusRef" />

    <!-- 回到首页-->
    <div class="world-cup2022-back-home">
      <router-link to="/active" />
    </div>

    <!-- 我的竞猜 dialog-->
    <myGuess :visible.sync="myGuessVisible" :guessType="guessingTypeList" />

    <!-- 免费选票 dialog-->
    <freeVote :visible.sync="freeVoteVisible" @toBonus="bonusScroll = true;tabActiveIndex = 3" />

  </div>
</template>

<script>
import jackpot from './jackpot'
import eventData from './eventData'
import eventProgress from './eventProgress'
import myGuess from './dialogs/myGuess'
import getVotes from './getVotes'
import bonus from './bonus'
import freeVote from './dialogs/freeVote'
import { mapState } from 'vuex'

export default {
  name: 'worldCup2022',
  components: { jackpot, eventData, eventProgress, myGuess, getVotes, bonus, freeVote },
  data() {
    return {
      tabActiveIndex: 0,
      tabsList: [
        ["赛事进程", "PROCESS"],
        ["赛事数据", "EVENT"],
        ["选票GET", "VOTE"],
        ["百万奖金在等您", "BONUS"],
      ],
      mouseInTabs: false,
      tabsOffsetLeft: 0,
      moveElOffWidth: 0,
      squareLeft: 0,
      initInfo: {},
      myGuessVisible: false,

      // 竞猜类型
      guessingTypeList: [
        { id: 1, key: "八强", value: 5 },
        { id: 2, key: "四强", value: 4 },
        { id: 3, key: "季军", value: 3 },
        { id: 4, key: "亚军", value: 2 },
        { id: 5, key: "冠军", value: 1 }
      ],

      // 选票组件数据
      votesData: {
        mode2: {},
        mode3: {}
      },

      freeVoteVisible: false,

      scheduleTime: 0,
      scheduleLoad: false,
      bonusScroll: false
    }
  },
  computed: {
    ...mapState(['isLogin'])
  },
  watch: {
    tabActiveIndex(val) {
      if(val === 1) {
        const timer = setTimeout(() => {
          if(this.$refs.eventdata.$refs.datahome && this.initInfo.next_date) {
            this.$refs.eventdata.$refs.datahome.teamRightDateSelector(this.initInfo.next_date)
          }
          clearTimeout(timer)
        }, 500)
      }
      if(val === 0) {
        const timer = setTimeout(() => {
          if(this.$refs.eventprogress.$refs.groupmatch && this.initInfo.next_date) {
            if(new Date(this.initInfo.next_date) > new Date('2022-12-03 03:00')) {
              this.$refs.eventprogress.$refs.groupmatch.dateSelector('2022-12-03')
            } else {
              this.$refs.eventprogress.$refs.groupmatch.dateSelector(this.initInfo.next_date)
            }
          }
          clearTimeout(timer)
        }, 500)
      }
    },
    isLogin(){
      this.init()
    },
    // 当世界杯首页调用 getWorldCupSchedule 接口后，且初始化接口响应后
    scheduleTime(num) {
      if (num === 1) {
        this.scheduleLoad = true

        let timer
        timer = setTimeout(() => {
          this.takeFreeVote()
          clearTimeout(timer)
        }, 3000)
      }
    }
  },
  mounted () {
    this.init()

    if (this.tabActiveIndex < 3) {
      this.squareLeft = 116.5
    } else {
      this.squareLeft = 130.5
    }
  },
  methods: {

    // 初始化世界杯信息
    async init () {
      const res = await this.$http(this.ApiSetting.active.worldCup2022.worldCupInit)
      console.info("初始化2022世界杯信息：", res)

      if (res.status === 1 && res.data) {
        this.initInfo = res.data
        this.scheduleTime += 1

        const voteObj = {
          mode2: {
            available_deposit: this.initInfo.available_deposit,
            deposit_vote_times: this.initInfo.deposit_vote_times,
            virtual_exchange: this.initInfo.virtual_exchange
          },
          mode3: {
            available_water: this.initInfo.available_water,
            water_vote_times: this.initInfo.water_vote_times
          }
        }
        this.votesData = voteObj
      }
    },

    // 计算偏移位置
    setInTabsStatus(e) {
      this.mouseInTabs = true
      document.getElementsByClassName("square")[0].style.opacity = 1
      this.tabsOffsetLeft = e.target.offsetLeft
      this.moveElOffWidth = document.getElementsByClassName("square")[0].offsetWidth / 2
    },

    // 移动tabs顶部Square
    moveSquare(e) {
      if (this.mouseInTabs) {
        this.squareLeft = e.clientX - this.tabsOffsetLeft - this.moveElOffWidth
        if (this.squareLeft <= 0) {
          this.squareLeft = 0
        }
        if (this.squareLeft >= 1240 - this.moveElOffWidth * 2) {
          this.squareLeft = 1240 - this.moveElOffWidth * 2
        }
      }
    },

    // 隐藏tabs顶部Square
    hideSquare() {
      document.getElementsByClassName("square")[0].style.opacity = 0
      this.mouseInTabs = false
    },

    // 领取免费选票
    async takeFreeVote() {
      if (this.initInfo.get_free_ticket) {
        const params = { type: 1, from: 4 }
        console.info("2022世界杯兑换免费选票入参：", params)
        const res = await this.$http(this.ApiSetting.active.worldCup2022.exchangeVote, params)
        console.info("2022世界杯兑换免费选票响应：", res)

        if (res.status === 1 && res.data) {
          this.freeVoteVisible = true
          if (this.$refs.bonusRef) {
            this.$refs.bonusRef.getTeamList()
          }
        }
      }
    },

    // 开启我的竞猜dialog
    openMyGuess() {
      if (!this.isLogin) {
        this.$message({message: "请您先登录！", type: 'warning'})
        return
      }
      this.myGuessVisible = true
    },

    // 定位页面到tabs的top
    pageScrollTop() {
      window.scrollTo({ top: 878, behavior: 'smooth' })
    }
  }
}
</script>

<style lang="less">
//////////////////公共样式////////////////////
//白黄渐变文字
.world-cup2022-gradient-color {
  background-image: linear-gradient(to top, #fff7a5, #fff), linear-gradient(to bottom, #fff7a5, #fff7a5);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
//红色按钮
.world-cup2022-btn1 {
  display: block;
  width: 205px;
  height: 90px;
  border: 0;
  outline: 0;
  background: url("../../../../assets/active/worldCup2022/my_guess.png") no-repeat;
  position: relative;
  cursor: pointer;
  span {
    position: absolute;
    top: 18px;
    left: 0;
    width: 100%;
    font-size: 16.5px;
    font-weight: bold;
    text-align: center;
  }
  &:hover {
    background: url("../../../../assets/active/worldCup2022/my_guess_hover.png") no-repeat;
  }
}
//子模块tab
.world-cup2022-second-tabs {
  display: flex;
  li {
    width: 186px;
    height: 90px;
    margin-left: -18px;
    font-size: 16px;
    line-height: 60px;
    text-align: center;
    color: #fff;
    cursor: pointer;
    background: url("../../../../assets/active/worldCup2022/second_tabs_normal.png") no-repeat center top;
    &:hover {
      color: #fff69d;
    }
    &.active {
      color: #fff;
      font-weight: bold;
      background: url("../../../../assets/active/worldCup2022/second_tabs_active.png") no-repeat center top;
    }
  }
}

//滚动条
//谷歌浏览器
.world-cup2022 {
  &::-webkit-scrollbar {
    background-color: #cccccc;
    width: 4px;
    height: 4px;
  }
  ::-webkit-scrollbar-track {
    border-radius: 0;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 0;
    background-color: #862039;
  }
  * {
    /*ie浏览器*/
    scrollbar-arrow-color: transparent; /**//*三角箭头的颜色*/
    scrollbar-face-color: #862039; /**//*立体滚动条的颜色*/
    scrollbar-3dlight-color: transparent; /**//*立体滚动条亮边的颜色*/
    scrollbar-highlight-color: transparent; /**//*滚动条空白部分的颜色*/
    scrollbar-shadow-color: transparent; /**//*立体滚动条阴影的颜色*/
    scrollbar-darkshadow-color: transparent; /**//*立体滚动条强阴影的颜色*/
    scrollbar-base-color:#333; /**//*滚动条的基本颜色*/
    /*火狐浏览器*/
    scrollbar-width: auto;
    scrollbar-color: #862039 rgba(134,32,57,.3);
  }
}
// dialog
.world-cup2022-my-guess {
  height: 450px;
  border: 0;
  background-color: transparent;
  border-radius: 10px;
  overflow: hidden;

  .el-dialog__header {
    height: 48px;
    background-color: transparent;
    background-image: linear-gradient(to right, #A22440, #6e1d33);
    line-height: 48px;
    position: relative;
    .el-dialog__title {
      display: block;
      color: #fff;
      font-size: 16px;
      line-height: 48px;
      font-weight: bold;
      text-align: center;
    }
    .el-dialog__headerbtn {
      .el-dialog__close {
        width: 100%;
        height: 100%;
        background: url("../../../../assets/active/worldCup2022/dialog_close.png") no-repeat center;
        opacity: 0.7;
        transition: all 0.2s;
      }
      &:hover {
        .el-dialog__close {
          opacity: 1;
        }
      }
    }
  }
  .el-dialog__body {
    padding: 0;
    height: 400px;
    background-image: linear-gradient(to bottom, #A22440, #6e1d33);
    position: relative;
  }
}

// loading
.world-cup2022-loading {
  display: block;
  width: 100%;
  height: inherit;
  background: url("../../../../assets/btn-loader.gif") no-repeat center;
  background-size: 64px 64px;
}

// 数据为空时
.world-cup2022-empty-data {
  width: 100%;
  height: inherit;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  i {
    display: block;
    width: 56px;
    height: 40px;
    background-image: url("../../../../assets/active/worldCup2022/empty_data.png");
  }
  .empty-txt {
    width: inherit;
    margin-top: 9px;
    font-size: 14px;
    line-height: 14px;
    color: #999;
  }
}

</style>
<style lang="less" scoped>
.world-cup2022 {
  border-top: 0.1px solid transparent;
  background-image:
    url("../../../../assets/active/worldCup2022/banner.jpg"),
    url("../../../../assets/active/worldCup2022/bg_top.jpg"),
    url("../../../../assets/active/worldCup2022/bg_bottom.jpg"),
    url("../../../../assets/active/worldCup2022/repeat_bg.jpg");
  background-repeat: no-repeat, no-repeat, no-repeat, no-repeat repeat;
  background-position: center top, center 984px, center bottom;
  background-size: auto, auto, auto, 1920px;

  &.get-votes {
    background-position: center top, center 984px, center calc(100% - 646px);
  }

  &.bonus {
    background-position: center top, center 984px, center calc(100% - 642px);
  }

  .date {
    width: 633px;
    height: 64px;
    margin: 601px auto 0;
    font-size: 22px;
    line-height: 64px;
    text-align: center;
    color: #fff;
    p {
      animation:  0.8s date-animate, 2.4s date-flash-animate 1.2s;
    }
    @keyframes date-animate {
      from {
        letter-spacing: -15px;
        opacity: 0;
      }
      to {
        letter-spacing: 0;
        opacity: 1;
      }
    }
    @keyframes date-flash-animate {
      0% {
        text-shadow: 0 0 10px #fff69d;
      }
      20% {
        text-shadow: 0 0 15px #fff69d;
      }
      60% {
        text-shadow: 0 0 10px #fff69d;
      }
      90% {
        text-shadow: 0 0 30px #fff69d;
      }
      100% {
        text-shadow: 0 0 0 #fff69d;
      }
    }
  }



  .my-guess {
    margin: -10px auto 0;

    &:before, &:after {
      position: absolute;
      top: 21px;
      content: "";
      width: 17px;
      height: 17px;
      background: url("../../../../assets/active/worldCup2022/my_guess_ball.png") no-repeat;
    }
    &:before {
      left: 46px;
    }
    &:after {
      right: 44px;
    }
  }

  .tabs {
    margin: 24px auto 0;
    width: 1240px;
    height: 90px;
    display: flex;
    border-radius: 10px;
    box-shadow: 0 3px 51px 0 rgba(17, 10, 10, 0.41), inset 0 1px 0 0 #f34064;
    background-image: linear-gradient(to top, #A22440, #6e1d33);
    position: relative;
    .square {
      height: 26px;
      display: flex;
      position: absolute;
      top: -9px;
      left: 0;
      z-index: 2;
      opacity: 0;
      transition: opacity 0.1s;
      pointer-events: none;
      li {
        margin-top: 6px;
        width: 8px;
        height: 8px;
        transform: rotate(45deg);
        background-color: #f34064;
        &.large {
          margin: 0 18px;
          width: 18px;
          height: 18px;
        }
      }
    }

    .tab-item {
      text-align: center;
      width: 303px;
      cursor: pointer;
      overflow: hidden;
      position: relative;
      &:after {
        position: absolute;
        right: 0;
        bottom: 1px;
        content: "";
        width: 1px;
        height: 90px;
        opacity: 0.5;
        background-image: linear-gradient(to bottom, transparent, #f67592);
      }
      .slide-tab {
        transition: transform 0.3s;
        h2 {
          margin-top: 19px;
          font-size: 25.5px;
          font-weight: bold;
          color: #fff;
        }
        small {
          display: block;
          margin-top: 3px;
          color: #ffffff;
          opacity: 0.5;
          font-family: Roboto;
          font-size: 14.5px;
          text-align: center;
        }
      }
      &:nth-child(2) {
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
      }
      &:last-child {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        width: 329px;
        &:after {
          width: 0;
        }
      }
      &:hover {
        .slide-tab {
          transform: translateY(-74.5px);
        }
      }
      &.active {
        box-shadow: 0 3px 51px 0 rgba(17, 10, 10, 0.41), inset 0 1px 0 0 #f34064;
        background-image: linear-gradient(to bottom, #A22440, #6e1d33);
        .slide-tab {
          transform: translateY(-74.5px);
          position: relative;
          h2 {
            position: relative;
            z-index: 1;
          }
          &:before, &:after {
            position: absolute;
            content: "";
            animation: translate-animate 0.3s;
          }
          &:before {
            bottom: -17px;
            left: 0;
            width: 143px;
            height: 89px;
            background: url("../../../../assets/active/worldCup2022/tab_before.png") no-repeat;
          }
          &:after {
            bottom: -15px;
            right: 0;
            width: 50px;
            height: 88px;
            background: url("../../../../assets/active/worldCup2022/tab_after.png") no-repeat;
          }
          @keyframes translate-animate {
            from {
              transform: translateY(90px);
            }
            to {
              transform: translateY(0);
            }
          }
        }
      }
    }
  }

  .world-cup2022-back-home {
    padding: 44px 0 14px;
    text-align: center;
    a {
      display: inline-block;
      width: 280px;
      height: 108px;
      background: url("../../../../assets/active/worldCup2022/back_home.png");
    }
  }

}
</style>

