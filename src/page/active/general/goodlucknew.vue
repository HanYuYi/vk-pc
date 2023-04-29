<template>
  <div class="goodlucknew active_page">
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
            <div class="section_box_wrapper">
              <div class="active_desc active_time">
                活动期间，会员每日在规定时间内首充并使用指定充值渠道进行存款，充值成功的会员笔笔存款都送好运金，单日上限最高588元。
                <table border="0" v-if="!load&&initInfo.setting"  align="center" cellspacing="0" width="100%">
                  <thead>
                  <tr align="center">
                    <th width="25%">每日充值时间</th>
                    <th width="25%">充值渠道</th>
                    <th width="25%">返还彩金比</th>
                    <th>好运金单日赠送上限</th>
                  </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{{initInfo.setting.bank_time}}</td>
                      <td>银行卡直充、支付宝转银行卡</td>
                      <td rowspan="2">{{initInfo.setting.bank_percent}}</td>
                      <td rowspan="2">{{initInfo.setting.day_max_bouns}}</td>
                    </tr>
                    <tr>
                      <td>{{initInfo.setting.vir_time_one}}</td>
                      <td>E-CNY数字人民币</td>
                    </tr>
                  </tbody>
                </table>
                <div v-show="load">
                  <span class="small_loading"></span>
                </div>
              </div>
            </div>
          </div>
          <div class="active_section_box">
            <div class="active_title">
              {{$t("Activity_rules")}}
            </div>
            <div class="section_box_wrapper">
              <div class="active_desc"  >
                1.本活动仅计算每日在规定时间段内使用“银行卡直充”、“支付宝转银行卡”、“E-CNY数字人民币”渠道的有效存款，存款成功后，该存款红利与存款同时到账；此活动与虚拟币存送再升级优惠活动和V富通2.0活动共享，单日共享优惠额度累计上限最高为588元，提款为1倍流水。<br>
                2.VIP会员每日未提款前的存款都视为首充，参与此活动的会员需绑定银行卡。<br>
                3.本活动有效充值不包含已参与虚拟币首存活动的第一笔虚拟币存款。<br>
                4.电竞赔率＜1.5、亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水；PT电子游戏中以下游戏不算有效流水：<activeptliushui></activeptliushui>。<br>
                5.每位有效玩家、每一手机号码、电子邮箱、相同银行卡、每一个IP地址、每一台电脑者只能享受一次优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利。VKGAME对本活动保有最终解释权。
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
  name: 'goodlucknew',
  components: {},
  data() {
     return {
       load:false,
       initInfo:{}
     }
  },
  mounted () {
    this.getInit()
  },
  methods: {
    getInit() {
      this.load = true
      this.$http(this.ApiSetting.active.getGoodLuckNewInit)
      .then(res => {
        this.load = false
        if(res.status==1) {
          this.initInfo = res.data
        }
      })
      .catch(res=>{
        this.load = false
      })
    },
  }
}
</script>
<style lang="less" scoped>
.goodlucknew{
  background: url("../../../assets/active/goodlucknew-banner.jpg") no-repeat center top;
  .d_btn {
    width: 200px;
    font-size: 17px;
    margin-top: 34px;
  }
  table {
    margin-top: 24px;
    font-size: 14px;
    color: #fff;
    border-top: #333548 1px solid;
    border-right: #333548 1px solid;
    th {
      color:#07f1b7 ;
      font-size: 16px;
    }
    td,th {
      line-height: 50px;
      border-left: #333548 1px solid;
      border-bottom: #333548 1px solid;
    }
    td {
      color: #f4d363;
      &:first-child {
        color: #c3c3c3;
      }
    }
  }
}
</style>
