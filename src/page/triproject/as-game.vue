<template>
  <div class="as-game" :class="{'inner_page': showMaintainPage}">

    <div class="wrapper" v-if="showMaintainPage" style="padding-top: 90px">
      <MaintainPage :time="maintainTime" :content="maintainText" />
    </div>

    <div class="as-game-content" v-else>
      <button class="to-homepage" @click="handleJumpLink" :class="{disabled: loading}">
        <i class="loading"/>立即游戏
      </button>

      <dl class="game-panel">
        <dt></dt>
        <dd>
          <ul v-if="!loading">
            <li v-for="(item, index) in listInfo.game_list" :key="index" @click="handleJumpOpen(item.url)">
              <span class="logo" :style="{background: `url(${item.icon})`}"></span>
              <span class="base"></span>
              <p class="title">{{ item.title }}</p>
            </li>
          </ul>
          <i v-else class="loading"/>
        </dd>
      </dl>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import MaintainPage from '@/components/maintainpage'

export default {
  name: 'as-game',
  components: { MaintainPage },
  data () {
    return {
      listInfo: {
        game_list: []
      },
      loading: false,
      showMaintainPage: false,
      maintainTime: '',
      maintainText: '',
    }
  },
  computed: {
    ...mapState(["isLogin", "userInfo"])
  },
  watch: {
    isLogin() {
      this.getGameList()
    }
  },
  mounted () {
    this.getGameList()
  },
  methods: {
    isChangeFlag() {
      if (+this.userInfo.change_flag === 1) {
        this.$alert('请先前往个人中心修改用户名，方可进入游戏', {
          center: true
        })
        return false
      }
      return true
    },
    // 获取游戏地址
    getGameList() {
      this.loading = true
      this.listInfo = {
        game_list: []
      }
      this.showMaintainPage = false
      this.maintainTime = ''
      this.maintainText = ''
      this.$http(this.ApiSetting.index.getAsGameList)
        .then(res => {
          console.info("AS区块链游戏游戏列表初始化：", res)
          if (res.status === 1) {
            this.listInfo = res.data
          } else {
            if(res.is_maintain === 1) {
              this.showMaintainPage = true
              this.maintainTime = res.message
              this.maintainText = res.info
            }
          }
        })
        .finally(() => { this.loading = false })
    },
    // 立即游戏
    handleJumpLink () {
      if (this.listInfo.is_login) {
        if (!this.isChangeFlag()) {
          return
        }
        console.info("进入游戏链接：", this.listInfo.url)
        window.open(this.listInfo.url)
      } else {
        this.$message({ message: this.$t("Please_login_first"), type: 'warning' })
      }
    },
    // 游戏列表 进入游戏
    handleJumpOpen (url) {
      if (this.listInfo.is_login) {
        if (!this.isChangeFlag()) {
          return
        }
        console.info("进入游戏链接：", url)
        window.open(url, '_blank')
      } else {
        this.$message({ message: this.$t("Please_login_first"), type: 'warning' })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.as-game {

  .as-game-content {
    overflow: hidden;
    background: url("../../assets/as-game/banner.jpg") no-repeat center top, linear-gradient(to bottom, #510c70 13%, #191f64);
    .to-homepage {
      position: relative;
      border: 0;
      outline: 0;
      display: block;
      margin: 437px auto 0;
      width: 278px;
      height: 98px;
      cursor: pointer;
      text-shadow: 0 1px 7px rgba(9, 9, 9, 0.75);
      font-size: 34px;
      font-weight: bold;
      line-height: 98px;
      letter-spacing: 2.55px;
      text-align: center;
      color: #fff;
      background: url("../../assets/as-game/to_homepage_btn_hover.png");
      .loading {
        width: 0;
        height: 0;
      }
      &:hover {
        color: #fff99d;
        background: url("../../assets/as-game/to_homepage_btn.png");
      }
      &.disabled {
        pointer-events: none;
        .loading {
          width: 100%;
          height: 100%;
        }
      }
    }

    .game-panel {
      width: 1240px;
      margin: 95px auto 30px;
      dt {
        height: 73px;
        background: url("../../assets/as-game/game_title.png") no-repeat center top;
      }
      dd {
        position: relative;
        margin-top: 70px;
        min-height: 450px;
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            width: 248px;
            height: 320px;
            margin-bottom: 30px;
            cursor: pointer;
            position: relative;
            .logo {
              position: absolute;
              z-index: 2;
              top: 60px;
              left: 29px;
              width: 190px;
              height: 166px;
              pointer-events: none;
            }
            .base {
              position: absolute;
              z-index: 1;
              top: 182px;
              left: 44px;
              width: 160px;
              height: 74px;
              pointer-events: none;
              background: url("../../assets/as-game/game_base.png") no-repeat;
            }
            .title {
              margin-top: 278px;
              font-size: 17.5px;
              line-height: 17.5px;
              text-align: center;
              color: #ffffff;
            }
            &:hover {
              background: url("../../assets/as-game/game_hover.png") no-repeat;
              .logo {
                top: 50px;
                transform: scale(1.1, 1.1);
              }
              .title {
                font-size: 23.5px;
                font-weight: bold;
                color: #4bffff;
              }
            }
          }
        }
      }
    }

    .loading {
      position: absolute;
      top: 0;
      left: 0;
      display: inline-block;
      width: 100%;
      height: 100%;
      background: url("../../assets/btn-loader.gif") no-repeat center;
      background-size: 40px 40px;
    }
  }
}
</style>
