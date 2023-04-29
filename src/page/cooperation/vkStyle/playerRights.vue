<template>
  <div class="player-rights">

    <div class="player-main" :class="{'load-finish':pageIndex === 6}">


      <div class="swiper-box">
        <h5>{{ playerRightsList[accuracySwiperIndex - 1].title }}</h5>

        <swiper v-if="reRender" class="player-swiper" :options="mySwiperOptions">
          <swiper-slide v-for="(item, index) in playerRightsList" :key="index" :style="{backgroundImage: `url(${item.banner})`}" />
        </swiper>
      </div>

      <ul class="pagination-box">
        <li v-for="(item, index) in playerRightsList"
            :key="index"
            @click="slideChange( index + 1)"
            :class="{active: (accuracySwiperIndex - 1)  === index}"
            :style="{left: `${item.titlePos[0]}rem`, top: `${item.titlePos[1]}rem`}">
          {{ item.title }}
        </li>
      </ul>

    </div>

  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

const swiperEl = document.getElementsByClassName("player-swiper")

export default {
  name: 'playerRights',
  props: ["pageIndex"],
  components: { Swiper, SwiperSlide },
  data() {
    return {
      swiperIndex: 0,
      mySwiperOptions: {
        loop: true,
        grabCursor : true,
        pagination: { el: '.player-swiper-pagination', clickable: true },
        on: {
          slideChange: () => {
            this.swiperIndex = swiperEl[0].swiper.activeIndex
          }
        }
      },
      playerRightsList: [
        { title: "威客公主 空降伴游", banner: require("../../../assets/vkStyle/player_rights_1.jpg"), titlePos: [0.142, 0.391] },
        { title: "私人订制 海岛畅游", banner: require("../../../assets/vkStyle/player_rights_2.jpg"), titlePos: [-0.102, 0.929] },
        { title: "节日礼品 惊喜不断", banner: require("../../../assets/vkStyle/player_rights_3.jpg"), titlePos: [-0.102, 1.472] },
        { title: "精美礼品 随心换购", banner: require("../../../assets/vkStyle/player_rights_4.jpg"), titlePos: [0.142, 2.01] }
      ],
      reRender: true,
      reRenderTimer: null
    }
  },
  computed: {
    // loop 模式下需要计算 swiper 的 index
    accuracySwiperIndex() {
      if (this.swiperIndex > this.playerRightsList.length) {
        return 1
      }
      if (this.swiperIndex === 0) {
        return this.playerRightsList.length
      }
      return this.swiperIndex
    }
  },
  mounted () {
    window.addEventListener("resize", () => {
      clearTimeout(this.reRenderTimer)
      this.reRender = false
      this.reRenderTimer = setTimeout(() => {
        this.reRender = true
        clearTimeout(this.reRenderTimer)
      }, 100)
    })
  },
  methods: {
    slideChange(index) {
      swiperEl[0].swiper.slideTo(index)
    }
  }
}
</script>

<style lang="less" scoped>
.player-rights {
  width: 100%;
  height: 100%;
  background: url("../../../assets/vkStyle/player_rights_bg.jpg") no-repeat;
  background-position: center center;
  display: flex;
  flex-direction: row-reverse;
  .player-main {
    display: flex;
    justify-content: space-between;
    width: inherit;
    margin-top: calc(245px + 0.088rem);
    position: relative;
    .swiper-box {
      width: 4.439rem;
      height: 2.606rem;
      position: relative;
      transform: translateX(300px);
      opacity: 0;
      margin: 0 auto;
      h5 {
        font-family: YouSheBiaoTiHei;
        font-size: 0.106rem;
        font-weight: normal;
        line-height: 0.08rem;
        text-align: center;
        color: #ffffff;
      }
      &:before, &:after {
        position: absolute;
        z-index: 2;
        top: 0.186rem;
        content: "";
        width: 3px;
        height: 2.419rem;
        background: url("../../../assets/vkStyle/player_rights_be.png") no-repeat;
        background-size: 100% 100%;
        transition: opacity 0.3s;
      }
      &:before {
        left: 0;
      }
      &:after {
        right: 0;
      }
      .player-swiper {
        margin-top: 0.106rem;
        width: 4.315rem;
        height: 2.419rem;
        .swiper-slide {
          background-size: 100% 100%;
        }
      }
    }
    .pagination-box {
      top: -0.133rem;
      right: 0;
      width: 1.579rem;
      height: 2.669rem;
      background: #333;
      background: url("../../../assets/vkStyle/player_rights_pagination_bg.png") no-repeat;
      background-size: 100% 100%;
      position: absolute;
      transform: translateX(-300px);
      opacity: 0;
      li {
        position: absolute;
        width: 2.02rem;
        height: 0.267rem;
        background-image: url("../../../assets/vkStyle/pagination_li.png");
        background-size: auto 100%;
        font-size: 0.088rem;
        line-height: 0.26rem;
        text-align: center;
        color: #b6b6b6;
        cursor: pointer;
        transition: color 0.3s;
        &.active {
          color: #ffffff;
          background-image: url("../../../assets/vkStyle/pagination_li_hover.png");
          transition: background-image 0.2s;
        }
        &:hover {
          color: #ffffff;
        }
      }
    }
    &.load-finish {
      .swiper-box {
        transform: translateX(0px);
        opacity: 1;
        transition: opacity 0.5s, transform 0.5s;
      }
      .pagination-box {
        transform: translateX(0px);
        opacity: 1;
        transition: opacity 0.5s, transform 0.5s;
      }
    }
  }
}
</style>
