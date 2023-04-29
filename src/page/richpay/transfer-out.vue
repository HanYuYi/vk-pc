<template>
  <el-dialog
    v-dir-center="show"
    :visible="show"
    custom-class="public_richpay_dialog"
    title="转出至主钱包"
    :before-close="close">

    <div class="abs_panel richpay-page-out">
      <div class="form-item">
        <div class="item-for">
          <i class="input-icon"></i>
          <input type="number"
                 class="ivu-input"
                 v-model.trim="withdrawAmount"
                 :placeholder="`最大可转${formatNumberSplit(richpayInitData.wallet_info.total_balance)}`">
        </div>

        <div class="tips">您将减少七日预期收益
          <small>{{ calcProfitTipAmount }}</small>
        </div>
      </div>

      <button
        class="richpay_btn"
        :class="{disabled: loading}"
        @click="handleVerifyForRichpayWithdraw">确定
      </button>
    </div>

  </el-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { formatNumberSplit } from '../../utils/util'

export default {
  name: 'transfer-out',
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  watch: {
    visible (bool) {
      !bool && (this.withdrawAmount = null)
      this.show = this.visible
    }
  },
  data() {
    return {
      show: this.visible,
      withdrawAmount: null,
      loading: false
    }
  },
  computed: {
    ...mapState(['richpayInitData']),
    calcProfitTipAmount () {
      let backAmount = 0
      if (typeof this.withdrawAmount === "number" || this.withdrawAmount > 0) {
        backAmount = this.withdrawAmount * this.richpayInitData.wallet_info.richpay_seven_day_rate
      }
      return this.formatNumberSplit(backAmount)
    }
  },
  methods: {
    ...mapActions(["getRichpayData", "getUserMoeny"]),
    formatNumberSplit(num) {
      return formatNumberSplit(num)
    },
    close () {
      if (this.loading) {
        this.$message({ message: '正在提交，请稍等', type: 'warning' })
        return
      }
      this.show = false
      this.$emit('update:visible', false)
    },
    // 转出前验证
    handleVerifyForRichpayWithdraw () {
      if (this.loading) return false
      // 是否输入了金额
      if (this.withdrawAmount === null || this.withdrawAmount === "") {
        this.$message({
          message: this.$t("Please_enter_the_amount_of"),
          type: "warning"
        })
        return false
      }
      // 余额是否足够
      if(this.richpayInitData.wallet_info.total_balance === 0.00 || parseFloat(this.withdrawAmount) > parseFloat(this.richpayInitData.wallet_info.total_balance)) {
        this.$message({ message: "余额不足", type: "warning" })
        return false
      }
      // 转出金额不能小于1元
      if (parseFloat(this.withdrawAmount) < 1) {
        this.$message({ message: "转出金额不能小于1元哦", type: "warning" })
        return false
      }
      // V富通是否被锁定
      if (this.richpayInitData.wallet_is_lock) {
        this.$message({ message: "您的V富通钱包被锁定，如有疑问请联系客服", type: "warning" })
        return false
      }
      this.submitWithdraw()
    },
    // 提交转出
    submitWithdraw() {
      this.loading = true
      this.$http(this.ApiSetting.active.richPayTransferOutToMain, {
        money: parseFloat(this.withdrawAmount)
      })
        .then(({status, message, data}) => {
          this.loading = false
          if (status === 1) {
            this.getRichpayData()
            this.getUserMoeny("NM")
            this.$message({ message: message, type: "success" })
            this.close();
            if (parseFloat(data.plus_bonus) > 0) {
              this.$emit("back", {
                bonus: parseFloat(data.plus_bonus),
                plusFees: data.plus_fees,
                money: parseFloat(this.withdrawAmount)
              })
            }
          }
        })
        .finally(() => { this.loading = false })
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-dialog__body {
  height: 361px;
  .richpay-page-out {
    top: 8px;
    left: 115px;
    width: 400px;
    .form-item {
      margin-top: 69px;
      .item-for {
        border-bottom: solid 1px #83f9fd;
        .input-icon {
          display: inline-block;
          width: 14px;
          height: 21px;
          background: url("../../assets/richpay/cny_icon.png") no-repeat;
          vertical-align: text-bottom;
        }
        input {
          width: 380px;
          height: 36px;
          padding: 0 10px;
          margin: 0;
          font-size: 18px;
          color: #8cfaff;
          border: 0;
          border-radius:0;
          &::-webkit-input-placeholder {
            color: #a1a3df;
          }
        }
      }
      .tips {
        font-size: 18px;
        color: #a1a3df;
        margin-top: 8px;
        small {
          font-size: 18px;
          color: #8cfaff;
        }
      }
    }
    .richpay_btn {
      margin: 120px auto 0;
    }
  }
}
</style>
