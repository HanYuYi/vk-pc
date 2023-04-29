<template>
  <div class="game_header" id="fixedHeader" :class="{'fixed':isHeaderFixed}">
    <div class="game_header_top clearfix">
       <!--盘口类型-->
      <div class="select_list fll clearfix">
        <div class="select_box" v-for="item in gameHeadTopList" :name="item.code" :key="item.code" :class="{'actived':headTopCurrentCode == item.code}" @click="headTopSelected(item.code,1)">
          <span class="nav_name">{{item.name}}</span><i class="num" v-if="item.code!=='end'&&item.code!=='special'">{{item.count}}</i>
        </div>
        <div class="select_box video_select_box" :class="{'actived':headTopCurrentCode == 'video'}" @click="headTopSelected('video')">
          <span class="video_icon"></span>
        </div>
        <!-- <div class="select_box favorite_box" :class="{'actived':headTopCurrentCode == 'favorite'}" @click="headTopSelected('favorite')" v-if="isLogin">
          <span class="favorite_icon"></span>
        </div> -->
      </div>
      <!--游戏记录、竞猜规则-->
      <div class="game_info_rule flr" v-if="isLogin">
        <a href="javascript:;" class="game_records fll"  @click="openWin(1)">{{$t("The_game_record")}}</a>
        <a href="javascript:;" class="game_rule" @click="openWin(2)">{{$t("Competition_rules")}}</a>
      </div>
      <!--余额-->
      <div class="user_money_info clearfix flr" v-if="isLogin">
        <div class="refresh_btn flr" @click="reLoadMoney()">
          <span :class="{'reflash_money':egMoneyLoad}"></span>
        </div>
        <!-- <div class="vb_balance balance_box flr"><span>{{$t("The_coin")}}：</span><i class="money_num">{{userVirtualMoney}}</i></div> -->
        <div class="money_balance balance_box flr"><span>{{$t("balance")}}：</span><i class="money_num">{{egMoney}}</i></div>
      </div>
    </div>
    <!--游戏类型-->
    <div class="game_type_nav" :class="{'showmore':showMoreGameType}" @mouseenter="typeNavHover()" @mouseleave="mouseleaveHeal()">
      <div class="morebtn" v-if="gameTypeList.length>7" @mouseenter="showMoreGameType=true" >
        <div class="more"></div>
        <span>{{$t("More_and_more")}}</span>
      </div>
      <div class="nav_list top clearfix" :style="{height:showMoreGameType?styleHeight-1 +'px':'80px'}">
        <div class="type_nav_box" v-for="item in gameTypeList" :key="item.id"
          @click="handleGameTypeSelect(item)"
          :class="[{'actived':item.selected}]"
          v-lazy-container="lazyLogo"
           >
          <div class="border_box">
            <img :data-src="item.icon_hover" alt="" >
            <div class="type_nav_box_next">
              <span class="type_nav_box_tit" :title="item.game_name" :data-content="item.game_name">{{item.game_name}}</span>
              <i class="game_type_count">{{item.count}}</i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="header_shadow"></div>
    <slot name="cart"></slot>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "gametype",
  data() {
    return {
      headTopCurrentCode:"",
      gameHeadTopList:[],
      egMoneyLoad:false,
      egMoney:0,
      showMoreGameType:false,
      gameCurrentType:[],
      typeNavHoverIn:true,
      styleHeight:80,
      gameTypeList:[],
      hasLoadGameDataList:false,
    };
  },
  props: {
    isHeaderFixed:{
      default:false,
      type:Boolean
    }
  },
  computed: {
     ...mapState(["isLogin","userVirtualMoney","lazyLogo"]),
    getSort () {
      return this.$route.params.sort ? this.$route.params.sort:0
    },
  },
  watch: {
    isHeaderFixed(val) {
      this.isHeaderFixed = val
    },
    showMoreGameType() {
      this.EventBus.$emit('showMoreGameType',this.showMoreGameType)
    }
  },
  mounted() {
    this.loadGameHeadTopList()
    this.loadGameTypeList()
    this.oneKeyMoney()
    this.EventBus.$on("reLoadMoney",()=>this.oneKeyMoney())
    this.EventBus.$on('detailGetTopCurCode',code=>{
      this.headTopCurrentCode = code
      if(this.gameTypeList[0]){
        this.gameTypeList.forEach(item => {
          item.selected  = false
        })
        this.gameTypeList[0].selected = true
        this.gameCurrentType = [this.gameTypeList[0].id]
      }
      this.EventBus.$emit('loadGameDataList',{
        headTopCurrentCode:this.headTopCurrentCode,
        styleHeight:this.styleHeight,
        showDayDate:this.getShowDayDate()
      })
    })
  },
  beforeDestroy(){
    this.EventBus.$off('detailGetTopCurCode')
    this.EventBus.$off('reLoadMoney')
  },
  methods: {
    //showDayDate得值  是否显示日期
    getShowDayDate() {
      let showDayDate = false
      this.gameHeadTopList.forEach(item=>{
        if(item.code == this.headTopCurrentCode) {
           showDayDate = item.show_date
        }
      })
      return showDayDate
    },
    //请求游戏类型
    loadGameTypeList () {
      this.$http(this.ApiSetting.newEgame.getGameTypeList)
        .then((res) => {
          if(res.status === 1 && res.data.length){
              res.data.forEach((v, i) => {
                v.count = '--'
                v.selected = false
              })
              this.gameTypeList = res.data
              this.gameCurrentType = [this.gameTypeList[0].id]
              this.gameTypeList[0].selected = true

              this.styleHeight = Math.ceil(this.gameTypeList.length/10)*81
              this.EventBus.$emit('styleHeight',this.styleHeight)
              this.EventBus.$emit("gameLeftTypeListImg",res.data)

              if(this.headTopCurrentCode!=='' &&!this.getSort && !this.hasLoadGameDataList){
                this.hasLoadGameDataList = true
                this.EventBus.$emit('loadGameDataList',{
                  headTopCurrentCode:this.headTopCurrentCode,
                  styleHeight:this.styleHeight,
                  showDayDate:this.getShowDayDate()
                })
              }
              this.loadGameTypeCount ()
          }
      })
    },
    //请求游戏类型的各个总计
    loadGameTypeCount () {
      let data = {
        nav_code: this.headTopCurrentCode?this.headTopCurrentCode: 'normal_today'
      }
      this.$http(this.ApiSetting.newEgame.getGameTypeCount, data)
        .then((res) => {
          if(res.status === 1){
            let total = 0
            if(res.data.length>0){
              let obj = {}
              res.data.forEach((v, i) => {
                total += v.total
                obj[v.game_type_id] = v.total
              })
              this.gameTypeList.forEach((x, y) => {
                if(x.id === 0){
                  x.count = total
                }else{
                  x.count = obj[x.id] ? obj[x.id] : 0
                }
              })
              this.EventBus.$emit('curGameTypeListTotal',total)
            }else{
              this.gameTypeList.forEach((v, i) => {
                v.count = 0
              })
            }
          }
      },()=>{})
    },
    //选择游戏类型
    handleGameTypeSelect (x) {
      this.EventBus.$emit('topTypeChange')
      this.EventBus.$emit('curGameTypeListTotal',x.count)
      x.selected = !x.selected
      this.gameCurrentType = []
      //多选
     //  if(x.id === 0 && x.selected) {
     //    this.gameCurrentType = [x.id]
     //    this.gameTypeList.forEach(item => {
     //      item.selected = false
     //    })
     //    this.gameTypeList[0].selected = true
     //  }else {
     //   this.gameTypeList.forEach(item => {
     //     item.selected && this.gameCurrentType.push(item.id)
     //   })
     //  }
     //  if(this.gameCurrentType.length == 0) {
     //    this.gameTypeList[0].selected = true
     //    this.gameCurrentType.push(this.gameTypeList[0].id)
     //  }
     //  let isfindallsel = this.gameCurrentType.find(item => {return item == this.gameTypeList[0].id})
     //  if(this.gameCurrentType.length >1 && isfindallsel !== "undefined") {
     //     this.gameTypeList[0].selected = false
     //     this.gameCurrentType = this.gameCurrentType.filter(item => {return item !== this.gameTypeList[0].id})
     //  }
      //单选
      this.gameTypeList.forEach(item => {
        if(item.id !== x.id) {
         item.selected = false
        }
      })
      if(x.selected) {
       this.gameCurrentType = [x.id]
      }else {
        this.gameCurrentType = [0]
        this.gameTypeList[0].selected = true
      }
      this.EventBus.$emit('filtrate',{
        gameCurrentType:this.gameCurrentType,
        headTopCurrentCode:this.headTopCurrentCode,
        showDayDate:this.getShowDayDate()
      })
      if(navigator.userAgent.indexOf("Edge")>-1) {
        if(this.isHeaderFixed) {
          document.body.scrollTop = 140
        }else {
          document.body.scrollTop = 0
        }
      }else {
        if(this.isHeaderFixed) {
          document.documentElement.scrollTop = 140
        }else {
          document.documentElement.scrollTop = 0
        }
      }
    },
    //请求最顶部盘口类型
    loadGameHeadTopList () {
      this.$http(this.ApiSetting.newEgame.getGameHeadTopList)
        .then((res) => {
          if(res.status === 1 && res.data.length){
              this.gameHeadTopList = res.data
              this.gameHeadTopList.forEach(v => {
                v.count = '--'
              })
              this.headTopCurrentCode = this.gameHeadTopList[0].code
              this.loadGameHeadTopListCount()
          }else {
            if (res.is_maintain === 1) {
              this.EventBus.$emit('showMaintainPage',res)
             }
          }
        })
    },
    //最顶部盘口类型的各个总计数量
    loadGameHeadTopListCount () {
      this.$http(this.ApiSetting.newEgame.getGameHeadTopListCount)
        .then((res) => {
          if(res.status === 1){
            let t = this.gameHeadTopList
            this.gameHeadTopList = []
            for(let k in res.data){
              t.forEach((v, index) => {
                if(v.code === k){
                  v.count = res.data[k]
                }
               })
            }
            this.gameHeadTopList = t
            if(this.gameCurrentType.length && !this.getSort && !this.hasLoadGameDataList){
              this.hasLoadGameDataList = true
              this.EventBus.$emit('loadGameDataList',{
                headTopCurrentCode:this.headTopCurrentCode,
                styleHeight:this.styleHeight,
                showDayDate:this.getShowDayDate()
              })
            }
          }
        })
    },
   //最顶部彩池盘等类型点击
    headTopSelected (x,bool) {
      this.EventBus.$emit('topTypeChange')
      this.gameTypeList.forEach(item => {
        item.selected  = false
      })
      this.gameTypeList[0].selected = true
      this.gameCurrentType = [this.gameTypeList[0].id]
      this.headTopCurrentCode = x
      this.loadGameHeadTopListCount()
      this.loadGameTypeCount ()
      this.EventBus.$emit('loadLeftGameList',this.headTopCurrentCode)
      this.EventBus.$emit('loadGameDataList',{
        headTopCurrentCode:this.headTopCurrentCode,
        styleHeight:this.styleHeight,
        showDayDate:this.getShowDayDate()
      })
    },
    //打开新的窗口 游戏记录 竞猜规则
    openWin (x) {
      let iWidth = 1260, iHeight = 620, name = ''
      let iTop = (window.screen.availHeight - 30 - iHeight) / 2
      let iLeft = (window.screen.availWidth - 10 - iWidth) / 2
      if(x === 1){//scrollbars值不同
       window.open('/gameprojects', name, 'height=' + iHeight + ',width=' + iWidth + ',top='+ iTop +',left='+ iLeft +',status=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=no,titlebar=no');
      }else if(x === 2){
       window.open('/gamerule', name, 'height=' + iHeight + ',width=' + iWidth + ',top='+ iTop +',left='+ iLeft +',status=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=yes,titlebar=no');
      }
    },
    //钱包余额一键转入电竞钱包
    oneKeyMoney() {
      if(this.$store.state.userInfo.wallet_onekey_status) {
        this.$http(this.ApiSetting.newEgame.getGameMoney)
        .then(res=>{
          this.reLoadMoney()
        },err=>{
          this.reLoadMoney()
        })
      }else {
        this.reLoadMoney()
      }
    },
    //请求余额
    reLoadMoney () {
      this.egMoneyLoad = true
      this.$http(this.ApiSetting.index.getMoney, { gameCode: 'EG'})
        .then((res)=>{
          setTimeout(() => {
            this.egMoneyLoad = false
          }, 600)
          if(res.status === 1 && res.data.isLogin){
            this.egMoney = res.data.amount
            this.$store.commit('updateLoginStatus', res.data.isLogin)
            if (!res.data.isLogin) this.$store.commit('updateLoadHostpot', false)
            // this.$store.dispatch('getUserVirtualMoney')
          }
        }, (err) => {
          setTimeout(() => {
            this.egMoneyLoad = false
          }, 500)
        })
    },
    //鼠标离开游戏分类
    mouseleaveHeal() {
     setTimeout(() => {
       if(!this.typeNavHoverIn) {
         this.showMoreGameType = false
       }
     }, 1000);
     this.typeNavHoverIn = false
    },
    //鼠标划上游戏分类
    typeNavHover() {
      this.typeNavHoverIn = true
      if(!this.showMoreGameType) {
        setTimeout(() => {
          if(this.typeNavHoverIn) {
            this.showMoreGameType = true;
          }
        }, 1000);
      }
    },
  }
};
</script>
<style scoped lang="less">
@color_1: #7c839f;
@color_2: #fff;
@color_3: #07f1b7;
@color_4: #262933;
@background_color_1: #20232b;
@newegame_icons:url("../../assets/egame/newegame_icons.png");
.game_header {
  position: relative;
  margin-bottom: 10px;
  &.fixed {
    position: fixed;
    top: 0;
    z-index: 5;
    pointer-events: none;
    >div {
      pointer-events:all;
    }
  }
  .game_header_top {
    height: 40px;
    line-height: 40px;
    background-color: @background_color_1;
    font-size: 14px;
    color: @color_1;
    border-bottom: 1px solid #17191f;
    overflow: hidden;
    .select_list {
      .select_box {
        float: left;
        width: 100px;
        text-align: center;
        position: relative;
        cursor: pointer;
        transition: color 0.3s;
        &.actived {
          &:after {
            content: '';
            position: absolute;
            width: 100%;
            height: 3px;
            left: 0;
            bottom: 0;
            background-color: #07eaea;
            background-image: linear-gradient(-90deg,
            @color_3 0%,
            #07e9f1 100%);
            animation: aw linear 0.3s;
          }
        }
        &.actived,&:hover  {
          .nav_name {
            color: @color_2;
          }
          .num {
            color: @color_3;
          }
        }
        .nav_name {
          vertical-align: middle;
        }
        .num {
          margin-left: 5px;
          vertical-align: middle;
        }
      }
      .video_icon,.favorite_icon {
        display: inline-block;
        width: 20px;
        height: 20px;
        background:@newegame_icons no-repeat;
        vertical-align: middle;
      }
      .favorite_box {
        .favorite_icon {
          background-position: -1223px -23px;
        }
        &:hover,&.actived {
          .favorite_icon {
            background-position: -1223px -71px;
          }
        }
      }
      .video_select_box {
        width: 60px;
        .video_icon {
          background-position: -375px -253px;
        }
        &:hover,&.actived {
          .video_icon {
            background-position: -375px -303px;
          }
        }
        &.actived:after {
          display: none;
        }
      }
    }
    .search_box {
      width: 160px;
      box-sizing: border-box;
      padding: 0 18px;
      position: relative;
      border-right: 1px solid #17191f;
      .search_input {
        width: 100%;
        box-sizing: border-box;
        height: 30px;
        line-height: 28px;
        border: 1px solid @color_1;
        border-radius: 3px;
        padding: 0 40px 0 15px;
        background: none;
        vertical-align: middle;
        color: @color_2;
      }
      .search_btn {
        position: absolute;
        width: 35px;
        text-align: center;
        right: 18px;
        top: 0;
        cursor: pointer;
        span {
          display: inline-block;
          vertical-align: middle;
          width: 14px;
          height: 14px;
          background:@newegame_icons no-repeat;
          background-position: -68px -190px;
        }
      }
    }
    .user_money_info {
      box-sizing: border-box;
      border-right: 1px solid #17191f;
      padding: 0 15px;
      width: 309px;
      .balance_box {
        margin: 0 10px;
        span {
          display: inline-block;
          vertical-align: middle;
        }
        .money_num {
          color: @color_2;
          display: inline-block;
          max-width: 80px;
          vertical-align: middle;
          white-space: nowrap;
          &.money_refresh {
            animation: amt_moneytxt  0.8s linear;
          }
        }
      }
      .refresh_btn {
        width: 26px;
        text-align: center;
        span {
          display: inline-block;
          vertical-align: middle;
          width: 16px;
          height: 16px;
          background:@newegame_icons no-repeat;
          background-position: -111px -255px;
          cursor: pointer;
          &:hover {
            background-position: -111px -305px;
          }
          &.reflash_money {
            transform: rotate(-360deg);
            transition: transform 0.8s;
          }
        }
      }
    }
    .game_info_rule {
      width: 171px;
      text-align: center;
      padding: 0 10px;
      a {
        display: inline-block;
        margin: 0 10px;
        color: @color_3;
        width: 65px;
        text-align: center;
        overflow: hidden;
        vertical-align: top;
      }
    }
  }
  .game_type_nav {
    min-height: 60px;
    background-color: @color_4;
    width: 1240px;
    transition: height .2s ease-in-out;
    border-bottom: 1px solid transparent;
    position: relative;
    z-index: 2;
    .actived,.type_nav_box:hover {
      img {
        opacity: 1;
      }
      .type_nav_box_tit {
        color: @color_2;
      }
      .game_type_count {
        color: @color_3
      }
    }
    .nav_list {
      height: 60px;
      line-height: 60px;
      width: 100%;
      overflow: hidden;
      &.top {
        overflow: hidden;
        transition: height 0.3s;
      }
      .type_nav_box {
        width: 120px;
        height: 81px;
        text-align: center;
        float: left;
        cursor: pointer;
        box-sizing: border-box;
        padding: 10px 5px;
        border-bottom: 1px solid #17191f;
        &:hover .border_box{
          background-color: #20232b;
        }
        &:nth-child(10n) {
          width: 115px;
          padding-right: 0;
        }
        .border_box {
          border: 1px solid transparent;
          box-sizing: border-box;
          width: 110px;
          line-height: 40px;
          border-radius: 8px;
          transition: background-color 0.3s;
        }
        &.actived {
          .border_box {
            border-color: #07f1b7;
          }
        }
      }
    }
    img {
      opacity: 0.5;
      transition: opacity 0.2s;
      width: 28px;
      height: 28px;
      &[lazy=error],&[lazy=loading] {
        width: 28px;
        height: 22px;
      }
    }
    .type_nav_box_next {
      line-height: 30px;
      margin-top: -9px;
    }
    .type_nav_box_tit {
      font-size: 14px;
      display: inline-block;
      vertical-align: middle;
      font-weight: bold;
      color: #7c839f;
      transition: opacity 0.2s;
      max-width: 72px;
      line-height: 1.5;
    }
    .game_type_count {
      display: inline-block;
      margin-left: 6px;
      vertical-align: middle;
      font-size: 14px;
      line-height: normal;
      color: #53586b;
    }
  }
  .morebtn {
    position: absolute;
    height: 81px;
    width: 44px;
    right: 0;
    top: 0;
    box-sizing: border-box;
    border-left: 1px solid   #17191f;
    text-align: center;
    transition: background-color 0.3s;
    cursor: pointer;
    &:hover {
      background: @color_3;
    }
    &:hover span {
      color: @color_4;
    }
    span{
      font-size: 14px;
    }
    .more {
      background:@newegame_icons no-repeat;
      background-position: -67px -253px;
      width: 18px;
      height: 21px;
      margin:20px auto 8px;
      transition: transform 0.3s;
    }
  }
  .showmore {
    .morebtn {
      background: @color_3;
      span {
        color: @color_4;
      }
    }
    .more{
      background-position: -67px -354px;
      transform: rotateZ(-180deg);
    }
    .morebtn {
      border-bottom: 1px solid   #17191f;
    }
  }
  .header_shadow {
    left: 0;
    position: absolute;
    bottom: 0;
    height: 20px;
    margin-bottom: 10px;
    background: url("../../assets/shadow.png") repeat-x left top;
  }
}
@keyframes amt_moneytxt {
  0% { opacity: 1; }
  100% { opacity: 0; }
}
</style>
