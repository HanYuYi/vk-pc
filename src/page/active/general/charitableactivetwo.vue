<template>
  <div class="ag_active active_page">
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
                2020年01月28日起
              </div>
            </div>
          </div>
          <div class="active_section_box">
            <div class="active_title">
              {{$t("Active_content")}}
            </div>
            <div class="section_box_wrapper">
              <div class="active_desc">
                活动期间，平台用户每日总流水达到一定金额，即可联系在线客服申请领取【专业防护口罩】，每位用户每日仅限申请一次。
              </div>
              <table border="1"  align="center" cellspacing="0" width="100%">
                <thead>
                  <tr align="center">
                    <th>当日总流水</th>
                    <th>奖品(个)</th>
                    <th>折现价格</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>50000</td>
                    <td class="prize">【专业防护口罩】x2</td>
                    <td>38元</td>
                  </tr>
                  <tr>
                    <td>100000</td>
                    <td class="prize">【专业防护口罩】x5</td>
                    <td>58元</td>
                  </tr>
                  <tr>
                    <td>500000</td>
                    <td class="prize">【专业防护口罩】x10</td>
                    <td>128元</td>
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
               <p>1. 活动期间，用户累计流水达到一定金额即可联系在线客服申请领取奖品，满足条件的用户需向客服提供个人收货地址，此活动仅限中国大陆用户。</p>
               <p>2. 若后续口罩库存不足，会员可选择更换为消毒液或进行折现，实物折现奖金需完成全站1倍有效流水。</p>
               <p>3. 参与此活动的用户，若当日总流水符合活动要求，则申请时间最晚为次日23:59:59，逾期则视为自动放弃。</p>
               <p>4. 此活动的实物奖品快递物流信息均为匿名派发。</p>
               <p>5. 每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能享受一次优惠。对违规的用户，VKGAME保留无限期审核， 和扣回红利及所产生的利润权利，VKGAME对本活动保有最终解释权。</p>
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
  name: "charitableactivetwo",
  components: {},
  data() {
    return {};
  },
  methods: {}
};
</script>
<style scoped>
.ag_active {
  background: url("../../../assets/active/charitableactivetwo/banner.jpg")
    no-repeat center top;
}
.section_box_wrapper table {
  border: none;
  margin-top: 20px;
}
.section_box_wrapper table td,
.section_box_wrapper table th {
  border-color: #17191f;
  text-align: center;
  line-height: 50px;
  color: #fff;
}
.section_box_wrapper table th {
  color: #07f1b7;
  font-size: 18px;
}
.section_box_wrapper .prize {
  color: #f4d364;
  font-size: 22px;
  font-weight: bold;
}
</style>
