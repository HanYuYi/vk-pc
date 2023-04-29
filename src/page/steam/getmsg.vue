<template>
  <div class="else_page get_msg">
    <div class="vheader">
      <div class="wrapper clearfix">
        <a class="logo fl" href="/"><span></span></a>
        <!--<div class="login_reg fr">
          <a href="javascript:;" class="login_kf" @click="openKfWindow"><i class="kf_icon"></i>{{$t("Online_customer_service")}}</a>
          <router-link to="/login" class="login_btn">{{$t("The_login")}}</router-link><router-link to="/register" class="reg_btn">{{$t("registered")}}</router-link>
        </div>-->
      </div>
    </div>
    <div class="page_main">
      <div class="wrapper">
        <div class="steam_message">
          <div class="msg_tips success" v-if="showSuccessMsg">
            <div class="icon">
              <i class="vk_icon success"></i>
            </div>
            {{msgContent}}
          </div>
          <div class="msg_tips error" v-if="showFailMsg">
            <div class="icon">
              <i class="vk_icon error"></i>
            </div>
            {{msgContent}}
          </div>
          <div class="btn">
            <router-link to="/" class="botton normal big">{{$t("Return_to_the_home_page")}}</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="vfooter">
      <div class="wrapper clearfix">
        <p class="fl">Copyright © 2018 Sportsypl Co., Ltd. All Rights reserved.</p>
        <p class="fr">www.vkgame.one</p>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { getCookie } from '../../utils/util'
export default {
  name: 'getmsg',
  components: {

  },
  data () {
    return {
      showFailMsg: false,
      showSuccessMsg: false,
      msgContent: ''
    }
  },
  created () {
   this.getMsgContent ()
  },
  computed: {
    kfUrl () {
      return this.$store.state.kfUrl
    }
  },
  methods: {
    openKfWindow () {
      window.open(this.kfUrl,'chatwindow','height=530,width=730')
    },
    getMsgContent () {
      if(parseInt(getCookie('is_success')) === 1){
        this.showSuccessMsg = true
      }else if(parseInt(getCookie('is_success')) === 0){
        this.showFailMsg = true
      }
      if(getCookie('message')){
        this.msgContent = getCookie('message')
      }
    }
  }
}
</script>
 <style lang="less" scoped>
 .else_page {
   height: 100%;
   background: url("../../assets/login/bg.jpg") no-repeat top center;
   .page_main {
     .wrapper {
       min-height: 832px;
       color: #fff;
       box-sizing: border-box;
       padding: 0 106px;
       .steam_message {
         padding-top: 300px;
         text-align: center;
       }
     }
   }
 }
 .vheader {
   height: 79px;
   border-bottom: 1px solid #3a3c44;
   line-height: 80px;
   .logo {
     display: inline-block;
     height: 100%;
     span {
       display: inline-block;
       width: 232px;
       height: 48px;
       vertical-align: middle;
       background: url(../../assets/web-icons.png) no-repeat;
       background-position: -18px 0;
     }
   }
   .login_reg {
     a {
       display: inline-block;
       width: 68px;
       height: 34px;
       line-height: 34px;
       text-align: center;
       color: #d6e1e0;
       background: url("../../assets/web-icons.png") no-repeat;
       &.login_btn {
         background-position: -88px -69px;
         &:hover {
           background-position: -88px -119px;
         }
       }
       &.reg_btn {
         margin-left: 20px;
         background-position: -186px -69px;
         &:hover {
           background-position: -186px -119px;
         }
       }
     }
     .login_kf {
       color: #fff;
       vertical-align: middle;
       width: 100px;
       background: none;
       margin-right: 20px;
       &:hover {
         color: #07f1b7;
       }
       .kf_icon {
         line-height: normal;
         display: inline-block;
         width: 24px;
         height: 24px;
         vertical-align: middle;
         margin-right: 5px;
         background: url("../../assets/web-icons.png") no-repeat;
         background-position: -1009px -240px;
       }
     }
   }
 }
 .vfooter {
   border-top: 1px solid #353946;
   line-height: 60px;
 }
 .steam_message {
   .msg_tips {
     font-size: 24px;
     color: #7c839f;
     &.success {
       color: #07f1b7;
     }
     .icon {
       margin-bottom: 20px;
     }
   }
 }
 .get_msg {
   .page_main {
     .btn {
       width: 150px;
       margin: 50px auto 0;
     }
   }
 }

 </style>
