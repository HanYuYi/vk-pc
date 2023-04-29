<template>
  <div class="game_left container_aside">
    <!--热门赛事-->
    <transition name="gameLeft">
      <div class="con_box left_game_list"  v-show="isShowRight">
        <div class="select_con">
          <ul class="clearfix">
            <li  v-for="item in gameLeftTypeList"
                 :key="item.id"
                 :class="[{'active':item.id == gameLeftCurrentType}]"
                 @click="gameLeftTypeSelect(item.id)">
              <img :src="item.imgurl" alt="" onerror="this.src='/pc_static/defaultimg/logo_88.png';this.onerror=null">
            </li>
          </ul>
        </div>
        <div class="left_list">
          <div class="loader small" v-show="leftGameListLoad"><span></span></div>
          <ul v-show="showLeftGameList">
            <li class="list_game_box clearfix"
                v-for="item in leftGameDataList"
                :key="item.id"
                :class="[{'early':item.category_id === 1,'live':item.category_id === 3,'indemnity':item.category_id === 2}]"
                @click="gotoShowGameItemDetail(item)">
              <div class="game_bet_type_mark"></div>
              <div class="game_icon" >
                <img :src="item.game_logo" alt="" onerror="this.src='/pc_static/defaultimg/logo_88.png';this.onerror=null">
              </div>
              <div class="team" :title="item.team_name_1"> {{item.team_name_1}} </div>
              <div class="bo" v-if="item.bo == 0"> VS </div>
              <div class="bo" v-else> BO{{item.bo}} </div>
              <div class="team" :title="item.team_name_2"> {{item.team_name_2}} </div>
              <div class="time_info"> {{item.timeshow}} </div>
            </li>
          </ul>
          <div class="no_data" v-if="leftNoDataShow"><span>{{$t("Temporarily_no_data")}}</span></div>
        </div>
      </div>
    </transition>
    <!--排行榜-->
    <div
      v-show="isShowRight"
      class="con_box  user_top_list_content"
      id="topUserList"
      :class="{'top_user_list_fiexed':topUserFixed}"
      v-if="userTopList.length>0">
      <div class="select_con">
        {{$t("Beacon_list")}}
      </div>
      <div class="user_top_list left_list">
        <div class="loader small" v-show="userTopListLoad"><span></span></div>
        <ul>
          <li class="top_list_box clearfix" v-for="(item, index) in userTopList" :key="index">
            <div class="top_mark_icon" v-if="index<3"
                 :class="{'first':index===0,'second':index===1,'third':index===2}">
            </div>
            <div class="top_user_headimg fl" >
              <img :src="item.head_image" alt="">
            </div>
            <div class="user_name_level fl">
              <span class="info_wrapper">
                <i class="name">{{item.username}}</i>
                <div class="user_level" :class="'lv' + item.user_lever"><span></span></div>
              </span>
            </div>
            <div class="user_win fl">
              {{item.sumbonus}}
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>
import { formatCountTime } from "../../utils/util";
export default {
  name: "gamerightlist",
  data() {
    return {
      topUserFixed:false,
      gameLeftTypeList: [
        {code: 'all',id: 0,imgurl:'/pc_static/defaultimg/0icon.png',},
        {code: 'dota2',id: 2,imgurl:'',},
        {code: 'lol',id: 1,imgurl:'',},
        {code: 'csgo',id: 3,imgurl:'',},
        {code: 'koh',id: 16,imgurl:'',}
      ],
      headTopCurrentCode:"",
      userTopListLoad:false,
      userTopList:[],
      gameLeftCurrentType: 0,
      leftNoDataShow: false,
      leftGameListLoad: false,
      showLeftGameList: false,
      leftGameDataList:[],
      isShowRight:true,
      userTopListOffsetTop: '',
      headerOffsetTop:0,
      //因为在定时器中的国际化取不到，this的指向问题
      dateinter:[this.$t("Minutes_later")
        , this.$t("minutes")
        , this.$t("Hours_later")
        ,  this.$t("hours")
        , this.$t("day")
        , this.$t("Days_later")
        , this.$t("In_the_game")
      ]
    };
  },
  mounted() {
    this.headerOffsetTop = document.querySelector('#fixedHeader').offsetTop
    this.loadLeftGameList()
    this.loadUserTopList()
    this.EventBus.$on('loadLeftGameList',code => {this.loadLeftGameList(code)})
    this.EventBus.$on('gameLeftTypeListImg',data => {this.gameLeftTypeListImg(data)})
    this.EventBus.$on('hideShowCart',val=> {this.isShowRight = true})
    this.EventBus.$on('showGameCartList',()=> {this.isShowRight = false})
    //在詳情中选择盘口投注会显示购物车
    this.EventBus.$on('handleBetPointBoxClick',()=> {this.isShowRight = false})
    //当彩池盘、固赔等类型改变时，热门赛事默认选中第一个
    this.EventBus.$on('topTypeChange',()=> { this.gameLeftCurrentType = 0})
    this.EventBus.$on('gamerightlistScroll',(scrollTop)=> { this.gamerightlistScroll(scrollTop)})
  },
  beforeDestroy(){
    this.EventBus.$off('loadLeftGameList')
    this.EventBus.$off('gameLeftTypeListImg')
    this.EventBus.$off('hideShowCart')
    this.EventBus.$off('showGameCartList')
    this.EventBus.$off('handleBetPointBoxClick')
    this.EventBus.$off('topTypeChange')
    this.EventBus.$off('gamerightlistScroll')
  },
  methods: {
    //周明灯榜吸顶
    gamerightlistScroll(scrollTop) {
      let userTopListOffsetTop = ''
      if(document.querySelector('#topUserList')){
        userTopListOffsetTop = this.userTopListOffsetTop ? this.userTopListOffsetTop : document.querySelector('#topUserList').offsetTop
      }
      if(userTopListOffsetTop){
        if(scrollTop > (userTopListOffsetTop - this.headerOffsetTop -126)){
          this.topUserFixed = true
        }else {
          this.topUserFixed = false
        }
      }
    },
    //榜单顶部图片从头部的游戏类型列表中取
    gameLeftTypeListImg(data) {
      data.forEach((item) => {
        this.gameLeftTypeList.forEach(type => {
          if(item.id == type.id) {
            type.imgurl = item.icon_hover
          }
        })
      })
    },
    gotoShowGameItemDetail(x) {
      this.EventBus.$emit('toShowGameItemDetail',x)
    },
    //请求用户排行榜
    loadUserTopList () {
      this.userTopListLoad = true
      this.$http(this.ApiSetting.newEgame.getUserTopList)
        .then((res) => {
          if(res.status === 1){
            if(res.data.length > 0){
              this.userTopList = res.data
            }
          }
          this.userTopListLoad = false
        }, (err) => {
          this.userTopListLoad = false
        })
    },
    //热门赛事的根据游戏类型筛选
    gameLeftTypeSelect (x) {
      this.gameLeftCurrentType = x
      this.loadLeftGameList ()
    },
    //请求热门赛事
    loadLeftGameList (code) {
      this.leftGameListLoad = true
      this.leftNoDataShow = false
      this.showLeftGameList = false
      code && (this.headTopCurrentCode = code)
      //固赔和滚盘的category_id传2 其他传1
      let data = {
        game_type_id: this.gameLeftCurrentType,
        category_id: this.headTopCurrentCode == "fix" || this.headTopCurrentCode == "live" ? 2 : 1
      }
      this.$http(this.ApiSetting.newEgame.getLeftGameData, data)
        .then((res) => {
          if(res.status === 1){
            this.leftGameDataList = []
            if(res.data.length > 0){
              this.leftGameDataList = res.data.length > 10? this.initLeftGameDataList(res.data.slice(0, 10)):this.initLeftGameDataList(res.data)
              this.showLeftGameList = true
            }else{
              this.leftNoDataShow = true
            }
          }
          this.$nextTick(()=>{
            // this.userTopListOffsetTop = document.querySelector('#topUserList') ? document.querySelector('#topUserList').offsetTop : false
            this.userTopListOffsetTop = 20 + 40 + this.leftGameDataList.length*60 + 272;
          })
          this.leftGameListLoad = false
        }, (err) => {
          this.leftGameListLoad = false
        })
    },
    initLeftGameDataList (data) {
      this.initLeftGameDataListSet(data)
      clearInterval(this.leftInter)
      this.leftInter = setInterval(() => {
        this.initLeftGameDataListSet(data)
      }, 1000);
      return data
    },
    initLeftGameDataListSet(data) {
      data.forEach((v, i) => {
        if(v.game_start_time*1000>new Date().getTime()){
          let tempCountDownTime = parseInt(Math.abs(v.game_start_time*1000 - new Date().getTime())/1000);
          var time = formatCountTime(tempCountDownTime)
          if(!/\:/.test(time)) {
            return;
          }else{
            time = time.split(":");
          };
          if (parseInt(time[0])) {//表示有时分秒
            var h = (time[0]) * 1, m = (time[1] ) * 1;
            if( Math.floor( h / 24 ) > 1 ){//超过24小时显示多少天后
              v.timeshow = (h /24).toFixed(0) + this.dateinter[5]
            }else{//显示多少小时后
              v.timeshow = h + this.dateinter[2]
            }
          } else  {//表示只有分秒，显示多少分钟后
            if((time[1]) * 1) {
              v.timeshow = (time[1]) * 1 + this.dateinter[0]
            }
          }
        }else {//显示比赛中
          v.timeshow = this.dateinter[6];
        }
      })
    },
  }
};
</script>

<style scoped lang="less">
.game_left {
  width: 252px;
  float: right;
  padding-bottom: 20px;
  &.container_aside {
    .loader {
      &.small {
        padding: 10px 0;
      }
    }
  }
  &.fixed {
    position: fixed;
    top: 226px;
  }
  .con_box {
    .select_con {
      height: 40px;
      line-height: 40px;
      background-color: #262933;
      padding: 0 1px;
      color: #07f1b7;
      font-size: 18px;
    }
    &.left_game_list {
      .select_con {
        li {
          width: 36px;
          margin: 0 7px;
          font-size: 18px;
          color: #07f1b7;
          text-align: center;
          opacity: .5;
          cursor: pointer;
          float: left;
          transition: opacity .2s ease-in-out;
          position: relative;
          &.active,&:hover {
            opacity: 1;
          }
          &.active {
            border-bottom: #07eaea;
          }
          &.active:after {
            content: '';
            position: absolute;
            width: 100%;
            height: 2px;
            left: 0;
            bottom: 0;
            background-color: #07eaea;
            background-image: -webkit-gradient(linear, right top, left top, from(#07f1b7), to(#07e9f1));
            background-image: linear-gradient(-90deg, #07f1b7 0%, #07e9f1 100%);
            animation: aw linear 0.3s;
          }
          img {
            width:28px;
            height: 28px;
            &[lazy=error],&[lazy=loading] {
              width:28px;
              height: 22px;
            }
          }
        }
      }
      .left_list {
        li {
          &:hover {
            .time_info {
              color: #07f1b7;
            }
          }
          & > div {
            float: left;
            text-align: center;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
          .game_icon {
            width: 30px;
            box-sizing: border-box;
            padding: 0 2px;
            img {
              max-width: 100%;
              max-height: 42px;
            }
          }
          .team {
            width: 55px;
            padding: 0 2px;
          }
          .bo {
            width: 32px;
            margin: 0 3px;
          }
          .time_info {
            width: 60px;
            text-align: right;
            box-sizing: border-box;
            padding: 0 2px;
          }
        }
      }
    }
    .left_list {
      display: block;
      background-color: rgba(0,0,0,.4);
      .no_data {
        background-color: rgba(0,0,0,.4);
        text-align: center;
        line-height: 60px;
      }
      li {
        padding: 0 3px;
        height: 60px;
        line-height: 60px;
        box-sizing: border-box;
        border-top: 1px solid #17191f;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        &:hover {
          background: url("../../assets/icon_es.png") no-repeat;
          background-position: -568px -381px;
        }
      }
    }
    &.user_top_list_content {
      margin-top: 20px;
      &.top_user_list_fiexed {
        position: fixed;
        top: 112px;
        width: 252px;
      }
      .select_con {
        padding: 0 20px;
      }
      .left_list {
        li {
          padding: 0 10px;
          color: #7c839f;
          overflow: hidden;
          position: relative;
          .top_mark_icon {
            position: absolute;
            left: 0;
            top: 0;
            width: 44px;
            height: 44px;
            background: url("../../assets/icon_es.png") no-repeat;
            &.first {
              background-position: -1366px -144px;
            }
            &.second {
              background-position: -1429px -144px;
            }
            &.third {
              background-position: -1492px -144px;
            }
          }
          .top_user_headimg {
            width: 40px;
            text-align: center;
            img {
              width: 32px;
              height: 32px;
              border-radius: 50%;
            }
          }
          .user_name_level {
            padding: 0 5px;
            width: 110px;
            .info_wrapper {
              display: inline-block;
              width: 100%;
              line-height: 20px;
              vertical-align: top;
              padding-top: 8px;
              .user_level {
                text-align: left;
              }
              .name {
                display: inline-block;
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                line-height: 20px;
              }
            }
          }
          .user_win {
            text-align: right;
            width: 72px;
            white-space: nowrap;
          }
        }
      }
    }
    &.live_pre {
      margin-bottom: 20px;
      .select_con {
        padding: 0 20px;
      }
    }
  }
}
.gameLeft-leave-active {
  animation: gamel .5s;
}
@keyframes gamel {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-100%);
    opacity: 0;
  }
}

</style>
