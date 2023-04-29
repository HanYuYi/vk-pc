<template>
  <div class="game"  :class="{'inner_page': showMaintainPage,'bg':!showMaintainPage && !getUrlLoad}">
    <div class="wrapper" v-if="showMaintainPage">
      <MaintainPage :time="maintainTime" :content="maintainText"></MaintainPage>
    </div>
    <div class="wrapper_main" v-if="showMain">
      <div class="game_btns">
        <!-- <span class="btn_bg try_play"><a href="https://demo.leg666.com/" target="_blank"></a></span> -->
        <span class="btn_bg play"><div class="btn_load_box" v-if="getUrlLoad">
        <span class="loading"></span></div><a href="javascript:;" @click="handleJumpOpen(baseUrl)"></a></span>
      </div>
      <div class="game_content">
        <div class="game_title"><span></span></div>
        <div class="game_list_content">
          <div class="list_wrapper">
            <div class="game_box_wrapper clearfix" >
              <div class="game_list_wrapper clearfix" >
                <div class="game_box" v-for="(item, index) in gameList" :key="index" @click="handleJumpOpen(item.game_code.length && item.game_code !== 'all' ? `${baseUrl}?game_code=${item.game_code}` : baseUrl)">
                  <img v-show="!item.hot" :src="item.icon" alt="">
                  <div class="hot_game" v-show="item.hot" :style="{backgroundImage:'url('+item.icon+')'}"></div>
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
  name: 'pggame',
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
      maintainTime: '',
      maintainText: '',
      showMaintainPage: false,
      showMain: true,
      baseUrl: '',
      getUrlLoad: false,
      gameList: [
        { 'hot': false, 'game_code': 'all', icon: require('../../assets/pggame/16.png'), 'title': '全部' }
      ]
    }
  },
  methods: {
    loadLyUrl () {
      this.showMain = true
      this.showMaintainPage = false
      this.baseUrl = ''
      this.getUrlLoad = true
      this.$http(this.ApiSetting.index.getPGList)
        .then((res) => {
          console.info("PG游戏初始化：", res)
          this.getUrlLoad = false
          if (res.status === 1) {
            this.gameList = this.gameList.concat(res.data.game_list)
            this.baseUrl = res.data.game_play
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
    handleJumpOpen (url) {
      const iHeight = 947
      const iWidth = 536
      const iTop = Math.round((window.screen.availHeight - iHeight - 30) / 2)
      const iLeft = Math.round((window.screen.availWidth - iWidth - 10) / 2)
      const openParams = {
        name: "",
        height: iHeight,
        innerHeight: iHeight,
        width: iWidth,
        innerWidth: iWidth,
        top: iTop,
        left: iLeft,
        status: "no",
        toolbar: "no",
        menubar: "no",
        location: "no",
        resizable: "no",
        scrollbars: "no",
        titlebar: "no"
      }
      toPlayGame(url, openParams)
    }
  }
}
</script>


<style lang="less" scoped>
.game {
    &.bg{
      background: url("../../assets/pggame/bg.png") no-repeat bottom center;
    }
 .wrapper_main{
    background: url("../../assets/pggame/head_bg.png") no-repeat top center;
    padding-bottom: 100px;
  }
  .game_btns{
    padding-top: 478px;
    text-align: center;
    .btn_bg{
      display: inline-block;
      width: 340px;
      height: 140px;
      transition: all 0.2s;
      text-align: center;
      background: url("../../assets/pggame/btn-normal.png") no-repeat;
      background-position: 50%;
      position: relative;
      &:hover {
        background: url("../../assets/pggame/btn-hover.png") no-repeat;
        background-position: 50%;
      }
    }
  }

 .game_title{
    margin-top: 95px;
    margin-bottom: 20px;
    text-align: center;
    span{
      display: inline-block;
      width:358px;
      height: 60px;
      background: url("../../assets/pggame/type.png") no-repeat;
    }
  }
  .game_list_content{
    position: relative;
    width: 1215px;
    min-height: 337px;
    margin: auto;
    box-sizing: border-box;
    .list_wrapper{
      overflow: hidden;
      position: relative;
    }
  }
  .list_wrapper {
    .game_box_wrapper{
      .game_box{
        float: left;
        width: 351px;
        height: 337px;
        position: relative;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.2s;
        margin-right: -64px;
        //background-color: red;
        img {
          margin-top:-16px;
          margin-left: 1px;
        }
        &:hover{
          background: url("../../assets/pggame/bghover.png") no-repeat;
        }
      }
      .hot_game {
        background-repeat: no-repeat;
        background-position: 0 0;
        width: 250px;
        height: 250px;
        margin-left: 8px;
        margin-top: -16px;
        animation: togif 1.7s steps(14) 700ms infinite;
      }
      .game_list_wrapper{
        float: left;
        width: 100%;
      }
    }
  }
  @keyframes togif {
    0% {
      background-position:0 0;
    }
    100% {
      background-position:-3500px 0;
    }
  }
  .game_btns .btn_bg .btn_load_box{
    display: inline-block;
    height: 70px;
    width: 266px;
    border-radius: 15px;
    margin-top: 16px;
  }
  .game_btns .btn_bg a {
    margin: 35px auto 0;
    display: block;
    height: 70px;
    width: 266px;
  }
  .game_btns .btn_bg .btn_load_box{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 2;
    background: rgba(0,0,0,0.3);
    line-height: 90px;
    text-align: center;
    margin-top: 0;
        display: flex;
    justify-content: center;
    align-items: center;
  }
  .game_btns .btn_bg .btn_load_box .loading{
    display: inline-block;
    width: 40px;
    height: 40px;
    vertical-align: middle;
    background: url("../../assets/btn-loader.gif") no-repeat center;
    background-size: 100% 100%;
  }
}

</style>

