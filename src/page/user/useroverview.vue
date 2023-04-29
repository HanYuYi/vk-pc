<template>
  <div class="user_overview user_section">
    <h3 class="user_section_title">
      {{$t("An_overview_of_the_account")}}
    </h3>
    <div class="user_section_content">
      <!--钱包金额-->
      <div class="accout_main clearfix">
        <div class="accout_money accout_box fl">
          <div class="accout_title"><span class="icon"></span><b>{{$t("The_wallet")}}</b></div>
          <div class="money_num">
            ￥<span class="num" v-show="!userNMMoneyLoad && (typeof userMoney !== 'string' && userMoney !== '0.00')">
            <b>{{userMoney[0]}}.<i class="float">{{userMoney[1]}}</i></b>
            </span>
            <span class="money_loading big" v-show="userNMMoneyLoad && (typeof userMoney === 'string' && userMoney === '0.00')"><i class="dot"></i><i class="dot"></i><i class="dot"></i></span>
          </div>
          <div class="btn">
            <router-link to="/user/finance/transfer" class="el-button">{{$t("transfer")}}</router-link>
            <router-link to="/user/finance/withdraw" class="el-button">{{$t("withdrawal")}}</router-link>
            <router-link to="/user/finance/" class="el-button el-button--primary finance_forinstro">{{$t("top_up")}}</router-link>
            <span class="el-button el-button--primary" @click="handleShowRedeemCodeDialog">{{$t("Conversion_code")}}</span>
          </div>
        </div>
        <div class="accout_vb accout_box fr">
          <div class="accout_title"><span class="icon"></span><b>{{$t("The_coin")}}</b>
            <el-popover trigger="hover" placement="top"  :content="$t('V_c_main_access_to')"> <i slot="reference">!</i></el-popover>
          </div>
          <div class="money_num"><span class="num" v-show="!userVirtualMoneyLoad"><b>{{formatNumberSplit(userVirtualMoney)}}</b></span><span class="money_loading big" v-show="userVirtualMoneyLoad"><i class="dot"></i><i class="dot"></i><i class="dot"></i></span></div>
          <div class="vb_tips">
            <p>{{$t("not_only_10000_V")}}</p>
            <p>{{$t("V_currency_can_devote")}}</p>
            <!-- <p>{{$t("V_currency_to_RMB")}}</p> -->
            <!-- <p>{{$t("change_at_any_time")}}</p> -->
          </div>
          <div class="btn">
            <router-link to="/user/finance/vbdetail" class="el-button el-button--primary">{{$t("detail_enquiry")}}</router-link>
            <router-link to="/vbmarket" class="el-button el-button--primary">{{$t("shopping_mall")}}</router-link>
            <!--<a href="javascript:;" class="el-button el-button&#45;&#45;primary">{{$t("exchange")}}</a>-->
          </div>
        </div>
      </div>

      <!--V富通钱包-->
      <useroverviewrichpay />

      <div class="game_wallet sub_section">

        <div class="sub_section_title clearfix">
          <div class="fl"><i class="sub_title_mark"></i><span class="title_name">{{$t("The_game_wallet")}}</span><span class="title_tips">{{$t("Third_party_game_wallet_balance")}}</span></div>
          <div class="fr balance_back" @click="balanceBack"  >
            <div class=" el-button el-button--big" :class="{'countcown_color':countDown!=60}">
             {{countDown!=60 ?countDown+'S':$t("Balance_of_recycling")}}
             </div>
            </div>
          <div class="fr"><router-link to="/user/finance/transfer" class="el-button">{{$t("transfer")}}</router-link></div>
        </div>
        <div class="sub_section_content">
          <div class="game_wallet_list clearfix">
            <div class="wallet_box" v-for="item in gameWalletList" :key="item.id" :class="item.code">
            <!-- <div class="wallet_box" v-for="item in gameWalletList" :key="item.id" :class="{'ag':item.code === 'AG','sport':item.code === 'GM','lygame':item.code === 'LY','mggame':item.code === 'MG','eBet':item.code === 'EBET','pbsport':item.code === 'PINNACLE','lucky':item.code === 'LK','dragon':item.code === 'LC'}"> -->
              <div class="wallet_name">{{item.name}}</div>
              <div class="wallet_money">
                <span v-if="item.getMoneyFail">{{item.errMsg}}</span>
                <span v-else>￥<span class="num">
                  <b v-show="!item.loading">{{item.money[0]}}.<i class="float">{{item.money[1]}}</i></b>
                  <span class="money_loading" v-show="item.loading"><i class="dot"></i><i class="dot"></i><i class="dot"></i></span>
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div class="fr">
            <span class="vermi">开启后，进入任一游戏，其他游戏余额（含主钱包）都会自动转入至该钱包。</span>
            <span class="onekey_txt vermi">一键转入</span>
            <span class="switch_box"  @click.self="onekeyChange" >
              <i-switch size="large"
              class="onekey_switch"
              :value="walletOnekeyStatus">
                <span slot="open">开</span>
                <span slot="close">关</span>
              </i-switch>
            </span>

          </div>
        </div>
      </div>
      <div class="safety_set sub_section">
        <div class="sub_section_title">
          <i class="sub_title_mark"></i><span class="title_name">{{$t("Security_Settings")}}</span>
        </div>
        <div class="sub_section_content">
          <div class="set_box_list clearfix">
            <div class="list_box login_pwd">
              <div class="box_icon">
                <span></span>
              </div>
              <div class="box_title">
                {{$t("The_login_password")}}
              </div>
              <div class="box_tips ellips">
                {{$t("Dont_change_the_password_on")}}
              </div>
              <div class="box_btn">
                <router-link to="/user/infosetting/safeset" class="el-button el-button--big">{{$t("Change_the_password")}}</router-link>
                <!--<span class="el-button el-button&#45;&#45;big">{{$t("Change_the_password")}}</span>-->
              </div>
            </div>
            <div class="list_box traders_pwd">
              <div class="box_icon">
                <span></span>
              </div>
              <div class="box_title">
                {{$t("Trade_password")}}
              </div>
              <div class="box_tips ellips">
                {{$t("Withdrawals_and_sensitive_operation")}}
              </div>
              <div class="box_btn">
                <router-link to="/user/infosetting/safeset" class="el-button el-button--big">{{$t("Change_the_password")}}</router-link>
                <!--<span class="el-button el-button&#45;&#45;big">{{$t("Change_the_password")}}</span>-->
              </div>
            </div>
            <div class="list_box bind_phone">
              <div class="box_icon">
                <span></span>
              </div>
              <div class="box_title">
                {{$t("Mobile_phone_no")}}
              </div>
              <div class="box_tips ellips">
                {{$t("Effective_control_of_security_funds")}}
              </div>
              <div class="box_btn">
                <router-link to="/user/infosetting/safeset" class="el-button el-button--big">{{userInfo.tel?$t("Update_mobile_phone"):$t("Binding_mobile_phone")}}</router-link>
                <!--<span class="el-button el-button&#45;&#45;big">{{$t("Binding_mobile_phone")}}</span>-->
              </div>
            </div>
            <div class="list_box bind_card">
              <div class="box_icon">
                <span></span>
              </div>
              <div class="box_title">
                {{$t("Bank_card")}}
              </div>
              <div class="box_tips ellips">
                {{$t("Withdrawal_binding_bank_card")}}
              </div>
              <div class="box_btn">
                <router-link to="/user/infosetting/bank" class="el-button el-button--big">{{$t("management")}}</router-link>
               <!-- <span class="el-button el-button&#45;&#45;big">{{$t("management")}}</span>-->
              </div>
            </div>
            <div class="list_box pwd_protection">
              <div class="box_icon">
                <span></span>
              </div>
              <div class="box_title">
                {{$t("Password_protection")}}
              </div>
              <div class="box_tips ellips">
                {{$t("Problems_setting_up_the")}} {{$t("Retrieve_password")}}
              </div>
              <div class="box_btn">
                <router-link to="/user/infosetting/safeset" class="el-button el-button--big">{{$t("Password_protection")}}</router-link>
                <!--<span class="el-button el-button&#45;&#45;big">{{$t("Password_protection")}}</span>-->
              </div>
            </div>
            <div class="list_box bind_steam">
              <div class="box_icon">
                <span></span>
              </div>
              <div class="box_title">
                {{$t("Binding_Steam")}}
              </div>
              <div class="box_tips ellips">
                {{$t("To_login_to_receive_the")}}
              </div>
              <div class="box_btn">
                <router-link to="/user/infosetting/safeset" class="el-button el-button--big">{{$t("Binding_Steam")}}</router-link>
                <!--<span class="el-button el-button&#45;&#45;big">{{$t("Binding_Steam")}}</span>-->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--余额回收加载中-->
    <el-dialog
    :custom-class="'pure_dialog'"
    :visible.sync="loading"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :top="'30vh'"
    :append-to-body="true" >
      <div class="loading_content">
        <span></span>
        <p>马上就好，请稍等..</p>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="redeemCodeDialog.visible"
      :custom-class="redeemCodeDialog.class"
      :before-close="conversionCodeClose"
      >
      <div class="dialog_title" slot="title">{{$t("Conversion_code")}}</div>
      <div class="dialog_wrapper">
        <div class="redeem_tips">{{$t("For_input_into_code_for")}}</div>
        <div class="dialog_form_box">
          <div class="input_box clearfix">
            <div class="title_text">{{$t("Input_for_code")}}</div>
            <div class="box_right">
              <input type="text" :placeholder="$t('Please_enter_the_conversion_code')" v-model="redeemCodeDialog.code" class="ivu-input">
            </div>
          </div>
          <div class="msg_box" :class="{'err':redeemCodeDialog.errMsg}">{{redeemCodeDialog.msgText}}</div>
          <div class="btn">
            <span class="btn_loading dialog" v-if="redeemLoad"></span>
            <a href="javascript:;" class="d_btn normal" @click="doRedeemCode" v-else>{{$t("Immediately_change")}}</a>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
import { formatNumberSplit } from "../../utils/util";
import { mapState,mapGetters } from 'vuex'
import useroverviewrichpay from './useroverviewrichpay'

export default {
  name:'useroverview',
  components: { useroverviewrichpay },
  watch: {
    'redeemCodeDialog.code' : function (val, oldval) {
      this.redeemCodeDialog.code = val.toString().replace(/[^0-9]/g, '')
    },
    $route: {
      handler: function(val, oldVal){
        if(val.name == "useroverview" && oldVal.name == "useroverview" && val.query.code) {
            this.handleShowRedeemCodeDialog()
            this.redeemCodeDialog.code = val.query.code
        }
      },
      // 深度观察监听
      deep: true
    },
  },
  computed: {
    ...mapGetters(["userMoney","userNMMoneyLoad"]),
    ...mapState(["indexAlertData","userVirtualMoney","userVirtualMoneyLoad","userInfo"]),
    walletOnekeyStatus() {
      return this.userInfo.wallet_onekey_status?true:false
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.loadGameWalletList ()
      if(to.query.code) {
        vm.handleShowRedeemCodeDialog()
        vm.redeemCodeDialog.code = to.query.code
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    this.redeemCodeDialog.visible = false
    next()
  },
  data() {
    return {
      gameWalletList: [],
      redeemCodeDialog: {
        visible: false,
        class: 'redeem_code',
        code: '',
        errMsg: false,
        msgText: ''
      },
      redeemLoad: false,
      timer:null,
      countDown:60,
      loading:false,
    }
  },
  mounted () {
    let p = this.query
    this.$store.dispatch('getUserMoeny', 'NM')
  },
  methods: {
    //余额回收
    balanceBack() {
      if(this.countDown!=60) {
        return;
      }
      this.$confirm('您确认一键回收三方余额到主钱包吗？', this.$t("prompt"), {
        confirmButtonText: this.$t("determine"),
        cancelButtonText: this.$t("cancel"),
        type: 'warning',
        center: true
      }).then(() => {
        this.loading = true
        clearInterval(this.timer)
        this.timer = setInterval(() => {
          this.countDown --
          if(this.countDown == 0){
            this.countDown = 60
            clearInterval(this.timer)
          }
        }, 1000)
        this.$http(this.ApiSetting.user.getBackAllMoney)
          .then((res) => {
            this.loading = false
            this.$store.dispatch('getUserMoeny', 'NM')
             this.loadGameWalletList()
            if(res.status === 1 ){
              this.$message({
                type: 'success',
                message: res.message
              })
            }

          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    //一键转入
    onekeyChange() {
      let is_on = !this.walletOnekeyStatus?1:0;
      var _this = this
      if(is_on) {
        this.$confirm('是否开启一键转入模式？', this.$t("prompt"), {
          confirmButtonText: this.$t("determine"),
          cancelButtonText: this.$t("cancel"),
          type: 'warning',
          center: true
        }).then(()=>{
          this.walletOnekeyStatus = !this.walletOnekeyStatus
          setQuicklyTransfer()
        })
      }else {
        this.walletOnekeyStatus = !this.walletOnekeyStatus
        setQuicklyTransfer()
      }
      function setQuicklyTransfer( ) {
        _this.$http(_this.ApiSetting.user.setQuicklyTransfer,{
          is_on:is_on
        })
        .then(res => {
          if (res.status === 1) {
            _this.$message({
              type: 'success',
              message: res.message
            })
            _this.$store.commit('updateUserInfo', {wallet_onekey_status:res.data.is_on})
          }
        })
      }

    },
    formatNumberSplit(num) {
      let str = formatNumberSplit(num)
      return  str.substring(0,str.length-3)
    },
    conversionCodeClose(done) {
      if(this.$route.query.code) {
        let url = window.location.href;
        let valiable = url.split("?")[0];
        window.history.pushState({},0,valiable);
      }
      done();
    },
    loadGameWalletList () {
      this.$http(this.ApiSetting.user.getGameWalletList)
        .then((res) => {
          if(res.status === 1){
            if(res.data.length>0){
              res.data.forEach((v, i) => {
                v.id = new Date().getTime() + i
                v.loading = true
                v.money = []
              })
              this.gameWalletList = res.data
              this.gameWalletList.shift()
            }
            setTimeout(() => {
              this.loadGameWalletMoney ()
            }, 100)
          }
        })

    },
    loadGameWalletMoney () {
      this.gameWalletList.forEach((v, i) => {
        v.getMoneyFail = false
        let data = {
          gameCode: v.code
        }
        this.$http(this.ApiSetting.index.getMoney, data)
          .then((res)=>{
            if(res.status === 1){
              v.money = res.data.amount.split(".")
            }else{
              v.getMoneyFail = true
              v.errMsg = res.message
            }
            v.loading = false
            //this.gameWalletList.sort()
          }, (err) => {
            v.getMoneyFail = true
            v.loading = false
            //this.gameWalletList.sort()
          })
      })
      this.$forceUpdate()
    },
    handleShowRedeemCodeDialog () {
      this.redeemCodeDialog.visible = true
      this.redeemCodeDialog.code = ''
      this.redeemCodeDialog.errMsg = false
      this.redeemCodeDialog.msgText = ''
    },
    doRedeemCode () {
      if (this.redeemCodeDialog.code.length === 0) {
        this.redeemCodeDialog.errMsg = true
        this.redeemCodeDialog.msgText = this.$t("Conversion_code_cannot_be_empty")
        return false
      }
      let data = {
        coupon_num: this.redeemCodeDialog.code,
        hideMsg: true
      }
      this.redeemLoad = true
      let _this = this
      this.$http(this.ApiSetting.user.redeemCode, data)
        .then((res)=>{
          this.redeemLoad = false
          if(res.status === 1){
            this.redeemCodeDialog.errMsg = false
            this.redeemCodeDialog.code = ''
            if(this.indexAlertData.type == 7) {
              this.$message({
                message: this.$t("solaka_text4"),
                type: 'success'
              })
              setTimeout(() => {
                this.redeemCodeDialog.visible = false
                let url = window.location.href;
                let valiable = url.split("?")[0];
                window.history.pushState({},0,valiable);
              }, 1000);
            }
          }else{
            this.redeemCodeDialog.errMsg = true
          }
          this.redeemCodeDialog.msgText = res.message
      }, (err) => {
          this.redeemLoad = false
        })
    }
  }
}
</script>
 <style lang="less" scoped>
 .user_section_content {
   padding: 10px 60px;
  .accout_main {
    .accout_box {
      width: 398px;
      height: 248px;
      border-radius: 3px;
      box-sizing: border-box;
      background: url("../../assets/icon_es.png") no-repeat;
      background-position: -1441px -612px;
      position: relative;
      z-index: 2;
      box-shadow: 0 0 40px 4px rgba(0,0,0,0.6);
      padding: 30px;
      &.accout_vb {
        .btn {
          right: 20px;
        }
      }
      .btn {
        position: absolute;
        bottom: 30px;
        right: 30px;
        text-align: right;
      }
    }
    .accout_vb {
      .accout_title {
        i {
          display: inline-block;
          height: 18px;
          line-height: 16px;
          width: 18px;
          border-radius: 50%;
          text-align: center;
          box-sizing: border-box;
          border: 1px solid #767c97;
          color: #767c97;
          cursor: pointer;
          font-size: 14px;
          margin-left: 10px;
        }
      }
      .vb_tips {
        position: absolute;
        left: 30px;
        bottom: 30px;
      }
    }
    .accout_money {
      .btn {
        .el-button {
          margin-left: 20px;
        }
      }
    }
  }
 }
 .vermi {
   vertical-align: middle;
 }
 .onekey_txt {
   font-size: 16px;
   color: #ffffff;
   margin-left: 50px;
   margin-right: 6px;
 }
 .switch_box {
   display: inline-block;
   cursor: pointer;
 }
 .balance_back {
   margin-left: 20px;
   .el-button {
     width: 90px;
   }
   .countcown_color{
     color: #7c839f;
     cursor: default;
     &:hover {
       line-height: 30px;
       background: none;
       border: 1px solid #7c839f;
     }
   }
 }

 .safety_set {
   .set_box_list {
     margin-right: -19px;
     .list_box {
       float: left;
       margin: 10px 19px 10px 0;
       width: 120px;
       height: 158px;
       padding: 10px 5px;
       box-sizing: border-box;
       border-radius: 3px;
       background: url("../../assets/icon_es.png") no-repeat;
       background-position: -734px -730px;
       box-shadow: 0 0 50px 1px rgba(0,0,0,0.4);
       text-align: center;
     }
   }
 }
 .set_box_list {
   .list_box {
     .box_icon {
       height: 40px;
       line-height: 40px;
     }
     .box_title {
       color: #fff;
       font-size: 14px;
       height: 24px;
       line-height: 24px;
       margin-top: 4px;
     }
     .box_tips {
       height: 20px;
       line-height: 20px;
     }
     .box_btn {
       margin-top: 14px;
     }
   }
 }
 .redeem_code {
   &.el-dialog {
     .redeem_tips {
       text-align: center;
       color: #7c839f;
     }
     .dialog_form_box {
       padding-top: 40px;
     }
     .input_box {
       width: 420px;
       margin: 0 auto;
       .box_right {
         margin-left: 15px;
       }
     }
     .msg_box {
       width: 420px;
       padding-left: 100px;
       box-sizing: border-box;
       margin: 5px auto 0;
       font-size: 12px;
       min-height: 22px;
       line-height: 22px;
       color: #27bc74;
       &.err {
         color: #e31212;
       }
     }
   }
 }

 </style>

<style lang="less">
.onekey_switch {
  pointer-events: none;
  .ivu-switch-inner {
    font-size: 15px;
    left: 30px;
  }
  &.ivu-switch:after {
    width: 22px;
    height: 22px;
  }
  &.ivu-switch-checked .ivu-switch-inner{
    left: 15px;
  }
}
  .redeem_code.el-dialog {
    width: 600px;
    top: 10%;
  }
  .redeem_code.el-dialog .el-dialog__body{
    padding-bottom: 10px;
  }
  .loading_content {
    display: block;
    width: 500px;
    margin: 0 auto;
    height: 220px;
    line-height: normal;
    background: #17191f;
    overflow: hidden;
    span {
      margin-top: 40px;
      margin-bottom: 30px;
      display:  block;
      width: 100px;
      margin:30px auto;
      height: 100px;
      background: url("../../assets/big_loading.gif") no-repeat center;
    }
    p {
      text-align: center;
    }
  }
</style>
