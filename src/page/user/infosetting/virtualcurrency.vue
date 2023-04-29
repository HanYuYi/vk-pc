<template>
  <div class="infoset_bank virtualcurrency">
    <section>
      <!--锁定虚拟币-->
      <div class="lock_bank_card btn" v-if="vbCardInfo.count">
        <el-popover trigger="hover" placement="top"  v-if="vbCardInfo.locked"
        content="如需解锁 请联系客服人员">
          <div slot="reference" class="d_btn disabled" 
          v-if="vbCardInfo.locked">
          虚拟币账户已锁定</div>
        </el-popover>
        <div v-else class="lock_btn"  @click="showLockBankCardDialog">
          <span class="btn_loading" v-if="lockBankLoad"></span>
          <span v-else>锁定虚拟币账户</span>
        </div>
      </div>
      <!--虚拟币-->
      <div class="card_info">
        <div class="bank_card" 
        v-for="item in vbCardInfo.banks" :key="item.id" 
        :class="{'default':item.is_default}"
          :style="{background: 'linear-gradient(135deg,' + item.bank_color[0] + ',' + item.bank_color[1]+')'}" >
            <div class="detault_mask" v-show="item.is_default">默认</div>
            <div class="setdefault" @click="tohandleToDefault(item)">设为默认账户</div>
            <div class="bank_card_info">
              <img class="bank_icon" :src="item.logo" alt="">
              <span class="bank_name">{{item.bank_name}}</span>
            </div>
            <div class="vb_account">{{item.bank_url}}</div>
        </div>
        <!--添加虚拟币-->
        <div class="add_card" 
        @click="showAddBankCardDialog" 
        v-if="vbCardInfo.showAddCardFlag">
            <img src="../../../assets/icon-add.png" alt="">
            <span>添加虚拟币账户</span>
        </div>
      </div>
      <div class="bind_card_tips">
        <p>绑定虚拟币说明：</p>
        <p>1、一个账号最多只能绑定{{vbCardInfo.bankLimit}}个虚拟币账户。</p>
        <p>2、推荐锁定虚拟币，这样即使账号丢失，账号内的余额只能操作于您已绑定的虚拟币。</p>
        <p>3、如需解锁虚拟币，请联系客服。</p>
      </div>
    </section>
    <!--银行卡未绑定时的提示框-->
    <el-dialog
    :append-to-body="true"
    :visible.sync="noBankBindShow"
    custom-class="confirm_detault_dialog no_bank_bind">
      <div class="dialog_title" slot="title">虚拟币账户绑定提示</div>
      <div class="dialog_wrapper">
        <p>
          在银行卡管理中至少绑定一张银行卡账户后，才能绑定虚拟币账户。
        </p>
        <div class="btn">
          <div class="el-button" @click="noBankBind">进入银行卡管理</div>
        </div>
      </div>
    </el-dialog>
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
    <!--添加虚拟币弹窗-->
    <el-dialog
    :append-to-body="true"
      :visible.sync="addDialog.visible"
      custom-class="add_bank_card_dialog"
      :close-on-click-modal="addBankCardDialogCloseModal"
      @close="handleAddBankDialogColse()">
      <div class="dialog_title" slot="title">
        {{addDialog.currentStep==1?'添加虚拟币账户':'确认账户'}}
      </div>
      <div class="dialog_wrapper">
       <!--添加虚拟币 弹窗-->
        <div class="add_card_step_first input_wrapper" v-show="addDialog.currentStep === 1">
          <div class="input_box">
            <span class="title_text">{{$t("Mobile_phone_no")}}</span>
            <Input clearable  type="text" :maxlength="20" class="box_right" v-model.trim="addDialog.phone" />
            <div class="input_box_tip">请输入注册的手机号码</div>
          </div>
          <div class="input_box">
            <span class="title_text">{{$t("Verification_code")}}</span>
            <div class="send_ver_code ivu-input box_right">
              <input type="text"  
              maxlength="10"
              v-model.trim="addDialog.vercode">
              <div  class="sent_btn" :class="{'disabled':countDownTime}"
                @click="sendVerCode">
                <span v-show="!countDownTime">发送验证码</span>
                <span v-show="countDownTime">
                  <i>{{countDownTime}}</i>{{$t("Seconds_later")}}
                </span>
              </div>
            </div>
             <p class="input_box_tip">请输入收到的短信验证码</p>
          </div>
          <div class="input_box ">
            <span class="title_text">虚拟币币种</span>
              <i-select class="box_right"
              v-model="addDialog.bank_id" 
              placeholder="请选择虚拟币币种" 
              label-in-value  @on-change="bankSelect">
                <i-option v-for="item in vbTypeList" :value="item.bank_id" 
                :key="item.bank_id" :label="item.bank_name">
                </i-option>
              </i-select>
          </div>
          <div class="input_box textareainput">
            <label class="title_text">虚拟币地址</label>
            <textarea  rows="3" maxlength="65" class="box_right ivu-input"  
            onKeyUp="value=value.replace(/[\W]/g,'')"
            v-model="addDialog.bank_url" ></textarea >
            <p class="input_box_tip">请确认虚拟币币种后，输入虚拟币地址</p>
          </div>
          <div class="btn">
            <a href="javascript:;" class="d_btn normal" 
            @click="toConfirmStep">{{$t("save")}}</a>
          </div>
        </div>
        <!--信息确认-->
        <div class="confirm_step" 
        v-show="addDialog.currentStep === 2">
         <p class="dialog_tips">*为了保障您的账号安全，添加成功的虚拟币账户不可自行移除或修改，请您校对您的账户信息。</p>
          <div class="input_wrapper">
            <div class="confirm_box">
              <div class="left">虚拟币币种</div>
              <div class="right">
                {{addDialog.bankName}}
                <p class="littletip">请注意核对：【币种】-【链类型】</p>
              </div>
            </div>
            <div class="confirm_box confirm_box_multrows">
              <div class="left">虚拟币地址</div>
              <div class="right">
                {{addDialog.bank_url}}
                <p class="littletip">请注意核对：【开头4位数】……【末尾4位数】</p>
              </div>
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
    <!--锁定虚拟币确认弹框-->
    <el-dialog
    :append-to-body="true"
      :visible.sync="lockBankDialogShow"
      custom-class="lock_bank_card_dialog">
      <div class="dialog_title" slot="title">锁定虚拟币账户</div>
      <div class="dialog_wrapper">
        <div class="qa_box_wrapper">
          <div class="qa_box clearfix question">
            <div class="qa_title">Q:</div>
            <div class="box_right">为什么锁定虚拟币账户</div>
          </div>
          <div class="qa_box clearfix answer">
            <div class="qa_title">A:</div>
            <div class="box_right"> 
            锁定虚拟币账户后，您的账号将不能解除已添加的虚拟币账户，也不能添加其它新的虚拟币账户，以保障您账号的资金安全。即便账户被他人盗用，您账户的资金也不会被他人提款。锁定之后，也不会影响您的正常提款操作，及任何功能使用。</div>
          </div>
          <div class="qa_box clearfix question">
            <div class="qa_title">Q:</div>
            <div class="box_right">如何解锁</div>
          </div>
          <div class="qa_box clearfix answer">
            <div class="qa_title">A:</div>
            <div class="box_right">如需解锁，请联系在线客服，客服人员将协助您完成解锁。</div>
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
  name:'virtualcurrency',
  filters: {
    formatBankAcount (str) {
      return str.replace(/(.{4})/g,'$1 ')
    }
  },
  mounted () {
    this.getVirtualBankList ()
    this.getVirtualBankType ()
  },
  data() {
    return {
      toolTipDisabled: false,
      lockBankLoad: false,
      confirmAddBankLoad: false,
      vbTypeList: [],
      vbCardInfo:{
        showAddCardFlag: false,
        locked: false,
      },
      defalutBankTipsBoxFlag: true,
      userDefaultBank:[],
      addBankCardDialogCloseModal: false,
      addDialog: {
        visible: false,
        currentStep: 1,
        bank_id: '',
        check:'',
        phone:'',
        vercode:'',
        bank_url:'',
        bankName:''
      },
      lockBankDialogShow:  false,
      confirmDefaultShow:false,
      todefaultItem:{},
      countDownTime: 0,
      timer: null,
      noBankBindShow:false
    }
  },
  methods: {
    //发送验证码
    sendVerCode () {
      if (this.countDownTime) {
        return false
      }else {
        if(this.addDialog.phone.length===0){
          this.$message({
            message: this.$t("Please_fill_the_phone_number"),
            type: 'warning'
          })
          return false
        }
        let data = {
          type: 10,
          phone:this.addDialog.phone,
        }
        this.$http(this.ApiSetting.index.sendPhoneVerCode, data)
          .then((res)=>{
            if(res.status === 1){
              this.addDialog.check = res.data.check || ""
              this.addDialog.vercode = res.data.phone_verify || ""
              this.countDownTime = res.data.seconds || 60
              clearInterval(this.timer)
              this.timer = setInterval(() => {
                this.countDownTime--
                if (this.countDownTime <= 0){
                  clearInterval(this.timer)
                }
                this.$forceUpdate()
              }, 1000)
            }
          }, (err) => {
          })
      }
    },
    //银行卡未绑定提示
    noBankBind () {
      this.noBankBindShow=false
      this.$router.push("/user/infosetting/bank")
    },
    //添加虚拟币清除数据
    showAddBankCardDialog () {
      if(this.vbCardInfo.is_bind_bank) {
        this.addDialog = {
          visible: true,
          currentStep: 1,
          check:'',
          phone:'',
          vercode:'',
          bank_url:'',
          bankName:''
        }
        if(this.vbTypeList.length) {
          this.addDialog.bank_id = this.vbTypeList[0].bank_id
          this.addDialog.bankName = this.vbTypeList[0].bank_name
        }
        this.confirmAddBankLoad = false
      }else {
        this.noBankBindShow = true
      }
      
    },
    //去到显示  确认页面
    toConfirmStep () {
      if(this.addDialog.phone.length<7||this.addDialog.phone.length>11){
        this.$message({
          message: '请输入7-11位手机号码',
          type: 'warning'
        })
        return false
      }
      if(this.addDialog.vercode.length !=6){
        this.$message({
          message: '请查看手机短信，输入6位短信验证码',
          type: 'warning'
        })
        return false
      }
      if(this.addDialog.bank_url.length === 0){
        this.$message({
          message: '请输入虚拟币地址',
          type: 'warning'
        })
        return false
      }
      if(!this.addDialog.bank_id){
        this.$message({
          message: '请选择虚拟币币种',
          type: 'warning'
        })
        return false
      }
      this.addDialog.currentStep = 2
    },
    //显示  锁定虚拟币确认弹框
    showLockBankCardDialog () {
      if(!this.lockBankLoad) {
        this.lockBankDialogShow = true
        this.lockBankLoad = false
      }
    },
    //加载虚拟币列表
    getVirtualBankList () {
      this.$http(this.ApiSetting.user.getVirtualBankList)
        .then((res) => {
          if(res.status === 1){
            this.vbCardInfo = res.data
            this.vbCardInfo.showAddCardFlag = true
            if(res.data.bank_lock == 1){
              this.vbCardInfo.locked = true
              this.vbCardInfo.showAddCardFlag = false
            }else{
              this.vbCardInfo.locked = false
            }
            if(res.data.count >= res.data.bankLimit){
              this.vbCardInfo.showAddCardFlag = false
            }
          }
        })
    },
    //获取币种
    getVirtualBankType () {
      this.$http(this.ApiSetting.user.getVirtualBankType)
        .then((res) => {
          if(res.status === 1&&res.data){
            this.vbTypeList = res.data.bankInfo;
          }
        })
    },
    //返回修改
    toAddBankCardForm () {
      this.addDialog.currentStep = 1
    },
    //确认添加虚拟币账户
    handleAddBankCard () {
      let data = {
        check: this.addDialog.check,
        bank_id: this.addDialog.bank_id,
        bank_url: this.addDialog.bank_url,
        phone_verify: this.addDialog.vercode,
      }
      this.confirmAddBankLoad = true
      this.$http(this.ApiSetting.user.addVirtualBank, data)
        .then((res) => {
          if(res.status === 1){
            this.addDialog.visible = false
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.getVirtualBankList ()
          }
          this.confirmAddBankLoad = false
        }, (err) => {
          this.confirmAddBankLoad = false
        })
    },
    //选择币种
    bankSelect (val) {
      if(!val){
        return
      }
      this.addDialog.bankName = val.label
    },
    //锁定
    hanldeLockBankCard () {
      if(this.lockBankLoad) {
        return 
      }
      this.lockBankLoad = true
      this.$http(this.ApiSetting.user.virtuallockBank)
        .then((res) => {
          if(res.status === 1){
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.vbCardInfo.showAddCardFlag = false
            this.lockBankDialogShow = false
            this.vbCardInfo.locked = true
          }
          this.lockBankLoad = false
        }, (err) => {
          this.lockBankLoad = false
        })
    },
    handleAddBankDialogColse () {
      this.addDialog = {
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
      this.$http(this.ApiSetting.user.setDefaultVirtual, data)
      .then((res) => {
        if(res.status === 1){
          this.confirmDefaultShow = false
          this.getVirtualBankList ()   
          this.$message({
            message: res.message,
            type: 'success'
          })
        } 
      })
    },
  }
}
</script>
<style lang="less" >
  .textareainput {
    textarea {
      height: unset;
      resize: none;
      overflow:hidden;
      line-height: normal;
      padding: 10px;
      min-height:70px;
    }
  }
  .no_bank_bind {
    margin-top: 35vh !important;
    width:740px;
    p {
      margin-top: 30px;
      text-align: center;
    }
    .btn {
      margin-top: 20px;
      margin-bottom: 10px;
    }
    .el-button {
      width:160px;
      border-color: #07f1b7;
      margin-right: 0;
    }
  }
</style>