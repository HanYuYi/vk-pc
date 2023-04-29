<template>
  <dl class="league-table">
    <template v-if="!dataLoading">
      <dt>
        <ul>
          <li v-for="(row, key) in scoreboardData" :key="key"
              :class="{active: selectedKey === key}"
              @click="selectedKey = key">
            {{ key }}组
          </li>
        </ul>
      </dt>
      <dd>
        <table border="0" align="center" cellspacing="0" width="100%">
          <thead>
          <tr>
            <th>{{ selectedKey }}组</th>
            <th class="align-left">国家</th>
            <th>场次</th>
            <th>胜平负</th>
            <th>进失球</th>
            <th>净胜球</th>
            <th>场均进/失球</th>
            <th>场均净胜</th>
            <th>积分</th>
          </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in scoreboardData[selectedKey]" :key="index">
              <td width="96">{{ index + 1 }}</td>
              <td class="align-left"><img :src="item.flag" alt="">{{ item.name }}</td>
              <td>{{ item.session }}</td>
              <td>{{ item.match_win }}/{{ item.match_equal }}/{{ item.match_lose }}</td>
              <td>{{ item.goals_scored }}/{{ item.goals_allowed }}</td>
              <td>{{ item.goal_differential }}</td>
              <td>{{ item.avg_goals_scored }}/{{ item.avg_goals_allowed }}</td>
              <td>{{ item.avg_goal_differential }}</td>
              <td>{{ item.score }}</td>
            </tr>
          </tbody>
        </table>
      </dd>
    </template>
    <div v-else class="world-cup2022-loading"></div>
  </dl>
</template>

<script>
export default {
  name: 'leagueTable',
  props: ["scoreboardData", "dataLoading"],
  data() {
    return {
      selectedKey: null
    }
  },
  watch: {
    // 战队信息：战队信息侧坐，当收到父组件的值时，选中第一条
    scoreboardData(data) {
      if (JSON.stringify(data) !== "{}") {}
      this.selectedKey = Object.keys(data)[0]
    },
  }
}
</script>

<style lang="less" scoped>
.league-table {
  min-height: 100px;
  display: flex;
  justify-content: space-between;
  dt {
    width: 241px;
    border-radius: 10px;
    background-color: #fff;
    ul {
      padding: 10px 0;
      li {
        text-indent: 30px;
        width: 220px;
        height: 48px;
        margin: 0 auto;
        font-size: 16px;
        line-height: 48px;
        color: #333;
        cursor: pointer;
        transition: all 0.2s;
        &:hover, &.active {
          color: #fff;
          border-radius: 10px;
          background-color: #710f2f;
        }
      }
    }
  }
  dd {
    width: 981px;
    table {
      line-height: 50px;
      font-size: 14px;
      font-weight: bold;
      white-space: nowrap;
      border-radius: 10px;
      overflow: hidden;
      background-color: #ffffff;
      tr {
        th {
          color: #540b23;
          background-color: #f3dada;
          &.align-left {
            text-align: left;
          }
        }
        td {
          text-align: center;
          color: #222;
          font-family: Roboto;
          &.align-left {
            text-align: left;
            max-width: 143px;
            text-overflow: ellipsis;
            overflow: hidden;
            img {
              width: 29px;
              margin-right: 8px;
            }
          }
        }
      }
      tbody {
        tr:nth-child(even) {
          background-color: #ededed;
        }
      }
    }
  }
}
</style>
