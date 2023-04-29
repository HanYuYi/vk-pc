<template>
  <!--赛事详情-->
  <div v-show="gameBetDetailDialog.visible"
     class="game_item_detail fll"
     :class="{'head_fix_detail':isHeaderFixed}"
     :style="{marginTop:detailFixed?'60px':''}">
    <div class="detail_alert_head clearfix" slot="title"
       :class="{'early':gameItemData.category_id === 1,'live':gameItemData.category_id === 3,'indemnity':gameItemData.category_id === 2}"  >
      <div class="bet_type_mark"><span v-if="gameItemData.category_id === 1">{{$t("Choi_ChiPan")}}</span><span v-if="gameItemData.category_id === 2">{{$t("Solid_compensate")}}</span></div>
      <div class="close_btn flr" @click="closeGameBetDetailDialogBig"></div>
      <!-- <div class="close_btn flr" @click="reLoadGameItemDetail" :class="{'loading': gameBetDetailDialog.load}"></div> -->
      <div class="game_type_icon fll" >
        <img :src="gameItemData.game_logo" alt="">
        <span class="game_event_name">{{gameItemData.event_name}}</span>
      </div>
    </div>
    <!-- <div class="game_item_load_box" v-if="gameBetDetailDialog.load">
      <span></span>
    </div> -->
    <div class="bet_dialog_main"  >
      <div class="game_bet_info clearfix">
        <div class="game_info_box game_name_info">
          <!-- <div class="game_event_name">{{gameItemData.event_name}}</div> -->
          <div class="game_desc">{{gameItemData.desc}}</div>
        </div>
        <div class="game_info_box game_team_info clearfix">
          <div class="team_info fll left clearfix">
            <span class="team_name" :title="gameItemData.team_name_1">{{gameItemData.team_name_1}}</span>
            <span class="team_icon" ><img :src="gameItemData.team_logo_1" alt="img"></span>
          </div>
          <div class="team_score fll">
            <div class="top"><span v-if="gameItemData.bo == 0">VS</span><span v-else>BO{{gameItemData.bo}}</span></div>
            <div class="score_wrapper">
              <div v-if="gameItemData.is_finish === 1||gameItemData.is_del === 1" class="score_wrapper_box">
                <span class="score_box fll" :class="{'big':gameItemData.score_1>gameItemData.score_2}">{{gameItemData.score_1}}</span>
                <i class="fll">:</i>
                <span class="score_box fll" :class="{'big':gameItemData.score_2>gameItemData.score_1}">{{gameItemData.score_2}}</span>
              </div>
              <div class="team_rate_wrapper clearfix" v-else>
                <div class="team_rate_box left">{{gameItemData.team_percentage_1?gameItemData.team_percentage_1:$t("Data_deficiencies")}}</div>
                <div class="team_rate_box right">{{gameItemData.team_percentage_2?gameItemData.team_percentage_2:$t("Data_deficiencies")}}</div>
              </div>
            </div>
            <div class="game_live_video" v-if="gameItemData.media_type==0">
              <a :href="gameItemData.videoUrl" target="_blank" class="watch"  :title="$t('live')" v-if="gameItemData.is_end!=1&&gameItemData.is_jump === 1&&gameItemData.videoUrl"></a>
              <span :title="$t('live')" @click="handleGameVideo()" class="watch" v-if="gameItemData.is_end!=1&&gameItemData.is_jump !== 1&&gameItemData.videoUrl"></span>
            </div>
            <div class="game_live_video" v-else>
              <span :title="$t('live')" @click="mediaDPlayer()" class="watch" v-if="gameItemData.is_end!=1&&gameItemData.is_jump !== 1&&gameItemData.videoUrl"></span>
            </div>
          </div>
          <div class="team_info fll right clearfix">
            <span class="team_icon" ><img :src="gameItemData.team_logo_2"  alt="img"></span>
            <span class="team_name " :title="gameItemData.team_name_2">{{gameItemData.team_name_2}}</span>
          </div>
        </div>
        <div class="game_info_box game_time_info_wrapper">
          <div class="game_time_info">
            <!-- <span class="game_favorite" v-if="isLogin" :class="{'actived': gameItemData.is_favorite===1}" @click="gameItemFavoriteClick(gameItemData)"></span> -->
            <span class="game_time_show" :class="{'countdown':gameItemData.countDown}">{{gameItemData.timeShow}}</span>
          </div>

          <div class="game_status">
            <span class="gaming" v-if="gameItemData.gameStatus==='gaming'">{{$t("underway")}}</span>
            <span class="end" v-if="gameItemData.gameStatus==='end'">{{$t("Has_ended")}}</span>
            <span class="cancel" v-if="gameItemData.gameStatus==='cancel'">{{$t("Has_been_cancelled")}}</span>
            <span class="guessing" v-if="gameItemData.gameStatus==='guessing'">{{$t("In_the_quiz")}}</span>
          </div>
        </div>
      </div>
      <div class="game_video_wrapper" v-show="gameBetDetailDialog.showVideo" v-html="gameVideoHtml"></div>
      <div class="video_live" :class="{'mini_stream':mediaPlay1Fixed}" >
        <div class="titie_bar" v-show="mediaPlay1Fixed && mediaPlay1"><span class="close" @click="mediaPlay1=false;mediaPlay1Fixed=false"></span></div>
        <div class="videobox_wrapper" id="dplayer" v-show="mediaPlay1" > </div>
      </div>
      <transition name="tfade">
        <div v-show="!gameBetDetailDialog.resLoadFail" class="game_list_view">
          <!--局数-->
          <div class="game_list_nav clearfix"
            :class="{'game_list_nav_fixed':detailFixed}"
            :style="{top: detailFixed?(showMoreGameType?(40 +styleHeight) +'px':'120px'):'',left:detailFixed?detailleft +'px':''}">
            <div @click="handleTabMove(1)" class="prev_btn op_btn" :class="{'disabled':tabListIndex == 0?true:false}"  v-if="gameItemData.points&&gameItemData.points.length>6 "><span></span></div>
            <div @click="handleTabMove(2)" class="next_btn op_btn" :class="{'disabled':tabListIndex == gameItemData.points.length-6?true:false}" v-if="gameItemData.points&&gameItemData.points.length>6"><span></span></div>
            <div class="nav_tab fll">
              <div class="tab_list "
                 :class="{'more_length':gameItemData.points&&gameItemData.points.length<6}"
                :style="{width: tabListWidth + 'px', transform: 'translateX(-'+ (tabListIndex*tabListBoxWidth) +'px)'}" >
                <div class="progress" v-show="gameItemData.gameStatus!='end' && gameItemData.points&&gameItemData.points.length" :style="{width:firstGuessingId*tabListBoxWidth +'px'}">
                  <div class="proimage" ></div>
                </div>
                <div class="tab_list_box"
                  v-for="(item, index) in gameItemData.points" :key = index
                 :class="{'actived':currentMatchNavId == item.index}"
                 @click="handleMatchNavSelect(item)"
                 @mouseenter="item.visible = true"
                 @mouseleave="item.visible = false"
                 >
                <span class="box_name"> {{item.navTitle}}</span>
                  <el-popover
                  :popper-options = "popOptions"
                  trigger="manual"
                  v-model="item.visible"
                  popper-class="tab_list_popover"
                  :disabled="!item.countDownFlag || firstGuessingId !== item.index"
                  :content="item.tempCountDownTime"
                  transfer="true"
                  placement="top">
                        <span slot="reference"  v-if="item.countDownFlag && firstGuessingId == item.index" class="countdowngif"></span>
                  </el-popover>

                </div>

              </div>
            </div>
            <div class="refresh_point flr" v-show="gameItemData.gameStatus!=='end' && gameItemData.points && gameItemData.points.length">
              <span class="loader" v-if="gameBetDetailDialog.pointLoad"></span><span class="refresh_btn" @click="reloadPoints" v-else>{{$t("The_odds_to_refresh")}}</span>
            </div>
             <div v-show="detailFixed" class="close_btn flr" @click="closeGameBetDetailDialogBig"></div>
          </div>
          <!--盘口-->
          <div class="game_list_detail">
            <div class="detail_content">
              <div class="game_play_bet_box" v-for="bigitem in gameItemData.points"   :key="bigitem.navTitle">
                <div class="game_ju">{{bigitem.navTitle}}</div>
                <!--'score_play'样式原来的比分一行排四个-->
                <!-- <div v-for="item in bigitem" class="game_points" :class="[{'score_play':item.team_points.length>2},item.matchStatus]" :key="item.id"> -->
                <div v-for="item in bigitem" class="game_points" :class="item.matchStatus" :key="item.id">
                  <div class="play_name_box">
                    <span class="play_name">{{item.play_name}}</span>
                    <!-- <span class="play_name_score" v-if="item.ext_type === 6">({{item.team_name_1}} - {{item.team_name_2}})</span> -->
                  </div>
                  <div class="game_bet_point clearfix" >
                    <div class="bet_point_box" v-for="(betpoint,index) in item.team_points" :key="index"
                      :class="{'actived':betpoint.actived, 'win': item.winner == betpoint.ext,'lose':item.winner && item.winner != betpoint.ext}"
                      @click="toHandleBetPointBoxClick(item, betpoint,bigitem.navTitle)">
                      <span class="team_name ellips">{{betpoint.desc}}</span>
                      <span class="team_point" v-if="(item.matchStatus!=='pause')">{{betpoint.point | formatNumberPad}}</span>
                      <i class="down_up_anit" :class="{'down_points': betpoint.smallAnimt, 'up_points': betpoint.bigAnimt}"></i>
                      <div class="bet_game_status"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="all_no_more" v-show="gameItemData.points && gameItemData.points.length">
              </div>
              <div class="game_play_bet_box noda" v-show="gameItemData.points && !gameItemData.points.length">{{$t("No_betting_slots")}}</div>
            </div>
          </div>
        </div>
      </transition>
        <div v-show="gameBetDetailDialog.resLoadFail" class="game_no_detail">
          <span class="fail_txt">{{$t("Failed_to_load")}}</span>
          <div @click="reloadDetail()" class="fail_btn">{{$t("reload")}}</div>
        </div>
      </div>
    </div>
</template>

<script>
import Hls from "hls.js";
import 'dplayer/dist/DPlayer.min.css';
import DPlayer from 'dplayer';
// import videojs from 'video.js'
import {  formatDate, formatCountTime, base64decode,formatNumberFloatPad } from '../../utils/util'
import storage from '@/utils/storage'
export default {
  name: "gamedetail",
  data() {
    return {
      mediaPlay1:false,
      allPoint:{},
      gameVideoHtml:'',
      currentMatchNavId:'',
      detailFixed:false,
      oldscrolltop:0,
      allpointload:false,
      curgameItme:{},
      popOptions: {
        removeOnDestroy: true
      },
      gameItemData:{},
      showMoreGameType:false,
      styleHeight:80,
      detailleft:'',
      gameBetDetailDialog: {
        resLoadFail:false,
        visible: false,
        class: 'game_item_detail',
        load: false,
        pointLoad: false,
        showVideo: false,
      },
      tabListIndex: 0,
      tabListBoxWidth: 109,
      tabListWidth:0,
      firstGuessingId:0,
      second60:60000,
      second10:10000,
      jushu:[this.$t("General_administration_of"),this.$t("The_first_inning"),this.$t("The_second_inning"),this.$t("The_third_inning"),this.$t("The_fourth")
      ,this.$t("The_fifth_game"),this.$t("The_sixth_inning"),this.$t("The_seventh_inning"),this.$t("The_eighth_inning"),this.$t("The_ninth_inning")
      ,this.$t("The_tenth_bureau"),this.$t("the_11th_bureau"),this.$t("the_12th_bureau"),this.$t("the_13th_bureau"),this.$t("the_14th_bureau"),this.$t("the_15th_bureau"),this.$t("the_16th_bureau")
      ],
      myPlayer:null,
      mediaPlay1Fixed:false,
      hls:null
    };
  },
 props: {
   isHeaderFixed:{
     default:false,
     type:Boolean
   }
 },
  watch: {
    isHeaderFixed(val) {
      this.isHeaderFixed = val
    },
    $route: {
      handler: function(val, oldVal){
        if(val.name == "newegame" && oldVal.name == "newegame") {
          if(!this.getGameId){
            this.closeGameBetDetailDialog()
          }else{
            this.getAllPoints()
            this.loadGameItemDetailList(1)
          }
        }
      },
      // 深度观察监听
      deep: true
    },
    "gameBetDetailDialog.visible":function(val) {
      this.EventBus.$emit('gameDataListShow',val)
      if(!val) {
        clearInterval(window.earlyTimer)
        clearInterval(window.liveTimer)
      }
    },
  },
  computed: {
    getGameId () {
      return this.$route.query.id
    },
    category_id () {
      return this.$route.query.category_id
    },
    getSort () {
      return this.$route.params.sort ? this.$route.params.sort:0
    },
  },
  filters: {
    formatNumberPad (num) {
      return formatNumberFloatPad(num)
    },
  },
  mounted() {
    this.getAllPoints()
    this.loadGameItemDetailList()
    setTimeout(() => {
      this.handleResize()
    }, 1000);
    window.addEventListener('resize', this.handleResize)
    this.EventBus.$on('pointActivedChange',list => {this.pointActivedChange(list)})
    this.EventBus.$on('closeGameBetDetailDialog',()=>{ this.closeGameBetDetailDialog() })
    this.EventBus.$on('showGameItemDetail',(x)=>{ this.showGameItemDetail(x)})
    this.EventBus.$on('gamedetailScroll',(x)=>{ this.gamedetailScroll(x)})
    this.EventBus.$on('showMoreGameType',val=>{this.showMoreGameType = val})
    this.EventBus.$on('styleHeight',val=>{this.styleHeight = val})
    this.EventBus.$on('topTypeChange',()=>{
      if(this.gameBetDetailDialog.visible) {
       this.$router.push({name: 'newegame',replace:true})
       this.closeGameBetDetailDialog()
      }
    })
  },
  beforeDestroy(){
    this.EventBus.$off('pointActivedChange')
    this.EventBus.$off('closeGameBetDetailDialog')
    this.EventBus.$off('showGameItemDetail')
    this.EventBus.$off('gamedetailScroll')
    this.EventBus.$off('showMoreGameType')
    this.EventBus.$off('styleHeight')
    this.EventBus.$off('topTypeChange')
    // const videoDom = this.$refs.videoRef;   //不能用document 获取节点
    // videojs(videoDom).dispose();
    // this.myPlayer && this.myPlayer.dispose();
    if(this.hls) {
      this.hls.destroy();
    }
    this.myPlayer && this.myPlayer.destroy();
  },
  destroyed () {
    window.removeEventListener('resize', this.handleResize)
    this.closeGameBetDetailDialog()
  },
  methods: {
    mediaDPlayer() {
      this.mediaPlay1 = !this.mediaPlay1;
      if(!this.mediaPlay1 && this.myPlayer) {
        this.mediaPlay1Fixed = false;
        if(this.hls) {
          this.hls.destroy();
        }
        this.myPlayer && this.myPlayer.destroy();
        return;
      }
      let _this = this
      this.myPlayer = new DPlayer({
          container: document.querySelector('#dplayer'),
          autoplay:true,
          // lang:getCookie('lang')==1?'en':'zh-cn',
          video: {
              url: this.gameItemData.videoUrl,
              type: 'customHls',
              customType: {
                  customHls: function(video, player) {
                      _this.hls = new Hls();
                      _this.hls.loadSource(video.src);
                      _this.hls.attachMedia(video);
                  },
              },
          },
      });
      this.myPlayer.play()
    },
    mediaPlay() {
      this.mediaPlay1 = !this.mediaPlay1;
      if(!this.mediaPlay1 && this.myPlayer) {
        this.mediaPlay1Fixed = false;
        // this.myPlayer.dispose();
        return;
      }
      document.querySelector(".game_video_wrapper.videobox_wrapper").innerHTML =
       `<video autoplay
        id="videobox" class="video-js" controls preload="auto" width="968" height="498">
        <source   type='application/vnd.apple.mpegurl'>
        <p class="vjs-no-js">不支持播放</p>
      </video>`;
      Element.prototype.trigger = function(eventName){
          this.dispatchEvent(new Event(eventName));
      }
      videojs.addLanguage('zh-CN', {
        "Play": "播放",
        "Pause": "暂停",
        "Current Time": "当前时间",
        "Duration": "时长",
        "Remaining Time": "剩余时间",
        "Stream Type": "媒体流类型",
        "LIVE": "直播",
        "Loaded": "加载完毕",
        "Progress": "进度",
        "Fullscreen": "全屏",
        "Non-Fullscreen": "退出全屏",
        "Mute": "静音",
        "Unmute": "取消静音",
        "Playback Rate": "播放速度",
        "Subtitles": "字幕",
        "subtitles off": "关闭字幕",
        "Captions": "内嵌字幕",
        "captions off": "关闭内嵌字幕",
        "Chapters": "节目段落",
        "Close Modal Dialog": "关闭弹窗",
        "Descriptions": "描述",
        "descriptions off": "关闭描述",
        "Audio Track": "音轨",
        "You aborted the media playback": "视频播放被终止",
        "A network error caused the media download to fail part-way.": "网络错误导致视频下载中途失败。",
        "The media could not be loaded, either because the server or network failed or because the format is not supported.": "视频因格式不支持或者服务器或网络的问题无法加载。",
        "The media playback was aborted due to a corruption problem or because the media used features your browser did not support.": "由于视频文件损坏或是该视频使用了你的浏览器不支持的功能，播放终止。",
        "No compatible source was found for this media.": "无法找到此视频兼容的源。",
        "The media is encrypted and we do not have the keys to decrypt it.": "视频已加密，无法解密。",
        "Play Video": "播放视频",
        "Close": "关闭",
        "Modal Window": "弹窗",
        "This is a modal window": "这是一个弹窗",
        "This modal can be closed by pressing the Escape key or activating the close button.": "可以按ESC按键或启用关闭按钮来关闭此弹窗。",
        ", opens captions settings dialog": ", 开启标题设置弹窗",
        ", opens subtitles settings dialog": ", 开启字幕设置弹窗",
        ", opens descriptions settings dialog": ", 开启描述设置弹窗",
        ", selected": ", 选择",
        "captions settings": "字幕设定",
        "Audio Player": "音频播放器",
        "Video Player": "视频播放器",
        "Replay": "重播",
        "Progress Bar": "进度条",
        "Volume Level": "音量",
        "subtitles settings": "字幕设定",
        "descriptions settings": "描述设定",
        "Text": "文字",
        "White": "白",
        "Black": "黑",
        "Red": "红",
        "Green": "绿",
        "Blue": "蓝",
        "Yellow": "黄",
        "Magenta": "紫红",
        "Cyan": "青",
        "Background": "背景",
        "Window": "视窗",
        "Transparent": "透明",
        "Semi-Transparent": "半透明",
        "Opaque": "不透明",
        "Font Size": "字体尺寸",
        "Text Edge Style": "字体边缘样式",
        "None": "无",
        "Raised": "浮雕",
        "Depressed": "压低",
        "Uniform": "均匀",
        "Dropshadow": "下阴影",
        "Font Family": "字体库",
        "Proportional Sans-Serif": "比例无细体",
        "Monospace Sans-Serif": "单间隔无细体",
        "Proportional Serif": "比例细体",
        "Monospace Serif": "单间隔细体",
        "Casual": "舒适",
        "Script": "手写体",
        "Small Caps": "小型大写字体",
        "Reset": "重置",
        "restore all settings to the default values": "恢复全部设定至预设值",
        "Done": "完成",
        "Caption Settings Dialog": "字幕设定视窗",
        "Beginning of dialog window. Escape will cancel and close the window.": "开始对话视窗。离开会取消及关闭视窗",
        "End of dialog window.": "结束对话视窗",
        "Seek to live, currently behind live": "试图直播，当前延时播放",
        "Seek to live, currently playing live": "试图直播，当前实时播放",
        "progress bar timing: currentTime={1} duration={2}": "{1}/{2}",
        "{1} is loading.": "正在加载 {1}。"
      });
      // 为避免在初始化video时播放源是空的，报播放源错误，需要先给source 的src赋值
      this.myPlayer = videojs('videobox',{autoplay: true,muted:true, language:'zh-CN'});
      this.myPlayer.src({type:"application/vnd.apple.mpegurl",src:this.gameItemData.videoUrl});
      let _this = this
      this.myPlayer.ready(function(){
        _this.myPlayer.play();
        setTimeout(() => {
          let target = document.querySelector('.vjs-play-control');  // Element
          target.trigger('click');
          setTimeout(() => {
            target.trigger('click');
          }, 1000);
        }, 2000);
      });

    },
    //当购物车里数据发生变化时，详情中的盘口选中状态变化
    pointActivedChange(id) {
        Array.isArray(this.gameItemData.points) && this.gameItemData.points.forEach((m, n) => {
          m.forEach((a, b) => {
            a.team_points.forEach((j, k) => {
              if((id && j.id == id) || !id) {
                j.actived = false
              }
            })
          })
        })
        this.$forceUpdate()
      },
    reloadDetail() {
      this.getAllPoints()
      this.loadGameItemDetailList()
    },
    //局数滚动监听处理
    gamedetailScroll(data){
      if(data.scrollTop>280 && this.gameBetDetailDialog.visible && data.isHeaderFixed) {
         this.detailFixed = true
      }else {
        this.detailFixed = false
      }
      if(this.mediaPlay1) {
        let tmp = this.mediaPlay1Fixed;
        if(this.mediaPlay1Fixed && data.scrollTop<130) {
          this.mediaPlay1Fixed = false
        }
        if(!this.mediaPlay1Fixed && data.scrollTop >= (130 +498)) {
          this.mediaPlay1Fixed = true
        }
        if(!tmp && this.mediaPlay1Fixed && this.gameItemData.points[this.currentMatchNavId-1]) {
          this.scrollTopTo(this.gameItemData.points[this.currentMatchNavId-1].pjumpdistance + 180)
        }
      }
      let d = 180
      if(this.gameBetDetailDialog.showVideo || (this.mediaPlay1&&!this.mediaPlay1Fixed)) {
        d += 498
      }
      Array.isArray(this.gameItemData.points) && this.gameItemData.points.forEach(point=> {
        if(data.scrollTop >= point.pupjumpdistance + d) {
          this.currentMatchNavId = point.index
        }
      })
      if(this.gameItemData.points && this.currentMatchNavId < this.gameItemData.points.length - 5) {
        this.tabListIndex = this.currentMatchNavId
      }
    },
    //打开直播
    handleGameVideo () {
      this.gameVideoHtml = ''
      this.gameBetDetailDialog.showVideo = !this.gameBetDetailDialog.showVideo
      if(!this.gameBetDetailDialog.showVideo){
        return false
      }
      this.gameVideoHtml = this.gameItemData.videoUrl
    },
    //选择投注盘口到购物车
    toHandleBetPointBoxClick(gameItem, point,navTitle){
      if(!(gameItem.matchStatus=="guessing" && Object.keys(this.allPoint).length && this.gameItemData.points && this.gameItemData.points.length>0)){
        return false
      }
      let tdata = storage.get('vkbetCartList') || []
      if(tdata.length<8) {
        point.actived = !point.actived
      }
      this.$forceUpdate()
      this.EventBus.$emit('handleBetPointBoxClick',{
        gameItem:gameItem,
        point:point,
        navTitle:navTitle,
        gameItemData:this.gameItemData
      })
    },
    //局数移动
    handleTabMove (type) {
      if(type === 1){//前
        this.tabListIndex-=5
        if(this.tabListIndex<0){
          this.tabListIndex = 0
        }
      }
      if(type === 2){//后
        this.tabListIndex+=5
        if( Array.isArray(this.gameItemData.points) && this.tabListIndex>=(this.gameItemData.points.length-6)){
          this.tabListIndex = this.gameItemData.points.length-6
        }
      }
    },
    handleResize() {
      this.detailleft = (document.body.offsetWidth - 1240)/2
    },
    //请求详情数据
    loadGameItemDetailList (bool) {
      if(!this.getGameId){
        this.closeGameBetDetailDialog()
        return false
      }
      if(this.gameBetDetailDialog.pointLoad){
        return false
      }
      if(this.curgameItme) {
        this.gameItemData=  this.curgameItme
      }
      let data = {
        game_id: this.getGameId,
        is_sort: this.getSort,
        category_id:this.category_id
      }
      this.gameBetDetailDialog.load = true
      this.gameBetDetailDialog.visible = true
      this.$http(this.ApiSetting.newEgame.getGameItemPointsList, data)
        .then((res) => {
          this.gameBetDetailDialog.resLoadFail = false
          this.gameBetDetailDialog.load = false
          if(res.status === 1){
            this.gameItemData = Object.assign(this.gameItemData,this.initEgameItemData(res.data))
            this.tabListWidth = this.gameItemData.matches_num.length*this.tabListBoxWidth
            if(Object.keys(this.allPoint).length && this.gameItemData.points  && this.gameItemData.points.length) {
              this.gameItemData.points.forEach(item => {
                item.forEach(ju => {
                  if(this.allPoint[ju.id]) {
                  let t = this.allPoint[ju.id].team_points
                   t.forEach(element => {
                     if(ju.team_points) {
                       ju.team_points.forEach(jup => {
                         if(element.id == jup.id) {
                           jup = Object.assign(jup,element)
                         }
                       })
                     }
                   });
                  }
                })
              })
              this.$forceUpdate()
              // this.afterLoadDetail()
            }
            this.loaddetail(res.data);
            this.$nextTick(()=> {
              if(bool) {//点击进入时
                this.handleMatchNavSelect(this.gameItemData.points[this.currentMatchNavId])
              }else {//刷新时
                setTimeout(() => {
                  this.handleMatchNavSelect(this.gameItemData.points[this.currentMatchNavId])
                }, 500);
              }
            })
          }
        }, (err) => {
          if(err.message != "Termination") {
           this.gameBetDetailDialog.load = false
           this.gameBetDetailDialog.resLoadFail = true
          }

        })
      this.afterLoadDetail()
    },
    //详情数据加载后
    afterLoadDetail() {
      this.$nextTick(()=> {
          if(this.isHeaderFixed) {
            this.scrollTopTo(140)
          }else {
            this.scrollTopTo(0.05)
          }
      })
    },
    initEgameItemData (data) {
      clearInterval(data.timer)
      if (data.media_content) {
        data.videoUrl = base64decode(data.media_content)
      }
      data.teamHistoryLoad = false
      if (data.is_del == 1) {
        data.gameStatus = "cancel";//已取消
      }else if(data.is_end == 1){
        data.gameStatus = "end";//已结束
      }else if(data.game_start_time*1000 > new Date().getTime()) {
        data.gameStatus = "guessing";//竞猜中
      }else {
        data.gameStatus = "gaming";//比赛中
      }

      let tempCountDownTime = parseInt(Math.abs(data.game_start_time*1000 - new Date().getTime())/1000);
      if(data.gameStatus == "guessing" && data.category_id != 3 && tempCountDownTime<=3*60*60) {
        data.countDown = true
        data.tempCountDownTime = tempCountDownTime
        data.timeShow = formatCountTime( tempCountDownTime)
        data.timer = setInterval(()=> {
          data.tempCountDownTime--
          data.timeShow = formatCountTime( data.tempCountDownTime);
          if ( data.tempCountDownTime < 1) {
            clearInterval(data.timer)
            data.is_end = 0;
            data.gameStatus = "gaming"
            data.timeShow = formatDate(data.game_start_time*1000, 'yyyy/MM/dd HH:mm:ss')
            data.countDown = false
          }
          this.gameItemData = { ...this.gameItemData, ...data, };
        }, 1000);
      }else {
        data.countDown = false
        data.timeShow = formatDate(data.game_start_time*1000, 'yyyy/MM/dd HH:mm:ss')
      }

      data.matchesTitleList = []
      if(data.matches_num && Array.isArray(data.matches_num)){
        data.matches_num.forEach((m, n) => {
          let navTitle = data.need_show_round?data.round_name_json[m]:this.jushu[m]
          data.matchesTitleList.push(navTitle)
        })
      }
      if(data.points && data.points.length>0){
        this.initGameItemPoints(data)
      }
      return data
    },
    initGameItemPoints (data) {
      let d = 0
      data.points.forEach( (v, i)=> {
        clearInterval(v.timer)
         v.index = i
         let curd = 0
         v.forEach(x=> {
          //  if(x.team_points.length <=2) {
          //     curd += 70
          //  }else {

            //46是投注点“bet_point_box”的height（36px）+“bet_point_box”的margin-bottom(10px)
            //25是投注点“game_bet_point ”的margin-top（5px）+玩法名称“play_name_box”的height（20px）
             curd += Math.ceil(x.team_points.length/2)*46 + 25
          //  }
         })
         //75是局数的高度（40px）+局数的margin-bottom（15px）+整个盒子“game_play_bet_box”的margin-bottom（20px）
         curd += 75
         d += curd
         v.pjumpdistance = d
         v.pupjumpdistance = d - curd
         v.navTitle = data.matchesTitleList[i]
         v.forEach((x, y) => {
          if (x.is_del == 1 || x.is_del == 2) {
            x.matchStatus = "cancel"
            if(y === 0){
              v.parentMatchStatus = "end"
            }
          }else if (x.is_end == 1) {
            x.matchStatus = "end"
            if(y === 0){
              v.parentMatchStatus = "end"
            }
          }else if (x.is_finish == 1) {
            x.matchStatus = "clearing"
            if(y === 0){
              v.parentMatchStatus = "end"
            }
          }else if (x.sale_end_time*1000 > new Date().getTime()) {
            x.matchStatus = "guessing"
           if(y === 0){
             v.parentMatchStatus = x.matchStatus
              //局数的倒计时按照 局中的第一项来设置
             var tempCountDownTime = parseInt(Math.abs(x.sale_end_time*1000 - new Date().getTime())/1000)
             v.tempCountDownTime = formatCountTime(tempCountDownTime)
             v.countDownFlag =  true
             v.timer = setInterval( ()=> {
                 tempCountDownTime--
                 v.tempCountDownTime = formatCountTime(tempCountDownTime)
                 if (tempCountDownTime < 1) {
                   v.countDownFlag =  false
                   v.is_end = 0
                   v.parentMatchStatus = "gaming"
                   clearInterval(v.timer)
                   this.getfirstGuessingId(data)
                 }
                 this.$forceUpdate()

             }, 1000)
            }
            if(x.category_id == 3 || x.category_id == 2){
              if(x.is_danger == 1){
                x.matchStatus = "pause"
              }
            }
          } else {
            x.matchStatus = "gaming"
            if(y === 0){
              v.parentMatchStatus = x.matchStatus
            }
          }
        })
      })
      this.getfirstGuessingId(data)
      //与购物车中数据比较
      let betCartList = storage.get('vkbetCartList') || []
      for(let i=0;i<betCartList.length;i++){
        data.points.forEach((m, n) => {
          m.forEach((a, b) => {
            a.team_points.forEach((j, k) => {
              if(j.id == betCartList[i].pointId){
                j.actived = true
              }
            })
          })
        })
      }
      if(this.firstGuessingId == data.points.length) {
         this.currentMatchNavId = data.points[0].index
      }else {
         this.currentMatchNavId = this.firstGuessingId
      }
      if(this.currentMatchNavId < data.points.length - 5) {
        this.tabListIndex = this.currentMatchNavId;
      }else if(data.points.length>=6){
        this.tabListIndex = data.points.length - 6;
      }
      return data
    },
    //得到当前第一个竞猜中的id
    getfirstGuessingId(data) {
      let guessingMatchArr = []
      data.points.forEach((a, b) => {
         if(a.parentMatchStatus === "guessing"){
           guessingMatchArr.push(a.index)
         }
       })
       let newArr = guessingMatchArr.sort(function (x, y) {return x - y})
       this.firstGuessingId = newArr[0]
       if(guessingMatchArr.length == 0){
         this.firstGuessingId = data.points.length
       }
    },
    closeGameBetDetailDialogBig() {
      this.closeGameBetDetailDialog(1)
      this.$router.push({name: 'newegame',replace:true})
    },
    //关闭详情
    closeGameBetDetailDialog (bool) {
      clearInterval(window.earlyTimer)
      clearInterval(window.liveTimer)
      this.allPoint = {}
      this.gameBetDetailDialog.visible = false
      this.gameBetDetailDialog.load = false
      this.gameBetDetailDialog.pointLoad = false
      this.gameBetDetailDialog.showVideo = false;
      this.mediaPlay1 = false;
      // this.myPlayer && this.myPlayer.dispose();
      this.hls && this.hls.destroy();
      this.myPlayer && this.myPlayer.destroy();
      if(this.gameItemData.points) {
       this.gameItemData.points.forEach(item=> {
           clearInterval(item.timer);
       })
      }
      clearInterval(this.gameItemData.timer)
      this.gameItemData = []
      if(bool) {
        this.$nextTick(() => {
          this.scrollTopTo(this.oldscrolltop)
        })
      }
    },
    //加载所有的points
    getAllPoints() {
      if(!this.getGameId){
        return false
      }
      this.allpointload = true
      this.$http(this.ApiSetting.newEgame.getAllPoints, {
        game_id:this.getGameId,
        category_id:this.category_id
      })
      .then(res=> {
         if(res.status == 1) {
          this.allpointload = false
           this.allPoint = res.data
           if(Object.keys(this.allPoint).length && this.gameItemData.points && this.gameItemData.points.length>0) {
            this.gameItemData.points.forEach(item => {
              item.forEach(ju => {
                if(this.allPoint[ju.id]) {
                  let t = this.allPoint[ju.id].team_points
                  t.forEach(element => {
                    ju.team_points && ju.team_points.forEach(jup => {
                      if(element.id == jup.id) {
                        jup = Object.assign(jup,element)
                      }
                    })
                  });
                }
              })
            })
             this.$forceUpdate()
           }
         }
      })
      this.afterLoadDetail()
    },
    //局数选择
    handleMatchNavSelect (x) {
      if(x) {
        x.visible = false
        this.currentMatchNavId = x.index
      }
      let d = 180
      if(this.gameBetDetailDialog.showVideo || (this.mediaPlay1&&!this.mediaPlay1Fixed)) {
        d += 498
      }
      if(this.currentMatchNavId >0) {
        this.scrollTopTo(this.gameItemData.points[this.currentMatchNavId-1].pjumpdistance + d)
      }else {
        if(this.isHeaderFixed) {
            this.scrollTopTo(140)
        }else {
          this.scrollTopTo(0.05)
        }
      }
    },
    //scrolltop赋值
    scrollTopTo(d) {
      if(navigator.userAgent.indexOf("Edge")>-1) {
        document.body.scrollTop =  d
      }else {
        document.documentElement.scrollTop =  d
      }
    },
    //刷新赔率
    reloadPoints () {
      if(this.gameItemData.points&&this.gameBetDetailDialog.visible){
        if(this.gameBetDetailDialog.pointLoad){
          return false
        }
        let pointIds = []
         Array.isArray(this.gameItemData.points) && this.gameItemData.points.forEach((p,i) => {
            p.forEach(v => {
              if(v.matchStatus === 'guessing'||v.matchStatus === 'pause'){
                pointIds.push(v.id)
              }
            })
         })
        if(pointIds.length == 0){
          return false
        }
        let live = this.gameItemData.category_id === 3 ||  this.gameItemData.category_id === 2? 1 : 0
        let data = {
          point_ids: pointIds.join(','),
          is_liveorfix: live
        }
        this.gameBetDetailDialog.pointLoad = true
        this.$http(this.ApiSetting.newEgame.reLoadPoint, data)
          .then((res) => {
            this.gameBetDetailDialog.pointLoad = false
            if (res.status === 1) {
              let newPointArr = res.data
              for (let j = 0; j < newPointArr.length; j++) {
                let _newPointArr = newPointArr[j]
                Array.isArray(this.gameItemData.points) && this.gameItemData.points.forEach(p=> {
                 p.forEach((v, i) => {
                   if (_newPointArr.id == v.id) {
                      if(live && typeof _newPointArr.danger_status !== 'undefined'){
                        if(_newPointArr.danger_status == 1) {
                          v.is_danger = 1
                          v.matchStatus = "pause"
                        }else{
                          v.is_danger = 0
                          v.matchStatus = "guessing"
                        }
                      }
                      for (let k = 0; k < _newPointArr.team_points.length; k++){
                        v.team_points.forEach((x, y) => {
                          if (_newPointArr.team_points[k].id == x.id) {
                            if(v.matchStatus !== "pause") {
                              if (_newPointArr.team_points[k].point * 100 > x.point * 100) {
                                x.bigAnimt = true
                                setTimeout(function () {
                                  x.bigAnimt = false
                                }, 5600)
                              }
                              if (_newPointArr.team_points[k].point * 100 < x.point * 100)  {
                                x.smallAnimt = true
                                setTimeout(function () {
                                  x.smallAnimt = false
                                }, 5600)
                              }
                            }
                            x = Object.assign(x,_newPointArr.team_points[k],{point:parseFloat(_newPointArr.team_points[k].point)})
                          }
                        })
                      }
                   }
                 })
               })
              }
            }
        }, (err) => {
            this.gameBetDetailDialog.pointLoad = false
        })
      }
    },
    //加载详情的处理
    loaddetail(data,bool) {
      //当通过路由直接进入时候，可能会吧当前选择的类型返回来
      data.nav_code && this.EventBus.$emit('detailGetTopCurCode',data.nav_code);
      if(data.money_type.length>1&&data.money_type.indexOf(',') > 0){
        this.gameItemData.moneyTypeList = [
          { value: 1, name: 'RMB' },
          { value: 2, name: this.$t("Virtual_currency") } ]
      }else {
        if (data.money_type == 1) {
          this.gameItemData.moneyTypeList = [ { value: 1, name: 'RMB' }]
        }
        if (data.money_type == 2) {
          this.gameItemData.moneyTypeList = [ { value: 2, name: this.$t("Virtual_currency") }]
        }
      }
      let live = this.gameItemData.category_id === 3 || this.gameItemData.category_id === 2? 1 : 0
      if(live === 0){
        clearInterval(window.earlyTimer)
        window.earlyTimer = setInterval(() => {
            this.reloadPoints()
        }, this.second60)
      }else{
        clearInterval(window.liveTimer)
        window.liveTimer = setInterval(() => {
            this.reloadPoints()
        }, this.second10)
      }
    },
    //详情显示
    showGameItemDetail (x) {
      if(x.is_del) {
        return
      }
      this.oldscrolltop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
      this.gameBetDetailDialog.showVideo = false
      this.mediaPlay1 = false
      clearInterval(this.gameItemData.timer)
      clearInterval(window.earlyTimer)
      clearInterval(window.liveTimer)
      Array.isArray(this.gameItemData.points) && this.gameItemData.points.forEach(item=> {
        clearInterval(item.timer);
      })
      this.tabListIndex = 0
      this.curgameItme = Object.assign({},x)
      this.$router.push({name: 'newegame',  query:{id: x.id,category_id:x.category_id} },()=> {})
    },
  }
};
</script>

<style scoped lang="less">
@newegame_icons:url("../../assets/egame/newegame_icons.png");
.game_item_detail {
  background-color: #17191f;
  box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.2);
  width: 968px;
  min-height: 1000px;
  &.head_fix_detail {
    margin-top: 172px;
  }
  .bet_type_mark {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%);
    width: 60px;
    height: 26px;
    line-height: 26px;
    font-size: 14px;
    color: #ffffff;
    text-align: center;
    background-repeat: no-repeat;
    background-image: @newegame_icons;
  }
  .early {
    .bet_type_mark {
      background-position: -18px -114px;
    }
  }
  .live {
    .bet_type_mark {
      background-position: -108px -114px;
    }
  }
  .indemnity {
    .bet_type_mark {
      background-position: -197px -114px;
    }
  }
  .bet_dialog_main {
    background-color: #17191f;
  }
  .game_no_detail {
    width: 968px;
    height: 684px;
    background: url("../../assets/egame/empty_data.png") no-repeat;
    background-position: 388px 100px;
    position: relative;
    .fail_txt {
      letter-spacing: 0.4px;
      color: #53586b;
      font-size: 14px;
      position:absolute;
      left: 50%;
      top:269px;
      transform: translateX(-50%);
    }
    .fail_btn {
      width: 90px;
      height: 32px;
      border-radius: 16px;
      border: solid 1px #7c839f;
      position: absolute;
      left: 50%;
      top:330px;
      transform: translateX(-50%);
      text-align: center;
      line-height: 32px;
      transition: border-color 0.2s;
      cursor: pointer;
      &:hover {
        color: #07f1b7;
        border-color: #07f1b7;
      }
    }
  }
  .game_item_load_box {
    height: 400px;
    line-height: 400px;
    text-align: center;
    span {
      display: inline-block;
      vertical-align: middle;
      width: 100px;
      height: 100px;
      background: url("../../assets/big_loading.gif") no-repeat center;
    }
  }
  .close_btn {
    width: 21px;
    height: 21px;
    margin-top:9px;
    margin-left: 20px;
    cursor: pointer;
    background: @newegame_icons no-repeat;
    background-position: -154px -253px;
    cursor: pointer;
    &:hover {
      background-position: -154px -303px;
    }
  }
  .game_list_nav_fixed  {
    .close_btn{
      margin-right: 9px !important;
    }
    .refresh_point {
      right: 40px !important;
    }
  }
  .detail_alert_head {
    position: relative;
    padding: 0 20px;
    height: 40px;
    background-color: #262933;
    line-height: 40px;

    .game_type_icon {
      img {
        vertical-align: middle;
        max-width: 100%;
        max-height: 24px;
        margin-right: 10px;
        margin-top:-5px;
      }
      .game_event_name {
        font-size: 12px;
        color: #7c839f;
        line-height: 40px;
      }
    }
    .balance_box {
      .money_num {
        color: #fff;
        font-size: 14px;
      }
    }
    .vb_balance {
      margin-left: 20px;
    }
  }
  .game_bet_info {
    padding: 20px;
    box-sizing: border-box;
    height: 140px;
    .game_info_box {
      float: left;
      width: 142px;
      height: 100%;
      .game_desc {
        color: #575c70;
        text-overflow: ellipsis;
        box-sizing: border-box;
        padding-right: 5px;
        position: relative;
        top: 50%;
        transform: translateY(-50%) translateZ(0);
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box!important;
        -webkit-line-clamp: 5;
        line-height: 15px;
        max-height: 85px;
        line-height: 1.2;
      }
      &.game_team_info {
        width: 640px;
        box-sizing: border-box;
        padding: 0 5px;
        height: 100%;
        line-height: 100px;
        .team_info {
          .team_name {
            display: inline-block;
            width: 135px;
            vertical-align: middle;
            font-size: 22px;
            color: #fff;
            //  word-break: break-all;
            word-break: break-word;
            -ms-word-wrap: break-word;
            overflow: hidden;
            line-height: 1.4;
            overflow: hidden;
            max-height: 120px;
          }
          &.right {
            .team_name {
              text-align: right;
            }
          }
          .team_icon {
            display: inline-block;
            width: 107px;
            box-sizing: border-box;
            padding: 0 5px;
            height: 100px;
            text-align: center;
            img {
              vertical-align: middle;
              max-height: 80%;
              max-width: 100%;
            }
          }
        }
        .team_score {
          width: 136px;
          text-align: center;
          .top {
            font-size: 14px;
            height: 20px;
            line-height: 20px;
            color: #fff;
          }
          .score_wrapper {
            height: 30px;
            line-height: 30px;
            margin-top: 16px;
            .score_wrapper_box {
              font-size: 30px;
              font-weight: bold;
            }
            .team_rate_box {
              width: 50%;
              float: left;
              &.left {
                text-align: left;
              }
              &.right {
                text-align: right;
              }
            }
            .score_box {
              display: inline-block;
              width: 53px;
              text-align: center;
              vertical-align: middle;
              &.big {
                color: #fff;
              }
            }
            i {
              display: inline-block;
              width: 30px;
              text-align: center;
              vertical-align: middle;
              margin-top: -3px;
            }
          }
          .game_live_video {
            text-align: center;
            margin-top: 10px;
            line-height: normal;
            .watch {
              display: inline-block;
              width: 20px;
              height: 20px;
              cursor: pointer;
              background: @newegame_icons no-repeat;
              background-position: -201px -253px;
            }
            span {
              &:hover {
                background-position: -201px -303px;
              }
            }
          }
        }
      }
      &.game_time_info_wrapper {
        .game_time_info {
          height: 22px;
          line-height: 22px;
          text-align: right;
          white-space: nowrap;
          .game_favorite {
            display: inline-block;
            width: 20px;
            height: 20px;
            background: @newegame_icons no-repeat;
            background-position: -1223px -23px;
            vertical-align: middle;
            cursor: pointer;
            &.actived {
              background-position: -1223px -71px;
            }
          }
          .game_time_show {
            display: inline-block;
            vertical-align: middle;
            font-size: 12px;
            color: #8a8ea9;
            margin-left: 5px;
            &.countdown {
              color: #07f1b7;
              font-size: 18px;
            }
          }
        }
        .game_status {
          margin-top: 10px;
          text-align: right;
          span {
            display: inline-block;
            width: 56px;
            height: 18px;
            line-height: 18px;
            border-radius: 3px;
            font-size: 12px;
            text-align: center;
            transform: translateZ(0);
            &.guessing {
              background-color: rgba(244, 46, 24, 0.2);
              color: #f42e18;
            }
            &.gaming {
              color: #5fb97a;
              background-color: rgba(95, 185, 122, 0.2);
            }
            &.end {
              background-color: rgba(124, 131, 159, 0.2);
              color: #7c839f;
            }
            &.cancel {
              background-color: rgba(233, 159, 0, 0.2);
              color: #e99f00;
            }
          }
        }
      }
    }
  }
  .game_data_analyst {
    padding: 20px 0;
    background-color: #262933;
    .title {
      font-size: 18px;
      text-align: center;
      color: #c8cce5;
      height: 28px;
      line-height: 28px;
    }
    .data_analyst_content {
      padding: 40px 0;
      text-align: center;
      img {
        width: 30%;
      }
      p {
        text-align: center;
        font-size: 14px;
        color: #8a8ea9;
        margin-top: 20px;
      }
    }
  }
  .game_list_view {
    .game_list_nav {
      height: 43px;
      box-sizing: border-box;
      background-color: #17191f;
      border-bottom: 2px solid #262933;
      position: relative;
      &.game_list_nav_fixed  {
        position: fixed;
        width: 968px;
        z-index: 6;
        border-top: 1px solid #17191f;
        transition: top .3s;
      }
      .bottom_line {
        position:absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 2px;
        background:#262933;
      }
      .refresh_point {
        line-height: 40px;
        text-align: center;
        position: absolute;
        right: 20px;
        bottom: 0;
        .loader {
          display: inline-block;
          width: 32px;
          height: 32px;
          background: url("../../assets/btn_loader.gif") no-repeat center;
          background-size: 100% 100%;
          vertical-align: middle;
          padding: 0;
        }
        .refresh_btn {
          display: inline-block;
          cursor: pointer;
          width: 70px;
          box-sizing: border-box;
          text-align: center;
          height: 26px;
          line-height: 24px;
          border: 1px solid #7c839f;
          border-radius: 3px;
          transition: color 0.2s linear,border-color 0.2s linear;
          border-radius: 20px;
          &:hover {
            color: #07f1b7;
            border-color:#07f1b7;
          }
        }
      }
      .op_btn {
        position: absolute;
        width: 45px;
        height: 100%;
        line-height: 40px;
        cursor: pointer;
        text-align: center;
        z-index: 2;
        background-color: #262933;
        &.disabled.prev_btn,&.disabled.prev_btn:hover {
          span{
            background-position: -294px -352px;
          }
        }
        &.disabled.next_btn,&.disabled.next_btn:hover {
          span{
            background-position: -335px -352px;
          }
        }
        span {
          display: inline-block;
          vertical-align: middle;
          height: 20px;
          width: 10px;
          background: @newegame_icons no-repeat;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }
        &.prev_btn {
          left: 126px;
          top:0;
          background: @newegame_icons no-repeat;
          background-position: -19px -420px;
          height: 40px;
          span {
            left: 0;
            background-position: -294px -252px;
          }
          &:hover {
            span {
              background-position: -294px -302px;
            }
          }
        }
        &.next_btn {
          right: 126px;
          top:0;
          background: @newegame_icons no-repeat;
          background-position: -103px -420px;
          height: 40px;
          span {
            right: 0;
            background-position: -335px -252px;
          }
          &:hover {
            span {
              background-position: -335px -302px;
            }
          }
        }
      }
      .nav_tab {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 655px;
        overflow: hidden;
        height: 43px;
        box-sizing: border-box;
        .tab_list_box {
          width: 109px;
          text-align: center;
          font-size: 18px;
          height: 100%;
          position: relative;
          cursor: pointer;
          float: left;
          transition: color 0.2s ease;

          &:hover {
            .countdowngif {
              background: url("../../assets/egame/hover.gif") no-repeat;
            }
          }
          .countdowngif {
            width: 16px;
            height: 16px;
            vertical-align: middle;
            margin-top: -2px;
            background: url("../../assets/egame/normal.gif") no-repeat;
            display: inline-block;
            cursor: pointer;
            position: relative;
            transition: background 0.2s ;
            &:hover {
              background: url("../../assets/egame/hover.gif") no-repeat;
            }
          }
          .box_name {
            margin-top: 7px;
            display: inline-block;
            line-height: normal;
          }
          .game_status {
            width: 45px;
            height: 20px;
            line-height: 20px;
            border-radius: 3px;
            font-size: 12px;
            margin: auto;
            display: none;

            &.countdown {
              width:unset;
            }
          }
          &.actived {
            &:after {
              content: '';
              position: absolute;
              width: 100%;
              left: 0;
              bottom: 0;
              height: 2px;
              background-color: #07f1b7;
              animation: aw linear 0.3s;
            }
          }
        }
        .tab_list {
          position: absolute;
          top: 0;
          height: 100%;
          transition: all .5s;
          .progress {
            position: absolute;
            top:0;
            left: 0;
            width:0;
            height: 100%;
            overflow: hidden;
            transform: translate3d(0, 0, 0) translateZ(0);
            .proimage {
              background: url("../../assets/egame/progress.png");
              animation: moveSlideshow 40s linear infinite reverse;
              width:5000px;
              height: 100%;
              position: absolute;
              top:0;
              left: 0;
              transform: translate3d(0, 0, 0) translateZ(0);
            }
          }
          @keyframes moveSlideshow {
            100% {
              transform: translateX(-66%);
            }
          }
          &.more_length {
            margin: auto;
            position: relative;
            width:auto;
          }
        }
      }
    }
  }
  .game_list_detail {
    .game_play_bet_box {
      margin-bottom: 20px;
      overflow: hidden;
      .game_points {
        width: 650px;
        margin:auto;
        min-height: 70px;
      }
      .game_ju {
        width: 968px;
        background: #14151a;
        text-align: center;
        line-height: 40px;
        font-size: 14px;
        height: 40px;
        margin-bottom: 15px;
      }
      &.noda{
        text-align: center;
        margin-top: 20px;
      }

      .play_name_box {
        height: 20px;
        line-height: 20px;
        color: #fff;
        .play_name_score {
          margin-left: 5px;
          color: #7c839f;
        }
        .game_status {
          display: inline-block;
          width: 40px;
          border-radius: 3px;
          font-size: 12px;
          text-align: center;
          margin-left: 10px;
          line-height: 18px;
          height: 18px;
        }
      }
      .score_play {
        height: auto;
        .game_bet_point {
          .bet_point_box {
            width: 152px;
            .team_name {
              max-width: 25px;
            }
          }
        }
      }

    }
    .all_no_more {
      height: calc(100vh - 270px);
    }
  }

}
</style>
<style lang="less">
.new_egame .game_video_wrapper>*,.new_egame iframe{
  width: 100% !important;
  height: 498px !important;
  background-color: #262932;
}
.game_item_detail #dplayer {
  height: 498px;
}
.new_egame {
  .mini_stream {
    position: fixed;
    z-index: 1;
    left: 20px;
    bottom: 26px;
    .titie_bar {
      height: 30px;;
      width: 500px;
      background: #14161a;
      position: relative;
      .close {
        position: absolute;
        right: 3px;
        top: 4px;
        width: 32px;
        height: 32px;
        cursor: pointer;
      }
      .close:before, .close:after {
        position: absolute;
        left: 15px;
        content: ' ';
        height: 20px;
        width: 2px;
        background-color: #525668;
      }
      .close:before {
        transform: rotate(45deg);
      }
      .close:after {
        transform: rotate(-45deg);
      }
    }
    #dplayer {
      width: 500px;
      height: 280px;
      background-color: #20232b;
      // >* {
      //   height: 280px !important;
      //   background-color: transparent;
      // }
    }
  }
}
.el-dialog {
  &.game_item_detail{
    border: none;
    font-size: 12px;
    color: #7c839f;
    .el-dialog__header{
    height: 40px;
    line-height: 40px;
    color: #7c839f;
    font-size: 12px;
  }
   .el-dialog__body{
    padding-top: 0;
    color: #7c839f;
    font-size: 12px;
  }
  }
}
  video {object-fit: fill;}
</style>
