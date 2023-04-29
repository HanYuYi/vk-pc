<template>
  <div class="ag_active active_page realweekdeposit">
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
              活动内容
            </div>

             <div class="section_box_wrapper">
              <div class="active_time">
                活动期间，满足条件的VIP会员在每个自然周内可领取一次单笔存送优惠，彩金最高可获得1288元！
              </div>
            </div>


            <div class="section_box_wrapper">

              <table border="1" v-show="!load" align="center" cellspacing="0" width="100%">
                <thead>
                <tr align="center">
                  <th width="33.33%" >首存金额</th>
                  <th width="33.33%" >存款红利</th>
                  <th  >流水要求</th>
                </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,index) in tableObj.info" :key="index">
                    <td>{{item.deposit}}</td>
                    <td>{{item.bonus}}</td>
                      <td v-if="index==0" :rowspan="tableObj.info.length">（本金+红利）x{{tableObj.limit}}</td>
                  </tr>

                </tbody>
              </table>

              <div class="liushui_box"  v-if="!load&&(initInfo.status==0 || initInfo.status==1) &&initInfo.bonus>0"  ><span class="liushui" >{{initInfo.status==0 ? "当前可领取：" : "已领取："}}{{initInfo.bonus}}元彩金 </span></div>



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
                1.每个自然周内符合条件的VIP会员，可在优惠活动页面领取“真人周存款优惠”，对应的存款本金+活动彩金在领取成功后将自动添加至会员选择的真人游戏钱包中。每日未发起提款前的存款都视为首充。<br>
                2.若会员在申请此优惠前将存款从主钱包转出或发起提款，则不可申请真人周存款优惠。<br>
                3.会员申请成功后需在所选择的真人游戏中完成相对应的流水要求。例：若会员当天首存500，申请真人周存款活动优惠，此时需完成（500+88）x15=8820的真人游戏有效流水。<br>
                4.此优惠活动每周仅限领取一次，领取当天不与新用户首存优惠活动、电子首存优惠活动、电竞首存优惠活动、VIP月存款活动、IM体育会员日活动、体育周存款活动、IM沙巴首单包赔活动、TI10充值返利活动、S11充值返利活动、棋牌周存款活动共享，活动流水未完成前不可再次申请，当周未申请则视为自动放弃。<br>
                5.每位有效玩家、每一手机号码、电子邮箱、相同银行卡、每一个IP地址、每一台电脑者只能享受一次优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利。<br>
                6.VKGAME对本活动保有最终解释权。
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
      v-if="showDialog"
      :visible.sync="showDialog"
      custom-class="sport_rescue_dialog_box"
      width="700px"
      :close-on-click-modal="false">
      <div class="dialog_wrapper sport_rescue_dialog">
        <p class="">可领彩金：{{initInfo.bonus}}元</p>
        <div >
          <span class="qianbao_tit">领取至：</span>
          <div class="qianbao">
            <div
            class="wallet_box"
            v-for="item in qianbaoarr"
            @click="qianbaoSelect(item)"
            :key="item.id"
            :class="[item.code,item.selected?'active':'']">{{item.name}}</div>
          </div>
        </div>
        <div class="btn"><a href="javascript:;" class="to_apply d_btn normal" @click="conApplyDialog">确定</a></div>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
import { mapState } from 'vuex'
export default {
  name: "realweekdeposit",
  components: {},
  data() {
    return {
      showDialog: false,
      qianbaoarr: [
        {name: "AG钱包",selected: true,id: 1,code: "AG" },
        {name: "欧博钱包",selected: false,id: 2,code: "ALLBET" },
        {name: "PT钱包",selected: false,id: 3,code: "PT" }
      ],
      initInfo: {},
      selectedObj: {},
      ajaxLoad: false,
      load:false,
      tableObj:{},
    };
  },
  mounted() {
    this.getInit(1);
    this.selectedObj = this.qianbaoarr[0];
  },

  methods: {
    getInit(bool) {
      if(bool) {
        this.load = true
      }
      this.$http(this.ApiSetting.active.getRealWeekDepositInit).then(res => {
        this.load = false
        if (res.status == 1 && res.data) {
           this.initInfo = res.data;
            this.tableObj = res.data.active_setting;

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
        money: this.initInfo.bonus,
        active_id: this.initInfo.active_id
      }).then(
        res => {
          if (res.status == 1) {
            // this.getInit();
            this.$message({
              message: "领取成功，请进入个人中心钱包查看！",
              type: "success"
            });
             this.initInfo.status = 1;
             this.load=false
            this.showDialog = false;
          }
          this.ajaxLoad = false;
        },
        err => {
          this.ajaxLoad = false;
        }
      );
    },
    qianbaoSelect(item) {
      this.qianbaoarr.forEach(i => {
        i.selected = false;
      });
      this.qianbaoarr[item.id - 1].selected = true;
      this.selectedObj = this.qianbaoarr[item.id - 1];
    }
  }
};
</script>
<style scoped>
.active_page_content {
  padding: 30px 180px !important;
}
.ag_active {
  background: url("../../../assets/active/realweekdeposit_banner.jpg") no-repeat center top;
  position: relative;
}
.no_boder {
  border: none;
}
.section_box_wrapper .btn {
  margin-top: 20px;
}
.liushui_box {
  text-align: center;
  margin-top: 20px;
}
.liushui {
  color: #ffffff;
  margin-top:20px;
  font-size: 16px;
  text-align: center;
}
.section_box_wrapper table {
  border: none;
  margin-top: 20px;
  font-size: 16px;
}
.section_box_wrapper table td,
.section_box_wrapper table th {
  border-color: #303344;
  text-align: center;
  line-height: 50px;
  color:#c3c3c3;

  /* color: #fff; */
  font-weight: normal;
}
.section_box_wrapper table th {
  color: #07f1b7;
}
.btn  {
  text-align: center;
}
.btn .to_apply {
  width: 92px;
  height: 25px;
  line-height: 25px;
  font-size: 14px;
}
.appplyed {
  cursor: default;
}
</style>
<style lang="less" scoped>
.realweekdeposit .sport_rescue_dialog_box {
  border: none;
  background-color: #262933;
  .el-dialog__body {
    padding: 0 0 70px;
  }
  .sport_rescue_dialog {
    font-size: 18px;
    color: #ffffff;
    padding: 0 47px;
  }
  .sport_rescue_dialog p {
    margin-bottom: 40px;
  }
  .sport_rescue_dialog .qianbao {
    font-size: 14px;
    margin-top: 20px;
    display: inline-block;
  }
  .sport_rescue_dialog .qianbao .wallet_box  {
    margin-right: 19px;
  }
  .sport_rescue_dialog .qianbao .wallet_box:nth-child(3n+3) {
    margin:0;
  }
  .sport_rescue_dialog .qianbao div.active {
    border: 1px solid #07e9f1;
  }
  .qianbao_tit {
    display: inline-block;
    vertical-align: top;
  }
  .sport_rescue_dialog .btn {
    margin-top: 40px;
    padding-top: 0;
    .to_apply {
      margin: 0;
      width: 135px;
      height: 34px;
      line-height: 34px;
      font-size: 16px;
    }
  }
}
</style>
