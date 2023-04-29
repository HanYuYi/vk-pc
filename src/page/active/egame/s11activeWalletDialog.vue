<template>
  <el-dialog
    :visible.sync="visible"
    custom-class="dialog-panel"
    width="641px"
    :close-on-click-modal="false"
    :append-to-body="true"
    :before-close="close">
    <div class="dialog-main">
      <h1></h1>
      <ul class="wallet_wrapper">
        <li v-for="(item, index) in dialogWallteList" :key="index"
            @click="currentWalletCode = item.code"
            :style="{'background-position': `${currentWalletCode === item.code ? `${item.activedPos[0]}px ${item.activedPos[1]}px` : `${item.pos[0]}px ${item.pos[1]}px`}`}">
        </li>
      </ul>
      <div class="confim">
        <button @click="sendCurrentCode" :disabled="loading">领取{{ loading ? '...' : '' }}</button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 's11activeWalletDialog',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    }
  },
  watch: {
    visible (bool) {
      bool && (this.currentWalletCode = this.dialogWallteList[0].code)
    }
  },
  data () {
    return {
      dialogWallteList: [
        {code: 'EG', pos: [-29, -190], activedPos: [-29, -20]},
        {code: 'RG', pos: [-197, -190], activedPos: [-197, -20]},
        {code: 'TF', pos: [-365, -190], activedPos: [-365, -20]},
        {code: 'IM', pos: [-533, -190], activedPos: [-533, -20]}
      ],
      currentWalletCode: ''
    }
  },
  methods: {
    close () {
      this.$emit('update:visible', false)
    },
    sendCurrentCode () {
      this.$emit('backCode', this.currentWalletCode)
    }
  }
}
</script>

<style lang="less" scoped>
@dialogIcon: url("../../../assets/active/s11active/dialog-icon.png") no-repeat;

/deep/ .el-dialog {
  height: 534px;
  margin: 0 auto 50px;
  border-radius: 0;
  border: 0;
  background-color: transparent;
  margin-top: calc((100vh - 534px) / 2) !important;
  background: @dialogIcon;
  background-position: -739px -23px;
  .el-dialog__header {
    padding: 0 20px;
    background-color: transparent;
    .el-dialog__headerbtn {
      top: 10px;
      right: 10px;
      .el-icon-close {
        width: 18px;
        height: 18px;
        background: @dialogIcon;
        background-position: -508px -370px;
      }
    }
  }
  .el-dialog__body {
    .dialog-main {
      h1 {
        width: 441px;
        height: 41px;
        margin: -29px auto 0;
        background: @dialogIcon;
        background-position: -13px -358px;
      }
      .wallet_wrapper {
        display: flex;
        width: 304px;
        margin: 4px auto 0;
        justify-content: space-between;
        flex-wrap: wrap;
        li {
          width: 140px;
          height: 140px;
          background: @dialogIcon;
          margin-top: 24px;
          cursor: pointer;
        }
      }
      .confim {
        margin: 39px;
        text-align: center;
        button {
          width: 130px;
          height: 42px;
          outline: 0;
          border: 0;
          cursor: pointer;
          box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.3);
          background: @dialogIcon;
          background-position: -43px -442px;
          font-size: 24px;
          font-weight: bold;
          color: #f1f1f3;
        }
      }
    }
  }
}
</style>
