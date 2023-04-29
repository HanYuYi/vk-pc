<template>
  <div class="app_show inner_page">
    <div class="top_section">
      <div class="logo"><img src="../assets/appshow/logo.png" alt=""></div>
      <div class="top_title"><img src="../assets/appshow/top_title.png"></div>
    </div>
    <div class="wrapper">
      <div class="section s1">
        <div class="install_guide">
          <div class="guaide_top clearfix">
            <!-- <div class="download_qrcorde" :class="{'vip_qr_img':userInfo.is_super}"> -->
            <div class="download_qrcorde">
              <!-- <img :src="userInfo.is_super?'/pc_static/defaultimg/qr_img_vip2.png':'/pc_static/defaultimg/qr_img.png'" alt=""> -->
              <img :src="'/pc_static/defaultimg/qr_img_vip.png'" alt="">
            </div>
            <div class="phone_type">
              <div class="ios">
                <img src="../assets/appshow/iOS.png" alt="">
              </div>
              <div class="android">
                <img src="../assets/appshow/Android.png" alt="">
              </div>
            </div>
          </div>
          <div class="ver_info clearfix">
            <div class="info_box">
              <div class="box_top">
                <span class="num">1.7</span>
              </div>
              <div class="box_desc">
                {{$t("The_version_number")}}
              </div>
            </div>
            <div class="info_box">
              <div class="box_top">
                <span class="num">41</span>mb
              </div>
              <div class="box_desc">
                {{$t("The_installation_package_iOS")}}
              </div>
            </div>
            <div class="info_box">
              <div class="box_top">
                <span class="num">14</span>mb
              </div>
              <div class="box_desc">
                {{$t("The_installation_package_Android")}}
              </div>
            </div>
          </div>
          <div class="guide_btn ios">
            <span @click="showIosGuideDialog"></span>
          </div>
          <div class="guide_btn android">
            <span @click="showAndroidGuideDialog"></span>
          </div>
        </div>
      </div>
      <div class="section s2">
        <div class="desc_box">
          <div class="title"><img src="../assets/appshow/s2_title.png" alt=""></div>
          <div class="desc_text" v-html="$t('Support_DOTA2_LOL_CSGO_SC2')"></div>
        </div>
      </div>
      <div class="section s3">
        <div class="desc_box">
          <div class="title"><img src="../assets/appshow/s3_title.png" alt=""></div>
          <div class="desc_text" v-html="$t('Support_phone_transfer_participate_in_activities_and')"></div>
        </div>
      </div>
    </div>

    <!-- ios安装指引-->
    <ios-guide :visible.sync="iosGuideVisible" />

    <!-- android安装指引-->
    <android-guide :visible.sync="androidGuideVisible" />
  </div>
</template>

<script type="text/javascript">
import IosGuide from "./appshow/ios-guide"
import AndroidGuide from "./appshow/android-guide"


export default {
  name: 'appshow',
  components: { IosGuide, AndroidGuide },
  data() {
    return {
      iosGuideVisible: false,
      androidGuideVisible: false
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  methods: {
    showIosGuideDialog () {
      this.iosGuideVisible = true
    },

    showAndroidGuideDialog () {
      this.androidGuideVisible = true
    },
  }
}
</script>
<style lang="less" scoped>
  .app_show {
    background: url("../assets/appshow/bg.jpg") top center;
    padding: 100px 0;
    .top_section {
      .logo {
        text-align: center;
        height: 124px;
        pointer-events: none;
      }
      .top_title {
        text-align: center;
        height: 113px;
        padding-left: 120px;
        margin-top: -20px;
        pointer-events: none;
      }
    }
    .wrapper {
      width: 1000px;
      margin: 0 auto;
      .section {
        .desc_box {
          width: 440px;
          color: #eaeaea;
          font-size: 20px;
          margin-top: 15px;
        }
        &.s1 {
          background: url("../assets/appshow/s1_bg.png") no-repeat;
          background-position: 460px -16px;
          padding: 160px 0 220px;
          .install_guide {
            width: 570px;
            padding-left: 80px;
            box-sizing: border-box;
            .guaide_top {
              .download_qrcorde {
                width: 168px;
                height: 188px;
                float: left;
                background: url("../assets/appshow/qr_bg.png") no-repeat center;
                box-sizing: border-box;
                padding-top: 10px;
                text-align: center;
                img {
                  width: 140px;
                }
                &.vip_qr_img {
                  background: unset;
                }
              }
              .phone_type {
                float: left;
                margin-left: 30px;
                padding-top: 10px;
                .ios {
                  height: 49px;
                  padding: 10px 0;
                  pointer-events: none;
                }
                .android {
                  height: 49px;
                  padding: 10px 0;
                  pointer-events: none;
                }
              }
            }
          }
          .ver_info {
            padding-left: 6px;
            padding-top: 10px;
            .info_box {
              float: left;
              width: 110px;
              height: 110px;
              background: url("../assets/appshow/info_bg.png") no-repeat center;
              margin-right: 45px;
              text-align: center;
              color: #bfbfbf;
              font-size: 14px;
              padding-top: 15px;
              line-height: normal;
              box-sizing: border-box;
              .box_top {
                font-size: 20px;
                height: 52px;
                .num {
                  font-size: 40px;
                }
              }
              .box_desc {
                height: 20px;
                line-height: 20px;
              }
            }
          }
          .guide_btn {
            margin-top: 50px;
            padding-left: 6px;
            span {
              display: inline-block;
              cursor: pointer;
              width: 244px;
              height: 70px;
            }
            &.ios {
              span {
                background: url("../assets/appshow/guide_btn_ios.png") no-repeat;
                background-position: -6px 0;
                &:hover {
                  background-position: -6px -88px;
                }
              }
            }
            &.android {
              margin-top: 18px;
              span {
                background: url("../assets/appshow/guide_btn_android.png") no-repeat;
                background-position: -6px 0;
                &:hover {
                  background-position: -6px -88px;
                }
              }
            }
          }
        }
        &.s2 {
          height: 870px;
          background: url("../assets/appshow/s2_bg.png") no-repeat;
          background-position: -6px 40px;
          .desc_box {
            float: right;
            padding-top: 160px;
            .title {
              img{
                pointer-events: none;
              }
            }
            .desc_text {
              padding-left: 5px;
            }
          }
        }
        &.s3 {
          height: 870px;
          background: url("../assets/appshow/s3_bg.png") no-repeat;
          background-position: 520px 0;
          .desc_box {
            padding-top: 180px;
            margin-left: 100px;
            .title {
              img{
                pointer-events: none;
              }
            }
          }
        }
      }
    }
  }
</style>
<style lang="less" scoped>
/deep/.guide_dialog {
  width: 742px;
  .guide_notice {
    color: #07f1b7;
  }
	.el-dialog__body {
    padding: 0;
		overflow: auto;
    .el-tabs {
      width: inherit;
      height: inherit;
      .el-tabs__header {
        margin: 0 60px;
        .el-tabs__active-bar {
          height: 4px;
          background-image: linear-gradient(to right, #07e9f1, #07f1b7);
        }
        .el-tabs__item {
          height: 70px;
          line-height: 70px;
          font-size: 18px;
        }
      }
      .el-tabs__content {
        width: 100%;
        height: calc(100% - 70px);
        .highlight {
          color: #07f1b7;
        }
      }
    }
	}

  &.ios {
    .el-dialog__body {
      height: 722px;
    }
  }
  &.android {
    .el-dialog__body {
      height: 775px;
    }
  }
}
</style>
