<template>
  <div class="virtualcoinfirst active_page">
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
                活动期间，会员首次使用虚拟币充值，充值金额≥100元人民币即可获得38元彩金奖励！				
                <table border="0"  align="center" cellspacing="0" width="100%">
                  <thead>
                  <tr align="center">
                    <th width="34%">首笔充值要求</th>
                    <th width="34%">赠送彩金</th>
                    <th >彩金要求</th>
                  </tr>
                  </thead> 
                  <tbody>
                    <tr>
                      <td>≥100RMB</td>
                      <td>38</td>
                      <td>全站3倍有效流水</td>
                    </tr>
                    
                  </tbody>
                </table>
                <router-link to="/guide/16-2" class="vk_comfire_btn "> 查看虚拟币支付流程</router-link> 
              </div>
            </div>
          </div>
          <div class="active_section_box">
            <div class="active_title">
              {{$t("Activity_rules")}}
            </div>
            <div class="section_box_wrapper">
              <div class="active_desc"  >
               1. 本首存活动仅计算活动开始后会员使用虚拟币充值的第一笔存款且首笔充值金额≥100元人民币的有效充值，每位会员仅有一次参与机会。<br>
               2. 此活动彩金无需领取，会员充值成功后，彩金将于24小时内由系统自动发送至会员的主钱包中，活动彩金需完成活动规定的全站3倍有效流水。当用户所有钱包余额≤原钱包余额且无未结算注单时，系统将自动判定已完成活动规定的有效流水。参与此活动的会员需要绑定银行卡。<br>
               3. 电竞赔率＜1.45、亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、走盘、注单取消、对冲等情况都不算有效流水，PT电子游戏中以下游戏不计算为有效流水： <activeptliushui></activeptliushui>。		 <br> 
               4. 每位有效玩家、每一手机号码、电子邮箱、相同银行卡、每一个IP地址、每一台电脑者只能享受一次优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利。VKGAME对本活动保有最终解释权。																								
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
  name: 'virtualcoinfirst',
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
      this.$http(this.ApiSetting.active.getvirtualCoinFirstInit)
      .then(res => {
        this.load = false
        if(res.status == 1 && res.data) {
          this.initInfo = res.data;
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
.virtualcoinfirst{
  background: url("../../../assets/active/virtualcoinfirst-banner.jpg") no-repeat center top;
  .active_page_content {
    padding: 30px 190px !important;
  }
  .color_b {
    color: #fff;
  }
  table {
    margin-top: 24px;
    font-size: 16px;
    color: #fff;
    border-top: #333548 1px solid;
    border-right: #333548 1px solid;
    th {
      font-weight:normal;
      color:#07f1b7 ;
    }
    td,th {
      line-height: 50px;
      border-left: #333548 1px solid;
      border-bottom: #333548 1px solid;
    }
  }
  .vk_comfire_btn {
    display: block;
    width: 206px;
    margin:26px auto 0;
    height: 34px;
    line-height:34px;
    text-align:center;
    font-size: 18px;
    color: #000000;
    border-radius: 17px;
    background-image: linear-gradient(to right, #07e9f1, #07f1b7);
    cursor:pointer;
    transition:color 0.2s;
    &:hover {
      color:#fff;
      background-image: linear-gradient(to left, #07e9f1, #07f1b7);
    }
  }
}
</style>
