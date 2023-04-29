<template>
 <div class="active_page chineseyear">
   <div class="banner"></div>
   <div class="tit_line">
     <span class="tit">活动时间</span>
     <span class="detail">{{initInfo.active_show_time}}</span>
   </div>
   <div class="tit_line">
     <span class="tit">活动内容</span>
     <span class="detail">活动期间，VIP会员累计充值达到指定金额即可领取新年红包。</span>
   </div>
    <div class="small_loading" v-show="load"></div>
   <!--进度条-->
   <div class="progress" v-show="!load">
     <div class="pro_inner" :style="{width:prow+'%'}">
       <div class="niu" ref="niu"></div>
       <div class="point" v-show="initInfo.need_deposit"></div>
       <div class="tips" v-show="initInfo.need_deposit">
         <p class="money">仅差{{initInfo.need_deposit}}元</p>
         <p>即可领取</p>
       </div>
     </div>
   </div>
    <!--红包-->
    <ul class="red_box" v-show="!load">
      <li v-for="(item,index) in initInfo.bags_status" :key="index"
        :class="{'got':item.status==1,'get':item.status==0,'lock':item.status>1}"
        @click="apply(item)">
        <p class="money"><span class="unit">￥</span>{{item.bonus}}</p>
        <p class="line_tit">充值满{{formatMoney(item.deposit) }}</p>
      </li>
    </ul>
    <!--活动规则-->
    <div class="rule">
      <div class="title_big">活动规则</div>
      <div class="rule_inner">
        1.活动期间，VIP会员累计充值达到指定金额即可领取新年红包，每个红包仅限领取一次。<br>
        2.累计充值金额仅计算会员每日未发起提款前的充值金额。<br>
        3.此活动与【点金胜手】活动共享，会员可以同时参与两个活动。<br>
        4.活动彩金需要完成全站1倍有效流水，电竞赔率＜1.45、亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、走盘、注单取消、对冲等情况都不算有效流水，PT电子游戏中以下游戏不计算为有效流水：<activeptliushui :color="'#fff'"></activeptliushui>。<br>
        5.每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能参与一次优惠，参与用户必须先绑定银行卡。对违规的用户，VKGAME保留无期限审核，和扣回红利及产生的利润权利。本活动最终解释权归VKGAME所有。																
      </div>
    </div>
    <router-link to="/active" class="title_big back">返回活动首页</router-link>

    <el-dialog
    :visible.sync="openShow"
    custom-class="pure_dialog chineseyear_opening"
    :append-to-body="true"
    :close-on-click-modal="false"	
    :close-on-press-escape="false">
      <p>奖金领取成功</p>
      <p>请<router-link to="/user">进入钱包</router-link>查看</p>
      <div class="close" @click="openShow=false"></div>
    </el-dialog>
 </div>
</template>

<script>
import { mapState } from 'vuex'
import {  formatNumberSplit} from "@/utils/util";
export default {
  name: "chineseyear",
  data() {
    return {
      openShow:false,
      prow:100,
      singelpro:14.2857,
      initInfo:{},
      load:true,
      ajaxload:false
    };
  },
  computed: {
    ...mapState(["isLogin"]),
  },
  mounted() {
    this.getInit(true)
  },
  watch: {
    isLogin(val) {
      if(!val) {
        this.getInit()
      }
    }
  },
  methods: {
    formatMoney (num) {
      return formatNumberSplit(num).split(".")[0]
    },
    getInit(bool) {
      if(bool) {
        this.load = true
      }
      this.$http(this.ApiSetting.active.getChineseYearInit)
      .then(res => {
        this.load = false
        if(res.status == 1 && res.data) {
            this.initInfo = res.data;
            if(this.initInfo.bags_status) {
              let len = this.initInfo.bags_status.length
              for (let i=0;i<len;i++) {
                if(this.initInfo.bags_status[i].status>1) {
                  this.prow = this.singelpro*i
                  break;
                }
              }
            }
            this.niuani()
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
      if(item.status !=0) {
        if (item.status>1) {
          this.$message({
            message: item.status_tips,
            type: "warning"
          });
        }
        return
      }
      this.ajaxload = true
      this.$http(this.ApiSetting.active.joinChineseYear,{bag:item.bag})
      .then(res => {
        this.ajaxload = false
        if(res.status == 1 && res.data) {
          this.openShow = true
          item.status = 1
        }
      })
      .catch(()=>{
        this.ajaxload = false
      })
    },
    niuani() {
      let bg = this.$refs.niu,
      qty = 20,
      duration = 2;
      for (let i = 0; i < qty; i++) {
        let dot = document.createElement('div');
        bg.appendChild(dot);
        TweenMax.set(dot, { x:120, y:40});
        let delay = Math.random() * duration;
        TweenMax.to(dot, duration, {
          physics2D:{
            velocity:Math.random() * 300, 
            angle:Math.random() * 100 + 250,
            gravity:400
          },
          rotation: R(0,360),
          repeat: -1,
        },delay);
      }
      function R(min,max) {
        return min + Math.random() * (max-min)
      };
    }
  }
};
</script>

<style scoped lang="less">
.chineseyear {
  background: url("../../../assets/active/chineseyear/bg.jpg") no-repeat center top;
  position: relative;
  padding: 120px 0 1px;
  * {
    box-sizing: border-box;
  }
  * + * {
    box-sizing: border-box;
  }
  .banner {
    width: 1027px;
    margin:0 auto;
    height: 310px;
    background: url("../../../assets/active/chineseyear/banner.png") no-repeat;
  }
  .tit_line {
    width: 630px;
    margin:10px auto 0;
    .tit {
      width: 114px;
      height: 32px;
      font-size: 15px;
      color: #f7de8f;
      line-height: 32px;
      text-align: center;
      display: inline-block;
      margin-right: 14px;
      background: url("../../../assets/active/chineseyear/tit-small.png") no-repeat;
    }
    .detail {
      font-size: 18px;
      color: #b01302;
    }
  }
  .small_loading {
    display: block;
    margin: 210px auto;
  }
  .progress {
    width: 1093px;
    margin:190px auto 0;
    height: 8px;       
    border-radius: 4px;
    box-shadow: 1px 0 3.6px 0.4px rgba(167, 82, 26, 0.53);
    background-color: #b00e1a;
    position: relative;
    pointer-events: none;
    .pro_inner {
      position: absolute;
      height: 8px;
      z-index: 1;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      background-image: linear-gradient(to bottom, #fdf1d0, #fdf1d0), linear-gradient(to top, #ffc230, #ffffff);
      border: solid 2px #b00e1a;
      border-radius: 3px;
      .niu {
        position: absolute;
        right: -100px;
        top: -200px;
        width: 200px;
        height: 200px;
        background: url("../../../assets/active/chineseyear/red.gif") no-repeat;
      }
      .point {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translate(50% ,-50%);
        width: 12px;
        height: 12px;
        border-radius: 6px;
        box-shadow: 1px 0 2.7px 0.3px #b21603;
        border: solid 1px #ffc741;
        background-image: linear-gradient(to bottom, #f6e6d1, #f6e6d1), linear-gradient(to top, #c1292e, #dc3540);
      }
      .tips {
        position: absolute;
        right: 0;
        transform: translateX(50%);
        top: 10px;
        font-size: 12px;
        color: #b00e1a;
        text-align: center;
        min-width: 150px;
        .money {
          font-size: 16px;
          font-weight: bold;
        }
      }
    }
  }
  .red_box {
    width: 1250px;
    margin:20px auto 0;
    height: 250px;
    li {  
      width:200px;
      height: 250px;
      float: left;
      margin:0 -22px;
      overflow: hidden;
      .money {
        margin-top: 160px;
        text-align: center;
        font-weight: bold;
        font-size: 30px;
        .unit {
          font-size: 22px;
        }
      }
      .line_tit {
        margin-top: 15px;
        text-align: center;
        font-size: 16px;
      }
      &.lock {
        cursor: pointer;
        background: url("../../../assets/active/chineseyear/red-lock.png") no-repeat;
      }
      &.got {
        background: url("../../../assets/active/chineseyear/red-got.png") no-repeat;
        .money {
          color: #a25335;
        }
        .line_tit {
          color: #6b1e10;
        }
      }
      &.get {
        background: url("../../../assets/active/chineseyear/red-get.png") no-repeat;
        cursor: pointer;
        transition: transform 0.3s;
        &:hover {
          transform: scale(1.02);
        }
      }
      &.lock,&.get {
        .money {
          color: #fada85;
        }
        .line_tit {
          color: #b00e1a;
        }
      }

    }
  }
  .title_big {
    width:329px;
    height: 70px;
    line-height: 70px;
    background: url("../../../assets/active/chineseyear/tit-big.png") no-repeat;
    font-size: 30px;
    font-weight: 600;
    text-align: center;
    display: block;
    color: #f7de8f;
  }
  .rule {
    width: 1240px;
    margin:70px auto 0;
    padding: 10px;
    border-radius: 20px;
    border: solid 1px #fbd5ab;
    background-color: #a00d17;
    position: relative;
    .title_big {
      position: absolute;
      left: 50%;
      top: 0;
      transform: translate(-50%,-50%);
    }
    .rule_inner {
      width:100%;
      padding: 58px 24px 48px;
      border-radius: 20px;
      border: solid 1px #fbd6ac;
      font-size: 16px;
      color: #f7de8f;
      line-height: 2;
    }
  }
  .back {
    margin:37px auto;
    cursor: pointer;
    &:hover {
      opacity: 0.9;
    }
  }
}
</style>
<style lang="less">
.chineseyear {
  .niu {
    position: relative;
    div {
      position: absolute;
      width:22px;
      height: 22px;
      background: url("../../../assets/active/chineseyear/red-bg-small.png") no-repeat;
    }
  }
}
.chineseyear_opening {
  width:464px;
  height: 517px;
  background: url("../../../assets/active/chineseyear/got-bg.png") no-repeat;
  .el-dialog__body {
    padding-top: 250px;
  }
  p {
    font-size: 28px;
    font-weight: bold;
    color: #c22126;
    line-height: 1.6;
    text-align: center;
    a {
      cursor: pointer;
      text-decoration: underline;
      color: #fea801;
    }
  }
  .close {
    width:32px;
    margin:180px auto 0;
    height: 32px;
    background: url("../../../assets/active/close.png") no-repeat;
    transition: background 0.3s;
    cursor: pointer;
    &:hover {
      background: url("../../../assets/active/close-hover.png") no-repeat;
    }
  }
}
</style>