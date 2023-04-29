<template>
  <div class="else_page">

    <div class="scroll-page">
    <!-- <div class="smoke">
        <div class="smoke0"></div>
        <div class="smoke1"></div>
        <div class="smoke2"></div>
        <div class="smoke3"></div>
        <div class="smoke4"></div>
        <div class="smoke5"></div>
      </div>-->

      <div class="animate-bg">
        <drift-post />
      </div>


      <div class="vheader">
        <div class="wrapper clearfix">
          <a class="logo fl" href="/" @click="toOtherPage"><span></span></a>

          <el-popover
            placement="bottom"
            width="173"
            trigger="hover"
            popper-class="login-line-popover"
            @show="toOpenKfWindow">

            <div class="login-line-box">
              <h3>客户服务中心</h3>
              <p>7*24h专业客服，为您服务</p>
              <template v-if="!onlyKfUrlLoading && $store.state.kfUrlByList.length">
                <ul v-if="$store.state.kfUrlByList.length > 1" class="line-li many">
                  <li v-for="(item, index) in $store.state.kfUrlByList"
                      :key="index"
                      @click="openKfWindow(false, index, true)"
                      :class="[index === 0 ? 'button_primary_2022' : 'button_plain_2022']">
                    {{ item.name }}
                  </li>
                </ul>
                <ul v-else class="line-li">
                  <li @click="openKfWindow(false, 0, true)" class="button_primary_2022">{{ $store.state.kfUrlByList[0].name }}</li>
                </ul>
              </template>
              <div v-else class="loader full_screen"><span></span></div>
            </div>

            <button slot="reference"
                    class="fr button_primary_2022" style="margin-top: 20px;font-weight: normal">
              <i class="kf_icon"></i>{{$t("Online_customer_service")}}
            </button>
          </el-popover>
        </div>
      </div>

      <div class="page_main">
        <div class="wrapper">

          <div class="form_box">
            <router-view @onLeave="leaveRegisterTipVisible = true"></router-view>
          </div>

          <div class="wrapper_slide">

            <swiper class="my-swiper" :options="mySwiperOptions">
              <swiper-slide v-for="(item,index) in loginInfo.focus"
                            :key="index"
                            :style="{background: `url(${item.pc_focus_img})`, backgroundSize: '100% 100%'}">
                <router-link v-if="item.pc_door_url" :to="item.pc_door_url" tag="a" target="_blank"/>
              </swiper-slide>
            </swiper>

            <div class="swiper-pagination"></div>
          </div>
        </div>
      </div>

      <v-footer :hasTopPanel="false"/>
    </div>

    <LeaveRegisterTip :visible.sync="leaveRegisterTipVisible"/>
  </div>
</template>
<script type="text/javascript">
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import footer from '../../components/footer'
import DriftPost from '../../components/drift-post'
import LeaveRegisterTip from './leaveRegisterTip'
import { mapActions } from 'vuex'

export default {
  components: {
    'v-footer': footer,
    Swiper,
    SwiperSlide,
    DriftPost,
    LeaveRegisterTip,
  },
  data () {
    return {
      onlyKfUrlLoading: false,
      loginInfo: {},
      mySwiperOptions: {
        autoplay: { delay: 3000, disableOnInteraction: false },
        loop: true,
        grabCursor : true,
        pagination: { el: '.swiper-pagination', clickable: true }
      },
      leaveRegisterTipVisible: false
    }
  },
  mounted () {
    this.init()
    this.setRootHeight()
  },
  methods: {
    ...mapActions(["getOnlyKfUrl"]),
    toOpenKfWindow() {
      this.onlyKfUrlLoading = true
      this.getOnlyKfUrl().finally(() => {
        this.onlyKfUrlLoading = false
      })
    },
    init() {
      this.$http(this.ApiSetting.index.loginInit)
        .then((res) => {
          console.info("登录注册模块初始化信息：", res)
          if (res.status === 1 && res.data) {
            this.loginInfo = res.data
            this.$store.commit('setLoginModelData', {
              verfiy: +res.data.verfiy,
              fast_register: +res.data.fast_register,
              register_finish_tips: res.data.register_finish_tips
            })
          }
        })
    },
    toOtherPage(event) {
      if (this.$route.path === "/register") {
        event.preventDefault()
        this.leaveRegisterTipVisible = true
      }
    },
    setRootHeight() {
      this.$nextTick(() => {
        if (this.$route.path === "/login" || this.$route.path === "/register" || this.$route.path === "/forget") {
          const element = document.querySelector("#app")
          element.style.height = "100vh"
        }
      })
    }
  }
}
</script>
<style lang="less">
@keyframes marquee {
  0% {
    transform: translateX(0) translateZ(0) scale(1);
  }
  100% {
    transform: translateX(-3840px) translateZ(0) scale(1);
  }
}
@import "form.less";

.else_page {
  min-height: 967px;
  background: url("../../assets/login/bg1.jpg") no-repeat top center;
  background-size: cover;
  position: relative;
  height: calc(100% - 2px);

  .scroll-page {
    width: 100%;
    height: 10vh;
    min-height: 967px;
    /*.smoke {
      position:absolute;
      bottom:0;
      left:0;
      width:100%;
      height:100%;
      overflow: hidden;
      z-index: 0;
      pointer-events: none;
      div {
        position: absolute;
        height: 100%;
        width: 5760px;
        animation-name:marquee;
        animation-timing-function:linear;
        animation-iteration-count:infinite;
        animation-direction:alternate;
      }
      .smoke0 {
        background:url("../../assets/login/smoke0.png") repeat-x;
        background-size:contain;
        animation-duration:50s;
      }
      .smoke1 {
        left: -940px;
        background:url("../../assets/login/smoke1.png") repeat-x;
        background-size:contain;
        animation-duration:60s;
      }
      .smoke2 {
        background:url("../../assets/login/smoke2.png") repeat-x;
        background-size:contain;
        animation-duration:80s;
      }
      .smoke3 {
        background:url("../../assets/login/smoke3.png") repeat-x;
        background-size:contain;
        animation-duration:110s;
      }
      .smoke4 {
        background:url("../../assets/login/smoke4.png") repeat-x;
        background-size:contain;
        animation-duration:160s;
      }
      .smoke5 {
        background:url("../../assets/login/smoke5.png") repeat-x;
        background-size:contain;
        animation-duration:210s;
      }
    }*/

    .animate-bg {
      pointer-events: none;
      position: absolute;
      z-index: 9;
      width: 100%;
      height: calc(100% - 1px);
      top: 0;
      left: 0;
    }

    // 头部
    .vheader {
      height: 80px;
      //background-color: rgba(1,1,1,0.8);
      border-bottom: 1px solid #3a3c44;
      box-sizing: border-box;
      line-height: 80px;
      position: relative;
      z-index: 10;
      .logo {
        display: inline-block;
        height: 100%;
        span {
          display: inline-block;
          width: 232px;
          height: 48px;
          vertical-align: middle;
          background: url(../../assets/web-icons.png) no-repeat;
          background-position: -18px 0;
        }
      }

      .button_primary_2022 {
        margin-top: 20px;
        vertical-align: middle;
        width: 128px;
        height: 40px;
        line-height: 40px;
        font-weight: normal;
        .kf_icon {
          line-height: normal;
          display: inline-block;
          width: 22px;
          height: 22px;
          vertical-align: middle;
          margin-right: 6px;
          background: url("../../assets/login/header_kf.png") no-repeat;
        }
      }
    }

    .page_main {
      position: relative;
      z-index: 10;
      .wrapper {
        box-shadow: 0 16px 35px 0 rgba(0, 0, 0, 0.4);
        margin: 99px auto 118px;
        width: 936px;
        height: 590px;
        border-radius: 20px;
        // overflow: hidden;
        overflow: visible;
        background: #222431 url("../../assets/login/wapper_bg.png");
        background-repeat: no-repeat no-repeat;
        display: flex;
        justify-content: space-between;

        .form_box {
          position: relative;
          width: 468px;
          padding: 0 65px;
          box-sizing: border-box;
          .mu-text-field-input{
            &::-webkit-input-placeholder { /* WebKit browsers */
              color: #737981;
            }

            &::-moz-placeholder { /* Mozilla Firefox 19+ */
              color:#737981;
            }

            &:-ms-input-placeholder { /* Internet Explorer 10+ */
              color:#737981;
            }
          }
          .title {
            margin-top: 50px;
            display: flex;
            li {
              cursor: pointer;
              font-size: 18px;
              font-weight: bold;
              line-height: 18px;
              color: #6f7886;
              margin-left: 37px;
              position: relative;
              transition: color 0.2s;
              &:first-child {
                margin-left: 0;
              }
              &:hover {
                color: #07f1b7;
              }
              &:before {
                content: "";
                width: 46px;
                height: 3px;
                position: absolute;
                bottom: -12px;
                left: calc((100% - 46px) / 2);
                border-radius: 1.5px;
                background-color: #07f1b7;
                transform: scaleX(0);
                transition: transform 0.2s;
              }
              &.active {
                color: #07f1b7;
                &:before {
                  transform: scaleX(1);
                }
              }
            }
            &.txt {
              font-size: 18px;
              font-weight: 600;
              line-height: 18px;
              color: #fff;
            }
          }
        }

        .wrapper_slide {
          width: 468px;
          height: 590px;
          position: relative;
          .my-swiper {
            width: inherit;
            height: inherit;
            border-top-right-radius: 20px;
            border-bottom-right-radius: 20px;
            .swiper-wrapper {
              .swiper-slide {
                a {
                  display: block;
                  width: inherit;
                  height: inherit;
                }
              }
            }
          }
          .swiper-pagination {
            width: 100%;
            text-align: center;
            bottom: 20px;
            .swiper-pagination-bullet {
              width: 22px;
              height: 22px;
              box-sizing: border-box;
              position: relative;
              opacity: 1;
              border: solid 2px transparent;
              background: transparent;
              &:before {
                position: absolute;
                content: "";
                width: 9px;
                height: 9px;
                top: 4.5px;
                left: 4.5px;
                border-radius: 50%;
                background-color: #fff;
              }
              &-active {
                background: transparent;
                border-color: #07f1b7;
                &:before {
                  top: 4px;
                  left: 4px;
                  width: 10px;
                  height: 10px;
                  background-color: #07f1b7;
                }
              }
            }
          }
        }
        .form_wrapper {
          padding-top: 42px;
          .el-form {
            .el-form-item {
              margin-bottom: 30px;
              &:last-child {
                margin-bottom: 0;
              }
            }
          }
        }
      }
    }

    .footer {
      position: relative;
      z-index: 10;
    }

    .button_primary_2022 {
      font-weight: bold;
      margin-top: 30px;
    }
  }
}

.login_footer_txt {
  position: absolute;
  bottom: 40px;
  width: calc(100% - 130px);
  text-align: center;
  font-size: 16px;
  line-height: 16px;
  color: #8e9ab2;
}

// 客服线路
.login-line-popover {
  height: 160px;
  border: 0;
  border-radius: 0;
  box-shadow: none;
  background: transparent;
  background: url(../../assets/login/login_line_popover_bg.png) no-repeat;
  padding: 0 30px;
  .login-line-box {
    h3 {
      font-size: 16px;
      line-height: 16px;
      color: #fff;
      margin-top: 41px;
    }
    p {
      font-size: 14px;
      line-height: 14px;
      color: #afbadf;
      margin-top: 7px;
    }
    .line-li {
      margin-top: 9px;
      display: flex;
      justify-content: space-between;
      li {
        margin-top: 0;
        height: 30px;
        line-height: 24px;
        border-radius: 15px;
        font-size: 12px;
        color: #07f1b7;
        box-sizing: border-box;
        &.button_primary_2022 {
          color: #000;
          line-height: 30px;
        }
      }
      &.many {
        li {
          width: 80px;
        }
      }
    }
    .full_screen {
      margin-top: 5px;
      border-radius: 5px;
    }
  }
  .popper__arrow {
    display: none;
  }
}

</style>
