<template>
  <div v-cloak class="playground">

    <!-- 中奖弹幕-->
    <vue-baberrage
        :isShow="true"
        :barrageList="bulletScreen"
        :throttleGap="5000"
        :boxHeight="600"
        :messageHeight="48"
        :lanesCount="10"
        :loop="false"
        class="playground-baberrage" />

    <h4 class="date" :class="{active: activeShowTime}">
      活动时间：{{ activeShowTime || '加载中' }}
    </h4>

    <!-- 子活动tab-->
    <ul class="active-tab" :class="`active-${activeTabIndex}`">
      <li v-for="num in 2"
          :key="num"
          @click="activeTabIndex = num"></li>
    </ul>

    <h1 class="active-title"></h1>

    <keep-alive>

      <!-- 专属红包-->
      <red-packet-for-playground v-if="activeTabIndex === 1"
                                 ref="redPacketForPlaygroundRef"
                                 :game-venues-list="gameVenuesDataList"
                                 :game-venues-map="gameVenuesTitleMap"
                                 @send-data="getPublicData"
                                 @receive-bonus="openReceiveBonus" />

      <!-- 专属流水送-->
      <bonus-for-playground v-if="activeTabIndex === 2"
                            ref="bonusForPlaygroundRef"
                            :game-venues-list="gameVenuesDataList"
                            :game-venues-map="gameVenuesTitleMap"
                            @receive-bonus="openReceiveBonus" />

    </keep-alive>

    <!-- 回到首页-->
    <div class="back-home">
      <router-link to="/active"></router-link>
    </div>

    <!-- 领取彩金，两个子活动共用-->
    <receive-bonus-for-playground :visible.sync="receiveBonusVisible"
                                  :wallet-list="receiveWalletList"
                                  :leval="redPacketLeval"
                                  :current-active-key="activeTabIndex"
                                  @receive-back="updateChildData" />
  </div>
</template>

<script>
import redPacketForPlayground from "./redPacketForPlayground"
import bonusForPlayground from "./bonusForPlayground"
import receiveBonusForPlayground from "./dialogs/receiveBonusForPlayground"
import Vue from 'vue'
import { vueBaberrage, MESSAGE_TYPE } from 'vue-baberrage'
Vue.use(vueBaberrage)

export default {
  name: "playground",
  components: { redPacketForPlayground, bonusForPlayground, receiveBonusForPlayground },
  data() {
    return {
      activeShowTime: null,
      activeTabIndex: 1,

      // 游戏场馆信息
      gameVenuesDataList: [],
      gameVenuesTitleMap: new Map(),

      // 领取彩金
      receiveWalletList: {},
      redPacketLeval: 0,
      receiveBonusVisible: false,

      bulletScreen: []
    }
  },
  mounted () {
    this.getVenuesListData()
  },
  methods: {
    /**
     * 获取首页活动数据，时间和弹幕
     * @param date
     * @param bulletList
     */
    getPublicData({ date, bulletList } = { bulletList: [] }) {
      this.activeShowTime = date
      bulletList.length && this.addBarrageData(bulletList)
    },

    /**
     * push中奖弹幕
     * @param list
     */
    addBarrageData(list) {
      let added = 0, bulletTimer
      clearInterval(bulletTimer)
      bulletTimer = setInterval(() => {
        this.bulletScreen = []
        if (list.length && added <= list.length) {
          const pushNum = Number.parseInt(Math.random() * 10)
          for (let i = 0; i < pushNum; i++) {
            if ((i + added) < list.length - 1) {
              this.bulletScreen.push({
                id: i + 1,
                avatar: list[i + added].head_image,
                msg: `恭喜${list[i + added].username}获得彩金${list[i + added].goods_name}元`,
                time: Math.random() * 50 + 5,
                type: MESSAGE_TYPE.NORMAL,
                barrageStyle: 'cus-style',
                extraWidth: 336
              })
            }
          }
          added += pushNum
          if (added >= list.length) {
            clearInterval(bulletTimer)
          }
        }
      }, 1000 * 10)
    },

    /**
     * 获取游戏场馆信息
     * @return {Promise<void>}
     */
    async getVenuesListData () {
      try {
        const response = await this.$http(this.ApiSetting.index.gameTopicList)

        // 将数据处理为场馆所需数据
        response.data.splice(0, 2)
        this.gameVenuesDataList = response.data.map(item => {
          return {
            game_list: item.game_list.filter(game => !game.title.includes("捕鱼") && !game.title.includes("FF链游"))
              .map(game => {
                return {
                  money_code: game.money_code,
                  title: game.title
                }
              }),
            title: item.title.includes("电玩") ? "电子场馆" : item.title.replace("游戏", "场馆")
          }
        })
        this.gameVenuesDataList.forEach(item => {
          this.gameVenuesTitleMap.set(item.title.substring(0, 2),item.game_list.map(game => game.title))
        })
        console.info("(使用的是游戏专题页的接口)场馆信息信息初始化")
        console.info("处理之后的数据：", this.gameVenuesDataList)
      } catch (e) {
        console.info(e)
      }
    },

    /**
     * 更新子组件初始化接口数据
     */
    updateChildData() {
      const childMap = new Map([
        [1, this.$refs.redPacketForPlaygroundRef],
        [2, this.$refs.bonusForPlaygroundRef]
      ])
      childMap.get(this.activeTabIndex).initActiveData()
    },

    /**
     * 开启领取彩金dialog
     * @param walletList
     */
    openReceiveBonus({ walletList, leval } = { leval: 0 }) {
      this.receiveWalletList = walletList
      this.redPacketLeval = leval
      this.receiveBonusVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
.playground {
  border-top: 0.1px solid transparent;
  background: url("../../../../assets/active/playground/bg.jpg") no-repeat center top;

  .playground-baberrage {
    position: absolute!important;
    z-index: 5;
    top: 20px;
    left: 0;
    height: 660px !important;
    margin-top: 80px;
    pointer-events: none;
    /deep/ .baberrage-lane {
      .cus-style {
        .normal {
          border: 1px solid #f2dea8;
          background-color: rgba(0, 0, 0, 0.6);
          font-size: 18px;
          color: #f2dea8;
          box-sizing: border-box;
          padding: 0 60px;
          .baberrage-avatar {
            width: 34px;
            height: 34px;
            margin-top: 6px;
            img {
              width: inherit;
              height: inherit;
            }
          }
          .baberrage-msg {
            line-height: 46px;
            padding-left: 5px;
            font-weight: bold;
          }
        }
      }
    }
  }

  .date {
    width: 750px;
    margin-left: 45%;
    margin-top: 594px;
    font-size: 29px;
    color: #fff;
    white-space: nowrap;
    text-align: center;
    position: relative;

    &.active {
      width: fit-content;
      animation: date-animate 1s;
      &::before, &::after {
        position: absolute;
        top: 2px;
        content: "";
        width: 35px;
        height: 35px;
        background: url("../../../../assets/active/playground/date_modifier.png") no-repeat;
        animation: date-modifier-animate 2s infinite;
        animation-delay: 1s;
      }
      &::before {
        left: -45px;
      }
      &::after {
        right: -45px;
      }
    }
    @keyframes date-animate {
      0% { transform: scaleX(0); }
      100% { transform: scaleX(1); }
    }
    @keyframes date-modifier-animate {
      0% { transform: scale(1, 1); }
      40% { transform: scale(1.8, 1.8); }
      100% { transform: scale(1, 1); }
    }
  }

  .active-tab {
    margin: 127px auto 0;
    max-width: 1920px;
    min-width: 1240px;
    height: 240px;
    overflow: hidden;
    display: flex;
    transition: background 0.6s;
    li {
      margin-top: 20px;
      cursor: pointer;
      width: 50%;
      height: 110px;
    }
    &.active-1 {
      background: url("../../../../assets/active/playground/tab_bar_1.png") no-repeat center top;
    }
    &.active-2 {
      background: url("../../../../assets/active/playground/tab_bar_2.png") no-repeat center top;
    }
  }

  .active-title {
    margin-top: -33px;
    height: 101px;
    background: url("../../../../assets/active/playground/active_title.png") no-repeat center top;
  }

  /deep/ .active-content {
    margin-top: 25px;
    font-weight: normal;
    font-size: 14px;
    text-align: center;
    color: #c8bdbd;
  }

  /deep/ .rules {
    width: 1034px;
    dt {
      height: 101px;
      background: url("../../../../assets/active/playground/rule_title.png") no-repeat center top;
    }
    dd {
      margin-top: 29px;
      ul {
        width: 813px;
        margin-left: 134px;
        overflow: hidden;
        li {
          margin-top: 18px;
          display: flex;
          &:first-child {
            margin-top: 44px;
          }
          i {
            margin-top: 2px;
            display: inline-block;
            width: 22px;
            height: 22px;
            background: transparent url("../../../../assets/active/christmas2022/rule_num_icon.png") no-repeat;
            text-align: center;
            line-height: 22px;
            font-size: 12px;
            color: #fff;
          }
          p {
            flex: 1;
            margin-left: 11px;
            font-size: 14px;
            line-height: 24px;
            letter-spacing: normal;
            color: #c8bdbd;
          }
        }
      }
    }
  }

  .back-home {
    padding: 42px 0 33px;
    text-align: center;
    a {
      display: inline-block;
      width: 286px;
      height: 105px;
      background: url("../../../../assets/active/playground/back_home.png") no-repeat -11px top;
      transition: filter 0.1s;
      &:hover {
        filter: saturate(130%);
      }
    }
  }
}
</style>
<style lang="less">
.playground-liushui {
  border-color: #8e2324;
  .ptgame_more_rule {
    tr {
      th {
        color: #8e2324;
      }
    }
  }
  &[x-placement^=bottom] {
    .popper__arrow {
      border-bottom-color: #8e2324;
    }
  }
  &[x-placement^="top"] {
    .popper__arrow {
      border-top-color: #8e2324;
    }
  }
}
</style>
