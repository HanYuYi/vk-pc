<template>
  <div class="roll_home inner_page">
    <div class="wrapper clearfix">

      <div class="main_left fl">

        <!--用户信息-->
        <div class="roll_userinfo" v-if="isLogin">
          <div class="user_headimg" v-lazy-container="lazyHead">
            <img :data-src="userInfo.head_image" alt="">
          </div>
          <div class="user_name ellips" :title="userInfo.nickname">{{userInfo.nickname}}</div>
          <!--申请认证大师-->
          <div class="user_actor" >
            <a href="javascript:;" class="apply_actor"
              @click="applyActorDialog.visible = true"
              v-if="rollUserInfo.showApplyTag">
              {{$t("Apply_for_certification_higher_ups")}}
            </a>
            <img :src="tag.img" alt="" v-for="(tag, index) in rollUserInfo.userTags" :key="index" v-show="tag">
          </div>
          <div class="user_roll_info clearfix">
            <!--粉丝数量-->
            <div class="roll_fans fl">
              <el-popover trigger="hover"
                class="icon" placement="top"
                :content="$t('Number_of_fans')">
                <div slot="reference" class="icon"><span></span></div>
              </el-popover>
              <div class="fans num ellips">{{rollUserInfo.applyed_user}}</div>
            </div>
            <!--获奖数量-->
            <div class="roll_items_total fr">
               <el-popover trigger="hover"
                class="icon" placement="top"
                :content="$t('The_winning_number')">
                <div slot="reference" class="icon"><span></span></div>
               </el-popover>
              <div class="roll_items num ellips">{{rollUserInfo.win_toal}}</div>
            </div>
          </div>
          <!--创建房间-->
          <div class="create_roll_btn btn"  v-if="rollUserInfo.canCreate">
            <a href="javascript:;" class="botton normal" @click="handleCreateRoll">{{$t("Create_a_ROLL_room")}}</a>
          </div>
          <!--参与规则-->
          <div  class="roll_rule">
            <el-popover
              placement="bottom"
              trigger="hover"
              popper-class="roll_rule_pop">
              <div class="join_rule">
                <p>{{$t("Initiate_a_ROLL_activities")}}</p>
                <p>{{$t("To_participate_in_the")}}</p>
                <p>{{$t("The_only_level_3")}}</p>
              </div>
            <a href="javascript:;"  slot="reference">{{$t("Participate_in_the_rules")}}&gt;</a>
            </el-popover>
          </div>
        </div>

        <!--中奖排行榜-->
        <div class="roll_ranking_list list">
          <div class="title">
            <span class="icon"></span><i>月中奖排行榜</i>
          </div>
          <div class="list_wrapper">
            <div class="loader full_screen" v-show="rankListLoading"><span></span></div>
            <div class="no_player" v-if="!rankList.length">{{$t("No_record")}}</div>
            <template v-else>
              <ul class="top_list_con">
                <li class="top_list_box" v-for="item in rankList" :key="item.index"
                     :class="{'first':item.index==0,'second':item.index==1,'third':item.index==2}">
                  <div class="user_headimg" v-lazy-container="lazyHead">
                    <img :data-src="item.head_image" alt="">
                  </div>
                  <div class="user_name ellips" :title="item.username">
                    {{item.username}}
                  </div>
                  <div class="user_win_num">{{item.total_price}}</div>
                </li>
              </ul>
              <ul class="spoils-list">
                <li v-for="item in rankList" :key="item.index" class="user_award"
                    :class="{'first':item.index==0,'second':item.index==1,'third':item.index==2}">
                  <div class="prize-box"><img v-lazy="{src:item.icon_url, error: lazyPack244.error, loading: lazyPack244.loading}" alt=""></div>
                  <p>【第{{ item.index + 1 }}名】</p>
                  <p :title="item.gift_name">{{ item.gift_name }}</p>
                </li>
              </ul>
            </template>
          </div>
        </div>

        <!--中奖动态-->
        <div class="awards_list list">
          <div class="title">
            <span class="icon"></span><i>周中奖排行榜</i>
          </div>
          <div class="list_wrapper">
            <div class="loader full_screen" v-show="historyListLoad"><span></span></div>
            <div class="no_player" v-if="noAwardsPlayer">{{$t("No_record")}}</div>

            <div class="awards_list_box clearfix" v-for="(item,i) in rollHistoryList.slice(0,1)"  :key="item.id">
              <div class="box_left-1 fl">
                <i :class="'level' + i"></i>
              </div>
              <div class="box_left fl">
                <div class="user_headimg" v-lazy-container="lazyHead">
                  <img :data-src="item.head_image" alt="">
                  <div class="user_level" :class="'lv'+item.user_lever"><span></span></div>
                </div>
              </div>
              <div class="box_mid fl">
                <div class="user_name ellips" :title="item.username">{{item.username}}</div>
                <div class="time_info">{{item.total_price}}</div>
              </div>
              <div class="box_right fr">
                <div class="item_img cus-item-img" v-lazy-container="lazyPack244">
                  <img :data-src="item.icon_url" alt="">
                </div>
              </div>
            </div>
          <vue-seamless-scroll
            class="roll_history_scroll"
            :class-option="optionSingleHeightTime"
            :data="rollHistoryList.slice(1,10)">
            <div class="awards_list_box clearfix" v-for="(item,i) in rollHistoryList.slice(1,10)"  :key="item.id">
              <div class="box_left-1 fl">
                <i :class="'level' + (i + 1)" v-if="i<2"></i>
                <span v-else>{{i + 2}}</span>
              </div>
              <div class="box_left fl">
                <div class="user_headimg">
                  <img :src="item.head_image" onerror="this.src='/pc_static/defaultimg/headimg.png'" alt="">
                  <div class="user_level" :class="'lv'+item.user_lever"><span></span></div>
                </div>
              </div>
              <div class="box_mid fl">
                <div class="user_name ellips" :title="item.username">{{item.username}}</div>
                <div class="time_info">{{item.total_price}}</div>
              </div>
            </div>
          </vue-seamless-scroll>
          </div>
        </div>
      </div>

      <div class="main_right fr">
        <!--导航-->
        <div class="roll_nav clearfix">
          <div class="nav_box" v-for="(item, index) in navList"
               :key="index"
               :class="[{'actived':item.type == currentNavId}, {celebrate: item.is_festival}]"
               :style="{width: navList.length > 4 ? `calc(680px / ${navList.length})` : '170px'}"
               @click="navSelect(item.type)">
            <span>{{item.name}}</span>
          </div>
          <div class="search_box search_input fr">
            <input type="text" class="ivu-input"
                   :placeholder="$t('Search_your_room_number')"
                   v-model.trim="searchRoomNum"
                   @keyup.enter="handleSearchRoom">
            <div class="search_icon" @click="handleSearchRoom"></div>
          </div>
        </div>
        <div class="roll_container">
          <div class="loader" v-show="roll_loadding"><span></span></div>
          <!--没有房间-->
          <div class="no_rool_room" v-if="showNoJoin||showNoCreate||showNoSearch">
            <span class="vk_icon error"></span>
            <i v-if="showNoJoin">{{$t("Oh_you_havent_join_any")}}</i>
            <i v-if="showNoCreate">{{$t("Oh_you_have_not_initiated")}}</i>
            <i v-if="showNoSearch">{{$t("Corresponding_to_ROLL_the_room")}}</i>
          </div>
          <!--推荐房间-->
          <div class="recommend_room_text" v-if="showNoJoin||showNoCreate||showNoSearch">
            <span class="line"></span><span class="recommend_title">{{$t("Recommend_a_room")}}</span><span class="line"></span>
          </div>
          <!--房间列表-->
          <ul class="clearfix">
            <li class="rollroom" v-for="(item, index) in rollRoomDataList" :key="index">
              <div class="normal"  @click="toRollRoomDetail(item)">
                <div class="room_level_limit" v-if="item.vip_show_txt">
                  <div class="text_wrapper">
                    <p v-html="item.vip_show_txt"></p>
                    <span class="icon"></span>
                  </div>
                </div>
                <div class="roll_end_mark" v-if="item.is_end==1">{{$t("Has_ended")}}</div>
                <div class="roll_end_mark joined" v-if="item.is_applyed&&!item.is_end">{{$t("Has_been_involved_in")}}</div>
                <div class="item_img" ref="container">
                  <img
                    v-lazy="{src:item.items[0]?item.items[0].icon_url: '', error: lazyPack244.error, loading: lazyPack244.loading}"
                    :alt="item.items[0]?item.items[0].market_name:''">
                  <div class="user_info">
                    <div class="user_headimg">
                      <img v-lazy="{src:item.head_image,error: lazyHead.error, loading: lazyHead.error}">
                      <div class="user_level" :class="'lv'+item.user_lever"><span></span></div>
                    </div>
                  </div>
                </div>
                <div class="user_name ellips" :title="item.username">{{item.username}}</div>
                <div class="user_actor" v-lazy-container="lazyPack244">
                  <img :data-src="tag.img" alt="" v-for="tag in item.tags"  :key="tag.id">
                </div>
                <div class="roll_item_info">
                  <div class="clearfix">
                    <div class="info_title fl">{{$t("The_value_of")}}  (¥)</div>
                    <div class="price fl">{{item.price}}</div>
                    <div class="fr item_total">{{$t("A_total_of")}}{{item.count}}{{$t("piece")}}</div>
                  </div>
                  <div class="clearfix">
                    <div class="info_title fl">{{$t("participation")}}</div>
                    <div class="total_num fl">{{item.apply_total}}{{$t("people")}}</div>
                  </div>
                  <div class="clearfix">
                    <div class="info_title fl">{{$t("The_lottery_time")}}</div>
                    <div class="time_info fl">{{item.end_time*1000 | formatdate('yyyy/MM/dd HH:mm:ss')}}</div>
                  </div>
                  <span class="lock_room" v-if="item.has_pass"></span>
                </div>
              </div>
              <!--已撤销房间 -->
              <div class="masker" v-if="item.is_hide==1||item.is_del==1">
                <div :class="{'room_locked':item.is_hide==1,'room_cancle':item.is_del==1}">
                  <div class="content">
                    <span class="icon"></span>
                    <p v-if="item.is_del==1">{{$t("The_room_has_been_revoked")}}</p>
                    <p v-if="item.is_hide==1">{{$t("The_room_has_been_locked")}}<br/>{{$t("Please_contact_your_administrator")}}</p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <Page :total="page.total"
              :page-size="page.pagesize"
              :current.sync="page.currentpage"
              @on-change="handlePageChange($event)"
              v-if="pageShow&&!roll_loadding"
              class-name="cus_page">
        </Page>
      </div>

    </div>
    <!--申请认证大师弹窗-->
    <el-dialog
      :visible.sync="applyActorDialog.visible"
      :custom-class="applyActorDialog.class">
      <div class="dialog_title" slot="title">{{$t("To_apply_for_certification")}}</div>
      <div class="dialog_wrapper">
        <div class="apply_tips">{{$t("Certification_service_time")}} <span>09:00-18:00</span>{{$t("working_days_processing_time")}}</div>
        <div class="dialog_form_box">
          <div class="actors_select">
            <checkbox-group v-model="applyActorDialog.actors" v-if="applyTagsList.length>0">
              <checkbox v-for="tag in applyTagsList" :key="tag.id" :label="tag.id">{{tag.tag_name}}</checkbox>
            </checkbox-group>
          </div>
          <div class="input_wrapper">
            <div class="input_box clearfix">
              <div class="title_text">{{$t("Contact")}}</div>
              <div class="box_right">
                <input type="text" :placeholder="$t('Please_enter_your_contact_information')" v-model="applyActorDialog.contact" class="ivu-input">
              </div>
            </div>
            <div class="input_box clearfix">
              <div class="title_text">{{$t("Certification_link")}}</div>
              <div class="box_right">
                <input type="text" :placeholder="$t('Please_enter_your_authentication_link')" v-model="applyActorDialog.link" class="ivu-input">
              </div>
            </div>
          </div>
          <div class="btn">
            <a href="javascript:;" class="d_btn normal" @click="applyRollActor">{{$t("To_apply_for_certification")}}</a>
          </div>
        </div>
      </div>
    </el-dialog>

  </div>
</template>
<script type="text/javascript">
import {formatDate, beforeAfterTime, formatNumberSplit} from '../../utils/util'
import { mapState } from "vuex";
export default {
  name: 'roll',
  components: {},
  filters: {
    formatdate (num, formate) {
      return formatDate (num, formate)
    }
  },
  mounted () {
    // 为解决背景图片固定在ie下抖动问题，把背景图片写在body下
    document.body.style.backgroundImage = 'url(' + require('../../assets/es-bg.jpg') + ')'
    document.body.style.backgroundAttachment = 'fixed'
    document.body.style.backgroundRepeat = 'no-repeat'
    document.body.style.backgroundSize = 'cover'
  },
  destroyed () {
    document.body.removeAttribute('style')
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.loadTitleMenu()
      vm.loadRightList ()
      vm.loadHistoryList ()
    })
  },
  computed: {
    ...mapState(["isLogin","userInfo","lazyPack244","lazyHead"]),
    optionSingleHeightTime() {
      return {
        limitMoveNum:3,
        step:0.3,
      }
    }
  },
  watch: {
    'searchRoomNum': function (val,oldval) {
      this.searchRoomNum = val.toString().replace(/[^0-9]/g, '')
    },
    isLogin() {
      this.loadTitleMenu()
    }
  },
  data () {
    return {
      currentNavId: 0,
      pageShow: false,
      applyActorDialog: {
        visible: false,
        class: 'apply_actor_dialog',
        actors: [],
        contact: '',
        link: ''
      },
      rollRoomDataList: [],
      rollUserInfo: { },
      rankList: [],
      rankListLoading: false,
      rollHistoryList: [],
      applyTagsList: [],
      roll_loadding: false,
      historyListLoad: false,
      showNoJoin: false,
      showNoCreate: false,
      showNoSearch: false,
      noAwardsPlayer: false,
      searchRoomNum:'',
      page: {
        total: 0,
        pagesize: 9,
        currentpage: 1
      },
      navList: []
    }
  },
  methods: {
    formatNumber(money){
      return formatNumberSplit(money)
    },

    // 获取roll房间列表分类
    async loadTitleMenu() {
      const response = await this.$http(this.ApiSetting.roll.getTitleMenu)
      console.info("初始化roll房间分类：", response)

      if (response.status === 1 && response.data && response.data.length) {
        this.navList = response.data.filter(item => item.need_login ? this.isLogin : true)
        this.currentNavId = this.navList[0].type
        this.loadRollRoomList ()
      }
    },

    //获取rool房间列表
    loadRollRoomList (id) {
      this.roll_loadding = true
      this.showNoCreate = false
      this.showNoSearch = false
      this.showNoJoin = false
      let data = {
        type: this.currentNavId,
        page: this.page.currentpage
      }
      if(id){
         data.room_id = id
      }
     this.rollRoomDataList = []
      this.$http(this.ApiSetting.roll.getRollRoomList, data)
        .then((res) => {
          if(res.status === 1){
            if(res.data.list.length == 0){
              if(this.currentNavId === 3){
                this.showNoJoin = true
              }
              if(this.currentNavId === 4){
                this.showNoCreate = true
              }
              if(data.room_id || this.currentNavId === 5){
                this.showNoSearch = true
              }
            }else{
              this.rollRoomDataList = res.data.list
            }
            this.page.total = res.data.count
            if(this.page.total<this.page.pagesize){
              this.pageShow = false
            }else{
              this.pageShow = true
            }
          }
        }).finally(() => { this.roll_loadding = false })
    },
    handlePageChange (x) {
      this.page.currentpage = x
      this.loadRollRoomList ()
    },
    navSelect (x) {
      this.currentNavId = x
      this.page.currentpage = 1
      this.loadRollRoomList ()
    },
    //用户信息和中奖排行榜
    loadRightList () {
      this.rankListLoading = true
      this.$http(this.ApiSetting.roll.getRightList)
        .then((res) => {
          if (res.status === 1){
            if (res.data.applyed === 1){
              this.rollUserInfo.showApplyTag = false
            }else{
              this.rollUserInfo.showApplyTag = true
            }
            if(res.data.extraInfo){
              this.rollUserInfo.applyed_user = res.data.extraInfo.applyed_user?res.data.extraInfo.applyed_user:0
              this.rollUserInfo.win_toal = res.data.extraInfo.win_toal?res.data.extraInfo.applyed_user:0
            }
            this.rollUserInfo.userTags = res.data.userTags?res.data.userTags:[]
            this.rollUserInfo.canCreate = res.data.canCreate?res.data.canCreate:false
            this.applyTagsList = res.data.applyTags?res.data.applyTags:[]
            let _rankList = res.data.rank && res.data.rank.length ? res.data.rank.slice(0, 3):[]
            this.rankList = _rankList
            if(this.rankList && this.rankList.length){
              this.rankList.forEach(function (v,i) {
                v.index = i
              })
              let first = this.rankList.shift()
              this.rankList.splice(1,0,first)
            }
          }
        })
        .finally(() => { this.rankListLoading = false })
    },
    //获奖动态
    loadHistoryList (){
      let data = {
        num: 4
      }
      this.historyListLoad = true
      this.noAwardsPlayer = false
      this.rollHistoryList = []
      this.$http(this.ApiSetting.roll.getHistoryList, data)
        .then((res) => {
          this.historyListLoad = false
          if(res.status === 1){
            if(res.data&&res.data.length>0){
              this.rollHistoryList = res.data
              this.rollHistoryList.forEach(function (v,i) {
                v.timeDesc = beforeAfterTime(Math.floor((new Date().getTime() - v.win_time*1000)/1000),3)
              })
            }else{
              this.noAwardsPlayer = true
            }
          }
        }, (err) => {
          this.historyListLoad = false
        })
    },
    toRollRoomDetail (x) {
      this.$router.push({params: {id: x.id}, name: 'rollroom'})
    },
    handleCreateRoll () {
      if(this.rollUserInfo.canCreate){
        this.$router.push({path: '/roll/createroom'})
      }else {
        this.$message({
          message: this.$t("Do_not_have_permission_to"),
          type: 'warning'
        })
      }
    },
    //申请认证大师
    applyRollActor () {
      if(!this.applyActorDialog.actors.length) {
        this.$message({
          message: '请选择您要认证的身份',
          type: 'warning'
        })
        return
      }
      if(!this.applyActorDialog.contact) {
        this.$message({
          message: '请输入您的联系方式',
          type: 'warning'
        })
        return
      }
      if(!this.applyActorDialog.link) {
        this.$message({
          message: '请输入您的认证链接',
          type: 'warning'
        })
        return
      }
      let data = {
        tag_ids: this.applyActorDialog.actors.length>1?this.applyActorDialog.actors.join(','):this.applyActorDialog.actors[0],
        contact: this.applyActorDialog.contact,
        url: this.applyActorDialog.link
      }
      this.$http(this.ApiSetting.roll.applyRollTags, data)
        .then((res) => {
          if(res.status === 1){
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.rollUserInfo.showApplyTag = false
            setTimeout(() => {
              this.applyActorDialog.visible = false
            },600)
          }
        })
    },
    //搜索房间
    handleSearchRoom () {
      if(this.searchRoomNum.length === 0 ){
        return false
      }
      let id = this.searchRoomNum*1
      this.currentNavId = 2
      this.page.currentpage = 1
      this.loadRollRoomList (id)
    }
  }
}
</script>
<style>
  .apply_actor_dialog .el-dialog__body{
    padding-top: 0;
  }
  .roll_rule_pop{
    padding: 10px 20px;
    width: 400px;
    font-size: 14px;
    line-height: 20px;
  }
  .roll_rule_pop p{
    margin: 5px 0;
  }
</style>
<style lang="less" scoped>
  .main_right {
    width: 926px;
  }
  .main_left {
    width: 295px;
  }
  .roll_nav {
    height: 60px;
    background-color: #262933;
    .search_box {
      width: 190px;
      margin-right: 20px;
      margin-top: 13px;
    }
    .nav_box {
      float: left;
      width: 170px;
      height: 100%;
      line-height: 60px;
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
      transition: color .2s ease;
      &>span {
        position: relative;
        z-index: 2;
      }
      &.actived {
        color: #07f1b7;
        background: url("../../assets/nav_select_bg.png") no-repeat;
        background-size: 100% 100%;
      }
      &:hover {
        color: #07f1b7;
      }
      &.celebrate {
        position: relative;
        &:after {
          pointer-events: none;
          position: absolute;
          content: "";
          inset: 0;
          left: calc((100% - 200px) / 2);
          z-index: 1;
          width: 200px;
          height: 60px;
          background: url("../../assets/roll/celebrate.gif") no-repeat;
        }
      }
    }
  }
  .roll_container {
    padding-top: 20px;
    max-height: 1137px;
    .no_rool_room {
      height: 140px;
      line-height: 140px;
      color: #fff;
      font-size: 18px;
      text-align: center;
      margin-bottom: 20px;
      i {
        margin-left: 10px;
      }
    }
    .recommend_room_text {
      margin-top: 20px;
      height: 30px;
      line-height: 30px;
      & > span {
        display: inline-block;
        vertical-align: middle;
        color: #fff;
        font-size: 18px;
        text-align: center;
      }
      .line {
        width: 413px;
        height: 1px;
        background-color: #3f4352;
      }
      .recommend_title {
        width: 100px;
      }
    }
    ul {
      overflow-x: hidden;
      margin-right: -20px;
      .rollroom {
        width: 295px;
        height: 358px;
        box-sizing: border-box;
        float: left;
        margin-right: 20px;
        margin-bottom: 20px;
        background-color: #262933;
        color: #4f5466;
        position: relative;
        .normal {
          position: relative;
          padding: 20px 20px 0;
          height: 100%;
          box-sizing: border-box;
          cursor: pointer;
          border: 1px solid transparent;
          transition: border-color.2s ease;
          &:hover {
            border-color: #07e9f1;
          }
          .room_level_limit {
            position: absolute;
            width: 48px;
            height: 48px;
            left: -1px;
            top: -1px;
            color: #07e9f1;
            overflow: hidden;
            &:after {
              content: '';
              position: absolute;
              width: 96px;
              height: 96px;
              left: -48px;
              top: -48px;
              border-radius: 50%;
              background-color: rgba(7,233,241,0.3);
              z-index: 1;
            }
            .text_wrapper {
              position: absolute;
              height: 100%;
              box-sizing: border-box;
              padding-top: 1px;
              padding-left: 2px;
              z-index: 2;
              text-align: center;
              color: #07e9f1;
              transform: scale( 0.8 );
            }
            .icon {
              display: inline-block;
              width: 12px;
              height: 16px;
              background: url("../../assets/roll/lv_lock.png") no-repeat center;
            }
          }
          .roll_end_mark {
            position: absolute;
            right: 20px;
            top: 0;
            width: 24px;
            color: #000;
            font-size: 14px;
            text-align: center;
            line-height: 15px;
            background-color: #7c839f;
            padding: 5px 0 5px;
            z-index: 2;
            &:after {
              content: '';
              position: absolute;
              bottom: -6px;
              left: 0;
              width: 0;
              height: 6px;
              border-left: 12px solid #7c839f;
              border-right: 12px solid #7c839f;
              border-bottom: 6px solid transparent;
            }
            &.joined {
              background-color: #07f1b7;
              &:after {
                border-left: 12px solid #07f1b7;
                border-right: 12px solid #07f1b7;
              }
            }
          }
          .user_name {
            box-sizing: border-box;
            padding: 0 20px;
            color: #fff;
            font-size: 14px;
            line-height: 26px;
            height: 26px;
            text-align: center;
            margin-top: 28px;
          }
          .user_actor {
            text-align: left;
          }
          .roll_item_info {
            position: relative;
            color: #7c839f;
            padding-top: 6px;
            font-size: 14px;
            & > div {
              line-height: 22px;
            }
            .info_title {
              width: 50px;
              color: #484d5e;
              margin-right: 20px;
              font-size: 12px;
              white-space: nowrap;
            }
            .lock_room {
              position: absolute;
              bottom: 0;
              right: 0;
              width: 28px;
              height: 28px;
              background: url("../../assets/roll/lock.png") no-repeat center;
            }
            .price {
              display: inline-block;
              font-size: 16px;
              color: #07f1b7;
            }
            .item_total {
              font-size: 12px;
            }
          }
        }
        .item_img {
          width: 100%;
          text-align: center;
          position: relative;
          height: 162px;
          img {
            max-width: 100%;
            height: 100%;
          }
          .user_info {
            position: absolute;
            height: 54px;
            width: 50px;
            left: 50%;
            bottom: -27px;
            transform: translateX(-50%);
            .user_headimg {
              position: absolute;
            }
          }
        }
        .masker {
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
          background-color: rgba(38, 41, 51,0.9);
          & > div {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            text-align: center;
            color: #7c839f;
          }
          .content {
            width: 100%;
            .icon {
              display: inline-block;
              height: 62px;
              background: url("../../assets/web-icons.png") no-repeat;
            }
            p {
              font-size: 18px;
              margin-top: 30px;
              line-height: 20px;
              text-align: center;
            }
          }
          .room_locked {
            .content {
              .icon {
                width: 49px;
                background-position: -900px -221px;
              }
            }
          }
          .room_cancle {
            .content {
              .icon {
                width: 62px;
                background-position: -808px -221px;
              }
            }
          }
        }
      }
    }
  }
  .cus_page {
    display: flex;
    justify-content: flex-end;
  }
  .roll_userinfo {
    height: 430px;
    background: #21242d url("../../assets/roll/user_bg.png") no-repeat bottom center;
    margin-bottom: 20px;
    box-sizing: border-box;
    padding: 20px;
    position: relative;
    .user_headimg {
      height: 90px;
      width: 90px;
      margin: 5px auto;
      box-shadow: 0 0 0 5px #1c4d49;
    }
    .user_actor {
      margin-top: 5px;
      text-align: center;
      img[lazy=loading],img[lazy=error] {
        height: 26px;
        width: auto;
        margin-right: 2px;
      }
      .apply_actor {
        display: inline-block;
        height: 18px;
        line-height: 16px;
        color: #fff;
        padding: 0 6px;
        border-radius: 10px;
        border: 1px solid #07f1b7;
        vertical-align: middle;
        &:hover {
          color: #07f1b7;
        }
      }
    }
    .user_name {
      color: #fff;
      font-size: 18px;
      line-height: 30px;
      height: 30px;
      margin-top: 18px;
      text-align: center;
    }
    .user_roll_info {
      margin-top: 30px;
      & > div {
        width: 126px;
        text-align: center;
        .icon {
          span {
            display: inline-block;
            width: 28px;
            height: 28px;
          }
        }
        .num {
          color: #fff;
          font-size: 16px;
          line-height: 40px;
        }
      }
      .roll_fans {
        .icon {
          span {
            background: url("../../assets/roll/fans_icon.png") no-repeat center;
          }
        }
      }
      .roll_items_total {
        .icon {
          span {
            background: url("../../assets/roll/items_total.png") no-repeat center;
          }
        }
      }
    }
    .create_roll_btn {
      margin-top: 30px;
      a {
        width: 100%;
      }
    }
    .roll_rule {
      text-align: center;
      line-height: 30px;
      height: 30px;
      margin-top: 10px;
      position: absolute;
      left: 0;
      bottom: 20px;
      width: 100%;
      a {
        color: #07f1b7;
        opacity: 0.6;
        &:hover {
          opacity: 1;
        }
      }
    }
  }
  .rollroom .normal .user_actor img[lazy=loading],
  .rollroom .normal .user_actor img[lazy=error] {
    height: 26px;
    width: auto;
    margin-right: 2px;
  }
  .list {
    margin-bottom: 20px;
    background-color: #21242d;
    .title {
      height: 50px;
      line-height: 50px;
      background-color: #262933;
      color: #fff;
      font-size: 18px;
      box-sizing: border-box;
      padding-left: 12px;
      span {
        display: inline-block;
        margin-right: 10px;
        width: 40px;
        vertical-align: middle;
      }
    }
    &.awards_list {
      background: transparent;
      .title {
        span {
          height: 26px;
          background: url("../../assets/roll/awards_icon.png") no-repeat center;
        }
      }
    }
    .list_wrapper {
      background-color: rgba(0,0,0,0.5);
      height: 316px;
      overflow: hidden;
      .no_player {
        display: flex;
        height: 100%;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        color: #7c839f;
      }
      .box_mid {
        margin-left: 5px;
        width: 110px;
        overflow: hidden;
        * {
          white-space: nowrap;
        }
      }
      .box_right {
        margin-left: 8px;
      }
      .cus-item-img {
        width: 72px;
        height: 48px;
        border-radius: 4px;
        background-color: #2d303c;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
    }
  }
  .roll_ranking_list {
    background: rgba(0, 0, 0, 0.5);
    .title {
      span {
        height: 27px;
        background: url("../../assets/roll/icon.png") no-repeat center;
      }
    }
    .list_wrapper {
      height: 291px;
      position: relative;
      background: transparent;
      .top_list {
        padding: 12px 8px 0;
      }
      .top_list_con {
        display: flex;
        padding: 0 8px;
        justify-content: space-between;
        .top_list_box {
          text-align: center;
          margin-top: 24px;
          width: 84px;
          height: 133px;
          border-radius: 4px;
          background: linear-gradient(to bottom right,#484d60 60%,#303441);
          position: relative;
          .user_headimg {
            margin: 31px auto 0;
            border: 3px solid #fed530;
            width: 46px;
            height: 46px;
            position: relative;
            &::after {
              content: "";
              display: block;
              width: 37px;
              height: 30px;
              top: -25px;
              left: 50%;
              transform: translateX(-50%);
              position: absolute;
            }
            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
          .user_name {
            font-size: 12px;
            line-height: 12px;
            color: #ffffff;
            margin-top: 6px;
          }
          .user_win_num {
            color: #07f1b7;
            font-size: 14px;
            margin-top: 5px;
          }
          &.first {
            width: 101px;
            z-index: 2;
            transform: scale(1.18, 1.18);
            box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.5);
            .user_headimg {
              border: 3px solid #fffb44;
              &::after {
                background: url("../../assets/roll/1.png") no-repeat;
                background-size: 100% 100%;;
              }
            }
            .user_name {
              font-size: 10px;
            }
          }
          &.second {
            z-index: 1;
            .user_headimg {
              border: 3px solid #7c839f;
              &::after {
                background: url("../../assets/roll/2.png") no-repeat center 100%;
              }
            }
          }
          &.third {
            z-index: 1;
            .user_headimg {
              border: 3px solid #cca891;
              &::after {
                background: url("../../assets/roll/3.png") no-repeat center 100%;
              }
            }
          }
        }
      }

      .spoils-list {
        display: flex;
        padding: 0 14px;
        justify-content: space-between;
        margin-top: 28px;
        .user_award {
          width: 72px;
          display: flex;
          flex-direction: column;
          align-items: center;
          &.first {
            width: 96px;
            .prize-box {
              height: 56px;
              margin-top: -4px;
            }
            p:nth-child(2) {
              margin-top: 8px;
            }
          }
          .prize-box {
            width: 100%;
            height: 48px;
            border-radius: 4px;
            overflow: hidden;
            img {
              height: 100%;
            }
          }
          p:nth-child(2) {
            text-align: center;
            font-size: 14px;
            font-weight: bold;
            color: #fff;
            margin-top: 12px;
          }
          p:nth-child(3) {
            text-align: center;
            font-size: 12px;
            color: #fff;
            margin-top: 2px;
            width: 100%;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
        }
      }
    }
  }
  .apply_actor_dialog {
    .apply_tips {
      font-size: 12px;
      background: #1a1c22;
      height: 48px;
      line-height: 48px;
      padding-left: 20px;
      span {
        color: #7c839f;
      }
    }
    .actors_select {
      text-align: center;
      margin-bottom: 36px;
      label {
        margin: 0 30px;
      }
      .ivu-checkbox-wrapper {
        &.ivu-checkbox-wrapper-checked {
          color: #07f1b7;
        }
      }
    }
  }

</style>
