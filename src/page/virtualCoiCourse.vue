<template>
  <div class="virtual-coin-course">

    <div class="usdt-rotate">
      <div class="big-bg"></div>
      <div class="big-usdt"></div>
    </div>

    <div class="slogan"></div>

    <ul class="tab">
      <li v-for="(txt, index) in ['数字货币使用教程', 'VPN下载使用教程', '数字货币相关活动介绍']"
          :key="index"
          @click="tabIndex = index" :class="{active: tabIndex === index}">
        {{txt}}
      </li>
    </ul>

    <VirCourse v-if="tabIndex === 0"/>
    <VpnCourse v-if="tabIndex === 1"/>
    <AboutVirActive v-show="tabIndex === 2"/>

    <!-- 左侧栏-->
    <div v-if="tabIndex < 2" class="left-info">
      <template v-if="tabIndex === 0">
        <a href="https://vkgame.live/okex.php" target="_blank" class="logo" style="background-position: 0 -464px"></a>
        <h3>移动交易<br>随时随地</h3>
        <div class="qrcode" style="background-position: 0 -596px"></div>
        <h5>扫码下载欧易APP</h5>
        <a href="https://vkgame.live/okex.php" target="_blank" class="download_btn">点击下载</a>
      </template>
      <template v-if="tabIndex === 1">
        <a href="https://vkgame.live/vpn.php" target="_blank" class="logo" style="background-position: -868px 0;"></a>
        <h3>永远能连<br>上的VPN</h3>
        <div class="qrcode" style="background-position: -868px -134px"></div>
        <h5>扫码下载快橙APP</h5>
        <a href="https://vkgame.live/vpn.php" target="_blank" class="download_btn">点击下载</a>
      </template>

    </div>

  </div>
</template>

<script>
import VirCourse from './virtualCoiCourse/virCourse'
import VpnCourse from './virtualCoiCourse/vpnCourse'
import AboutVirActive from './virtualCoiCourse/aboutVirActive'

export default {
  name: 'virtualCoiCourse',
  components: { VirCourse, VpnCourse, AboutVirActive },
  data() {
    return {
      tabIndex: 0
    }
  }
}
</script>

<style lang="less" scoped>
.virtual-coin-course {
  background-color: #1e1941;
  background-image: url("../assets/virtualCoiCourse/banner.jpg"),
    url("../assets/virtualCoiCourse/grid_bg.png"),
    linear-gradient(to top right, #100d25 , #1e1941);
  background-position: center top, left 45px, left top;
  background-repeat: no-repeat, repeat, repeat;
  overflow: hidden;
  position: relative;
  padding-bottom: 65px;
  &:before, &:after {
    position: absolute;
    content: "";
    width: 150px;
    height: 162px;
    background-image: url("../assets/virtualCoiCourse/icon.png");
  }
  &:before {
    top: 660px;
    left: 0;
    background-position: -372px 0;
  }
  &:after {
    bottom: 0;
    right: 0;
    background-position: -372px -162px;
  }

  .usdt-rotate {
    position: absolute;
    top: 88px;
    right: 410px;
    width: 392px;
    height: 392px;
    .big-bg {
      width: inherit;
      height: inherit;
      background: url("../assets/virtualCoiCourse/usdt_icon_rotate.png");
      animation: 20s usdtRotate linear infinite;
    }
    .big-usdt {
      width: 176px;
      height: 176px;
      position: absolute;
      top: 108px;
      left: 108px;
      background: url("../assets/virtualCoiCourse/usdt_icon.png");
    }
    @keyframes usdtRotate {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
  .slogan {
    margin: 493px auto 0;
    width: 1262px;
    height: 333px;
    background: url("../assets/virtualCoiCourse/slogan.png");
  }

  .tab {
    width: 1240px;
    margin: 35px auto 0;
    display: flex;
    justify-content: space-between;
    li {
      width: 372px;
      height: 78px;
      text-align: center;
      line-height: 78px;
      font-size: 28px;
      font-weight: bold;
      color: #fff;
      text-shadow: 0 2px 4px #171434;
      cursor: pointer;
      background-image: url("../assets/virtualCoiCourse/icon.png");
      background-position: 0 -78px;
      &:hover,&.active {
        background-position: 0 0;
      }
    }

  }

  .left-info {
    position: fixed;
    left: 0;
    top: calc((100% - 389px) / 2);
    width: 158px;
    height: 389px;
    box-shadow: 0 4px 12px 0 rgba(2, 0, 58, 0.5);
    background-image: linear-gradient(to top, #0300a3, #1d19d8);
    &:before {
      pointer-events: none;
      position: absolute;
      content: "";
      top: 2.5px;
      left: 2px;
      width: 150px;
      height: 380px;
      border: solid 2px #fff;
    }

    .logo {
      display: block;
      width: 132px;
      height: 132px;
      background-image: url("../assets/virtualCoiCourse/icon.png");
      margin: 16px auto 0;
    }
    h3 {
      font-size: 24px;
      font-weight: bold;
      line-height: 29px;
      text-align: center;
      color: #fff;
      margin-top: 7.5px;
    }
    .qrcode {
      width: 132px;
      height: 132px;
      background-image: url("../assets/virtualCoiCourse/icon.png");
      margin: 7.5px auto 0;
    }
    h5 {
      font-size: 16px;
      font-weight: bold;
      line-height: 16px;
      text-align: center;
      color: #fff;
      margin-top: 6px;
    }
    .download_btn {
      position: absolute;
      bottom: -47px;
      display: block;
      width: 158px;
      height: 38px;
      background-image: url("../assets/virtualCoiCourse/download_btn.png");
      font-size: 20px;
      font-weight: bold;
      line-height: 38px;
      text-align: center;
      color: #fff;
      &:hover {
        color: #0401a4;
        background-image: url("../assets/virtualCoiCourse/download_btn_hover.png");
      }
    }
  }
}
</style>
