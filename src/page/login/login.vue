<template>
  <div class="login">

    <ul class="title">
      <li v-for="(txt, index) in ['手机登录', '账号登录']"
          :key="index"
          @click="loginLoad ? null : loginType = index"
          :class="{active: loginType === index}">{{ txt }}</li>
    </ul>

    <!-- 手机号登录-->
    <div v-show="loginType === 0" class="form_wrapper">

      <el-form :model="phoneForm" :rules="phoneRules" ref="phoneForm">

        <!-- 手机号-->
        <el-form-item prop="phone" :error="phoneError" class="input_prepend_select_parent">
          <el-input v-model="phoneForm.phone" clearable :placeholder="$t('Please_enter_the_phone_number')" :maxlength="phoneForm.prefix === '86' ? 11 : 20">
            <div slot="prepend" class="input_prepend_select" @click="showCountryPopup = !showCountryPopup">
              <i class="input_cus_icon_phone"/>
              +{{phoneForm.prefix}}
              <i class="select_caret" :class="{open: showCountryPopup}"/>
              <Global-country-select :visible.sync="showCountryPopup" @change="assignmentPrefix" />
            </div>
          </el-input>
        </el-form-item>

        <!-- 手机验证码-->
        <el-form-item prop="phone_verify" :error="phoneVerifyError" class="info_validate_box">
          <el-input placeholder="请输入短信验证码" v-model="phoneForm.phone_verify" clearable class="input_ver" maxlength="6">
            <i slot="prepend" class="txt-ver-icon"/>
            <div slot="append" class="button_primary_2022 small"
             :class="{disabled: !phoneVerStatus || countDownShow}"
             @mousedown.prevent=""
             @click.prevent="getPhoneVer" style="margin-top: -1px">
              {{ countDownShow ? countDownTime + $t("Seconds_later") : (onceVerCode ? '重新发送' : phoneCodeSendText) }}
            </div>
          </el-input>
        </el-form-item>

      </el-form>

      <div class="btn">
        <button v-if="loginLoad" class="button_primary_2022 disabled">{{$t("Log_in")}}</button>
        <button v-else
                class="button_primary_2022"
                :class="{disabled: !phoneBtnStatus}"
                @click="validateForm">立即登录
        </button>
      </div>
    </div>


    <!-- 账号登录-->
    <div v-show="loginType === 1" class="form_wrapper">

      <el-form :model="accountForm" :rules="accountRules" ref="accountForm">

        <!-- 用户名-->
        <el-form-item prop="username" :error="userNameError">
          <el-input v-model="accountForm.username" clearable :placeholder="$t('Please_enter_your_user_name')" maxlength="18">
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
                    placeholder="请输入密码"
                    :class="[passwordType === 'password' ? 'hide' : 'show']" maxlength="20">
            <i slot="prepend" class="input_cus_icon_password"/>
          </el-input>

          <i v-if="accountForm.password.length || passViewIconShow" class="pass_view"
             @click="$refs.passRef.focus();passwordType = passwordType === 'password' ? 'text' : 'password'"/>
        </el-form-item>

        <!-- 验证码-->
        <template v-if="needverif && loginType === 1">
          <el-form-item v-if="verType === 0" prop="verifcode" :error="verCodeError">
            <el-input v-model="accountForm.verifcode" style="display: none" />
            <Validator @getResult="validatorResult" ref="validatorRef"/>
          </el-form-item>
          <el-form-item v-if="verType === 1">
            <Validator  @getResult="validatorResult" ref="validatorRef"/>
          </el-form-item>
        </template>

      </el-form>

      <div class="forget_link">
        <checkbox v-model="accountForm.auto_login" label="remember" class="login_type_checkbox">记住密码</checkbox>
        <router-link to="/forget" class="link_2022">{{$t("Forgot_password")}}?</router-link>
      </div>

      <div class="btn">
        <button v-if="loginLoad" class="button_primary_2022 disabled">{{$t("Log_in")}}</button>
        <button v-else
                class="button_primary_2022"
                :class="{disabled: !accountBtnStatus}"
                @click="validateForm">立即登录
        </button>
      </div>

    </div>

    <div class="login_footer_txt">
      还没有VKGAME账号？<router-link to="/register" class="link_primary_2022">立即注册</router-link>
    </div>

  </div>

</template>

<script type="text/javascript">
import Validator from '../../components/validator'
import GlobalCountrySelect from '../../components/global-country-select'
import { commonMixins } from './commonMixins.js'

export default {
  mixins: [commonMixins],
  name: 'logincopy',
  components: { Validator, GlobalCountrySelect },
  data () {
    return {
      loginType: 0,
      passViewIconShow: false,
      passwordType: "password",
      loginLoad: false,
      getVerLoading: false,
      needverif: false,
      userNameError: '',
      pwdError: '',
      verCodeError: '',
      accountForm: {
        username: '',
        password: '',
        verifcode: '',
        auto_login: false,
        verifGee: {}
      },
      accountRules: {
        username: [{ validator: this.checkUsernameFor14, trigger: 'blur' }],
        password: [{ validator: this.checkPassword, trigger: 'blur' }],
        verifcode: [{ validator: this.checkTxtVer, trigger: 'blur' }]
      },
      phoneError: '',
      phoneVerifyError: '',
      phoneForm: {
        phone: '',
        prefix: '86',
        phone_verify: ''
      },
      phoneRules: {
        phone: [{ validator: this.checkPhone, trigger: 'blur' }],
        phone_verify: [{ validator: this.checkPhoneVerify, trigger: 'blur' }]
      },
      showCountryPopup: false,
      phoneVerStatus: false,
      phoneBtnStatus: false,
      fromUrl: '',
      phoneCodeSendText: '获取验证码',
      countDownShow: false,
      countDownTime: 60,
      timer: null,
      accountBtnStatus: false,
      onceVerCode: false
    }
  },
  watch: {
    loginType(type) {
      // 重置手机号登录
      this.$refs.phoneForm.resetFields()
      this.phoneVerStatus = false
      this.phoneBtnStatus = false
      this.onceVerCode = false

      // 重置账号登录
      this.$refs.accountForm.resetFields()
      this.accountBtnStatus = false
      this.accountForm.verifcode = ''

      this.$nextTick(() => {
        if (type === 0) {
          this.phoneCodeSendText = '获取验证码'
          this.countDownShow = false
          this.countDownTime = 60
          clearInterval(this.timer)
          this.timer = null

          if (this.$refs.validatorRef) {
            this.$refs.validatorRef.destroyCaptcha()
          }
        }
        if (type === 1 && this.needverif && this.verType === 1) {
          this.needverif = false
        }
      })
    },
    // 监听手机登录按钮状态
    phoneForm: {
      handler(row) {
        this.phoneVerStatus = row.phone.trim().length > 0
        this.phoneBtnStatus = row.phone.trim().length > 0 && row.phone_verify.trim().length > 0
      },
      deep: true
    },
    // 监听账号登录按钮状态
    accountForm: {
      handler(row) {
        this.accountBtnStatus = row.username.trim().length > 0 && row.password.trim().length > 0

        if (this.accountBtnStatus) {
          if (this.needverif) {
            if (this.verType === 0) this.accountBtnStatus = row.verifcode.trim().length > 0
            if (this.verType === 1) this.accountBtnStatus = JSON.stringify(row.verifGee) != "{}"
          }
        }
      },
      deep: true
    }
  },
  computed: {
    verType() {
      return this.$store.state.loginModelData.verfiy
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$store.commit('showLoginBtn', false)
      vm.fromUrl = from.path
    })
  },
  beforeRouteLeave (to, from, next) {
    next()
  },
  mounted () {
    this.$nextTick(() => {
      document.onkeydown = (event) => {
        if(event.keyCode === 13){
          this.validateForm()
        }
      }
    })
  },
  methods: {
    // 对整个表单进行校验
    validateForm() {
      if (this.loginType === 0) {
        if (!this.phoneBtnStatus) return
        this.$refs.phoneForm.validate(bool => {
          if (bool) {
            this.loginPhoneSubmit()
          }
        })
      }
      if (this.loginType === 1) {
        if (!this.accountBtnStatus) return
        this.$refs.accountForm.validate(bool => {
          if (bool) {
            this.loginAccountSubmit()
          }
        })
      }
    },
    // 提交手机号登录
    loginPhoneSubmit() {
      if (!this.phoneBtnStatus || this.loginLoad) return

      let data = {
        phone: this.phoneForm.phone.split(" ").join(""),
        prefix: this.phoneForm.prefix,
        type: 2,
        phone_verify: this.phoneForm.phone_verify,
        auto_login: 1
      }

      this.loginLoad = true
      this.phoneError = ''
      this.phoneVerifyError = ''

      console.info("手机号登录入参：", data)
      this.$http(this.ApiSetting.index.login, data)
        .then((res) => {
          console.info("手机号登录响应：", res)
          if (res.status === 1) {
            this.phoneCodeSendText = '获取验证码'
            this.countDownShow = false
            this.countDownTime = 60
            clearInterval(this.timer)
            this.timer = null

            this.$message({ type: 'success', message: res.message })
            this.loginDispatch(res.data)
          } else {
            switch (res.field) {
              case 'phone':
                this.phoneError = res.message
                break
              case 'verify_code':
                this.phoneVerifyError = res.message
                break
            }
          }
        })
        .finally(() => { this.loginLoad = false })
    },
    // 提交账号登录
    loginAccountSubmit () {
      if (!this.accountBtnStatus || this.loginLoad) return
      let data = {
        username: this.accountForm.username,
        password: this.accountForm.password,
        verify_code: this.accountForm.verifcode,
        hideMsg: true,
        type: 1,
        auto_login: +this.accountForm.auto_login,
        ...this.accountForm.verifGee
      }
      this.loginLoad = true
      this.userNameError = ''
      this.pwdError = ''
      this.verCodeError = ''
      console.info("账号登录入参：", data)
      this.$http(this.ApiSetting.index.login, data)
        .then((res) => {
          console.info("账号登录响应：", res)
          if (res.status === 1) {
            this.$message({ type: 'success', message: res.message })
            if (this.needverif) this.$refs.validatorRef.destroyCaptcha()
            this.loginDispatch(res.data)
          } else {
            if (this.needverif) {
              if (this.verType === 1 && this.$refs.validatorRef) {
                this.$refs.validatorRef.reset()
              }
            }
            switch (res.field) {
              case 'username':
                this.userNameError = res.message
                break
              case 'password':
                this.pwdError = res.message
                break
              case 'verify_code':
                if (this.needverif) {
                  if (this.verType === 0) {
                    this.verCodeError = res.message
                  }
                  this.$refs.validatorRef.reset()
                }
                break
            }
            if (res.show_verify) {
              this.needverif = true
            }
          }
        }).finally(() => { this.loginLoad = false })
    },
    // 登录后操作
    loginDispatch(data) {
      this.$store.commit('updateLoginStatus', true)
      this.$store.commit('updateUserInfo', data)
      this.$store.dispatch('getUserInfo', {hideMsg: true})
      this.$store.commit('updateLoadHostpot', true)
      this.$router.push({path: '/'})
    },
    // 手机前缀
    assignmentPrefix(value) {
      this.phoneForm.phone = ''
      this.phoneForm.prefix = value
    },
    // 获取手机验证码
    getPhoneVer() {
      if (this.phoneVerStatus) {
        let data = {
          phone: this.phoneForm.phone.split(" ").join(""),
          prefix: this.phoneForm.prefix,
          type: 2,
          hideMsg: true
        }

        if (this.phoneCodeSendText === this.$t('Send_in')) return

        if (this.countDownShow) return

        if (this.getVerLoading) return

        this.getVerLoading = true

        this.phoneCodeSendText = this.$t('Send_in')

        console.info("获取手机验证码入参：", data)
        this.$http(this.ApiSetting.index.sendPhoneVerCode, data)
          .then((res) => {
            console.info("获取手机验证码响应：", res)
            if (res.status === 1) {
              this.onceVerCode = true
              this.countDownShow = true
              this.countDownTime = res.data.seconds

              clearInterval(this.timer)
              this.timer = setInterval(() => {
                this.countDownTime--
                if (this.countDownTime <= 0) {
                  this.countDownShow = false
                  this.countDownTime = res.data.seconds
                  clearInterval(this.timer)
                }
              }, 1000)

            }
          }).finally(() => {
            this.phoneCodeSendText = this.$t('Send_verification_code')
            this.getVerLoading = false
          })
      }
    },
    // 验证器结果
    validatorResult(result) {
      this.accountForm.verifcode = result[0]
      this.accountForm.verifGee = result[1]
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  .form_wrapper {
    .forget_link {
      margin-top: 30px;
      display: flex;
      justify-content: space-between;
      a {
        font-size: 14px;
        line-height: 14px;
      }
    }
  }
}
</style>
