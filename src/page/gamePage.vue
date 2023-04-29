<template>
  <div class="game-page">
    <ul class="bar">
      <li v-for="(item, index) in gameData" :key="index"
          data-point-name
          @click="changeTab(item, index)"
          :class="{'active': currentIndx === index}">
        {{ item.title.replace('游戏', '') }}
      </li>
    </ul>
    <dl v-for="(row, index) in gameData" :key="index" class="hall" data-point-content>
      <dt
        class="title"
        :style="{
        'background': `url(${row.title_img})no-repeat center center`,
        'margin-top': index === 0 ? '22px' : '102px'
        }">
        {{ row.title }}
      </dt>
      <dd>
        <ul class="content" v-if="row.game_list && row.game_list.length < 6">
          <li v-for="(item, i) in row.game_list" :key="i"
              :style="{background: `url(${item.img}) no-repeat center top`}">
            <router-link :to="item.url">
              <div
                class="active-panel"
                :style="{background: `url(${item.img_hover}) no-repeat 100% 100%`}">
              </div>

              <button class="play-game"></button>
            </router-link>

            <div class="info">
              <i v-if="hotGameList.includes(item.money_code)" class="hot_tag"></i>
              <i v-if="newGameList.includes(item.money_code)" class="new_tag"></i>
              <h2><hr><h6>{{ item.title }}</h6><hr></h2>
              <p>{{ item.title_sub }}</p>
            </div>

          </li>
        </ul>
        <template v-else>
          <div class="swiper-box" @mouseenter="hover = true" @mouseleave="hover = false">
          <swiper :options="mySwiperOptions" class="swiper gamePage-swiper">
            <swiper-slide v-for="(item, i) in row.game_list" :key="i" :index="i">
              <li
              class="item"
                  :style="{background: `url(${item.img}) no-repeat center top`}">
                <router-link :to="item.url">
                  <div
                    class="active-panel"
                    :style="{background: `url(${item.img_hover}) no-repeat 100% 100%`}">
                  </div>

                  <button class="play-game"></button>
                </router-link>

                <div class="info">
                  <i v-if="hotGameList.includes(item.money_code)" class="hot_tag"></i>
                  <i v-if="newGameList.includes(item.money_code)" class="new_tag"></i>
                  <h2><hr><h6>{{ item.title }}</h6><hr></h2>
                  <p>{{ item.title_sub }}</p>
                </div>

              </li>
            </swiper-slide>
          </swiper>
          </div>
        </template>
      </dd>
    </dl>
  </div>
</template>

<script>
import storage from '../utils/storage'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import { resolve } from 'url'
import {mapMutations, mapState} from 'vuex'
const swiperEl = document.getElementsByClassName('gamePage-swiper')

export default {
  name: 'gamepage',
  components: { Swiper, SwiperSlide },
  data () {
    return {
      hover: false,
      mySwiperOptions: {
        seed: 2000,
        loop: true,
        slidesPerView: 5,
        // allowTouchMove: false,
        autoplay: { delay: 3000, disableOnInteraction: false },
      },
      currentIndx: 0,
      pointNameList: null,
      pointPanelList: null,
      gameData: []
    }
  },
  computed: {
    ...mapState(['hotGameList', 'newGameList', 'gamePageKey'])
  },
  mounted() {
    this.getTopicData()
  },
  watch: {
    hover (bool) {
      if(bool) {
        swiperEl[0].swiper.autoplay.stop()
        swiperEl[0].setAttribute('style', 'overflow:visible')
      } else {
        swiperEl[0].swiper.autoplay.start()
        swiperEl[0].setAttribute('style', 'overflow:hidden')
      }
    },
    gamePageKey (obj, oldObj) {
      if (obj.scroll) {
        const findIndex = this.scrollIndex(obj.key)
        this.scrollToPoint(findIndex)
      }
    },
    currentIndx (num, oldNum) {
      this.changeGamepage({ key: this.gameData[num].metename, scroll: false })
    },
  },
  beforeRouteLeave (to, from ,next) {
    this.changeGamepage({ key: '', scroll: false })
    next()
  },
  methods: {
    ...mapMutations(['updateGamePageKey']),
    // 请求头部游戏导航数据
    async getTopicData() {
      try {
        const response = await this.$http(this.ApiSetting.index.gameTopicList)
        console.info("游戏专题页数据初始化：", response)
        this.gameData = response.data

        await this.$nextTick()
        this.pointNameList = document.querySelectorAll("[data-point-name]")
        this.pointPanelList = document.querySelectorAll("[data-point-content]")
        this.pageScrollFn()

        /*
        ** store默认key为空，拿不到就置为第一个游戏电竞
        ** pageScrollFn监听滚动后会自动高亮左侧导航, scroll为true表示是从header顶部导航过来的
        ** 拿到key说明点击了header进来的，需要滚动到对应的游戏大类
        */
        if (this.gamePageKey.key) {
          const findIndex = this.scrollIndex(this.gamePageKey.key)
          this.scrollToPoint(findIndex)
        } else {
          this.changeGamepage({ key: this.gameData[0].metename, scroll: false })
        }
      } catch (e) {
        throw e
      }
    },

    // 切换左侧导航
    changeTab(item, index) {
      this.changeGamepage({ key: item.metename, scroll: false })
      const findIndex = this.scrollIndex(item.metename)
      this.scrollToPoint(findIndex)
    },
    changeGamepage (row) {
      this.updateGamePageKey(row)
    },
    scrollIndex (key) {
      let index = 0
      let i = 0
      while (i < this.gameData.length)
      {
        if (this.gameData[i].metename === key) {
          index = i
          break
        }
        i++
      }
      return index
    },
    // 滚动到对应游戏
    scrollToPoint (index) {
      const eleContent = this.pointPanelList[index]
      const targetTop = eleContent.offsetTop - 100
      const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
      // 结果大于0,说明目标在下方,小于0,说明目标在上方
      const distance = targetTop - scrollTop
      // 10毫秒滚动一次,计算滚动次数
      const scrollCount = 30
      // 滚动距离除以滚动次数计算每次滚动距离
      const everyDistance = distance / scrollCount
      let timer
      clearTimeout(timer)
      //循环设置scrollBy事件,在duration之内,完成滚动效果
      for (let i = 1; i <= scrollCount; i++) {
        timer = setTimeout(() => {
          window.scrollBy(0, everyDistance)
        }, 10 * i);
      }
    },
    // 页面滚动监听，定位左侧当前游戏位置
    pageScrollFn () {
      window.addEventListener('scroll', () => {
          for (let i = 0; i < this.pointPanelList.length; i++) {
            let elPos = this.pointPanelList[i].getBoundingClientRect()
            if (elPos.top >= 0 && elPos.bottom <= (window.innerHeight || document.documentElement.clientHeight)) {
              this.currentIndx = i
              break
            }
          }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@icon: url('../assets/gamePage/icon.png') no-repeat;
.game-page {
  padding-top: 80px;
  .bar {
    position: fixed;
    z-index: 4;
    top: 40%;
    left: 0;
    li {
      width: 90px;
      height: 40px;
      margin: 4px 0 0 38px;
      cursor: pointer;
      font-size: 14px;
      color: #7c839f;
      text-align: center;
      line-height: 38px;
      &.active {
        font-size: 18px;
        color: #007b5c;
        background: @icon;
        background-position: -12px -200px;
        font-style: oblique;
      }
    }
  }
  dd {
    width: 1340px;
    overflow: hidden;
    margin: auto;
    .swiper-container {
      width: 1240px;
      height: 488px;
    }
  }
  .hall {
    .title {
      width: 100%;
      height: 114px;
      font-size: 36px;
      line-height: 38px;
      color: #ffffff;
      font-family: vkFont;
      text-align: center;
      margin-top: 102px;
      padding-top: 80px;
    }
    .content {
      display: flex;
      justify-content: center;
      margin: 58px auto 127px;
    }
    li {
      position: relative;
      width: 220px;
      height: 438px;
      margin-left: 34px;
      transition: background 0.3s linear;
      &:first-child {
        margin-left: 0;
      }
      &:hover {
        background: none!important;
        a {
          opacity: 1;
          //left: -50px;
          //width: 320px;
          //height: 488px;
          transform: scale(1 ,1);
          .play-game {
            display: block;
            bottom: 6px;
            opacity: 1;
            animation: fade 0.5s;
            &:hover {
              background-position: -11px -102px;
            }
          }
          @keyframes fade {
            0% {opacity: 0}
            60% {opacity: 0}
            100% {opacity: 1}
          }
          & + .info {
            h2 {
              h6 {
                color: #07f1b7;
              }
            }
            p {
              color: #ffffff;
            }
          }
        }
      }
      a {
        display: block;
        position: absolute;
        top: 0;
        left: -50px;
        width: 320px;
        height: 488px;
        transform: scale(0.8 ,0.8);
        transition: all 0.3s linear;
        z-index: 1;
        opacity: 0;
        .active-panel {
          width: inherit;
          height: inherit;
        }
        .play-game {
          display: none;
          position: absolute;
          bottom: -45px;
          left: 65px;
          width: 190px;
          height: 64px;
          outline: 0;
          border: 0;
          background: @icon;
          background-position: -11px -12px;
          cursor: pointer;
          opacity: 0;
        }
      }
      .info {
        pointer-events: none;
        position: absolute;
        width: 133px;
        left: 43.5px;
        bottom: 29px;
        z-index: 2;
        text-align: center;
        .hot_tag, .new_tag {
          display: inline-block;
          width: 44px;
          height: 22px;
          background: @icon;
          background-position: -21px -323px;
        }
        .new_tag {
          background-position: -21px -277px;
        }
        h2 {
          font-size: 18px;
          line-height: 18px;
          margin-top: 7px;
          text-shadow: 0 2px 2px rgba(0, 0, 0, 0.6);
          display: flex;
          justify-content: space-between;
          align-items: center;
          hr {
            flex: 1;
            height: 1px;
            border: 0;
            background: #ffffff;
            opacity: 0.5;
          }
          h6 {
            font-size: 18px;
            color: #fefefe;
            margin: 0 5px;
          }
        }
        p {
          font-size: 16px;
          line-height: 16px;
          margin-top: 14px;
          color: #a9b3d9;
          text-shadow: 0 2px 2px rgba(0, 0, 0, 0.6);
        }
      }
    }
  }
}
</style>
