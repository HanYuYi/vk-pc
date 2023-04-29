<template>
  <div class="ag_active active_page everydaydep">
    <div class="active_page_wrapper">
      <div class="wrapper">
        <div class="top_bg">
          <div class="bg1"></div>
          <div class="bg2"></div>
        </div>
        <div class="active_page_content">
          <div class="active_section_box">
            <div class="active_title">
               活动时间
            </div>
            <div class="section_box_wrapper">
              <div class="active_time">
                {{start_time}}起
              </div>
            </div>
          </div>
          <div class="active_section_box">
            <div class="active_title">
              活动详情
            </div>
            <div class="section_box_wrapper" v-show="!load">
              <!--首存-->
              <div class="active_time">
                <span class="titi_f">首存活动：</span><span class="titi_s">{{firstDep.title_cn}}</span>
              </div>
              <table  border="0"  align="center" cellspacing="0" width="100%">
                <thead>
                  <th width="25%">场馆</th>
                  <th v-for="(item,index) in firstDep.setting" :key="index">{{item.key_cn}}</th>
                </thead>
                <tbody >
                    <tr>
                      <td>返还比例（最高{{firstDep.max_bonus}}） </td>
                      <td v-for="(item,index) in firstDep.setting" :key="index">{{item.percent_show}}</td>
                    </tr>
                    <tr>
                      <td>流水要求（本金+彩金）</td>
                      <td v-for="(item,index) in firstDep.setting" :key="index">{{item.bet_times}}倍</td>
                    </tr>
                </tbody>
              </table>
              <p>活动期间VIP会员单日存款时可申请一次首存优惠，申请成功的用户可享受单笔存款最高{{firstDep&&firstDep.setting?firstDep.setting[0].percent_show:'20%'}}的存款优惠。</p>
              <p>首存定义：VIP会员当日在未提款前的第一笔存款。			</p>
              <div class="btn">
                <div class="d_btn normal"
                  @click="showApplyDialog(firstDep,1)"
                  :class="{'disabled':isLogin&&firstDep.status==1}">
                   {{isLogin&&firstDep.status==1?'已完成':'首存转账'}}
                </div>
              </div>
              <!--再存-->
              <div class="active_time">
                <span class="titi_f">再存活动：</span><span class="titi_s">{{againDep.title_cn}}</span>
              </div>
              <table  border="0"  align="center" cellspacing="0" width="100%">
                <thead>
                  <th width="25%">场馆</th>
                  <th v-for="(item,index) in againDep.setting" :key="index">{{item.key_cn}}</th>
                </thead>
                <tbody >
                    <tr>
                      <td>返还比例（最高{{againDep.max_bonus}}） </td>
                      <td v-for="(item,index) in againDep.setting" :key="index">{{item.percent_show}}</td>
                    </tr>
                    <tr>
                      <td>流水要求（本金+彩金）</td>
                      <td v-for="(item,index) in againDep.setting" :key="index">{{item.bet_times}}倍</td>
                    </tr>
                </tbody>
              </table>
              <p>活动期间VIP会员可针对首存之后的任意一笔存款申请最高{{againDep&&againDep.setting?againDep.setting[0].percent_show:'38%'}}的再存优惠。			</p>
              <p>再存定义：VIP会员当日在未提款前的任意一笔存款。	</p>
              <p>温馨提示：VIP会员必须完成首存优惠所对应的流水要求后，才能申请再存优惠。	</p>
              <div class="btn">
                <div class="d_btn normal"
                 @click="showApplyDialog(againDep,2)"
                 :class="{'disabled':isLogin&&againDep.status==4 || (isLogin&&againDep.status==1)}">
                  {{isLogin&&againDep.status==1?'已完成':'再存转账'}}
                </div>
              </div>
            </div>
            <div  class="section_box_wrapper active_time">
              <div class="btn_loading_box " v-show="load"><span class="small_loading"></span></div>
            </div>
          </div>
          <div class="active_section_box">
            <div class="active_title">
              {{$t("Activity_rules")}}
            </div>
            <div class="section_box_wrapper">
              <div class="active_desc">
               <p>
               1.符合条件的会员存款后可在本优惠活动页面上点击“首存转账” 或 “再存转账”按钮，最近的一笔存款本金+活动奖金在转账成功后将自动添加至用户选择的钱包中。<br>
               2.会员在申请优惠时，账户主钱包余额需 ≥ 最近的一笔存款金额，此优惠活动需在当日未提款前申请。<br>
               3.会员申请奖金后需在所选游戏中完成相对应的流水要求，当会员对应钱包余额≤原钱包余额且无未结算注单时，系统将自动判定已完成活动规定的有效流水。<br>
               4.首存活动不与电竞/PT首存活动、VIP月存款活动、老用户召回活动共享，每个账户每日仅限申请一次同类型存款优惠活动。<br>
               5.再存活动仅限参与了首存优惠并完成首存优惠流水要求的会员参与。<br>
               6.首存活动/再存活动每位会员每个自然周内仅限申请一次，活动流水未完成前不可再次申请。<br>
               7.PT钱包在本活动中分为PT真人钱包和PT电子钱包，向指定游戏类型的钱包转账获取相应比例的奖金金额。<br>
               8.电竞赔率＜1.45、亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、走盘、注单取消、对冲等情况都不算有效流水；PT电子游戏中以下游戏不算有效流水： <activeptliushui></activeptliushui>。	<br>
                 9.每位有效玩家、每一手机号码、电子邮箱、相同银行卡、每一个IP地址、每一台电脑者只能享受一次优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利。VKGAME对本活动保有最终解释权。
               </p>
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
      custom-class="everydaydep_dialog_box"
      width="570px"
      :close-on-click-modal="false">
      <div class="dialog_wrapper everydaydep_dialog">
        <div >
          <span class="qianbao_tit">今日{{diaObj.active_type=='first'?'首':'再'}}存：{{diaObj.deposit}}元</span>
          <p>请选择转入钱包:</p>
          <div class="qianbao ">
            <div
            class="wallet_box"
            v-for="item in diaObj.success_show"
            @click="qianbaoSelect(item)"
            :key="item.id"
            :class="[item.code,item.selected?'active':'']">
              <span>{{item.name}}</span><br>
              <span class="w_bouns">彩金：<strong>{{item.bonus}}</strong>元</span>
            </div>
          </div>
        </div>
        <p>实际转入：<span  class="color_07f1b7"> {{diaObj.deposit+selectedWallet.bonus}}</span>元</p>
        <div class="btn">
          <a href="javascript:;" class="to_apply d_btn normal" @click="conApplyDialog()">确定</a>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
import { mapState } from 'vuex'
export default {
  name: 'vipdailydeposit',
  components: {},
  data() {
    return {
      showDialog: false,
      selectedWallet:{},
      initInfo:{},
      firstDep:{},
      againDep:{},
      start_time:'',
      ajaxLoad: false,
      load:false,
      diaObj:{}
    }
  },
  mounted () {
    this.getSportFirstTransferInit(1);
  },
  computed:{
    ...mapState(["isLogin"])
  },
  methods: {
    getSportFirstTransferInit(bool) {
      if(bool) {
        this.load = true;
      }
      this.$http(this.ApiSetting.active.getVipDailyDepositInit)
      .then(res => {
        this.load = false;
        if(res.status == 1 && res.data) {
          this.initInfo = res.data;
          this.firstDep = res.data.first_deposit;
          if(this.firstDep.success_show) {
            this.firstDep.success_show.forEach(item => {
              item.selected = false
            })
            this.firstDep.success_show[0].selected = true
          }
          this.againDep = res.data.again_deposit;
          if(this.againDep.success_show) {
            this.againDep.success_show.forEach(item => {
              item.selected = false
            })
            this.againDep.success_show[0].selected = true
          }
          // this.diaObj = this.againDep;//测试test
          // this.selectedWallet = this.diaObj.success_show[0];//测试test
          let stime = new Date(res.data.active_start_time*1000)
          this.start_time = stime.getFullYear() + '年' + (stime.getMonth() + 1) + '月' + stime.getDate() + '日'
        }
      })
      .catch(()=>{
        this.load = false
      });
    },
    showApplyDialog (obj,type) {
      if(!this.isLogin) {
        this.$message({
          message: '请您先登录',
          type: 'warning'
        })
        return
      }
      this.diaObj = obj;
      let txtHtml = ''
      if(type==1) {//首存
        txtHtml = '主钱包余额不足，无法参与首存。<br>请您补充主钱包余额。'
      }else {//再存
        txtHtml = '主钱包余额不足，无法参与再存。<br>请您补充主钱包余额。'
        if(this.diaObj.status ==4) {//未参加首存
          return;
        }
      }
      if(this.diaObj.status==1) {
        return;
      }
      if(this.diaObj.status ==3) {
        this.$confirm( txtHtml, this.$t("prompt"), {
          showCancelButton:false,
          type: 'warning',
          dangerouslyUseHTMLString: true,
          center: true
        }).then(() => {})
        return
      }
      if(this.diaObj.status != 0) {
        this.$message({
          message: this.diaObj.status_tip,
          type: 'warning'
        })
        return
      }
      if(this.diaObj.success_show) {
        this.selectedWallet = this.diaObj.success_show[0];
      }
      this.showDialog = true
    },
    qianbaoSelect(item) {
        this.diaObj.success_show.forEach(i => {
          i.selected = false
          if(i.code == item.code && i.acttive_ext==item.acttive_ext) {
            i.selected = true
            this.selectedWallet = i
          }
        })
    },
    conApplyDialog() {
      if(this.ajaxLoad){
        return;
      }
      this.ajaxLoad = true
      this.$http(this.ApiSetting.user.transferSubmit,{
        from:"NM",
        to:this.selectedWallet.code,
        money:this.diaObj.deposit,
        active_id:this.initInfo.active_id,
        active_type:this.diaObj.active_type,
        acttive_ext:this.selectedWallet.acttive_ext
      })
      .then(res => {
        if(res.status == 1) {
           this.$message({
            message: '转入成功！',
            type: 'success'
           })
          if(this.diaObj.active_type == this.firstDep.active_type) {
            //  this.firstDep.status = 1;
             this.getSportFirstTransferInit()
          }
          if(this.diaObj.active_type == this.againDep.active_type) {
             this.againDep.status = 1
          }
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
<style lang="less" scoped>
.everydaydep {
  background: url("../../../assets/active/everydaydep_banner.jpg") no-repeat center top;
  position: relative;
  .section_box_wrapper {
    position: relative;
  }
  .titi_f {
    color: #07f1b7;
    font-size: 16px;
  }
  .titi_s {
    color: #ffffff;
    font-size: 16px;
  }
  .active_time {
    color: #fff;
  }
      table {
      margin: 20px 0 24px;
      border-spacing: 0;
      font-size: 16px;
      border-collapse: unset;
      border-top: #333548 1px solid;
      border-right: #333548 1px solid;
      td,th {
        text-align: center;
        line-height: 50px;
        color: #fff;
        border-left: #333548 1px solid;
        border-bottom: #333548 1px solid;
      }
      th,td:first-child {
        color: #07f1b7;
        font-weight: normal;
      }
    }
 .btn {
   margin: 24px auto 70px;
   text-align: center;
 }
  .everydaydep_dialog {
    font-size: 18px;
    color: #ffffff;
    padding: 0 40px 0px;
    p {
      margin-bottom: 10px;
    }
    .qianbao {
      font-size: 14px;
      display: inline-block;
      .wallet_box {
        padding-top: 24px;
        line-height: normal;
        &:nth-child(3n+3) {
          margin-right: 0;
        }
        .w_bouns {
         color: #c6c6c6;
          strong {
            font-weight: normal;
            color:#07f1b7;
          }
        }
      }
    }
    .to_apply {
      margin-top: 30px;
      width: 135px;
      height: 34px;
      line-height: 34px;
      font-size: 16px;
    }
  }
  .qianbao_tit {
    display: inline-block;
    vertical-align: top;
    height: 34px;
    line-height: 34px;
    margin-bottom: 20px;
  }
}

</style>
<style lang="less">
  .everydaydep_dialog_box {
    width: 690px !important;
    margin-top: 7vh !important;
    border:none;
    background-color: #262933;
    .el-dialog__header {
      height: 36px;
    }
    .el-dialog__body {
      padding-top: 0;
    }
    .ivu-input {
      border-color: #07e9f1;
    }
    .btn {
      margin:0 !important;
      padding: 0 !important;
      .to_apply {
        margin-top:0 !important;
      }
    }
  }
</style>
