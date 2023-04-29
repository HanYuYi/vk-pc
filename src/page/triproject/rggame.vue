<template>
  <game-decorator :getGameAPI="ApiSetting.index.getRgGameUrl"
                  :gameUri="currentUri"
                  @on-load-finish="loadFinish"
                  class="game-container">

    <div v-if="lineVisible" class="line">
      <div class="line_item" :class="{'active': currentLine === 1}" @click="setLine(1)">线路一</div>
      <div class="line_item" :class="{'active': currentLine ===  2}" @click="setLine(2)">线路二</div>
    </div>

  </game-decorator>
</template>
<script>
import gameDecorator from "../../components/game-decorator"

export default {
  name: "rgGame",
  components: { gameDecorator },

  data () {
    return {
      lineVisible: false,
      currentLine: 1,
      currentUri: "",
      lineRow: {}
    }
  },
  methods: {
    loadFinish(row) {
      this.lineRow = row
      this.lineVisible = true
    },

    /**
     * 设置游戏线路
     * @param num
     */
    setLine(num) {
      this.currentLine = num
      if(num === 1) {
        this.currentUri = this.lineRow.url
      } else {
        this.currentUri = this.lineRow.url1
      }
    }
  }
}
</script>
<style scoped lang="less">
.game-container {
  /deep/ .wrapper {
    .line {
      position: absolute;
      top: 0;
      right: 28%;
      height: 40px;
      display: flex;
      .line_item {
        width: 80px;
        height: inherit;
        cursor: pointer;
        font-size: 14px;
        text-align: center;
        line-height: 40px;
        margin: 0 20px;
        color: #bacef1;
        &.active, &:hover {
          color: #fff;
        }
        &.active {
          border-bottom:2px solid #1ffdfa;
        }
      }
    }
  }
}
</style>
