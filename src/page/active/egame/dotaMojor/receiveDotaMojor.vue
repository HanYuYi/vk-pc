<template>
  <el-dialog
      custom-class="receive-dota-mojor"
      :visible="visible"
      v-dir-center="visible"
      width="679px"
      :show-close="false"
      :append-to-body="true"
      :lock-scroll="true"
      @close="close"
      title=""
      :close-on-click-modal="false">

    <div class="receive-main" :class="{'disabled': loading}">
      <h1>恭喜您中奖</h1>

      <h3>领取 <b>{{ receiveBonus }}</b> 元彩金至</h3>

      <ul class="wallet-list">
        <li v-for="(item, index) in  walletList"
            :key="index"
            @click="selectedCode = item.code"
            :class="{'active': selectedCode === item.code}">
          {{ item.name }}
        </li>
      </ul>

      <p class="water-tips">{{ waterLimit }}倍彩金流水转出</p>
    </div>

    <button @click="submitReceive" class="receive-btn" :class="{'disabled': loading}">确定</button>

  </el-dialog>
</template>

<script>
export default {
  name: "receiveDotaMojor",
  props: ["visible", "walletList", "receiveBonus", "activeId", "waterLimit"],
  data() {
    return {
      selectedCode: "",
      loading: false
    }
  },
  watch: {
    visible (bool) {
      if (bool && this.walletList[0]) {
        this.selectedCode = this.walletList[0].code
      }
    }
  },
  methods: {
    /**
     * 领取彩金
     * @return {Promise<void>}
     */
    async submitReceive() {
      if (this.loading) return
      this.loading = true
      const params = {
        from: "NM",
        to: this.selectedCode,
        money: this.receiveBonus,
        active_id: this.activeId
      }
      console.info("dotaMojor2 活动领取彩金入参：", params)
      try {
        const response = await this.$http(this.ApiSetting.user.transferSubmit, params)
        console.info("dotaMojor2 活动领取彩金响应：", response)
        if (response.status === 1) {
          this.close()
          this.$message({ message: `${this.receiveBonus}元彩金已转入您的${this.walletList.filter(item => item.code === this.selectedCode)[0].name}，${this.waterLimit}倍流水即可转出`, type: "success" })
          this.$emit("receive-back")
        }
        this.loading = false
      } catch (e) {
        console.info(e)
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
/deep/ .receive-dota-mojor {
  box-shadow: none;
  height: 666px;
  background-color: transparent;
  .el-dialog__header {
    height: 0;
  }

  .el-dialog__body {
    padding: 0;
    height: inherit;
    position: relative;

    .receive-main {
      height: 566px;
      background: url("../../../../assets/active/dotaMojor/receive_bg.png");
      text-align: center;
      overflow: hidden;
      &.disabled {
        * {
          pointer-events: none;
        }
      }

      h1 {
        margin-top: 180px;
        font-size: 40px;
        color: #fff;
      }

      h3 {
        margin-top: 30px;
        font-size: 32px;
        font-weight: normal;
        color: #fff;
        b {
          color: #fff369;
          font-size: 40px;
          vertical-align: middle;
        }
      }

      .wallet-list {
        width: 396px;
        margin: 28px auto 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        li {
          width: 188px;
          height: 68px;
          border-radius: 8px;
          box-sizing: border-box;
          box-shadow: 0 2px 5px 0 rgba(21, 29, 46, 0.4);
          border: solid 1px #456b9b;
          background-color: #457a93;
          font-size: 16px;
          line-height: 66px;
          color: #fff;
          margin-bottom: 20px;
          cursor: pointer;
          &.active {
            box-shadow: 0 0 0 4px rgba(109, 244, 245, 0.1), inset 0 0 0 1px #49c8d7, 0px 2px 5px 0 rgba(21, 29, 46, 0.5);
            background-image: linear-gradient(to top, #43c4d2, #2ea7bd);
          }
        }
      }

      .water-tips {
        font-size: 14px;
        color: #c7f4ff;
      }
    }

    .receive-btn {
      display: block;
      margin: 32px auto 0;
      width: 240px;
      height: 66px;
      font-size: 20px;
      text-align: center;
      color: #fff;
      border-radius: 8px;
      box-shadow: inset 0px -4px 0 0 #59b2dc;
      border: solid 1px #408db1;
      background-image: linear-gradient(to top, #428aa3, #408db1);
      transition: all 0.2s;
      cursor: pointer;

      &.disabled {
        pointer-events: none;
        .receive-btn {
          opacity: 0.7;
        }
      }
      &:hover {
        box-shadow: inset 0px -4px 0 0 #6dcaf5;
        border: solid 1px #54afda;
        background-image: linear-gradient(to top, #4bb3d2, #4f9be1);
      }
    }
  }
}
</style>
