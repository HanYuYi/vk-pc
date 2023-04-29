<template>
  <div class="europeanCup2021">
    <div class="europeanCup-top">
      <europeanCup2021BannerMatch />
    </div>
    <div class="europeanCup-bottom">
      <!-- 活动导航-->
      <ul class="bar-box">
        <li v-for="num in 3" :key="num" :class="[`bar-${num}`, {'active': num === activeIndex}]" @click="activeIndex = num"></li>
      </ul>
      <div class="content">
        <transition name="active-side">
          <europeanCup2021ActiveOne v-if="activeIndex === 1" @handleactive1Tip="dialogMethod" @sendPlatformList="assignPlatformList" />
        </transition>
        <transition name="active-side">
          <europeanCup2021ActiveTwo v-if="activeIndex === 2" @handleactive2Tip="dialogMethod" :platformList="walletList" />
        </transition>
        <transition name="active-side">
          <europeanCup2021ActiveThree v-if="activeIndex === 3" @handleactive3Tip="dialogMethod" :platformList="walletList"/>
        </transition>

        <!-- 回到首页-->
        <div class="to-home" :class="{'enter': hoverParent}">
          <div class="router-box" @mouseenter="hoverParent = 1" @mouseleave="hoverParent = 0">
            <router-link to="/active"></router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- 通用错误提示-->
    <el-dialog
      :visible.sync="dialogVisible"
      custom-class="dialog-panel"
      width="623px"
      :close-on-click-modal="false">
      <div class="dialog-main">
        <h1>友情提示</h1>
        <p>{{ dialogContent }}</p>
        <button @click="dialogVisible = false">知道了</button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import europeanCup2021BannerMatch from './europeanCup2021BannerMatch'
  import europeanCup2021ActiveOne from './europeanCup2021ActiveOne'
  import europeanCup2021ActiveTwo from './europeanCup2021ActiveTwo'
  import europeanCup2021ActiveThree from './europeanCup2021ActiveThree'

  export default {
    name: 'europeanCup2021',
    components: { europeanCup2021BannerMatch, europeanCup2021ActiveOne, europeanCup2021ActiveTwo, europeanCup2021ActiveThree },
    data() {
      return {
        activeIndex: 1,
        hoverParent: 0,
        dialogVisible: false,
        dialogContent: '',
        walletList: []
      }
    },
    methods: {
      dialogMethod(txt) {
        this.dialogContent = txt
        this.dialogVisible = true
      },
      assignPlatformList(list) {
        this.walletList = list
      }
    }
  }
</script>

<style lang="less" scoped>
  .europeanCup2021 {

    .europeanCup-top {
      background: url("../../../assets/active/europeanCup2021/bg_top.jpg") no-repeat center top;
      overflow: hidden;
    }
    .europeanCup-bottom {
      background: url("../../../assets/active/europeanCup2021/bg_bottom.jpg") no-repeat center top fixed;
      padding-bottom: 1px;

      .bar-box {
        display: flex;
        list-style: none;
        margin-left: 2%;

        li {
          width: calc((100vw + 4%) / 3);
          height: 106px;
          cursor: pointer;
          margin-left: -2%;
        }

        .bar-1 {
          background: url("../../../assets/active/europeanCup2021/bar_1.png") no-repeat;
          background-size: contain;

          &:hover, &.active {
            background: url("../../../assets/active/europeanCup2021/bar_1_hover.png") no-repeat;
            background-size: contain;
          }
        }

        .bar-2 {
          background: url("../../../assets/active/europeanCup2021/bar_2.png") no-repeat;
          background-size: contain;

          &:hover, &.active {
            background: url("../../../assets/active/europeanCup2021/bar_2_hover.png") no-repeat;
            background-size: contain;
          }
        }

        .bar-3 {
          background: url("../../../assets/active/europeanCup2021/bar_3.png") no-repeat;
          background-size: contain;

          &:hover, &.active {
            background: url("../../../assets/active/europeanCup2021/bar_3_hover.png") no-repeat;
            background-size: contain;
          }
        }
      }

      .content {
        width: 1240px;
        margin: 41px auto 0;

        .to-home {
          width: 887px;
          height: 74px;
          background: url("../../../assets/active/europeanCup2021/to_home.png") no-repeat;
          margin: 37px auto;
          transition: all .3s;

          &.enter {
            background: url("../../../assets/active/europeanCup2021/to_home_hover.png") no-repeat;
          }

          .router-box {
            width: 310px;
            height: 74px;
            margin-left: 288.5px;
          }

          .router-link-active {
            display: block;
            width: inherit;
            height: inherit;
          }
        }
      }

      .active-side-enter-active {
        transition: all .5s;
      }

      .active-side-enter {
        transform: translateY(-10px);
        opacity: 0;
      }
    }

    /deep/ .dialog-panel {
      border: 0;
      box-shadow: none;
      height: 320px;
      background: transparent url("../../../assets/active/europeanCup2021/active1_get_amount.png");
      margin-top: calc((100vh - 320px) / 2) !important;

      .el-dialog__header {
        background-color: transparent;

        .el-dialog__headerbtn {
          width: 26px;
          height: 26px;
          top: -30px;
          z-index: 1;

          .el-icon-close {
            width: 19px;
            height: 19px;
            background: url("../../../assets/active/europeanCup2021/dialog_close.png");
            transition: background .3s;
          }

          &:hover {
            .el-icon-close {
              background: url("../../../assets/active/europeanCup2021/dialog_close_hover.png");
            }
          }
        }
      }

      .dialog-main {
        text-align: center;

        h1 {
          width: 100%;
          font-size: 32.5px;
          letter-spacing: 3.25px;
          color: #adedf7;
          position: absolute;
          top: -20px;
          text-align: center;
          font-style: italic;
        }

        p {
          display: flex;
          width: 531px;
          align-items: center;
          font-size: 20px;
          color: #ffffff;
          height: 162px;
          justify-content: center;
          margin: 0 auto;
          overflow: hidden;
        }

        button {
          position: absolute;
          left: calc((623px - 202px) / 2);
          bottom: 30px;
          width: 202px;
          height: 58px;
          outline: 0;
          border: 0;
          border-radius: 29px;
          font-size: 26.5px;
          font-weight: bold;
          letter-spacing: 0.66px;
          color: #29747d;
          background: url("../../../assets/active/europeanCup2021/active_btn.png");
          transition: all .3s;
          cursor: pointer;

          &:hover {
            background: url("../../../assets/active/europeanCup2021/active_btn_hover.png");
          }
        }
      }
    }
  }
</style>
