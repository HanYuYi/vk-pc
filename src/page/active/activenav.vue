<template>
  <div class="active_nav active_page"
       :style="{'background-image': `url(${bannerUri}), url(${bgUri})`}"
       :class="[{'fixed-bg': isFixedBg}, {'fixed-pos': isFixedPos}]">

    <router-link v-if="bannerLink" :to="bannerLink"  class="banner" />
    <div v-else class="banner"></div>

    <div class="active_page_wrapper">
      <div class="wrapper">
        <div class="active_nav_list">

          <div class="left_nav">
            <div class="left_wrapper">
              <router-link to="/roll" class="roll_link"></router-link>
              <ul class="status_nav">
                <li v-for="item in statusList"
                    :key="item.status"
                    :class="[{'selected': currentStatus === item.status}, `type-${item.status}`]"
                    @click="selectStatus(item.status)">
                  <img :src="currentStatus === item.status ? item.iconHover : item.icon" alt="">{{ item.title }}
                </li>
              </ul>
            </div>
            <div v-if="hot_actives.length"
                 class="hot_active">
              <router-link v-for="(item, index) in hot_actives"
                           :key="index" :to="item.link_url"
                           class="topBottom-leftRightCorner">
                <img v-lazy="item.img_url" alt="">
                <div class="ui-border-element"></div>
              </router-link>
            </div>
          </div>

          <div class="right_main">

            <ul class="classify">
              <li @click="selectType(0)"
                  :class="{'selected': '0' === curType}">
                全部
              </li>
              <li @click="selectType(index,type)"
                  :class="{'selected':index.toString() === curType}"
                  v-for="(type,index) in childMenu"
                  :key="index">
                {{type}}
              </li>
            </ul>

            <div v-if="!gameListLoad"
                 class="scroll-container"
                 v-infinite-scroll="scrollLoad" :infinite-scroll-disabled="disabledScroll">
              <div v-for="(item, index) in currentScrollList"
                   :key="index"
                   class="active_list_box"
                   :style="{'animation-delay': `${(index % 6 * 0.07).toFixed(2)}s`}">
                <router-link
                  :to="item.url"
                  class="active_link">
                  <img v-lazy="{
                          src: item.img,
                          error: lazyPack2022.error,
                          loading: lazyPack2022.loading
                        }"
                       class="list_box_img">
                  <!--  <i v-if="item.is_vip" class="viplabel"></i>-->
                </router-link>
                <div class="active_info">
                  <h3 class="active_title">{{ item.title[0] }}</h3>
                  <small class="active_desc">{{ item.desc }}</small>
                  <div class="active_other">
                    <p class="active_date"><i></i>{{ item.show_time }}</p>
                    <p class="active_share"><a @click="doCopyLink(item.url)" class="link_primary_2022"><i></i>分享拿奖励</a></p>
                  </div>
                </div>

                <i v-if="activeTagList.includes(item.prize_type.trim())"
                   :class="['type_tag',`type-${activeTagList.indexOf(item.prize_type.trim()) + 1}`]">
                  {{ item.prize_type }}
                </i>

              </div>
            </div>
            <div class="active_nav_loader" v-else><span></span></div>
            <div class="no_data" v-show="!currentList.length && !gameListLoad">
              <img src="../../assets/no-data.png" alt="">
              {{$t('no_active_data')}}
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import Vue from 'vue'
import { mapState } from 'vuex'
import infiniteScroll from 'vue-infinite-scroll'

Vue.use(infiniteScroll)

export default {
  name: 'activenav',
  data () {
    return {
      bannerUri: "",
      bgUri: require("../../assets/active/active_home_bg.png"),
      bannerLink: "",
      activeList: [],
      typeArr: {},
      childMenu: {},
      statusList: [
        {status: 0, title: "全部优惠", icon: require("../../assets/active/home_type_0.png"), iconHover: require("../../assets/active/home_type_0_hover.png")}
      ],
      currentStatus: 0,
      hot_actives: [],
      curType: '0',
      gameListLoad: false,
      childAllList: [],
      currentList: [],
      currentScrollList: [],
      isFixedBg: false,
      isFixedPos: false,
      activeTagList: ["充值奖", "复活金", "加码金", "新手礼", "投注奖", "会员奖", "领V币", "推荐奖", "转运金", "签到奖", "饰品奖", "幸运金"]
    }
  },
  mounted () {
    this.loadActiveList()
    this.bgFixedHandler()
  },
  computed: {
    ...mapState(['isLogin', 'lazyPack2022']),
    disabledScroll () {
      return this.currentScrollList.length >= this.currentList.length
    }
  },
  watch: {
    currentList(list) {
      if (list.length <= 2) {
        this.isFixedBg = false
        this.isFixedPos = false
      }
      let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
      if (scrollTop >= 434) {
        window.scrollTo(0, 354)
      }
    }
  },
  methods: {
    // 选择优惠类型
    selectType (typeid, type = '') {
      this.curType = typeid.toString()
      this.getChildList(true)
    },
    // 选择领取类型
    selectStatus (status) {
      this.currentStatus = status
      this.getParentAllList(true)
    },
    // 获取优惠列表
    loadActiveList () {
      this.gameListLoad = true
      this.$http(this.ApiSetting.active.getActiveList)
        .then((res) => {
          console.info("初始化活动首页信息：", res)
          if (res.status === 1) {
            this.bannerUri = res.data.top_banner || require("../../assets/active/active_home_banner.png")
            this.bannerLink = res.data.banner_redirect
            // this.hot_actives = res.data.hot_actives.slice(0, 3)
            if (res.data.type_lists) {
              this.typeArr = res.data.type_lists
            }
            if (res.data.show_lists) {
              for (const row of res.data.show_lists) {
                row.icon = require(`../../assets/active/home_type_${row.status}.png`)
                row.iconHover = require(`../../assets/active/home_type_${row.status}_hover.png`)
                this.statusList.push(row)
              }
            }
            if (res.data.data) {
              this.currentList = this.activeList = this.setStatusAndTypeToArr(res.data.data)
              this.getParentAllList()
            }
          }
        })
    },
    /**
     * 将一级筛选字段status 和 二级筛选字段格式化为 number[]
     * @param arr
     */
    setStatusAndTypeToArr(arr) {
      arr.map(item => {
        item._status_arr = item.status
          .toString()
          .replace(/\s+/g, '')
          .split(',')
          .map(num => Number.parseInt(num))
        item._type_arr = item.type
          .toString()
          .replace(/\s+/g, '')
          .split(',')
          .map(num => Number.parseInt(num))
        return item;
      })
      return arr;
    },
    /**
     * 计算一级目录的活动数据
     * @param reset
     */
    getParentAllList(reset = false) {
      this.currentList = this.currentStatus === 0 ?
        JSON.parse(JSON.stringify(this.activeList)) :
        this.activeList.filter(item => item._status_arr.includes(this.currentStatus))
      // 存储一级目录下的所有活动数据
      this.childAllList = JSON.parse(JSON.stringify(this.currentList))
      this.curType = '0'
      this.gameListLoad = false
      this.scrollLoad(reset)
      this.getParentMenu()
    },
    /**
     * 动态计算二级目录的菜单
     * @param reset
     */
    getParentMenu() {
      const childKeyList = Object.keys(this.typeArr).map(num => Number.parseInt(num))
      let _childMenu = {}
      this.childMenu = {}
      this.childAllList.map(item => {
        item._type_arr.map(num => {
          if (childKeyList.includes(num)) {
            _childMenu[num] = this.typeArr[num]
          }
        })
      })
      this.childMenu = JSON.parse(JSON.stringify(_childMenu))
    },
    /**
     * 计算二级目录的活动数据
     * @param reset
     */
    getChildList(reset) {
      const childType = Number.parseInt(this.curType)
      this.currentList = childType === 0 ?
        JSON.parse(JSON.stringify(this.childAllList)) :
        this.childAllList.filter(item => item._type_arr.includes(childType))
      this.gameListLoad = false
      this.scrollLoad(reset)
    },
    // 滚动加载
    scrollLoad (reset) {
      if (reset) {
        this.currentScrollList = []
      }
      clearTimeout(timer)
      let timer
      timer = setTimeout(() => {
        // 每次加载6条数据
        if (reset) {
          this.currentScrollList = this.currentList.slice(0, 6)
        } else {
          let pushArr = []
          if (this.currentScrollList.length) {
            pushArr = this.currentList.slice(this.currentScrollList.length, this.currentScrollList.length + 6)
          } else {
            pushArr = this.currentList.slice(0, 6)
          }
          this.currentScrollList = this.currentScrollList.concat(pushArr)
        }
        clearTimeout(timer)
      })
    },

    // 固定部分元素
    bgFixedHandler() {
      window.onscroll = () => {
        let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
        if (!this.gameListLoad) {
          this.isFixedPos = scrollTop >= 354
          if (this.currentScrollList.length > 2 ) {
            this.isFixedBg = scrollTop >= 434
          }
        }
      }
    },

    // 复制活动链接
    doCopyLink (uri) {
      this.$router.push({ path: '/active/callfriends' })
      return
      this.$copyText(`${location.origin}${uri}`)
        .then(() => {
          this.$message({
            message: '活动链接已复制',
            type: 'success'
          })
        },
          () => {
          this.$message({
            message: this.$t("Copy_the_failure"),
            type: 'warning'
          })
      })
    },
  }
}
</script>
<style lang="less" scoped>
.active_home {
  .active_page {
    min-height: 782px;
    padding: 80px 0 22px;
    background-repeat: no-repeat, no-repeat;
    background-position: center top, center 626px;

    &.fixed-bg {
      background-position: center top, center 192px;
      background-attachment: scroll, fixed;
    }
    &.fixed-pos {
      .active_nav_list {
        .right_main {
          .classify {
            background-image: linear-gradient(to bottom, #17191e, rgba(23,25,30,0.8) 70%, transparent);
            z-index: 1;
          }
        }
      }
    }

    .banner {
      display: block;
      height: 354px;
    }

    .active_nav_list {
      min-height: 390px;
      width: 1240px;
      display: flex;
      .left_nav {
        width: 198px;
        height: 100%;
        margin-right: 20px;
        padding-bottom: 20px;
        position: sticky;
        top: 80px;
        .left_wrapper {
          .roll_link {
          display: block;
          width: 231px;
          height: 129px;
          margin-left: -24px;
          transition: background 0.2s;
          background: url("../../assets/active/active_left_nav_roll.png") no-repeat;
        }
          .status_nav {
          margin-top: 14px;
          padding: 42px 0 44px;
          border-radius: 10px;
          background-color: #2f323d;
          li {
            width: 156px;
            height: 40px;
            margin: 0 auto 24px;
            line-height: 40px;
            font-size: 14px;
            font-weight: bold;
            color: #919ab0;
            cursor: pointer;
            transition: background 0.6s;
            text-align: center;
            border-radius: 50px;
            border-style: solid;
            border-width: 2px;
            border-image-source: linear-gradient(to top, transparent, transparent);
            &:hover {
              box-shadow: inset 0 9px 6px 0 rgba(21, 25, 34, 0.55);
              background-color: #1e222d;
            }
            &.selected {
              color: #ffffff;
              animation: status-nav-animate 0.3s ease;
              box-shadow: inset 0px 2px 0 0 rgba(213, 252, 239, 0.47);
              border-image-source: linear-gradient(to top, #1b1d23, #373944);
              border-image-slice: 1;
              background-image: linear-gradient(to bottom, #5ec0ec, #76edbb), linear-gradient(to top, #1b1d23, #373944);
              background-origin: border-box;
              background-clip: content-box, border-box;
              &:hover {
                box-shadow: inset 0px 2px 0 0 rgba(213, 252, 239, 0.47);
              }
            }
            img {
              margin-right: 13px;
            }
            @keyframes status-nav-animate {
              from {
                transform: scale(0,0);
              }
              to {
                transform: scale(1,1);
              }
            }
          }
        }
          .hot_active {
          margin-top: 20px;
          background-color: #262933;
          position: relative;
          padding-top: 50px;
          &:before {
            content: "";
            position: absolute;
            display: inline-block;
            width: 23px;
            height: 32px;
            background-image: url("../../assets/active/active_left_nav_hot.png");
            left: 13px;
            top: 9px;
          }
          &:after {
            content: "热门";
            position: absolute;
            display: inline-block;
            left: 49px;
            top: 12px;
            color: #ffffff;
            font-size: 18px;
          }
          a {
            position: relative;
            display: block;
            width: 100%;
            height: 160px;
            overflow: hidden;
            &.topBottom-leftRightCorner {
              &::before {
                border-top: 1px solid #07f1b7;
              }
              &::after {
                border-left: 1px solid #07f1b7;
              }
            }
            img {
              width: 100%;
              height: 100%;
            }
            .ui-border-element {
              &::before {
                border-bottom: 1px solid #07f1b7;
              }
              &::after {
                border-right: 1px solid #07f1b7;
              }
            }
          }
        }
        }
      }
      .right_main {
        width: 1032px;
        .classify {
          position: sticky;
          top: 80px;
        }
      }
    }
    .active_nav_loader {
      display: block;
      width: 100%;
      height: 100%;
      background: url("../../assets/btn-loader.gif") no-repeat center;
      background-size: 64px 64px;
    }
    .no_data {
      color: #fff;
      width: 100%;
      height: 300px;
      text-align: center;
      line-height: 300px;
      font-size: 16px;
      img { margin-right: 20px;}
    }
    .classify {
      padding: 16px 0 30px;
      width: inherit;
      height: 40px;
      li {
        float: left;
        width: 76px;
        color: #6f7886;
        height: inherit;
        font-size: 16px;
        font-weight: bold;
        line-height: 38px;
        text-align: center;
        cursor: pointer;
        margin-right: 9px;
        box-sizing: border-box;
        border-radius: 6px;
        border: 1px solid transparent;
        transition: all 0.3s;
        &:last-child {
          margin-right: 0;
        }
        &:hover {
          color: #07f1b7;
        }
        &.selected {
          border-color: #07f1b7;
          color: #07f1b7;
        }
      }

    }
    .scroll-container {
      overflow-x: hidden;
      overflow-y: auto;
      width: 100%;
      &::-webkit-scrollbar {
        width: 0;
        height: 0;
      }
      .active_list_box {
        float: left;
        height: 328px;
        width: 500px;
        border-radius: 10px;
        position: relative;
        margin-bottom: 20px;
        background-color: #2f323d;
        opacity: 0;
        &:nth-child(1n+1) {
          transform: translateY(200px);
          animation: list-one-animate 0.4s cubic-bezier(0.77, 0, 0.175, 1);
          animation-fill-mode: forwards;
        }
        &:nth-child(2n+2) {
          transform: translateY(-200px);
          animation: list-two-animate 0.4s cubic-bezier(0.77, 0, 0.175, 1);
          animation-fill-mode: forwards;
        }
        &:nth-child(3n+3) {
          transform: translateY(200px);
          animation: list-three-animate 0.4s cubic-bezier(0.77, 0, 0.175, 1);
          animation-fill-mode: forwards;
        }
        &:nth-child(4n+4) {
          transform: translate(200px, 200px);
          animation: list-four-animate 0.4s cubic-bezier(0.77, 0, 0.175, 1);
          animation-fill-mode: forwards;
        }
        &:nth-child(5n+5) {
          transform: translate(200px, 200px);
          animation: list-two-animate 0.4s cubic-bezier(0.77, 0, 0.175, 1);
          animation-fill-mode: forwards;
        }
        &:nth-child(6n+6) {
          transform: translate(200px, 200px);
          animation: list-one-animate 0.4s cubic-bezier(0.77, 0, 0.175, 1);
          animation-fill-mode: forwards;
        }


        @keyframes list-one-animate {
          from {
            opacity: 0;
            transform: translateX(200px);
          }
          to {
            opacity: 1;
            transform: translateX(0px);
          }
        }

        @keyframes list-two-animate {
          from {
            opacity: 0;
            transform: translateX(-200px);
          }
          to {
            opacity: 1;
            transform: translateX(0px);
          }
        }

        @keyframes list-three-animate {
          from {
            opacity: 0;
            transform: translateY(200px);
          }
          to {
            opacity: 1;
            transform: translateY(0px);
          }
        }

        @keyframes list-four-animate {
          from {
            opacity: 0;
            transform: translate(200px, 200);
          }
          to {
            opacity: 1;
            transform: translate(0px, 0px);
          }
        }


        &:nth-child(odd) {
          margin-right: 20px;
        }
        .active_link {
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
          display: block;
          width: inherit;
          height: 230px;
          background-color: #262933;
          overflow: hidden;
          position: relative;
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
          .list_box_img {
            width: 100%;
            height: 100%;
            transition: transform 0.8s;
          }
          &:hover {
            &:before {
              animation: circle 0.8s;
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
            .list_box_img {
              transform: scale(1.05);
              filter: saturate(1.02);
            }
          }

          .viplabel {
            display: inline-block;
            width: 30px;
            height: 27px;
            position: absolute;
            top: 24px;
            right: 24px;
            background: url("../../assets/web-icons.png") no-repeat;
            background-position: -757px -388px;
          }

        }
        .active_info {
          width: calc(100% - 40px);
          padding: 0 20px;
          .active_title {
            margin-top: 20px;
            font-size: 18px;
            font-weight: bold;
            line-height: 18px;
            color: #ffffff;
          }
          .active_desc {
            margin-top: 9px;
            display: block;
            font-size: 14px;
            line-height: 14px;
            color: #919ab0;
          }
          .active_other {
            margin-top: 8px;
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            line-height: 14px;
            .active_date {
              color: #07f1b7;
              i {
                display: inline-block;
                width: 14px;
                height: 14px;
                background: red;
                margin-right: 6px;
                background: url("../../assets/active/home_date.png") no-repeat;
                vertical-align: bottom;
              }
            }
            .active_share {
              cursor: pointer;
              a {
                display: block;
                i {
                  display: inline-block;
                  width: 16px;
                  height: 16px;
                  background: red;
                  margin-right: 5px;
                  background: url("../../assets/active/home_share.png") no-repeat;
                  vertical-align: middle;
                }
                &:hover {
                  //color: #08eeb5;
                }
              }
            }
          }
        }
        .type_tag {
          position: absolute;
          bottom: 40px;
          right: -12px;
          display: inline-block;
          width: 103px;
          height: 48px;
          background: red;
          font-weight: bold;
          font-size: 14px;
          line-height: 30px;
          text-align: center;
          color: #ffffff;
          pointer-events: none;
          .type-fn(@num) {
            &.type-@{num} {
              background: url("../../assets/active/home_active_type_@{num}.png") no-repeat;
            }
          }
          .loop-type (@i) when (@i < 13) {
            .type-fn(@i);
            .loop-type(@i + 1);
          }
          .loop-type(1);
        }
      }
    }
  }
}
</style>
