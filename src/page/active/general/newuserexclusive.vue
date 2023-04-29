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
                {{ start_time}}起
              </div>
            </div>
          </div>
          <div class="active_section_box">
            <div class="active_title">
              {{$t("Active_content")}}
            </div>
            <div class="section_box_wrapper">
              <ul class="classify_type">
                <li @click="selectType(0)" :class="{'selected':0==curType}" >
                  充值回馈 最高领取888
                  <p v-show="0==curType">新注册会员注册日起，连续累计3天存款，即可领取新会员存款优惠。</p>
                </li>
                <li @click="selectType(1)" :class="{'selected':1==curType}">
                  投注回馈 最高领取666
                  <p v-show="1==curType">新人会员注册当日打码大回馈，最高可领取666元。</p>
                </li>
              </ul>
            </div>
          </div>
          <div v-show="0==curType">
            <div class="active_section_box">
              <div class="section_box_wrapper">
                <div class="active_desc">
                  <table class="newusertwo_table">
                    <tr>
                      <td>每日存款金额</td>
                      <td>100-500</td>
                      <td>501-1000</td>
                      <td>1001-5000</td>
                      <td>5001-10000</td>
                      <td>10001-30000</td>
                      <td>30001+</td>
                    </tr>
                    <tr>
                      <td>可获彩金</td>
                      <td>38</td>
                      <td>68</td>
                      <td>128</td>
                      <td>288</td>
                      <td>588</td>
                      <td>888</td>
                    </tr>
                    <tr>
                      <td>彩金流水要求</td>
                      <td colspan="6">全站3倍有效流水</td>
                    </tr>
                  </table>
                  <ul class="day_bet" v-show="!load">
                    <li v-for="(dayitem,index) in initInfo.day_deposit"
                    :key="index">
                      <h3>第{{dayText[index]}}天<span v-show="index==0">(注册日)</span></h3>
                      <p class="un_finish_p" v-if="dayitem.deal_money<100&&isLogin">{{dayTextH(index,dayitem.deal_money)}}</p>
                      <p class="finish_p" v-if="dayitem.deal_money>=100&&isLogin">
                        <span :title="11" class="ellips">{{dayitem.deal_money?dayitem.deal_money:''}}</span>元
                      </p>
                      <div class="finish_gou" v-if="dayitem.deal_money>=100&&isLogin"></div>
                      <p class="un_finish_p" v-if="!isLogin">未登录</p>
                    </li>
                  </ul>
                  <p class="tips" v-show="isLogin&&initInfo.dep_status==2">{{initInfo.dep_status_tip}}</p>
                  <div class="apply_btn"
                    @click="depApply()"
                    :class="{'disabled' : !canshot||(isLogin&&initInfo.dep_status==2)}">
                    <div class="btn_loading_box " v-show="load"><span class="small_loading"></span></div>
                              {{isLogin&&initInfo.dep_status==1?'已领取':'立即领取'}}
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
                  1. 新会员自注册当天起，连续3天在平台存款达到对应的额度即可领取此优惠彩金。		<br>
                  例：会员A注册时间为2020/6/6日，若该会员在2020/6/6-2020/6/8期间，连续3天每日存款100元，此时可领取38元彩金。		<br>
                  2. 若参与此活动的新会员连续3天存款金额不同，则以单日最低累计充值金额对应的彩金档次计算标准。				<br>
                  3. 彩金领取时间为注册后第四日00:00:00-23:59:59，逾期则视为自动放弃。				<br>
                  4. 此优惠活动仅针对自活动开始时间起在平台新注册的会员，每位会员仅限申请一次，活动彩金需完成全站3倍有效流水。			<br>
                  5. 电竞赔率＜1.5、亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水；PT电子游戏中以下游戏不算有效流水：<activeptliushui :color="'#d34c2a'"></activeptliushui>。	<br>
                  6.每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能使用一个账号享受优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利；VKGAME对本活动保有最终解释权。
                </div>
              </div>
            </div>
          </div>
          <div v-show="1==curType">
            <div class="active_section_box">
              <div class="section_box_wrapper">
                <div class="active_desc">
                  <table class="newusertwo_table">
                    <tr>
                      <td>注册当日有效投注</td>
                      <td>500+</td>
                      <td>1000+</td>
                      <td>5000+</td>
                      <td>10000+</td>
                      <td>50000+</td>
                      <td>100000+</td>
                      <td>500000+</td>
                    </tr>
                    <tr>
                      <td>可获彩金</td>
                      <td>8</td>
                      <td>18</td>
                      <td>28</td>
                      <td>68</td>
                      <td>128</td>
                      <td>288</td>
                      <td>666</td>
                    </tr>
                    <tr>
                      <td>彩金流水要求</td>
                      <td colspan="7">全站3倍有效流水</td>
                    </tr>
                  </table>
                  <p class="touzhu" v-if="isLogin">有效投注{{initInfo.bet}}元</p>
                  <p class="tips" v-show="isLogin&&initInfo.bet_status==2">{{initInfo.bet_status_tip}}</p>
                  <div class="apply_btn" @click="betApply()"
                    :class="{'disabled':isLogin&&!initInfo.is_new_user|| isLogin&&(initInfo.is_new_user&&initInfo.bet_status!==0)  ||( isLogin&&initInfo.user_reg_day>=3)}">
                     <div class="btn_loading_box " v-show="load"><span class="small_loading"></span></div>
                    {{isLogin&&initInfo.bet_status==1?'已领取':'立即领取'}}
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
                  1. 新会员注册当日的累计有效投注额达到对应的额度即可领取此优惠彩金。				<br>
                  例：会员A注册时间为2020/6/6日，若该会员在当日00:00-23:59:59期间的累计有效投注额为1000元，此时可领取18元投注彩金。			<br>
                  2. 彩金领取时间为注册次日00:00:00-23:59:59，逾期则视为自动放弃。				<br>
                  3. 此优惠活动仅针对自活动开始时间起在平台新注册的会员，每位会员仅限申请一次，活动彩金需完成全站3倍有效流水。		<br>
                  4. 此优惠活动不与电竞/PT首存活动所产生的流水重叠统计。							<br>
                  5. 电竞赔率＜1.5、亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水；PT电子游戏中以下游戏不算有效流水：<activeptliushui :color="'#d34c2a'"></activeptliushui>。<br>
                  6. 每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能使用一个账号享受优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利；VKGAME对本活动保有最终解释权。
                </div>
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
  name: 'newusertwo',
  data() {
     return {
       curType:0,
       initInfo:{},
       start_time:null,
       ajaxLoad:false,
       ajaxLoad1:false,
       load:false,
       dayText:['一',"二","三"]
     }
  },
  mounted () {
    this.getInit()
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    },
    canshot:function () {//按钮是否能点击
      let canshot = false
      if(this.isLogin) {
        if(this.initInfo.is_new_user) {
          canshot = true;
          for(let i=0;i<this.initInfo.day_deposit.length;i++) {
            if(i+1<this.initInfo.user_reg_day) {
              if(this.initInfo.day_deposit[i].deal_money<100){
                canshot = false;
                break;
              }
            }
          }
          if(this.initInfo.user_reg_day==1&&this.initInfo.day_deposit[0].deal_money==0) {
            canshot = false
          }
          if(this.initInfo.dep_status==1||this.initInfo.user_reg_day>=5) {
            canshot = false
          }
        }else {
          canshot = false
        }
      }else {
        canshot = true
      }
      return canshot
    }
  },
  methods: {
    //每天的显示
    dayTextH(day,money) {
      let txt = ''
      if(!this.initInfo.is_new_user) {
        txt= '存款100元起'
      }else {
        if(this.initInfo.user_reg_day==1) {
          txt= '存款100元起'
        }else  {
          if(day+1<this.initInfo.user_reg_day) {
            txt= '未完成'
          }else if(day+1==this.initInfo.user_reg_day) {
            if(money==0) {
              txt = '存款100元起'
            }else {
              txt= '未完成'
            }
          }else {
            txt= '存款100元起'
          }
        }
      }
      return txt;
    },
    //充值优惠
    depApply() {
      if(!this.isLogin) {
        this.$message({
          message: '请先登录',
          type: "warning"
        });
        return;
      }
      if(this.canshot&&this.initInfo.dep_status!==0) {
        this.$message({
          // message: '请完成三天存款后，于第四日来领取彩金。',
          message: this.initInfo.dep_status_tip ,
          type: "warning"
        });
        return;
      }
      if(this.initInfo.dep_status==0&&this.initInfo.user_reg_day==3) {
        this.$message({
          // message: '请于明日来领取彩金。',
          message: this.initInfo.dep_status_tip,
          type: "warning"
        });
        return
      }
      if (this.ajaxLoad||this.initInfo.dep_status!=0) {
        return;
      }
      this.ajaxLoad = true;
      this.$http(this.ApiSetting.active.joinNewUserExclusiveActive, {
        act_type: "dep",
      }).then(
        res => {
          if (res.status == 1) {
            this.$message({
              message: "恭喜成功领取"+(res.data.money?res.data.money+"元彩金":''),
              type: "success"
            });
            this.initInfo.dep_status = 1;
          }
          this.ajaxLoad = false;
        },
        err => {
          this.ajaxLoad = false;
        }
      );
    },
    //投注优惠
    betApply() {
      if(!this.isLogin) {
        this.$message({
          message: '请先登录',
          type: "warning"
        });
        return;
      }
      if(this.initInfo.bet_status!=0) {
        return
      }
      if(this.initInfo.bet_status==0&&this.initInfo.user_reg_day==1) {
        this.$message({
          // message: "请明日来领取彩金，千万不要忘记哦！",
          message: this.initInfo.bet_status_tip,
          type: "warning"
        });
        return;
      }
      if(this.ajaxLoad1) {
        return
      }
      this.ajaxLoad1 = true;
      this.$http(this.ApiSetting.active.joinNewUserExclusiveActive, {
        act_type: "bet",
      }).then(
        res => {
          if (res.status == 1) {
            this.$message({
              message: "恭喜成功领取"+(res.data.money?res.data.money+"元彩金":''),
              type: "success"
            });
            this.initInfo.bet_status = 1;
          }
          this.ajaxLoad1 = false;
        },
        err => {
          this.ajaxLoad1 = false;
        }
      );
    },
    selectType(type) {
      this.curType = type
    },
    getInit() {
      this.load = true
      this.$http(this.ApiSetting.active.getNewUserExclusiveInit).then(res => {
        this.load = false
        if (res.status == 1 && res.data) {
          this.initInfo = res.data;
          let stime = new Date(res.data.active_start_time * 1000);
          this.start_time =
            stime.getFullYear() +
            "年" +
            (stime.getMonth() + 1) +
            "月" +
            stime.getDate() +
            "日";
        }
      })
      .catch(()=>{
        this.load = false
      });
    },
  }
}
</script>
<style lang="less" scoped>
.call_friend{
  background: url("../../../assets/active/newusertwo_banner.jpg") no-repeat center top;
}
.active_page_content{
  padding: 30px 40px !important;
}
.newusertwo_table {
  width:100%;
  margin: 60px 0 40px;
  border-spacing: 0;
  border-collapse: unset;
  border-top: #c3c3c3 1px solid;
  border-right: #c3c3c3 1px solid;
  font-size: 18px;
  tr {
    &:nth-child(2) {
      font-size: 20px;
      font-weight: bold;
      color: #f7eabd;
    }
    td {
      width:170px;
      text-align: center;
      line-height: 50px;
      border-left: #c3c3c3 1px solid;
      border-bottom: #c3c3c3 1px solid;
      &:first-child{
        width:260px;
        color: #dc6f1e !important;
        font-weight: normal !important;

      }
    }
  }
}
.classify_type {
  width: 100%;
  margin-top: 30px;
  height: 57px;
  li {
    height: 100%;
    width: 50%;
    float: left;
    text-align: center;
    font-size: 26px;
    line-height: 57px;
    color: #fff;
    position: relative;
    cursor: pointer;
    transition: background 0.2s;
    background:url("../../../assets/active/newusertwo/type_normal.png") no-repeat center center;
    &:hover {
      color: #feedc7;
    }
    &.selected {
      color: #feedc7;
      background-image:url("../../../assets/active/newusertwo/type_hover.png") ;
    }
    p {
      font-size: 14px;
      position: absolute;
      color: #c3c3c3;
      bottom: -50px;
      left: 0;
      width:100%;
      text-align: center;
      cursor: default;
    }
  }
}
.tips {
  text-align: center;
  color: #888;
}
.day_bet {
  overflow: hidden;
  width: 880px;
  margin: 0 auto 40px;
  li {
    width:240px;
    height: 148px;
    background:url("../../../assets/active/newusertwo/dayget.png") no-repeat;
    float: left;
    margin-right: 80px;
    position: relative;
    &:last-child {
      margin: 0;
    }
    h3 {
      margin: 14px 20px;
      letter-spacing: 2px;
      color: #feedc7;
      font-size: 22px;
      font-weight: normal;
      span {
        font-size: 16px;
      }
    }
    .un_finish_p {
      color: #bfbfbf;
      font-size: 16px;
      margin:35px 0 0 30px;
    }
    .finish_p{
      font-size: 22px;
      color: #d34c2a;
      margin:35px 0 0 20px;
      span {
        max-width: 110px;
        display: inline-block;
        vertical-align: middle;
      }
    }
    .finish_gou {
      position: absolute;
      top: 48px;
      right: 10px;
      width:75px;
      height: 62px;
      background:url("../../../assets/active/newusertwo/daygou.png") no-repeat;
    }
  }
}
.apply_btn {
  width: 189px;
  height: 53px;
  background:url("../../../assets/active/newusertwo/btn_nor.png") no-repeat;
  font-size: 24px;
  color: #ffeccd;
  text-align: center;
  line-height: 48px;
  margin: 0 auto;
  position: relative;
  cursor: pointer;
  &:hover{
    opacity: 0.9;
  }
  &.disabled {
    line-height: 52px;
    cursor: default;
    background: rgba(124, 131, 159, 0.1);
    color: #53586b;
    border-radius: 0.3rem;
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.35);
    &:hover {
      opacity: 1;
    }
  }
}
.touzhu {
  font-size: 24px;
   color: #dc6f1e;
   text-align: center;
   margin: 0 auto 40px;
}
</style>
