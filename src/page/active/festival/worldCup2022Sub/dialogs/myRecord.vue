<template>
  <el-dialog
      custom-class="world-cup202-sub-dialog my-record-dialog"
      :visible="visible"
      v-dir-center="visible"
      width="680px"
      :append-to-body="true"
      :lock-scroll="true"
      @close="close"
      title="竞猜记录"
      :close-on-click-modal="false">

    <div class="my-record">

      <div class="table-form">

        <div class="form-item date">
          <h6>日期：</h6>
          <date-picker class="time-date"
                       type="date"
                       format="yyyy-MM-dd"
                       v-model="recordDate"
                       @on-change="currentPage = 1;getRecordList()"/>
        </div>
      </div>

      <div class="content">
        <table border="0" align="center" cellspacing="0" width="100%">
          <thead>
            <tr>
              <th>赛事</th>
              <th>队伍名称</th>
              <th>竞猜队伍</th>
              <th>竞猜时间</th>
              <th>竞猜结果</th>
            </tr>
          </thead>
          <tbody v-if="!loading && recordInfo.list && recordInfo.list.length">
            <tr v-for="(item, index) in recordInfo.list" :key="index">
              <td width="15%">
                <Tooltip class="tooltip_2022" :content="item.game_name" placement="bottom-start">
                  <span class="txt">{{ item.game_name }}</span>
                </Tooltip>
              </td>
              <td width="30%">{{ item.team_name_1 }}VS{{ item.team_name_2 }}</td>
              <td width="20%">{{ item.result }}</td>
              <td width="20%">{{ item.apply_time }}</td>
              <td width="15%">
                <template v-if="item.is_win === -1">--,--</template>
                <i v-if="item.is_win === 1" class="win"></i>
                <i v-if="item.is_win === 0" class="lose"></i>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="loading" class="world-cup2022-sub-loading"></div>
        <div v-if="!loading && (!recordInfo.list || !recordInfo.list.length)"
             class="empty-data"
             style="height: calc(100% - 40px)">
          <i></i><p class="empty-txt">暂无数据</p>
        </div>
      </div>

      <div class="page">
        <Page
            prev-text="<"
            next-text=">"
            :total="recordInfo.total"
            :page-size="PAGE_SIZE"
            :current.sync="currentPage"
            @on-change="getRecordList">
        </Page>
      </div>

    </div>
  </el-dialog>
</template>

<script>
import { formatDate } from '@/utils/util'

export default {
  name: 'myRecord',
  props: ["visible"],
  data() {
    return {
      loading: false,
      recordDate: '',
      currentPage: 1,
      PAGE_SIZE: 4,
      recordInfo: {
        list: [],
        total: 0
      }
    }
  },
  watch: {
    visible(bool) {
      if (bool) {
        this.recordDate = ''
        this.currentPage = 1
        this.recordInfo.list = []
        this.recordInfo.total = 0
        this.getRecordList()
      }
    }
  },
  methods: {
    /**
     * 查询我的申请记录
     * @return {Promise<void>}
     */
    async getRecordList() {
      this.loading = true
      const params = {
        date: formatDate(this.recordDate, "yyyy-MM-dd"),
        page: this.currentPage,
        page_size: this.PAGE_SIZE
      }
      console.info("2022世界杯四重礼申请记录入参：", params)
      try {
        const res = await this.$http(this.ApiSetting.active.worldCup2022Sub.worldCupChosenApplyList, params)
        console.info("2022世界杯四重礼申请记录响应：", res)

        if (res.status === 1 && res.data) {
          this.recordInfo = res.data
        } else {
          this.currentPage = 1
          this.recordInfo.list = []
          this.recordInfo.total = 0
        }
        this.loading = false
      } catch (error) {
        console.info(error)
        this.recordInfo.list = []
        this.recordInfo.total = 0
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
/deep/ .my-record-dialog {
  height: 390px;
  .el-dialog__body {
    height: 342px;
    .my-record {
      overflow: hidden;

      .table-form {
        margin-top: 20px;
        display: flex;
        color: #ffffff;
        .form-item {
          display: flex;
          h6 {
            line-height: 30px;
            font-weight: normal;
            font-size: 14px;
          }
        }

        .date {
          margin-left: 29px;
          .ivu-date-picker {
            width: 115px;
            .ivu-input-wrapper {
              .ivu-icon-ios-close-circle {
                right: 0;
              }
              .ivu-input {
                padding-right: 24px;
                height: 30px;
                line-height: 28px;
                border-radius: 6px;
                box-shadow: 0px 1px 1px 0 rgba(255, 0, 57, 0.3), inset 0px 1px 3px 0 rgba(0, 0, 0, 0.4);
                border-color: rgba(0, 0, 0, 0.06);
                background-color: rgba(0,0,0,0.2);
              }
              .ivu-input-icon {
                width: 30px;
                height: 30px;
                background: url("../../../../../assets/active/worldCup2022/date_icon.png") no-repeat center center;
                cursor: pointer;
                &:hover {
                  background: url("../../../../../assets/active/worldCup2022/date_close.png") no-repeat center center;
                  background-size: 15px;
                }
              }
            }
            .ivu-select-dropdown {
              border: 0;
              border-radius: 6px;
              box-shadow: 0px 15px 24px 0 rgba(0, 0, 0, 0.31);
              overflow: hidden;
              background-color: #fff;
              .ivu-picker-panel-body-wrapper {
                .ivu-picker-panel-body {
                  color: #333;
                  .ivu-date-picker-header {
                    background-color: #fff;
                    .ivu-picker-panel-icon-btn {
                      opacity: 0.8;
                      i {
                        transform: scale(0.7,0.7);
                      }
                    }
                    .ivu-date-picker-header-label {
                      &:hover {
                        color: #a12541;
                      }
                    }
                    .ivu-date-picker-prev-btn-arrow-double {
                      &:hover {
                        .ivu-icon-ios-arrow-back {
                          background-position: -724px -44px;
                        }
                      }
                    }
                    .ivu-date-picker-prev-btn-arrow {
                      &:hover {
                        .ivu-icon-ios-arrow-back {
                          background-position: -668px -44px;
                        }
                      }
                    }
                    .ivu-date-picker-next-btn-arrow-double {
                      &:hover {
                        .ivu-icon-ios-arrow-forward {
                          background-position: -700px -44px;
                        }
                      }
                    }
                    .ivu-date-picker-next-btn-arrow {
                      &:hover {
                        .ivu-icon-ios-arrow-forward {
                          background-position: -645px -44px;
                        }
                      }
                    }
                  }
                  .ivu-picker-panel-content {
                    .ivu-date-picker-cells-header {
                      background-color: transparent;
                      span {
                        color: #333333;
                      }
                    }
                    .ivu-date-picker-cells-cell {
                      &:hover {
                        em {
                          color: #a12541;
                        }
                      }
                      &.ivu-date-picker-cells-cell-today {
                        em {
                          &:after {
                            background: #a12541;
                          }
                        }
                      }
                      &.ivu-date-picker-cells-cell-selected {
                        em {
                          box-shadow: none;
                          border: 0;
                          color: #fff;
                          background-color: #a22541;
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

      .content {
        height: 203px;
        margin: 20px 10px 0;
        background-color: #fff;
        border-radius: 10px;
        overflow: hidden;
        position: relative;
        table {
          text-align: center;
          tr {
            th {
              line-height: 40px;
              background-color: #f3dada;
              font-size: 14px;
              color: #a22541;
            }
            td {
              height: 40px;
              line-height: 40px;
              background-color: #ffffff;
              font-size: 14px;
              color: #333;
              white-space: nowrap;
              padding: 0 5px;
              &:first-child {
                padding-left: 10px;
                .txt {
                  display: block;
                  width: 90px;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  overflow: hidden;
                }
              }
              &:last-child {
                padding-right: 10px;
                .win, .lose {
                  display: block;
                  height: 33px;
                }
                .win {
                  background: url("../../../../../assets/active/worldCup2022Sub/record_win.png") no-repeat;
                  background-position: center;
                }
                .lose {
                  background: url("../../../../../assets/active/worldCup2022Sub/record_lose.png") no-repeat;
                  background-position: center;
                }
              }
            }
          }
          tbody {
            tr {
              border-bottom: 1px solid #e6e6e6;
              &:nth-child(4) {
                border: 0;
              }
            }
          }
        }
        .world-cup2022-sub-loading {
          position: absolute;
          top: 40px;
          width: 100%;
          height: 160px;
          background-size: 32px 32px;
        }
        .empty-data {
          width: 100%;
          height: inherit;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          i {
            display: block;
            width: 56px;
            height: 40px;
            background-image: url("../../../../../assets/active/worldCup2022/empty_data.png");
          }
          .empty-txt {
            width: inherit;
            margin-top: 9px;
            font-size: 14px;
            line-height: 14px;
            color: #999;
          }
        }
      }

      .page {
        .ivu-page {
          padding: 0;
          margin: 18px 0 0;
          text-align: center;
          .ivu-page-prev, .ivu-page-next {
            min-width: 30px;
            border: 0;
            border-radius: 0;
            a {
              font-size: 16px;
              color: #fd6b84;
              line-height: 30px;
            }
          }
          .ivu-page-item {
            border-radius: 4px;
            min-width: 30px;
            a {
              color: #fd6b84;
            }
            &:hover, &.ivu-page-item-active {
              box-shadow: 0px 1px 1px 0 rgba(255, 0, 57, 0.5), inset 0px 1px 3px 0 rgba(0, 0, 0, 0.4);
              border-color: rgba(0, 0, 0, 0.06);
              background-color: rgba(0,0,0,0.2);
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
