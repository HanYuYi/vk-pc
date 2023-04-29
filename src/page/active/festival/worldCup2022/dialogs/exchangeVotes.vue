<template>
  <el-dialog
    custom-class="world-cup2022-my-guess exchange-dialog"
    :visible="visible"
    v-dir-center="visible"
    width="340px"
    :append-to-body="true"
    :lock-scroll="true"
    @close="close"
    title="选票兑换"
    :close-on-click-modal="false">

    <div class="exchange-vote">
      <div class="table-wrapper">
        <table border="0" align="center" cellspacing="0" width="100%">
          <thead>
            <tr>
              <th>获取方式</th>
              <th>可兑换选票数量</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>电竞流水兑换</td>
              <td>{{ exchangeVotesData.waterCount }}</td>
            </tr>
            <tr>
              <td>每日首充兑换</td>
              <td>{{ exchangeVotesData.depositCount }}</td>
            </tr>
            <tr>
              <td>虚拟币首充任意金额</td>
              <td>{{ exchangeVotesData.virtualCount }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div @click="toExchange" class="take">
        <button class="take-btn">
          <span class="world-cup2022-gradient-color">一键兑换</span>
        </button>
      </div>

      <p v-if="exchangeVotesData" class="my-amount">
        可兑换选票总数：<span>{{ exchangeVotesData.waterCount + exchangeVotesData.depositCount + exchangeVotesData.virtualCount }}</span>
      </p>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'exchangeVotes',
  props: ["visible", "exchangeVotesData"],
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async toExchange() {
      if (this.loading) return
      this.loading = true

      const params = { type: 0, from: 0 }
      console.info("2022世界杯兑换选票入参：", params)
      const res = await this.$http(this.ApiSetting.active.worldCup2022.exchangeVote, params)
      console.info("2022世界杯兑换选票响应：", res)

      if (res.status === 1 && res.data) {
        this.$message({ message: res.message, type: 'success' })
        this.close()
        this.$emit("back")
      }
      this.loading = false
    },

    close() {
      this.$emit("update:visible", false)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .exchange-dialog {
  height: 350px;

  .el-dialog__body {
    height: 302px;
    position: relative;
    overflow: hidden;

    .exchange-vote {
      overflow: hidden;
      margin: 20px 10px 0;

      .table-wrapper {
        border-radius: 10px;
        overflow: hidden;
        height: 162px;
        background-color: #fff;
        table {
          font-size: 14px;
          line-height: 40px;
          text-align: center;
          tr {
            th {
              background-color: #f3dada;
              color: #a22541;
            }
            td {
              color: #333;
            }
          }
          tbody {
            tr {
              border-bottom: 1px solid #e6e6e6;
              &:nth-child(3) {
                border: 0;
              }
            }
          }
        }
      }
      .take {
        margin-top: 17px;
        height: 82px;
        text-align: center;
        background: url("../../../../../assets/active/worldCup2022/dialog_btn.png") no-repeat center top;
        .take-btn {
          margin-top: 5px;
          width: 170px;
          height: 42px;
          border: 0;
          font-size: 12.5px;
          font-weight: 600;
          background: none;
          outline: 0;
          cursor: pointer;
        }
        &:hover {
          background: url("../../../../../assets/active/worldCup2022/dialog_btn_hover.png") no-repeat center top;
        }
      }

      .my-amount {
        margin-top: -20px;
        font-size: 14px;
        font-weight: bold;
        line-height: normal;
        text-align: center;
        color: #fff;
        span {
          color: #fff69d;
        }
      }
    }
  }
}
</style>
