<template>
  <div class="dotati10Rules">
    <div class="rules-wrapper">
      <i></i>
      <h1>活动规则</h1>
      <ol class="rules" v-html="text"></ol>
    </div>
    <div class="back-active">
      <router-link to="/active">返回活动首页</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dotati10Rules',
  props: {
    text: {
      type: String,
      require: true
    }
  }
}
</script>

<style lang="less" scoped>
.dotati10Rules {
  .rules-wrapper {
    margin: 72px auto 0;
    width: 1040px;
    height: 521px;
    border-radius: 8px;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.7);
    background-color: #2d2d2d;
    color: #f8e8b9;
    position: relative;
    overflow: visible;
    border: 1px solid transparent;
    box-sizing: border-box;
    z-index: 4;

    i {
      position: absolute;
      right: -96px;
      top: -31px;
      display: inline-block;
      width: 309px;
      height: 553px;
      background: url("../../../assets/active/dotati10/icon.png") -1514px -38px no-repeat;
    }

    h1 {
      text-align: center;
      font-size: 26px;
      font-weight: normal;
      letter-spacing: 2.6px;
      margin-top: 20px;
    }

    .rules {
      font-size: 18px;
      width: 775px;
      margin-left: 62px;
      line-height: 22px;

      /deep/ li {
        list-style: auto;
        margin-top: 20px;
      }
    }
  }
  .back-active {
    text-align: center;
    margin: 36px 0;
    a {
      display: inline-block;
      width: 220px;
      height: 70px;
      line-height: 70px;
      font-size: 26px;
      color: #ffe77b;
      background: url("../../../assets/active/dotati10/icon.png") -920px -157px no-repeat;

      &:hover {
        background: url("../../../assets/active/dotati10/icon.png") -920px -37px no-repeat;
      }
    }
  }
}
</style>
