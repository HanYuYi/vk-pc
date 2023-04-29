<template>
  <div class="deposit">
    <div class="finance_center_wrapper">
      <!--充值方式-->
        <div class="finance_form_box clearfix deposit_type">
          <div class="box_left">
            {{$t("Top_up_way")}}
          </div>
          <div class="box_right bank">
            <radio-group size="large" v-model="currentDepositType" @on-change="depositTypeChange()">
              <div v-for="item in depositTypeList" :key="item.id">
              <div class="deposit_type_wrapper clearfix" >
                <radio :label="item.id" class="fl">
                  <span class="deposit_type_icon" v-lazy-container="$store.state.lazyPack244"> <img :data-src="item.logo" alt=""> <i v-if="item.is_hot" class="hot"></i></span>
                  {{item.type_name}}
                </radio>
                <div class="deposit_type_line fl">
                  <span class="line" v-for="line in item.banks" :key="line.id" :class="{'actived':line.id===currentDepositTypeLineId}" @click="depositLineSelect(line.id)">线路{{line.name}}</span>
                  </div>
                <div class="recommend_tips f1">{{item.recommend_tips}}</div>
              </div>
                  <div class="ts_msg" v-if="selectCurType.is_risk && item.is_risk">{{selectCurType.risk_tips}}</div>

               </div>

            </radio-group>
          </div>
        </div>
      <!--充值金额-->
      <div class="finance_form_box clearfix">
        <div class="box_left">
          {{$t("Top_up_amount")}}
        </div>
        <div class="box_right">
          <input type="number" class="ivu-input" v-model.trim="depositData.amount" :placeholder="$t('Not_more_than_two_decimal')">
          <div class="box_tips">{{$t("For_single_top_up_limit")}}{{depositMin}}～{{depositMax}}{{$t("yuan")}}</div>
        </div>
      </div>
      <transition name="fade">
        <div class="finance_form_box clearfix"  v-for="(item, index) in elseInfoList" :key="index"
        v-show="!(item.field=='account_name'&&isShowAccoutName==0)">
          <div class="box_left">
            {{item.name}}
          </div>
          <div class="box_right">
            <input type="text" class="ivu-input" v-model.trim="elseInfoList[item.field]">
            <div class="box_tips">{{item.desc}}</div>
          </div>
        </div>
      </transition>
      <div class="deposit_type_content">
        <transition name="fade-in-linear">
        <div class="finance_form_box clearfix bank_select" v-if="selectBankList.length>0">
          <div class="box_left">
            {{$t("Banks_choose")}}
          </div>
          <div class="box_right">
            <i-select v-model="currentDepositBankId" :placeholder="$t('Please_select_a_bank')" label-in-value  @on-change="bankSelect($event)" class="deposit_bank_select">
              <i-option v-for="item in selectBankList" :value="item.value" :key="item.vaule" :label="item.name">
                <div class="bank_box"><span class="bank_logo"><img :src="item.icon_png" alt=""></span><span class="bank_name">{{item.name}}</span></div>
              </i-option>
            </i-select>
          </div>
        </div>
        <!-- <div class="finance_form_box" v-else>

        </div> -->
        </transition>

        <div class="applay_deposit_wrapper">
           <!--充值按钮-->
          <div class="btn">
            <span class="btn_loading" v-if="btnLoadFlag"></span>
            <a href="javascript:;" class="d_btn normal" @click="handleApplyDeposit" v-else>{{$t("Apply_for_top_up")}}</a>
            <!--虚拟币充值引导--->
            <router-link v-show="[13, 15].includes(selectCurType.type_id)" class="color_07f1b7" to="/guide/16-2">点击查看虚拟币充值说明 >></router-link>
          </div>
          <div class="apply_tips" v-html="$t('In_the_top_up_account')"></div>

        </div>
      </div>
    </div>
    <div class="deposit_record user_records">
      <div class="finance_center_wrapper">
        <div class="user_records_title">
          {{$t("Prepaid_phone_records")}}<span>{{$t("In_recent_10_records")}}</span>
        </div>
        <div class="records_list">
          <div class="t-table">
            <div class="t-header">
              <div class="t-row">
                <div class="t1">{{$t("Serial_number")}}</div>
                <div class="t2">{{$t("Creation_time")}}</div>
                <div class="t3">{{$t("Top_up_way")}}</div>
                <div class="t4">{{$t("money")}}</div>
                <div class="t5">{{$t("The_account_balance")}}</div>
                <div class="t6">{{$t("Postscript")}}</div>
                <div class="t7">{{$t("Transaction_status")}}</div>
              </div>
            </div>
            <div class="t-body">
              <div class="btn" v-show="listLoad"><span class="btn_loading"></span></div>
              <div class="t-row" v-for="item in depositRecordsList" :key="item.id">
                <div :title="item.order_no" class="t1">{{item.order_no}}</div>
                <div class="t2">{{item.time*1000 | formatdate('yyyy/MM/dd HH:mm:ss')}}</div>
                <div class="t3">{{item.description}}</div>
                <div class="t4" :class="{'num':item.operations===1,'error':item.operations!==1 }"><span :class="{'fail': item.status === 2}"><i class="minus">- </i>{{item.amount}}</span></div>
                <div class="t5">{{item.availablebalance}}</div>
                <div class="t6">{{item.key?item.key:'-'}}</div>
                <div class="t7">
                  <span v-if="item.status === 1" class="success">{{$t("A_successful_deal")}}</span>
                  <span v-if="item.status === 0" class="info">{{$t("Trading_in")}}</span>
                  <span v-if="item.status === 2" class="error">{{$t("Transaction_failure")}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <el-dialog
      :visible.sync="jumpConfirmDialog.visible"
      :custom-class="jumpConfirmDialog.class"
      :width="jumpConfirmDialog.width"
      :close-on-click-modal="depositDialogCloseModal">
      <div class="dialog_title" slot="title">{{$t("Prepaid_phone_confirmation")}}</div>
      <div class="dialog_wrapper">
        <div class="dialog_form_box" style="padding: 10px 0 16px">
          <ul class="confirm-info">
            <li><h6>充值金额</h6><p>{{ formatNumber(depositData.amount) }} {{$t("yuan")}}</p></li>
            <li v-if="confirmInfo.name && confirmInfo.name.length"><h6>{{ confirmInfo.name }}</h6><p>{{ confirmInfo.account_name }}</p></li>
          </ul>
          <ul v-if="depositTypeList[currentDepositType] && depositTypeList[currentDepositType].type_name && !depositTypeList[currentDepositType].type_name.includes('虚拟币')" class="confirm-desc">
            <li>本通道限额为<span>{{depositMin}}-{{depositMax}}</span>元，低于最低限额将无法办理到账。</li>
            <li>实际转账金额应当与要求转账金额一致，否则将无法自动到账。</li>
            <template v-if="confirmInfo.name && confirmInfo.name.length">
              <li v-if="confirmInfo.name.includes('银行卡')">请使用您发起订单的银行卡姓名转账，如支付姓名不符，将无法自动到账，如造成损失，本站不承担任何责任。</li>
              <li v-if="confirmInfo.name.includes('支付宝')">请使用您发起订单的支付宝姓名转账，如支付姓名不符，将无法自动到账，如造成损失，本站不承担任何责任。</li>
            </template>
          </ul>
          <form :action="depositForm.url" method="post" target="_blank" id="form_export" name="deposit_form"  class="btn" @submit="handleJumpConfirm" style="padding-top: 30px">
            <input type="text" v-for="(val, k) in depositForm.params" :key="k" :name="k" :value="val" hidden>
            <input type="submit" :value="$t('Go_to_prepaid_phone')" class="d_btn normal">
          </form>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="applyDepositDialog.visible"
      :custom-class="applyDepositDialog.class"
      :close-on-click-modal="depositDialogCloseModal">
      <div class="dialog_title" slot="title">{{$t("Prepaid_phone_confirmation")}}</div>
      <div class="dialog_wrapper">
        <div class="dialog_form_box confirm_step">
          <div class="input_wrapper">
            <div class="confirm_box clearfix bank">
              <div class="left">{{$t("Collecting_bank")}}</div>
              <div class="right"><span class="bank_icon" v-if="applyDepositDialogInfo.bank_logo"><img :src="applyDepositDialogInfo.bank_logo" alt=""></span>{{applyDepositDialogInfo.acount_bank}}</div>
            </div>
            <div class="confirm_box clearfix">
              <div class="left">{{$t("Payment_account")}}</div>
              <div class="right accout">{{applyDepositDialogInfo.acount}}
                <div class="accout_tips" v-if="applyDepositDialogInfo.account_diff == 1"><i>!</i>{{$t("The_credit_account_with_you")}}</div>
              </div>
            </div>
            <div class="confirm_box clearfix">
              <div class="left">{{$t("Payment_account_name")}}</div>
              <div class="right">{{applyDepositDialogInfo.name}}
              </div>
            </div>
            <div class="confirm_box clearfix" v-if="applyDepositDialogInfo.acount_bank_info">
              <div class="left">{{$t("Branch_information")}}</div>
              <div class="right">{{applyDepositDialogInfo.acount_bank_info}}
              </div>
            </div>
            <div class="confirm_box clearfix">
              <div class="left">{{$t("Top_up_amount")}}</div>
              <div class="right">{{applyDepositDialogInfo.money}}</div>
            </div>
            <div class="confirm_box clearfix" v-if="applyDepositDialogInfo.orderId">
              <div class="left">{{$t("Postscript")}}</div>
              <div class="right">{{applyDepositDialogInfo.orderId}}</div>
            </div>
          </div>
          <div class="confirm_deposit_tips">
            <span class="warning" v-show="!isShowExtTips">1. {{toTransferStrong}}</span><br/>
            <span v-show="!isShowExtTips" v-html="toTransferDes"></span>
            <p v-show="isShowExtTips" v-for="(itxt,index) in toTransferDes"
            :key="index"
             :style="{color:itxt.color}">{{itxt.title}}</p>
          </div>
          <div class="btn">
            <a href="javascript:;" class="d_btn normal" @click="applyDepositDialog.visible=false">{{$t("determine")}}</a>
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="applyDepositQRDialog.visible"
      :custom-class="applyDepositQRDialog.class"
      :width="applyDepositQRDialog.width"
      :close-on-click-modal="depositDialogCloseModal">
      <div class="dialog_title" slot="title">{{$t("Sweep_top_up_code")}}</div>
      <div class="dialog_wrapper">
        <div class="dialog_form_box">
          <div class="qr_code_wrapper">
            <div class="qr_code_img">
              <img :src="applyDepositQRDialog.imgUrl" alt="">
            </div>
            <p class="qr_tips">{{$t("Qr_code_valid_time_for")}}</p>
          </div>
          <div class="btn">
            <a href="javascript:;" class="d_btn normal" @click="applyDepositQRDialog.visible=false">{{$t("determine")}}</a>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
import {  formatDate, formatNumberSplit } from '../../../utils/util'
export default {
  name: 'userdeposit',
  components: {},
  filters: {
    formatdate (num, formate) {
      return formatDate (num, formate)
    }
  },
  watch: {
    'depositData.amount': function (val, oldval) {
      if(val.indexOf('.') > 0 && val.split(".").length == 2){
        if(val.split(".")[1].length > 2){
          this.depositData.amount = oldval
        }
      }
      if(val < 0){
        this.depositData.amount = ''
      }
    }
  },
  created () {
    this.loadDepositList ()
    this.loadDepositRecordsList ()
  },
  data() {
     return {
       toTransferStrong:"",
       toTransferDes:"",
       listLoad: false,
       depositMin: 0,
       depositMax: 0,
       btnLoadFlag: false,
       depositTypeList: [],
       currentDepositType: 0,
       currentDepositTypeLineId: 0,
       currentDepositBankIndex: 0,
       currentDepositBankId: '',
       elseInfo: [],
       elseInfoList: [],
       depositData: {
         bank_id: '',
         bank: '',
         amount: ''
       },
       selectBankList: [],
       depositType: '',
       depositForm: {
         url: '',
         params: ''
       },
       depositDialogCloseModal: false,
       applyDepositDialogInfo: {
         bank_logo: '',
         acount_bank: '',
         acount: '',
         name: '',
         acount_bank_info:'',
         money: '',
         orderId: '',
         account_diff: ''
       },
       jumpConfirmDialog: {
         visible: false,
         class: 'jump_confirm_dialog',
         width: '474px'
       },
       applyDepositDialog: {
         visible: false,
         class: 'apply_deposit_dialog'
       },
       applyDepositQRDialog: {
         visible: false,
         class: 'apply_deposit_qr_dialog',
         width: '360px',
         imgUrl: ''
       },
       depositRecordsList: [],
       isShowAccoutName:0,
       isShowExtTips:false,
       selectCurType:{},
       confirmInfo: {},

       lineChangeStr: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"]
     }
  },
  methods: {
    formatNumber(num) {
      return formatNumberSplit(num)
    },
    depositTypeChange () {

      this.selectCurType = this.depositTypeList[this.currentDepositType]
      this.currentDepositTypeLineId = 0
      this.currentDepositBankIndex = 0
      this.depositDataShowInit ()
    },
    depositLineSelect (x) {
      this.currentDepositTypeLineId = x
      this.currentDepositBankIndex = 0
      this.depositDataShowInit ()
    },
    loadDepositList () {
      this.$http(this.ApiSetting.user.getDepositList)
        .then((res) => {
          if(res.status === 1){
            if(res.data.length > 0){
              res.data.forEach((v, i) => {
                v.id = i
                if(v.banks.length > 0){
                  v.banks.forEach((x, y) => {
                    x.id = y
                    x.name = this.lineChangeStr[y]
                    if (y >= 10) {
                      const ten = +y.toString()[0]
                      const bit = +y.toString()[1]
                      if (y < 19) {
                        x.name = `${this.lineChangeStr[9]}${this.lineChangeStr[bit]}`
                      } else if (+(bit + 1).toString()[1] === 0) {
                        x.name = `${this.lineChangeStr[ten]}${this.lineChangeStr[9]}`
                      } else {
                        x.name = `${this.lineChangeStr[ten - 1]}${this.lineChangeStr[bit]}`
                      }
                    }
                  })
                }
              })
              this.depositTypeList = res.data
              this.selectCurType = this.depositTypeList[this.currentDepositType]

              this.depositDataShowInit()
            }
          }
        })
    },
    depositDataShowInit () {
      this.elseInfoList = []
      this.elseInfo = []
      if(this.depositTypeList[this.currentDepositType].ext_info.length>0){
        this.elseInfoList = this.depositTypeList[this.currentDepositType].ext_info
        this.depositTypeList[this.currentDepositType].ext_info.forEach((v, i) => {
          this.elseInfo.push(v.field)
        })
      }
      let line_Data = this.depositTypeList[this.currentDepositType].banks[this.currentDepositTypeLineId];
      this.isShowAccoutName = line_Data.is_show_account_name
      this.depositData.bank_id = line_Data.bank_id
      this.selectBankList = line_Data.banks
      if(this.selectBankList.length>0){
        this.depositData.bank = this.selectBankList[this.currentDepositBankIndex].value.split('#')[0]
        this.currentDepositBankId = this.selectBankList[this.currentDepositBankIndex].value
        this.depositMin =  this.currentDepositBankId.split('#')[1].split('-')[0]
        this.depositMax = this.currentDepositBankId.split('#')[1].split('-')[1]
      }else{
        this.depositData.bank = ''
        this.depositMin = parseInt(line_Data.deposit_min)
        this.depositMax = parseInt(line_Data.deposit_max)
      }
    },
    bankSelect (val) {
      if(!val){
        return
      }
      if(val.value){
        this.depositData.bank = val.value.split('#')[0]
        this.depositMin = parseInt(val.value.split('#')[1].split('-')[0])
        this.depositMax = parseInt(val.value.split('#')[1].split('-')[1])
      }
    },
    handleApplyDeposit () {
      this.depositType = ''
      this.applyDepositDialogInfo = {
        bank_logo: '',
        acount_bank: '',
        acount: '',
        name: '',
        acount_bank_info:'',
        money: '',
        orderId: '',
        account_diff: ''
      }
      if(this.depositData.amount.length === 0){
        this.$message({
          message: this.$t("Top_up_amount_cant_be_empty"),
          type: 'warning'
        })
        return false
      }
      if(parseFloat(this.depositData.amount) > parseFloat(this.depositMax)){
        this.$message({
          message: this.$t("Beyond_the_single_top_up_limits"),
          type: 'warning'
        })
        return false
      }
      if(parseFloat(this.depositData.amount) < parseFloat(this.depositMin)){
        this.$message({
          message: this.$t("Lower_than_that_of_single"),
          type: 'warning'
        })
        return false
      }
      let data = {
        bank_id: this.depositData.bank_id,
        amount: this.depositData.amount,
        bank: this.depositData.bank
      }

      this.confirmInfo = {}
      if(this.elseInfo.length>0){
        for (let i = 0; i<this.elseInfo.length; i++) {
          if( !(this.isShowAccoutName==0&&this.elseInfo[i]=='account_name')) {
            if(this.elseInfoList[this.elseInfo[i]]){
              data[this.elseInfo[i]] = this.elseInfoList[this.elseInfo[i]]
              this.confirmInfo.name = this.elseInfoList[0].name
              this.confirmInfo.account_name = this.elseInfoList[this.elseInfo[i]]
            }else{
              this.$message({
                message: this.elseInfoList[i].desc,
                type: 'warning'
              })
              return false
            }
          }
        }
      }
      this.btnLoadFlag = true
      this.$http(this.ApiSetting.user.applyDeposit, data)
        .then((res) => {
          this.btnLoadFlag = false
          if(res.status === 1){
            this.depositType = res.data.type
            if(res.data.type === 'html'){
             // this.applyDepositDialogInfo = res.data
              this.applyDepositDialogInfo = {
                bank_logo: res.data.account.logo,
                acount_bank: res.data.account.acount_bank,
                acount: res.data.account.acount,
                name: res.data.account.name,
                acount_bank_info: res.data.account.acount_bank_info,
                money: res.data.money,
                orderId: res.data.orderId,
                account_diff: res.data.account_diff
              }
                this.applyDepositDialog.visible = true
            }
            if(res.data.type === 'qrcode'){
              this.applyDepositQRDialog.imgUrl = res.data.url
              this.applyDepositQRDialog.visible = true
            }
            if(res.data.type === 'form'){
              this.depositForm.url = res.data.url
              this.depositForm.params = res.data.params
              this.jumpConfirmDialog.visible = true
            }
            if(res.data.ext_tips) {
              this.toTransferDes = res.data.ext_tips;
              this.isShowExtTips = true
            }else {
              this.isShowExtTips = false
              if(res.data.deposit_type !== 5) {
                this.toTransferStrong = this.$t("chage_tip_1",{min:parseFloat(res.data.account.deposit_min).toFixed(2)})
              }else {//支付宝转银行卡
                this.toTransferStrong = this.$t("chage_tip_11")
              }
              this.toTransferDes = this.$t("The_platform_of_large",{type:res.data.account.desposit_type_tip || "",showOverTime:res.data.account.show_over_time || "15"})
              if(res.data.deposit_type == 4) {
               this.toTransferDes += this.$t("chage_tip_6")
              }
            }
          }
          // 连续3次由于线路问题使用非USDT的方式充值不成功
          if (res.error_code === 37020) {
            this.$confirm(
              '充值遇到了困难？别急，试试虚拟币充值吧！',
              this.$t("prompt"),
              {
                confirmButtonText: '虚拟币充值',
                cancelButtonText: '查看充值说明',
                type: 'warning',
                center: true,
                customClass: 'three-time-error',
                closeOnPressEscape: false,
                distinguishCancelAndClose: true
              })
              .then(() => {
                const lineRow = this.findVirtualLineId()
                if (lineRow) {
                  this.currentDepositType = lineRow.id
                  this.depositTypeChange()
                }
              })
              .catch(e => {
                if (e === 'cancel') window.open('/guide/16-1')
              });
          }
      }, (err) => {
          this.btnLoadFlag = false
        })
    },
    // 查找虚拟币充值方式
    findVirtualLineId() {
      return this.depositTypeList.find(item => item.type_name.includes('虚拟币')) || null
    },
    handleJumpConfirm () {
      this.jumpConfirmDialog.visible = false
    },
    loadDepositRecordsList () {
      this.listLoad = true
      this.$http(this.ApiSetting.user.getDepositIndexRecords)
        .then((res) => {
          if(res.status === 1){
            if(res.data.length > 0){
              this.depositRecordsList = res.data
            }
          }
          this.listLoad = false
        }, (err) => {
          this.listLoad = false
        })
    }
  }
}
</script>
<style scoped>


.deposit_type_wrapper .deposit_type_line{
  margin-left: 20px;
  display: none;
}
.deposit_type_wrapper .recommend_tips {
  display: inline-block;
  font-size: 12px;
  color: #07f1b7;
}
.deposit_type_wrapper .ivu-radio-wrapper-checked~.deposit_type_line{
  display: inline-block;
}
.deposit_type_line .line{
  display: inline-block;
  width: 56px;
  height: 18px;
  line-height: 16px;
  box-sizing: border-box;
  border: 1px solid #7c839f;
  border-radius: 20px;
  margin: 0 10px;
  text-align: center;
  font-size: 12px;
  cursor: pointer;
}
.deposit_type_line .line.actived{
  color: #07f1b7;
  border-color: #07f1b7;
}
.finance_form_box.deposit_type{
  line-height: 50px;
}
.finance_form_box.deposit_type .box_right {
  min-width: 650px;
}
.deposit_type_wrapper{
  line-height: 50px;
}
.ts_msg{
  line-height: 22px;
  font-size: 12px;
  color:#e34d12;
}
.deposit_type_icon{
  display: inline-block;
  height: 30px;
  width: 50px;
  text-align: center;
  vertical-align: middle;
  margin-right: 5px;
  position: relative;
}
.deposit_type_icon img{
  height: 100%;
  max-width: 100%;
  vertical-align: top;
}
.deposit_type_icon .hot {
  display: inline-block;
  position: absolute;
  width: 34px;
  height: 12px;
  right: -30px;
  top: -12px;
  background: url("../../../assets/icon_es.png") no-repeat;
  background-position: -1555px -144px;
}
.deposit_record{
  border-top: 1px solid #17191f;
}
.bank_select .box_right{
  min-width: auto;
  width: 228px;
}
.applay_deposit_wrapper{
  padding: 0px 0 30px 110px;
}
.applay_deposit_wrapper .d_btn {
  width: 230px;
  margin-right: 20px;
}
.applay_deposit_wrapper a {
  font-size:14px;
}
.applay_deposit_wrapper .apply_tips{
  margin-top: 50px;
  color: #e34d12;
  line-height: 22px;
}
.applay_deposit_wrapper .btn,.apply_deposit_qr_dialog .btn{
  margin-top: 20px;
}
.apply_deposit_qr_dialog  .dialog_form_box{
  padding: 15px 0;
}
.apply_deposit_qr_dialog .qr_code_wrapper .qr_code_img{
  width: 184px;
  height: 184px;
  margin: 0 auto;
  text-align: center;
}
.apply_deposit_qr_dialog .qr_code_wrapper img{
  width: 100%;
  height: 100%;
}
.apply_deposit_qr_dialog .qr_tips{
  text-align: center;
  margin-top: 20px;
}

.jump_confirm_dialog .btn .d_btn.normal{
  border: none;
  cursor: pointer;
}
.apply_deposit_dialog.el-dialog .dialog_form_box{
  padding-top: 30px;
}
.apply_deposit_dialog.el-dialog  .dialog_form_box .input_wrapper{
  width: 520px;
}
.apply_deposit_dialog.el-dialog .dialog_form_box .left{
  width: 140px;
}
.apply_deposit_dialog.el-dialog .dialog_form_box .right{
  width: 350px;
}
.apply_deposit_dialog.el-dialog .dialog_form_box .bank .right{
  font-size: 22px;
}
.apply_deposit_dialog.el-dialog .dialog_form_box .bank .right .bank_icon{
  display: inline-block;
  width: 28px;
  height: 28px;
  text-align: center;
  vertical-align: middle;
  margin-right: 10px;
}
.apply_deposit_dialog.el-dialog .dialog_form_box .bank .right .bank_icon img{
  width: 100%;
  height: 100%;
  border-radius: 50%;
  vertical-align: top;
}
.apply_deposit_dialog.el-dialog .dialog_form_box .accout_tips {
  color: #cf3126;
  position: relative;
  font-size: 14px;
  height: 30px;
  padding: 0 10px;
  line-height: 30px;
  border: 1px solid #cf3126;
  background-color: #17191e;
}
.apply_deposit_dialog.el-dialog .dialog_form_box .accout_tips:before{
  content: '';
  position: absolute;
  top: -17px;
  left: 20px;
  display: block;
  width: 0;
  height: 0;
  border-top: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid #cf3126;
  border-left: 8px solid transparent;
}
.apply_deposit_dialog.el-dialog .dialog_form_box .accout_tips:after{
  content: '';
  position: absolute;
  display: block;
  top: -15px;
  left: 20px;
  width: 0;
  height: 0;
  border-top: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid #17191e;
  border-left: 8px solid transparent;
}
.apply_deposit_dialog.el-dialog .dialog_form_box .accout_tips i{
  display: inline-block;
  vertical-align: middle;
  width: 16px;
  height: 16px;
  line-height: 16px;
  text-align: center;
  border-radius: 50%;
  border: 1px solid #cf3126;
  margin-right: 10px;
}
.apply_deposit_dialog.el-dialog  .confirm_deposit_tips{
  width: 520px;
  margin: 20px auto 0;
  line-height: 22px;
  color: #7c839f;
}
.apply_deposit_dialog.el-dialog  .warning{
  color: #cf3126;
}
.confirm-info li{
  display: flex;
  justify-content: center;
  margin-top: 13px;
}
.confirm-info li h6 {
  width: 50%;
  text-align: right;
  margin-right: 20px;
  font-size: 14px;
  font-weight: normal;
  line-height: 18px;
  color: #7c839f;
}
.confirm-info li p {
  width: 50%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 18px;
  line-height: 18px;
  color: #fff;
}
.confirm-desc {
  margin: 30px 65px 0 70px;
  font-size: 12px;
  line-height: 24px;
  color: #7c839f;
}
.confirm-desc li {
  list-style: decimal;
}
.confirm-desc li span {
  color: #e34d12;
}
</style>
<style>
  .deposit_bank_select{
    position: relative;
    margin-top: 3px;
  }
  .deposit_bank_select.ivu-select-single .ivu-select-selection{
    border: 1px solid #7c839f;
  }
  .deposit_bank_select.ivu-select-single .ivu-select-selection .ivu-select-placeholder, .deposit_bank_select.ivu-select-single .ivu-select-selection .ivu-select-selected-value{
    font-size: 14px;
    color: #07f1b7;
  }

  .deposit_bank_select.ivu-select-single .ivu-select-dropdown{
    width: 408px !important;
    left: 0 !important;
    padding: 15px;
    max-height: 230px;
  }
  .deposit_bank_select.ivu-select-single .ivu-select-dropdown .ivu-select-dropdown-list{

  }
  .deposit_bank_select.ivu-select-single .ivu-select-dropdown .ivu-select-dropdown-list .ivu-select-item{
    float: left;
    padding: 0;
    white-space:normal;
    color: #fff;
    clear: none;
  }
  .deposit_bank_select.ivu-select-single .bank_box{
    width: 112px;
    height: 48px;
    border-radius: 3px;
    background-color: #484d60;
    background: url("../../../assets/icon_es.png") no-repeat;
    background-position: -884px -848px;
    line-height: 48px;
    margin: 5px;
    padding: 0 10px;
    box-sizing: border-box;
    font-size: 14px;
    border: 1px solid transparent;
  }
  .deposit_bank_select.ivu-select-single .bank_box .bank_logo{
    display: inline-block;
    width: 24px;
    height: 24px;
    vertical-align: middle;
    line-height: normal;
    margin-right: 10px;
  }
  .deposit_bank_select.ivu-select-single .bank_box .bank_name{
    display: inline-block;
    max-width: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
  }
  .deposit_bank_select.ivu-select-single .bank_box .bank_logo img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .deposit_bank_select.ivu-select-single .ivu-select-dropdown .ivu-select-dropdown-list .ivu-select-item:hover{
    color: #07f1b7;
  }
  .deposit_bank_select.ivu-select-single .ivu-select-dropdown  .ivu-select-dropdown-list .ivu-select-item-selected, .deposit_bank_select.ivu-select-single .ivu-select-dropdown-list .ivu-select-item-selected:hover{
    background-color: transparent;
    color: #07f1b7;
  }
  .deposit_bank_select.ivu-select-single .ivu-select-dropdown .ivu-select-dropdown-list .ivu-select-item:hover .bank_box{
    border-color: #07f1b7;
  }
  .deposit_bank_select.ivu-select-single .ivu-select-dropdown  .ivu-select-dropdown-list .ivu-select-item-selected .bank_box, .deposit_bank_select.ivu-select-single .ivu-select-dropdown-list .ivu-select-item-selected:hover .bank_box{
    border-color: #07f1b7;
  }

</style>
<style lang="less">
.three-time-error {
  .el-message-box__btns {
    .el-button {
      width: 120px;
      &.el-button--primary {
        background: transparent;
        border: 1px solid #07e9f1;
      }
    }
  }
}
</style>
