<template>
  <el-dialog
      custom-class="record-guess-dota-mojor"
      :visible="visible"
      v-dir-center="visible"
      width="702px"
      :show-close="false"
      :append-to-body="true"
      :lock-scroll="true"
      @close="close"
      title=""
      :close-on-click-modal="false">

    <div class="my-record">

      <!-- header-->
      <div class="record-header">
        <h2>竞猜记录</h2>

        <dl class="date-block">
          <dt>日期</dt>
          <dd>
            <date-picker class="date-time"
                         type="date"
                         format="yyyy-MM-dd"
                         v-model="guessDate"
                         @on-change="currentPage = 1;getRecordList()" />
          </dd>
        </dl>
      </div>

      <!-- table-->
      <table class="record-table">
        <tr>
          <th>赛事</th>
          <th>竞猜队伍</th>
          <th>竞猜结果</th>
          <th>竞猜时间</th>
        </tr>
        <template v-if="!loading && recordInfo.list && recordInfo.list.length">
          <tr v-for="(item, index) in recordInfo.list" :key="index">
            <td>
              <Tooltip class="tooltip_2022" :content="item.game_name" placement="bottom-start">
                <span>{{ item.game_name }}</span>
              </Tooltip>
            </td>
            <td width="35%">
              <p :class="{'checked': item.result === item.team_name_1}">{{ item.team_name_1 }}</p>
              <p :class="{'checked': item.result === item.team_name_2}">{{ item.team_name_2 }}</p>
            </td>
            <td>
              <!-- is_win:   -1: 未开  0: 输， 1: 赢 -->
              <span v-if="item.is_win === -1" class="progress">进行中</span>
              <template v-if="item.is_win === 1"  class="win">赢</template>
              <span v-if="item.is_win === 0" class="lose">输</span>
            </td>
            <td width="25%">{{ item.apply_time }}</td>
          </tr>
        </template>

        <tr v-if="loading" class="loading"><td rowspan="5" colspan="4"></td></tr>

        <tr v-if="!loading && (!recordInfo.list || !recordInfo.list.length)" class="empty-data">
          <td rowspan="5" colspan="4"><p>暂无数据</p></td>
        </tr>
      </table>

      <!-- 分页器-->
      <div v-if="recordInfo.list.length" class="cus-page">
        <Page :total="recordInfo.total"
              :page-size="PAGE_SIZE"
              :current.sync="currentPage"
              @on-change="getRecordList">
        </Page>
      </div>

    </div>

    <i @click="close" class="close"></i>

  </el-dialog>
</template>

<script>
import { formatDate } from '@/utils/util'

export default {
  name: "recordGuessDotaMojor",
  props: ["visible"],
  data() {
    return {
      loading: false,
      guessDate: "",
      currentPage: 1,
      PAGE_SIZE: 5,
      recordInfo: {
        list: [],
        total: 0
      }
    }
  },
  watch: {
    visible(bool) {
      if (bool) {
        this.guessDate = ""
        this.currentPage = 1
        this.recordInfo.total = 0
        this.recordInfo.list = []
        this.getRecordList()
      }
    }
  },
  methods: {
    /**
     * 查询我的中奖记录
     * @return {Promise<void>}
     */
    async getRecordList() {
      this.loading = true
      const params = {
        page: this.currentPage,
        page_size: this.PAGE_SIZE,
        date: formatDate(this.guessDate, "yyyy-MM-dd")
      }
      console.info("dota2 mojor活动1 记录入参：", params)
      try {
        const res = await this.$http(this.ApiSetting.active.dotaMojor.getApplyList, params)
        console.info("dota2 mojor活动1 记录响应：", res)

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
/deep/ .record-guess-dota-mojor {
  box-shadow: none;
  height: 734px;
  border-radius: 16px;
  border: solid 1px #2f4359;
  background-color: #222c44;
  .el-dialog__header {
    height: 0;
  }

  .el-dialog__body {
    padding: 0;
    height: inherit;
    position: relative;

    .my-record {
      color: #fff;

      .record-header {
        padding: 0 20px;
        height: 88px;
        display: flex;
        justify-content: space-between;
        background-image: linear-gradient(to top, #222c44, #263c55);
        border-radius: 16px;
        overflow: hidden;
        h2 {
          line-height: 88px;
          font-size: 28px;
          font-weight: normal;
        }

        .date-block {
          display: flex;
          height: 44px;
          margin-top: 22px;
          dt {
            font-size: 16px;
            margin-right: 17px;
            line-height: 44px;
          }
          dd {
            //覆写 date-picker 样式
            .date-time {
              width: 160px;
              .ivu-icon {
                width: 20px;
                height: 20px;
                background: url("../../../../assets/active/worldCup2022/select_arrow.png") no-repeat right center;
                background-size: 7px 4px;
                top: 10px;
                right: 10px;
                &.ivu-icon-ios-close-circle {
                  top: 11px;
                  right: 10px;
                  width: 20px;
                  height: 20px;
                  background: url("../../../../assets/active/worldCup2022/date_close.png") no-repeat center center;
                  background-size: 15px;
                  transform: none;
                }
              }
              .ivu-input {
                height: 44px;
                line-height: 42px;
                border-radius: 8px;
                border-color: #1b253e;
                background-image: linear-gradient(to top, #2b3e5f, #344a71);
                font-size: 16px;
                color: #d6e7f7;
              }
              .ivu-select-dropdown {
                right: 20px;
                left: auto!important;
                border-color: #1b253e;
                border-radius: 8px;
                background-image: linear-gradient(to top, #2b3e5f, #344a71);
                .ivu-date-picker-cells-cell-next-month, .ivu-date-picker-cells-cell-prev-month {
                  em {
                    color: #7c839f;
                  }
                }
              }
            }
          }
        }
      }

      .record-table {
        width: 662px;
        margin: 0 auto;
        font-size: 14px;
        text-align: center;
        color: #fff;
        border-radius: 12px;
        box-shadow: 0 0 1px 1px #131a2b;
        background-color: #25344e;
        overflow: hidden;
        tr {
          border-bottom: solid 1px #131a2b;
          &:first-child {
            border-top: solid 1px #131a2b;
            background-image: linear-gradient(to top, #2b3d5e, #344a71);
          }
          &:last-child {
            border-bottom: 0;
          }
          th {
            font-size: 16px;
            font-weight: normal;
            line-height: 62px;
            color: #d6e7f7;
            &:nth-child(2) {
              text-align: left;
              padding-left: 10px;
            }
          }
          td {
            padding: 0 10px;
            height: 100px;
            &:nth-child(2) {
              text-align: left;
              color: #d6e7f7;
              p {
                line-height: 36px;
                width: 130px;
                padding: 0 40px 0 10px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                &.checked {
                  background: url("../../../../assets/active/dotaMojor/record_checked.png");
                }
              }
            }
            span {
              font-size: 14px;
            }
            .progress {
              color: #d6e7f7;
            }
            .lose {
              color: #677a8a;
            }
            .ivu-tooltip-rel {
              display: block;
              width: 140px;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
            &.empty-data {
              height: 502px;
            }
          }
        }

        .loading {
          td {
            height: 504px;
            background: url("../../../../assets/btn-loader.gif") no-repeat center;
            background-size: 64px 64px;
          }
        }

        .empty-data {
          td {
            height: 504px;
            background: url("../../../../assets/active/dotaMojor/empty_record.png") no-repeat center 158px;
            p {
              font-size: 16px;
              color: #a5b6c5;
            }
          }
        }
      }

      .cus-page {
        width: 100%;
        position: absolute;
        bottom: 24px;
        left: 0;
        text-align: center;
        .ivu-page {
          padding: 0;
          margin: 0;
          text-align: center;
          .ivu-page-prev, .ivu-page-next {
            width: 32px;
            height: 32px;
            border: 0;
            border-radius: 0;
            a {
              display: none;
            }

          }
          .ivu-page-prev {
            background: url("../../../../assets/active/dotaMojor/page_prev.png");
            &.ivu-page-disabled {
              &:hover {
                background: url("../../../../assets/active/dotaMojor/page_prev.png");
              }
            }
            &:hover {
              background: url("../../../../assets/active/dotaMojor/page_prev_hover.png");
            }
          }
          .ivu-page-next {
            background: url("../../../../assets/active/dotaMojor/page_next.png");
            &.ivu-page-disabled {
              &:hover {
                background: url("../../../../assets/active/dotaMojor/page_next.png");
              }
            }
            &:hover {
              background: url("../../../../assets/active/dotaMojor/page_next_hover.png");
            }
          }
          .ivu-page-item {
            border: 0;
            height: 32px;
            line-height: 32px;
            a {
              color: #8398b8;
              font-size: 20px;
            }
            &:hover, &.ivu-page-item-active {
              a {
                color: #fff;
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
                    color: #8398b8;
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
                    color: #8398b8;
                  }
                }
              }
            }
          }
        }
      }
    }

    .close {
      position: absolute;
      width: 60px;
      height: 60px;
      bottom: -100px;
      left: 321px;
      background: url("../../../../assets/active/dotaMojor/close_icon.png") no-repeat;
      cursor: pointer;
      transition:  background 0.1s;
      &:hover {
        background: url("../../../../assets/active/dotaMojor/close_icon_hover.png") no-repeat;
      }
    }
  }
}
</style>
