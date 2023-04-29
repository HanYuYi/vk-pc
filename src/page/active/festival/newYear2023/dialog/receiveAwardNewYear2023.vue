<template>
  <el-dialog
    custom-class="receive-award-new-year2023"
    :visible="visible"
    top="8vh"
    width="546px"
    :show-close="false"
    :append-to-body="true"
    :lock-scroll="true"
    @close="close"
    title=""
    :close-on-click-modal="false">

    <div class="my-receive-award">
      <p class="success-tips">{{ dataRow.dialogTitle }}</p>

      <h1>{{ dataRow.title }}<small v-if="dataRow.type === 1">元</small></h1>

      <div class="award-box">
        <img :src="dataRow.icon" alt="" />
      </div>

      <button @click.stop="close" class="new-year2023-btn1">
        <span class="new-year2023-gradient-color">开心收下</span>
      </button>

      <p v-if="dataRow.type === 1" class="tips">已加入主钱包{{ dataRow.waterMultiple }}倍流水即可提款</p>
      <p v-else class="tips">已放入您的背包中</p>
    </div>

    <i @click="close" class="close"></i>

  </el-dialog>
</template>

<script>
export default {
  name: 'receiveAwardNewYear2023',
  props: ["visible", "dataRow"],
  methods: {

    close() {
      this.$emit("update:visible", false)
      this.$emit("closeBack")
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .receive-award-new-year2023 {
  background-image: url("../../../../../assets/active/newYear2023/receive_award_dialog_bg.png");
  background-repeat: no-repeat;
  background-color: transparent;
  box-shadow: none;
  margin: 0 auto;
  height: 774px;
  .el-dialog__header {
    height: 0;
  }
  .el-dialog__body {
    padding: 0;
    height: inherit;
    position: relative;

    .my-receive-award {
      overflow: hidden;
      .success-tips {
        margin-top: 220px;
        font-size: 32px;
        text-align: center;
        background-image: linear-gradient(to bottom, #fff29d, #fff29d);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      h1 {
        margin-top: 8px;
        font-size: 40px;
        font-weight: bold;
        text-align: center;
        background-image: linear-gradient(to top, #fff29d, #fff29d);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        small {
          font-size: 24px;
          font-weight: normal;
        }
      }
      .award-box {
        margin: 20px auto 0;
        width: 238px;
        height: 238px;
        border-radius: 50%;
        border: solid 4px #901212;
        background: #a31818;
        line-height: 238px;
        text-align: center;
        position: relative;
        &:before {
          position: absolute;
          content: "";
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
          background: url("../../../../../assets/active/newYear2023/pack_border.png") no-repeat center center;
        }
        img {
          max-width: 173px;
          max-height: 166px;
        }
        &::after {
          position: absolute;
          content: "";
          width: 50px;
          height: 40px;
          right: 20px;
          bottom: 0;
          background: url("../../../../../assets/active/newYear2023/ingots.png") no-repeat;
        }
      }

      .new-year2023-btn1 {
        width: 188px;
        height: 68px;
        margin: 20px auto 0;
        span {
          top: 15px;
          font-weight: bold;
        }
      }

      .tips {
        margin-top: 18px;
        font-size: 14px;
        text-align: center;
        color: #ffdea4;
      }
    }

    .close {
      position: absolute;
      display: block;
      width: 62px;
      height: 63px;
      bottom: -87px;
      left: 242px;
      background: url("../../../../../assets/active/newYear2023/close_icon.png") no-repeat;
      cursor: pointer;
      transition:  background 0.1s;
      &:hover {
        background: url("../../../../../assets/active/newYear2023/close_icon_hover.png") no-repeat;
      }
    }
  }
}
</style>
