<template>
  <div class="vipgamegold active_page">
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
              <div class="active_time" v-if="!load">
               活动期间，VIP用户在威客电子游戏中每日累计有效流水达到一定要求即可获得海量额外V币奖励，每日最高可获得8888V币。
                <table >
                   <tr class="he_t">
                     <td rowspan="2">每日有效流水</td>
                     <td colspan="4">VIP等级</td>
                     <td rowspan="7">
                       <div class="btn">
                        <div class="d_btn disabled" v-if="initInfo.status==1" >已领取</div>
                        <div class="d_btn normal" @click="apply()"  v-else>领取V币</div>
                       </div>
                     </td>
                   </tr>
                   <tr class="lit_t">
                     <td v-for="(item,index) in initInfo.active_setting" :key="index">{{item.level_cn}}</td>
                   </tr>
                   <tr v-for="(bouns,index) in bounskeys" :key="index">
                     <td>{{bouns}}</td>
                     <td v-for="(item,index) in initInfo.active_setting" :key="index">{{item.bouns[bouns]}}V币</td>
                   </tr>
                </table>
              </div>
              <div v-else><span class="loading"></span></div>

            </div>
          </div>
          <div class="active_section_box">
            <div class="active_title">
              {{$t("Activity_rules")}}
            </div>
            <div class="section_box_wrapper">
              <div class="active_desc">
               1. 活动期间符合条件的会员需在次日00:00:00-23:59:59之间在活动页面手动领取V币奖励，逾期则视为自动放弃。<br>
               2. 此活动仅计算<span class="color_07f1b7">PT电子游戏、PG电子游戏</span>每日所产生的有效流水；PT电子游戏中以下游戏不计算为有效流水： <activeptliushui></activeptliushui>。<br>
               3. 会员参与此活动所获得V币奖励将会自动添加至会员的V币钱包中。								<br>
               4. 每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能使用一个账号享受优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利。VKGAME对本活动保有最终解释权。
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
  name: 'childrensday',
  components: {},
  data () {
    return {
      initInfo:{},
      load:true,
      ajaxLoad:false,
      bounskeys:[]
    }
  },
  mounted () {
    this.getVipPrivilegeInit()
  },
  methods: {
    getVipPrivilegeInit() {
      this.load = true
      this.$http(this.ApiSetting.active.getChildrensDayInit)
      .then(res => {
        this.load = false
        if(res.status == 1 && res.data) {
          this.initInfo = res.data;
          let stime = new Date(res.data.active_start_time*1000)
          let etime = new Date(res.data.active_end_time * 1000);
          this.initInfo.start_time = stime.getFullYear() + '年' + (stime.getMonth() + 1) + '月' + stime.getDate() + '日'
          this.initInfo.end_time = (etime.getMonth() + 1) + '月' + etime.getDate() + '日';
           if(this.initInfo.active_setting && this.initInfo.active_setting[0] && this.initInfo.active_setting[0].bouns) {
             this.bounskeys = Object.keys(this.initInfo.active_setting[0].bouns)
           }
        }
      })
      .catch(res=>{
        this.load = false
      })
    },
    apply() {
      if(!this.initInfo.is_login) {
        this.$message({
          message: '请先登录！',
          type: 'warning'
        })
        return;
      }
      if(this.initInfo.status!=0) {
        this.$message({
          message: this.initInfo.status_tips,
          type: 'warning'
        })
        return;
      }

        if(this.ajaxLoad){
          return;
        }

        this.ajaxLoad = true
        this.$http(this.ApiSetting.active.joinChildrensDay)
        .then(res => {
          this.ajaxLoad = false
          if(res.status ==1) {
            if(res.data.bonus) {
              this.$message({
                message: '成功领取'+res.data.bonus +'V币',
                type: 'success'
              })
            }else {
              this.$message({
                message: '领取成功' ,
                type: 'success'
              })
            }

            this.initInfo.status = 1
            this.$forceUpdate()
          }
        })
        .catch(()=>{
          this.ajaxLoad = false
        })

    }
  },
}
</script>
<style lang="less" scoped>
.vipgamegold{
  background: url("../../../assets/active/childrensday-banner.jpg") no-repeat center top;
  padding-top:510px;
  .active_page_wrapper {
    text-align: center;
  }
  .active_desc {
    text-align: left;
  }
  .text_show {
    font-size: 14px;
    color: #53586b;
  }
  .active_time .btn {
      margin-top:10px;
    }
  .d_btn {
    width: 126px;
    height: 29px;
    line-height: 29px;
  }
  table {
    margin: 45px 0 30px ;
    border:1px solid #1b1d24;
    font-size: 18px;
    tr {
      height: 40px;
      &.lit_t td {
        color: #0adbac;;
      }
      &.he_t td {
        // font-size: 16px;
      }
      td {
          border:1px solid #1b1d24;
          width: 135px;
          &:last-child {
            width: 160px;
          }
      }
      &:first-child {color: #07f1b7}
    }
  }
  .loading{
    display: inline-block;
    width: 25px;
    height: 25px;
    vertical-align: middle;
    background: url("../../../assets/btn-loader.gif") no-repeat center;
    background-size: 100% 100%;
  }
}

</style>
