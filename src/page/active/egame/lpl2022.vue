<template>
  <div class="active_page s10rescue">
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
                {{initInfo.active_show_time}}
              </div>
            </div>
          </div>
          <div class="active_section_box">
            <div class="active_title">
              活动内容
            </div>
            <div class="active_time" v-if="load">
            <span class="small_loading" ></span>
            </div>
            <div class="section_box_wrapper" v-else>
              <div class="active_time">
                活动期间， 凡当日首充≥500且在电竞游戏（LPL春季赛）中累计产生负盈利≥500的会员，即可在次日领取电竞负盈利的救援金。
              </div>
              <table border="1"  align="center" cellspacing="0" width="100%">
                <tr>
                  <td rowspan="2" class="color_07f1b7" width="104">领取条件</td>
                  <td  width="136">当日首充</td>
                  <td colspan="5">当日首充≥500且在指定游戏场馆中投注2022英雄联盟LPL春季赛相关盘口。</td>
                </tr>
                <tr>
                  <td width="136" class="textl">当日累计负盈利</td>
                  <td v-for="(item,index) in initInfo.active_setting"
                  :key="index">≥{{item.profit}}</td>
                </tr>
                <tr class="color_f4d363">
                  <td colspan="2" class="color_07f1b7">次日可领取复活金</td>
                  <td v-for="(item,index) in initInfo.active_setting"
                  :key="index">{{item.bonus}}元</td>
                </tr>
                <tr>
                  <td colspan="2" class="color_07f1b7">彩金流水限制</td>
                  <td colspan="5">电竞游戏1倍流水</td>
                </tr>
              </table>
              <!--0 可领 1已领取 3 已参与互斥活动 4 昨日未达到领取条件 2有流水未完成  其他-->
              <p class="ffft"
               v-show="isLogin&&(initInfo.status==0 || initInfo.status==3 || initInfo.status==4 || initInfo.status==2)">
               {{initInfo.status_tips}}
              </p>
              <div class="btn">
                <div href="javascript:;" class="to_apply d_btn normal" @click="showApplyDialog"
                :class="{'disabled':isLogin&&(initInfo.status==1 || initInfo.status==3 || initInfo.status==4 || initInfo.status==2)}">
                {{isLogin&&initInfo.status==1?'已领取':'立即领取'}}
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
                1. 电竞游戏场馆仅限：小艾电竞、IM电竞，本活动每日结算时的盈亏将累计计算。例：会员A当日首充≥500，投注指定赛事结算后，小艾电竞盈利5000，IM电竞负盈利10000，则该会员当日累积结算为负盈利5000，次日可领取88元的救援彩金。<br>
                2. VIP会员每日未提款前的累计有效存款都视为首充。<br>
                3. 满足条件的会员需在产生负盈利的次日（00:00:00至23:59:59）期间在本活动页面申请此优惠活动，逾期则视为自动放弃。<br>
                4. 申请获得的奖金将自动派发至会员所选择的的电竞游戏钱包中，活动奖金需在电竞游戏中完成1倍流水即可转出；当会员对应电竞游戏钱包余额≤原电竞钱包余额且无未结算注单时，系统将自动判定已完成活动规定的有效流水，活动流水未完成前不可再次申请本活动。<br>
                5. 此活动不与电竞首存活动、PT首存活动、打虎英雄救援金活动、棋牌游戏救援金活动、VIP月救援金活动共享，每位会员每日仅限申请一次。<br>
                6. 有效投注额仅计算产生输赢结果的注单，电竞赔率＜1.5，走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效投注。<br>
                7. 每位有效玩家、每一手机号码、电子邮箱、相同银行卡、每一个IP地址、每一台电脑者只能享受一次优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利。VKGAME对本活动保有最终解释权。<br>
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
      custom-class="s10rescue_rescue_dialog"
      width="688px"
      :close-on-click-modal="false">
      <div class="dialog_wrapper">
        <div class="s10rescue_dialog_box clearfix money">
          今日可领彩金：{{initInfo.today_bonus}}元
        </div>
        <div class="s10rescue_dialog_box clearfix">
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
          <span class="d_btn normal" @click="conApplyDialog">{{$t('determine')}}</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
import { mapState } from 'vuex'
export default {
  name: 's10rescue',
  components: {},
  data() {
    return {
      showDialog: false,
      start_time:'',
      initInfo:{},
      selectedObj:{},
      ajaxLoad:false,
      load:false,
      walletList: [
        {name: "小艾电竞钱包", selected: true, id: 1, code: "EG"},
        {name: "IM电竞钱包", selected: false, id: 3, code: "IM"}
      ]
    }
  },
  computed: {
    ...mapState(["isLogin"])
  },
  mounted () {
    this.getInit()
    this.selectedObj = this.walletList[0]
  },
  methods: {
    getInit() {
      this.load = true
      this.$http(this.ApiSetting.active.getS10ResuceInit)
      .then(res => {
        this.load = false
        if(res.status == 1 && res.data) {
          console.log(res.data)
          this.initInfo = res.data;
        }
      },err=>{
        this.load = false
      })
    },
    showApplyDialog () {
      //0 可领 1已领取 3 已参与互斥活动 4 最日未达到领取条件  其他
      if(!this.isLogin) {
        this.$message({
          message: '请您先登录!',
          type: 'warning'
        })
        return
      }
      if(this.isLogin&&(this.initInfo.status==1 || this.initInfo.status==3 || this.initInfo.status==4 || this.initInfo.status==2)) {
        return
      }
      if(this.initInfo.status !=0 ) {
        this.$message({
          message: this.initInfo.status_tips,
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
        money:this.initInfo.today_bonus,
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
<style lang="less" scoped>
.s10rescue{
  background: url("../../../assets/active/lpl2022_banner.png") no-repeat center top;
  .active_page_content {
    padding: 30px 190px 30px !important;
  }
  .color_f4d363 {
    color: #f4d363;
  }
  .textl {
    text-align: left;
    padding-left: 20px;
  }
  .ffft {
    color: #fff;
    margin-top:25px ;
    text-align: center;
  }
  table {
    border: none;
    margin-top: 20px;
    .color_07f1b7 {
      font-size: 16px;
      text-align: left;
      padding-left: 20px;
    }
    td{
      box-sizing: border-box;
      border-color: #303344;
      text-align: center;
      line-height: 50px;
    }
  }
  .section_box_wrapper .btn {
    margin-top: 25px;
    text-align: center;
    .to_apply{
     width: 128px;
     height: 35px;
      line-height: 35px;
      font-size: 17px;
    }
  }
}
 </style>
 <style lang="less">
.s10rescue_rescue_dialog {
  &.el-dialog {
    border: none;
    .el-dialog__body {
      padding: 0px 38px 30px;
      position: relative;
      background-color: #262933;
      color: #fff;
      font-size: 18px;
    }
    .s10rescue_dialog_box {
      &.money {
        margin-bottom: 36px;
      }
      .box_title {
        height: 30px;
        line-height: 30px;
        color: #fff;
        margin-bottom: 20px;
      }
    }
    .wallet_box {
      font-size: 14px;
      padding: 0 0 0 8px;
      line-height: 88px;
      &:nth-child(3n) {
        margin-right: 0;
      }
    }
  }
}

</style>
