<template>
  <el-dialog
    :visible.sync="visible"
    custom-class="dialog-panel"
    width="393px"
    :close-on-click-modal="false"
    :show-close="false"
    :append-to-body="true"
    :before-close="close">
    <div class="dialog-main">
      <h2>恭喜您获得</h2>
      <div class="rule-icon" :style="{'background-position': `${giftData.ruleIconPos}`, 'position': giftData.ruleIconText ? 'relative' : 'static'}">
        <p class="rule-txt">{{ giftData.bonus }} 元彩金</p>
        <h3 v-if="giftData.ruleIconText" v-html="giftData.ruleIconText" :class="{exception: giftData.title === '三重礼'}" class="rule-icon-txt"></h3>
      </div>
      <ul class="desc">
        <li>彩金已加入您的主账户</li>
        <li>{{ giftData.need_money }} 流水即可提款</li>
      </ul>
      <button @click="close" class="close"><span>知道啦</span></button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'usdtdepositDialog',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    giftData: {
      type: Object,
      required: true
    }
  },
  methods: {
    close () {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="less" scoped>
@icon: url("../../../assets/active/usdtdeposit/icon.png") no-repeat;

/deep/ .dialog-panel {
  height: 564px;
  border: 0;
  background: @icon;
  background-position: -29px -361px;
  background-color: transparent;
  margin-top: calc((100vh - 564px) / 2) !important;

  .el-dialog__header {
    height: 0;
    background-color: transparent;
  }

  .el-dialog__body {
    padding: 0;
    .dialog-main {
      overflow: hidden;
      h2 {
        font-weight: normal;
        font-size: 24px;
        line-height: 47px;
        text-align: center;
        color: #fff;
        text-shadow: 0 2px 3px rgba(0, 0, 0, 0.39);
      }
      .rule-icon {
        margin: 5px auto 0;
        width: 341px;
        height: 289px;
        background: @icon;
        overflow: hidden;
        .rule-txt {
          margin-top: 236px;
          font-size: 24px;
          line-height: 24px;
          text-align: center;
          color: #8b0404;
        }
        .rule-icon-txt {
          width: 100%;
          top: 151px;
          left: 0;
          position: absolute;
          text-align: center;
          font-size: 20px;
          line-height: 24px;
          font-weight: normal;
          color: #fff;
          &.exception {
            left: 10px;
          }
        }
      }
      .desc {
        margin: 28.5px auto 0;
        li {
          text-align: center;
          text-shadow: 0 2px 3px rgba(0, 0, 0, 0.39);
          font-size: 18px;
          line-height: 31px;
          color: #fff;
        }
      }
      .close {
        display: block;
        margin: 76px auto 0;
        width: 144px;
        height: 56px;
        outline: 0;
        border: 0;
        border-radius: 28px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4), inset 0px -3px 2px 0 rgba(0, 0, 0, 0.58);
        background: @icon;
        background-position: -208px -115px;
        font-size: 18px;
        line-height: 56px;
        cursor: pointer;
        span {
          background: linear-gradient(to bottom, #ffffff, #f8d5a1);
          -webkit-background-clip: text;
          color: transparent;
          font-weight: bold;
        }
        &:hover {
          background-position: -208px -24px;
          span {
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
