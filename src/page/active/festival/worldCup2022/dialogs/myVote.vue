<template>
  <el-dialog
    custom-class="world-cup2022-my-guess my-vote-dialog"
    :visible="visible"
    v-dir-center="visible"
    width="430px"
    :append-to-body="true"
    :lock-scroll="true"
    @close="close"
    title="我的投票"
    :close-on-click-modal="false">

    <div class="my-vote">

      <div class="vote-form">
        <div class="form-item country">
          <h5 class="title">投票球队：</h5>
          <div class="pro">
            <template v-if="voteData && voteData.team">
              <img :src="voteData.team.flag" alt="" class="flag">{{ voteData.team.cn_name }}
            </template>
          </div>
        </div>

        <div class="form-item rank">
          <h5 class="title">预测名次：</h5>
          <div class="pro">
            <Radio-group v-model="selectedGuess">
              <Radio v-for="(row, index) in guessType" :key="index" :label="row.key" v-if="voteTime && voteTime.length && voteTime.includes(row.value)" />
            </Radio-group>
          </div>
        </div>

        <div class="form-item num">
          <h5 class="title">投票数量：</h5>
          <div class="pro">
            <div class="input-box">
              <Input v-model="numberVote" number type="number">
                <span slot="append">票</span>
              </Input>
            </div>
            <ul class="shortcut-btn">
              <li v-for="(num, index) in quickList"
                  :key="index"
                  @click="quickIndex = index"
                  :class="{active: quickIndex === index}">{{ num }}票</li>
            </ul>
          </div>
        </div>
      </div>

      <div @click="toTake" class="take">
        <button class="take-btn">
          <span class="world-cup2022-gradient-color">确认</span>
        </button>
      </div>

      <p v-if="voteData" class="my-amount">
        我的选票数量：<span>{{ voteData.canVoteCount }}</span>
      </p>

    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'myVote',
  props: ["visible", "voteData", "guessType", "voteTime"],
  data(){
    return {
      selectedGuess: '',
      numberVote: null,
      quickList: [1, 5, 10],
      quickIndex: null,
      loading: false
    }
  },
  watch: {
    visible(bool) {
      if (bool) {
        this.selectedGuess = this.guessType[0].key
        this.numberVote = null
        this.quickIndex = null
      }
    },
    quickIndex(index) {
      if (typeof index === "number") {
        this.numberVote = this.quickList[index]
      }
    }
  },
  methods: {
    async toTake() {
      if (!this.numberVote) {
        this.$message({message: "请输入投票数量", type: 'warning'})
        return
      }

      if (this.loading) return

      this.loading = true
      const params = {
        team_id: this.voteData.team.id,
        team_name: this.voteData.team.cn_name,
        type: this.guessType.filter(item => item.key === this.selectedGuess)[0].value,
        num: this.numberVote
      }

      console.info("2022世界杯投票入参：", params)
      const res = await this.$http(this.ApiSetting.active.worldCup2022.vote, params)
      console.info("2022世界杯投票响应：", res)
      if (res.status === 1) {
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
/deep/ .my-vote-dialog {
  height: 323px;

  .el-dialog__body {
    height: 275px;
    position: relative;
    overflow: hidden;

    .my-vote {
      overflow: hidden;
      margin: 20px 21px 0;

      .form-item {
        display: flex;
        font-size: 14px;
        color: #fff;
        margin-bottom: 24px;
        &:last-child {
          margin-bottom: 21px;
        }
        .title {
          font-weight: normal;
          font-size: 14px;
        }
        &.country {
          height: 34px;
          line-height: 34px;
          .pro {
            .flag {
              height: 34px;
              margin-right: 8.9px;
            }
          }
        }
        &.rank {
          line-height: 21px;
          .pro {
            .ivu-radio-group {
              color: #fff;
              .ivu-radio-wrapper {
                margin-right: 15px;
                &:last-child {
                  margin-right: 0;
                }
                .ivu-radio {
                  margin-right: 6px;
                  .ivu-radio-inner {
                    width: 20px;
                    height: 20px;
                    box-shadow: 0px 1px 1px 0 rgba(255, 0, 57, 0.5), inset 0px 1px 3px 0 rgba(0, 0, 0, 0.4);
                    border-color: rgba(0, 0, 0, 0.06);
                    background-color: rgba(69,8,30,0.2);
                    &:after {
                      top: 4px;
                      left: 4px;
                      width: 10px;
                      height: 10px;
                      background-color: #fff69d;
                    }
                  }
                }
                &.ivu-radio-wrapper-checked {
                  color: #fff69d;
                  font-weight: bold;
                }
              }
            }
          }
        }
        &.num {
          line-height: 30px;
          .pro {
            display: flex;
            .input-box {
              .ivu-input-wrapper {
                display: flex;
                width: 148px;
                height: 30px;
                border-radius: 6px;
                box-sizing: border-box;
                border: solid 1px;
                box-shadow: 0px 1px 1px 0 rgba(255, 0, 57, 0.5), inset 0px 1px 3px 0 rgba(0, 0, 0, 0.4);
                border-color: rgba(0, 0, 0, 0.06);
                background-color: rgba(69,8,30,0.2);
                .ivu-input {
                  width: 120px;
                  height: 28px;
                  line-height: 28px;
                  border: 0;
                  font-size: 12px;
                }
                .ivu-input-group-append {
                  width: 28px;
                  line-height: 28px;
                  text-align: center;
                  opacity: 0.5;
                  font-size: 12px;
                }
              }
            }
            .shortcut-btn {
              display: flex;
              li {
                margin-left: 10px;
                width: 36px;
                height: 30px;
                border-radius: 6px;
                box-sizing: border-box;
                box-shadow: 0px 15px 24px 0 rgba(0, 0, 0, 0.31);
                border-style: solid;
                border-width: 1px;
                border-image-source: linear-gradient(to top, #bc9d7f, #bd9f82, #eadfd4, #ffe7cb);
                border-image-slice: 1;
                background-image: linear-gradient(to top, #146f62, #1bceb3), linear-gradient(to top, #bc9d7f, #bd9f82, #eadfd4, #ffe7cb);
                background-origin: border-box;
                background-clip: content-box, border-box;
                font-size: 12px;
                line-height: 28px;
                text-align: center;
                color: #fff;
                cursor: pointer;
                &.active {
                  font-weight: bold;
                  color: #fff69d;
                }
              }
            }
          }
        }
      }

      .take {
        margin-top: -5px;
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
