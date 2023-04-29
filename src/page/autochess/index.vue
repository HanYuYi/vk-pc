<template>
  <div class="auto_chess" id="game_index">
    <div id="index_load_page" v-show="sourceLoad">
      <div class="page_center">
        <div class="img_box"><img  src="../../assets/autoChess/icon-loading.png"></div>
        <div class="progress">
          加载中&nbsp;{{parseInt(progressW) +'%'}}
          <span class="proloading" :style="{width:progressW+'%'}"></span>
        </div>
      </div>
    </div>
    <div v-if="!guideFlag" id="game_main">
      <div class="game_top">
        <div class="login_out_btn">
          <router-link to="/newegame" class="btn_box"></router-link>
        </div>
        <div class="top_title"><img src="../../assets/autoChess/top_title.png" alt=""></div>
        <div class="user_info">
          <!--<div class="user_name ellips">{{userName}}</div>-->
          <div class="user_money_box" v-if="isLogin">
            <div class="money_icon"></div>
            <span class="num"><countup :end-val="egMoney" :duration="2" :decimals="2" :start="startCount"></countup></span>
          </div>
        </div>
        <div class="game_info">
          <div @click="showHis()" class="history btn_box"></div>
          <div class="game_rule btn_box" @click="showGameRule=true"></div>
        </div>
      </div>
      <div class="game_content">
        <!--市场-->
        <div class="section hero_market">
          <div class="section_title"><img src="../../assets/autoChess/market_title.png" alt=""><div class="marker_countdown_box" v-if="marketHeroCoundown"><span>{{marketHeroCoundown}}</span></div></div>
          <div class="section_top">
            <div class="buy_mode">
              <div class="mode_box"
                   v-for="item in modeList" :key="item.id"
                   :class="[{'selected': item.id == currentMode}, item.name]"
                   @click="handleSelectMode(item)"></div>
            </div>
            <div class="level_select">
              <popover placement="bottom" popoverClass="level_select_popover">
                <div slot="content" class="popover_level_list ">
                  <div class="level_box" v-for="item in levelList"
                       :class="[{'selected': currentLevel.level == item.level}, 'lv' + item.level]"
                       :key="item.level"
                       @click="handleLevelSelect(item)">
                    <span class="text_icon"></span>
                    <span class="level_moneny">{{item.levelMoney}}/次</span>
                  </div>
                </div>
                <div class="current_level_box level_box selected" :class="'lv' + currentLevel.level"><span class="text_icon"></span><span class="icon_down_arr"></span></div>
              </popover>
            </div>
          </div>
          <div class="section_main">
            <div class="hero_list" v-show="loadMarketHeroFlag" >
              <div class="hero_box" v-for="n in 5">
                <div class="box_top"></div>
                <div class="hero_name_price"></div>
              </div>
            </div>
            <div class="hero_list"  v-show="!loadMarketHeroFlag">
              <div class="hero_box"  :class="[{'hide_zIndex': heroItem.buyAnimate}]" v-for="(heroItem, index) in marketHeroesList" :key="index" @click="handleHeroSelect(1, heroItem)">
                <div class="box_top" :class="'hero_lv'+heroItem.level">
                  <div class="selected_mask" :class="'hero_seleced_svga_img_'+index" v-show="heroItem.selected" ></div>
                  <div class="spark_fly_ani" v-show="heroItem.selected">
                    <div class="spark_box" v-for="(spark, i) in sparksList" :style="{left: spark.left, animationDelay: spark.delay}" :class="spark.className + spark.imgurl" :key="i"></div>
                  </div>
                  <div class="img_box">
                    <img :src="heroItem.picture" alt="" v-if="heroItem.card_id && !heroItem.buyAnimate">
                  </div>
                  <div class="selected_mask_top_layer" v-show="heroItem.selected"></div>
                  <div class="star_box" v-show="heroItem.star>0&&heroItem.card_id && !heroItem.buyAnimate">
                    <div class="star" v-for="(star, starIndex) in heroItem.star" :key="starIndex"></div>
                  </div>
                </div>
                <div class="hero_name_price" v-if="heroItem.card_id && !heroItem.buyAnimate">
                  <div class="hero_name ellips" v-if="!heroItem.buyAnimate" :style="{color: heroItem.color}" :title="heroItem.name">{{heroItem.name}}</div>
                  <div class="hero_price">{{heroItem.symbol}}{{heroItem.price}}</div>
                </div>
                <div class="hero_name_price" v-else></div>
                <div class="box_top animate_box" :class="['market_hero_id_'+heroItem.cardIndex]">
                  <div class="img_box">
                    <img :src="heroItem.picture" alt="" v-if="heroItem.card_id">
                  </div>
                </div>
                <div class="hero_light_box" v-show="heroItem.lighted">
                  <div class="spark_fly_ani">
                    <div class="spark_box" v-for="(spark, i) in sparksList2" :style="{left: spark.left, animationDelay: spark.delay}" :class="spark.className + spark.imgurl" :key="i"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="refresh_box">
              <div class="refresh_btn" :class="[{'refresh': loadMarketHeroFlag}]" @click="reLoadMarketHero">
                <div class="btn_wrapper"></div>
              </div>
              <div class="level_price">{{currentLevel.levelMoney}}/次</div>
            </div>
          </div>
          <div class="section_btn buy" v-show="currentMode == 1" :class="[{'actived': canBuy}]" @click="handleBuyHero()">
            <span class="defalut" v-show="!canBuy"></span>
            <span class="normal" v-show="canBuy"></span>
          </div>
        </div>
        <!--背包-->
        <div class="section user_hero_package">
          <div class="section_title"><img src="../../assets/autoChess/package_title.png" alt=""></div>
          <div class="section_main">
            <div  class="hero_list" id="package_hero_list">
              <div class="hero_box"
                   v-for="(heroItem, index) in packageHeroesList" :key="index"
                   :class="[{ 'drag_handle': heroItem.card_id&&!heroItem.is_lock,'lock_disabled':heroItem.is_lock , 'disabled':heroItem.is_lock}]"
                   @click="handleHeroSelect(2, heroItem)">
                <div class="box_top" :class="'hero_index_'+heroItem.cardIndex + ' hero_lv'+heroItem.level">
                  <div class="selected_mask" v-show="heroItem.card_id != 0&&heroItem.selected&&changeLoad"></div>
                  <div class="spark_fly_ani" v-show="heroItem.card_id != 0&&heroItem.selected">
                    <div class="spark_box" v-for="(spark, i) in sparksList" :style="{left: spark.left, animationDelay: spark.delay}" :class="spark.className + spark.imgurl" :key="i"></div>
                  </div>
                  <div class="img_box" v-if="heroItem.card_id != 0 && !heroItem.compoundAnimate">
                    <img :src="heroItem.picture" alt="" class="hero_img" :class="'hero_pic_index_'+heroItem.cardIndex">
                  </div>
                  <div class="selected_mask_top_layer" v-show="heroItem.card_id != 0&&heroItem.selected"></div>
                  <div class="star_box" v-show="heroItem.star>0&&heroItem.card_id" :class="'hero_star_index_'+heroItem.cardIndex">
                    <div class="star" v-for="(star, starIndex) in heroItem.star" :key="starIndex"></div>
                  </div>
                  <div class="buy_package_box">
                    <div class="time_count_down" v-if="heroItem.duration>0">
                      {{heroItem.countDownTime}}
                    </div>
                    <span class="buy_package_btn" v-if="heroItem.is_lock">
                    购买此格
                  </span>
                  </div>
                </div>
                <div class="hero_name_price" :class="'hero_price_index_'+heroItem.cardIndex" v-if="heroItem.card_id != 0">
                  <div class="hero_name ellips" :style="{color: heroItem.color}" :title="heroItem.name">{{heroItem.name}}</div>
                  <div class="hero_price">{{heroItem.symbol}}{{heroItem.price}}</div>
                </div>
                <div class="hero_name_price" v-if="heroItem.is_lock">
                  未购买
                </div>
                <div class="hero_name_price" v-else-if="heroItem.card_id == 0">
                  空
                </div>
                <div class="box_top animate_box" :class="['package_hero_id_'+heroItem.cardIndex]">
                  <div class="img_box" v-if="heroItem.card_id != 0">
                    <img :src="heroItem.picture" alt="">
                  </div>
                  <!--<div class="hero_name_price" :class="'hero_price_index_'+heroItem.cardIndex" v-if="heroItem.card_id != 0">
                    <div class="hero_name ellips" :style="{color: heroItem.color}">{{heroItem.name}}</div>
                    <div class="hero_price">{{heroItem.symbol}}{{heroItem.price}}</div>
                  </div>-->
                </div>
                <img src="../../assets/autoChess/icon-money.png" alt="" class="sold_animate_img" :class="['sold_package_hero_id_'+heroItem.cardIndex]">
              </div>
            </div>
            <div class="hero_list package_hero_svga" >
              <div class="hero_box" v-for="(i,index) in 8" :key="i">
                <div class="box_top">
                  <div class="selected_mask"
                  :class="'package_hero_seleced_svga_img_'+index"
                  :style="{opacity:packageHeroesList[index]&&packageHeroesList[index].selected&&!changeLoad&&packageHeroesList[index].card_id != 0?1:0}" ></div>
                </div>
              </div>
            </div>
          </div>
          <div class="section_btn sold"  :class="[{'actived': canSold}]" @click="handleSoldHero()">
            <span class="defalut" v-show="!canSold"></span>
            <span class="normal" v-show="canSold"></span>
          </div>
        </div>
      </div>
    </div>
    <x-dialog v-model="showBuyPackagePrice" class="autochess_dialog buy_package" v-if="showBuyPackagePrice">
      <div class="dialog_header" :class="'package_title_'+buyPackageIndex"><span></span></div>
      <div  class="content">
        <div class="price_list">
          <div class="list_box"
               :class="[{'actived':currentBuyPackagePrice.id == item.id}]"
               v-for="item in currentBuyPackagePriceList" :key="item.id"
               @click="handleBuyPackagePriceSelect(item)">
            <div class="price_time">{{item.duration}}小时</div>
            <div class="price_num">{{item.symbol}}{{item.price}}</div>
          </div>
        </div>
      </div>
      <div class="buy_btn"><div class="click_box"  @click="handleBuyPackagePriceBuy"></div></div>
      <div  class="dialog_close_btn" @click="showBuyPackagePrice=false"></div>
    </x-dialog>
    <!--玩法-->
    <x-dialog v-model="showGameRule" class="autochess_dialog game_rule" v-if="showGameRule">
      <div class="dialog_wrapper">
        <div class="dialog_header"><span>威客自走棋玩法规则</span></div>
        <div  class="content">
          <p>{{$t("autoChessRule.text_p1")}}</p>
          <p>{{$t("autoChessRule.text_p2")}}</p>
          <p v-html="$t('autoChessRule.text_p3', [levelList[0]?levelList[0].levelMoney:'--',levelList[1]?levelList[1].levelMoney:'--',levelList[2]?levelList[2].levelMoney:'--'])"></p>
          <p>{{$t("autoChessRule.text_p4")}}</p>
          <p>{{$t("autoChessRule.text_p5")}}</p>
          <p>{{$t("autoChessRule.text_p6")}}</p>
          <p v-show="!totalBuyPackagePriceList.length&&freeDeadline">{{$t("autoChessRule.text_p7",[freeDeadline])}}</p>
          <div class="enter_guide" @click="enterGuide()">进入新手教程</div>
          <div class="hero_price_list dialog_section">
            <div class="list_title"><span></span></div>
            <div class="list_table">
              <div class="t_header">
                <div class="t_row">
                  <div class="t_td">{{$t("autoChessRule.rank")}}</div>
                  <div class="t_td">{{$t("autoChessRule.buy1star")}}<span class="num">({{allHeroLevelPriceList[0]?allHeroLevelPriceList[0].symbol:'-'}})</span></div>
                  <div class="t_td">{{$t("autoChessRule.sold1star")}}<span class="num">({{allHeroLevelPriceList[0]?allHeroLevelPriceList[0].symbol:'-'}})</span></div>
                  <div class="t_td">{{$t("autoChessRule.sold2star")}}<span class="num">({{allHeroLevelPriceList[0]?allHeroLevelPriceList[0].symbol:'-'}})</span></div>
                  <div class="t_td">{{$t("autoChessRule.sold3star")}}<span class="num">({{allHeroLevelPriceList[0]?allHeroLevelPriceList[0].symbol:'-'}})</span></div>
                </div>
              </div>
              <div class="t_body">
                <div class="t_row" v-for="(item, index) in allHeroLevelPriceList" :key="index">
                  <div class="t_td" v-if="item.level == 1">{{$t("autoChessRule.rank1")}}</div>
                  <div class="t_td" v-else-if="item.level == 2">{{$t("autoChessRule.rank2")}}</div>
                  <div class="t_td" v-else-if="item.level == 3">{{$t("autoChessRule.rank3")}}</div>
                  <div class="t_td" v-else-if="item.level == 4">{{$t("autoChessRule.rank4")}}</div>
                  <div class="t_td" v-else="item.level == 5">{{$t("autoChessRule.rank5")}}</div>
                  <div class="t_td"><span class="num">{{item.star_1_buy}}</span></div>
                  <div class="t_td"><span class="num">{{item.star_1_sell}}</span></div>
                  <div class="t_td"><span class="num">{{item.star_2_sell}}</span></div>
                  <div class="t_td"><span class="num">{{item.star_3_sell}}</span></div>
                </div>
              </div>
            </div>
          </div>
          <div class="package_price_list dialog_section" v-show="totalBuyPackagePriceList.length">
            <div class="list_title"><span></span></div>
            <div class="list_table">
              <div class="t_header">
                <div class="t_row">
                  <div class="t_td">{{$t("autoChessRule.package_durantion")}}</div>
                  <div class="t_td">{{$t("autoChessRule.7th_package")}}<span class="num">({{totalBuyPackagePriceList[0]?totalBuyPackagePriceList[0][0].symbol:'-'}})</span></div>
                  <div class="t_td">{{$t("autoChessRule.8th_package")}}<span class="num">({{totalBuyPackagePriceList[0]?totalBuyPackagePriceList[0][0].symbol:'-'}})</span></div>
                </div>
              </div>
              <div class="t_body">
                <div class="t_row">
                  <div class="t_td">{{totalBuyPackagePriceList[0]?totalBuyPackagePriceList[0][0].duration : '-'}}</div>
                  <div class="t_td"><span class="num">{{totalBuyPackagePriceList[0]?totalBuyPackagePriceList[0][0].price:'-'}}</span></div>
                  <div class="t_td"><span class="num">{{totalBuyPackagePriceList[1]?totalBuyPackagePriceList[1][0].price:'-'}}</span></div>
                </div>
                <div class="t_row">
                  <div class="t_td">{{totalBuyPackagePriceList[0]?totalBuyPackagePriceList[0][1].duration:'-'}}</div>
                  <div class="t_td"><span class="num">{{totalBuyPackagePriceList[0]?totalBuyPackagePriceList[0][1].price:'-'}}</span></div>
                  <div class="t_td"><span class="num">{{totalBuyPackagePriceList[1]?totalBuyPackagePriceList[1][1].price:'-'}}</span></div>
                </div>
                <div class="t_row">
                  <div class="t_td">{{totalBuyPackagePriceList[0]?totalBuyPackagePriceList[0][2].duration:'-'}}</div>
                  <div class="t_td"><span class="num">{{totalBuyPackagePriceList[0]?totalBuyPackagePriceList[0][2].price:'-'}}</span></div>
                  <div class="t_td"><span class="num">{{totalBuyPackagePriceList[1]?totalBuyPackagePriceList[1][2].price:'-'}}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div  class="dialog_close_btn" @click="showGameRule=false"></div>
    </x-dialog>
    <!--游戏记录-->
    <x-dialog v-model="showHistory" class="autochess_dialog game_rule history_list" v-if="showHistory">
      <div class="dialog_wrapper">
        <div class="dialog_header"><span>游戏记录</span></div>
        <div class="h_table h_head">
          <div>用户名</div><div><em>金额</em>(￥)</div><div>时间</div><div>操作类型</div><div class="con_hero_list">内容</div>
        </div>
        <div class="h_content">
          <div  class="his_list_load no_data"  v-show="!hisListLoad&&!historyList.length">暂无数据</div>
          <div class="his_list_load" v-show="hisListLoad">
            <div class="loading"></div>
          </div>
          <div class="h_table" v-for="(his,index) in historyList" :key="index">
            <div class="ellips" :title="his.username">{{his.username}}</div><div :class="{'win_m':his.amount>0,'lose_m':his.amount<=0}">{{his.amount>0?'+' + his.amount:his.amount}}</div><div>{{formatDate(his.time_stamp*1000,"yyyy/MM/dd HH:mm")}}</div><div :class="his.type_code">{{his.type}}</div>
            <div class="con_hero_list">
              <div class="h_hero_box" v-for="(hisHero,index) in his.content" :key="index" v-show="his.content.length==1">
                <div class="h_img"> <img :src="hisHero.picture" alt=""> </div>
                <span :style="{color: hisHero.color}">{{hisHero.name}}</span>
                <div class="h_star_box" >
                  <div class="h_star" v-for="(hStar,index) in hisHero.star" :key="index"></div>
                </div>
              </div>
              <span v-show="his.content.length>1">--</span>
            </div>
          </div>
        </div>
        <Page :total="hisListPage.total" :page-size="hisListPage.pagesize" :current.sync="hisListPage.currentpage" @on-change="getLogList($event)" v-if="hisListPage.total>hisListPage.pagesize"></Page>
      </div>
      <div  class="dialog_close_btn" @click="showHistory=false"></div>
    </x-dialog>
    <GameGuide v-if="guideFlag"></GameGuide>
  </div>
</template>

<script type="text/javascript">
import GameGuide from "./guidePage";
import { Popover, XDialog, Countup } from "vux";
import {
  formatDate,
  formatCountTime,
  formatNumberFloatPad,
  getViewPort,
  getElementOffset,
  setCookie,
  getCookie
} from "../../utils/util";
import { mapState } from "vuex";
import Velocity from "velocity-animate";
import "velocity-animate/velocity.ui.js";
// import { Sortable, Swap } from 'sortablejs/modular/sortable.core.esm';
//  Sortable.mount(new Swap())
export default {
  name: "autochessindex",
  components: {
    Popover,
    XDialog,
    Countup,
    GameGuide
  },
  beforeRouteLeave(to, from, next) {
    this.$intro().exit();
    next();
  },
  created() {
    this.loadSource();
  },
  mounted() {
    document.body.ondrop = function(event) {
      event.preventDefault();
      event.stopPropagation();
    };
    this.audio = new Audio();
    this.audio.loop = false;
    document.body.addEventListener(
      "mouseenter",
      () => {
        this.audio.volume = 1;
        this.audio.muted = false;
      },
      false
    );
    document.body.addEventListener(
      "mouseleave",
      () => {
        this.audio.volume = 1;
        this.audio.muted = false;
      },
      false
    );

    if (getCookie("buyMode")) {
      this.currentMode = getCookie("buyMode");
    }
    Velocity.RegisterUI("callout.pulse", {
      defaultDuration: 200,
      calls: [[{ scale: 1.6 }, 0.5], [{ scale: 1 }, 0.5]]
    });
    Velocity.RegisterUI("callout.bounce", {
      defaultDuration: 300,
      calls: [
        [{ translateY: -8 }, 0.25],
        [{ translateY: 0 }, 0.125],
        [{ translateY: -8 }, 0.125],
        [{ translateY: 0 }, 0.25]
      ]
    });
    this.loadGameInitData();
    this.generateSnowflakes();
    this.reLoadMoney(1);
  },
  computed: {
    ...mapState(["isLogin", "guideFlag"])
  },
  watch: {
    guideFlag(newval) {
      if (newval !== 1) {
        this.$nextTick(() => {
          this.loadGameInitData(newval);
        });
      }
      if (!newval) {
        this.reLoadMoney();
      }
    }
  },
  data() {
    return {
      historyList: [],
      hisListLoad: false,
      hisListPage: {
        total: 0,
        pagesize: 10,
        currentpage: 1
      },
      showHistory: false,
      progressW: 0,
      audio: {},
      modeList: [
        {
          id: 1,
          name: "normal"
        },
        {
          id: 2,
          name: "fast"
        }
      ],
      levelList: [],
      marketListNum: 5,
      marketHeroesList: [],
      marketSelectedHero: {},
      packageHeroesList: [],
      packageSelectedHero: {},
      currentMode: 1,
      currentLevel: {
        /*level: 1,
          levelMoney: 10*/
      },
      canBuy: false,
      canSold: false,
      loadMarketHeroFlag: false,
      sparksList: [],
      sparksList2: [],
      showRotateMasker: false,
      showBuyPackagePrice: false,
      totalBuyPackagePriceList: [],
      buyPackageIndex: 7,
      currentBuyPackagePriceList: [],
      currentBuyPackagePrice: {},
      showGameRule: false,
      imglength: 0,
      count: 0,
      sourceLoad: true,
      userName: "",
      currencyInfo: {},
      egMoney: 0,
      buyLoad: false,
      soldLoad: false,
      allHeroLevelPriceList: [],
      animateFlag: false,
      animationDuration: 600,
      marketHeroCoundown: "",
      marketHeroCoundownTimer: null,
      startCount: false,
      oldEgmoney: 0,
      changeLoad: false,
      newPackageCardList: {},
      packageSelectIndexArr: [],
      dragging: false,
      noMp3: [11, 14, 20, 21, 24, 25, 27, 28, 41, 42, 51, 52, 56, 61],
      videoItem: null,
      freeDeadline: ""
    };
  },
  methods: {
    //显示游戏记录
    showHis() {
      this.hisListPage.currentpage = 1;
      this.getLogList();
      this.showHistory = true;
    },
    formatDate(time, format) {
      return formatDate(time, format);
    },
    //游戏记录
    getLogList() {
      this.hisListLoad = true;
      this.$http(this.ApiSetting.autoChess.getLogList, {
        page: this.hisListPage.currentpage
      }).then(
        res => {
          this.hisListLoad = false;
          if (res.status == 1 && res.data) {
            this.historyList = res.data.data;
            this.hisListPage.total = res.data.total;
            this.hisListPage.currentpage = res.data.current_page;
          }
        },
        err => {
          this.hisListLoad = false;
        }
      );
    },
    enterGuide() {
      this.showGameRule = false;
      setTimeout(() => {
        this.$store.commit("updateGuideStatus", 1);
      }, 400);
    },
    //图片预加载
    preload(imgarr) {
      let imgs = [
        "bg.png",
        "btn-buy-disabled.png",
        "btn-buy-mode-fast-default.png",
        "btn-buy-mode-fast-selected.png",
        "btn-buy-mode-normal-default.png",
        "btn-buy-mode-normal-selected.png",
        "btn-buy-hover.png",
        "btn-buy-disabled.png",
        "btn-buy-normal.png",
        "btn-hero-normal.png",
        "btn-refresh-normal.png",
        "btn-refresh-hover.png",
        "btn-rule-normal.png",
        "btn-sold-disabled.png",
        "btn-x-normal.png",
        "btn-x-hover.png",
        "btn-sold-normal.png",
        "btn-sold-hover.png",
        "count_down_bg.png",
        "game_rule_dialog_bg.png",
        "game_rule_title.png",
        "hero_level_1.png",
        "hero_level_2.png",
        "hero_level_3.png",
        "hero_level_4.png",
        "hero_level_5.png",
        "hero_price_list_title.png",
        "icon-down.png",
        "icon-money.png",
        "level_list_bg.png",
        "level_select_bg.png",
        "level_selected_bg.png",
        "login_out_btn_normal.png",
        "login_out_btn_hover.png",
        "logo.png",
        "lv1-normal.png",
        "lv2-normal.png",
        "lv3-normal.png",
        "lv1-selected.png",
        "lv2-selected.png",
        "lv3-selected.png",
        "market_title.png",
        "package_7_title.png",
        "package_8_title.png",
        "package_dialog_bg.png",
        "package_price_list_title.png",
        "package_title.png",
        "refresh_arrow.png",
        "section_bg.png",
        "spark-1.png",
        "spark-2.png",
        "star.png",
        "top_mask.png",
        "top_title.png",
        "top-bg.png",
        "user_money_bg.png",
        // "hero_selected.svga",
        "hero1.png",
        "hero2.png",
        "hero3.png",
        "hero4.png",
        "hero5.png",
        "hero6.png"
      ];
      this.imglength = imgs.length + imgarr.length;
      for (let img of imgs) {
        let image = new Image();
        image.src = require("../../assets/autoChess/" + img);
        image.onload = () => {
          this.count++;
        };
        image.onerror = () => {
          this.count++;
        };
      }
      for (let img of imgarr) {
        let image = new Image();
        image.src = img;
        image.onload = () => {
          this.count++;
        };
        image.onerror = () => {
          this.count++;
        };
      }
      let _this = this;
      requestAnimationFrame(pro);
      function pro() {
        _this.progressW = (_this.count / _this.imglength) * 100;
        if (_this.count === _this.imglength) {
          _this.sourceLoad = false;
        } else {
          requestAnimationFrame(pro);
        }
      }
      let audio_srcs = [];
      for (let i = 1; i < 73; i++) {
        if (!this.noMp3.includes(i)) {
          let str = require("../../assets/autoChess/audio/" + i + ".mp3");
          audio_srcs.push(str);
        }
      }
      for (let src of audio_srcs) {
        let audio = new Audio();
        audio.src = src;
      }
      let coinAudio = new Audio();
      coinAudio.src = require("../../assets/autoChess/audio/" + "coin.mp3");
    },
    handleSelectMode(x) {
      if (this.animateFlag) {
        return;
      }
      if (this.currentMode == x.id) {
        return;
      }
      this.currentMode = x.id;
      if (this.marketHeroesList.length > 0) {
        this.marketHeroesList.forEach((v, i) => {
          v.selected = false;
        });
      }
      this.canBuy = false;
      setCookie("buyMode", this.currentMode);
    },
    handleLevelSelect(x) {
      if (this.animateFlag) {
        return;
      }
      this.currentLevel = x;
      setCookie("refreshLevel", this.currentLevel.level);
    },
    handleHeroSelect(type, item) {
      //type:2是背包中的英雄，type:1是市场中的 选择英雄
      if (this.animateFlag || this.buyLoad || this.soldLoad || !item.card_id) {
        return;
      }
      if (type == 2) {
        let index = null;
        index = this.packageHeroesList.indexOf(item);
        if (item.is_lock) {
          if (this.totalBuyPackagePriceList.length == 0) {
            return;
          }
          this.buyPackageIndex = index * 1 + 1;
          if (this.buyPackageIndex == 7) {
            this.currentBuyPackagePriceList = this.totalBuyPackagePriceList[0];
          } else if (this.buyPackageIndex == 8) {
            this.currentBuyPackagePriceList = this.totalBuyPackagePriceList[1];
          }
          this.currentBuyPackagePrice = this.currentBuyPackagePriceList[0];
          this.showBuyPackagePrice = true;
        }
        item.selected = !item.selected;
        this.canSold = false;
        for (let i = 0; i < this.packageHeroesList.length; i++) {
          if (this.packageHeroesList[i].selected) {
            this.canSold = true;
            break;
          }
        }
      } else {
        if (this.currentMode == 1) {
          item.selected = !item.selected;
          item.lighted = false;
          this.canBuy = false;
          for (let i = 0; i < this.marketHeroesList.length; i++) {
            if (this.marketHeroesList[i].selected) {
              this.canBuy = true;
              break;
            }
          }
        } else {
          this.handleBuyHero(item);
        }
      }
    },
    reLoadMarketHero() {
      if (this.animateFlag) {
        return;
      }
      if (this.loadMarketHeroFlag || this.buyLoad || this.soldLoad) {
        return;
      }
      if (!this.currentLevel.level) {
        return;
      }
      let _oldMarketHeroesList = this.marketHeroesList.concat();
      let data = {
        room_id: this.currentLevel.level
      };
      this.loadMarketHeroFlag = true;
      this.$http(this.ApiSetting.autoChess.refreshChessCards, data).then(
        res => {
          setTimeout(() => {
            this.loadMarketHeroFlag = false;
          }, 610);
          if (res.status === 1) {
            this.marketHeroesList = [];
            this.canBuy = false;
            let obj = res.data.cards;
            if (obj) {
              this.initMarketCardList(res.data.cards, res.data.tags);
            }
            this.reLoadMoney();
          } else {
            this.marketHeroesList = _oldMarketHeroesList;
          }
        },
        err => {
          setTimeout(() => {
            this.loadMarketHeroFlag = false;
            this.marketHeroesList = _oldMarketHeroesList;
          }, 610);
        }
      );
    },
    loadSvga(selector, url) {
      var player = new SVGA.Player(selector);
      var parser = new SVGA.Parser(selector);
      if (this.videoItem) {
        player.setVideoItem(this.videoItem);
        player.startAnimation();
      } else {
        parser.load(url, videoItem => {
          this.videoItem = videoItem;
          player.setVideoItem(videoItem);
          player.startAnimation();
        });
      }
    },
    initSvgaPlayer(type) {
      let svgaImgs = [];
      if (type == 1) {
        for (let i = 0; i < this.marketHeroesList.length; i++) {
          svgaImgs.push({
            selector: ".hero_seleced_svga_img_" + i
          });
        }
      }
      if (type == 2) {
        for (let i = 0; i < this.packageHeroesList.length; i++) {
          svgaImgs.push({
            selector: ".package_hero_seleced_svga_img_" + i
          });
        }
      }
      let src = require("../../assets/autoChess/hero_selected.svga");
      svgaImgs.forEach(item => this.loadSvga(item.selector, src));
    },
    //动画
    getAbsoluteRandom(cache, base) {
      var random = parseInt(Math.random() * base);
      if (cache[random]) {
        return this.getAbsoluteRandom(cache, base);
      } else {
        cache[random] = 1;
        return random;
      }
    },
    generateSnowflakes() {
      this.sparksList = [];
      let _this = this;
      for (let i = 0; i < 10; i++) {
        let random = Math.random();
        _this.sparksList.push({
          className: "snowflake" + i,
          left: _this.getAbsoluteRandom({}, 100) + "%",
          delay:
            parseInt(Math.random() * 3000) + "ms," + parseInt(random * 3) + "s",
          imgurl: " spark" + (Math.floor(Math.random() * 2) + 1)
        });
      }
      for (let i = 0; i < 13; i++) {
        let random = Math.random();
        _this.sparksList2.push({
          className: "snowflake" + parseInt(Math.random() * 10),
          left: _this.getAbsoluteRandom({}, 35) + 25 + "%",
          delay:
            parseInt(Math.random() * 5000) + "ms," + parseInt(random * 4) + "s",
          imgurl: " spark" + (Math.floor(Math.random() * 2) + 1)
        });
      }
    },
    leaveTimeCountDown(data, type) {
      let startTime = new Date().getTime();
      let count = 0;
      let _this = this;
      if (type) {
        clearTimeout(this.marketHeroCoundownTimer);
        this.marketHeroCoundown = formatCountTime(data.duration, 2);
        this.marketHeroCoundownTimer = setTimeout(fixed, 1000);
      } else {
        clearTimeout(data.timer);
        data.countDownTime = formatCountTime(data.duration);
        data.timer = setTimeout(fixed, 1000);
      }
      function fixed() {
        count++;
        var offset = new Date().getTime() - (startTime + count * 1000);
        var nextTime = 1000 - offset;
        if (nextTime < 0) nextTime = 0;
        data.duration--;
        if (type) {
          _this.marketHeroCoundown = formatCountTime(data.duration, 2);
          if (data.duration <= 0) {
            _this.marketHeroCoundown = "";
            _this.marketHeroesList.forEach((v, i) => {
              v = Object.assign(v, {
                card_id: null,
                picture: "",
                name: "",
                selected: false,
                level: 0,
                lighted: false
              });
            });
            _this.canBuy = false;
            return;
          }
          clearTimeout(_this.marketHeroCoundownTimer);
          _this.marketHeroCoundownTimer = setTimeout(fixed, nextTime);
        } else {
          data.countDownTime = formatCountTime(data.duration);
          if (data.duration <= 0) {
            data.duration = 0;
            data.is_lock = 1;
            data = Object.assign(data, {
              duration: 0,
              is_lock: 1,
              countDownTime: data.countDownTime
            });
            return;
          }
          clearTimeout(data.timer);
          data.timer = setTimeout(fixed, nextTime);
          data = Object.assign(data, {
            duration: data.duration,
            countDownTime: data.countDownTime,
            timer: data.timer
          });
        }
      }
      /*  data.countDownTime = formatCountTime(data.duration)
          data.timer = setInterval(() => {
            data.duration --
            data.countDownTime = formatCountTime(data.duration)
            if(data.duration < 0){
              clearInterval(data.timer)
              data.duration = 0
              data.is_lock = 1
            }
          }, 1000)
          return data*/
    },
    loadSource() {
      this.$http(this.ApiSetting.autoChess.getChessAllCards).then(res => {
        if (res.status === 1) {
          let arr = [];
          let obj = res.data;
          for (let k in obj) {
            arr.push(obj[k]);
          }
          this.preload(arr);
        }
      });
    },
    loadGameInitData() {
      this.$http(this.ApiSetting.autoChess.getChessInitInfo).then(res => {
        if (res.status === 1) {
          //  this.$store.commit('updateGuideStatus', true)
          //   return
          if (res.data.free_limited_deadline) {
            this.freeDeadline = formatDate(
              res.data.free_limited_deadline * 1000,
              "yyyy/MM/dd HH:mm:ss"
            );
          }
          this.$store.commit("updateGuideStatus", res.data.isNew);
          if (res.data.isNew) {
            return;
          }
          /*英雄卡牌等级价格列表*/
          if (res.data.cardPrices.length > 0) {
            this.allHeroLevelPriceList = res.data.cardPrices;
          }
          /*刷新市场价格列表*/
          let lvListObj = res.data.refreshPrices;
          this.levelList = [];
          for (let k in lvListObj) {
            this.levelList.push({
              level: k,
              levelMoney: lvListObj[k].symbol + lvListObj[k].price
            });
          }
          if (getCookie("refreshLevel")) {
            this.levelList.forEach((v, i) => {
              if (v.level == getCookie("refreshLevel")) {
                this.currentLevel = v;
              }
            });
          } else {
            this.currentLevel = this.levelList[0];
          }

          /*处理用户背包*/
          if (res.data.backpack) {
            this.initPackageCardList(res.data.backpack);
          }

          /*处理市场英雄列表*/
          if (res.data.cards) {
            this.initMarketCardList(res.data.cards, res.data.tags);
          }
          /*处理购买背包价格列表*/
          if (res.data.packPrices) {
            this.totalBuyPackagePriceList = [];
            let arr = [];
            for (let k in res.data.packPrices) {
              arr[k - 1] = res.data.packPrices[k];
            }
            arr.forEach((v, i) => {
              let newArr = [];
              for (let j in v) {
                v[j].id = j;
                v[j].price = v[j].price;
                newArr.push(v[j]);
              }
              this.totalBuyPackagePriceList.push(newArr);
            });
          }
        }
      });
    },
    handleBuyPackagePriceSelect(x) {
      this.currentBuyPackagePrice = x;
    },
    handleBuyPackagePriceBuy() {
      let data = {
        price_id: this.currentBuyPackagePrice.id,
        type: this.buyPackageIndex == 7 ? 1 : 2
      };
      this.$http(this.ApiSetting.autoChess.buyChessPackage, data).then(res => {
        if (res.status == 1) {
          let data = res.data;
          let _this = this;
          _this.newPackageCardList = {};
          _this.newPackageCardList = data.backpack;
          let _data = _this.newPackageCardList;
          for (let k in _data) {
            _data[k].cardIndex = k;
            _data[k].compoundAnimate = false;
            _data[k].soldAnimate = false;
            _this.packageHeroesList.forEach((v, i) => {
              if (v.cardIndex == k) {
                v = Object.assign(v, _data[k]);
              }
              if (v.duration > 0) {
                _this.leaveTimeCountDown(v);
              }
              if (!v.card_id) {
                v.selected = false;
              }
            });
          }
          if (data.events.compound.length > 0) {
            if (!_this.animateFlag) {
              _this.animateFlag = true;
              let firstComPound = data.events.compound[0];
              let secondComPound =
                data.events.compound.length > 1
                  ? data.events.compound[1]
                  : false;
              let thirdComPound =
                data.events.compound.length > 2
                  ? data.events.compound[2]
                  : false;
              if (thirdComPound) {
                _this.doCompoundAnimate(
                  firstComPound,
                  secondComPound,
                  thirdComPound
                );
              } else if (secondComPound) {
                _this.doCompoundAnimate(firstComPound, secondComPound);
              } else {
                _this.doCompoundAnimate(firstComPound);
              }
            }
          }
          this.showBuyPackagePrice = false;
          this.reLoadMoney();
        }
      });
    },
    reLoadMoney(bool) {
      if (this.isLogin) {
        let data = {
          gameCode: "EG"
        };
        this.$http(this.ApiSetting.index.getMoney, data).then(
          res => {
            if (res.status === 1) {
              this.userName = res.data.nickname;
              this.currencyInfo = res.data.currency_info;
              if (!bool) {
                this.startCount = true;
              } else {
                this.startCount = false;
              }
              this.egMoney = res.data.amount * 1;
            }
          },
          err => {}
        );
        //this.$store.dispatch('getUserVirtualMoney')
      }
    },
    handleBuyHero(x) {
      if (
        this.animateFlag ||
        this.buyLoad ||
        this.soldLoad ||
        this.dragging ||
        this.loadMarketHeroFlag ||
        (this.currentMode == 1 && !this.canBuy)
      ) {
        return;
      }
      this.buyLoad = true;
      let str = "";
      let itemArr = [];
      if (x) {
        str = x.cardIndex + "";
        itemArr.push(x);
      } else {
        let arr = [];
        this.marketHeroesList.forEach((v, i) => {
          if (v.selected) {
            itemArr.push(v);
            arr.push(v.cardIndex);
          }
        });
        if (arr.length > 0) {
          str = arr.join(",");
        }
      }
      this.$http(this.ApiSetting.autoChess.buyChessCards, {
        card_num_str: str
      }).then(
        res => {
          this.buyLoad = false;
          if (res.status === 1) {
            if (
              itemArr.length === 1 &&
              !this.noMp3.includes(itemArr[0].card_id)
            ) {
              this.audio.src = require("../../assets/autoChess/audio/" +
                itemArr[0].card_id +
                ".mp3");
              this.audio.load();
              this.audio.play();
            }
            this.buyAfterAnimate(res.data);
            this.reLoadMoney();
          }
        },
        err => {
          this.buyLoad = false;
        }
      );
    },
    handleSoldHero() {
      if (
        this.animateFlag ||
        this.soldLoad ||
        this.buyLoad ||
        !this.canSold ||
        this.dragging
      ) {
        return;
      }
      this.soldLoad = true;
      let str = "";
      let arr = [];
      let soldAnimateData = [];
      this.packageHeroesList.forEach((v, i) => {
        if (v.selected) {
          arr.push(v.cardIndex);
          soldAnimateData.push(v);
          v.sortDisabled = true;
        }
      });
      this.$forceUpdate();
      if (arr.length > 0) {
        str = arr.join(",");
      }
      this.$http(this.ApiSetting.autoChess.sellChessCards, {
        pack_num_str: str
      })
        .then(
          res => {
            if (res.status === 1) {
              this.doSoldAnimate(soldAnimateData, res.data.backpack);
            }
          },
          err => {
            this.packageHeroesList.forEach((v, i) => {
              if (v.selected) {
                v.sortDisabled = false;
              }
            });
          }
        )
        .finally(() => {
          this.soldLoad = false;
        });
    },
    /*处理用户背包*/
    initPackageCardList(data) {
      this.packageHeroesList = [];
      let arr = [],
        _this = this;
      for (let k in data) {
        data[k].selected = false;
        data[k].compoundAnimate = false;
        data[k].soldAnimate = false;
        data[k].cardIndex = k;
        if (data[k].duration > 0) {
          this.leaveTimeCountDown(data[k]);
        }
        arr.push(data[k]);
      }
      this.packageHeroesList = arr;
      this.$nextTick(() => {
        this.initSvgaPlayer(2);
        createSort();
      });
      function createSort() {
        let sortList = document.querySelector("#package_hero_list");
        Sortable.create(sortList, {
          ghostClass: "ghost",
          fallbackClass: "chosen_card",
          dragClass: "chosen_card",
          handle: ".drag_handle",
          filter: ".disabled",
          swap: true,
          onStart: evt => {
            _this.packageSelectIndexArr = [];
            _this.packageHeroesList.forEach((v, i) => {
              if (v.selected) {
                _this.packageSelectIndexArr.push(v.cardIndex);
              }
            });
            _this.dragging = true;
          },
          onMove: evt => {
            _this.dragging = true;
            if (
              _this.changeLoad ||
              _this.animateFlag ||
              _this.buyLoad ||
              _this.soldLoad
            ) {
              return false;
            }
            return !evt.related.classList.contains("disabled");
          },
          onEnd: evt => {
            _this.dragging = false;
            _this.changeLoad = false;
            if (evt.oldIndex == evt.newIndex || _this.changeLoad) {
              return false;
            }
            _this.changeLoad = true;
            _this
              .$http(_this.ApiSetting.autoChess.swapChessCards, {
                pack_num_1: evt.oldIndex * 1 + 1,
                pack_num_2: evt.newIndex * 1 + 1
              })
              .then(
                res => {
                  if (res.status === 1) {
                    _this.packageSelectIndexArr.forEach((v, i) => {
                      if (v == evt.oldIndex * 1 + 1) {
                        v = evt.newIndex * 1 + 1;
                        _this.packageSelectIndexArr.splice(
                          i,
                          1,
                          evt.newIndex * 1 + 1
                        );
                      } else if (v == evt.newIndex * 1 + 1) {
                        v = evt.oldIndex * 1 + 1;
                        _this.packageSelectIndexArr.splice(
                          i,
                          1,
                          evt.oldIndex * 1 + 1
                        );
                      }
                    });
                    let _data = res.data.backpack;
                    _this.canSold = false;
                    for (let k in _data) {
                      _data[k].cardIndex = k;
                      _data[k].compoundAnimate = false;
                      _data[k].soldAnimate = false;
                      _this.packageHeroesList.forEach((v, i) => {
                        if (v.cardIndex == k) {
                          clearTimeout(v.timer);
                          delete v.duration;
                          delete v.countDownTime;
                          delete v.is_lock;
                          v.selected = false;
                          _this.packageSelectIndexArr.forEach((a, b) => {
                            if (v.cardIndex == a) {
                              v.selected = true;
                              _this.canSold = true;
                            }
                          });
                          v = Object.assign(v, _data[k]);
                        }
                      });
                    }
                    let newArray = _this.packageHeroesList.slice(0);
                    _this.packageHeroesList = [];
                    _this.$nextTick(() => {
                      _this.packageHeroesList = newArray.concat();
                      _this.packageHeroesList.forEach((v, i) => {
                        if (v.duration) {
                          _this.leaveTimeCountDown(v);
                        }
                      });
                    });
                  } else {
                    let newArray = _this.packageHeroesList.slice(0);
                    _this.packageHeroesList = [];
                    _this.$nextTick(() => {
                      _this.packageHeroesList = newArray.concat();
                      _this.packageHeroesList.forEach((v, i) => {
                        if (v.duration) {
                          _this.leaveTimeCountDown(v);
                        }
                      });
                    });
                  }
                  _this.changeLoad = false;
                },
                err => {
                  _this.changeLoad = false;
                  let newArray = _this.packageHeroesList.slice(0);
                  _this.packageHeroesList = [];
                  _this.$nextTick(() => {
                    _this.packageHeroesList = newArray.concat();
                    _this.packageHeroesList.forEach((v, i) => {
                      if (v.duration) {
                        _this.leaveTimeCountDown(v);
                      }
                    });
                  });
                }
              );
          }
        });
      }
    },
    initMarketCardList(data, tags) {
      this.marketHeroesList = [];
      let obj = data.cards;
      for (let k in obj) {
        this.marketHeroesList.push({
          ...obj[k],
          ...{
            selected: false,
            buyAnimate: false,
            lighted: tags.includes(parseInt(k)),
            cardIndex: k
          }
        });
      }
      if (data.duration) {
        this.leaveTimeCountDown(data, 1);
      }

      this.$nextTick(() => {
        this.initSvgaPlayer(1);
      });
    },
    /*购买完动画处理*/
    buyAfterAnimate(data) {
      let _this = this;
      for (let k in data.backpack) {
        this.packageHeroesList.forEach(a => {
          if (a.duration && a.cardIndex == k) {
            a.duration = data.backpack[k].duration;
            this.leaveTimeCountDown(a);
          }
        });
      }
      if (data.events.add.length > 0) {
        let len = data.events.add.length;
        data.events.add.forEach((v, i) => {
          this.animateFlag = true;
          let formClassName = ".market_hero_id_" + v.old_data.num;
          let toClassName = ".hero_index_" + v.new_data.num;
          let formEl = document.querySelector(formClassName);
          formEl.style.cssText = "display:block;";
          let toEl = document.querySelector(toClassName);
          let fromPositon = getElementOffset(formEl);
          let toPositon = getElementOffset(toEl);
          this.canBuy = false;
          this.marketHeroesList.forEach((j, k) => {
            if (j.cardIndex == v.old_data.num) {
              j.buyAnimate = true;
              j.selected = false;
            }
            if (j.selected) {
              this.canBuy = true;
            }
          });
          Velocity(
            formEl,
            {
              left: toPositon.left - fromPositon.left + "px",
              top: toPositon.top - fromPositon.top + "px"
            },
            {
              duration: _this.animationDuration,
              display: "none",
              begin: function(elements) {
                elements[0].style.cssText = "display:block;";
              },
              complete: function() {
                _this.packageHeroesList.forEach((x, y) => {
                  if (x.cardIndex == v.new_data.num) {
                    v.new_data.compoundAnimate = false;
                    x = Object.assign(x, v.new_data);
                  }
                });
                _this.marketHeroesList.forEach((j, k) => {
                  if (j.cardIndex == v.old_data.num) {
                    _this.marketHeroesList.splice(k, 1, {
                      cardIndex: v.old_data.num
                    });
                  }
                });
                formEl.removeAttribute("style");
                _this.animateFlag = false;
                len--;
                if (len == 0) {
                  // _this.newPackageCardList = {}
                  // _this.newPackageCardList = data.backpack
                  if (data.events.compound.length > 0 && !_this.animateFlag) {
                    _this.animateFlag = true;
                    let firstComPound = data.events.compound[0];
                    let secondComPound =
                      data.events.compound.length > 1
                        ? data.events.compound[1]
                        : false;
                    let thirdComPound =
                      data.events.compound.length > 2
                        ? data.events.compound[2]
                        : false;
                    if (thirdComPound) {
                      _this.doCompoundAnimate(
                        firstComPound,
                        secondComPound,
                        thirdComPound
                      );
                    } else if (secondComPound) {
                      _this.doCompoundAnimate(firstComPound, secondComPound);
                    } else {
                      _this.doCompoundAnimate(firstComPound);
                    }
                  }
                }
              }
            }
          );
        });
      }
    },
    doCompoundAnimate(data1, data2, data3) {
      let len = arguments.length;
      let _this = this;
      let oldArr = [];
      let data = data1;
      data.old_data.forEach((v, i) => {
        if (v.num != data.new_data.num) {
          oldArr.push(v);
        }
      });
      oldArr.forEach((v, i) => {
        this.animateFlag = true;
        let formClassName = ".package_hero_id_" + v.num;
        let toClassName = ".hero_index_" + data.new_data.num;
        let ToPriceClassName = ".hero_price_index_" + data.new_data.num;
        let ToStarClassName = ".hero_star_index_" + data.new_data.num;
        let formEl = document.querySelector(formClassName);
        let toEl = document.querySelector(toClassName);
        formEl.style.cssText = "display:block;";
        let fromPositon = getElementOffset(formEl);
        let toPositon = getElementOffset(toEl);
        let _delay = this.animationDuration + 100;
        this.packageHeroesList.forEach((a, b) => {
          if (a.cardIndex == v.num) {
            a = Object.assign(a, { compoundAnimate: true });
          }
        });
        Velocity(
          formEl,
          {
            left: toPositon.left - fromPositon.left + "px",
            top: toPositon.top - fromPositon.top + "px"
          },
          {
            duration: _this.animationDuration,
            display: "none",
            delay: _delay,
            complete: function() {
              formEl.removeAttribute("style");
              _this.packageHeroesList.forEach((x, y) => {
                if (x.cardIndex == v.num) {
                  x = Object.assign(x, {
                    card_id: 0,
                    cardIndex: x.cardIndex,
                    level: 0
                  });
                }
                if (x.cardIndex == data.new_data.num) {
                  x = Object.assign(x, data.new_data);
                }
                x.compoundAnimate = false;
              });
              if (oldArr.length - 1 == i) {
                _this.$nextTick(() => {
                  let toPriceEl = document.querySelector(ToPriceClassName);
                  let imgEl = toEl.getElementsByClassName("hero_img");
                  let starEl = document.querySelector(ToStarClassName);
                  let moneyEl = toPriceEl.getElementsByClassName("hero_price");
                  Velocity(imgEl, "callout.pulse", {
                    delay: 100,
                    complete: function() {
                      Velocity(starEl, "callout.pulse", {
                        delay: 50,
                        complete: function() {
                          Velocity(moneyEl, "callout.pulse", {
                            delay: 50,
                            complete: function() {
                              if (len === 1) {
                                _this.canSold = false;
                                _this.packageHeroesList.forEach((v, i) => {
                                  if (!v.card_id) {
                                    v.selected = false;
                                  }
                                  if (v.selected) {
                                    _this.canSold = true;
                                  }
                                });
                                _this.animateFlag = false;
                              } else {
                                if (data2 && data3) {
                                  _this.doCompoundAnimate(data2, data3);
                                } else if (data2) {
                                  _this.doCompoundAnimate(data2);
                                }
                              }
                            }
                          });
                        }
                      });
                    }
                  });
                });
              }
            }
          }
        );
      });
    },
    doSoldAnimate(animatedata, initdata) {
      let toEl = document.querySelector(".money_icon");
      let toElWidth = window.getComputedStyle(toEl).width;
      let toElHeight = window.getComputedStyle(toEl).height;
      animatedata.forEach((v, i) => {
        v.sortDisabled = true;
        this.animateFlag = true;
        let formClassName = ".sold_package_hero_id_" + v.cardIndex;
        let fromHeroPicClassName = ".hero_pic_index_" + v.cardIndex;
        let formEl = document.querySelector(formClassName);
        let formHeroPicEl = document.querySelector(fromHeroPicClassName);
        let _this = this;
        Velocity(
          formHeroPicEl,
          { scaleX: 0.1, scaleY: 0.1 },
          {
            duration: 600,
            display: "none",
            complete: function() {
              formEl.style.cssText = "display:block;";
              let fromElWidth = window.getComputedStyle(formEl).width;
              let fromElHeight = window.getComputedStyle(formEl).height;
              let fromPositon = getElementOffset(formEl);
              let toPositon = getElementOffset(toEl);
              Velocity(formEl, "callout.bounce", {
                duration: 1000,
                complete: function() {
                  _this.packageHeroesList.forEach((x, y) => {
                    if (x.cardIndex == v.cardIndex) {
                      x = Object.assign(x, {
                        card_id: 0,
                        cardIndex: x.cardIndex,
                        picture: "",
                        name: "",
                        level: 0,
                        selected: false
                      });
                    }
                  });
                  Velocity(
                    formEl,
                    {
                      left:
                        toPositon.left -
                        fromPositon.left +
                        (parseInt(fromElWidth) - parseInt(toElWidth)) +
                        (parseInt(fromElWidth) - parseInt(toElWidth)) / 2 -
                        1 +
                        "px",
                      top:
                        toPositon.top -
                        fromPositon.top +
                        (parseInt(fromElWidth) - parseInt(toElWidth)) +
                        (parseInt(fromElWidth) - parseInt(toElWidth)) / 2 +
                        2 +
                        "px",
                      width: toElWidth,
                      height: toElWidth
                    },
                    {
                      duration: 600,
                      display: "none",
                      delay: 200,
                      complete: function() {
                        if (i == 0) {
                          _this.audio.src = require("../../assets/autoChess/audio/" +
                            "coin.mp3");
                          _this.audio.load();
                          _this.audio.play();
                        }
                        v.sortDisabled = true;
                        formEl.removeAttribute("style");
                        if (animatedata.length - 1 == i) {
                          _this.animateFlag = false;
                          _this.canSold = false;
                          _this.packageHeroesList.forEach((a, b) => {
                            if (a.selected) {
                              _this.canSold = true;
                            }
                          });
                          _this.reLoadMoney();
                        }
                      }
                    }
                  );
                }
              });
            }
          }
        );
      });
    }
  }
};
</script>
<style lang="less">
/*强制横屏显示：通过竖屏时旋转解决横屏问题  */
/*  @media screen and  (orientation: portrait) {
      #game_index {
        transform: rotate(90deg);
        transform-origin: 0% 0%;
        width: 100vh; !*2.利用 vh 重置 ‘宽度’ *!
        height: 100vw; !* 3.利用 vw 重置 ‘高度’ *!
        top: 0;
        left: 100vw; !* 4.旋转后页面超出屏幕，重置页面定位位置 *!
        transform-origin: 50% 50%;
      }
    }
    @media screen and  (orientation: landscape) {
      #game_index {
        transform: none;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
    }*/
#game_index {
  height: 100vh;
}
#game_main {
  height: 100%;
  background: url("../../assets/autoChess/bg.png") no-repeat center;
  background-size: 100% 100%;
}
#game_main .game_top {
  height: 0.35rem;
  background: url("../../assets/autoChess/top-bg.png") no-repeat center;
  background-size: 100% 100%;
  position: relative;
  /* display: flex;
    justify-content: space-between; */
  padding: 0 0.2rem 0 1.31rem;
  box-shadow: 0 0.1rem 0.2rem 0 rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
}
#game_main .game_top .login_out_btn {
  position: absolute;
  left: 0;
  top: 0;
  height: 0.37rem;
  width: 1.31rem;
  background: url("../../assets/autoChess/login_out_btn_normal.png") no-repeat
    center;
  background-size: 100% 100%;
}
#game_main .game_top .login_out_btn:hover {
  background-image: url("../../assets/autoChess/login_out_btn_hover.png");
}
#game_main .game_top .login_out_btn .btn_box {
  width: 1rem;
  height: 100%;
  display: inline-block;
  vertical-align: top;
}
#game_main .game_top .top_title {
  position: absolute;
  left: 50%;
  top: 0;
  transform: translatex(-50%);
  height: 100%;
  background: url("../../assets/autoChess/logo.png") no-repeat center;
  background-size: 28% auto;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 1rem;
}
#game_main .game_top .top_title img {
  height: 50%;
}
#game_main .game_top .game_info {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  right: 0.2rem;
  top: 50%;
  transform: translateY(-50%);
}
#game_main .game_top .game_info .btn_box {
  width: 0.49rem;
  height: 0.19rem;
  box-shadow: 0 0.04rem 0.1rem 0 rgba(0, 0, 0, 0.7);
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
}
/*#game_main .game_top .game_info .btn_box.heroes{
    background-image: url("../../assets/autoChess/btn-hero-normal.png");
    margin-right: 0.1rem;
  }
  #game_main .game_top .game_info .btn_box.heroes:hover{
    background-image: url("../../assets/autoChess/btn-hero-hover.png");
  }*/
.history {
  background-image: url("../../assets/autoChess/history-normal.png");
  margin-right: 0.1rem;
  &:hover {
    background-image: url("../../assets/autoChess/history-hover.png");
  }
}
#game_main .game_top .game_info .btn_box.game_rule {
  background-image: url("../../assets/autoChess/btn-rule-normal.png");
}
#game_main .game_top .game_info .btn_box.game_rule:hover {
  background-image: url("../../assets/autoChess/btn-rule-hover.png");
}
#game_main .game_top .user_info {
  display: flex;
  align-items: center;
  height: 100%;
  position: absolute;
  left: 1.31rem;
}
#game_main .game_top .user_info .user_name {
  width: 0.8rem;
  color: #ffe2ce;
  font-size: 0.14rem;
}
#game_main .game_top .user_info .user_money_box {
  min-width: 0.6rem;
  margin-left: 0.12rem;
  position: relative;
  height: 0.15rem;
  line-height: 0.15rem;
  background: url("../../assets/autoChess/user_money_bg.png") no-repeat center;
  background-size: 100% 100%;
  text-align: right;
  color: #ff5837;
  font-size: 0.1rem;
  box-sizing: border-box;
  padding: 0 0.06rem 0 0.12rem;
  transform: translateZ(0);
}
#game_main .game_top .user_info .user_money_box .money_icon {
  width: 0.2rem;
  height: 0.2rem;
  background: url("../../assets/autoChess/icon-money.png") no-repeat center;
  background-size: 100% 100%;
  position: absolute;
  left: -0.11rem;
  top: -0.02rem;
}
#game_main .game_top .user_info .user_money_box .num {
  display: inline-block;
  height: 100%;
  vertical-align: top;
  padding-left: 0.05rem;
}

#game_main .game_content {
  padding: 0.18rem 0.19rem 0;
}
#game_main .game_content .section {
  width: 100%;
  height: 1.81rem;
  background: url("../../assets/autoChess/section_bg.png") no-repeat center;
  background-size: 100% 100%;
  margin-bottom: 0.32rem;
  position: relative;
  box-sizing: border-box;
  padding-top: 0.08rem;
}
#game_main .game_content .section.hero_market {
  padding: 0.12rem 0.29rem 0;
}
#game_main .game_content .section .section_title {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.12rem 0;
}
#game_main .game_content .section .section_title img {
  height: 0.15rem;
}

#game_main .game_content .section .section_title .marker_countdown_box {
  position: absolute;
  left: 100%;
  top: 0;
  height: 100%;
  width: 0.46rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
#game_main .game_content .section .section_title .marker_countdown_box span {
  display: inline-block;
  vertical-align: middle;
  width: 100%;
  height: 0.15rem;
  line-height: 0.15rem;
  background: url("../../assets/autoChess/count_down_bg.png") no-repeat center;
  background-size: 100% 100%;
  text-align: center;
  color: #ffe2ce;
  font-size: 0.1rem;
}
#game_main .game_content .section .section_top {
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 2;
}
#game_main .game_content .section .section_top .buy_mode {
  height: 0.2rem;
  display: flex;
}
#game_main .game_content .section .section_top .buy_mode .mode_box {
  height: 100%;
  width: 0.6rem;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
}
#game_main .game_content .section .section_top .buy_mode .mode_box.normal {
  margin-right: 0.1rem;
  background-image: url("../../assets/autoChess/btn-buy-mode-normal-default.png");
}
#game_main
  .game_content
  .section
  .section_top
  .buy_mode
  .mode_box.normal.selected,
#game_main
  .game_content
  .section
  .section_top
  .buy_mode
  .mode_box.normal:hover {
  background-image: url("../../assets/autoChess/btn-buy-mode-normal-selected.png");
}
#game_main .game_content .section .section_top .buy_mode .mode_box.fast {
  background-image: url("../../assets/autoChess/btn-buy-mode-fast-default.png");
}
#game_main
  .game_content
  .section
  .section_top
  .buy_mode
  .mode_box.fast.selected,
#game_main .game_content .section .section_top .buy_mode .mode_box.fast:hover {
  background-image: url("../../assets/autoChess/btn-buy-mode-fast-selected.png");
}

#game_main
  .game_content
  .section
  .section_top
  .level_select
  .current_level_box {
  width: 1.2rem;
  height: 0.29rem;
  background: url("../../assets/autoChess/level_select_bg.png") no-repeat center;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
}
#game_main
  .game_content
  .section
  .section_top
  .level_select
  .current_level_box
  .icon_down_arr {
  position: absolute;
  width: 0.1rem;
  height: 0.06rem;
  background: url("../../assets/autoChess/icon-down.png") no-repeat center;
  background-size: 100% 100%;
  right: 0.1rem;
  top: 50%;
  transform: translateY(-50%);
}

#game_main .game_content .section .section_btn,
.autochess_dialog.buy_package .buy_btn {
  position: absolute;
  width: 1.03rem;
  height: 0.466rem;
  left: 50%;
  transform: translateX(-50%);
  bottom: -0.285rem;
}
#game_main .game_content .section .section_btn span {
  display: inline-block;
  height: 100%;
  width: 100%;
  vertical-align: top;
  background-position: center 0;
  background-repeat: no-repeat;
  background-size: 100% auto;
}

#game_main .game_content .section .section_btn.buy .defalut {
  background-image: url("../../assets/autoChess/btn-buy-disabled.png");
}
#game_main .game_content .section .section_btn.buy .normal,
.autochess_dialog.buy_package .buy_btn {
  background-image: url("../../assets/autoChess/btn-buy-normal.png");
  cursor: pointer;
}
#game_main .game_content .section .section_btn.buy .normal:hover,
.autochess_dialog.buy_package .buy_btn:hover {
  background-image: url("../../assets/autoChess/btn-buy-hover.png");
  cursor: pointer;
}
#game_main .game_content .section .section_btn.sold .defalut {
  background-image: url("../../assets/autoChess/btn-sold-disabled.png");
}
#game_main .game_content .section .section_btn.sold .normal {
  cursor: pointer;
  background-image: url("../../assets/autoChess/btn-sold-normal.png");
}
#game_main .game_content .section .section_btn.sold .normal:hover {
  background-image: url("../../assets/autoChess/btn-sold-hover.png");
}

.level_box {
  width: 100%;
  height: 0.36rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.1rem;
  color: #ffe2ce;
  cursor: pointer;
}

.level_box.selected,
.level_box:hover {
  color: #ff5837;
  background: url("../../assets/autoChess/level_selected_bg.png") no-repeat
    center;
  background-size: 100% 100%;
}
.current_level_box.level_box.selected {
  background-image: url("../../assets/autoChess/level_select_hover_bg.png");
}
.level_box .text_icon {
  height: 0.14rem;
  width: 0.36rem;
  background-position: center;
  background-repeat: no-repeat;
  background-size: auto 100%;
}
.current_level_box.level_box .text_icon {
  width: 0.44rem;
  background-position: 0 center;
}
.level_box.lv1 .text_icon {
  background-image: url("../../assets/autoChess/lv1-normal.png");
}
.level_box.lv2 .text_icon {
  background-image: url("../../assets/autoChess/lv2-normal.png");
}
.level_box.lv3 .text_icon {
  background-image: url("../../assets/autoChess/lv3-normal.png");
}
.level_box.lv1.selected .text_icon,
.level_box.lv1:hover .text_icon {
  background-image: url("../../assets/autoChess/lv1-selected.png");
}
.level_box.lv2.selected .text_icon,
.level_box.lv2:hover .text_icon {
  background-image: url("../../assets/autoChess/lv2-selected.png");
}
.level_box.lv3.selected .text_icon,
.level_box.lv3:hover .text_icon {
  background-image: url("../../assets/autoChess/lv3-selected.png");
}
.popover_level_list {
  width: 1.2rem;
  box-sizing: border-box;
  padding: 0.01rem;
}

#game_main .game_content .section.hero_market .section_main {
  display: flex;
  align-items: center;
  margin-top: 0.03rem;
  justify-content: space-between;
  position: relative;
}

#game_main .game_content .section .section_main .hero_list {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
#game_main .game_content .section.hero_market .section_main .hero_list {
  width: calc(100% - 0.8rem);
}
.hero_list .hero_box {
  width: 0.9rem;
  height: 1.2rem;
  position: relative;
  &[draggable="false"] {
    transform: none !important;
  }
  &.ghost {
    .img_box,
    .hero_name,
    .star_box,
    .hero_price {
      display: none;
    }
  }
  &.chosen_card {
    .box_top {
      background: none;
    }
  }
}
.hero_list .hero_box.disabled {
  cursor: pointer;
}
.hero_list .hero_box.hide_zIndex {
  z-index: 99;
}
.hero_market .hero_list .hero_box {
  /*width: 1rem;*/
}
.hero_list .hero_box .box_top {
  height: 0.9rem;
  position: relative;
  width: 0.9rem;
  background-repeat: no-repeat;
  background-position: center bottom;
  background-size: 100% auto;
  margin: 0 auto;
  background-image: url("../../assets/autoChess/hero_level_1.png");
}
.hero_list .hero_box .box_top.hero_lv1 {
  cursor: pointer;
  background-image: url("../../assets/autoChess/hero_level_1.png");
}
.hero_list .hero_box .box_top.hero_lv2 {
  cursor: pointer;
  background-image: url("../../assets/autoChess/hero_level_2.png");
}
.hero_list .hero_box .box_top.hero_lv3 {
  cursor: pointer;
  background-image: url("../../assets/autoChess/hero_level_3.png");
}
.hero_list .hero_box .box_top.hero_lv4 {
  cursor: pointer;
  background-image: url("../../assets/autoChess/hero_level_4.png");
}
.hero_list .hero_box .box_top.hero_lv5 {
  cursor: pointer;
  background-image: url("../../assets/autoChess/hero_level_5.png");
}
.hero_list .hero_box.lock_disabled .box_top {
  background-image: url("../../assets/autoChess/hero_level.png");
}
.hero_list .hero_box .box_top.animate_box {
  position: absolute;
  left: 0;
  top: 0;
  height: 0.9rem;
  width: 0.9rem;
  text-align: center;
  background: none;
  display: none;
}

.hero_list .hero_box .box_top .img_box {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 0.79rem;
  z-index: 2;
  position: relative;
}
.hero_list .hero_box .box_top .img_box img {
  max-height: 100%;
  max-width: 100%;
}
.hero_list .hero_box .box_top .selected_mask {
  /* display: none;*/
  position: absolute;
  height: 150%;
  width: 150%;
  left: -25%;
  bottom: -15%;
  overflow: hidden;
}
#package_hero_list .selected_mask {
  background: url("../../assets/autoChess/seat-hover.png") no-repeat center
    bottom;
  background-size: 1rem 0.25rem;
  bottom: 12%;
  opacity: 0.8;
}
#package_hero_list,
.package_hero_svga {
  position: absolute;
  left: 0;
  top: 0.38rem;
  width: 100%;
  box-sizing: border-box;
}
.package_hero_svga {
  pointer-events: none;
}
.package_hero_svga .selected_mask {
  display: block;
}
.package_hero_svga .box_top {
  background-image: none !important;
}
.package_hero_seleced_svga {
  width: 1rem;
  height: 1rem;
}
.hero_list .hero_box .box_top .selected_mask_top_layer {
  /* display: none;*/
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  bottom: 0.14rem;
  z-index: 3;
  background: url("../../assets/autoChess/top_mask.png") no-repeat;
  background-position: center bottom;
  background-size: 100% auto;
}
.hero_list .hero_box .hero_name_price {
  font-size: 0.09rem;
  color: #808080;
  margin-top: 0.02rem;
  width: 100%;
  text-align: center;
  height: 0.12rem;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 0.12rem;
}
.hero_list .hero_box .hero_name {
  max-width: 0.5rem;
  height: 100%;
  transform: translateZ(0);
}
.hero_list .hero_box .animate_box .hero_name_price {
  margin-top: 0.13rem;
}
.hero_list .hero_box .hero_name_price .hero_price {
  color: #ff5837;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-left: 0.05rem;
}
/* .hero_list .hero_box .hero_name{
    position: absolute;
    left: 0;
    bottom: -0.05rem;
    height: 0.16rem;
    line-height: 0.16rem;
    width: 100%;
    text-align: center;
  }*/
.hero_list .hero_box .star_box {
  height: 0.12rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  width: 100%;
  bottom: 0;
}
.hero_list .hero_box .star_box .star {
  height: 100%;
  width: 0.11rem;
  background: url("../../assets/autoChess/star.png") no-repeat;
  background-position: center center;
  background-size: 100% auto;
  margin: 0 0.01rem;
}
.hero_list .hero_box.ghost .img_box,
.hero_list .hero_box.ghost .hero_name,
.hero_list .hero_box.ghost .star_box,
.hero_list .hero_box.ghost .hero_price {
  display: none;
}
.hero_list .hero_box.ghost .buy_package_box {
  display: none;
}
.hero_list .hero_box.chosen_card .box_top {
  background: none;
}

#game_main .game_content .section .section_main .refresh_box {
  padding-top: 0.1rem;
}
#game_main .game_content .section .section_main .refresh_btn {
  width: 0.84rem;
  height: 0.84rem;
  background: url("../../assets/autoChess/btn-refresh-normal.png") no-repeat
    center;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
  border-radius: 50%;
}
#game_main .game_content .section .section_main .refresh_btn:hover {
  background-image: url("../../assets/autoChess/btn-refresh-hover.png");
}
#game_main .game_content .section .section_main .refresh_btn .btn_wrapper {
  width: 0.6rem;
  height: 0.6rem;
  background: url("../../assets/autoChess/refresh_arrow.png") no-repeat center;
  background-size: 100% 100%;
}
#game_main
  .game_content
  .section
  .section_main
  .refresh_btn.refresh
  .btn_wrapper {
  transform: rotate(360deg);
  transform-origin: 50% 50%;
  transition: transform 0.6s;
}
#game_main .game_content .section .section_main .refresh_box .level_price {
  height: 0.18rem;
  line-height: 0.18rem;
  font-size: 0.1rem;
  text-align: center;
  color: #ff5837;
  margin-top: 0.03rem;
}
#game_main .game_content .section.user_hero_package .section_main {
  padding-top: 0.356rem;
}
#game_main .game_content .section.user_hero_package .section_main .hero_list {
  padding: 0 0.05rem;
}
#game_main
  .game_content
  .section.user_hero_package
  .section_main
  .hero_list
  .hero_box {
  margin: 0 0.05rem;
}
.hero_box .spark_fly_ani {
  position: absolute;
  width: 80%;
  height: 80%;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0.2rem;
  overflow: hidden;
}
.hero_box .spark_fly_ani .spark_box {
  position: absolute;
  bottom: -5%;
  left: 0;
  z-index: 1;
  user-select: none;
  cursor: default;
  animation-duration: 3s, 3s;
  animation-timing-function: linear, ease-in-out;
  animation-iteration-count: infinite, infinite;
  animation-play-state: running, running;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
}
.hero_light_box .spark_fly_ani .spark_box {
  animation-duration: 5s, 5s;
  animation-direction: reverse;
}
.hero_light_box .spark_fly_ani {
  width: 100%;
  height: 100%;
}
.spark_fly_ani .spark_box.spark2 {
  width: 0.06rem;
  height: 0.06rem;
  background-image: url("../../assets/autoChess/spark-2.png");
}
.spark_fly_ani .spark_box.spark1 {
  width: 0.03rem;
  height: 0.03rem;
  background-image: url("../../assets/autoChess/spark-1.png");
}
.snowflake0 {
  animation-name: snowflakes-fall, snowflakes-shake0;
}
.snowflake1 {
  animation-name: snowflakes-fall, snowflakes-shake1;
}
.snowflake2 {
  animation-name: snowflakes-fall, snowflakes-shake2;
}
.snowflake3 {
  animation-name: snowflakes-fall, snowflakes-shake3;
}
.snowflake4 {
  animation-name: snowflakes-fall, snowflakes-shake4;
}
.snowflake5 {
  animation-name: snowflakes-fall, snowflakes-shake5;
}
.snowflake6 {
  animation-name: snowflakes-fall, snowflakes-shake6;
}
.snowflake7 {
  animation-name: snowflakes-fall, snowflakes-shake7;
}
.snowflake8 {
  animation-name: snowflakes-fall, snowflakes-shake8;
}
.snowflake9 {
  animation-name: snowflakes-fall, snowflakes-shake9;
}
.snowflake10 {
  animation-name: snowflakes-fall, snowflakes-shake10;
}
.snowflake11 {
  animation-name: snowflakes-fall, snowflakes-shake11;
}
.snowflake12 {
  animation-name: snowflakes-fall, snowflakes-shake12;
}
@keyframes snowflakes-fall {
  0% {
    bottom: -5%;
  }
  100% {
    bottom: 100%;
  }
}
@keyframes snowflakes-shake0 {
  0%,
  100% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(100%, 0, 0);
  }
}
@keyframes snowflakes-shake1 {
  0%,
  100% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(80%, 0, 0);
  }
}
@keyframes snowflakes-shake2 {
  0%,
  100% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(160%, 0, 0);
  }
}
@keyframes snowflakes-shake3 {
  0%,
  100% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(150%, 0, 0);
  }
}
@keyframes snowflakes-shake4 {
  0%,
  100% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(90%, 0, 0);
  }
}
@keyframes snowflakes-shake5 {
  0%,
  100% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(140%, 0, 0);
  }
}
@keyframes snowflakes-shake6 {
  0%,
  100% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(170%, 0, 0);
  }
}
@keyframes snowflakes-shake7 {
  0%,
  100% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(50%, 0, 0);
  }
}
@keyframes snowflakes-shake8 {
  0%,
  100% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(120%, 0, 0);
  }
}
@keyframes snowflakes-shake9 {
  0%,
  100% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(40%, 0, 0);
  }
}
@keyframes snowflakes-shake10 {
  0%,
  100% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(110%, 0, 0);
  }
}
@keyframes snowflakes-shake11 {
  0%,
  100% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(60%, 0, 0);
  }
}
@keyframes snowflakes-shake12 {
  0%,
  100% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(130%, 0, 0);
  }
}

.box_top .buy_package_box {
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0.1rem;
  font-size: 0.1rem;
  color: #ffe2ce;
  text-align: center;
  height: 0.16rem;
  z-index: 9;
  display: flex;
  justify-content: center;
  align-items: center;
}
.box_top .buy_package_box .time_count_down {
  height: 100%;
  background: url("../../assets/autoChess/count_down_bg.png") no-repeat center;
  background-size: 100% 100%;
  line-height: 0.16rem;
  width: 0.5rem;
}
.box_top .buy_package_box .buy_package_btn {
  display: inline-block;
  height: 100%;
  box-sizing: border-box;
  padding: 0 0.05rem;
  border: 1px solid #8f796c;
  background-color: rgba(0, 0, 0, 0.8);
}

.sold_animate_img {
  width: 0.4rem;
  position: absolute;
  left: 0.25rem;
  top: 0.22rem;
  display: none;
}
/*不显示影子元素*/

/**相同英雄标记**/
.hero_box .hero_light_box {
  pointer-events: none;
  position: absolute;
  background: url("../../assets/autoChess/light.png") no-repeat center;
  background-size: 100% 100%;
  z-index: 2;
  left: 50%;
  top: -1rem;
  width: 1.2rem;
  height: 1.6rem;
  transform: translateX(-50%);
}

#rotate_screen,
#index_load_page {
  position: absolute;
  top: 0;
  z-index: 5002;
  width: 100%;
  height: 100%;
  opacity: 0.9;
  background-color: black;
  overflow: hidden;
}
#index_load_page .progress {
  width: 3.02rem;
  height: 0.2rem;
  background: url("../../assets/autoChess/progress.png") no-repeat;
  background-size: cover;
  line-height: 0.2rem;
  text-align: center;
  font-size: 0.12rem;
  color: #ffe2ce;
  position: relative;
  border-radius: 0.095rem;
  overflow: hidden;
  margin-top: 0.5rem;
}
#index_load_page .progress .proloading {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  background-color: rgba(255, 66, 0, 0.4);
  z-index: -1;
}
#rotatingAn {
  width: 28%;
  margin-left: 35%;
  margin-top: 30%;
  animation: rotatingAnima 2s linear infinite;
}
/*旋转提示动画*/
@keyframes rotatingAnima {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-90deg);
  }
  50% {
    transform: rotate(0deg);
  }
  75% {
    transform: rotate(-90deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
/*旋转图片DIV中文字的设置*/
#rotate_screen p {
  display: inline-block;
  width: 100%;
  line-height: 0.16rem;
  text-align: center;
  margin-top: 0.2rem;
  font-size: 0.12rem;
  padding: 0 0.1rem;
  box-sizing: border-box;
}
#rotate_screen p:nth-child(2) {
  color: rgb(255, 0, 0);
}
#rotate_screen p:nth-child(3) {
  color: rgb(185, 185, 185);
}

.autochess_dialog .dialog_wrapper {
  height: 100%;
  padding: 0.15rem;
  overflow-y: auto;
  box-sizing: border-box;
}
.autochess_dialog .dialog_header {
  text-align: center;
  height: 0.18rem;
}

.autochess_dialog .dialog_header span {
  display: inline-block;
  height: 100%;
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: auto 100%;
  vertical-align: top;
}
.autochess_dialog .dialog_close_btn {
  position: absolute;
  right: 0.15rem;
  top: 0.15rem;
  width: 0.15rem;
  height: 0.15rem;
  background: url("../../assets/autoChess/btn-x-normal.png") no-repeat center;
  background-size: 100% 100%;
  cursor: pointer;
}
.autochess_dialog .dialog_close_btn:hover {
  background-image: url("../../assets/autoChess/btn-x-hover.png");
}
.buy_package.autochess_dialog .dialog_header.package_title_7 span {
  background-image: url("../../assets/autoChess/package_7_title.png");
}
.buy_package.autochess_dialog .dialog_header.package_title_8 span {
  background-image: url("../../assets/autoChess/package_8_title.png");
}
.game_rule.autochess_dialog .dialog_header span {
  /* background-image: url("../../assets/autoChess/game_rule_title.png"); */
  font-size: 0.18rem;
  line-height: 0.18rem;
}
.game_rule.autochess_dialog .content {
  padding-top: 0.1rem;
}

.game_rule.autochess_dialog .content p {
  text-align: left;
  line-height: 0.15rem;
  padding: 0.05rem 0;
}
.game_rule.autochess_dialog .content .dialog_section {
  margin-top: 0.25rem;
}
.game_rule.autochess_dialog .dialog_section .list_title {
  text-align: center;
  height: 0.2rem;
}
.game_rule.autochess_dialog .dialog_section .list_title span {
  display: inline-block;
  height: 100%;
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto 100%;
  vertical-align: top;
}
.game_rule.autochess_dialog .hero_price_list.dialog_section .list_title span {
  background-image: url("../../assets/autoChess/hero_price_list_title.png");
}
.game_rule.autochess_dialog
  .package_price_list.dialog_section
  .list_title
  span {
  background-image: url("../../assets/autoChess/package_price_list_title.png");
}
.game_rule.autochess_dialog .dialog_section .list_table {
  width: 96%;
  margin: 0.15rem auto 0;
}

.game_rule.autochess_dialog .dialog_section .t_header {
  color: #fff;
  border-bottom: 0.01rem solid #5c514a;
}
.game_rule.autochess_dialog .dialog_section .t_row {
  display: flex;
  border-bottom: 0.01rem solid #5c514a;
}
.game_rule.autochess_dialog .dialog_section .t_row:last-child {
  border-bottom: none;
}
.game_rule.autochess_dialog .dialog_section .t_td {
  flex: 0 0 20%;
  height: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 0.01rem solid #5c514a;
}
.game_rule.autochess_dialog .dialog_section .t_td:last-child {
  border-right: none;
}
.game_rule.autochess_dialog .package_price_list.dialog_section .t_td {
  flex: 0 0 33.3%;
}

.autochess_dialog.buy_package .dialog_header {
  text-align: center;
  height: 0.16rem;
}

.autochess_dialog.buy_package .buy_btn {
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% auto;
  cursor: default !important;
}
.autochess_dialog.buy_package .buy_btn .click_box {
  width: 100%;
  height: 0.32rem;
  cursor: pointer;
}
.autochess_dialog.buy_package .price_list {
  width: 1.4rem;
  margin: 0.2rem auto 0;
}
.autochess_dialog.buy_package .price_list .list_box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 0.4rem;
  font-size: 0.11rem;
  color: #b88b6a;
  text-align: right;
  width: 100%;
  cursor: pointer;
}
.autochess_dialog.buy_package .price_list .list_box.actived,
.autochess_dialog.buy_package .price_list .list_box:hover {
  background: url("../../assets/autoChess/level_selected_bg.png") no-repeat
    center;
  background-size: 100% 100%;
}
.autochess_dialog.buy_package .price_list .list_box.actived .price_num,
.autochess_dialog.buy_package .price_list .list_box:hover .price_num {
  color: #fe5938;
}

.autochess_dialog.buy_package .price_list .list_box .price_time {
  width: 0.55rem;
}
.autochess_dialog.buy_package .price_list .list_box .price_num {
  width: 0.6rem;
  margin-left: 0.05rem;
}

.game_rule.autochess_dialog .num {
  color: #ff5837;
}
/*游戏记录*/

.history_list {
  .weui-dialog {
    width: 80% !important;
  }
  .h_content {
    width: 96%;
    height: 2.4rem;
    position: relative;
    margin: 0 auto;
    .h_table {
      width: 100%;
    }
    .his_list_load {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      &.no_data {
        background: transparent;
        line-height: 1rem;
      }
      .loading {
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
        width: 0.5rem;
        height: 0.5rem;
        background: url("../../assets/autoChess/icon-loading.png") no-repeat
          center center;
        background-size: contain;
        animation: gogogo 2s infinite linear;
      }
    }
  }
  .h_table {
    width: 96%;
    margin: auto;
    height: 0.24rem;
    box-sizing: border-box;
    .refresh {
      color: #ffe2ce;
    }
    .buy {
      color: #ff5837;
    }
    .sell {
      color: #f0baa4;
    }
    .win_m {
      color: #ff5837 !important;
    }
    .lose_m {
      color: #cc3b1e !important;
    }
    &.h_head {
      margin-top: 0.15rem;
      color: #fff;
      em {
        color: #fff;
      }
    }
    > div {
      box-sizing: border-box;
      font-size: 0.12rem;
      line-height: 0.24rem;
      border-right: 1px solid #5c514a;
      border-bottom: 1px solid #5c514a;
      float: left;
      &:last-child {
        border-right: 0px;
      }
      &:nth-child(1),
      &:nth-child(3) {
        width: 20%;
      }
      &:nth-child(2),
      &:nth-child(4) {
        width: 15%;
      }
      &:nth-child(5) {
        width: 30%;
      }
      &:nth-child(2) {
        color: #ff5837;
      }
    }
    .con_hero_list {
      width: 1.4rem;
      display: inline-block;
      border-bottom: 1px solid #5c514a;
      .h_hero_box {
        width: 100%;
        position: relative;
        text-align: left;
        .h_img {
          width: 0.15rem;
          height: 0.15rem;
          margin: 0 0.06rem 0 0.15rem;
          position: relative;
          display: inline-block;
          vertical-align: middle;
          img {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            max-width: 100%;
            max-height: 100%;
          }
        }
        .h_star_box {
          position: absolute;
          right: 0.05rem;
          top: 50%;
          transform: translateY(-50%);
          .h_star {
            float: left;
            height: 0.11rem;
            width: 0.11rem;
            background: url("../../assets/autoChess/star.png") no-repeat;
            background-position: center center;
            background-size: 100% auto;
            margin: 0 0.01rem;
          }
          span {
            line-height: 0.24rem;
          }
        }
      }
    }
  }
}
/*资源加载loading*/
#index_load_page {
  z-index: 5001;
  display: block;
  opacity: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
#index_load_page .page_center {
  height: 1.3rem;
  font-size: 0.18rem;
  color: #ffe2ce;
  text-align: center;
}
#index_load_page .page_center .img_box {
  height: 0.8rem;
  margin-bottom: 0.1rem;
  overflow: hidden;
}
#index_load_page .page_center .img_box img {
  height: 100%;
  animation: gogogo 2s infinite linear;
}

@keyframes gogogo {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.enter_guide {
  display: inline-block;
  font-size: 0.18rem;
  padding: 0.05rem 0.16rem;
  border: 0.01rem solid #ffe2ce;
  background-color: #000;
  margin-top: 0.25rem;
  cursor: pointer;
}
</style>
<style lang="less">
.vux-popover.level_select_popover {
  margin-top: -0.03rem;
  background: url("../../assets/autoChess/level_list_bg.png") no-repeat center;
  background-size: 100% 100%;
  border-radius: 0;
}
.level_select_popover .vux-popover-arrow {
  display: none;
}
.game_rule.autochess_dialog .weui-dialog {
  max-width: 100%;
  width: 6rem;
  height: 80%;
  background: url("../../assets/autoChess/game_rule_dialog_bg.png") no-repeat
    center;
  background-size: 100% 100%;
  box-sizing: border-box;
  color: #ffe2ce;
  font-size: 0.12rem;
  padding: 0.05rem;
  border-radius: 0;
  display: block;
  z-index: 1999;
}
.buy_package.autochess_dialog .weui-dialog {
  width: 2.4rem;
  height: 2.2rem;
  max-width: 100%;
  background: url("../../assets/autoChess/package_dialog_bg.png") no-repeat
    center;
  background-size: 100% 100%;
  padding: 0.2rem;
  overflow: visible;
  box-sizing: border-box;
  border-radius: 0;
  display: block;
  z-index: 1999;
}
.auto_chess {
  .history_list {
    .ivu-page {
      position: absolute;
      bottom: 0.2rem;
      left: 50%;
      transform: translateX(-50%);
    }
    .ivu-page-item a {
      font-size: 0.1rem;
    }
    .ivu-page-item-jump-next,
    .ivu-page-item-jump-prev,
    .ivu-page-next,
    .ivu-page-prev,
    .ivu-page-item-active,
    .ivu-page-item {
      border: none !important;
    }
    .ivu-page a {
      color: #ffe2ce;
    }
    .ivu-page-item.ivu-page-item-active a {
      color: #de4d31 !important;
    }
    .ivu-page-item-jump-next:after,
    .ivu-page-item-jump-prev:after {
      font-size: 0.07rem;
      color: #ffe2ce;
    }
    .ivu-page-prev a i,
    .ivu-page-next a i,
    .ivu-page-item-jump-next a i.ivu-icon-ios-arrow-forward,
    .ivu-page-item-jump-prev a i.ivu-icon-ios-arrow-back {
      width: 0.08rem;
      height: 0.14rem;
      background: url("../../assets/autoChess/btn_page_normal.png") no-repeat;
      background-size: contain;
    }
    .ivu-page-prev a i,
    .ivu-page-item-jump-prev a i.ivu-icon-ios-arrow-back {
      transform: rotateY(180deg);
    }
    .ivu-page-disabled a i {
      background: url("../../assets/autoChess/btn_page_disabled.png") no-repeat
        center center;
    }
  }
}
.intro_mask {
  opacity: 0.6 !important;
}
</style>
