<template>
  <div class="deposit-active">
    <h2>{{ initInfo.active_show_time }}</h2>

    <p>活动期间，会员每日在规定时间内首充并使用虚拟币进行存款，充值成功的会员笔笔存款都送好运金，单日上限最高{{ initInfo.setting.day_max_bouns }}元。</p>

    <el-button @click="toDepositPage" class="deposit-active-btn" type="primary" round>立即参与：虚拟币充值</el-button>

    <table class="table" border="0" align="center" cellspacing="0" width="100%">
      <tr>
        <th width="25%">每日充值时间</th>
        <th width="25%">充值渠道</th>
        <th width="25%">返还彩金比</th>
        <th>好运金单日赠送上限</th>
      </tr>
      <tr>
        <td>{{ initInfo.setting.vir_time_one }}</td>
        <td>虚拟币充值</td>
        <td>{{ initInfo.setting.vir_percent_one }}</td>
        <td rowspan="2">{{ initInfo.setting.day_max_bouns }}</td>
      </tr>
      <tr>
        <td>{{ initInfo.setting.vir_time_two }}</td>
        <td>虚拟币充值</td>
        <td>{{ initInfo.setting.vir_percent_two }}</td>
      </tr>
    </table>

    <ol class="rules">
      <li>本活动仅计算每日在规定时间段内使用“虚拟币充值”渠道的有效存款，存款成功后，该存款红利与存款同时到账。</li>
      <li>VIP会员每日未提款前的存款都视为首充，参与此活动的会员需绑定银行卡。</li>
      <li>本活动有效充值不包含已参与虚拟币首存活动的第一笔虚拟币存款</li>
      <li>此活动与V富通2.0活动共享，单日共享优惠额度累计上限最高为{{ initInfo.setting.day_max_bouns }}元，提款为1倍流水。例：会员当日在V富通2.0优惠活动中累计领取了388元好运金，在虚拟币存送优惠活动中只能领取200元。</li>
      <li>电竞赔率＜1.5、亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水；PT电子游戏中以下游戏不算有效流水：<activeptliushui></activeptliushui>。</li>
      <li>每位有效玩家、每一手机号码、电子邮箱、相同银行卡、每一个IP地址、每一台电脑者只能享受一次优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利。VKGAME对本活动保有最终解释权。</li>
    </ol>

    <div class="back-container">
      <router-link to="/active"><el-button type="primary" round>返回活动首页</el-button></router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'goodLuckUpgradeActive',
  data () {
    return {
      initInfo: {
        setting: {}
      }
    }
  },
  computed: {
    ...mapState(['isLogin'])
  },
  mounted () {
    this.initActiveData()
  },
  methods: {
    initActiveData () {
      const reselt = this.$http(this.ApiSetting.active.goodLuckUpgradeInit)
      reselt.then(({ status, data }) => {
        if (status === 1 && data) {
          this.initInfo = data
        }
      })
    },
    toDepositPage () {
      if (this.initInfo.is_login) {
        this.$router.push({path: '/user/finance/'})
      } else {
        this.$message({message: '请您先登录', type: 'warning'})
      }
    }
  }
}
</script>

<style lang="less" scoped>
.deposit-active {
  width: 1086px;
  margin: 0 auto;
  text-align: center;
  h2, p {
    font-size: 14px;
    line-height: 14px;
    font-weight: normal;
    color: #3a4040;
    margin-top: 20px;
  }
  .deposit-active-btn {
    width: 344px;
    height: 54px;
    font-size: 18px;
    font-weight: bold;
    border-radius: 27px;
    background: none;
    background-image: linear-gradient(to right, #4da58c, #32705f), linear-gradient(to right, #32977a, #105945);
    color: #ffffff;
    margin-top: 30px;
  }
  table {
    margin-top: 60px;
    font-size: 16px;
    color: #717171;
    font-weight: normal;
    border-top: #c8c8c8 1px solid;
    border-right: #c8c8c8 1px solid;
    tr {
      background-color: #ffffff;
      td, th {
        height: 88px;
        line-height: 88px;
        border-left: #c8c8c8 1px solid;
        border-bottom: #c8c8c8 1px solid;
      }
      th {
        font-weight: normal;
        color: #ffffff ;
      }
      &:first-child {
        background-image: linear-gradient(to right, #4da58c, #32705f);
      }
    }
  }
  .rules {
    background-color: #fff;
    padding: 20px 70px 20px 90px;
    margin-top: 30px;
    border: 1px solid #c8c8c8;
    text-align: left;
    font-size: 14px;
    color: #717171;
    &:before {
      display: block;
      content: "活动规则";
      text-align: center;
      margin-left: -10px;
      font-size: 18px;
      line-height: 18px;
      font-weight: bold;
      letter-spacing: 3px;
      color: #3a4040;
    }
    li {
      list-style: decimal;
      line-height: 24px;
      &:first-child {
        margin-top: 30px;
      }
    }
  }
}
</style>
