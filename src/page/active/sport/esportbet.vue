<template>
  <div class="ag_active active_page esportbet">
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
                  {{initInfo.active_show_time}}

              </div>
            </div>
          </div>
          <div class="active_section_box">
            <div class="active_title">
              {{$t("Event_details")}}
            </div>
            <div class="section_box_wrapper">
              <div class="active_time ">
                会员每日首充≥100且在【DOTA2基辅AniMajor】中累计有效流水达到指定金额，即可领取彩金。
              </div>
              <table border="1"  align="center" cellspacing="0" width="100%"  v-show="!load">
                <thead>
                <tr align="center"  >
                    <th>{{tableObj.title}}</th>
                    <th>{{tableObj[500]}}</th>
                    <th>{{tableObj[5000]}}</th>
                    <th>{{tableObj[10000]}}</th>
                    <th>{{tableObj[50000]}}</th>
                </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,index) in tableList" :key="index" >
                    <td>{{item.title}}</td>
                     <td>{{item[500]}}</td>
                    <td>{{item[5000]}}</td>
                    <td>{{item[10000]}}</td>
                    <td>{{item[50000]}}</td>
                  </tr>
                  <tr>
                    <td>投注场馆要求</td>
                    <td :colspan="tableList.length">小艾电竞、小艾彩池电竞、IM电竞</td>
                  </tr>
                  <tr>
                    <td>彩金流水要求</td>
                    <td   :colspan="tableList.length">1倍流水</td>
                  </tr>

                </tbody>




              </table>


                <!-- status   0 可领   1已领   2 未登录  其他 -->
                 <div class="liushui_box"  v-if="!load&&(initInfo.status==0 || initInfo.status==1) &&initInfo.today_bonus>0"  ><span  >{{initInfo.status==0  ? "当前可领取：" : "已领取："}}{{initInfo.today_bonus}}元彩金 </span></div>




               <div class="btn"   v-show="!load">
                        <div class="d_btn normal"   v-show="initInfo.status==0 || initInfo.status==2 || initInfo.status>2" @click="showApplyDialog()">立即领取</div>
                        <div class="d_btn disabled" v-show="initInfo.status==1" >已领取</div>

                 </div>


            </div>
          </div>
          <div class="active_section_box">
            <div class="active_title">
              {{$t("Activity_rules")}}
            </div>
            <div class="section_box_wrapper">
              <div class="active_desc">
               <p>
                 1.电竞游戏场馆仅限：小艾电竞、小艾彩池电竞、IM电竞，有效流水将累计计算以上所有电竞游戏。	<br>
                2.VIP会员每日未提款前的存款都视为首充。	<br>
                3.符合条件的会员需在次日在本活动页面手动领取，申请获得的彩金将自动派发至会员所选择的的电竞游戏钱包中，活动彩金需在电竞游戏中完成1倍流水即可转出，当会员对应电竞游戏钱包余额≤原电竞钱包余额且无未结算注单时，系统将自动判定已完成活动规定的有效流水，活动流水未完成前不可再次申请本活动。<br>
                4.此优惠活动每天仅限领取一次，若当天会员未领取，则视为自动放弃。<br>
                5.有效投注额仅计算产生输赢结果的注单，电竞赔率＜1.45、注单取消、对冲、未结算等注单不计算为有效投注。<br>
                6.每位有效玩家、每一手机号码、电子邮箱、相同银行卡、每一个IP地址、每一台电脑者只能享受一次优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利。<br>
                7.VKGAME对本活动保有最终解释权。
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
      custom-class="esportsrelive_rescue_dialog"
      width="507px"
      :close-on-click-modal="false">
      <div class="dialog_wrapper">
        <div class="esportsrelive_dialog_box clearfix money">
          可领彩金: <span v-if="initInfo.today_bonus">{{initInfo.today_bonus}} 元</span>
        </div>

        <div class="esportsrelive_dialog_box clearfix">
          <div class="box_title">领取至：</div>
          <div class="  clearfix">
            <div class="wallet_box"
            v-for="item in walletList"
            :key="item.code"
            :class="[{'active': item.selected}, item.code]"
            @click="hanldeWalletSelect(item)">
              {{item.name}}
            </div>
          </div>
        </div>

        <div class="dialog_btn btn">
          <span class="d_btn normal" @click="conApplyDialog">确定</span>
        </div>
      </div>


    </el-dialog>

  </div>
</template>
<script type="text/javascript">
export default {
  name: "esportbet",
  components: {},
  data() {
    return {
      showDialog: false,
      walletList: [
        {name:"小艾电竞钱包",selected:true,id:1,code:"EG"},
        {name:"IM电竞钱包",selected:false,id:2,code:"IM"},
      ],
      initInfo: {},
      selectedObj: {},
      ajaxLoad: false,
      load:true,
      tableObj:{},
      tableList:[],
    };
  },


  mounted() {
   this.getInit(1);
    this.selectedObj = this.walletList[0];
  },
  methods: {
        getInit(bool) {
      if(bool) {
        this.load = true
      }
      this.$http(this.ApiSetting.active.getEsportBetInit).then(res => {
        this.load = false
        if (res.status == 1 && res.data) {
           this.initInfo = res.data;

            this.tableObj = res.data.active_setting[0];
            this.tableList=res.data.active_setting.splice(1,res.data.active_setting.length-1)
        }
      })
      .catch(()=>{
        this.load = false
      });
    },


    showApplyDialog() {
       if (this.initInfo.status !== 0 ) {
        if(this.initInfo.status_tips) {
          this.$message({
            message: this.initInfo.status_tips,
            type: "warning"
          });
        }
        return;
      }
      if (this.initInfo.status == 0) {
        this.showDialog = true;
      }

    },
    conApplyDialog() {
      if (this.ajaxLoad) {
        return;
      }
      this.ajaxLoad = true;
      this.$http(this.ApiSetting.user.transferSubmit, {
        from: "NM",
        to: this.selectedObj.code,
        money: this.initInfo.today_bonus,
        active_id: this.initInfo.active_id
      }).then(
        res => {
          if (res.status == 1) {
            this.$message({
              message: "领取成功，请进入个人中心钱包查看！",
              type: "success"
            });
            this.initInfo.status = 1;
            this.showDialog = false;
          }
          this.ajaxLoad = false;
        },
        err => {
          this.ajaxLoad = false;
        }
      );
    },
        hanldeWalletSelect (item) {
      this.walletList.forEach((v, i) => {
        v.selected =  false
      })
      this.walletList[item.id-1].selected = true;
      this.selectedObj = this.walletList[item.id-1];
    },

  }
};
</script>
<style scoped>
.ag_active {
  background: url("../../../assets/active/esportbet_banner.jpg") no-repeat center top;
  position: relative;
}
.active_time.tl {text-align: left !important;}
.section_box_wrapper table {
  border: none;
  margin-top: 20px;
}
.section_box_wrapper table td,
.section_box_wrapper table th {
  border-color: #303344;
  text-align: center;
  line-height: 50px;
  color: #c3c3c3;
  font-size: 16px;
}
.section_box_wrapper table th{
  font-weight: 400;
}
.section_box_wrapper table th:not(:first-child){

  color: #ffffff;
  font-size: 16px;
}
.section_box_wrapper table tr td:nth-child(1),.section_box_wrapper table tr th:nth-child(1){
  color:#07f1b7;
}
.section_box_wrapper table{
  margin-bottom: 20px;
}


.btn {
    display:flex;
    justify-content: center;
   margin-top:20px
}
.liushui_box {
  text-align: center;
   font-size: 16px;
  color: #ffffff;
}



</style>
<style lang="less">
.esportsrelive_rescue_dialog {
  .btn{
    margin-top:0px;
  }
  .el-dialog__header{
  height: 33px;

  }
  &.el-dialog {
    border: none;
    .el-dialog__body {
      padding:0px 42px 24px 42px ;

      position: relative;
      background-color: #262933;
      color: #fff;
      font-size: 18px;
    }
    .esportsrelive_dialog_box {
      &.money {
        margin-bottom: 20px;
      }
      .box_title {
        height: 30px;
        line-height: 30px;
        color: #fff;
        margin-bottom: 16px;
      }
      .ivu-input{
        border-radius: 0px;
      }

    }

    .wallet_box {
      font-size: 14px;
      padding: 0 0 0 8px;
      line-height: 88px;
      &:nth-child(1) {
        margin-right: 44px;
        margin-bottom: 34px;
      }
      &:nth-child(2) {
        margin-right: 0;
      }
    }
  }
}



</style>
