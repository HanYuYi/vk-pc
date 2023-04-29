<template>
  <el-dialog
    :visible.sync="visible"
    v-dir-center="visible"
    custom-class="quartermaster-dialog"
    width="295px"
    :close-on-click-modal="false"
    :show-close="true"
    :append-to-body="true"
    :before-close="close">
    <div class="dialog-main">
      <i class="reward-type" :class="params.type === 1 ? 'vb' : 'red-paper'"></i>
      <h2>领取成功</h2>
      <p v-if="params.type === 1">{{ params.num }}V币已派发，请注意查收</p>
      <p v-else>{{ params.num }}元现金红包已派发至主钱包，请注意查收</p>
      <button @click="close">我知道了</button>
    </div>
  </el-dialog>

</template>

<script>

export default {
  name: "takeDialog",
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    params: {
      type: Object,
      required: true
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
/deep/ .quartermaster-dialog {
  height: 236px;
  border: 0;
  background-color: transparent;
  background: url("../../../../assets/active/quartermaster/dialog_bg.png") no-repeat;

  .el-dialog__header {
    height: 0;
    background-color: transparent;
    line-height: 54px;
    position: relative;
    .el-dialog__headerbtn {
      top: 14px;
      right: 14px;
      z-index: 10;
      .el-dialog__close {
        width: 100%;
        height: 100%;
        background: url("../../../../assets/active/quartermaster/icon.png") no-repeat;
        background-position: -605px -14px;
      }
    }
  }

  .el-dialog__body {
    padding: 0;
    height: 236px;
    position: relative;
    overflow: hidden;
    .dialog-main {
      margin: 15px auto 0;
      width: 266px;
      height: 208px;
      overflow: hidden;
      .reward-type {
        display: block;
        width: 48px;
        height: 47px;
        margin: 18px auto 0;
        background: url("../../../../assets/active/quartermaster/icon.png") no-repeat;
        &.vb {
          background-position: -460px -14px;
        }
        &.red-paper {
          background-position: -538px -14px;
        }
      }
      h2 {
        margin-top: 16px;
        font-size: 18px;
        line-height: 18px;
        text-align: center;
        color: #fff;
      }
      p {
        margin-top: 10px;
        padding: 0 5px;
        height: 34px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        text-align: center;
        color: #fff;
      }
      button {
        display: block;
        width: 123px;
        height: 31px;
        margin: 10px auto 0;
        border-radius: 5px;
        background-color: #ff5a04;
        font-size: 14px;
        font-weight: bold;
        color: #fff;
        cursor: pointer;
        border: 0;
        outline: 0;
      }
    }
  }
}
</style>
