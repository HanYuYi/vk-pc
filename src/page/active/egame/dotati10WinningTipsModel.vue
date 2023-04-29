<template>
  <el-dialog
    :visible="visible"
    custom-class="dialog-panel"
    width="740px"
    :before-close="setLookHistoryRecord"
    :close-on-click-modal="false">
    <div class="dialog-main">
      <h1>我的奖品</h1>
      <div v-if="visible">
        <small>恭喜您！获得了：{{ currentStepRow.name }}</small>
        <div class="img-warper" :style="{'background-image': `url(${currentStepRow.imgUrl})`, 'background-size': '100% auto'}"></div>
        <p v-if="currentStepRow.code" class="explain">请<span @click="openKfWindow()">联系客服</span>领取奖励</p>
        <p v-else class="explain">已汇入主钱包</p>
        <p v-if="currentStepRow.code" class="text-info">兑换码：<a @click="doCopy(currentStepRow.code)">{{ currentStepRow.code }} 复制</a></p>
        <button class="submit" @click="setLookHistoryRecord">知道了</button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'dotati10WinningTipsModel',
  data () {
    return {
      visible: false,
      prizeInfo: [],
      stepIndex: 0,
      currentStepRow: {}
    }
  },
  computed: {
    ...mapState(['isLogin'])
  },
  mounted () {
    if (this.isLogin) {
      this.notLookHistoryRecord()
    }
  },
  methods: {
    // 展示已获取但未展示的奖品
    notLookHistoryRecord () {
      const xhr = this.$http(this.ApiSetting.active.dotati10NotLookHistoryRecord)
      xhr.then(({ status, data }) => {
        if (status === 1 && data && data.length) {
          this.prizeInfo = data
          this.stepIndex = 1
          this.currentStepRow = this.prizeInfo[0]
          this.visible = true
        }
      })
    },
    // 复制兑换码
    doCopy (secret) {
      this.$copyText(secret).then(() => {
        this.$message({ message: '兑换码复制成功', type: 'success' })
      }, () => {
        this.$message({ message: '复制失败', type: 'warning' })
      })
    },
    // 提交已展示奖品
    setLookHistoryRecord () {
      this.close()
      this.$http(this.ApiSetting.active.dotati10setLookHistoryRecord, { ids: this.currentStepRow.id })
    },
    close () {
      this.visible = false
      if (this.stepIndex < this.prizeInfo.length) {
        let timer
        clearTimeout(timer)
        timer = setTimeout(() => {
          this.stepIndex = this.stepIndex + 1
          this.currentStepRow = this.prizeInfo[this.stepIndex - 1]
          this.visible = true
          clearTimeout(timer)
        }, 1500)
      }
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .dialog-panel {
  height: 579px !important;

  .el-dialog__body {
    width: 100% !important;
    margin: 20px auto 0 !important;

    .dialog-main {
      text-align: center;
      small {
        text-align: center!important;
      }
      .img-warper {
        width: 260px;
        height: 260px;
        margin: 30px auto 0;
        background-repeat: no-repeat;
      }
      .explain {
        margin-top: 30px;
        font-size: 14px;
        text-align: center;
        color: #f8e8b9;
        span {
          cursor: pointer;
          text-decoration: underline;
        }
      }
      .text-info {
        font-size: 14px;
        text-align: center;
        color: #f8e8b9;
        a {
          color: #f8e8b9;
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
