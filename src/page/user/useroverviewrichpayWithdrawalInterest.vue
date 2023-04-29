<template>
  <el-dialog
    v-dir-center="visible"
    :visible.sync="visible"
    custom-class="withdrawal-interest"
    width="810px"
    :close-on-click-modal="false"
    :append-to-body="true"
    :before-close="close">

    <div class="dialog_title" slot="title">提息</div>

    <div class="dialog_wrapper">
      <h3 class="title">
        未提利息 {{ formatNumberSplit(params.interest_balance) }}元，您可以：
      </h3>
      <p class="desc">
        提至主钱包无流水要求即可提款，提至V富通钱包继续累积收益({{ params.withdraw_min_amount }}元起)。
      </p>
      <div class="btn">
        <span class="btn_loading" v-if="loading"></span>
        <template v-else>
          <button class="d_btn normal"
                  @click="handleVerifyForRichpayWithdraw(0)">提至主钱包
          </button>
          <button class="d_btn normal"
                  @click="handleVerifyForRichpayWithdraw(1)">转回V富通钱包
          </button>
        </template>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import {mapActions} from 'vuex'
import {formatNumberSplit} from '../../utils/util'

export default {
  name: "useroverviewrichpayWithdrawalInterest",
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
      loading: false
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
    // 提息验证
    handleVerifyForRichpayWithdraw (type) {
      if (this.loading) return false
      // 余额是否足够
      if(type === 1 && this.params.interest_balance < 1) {
        this.$message({ message: "转入V富通钱包需要1元起哦~", type: "warning" })
        return false
      }
      // V富通是否被锁定
      if (this.params.wallet_is_lock) {
        this.$message({ message: "您的V富通钱包被锁定，如有疑问请联系客服", type: "warning" })
        return false
      }
      this.submitWithdrawlInterest(type)
    },
    submitWithdrawlInterest (type) {
      this.loading = true
      this.$http(this.ApiSetting.active.richPayWithdrawInterest, {
        type,
        money: parseFloat(this.params.interest_balance)
      })
        .then(({status, message}) => {
          if (status === 1) {
            this.getRichpayData()
            this.getUserMoeny("NM")
            this.$message({ message: message, type: "success" })
            this.close();
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
.withdrawal-interest {
  &.el-dialog {
    .dialog_wrapper {
      margin: 20px 53px 20px;
      .title {
        font-weight: normal;
        font-size: 18px;
        line-height: 18px;
        color: #ffffff;
        small {
          color: #07f0bb;
        }
      }
      .desc {
        color: #7c839f;
        font-size: 14px;
        line-height: 14px;
        margin-top: 20px;
      }
      .btn {
        margin-top: 50px;
        .d_btn {
          margin: 0 32px;
        }
      }
    }
  }
}
</style>
