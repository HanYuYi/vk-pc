<template>
  <el-dialog
    v-dir-center="show"
    :visible="show"
    custom-class="public_richpay_dialog"
    title="未提利息"
    :before-close="close">

    <div class="abs_panel richpay-page-withdrawal-interest">

      <div class="panel">
        <div class="desc-panel">
          <p class="title">未提利息 <span>{{formatNumberSplit(richpayInitData.wallet_info.interest_balance)}} 元</span>， 您可以：</p>
          <p class="tip">
            提至主钱包无流水要求即可提款<br/>
            提至V富通钱包继续累积收益(1元起)
          </p>
        </div>

        <div class="btns-group">
          <button @click="richPayWithdrawInterest(0)" class="richpay_btn">提至主钱包</button>
          <button @click="richPayWithdrawInterest(1)" class="richpay_btn active">转回V富通钱包</button>
        </div>

      </div>
    </div>

  </el-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { formatNumberSplit } from '../../utils/util'

export default {
  name: 'withdrawal-interest',
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      show: this.visible,
      loading: false,
    }
  },
  watch: {
    visible () {
      this.show = this.visible
    }
  },
  computed: {
    ...mapState(['richpayInitData'])
  },
  methods: {
    ...mapActions(['getRichpayData', 'getUserMoeny']),
    formatNumberSplit (num) {
      return formatNumberSplit(num)
    },
    close () {
      if (this.loading) {
        this.$message({message: '正在提交，请稍等', type: 'warning'})
        return
      }
      this.show = false
      this.$emit('update:visible', false)
    },
    // 提取利息
    richPayWithdrawInterest (type) {
      if (this.loading) return
      // 余额是否足够
      if (type && this.richpayInitData.wallet_info.interest_balance < 1) {
        this.$message({ message: '转入V富通钱包需要1元起哦~', type: 'warn' })
        return
      }
      // V富通是否被锁定
      if (this.richpayInitData.wallet_is_lock) {
        this.$message({ message: '您的V富通钱包被锁定，如有疑问请联系客服', type: 'warn' })
        return
      }
      this.loading = true
      this.$http(this.ApiSetting.active.richPayWithdrawInterest, {
        type,
        money: parseFloat(this.richpayInitData.wallet_info.interest_balance)
      })
        .then(response => {
          this.loading = false
          if (response.status === 1) {
            this.getRichpayData()
            this.getUserMoeny('NM')
            this.$message({ message: response.message, type: 'success' })
            this.close()
          }
        })
        .finally(() => { this.loading = false })
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-dialog__body {
  height: 334px;

  .richpay-page-withdrawal-interest {
    top: 8px;
    left: 125px;
    width: 380px;
    .panel {
      margin-top: 50px;
      .desc-panel {
        font-size: 18px;
        .title {
          color: #fff;
          line-height: 42px;
          span {
            color: #83f9fd;
            font-weight: bold;
          }
        }
        .tip {
          color: #a1a3df;
          line-height: 42px;
        }
      }

      .btns-group {
        margin-top: 85px;
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>
