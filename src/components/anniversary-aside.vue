<template>
  <div v-if="sessionShow" class="anniversary_aside">

    <i class="anniversary_aside_close" @click="close"></i>

    <swiper class="aside-swiper" :options="mySwiperOptions">
      <swiper-slide v-for="(item, index) in anniverAside" :key="index">
        <router-link :to="item.url" class="to-details-page" :style="{backgroundImage: `url(${item.img_src})`}">

          <div class="anniversary_aside_time" v-if="typeof item.countdown_time === 'number' && item.is_show_countdown"
            :style="{'backgroundImage':'url('+ item.countdown_src +')'}">
            <div v-if="item.countdown_cn" v-html="filterTimeDown(item)"></div>
            <template v-else>
              <span class="item-down">{{ item.down }}</span>
            </template>
          </div>

        </router-link>
      </swiper-slide>
    </swiper>

    <div class="aside-swiper-pagination"></div>
  </div>

</template>

<script>
import { formatCountTimeByDay } from '../utils/util'
import { mapState } from 'vuex'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  name: "anniversaryAside",
  components: { Swiper, SwiperSlide },
  data() {
    return {
      mySwiperOptions: {
        effect: "cube",
        cubeEffect: {
          slideShadows: false,
          shadow: false
        },
        speed: 1000,
        autoplay: { delay: 3000, pauseOnMouseEnter: true, disableOnInteraction: false },
        allowTouchMove: false,
        autoHeight: true,
        on: {
          // 模拟 hover 执行分页器点击事件
          paginationRender: () => {
            const paginationElList = document.getElementsByClassName("aside-swiper-pagination")
            for (let i = 0; i < paginationElList.length; i++) {
              paginationElList[i].onmouseover = event => {
                event.target.click()
              }
            }
          }
        },
        pagination: { el: ".aside-swiper-pagination", clickable: true }
      },
      sessionShow: false,
      anniverAside: []
    };
  },
  computed: {
    ...mapState(["isLogin", "userInfo"])
  },
  watch: {
    isLogin () {
      this.AnniversaryPopup()
    }
  },
  mounted() {
    const isShow = JSON.parse(sessionStorage.getItem("buoy_flag_show"))
    this.sessionShow = isShow
    if (isShow === null) {
      this.sessionShow = true
    }

    this.AnniversaryPopup()
  },
  methods: {
    // 关闭浮标
    close () {
      this.sessionShow = false
      sessionStorage.setItem("buoy_flag_show", false)
    },
    // 获取浮标数据
    AnniversaryPopup () {
      this.$http(this.ApiSetting.active.getActivePopup, { is_list: 1 })
        .then(res => {
          if (res.status === 1 && res.data && res.data.length) {
            this.anniverAside = this.sessionData(res.data);
            // 倒计时
            for (const item of this.anniverAside) {
              if (item.is_show_countdown && item.countdown_time) {
                this.handlerCountDown(item)
              }
            }
          }
        })
    },
    /**
     * 删除不显示的浮标数据
     * @param list
     * @returns {Array}
     */
    removeHideRow(list) {
      for (let i = 0; i < list.length; i++) {
        if (!list[i].is_show) list.splice(i, 1)
      }
      return list
    },
    /**
     * 针对浮标追加字段
     * @param list
     * @returns {Array}
     */
    sessionData (list) {
      for (const item of this.removeHideRow(list)) {
        // 定时
        if (item.is_show_countdown && item.countdown_time) {
          item.has_hours = item.countdown_time > 60 * 60
          item.countdown_time = item.countdown_time * 1000
          item.downTimer = null
          item.down = ""
        }
        if (item.countdown_time === 0) {
          item.countdown_time = null
        }
      }
      return list
    },
    /**
     * 倒计时执行器
     * @param row
     */
    handlerCountDown (row) {
      clearInterval(row.downTimer)
      row.downTimer = setInterval(() => {
        let timeStamp = row.countdown_time
        row.countdown_time -= 1000
        timeStamp = timeStamp / 1000
        // row.down = row.has_hours ? formatCountTime(timeStamp) : formatCountTime(timeStamp, 2)
        row.down = formatCountTimeByDay(timeStamp)
        if (timeStamp <= 0) {
          clearInterval(row.downTimer)
          this.AnniversaryPopup()
        }
        this.$forceUpdate()
      }, 1000)
    },
    filterTimeDown (row) {
      return row.countdown_cn.replace(/\{0\}/, `<span>${row.down}</span>`)
    }
  }
};
</script>

<style scoped lang="less">
.anniversary_aside {
  position: fixed;
  z-index: 99;
  right: 82px;
  bottom: 50px;

  .anniversary_aside_close {
    position: absolute;
    z-index: 100;
    top: 0;
    right: 0;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: url("../assets/anniversary_aside_close_icon.png");
    cursor: pointer;
    opacity: 0.6;
    transition: opacity 0.3s;
    &:hover {
      opacity: 1;
    }
  }

  .aside-swiper {
    width: 160px;
    height: 170px;
    position: relative;
    /deep/ .swiper-wrapper {
      width: inherit;
      height: inherit;
      .swiper-slide {
        width: inherit;
        height: inherit;
        .to-details-page {
          display: inline-block;
          width: inherit;
          height: inherit;
          background-repeat: no-repeat;
          background-size: 100% auto;
          .anniversary_aside_time {
            width: 130px;
            height: 40px;
            margin: 130px auto 0;
            font-size: 20px;
            color: #ffffff;
            line-height: 40px;
            text-align: center;
            background-size: auto 100%;
            background-position: center;
            background-repeat: no-repeat;
            overflow: hidden;
            .item-down {
              font-size: 19px;
            }
            div {
              font-family: Roboto;
              font-size: 16px;
              width: inherit;
              height: inherit;
            }
          }
        }
      }
    }
  }

  .aside-swiper-pagination {
    position: absolute;
    left: 0;
    bottom: -23px;
    width: 100%;
    text-align: center;
    z-index: 1;
    /deep/ .swiper-pagination-bullet {
      background: #ffffff;
      opacity: 0.5;
      margin: 0 4px;
      border: 0;
      &.swiper-pagination-bullet-active {
        background: #07f1b7;
        opacity: 1;
      }
    }
  }
}
</style>
