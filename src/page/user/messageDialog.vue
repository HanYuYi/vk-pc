<template>
  <el-dialog
    :visible="visible"
    @close="closeMsgDialog"
    custom-class="msg_detail_dialog"
    :close-on-click-modal="false">
    <div class="dialog_title" slot="title">{{ dailogTitle }}</div>
    <div class="dialog_wrapper">
      <div class="title" v-html="msgDetailInfo.title"></div>
      <div class="msg_content">
        <div v-html="msgDetailInfo.content"></div>
        <div class="msg_time" v-if="type === 2">
          {{ msgDetailInfo.time * 1000 | selfFormatDate('yyyy/MM/dd HH:mm:ss') }}
        </div>
      </div>
      <div class="btn">
        <a href="javascript:;" class="d_btn normal"
           @click="closeMsgDialog">{{$t("I_have_read")}}</a>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { formatDate } from '../../utils/util'

export default {
  name: 'messageDialog',
  props: ["visible", "dailogTitle", "type", "msgDetailInfo"],
  filters: {
    selfFormatDate (num, format) {
      return formatDate (num, format)
    }
  },
  methods: {
    closeMsgDialog () {
      this.$emit("update:visible", false)
    },
  }
}
</script>

<style lang="less" scoped>
/deep/ .msg_detail_dialog {
  width: 768px;
  .dialog_wrapper {
    padding: 20px 60px;
  }
  .title {
    font-size: 16px;
    color: #fff;
    text-align: center;
  }
  .msg_content {
    color: #7c839f;
    padding: 30px 0;
    line-height: 22px;
    box-sizing: border-box;
    min-height: 180px;
    .msg_time {
      margin-top: 30px;
      text-align: right;
    }
    .date-user-btm {
      display: block;
      width: 100%;
      text-align: right;
    }
  }
}
</style>
