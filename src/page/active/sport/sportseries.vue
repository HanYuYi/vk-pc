<template>
  <div class="sportseries active_page">
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
                活动期间会员在体育游戏中投注串关，注单结算为全赢，即可领取喜上加喜活动彩金。				
                <table border="0"   align="center" cellspacing="0" width="100%">
                  <thead>
                  <tr align="center">
                    <th width="25%">串关组合</th>
                    <th width="25%">单注投注金额</th>
                    <th width="25%">彩金</th>
                    <th>彩金流水要求</th>
                  </tr>
                  </thead> 
                  <tbody>
                    <tr>
                      <td>3串1</td>
                      <td rowspan="6">≥200</td>
                      <td>18</td> 
                      <td rowspan="6">1倍体育流水</td> 
                    </tr>
                    <tr>
                      <td>4串1</td>
                      <td>38</td> 
                    </tr>
                    <tr>
                      <td>5串1</td>
                      <td>68</td> 
                    </tr>
                    <tr>
                      <td>6串1</td>
                      <td>88</td> 
                    </tr>
                    <tr>
                      <td>7串1</td>
                      <td>168</td> 
                    </tr>
                    <tr>
                      <td>8串1(含以上)</td>
                      <td>288</td> 
                    </tr>
                  </tbody>
                </table>
                <div @click="openKfWindow()" class="vk_comfire_btn ">联系客服申请</div> 
              </div>
            </div>
          </div>
          <div class="active_section_box">
            <div class="active_title">
              {{$t("Activity_rules")}}
            </div>
            <div class="section_box_wrapper">
              <div class="active_desc"  >
               1.参与活动的会员需要在体育赛事（威客体育、平博Sports）投注串关（不包含复式串子玩法），单笔投注的金额≥200且注单结算为全赢，即可领取活动彩金。<br>
               2.串关盘口赔率要求：串关盘口每单的赔率不得低于欧盘1.5、亚洲盘0.5。<br>
               3.申请彩金的注单需为全赢，若会员所投注的注单中有一笔被判定为输，不可申请彩金，每个会员每日仅限申请一次。<br>
               4.符合条件的会员需在所有注单结算后的24小时内联系在线客服申请彩金，逾期则视为自动放弃。彩金会在审核完毕后的24小时内发放至会员所选择的体育钱包（威客体育、平博Sports）中，彩金需完成活动规定的1倍有效流水。<br>
               5.彩金流水要求：亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、走盘、注单取消、对冲等情况都不算有效流水。<br>
               6.每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能使用一个账号享受优惠。对违规的用户，VKGAME保留无限期审核， 和扣回红利及所产生的利润权利，本活动最终解释权归VKGAME所有。													
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
  name: 'sportseries',
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
      this.$http(this.ApiSetting.active.getSportSeriesInit)
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
.sportseries{
  background: url("../../../assets/active/sportseries-banner.jpg") no-repeat center top;
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
    width: 150px;
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
