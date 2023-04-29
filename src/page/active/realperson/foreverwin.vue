<template>
  <div class="foreverwin active_page">
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
                {{start_time}}起
              </div>
            </div>
          </div>
          <div class="active_section_box">
            <div class="active_title">
              活动内容
            </div>
            <div class="section_box_wrapper">
              <div class="active_time">
                活动期间VIP会员投注<span class="specil_c">威客真人百家乐游戏，连赢5局</span>并完成单笔投注额要求即可领取活动彩金。
              </div>
              <table align="center" width="100%" v-if="!load&&bounskeys.length">
                <tbody >
                   <tr class="specil_cb">
                     <td rowspan="2">连赢每局单笔投注额</td>
                     <td colspan="4">VIP连赢彩金</td>
                     <td rowspan="2">彩金流水要求</td>
                   </tr>
                   <tr>
                     <td v-for="(item,key) in initInfo.active_setting" :key="key">{{item.level_cn}}</td>
                   </tr>
                   <tr>
                     <td>≥{{bounskeys[0]}}</td>
                     <td v-for="(item,key) in initInfo.active_setting" :key="key">{{item.bouns[bounskeys[0]]}}</td>
                     <td rowspan="5">真人游戏{{initInfo.bet_times}}倍流水</td>
                   </tr>
                   <tr v-for="(bounskey,index) in bounskeys" :key="index" v-show="index>0">
                     <td>≥{{bounskey}}</td>
                     <td v-for="(item,key) in initInfo.active_setting" :key="key">{{item.bouns[bounskey]}}</td>
                   </tr>
                </tbody>
              </table>
               <div  v-else class="btn"> <span class="btn_loading"></span></div>
            </div>
          </div>
          <div class="active_section_box">
            <div class="active_title">
              申请方式
            </div>
            <div class="section_box_wrapper">
              <div class="active_desc">
                会员完成连赢过关后需联系在线客服申请彩金，会员在申请时需提供注单号，相关工作人员审核完成后将在48小时内派发至用户的真人游戏钱包中。<br>
                若会员在过关后的24小时内未联系在线客服申请此优惠，则视为自动放弃。
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
                 1. 此优惠活动仅针对在AG真人/欧博真人/PT真人其中单个平台内投注真人百家乐游戏并连续产生连赢的会员，若投注其他游戏连赢5场，则无法申请此优惠活动。<br>
                 2. 此优惠活动<span class="specil_c">连赢仅计算百家乐游戏中的庄/闲投注玩法</span>，若在过关期间投注百家乐游戏中的其他玩法，无论输赢均视无法参与此优惠活动。<br>
                 3. 会员连赢每局单笔投注额需符合活动要求，连赢局数中的单笔投注额以最低投注额为彩金计算标准。<br>
                    例：VIP3会员连赢5局，5笔注单中的最低投注额为500，则此时该会员可申请68元连赢彩金。<br>
                 4. 游戏过程中若出现和局不影响连赢，但不计算在连赢局数之内；局号相同的多个注单仅计算下注金额最高的注单，其与注单不计算在连赢场次内。<br>
                 5. 此优惠活动每24小时内仅限申请一次，连赢过关场次完成后需在24小时内（以连赢最后一局注单结束时间为准）联系在线客服进行申请，审核通过后彩金会自动添加至用户连赢所对应的真人游戏钱包中。<br>
                 6. 活动彩金需在对应游戏钱包中完成5倍有效流水，当用户对应游戏钱包余额≤原钱包余额且无未结算注单时，系统将自动判定已完成活动规定的有效流水，流水未完成前不可再次申请此优惠活动。<br>
                 7. 每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能使用一个账号享受优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利。VKGAME对本活动保有最终解释权。
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
  name: 'foreverwin',
  components: {},
  data() {
    return {
      initInfo:{},
      start_time:'',
      load: false,
      bounskeys:[]
    }
  },
  mounted () {
    this.getSportFirstTransferInit();
  },
  methods: {
    getSportFirstTransferInit() {
      this.load = true
      this.$http(this.ApiSetting.active.getForeverWinInit)
      .then(res => {
        this.load = false
        if(res.status == 1 && res.data) {
          this.initInfo = res.data;
          if(this.initInfo.active_setting && this.initInfo.active_setting[0] && this.initInfo.active_setting[0].bouns) {
            this.bounskeys = Object.keys(this.initInfo.active_setting[0].bouns)
          }
          let stime = new Date(res.data.active_start_time*1000)
          this.start_time = stime.getFullYear() + '年' + (stime.getMonth() + 1) + '月' + stime.getDate() + '日'
        }
      })
      .catch(()=>{
        this.load = false
      })
    }
  }
}
</script>
<style scoped>
.foreverwin{
  background: url("../../../assets/active/foreverwin-banner.jpg") no-repeat center top;
  position: relative;
}
.foreverwin .active_page_content {
  padding:30px  180px !important;
}
.section_box_wrapper table{
  margin-top: 20px;
  border-spacing: 0;
  border-collapse: unset;
  border-top: #17191f 1px solid;
  border-right: #17191f 1px solid;
}
.section_box_wrapper table td {
  text-align: center;
  line-height: 50px;
  color: #c3c3c3;
  border-left: #17191f 1px solid;
  border-bottom: #17191f 1px solid;
}
 .specil_c {
   color: #07f1b7;
 }
 .specil_cb td{
   color: #07f1b7 !important;
   font-size: 18px;
 }
  table tbody.loading .btn{
    height: 150px;
  }
  .btn {
    text-align: center;
  }
</style>

