<template>
  <div class="call_friend active_page">
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
                 {{initInfo.start_time}}-{{initInfo.end_time}}
              </div>
            </div>
          </div>
          <div class="active_section_box">
            <div class="active_title">
              {{$t("Active_content")}}
            </div>
            <div class="section_box_wrapper">
              <div class="active_time">
                活动期间所有VIP会员在平台累计总流水≥3000即可参与端午节专属ROLL房间抽奖。
                <table>
                  <thead>
                    <th>ROLL房间奖品</th>
                    <th>奖品数量</th>
                    <th>开奖时间</th>
                  </thead>
                  <tr  >
                    <td>端午节定制礼盒</td>
                    <td>12</td>
                    <td>{{initInfo.prize_time}}</td>
                  </tr>
                </table>
                <p class="liushui" v-show="!load&&initInfo.is_login&&initInfo.status!=2">当前总流水：{{initInfo.bet}}元</p>
                <div class="btn">
                  <div class="d_btn normal"  @click="enterroll()" :class="{'disabled':initInfo.status==2}">
                    <div class="btn_loading_box " v-show="load"><span class="small_loading"></span></div>
                    进入房间参与抽奖
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="active_section_box">
            <div class="active_title">
              {{$t("Activity_rules")}}
            </div>
            <div class="section_box_wrapper">
              <div class="active_desc"  >
                1. 此活动奖品不可折现，中奖的用户需在ROLL房开奖后的48小时内联系在线客服并提供您的收货地址。					<br>
                2. 电竞赔率＜1.45、亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、走盘、注单取消、对冲等情况都不算有效流水；PT电子游戏中以下游戏不算有效流水： <activeptliushui></activeptliushui>。
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
  name: 'dragonboatfestival',
  components: {},
  data() {
     return {
       initInfo:{},
       load: false,
     }
  },
  mounted () {
    this.getInit();
  },
  methods: {
    getInit() {
      this.load = true
      this.$http(this.ApiSetting.active.getDragonBoatFestivalInit)
      .then(res => {
        this.load = false
        if(res.status == 1 && res.data) {
          this.initInfo = res.data;
          let stime = new Date(res.data.active_start_time*1000)
          let etime = new Date(res.data.active_end_time*1000)
          this.initInfo.start_time = stime.getFullYear() + '年' + (stime.getMonth() + 1) + '月' + stime.getDate() + '日'
          this.initInfo.end_time = stime.getFullYear() + '年' + (etime.getMonth() + 1) + '月' + etime.getDate() + '日'
        }
      })
      .catch(()=>{
        this.load = false
      })
    },
    enterroll() {
      if(this.load||this.initInfo.status==2) {
        return;
      }
      if(this.initInfo.status==0) {
        this.$router.push("/roll/"+this.initInfo.roll_num)
      }else {
        this.$message({
          message: this.initInfo.status_tip,
          type: 'warning'
        })
      }
    }
  }
}
</script>
<style scoped>
.call_friend{
  background: url("../../../assets/active/duanwu_banner.jpg") no-repeat center top;
}
.liushui {
  color: #fff;
  margin-top:20px;
  font-size: 16px;
}
.section_box_wrapper table{
  width: 100%;
  font-size: 16px;
  margin-top: 20px;
  border-spacing: 0;
  border-collapse: unset;
  border-top: #333548 1px solid;
  border-right: #333548 1px solid;
}
.section_box_wrapper table td, .section_box_wrapper table th{
  text-align: center;
  line-height: 50px;
  color: #fff;
  border-left: #333548 1px solid;
  border-bottom: #333548 1px solid;
}
.section_box_wrapper table th{
  color: #07f1b7;
  font-weight: normal;
}
.btn {
  margin-top: 20px;
  position: relative;
}
.d_btn {
  padding: 0 10px;
  font-size: 16px;
  width: 140px;
}
.d_btn.normal {
  background: linear-gradient(to right, #07e9f1 , #07f1b7);
}
.d_btn.normal:hover {
  background: linear-gradient(to right, #07f1b7 , #07e9f1);
}
</style>
