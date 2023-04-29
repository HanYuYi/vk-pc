export const commonMixins = {
  methods: {
    /**
     * 验证手机号
     * @param rule
     * @param value
     * @param callback
     * @return {*}
     */
    checkPhone (rule, value, callback) {
      if (!value) {
        return callback(new Error(this.$t('Mobile_phone_number_not_null')));
      }
      if (this.phoneForm.prefix === '86' && !(/^1+\d{10}$/.test(value))) {
        return callback(new Error(this.$t('phone_number_input_wrong_oh')));
      }
      if (this.phoneForm.prefix !== '86' && !(/^\d{8,16}$/.test(value))) {
        return callback(new Error(this.$t('phone_number_input_wrong_oh')));
      }
      callback()
    },
    /**
     * 验证手机验证码
     * @param rule
     * @param value
     * @param callback
     * @return {*}
     */
    checkPhoneVerify (rule, value, callback) {
      if (!value) {
        return callback(new Error(this.$t('mobile_verification_code_cannot_be')));
      }
      if (value.length !== 6) {
        return callback(new Error(this.$t('mobile_verification_code_length_wrong')));
      }
      callback()
    },
    /**
     * 验证用户名, 14位
     * @param rule
     * @param value
     * @param callback
     * @return {*}
     */
    checkUsernameFor14 (rule, value, callback) {
      if (!value) {
        return callback(new Error(this.$t('sorry_the_user_name_cannot_empty')));
      }
      if (value.length < 6) {
        return callback(new Error(this.$t('user_name_length_less_than_6')));
      }
      if (value.length > 14) {
        return callback(new Error(this.$t('user_name_length_is_greater_14')));
      }
      callback()
    },
    /**
     * 验证用户名, 12位
     * @param rule
     * @param value
     * @param callback
     * @return {*}
     */
    checkUsername (rule, value, callback) {
      if (!value) {
        return callback(new Error(this.$t('sorry_the_user_name_cannot_empty')));
      }
      if (value.length < 6) {
        return callback(new Error(this.$t('user_name_length_less_than_6')));
      }
      if (value.length > 12) {
        return callback(new Error(this.$t('user_name_length_is_greater_12')));
      }
      callback()
    },
    /**
     * 验证用户名是否为中文
     * @param rule
     * @param value
     * @param callback
     * @return {*}
     */
    checkUsernameChinese (rule, value, callback) {
      if (!value) {
        return callback(new Error(this.$t('sorry_the_user_name_cannot_empty')));
      }
      if (!/^[\u0391-\uFFE5]+$/.test(value)) {
        return callback(new Error(this.$t("user_name_be_chinese")));
      }
      callback()
    },
    /**
     * 验证用户密码
     * @param rule
     * @param value
     * @param callback
     * @return {*}
     */
    checkPassword (rule, value, callback) {
      if (!value) {
        return callback(new Error(this.$t('the_password_cannot_empty')));
      }
      if (value.length < 6) {
        return callback(new Error(this.$t('password_length_less_than_6')));
      }
      if (value.length > 20) {
        return callback(new Error(this.$t('password_length_is_greater_than_20')));
      }
      callback()
    },
    /**
     * 验证文字验证码
     * @param rule
     * @param value
     * @param callback
     * @return {*}
     */
    checkTxtVer(rule, value, callback) {
      if (!value) {
        return callback(new Error(this.$t('sorry_verification_code_cannot_be')));
      }
      if (value.length !== 4) {
        return callback(new Error(this.$t('authentication_code_length_is_not')));
      }
      callback()
    }
  }
}
