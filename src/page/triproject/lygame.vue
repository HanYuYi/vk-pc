<template>
  <div class="lygame" :class="{'inner_page': showMaintainPage}">
    <div class="wrapper" v-if="showMaintainPage">
      <MaintainPage :time="maintainTime" :content="maintainText"></MaintainPage>
    </div>
    <div class="ly_wrapper_main" v-if="showMain">
      <div class="lygame_btns">
        <span class="btn_bg try_play">
          <a href="javascript:;" @click="handleJumpLink(0)"></a>
        </span>
        <span class="btn_bg play">
          <div class="btn_load_box" v-if="getUrlLoad"><span class="loading"></span></div>
          <a href="javascript:;" @click="handleJumpLink(1)"></a>
        </span>
      </div>
      <div class="lygame_content">
        <div class="lygame_title"><span></span></div>
        <div class="lygame_list_content">
          <div class="prev_btn list_btn" @click="handleListMove(1)">
          </div>
          <div class="next_btn list_btn" @click="handleListMove(2)">
          </div>
          <div class="list_wrapper">
            <!--<div class="desc_mask" v-html="currentDesc" v-show="showDescBox" :class="{'bottom':descBottom}">

            </div>-->
            <div class="shadow_mask left">

            </div>
            <div class="shadow_mask right">

            </div>
            <div class="game_box_wrapper clearfix" :style="{ transform: 'translateX(-'+ moveDis +'px)'}">
              <div class="game_list_wrapper clearfix" >
                <div class="game_box" v-for="item in gameList" :key="item.id" @click="handleJumpOpen(item.id)">
                  <img :src="item.imgUrl" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import MaintainPage from '@/components/maintainpage'
import { toPlayGame } from '../../utils/playGame'

export default {
  name: 'lygame',
  components: {
    MaintainPage
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.loadLyUrl ()
    })
  },
  data() {
     return {
       maintainTime: '',
       maintainText: '',
       showMaintainPage: false,
       showMain: true,
       playUrl: '',
       getUrlLoad: false,
       gameListUrl: [],
       showDescBox: false,
       descBottom: false,
       moveDis: 0,
       gameList: [
         {
           id: 1,
           name: this.$t("The_bgyx"),
           imgUrl: require('../../assets/lygame/bgyx.png'),
         },
         {
           id: 2,
           name: this.$t("The_three_niu_zhuang"),
           imgUrl: require('../../assets/lygame/1.png'),
         },
         {
           id: 3,
           name: this.$t("Rob_niu_zhuang"),
           imgUrl:  require('../../assets/lygame/2.png'),
         },
         {
           id: 4,
           name: this.$t("Fried_golden_flower"),
           imgUrl:  require('../../assets/lygame/3.png'),
         },
         {
           id: 5,
           name: this.$t("Texas_poker"),
           imgUrl:  require('../../assets/lygame/4.png'),
         },
         {
           id: 6,
           name: this.$t("Rob_zhuang_pai_gow"),
           imgUrl:  require('../../assets/lygame/5.png')
         },
         {
           id: 7,
           name: this.$t("Rather_than_niuniu"),
           imgUrl:  require('../../assets/lygame/6.png')
         },
         {
           id: 8,
           name: this.$t("Extreme_Fried_golden_flower"),
           imgUrl:  require('../../assets/lygame/7.png')
         },
         {
           id: 9,
           name: this.$t("This_bar"),
           imgUrl:  require('../../assets/lygame/8.png'),
         },
         {
           id: 10,
           name: this.$t("Three_fairs"),
           imgUrl:  require('../../assets/lygame/9.png'),
         },
         {
           id: 11,
           name: this.$t("blackjack"),
           imgUrl:  require('../../assets/lygame/10.png'),
         },
         {
           id: 12,
           name: this.$t("And_the_tiger_zhuang"),
           imgUrl:  require('../../assets/lygame/11.png'),
         },
         {
           id: 13,
           name: this.$t("Fight_the_landlord"),
           imgUrl:  require('../../assets/lygame/12.png'),
         },
         {
           id: 14,
           name: this.$t("Ten_sanshui"),
           imgUrl:  require('../../assets/lygame/13.png'),
         }
       ]
     }
  },
  methods: {
    handleListMove (type) {
      if(type === 2){
        if(this.moveDis>=966){
          return false
        }
        this.moveDis += 322
      }
      if(type === 1){
        if(this.moveDis<=0){
          return false
        }
        this.moveDis -= 322
      }
    },
    loadLyUrl () {
      this.showMain = true
      this.showMaintainPage = false
      this.playUrl = ''
      this.getUrlLoad = true
      this.$http(this.ApiSetting.index.getLyUrl)
        .then((res) => {
          this.getUrlLoad = false
          if(res.status === 1){
            this.playUrl = res.data.url
            this.gameListUrl = res.data.sub_games
          }else {
            if(res.is_maintain === 1){
              this.showMain = false
              this.showMaintainPage = true
              this.maintainTime = res.message
              this.maintainText = res.info
            }
          }
        },(err) => {
          this.getUrlLoad = false
        })
    },
    handleJumpLink (index) {
      const indexUrl = ["https://leg.ejdj12.com/", this.playUrl]
      toPlayGame(indexUrl[index])
    },
    handleJumpOpen (id) {
      let n = parseInt(id)
      const jumpUrl = this.gameListUrl[n-1] ? this.gameListUrl[n-1].url : ""
      toPlayGame(jumpUrl)
    }
  }
}
</script>
<style scoped>
  .lygame .ly_wrapper_main{
    background: url("../../assets/lygame/bg.jpg") no-repeat top center;
    padding-bottom: 100px;
  }
  .lygame_btns{
    padding-top: 680px;
    text-align: center;
  }
  .lygame_btns .btn_bg{
    display: inline-block;
    width: 268px;
    height: 110px;
    text-align: center;
    background: url("../../assets/lygame/ly_icons.png") no-repeat;
    position: relative;
  }
  .lygame_btns .btn_bg.try_play{
    margin-right: 60px;
    background-position: -75px -62px;
  }
  .lygame_btns .btn_bg.try_play:hover{
    background-position: -75px -212px;
  }
  .lygame_btns .btn_bg.play{
    background-position: -404px -62px;
  }
  .lygame_btns .btn_bg.play:hover{
    background-position: -404px -212px;
  }
  .lygame_btns .btn_bg a,.lygame_btns .btn_bg .btn_load_box{
    display: inline-block;
    height: 90px;
    width: 100%;
    border-radius: 40px;
    margin-top: 15px;
  }
  .lygame_title{
    margin-top: 110px;
    text-align: center;
  }
  .lygame_title span{
    display: inline-block;
    width: 620px;
    height: 96px;
    background: url("../../assets/lygame/ly_icons.png") no-repeat;
    background-position: -62px -415px;
  }
  .lygame_list_content{
    position: relative;
    width: 1506px;
    margin: 70px auto 0;
    padding: 0 100px;
    height: 694px;
    box-sizing: border-box;
  }
  .lygame_list_content .list_wrapper{
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
  }
  .lygame_list_content .list_btn{
    position: absolute;
    top: 50%;
    margin-top: -38px;
    width: 76px;
    height: 76px;
    background: url("../../assets/lygame/ly_icons.png") no-repeat;
    border-radius: 50%;
    cursor: pointer;
  }
  .lygame_list_content .prev_btn{
    left: 0;
    background-position: -140px -609px;
  }
  .lygame_list_content .prev_btn:hover{
    background-position: -140px -695px;
  }
  .lygame_list_content .next_btn{
    right: 0;
    background-position: -293px -609px;
  }
  .lygame_list_content .next_btn:hover{
    background-position: -293px -695px;
  }
  .list_wrapper .game_box_wrapper{
    margin: 25px 10px;
    position: absolute;
    left: 0;
    top: 0;
    width: 2254px;
    transition: all 0.6s;
  }
  .list_wrapper .game_box_wrapper .game_box{
    float: left;
    width: 322px;
    height: 322px;
    position: relative;
    text-align: center;
    line-height: 322px;
    cursor: pointer;
  }

  .list_wrapper .game_box_wrapper .game_list_wrapper{
    float: left;
    width: 100%;
  }
  .list_wrapper .game_box_wrapper .game_box:hover{
    background: url("../../assets/lygame/ly_icons.png") no-repeat;
    background-position: -79px -877px;
  }

  .list_wrapper .desc_mask{
    position: absolute;
    top: 25px;
    right: 34px;
    width: 968px;
    height: 260px;
    background: url("../../assets/lygame/ly_icons.png") no-repeat;
    background-position: -115px -1494px;
    z-index: 3;
    box-sizing: border-box;
    padding: 18px;
    color: #a9e1e7;
    font-size: 14px;
  }
  .list_wrapper .desc_mask.bottom{
    top: 298px;
  }
  .list_wrapper .shadow_mask{
    position: absolute;
    height: 602px;
    width: 90px;
    top: 50px;
    background: url("../../assets/lygame/ly_icons.png") no-repeat;
    z-index: 3;
  }
  .list_wrapper .shadow_mask.left{
    left: -46px;
    background-position: -824px -74px;
  }
  .list_wrapper .shadow_mask.right{
    right: -46px;
    background-position: -1132px -74px;
  }
  .lygame_btns .btn_bg .btn_load_box{
    position: absolute;
    top: 15px;
    left: 0 ;
    z-index: 2;
    background: rgba(0,0,0,0.3);
    line-height: 90px;
    text-align: center;
    margin-top: 0;
  }
  .lygame_btns .btn_bg .btn_load_box .loading{
    display: inline-block;
    width: 40px;
    height: 40px;
    vertical-align: middle;
    background: url("../../assets/btn-loader.gif") no-repeat center;
    background-size: 100% 100%;
  }

</style>
<style>
  .list_wrapper .desc_mask p{
    line-height: 18px;
    padding: 2px 0;
  }
</style>
