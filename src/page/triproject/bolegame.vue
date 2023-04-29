<template>
  <div class="bole"  :class="{'inner_page': showMaintainPage}">
    <div class="wrapper" v-if="showMaintainPage">
      <MaintainPage :time="maintainTime" :content="maintainText"></MaintainPage>
    </div>
    <div class="ly_wrapper_main" v-if="showMain">
      <div class="bole_btns">
        <!-- <span class="btn_bg try_play"><a href="https://demo.leg666.com/" target="_blank"></a></span> -->
        <span class="btn_bg play"><div class="btn_load_box" v-if="getUrlLoad">
        <span class="loading"></span></div><a href="javascript:;" @click="handleJumpLink"></a></span>
      </div>
      <div v-if="gameList.length" class="bole_content">
        <div class="bole_title"><span></span></div>
        <div class="bole_list_content">
          <div class="prev_btn list_btn" @click="handleListMove(1)">
          </div>
          <div class="next_btn list_btn" @click="handleListMove(2)">
          </div>
          <div class="list_wrapper">
            <div class="game_box_wrapper" :style="{ width: `${gameListGroup * gameBoxBaseWidth}px`,transform: 'translateX(-'+ moveDis +'px)'}">
              <div v-for="groupNum in gameListGroup"
                   :key="groupNum"
                   :style="{width: `${gameBoxBaseWidth}px`}"
                   class="game_list_wrapper clearfix">
                <div  class="game_box_flex">
                  <div v-for="(item, index) in gameList.slice(groupNum === 1 ? 0 : (groupNum - 1) * 2, groupNum * 2)"
                       :key="index"
                       @click="handleJumpOpen(item.url)"
                       class="game_box" >
                    <img :src="item.img_url" alt="">
                  </div>
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
import MaintainPage from "@/components/maintainpage";
import { toPlayGame } from '../../utils/playGame'

export default {
  name: "bolegame",
  components: {
    MaintainPage
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.loadLyUrl();
    });
  },
  computed: {
    gameListGroup() {
      return Math.ceil(this.gameList.length / 2);
    }
  },
  data() {
    return {
      maintainTime: "",
      maintainText: "",
      showMaintainPage: false,
      showMain: true,
      playUrl: "",
      getUrlLoad: false,
      moveDis: 0,
      gameList: [],
      gameBoxBaseWidth: 298
    };
  },
  methods: {
    handleListMove(type) {
      if (type === 2) {
        if (this.moveDis >= this.gameBoxBaseWidth * (this.gameListGroup - 4)) {
          return false;
        }
        this.moveDis += this.gameBoxBaseWidth;
      }
      if (type === 1) {
        if (this.moveDis <= 0) {
          return false;
        }
        this.moveDis -= this.gameBoxBaseWidth;
      }
    },
    loadLyUrl() {
      this.showMain = true;
      this.showMaintainPage = false;
      this.playUrl = "";
      this.getUrlLoad = true;
      this.$http(this.ApiSetting.index.getBoleChessUrl)
        .then(res => {
          this.getUrlLoad = false;
          if (res.status === 1 && res.data) {
            this.playUrl = res.data.url;
            this.gameList = res.data.sub_games && res.data.sub_games.length ? res.data.sub_games : []
          } else {
            if (res.is_maintain === 1) {
              this.showMain = false;
              this.showMaintainPage = true;
              this.maintainTime = res.message;
              this.maintainText = res.info;
            }
          }
        },
        err => {
          this.getUrlLoad = false;
        }
      );
    },
    handleJumpLink() {
      toPlayGame(this.playUrl)
    },
    handleJumpOpen(url) {
      toPlayGame(url)
    }
  }
};
</script>

<style scoped>
.bole .ly_wrapper_main {
  background: url("../../assets/boleChess/bole_bg.jpg") no-repeat top center;
  padding-bottom: 100px;
}
.bole_btns {
  padding-top: 530px;
  text-align: center;
}
.bole_btns .btn_bg {
  display: inline-block;
  width: 287px;
  height: 107px;
  text-align: center;
  background: url("../../assets/boleChess/sprite.png") no-repeat;
  position: relative;
}

.bole_btns .btn_bg.play {
  background-position: -249px -80px;
}
.bole_btns .btn_bg.play:hover {
  background-position: -249px -280px;
}
.bole_btns .btn_bg a,
.bole_btns .btn_bg .btn_load_box {
  display: inline-block;
  height: 107px;
  width: 287px;
  border-radius: 40px;
}
.bole_title {
  margin-top: 55px;
  text-align: center;
}
.bole_title span {
  display: inline-block;
  width: 204px;
  height: 104px;
  background: url("../../assets/boleChess/sprite.png") no-repeat;
  background-position: -432px -506px;
}
.bole_list_content {
  position: relative;
  width: 1396px;
  margin: auto;
  padding: 0 102px;
  height: 590px;
  box-sizing: border-box;
}
.bole_list_content .list_wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
.bole_list_content .list_btn {
  position: absolute;
  top: 50%;
  margin-top: -55px;
  width: 102px;
  height: 108px;
  background: url("../../assets/boleChess/sprite.png") no-repeat;
  border-radius: 50%;
  cursor: pointer;
}
.bole_list_content .prev_btn {
  left: 0;
  background-position: -64px -72px;
}
.bole_list_content .prev_btn:hover {
  background-position: -64px -274px;
}
.bole_list_content .next_btn {
  right: 0;
  background-position: -586px -72px;
}
.bole_list_content .next_btn:hover {
  background-position: -586px -274px;
}
.list_wrapper .game_box_wrapper {
  position: absolute;
  left: 0;
  top: 0;
  transition: all 0.6s;
  height: inherit;
}
.list_wrapper .game_box_wrapper .game_box_flex {
  display: flex;
  flex-direction: column;
}
.list_wrapper .game_box_wrapper .game_box {
  float: left;
  width: 298px;
  height: 298px;
  position: relative;
  text-align: center;
  line-height: 298px;
  cursor: pointer;
}
.list_wrapper .game_box_wrapper .game_list_wrapper {
  display: inline-block;
}
.list_wrapper .game_box_wrapper .game_box:hover {
  background: url("../../assets/boleChess/sprite.png") no-repeat;
  background-position: -54px -458px;
}
.bole_btns .btn_bg .btn_load_box {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  background: rgba(0, 0, 0, 0.3);
  line-height: 107px;
  text-align: center;
  margin-top: 0;
}
.bole_btns .btn_bg .btn_load_box .loading {
  display: inline-block;
  width: 40px;
  height: 40px;
  vertical-align: middle;
  background: url("../../assets/btn-loader.gif") no-repeat center;
  background-size: 100% 100%;
}
</style>
