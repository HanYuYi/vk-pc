<template>
  <el-dialog
      custom-class="world-cup202-by-four-gifts-dialog my-record-dialog"
      :visible="visible"
      v-dir-center="visible"
      width="680px"
      :append-to-body="true"
      :lock-scroll="true"
      @close="close"
      title="申请记录"
      :close-on-click-modal="false">

    <div class="my-record">

      <div class="table-form">

        <div class="form-item date">
          <h6>日期：</h6>
          <date-picker class="time-date"
                       type="date"
                       format="yyyy-MM-dd"
                       v-model="recordDate" />
        </div>

        <div class="form-item wallet-type">
          <h6>转入钱包：</h6>
          <Select v-model="typeSelect"
                  class="type-select">
            <Option v-for="item in allRecordTypeList"
                    :value="item.code"
                    :key="item.code">{{ item.name }}
            </Option>
          </Select>
        </div>
      </div>

      <div class="content">
        <table border="0" align="center" cellspacing="0" width="100%">
          <thead>
            <tr>
              <th>赛事</th>
              <th>队伍名称</th>
              <th>转入钱包</th>
              <th>注单号</th>
              <th>状态</th>
              <th>申请时间</th>
            </tr>
          </thead>
          <tbody v-if="!loading && recordInfo.data.data && recordInfo.data.data.length">
            <tr v-for="(item, index) in recordInfo.data.data" :key="index">
              <td>{{ item.team_name }}</td>
              <td>{{ item.type }}</td>
              <td>{{ item.num }}</td>
              <td>{{ item.date }}</td>

              <td v-if="item.status === 1">已派发</td>
              <td v-if="item.status === 2">待审请</td>

              <td>{{ item.date }}</td>
            </tr>
          </tbody>
        </table>
        <div v-if="loading" class="world-cup2022-by-four-gifts-loading"></div>
        <div v-if="!loading && (!recordInfo.data.data || !recordInfo.data.data.length)"
             class="empty-data"
             style="height: calc(100% - 40px)">
          <i></i><p class="empty-txt">暂无数据</p>
        </div>
      </div>

      <div class="page">
        <Page
            prev-text="<"
            next-text=">"
            :total="recordInfo.data.total"
            :page-size="pageSize"
            :current.sync="currentPage">
        </Page>
      </div>

    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'myRecord',
  props: ["visible", "walletTypeList"],
  data() {
    return {
      loading: false,
      recordDate: '',
      typeSelect: 'ALL',
      currentPage: 1,
      pageSize: 4,
      recordInfo: {
        data: {
          data: [],
          total: 0
        }
      }
    }
  },
  computed: {
    allRecordTypeList() {
      const cloneList = [...this.walletTypeList]
      cloneList.unshift({ name: '全部', code: 'ALL' })
      return cloneList
    }
  },
  watch: {
    visible(bool) {
      if (bool) {
        this.typeSelect = 'ALL'
        this.recordDate = ''
        this.recordInfo.data.data = []
        this.getRecordList()
      }
    },
    typeSelect() {
      this.currentPage = 1
      this.getRecordList()
    },
    guessDate() {
      this.currentPage = 1
      this.getRecordList()
    },
    currentPage() {
      this.getRecordList()
    }
  },
  methods: {
    // 查询我的申请记录
    async getRecordList() {
      this.loading = true
      this.loading = false
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
                box-shadow: 0px 1px 1px 0 rgba(255, 0, 57, 0.5), inset 0px 1px 3px 0 rgba(0, 0, 0, 0.4);
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

        .wallet-type {
          margin-left: 24px;
          .type-select {
            .ivu-select-selection {
              width: 88px;
              height: 30px;
              line-height: 28px;
              border-radius: 6px;
              box-shadow: 0px 1px 1px 0 rgba(255, 0, 57, 0.5), inset 0px 1px 3px 0 rgba(0, 0, 0, 0.4);
              border-color: rgba(0, 0, 0, 0.06);
              background-color: rgba(0,0,0,0.2);
              .ivu-select-placeholder, .ivu-select-selected-value {
                height: 30px;
                line-height: 28px;
              }
              .ivu-icon {
                background: url("../../../../../assets/active/worldCup2022/select_arrow.png") no-repeat;
                background-position: 2px 1.5px!important;
              }
            }
            .ivu-select-dropdown {
              border-radius: 6px;
              border: 0;
              background-color: #ffffff;
              box-shadow: 0px 15px 24px 0 rgba(0, 0, 0, 0.31);
              .ivu-select-dropdown-list {
                .ivu-select-item {
                  padding: 7px 10px;
                  color: #333;
                  font-size: 12px;
                  &:hover, &.ivu-select-item-selected {
                    background-color: #f3dada;
                    color: #a22541;
                    font-weight: bold;
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
              line-height: 40px;
              background-color: #ffffff;
              font-size: 14px;
              color: #333;
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
        .world-cup2022-by-four-gifts-loading {
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
