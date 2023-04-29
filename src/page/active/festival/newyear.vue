<template>
   <div class="newyear active_page">
     <div class="bgtit"></div>
     <div class="active_time">
       活动时间：{{startTime}}-{{endTime}}
     </div>
     <div class="tree" >
       <div class="tree_top" :class="{'tree_shake':isShake}"></div>
     </div>
     <div class="cloud"></div>
     <div class="nop shake" >
       <div class="circleChart" :class="{'notimes':!totle_times|| !percent}">
         <i-circle
            v-if="totle_times&&percent"
            :percent="percent"
            :size="224"
            :stroke-color="'#c5030a'"
            :trail-color="'#f1fbac'"
             >
          </i-circle>
         <img class="shake-btn" :class="{'cursor_default':isShake}" @click="shakeTree()" src="../../../assets/active/newyear/shake-btn.png" alt="">
       </div>
       <p v-show="isLogin">还有{{left_times}}次机会</p>
     </div>
     <div class="nop records">
       <h3>我的红包</h3>
        <transition-group name="notice_list"  class="records_list" tag="ul" v-if="isLogin" v-show="recordsList.length">
           <li class="" v-for="record in recordsList" :key="record.uuid">
             <span class="fl">{{record.reward}} </span>
             <span class="fr">{{record.finish_time}}</span>
           </li>
        </transition-group>
        <span v-else class="no_login" v-show="!initload">还未登录</span>
        <span v-show="!recordsList.length&&isLogin" class="no_login">暂无数据</span>
     </div>
     <div class="rule rule_content">
       <h3>活动内容</h3>
       <p>
         1. 玩家每日首充达到100元即可获得首次“金鼠贺岁”红包的“摇一摇”机会，领取相应红包； 首充每再累计满500即可再获得一次红包的“摇一摇”机会。例如：玩家A当日首充100元，获得“金鼠贺岁”红包的“摇一摇”机会；未发起提款前，再次充值500，即可再获得红包的“摇一摇”机会。<br>
         2. 每位玩家每日最多可获得20次“摇一摇”机会，若机会当日未使用，则隔日累计无效。
       </p>
       <p>3. 每日首充金额越大，“摇”得大额红包的概率越高，红包奖金无需流水。  <router-link to="/user/finance/" class="chongzhi">立即充值</router-link> </p>
     </div>
     <div class="rule rule_rule">
       <h3>活动规则</h3>
       <p>
         1.玩家每日充值在未发起提款前都视为首充，例如首笔充值100元，未申请提款前，继续充值500元，则累计首充为600元。<br>
         2.每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能参与一次优惠，参与用户必须先绑定银行卡。对违规的用户，VKGAME保留无期限审核，和扣回红利及产生的利润权利。本活动最终解释权归VKGAME所有。
       </p>
     </div>
     <!--红包弹窗-->
    <el-dialog
      :custom-class="'birth_prize_dialog'"
      :visible.sync="showRed"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :append-to-body="true" >
       <div class="newyear_redPack">
          <div v-show="!isOpenRed" class="no_open" :class="{'shake_ani':shakered}">
            <div @click="openRed()" class="no_open_btn"></div>
          </div>
          <div v-show="isOpenRed" class="open">
            <span class="words" v-for="word in words" :key="word">{{word}}</span>
            <div class="money">
              <span><i class="yuan">￥</i>{{reward}}</span>
            </div>
            <span class="shengyu" v-show="(totle_times-left_times)!==20">(今日还剩{{(20 - (totle_times-left_times))}}次机会)</span>
            <i @click="closeRed()" class="close"></i>
          </div>
       </div>
    </el-dialog>
   </div>
</template>

<script>
import { formatDate } from '@/utils/util'
export default {
  name: "newyear",
  data() {
    return {
      recordsList:[],
      terval:null,
      showRed:false,
      isShake:false,
      isOpenRed:false,
      startTime:'',
      endTime:'',
      isLogin:false,
      left_times:0,
      reward:0,
      words:[],
      percent:0,
      totle_times:0,
      shakered:false,
      initload:false,
      recordload:false,
      opentime:null,
      shaketime:null
    };
  },
  mounted() {
    this.getNewYearInit();
    this.getHistoryRecord();
  },
  methods: {
    closeRed() {
      this.showRed=false
      this.words = []
    },
    getNewYearInit(){
      this.initload = true
      this.$http(this.ApiSetting.active.getNewYearInit)
      .then(res => {
        this.initload = false
        if(res.status == 1 && res.data) {
          this.isLogin = res.data.is_login;
          this.startTime = formatDate(res.data.active_start_time*1000,'yyyy年MM月dd日')
          this.endTime = formatDate(res.data.active_end_time*1000,'yyyy年MM月dd日')
          this.left_times = res.data.left_times;
          this.totle_times = res.data.totle_times;
          if(this.totle_times) {
            this.percent = parseInt(((this.totle_times - this.left_times)/this.totle_times)*100);
          }
        }else {
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      })
    },
    getHistoryRecord() {
      if(this.recordload) {
        return
      }
      this.recordload = true
      this.$http(this.ApiSetting.active.getHistoryRecord)
      .then(res => {
        this.recordload = false
        if(res.status == 1 && res.data) {
          if(res.data.record_list && res.data.record_list.length!=this.recordsList.length) {
            let tarr = res.data.record_list.slice(0,res.data.record_list.length - this.recordsList.length)
            tarr.forEach((item,index) => {
              item.uuid = this.guid()
              this.recordsList.push(item);
            })
          }else if(res.data.record_list){
            this.recordsList = res.data.record_list;
            this.recordsList.forEach(item => {
              item.uuid = this.guid()
            })
          }
          clearInterval(this.terval);
          if(this.recordsList.length>9) {
            this.terval = setInterval(() => {
              let tob = this.recordsList.shift();
              tob.uuid = this.guid()
            this.recordsList.push(tob)
            }, 4000);
          }
        }else {
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      })
    },
    openRed() {
      this.shakered = true;
      if(!this.opentime) {
        this.opentime = setTimeout(() => {
          this.shakered = false
          this.isOpenRed = true;
          this.opentime = null
          this.getHistoryRecord();
        }, 1000);
      }

    },
    shakeTree() {
      if(!this.isLogin) {
        this.$message({
          message: '请先登录！',
          type: 'warning'
        })
        return ;
      }
      if(this.isShake) {
        return
      }
      if(this.shaketime || this.words.length) {
        return
      }
      if(!this.totle_times) {
        this.$message({
          message: '亲，您还未达到“摇一摇”条件呢~ 请先去充值吧！',
          type: 'warning'
        })
        return
      }
      if(!this.left_times) {
        if(this.totle_times<20) {
          this.$message({
            message: '亲，您还未达到领取条件呢，需要再次首充累计满500哟！',
            type: 'warning'
          })
        }else {
          this.$message({
            message: '今日机会已用完！',
            type: 'warning'
          })
        }
        return;
      }
      this.isShake = true;
     this.shaketime =  setTimeout(() => {
       this.shaketime = null
        this.isShake = false;
        if(this.$route.name !== 'newyear' || this.words.length) {
          return
        }
        this.$http(this.ApiSetting.active.joinNewYearActive)
        .then(res => {
          if(res.status == 1 && res.data) {
            this.left_times && this.left_times--;
            this.showRed = true;
            this.isOpenRed = false;
            this.reward = res.data.reward;
            this.words = res.data.tips;
            if(this.totle_times) {
              this.percent = parseInt(((this.totle_times - this.left_times)/this.totle_times)*100);
            }
          }else {
            this.$message({
              message: res.message,
              type: 'warning'
            })
          }
        })
      }, 3500);
    },
    guid() {
       function S4() {
           return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
       }
      return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    },
  }
};
</script>

<style scoped lang="less">
.newyear {
  width: 100vw;
  min-width: 1775px;
  height: 1690px;
  background: url("../../../assets/active/newyear/bg.jpg") no-repeat center top;
  background-size: cover;
  position: relative;
  >div:not(.nop) {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  .bgtit {
    top: 0;
    width: 1250px;
    height: 431px;
    background: url("../../../assets/active/newyear/txt.png") no-repeat;
  }
  .active_time {
    font-size: 26px;
    color: #fbf1ad;
    top: 350px;
  }
  .tree {
    top:400px;
    z-index: 10;
    width: 670px;
    height: 687px;
    background: url("../../../assets/active/newyear/tree-bottom.png") center bottom no-repeat;
    .tree_top {
      margin-top: 20px;
      width: 658px;
      height: 676px;
      background: url("../../../assets/active/newyear/tree-top.png") no-repeat;
      &.tree_shake {
        animation: shake-tree 2s ease-in-out infinite ;
        transform-origin: center bottom;
      }
    }
  }
  .cloud {
    z-index: 2;
    top: 920px;
    width: 100vw;
    height: 34.5vw;
    min-width: 1775px;
    min-height: 600px;
    background: url("../../../assets/active/newyear/could.png") no-repeat ;
    background-size: cover;
  }
  .records {
    z-index: 1;
    position: absolute;
    top: 560px;
    left: 320px;
    width: 260px;
    height: 436px;
    background:url("../../../assets/active/newyear/records.png") no-repeat;
    box-sizing: border-box;
    padding:30px 26px 100px ;
    text-align: center;
    .no_login {
      font-size: 16px;
      color: #fbf1ad;
      margin-top: 20px;
      display: inline-block;
    }
    h3 {
      font-size: 26px;
      color: #efd4a5;
      text-align: center;
    }
    .records_list {
      overflow: hidden;
      height: 290px;
      transition: transform 1s;
      position: relative;
      box-sizing: border-box;
      padding-top: 22px;
      li {
        height: 30px;
        width: 100%;
      }
      span {
        font-size: 22px;
        color: #efd4a5;
      }
    }
  }
  .shake {
    top: 780px;
    position: absolute;
    right: 340px;
    width: 250px;
    height: 260px;
    text-align: center;

    .ivu-chart-circle {
      box-shadow: 0px 3px 6px 0px rgba(33, 22, 19, 0.55);
      border-radius: 50%;

    }
    .circleChart {
      width: 224px;
      height: 224px;
      margin:0 auto;
      position: relative;
      &.notimes {
        background-color: #f1fbac;
        border-radius: 50%;
      }
    }
    p {
      margin-top:3px;
      font-size: 20px;
      font-weight: bold;
      color: #fcf2ad;
      text-shadow: 0px 3px 6px
      rgba(33, 22, 19, 0.82);
    }
    .shake-btn {
      width:198px;
      height: 198px;
      cursor: pointer;
      border-radius: 50%;
      box-shadow: 0px 4px 10px 0px
      rgba(183, 40, 0, 0.8);
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      &:hover {
        opacity: 0.8;
      }
      &.cursor_default {
        cursor: default;
        &:hover {
          opacity: 1;
        }
      }
    }
  }

  .rule_content {
    top: 1234px;
    z-index: 3;
    width: 1238px;
    height: 390px;
    background:url("../../../assets/active/newyear/rule1.png") no-repeat;
  }
  .rule_rule {
    top: 1690px;
    z-index: 3;
    width: 1238px;
    height: 390px;
    background:url("../../../assets/active/newyear/rule2.png") no-repeat;
    background-size: 100% 100%;
  }
  .rule {
    padding:30px 50px 0;
    box-sizing: border-box;
    h3 {
      font-size: 24px;
      color: #ce3a2c;
      margin-bottom: 25px;
      text-align: center;
    }
    p {
      font-size: 24px;
      color: #ce3a2c;
      line-height: 50px;
    }
    .chongzhi {
      display: inline-block;
      width: 122px;
      height: 45px;
      background:url("../../../assets/active/newyear/btn.png") no-repeat;
      background-size: cover;
      text-align: center;
      line-height: 45px;
      font-size: 18px;
      color: #7e100f;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    }
  }
}
@keyframes shake-tree2 {
 2% {
         transform: translate(5px, 0)
     }

     4% {
         transform: translate(-6px, 0)
     }

     6% {
         transform: translate(3px, 0)
     }

     8% {
         transform: translate(1px, 0)
     }

     10% {
         transform: translate(-5px, 0)
     }

     12% {
         transform: translate(-11px, 0)
     }

     14% {
         transform: translate(4px, 0)
     }

     16% {
         transform: translate(4px, -0)
     }

     18% {
         transform: translate(-5px, 0)
     }

     20% {
         transform: translate(-1px, 0)
     }

     22% {
         transform: translate(-8px, 0)
     }

     24% {
         transform: translate(-1px, -0)
     }

     26% {
         transform: translate(9px, 0)
     }

     28% {
         transform: translate(-7px, 0)
     }

     30% {
         transform: translate(8px, 0)
     }

     32% {
         transform: translate(-14px, 0)
     }

     34% {
         transform: translate(-11px, 0)
     }

     36% {
         transform: translate(-5px, -0)
     }

     38% {
         transform: translate(0, 0)
     }
     50% {
         transform: translate(13px, 0)
     }
     52% {
         transform: translate(7px, 0)
     }
     54% {
         transform: translate(3px, 0)
     }
     56% {
         transform: translate(0px, 0)
     }

     0%,100% {
         transform: translate(0, 0)
     }
}
@keyframes shake-tree1 {
 2% {
         transform: translate(5px, 0)
     }

     4% {
         transform: translate(-6px, 0)
     }

     6% {
         transform: translate(3px, 0)
     }

     8% {
         transform: translate(1px, 0)
     }

     10% {
         transform: translate(-5px, 0)
     }

     12% {
         transform: translate(-11px, 0)
     }

     14% {
         transform: translate(4px, 0)
     }

     16% {
         transform: translate(4px, -0)
     }

     18% {
         transform: translate(-5px, 0)
     }

     20% {
         transform: translate(-1px, 0)
     }

     22% {
         transform: translate(-8px, 0)
     }

     24% {
         transform: translate(-1px, -0)
     }

     26% {
         transform: translate(9px, 0)
     }

     28% {
         transform: translate(-7px, 0)
     }

     30% {
         transform: translate(8px, 0)
     }

     32% {
         transform: translate(-4px, 0)
     }

     34% {
         transform: translate(14px, 0)
     }

     36% {
         transform: translate(-13px, -0)
     }

     38% {
         transform: translate(-12px, 0)
     }

     0%,40%,100% {
         transform: translate(0, 0)
     }
}

@keyframes shake-tree {
    5% {
        transform: translate(0, 0) rotate(3deg)
    }

    10% {
        transform: translate(0,0) rotate(1deg)
    }

    15% {
        transform: translate(0, 0) rotate(3deg)
    }

    20% {
        transform: translate(0 ,0) rotate(1deg)
    }

    25% {
        transform: translate(0,0x) rotate(0deg)
    }

    30% {
        transform: translate(0,0) rotate(-3deg)
    }

    35% {
        transform: translate(0, 0) rotate(-1deg)
    }

    40% {
        transform: translate(0 ,0) rotate(-3deg)
    }

    45% {
        transform: translate(0,0x) rotate(-1deg)
    }

    50% {
        transform: translate(0,0) rotate(0deg)
    }

    55% {
        transform: translate(0,0) rotate(1deg)
    }

    60% {
        transform: translate(0,0x) rotate(-0deg)
    }

    65% {
        transform: translate(0, 0) rotate(0deg)
    }

    70% {
        transform: translate(0,0) rotate(0deg)
    }

    75% {
        transform: translate(0, 0) rotate(0deg)
    }

    80% {
        transform: translate(0,0x) rotate(0deg)
    }

    85% {
        transform: translate(0, 0) rotate(0deg)
    }

    90% {
        transform: translate(0,0x) rotate(0deg)
    }

    95% {
        transform: translate(0,0) rotate(0deg)
    }
    0%,100% {
        transform: translate(0, 0) rotate(0)
    }
}

</style>
<style lang="less">
.newyear_redPack {
  margin-top: -110px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  .no_open {
    width:286px;
    height: 371px;
    margin-top: 260px;
    background:url("../../../assets/active/newyear/red.png") no-repeat;
    position: relative;
    animation: redani 1s;
    .no_open_btn {
      position: absolute;
      top: 80px;
      left: 80px;
      width: 82px;
      height: 82px;
      background:url("../../../assets/active/newyear/red-btn.png") no-repeat;
      cursor: pointer;
      &:hover {
        opacity: 0.9;
      }
    }
    &.shake_ani {
      animation: shake-chunk 3s ease-in-out infinite;
    }
  }
  .open {
    width:592px;
    height: 628px;
    background:url("../../../assets/active/newyear/red-open.png") no-repeat;
    position: relative;
    .close {
      right: -25px;
      top: -37px;
      position: absolute;
      display: inline-block;
      width: 16px;
      height: 16px;
      background: url(/static/img/icon_es.73a7ef3.png) no-repeat;
      background-position: -841px -45px;
      transform: scale(1.5);
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    }
    span.words {
      font-size: 54px;
      color: #14151a;
      position: absolute;
      font-weight: bold;
      &:nth-child(1) {left: 190px;top: 25px;}
      &:nth-child(2) {left: 374px;top: 25px;}

      &:nth-child(3) {left: 50px;top: 215px;}
      &:nth-child(4) {left: 50px;top: 315px;}
      &:nth-child(5) {left: 50px;top: 422px;}
      &:nth-child(6) {left: 50px;top: 522px;}

      &:nth-child(7) {left: 494px;top: 215px;}
      &:nth-child(8) {left: 494px;top: 319px;}
      &:nth-child(9) {left: 494px;top: 422px;}
      &:nth-child(10) {left: 494px;top: 525px;}
    }
    .money {
      left: 175px;
      top: 438px;
      text-align: center;
      position: absolute;
      width: 240px;
      height: 100px;
      span {
        color: #fbf8ac;
        font-size: 84px;
        font-family: vkFont;
        text-shadow: 0px 3px 6px rgba(40, 23, 18, 0.82);
        .yuan {
          font-size: 40px;
          color: #fbf8ac;
          vertical-align: baseline;
        }
      }
    }
    .shengyu {
      position: absolute;
      left: 210px !important;
      bottom: 0;
      font-size: 20px;
      color: #fbf8ac;
    }
  }
}
@keyframes redani {
  0% {transform: scale(0.2) rotateX(0deg)}
  20% {transform: scale(0.3) rotateX(90deg)}
  40% {transform: scale(0.4) rotateX(180deg)}
  50% {transform: scale(0.5) rotateX(270deg)}
  60% {transform: scale(0.6) rotateX(360deg)}

  70% {transform: scale(0.7) rotateX(450deg)}
  80% {transform: scale(0.8) rotateX(540deg)}
  90% {transform: scale(0.9) rotateX(630deg)}
  100% {transform: scale(1) rotateX(720deg)}
}
@keyframes shake-chunk {
    2% {
        transform: translate(5px, 2px) rotate(-2deg)
    }

    4% {
        transform: translate(-6px, 3px) rotate(1deg)
    }

    6% {
        transform: translate(3px, 6px) rotate(4deg)
    }

    8% {
        transform: translate(1px, 8px) rotate(1deg)
    }

    10% {
        transform: translate(-5px, 10px) rotate(0deg)
    }

    12% {
        transform: translate(-11px, 2px) rotate(3deg)
    }

    14% {
        transform: translate(4px, 15px) rotate(1deg)
    }

    16% {
        transform: translate(4px, -8px) rotate(5deg)
    }

    18% {
        transform: translate(-5px, 10px) rotate(1deg)
    }

    20% {
        transform: translate(-1px, 3px) rotate(5deg)
    }

    22% {
        transform: translate(-8px, 5px) rotate(-3deg)
    }

    24% {
        transform: translate(-1px, -9px) rotate(4deg)
    }

    26% {
        transform: translate(9px, 11px) rotate(-1deg)
    }

    28% {
        transform: translate(-7px, 4px) rotate(5deg)
    }

    30% {
        transform: translate(8px, 14px) rotate(5deg)
    }

    32% {
        transform: translate(-4px, 11px) rotate(-1deg)
    }

    34% {
        transform: translate(14px, 11px) rotate(-4deg)
    }

    36% {
        transform: translate(-13px, -8px) rotate(3deg)
    }

    38% {
        transform: translate(-12px, 1px) rotate(-3deg)
    }

    0%,40%,100% {
        transform: translate(0, 0) rotate(0)
    }
}
</style>
