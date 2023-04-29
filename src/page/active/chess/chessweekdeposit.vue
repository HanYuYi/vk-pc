<template>
  <div class="ag_active active_page chessweekdeposit">
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
               活动期间VIP会员每个自然周内可领取一次棋牌周存款优惠，VIP会员可获得存款金额38%的返利彩金！
              </div>
              <table border="1"  align="center" cellspacing="0" width="100%">
                <thead>
                <tr align="center">
                  <th  >首存金额</th>
                  <th  >红利返比例</th>
                  <th >红利上限</th>
                  <th >流水要求</th>
                </tr>
                </thead>
                <tbody>
                  <tr>
                      <td>≥{{tableObj.min_deposit}}</td>
                      <td>{{tableObj.percent_show}}</td>
                      <td>{{tableObj.max_bonus}}</td>
                    <td>(本金+红利)x{{tableObj.limit}}棋牌</td>
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
               <p>
                 1.符合条件的会员每个自然周内可领取一次棋牌周存款优惠，首存金额+活动彩金在领取成功后将自动添加至会员选择的棋牌钱包中。每日未发起提款前的存款都视为首充。<br>
                 2.若会员在申请此优惠前将存款从主钱包转出或发起提款，则不可申请棋牌周存款优惠。<br>
                 3.会员申请成功后需在所选择的棋牌游戏中完成相对应的流水要求。例：会员首存1000，需完成（1000+380）x15=20700的棋牌游戏有效流水。<br>
                 4.此优惠活动领取当天不与电子首存优惠活动、电竞首存优惠活动、VIP月存款活动、体育周存款活动、体育首单包赔活动、TI11首存助力活动、USDT存款三重礼活动、真人首存活动共享，活动流水未完成前不可再次申请，当周未申请则视为自动放弃。<br>
                 5.每位有效玩家、每一手机号码、电子邮箱、相同银行卡、每一个IP地址、每一台电脑者只能享受一次优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利。<br>
                 6.VKGAME对本活动保有最终解释权。
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
      custom-class="chesscard_rescue_dialog_box"
      width="570px"
      :close-on-click-modal="false">
      <div class="dialog_wrapper sport_rescue_dialog">
        <p class="">可领彩金: {{initInfo.bonus}} 元</p>
        <div >
          <span class="qianbao_tit">领取至：</span>
          <div class="qianbao">
            <div
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
export default {
  name: "chessweekdeposit",
  components: {},
  data() {
    return {
      showDialog: false,
      qianbaoarr: [
        {name: "乐游钱包",selected: true,id: 1,code: "LY" },
        {name: "开元钱包",selected: false,id: 2,code: "KY" },
        {name: "凯旋钱包",selected: false,id: 3,code: "LC" },
        {name: "博乐钱包",selected: false,id: 4,code: "BL" }
      ],
      initInfo: {},
      selectedObj: {},
      ajaxLoad: false,
      load:true,
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
      this.$http(this.ApiSetting.active.getChessWeekDepositInit).then(res => {
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
            this.$message({
              message: "领取成功！",
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
.ag_active {
  background: url("../../../assets/active/chessweekdeposit-banner.jpg") no-repeat center top;
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
}

.section_box_wrapper table td strong {
  font-size: 16px;
  color: #f4d364;
}
.section_box_wrapper table th {
  color: #07f1b7;
  font-size: 16px;
}



.btn {
    display:flex;
    justify-content: center;
   margin-top:20px
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


</style>
<style lang="less">
.chessweekdeposit .chesscard_rescue_dialog_box {
  border: none;
  background-color: #262933;
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
    display: inline-block;
    width: 398px;
  }
  .sport_rescue_dialog .qianbao div {
    width: 189px;
    height: 88px;
    float: left;
    line-height: 88px;
    padding-left: 8px;
    box-sizing: border-box;
    cursor: pointer;
    border: 1px solid transparent;
    transition: border-color 0.2s;
    background: url("../../../assets/icon_es.png") no-repeat;
    margin-bottom: 16px
  }
  .sport_rescue_dialog .qianbao div.active {
    border: 1px solid #07e9f1;
  }
  .sport_rescue_dialog .qianbao div:nth-child(odd) {
    margin-right: 16px;
  }
  .sport_rescue_dialog .qianbao div.LY {
    background-position: -953px -926px;
  }
  .sport_rescue_dialog .qianbao div.KY {
    background-position: -510px -817px;
  }
  .sport_rescue_dialog .qianbao div.LC {
    background-position: -734px -1035px;
  }
  .sport_rescue_dialog .qianbao div.LK {
    background-position: -1609px -926px;
  }
  .sport_rescue_dialog .qianbao div.BL {
    background-position: -1172px -1035px;
  }
  .qianbao_tit {
    display: inline-block;
    vertical-align: top;
  }
   .sport_rescue_dialog .btn {
     margin-top: 20px;
   }
  .sport_rescue_dialog .to_apply {
    width: 135px;
    height: 34px;
    line-height: 34px;
    font-size: 16px;
  }
}
</style>
