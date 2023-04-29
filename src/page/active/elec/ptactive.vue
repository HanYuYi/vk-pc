<template>
  <div class="vipgamegold active_page">
    <div class="active_page_wrapper">
      <div class="wrapper">
        <div class="top_bg">
          <div class="bg1"></div>
          <div class="bg2"></div>
        </div>
        <div class="active_page_content">
          <div class="active_section_box">
            <div class="active_title">
              {{$t("The_activity_time")}}
            </div>
            <div class="section_box_wrapper">
              <div class="active_time">
                {{initInfo.start_time}}起
              </div>
            </div>
          </div>
          <div class="active_section_box">
            <div class="active_title">
              {{$t("Active_content")}}
            </div>
            <div class="section_box_wrapper">
              <div class="active_time">
                活动期间新会员首次存款时可申请一次PT电子游戏首存优惠，申请成功的用户可享受单笔存款100%的存款优惠。
                <table>
                  <tr>
                    <td>存款游戏钱包</td>
                    <td>首存金额</td>
                    <td>红利百分比</td>
                    <td>红利上限</td>
                    <td>流水要求</td>
                  </tr>
                  <tr>
                    <td>PT钱包</td>
                    <td>≥{{initInfo.setting_low_money}}</td>
                    <td>{{initInfo.setting_percent}}</td>
                    <td>{{initInfo.setting_max_bonus}}</td>
                    <td>（本金+红利）x 16倍 PT电子游戏</td>
                  </tr>
                </table>
                <div class="btn" v-show="load "><div class="to_apply d_btn normal" @click="toShowDialog"><span class="loading"></span></div></div>
                <div class="btn" v-show="!load&&initInfo.status!=1"><div class="to_apply d_btn normal" @click="toShowDialog">首存转账</div></div>
                <div class="btn" v-show="!load&&initInfo.status==1"><div class="to_apply d_btn disabled">已领取</div></div>
              </div>
            </div>
          </div>
          <div class="active_section_box">
            <div class="active_title">
              {{$t("Activity_rules")}}
            </div>
            <div class="section_box_wrapper">
              <div class="active_desc">
                1.符合条件的会员可在点击本优惠活动页面上<span class="color_07f1b7">“首存转账”</span>按钮后，输入转账金额转账至PT钱包。对应的存款本金+活动奖金在转账成功后将自动添加至用户选择的PT钱包中。<br>
                2.此活动首笔存款定义为：用户注册后的第一笔存款；若用户在申请前将首笔存款从主钱包转出，则不可申请首存优惠。<br>
                3.申请奖金后需在PT电子游戏中完成相对应的流水要求，当用户对应PT钱包余额＜最低投注额且无未结算注单时，系统将自动判定已完成活动规定的有效流水。<br>
                4.此活动不与其它首存活动共享，每个账户仅限申请一次；不可与老用户召回存款活动同一天参与；领取了此项优惠活动的新用户需先完成活动规定的流水后才可申请平台救援金活动。<br>
                5.PT电子游戏首存活动的有效流水不包括以下游戏：<activeptliushui></activeptliushui> 。 <br>
                6.每位有效玩家、每一手机号码、电子邮箱、相同银行卡、每一个IP地址、每一台电脑者只能享受一次优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利。VKGAME对本活动保有最终解释权。
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="btn back_active_nav">
        <router-link to="/active" class="botton normal">{{$t("Return_to_activity_page")}}</router-link>
      </div>
    </div>
    <el-dialog
      :visible.sync="showDialog"
      custom-class="ptactive_dialog"
      width="480px"
      title="转入PT钱包"
      :close-on-click-modal="false">
      <div class="dialog_wrapper ">
        <div class="money_box">
          <span class="qianbao_tit">转账金额</span>
          <span class="fr">需要完成{{watermoney}}元流水</span>
          <div class="money">
            <input type="number"
            @keyup="changeNumber"
            v-model.trim="shoucunmoney"
            v-on:input="depositMoneyChange"
            class="ivu-input"
            :placeholder = 'initInfo.setting_low_money+ "元起"'>
          <p class="error_desc">{{errorDes}}</p>
            <span class="s_m_t">首充金额：<i>{{Math.floor(shoucunmoney)}}</i>元</span>
            <span class="s_m_t fr">可领取红利：<i>{{dialogHongli}}</i>元</span>
          </div>
        </div>
        <div class="btn"><a href="javascript:;" class="to_apply d_btn normal" @click="conApplyDialog">确认转账</a></div>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'ptactive',
  components: {},
  data () {
    return {
      watermoney:0,
      dialogHongli:0,
      shoucunmoney:'',
      showDialog:false,
      initInfo:{},
      ajaxLoad:false,
      load:true,
      errorDes:''
    }
  },
  mounted () {
    this.getVipPrivilegeInit()
  },
  methods: {
    changeNumber() {
      let str = '' + this.shoucunmoney;
      if (str.indexOf('.') != -1) {
          let arr = str.split('');
          arr.splice(arr.length - 1);
          let str2 = arr.join('');
          this.shoucunmoney = +str2;
      }
      this.shoucunmoney=this.shoucunmoney>0?this.shoucunmoney:''
    },
    toShowDialog() {
      if(this.initInfo.is_login == 0) {
        this.$message({
          message: '请您先登录',
          type: 'warning'
        })
        return
      }
      if(this.initInfo.status==1) {
        return
      }
      if(this.initInfo.status != 0) {
        if(this.initInfo.status_tip) {
          this.$message({
            message: this.initInfo.status_tip,
            type: 'warning'
          })
        }
        return
      }
      this.dialogHongli = 0
      this.watermoney = 0
      this.shoucunmoney = this.initInfo.first_deposit || 0;
      this.depositMoneyChange()
      this.showDialog = true;
    },
    //金额输入变化
    depositMoneyChange(){
      if(this.shoucunmoney) {
        this.shoucunmoney = Math.min(this.shoucunmoney,this.initInfo.first_deposit)
      }
      if(this.shoucunmoney>=100) {
        this.dialogHongli = Math.min(this.shoucunmoney,this.initInfo.setting_max_bonus);
        this.watermoney =   Math.floor(this.dialogHongli)*32;
      }else {
        this.dialogHongli = 0
        this.watermoney = 0
      }
    },
    getVipPrivilegeInit() {
      this.load = true
      this.$http(this.ApiSetting.active.getPtActiveInit)
      .then(res => {
        this.load = false
        if(res.status == 1 && res.data) {
          this.initInfo = res.data;
          let stime = new Date(res.data.active_start_time*1000)
          this.initInfo.start_time = stime.getFullYear() + '年' + (stime.getMonth() + 1) + '月' + stime.getDate() + '日'
        }
      })
      .catch(res=>{
        this.load = false
      })
    },
    //确认转账
    conApplyDialog() {
      if(!this.shoucunmoney) {
        this.$message({
          message: '请输入首存金额！',
          type: 'warning'
        })
        return
      }
      if(this.shoucunmoney -this.initInfo.setting_low_money<0 ) {
        this.$message({
          message: '首存金额不能低于'+ this.initInfo.setting_low_money ,
          type: 'warning'
        })
        return
      }
      if(this.ajaxLoad){
        return;
      }
      this.ajaxLoad = true
      this.$http(this.ApiSetting.user.transferSubmit,{
        from:"NM",
        to:'PT',
        money:this.shoucunmoney,
        active_id:this.initInfo.active_id
      })
      .then(res => {
        if(res.status == 1) {
           this.$message({
            message: '首存成功！',
            type: 'success'
           })
          this.initInfo.status = 1
          this.showDialog = false
        }
        this.ajaxLoad = false
      }, err => {
        if (err.message) {
            this.errorDes = res.message
        }
        this.ajaxLoad = false
      })
    },
  },
}
</script>
<style lang="less" scoped>
.vipgamegold{
  background: url("../../../assets/active/ptactive_banner.jpg") no-repeat center top;
  padding-top:510px;
  .active_page_wrapper {
    text-align: center;
  }
  .active_desc {
    text-align: left;
  }
  .text_show {
    font-size: 14px;
    color: #53586b;
  }
  .active_time .btn {
      margin-top:10px;
    }
  .d_btn {
    width: 126px;
    height: 29px;
    line-height: 29px;
  }
  .active_page_content {
    padding: 30px 38px  !important;
  }
  table {
    width: 1163px;
    margin: 45px 0 30px ;
    border:1px solid #333548;
    font-size: 18px;
    color: #8692b6;
    tr {
      height: 50px;
      td {
          border:1px solid #333548;
          width: 210px;
          &:nth-child(even) {
            background:#1c1e25;
          }
          &:last-child {
            width: 310px;
          }
      }
      &:first-child {color: #07f1b7}
    }
  }
.loading{
  display: inline-block;
  width: 25px;
  height: 25px;
  vertical-align: middle;
  background: url("../../../assets/btn-loader.gif") no-repeat center;
  background-size: 100% 100%;
}
}

</style>
<style lang="less">
.ptactive_dialog {

  .el-dialog__title {
    color: #ffffff;
    // font-size: 14px;
  }
  .dialog_wrapper {
    padding: 0 65px;
    color: #7c839f;
  }
  .qianbao_tit {
    color: #ffffff;
  }
  .error_desc {
    color: #e31212;
    margin-top: 5px;
    margin-bottom: 12px;
    transform: translateZ(0);
  }
  .money {
    margin-top: 8px;
  }
  .ivu-input {
    // color: #7c839f;
    &::-webkit-input-placeholder { /* WebKit browsers */
      color: #7c839f;
    }
  }
  .s_m_t i{
    color: #07f1b7;
  }

}
</style>
