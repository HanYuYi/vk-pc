<template>
  <div class="safe_set">
    <div class="security_info_set">
      <div class="set_box_list clearfix">
        <div class="set_info_box login_pwd" :class="{'actived':currentSecurityBoxId===1}" @click="selectSecurityBox(1)">
          <div class="set_info_status">
            <span class="is_ok" v-if="userInfo.has_loginpwd"></span>
            <span class="not_ok" v-else>!</span>
          </div>
          <div class="box_icon">
            <span></span>
          </div>
          <div class="set_info_box_desc">
            {{$t("Modify_the_login_password")}}
          </div>
        </div>
        <div class="set_info_box traders_pwd" :class="{'actived':currentSecurityBoxId===2}" @click="selectSecurityBox(2)">
          <div class="set_info_status">
            <span class="is_ok" v-if="userInfo.has_securitypwd"></span>
            <span class="not_ok" v-else>!</span>
          </div>
          <div class="box_icon">
            <span></span>
          </div>
          <div class="set_info_box_desc">
            {{$t("Set_up_the_trading_password")}}
          </div>
        </div>
        <div class="set_info_box pwd_protection" :class="{'actived':currentSecurityBoxId===3}" @click="selectSecurityBox(3)">
          <div class="set_info_status">
            <span class="is_ok" v-if="userInfo.has_question"></span>
            <span class="not_ok" v-else>!</span>
          </div>
          <div class="box_icon">
            <span></span>
          </div>
          <div class="set_info_box_desc">
            {{$t("Change_the_password_protection")}}
          </div>
        </div>
        <div class="set_info_box bind_steam"  @click="selectSecurityBox(4)">
          <div class="set_info_status">
            <span class="is_ok" v-if="userInfo.uuid"></span>
            <span class="not_ok" v-else>!</span>
          </div>
          <div class="box_icon">
            <span></span>
          </div>
          <div class="set_info_box_desc" v-if="userInfo.uuid">
            {{$t("Modify_the_Steam")}}
          </div>
          <div class="set_info_box_desc" v-else>
            {{$t("Binding_Steam")}}
          </div>
        </div>
        <div class="set_info_box bind_phone" :class="{'actived':currentSecurityBoxId===5}" @click="selectSecurityBox(5)">
          <div class="set_info_status">
            <span class="not_ok" v-if="userInfo.tel==='' || userInfo.tel===null">!</span>
            <span class="is_ok" v-else></span>
          </div>
          <div class="box_icon">
            <span></span>
          </div>
          <span class="update_tips" v-show="!((userInfo.tel==='' || userInfo.tel===null) || updatePhone)">{{$t("Update_mobile_phone_num")}}</span>
          <div class="set_info_box_desc">
            {{ (userInfo.tel==='' || userInfo.tel===null) || updatePhone?$t('Binding_mobile_phone_number'):userInfo.tel}}
            <!-- <div class="phone_num">1335****</div>-->
          </div>
        </div>
      </div>
      <transition name="fade">
        <div class="set_box_detail" v-if="currentSecurityBoxId">
          <!--修改登录密码-->
          <div class="detail_box set_login_pwd" v-show="currentSecurityBoxId === 1">
            <div class="tips">{{$t("it_is_recommended_that")}}</div>
            <div class="detail_form_wrapper">
              <div class="form_box clearfix" v-if="userInfo.has_loginpwd">
                <span class="left">{{$t("Your_current_password")}}</span><div class="box-right"><input type="password" v-model.trim="setLoginPwdData.nowPwd" class="ivu-input" maxlength="24"></div>
              </div>
              <div class="form_box clearfix">
                <span class="left">{{$t("The_new_password")}}</span><div class="box-right"><input type="password" v-model.trim="setLoginPwdData.newPwd" class="ivu-input" maxlength="24"></div>
              </div>
              <div class="form_box clearfix">
                <span class="left">{{$t("Confirm_password")}}</span><div class="box-right"><input type="password" v-model.trim="setLoginPwdData.rePwd" class="ivu-input" maxlength="24"></div>
              </div>
              <div class="form_box clearfix">
                <span class="left">{{$t("phone_verification_code")}}</span>
                <div class="box-right">
                  <div class="send_ver_code ivu-input">
                    <input type="text"  v-model.trim="setLoginPwdData.phoneVerCode" maxlength="6">
                    <a href="javascript:;" class="sent_btn" :class="{'disabled':setLoginPwdData.countDownShow}" @click="sendVerCode(8,setLoginPwdData)">
                      <span v-show="!setLoginPwdData.countDownShow">{{setLoginPwdData.verCodeSendText}}</span>
                      <span v-show="setLoginPwdData.countDownShow"><i>{{setLoginPwdData.countDownTime}}</i>{{$t("Seconds_later")}}</span></a>
                  </div>
                </div>
              </div>
            </div>
            <div class="btn confirm">
              <span class="btn_loading" v-if="saveUserPwdLoad"></span>
              <a href="javascript:;" class="d_btn normal" @click="handleSetLoginPwd" v-else>{{$t("confirm")}}</a>
            </div>
          </div>
          <!--修改交易密码-->
          <div class="detail_box set_trade_pwd"  v-show="currentSecurityBoxId === 2">
            <div class="tips">{{$t("trade_password_on_your")}}</div>
            <div class="detail_form_wrapper">
              <div class="form_box clearfix" v-if="userInfo.has_securitypwd">
                <span class="left">{{$t("The_current_money_password")}}</span><div class="box-right"><input type="password" v-model.trim="setTradePwdData.nowPwd" maxlength="24" class="ivu-input"></div>
              </div>
              <div class="form_box clearfix">
                <span class="left">{{$t("The_new_money_password")}}</span><div class="box-right"><input type="password" v-model.trim="setTradePwdData.newPwd" maxlength="24" class="ivu-input"></div>
              </div>
              <div class="form_box clearfix">
                <span class="left">{{$t("Confirm_password")}}</span><div class="box-right"><input type="password" v-model.trim="setTradePwdData.rePwd" maxlength="24" class="ivu-input"></div>
              </div>
              <div class="form_box clearfix">
                <span class="left">{{$t("phone_verification_code")}}</span>
                <div class="box-right">
                  <div class="send_ver_code ivu-input">
                    <input type="text"  v-model.trim="setTradePwdData.phoneVerCode" maxlength="6">
                    <a href="javascript:;" class="sent_btn" :class="{'disabled':setTradePwdData.countDownShow}" @click="sendVerCode(9,setTradePwdData)">
                      <span v-show="!setTradePwdData.countDownShow">{{setTradePwdData.verCodeSendText}}</span>
                      <span v-show="setTradePwdData.countDownShow"><i>{{setTradePwdData.countDownTime}}</i>{{$t("Seconds_later")}}</span></a>
                  </div>
                </div>
              </div>
            </div>
            <div class="btn confirm">
              <span class="btn_loading" v-if="saveUserTradePwdLoad"></span>
              <a href="javascript:;" class="d_btn normal" @click="handleSetTradePwd" v-else>{{$t("confirm")}}</a>
            </div>
          </div>
          <!--修改密码保护-->
          <div class="detail_box set_security_qa"  v-show="currentSecurityBoxId === 3">
            <div class="tips">{{$t("set_the_encrypted_problem")}}</div>
            <div class="detail_form_wrapper">
              <div class="set_security_qa_box" v-if="userInfo.has_question">
                <div class="form_box clearfix">
                  <span class="left">{{$t("Encrypted_problem")}}</span><div class="box-right"><input type="text" readonly v-model="userCurrentQuestion" class="ivu-input disabled" /></div>
                </div>
                <div class="form_box clearfix">
                  <span class="left">{{$t("Encrypted_answers")}}</span><div class="box-right"><input type="text" v-model.trim="confirmQuestionData.answer" class="ivu-input"></div>
                </div>
                <div class="btn confirm">
                  <span class="btn_loading" v-if="userVerQALoad"></span>
                  <a href="javascript:;" class="d_btn normal" @click="confirmSafeQuestion" v-else>{{$t("confirm")}}</a>
                </div>
              </div>
              <div class="set_security_qa_box" v-else>
                <div class="form_box clearfix">
                  <span class="left">{{$t("Encrypted_problem")}}1</span>
                  <div class="box-right question_box">
                    <i-select v-model="safeQAData.currentQuestionId1" :placeholder="$t('Please_select_a_encrypted_problem')">
                      <i-option v-for="item in questionList" :value="item.ques_id" :key="item.ques_id" :label="item.question">
                      </i-option>
                    </i-select>
                  </div>
                </div>
                <div class="form_box clearfix">
                  <span class="left">{{$t("Encrypted_answers")}}1</span><div class="box-right"><input type="text" v-model="safeQAData.anwser1" class="ivu-input"></div>
                </div>
                <div class="form_box clearfix qa2">
                  <span class="left">{{$t("Encrypted_problem")}}2</span>
                  <div class="box-right question_box">
                    <i-select v-model="safeQAData.currentQuestionId2" :placeholder="$t('Please_select_a_encrypted_problem')">
                      <i-option v-for="item in questionList" :value="item.ques_id" :key="item.ques_id" :label="item.question">
                      </i-option>
                    </i-select>
                  </div>
                </div>
                <div class="form_box clearfix">
                  <span class="left">{{$t("Encrypted_answers")}}2</span><div class="box-right"><input type="text" v-model="safeQAData.anwser2" class="ivu-input"></div>
                </div>
                <div class="btn confirm">
                  <span class="btn_loading" v-if="saveUserQALoad"></span>
                  <a href="javascript:;" class="d_btn normal" @click="handleSetSafeQuestion" v-else>{{$t("confirm")}}</a>
                </div>
              </div>
            </div>
          </div>
          <!--修改手机号码-->
          <div class="detail_box bind_phone_number" v-show="currentSecurityBoxId === 5">
            <div class="tips">{{(userInfo.tel==='' || userInfo.tel===null) || updatePhone ?$t("Binding_mobile_phone_number_safe"):$t("Modify_mobile_phone_number")}}</div>
            <div class="detail_form_wrapper">
              <div class="form_box clearfix">
                <span class="left">{{userInfo.tel ?(updatePhone?$t("Mobile_phone_no"):$t("Old_Mobile_phone_no")):$t("Mobile_phone_no")}}</span>
                <div class="box-right">
                  <div class="telphone_input_box" >
                    <input type="tel" class="ivu-input" v-model.trim="phoneNumber" :placeholder="$t('Please_enter_the_phone_number')">
                    <i-select v-model="areaCode" class="area_code">
                      <i-option v-for="item in areaCodeList" :value="item.number" :key="item.code" :label="'+'+item.number">
                        <span class="GlobalPhoneItem-district">
                          <span class="flag" :class="item.code"></span>{{item.cn}}
                        </span>
                        <span style="float:right;" class="GlobalPhoneItem-number">+{{item.number}}</span>
                      </i-option>
                    </i-select>
                  </div>
                </div>
              </div>
              <div class="form_box clearfix">
                <span class="left">{{$t("Verification_code")}}</span>
                <div class="box-right">
                  <div class="send_ver_code ivu-input">
                    <input type="text"  v-model.trim="rePhoneNum.phoneVerCode">
                    <a href="javascript:;" class="sent_btn" :class="{'disabled':rePhoneNum.countDownShow}" @click="sendVerCode(0,rePhoneNum)">
                      <span v-show="!rePhoneNum.countDownShow">{{rePhoneNum.verCodeSendText}}</span>
                      <span v-show="rePhoneNum.countDownShow"><i>{{rePhoneNum.countDownTime}}</i>{{$t("Seconds_later")}}</span></a>
                  </div>
                </div>
              </div>
            </div>
            <div class="btn confirm">
              <span class="btn_loading" v-if="bindUserTelLoad"></span>
              <a href="javascript:;" class="d_btn normal" @click="handleBindPhoneNumber" v-else>{{userInfo.tel?(updatePhone ?$t("confirm"):$t("The_next_step")):$t("confirm")}}</a>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'safeset',
  components: {},
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    }
   },
  data() {
     return {
       saveUserPwdLoad: false,
       saveUserTradePwdLoad: false,
       saveUserQALoad: false,
       userVerQALoad: false,
       bindUserTelLoad: false,
      //  countDownShow: false,
      //  countDownTime: 60,
       areaCode: '86',
       areaCodeList: [],
      //  timer: null,
       updatePhone:false,
      //  verCodeSendText: this.$t("Send_verification_code"),
       phoneNumber: '',
      //  phoneVerCode: '',
       currentSecurityBoxId: '',
       setLoginPwdData: {
         nowPwd: '',
         newPwd: '',
         rePwd: '',
         phoneVerCode: '',
         countDownShow: false,
         countDownTime: 60,
         timer: null,
         verCodeSendText:this.$t("Send_verification_code"),
       },
       setTradePwdData: {
         nowPwd: '',
         newPwd: '',
         rePwd: '',
         phoneVerCode: '',
         countDownShow: false,
         countDownTime: 60,
         timer: null,
         verCodeSendText:this.$t("Send_verification_code"),
       },
       rePhoneNum:{
         phoneVerCode: '',
         countDownShow: false,
         countDownTime: 60,
         timer: null,
         verCodeSendText:this.$t("Send_verification_code"),
       },
       questionList: [],
       userQuestion: {},
       userCurrentQuestion: '',
       userQuestionRand: '',
       confirmQuestionData: {
         answer: ''
       },
       safeQAData: {
         currentQuestionId1:'',
         currentQuestionId2:'',
         anwser1: '',
         anwser2: '',
       }
     }
  },
  beforeDestroy () {
    clearInterval(this.setLoginPwdData.timer)
  },
  methods: {
    selectSecurityBox (x) {
      this.currentSecurityBoxId = x
      if(x === 4){
        this.currentSecurityBoxId = null
        //跳转绑定steam页面
        if(this.userInfo.uuid){
          window.open('/steam/index?update=1','_blank')
        }else{
          window.open('/steam','_blank')
        }
      }
      if(x === 5){
        this.getAreaCode ()
      }else if(x === 5 && this.userInfo){
        this.currentSecurityBoxId = null
      }
      if(x === 3){
        this.loadSecurityQuestion()
      }
    },
    //修改登录密码
    handleSetLoginPwd () {
      if (this.userInfo.has_loginpwd) {
        if (this.setLoginPwdData.nowPwd.length===0) {
          this.$message({
            message: this.$t("Password_cannot_be_empty"),
            type: 'warning'
          })
          return false
        }
        if (this.setLoginPwdData.nowPwd.length<6) {
          this.$message({
            message: this.$t("Password_cannot_be_less_than"),
            type: 'warning'
          })
          return false
        }
        if(this.setLoginPwdData.nowPwd.length>20){
          this.$message({
            message: this.$t("The_password_is_not_greater"),
            type: 'warning'
          })
          return false
        }
      }
      if(this.setLoginPwdData.newPwd.length===0||this.setLoginPwdData.rePwd.length===0){
        this.$message({
          message: this.$t("Password_cannot_be_empty"),
          type: 'warning'
        })
        return false
      }
      if(this.setLoginPwdData.newPwd.length<6||this.setLoginPwdData.rePwd.length<6){
        this.$message({
          message: this.$t("Password_cannot_be_less_than"),
          type: 'warning'
        })
        return false
      }
      if(this.setLoginPwdData.newPwd.length>20||this.setLoginPwdData.rePwd.length>20){
        this.$message({
          message: this.$t("The_password_is_not_greater"),
          type: 'warning'
        })
        return false
      }
      if(this.setLoginPwdData.newPwd !== this.setLoginPwdData.rePwd){
        this.$message({
          message: this.$t("Do_not_match_the_new"),
          type: 'warning'
        })
        return false
      }
      if(this.setLoginPwdData.phoneVerCode.length === 0){
        this.$message({
          message: this.$t("Please_fill_in_mobile_verification"),
          type: 'warning'
        })
        return false
      }
      let data = {
        old_password: this.setLoginPwdData.nowPwd,
        new_password: this.setLoginPwdData.newPwd,
        renew_password: this.setLoginPwdData.rePwd,
        phone_verify:this.setLoginPwdData.phoneVerCode
      }
      this.saveUserPwdLoad = true
      this.$http(this.ApiSetting.user.setLoginPwd, data)
        .then((res) => {
          if(res.status === 1){
            this.setLoginPwdData.phoneVerCode =''
            this.$message({
              message: res.message,
              type: 'success'
            })
            setTimeout(() => {
              this.$router.push({path: '/login'})
            }, 200)
          }
          this.saveUserPwdLoad = false
        })
    },
    //修改交易密码
    handleSetTradePwd () {
      if(this.setTradePwdData.nowPwd.length === 0 && this.userInfo.has_securitypwd || this.setTradePwdData.newPwd.length === 0 || this.setTradePwdData.rePwd.length===0){
        this.$message({
          message: this.$t("Password_cannot_be_empty"),
          type: 'warning'
        })
        return false
      }
      if(this.setTradePwdData.nowPwd.length < 6 && this.userInfo.has_securitypwd || this.setTradePwdData.newPwd.length < 6 || this.setTradePwdData.rePwd.length < 6){
        this.$message({
          message: this.$t("Password_cannot_be_less_than"),
          type: 'warning'
        })
        return false
      }
      if(this.setTradePwdData.nowPwd.length > 20 && this.userInfo.has_securitypwd || this.setTradePwdData.newPwd.length > 20 || this.setTradePwdData.rePwd.length>20){
        this.$message({
          message: this.$t("The_password_is_not_greater"),
          type: 'warning'
        })
        return false
      }
      if(this.setTradePwdData.newPwd !== this.setTradePwdData.rePwd){
        this.$message({
          message: this.$t("Do_not_match_the_new"),
          type: 'warning'
        })
        return false
      }
      if(this.setTradePwdData.phoneVerCode.length === 0){
        this.$message({
          message: this.$t("Please_fill_in_mobile_verification"),
          type: 'warning'
        })
        return false
      }
      let data = {
        old_password: this.setTradePwdData.nowPwd,
        new_password: this.setTradePwdData.newPwd,
        renew_password: this.setTradePwdData.rePwd,
        phone_verify:this.setTradePwdData.phoneVerCode
      }
      this.saveUserTradePwdLoad = true
      this.$http(this.ApiSetting.user.setTradePwd, data)
        .then((res) => {
          if(res.status === 1){
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.setTradePwdData.nowPwd = ''
            this.setTradePwdData.newPwd = ''
            this.setTradePwdData.rePwd = ''
            this.setTradePwdData.phoneVerCode =''
            let newInfo = this.userInfo
            newInfo.has_securitypwd = true
            this.$store.commit('updateUserInfo',newInfo)
            this.currentSecurityBoxId = null
          }
          this.saveUserTradePwdLoad = false
        }, (err) => {
          this.saveUserTradePwdLoad = false
        })
    },
    loadSecurityQuestion () {
      this.$http(this.ApiSetting.user.getSafeQuestion)
        .then((res) => {
          if(res.status === 1){
            this.questionList = res.data.securityQuestion
            if(res.data.questionId){
              this.questionList.forEach((v,i) => {
                if(v.ques_id === res.data.questionId){
                  this.userCurrentQuestion = v.question
                }
              })
              this.userQuestionRand = res.data.rand
            }
          }
        })
    },
    handleSetSafeQuestion () {
      if(this.safeQAData.currentQuestionId1 === this.safeQAData.currentQuestionId2){
        this.$message({
          message: this.$t("Encrypted_issue_could_not_be"),
          type: 'warning'
        })
        return false
      }
      if(this.safeQAData.anwser1.length === 0 || this.safeQAData.anwser2.length === 0){
        this.$message({
          message: this.$t("Encrypted_answers_cannot_be_empty"),
          type: 'warning'
        })
        return false
      }
      let data = {
        question_id_1: this.safeQAData.currentQuestionId1,
        question_id_2: this.safeQAData.currentQuestionId2,
        answer_1: this.safeQAData.anwser1,
        answer_2: this.safeQAData.anwser2
      }
      this.saveUserQALoad = true
      this.$http(this.ApiSetting.user.setSafeQuestion, data)
        .then((res) => {
          if(res.status === 1){
            this.$message({
              message: res.message,
              type: 'success'
            })
            let newInfo = this.userInfo
            newInfo.has_question = true
            this.$store.commit('updateUserInfo',newInfo)
            this.currentSecurityBoxId = null
          }
          this.saveUserQALoad = false
        }, (err) => {
          this.saveUserQALoad = false
        })
    },
    confirmSafeQuestion () {
      if(this.confirmQuestionData.answer.length === 0){
        this.$message({
          message: this.$t("Encrypted_answers_cannot_be_empty"),
          type: 'warning'
        })
        return false
      }
      let data = {
        answer: this.confirmQuestionData.answer,
        rand: this.userQuestionRand
      }
      this.userVerQALoad = true
      this.$http(this.ApiSetting.user.verifySafeQuestion, data)
        .then((res) => {
          if(res.status === 1){
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.userInfo.has_question = false
            this.confirmQuestionData.answer = ''
          }
          this.userVerQALoad = false
        }, (err) => {
          this.userVerQALoad = false
        })
    },
    sendVerCode (type,typeData) {//type有值是修改登录密码和交易密码
      if (typeData.countDownShow) {
        return false
      }else {
        if(!type) {
          if(this.phoneNumber.length===0){
            this.$message({
              message: this.$t("Please_fill_the_phone_number"),
              type: 'warning'
            })
            return false
          }
        }
        if(typeData.verCodeSendText == this.$t("Send_in")){
          return false
        }
        let data = {
          type: type?type:(this.userInfo.tel ? (this.updatePhone?6:7):6)
        }
        if(!type) {
          data.phone=type?this.userInfo.tel:this.phoneNumber;
          data.prefix=this.areaCode
        }
        typeData.verCodeSendText = this.$t("Send_in")
        this.$http(this.ApiSetting.index.sendPhoneVerCode, data)
          .then((res)=>{
            typeData.verCodeSendText = '重新发送'
            if(res.status === 1){
              typeData.countDownShow = true
              typeData.countDownTime = res.data.seconds
              clearInterval(typeData.timer)
              typeData.timer = setInterval(() => {
                typeData.countDownTime--
                if (typeData.countDownTime <= 0){
                  typeData.countDownShow = false
                  typeData.countDownTime = res.data.seconds
                  clearInterval(typeData.timer)
                }
                this.$forceUpdate()
              }, 1000)
            }
          }, (err) => {
            typeData.verCodeSendText = this.$t("Send_verification_code")
          })
      }
    },
    handleBindPhoneNumber () {
      if(this.phoneNumber.length === 0){
        this.$message({
          message: this.$t("Please_fill_the_phone_number"),
          type: 'warning'
        })
        return false
      }
      if(this.rePhoneNum.phoneVerCode.length === 0){
        this.$message({
          message: this.$t("Please_fill_in_mobile_verification"),
          type: 'warning'
        })
        return false
      }
      let data = {
        tel: this.phoneNumber,
        prefix: this.areaCode,
        phone_verify : this.rePhoneNum.phoneVerCode
      }
      clearInterval(this.rePhoneNum.timer)
      this.countDownShow = false
      this.verCodeSendText = this.$t("Send_verification_code")
      if(((this.userInfo.tel == "" || this.userInfo.tel === null) && !this.updatePhone) || (this.userInfo.tel && this.updatePhone )) {
        this.bindUserTelLoad = true
        this.$http(this.updatePhone?this.ApiSetting.user.updatePhone:this.ApiSetting.user.bindPhone, data)
          .then((res) => {
            if(res.status === 1){
              this.$message({
                message: res.message,
                type: 'success'
              })
              this.currentSecurityBoxId = null
              this.updatePhone =false
              this.userInfo.tel = String(this.phoneNumber).slice(0,-4) + "****"
              this.phoneNumber = ""
              this.rePhoneNum.phoneVerCode = ""
            }
            this.bindUserTelLoad = false
          }, (err) => {
              this.bindUserTelLoad = false
          })
      }
      if(!this.updatePhone && this.userInfo.tel) {
        this.bindUserTelLoad = true
        this.$http(this.ApiSetting.user.unBindPhone,data).then(res => {
          if(res.status === 1) {
            this.$message({
                message: res.message,
                type: 'success'
              })
            this.phoneNumber = ""
            this.rePhoneNum.phoneVerCode = ""
            this.updatePhone = true
          }
          this.bindUserTelLoad = false
        },err => {
          this.bindUserTelLoad = true
        })
      }
    },
    getAreaCode () {
      this.$http(this.ApiSetting.index.getCountryPrefix).then((res) => {
        if(res.status === 1){
          if(res.data.length>0){
            this.areaCodeList = res.data
          }
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .security_info_set .set_box_list .set_info_box{
    float: left;
    width: 146px;
    height: 100px;
    box-sizing: border-box;
    border: 1px solid transparent;
    text-align: center;
    position: relative;
    color: #fff;
    font-size: 14px;
    border-radius: 3px;
    background: url("../../../assets/icon_es.png") no-repeat;
    background-position: -1184px -730px;
    box-shadow: 0 0 50px 1px rgba(0,0,0,0.4);
    margin-right: 20px;
    cursor: pointer;
    transition: border-color.2s ease;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .set_box_list .box_icon span{
    margin-top:10px;
  }
  .update_tips {
    margin-top: 7px;
    color: #656c83;
    margin-bottom: -17px;
   }
  .security_info_set .set_box_list .set_info_box:last-child{
    margin-right: 0;
  }
  .security_info_set .set_box_list .set_info_box.bind_phone{
    /*cursor: default;*/
  }
  .security_info_set .set_box_list .set_info_box.actived{
    border-color:#07e9f1
  }
  .security_info_set .set_box_list .set_info_box.actived:before{
    content: '';
    position: absolute;
    left: 64px;
    bottom: -22px;
    height: 0;
    width: 0;
    border-top: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid #07e9f1;
    border-left: 8px solid transparent;
    z-index: 2;
  }
  .security_info_set .set_box_list .set_info_box.actived:after{
    content: '';
    position: absolute;
    left: 65px;
    bottom: -23px;
    height: 0;
    width: 0;
    border-top: 7px solid transparent;
    border-right: 7px solid transparent;
    border-bottom: 7px solid #262933 ;
    border-left: 7px solid transparent;
    z-index: 2;
  }
  .security_info_set .set_box_list .set_info_box .set_info_status{
    position: absolute;
    right: 10px;
    top: 10px;
  }
  .security_info_set .set_box_list .set_info_box .set_info_status span{
    display: inline-block;
  }
  .security_info_set .set_box_list .set_info_box .set_info_status span.is_ok{
    width: 14px;
    height: 14px;
    background: url("../../../assets/icon_es.png") no-repeat;
    background-position: -760px -46px;
  }
  .security_info_set .set_box_list .set_info_box .set_info_status span.not_ok{
    width: 18px;
    height: 18px;
    box-sizing: border-box;
    line-height: 16px;
    border: 1px solid #d74911;
    border-radius: 50%;
    text-align: center;
    color: #d74911;
    font-weight: bold;
  }
  .security_info_set .set_box_list .set_info_box .set_info_box_desc{
    margin-top: 10px;
    line-height: 36px;
  }
  .security_info_set .set_box_list .set_info_box.bind_phone .set_info_box_desc{
    /*line-height: 18px;*/
  }
  .security_info_set  .set_box_detail{
    border: 1px solid #07e9f1;
    min-height: 360px;
    text-align: center;
    margin-top: 20px;
    box-sizing: border-box;
    padding: 20px;
    font-size: 14px;
  }
  .set_box_detail .detail_form_wrapper{
    width: 360px;
    margin: 36px auto 0;
  }
  .set_box_detail .set_security_qa .detail_form_wrapper{
    width: 380px;
  }
  .set_box_detail .detail_form_wrapper .left{
    display: inline-block;
    text-align: right;
    color: #fff;
    width: 110px;
    margin-right: 20px;
    font-size: 18px;
    float: left;
  }
  .set_box_detail .detail_form_wrapper .box-right{
    float: left;
    width: 228px;
  }
  .set_box_detail .set_security_qa .detail_form_wrapper .box-right{
    width: 248px;
  }
  .set_box_detail .detail_form_wrapper .form_box{
    padding: 10px 0;
    line-height: 34px;
  }
  .set_box_detail .detail_form_wrapper .form_box .box-right .ivu-input{
    border-color: #7c839f;
    width: 100%;
  }
  .set_box_detail .detail_box .confirm{
    margin-top: 40px;
  }
  .detail_form_wrapper .form_box.qa2{
    margin-top: 20px;
  }
  .set_box_detail .detail_form_wrapper .form_box .box-right .telphone_input_box .ivu-input{
    padding-left: 75px;
  }
</style>

<style  >
 .safe_set .ivu-select-dropdown{
  height: 238px;
}
</style>
