<template>
  <el-dialog
    :visible="visible"
    custom-class="dialog-panel"
    width="740px"
    @close="close"
    :close-on-click-modal="false">
    <div class="dialog-main">
      <h1>获奖记录</h1>
      <template v-if="noPrize">
        <div class="no-prize">开奖暂未开始，请耐心等待您的好运大奖</div>
      </template>
      <template v-else>
        <div v-if="!loading">
          <table border="0" align="center" cellspacing="0" class="award-record">
            <tr>
              <th>开奖时间</th><th>内容</th><th>兑换码</th>
            </tr>
            <tr v-for="(item, index) in awardRecord.list" :key="index">
              <td>{{ item.date }}</td>
              <td>{{ item.content }}{{ item.code ? '( 联系客服领取 )' : ''}}</td>
              <td @click="doCopy(item.code)">{{ item.code }}<span v-if="item.code">复制</span></td>
            </tr>
          </table>
<!--          <Page v-if="awardRecord.total > 0" :total="awardRecord.total" :page-size="pagesize"-->
<!--                :current.sync="awardRecord.currentpage"-->
<!--                @on-change="changePage($event)"-->
<!--                class="pagination">-->
<!--          </Page>-->
        </div>
        <div v-else class="loading"></div>
      </template>
    </div>
  </el-dialog>
</template>

<script>

export default {
  name: 'dotati10AwardRecordModal',
  props: {
    visible: {
      type: Boolean,
      require: true,
      default: false
    },
    noPrize: {
      type: Boolean,
      require: true,
      default: false
    }
  },
  data () {
    return {
      loading: false,
      pagesize: 5,
      currentpage: 1,
      awardRecord: {
        total: 0,
        list: []
      }
    }
  },
  watch: {
    visible (bool) {
      if (bool && !this.noPrize) {
        this.currentpage = 1
        this.getAwardRecordRow(0)
      }
    }
  },
  methods: {
    // 获取记录
    getAwardRecordRow (page) {
      this.loading = true
      this.$http(this.ApiSetting.active.dotati10HistoryRecord, { page })
        .then(response => {
          if (response.status === 1 && response.data) {
            this.awardRecord = response.data
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    // 翻页
    changePage (page) {
      this.currentpage = page
      this.getAwardRecordRow(this.currentpage)
    },
    // 复制兑换码
    doCopy (secret) {
      this.$copyText(secret).then(() => {
        this.$message({ message: '兑换码复制成功', type: 'success' })
      }, () => {
        this.$message({ message: '复制失败', type: 'warning' })
      })
    },
    close () {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .dialog-panel {
  height: 470px!important;
  .el-dialog__body {
    width: 592px!important;
    margin: 20px auto 0!important;
    .dialog-main {
      text-align: center;
      min-height: 300px;
      .award-record {
        width: 100%;
        margin-top: 30px;
        th, td {
          line-height: 48px;
          color: #f8e8b9;
        }
        th {
          font-size: 18px;
          background-color: rgba(154,106,64,0.2);
          font-weight: normal;
        }
        td {
          box-sizing: border-box;
          font-size: 14px;
          border-bottom: 1px solid #2e2e2e;
          &:last-child {
            text-decoration: underline;
            span {
              cursor: pointer;
            }
          }
        }
      }
      // 分页器
      .pagination {
        .ivu-page-item, .ivu-page-item-jump-next, .ivu-page-item-jump-prev, .ivu-page-next, .ivu-page-prev {
          border: 0;
          font-size: 16px;
          a {
            font-size: 16px;
            color: #adadae;
            &:hover {
              color: #f8e8b9;
            }
          }
        }
        .ivu-page-next, .ivu-page-prev {
          a {
            i {
              height: 17px;
            }
          }
        }
        .ivu-page-item-active {
          color: #f8e8b9;
          a {
            color: #f8e8b9;
            &:hover {
              color: #f8e8b9;
            }
          }
        }
      }

      .loading {
        display: inline-block;
        width: 40px;
        height: 40px;
        margin-top: 130px;
        vertical-align: middle;
        background: url("../../../assets/btn-loader.gif") no-repeat center;
        background-size: 100% 100%;
      }
      .no-prize {
        line-height: 350px;
        color: #f8e8b9;
      }
    }
  }
}

</style>
