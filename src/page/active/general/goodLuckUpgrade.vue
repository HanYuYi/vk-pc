<template>
  <div class="virtual-deposit">
    <el-button-group class="active-tab">
      <el-button @click="activeIndex = 1"  :class="{actived: activeIndex=== 1}" type="primary">充值添彩头</el-button>
      <el-button @click="activeIndex = 2"  :class="{actived: activeIndex=== 2}" type="primary">虚拟币存款教程</el-button>
      <el-button @click="activeIndex = 3"  :class="{actived: activeIndex=== 3}" type="primary">虚拟币买币教程</el-button>
    </el-button-group>

    <!-- 充值添彩头活动-->
    <goodLuckUpgradeActive v-show="activeIndex === 1"></goodLuckUpgradeActive>

    <div v-show="activeIndex === 2 || activeIndex === 3" class="guide-panel">
      <h2>本教程以威客App及欧易App为例，<a href="https://www.okex.com" target="_blank">下载欧易App</a></h2>
      <h2>如需了解其他虚拟币平台，请<router-link to="/guide/16-1">点击查看更多</router-link></h2>

      <!-- 虚拟币存款教程-->
      <goodLuckUpgradeGuide v-if="activeIndex === 2"></goodLuckUpgradeGuide>
      <!-- 虚拟币买币教程-->
      <goodLuckUpgradeBuy v-if="activeIndex === 3"></goodLuckUpgradeBuy>

      <!-- 注意事项-->
      <dl class="note">
        <dt>【注意事项】</dt>
        <dd>
          <ul>
            <li>操作时请尽快完成[购买USDT]与[平台USDT存款]步骤，以免长时间未完成操作导致二维码失效。</li>
            <li>请购买与存款页面所相对应的USDT类型，如在存款页面选择ERC20则购买时也选择ERC20，不同类型转账将导致失败。</li>
            <li>转出时需要支付少量手续费，请在买币前联系对应交易平台客服了解手续费数量。</li>
            <li>若三次取消交易当日将无法再进行买入。</li>
            <li>如遇交易平台无法打开时建议尝试更换浏览器或开启VPN进行操作。</li>
            <li>进行任意交易前请确认好信息。</li>
            <li>本使用说明为热门交易平台功能介绍，不负责担保任何交易结果，使用中若遇到操作、账户类的问题，请在交易平台[帮助中心]联系[在线客服]。</li>
            <li>若交易平台的内容有所变更，一切以交易平台官方信息为准。</li>
          </ul>
        </dd>
      </dl>

      <!-- 虚拟币相关内容-->
      <div class="guide-footer">
        <div class="related">
          <dl>
            <dt></dt>
            <dd>
              <ul>
                <li v-for="(item, index) in guideRouter" :key="index" :style="{'background-position': `${item.x}px ${item.y}px`}">
                  <router-link :to="item.url"></router-link>
                </li>
              </ul>
            </dd>
          </dl>
        </div>
        <div class="back-container">
          <router-link to="/active"><el-button type="primary" round>返回活动首页</el-button></router-link>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import goodLuckUpgradeActive from './goodLuckUpgradeActive'
import goodLuckUpgradeGuide from './goodLuckUpgradeGuide'
import goodLuckUpgradeBuy from './goodLuckUpgradeBuy'

export default {
  name: 'goodLuckUpgrade',
  components: { goodLuckUpgradeActive, goodLuckUpgradeGuide, goodLuckUpgradeBuy },
  data () {
    return {
      activeIndex: 1,
      guideRouter: [
        {x: -165, y: -92, url: '/guide/16-1'},
        {x: -431, y: -92, url: '/guide/16-2'},
        {x: -165, y: -175, url: '/guide/16-3'},
        {x: -431, y: -175, url: '/guide/16-4'},
        {x: -165, y: -258, url: '/guide/16-5'}
      ]
    }
  }
}
</script>

<style lang="less">
//返回活动首页公共样式
.back-container {
  padding: 40px 0;
  text-align: center;
  .el-button {
    width: 294px;
    height: 72px;
    background: none;
    background-image: linear-gradient(to bottom, #46d4af, #50a08b);
    font-size: 18px;
    border-radius: 36px;
    color: #3a4040;
    &:hover {
      background-image: linear-gradient(to bottom, #51ecc3, #5cb8a0);
    }
  }
}
//教程公共样式
.guide-container {
  width: 1086px;
  margin: 30px auto 0;
  h1 {
    height: 78px;
    line-height: 78px;
    background-image: linear-gradient(to right, #4da58c, #32705f);
    text-align: center;
    font-size: 18px;
    color: #ffffff;
  }
  .guide-main {
    box-sizing: border-box;
    border: solid 1px #c8c8c8;
    background-color: #ffffff;
    position: relative;
    padding-bottom: 20px;
    .my-swiper {
      //height: 542px;
      height: 692px;
      .guide-content {
        height: inherit;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          //width: 222px;
          width: 290px;
          margin: 0 20px;
          box-shadow: 0 5px 10px 0 rgba(2, 27, 12, 0.35);
          &.radius {
            border-radius: 27px;
          }
        }
      }
    }
    .step-desc {
      width: 910px;
      margin: 0 auto;
      font-size: 14px;
      line-height: 22px;
      color: #717171;
      height: 44px;
      span {
        color: #3a4040;
      }
    }
    .swiper-button-prev, .swiper-button-next {
      top: 42%;
      width: 42px;
      height: 72px;
      background: url("../../../assets/active/goodLuckUpgrade/icon.png") no-repeat;
      &:after {
        content: "";
      }
    }
    .swiper-button-prev {
      left: 88px;
      background-position: -20px -110px;
      &:hover {
        background-position: -20px -20px;
      }
    }
    .swiper-button-next {
      background-position: -82px -110px;
      right: 88px;
      &:hover {
        background-position: -82px -20px;
      }
    }
  }
}
</style>
<style lang="less" scoped>
@icon: url("../../../assets/active/goodLuckUpgrade/icon.png") no-repeat;

.virtual-deposit {
  background: url("../../../assets/active/goodLuckUpgrade/bg.jpg") no-repeat center top;
  overflow: hidden;
  .active-tab {
    margin-top: 714px;
    text-align: center;
    .el-button {
      width: 294px;
      height: 78px;
      line-height: 78px;
      border-radius: 0;
      background: #32705d;
      font-size: 18px;
      font-weight: bold;
      color: #fff;
      transition: background 0.2s;
      &:hover, &.actived {
        background: #50a08b;
      }
      &:first-child {
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
      }
      &:last-child {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
      }
    }
  }
  .guide-panel {
    h2 {
      width: 624px;
      font-size: 14px;
      font-weight: normal;
      line-height: 14px;
      text-align: center;
      color: #3a4040;
      margin: 20px auto;
      a {
        color: #006cb4;
        text-decoration: underline;
      }
    }
    .note {
      width: 900px;
      margin: 20px auto 30px;
      font-size: 14px;
      color: #717171;
      dt {
        color: #3a4040;
      }
      dd {
        ul {
          li {
            list-style: disc;
            line-height: 24px;
          }
        }
      }
    }
    .guide-footer {
      background: url("../../../assets/active/goodLuckUpgrade/bottom_bg.jpg") no-repeat center center;
      .related {
        width: 1086px;
        height: 518px;
        margin: 0 auto;
        display: flex;
        justify-content: flex-end;
        dl {
          width: 496px;
          dt {
            height: 22px;
            background: @icon;
            background-position: -164px -26px;
            font-size: 18px;
            line-height: 18px;
            text-align: center;
            color: #ffffff;
            margin: 120px 0 36px;
          }
          dd {
            ul {
              display: flex;
              justify-content: space-between;
              flex-wrap: wrap;
              li {
                background: @icon;
                width: 230px;
                height: 50px;
                margin-bottom: 33px;
                &:hover {
                  &:before {
                    content: '点击查看';
                    display: block;
                    width: inherit;
                    height: inherit;
                    position: absolute;
                    font-size: 18px;
                    text-align: center;
                    color: #717171;
                    line-height: 50px;
                    background: #7be7d3;
                    border-radius: 10px;
                    pointer-events: none;
                  }
                }
                a {
                  display: block;
                  width: inherit;
                  height: inherit;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
