<template>
  <div class="withdraw finance_center_wrapper" >
      <div class="money_box">
        <!--可提余额-->
        <div class="finance_form_box fl">
          <div class="box_left">{{$t("Can_carry_balances")}}</div>
          <div class="box_right">
            <div class="blance_num">
              <span v-if="!canWithdrawFlag">
                <span class="symbol">￥</span>
                <b v-show="currencyType != 3">{{todayCanWithdraw[0]}}.<i>{{todayCanWithdraw[1]}}</i></b>
                <b v-show="currencyType == 3">{{userMoney[0]}}.<i>{{userMoney[1]}}</i></b>
              </span>
              <span class="money_loading" v-else><i class="dot"></i>
                <i class="dot"></i><i class="dot"></i>
              </span>
            </div>
          </div>
        </div>
        <!--今日可提额度-->
        <div v-show="currencyType != 3" class="finance_form_box fl day_blance">
          <div class="box_left">{{$t("Today_will")}}</div>
          <div class="box_right">
            <div class="blance_num">
              <span v-if="!canWithdrawFlag">
                <span class="symbol">￥</span>
                <b>{{todayCanWithdrawLimit[0]}}.<i>{{todayCanWithdrawLimit[1]}}</i></b>
              </span>
              <span class="money_loading" v-else>
                <i class="dot"></i><i class="dot"></i><i class="dot"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    <div class="withdraw_tips">
      <span v-if="withdrawInfo.limitAmount>0">
        {{$t("Water_is_not_enough_you")}}{{withdrawInfo.limitAmount}}{{$t("yuan")}}
      </span>
      <span v-if="withdrawInfo.msg">{{withdrawInfo.msg}}</span>
    </div>

    <div class="withdraw_first_step">
      <!--提款金额-->
      <div class="finance_form_box clearfix">
        <div class="box_left">{{$t("On_withdrawals")}}</div>
        <template v-if="!withdrawBankList.length|| !withdrawInfo.phone || !withdrawInfo.has_securitypwd">
          <span class="withdraw_tips" v-if="currencyType != 3">
            为了保护您的资金安全，需绑定或设定全部下列选项后，才能提现
          </span>
          <span class="withdraw_tips" v-else>
            为了保护您的资金安全，需绑定银行卡、手机号码和交易密码才能转入V富通钱包
            <router-link to="/user/infosetting/safeset">立即绑定>></router-link>
          </span>
        </template>
        <div class="box_right" v-else>
          <input type="number" class="ivu-input"
          v-model.trim="withdrawData.money">
          <!--银行卡-->
          <div class="box_tips clear" v-show="currencyType==1">
            <span v-if="withdrawInfo.mid_money">金额 ≤ {{withdrawInfo.mid_money}}元将产生<span class="highlight">{{withdrawInfo.mid_fee}}元手续费</span>，</span>{{$t("For_single_withdrawal_limit")}}{{withdrawInfo.withdraw_min}}～{{withdrawInfo.withdraw_max}}{{$t("yuan")}}
          </div>
          <!--虚拟币-->
          <div class="box_tips clear" v-show="currencyType==2">
            <template v-if="withdrawInfo.virtualBanks.length">
              <span>虚拟币{{currentVb.withdraw_virtual_min_num}}起提</span>
              {{$t("For_single_withdrawal_limit")}}{{Math.ceil((currentVb.exchange_rate || 0)*currentVb.withdraw_virtual_min_num)}}～{{withdrawInfo.withdraw_max}}{{$t("yuan")}}
            </template>
            <template v-else>
              <span>虚拟币{{withdrawInfo.withdraw_virtual_min_num}}起提</span>
              {{$t("For_single_withdrawal_limit")}}{{withdrawInfo.withdraw_virtual_min}}～{{withdrawInfo.withdraw_max}}{{$t("yuan")}}
            </template>
          </div>
          <div class="box_tips clear" v-show="currencyType==3">
            <span>输入整数金额，最低{{ withdrawInfo.richpay_conf.withdraw_min_amount }}元起无上限</span>
          </div>
        </div>
      </div>
      <!--提现账户-->
      <div class="finance_form_box clearfix selaccount">
        <div class="box_left"> 提现账户</div>
        <div class="box_right">
          <div v-for="(item ,index) in withdrawInfo.wallet_type"
               :key="index"
               class="el-button"
               :class="[{'active':currencyType == item.bank_id}, {'is_hot': item.is_hot}]"
               @click="currencyType = item.bank_id">
            {{ item.name }}
            <i v-if="item.is_hot" class="hot"></i>
          </div>

            <span class="predictget" v-show="currencyType==2">
              预计到账：{{vbNum}}个
              <el-popover trigger="hover" placement="top"
              content="根据多个交易所当前汇率得出，因数字货币波动强烈，以实际到账数量为准。">
                <span class="question_img" slot="reference" ></span>
              </el-popover>
              </span>
           <div v-if="canWithdrawFlag"><span class="small_loading"></span></div>
          <!--银行卡-->
           <div class="card_info" v-show="currencyType==1">
             <div class="bank_card"
             v-for="item in withdrawBankList" :key="item.id"
             :class="{'default':item.id ==currentBank.id}"
               :style="{background: 'linear-gradient(135deg,' + item.bank_color[0] + ',' + item.bank_color[1]+')'}" >
                 <div class="detault_mask" v-show="item.id ==currentBank.id">选中</div>
                 <div class="setdefault" @click="currentBank =item">选中该账户</div>
                 <div class="bank_card_info">
                   <img class="bank_icon" :src="item.logo" alt="">
                   <span class="bank_name">{{item.bank_name}}</span>
                 </div>
                 <div class="bank_account">
                   {{item.show_account| formatBankAcount}}
                 </div>
                 <img class="svg_wrapper" :src="item.svg" alt="">
             </div>
             <!--添加银行卡-->
              <router-link class="add_card"
              v-if="withdrawInfo.count<withdrawInfo.bankLimit"
              to="/user/infosetting/bank" >
                  <img src="../../../assets/icon-add.png" alt="">
                  <span>{{$t("Add_a_bank_card")}}</span>
              </router-link>

            </div>
            <!--虚拟币-->
            <div class="card_info" v-show="currencyType==2">
              <div class="bank_card vb_bank_card"
              v-for="item in withdrawInfo.virtualBanks" :key="item.id"
              :class="{'default':item.id==currentVb.id}"
                :style="{background: 'linear-gradient(135deg,' + item.bank_color[0] + ',' + item.bank_color[1]+')'}" >
                  <div class="detault_mask" v-show="item.id==currentVb.id">选中</div>
                  <div class="setdefault" @click="selVirtualBank(item)">选中该账户</div>
                  <div class="bank_card_info">
                    <img class="bank_icon" :src="item.logo" alt="">
                    <span class="bank_name">{{item.bank_name}}</span>
                  </div>
                  <p class="vb_account">{{item.bank_url}}</p>
              </div>
              <!--添加虚拟币-->
              <router-link class="add_card vb_bank_card"
              v-if="withdrawInfo.virtualCount<withdrawInfo.virtualBankLimit"
              to="/user/infosetting/virtualcurrency">
                  <img src="../../../assets/icon-add.png" alt="">
                  <span>添加虚拟币账户</span>
              </router-link>
            </div>
          <!--V富通-->
          <div class="card_info" v-show="currencyType==3">
            <div class="bank_card richpay_card">
              <div class="richpay_name">
                <i></i><span>V富通钱包</span>
              </div>
              <p class="info" style="margin-top: 15px;"><small>年利率</small><small>该笔七日预期收益</small></p>
              <p class="info">
                <small>{{ withdrawInfo.richpay_year_show }}%</small>
                <span>¥{{ !isNaN(parseFloat(withdrawData.money)) ? formatNumber((parseFloat(withdrawData.money) * withdrawInfo.richpay_seven_day_rate)) : "0.00" }}</span>
              </p>
            </div>

          </div>
        </div>
      </div>

      <template v-if="currencyType != 3">
        <!--绑定手机-->
        <div class="finance_form_box clearfix bind_phone" v-if="withdrawInfo.needMsgCode">
          <div class="box_left">
            {{$t("Binding_mobile_phone")}}
          </div>
          <div class="box_right">
            <span v-if="withdrawInfo.phone" class="phone">{{withdrawInfo.phone}}</span>
            <router-link to="/user/infosetting/safeset" class="kf" v-else>设置手机号</router-link>
          </div>
        </div>
        <!--手机验证码-->
        <div class="finance_form_box clearfix" v-if="withdrawInfo.needMsgCode && withdrawInfo.phone">
          <div class="box_left">
            {{$t("Phone_verification_code")}}
          </div>
          <div class="box_right">
            <div class="send_ver_code ivu-input">
              <input type="text" autocomplete="off"
                     v-model.trim="withdrawData.phone_verify">
              <div  class="sent_btn"
                    :class="{'disabled':countDownShow}"
                    @click="sendVerCode">
                <span v-show="!countDownShow">{{$t("Send_verification_code")}}</span>
                <span v-show="countDownShow">
                <i>{{countDownTime}}</i>{{$t("Seconds_later")}}
              </span>
              </div>
            </div>
            <p class="withdraw_tip">请输入收到的短信验证码</p>
            <!-- <div class="withdraw_tips">{{$t("Because_of_your_account_status")}}</div> -->
          </div>
        </div>
        <!--交易密码-->
        <div class="finance_form_box clearfix">
          <div class="box_left">{{$t("Trade_password")}}</div>
          <div class="box_right">
            <input type="password" class="ivu-input"
                   autocomplete="new-password"
                   v-model.trim="withdrawData.password"
                   v-if="withdrawInfo.has_securitypwd">
            <div class="forget_pwd clear" v-else>
              <router-link to="/user/infosetting/safeset" class="kf">{{$t("Set_up_the_trading_password")}}</router-link>
            </div>
            <p class="withdraw_tip"  v-if="withdrawInfo.has_securitypwd">请输入交易密码</p>
          </div>

        </div>
        <div class="btn to_next" v-if="!canWithdrawFlag">
          <span class="btn_loading" v-if="toNextBtnLoadFlag"></span>
          <a href="javascript:;" class="d_btn normal" @click="toConfirm" v-else>{{$t("The_next_step")}}</a>
        </div>
      </template>
      <template v-else>
        <div class="btn" style="margin-left: 140px">
          <span v-if="confirmBtnLoadFlag" class="btn_loading"></span>
          <button v-else
             class="d_btn normal"
             @click="handleVerifyForRichpayWithdraw">
            确定
          </button>
        </div>
      </template>

    </div>
    <!--确认页面-->
    <el-dialog
    :append-to-body="true"
    :visible.sync="confirmShow"
    custom-class="withdraw_confirm_step confirm_step margintop35">
     <div class="dialog_title" slot="title">确认提现金额</div>
     <div class="dialog_wrapper" :class="{'vb_dialog_wrapper':currencyType==2}">
       <p class="top_tip" v-show="currencyType==2">*为了保障您的账号安全，添加成功的虚拟币账户不可自行移除或修改，请您校对您的账户信息。</p>
       <div class="input_wrapper">
         <div class="confirm_box clearfix">
           <div class="left">{{$t("On_withdrawals")}}</div>
           <div class="right">{{withdrawData.money}}元</div>
         </div>
         <div class="confirm_box clearfix" v-show="currencyType==1">
           <div class="left">{{$t("Bank_card")}}</div>
           <div class="right">{{currentBank.bank_name}}  {{currentBank.account_name}}  {{fullBankName}}   {{currentBank.province}} {{currentBank.city}}</div>
         </div>
         <div class="confirm_box clearfix" v-show="currencyType==2">
           <div class="left">预计到账</div>
           <div class="right">
             {{vbNum}}个
             <el-popover trigger="hover" placement="top"
             content="根据多个交易所当前汇率得出，因数字货币波动强烈，以实际到账数量为准。">
                <span class="question_img" slot="reference"></span>
             </el-popover>
            </div>
         </div>
         <div class="confirm_box clearfix" v-show="currencyType==2">
           <div class="left">虚拟币账户</div>
           <div class="right">
             <span>{{currentVb.bank_name}}</span>
             <p class="conp">{{currentVb.bank_url}}</p>
            </div>
         </div>
       </div>
       <div class="btn">
         <a href="javascript:;" class="d_btn normal"
          @click="handleWithDraw" >
          <span class="small_loading" v-show="confirmBtnLoadFlag"></span>
          {{$t("confirm")}}</a>
       </div>
       <p class="bottom_tip">
         通常您的提款申请只需3-15分钟即可到
         账，若超过30分钟未到账，请及时联系
         在线客服。
       </p>
     </div>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
import { formatNumberSplit } from "../../../utils/util";
import { mapActions } from 'vuex'
export default {
  name: "userwithdraw",
  components: {},
  data() {
    return {
      canWithdrawFlag: false,
      toNextBtnLoadFlag: false,
      confirmBtnLoadFlag: false,
      countDownTime: 60,
      countDownShow: false,
      todayCanWithdraw: 0.0,
      todayCanWithdrawLimit: 0.0,
      userMoney: 0.0,
      withdrawInfo: {},
      withdrawBankList: [],
      currentBank: {},
      currentVb:{},
      withdrawData: {
        money: "",
        password: "",
        phone_verify: "",
      },
      currencyType:1,
      confirmShow:false,
      vbNum:0,
      fullBankName:""
    };
  },
  filters: {
    formatBankAcount (str) {
      let strtem = str.substring(0,str.length-3)
      let strtem1 = str.substr(-3,3)
      return strtem.replace(/(.{4})/g,'$1 ') + " "+strtem1
    }
  },
  created() {
    this.loadWithdrawIndex();
  },
  watch: {
    "withdrawData.money"(val) {
      this.vbNumCompute();
      //提款金额输入限制
      if(val>0) {
        if (this.currencyType != 3) {
          this.withdrawData.money = Math.min(this.withdrawData.money,this.withdrawInfo.withdraw_max)
        }
      }
    },
  },
  methods: {
    ...mapActions(["getUserMoeny"]),
    formatNumber(num) {
      return formatNumberSplit(num)
    },
    //提款金额 虚拟币选中账户改变  到账个数改变
    vbNumCompute() {
      if (this.withdrawData.money && this.currentVb.id && !isNaN(parseFloat(this.withdrawData.money))) {
        let num = parseFloat(this.withdrawData.money) / parseFloat(this.currentVb.exchange_rate)
        this.vbNum = Math.floor(num * 10000) / 10000
      }else {
        this.vbNum = 0
      }
    },
    //虚拟币账户选择
    selVirtualBank(item) {
      this.currentVb=item
      this.vbNumCompute()
    },
    //获取基本信息
    loadWithdrawIndex() {
      this.canWithdrawFlag = true;
      this.$http(this.ApiSetting.user.withdrawIndex).then(res => {
        if (res.status === 1) {
          this.withdrawInfo = res.data;
          if (this.withdrawInfo && this.withdrawInfo.wallet_type.length) {
            this.currencyType = this.$route.params.type || this.withdrawInfo.wallet_type[0].bank_id
          }
          this.todayCanWithdraw = formatNumberSplit(
            res.data.todayLeftWithdraw
          ).split(".");
          this.todayCanWithdrawLimit = formatNumberSplit(
            res.data.maxWithdraw
          ).split(".");
          this.userMoney = formatNumberSplit(
            res.data.userMoney
          ).split(".");
          this.withdrawBankList = res.data.banks;
          if (this.withdrawBankList.length > 0) {
            this.currentBank = this.withdrawBankList[0];

          }
          if(this.withdrawInfo.virtualBanks&&this.withdrawInfo.virtualBanks.length) {
            this.currentVb = this.withdrawInfo.virtualBanks[0]
          }
        }
        this.canWithdrawFlag = false;
      });
    },
    //发送验证码
    sendVerCode() {
      if (this.countDownShow) {
        return false;
      } else {
        let data = {
          type: 5
        };
        this.$http(this.ApiSetting.index.sendPhoneVerCode, data).then(res => {
          if (res.status === 1) {
            this.countDownShow = true;
            this.countDownTime = res.data.seconds;
            this.timer = setInterval(() => {
              this.countDownTime--;
              if (this.countDownTime <= 0) {
                this.countDownShow = false;
                this.countDownTime = res.data.seconds;
                clearInterval(this.timer);
              }
            }, 1000);
          } else {
            this.$message({
              message: res.message,
              type: "warning"
            });
          }
        });
      }
    },
    //第一步验证
    toConfirm() {
      if (this.withdrawInfo.limitAmount > 0) {
        this.$message({
          message: this.$t("Your_lack_of_water"),
          type: "warning"
        });
        return false;
      }
      if (this.withdrawData.money.toString().length === 0) {
        this.$message({
          message: this.$t("Please_enter_the_amount_of"),
          type: "warning"
        });
        return false;
      }
      if (
        this.withdrawInfo.needMsgCode &&
        this.withdrawData.phone_verify.length === 0
      ) {
        this.$message({
          message: this.$t("Please_enter_the_mobile_phone"),
          type: "warning"
        });
        return false;
      }
      if(this.currencyType === 2 && !this.withdrawInfo.virtualCount) {//虚拟币账户
        this.$message({
          message:   '请先添加虚拟币账户',
          type: "warning"
        });
        return false;
      }
      if (this.withdrawData.password.length === 0) {
        this.$message({
          message: this.$t("Please_enter_trading_password"),
          type: "warning"
        });
        return false;
      }
      if(parseFloat(this.withdrawInfo.todayLeftWithdraw) === 0 || parseFloat(this.withdrawData.money) > parseFloat(this.withdrawInfo.todayLeftWithdraw)) {
        this.$message({
          message: '余额不足',
          type: "warning"
        });
        return
      }
      if(this.currencyType==1) {
        //银行卡
        let data = {
          money: this.withdrawData.money,
          bank_id: this.currentBank.id,
          password: this.withdrawData.password,
          phone_verify: this.withdrawData.phone_verify
        };
        this.toNextBtnLoadFlag = true;
        this.fullBankName = ""
        this.$http(this.ApiSetting.user.withdrawCheck, data).then(
          res => {
            if (res.status === 1) {
              this.fullBankName = res.data.show_full_account || this.currentBank.show_account;
              this.confirmShow = true;
            }
            this.toNextBtnLoadFlag = false;
          },
          err => {
            this.toNextBtnLoadFlag = false;
          }
        );
      }else{
        //currencyType==2 虚拟币
        this.confirmShow = true;
      }
    },
    //确认提现最后提交
    handleWithDraw() {
      if(this.confirmBtnLoadFlag) {
        return
      }
      let data = {
        money_type:this.currencyType,
        money: this.withdrawData.money,
        bank_id: this.currencyType==1?this.currentBank.id:this.currentVb.id,
        password: this.withdrawData.password,
        phone_verify: this.withdrawData.phone_verify
      };
      if(this.currencyType==2) {
        data.virtual_money = this.vbNum
      }
      this.confirmBtnLoadFlag = true;
      this.$http(this.ApiSetting.user.withdrawSubmit, data).then(
        res => {
          this.confirmBtnLoadFlag = false;
          this.confirmShow = false
          if (res.status === 1) {
            this.$message({
              message: res.message,
              type: "success"
            });
            this.loadWithdrawIndex()
            this.$store.dispatch("getUserMoeny", "NM");
          }
        },
        err => {
          this.confirmBtnLoadFlag = false;
        }
      );
    },
    // 提现到V富通验证
    handleVerifyForRichpayWithdraw () {
      // 账户未绑定银行卡和手机号码
      if (!this.withdrawBankList.length || !this.withdrawInfo.phone || !this.withdrawInfo.has_securitypwd) {
        this.$message({ message: "需要先绑定银行卡和手机号码和交易密码", type: "warning" })
        return false
      }
      // 是否输入了金额
      if (this.withdrawData.money.toString().length === 0) {
        this.$message({
          message: this.$t("Please_enter_the_amount_of"),
          type: "warning"
        })
        return false
      }
      // 余额是否足够
      if(parseFloat(this.withdrawInfo.userMoney) === 0 || parseFloat(this.withdrawData.money) > parseFloat(this.withdrawInfo.userMoney)) {
        this.$message({ message: "余额不足", type: "warning" })
        return false
      }
      // 提现到V富通金额需要大于1
      if (parseFloat(this.withdrawData.money) < 1) {
        this.$message({ message: "提现到V富通钱包需要1元起哦~", type: "warning" })
        return false
      }
      // V富通是否被锁定
      if (this.withdrawInfo.richpay_conf.wallet_is_lock) {
        this.$message({ message: "您的V富通钱包被锁定，如有疑问请联系客服", type: "warning" })
        return false
      }
      this.submitRichpayWithdraw()
    },
    // 提现到V富通
    submitRichpayWithdraw () {
      if (this.confirmBtnLoadFlag) return false
      this.confirmBtnLoadFlag = true
      const params = {
        money: this.withdrawData.money,
        money_type: 3
      }
      this.$http(this.ApiSetting.user.withdrawToRichPaySubmit, params)
        .then(({status, message}) => {
          if (status === 1) {
            this.$message({ message: message, type: 'success' })
            this.loadWithdrawIndex()
            this.getUserMoeny("NM")
            this.withdrawData.money = ""
          }
        })
        .finally(() => {
          this.confirmBtnLoadFlag = false
        })
    }
  }
};
</script>
<style lang="less" scoped>
.withdraw {

  .finance_form_box {
    margin-bottom: 15px;
    .box_left {
      width: 120px;
    }
  }
  .money_box {
    overflow: hidden;
    .finance_form_box {
      width:400px;
      margin-bottom: 0;
    }
  }
  .selaccount {
    .box_right {
      width:720px;
    }
    .predictget {
      margin-left: 20px;
      font-size: 16px;
      color: #fff;
      vertical-align: middle;
    }
    .el-button {
      width: 120px;
      font-size: 18px;
      color: #7c839f;
      margin-right: 20px;
      &:last-child {
        margin-right: 0;
      }
      &:hover,&.active {
        color: #07f1b7;
      }
      &.is_hot {
        position: relative;
        .hot {
          display: inline-block;
          position: absolute;
          width: 34px;
          height: 12px;
          right: -13px;
          top: -6px;
          background: url("../../../assets/icon_es.png") no-repeat;
          background-position: -1555px -144px;
        }
      }
    }
    .card_info {
      margin-top: 25px;
      .vb_bank_card {
        height: 100px;
        line-height: 96px;
      }
    }
    .bank_card {
      width:220px;
      height: 80px;
      padding: 8px 20px;
      .bank_account {
        margin-top: 4px;
        font-size: 16px;
      }
      .bank_name {
        font-size: 14px;
      }
      .setdefault {
        font-size: 12px;
        line-height: 80px;
      }
      .vb_account {
        line-height: 1;
        height: 50px;
        display: flex;
        align-items: center;
        margin-top: 0;
      }
      &.richpay_card {
        height: 100px;
        background-image: linear-gradient(to right, #5d71a2, #1e2535);
        .richpay_name {
          height: 28px;
          margin-top: 10px;
          font-size: 14px;
          line-height: 28px;
          letter-spacing: -0.7px;
          color: #ffffff;
          i {
            display: inline-block;
            width: 29px;
            height: inherit;
            margin-right: 8px;
            background: url("../../../assets/icon_es.png") no-repeat;
            background-position: -1499px -223px;
          }
          span {
            vertical-align: top;
          }
        }
        .info {
          width: 100%;
          font-size: 12px;
          line-height: 12px;
          color: #ffffff;
          margin-bottom: 6px;
          display: flex;
          justify-content: space-between;
          span {
            color: #09e8b3;
          }
        }
      }
    }
    .add_card {
      width:220px;
      height: 80px;
      line-height: 76px;
    }
  }

  .withdraw_tips {
    color: #e34d12;
    font-size: 12px;
    margin-left: 20px;
    a {
      color: #e34d12;
      text-decoration: underline;
    }
  }
  .withdraw_tip {
    font-size: 12px;
  }
  .finance_form_box.bind_phone {
    .box_right {
      .phone {
        color: #fff;
        font-size: 18px;
      }
    }
  }

  .to_next {
    margin: 30px 0 40px;
    padding-left: 140px;
  }
}
.withdraw_tips {
  text-align: center;
  line-height: 40px;
  height: 40px;
}
.finance_form_box {
  .box_right {
    min-width: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    b {
      font-size: 36px;
      font-weight: normal;
      color: #fff;
      i {
        font-size: 26px;
      }
    }
    .box_tips {
      .highlight {
        color: #e34d12;
      }
    }
  }
}
.finance_form_box.day_blance {
  margin-left: 24px;
}

.withdraw_first_step {
  .finance_form_box {
    .box_right.bank {
      padding-top: 5px;
      label.ivu-radio-wrapper {
        display: block;
        line-height: 30px;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
<style lang="less">
.question_img{
  display: inline-block;
  margin-left:5px;
  vertical-align: middle;
  width: 18px;
  height: 18px;
  cursor: pointer;
  background: url("../../../assets/icon-question-n.png") no-repeat;
  &:hover {
    background: url("../../../assets/icon-question-h.png") no-repeat;
  }
}
.withdraw_confirm_step {
  margin-top: 26vh !important;
  width:740px !important;
  .vb_dialog_wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    .confirm_box {
      margin-left:0;
    }
    .d_btn,.bottom_tip {
      width: 350px;
    }
  }
  .confirm_box{
    margin-left: 140px;
  }
  .d_btn {
    width:250px;
  }
  .conp {
    line-height: normal;
    word-break: break-all;
    max-width: 360px;
  }
  .top_tip {
    margin-bottom:30px;
    text-align: center;
    color: #7c839f;
    font-size: 14px;
  }
  .bottom_tip {
    margin: 15px auto;
    width:250px;
    font-size: 14px;
    text-align: justify;
    color: rgba(124, 131, 159, 0.4);
  }
}
</style>
