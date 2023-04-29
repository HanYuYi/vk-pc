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
                {{initInfo.start_time}}起
              </div>
            </div>
          </div>
          <div class="active_section_box">
            <div class="active_title">
              {{$t("Active_content")}}
            </div>
            <div class="section_box_wrapper">
              <div class="active_desc active_time">
                	即日起，VIP会员在VKGAME使用”银行卡直充”、”支付宝转银行卡”渠道进行首充，充值成功的会员笔笔存款都送好运金，单日上限最高1000元。
                <table border="0" v-show="!load" align="center" cellspacing="0" width="100%">
                  <thead>
                  <tr align="center">
                    <th width="50%">VIP等级</th>
                    <th >好运金单日上限</th>
                  </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,index) in initInfo.setting" :key="index">
                      <td>{{item.title}}</td>
                      <td>{{item.max_bonus}}</td>
                    </tr>
                  </tbody>
                </table>
                <div v-show="load">
                  <span class="small_loading"></span>
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
              	1.只有在威客电竞使用“银行卡直充”或者“支付宝转银行卡”渠道进行充值，成功后即可获赠充值金额的1%好运金，且充值额与好运金同时到账。好运金单日上限最高为1000元。（提款为1倍流水）<br>
                <span class="color_r">2.VIP会员每日未提款前的存款都视为首充。</span><br>
                3.好运金活动可与威客电竞其他优惠活动共享。<br>
                4.电竞赔率＜1.45、亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、走盘、注单取消、对冲等情况都不算有效流水；PT电子游戏中以下游戏不算有效流水： <activeptliushui></activeptliushui>。<br>
                5.本活动遵从威客电竞的网站活动规则与条款，威客电竞对本次活动拥有最终解释权。
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
  name: 'goodluck',
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
      this.$http(this.ApiSetting.active.getGoodLuckInit)
      .then(res => {
        this.load = false
        if(res.status == 1 && res.data) {
          this.initInfo = res.data;
          let stime = new Date(res.data.active_start_time*1000)
          this.initInfo.start_time = stime.getFullYear() + '年' + (stime.getMonth() + 1) + '月' + stime.getDate() + '日'
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
.call_friend{
  background: url("../../../assets/active/goodluckbanner.jpg") no-repeat center top;
  .color_r {
    color: red;
  }
  table {
    margin-top: 24px;
    font-size: 16px;
    color: #fff;
    border-top: #333548 1px solid;
    border-right: #333548 1px solid;
    th {
      color:#07f1b7 ;
    }
    td,th {
      line-height: 50px;
      border-left: #333548 1px solid;
      border-bottom: #333548 1px solid;
    }
  }
}
</style>
