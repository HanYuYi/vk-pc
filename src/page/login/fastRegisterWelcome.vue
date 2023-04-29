<template>
  <el-dialog
    :visible.sync="fastRegisterWelcomeVisible"
    v-backdrop
    :modal="false"
    custom-class="fastRegisterWelcome-dialog dialog_2022"
    width="518px"
    title="欢迎加入vkgame"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :append-to-body="true"
    :destroy-on-close="true"
    :before-close="allClose">
    <div class="dialog-main">

      <h5 class="content"><span>您的账号：</span><small>{{ userInfo.username }}</small></h5>
      <h5 class="content"><span>默认密码：</span><small>{{ userInfo.password }}</small></h5>

      <div class="btns-box">
        <button class="button_plain_2022" @click="allClose">去逛逛吧</button>
        <button class="button_primary_2022" @click="downLoadFile">下载保存账号</button>
      </div>

      <p class="affiliated">
        <a @click="close();$store.commit('setChangeAccountInfoVisible', true)" class="link_2022">修改账号信息</a>
        <a @click="close();$store.commit('setBindMobileNumberVisible', true)" class="link_2022">绑定手机号</a>
      </p>

    </div>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
import { saveAs } from 'file-saver';

export default {
  name: 'fastRegisterWelcome',
  computed: {
    ...mapState(["userInfo", "fastRegisterWelcomeVisible"]),
  },
  methods: {
    close() {
      this.$store.commit("setFastRegisterWelcomeVisible", false)
    },
    allClose() {
      this.close()
      this.$store.commit('updateUserInfo', { ...this.userInfo, first_login: 1 })
    },
    // 下载txt账号密码
    downLoadFile() {
      let txtStr = "您的账号：" + this.userInfo.username + "\n默认密码：" + this.userInfo.password
      const blob = new Blob([txtStr], { type: 'text/plain;charset=uft-8' })
      saveAs(blob, "极速注册账号密码.txt")
    }
  }
}
</script>

<style lang="less" scoped>
.fastRegisterWelcome-dialog {
  .dialog-main {
    width: 338px;
    margin: 0 auto;
    .content {
      font-size: 16px;
      font-weight: normal;
      color: #8e9ab2;
      display: flex;
      justify-content: space-between;
      span {
        line-height: 28px;
        display: inline-block;
        width: 49.5%;
        text-align: right;
        font-family: Roboto;
      }
      small {
        line-height: 28px;
        display: inline-block;
        width: 49.5%;
        font-size: 18px;
        color: #07f1b7;
        font-family: Roboto;
      }
    }
    .btns-box {
      margin-top: 30px;
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
    .affiliated {
      margin: 25px auto 20px;
      line-height: 14px;
      width: 196px;
      display: flex;
      justify-content: space-between;
      position: relative;
      a {
        cursor: pointer;
      }
      &:before {
        position: absolute;
        content: "";
        top: 0;
        left: 106px;
        width: 1px;
        height: 14px;
        background: #8e9ab2;
      }
    }
  }
}
</style>
