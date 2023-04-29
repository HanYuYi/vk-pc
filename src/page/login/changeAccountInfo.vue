<template>
  <el-dialog
    :visible.sync="changeAccountInfoVisible"
    v-backdrop
    :modal="false"
    custom-class="changeAccountInfo-dialog dialog_2022"
    width="518px"
    title="修改账号信息"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :append-to-body="true"
    :destroy-on-close="true"
    :before-close="close">

    <el-form :model="accountForm" :rules="accountRules" ref="accountForm" class="form-main" @submit.native.prevent>

      <!-- 用户名-->
      <el-form-item prop="username" :error="userNameError">
        <el-input v-model="accountForm.username" clearable :placeholder="$t('letters_or_digit')" maxlength="18">
          <i slot="prepend" class="input_cus_icon_username"/>
        </el-input>
      </el-form-item>

      <!-- 密码-->
      <el-form-item prop="password" :error="pwdError">
        <el-input ref="passRef"
                  :type="passwordType"
                  @focus="passViewIconShow = true"
                  @blur="passViewIconShow = false"
                  autocomplete="off"
                  v-model="accountForm.password"
                  clearable
                  :placeholder="$t('Please_enter_the_6')"
                  :class="[passwordType === 'password' ? 'hide' : 'show']"
                  maxlength="24">
          <i slot="prepend" class="input_cus_icon_password"/>
        </el-input>

        <i v-if="accountForm.password.length || passViewIconShow" class="pass_view"
           @click="$refs.passRef.focus();passwordType = passwordType === 'password' ? 'text' : 'password'"/>
      </el-form-item>

      <el-form-item>
        <button v-if="loading" class="button_primary_2022 disabled">修改中...</button>
        <button v-else
                class="button_primary_2022"
                :class="{disabled: !accountBtnStatus}"
                @click="validateForm">{{$t("Confirm_the_change")}}
        </button>
      </el-form-item>
    </el-form>

    <ul class="desc">
      <li>温馨提示：</li>
      <li>1、账号不修改无法投注且只能修改一次;</li>
      <li>2、下次修改密码请前往个人中心-个人设置页;</li>
    </ul>
  </el-dialog>
</template>

<script>
import { commonMixins } from './commonMixins.js'
import { mapState } from 'vuex'

export default {
  mixins: [commonMixins],
  name: 'changeAccountInfo',
  computed: {
    ...mapState(["userInfo", "changeAccountInfoVisible"]),
  },
  data() {
    return {
      passwordType: "password",
      passViewIconShow: false,
      userNameError: '',
      pwdError: '',
      accountForm: {
        username: '',
        password: '',
      },
      accountRules: {
        username: [{ validator: this.checkUsername, trigger: 'blur' }],
        password: [{ validator: this.checkPassword, trigger: 'blur' }]
      },
      loading: false,
      accountBtnStatus: false
    }
  },
  watch: {
    changeAccountInfoVisible(bool) {
      if (bool) {
        this.passwordType = "password"
        this.passViewIconShow = false
        this.accountForm = {
          username: '',
          password: ''
        }
        this.accountBtnStatus = false
        this.$nextTick(() => {
          this.$refs.accountForm.resetFields()
        })
      }
    },
    accountForm: {
      handler(row) {
        this.accountBtnStatus = row.username.trim().length > 0 && row.password.trim().length > 0
      },
      deep: true
    }
  },
  methods: {
    close () {
      if (this.loading) {
        this.$message({message: "修改中，请稍等...", type: 'warning'})
        return
      }
      this.$store.commit("setChangeAccountInfoVisible", false)
      this.$store.commit('updateUserInfo', {...this.userInfo, first_login: 1})
    },
    // 对整个表单进行校验
    validateForm () {
      if (!this.accountBtnStatus) return
      this.$refs.accountForm.validate(bool => {
        if (bool) {
          this.changeAccountSubmit()
        }
      })
    },
    // 提交修改账号
    changeAccountSubmit() {
      if (!this.accountBtnStatus || this.loading) return
      this.userNameError = ''
      this.pwdError = ''

      let params = {
        username: this.accountForm.username,
        old_password: this.userInfo.password,
        new_password: this.accountForm.password,
      }
      this.loading = true

      console.info("极速注册修改账号、密码入参：", params)

      this.$http(this.ApiSetting.user.setRegisterAfterInfo, params)
        .then(res => {
          this.loading = false
          console.info("极速注册修改账号、密码响应：", res)

          if (res.status === 1) {

            let newInfo = this.userInfo
            if(params.username){
              newInfo.username = params.username
            }
            this.$store.commit('updateUserInfo',newInfo)
            this.$message({ message: "修改成功！", type: 'success' })
            this.close()
          }

        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="less" scoped>
.changeAccountInfo-dialog {
  .form-main {
    width: 338px;
    margin: 7px auto 0;
    .el-form-item {
      margin-bottom: 30px;
      &:last-child {
        margin-bottom: 26px;
      }
    }
    .button_primary_2022 {
      margin-top: 0;
    }
  }

  .desc {
    width: 338px;
    margin: 0 auto 23px;
    font-size: 13px;
    line-height: 13px;
    color: #8e9ab2;
    li {
      height: 20px;
      &:first-child {
        font-weight: bold;
        margin-bottom: 2px;
      }
    }
  }
}
</style>
