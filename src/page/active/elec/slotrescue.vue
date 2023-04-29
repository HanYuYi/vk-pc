<template>
  <div class="ag_active active_page realpersonrescue">
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
              {{$t("Event_details")}}
            </div>
            <div class="section_box_wrapper">
              <div class="active_time tl" style="line-height: 21px">
               活动期间， 凡当日首充≥{{activeSetting.first_deposit}}且在威客电子游戏中累计产生负盈利≥{{activeSetting.negative_profit}}的玩家，即可申请电子游戏负盈利的{{activeSetting.percent_show}}%返利。<br>
                例：用户A当日首充{{activeSetting.first_deposit}}元，在电子游戏中累计负盈利{{activeSetting.negative_profit}}元，此时可申请领取{{activeSetting.negative_profit}}x{{activeSetting.percent_show}}%={{activeSetting.negative_profit*activeSetting.percent}}元的返利彩金。
               </div>
              <table border="1"  align="center" cellspacing="0" width="100%">
                <tr align="center">
                  <td>当日首充</td>
                  <td>电子游戏负盈利</td>
                  <td>红利百分比</td>
                  <td>红利上限</td>
                  <td>红利流水倍数</td>
                  <td rowspan="2" class="btn" v-show="initInfo.status!=1">
                    <div class="to_apply d_btn normal" @click="showApplyDialog">
                      <div class="btn_loading_box " v-show="load || ajaxLoad"><span class="small_loading"></span></div>
                      立即申请
                    </div>
                  </td>
                  <td rowspan="2" class="btn" v-show="!load&&initInfo.is_login==1&&initInfo.status==1"><a href="javascript:;" class="to_apply d_btn disabled appplyed">已领取</a></td>
                </tr>
                  <tr>
                   <td>≥{{activeSetting.first_deposit}}</td>
                   <td>≥{{activeSetting.negative_profit}}</td>
                   <td>{{activeSetting.percent_show}}%</td>
                   <td>{{activeSetting.max_bonus}}</td>
                   <td>电子游戏{{activeSetting.bet_times}}倍流水</td>
                  </tr>
              </table>
            </div>
          </div>
          <div class="active_section_box">
            <div class="active_title">
              {{$t("Activity_rules")}}
            </div>
            <div class="section_box_wrapper">
              <div class="active_desc">
               <p>
                 1.电子游戏包括：PG电子游戏、PT电子游戏。<br>
                 2.VIP会员每日未提款前的累计有效存款都视为首充。<br>
                 3.满足条件的用户需在产生负盈利的次日（00:00:00至23:59:59）期间在本活动页面申请此优惠活动，逾期则视为自动放弃。<br>
                 4.申请获得的奖金将自动派发至用户指定的的电子游戏钱包中，活动奖金需在电子游戏中完成8倍流水即可转出。当用户对应电子钱包余额≤原钱包余额且无未结算注单时，系统将自动判定已完成活动规定的有效流水，活动流水未完成前不可再次申请本活动。<br>
                 5.此活动不与其他首存活动、救援金活动共享，每位用户每日仅限申请一次。<br>
                 6.PT电子游戏的负盈利计算以及有效流水不包括以下游戏：<activeptliushui></activeptliushui>。				<br>
                 7.每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能使用一个账号享受优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利。VKGAME对本活动保有最终解释权。
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
      custom-class="realperson_rescue_dialog_box"
      width="570px"
      :close-on-click-modal="false">
      <div class="dialog_wrapper sport_rescue_dialog">
        <p class="">救援金：{{initInfo.bouns}}元</p>
        <div >
          <span class="qianbao_tit">返利至：</span>
          <div class="qianbao">
            <div
            v-for="item in qianbaoarr"
            @click="qianbaoSelect(item)"
            :key="item.id"
            :class="[item.code,item.selected?'active':'']">{{item.name}}</div>
          </div>
        </div>
        <div class="btn">
          <a href="javascript:;" class="to_apply d_btn normal" @click="conApplyDialog">
            <div class="btn_loading_box " v-show="ajaxLoad"><span class="small_loading"></span></div>确定
          </a>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
export default {
  name: "slotrescue",
  components: {},
  data() {
    return {
      showDialog: false,
      qianbaoarr: [
        {name: "PT钱包",selected: true,id: 1,code: "PT" },
        {name: "PG钱包",selected: false,id: 2,code: "PG" }
      ],
      start_time: "",
      initInfo: {},
      selectedObj: {},
      ajaxLoad: false,
      load:false,
       activeSetting:{"first_deposit":500,"negative_profit":500,"percent":0.03,"percent_show":3,"max_bonus":688,"bet_times":8}
    };
  },
  mounted() {
    this.getSportRescueFundInit();
    this.selectedObj = this.qianbaoarr[0];
  },
  methods: {
    getSportRescueFundInit() {
      this.load = true
      this.$http(this.ApiSetting.active.getSlotRescueFundInit)
      .then(res => {
        this.load = false
        if (res.status == 1 && res.data) {
          this.initInfo = res.data;
          if(res.data.active_setting) {
           this.activeSetting = res.data.active_setting
          }
          let stime = new Date(res.data.active_start_time * 1000);
          this.start_time =
            stime.getFullYear() +
            "年" +
            (stime.getMonth() + 1) +
            "月" +
            stime.getDate() +
            "日";
        }
      })
      .catch(red=>{
        this.load = false
      });
    },
    showApplyDialog() {
      if (this.ajaxLoad) {
        return;
      }
      if (this.initInfo.status != 0 && this.initInfo.status != 1) {
        if(this.initInfo.status_tip) {
          this.$message({
            message: this.initInfo.status_tip,
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
        money: this.initInfo.bouns,
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
.tl{
  text-align: left !important;
}
.ag_active {
  background: url("../../../assets/active/pt_rescue_banner.jpg") no-repeat center top;
  position: relative;
}
.section_box_wrapper table {
  border: none;
  margin-top: 20px;
}
.section_box_wrapper table td  {
  width: 200px;
  border-color: #4b5064;
  text-align: center;
  line-height: 50px;
  /* height: 50px; */
 color: #8692b6;
}
.section_box_wrapper table td.btn {
  /* height: 100px; */
}
.section_box_wrapper table td strong {
  font-size: 16px;
  color: #f4d364;
}
.section_box_wrapper table tr:first-child td{
  color: #07f1b7;
  font-size: 16px;
}
.section_box_wrapper table td:nth-child(2),
.section_box_wrapper table td:nth-child(4) {
  background-color: #1c1e25;
}
.btn .to_apply {
  width: 92px;
  height: 25px;
  line-height: 25px;
  font-size: 12px;
}
.appplyed {
  cursor: default;
}
</style>
<style lang="less">
.realpersonrescue .realperson_rescue_dialog_box {
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
  .sport_rescue_dialog .qianbao div.PT {
    background-position: -510px -708px;
  }
  .sport_rescue_dialog .qianbao div.PG {
   background-position: -953px -1035px;
  }
  .sport_rescue_dialog .qianbao div.AS {
    background-position: -1173px -497px;
  }
  .sport_rescue_dialog .qianbao div.FUNFAIR {
    background-position: -954px -497px;
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
