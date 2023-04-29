<template>
  <dl class="download-by-home">
    <dt class="title">
      <small>稳定安全，用的放心</small>
    </dt>

    <dd class="content">

      <ul class="tabs" :style="{width: `${tabsList.length * 186}px`}">
        <li v-for="(item, index) in tabsList"
            :key="index"
            :class="{active: activeIndex === index}"
            @click="activeIndex = index">
          <img :src="item.typeIcon" alt="">
          <img :src="item.typeIconHover" alt="">
          {{ item.typeTitle }}
        </li>
      </ul>

      <div class="tab-panel">

        <div v-for="(item, index) in tabsList"
             :key="index"
             class="item-panel">

          <transition name="fade-left">
            <div v-show="activeIndex === index" class="left">
              <img :src="item.themeImg" alt="">
            </div>
          </transition>

          <transition name="fade-right">
            <div v-show="activeIndex === index" class="right">
              <h1>{{ item.title }}</h1>
              <p>{{ item.desc }}</p>

              <!-- 功能区-->
              <div v-if="index === 0" class="logger">
                <button @click="downloadLogger(downloadData.windows_login_url)" class="oper-btn">
                  <img src="../../assets/home/logger_windows_icon.png" alt="">
                  <img src="../../assets/home/logger_windows_icon_hover.png" alt="">
                  Windows下载
                </button>
                <button @click="downloadLogger(downloadData.macos_login_url)" class="oper-btn mac" style="margin-left: 20px">
                  <img src="../../assets/home/logger_mac_icon.png" alt="">
                  <img src="../../assets/home/logger_mac_icon_hover.png" alt="">
                  MacOS下载
                </button>

                <el-popover
                  :popper-options="{ removeOnDestroy: true }"
                  trigger="hover"
                  popper-class="android-logger-popover"
                  transfer="true"
                  placement="top">

                  <dl class="qr-code">
                    <dt><img :src="downloadData.android_login_qr"></dt>
                    <dd>Android扫一扫</dd>
                  </dl>

                  <span slot="reference">

                    <button @click="downloadLogger(downloadData.android_login_url)" class="oper-btn" style="margin-left: 20px">
                      <img src="../../assets/home/logger_android_icon.png" alt="">
                      <img src="../../assets/home/logger_android_icon_hover.png" alt="">
                      Android下载
                    </button>

                  </span>
                </el-popover>

              </div>

              <div v-if="index === 1" class="download">
                <div class="app"><img src="/pc_static/defaultimg/qr_img_vip.png" alt=""><p>扫码下载App<br>iOS & Android</p></div>
                <div class="wap"><img :src="downloadData.wap_qr" alt=""><p>无需下载，扫码直接访问<br><a :href="downloadData.wap_url" target="_blank">{{ downloadData.wap_url }}</a></p></div>
              </div>

              <div v-if="index === 2" class="hijacking">
                <router-link to="/guide/17" class="oper-btn">
                  查看详情
                  <img src="../../assets/home/hijacking_btn_icon.png" alt="">
                  <img src="../../assets/home/hijacking_btn_icon_hover.png" alt="">
                </router-link>
              </div>

            </div>
          </transition>
        </div>
      </div>

    </dd>
  </dl>
</template>

<script>

export default {
  name: "downloadByHome",
  props: ["downloadData"],
  data () {
    return {
      activeIndex: 0,
      tabsList: [
        {
          typeTitle: "威客登录器",
          typeIcon: require("../../assets/home/logger_type.png"),
          typeIconHover: require("../../assets/home/logger_type_hover.png"),
          themeImg: require("../../assets/home/logger_icon.png"),
          title: "安全登录器",
          desc: "威客倾情打造，自主开发防劫持安全登录器。登录器支持 Windows｜MacOS | Android系统平台，使用登录器可直接访问威客Web站点，有效防御和避免站点被拦截/劫持等问题。登录器安装简单，能给玩家提供安全的游戏环境体验！"
        },
        {
          typeTitle: "APP下载",
          typeIcon: require("../../assets/home/download_type.png"),
          typeIconHover: require("../../assets/home/download_type_hover.png"),
          themeImg: require("../../assets/home/app_download_icon.png"),
          title: "APP客户端",
          desc: "原生APP，便捷登录、操作简单、界面一目了然、游戏畅通无阻、丰富的游戏品类、24小时多平台无缝应用体验。指尖App无处不在，带您开启掌上精彩！"
        },
        {
          typeTitle: "防劫持教程",
          typeIcon: require("../../assets/home/hijacking_type.png"),
          typeIconHover: require("../../assets/home/hijacking_type_hover.png"),
          themeImg: require("../../assets/home/hijacking_icon.png"),
          title: "防劫持教程",
          desc: "网络劫持，风险无处不在，而预防劫持攻击其实很简单！设置网络安全代理，使用安全网络，更新软件，使用复杂密码，从源头上保护您的网络数据和隐私安全。让您的网络更加安全可靠！"
        }
      ]
    }
  },
  methods: {
    downloadLogger(url) {
      if (!url || !url.length) {
        this.$message({ message: "即将开放，敬请期待", type: "error" })
        return
      }
      window.location.href = url
    }
  }
}
</script>

<style lang="less" scoped>
.download-by-home {
  width: 1240px;
  margin: 52px auto 0;
  .title {
    width: inherit;
    background: url("../../assets/index/download_title.png") center top no-repeat;
    text-align: center;
    overflow: hidden;
    small {
      display: block;
      margin-top: 84px;
      font-size: 14px;
      color: #acbae2;
    }
  }
  .content {
    margin: 37px auto 0;
    position: relative;

    .tabs {
      margin: 0 auto;
      height: 64px;
      padding: 8px 8px;
      border-radius: 32px;
      border: solid 1px #4a5169;
      box-sizing: border-box;
      box-shadow: 0 3px 7px 0 rgba(0, 0, 0, 0.23), inset 0 3px 7px 0 rgba(140, 152, 201, 0.17);
      background-image: linear-gradient(to top, #252934, #343a4a);
      display: flex;
      li {
        margin: 0 8px;
        width: 170px;
        height: 48px;
        font-weight: bold;
        font-size: 16px;
        line-height: 48px;
        letter-spacing: 0.4px;
        text-align: center;
        color: #acbae2;
        border-radius: 24px;
        cursor: pointer;
        position: relative;
        transition: background-color 0.3s;
        img {
          vertical-align: middle;
          margin-right: 3px;
          &:nth-child(1n+1) {
            display: inline-block;
          }
          &:nth-child(2n+2) {
            display: none;
          }
        }
        &:hover {
          box-shadow: inset 0 9px 6px 0 rgba(21, 25, 34, 0.55);
          background-color: #1e222d;
        }
        &.active {
          transition: all 0.3s;
          color: #1e1e1e;
          box-shadow: inset 0 2px 0 0 rgba(201, 253, 238, 0.47);
          background-image: linear-gradient(to right, #07e9f1, #07f1b7);
          animation: tab-animate 0.6s ease;
          img {
            &:nth-child(1n+1) {
              display: none;
            }
            &:nth-child(2n+2) {
              display: inline-block;
            }
          }
        }
        @keyframes tab-animate {
          from {
            transform: scale(0,0);
          }
          to {
            transform: scale(1,1);
          }
        }
      }
    }

    .tab-panel {
      height: 497px;
      overflow: hidden;
      .item-panel {
        display: flex;
        justify-content: center;
        .left {
          width: calc(1240px - 555px);
          height: 497px;
          display: flex;
          align-items: center;
          img {
            max-height: 497px;
          }
        }

        .right {
          width: 555px;
          margin-top: 90px;
          z-index: 1;
          &>h1 {
            font-size: 56px;
            line-height: 56px;
            color: #07f1b7;
          }
          &>p {
            margin-top: 32px;
            font-size: 14px;
            line-height: 28px;
            color: #acbae2;
          }

          .oper-btn {
            display: block;
            width: 200px;
            height: 68px;
            line-height: 68px;
            border-radius: 10px;
            box-shadow: 0px 3px 7px 0 rgba(0, 0, 0, 0.23), inset 0px 3px 7px 0 rgba(140, 152, 201, 0.17);
            border: solid 1px #4a5169;
            background-image: linear-gradient(to top, #252934, #343a4a);
            font-size: 16px;
            font-weight: bold;
            text-align: center;
            color: #acbae2;
            cursor: pointer;
            transition: all 0.2s;
            &:hover {
              color: #1e1e1e;
              box-shadow: inset 0px 2px 0 0 rgba(201, 253, 238, 0.47);
              background-image: linear-gradient(to right, #07e9f1, #07f1b7);
              img {
                &:nth-child(1n+1) {
                  display: none;
                }
                &:nth-child(2n+2) {
                  display: inline-block;
                }
              }
            }
            img {
              margin-right: 8px;
              vertical-align: middle;
              &:nth-child(1n+1) {
                display: inline-block;
              }
              &:nth-child(2n+2) {
                display: none;
              }
            }
            &.mac {
              img {
                vertical-align: sub;
              }
            }
          }

          .logger {
            margin-top: 33px;
            display: flex;

            .oper-btn {
              width: 171px;
            }
          }

          .download {
            margin-top: 34px;
            display: flex;
            .app,.wap {
              width: 188px;
              img {
                width: 128px;
                height: 128px;
                background-color: #ffffff;
                border-radius: 8px;
              }
              p {
                margin-top: 16px;
                transform: translateX(-30px);
                text-align: center;
                font-size: 14px;
                font-weight: bold;
                line-height: 23px;
                color: #acbae2;
                white-space: nowrap;
                a {
                  color: #acbae2;
                  text-decoration: underline;
                }
              }
            }
          }

          .hijacking {
            a {
              margin-top: 36px;
              img {
                vertical-align: inherit;
                margin: 0 0 0 10px;
              }
            }
          }
        }
        .fade-left-enter-active {
          transition: all .6s ease;
        }
        .fade-left-enter {
          transform: translateX(50px);
          opacity: 0;
        }

        .fade-right-enter-active {
          transition: all 1s ease;
        }
        .fade-right-enter {
          transform: translateX(-50px);
          opacity: 0;
        }
      }
    }
  }
}
</style>

<style lang="less">
.android-logger-popover {
  background: transparent;
  border: 0;
  padding: 0;
  margin-left: 17.5px;

  .qr-code {
    background: #ffffff;
    border-radius: 8px;
    overflow: hidden;
    width: 136px;
    dt {
      width: inherit;
      img {
        width: inherit;
      }
    }
    dd {
      font-size: 14px;
      text-align: center;
      color: #1e1e1e;
      margin-bottom: 8px;
    }
  }

  .popper__arrow {
    margin-left: -8px;
    border-width: 6px;
    border-bottom-color: #ffffff!important;
    border-top-color: #ffffff!important;
    &::after {
     display: none;
    }
  }
}
</style>
