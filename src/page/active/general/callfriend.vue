<template>
  <div class="call_friend active_page">
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
                {{start_time}}起
              </div>
            </div>
          </div>
          <div class="active_section_box">
            <div class="active_title">
              {{$t("Active_content")}}
            </div>
            <div class="section_box_wrapper">
              <div class="active_desc">
                VKGAME用户使用个人中心--推广/分享里的专属推广链接或邀请码，通过QQ、论坛、贴吧、微博等方式分享，成功邀请好友即可获得现金奖励！
              </div>
              <table  align="center" cellspacing="0" width="100%">
                <tbody>
                <tr>
                  <td class="tb_title">好友累计存款</td>
                  <td width="18%">100</td>
                  <td width="18%">1000</td>
                  <td width="18%">10000</td>
                  <td rowspan="2" class="btn"><a href="javascript:;" class="to_apply d_btn normal" @click="handleToShare" v-show="loading">立即分享</a></td>
                </tr>
                <tr>
                  <td class="tb_title">赠送金额</td>
                  <td class="yellow" width="18%">8</td>
                  <td class="yellow" width="18%">38</td>
                  <td class="yellow" width="18%">88</td>
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
                <p>1.每个通过您推广链接进行注册并存款的用户，您将获得对应的邀请奖励金，邀请奖励金最高可累计获得134元！</p>
                <p>2.活动奖金将在您邀请的用户绑定银行卡并成功充值后系统自动派发，无需向客服申请；活动奖金只需完成全站一倍有效流水。</p>
                <p>3.电竞赔率＜1.5、亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水；PT电子游戏中以下游戏不算有效流水：<activeptliushui></activeptliushui>。</p>
                <p>4.邀请人与被邀请人必须为不同身份的真实玩家，邀请人VIP等级需大于等于1级，每一手机号码、银行卡、电脑、IP地址（包括使用VPN） 都会判定为同一玩家。</p>
                <p>5.凡使用作弊手段，恶意套取奖金者，我们将保留无限期审核扣回红利及所产生的利润权利，严重者将冻结所有关联账号。</p>
                <p>6.{{$t("VKGAME_official_final_interpretation")}}</p>
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
  name: "callfriend",
  data() {
    return {
      isLogin: false,
      loading: false,
      start_time:''
    };
  },
  mounted() {
    this.initActiveData();
  },
  methods: {
    initActiveData() {
      this.$http(this.ApiSetting.active.getCallFriendInit)
      .then(res => {
        this.loading = true;
        if(res.status == 1 && res.data) {
          this.isLogin = res.data.is_login;
          let stime = new Date(res.data.active_start_time*1000)
          this.start_time = stime.getFullYear() + '年' + (stime.getMonth() + 1) + '月' + stime.getDate() + '日'
        }
      })
    },
    handleToShare() {
      if (this.isLogin) {
        this.$router.push({ path: "/user/seo/" });
      } else {
        this.$message({
          message: "您还未登录，请登录",
          type: "warning"
        });
      }
    }
  }
};
</script>
<style scoped>
.call_friend {
  background: url("../../../assets/active/callfriend/banner1.jpg") no-repeat center
    top;
}
.section_box_wrapper table {
  margin-top: 20px;
  border-spacing: 0;
  border-collapse: unset;
  border-top: #303344 1px solid;
  border-right: #303344 1px solid;
}
.section_box_wrapper table td {
  text-align: center;
  line-height: 50px;
  color: #c3c3c3;
  border-left: #303344 1px solid;
  border-bottom: #303344 1px solid;
  font-size: 14px;
}
.section_box_wrapper table .tb_title {
  color: #07f1b7;
  font-size: 18px;
}
.section_box_wrapper table td.yellow {
  color: #f4d364;
  font-weight: bold;
  font-size: 22px;
}
.btn .to_apply {
  width: 92px;
  height: 25px;
  line-height: 25px;
  font-size: 12px;
}
</style>
