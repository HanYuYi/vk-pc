<template>
  <div v-show="gameDataListShow" class="game_right fll">
    <!-- <div class="autochess_link_box">
      <router-link to="/autochess" class="autochess_link ">
      </router-link>
      <div class="snow_box" v-for="snow in snowflakeList" :style="{left:snow.left,animationDelay:snow.delay}" :class="snow.classN" :key="snow.classname">
        <div :class="snow.imurl"></div>
      </div>
    </div> -->
    <div id="egame_list">
      <!--日期选择-->
      <div class="sort_by_date firstdate"
       v-show="gameDataListKeys.length && showDayDate"
       :class="{'fixed':isHeaderFixed}"
       :style="{top:showMoreGameType&& isHeaderFixed?dateAddTop+'px':''}">
        <div class="list_date">
          <span class="ymd">{{curtime*1000 | formatdate('yyyy/MM/dd')}}</span>
          <span class="week">{{curtime*1000 | formatWeek}}</span>
          <div @click="isShowDates = !isShowDates" class="calendar flr" :class="{'caleopen':isShowDates}" ></div>
          <div @click="dayjump(1)" class="daybtn flr" :class="{'disabled':curtime == gameDataListKeys[gameDataListKeys.length -1]}">{{$t("The_day_after")}}</div>
          <div @click="dayjump(2)" class="daybtn flr" :class="{'disabled':curtime == gameDataListKeys[0]}">{{$t("The_day_before")}}</div>
        </div>
        <div v-show="isShowDates" class="dataselect">
          <span @click="dataselectTransHeal(1)" class="date_select_arrow date_select_left" :class="{'disabled':!dataselectTrans}"></span>
          <span @click="dataselectTransHeal(2)" class="date_select_arrow date_select_right"
            :class="{'disabled': (this.gameDataListKeys.length > 7 &&this.dataselectTrans == (this.gameDataListKeys.length - 7)*128) || this.gameDataListKeys.length<=7}"></span>
          <div class="selectbox">
              <ul :style="{width:(gameDataListKeys.length*128)+'px',transform:'translateX(-'+ dataselectTrans + 'px)'}">
                <li @click="dayjump(3,keytime)" :class="{'selected':keytime == curtime}" v-for="(keytime) in gameDataListKeys" :key="keytime">
                  <span class="ymd">{{keytime*1000 | formatdate('yyyy/MM/dd')}}</span>
                  <span class="week">{{keytime*1000 | formatWeek}}</span>
                </li>
              </ul>
          </div>
        </div>
      </div>
      <!--冠军盘赛事列表-->
      <ul v-if="headTopCurrentCode=='champion'" v-for="(listitem,keytime) in gameDataList " :key="keytime" class="champion ">
        <li class="topBottom-leftRightCorner" v-for="item in listitem.gamelist" :key="item.id"
         :class="{'early':item.category_id === 1,
         'live':item.category_id === 3,
         'indemnity':item.category_id === 2,}">
          <div  class="ui-border-element">
            <div class="champion_info"  :style="{backgroundImage:'url('+item.bg+')'}">
              <div class="champion_info_top">
                <img class="fl" :src="item.game_logo" alt="">
                <span class="fl">{{item.game_name}}</span>
                <span class="fr">{{item.game_show_end_time*1000 | formatdate('yyyy/MM/dd HH:mm')}}</span>
              </div>
              <div class="champion_info_mid indemnity">
                <div class="bet_type_mark"> {{item.category_id === 2?$t("Solid_compensate"):(item.category_id === 3?'':$t("Choi_ChiPan"))}}</div>
                <div class="logo_img fl" v-lazy-container="lazyLogo"> <img :data-src="item.event_logo" alt=""> </div>
                <div class="champion_event_text fl">
                  <span class="text_l ellips" :title="item.event_name">{{item.event_name}}</span><br>
                  <span class="text_s ellips" :title="item.event_desc"> {{item.event_desc}}</span>
                </div>
                <div class="champion_event_text fl champion_event_teams">
                  <span class="text_l">{{item.team_count}}</span><br>
                  <span class="text_s"> {{$t('team_participating')}}</span>
                </div>
                <div class="line fl"></div>
                <div class="champion_event_text fl champion_event_money">
                  <span class="text_l ellips" :title="item.bonus_pool">{{item.bonus_pool}}</span><br>
                  <span class="text_s" > {{$t('Bonus_pools')}}</span>
                </div>
              </div>
              <div v-show="item.desc" class="other_desc ellips" ><span class="ellips" :title="item.desc">{{item.desc}}</span> </div>
            </div>
            <ul class="champion_team" :style="{height:item.canMore?item.minH+'px':item.maxH+'px'}">
              <li class="game_bet_point fl" v-for="pointItem in item.point_info" :key="pointItem.id" :class="[pointItem.matchStatus]">
                <div class="bet_point_box"
                  v-for="(betpoint,index) in pointItem.team_points" :key="index"
                  :class="{'actived':betpoint.actived, 'win': item.winner == betpoint.ext,'lose':item.winner && item.winner != betpoint.ext}"
                  @click="toHandleBetPointBoxClick(pointItem, betpoint,'',item)">
                  <span class="team_logo" v-lazy-container="lazyLogo"><img :data-src="pointItem.team_logo" alt="" ></span>
                  <span class="team_name ellips" :title="betpoint.desc">{{betpoint.desc}}</span>
                  <span class="team_point" v-if="(pointItem.matchStatus!=='pause')">{{betpoint.point }}</span>
                  <i class="down_up_anit" :class="{'down_points': betpoint.smallAnimt, 'up_points': betpoint.bigAnimt}"></i>
                  <div class="bet_game_status"></div>
                </div>
              </li>
            </ul>
            <div @click="item.canMore=!item.canMore" class="moreshow" :class="{'more':!item.canMore}" v-show="item.point_info.length>6" >
              <div class="more_icon"></div>
              <span>{{item.canMore?$t('More_and_more'):$t('Pack_up')}}</span>
            </div>
          </div>
        </li>
      </ul>
      <!--賽事列表-->
      <div v-if="headTopCurrentCode!='champion'" class="sort_by_date" v-for="(listitem,keytime) in gameDataList " :key="keytime">
        <div class="list_date" v-show="showDayDate">
          <span class="ymd">{{listitem.time*1000 | formatdate('yyyy/MM/dd')}}</span>
          <span class="week">{{listitem.time*1000 | formatWeek}}</span>
        </div>
        <RecycleScroller
        :items="listitem.gamelist"
        :item-size="itemHeight"
        :page-mode="listitem.gamelist.length>9"
        :buffer="500"
        key-field="id"
        size-field="height">
          <template slot-scope="{ item }">
        <div   @click="toShowGameItemDetail(item, $event)" :key="item.id" class="game_item"
          :class="[
          {
            'topBottom-leftRightCorner':!item.is_del,
            'early':item.category_id === 1,
            'live':item.category_id === 3,
            'indemnity':item.category_id === 2,
            'no_cursor': item.gameStatus === 'cancel' || (item.is_champion && headTopCurrentCode == 'end')
          },
          'game_text_class' + item.id,
          ]"
          :style="{backgroundImage:'url('+item.bg+')'}">
          <div class="ui-border-element" >
            <div class="game_info_box left">
              <div class="game_type fll">
                <img :src="item.game_logo" alt="" onerror="this.src='/pc_static/defaultimg/logo_88.png';this.onerror=null">
              </div>
              <!-- <div class="game_name game_name_moreline "  v-if="item.ismoreline" :title="item.is_champion && headTopCurrentCode == 'end'?item.game_name:item.event_name"   >
                <span>{{item.is_champion && headTopCurrentCode == 'end'?item.game_name:item.event_name}}</span>
              </div> -->
              <div class="game_name" >
                <span>{{item.is_champion && headTopCurrentCode == 'end'?item.game_name:item.event_name}}</span>
              </div>

              <div class="game_desc " v-if="item.desc" :title="item.desc">
              {{item.desc}}
              </div>
            </div>
            <!--冠军盘已结束-->
            <div v-if="item.is_champion && headTopCurrentCode == 'end'" class="game_info_box mid c champion_info_box">
              <div class="logo_img fl" v-lazy-container="lazyLogo"> <img :data-src="item.event_logo" alt=""> </div>
              <div class="champion_event_text fl">
                <span class="text_l ellips" :title="item.event_name">{{item.event_name}}</span><br>
                <span class="text_s ellips" :title="item.event_desc">{{item.event_desc}}</span>
              </div>
               <span class="text_l win_team" >{{$t('The_winning_team')}}</span>
               <ul class="winlist" v-if="item.is_del!==1">
                 <li  v-for="(team, index) in item.champion_team_win" :key="index">
                   <div class="win_logo fl"  v-lazy-container="lazyLogo"><img  :data-src="team.champion_team_logo" alt=""></div>
                   <span class="win_name ellips" :title="team.champion_team_name"> {{team.champion_team_name}}</span>
                 </li>
               </ul>
               <ul class="winlist" v-else>
                 <li > <span class="win_name ellips" >--</span> </li>
               </ul>

            </div>
            <!--普通盘-->
            <div v-else class="game_info_box mid c">
              <div class="team_info_box left" v-lazy-container="lazyLogo">
                <div class="team_icon">
                  <img :data-src="item.team_logo_1" alt="">
                </div>
                <div v-show="!item.duil" :title="item.team_name_1" class="team_name ellips team_name_left">
                 {{item.team_name_1}}
                </div>
              </div>
              <div class="team_score_box">
                <i class="team_score"  v-if="item.is_finish === 1||item.is_del === 1">{{item.score_1}}</i>
                <el-popover
                  placement="bottom"
                  trigger="hover"
                  width="700"
                  popper-class="team_history"
                  :popper-options = "popOptions"
                  @hide="teamHistoryLoad=false"
                  @show="loadTeamHistory(1, item, item.game_start_time)"
                  v-else-if="item.team_percentage_1">
                  <div class="team_history_popover">
                    <div class="loader" v-show="item.teamHistoryLoad"><span></span></div>
                    <div class="team_history_wrapper" v-show="!item.teamHistoryLoad">
                      <div class="team_history_top">
                            <span class="team_icon" >
                              <img :src="item.team_logo_1" :alt="item.team_name_1">
                            </span>
                        <span class="team_name" :title="item.team_name_1">{{item.team_name_1}}</span>
                      </div>
                      <div class="team_history_list">
                        <ul>
                          <li class="clearfix" v-for="(team, index) in item.team1HistoryList" :key="index">
                            <div class="win_or_lose" :class="{'win':team.win_or_lose === 1}">{{team.win_or_lose === 1?'W':'L'}}</div>
                            <div class="team left_team" :title="team.team_name_1" :class="{'current_team':team.team_id_1 == item.team_id_1}">{{team.team_name_1}}</div>
                            <div class="vs">VS</div>
                            <div class="team right_team" :title="team.team_name_2" :class="{'current_team':team.team_id_2 == item.team_id_1}">{{team.team_name_2}}</div>
                            <div class="event_name">{{team.event_name}}&nbsp;&nbsp;BO{{team.bo}}</div>
                            <div class="date">{{team.game_start_time*1000 | formatdate('yyyy/MM/dd')}}</div>
                          </li>
                        </ul>
                      </div>
                      <div class="team_history_tips">
                        {{$t("the_data_refers_to")}}
                      </div>
                    </div>
                  </div>
                  <i class="win_rate" slot="reference">{{item.team_percentage_1}}</i>
                </el-popover>
                <!-- <i class="win_rate" v-if="item.team_percentage_1">{{item.team_percentage_1}}</i>-->
                <i class="win_rate"  v-else>{{$t("Data_deficiencies")}}</i>
              </div>
              <div class="bo">
                <span v-if="item.bo == 0">VS</span><span v-else>BO{{item.bo}}</span>
                <span class="video_icon" v-if="item.is_end!=1&&item.media_content!=''"></span>
              </div>
              <div class="team_score_box">
                <i class="team_score"  v-if="item.is_finish === 1||item.is_del === 1">{{item.score_2}}</i>
                <el-popover
                  placement="bottom"
                  trigger="hover"
                  width="700"
                  popper-class="team_history"
                  :popper-options = "popOptions"
                  @hide="teamHistoryLoad=false"
                  @show="loadTeamHistory(2, item, item.game_start_time)"
                  v-else-if="item.team_percentage_2">
                  <div class="team_history_popover">
                    <div class="loader" v-show="item.teamHistoryLoad"><span></span></div>
                    <div class="team_history_wrapper" v-show="!item.teamHistoryLoad">
                      <div class="team_history_top">
                            <span class="team_icon" >
                              <img :src="item.team_logo_2" :alt="item.team_name_2">
                            </span>
                        <span class="team_name" :title="item.team_name_2">{{item.team_name_2}}</span>
                      </div>
                      <div class="team_history_list">
                        <ul>
                          <li class="clearfix" v-for="(team, index) in item.team2HistoryList" :key="index">
                            <div class="win_or_lose" :class="{'win':team.win_or_lose === 1}">{{team.win_or_lose === 1?'W':'L'}}</div>
                            <div class="team left_team" :title="team.team_name_1" :class="{'current_team':team.team_id_1 == item.team_id_2}">{{team.team_name_1}}</div>
                            <div class="vs">VS</div>
                            <div class="team right_team" :title="team.team_name_2" :class="{'current_team':team.team_id_2 == item.team_id_2}">{{team.team_name_2}}</div>
                            <div class="event_name">{{team.event_name}}&nbsp;&nbsp;BO{{team.bo}}</div>
                            <div class="date">{{team.game_start_time*1000 | formatdate('yyyy/MM/dd')}}</div>
                          </li>
                        </ul>
                      </div>
                      <div class="team_history_tips">
                        {{$t("the_data_refers_to")}}
                      </div>
                    </div>
                  </div>
                  <i class="win_rate" slot="reference">{{item.team_percentage_2}}</i>
                </el-popover>
                <!--<i class="win_rate" v-if="item.team_percentage_2">{{item.team_percentage_2}}</i>-->
                <i class="win_rate"  v-else>{{$t("Data_deficiencies")}}</i>
              </div>
              <div class="team_info_box right" v-lazy-container="lazyLogo">
                <div class="team_icon" >
                  <img :data-src="item.team_logo_2" alt="">
                </div>

                <div v-show="!item.duir" :title="item.team_name_2" class="team_name ellips team_name_right">
                  {{item.team_name_2}}
                </div>
              </div>
            </div>

            <div class="game_info_box right">
              <div class="game_time_info">
                <span class="game_time_show" :class="{'countdown':item.countDown}">{{item.is_champion?formatdateDD(item.game_show_end_time*1000,'yyyy/MM/dd HH:mm'):item.timeShow}}</span>
              </div>
              <div class="game_status">
                <span class="gaming" v-if="item.gameStatus==='gaming'">{{$t("underway")}}</span>
                <span class="end" v-if="item.gameStatus==='end'">{{$t("Has_ended")}}</span>
                <span class="cancel" v-if="item.gameStatus==='cancel'">{{$t("Has_been_cancelled")}}</span>
                <span class="guessing" v-if="item.gameStatus==='guessing'">{{$t("In_the_quiz")}}</span>
              </div>
              <div class="game_bet_detail_total" v-show="item.points_count&&!item.is_champion">
                +{{item.points_count}}
              </div>
            </div>
            <div class="clear"></div>
          </div>
          <div class="bet_type_mark">
            {{item.category_id === 2?$t("Solid_compensate"):(item.category_id === 3?'':$t("Choi_ChiPan"))}}
          </div>
        </div>
        </template>
        </RecycleScroller>
      </div>

      <div class="loader" v-show="gameListLoad"  :class="{'fixed_margin_top':isHeaderFixed}"><span></span></div>
      <div class="no_more" v-show="!gameDataListKeys.length && showNoMore">
        <div class="no_morebg"></div>
        <span>{{$t("No_betting_slots")}}</span>
      </div>
      <div class="all_no_more" v-show="gameDataListKeys.length && showNoMore">
        <div class="diline"></div>
        <div class="diline"></div>
        <div class="dilogo"></div>
        {{$t("I_have_my_limits")}}
      </div>
    </div>
  </div>
</template>

<script>
import { formatWeek, formatDate, formatCountTime, base64decode,formatNumberFloatPad } from '../../utils/util'
import { mapState } from 'vuex'
import storage from '@/utils/storage'
export default {
  name: "gamedata",
  data() {
    return {
      popOptions: {
        removeOnDestroy: true
      },
      dateAddTop:0,
      showMoreGameType:false,
      curtime:0,
      isShowDates:false,
      dataselectTrans:0,//时间选择移动距离
      gameDataListShow:true,
      gameDataList:[],
      gameListLoad:false,
      showNoMore:false,
      gameDataListKeys:[],
      allgameDataList:[],
      gameEndTypeDataList:[],
      teamHistoryLoad:false,
      endGameCanLoadMoreTimeout:null,
      gameCurrentType:[0],
      headTopCurrentCode:'',
      pointLoad:false,
      allTimer:null,
      allTimerTwo:null,
      autoChessLinkHeight:0,
      snowflakeList:[],
      snowflakeClass:['snowflake0','snowflake1','snowflake2','snowflake3','snowflake4','snowflake5','snowflake6','snowflake7','snowflake8','snowflake9','snowflake10','snowflake11','snowflake12','snowflake13','snowflake14'],
      gameTypeList:[],
      itemHeight:165,
      showDayDate:false,
    };
  },
  props: {
    isHeaderFixed:{
      default:false,
      type:Boolean
    }
  },
  computed: {
    ...mapState(["lazyLogo"]),
    getGameId () {
      return this.$route.query.id
    }
  },
  watch: {
    isHeaderFixed(val) {
      this.isHeaderFixed = val;
      this.$store.commit("showNoticeFlag",!val)
    }
  },
  mounted() {
    // this.generateSnowflakes();
    // this.autoChessLinkHeight = document.querySelector(".autochess_link_box").offsetHeight;
    if(this.getGameId) {
     this.gameDataListShow = false
    }
    this.EventBus.$on('loadGameDataList',(v) => {
      this.headTopCurrentCode = v.headTopCurrentCode;
      this.showDayDate = v.showDayDate
      this.gameCurrentType = [0]
      this.loadGameDataList();
      this.dateAddTop= v.styleHeight +41;
    })
    this.EventBus.$on('gameDataListShow',(val)=>{
      this.gameDataListShow = !val;
      //在详情页面刷新时候，因为赛事列表未显示，无法计算样式
      // this.$nextTick(()=>{
      //   this.computedClass()
      // })
    })
    this.EventBus.$on('filtrate',(v) => {
      this.showDayDate = v.showDayDate
      this.headTopCurrentCode = v.headTopCurrentCode;
      this.gameCurrentType = v.gameCurrentType;
      this.filtrate()
    })
    this.EventBus.$on('pointActivedChange',list => {
      this.pointActivedChange(list)
      })
    this.EventBus.$on('showMoreGameType',val=>{this.showMoreGameType = val})
    this.EventBus.$on('gamedataScroll',(scrollTop)=>{this.gamedataScroll(scrollTop)})
    this.EventBus.$on('topTypeChange',()=>{
     clearTimeout(this.endGameCanLoadMoreTimeout)
     this.isShowDates = false
     if(this.headTopCurrentCode == 'end') {
        (this.gameDataListKeys.length >7)&& (this.dataselectTrans = (this.gameDataListKeys.length - 7)*128 )
     }else {
       this.dataselectTrans = 0
     }
    })
    this.EventBus.$on('toShowGameItemDetail',x=>{this.toShowGameItemDetail(x)})
    this.EventBus.$on('gameLeftTypeListImg',data => {this.gameTypeList = data})
  },
  beforeDestroy(){
    this.EventBus.$off('pointActivedChange')
    this.EventBus.$off('loadGameDataList')
    this.EventBus.$off('gameDataListShow')
    this.EventBus.$off('filtrate')
    this.EventBus.$off('showMoreGameType')
    this.EventBus.$off('gamedataScroll')
    this.EventBus.$off('topTypeChang')
    this.EventBus.$off('toShowGameItemDetail')
    this.EventBus.$off('gameLeftTypeListImg')
    clearInterval(this.allTimer)
    clearInterval(this.allTimerTwo)
  },
  filters:{
    formatdate (num, formate) {
      return formatDate (num, formate)
    },
    formatWeek(time) {
      return formatWeek(time)
    },
  },
  methods: {
    //动画
    getAbsoluteRandom (cache, base){
        var random = parseInt(Math.random() * base) + 32;
        if(cache[random]){
            return this.getAbsoluteRandom(cache, base);
        }else{
            cache[random] = 1;
            return random;
        }
    },
    generateSnowflakes (){
        for(var i = 0; i < 15;i++){
            var random = Math.random();
            this.snowflakeList.push({
              classN:this.snowflakeClass[i],
              left:this.getAbsoluteRandom({}, 40) + "%",
              delay:parseInt(Math.random() * 3000) + "ms," + parseInt(random*3) + "s",
              imurl:"spark"+ (Math.floor(Math.random()*2)+1)
            })
        }
    },
    formatdateDD (num, formate) {
      return formatDate (num, formate)
    },
    //刷新赔率
    reloadPoints (bool) {
        if(!this.gameDataList.length || this.pointLoad){
          return false
        }
        let pointIds = []
        this.gameDataList.forEach((m, n) => {
          m.gamelist.forEach((a, b) => {
            if(bool == 1 && (a.category_id === 2 || a.category_id === 3) ) {
              Array.isArray(a.point_info) && a.point_info.forEach((x,y)=> {
                  pointIds.push(x.id)
              })
            }else if(bool == 0 && a.category_id === 1){
              Array.isArray(a.point_info) && a.point_info.forEach((x,y)=> {
                  pointIds.push(x.id)
              })
            }
          })
        })
        if(pointIds.length == 0){
          return false
        }
        let data = {
          point_ids: pointIds.join(','),
          is_liveorfix: bool
        }
        this.pointLoad = true
        this.$http(this.ApiSetting.newEgame.reLoadPoint, data)
          .then((res) => {
            this.pointLoad = false
            if (res.status === 1) {
              let newPointArr = res.data
              for (let j = 0; j < newPointArr.length; j++) {
                let _newPointArr = newPointArr[j]
                 this.gameDataList.forEach(m=> {
                  m.gamelist.forEach((p)=> {
                   Array.isArray(p.point_info) && p.point_info.forEach((v, i) => {
                      if (_newPointArr.id == v.id) {
                          if(bool && typeof _newPointArr.danger_status !== 'undefined'){
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
                                x = Object.assign(x,_newPointArr.team_points[k],{point:formatNumberFloatPad(_newPointArr.team_points[k].point)})
                              }
                            })
                          }
                      }
                    })
                  })
               })
              }
            }
        }, (err) => {
            this.pointLoad = false
        })
    },
    //当购物车里数据发生变化时，冠军盘口选中状态变化
    pointActivedChange(id) {
        this.gameDataList.forEach((m, n) => {
          m.gamelist.forEach((a, b) => {
            Array.isArray(a.point_info)&&a.point_info.forEach((x,y)=> {
              x.team_points.forEach((j, k) => {
                if((id && j.id == id) || !id) {
                  j.actived = false
                }
              })
            })
          })
        })
        this.$forceUpdate()
      },
    //选择投注盘口到购物车
    toHandleBetPointBoxClick(gameItem, point,navTitle,gameItemData){
      if( gameItem.matchStatus !=="guessing"){
        return false
      }
      let tdata = storage.get('vkbetCartList') || []
      if(tdata.length<8) {
        point.actived = !point.actived
      }
      this.$forceUpdate()
      let moneyTypeList = []
      if(gameItemData.money_type.length>1&&gameItemData.money_type.indexOf(',') > 0){
        moneyTypeList = [
          { value: 1, name: 'RMB' },
          { value: 2, name: this.$t("Virtual_currency") } ]
      }else {
        if (gameItemData.money_type == 1) {
          moneyTypeList = [ { value: 1, name: 'RMB' }]
        }
        if (gameItemData.money_type == 2) {
          moneyTypeList = [ { value: 2, name: this.$t("Virtual_currency") }]
        }
      }
      this.EventBus.$emit('handleBetPointBoxClick',{
        gameItem:gameItem,
        point:point,
        navTitle:'',
        gameItemData:{...gameItemData,...{moneyTypeList:moneyTypeList}}
      })
    },
    //滚动监听处理
    gamedataScroll(scrollTop) {
      this.isShowDates = false
      let maxi = this.gameDataList.length-1
      if(!this.endGameCanLoadMore && this.headTopCurrentCode == 'end' && maxi>=0 && scrollTop>this.gameDataList[maxi].upjumpdistance + this.gameDataList[maxi].jumpdistance -400) {
        this.endGameCanLoadMore = true
        this.endGameCanLoadMoreTimeout = setTimeout(() => {
          this.gameDataList = this.gameEndTypeDataList.slice(0,this.gameDataList.length+1)
          this.endGameCanLoadMore = false
        }, 500);
      }
      //赛事时间处理
      let temcurtime = 0
      for(let i in this.gameDataList) {
         if(scrollTop >= this.gameDataList[i].upjumpdistance-80+this.autoChessLinkHeight) {
           this.curtime = this.gameDataList[i].time
         }
      }
      for(let j =0;j<this.gameDataListKeys.length;j++) {
          let s = parseInt(this.dataselectTrans/128)
          if(this.gameDataListKeys[j] == this.curtime &&this.gameDataListKeys.length>7  && (j <= s || j+1>s+6)) {
            if(j>6){
             this.dataselectTrans = j * 128
            }else {
              this.dataselectTrans = 0
            }
            if(this.dataselectTrans > (this.gameDataListKeys.length - 7)*128) {
              this.dataselectTrans = (this.gameDataListKeys.length - 7)*128
            }
          }
      }
    },
    //时间选择移动处理
    dataselectTransHeal(type) {
     if(type == 1) {//left
        this.dataselectTrans -= 3*128
       if(this.dataselectTrans <0) {
         this.dataselectTrans = 0
       }
     }else {//right
       let n = parseInt(this.dataselectTrans/125)
       if((this.gameDataListKeys.length - n) > 7) {
          this.dataselectTrans += 3*128
       }
       if(this.dataselectTrans > (this.gameDataListKeys.length - 7)*128) {
         this.dataselectTrans = (this.gameDataListKeys.length - 7)*128
       }
     }
    },
    //点击日期前一天后一天跳转
    dayjump(type,time){
      let allkey = this.gameDataListKeys
      let temptime = this.curtime
      if((this.curtime == allkey[0] && type == 2) || (this.curtime == allkey[allkey.length -1] && type == 1)) {
        return
      }
      if(type == 3) {//直接点击日期
        this.curtime = time
      }else {
        for (let i = 0; i < allkey.length; i++) {
          if(allkey[i] == this.curtime) {
            if(type == 1) {//1后一天
              this.curtime = allkey[i+1]
            }else {//2为前一天
              this.curtime = allkey[i-1]
            }
            break
          }
        }
      }
      if(this.headTopCurrentCode == 'end' && !this.gameDataList.find(item=>{return item.time == time})) {
        clearTimeout(this.endGameCanLoadMoreTimeout)
        let tdata = []
        for(let i=0;i<this.gameEndTypeDataList.length;i++) {
          tdata.push(this.gameEndTypeDataList[i])
          if(this.gameEndTypeDataList[i].time ==this.curtime) {
            break
          }
        }
        this.gameDataList = tdata
      }
      let totald = 0 + this.autoChessLinkHeight
      for(let d in this.gameDataList) {
        let t = this.gameDataList[d]
        if(this.gameDataList[d].time == this.curtime) {
          break
        }
        totald += t.jumpdistance
      }
      if(this.headTopCurrentCode == 'end') {
        this.$nextTick(()=> {
          setTimeout(() => {
            if(navigator.userAgent.indexOf("Edge")>-1) {
                document.body.scrollTop = totald- 35
            }else {
                document.documentElement.scrollTop = totald- 35
            }
          }, 200);
        })
      }else {
        if(navigator.userAgent.indexOf("Edge")>-1) {
            document.body.scrollTop = totald - 35
        }else {
            document.documentElement.scrollTop = totald - 35
        }
      }
    },
    //请求赛事列表数据
    loadGameDataList () {
      this.gameListLoad = true
      this.showNoMore = false
      let data = {
        nav_code: this.headTopCurrentCode,
      }
      this.gameDataList = []
      this.allgameDataList = []
      this.gameDataListKeys = []
      this.dataselectTrans = 0
      this.$http(this.ApiSetting.newEgame.getNewGameDataList, data)
        .then((res) => {
          this.gameListLoad = false
          if(res.status === 1){
            if(res.data.list){
              let t = [],keys = []
              for(let i in res.data.list) {
                keys.push(i)
                t.push({
                  gamelist:Array.isArray(res.data.list[i])?res.data.list[i]:[res.data.list[i]] ,
                  time:i
                })
              }
              if(this.headTopCurrentCode == 'end') {
                t.reverse()
              }
              this.showNoMore = true
              this.allgameDataList = this.initEgameDataList(t)
              this.filtrate()
              // this.computedClass()//赛事列表的赛事名称一行、多行样式不一样
            }
          }
        }, (err) => {
          if(err.message != "Termination") {
            this.gameListLoad = false
          }
        })
    },
    initEgameDataList (data) {
      let d = 0
      data.forEach(v => {
         let curd = v.gamelist.length *165 + 50
         d += curd
         v.jumpdistance = curd
         v.upjumpdistance = d - curd
         v.gamelist.forEach(item => {
           this.initEgameItemData(item);
           let databg = this.gameTypeList.find(type=>{return item.game_type_id == type.id})
           if(databg) {
             item.bg = databg.bg
           }else {
             item.bg = require("../../assets/egame/default_bg.png")
           }
         })
      })
      clearInterval(this.allTimer)
      clearInterval(this.allTimerTwo)
      if(this.headTopCurrentCode != 'end') {
        if(this.headTopCurrentCode == 'champion') {
          this.allTimer = setInterval(() => {
             this.reloadPoints(1)
          }, 10000);
          this.allTimerTwo = setInterval(() => {
             this.reloadPoints(0)
          }, 60000);
        }else {
          this.allTimer = setInterval(() => {
             data.forEach(v => {
               v.gamelist.forEach(item => {
                 this.gameListCountDown(item)
               })
             })
          }, 1000);
        }
      }
     return data
    },
    //赛事列表倒计时
    gameListCountDown(data) {
      if (data.gameStatus == "guessing" && data.tempCountDownTime<=3*60*60 && data.category_id !=3) {
         data.tempCountDownTime--
         data.timeShow = formatCountTime( data.tempCountDownTime);
         if ( data.tempCountDownTime < 1) {
           data.is_end = 0;
           data.gameStatus = "gaming"
           data.timeShow = formatDate(data.game_start_time*1000, 'yyyy/MM/dd HH:mm:ss')
           data.countDown = false
         }
      }
    },
    initEgameItemData (data) {
      if (data.media_content) {
        data.videoUrl = base64decode(data.media_content)
      }
      data.teamHistoryLoad = false
      if (data.is_del == 1) {
        data.gameStatus = "cancel";
      }else if(data.is_end == 1){
        data.gameStatus = "end";
      }else if(data.game_start_time*1000 > new Date().getTime()) {
        data.gameStatus = "guessing";
      }else {
        data.gameStatus = "gaming";
      }
      let tempCountDownTime = parseInt(Math.abs(data.game_start_time*1000 - new Date().getTime())/1000);
      if(data.gameStatus == "guessing" && data.category_id != 3 && tempCountDownTime<=3*60*60) {
        data.countDown = true
        data.tempCountDownTime = tempCountDownTime
        data.timeShow = formatCountTime( tempCountDownTime)
      }else {
        data.countDown = false
        data.timeShow = formatDate(data.game_start_time*1000, 'yyyy/MM/dd HH:mm:ss')
      }
      if(data.point_info && data.point_info.length>0){//冠军盘才有的
        data.canMore = true;
        if(data.point_info.length<=6) {
          if(Math.ceil(data.point_info.length/3)==1) {
            data.minH = 85;
            data.maxH = 85;
          }else {
            data.minH = 140;
            data.maxH = 140;
          }
        }else {
          data.minH = 130;
          data.maxH = Math.ceil(data.point_info.length/3) * 55 +30
        }
        this.initGameItemPoints(data)
      }
      return data
    },
    //投注点
    initGameItemPoints (data) {
      Array.isArray(data.point_info) && data.point_info.forEach( (v, i)=> {
         v.index = i
          if (v.is_del == 1 || v.is_del == 2) {
            v.matchStatus = "cancel"
          }else if (v.is_end == 1) {
            v.matchStatus = "end"
          }else if (v.is_finish == 1) {
            v.matchStatus = "clearing"
          }else if (v.sale_end_time*1000 > new Date().getTime()) {
            v.matchStatus = "guessing"
            if(v.category_id == 3 || v.category_id == 2){
              if(v.is_danger == 1){
                v.matchStatus = "pause"
              }
            }
          } else {
            v.matchStatus = "gaming"
          }
      })
      //投注列表与购物车中数据比较,把购物车的数据在投注列表中选中
      let betCartList = storage.get('vkbetCartList') || []
      if(data.is_champion) {
        for(let i=0;i<betCartList.length;i++){
          Array.isArray(data.point_info) && data.point_info.forEach((m, n) => {
              m.team_points.forEach((j, k) => {
                if(j.id == betCartList[i].pointId){
                  j.actived = true
                }
              })
          })
        }
      }

      return data
    },
    //赛事列表计算样式赛事列表的赛事名称一行、多行样式不一样
    computedClass() {
     this.$nextTick(()=> {
       for(let i in this.allgameDataList) {
         this.allgameDataList[i].gamelist.forEach(item => {
           //左上角赛事名称
           let d = document.querySelector(".game_text_class" + item.id +" .game_name")
           if(d) {
               let curd = getComputedStyle(document.querySelector(".game_text_class" + item.id +" .game_name"))
               let texth = curd.getPropertyValue('height')
               if(parseFloat(texth) < 20) {
                 item.ismoreline = false
               }else {
                 item.ismoreline = true
               }
               this.$forceUpdate()
           }
         })
       }
     })
    },
    //点击查看详情
    toShowGameItemDetail (x, e) {
      if(x.is_del || x.is_champion) {
        return
      }
      this.gameDataListShow = false
      this.isShowDates = false
      this.EventBus.$emit('showGameItemDetail',x)
    },
    //请求历史战绩
    loadTeamHistory (type, item, time) {
      if((type === 1 && item.team1HistoryList && item.team1HistoryList.length > 0) || (type === 2 && item.team2HistoryList && item.team2HistoryList.length > 0)){
        return false
      }
      let data = {
        team_id:type === 1?item.team_id_1:(type === 2?item.team_id_2:'') ,
        end_time: formatDate(time*1000, 'yyyy/MM/dd')
      }
      item.teamHistoryLoad = true
      this.$http(this.ApiSetting.newEgame.getTeamHistory, data)
        .then((res) => {
          item.teamHistoryLoad = false
          if(res.status === 1){
            if(type === 1){
              item.team1HistoryList = res.data.list
            }else if(type === 2){
              item.team2HistoryList = res.data.list
            }
          }
        }, (err) => {
          item.teamHistoryLoad = false
        })
    },
    //筛选
    filtrate() {
      this.gameDataList = []
      this.gameDataListKeys = []
      let d = 0,keys = [],tdata = []
      if(this.gameCurrentType.length == 1 && this.gameCurrentType[0] == 0) {
        tdata = this.allgameDataList
        this.allgameDataList.forEach(i => {
          keys.push(i.time)
        })
      }else {
        this.allgameDataList.forEach(i => {
          let tarr = []
          i.gamelist.forEach(item => {
              this.gameCurrentType.forEach(type => {
                if(type == item.game_type_id) {
                  tarr.push(item)
                }
              })
          })
          if(tarr.length) {
            let to = {
              gamelist:tarr,
              time:i.time,
            }
            keys.push(i.time)
            let curd = tarr.length *165 + 50
            d += curd
            to.jumpdistance = curd
            to.upjumpdistance = d - curd
            tdata.push(to)
          }
       })

      }
      if(this.headTopCurrentCode == 'end' && tdata.length) {//第一次显示两天的数据
        keys.reverse()
        this.gameEndTypeDataList = tdata
        this.gameDataList =  tdata.slice(0,2)
        this.gameDataListKeys = keys;
        if(this.gameDataListKeys.length >7) {
          this.dataselectTrans = (this.gameDataListKeys.length - 7)*128
        }
      }else {
        this.gameDataList =  tdata
        this.gameDataListKeys = keys
      }
      this.curtime  = this.gameDataList.length ? this.gameDataList[0].time:''
    },
  }
};
</script>

<style scoped lang="less">
@border_color_1: #ff6000;
@border_color_2: #f1b707;
.fixed_margin_top {
  margin-top: 190px;
}
/*.autochess_link_box {
  margin-bottom: 10px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  height: 89px;
  width: 968px;
  .snow_box {
    display: none;

//   }
//   &:hover {
//     .snow_box {
//       display: block;
//     }
//   }

}
.autochess_link_box .autochess_link{
  display: inline-block;
  width: 100%;
  height: 100%;;
  transition: background 0.3s;
  background: url("../../assets/autoChess/autochess_enter_img_normal.jpg") no-repeat;
  &:hover {
    background: url("../../assets/autoChess/autochess_enter_img_hover.jpg") no-repeat;
  }
}
.autochess_link_box .autochess_link img{
  width: 100%;
  height: 89px;
  transition: transform 1.5s;
  &:hover {
    transform: scale(1.4);
  }
}*/
.enter_tit {
  position: absolute;
  pointer-events: none;
  top:0;
  left: 0;
}
@newegame_icons:url("../../assets/egame/newegame_icons.png");
  .game_right {
    width: 968px;
    float: left;
    .sort_by_date {
      &.firstdate {
        z-index: 10;
        float: left;
      }
      &.fixed {
        position: fixed;
        top:122px;
        border-top: 10px solid #17191f;
        transition: top 0.2s ease-in-out;
      }
      &.firstdate .list_date,&:nth-child(2) .list_date{
        margin-top:0;
      }
      .dataselect {
        position: absolute;
        z-index: 20;
        width: 968px;
        height: 40px;
        box-sizing: border-box;
        background-color: #17191f;
        box-shadow: 0px 2px 20px 0px
        rgba(0, 0, 0, 0.4);
        border-style: solid;
        border-width: 1px;
        border-image-source: linear-gradient(-30deg,
        #07f1b7 0%,
        #07e9f1 100%);
        border-image-slice: 1;
        &::after {
          content: '';
          position: absolute;
          top: -16px;
          right: 19px;
          border-top: 8px solid transparent;
          border-right: 8px solid transparent;
          border-bottom: 8px solid #17191f;
          border-left: 8px solid transparent;

        }
        &:before {
          content: '';
          position: absolute;
          top: -18px;
          right: 18px;
          border-top: 9px solid transparent;
          border-right: 9px solid transparent;
          border-bottom: 9px solid #07f1b7;
          border-left: 9px solid transparent;
        }
        .date_select_arrow {
          position: absolute;
          display: inline-block;
          line-height: normal;
          height: 17px;
          width: 10px;
          vertical-align: middle;
          background: url("../../assets/egame/newegame_icons.png") no-repeat;
          top: 11px;
          cursor: pointer;
          &.disabled {
            opacity: 0.4;
            cursor: default;
          }
        }
        .date_select_left {
          background-position: -295px -254px;
          left: 20px;
          &:hover {
            background-position: -295px -304px;
          }
          &.disabled:hover {
            background-position: -295px -254px;
          }
        }
        .date_select_right {
          background-position: -335px -254px;
          right: 20px;
          &:hover {
            background-position: -335px -304px;
          }
          &.disabled:hover {
            background-position: -335px -254px;
          }
        }
        .selectbox {
          width: 888px;
          overflow: hidden;
          margin: auto;
          ul {
            padding: 6px 0px;
            transition:transform 0.3s;
            li {
              float: left;
              width: 120px;
              height: 28px;
              margin-right: 8px;
              border-radius: 6px;
              text-align: center;
              cursor: pointer;
              transition: background-color 0.3s;
              border-radius: 20px;

              span {
                line-height:28px;
              }
              &.selected {
                .ymd {
                  color: #ffffff;
                }
                .week {
                  color: #07f1b7;
                }
              }
              &:hover {
                background-color: #262933;
              }
              .ymd {
                color: #7c839f;
              }
              .week {
                margin-top: 4px;
                color: #53586b;
              }
            }
          }
        }
      }
      .list_date {
        width: 928px;
        height: 40px;
        background-color: #262933;
        padding: 0 20px;
        margin: 5px 0 ;

        span {
          font-size: 14px;
          line-height: 40px;
        }
        .ymd {
          color: #fff;
        }
        .week {
          color: #7c839f;
        }
        .daybtn {
          width: 56px;
          height: 24px;
          border-radius: 4px;
          border: solid 1px #7c839f;
          border-radius: 20px;
          line-height: 24px;
          text-align: center;
          margin-right: 10px;
          margin-top:8px;
          cursor: pointer;
          transition: border,color 0.3s;
          &.disabled {
            color: #53586b;
            border-color: #53586b;
            cursor: default;
            &:hover {
              border: solid 1px #53586b;
              color: #53586b;
            }
          }
          &:hover {
            border: solid 1px #07f1b7;
            color: #07f1b7;
          }
        }
        .calendar {
          background: url("../../assets/egame/newegame_icons.png") no-repeat;
          width: 16px;
          height: 18px;
          position: relative;
          margin:11px 0 0 10px;
          cursor: pointer;
          background-position: -250px -255px;
          &:hover,&.caleopen {
            background-position: -250px -305px;
          }
          &.caleopen {
            &:before,&after{
              content:"";
              position: absolute;
              border:9px
            }
          }
        }
      }
    }
    #egame_list {
      position: relative;
      .backgroundcard(@className,@pngName){
        .game_bg_@{className}{
          background-image: url("../../assets/egame/game-bg-@{pngName}.png") !important;
        }
      }
      @list: 1,2,3,4,5,6,12,16,20,21,23,24,25,26,27,28,29,30,31,35,36,37;
      .loop (@i) when (@i < length(@list)+1){
        .backgroundcard(extract(@list,@i),extract(@list,@i));
        .loop(@i+1)
      }
      .loop(1);
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
        background-image: url("../../assets/egame/newegame_icons.png");
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
      .topBottom-leftRightCorner{
        &::before,&::after {
          pointer-events: none;
          cursor: pointer;
        }
        .ui-border-element {
          &:after,&:before {
            pointer-events: none;
          }
        }
        &.live {
          &:before,&:after {
            border-color: @border_color_1;
          }
          .ui-border-element {
            &:after,&:before {
              border-color: @border_color_1;
            }
          }
        }
        &.indemnity {
          &:before,&:after {
            border-color: @border_color_2;
          }
          .ui-border-element {
            &:after,&:before {
              border-color: @border_color_2;
            }
          }
        }
      }
      .game_item {
        height: 160px;
        box-sizing: border-box;
        border: 1px solid #262933;
        position: relative;
        background-color: #15171c;
        background-repeat: no-repeat;
        background-position: center center;
        background-image: url("../../assets/egame/default_bg.png");
        margin-bottom: 5px;
        &.no_cursor{
          .ui-border-element{
            cursor: default;
          }
        }


        .ui-border-element {
          height: 100%;
          position: relative;
          z-index: 2;
          cursor: pointer;
          padding: 10px 20px;
          box-sizing: border-box;
        }
        .game_info_box {
          float: left;
          width: 145px;
          height: 100%;
          box-sizing: border-box;
          font-size: 12px;
          color: #7c839f;
          position: relative;
          &.mid {
            width: 636px;
            padding: 0 10px;
            .team_info_box {
              float: left;
              width: 200px;
              text-align: center;
              .team_icon {
                height: 75px;
                margin-top: 10px;
                margin-bottom: 6px;
                img {
                  max-height: 100%;
                  max-width: 100%;
                  vertical-align: middle;
                }
              }
              .team_name {
                font-size: 20px;
                color: #fff;
                line-height: 30px;
                max-width: 200px;
                width: fit-content;
                position: relative;
                left: 50%;
                transform: translateX(-50%);
              }
            }
            .bo {
              float: left;
              width: 88px;
              text-align: center;
              height: 138px;
              line-height: 138px;
              font-size: 20px;
              color: #7c839f;
              font-weight: bold;
              position: relative;
              .video_icon {
                line-height: normal;
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                width: 20px;
                height: 20px;
                background: @newegame_icons no-repeat;
                background-position: -201px -253px;
                bottom: 20px;
              }
            }
            .team_score_box {
              float: left;
              width: 64px;
              height: 138px;
              line-height: 138px;
              text-align: center;
              box-sizing: border-box;
              padding: 0 2px;
              .team_score {
                font-weight: bold;
                font-size: 18px;
              }
              .win_rate{
                cursor: default;
              }

            }
          }
          &.left {
            .game_name {
              max-height: 64px;
              overflow: hidden;
              max-width: 100px;
              // margin-top: 10px;
              display: table;
              min-height:32px ;
              span {
                display: table-cell;
                vertical-align: middle;
              }
              // &.game_name_moreline {
              //   margin-top: 0px !important;
              // }
            }
            .game_type {
              height: 30px;
              line-height: 30px;
              margin-right: 10px;
              img {
                max-width: 30px;
                max-height: 30px;
                vertical-align: middle;
              }
            }
            .game_desc {
              color: #575c70;
              position: absolute;
              bottom: 0px;
              width: 100%;
              left: 0;
              transform: translateZ(0);
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box !important;
              -webkit-line-clamp: 5;
              -webkit-box-orient: vertical;
              line-height: 15px;
              max-height:73px;
            }
          }
          &.right {
            text-align: right;
            position: relative;
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
            .game_bet_detail_total {
              position: absolute;
              right: 0;
              bottom: 0;
              font-size: 18px;
              width: 56px;
              box-sizing: border-box;
              height: 24px;
              line-height: 22px;
              border: 1px solid #07f1b7;
              color: #07f1b7;
              text-align: center;
              background-color: #0d4742;
              border-radius: 3px;
              cursor: pointer;
            }
          }
          &.champion_info_box {
            .win_team {
              display: block;
              float: left;
              line-height: 138px;
              margin:0 10px;
            }
            .logo_img {
              line-height: 138px;
            }
            .champion_event_text {
              padding-top: 50px;
              width: 220px;
              span {
                max-width: 220px;
              }
            }
            .winlist {
              overflow: hidden;
              position: relative;
              top:50%;
              transform: translateY(-50%);
              .win_logo {
                height: 50px;
                width: 50px;
                margin-right: 15px;
                position: relative;
                img {
                  max-height: 50px;
                  max-width: 50px;
                  position: absolute;
                  top: 50%;
                  transform: translate(-50%,-50%);
                  left: 50%;
                }
              }
              .win_name {
                font-size: 22px;
                color: #07f1b7;
                display: inline-block;
                max-width: 125px;
                line-height: 50px;
              }
            }
          }
        }
      }
      .no_more {
        text-align: center;
        line-height: 50px;
        color: #484d5e;
        background-color: #17191f;
        height: calc(100vh - 310px);
        position: relative;
        padding: 1px;
        .no_morebg {
          background: @newegame_icons no-repeat;
          background-position: -50px -534px;
          width: 200px;
          height: 200px;
          margin: auto;
          margin-top: 174px
        }
      }
      //冠军盘
      .champion {
        margin-bottom: 10px;
        position: relative;
        .topBottom-leftRightCorner {
          cursor: default;
        }
        li {
          position: relative;
          cursor: pointer;
          box-sizing: border-box;
          padding-bottom: 2px;
          .champion_info {
            height: 145px;
            box-sizing: border-box;
            padding: 15px 10px;
            background-color: #17191f;
            .other_desc {
              margin-top:3px;
              width: 100%;
            }
            .champion_info_top {
              width: 100%;
              height: 30px;
              img {
                max-width: 30px;
                max-height: 30px;
                top: 50%;
                position: relative;
                transform: translateY(-50%);
                margin-right: 5px;
              }
              span {
                vertical-align: middle;
                line-height: 30px;
              }
            }
            .champion_info_mid {
              width:100%;
              height: 70px;
              margin-top: 5px;
              padding: 0 100px;
              box-sizing: border-box;
              .line {
                width: 1px;
                height: 34px;
                background-color: #3b3b3b;
                margin-top:17px;
              }
            }
          }
          .moreshow {
            height: 40px;
            line-height: 40px;
            width: 100%;
            background-color: #20232b;
            text-align: center;
            font-size: 14px;
            cursor: pointer;
            span {
              vertical-align: middle;
            }
            .more_icon {
              width: 16px;
              height: 14px;
              display: inline-block;
              background: url("../../assets/egame/newegame_icons.png") no-repeat;
              background-position: -68px -256px;
              margin-right: 10px;
              vertical-align: middle;
            }
            &.more {
              span {
                color: #07f1b7;
              }
              .more_icon {
                background: url("../../assets/egame/newegame_icons.png") no-repeat;
                background-position: -67px -306px;
                transform: rotate(180deg);
              }
            }
          }
          .champion_team {
            background-color: #20232b;
            padding: 20px 62px 10px;
            overflow: hidden;
            box-sizing: border-box;
            position: relative;
            transition: height 0.2s ease 0s;
            .game_bet_point {
              width: 268px;
              height: 36px;
              background-color: #07f1b7;
              border-radius: 4px;
              margin-right: 17px;
              margin-bottom: 14px;
              &:nth-child(3n) {
                margin-right: 0;
              }
              .bet_point_box {
                 width: 268px;
                 padding: 0 10px;
                  .team_name {
                      max-width: 100px;
                  }
                  .team_logo {
                    display: inline-block;
                    vertical-align: middle;
                    width: 28px;
                    height: 34px;
                    line-height: 30px;
                    margin-right: 5px;
                    text-align: center;
                    img {
                      vertical-align: middle;
                      max-height: 24px;
                      max-width: 24px;
                    }
                  }
                 .img_point {
                   width: 26px;
                   height: 26px;
                   margin-right: 10px;
                   img {
                     max-height: 26px;
                     max-width: 26px;

                   }
                 }
              }
            }
          }
        }
      }
      .logo_img {
        width: 80px;
        height: 100%;
        margin-right: 30px;
        img {
          max-width: 70px;
          max-height: 70px;
        }
      }
      .text_l {
        font-size: 18px;
        font-weight: 500;
        color: #eee;
        line-height: 25px;
      }
      .text_s {
        font-size: 14px;
      }
      .champion_event_text {
        width: 270px;
        height: 100%;
        padding-top: 10px;
        box-sizing: border-box;
        &.champion_event_teams {
          width: 160px;
          text-align: center;
        }
        &.champion_event_money {
          width: 200px;
          text-align: center;
          .text_l  {
            font-size: 22px !important;
            color: #07f1b7 !important;;
          }
          span {
            max-width: 170px;
          }
        }
        span {
          display: inline-block;
          max-width: 270px;
        }
      }
    }
  }
  /*战队历史记录*/
  .team_history_popover {
    .team_history_top {
      background-color: #262933;
      padding: 10px 20px;
      span {
        display: inline-block;
        height: 40px;
        line-height: 40px;
        img {
          height: 40px;
          vertical-align: top;
        }
      }
      .team_icon {
        margin-right: 10px;
      }
      .team_name {
        color: #fff;
        font-size: 18px;
      }
    }
    .team_history_list {
      margin-top: 10px;
      li {
        padding: 0 20px;
        line-height: 32px;
        height: 32px;
        font-size: 14px;
        & > div {
          float: left;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          box-sizing: border-box;
        }
        &:nth-child(even) {
          background-color: #1a1c23;
        }
        .win_or_lose {
          width: 50px;
          font-size: 18px;
          color: #fff;
          text-align: center;
          &.win {
            color: #07f1b7;
          }
        }
        .team {
          width: 126px;
          &.left_team {
            text-align: right;
          }
          &.current_team {
            color: #fff;
          }
        }
        .vs {
          width: 36px;
          text-align: center;
          font-style: italic;
          color: #3f4352;
          font-size: 12px;
          font-weight: bold;
        }
        .event_name {
          color: #494e5f;
          text-align: right;
          width: 220px;
        }
        .date {
          width: 100px;
          color: #494e5f;
          text-align: right;
        }
      }
    }
    .team_history_tips {
      text-align: center;
      line-height: 40px;
      margin-top: 10px;
    }
  }
  /*.spark1 {
    width:8px;
    height: 8px;
    background:url("../../assets/autoChess/1.png")
  }
  .spark2 {
    width: 10px;
    height: 10px;
    background:url("../../assets/autoChess/2.png")
  }*/
  // .spark2 {
  //   width: 10px;
  //   height: 10px;
  //   background:url("../../assets/autoChess/2.png")
  // }
  /*.snowflakebox {
        width: 800px;
      height: 700px;
      position: fixed;
      z-index: 1;
      overflow: hidden;
      left: calc(50% - 400px);
      top: calc(50% - 350px);
  }
  .snowflake{
      position: absolute;
      bottom:-10%;
      z-index:9999;
      bottom: -30px;
      color: #ffe685;
      -webkit-user-select:none;-moz-user-select:none;
      -ms-user-select:none;user-select:none;cursor:default;
      -webkit-animation-name:snowflakes-fall,snowflakes-shake;
      -webkit-animation-duration:3s,3s;
      -webkit-animation-timing-function:linear,ease-in-out;
      -webkit-animation-iteration-count:infinite,infinite;
      -webkit-animation-play-state:running,running;
      animation-name:snowflakes-fall,snowflakes-shake;animation-duration:3s,3s;animation-timing-function:linear,ease-in-out;animation-iteration-count:infinite,infinite;animation-play-state:running,running}
  .snowflake0 {.snowflake;animation-name:snowflakes-fall,snowflakes-shake0}
  .snowflake1 {.snowflake;animation-name:snowflakes-fall,snowflakes-shake1}
  .snowflake2 {.snowflake;animation-name:snowflakes-fall,snowflakes-shake2}
  .snowflake3 {.snowflake;animation-name:snowflakes-fall,snowflakes-shake3}
  .snowflake4 {.snowflake;animation-name:snowflakes-fall,snowflakes-shake4}
  .snowflake5 {.snowflake;animation-name:snowflakes-fall,snowflakes-shake5}
  .snowflake6 {.snowflake;animation-name:snowflakes-fall,snowflakes-shake6}
  .snowflake7 {.snowflake;animation-name:snowflakes-fall,snowflakes-shake7}
  .snowflake8 {.snowflake;animation-name:snowflakes-fall,snowflakes-shake8}
  .snowflake9 {.snowflake;animation-name:snowflakes-fall,snowflakes-shake9}
  .snowflake10 {.snowflake;animation-name:snowflakes-fall,snowflakes-shake10}
  .snowflake11 {.snowflake;animation-name:snowflakes-fall,snowflakes-shake11}
  .snowflake12 {.snowflake;animation-name:snowflakes-fall,snowflakes-shake12}
  .snowflake13 {.snowflake;animation-name:snowflakes-fall,snowflakes-shake13}
  .snowflake14 {.snowflake;animation-name:snowflakes-fall,snowflakes-shake14}
  @-webkit-keyframes snowflakes-fall{
      0%{bottom:-10%}100%{bottom:100%}}
  @keyframes snowflakes-fall{
      0%{bottom:-10%}100%{bottom:100%}
  }
   @keyframes snowflakes-shake0{0%, 100% { transform: translateX(0); } 50% { transform: translateX(19px);}}
   @keyframes snowflakes-shake1{0%, 100% { transform: translateX(0); } 50% { transform: translateX(11px);}}
   @keyframes snowflakes-shake2{0%, 100% { transform: translateX(0); } 50% { transform: translateX(13px);}}
   @keyframes snowflakes-shake3{0%, 100% { transform: translateX(0); } 50% { transform: translateX(16px);}}
   @keyframes snowflakes-shake4{0%, 100% { transform: translateX(0); } 50% { transform: translateX(14px);}}
   @keyframes snowflakes-shake5{0%, 100% { transform: translateX(0); } 50% { transform: translateX(18px);}}
   @keyframes snowflakes-shake6{0%, 100% { transform: translateX(0); } 50% { transform: translateX(17px);}}
   @keyframes snowflakes-shake7{0%, 100% { transform: translateX(0); } 50% { transform: translateX(11px);}}
   @keyframes snowflakes-shake8{0%, 100% { transform: translateX(0); } 50% { transform: translateX(11px);}}
   @keyframes snowflakes-shake9{0%, 100% { transform: translateX(0); } 50% { transform: translateX(16px);}}
   @keyframes snowflakes-shake10{0%, 100% { transform: translateX(0); } 50% { transform: translateX(19px);}}
   @keyframes snowflakes-shake11{0%, 100% { transform: translateX(0); } 50% { transform: translateX(16px);}}
   @keyframes snowflakes-shake12{0%, 100% { transform: translateX(0); } 50% { transform: translateX(15px);}}
   @keyframes snowflakes-shake13{0%, 100% { transform: translateX(0); } 50% { transform: translateX(19px);}}
   @keyframes snowflakes-shake14{0%, 100% { transform: translateX(0); } 50% { transform: translateX(16px);}}*/
</style>
<style lang="less">
.team_history {
  padding: 0;
}
</style>
