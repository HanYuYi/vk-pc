<template>
  <el-dialog
    :visible.sync="visible"
    custom-class="guide_dialog ios"
    :close-on-click-modal="false"
    :append-to-body="true"
    :before-close="close">

    <div class="dialog_title" slot="title">iOS安装指引</div>

    <el-tabs v-model="activeName">
      <el-tab-pane label="首次安装" name="0" class="cus-panel">

        <div class="step-desc">{{ firstSwiperIndex + 1 }}. <span v-html="firstSwiperData[firstSwiperIndex].desc"></span></div>

        <swiper class="first-swiper" :options="mySwiperFirstOptions">
          <swiper-slide v-for="(item, index) in firstSwiperData" :key="index">
            <img :src="item.img" alt="">
          </swiper-slide>

          <div class="swiper-button-prev first-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next first-button-next" slot="button-next"></div>
        </swiper>
      </el-tab-pane>

      <el-tab-pane label="非首次安装" name="1" class="cus-panel">

        <div class="step-desc">{{ otherSwiperIndex + 1 }}. <span v-html="otherSwiperData[otherSwiperIndex].desc"></span></div>

        <swiper class="other-swiper" :options="mySwiperOtherOptions">
          <swiper-slide v-for="(item, index) in otherSwiperData" :key="index">
            <img :src="item.img" alt="">
          </swiper-slide>

          <div class="swiper-button-prev other-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next other-button-next" slot="button-next"></div>
        </swiper>
      </el-tab-pane>
    </el-tabs>

  </el-dialog>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper"
import "swiper/css/swiper.css"

const swiperEl = document.getElementsByClassName("first-swiper")
const swiperOtherEl = document.getElementsByClassName("other-swiper")

export default {
  name: "ios-guide",
  props: ["visible"],
  components: { Swiper, SwiperSlide },
  data() {
    return {
      activeName: "0",

      firstSwiperIndex: 0,
      firstSwiperData: [
        { img: require("../../assets/appshow/ios_first_1.png"),  desc: "点击下载威客电竞APP，在IOS中运行超级签名的应用时，会弹出这样的提示：" },
        { img: require("../../assets/appshow/ios_first_2.png"),  desc: "若要运行应用，可以按照下面的步骤来设置。在系统中打开 <span class='highlight'>设置 - 通用 - 设备管理</span>。然后，点击对应描述文件进入后，再点击安装，根据提示完成安装描述文件即可。如图所示：" },
        { img: require("../../assets/appshow/ios_first_3.png"),  desc: "返回到APP下载页面，<span class='highlight'>点击安装</span>，即可成功安装威客电竞APP。" }
      ],
      mySwiperFirstOptions: {
        autoHeight: true,
        grabCursor: true,
        navigation: { nextEl: ".first-button-next", prevEl: ".first-button-prev" },
        on: {
          slideChange: () => {
            this.firstSwiperIndex = swiperEl[0].swiper.activeIndex
          }
        }
      },

      otherSwiperIndex: 0,
      otherSwiperData: [
        { img: require("../../assets/appshow/ios_other_1.png"),  desc: "若用户之前安装过威客电竞APP，当再次安装时，会提示以下信息，如图所示：" },
        { img: require("../../assets/appshow/ios_other_2.png"),  desc: "用户需要在系统中打开 <span class='highlight'>设置 - 通用 - 设备管理</span>。然后，点击对应描述文件进入后，再点击移除管理，即可删除旧版本的超级签名描述文件。如图所示：" },
        { img: require("../../assets/appshow/ios_other_3.png"),  desc: "再次下载威客电竞APP，并在系统中打开 <span class='highlight'>设置 - 通用 - 设备管理</span>。然后，点击对应描述文件进入后，再点击安装，根据提示完成安装描述文件即可。如图所示：" },
        { img: require("../../assets/appshow/ios_other_4.png"),  desc: "返回到APP下载页面，<span class='highlight'>点击安装</span>，即可成功安装威客电竞APP。 " }
      ],
      mySwiperOtherOptions: {
        autoHeight: true,
        grabCursor: true,
        navigation: { nextEl: ".other-button-next", prevEl: ".other-button-prev" },
        on: {
          slideChange: () => {
            this.otherSwiperIndex = swiperOtherEl[0].swiper.activeIndex
          }
        }
      }
    }
  },
  methods: {
    close() {
      this.$emit("update:visible", false)
    }
  }
}
</script>

<style lang="less" scoped>
.cus-panel {
  margin: 0 60px;
}
.step-desc {
  height: 60px;
  margin: 16.5px 0 50.5px;
  line-height: 41px;
  font-size: 14px;
  color: #f6f7f7;
}
.first-swiper, .other-swiper {
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
