<template>
  <div class="vipachienement active_page">

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
              VIP会员每个自然月累计盈利≥300000即可免费领取一次对应的月成就奖彩金。
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
                    <td>会员勋章</td>
                      <td v-for="j in 13" :key="j" >  {{ tableArr[j-1].level_name }}</td>
                  </tr>
                  <tr>
                    <td>月总盈利</td>
                     <td v-for="j in 13" :key="j">{{tableArr[j-1].total_profit=="-"? tableArr[j-1].total_profit : "≥"+tableArr[j-1].total_profit}}</td>
                  </tr>
                  <tr>
                    <td>成就奖</td>
                    <td v-for="j in 13" :key="j">{{tableArr[j-1].bonus }}</td>
                  </tr>
                  <tr>
                    <td>流水要求</td>
                    <td colspan="13">全站1倍有效流水</td>
                  </tr>
                </table>
                </div>

                 <span class="text_show">{{initInfo.page_show_text}}</span>

                    <!-- // 0:可领取 1:已领取 ，2：请登录，其他不可领 -->
                  <div class="btn" v-show="JSON.stringify(initInfo) != '{}'">
                       <div class="d_btn normal" @click="apply()"  v-show="initInfo.status==0||initInfo.status==2">立即申请</div>
                        <div class="d_btn disabled"   v-show="initInfo.status>2">立即申请</div>
                        <div class="d_btn disabled" v-show="initInfo.status==1" >已领取</div>
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
                  	1.月总盈利计算周期为一个自然月，若当月总盈利≥300000即可在VIP页面或优惠活动页面申请领取此优惠。<br>
                    2.当月成就奖需于次月1-3号自助领取，月成就奖需完成全站1倍有效流水，此活动逾期未领取则视为自动放弃。	<br>
                    3.电竞赔率＜1.5、亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水；PT电子游戏中以下游戏不算有效流水：<activeptliushui></activeptliushui>。<br>
                    4.每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能使用一个账号享受优惠。对违规的用户，VKGAME保留无限期审核， 和扣回红利及所产生的利润权利。	<br>
                    5.VKGAME对本活动保有最终解释权。
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
  name: 'vipachienement',
  components: {},
  data () {
    return {
    //   titArr:[ "等级","单笔存款","月优惠比例","月彩金最高 ","彩金流水要求(全站)"],
      tableArr:[],
      initInfo:{}
    }
  },
  mounted () {

    this.getVipTransferInit()

  },
  methods: {
    getVipTransferInit() {
      this.$http(this.ApiSetting.active.getVipMonthAchienementAwardInit)
      .then(res => {
        if(res.status == 1 && res.data) {
          this.initInfo = res.data;
          this.tableArr = res.data.setting;
        //   let stime = new Date(res.data.active_start_time*1000)
        //   this.initInfo.start_time = stime.getFullYear() + '年' + (stime.getMonth() + 1) + '月' + stime.getDate() + '日'
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
      this.$http(this.ApiSetting.active.joinVipMonthAchienementAward)
      .then(res => {
        if(res.status == 1) {
          this.$message({
            message: res.message,
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


.vipachienement{
  background: url("../../../assets/active/vipachienement_banner.jpg") no-repeat center top;
  .active_page_wrapper {
    text-align: center;
  }
  .active_desc {
    text-align: left;
  }
  .active_page_content {
    padding: 30px 38px !important;
  }
  .section_box_wrapper{
    .btn{
       margin-top:20px !important
    }
  }
    .text_show {
    font-size: 14px;
       color:#fff;

  }

  .active_time .btn {
      margin-top:40px;
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
    margin-bottom: 25px;

  }
  table {
    position: absolute;
    width: 1163px;
    height: 300px;
    font-size: 18px;
    color: #fff;

    text-align: center;
    border-collapse: separate;
    border-spacing: 0;
    tr:not(:first-child){
        td:not(:first-child){
            font-size: 16px;
        }

    }
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

}
</style>
