<template>
  <div class="active_page national">

    <!-- 红包雨倒计时-->
    <div class="bg_top">
      <div class="title">
        <p>最近一场红包雨倒计时</p>
        <p><span>每日红包雨时间</span>{{initInfo.open_times[0]}}/{{initInfo.open_times[1]}}</p>
      </div>
      <div class="countdown">
        <span>{{down.split(':')[0][0]}}</span>
        <span>{{down.split(':')[0][1]}}</span>:
        <span>{{down.split(':')[1][0]}}</span>
        <span>{{down.split(':')[1][1]}}</span>:
        <span>{{down.split(':')[2][0]}}</span>
        <span>{{down.split(':')[2][1]}}</span>
      </div>
    </div>

    <div class="content">
      <div class="section-1">
        <p class="section-title">活动时间</p>
        <p class="section-notice">{{initInfo.active_show_time}}</p>
        <p class="section-title">活动内容</p>
        <p class="section-notice">活动期间，会员每日完成首充≥100元，即可参与国庆红包雨活动，每天两场红包雨，最高可获<b>3888</b>元现金奖！</p>
      </div>

      <div class="section-2">
        <!-- 红包展示面板-->
        <div class="left">
          <div v-for="(item,index) in redNum" :key="index" class="red-item">
            <p class="money">{{item}}</p>
          </div>
        </div>

        <!-- 中奖名单-->
        <div class="right">
          <p class="section-title">中奖名单</p>
          <p class="no_data" v-show="initInfo.win_list&&!initInfo.win_list.length">暂无数据</p>
          <vue-seamless-scroll
            class="national_history_scroll"
            :data="initInfo.win_list"
            :class-option="optionSingleHeightTime" >
            <ul>
              <li  class="hist_li" v-for="(item,index) in initInfo.win_list" :key="index">
                <img :src="item.head_image" onerror="this.src='/pc_static/defaultimg/headimg.png'"/>
                <span class="ellips">{{item.username}}</span>
                <span class="ellips">{{item.bonus.replace("元", "")}}</span>
                <span>元</span>
              </li>
            </ul>
          </vue-seamless-scroll>
        </div>
      </div>

      <!--活动规则-->
      <div class="section-3">
        <p class="section-title">活动规则</p>
        <ol type="1">
          <li>每日会员需在红包雨开始时间前，完成首充金额≥100元，即可参与活动；此活动首充定义为：每日未提款前的累计有效存款都视为首充。例如：会员A当日在12:00前完成首充，即可参与两场红包雨，若会员当日在18:30完成首充，仅可参与一场红包雨。</li>
          <li>每场红包雨持续时间为十分钟，若会员未在规定时间内参与视为自动放弃，会员所获得的红包需完成全站1倍有效流水。</li>
          <li>有效流水要求：电竞赔率＜1.5、亚洲盘赔率≤0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水；PT电子游戏中以下游戏不算有效流水：<activeptliushui :color="'#5e0000'" styleClass="bb1500" :styleObj="{textDecoration:'underline'}"></activeptliushui>。</li>
          <li>每位有效玩家、每个手机号码、电子邮箱、IP地址、每张银行卡、每台设备只能享受一次优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利；VKGAME对本活动保有最终解释权。</li>
        </ol>
      </div>

    </div>

    <router-link to="/active" class="back">返回活动首页</router-link>

    <!--红包雨-->
    <div id="redRain" class="red-rain"  v-show="redrainShow"></div>

    <el-dialog
    :visible.sync="openShow"
    custom-class="pure_dialog national_opening"
    :append-to-body="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :fullscreen="true">
      <div class="close" @click="openShow=false"></div>
      <p class="t1">{{ gotprize }}<span>元</span></p>
      <p class="t2">恭喜获得</p>
      <p class="t3">{{ gotprize }}元红包</p>
    </el-dialog>
  </div>
</template>

<script>
import {formatCountTime} from '@/utils/util'
import { mapState } from 'vuex'
export default {
  name: "nationalDay",
  data() {
    return {
      openShow:false,
      redNum:["3,888.00","1,888.00","888.00","388.00","188.00","88.00","18.00","8.80","5.80","3.80"],
      initInfo:{
        open_times:[]
      },
      redrainShow:false,
      down:"--:--:--",
      downTimer:null,
      musicShow:false,
      ajaxload:false,
      gotprize:""
    };
  },
  computed: {
    ...mapState(["isLogin"]),
    optionSingleHeightTime() {
      return {
        limitMoveNum:6,
        step:0.3,
      }
    }
  },
  watch: {
    isLogin(val) {
      if(!val) {
        this.getInit()
      }
    }
  },
  mounted() {
    this.getInit()
    this.getCountTime()
  },
  beforeRouteLeave (to, from, next) {
    this.rainHandler(2)
    next()
  },
  methods: {
    // 红包雨执行器
    rainHandler(type) {
      if (type === 1) {
        this.startsNow(15)
        this.redrainShow = true
      }
      if (type === 2) {
        this.redrainShow = false
        const container = document.getElementById("redRain")
        for (let i = container.childNodes.length - 1;i >= 0;i--) {
          container.removeChild(container.childNodes[i])
        }
      }
    },
    //开红包
    getRed() {
      if (!this.isLogin) {
        this.$message({ message: "请先登录", type: "warning" })
        return
      }

      if (this.ajaxload) {
        return
      }
      this.ajaxload = true
      this.$http(this.ApiSetting.active.joinMayDay)
      .then(res => {
        console.info('国庆节活动-开红包响应：', res)
        this.ajaxload = false
        if (res.status === 1 && res.data) {
          this.gotprize = res.data.item_name
          this.initInfo.status_tips = res.data.show_tips
          this.openShow = true
          this.rainHandler(2)
        }
      })
      .catch(() => {
        this.ajaxload = false
      })
    },
    //红包雨
    startsNow(num) {
      var w = window.innerWidth - 112, h = window.innerHeight,
          container = document.getElementById("redRain"),
          sizes = ["Small", "Medium", "Large"],
          types = ["round"],
          snowflakes = num,
          sinw = w/snowflakes;

      for (var i = 0; i < snowflakes; i++) {
          var snowflakeDiv = document.createElement('div');
          var sizeIndex = Math.ceil(Math.random() * 3) -1; //get random number between 0 and 2
          var size = sizes[sizeIndex]; //get random size
          var type = types[0];
          TweenMax.set(snowflakeDiv, {attr: {class: type + size}, x: i*sinw+50 , y: R(-300,-258) });
          snowflakeDiv.onclick = () => {
            this.getRed()
          }
          container.appendChild(snowflakeDiv);
          snowing(snowflakeDiv);
      }

      function snowing(element) {
         TweenMax.to(element, R(8,18), {y: h+100, ease: Linear.easeNone, repeat:-1, delay: -15});
        //  TweenMax.to(element, R(4,8), {x: '+=100', repeat: -1, yoyo: true, ease: Sine.easeInOut});
         TweenMax.to(element, R(5,10), {rotation: R(0,0),repeat: -1, yoyo: true, ease:Sine.easeInOut, delay: -5});
      }

      function R(min,max) {
        return min + Math.random() * (max-min)
      }
    },
    //初始化
    getInit() {
      this.ajaxload = true
      this.$http(this.ApiSetting.active.getMayDayInit)
      .then(res => {
        console.info('国庆节活动-初始化：', res)
        this.ajaxload = false
        if(res.status === 1 && res.data) {
          this.initInfo = res.data
          if(this.initInfo.is_rain) {
            this.rainHandler(1)
            setTimeout(() => {
              this.rainHandler(2)
              setTimeout(() => {
                this.getInit()
              }, 1000);
            }, this.initInfo.rain_time * 1000);
          }
        }
      })
      .catch(()=>{
        this.ajaxload = false
      })
    },
    // 倒计时
    getCountTime() {
      this.$http(this.ApiSetting.active.getMayDayPopup)
      .then(res => {
        console.info('国庆节活动-倒计时：', res)
        if (res.status === 1 && res.data) {
          let countTime = res.data.countdown_time
          clearInterval(this.downTimer)
          if (countTime) {
            this.down = formatCountTime(countTime)
            this.downTimer = setInterval(() => {
              if(countTime) {
                countTime--
                this.down = formatCountTime(countTime)
              } else {
                this.getInit()
                clearInterval(this.downTimer)
                this.getCountTime()
              }
            },1000)
          } else {
            this.down = '--:--:--'
          }
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.national {
  background: url("../../../assets/active/redrain/banner.jpg") no-repeat center top;
  position: relative;
  padding: 665px 0 1px;
  overflow-x: hidden;
  * {
    box-sizing: border-box;
  }
  * + * {
    box-sizing: border-box;
  }
  .bg_top {
    position: absolute;
    top: 526px;
    left: 50%;
    transform: translateX(-50%);
    width: 782px;
    height: 114px;
    background: url("../../../assets/active/redrain/countdown.png");
    z-index: 1;
    pointer-events: none;
    display: flex;
    justify-content: center;
    .title {
      margin-top: 30px;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      height: 54px;
      p:first-child {
        font-size: 29.5px;
        font-weight: bold;
        color: #fef3d0;
      }
      p:last-child {
        font-size: 22px;
        font-weight: bold;
        color: #fff8d5;
        span {
          vertical-align: top;
          color: #fff;
          font-size: 20px;
          font-weight: normal;
          margin-right: 6px;
        }
      }
    }
    .countdown {
      margin-top: 30px;
      margin-left: 7px;
      width: 320px;
      height: 54px;
      display: flex;
      justify-content: space-between;
      font-size: 30px;
      text-shadow: 0 2px 2px rgba(97, 62, 9, 0.41);
      color: #f4dab7;
      font-weight: bold;
      line-height: 44px;
      span {
        display: block;
        width: 44px;
        height: 54px;
        line-height: 54px;
        font-size: 37.5px;
        color: #c93234;
        text-align: center;
        border-radius: 10px;
        text-shadow: none;
        box-shadow: 0 2px 2px 0 rgba(97, 62, 9, 0.41);
        background: url("../../../assets/active/redrain/time_bg.png");
      }
    }
  }

  .content {
    position: relative;
    z-index: 1;
    width: 1300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    .section-1 {
      width: 1240px;
      height: 276px;
      background: url("../../../assets/active/redrain/section_1.png");
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .section-title {
      width: 180px;
      height: 28px;
      margin-top: 40px;
      font-size: 30px;
      font-weight: bold;
      text-align: center;
      line-height: 28px;
      color: #c93234;
      position: relative;
      &:before, &:after {
        position: absolute;
        content: "";
        width: 14px;
        height: 14px;
        top: 7px;
        background: url("../../../assets/active/redrain/title_icon.png");
      }
      &:before {
        left: 0;
      }
      &:after {
        right: 0;
      }
    }
    .section-notice {
      margin-top: 22px;
      font-size: 14px;
      line-height: 14px;
      color: #c93234;
      b {
        font-size: 18px;
      }
    }
    .section-2 {
      width: 1240px;
      height: 500px;
      margin-top: 62px;
      display: flex;
      justify-content: space-between;
      .left {
        width: 852px;
        height: 498px;
        background: url("../../../assets/active/redrain/section_2_left.png");
        padding: 70px 47px;
        display: flex;
        justify-content: space-between;
        align-content: space-between;
        flex-wrap: wrap;
        .red-item {
          width: 134px;
          height: 169px;
          background: url("../../../assets/active/redrain/red.png");
        }
        .money {
          font-size: 28px;
          line-height: 28px;
          font-weight: bold;
          color: #fde7c7;
          text-align: center;
          margin-top: 109px;
        }
      }
      .right {
        width: 358px;
        height: 498px;
        background: url("../../../assets/active/redrain/section_2_right.png");
        display: flex;
        flex-direction: column;
        align-items: center;
        .national_history_scroll {
          width: 300px;
          height: 350px;
          margin-top: 30px;
          overflow: hidden;
          .hist_li {
            width: 300px;
            height: 60px;
            display: flex;
            align-items: center;
            img {
              width: 50px;
              height: 50px;
              border: solid 2px #fbf0ce;
              box-sizing: border-box;
              border-radius: 50%;
              margin-right: 24px;
            }
            span:nth-child(2) {
              display: inline-block;
              width: 100px;
              text-overflow: ellipsis;
            }
            span:nth-child(2),span:nth-child(4) {
              font-size: 14px;
              color: #c93234
            }
            span:nth-child(3) {
              font-size: 18px;
              color: #c93234;
              font-weight: bold;
              flex: 1;
              text-align: right;
            }
          }
        }
        .no_data {
          color: #c93234;
          font-size: 14px;
          margin-top: 150px
        }
      }
    }
    .section-3 {
      width: 1240px;
      height: 370px;
      margin-top: 60px;
      background:  url("../../../assets/active/redrain/section_3.png");
      display: flex;
      flex-direction: column;
      align-items: center;
      ol {
        width: 750px;
        font-size: 14px;
        color: #c93234
      }
      li {
        list-style: decimal;
        margin-top: 20px
      }
    }
  }

  .back {
    position: relative;
    z-index: 1;
    width: 259px;
    height: 50px;
    background: url("../../../assets/active/redrain/back.png") no-repeat center top;
    text-align: center;
    font-size: 18px;
    color: #c93234;
    line-height: 50px;
    display: block;
    margin: 50px auto;
    cursor: pointer;
    &:hover {
      background: url("../../../assets/active/redrain/back_hover.png") no-repeat center top;
    }
  }
}
</style>
<style lang="less">
.national_opening {
  width: 598px;
  height: 550px;
  margin: 15vh auto;
  background: url("../../../assets/active/redrain/dialog.png");
  //overflow: hidden;
  position: relative;
  box-shadow: none;
  .close {
    position: absolute;
    bottom: -102px;
    left: 50%;
    transform: translateX(-50%);
    width: 32px;
    height: 32px;
    background: url("../../../assets/active/redrain/close.png");
    cursor: pointer;
    &:hover {
      background: url("../../../assets/active/redrain/close_pressed.png");
    }
  }
  .t1 {
    margin-top: 78px;
    font-size: 49px;
    font-weight: bold;
    color: #f8382f;
    text-align: center;
    span {
      font-size: 34px;
    }
  }
  .t2 {
    font-size: 28px;
    color: #fbdfbd;
    font-weight: bold;
    margin-top: 221px;
    text-align: center;
    line-height: 28px;
  }
  .t3 {
    font-size: 28.5px;
    color: #fbdfbd;
    text-align: center;
    margin-top: 27px;
  }
}
.red-rain {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  pointer-events: none;
  .roundSmall,
  .roundMedium,
  .roundLarge {
      background: url("../../../assets/active/redrain/red.png") no-repeat !important;
      background-size: 100% 100%!important;
      position: absolute;
      width: 225.6px;
      height: 300px;
      border-radius: 0%!important;
      cursor: pointer;
      pointer-events: all;
  }
  .roundMedium {
      width: 169.2px;
      height: 225px;
      background-size: 100% 100% !important;;
  }
  .roundSmall {
    width: 112.8px;
    height: 149.6px;
    background-size: 100% 100% !important;;
  }
}

  .bb1500.el-popper {
    border-color: #bb1500;
    th {
      color: #bb1500!important;;
    }
  }
  .bb1500.el-popper[x-placement^=bottom] .popper__arrow {
    border-bottom-color: #bb1500!important;
  }
  .bb1500.el-popper[x-placement^=right] .popper__arrow {
    border-right-color: #bb1500!important;
  }
  .bb1500.el-popper[x-placement^=left] .popper__arrow {
    border-left-color: #bb1500!important;
  }
  .bb1500.el-popper[x-placement^=top] .popper__arrow {
    border-top-color: #bb1500!important;
  }
</style>
