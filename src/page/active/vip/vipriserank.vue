<template>
  <div class="active_page vipriserank">
    <div class="active_page_wrapper">
      <div class="wrapper">
        <div class="top_bg">
          <div class="bg1"></div>
          <div class="bg2"></div>
        </div>
        <div class="active_page_content">
          <div class="active_section_box">
            <div class="active_title">
              {{$t('The_activity_time')}}
            </div>
            <div class="section_box_wrapper">
              <div class="active_time">
                {{initInfo.active_show_time}}
              </div>
            </div>
          </div>
          <div class="active_section_box">
            <div class="active_title">
              {{$t('Active_content')}}
            </div>
            <div class="active_time" v-if="load">
            <span class="small_loading" ></span>
            </div>
            <div class="section_box_wrapper" v-else>
              <div class="active_time">
                满足条件的VIP会员在活动规定时间内晋升VIP等级即可获得额外的晋级彩金。  														
              </div>
              <table border="1"  align="center" cellspacing="0" width="100%">
                <tr>
                  <td class="color_07f1b7" >参与要求</td>
                  <td colspan="5">此活动仅限VIP等级≥2级以上会员参与。</td>
                </tr>
                <tr>
                  <td class="color_07f1b7">晋级要求</td>
                  <td v-for="(item,index) in 4" 
                  :key="index">晋升{{item}}级</td>
                  <td>晋升5级及以上</td>
                </tr>
                <tr class="color_f4d363">
                  <td class="color_07f1b7">晋级彩金</td>
                  <td>38元</td>
                  <td>68元</td>
                  <td>88元</td>
                  <td>188元</td>
                  <td>288元</td>
                </tr>
                <tr>
                  <td class="color_07f1b7">彩金流水要求</td>
                  <td colspan="5">全站1倍有效流水</td>
                </tr>
              </table>
              <!--0可领取  1：已领取   2：可领取等待开始 -->
              <p class="ffft" v-show="initInfo.status==0||initInfo.status==2">
               {{initInfo.status_tips}}
              </p>
              <div class="btn" v-show="initInfo.status>=0&&initInfo.status<=2">
                <div href="javascript:;" class="to_apply d_btn normal" @click="showApplyDialog" 
                :class="{'disabled':isLogin&&(initInfo.status != 0)}">
                {{isLogin&&initInfo.status==1?'已领取':'立即领取'}}
                </div>
              </div>
            </div>
          </div>
          <div class="active_section_box">
            <div class="active_title">
              {{$t("Activity_rules")}}
            </div>
            <div class="section_box_wrapper">
              <div class="active_desc">
                1. 此活动仅计算2021年1月17日00:00:00至2021年2月17日23:59:59期间VIP等级≥2级会员的晋升级数。<br>
                例如：VIP2级会员在活动期间升级为VIP5，该会员VIP等级晋升3级，此时可领取88元彩金。<br>
                2. 活动彩金领取时间为：2月18日10:00:00至2月20日23:59:59，若会员未在规定时间内领取则视为自动放弃。<br>
                3. 此活动彩金需完成全站1倍有效流水，电竞赔率＜1.45、亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、走盘、注单取消、对冲等情况都不算有效流水；PT电子游戏中以下游戏不算有效流水： <activeptliushui ></activeptliushui>。<br>
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
import { mapState } from 'vuex'
export default {
  name: 'vipriserank',
  components: {},
  data() {
    return {
      initInfo:{},
      ajaxLoad:false,
      load:false,
    }
  },
  computed: {
    ...mapState(["isLogin"])
  },
  mounted () {
    this.getInit()
  },
  methods: {
    getInit() {
      this.load = true
      this.$http(this.ApiSetting.active.getNewYearUpgradeBonusInit)
      .then(res => {
        this.load = false
        if(res.status == 1 && res.data) {
          this.initInfo = res.data;
        }
      },err=>{
        this.load = false
      })
    },
    showApplyDialog () {
      //0可领取 1：已领取 2：可领
      if(!this.isLogin) {
        this.$message({
          message: '请您先登录!',
          type: 'warning'
        })
        return
      }
      if(this.initInfo.status !=0) {
        return
      }
      if(this.ajaxLoad){
        return;
      }
      this.ajaxLoad = true
      this.$http(this.ApiSetting.active.joinNewYearUpgradeBonus)
      .then(res => {
        if(res.status == 1) {
           this.$message({
            message: '恭喜您成功领取' + res.data.bonus + '元彩金',
            type: 'success'
           })
          this.initInfo.status = 1
          this.showDialog = false
        }
        this.ajaxLoad = false
      }, err => {
        this.ajaxLoad = false
      })
    },
  }
}
</script>
<style lang="less" scoped>
.vipriserank{
  background: url("../../../assets/active/vipriserank-banner.jpg") no-repeat center top;
  .active_page_content {
    padding: 30px 190px 30px !important;
  }
  .color_f4d363 {
    color: #f4d363;
  }
  .textl {
    text-align: left;
    padding-left: 20px;
  }
  .ffft {
    color: #fff;
    margin-top:25px ;
    text-align: center;
  }
  table {
    border: none;
    margin-top: 20px;
    .color_07f1b7 {
      font-size: 16px;
    }
    td{
      box-sizing: border-box;
      border-color: #303344;
      text-align: center;
      line-height: 50px;
    }
  }
  .section_box_wrapper .btn {
    margin-top: 25px;
    text-align: center;
    .to_apply{
     width: 128px;
     height: 35px;
      line-height: 35px;
      font-size: 17px;
    }
  }
}
 </style>