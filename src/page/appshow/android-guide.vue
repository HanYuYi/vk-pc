<template>
  <el-dialog
    :visible.sync="visible"
    custom-class="guide_dialog android"
    :close-on-click-modal="false"
    :append-to-body="true"
    :before-close="close">

    <div class="dialog_title" slot="title">Android安装指引及杀毒设置</div>

    <el-tabs v-model="activeName">
      <el-tab-pane label="安装指引" name="0">

        <ul class="phone-type">
          <li v-for="(val, i) in phoneTypeList" :key="i" @click="installTypeIndex = i" :class="{active: installTypeIndex === i}">{{ val }}</li>
        </ul>

        <div class="cus-panel">
          <div v-for="(options, index) in installList" :key="index">

            <div v-show="installTypeIndex === index" class="guide-item">
              <div class="step-desc">{{ installList[index].swiperIndex + 1 }}. <span v-html="installList[index].swiperData[installList[index].swiperIndex].desc"></span></div>

              <swiper class="install-swiper" :class="`install-swiper-${index}`" :options="options.options">
                <swiper-slide v-for="(item, i) in options.swiperData" :key="i">
                  <img v-if="item.img" :src="item.img" alt="">
                </swiper-slide>

                <template v-if="options.swiperData && options.swiperData.length > 1">
                  <div class="swiper-button-prev" :class="`install-${index}-button-prev`" slot="button-prev"></div>
                  <div class="swiper-button-next" :class="`install-${index}-button-next`" slot="button-next"></div>
                </template>
              </swiper>
            </div>
          </div>
        </div>

      </el-tab-pane>


      <el-tab-pane label="杀毒设置" name="1">

        <ul class="phone-type">
          <li v-for="(val, i) in phoneTypeList" :key="i" @click="antiVirusTypeIndex = i" :class="{active: antiVirusTypeIndex === i}">{{ val }}</li>
        </ul>

        <div class="cus-panel">
          <div v-for="(options, index) in antiVirusList" :key="index">

            <div v-show="antiVirusTypeIndex === index" class="guide-item">
              <div class="step-desc">{{ antiVirusList[index].swiperIndex + 1 }}. <span v-html="antiVirusList[index].swiperData[antiVirusList[index].swiperIndex].desc"></span></div>

              <swiper class="antiVirus-swiper" :class="`antiVirus-swiper-${index}`" :options="options.options">
                <swiper-slide v-for="(item, i) in options.swiperData" :key="i">
                  <img v-if="item.img" :src="item.img" alt="">
                </swiper-slide>

                <template v-if="options.swiperData && options.swiperData.length > 1">
                  <div class="swiper-button-prev" :class="`antiVirus-${index}-button-prev`" slot="button-prev"></div>
                  <div class="swiper-button-next" :class="`antiVirus-${index}-button-next`" slot="button-next"></div>
                </template>
              </swiper>
            </div>
          </div>
        </div>

      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper"
import "swiper/css/swiper.css"

let swiperInstallElList = []
let swiperAntiVirusElList = []

export default {
  name: "android-guide",
  props: ["visible"],
  components: { Swiper, SwiperSlide },
  data() {
    return {
      activeName: "0",
      phoneTypeList: ["华为手机 ", "VIVO手机", "OPPO手机", "小米手机", " 魅族手机", "其它手机"],

      installTypeIndex: 0,

      // 安装指引 教程配置
      installList: [
        {
          swiperIndex: 0,
          swiperData: [
            { img: require("../../assets/appshow/android_install_hw_1.png"), desc: "下载后会弹出风险框，请不用担心，本APP没有任何病毒，请点击<span class='highlight'>「暂不处理」</span>" },
            { img: require("../../assets/appshow/android_install_hw_2.png"), desc: "安装后打开<span class='highlight'>「信任此应用」</span>即可" },
            { img: require("../../assets/appshow/android_install_hw_3.png"), desc: "华为自带的「手机管家」中会检测出敏感内容，由于本APP中包含博弈内容所致，请放心使用" }
          ],
          options: {
            autoHeight: true,
            grabCursor: true,
            navigation: { nextEl: ".install-0-button-next", prevEl: ".install-0-button-prev" },
            on: {
              slideChange: () => {
                this._data.installList[0].swiperIndex = swiperInstallElList[0].swiper.activeIndex
              }
            }
          }
        },
        {
          swiperIndex: 0,
          swiperData: [
            { img: require("../../assets/appshow/android_install_vivo_1.png"), desc: "下载后会弹出风险框，请点击<span class='highlight'>「继续安装」</span>" },
            { img: require("../../assets/appshow/android_install_vivo_2.png"), desc: "在<span class='highlight'>「高风险提示」</span>弹框出現后点击安裝，如沒有安裝，请重复第一步并点击<span class='highlight'>「忽略风险并安裝」</span>" }
          ],
          options: {
            autoHeight: true,
            grabCursor: true,
            navigation: { nextEl: ".install-1-button-next", prevEl: ".install-1-button-prev" },
            on: {
              slideChange: () => {
                this._data.installList[1].swiperIndex = swiperInstallElList[1].swiper.activeIndex
              }
            }
          }
        },
        {
          swiperIndex: 0,
          swiperData: [
            { img: require("../../assets/appshow/android_install_oppo_1.png"), desc: "下载后会弹出「发现病毒」，请不用担心，本APP没有任何病毒，请点击<span class='highlight'>「无视风险安装」</span>" },
            { img: require("../../assets/appshow/android_install_oppo_2.png"), desc: "OPPO自带的「安全卫士」中会检测出敏感内容，由于本APP中包含博弈内容所致，请放心使用" }
          ],
          options: {
            autoHeight: true,
            grabCursor: true,
            navigation: { nextEl: ".install-2-button-next", prevEl: ".install-2-button-prev" },
            on: {
              slideChange: () => {
                this._data.installList[2].swiperIndex = swiperInstallElList[2].swiper.activeIndex
              }
            }
          }
        },
        {
          swiperIndex: 0,
          swiperData: [
            { desc: "小米手机在正常安装情况下不会提示病毒，但下载后我们还是需在腾讯手机管家里把本App添加到信任区 <span id='toAntiRef' class='link_primary_2022'>查看小米杀毒设置</span>" }
          ],
          options: {
            autoHeight: true,
            grabCursor: true,
            navigation: { nextEl: ".install-3-button-next", prevEl: ".install-3-button-prev" },
            on: {
              slideChange: () => {
                this._data.installList[3].swiperIndex = swiperInstallElList[3].swiper.activeIndex
              }
            }
          }
        },
        {
          swiperIndex: 0,
          swiperData: [
            { img: require("../../assets/appshow/android_install_meizu_1.png"), desc: "下载后会弹出「发现危险」，请不用担心，本APP没有任何病毒，请点击<span class='highlight'>「仍要安装」</span>" }
          ],
          options: {
            autoHeight: true,
            grabCursor: true,
            navigation: { nextEl: ".install-4-button-next", prevEl: ".install-4-button-prev" },
            on: {
              slideChange: () => {
                this._data.installList[4].swiperIndex = swiperInstallElList[4].swiper.activeIndex
              }
            }
          }
        },
        {
          swiperIndex: 0,
          swiperData: [
            { img: require("../../assets/appshow/android_install_other_1.png"), desc: "下载前请先至<span class='highlight'>「设置」 「安全性」</span>" },
            { img: require("../../assets/appshow/android_install_other_2.png"), desc: "开启<span class='highlight'>「不明的来源」</span>，并执行<span class='highlight'>「确定」</span>" }
          ],
          options: {
            autoHeight: true,
            grabCursor: true,
            navigation: { nextEl: ".install-5-button-next", prevEl: ".install-5-button-prev" },
            on: {
              slideChange: () => {
                this._data.installList[5].swiperIndex = swiperInstallElList[5].swiper.activeIndex
              }
            }
          }
        }
      ],

      antiVirusTypeIndex: 0,

      // 杀毒设置 教程配置
      antiVirusList: [
        {
          swiperIndex: 0,
          swiperData: [
            { img: require("../../assets/appshow/android_antiVirus_meizu_5.png"), desc: "打开<span class='highlight'>「腾讯手机管家」</span>后点击<span class='highlight'>「安全检测」</span>" },
            { img: require("../../assets/appshow/android_antiVirus_meizu_6.png"), desc: "在安全检测后点击<span class='highlight'>「处理」</span>" },
            { img: require("../../assets/appshow/android_antiVirus_meizu_7.png"), desc: "继续下一步，点击<span class='highlight'>「移入信任区」</span>" },
            { img: require("../../assets/appshow/android_antiVirus_meizu_8.png"), desc: "点击<span class='highlight'>「确认」</span>后，白名单添加成功，再次杀毒就不会提示了" }
          ],
          options: {
            autoHeight: true,
            grabCursor: true,
            navigation: {nextEl: ".antiVirus-0-button-next", prevEl: ".antiVirus-0-button-prev"},
            on: {
              slideChange: () => {
                this._data.antiVirusList[0].swiperIndex = swiperAntiVirusElList[0].swiper.activeIndex
              }
            }
          }
        },
        {
          swiperIndex: 0,
          swiperData: [
            { img: require("../../assets/appshow/android_antiVirus_meizu_5.png"), desc: "打开<span class='highlight'>「腾讯手机管家」</span>后点击<span class='highlight'>「安全检测」</span>" },
            { img: require("../../assets/appshow/android_antiVirus_meizu_6.png"), desc: "在安全检测后点击<span class='highlight'>「处理」</span>" },
            { img: require("../../assets/appshow/android_antiVirus_meizu_7.png"), desc: "继续下一步，点击<span class='highlight'>「移入信任区」</span>" },
            { img: require("../../assets/appshow/android_antiVirus_meizu_8.png"), desc: "点击<span class='highlight'>「确认」</span>后，白名单添加成功，再次杀毒就不会提示了" }
          ],
          options: {
            autoHeight: true,
            grabCursor: true,
            navigation: {nextEl: ".antiVirus-1-button-next", prevEl: ".antiVirus-1-button-prev"},
            on: {
              slideChange: () => {
                this._data.antiVirusList[1].swiperIndex = swiperAntiVirusElList[1].swiper.activeIndex
              }
            }
          }
        },
        {
          swiperIndex: 0,
          swiperData: [
            { img: require("../../assets/appshow/android_antiVirus_meizu_5.png"), desc: "打开<span class='highlight'>「腾讯手机管家」</span>后点击<span class='highlight'>「安全检测」</span>" },
            { img: require("../../assets/appshow/android_antiVirus_meizu_6.png"), desc: "在安全检测后点击<span class='highlight'>「处理」</span>" },
            { img: require("../../assets/appshow/android_antiVirus_meizu_7.png"), desc: "继续下一步，点击<span class='highlight'>「移入信任区」</span>" },
            { img: require("../../assets/appshow/android_antiVirus_meizu_8.png"), desc: "点击<span class='highlight'>「确认」</span>后，白名单添加成功，再次杀毒就不会提示了" }
          ],
          options: {
            autoHeight: true,
            grabCursor: true,
            navigation: {nextEl: ".antiVirus-2-button-next", prevEl: ".antiVirus-2-button-prev"},
            on: {
              slideChange: () => {
                this._data.antiVirusList[2].swiperIndex = swiperAntiVirusElList[2].swiper.activeIndex
              }
            }
          }
        },
        {
          swiperIndex: 0,
          swiperData: [
            { img: require("../../assets/appshow/android_antiVirus_meizu_5.png"), desc: "打开<span class='highlight'>「腾讯手机管家」</span>后点击<span class='highlight'>「安全检测」</span>" },
            { img: require("../../assets/appshow/android_antiVirus_meizu_6.png"), desc: "在安全检测后点击<span class='highlight'>「处理」</span>" },
            { img: require("../../assets/appshow/android_antiVirus_meizu_7.png"), desc: "继续下一步，点击<span class='highlight'>「移入信任区」</span>" },
            { img: require("../../assets/appshow/android_antiVirus_meizu_8.png"), desc: "点击<span class='highlight'>「确认」</span>后，白名单添加成功，再次杀毒就不会提示了" }
          ],
          options: {
            autoHeight: true,
            grabCursor: true,
            navigation: {nextEl: ".antiVirus-3-button-next", prevEl: ".antiVirus-3-button-prev"},
            on: {
              slideChange: () => {
                this._data.antiVirusList[3].swiperIndex = swiperAntiVirusElList[3].swiper.activeIndex
              }
            }
          }
        },
        {
          swiperIndex: 0,
          swiperData: [
            { img: require("../../assets/appshow/android_antiVirus_meizu_1.png"), desc: "魅族自带的<span class='highlight'>「手机管家」</span>点击<span class='highlight'>「病毒查杀」</span>" },
            { img: require("../../assets/appshow/android_antiVirus_meizu_2.png"), desc: "检查完成后请点击<span class='highlight'>「隐患应用」</span>，不用点击<span class='highlight'>「立即修复」</span>" },
            { img: require("../../assets/appshow/android_antiVirus_meizu_3.png"), desc: "进入后再点击<span class='highlight'>「受信任的应用」</span>" },
            { img: require("../../assets/appshow/android_antiVirus_meizu_4.png"), desc: "找到xxApp然后勾选点击<span class='highlight'>「确认」</span>即可" },
            { img: require("../../assets/appshow/android_antiVirus_meizu_5.png"), desc: "打开<span class='highlight'>「腾讯手机管家」</span>后点击<span class='highlight'>「安全检测」</span>" },
            { img: require("../../assets/appshow/android_antiVirus_meizu_6.png"), desc: "在安全检测后点击<span class='highlight'>「处理」</span>" },
            { img: require("../../assets/appshow/android_antiVirus_meizu_7.png"), desc: "继续下一步，点击<span class='highlight'>「移入信任区」</span>" },
            { img: require("../../assets/appshow/android_antiVirus_meizu_8.png"), desc: "点击<span class='highlight'>「确认」</span>后，白名单添加成功，再次杀毒就不会提示了" }
          ],
          options: {
            autoHeight: true,
            grabCursor: true,
            navigation: {nextEl: ".antiVirus-4-button-next", prevEl: ".antiVirus-4-button-prev"},
            on: {
              slideChange: () => {
                this._data.antiVirusList[4].swiperIndex = swiperAntiVirusElList[4].swiper.activeIndex
              }
            }
          }
        },
        {
          swiperIndex: 0,
          swiperData: [
            { img: require("../../assets/appshow/android_antiVirus_meizu_5.png"), desc: "打开<span class='highlight'>「腾讯手机管家」</span>后点击<span class='highlight'>「安全检测」</span>" },
            { img: require("../../assets/appshow/android_antiVirus_meizu_6.png"), desc: "在安全检测后点击<span class='highlight'>「处理」</span>" },
            { img: require("../../assets/appshow/android_antiVirus_meizu_7.png"), desc: "继续下一步，点击<span class='highlight'>「移入信任区」</span>" },
            { img: require("../../assets/appshow/android_antiVirus_meizu_8.png"), desc: "点击<span class='highlight'>「确认」</span>后，白名单添加成功，再次杀毒就不会提示了" }
          ],
          options: {
            autoHeight: true,
            grabCursor: true,
            navigation: {nextEl: ".antiVirus-5-button-next", prevEl: ".antiVirus-5-button-prev"},
            on: {
              slideChange: () => {
                this._data.antiVirusList[5].swiperIndex = swiperAntiVirusElList[5].swiper.activeIndex
              }
            }
          }
        }
      ],

      // 在tab之间跳转的配置
      jumpToGuideList: [
        { clickedElement: "toAntiRef", jumpToIndexList: [1, 3], fnMounted: null}
      ]

    }
  },
  watch: {
    visible(bool) {
      if (bool) {
        if (!swiperInstallElList.length && !swiperAntiVirusElList.length) {
          this.findSwiperEl()
        }
        this.jumpExecute()
      }
    }
  },
  methods: {
    /**
     * 动态查找所有swiper
     */
    findSwiperEl() {
      this.$nextTick(() => {
        const installGuideItem = document.getElementsByClassName("install-swiper")
        for (let i = 0; i < installGuideItem.length;i++) {
          swiperInstallElList.push(installGuideItem[i])
        }

        const antiVirusGuideItem = document.getElementsByClassName("antiVirus-swiper")
        for (let i = 0; i < antiVirusGuideItem.length;i++) {
          swiperAntiVirusElList.push(antiVirusGuideItem[i])
        }

      })
    },

    // 绑定引跳事件
    jumpExecute() {
      this.$nextTick(() => {
        for (const item of this.jumpToGuideList) {
          let elementById = document.getElementById(item.clickedElement)
          if (elementById) {
            elementById.addEventListener("click", item.fnMounted = () => {
              this.jumpToGuide(item.jumpToIndexList[0], item.jumpToIndexList[1])
            })
          }
        }
      })
    },

    // 从安装指引跳转到杀毒设置
    jumpToGuide(activeIndex, antiVirusIndex) {
      this.activeName = activeIndex + ""
      this.antiVirusTypeIndex = antiVirusIndex
    },

    close() {
      this.$emit("update:visible", false)
    }
  },
  destroyed () {
    for (const item of this.jumpToGuideList) {
      let elementById = document.getElementById(item.clickedElement)
      if (elementById) {
        elementById.removeEventListener("click", item.fnMounted)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.phone-type {
  background-color: #262933;
  padding-left: 70px;
  display: flex;
  li {
    line-height: 50px;
    font-size: 14px;
    color: #7c839f;
    margin-right: 40px;
    cursor: pointer;
    transition: all 0.3s;
    &:hover, &.active {
      color: #ffffff;
    }
  }
}

.cus-panel {
  margin: 0 60px;
}
.step-desc {
  height: 44px;
  margin: 16.5px 0 77px;
  line-height: 25px;
  font-size: 14px;
  color: #f6f7f7;
  /deep/ .link_primary_2022 {
    text-decoration: underline;
    cursor: pointer;
  }
}
.install-swiper, .antiVirus-swiper {
  .swiper-slide {
    text-align: center;
  }
}
.swiper-button-prev, .swiper-button-next {
  top: 220px;
  width: 28px;
  height: 44px;
  opacity: 0.4;
  transition: all 0.3s;
  &:after {
    display: none;
  }
  &:hover {
    opacity: 1;
  }
  &.swiper-button-disabled {
    transition: all 0s;
    opacity: 0;
  }
}
.swiper-button-prev {
  left: 0;
  transform: translateX(0px);
  background: url("../../assets/index/banner_left.png");
}
.swiper-button-next {
  right: 0;
  transform: translateX(0px);
  background: url("../../assets/index/banner_right.png");
}
</style>
