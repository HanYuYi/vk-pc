<template>
  <div class="active_mining" :class="{mining: isMining && !isDoMining}" @click.right="handleMouseRight">
    <div class="active_header">
      <img src="../../../assets/active/mining/bg-top.png" alt="">
      <div class="header_content">
        <div class="menu_box">
        <div class="menu">
          <div class="menu_item" @click="showListModal(1)">{{$t('reward_records')}}</div>
          <div class="menu_item" @click="showListModal(2)">{{$t('rewards_display')}}</div>
        </div>
        <div class="miner">
          <div id="miner_svga_img" class="miner_svga_img" v-show="!isDoMining"></div>
          <div id="mining_svga_img" class="mining_svga_img" v-show="isDoMining"></div>
        </div>
        <div class="mining_status" >
          <span class="hammer" v-show="isFirstTime && !isJoinOther" @click="handleMiningStart" :class="{is_first: isFirstTime, nocursor: !isReadyMining}"></span>
          <div id="hoe_svga_img" class="hammer hoe_svga_img" @click="handleMiningStart" :class="{hidden: !isHoeShow || isJoinOther, nocursor: !isReadyMining}"></div>
          <span class="status_text" :class="{'is_join_other':isJoinOther}" v-html="getMiningStatus"></span>
          <div id="pointer_svga_img" class="pointer_svga_img" v-show="isFirstTime && isLogin && !isJoinOther"><span class="pointer_tips">点击锄头开始挖矿 (右击取消挖矿)</span></div>
        </div>
      </div>
      <div class="treasure_box">
        <div id="hoeing_svga_img" class="hoeing_svga_img" v-show="isDoMining" :style="hoeingImgStylePosition"></div>
        <span v-for="(item,index) in randomTreasures" @click="handleMining($event, index, item.isEmpty)"
          :key="index" class="treasure_item" :class="[{shinning: item.isShinning, empty: item.isEmpty}, `type_${item.type}`, item.shinningSize]" :style="item.style">
          <img v-show="item.isShinning" src="../../../assets/active/mining/shining.png" alt="" class="shinning_img">
          <img :src="getImgSrcByType(item)" :style="{width: item.style.width}">
        </span>
      </div>
      </div>
    </div>

    <div class="active_desc_box">
      <img class="top_leave" src="../../../assets/active/mining/content-top-leave.png" />
      <img class="left_leave" src="../../../assets/active/mining/content-left-leave.png" />
      <img class="right_leave" src="../../../assets/active/mining/content-right-leave.png" />
      <div class="inner_box">
        <div class="active_period box_bg">
          <h2>{{$t('The_activity_time')}}</h2>
          <div class="content">{{formatActivePeriod}}</div>
        </div>
        <div class="active_content box_bg">
          <h2>{{$t('Event_details')}}</h2>
          <div class="content" v-html="$t('mining_content')"></div>
        </div>
        <div class="active_rules box_bg">
          <h2>{{$t('Activity_rules')}}</h2>
          <div class="content" v-html="$t('mining_rules')"></div>
        </div>
        <div class="active_detail">
          <h2>{{$t('get_chance_method')}}</h2>
          <table class="detail_desc">
            <tr>
              <th>{{$t('The_first_charge_amount')}}</th>
              <th>{{$t('Get_chance')}}</th>
              <th>{{$t('The_cumulative_get_chance')}}</th>
            </tr>
            <tr> <td>100</td> <td>1</td> <td>1</td> </tr>
            <tr> <td>300</td> <td>1</td> <td>2</td> </tr>
            <tr> <td>600</td> <td>1</td> <td>3</td> </tr>
            <tr> <td>1000</td> <td>1</td> <td>4</td> </tr>
            <tr> <td>1500</td> <td>1</td> <td>5</td> </tr>
            <tr> <td>2000</td> <td>1</td> <td>6</td> </tr>
            <tr> <td>2500</td> <td>1</td> <td>7</td> </tr>
            <tr> <td>3000</td> <td>1</td> <td>8</td> </tr>
            <tr> <td>4000</td> <td>1</td> <td>9</td> </tr>
            <tr> <td>5000</td> <td>1</td> <td>10</td> </tr>
          </table>
        </div>
      </div>
    </div>
    <div class="mining_modal_wrap" v-show="isSuccessModalShow">
    <div class="mining_modal reward_modal" >
      <span class="btn-confirm" @click="handleSuccessModalClose"></span>
      <img class="top_leave" src="../../../assets/active/mining/reward-top-leave.png" />
      <img class="left_leave" src="../../../assets/active/mining/reward-left-leave.png" />
      <img class="right_leave" src="../../../assets/active/mining/reward-right-leave.png" />
      <img class="stars" src="../../../assets/active/mining/stars.png" />

      <div class="modal_inner">
        <div class="content">
          <p class="congratulations">{{$t('Congratulations_to_you_to_get')}}</p>
          <p class="reward_name">{{fetchData.prizeData.name}}</p>
          <div class="reward_img"><img :src="fetchData.prizeData.src"></div>
          <div class="reward_code" v-show="fetchData.prizeData.code">{{$t('Conversion_code')}}：{{fetchData.prizeData.code}}</div>
        </div>
      </div>

    </div>

    </div>
    <div class="mining_modal_wrap" v-show="isListModalShow">

    <div class="mining_modal rewards_list_modal">
      <span class="btn-x" @click="handleListModalClose"></span>
      <img class="left_leave" src="../../../assets/active/mining/reward-left-leave.png" />
      <img class="right_leave" src="../../../assets/active/mining/reward-right-leave.png" />
      <div class="tabs">
        <span @click="handleTabClick(1)" class="tab_item" :class="{active: selectedTab == 1}">{{$t('reward_records')}}</span><span @click="handleTabClick(2)" :class="{active: selectedTab == 2}" class="tab_item">{{$t('rewards_display')}}</span>
      </div>
      <div class="modal_inner">
        <div class="content">
          <div class="content_item records_list" :class="{active: selectedTab == 1}">
            <table>
              <tr>
                <th></th>
                <th>{{$t('reward_item')}}</th>
                <th>{{$t('reward_time')}}</th>
              </tr>
              <tr v-for="item in fetchData.recordsList.data" :key="item.active_record_id">
                <td><img :src="item.icon_url" alt=""></td>
                <td>{{item.desc}}</td>
                <td>{{getFormateTime(item.finish_time)}}</td>
                </tr>
            </table>
            <Page
            v-if="isShowPage"
            class-name="records_pagination"
            :total="fetchData.recordsList.total"
            :page-size="pageSize"
            size="small"
            :current.sync="currentPage"
            @on-change="handlePageChange($event)"></Page>

          </div>
          <div class="content_item rewards_list" :class="{active: selectedTab == 2}">
            <p class="list_desc" v-html="$t('reward_display_desc')"></p>
            <ul class="list_content">
              <li class="list_item" v-for="reward in fetchData.rewardsList" :key="reward.id">
                <div class="item_img"><img :src="reward.icon_url"></div>
                <p class="item_desc" :title="reward.desc">{{reward.desc}}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </div>
      </div>
    <router-link to="/active" class="toback">返回活动首页 </router-link>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import {formatDate, setCookie, getCookie} from "../../../utils/util";

// const SVGAForIE = require('svgaplayerweb/build/svga.ie.min.js'); // this plugin does not surpport import through ECMA6(import)
// const SVGA = require('svgaplayerweb/build/svga.min.js');
import SEVEN_DAYS_POSITION from '../7-positions.json';
const svgaSwf = require('../../../../pc_static/SVGAPlayerWeb.swf');
export default {
  name:'',
  data() {
    return {
      isLoading: false,
      fetchData:{
        init:{},
        rewardsList:[],
        recordsList:{
          data: [],
          total: 0,
        },
        prizeData:{
        },
      },
      randomTreasures:[],
      hoeingImgStylePosition:{},
      isSuccessModalShow: false,
      isListModalShow: false,
      isMining: false,
      isDoMining: false,
      selectedTab: 1,
      currentPage: 1,
      pageSize: 8,
      isFirstTime: getCookie('haveMined') != 1,
      isCanPlay:true,
      isJoinOther:0,
      joinOtherTips:''
    }
  },
  mounted () {
    try{
      this.initSvgaPlayer();
    }catch(e){
      console.error(e);
    }
    this.getInitData();
    this.getRecordsList();
    this.getRewardsList();
    this.startTimeoutRandom();
  },
  beforeRouteLeave (to, from, next) {
    document.body.style.minWidth = "1240px";
    next()
  },
  computed:{
    isLogin(){
      return this.fetchData.init.is_login;
    },
    hasTimes(){
      return +this.fetchData.init.left_times > 0;
    },
    isReadyMining(){
      return this.fetchData.init.is_login && this.hasTimes;
    },
    isShowPage(){
      return this.fetchData.recordsList.total > this.pageSize && this.selectedTab == 1;
    },
    isHoeShow(){
      return !this.isFirstTime && !this.isMining;
    },
    getMiningStatus(){
      return this.fetchData.init.is_login
      ? this.isJoinOther? this.joinOtherTips:this.$t('mining_left_times') + " <span class='times' style='font-size: 30px;color:#fff000;'>"+ this.fetchData.init.left_times + "</span> " +  this.$t('times_label')
      : this.$t('login_first');
    },
    formatActivePeriod(){
      const { active_start_time, active_end_time} = this.fetchData.init;
      return `${formatDate(+active_start_time * 1000, 'chineseDate')} 至 ${formatDate(+active_end_time * 1000, 'chineseDate')}`;
    },
    browserName(){
      return vm.$browserDetect.meta.name;
    },
    browserVersion(){
      return vm.$browserDetect.meta.version;
    },
  },
  methods: {
    startTimeoutRandom(){
      const randomSec = 3000 + parseInt(Math.random() * 4) * 1000;
      setTimeout(() => {
        this.getTodayRandomPositionTreasures();
        this.startTimeoutRandom();
      }, randomSec);
    },
    handleMouseRight(e){
      if(!this.isDoMining && this.isMining){
        this.isMining = false;
        e.preventDefault();
        e.stopPropagation();
      }
    },
    showListModal(type){
      if(!this.fetchData.init.is_login&&type === 1){
          Message({
            message: this.$t('login_first'),
            type:'warning',
            duration: 1500
          })
        return;
      }
      this.isListModalShow = true;
      this.selectedTab = type;
      this.isMining = false;
    },
    getFormateTime(time){
      return formatDate(time * 1000, 'MM-dd HH:mm');
    },
    handlePageChange(){
      this.getRecordsList();
    },
    handleTabClick(type){
      this.selectedTab = type;
    },
    handleListModalClose(){
      this.isListModalShow = false;
      // reset
      this.currentPage = 1;
    },
    handleSuccessModalClose(){
      this.isSuccessModalShow = false;
    },
    handleMiningStart(e, ){
      // only first time we do something like show pointer,so we use cache and expired at one month later
      if(!this.isCanPlay) {
        this.$message({
          message: this.$t("midautumn_7"),
          type: 'warning'
        })
        return
      }
      this.isFirstTime = false;

      if(this.fetchData.init.is_login){
        if(getCookie('haveMined') != 1){
          const today = new Date();
          setCookie('haveMined', '1', new Date(today.getFullYear(), today.getMonth() + 5, today.getDate()));
        };


        if(!this.hasTimes){

          return Message({
            message: this.fetchData.init.time_used_up ? this.$t('times_used_up') : this.$t('go_to_prepaid_phone'),
            type: 'warning',
            duration: 1500,
          });
        }
        if(this.isMining){
          this.isMining = false;
        }else{
          this.isMining = true;
        }
      }else{
          Message({
            message: this.$t('login_first'),
            type:'warning',
            duration: 1500
          })
      }
    },
    handleMining(e, index, isEmpty){
      if(this.isDoMining || this.isLoading){
        return;
      }
      if(isEmpty){
        return;
      }
      if(!this.fetchData.init.is_login){
        Message({
          message: this.$t('login_first'),
          type:'warning',
          duration: 1500
        })
        return;
      }
      if(!this.isMining){
        return;
      }
      let {left, top, width, height} = window.getComputedStyle(e.target.parentElement);
      const hammerWidth = 180;
      const randomTimeout = (2 + Math.floor(Math.random() * 3)) * 1000;

      left = left.replace('px', '');
      top = top.replace('px', '');
      width = width.replace('px', '');
      height = height.replace('px', '');

      this.isDoMining = true;
      this.hoeingImgStylePosition = {
        left: +left + +(width/2).toFixed() - (hammerWidth/4 * 1) + 'px',
        top: +top + +(height/2).toFixed() - (hammerWidth/4 * 3) + 'px',
      };
      setTimeout(() => {
        this.isDoMining = false;
        this.doMining(index);
      }, randomTimeout);

    },
    doMining(index){
      const { is_login } = this.fetchData.init;
      if(is_login){
        this.isLoading = true;
        this.$http(this.ApiSetting.active.mining.miningDo, {
          mining_id: index,
        })
          .then(res=>{
            if(res.status == 1){
              this.isSuccessModalShow = true;
              this.isMining = false;
              const prizeDetail = this.fetchData.rewardsList.find(item => item.id == res.data.prize_id) || {};

              this.fetchData.prizeData = {
                name: prizeDetail.desc || '',
                src: prizeDetail.icon_url || '',
                ...res.data,
              };
              // need refresh
              this.getInitData();
              this.getRecordsList();
            }
            this.isLoading = false;
          },()=>{
            this.isLoading = false;
          })
      }else{
          Message({
            message: this.$t('login_first'),
            type:'warning',
            duration: 1500
          })
      }
      return
    },
    getInitData(){
      this.$http(this.ApiSetting.active.mining.getMiningInitInfo)
        .then(res=>{
          if(res.status == 1){
            this.fetchData.init = res.data || {};
            this.isJoinOther = res.data.is_join_other||0;
            this.joinOtherTips = res.data.join_other_tips||'';
            if(res.data.time_used_up == 3) {
              this.isCanPlay = false
            }else {
              this.isCanPlay = true
            }
            this.getTodayRandomPositionTreasures();
            if(!res.data.left_times){
              this.isMining = false;
            }

          }
        })
    },
    getRecordsList(params){
      this.$http(this.ApiSetting.active.mining.getMiningRecordList, {
        page: this.currentPage,
        page_size: this.pageSize,
        ...(params || {}),
      })
        .then(res=>{
          if(res.status == 1){
            this.fetchData.recordsList = res.data ? res.data.record_list || {} : {};
          }
        })
    },
    getRewardsList(){
      this.$http(this.ApiSetting.active.mining.getMiningRewardsList)
        .then(res=>{
          if(res.status == 1){
            this.fetchData.rewardsList = res.data || {};
          }
        })
    },

    getImgSrcByType(item){
      const srcMap = {
        0: require('../../../assets/active/mining/skull.png'),
        1: require('../../../assets/active/mining/rocks.png'),
        2: require('../../../assets/active/mining/woods.png'),
        3: require('../../../assets/active/mining/gold.png'),
        4: require('../../../assets/active/mining/gold-bag.png'),
        5: require('../../../assets/active/mining/diamonds.png'),
        6: require('../../../assets/active/mining/red-diamond.png'),
      };
      const srcEmptyMap = {
        0: require('../../../assets/active/mining/skull-empty.png'),
        1: require('../../../assets/active/mining/rocks-empty.png'),
        2: require('../../../assets/active/mining/woods-empty.png'),
        3: require('../../../assets/active/mining/gold-empty.png'),
        4: require('../../../assets/active/mining/gold-bag-empty.png'),
        5: require('../../../assets/active/mining/diamonds-empty.png'),
        6: require('../../../assets/active/mining/red-diamond-empty.png'),
      };

      return item.isEmpty ? srcEmptyMap[item.type] : srcMap[item.type];
    },

    loadSvga(selector, url){
        var player = new SVGA.Player(selector);
        var parser = new SVGA.Parser(selector);
        parser.load(url,videoItem => {
          player.setVideoItem(videoItem);
          player.startAnimation();
        }, error=>{})
    },

    initSvgaPlayer(){
      var svgaImgs = [
        {
          selector: "#miner_svga_img",
          src: require("../../../assets/active/mining/miner.svga"),
        },
        {
          selector: "#mining_svga_img",
          src: require("../../../assets/active/mining/mining.svga"),
        },
        {
          selector: "#hoe_svga_img",
          src: require("../../../assets/active/mining/hoe.svga"),
        },
        {
          selector: "#pointer_svga_img",
          src: require("../../../assets/active/mining/pointer.svga"),
        },

        {
          selector: "#hoeing_svga_img",
          src: require("../../../assets/active/mining/hoeing.svga"),
        },
      ];

      svgaImgs.forEach(item=> this.loadSvga(item.selector, item.src));
    },

    /* we need change all treasures position each day */
    getTodayRandomPositionTreasures(){
      this.randomTreasures = this.getRandomTreasures();
    },
    getRandomTreasures(){

      const {ini_infos } = this.fetchData.init;
      const today = new Date();

      if(!ini_infos){
        return [];
      };
      const date = new Date().getDay();
      return SEVEN_DAYS_POSITION[date].map((item,index)=>{

        const isShinning = Math.random() > 0.5;
        const shinningSize = Math.floor(Math.random() * 3);
        const sizeClassMap = {
          0: 'small',
          1: 'middle',
          2: 'large'
        };
        const isEmpty = ini_infos.split(',')[index] == 0;
        const [left,top,width,type] = item;
        const numberWidth = +width.replace('px','');
        return {
          type,
          isEmpty,
          isShinning: /[3456]/.test(type) ? isShinning : false,
          shinningSize: numberWidth > 50 && numberWidth < 150 ? 'middle' : numberWidth > 150 ? 'large' : 'small',
          style: {
            left,
            top,
            width,
          },
        }
      });
    },
  }
}
</script>

<style lang="less" >
  .active_mining{
    min-width: 1902px;
    position: relative;
    background: url("../../../assets/active/mining/bg-bottom.jpg") no-repeat center center;
    background-size: 100% 100%;
    overflow: hidden; // avoid margin collapse
    .toback {
      display: block;
      margin: 0 auto 60px;
      width:340px;
      height: 100px;
      line-height: 90px;
      background:url("../../../assets/active/mining/left-times-bg.png") no-repeat;
      cursor: pointer;
      text-align: center;
      font-size: 28px;
      color: #3a4043;
      font-weight: bold;
      &:hover {
        opacity: 0.9;
      }
    }
    &.mining .treasure_item:hover{
      transform: scale(1.1);
    }
    &::before{
        content: '';
        display: inline-block;
        position: absolute;
        z-index: 1;

        background: url("../../../assets/active/mining/bg-right-leave.png") no-repeat;
        background-size: 100% 100%;
        width: 479px;
        height: 329px;
        right: 0;
        bottom: 27px;

      }
    .active_rules {
      em {
        color:#fff;
      }
    }
    .active_header{
      position: relative;
      // padding-top: 360px;
      // background: url("../../../assets/active/mining/bg-top.png") center top no-repeat;
      // // background-size: 100% 100%;
      // background-size:cover;
      // height: 1200px;
      box-sizing: border-box;
      .header_content{
        width: 100%;
        position: absolute;
        top: 29%;
        left: 50%;
        transform: translateX(-50%);

      }
      > img{
        min-height: 1000px;
      }
      img{
        width: 100%;
      }

      &::before{
        content: '';
        display: inline-block;
        position: absolute;
        z-index: 1;
        background: url("../../../assets/active/mining/bg-left-leave.png") no-repeat;
        background-size: 100% 100%;
        width: 178px;
        height: 372px;
        left: 0;
        bottom: -388px;
      }
    }

    .icon-acitve-mining{
      display: inline-block;
      width: 36px;
      height: 36px;
      background: url("../../../assets/active/mining/small-hammer.png") no-repeat;
      background-size: 100% 100%;
      vertical-align: middle;
    }

    &.mining{

      &:hover{
        cursor: url("../../../assets/active/mining/hammer.png") 2 65, auto;
      }

      @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
        &:hover{
          cursor: url("../../../assets/active/mining/hammer.cur"), auto;
        }
      }
    }

    .menu_box{
      position: relative;
      width: 63%;
      height: 316px;
      margin: 0 auto;
      .menu{
        cursor: default;
        height: 295px;
        background: url("../../../assets/active/mining/menu-carrier.png") no-repeat center top;
        display: inline-block;
        position: absolute;
        left:18px;
        top: -16px;
        .menu_item{
          background: url("../../../assets/active/mining/menu-bg.png") no-repeat 100% 100%;
          background-size: 100% 100%;
          width: 231px;
          height: 84px;
          line-height: 84px;
          font-size: 22px;
          color: #6a452a;
          font-weight: bold;
          text-align: center;
          &:first-child{
            margin-top: 34px;
          }
          &:last-child{
            margin-top: 16px;
          }
          &:hover{
            background: url("../../../assets/active/mining/menu-bg-hover.png") no-repeat 100% 100%;
            background-size: 100% 100%;
            cursor: pointer;
          }
        }
      }
      .miner{
        width: auto;
        text-align: center;
        position: absolute;
        left: 277px;
        right: 332px;
        .miner_svga_img,
        .mining_svga_img
        {
          width: 335px;
          height: 335px;
          margin: 0 auto;
        }
      }
      .mining_status{
        width: 332px;
        height: 86px;
        line-height: 81px;
        position: absolute;
        right: 0;
        top: 190px;
        background: url("../../../assets/active/mining/left-times-bg.png") no-repeat;
        background-size: 100% 100%;
        font-size: 23px;
        color: #3a4043;
        font-weight: bold;
        text-align: center;
        .is_join_other {
          font-size: 18px;
          line-height: 20px;
          display: inline-block;
          max-width: 145px;
          margin-top: 21px;
          margin-left: 10px;
        }
        .hammer{
          display: inline-block;
          background-size: 100% 100%;
          background-repeat: no-repeat;
          position: absolute;
          width: 115px;
          height: 115px;
          left: -25px;
          top: -25px;
          &.hidden{
            visibility: hidden;
          }
          &.is_first{
            background-image: url("../../../assets/active/mining/hammer.png");
          }
          cursor: move;
          cursor: grab;
          cursor: -moz-grab;
          cursor: -webkit-grab;
          &.nocursor{
            cursor: pointer;
          }
          // &:active{
          //   cursor: grabbing;
          //   cursor: -moz-grabbing;
          //   cursor: -webkit-grabbing;
          // }
        }
        .pointer_svga_img{
          position: absolute;
          width: 85px;
          height: 86px;
          left: 30px;
          top: -110px;
          .pointer_tips{
            width: 200px;
            font-size: 22px;
            color: #043521;
            position: absolute;
            left: 100px;
            top:0;
            line-height: 1.4;
          }
        }
      }
    }
    .treasure_box{
      margin-top: 15px;
      height: 505px;
      position: relative;
      .hoeing_svga_img{
        position: absolute;
        width: 180px;
        height: 180px;
        z-index: 1;
      }

      .treasure_item{
        display: inline-block;
        position: absolute;
        img{
          width: 100%;
          height: 100%;
          max-width: 200px;
        }
        @keyframes randomShining{
          0%{
            opacity: 1;
            transform: rotate(90deg) scale(.5);
          }
          20%{
            opacity: 0;
          }
          40%{
            opacity: 1;
            transform: rotate(180deg) scale(1);
          }
          60%{
            opacity: 0;
          }
          80%{
            opacity: 1;
            transform: rotate(90deg) scale(1.2);
          }
          100%{
            opacity: 0;
          }
        }
        @-webkit-keyframes randomShining {
          0%{
            opacity: 1;
            transform: rotate(90deg) scale(.5);
          }
          20%{
            opacity: 0;
          }
          40%{
            opacity: 1;
            transform: rotate(180deg) scale(1);
          }
          60%{
            opacity: 0;
          }
          80%{
            opacity: 1;
            transform: rotate(90deg) scale(1.2);
          }
          100%{
            opacity: 0;
          }
        }
        &.empty{
          cursor: default;
        }
        &.shinning.empty{
          .shinning_img{
            display: none;
          }
        }
        &.shinning:not(.empty){
          &.type_3, &.type_4, &.type_5, &.type_6{
            .shinning_img{
              position: absolute;
              content: '';
              display: inline-block;
              background: url("../../../assets/active/mining/shining.png") no-repeat;
              background-size: 100% 100%;
              opacity: 0;
              transition: opacity linear .2s;
            }
          }
          &.small{
            &.type_3, &.type_4, &.type_5, &.type_6{ .shinning_img {width: 50px} }
          }
          &.middle{
            &.type_3, &.type_4, &.type_5, &.type_6{ .shinning_img {width: 80px} }
          }
          &.large{
            &.type_3, &.type_4, &.type_5, &.type_6{ .shinning_img {width: 110px} }
          }
          &.type_3{
            // gold
            .shinning_img{
              animation: randomShining 3s 1s linear infinite;
            }
          }
          &.type_4{
            // gold-bag
            .shinning_img{
              animation: randomShining 4s 2s linear infinite;
            }
          }
          &.type_5{
            //diamonds
            .shinning_img{
              animation: randomShining 3s 3s linear infinite;
            }
          }
          &.type_6{
            //diamonds
            .shinning_img{
              animation: randomShining 5s 4s linear infinite;
            }
          }
        }
      }
    }

    .active_desc_box{
      position: relative;
      height: 1410px;
      width: 956px;
      margin: 50px auto;

      .inner_box{
        position: relative;
        box-sizing: border-box;
        padding: 87px 66px;
        width: inherit;
        height: inherit;
        background-image: url("../../../assets/active/mining/content-bg.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
      .box_bg{
        border-radius: 15px;
        background-color: #a7b2ce;
        padding: 21px 32px;
        margin-bottom: 15px;
      }
      h2{
        font-size: 24px;
        color: #333c5a;
        font-weight: bold;
        text-align: center;
        margin-bottom: 15px;
      }

      .content{
        color: #333c5a;
        font-size: 16px;
        line-height: 2;
      }
      .active_period{
          .content{
            text-align: center;
          }
        }


      .top_leave,
      .left_leave,
      .right_leave{
        position: absolute;
        // background-size: 100% 100%;
        // background-repeat: no-repeat;
      }
      .top_leave{
        width: 210px;
        left: 235px;
        top: -50px;
      }
      .left_leave{
        height: 330px;
        bottom: 85px;
        left: -132px;
      }
      .right_leave{
        height: 330px;
        top: 25px;
        right: -97px;

      }

      .active_detail{
        table{
          width: 92%;
          margin: auto;
          border-collapse: inherit;
          border-spacing: 2px;
          border-radius: 5px;
          text-align: center;
          background-color: #333c5a;
          color: #d7e3f3;
          th,td{
            padding: 10px;
          }
          td{
            background-color: #5b6586;
            font-size: 14px;
          }
        }
      }
    }
    .mining_modal_wrap{

    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.7);
    z-index: 2;
    }
    .mining_modal{
      .btn-confirm{
        content: '';
        display: inline-block;
        position: absolute;
        width: 138px;
        height: 70px;
        right: 50%;
        bottom: -110px;
        transform: translateX(50%);
        background: url("../../../assets/active/mining/btn-confirm-normal.png") no-repeat;
        background-size: 100% 100%;
        cursor: pointer;
        &:hover{
          background: url("../../../assets/active/mining/btn-confirm-hover.png") no-repeat;
          background-size: 100% 100%;
          cursor: pointer;
        }
      }
      .btn-x{
        content: '';
        display: inline-block;
        position: absolute;
        width: 52px;
        height: 52px;
        right: -70px;
        top: -68px;
        background: url("../../../assets/active/mining/btn-x-normal.png") no-repeat;
        background-size: 100% 100%;
        cursor: pointer;
        &:hover{
          background: url("../../../assets/active/mining/btn-x-hover.png") no-repeat;
          background-size: 100% 100%;
          cursor: pointer;
        }
      }

      &.reward_modal{
        position: fixed;
        width: 449px;
        // height: 432px;
        top: 200px;
        left: 50%;
        transform: translateX(-50%);

        .modal_inner{
          position: relative;
          background-color: #8d96b4;
          border-radius: 15px;
          padding: 10px;
          .content{
            background-color: #eaf5fe;
            border: 4px solid #404a71;
            padding: 70px 20px 35px 20px;
            border-radius: 15px;
            text-align: center;
            .congratulations{
              font-size: 24px;
              color: #4d5c8b;
            }
            .reward_name{
              font-size: 26px;
              color: #4d5c8b;
              font-weight: bold;
            }
            .reward_img{
              margin-top: 24px;
              text-align: center;
              height: 219px;
              img{
                height: inherit;
                max-height: 210px;
              }
            }
            .reward_code{
              width: 100%;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              font-size: 14px;
              color: #228a54;
              margin-top: 15px;
              text-align: center;
            }


          }
        }
        .top_leave,
        .left_leave,
        .right_leave,
        .stars
        {
          position: absolute;
        }
        .stars{
          width: 260px;
          height: 125px;
          top: 0;
          z-index: 1;
          left: 50%;
          top: -68px;
          transform: translateX(-50%);
        }
        .top_leave{
          width: 162px;
          left: -35px;
          top: -28px;
        }
        .left_leave{
          height: 180px;
          bottom: 20px;
          left: -57px;
        }
        .right_leave{
          height: 180px;
          top: 64px;
          right: -58px;

        }

      }

      &.rewards_list_modal{

        position: absolute;
        width: 709px;
        height: 670px;
        top: 200px;
        left: 50%;
        transform: translateX(-50%);

        .tabs{
          position: absolute;
          top: -88px;
          left: 24px;
          cursor: pointer;
          .tab_item{
            display: inline-block;
            width: 333px;
            height: 88px;
            line-height: 70px;
            border-radius: 30px 30px 0px 0px;
            background-color: #3e4a74;
            font-size: 24px;
            font-weight: bold;
            color: #8b96b7;
            text-align: center;
            vertical-align: bottom;
            // transition: line-height linear 0.3s 0.15s , height linear 0.3s,background-color linear 0.3s;
            transition: background-color linear .3s;
            &:hover{
              color: #3e4a74;
              background-color: #e8f5ff;
            }
            &.active{
              cursor: default;
              color: #3e4a74;
              background-color: #e8f5ff;
              height: 108px;
              line-height: 98px;
              vertical-align: inherit;
            }
          }

        }
        .modal_inner{
          position: relative;
          background-color: #8d96b4;
          border-radius: 15px;
          padding: 10px;
          height: inherit;
          .content{
            box-sizing: border-box;
            height: inherit;
            background-color: #eaf5fe;
            border: 4px solid #404a71;
            padding: 20px;
            border-radius: 15px;
            text-align: center;
            overflow-y: auto;
            .content_item{
              display: none;
              &.active{
                display: block;
              }
              &.records_list{
                margin: 20px 20px 0 20px;
                position: relative;
                height: 96%;
                table{
                  width: 86%;
                  margin: 0 auto;
                  color: #3e4a74;
                  font-size: 16px;
                  table-layout: fixed;
                  line-height: 1.6px;
                  tr{
                    border-bottom: 1px solid #d3e1ec;
                    &:first-child{
                      border: none;
                    }
                  }
                  th{
                    font-weight: normal;
                    font-size: 20px;
                    padding-bottom: 15px;
                    text-align: left;
                  }
                  td{
                    color: #3b4774;
                    padding: 5px 0;
                    line-height: 1.6;
                    height: 50px;
                    text-align: left;
                    img{
                      width: 50px;
                    }
                  }
                  th:first-child,
                  td:first-child{
                    width: 70px;
                  }
                  th:last-child,
                  td:last-child{
                    text-align: right;
                  }


                }
                .ivu-page.records_pagination{
                  padding-top: 45px;
                  position: absolute;
                  bottom: 0;
                  left: 50%;
                  transform: translateX(-50%);
                  li{
                    height: 34px;
                    line-height: 34px;
                    a{
                      font-size: 18px;
                      color: #3e4a74;
                    }
                    &.ivu-page-item-active{
                      a{
                        color: #8893b5;
                      }
                    }
                    &.ivu-page-disabled{
                      a {
                        i {
                          cursor: default;
                          opacity: 0.5;
                        }
                      }
                    }

                  .ivu-icon-ios-arrow-back,
                  .ivu-icon-ios-arrow-forward
                  {
                    height: 34px;
                    width: 34px;
                  }

                  .ivu-icon-ios-arrow-back{
                    background: url("../../../assets/active/mining/btn-previous-normal.png") no-repeat;
                    background-size: 100% 100%;
                  }
                  &:not(.ivu-page-disabled){
                      .ivu-icon-ios-arrow-back:hover{
                      background: url("../../../assets/active/mining/btn-previous-hover.png") no-repeat;
                      background-size: 100% 100%;
                    }
                  }

                  .ivu-icon-ios-arrow-forward{
                    background: url("../../../assets/active/mining/btn-next-normal.png") no-repeat;
                    background-size: 100% 100%;
                  }
                  &:not(.ivu-page-disabled){
                    .ivu-icon-ios-arrow-forward:hover{
                      background: url("../../../assets/active/mining/btn-next-hover.png") no-repeat;
                      background-size: 100% 100%;
                    }
                  }


                  }


                }
              }
              &.rewards_list{
                height: 600px;
                .list_desc{
                  width: 70%;
                  margin: auto;
                  color: #3e4a74;
                  font-size: 16px;
                  line-height: 1.6;
                  text-align: center;
                  vertical-align: middle;
                }
                .list_content{
                  padding: 0;
                  overflow-x: hidden;
                  overflow-y: auto;
                  scrollbar-color: #7A819C #E7F2FA ;
                  -ms-scrollbar-arrow-color: #E7F2FA;
                  -ms-scrollbar-track-color: #E7F2FA;
                  -ms-scrollbar-face-color: #7A819C;
                  scrollbar-width: thin;
                  &::-webkit-scrollbar{
                    width: 6px;
                  }
                  &::-webkit-scrollbar-track{
                    background-color: #E7F2FA;
                    -webkit-box-shadow: none;
                    box-shadow: none;
                  }
                  height: 92%;
                  text-align: left;
                  .list_item{
                    margin: 11.5px 14.5px 11.5px 14.5px;
                    display: inline-block;
                    overflow: hidden;
                    width: 178px;
                    height: 178px;
                    box-sizing: border-box;
                    padding: 17px;
                    border-radius: 15px;
                    background-color: #b3c9e7;
                    text-align: center;
                    .item_img{
                      height: 100px;
                      line-height: 100px;
                      img{
                        height: inherit;
                        max-width: 100px;
                        max-height: 100px;
                      }
                    }
                    .item_desc{
                      margin: 15px auto 0;
                      width: 97%;
                      font-size: 16px;
                      color: #3e4a74;
                      line-height:1.2;
                    }
                  }
                }
              }
            }
          }
        }
        .left_leave,
        .right_leave{
          position: absolute;
        }
        .left_leave{
          height: 180px;
          bottom: 20px;
          left: -57px;
        }
        .right_leave{
          height: 180px;
          top: 64px;
          right: -58px;

        }


      }
    }





  }

</style>
