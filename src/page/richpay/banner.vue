<template>
  <div class="richpay-banner">
    <!-- banner-亮边-->
    <div class="banner-side-line1"></div>
    <div class="banner-side-line2"></div>
    <div class="banner-side-line3"></div>

    <div class="center-box">
      <!-- banner-coin-->
      <div class="banner-coin1"></div>
      <div class="banner-coin2"></div>
      <!-- banner-num-->
      <div class="banner-num"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'banner'
}
</script>

<style lang="less" scoped>
.richpay-banner {
  position: relative;
  height: 403px;

  & > * {
    position: absolute;
  }

  //banner-亮边
  .banner-side-line1,.banner-side-line2,.banner-side-line3 {
    width: 750px;
    height: 500px;
    left: calc((100% - 750px) / 2);
    top: -47px;
  }
  .banner-side-line1 {
    background: url("../../assets/richpay/banner_side_line1.png") no-repeat;
    background-size: 100% 100%;
    animation: side-line 5s infinite;
  }
  .banner-side-line2 {
    background: url("../../assets/richpay/banner_side_line2.png") no-repeat;
    background-size: 100% 100%;
    animation: side-line 5s infinite;
  }
  .banner-side-line3 {
    background: url("../../assets/richpay/banner_side_line3.png") no-repeat;
    background-size: 100% 100%;
    animation: side-line 5s infinite;
  }
  @keyframes side-line {
    0% { opacity: 0; }
    70% { opacity: 1; }
    100% { opacity: 0; }
  }

  .center-box {
    width: 1240px;
    height: 0;
    margin: 80px auto 0;
    position: relative;
    //banner-coin
    .banner-coin1,.banner-coin2 {
      position: absolute;
      &:before {
        position: absolute;
        content: "";
        width: inherit;
        height: inherit;
      }
    }
    .banner-coin1 {
      width: 121px;
      height: 123px;
      background: url("../../assets/richpay/banner_icon1.png") no-repeat;
      left: 145px;
      top: 275px;
      &:before {
        background: url("../../assets/richpay/banner_icon1_c.png") no-repeat;
        animation: banner-coin1 1s linear infinite alternate;
      }
    }
    .banner-coin2 {
      width: 52px;
      height: 53px;
      background: url("../../assets/richpay/banner_icon2.png") no-repeat;
      right: 305px;
      top: 240px;
      &:before {
        background: url("../../assets/richpay/banner_icon2_c.png") no-repeat;
        animation: banner-coin2 1s linear infinite alternate;
      }
    }
    @keyframes banner-coin1 {
      0% { transform: scale(1, 1); }
      100% { transform: scale(1.5, 1.5); }
    }
    @keyframes banner-coin2 {
      0% { transform: scale(1, 1); }
      100% { transform: scale(1.6, 1.6); }
    }
    //banner-num
    .banner-num {
      position: absolute;
      width: 112px;
      height: 60px;
      background: url("../../assets/richpay/banner_num.png") no-repeat;
      right: 455px;
      top: 257px;
      animation: banner-num 0.6s linear infinite alternate;
    }
    @keyframes banner-num {
      0% { transform: scale(0.9, 0.9); }
      100% { transform: scale(1.1, 1.1); }
    }
  }
}
</style>
