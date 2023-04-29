<template>
  <div class="ag_active active_page sportsweek">
    <!-- <div class="txt"></div> -->
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

              <table border="1" v-show="!load" align="center" cellspacing="0" width="100%">
                <thead>
                <tr align="center">
                  <th  >一周有效总流水</th>
                  <th v-for="(item,index) in initInfo.active_setting" :key="index">{{item.level_cn}}</th>
                  <th >彩金流水限制</th>
                </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="no_boder"></td>
                    <td class="no_boder"></td>
                    <td class="no_boder"></td>
                    <td class="no_boder"></td>
                    <td  :rowspan="bounskeys.length+1">真人游戏{{initInfo.bet_times}}倍有效流水</td>
                  </tr>
                  <tr v-for="(item,index) in bounskeys" :key="index">
                    <td>{{item}}+</td>
                    <td v-for="(itemel,indexel) in initInfo.active_setting" :key="indexel">{{itemel.bouns[item]}}</td>
                  </tr>
                </tbody>
              </table>

              <div class="liushui_box">
                  <!--initInfo.is_first 表示活动第一周-->
                  <span class="liushui "
                    v-if="!load&&isLogin&&initInfo.is_show_bet&&initInfo.is_monday&&!initInfo.is_first">
                    上周累计流水：{{initInfo.last_week.bet}}元<br>
                  </span>
                  <span class="liushui"
                    v-if="!load&&isLogin&&initInfo.is_show_bet">
                    本周累计流水：{{initInfo.this_week.bet}}元
                  </span>
              </div>

               <div class="btn">
                 <div class="d_btn normal"  @click="showApplyDialog()" >
                   <div class="btn_loading_box " v-show="load"><span class="small_loading"></span></div>
                   立即领取
                 </div>
               </div>
            </div>
          </div>
          <div class="active_section_box">
            <div class="active_title">
              {{$t("Activity_rules")}}
            </div>
            <div class="section_box_wrapper">
              <div class="active_desc">
               1. 真人游戏彩金需在本活动页面手动领取，每个自然周内累计流水达到对应的额度即可领取彩金，彩金领取时间为次周一00:00:00-23:59:59，指定时间内未领取视为自动放弃。<br>
               2. 此活动彩金将根据每周一领取彩金的当天，会员的VIP等级为计算标准。<br>
               3. 真人游戏包括：AG真人、欧博真人、PT真人，用户在领取彩金时选择将其领取至对应的真人游戏钱包，彩金需完成活动规定的3倍有效流水，活动流水未完成前不可再次申请。<br>
               4. 每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能使用一个账号享受优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利；VKGAME对本活动保有最终解释权。
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
        <p class="">可领彩金：{{initInfo.last_week.bouns}}元</p>
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
  name: "realpersonweek",
  components: {},
  data() {
    return {
      showDialog: false,
      qianbaoarr: [
        {name: "AG钱包",selected: true,id: 1,code: "AG" },
        {name: "欧博钱包",selected: false,id: 2,code: "ALLBET" },
        {name: "PT钱包",selected: false,id: 3,code: "PT" }
      ],
      start_time: "",
      initInfo: {},
      selectedObj: {},
      ajaxLoad: false,
      load:false,
      bounskeys:[]
    };
  },
  mounted() {
    this.getInit(1);
    this.selectedObj = this.qianbaoarr[0];
  },
  computed: {
    ...mapState(["isLogin"]),
  },
  methods: {
    getInit(bool) {
      if(bool) {
        this.load = true
      }
      this.$http(this.ApiSetting.active.getRealpersonWeekBettingInit).then(res => {
        this.load = false
        if (res.status == 1 && res.data) {
          this.initInfo = res.data;
          if(this.initInfo.active_setting && this.initInfo.active_setting[0] && this.initInfo.active_setting[0].bouns) {
            this.bounskeys = Object.keys(this.initInfo.active_setting[0].bouns)
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
      .catch(()=>{
        this.load = false
      });
    },
    showApplyDialog() {
      if(this.isLogin) {
        if(this.initInfo.is_monday&&this.initInfo.last_week.status==0) {
          this.showDialog = true;
        }else {
          this.$message({
            message:  this.initInfo.status_tip,
            type: "warning"
          });
        }
      }else {
        this.$message({
          message: '请先登录',
          type: "warning"
        });
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
        money: this.initInfo.last_week.bouns,
        active_id: this.initInfo.active_id
      }).then(
        res => {
          if (res.status == 1) {
            this.getInit();
            this.$message({
              message: "恭喜您成功领取上周彩金！",
              type: "success"
            });
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
  background: url("../../../assets/active/realpersonweek_banner.jpg") no-repeat center top;
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
  color: #c3c3c3;
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
  color: #fff;
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
.sportsweek .sport_rescue_dialog_box {
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
    width: auto;
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
