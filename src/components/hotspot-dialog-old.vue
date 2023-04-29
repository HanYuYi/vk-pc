<template>
  <el-dialog
    :visible.sync="visible" :close-on-click-modal="false" :append-to-body="true" :close-on-press-escape="false"
    custom-class="hotspot-dialog" width="600px" title="今日热点"
    @close="close">
    <div v-if="visible" class="mian">
      <div class="content">
        <div class="swiper-box"  @mouseenter="hover = true" @mouseleave="hover = false">
          <swiper :options="mySwiperOptions" class="swiper">
            <swiper-slide v-for="(item, index) in hotspotList" :key="index" :style="{cursor: item.url_type !== 0 ? 'pointer' : 'default'}">
              <div v-if="item.type === 1" class="img-panel" :style="{'background': `url(${item.img_url}) no-repeat`, 'background-size': '100% auto'}"></div>
              <div v-if="item.type === 2" class="text-panel">
                <h2 class="title" v-html="item.content_titile"></h2>
                <p class="text" v-html="item.content_desc"></p>
              </div>
            </swiper-slide>
          </swiper>
        </div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
        <div class="swiper-pagination"></div>
      </div>

      <div class="footer-panel">
        <checkbox v-model="noReminderToday">今日不再提醒</checkbox>
        <button v-if="hotspotList[swiperIndex].url_type !== 0" class="to-details" @click="handleToDetails">了解详情</button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import { mapState } from 'vuex'
import storage from '../utils/storage'
import { formatDate } from '../utils/util'

const swiperEl = document.getElementsByClassName('swiper')

export default {
  name: 'hotspotDialog',
  components: { Swiper, SwiperSlide },
  data () {
    return {
      visible: false,
      noReminderToday: false,
      swiperIndex: 0,
      mySwiperOptions: {
        allowTouchMove: false,
        autoplay: { delay: 3000, disableOnInteraction: false }, // 当用户滑动图片后继续自动轮播
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        pagination: { el: '.swiper-pagination', clickable: true },
        on: {
          slideChange: () => {
            this.swiperIndex = swiperEl[0].swiper.activeIndex
          },
          click: () => {
            this.handleToDetails()
          }
        }
      },
      hotspotList: [], // type 1: 图片， 2: 文本   url_type 0: 无链接，1: 内链，2: 外链
      hover: false
    }
  },
  computed: {
    ...mapState(['userInfo', 'loadHostpot'])
  },
  watch: {
    loadHostpot (bool) {
      if (bool) this.verifyVisible()
    },
    hover (bool) {
      bool ? swiperEl[0].swiper.autoplay.stop() : swiperEl[0].swiper.autoplay.start()
    }
  },
  methods: {
    // 是否显示今日热点
    verifyVisible () {
      const hostpotKey = storage.get('displayed_hotspot_time')
      if (hostpotKey) {
        const splitKey = hostpotKey.split('___')
        if (this.userInfo.user_id == splitKey[0]) {
          if ((formatDate(new Date(), 'yyyyMMdd') - 0) > (splitKey[1] - 0)) {
            this.getHotspotList()
          }
        } else {
          this.getHotspotList()
        }
      } else {
        this.getHotspotList()
      }
    },
    // 获取今日热点
    getHotspotList () {
      this.$http(this.ApiSetting.index.homePagePop.wonderfulRecommendList)
        .then(({ status, data }) => {
          if (status === 1 && data && data.length) {
            this.hotspotList = data
            this.noReminderToday = true
            this.visible = true
            this.$store.commit("updateHostpotVisible",  true)
          }
        })
    },
    // 了解详情
    handleToDetails () {
      const currentItem = this.hotspotList[this.swiperIndex]
      if (currentItem.url_type === 0) return
      currentItem.url_type === 1 && this.$router.push({ path: this.hotspotList[this.swiperIndex].link_url });
      (currentItem.url_type === 2 || currentItem.url_type === 3) && window.open(this.hotspotList[this.swiperIndex].link_url)
      this.close()
    },
    close () {
      if (this.noReminderToday) {
        storage.set('displayed_hotspot_time', `${this.userInfo.user_id}___${formatDate(new Date(), 'yyyyMMdd')}`)
      }
      this.visible = false
      this.$store.commit('updateLoadHostpot', false)
      this.$store.commit("updateHostpotVisible",  false)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .hotspot-dialog {
  background-color: #17191f;
  border-style: solid;
  border-width: 1px;
  border-image-source: linear-gradient(to top, #07f1b7, #07e9f1);
  border-image-slice: 1;
  .el-dialog__header {
    height: 46px;
    line-height: 44px;
    background-color: #262933;
    .el-dialog__title {
      font-size: 14px;
      color: #ffffff;
    }
  }
  .el-dialog__body {
    padding: 30px 0 40px;
    .mian {
      .content {
        .swiper-box {
          width: 456px;
          height: 160px;
          margin: 0 auto;
          .swiper-container {
            overflow: hidden;
            .img-panel {
              width: 456px;
              height: 160px;
              background-position: center top;
            }
            .text-panel {
              .title {
                font-size: 14px;
                text-align: center;
                color: #07f1b7;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-weight: normal;
              }
              .text {
                width: 436px;
                height: 113px;
                font-size: 12px;
                line-height: 1.63;
                color: #7c839f;
                overflow: hidden;
                margin: 16px auto 0;
              }
            }
          }
        }

        .swiper-button-prev, .swiper-button-next {
          top: 42%;
          width: 21px;
          height: 38px;
          background: url("../assets/web-icons.png") no-repeat;
          opacity: 0.4;
          &:after {
            content: "";
          }
          &:hover {
            opacity: 1;
          }
        }
        .swiper-button-prev {
          left: 21px;
          background-position: -1243px -192px;
        }
        .swiper-button-next {
          background-position: -1243px -235px;
          right: 21px;
        }
        .swiper-pagination {
          position: static;
          margin-top: 30px;
          width: 100%;
          text-align: center;
          .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
            margin: 0 6px;
            opacity: 1;
            background-color: #747579;
            box-sizing: border-box;
            &.swiper-pagination-bullet-active {
              background-color: #ffffff;
            }
          }
        }
      }
      .footer-panel {
        padding: 30px 82px 0;
        font-size: 16px;
        color: #ffffff;
        display: flex;
        justify-content: space-between;
        .to-details {
          border: none;
          background-color: #fff;
          cursor: pointer;
          width: 146px;
          line-height: 36px;
          font-size: 16px;
          color: #ffffff;
          box-sizing: border-box;
          background-image: linear-gradient(#17191f, #17191f), linear-gradient(to right, #07f1b7, #07e9f1);
          padding: 1px;
          border-radius: 100px;
          background-clip: content-box, padding-box;
          transition: color 0.2s;
          &:hover {
            color: #07f1b7;
          }
        }
      }
    }
  }
}
</style>
