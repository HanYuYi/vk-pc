<template>
  <div class="match-preview">

    <template v-if="!loading">
      <template v-if="matchTabList && matchTabList.length">
        <div v-if="matchTabList[+activeFlag] && matchTabList[+activeFlag].game_list.length > 3"
             class="change-group"
             :class="{loading: changeGroupLoading}"
             @click="changeGroup">
          <i></i>
          换一批
        </div>

        <el-tabs v-model="activeFlag">
          <el-tab-pane v-for="(item, index) in matchTabList"
                       :key="index"
                       :label="item.name"
                       :name="`${index}`">
            <transition :name="animateName">
              <ul v-show="activeFlag === `${index}`" class="match-panel">

                <li v-for="(eGame, i) in item.game_list.slice(matchIndexList[index] - 3, matchIndexList[index])"
                    :key="i"
                    class="game-info-box">

                  <p class="date">
                    {{ eGame.game_start_time * 1000 | filterDate('MM-dd') }}
                    <b>{{ eGame.game_start_time * 1000 | filterDate('HH:mm') }}</b>
                  </p>

                  <h4 class="title">{{ eGame.event_name }}</h4>

                  <div class="pk-team">
                    <div class="team-logo">
                      <div class="left">
                        <img
                          v-lazy="{
                            src: eGame.team_logo_1,
                            error: $store.state.lazyMatchAvatar.error,
                            loading: $store.state.lazyMatchAvatar.loading
                          }"
                          alt="">
                      </div>
                      <div class="center">VS</div>
                      <div class="right">
                        <img
                          v-lazy="{
                            src: eGame.team_logo_2,
                            error: $store.state.lazyMatchAvatar.error,
                            loading: $store.state.lazyMatchAvatar.loading
                          }"
                          alt="">
                      </div>
                    </div>
                    <div class="team-record">
                      <div class="left">
                        <Tooltip class="tooltip_2022" :content="eGame.team_name_1" placement="bottom-start">
                          <span>{{ eGame.team_name_1 }}</span>
                        </Tooltip>
                        <small style="text-align: right">{{ eGame.team_1_point }}</small>
                      </div>
                      <div class="right">
                        <small>{{ eGame.team_2_point }}</small>
                        <Tooltip class="tooltip_2022" :content="eGame.team_name_2" placement="bottom-end">
                          <span>{{ eGame.team_name_2 }}</span>
                        </Tooltip>
                      </div>
                    </div>
                  </div>

                  <button @click="handleToEgame(eGame)" class="join-btn button_primary_2022">{{ $t("Enter_the_event") }}</button>

                </li>

              </ul>
            </transition>
          </el-tab-pane>
        </el-tabs>
      </template>
    </template>

    <div v-else class="home_loading"></div>

  </div>
</template>

<script>
import { formatDate } from '../../utils/util'

export default {
  name: 'matchPreview',
  data() {
    return {
      loading: false,
      matchTabList: [],
      matchIndexList: [],
      activeFlag: "0",
      animateName: "to-left",
      changeGroupLoading: false,
      changeGroupTimer: null
    };
  },
  filters: {
    filterDate (stamp, formate) {
      return formatDate(stamp, formate)
    }
  },
  watch: {
    // 根据切换方向动态添加过度动画属性
    activeFlag(newValue, oldValue) {
      if (+newValue > +oldValue) {
        this.animateName = "to-left"
      }
      if (+oldValue > +newValue) {
        this.animateName = "to-right"
      }
    }
  },
  mounted () {
    this.loadIndexHotGame()
  },
  methods: {
    // 加载热门赛事
    async loadIndexHotGame () {
      this.loading = true
      try {
        const res = await this.$http(this.ApiSetting.index.home.getHotGameList)
        console.info("首页热门赛事初始化：", res)

        if (res.status === 1 && res.data && res.data.length > 0) {
          this.matchTabList = res.data
          this.matchTabList.forEach((item, index) => {
            if (item.is_select) {
              this.activeFlag = index + ""
            }
            this.matchIndexList.push(3)
          })
        }
      } catch (e) {
        throw e
      } finally {
        this.loading = false

        await this.$nextTick()
        this.$emit("load-count")
      }
    },

    // 热门赛事或者进行中赛事跳转到赛事详情
    handleToEgame (match) {
      if (match.is_del) {
        this.$router.push(match.bet_url)
      } else {
        this.$router.push({name: match.pc_jump_tag, params: {id: match.id, category_id: match.category_id} })
      }
    },

    // 换一批热门赛事
    changeGroup() {
      if (this.changeGroupTimer) return

      this.changeGroupLoading = true
      if (this.matchIndexList[+this.activeFlag] >= this.matchTabList[+this.activeFlag].game_list.length) {
        this.matchIndexList[+this.activeFlag] = 3
      } else {
        this.matchIndexList[+this.activeFlag] = this.matchIndexList[+this.activeFlag] + 3
      }

      clearTimeout(this.changeGroupTimer)
      this.changeGroupTimer = null
      this.changeGroupTimer = setTimeout(() => {
        this.changeGroupLoading = false
        clearTimeout(this.changeGroupTimer)
        this.changeGroupTimer = null

      }, 600)
    }
  }
}
</script>

<style lang="less" scoped>
.match-preview {
  width: 1240px;
  margin: 5px auto 0;
  position: relative;

  .change-group {
    position: absolute;
    right: 4px;
    top: 22px;
    font-size: 14px;
    line-height: 19px;
    color: #7c88a6;
    cursor: pointer;
    transition: all 0.3s;
    z-index: 1;
    i {
      display: inline-block;
      width: 23px;
      height: 21px;
      background: url("../../assets/index/change_group_icon.png") center center no-repeat;
      margin-right: 5px;
      vertical-align: text-top;
      transition: background 0.3s;
    }

    &:hover {
      color: #07f1b7;
      i {
        background: url("../../assets/index/change_group_hover_icon.png") center center no-repeat;
      }
    }
    &.loading {
      color: #07f1b7;
      i {
        background: url("../../assets/index/change_group_hover_icon.png") center center no-repeat;
        animation: change-fade 0.6s linear;
      }
    }
    @keyframes change-fade {
      0% {transform: rotate(0deg);}
      100% {transform: rotate(360deg);}
    }
  }

  .el-tabs {
    /deep/ .el-tabs__header {
      margin: 0 0 13px 5px;
      .el-tabs__active-bar {

      }
      .el-tabs__item {
        font-weight: normal;
        height: 44px;
        font-size: 16px;
        line-height: 44px;
        color: #acbae2;
        &:hover {
          color: #07f1b7;
        }
        &.is-active {
          color: #07f1b7;
          font-weight: bold;
        }
      }
      .el-tabs__active-bar {
        height: 8px;
        background: url("../../assets/index/match_active-bar.png") center top no-repeat;
      }
    }

    /deep/ .el-tabs__content {
      .el-tab-pane {
        .to-left-enter-active, .to-left-leave-active {
          transition: all .5s ease;
        }
        .to-left-enter, .to-left-leave-to {
          opacity: 0;
          transform: translateX(140px);
        }

        .to-right-enter-active, .to-right-leave-active {
          transition: all .5s ease;
        }
        .to-right-enter, .to-right-leave-to {
          opacity: 0;
          transform: translateX(-140px);
        }


        .match-panel {
          display: flex;
          .game-info-box {
            width: 382px;
            height: 382px;
            margin-left: 47px;
            background: url("../../assets/index/match_bg.png");
            &:first-of-type {
              margin-left: 0;
            }
            .date {
              margin-top: 12px;
              padding-top: 6px;
              height: 46px;
              font-family: Roboto;
              font-size: 16px;
              line-height: 16px;
              text-align: center;
              color: #acbae2;
              b {
                display: block;
                font-size: 20px;
                line-height: 28px;
                color: #ffffff;
              }
            }
            .title {
              margin-top: 22px;
              font-weight: normal;
              font-size: 16px;
              line-height: 16px;
              text-align: center;
              color: #acbae2;
            }
            .pk-team {
              margin-top: 14px;
              .team-logo {
                width: 286px;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;
                .left, .right {
                  width: 82px;
                  height: 82px;
                  background: url("../../assets/index/team_logo_bg.png") no-repeat center center;
                  border-radius: 50%;
                  overflow: hidden;
                  text-align: center;
                  line-height: 80px;
                  box-shadow: 0 5px 13px 0 rgba(0, 0, 0, 0.1);
                  img {
                    width: 62px;
                  }
                }
                .center {
                  font-family: Roboto;
                  font-size: 41.5px;
                  line-height: 82px;
                  text-align: center;
                  color: #6e7ba0;
                }
              }
              .team-record {
                width: 310px;
                height: 52px;
                margin: 16px auto 0;
                border-radius: 8px;
                border: solid 1px #515765;
                box-sizing: border-box;
                background-color: #272a37;
                position: relative;
                display: flex;
                &:before {
                  position: absolute;
                  top: 0;
                  left: 50%;
                  content: "";
                  width: 1px;
                  height: 100%;
                  background:  #515765;
                }
                .left, .right {
                  width: 50%;
                  margin: 0 20px 0 11px;
                  font-family: Roboto;
                  line-height: 52px;
                  display: flex;
                  justify-content: space-between;
                  span {
                    margin-right: 6px;
                    display: inline-block;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    width: 72px;
                    font-size: 14px;
                    color: #acbae2;
                  }
                  small {
                    font-size: 18px;
                    width: 45px;
                    color: #ffffff;
                  }
                  .tooltip_2022 {
                    .ivu-tooltip-rel {
                      height: 50px;
                    }
                  }
                }
                .right {
                  margin: 0 11px 0 20px;
                  span {
                    margin-right: 0;
                    margin-left: 6px;
                    text-align: right;
                  }
                }
              }
            }
            .join-btn {
              display: block;
              width: 170px;
              height: 48px;
              line-height: 48px;
              font-weight: bold;
              color: #1e1e1e;
              margin: 20px auto 0;
              border-radius: 24px;
            }
          }
        }
      }
    }
  }
  .home_loading {
    height: 449px;
  }
}
</style>
