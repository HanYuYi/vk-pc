<template>
  <div class="active_page esportsrelive">
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
                活动期间，VIP会员在指定电竞游戏中参与【CSGO ESL职业联赛S13】赛事投注，若单笔注单结算为负盈利，即可领取复活助力金。
                  <!-- 活动期间，VIP会员在指定电竞游戏中参与【CSGO IEM世界冠军赛】赛事投注，若单笔注单结算为负盈利，即可领取复活助力金。					 -->
              </div>
              <table border="1"  align="center" cellspacing="0" width="100%">
                <tr>
                  <td  class="color_07f1b7" width="223">投注场馆要求</td>
                  <td   class="color_07f1b7">最低负盈利金额</td>
                  <td colspan="5"  class="color_07f1b7">负盈利返还比</td>
                   <td   class="color_07f1b7">复活金上限</td>
                   <td   class="color_07f1b7">彩金流水要求</td>

                </tr>
                  <tr>
                  <td >小艾电竞</td>
                  <td   rowspan="3" >500</td>
                  <td   rowspan="3"  colspan="5" >10%</td>
                  <td   rowspan="3" >188</td>
                  <td   rowspan="3" width="136">电竞游戏一倍流水</td>
                </tr>
                 <tr>
                  <td >小艾彩池电竞</td>
                </tr>
                  <tr>
                  <td >IM电竞</td>
                </tr>

              </table>


               <div  class="ffft" v-show="isLogin && initInfo.status !== 0" >   {{ initInfo.status_tips }} </div>



              <div class="btn">
                <!-- <div href="javascript:;" class="to_apply d_btn normal" @click="showApplyDialog"
                :class="{'disabled':isLogin&&(initInfo.status==1||initInfo.status==3||initInfo.status==4)}">
                {{isLogin&&initInfo.status==1?'已领取':'立即领取'}}
                </div> -->

                     <div href="javascript:;" class="to_apply d_btn normal" @click="showApplyDialog"
                  :class="{'disabled':isLogin && (initInfo.status !=0)}">
                      {{isLogin&&initInfo.status==1?'已领取':'申请复活金'}}
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
                    1.此活动仅限在指定电竞游戏中单笔投注【CSGO ESL职业联赛S13】相关盘口，且注单为负盈利【全输】的注单号方符合申请资格。<br>
                    2.符合条件的会员需在注单结算后的24小时内在活动页面填写注单号进行申请，逾期则视为自动放弃。<br>
                    3.申请获得的奖金将自动派发至会员所选择的的电竞游戏钱包中，活动奖金需在电竞游戏中完成1倍流水即可转出；当会员对应电竞游戏钱包余额≤原电竞钱包余额且无未结算注单时，系统将自动判定已完成活动规定的有效流水，活动流水未完成前不可再次申请本活动。<br>
                    4.此活动不与电竞首存活动、PT首存活动、LPL春季赛救援金活动、打虎英雄救援金活动、棋牌游戏救援金活动、VIP月救援金活动共享，每位会员每日仅限申请一次。<br>
                    5.有效投注额仅计算产生输赢结果的注单，电竞赔率＜1.45、注单取消、对冲、未结算等注单不计算为有效投注。<br>
                    6.每位有效玩家、每一手机号码、电子邮箱、相同银行卡、每一个IP地址、每一台电脑者只能享受一次优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利。VKGAME对本活动保有最终解释权。

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
          请选择复活金转入的钱包：
        </div>

        <div class="esportsrelive_dialog_box clearfix">
          <!-- <div class="box_title">领取至：</div> -->
          <div class="  clearfix">
            <div class="wallet_box"
            v-for="item in walletList"
            :key="item.code"
            :class="[{'active': item.selected}, item.code]"
            @click="hanldeWalletSelect(item)">
              {{item.name}}
            </div>
          </div>
               <div class="box_title">请填入申请注单的单号：</div>
                <input type="text" v-model="NoteTheSingleNum"  class="ivu-input">
        </div>

        <div class="dialog_btn btn">
          <span class="d_btn normal" @click="conApplyDialog">立即申请</span>
        </div>
      </div>


    </el-dialog>


  </div>
</template>
<script type="text/javascript">
import { mapState } from 'vuex'
export default {
  name: 'esportsrelive',
  components: {},
  data() {
    return {
      NoteTheSingleNum:"",

      showDialog: false,
      start_time:'',
      initInfo:{},
      selectedObj:{},
      ajaxLoad:false,
      load:false,
      walletList: [
        {name:"小艾电竞钱包",selected:true,id:1,code:"EG"},
        {name:"IM电竞钱包",selected:false,id:2,code:"IM"},
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
      this.$http(this.ApiSetting.active.getEsportsReliveBonusInit)
      .then(res => {
        this.load = false
        if(res.status == 1 && res.data) {
          this.initInfo = res.data;
        }
      },err=>{
        this.load = false
      })
    },
    showApplyDialog () {
      if(!this.isLogin) {
        this.$message({
          message: '请您先登录!',
          type: 'warning'
        })
        return
      }else{
          if (this.initInfo.status == 0) { //只有status==0才可以领取
          this.showDialog = true;
        }else{
          return
        }

      }
    },
    hanldeWalletSelect (item) {
      this.walletList.forEach((v, i) => {
        v.selected =  false
      })
      this.walletList[item.id-1].selected = true;
      this.selectedObj = this.walletList[item.id-1];
    },
    conApplyDialog() {
        if(this.NoteTheSingleNum==""){
          this.$message({
          message: "请填写注单的单号",
          type: 'warning'
        })
        }else{

      this.$http(this.ApiSetting.active.joinEsportsReliveBonus,{
           wallet:this.selectedObj.code,
           bet_no:this.NoteTheSingleNum,
      })
      .then(res => {
        if(res.status == 1) {
          if(res.data.bonus){
              this.$message({
              message: '恭喜您成功领取'+ res.data.bonus +"元彩金!",
              type: 'success'
            })
          }else{
              this.$message({
              message:"领取成功!",
              type: 'success'
            })
          }
          this.initInfo.status = 1
          this.showDialog = false
        }
      }, err => {
      })
      }

    },
  }
}
</script>
<style lang="less" scoped>
.esportsrelive{
  background: url("../../../assets/active/esportsrelive.jpg") no-repeat center top;
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
.esportsrelive_rescue_dialog {
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



// width: 230px;
//     border-color: #7c839f;
// }
// .ivu-input {
//     -webkit-box-sizing: border-box;
//     box-sizing: border-box;
//     display: inline-block;
//     width: 100%;
//     height: 34px;
//     line-height: 34px;
//     padding: 0 10px;
//     border: 1px solid #343944;
//     background-color: #262933;
//     border-radius: 18px;
//     color: #fff;
//     font-size: 14px;
//     background-image: none;
//     position: relative;
//     cursor: text;



</style>
