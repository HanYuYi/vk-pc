<template>
  <el-dialog
      custom-class="record-new-year2023"
      :visible="visible"
      top="8vh"
      width="916px"
      :show-close="false"
      :append-to-body="true"
      :lock-scroll="true"
      @close="close"
      title=""
      :close-on-click-modal="false">

    <div class="my-record">
      <h1><span class="new-year2023-gradient-color-1">中奖记录</span></h1>

      <div class="content">
        <table v-if="!loading && recordInfo.list && recordInfo.list.length"
               border="0"
               align="center"
               cellspacing="0"
               width="100%">
          <thead>
            <tr>
              <th v-if="type === 1">中奖时间</th>
              <th v-if="type === 3">时间</th>

              <th v-if="type === 1">获取方式</th>
              <th v-if="type === 3">红包金额</th>

              <th v-if="type === 1">奖品描述</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in recordInfo.list" :key="index">
              <td width="33%">{{ item.create_time }}</td>

              <td v-if="type === 1" width="33%">{{ item.item_tag }}</td>
              <td v-if="type === 3" width="33%">{{ item.item_name }}</td>

              <td v-if="type === 1">
                {{ item.item_name }}
                <router-link v-if="item.go_bag" to="/user/package?gametype=0&id=2">【查看】</router-link>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="loading" class="loading"></div>

        <div v-if="!loading && (!recordInfo.list || !recordInfo.list.length)"
             class="new-year2023-empty">
          <p>暂无记录</p>
        </div>

        <div v-if="type === 1 && recordInfo.list.length" class="cus-page">
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
    </div>

    <i @click="close" class="close"></i>

  </el-dialog>
</template>

<script>

export default {
  name: 'recordNewYear2023',
  props: ["visible", "type", "list"],
  data() {
    return {
      loading: false,
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
        if (this.type === 1) {
          this.currentPage = 1
          this.recordInfo.total = 0
          this.recordInfo.list = []
          this.getRecordList()
        }
        if (this.type === 3) {
          this.recordInfo.list = this.list
        }
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
        page_size: this.PAGE_SIZE
      }
      console.info("2023新年活动兔兔农场记录入参：", params)
      try {
        const res = await this.$http(this.ApiSetting.active.newYear2023.rabbitFarmInitRecord, params)
        console.info("2023新年活动兔兔农场记录响应：", res)

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
/deep/ .record-new-year2023 {
  background-image: url("../../../../../assets/active/newYear2023/dialog_big.png");
  background-repeat: no-repeat;
  background-color: transparent;
  box-shadow: none;
  margin: 0 auto;
  height: 758px;

  .el-dialog__header {
    height: 0;
  }

  .el-dialog__body {
    padding: 0;
    height: inherit;
    position: relative;

    .my-record {
      overflow: hidden;
      width: 750px;
      margin: 0 auto;

      h1 {
        font-size: 32px;
        font-weight: bold;
        margin-top: 230px;
        text-align: center;
      }

      .content {
        margin-top: 25px;
        height: 395px;
        border-radius: 10px;
        border: solid 2px #901212;
        background-color: #ffe5b8;
        position: relative;

        table {
          text-align: center;
          tr {
            border-bottom: 1px solid rgba(210,155,125,0.43);
            th {
              line-height: 60px;
              font-size: 18px;
              color: #a23f28;
            }
            td {
              line-height: 48px;
              font-size: 14px;
              color: #a23f28;
              a {
                color: #a23f28;
                font-weight: bold;
              }
            }
          }
        }

        .cus-page {
          width: 100%;
          position: absolute;
          top: 340px;
          left: 0;
          text-align: center;
          .ivu-page {
            padding: 0;
            margin: 0;
            text-align: center;
            .ivu-page-prev, .ivu-page-next {
              min-width: 30px;
              border: 0;
              border-radius: 0;
              a {
                font-size: 16px;
                color: #a23f28;
                line-height: 30px;
              }
            }
            .ivu-page-item {
              border: 0;
              border-radius: 12px;
              height: 24px;
              line-height: 24px;
              min-width: 30px;
              a {
                color: #a23f28;
              }
              &:hover, &.ivu-page-item-active {
                background-color: #a23f28;
                font-weight: bold;
                a {
                  color: #ffd7b1;
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
                      color: #a23f28;
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
                      color: #a23f28;
                    }
                  }
                }
              }
            }
          }
        }

        .loading {
          display: block;
          width: 100%;
          height: inherit;
          background: url("../../../../../assets/btn-loader.gif") no-repeat center;
          background-size: 64px 64px;
        }

        .new-year2023-empty {
          width: 100%;
        }
      }
    }

    .close {
      position: absolute;
      display: block;
      width: 62px;
      height: 63px;
      bottom: -87px;
      left: 427px;
      background: url("../../../../../assets/active/newYear2023/close_icon.png") no-repeat;
      cursor: pointer;
      transition:  background 0.1s;
      &:hover {
        background: url("../../../../../assets/active/newYear2023/close_icon_hover.png") no-repeat;
      }
    }
  }
}
</style>
