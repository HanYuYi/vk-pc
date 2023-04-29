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
                  <th width="33%">每周累计体育流水额</th>
                  <th width="33%">彩金</th>
                  <th >彩金流水</th>
                </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="no_boder"></td>
                    <td class="no_boder"></td>
                    <td  rowspan="9">{{initInfo.active_bet_limit}}倍体育流水</td>
                  </tr>
                  <tr v-for="(item,index) in initInfo.active_setting" :key="index">
                    <td>{{index}}</td>
                    <td>{{item}}</td>
                  </tr>
                </tbody>
              </table>
              <div class="liushui_box">
                  <span class="liushui " v-if="!load&&isLogin&&initInfo.is_show_bet&&initInfo.is_monday&&!initInfo.is_first">
                    上周累计流水：{{initInfo.last_week.bet}}元&nbsp;&nbsp;|&nbsp;
                  </span>
                  <span class="liushui " v-if="!load&&isLogin&&initInfo.is_show_bet">本周累计流水：{{initInfo.this_week.bet}}元</span>
              </div>

               <div class="btn">
                 <div class="d_btn normal"  @click="showApplyDialog()" :class="{'disabled':!canget}">
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
               <p>
                1. 威客体育加油金需在本活动页面手动领取，每个自然周内累计流水达到对应的额度即可领取彩金，彩金领取时间为次周一00:00:00-23:59:59，指定时间内未领取视为自动放弃。<br>
                <!-- 2. 威客体育游戏包括：威客体育、平博体育、BTI体育，用户在领取加油金时选择将其领取至对应的体育游戏钱包，加油金需完成活动规定的3倍体育流水，活动流水未完成前不可再次申请。<br>	 -->
                2. 威客体育游戏包括：威客体育、平博体育，用户在领取加油金时选择将其领取至对应的体育游戏钱包，加油金需完成活动规定的3倍体育流水，活动流水未完成前不可再次申请。<br>
                3. 有效投注额仅计算产生输赢结果的注单，香港盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算等注单不计算为有效投注。	<br>
                4. 每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能使用一个账号享受优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利；VKGAME对本活动保有最终解释权。
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
      v-if="showDialog"
      :visible.sync="showDialog"
      custom-class="sport_rescue_dialog_box"
      width="693px"
      height="380px"
      :close-on-click-modal="false">
      <div class="dialog_wrapper sport_rescue_dialog">
        <p >加油金：{{initInfo.last_week.bouns}}元</p>
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
import { mapState } from 'vuex'
export default {
  name: "sportgas",
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
          name: "平博钱包",
          selected: false,
          classname: "qianbao_pingbo",
          id: 2,
          code: "PINNACLE"
        },  {
          name: "BTI钱包",
          selected: false,
          classname: "bti_sport",
          id: 3,
          code: "BTI"
        }
      ],
      start_time: "",
      initInfo: {},
      selectedObj: {},
      ajaxLoad: false,
      load:false
    };
  },
  mounted() {
    this.getSportRescueFundInit();
    this.selectedObj = this.qianbaoarr[0];
  },
  computed: {
    ...mapState(["isLogin"]),
    canget:function () {
      let canget = true;
      if(this.initInfo.is_login) {
        if(this.initInfo.is_monday&&this.initInfo.last_week.status==0) {
            canget = true
          }else {
            if(this.initInfo.this_week.status!=0) {
              canget = false
            }else {
              canget = true
            }
        }
      }
      return canget
    }
  },
  methods: {
    getSportRescueFundInit() {
      this.load = true
      this.$http(this.ApiSetting.active.getSportGasInit).then(res => {
        this.load = false
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
      })
      .catch(()=>{
        this.load = false
      });
    },
    showApplyDialog() {
      if(!this.canget) {
        return
      }
      if(this.initInfo.is_login) {
        if(this.initInfo.is_monday&&this.initInfo.last_week.status==0) {
          this.showDialog = true;
        }else {
          this.$message({
            message: '亲，您达到'+this.initInfo.this_week.bouns+'元彩金领取条件，请下周一来领取哦！	',
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
            this.$message({
              message: "恭喜您成功领取上周彩金！",
              type: "success"
            });
            this.initInfo.last_week.status = 1;
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
  background: url("../../../assets/active/sportsweek_banner.jpg") no-repeat center top;
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
  color: #fff;
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
  .sport_rescue_dialog .qianbao div:nth-child(2){
    margin-right: 16px;
  }

</style>
<style lang="less">
  .el-dialog__body{
    padding: 0px 0px 30px;
  }

.sportsweek .sport_rescue_dialog_box {
  border: none;
  background-color: #262933;
  .sport_rescue_dialog {
    font-size: 18px;
    color: #ffffff;
    padding: 0 47px;
    height: 260px;
  }
  .sport_rescue_dialog p {
    margin-bottom: 20px;
  }
  .sport_rescue_dialog .qianbao {
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
  }

  .sport_rescue_dialog .qianbao div.active {
    border: 1px solid #07e9f1;
  }
  .qianbao_tit {
    display: inline-block;
    vertical-align: top;
    margin-bottom:20px ;
  }
  .sport_rescue_dialog .qianbao_sport {
    background: url("../../../assets/icon_es.png") no-repeat;
    background-position: -953px -612px;
    margin-right: 16px;
  }
  .sport_rescue_dialog .qianbao_pingbo {
    background: url("../../../assets/icon_es.png") no-repeat;
    background-position: -1391px -926px;
  }
    .sport_rescue_dialog .bti_sport {
    background: url("../../../assets/icon_es.png") no-repeat;
      background-position: -294px -929px;
  }
  .sport_rescue_dialog .to_apply {
    margin-top: 50px;
    width: 135px;
    height: 34px;
    line-height: 34px;
    font-size: 16px;
  }
}
</style>
