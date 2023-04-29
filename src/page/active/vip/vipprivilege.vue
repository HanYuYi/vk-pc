<template>
  <div class="vipgamegold active_page">
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
                VIP会员每个自然月内累计存款金额≥500即可免费领取一次对应的游戏体验金。
                <div class="btn" v-show="JSON.stringify(initInfo) != '{}'">
                  <div class="d_btn normal" @click="apply()"  v-show="initInfo.status==0||initInfo.status==2">立即申请</div>
                  <div class="d_btn disabled"   v-show="initInfo.status>2">立即申请</div>
                  <div class="d_btn disabled" v-show="initInfo.status==1" >已领取</div>
                </div>
                <span class="text_show">{{initInfo.page_show_text}}</span>
                <table v-if="vipGameGold.length">
                  <tr>
                    <td>{{titArr[0]}}</td>
                    <td v-for="i in 13" :key="i">{{vipGameGold[i-1].level}}</td>
                  </tr>
                  <tr>
                    <td>{{titArr[1]}}</td>
                    <td v-for="i in 13" :key="i">{{vipGameGold[i-1].bonus?vipGameGold[i-1].bonus+'元':'-'}}</td>
                  </tr>
                  <tr>
                    <td>{{titArr[2]}}</td>
                    <td colspan="13">{{titArr[3]}}</td>
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
                1.每个自然月内累计存款≥500的VIP会员可免费领取一次专属游戏体验金，此优惠彩金需完成对应的3倍有效流水。<br>
                2.游戏体验金需在VIP页面或优惠活动页面自助领取，此优惠活动当月未领取则视为自动放弃。<br>
                3.电竞赔率＜1.5、亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水；PT电子游戏中以下游戏不算有效流水：<activeptliushui></activeptliushui>。<br>
                4.每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能使用一个账号享受优惠。对违规的用户，VKGAME保留无限期审核， 和扣回红利及所产生的利润权利。<br>
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
  name: 'vipgamegold',
  components: {},
  data () {
    return {
      titArr:["等级","游戏体验金","体验金流水要求","全站3倍有效流水"],
      vipGameGold:[],
      initInfo:{}
    }
  },
  mounted () {
    this.getVipPrivilegeInit()
  },
  methods: {
    getVipPrivilegeInit() {
      this.$http(this.ApiSetting.active.getVipPrivilegeInit)
      .then(res => {
        if(res.status == 1 && res.data) {
          this.initInfo = res.data;
          this.vipGameGold = res.data.setting;
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
      this.$http(this.ApiSetting.active.joinVipPrivilegeActive)
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
.vipgamegold{
  background: url("../../../assets/active/vipgamegold-banner.jpg") no-repeat center top;
  padding-top:510px;
  .active_page_wrapper {
    text-align: center;
  }
  .active_desc {
    text-align: left;
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
  .active_page_content {
    padding: 30px 38px  !important;
  }
  table {
    width: 1163px;
    margin: 45px 0 0 ;
    border:1px solid #333548;
    font-size: 18px;
    color: #8692b6;
    tr {
      height: 50px;
      td {
         &:first-child {color: #07f1b7}
          border:1px solid #333548;
      }
      &:first-child {color: #07f1b7}
    }
  }
}

</style>
