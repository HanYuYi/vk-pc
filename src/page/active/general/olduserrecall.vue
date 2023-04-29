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
          <div class="active_section_box margin_b">
            <div class="active_title">
              {{$t("Active_content")}}
            </div>
            <div class="section_box_wrapper" v-show="!load">
              <ul class="classify_type">
                <li @click="selectType(0)" :class="{'selected':0==curType}" >
                  {{oldRecall.title_cn?oldRecall.title_cn:'老会员回归 存款最高送1288'}}
                </li>
                <li @click="selectType(1)" :class="{'selected':1==curType}">
                   {{friendRecall.title_cn?friendRecall.title_cn:'好友召回 最高奖励30元/人'}}
                </li>
              </ul>
            </div>
            <div class="section_box_wrapper text_c" v-show="load">
              <span class="small_loading"></span>
            </div>
          </div>
          <div v-show="0==curType">
            <div class="active_section_box">
              <div class="section_box_wrapper" v-show="!load">
                <div class="active_desc">
                  <p class="type_t" >威客老会员回归存款，即可获得对应的专属彩金。			</p>
                <table align="center" width="100%" v-if="!load&&bounskeys.length" class="olduserrecall_table olduserrecall_table_one">
                  <tbody >
                     <tr class="specil_cb">
                       <td rowspan="2">存款金额</td>
                       <td colspan="4">VIP等级对应彩金</td>
                       <td rowspan="2">流水要求</td>
                     </tr>
                     <tr>
                       <td v-for="(item,key) in oldRecall.setting" :key="key">{{item.level_cn}}</td>
                     </tr>
                     <tr>
                       <td>≥{{bounskeys[0]}}</td>
                       <td v-for="(item,key) in oldRecall.setting" :key="key">{{item.bouns[bounskeys[0]]}}</td>
                       <td rowspan="5">(本金+彩金)x{{oldRecall.bet_limit}}<br>全站有效流水</td>
                     </tr>
                     <tr v-for="(bounskey,index) in bounskeys" :key="index" v-show="index>0">
                       <td>≥{{bounskey}}</td>
                       <td v-for="(item,key) in oldRecall.setting" :key="key">{{item.bouns[bounskey]}}</td>
                     </tr>
                  </tbody>
                </table>
               <!--oldRecall.status==3 表示非老会员 oldRecall.status==9 表示电销用户   oldRecall.status==4 表示最新一笔存款未达标 -->
                <p class="touzhu" v-if="isLogin&&oldRecall.status==0">有效存款{{oldRecall.deposit}}元 可领{{oldRecall.bouns}}元彩金</p>
                <p class="touzhu" v-if="isLogin&&oldRecall.status==4">{{oldRecall.status_tip}}</p>
                <div class="apply_btn"
                  v-show="!isLogin || (isLogin&&oldRecall.status!=3&&oldRecall.status!=9) "
                  @click="oldApply()"
                  :class="{'disabled' : (isLogin&&oldRecall.status==1)||(isLogin&&oldRecall.status==4)}">

                  {{isLogin&&oldRecall.status==1?'已领取':'立即领取'}}
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
                  1. 老会员判定标准：每月1号自动更新，以每个自然月1号为时间点，注册时间在两个月之前的账号且这两个月内在平台无任何投注记录的用户。<br>
                  2. 符合条件的老会员存款后可在本优惠活动页面上点击“立即领取” 按钮，系统将自动判定该会员自活动开始后的最近一笔有效存款，对应的彩金将自动添加至用户的主钱包中；会员在申请此优惠时，账户主钱包余额需 ≥ 最近的一笔存款金额。<br>
                  3. 此优惠活动每位符合条件的老会员仅限参与一次，活动彩金需完成（存款本金+彩金）x3倍的全站有效流水，当会员钱包余额≤原钱包余额且无未结算注单时，系统将自动判定已完成活动规定的有效流水。	<br>
                  4. 此活动不于其他存款类、召回类活动共享，每位会员每日仅可申请一次存款活动。不共享的活动有：全站会员每周存款活动，电竞/PT首存活动，每日只可选择参与一个活动。							<br>
                  5. 电竞赔率＜1.5、亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水；PT电子游戏中以下游戏不算有效流水：<activeptliushui :color="'#eebc76'"></activeptliushui>。<br>
                  6. 每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能使用一个账号享受优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利。VKGAME对本活动保有最终解释权。
                </div>
              </div>
            </div>
          </div>
          <div v-show="1==curType">
            <div class="active_section_box">
              <div class="section_box_wrapper " v-show="!load">
                <div class="active_desc">
                  <p   class="type_t">
                   威客会员通过活动页面生成的链接或二维码召回一位老会员且参与了“{{oldRecall.title_cn?oldRecall.title_cn:'老会员回归 存款最高送1288'}}”活动，邀请者即可获得对应的礼金，召回人数越多，礼金奖励越多。
                   举例：VIP会员邀请了51个老用户并成功召回，可获得彩金计算公式为：
                   <span class="gray_c">1人</span>x8+<span class="gray_c">4人</span>x9+<span class="gray_c">5人</span>x10+<span class="gray_c">10人</span>x15+<span class="gray_c">30人</span>x20+<span class="gray_c">1人</span>x30 = <span class="yellow_c">874</span>
                  </p>
                  <table class="olduserrecall_table olduserrecall_table_two">
                    <tr>
                      <td>召回人数</td>
                      <td v-for="(item,index) in friendRecall.setting" :key="index">{{item.show_num}}</td>
                      <td>彩金流水要求</td>
                    </tr>
                    <tr>
                      <td>召回彩金</td>
                      <td v-for="(item,index) in friendRecall.setting" :key="index">{{item.bouns}}</td>
                      <td rowspan="2">全站{{friendRecall.bet_limit}}倍<br>有效流水</td>
                    </tr>
                    <tr>
                      <td>最高领取彩金</td>
                      <td v-for="(item,index) in friendRecall.setting" :key="index">{{item.max_bouns}}</td>
                    </tr>
                  </table>
                  <div class="recall" v-if="friendRecall.status!=9">
                    <div class="recall_pos">
                      <!--friendRecall.status==3 表示没有召回成功 friendRecall.status==9 表示电销用户 -->
                      <p class="fl" v-show="friendRecall.status!=3&&friendRecall.old_recall>=1">
                        已召回{{friendRecall.old_recall}}人<br>已领{{friendRecall.old_bouns}}元彩金
                      </p>

                      <img class="line fl" v-show="friendRecall.old_recall>=1&&friendRecall.new_recall>=1"
                       src="../../../assets/active/olduserrecall/line.png" alt="">

                      <p class="yellow_c fl" v-show="friendRecall.status!=3&&friendRecall.new_recall>=1">
                        新召回{{friendRecall.new_recall}}人<br>待领{{friendRecall.new_bouns}}元彩金
                      </p>

                      <div class="apply_btn fl" @click="friendApply()"
                        :class="{'disabled': (isLogin&&friendRecall.status==1),
                        'no_loagin':!isLogin || isLogin&&friendRecall.status==5 || isLogin&&friendRecall.status==3}">
                        <div class="btn_loading_box " v-show="btnload"><span class="small_loading"></span></div>
                        {{isLogin&&initInfo.bet_status==1?'已领取':'立即领取'}}
                      </div>
                    </div>
                  </div>
                  <div class="code_box" v-if="friendRecall.status!=9">
                    <img class="app" src="../../../assets/active/olduserrecall/app.png" alt="">
                    <img class="updegare_text" src="../../../assets/active/olduserrecall/updegare_text.png" alt="">
                    <div class="qrcode" v-if="isLogin">
                      <img :src="friendRecall.show_qrcode" alt="">
                      <canvas height="300" width="300" id="qrid" ></canvas>
                    </div>
                    <div class="link" v-if="isLogin">
                      <div class="link_btn fl" @click="doCopy(friendRecall.show_url)">复制链接</div>
                      <span class="fl" :title="friendRecall.show_url">{{friendRecall.show_url}}</span>
                    </div>
                    <div class="link no_login" v-if="!isLogin">
                       <router-link to="/login">
                        <div class="link_btn fl"  >立即登录</div>
                       </router-link>
                      <span class="fl"  >查看召回链接和二维码</span>
                    </div>
                    <div v-if="isLogin" class="link_btn down_btn" @click="downloadImg()">下载二维码</div>
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
                  1. 参与此活动的会员需通过下载活动页面的二维码或分享链接给老会员，老会员需要通过此专属链接登录并参与活动。<br>
                  2. 被召回的老会员需参与“{{oldRecall.title_cn?oldRecall.title_cn:'老会员回归 存款最高送1288'}}” 活动才可被认定为召回成功。<br>
                  3. 每位被召回成功的老会员不可再次被召回。<br>
                  4. 此活动彩金需完成全站2倍有效流水。<br>
                  5. 电竞赔率＜1.5、亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水；PT电子游戏中以下游戏不算有效流水：<activeptliushui :color="'#eebc76'"></activeptliushui>。<br>
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
import { saveAs } from 'file-saver';
export default {
  name: 'olduserrecall',
  data() {
     return {
       curType:0,
       initInfo:{},
       oldRecall:{},
       friendRecall:{},
       start_time:null,
       ajaxLoad:false,
       ajaxLoad1:false,
       load:false,
       btnload:false,
       bounskeys:[]
     }
  },
  mounted () {
    this.getInit(1);
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  watch: {
    isLogin(val) {
      if(!val) {
        this.getInit()
      }
    }
  },
  methods: {
    canvasSet(src) {
      //1. 获取canvas元素
      if(document.getElementById("qrid")) {
        let cv = document.getElementById("qrid");
        //2. 获取2D上下文
        let ctx = cv.getContext('2d');
         //3. 新建一个Image对象
         let img = new Image();
         //4. 设置Image的src
         img.src = src;
         //5. 确定Image加载完毕后将Image画到canvas上
         img.onload = () => { ctx.drawImage(img, 0, 0, 300, 300);}
      }
    },
    doCopy(url) {
      let _this = this
      this.$copyText(url).then(function (e) {
        _this.$message({
          message: _this.$t("Copy_success"),
          type: 'success'
        })
      }, function (e) {
        _this.$message({
          message: _this.$t("Copy_the_failure"),
          type: 'warning'
        })
      })
    },
    downloadImg (){
      let canvas = document.getElementById("qrid");
      if (window.navigator.msSaveOrOpenBlob) {//ie
        let blob = canvas.msToBlob();
        window.navigator.msSaveBlob(blob, "二维码.png")
      }else if(canvas.toBlob){
        canvas.toBlob(function(blob) {
            saveAs(blob, "二维码.png");
        });
      }else {
        saveAs(this.friendRecall.show_qrcode, "二维码.png");
      }
    },
    //老用户存款
    oldApply() {
      if(!this.isLogin) {
        this.$message({
          message: '请先登录',
          type: "warning"
        });
        return;
      }
      if(this.oldRecall.status==4||this.oldRecall.status==1||this.ajaxLoad) {
        return
      }
      if(this.oldRecall.status!=0) {
        this.$message({
          message: this.oldRecall.status_tip,
          type: "warning"
        });
        return;
      }
      this.ajaxLoad = true;
      this.$http(this.ApiSetting.active.joinOldUserRecall)
      .then(res => {
          if (res.status == 1) {
            this.$message({
              message: "恭喜您成功领取至主钱包！",
              type: "success"
            });
            this.oldRecall.status = 1;
          }
          this.ajaxLoad = false;
        },
        err => {
          this.ajaxLoad = false;
        }
      );
    },
    //朋友
    friendApply() {
      if(!this.isLogin) {
        this.$message({
          message: '请先登录',
          type: "warning"
        });
        return;
      }
      if(this.friendRecall.status==1 || this.btnload) {
        return;
      }
      if(this.friendRecall.status!=0 ) {
        this.$message({
          message: this.friendRecall.status_tip,
          type: "warning"
        });
        return;
      }
      if(this.ajaxLoad1) {
        return
      }
      this.ajaxLoad1 = true;
      this.$http(this.ApiSetting.active.joinFriendRecall)
      .then(res => {
          if (res.status == 1) {
            this.getInit()
            this.$message({
              message: "恭喜您成功领取至主钱包",
              type: "success"
            });
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
    getInit(bool) {
      if(bool) {
        this.load = true
      }
      this.btnload = true;
      this.$http(this.ApiSetting.active.getOldUserRecallInit).then(res => {
        this.load = false;
        this.btnload = false;
        if (res.status == 1 && res.data) {
          this.initInfo = res.data;
          this.oldRecall = res.data.old_members_recall;
          this.friendRecall = res.data.friend_recall;
          this.canvasSet(this.friendRecall.show_qrcode)
          if(this.initInfo.old_members_recall && this.initInfo.old_members_recall.setting[0] && this.initInfo.old_members_recall.setting[0].bouns) {
            this.bounskeys = Object.keys(this.initInfo.old_members_recall.setting[0].bouns)
          }
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
        this.load = false;
        this.btnload = false;
      });
    },
  }
}
</script>
<style lang="less" scoped>
.call_friend{
  background: url("../../../assets/active/olduserrecall/olduserrecall_banner.jpg") no-repeat center top;
}
.active_page_content{
  padding: 30px 40px !important;
}
.text_c {
  text-align: center;
}
.olduserrecall_table {
  width:100%;
  margin: 60px 0 20px;
  border-spacing: 0;
  border-collapse: unset;
  border-top: #3e405a 1px solid;
  border-right: #3e405a 1px solid;
  font-size: 18px;
  tr {
    td {
      width:170px;
      text-align: center;
      padding: 10px 0 ;
      line-height: normal;
      border-left: #3e405a 1px solid;
      border-bottom: #3e405a 1px solid;
    }
  }
  &.olduserrecall_table_one {
    tr {
      &:first-child {
         font-size: 20px;
        color: #07f1b7;
      }
      &:nth-child(2) {
        color: #0adbac;
      }
    }
  }
  &.olduserrecall_table_two {
    tr {
      td:first-child{
        color: #07f1b7 !important;
        font-weight: normal !important;
      }
      &:first-child {
        color: #fff;
        td:last-child {
          color: #07f1b7 !important;
        }
      }
      &:last-child {
         font-size: 20px;
         color: #eebc76;
        font-weight: bold;;
      }
    }
  }
}
.margin_b {
  margin-bottom: 18px !important;
}
.gray_c {
  color: #fff;
}
.type_t {
  padding: 0 60px;
}
.classify_type {
  width: 100%;
  margin-top: 30px;
  height: 67px;
  li {
    height: 100%;
    width: 50%;
    float: left;
    text-align: center;
    font-size: 26px;
    line-height: 67px;
    color: #fff;
    position: relative;
    cursor: pointer;
    transition: background 0.2s;
    background:url("../../../assets/active/olduserrecall/type_normal.png") no-repeat center center;
    &:hover {
      color: #feedc7;
    }
    &.selected {
      color: #7a5c2e;
      background-image:url("../../../assets/active/olduserrecall/type_hover.png") ;
    }
    p {
      font-size: 14px;
      position: absolute;
      color: #c3c3c3;
      bottom: -60px;
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
.yellow_c {
  color: #eebc76;
}
.recall {
  width:100%;
  background-color: #2a2e39;
  height: 63px;
  display: flex;
  justify-content: center;
  margin-bottom: 25px;
  position: relative;
  .recall_pos {
    position: absolute;
    left: 50%;
    transform:translateX(-50%)
  }
  p {
    text-align: center;
    padding-top: 10px;
  }
  .line {
    margin: 0 10px;
    height: 63px;
  }

  .apply_btn {
    margin: 0;
    margin-left: 30px;
    margin-top: 9px;
    &.no_loagin {
      margin-left: 0;
    }
  }
}
.code_box {
  position: relative;
  height: 340px;
  >* {
    position: absolute;
  }
  .app {
    left: 60px;
  }
  .updegare_text {
    right: 230px;
    top: 70px;
  }
  .qrcode {
    width: 128px;
    height: 126px;
    top: 190px;
    left: 395px;
    background:url("../../../assets/active/olduserrecall/qrcode.png") no-repeat;
    canvas,img {
      width:104px;
      height: 104px;
      position: absolute;
      left: 50%;
      top: 5px;
      transform:translateX(-50%);
    }
    canvas {
      opacity: 0;
      pointer-events: none;
      display: none;
    }
  }
  .link {
    border: solid 1px #eebc76;
    width: 512px;
    height: 36px;
    border-radius: 5px;
    top: 190px;
    left: 540px;
    overflow: hidden;
    &.no_login {
      width: 320px;
    }
     span {
       margin-left: 18px;
       font-size: 18px;
       line-height: 36px;
       white-space: nowrap;
       max-width: 190px;
     }
     .link_btn {
       margin-left: -1px;
     }
  }
  .link_btn {
    font-size: 15px;
    color: #262933;
    width: 107px;
    height: 38px;
    line-height: 38px;
    text-align: center;
    background:url("../../../assets/active/olduserrecall/link_btn.png") no-repeat;
    cursor: pointer;
    &:hover {
      opacity: 0.9;
    }
    &.down_btn {
      top: 245px;
      left: 538px;
    }
  }
}
.apply_btn {
  width: 132px;
  height: 46px;
  background:url("../../../assets/active/olduserrecall/btn_nor.png") no-repeat;
  background-size: 100% 100%;
  font-size: 16px;
  font-weight: bold;
  color: #262933;
  text-align: center;
  line-height: 46px;
  margin: 0 auto;
  position: relative;
  cursor: pointer;
  &:hover{
    opacity: 0.9;
  }
  &.disabled {
    cursor: default;
    color: #484848;
    background:url("../../../assets/active/olduserrecall/btn_dis.png") no-repeat;
    background-size: 100% 100%;
    &:hover {
      opacity: 1;
    }
  }
}
.touzhu {
   text-align: center;
   margin: 0 auto 22px;
   color: #eebc76;
    font-size: 16px;
}
</style>
