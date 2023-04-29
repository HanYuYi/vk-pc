<template>
  <div class="kygame"  :class="{'inner_page': showMaintainPage}">
    <div class="wrapper" v-if="showMaintainPage">
      <MaintainPage :time="maintainTime" :content="maintainText"></MaintainPage>
    </div>
    <div class="ly_wrapper_main" v-if="showMain">
      <div class="slogn"><img src="../../assets/kygame/game_desc.png" alt=""></div>
      <div class="bole_btns">
        <!-- <span class="btn_bg try_play"><a href="https://demo.leg666.com/" target="_blank"></a></span> -->
        <span class="btn_bg play"><div class="btn_load_box" v-if="getUrlLoad">
        <span class="loading"></span></div><a href="javascript:;" @click="handleJumpLink"></a></span>
      </div>
      <div class="bole_content">
        <div class="bole_title"><span></span></div>
        <div class="bole_list_content">
          <div class="prev_btn list_btn" @click="handleListMove(1)">
          </div>
          <div class="next_btn list_btn" @click="handleListMove(2)">
          </div>
          <div class="list_wrapper">
            <div class="game_box_wrapper clearfix" :style="{ transform: 'translateX(-'+ moveDis +'px)'}">
              <div class="game_list_wrapper clearfix" :style="{ width: listWidth + 'px'}">
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
import MaintainPage from "@/components/maintainpage";
import { toPlayGame } from '../../utils/playGame'

export default {
  name: "kygame",
  components: {
    MaintainPage
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.loadLyUrl();
    });
  },
  computed: {
    listWidth() {
      return Math.ceil(this.gameList.length / 2) * 298;
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
      gameListUrl: [],
      moveDis: 0,
      gameList: [
        {
          id: "830",
          name: "抢庄牛牛",
          imgUrl: require("../../assets/kygame/gameimg/1.png")
        },
        {
          id: "220",
          name: "炸金花",
          imgUrl: require("../../assets/kygame/gameimg/2.png")
        },
        {
          id: "620",
          name: "德州扑克",
          imgUrl: require("../../assets/kygame/gameimg/3.png")
        },
        {
          id: "740",
          name: "二人麻将",
          imgUrl: require("../../assets/kygame/gameimg/4.png")
        },
        {
          id: "870",
          name: "通比牛牛",
          imgUrl: require("../../assets/kygame/gameimg/5.png")
        },
        {
          id: "600",
          name: "二十一点",
          imgUrl: require("../../assets/kygame/gameimg/6.png")
        },
        {
          id: "910",
          name: "百家乐",
          imgUrl: require("../../assets/kygame/gameimg/7.png")
        },
        {
          id: "860",
          name: "三公",
          imgUrl: require("../../assets/kygame/gameimg/8.png")
        },
        {
          id: "920",
          name: "森林舞会",
          imgUrl: require("../../assets/kygame/gameimg/2-1.png")
        },
        {
          id: "1940",
          name: "金鲨银鲨",
          imgUrl: require("../../assets/kygame/gameimg/2-2.png")
        },
        {
          id: "1960",
          name: "奔驰宝马",
          imgUrl: require("../../assets/kygame/gameimg/2-3.png")
        },
        {
          id: "650",
          name: "血流成河",
          imgUrl: require("../../assets/kygame/gameimg/2-4.png")
        },
        {
          id: "1950",
          name: "万人炸金花",
          imgUrl: require("../../assets/kygame/gameimg/2-5.png")
        },
        {
          id: "930",
          name: "百人牛牛",
          imgUrl: require("../../assets/kygame/gameimg/2-6.png")
        },
        {
          id: "1980",
          name: "百人骰宝",
          imgUrl: require("../../assets/kygame/gameimg/3-5.png")
        },
        /*{
          id: "230",
          name: "极速炸金花",
          imgUrl: require("../../assets/kygame/gameimg/2-7.png")
        },*/



        {
          id: "730",
          name: "抢庄牌九",
          imgUrl: require("../../assets/kygame/gameimg/2-8.png")
        },



     {
          id: "830",
          name: "抢庄牛牛",
          imgUrl: require("../../assets/kygame/gameimg/3-1.png")
        },
        {
          id: "610",
          name: "斗地主",
          imgUrl: require("../../assets/kygame/gameimg/3-3.png")
        },
        {
          id: "630",
          name: "十三水",
          imgUrl: require("../../assets/kygame/gameimg/3-2.png")
        },
        {
          id: "720",
          name: "二八杠",
          imgUrl: require("../../assets/kygame/gameimg/3-4.png")
        }
      ]
    };
  },
  methods: {
    handleListMove(type) {
      if (type === 2) {
        if (this.moveDis >= this.listWidth - 298 * 4) {
          return false;
        }
        this.moveDis += 298;
      }
      if (type === 1) {
        if (this.moveDis <= 0) {
          return false;
        }
        this.moveDis -= 298;
      }
    },
    loadLyUrl() {
      this.showMain = true;
      this.showMaintainPage = false;
      this.playUrl = "";
      this.getUrlLoad = true;
      this.$http(this.ApiSetting.index.getKyGameUrl).then(
        res => {

          this.getUrlLoad = false;
          if (res.status === 1) {
            this.playUrl = res.data.url;
            this.gameListUrl = res.data.sub_games;
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
    handleJumpOpen(id) {
      let jumpUrl = "";
      this.gameListUrl.forEach((v, i) => {
        if (v.id == id) {
          jumpUrl = v.url;
        }
      })
      toPlayGame(jumpUrl)
    }
  }
};
</script>

<style scoped>
.kygame .ly_wrapper_main {
  background: url("../../assets/kygame/bg.jpg") no-repeat top center;
  padding-bottom: 90px;
}
.kygame .slogn {
  text-align: center;
  padding-top: 210px;
}
.bole_btns {
  padding-top: 120px;
  text-align: center;
}
.bole_btns .btn_bg {
  display: inline-block;
  width: 312px;
  height: 119px;
  text-align: center;
  position: relative;
}

.bole_btns .btn_bg.play {
  background: url("../../assets/kygame/btn-normal.png") no-repeat center;
}
.bole_btns .btn_bg.play:hover {
  background: url("../../assets/kygame/btn-hover.png") no-repeat center;
}
.bole_btns .btn_bg a,
.bole_btns .btn_bg .btn_load_box {
  display: inline-block;
  height: 80px;
  width: 268px;
  border-radius: 40px;
  margin-top: 20px;
}
.bole_title {
  margin-top: 55px;
  text-align: center;
}
.bole_title span {
  display: inline-block;
  width: 600px;
  height: 96px;
  background: url("../../assets/kygame/title.png") no-repeat center;
}
.bole_list_content {
  position: relative;
  width: 1396px;
  margin: auto;
  padding: 0 102px;
  height: 590px;
  box-sizing: border-box;
  margin-top: 70px;
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
  margin-top: -50px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  cursor: pointer;
}
.bole_list_content .prev_btn {
  left: 0;
  background: url("../../assets/kygame/btn-l.png") no-repeat center;
}
.bole_list_content .prev_btn:hover {
  background-image: url("../../assets/kygame/btn-l-hover.png");
}
.bole_list_content .next_btn {
  right: 0;
  background: url("../../assets/kygame/btn-r.png") no-repeat center;
}
.bole_list_content .next_btn:hover {
  background-image: url("../../assets/kygame/btn-r-hover.png");
}
.list_wrapper .game_box_wrapper {
  position: absolute;
  left: 0;
  top: 0;
  width: 1554px;
  transition: all 0.6s;
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
.list_wrapper .game_box_wrapper .game_box img {
  transition: all 0.3s;
}

.list_wrapper .game_box_wrapper .game_list_wrapper {
  float: left;
  width: 100%;
}

.list_wrapper .game_box_wrapper .game_box:hover img {
  transform: scale(1.2);
}
.bole_btns .btn_bg .btn_load_box {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  background: rgba(0, 0, 0, 0.3);
  line-height: 80px;
  width: 268px;
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
