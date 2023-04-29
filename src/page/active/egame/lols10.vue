<template>
 <div class="active_page lols10">
   <div class="person1"></div>
   <div class="person2"></div>
   <div class="person3"></div>
   <div class="banner">
     <img src="../../../assets/active/lols10/title.png" alt="">
     <h3 class="s10time" v-show="!load">活动时间:{{initInfo.active_show_time}}</h3>
   </div>
  <div class="small_loading" v-show="load"></div>
   <!--抽奖-->
   <section v-if="!load">
     <div class="title title1"></div>
     <div class="lols10_lottery" >
       <p :class="{'cannot_visable':!initInfo.times_is_show}">今日首充<span class="purple">{{isLogin?initInfo.first_deposit:0}}</span>元，电竞流水<span class="purple">{{isLogin?initInfo.gaming_bet:0}}</span>元。</p>
       <p :class="{'cannot_visable':!initInfo.times_is_show}">明日可获得<span class="purple">{{initInfo.tomorrow_times}}</span>次抽奖机会。</p>
       <ul class="s10_lot_ul">
         <li class="s10_lot_item fl"
         v-for="(item,index) in initInfo.prizes_list" :key="index"
         :class="{'active':aniIndex==index}"
         >
         <img :src="item.icon_url" alt="">
         <p>{{item.desc}}</p>
         </li>
       </ul>
       <div class="chance">
         <p class="left_chance_p fl">今日还剩 <span class="left_chance">{{isLogin?initInfo.today_times:0}}</span> 次抽奖机会</p>
         <div class="shot_history fr" @click="toHistory"></div>
       </div>
       <div class="prize_btn" @click="toGetPrize"></div>
     </div>
   </section>
  <!--中奖名单-->
  <section v-if="!load">
    <div class="title title2"></div>
    <div class="s10_history">
      <p class="no_data" v-show="!initInfo.win_list.length"> 暂无数据</p>
      <vue-seamless-scroll
      class="s10_history_scroll"
      :data="initInfo.win_list"
      :class-option="optionSingleHeightTime" >
        <ul><li  v-for="(item,index) in initInfo.win_list" :key="index">
          <span class="serial fl"></span>
          <span class="his_username ellips fl" :title="item.username">{{item.username}}</span>
          <span class="purple fl midjustnow">刚刚抽中</span>
          <span class="fl">{{item.desc}}</span>
        </li></ul>
      </vue-seamless-scroll>
    </div>
  </section>
  <!--活动内容-->
  <section v-if="!load">
    <div class="title title3"></div>
    <div class="s10_content">
      <p>S10赛事期间，VIP会员每日首存≥100即可在次日获得转盘机会并参与S10幸运召唤师抽奖活动，领取豪华大礼。</p>
      <table>
        <tr class="purple">
          <td width="33%">当日首充</td>
          <td width="33%">电竞总流水</td>
          <td>可获抽奖次数</td>
        </tr>
        <tr v-for="(item,index) in initInfo.active_setting" :key="index">
          <td>≥{{item.first_deposit}}</td>
          <td>≥{{item.bet}}</td>
          <td>{{item.times}}</td>
        </tr>
      </table>
      <p>电竞游戏包含：威客电竞、威客彩池电竞、RG电竞、IM电竞。</p>
    </div>
  </section>
  <!--活动规则-->
  <section>
    <div class="title title4"></div>
    <div class="s10_content">
      <ul  >
        <li>VIP会员每日充值并参与电竞游戏，达到对应的充值流水要求即可在次日获得转动转盘的机会，此机会仅当天有效。						</li>
        <li>玩家每日充值在未发起提款前都视为首充。例如首笔充值100元，未申请提款前，继续充值400元，则累计充值为500元；当日累计充值50000元并完成50000流水即可获得6次转盘机会。</li>
        <li>幸运召唤师转盘奖品领取有效期为：自中奖之日起，15日内有效；活动结束次日仅可使用抽奖次数进行抽奖，系统将自动停止统计会员数据。						</li>
        <li>若抽到转盘奖品为实物奖品，请联系在线客服提供中奖兑换码，提供您的详细收货地址，我们将于次日安排发货，快递单号将会发送站内信通知。除此之外您也可以联系在线客服选择折现，实物奖品折现后无需流水即可提款。</li>
        <li>每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能参与一次优惠，参与用户必须先绑定银行卡。对违规的用户，VKGAME保留无期限审核，和扣回红利及产生的利润权利。本活动最终解释权归VKGAME所有。		</li>
      </ul>
    </div>
  </section>
  <router-link to="/active"  class="s10_btn"></router-link>
  <!--中奖弹窗-->
  <el-dialog
  :close-on-click-modal="false"
    :custom-class="'pure_dialog s10_shot_dialog'"
    :visible.sync="gotPrizeDialog"
    :append-to-body="true" >
    <div class="s10_shot_dialog_box"
    :class="{'real_prize':curGotPrize.item_type==1}">
      <div class="close" @click="gotPrizeDialog=false"></div>
       <div class="title"></div>
       <p>恭喜您获得<span>{{curGotPrize.item_name}}</span></p>
       <img :src="curGotPrize.item_url" alt="">

       <p v-show="curGotPrize.item_type==1" class="smalltxt">请先复制兑换码，联系客服领取或折现：</p>
       <p v-show="curGotPrize.item_type==1" class="smalltxt code">{{curGotPrize.secret}}</p>
       <p v-show="curGotPrize.item_type==1" class="smalltxt copy" @click="doCopy(curGotPrize.secret)">点击复制兑换码</p>
       <div v-show="curGotPrize.item_type!=1" class="to_history konw" @click="gotPrizeDialog=false" ></div>
       <div v-show="curGotPrize.item_type==1" class="to_history tokefu"  @click="toOpenKfWindow"></div>
    </div>
  </el-dialog>
  <!--找客服-->
  <el-dialog
  :close-on-click-modal="false"
    :custom-class="'pure_dialog s10_shot_dialog kefu'"
    :visible.sync="toKefuDialog"
    :append-to-body="true" >
    <div class="s10_shot_dialog_box"  >
      <div class="close" @click="toKefuDialog=false"></div>
      <div class="title"></div>
      <p class="code">{{secret}}</p>
      <p class="copy" @click="doCopy(secret)">点击复制兑换码</p>
      <p>请联系客服选择领取或折现。</p>
      <div class="to_kefu" @click="toOpenKfWindow()"></div>
    </div>
  </el-dialog>
  <!--未领取弹窗-->
  <el-dialog
  :close-on-click-modal="false"
  :custom-class="'pure_dialog s10_shot_dialog kefu ungotdialog'"
  :visible.sync="unGotDialog"
  :append-to-body="true">
    <div class="s10_shot_dialog_box" >
      <div class="close" @click="unGotDialog=false"></div>
        <p class="fi_p">您有<span>{{initInfo.unreceive_num}} </span>个中奖奖品未领取</p>
        <p>小心奖品过期哦</p>
        <div class="to_history" @click=" toHistory"></div>
    </div>
  </el-dialog>
  <!---中奖纪录-->
  <el-dialog
  :close-on-click-modal="false"
    :custom-class="'pure_dialog s10_shot_dialog s10history'"
    :visible.sync="myPrizeHisDialog"
    :append-to-body="true" >
    <div class="s10_shot_dialog_box"  >
      <div class="close" @click="myPrizeHisDialog=false"></div>
      <div class="title"></div>
      <div class="small_loading" v-show="ajaxload1"></div>
      <p class="no_data" v-show="!recordList.length">暂无数据</p>
      <ul class="listul" v-show="!ajaxload1">
        <li class="list" v-for="item in recordList" :key="item.id">
          <img   :src="item.icon_url" alt="">
          <span class="got_prizename">{{item.desc}} </span>
          <span class="got_time">{{item.time}}</span>
          <span class="got_status fr"
          :class="{'notaleardy':item.status==0||item.status==4}"
          @click="sendLolS10Prize(item)">
          {{item.status==1?'已领取':(item.status==2?'已折现':(item.status==3?'已过期':''))}}</span>
        </li>
      </ul>
      <Page :total="page.total" v-show="!ajaxload1&&page.total"
        :page-size="page.pagesize"
        :current.sync="page.currentpage"
        @on-change="getLols10RecordList($event)"
         >
      </Page>
    </div>
  </el-dialog>

 </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "lols10",
  data() {
    return {
      unGotDialog:false,
      page: {
        total: 0,
        pagesize: 8,
        currentpage: 1
      },
      toKefuDialog:false,
      myPrizeHisDialog:false,
      gotPrizeDialog:false,
      aniIndex:-1,
      anirange:[0,1,2,5,4,3,6,7,8,5,4,3],
      tataltime:24,
      load:true,
      ajaxload:false,
      ajaxload1:false,
      initInfo:{},
      curGotPrize:{},
      recordList:[],
      secret:0,
      copyAlready:false,
      aniLoad:false
    };
  },
  computed: {
    ...mapState(["isLogin"]),
    optionSingleHeightTime() {
      return {
        limitMoveNum:6,
        step:0.5,
      }
    }
  },
  mounted() {
    this.getInit();
  },
  methods: {
    //复制兑换码
    doCopy (secret) {
      let _this = this
      this.copyAlready = true
      this.$copyText(secret).then(function (e) {
        _this.$message({
          message: '兑换码复制成功',
          type: 'success'
        })
      }, function (e) {
        _this.$message({
          message: _this.$t("Copy_the_failure"),
          type: 'warning'
        })
      })
    },
    getInit() {
      this.load = true
      this.$http(this.ApiSetting.active.getLolS10Init)
      .then(res => {
        this.load = false
        if(res.status == 1 && res.data) {
          this.initInfo = res.data;
          if(this.initInfo.unreceive_num) {
            this.unGotDialog = true
          }
        }
      })
      .catch(()=>{
        this.load = false
      })
    },
    //联系客服
    toOpenKfWindow () {
      if(this.copyAlready){
        this.toKefuDialog = false;
        this.openKfWindow()
        this.copyAlready = false
      }else {
        this.$message({
          message: '请先复制兑换码',
          type: "warning"
        });
      }

    },
    //立即领取
    sendLolS10Prize(item) {
      if(item.item_type==1&&item.status==4) {
        this.toKefuDialog=true;
        this.secret = item.secret
      }
      if(item.status==0) {
        this.$http(this.ApiSetting.active.sendLolS10Prize,{id:item.id})
        .then(res => {
          if(res.status == 1) {
            if(item.item_type==1) {//实物
              this.toKefuDialog=true;
              this.secret = res.data.secret
            }else if(item.item_type==2 ) {
              item.status = 1;
              this.$message({
                message: '领取成功',
                type: "success"
              });
            }
          }
        })
      }
    },
    //获取我的中奖纪录
    getLols10RecordList () {
      // this.ajaxload1 = true
      this.$http(this.ApiSetting.active.getLols10RecordList,{
         page:this.page.currentpage,
         page_size:this.page.pagesize
      } )
      .then(res => {
        this.ajaxload1 = false
        if(res.status == 1 && res.data) {
          this.recordList = res.data.record_list.data
          this.page.total = res.data.record_list.total
        }
      })
      .catch(()=>{
        this.ajaxload1 = false
      })
    },
    //去看中奖纪录
    toHistory() {
      if(!this.isLogin) {
        this.$message({
          message: '请先登录',
          type: "warning"
        });
        return
      }
      this.unGotDialog = false
      this.gotPrizeDialog = false
      this.myPrizeHisDialog = true
      this.page.currentpage = 1
      this.getLols10RecordList()
    },
    //立即抽奖
    toGetPrize() {
      if(!this.isLogin) {
        this.$message({
          message: '请先登录',
          type: "warning"
        });
        return
      }
      if(this.ajaxload ||this.aniLoad) {
        return
      }
      this.ajaxload = true
      this.aniLoad = true
      this.$http(this.ApiSetting.active.joinLolS10Apply)
      .then(res => {
        this.ajaxload = false
        if(res.status == 1 && res.data) {
          this.initInfo.today_times = res.data.times
          this.curGotPrize = res.data;
          this.initInfo.prizes_list.forEach((item,index) =>{
            if(item.id == res.data.prize_id){
              this.tataltime += this.anirange.indexOf(index) +1
              this.toGetPrizeAni()
            }
          })
        }else {
           this.aniLoad = false
        }
      })
      .catch(()=>{
        this.aniLoad = false
        this.ajaxload = false
      })
    },
    toGetPrizeAni() {
      let startRange = 0
      let maxRange = this.anirange.length-1
      this.aniIndex = 0
      var anitime = 100
      var _this = this
      fnt(anitime)
      function fnt(timeout) {
        setTimeout(() => {
          _this.tataltime--
          if(_this.tataltime<=0) {
            _this.tataltime = 24
            _this.gotPrizeDialog = true
            _this.aniIndex = -1
            _this.aniLoad = false
          }else {
            startRange++
            if(startRange>maxRange) {
              startRange = 0
            }
            _this.aniIndex = _this.anirange[startRange]
            anitime = _this.tataltime>6?100:100+(6-_this.tataltime)*100
            fnt(anitime)
          }
        }, timeout);
      }
    }
  }
};
</script>

<style scoped lang="less">
.lols10 {
  background-image: linear-gradient(to right, #19256a, #141c50, #19256a);
  padding: 0 0 60px;
  text-align: center;
  position: relative;
  * {
    box-sizing: border-box;
  }
  * + * {
    box-sizing: border-box;
  }
  .person1 {
    position: absolute;
    left: 0;
    top: 37vw;
    width: 739px;
    height: 670px;
    background: url("../../../assets/active/lols10/1.png") no-repeat;
    z-index: 1;
  }
  .person2 {
    position: absolute;
    bottom: 70px;
    left: 0;
    width: 685px;
    height: 792px;
    background: url("../../../assets/active/lols10/2.png") no-repeat;
    z-index: 1;
  }
  .person3 {
    position: absolute;
    top: 1510px;
    right: 0;
    width: 669px;
    height: 888px;
    background: url("../../../assets/active/lols10/3.png") no-repeat;
    z-index: 1;
  }
  .purple {
    color:#d3baff;
  }
  .banner {
    width: 100%;
    height: 34.2vw;
    background: url("../../../assets/active/lols10/banner.png") no-repeat;
    background-size: 100% 100%;
    text-align: center;
    overflow: hidden;
    img {
      width: 44.8vw;
      height: 11vw;
      margin-top: 14vw;
      display: inline-block;
    }
    .s10time {
      color: #ffdda3;
      font-size: 36px;
      margin-top: 10px;
    }
  }
  .title {
    width: 411px;
    height: 82px;
    margin: 40px auto 0;
    &.title1 {
      margin-top: 20px;
      background: url("../../../assets/active/lols10/title1.png") no-repeat center center;
    }
    &.title2 {
      background: url("../../../assets/active/lols10/title2.png") no-repeat center center;
    }
    &.title3 {
      background: url("../../../assets/active/lols10/title3.png") no-repeat center center;
    }
    &.title4 {
      background: url("../../../assets/active/lols10/title4.png") no-repeat center center;
    }
  }
  .lols10_lottery {
    width: 764px;
    margin: 0 auto;
    color: #ffedd8;
    background: url("../../../assets/active/lols10/subbg1.png") no-repeat center top;
    padding: 60px 90px 0;
    font-size: 20px;
    text-align: left;
    position: relative;
    z-index: 2;
   .cannot_visable {
     visibility: hidden;
   }
    p {
      line-height: 1.6;
    }
    .s10_lot_ul {
      height: 444px;
      width: 642px;
      margin-left: -14px;
    }
    .s10_lot_item {
      width: 224px;
      height: 176px;
      background: url("../../../assets/active/lols10/prizebg.png") no-repeat ;
      margin-left:-15px ;
      margin-bottom: -35px;
      position: relative;
      text-align: center;
      &.active {
        background: url("../../../assets/active/lols10/prize-light.png") no-repeat ;
      }
      img {
        width: 130px;
        height: 70px;
        margin-top: 43px;
      }
      p {
        margin-top: -2px;
        font-size: 16px;
      }
    }
    .chance {
      height: 50px;
      .left_chance_p {
        line-height: 50px;
      }
      .left_chance {
        color: #404089;
      }
      .shot_history {
        width: 172px;
        height: 50px;
        cursor: pointer;
        background: url("../../../assets/active/lols10/btn-1-normal.png") no-repeat ;
        &:hover {
          background: url("../../../assets/active/lols10/btn-1-hover.png") no-repeat ;
        }
      }
    }
    .prize_btn {
      width: 314px;
      height: 96px;
      margin: 20px auto 0 ;
      cursor: pointer;
      background: url("../../../assets/active/lols10/btn-2-normal.png") no-repeat ;
      &:hover {
        background: url("../../../assets/active/lols10/btn-2-hover.png") no-repeat ;
      }
    }
  }
  .s10_history {
    width: 764px;
    height: 270px;
    margin: 0 auto;
    color: #ffecd6;
    background: url("../../../assets/active/lols10/subbg2.png") no-repeat center top;
    background-size:100% 100% ;
    overflow: hidden;
    position: relative;
    z-index: 2;
    .no_data{
      margin-top: 120px;
      font-size: 20px;
    }
    .s10_history_scroll {
      height: 155px;
      width: 610px;
      margin: 63px auto 0;
      overflow: hidden;
      font-size: 20px;
      li {
        display: flex;
        height: 26px;
        .serial {
          width:14px;
          height: 26px;
          margin-right: 8px;
          background: url("../../../assets/active/lols10/serial.png") no-repeat center center;
        }
        .his_username {
          width: 220px;
          max-width: 220px;
          text-align: left;
        }
        .midjustnow {
          margin: 0 60px 0 40px;
        }
      }
    }
  }
  .s10_content {
    width: 764px;
    margin: 0 auto;
    color: #ffecd6;
    background: url("../../../assets/active/lols10/subbg3.png") no-repeat center top;
    background-size:100% 100% ;
    color: #ffedd8;
    font-size: 20px;
    text-align: left;
    padding: 65px 0 50px;
    position: relative;
    z-index: 2;

    p {
      padding: 0 50px;
    }
    table {
      width: 710px;
      margin: 18px auto 12px;
      border-spacing: 0;
      border-collapse: unset;
      border-top: rgba(255,236,214,0.4) 1px solid;
      border-right: rgba(255,236,214,0.4) 1px solid;
      tr {
        td {
          text-align: center;
          line-height: 35px;
          border-left: rgba(255,236,214,0.4) 1px solid;
          border-bottom: rgba(255,236,214,0.4) 1px solid;
        }
      }
    }
    ul {
      line-height: 1.4;
      padding: 0 60px 0 80px;
      li {
        list-style: decimal;
      }
    }
  }
  .s10_btn {
    display: block;
    width:172px;
    margin: 60px auto 0;
    height: 51px;
    background: url("../../../assets/active/lols10/btn-3-normal.png") no-repeat;
    cursor: pointer;
    &:hover {
      background: url("../../../assets/active/lols10/btn-3-hover.png") no-repeat;
    }
  }
}
</style>
<style lang="less">
.s10_shot_dialog {
  .s10_shot_dialog_box {
      width:470px;
      margin:0 auto;
      height: 382px;
      background: url("../../../assets/active/lols10/gotprizebg.png") no-repeat;
      overflow: hidden;
      text-align: center;
      position: relative;
      &.real_prize {
        height: 513px;
        background: url("../../../assets/active/lols10/realprizebg.png") no-repeat;
      }
      .title{
        width:130px;
        margin:35px auto 10px;
        height: 48px;
        background: url("../../../assets/active/lols10/title6.png") no-repeat;
      }
      p {
        font-size: 24px;
        color: #ffedd8;
        span {
          color:#d3baff;
        }
      }
      img {
        width:294px;
        height: 164px;
        margin:13px 0;
      }
      .to_history {
        width:112px;
        height: 44px;
        margin:0 auto;
        cursor: pointer;
        background: url("../../../assets/active/lols10/btn-4-normal.png") no-repeat;
        &:hover {
          background: url("../../../assets/active/lols10/btn-4-hover.png") no-repeat;
        }
        &.konw {
          background: url("../../../assets/active/lols10/btn-know-normal.png") no-repeat;
          background-size: 100% 100%;
          &:hover {
            background: url("../../../assets/active/lols10/btn-know-hover.png") no-repeat;
            background-size: 100% 100%;
          }
        }
        &.tokefu {
          margin-top:30px;
          background: url("../../../assets/active/lols10/btn-kefu-normal.png") no-repeat;
          background-size: 100% 100%;
          &:hover {
            background: url("../../../assets/active/lols10/btn-kefu-hover.png") no-repeat;
            background-size: 100% 100%;
          }
        }
      }

  }
  .close {
    position: absolute;
    right: 16px;
    top: 18px;
    width:42px;
    height: 46px;
    cursor: pointer;
    background: url("../../../assets/active/lols10/icon-x-normal.png") no-repeat;
    &:hover {
      background: url("../../../assets/active/lols10/icon-x-hover.png") no-repeat;
    }
  }
  p.smalltxt {
    font-size: 22px;
  }
  .code {
    text-transform: uppercase;
  }
  p.copy {
    color:#d3baff;
    text-decoration: underline;
    cursor: pointer;
    display: inline-block;
  }
  &.kefu.ungotdialog {
    p {
      font-size:24px;
    }
    .fi_p {
      margin-top: 88px;
    }
    .to_history {
      margin-top:70px;
    }
  }
  &.kefu {
    font-size: 24px;
    .title {
      width: 155px;
      background: url("../../../assets/active/lols10/title7.png") no-repeat;
    }
    .s10_shot_dialog_box {
      width: 510px;
      height: 294px;
      background: url("../../../assets/active/lols10/kefubg.png") no-repeat;
    }
    p {
      // margin: 50px 0;
    }
    .code {
      text-transform: uppercase;
    }
    .copy {
      margin: 5px 0 10px;
    }
    .to_kefu{
      width:162px;
      height: 48px;
      margin:20px auto;
      cursor: pointer;
      background: url("../../../assets/active/lols10/btn-5-normal.png") no-repeat;
      &:hover {
        background: url("../../../assets/active/lols10/btn-5-hover.png") no-repeat;
      }
    }
  }
  &.s10history {
    .s10_shot_dialog_box {
      width: 708px;
      height: 631px;
      border: solid 1px #ffecd6;
      background: #3c50ab;
    }
    .no_data {
      margin-top: 200px;
    }
    .title {
      width:152px;
      margin: 24px 24px 8px;
      height: 58px;
      background: url("../../../assets/active/lols10/title5.png") no-repeat;
    }
    .listul {
      width: 660px;
      height: 480px;
      margin: 0 auto;
    }
    .list {
      height: 60px;
      width: 660px;
      background: url("../../../assets/active/lols10/line.png") no-repeat center bottom;
      font-size: 20px;
      color:#fff;
      span {
        line-height: 56px;
      }
      img {
        width: 70px;
        height: 39px;
        margin:-5px 0 0 -60px;

      }
      .got_prizename {
        margin: 0 60px 0 0 ;
        width: 200px;
        display: inline-block;
        text-align: left;
      }
      .got_time {
        // margin-right:60px ;
      }
      .got_status{
        display: inline-block;
        width: 112px;
        text-align: center;
        font-size: 20px;
        color: #f4f4f4;
        &.notaleardy {
          margin-top: 6px;
          width: 112px;
          height: 44px;
          cursor: pointer;
          background: url("../../../assets/active/lols10/btn-6-normal.png") no-repeat;
          &:hover {
            background: url("../../../assets/active/lols10/btn-6-hover.png") no-repeat;
          }
        }
      }
    }
    .ivu-page {
      float: right;
      margin-right: 16px;
    }
    .ivu-page-item-jump-next, .ivu-page-item-jump-prev, .ivu-page-next, .ivu-page-prev {
      border:0;
    }
    .ivu-page-item a {
      color: #d3baff;
    }
    .ivu-page-item:hover a {
      color: #fff;
    }
    .ivu-page-item-active {
      color: #fff;
      border-color: #fff;
    }
    .ivu-page-item-active:hover a, .ivu-page-item-active a {
      color: #fff;
    }
  }

}
</style>
