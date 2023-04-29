<template>
  <div class="lols12-page">
    <div class="kv-video-ct">
      <video muted autoplay loop preload="auto" class="kv-bg-video">
        <source src="~@/assets/active/lols12/iYGQagazV4.mp4" type="video/mp4">
      </video>
    </div>
    <div class="slogan" ref="slogan">
      <img src="~@/assets/active/lols12/slogan-new.png" alt="">
    </div>
    <div class="award-pool" ref="awardpool">
      <img src="~@/assets/active/lols12/sub/top-title.png" alt="">
    </div>
    <div class="game-time" ref="gametime" :data-text="getCardsInitData.active_show_time">{{
    getCardsInitData.active_show_time
    }}</div>
    <div class="nav-wrapper">
      <div @click="changeNav(i)" :class="{ 'nav-active': activeNav == i }" class="nav" v-for="(item, i) in navMenu"
        :key="i">
        <div class="nav-label">{{item.label}}</div>
      </div>
    </div>
    <!-- 集卡换好礼 -->
    <collect-cards @refresh-card-num="refreshCardNum" :box-data="boxData" :draw-card-num="getCardsInitData.play_num"
      :teamsTabs="teamsTabs" v-show="activeNav == 0" />
    <!-- S12专享包赔 -->
    <certain-compen v-show="activeNav == 1" />
    <!-- 专享复活金 -->
    <resurrection-gold v-show="activeNav == 2" />
    <!-- 回到首页 -->
    <div class="back-btn" @click="$router.push('/active')">回到活动首页</div>
  </div>
</template>

<script>
import CollectCards from './CollectCards.vue'
import ResurrectionGold from './ResurrectionGold.vue'
import CertainCompen from './CertainCompen.vue'
export default {
  name: 'lols12sub',
  components: {
    CollectCards,
    CertainCompen,
    ResurrectionGold
  },
  data() {
    return {
      activeNav: 0,
      navMenu: [
        { key: 'jkh', label: '集卡换好礼' },
        { key: 'zxp', label: 'S12专享包赔' },
        { key: 'fhj', label: '专享复活金' }
      ],
      getCardsInitData: {
        active_name: '2022全球总决赛 不破/不立',
        active_show_time: '2022年 08月01日00:00:00-11月16日23:59:59',
        play_num: 0, // 抽卡次数
      },
      teamsTabs: [], // position_id  1:ADC,2:中单,3:上单,4:打野,5:辅助
      boxData: [
        {
          id: 'sliver',
          name: '白银宝箱',
          desc: '评分:700-799分',
          boximg: require('../../../../assets/active/lols12/sub/sliver-box.png')
        },
        {
          id: 'gold',
          name: '黄金宝箱',
          desc: '评分:800-999分',
          boximg: require('../../../../assets/active/lols12/sub/gold-box.png')
        },
        {
          id: 'wgold',
          name: '铂金宝箱',
          desc: '评分:1,000-1,399分',
          boximg: require('../../../../assets/active/lols12/sub/wgold-box.png')
        },
        {
          id: 'diamond',
          name: '钻石宝箱',
          desc: '评分:1,400分以上',
          boximg: require('../../../../assets/active/lols12/sub/diamond-box.png')
        },
      ]
    }
  },
  created() {
    this.init()
  },
  mounted() {
    // 页面动画
    var tl = new TimelineLite();
    tl.from(this.$refs.slogan, 0.5, {
      scale: 0,
      autoAlpha: 0
    })

    tl.from(this.$refs.awardpool, 0.5, {
      scale: 0,
      autoAlpha: 0
    });

    tl.from(this.$refs.gametime, 0.5, {
      scale: 0,
      autoAlpha: 0
    }, "-=0.5")

  },
  computed: {
    pooltext() {
      // switch (this.activeNav) {
      //   case 0:
      //     return '集卡赢现金 更有精美手办、黑鲨游戏手机在等您'
      //   case 1:
      //     return 'S12专享包赔金 最高奖励'
      //   case 2:
      //     return 'S12专享救援金 最高领取'
      //   default:
      //     break
      // }
      return 'S12电竞大狂欢 好礼三重奏'
    }
  },
  methods: {
    init() {
      this.$http(this.ApiSetting.active.lols12.sub.getCardsinit)
        .then(res => {
          console.log('集卡初始化', res)
          if (res.status == 1 && res.data) {
            this.teamsTabs = res.data.team_player
            this.getCardsInitData = res.data
            const giftInfo = res.data.active_setting
            this.boxData = this.boxData.map((box, i) => {
              return { ...box, ...giftInfo[i + 1] }
            })
          }
        })
    },
    changeNav(i) {
      this.activeNav = i
    },
    // 更新抽奖次数
    refreshCardNum(num) {
      this.getCardsInitData.play_num = num
    }
  }
}
</script>


<style lang="less">
.footer {
  position: relative;
}

@keyframes light_rotate {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

.text-left {
  text-align: left;
}

.text-right {
  text-align: right;
}

.box-ani {
  width: 519px;
  height: 519px;
  margin: auto;
  position: relative;
  transform-origin: center;
}

.box-gift-img {
  position: absolute;
  width: 223px;
  height: 200px;
  top: 159.5px;
  left: 148px;
}

.light-box {
  position: absolute;
  width: 519px;
  height: 519px;
  background: url("~@/assets/active/lols12/sub/light.png") no-repeat center;
  background-size: 100% 100%;
  transform: scale3d(0.2, 0.2, 0.2);
  transform-origin: center;
  transition: all 0.4s;

  &.show {
    transform: scale3d(1, 1, 1);
  }

  &.animate {
    transition: none;
    animation: 10s light_rotate linear infinite;
  }
}

.icon-rate {
  transform: rotate(180deg);
}

.list-loading {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.no-data-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 220px;

  .no-data-logo {
    margin-bottom: 12px;
  }
  .no-data-text {
    color: #fff;
    font-size: 24px;
    font-weight: bold;
  }
}

.s12-card-icon {
  width: 16px;
  height: 14px;
  display: inline-block;
  background: url('~@/assets/active/lols12/sub/sprite.png');
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  bottom: 1px;

  &.icon-all {
    background-position: -495px -201px;
  }

  &.icon-sd {
    background-position: -495px -229px;
  }

  &.icon-3 {
    background-position: -495px -229px;
  }

  &.icon-dy {
    background-position: -495px -258px;
  }

  &.icon-4 {
    background-position: -495px -258px;
  }

  &.icon-zd {
    background-position: -494px -285px;
  }

  &.icon-2 {
    background-position: -494px -285px;
  }

  &.icon-adc {
    background-position: -494px -313px;
  }

  &.icon-ts {
    background-position: -589px -207px;
  }

  &.icon-1 {
    background-position: -494px -313px;
  }

  &.icon-fz {
    background-position: -494px -342px;
  }

  &.icon-5 {
    background-position: -494px -342px;
  }
}

.lols12-select-wrapper {
  position: absolute;
  right: 126px;
  top: 0;
  cursor: pointer;
  user-select: none;
  width: 132px;
  height: 28px;
  line-height: 28px;
  border: solid 2px #d6b598;
  background-color: #00040e;
  border-top-left-radius: 12px;
  border-bottom-right-radius: 12px;
  text-align: center;
  color: #d6b598;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;

  .ivu-select-arrow {
    background: url("~@/assets/active/lols12/sprite.png") no-repeat;
    background-position: -900px -150px !important;
    width: 11px !important;
    height: 7px !important;
  }

  .ivu-select-selection {
    width: 132px;
    height: 28px;
    line-height: 28px;
    border-color: transparent;
    border-radius: 0;

    .ivu-select-selected-value {
      font-size: 16px;
      height: 28px;
      line-height: 28px;
    }
  }

  .ivu-select-dropdown {
    border-color: #d6b598 !important;
  }

  .ivu-select-item {
    color: #fff;

    &:hover {
      color: #bf9854;
    }
  }

  .ivu-select-item-selected,
  .ivu-select-item-selected:hover {
    color: #bf9854;
  }

  &.select-wrapper-active,
  &:hover {
    background-image: linear-gradient(to top, #eec494, #d6b598);
    font-weight: bold;
    color: #000;
  }
}

.lols12sub-box-pop {
  height: 235px;
  background-color: #0a0a0c;

  .popper__arrow {
    border-width: 12px;

    &::after {
      border-width: 12px;
    }
  }

  &.el-popper[x-placement^=bottom] {
    .popper__arrow {
      top: -12px;

      &::after {
        margin-left: -12px;
        border-bottom-color: #0a0a0c;
      }
    }
  }

  &.el-popper[x-placement^=top] {
    .popper__arrow {
      bottom: -12px;

      &::after {
        margin-left: -12px;
        border-top-color: #0a0a0c;
      }
    }
  }

  .lols12-box-pop-wrapper {
    padding-top: 20px;
    padding-left: 22px;
    padding-right: 22px;

    .title {
      margin: auto;
      font-size: 18px;
      line-height: 1;
      color: #fff;
      font-weight: bold;
      margin-bottom: 20px;
    }

    .gift-wrapper {
      width: 124px;
      height: 154px;
      box-sizing: border-box;
      padding: 0 2px 2px;
      background-image: linear-gradient(to bottom, #5ea2e6, #1841b6);

      .up {
        width: 100%;
        flex: 1;
      }

      .down {
        color: #fff;
        height: 30px;
        width: 100%;
        line-height: 30px;
        text-align: center;
        background-color: #000;
      }
    }
  }
}

.lols12-intro-el-popper {
  box-sizing: border-box;
  padding: 0 !important;
  border-width: 2px;
  border-color: #d6b598;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.35);

  &.el-popper[x-placement^=bottom] .popper__arrow {
    border-bottom-color: #d6b598;
  }

  &.el-popper[x-placement^=top] .popper__arrow {
    border-top-color: #d6b598;
  }
}

.lols12sub-Dialog {
  user-select: none;
  background: transparent;

  .el-dialog__header {
    display: none;
  }

  .el-dialog__body {
    padding: 0;
  }

  .close {
    cursor: pointer;
    position: absolute;
    bottom: -104px;
    left: 50%;
    transform: translateX(-50%);
    width: 64px;
    height: 64px;
    background: url('~@/assets/active/lols12/new/sprite.png');
    background-position: -597px -473px;

    &:hover {
      background-position: -677px -473px;
    }
  }

  .lols12sub-Dialog-wrapper {
    margin: auto;
    position: relative;
    width: 100%;
    box-sizing: border-box;
    text-align: center;

    .player-cards-dio-wrapper {
      margin: auto;
      width: 914px;
      height: 234px;
      position: relative;

      .player-cards-swiper {
        width: 100%;
        height: 100%;
      }

      .swiper-button-prev-player,
      .swiper-button-next-player {
        cursor: pointer;
        z-index: 10;
        position: absolute;
        top: 50%;
        transform: translate3d(0, -50%, 0);
        display: flex;
        justify-content: center;
        align-items: center;
        width: 44px;
        height: 81px;
        background: url('~@/assets/active/lols12/sub/sprite.png');
        background-position: -331px -381px;

        .swip-btn {
          width: 18px;
          height: 32px;
          background: url('~@/assets/active/lols12/sub/sprite.png');
        }
      }

      .swiper-button-prev-player {
        left: -75px;

        .swip-btn {
          background-position: -393px -383px;
        }

        &:hover {
          .swip-btn {
            background-position: -393px -433px;
          }
        }

        &.swiper-button-disabled {
          cursor: not-allowed;

          .swip-btn {
            background-position: -393px -493px;
          }
        }
      }

      .swiper-button-next-player {
        right: -75px;

        .swip-btn {
          background-position: -452px -383px;
        }

        &:hover {

          .swip-btn {
            background-position: -452px -433px;
          }
        }

        &.swiper-button-disabled {
          cursor: not-allowed;

          .swip-btn {
            background-position: -452px -493px;
          }
        }
      }
    }

    .player-card-empty {
      cursor: pointer;
      width: 150px;
      box-sizing: border-box;
      height: 234px;
      border: dashed 2px #fff;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: bold;
      color: #fff;

      .add-icon {
        width: 28px;
        height: 28px;
        background: url('~@/assets/active/lols12/sub/sprite.png');
        background-position: -537px -200px;
        transition: all .3s;
        will-change: transform;
      }

      .add-text {
        color: #fff;
        font-size: 14px;
        font-weight: bold;
        margin-top: 8px;
      }

      &:hover {
        .add-icon {
          transform: scale(1.1);
        }
      }
    }

    .card-numbers {
      position: absolute;
      bottom: 40px;
      right: 2px;
      width: 80px;
      height: 20px;
      line-height: 20px;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
      white-space: nowrap;
    }

    .up-down {
      cursor: pointer;
      margin-top: 15px;
      font-size: 20px;
      font-weight: bold;
      color: #d6b598;

      .icon {
        margin: auto;
        width: 32px;
        height: 18px;
        background: url('~@/assets/active/lols12/sub/sprite.png');
        background-position: -413px -234px;
        margin-bottom: 3px;
        transition: all .3s;
      }
    }

    .my-mix-wrapper {
      margin: auto;
      margin-top: 15px;
      box-sizing: border-box;
      width: 1166px;
      height: 395px;
      border-style: solid;
      border-width: 2px;
      border-image-source: linear-gradient(to right, #756049, #d6b598, #756049);
      border-image-slice: 1;
      background-color: #0a0a0c;
      padding: 20px 315px
    }

    .add-text {
      opacity: 0;
      cursor: pointer;
      width: 100%;
      text-align: center;
      font-size: 15px;
      font-weight: bold;
      color: #000;
      position: absolute;
      bottom: 20px;
      z-index: 10;
      transform: translate3d(0, -50px, 0);
      transition: opacity 0.35s, transform 0.35s;
    }

    .player-card {
      width: 150px;
      height: 234px;
      box-sizing: border-box;
      padding-top: 23px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100% 100%;
      position: relative;

      &.mybag-card {
        &:hover {
          border-radius: 22px;
          box-shadow: 0px 0px 6px #fff;

          .add-text {
            opacity: 1;
            transform: translate3d(0, 0, 0);
            transition-delay: 0s;
          }

          &::after {
            cursor: pointer;
            content: '';
            display: block;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            border-radius: 16px;
            height: 100%;
            background-image: linear-gradient(to top, #fff, rgba(255, 255, 255, 0.01));
          }
        }
      }

      .close-card {
        cursor: pointer;
        position: absolute;
        right: 10px;
        top: 10px;
        width: 25px;
        height: 25px;
        background: url('~@/assets/active/lols12/sub/sprite.png');
        background-position: -415px -265px;
      }

      .player-desc-wrapper {
        text-align: left;
        padding-left: 6px;
      }

      .team-name {
        font-size: 14px;
        font-weight: bold;
        color: #fff;
        margin-left: 4px;

        &.team-name-JDG,
        &.team-name-GEN,
        &.team-name-TES {
          margin-left: 6px;
        }

        &.team-name-T1 {
          margin-left: 12px;
        }

        &.team-name-G2 {
          margin-left: 10px;
        }
      }

      .team-logo {
        margin-top: 2px;
        margin-left: 4px;
        width: 32px;
        height: 32px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
      }

      .player-score {
        font-size: 36px;
        font-weight: bold;
        color: #fff;
        line-height: 1;
      }

      .player-avatar {
        width: 150px;
        height: 175px;
        background-repeat: no-repeat;
        background-position: right 2px;
        background-size: contain;
        position: absolute;
        bottom: 40px;
        right: 0;
      }

      .player-name {
        font-size: 14px;
        font-weight: bold;
        color: #fff;
        text-align: center;
        width: 100%;
        height: 20px;
        line-height: 20px;
        position: absolute;
        bottom: 20px;
      }

      &.player-card-s {
        background-image: url('~@/assets/active/lols12/sub/card-s.png');

        // .player-avatar {
        //   width: 148px;
        //   right: 2px;
        //   background-position: 20px 27px;
        // }

        .card-numbers {
          background-color: #6760c8;
          // background-image: linear-gradient(to right, #6760c8);

          &::before {
            content: '';
            position: absolute;
            bottom: 0;
            left: -20px;
            width: 0;
            height: 0;
            border: 20px solid transparent;
            border-bottom: 20px solid #6760c8;
            clip-path: polygon(0 40px, 20px 20px, 20px 40px);
          }
        }
      }

      &.player-card-m {
        background-image: url('~@/assets/active/lols12/sub/card-m.png');

        // .player-avatar {
        //   width: 148px;
        //   right: 2px;
        //   background-position: 20px 27px;
        // }

        .card-numbers {
          background-color: #d5992f;
          // background-image: linear-gradient(to right, #d5992f, #e2a84a);

          &::before {
            content: '';
            display: inline-block;
            position: absolute;
            bottom: 0;
            left: -20px;
            width: 0;
            height: 0;
            border: 20px solid transparent;
            border-bottom: 20px solid #d5992f;
            clip-path: polygon(0 40px, 20px 20px, 20px 40px);
          }
        }
      }

      &.player-card-b {
        background-image: url('~@/assets/active/lols12/sub/card-b.png');

        .card-numbers {
          background-color: #132176;

          &::before {
            content: '';
            display: inline-block;
            position: absolute;
            bottom: 0;
            left: -20px;
            width: 0;
            height: 0;
            border: 20px solid transparent;
            border-bottom: 20px solid #132176;
            clip-path: polygon(0 40px, 20px 20px, 20px 40px);
          }
        }
      }

    }

    .btn-block {
      cursor: pointer;
      position: relative;
      width: 160px;
      height: 50px;
      box-sizing: border-box;
      border: solid 2px #524a4b;
      line-height: 46px;
      color: #868686;

      &.btn-block-active {
        border-color: #258dff;
        box-shadow: 0px 10px 7px 0 rgba(0, 0, 0, 0.22);
        font-weight: 600;
        color: #fff;

        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          right: 0;
          width: 30px;
          height: 30px;
          background: url('~@/assets/active/lols12/sub/gou.png') no-repeat center;
          background-size: contain;
        }
      }
    }

    .confirm-btn {
      margin: auto;
      user-select: none;
      cursor: pointer;
      background: url('~@/assets/active/lols12/new/sprite.png');
      background-position: -225px -477px;
      color: #eec494;
      width: 152px;
      height: 50px;
      line-height: 48px;
      text-align: center;
      font-weight: bold;
      font-size: 20px;

      &:hover {
        background: url('~@/assets/active/lols12/new/sprite.png');
        background-position: -225px -536px;
        color: #fff;
      }

      &.not-allow {
        cursor: not-allowed;
        background-position: -387px -536px;
        color: #fff;
      }
    }

    .border {
      position: absolute;
      pointer-events: none;
      width: 100%;
      box-sizing: border-box;
      top: 184px;
      left: 0;
      border: solid 2px #d6b598;
      border-top: none;
      border-bottom: none;
      background-color: #101c34;
      transition: all 0.5s;
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 764px;
      height: 184px;
      background: url('~@/assets/active/lols12/new/dio-border-up.png') no-repeat center top;
      background-size: 100% 100%;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 764px;
      height: 247px;
      background: url('~@/assets/active/lols12/new/dio-border-down.png') no-repeat center bottom;
      background-size: 100% 100%;
    }

    .display {
      position: relative;
      z-index: 1;
      width: 100%;
      height: 100%;
    }

    &.lols12-short-wrapper {
      padding: 42px 40px;

      &::before {
        width: 508px;
        height: 247px;
        background-image: url('~@/assets/active/lols12/sub/dio-border-up.png');
      }

      &::after {
        width: 508px;
        height: 250px;
        background-image: url('~@/assets/active/lols12/sub/dio-border-down.png');
      }

      .border {
        top: 247px;
      }

    }

    &.lols12-long-wrapper {
      height: 450px;
      width: 1246px;
      padding: 22px 40px;
      transition: height .3s;

      &::before {
        width: 1246px;
        height: 227px;
        background-image: url('~@/assets/active/lols12/new/border-up.png');
      }

      &::after {
        width: 1246px;
        height: 323px;
        background-image: url('~@/assets/active/lols12/new/border-down.png');
      }

      .border {
        top: 227px;
        height: 200px;
        transition: height .2s;
      }

      .title {
        margin: auto;
        margin-bottom: 20px;
        width: 140px;
        height: 28px;
        text-align: center;
        font-size: 24px;
        line-height: 1;
        font-weight: bold;
        color: #fff;
      }
    }

    &.lols12-longex-wrapper {
      height: 860px;

      .border {
        height: 310px;
      }

    }

    &.lols12-longex-teamwrapper {
      height: 797px;
    }
  }

  .gz-content {
    margin-top: 35px;
    width: 100%;
    box-sizing: border-box;
    text-align: left;
    font-size: 14px;
    color: #d6b598;
    line-height: 1.71;

    ol {
      padding-left: 12px;
      list-style: decimal;
    }

    li {
      list-style: decimal;
      margin-bottom: 23px;

      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }

  .desc {
    margin-top: 20px;
    color: #d6b598;
    font-weight: bold;
  }

  .getFhj-wrapper {
    height: 411px;
    padding: 42px;

    .confirm-btn {
      margin-top: 20px;
    }

    .table-body {
      padding: 56px 80px;
    }
  }

  .pfxz-wrapper {
    height: 398px;

    .title-pfxz {
      margin: auto;
      width: 280px;
      height: 28px;
      font-size: 24px;
      font-weight: bold;
      color: #fff;
      line-height: 1;
    }

    .confirm-btn {
      margin-top: 35px;
    }
  }

  .congratulation-wrapper {
    height: 583px;
    animation-duration: 0.4s;

    .text-underline {
      text-decoration: underline;
      cursor: pointer;
    }

    .border {
      height: 86px;
    }

    .table {
      width: 424px;

      .table-head {
        justify-content: center;
      }

      .table-body {
        padding: 42px;
      }

      &.table-gift {
        .table-body {
          padding: 24px 42px 42px;
        }

        .desc-top {
          margin: auto;
          margin-bottom: 15px;
          color: #d6b598;
          font-weight: bold;
        }

        .confirm-btn {
          margin-top: 22px;
        }
      }
    }

    .confirm-btn {
      margin-top: 35px;
    }
  }

  .box-record-wrapper {
    .table {
      .table-body {
        padding: 15px 20px 42px 30px;
      }
    }

    .copy-btn {
      text-decoration: underline;
      margin-left: 4px;
      cursor: pointer;
    }

    .record-content {
      height: 270px;
    }

    .record-line {
      width: 100%;
      height: 45px;
      box-sizing: border-box;
      border-bottom: solid 1px rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      text-align: center;
      color: #d6b598;

      div {
        flex: 1;

        &:first-child {
          max-width: 110px;
        }

        &:nth-child(2) {
          max-width: 90px;
        }
      }
    }

    .record-title {
      color: #fff;
    }

    .confirm-btn {
      margin-top: 25px;
    }
  }

  .table {
    width: 680px;
    box-sizing: border-box;

    .table-head {
      text-align: left;
      width: 100%;
      height: 60px;
      line-height: 60px;
      padding: 0 22px;
      box-sizing: border-box;
      border-style: solid;
      border-width: 2px;
      border-image-source: linear-gradient(to right, #756049, #d6b598, #756049);
      border-image-slice: 1;
      background-color: #3b3b3b;
      color: #fff;
      display: flex;
      align-items: center;
      // font-size: 24px;
    }

    .table-body {
      box-sizing: border-box;
      border-style: solid;
      border-width: 2px;
      border-image-source: linear-gradient(to right, #756049, #d6b598, #756049);
      border-image-slice: 1;
      border-top: none;
      background-color: #0a0a0c;
    }
  }

  .table-title {
    display: inline-block;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    color: #fff;
  }

  table {
    box-sizing: border-box;
    text-align: center;

    th {
      border-bottom: #000 1px solid;
      height: 40px;
      color: #fff;
      font-weight: bold;
      font-size: 14px;
    }

    td {
      border-bottom: #000 1px solid;
      height: 40px;
      font-size: 14px;
      font-weight: bold;
      color: #d6b598;
    }
  }
}
</style>
<style lang="less" scoped>
/deep/::-webkit-scrollbar-thumb {
  background-image: linear-gradient(to top, #eec494, #d6b598);
}

/deep/.white {
  color: #fff !important;
}
/deep/.blue {
  color: #529bff !important;
}

/deep/.bold {
  font-weight: bold;
}

.lols12-page {
  min-height: 500px;
  background-image: url('~@/assets/active/lols12/banner.jpg'), url('~@/assets/active/lols12/bg-top.jpg'),
    url('~@/assets/active/lols12/bg-bottom.jpg');
  background-color: #00040e;
  background-repeat: no-repeat, no-repeat, no-repeat;
  background-position: center top, center 1000px, center 2610px;
  padding-top: 884px;
  padding-bottom: 40px;
  position: relative;
  overflow: hidden;

  .kv-video-ct {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 80px;
    left: 0;
    min-width: 1280px;

    .kv-bg-video {
      width: 100%;
      height: 100%;
      display: block;
      margin: auto;
      max-width: 1920px;
      object-fit: cover;
      object-position: center;
    }
  }

  /deep/.block {
    margin: auto;
    position: relative;
    width: 1246px;
    padding: 42px 22px 42px;
    box-sizing: border-box;
    margin-bottom: 40px;
    transition: all 0.5s;

    &.block-fhj {
      height: 492px;
    }

    &.block-zcbp {
      height: 390px;
    }

    &.block-bpnr {
      height: 769px;

      .border {
        height: 219px;
      }
    }

    &.block-bpgz {
      height: 646px;

      .border {
        height: 96px;
      }
    }

    &.block-jkgz {
      height: 598px;

      .border {
        height: 48px;
      }
    }

    &.block-mrjk {
      height: 643px;

      .border {
        height: 96px;
      }
    }

    &.block-wdzd {
      height: 641px;

      .border {
        height: 91px;
      }

      .title-desc {
        margin-bottom: 14px;
      }

      .my-bag-btn {
        margin: auto;
        cursor: pointer;
        width: 136px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: solid 2px #258dff;
        box-sizing: border-box;
        text-align: center;
        color: #fff;
        background-color: #050518;

        .title {
          font-size: 24px;
          line-height: 26px;
          margin: auto;
          font-weight: normal;
        }

        &:hover {
          background-color: #fff;

          .title {
            color: #258dff;
          }
        }
      }

      .ask-icon {
        cursor: pointer;
        width: 19px;
        height: 19px;
        background: url('~@/assets/active/lols12/sub/sprite.png');
        background-position: -359px -1054px;
        display: inline-block;
        vertical-align: middle;
      }

      .team-desc {
        margin-bottom: 0;
      }

      .confirm-btn {
        margin-top: 20px;
      }
    }

    &.block-jmbx {
      height: 391px;
    }

    .border {
      position: absolute;
      pointer-events: none;
      width: 100%;
      box-sizing: border-box;
      top: 227px;
      left: 0;
      border: solid 2px #d6b598;
      border-top: none;
      border-bottom: none;
      background-color: #101c34;
      transition: all 0.5s;
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 1246px;
      height: 227px;
      background: url('~@/assets/active/lols12/new/border-up.png') no-repeat center top;
      background-size: 100% 100%;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 1246px;
      height: 323px;
      background: url('~@/assets/active/lols12/new/border-down.png') no-repeat center bottom;
      background-size: 100% 100%;
    }

    .right-wrapper {
      position: absolute;
      right: 0;
      top: 0;
    }

    .ri-coner-btn {
      cursor: pointer;
      user-select: none;
      width: 132px;
      height: 28px;
      line-height: 28px;
      border: solid 2px #eec494;
      background-color: #00040e;
      border-top-left-radius: 12px;
      border-bottom-right-radius: 12px;
      text-align: center;
      color: #d6b598;
      font-size: 16px;
      display: flex;
      justify-content: center;
      align-items: center;

      &.ri-coner-btn-active,
      &:hover {
        background-image: linear-gradient(to top, #eec494, #d6b598);
        font-weight: bold;
        color: #000;

        .tri {
          transform: rotate(180deg);
          border-top: 5px solid #000;
        }
      }

      &.ri-coner-btn-notallow {
        &:hover {
          cursor: default;
          background-image: none;
          color: #d6b598;
          font-weight: normal;
        }
      }
    }

    .title {
      margin: auto;
      height: 28px;
      margin-bottom: 35px;
      line-height: 1;
      font-size: 28px;
      text-align: center;
      font-weight: bold;
      color: #fff;

      &.title-bpss {

        .num {
          color: #d6b598;
          font-family: roboto;
        }
      }
    }

    .desc {
      text-align: center;
      margin: auto;
      line-height: 1.7;
      color: #d6b598;
      font-size: 14px;
      max-width: 1080px;
      margin-bottom: 35px;
    }

    .confirm-btn {
      margin: auto;
      margin-top: 40px;
      margin-bottom: 20px;
      user-select: none;
      cursor: pointer;
      background: url('~@/assets/active/lols12/new/sprite.png');
      background-position: -225px -477px;
      color: #eec494;
      width: 152px;
      height: 50px;
      line-height: 48px;
      text-align: center;
      font-weight: bold;
      font-size: 20px;

      &:hover {
        background: url('~@/assets/active/lols12/new/sprite.png');
        background-position: -225px -536px;
        color: #fff;
      }

      &.not-allow {
        cursor: not-allowed;
        background-position: -387px -536px;
        color: #fff;
      }
    }

    .display {
      position: relative;
      z-index: 1;
      width: 100%;
      height: 100%;
    }

    .table {
      margin: auto;
      width: 1080px;
      box-sizing: border-box;

      &.table-bpss {
        .table-body {
          height: 238px;
        }
      }

      .table-body {
        box-sizing: border-box;
        border-style: solid;
        border-width: 2px;
        border-image-source: linear-gradient(to right, #756049, #d6b598, #756049);
        border-image-slice: 1;
        background-color: #0a0a0c;
        min-height: 163px;
        position: relative;
      }
    }

    table {
      box-sizing: border-box;
      text-align: center;
      position: relative;
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 40px;
        z-index: 1;
        display: block;
        height: 2px;
        width: 100%;
        background: linear-gradient(to right, #756049, #d6b598, #756049);
      }

      th,
      td {
        height: 40px;
        box-sizing: border-box;
        color: #d6b598;
        font-weight: bold;
        font-size: 14px;
      }

      th {
        background-color: #3b3b3b;;
        color: #fff;
      }

      td {
        border-bottom: #000 1px solid;
        &:nth-child(2n) {
          background-color: rgba(37, 141, 255, 0.05);
        }
      }
    }
  }

  /deep/.gz-content {
    margin-top: 40px;
    width: 100%;
    box-sizing: border-box;
    padding: 0 12px;
    text-align: left;
    font-size: 14px;
    color: #d6b598;
    line-height: 1.71;

    ol {
      padding-left: 12px;
      list-style: decimal;
    }

    li {
      list-style: decimal;
      margin-bottom: 23px;

      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }

  /deep/.up-down {
    cursor: pointer;
    user-select: none;
    margin: auto;
    width: 70px;
    text-align: center;

    .text {
      font-size: 16px;
      color: #d6b598;
    }

    .icon {
      transition: all .3s;
      margin: auto;
      margin-top: 10px;
      width: 32px;
      height: 18px;
      background: url('~@/assets/active/lols12/sprite.png');
      background-position: -595px -367px;
    }

    .icon-rate {
      transform: rotate(180deg);
    }
  }

  .slogan {
    white-space: nowrap;
    position: absolute;
    top: 260px;
    left: 50%;
    transform: translateX(-50%);
    width: 1920px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .game-time {
    white-space: nowrap;
    position: absolute;
    top: 798px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 24px;
    line-height: 1;
    font-weight: bold;
    color: #eec494;
  }

  .award-pool {
    position: absolute;
    top: 572px;
    left: 50%;
    transform: translateX(-50%);
    width: 1920px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .nav-wrapper {
    margin: auto;
    width: 1246px;
    height: 72px;
    background: url('~@/assets/active/lols12/sub/sprite.png');
    background-position: -10px -10px;
    display: flex;
    justify-content: center;
    margin-bottom: 41px;
    position: relative;

    .nav {
      position: relative;
      width: 415.5px;
      height: 100%;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.5s;
      background: url('~@/assets/active/lols12/sub/sprite.png');
      background-position: -1272px 63px;
      cursor: pointer;
      user-select: none;

      &:nth-child(2) {
        margin-left: 1px;
        margin-right: 1px;
      }

      .nav-label {
        font-size: 24px;
        font-weight: bold;
        color: #e1bc96;
      }

      &:hover,
      &.nav-active {
        background: url('~@/assets/active/lols12/sub/sprite.png');
        background-position: -1272px -10px;

        .nav-label {
          color: #000;
        }
      }
    }
  }

  .back-btn {
    user-select: none;
    cursor: pointer;
    position: relative;
    margin: auto;
    width: 240px;
    height: 60px;
    line-height: 60px;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    background: url('~@/assets/active/lols12/new/sprite.png');
    background-position: -137px -599px;
    color: #eec494;

    &:hover {
      background: url('~@/assets/active/lols12/new/sprite.png');
      background-position: -137px -674px;
      color: #fff;
    }
  }
}
</style>