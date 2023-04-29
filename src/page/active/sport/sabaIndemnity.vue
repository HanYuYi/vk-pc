<template>
  <div class="active_page sabaIndemnity">
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
              <div class="active_time">活动期间，VIP会员在FB体育、BTI体育、IM体育、沙巴体育、皇冠体育可享受首单100%包赔优惠，活动彩金最高领取{{initInfo.bonus}}元！</div>
              <table border="1" align="center" cellspacing="0" width="100%">
                <thead>
                  <tr>
                    <th width="36%">注单要求</th><th width="16%">返还比例</th><th width="16%">最高返还</th><th width="16%">游戏场馆要求</th><th width="16%">流水要求</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>单笔投注金额不限</td>
                    <td rowspan="3">100%</td>
                    <td rowspan="3">{{ initInfo.bonus }}</td>
                    <td rowspan="3">FB体育<br/>BTI体育<br/>IM体育<br>沙巴体育<br>皇冠体育</td>
                    <td rowspan="3">体育游戏6倍流水</td>
                  </tr>
                  <tr>
                    <td>注单结果为输值</td>
                  </tr>
                  <tr>
                    <td>第一笔在FB体育/BTI体育/IM体育/沙巴体育/皇冠体育投注的注单</td>
                  </tr>
                </tbody>
              </table>
              <div class="btn">
                <div class="d_btn normal" @click="openKfWindow()">联系客服</div>
              </div>
            </div>
          </div>
          <div class="active_section_box">
            <div class="active_title">{{$t("Activity_rules")}}</div>
            <div class="section_box_wrapper">
              <div class="active_desc">
                <p>
                  1. 活动期间，VIP会员在FB体育或BTI体育或IM体育或沙巴体育或皇冠体育的第一笔有效注单结果为全输，即可享受首单100%包赔优惠，活动彩金最高领取{{ initInfo.bonus }}元！<br>
                  2. 符合以上条件的会员，请在注单结束后的24小时内联系在线客服进行申请并选择彩金派发钱包，客服审核无误后将于24小时内派发彩金至对应的体育游戏钱包中，逾期则视为自动放弃。<br>
                  3. 申请首单100%包赔的注单需为全输，若会员所投注的注单结算为输一半则视为无效注单，不可申请。<br>
                  4. 此优惠活动每位会员仅限领取一次，领取当天不与新用户首存优惠活动、电子首存优惠活动、电竞首存优惠活动、VIP月存款活动、体育周存款活动、体育包赔单活动、棋牌周存款、真人周存款活动共享。<br/>
                  5. 流水赔率要求：亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水。<br>
                  6. 每位有效玩家、每一手机号码、电子邮箱、相同银行卡、每一个IP地址、每一台电脑者只能享受一次优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利。<br>
                  7. VKGAME对本活动保有最终解释权。
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
  name: 'sabaIndemnity',
  data () {
    return {
      initInfo: {}
    }
  },
  mounted () {
    this.initActiveData()
  },
  methods: {
    initActiveData () {
      this.$http(this.ApiSetting.active.shabaIndemnityActiveInit).then(res => {
        if (res.status === 1 && res.data) {
          this.initInfo = res.data
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.sabaIndemnity {
  background: url("~@/assets/active/sports/sabaIndemnity/banner.jpg") no-repeat center top;

  .section_box_wrapper {
    table {
      border: none;
      margin: 20px 0 20px;

      td, th {
        border-color: #303344;
        text-align: center;
        height: 49px;
        color: #c3c3c3;
        font-size: 16px;
      }

      th {
        font-weight: 400;
        color: #07f1b7;
      }
    }
  }

  .btn {
    display:flex;
    justify-content: center;
    margin-top:20px
  }
}
</style>
