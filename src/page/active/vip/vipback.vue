<template>
  <div class="vipbackwater active_page">
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
              <div class="active_time">
                所有参与VKGAME游戏投注的VIP会员均可享受每日返水奖金，返水不设上限。
                <table v-if="vipBack.length">
                  <tr >
                    <td v-for="j in titArr.length" :key="j" v-html="titArr[j-1]"></td>
                  </tr>
                  <tr v-for="i in 13" :key="i">
                     <td>{{vipBack[i-1].level}}</td>
                     <td>{{vipBack[i-1].egame_back}}%</td>
                     <!-- <td>{{vipBack[i-1].tfgame_back}}%</td> -->
                     <td>{{vipBack[i-1].imgame_back}}%</td>
                     <td>{{vipBack[i-1].other_egame_back}}%</td>
                     <td>{{vipBack[i-1].sport_back}}%</td>
                     <td>{{vipBack[i-1].crown_back}}%</td>
                     <td>{{vipBack[i-1].bti_back}}%</td>
                     <td>{{vipBack[i-1].pb_sport_back}}%</td>
                     <!-- <td>{{vipBack[i-1].pb_sport_back}}%</td> -->
                     <td>{{vipBack[i-1].live_game_back}}%</td>
                     <td>{{vipBack[i-1].chess_back}}%</td>
                     <td>{{vipBack[i-1].slots_back}}%</td>
                  </tr>
                  <tr><td :colspan="titArr.length" style="text-align: left;line-height: 20px;padding: 0 10px">小艾电竞包含自走棋。其它体育：平博体育、IM体育、沙巴体育。真人：AG真人、PM真人、WE真人、欧博真人、PT真人。棋牌：乐游棋牌、开元棋牌、凯旋棋牌、博乐棋牌。电子游戏：PT电子游戏、PG电子游戏。</td></tr>
                </table>
              </div>
            </div>
          </div>
          <div class="active_section_box">
            <div class="active_title">
              {{$t("Activity_rules")}}
            </div>
            <div class="section_box_wrapper">
              <div class="active_desc">
                1.小艾电竞包含自走棋。其它体育包括：平博体育、IM体育、沙巴体育。真人包括：AG真人、PM真人、WE真人、欧博真人、PT真人。棋牌包括:乐游棋牌、开元棋牌、凯旋棋牌、博乐棋牌。电子游戏包括：PT电子游戏、PG电子游戏。<br>
                2.电竞/体育返水每日18:00左右自动派发，其余游戏返水每日凌晨0:30左右自动派发、无需申请。返现奖金无最低派发额度，无上限，此奖金需完成活动规定的1倍全站有效流水。返水计算周期为：昨日0点至今日0点的返水报表。<br>
                3.电竞赔率＜1.5、亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水。<br>
                4.所有轮盘类游戏、牛牛、骰宝、捕鱼王、空战世纪将不享受返水优惠；PT电子游戏中以下游戏不享受返水优惠： <activeptliushui></activeptliushui>。<br>
                5.每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能使用一个账号享受优惠。对违规的用户，VKGAME保留无限期审核， 和扣回红利及所产生的利润权利。<br>
                6.VKGAME对本活动保有最终解释权。
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
  name: 'vipbackwater',
  components: {},
  data () {
    return {
      titArr: ['等级', '小艾电竞', 'IM电竞', 'RG电竞', '威客&FB体育', '皇冠体育', 'BTI体育', '其他体育', '真人', '棋牌', '电子游戏'],
      start_time: '',
      vipBack: []
    }
  },
  mounted () {
    this.vipGameBack()
  },
  methods: {
    vipGameBack () {
      this.$http(this.ApiSetting.active.vipGameBack)
        .then(res => {
          if (res.status == 1 && res.data) {
            this.vipBack = res.data.setting
            let stime = new Date(res.data.active_start_time * 1000)
            this.start_time = stime.getFullYear() + '年' + (stime.getMonth() + 1) + '月' + stime.getDate() + '日'
          }
        })
    }
  }

}
</script>
<style lang="less" scoped>
.vipbackwater{
  background: url("../../../assets/active/fanshui-banner.jpg") no-repeat center top;
  .active_page_content {
    padding: 30px 50px !important;
  }
  table {
    width: 100%;
    margin: 45px 0 0 ;
    border:1px solid #333548;
    font-size: 16px;
    color: #ffffff;
    tr {
      height: 50px;
      td {
         &:first-child {color: #07f1b7}
          border:1px solid #333548;
      }
      &:first-child {color: #07f1b7}
      &:last-child td:first-child {
        font-size: 14px;
        color: #c3c3c3;
      }
      &:nth-child(even) {
        background:#262933;
      }
      &:nth-child(odd) {
        background:#20232b;
      }
    }
  }
}

</style>
