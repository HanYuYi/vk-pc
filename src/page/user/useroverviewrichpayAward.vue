<template>
  <el-dialog
    custom-class="rich-award-dialog"
    :visible="visible"
    v-dir-center="visible"
    width="810px"
    :append-to-body="true"
    :lock-scroll="true"
    @close="richAwardClose"
    title="恭喜您获得"
    :close-on-click-modal="false"
    >

    <!-- 红包-->
    <div class="award-body">
      <div class="award-type-1" v-if="params.type == 1">
        <div class="award-img">
          <p class="amount">{{params.gift_price && (+params.gift_price).toFixed(1)}}<span>元</span></p>
        </div>
        <p class="award-name">{{params.gift_name}}</p>
        <p class="award-notice">{{params.message}}</p>
        <button class="award-btn" @click="richAwardClose">知道啦</button>
      </div>

      <!-- 翻倍券-->
      <div class="award-type-2" v-if="params.type == 2">
        <div class="award-img" :style="{background: `url(${require('../../assets/richpay/fbq_' + params.coupon_value +'.png')})`, backgroundSize: '100% 100%'}"></div>
        <p class="award-name">{{params.coupon_value}}倍券</p>
        <p class="award-notice">{{params.message}}</p>
        <div class="btns-group">
          <button class="award-btn el-button el-button--primary" @click="putRichpayAward">加入我的背包</button>
          <button class="award-btn" @click="useRichpayAward">立即使用</button>
        </div>
      </div>

    </div>
  </el-dialog>
</template>

<script>
import { mapActions } from 'vuex'
//import storage from '../../utils/storage'

export default {
  name: "useroverviewrichpayAward",
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
      loading: false
    };
  },
  // mounted() {
  //   if (storage.get('havaAward')) {
  //     this.putRichpayAward(1)
  //   }
  // },
  methods: {
    ...mapActions(["getRichpayData"]),
    //弹窗关闭
    richAwardClose(){
      //storage.remove('havaAward')
      this.$emit('update:visible', false)
    },
    // 使用奖品
    useRichpayAward () {
      if (this.loading) return
      this.loading = true
      this.$http(this.ApiSetting.active.richPaySavePrize, {id: this.params.coupon_id, type: 2})
        .then(({ status, message }) => {
          if (status === 1) {
            this.richAwardClose()
            this.$message({ message: message, type: 'success' })
            this.getRichpayData()
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    // 奖品放入背包
    putRichpayAward (status) {
      if (this.loading) return
      this.loading = true
      let coupon_id = this.params.coupon_id
      // if (status) {
      //   coupon_id = storage.get('havaAward')
      // } else {
        //coupon_id = this.params.coupon_id
      //}
      this.$http(this.ApiSetting.active.richPaySavePrize, {id: coupon_id, type: 1})
        .then(({ status, message }) => {
          if (status === 1) {
            this.richAwardClose()
            this.$message({ message: message, type: 'success' })
            //storage.remove('havaAward')
          }
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
};
</script>

<style lang="less" scoped>
/deep/ .rich-award-dialog {
  .el-dialog__header {
    .el-dialog__title {
      font-size: 14px;
      line-height: 48px;
      color: #fff;
    }
  }
  .el-dialog__body {
    padding: 0;

    .award-body {
      padding-bottom: 37px;

      .award-name {
        font-size: 14px;
        color: #fff;
        margin-top: 12px;
        text-align: center;
      }

      .award-notice {
        font-size: 14px;
        margin-top: 2px;
        color: #7c839f;
        text-align: center;
      }

      .award-type-1 {
        .award-img {
          width: 179px;
          height: 175px;
          font-size: 22px;
          font-weight: bold;
          text-align: center;
          line-height: 22px;
          color: #fcfbb8;
          background: url('../../assets/richpay/red_pack.png') no-repeat;
          background-size: 100% 100%;
          overflow: hidden;
          margin: 17px auto 0;

          .amount {
            margin-top: 130px;
            font-size: 22px;
            font-weight: bold;
            text-align: center;
            color: #fcfbb8;

            span {
              font-size: 15px;
              margin-left: 3px;
            }
          }
        }

        .award-btn {
          display: block;
          margin: 39px auto 0;
        }
      }

      .award-type-2 {
        .award-img {
          width: 262px;
          height: 110px;
          margin: 60px auto 0;
        }

        .award-name {
          margin-top: 29px;
        }

        .btns-group {
          margin: 39px auto 0;
          width: 300px;
          display: flex;
          justify-content: space-between;

          .award-btn {
            &:first-child {
              color: #fff;
              background: url("../../assets/richpay/close_user_luck.png") no-repeat;
            }
          }
        }
      }

      .award-btn {
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
      }
    }
  }
}
</style>
