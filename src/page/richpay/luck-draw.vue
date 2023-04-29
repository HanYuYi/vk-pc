<template>
  <el-dialog
    v-dir-center="show"
    :visible="show"
    custom-class="public_richpay_dialog"
    title="恭喜获得"
    :before-close="close">

    <div class="abs_panel richpay-page-luck-draw">

      <!-- 红包-->
      <div class="award-type-1" v-if="awardData.type == 1">
        <div class="award-img">
          <p class="amount">{{awardData.gift_price && (+awardData.gift_price).toFixed(1)}}<span> 元</span></p>
        </div>
        <button class="richpay_btn active" @click="close">知道了</button>
        <p class="award-notice"><span>*</span>{{awardData.message}}</p>
      </div>

      <!-- 翻倍券-->
      <div class="award-type-2" v-if="awardData.type == 2">
        <div class="award-img" :style="{background: `url(${require('../../assets/richpay/fbq_' + awardData.coupon_value +'.png')})`, backgroundSize: '100% 100%'}"></div>
        <div class="btns-group">
          <button class="richpay_btn" @click="richPaySavePrize(1)">加入我的背包</button>
          <button class="richpay_btn active" @click="richPaySavePrize(2)">立即使用</button>
        </div>
        <p class="award-notice"><span>*</span>{{awardData.message}}</p>
      </div>

    </div>

  </el-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'luck-draw',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    awardData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      show: this.visible
    }
  },
  watch: {
    visible () {
      this.show = this.visible
    }
  },
  methods: {
    ...mapActions(['getRichpayData']),
    close () {
      if (this.loading) {
        this.$message({ message: '正在提交，请稍等', type: 'warning'})
        return
      }
      this.show = false
      this.$emit('update:visible', false)
    },
    // 奖品放入背包 或 使用奖品
    richPaySavePrize (type) {
      if (this.loading) return
      this.loading = true
      let data = {
        type,
        id: this.awardData.coupon_id
      }
      this.$http(this.ApiSetting.active.richPaySavePrize, data)
        .then(response => {
          this.loading = false
          if (response.status === 1) {
            this.$message({ message: response.message, type: 'success' })
            this.close()
            if (type == 2) {
              this.getRichpayData()
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
  height: 330px;

  .richpay-page-luck-draw {
    top: 8px;
    left: 125px;
    width: 380px;
    text-align: left;
    .award-type-1 {
      text-align: center;
      .award-img {
        width: 208px;
        height: 194px;
        margin: 13px auto 0;
        overflow: hidden;
        background: url("../../assets/richpay/red_pack.png");
        background-size: 100% 100%;
        .amount {
          margin-top: 145px;
          font-size: 22px;
          font-weight: bold;
          text-align: center;
          color: #fcfbb8;
          span {
            font-size: 14px;
          }
        }
      }
      .richpay_btn {
        display: block;
        margin: 43px auto 0;
      }
    }

    .award-type-2 {
      text-align: center;
      .award-img {
        width: 262px;
        height: 110px;
        margin: 70px auto 0;
        overflow: hidden;
      }
      .btns-group {
        margin-top: 75px;
        display: flex;
        justify-content: space-between;
      }
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
