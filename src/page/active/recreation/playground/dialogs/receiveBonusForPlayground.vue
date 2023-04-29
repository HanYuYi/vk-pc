<template>
  <el-dialog
      custom-class="receive-bonus-for-playground"
      :visible="visible"
      v-dir-center="visible"
      width="584px"
      :show-close="false"
      :append-to-body="true"
      :lock-scroll="true"
      @close="close"
      title=""
      :close-on-click-modal="false">

    <div class="receive-main" :class="{disabled: loading}">

      <i @click="close" class="close"></i>

      <ul class="wallet-list">
        <li v-for="(item, index) in walletList"
            :key="index"
            @click="checkedWalletIndex = index"
            :class="{active: checkedWalletIndex === index}">{{ item.title }}钱包
        </li>
      </ul>

      <button @click="receiveBonusSubmit" class="receive-btn"></button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "receiveBonusForPlayground",
  props: ["visible", "walletList", "leval", "currentActiveKey"],
  data() {
    return {
      loading: false,
      checkedWalletIndex: 0
    }
  },
  watch: {
    visible (bool) {
      if (bool) {
        this.checkedWalletIndex = 0
      }
    }
  },
  methods: {
    /**
     * 领取彩金
     * @return {Promise<void>}
     */
    async receiveBonusSubmit() {
      if (this.loading) {
        this.$message({ message: "领取中，请稍等...", type: "warning" })
        return
      }
      this.loading = true
      const postMap = new Map([
        [1, {
          url: this.ApiSetting.active.playgroundActive.joinRedPacketBonus,
          params: {
            wallet: this.walletList[this.checkedWalletIndex].money_code,
            leval: this.leval
          }
        }],
        [2, {
          url: this.ApiSetting.active.playgroundActive.joinWaterBonus,
          params: { wallet: this.walletList[this.checkedWalletIndex].money_code }
        }]
      ])

      try {
        console.info(`娱乐专场活动${this.currentActiveKey}领取彩金入参：`, postMap.get(this.currentActiveKey).params)
        const response = await this.$http(postMap.get(this.currentActiveKey).url, postMap.get(this.currentActiveKey).params)
        console.info(`娱乐专场活动${this.currentActiveKey}领取彩金响应：`, response)
        if (response.status === 1 && response.data) {
          this.$emit("receive-back")
          this.close()

          this.$message({
            message: `${response.data.amount}元彩金已派发至您的${this.walletList[this.checkedWalletIndex].title}钱包，请注意查收`,
            type: "success"
          })
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
/deep/ .receive-bonus-for-playground {
  background-image: url("../../../../../assets/active/playground/receive_bonus_for_playground_title.png");
  background-repeat: no-repeat;
  border: solid 2px #c83934;
  background-color: #191211;
  box-sizing: border-box;
  box-shadow: none;
  margin: 0 auto;

  .el-dialog__header {
    height: 0;
  }

  .el-dialog__body {
    padding: 0;
    height: inherit;
    position: relative;
    border-top: 0.1px solid transparent;

    .receive-main {
      width: 500px;
      margin: 90px auto 0;
      &.disabled {
        pointer-events: none;
        .receive-btn {
          opacity: 0.7;
        }
      }

      .close {
        position: absolute;
        right: 0;
        top: -53px;
        width: 37px;
        height: 37px;
        background-image: url("../../../../../assets/active/playground/dialog_close.png");
        cursor: pointer;
        transition: filter 0.1s;

        &:hover {
          filter: saturate(180%);
        }
      }

      .wallet-list {
        li {
          display: inline-block;
          width: 160px;
          height: 50px;
          line-height: 48px;
          text-align: center;
          margin-right: 10px;
          margin-bottom: 10px;
          box-sizing: border-box;
          border: solid 2px #524a4b;
          color: #c0bdc8;
          cursor: pointer;
          position: relative;
          transition: all 0.1s;
          &:nth-child(3n + 3) {
            margin-right: 0;
          }
          &::after {
            position: absolute;
            content: "";
            width: 30px;
            height: 31px;
            bottom: -1px;
            right: 0;
            background-image: url("../../../../../assets/active/playground/wallet_unchecked.png");
            pointer-events: none;
          }
          &.active {
            color: #d73d38;
            border-color: #d73d38;
            font-weight: bold;
            &::after {
              background-image: url("../../../../../assets/active/playground/wallet_checked.png");
            }
          }
        }
      }

      .receive-btn {
        display: block;
        margin: 20px auto 16px;
        width: 206px;
        height: 86px;
        cursor: pointer;
        border: 0;
        outline: 0;
        background-color: transparent;
        background-image: url("../../../../../assets/active/playground/dialog_btn.png");
        background-position: -12px top;
        transition: filter 0.1s;
        &:hover {
          filter: saturate(130%);
        }
      }
    }
  }
}
</style>
