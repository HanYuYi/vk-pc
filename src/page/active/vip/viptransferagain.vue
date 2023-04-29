<template>
  <div class="viptransferagain active_page">
    <div class="active_page_wrapper">
      <div class="wrapper">
        <div class="top_bg">
          <div class="bg1"></div>
          <div class="bg2"></div>
        </div>
        <div class="active_page_content">
          <div class="active_section_box">
            <div class="active_title">
              {{$t("The_activity_time")}}
            </div>
            <div class="section_box_wrapper">
              <div class="active_time">
               {{initInfo.active_show_time}}
              </div>
            </div>
          </div>
          <div class="active_section_box">
            <div class="active_title">
              {{$t("Active_content")}}
            </div>
            <div class="section_box_wrapper ">
              <div class="active_time">
                满足条件的VIP会员每个自然月内可申请一次单笔再存优惠，彩金最高可获1588元！

                <div class="table_box">
                <table class="table_bg">
                  <tr v-for="i in 5" :key="i">
                    <td v-for="j in 14" :key="j"></td>
                  </tr>
                </table>
                <table class="table_true">
                  <tr>
                    <td>等级</td>
                    <td v-for="j in 13" :key="j">VIP{{j-1}}</td>
                  </tr>
                  <tr>
                    <td>单笔存款要求</td>
                    <td>-</td>
                    <td colspan="3">≥500</td>
                    <td colspan="5">≥1000</td>
                    <td colspan="4">≥2000</td>
                  </tr>
                  <tr>
                    <td>再存优惠比例</td>
                    <td>-</td>
                    <td colspan="3">8%</td>
                    <td colspan="5">15%</td>
                    <td colspan="4">25%</td>

                  </tr>
                  <tr>
                    <td>再存最高彩金</td>
                    <td>-</td>
                    <td v-for="j in tableArr.length" :key="j">{{tableArr[j-1]}}元</td>
                  </tr>
                  <tr>
                    <td>彩金流水要求<br>(全站)</td>
                    <td>-</td>
                    <td colspan="3">(本金+彩金)*15</td>
                    <td colspan="5">(本金+彩金)*20</td>
                    <td colspan="4">(本金+彩金)*25</td>
                  </tr>
                </table>


                </div>
                <span class="text_show" v-show="initInfo.status!=1">{{initInfo.status_tips}}</span>
                <div class="btn" v-show="!load">
                  <div class="d_btn normal"
                  :class="{'normal':initInfo.status==0,'disabled':initInfo.status!=0}"
                  @click="apply()" >
                    {{initInfo.status==1?'已领取':'立即申请'}}
                  </div>
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
               1.每个自然月内单笔存款符合条件的VIP会员可在VIP页面或优惠活动页面申请一次“VIP月再存优惠”，此优惠彩金需完成对应的有效流水。<br>
               例：VIP3会员单笔存款500，申请本月VIP月再存活动优惠，此时需完成（500+500X8%）x15=8100 的全站有效流水<br>
               <span class="grey">
                 2. 此活动仅限已参与“VIP月存款活动”活动且已完成VIP月存款活动流水的会员参加。<br></span>
               3.会员存款后需在活动页面申请，若用户在申请此优惠前将存款从主钱包转出或发起提款，则不可申请月再存优惠，会员申请成功后，奖金将会主动添加至用户的主钱包。<br>
               4.VIP会员单笔存款要求以及对应优惠彩金以会员申请后充值到账时所对应的VIP等级为准。本活动规定的彩金流水未完成前不可再次申请，此优惠活动当月未申请则视为自动放弃。<br>
               5.电竞赔率＜1.5、亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水；PT电子游戏中以下游戏不算有效流水：<activeptliushui></activeptliushui>。<br>
               6.每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能使用一个账号享受优惠。对违规的用户，VKGAME保留无限期审核， 和扣回红利及所产生的利润权利；VKGAME官方对本活动保有最终解释权。
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="btn back_active_nav">
        <router-link to="/active" class="botton normal">{{$t("Return_to_activity_page")}}</router-link>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { mapState } from 'vuex'
export default {
  name: 'viptransferagain',
  components: {},
  data () {
    return {
      tableArr:[68,128,218,218,288,388,518,688,688,888,1288,1588],
      initInfo:{},
      load:true,
    }
  },
  computed: {
    ...mapState(["isLogin"])
  },
  mounted () {
    this.getVipTransferInit()
  },
  methods: {
    getVipTransferInit() {
      this.load = true
      this.$http(this.ApiSetting.active.getVipTransferAgainInit)
      .then(res => {
        this.load = false
        if(res.status == 1 && res.data) {
          this.initInfo = res.data;
        }
      })
      .catch(()=>{
        this.load = false
      })
    },
    apply() {

      // status 0可领取 1：已领取 其他
      if(this.initInfo.status != 0) {
        return;
      }
        this.$http(this.ApiSetting.active.joinVipTransferAgain)
        .then(res => {
          if(res.status == 1) {
            this.$message({
              message:res.message,
              type: "success"
            });
            this.initInfo.status =1
          }else if(res.message){
            this.$message({
              message: res.message,
              type: "warning"
            });
          }
        })

    }
  },
}
</script>
<style lang="less" scoped>
.viptransferagain{
  background: url("../../../assets/active/viptransferagain-banner.jpg") no-repeat center top;
  .active_page_wrapper {
    text-align: center;
  }
  .active_desc {
    text-align: left;
  }
  .active_page_content {
    padding: 30px 38px !important;
  }
  .text_show {
    margin-top: 20px;
    display: inline-block;
    font-size: 14px;
    color: #53586b;
  }
  .active_time .btn {
      margin-top:20px;
    }
  .d_btn {
    width: 126px;
    height: 29px;
    line-height: 29px;
  }
  .table_box {
    position: relative;
    height: 300px;
    margin-top: 25px;
  }
  .grey {
    color:#8692b6;
  }
  table {
    position: absolute;
    width: 1163px;
    height: 300px;
    font-size: 18px;
    color: #8692b6;
    text-align: center;
    border-collapse: separate;
    border-spacing: 0;
    border-radius: 10px;
    tr {
      td {
        width: 78px;
        height: 50px;
        box-sizing: border-box;
        &:first-child {
          width: 170px;
          color:#09e7b2
        }
      }
      &:first-child td {color:#09e7b2}
      &:first-child td:first-child {
        border-top-left-radius: 10px;
      }
      &:first-child td:last-child {
        border-top-right-radius: 10px;
      }
      &:nth-child(5) td:first-child {
        border-bottom-left-radius: 10px;
      }
      &:last-child td:last-child {
        border-bottom-right-radius: 10px;
      }
    }
    &.table_true {
      border-top: solid 1px #4b5064;
      border-left: solid 1px #4b5064;
      tr td{
        line-height: 1.2;
        border-right: #4b5064 1px solid;
        border-bottom: #4b5064 1px solid;
      }
    }
  }
  .table_bg tr td {
    &:nth-child(1),
    &:nth-child(2)
    {
      background: #262933;
    }
     &:nth-child(3),
    &:nth-child(4),
    &:nth-child(5)
   {
      background: #1c1e25;
    }
    &:nth-child(6),
    &:nth-child(7),
    &:nth-child(8),
    &:nth-child(9),
    &:nth-child(10) {
       background: #16181e;
    }
    &:nth-child(11),
    &:nth-child(12),
    &:nth-child(13),
    &:nth-child(14)
     {
      background: #101216;
    }
  }
}
</style>
