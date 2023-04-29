<template>
    <el-dialog :close-on-click-modal="false" :custom-class="'vbmarket_address_dialog'" :visible.sync="isShowDio" :append-to-body="true">
      <div class="dialog_title" slot="title">是否继续使用上次收货地址</div>
      <div class="dialog_wrapper">
        <div class="confirm-goods-form">
          <div class="line">
            <span class="label">收货人姓名</span>
            <span class="desc">{{userAddress.receive}}</span>
          </div>
          <div class="line">
            <span class="label">手机号码</span>
            <span class="desc">{{userAddress.phone}}</span>
          </div>
          <div class="line">
            <span class="label">收货地址</span>
            <span class="desc">{{userAddress.province}}, {{userAddress.city}}<br/>{{userAddress.address}}</span>
          </div>
          <div class="bottom-btn-group d-flex align-center justify-center">
            <div @click="editAddress" class="btn-normal forcash-btn">编辑地址</div>
            <div @click="confirmEx" class="btn-normal forgoods-bt">继续使用</div>
          </div>
        </div>
      </div>
    </el-dialog>
</template>

<script>
export default {
  name: 'ConfirmBeforeAddressDio',
  props: {
    userAddress: Object
  },
  data() {
    return {
      isShowDio: false
    }
  },
  methods: {
    editAddress() {
      this.isShowDio = false
      this.$emit('edit-address-dio', true)
    },
    confirmEx() {
      this.isShowDio = false
      this.$emit('confirmExpress', {
        status: 'reuse',
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "./address.less";
</style>