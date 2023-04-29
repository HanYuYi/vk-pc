<template>
  <div class="viprescue active_page">
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
            <div class="section_box_wrapper">
              <div class="active_time">
                所有满足条件的VIP用户每个自然月内可申请领取VIP专属月救援金，最高领取88888！
                <table v-if="vipRescue.length" >
                  <tr>
                    <td v-for="i in 4" :key="i">{{titArr[i-1]}}</td>
                    <td rowspan="14" class="apply_b">
                      <span class="text_show">{{initInfo.page_show_text}}</span>
                      <div class="btn" v-show="JSON.stringify(initInfo) != '{}'">
                        <div class="d_btn normal" @click="apply()"  v-show="initInfo.status==0||initInfo.status==2">立即申请</div>
                        <div class="d_btn disabled"   v-show="initInfo.status>2">立即申请</div>
                        <div class="d_btn disabled" v-show="initInfo.status==1" >已领取</div>
                      </div>
                      {{titArr[5]}}
                      </td>
                  </tr>
                  <tr >
                    <td>{{vipRescue[0].level}}</td>
                    <td>{{vipRescue[0].loss?'≥'+vipRescue[0].loss:'-'}}</td>
                    <td>{{parseInt(vipRescue[0].percent*100)?vipRescue[0].percent+'%':'-'}}</td>
                    <td>{{vipRescue[0].bonus?vipRescue[0].bonus+'元':'-'}}</td>
                  </tr>
                  <tr v-for="i in 12" :key="i">
                    <td>{{vipRescue[i].level}}</td>
                    <td>{{vipRescue[i].loss?'≥'+vipRescue[i].loss:'-'}}</td>
                    <td>{{parseInt(vipRescue[i].percent*100)?vipRescue[i].percent+'%':'-'}}</td>
                    <td>{{vipRescue[i].bonus?vipRescue[i].bonus+'元':'-'}}</td>
                  </tr>

                </table>
              </div>
            </div>
          </div>
          <div class="active_section_box">
            <div class="active_title">
              {{$t("Activity_rules")}}
            </div>
            <div class="section_box_wrapper">
              <div class="active_desc">
                1.月总负盈利计算周期为一个自然月，若当月负盈利≥200000即可在VIP页面或优惠活动页面申请领取此优惠。			<br>
                2.当月救援金需于次月1-3号自助领取，月救援金需完成全站1倍有效流水，此活动逾期未领取则视为自动放弃。			<br>
                3.电竞赔率＜1.5、亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水；PT电子游戏中以下游戏不算有效流水：<activeptliushui></activeptliushui>。<br>
                4.每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能使用一个账号享受优惠。对违规的用户，VKGAME保留无限期审核， 和扣回红利及所产生的利润权利。<br/>
                5.本活动最终解释权归VKGAME所有。
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
  name: 'viprescue',
  components: {},
  data () {
    return {
      titArr:["等级","月总负盈利","救援金比例","救援金最高","红利流水要求","全站1倍流水"],
      vipRescue:[],
      initInfo:{}
    }
  },
  mounted () {
    this.getVipMonthRescueInit()
  },
  methods: {
    getVipMonthRescueInit() {
      this.$http(this.ApiSetting.active.getVipMonthRescueInit)
      .then(res => {
        if(res.status == 1 && res.data) {
          this.initInfo = res.data;
          this.vipRescue = res.data.setting;
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
      this.$http(this.ApiSetting.active.joinVipMonthRescueActive)
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
.viprescue{
  background: url("../../../assets/active/viprescue-banner.jpg") no-repeat center top;
  padding-top:510px;
  .active_page_content {
    padding: 30px 194px  !important;
  }
  .d_btn {
    margin-bottom: 20px;
    width: 93px;
    height: 25px;
    line-height: 25px
  }
  table {
    width: 850px;
    margin: 45px 0 0 ;
    border:1px solid #333548;
    font-size: 18px;
    color: #ffffff;
    tr {
      height: 50px;
      td {
         &:first-child {color: #07f1b7}
         &.apply_b {color: #ffffff;width: 200px;}
          border:1px solid #333548;
          .text_show {
            max-width: 200px;
            display: inline-block;
            font-size: 13px;
            color: #53586b;
            margin-bottom: 10px;
          }
      }
      &:first-child {color: #07f1b7}
    }
  }
}

</style>
