<template>
  <div class="vk-news">
    <!-- 主体-->
    <div class="main-content">
    <!-- banner-->
      <div v-if="bannerDataLoading || bannerData.big.length"
           class="new-banner"
           @mouseenter="isHoverBanner = true"
           @mouseleave="isHoverBanner = false">
        <swiper v-if="bannerData.big.length" class="news-swiper" :options="mySwiperOptions">
          <swiper-slide v-for="(item, index) in bannerData.big" :key="index">
            <router-link :to="item.redirect_link"
                         class="news-link"
                         :style="{backgroundImage: `url(${item.banner})`}"
                         v-lazy:background-image="{
                           src: item.banner,
                           error: $store.state.lazyPack2022.error,
                           loading: $store.state.lazyPack2022.loading
                         }">
              <h3><h4 v-html="item.title"></h4></h3>
            </router-link>
          </swiper-slide>
        </swiper>

        <div class="news-swiper-pagination"></div>
      </div>

      <!-- 资讯分类tab-->
      <el-tabs v-model="newsTypeValue" class="news-tab" @tab-click="calcNextTwoNewType();getNewsList(true)">
        <el-tab-pane
          v-for="(item, index) in newsTypeList"
          :key="index"
          :label="item.name"
          :name="item.id + ''">
        </el-tab-pane>
      </el-tabs>

      <!-- 资讯展示-->
      <div class="news-list">
        <template v-if="newsDataList.length">
          <news-item :list="newsDataList" />
          <div v-if="newsDataListLoading" class="new-load-tips">正在加载中....</div>
          <template v-else>
            <div v-if="newsDataList.length < paginationData.total || newsDataListLoadError" @click="getNewsList(false)" class="new-load-tips has">
              {{ newsDataListLoadError ? '请求失败，点击重新加载' : '点击加载更多' }}
            </div>
            <div v-else class="new-load-tips">没有更多了</div>
          </template>
        </template>
        <template v-else>
          <div v-if="newsDataListLoading" class="new-load-tips">正在加载中....</div>
          <div v-else class="news-empty"><i></i>暂无数据~</div>
        </template>
      </div>
    </div>

    <!-- 右侧-->
    <div class="other-content">
      <!-- 顶部热门-->
      <router-link v-for="(item, index) in bannerData.small"
                   :key="index"
                   :to="item.redirect_link"
                   class="new-recommend"
                   :style="{backgroundImage: `url(${item.banner})`}"
                   v-lazy:background-image="{
                       src: item.banner,
                       error: $store.state.lazyPack2022.error,
                       loading: $store.state.lazyPack2022.loading
                   }">
        <h4><h5 v-html="item.title"></h5></h4>
      </router-link>

      <!-- 最新公告-->
      <dl v-if="newsNotice.length" class="new-notice">
        <dt>
          <h4>最新公告</h4>
          <router-link v-if="isLogin" :to="{name: 'message', params: {id: 2}}" class="button_plain_2022">更多</router-link>
          <button v-else class="button_plain_2022" @click="$message({ message: '请您先登录', type: 'warning' })">更多</button>
        </dt>
        <dd>
          <ul>
            <li v-for="(item, index) in newsNotice" :key="index" @click="openNoticeDialog(item)">
              <p v-html="item.title"></p>
            </li>
          </ul>
        </dd>
      </dl>

      <!-- 当前选中类型的后两种类型的资讯-->
      <right-news style="position: sticky; top: 100px"
                  :newsType="nextTwoNewType"
                  :list="rightNewsDataList" />
    </div>

    <!-- 公告dialog-->
    <message-dialog
      :visible.sync="noticeVisible"
      :dailogTitle="$t('The_announcement')"
      :type="2"
      :msgDetailInfo="noticeRow" />
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import { mapState } from 'vuex'
import newsItem from './newsItem'
import messageDialog from '../user/messageDialog'
import rightNews from './rightNews'
import publicMixin from './publicMixin'

const swiperEl = document.getElementsByClassName('news-swiper')

export default {
  name: 'news',
  components: { Swiper, SwiperSlide, newsItem, messageDialog, rightNews },
  mixins: [ publicMixin ],
  data () {
    return {
      isHoverBanner: false,
      bannerData: {
        big: [],
        small: []
      },
      bannerDataLoading: false,
      mySwiperOptions: {
        autoplay: { delay: 4000, disableOnInteraction: false },
        pagination: { el: '.news-swiper-pagination', clickable: true }
      },
      newsTypeValue: null,

      paginationData: {
        total: 0,
        pageSize: 8,
        pageNum: 1
      },
      newsDataList: [],
      rightNewsDataList: [],
      nextTwoNewType: [],
      newsDataListLoading: false,
      newsDataListLoadError: false,

      newsNotice: [],
      noticeVisible: false,
      noticeRow: {}
    }
  },
  computed: {
    ...mapState(['isLogin'])
  },
  mounted () {
    this.getBannerData()
    this.getNotice()

    this.getNewsTypeList().then(() => {
      this.newsTypeValue = String(this.$route.params.type || this.newsTypeList[0].id)
      this.getNewsList(true)
      this.calcNextTwoNewType()
    })
  },
  watch: {
    isHoverBanner (bool) {
      if (swiperEl[0]) {
        bool ? swiperEl[0].swiper.autoplay.stop() : swiperEl[0].swiper.autoplay.start()
      }
    },
    // 定位页面位置
    newsTypeValue () {
      this.$nextTick(() => {
        if (this.$route.params && this.$route.params.type) {
          window.scrollTo(0, 0)
        } else {
          const pageTop = document.documentElement.scrollTop || document.body.scrollTop
          window.scrollTo(0, pageTop)
        }
      })
    }
  },
  methods: {
    // 获取banner
    async getBannerData () {
      this.bannerDataLoading = true
      const response = await this.$http(this.ApiSetting.vkNews.banner)
      console.info('初始化资讯banner数据：', response)
      if (response.status === 1 && response.data) {
        this.bannerData = response.data
      }
      this.bannerDataLoading = false
    },

    // 获取公告
    async getNotice () {
      const response = await this.$http(this.ApiSetting.vkNews.notice)
      console.info('初始化资讯公告数据：', response)
      if (response.status === 1 && response.data) {
        this.newsNotice = response.data
      }
    },

    // 计算后两个资讯类型
    calcNextTwoNewType () {
      this.nextTwoNewType = []
      if (+this.newsTypeValue && this.newsTypeList.length) {
        let currentTypeIndex = this.newsTypeList.findIndex(item => +this.newsTypeValue === item.id)
        this.nextTwoNewType.push(this.newsTypeList[currentTypeIndex + 2 > this.newsTypeList.length ? 0 : currentTypeIndex + 1])
        this.nextTwoNewType.push(this.newsTypeList[currentTypeIndex + 3 > this.newsTypeList.length ? (currentTypeIndex + 3 - this.newsTypeList.length === 1 ? 0 : 1) : currentTypeIndex + 2])
      }
    },

    /**
     * 获取资讯列表，包括右侧固定推荐资讯
     * @param isReset
     * @return {Promise<void>}
     */
    getNewsList (isReset = false) {
      if (this.newsDataListLoading || this.rightNewsLoading) return
      this.newsDataListLoading = true

      if (isReset) {
        this.rightNewsDataList = []
        this.newsDataList = []
        this.paginationData.pageNum = 1
      }

      const params = {
        category: +this.newsTypeValue,
        page: this.paginationData.pageNum,
        page_size: this.paginationData.pageSize
      }

      console.info('获取资讯列表入参：', params)
      this.$http(this.ApiSetting.vkNews.newsList, params)
        .then(response => {
          console.info('获取资讯列表：', response)
          if (response.status === 1 && response.data) {
            const { list, total } = response.data
            if (isReset) {
              this.newsDataList = list
            } else {
              this.newsDataList = [...this.newsDataList].concat(list)
            }
            this.paginationData.pageNum += 1
            this.paginationData.total = total

            if (isReset) this.getRightNewsList()
          }
        })
        .catch(() => {
          this.newsDataListLoadError = true
        })
        .finally(() => {
          this.newsDataListLoading = false
        })
    },

    // 查看公告
    openNoticeDialog (row) {
      this.noticeRow = row
      this.noticeVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
// 单行文本省略号
.single-line-txt-ellipsis {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.vk-news {
  margin: 100px auto 0;
  width: 1240px;
  position: relative;
  display: flex;

  .main-content {
    width: 850px;
    margin-bottom: 60px;
    margin-right: 16px;
    vertical-align: top;

    .new-banner {
      width: 850px;
      height: 478px;
      background-color: #262933;
      margin-bottom: 20px;
      position: relative;

      .news-swiper {
        width: 850px;
        height: 478px;
        //position: relative;
        .swiper-slide {
          .news-link {
            display: block;
            width: inherit;
            height: inherit;
            background-size: 100% auto;
            background-repeat: no-repeat;
            background-position: center top;
            overflow: hidden;
            transition: background-size 1s;
            &:before {
              position: absolute;
              top: 50%;
              left: 50%;
              z-index: 2;
              content: "";
              width: 200%;
              height: 300%;
              background: hsla(0,0%,100%,.1);
              border-radius: 100%;
              transform: translate(-50%, -50%) scale(0, 0);
              opacity: 0;
            }

            &:hover {
              background-size: 103% auto;
              &:before {
                animation: circle 1s;
              }
              @keyframes circle {
                0% {
                  opacity: 1;
                }
                40% {
                  opacity: 1;
                }
                100% {
                  transform: translate(-50%, -50%) scale(1, 1);
                  opacity: 0;
                }
              }
            }

            h3 {
              overflow: hidden;
              margin-top: 478px - 98;
              background-image: linear-gradient(rgba(52, 58, 74, 0.64), #181b21 90%);
              h4 {
                margin: 15px 30px 30px;
                height: 53px;
                font-size: 18px;
                font-weight: normal;
                line-height: 25px;
                color: #ffffff;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                /* autoprefixer: ignore next */
                -webkit-box-orient: vertical;
                overflow: hidden;
              }
            }
          }
        }
      }

      .news-swiper-pagination {
        width: 100%;
        position: absolute;
        top: 445px;
        left: 27px;
        z-index: 1;

        /deep/ .swiper-pagination-bullet {
          opacity: 1;
          width: 13px;
          height: 5px;
          border-radius: 2.5px;
          background-color: #bdbec1;
          margin: 0 3px;
          transition: width 0.8s;
          overflow: hidden;

          &.swiper-pagination-bullet-active {
            width: 26px;
            background-image: linear-gradient(to right, #07e9f1, #07f1b7);
          }
        }
      }
    }

    .news-tab {
      width: inherit;
      height: 60px;
      background-color: #262933;

      /deep/ .el-tabs__header {
        margin: 0;

        .el-tabs__nav-wrap {
          &.is-scrollable {
            padding: 0 20px;
          }

          .el-tabs__nav-prev, .el-tabs__nav-next {
            top: 0;
            position: absolute;
            cursor: pointer;
            width: 20px;
            height: 60px;
            background: url("../../assets/icon_es.png") no-repeat;
            opacity: 0.5;

            &:hover {
              opacity: 1;
            }
          }

          .el-tabs__nav-prev {
            left: 0;
            background-position: -665px -22px;
          }

          .el-tabs__nav-next {
            right: 0;
            background-position: -645px -22px
          }

          .el-tabs__nav-scroll {
            overflow: hidden;

            .el-tabs__active-bar {
              height: 4px;
              background-image: linear-gradient(to right, #07e9f1, #07f1b7);
              background-color: transparent;
            }

            .el-tabs__item {
              min-width: 120px;
              text-align: center;
              height: 60px;
              line-height: 60px;
              font-size: 18px;
              color: #7c839f;

              &.is-active, &:hover {
                color: #07f1b7;
                background: url("../../assets/nav_select_bg.png") no-repeat;
                background-size: 100% 64px;
              }

              span {
                display: block;
                width: inherit;
                height: inherit;

                a {
                  display: block;
                  width: inherit;
                  height: inherit;
                  color: #7c839f;
                }
              }

              &#tab-1{
                position: relative;
                &:after {
                  position: absolute;
                  content: "";
                  top: 0;
                  right: 27px;
                  width: 30px;
                  height: 30px;
                  background: url("../../assets/news_hot.png");
                }
              }
            }
          }
        }
      }
    }

    .news-list {
      margin-top: 23px;

      .new-load-tips {
        text-align: center;
        line-height: 75px;
        font-size: 14px;
        color: #7c839f;
        border-bottom: 0;
        background-color: #262933;
        border-top: 1px solid #181b21;
        &.has {
          cursor: pointer;
        }
      }
      .news-empty {
        height: 140px;
        line-height: 140px;
        color: #fff;
        font-size: 18px;
        text-align: center;
        margin-bottom: 20px;
        i {
          display: inline-block;
          width: 62px;
          height: 62px;
          background:  url("../../assets/web-icons.png") no-repeat;
          background-position: -808px -221px;
          vertical-align: middle;
          margin-right: 10px;
        }
      }
    }
  }

  .other-content {
    height: inherit;
    width: 370px;
    margin-bottom: 60px;

    .new-recommend {
      display: block;
      height: 229px;
      margin-bottom: 20px;
      background-size: 100% auto;
      background-repeat: no-repeat;
      background-position: center top;
      overflow: hidden;
      position: relative;
      transition: background-size 1s;
      &:before {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 2;
        content: "";
        width: 200%;
        height: 300%;
        background: hsla(0,0%,100%,.1);
        border-radius: 100%;
        transform: translate(-50%, -50%) scale(0, 0);
        opacity: 0;
      }

      &:hover {
        background-size: 103% auto;
        &:before {
          animation: circle 0.8s;
        }
        @keyframes circle {
          0% {
            opacity: 1;
          }
          40% {
            opacity: 0.6;
          }
          100% {
            transform: translate(-50%, -50%) scale(1, 1);
            opacity: 0;
          }
        }
      }

      h4 {
        overflow: hidden;
        margin-top: 229px - 66;
        background-image: linear-gradient(rgba(52, 58, 74, 0.64), #181b21 70%);

        h5 {
          margin: 9px 30px 4px;
          height: 53px;
          font-size: 18px;
          font-weight: normal;
          line-height: 25px;
          color: #ffffff;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          /* autoprefixer: ignore next */
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      }
    }

    .new-notice {
      background-color: #262933;

      dt {
        display: flex;
        justify-content: space-between;
        padding: 30px 30px 0;

        h4 {
          font-size: 18px;
          font-weight: bold;
          color: #ffffff;
        }

        .button_plain_2022 {
          margin-top: 2px;
          display: block;
          width: 48px;
          height: 20px;
          line-height: 18px;
          border-radius: 4px;
          font-size: 14px;
          border-width: 1px;
        }
      }

      dd {
        li {
          padding: 15px 30px;
          border-bottom: 1px solid #181b21;
          cursor: pointer;
          &:hover {
            p {
              color: #ffffff;
            }
          }

          p {
            max-height: 48px;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            /* autoprefixer: ignore next */
            -webkit-box-orient: vertical;
            overflow: hidden;
            font-size: 14px;
            line-height: 24px;
            color: #7c839f;
            transition: all 0.3s;
          }

          &:last-child {
            border-bottom: 0;
          }
        }
      }
    }
  }
}
</style>
