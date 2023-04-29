<template>
  <div class="home">
    <div class="home_main">

      <!-- 轮播图-->
      <banner :img-data="imgData"/>

      <!-- 赛事公告-->
      <notice @load-count="countMethod" />

      <!-- 热门赛事-->
      <matchPreview @load-count="countMethod" />

      <!-- 赛事直播-->
      <matchLive @load-count="countMethod" />

      <!-- APP下载-->
      <downloadByHome :download-data="appDownloadData"></downloadByHome>

      <!-- 游戏推荐-->
      <recommendedGames ref="recommendedGamesRef" :selected-index="toGamePanel" :game-data="gameData" :loading="loading"/>

      <!-- Roll饰品-->
      <rollOrnaments :roll-data="rollData" :loading="loading"/>
    </div>
  </div>
</template>

<script>
import banner from './banner'
import notice from './notice'
import matchPreview from './matchPreview'
import recommendedGames from './recommendedGames'
import matchLive from './matchLive'
import rollOrnaments from './rollOrnaments'
import downloadByHome from './downloadByHome'

export default {
  name: "home",
  components: { banner, notice, matchPreview, recommendedGames, matchLive, rollOrnaments, downloadByHome },
  data() {
    return {
      imgData: [],
      rollData: {},
      gameData: [],
      appDownloadData: {},
      loading: false,

      toGamePanel: null,
      loadCount: 0
    }
  },
  watch: {
    loadCount(count) {
      if (count >= 4 && this.toGamePanel) {
        window.scrollTo({ top: this.$refs.recommendedGamesRef.$el.offsetTop, behavior: "smooth" })
      }
    }
  },
  mounted () {
    this.loadIndexList()
  },
  methods: {
    // 加载首页所需数据
    async loadIndexList () {
      this.loading = true
      try {
        const res = await this.$http(this.ApiSetting.index.home.getHomeData)

        console.info("首页数据初始化：", res)
        if (res.status === 1) {
          this.imgData = res.data.banner
          if (res.data.roll) {
            this.rollData = res.data.roll
          }
          if (res.data.game_data) {
            this.gameData = res.data.game_data
          }
          if (res.data.app_download) {
            this.appDownloadData = res.data.app_download
          }
        }
      } catch (e) {
        throw e
      } finally {
        this.loading = false

        await this.$nextTick()
        this.countMethod()
      }
    },

    countMethod() {
      this.loadCount++
    }
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.game) {
        vm.toGamePanel = to.params.game
      }
    })
  }
}
</script>

<style lang="less" scoped>
.home_main{
  position: relative;
  box-sizing: border-box;
  padding-bottom: 58px;
  background: url("../../assets/index/home_bg.jpg") center 630px no-repeat repeat;
}
/deep/ .home_loading {
  display: block;
  width: 100%;
  height: 100%;
  background: url("../../assets/btn-loader.gif") no-repeat center;
  background-size: 64px 64px;
}
</style>
