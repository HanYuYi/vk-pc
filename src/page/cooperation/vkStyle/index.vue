<template>
  <div class="vk-style">

    <!-- 全屏滚动-->
    <swiper class="full-screen-swiper" :options="mySwiperOptions">
      <swiper-slide v-for="(arr, index) in fullScreenMenuList" :key="index">
        <sponsor v-if="index === 0" :pageIndex.sync="pageIndex"/>
        <brand-introduction v-if="index === 1" :pageIndex.sync="pageIndex"/>
        <brand-history v-if="index === 2" :pageIndex.sync="pageIndex"/>
        <wonderful-moments v-if="index === 3" :pageIndex.sync="pageIndex"/>
        <activity-site v-if="index === 4" :pageIndex.sync="pageIndex"/>
        <data-score v-if="index === 5" :pageIndex.sync="pageIndex"/>
        <player-rights v-if="index === 6" :pageIndex.sync="pageIndex"/>
        <activities v-if="index === 7" :pageIndex.sync="pageIndex"/>
      </swiper-slide>
    </swiper>

    <!-- 全屏滚动导航菜单-->
    <ul class="full-screen-pagination">
      <li v-for="(arr, index) in fullScreenMenuList"
          :key="index"
          :class="{active: pageIndex === index}"
          @click="toSlideScreen(index)">
        {{ arr[0] }}
        <span class="eng-title">
          <i class="prev"></i>{{ arr[1] }}<i class="next"></i>
        </span>
      </li>
    </ul>

    <!-- 页头-->
    <div class="page-header">
      <div class="left"><hr><i></i><span class="just"></span></div>
      <div class="center">
        <h1>{{ fullScreenMenuList[pageIndex][0] }}</h1>
        <p><span>{{ fullScreenMenuList[pageIndex][1] }}</span></p>
        <div class="title-icon"></div>
      </div>
      <div class="right">
        <span class="back"></span><i></i><hr class="page-left">
        <div class="pagination">
          PAGE - <em>{{ pageIndex + 1  < 10 ? `0${pageIndex + 1}` : pageIndex + 1}}&nbsp;</em> / &nbsp;{{ fullScreenMenuList.length < 10 ? `0${fullScreenMenuList.length}` : fullScreenMenuList.length }}
        </div>
        <hr class="page-right">
      </div>
    </div>

    <!-- 页脚-->
    <div class="page-footer">
      <div class="left">
        <i class="tip"></i>
        <hr class="one">
        <hr class="two">
      </div>
      <div class="center"></div>
      <div class="right">
        <hr class="three">
        <span class="con-point"><i></i><i></i></span>
        <hr class="four">
        <i class="footer-icon"></i>
      </div>
    </div>

  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import Sponsor from './sponsor'
import BrandIntroduction from './brandIntroduction'
import BrandHistory from './brandHistory'
import WonderfulMoments from './wonderfulMoments'
import ActivitySite from './activitySite'
import DataScore from './dataScore'
import PlayerRights from './playerRights'
import Activities from './activities'

const swiperEl = document.getElementsByClassName("full-screen-swiper")

export default {
  name: 'vkStyle',
  components: { Swiper, SwiperSlide,
    Sponsor, BrandIntroduction, BrandHistory, WonderfulMoments, ActivitySite, DataScore, PlayerRights, Activities },
  data() {
    return {
      pageIndex: 0,
      fullScreenMenuList: [
        ['独家赞助', 'OFFICIAL SPONSOR'],
        ['品牌介绍', 'ABOUT US'],
        ['品牌历程', 'MILESTONE'],
        ['精彩时刻', 'MOMENTS'],
        ['活动现场', 'EVENTS'],
        ['数据成就', 'ACHIEVEMENT'],
        ['玩家权益', 'MEMBERSHIP'],
        ['优惠活动', 'PROMOTIONS']
      ],
      mySwiperOptions: {
        slidesPerView: 1,
        direction: 'vertical',
        initialSlide: 0,
        resistanceRatio: 0,
        mousewheel: true,
        followFinger: false,
        simulateTouch: false,//禁止鼠标模拟
        effect: "slide",
        speed: 1000,
        on: {
          slideChangeTransitionEnd: () => {
            this.pageIndex = swiperEl[0].swiper.activeIndex
          }
        }
      }
    }
  },
  // 初始化全屏swiper之前，需要将swiper的所有父级设为全屏
  beforeRouteEnter(to, from, next) {
    document.querySelector("#app").setAttribute("style", "height:100%")
    next()
  },
  beforeRouteLeave(to, from, next) {
    document.querySelector("#app").removeAttribute("style")
    next()
  },
  methods: {
    // 点击控制全屏滚动
    toSlideScreen(index) {
      swiperEl[0].swiper.slideTo(index)
    }
  }
}
</script>

<style lang="less" scoped>
.vk-style {
  position: relative;
  height: 100%;
  header {
    position: absolute;
    z-index: 5;
    top: 0;
    left: 0;
    width: 100%;
    height: 80px;
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.3), #17191e);
    box-sizing: border-box;
    border-bottom: 1px solid rgba(125,131,157,0.3);
    .wrapper {
      display: flex;
      justify-content: space-between;
      .vk-style-logo {
        display: block;
        width: 232px;
        height: 80px;
        background: url("../../../assets/web-icons.png") no-repeat;
        background-position: -18px 22px;
      }
      .menu {
        display: flex;
        a {
          display: block;
          height: 80px;
          font-size: 14px;
          line-height: 80px;
          color: #fff;
          margin-left: 35px;
          span {
            margin-right: 8px;
            display: inline-block;
            height: inherit;
            vertical-align: middle;
            background: url("../../../assets/vkStyle/icon.png") no-repeat;
          }
          &.button_plain_2022 {
            width: 126px;
            height: 34px;
            line-height: 30px;
            margin-top: 23px;
          }
        }
      }
    }
  }

  .full-screen-swiper {
    width: 100%;
    height: 100%;
    min-width: 1240px;
    margin: 0 auto;
    // TODO
    z-index: 2;
    .swiper-slide {
      text-align: center;
      font-size: 18px;
      background: #000000;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .full-screen-pagination {
    position: fixed;
    z-index: 4;
    height: 2.339rem;
    top: calc((100% - 2.339rem) / 2);
    left: 25px;
    border-left: 2px solid #606060;
    display: flex;
    flex-direction: column;
    justify-content: center;
    li {
      padding-left: 11px;
      color: #b6b6b6;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 0.35px;
      margin-top: 0.186rem;
      margin-left: -2.8px;
      cursor: pointer;
      border-left: 4px solid transparent;
      transition: color 0.3s;
      &:hover {
        color: #ffffff;
      }
      &:first-child {
        margin-top: 0;
      }
      &.active {
        color: #ffffff;
        font-size: 20px;
        border-color: #07f1b7;
        .eng-title {

          display: block;
        }
      }
      .eng-title {
        display: none;
        position: absolute;
        white-space: nowrap;
        color: #ffffff;
        font-size: 12px;
        letter-spacing: 0.3px;
        i {
          display: inline-block;
          width: 20px;
          height: 1px;
          vertical-align: middle;
          background-color: #07f1b7;
          &.prev {
            margin-right: 4px;
          }
          &.next {
            margin-left: 4px;
          }
        }
      }
    }
  }

  .page-header {
    position: absolute;
    z-index: 2;
    top: 123px;
    left: 33px;
    width: calc(100% - 33px * 2);
    display: flex;
    justify-content: space-between;
    .left, .right {
      flex: 1;
      line-height: 72px;
      hr {
        display: inline-block;
        width: calc(100% - 29px);
        height: 1px;
        opacity: 0.5;
        border: 0;
        background-color: #fff;
      }
      i {
        display: inline-block;
        width: 3px;
        height: 3px;
        margin-top: 1px;
        background-color: #fff;
      }
      span {
        color: #ffffff;
        font-size: 28px;
        opacity: 0.5;
      }
    }
    .left {
      i {
        margin-left: 8px;
      }
      .just {
        display: inline-block;
        vertical-align: middle;
        width: 16px;
        height: 28px;
        background: url("../../../assets/vkStyle/icon.png") no-repeat;
        background-position: -690px -334px;
      }
    }
    .center {
      margin: 0 36px;
      h1 {
        font-size: 100px;
        line-height: 72px;
        letter-spacing: 2.5px;
        color: #ffffff;
        font-family: YouSheBiaoTiHei;
        font-weight: normal;
      }
      p {
        margin: 11px auto 0;
        font-size: 18px;
        line-height: 18px;
        text-align: center;
        color: #07f1b7;
        font-family: YouSheBiaoTiHei;
        position: relative;
        span {
          display: inline-block;
          width: 203px;
          height: 20px;
          line-height: 16px;
          background: url("../../../assets/vkStyle/icon.png") no-repeat;
          background-position: -690px -300px;
        }
        &:before, &:after {
          position: absolute;
          content: "";
          width: 84px;
          height: 1px;
          top: 9.5px;
          background-color: #07f1b7;
        }
        &:before {
          left: -6px;
        }
        &:after {
          right: -6px;
        }
      }
      .title-icon {
        width: 20px;
        height: 14px;
        margin: 3px auto 0;
        background: url("../../../assets/vkStyle/icon.png") no-repeat;
        background-position: -759px -333px;
      }
    }
    .right {
      .back {
        display: inline-block;
        vertical-align: middle;
        width: 16px;
        height: 28px;
        background: url("../../../assets/vkStyle/icon.png") no-repeat;
        background-position: -728px -334px;
      }
      i {
        margin-right: 8px;
      }
      .page-left {
        width: calc(100% - 276px);
      }
      .pagination {
        display: inline-block;
        width: 195px;
        font-family: YouSheBiaoTiHei;
        font-size: 18px;
        line-height: 8px;
        letter-spacing: 0.45px;
        color: #ffffff;
        margin: 0 15px 0 10px;
        vertical-align: text-bottom;
        em {
          color: #07f1b7;
        }
      }
      .page-right {
        width: 20px;
      }
    }
  }

  .page-footer {
    position: absolute;
    z-index: 2;
    bottom: 30px;
    left: 33px;
    width: calc(100% - 33px * 2);
    display: flex;
    justify-content: space-between;
    pointer-events: none;
    hr {
      display: inline-block;
      height: 1px;
      opacity: 0.5;
      border: 0;
      background-color: #fff;
    }
    .left, .right {
      flex: 1;
      line-height: 50px;
      .tip {
        display: inline-block;
        width: 165px;
        height: 11px;
        background: url("../../../assets/vkStyle/icon.png") no-repeat;
        background-position: -690px -377px;
        margin-right: 35px;
        vertical-align: text-bottom;
      }
      .one {
        width: 160px;
        margin-right: 10px;
      }
      .two {
        width: calc(100% - 165px - 35px - 160px - 20px);
      }
    }
    .center {
      width: 72px;
      height: 56px;
      margin: 0 30px;
      background: url("../../../assets/vkStyle/icon.png") no-repeat;
      background-position: -690px -424px;
    }
    .right {
      position: relative;
      .three {
        width: 190px;
      }
      .con-point {
        display: inline-block;
        width: 40px;
        text-align: center;
        i {
          display: inline-block;
          width: 3px;
          height: 3px;
          background-color: #fff;
          margin: 1px 8.5px 0;
        }
      }
      .four {
        width: calc(100% - 190px - 40px - 210px);
      }
      .footer-icon {
        position: absolute;
        bottom: -30px;
        right: -33px;
        display: inline-block;
        width: 274px;
        height: 190px;
        background: url("../../../assets/vkStyle/icon.png") no-repeat;
        background-position: -930px -351px;
        pointer-events: none;
      }
    }
  }
}
</style>
