<template>
  <el-dialog
      custom-class="transfer-for-playground"
      :visible="visible"
      v-dir-center="visible"
      width="584px"
      :show-close="false"
      :append-to-body="true"
      :lock-scroll="true"
      @close="close"
      title=""
      :close-on-click-modal="false">

    <div class="transfer-playground" :class="{disabled: loading}">

      <i @click="close" class="close"></i>

      <div class="transfer-form">

        <!-- 选择场馆-->
        <div class="form-item">
          <h5 class="title">请选择场馆</h5>
          <div class="pro">
            <ul class="wallet-list">
              <li v-for="(item, index) in row.walletList"
                  :key="index"
                  @click="checkedWalletIndex = index"
                  :class="{active: checkedWalletIndex === index}">{{ item.title }}钱包</li>
            </ul>
          </div>
        </div>

        <!-- 金额-->
        <div class="form-item amount">
          <h5 class="title">请输入金额（元）</h5>
          <div class="pro">
            <div class="input-box">
              <Input v-model="transferAmount" number type="number" placeholder="请输入金额" />
            </div>
            <!-- 金额快捷键-->
            <ul class="shortcut-btn">
              <li v-for="(item, index) in quickList"
                  :key="index"
                  @click="transferAmount = item.amount">
                <template v-if="item.title">
                  {{ item.title }}
                </template>
                <template v-else>
                  {{ item.amount | formatNumberByInteger }}
                </template>
              </li>
            </ul>
          </div>
        </div>

      </div>

      <button @click="submitTransfer" class="transfer-btn"></button>

      <p class="transferable-tips">
        今日剩余可转入首充金额：<span>{{ row.transferableAmount | formatNumberByInteger }}元</span>
      </p>

    </div>
  </el-dialog>
</template>

<script>
import { formatNumberSplit } from "@/utils/util"

export default {
  name: "transferForPlayground",
  props: ["visible", "row"],
  data() {
    return {
      loading: false,
      checkedWalletIndex: 0,
      transferAmount: null
    }
  },
  watch: {
    visible (bool) {
      if (bool) {
        this.checkedWalletIndex = 0
        this.transferAmount = null
      }
    }
  },
  computed: {
    /**
     * 快捷金额处理
     * @return {array}
     */
    quickList() {
      if (!this.row.quickAmountList) return []
      const backList = [...this.row.quickAmountList]
      if (backList.length <= 0) {
        backList.push({ amount: this.row.transferableAmount, title: "全部" })
      } else {
        if (backList.length < 5 && this.row.transferableAmount > backList[backList.length - 1].amount) {
          backList.push({ amount: this.row.transferableAmount, title: "全部" })
        }
      }
      return backList
    }
  },
  methods: {
    /**
     * 提交转账，公共接口
     * @return {Promise<void>}
     */
    async submitTransfer() {
      if (this.loading) {
        this.$message({ message: "提交中，请稍等...", type: "warning" })
        return
      }
      if (this.transferAmount > this.row.transferableAmount) {
        this.$message({ message: "首充金额不足，请先充值", type: "warning" })
        return
      }
      if (typeof this.transferAmount !== "number") {
        this.$message({ message: "请输入转账金额", type: "warning" })
        return
      }
      if (this.transferAmount <= 0) {
        this.$message({ message: "转账金额有误，请重新输入", type: "warning" })
        return
      }
      this.loading = true
      // 针对 PTSLOT 单独处理
      const toParams = {
        to: this.row.walletList[this.checkedWalletIndex].money_code,
      }
      if (toParams.to === "PTSLOT") {
        toParams.active_type = toParams.to
        toParams.to = "PT"
      }

      const params = {
        from: "NM",
        ...toParams,
        money: this.transferAmount,
        active_id: this.row.activeId
      }
      try {
        console.info("娱乐专场活动转账入参：", params)
        const response = await this.$http(this.ApiSetting.user.transferSubmit, params)
        console.info("娱乐专场活动转账响应：", response)
        if (response.status === 1) {
          this.$emit("transfer-back")
          this.close()

          this.$message({
            message: `${this.transferAmount}元已成功转入您的${this.row.walletList[this.checkedWalletIndex].title}钱包`,
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
  },
  filters: {
    formatNumberByInteger (value) {
      const amount = formatNumberSplit(value)
      return amount.substring(0, amount.length - 3)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .transfer-for-playground {
  background-image: url("../../../../../assets/active/playground/transfer_for_playground_title.png");
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

    .transfer-playground {
      width: 500px;
      margin: 85px auto 0;
      &.disabled {
        pointer-events: none;
        .transfer-btn {
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

      .form-item {
        font-size: 14px;
        color: #c0bdc8;

        .title {
          font-weight: normal;
          font-size: 18px;
          color: #fff;
        }

        .pro {
          margin-top: 17px;
        }

        .wallet-list {
          li {
            display: inline-block;
            width: 160px;
            height: 51px;
            line-height: 48px;
            text-align: center;
            margin-right: 10px;
            margin-bottom: 9px;
            box-sizing: border-box;
            border: solid 2px #524a4b;
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
      }
      .amount {
        margin-top: 13px;
        .input-box {
          input {
            height: 51px;
            line-height: 51px;
            border-radius: 0;
            border: solid 2px #524a4b;
            &::placeholder {
              color: #c0bdc8;
            }
          }
        }
        .shortcut-btn {
          margin-top: 9px;
          display: flex;
          li {
            margin-right: 10px;
            width: 100px;
            height: 41px;
            font-size: 14px;
            line-height: 38px;
            text-align: center;
            color: #c0bdc8;
            box-sizing: border-box;
            border: solid 2px #524a4b;
            cursor: pointer;
            &:last-child {
              margin-right: 0;
            }
          }
        }
      }

      .transfer-btn {
        display: block;
        margin: 20px auto 0;
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

      .transferable-tips {
        margin-top: 3px;
        font-size: 14px;
        text-align: center;
        color: #c0bdc8;
        margin-bottom: 18px;
        span {
          font-family: Roboto;
          color: #fbde96;
        }
      }
    }
  }
}
</style>
