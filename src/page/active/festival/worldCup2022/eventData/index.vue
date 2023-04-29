<template>
  <div class="event-data">

    <!-- 赛事数据tabs-->
    <ul class="world-cup2022-second-tabs event-tabs">
      <li v-for="(txt, index) in tabsList"
          :key="index"
          @click="tabActiveIndex = index"
          :class="{active: tabActiveIndex === index}">
        {{ txt }}
      </li>
    </ul>

    <div class="event-panel">
      <!-- 世界杯首页-->
      <dataHome ref="datahome" v-show="tabActiveIndex === 0"
                :today="today"
                :scoreboardData="scoreboardMap"
                :dataLoading="loading" />

      <!-- 积分榜-->
      <leagueTable v-show="tabActiveIndex === 1" :scoreboardData="scoreboardMap" :dataLoading="loading" />

      <!-- 球馆介绍-->
      <arenaShow v-if="tabActiveIndex === 2"/>
    </div>

  </div>
</template>

<script>
import dataHome from './dataHome'
import leagueTable from './leagueTable'
import arenaShow from './arenaShow'

export default {
  name: 'eventData',
  props: ['today'],
  components: { dataHome, leagueTable, arenaShow },
  data() {
    return {
      tabActiveIndex: 0,
      tabsList: [
        "世界杯首页",
        "积分榜",
        "球馆介绍"
      ],
      scoreboardMap: {},
      loading: false
    }
  },
  mounted () {
    this.getWorldCupScoreboardData()
  },
  methods: {
    // 获取积分榜信息，世界杯首页、积分榜 共用
    async getWorldCupScoreboardData () {
      this.loading = true
      const res = await this.$http(this.ApiSetting.active.worldCup2022.worldCupScoreboard)
      console.info("初始化2022世界杯积分榜信息", res)

      if (res.status === 1 && res.data) {
        this.scoreboardMap = res.data
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.event-data {
  width: 1240px;
  margin: 34px auto 0;

  .event-panel {
    margin: -8px auto 0;
  }
}
</style>
