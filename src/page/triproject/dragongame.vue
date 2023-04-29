<template>
  <div class="dragon"  :class="{'inner_page': showMaintainPage}">
    <div class="wrapper" v-if="showMaintainPage">
      <MaintainPage :time="maintainTime" :content="maintainText"></MaintainPage>
    </div>
    <div class="ly_wrapper_main" v-if="showMain">
      <div class="dragon_btns">
        <span class="btn_bg play"><div class="btn_load_box" v-if="getUrlLoad">
        <span class="loading"></span></div><a href="javascript:;" @click="handleJumpLink"></a></span>
      </div>
      <div class="dragon_content">
        <div class="dragon_title"><span></span></div>
        <div class="dragon_list_content">
          <div class="prev_btn list_btn" :class="{anisca:prevani}" @click="handleListMove(1)">
          </div>
          <div class="next_btn list_btn" :class="{anisca:nextani}" @click="handleListMove(2)">
          </div>
          <div class="list_wrapper">
            <div class="game_box_wrapper clearfix" :style="{ transform: 'translateX(-'+ moveDis +'px)'}">
              <div class="game_list_wrapper clearfix" >
                <div class="game_box" v-for="item in gameList" :key="item.id" @click="handleJumpOpen(item.id)">
                  <img  :src="item.imgUrl" alt="">
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
  name: 'dragongame',
  components: {
    MaintainPage
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.loadLyUrl()
    })
  },
  data () {
    return {
      prevani:false,
      nextani:false,
      maintainTime: '',
      maintainText: '',
      showMaintainPage: false,
      showMain: true,
      playUrl: '',
      getUrlLoad: false,
      gameListUrl: [],
      moveDis: 0,
      gameList: [
        {
          id: 1,
          name: this.$t("Fried_golden_flower"),
          imgUrl: require('../../assets/dragon/01.png'),
        },
        {
          id: 2,
          name: this.$t("points_21"),
          imgUrl: require('../../assets/dragon/02.png'),
        },
        {
          id: 3,
          name: this.$t("Fight_the_landlord"),
          imgUrl: require('../../assets/dragon/03.png'),
        },
        {
          id: 4,
          name: this.$t("Texas_poker"),
          imgUrl: require('../../assets/dragon/04.png'),
        },
        {
          id: 5,
          name: this.$t("Ten_sanshui"),
          imgUrl: require('../../assets/dragon/05.png'),
        },
        {
          id: 6,
          name: this.$t("Run_fast"),
          imgUrl: require('../../assets/dragon/06.png'),
        },
        {
          id: 7,
          name: this.$t("This_bar"),
          imgUrl: require('../../assets/dragon/07.png'),//
        },
        {
          id: 8,
          name: this.$t("Rob_zhuang_pai_gow"),
          imgUrl: require('../../assets/dragon/08.png'),//抢庄牌九
        },
        {
          id: 9,
          name: this.$t("Rob_niu_zhuang"),
          imgUrl: require('../../assets/dragon/09.png'),//抢庄牛牛
        },
        {
          id: 10,
          name: this.$t("Three_fairs"),
          imgUrl: require('../../assets/dragon/10.png'),//三公
        },
        {
          id: 12,
          name: this.$t("Rather_than_niuniu"),
          imgUrl: require('../../assets/dragon/11.png'),//通比牛牛
        },



          {
          id: 13,
          name: this.$t("illustrating"),
          imgUrl: require('../../assets/dragon/12.png'),//龙虎斗
        },



        {
          id: 14,
          name: this.$t("baccarat"),
          imgUrl: require('../../assets/dragon/13.png'),//百家乐
        },
        {
          id: 15,
          name: this.$t("One_hundred_niuniu"),
          imgUrl: require('../../assets/dragon/14.png'),//白人牛牛
        },

      ]
    }
  },
  methods: {
    handleListMove (type) {
      if (type === 2) {
        this.nextani = true
        this.prevani = false
        setTimeout(() => {
          this.nextani = false
          this.prevani = false
        }, 300);

        if (this.moveDis >= 440) {
          return false
        }
        this.moveDis += 220
      }
      if (type === 1) {
        this.nextani = false
        this.prevani = true
        setTimeout(() => {
          this.nextani = false
          this.prevani = false
        }, 300);

        if (this.moveDis <= 0) {
          return false
        }
        this.moveDis -= 220
      }
    },
    loadLyUrl () {
      this.showMain = true
      this.showMaintainPage = false
      this.playUrl = ''
      this.getUrlLoad = true
      this.$http(this.ApiSetting.index.getDragonUrl)
        .then((res) => {
          this.getUrlLoad = false
          if (res.status === 1) {
            this.playUrl = res.data.url
            this.gameListUrl = res.data.sub_games
          } else {
            if (res.is_maintain === 1) {
              this.showMain = false
              this.showMaintainPage = true
              this.maintainTime = res.message
              this.maintainText = res.info
            }
          }
        }, (err) => {
          this.getUrlLoad = false
        })
    },
    handleJumpLink () {
      toPlayGame(this.playUrl)
    },
    handleJumpOpen (id) {
      let n = parseInt(id)
      const jumpUrl = this.gameListUrl[n - 1] ? this.gameListUrl[n - 1].url : ""
      toPlayGame(jumpUrl)
    }
  }
}
</script>

<style scoped>
  .dragon .ly_wrapper_main{
    background: url("../../assets/dragon/dragon_bg.jpg") no-repeat top center;
    padding-bottom: 100px;
  }
  .dragon_btns{
    padding-top: 508px;
    text-align: center;
  }
  .dragon_btns .btn_bg{
    display: inline-block;
    text-align: center;
    position: relative;
  }

  .dragon_btns .btn_bg.play{
    background: url("../../assets/dragon/btn-play-normal.png") no-repeat;
  }
  .dragon_btns .btn_bg.play:hover{
    background: url("../../assets/dragon/btn-play-hover.png") no-repeat;
  }
  .dragon_btns .btn_bg a,.dragon_btns .btn_bg .btn_load_box{
    display: inline-block;
    height: 63px;
    width: 252px;
  }
 .dragon_title{
    margin-top: 100px;
    text-align: center;
  }
  .dragon_title span{
    display: inline-block;
    width: 490px;
    height: 64px;
    margin-bottom: 40px;
    background: url("../../assets/dragon/game-type.png") no-repeat;
  }
  .dragon_list_content{
    position: relative;
    width: 1300px;
    margin: auto;
    padding: 0 100px;
    height: 550px;
    box-sizing: border-box;
    background: #091e34;
    border: 1px solid #5e84a9;
  }
  .dragon_list_content .list_wrapper{
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
  }
  .dragon_list_content .list_btn{
    position: absolute;
    top: 50%;
    margin-top: -31px;
    width: 63px;
    height: 63px;
    cursor: pointer;
  }


  .dragon_list_content .prev_btn{
    left: 0;
     background: url("../../assets/dragon/btn-l-normal.png") no-repeat;
  }
  .dragon_list_content .prev_btn:hover{
    background: url("../../assets/dragon/btn-l-hover.png") no-repeat;
  }
  .dragon_list_content .next_btn{
    right: 0;
    background: url("../../assets/dragon/btn-r-normal.png") no-repeat;
  }
  .dragon_list_content .next_btn:hover{
    background: url("../../assets/dragon/btn-r-hover.png") no-repeat;
  }
  .list_wrapper .game_box_wrapper{
    position: absolute;
    left: 0;
    top: 0;
    width: 1554px;
    transition: all 0.6s;
  }
  .list_wrapper .game_box_wrapper .game_box{
    float: left;
    width: 220px;
    height: 237px;
    position: relative;
    text-align: center;
    line-height: 220px;
    cursor: pointer;
    background: url("../../assets/dragon/game-bg.png") no-repeat;
    margin-bottom: 10px;
  }
 .list_wrapper .game_box_wrapper .game_box img {
    width: 135px;
    height: 135px;
    transition: all linear 0.2s;
    transform: scale3d(1,1,1);
 }
  .list_wrapper .game_box_wrapper .game_list_wrapper{
    float: left;
    width: 100%;
    margin-top: 44px;
  }
  .list_wrapper .game_box_wrapper .game_box:hover img{
    /*zoom: 1.3;*/
    transform: scale3d(1.3,1.3,1.3);
  }

  .dragon_btns .btn_bg .btn_load_box{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    background: rgba(138, 101, 101, 0.3);
    line-height: 63px;
    text-align: center;
    margin-top: 0;
  }
  .dragon_btns .btn_bg .btn_load_box .loading{
    display: inline-block;
    width: 40px;
    height: 40px;
    vertical-align: middle;
    background: url("../../assets/btn-loader.gif") no-repeat center;
    background-size: 100% 100%;
  }
  .anisca {
    animation: ani 0.3s linear;
  }
  @keyframes ani {
    0% {transform: scale(1)}
    50% {transform: scale(0.8)}
    100% {transform: scale(1)}
  }
</style>

