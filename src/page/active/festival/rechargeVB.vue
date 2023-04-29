<template>
  <div class="active_page rechargeVB">
    <div class="active_page_wrapper">
      <div class="wrapper">
        <div class="top_bg">
          <div class="bg1"></div>
          <div class="bg2"></div>
        </div>
        <div class="active_page_content">
          <div class="active_section_box">
            <div class="active_title">活动时间</div>
            <div class="section_box_wrapper">
              <div class="active_time">{{initInfo.active_show_time}}</div>
            </div>
          </div>

          <div class="active_section_box">
            <div class="active_title">{{$t("Event_details")}}</div>
            <div class="section_box_wrapper">
              <div class="active_time">活动期间，每日在{{ initInfo.deposit_time }}时间段内充值的会员可获得对应的V币额外奖励。</div>
              <table border="1"  align="center" cellspacing="0" width="100%">
                <tr v-for="(item, index) in tableList" :key="index">
                  <td v-for="(txt, i) in item" :class="{'color_07f1b7': i === 0}" :key="i">{{ txt }}</td>
                </tr>
              </table>
            </div>
          </div>

          <div class="active_section_box">
            <div class="active_title">{{$t("Activity_rules")}}</div>
            <div class="section_box_wrapper">
              <div class="active_desc">
                <p>
                  1. 此活动仅计算每日{{ initInfo.deposit_time }}时间段内会员充值的累计金额。<br>
                  2. 活动V币奖励将于每日{{ initInfo.send_time }}左右由系统自动派发至会员账号中。<br>
                  3. 每位有效玩家、每一手机号码、电子邮箱、相同银行卡、每一个IP地址、每一台电脑者只能享受一次优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利。<br>
                  4. VKGAME对本活动保有最终解释权。
                </p>
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

<script>
export default {
  name: 'rechargeVB',
  data () {
    return {
      initInfo: {},
      tableList: [
        ['VIP等级', '0-3', '4-6', '7-9', '10-12'],
        ['累计充值≥200', '188V币', '288V币', '388V币', '588V币'],
        ['累计充值≥2000', '688V币', '888V币', '1288V币', '1888V币'],
        ['累计充值≥20000', '1688V币', '2888V币', '3888V币', '6688V币']
      ]
    }
  },
  mounted () {
    this.initActiveData()
  },
  methods: {
    initActiveData () {
      this.$http(this.ApiSetting.active.getRechargeVB).then(res => {
        if (res.status === 1 && res.data) {
          this.initInfo = res.data
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.rechargeVB {
  background: url("../../../assets/active/rechargeVB_banner.png") no-repeat center top;
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
}
</style>
