<template>
  <div class="active_page newuser28">

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
                新用户完成注册并绑定银行卡账号后，可在威客电竞app客户端本活动页面中免费领取28元威客电竞赛事游戏体验金，此彩金仅有一次投注机会，通过此免费彩金在威客电竞固赔和滚球盘口投注盈利后，盈利的金额会自动添加至用户威客电竞钱包中，免费彩金的本金不会入账。
                <div class="appshow_btn btn">
                  <router-link to="/appshow" class="d_btn normal">下载APP</router-link>
                </div>
            </div>
          </div>
          <div class="active_section_box">
            <div class="active_title">
              {{$t("Activity_rules")}}
            </div>
            <div class="section_box_wrapper">
              <div class="active_desc">
                1. 此活动仅限新注册会员申请，注册后已有充值、投注或提款记录的玩家不可申请此彩金，此注册优惠不与其他注册送活动共享，每位新会员仅限申请一次。<br>
                2. 新会员需在官方APP中领取彩金并参与威客电竞游戏投注，投注盈利的金额需完成全站的一倍流水。<br>
                3. 参与此优惠活动的会员需在平台有过存款记录才可提款。<br>
                4. 此活动投注盘口仅限威客电竞固赔和滚球盘口，盘口赔率要求需≥1.45且≤4.5，有效投注额仅计算产生输赢结果的注单，走盘、注单取消、对冲等情况都不算有效流水。<br>
                5. 若用户使用28元彩金投注的注单因客观原因被取消，请联系在线客服再次领取体验金。<br>
                6. 每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能使用一个账号享受优惠，如发现有违规者我们将保留无限期审核，和扣回红利及所产生的利润权利。VKGAME对本活动保有最终解释权。
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
  name: 'newuser28',
  components: {},
  data() {
     return {
       start_time:''
     }
  },
  mounted () {
    this.getEgameRegSendInit()
  },
  methods: {
    getEgameRegSendInit () {
      this.$http(this.ApiSetting.active.getEgameRegSendInit)
        .then((res) => {
          if(res.status === 1){
            let stime = new Date(res.data.active_start_time*1000)
            this.start_time = stime.getFullYear() + '年' + (stime.getMonth() + 1) + '月' + stime.getDate() + '日'
          }
        })
    }
  }
}
</script>
<style scoped>
  .active_home .active_page.newuser28{
    padding: 560px 0 80px;
  }
  .active_page.newuser28 .active_page_top_btn{
    top: 540px;
  }
  .newuser28{
    background: url("../../../assets/active/newuser28-banner.jpg") no-repeat center top;
  }
 .newuser28 .appshow_btn {
   width: 93px;
   height: 25px;
   margin: 30px auto 0;
 }
  .newuser28 .appshow_btn .d_btn{
    width: 100%;
    height: 100%;
    line-height: 25px;
    font-size: 12px;
  }
</style>
