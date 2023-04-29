<template>
  <el-dialog
    :visible="visible !== 0"
    custom-class="dialog-panel"
    width="414px"
    @close="close"
    :close-on-click-modal="false">

    <!-- 中将记录-->
    <div v-if="visible === 1" class="record">
      <h1></h1>
      <div class="table-warper">
        <table cellspacing="0">
          <tr>
            <th>日期</th><th>奖品</th><th>状态</th>
          </tr>
          <tr v-for="(item, index) in recordRow.list" :key="index">
            <td width="18%">{{ item.date }}</td>
            <td>{{ item.content }}</td>
            <td width="18%" @click="item.is_send ? null : toPrizePanel(item)" v-html="item.is_discount ? '已折现' : item.is_send ? '已兑换' : '<span>未兑换</span>'"></td>
          </tr>
        </table>
      </div>
      <div class="pager">
        <i class="prev" :class="{diabled: recordPage <= 1}"
           @click="recordPage <= 1 ? null : getRecordList(recordPage-1)"></i>
        {{ recordPage }}/{{ pagerNextVal }}
        <i class="next" :class="{diabled: recordPage >= pagerNextVal}"
           @click="recordPage >= pagerNextVal ? null : getRecordList(recordPage+1)"></i>
      </div>
    </div>

    <!-- 中将奖品-->
    <div v-if="visible === 2" class="prize">
      <h1></h1>
      <!-- 查看抽奖奖品-->
      <img :src="luckDrawData.item_url" alt="" class="prize-img">
      <small class="prize-title">{{ luckDrawData.item_name }}</small>
      <div class="separate"><i v-for="num in 38" :key="num"></i></div>
      <h2 v-if="luckDrawData.secret && luckDrawData.secret.length" class="desc">
        使用兑换码联系客服领取或折现 <p>兑换码：<span @click="doCopy(luckDrawData.secret)">{{ luckDrawData.secret }} 复制</span></p>
      </h2>
      <h2 v-else class="desc">
        彩金直接转入您的主钱包
      </h2>
      <button v-if="luckDrawData.secret && luckDrawData.secret.length" @click="openKfWindow()">联系客服</button>
      <button v-else @click="close">知道了</button>
    </div>

    <!-- 所有奖品-->
    <div v-if="visible === 3" class="all-prizes"></div>

  </el-dialog>
</template>

<script>
export default {
  name: 'christmas2021Dialog',
  props: {
    visible: {
      type: Number,
      required: true
    },
    prizeId: {
      type: Number
    }
  },
  data () {
    return {
      recordPage: 1,
      recordPageSize: 8,
      recordRow: {
        total: 0,
        list: []
      },
      luckDrawData: {},
      loadingRecord: false
    }
  },
  watch: {
    visible (num) {
      if (num === 1) {
        this.getRecordList(1)
      }
      if (num === 2) {
        this.getLuckDrawData()
      }
    }
  },
  computed: {
    pagerNextVal () {
      return (this.recordRow.total / this.recordPageSize).toString().includes('.') ?
        Number.parseInt(this.recordRow.total / this.recordPageSize) + 1 :
        this.recordRow.total / this.recordPageSize
    }
  },
  methods: {
    toPrizePanel (row) {
      this.$emit('update:prizeId', row.item_id)
      this.$emit('update:visible', 2)
    },
    close () {
      this.$emit('update:prizeId', 0)
      this.recordRow = { total: 0, list: [] }
      this.luckDrawData = {}
      this.$emit('update:visible', 0)
    },
    doCopy (code) {
      this.$copyText(code)
        .then(() => {
          this.$message({ message: '已复制', type: 'success' })
        },
          () => {
            this.$message({ message: this.$t('Copy_the_failure'), type: 'warning' })
        })
    },
    // 获取中奖记录
    getRecordList (page) {
      if (this.loadingRecord) return false
      this.loadingRecord = true
      this.recordPage = page
      this.$http(this.ApiSetting.active.christmas2021HistoryRecords, {
        page: this.recordPage,
        page_size: this.recordPageSize
      })
        .then(({status, data}) => {
            if (status === 1) {
              this.recordRow = data
            } else {
              this.recordRow = {}
            }
            this.loadingRecord = false
        })
        .catch(() => {
          this.recordRow = {}
          this.loadingRecord = false
        })
    },
    // 获取奖品
    getLuckDrawData () {
      this.$http(this.ApiSetting.active.christmas2021CheckPrizes, {
        id: this.prizeId
      })
        .then(({status, data}) => {
          if (status === 1) {
            this.luckDrawData = data
          }
        })
    }
  }
}
</script>

<style lang="less" scoped>
@icon: url("../../../assets/active/christmas2021/icon.png") no-repeat;

/deep/ .dialog-panel {
  height: 582px;
  border-radius: 20px;
  background: url('../../../assets/active/christmas2021/dialog.png') no-repeat;
  background-size: 100% 100%;
  .el-dialog__header {
    background-color: transparent;
    .el-dialog__headerbtn {
      width: 24px;
      height: 24px;
      top: 26px;
      right: 26px;
      .el-dialog__close {
        width: 24px;
        height: 24px;
        background: @icon;
        background-position: -971px -40px;
      }
      &:hover {
        .el-dialog__close {
          background-position: -971px -110px;
        }
      }
    }
  }

  h1 {
    height: 25px;
    margin: 0 auto;
    background: @icon;
  }
  .el-dialog__body {
    padding: 0;
    .record {
      h1 {
        width: 170px;
        background-position: -147px -262px;
      }
      .table-warper {
        width: 350px;
        height: 396px;
        overflow: auto;
        margin: 18px auto 0;
        table {
          width: 100%;
          font-size: 18px;
          line-height: 44px;
          text-align: center;
          color: #fff;
          border: 0;
          tr {
            th {
              font-weight: normal;
            }
            td {
              span {
                color: #ffc8a4;
                text-decoration: underline;
                cursor: pointer;
              }
            }
          }
        }
      }
      .pager {
        margin-top: 29px;
        display: flex;
        justify-content: center;
        font-size: 18px;
        line-height: 22px;
        color: #fff;
        i {
          display: inline-block;
          width: 15px;
          height: 22px;
          background: @icon;
          cursor: pointer;
        }
        .prev {
          background-position: -794px -103px;
          margin-right: 32px;
          &.diabled {
            background-position: -794px -40px;
            cursor: auto;
          }
        }
        .next {
          background-position: -869px -103px;
          margin-left: 32px;
          &.diabled {
            background-position: -869px -40px;
            cursor: auto;
          }
        }
      }
    }

    .prize {
      h1 {
        width: 140px;
        background-position: -162px -305px;
      }
      .prize-img {
        display: block;
        height: 200px;
        margin: 27px auto 0;
      }
      .prize-title {
        display: block;
        font-size: 18px;
        line-height: 18px;
        text-align: center;
        color: #fff;
        margin-top: 25px;
      }
      .separate {
        height: 5px;
        margin-top: 22px;
        text-align: center;
        i {
          display: inline-block;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #ffc8a4;
          margin: 0 2px;
        }
      }
      .desc {
        display: flex;
        width: 257px;
        height: 50px;
        margin: 41px auto 0;
        justify-content: center;
        flex-wrap: wrap;
        align-items: center;
        font-size: 18px;
        text-align: center;
        color: #fff;
        font-weight: normal;
        span {
          color: #ffc8a4;
          text-decoration: underline;
          cursor: pointer;
        }
      }
      button {
        display: block;
        width: 120px;
        height: 40px;
        margin: 32px auto 0;
        border-radius: 20px;
        box-shadow: 0px 2px 4px 0 rgba(0, 0, 0, 0.2), 0px 2px 8px 0 rgba(0, 0, 0, 0.1), inset 0px 2px 3px 0 #fefce1, inset 0px -2px 2px 0 #b0693b;
        background-image: linear-gradient(to bottom, #fff, #ffc7a2);
        font-size: 16px;
        font-weight: bold;
        color: #c83344;
        border: 0;
        outline: 0;
        cursor: pointer;
        transition: all 0.3s;
        &:hover {
          background-image: linear-gradient(to top, #ff8b3e, #ff4c4c);
          color: #ffffff;
        }
      }
    }

    .all-prizes {
      width: 302px;
      height: 417px;
      margin: 26px auto 0;
      background: url('../../../assets/active/christmas2021/all_prizes.png') no-repeat;
    }
  }
}
</style>
