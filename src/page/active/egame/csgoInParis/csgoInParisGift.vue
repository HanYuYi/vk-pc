<template>
  <el-dialog
    custom-class="csgo-in-paris-gift"
    :visible="visible"
    v-dir-center="visible"
    title="中奖信息"
    width="620px"
    :append-to-body="true"
    :lock-scroll="true"
    @close="close"
    :close-on-click-modal="false">

    <div class="dialog-main">

      <div class="gift-box" :style="{'background-image': `url(${gifData.typeBg})`}">
        <div class="child-box">

          <img :src="gifData.iconUrl" class="gift">

          <h2 v-if="gifData.type === 2"><span>{{ gifData.price }}</span>V币</h2>
          <h2 v-else-if="gifData.type === 4"><span>{{ gifData.price }}</span>元现金红包</h2>
          <h2 v-else><span>{{ gifData.name }}</span></h2>

        </div>

      </div>

      <p v-if="gifData.type === 2">已发放至您的V币账户中，请注意查收！</p>
      <p v-else-if="gifData.type === 4">已发放至您的账户中，请注意查收！</p>
      <p v-else>已发放至您的背包中，请注意查收！</p>

      <button @click="close" class="csgo-paris-primary-btn">
        <span>我知道了</span>
      </button>

    </div>

  </el-dialog>
</template>

<script>
export default {
  name: "csgoInParisGift",

  props: ["visible", "gifData"],

  methods: {
    close () {
      this.$emit("update:visible", false)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .csgo-in-paris-gift {
  box-shadow: none;
  height: 490px;
  background: url("../../../../assets/active/egame/csgoInParis/dialog_bg.png");

  .el-dialog__header {
    background: transparent;
    height: 88px;

    .el-dialog__title {
      display: inline-block;
      width: 100%;
      font-size: 28px;
      line-height: 88px;
      text-align: center;
      color: #fff;
    }

    .el-dialog__headerbtn {
      width: 60px;
      height: 56px;
      transition: background 0.3s;
      background: url("../../../../assets/active/egame/csgoInParis/dialog_close.png");

      &:hover {
        background: url("../../../../assets/active/egame/csgoInParis/dialog_close_hover.png");
      }
      i {
        display: none;
      }
    }
  }

  .el-dialog__body {
    padding: 0;

    .dialog-main {

      .gift-box {
        position: relative;
        margin: 8px auto 0;
        width: 220px;
        height: 220px;
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
          background: url("../../../../assets/active/egame/csgoInParis/dialog_aperture.png");
          animation: rotate-animate 5s linear infinite;
        }

        .child-box {
          position: relative;
          z-index: 1;

          .gift {
            display: block;
            margin: 32px auto 0;
            height: 96px;
          }

          h2 {
            font-weight: normal;
            margin: 62px auto 0;
            font-size: 22px;
            line-height: 32px;
            text-align: center;
            color: #fff;

            span {
              color: #ffff00;
            }
          }
        }
      }

      p {
        margin: 4px auto 0;
        font-size: 16px;
        line-height: 32px;
        text-align: center;
        color: rgba(255, 255, 255, 0.6);
      }

      .csgo-paris-primary-btn {
        margin: 28px auto 0;
        width: 420px;
        background: url("../../../../assets/active/egame/csgoInParis/dialog_btn.png");

        &:hover {
          background: url("../../../../assets/active/egame/csgoInParis/dialog_btn_hover.png");
        }
      }
    }

  }
}
</style>
