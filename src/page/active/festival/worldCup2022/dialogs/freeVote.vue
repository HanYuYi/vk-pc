<template>
  <el-dialog
    custom-class="world-cup2022-my-guess free-dialog"
    :visible="visible"
    v-dir-center="visible"
    width="430px"
    :append-to-body="true"
    :lock-scroll="true"
    @close="close"
    title="温馨提示"
    :close-on-click-modal="false">

    <div class="free-vote">
      <div class="tip">
        <img src="../../../../../assets/active/worldCup2022/free_vote.png">
        <div class="txt">
          <p>恭喜您免费获得</p>
          <p><span>1张</span>卡塔尔世界杯竞猜选票！</p>
        </div>
      </div>

      <div @click="toGuessing" class="guessing">
        <button class="take-btn">
          <span class="world-cup2022-gradient-color">立即竞猜</span>
        </button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'freeVote',
  props: ["visible"],
  methods: {
    toGuessing() {
      this.$emit("toBonus")
      this.close()
    },

    close() {
      this.$emit("update:visible", false)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .free-dialog {
  height: 218px;

  .el-dialog__body {
    height: 170px;
    position: relative;

    .free-vote {
      overflow: hidden;
      margin: 0 75px;
      .tip {
        margin-top: 14px;
        display: flex;
        img {
          display: block;
          pointer-events: none;
        }
        .txt {
          margin-left: 2px;
          overflow: hidden;
          p {
            font-size: 14px;
            line-height: 17px;
            color: #fff;
            span {
              color: #fff7a9;
            }
            &:first-child {
              margin-top: 23.5px;
            }
          }
        }
      }
      .guessing {
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
    }
  }
}
</style>
