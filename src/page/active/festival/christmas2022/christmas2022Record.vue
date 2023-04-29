<template>
  <el-dialog
      custom-class="christmas2022-record"
      :visible="visible"
      v-dir-center="visible"
      width="906px"
      :append-to-body="true"
      :lock-scroll="true"
      @close="close"
      title=""
      :close-on-click-modal="false">

    <div class="my-record">
      <table v-if="!loading && recordList && recordList.length" border="0" align="center" cellspacing="0" width="100%">
        <thead>
          <tr>
            <th>奖品名称</th>
            <th>许愿时间</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(record, index) in recordList" :key="index">
            <td>{{ record.goods_name }}</td>
            <td>{{ record.create_time }}</td>
          </tr>
        </tbody>
      </table>
      <div v-if="loading" class="record-loading"></div>
      <div v-if="!loading && (!recordList || !recordList.length)" class="empty-data">暂无数据</div>

      <!-- 分页器-->
      <div v-if="!loading && total > 0" class="page">
        <Page
            prev-text="<"
            next-text=">"
            :total="total"
            :page-size="pageSize"
            :current.sync="currentPage"
            @on-change="getRecordData">
        </Page>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'christmas2022Record',
  props: ["visible"],
  data() {
    return {
      loading: false,
      recordList: [],
      currentPage: 1,
      pageSize: 5,
      total: 0
    }
  },
  watch: {
    visible(bool) {
      if (bool) {
        this.currentPage = 1
        this.recordList = []
        this.total = 0
        this.getRecordData()
      }
    }
  },

  methods: {
    async getRecordData() {
      this.loading = true
      const params = {
        page: this.currentPage,
        page_size: this.pageSize
      }
      console.info("2022双旦活动记录入参：", params)
      try {
        const res = await this.$http(this.ApiSetting.active.christmas2022.christmasJoinRecords, params)
        console.info("2022双旦活动记录：", res)
        if (res.status === 1 && res.data) {
          this.recordList = res.data.list
          this.total = res.data.total
        } else {
          this.currentPage = 1
          this.recordList = []
          this.total = 0
        }
        this.loading = false
      } catch (error) {
        console.info(error)
        this.recordList = []
        this.total = 0
        this.loading = false
      }
    },

    close() {
      this.$emit("update:visible", false)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .christmas2022-record {
  height: 611px;
  border: 0;
  background: transparent url("../../../../assets/active/christmas2022/record_bg.png") no-repeat center top;
  overflow: hidden;
  box-shadow: none;

  .el-dialog__header {
    height: 0;
    .el-dialog__headerbtn {
      width: 39px;
      height: 32px;
      top: 18px;
      right: 37px;
      .el-dialog__close {
        width: inherit;
        height: inherit;
        background: transparent url("../../../../assets/active/christmas2022/dialog_close.png");
      }
    }
  }

  .el-dialog__body {
    height: inherit;
    padding: 0;

    .my-record {
      width: 730px;
      margin: 0 auto;

      table {
        margin-top: 180px;
        text-align: center;
        font-size: 16px;
        color: #fff;
        tr {
          th {
            line-height: 40px;
            background-color: #cf3637;
            &:first-child {
              border-top-left-radius: 6px;
              border-bottom-left-radius: 6px;
            }
            &:last-child {
              border-top-right-radius: 6px;
              border-bottom-right-radius: 6px;
            }
          }
          td {
            box-sizing: border-box;
            line-height: 46px;
            border-bottom: 2px dashed rgba(255, 255, 255, 0.3);
          }
        }
      }

      .record-loading {
        display: block;
        margin-top: 180px;
        height: 280px;
        background: url("../../../../assets/btn-loader.gif") no-repeat center;
        background-size: 64px 64px;
      }

      .empty-data {
        margin-top: 180px;
        line-height: 280px;
        font-size: 16px;
        text-align: center;
        color: #fff;
      }

      .page {
        .ivu-page {
          padding: 0;
          margin: 23px 0 0;
          text-align: center;
          .ivu-page-prev, .ivu-page-next {
            min-width: 30px;
            border: 0;
            border-radius: 0;
            a {
              font-size: 14px;
              color: #fd6b84;
              line-height: 28px;
            }
          }
          .ivu-page-item {
            border-radius: 4px;
            min-width: 30px;
            box-shadow: none;
            border: 0;
            line-height: 28px;
            a {
              color: #fd6b84;
            }
            &:hover, &.ivu-page-item-active {
              background-color: #cf3637;
              a {
                color: #ffffff;
              }
            }
          }
          .ivu-page-item-jump-prev, .ivu-page-item-jump-next {
            border: 0;
            a {
              i {
                &.ivu-icon-ios-arrow-back {
                  background: none;
                  position: relative;
                  &:before {
                    position: absolute;
                    inset: 0;
                    content: "<<";
                    line-height: 12px;
                    color: #fd6b84;
                  }
                }
                &.ivu-icon-ios-arrow-forward {
                  background: none;
                  position: relative;
                  &:before {
                    position: absolute;
                    inset: 0;
                    content: ">>";
                    line-height: 12px;
                    color: #fd6b84;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
