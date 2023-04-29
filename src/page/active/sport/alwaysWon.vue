<template>
  <div class="active_page alwaysWon">
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
              <div class="active_time">活动期间会员投注体育赛事，完成指定连赢次数并满足单场投注需求即可获得对应彩金。</div>
              <table border="1" align="center" cellspacing="0" width="100%">
                <thead>
                  <tr align="center">
                    <th v-for="(item, index) in tableList[0]" v-html="item" :key="index">连赢场数</th>
                  </tr>
                </thead>
                <tbody>
                  <tr align="center" v-for="(item, index) in [tableList[1], tableList[2], tableList[3]]" :key="index">
                    <td v-for="(txt, i) in item" :key="i" v-html="txt"></td>
                  </tr>
                  <tr align="center">
                    <td>流水要求</td>
                    <td :colspan="tableList[0].length - 1">一倍体育</td>
                  </tr>
                </tbody>
              </table>
              <div class="btn">
                <div class="d_btn normal" @click="openKfWindow()">联系客服申请</div>
              </div>
            </div>
          </div>
          <div class="active_section_box">
            <div class="active_title">{{$t("Activity_rules")}}</div>
            <div class="section_box_wrapper">
              <div class="active_desc">
                <p>
                  1. 此优惠活动仅针对在威客体育、FB体育、BTI体育、平博Sports、皇冠体育、沙巴体育、IM体育其中单个平台内投注体育赛事产生连赢的会员，若投注其他赛事连赢，则无法申请此优惠活动。<br>
                  2. 参与此优惠的会员需要在体育赛事投注独赢，让球，大小，单双四个盘口，允许投注上半场或全场及滚球（不包括特殊盘口）；盘口赔率要求：不得低于欧盘1.75、亚洲盘及马来盘0.75。<br>
                  3. 此优惠活动连赢不计算串关玩法，若在期间投注串关玩法，无论输赢均视无法参与此优惠活动。若会员在一场赛事中，连续投注同一玩法,产生连赢的注单，均视为连赢场数为1。相反，投注不同玩法产生连赢，则正常计算连赢场数。<br>
                  4. 会员连赢每局单笔投注额需符合活动要求，连赢局数中的单笔投注额以最低投注额为彩金计算标准。<br>
                  5. 会员相邻的连赢注单投注时间不得超过24小时。例：会员连赢了3场比赛，第3场比赛的投注时间与第2场比赛投注时间间隔不得超过24小时，若超过24小时，会员只能申请连赢2场的彩金。<br>
                  6. 此优惠活动每24小时内仅限申请一次，连赢场次完成后需要24小时内（以连赢最后一局注单结束时间为准）联系在线客服进行申请，逾期则视为自动放弃。<br>
                  7. 彩金将在审核通过后的3日内派发至用户指定的体育钱包（威客体育、FB体育、BTI体育、平博Sports、皇冠体育、沙巴体育、IM体育七选一）中，彩金需在所选游戏中完成对应的流水要求，流水未完成前不可再次申请本活动；当用户对应体育钱包余额≤原钱包余额且无未结算注单时，系统将自动判定已完成活动规定的有效流水。亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水。<br>
                  8. 每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能使用一个账号享受优惠。对违规的用户，VKGAME保留无限期审核，和扣回红利及所产生的利润权利，本活动最终解释权归VKGAME所有。
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
  name: 'alwaysWon',
  data () {
    return {
      initInfo: {},
      tableList: [
        ['连赢场数', 3, 4, 5, 6, 7, 8],
        ['<span>单场投注≥500</span><br>可获彩金', 28, 38, 58, 88, 128, 188],
        ['<span>单场投注≥1000</span><br>可获彩金', 38, 58, 88, 128, 188, 288],
        ['<span>单场投注≥2000</span><br>可获彩金', 58, 88, 128, 188, 228, 388]
      ]
    }
  },
  mounted () {
    this.initActiveData()
  },
  methods: {
    initActiveData () {
      this.$http(this.ApiSetting.active.europeCupNostopWinInit).then(res => {
        if (res.status === 1 && res.data) {
          this.initInfo = res.data
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.alwaysWon {
  background: url("../../../assets/active/alwaysWon_banner.jpg") no-repeat center top;
  position: relative;

  .section_box_wrapper {
    table {
      border: none;
      margin: 20px 0 20px;

      tbody {
        tr {
          &:nth-child(odd) {
            background: #1a1c27;
          }
        }
      }

      td, th {
        border-color: #303344;
        text-align: center;
        height: 60px;
        color: #c3c3c3;
        font-size: 16px;
        width: 13%;

        &:nth-child(1) {
          width: 20%;
          color:#07f1b7;

          /deep/ span {
            color: #ffffff;
          }
        }
      }

      th {
        font-weight: 400;

        &:not(:first-child) {
          color: #ffffff;
          font-size: 16px;
        }
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
