<template>
  <div class="vipfirstdeposit active_page">
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
               {{initInfo.start_time}}起
              </div>
            </div>
          </div>
          <div class="active_section_box">
            <div class="active_title">
              {{$t("Active_content")}}
            </div>
            <div class="section_box_wrapper ">
              <div class="active_time">
                满足条件的VIP会员每个自然月内可申请一次单笔存送优惠，彩金最高可获2188元！
                 <div class="btn" v-show="JSON.stringify(initInfo) != '{}'">
                   <div class="d_btn normal" @click="apply()"  v-show="initInfo.status==0||initInfo.status==103">立即申请</div>
                   <div class="d_btn disabled"   v-show="initInfo.status>1&&initInfo.status!=103">立即申请</div>
                   <div class="d_btn disabled" v-show="initInfo.status==1" >已领取</div>
                 </div>
                <span class="text_show">{{initInfo.tips}}</span>
                <div class="table_box">
                <table class="table_bg" v-if="tableArr.length">
                  <tr v-for="i in 5" :key="i">
                    <td v-for="j in 14" :key="j"></td>
                  </tr>
                </table>
                <table class="table_true" v-if="tableArr.length">
                  <tr>
                    <td>等级</td>
                    <td v-for="j in 13" :key="j">{{ tableArr[j-1].level}}</td>
                  </tr>
                  <tr>
                    <td>最高彩金</td>
                    <td v-for="j in 13" :key="j">{{tableArr[j-1].bonus?tableArr[j-1].bonus+'元':'-'}}</td>
                  </tr>
                  <tr>
                    <td>单笔要求</td>
                    <td>{{tableArr[0].deposit?'≥'+tableArr[0].deposit:'-'}}</td>
                    <td colspan="3">{{tableArr[1].deposit?'≥'+tableArr[1].deposit+'元':'-'}}</td>
                    <td colspan="5">{{tableArr[4].deposit?'≥'+tableArr[4].deposit+'元':'-'}}</td>
                    <td colspan="4">{{tableArr[9].deposit?'≥'+tableArr[9].deposit+'元':'-'}}</td>
                  </tr>
                  <tr>
                    <td>优惠比例</td>
                    <td>{{parseInt(tableArr[0].percent*100)?tableArr[4].percent+'%':'-'}}</td>
                    <td colspan="3">{{parseInt(tableArr[1].percent*100)?tableArr[1].percent+'%':'-'}}</td>
                    <td colspan="5">{{parseInt(tableArr[4].percent*100)?tableArr[4].percent+'%':'-'}}</td>
                    <td colspan="4">{{parseInt(tableArr[9].percent*100)?tableArr[9].percent+'%':'-'}}</td>

                  </tr>
                  <tr>
                    <td>流水要求</td>
                    <td>{{parseInt(tableArr[0].limit*100)?'(本金+彩金)*'+tableArr[0].limit:'-'}}</td>
                    <td colspan="3">{{parseInt(tableArr[1].limit*100)?'(本金+彩金)*'+tableArr[1].limit:'-'}}</td>
                    <td colspan="5">{{parseInt(tableArr[4].limit*100)?'(本金+彩金)*'+tableArr[4].limit:'-'}}</td>
                    <td colspan="4">{{parseInt(tableArr[9].limit*100)?'(本金+彩金)*'+tableArr[9].limit:'-'}}</td>
                  </tr>
                </table>
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
               1.每个自然月内单笔存款符合条件的VIP会员可在VIP页面或优惠活动页面申请一次“VIP月存款优惠”，此优惠彩金需完成对应的有效流水。<br>
                例：VIP3会员单笔存款500，申请本月VIP月存款活动优惠，此时需完成（500+500X15%）x12=6900 的全站有效流水<br>
               2.会员存款后需在活动页面申请，若用户在申请此优惠前将存款从主钱包转出或发起提款，则不可申请月存优惠，会员申请成功后，奖金将会主动添加至用户的主钱包。<br>
               3.VIP会员单笔存款要求以及对应优惠彩金以会员申请后充值到账时间所对应的VIP等级为准。<br>
               4.VIP月存款优惠不与新用户首存优惠活动、全站每日存款活动共享，活动规定的彩金流水未完成前不可再次申请，此优惠活动当月未申请则视为自动放弃。<br>
               5.电竞赔率＜1.5、亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水；PT电子游戏中以下游戏不算有效流水：<activeptliushui></activeptliushui>。<br>
               6.每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能使用一个账号享受优惠。对违规的用户，VKGAME保留无限期审核， 和扣回红利及所产生的利润权利。<br>
               7.VKGAME官方对本活动保有最终解释权。
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
export default {
  name: 'vipfirstdeposit',
  components: {},
  data () {
    return {
      titArr:[ "等级","单笔存款","月优惠比例","月彩金最高 ","彩金流水要求(全站)"],
      tableArr:[],
      initInfo:{}
    }
  },
  mounted () {

    this.getVipTransferInit()

  },
  methods: {
    getVipTransferInit() {
      this.$http(this.ApiSetting.active.getVipTransferInit)
      .then(res => {
        if(res.status == 1 && res.data) {
          this.initInfo = res.data;
          this.tableArr = res.data.setting;
          let stime = new Date(res.data.active_start_time*1000)
          this.initInfo.start_time = stime.getFullYear() + '年' + (stime.getMonth() + 1) + '月' + stime.getDate() + '日'
        }
      })
    },
    apply() {
      if(this.initInfo.status == 1) {//已领取
        return;
      }
      if (this.initInfo.status != 0) {
        this.$message({
          message: this.initInfo.status_tip,
          type: "warning"
        });
        return;
      }
      this.$confirm(' 您目前可领取VIP'+this.initInfo.bonus_level+' 月优惠存款'+this.initInfo.bonus+'元', this.$t("prompt"), {
        confirmButtonText: '立即领取',
        cancelButtonText: this.$t("cancel"),
        type: 'warning',
        center: true
      }).then(() => {
        this.$http(this.ApiSetting.active.getVipTransferBonus)
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
      })

    }
  },
}
</script>
<style lang="less" scoped>
.vipfirstdeposit{
  background: url("../../../assets/active/cunkuan_banner.jpg") no-repeat center top;
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
    font-size: 14px;
    color: #53586b;
  }
  .active_time .btn {
      margin-top:10px;
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
  table {
    position: absolute;
    width: 1163px;
    height: 300px;
    font-size: 18px;
    color: #8692b6;
    text-align: center;
    border-collapse: separate;
    border-spacing: 0;
    // border-radius: 10px;
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
        // border-top-left-radius: 10px;
      }
      &:first-child td:last-child {
        // border-top-right-radius: 10px;
      }
      &:nth-child(5) td:first-child {
        // border-bottom-left-radius: 10px;
      }
      &:last-child td:last-child {
        // border-bottom-right-radius: 10px;
      }
    }
    &.table_true {
      border-top: solid 1px #4b5064;
      border-left: solid 1px #4b5064;
      tr td{
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
