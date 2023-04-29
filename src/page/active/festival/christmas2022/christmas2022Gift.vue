<template>
  <el-dialog
    custom-class="christmas2022-gift"
    :visible="visible"
    v-dir-center="visible"
    width="506px"
    :show-close="false"
    :append-to-body="true"
    :lock-scroll="true"
    @close="close"
    title=""
    :close-on-click-modal="false">

    <div class="my-gift">
      <img :src="giftInfo.imgLink" alt="" class="gift-pic">

      <h4 class="gift-name">{{ giftInfo.name }}</h4>

      <p v-if="giftInfo.isCash" class="gift-desc">奖品已发放至您的主钱包，请注意查收<br>1倍流水即可提款</p>
      <p v-else class="gift-desc">奖品已发放至您的背包，请注意查收</p>

      <div><button @click="close" class="get-it-btn"></button></div>
    </div>

    <button @click="close" class="close-btn"></button>

  </el-dialog>
</template>

<script>
export default {
  name: 'christmas2022Gift',
  props: ["visible", "giftInfo"],
  methods: {
    close() {
      this.$emit("update:visible", false)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .christmas2022-gift {
  height: 621px;
  border: 0;
  background: transparent url("../../../../assets/active/christmas2022/gift_bg.png") no-repeat center top;
  overflow: hidden;
  box-shadow: none;

  .el-dialog__header {
    height: 0;
  }

  .el-dialog__body {
    padding: 0;
    height: inherit;
    position: relative;

    .my-gift {
      overflow: hidden;
      &>* {
        text-align: center;
        display: block;
      }

      .gift-pic {
        height: 155px;
        margin: 152px auto 0;
      }

      .gift-name {
        margin-top: 20px;
        font-size: 18px;
        color: #fff;
        white-space: nowrap;
      }

      .gift-desc {
        margin-top: 15px;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.8);
      }

      .get-it-btn {
        display: inline-block;
        margin: 20px auto 0;
        width: 144px;
        height: 57px;
        outline: 0;
        border: 0;
        cursor: pointer;
        background: transparent url("../../../../assets/active/christmas2022/get_it.png") no-repeat;
        transition: background 0.2s;
        &:hover {
          background: transparent url("../../../../assets/active/christmas2022/get_it_hover.png") no-repeat;
        }
      }
    }

    .close-btn {
      position: absolute;
      left: (506px - 39px) / 2;
      bottom: 0;
      width: 39px;
      height: 32px;
      outline: 0;
      border: 0;
      cursor: pointer;
      background: transparent url("../../../../assets/active/christmas2022/dialog_close.png");
    }
  }
}
</style>
