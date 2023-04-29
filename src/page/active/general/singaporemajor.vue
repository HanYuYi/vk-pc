<template>
  <div class="active_page  singaporemajor vipriserank">
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
              {{$t('Active_content')}}
            </div>
            <div class="active_time" v-if="load" >
            <span class="small_loading" ></span>
            </div>
            <div class="section_box_wrapper" v-else>
              <div class="active_time">
                  活动期间，每日首充≥100且在【DOTA2 新加坡Major】中累计有效流水≥888元的会员，即可进行签到领取彩金。
              </div>


              <table border="1"  align="center"   cellspacing="0"  width="100%" text-nowrap  class="Sign">
                <tr>
                  <td class="color_07f1b7"  colspan="5" width="50%">3月</td>
                  <td class="color_07f1b7"  colspan="5" width="50%">4月</td>
                </tr>
                <tr>
                  <td >27日</td>
                  <td >28日</td>
                  <td >29日</td>
                  <td >30日</td>
                  <td >31日</td>
                  <td >01日</td>
                  <td >02日</td>
                  <td >03日</td>
                  <td >04日</td>
                </tr>
                <tr >

                  <td  v-for="(item,index) in initInfo.sign_status" :key="index"  >
                      <div  class="color_07f1b9"   v-if="item.status==1" > <p><img class="confirm" src="../../../assets/active/singaporemajor/confirm_icon.png" alt=""></p>  <p>已签到</p>  <p>+{{item.bonus}}元</p> </div>
                          <div   v-else-if="item.status==0"  @click="SignIn(item.status,item,index)"><div class="btn  tab_td_btn"><div class=" d_btn normal ">签到</div></div>   </div>

                      <div  v-else-if="item.status==5" >未签到</div>
                  <div  v-else-if="item.status==2" @click="SignIn(item.status,item)"><div class="btn  tab_td_btn"><div class=" d_btn normal ">签到</div></div> </div>
                  <div  v-else-if="item.status==3"  @click="SignIn(item.status,item)"><div class="btn  tab_td_btn"><div class=" d_btn normal ">签到</div></div> </div>
                  <div  v-else-if="item.status==4"  @click="SignIn(item.status,item)"><div class="btn  tab_td_btn"><div class=" d_btn normal ">签到</div></div> </div>

                   <div  v-else-if="item.status==6"  @click="SignIn(item.status,item)" ><div class="btn  tab_td_btn"><div class=" d_btn normal ">签到</div></div> </div>
                   <div v-else >签到</div>
                      </td>
                </tr>

              </table>


                <p class="table_title"  v-if="initInfo.total_bonus!==0" >
                   <span  v-if="initInfo.sign_day!==0">已连续签到 {{initInfo.sign_day}} 天，</span>
                   <span>累计已领 {{initInfo.total_bonus}}元彩金</span>
                 </p>

                    <table border="1"  align="center" cellspacing="0" width="100%">
                <tr>
                  <td class="color_07f1b7">连续签到天数</td>
                  <td v-for="(item,index) in 9"
                  :key="index">第{{item}}天</td>
                </tr>


                <tr >
                  <td class="color_07f1b7">当日可获得</td>
                  <td>8元</td>
                  <td>12元</td>
                   <td> 18元</td>
                   <td>28 元</td>
                   <td> 38元</td>
                   <td> 52元</td>
                   <td>66 元</td>
                   <td> 78元</td>
                   <td>88 元</td>
                </tr>


                 <tr>
                  <td class="color_07f1b7">累计可获得</td>
                  <td>8元</td>
                  <td>20元</td>
                   <td> 38元</td>
                   <td>66 元</td>
                   <td> 104元</td>
                   <td> 156元</td>
                   <td>222 元</td>
                   <td> 300元</td>
                   <td>388 元</td>
                </tr>


                <tr>
                  <td class="color_07f1b7">投注场馆要求</td>
                  <td colspan="9">小艾电竞、小艾彩池电竞、IM电竞。</td>
                </tr>

                   <tr>
                  <td class="color_07f1b7">彩金流水要求</td>
                  <td colspan="9">电竞游戏1倍流水</td>
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
                  1.电竞游戏场馆仅限：小艾电竞、小艾彩池电竞、IM电竞，有效流水将累计计算以上所有电竞游戏。<br>
                 	2. VIP会员每日未提款前的累计有效存款都视为首充。<br>
                     	3.符合条件的会员需在当日00:00：00-23:59:59进行签到，逾期则视为自动放弃；若会员在签到过程中出现断签，连续签到天数将重新计算.
                  	例：会员A连续签到3日，第4日没有进行签到，会员A第5天再次签到时将重新计算，此时会员签到可获得8元彩金。<br>
                      	4.申请获得的奖金将自动派发至会员所选择的的电竞游戏钱包中，活动奖金需在电竞游戏中完成1倍流水即可转出；当会员对应电竞游戏钱包余额≤原电竞钱包余额且无未结算注单时，系统将自动判定已完成活动规定的有效流水，活动流水未完成前不可再次申请本活动。<br>
               	5.有效投注额仅计算产生输赢结果的注单，电竞赔率＜1.45、注单取消、对冲、未结算等注单不计算为有效投注。	<br>
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
           恭喜，今日签到获得{{itemObj.bonus}}彩金，选择转入：
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
               <!-- <div class="box_title">请填入申请注单的单号：</div>
                <input type="text" v-model="NoteTheSingleNum"  class="ivu-input"> -->
        </div>

        <div class="dialog_btn btn">
          <span class="d_btn normal" @click="conApplyDialog">确定</span>
        </div>
      </div>


    </el-dialog>


  </div>
</template>
<script type="text/javascript">
import { mapState } from 'vuex'
export default {
  name: 'singaporemajor',
  components: {},
  data() {
    return {
      initInfo:{},
      ajaxLoad:false,
      load:false,
        itemObj:{},
      showDialog: false,
       walletList: [
        {name:"小艾钱包",selected:true,id:1,code:"EG"},
        {name:"IM钱包",selected:false,id:2,code:"IM"},
      ],

      index:"",

       selectedObj:{},
        // NoteTheSingleNum:"",
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
       hanldeWalletSelect (item) {
      this.walletList.forEach((v, i) => {
        v.selected =  false
      })
      this.walletList[item.id-1].selected = true;
      this.selectedObj = this.walletList[item.id-1];
     },
    getInit() {
      this.load = true
      this.$http(this.ApiSetting.active.getSingaporeMajorInit)
      .then(res => {
        this.load = false
        if(res.status == 1 && res.data) {
          this.initInfo = res.data;
        }
      },err=>{
        this.load = false
      })
    },

        SignIn(status,item,index){
         this.itemObj=item
      if(status==6 || !this.isLogin){
          this.$message({
          type: "warning",
          message: "请您先登录!",
        });
        return;
      }
      if(status==2 || status==3 || status==4 ){
           this.$message({
            type: "warning",
            message: item.status_tips,
          });
          return;
      }else if(status==0){
          this.showDialog = true;
          this.index=index
      }else{
          return;
      }

    },

    conApplyDialog(){
       if(this.ajaxLoad){
        return;
      }
      this.ajaxLoad = true
      this.$http(this.ApiSetting.user.transferSubmit,{
        from:"NM",
        to:this.selectedObj.code,
        money:this.itemObj.bonus,
        active_id:this.initInfo.active_id
      })  .then(res => {
        if(res.status == 1) {
            this.initInfo.sign_status[this.index].status=1;
            this.initInfo.sign_day=res.data.sign_day
            this.initInfo.total_bonus=res.data.total_bonus
          //  this.getInit()
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
.color_07f1b9{
  color: #07f1b9;
}

// .col_red{
//     color:red
// }
.table_title{
    margin :29px auto  25px auto;
    font-size: 14px;
    text-align: center;
     color: #ffffff;
}
.tab_td_btn{
    margin-top:0px  !important;
    .d_btn{
     width: 64px !important;
}
}

.confirm{
    width: 14px;
    height: 14px;

}

.vipriserank .Sign tr:nth-child(3){
  td{
     line-height: 1;
     height: 100px;
             white-space: normal  !important;
             width: calc(100% /9) !important;

     p{
         line-height: 26px;

     }
  }
}


.vipriserank{
  background: url("../../../assets/active/singaporemajor_banner.jpg") no-repeat center top;
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
      padding:0px 42px 24px 42px;
      position: relative;
      background-color: #262933;
      color: #fff;
      font-size: 18px;
    }
    .esportsrelive_dialog_box {
      &.money {
        margin-bottom: 20px;
      }
      // .box_title {
      //   height: 30px;
      //   line-height: 30px;
      //   color: #fff;
      //   margin-bottom: 16px;
      // }
      // .ivu-input{
      //   border-radius: 0px;
      // }

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
