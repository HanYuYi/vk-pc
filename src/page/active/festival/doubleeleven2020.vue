<template>
 <div class="doubleeleven2020">
   <div class="banner">
     <img class="phone fadeInLeft" src="../../../assets/active/doubleeleven2020/phone2.png" alt="">
     <img class="diannao fadeInLeft" src="../../../assets/active/doubleeleven2020/diannao.png" alt="">
     <img class="erji fadeInRight" src="../../../assets/active/doubleeleven2020/erji.png" alt="">
     <img class="por fadeInRight" src="../../../assets/active/doubleeleven2020/por.png" alt="">
   </div>
   
   <img class="camera" src="../../../assets/active/doubleeleven2020/camera.png" alt="">
   <img class="phone1" src="../../../assets/active/doubleeleven2020/phone1.png" alt="">
  <div class="daizi_bg"></div>
   <!--领取-->
   <section class="main_con light_main_con" :class="{'aos-animate':animations.one}"  aos="fade-up">
    <h2 class="title1"></h2>
    <p class="time">活动时间：{{initInfo.active_show_time}}</p>
    <p class="des">活动期间，会员每日首存达到一定金额即可点亮VKGAME，领取对应的活动奖励!  </p>
    <div class="lights">
      <div class="small_loading" v-if="load"></div>
      <div v-else class="lights_con">
        <div class="light_item" v-for="(item,index) in initInfo.active_setting" :key="index"
        :class="{'disable':(isLogin&&item.status==1) || (isLogin&&item.status==3)}">
          <div class="tips" :style="{opacity:isLogin&&item.need_deposit?1:0}">
            <span>继续充值</span><br>
            <span>{{item.need_deposit}}</span><br>
            <span>即可领取</span>
          </div>
          <img class="type" :src="isLogin&&item.node_status==1?item.wordimg:item.wordimgnologin"> 
          <img class="status_img" :src="isLogin&&item.node_status==1?item.redimg:item.redimgnologin"> 
          <p class="bouns">{{item.bonus}}{{index>1?'元红包':'V币'}}</p>
          <div class="status_btn" @click="apply(item)">
            {{item.status ==1&&isLogin?'已领取':'领取奖励'}}
          </div>
          <p class="shouucn">首存{{item.first_deposit}}可领</p>
        </div>
        <div class="progress">
          <div class="progress_inner" :style="{width:isLogin?initInfo.progressw:'0'}" ></div>
        </div>
      </div>
    </div>
    <h3 class="rule_title">活动规则</h3>
    <div class="rule">
      1. VIP会员每日首存达到一定金额即可点亮VKGAME图标，领取对应的活动奖励。<br>       
      2. 会员每日充值在未发起提款前都视为首充。例如首笔充值100元，未申请提款前，继续充值900元，则累计充值为1000元。<br>                      
      3. 符合条件的会员需在当日领取活动奖励，活动奖励可多次领取，若会员当日未领取则视为自动放弃；已领取的活动彩金将自动派发至会员的主钱包中，活动彩金需完成全站一倍有效流水。<br>   
      4. 此活动不与【点金胜手】活动共享，二者只可选其一参与。<br>  
      5.电竞赔率＜1.45、亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、走盘、注单取消、对冲等情况都不算有效流水，PT电子游戏中以下游戏不计算为有效流水：<activeptliushui :color="'#ffd9a6'"></activeptliushui>。		 <br>  
      6. 每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能使用一个账号享受优惠。对违规的用户，VKGAME保留无限期审核， 和扣回红利及所产生的利润权利，本活动最终解释权归VKGAME所有。				
    </div>
   </section>
    <!--vb商城优惠-->
   <section class="main_con vb_main_con" :class="{'aos-animate':animations.two}" aos="fade-up">
     <div class="title_bg">
       <h2 class="title2"></h2>
       <p class="time">活动时间：{{initInfo.vb_show_time}}</p>
       <p class="des">活动期间V币商城全场商品限时大折扣，每日精选商品低至5折免费兑换!  </p>
     </div>
     <div class="carousel_box">
       <div class="con_r">
         <div @click="$router.push({ name: 'vbmarket', params: { curTypeId: 99999 }})" class="tovb">进入V币商城<span></span></div>
         <p class="meiri">每日一款惊喜好物等您兑换</p>
       </div>
       <div class="con_l">
         <div class="haowu"></div>
         <p class="product_name">{{curitem.name}}</p>
         <div class="bor discount">{{curitem.discount}}</div>
         <div class="bor vb">{{curitem.vb}}</div>
         <div class="bor lv">{{curitem.level}}<span class="addf">+</span>兑换等级</div>
       </div>
      <Carousel
        :arrow="setting.arrow"
        :height="setting.height"
        :autoplay="setting.autoplay"
        :trigger="setting.trigger"
        :interval="setting.interval"
        :indicator-position="setting.indicatorPosition" 
        @change ="carouselChange"
        class="doubleeleven2020_carousel">
        <CarouselItem v-for="(item,index) in vbSliders" :key="index">
            <img class="fl" :src="item.img" alt="">
        </CarouselItem>
      </Carousel>
     </div>
     <div class="lunbo">
       <div class="mask"></div>
       <div class="lunbo_box">
         <vue-seamless-scroll :data="gunData" :class-option="{direction: 3,step: 0.5}">
           <ul>
             <li  v-for="(item, index) in gunData" :key="index">
              <img :src="item.img" alt="">
              <p>{{item.name}}</p>
              <div class="dis" :class="{'dish':item.discount>=80}">
                <span>{{item.discount}}%</span><br>
                <span>折扣</span>
              </div>
             </li>
           </ul>
         </vue-seamless-scroll>
       </div>
     </div>
   </section>
   <router-link to="/active" class="goback"></router-link>
   <!--领取成功弹窗-->
   <el-dialog
     :custom-class="'pure_dialog'"
     :visible.sync="showRed"
     :show-close="false"
     :close-on-click-modal="false"
     :close-on-press-escape="false"
     :append-to-body="true" >
      <div class="doubleeleven2020_dialog" :class="{'vb_bg':moneytype==2}">
         <div class="close" @click="showRed=false"></div>
         <p class="hongxi">恭喜领取成功</p>
         <p class="yiban" v-show="moneytype==2">V币已自动派发到您的账户</p>
         <p class="yiban" v-show="moneytype==1">彩金已自动派发您的主钱包</p>
         <div class="btn" @click="showRed=false">朕知道了</div>
      </div>
   </el-dialog>
 </div>
</template>

<script>
import {Carousel,CarouselItem} from 'element-ui'
import { mapState } from 'vuex'
 
export default {
  name: "doubleeleven2020",
  components: {
    Carousel,
    CarouselItem,
  },
  data() {
    return {
      curitem:{},
      moneytype:2,
      showRed:false,
      animations: {
        one:false,
        two:false
      },
      setting: {
        autoplay: true,
        interval: 6000,
        trigger: 'click',
        arrow: 'never',
        height: '400px',
        indicatorPosition: 'inside'
      },
      vbSliders:[
        {name:"IPHONE12",discount:"50%折扣",vb:"945,000V币兑换",level:"VIP7",img:require("../../../assets/active/doubleeleven2020/haowu/1.png")},
        {name:"雷蛇猫耳粉晶耳机",discount:"50%折扣",vb:"124,350V币兑换",level:"VIP4",img:require("../../../assets/active/doubleeleven2020/haowu/2.png")},
        {name:"富士拍立得",discount:"50%折扣",vb:"74,850V币兑换",level:"VIP3",img:require("../../../assets/active/doubleeleven2020/haowu/3.png")},
        {name:"ikbc C87有线机械键盘",discount:"50%折扣",vb:"52200V币兑换",level:"VIP3",img:require("../../../assets/active/doubleeleven2020/haowu/4.png")},
        {name:"华为随身WiFi",discount:"50%折扣",vb:"44,850V币兑换",level:"VIP2",img:require("../../../assets/active/doubleeleven2020/haowu/5.png")},
        {name:"康佳涮烤一体锅",discount:"50%折扣",vb:"22,200V币兑换",level:"VIP2",img:require("../../../assets/active/doubleeleven2020/haowu/6.png")},
        {name:"李宁CBA联赛专用球",discount:"50%折扣",vb:"11,850V币兑换",level:"VIP1",img:require("../../../assets/active/doubleeleven2020/haowu/7.png")},
      ],
      gunData:[
        {discount:70,name:"LOL周边源计划背包",img:require("../../../assets/active/doubleeleven2020/gundong/1.png")},
        {discount:80,name:"苏泊尔智能保温杯",img:require("../../../assets/active/doubleeleven2020/gundong/2.png")},
        {discount:80,name:"卡西欧（CASIO）手表",img:require("../../../assets/active/doubleeleven2020/gundong/3.png")},
        {discount:70,name:"AirPods Pro ",img:require("../../../assets/active/doubleeleven2020/gundong/4.png")},
        {discount:70,name:" 90分拉杆行李箱",img:require("../../../assets/active/doubleeleven2020/gundong/5.png")},
        {discount:80,name:"斯伯丁小篮板",img:require("../../../assets/active/doubleeleven2020/gundong/6.png")},
        {discount:90,name:"联想轻薄笔记本电脑",img:require("../../../assets/active/doubleeleven2020/gundong/7.png")},
        {discount:80,name:"南极人自动足浴盆",img:require("../../../assets/active/doubleeleven2020/gundong/8.png")},
        {discount:80,name:"微影迷你全高清投影仪",img:require("../../../assets/active/doubleeleven2020/gundong/9.png")},
        {discount:80,name:"宝格丽男士淡香水30ml",img:require("../../../assets/active/doubleeleven2020/gundong/10.png")},
        {discount:80,name:"小度智能音箱",img:require("../../../assets/active/doubleeleven2020/gundong/11.png")},
        {discount:90,name:"野格 洋酒德国原装酒",img:require("../../../assets/active/doubleeleven2020/gundong/12.png")},
        {discount:80,name:"TOM尤克里里",img:require("../../../assets/active/doubleeleven2020/gundong/13.png")},
      ],
      load:true,
      initInfo:{},
      ajaxload:false,
      prowdata:["6%","23%","41%","58.5%","76.5%","100%"]
    };
  },
  computed: {
    ...mapState(["isLogin"]),
  },
  mounted() {
    this.getInit(true)
    setTimeout(() => {
      this.animations.one = true
    }, 500);
    this.curitem = this.vbSliders[0]
    window.addEventListener('scroll', this.aninScroll,false)
  },
  destroyed () {
    window.removeEventListener('scroll', this.aninScroll)
  },
  methods: {
    carouselChange(index) {
      this.curitem = this.vbSliders[index]
    },
    aninScroll() {
      let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      this.animations.two= scrollTop>=600?true:false;
    },
    getInit(bool) {
      if(bool) {
        this.load = true
      }
      this.$http(this.ApiSetting.active.getDouble11Day2020Init)
      .then(res => {
        this.load = false
        if(res.status == 1 && res.data) {
          this.initInfo = res.data;
          this.initInfo.progressw = 0
          this.initInfo.active_setting.forEach((item,index) => {
            // if(this.isLogin && item.node_status==1) {
              item.wordimg = require("../../../assets/active/doubleeleven2020/word/"+ item.type +"_l.png")
              item.redimg = require("../../../assets/active/doubleeleven2020/word/"+ item.type +"_b.png")
            // }else {
              item.wordimgnologin = require("../../../assets/active/doubleeleven2020/word/"+ item.type +".png")
              item.redimgnologin  = require("../../../assets/active/doubleeleven2020/word/"+ item.type +"_normal.png")
            // }
            if(this.isLogin &&item.node_status) {
              this.initInfo.progressw = this.prowdata[index]
            }
          })
        }
      })
      .catch(()=>{
        this.load = false
      })
    },
    apply(item) {
      if(!this.isLogin) {
        this.$message({
          message: '请先登录',
          type: "warning"
        });
        return
      }
      if(item.status==1||item.status==3||this.ajaxload) {
        return
      }
      if(item.type=="V" || item.type=="K") {
        this.moneytype = 2
      }else {
        this.moneytype = 1
      }
      if(item.status == 0) {
        this.ajaxload = true
        this.$http(this.ApiSetting.active.joinDouble11Day2020,{type:item.type})
        .then(res => {
          this.ajaxload = false
          if(res.status == 1 && res.data) {
            item.status =1
            this.$forceUpdate()
            this.showRed = true
          }
        })
        .catch(()=>{
          this.ajaxload = false
        })
      }else if(item.status_tips){
        this.$message({
          message: item.status_tips,
          type: "warning"
        });
      }
    }
  }
};
</script>

<style scoped lang="less">
.doubleeleven2020 {
  background:url("../../../assets/active/doubleeleven2020/bgbottom.png") no-repeat center bottom;
  position: relative;
  padding-bottom: 55px;
  padding-top: 1069px;
  .banner {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width:1920px;
    margin:0 auto;
    height:1069px;
    background:url("../../../assets/active/doubleeleven2020/banner.jpg") no-repeat;
    img {
      animation-duration: 800ms;
    }
  }
  .phone {
    position: absolute;
    top: 50px;
    left: 22%;
  }
  .diannao {
    position: absolute;
    top: 300px;
    left: 15%;
  }
  .erji {
    position: absolute;
    top: 280px;
    right: 20%;
  }
  .por {
    position: absolute;
    top: 74px;
    right: 22%;
  }
  .camera {
    position: absolute;
    top: 870px;
    right: 2%;
  }
  .phone1 {
    position: absolute;
    left: 5%;
    bottom:200px
  }
  .daizi_bg {
    position: absolute;
    top: 1000px;
    pointer-events: none;
    left: 50%;
    transform: translateX(-50%);
    width:1920px;
    height: 1513px;
    background:url("../../../assets/active/doubleeleven2020/caidai.png") no-repeat;
  }
  .main_con {
    width:1200px;
    padding-top: 1px;
    position: relative;
    z-index: 5;
    .title1 {
      width:334px;
      height: 44px;
      margin: 42px auto 0;
      background:url("../../../assets/active/doubleeleven2020/title1.png") no-repeat;
    }
    .time {
      margin-top: 15px;
      text-align: center;
      font-size: 16px;
      color: #ffe2c1;
    }
    .des {
      margin-top: 63px;
      font-size: 18px;
      color: #ffe2c1;
      text-align: center;
    }
  }
  .light_main_con {
    margin: -660px auto 0;
    height: 968px;
    background:url("../../../assets/active/doubleeleven2020/con_bg.png") no-repeat;
    .lights_con {
      position: relative;
    }
    .lights {
      width: 1060px;
      height: 330px;
      margin: 14px auto 0;
      position: relative;
      .small_loading {
        display: block;
        margin: 150px auto;
        transform: scale(1.5);
      }
      .progress {
        width: 1000px;
        height: 10px;
        box-shadow: inset -0.6px 2.9px 5px 0 rgba(0, 0, 0, 0.35);
        background-color: #5f060a;
        position:absolute;
        top: 160px;
        left: 50%;
        transform: translateX(-50%);
        border-radius:5px;
        .progress_inner {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 0;
          border-radius:5px;
          height: 4px;
          background-color: #ffffff;
          box-shadow: 2px 2px 10px #ffcf3b,-2px -2px 10px #ffcf3b;
        }
      }
      .light_item {
        width: 158px;
        float: left;
        margin-left: -60px;;
        margin-right: 76px;
        text-align: center;
        position: relative;
        &:first-child {
          margin-left: 10px;
        }
        &:nth-child(6) {
          margin-right: 0;
        }
        .tips {
          width: 74px;
          height: 66px;
          background:url("../../../assets/active/doubleeleven2020/tips_bor.png") no-repeat;
          font-size: 12px;
          color: #f3d1b3;
          box-sizing: border-box;
          padding-top: 3px;
          display: inline-block;
          margin-top: 20px;
        }
        .type {
          margin-top: -48px;
        }
        .status_img {
          margin-top: -30px;
        }
        .bouns {
          margin-top: -20px;
          font-weight:bold;
          font-size: 16px;
          color: #ffe2c1;
        }
        .status_btn {
          margin: 10px auto 0;
          width: 100px;
          height: 28px;
          line-height: 28px;
          font-weight:bold;
          font-size: 16px;
          text-align: center;
          border-radius: 13.5px;
          background-image: linear-gradient(to top, rgba(244, 70, 70,1), rgba(223, 43, 48,1));
          color: #ffffff;
          cursor: pointer;
        }
        .shouucn {
          text-align: center;
          margin-top: 9px;
          font-size: 12px;
          color: #df2c30;
        }
        &.disable {
          .status_btn {
            cursor: default;
            background-image: linear-gradient(to top, rgba(244, 70, 70,0.5), rgba(223, 43, 48,0.5));
            color: rgba(255, 255, 255,0.6);
          }
        }
      }
     
    }
    .rule_title {
      margin-top: 35px;
      font-size:22px;
      text-align: center;
      color:#ffe2c1;
    }
    .rule {
      width: 1072px;
      margin: 10px auto 0;
      height: 270px;
      border-radius: 52px;
      border: solid 5px #ffd9a6;
      padding: 18px 45px;
      box-sizing: border-box;
      font-size: 16px;
      text-align: justify;
      color:#fff;
      line-height: 1.6;
    }
  }
  .vb_main_con {
    margin: 43px auto 0;
    .title2 {
      width:329px;
      height: 43px;
      margin: 42px auto 0;
      background:url("../../../assets/active/doubleeleven2020/title2.png") no-repeat;
    }
    .title_bg {
      overflow: hidden;
      width:1200px;
      height: 224px;
      background:url("../../../assets/active/doubleeleven2020/title_bg.png") no-repeat;
    }
    .carousel_box{
      width: 100%;
      height: 400px;
      color: #ffe2c1;
      position: relative;
      .con_r {
        right: 210px;
        top: 140px;
        position: absolute;
      }
      .tovb {
        display: block;
        width: 188px;
        height: 46px;
        line-height: 46px;
        border-radius: 22.5px;
        background-image: linear-gradient(to right, #f44646, #df2b30);
        text-align: center;
        font-size: 22px;
        cursor: pointer;
        &:hover {
          opacity: 0.9;
        }
        span {
          display: inline-block;
          margin-left: 6px;
          vertical-align: middle;
          width: 22px; 
          height: 22px;
          background:url("../../../assets/active/doubleeleven2020/arrow.png") no-repeat;
        }
      }
      .meiri {
        margin-top: 5px;
        font-size: 14px;
        text-align: center;
      }
      .con_l {
        left: 270px;
        top: 40px;
        position: absolute;
      }
      .haowu {
        width:137px;
        height: 38px;
        background:url("../../../assets/active/doubleeleven2020/vb_haowu.png") no-repeat;
      }
      .product_name {
        font-size: 16px;
      }
      .bor {
        margin-top: 17px;
        width:151px;
        height: 42px;
        line-height: 37px;
        background:url("../../../assets/active/doubleeleven2020/vb_bor_normal.png") no-repeat;
        box-sizing: border-box;
        font-size: 16px;
        &.discount {
          background:url("../../../assets/active/doubleeleven2020/vb_bor_hover.png") no-repeat;
          padding-left: 22px;
          font-size: 24px;
        }
        &.vb {
          padding-left: 12px;
        }
        &.lv {
          padding-left: 17px;
          line-height:30px;
        }
        .addf {
          vertical-align: super;
        }
      }
      img {
        width: 350px;
        height: 400px;
      }
    }
    .doubleeleven2020_carousel {
      width: 350px;
      margin:0 auto;
      color: #ffe2c1;
      position: relative;
      z-index: 10;
      overflow: hidden;
    }
    .lunbo_box {
      width: 100%;
      height: 100%;
      overflow: hidden;
      ul {
        display: flex;
      }
    }
    .lunbo {
      width: 100%;
      height: 200px;
      background-color: #8b0206;
      position: relative;
      margin-top: 80px;
      .mask {
        position: absolute;
        z-index: 5;
        top: -190px;
        left: 0;
        width: 1200px;
        height: 462px;
        background:url("../../../assets/active/doubleeleven2020/lunbo_bg.png") no-repeat;
        pointer-events: none;
      }
      li {
        float: left;
        width: 183px;
        height:160px ;
        background:url("../../../assets/active/doubleeleven2020/border.png") no-repeat center top;
        position: relative;
        text-align: center;
        margin-top: 24px;
        padding-top: 1px;
        .dis {
          position: absolute;
          top: 2px;
          left: 26px;
          width: 32px;
          height: 54px;
          background:url("../../../assets/active/doubleeleven2020/dis.png") no-repeat center center;
          text-align: center;
          box-sizing: border-box;
          padding-top: 6px;
          color: #262933;
          font-weight:bold;
          &.dish {
            background:url("../../../assets/active/doubleeleven2020/dish.png") no-repeat center center;
          }
        }
        p {
          font-size: 12px;
          color: #fcf9f7;
        }
      }
    }
  }
  .yellow {
    color: #ffd9a6;
    text-decoration: underline;
  }

  .goback {
    display: block;
    margin:120px auto 0;
    width: 246px;
    height: 58px;
    background:url("../../../assets/active/doubleeleven2020/back_n.png") no-repeat ;
    transition:background 0.2s;
    &:hover {
      background:url("../../../assets/active/doubleeleven2020/back_h.png") no-repeat ;
    }
  }
}
</style>
<style lang="less">
.doubleeleven2020_carousel {
  .el-carousel__item {
    width: 350px !important;
    height: 400px !important;
    opacity: 0;
    &.el-carousel__item.is-animating {
      transition: opacity 1s ease-in-out;
    }
    &.is-active {
      opacity: 1;
    }
  }
  .el-carousel__indicators {
    bottom: 35px;
  }
  .el-carousel__indicator {
    padding: 0;
    width: 11px;
    height: 11px;
    border-radius:50%;
    background-color: rgba(255, 217, 166,0.5);
    margin-right: 13px;
    &:last-child {
      margin-right: 0;
    }
    &.is-active {
      background-color: rgba(255, 217, 166,0.8);
    }
  }
  .el-carousel__button {
    display: none;
  }
}
</style>
<style lang="less">
.doubleeleven2020_dialog {
  width: 610px;
  margin:0 auto;
  height: 686px;
  background:url("../../../assets/active/doubleeleven2020/dialog_bg.png") no-repeat;
  position: relative;
  overflow: hidden;
  &.vb_bg {
    background:url("../../../assets/active/doubleeleven2020/dialog_bgvb.png") no-repeat;
  }
  .hongxi {
    margin-top: 340px;
    text-align: center;
    font-size: 42px;
    color: #fff6d9;
  }
  .yiban {
    margin-top: 10px;
    text-align: center;
    font-size: 30.5px;
    color: #fff6d9;
  }
  .btn {
    width: 179px;
    margin:40px auto;
    height: 52px;
    line-height: 25px;
    background:url("../../../assets/active/doubleeleven2020/dialog_btn.png") no-repeat;
    cursor: pointer;
    font-size: 25px;
    color: #c74234;
    &:hover {
      opacity: 0.9;
    }
  }
  .close {
    position: absolute;
    left: 50%;
    bottom:0;
    transform: translateX(-50%);
    width: 44px;
    height: 44px;
    background:url("../../../assets/active/doubleeleven2020/dialogx_n.png") no-repeat;
    cursor: pointer;
    &:hover {
      background:url("../../../assets/active/doubleeleven2020/dialogx_h.png") no-repeat;
    }
  }
}
</style>
