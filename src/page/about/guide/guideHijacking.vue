<template>
  <div class="guide_section guide-hijacking">
    <div class="section_s">

      <div class="section_title">威客防劫持教程</div>

      <div class="section_s_c">
        <p style="margin: 13px 0 20px">选择正在使用的网络连接，修改DNS设置。推荐使用：首选DNS服务器：<span>114.114.114.114</span>；备选DNS服务器：<span>8.8.8.8</span>。</p>
      </div>

      <el-tabs v-model="activeName">
        <el-tab-pane v-for="(item, index) in hijackingData" :key="index" :label="item.label" :name="`${index}`">
          <div class="section_s_c">

            <template v-if="activeName !== '4'">
              <div v-for="(row, i) in item.guideList" :key="i">
                <p>{{i + 1}}. <small v-html="row.desc"></small></p>
                <div class="img_box">
                  <img :src="row.img" alt="">
                </div>
              </div>
            </template>

            <template v-else>
              <el-tabs v-model="loggerActiveName" class="child-tabs">
                <el-tab-pane v-for="(row, i) in item.guideList" :key="i" :label="row.label" :name="`${i}`">
                  <div class="section_s_c">

                    <div v-for="(loggerItem, loggerI) in row.guideList" :key="loggerI">
                      <p>{{loggerI + 1}}. <small v-html="loggerItem.desc"></small></p>
                      <div v-if="loggerItem.img" class="img_box">
                        <img :src="loggerItem.img" alt="">
                      </div>
                    </div>

                  </div>
                </el-tab-pane>
              </el-tabs>
            </template>

          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "guideHijacking",
  data() {
    return {
      activeName: "0",
      loggerActiveName: "0",

      hijackingData: [
        {
          label: "Windows系统教程",
          guideList: [
            {
              img: require("../../../assets/guide/hijacking_windows_image1.png"),
              desc: "点击电脑右下角Internet图标，在弹出窗口后，打开窗口内的“<span>网络和Internet设置</span>”。"
            },
            {
              img: require("../../../assets/guide/hijacking_windows_image2.png"),
              desc: "在高级网络设置下，打开“<span>更改适配器选项</span>” 。"
            },
            {
              img: require("../../../assets/guide/hijacking_windows_image3.png"),
              desc: "从列表中选择想要修改或当前正在使用的网络连接服务（例如 WI-FI 或以太网），然后双击打开。"
            },
            {
              img: require("../../../assets/guide/hijacking_windows_image4.png"),
              desc: "选择“<span>属性</span>”。"
            },
            {
              img: require("../../../assets/guide/hijacking_windows_image5.png"),
              desc: "双击打开“<span>Internet协议版本4（TCP/IPv4）</span>”。"
            },
            {
              img: require("../../../assets/guide/hijacking_windows_image6.png"),
              desc: "选择“<span>使用下面的DNS服务器地址</span>”，在首选和备用DNS服务器栏目中分别输入“<span>114.114.114.114</span>”、“<span>8.8.8.8</span>”即可。”。"
            }
          ]
        },
        {
          label: "MacOS系统教程",
          guideList: [
            {
              img: require("../../../assets/guide/hijacking_mac_image1.png"),
              desc: "在苹果菜单选择 “<span>系统偏好设置</span>”。"
            },
            {
              img: require("../../../assets/guide/hijacking_mac_image2.png"),
              desc: "单击 “<span>网络</span>” 图标。"
            },
            {
              img: require("../../../assets/guide/hijacking_mac_image3.png"),
              desc: "从列表中选择想要修改或当前正在使用的网络连接服务（例如 WI-FI 或以太网），然后点击 “<span>高级</span>”。"
            },
            {
              img: require("../../../assets/guide/hijacking_mac_image4.png"),
              desc: "选择 DNS 标签，单击 “<span>DNS 服务器</span>” 左下角的 “<span>+</span>”，添加 <span>114.114.114.114</span> 和 <span>8.8.8.8</span>，然后单击右下角的 “<span>好</span>”。"
            }
          ]
        },
        {
          label: "Android系统教程",
          guideList: [
            {
              img: require('../../../assets/guide/hijacking_android_image1.png'),
              desc: '打开手机，点击“<span>设置</span>”应用程序。'
            },
            {
              img: require('../../../assets/guide/hijacking_android_image2.png'),
              desc: '点击“<span>Wi-Fi</span>”进入Wi-Fi列表，并选择连接上可用的Wi-Fi网络。'
            },
            {
              img: require('../../../assets/guide/hijacking_android_image3.png'),
              desc: '连接上可用的Wi-Fi网络后，然后点击Wi-Fi网络名称右方的“<span>箭头</span>”按钮进入网络详情。'
            },
            {
              img: require('../../../assets/guide/hijacking_android_image4.png'),
              desc: '在该Wi-Fi网络详情部分找到“<span>IP设置</span>”，点击设置为“<span>静态</span>”。'
            },
            {
              img: require('../../../assets/guide/hijacking_android_image5.png'),
              desc: '分别将“<span>DNS1</span>”和“<span>DNS2</span>”设置为“<span>114.114.114.114</span>”、“<span>8.8.8.8</span>”，然后点击“<span>保存</span>”即可。'
            }
          ]
        },
        {
          label: "iOS系统教程",
          guideList: [
            {
              img: require('../../../assets/guide/hijacking_ios_image1.png'),
              desc: '打开手机，点击“<span>设置</span>”应用程序。'
            },
            {
              img: require('../../../assets/guide/hijacking_ios_image2.png'),
              desc: '点击“<span>Wi-Fi</span>”进入Wi-Fi列表，并选择连接上可用的Wi-Fi网络。'
            },
            {
              img: require('../../../assets/guide/hijacking_ios_image3.png'),
              desc: '连接上可用的Wi-Fi网络后，然后点击Wi-Fi网络名称右方的“<span>显示信息</span>”按钮（字母“<span>i</span>”）。'
            },
            {
              img: require('../../../assets/guide/hijacking_ios_image4.png'),
              desc: '在该Wi-Fi网络详情部分向下滚动，找到“<span>配置DNS</span>”。'
            },
            {
              img: require('../../../assets/guide/hijacking_ios_image5.png'),
              desc: '配置DNS设置选择“<span>手动</span>”，然后点击“<span>添加服务器</span>”。'
            },
            {
              img: require('../../../assets/guide/hijacking_ios_image6.png'),
              desc: '在此输入“<span>114.114.114.114</span>”后点击“<span>存储</span>”。'
            }
          ]
        },
        {
          label: "登录器安装教程",
          guideList: [
            {
              label: "Windows教程",
              guideList: [
                {
                  img: require('../../../assets/guide/logger_window_1.png'),
                  desc: '请在VKGAME官方网址主页的“威客登录器”选择点击 “<span>Windows下载</span>”；'
                },
                {
                  img: require('../../../assets/guide/logger_window_2.png'),
                  desc: '下载成功后，打开安装包，完成安装；'
                },
                {
                  img: require('../../../assets/guide/logger_window_3.png'),
                  desc: '根据系统提示按步骤进行操作，单击“<span>下一步(N)</span>”继续，或单击“取消”退出安装向导，以单击“下一步(N)”为例；'
                },
                {
                  img: require('../../../assets/guide/logger_window_4.png'),
                  desc: '选择安装文件夹，若安装至此文件夹，请单击“<span>下一步(N)</span>”，要安装到不同文件夹，请在下面输入或单击“浏览”按钮；'
                },
                {
                  img: require('../../../assets/guide/logger_window_5.png'),
                  desc: '单击“<span>下一步(N)</span>”开始安装。如果您想复查或更改您的安装设置，单击“上一步”，或单击“取消”退出向导；'
                },
                {
                  img: require('../../../assets/guide/logger_window_6.png'),
                  desc: '安装成功后，即可单击“<span>关闭(C)</span>”退出，在桌面启动威客登录器。'
                }
              ]
            },
            {
              label: "MacOS教程",
              guideList: [
                {
                  img: require('../../../assets/guide/logger_mac_1.png'),
                  desc: '请在VKGAME官方网址主页的“威客登录器”选择点击 <span>MacOS下载</span>；'
                },
                {
                  img: require('../../../assets/guide/logger_mac_2.png'),
                  desc: '当首次在Mac系统打开"威客登录器"时，若收到“无法打开来源不明程序“的提醒，这是由于电脑系统设置，无法打开与安装不是从官方AppStore下载的程序。请按照以下步骤修改系统设置。'
                },
                {
                  img: require('../../../assets/guide/logger_mac_3.png'),
                  desc: '打开系统偏好设置，找到“<span>安全性与隐私</span>”；'
                },
                {
                  img: require('../../../assets/guide/logger_mac_4.png'),
                  desc: '进入安全性与隐私，点击右下角的解锁按钮，选择允许从<span>任何来源</span>；'
                },
                {
                  desc: '如果没有这一选项，请到打开终端，输入命令行：<span>sudo spctl --master-disable</span>, 输入命令后回车，系统会要求输入电脑的开机密码， 输入密码(输入时密码不会显示出来）后回车；'
                },
                {
                  img: require('../../../assets/guide/logger_mac_6.png'),
                  desc: '返回“安全性与隐私”，就可以看到任何来源选项了。勾选后即可打开<span>威客登录器</span>。'
                }
              ]
            },
            {
              label: "Android教程",
              guideList: [
                {
                  desc: '请在VKGAME官方网址主页的“威客登录器”选择 <span>Android系统扫码下载</span>；'
                },
                {
                  img: require('../../../assets/guide/logger_android_2.png'),
                  desc: '下载成功后，打开安装包，完成安装即可启动 威客登录器。'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  mounted () {
    this.$emit("guideHijackingBack")
  }
}
</script>

<style lang="less" scoped>
.guide-hijacking {
  .el-tabs {
    /deep/ .el-tabs__header {
      margin: 0;
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
  /deep/ .section_s_c {
    p {
      margin: 40px 0 20px;
      small {
        font-size: 14px;
      }
      span {
        color: #ffffff;
      }
    }
  }

  /deep/ .child-tabs {
    .el-tabs__header {
      &:before {
        display: none;
      }
      .el-tabs__active-bar {
        height: 0;
      }
      .el-tabs__item {
        color: #7c839f;
        &.is-active {
          color: #ffffff;
        }
      }
    }
    .section_s_c {
      &>div {
        &:first-child {
          p {
            margin: 5px 0 20px;
          }
        }
      }
    }
  }
}
</style>
