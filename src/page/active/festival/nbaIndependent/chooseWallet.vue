<template>
  <el-dialog
    :visible.sync="visible"
    v-dir-center="visible"
    custom-class="dialog-panel"
    width="658px"
    :close-on-click-modal="false"
    :show-close="true"
    :append-to-body="true"
    :before-close="close"
    :title="title">
    <div class="dialog-main">
      <h4>请选择再存金转入的钱包</h4>
      <ul class="wallet-box">
        <li v-for="(item, index) in walletList"
            :key="item.id"
            :style="{margin: (index + 1) % 3 === 0 ? '0 0 30px 0' : '0 50px 30px 0'}"
            :class="{actived: currentWalletCode === item.code}"
            @click="currentWalletCode = item.code">
          {{ item.name }}
        </li>
      </ul>
      <div class="btns-group">
        <button @click="close" class="normal">暂不领取</button>
        <button @click="toTakePrize" class="activation">{{ loading ? '领取中，请稍等...' : '立即领取' }}</button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "chooseWallet",
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    params: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      currentWalletCode: "",
      walletList: [
        {name: '威客体育钱包', id: 1, code: 'SABACV'},
        {name: 'FB体育钱包', id: 2, code: 'FB'},
        {name: '平博体育钱包', id: 3, code: 'PINNACLE'},
        {name: '皇冠体育钱包', id: 4, code: 'CROWN'},
        {name: '沙巴体育钱包', id: 5, code: 'SABA'},
        {name: 'IM体育钱包', id: 6, code: 'IMSB'}
      ]
    }
  },
  watch: {
    visible (bool) {
      if (bool) {
        this.currentWalletCode = this.walletList[0].code
      }
    }
  },
  methods: {
    close () {
      this.$emit('update:visible', false)
    },
    /**
     * 领取彩金
     */
    toTakePrize () {
      if (this.loading) return
      this.loading = true
      const sendBody = {
        from: 'NM',
        to: this.currentWalletCode,
        money: this.params.money,
        active_id: this.params.active_id
      }
      this.$http(this.ApiSetting.user.transferSubmit, sendBody)
        .then(({status}) => {
          if (status === 1) {
            this.close()
            this.$emit('callback')
          }
        })
        .finally(() => { this.loading = false })
    }
  }
}
</script>

<style lang="less" scoped>
@icon: url("../../../../assets/active/nbaIndependent/icon.png") no-repeat;
@color1: #ffffff;
@color-theme: #1d70f1;

/deep/ .dialog-panel {
  height: 500px;
  border: 0;
  background-color: transparent;

  .el-dialog__header {
    height: 70px;
    background-color: transparent;
    background: @icon;
    background-position: -704px -44px;
    line-height: 54px;
    position: relative;
    .el-dialog__title {
      color: @color1;
      font-size: 26px;
      line-height: 26px;
      font-weight: bold;
      font-style: italic;
      margin-left: 68px;
    }
    .el-dialog__headerbtn {
      .el-dialog__close {
        width: 100%;
        height: 100%;
        background: @icon;
        background-position: -962px -329px;
      }
      &:hover {
        .el-dialog__close {
          background-position: -1041px -329px;
        }
      }
    }
    /deep/ &:after {
      width: 100%;
      position: absolute;
      bottom: 7px;
      left: 0;
      content: "";
      border-bottom: 1px solid #1d70f1;
    }
  }

  .el-dialog__body {
    padding: 0;
    height: 430px;
    background-color: @color-theme;
    position: relative;
    /deep/ &:before {
      width: 644px;
      height: 420px;
      content: "";
      top: 5px;
      left: 8px;
      position: absolute;
      border: solid 1px #03256f;
      box-sizing: border-box;
      pointer-events: none;
    }
    // dialog自定义层
    .dialog-main {
      overflow: hidden;
      padding: 0 38px 0 39px;
      h4 {
        font-weight: normal;
        font-size: 16px;
        line-height: 16px;
        color: @color1;
        margin: 59px 0 29px;
      }
      .wallet-box {
        display: flex;
        flex-wrap: wrap;
        li {
          width: 160px;
          height: 48px;
          background: @icon;
          background-position: -918px -136px;
          font-size: 14px;
          line-height: 48px;
          text-align: center;
          color: @color1;
          cursor: pointer;
          letter-spacing: 1.4px;
          transition: font-size 0.1s, font-weight 0.1s;
          &.actived {
            font-size: 20px;
            background: @icon;
            background-position: -708px -136px;
            font-weight: bold;
            letter-spacing: 2px;
          }
        }
      }
      .btns-group {
        margin-top: 30px;
        display: flex;
        justify-content: space-between;
        button {
          width: 248px;
          height: 70px;
          background: @icon;
          border: 0;
          outline: 0;
          font-size: 24px;
          letter-spacing: 1.2px;
          color: @color1;
          cursor: pointer;
        }
        .normal {
          background-position: -711px -216px;
        }
        .activation {
          background-position: -32px -269px;
        }
      }
    }
  }
}
</style>
