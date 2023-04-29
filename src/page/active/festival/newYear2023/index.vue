<template>
  <div v-cloak class="new-year2023">

    <!-- 漂浮背景-->
    <div class="float-bg">
      <div class="left">
        <div class="lantern lantern-1"></div>
        <div class="cloud cloud-1"></div>
        <div class="lantern lantern-2"></div>
        <div class="cloud cloud-2"></div>
      </div>
      <div class="right">
        <div class="cloud cloud-1"></div>
        <div class="lantern lantern-1"></div>
        <div class="cloud cloud-2"></div>
        <div class="lantern lantern-2"></div>
        <div class="cloud cloud-3"></div>
      </div>
    </div>

    <div class="main-panel">
      <h4 class="date">
        {{ publicInfo.activeTime || '加载中' }}
      </h4>

      <!-- 音乐按钮-->
      <button class="music-btn"
              @click="musicController"
              :class="{paused: !musicPlaying}">
      </button>

      <!-- 子活动tab-->
      <ul class="active-tab">
        <li v-for="(item, index) in tabsList"
            :key="index"
            @click="activeTabIndex = index + 1"
            :style="{backgroundImage: `url(${index + 1 === activeTabIndex ? item.activeBgImg : item.bgImg})`}"
            :class="{'active': index + 1 === activeTabIndex}"></li>
      </ul>


      <!-- 虚拟元素，用于计算跑马灯滚动 ul 的总长（每个li长度不固定的情况）-->
      <ul ref="messageRef" class="temp">
        <li v-for="(msg, index) in publicInfo.marqueeList" :key="index" v-html="msg"></li>
      </ul>
      <!-- 跑马灯-->
      <div v-show="activeTabIndex <= 2" class="marquee-box">
        <i class="msg-icon"></i>

        <vue-seamless-scroll
            v-if="messageRefWidth > 0"
            :data="publicInfo.marqueeList"
            :class-option="optionSingleHeightTime"
            class="marquee-warp">
          <ul :style="{width: `${messageRefWidth}px`}">
            <li v-for="(msg, index) in publicInfo.marqueeList"
                :key="index"
                :class="{super: msg.toLowerCase().includes(superJackpotList[0]) || msg.toLowerCase().includes(superJackpotList[1])}"
                v-html="msg"></li>
          </ul>
        </vue-seamless-scroll>
      </div>

      <!-- 活动组件-->
      <keep-alive>
        <rabbit-farm-new-year2023 ref="rabbitFarmRef"
                                  v-if="activeTabIndex === 1"
                                  @publicInfo="getPublicInfo"
                                  @receiveAwardFn="receiveAwardBack"
                                  @viewRecord="openRecordDialog"
                                  @toRabbitPanel="panelSwitch"/>

        <billboard-new-year2023 v-if="activeTabIndex === 2"
                                @receiveAwardFn="receiveAwardBack" />

        <red-packet-new-year2023 v-if="activeTabIndex === 3"
                                 @receiveAwardFn="receiveAwardBack"
                                 @tabChange="panelSwitch"
                                 @viewRecord="openRecordDialog" />
      </keep-alive>

      <!-- 回到首页-->
      <div class="new-year2023-back-home">
        <router-link to="/active" class="new-year2023-btn1">
          <span class="new-year2023-gradient-color">回到活动首页</span>
        </router-link>
      </div>
    </div>

    <!-- 领取奖励dialog，三个子活动共用-->
    <receive-award-new-year2023 :visible.sync="receiveAwardVisible" :dataRow="receiveAwardRow" @closeBack="updateRabbitFarmData" />

    <!-- 记录dialog-->
    <record-new-year2023 :visible.sync="recordDialogVisible" :type="recordDialogType" :list="recordDialogList" />

  </div>
</template>

<script>

import RabbitFarmNewYear2023 from "./rabbitFarmNewYear2023"
import BillboardNewYear2023 from "./billboardNewYear2023"
import RedPacketNewYear2023 from "./redPacketNewYear2023"
import receiveAwardNewYear2023 from "./dialog/receiveAwardNewYear2023"
import recordNewYear2023 from "./dialog/recordNewYear2023"

export default {
  name: "newYear2023",
  components: {
    RabbitFarmNewYear2023,
    BillboardNewYear2023,
    RedPacketNewYear2023,
    receiveAwardNewYear2023,
    recordNewYear2023
  },
  data() {
    return {
      tabsList: [
        {bgImg: require("../../../../assets/active/newYear2023/tab_1.png"), activeBgImg: require("../../../../assets/active/newYear2023/tab_1_active.png")},
        {bgImg: require("../../../../assets/active/newYear2023/tab_2.png"), activeBgImg: require("../../../../assets/active/newYear2023/tab_2_active.png")},
        {bgImg: require("../../../../assets/active/newYear2023/tab_3.png"), activeBgImg: require("../../../../assets/active/newYear2023/tab_3_active.png")},
      ],
      publicInfo: {},
      messageRefWidth: 0,
      audio: null,
      musicPlaying: false,
      activeTabIndex: 1,
      receiveAwardRow: {},
      receiveAwardVisible: false,

      recordDialogType: 0,
      recordDialogList: [],
      recordDialogVisible: false,
      superJackpotList: ["iphone", "外星人"],
      asyncUpdateRabbit: false
    }
  },
  computed: {

    optionSingleHeightTime () {
      return {
        direction: 2,
        limitMoveNum: 1
      }
    }
  },
  mounted () {
    this.playMusic()
  },
  methods: {
    getPublicInfo(data) {
      this.publicInfo = data
      this.setUlWidth()
    },

    /**
     * 背景音乐初始化
     */
    async playMusic() {
      this.audio = new Audio()
      this.audio.loop = true
      this.audio.src = "/static/video/newyear2023.mp3"
      try {
        await this.audio.play()
        this.musicPlaying = true
      } catch (e) {
        this.musicPlaying = false
        console.info(e)
      }
    },

    /**
     * 背景音乐控制器
     */
    musicController() {
      this.musicPlaying = !this.musicPlaying
      this.musicPlaying ? this.audio.play() : this.audio.pause()
    },

    /**
     * 控制显示领取奖励的dialog
     * @param row
     */
    receiveAwardBack(row) {
      if (row.asyncUpdate) {
        this.asyncUpdateRabbit = true
      }
      this.receiveAwardRow = row
      this.receiveAwardVisible = true
    },

    /**
     * 控制显示记录的dialog
     * @param type
     * @param list
     */
    openRecordDialog({ type, list }) {
      this.recordDialogType = type
      this.recordDialogList = list
      this.recordDialogVisible = true
    },

    updateRabbitFarmData() {
      if (this.asyncUpdateRabbit) {
        this.activeTabIndex = 1
        this.$refs.rabbitFarmRef.initActiveData()
        this.asyncUpdateRabbit = false
      }
    },

    /**
     * tabs切换
     * @param index
     * @param top
     */
    panelSwitch({ index, top }) {
      this.activeTabIndex = index
      window.scrollTo({ top, behavior: "smooth" })
    },

    // 根据字符长度获取最大li长度，以设置ul总长度：ul长度 = 最大li长度 * li数量
    setUlWidth() {
      this.$nextTick(() => {
        const nodes = this.$refs.messageRef.childNodes
        let w = 0
        for (let i = nodes.length - 1;i >= 0;i--) {
          w += nodes[i].offsetWidth
          w += 70
        }
        this.messageRefWidth = w < 987 ? 987 : w
        this.$refs.messageRef.remove()
      })
    }
  },
  beforeDestroy () {
    this.audio.pause()
  }
}
</script>

<style lang="less" scoped>
.new-year2023 {
  border-top: 0.1px solid transparent;
  background-image:
      url("../../../../assets/active/newYear2023/banner.jpg"),
      url("../../../../assets/active/newYear2023/bg.jpg");
  background-repeat: no-repeat, no-repeat;
  background-position: center top, center 1226px;
  background-size: auto, auto;
  position: relative;
  &::before, &::after {
    position: absolute;
    z-index: 1;
    content: "";
    animation: banner-rabbit-animate 1.5s ease-out infinite;
  }
  &::before {
    width: 505px;
    height: 435px;
    left: 155px;
    top: 199px;
    background: url("../../../../assets/active/newYear2023/banner_rabbit_l.png") no-repeat;
  }
  &::after {
    width: 495px;
    height: 462px;
    right: 63px;
    top: 161px;
    background: url("../../../../assets/active/newYear2023/banner_rabbit_r.png") no-repeat;
  }
  @keyframes banner-rabbit-animate {
    0% {
      transform:translateY(0) scale(1, 1);
    }
    30% {
      transform:translateY(30px) scale(1.1, 0.9);
    }
    40% {
      transform:translateY(15px) scale(1.05, 0.95);
    }
    50% {
      transform:translateY(30px) scale(1.1, 0.9);
    }
    60% {
      transform:translateY(5px) scale(1.02, 0.98);
    }
    100% {
      transform:translateY(0px) scale(1, 1);
    }
  }

  .float-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    .left {
      .lantern {
        background: url("../../../../assets/active/newYear2023/lantern_bg_1.png") no-repeat;
        background-size: 100% 100%;
        animation: lantern-animate-left 25s infinite reverse;
        &.lantern-1 {
          margin: 1417px 0 0 62px;
          width: 289px;
          height: 285px;
        }
        &.lantern-2 {
          margin: 471px 0 0 80px;
          width: 263px;
          height: 260px;
          animation-delay: 2s;
        }
      }
      .cloud {
        width: 310px;
        height: 169px;
        background: url("../../../../assets/active/newYear2023/cloud_bg_1.png") no-repeat;
        background-size: 100% 100%;
        animation: cloud-animate-left 13s infinite reverse;
        &.cloud-1 {
          margin: 334px 0 0 33px;
        }
        &.cloud-2 {
          margin: 403px 0 0 33px;
          animation-delay: 4s;
        }
      }
    }
    .right {
      .lantern {
        background: url("../../../../assets/active/newYear2023/lantern_bg_2.png") no-repeat;
        background-size: 100% 100%;
        animation: lantern-animate-right 27s infinite reverse;
        &.lantern-1 {
          margin: 315px 90px 0 0;
          width: 263px;
          height: 260px;
        }
        &.lantern-2 {
          margin: 346px 109px 0 0;
          width: 233px;
          height: 231px;
          animation-delay: 3s;
        }
      }
      .cloud {
        background: url("../../../../assets/active/newYear2023/cloud_bg_2.png") no-repeat;
        background-size: 100% 100%;
        animation: cloud-animate-right 13s infinite reverse;
        &.cloud-1 {
          margin: 1359px 106px 0 0;
          width: 221px;
          height: 122px;
        }
        &.cloud-2 {
          margin: 396px 62px 0 0;
          width: 310px;
          height: 169px;
          animation-delay: 4s;
        }
        &.cloud-3 {
          margin: 541px 81px 0 0;
          width: 221px;
          height: 122px;
          animation-delay: 7s;
        }
      }
    }
    @keyframes lantern-animate-left {
      0% {
        transform: translate(100px, -100px);
      }
      50% {
        transform: translate(-80px, 160px);
      }
      100% {
        transform: translate(100px, -100px);
      }
    }
    @keyframes lantern-animate-right {
      0% {
        transform: translate(-100px, -100px);
      }
      50% {
        transform: translate(180px, 180px);
      }
      100% {
        transform: translate(-100px, -100px);
      }
    }
    @keyframes cloud-animate-left {
      0% {
        transform: translateX(0);
      }
      50% {
        transform: translateX(80px);
      }
      100% {
        transform: translateX(0px)
      }
    }
    @keyframes cloud-animate-right {
      0% {
        transform: translateX(0);
      }
      50% {
        transform: translateX(-80px);
      }
      100% {
        transform: translateX(0px)
      }
    }
  }

  .main-panel {
    position: relative;
    z-index: 1;

    .date {
      height: 52px;
      margin-top: 423px;
      text-align: center;
      font-size: 24px;
      line-height: 52px;
      color: #fff;
      white-space: nowrap;
      background: url("../../../../assets/active/newYear2023/date_bg.png") no-repeat center top;
    }

    .music-btn {
      width: 128px;
      height: 129px;
      position: absolute;
      top: 280px;
      right: 281px;
      cursor: pointer;
      animation: music-animate 1s ease-out infinite;
      background: url("../../../../assets/active/newYear2023/music_bg.png") no-repeat;
      border: 0;
      outline: 0;

      &.paused {
        animation-play-state: paused;
      }

      @keyframes music-animate {
        0% {
          transform: scale(1, 1);
        }
        10% {
          transform: scale(1.1, 1.1);
        }
        15% {
          transform: scale(1, 1);
        }
        25% {
          transform: scale(1.2, 1.2);
        }
        30% {
          transform: scale(1.1, 1.1);
        }
        50% {
          transform: scale(1.2, 1.2);
        }
        100% {
          transform: scale(1, 1);
        }
      }
    }

    .active-tab {
      width: 1080px;
      margin: 333px auto 0;
      display: flex;
      justify-content: space-between;

      li {
        width: 340px;
        height: 88px;
        cursor: pointer;
        transition: background-image 0.2s;
        background-position: center center;

        &.active {
          position: relative;
          z-index: 2;

          &:before {
            position: absolute;
            z-index: 1;
            content: "";
            width: 77px;
            height: 82px;
            left: 131.5px;
            top: -73px;
            background: url("../../../../assets/active/newYear2023/tab_active_rabbit.png");
            animation: active-tab-animate 0.7s forwards;
            pointer-events: none;
          }

          @keyframes active-tab-animate {
            0% {
              transform: translateY(82px);
            }
            40% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(20px);
            }
            70% {
              transform: translateY(0px);
            }
            90% {
              transform: translateY(15px);
            }
            100% {
              transform: translateY(0px);
            }
          }
        }
      }
    }

    .temp {
      li {
        display: inline-block;
        font-size: 14px;
        line-height: 52px;
        margin-right: 70px;
      }
    }

    .marquee-box {
      width: 1080px;
      height: 52px;
      margin: 40px auto 0;
      display: flex;
      background: url("../../../../assets/active/newYear2023/marquee_bg.png") no-repeat;

      .msg-icon {
        display: block;
        width: 80px;
        height: inherit;
      }

      .marquee-warp {
        overflow: hidden;
        width: 987px;
        height: inherit;
        user-select: none;

        ul {
          min-width: 1000px;

          li {
            display: inline-block;
            font-size: 14px;
            line-height: 52px;
            color: #652215;
            margin-right: 70px;
            &.super {
              color: #cf440e;
            }
          }
        }
      }
    }

    .new-year2023-back-home {
      padding-bottom: 33px;

      .new-year2023-btn1 {
        margin: 23px auto 0;
        width: 220px;
        height: 68px;

        span {
          top: 16px;
        }
      }
    }
  }
}
</style>
<style lang="less">
.new-year2023-btn1 {
  display: block;
  border: 0;
  outline: 0;
  cursor: pointer;
  background: url("../../../../assets/active/newYear2023/new_year2023_btn1.png") no-repeat;
  background-size: 100% 100%;
  position: relative;
  transition: filter 0.1s;
  &:hover {
    filter: contrast(150%);
  }
  span {
    position: absolute;
    width: 100%;
    left: 0;
    text-align: center;
  }
  i {
    position: absolute;
    right: -9px;
    top: -13px;
    display: inline-block;
    padding: 0 10px;
    height: 32px;
    box-sizing: border-box;
    border: 2px solid #ffe49d;
    background-image: linear-gradient(to bottom, rgba(211,55,17, 0.7), #d33711);
    border-radius: 16px;
    font-size: 24px;
    line-height: 28px;
    text-align: center;
    color: #fffae2;
  }
}
// 黄白渐变文字
.new-year2023-gradient-color {
  background-image: linear-gradient(to top, #fff, #ffe476), linear-gradient(to bottom, #ffeaab, #ffeaab);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 24px;
}
// 白黄渐变文字
.new-year2023-gradient-color-1 {
  background-image: linear-gradient(to bottom, #fff, #ffe476);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.new-year2023-rules {
  width: 773px;
  margin: 40px auto 0;
  padding-left: 173px;
  padding-right: 138px;
  overflow: hidden;
  li {
    font-size: 14px;
    line-height: 24px;
    color: #994925;
    margin-bottom: 18px;
    position: relative;
    text-shadow: 0px 1px 1px rgba(184, 54, 18, 0.35);
    &::before {
      position: absolute;
      left: -31px;
      top: 0;
      content: "";
      width: 28px;
      height: 28px;
      background: url("../../../../assets/active/newYear2023/radish.png") no-repeat;
      background-size: 100% 100%;
    }
  }
}

.new-year2023-liushui {
  border-color: #c44732;
  .ptgame_more_rule {
    tr {
      th {
        color: #c44732;
      }
    }
  }
  &[x-placement^=bottom] {
    .popper__arrow {
      border-bottom-color: #c44732;
    }
  }
  &[x-placement^="top"] {
    .popper__arrow {
      border-top-color: #c44732;
    }
  }
}

// empty data
.new-year2023-empty {
  width: inherit;
  height: inherit;
  display: flex;
  align-items: center;
  p {
    width: inherit;
    text-align: center;
    position: relative;
    font-size: 16px;
    color: #a23f28;
    &::before {
      position: absolute;
      content: "";
      top: -55px;
      left: 0;
      width: 100%;
      height: 44px;
      background: url("../../../../assets/active/newYear2023/empty_icon.png") no-repeat center top;
    }
  }
}
</style>
