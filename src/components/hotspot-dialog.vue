<template>
  <el-dialog v-backdrop v-dir-center="visible" custom-class="hotspot-dialog" width="508px" :append-to-body="true" :close-on-press-escape="false" :visible.sync="visible" @close="close">
    <img @click="visible = false" class="close-img" width="31" height="31" src="~@/assets/index/hotspot/close.webp" alt="" />
    <template v-if="realHotspotList.length">
        <div class="swiper-box" v-if="realHotspotList.length > 1">
          <swiper ref="hotswiper" :options="mySwiperOptions" class="swiper">
            <swiper-slide v-for="(item, index) in realHotspotList" :key="index"
              :style="{cursor: item.url_type !== 0 ? 'pointer' : 'default'}">
              <div @click="handleToDetails" v-if="item.type === 1" class="img-panel"
                :style="{'background': `url(${item.img_url}) no-repeat`, 'background-size': '100% auto'}"></div>
              <div v-if="item.type === 2 && item.content_titile" class="text-panel">
                <h2 class="title" v-html="item.content_titile"></h2>
                <p class="text" v-html="item.content_desc"></p>
              </div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>
        <div class="swiper-box" v-else>
          <div class="swiper-container" v-for="(item, index) in realHotspotList" :key="index" :style="{cursor: item.url_type !== 0 ? 'pointer' : 'default'}">
          <div @click="handleToDetails" class="img-panel"
            :style="{'background': `url(${item.img_url}) no-repeat`, 'background-size': '100% auto'}"></div>
          </div>
        </div>
        <label @click.stop for="one" class="footer-panel d-flex align-center justify-center"
          :class="{ 'footer-panel-selected': true === noReminderToday }">
          <input style="display:none" id="one" type="checkbox" v-model="noReminderToday">
          <div class="circle"></div>
          <div>今日不再提醒</div>
        </label>
    </template>
    <template v-else>
      <div class="swiper-box">
        <img :style="singleData.link&&'cursor:pointer'" @click="() => {
          if (!singleData.link) return;
          $router.push(singleData.link)
          visible = false
        }" width="508" height="629" :src="singleData.img_url" alt="" />
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { formatDate } from '@/utils/util'
import storage from '@/utils/storage'
import { mapState } from 'vuex'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  name: 'hotspotDialog',
  components: { Swiper, SwiperSlide },
  data () {
    return {
      visible: false,
      noReminderToday: false,
      swiperIndex: 0,
      singleData: {
        img_url: '',
        link: ''
      },
      hotspotList: [], // type 1: 图片， 2: 文本   url_type 0: 无链接，1: 内链，2: 外链
      mySwiperOptions: {
        autoplay: { delay: 3000, disableOnInteraction: false }, // 当用户滑动图片后继续自动轮播
        pagination: { el: '.swiper-pagination', clickable: true },
        observer: true,
        observeParents: true,
        on: {
          slideChange: () => {
            this.swiperIndex = this.$refs.hotswiper.$swiper.activeIndex
          }
        }
      }
    }
  },
  watch: {
    loadHostpot (bool) {
      if (bool) this.init()
    }
  },
  computed: {
    ...mapState(['userInfo', 'loadHostpot']),
    // 过滤掉文字热点，缺没有标题和内容的选项
    realHotspotList () {
      if (this.hotspotList.length) {
        return this.hotspotList.filter(item => (item.type === 1 && item.img_url) || (item.type === 2 && item.content_titile && item.content_desc))
      } else {
        return []
      }
    }
  },
  methods: {
    // 了解详情
    handleToDetails () {
      const currentItem = this.hotspotList[this.swiperIndex]
      if (currentItem.url_type === 0) return
      currentItem.url_type === 1 && this.$router.push({ path: this.hotspotList[this.swiperIndex].link_url });
      (currentItem.url_type === 2 || currentItem.url_type === 3) && window.open(this.hotspotList[this.swiperIndex].link_url)
      this.close()
    },
    init () {
      this.$http(this.ApiSetting.index.homePagePop.newRecommend)
        .then(res => {
          console.log('首页弹窗', res)
          if (res.status === 1 && Object.keys(res.data).length) {
            this.singleData = res.data
            this.visible = true
          } else {
            this.getHotspotList()
          }
        })
    },
    getHotspotList () {
      const hostpotKey = storage.get('displayed_hotspot_time')
      const splitKey = hostpotKey ? hostpotKey.split('___') : []
      if (splitKey.length && +this.userInfo.user_id === +splitKey[0] && (formatDate(new Date(), 'yyyyMMdd') - 0) <= (splitKey[1] - 0)) {
        return
      }
      this.$http(this.ApiSetting.index.homePagePop.wonderfulRecommendList)
        .then(({ status, data }) => {
          if (status === 1 && data && data.length) {
            this.hotspotList = data
            this.visible = true
            this.$store.commit('updateHostpotVisible', true)
          }
        })
    },
    close () {
      if (this.noReminderToday) {
        storage.set('displayed_hotspot_time', `${this.userInfo.user_id}___${formatDate(new Date(), 'yyyyMMdd')}`)
      } else {
        storage.remove('displayed_hotspot_time')
      }
      this.visible = false
      this.$store.commit('updateLoadHostpot', false)
      this.$store.commit('updateHostpotVisible', false)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .hotspot-dialog {
  height: 629px;
  margin: auto;
  background: transparent;
  .close-img {
    position: absolute;
    right: 0;
    top: -61px;
    cursor: pointer;
    transition: transform .4s ease-out;
    &:hover {
      transform: rotate(-90deg);
    }
  }
  .el-dialog__header {
    display: none;
  }
  .el-dialog__body {
    padding: 0;
    width: 100%;
    height: 100%;
    .swiper-box {
      width: 100%;
      height: 100%;
      margin: auto;
      overflow: hidden;
      .swiper-container {
        .img-panel {
          width: 508px;
          height: 629px;
          background-position: center top;
          border-radius: 20px;
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
    .footer-panel {
      cursor: pointer;
      margin: 30px auto 0;
      width: fit-content;
      font-size: 24.5px;
      color: #ffffff;
      line-height: 28px;
      &.footer-panel-selected {
        .circle {
          &::after {
            transform: scale(1);
          }
        }
      }
      .circle {
        width: 28px;
        height: 28px;
        text-align: center;
        box-sizing: border-box;
        border: solid 2px #fff;
        border-radius: 50%;
        margin-right: 20px;
        position: relative;
        &::after {
          content: '';
          display: block;
          margin: 5px auto;
          border-radius: 50%;
          width: 14px;
          height: 14px;
          line-height: 28px;
          box-sizing: border-box;
          background-color: #00edad;
          transform: scale(0);
          transition: all .3s;
        }
      }
    }
  }
  .swiper-pagination {
    bottom: 0.12rem;
  }
  .swiper-pagination-bullet {
    opacity: 0.7;
    border-radius: 4px;
    background-color: #ffffff;
    transition: width 0.8s;
    overflow: hidden;

    &.swiper-pagination-bullet-active {
      width: 25px;
      opacity: 1;
      box-shadow: inset 0 2px 0 0 rgba(201, 253, 238, 0.47);
      position: relative;

      &:before {
        position: absolute;
        top: 0;
        left: 0;
        content: "";
        width: inherit;
        height: inherit;
        background-image: linear-gradient(to right, #07e9f1, #07f1b7);
        animation: bullet-animate .8s;
        transform-origin: left;
        border-radius: 4px;
      }
    }

    @keyframes bullet-animate {
      from {
        transform: scaleX(0);
      }

      to {
        transform: scaleX(1);
      }
    }
  }
}
</style>
