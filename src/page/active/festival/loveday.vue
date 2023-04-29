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
                活动期间VIP会员存款并达到活动规定的有效流水即可点亮520，领取520现金红包奖励，红包奖励最低8元起！
                <table >
                  <tr>
                    <td>单日总存款</td>
                    <td>单日总流水</td>
                    <td>点亮次数</td>
                    <td>累计点亮次数</td>
                    <td>彩金流水要求</td>
                  </tr>
                  <tr v-for="(item,index) in initInfo.active_setting" :key="index">
                    <td>≥{{item.day_deposit}}</td>
                    <td>≥{{item.day_bet}}</td>
                    <td>{{item.times}}</td>
                    <td>{{item.total_times}}</td>
                    <td rowspan="3" v-if="index==0">全站{{initInfo.bet_times}}倍</td>
                  </tr>
                </table>
                <ul class="heart">
                  <li
                    v-for="(light,index) in initInfo.active_setting" :key="index"
                   :class="{'canget':light.status==0,'received':light.status==1,'noopen':light.status==2||light.status==3,}">
                    <h1>{{light.num}}</h1>
                    <div
                    @click="apply(light)"
                    class="h_btn"
                    :class="{'nopointer':initInfo.is_login&&(light.status==3||light.status==1)}">
                      {{light.status==0?'立即领取':(light.status==1?'已领取':'未开启')}}
                    </div>
                  </li>
                </ul>
                VIP会员当日累计充值和累计流水达到对应要求即可按照顺序依次点亮 5 2 0 按钮，每点亮一次按钮即可获得对应的现金红包。
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
                1. 会员点亮520后需手动开启，开启520即可获得随机金额的现金红包奖励，红包奖励最低8元起！		<br>
                2. VIP会员点亮520后需在当日开启红包，开启所获得的现金奖励将会自动添加至用户的主账号中。若当日23:59:59前点亮但未开启则视为自动放弃。<br>
                3. 活动彩金需完成全站1倍有效流水，流水未完成前不可再次申请此优惠活动。		<br>
                4. 以下游戏将不计算为本活动有效流水。电竞赔率＜1.45、亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、走盘、注单取消、对冲等情况都不计算为有效流水。
                所有轮盘类游戏、牛牛、骰宝、捕鱼王、空战世纪不计算为有效流水；PT电子游戏中以下游戏不计算为有效流水： <activeptliushui></activeptliushui>。<br>
                	5. 每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能使用一个账号享受优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利。VKGAME对本活动保有最终解释权。
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
  name: 'loveday',
  components: {},
  data () {
    return {
      initInfo:{},
      load:true,
      ajaxLoad:false
    }
  },
  mounted () {
    this.getVipPrivilegeInit()
  },
  methods: {
    getVipPrivilegeInit() {
      this.load = true
      this.$http(this.ApiSetting.active.getMay20Init)
      .then(res => {
        this.load = false
        if(res.status == 1 && res.data) {
          this.initInfo = res.data;
          let stime = new Date(res.data.active_start_time*1000)
          let etime = new Date(res.data.active_end_time * 1000);
          this.initInfo.start_time = stime.getFullYear() + '年' + (stime.getMonth() + 1) + '月' + stime.getDate() + '日'
          this.initInfo.end_time = (etime.getMonth() + 1) + '月' + etime.getDate() + '日';
          this.initInfo.active_setting.forEach(item => {
            if(item.num == 5) {
              item.status = this.initInfo.status_5
            }else if(item.num == 2) {
              item.status = this.initInfo.status_2
            }else if(item.num == 0) {
              item.status = this.initInfo.status_0
            }
          })
        }
      })
      .catch(res=>{
        this.load = false
      })
    },
    apply(item) {
      if(!this.initInfo.is_login) {
        this.$message({
          message: '请先登录！',
          type: 'warning'
        })
        return;
      }
      if(item.status==0) {
        if(this.ajaxLoad){
          return;
        }

        this.ajaxLoad = true
        this.$http(this.ApiSetting.active.joinMay20,{type:item.type})
        .then(res => {
          this.ajaxLoad = false
          if(res.status ==1) {
            if(res.data.bonus) {
              this.$message({
                message: '成功领取'+res.data.bonus +'元',
                type: 'success'
              })
            }else {
              this.$message({
                message: '领取成功' ,
                type: 'success'
              })
            }

            item.status = 1
            this.$forceUpdate()
          }
        })
        .catch(()=>{
          this.ajaxLoad = false
        })
      }
    }
  },
}
</script>
<style lang="less" scoped>
.vipgamegold{
  background: url("../../../assets/active/520banner.jpg") no-repeat center top;
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
  .active_page_content {
    padding: 30px 38px  !important;
  }
  table {
    width: 1163px;
    margin: 45px 0 30px ;
    border:1px solid #1b1d24;
    font-size: 18px;
    tr {
      height: 50px;
      td {
          border:1px solid #1b1d24;
          width: 210px;
          &:last-child {
            width: 310px;
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
  .heart {
    overflow: hidden;
    width: 700px;
    margin:0 auto 50px;
    li {
      width: 116px;
      height: 151px;
      float: left;
      margin: 0 58px;
      color:#fff;
      position: relative;
      &.canget {
        background:url("../../../assets/active/520/canget.png") no-repeat;
        background-size: 100% 100%;
      }
      &.noopen {
        background:url("../../../assets/active/520/noopen.png") no-repeat;
        background-size: 100% 100%;
      }
      &.received {
        background:url("../../../assets/active/520/received.png") no-repeat;
        background-size: 100% 100%;
      }
      h1 {
        font-size: 60px;
        margin-top: 40px;
      }
      .h_btn {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 116px;
        height: 30px;
        font-size: 15px;
        line-height: 35px;
        text-align: center;
        cursor: pointer;
        &.nopointer {
          cursor: default;
        }
      }
    }
  }

}

</style>
<style lang="less">
.ptactive_dialog {

  .el-dialog__title {
    color: #ffffff;
    // font-size: 14px;
  }
  .dialog_wrapper {
    padding: 0 65px;
    color: #7c839f;
  }
  .qianbao_tit {
    color: #ffffff;
  }
  .error_desc {
    color: #e31212;
    margin-top: 5px;
    margin-bottom: 12px;
    transform: translateZ(0);
  }
  .money {
    margin-top: 8px;
  }
  .ivu-input {
    // color: #7c839f;
    &::-webkit-input-placeholder { /* WebKit browsers */
      color: #7c839f;
    }
  }
  .s_m_t i{
    color: #07f1b7;
  }

}
</style>
