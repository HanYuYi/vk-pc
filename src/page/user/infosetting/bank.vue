<template>
  <div class="infoset_bank">
    <section>
      <!--锁定银行卡-->
      <div class="lock_bank_card btn" v-if="userInfo.have_bank===1">
        <el-popover trigger="hover" placement="top"  v-if="bankCardInfo.locked"
        content="如需解锁 请联系客服人员">
          <div slot="reference" class="d_btn disabled" 
          v-if="bankCardInfo.locked">
          {{$t("Bank_card_has_been_locked")}}</div>
        </el-popover>
        <div v-else class="lock_btn"  @click="showLockBankCardDialog">
          <span class="btn_loading" v-if="lockBankLoad"></span>
          <span v-else>{{$t("Lock_card")}}</span>
        </div>
      </div>
      <!--银行卡-->
      <div class="card_info">
        <div class="bank_card" 
        v-for="item in bankCardInfo.bankList" :key="item.id" 
        :class="{'default':item.is_default}"
          :style="{background: 'linear-gradient(135deg,' + item.bank_color[0] + ',' + item.bank_color[1]+')'}" >
            <div class="detault_mask" v-show="item.is_default">默认</div>
            <div class="setdefault" @click="tohandleToDefault(item)">设为默认账户</div>
            <div class="bank_card_info">
              <img class="bank_icon" :src="item.logo" alt="">
              <span class="bank_name">{{item.bank_name}}</span>
            </div>
            <div class="bank_account">
              {{item.show_account | formatBankAcount}}
            </div>
            <img class="svg_wrapper" :src="item.svg" alt="">
        </div>
        <!--添加银行卡-->
        <div class="add_card" 
        @click="showAddBankCardDialog" 
        v-if="bankCardInfo.showAddCardFlag">
            <img src="../../../assets/icon-add.png" alt="">
            <span>{{$t("Add_a_bank_card")}}</span>
        </div>
      </div>
      <div class="bind_card_tips">
        <p>{{$t("Binding_of_bank_CARDS_that")}}</p>
        <p>1、一个账户最多只能绑定{{bankCardInfo.bankLimit}}张银行卡。</p>
        <!-- <p>{{$t("an_account_binding_can")}}</p> -->
        <p>{{$t("a_bank_card_account")}}</p>
        <p>{{$t("recommend_the_user_lock")}}</p>
        <p>{{$t("now_temporarily_does_not")}}</p>
      </div>
    </section>
    <!--设为默认收款账户  确认弹窗-->
    <el-dialog
    :append-to-body="true"
    :visible.sync="confirmDefaultShow"
    custom-class="confirm_detault_dialog smallw_dialog">
      <div class="dialog_title" slot="title">设为默认收款账户</div>
      <div class="dialog_wrapper">
        <p>
          将此账户设定为默认收款账户后，每次提现时将默认选中该账户，如在提款时需要临时更换其他账户作为收款账户，您可在提现界面手动更换。
        </p>
        <div class="btn">
          <div class="el-button el-button--big fl" @click="confirmDefaultShow=false">取消</div>
          <div class="d_btn normal fl" @click="handleToDefault">确认</div>
        </div>
      </div>
    </el-dialog>
    <!--添加银行卡弹窗-->
    <el-dialog
    :append-to-body="true"
      :visible.sync="addBankCardDialog.visible"
      custom-class="add_bank_card_dialog"
      :close-on-click-modal="addBankCardDialogCloseModal"
      @close="handleAddBankDialogColse()">
      <div class="dialog_title" slot="title">
        {{userInfo.have_bank===1&&!addBankCardDialog.check?'验证户主身份':addBankCardDialog.currentStep==2?'确认账户':$t("Add_a_bank_card")}}
      </div>
      <div class="dialog_wrapper">
        <div class="dialog_tips">
          <p  v-if="userInfo.have_bank===1&&!addBankCardDialog.check">
            为了保障您的账号安全，请输入<span class="yeco">最近一次绑定的银行卡信息，</span>进行身份验证。
          </p>
        </div>
       
        <div class="add_card_step_first input_wrapper" v-show="addBankCardDialog.currentStep === 1">
            <!--身份信息验证-->
            <div v-if="userInfo.have_bank===1&&!addBankCardDialog.check">
              <div class="input_box">
                <span class="title_text">{{$t("Bank_card_number")}}</span>
                <Input clearable  type="text" :maxlength="30" class="box_right" v-model.trim="addBankCheckData.account" />
                <div class="input_box_tip">{{$t("Please_input_the_latest_binding")}}</div>
              </div>
              <div class="input_box">
                <label class="title_text">{{$t("Account_holders_name")}}</label>
                <Input  clearable type="text" class="box_right" v-model="addBankCheckData.account_name" />
                <p class="input_box_tip">{{$t("Please_enter_the_last_binding")}}</p>
              </div>
              <div class="btn">
                <span class="btn_loading dialog" v-if="confirmCheckBankLoad"></span>
                <a href="javascript:;" class="d_btn normal" 
                @click="toAddBankFirstStep" v-else>{{$t("save")}}</a>
              </div>
            </div>
            <!--绑定银行卡填写-->
            <div class="first_bind_card" v-if="userInfo.have_bank===0||addBankCardDialog.check">
              <div class="input_box">
                <span class="title_text">{{$t("Bank_card_number")}}</span>
                <Input clearable type="text" :maxlength="30" class="box_right" v-model="addBankCardDialog.account" />
                <p class="input_box_tip">请输入银行卡号</p>
              </div>
              <div class="input_box ">
                <span class="title_text">{{$t("confirm_Bank_card_number")}}</span>
                <Input clearable type="text" class="box_right" :maxlength="30"
                onpaste="return false" oncontextmenu="return false" 
                oncopy="return false" oncut="return false"
                 v-model="addBankCardDialog.reuseraccount" />
                 <p class="input_box_tip ">请输入银行卡号，仅支持手动输入</p>
              </div>
              <div class="input_box bank_name_select ">
                <span class="title_text">{{$t("Bank_of_deposit")}}</span>
                  <i-select class="box_right"
                  v-model="addBankCardDialog.bankCurrentId" 
                  :placeholder="$t('Please_select_a_opening_bank')" 
                  label-in-value  @on-change="bankSelect">
                    <i-option v-for="item in selectBankList" :value="item.bank_id" 
                    :key="item.bank_id" :label="item.bank_name">
                    </i-option>
                  </i-select>
              </div>
              <div class="input_box ">
                <span class="title_text">{{$t("Bank_area")}}</span>
                <div class="box_right">
                  <Cascader :data="areaList" 
                  v-model="addBankCardDialog.addBankArea" 
                  :placeholder="$t('Please_select_a_bank_provinces')" 
                  @on-change="selectArea"></Cascader>
                </div>
              </div>
              <div class="input_box">
                <span class="title_text">{{$t("Account_holders_name")}}</span>
                <Input clearable type="text" class="box_right" 
                v-model="addBankCardDialog.account_name" />
                 <p class="input_box_tip ">请输入开户人真实姓名</p>
              </div>
              
              <div class="btn">
                <a href="javascript:;" class="d_btn normal" 
                @click="toAddBankCardConfirm">{{$t("save")}}</a>
              </div>
            </div>
        </div>
        <!--信息确认-->
        <div class="confirm_step" 
        v-show="addBankCardDialog.currentStep === 2">
         <p class="dialog_tips">*为了保障您的账号安全，添加成功的银行卡账户不可自行移除或修改，请您校对您的账户信息。</p>
          <div class="input_wrapper">
            <div class="confirm_box">
              <div class="left">{{$t("Bank_card_number")}}</div>
              <div class="right">
                {{addBankCardDialog.account}}
                <p class="littletip">请注意核对：【开头4位数】……【末尾4位数】</p>
              </div>
            </div>
            <div class="confirm_box">
              <div class="left">{{$t("Bank_of_deposit")}}</div>
              <div class="right">{{addBankCardDialog.bankName}}</div>
            </div>
            <div class="confirm_box">
              <div class="left">{{$t("Bank_area")}}</div>
              <div class="right">{{addBankCardDialog.areaName}}</div>
            </div>
            <div class="confirm_box">
              <div class="left">{{$t("Account_holders_name")}}</div>
              <div class="right">{{addBankCardDialog.account_name}}</div>
            </div>
           
          </div>
          <div class="btn">
            <a href="javascript:;" class="el-button el-button--primary big" 
            @click="toAddBankCardForm">返回修改</a>
            <a href="javascript:;" class="d_btn normal" 
            @click="handleAddBankCard">
              <span class="small_loading" v-show="confirmAddBankLoad"></span>
              <span v-show="!confirmAddBankLoad">{{$t("confirm")}}</span>
            </a>
          </div>
        </div>
      </div>
    </el-dialog>
    <!--锁定银行卡确认弹框-->
    <el-dialog
    :append-to-body="true"
      :visible.sync="lockBankCardDialog.visible"
      :custom-class="lockBankCardDialog.class">
      <div class="dialog_title" slot="title">{{$t("Lock_card")}}</div>
      <div class="dialog_wrapper">
        <div class="qa_box_wrapper">
          <div class="qa_box clearfix question">
            <div class="qa_title">Q:</div>
            <div class="box_right">{{$t("Why_lock_card")}}</div>
          </div>
          <div class="qa_box clearfix answer">
            <div class="qa_title">A:</div>
            <div class="box_right">{{$t("Lock_your_account_after_the")}}</div>
          </div>
          <div class="qa_box clearfix question">
            <div class="qa_title">Q:</div>
            <div class="box_right">{{$t("How_do_I_unlock")}}</div>
          </div>
          <div class="qa_box clearfix answer">
            <div class="qa_title">A:</div>
            <div class="box_right">{{$t("Locked_card_do_not_affect")}}</div>
          </div>
        </div>
        <div class="btn"><a href="javascript:;" class="d_btn normal" 
        @click="hanldeLockBankCard">{{$t("Confirm_the_lock")}}</a></div>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
export default {
  name:'bankset',
  filters: {
    formatBankAcount (str) {
      let strtem = str.substring(0,str.length-3)
      let strtem1 = str.substr(-3,3)
      return strtem.replace(/(.{4})/g,'$1 ') + " "+strtem1
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  mounted () {
    this.loadUserBankList ()
    if(this.areaList.length === 0){
      this.loadBankAreaList ()
    }
  },
  data() {
    return {
      toolTipDisabled: false,
      lockBankLoad: false,
      confirmCheckBankLoad: false,
      confirmAddBankLoad: false,
      selectBankList: [],
      areaList: [],
      bankCardInfo:{
        showAddCardFlag: false,
        locked: false,
        bankList: []
      },
      defalutBankTipsBoxFlag: true,
      userDefaultBank:[],
      addBankCheckData: {
        account: '',
        account_name: ''
      },
      addBankCardDialogCloseModal: false,
      addBankCardDialog: {
        visible: false,
        currentStep: 1,
        bankCurrentId: '',
        account:'',
        reuseraccount:'',
        account_name:'',
        check:'',
        areaName: '',
        bankName: '',
        addBankArea:[]
      },
      lockBankCardDialog: {
        visible: false,
        class: 'lock_bank_card_dialog'
      },
      confirmDefaultShow:false,
      todefaultItem:{}
    }
  },
  methods: {
    showAddBankCardDialog () {
      this.addBankCardDialog = {
        visible: true,
        currentStep: 1,
        bankCurrentId: '',
        account:'',
        reuseraccount:'',
        account_name:'',
        check:'',
        areaName: '',
        bankName: '',
        addBankArea:[]
      }
      this.addBankCheckData = {
        account: '',
        account_name: ''
      }
      this.confirmCheckBankLoad = false
      this.confirmAddBankLoad = false
    },
    toAddBankFirstStep () {
      if(this.addBankCheckData.account.length === 0){
        this.$message({
          message: this.$t("Bank_account_cant_be_empty"),
          type: 'warning'
        })
        return false
      }
      if(this.addBankCheckData.account_name.length === 0){
        this.$message({
          message: this.$t("Account_holders_name_cannot_be"),
          type: 'warning'
        })
        return false
      }

      let data = {
        account: this.addBankCheckData.account,
        account_name: this.addBankCheckData.account_name
      }
      this.confirmCheckBankLoad = true
      this.$http(this.ApiSetting.user.checkUserBank, data)
        .then((res) => {
          if(res.status === 1){
            this.addBankCardDialog.check = res.data.check
          }
          this.confirmCheckBankLoad = false
        }, (err) => {
          this.confirmCheckBankLoad = false
        })
    },
    //银行卡绑定表单输入验证
    toAddBankCardConfirm () {
      if(this.addBankCardDialog.account.length <13 || this.addBankCardDialog.account.length>30){
        this.$message({
          message: '请输入13-30位银行卡号',
          type: 'warning'
        })
        return false
      }
      if(this.addBankCardDialog.reuseraccount.length == 0){
        this.$message({
          message: this.$t("please_fill_out_the_confirmation"),
          type: 'warning'
        })
        return false
      }
      if(this.addBankCardDialog.reuseraccount  !== this.addBankCardDialog.account){
        this.$message({
          message: this.$t("two_card_input"),
          type: 'warning'
        })
        return false
      }
      if(!this.addBankCardDialog.bankCurrentId){
        this.$message({
          message: this.$t('Please_select_a_opening_bank'),
          type: 'warning'
        })
        return false
      }
      if(this.addBankCardDialog.addBankArea.length === 0){
        this.$message({
          message: this.$t("Please_select_account_area"),
          type: 'warning'
        })
        return false
      }
      
     if(this.addBankCardDialog.account_name.length==0){
       this.$message({
         message: '请输入姓名',
         type: 'warning'
       })
       return false
     }
    //  if(!(/^[\u4E00-\u9FA5A-Za-z]+$/i.test(this.addBankCardDialog.account_name))){
    //    this.$message({
    //      message: '只能输入中英文',
    //      type: 'warning'
    //    })
    //    return false
    //  }
     
      this.addBankCardDialog.currentStep = 2
    },
    //显示  锁定银行卡确认弹框
    showLockBankCardDialog () {
      if(!this.lockBankLoad) {
        this.lockBankCardDialog.visible = true
        this.lockBankLoad = false
      }
    },
    //加载银行卡列表
    loadUserBankList () {
      this.$http(this.ApiSetting.user.getUserBankList)
        .then((res) => {
          if(res.status === 1){
            this.bankCardInfo.bankList = res.data.banks
            this.bankCardInfo.bankLimit = res.data.bankLimit
            this.bankCardInfo.count = res.data.count
            this.bankCardInfo.showAddCardFlag = true
            if(res.data.bank_lock == 1){
              this.bankCardInfo.locked = true
              this.bankCardInfo.showAddCardFlag = false
            }else{
              this.bankCardInfo.locked = false
            }
            if(res.data.count >= res.data.bankLimit){
              this.bankCardInfo.showAddCardFlag = false
            }
          }
        })
    },
    loadBankAreaList () {
      this.$http(this.ApiSetting.user.getBankUserList)
        .then((res) => {
          if(res.status === 1){
            this.selectBankList = res.data.bankInfo
            let proviceDict = new Array()
            let cityDict = {};
            res.data.areaInfos.forEach(function (v,i,array) {
              v.value = v.id
              v.label = v.name
              if (v.parent_id == 0) {
                proviceDict.push(v);
              }
              else {
                if (typeof cityDict[v.parent_id] === 'undefined') {
                  cityDict[v.parent_id] = new Array();
                }
                cityDict[v.parent_id].push(v);
              }
            })
            proviceDict.forEach(function (v,i) {
              v.children = cityDict[v.id]
            })
            this.areaList = proviceDict
          }
        })
    },
    toAddBankCardForm () {
      this.addBankCardDialog.currentStep = 1
    },
    handleAddBankCard () {
      let data = {
        account: this.addBankCardDialog.account,
        account_name: this.addBankCardDialog.account_name,
        bank_id: this.addBankCardDialog.bankCurrentId,
        province: this.addBankCardDialog.addBankArea[0],
        city: this.addBankCardDialog.addBankArea[1],
        check: this.addBankCardDialog.check
      }
      this.confirmAddBankLoad = true
      this.$http(this.ApiSetting.user.addUserBankCard, data)
        .then((res) => {
          if(res.status === 1){
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.loadUserBankList ()
            this.userInfo.have_bank = 1
            this.addBankCardDialog = {
              visible: false,
              currentStep: 1,
              bankCurrentId: '',
              account: '',
              reuseraccount:'',
              account_name: '',
              check: '',
              areaName: '',
              bankName: '',
              addBankArea:[]
           }
          }
          this.confirmAddBankLoad = false
        }, (err) => {
          this.confirmAddBankLoad = false
        })
    },
    bankSelect (val) {
      if(!val){
        return
      }
      this.addBankCardDialog.bankName = val.label
    },
    selectArea (value, selected) {
      let str = ""
      selected.forEach((v, i) => {
        str +=  (v.name + ' ')
      })
      if(selected.length) {
        this.addBankCardDialog.areaName = selected[1].__label
      }else {
        this.addBankCardDialog.areaName = str
      }
    },
    //确认锁定银行卡
    hanldeLockBankCard () {
      this.lockBankLoad = true
      this.$http(this.ApiSetting.user.lockBankCard)
        .then((res) => {
          if(res.status === 1){
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.bankCardInfo.showAddCardFlag = false
            this.lockBankCardDialog.visible = false
            this.bankCardInfo.locked = true
          }
          this.lockBankLoad = false
        }, (err) => {
          this.lockBankLoad = false
        })
    },
    handleAddBankDialogColse () {
      this.addBankCardDialog = {
        visible: false,
        currentStep: 1,
        bankCurrentId: '',
        account:'',
        account_name:'',
        check:'',
        areaName: '',
        bankName: '',
        addBankArea:[]
      }
    },
    //显示 设为默认收款账户  确认弹窗
    tohandleToDefault(item) {
      if(!item.is_default) {
        this.todefaultItem = item
        this.confirmDefaultShow = true
      }
    },
    //设为默认收款账户  确认
    handleToDefault () {
      if(this.todefaultItem.is_default) {
        return
      }
      let data = {
        bank_id: this.todefaultItem.id,
        type: 'set'
      }
      this.$http(this.ApiSetting.user.setDefaultBank, data)
      .then((res) => {
        if(res.status === 1){
          this.confirmDefaultShow = false
          this.loadUserBankList ()   
          this.$message({
            message: res.message,
            type: 'success'
          })
        } 
      })
    },
    checkDefaultMove (evt) {
      return false
    },
    getAreaCode () {
      this.$http(this.ApiSetting.index.getCountryPrefix).then((res) => {
        if(res.status === 1){
          if(res.data.length > 0){
            this.areaCodeList = res.data
          }
        }
      })
    }
  }
}
</script>

<style>
.bank_name_select{
  position: relative;
}
  .bank_name_select .ivu-select-dropdown{
     position:absolute;
     right: 0px ;
      height: 268px ;
  }
</style>
