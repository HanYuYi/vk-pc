<template>
 <div class="active_page anniversary2020">
   <div class="big_title"></div>
   <h1 class="title">活动时间：{{initInfo.start_time}}-{{initInfo.end_time}}</h1>
    <!--活动一-->
    <section class="active_one">
      <div class="subsection">
       <div class="subsection_tit">百万奖池大狂欢</div>
       <p class="subsection_tit_two">
         威客周年庆奖池每晚20:00自动开启<br>
         百万奖池等你来领！
       </p>
      </div>
      <div class="a_one_con">
        <div class="fl">
          <div class="count_time">
            <h2 class="c_time_h2">开奖倒计时</h2>
            <span class="down_num">{{countDown[0]}}</span>
            <span class="colon">:</span>
            <span class="down_num">{{countDown[1]}}</span>
            <span class="colon">:</span>
            <span class="down_num">{{countDown[2]}}</span>
          </div>
          <div class="prize">
            <h2 class="prize_h2">获奖动态</h2>
            <vue-seamless-scroll v-if="initInfo.winning_list&&initInfo.winning_list.length"
            :data="initInfo.winning_list" :class-option="classOption " class="prize_scroll">
              <div>
                <div class="prize_item" v-for="(pitem,index) in Math.ceil(initInfo.winning_list.length/2)" :key="index">
                  <div class="prize_item_d">
                    <span class="username ellips" :title="initInfo.winning_list[index*2].username">{{initInfo.winning_list[index*2].username}}</span>
                    <span class="money fr">{{initInfo.winning_list[index*2].money}}</span>
                  </div>
                  <div class="prize_item_d" v-if="(index*2+1)<initInfo.winning_list.length">
                    <span class="username ellips" :title="initInfo.winning_list[index*2+1].username">{{initInfo.winning_list[index*2 +1].username}}</span>
                    <span class="money fr">{{initInfo.winning_list[index*2 +1].money}}</span>
                  </div>
                </div>
              </div>
            </vue-seamless-scroll>
            <p class="no_prize_data" v-else>未开奖</p>
          </div>
        </div>
        <div class="fr fr_box">
          <h2 class="fr_h2">奖金金额<span class="s_fr_h2">首充金额越高，获得大额红包的几率就会越大！</span></h2>
          <div class="moneylist">
            <div v-for="bounsmon in prizeMoney"
            :key="bounsmon" class="bouns_money fl">{{bounsmon}} <span class="kenn">元</span> </div>
          </div>
          <div class="rule">
            <h2 class="fr_h2">奖池玩法规则</h2>
            <p class="rule_p">
              1.VIP会员每日在威客电竞首充≥100即可在活动页面点击报名，每晚20:00奖池自动开启，奖池奖金最低12元起，每位会员每日最高可获得8888元现金奖励！<br>
              2.参与此活动的会员需在每日20:00前在活动页面完成报名，奖池开奖后当日不可再次报名，新一轮报名在次日00:00开启。<br>
              3.用户每日20:00之前在平台未提款前的累计充值金额为首充；参与威客周年庆奖池活动所获得的彩金需完成全站一倍有效流水。<br>
              4.本活动最终解释权归VKGAME所有。
            </p>
            <div class="an_btn" :class="{'applyed':initInfo.status==1&&isLogin}" @click="apply()">{{initInfo.status==1&&isLogin?'已报名':'立即报名'}}</div>
          </div>
        </div>
      </div>
    </section>
    <!--活动二-->
    <section class="active_two">
      <div class="subsection">
        <div class="subsection_tit">全场八折限时领</div>
        <p class="subsection_tit_two">
         {{initInfo.vmall_start_time}} 至 {{initInfo.vmall_end_time}}<br>
         V币商城全场商品限时8折大优惠！
        </p>
      </div>
      <div class="vbmart">
        <div class="vbmart_mask">
          <div class="an_btn" @click="$router.push({ name: 'vbmarket', params: { curTypeId: 99999 }})">立即兑换</div>
        </div>
        <vue-seamless-scroll :data="vbprizeData1" :class-option="{direction: 3}" class="row_box" >
          <ul class="vbmart_ul">
            <li class="fl vbmart_li"
            v-for="(item, index) in vbprizeData1" :key="index">
              <div class="img_box"><img :src="item.imgurl" alt=""></div>
              <p class="vb_prize_name">{{item.name}}</p>
              <p class="vb_prize_money">{{item.money}}</p>
            </li>
          </ul>
        </vue-seamless-scroll>
        <vue-seamless-scroll :data="vbprizeData2" :class-option="{direction: 2}" class="row_box row_box_two" >
          <ul class="vbmart_ul">
            <li class="fl vbmart_li"
            v-for="(item, index) in vbprizeData2" :key="index">
              <div class="img_box"><img :src="item.imgurl" alt=""></div>
              <p class="vb_prize_name">{{item.name}}</p>
              <p class="vb_prize_money">{{item.money}}</p>
            </li>
          </ul>
        </vue-seamless-scroll>
      </div>
    </section>
    <!--活动三-->
    <section class="active_three">
      <div class="subsection">
        <div class="subsection_tit">每日签到抽豪礼</div>
        <p class="subsection_tit_two">
          VIP会员每日在本活动页面签到即可免费领取1次点金胜手挖矿次数抽取豪礼！<br>
          此机会需在领取当日使用，隔日无效。
        </p>
      </div>
      <div class="a_mining">
        <ul class="m_p_ul fl">
          <li v-for="(minitem,index) in miningprizeData" :key="index" class="m_p_li">
            <div class="m_p_img"><img :src="minitem.imgurl" alt=""></div>
            <p class="m_p_name">{{minitem.name}}</p>
          </li>
        </ul>
        <div class="fr">
          <h2 class="min_h2"></h2>
          <div class="min_shin">
             <div :class="item.classname" v-for="(item,index) in minshin" :key="index">
                <img v-show="item.isShinning" src="../../../assets/active/mining/shining.png" alt="" class="shinning_img">
                <img :src="item.imgurl" alt="" >
              </div>
             <div class="min_per">
               <img src="../../../assets/active/anniversary2020/mining_person.png" alt="">
              </div>
          </div>
          <div class="an_btn" @click="signIn()">{{initInfo.sign_status==1&&isLogin?'去挖矿>>':'立即签到'}}</div>
        </div>
      </div>
    </section>
    <!--报名成功-->
    <el-dialog
      :custom-class="'birth_prize_dialog anniversary2020_dialog'"
      :visible.sync="applySuccessShow"
      :append-to-body="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :lock-scroll="true">
      <div class="anniversary2020_dialog_content">
        <div class="anniversary2020_dialog_close" @click="applySuccessShow=false"></div>
        <h1 class="anniversary2020_dialog_h2">报名成功</h1>
        <div class="anniversary2020_dialog_detail">请耐心等待20:00开奖哦</div>
      </div>
    </el-dialog>
    <!--恭喜中奖-->
    <el-dialog
      :custom-class="'birth_prize_dialog anniversary2020_dialog'"
      :visible.sync="winPrizeShow"
      :append-to-body="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :lock-scroll="true">
      <div class="anniversary2020_dialog_content winprize">
        <div class="anniversary2020_dialog_close" @click="winPrizeShow=false"></div>
        <h1 class="anniversary2020_dialog_h2">恭喜您中奖</h1>
        <p class="winprize_bouns">{{initInfo.win_bonus}}<span>元</span></p>
      </div>
    </el-dialog>
    <!--签到成功-->
    <el-dialog
      :custom-class="'birth_prize_dialog anniversary2020_dialog'"
      :visible.sync="signSuccessShow"
      :append-to-body="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :lock-scroll="true">
      <div class="anniversary2020_dialog_content sign">
        <div class="anniversary2020_dialog_close" @click="signSuccessShow=false"></div>
        <h1 class="anniversary2020_dialog_h2">签到成功</h1>
        <div class="anniversary2020_dialog_detail">恭喜您获得1次挖矿机会</div>
        <router-link to="/active/mining" class="anniversary2020_dialog_h2 link">立即去挖矿>></router-link>
        <div class="anniversary2020_dialog_line"></div>
      </div>
    </el-dialog>
 </div>
</template>

<script>
import {formatDate,formatCountTime} from "../../../utils/util"
import { mapState } from 'vuex'
export default {
  name: "anniversary2020",
  data() {
    return {
      winPrizeShow:false,
      applySuccessShow:false,
      signSuccessShow:false,
      prizeMoney:[8888,1888,888,188,88,38,28,18,12],
      vbprizeData1:[
        {name:"Gucci 真丝领带",money:"1????0 V币",imgurl:require("../../../assets/active/anniversary2020/vbrow1.png")},
        {name:"周大福圆牌足金吊坠",money:"2????0 V币",imgurl:require("../../../assets/active/anniversary2020/vbrow2.png")},
        {name:"LV双面腰带",money:"7????0 V币",imgurl:require("../../../assets/active/anniversary2020/vbrow3.png")},
        {name:"Gucci皮革双折线钱包",money:"4????0 V币",imgurl:require("../../../assets/active/anniversary2020/vbrow4.png")},
        {name:"贵州茅台400ml",money:"1????0 V币",imgurl:require("../../../assets/active/anniversary2020/vbrow5.png")},
        {name:"腾讯视频月VIP",money:"2??0 V币",imgurl:require("../../../assets/active/anniversary2020/vbrow6.png")},
        {name:"雷蛇鼠标",money:"1????0 V币",imgurl:require("../../../assets/active/anniversary2020/vbrow7.png")},
        {name:"九阳豆浆机",money:"2???0 V币",imgurl:require("../../../assets/active/anniversary2020/vbrow8.png")},
        {name:"GM黑色太阳镜",money:"3???0 V币",imgurl:require("../../../assets/active/anniversary2020/vbrow9.png")},
        {name:"小米充电宝",money:"9??0 V币",imgurl:require("../../../assets/active/anniversary2020/vbrow10.png")},
        {name:"100元现金投注额",money:"8??0 V币",imgurl:require("../../../assets/active/anniversary2020/vbrow11.png")},
      ],
      vbprizeData2:[
        {name:"MC小辣椒口红",money:"1????0 V币",imgurl:require("../../../assets/active/anniversary2020/vbrowtwo1.png")},
        {name:"500元现金投注额",money:"4????0 V币",imgurl:require("../../../assets/active/anniversary2020/vbrowtwo2.png")},
        {name:"华为手机",money:"5????0 V币",imgurl:require("../../../assets/active/anniversary2020/vbrowtwo3.png")},
        {name:"IPAD平板电脑",money:"3????0 V币",imgurl:require("../../../assets/active/anniversary2020/vbrowtwo4.png")},
        {name:"Dota2随机至宝",money:"1????0 V币",imgurl:require("../../../assets/active/anniversary2020/vbrowtwo5.png")},
        {name:"爱奇艺会员月VIP",money:"2??0 V币",imgurl:require("../../../assets/active/anniversary2020/vbrowtwo6.png")},
        {name:"AWP二西莫夫",money:"6???0 V币",imgurl:require("../../../assets/active/anniversary2020/vbrowtwo7.png")},
        {name:"九阳电饭煲",money:"2???0 V币",imgurl:require("../../../assets/active/anniversary2020/vbrowtwo8.png")},
        {name:"AJ男鞋",money:"1????0 V币",imgurl:require("../../../assets/active/anniversary2020/vbrowtwo9.png")},
        {name:"良品铺子零食大礼包",money:"6??0 V币",imgurl:require("../../../assets/active/anniversary2020/vbrowtwo10.png")},
        {name:"100元话费充值卡",money:"1???0 V币",imgurl:require("../../../assets/active/anniversary2020/vbrowtwo11.png")},
      ],
      miningprizeData:[
        {name:"华为Mate30 5G手机",imgurl:require("../../../assets/active/anniversary2020/mining1.png")},
        {name:"傲风电竞椅",imgurl:require("../../../assets/active/anniversary2020/mining2.png")},
        {name:"88元现金",imgurl:require("../../../assets/active/anniversary2020/mining3.png")},
        {name:"100元话费",imgurl:require("../../../assets/active/anniversary2020/mining4.png")},
        {name:"Kindle Paperwhite4",imgurl:require("../../../assets/active/anniversary2020/mining5.png")},
        {name:"黑暗使者亚索手办",imgurl:require("../../../assets/active/anniversary2020/mining6.png")},
      ],
      minshin:[
        {classname:"min_dia",isShinning:false,imgurl:require("../../../assets/active/mining/diamonds.png")},
        {classname:"min_gold",isShinning:false,imgurl:require("../../../assets/active/mining/gold.png")},
        {classname:"min_gold_bag",isShinning:false,imgurl:require("../../../assets/active/mining/gold-bag.png")},
        {classname:"min_red_dia",isShinning:false,imgurl:require("../../../assets/active/mining/red-diamond.png")}
      ],
      countDown:[],
      countDownTimer:null,
      initInfo:{},
      ajaxLoad:false,
      ajaxLoad1:false,
      getBaseTimeout:null
    };
  },
  computed: {
    ...mapState(["isLogin"]),
    classOption () {
      return {
        limitMoveNum: 8,
        singleHeight:  30,
        waitTime: 1500,
      }
    },
  },
  mounted () {
    this.getBaseInfo()
    this.minshin.forEach(item =>{
      item.isShinning = Math.random() > 0.5;
    })
    this.startTimeoutRandom();
  },
  activated() {
    this.getBaseInfo()
    this.minshin.forEach(item =>{
      item.isShinning = Math.random() > 0.5;
    })
    this.startTimeoutRandom();
  },
  methods: {
    getBaseInfo() {
      if(this.$route.name=="anniversary2020") {
        this.$http(this.ApiSetting.active.getAnniversaryInit)
        .then(res => {
          if(res.status == 1&& res.data) {
            this.initInfo = res.data;
            if(res.data.win_bonus) {
              this.winPrizeShow = true
            }else {
              this.winPrizeShow = false
            }
            let stime = new Date(res.data.active_start_time*1000)
            this.initInfo.start_time = stime.getFullYear() + '.' + (stime.getMonth() + 1) + '.' + stime.getDate()
            let etime = new Date(res.data.active_end_time*1000)
            this.initInfo.end_time = etime.getFullYear() + '.' + (etime.getMonth() + 1) + '.' + etime.getDate()
            this.countDownHadl(res.data.open_time)

            this.$forceUpdate()
          }
        })
      }
    },
    //倒计时
    countDownHadl(opentime) {
      if(this.initInfo.status==2) {//活动未开始
        this.countDown = ["19","59","59"]
      }else if (this.initInfo.status==3){//活动已结束
        this.countDown = ["00","00","00"]
      }else{
        let countTime = opentime;
        if(countTime>this.initInfo.reference_time) {
          //reference_time 表示从00:00到开奖时间的秒数,此时是开奖时间-24:00
          this.countDown = ["00","00","00"]
          setTimeout(() => {
            this.getBaseInfo()
          }, (countTime-this.initInfo.reference_time)*1000);
        }else {
          clearInterval(this.countDownTimer)
          this.countDown = formatCountTime(countTime).split(":")
          this.countDownTimer = setInterval(()=>{
            if(countTime) {
              countTime--
              this.countDown = formatCountTime(countTime).split(":")
            }else {
              clearInterval(this.countDownTimer)
              this.countDown = ["00","00","00"]
              //看是否中奖
              if(!this.getBaseTimeout&&countTime==0) {
                if(!this.winPrizeShow) {
                  this.getBaseInfo()
                }
                setTimeout(() => {
                  if(!this.winPrizeShow) {
                    this.getBaseInfo()
                  }
                }, 20000);
                this.getBaseTimeout = setTimeout(() => {
                  clearTimeout(this.getBaseTimeout)
                  this.getBaseTimeout = null
                  if(!this.winPrizeShow) {
                    this.getBaseInfo()
                  }
                }, 40000);
              }
            }
          },1000)
        }
      }
    },
    //签到
    signIn() {
      if(!this.isLogin) {
        this.$message({
          message: '请先登录',
          type: "warning"
        });
        return;
      }
      if(this.initInfo.sign_status==1) {
        this.$router.push({path:"/active/mining"})
        return;
      }
      if(this.ajaxLoad) {
        return
      }
      if(this.initInfo.sign_status==0) {
        this.ajaxLoad = true;
        this.$http(this.ApiSetting.active.joinSignToMining)
        .then(res =>{
          this.ajaxLoad = false;
          if (res.status == 1) {
            this.signSuccessShow = true
            this.initInfo.sign_status = 1
          }
        },
        err=>{
          this.ajaxLoad = false;
        })
      }else {
        this.$message({
          message: this.initInfo.sign_tips,
          type: "warning"
        });
      }
    },
    //报名
    apply() {
      if(!this.isLogin) {
        this.$message({
          message: '请先登录',
          type: "warning"
        });
        return;
      }
      if(this.initInfo.status==1||this.ajaxLoad1) {
        return
      }
      if(this.initInfo.status==0) {
        this.ajaxLoad1 = true;
        this.$http(this.ApiSetting.active.joinAnniversaryApply)
        .then(res =>{
          this.ajaxLoad1 = false;
          if (res.status == 1) {
            this.applySuccessShow = true
            this.initInfo.status = 1
          }
        },
        err=>{
          this.ajaxLoad1 = false;
        })
      }else {
        this.$message({
          message: this.initInfo.status_tips,
          type: "warning"
        });
      }
    },
    //挖矿宝石的shining
    startTimeoutRandom(){
      const randomSec = 5000 + parseInt(Math.random() * 4) * 1000;
      setTimeout(() => {
        this.minshin.forEach((item,index) =>{
          setTimeout(() => {
            item.isShinning = Math.random() > 0.5;
          }, index*500);
        })
        this.startTimeoutRandom();
      }, randomSec);
    },
  }
};
</script>

<style scoped lang="less">
.anniversary2020 {
  padding: 160px 0 80px;
  background:url("../../../assets/active/anniversary2020/bg.jpg") no-repeat center top;
  * {
    box-sizing: border-box;
  }
  *+*{
    box-sizing: border-box;
  }
  .big_title {
    width: 1077px;
    height: 355px;
    margin:0 auto;
    background:url("../../../assets/active/anniversary2020/big_txt.png") no-repeat;
  }
  .title {
    text-align: center;
    font-size: 36px;
    color: #f2eabe;
    text-shadow: 0px 6px 2px rgba(111, 0, 0, 0.8);
    margin-bottom: 110px;
  }
  .subsection {
    max-width: 1920px;
    margin: 0 auto;
    background:url("../../../assets/active/anniversary2020/subsection.png") no-repeat center top;
    .subsection_tit {
      width: 504px;
      height: 86px;
      margin: 0 auto;
      background:url("../../../assets/active/anniversary2020/subsection_tit.png") no-repeat;
      text-shadow: 0px 3px 0 #eefbfb;
      line-height: 82px;
      text-align: center;
      font-weight: bold;
      color: #c74547;
      font-size: 54px;
    }
    .subsection_tit_two {
       font-size: 24px;
       line-height: 1.25;
       color: #fcbb83;
      text-align: center;
      margin-top: 18px;
    }
  }
  .an_btn {
    width: 214px;
    height: 74px;
    background:url("../../../assets/active/anniversary2020/an_btn.png") no-repeat;
    font-size: 31px;
    color: #fff9e6;
    line-height: 69px;
    text-align: center;
    margin: 10px auto 0;
    font-weight: bold;
    cursor: pointer;
    &:hover {
      opacity: 0.9;
    }
    &.applyed {
      cursor: default;
      &:hover {
        opacity: 1;
      }
    }
  }
  .active_one {
    .a_one_con {
      width: 1240px;
      height: 600px;
      margin: 30px auto;
    }
    .count_time {
      width: 467px;
      height: 488px;
      background:url("../../../assets/active/anniversary2020/count.png") no-repeat;
      overflow: hidden;
      text-align: center;
      margin-top: -90px;
      .c_time_h2 {
        color: #ffffff;
        font-size: 20px;
        text-shadow: 0px 1px 0 #bb2c2b;
        margin: 320px 0 20px;
      }
      .colon {
        font-size: 16px;
        color: #fff;
        vertical-align: top;
        line-height: 70px;
        display: inline-block;
        height: 70px;
      }
      .down_num {
        display: inline-block;
        width: 68px;
        height: 70px;
        background:url("../../../assets/active/anniversary2020/down_bg.png") no-repeat;
        font-size: 40px;
        color: rgba(241, 241, 241, 0.85);
        font-weight: bold;
        line-height: 70px;
        text-align: center;
      }
    }
    .prize {
      margin: 8px auto 0;
      width: 437px;
      height: 215px;
      border-radius: 20px;
      box-shadow: inset 0px 1px 2px 0 rgba(10, 0, 0, 0.35);
      background-color: #bb3c3d;
      color: #fff;
      box-sizing: border-box;
      padding: 22px 33px 0;
      .prize_h2 {
        font-size: 21px;
        margin-bottom: 16px;
        text-align: center;
      }
      .no_prize_data{
        text-align: center;
        margin-top: 50px;
        font-size: 16px;
      }
      .prize_scroll{
        height: 120px;
        overflow: hidden;
        font-size: 17px;
        .prize_item {
          height: 30px;
        }
        .username {
          max-width: 100px;
          width: 100px;
          display: inline-block;
          vertical-align: middle;
        }
        .prize_item_d {
          width: 165px;
          height: 100%;
          line-height: 30px;
          float: left;
          &:first-child {
            margin-right: 41px;
          }
        }
      }
    }
    .fr_h2 {
      font-size: 22px;
      color: #fff;
      width: 682px;
      margin: 0 auto;
      .s_fr_h2 {
        font-size: 18px;
        color: #fff7af;
        font-weight: normal;
        margin-left: 6px;
      }
    }
    .fr_box {
      width: 713px;
    }
    .bouns_money {
      color: #c64448;
      font-weight: bold;
      margin-bottom: 14px;
      &:nth-child(-n+4){
        width: 161px;
        height: 81px;
        background:url("../../../assets/active/anniversary2020/big_redp.png") no-repeat;
        font-size: 37px;
        line-height: 81px;
        text-align: center;
        margin-right: 12px;
        .kenn{
          font-size: 21px;
        }
      }
      &:nth-child(n+5) {
        width: 128px;
        height: 70px;
        background:url("../../../assets/active/anniversary2020/small_redp.png") no-repeat;
        font-size: 30px;
        line-height: 70px;
        text-align: center;
        margin-right: 10px;
        .kenn{
          font-size: 17px;
        }
      }
      &:nth-child(4),&:last-child {
        margin-right: 0;
      }
    }
    .moneylist {
      overflow: hidden;
      width: 682px;
      margin: 0 auto;
      margin-top:14px ;
    }
    .rule {
      width: 713px;
      height: 410px;
      background: url("../../../assets/active/anniversary2020/rule_bg.png") no-repeat;
      margin-top: 14px;
      padding: 20px 30px;
      .rule_p {
        margin-top: 16px;
        font-size: 18px;
        line-height: 1.8;
        color: #fff;
      }
    }
  }
  .active_two {
    margin-top: 60px;
    .vbmart {
      position: relative;
      max-width: 1920px;
      margin: 0 auto;
      .vbmart_mask {
        position: absolute;
        z-index: 3;
        top: -68px;
        pointer-events: none;
        left: 0;
        width: 100%;
        max-width: 1920px;
        height: 839px;
        background:url("../../../assets/active/anniversary2020/vbmart_mask.png") no-repeat center center;
        .an_btn {
          pointer-events:all;
          position: absolute;
          left: 50%;
          top:47%;
          transform:translate(-50%,-50%)
        }
      }
      .vbmart_ul{
        display: flex;
      }
      .row_box {
        background-color: #a22b2c;
        width: 1280px;
        margin: 60px auto 0;
        height: 300px;
        overflow: hidden;
        padding:40px 0;
        border-radius: 100px ;
        &.row_box_two {
          margin-top: 109px;
        }
        .vbmart_li {
          width: 186px;
          height: 216px;
          background:url("../../../assets/active/anniversary2020/vb_prize_bg.png") no-repeat;
          text-align: center;
          margin:0 20px 40px ;
          transform: translateZ(0);
          .vb_prize_name {
            font-size: 16px;
            color: #a33030;
            letter-spacing: 0.4px;
            margin-top: -16px;
          }
          .vb_prize_money {
            font-size: 22px;
            color: #ffffff;
            margin-top: 12px;
          }
          .img_box {
            width: 100%;
            height:156px;
            position: relative;
            img{
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%,-50%);
              max-width: 100%;
              max-height: 100%;
            }
          }
        }
      }
    }
  }
  .active_three{
    margin-top: 90px;
    .a_mining {
      width: 1230px;
      height: 549px;
      margin:14px auto 0;
      border-radius: 20px;
      box-shadow: 0px 10px 16px 0 rgba(81, 0, 0, 0.3), 0px -2px 1px 0 rgba(255, 255, 255, 0.3);
      background-image: linear-gradient(to right, #b83a3c, #ee5e5e);
      overflow: hidden;
      .m_p_ul {
        width: 680px;
        margin: 40px 0 0 20px;
        overflow: hidden;
        .m_p_li {
          width: 216px;
          float: left;
          margin:10px 0;
          .m_p_img {
            width: 176px;
            margin:0 auto;
            height: 179px;
            background:url("../../../assets/active/anniversary2020/min_bg.png") no-repeat;
          }
          .m_p_name {
            font-size: 22px;
            text-align: center;
            color: #ffffff;
            margin-top: 10px;
          }
        }
      }
      .min_h2 {
        width: 327px;
        height: 43px;
        margin-top: 50px;
        margin-left: 20px;
        background:url("../../../assets/active/anniversary2020/min_txt.png") no-repeat;
      }
      .min_shin {
        width: 500px;
        height: 304px;
        position: relative;
        img{
          width: 100%;
          height: 100%;
        }
        >div {
          position: absolute;
        }
        .min_gold {
          left: -60px;
          bottom: 20px;
          width: 120px;
          height: 104px;
        }
        .min_gold_bag {
          left: 30px;
          bottom: -20px;
          width: 126px;
          height: 102px;
        }
        .min_per {
          left: 100px;
          bottom: -30px;
        }
        .min_red_dia {
          right: 150px;
          width: 90px;
          height: 90px;
          bottom: -10px;
        }
        .min_dia {
          right: 30px;
          width: 140px;
          height: 110px;
          bottom: 0;
        }
        .shinning_img {
          position: absolute;
          animation: randomShining 3s 1s linear infinite;
        }
      }
    }
    .an_btn {
      margin: 40px 0 0 100px;
    }
  }
  @keyframes randomShining{
    0%{
      opacity: 1;
      transform: rotate(90deg) scale(.5);
    }
    20%{
      opacity: 0;
    }
    40%{
      opacity: 1;
      transform: rotate(180deg) scale(0.8);
    }
    60%{
      opacity: 0;
    }
    80%{
      opacity: 1;
      transform: rotate(90deg) scale(1);
    }
    100%{
      opacity: 0;
    }
  }
}
</style>
<style lang="less">
.anniversary2020_dialog {
  width: 619px !important;
  .anniversary2020_dialog_content {
    width: 100%;
    height: 528px;
    background:url("../../../assets/active/anniversary2020/apply_success_bg.png") no-repeat;
    padding-top: 1px;
    text-align: center;
    position: relative;
    &.sign {
      width: 591px;
      height: 528px;
      padding-left: 23px;
      background:url("../../../assets/active/anniversary2020/min_success_bg.png") no-repeat;
      .anniversary2020_dialog_h2 {
        margin-top: 160px;
      }
    }
    &.winprize {
      width: 700px;
      height: 560px;
      background:url("../../../assets/active/anniversary2020/winprize.png") no-repeat;
      .anniversary2020_dialog_h2 {
        margin-top: 200px;
      }
      .winprize_bouns {
        font-size: 80px;
        text-shadow: 0px 5px 0 #a51144;
        font-weight: bold;
        color: #fefa90;
        span {
          font-size: 40px;
        }
      }
    }
    .anniversary2020_dialog_close {
      position: absolute;
      right: 30px;
      top: 10px;
      width: 54px;
      height: 54px;
      background:url("../../../assets/active/anniversary2020/close.png") no-repeat;
      cursor: pointer;
      &:hover {
        background:url("../../../assets/active/anniversary2020/close_hover.png") no-repeat;
      }
    }
    .anniversary2020_dialog_h2 {
      font-size: 59px;
      color: #fefefe;
      margin-top:180px;
      text-shadow: 0 5px 0 #a51144;
      &.link {
        font-weight: bold;
        font-size: 40px;
        margin-top: -15px;
        display: inline-block;
        cursor: pointer;
        &:hover {
          color: #fd9310;
          &+.anniversary2020_dialog_line {
            background-image:none;
            background-color: #fd9310;
          }
        }
      }
    }
    .anniversary2020_dialog_detail {
      width: 510px;
      height: 151px;
      margin:-20px 0 0 50px;
      background:url("../../../assets/active/anniversary2020/dialog_textbg.png") no-repeat;
      font-size: 34px;
      color: #fefefe;
      text-align: center;
      line-height: 151px;
    }
    .anniversary2020_dialog_line{
      width: 260px;
      margin:0 auto;
      height: 3px;
      box-shadow: 0px 3px 2px 0 rgba(81, 0, 0, 0.65);
      background-image: linear-gradient(to top, rgba(209, 177, 102,0.8), rgba(251, 248, 205,0.8), rgba(211, 180, 106,0.8)), linear-gradient(to bottom, #aa3636, #aa3636);
    }
  }
}

</style>
