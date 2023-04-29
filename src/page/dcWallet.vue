<template>
  <div class="dc-wallet">

    <dl class="video-tutorial">
      <dt></dt>
      <dd>
        <div ref="videoTutorialRef" class="video-wrapper"></div>
      </dd>
    </dl>

    <dl class="advantage">
      <dt></dt>
      <dd>
        <ul>
          <li v-for="(item, index) in advantageList" :key="index">
            <i :style="{backgroundImage: `url(${item.icon})`}"></i>
            <h4>{{ item.title }}</h4>
            <p v-html="item.desc"></p>
          </li>
        </ul>
      </dd>
    </dl>

    <div class="dc-back-active">
      <router-link to="/active" />
    </div>
  </div>
</template>

<script>
import 'dplayer/dist/DPlayer.min.css'
import DPlayer from 'dplayer'

export default {
  name: 'dcWallet',
  data() {
    return {
      dplayerHolder: null,
      advantageList: [
        { icon: require("../assets/dcWallet/advantage_1.png"), title: "稳定代币", desc: "锚定USDT, 帮助用户实现RMB与数字货币的双向兑换，自由参与数字资产交易与投资。" },
        { icon: require("../assets/dcWallet/advantage_2.png"), title: "资金安全", desc: "DC钱包采用金融级别运维风控系统，多维防护，确保资产安全。" },
        { icon: require("../assets/dcWallet/advantage_3.png"), title: "全球通用", desc: "USDT币使用区块链技术具有高度匿名的特性，交易无迹可寻；世界范围内已有上千家大型商户支持USDT币，全球支付无障碍。" },
        { icon: require("../assets/dcWallet/advantage_4.png"), title: "去中心化", desc: "RMB与USDT兑换，从平台提至DC钱包，有效保护银行卡流水，确保资金链不受银行风控，保护个人银行卡及资产安全。" },
        { icon: require("../assets/dcWallet/advantage_5.png"), title: "简单 安全", desc: "遵从“极致简单”的产品设计理念，小白用户也能快速入手。<br>多重保护技术保障您的数字资产安全，放心管理您的钱包。" },
        { icon: require("../assets/dcWallet/advantage_6.png"), title: "丰富优惠", desc: "丰富的活动内容，享受良好使用体验的同时领取各类豪礼。<br>7x24H在线客服 随时解答您的问题，为您的流畅使用保驾护航。" },
        { icon: require("../assets/dcWallet/advantage_7.png"), title: "省心", desc: "不存在任何第三方费用，提币手续费用远低于各类型交易所。<br>严格的风控和24小时人工服务，为您打造无扰OTC交易环境。" },
        { icon: require("../assets/dcWallet/advantage_8.png"), title: "极速", desc: "全新模式与强大生态伙伴，为您带来未曾有过的交易速度。" },
      ]
    }
  },
  mounted () {
    this.initVideoTutorial()
  },
  methods: {
    initVideoTutorial() {
      this.$nextTick(() => {
        const videoContainer = this.$refs.videoTutorialRef
        this.dplayerHolder = new DPlayer({
          container: videoContainer,
          theme: "#07f1b7",
          video: {
            url: "/static/video/dc.mp4"
          }
        })

        this.dplayerHolder.on("resize", () => {
          if ([...videoContainer.classList].includes("dplayer-fulled")) {
            videoContainer.classList.add("full-screen")
          } else  {
            videoContainer.classList.remove("full-screen")
          }
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.dc-wallet {
  background-image: url("../assets/dcWallet/banner.jpg"),
    url("../assets/dcWallet/bg.jpg");
  background-repeat: no-repeat, no-repeat;
  background-position: center top, center 789px;
  overflow: hidden;

  .video-tutorial {
    margin-top: 789px;
    overflow: hidden;
    dt {
      margin-top: 67px;
      height: 118px;
      background: url("../assets/dcWallet/tutorial_title.png") no-repeat center top;
    }
    dd {
      margin: 10px auto 0;
      width: 884px;
      height: 524px;
      background: url("../assets/dcWallet/video_bg.png") no-repeat center top;
      overflow: hidden;
      .video-wrapper {
        width: 822px;
        height: 462px;
        margin: 34px auto 0;

        /deep/ video {
          object-fit: contain;
        }

        &.full-screen {
          width: 100%;
          height: 100%;
          margin: 0 auto 0;
        }
        /deep/ .dplayer-menu {
          width: 0;
          pointer-events: none;
        }
      }
    }
  }

  .advantage {
    margin-top: 62px;
    dt {
      height: 118px;
      background: url("../assets/dcWallet/advantage_title.png") no-repeat center top;
    }
    dd {
      ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 1240px;
        margin: 40px auto 0;
        li {
          margin-bottom: 15px;
          width: 300px;
          height: 370px;
          background: url("../assets/dcWallet/advantage_bg.png") no-repeat;
          i {
            display: block;
            height: 184px;
            background-repeat: no-repeat;
            background-position: center center;
          }
          h4 {
            font-size: 28px;
            line-height: 28px;
            text-align: center;
            color: #fff;
          }
          p {
            margin: 18px 24px 0;
            font-size: 14px;
            line-height: 28px;
            color: #9698d6;
          }
        }
      }
    }
  }

  .dc-back-active {
    text-align: center;
    padding: 34px 0 49px 0;
    a {
      display: inline-block;
      width: 197px;
      height: 67px;
      background: url("../assets/dcWallet/back_active.png") no-repeat;
      transition: transform 0.3s;
      &:hover {
        transform: scale(1.03, 1.03);
      }
    }
  }
}
</style>
