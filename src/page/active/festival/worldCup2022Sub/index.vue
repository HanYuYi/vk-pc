<template>
  <div v-cloak class="world-cup2022-sub">

    <div class="center-date">
      <h2 class="date"><p v-if="showTime">活动时间 ：{{ showTime }}</p></h2>
    </div>

    <!-- 活动tabs-->
    <div class="tabs" @mouseenter="setInTabsStatus" @mouseleave="hideSquare" @mousemove="moveSquare">
      <ul class="square four-gifts-square" :style="{transform: `translateX(${squareLeft}px)`}">
        <li></li>
        <li class="large"></li>
        <li></li>
      </ul>

      <div v-for="(name, index) in tabsList"
           :key="index"
           class="tab-item"
           :class="{active: tabActiveIndex === index}"
           @click="tabActiveIndex = index">
        <div class="slide-tab">
          <h2>{{ name }}</h2>
          <h2><span class="world-cup2022-sub-gradient-color">{{ name }}</span></h2>
        </div>
      </div>
    </div>


    <div class="components-panel">

      <transition name="page-trans" mode="out-in">
          <!-- 每日精选赛事-->
          <carefullySelected v-if="tabActiveIndex === 0" @backTime="assignmentInitInfo" />

          <!-- 专享包赔3888-->
          <compensation v-if="tabActiveIndex === 1" />

          <!-- 专享救援金88888-->
          <rescueMoney v-if="tabActiveIndex === 2" />

          <!-- 连赢追红-->
          <alwaysWin v-if="tabActiveIndex === 3" />

      </transition>

    </div>

    <!-- 回到首页-->
    <div class="world-cup2022-back-home">
      <router-link to="/active" />
    </div>

  </div>
</template>

<script>
import carefullySelected from './carefullySelected'
import compensation from './compensation'
import rescueMoney from './rescueMoney'
import alwaysWin from './alwaysWin'
import { mapState } from 'vuex'

export default {
  name: 'worldCup2022Sub',
  components: { carefullySelected, compensation, rescueMoney, alwaysWin },
  data() {
    return {
      showTime: '',

      mouseInTabs: false,
      tabsOffsetLeft: 0,
      moveElOffWidth: 0,
      squareLeft: 0,
      tabActiveIndex: 0,
      tabsList: [
        "每日精选赛事",
        "专享包赔3888",
        "专享救援金88888",
        "连赢追红"
      ]

    }
  },
  computed: {
    ...mapState(["isLogin"])
  },
  methods: {
    assignmentInitInfo(time) {
      this.showTime = time
    },

    // 计算偏移位置
    setInTabsStatus(e) {
      this.mouseInTabs = true
      document.getElementsByClassName("four-gifts-square")[0].style.opacity = 1
      this.tabsOffsetLeft = e.target.offsetLeft
      this.moveElOffWidth = document.getElementsByClassName("four-gifts-square")[0].offsetWidth / 2
    },

    // 隐藏tabs顶部Square
    hideSquare() {
      document.getElementsByClassName("four-gifts-square")[0].style.opacity = 0
      this.mouseInTabs = false
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
  }
}
</script>

<style lang="less">
//////////////////公共样式////////////////////
//白黄渐变文字
.world-cup2022-sub-gradient-color {
  background-image: linear-gradient(to top, #fff7a5, #fff), linear-gradient(to bottom, #fff7a5, #fff7a5);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
//swiper按钮
.world-cup2022-sub-swiper-btn {
  width: 68px;
  height: 68px;
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  background-color: #f34064;
  display: block;
  &:after {
    position: absolute;
    top: 19px;
    content: "";
    width: 17px;
    height: 29px;
    background: url("../../../../assets/active/worldCup2022Sub/slide_btn_icon.png") no-repeat;
  }
  &.swiper-button-prev {
    &:after {
     left: 24px;
    }
  }
  &.swiper-button-next {
    perspective: 3000px;
    &:after {
      right: 23px;
      transform: rotateY(180deg);
    }
  }
  &.swiper-button-disabled {
    opacity: 1;
    background-color: #944454;
    &:after {
      opacity: 0.3;
    }
  }
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
  &.disabled {
    opacity: 0.5;
    cursor: no-drop;
    &:hover {
      background: url("../../../../assets/active/worldCup2022/my_guess.png") no-repeat;
    }
  }
}

// dialog
.world-cup202-sub-dialog {
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
.world-cup2022-sub-loading {
  display: block;
  width: 100%;
  height: inherit;
  background: url("../../../../assets/btn-loader.gif") no-repeat center;
  background-size: 64px 64px;
}
</style>
<style lang="less" scoped>
.world-cup2022-sub {
  border-top: 0.1px solid transparent;
  background-image:
      url("../../../../assets/active/worldCup2022Sub/banner.jpg"),
      url("../../../../assets/active/worldCup2022/bg_bottom.jpg"),
      url("../../../../assets/active/worldCup2022/repeat_bg.jpg");
  background-repeat: no-repeat, no-repeat, no-repeat repeat;
  background-position: center top, center bottom;
  background-size: auto, auto, 1920px;

  .center-date {
    width: 1240px;
    margin: 545px auto 0;
    .date {
      width: 603px;
      height: 64px;
      margin-left: 586px;
      font-size: 19.5px;
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
  }

  .tabs {
    margin: 125px auto 0;
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
          line-height: 90px;
          font-size: 25.5px;
          font-weight: bold;
          color: #fff;
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
          transform: translateY(-90px);
        }
      }
      &.active {
        box-shadow: 0 3px 51px 0 rgba(17, 10, 10, 0.41), inset 0 1px 0 0 #f34064;
        background-image: linear-gradient(to bottom, #A22440, #6e1d33);
        .slide-tab {
          transform: translateY(-90px);
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
            bottom: 0px;
            left: 0;
            width: 143px;
            height: 89px;
            background: url("../../../../assets/active/worldCup2022/tab_before.png") no-repeat;
          }
          &:after {
            bottom: 0px;
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

  .components-panel {
    .page-trans-enter-active, .page-trans-leave-active {
      transition: opacity 0.1s ease-out, transform 0.2s ease-out;
    }
    .page-trans-enter, .page-trans-leave-to {
      transform: scale(0.99, 0.99);
      opacity: 0;
    }
    /deep/ .table-com {
      width: 1240px;
      margin: 54px auto 0;
      text-align: center;
      .table-com-title {
        h3 {
          height: 31px;
          background: url("../../../../assets/active/worldCup2022Sub/active_title.png") no-repeat center top;
        }
        .desc {
          margin-top: 16px;
          font-size: 14px;
          line-height: 19px;
          color: #fff;
          span {
            color: #fff7a6;
          }
        }
      }
      .table-com-content {
        margin: 27px auto 0;
        border-style: solid;
        border-width: 1px;
        border-image-source: linear-gradient(to top, #bc9d7f, #bd9f82, #eadfd4, #ffe7cb);
        border-image-slice: 1;
        background-color: #872139;
        table {
          margin: 8px;
          font-size: 14px;
          line-height: 40px;
          thead {
            tr {
              th {
                color: #591328;
                border: solid 1px #c2546e;
                background-image: linear-gradient(#fff, #ffe9c7);
              }
            }
          }
          tbody {
            tr {
              td {
                color: #fff;
                background-color: #9a2742;
                border: solid 1px #c2546e;
              }
              &:nth-child(even) {
                td {
                  background-color: #872139;
                }
              }
            }
          }
        }
      }
    }

    /deep/ .rules {
      text-align: center;
      dt {
        padding-bottom: 30px;
        height: 31px;
        background: url("../../../../assets/active/worldCup2022/get_votes_rule_title.png") no-repeat center top;
      }
      dd {
        width: 1240px;
        margin: 0 auto;
        background-image: linear-gradient(90deg, transparent 5%, #7d1f37 50%, transparent 100%);
        position: relative;
        border-top: 0.1px solid transparent;
        &:before, &:after {
          position: absolute;
          left: 0;
          top: 0;
          content: "";
          width: 100%;
          height: 1px;
          background-image: linear-gradient(90deg, transparent 5%, rgba(255,237,209, 0.5) 50%, transparent 100%);
        }
        &:after {
          top: auto;
          bottom: 0;
        }
        ul {
          border-top: 0.1px solid transparent;
          margin: 15px 160px 0 185px;
          padding-bottom: 28px;
          li {
            margin-top: 12px;
            font-size: 14px;
            line-height: 25px;
            text-align: left;
            color: #fff;
            list-style: decimal;
            display: flex;
            i {
              margin-top: 2px;
              display: inline-block;
              width: 22px;
              height: 21px;
              background: url("../../../../assets/active/worldCup2022/rule_num_icon.png") no-repeat;
              text-align: center;
              line-height: 21px;
            }
            p {
              margin-left: 6px;
              flex: 1;
            }
          }
        }
      }
    }
  }

  .world-cup2022-back-home {
    padding-bottom: 14px;
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
