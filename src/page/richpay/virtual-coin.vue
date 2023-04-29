<template>
  <div class="richpay_home_floor" style="margin-top: 98px">
    <dl class="main collapse_panel">
      <dt class="richpay_head" @click="collapse = !collapse" :class="{coll: collapse}">
        虚拟币使用教程<i class="fold_icon" :class="{open: !collapse}"></i>
      </dt>

      <transition name="slide-fade">
        <dd class="richpay_content" v-show="!collapse">
          <div class="virtual-panel">

            <div class="video-play" id="dPlayer"></div>

            <ul class="tab">
              <li v-for="(txt, index) in tabList"
                  :key="index"
                  class="richpay_btn"
                  @click="currentId = index;switchVideo()"
                  :class="{active: currentId === index}">{{txt}}</li>
            </ul>

          </div>
        </dd>
      </transition>
    </dl>
  </div>
</template>

<script>
import { mapState } from "vuex";
import 'dplayer/dist/DPlayer.min.css';
import DPlayer from 'dplayer';

export default {
  name: 'virtual-coin',
  data () {
    return {
      collapse: true,
      currentId: 0,
      tabList: ['ERC&TRC', '如何购买', '如何充值', '提款&卖币'],
      myPlayer: null,
      count: 0
    }
  },
  computed: {
    ...mapState(['richpayInitData'])
  },
  watch: {
    collapse (bool) {
      if (!bool) {
        if (this.count <= 0) {
          this.currentId = 0
          this.initDPlayer()
        }
        this.count++
      } else {
        this.myPlayer.pause()
      }
    }
  },
  methods: {
    switchVideo() {
      if(!this.myPlayer) return
      this.myPlayer.switchVideo(
        {
          url: this.richpayInitData.video[this.currentId],
          pic: require("../../assets/richpay/virtual_cover_" + (this.currentId + 1) + ".jpg"),
        }
      );
    },
    initDPlayer () {
      if (!this.richpayInitData.video || !this.richpayInitData.video.length) return
      this.myPlayer = new DPlayer({
        container: document.getElementById('dPlayer'),
        video: {
          url: this.richpayInitData.video[this.currentId],
          pic: require("../../assets/richpay/virtual_cover_" + (this.currentId + 1) + ".jpg"),
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.virtual-panel {
  width:calc(100% - (123px * 2));
  margin: 38px auto 0;
  display: flex;
  justify-content: space-between;
  .video-play {
    width: 609px;
    height: 343px;
    background: #000;
  }
  .tab {
    margin-top: 71px;
    width: 346px;
    height: 200px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
