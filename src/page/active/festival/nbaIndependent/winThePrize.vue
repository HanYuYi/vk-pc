<template>
  <el-dialog
    :visible.sync="visible"
    v-dir-center="visible"
    custom-class="dialog-panel"
    width="658px"
    :close-on-click-modal="false"
    :show-close="true"
    :append-to-body="true"
    :before-close="close"
    title="中奖信息">
    <div class="dialog-main">
      <img src="../../../../assets/active/nbaIndependent/prize.png" alt="">
      <p class="desc">恭喜您获得<span>{{ formatNumber(bouns) }}</span>元现金<br>已发放至您相应的体育钱包中，请注意查收</p>
      <button @click="close" class="activation">我知道了</button>
    </div>
  </el-dialog>
</template>

<script>
import { formatNumberSplit } from '@/utils/util'

export default {
  name: "winThePrize",
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    bouns: {
      type: Number,
      required: true
    }
  },
  methods: {
    formatNumber (num) {
      return formatNumberSplit(num)
    },
    close () {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="less" scoped>
@icon: url("../../../../assets/active/nbaIndependent/icon.png") no-repeat;
@color1: #ffffff;
@color-theme: #1d70f1;

/deep/ .dialog-panel {
  height: 500px;
  border: 0;
  background-color: transparent;

  .el-dialog__header {
    height: 70px;
    background-color: transparent;
    background: @icon;
    background-position: -704px -44px;
    line-height: 54px;
    position: relative;

    .el-dialog__title {
      color: @color1;
      font-size: 26px;
      line-height: 26px;
      font-weight: bold;
      font-style: italic;
      margin-left: 68px;
    }

    .el-dialog__headerbtn {
      .el-dialog__close {
        width: 100%;
        height: 100%;
        background: @icon;
        background-position: -962px -329px;
      }

      &:hover {
        .el-dialog__close {
          background-position: -1041px -329px;
        }
      }
    }

    /deep/ &:after {
      width: 100%;
      position: absolute;
      bottom: 7px;
      left: 0;
      content: "";
      border-bottom: 1px solid #1d70f1;
    }
  }

  .el-dialog__body {
    padding: 0;
    height: 430px;
    background-color: @color-theme;
    position: relative;

    /deep/ &:before {
      width: 644px;
      height: 420px;
      content: "";
      top: 5px;
      left: 8px;
      position: absolute;
      border: solid 1px #03256f;
      box-sizing: border-box;
      pointer-events: none;
    }

    // dialog自定义层
    .dialog-main {
      overflow: hidden;
      text-align: center;
      img {
        height: 162px;
        margin-top: 15px;
      }
      .desc {
        margin-top: 17px;
        font-size: 16px;
        line-height: 20px;
        letter-spacing: 1.6px;
        text-align: center;
        color: @color1;
        span {
          color: #fdd84b;
          font-size: 20px;
          font-weight: bold;
        }
      }
      .activation {
        margin-top: 55px;
        width: 248px;
        height: 70px;
        background: @icon;
        border: 0;
        outline: 0;
        font-size: 24px;
        letter-spacing: 1.2px;
        color: @color1;
        cursor: pointer;
        background-position: -32px -269px;
      }
    }
  }
}
</style>
