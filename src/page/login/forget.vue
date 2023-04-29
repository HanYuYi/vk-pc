<template>
  <div class="forget">
    <div class="title txt" style="margin-top: 40px"><i></i><span>{{$t("Retrieve_password")}}</span></div>

    <!-- 步骤条-->
    <ul class="steps">
      <li v-for="(txt, index) in ['填写用户名', '找回密码', '修改成功']"
          :key="index"
          :class="[step > index ? 'complete' : (step === index ? 'active' : '')]">
        <i>{{ index + 1 }}</i>
        {{ txt }}
      </li>
    </ul>

    <!-- 步骤对应的表单 用户名-->
    <div v-if="step === 0" class="form_wrapper">
      <el-form :model="accountForm" :rules="accountRules" ref="accountForm" @submit.native.prevent>
        <el-form-item prop="username" :error="userNameError">
          <el-input v-model="accountForm.username" clearable placeholder="请输入用户名" maxlength="18">
            <i slot="prepend" class="input_cus_icon_username"/>
          </el-input>
        </el-form-item>
      </el-form>

      <div class="btn">
        <button v-if="submitLoad" class="button_primary_2022 disabled">{{$t("The_next_step")}}</button>
        <button v-else
                class="button_primary_2022"
                :class="{disabled: !accountBtnStatus}"
                @click="validateForm">{{$t("The_next_step")}}
        </button>
      </div>
    </div>

    <!-- 步骤对应的表单 找回密码-->
    <div v-if="step === 1" class="form_wrapper">
      <el-form :model="phoneForm" :rules="passwordRules" ref="passwordForm">
        <!-- 手机号-->
        <el-form-item prop="phone" :error="phoneError" class="input_prepend_select_parent">
          <el-input v-model="phoneForm.phone" clearable :placeholder="$t('Please_enter_the_phone_number')" :maxlength="phoneForm.prefix === '86' ? 11 :20">
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

        <!-- 密保-->
        <el-form-item prop="answer" :error="answerError">
          <el-input v-model="phoneForm.answer" clearable :placeholder="question.value" maxlength="15">
            <i slot="prepend" class="input_cus_icon_answer"/>
          </el-input>
        </el-form-item>

        <!-- 密码-->
        <el-form-item prop="password" :error="pwdError">
          <el-input ref="passRef"
                    :type="passwordType"
                    @focus="passViewIconShow = true"
                    @blur="passViewIconShow = false"
                    autocomplete="off"
                    v-model="phoneForm.password"
                    clearable
                    :placeholder="$t('Please_enter_the_6')"
                    :class="[passwordType === 'password' ? 'hide' : 'show']"
                    maxlength="24">
            <i slot="prepend" class="input_cus_icon_password"/>
          </el-input>

          <i v-if="phoneForm.password.length || passViewIconShow" class="pass_view"
             @click="$refs.passRef.focus();passwordType = passwordType === 'password' ? 'text' : 'password'"/>
        </el-form-item>
      </el-form>

      <div class="btn">
        <button v-if="submitLoad" class="button_primary_2022 disabled">{{$t("Submit_in")}}</button>
        <button v-else
                class="button_primary_2022"
                :class="{disabled: !passwordBtnStatus}"
                @click="validateForm">{{$t("submit")}}
        </button>
      </div>
    </div>

    <!-- 步骤对应的表单 找回密码-->
    <div v-if="step === 2" class="form_wrapper">
      <div class="forget-result">
        <i></i>
        <div class="txt">
          <h3>恭喜您找回密码!</h3>
          <small><span>{{ countDownTimeForLogin }}</span>秒后返回登录页面</small>
        </div>
      </div>

      <div class="btn" style="margin-top: 53px">
        <button class="button_primary_2022" @click="clearForLoginCountDown">
          {{$t("Using_the_new_password_to")}}
        </button>
      </div>
    </div>

    <div class="login_footer_txt" style="bottom: 29px;font-size: 14px">
      <router-link to="/login" class="link_primary_2022">返回登录</router-link>
    </div>

  </div>
</template>

<script>
import GlobalCountrySelect from '../../components/global-country-select'
import { commonMixins } from './commonMixins.js'

export default {
  mixins: [commonMixins],
  components: { GlobalCountrySelect },
  name: 'forgetcopy',
  data () {
    return {
      step: 0,
      submitLoad: false,
      accountForm: {
        username: ''
      },
      accountRules: {
        username: [{validator: this.checkUsername, trigger: 'blur'}]
      },
      userNameError: '',
      accountBtnStatus: false,
      question: {
        value: '',
        id: ''
      },
      isUw: true,
      phoneForm: {
        phone: '',
        prefix: '86',
        phone_verify: '',
        answer: '',
        password: ''
      },
      passwordRules: {
        phone: [{ validator: this.checkPhone, trigger: 'blur' }],
        phone_verify: [{ validator: this.checkPhoneVerify, trigger: 'blur' }],
        answer: [{ required: true, message: this.$t("the_answer_cant_be_empty"), trigger: 'blur' }],
        password: [{ validator: this.checkPassword, trigger: 'blur' }]
      },
      phoneError: '',
      phoneVerifyError: '',
      answerError: '',
      pwdError: '',
      showCountryPopup: false,
      phoneVerStatus: false,
      phoneBtnStatus: false,
      phoneCodeSendText: '获取验证码',
      countDownShow: false,
      countDownTime: 60,
      timer: null,
      passwordType: "password",
      passViewIconShow: false,
      passwordBtnStatus: false,
      toLoginTimer: null,
      countDownTimeForLogin: 5,
      onceVerCode: false
    }
  },
  mounted () {
    this.step = 0
  },
  watch: {
    step(number) {
      this.onceVerCode = false
    },
    // 监听找回密码第一步按钮状态
    accountForm: {
      handler(row) {
        this.accountBtnStatus = row.username.trim().length > 0
      },
      deep: true
    },
    // 监听找回密码第二步按钮状态
    phoneForm: {
      handler(row) {
        this.phoneVerStatus = row.phone.trim().length > 0
        this.passwordBtnStatus = row.phone.trim().length > 0 &&
          row.phone_verify.trim().length > 0 &&
          row.answer.trim().length > 0 &&
          row.password.trim().length > 0
      },
      deep: true
    }
  },
  methods: {
    // 对整个表单进行校验
    validateForm() {
      if (this.step === 0) {
        if (!this.accountBtnStatus) return
        this.$refs.accountForm.validate(bool => {
          if (bool) {
            this.accountSubmit()
          }
        })
      }
      if (this.step === 1) {
        if (!this.passwordBtnStatus) return
        this.$refs.passwordForm.validate(bool => {
          if (bool) {
            this.forgetPasswordSubmit()
          }
        })
      }
    },
    // 第一步 提交账号
    accountSubmit() {
      if (!this.accountBtnStatus || this.submitLoad) return

      let data = {
        username: this.accountForm.username,
        step: 'check',
        hideMsg: true
      }

      this.submitLoad = true
      this.userNameError = ''
      console.info("找回密码第一步入参：", data)
      this.$http(this.ApiSetting.index.forgetPass, data)
        .then(res => {
          console.info("找回密码第一步响应：", res)
          if(res.status === 1){
            this.step = 1
            this.question.value = res.data.ques
            this.question.id = res.data.rand
            this.isUw = res.data.is_uw * 1 === 1 ? false : true
          }
        })
        .finally(() => { this.submitLoad = false })
    },
    // 第二步 获取手机前缀
    assignmentPrefix(value) {
      this.phoneForm.phone = ''
      this.phoneForm.prefix = value
    },
    // 第二步 获取手机验证码
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
          }).finally(() => { this.phoneCodeSendText = this.$t('Send_verification_code') })
      }
    },
    // 第二步 提交找回密码
    forgetPasswordSubmit() {
      if (!this.passwordBtnStatus || this.submitLoad) return

      let data = {
        tel: this.phoneForm.phone.split(" ").join(""),
        prefix: this.phoneForm.prefix,
        phone_verify: this.phoneForm.phone_verify,
        rand: this.question.id,
        answer: this.phoneForm.answer,
        password: this.phoneForm.password,
        repassword: this.phoneForm.password,
        step: 'reset',
        hideMsg: true
      }

      this.submitLoad = true
      this.phoneError = ''
      this.phoneVerifyError = ''
      this.answerError = ''
      this.pwdError = ''
      console.info("找回密码第二步入参：", data)
      this.$http(this.ApiSetting.index.forgetPass, data)
        .then((res) => {
          console.info("找回密码第二步响应：", res)
          if (res.status === 1){
            this.step = 2
            this.handlerForLoginCountDown()
          }
          this.forgetSubLoad = false
        })
        .finally(() => { this.submitLoad = false })
    },
    // 第三步 返回登录页面倒计时
    handlerForLoginCountDown() {
      clearInterval(this.toLoginTimer)
      this.toLoginTimer = setInterval(() => {
        this.countDownTimeForLogin--
        if (this.countDownTimeForLogin <= 0) {
          this.$router.push('/login')
          clearInterval(this.toLoginTimer)
          this.countDownTimeForLogin = 0
        }
      }, 1000)
    },
    // 第三步 清除返回登录页面倒计时
    clearForLoginCountDown() {
      this.$router.push('/login')
      clearInterval(this.toLoginTimer)
    }
  }
}
</script>

<style lang="less" scoped>
.forget {
  .steps {
    margin-top: 28px;
    display: flex;
    justify-content: space-between;
    li {
      width: 72px;
      font-size: 14px;
      line-height: 14px;
      letter-spacing: 0.35px;
      color: #8e9ab2;
      text-align: center;
      i {
        display: block;
        margin: 0 auto 8px;
        width: 31px;
        height: 31px;
        border-radius: 50%;
        background-color: #777c9d;
        text-align: center;
        line-height: 31px;
        font-size: 18px;
        color: #222431;
        position: relative;
        &:before, &:after {
          position: absolute;
          content: "";
          width: 80px;
          height: 1px;
          left: 42px;
          top: 15px;
          background-color: #505470;
        }
        &:before {
          width: 0;
          z-index: 2;
          background-color: #07f1b7;
        }
      }

      &.active {
        color: #07f1b7;
        i {
          background-color: #07f1b7;
          &:before {
            width: 40px;
          }
        }
      }
      &.complete {
        color: #07f1b7;
        i {
          background-color: #07f1b7;
          &:before {
            width: 80px;
          }
        }
      }

      &:last-child {
        i {
          &:before, &:after {
            width: 0;
          }
        }
      }
    }
  }

  .form_wrapper {
    padding-top: 30px!important;
    .forget-result {
      margin-top: 48px;
      display: flex;
      justify-content: center;
      i {
        display: block;
        width: 68px;
        height: 68px;
        background: url("../../assets/login/forget_success.png");
      }
      .txt {
        margin-left: 9px;
        h3 {
          margin-top: 13px;
          font-size: 18px;
          font-weight: 600;
          line-height: 18px;
          letter-spacing: 0.45px;
          color: #fefeff;
        }
        small {
          display: block;
          margin-top: 10px;
          font-size: 14px;
          line-height: 14px;
          letter-spacing: 0.35px;
          color: #8e9ab2;
          span {
            color: #07f1b7;
          }
        }
      }
    }
  }
}
</style>
