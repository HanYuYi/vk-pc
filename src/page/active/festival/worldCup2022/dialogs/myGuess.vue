<template>
  <el-dialog
    :custom-class="`world-cup2022-my-guess my-guess-dialog ${guessInfo.my_bonus || guessInfo.is_apply ? 'big' : ''}`"
    :visible="visible"
    v-dir-center="visible"
    width="680px"
    :append-to-body="true"
    :lock-scroll="true"
    @close="close"
    title="我的竞猜"
    :close-on-click-modal="false">

    <div class="my-guess">

      <div class="table-form">
        <div class="form-item type">
          <h6>预测名次：</h6>
          <Select v-model="typeSelect"
                  class="type-select">
            <Option v-for="item in allGuessType"
                    :value="item.value"
                    :key="item.id">{{ item.key }}
            </Option>
          </Select>
        </div>

        <div class="form-item date">
          <h6>时间：</h6>
          <date-picker class="time-date"
                       type="date"
                       format="yyyy-MM-dd"
                       v-model="guessDate" />
        </div>
      </div>

      <div class="content">
        <table border="0" align="center" cellspacing="0" width="100%">
          <thead>
          <tr>
            <th class="align-left">球队名称</th>
            <th>预言名次</th>
            <th>投票数</th>
            <th>投票时间</th>
            <th>彩金金额</th>
            <th>状态</th>
          </tr>
          </thead>
          <tbody v-if="!loading && guessInfo.data.data && guessInfo.data.data.length">
            <tr v-for="(item, index) in guessInfo.data.data" :key="index">
              <td class="align-left"><img :src="item.flag" alt="">{{ item.team_name }}</td>
              <td>{{item.type}}</td>
              <td>{{ item.num }}</td>
              <td>{{ item.date }}</td>
              <td>{{ item.status === 0 ? '--' : formatNumber(item.amount) }}元</td>
              <td v-if="item.status === 0">未开奖</td>
              <td v-if="item.status === 1" class="fail">竞猜失败</td>
              <td v-if="item.status === 2" class="success">竞猜成功</td>
            </tr>
          </tbody>
        </table>
        <div v-if="loading" class="world-cup2022-loading"></div>
        <div v-if="!loading && (!guessInfo.data.data || !guessInfo.data.data.length)"
             class="world-cup2022-empty-data"
             style="height: calc(100% - 40px)">
          <i></i><p class="empty-txt">暂无数据</p>
        </div>
      </div>

      <div class="page">
        <Page
          prev-text="<"
          next-text=">"
          :total="guessInfo.data.total"
          :page-size="pageSize"
          :current.sync="currentPage">
        </Page>
      </div>

      <template v-if="guessInfo.my_bonus || guessInfo.is_apply">
        <div @click="toTake" class="take" :class="{disabled: guessInfo.is_apply}">
          <button class="take-btn">
            <span class="world-cup2022-gradient-color">一键领取</span>
          </button>
        </div>

        <p class="my-amount">
          我的彩金总额：<span>{{ formatNumber(guessInfo.my_bonus) }}</span>元
        </p>
      </template>
    </div>

  </el-dialog>
</template>

<script>
import { formatNumberSplit, formatDate } from '@/utils/util'

export default {
  name: 'myGuess',
  props: ["visible", "guessType"],
  data() {
    return {
      loading: false,
      typeSelect: 0,
      guessDate: '',
      currentPage: 1,
      pageSize: 4,
      guessInfo: {
        data: {
          data: [],
          total: 0
        },
        my_bonus: 0
      },
      takeLoading: false
    }
  },
  computed: {
    allGuessType() {
      const cloneGuess = [...this.guessType]
      cloneGuess.unshift({ id: 0, key: '全部预测', value: 0 })
      return cloneGuess
    }
  },
  watch: {
    visible(bool) {
      if (bool) {
        this.typeSelect = 0
        this.guessDate = ''
        this.guessInfo.data.data = []
        this.getGuessList()
      }
    },
    typeSelect() {
      this.currentPage = 1
      this.getGuessList()
    },
    guessDate() {
      this.currentPage = 1
      this.getGuessList()
    },
    currentPage() {
      this.getGuessList()
    }
  },
  methods: {
    formatNumber(money){
      return formatNumberSplit(money)
    },

    // 查询我的竞猜
    async getGuessList() {
      this.loading = true
      const params = {
        date: formatDate(this.guessDate, "yyyy-MM-dd"),
        type: this.typeSelect,
        page: this.currentPage,
        page_size: this.pageSize
      }
      console.info("2022世界杯我的竞猜查询入参：", params)
      const res = await this.$http(this.ApiSetting.active.worldCup2022.myQuiz, params)
      console.info("2022世界杯我的竞猜响应：", res)

      if (res.status === 1 && res.data) {
        this.guessInfo = res.data
      } else {
        this.currentPage = 1
        this.guessInfo.data.data = []
        this.guessInfo.data.total = 0
      }
      this.loading = false
    },

    // 领取彩金
    async toTake() {
      if (this.guessInfo.is_apply) return
      if (this.takeLoading) return
      this.takeLoading = true
      const res = await this.$http(this.ApiSetting.active.worldCup2022.worldCupPrize)
      console.info("2022世界杯领取彩金响应：", res)

      if (res.status === 1) {
        this.$message({ message: res.message, type: 'success' })
        this.close()
      }
      this.takeLoading = false
    },

    close() {
      this.$emit("update:visible", false)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .my-guess-dialog {
  height: 403px;
  &.big {
    height: 480px;
    .el-dialog__body {
      height: 432px;
    }
  }

  .el-dialog__body {
    height: 355px;
    position: relative;

    .my-guess {
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

        .type {
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
              &:first-child {
                padding-left: 30px;
              }
              &:last-child {
                padding-right: 10px;
              }
            }
            td {
              line-height: 40px;
              background-color: #ffffff;
              font-size: 14px;
              color: #333;
              &:first-child {
                padding-left: 20px;
              }
              img {
                width: 29px;
                margin-right: 7px;
              }
              &.fail {
                color: #9e233f;
              }
              &.success {
                color: #1bc723;
              }
            }

            .align-left {
              text-align: left;
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
        .world-cup2022-loading {
          position: absolute;
          top: 40px;
          width: 100%;
          height: 160px;
          background-size: 32px 32px;
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

      .take {
        margin-top: 8px;
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
        &.disabled {
          opacity: 0.4;
          .take-btn {
            cursor: no-drop;
          }

          &:hover {
            background: url("../../../../../assets/active/worldCup2022/dialog_btn.png") no-repeat center top;
          }
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
