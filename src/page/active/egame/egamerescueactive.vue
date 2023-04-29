<template>
  <div class="ag_active active_page">
    <div class="active_page_wrapper">
      <div class="wrapper">
        <div class="top_bg">
          <div class="bg1"></div>
          <div class="bg2"></div>
        </div>
        <div class="active_page_content">
          <div class="active_section_box">
            <div class="active_title">
              {{$t('The_activity_time')}}
            </div>
            <div class="section_box_wrapper">
              <div class="active_time">
                {{start_time}}起
              </div>
            </div>
          </div>
          <div class="active_section_box">
            <div class="active_title">
              {{$t("Event_details")}}
            </div>
            <div class="section_box_wrapper">
              <div class="active_time">
                {{$t('egamerescue.activeDetail1')}}<br>
                {{$t('egamerescue.activeDetail2')}}
              </div>
              <table border="1"  align="center" cellspacing="0" width="100%">
                <thead>
                  <tr align="center">
                    <th>{{$t('egamerescue.tatbleTitle1')}}</th>
                    <th>{{$t('egamerescue.tatbleTitle2')}}</th>
                    <th>{{$t('egamerescue.tatbleTitle3')}}</th>
                    <th>{{$t('egamerescue.tatbleTitle4')}}</th>
                    <th>{{$t('egamerescue.tatbleTitle5')}}</th>
                    <th>{{$t('egamerescue.canGetPrize', [initInfo.bouns])}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>≥500</td>
                    <td>≥500</td>
                    <td>3%</td>
                    <td>588</td>
                    <td>{{$t('egamerescue.tatblecontent5')}}</td>
                    <td class="btn">
                      <!--<a href="javascript:;" class="to_apply defalut">立即申请</a>-->
                      <a v-show="initInfo.is_login==0||(initInfo.is_login==1&&initInfo.status!=1)" href="javascript:;" class="to_apply d_btn normal" @click="showApplyDialog">{{$t('egamerescue.applyNow')}}</a>
                      <a v-show="initInfo.is_login==1&&initInfo.status==1" href="javascript:;" class="to_apply d_btn disabled appplyed">已领取</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="active_section_box">
            <div class="active_title">
              {{$t("Activity_rules")}}
            </div>
            <div class="section_box_wrapper">
              <div class="active_desc">
                1.电竞游戏包括：威客电竞、RG电竞、IM电竞。<br>
                2.VIP会员每日未提款前的累计有效存款都视为首充。 <br>
                3.满足条件的用户需在产生负盈利的次日（00:00:00至23:59:59）期间在本活动页面申请此优惠活动，逾期则视为自动放弃。<br>
                4.申请获得的奖金将自动派发至用户选择的电竞游戏钱包中，活动奖金需在电竞游戏中完成5倍流水即可转出；当用户对应电竞游戏钱包余额≤原电竞钱包余额且无未结算注单时，系统将自动判定已完成活动规定的有效流水，活动流水未完成前不可再次申请本活动。<br>
                5.此活动不与新用户首存活动、其他救援金活动共享，每位用户每日仅限申请一次。<br>
                6.有效投注额仅计算产生输赢结果的注单，电竞赔率＜1.45、注单取消、对冲、未结算、自走棋游戏等注单不计算为有效投注。<br>
                7.每位有效玩家、每一手机号码、电子邮箱、相同银行卡、每一个IP地址、每一台电脑者只能享受一次优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利。VKGAME对本活动保有最终解释权。
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
      custom-class="apply_rescue_dialog"
      width="570px"
      :close-on-click-modal="false">
      <div class="dialog_wrapper">
        <!-- <div class="close_btn" @click="showDialog=false"><span></span></div> -->
        <div class="rescue_dialog_box clearfix money">
          <div class="box_title fl">{{$t('egamerescue.rescueMoney')}}：</div>
          <div class="box_content fl">{{initInfo.bouns}}{{$t('yuan')}}</div>
        </div>
        <div class="rescue_dialog_box clearfix">
          <div class="box_title fl">{{$t('egamerescue.giveBack')}}：</div>
          <div class="box_content fl">
            <div class="wallet_list clearfix">
              <div class="list_box"  v-for="item in walletList" :key="item.code" :class="[{'actived': item.selected}, item.code]" @click="hanldeWalletSelect(item)">
                {{item.name}}
              </div>
            </div>
          </div>
        </div>
        <div class="dialog_btn btn">
          <span class="d_btn normal" @click="conApplyDialog">{{$t('determine')}}</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'egamerescueactive',
  components: {},
  data() {
    return {
      showDialog: false,
      start_time:'',
      initInfo:{},
      selectedObj:{},
      ajaxLoad:false,
      walletList: [
        {name:"威客电竞钱包",selected:true,id:1,code:"EG"},
        {name:"RG电竞钱包",selected:false,id:2,code:"RG"},
        {name:"IM电竞钱包",selected:false,id:3,code:"IM"}
      ]
    }
  },
  mounted () {
    this.getEgameRescueFundInit()
    this.selectedObj = this.walletList[0]
  },
  methods: {
    getEgameRescueFundInit() {
      this.$http(this.ApiSetting.active.getEgameRescueFundInit)
      .then(res => {
        if(res.status == 1 && res.data) {
          this.initInfo = res.data;
          let stime = new Date(res.data.active_start_time*1000)
          this.start_time = stime.getFullYear() + '年' + (stime.getMonth() + 1) + '月' + stime.getDate() + '日'
        }
      })
    },
    showApplyDialog () {
      if(this.initInfo.is_login == 0) {
        this.$message({
          message: '请您先登录!',
          type: 'warning'
        })
        return
      }
      if(this.initInfo.status !=0 && this.initInfo.status !=1) {
        this.$message({
          message: this.initInfo.status_tip,
          type: 'warning'
        })
      return
      }
      this.showDialog = true
    },
    hanldeWalletSelect (item) {
      this.walletList.forEach((v, i) => {
        v.selected =  false
      })
      this.walletList[item.id-1].selected = true;
      this.selectedObj = this.walletList[item.id-1];
    },
    conApplyDialog() {
      if(this.ajaxLoad){
        return;
      }
      this.ajaxLoad = true
      this.$http(this.ApiSetting.user.transferSubmit,{
        from:"NM",
        to:this.selectedObj.code,
        money:this.initInfo.bouns,
        active_id:this.initInfo.active_id
      })
      .then(res => {
        if(res.status == 1) {
           this.$message({
            message: '领取成功！',
            type: 'success'
           })
          this.initInfo.status = 1
          this.showDialog = false
        }
        this.ajaxLoad = false
      }, err => {
        this.ajaxLoad = false
      })
    },
  }
}
</script>
<style scoped>
.ag_active{
  background: url("../../../assets/active/egamerescue/banner-bg.jpg") no-repeat center top;
}
.section_box_wrapper table{
  border: none;
  margin-top: 20px;
}
.section_box_wrapper table td, .section_box_wrapper table th{
  border-color: #303344;
  text-align: center;
  line-height: 50px;
  color: #fff;
}
.section_box_wrapper table th{
  color: #a3a3fd;
}
.btn .to_apply{
  width: 92px;
  height: 25px;
  line-height: 25px;
  font-size: 12px;
}
.btn .to_apply.defalut{
  color: #9c9c9c;
  background-color: #434651;
}
 </style>
 <style type="text/css">
  .apply_rescue_dialog.el-dialog{
    border: none;
  }
  /* .apply_rescue_dialog.el-dialog .el-dialog__header{
    display: none;
  } */
  .apply_rescue_dialog.el-dialog .el-dialog__body{
    padding: 0px 48px 30px;
    position: relative;
    background-color: #262933;
    color: #fff;
    font-size: 18px;
  }
  .apply_rescue_dialog.el-dialog .rescue_dialog_box.money{
    margin-bottom: 36px;
  }
  .apply_rescue_dialog.el-dialog .rescue_dialog_box .box_title{
    height: 30px;
    line-height: 30px;
    color: #fff;
    width: 75px;
  }
  .apply_rescue_dialog.el-dialog .rescue_dialog_box.money .box_content{
    height: 30px;
    line-height: 30px;
    width: 398px;
  }
  .apply_rescue_dialog.el-dialog .wallet_list{
    width: 398px;
  }
  .apply_rescue_dialog.el-dialog .wallet_list .list_box{
    float: left;
    border: 1px solid transparent;
    width: 189px;
    height: 88px;
    line-height: 86px;
    font-size: 14px;
    cursor: pointer;
    background: url("../../../assets/icon_es.png") no-repeat;
    position: relative;
    padding: 0 10px;
    margin: 0 20px 20px 0;
    box-sizing: border-box;
  }
  .appplyed {
    cursor: default;
  }
  .apply_rescue_dialog.el-dialog .wallet_list .list_box:nth-child(2n){
    margin-right: 0;
  }
  .apply_rescue_dialog.el-dialog .wallet_list .list_box.EG {
    background-position: -734px -612px;
  }
    .apply_rescue_dialog.el-dialog .wallet_list .list_box.FY {
    background-position: -1392px -1035px;
  }
    .apply_rescue_dialog.el-dialog .wallet_list .list_box.RG {
    background-position: -1612px -1035px;
  }
    .apply_rescue_dialog.el-dialog .wallet_list .list_box.IM {
    background-position: -510px -926px;
  }
  .apply_rescue_dialog.el-dialog .wallet_list .list_box.actived:after{
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 189px;
    height: 88px;
    border: 1px solid #07efc7;
  }

  /* .apply_rescue_dialog.el-dialog .dialog_wrapper .close_btn{
    position: absolute;
    right: 5px;
    top: 5px;
    width: 22px;
    height: 22px;
    text-align: center;
    line-height: 22px;
    background-color: #444a5b;
    cursor: pointer;
  }
  .apply_rescue_dialog.el-dialog .dialog_wrapper .close_btn span{
    display: inline-block;
    vertical-align: middle;
    width: 10px;
    height: 10px;
    background: url("../../../assets/active/egamerescue/icons.png") no-repeat;
    background-position: -690px -63px;
  }
  .apply_rescue_dialog.el-dialog .dialog_wrapper .close_btn:hover span{
    background-position: -690px -93px;
  } */
  .apply_rescue_dialog.el-dialog .dialog_wrapper .dialog_btn span{
    cursor: pointer;
  }
</style>
