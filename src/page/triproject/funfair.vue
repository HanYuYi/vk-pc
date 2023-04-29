<template>
  <div class="funfair"  :class="{'inner_page': showMaintainPage,'bg':!showMaintainPage}">

    <div class="wrapper" v-if="showMaintainPage">
      <MaintainPage :time="maintainTime" :content="maintainText"/>
    </div>

    <div class="funfair-content" v-else>
      <!-- <button class="to-homepage" @click="handleJumpLink(gameHallUrl)" :class="{disabled: loading}">
        <i v-if="loading" class="loading"/>
      </button>-->

      <dl class="game-panel">
        <dt>游戏列表 Game List</dt>
        <dd>
          <ul>
            <li v-for="(item, index) in listInfo.game_list" :key="index" @click="handleJumpLink(item.url)">
              <img :src="item.icon" alt="">
              <h4>{{ item.title }}</h4>
            </li>
          </ul>
        </dd>
      </dl>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import MaintainPage from '@/components/maintainpage'
import { toPlayGame } from '../../utils/playGame'

export default {
  name: 'funfair',
  components: { MaintainPage },
  data () {
    return {
      maintainTime: '',
      maintainText: '',
      showMaintainPage: false,
      listInfo: {
        game_list: []
      },
      loading: false
    }
  },
  computed: {
    ...mapState(["isLogin"]),
    /*gameHallUrl() {
      const firstRow = this.listInfo.game_list[0]
      return firstRow ? firstRow.url.split("?")[0] : ''
    }*/
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
    // 获取游戏地址
    getGameList() {
      this.loading = true
      this.listInfo = { game_list: [] }
      this.$http(this.ApiSetting.index.getFunfairGameList)
        .then(res => {
          console.info("funfair区块链游戏游戏列表初始化：", res)
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
    handleJumpLink (url) {
      toPlayGame(url)
    }
  }
}
</script>

<style lang="less" scoped>
.funfair {
  .funfair-content {
    position: relative;
    background: url("../../assets/funfair/funfair_bg.jpg") no-repeat top center;
    padding-bottom: 108px;
    overflow: hidden;
    .to-homepage {
      position: relative;
      margin: 542px auto 0;
      border: 0;
      outline: 0;
      display: block;
      width: 403px;
      height: 154px;
      cursor: pointer;
      background: url("../../assets/funfair/to_homepage_icon.png");
      &.disabled {
        pointer-events: none;
      }
      &:hover {
        background: url("../../assets/funfair/to_homepage_icon_hover.png");
      }
      .loading {
        display: block;
        top: -15px;
        width: 100%;
        height: 100%;
      }
    }
    .game-panel {
      width: 1186px;
      margin: 644px auto 0;
      dt {
        margin-bottom: 52px;
        height: 82px;
        background: url("../../assets/funfair/game_title.png");
        color: #ffffff;
        font-size: 24px;
        font-weight: bold;
        text-align: center;
        line-height: 82px;
        font-style: italic;
      }
      dd {
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            z-index: 1;
            width: 274px;
            margin-bottom: 57px;
            margin-right: 30px;
            &:nth-child(4n + 4) {
              margin-right: 0;
            }
            img {
              cursor: pointer;
              width: 274px;
              height: 274px;
              transition: transform 0.2s;
            }
            h4 {
              margin-top: 15px;
              font-size: 18px;
              font-weight: normal;
              line-height: 18px;
              text-align: center;
              color: #fff;
              transition: transform 0.2s;
            }
            &:hover {
              z-index: 2;
              img {
                transform: scale(1.25, 1.25);
              }
              h4 {
                transform: translateY(-20px);
              }
            }
          }
        }
      }
    }
    &:after {
      position: absolute;
      content: "";
      bottom: 0;
      left: 0;
      width: 211px;
      height: 223px;
      background: url("../../assets/funfair/footer_icon.png");
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
</style>
