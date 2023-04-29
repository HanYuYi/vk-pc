<template>
  <div class="ag_active active_page sportrescueactive">
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
              <div class="active_time">
                活动期间，凡当日首充≥500且在体育游戏中累计产生负盈利≥500的玩家，即可申请体育游戏救援金的3%返利。<br/>
                例：用户A当日首充500元，在体育游戏中累计负盈利500元，此时可申请领取500x3%=15元的返利彩金。
              </div>
              <table border="1"  align="center" cellspacing="0" width="100%">
                <thead>
                <tr align="center">
                  <th>当日首充</th>
                  <th>体育负盈利</th>
                  <th>返利百分比</th>
                  <th>红利上限</th>
                  <th>红利流水倍数</th>
                  <th>今日可领{{initInfo.bouns}}元救援金</th>
                </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>≥500</td>
                    <td>≥500</td>
                    <td>3%</td>
                    <td>588</td>
                    <td>体育游戏6倍流水</td>
                    <td class="btn" v-show="initInfo.is_login==0||(initInfo.is_login==1&&initInfo.status!=1)"><a href="javascript:;" class="to_apply d_btn normal" @click="showApplyDialog">立即申请</a></td>
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
                 1. 体育游戏包括：威客体育、平博体育、BTI体育。<br>
                 2. VIP会员每日未提款前的累计有效存款都视为首充。<br>
                 3. 满足条件的用户需在产生负盈利的次日（00:00:00至23:59:59）期间在本活动页面申请此优惠活动，逾期则视为自动放弃。<br>
                 4. 申请获得的奖金将自动派发至用户选择的体育游戏钱包中，活动奖金需在体育游戏中完成6倍流水即可转出；当用户对应体育游戏钱包余额≤原体育钱包余额且无未结算注单时，系统将自动判定已完成活动规定的有效流水，活动流水未完成前不可再次申请本活动。<br>
                 5. 此活动不与新用户首存活动、其他救援金活动共享，每位用户每日仅限申请一次。<br>
                 6. 有效投注额仅计算产生输赢结果的注单，香港盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算等注单不计算为有效投注。<br>
                 7. 每位有效玩家、每一手机号码、电子邮箱、相同银行卡、每一个IP地址、每一台电脑者只能享受一次优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利。VKGAME对本活动保有最终解释权。
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
      custom-class="sport_rescue_dialog_box"
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
            :class="[item.classname,item.selected?'active':'']">{{item.name}}</div>
          </div>
        </div>
        <div class="btn"><a href="javascript:;" class="to_apply d_btn normal" @click="conApplyDialog">确定</a></div>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
export default {
  name: "sportsweek",
  components: {},
  data() {
    return {
      showDialog: false,
      qianbaoarr: [
        {
          name: "威客体育钱包",
          selected: true,
          classname: "qianbao_sport",
          id: 1,
          code: "SABACV"
        },
        {
          name: "平博体育钱包",
          selected: false,
          classname: "qianbao_pingbo",
          id: 2,
          code: "PINNACLE"
        },
        {
          name: "BTI钱包",
          selected: false,
          classname: "qianbao_bti",
          id: 3,
          code: "BTI"
        }
      ],
      start_time: "",
      initInfo: {},
      selectedObj: {},
      ajaxLoad: false
    };
  },
  mounted() {
    this.getSportRescueFundInit();
    this.selectedObj = this.qianbaoarr[0];
  },
  methods: {
    getSportRescueFundInit() {
      this.$http(this.ApiSetting.active.getSportRescueFundInit).then(res => {
        if (res.status == 1 && res.data) {
          this.initInfo = res.data;
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
      // if(this.initInfo.is_login == 0) {
      //   this.$message({
      //     message: '请您先登录!',
      //     type: 'warning'
      //   })
      //   return
      // }
      if (this.initInfo.status != 0 && this.initInfo.status != 1) {
        this.$message({
          message: this.initInfo.status_tip,
          type: "warning"
        });
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
  background: url("../../../assets/active/sportrescue.jpg") no-repeat center top;
  position: relative;
}
/* .ag_active .txt {
  position: absolute;
  top:0;
  left: 50%;
  transform: translateX(-50%);
  width: 1178px;
  height: 590px;
  background:url("../../../assets/active/sportrescue/txt.png") no-repeat;
} */
.section_box_wrapper table {
  border: none;
  margin-top: 20px;
}
.section_box_wrapper table td,
.section_box_wrapper table th {
  border-color: #303344;
  text-align: center;
  line-height: 50px;
  color: #fff;
}
.section_box_wrapper table th {
  color: #a3a3fd;
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
.sportrescueactive .sport_rescue_dialog_box {
  border: none;
  background-color: #262933;
  .sport_rescue_dialog {
    font-size: 18px;
    color: #ffffff;
    padding: 0 36px;
    //height: 260px;
  }
  .sport_rescue_dialog p {
    margin-bottom: 40px;
  }
  .sport_rescue_dialog .qianbao {
    width: 413px;
    font-size: 14px;
    display: inline-block;
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
    margin: 0 16px 16px 0;
  }
  .sport_rescue_dialog .qianbao div.active {
    border: 1px solid #07e9f1;
  }
  .qianbao_tit {
    display: inline-block;
    vertical-align: top;
  }
  .sport_rescue_dialog .qianbao_sport {
    background: url("../../../assets/icon_es.png") no-repeat;
    background-position: -953px -612px;
  }
  .sport_rescue_dialog .qianbao_pingbo {
    background: url("../../../assets/icon_es.png") no-repeat;
    background-position: -1391px -926px;
  }
  .sport_rescue_dialog .qianbao_bti {
    background: url("../../../assets/icon_es.png") no-repeat;
    background-position: -294px -929px;
  }
  .sport_rescue_dialog .to_apply {
    width: 135px;
    height: 34px;
    line-height: 34px;
    font-size: 16px;
  }
}
</style>
