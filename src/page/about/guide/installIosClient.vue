<template>
  <div class="guide_section ios-install">
    <div class="section_s">
      <div class="section_title">IOS安装指引</div>
      <el-tabs v-model="activeName">
        <el-tab-pane v-for="(item, index) in iosInstallData" :key="index" :label="item.label" :name="`${index}`">
          <div class="section_s_c">
            <div v-for="(row, i) in item.guideList" :key="i">
              <p>{{i + 1}}.<span v-html="row.desc"></span></p>
              <div class="img_box">
                <img :src="row.img" alt="">
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
  name: 'installIosClient',
  data() {
    return {
      activeName: "0",
      iosInstallData: [
        {
          label: "首次安装",
          guideList: [
            { img: require("../../../assets/appshow/ios_first_1.png"),  desc: "点击下载威客电竞APP，在IOS中运行超级签名的应用时，会弹出这样的提示：" },
            { img: require("../../../assets/appshow/ios_first_2.png"),  desc: "若要运行应用，可以按照下面的步骤来设置。在系统中打开 <span class='highlight'>设置 - 通用 - 设备管理</span>。然后，点击对应描述文件进入后，再点击安装，根据提示完成安装描述文件即可。如图所示：" },
            { img: require("../../../assets/appshow/ios_first_3.png"),  desc: "返回到APP下载页面，<span class='highlight'>点击安装</span>，即可成功安装威客电竞APP。 " }
          ]
        },
        {
          label: "非首次安装",
          guideList: [
            { img: require("../../../assets/appshow/ios_other_1.png"),  desc: "若用户之前安装过威客电竞APP，当再次安装时，会提示以下信息，如图所示：" },
            { img: require("../../../assets/appshow/ios_other_2.png"),  desc: "用户需要在系统中打开 <span class='highlight'>设置 - 通用 - 设备管理</span>。然后，点击对应描述文件进入后，再点击移除管理，即可删除旧版本的超级签名描述文件。如图所示：" },
            { img: require("../../../assets/appshow/ios_other_3.png"),  desc: "再次下载威客电竞APP，并在系统中打开 <span class='highlight'>设置 - 通用 - 设备管理</span>。然后，点击对应描述文件进入后，再点击安装，根据提示完成安装描述文件即可。如图所示：" },
            { img: require("../../../assets/appshow/ios_other_4.png"),  desc: "返回到APP下载页面，<span class='highlight'>点击安装</span>，即可成功安装威客电竞APP。 " }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.ios-install {
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
  }
}
</style>
