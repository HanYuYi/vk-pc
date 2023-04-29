<template>
  <el-dialog
    :custom-class="`msi2023-gift${isInfo ? 'isInfo':''}`"
    :visible="visible"
    v-dir-center="visible"
    width="620px"
    :append-to-body="true"
    :lock-scroll="true"
    @close="close"
    :close-on-click-modal="false">
    <div class="dialog-main">
      <div class="gift-box" :style="{'background-image': `url(${gifData.typeBg})`}">
        <div class="child-box">
          <template v-if="gifData.type==0">
            <img :src="gifData.lotteryTicketIcon" class="lottery-ticket">
          </template>
          <template v-else><img :src="gifData.icon_url" class="gift"></template>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <template v-if="gifData.type==0">
        <h2 class="win">恭喜您获得<span>{{ gifData.ticket }}</span>张抽奖卷~</h2>
      </template>
      <template v-else>
        <h2 v-if="gifData.type === 2"><span>{{ gifData.price }}</span>V币</h2>
        <h2 v-else-if="gifData.type === 4">恭喜您获得<span>{{ gifData.price }}</span>元现金红包</h2>
        <h2 v-else><span>{{ gifData.goods_name }}</span></h2>

        <p v-if="gifData.type === 2">已发放至您的V币账户中，请注意查收！</p>
        <p v-else-if="gifData.type === 4">已发放至您的账户中，请注意查收！</p>
        <p v-else>已发放至您的背包中，请注意查收！</p>
      </template>
      <button @click="close" class="msi2023-primary-btn"></button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "msi2023Gift",

  props: ["visible", "gifData"],
  data(){
    return{
      isInfo:false
    }
  },
  methods: {
    close () {
      this.$emit("update:visible", false)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .msi2023-gift.isInfo{
  .el-dialog__header {
    background: url("../../../../../assets/active/egame/msi2023/win-info-head-bg.png");
  }
}
/deep/ .msi2023-gift {
  box-shadow: none;
  height: 486px;;
  background: url("../../../../../assets/active/egame/msi2023/dialog-bg.png");
  position: relative;
  .el-dialog__header {
    background: url("../../../../../assets/active/egame/msi2023/win-notice-head-bg.png") no-repeat center 19px;
    background-size: 200px 23px;
    height: 94px;

    .el-dialog__title {
      display: inline-block;
      width: 100%;
      font-size: 28px;
      line-height: 88px;
      text-align: center;
      color: #fff;
    }

    .el-dialog__headerbtn {
      width: 44px;
      height: 38px;
      top: 19px;
      right: 19px;
      transition: background 0.3s;
      background: url("../../../../../assets/active/egame/msi2023/dialog-close.png") no-repeat;

      &:hover {
        // background: url("../../../../assets/active/egame/csgoInParis/dialog_close_hover.png");
      }
      i {
        display: none;
      }
    }
  }

  .el-dialog__body {
    padding: 0;

    .dialog-main {
      text-align: center;
      .gift-box {
        position: relative;
        margin: 8px auto 0;
        width: 219px;
        height: 219px;
        background-repeat: no-repeat;
        background-size: 128px 110px;
        background-position: center 68px;
        overflow: hidden;

        @keyframes rotate-animate {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }

        &::before {
          content: "";
          position: absolute;
          width: inherit;
          height: inherit;
          top: 0;
          left: 0;
          background: url("../../../../../assets/active/egame/msi2023/gift-box-bg.png");
          animation: rotate-animate 5s linear infinite;
        }

        .child-box {
          position: relative;
          z-index: 1;
          height: inherit;
          display: flex;
          justify-content: center;
          align-items: center;
          .gift {
            display: block;
          }
          .lottery-ticket{
            width: 200px;
            display: block;
            height: 78px;
          }
        }
      }
    }
  }
  .el-dialog__footer{
    position: absolute;
    width: 100%;
    bottom: 13px;
    text-align: center;
    padding: 0;
    h2 {
      font-weight: normal;
      margin-bottom: 15px;
      font-size: 16px;
      text-align: center;
      color: #000000;
      &.win{
        margin-bottom: 29px;
      }
      span {
        color: #e93323;
        font-weight: bold;
        margin: 0 3px;
      }
    }
    p {
      margin-bottom: 17px;
      font-size: 16px;
      text-align: center;
      color: #000000;
    }

    .msi2023-primary-btn {
      cursor: pointer;
      border: 0;
      margin: 0 auto 13px;
      width: 176px;
      height: 56px;
      background: url("../../../../../assets/active/egame/msi2023/dialog-btn.png");

      &:hover {
        // background: url("../../../../../assets/active/egame/msi2023/dialog-btn.png");
      }
    }
  }
}
</style>
