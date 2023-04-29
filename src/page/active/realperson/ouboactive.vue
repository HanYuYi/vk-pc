<template>
  <div class="ag_active active_page">
    <div class="to_play_ag active_page_top_btn">
      <router-link to="/oubo" class="ag_btn active_page_btn"></router-link>
    </div>
    <div class="active_page_wrapper">
      <div class="wrapper">
        <div class="top_bg">
          <div class="bg1"></div>
          <div class="bg2"></div>
        </div>
        <div class="active_page_content">
          <div class="active_section_box">
            <div class="active_title">
               活动时间
            </div>
            <div class="section_box_wrapper">
              <div class="active_time">
                2019年12月25日起
              </div>
            </div>
          </div>
          <div class="active_section_box">
            <div class="active_title">
              {{$t("Active_content")}}
            </div>
            <div class="section_box_wrapper">
              <div class="active_time">
                所有参与威客欧博投注的新老会员均可享受每日6‰的欧博返水，不设上限要求。
              </div>
            </div>
          </div>
          <div class="active_section_box">
            <div class="active_title">
              {{$t("Activity_rules")}}
            </div>
            <div class="section_box_wrapper">
              <div class="active_desc">
               <p>
                 1. 返水每日凌晨0:30左右自动派发、无需申请，返现金额只需1倍流水即可提款。无最低派发额度，无上限。返水计算周期为：昨日0点至今日0点的返水报表。<br>
                 2. 每位有效玩家、每一手机号码、电子邮箱、相同银行卡、每一个IP地址、每一台电脑者只能享受一次优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利。<br>
                 3. 如若投注轮盘、骰宝、牛牛、空战世纪，不参与返水。<br>
                 4. VKGAME官方对本活动保有最终解释权。     
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
<script type="text/javascript">
export default {
  name: 'ouboactive',
  components: {},
  data() {
    return {}
  },
  methods: {}
}
</script>
<style scoped>
.ag_active{
  background: url("../../../assets/active/oubo/oubobanner.jpg") no-repeat center top;
}
.to_play_ag{
  text-align: center;
}
.to_play_ag .ag_btn{
  display: inline-block;
  width: 174px;
  height: 68px;
  background: url("../../../assets/active/oubo/normal.png") no-repeat center center;
}
.to_play_ag .ag_btn:hover{
  background: url("../../../assets/active/oubo/hover.png") no-repeat center center;
}
</style>
