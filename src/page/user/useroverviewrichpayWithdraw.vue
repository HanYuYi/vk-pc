<template>
  <el-dialog
    v-dir-center="visible"
    :visible.sync="visible"
    custom-class="richpay-withdraw"
    width="810px"
    :close-on-click-modal="false"
    :append-to-body="true"
    :before-close="close">

    <div class="dialog_title" slot="title">转出</div>

    <div class="dialog_wrapper">
      <div class="form-item">
        <div class="label">转出至主钱包 ：</div>
        <div class="label-for">
          <input type="number"
                 class="ivu-input"
                 v-model.trim="withdrawAmount"
                 :placeholder="`最大可转${formatNumberSplit(params.total_balance)}`">
          <div class="tips">您将减少七日预期收益
            <small>
             {{ calcProfitTipAmount }}
            </small>
          </div>
        </div>
      </div>
      <div class="btn">
        <span class="btn_loading"
              v-if="loading">
        </span>
        <button
           class="d_btn normal"
           @click="handleVerifyForRichpayWithdraw"
           v-else>确定
        </button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import { formatNumberSplit } from '../../utils/util'

export default {
  name: "useroverviewrichpayWithdraw",
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
  data () {
    return {
      withdrawAmount: null,
      loading: false
    }
  },
  watch: {
    visible(bool) {
      bool && (this.withdrawAmount = null)
    }
  },
  computed: {
    calcProfitTipAmount () {
      let backAmount = 0
      if (typeof this.withdrawAmount === "number" || this.withdrawAmount > 0) {
        backAmount = this.withdrawAmount * this.params.richpay_seven_day_rate
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
      this.$emit('update:visible', false)
    },
    // 提现到V富通验证
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
      if(this.params.total_balance === 0.00 || parseFloat(this.withdrawAmount) > parseFloat(this.params.total_balance)) {
        this.$message({ message: "余额不足", type: "warning" })
        return false
      }
      // 转出金额不能小于1元
      if (parseFloat(this.withdrawAmount) < 1) {
        this.$message({ message: "转出金额不能小于1元哦", type: "warning" })
        return false
      }
      // V富通是否被锁定
      if (this.params.wallet_is_lock) {
        this.$message({ message: "您的V富通钱包被锁定，如有疑问请联系客服", type: "warning" })
        return false
      }
      this.submitWithdraw()
    },
    // 提交转出到主钱包
    submitWithdraw() {
      this.loading = true
      this.$http(this.ApiSetting.active.richPayTransferOutToMain, {
        money: parseFloat(this.withdrawAmount)
      })
        .then(({status, message, data}) => {
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
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="less" scoped>
.richpay-withdraw {
  &.el-dialog {
    .form-item {
      margin: 13px 53px 0;
      display: flex;
      .label {
        font-size: 18px;
        line-height: 34px;
        color: #ffffff;
        margin-right: 5px;
      }
      .label-for {
        width: 228px;
        .tips {
          font-size: 14px;
          line-height: 34px;
          color: #7c839f;
          margin-left: 13px;
          small {
            color: #07f0bb;
          }
        }
      }
    }
    .btn {
      padding: 50px 0 20px;
    }
  }
}
</style>
