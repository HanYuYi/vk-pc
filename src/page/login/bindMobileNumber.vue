<template>
  <el-dialog
    :visible.sync="bindMobileNumberVisible"
    v-backdrop
    :modal="false"
    custom-class="bindMobileNumber-dialog dialog_2022"
    width="518px"
    title="绑定手机号"
    :close-on-click-modal="false"
    :append-to-body="true"
    :close-on-press-escape="false"
    :destroy-on-close="true"
    :before-close="close">

    <el-form :model="phoneForm" :rules="phoneRules" ref="phoneFormRef" class="form-main" @submit.native.prevent>

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

      <el-form-item>
        <button v-if="loading" class="button_primary_2022 disabled">绑定中...</button>
        <button v-else
                class="button_primary_2022"
                :class="{disabled: !phoneBtnStatus}"
                @click="validateForm">立即绑定
        </button>
      </el-form-item>

    </el-form>

  </el-dialog>

</template>

<script>
import { commonMixins } from './commonMixins'
import GlobalCountrySelect from '../../components/global-country-select'
import { mapState } from 'vuex'

export default {
  mixins: [commonMixins],
  components: { GlobalCountrySelect },
  name: 'bindMobileNumber',
  computed: {
    ...mapState(["userInfo", "bindMobileNumberVisible"]),
  },
  data() {
    return {
      loading: false,
      phoneError: '',
      phoneVerifyError: '',
      phoneForm: {
        phone: '',
        prefix: '86',
        phone_verify: '',
      },
      phoneRules: {
        phone: [{ validator: this.checkPhone, trigger: 'blur' }],
        phone_verify: [{ validator: this.checkPhoneVerify, trigger: 'blur' }]
      },
      showCountryPopup: false,
      phoneVerStatus: false,
      phoneBtnStatus: false,
      phoneCodeSendText: '获取验证码',
      countDownShow: false,
      countDownTime: 60,
      timer: null,
      getVerLoading: false,
      onceVerCode: false
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (this.bindMobileNumberVisible) {
        this.$refs.phoneFormRef.resetFields()
      }
    })
  },
  watch: {
    bindMobileNumberVisible(bool) {
      if (bool) {
        this.phoneForm = {
          phone: '',
          prefix: '86',
          phone_verify: '',
        }
        this.onceVerCode = false
        this.phoneVerStatus = false
        this.phoneBtnStatus = false
        this.phoneCodeSendText = '获取验证码'
        this.countDownShow = false
        this.countDownTime = 60
        clearInterval(this.timer)
        this.timer = null
        this.$nextTick(() => {
          this.$refs.phoneFormRef.resetFields()
          this.telParentRef = this.$refs.telParentRef
        })
      }
    },
    phoneForm: {
      handler(row) {
        this.phoneVerStatus = row.phone.trim().length > 0
        this.phoneBtnStatus = row.phone.trim().length > 0 && row.phone_verify.trim().length > 0
      },
      deep: true
    }
  },
  methods: {
    close() {
      if (this.loading) {
        this.$message({ message: "绑定中，请稍等...", type: 'warning' })
        return
      }

      this.$store.commit("setBindMobileNumberVisible", false)
      this.$store.commit('updateUserInfo', { ...this.userInfo, first_login: 1 })
    },
    // 验证手机号注册的字段
    validateForm () {
      if (!this.phoneBtnStatus) return
      this.$refs.phoneFormRef.validate(bool => {
        if (bool) {
          this.bindMobileNumberSubmit()
        }
      })
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

        this.phoneCodeSendText = this.$t('Send_in')

        this.getVerLoading = true

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
          })
          .finally(() => {
            this.phoneCodeSendText = this.$t('Send_verification_code')
            this.getVerLoading = false
          })
      }
    },

    // 提交绑定手机号
    bindMobileNumberSubmit() {
      if (!this.phoneBtnStatus || this.loading) return

      this.phoneError = ''
      this.phoneVerifyError = ''

      this.loading = true
      let params = {
        tel: this.phoneForm.phone.split(" ").join(""),
        phone_verify: this.phoneForm.phone_verify,
        prefix: this.phoneForm.prefix
      }
      console.info("极速注册绑定手机号入参：", params)

      this.$http(this.ApiSetting.user.bindPhone, params)
        .then(res => {
          console.info("极速注册绑定手机号响应：", res)
          if (res.status === 1) {
            this.loading = false
            this.$message({ message: res.message, type: 'success' })
            this.$store.commit('updateUserInfo', { ...this.userInfo, tel: String(this.phoneForm.phone).slice(0,-4) + "****" })
            this.close()
          }
        })
        .finally(() => { this.loading = false })
    }
  }
}
</script>

<style lang="less" scoped>
.bindMobileNumber-dialog {
  .form-main {
    width: 338px;
    margin: 7px auto 0;
    .el-form-item {
      margin-bottom: 30px;
    }
  }
}
</style>
