<template>
  <el-dialog
    v-dir-center="visible"
    :visible.sync="visible"
    custom-class="record-dialog"
    width="810px"
    :close-on-click-modal="false"
    :append-to-body="true"
    :before-close="close">

    <div class="dialog_title"
         slot="title">V富通钱包交易记录
    </div>

    <div class="dialog_wrapper">
      <div class="table-form">
        <!-- 交易类型-->
        <div class="form-item type">
          <div class="item-label">交易类型</div>
          <div class="item-el">
            <Select v-model="queryField.order_type"
                    class="type-select">
              <Option v-for="item in typeList"
                      :value="item.id"
                      :key="item.id">{{ item.title }}
              </Option>
            </Select>
          </div>
        </div>
        <!-- 交易时间-->
        <div class="form-item time">
          <div class="item-label">交易时间</div>
          <div class="item-el">
            <date-picker class="time-date"
                         type="date"
                         format="yyyy-MM-dd"
                         :value="queryField.start_time"
                         @on-change="setTime(1, $event)" />
            <span class="to">{{ $t("to") }}</span>
            <date-picker class="time-date"
                         type="date"
                         format="yyyy-MM-dd"
                         :value="queryField.end_time"
                         @on-change="setTime(2, $event)" />
            <div class="btn">
              <button class="d_btn normal"
                      :class="{'disabled': loading}"
                      @click="handleQueryRecord(1)"
                      >查询
              </button>
            </div>
          </div>
        </div>
        <!-- 交易记录-->
        <div class="form-item length">
          <div class="item-label">交易记录</div>
          <div class="item-el">共 {{ recordObj.count }} 条</div>
        </div>
      </div>

      <!-- 记录列表-->
      <div class="table-list">
        <div class="table_box">
          <div v-if="loading" class="globe_loading"></div>
          <table v-else>
            <tr>
              <th width="35%">流水号</th>
              <th width="30%">创建时间</th>
              <th width="25%">金额</th>
              <th>交易类型</th>
            </tr>
            <tr v-for="(item, index) in recordObj.list"
                :key="index">
              <td>{{ item.order_no }}</td>
              <td>{{ item.time }}</td>
              <td :class="{'highlight': item.is_show_color}">{{ item.amount }}</td>
              <td>{{ item.status_cn }}</td>
            </tr>
          </table>
        </div>
        <Page :total="recordObj.count"
              :page-size="queryField.page_size"
              :current.sync="current_page"
              @on-change="handlePageChange"
              class="pagination" />
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { formatDate } from "../../utils/util"

export default {
  name: "useroverviewrichpayRecord",
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      queryField: {                              // 查询form参数
        order_type: 0,
        start_time: "",
        end_time: "",
        page_size: 5
      },
      loading: false,                           // form查询状态
      typeList: [                               // 定义交易类型
        { id: 0, title: "全部" },
        { id: 1, title: "转入" },
        { id: 2, title: "转出" },
        { id: 3, title: "提息" },
        { id: 4, title: "红包" }
      ],
      current_page: 1,
      recordObj: {                              // 交易记录列表
        count: 0,
        list: []
      }
    }
  },
  watch: {
    visible(bool) {
      if (bool) {
        this.queryField.order_type = 0
        this.queryField.start_time = formatDate(new Date().getTime(), "yyyy-MM-dd")
        this.queryField.end_time = ""
        this.handleQueryRecord(1)
      }
    }
  },
  methods: {
    close () {
      this.$emit('update:visible', false)
    },
    setTime (type, date) {
      if (type === 1){
        this.queryField.start_time = date
      } else {
        this.queryField.end_time = date
      }
    },
    // 查询交易记录
    handleQueryRecord (page) {
      if (this.loading) return false
      this.loading = true
      const params = {
        ...this.queryField,
        page: page || 1,
        start_time: this.queryField.start_time || "",
        end_time: this.queryField.end_time || "",
      }

      this.$http(this.ApiSetting.active.richPayOrderList, params)
        .then(({status, data}) => {
          if (status === 1 && data) {
            this.current_page = params.page
            this.recordObj = data
          } else {
            this.recordObj = { count: 0, list: [] }
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    // 分页
    handlePageChange (num) {
      this.handleQueryRecord(num)
    }
  }
}
</script>

<style lang="less" scoped>
.record-dialog {
  &.el-dialog {
    .table-form {
      margin: 13px 0 0 52px;
      .form-item {
        display: flex;
        .item-label {
          font-size: 18px;
          line-height: 34px;
          letter-spacing: normal;
          color: #ffffff;
          margin-right: 20px;
        }
        .item-el {
          .type-select, .time-date {
            width: 228px;
            /deep/ .ivu-select-selected-value {
              color: #fff;
              line-height: 32px !important;
              font-size: 14px !important;
            }
          }
          .to {
            line-height: 34px;
            font-size: 12px;
            color: #7c839f;
            margin: 0 8px;
          }
        }
        &.time {
          margin-top: 33px;
          .item-el {
            display: flex;
            .btn {
              //display: inline-block;
            }
          }
        }
        &.length {
          margin-top: 44px;
          .item-el {
            line-height: 34px;
          }
        }
      }
    }
    .btn {
      text-align: center;
      padding-top: 0;
      height: auto;
      line-height: 0;
      margin-left: 20px;
    }
    .table-list {
      width: 739px;
      margin: 0 auto;
      .table_box {
        height: calc(38px * 6);
        table {
          width: calc(100% - 17px);
          margin: 0 0 11px 16px;
          tr {
            th, td {
              line-height: 38px;
              font-size: 14px;
              color: #7c839f;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              &.highlight {
                color: #07f1ba;
              }
            }
            th {
              font-weight: normal;
              font-size: 12px;
              color: rgba(124, 131, 159, 0.4);
              text-align: left;
            }
          }
        }
      }
    }
    .pagination {
      padding: 16px 0 0;
      display: flex;
      justify-content: center;
      /deep/ .ivu-page-prev {
        margin-right: 15px;
      }
      /deep/ .ivu-page-item {
        margin-right: 10px;
      }
    }
  }
}
</style>
