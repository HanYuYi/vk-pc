<template>
  <div class="game-wrapper">

    <div class="wrapper" :style="width ? `width: ${width}px` : '', height ? `height: ${height}px` : ''">

      <div v-if="!isMaintain"
           ref="fullScreenRef"
           class="full-screen-wrapper">

        <!-- 全屏控件栏-->
        <div v-if="isFullScreen && gameUrl !== '' && !gameLoading"
             class="controller-bar"
             :class="{'is-relative': $slots.default && $slots.default.length}">
          <slot></slot>
          <i @click="fullScreen" class="screen" :class="{'no-screen': isScreen}"></i>
        </div>

        <!-- game content-->
        <iframe v-show="gameUrl !== '' && !gameLoading"
                :src="gameUrl"
                ref="frameRef"
                allowfullscreen="allowfullscreen"
                mozallowfullscreen="true"
                webkitallowfullscreen="true"
                allowtransparency="true"
                frameborder="0">
        </iframe>

        <!-- game loader-->
        <div v-show="gameLoading" class="game-loader"></div>

      </div>

      <!-- 维护提示组件-->
      <maintainpage v-else
                    :time="maintainTime"
                    :content="maintainText" />

    </div>

  </div>
</template>

<script>
import maintainpage from "./maintainpage"
import { mapState } from "vuex"

const _documentElement = document.documentElement
// 全屏API
const fullScreenAPI = _documentElement.requestFullscreen || _documentElement.webkitRequestFullScreen

const _document = document
// 退出全屏API
const exitFullScreenAPI = _document.webkitCancelFullScreen  || _document.mozCancelFullScreen

export default {
  name: "game-decorator",

  components: { maintainpage },

  props: {
    // 可以自定义容器宽度
    width: {
      type: Number,
      default: 0
    },
    // 可以自定义容器高度
    height: {
      type: Number,
      default: 0
    },
    // 游戏接口地址对象
    getGameAPI: {
      type: Object,
      required: true
    },
    // 也可以设置iframe加载的游戏地址
    gameUri: {
      type: String
    },
    // 是否显示全屏icon
    isFullScreen: {
      type: Boolean,
      default: true
    },
    // 兼容以前部分老游戏，退出登录要刷新接口
    isLogoutUpdate: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      gameUrl: "",
      gameLoading: true,
      // 需要全屏的容器
      fullScreenEl: null,
      isScreen: false,
      // 维护时间
      maintainTime: "",
      // 维护提示文案
      maintainText: "",
      isMaintain: false
    }
  },

  computed: {  ...mapState(["isLogin"]) },

  watch: {
    gameUri(uri) {
      this.gameUrl = uri
    },

    isLogin(bool) {
      !bool && this.isLogoutUpdate && this.loadGameData()
    }
  },

  mounted () {
    this.loadGameData()
  },

  methods: {
    /**
     * 加载游戏数据
     * @return {Promise<void>}
     */
    async loadGameData() {
      this.isMaintain = false
      const params = {}
      // 目前只有pbsports 和 xiaoaigame 需要根据入参进具体赛事场馆
      const { id, category_id } = this.$route.params
      if (id) {
        params.game_id = id
        params.category_id = category_id
      }
      try {
        const gamePageRoute = this.$route.path
        console.info(`${gamePageRoute} 获取游戏信息入参：`, params)
        const response = await this.$http(this.getGameAPI, params)
        console.info(`${gamePageRoute} 获取游戏信息响应：`, response)

        if (response.status === 1) {
          const { url } = response.data
          this.gameUrl = url
          await this.$nextTick()

          const iframe = this.$refs.frameRef
          if (iframe.attachEvent) {
            iframe.attachEvent("onload", () => {
              this.fullScreenEl = this.$refs.fullScreenRef
              this.gameLoading = false
              this.$emit("on-load-finish", response.data)
              window.addEventListener("fullscreenchange", this.isScreenAssign)
            })
          } else {
            iframe.onload = () => {
              this.fullScreenEl = this.$refs.fullScreenRef
              this.gameLoading = false
              this.$emit("on-load-finish", response.data)
              window.addEventListener("fullscreenchange", this.isScreenAssign)
            }
          }
        } else {
          this.gameLoading = false
          const { is_maintain , message, info } = response
          if (is_maintain === 1) {
            this.isMaintain = true
            this.maintainTime = message
            this.maintainText = info
            this.$emit("on-load-maintain")
          }
        }
      } catch (error) {
        this.gameLoading = false
        throw error
      }
    },

    /**
     * 点击切换 全屏/非全屏
     * @return {void}
     */
    fullScreen() {
      try {
        !this.isScreen ? fullScreenAPI.call(this.fullScreenEl) : exitFullScreenAPI.call(_document)
      } catch (error) {
        throw error
      }
    },

    /**
     * 当前是否全屏
     * @return {void}
     */
    isScreenAssign() {
      this.isScreen = !!(_document.fullscreen || _document.webkitIsFullScreen)
    }
  },

  beforeDestroy () {
    window.removeEventListener("fullscreenchange", this.isScreenAssign)
  }

}
</script>

<style lang="less" scoped>
.game-wrapper {
  padding-top: 80px;
  .wrapper{
    margin: 0 auto 20px;

    @media screen and (max-width: 1480px) {
      width: 1240px;
      height: 660px;
    }
    @media screen and (min-width: 1480px) {
      width: 1440px;
      height: 680px;
    }
    @media screen and (min-width: 1536px) {
      width: 1440px;
      height: 820px;
    }

    .full-screen-wrapper {
      width: inherit;
      height: inherit;
      overflow: hidden;

      .controller-bar {
        width: calc(100% - 60px);
        height: 40px;
        padding: 0 30px;
        background-image: linear-gradient(to bottom, #121317, transparent);
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        &.is-relative {
          position: relative;
        }

        .screen {
          display: block;
          width: 24px;
          height: 22px;
          background: url("../assets/full_screen.png") no-repeat center;
          cursor: pointer;
          position: relative;
          &.no-screen {
            background: url("../assets/exit_full_screen.png") no-repeat center;
          }
        }
      }

      &>iframe {
        width: inherit;
        height: calc(100% - 40px);
      }

      .game-loader {
        height: inherit;
        background: #17191f url("../assets/big_loading.gif") no-repeat center;
        background-size: 100px;
      }
    }
  }
}
</style>
