<template>
  <div class="ag_active active_page uwwelcome">
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
              <div class="active_time">
                {{ initInfo.active_show_time }}
              </div>
            </div>
          </div>
          <div class="active_section_box">
            <div class="letter_start">致U赢电竞会员的一封信：</div>
            <div class="section_box_wrapper">
              <div class="active_time">
                <p>亲爱的U赢电竞会员们，我们很高兴的向大家宣布一个好消息：威客电竞（VKGAME）集团已完成对U赢电竞平台的收购。</p>
                <p>威客电竞秉持着“专业 安全 创新”的基本理念，致力于向全球用户提供满意的产品和服务，未来我们也将继续为此而不懈努力，带来无限惊喜与可能。</p>
                <p>我们非常欢迎来自U赢电竞的新朋友加入我们的大家庭，也期待在接下来的征程中，与您一起携手创辉煌、共进退！</p>
                <p>即日起，U赢电竞平台的会员可在2021年4月6日00:00至2021年4月16日23:59期间进行账号转移，我们的在线客服将24小时竭诚为您提供账号转移服务。原U赢电竞平台会员可享有以下权益：</p>
                <p class="green"> 会员账户资金平移（仅限无流水可提款的账户资金）</p>
                <p class="green"> 会员VIP等级按照以下内容转移</p>

              </div>
              <table align="center" width="100%">
                <tbody>
                  <tr align="center">
                    <td class="blue">原U赢会员等级</td>
                    <td v-for="(item, index) in 10" :key="index">
                      VIP{{ item }}
                    </td>
                  </tr>
                  <tr>
                    <td class="green">威客电竞对应等级</td>
                    <td>VIP1</td>
                    <td>VIP1</td>
                    <td>VIP2</td>
                    <td>VIP3</td>
                    <td>VIP3</td>
                    <td>VIP4</td>
                    <td>VIP5</td>
                    <td>VIP5</td>
                    <td>VIP6</td>
                    <td>VIP6</td>
                  </tr>
                </tbody>
              </table>
              <p class="mt_20">
                以上所有服务权益需在规定时间内完成，U赢电竞将在2021年4月17日00:00:00进行关闭，感谢您的支持与配合。您现在可以：
              </p>

              <ul class="steps">
                <li class="steps_uw btn">
                  <div class="bj_yuan_box"><div class="bj_yuan">1</div></div>

                  <p class="w_300 P_mr">自助转移U赢账号至威客电竞</p>
                  <div class="d_btn to_apply normal" @click="activeTable(5)">
                    转移流程
                  </div>
                </li>
                <li class="steps_app btn">
                  <div class="bj_yuan">2</div>
                  <p class="P_mr">下载威客APP或访问网站</p>
                  <div class="d_btn to_apply normal" @click="activeTable(4)">
                    下载APP
                  </div>
                </li>
                <li class="mosaic_gold btn">
                  <div class="bj_yuan">3</div>
                  <p class="mr_b49">即刻参与“领彩金”等，下列多项优惠特权活动</p>
                </li>
                <li class="xian_one din"></li>
                <li class="xian_tow din"></li>
              </ul>

              <div class="tab">
                <div class="width_840">
                  <ul class="title_box">
                    <li
                       :class="{ active_tb: index == 0 }"
                      @click="activeTable(0)"
                    >

                    <div >转移成功领1888</div>

                    </li>
                    <li
                      :class="{ active_tb: index == 1 }"
                      @click="activeTable(1)"
                    >
                      <div >首存成功领588</div>

                    </li>
                    <li @click="activeTable(2)"> <div >VIP月存款优惠</div></li>

                    <li @click="activeTable(3)"><div >VIP月再存优惠</div></li>
                  </ul>

                  <div class="show_content" v-if="index == 0">
                    <div class="active_title">活动内容</div>
                    <p class="active_time">
                      活动期间，原UW会员在威客电竞完成账号转移即可免费领取对应的游戏体验金。
                    </p>

                    <table align="center" width="100%">
                      <tbody>
                        <tr align="center">
                          <td class="green">等级</td>
                          <td v-for="(item, index) in 13" :key="index">
                            VIP{{ index }}
                          </td>
                        </tr>
                        <tr>
                          <td class="green">游戏体验金</td>
                          <td>-</td>
                          <td>18元</td>
                          <td>28元</td>
                          <td>38元</td>
                          <td>58元</td>
                          <td>68元</td>
                          <td>88元</td>
                          <td>168元</td>
                          <td>288元</td>
                          <td>388元</td>
                          <td>588元</td>
                          <td>888元</td>
                          <td>1888元</td>
                        </tr>
                        <tr>
                          <td class="green">彩金流水要求</td>
                          <td colspan="13">全部3倍有效流水</td>
                        </tr>
                      </tbody>
                    </table>



                       <!-- 0:可领取 1:已领取 ，2：请登录，其他不可领  -->
                    <div class="btn" v-if="initInfo.active_1" >

                      <div  @click="apply(1)" class="d_btn" :class="initInfo.active_1.status==1 ?'disabled' : 'normal'">{{initInfo.active_1.status==1 ? '已领取' : '立即领取'}}</div>


                    </div>
                      <div class="active_section_box">
                    <div class="active_title">活动规则</div>
                    <div class="section_box_wrapper">
                      <div class="active_desc">
                        <p>
                          1.此活动仅针对U赢电竞全体会员且注册时间在2021年4月6日00:00之前的会员。<br>
                          	2.符合条件的会员可在VKGAME活动页面领取彩金，活动彩金会自动转入会员主账户钱包中，每位会员仅限申请一次，活动彩金需完成全站3倍有效流水。	<br>
                         3.电竞赔率＜1.45、亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、走盘、注单取消、对冲等情况都不算有效流水；PT电子游戏中以下游戏不算有效流水： <activeptliushui></activeptliushui>。	<br>
                         4.每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能使用一个账号享受优惠。对违规的用户，VKGAME保留无限期审核， 和扣回红利及所产生的利润权利。		<br>
                         5.VKGAME对本活动保有最终解释权。
                        </p>
                      </div>
                    </div>
                  </div>


                  </div>

                  <div class="show_content" v-if="index == 1">
                    <div class="active_title">活动内容</div>
                    <p class="active_time">
                     活动期间，原UW会员转入VKGAME，首笔存款≥100元即可领取彩金，首存彩金最高可获588元。
                    </p>

                    <table align="center" width="100%">
                      <tbody>
                        <tr align="center">
                          <td class="green">活动对象</td>
                          <td colspan="9">u赢电竞全体会员</td>
                        </tr>
                        <tr>
                          <td class="green">参与条件</td>
                          <td colspan="3">首存≥100</td>
                          <td colspan="3">首存≥3000</td>
                          <td colspan="3">首存≥10000</td>
                        </tr>
                        <tr>
                          <td class="blue">原u会员等级</td>
                          <td>等级≥1</td>
                          <td>等级≥3</td>
                          <td>等级≥5</td>
                          <td>等级≥1</td>
                          <td>等级≥3</td>
                          <td>等级≥5</td>
                          <td>等级≥1</td>
                          <td>等级≥3</td>
                          <td>等级≥5</td>
                        </tr>
                        <tr>
                          <td class="green">可领取彩金</td>
                          <td>38</td>
                          <td>58</td>
                          <td>88</td>
                          <td>88</td>
                          <td>188</td>
                          <td>288</td>
                          <td>288</td>
                          <td>388</td>
                          <td>588</td>
                        </tr>
                        <tr>
                          <td class="green">彩金流水要求</td>
                          <td colspan="9">全站有效5倍流水</td>
                        </tr>
                      </tbody>
                    </table>

                     <p class="liushui" v-if="isLogin && initInfo.active_2.bonus>0 ">
                       <span >{{initInfo.active_2.status==0 ? "当前可领取" : "已领取"}}:<span class="green">{{initInfo.active_2.bonus}} </span> 元彩金</span>
                    </p>
                     <!-- 0:可领取 1:已领取 ，2：请登录，其他不可领 -->
                    <div class="btn" v-if="initInfo.active_2" >
                      <div  class="d_btn" @click="apply(2)"  :class="initInfo.active_2.status==1 ?'disabled' : 'normal'">{{initInfo.active_2.status==1 ? '已领取' : '立即领取'}}</div>

                    </div>



                      <div class="active_section_box">
                    <div class="active_title">活动规则</div>
                    <div class="section_box_wrapper">
                      <div class="active_desc">
                        <p>
                          1. 此活动仅仅针对U赢电竞全体会员且注册时间在2021年4月6日00:00之前的会员。	<br />
                          2. 此活动首存定义为：UW会员在威客电竞的第一笔有效存款。	<br />
                          3. 符合条件的会员可在VKGAME活动页面领取彩金，活动彩金会自动转入会员主账户钱包中，每位会员仅限申请一次，活动彩金需完成全站5倍有效流水。<br />
                          4. 此活动不与网站其他首存活动共享，每个账户仅限申请一次；领取了此项优惠活动的新用户需先完成活动规定的流水后才可申请平台救援金活动。不共享活动：电竞首存活动、PT电子首存活动、VIP月存款活动、VIP月再存活动	<br />
                          5. 电竞赔率＜1.45、亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、走盘、注单取消、对冲等情况都不算有效流水；PT电子游戏中以下游戏不算有效流水：   <activeptliushui></activeptliushui>。	<br />
                          6. 每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能使用一个账号享受优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利；VKGAME对本活动保有最终解释权。

                        </p>
                      </div>
                    </div>
                  </div>


                  </div>


                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="btn back_active_nav">
        <router-link to="/active" class="botton normal">{{
          $t("Return_to_activity_page")
        }}</router-link>
      </div>
    </div>

    <el-dialog
      :visible.sync="guideDialog.visible"
      :custom-class="guideDialog.class"
      :close-on-click-modal="maskClose"
    >
      <div class="dialog_title" slot="title">UW账号转入VK转移流程</div>
      <div class="dialog_wrapper">
        <div class="dialog_content">
          <div class="contnet_section">
            <div class="contetn_section_desc">
              温馨提示：原生APP内暂不支持转移操作，请在电脑网站或移动网站上操作，完成后可以直接在APP上登录。<br />
              步骤 1/4. 进入<span class="guide_notice" @click="urlPush(1)">VKGAME 登录界面</span>
              ，点击 “忘记密码” 按钮；
            </div>
            <img  class="img_liuc" src="../../../assets/active/uwwelcome/image1.png" alt="" />
          </div>

           <div class="contnet_section">
             <div class="contetn_section_desc">
                步骤2/4. 进入 <span class="guide_notice"  @click="urlPush(2)"  >VKGAME 找回密码界面</span>，输入原UW账号并点击下一步；
            </div>
            <img class="img_liuc" src="../../../assets/active/uwwelcome/image2.png" alt="" />

          </div>

            <div class="contnet_section">
             <div class="contetn_section_desc">
               步骤3/4. 使用手机号码通过验证，并设定新密码，用作在 VKGAME 登录；
            </div>
            <img  class="img_liuc" src="../../../assets/active/uwwelcome/image3.png" alt="" />


          </div>

           <div class="contnet_section">
             <div class="contetn_section_desc">
               步骤4/4. <span class="guide_notice" @click="urlPush(3)" >访问 VKGAME 登录界面</span>，输入原UW账号及新设定的密码，点击登录，至此便完成了账号转移。如在转移过程中遇到问题请联系VKGAME网站在线客服，客服人员将24小时为您服务。
            </div>
            <img  class="img_liuc" src="../../../assets/active/uwwelcome/image4.png" alt="" />
          </div>

        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
import {mapState } from 'vuex'
export default {
  name: "uwwelcome",
  components: {},
  data() {
    return {
      initInfo: {},
      load: false,
      index: 0,
      maskClose: false,
      guideDialog: {
        visible: false,
        class: "guide_dialog",
      },
    };
  },
  mounted() {
    this.getUwMemberJoinInit(1);
  },
    computed: {
    ...mapState(["isLogin"]),

  },

  methods: {
    getUwMemberJoinInit(bool) {
       if(bool) {
        this.load = true
      }
      this.$http(this.ApiSetting.active.getUwMemberJoinInit).then((res) => {
         this.load = false
        if (res.status == 1 && res.data) {
          this.initInfo = res.data;
        }
      }).catch(()=>{
        this.load = false
      });

    },

        apply(type) {
          if(type==1){
          if(this.initInfo.active_1.status == 1) {//已领取
              return;
            }
            if (this.initInfo.active_1.status!== 0) {
              this.$message({
                message: this.initInfo.active_1.status_tips,
                type: "warning"
              });
              return;
            }
            this.$http(this.ApiSetting.active.joinUwMemberPrivilege)
            .then(res => {
              if(res.status == 1) {
                this.$message({
                  message: res.message,
                  type: "success"
                });
                this.initInfo.active_1.status =1
              }else if(res.message){
                this.$message({
                  message: res.message,
                  type: "warning"
                });
              }
            })
        }else{
                if(this.initInfo.active_2.status == 1) {//已领取
              return;
            }
            if (this.initInfo.active_2.status!== 0) {
              this.$message({
                message: this.initInfo.active_2.status_tips,
                type: "warning"
              });
              return;
            }
            this.$http(this.ApiSetting.active.joinUwMemberWelcome)
            .then(res => {
              if(res.status == 1) {
                this.$message({
                  message: res.message,
                  type: "success"
                });
                this.initInfo.active_2.status =1
              }else if(res.message){
                this.$message({
                  message: res.message,
                  type: "warning"
                });
              }
            })


        }
    },

    activeTable(index) {
      if (index == 0 || index == 1) {
        this.index = index;
      } else if (index == 2) {
      let routeUrl = this.$router.resolve({
          path: this.initInfo.vip_deposit_link ,
     });
     window.open(routeUrl .href, '_blank');

      } else if (index == 3) {
              let routeUrl = this.$router.resolve({
          path: this.initInfo.vip_again_deposit_link ,
     });
     window.open(routeUrl .href, '_blank');
      } else if (index == 4) {
        this.$router.push({ path: "/appshow" });
      } else {
        this.guideDialog.visible = true;
      }
    },
    urlPush(urlType){
      if(urlType==1 || urlType==3){
          this.$router.push({ path: '/login' });
      }else{
         this.$router.push({ path: '/forget' });
      }

    },
  },
};
</script>
<style scoped >
.ag_active {
  background: url("../../../assets/active/uwwelcome_banner.jpg") no-repeat
    center top;
  position: relative;
}

.section_box_wrapper table {
  margin-top: 20px;
  border-spacing: 0;
  border-collapse: unset;
  border-top: #303344 1px solid;
  border-right: #303344 1px solid;
}
.section_box_wrapper table td,
.section_box_wrapper table th {
  text-align: center;
  line-height: 50px;
  color: #c3c3c3;
  border-left: #303344 1px solid;
  border-bottom: #303344 1px solid;
}

/* .section_box_wrapper table td.yellow {
  color: #f4d364;
  font-weight: bold;
  font-size: 22px;
} */
/* .btn .to_apply{
  width: 92px;
  height: 25px;
  line-height: 25px;
  font-size: 12px;
} */
/* .sport_rescue_dialog {
  font-size: 18px;
  color: #ffffff;
  padding: 0 47px 20px;
}
.sport_rescue_dialog p {
  margin-bottom: 40px;
}
.sport_rescue_dialog .qianbao {
  font-size: 14px;
  display: inline-block;
}
.sport_rescue_dialog .qianbao div{
  width: 189px;
  height: 88px;
  float: left;
  line-height: 88px;
  padding-left: 8px;
  box-sizing: border-box;
  cursor: pointer;
  border:1px solid transparent;
  transition: border-color 0.2s;
  border-radius: 4px;
}
.sport_rescue_dialog .qianbao div.active {
  border:1px solid #07e9f1;
}
.qianbao_tit {
  display: inline-block;
  vertical-align: top;
  height: 34px;
  line-height: 34px;
}
.sport_rescue_dialog .money_box {
  margin-top: 30px;
}
.sport_rescue_dialog .s_m_t {
  display: block;
  margin-top: 18px;
  color: #7c839f;
}
.sport_rescue_dialog .s_m_t i {
  color: #07f1b7;
}
.sport_rescue_dialog .money {
  display: inline-block;
  margin-left: 5px;
}
.ivu-input {
  width: 135px;
}
.sport_rescue_dialog .qianbao_sport {
  background: url("../../../assets/icon_es.png") no-repeat;
  background-position: -953px  -612px;
  margin-right: 16px;
}
.sport_rescue_dialog .qianbao_pingbo {
  background: url("../../../assets/icon_es.png") no-repeat;
  background-position: -1391px -926px;
}
.sport_rescue_dialog .to_apply {
  margin-top:30px;
  width: 135px;
  height: 34px;
  line-height: 34px;
  font-size: 16px;
} */
table tbody.loading .btn {
  height: 150px;
}
table tbody.loading {
  border: none;
}
</style>
<style lang="less" scoped >
//   .sport_rescue_dialog_box {
//     border:none;
//     background-color: #262933;
//     .ivu-input {
//       border-color: #07e9f1;
//     }
//   }
.uwwelcome {
  .active_page_content {
    padding-bottom: 0px !important;
  }

  .blue {
    color: #00f1f1;
  }
  .green {
    color: #07f1b7;
  }
  .letter_start {
    font-size: 20px;
    text-align: left;
    margin-bottom: 15px;
    color: #ffffff;
  }
  .active_time {
    p {
      text-indent: 20px;
      text-align: left;
      font-size: 14px;
    }
  }
  .mt_20 {
    margin-top: 20px;
  }
  .steps {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 24px;
    position: relative;
    .din {
      position: absolute;
      top: 28px;
      border :1px solid;
       border-image-source: linear-gradient(to top, #07e9f1, #07f1b7);
          border-image-slice: 1;
    }
    .xian_one {
      left: 176px;


      width: 216px;
    }
    .xian_tow {
      left: 445px;
      width: 218px;
    }
    li {
      width: auto;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      .btn {
        margin-top: 15px;
      }
    }
    .steps_uw {
      width: 300px;
    }
    .steps_app {
      width: 157px;
    }
    .mosaic_gold {
      width: 300px;
    }
    .bj_yuan_box {
      width: 100%;
      display: flex;
      justify-content: center;
      height: 56px;
    }
    .bj_yuan_box {
      width: 100%;
      // height: 56px;
    }
    .w_300 {
      width: 300px;
      text-align: center;
    }
    .bj_yuan {
      display: inline-block;
      width: 56px;
      height: 56px;
      background: url("../../../assets/active/uwwelcome/class_1.png") no-repeat;
      background-size: 100% 100%;
      // background: #ffffff;
      text-align: center;
      color: #ffffff;
      font-weight: bold;
      font-size: 20px;
      line-height: 50px;
      margin-right: 10px;
      margin: 0px auto;
    }
    .mr_b49 {
      // margin-bottom: 43px;
      margin-bottom: 47px;

      // margin-top:7px
      margin-top:10px

    }
    .P_mr {
      margin: 15px 0px 15px 0px;
    }
  }
  .tab {
    position: relative;
    left: -200px;
    top: 0px;
    margin-top: 30px;
    background-color: #262933;
    // filter: brightness(130%);
    filter: brightness(118%);

    // background-color: rgba(38,41,51,0.4);
    // background-color:transparent;
    // height: 600px;
    padding-bottom: 10px;
    z-index: 2;
    width: 1240px;
    .width_840 {
      width: 840px;
      margin: 0px auto;
      .title_box {
        display: flex;
        justify-content: space-between;
        padding-top: 25px;
        margin-bottom: 24px;
        li {
          cursor: pointer;
          font-size: 20px;
          font-weight: normal;
          text-align: center;
          color: #ffffff;
          line-height: 48px;
          text-align: center;
          width: 200px;
          height: 48px;
        }
        .active_tb {
         padding: 2px;
         border-radius: 24px;
         box-sizing: border-box;
         background-image: linear-gradient(to right, #07e9f1 0%,#07f1b7 90%) ;
       div{
          border-radius:24px;
          background-color: #262933;
          filter: brightness(118%);
          line-height: 44px;
       }
        }
        li:hover {
          .active_tb;
        }
      }
      .active_time {
        color: #c3c3c3 !important;
      }
      .liushui {
        text-align: center;
        margin-top: 20px;
      }
      .btn {
        display: flex;
        justify-content: center;
        // width: 100%;
        margin-top: 14px;
        margin-bottom: 14px;
      }
    }
  }
}
</style>
<style lang="less">
.img_liuc{
          display: block  !important;
          margin:0px auto  !important;
        }
.guide_dialog {
  .guide_notice {
    color: #07f1b7;
  }
  .el-dialog__body {
    height: 460px;
    overflow: auto;
  }
  .dialog_wrapper {
    padding: 0 30px;
    color: #fff;
    .contnet_section {
      margin-bottom: 25px;
      .contetn_section_desc {
        margin-bottom: 10px;

      }
    }
  }
}
</style>
