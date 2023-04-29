<template>
  <el-dialog
      custom-class="world-cup202-sub-dialog rescue-bonus-dialog"
      :visible="visible"
      v-dir-center="visible"
      width="393px"
      :append-to-body="true"
      :lock-scroll="true"
      @close="close"
      title="领取救援金"
      :close-on-click-modal="false">

    <div class="apply-bonus">
      <div class="apply-form">

        <div class="form-item wallet">
          <h5 class="title">请选择救援金转入的钱包</h5>
          <div class="pro">
            <ul class="radio-wallet">
              <li v-for="(arr, index) in walletTypeList"
                  :key="index"
                  @click="selectedWallet = arr"
                  :class="{'active': selectedWallet[0] === arr[0]}">{{ arr[1] }}</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="take">
        <button @click="close" class="take-btn">
          <span class="world-cup2022-sub-gradient-color">暂不领取</span>
        </button>
        <button @click="toTake" class="take-btn">
          <span class="world-cup2022-sub-gradient-color">{{ loading ? '领取中...' : '立即领取' }}</span>
        </button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'takeRescueBonus',
  props: ["visible", "walletTypeList", "takeParams"],
  data() {
    return {
      loading: false,
      selectedWallet: [],
    }
  },
  watch: {
    visible (bool) {
      if (bool) {
        this.selectedWallet = this.walletTypeList[0]
      }
    }
  },
  methods: {
    /**
     * 领取救援金
     * @return {Promise<void>}
     */
    async toTake() {
      if (this.loading) {
        return
      }
      this.loading = true
      const params = {
        from: "NM",
        to: this.selectedWallet[0],
        money: this.takeParams.bonus,
        active_id: this.takeParams.activeId
      }
      console.info("2022世界杯四重礼活动三领取入参：", params)

      try {
        const res = await this.$http(this.ApiSetting.user.transferSubmit, params)
        console.info("2022世界杯四重礼活动三领取响应：", res)
        if (res.status === 1) {
          this.close()
          this.$message({ message: `${this.takeParams.bonus}元救援金已发放至${this.selectedWallet[1]}钱包中，请注意查收`, type: 'success' })
          this.$emit('callback')
        }
        this.loading = false
      } catch (error) {
        console.info(error)
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
/deep/ .rescue-bonus-dialog {
  height: 353px;

  .el-dialog__body {
    height: 305px;
    position: relative;
    overflow: hidden;

    .apply-bonus {
      overflow: hidden;
      margin: 0 22px;
      .apply-form {
        margin-top: 5px;
        .form-item {
          margin-top: 23px;
          .title {
            font-size: 14px;
            font-weight: normal;
            color: #fff;
          }
          &.wallet {
            .pro {
              margin-top: 4px;
              .radio-wallet {
                display: flex;
                flex-wrap: wrap;
                li {
                  width: 108px;
                  height: 40px;
                  line-height: 40px;
                  text-align: center;
                  box-sizing: border-box;
                  margin-right: 12px;
                  margin-top: 10px;
                  border-radius: 6px;
                  box-shadow: 0 1px 1px 0 rgba(255, 0, 57, 0.3), inset 0px 1px 3px 0 rgba(0, 0, 0, 0.4);
                  background-color: rgba(69,8,30,0.2);
                  color: #fff;
                  font-size: 14px;
                  cursor: pointer;
                  &:nth-child(3n+3) {
                    margin-right: 0;
                  }
                  &.active {
                    box-shadow: 0 8px 12px 0 rgba(0, 0, 0, 0.31);
                    border: 1px solid #ffe6c7;
                    background-image: linear-gradient(to top, #7f1032, #bc0941), linear-gradient(to top, #c39c7b, #c49e7e, #edded3, #ffe6c7);
                    color: #fff690;
                    position: relative;
                    line-height: 38px;
                    &:after {
                      position: absolute;
                      content: "";
                      bottom: -1px;
                      right: 0;
                      width: 21px;
                      height: 21px;
                      background: url("../../../../../assets/active/worldCup2022Sub/radio_wallet_active.png") no-repeat;
                    }
                  }
                }
              }
            }
          }
        }
      }

      .take {
        width: 320px;
        margin: 15px auto 0;
        display: flex;
        justify-content: space-between;
        .take-btn {
          width: 160px;
          height: 76px;
          border: 0;
          background: url("../../../../../assets/active/worldCup2022/dialog_btn.png") no-repeat center top;
          background-size: 113% 100%;
          position: relative;
          cursor: pointer;
          span {
            position: absolute;
            top: 15px;
            left: 2px;
            width: 100%;
            text-align: center;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>
