<template>
  <div class="block block-ZJZR">
    <div class="border"></div>
    <div class="display">
      <div class="title-wrapper">
        <div class="title title-zjzr">最佳阵容</div>
        <div class="right-wrapper">
          <div v-if="BestLineTitle" class="ri-coner-btn ri-coner-btn-notallow">{{ BestLineTitle }}</div>
        </div>
      </div>
      <div class="bestline-page d-flex">
        <div class="team-card" v-for="(card, i) in BestlineData.slice(0, 5)" :key="i">
          <div class="bg"></div>
          <div class="rect"></div>
          <div class="display d-flex flex-column align-center">
            <img width="32" height="32" v-lazy="{
              src: card.team_image_thumb,
              error: lazyMatchAvatar.error,
              loading: lazyMatchAvatar.loading
            }" alt="">
            <div class="team-logo-wrapper">
              <div class="circle">
                <img width="140" height="140" v-lazy="{
                  src: card.player_image_thumb,
                  error: lazyS12Avatar.error,
                  loading: lazyS12Avatar.loading
                }" alt="">
              </div>
            </div>
            <div class="nickname">{{ card.nickname }}</div>
            <div class="kda-bar">
              <span class="kda-k" :style="{ width: `${percent(card, 'K')}%` }"></span>
              <span class="kda-d" :style="{ width: `${percent(card, 'D')}%` }"></span>
              <span class="kda-a" :style="{ width: `${percent(card, 'A')}%` }"></span>
            </div>
            <div class="kda-desc">
              <span class="big-text average">{{ card.KDA }}</span>
              <span class="theme text">KDA</span>
              <span class="theme kda">{{ card.kills }}/{{ card.deaths }}/{{ card.assists }}</span>
            </div>
            <div class="join-rate-bar">
              <span class="inner-bar" :style="{ width: `${card.offered_rate}%` }"></span>
            </div>
            <p class="join-rate theme"><span class="big-text">{{ card.offered_rate }}%</span>场均参团率</p>
            <div class="attribute" v-if="card.positionID == 1 || card.positionID == 2"><span
                class="fll">场均伤害占比</span><span class="flr big">{{
                card.damageDealt_rate
                }}%</span>
            </div>
            <div class="attribute" v-else><span class="fll">场均承伤占比</span><span class="flr big">{{
            card.damageTaken_rate
            }}%</span>
            </div>
            <!-- 打野 -->
            <template v-if="card.positionID == 4">
              <div class="attribute"><span class="fll">控野率</span><span class="flr big">{{ card.neutralMinionsKilled_rate
              }}%</span>
              </div>
              <div class="attribute"><span class="fll">分均排眼</span><span class="flr big">{{ card.wardsKilled_m }}</span>
              </div>
              <div class="attribute"><span class="fll">分均伤害</span><span class="flr big">{{ card.damageDealt_m }}</span>
              </div>
            </template>
            <!-- 辅助 -->
            <template v-else-if="card.positionID == 5">
              <div class="attribute"><span class="fll">分均插眼</span><span class="flr big">{{ card.wardsPlaced_m
              }}%</span>
              </div>
              <div class="attribute"><span class="fll">分均排眼</span><span class="flr big">{{ card.wardsKilled_m }}</span>
              </div>
              <div class="attribute"><span class="fll">分均购买控制守卫</span><span class="flr big">{{
              card.visionWardsBoughtInGame_m }}</span>
              </div>
            </template>
            <template v-else>
              <div class="attribute" v-if="card.positionID == 3"><span class="fll">场均伤害占比</span><span class="flr big">{{
              card.damageDealt_rate
              }}%</span>
              </div>
              <div class="attribute" v-else><span class="fll">场均伤害转化率</span><span class="flr big">{{
              card.DTR
              }}%</span>
              </div>
              <div class="attribute"><span class="fll">分均伤害</span><span class="flr big">{{ card.damageDealt_m }}</span>
              </div>
              <div class="attribute"><span class="fll">分均补刀</span><span class="flr big">{{ card.hits_m }}</span></div>
            </template>
            <div class="attribute d-flex justify-space-between align-center">
              <div class="left d-flex align-center">
                {{ card.position_name }}<span class="icon" :class="`icon-${i}`"></span>
              </div>
              <div class="right d-flex align-center">
                <span>评分：</span>
                <span class="big">{{
                card.f_score
                }}</span>
              </div>
            </div>
          </div>
        </div>
        <template v-if="!ajaxLoading && (!BestlineData.length)">
          <div class="no-data-wrapper d-flex flex-column align-center">
            <img class="no-data-logo" width="134" height="136" src="~@/assets/active/lols12/new/no-data-logo.png" alt="">
            <div class="no-data-text">暂无数据!</div>
          </div>
        </template>

        <Loading v-if="ajaxLoading" class="list-loading" :color="'#bf9854'" />
      </div>
    </div>
  </div>

</template>

<script>
import { mapState } from 'vuex'
import Loading from '@/components/common/Loading.vue'
export default {
  name: 'BestLineup',
  data() {
    return {
      positionID: 1, //该字段无用，仅作为标识，1：ADC 2：中单 3：上单 4：打野 5：辅助
      ajaxLoading: false,
      BestLineTitle: '',
      BestlineData: []
    }
  },
  computed: {
    ...mapState(["lazyS12Avatar", "lazyMatchAvatar"])
  },
  components: {
    Loading
  },
  props: {
    gamecode: {
      type: String,
      default: ''
    }
  },
  watch: {
    gamecode(val) {
      console.log('最佳阵容中的gamecode变化了', val)
      if (val) {
        this.init()
      }
    }
  },
  methods: {
    init() {
      this.ajaxLoading = true
      this.$http(this.ApiSetting.active.lols12.bestLineup, {
        tournament_code: this.gamecode
      })
        .then(res => {
          this.ajaxLoading = false
          console.log('最佳阵容', this.gamecode, res)
          if (res.status == 1) {
            this.BestLineTitle = res.data.title
            this.BestlineData = res.data.list
          }
        })
        .catch(err => {
          this.ajaxLoading = false
        })
    },
    // 计算KDA百分比
    percent(card, key) {
      const total = +card.kills + +card.deaths + +card.assists
      switch (key) {
        case 'K':
          return +card.kills / total * 100
        case 'D':
          return +card.deaths / total * 100
        case 'A':
          return +card.assists / total * 100
        default:
          return
      }
    }
  }
}
</script>

<style lang="less" scoped>
.big-text {
  font-size: 18px;
  font-weight: bold;
  color: #fff;
}

.bestline-page {
  margin-top: 39px;

  .list-loading {
    position: absolute;
  }

  .team-card {
    user-select: none;
    position: relative;
    margin-right: 25px;
    width: 220px;
    height: 554px;
    box-sizing: border-box;
    padding: 13px 29px 0;
    text-align: center;
    border: solid 1px rgba(255, 235, 180, 0.2);

    &:nth-child(5n) {
      margin-right: 0;
    }

    .team-logo-wrapper {
      position: relative;
      margin-top: 2px;
      width: 160px;
      height: 160px;
      background: url('~@/assets/active/lols12/new/sprite.png');
      background-position: -1422px -169px;
      display: flex;
      justify-content: center;
      align-items: center;

      .circle {
        position: absolute;
        width: 140px;
        height: 140px;
        border-radius: 50%;
        overflow: hidden;

        img {
          border-radius: 50%;
        }
      }
    }

    .nickname {
      margin-top: 6px;
      font-size: 18px;
      font-weight: bold;
      color: #fff;
    }

    .kda-bar {
      width: 100%;
      height: 10px;
      border-radius: 5px;
      overflow: hidden;
      margin-top: 10px;

      span {
        display: block;
        height: 100%;
        float: left;
      }

      .kda-k {
        width: 0;
        background: #eec494;
      }

      .kda-d {
        width: 0;
        background: #ffffff;
      }

      .kda-a {
        width: 0;
        background: #d6b598;
      }
    }

    .kda-desc {
      text-align: left;
      white-space: nowrap;
      margin-top: 2px;
      width: 100%;
      font-size: 14px;

      span {
        height: 24px;
        line-height: 24px;
      }

      .average {
        max-width: 30%;
        padding-left: 2px;
        line-height: 22px;
        overflow: hidden;
      }

      .kda {
        text-align: right;
        padding-right: 2px;
        float: right;
      }
    }

    .join-rate-bar {
      width: 100%;
      height: 10px;
      background-image: linear-gradient(to right, #eec494, #d6b598);
      border-radius: 5px;
      margin-top: 8px;

      .inner-bar {
        display: block;
        width: 0;
        height: 100%;
        background: #fff;
        border-radius: 5px;
      }
    }

    .join-rate {
      width: 100%;
      text-align: left;
      margin-top: 2px;
      font-size: 14px;
      white-space: nowrap;
      overflow: hidden;

      span {
        margin-left: 2px;
        margin-right: 12px;
      }
    }

    .attribute {
      width: 100%;
      height: 28px;
      line-height: 28px;
      border-radius: 16px;
      border: solid 2px #258dff;
      padding: 0 10px;
      margin-top: 10px;
      white-space: nowrap;
      overflow: hidden;
      color: #fff;
      font-size: 13px;
      font-weight: bold;

      .icon {
        margin-left: 4px;
        display: inline-block;
        width: 15px;
        height: 15px;
        background: url('~@/assets/active/lols12/new/sprite.png');

        // 上单
        &.icon-0 {
          background-position: -597px -433px;
        }

        // 打野
        &.icon-1 {
          background-position: -684px -433px;
        }

        // 中单
        &.icon-2 {
          background-position: -726px -433px;
        }

        // ADC
        &.icon-3 {
          background-position: -768px -433px;
        }

        // 辅助
        &.icon-4 {
          background-position: -641px -433px;
        }
      }

      .big {
        font-size: 16px;
      }

      .fll {
        float: left;
      }

      .flr {
        float: right;
      }
    }

    &::before {
      content: '';
      position: absolute;
      top: -5px;
      left: -5px;
      width: 13px;
      height: 13px;
      background: url('~@/assets/active/lols12/new/border-corner.png') no-repeat center center;
      background-size: 100% 100%;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      right: -5px;
      width: 13px;
      height: 13px;
      background: url('~@/assets/active/lols12/new/border-corner.png') no-repeat center center;
      background-size: 100% 100%;
      transform: rotate(180deg);
    }

    .bg {
      pointer-events: none;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      opacity: 0.13;
      background-image: linear-gradient(to bottom, #5ea2e6, #1841b6);
    }

    .rect {
      pointer-events: none;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;

      &::before {
        content: '';
        position: absolute;
        top: -5px;
        right: -5px;
        width: 13px;
        height: 13px;
        background: url('~@/assets/active/lols12/new/border-corner.png') no-repeat center center;
        background-size: 100% 100%;
        transform: rotate(90deg);
      }

      &::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: -5px;
        width: 13px;
        height: 13px;
        background: url('~@/assets/active/lols12/new/border-corner.png') no-repeat center center;
        background-size: 100% 100%;
        transform: rotate(-90deg);
      }
    }
  }
}
</style>