<template>
  <div class="">
    <!--弱密码-->
    <el-dialog
      :custom-class="'Ab_validation'"
      :visible.sync="unusual.showValidation"
      :show-close="false"
      :width="'740px'"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :append-to-body="true" >
      <div class="dialog_title" slot="title">{{$t('Change_the_password')}}</div>
      <div class="dialog_wrapper">
        <div class="notice">{{$t('week_password_notice')}}<br>{{$t('doubt_please')}}<strong @click="openKfWindow()">{{$t('contact_the_customer_service')}}</strong></div>
        <div class="p_number">{{$t('Reserved_mobile_phone_number')}}：<em>{{userInfo.tel}}</em></div>
        <!--防止自动填充-->
        <div class="input_line clearfix ">
          <div class="box_left"> {{$t("Your_current_password")}} </div>
          <div class="box_right"> <input type="password" autocomplete="off" onpaste="return false" v-model="oldP" class="ivu-input" > </div>
        </div>
        <div class="input_line clearfix ">
          <div class="box_left"> {{$t("The_new_password")}} </div>
          <div class="box_right"> <input type="password" autocomplete="off" onpaste="return false" v-model="newP" class="ivu-input" > </div>
        </div>
        <div class="input_line clearfix ">
          <div class="box_left"> {{$t('Confirm_new_password')}} </div>
          <div class="box_right"> <input type="password" autocomplete="off" onpaste="return false" v-model="conP" class="ivu-input" > </div>
        </div>
        <div class="input_line clearfix ">
          <div class="box_left"> {{$t("Phone_verification_code")}} </div>
          <div class="box_right">
            <input type="number" v-model="telVerCode" autocomplete="off" class="ivu-input" >
            <div class="line"></div>
            <div class="vcode" @click="handleSendVerCode" v-show="!verCodeSended">{{$t("Send_verification_code")}}</div>
            <div class="vcode" :class="{'no_cousor':verCodeSended}" v-show="verCodeSended">{{$t('resend')}}  {{verCodeCountDown}}s</div>
          </div>
        </div>
        <div class="btn"><a @click="validationBtn()" href="javascript:;" class="d_btn normal">{{$t('determine')}}</a></div>
      </div>
    </el-dialog>
    <!---异常登录验证-->
    <el-dialog
      :custom-class="'Ab_validation'"
      :visible.sync="unusual.showVlogin"
      :show-close="false"
      :width="'740px'"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :append-to-body="true" >
      <div class="dialog_title" slot="title">{{$t('Abnormal_login_verification')}}</div>
      <div class="dialog_wrapper">
        <template v-if="userInfo.tel">
          <div class="notice">{{$t('Abnormal_login_notice')}}<br>{{$t('doubt_please')}}<strong @click="openKfWindow()">{{$t('contact_the_customer_service')}}</strong></div>
          <div class="p_number">{{$t('Reserved_mobile_phone_number')}}：<em>{{userInfo.tel}}</em></div>
          <div class="input_line clearfix ">
            <div class="box_left"> {{$t("Phone_verification_code")}} </div>
            <div class="box_right">
              <input type="number" v-model="telVerCode" autocomplete="off" class="ivu-input" >
              <div class="line"></div>
              <div class="vcode" @click="handleSendVerCode" v-show="!verCodeSended">{{$t("Send_verification_code")}}</div>
              <div class="vcode" :class="{'no_cousor':verCodeSended}" v-show="verCodeSended">{{$t('resend')}} {{verCodeCountDown}}s</div>
            </div>
          </div>
          <div class="btn"><a @click="vloginBtn()" href="javascript:;" class="d_btn normal">{{$t('determine')}}</a></div>
        </template>
        <template v-else>
          <div class="notice">*您好,由于系统检测到您目前在非常用登录地登录并且未绑定手机号, <br/>为了您的账号安全, 请联系客服。</div>
          <div class="btn btn-nophone"><a @click="openKfWindow()" href="javascript:;" class="d_btn normal">联系客服</a></div>
        </template>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import storage from '../utils/storage'
export default {
  name: "weakpw-unusuallogin-dialog",
  data() {
    return {
      verCodeTimer:null,
      verCodeCountDown:60,
      verCodeSended:false,
      telVerCode:'',
      conP:'',
      newP:'',
      oldP:'',
    };
  },
  computed: {
    ...mapState([ "unusual","userInfo","kfUrl"])
  },
  mounted() {
    //异常登录或者弱密码处理，登录时候后台会默认发一条验证码此时我开始倒计时，但是刷新不会
    if (this.unusual.loginvalP || this.unusual.loginvalL) {
      this.verCodeSended = true;
      this.verCodeTimer = setInterval(() => {
        this.verCodeCountDown--;
        if (this.verCodeCountDown == 0) {
          this.verCodeCountDown = 60;
          clearInterval(this.verCodeTimer);
          this.verCodeSended = false;
        }
      }, 1000);
    }
  },
  methods: {
    //异常登录验证提交
    vloginBtn() {
      if(this.telVerCode.length === 0){
        this.$message({
          message: this.$t("Please_enter_the_mobile_phone"),
          type: 'warning'
        })
        return false
      }
      this.$http(this.ApiSetting.index.resetUnusalLogin, {verfiy_code:this.telVerCode}).then((res) => {
        if(res.status === 1){
          this.telVerCode = null;
          this.$message({
            message: '验证成功',
            type: 'success'
          })
          storage.set("is_unusal",false);
          this.$store.commit('setStoreValue',{name:'unusual',value:{
            ...this.unusual,
            ...{showVlogin:false}
          }})
        }
      })
    },
    //弱密码修改提交
    validationBtn() {
      if (!this.oldP) {
        this.$message({
          message: "旧密码不能为空",
          type: "warning"
        });
        return false;
      }
      if (!this.newP) {
        this.$message({
          message: "新密码不能为空",
          type: "warning"
        });
        return false;
      }
      if (!this.conP) {
        this.$message({
          message: "确认新密码不能为空",
          type: "warning"
        });
        return false;
      }
      if (this.telVerCode.length === 0) {
        this.$message({
          message: this.$t("Please_enter_the_mobile_phone"),
          type: "warning"
        });
        return false;
      }
      let data = {
        verfiy_code: this.telVerCode,
        old_password: this.oldP,
        new_password: this.newP,
        renew_password: this.conP
      };
      this.$http(this.ApiSetting.index.resetUnusalLogin, data).then(res => {
        if (res.status === 1) {
          this.telVerCode = null;
          this.$message({
            message: "密码修改成功",
            type: "success"
          });
          storage.set("is_password_weak", false);
          this.$store.commit("setStoreValue", {
            name: "unusual",
            value: {
              ...this.unusual,
              ...{ showValidation: false }
            }
          });
        }
      });
    },
    //发送手机验证码
    handleSendVerCode() {
      if (this.verCodeSended) {
        return false;
      }
      clearInterval(this.verCodeTimer);
      let data = {
        type: 5
      };
      this.verCodeSended = false;
      this.$http(this.ApiSetting.index.sendPhoneVerCode, data).then(
        res => {
          if (res.status === 1) {
            this.verCodeCountDown = res.data.seconds;
            this.verCodeTimer = setInterval(() => {
              this.verCodeCountDown--;
              if (this.verCodeCountDown == 0) {
                this.verCodeCountDown = res.data.seconds;
                clearInterval(this.verCodeTimer);
                this.verCodeSended = false;
              }
            }, 1000);
            this.verCodeSended = true;
          } else {
            this.verCodeSended = false;
          }
        },
        err => {
          this.verCodeSended = false;
        }
      );
    }
  }
};
</script>

<style scope lang="less">
.Ab_validation {
  background: #17191e;
  border: solid 1px #07f1b7;
  .el-dialog__header {
    background: #272932;
    background: #272932;
  }
  .notice {
    font-size: 12px;
    color: #e34d12;
    margin-bottom: 25px;
    margin-top: 20px;
    text-align: center;
    line-height: 1.5;
    strong {
      font-weight: normal;
      color: #07f1b7;
      text-decoration: underline;
      cursor: pointer;
    }
  }
  .p_number {
    margin-bottom: 40px;
    font-size: 12px;
    color: #7c839f;
    line-height: 20px;
    text-align: center;
    em {
      font-size: 18px;
      color: #fefeff;
    }
  }
  .btn {
    margin-top: 50px;
  }
  .btn-nophone {
    margin-top: 0;
  }
  .input_line {
    margin-bottom: 20px;
    .box_left {
      float: left;
      font-size: 18px;
      color: #ffffff;
      line-height: 34px;
      text-align: right;
      width: 32%;
    }
    .box_right {
      margin-left: 20px;
      float: left;
      position: relative;
      input {
        width: 228px;
      }
      input:-webkit-autofill {
        -webkit-text-fill-color: #fff;
        -webkit-box-shadow: 0 0 0 1000px #17191e inset !important;
      }
      .line {
        position: absolute;
        height: 24px;
        width: 1px;
        top: 5px;
        right: 104px;
        background-color: #7c839f;
      }
      .vcode {
        width: 110px;
        text-align: center;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        font-size: 12px;
        color: #07f1b7;
        cursor: pointer;
        &.no_cousor {
          cursor: default;
        }
      }
    }
  }
}
</style>
