<template>
  <el-dialog
    :visible.sync="bindMobileNumberTip.visible"
    v-backdrop
    :modal="false"
    custom-class="bindMobileNumberTip-dialog dialog_2022"
    width="518px"
    title="友情提醒"
    :close-on-click-modal="false"
    :append-to-body="true"
    :close-on-press-escape="false"
    :destroy-on-close="true"
    :before-close="close">

    <div class="dialog-man">
      <p class="tips">为了您的账号安全考虑，</p>
      <p class="tips">还请您尽快绑定手机号哦！</p>

      <div class="btns-box">
        <button v-if="bindMobileNumberTip.pointOfTime === 1" class="button_plain_2022" @click="close">稍后设置</button>
        <button v-if="bindMobileNumberTip.pointOfTime === 0" class="button_plain_2022" @click="close();$emit('loginOut')">安全退出</button>
        <button @click="toBind"class="button_primary_2022">立即绑定</button>
      </div>

    </div>

  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
import storage from '../../utils/storage'

export default {
  name: 'bindMobileNumberTip',
  computed: {
    ...mapState(["userInfo", "bindMobileNumberTip"]),
  },
  methods: {
    close() {
      this.$store.commit("setBindMobileNumberTip", { pointOfTime: -1, visible: false })
    },
    toBind() {
      storage.set(`to_user_page_count_${this.userInfo.user_id}`, "1")
      this.$router.push("/user/infosetting/safeset")
      this.close()
    }
  }
}
</script>

<style lang="less" scoped>
.bindMobileNumberTip-dialog {
  .dialog-man {
    width: 338px;
    margin: 16px auto 0;
    .tips {
      font-size: 16px;
      line-height: 28px;
      text-align: center;
      color: #8e9ab2;
    }

    .btns-box {
      margin-top: 41px;
      margin-bottom: 40px;
      height: 48px;
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      button {
        margin-top:0;
        display: block;
        width: 164px;
        height: 48px;
      }
      a {
        margin-top: 0;
        width: 164px;
      }
    }
  }
}
</style>
