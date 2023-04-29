<template>
      <el-dialog :close-on-click-modal="false" :custom-class="'vbmarket_address_dialog'" :visible.sync="isShowDio"
        :append-to-body="true">
        <div class="dialog_title" slot="title">
          {{ status == 'sending' ? '派发中' : status == 'success' ? '派发成功' : '派发失败' }}
        </div>
        <div class="dialog_wrapper">
          <div class="confirm-goods-form">
            <template v-if="goodsType == 'entity'">
              <div class="line">
                <span class="label">收货人姓名</span>
                <span class="desc">{{detail.receive}}</span>
              </div>
              <div class="line">
                <span class="label">手机号码</span>
                <span class="desc">{{detail.phone}}</span>
              </div>
              <div class="line">
                <span class="label">收货地址</span>
                <span class="desc">{{detail.province}}, {{detail.city}}<br />{{detail.address}}</span>
              </div>
              <template v-if="(status == 'success' || status == 'sending')">
                <div class="line">
                  <span class="label">快递公司</span>
                  <span class="desc">{{ detail.express_name ? detail.express_name : '暂无'}}</span>
                </div>
                <div class="line">
                  <span class="label">快递单号</span>
                  <span class="desc">{{ detail.express_no ? detail.express_no : '暂无' }}</span>
                  <span v-if="detail.express_no" @click="doCopy" style="margin-left: 14px;color:#07f1b7;text-decoration:underline;cursor: pointer;">复制</span>
                </div>
              </template>
              <template v-if="status == 'fail'">
                <div class="line">
                  <span class="label">失败原因</span>
                  <span class="desc">{{detail.remark}}</span>
                </div>
              </template>
            </template>
            <template v-if="goodsType == 'virtual'">
              <div class="line">
                <span class="label">账号信息</span>
                <span class="desc">{{ detail.secret }}</span>
              </div>
              <div class="line" v-if="(status == 'fail')">
                <span class="label">失败原因</span>
                <span class="desc">{{ detail.remark }}</span>
              </div>
            </template>
            <div class="bottom-btn-group d-flex align-center justify-center">
              <div @click="isShowDio = false" class="btn-normal forcash-btn">我知道了</div>
            </div>
          </div>
        </div>
      </el-dialog>
</template>

<script>
export default {
  name: 'DeliveryDialog',
  props: {
    status: {
      type: String,
      default: 'success'
    },
    detail: Object,
    goodsType: String
  },
  data() {
    return {
      isShowDio: false
    }
  },
  methods: {
    doCopy() {
      if (!this.detail.express_no) {
        return
      }
      this.$copyText(this.detail.express_no)
        .then(res => {
          this.$message({
            message: '快递单号复制成功!',
            type: 'success'
          })
        }, err => {
          this.$message({
            message: _this.$t("Copy_the_failure"),
            type: 'warning'
          })
        })
    }
  }
}
</script>

<style lang="less" scoped>
@import "./address.less";
</style>