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
              {{$t("The_activity_time")}}
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
                <p><span class="text_color">内容一</span>：即日起，所有新注册且存款≥100的用户可联系在线客服申请领取一个【专业防护口罩】。</p>
                <p><span class="text_color">内容二</span>：威客平台代理用户可联系代理专员领取【专业防护口罩x10】，不限代理，不限等级，每位代理均可领取！</p>
                <p><span class="text_color">内容三</span>：威客公益捐款：活动期间，威客公益将携手平台充值加送1%好运金活动，额外捐赠与此活动同等价值的救助金给武汉红十字会以及当地求助医院，威客公益代替您为武汉地区贡献出自己的一份力量！
                  <router-link to="/active/goodluck" class="text_color">查看好运金活动详情</router-link>
                </p>
              </div>
            </div>
          </div>
          <div class="active_section_box">
            <div class="active_title">
              {{$t("Activity_rules")}}
            </div>
            <div class="section_box_wrapper">
              <div class="active_desc">
                <p>1.满足条件的新用户需联系在线客服，提交个人准确的收货信息进行领取，本活动仅针对中国大陆内地用户，此活动的实物奖品快递物流信息均为匿名派发。</p>
                <p>2.若后续口罩库存不足，会员可选择更换为消毒液或进行折现，实物折现价格为10元，折现奖金需完成全站3倍有效流水。</p>
                <p>3.所有的代理用户需联系代理专员进行口罩领取。</p>
                <p>4.威客公益活动的捐款明细后续均将全部公示。</p>
                <p>5.每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能享受一次优惠。对违规的用户，VKGAME保留无限期审核， 和扣回红利及所产生的利润权利，VKGAME对本活动保有最终解释权。</p>
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
  name: "charitableactive",
  components: {},
  data() {
    return {};
  },
  methods: {}
};
</script>
<style scoped>
.ag_active {
  background: url("../../../assets/active/charitableactive/banner.jpg") no-repeat
    center top;
}
.text_color {
  color: #07f1b7;
}
a.text_color {
  text-decoration: underline;
}
a.text_color:hover {
  color: #fff;
}
</style>
