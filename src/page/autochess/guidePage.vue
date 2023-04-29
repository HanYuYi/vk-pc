<template>
  <div class="auto_chess_guide">
    <div id="game_main">
      <div class="game_top">
        <router-link to="/" class="login_out_btn"></router-link>
        <div class="top_title"><img src="../../assets/autoChess/top_title.png" alt=""></div>
        <div class="user_info" v-if="isLogin">
          <!--<div class="user_name ellipsis">{{userName}}</div>-->
          <div class="user_money_box">
            <div class="money_icon"></div>
            <span class="num"><countup :end-val="egMoney" :duration="2" :decimals="2" :start="startCount"></countup></span>
          </div>
        </div>
        <div class="game_info">
          <!--<div class="heroes btn_box"></div>-->
          <div class="game_rule btn_box" @click="showGameRule=true"></div>
        </div>
      </div>
      <div class="game_content">
        <div class="section hero_market">
          <div class="section_title"><img src="../../assets/autoChess/market_title.png" alt=""><div class="marker_countdown_box" v-if="marketHeroCoundown"><span>{{marketHeroCoundown}}</span></div></div>
          <div class="section_top">
            <div class="buy_mode">
              <div class="mode_box"  v-intro="'选择“快购模式”试试'" v-intro-step="4"
                   v-for="item in modeList" :key="item.id"
                   :class="[{'selected': item.id == currentMode}, item.name]"
                   @click="handleSelectMode(item)">
              </div>
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
          <div class="section_main" v-intro="'没有刷到同样的1星英雄，再“刷新”试试'" v-intro-step="8">
            <div class="hero_list" v-show="marketHeroesList.length == 0" >
              <div class="hero_box" v-for="n in 5">
                <div class="box_top"></div>
                <div class="hero_name_price"></div>
              </div>
            </div>
            <div class="hero_list"  v-if="marketHeroesList.length > 0 "  v-intro="'点击收集第三个1星英雄'" v-intro-step="9">
              <div class="hero_box"  v-intro="'点击购买1星英雄影魔'" v-intro-step="1"
                   :class="[{'hide_zIndex': heroItem.buyAnimate}]" v-if="index==0"
                   v-for="(heroItem, index) in marketHeroesList" :key="index"
                   @click="handleHeroSelect(1, heroItem, 1)">
                <div class="box_top" :class="'hero_lv'+heroItem.level">
                  <div class="selected_mask" :class="'g_hero_seleced_svga_img_'+index" v-show="heroItem.selected" ></div>
                  <div class="spark_fly_ani" v-show="heroItem.selected">
                    <div class="spark_box" v-for="(spark, i) in sparksList" :style="{left: spark.left, animationDelay: spark.delay}" :class="spark.className + spark.imgurl" :key="i"></div>
                  </div>
                  <div class="img_box">
                    <img :src="heroItem.picture" alt="" v-if="heroItem.card_id && !heroItem.buyAnimate">
                  </div>
                  <div class="selected_mask_top_layer" v-show="heroItem.selected"></div>
                  <div class="star_box" v-show="heroItem.star>0&&heroItem.card_id&& !heroItem.buyAnimate">
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
              </div>
              <div class="hero_box"  v-intro="'点击英雄'" v-intro-step="5"
                   :class="[{'hide_zIndex': heroItem.buyAnimate}]" v-if="index==1"
                   v-for="(heroItem, index) in marketHeroesList" :key="index"
                   @click="handleHeroSelect(1, heroItem, 5)">
                <div class="box_top" :class="'hero_lv'+heroItem.level">
                  <div class="selected_mask" :class="'g_hero_seleced_svga_img_'+index" v-show="heroItem.selected" ></div>
                  <div class="spark_fly_ani" v-show="heroItem.selected">
                    <div class="spark_box" v-for="(spark, i) in sparksList" :style="{left: spark.left, animationDelay: spark.delay}" :class="spark.className + spark.imgurl" :key="i"></div>
                  </div>
                  <div class="img_box">
                    <img :src="heroItem.picture" alt="" v-if="heroItem.card_id && !heroItem.buyAnimate">
                  </div>
                  <div class="selected_mask_top_layer" v-show="heroItem.selected"></div>
                  <div class="star_box" v-show="heroItem.star>0&&heroItem.card_id">
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
              </div>
              <div class="hero_box"
                   :class="[{'hide_zIndex': heroItem.buyAnimate}]" v-if="index>1"
                   v-for="(heroItem, index) in marketHeroesList" :key="index"
                   @click="handleHeroSelect(1, heroItem, 5)">
                <div class="box_top" :class="'hero_lv'+heroItem.level">
                  <div class="selected_mask" :class="'g_hero_seleced_svga_img_'+index" v-show="heroItem.selected" ></div>
                  <div class="spark_fly_ani" v-show="heroItem.selected">
                    <div class="spark_box" v-for="(spark, i) in sparksList" :style="{left: spark.left, animationDelay: spark.delay}" :class="spark.className + spark.imgurl" :key="i"></div>
                  </div>
                  <div class="img_box">
                    <img :src="heroItem.picture" alt="" v-if="heroItem.card_id && !heroItem.buyAnimate">
                  </div>
                  <div class="selected_mask_top_layer" v-show="heroItem.selected"></div>
                  <div class="star_box" v-show="heroItem.star>0&&heroItem.card_id">
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
              </div>
            </div>
            <div class="refresh_box" v-intro="'点击“刷新”按钮试着集齐第三个1星英雄'" v-intro-step="7">
              <div class="refresh_btn"
                   :class="[{'refresh': loadMarketHeroFlag}]" @click="reLoadMarketHero">
                <div class="btn_wrapper"></div>
              </div>
              <div class="level_price">{{currentLevel.levelMoney}}/次</div>
            </div>
          </div>
          <div class="section_btn buy canBuy"  v-intro="'点击“购买”按钮'" v-intro-step="2"
               v-show="currentMode == 1" @click="handleBuyHero(0, 1)">
            <span class="defalut" v-show="!canBuy"></span>
            <span class="normal" v-show="canBuy"></span>
          </div>
        </div>
        <div class="section user_hero_package"  v-intro="'选中该2星英雄'" v-intro-step="11">
          <div class="section_title"><img src="../../assets/autoChess/package_title.png" alt=""></div>
          <div class="section_main" v-intro="'三个1星英雄自动合成一个2星英雄, 选中该2星英雄'" v-intro-step="10">
            <div  class="hero_list" id="package_hero_list" v-intro="'您目前拥有两个1星英雄'" v-intro-step="6">
              <div class="hero_box"
                   v-if="index == 0" v-intro="'您已拥有一个1星英雄'" v-intro-step="3"
                   v-for="(heroItem, index) in packageHeroesList"
                   :class="[{'hide_zIndex': heroItem.compoundAnimate, 'drag_handle': heroItem.card_id&&!heroItem.is_lock}]"
                   @click="handleHeroSelect(2, heroItem)">
                <div class="box_top" :class="'hero_index_'+heroItem.cardIndex + ' hero_lv'+heroItem.level">
                  <div class="selected_mask" :class="'g_package_g_hero_seleced_svga_img_'+index" v-show="heroItem.selected"></div>
                  <div class="spark_fly_ani" v-show="heroItem.selected">
                    <div class="spark_box" v-for="(spark, i) in sparksList" :style="{left: spark.left, animationDelay: spark.delay}" :class="spark.className + spark.imgurl" :key="i"></div>
                  </div>
                  <div class="img_box" v-if="heroItem.card_id != 0 && !heroItem.compoundAnimate">
                    <img :src="heroItem.picture" alt="" class="hero_img" :class="'hero_pic_index_'+heroItem.cardIndex">
                  </div>
                  <div class="selected_mask_top_layer" v-show="heroItem.selected"></div>
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
                  <div class="hero_name ellipsis" :style="{color: heroItem.color}" :title="heroItem.name">{{heroItem.name}}</div>
                </div>
                <img src="../../assets/autoChess/icon-money.png" alt="" class="sold_animate_img" :class="['sold_package_hero_id_'+heroItem.cardIndex]">
              </div>
              <div class="hero_box"
                   v-if="index > 0"
                   v-for="(heroItem, index) in packageHeroesList" :key="index"
                   :class="[{'hide_zIndex': heroItem.compoundAnimate, 'drag_handle': heroItem.card_id&&!heroItem.is_lock}]"
                   @click="handleHeroSelect(2, heroItem)">
                <div class="box_top" :class="'hero_index_'+heroItem.cardIndex + ' hero_lv'+heroItem.level">
                  <div class="selected_mask" :class="'g_package_g_hero_seleced_svga_img_'+index" v-show="heroItem.selected"></div>
                  <div class="spark_fly_ani" v-show="heroItem.selected">
                    <div class="spark_box" v-for="(spark, i) in sparksList" :style="{left: spark.left, animationDelay: spark.delay}" :class="spark.className + spark.imgurl" :key="i"></div>
                  </div>
                  <div class="img_box" v-if="heroItem.card_id != 0 && !heroItem.compoundAnimate">
                    <img :src="heroItem.picture" alt="" class="hero_img" :class="'hero_pic_index_'+heroItem.cardIndex">
                  </div>
                  <div class="selected_mask_top_layer" v-show="heroItem.selected"></div>
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
                  <!-- <div class="hero_name ellipsis" :style="{color: heroItem.color}" :title="heroItem.name">{{heroItem.name}}</div> -->
                </div>
                <img src="../../assets/autoChess/icon-money.png" alt="" class="sold_animate_img" :class="['sold_package_hero_id_'+heroItem.cardIndex]">
              </div>
            </div>
          </div>
          <div class="section_btn sold"  @click="handleSoldHero()" v-intro="'出售该2星英雄'" v-intro-step="12">
            <span class="defalut" v-show="!canSold"></span>
            <span class="normal" v-show="canSold"></span>
          </div>
        </div>
      </div>
    </div>

    <div class="guide_mask" v-show="guideMask">
      <div class="title">
        新手教程
      </div>
      <div class="guide_intro">
        <p> 亲爱的用户，欢迎您来到威客自走棋游戏。本游戏是威客首创的英雄集卡类游戏。您可以从市场收集购买英雄，通过售出升级后的英雄来赚取差价。</p>
        <p>话不多说，让我们先通过教程简单学习下玩法吧~</p>
      </div>
      <div class="enter_guide_btn">
        <span @click="handleEnterGuide()">进入教程</span>
      </div>
    </div>
    <div class="intro_mask" v-show="introShow">
      <div class="sold_result" v-show="guideRsultShow">
        <div class="result_title">该英雄买卖赚得<i class="win">52元</i></div>
        <div class="result_table">
          <div class="t_row">
            <div class="t_td">
              购买3个英雄成本
            </div>
            <div class="t_td win">
              30元
            </div>
          </div>
          <div class="t_row">
            <div class="t_td">
              刷新2次商店成本
            </div>
            <div class="t_td win">
              8元
            </div>
          </div>
          <div class="t_row">
            <div class="t_td">
              英雄售出价格
            </div>
            <div class="t_td win">
              90元
            </div>
          </div>
          <div class="t_row">
            <div class="t_td">
              净利润
            </div>
            <div class="t_td win">
              52元
            </div>
          </div>
        </div>
        <div class="btn_box">
          <!--<div class="play_agin mask_btn" @click="handlePlayGuideAgin()">再试玩一次</div>-->
          <div class="play_now mask_btn" @click="handleCloseGuide()">懂了，立即游戏！</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import { Popover, XDialog, Countup } from 'vux'
  import { formatCountTime, formatNumberFloatPad, getViewPort, getElementOffset } from '../../utils/util'
  import { mapState } from 'vuex'
  import  Velocity from 'velocity-animate'
  import 'velocity-animate/velocity.ui.js'
  // const SVGA = require('svgaplayerweb/build/svga.min.js');
  export default {
    name: 'autochessindex',
    components: {
      Popover,
      XDialog,
      Countup
    },
    created() {
      this.hero1Src = require("../../assets/autoChess/hero1.png")
      this.hero2Src = require("../../assets/autoChess/hero2.png")
      this.hero3Src = require("../../assets/autoChess/hero3.png")
      this.hero4Src = require("../../assets/autoChess/hero4.png")
      this.hero5Src = require("../../assets/autoChess/hero5.png")
      this.hero6Src = require("../../assets/autoChess/hero6.png")
    },
    mounted () {
      Velocity.RegisterUI("callout.pulse", {
        defaultDuration: 200,
        calls: [
          [ { scale: 1.6 }, 0.50 ],
          [ { scale: 1 }, 0.50 ]
        ]
      });
      Velocity.RegisterUI("callout.bounce", {
        defaultDuration: 300,
        calls: [
          [{translateY: -8}, 0.25],
          [{translateY: 0}, 0.125],
          [{translateY: -8}, 0.125],
          [{translateY: 0}, 0.25]
        ]
      });
      this.loadGameInitData()
      this.generateSnowflakes()
      this.intro = this.$intro()
    },
    computed: {
      ...mapState(["isLogin"]),
    },
    watch: {
      count: function(val) {
        if (val === this.imglength) {
          this.sourceLoad = false
        }
      }
    },
    data() {
      return {
        hero1Src: '',
        hero2Src: '',
        hero3Src: '',
        hero4Src: '',
        hero5Src: '',
        introShow: false,
        guideRsultShow: false,
        intro: {},
        currentGuideStep: 1,
        guideMask: true,
        options: {
          handle: '.drag_handle',
          filter: '.disabled',
          swap: true
        },
        modeList: [
          {
            id: 1,
            name: 'normal'
          },
          {
            id: 2,
            name: 'fast'
          }
        ],
        levelList: [
           {
             level: 1,
             levelMoney: '￥4'
           },
           {
             level: 2,
             levelMoney: '￥20'
           },
           {
             level: 3,
             levelMoney: '￥100'
           }
        ],
        marketListNum: 5,
        marketHeroesList: [
          {
            carIndex: 1,
            card_id: 57,
            color: "#FFFFFF",
            level: 1,
            name: "影魔",
            picture: "/uploads/20191030/084a860cce8ad18436bde9931bfa5ed5.png",
            price: "1",
            star: 1,
            symbol: "￥",
            selected: false
          },
          {
            carIndex: 2
          },
          {
            carIndex: 3
          },
          {
            carIndex: 4
          },
          {
            carIndex: 5
          }
        ],
        marketSelectedHero: {},
        packageHeroesList: [],
        packageSelectedHero: {},
        currentMode: 1,
        currentLevel: {
          level: 1,
          levelMoney: '￥4'
        },
        canBuy: false,
        canSold: true,
        loadMarketHeroFlag: false,
        sparksList: [],
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
        userName: '',
        currencyInfo: {},
        egMoney: 0,
        buyLoad: false,
        soldLoad: false,
        allHeroLevelPriceList: [],
        animateFlag: false,
        animationDuration: 600,
        marketHeroCoundown: '',
        marketHeroCoundownTimer: null,
        startCount: false,
        oldEgmoney: 0,
        isDragging: false,
        delayedDragging: false
      }
    },
    methods: {
      handleSelectMode (x) {
        if(this.animateFlag){
          return
        }
        this.currentMode = x.id
        if(this.marketHeroesList.length>0){
          this.marketHeroesList.forEach((v, i) => {
            v.selected = false
          })
        }
        this.canBuy = false
        if(this.currentMode == 2){
          let data = {}
          data.cards = {
            '1':{
              symbol: "￥"
            },
            '2': {
              card_id: 57,
              color: "#2b94ff",
              level: 3,
              name: "影魔",
              picture: this.hero1Src,
              price: "10",
              star: 1,
              symbol: "￥"
            },
            '3' : {
              symbol: "￥"
            },
            '4': {
              symbol: "￥"
            },
            '5': {
              symbol: "￥"
            }
          }
          /*处理市场英雄列表*/
          this.initMarketCardList(data)
          this.currentGuideStep = 5
          this.$nextTick(() => {
            this.intro.nextStep()
          })

        }
      },
      handleLevelSelect (x) {
        if(this.animateFlag){
          return
        }
        this.currentLevel = x
      },
      handleHeroSelect (type, item, step) {
        if(this.animateFlag){
          return
        }
        let index = null
        if(type == 2){
          if(item.is_lock){
            if(this.totalBuyPackagePriceList.length == 0){
              return
            }
            this.buyPackageIndex = index*1 + 1
            if(this.buyPackageIndex == 7){
              this.currentBuyPackagePriceList = this.totalBuyPackagePriceList[0]
            }else
            if(this.buyPackageIndex == 8){
              this.currentBuyPackagePriceList = this.totalBuyPackagePriceList[1]
            }
            this.currentBuyPackagePrice = this.currentBuyPackagePriceList[0]
            this.showBuyPackagePrice = true
          }
          if(item.card_id == 0){
            return
          }
          item.selected = !item.selected
          this.canSold = true
          for(let i = 0; i < this.packageHeroesList.length; i++){
            if(this.packageHeroesList[i].selected){
              this.canSold = true
              break
            }
          }
          if(item.selected && this.currentGuideStep == 11){
            this.currentGuideStep = 12
            this.canSold = true
            this.intro.nextStep()
          }
        }else{
          if(!item.card_id){
            return
          }
          index = this.marketHeroesList.indexOf(item)
          if(this.currentMode == 1){
            item.selected = !item.selected
            this.canBuy = false
            for(let i = 0; i < this.marketHeroesList.length; i++){
              if(this.marketHeroesList[i].selected){
                this.canBuy = true
                break
              }
            }
          }else{
            if(this.currentGuideStep == 8){
              return false
            }
            if(this.currentGuideStep == 9){
              if(!item.selected){
                return
              }
            }
            this.handleBuyHero(item.cardIndex)
          }
          if(step == 1 && this.currentGuideStep == 1){
            this.intro.goToStep(2)
            this.currentGuideStep = 2
          }
        }
      },
      reLoadMarketHero () {
        if(this.animateFlag){
          return
        }
        if(this.loadMarketHeroFlag){
          return
        }
        if(!this.currentLevel.level){
          return
        }
        this.loadMarketHeroFlag = true
        this.marketHeroesList = []
        setTimeout(() => {
          this.loadMarketHeroFlag = false
        }, 610)
        this.canBuy = false
        let data = {}
        if(this.currentGuideStep == 7){
          data.cards = {
            '1':{
              card_id: 57,
              color: "#FFFFFF",
              level: 1,
              name: "赏金猎人",
              picture: this.hero6Src,
              price: "2",
              star: 1,
              symbol: "￥"
            },
            '2': {
              card_id: 55,
              color: "#3add1f",
              level: 2,
              name: "痛苦女王",
              picture: this.hero5Src,
              price: "2.5",
              star: 1,
              symbol: "￥"
            },
            '3' : {
              card_id: 53,
              color: "#FFFFFF",
              level: 1,
              name: "暗影萨满",
              picture: this.hero4Src,
              price: "2",
              star: 1,
              symbol: "￥"
            },
            '4': {
              card_id: 50,
              color: "#FFFFFF",
              level: 1,
              name: "斧王",
              picture: this.hero2Src,
              price: "2",
              star: 1,
              symbol: "￥"
            },
            '5': {
              card_id: 36,
              color: "#FFFFFF",
              level: 1,
              name: "魅惑魔女",
              picture: this.hero3Src,
              price: "2",
              star: 1,
              symbol: "￥"
            }
          }
        }
        if(this.currentGuideStep == 8){
          data.cards = {
            '1':{
              card_id: 36,
              color: "#FFFFFF",
              level: 1,
              name: "魅惑魔女",
              picture: this.hero3Src,
              price: "2",
              star: 1,
              symbol: "￥"
            },
            '2': {
              card_id: 53,
              color: "#FFFFFF",
              level: 1,
              name: "暗影萨满",
              picture: this.hero4Src,
              price: "2",
              star: 1,
              symbol: "￥"
            },
            '3' : {
              card_id: 55,
              color: "#2b94ff",
              level: 3,
              name: "影魔",
              picture: this.hero1Src,
              price: "10",
              star: 1,
              symbol: "￥",
              selected: true
            },
            '4': {
              card_id: 57,
              color: "#FFFFFF",
              level: 1,
              name: "赏金猎人",
              picture: this.hero6Src,
              price: "2",
              star: 1,
              symbol: "￥"
            },
            '5': {
              card_id: 36,
              color: "#FFFFFF",
              level: 1,
              name: "魅惑魔女",
              picture: this.hero3Src,
              price: "2",
              star: 1,
              symbol: "￥"
            }
          }
        }

        /*处理市场英雄列表*/
        this.initMarketCardList(data)

      },
      loadSvga(selector, url){
        var player = new SVGA.Player(selector);
        var parser = new SVGA.Parser(selector);
        parser.load(url, videoItem => {
          player.setVideoItem(videoItem);
          player.startAnimation();
        })
      },
      initSvgaPlayer(type){
        let svgaImgs = []
        if(type == 1){
          for(let i = 0; i<this.marketHeroesList.length; i++){
            svgaImgs.push({
              selector: ".g_hero_seleced_svga_img_"+i
            })
          }
        }
        if(type == 2){
          for(let i = 0; i<this.packageHeroesList.length; i++){
            svgaImgs.push({
              selector: ".g_package_g_hero_seleced_svga_img_"+i
            })
          }
        }
        let src = require("../../assets/autoChess/hero_selected.svga");
        svgaImgs.forEach(item=> this.loadSvga(item.selector, src));
      },
      //动画
      getAbsoluteRandom (cache, base){
        var random = parseInt(Math.random() * base);
        if(cache[random]){
          return this.getAbsoluteRandom(cache, base);
        }else{
          cache[random] = 1;
          return random;
        }
      },
      generateSnowflakes () {
        this.sparksList = []
        let _this =  this
        for(let i = 0; i < 10; i++){
          let random = Math.random();
          _this.sparksList.push({
            className: "snowflake"+i ,
            left: _this.getAbsoluteRandom({}, 100) + "%",
            delay: parseInt(Math.random() * 3000) + "ms," + parseInt(random*3) + "s",
            imgurl: " spark"+ (Math.floor(Math.random()*2)+1)
          })
        }
      },
      leaveTimeCountDown (data, type) {
        if(type){
          clearInterval(this.marketHeroCoundownTimer)
          this.marketHeroCoundown = formatCountTime(data.duration, 2)
          this.marketHeroCoundownTimer = setInterval(() => {
            data.duration--
            this.marketHeroCoundown = formatCountTime(data.duration, 2)
            if(data.duration < 0){
              clearInterval(this.marketHeroCoundownTimer)
              this.marketHeroCoundown = ''
              this.marketHeroesList.forEach((v, i) => {
                v = Object.assign(v, {card_id: null, picture: '', name: '', selected: false, level: 0})
              })
            }
          }, 1000)
        }else{
          clearInterval(data.timer)
          data.countDownTime = formatCountTime(data.duration)
          data.timer = setInterval(() => {
            data.duration --
            data.countDownTime = formatCountTime(data.duration)
            if(data.duration < 0){
              clearInterval(data.timer)
              data.duration = 0
              data.is_lock = 1
            }
          }, 1000)
          return data
        }
      },
      loadGameInitData () {
        let data = {}
        data.duration = 123
        data.cards = {
          '1':{
            card_id: 55,
            color: "#2b94ff",
            level: 3,
            name: "影魔",
            picture: this.hero1Src,
            price: "10",
            star: 1,
            symbol: "￥"
          },
          '2': {
            symbol: "￥"
          },
          '3' : {
            symbol: "￥"
          },
          '4': {
            symbol: "￥"
          },
          '5': {
            symbol: "￥"
          }
        }
        /*处理市场英雄列表*/
        this.initMarketCardList(data)

        /*处理用户背包*/
        let backpack = {
          1:{
            card_id: 0,
            symbol: "￥"
          },
          2: {
            card_id: 0,
            symbol: "￥"
          },
          3: {
            card_id: 0,
            symbol: "￥"
          },
          4: {
            card_id: 0,
            symbol: "￥"
          },
          5: {
            card_id: 0,
            symbol: "￥"
          },
          6: {
            card_id: 0,
            symbol: "￥"
          },
          7: {
            card_id: 0,
            symbol: "￥",
            is_lock: 1
          },
          8: {
            card_id: 0,
            symbol: "￥",
            is_lock: 1
          }
        }
        if(!this.$parent.totalBuyPackagePriceList.length) {
          backpack[7].is_lock = 0;
          backpack[8].is_lock = 0;
        }
         this.initPackageCardList(backpack)

      },
      handleBuyPackagePriceSelect (x) {
        this.currentBuyPackagePrice = x
      },
      handleBuyHero (x, step) {
        if(this.animateFlag){
          return
        }
        if(this.buyLoad){
          return
        }
        if(this.currentMode == 1&&!this.canBuy){
          return
        }
        this.buyLoad = true
        let str = ''
        if(x){
          str = x+''
        }else{
          let arr = []
          this.marketHeroesList.forEach((v, i) => {
            if(v.selected){
              arr.push(v.cardIndex)
            }
          })
          if(arr.length>0){
            str = arr.join(',')
          }
        }
        this.buyLoad = false
        let data = {
          events: {}
        }
        if(step == 1 && this.currentGuideStep == 2){
          data.events.add = [
            {
              old_data: {
                card_id: 55,
                color: "#2b94ff",
                level: 3,
                name: "影魔",
                picture: this.hero1Src,
                price: "10",
                star: 1,
                symbol: "￥",
                num: 1
              },
              new_data: {
                num: 1,
                card_id: 55,
                color: "#2b94ff",
                level: 3,
                name: "影魔",
                picture: this.hero1Src,
                price: "5",
                star: 1,
                symbol: "￥"
              }
            }
          ]
          data.events.compound = []
        }
        if(this.currentGuideStep == 5){
          data.events.add = [
            {
              old_data: {
                card_id: 55,
                color: "#2b94ff",
                level: 3,
                name: "影魔",
                picture: this.hero1Src,
                price: "10",
                star: 1,
                symbol: "￥",
                num: 2
              },
              new_data: {
                num: 2,
                card_id: 55,
                color: "#2b94ff",
                level: 3,
                name: "影魔",
                picture: this.hero1Src,
                price: "5",
                star: 1,
                symbol: "￥"
              }
            }
          ]
          data.events.compound = []
        }
        if(this.currentGuideStep == 9){
          data.events.add = [
            {
              old_data: {
                card_id: 55,
                color: "#2b94ff",
                level: 3,
                name: "影魔",
                picture: this.hero1Src,
                price: "10",
                star: 1,
                symbol: "￥",
                num: 3
              },
              new_data: {
                num: 3,
                card_id: 55,
                color: "#2b94ff",
                level: 3,
                name: "影魔",
                picture: this.hero1Src,
                price: "5",
                star: 1,
                symbol: "￥"
              }
            }
          ]
          data.events.compound = [{
            old_data:[
              {
                card_id: 55,
                color: "#2b94ff",
                level: 3,
                name: "影魔",
                picture: this.hero1Src,
                price: "5",
                star: 1,
                symbol: "￥",
                num: 1
              },
              {
                card_id: 55,
                color: "#2b94ff",
                level: 3,
                name: "影魔",
                picture: this.hero1Src,
                price: "5",
                star: 1,
                symbol: "￥",
                num: 2
              },
              {
                card_id: 55,
                color: "#2b94ff",
                level: 3,
                name: "影魔",
                picture: this.hero1Src,
                price: "5",
                star: 1,
                symbol: "￥",
                num: 3
              }
            ],
            new_data: {
              num: 1,
              card_id: 55,
              color: "#2b94ff",
              level: 3,
              name: "影魔",
              picture: this.hero1Src,
              price: "90",
              star: 2,
              symbol: "￥"
            }
          }]
        }
        this.buyAfterAnimate(data, step)
      },
      handleSoldHero () {
        if(this.animateFlag){
          return
        }
        if(this.soldLoad){
          return
        }
        if(!this.canSold){
          return
        }
        this.soldLoad = true
        let str = ''
        let arr = []
        let soldAnimateData = []
        this.packageHeroesList.forEach((v, i) => {
          if(v.selected){
            arr.push(v.cardIndex)
            soldAnimateData.push(v)
          }
        })
        if(arr.length>0){
          str = arr.join(',')
        }
        this.soldLoad = false
        this.doSoldAnimate(soldAnimateData)
       /* this.$http(this.ApiSetting.autoChess.sellChessCards, {pack_num_str: str})
          .then((res) => {
            this.soldLoad = false
            if(res.status === 1){
              this.doSoldAnimate(soldAnimateData, res.data.backpack)
            }
          }, (err) => {
            this.soldLoad = false
          })*/
      },
      initPackageCardList (data) {
        /*处理用户背包*/
        this.packageHeroesList = []
        let arr = []
        for (let k in data) {
          data[k].selected = false
          data[k].compoundAnimate = false
          data[k].soldAnimate = false
          data[k].cardIndex = k
          if(data[k].duration>0){
            this.leaveTimeCountDown(data[k])
          }
          arr.push(data[k])
        }
        this.packageHeroesList = arr
        this.$nextTick(() => {
          this.initSvgaPlayer(2)
        })
      },
      initMarketCardList (data) {
        /*处理市场英雄列表*/
        this.marketHeroesList = []
        let arr = []
        let obj = data.cards
        for(let k in obj){
          obj[k].selected = obj[k].selected ? obj[k].selected : false
          obj[k].buyAnimate = false
          obj[k].cardIndex = k
          arr.push(obj[k])
        }
        this.marketHeroesList = arr
        if(data.duration){
          this.leaveTimeCountDown(data, 1)
        }
        this.$nextTick(() => {
          this.initSvgaPlayer(1)
        })
        if(this.currentGuideStep == 7){
          this.currentGuideStep = 8
          this.intro.nextStep()
        }else if(this.currentGuideStep == 8){
          this.currentGuideStep = 9
          this.intro.nextStep()
        }

      },
      /*购买完动画处理*/
      buyAfterAnimate (data, step) {
        let _this =  this
        this.canBuy = false
          let len = data.events.add.length
          data.events.add.forEach((v, i) => {
            this.animateFlag = true
            let formClassName = '.market_hero_id_'+v.old_data.num
            let toClassName = '.hero_index_'+v.new_data.num
            let formEl = document.querySelector(formClassName)
            formEl.style.cssText="display:block;"
            let toEl = document.querySelector(toClassName)
            let fromPositon = getElementOffset(formEl)
            let toPositon = getElementOffset(toEl)
            this.marketHeroesList.forEach((j, k) => {
              if(j.cardIndex == v.old_data.num){
                j.buyAnimate = true
                j.selected = false
              }
            })
            Velocity(formEl, { left: toPositon.left - fromPositon.left + 'px', top: toPositon.top - fromPositon.top + 'px' }, { duration: _this.animationDuration, display: "none",
              begin: function(elements){
                elements[0].style.cssText="display:block;"
              },
              complete: function () {
                _this.packageHeroesList.forEach((x, y) => {
                  if(x.cardIndex == v.new_data.num){
                    v.new_data.compoundAnimate = false
                    x = Object.assign(x, v.new_data)
                  }
                })
                _this.marketHeroesList.forEach((j, k) => {
                  if(j.cardIndex == v.old_data.num){
                    _this.marketHeroesList.splice(k,1,{cardIndex: v.old_data.num})
                  }
                })
                formEl.removeAttribute("style")
                _this.animateFlag = false
                len--
                if(_this.currentGuideStep == 5){
                  _this.$nextTick(() => {
                    _this.intro.nextStep()
                    _this.currentGuideStep = 6
                    setTimeout(() => {
                      _this.currentGuideStep = 7
                      _this.intro.nextStep()
                    }, 2200)
                  })
                }
                if(len==0){
                  if(step == 1 && _this.currentGuideStep == 2){
                    _this.currentGuideStep = 3
                    _this.$nextTick(() => {
                      _this.intro.nextStep()
                    })
                    setTimeout(() => {
                      _this.currentGuideStep = 4
                      _this.intro.nextStep()
                    }, 2200)
                  }
                  if(data.events.compound.length>0){
                    if(!_this.animateFlag){
                      _this.animateFlag = true
                      let firstComPound = data.events.compound[0]
                      let secondComPound = data.events.compound.length>1 ? data.events.compound[1] : false
                      let thirdComPound = data.events.compound.length>2 ? data.events.compound[2] : false
                      if(thirdComPound){
                        _this.doCompoundAnimate(firstComPound, secondComPound, thirdComPound)
                      }else if(secondComPound){
                        _this.doCompoundAnimate(firstComPound, secondComPound)
                      }else{
                        _this.doCompoundAnimate(firstComPound)
                      }
                    }
                  }
                }
              } })
          })

      },
      doCompoundAnimate (data1, data2, data3) {
        let _this = this
        let oldArr = []
        let data = data1
        data.old_data.forEach((v, i) => {
          if(v.num != data.new_data.num){
            oldArr.push(v)
          }
        })
      oldArr.forEach((v, i) => {
        this.animateFlag = true
        let formClassName = '.package_hero_id_'+v.num
        let toClassName = '.hero_index_'+data.new_data.num
        let ToPriceClassName = '.hero_price_index_'+data.new_data.num
        let ToStarClassName = '.hero_star_index_'+data.new_data.num
        let formEl = document.querySelector(formClassName)
        let toEl = document.querySelector(toClassName)
        formEl.style.cssText="display:block;"
        let fromPositon = getElementOffset(formEl)
        let toPositon = getElementOffset(toEl)
        let _delay = this.animationDuration + 100
        this.packageHeroesList.forEach((a, b) => {
          if(a.cardIndex == v.num){
            a = Object.assign(a,{compoundAnimate: true})
          }
        })
        Velocity(formEl, { left: toPositon.left - fromPositon.left + 'px', top: toPositon.top - fromPositon.top + 'px' },
          { duration: this.animationDuration, display: "none", delay: _delay,
            complete: function () {
              formEl.removeAttribute("style")
              _this.packageHeroesList.forEach((x, y) => {
                if(x.cardIndex == v.num){
                  _this.packageHeroesList.splice(y,1,{card_id: 0, cardIndex: x.cardIndex})
                }
                if(x.cardIndex == data.new_data.num){
                  x = Object.assign(x, data.new_data)
                }
                x.compoundAnimate = false
              })
              if(oldArr.length - 1 == i){
                _this.$nextTick(() => {
                  _this.currentGuideStep = 10
                  _this.intro.nextStep()
                  _this.animateFlag = false

                    _this.currentGuideStep = 11
                    _this.intro.nextStep()

                  let toPriceEl = document.querySelector(ToPriceClassName)
                  let imgEl = toEl.getElementsByClassName('hero_img')
                  let starEl = document.querySelector(ToStarClassName)
                  let moneyEl = toPriceEl.getElementsByClassName('hero_price')
                  Velocity(imgEl, 'callout.pulse', {delay: 100 , complete: function () {
                    Velocity(starEl, 'callout.pulse', { delay: 50 , complete: function () {
                      Velocity(moneyEl, 'callout.pulse', { delay: 50 , complete: function () {
                        _this.animateFlag = false
                          if(data2 && data3){
                            _this.doCompoundAnimate(data2, data3)
                          }else if(data2){
                            _this.doCompoundAnimate(data2)
                          }
                        }})
                      }})
                    }})
                  })
                }
              } })
        })

      },
      doSoldAnimate (animatedata, initdata) {
        let toEl = document.querySelector(".money_icon")
        let toElWidth = window.getComputedStyle(toEl).width
        let toElHeight = window.getComputedStyle(toEl).height
        animatedata.forEach((v, i) => {
          this.animateFlag = true
          let formClassName = '.sold_package_hero_id_'+v.cardIndex
          let fromHeroPicClassName = '.hero_pic_index_'+v.cardIndex
          let formEl = document.querySelector(formClassName)
          let formHeroPicEl = document.querySelector(fromHeroPicClassName)
          let _this = this
          Velocity(formHeroPicEl, {scaleX: 0.1, scaleY: 0.1}, {duration: 600, display: "none", complete: function (){
            formEl.style.cssText="display:block;"
            let fromElWidth = window.getComputedStyle(formEl).width
            let fromElHeight = window.getComputedStyle(formEl).height
            let fromPositon = getElementOffset(formEl)
            let toPositon = getElementOffset(toEl)
            Velocity(formEl, 'callout.bounce', {duration: 1000, complete: function (){
              _this.packageHeroesList.forEach((x, y) => {
                if(x.cardIndex == v.cardIndex){
                  x = Object.assign(x, {card_id: 0, cardIndex: x.cardIndex, picture: '', name: '', level: 0, selected: false})
                }
              })
              Velocity(formEl, { left: toPositon.left - fromPositon.left + (parseInt(fromElWidth)-parseInt(toElWidth)) + (parseInt(fromElWidth)-parseInt(toElWidth))/2 - 1 + 'px', top: toPositon.top - fromPositon.top + (parseInt(fromElWidth)-parseInt(toElWidth)) + (parseInt(fromElWidth)-parseInt(toElWidth))/2 + 2 + 'px' , width: toElWidth, height: toElWidth},
                { duration: 600, display: "none", delay: 200,
                  complete: function () {
                    formEl.removeAttribute("style")
                    if(animatedata.length-1 == i){
                      _this.animateFlag = false
                      _this.canSold = true
                      _this.finishUserGuide()
                      _this.intro.exit()
                      _this.guideRsultShow = true
                    }
                  }
                })
            }})
          }})
        })

      },
      handleEnterGuide () {
        this.guideMask = false
        this.intro.start()
        this.introShow = true
      },
      handlePlayGuideAgin () {
        this.guideRsultShow = false
        this.guideMask = false
        this.introShow = true
        this.currentGuideStep = 1
        this.currentMode = 1
        this.loadGameInitData()
        this.intro.refresh().start()
      },
      handleCloseGuide () {
        this.guideRsultShow = false
        this.guideMask = false
        this.introShow = false
        this.intro.exit()
        this.$store.commit('updateGuideStatus', false)
      },
      finishUserGuide () {
        this.$http(this.ApiSetting.autoChess.finishUserGuide)
          .then((res) => {})
      }

    }
  }
</script>
<style scoped type="text/css">
  .auto_chess_guide{
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 199;
    left: 0;
    top: 0;
    color: #ffe2ce;
  }
  .guide_mask{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 299;
    box-sizing: border-box;
    background-color: rgba(0,0,0,0.8);
    text-align: center;
    padding:  0.8rem;
    font-size: 0.1rem;
  }
  .guide_mask .title{
    font-size: 0.2rem;
    margin-bottom: 0.3rem;
  }
  .guide_mask .guide_intro p{
    text-align: left;
    text-indent: 2em;
  }
  .guide_mask .enter_guide_btn {
    margin: 0.4rem auto 0;
    text-align: center;
  }
  .guide_mask .enter_guide_btn span{
    display: inline-block;
    font-size: 0.18rem;
    padding: 0.05rem 0.16rem;
    border: 1px solid #ffe2ce;
    background-color: #000;
    cursor: pointer;
  }


  .intro_mask{
    inset: 0px;
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    opacity: 0.8;
    box-sizing: content-box;
    z-index: 999999;
    background-color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .sold_result{
    text-align: center;
    width: 3.6rem;
  }
  .sold_result .win{
    color: #ff5837;
  }
  .sold_result .result_title{
    font-size: 0.14rem;
  }
  .sold_result .result_table{
    margin-top: 0.12rem;
  }
  .sold_result .result_table .t_row, .sold_result  .btn_box{
    display: flex;
    justify-content: center;
    font-size: 0.1rem;
  }
  .sold_result .result_table .t_row{
    border-bottom: 1px solid #5c514a;
  }
  .sold_result .result_table .t_row:last-child{
    border-bottom: none;
  }
  .sold_result .result_table .t_row .t_td{
    width: 1.6rem;
    height: 0.4rem;
    line-height: 0.4rem;
    border-right: 0.01rem solid #5c514a;
  }
  .sold_result .result_table .t_row .t_td:last-child{
    border-right: none;
  }
  .sold_result .btn_box{
    margin-top: 0.2rem;
  }
  .sold_result .btn_box .mask_btn{
    padding: 0.06rem 0.15rem;
    font-size: 0.12rem;
    border: 1px solid #ffe2ce;
    margin: 0 0.15rem;
    cursor: pointer;
  }
</style>

<style type="text/css">
  body .introjs-helperLayer{
    background-color: #1b1c1e;
    border: 2px solid #d1baaa;
  }
  body .introjs-tooltip{
    background: none;
    font-size: 0.1rem;
    color: #ffe2cd;
    max-width: 8rem;
  }
  body .introjs-tooltip .introjs-bullets, body .introjs-tooltip .introjs-arrow,body .introjs-tooltip  .introjs-tooltipbuttons{
    display: none !important;
  }
  body .introjs-overlay{
    display: none;
  }
</style>
