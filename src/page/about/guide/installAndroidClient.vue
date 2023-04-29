<template>
  <div class="guide_section android-install">
    <div class="section_s">
      <div class="section_title">Android安装指引</div>
      <el-tabs v-model="activeName">
        <el-tab-pane v-for="(item, index) in androidInstallData" :key="index" :label="item.label" :name="`${index}`">

          <ul class="phone-type">
            <li v-for="(val, i) in phoneTypeList" :key="i" @click="androidInstallData[index].typeIndex = i" :class="{active: item.typeIndex === i}">{{ val }}</li>
          </ul>

          <div class="section_s_c">
            <div v-for="(arr, i) in item.guideList" :key="i">
              <div v-for="(obj, oI) in arr" :key="oI" v-show="item.typeIndex === i">
                <p>{{oI + 1}}.<span v-html="obj.desc"></span></p>
                <div class="img_box">
                  <img :src="obj.img" alt="">
                </div>
              </div>
            </div>
          </div>

        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'installAndroidClient',
  data() {
    return {
      activeName: "0",

      phoneTypeList: ["华为手机 ", "VIVO手机", "OPPO手机", "小米手机", " 魅族手机", "其它手机"],

      androidInstallData: [
        {
          label: "安装指引",
          typeIndex: 0,
          guideList: [
            [
              { img: require("../../../assets/appshow/android_install_hw_1.png"), desc: "下载后会弹出风险框，请不用担心，本APP没有任何病毒，请点击<span class='highlight'>「暂不处理」</span>" },
              { img: require("../../../assets/appshow/android_install_hw_2.png"), desc: "安装后打开<span class='highlight'>「信任此应用」</span>即可" },
              { img: require("../../../assets/appshow/android_install_hw_3.png"), desc: "华为自带的「手机管家」中会检测出敏感内容，由于本APP中包含博弈内容所致，请放心使用" }
            ],
            [
              { img: require("../../../assets/appshow/android_install_vivo_1.png"), desc: "下载后会弹出风险框，请点击<span class='highlight'>「继续安装」</span>" },
              { img: require("../../../assets/appshow/android_install_vivo_2.png"), desc: "在<span class='highlight'>「高风险提示」</span>弹框出現后点击安裝，如沒有安裝，请重复第一步并点击<span class='highlight'>「忽略风险并安裝」</span>" }
            ],
            [
              { img: require("../../../assets/appshow/android_install_oppo_1.png"), desc: "下载后会弹出「发现病毒」，请不用担心，本APP没有任何病毒，请点击<span class='highlight'>「无视风险安装」</span>" },
              { img: require("../../../assets/appshow/android_install_oppo_2.png"), desc: "OPPO自带的「安全卫士」中会检测出敏感内容，由于本APP中包含博弈内容所致，请放心使用" }
            ],
            [
              { desc: "小米手机在正常安装情况下不会提示病毒，但下载后我们还是需在腾讯手机管家里把本App添加到信任区 <span id='toAntiRef' class='link_primary_2022'>查看小米杀毒设置</span>" }
            ],
            [
              { img: require("../../../assets/appshow/android_install_meizu_1.png"), desc: "下载后会弹出「发现危险」，请不用担心，本APP没有任何病毒，请点击<span class='highlight'>「仍要安装」</span>" }
            ],
            [
              { img: require("../../../assets/appshow/android_install_other_1.png"), desc: "下载前请先至<span class='highlight'>「设置」 「安全性」</span>" },
              { img: require("../../../assets/appshow/android_install_other_2.png"), desc: "开启<span class='highlight'>「不明的来源」</span>，并执行<span class='highlight'>「确定」</span>" }
            ]
          ]
        },
        {
          label: "杀毒设置",
          typeIndex: 0,
          guideList: [
            [
              { img: require("../../../assets/appshow/android_antiVirus_meizu_5.png"), desc: "打开<span class='highlight'>「腾讯手机管家」</span>后点击<span class='highlight'>「安全检测」</span>" },
              { img: require("../../../assets/appshow/android_antiVirus_meizu_6.png"), desc: "在安全检测后点击<span class='highlight'>「处理」</span>" },
              { img: require("../../../assets/appshow/android_antiVirus_meizu_7.png"), desc: "继续下一步，点击<span class='highlight'>「移入信任区」</span>" },
              { img: require("../../../assets/appshow/android_antiVirus_meizu_8.png"), desc: "点击<span class='highlight'>「确认」</span>后，白名单添加成功，再次杀毒就不会提示了" }
            ],
            [
              { img: require("../../../assets/appshow/android_antiVirus_meizu_5.png"), desc: "打开<span class='highlight'>「腾讯手机管家」</span>后点击<span class='highlight'>「安全检测」</span>" },
              { img: require("../../../assets/appshow/android_antiVirus_meizu_6.png"), desc: "在安全检测后点击<span class='highlight'>「处理」</span>" },
              { img: require("../../../assets/appshow/android_antiVirus_meizu_7.png"), desc: "继续下一步，点击<span class='highlight'>「移入信任区」</span>" },
              { img: require("../../../assets/appshow/android_antiVirus_meizu_8.png"), desc: "点击<span class='highlight'>「确认」</span>后，白名单添加成功，再次杀毒就不会提示了" }
            ],
            [
              { img: require("../../../assets/appshow/android_antiVirus_meizu_5.png"), desc: "打开<span class='highlight'>「腾讯手机管家」</span>后点击<span class='highlight'>「安全检测」</span>" },
              { img: require("../../../assets/appshow/android_antiVirus_meizu_6.png"), desc: "在安全检测后点击<span class='highlight'>「处理」</span>" },
              { img: require("../../../assets/appshow/android_antiVirus_meizu_7.png"), desc: "继续下一步，点击<span class='highlight'>「移入信任区」</span>" },
              { img: require("../../../assets/appshow/android_antiVirus_meizu_8.png"), desc: "点击<span class='highlight'>「确认」</span>后，白名单添加成功，再次杀毒就不会提示了" }
            ],
            [
              { img: require("../../../assets/appshow/android_antiVirus_meizu_5.png"), desc: "打开<span class='highlight'>「腾讯手机管家」</span>后点击<span class='highlight'>「安全检测」</span>" },
              { img: require("../../../assets/appshow/android_antiVirus_meizu_6.png"), desc: "在安全检测后点击<span class='highlight'>「处理」</span>" },
              { img: require("../../../assets/appshow/android_antiVirus_meizu_7.png"), desc: "继续下一步，点击<span class='highlight'>「移入信任区」</span>" },
              { img: require("../../../assets/appshow/android_antiVirus_meizu_8.png"), desc: "点击<span class='highlight'>「确认」</span>后，白名单添加成功，再次杀毒就不会提示了" }
            ],
            [
              { img: require("../../../assets/appshow/android_antiVirus_meizu_1.png"), desc: "魅族自带的<span class='highlight'>「手机管家」</span>点击<span class='highlight'>「病毒查杀」</span>" },
              { img: require("../../../assets/appshow/android_antiVirus_meizu_2.png"), desc: "检查完成后请点击<span class='highlight'>「隐患应用」</span>，不用点击<span class='highlight'>「立即修复」</span>" },
              { img: require("../../../assets/appshow/android_antiVirus_meizu_3.png"), desc: "进入后再点击<span class='highlight'>「受信任的应用」</span>" },
              { img: require("../../../assets/appshow/android_antiVirus_meizu_4.png"), desc: "找到xxApp然后勾选点击<span class='highlight'>「确认」</span>即可" },
              { img: require("../../../assets/appshow/android_antiVirus_meizu_5.png"), desc: "打开<span class='highlight'>「腾讯手机管家」</span>后点击<span class='highlight'>「安全检测」</span>" },
              { img: require("../../../assets/appshow/android_antiVirus_meizu_6.png"), desc: "在安全检测后点击<span class='highlight'>「处理」</span>" },
              { img: require("../../../assets/appshow/android_antiVirus_meizu_7.png"), desc: "继续下一步，点击<span class='highlight'>「移入信任区」</span>" },
              { img: require("../../../assets/appshow/android_antiVirus_meizu_8.png"), desc: "点击<span class='highlight'>「确认」</span>后，白名单添加成功，再次杀毒就不会提示了" }
            ],
            [
              { img: require("../../../assets/appshow/android_antiVirus_meizu_5.png"), desc: "打开<span class='highlight'>「腾讯手机管家」</span>后点击<span class='highlight'>「安全检测」</span>" },
              { img: require("../../../assets/appshow/android_antiVirus_meizu_6.png"), desc: "在安全检测后点击<span class='highlight'>「处理」</span>" },
              { img: require("../../../assets/appshow/android_antiVirus_meizu_7.png"), desc: "继续下一步，点击<span class='highlight'>「移入信任区」</span>" },
              { img: require("../../../assets/appshow/android_antiVirus_meizu_8.png"), desc: "点击<span class='highlight'>「确认」</span>后，白名单添加成功，再次杀毒就不会提示了" }
            ]
          ]
        }
      ],

      // 在Android安装指引之间跳转的配置
      jumpToGuideList: [
        { clickedElement: "toAntiRef", jumpToIndexList: [1, 3], fnMounted: null}
      ]
    }
  },
  mounted () {
    this.jumpExecute()
  },
  methods: {
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
      this.androidInstallData[1].typeIndex = antiVirusIndex
    },
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
.android-install {
  /deep/ .highlight {
    color: #07f1b7;
  }
  .el-tabs {
    /deep/ .el-tabs__header {
      .el-tabs__active-bar {
        height: 4px;
        background-image: linear-gradient(to right, #07e9f1, #07f1b7);
      }

      .el-tabs__item {
        font-size: 18px;
        height: 68px;
        line-height: 68px;
      }

      &:before {
        content: "";
        position: absolute;
        bottom: 0;
        left: -60px;
        width: 945px;
        height: 1px;
        background-color: #17191f;
      }
    }
    .el-tabs__content {
      .phone-type {
        background-color: #262933;
        padding-left: 8px;
        display: flex;
        li {
          line-height: 48px;
          font-size: 18px;
          color: #7c839f;
          margin-right: 40px;
          cursor: pointer;
          transition: all 0.3s;
          &:hover, &.active {
            color: #ffffff;
          }
        }
      }
    }
  }
  .section_s {
    p {
      /deep/ .link_primary_2022 {
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
}
</style>
