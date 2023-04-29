<template>
  <el-dialog
    custom-class="user-transfer-out-gift"
    :visible="visible"
    v-dir-center="visible"
    width="810px"
    :append-to-body="true"
    :lock-scroll="true"
    @close="close"
    title="V富通转账红包"
    :close-on-click-modal="false">

    <template v-if="status === 1" >
      <div class="award-img">
        <div class="amount">
          <b>{{ formatNumberSplit(params.bonus)[0] }}</b>.{{ formatNumberSplit(params.bonus)[1] }} 元
        </div>
      </div>
      <p class="award-notice" style="margin-top: 42px">领取后需完成(转出金额+彩金)1倍全站流水</p>
      <div class="btns-group">
        <button class="richpay_btn normal" @click="close" :class="{disabled: loading}">暂不领取</button>
        <button class="richpay_btn" @click="getTransferOutGift" :class="{disabled: loading}">立即领取</button>
      </div>
    </template>

    <template v-else>
      <div class="award-img">
        <div class="amount">
          <b>{{ formatNumberSplit(getSuccessMoney)[0] }}</b>.{{ formatNumberSplit(getSuccessMoney)[1] }} 元
        </div>
      </div>
      <small class="desc">恭喜您获得</small>
      <p class="award-notice">彩金已转入您的主钱包</p>
      <div class="btns-group" style="justify-content: center">
        <button class="richpay_btn" @click="toShare">分享领福利</button>
      </div>
    </template>

  </el-dialog>
</template>

<script>
import {mapActions} from 'vuex'
import {formatNumberSplit} from '../../utils/util'

export default {
  name: 'user-transfer-out-gift',
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
    }
  },
  methods: {
    ...mapActions(['getRichpayData', 'getUserMoeny']),
    formatNumberSplit (num) {
      return formatNumberSplit(num).split(".")
    },
    close() {
      if (this.loading) {
        this.$message({ message: '正在提交，请稍等', type: 'warning' })
        return
      }
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
          this.loading = true
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
/deep/ .user-transfer-out-gift {
  .el-dialog__header {
    .el-dialog__title {
      font-size: 14px;
      line-height: 48px;
      color: #fff;
    }
  }

  .el-dialog__body {
    padding: 0;
    padding-bottom: 37px;
    .award-img {
      width: 140px;
      height: 154px;
      background: url("../../assets/richpay/transfer_out_gift.png") no-repeat;
      position: relative;
      overflow: hidden;
      margin: 30px auto 0;
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
    }
    .desc {
      margin-top: 20px;
      width: 100%;
      display: block;
      font-size: 14px;
      line-height: 14px;
      text-align: center;
      color: #fff;
    }
    .award-notice {
      margin-top: 5px;
      font-size: 14px;
      line-height: 14px;
      text-align: center;
      color: #7c839f;
    }
    .btns-group {
      width: 300px;
      margin: 39px auto 0;
      display: flex;
      justify-content: space-between;
      .richpay_btn {
        border: 0;
        outline: 0;
        width: 120px;
        height: 32px;
        border-radius: 16px;
        color: #000;
        font-size: 14px;
        cursor: pointer;
        background: linear-gradient(to right, #07e9f1, #07f1b7);

        &:hover {
          color: #fff
        }

        &.normal {
          color: #fff;
          background: url("../../assets/richpay/close_user_luck.png") no-repeat;
        }
      }
    }
  }
}
</style>
