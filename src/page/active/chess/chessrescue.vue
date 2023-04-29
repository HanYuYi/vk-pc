<template>
  <div class="ag_active active_page chesscardrescue">
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
              <div class="active_time tl">
                活动期间， 凡当日首充≥{{activeSetting.first_deposit}}且在威客棋牌游戏中累计产生负盈利≥{{activeSetting.negative_profit}}的玩家，即可申请棋牌游戏负盈利的{{activeSetting.percent_show}}%返利。<br>
                例：用户A当日首充{{activeSetting.first_deposit}}元，在棋牌游戏中累计负盈利{{activeSetting.negative_profit}}元，此时可申请领取{{activeSetting.negative_profit}}x{{activeSetting.percent_show}}%={{activeSetting.negative_profit*activeSetting.percent}}元的返利彩金。
              </div>
              <table border="1"  align="center" cellspacing="0" width="100%">
                <thead>
                <tr align="center">
                  <th>当日首充</th>
                  <th>棋牌负盈利</th>
                  <th>返利百分比</th>
                  <th>红利上限</th>
                  <th>红利流水倍数</th>
                  <th>今日可领{{initInfo.bouns}}元救援金</th>
                </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>≥{{activeSetting.first_deposit}}</td>
                    <td>≥{{activeSetting.negative_profit}}</td>
                    <td>{{activeSetting.percent_show}}%</td>
                    <td><strong>{{activeSetting.max_bonus}}</strong></td>
                    <td>棋牌游戏{{activeSetting.bet_times}}倍流水</td>
                    <td rowspan="2" class="btn" v-show="initInfo.status!=1">
                      <div class="to_apply d_btn normal" @click="showApplyDialog">
                        <div class="btn_loading_box " v-show="load "><span class="small_loading"></span></div>
                        立即申请
                      </div>
                    </td>
                    <td class="btn" v-show="initInfo.is_login==1&&initInfo.status==1"><a href="javascript:;" class="to_apply d_btn disabled appplyed">已领取</a></td>
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
               <p>
                 1. 棋牌游戏包括：乐游棋牌、开元棋牌、凯旋棋牌、博乐棋牌。<br>
                 2. VIP会员每日未提款前的累计有效存款都视为首充。<br>
                 3. 满足条件的用户需在产生负盈利的次日（00:00:00至23:59:59）期间在本活动页面申请此优惠活动，逾期则视为自动放弃。<br>
                 4. 申请获得的奖金将自动派发至用户指定的的棋牌游戏钱包中，活动奖金需在棋牌游戏中完成8倍流水即可转出。当用户对应棋牌钱包余额≤原钱包余额且无未结算注单时，系统将自动判定已完成活动规定的有效流水，活动流水未完成前不可再次申请本活动。<br>
                 5. 此活动不与其他首存活动、救援金活动共享，每位用户每日仅限申请一次。<br>
                 6. 每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能使用一个账号享受优惠。对违规的用户，VKGAME保留无限期审核， 和扣回红利及所产生的利润权利。<br>
                 7. VKGAME官方对本活动保有最终解释权。
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
        <div class="btn"><a href="javascript:;" class="to_apply d_btn normal" @click="conApplyDialog">确定</a></div>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
export default {
  name: "chessrescue",
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
      start_time: "",
      initInfo: {},
      selectedObj: {},
      ajaxLoad: false,
      activeSetting:{"first_deposit":500,"negative_profit":500,"percent":0.03,"percent_show":3,"max_bonus":588,"bet_times":8}
    };
  },
  mounted() {
    this.getSportRescueFundInit();
    this.selectedObj = this.qianbaoarr[0];
  },
  methods: {
    getSportRescueFundInit() {
      this.$http(this.ApiSetting.active.getChessRescueFundInit).then(res => {
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
      });
    },
    showApplyDialog() {
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
.ag_active {
  background: url("../../../assets/active/chesscardrescue-banner.jpg") no-repeat center top;
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
.chesscardrescue .chesscard_rescue_dialog_box {
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
