<template>
  <el-dialog
    v-dir-center="show"
    :visible="show"
    custom-class="public_richpay_dialog"
    title="V富通转账红包"
    :before-close="close">

    <div class="abs_panel richpay-page-out-gift">

      <template v-if="status === 1" >
        <div class="award-img">
          <div class="amount">
            <b>{{ formatNumberSplit(params.bonus)[0] }}</b>.{{ formatNumberSplit(params.bonus)[1] }} 元
          </div>
        </div>
        <div class="btns-group">
          <button class="richpay_btn" @click="close" :class="{disabled: loading}">暂不领取</button>
          <button class="richpay_btn active" @click="getTransferOutGift" :class="{disabled: loading}">立即领取</button>
        </div>
        <p class="award-notice"><span>*</span>领取后需完成(转出金额+彩金)1倍全站流水</p>
      </template>

      <template v-else>
        <div class="award-img">
          <div class="amount">
            <b>{{ formatNumberSplit(getSuccessMoney)[0] }}</b>.{{ formatNumberSplit(getSuccessMoney)[1] }} 元
          </div>
          <small class="desc">恭喜您获得</small>
        </div>
        <div class="btns-group" style="justify-content: center">
          <button class="richpay_btn active" @click="toShare">分享领福利</button>
        </div>
        <p class="award-notice"><span>*</span>彩金已转入您的主钱包</p>
      </template>

    </div>

  </el-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import { formatNumberSplit } from '../../utils/util'

export default {
  name: 'transfer-out-gift',
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
  data() {
    return {
      show: this.visible,
      status: 1,
      loading: false,
      getSuccessMoney: 0
    }
  },
  watch: {
    visible (bool) {
      if (bool) {
        this.status = 1
      }
      this.show = this.visible
    }
  },
  methods: {
    ...mapActions(['getRichpayData', 'getUserMoeny']),
    formatNumberSplit (num) {
      return formatNumberSplit(num).split(".")
    },
    close () {
      if (this.loading) {
        this.$message({ message: '正在提交，请稍等', type: 'warning' })
        return
      }
      this.show = false
      this.$emit('update:visible', false)
    },
    toShare () {
      this.close()
      this.$router.push('/active/callfriends')
    },
    getTransferOutGift () {
      if (this.loading) return
      this.loading = true
      this.$http(this.ApiSetting.active.richPayGetjoinPlus, { money: this.params.money, plus_fees: this.params.plusFees })
        .then(response => {
          this.loading = false
          if (response.status === 1 && response.data) {
            this.getRichpayData()
            this.getUserMoeny('NM')
            this.getSuccessMoney = response.data.item_price
            this.status = 2
          }
        }).finally(() => { this.loading = false })
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-dialog__body {
  height: 334px;

  .richpay-page-out-gift {
    top: 8px;
    left: 125px;
    width: 380px;
    .award-img {
      width: 140px;
      height: 154px;
      background: url("../../assets/richpay/transfer_out_gift.png") no-repeat;
      position: relative;
      overflow: hidden;
      margin: 47px auto 0;
      .amount {
        width: 100%;
        margin-top: 20px;
        font-size: 16px;
        text-align: center;
        color: #da3d27;
        font-weight: bold;

        b {
          font-size: 24px;
          line-height: 24px;
          vertical-align: revert;
        }
      }
      .desc {
        margin-top: 72px;
        width: 100%;
        display: block;
        font-size: 18px;
        line-height: 18px;
        text-align: center;
        color: #fff;
      }
    }
    .btns-group {
      margin-top: 58px;
      display: flex;
      justify-content: space-between;
    }
    .award-notice {
      margin-top: 20px;
      font-size: 18px;
      line-height: 18px;
      text-align: center;
      color: #a1a3df;
      span {
        color: #83f9fd;
        margin-right: 20px;
        vertical-align: sub;
      }
    }
  }
}
</style>
