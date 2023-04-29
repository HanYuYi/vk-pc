<template>
  <div class="new_egame">
    <!-- <div class="fix_bgimg"></div> -->
    <MaintainPage :time="maintainTime" :content="maintainText" v-if="showMaintainPage"></MaintainPage>
    <div class="wrapper" v-else>
      <!--顶部盘口类型、游戏类型-->
      <gametype :isHeaderFixed="isHeaderFixed">
        <gamecart ref="cart" slot="cart"></gamecart>
      </gametype>
      <div  class="game_main clearfix">
         <gamedata :isHeaderFixed="isHeaderFixed">  </gamedata>
         <gamedetail ref="detail" :isHeaderFixed="isHeaderFixed"></gamedetail>
         <gamerightlist></gamerightlist>
      </div>
      <!--购物车按钮-->
      <div class="flod_box"
        :style="{ left:gameBetCartRight, opacity:gameBetCartRight?'1':'0',}"
        @click="toShowGameCartList()"
        v-show="isShowCartBtn">
        <span class="cart_icon"></span><span class="flod_box_title">{{$t("I_bet_the")}}</span>
        <span class="bet_count" :style="{opacity:betCartListLen>0 ? '1':'0'}">{{betCartListLen}}</span>
        <div class="flod_box_icon"><span></span></div>
      </div>
    </div>
  </div>
</template>

<script>
import gametype from "./gametype";
import gamecart from "./gamecart";
import gamedata from "./gamedata";
import gamedetail from "./gamedetail";
import gamerightlist from "./gamerightlist";
import MaintainPage from '@/components/maintainpage'
import storage from '@/utils/storage'
export default {
  name: "newegame",
  data() {
    return {
      isHeaderFixed:false,
      detailFixed:false,
      showMaintainPage:false,
      maintainTime: '',
      maintainText: '',
      headerOffsetTop:0,
      isShowCartBtn:true,
      gameBetCartRight:'',
      betCartListLen:0,
      gameDataListShow:true,//列表页面是否显示
      curGameTypeListTotal:0,//当前游戏类型下赛事的数量
    };
  },
  components: {
    gametype,
    gamecart,
    gamedata,
    gamedetail,
    gamerightlist,
    MaintainPage
  },
  mounted() {
    this.headerOffsetTop = document.querySelector('#fixedHeader').offsetTop
    //是否在维护中
    this.EventBus.$on('showMaintainPage',res => {
      this.showMaintainPage = true
      this.maintainTime = res.message
      this.maintainText = res.info
      document.getElementsByClassName("footer_top")[0].style.display = 'block'
    })
    window.addEventListener('scroll', this.handleScroll,false)
    /**购物车相关 */
    this.hadlLen(0,1)
    this.EventBus.$on('hideShowCart',(len)=> {
      this.isShowCartBtn = true;
      this.hadlLen(len);
    })
    //在詳情中选中盘口投注会显示购物车
    this.EventBus.$on('handleBetPointBoxClick',()=> {this.isShowCartBtn = false})
    setTimeout(() => {
      this.handleResize()
    }, 1000)
    this.EventBus.$on('gameDataListShow',val=>{
      this.gameDataListShow = !val
    })
    this.EventBus.$on('curGameTypeListTotal',num=>{
        this.curGameTypeListTotal = num
    })
  },
  beforeDestroy () {
    this.EventBus.$off('curGameTypeListTotal',total)
    this.EventBus.$off('gameDataListShow')
    this.EventBus.$off('showMaintainPage')
    this.EventBus.$off('hideShowCart')
    this.EventBus.$off('handleBetPointBoxClick')
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  beforeRouteEnter(to, from, next){
    if(from.name!=to.name) {
      document.documentElement.scrollTop = 0;
    }
    next()
  },
  methods: {
    //滚动监听
    handleScroll () {
      if(!this.ticking) {
        requestAnimationFrame(realFunc);
        this.ticking = true;
      }
      let _this = this
      function realFunc() {
        let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        if(_this.gameDataListShow&& !_this.isHeaderFixed){//列表页面，只有一条数据时不固定顶部
          if(_this.curGameTypeListTotal>1&&scrollTop > _this.headerOffsetTop){
            _this.isHeaderFixed = true
          }else if(_this.curGameTypeListTotal>1&&scrollTop < (_this.headerOffsetTop + 5)){
            _this.isHeaderFixed = false
          }
        } else{//详情页
          if(scrollTop >= _this.headerOffsetTop){
            _this.isHeaderFixed = true
          }else if(scrollTop < (_this.headerOffsetTop + 5)){
            _this.isHeaderFixed = false
          }
        }

        //周明灯榜吸顶处理
        _this.EventBus.$emit('gamerightlistScroll',scrollTop)
        //详情局数处理
        _this.EventBus.$emit('gamedetailScroll',{scrollTop:scrollTop,isHeaderFixed:_this.isHeaderFixed})
        //赛事列表的日期处理
        _this.EventBus.$emit('gamedataScroll',scrollTop)
        _this.ticking = false
      }
    },
    hadlLen(len,bool) {
      if(bool) {
       let tdata = storage.get('vkbetCartList') || []
        this.betCartListLen = tdata.length
      }else {
        this.betCartListLen = len
      }
    },
    handleResize() {
      this.gameBetCartRight = ( (document.body.offsetWidth - 1240)/2 + 988 )+ 'px';
    },
    //显示购物车
    toShowGameCartList() {
      this.isShowCartBtn = false
      this.EventBus.$emit('showGameCartList')
    }
  }
};
</script>

<style lang="less">
@newegame_icons:url("../../assets/egame/newegame_icons.png");
.new_egame {
  .flr {
    float: right;
  }
  .fll {
    float: left;
  }
  .wrapper {
    padding-top: 20px;
  }
 .game_main  {
    min-height: 100vh ;
   overflow: hidden;
 }
  //公用底线
  .all_no_more {
    height: calc(100vh - 310px);
    text-align: center;
    line-height: 100px;
    position: relative;
    .dilogo {
      display: inline-block;
      background: url(/static/img/newegame_icons.5eec818.png) no-repeat;
      width: 27px;
      height: 30px;
      background-position: -149px -180px;
      margin-bottom: -9px;
      margin-right: 3px;
    }
    .diline {
      position: absolute;
      top: 50px;
      width: 420px;
      background: #262933;
      height: 1px;
      display: inline-block;
      &:first-child {
        left:0;
      }
      &:nth-child(2) {
        right:0;
      }
    }
  }
  /*购物车按钮*/
  .flod_box {
    height: 60px;
    width: 252px;
    line-height: 58px;
    text-align: center;
    position: fixed;
    bottom: 10px;
    background-color: #262933;
    font-size: 18px;
    color: #07f1b7;
    cursor: pointer;
    box-sizing: border-box;
    border: 1px solid #262933;
    transition: all 0.10s;
    box-shadow: 0 0 20px 4px rgba(0, 0, 0, 0.6);

    &:hover {
      border-color: #07f1b7;
    }
    span {
      display: inline-block;
      vertical-align: middle;
    }
    .cart_icon {
      width: 18px;
      height: 20px;
      background: @newegame_icons no-repeat;
      background-position: -20px -187px;
    }
    .flod_box_title {
      margin-left: 8px;
    }
    .bet_count {
      margin-left: 16px;
      color: #262933;
      font-size: 14px;
      height: 24px;
      line-height: 24px;
      border-radius: 12px;
      padding: 0 8px;
      background-color: #07f1b7;
    }
    .flod_box_icon {
      position: absolute;
      right: 12px;
      top: 0;
      height: 100%;
      line-height: 60px;
      width: 16px;
      span {
        width: 100%;
        height: 14px;
        background: @newegame_icons no-repeat;
        background-position: -68px -306px;
        vertical-align: middle;
        transform: rotate(180deg);
      }
    }
  }
  //赔率上升下降动画，购物车和详情中有
  .down_up_anit {
    margin-top:0;
    display: inline-block;
    width: 10px;
    height: 18px;
    background-repeat: no-repeat;
    vertical-align: middle;
    &.down_points {
      background-position: -489px -191px;
      background-image: @newegame_icons;
      animation: arrowFade 1s ease-in-out infinite;
    }
    &.up_points {
      background-image: @newegame_icons;
      background-position: -529px -188px;
      animation: arrowFade 1s ease-in-out infinite;
    }
  }
}
@keyframes aw {
  0% {width:0%;left: 50%;}
  100% {width: 100%;left: 0;}
}
 @keyframes arrowFade {
   0% {
     background-image: url("../../assets/egame/newegame_icons.png");
   }
   100%{
     background-image: none;
   }
 }
 /*公用投注点*/
 .game_bet_point {
   margin-top: 5px;
   margin-right: -14px;
   .bet_point_box {
     width: 318px;
     box-sizing: border-box;
     height: 36px;
     line-height: 34px;
     font-size: 14px;
     margin-right: 14px;
     position: relative;
     padding: 0 20px;
     float: left;
     margin-bottom: 10px;
     background-color: #152f2e;
     border-radius: 4px;
     border: solid 1px #037256;
     cursor: pointer;
     transition: background-color 0.2s;
     .team_name {
       display: inline-block;
       max-width: 180px;
       line-height: normal;
       vertical-align: middle;
     }

     .team_point {
       color: #fff;
       margin-left: 5px;
       display: inline-block;
       vertical-align: middle;
     }

     .bet_game_status {
       position: absolute;
       right: 10px;
       top: 0;
       height: 100%;
       line-height: 32px;
       width: 32px;
       text-align: center;
       background-image: @newegame_icons;
       background-repeat: no-repeat;
     }
   }
 }
 .guessing {
   .bet_game_status {
     background-position: -417px -246px;
   }
   .bet_point_box.actived {
       background-color: #0f856b;
       border-color: #07f1b7;
       .bet_game_status {
          background-position: -417px -296px;
       }
       .team_name {
         color: #fff;
       }
   }
   .bet_point_box:hover {
     transition: border-color 0.2s linear;
     border-color: #07f1b7;
   }

 }
 .pause {
   .bet_game_status {
     background-position: -100px -179px;
   }
 }
 .gaming,.clearing {
   .bet_point_box {
     border: 0 ;
     background: #1f2129 ;
     cursor: default ;
   }
 }
 .gaming {
   .bet_game_status {
     background-position: -570px -180px;
   }
 }
 .win,.lose {
   &.bet_point_box {
     border: 0 ;
     background: #1f2129 ;
     cursor: default ;
   }
 }
 .win {
   .bet_game_status {
     background-position: -512px -112px;
   }
 }
 .lose {
   .bet_game_status {
     background-position: -575px -112px;
   }
 }
</style>
