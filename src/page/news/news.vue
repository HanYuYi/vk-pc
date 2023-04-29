<template>
  <div class="news-details">

    <!-- 主体-->
    <div class="main-content">

      <div class="details">
        <h6 class="breadcrumb">当前位置：<router-link :to="{name: 'news', params: {type: fromNewsList ? newsDetailsData.detail.category : ''}}">新闻</router-link>>资讯详情</h6>

        <!-- 资讯详情-->
        <dl class="detailed">
          <dt>
            <h3 v-html="newsDetailsData.detail.title"></h3>
            <div class="detailed-info">
              <i class="tag" :style="{background: newsDetailsData.detail.tag_color}">{{ newsDetailsData.detail.tag }}</i>
              <small class="new-info time">{{ dateTimeFormatByNews(newsDetailsData.detail.timestamp) }}</small>
              <small v-if="JSON.stringify(newsDetailsData.detail) !== '{}' && !newsDetailsData.detail.is_hide_read" class="new-info read">
                <i class="views"></i>{{newsDetailsData.detail.read_count }}
              </small>
            </div>
          </dt>
          <dd v-html="newsDetailsData.detail.content"></dd>

        </dl>

        <div class="new-oper">
          <router-link :to="{name: 'news', params: {type: fromNewsList ? newsDetailsData.detail.category : ''}}">返回列表</router-link>
          <router-link :to="`/news/${newsDetailsData.next_id}`">下一篇</router-link>
        </div>
      </div>


      <div class="recommend">
        <!-- 赛事推荐-->
        <dl v-if="newsDetailsData.detail.is_recommend" class="match-recommend">
          <dt class="title-headquarters">赛事推荐</dt>
          <dd class="panel">

            <p class="date">
              {{ matchTime.length ? `${matchTime[0][1]}-${matchTime[0][2]}` : '' }}
              <b>{{ matchTime[1] }}</b>
            </p>

            <div class="pk-team">
              <div class="team-logo">
                <div class="left">
                  <img
                    v-lazy="{
                        src: newsDetailsData.detail.team_a_logo,
                        error: $store.state.lazyMatchAvatar.error,
                        loading: $store.state.lazyMatchAvatar.loading
                    }"
                    alt="">
                </div>
                <div class="center">
                  <h4 class="title">{{ newsDetailsData.detail.match_name }}</h4>
                  <em>VS</em>
                </div>
                <div class="right">
                  <img
                    v-lazy="{
                        src: newsDetailsData.detail.team_b_logo,
                        error: $store.state.lazyMatchAvatar.error,
                        loading: $store.state.lazyMatchAvatar.loading
                    }"
                    alt="">
                </div>
              </div>
              <div class="team-record">
                <div class="left">
                  <span :title="newsDetailsData.detail.team_a_name">{{ newsDetailsData.detail.team_a_name }}</span>
                  <!-- <small style="text-align: right">{{ newsDetailsData.detail.team_a_odds }}</small>-->
                </div>
                <div class="right">
                  <!-- <small>{{ newsDetailsData.detail.team_b_odds }}</small>-->
                  <span :title="newsDetailsData.detail.team_b_name">{{ newsDetailsData.detail.team_b_name }}</span>
                </div>
              </div>
            </div>

            <button @click="handleToGame(newsDetailsData.detail.redirect_link)" class="join-btn button_primary_2022">{{ $t("Immediately_the_betting") }}</button>
          </dd>
        </dl>

        <!-- 推荐阅读-->
        <dl v-if="newsDetailsData.recommend.length" class="read-recommend">
          <dt class="title-headquarters">推荐阅读</dt>
          <dd class="panel">
            <news-item :list="newsDetailsData.recommend" />
          </dd>
        </dl>
      </div>


    </div>

    <!-- 右侧-->
    <right-news class="other-content" :newsType="nextTwoNewType" :list="rightNewsDataList" />
  </div>
</template>

<script>
import rightNews from './rightNews'
import newsItem from './newsItem'
import { mapState } from 'vuex'
import publicMixin from './publicMixin'

export default {
  name: 'newsDetails',
  components: { rightNews, newsItem },
  mixins: [ publicMixin ],
  data() {
    return {
      nextTwoNewType: [],

      currentId: this.$route.params.id,

      newsDetailsData: {
        detail: {},
        recommend: []
      },

      rightNewsDataList: [],
      fromNewsList: false
    }
  },
  computed: {
    matchTime() {
      if (this.newsDetailsData.detail.match_time) {
        const arrDate = this.newsDetailsData.detail.match_time.split(" ")
        return [arrDate[0].split("-"), arrDate[1]]
      }
      return []
    },
    ...mapState(["isLogin"])
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.fromNewsList = from.path === '/news'
    })
  },
  beforeRouteUpdate(to, from, next) {
    // 动态路由跳转当前页面手动更新处理
    window.scrollTo(0, 0)
    this.currentId = to.params.id

    this.getNewsDetailsData()
    next()
  },
  mounted () {
    this.getNewsDetailsData()
  },
  methods: {
    // 计算后两个资讯类型
    calcNextTwoNewType() {
      this.nextTwoNewType = []
      if (this.newsTypeList.length) {
        let currentTypeIndex = this.newsTypeList.findIndex(item => this.newsDetailsData.detail.category === item.id)
        this.nextTwoNewType.push(this.newsTypeList[currentTypeIndex + 2 > this.newsTypeList.length ? 0 : currentTypeIndex + 1])
        this.nextTwoNewType.push(this.newsTypeList[currentTypeIndex + 3 > this.newsTypeList.length ? (currentTypeIndex + 3 - this.newsTypeList.length === 1 ? 0 : 1) : currentTypeIndex + 2])
      }
    },

    /**
     * 获取资讯详情
     * @return {Promise<void>}
     */
    async getNewsDetailsData() {

      const params = { news_id: +this.currentId }
      console.info("获取资讯详情入参：", params)
      const response = await this.$http(this.ApiSetting.vkNews.newsDetail, params)
      console.info("获取资讯详情：", response)
      if (response.status === 1 && response.data) {
        if (response.data.detail !== null) {
          this.newsDetailsData = response.data

          this.getNewsTypeList().then(() => {
            this.calcNextTwoNewType()
            this.rightNewsDataList = []
            this.getRightNewsList()
          })
        } else {
          this.$router.replace('/news')
        }
      }
    },

    // 跳转赛事投注
    handleToGame (uri) {
      if (!this.isLogin) {
        this.$message({ message: '请您先登录', type: 'warning' })
        return
      }
      this.$router.push({ path: uri })
    }
  }
}
</script>

<style lang="less" scoped>
.news-details {
  margin: 100px auto 0;
  width: 1240px;
  position: relative;

  .main-content {
    display: inline-block;
    width: 850px;
    margin-bottom: 47px;
    margin-right: 16px;
    vertical-align: top;

    .details {
      padding: 0 30px 30px;
      background-color: #262933;
      overflow: hidden;
      .breadcrumb {
        margin-top: 13px;
        font-size: 14px;
        font-weight: normal;
        line-height: 46px;
        color: #7c839f;
        a {
          color: #7c839f;
          &:hover {
            text-decoration: underline;
          }
        }
      }
      .detailed {
        dt {
          h3 {
            font-size: 18px;
            font-weight: normal;
            line-height: 25px;
            color: #ffffff;
          }

          .detailed-info {
            margin-top: 16px;

            .tag {
              display: inline-block;
              border-radius: 4px;
              font-size: 14px;
              line-height: 20px;
              padding: 0 10px;
              color: #262933;
              margin-right: 11px;
            }

            .new-info {
              color: #7c839f;
              font-size: 14px;

              &.time {
                margin-right: 70px;
              }

              &.read {
                .views {
                  display: inline-block;
                  width: 19px;
                  height: 12px;
                  margin-right: 9px;
                  background: url("../../assets/login/password_view.png");
                  background-size: 100%;
                }
              }
            }
          }
        }
        dd {
          margin-top: 57px;
          /deep/ p {
            color: #ffffff;
            font-size: 14px;
            span {
              font-size: 14px;
            }
          }
          /deep/ * {
            max-width: 790px;
          }
        }
      }

      .new-oper {
        margin-top: 30px;
        display: flex;
        justify-content: space-between;
        a {
          font-size: 14px;
          line-height: 14px;
          color: #acbae2;
          text-decoration: underline;
          &:hover {
            color: #ffffff;
          }
        }
      }
    }

    .recommend {
      background-color: #262933;
      margin-top: 20px;
      .match-recommend {
        overflow: hidden;
        padding: 0 30px 29px;
        border-bottom: 1px solid #181b21;
        .title-headquarters {
          font-size: 18px;
          font-weight: bold;
          color: #ffffff;
          margin: 28px 0 18px;
        }
        .panel {
          width: 802px;
          height: 296px;
          background: url("../../assets/new_details_match.png");
          overflow: hidden;

          .date {
            margin-top: 16px;
            height: 46px;
            font-family: Roboto;
            font-size: 18px;
            line-height: 18px;
            text-align: center;
            color: #acbae2;
            b {
              display: block;
              font-size: 18px;
              line-height: 28px;
              color: #ffffff;
            }
          }

          .pk-team {
            margin-top: 14px;
            .team-logo {
              width: 442px;
              margin: 0 auto;
              display: flex;
              justify-content: space-between;
              .left, .right {
                width: 82px;
                height: 82px;
                background: url("../../assets/index/team_logo_bg.png") no-repeat center center;
                border-radius: 50%;
                overflow: hidden;
                text-align: center;
                line-height: 80px;
                box-shadow: 0 5px 13px 0 rgba(0, 0, 0, 0.1);
                img {
                  width: 62px;
                }
              }
              .center {
                max-width: 260px;
                text-align: center;
                .title {
                  width: inherit;
                  margin-top: 7px;
                  font-weight: normal;
                  font-size: 14px;
                  line-height: 14px;
                  text-align: center;
                  color: #acbae2;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  overflow: hidden;
                }
                em {
                  display: block;
                  margin-top: 14px;
                  font-size: 23px;
                  line-height: 23px;
                  text-align: center;
                  color: #6e7ba0;
                  font-weight: bold;
                }
              }
            }
            .team-record {
              width: 520px;
              height: 36px;
              margin: 4px auto 0;
              border-radius: 8px;
              border: solid 1px #515765;
              box-sizing: border-box;
              background-color: #272a37;
              position: relative;
              display: flex;
              &:before {
                position: absolute;
                top: 0;
                left: 50%;
                content: "";
                width: 1px;
                height: 100%;
                background:  #515765;
              }
              .left, .right {
                width: 50%;
                //margin: 0 20px 0 11px;
                font-family: Roboto;
                line-height: 36px;
                //display: flex;
                //justify-content: space-between;
                span {

                  //margin-right: 6px;
                  display: inline-block;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  //width: 160px;
                  width: 100%;
                  text-align: center;
                  font-size: 14px;
                  color: #acbae2;
                }
                small {
                  font-size: 18px;
                  width: 39px;
                  color: #ffffff;
                }
              }
              .right {
                //margin: 0 11px 0 20px;
                span {
                  margin-right: 0;
                  //margin-left: 6px;
                  //text-align: right;
                }
              }
            }
          }
          .join-btn {
            display: block;
            width: 128px;
            height: 40px;
            line-height: 40px;
            color: #000000;
            margin: 26px auto 0;
            border-radius: 20px;
          }
        }
      }

      .read-recommend {
        overflow: hidden;
        .title-headquarters {
          padding: 0 30px;
          font-size: 18px;
          font-weight: bold;
          color: #ffffff;
          margin: 28px 0 18px;
        }
      }
    }
  }

  .other-content {
    display: inline-block;
    position: sticky;
    top: 100px;
    width: 370px;
    margin-bottom: 47px;
    /deep/ dl {
      &:first-child {
        margin-top: 0;
      }
    }
  }
}
</style>
