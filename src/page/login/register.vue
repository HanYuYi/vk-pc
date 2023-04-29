<template>
  <div class="register">

    <ul class="title">
      <li v-for="(txt, index) in registerTypeList"
          :key="index"
          @click="registerLoad ? null : registerType = index"
          :class="{active: registerType === index}">{{ txt }}</li>
    </ul>

    <!-- 手机号注册-->
    <div v-show="registerType === 0" class="form_wrapper">

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
            <div slot="append" class="button_primary_2022 small" :class="{disabled: !phoneVerStatus || countDownShow}"
             @mousedown.prevent=""
             @click.prevent="getPhoneVer" style="margin-top: -1px">
              {{ countDownShow ? countDownTime + $t("Seconds_later") : (onceVerCode ? '重新发送' : phoneCodeSendText) }}
            </div>
          </el-input>
        </el-form-item>

        <!-- 邀请码-->
        <el-form-item class="info_validate_box" prop="invitecode" :error="phoneInvitecodeError">
          <el-input :placeholder="$t('Please_enter_the_invitation_code')" v-model="phoneForm.invitecode" clearable>
            <i slot="prepend" class="input_cus_icon_invitation"/>
          </el-input>
        </el-form-item>

      </el-form>

      <div class="registration">
        注册即代表同意<router-link to="/serviceterms" class="link_2022">{{$t("VKGAME_user_registration_and_service")}}</router-link>
      </div>

      <div class="btn">
        <button v-if="registerLoad" class="button_primary_2022 disabled">{{$t("Registered_in")}}</button>
        <button v-else
                class="button_primary_2022"
                :class="{disabled: !phoneBtnStatus}"
                @click="validateForm">{{$t("Register_now")}}
        </button>
      </div>
    </div>


    <!--账号注册-->
    <div v-show="registerType === 1" class="form_wrapper">
      <el-form :model="accountForm" :rules="accountRules" ref="accountForm">

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

        <!-- 邀请码-->
        <el-form-item class="info_validate_box" prop="invitecode" :error="accountInvitecodeError">
          <el-input :placeholder="$t('Please_enter_the_invitation_code')" v-model="accountForm.invitecode" clearable>
            <i slot="prepend" class="input_cus_icon_invitation"/>
          </el-input>
        </el-form-item>

        <!-- 验证码-->
        <template>
          <el-form-item v-if="verType === 0 && registerType === 1" prop="verifcode" :error="verCodeError">
            <el-input v-model="accountForm.verifcode" style="display: none" />
            <Validator @getResult="validatorResult" ref="validatorRef"/>
          </el-form-item>
          <el-form-item v-if="verType === 1 && registerType === 1">
            <Validator @getResult="validatorResult" ref="validatorRef"/>
          </el-form-item>
        </template>
      </el-form>

      <div class="registration">
        注册即代表同意<router-link to="/serviceterms" class="link_2022">{{$t("VKGAME_user_registration_and_service")}}</router-link>
      </div>

      <div class="btn">
        <button v-if="registerLoad" class="button_primary_2022 disabled">{{$t("Registered_in")}}</button>
        <button v-else
                class="button_primary_2022"
                :class="{disabled: !accountBtnStatus}"
                @click="validateForm">{{$t("Register_now")}}
        </button>
      </div>
    </div>


    <!-- 极速注册-->
    <div v-show="registerType === 2" class="form_wrapper">
      <el-form :model="fastForm" :rules="fastRules" ref="fastForm" @submit.native.prevent>

        <template>
          <el-form-item v-if="verType === 0 && registerType === 2" prop="fastVerifcode" :error="fastCodeError">
            <el-input v-model="fastForm.fastVerifcode" style="display: none" />
            <Validator @getResult="validatorFastResult" ref="fastValidatorRef"/>
          </el-form-item>
          <el-form-item v-if="verType === 1 && registerType === 2">
            <Validator @getResult="validatorFastResult" ref="fastValidatorRef"/>
          </el-form-item>
        </template>

        <div class="registration">
          注册即代表同意<router-link to="/serviceterms" class="link_2022">{{$t("VKGAME_user_registration_and_service")}}</router-link>
        </div>

        <div v-if="verType === 0" class="btn">
          <button v-if="registerLoad" class="button_primary_2022 disabled">{{$t("Registered_in")}}</button>
          <button v-else
                  class="button_primary_2022"
                  :class="{disabled: !fastBtnStatus}"
                  @click="validateForm">{{$t("Register_now")}}
          </button>
        </div>

      </el-form>
    </div>

    <div class="login_footer_txt">
      已有账号？<router-link to="/login" class="link_primary_2022">去登录</router-link>
    </div>

  </div>

</template>

<script>
import Validator from '../../components/validator'
import GlobalCountrySelect from '../../components/global-country-select'
import { commonMixins } from './commonMixins.js'

export default {
  mixins: [commonMixins],
  name: 'registercopy',
  components: { Validator, GlobalCountrySelect },
  data() {
    return {
      registerType: 0,
      registerLoad: false,
      passViewIconShow: false,
      passwordType: "password",
      phoneError: '',
      phoneVerifyError: '',
      phoneInvitecodeError: '',
      userNameError: '',
      pwdError: '',
      accountInvitecodeError: '',
      verCodeError: '',
      accountForm: {
        username: '',
        password: '',
        invitecode: '',
        verifcode: '',
        verifGee: {}
      },
      accountRules: {
        username: [{ validator: this.checkUsername, trigger: 'blur' }],
        password: [{ validator: this.checkPassword, trigger: 'blur' }],
        verifcode: [{ validator: this.checkTxtVer, trigger: 'blur' }],
        invitecode: [{ required: false, trigger: 'blur' }],
      },
      phoneForm: {
        phone: '',
        prefix: '86',
        phone_verify: '',
        invitecode: ''
      },
      phoneRules: {
        phone: [{ validator: this.checkPhone, trigger: 'blur' }],
        phone_verify: [{ validator: this.checkPhoneVerify, trigger: 'blur' }],
        invitecode: [{ required: false, trigger: 'blur' }]
      },
      showCountryPopup: false,
      phoneVerStatus: false,
      phoneBtnStatus: false,
      fromUrl: '',
      phoneCodeSendText: '获取验证码',
      countDownShow: false,
      countDownTime: 60,
      accountBtnStatus: false,
      timer: null,
      fastForm: {
        fastVerifcode: '',
        fastVerifGee: {},
      },
      fastCodeError: '',
      fastRules: {
        fastVerifcode: [{ validator: this.checkTxtVer, trigger: 'blur' }]
      },
      fastBtnStatus: false,
      captchaParamsForAccount: null,
      captchaParamsForFast: null,
      getVerLoading: false,
      onceVerCode: false
    }
  },
  watch: {
    registerType(type) {
      // 重置手机号注册
      this.$refs.phoneForm.resetFields()
      this.phoneVerStatus = false
      this.phoneBtnStatus = false
      this.onceVerCode = false

      // 重置账号注册
      this.$refs.accountForm.resetFields()
      this.accountBtnStatus = false
      this.accountForm.verifcode = ''
      this.accountForm.verifGee = {}

      // 重置极速注册
      this.$refs.fastForm.resetFields()
      this.fastBtnStatus = false
      this.fastForm.fastVerifcode = ''
      this.fastForm.verifGee = {}

      // if (type === 1 && !this.captchaParamsForAccount) {
      //   this.getCaptchaParams("captchaParamsForAccount")
      // }
      // if (type === 2 && !this.captchaParamsForFast) {
      //   this.getCaptchaParams("captchaParamsForFast")
      // }

      this.$nextTick(() => {
        console.log('注册类型', type, this.$refs.validatorRef, this.$refs.fastValidatorRef)
        if (this.$refs.validatorRef) {
          this.$refs.validatorRef.reset(true)
        }
        if (this.$refs.fastValidatorRef) {
          this.$refs.fastValidatorRef.reset(true)
        }

        if (type === 0) {
          this.phoneCodeSendText = '获取验证码'
          this.countDownShow = false
          this.countDownTime = 60
          clearInterval(this.timer)
          this.timer = null
        }
      })
    },
    // 监听手机注册按钮状态
    phoneForm: {
      handler(row) {
        this.phoneVerStatus = row.phone.trim().length > 0
        this.phoneBtnStatus = row.phone.trim().length > 0 && row.phone_verify.trim().length > 0
      },
      deep: true
    },
    // 监听账号注册按钮状态
    accountForm: {
      handler(row) {
        this.accountBtnStatus = row.username.trim().length > 0 && row.password.trim().length > 0

        if (this.accountBtnStatus) {
          if (this.verType === 0) this.accountBtnStatus = row.verifcode.trim().length > 0
          if (this.verType === 1) this.accountBtnStatus = JSON.stringify(row.verifGee) != "{}"
        }
      },
      deep: true
    },
    // 监听极速注册按钮状态
    fastForm: {
      handler(row) {
        if (this.verType === 0) this.fastBtnStatus = row.fastVerifcode.trim().length > 0
      },
      deep: true
    }
  },
  computed: {
    verType() {
      return this.$store.state.loginModelData.verfiy
    },
    fastRegister() {
      return this.$store.state.loginModelData.fast_register
    },
    registerTypeList() {
      const typeList = ['手机注册', '账号注册']
      if (this.fastRegister) typeList.push('极速注册')
      return typeList
    }
  },
  methods: {
    // 获取极验初始化参数
    getCaptchaParams(field) {
      this.$http(this.ApiSetting.index.getCaptcha)
        .then(res => {
          console.info("初始化极验参数：", res)
          if (res.status === 1) {
            this[field] = res.data
          }
        })
    },
    // 对整个表单进行校验
    validateForm() {
      if (this.registerType === 0) {
        if (!this.phoneBtnStatus) return
        this.$refs.phoneForm.validate(bool => {
          if (bool) {
            this.registerPhoneSubmit()
          }
        })
      }
      if (this.registerType === 1) {
        if (!this.accountBtnStatus) return
        this.$refs.accountForm.validate(bool => {
          if (bool) {
            this.registerAccountSubmit()
          }
        })
      }
      if (this.registerType === 2) {
        if (!this.fastBtnStatus) return
        this.$refs.fastForm.validate(bool => {
          if (bool) {
            this.registerFastSubmit()
          }
        })
      }
    },
    // 注册后操作
    registerDispatch(data) {
      this.$store.commit('updateLoginStatus', true)
      this.$store.commit('updateUserInfo', data)
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
          type: 1,
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
    // 提交手机号注册
    registerPhoneSubmit() {
      if (!this.phoneBtnStatus || this.registerLoad) return

      let data = {
        phone: this.phoneForm.phone.split(" ").join(""),
        prefix: this.phoneForm.prefix,
        invite_number: this.phoneForm.invitecode,
        phone_verify: this.phoneForm.phone_verify,
        has_read: 1,
        register_type: 2,
        hideMsg: true
      }

      this.registerLoad = true
      this.phoneError = ''
      this.phoneVerifyError = ''

      console.info("手机号注册入参：", data)
      this.$http(this.ApiSetting.index.register, data)
        .then((res) => {
          console.info("手机号注册响应：", res)
          if (res.status === 1) {
            this.$message({ type: 'success', message: res.message })

            this.phoneCodeSendText = '获取验证码'
            this.countDownShow = false
            this.countDownTime = 60
            clearInterval(this.timer)
            this.timer = null

            this.registerDispatch(res.data)
          } else {
            switch (res.field) {
              case 'phone':
                this.phoneError = res.message
                break
              case 'verify_code':
                this.phoneVerifyError = res.message
                break
              case 'invite_number':
                this.phoneInvitecodeError = res.message
            }
          }
        })
        .finally(() => { this.registerLoad = false })
    },
    // 提交账号注册
    registerAccountSubmit() {
      if (!this.accountBtnStatus || this.registerLoad) return

      let data = {
        username: this.accountForm.username,
        password: this.accountForm.password,
        repassword: this.accountForm.password,
        invite_number: this.accountForm.invitecode,
        verify_code: this.accountForm.verifcode,
        has_read: 1,
        register_type: 0,
        hideMsg: true,
        gt_version: 4,
        ...this.accountForm.verifGee
      }

      this.registerLoad = true
      this.userNameError = ''
      this.pwdError = ''
      this.verCodeError = ''

      console.info("账号注册入参：", data)
      this.$http(this.ApiSetting.index.register, data)
        .then((res) => {
          console.info("账号注册响应：", res)
          if (res.status === 1) {
            this.$refs.validatorRef.destroyCaptcha()

            this.$store.commit('updateLoginStatus', true)
            if (res.data.first_login === 1) res.data.first_login = 0
            this.$store.commit('updateUserInfo', res.data)
            this.$router.push({path: '/'})
            this.$message({type: 'success', message: res.message})
            this.$store.commit('setBindMobileNumberVisible', true)
          } else {
            // if (this.verType === 1) this.getCaptchaParams()
            this.$refs.validatorRef.reset()
            switch (res.field) {
              case 'username':
                this.userNameError = res.message
                break
              case 'password':
                this.pwdError = res.message
                break
              case 'verify_code':
                if (this.verType === 0) {
                  this.verCodeError = res.message
                }
                break
              case 'invite_number':
                this.accountInvitecodeError = res.message
            }
          }
        })
        .finally(() => { this.registerLoad = false })
    },
    // 提交极速注册
    registerFastSubmit() {
      if (this.verType === 0) {
        if (!this.fastBtnStatus && this.registerLoad) return
      }
      if (this.verType === 1) {
        if (this.registerLoad) return
      }

      let data = {
        verify_code: this.fastForm.fastVerifcode,
        ...this.fastForm.fastVerifGee,
        gt_version: 4,
        has_read: 1,
        register_type: 1,
        hideMsg: true
      }

      this.registerLoad = true
      this.fastCodeError = ''

      console.info("极速注册入参：", data)
      this.$http(this.ApiSetting.index.register, data)
        .then((res) => {
          console.info("极速注册响应：", res)
          if (res.status === 1) {
            this.$refs.fastValidatorRef.destroyCaptcha()

            this.$store.commit('updateLoginStatus', true)
            if (res.data.first_login === 1) res.data.first_login = 0
            this.$store.commit('updateUserInfo', res.data)
            this.$router.push({path: '/'})
            this.$message({type: 'success', message: res.message})
            this.$store.commit("setFastRegisterWelcomeVisible", true)

          } else {
            // if (this.verType === 1) this.getCaptchaParams()
            this.$refs.fastValidatorRef.reset()
            switch (res.field) {
              case 'verify_code':
                if (this.verType === 0) {
                  this.verCodeError = res.message
                }
                break
            }
          }
        })
        .finally(() => { this.registerLoad = false })
    },
    // 获取账号注册验证器结果
    validatorResult(result) {
      this.accountForm.verifcode = result[0]
      this.accountForm.verifGee = result[1]
    },
    // 获取极速注册验证器结果
    validatorFastResult(result) {
      this.fastForm.fastVerifcode = result[0]
      this.fastForm.fastVerifGee = result[1]

      if (this.verType === 1) {
        if (this.fastForm.fastVerifGee) {
          this.registerFastSubmit()
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.register {
  .title {
    li {
      &:first-child {
        &:after {
          position: absolute;
          content: "推荐";
          right: -35px;
          top: -31px;
          width: 69px;
          height: 39px;
          background: url("../../assets/login/phone_register_tag.png");
          font-size: 14px;
          text-align: center;
          line-height: 27px;
          color: #fff;
        }
      }
    }
  }
  .form_wrapper {
    .registration {
      margin-top: 30px;
      font-size: 12px;
      font-weight: 600;
      line-height: 12px;
      color: #8e9ab2;
    }
  }
}
</style>
