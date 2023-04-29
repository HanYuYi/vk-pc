<template>
  <div class="event-progress">

    <!-- 赛事进程tabs-->
    <ul class="world-cup2022-second-tabs event-tabs">
      <li v-for="(txt, index) in tabsList"
          :key="index"
          @click="tabActiveIndex = index"
          :class="{active: tabActiveIndex === index}">
        {{ txt }}
      </li>
    </ul>

    <div v-if="isLoad" class="event-panel">

      <keep-alive>
        <!-- 淘汰赛进程-->
        <knockout v-if="tabActiveIndex === 0" />

        <!-- 小组赛进程-->
        <groupMatch ref="groupmatch" :today="today" v-if="tabActiveIndex === 1" />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import groupMatch from './groupMatch'
import knockout from './knockout'

export default {
  name: 'eventProgress',
  props: ["isLoad", "today"],
  components: { groupMatch, knockout },
  data () {
    return {
      tabActiveIndex: 0,
      tabsList: ["淘汰赛进程", "小组赛进程"]
    }
  },
  computed: {
    isTT () {
      // 是否进入了淘汰赛
      if (this.today && new Date(this.today) > new Date('2022-12-03 03:00')) {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    tabActiveIndex (val) {
      if (val === 1) {
        if (this.today) {
          const timer = setTimeout(() => {
            if (this.$refs.groupmatch.activeKey !== '全部') {
              return
            }
            if (this.isTT) {
              this.$refs.groupmatch.dateSelector('2022-12-03')
            } else {
              this.$refs.groupmatch.dateSelector(this.today)
            }
            clearTimeout(timer)
          }, 500)
        }

      }
    }
  }
}
</script>

<style lang="less" scoped>
.event-progress {
  width: 1240px;
  margin: 34px auto 0;

  .event-panel {
    margin: 0 auto;
  }
}
</style>
