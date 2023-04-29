<template>
  <el-dialog
    :visible.sync="visible"
    v-dir-center="visible"
    custom-class="Csgorescue2022Take-dialog"
    width="590px"
    :show-close="true"
    :append-to-body="true"
    :before-close="close">

    <h1 slot="title" class="dialog-title">
      <p><i></i>今日可领彩金：</p>
      <p><span>{{ formatNumber(params.today_bonus) }}</span>元</p>
    </h1>

    <div class="dialog-main">
      <h6>领取至：</h6>
      <ul class="wallet-list">
        <li v-for="(item, index) in walletList"
            :key="index"
            @click="selectedRow = item"
            :class="{active: selectedRow.code === item.code}">
          {{ item.name }}
        </li>
      </ul>

      <button class="take-btn" @click="handleToTake"></button>
    </div>
  </el-dialog>
</template>

<script>
import { formatNumberSplit } from '@/utils/util'

export default {
  name: 'Csgorescue2022Take',
  props: {
    visible: {
      type: Boolean,
      require: true
    },
    params: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      selectedRow: {},
      loading: false,
      walletList: [
        {name:"小艾电竞钱包", code:"EG"},
        {name:"IM电竞钱包", code:"IM"}
      ]
    }
  },
  watch: {
    visible(bool) {
      if(bool) this.selectedRow = this.walletList[0]
    }
  },
  methods: {
    formatNumber(money){
      return formatNumberSplit(money)
    },
    close() {
      if (this.loading) {
        this.$message({ message: "正在提交，请稍等", type: "warning" })
        return
      }
      this.$emit("update:visible", false)
    },
    handleToTake() {
      let getParameter = {
        from: "NM",
        to: this.selectedRow.code,
        money: this.params.today_bonus,
        active_id: this.params.active_id
      }
      console.info("lpl活动领取参数：", getParameter)
      this.loading = true
      this.$http(this.ApiSetting.user.transferSubmit, getParameter)
        .then(res => {
          this.loading = false
          if(res.status === 1) {
            this.$message({ message: "领取成功！", type: "success" })
            this.close();
            this.$emit('successBack')
            console.info("lpl活动领取响应：", res)
          }
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .Csgorescue2022Take-dialog {
  background: url("../../../assets/active/csgorescue2022/dialog_panel.png") no-repeat center 29px;
  height: 373px;
  .el-dialog__header {
    height: 60px;
    background: url("../../../assets/active/csgorescue2022/dialog_header.png") no-repeat center top;
    .dialog-title {
      width: 285px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      font-size: 18px;
      line-height: 60px;
      color: #fff;
      white-space: nowrap;
      p {
        &:last-child {
          text-align: right;
        }
        i {
          display: inline-block;
          margin-right: 10px;
          width: 28px;
          height: 30px;
          vertical-align: middle;
          background: url("../../../assets/active/csgorescue2022/amount_icon.png") no-repeat;
        }
      }
    }
    .el-dialog__headerbtn {
      top: 4px;
      right: -30px;
      .el-dialog__close {
        width: 21px;
        height: 21px;
        background: url("../../../assets/active/csgorescue2022/dialog_close.png") no-repeat;
      }
    }
  }
  .el-dialog__body {
    padding: 0;
    .dialog-main {
      width: 500px;
      margin: 0 45px;
      h6 {
        margin-top: 48px;
        font-size: 16px;
        line-height: 16px;
        color: #c0bdc8;
        font-weight: normal;
      }
      .wallet-list {
        margin-top: 19px;
        li {
          display: inline-block;
          margin: 0 10px 10px 0;
          box-sizing: border-box;
          cursor: pointer;
          width: 160px;
          height: 60px;
          background-color: #191919;
          border: solid 2px #54494b;
          font-size: 16px;
          line-height: 60px;
          text-align: center;
          color: #c0bdc8;
          position: relative;
          &:before {
            position: absolute;
            content: "";
            width: 30px;
            height: 30px;
            bottom: 0;
            right: 0;
            background: url("../../../assets/active/csgorescue2022/wallet_no.png") no-repeat;
          }
          &:nth-child(3n+0) {
            margin: 0 0 10px 0;
          }
          &.active {
            border: solid 2px #ed272c;
            background-color: #141212;
            font-weight: bold;
            color: #ed272c;
            &:before {
              background: url("../../../assets/active/csgorescue2022/wallet_active.png") no-repeat;
            }
          }
        }
      }
      .take-btn {
        display: block;
        cursor: pointer;
        margin: 30px auto 0;
        width: 237px;
        height: 82px;
        border: 0;
        outline: 0;
        background: url("../../../assets/active/csgorescue2022/take_btn.png") no-repeat;
      }
    }
  }
}
</style>
