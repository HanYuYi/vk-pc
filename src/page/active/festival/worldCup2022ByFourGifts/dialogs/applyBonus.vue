<template>
  <el-dialog
      custom-class="world-cup202-by-four-gifts-dialog apply-bonus-dialog"
      :visible="visible"
      v-dir-center="visible"
      width="393px"
      :append-to-body="true"
      :lock-scroll="true"
      @close="close"
      title="申请竞猜奖金"
      :close-on-click-modal="false">

    <div class="apply-bonus">
      <div class="apply-form">

        <div class="form-item wallet">
          <h5 class="title">请选择竞猜奖金转入的钱包</h5>
          <div class="pro">
            <ul class="radio-wallet">
              <li v-for="(row, index) in walletTypeList"
                  :key="index"
                  @click="selectedWallet = row.code"
                  :class="{'active': selectedWallet === row.value}">{{ row.name }}</li>
            </ul>
          </div>
        </div>

        <div class="form-item bill-no">
          <h5 class="title">请填写申请注单的注单号</h5>
          <div class="pro">
            <div class="input-box">
              <Input v-model="billNo" />
            </div>
          </div>
        </div>
      </div>

      <div @click="toApply" class="take">
        <button class="take-btn">
          <span class="world-cup2022-four-gifts-gradient-color">暂不申请</span>
        </button>
        <button class="take-btn">
          <span class="world-cup2022-four-gifts-gradient-color">立即申请</span>
        </button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'applyBonus',
  props: ["visible", "walletTypeList"],
  data() {
    return {
      billNo: ''
    }
  },
  methods: {
    toApply() {

    },

    close() {
      this.$emit("update:visible", false)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .apply-bonus-dialog {
  height: 403px;

  .el-dialog__body {
    height: 355px;
    position: relative;
    overflow: hidden;

    .apply-bonus {
      overflow: hidden;
      margin: 0 22px;
      .apply-form {
        margin-top: 5px;
        .form-item {
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
                  margin-right: 13px;
                  margin-top: 10px;
                  border-radius: 6px;
                  box-shadow: 0 1px 1px 0 rgba(255, 0, 57, 0.5), inset 0px 1px 3px 0 rgba(0, 0, 0, 0.4);
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
                    &:after {
                      position: absolute;
                      content: "";
                      bottom: 0;
                      right: 0;
                      width: 21px;
                      height: 21px;
                      background: url("../../../../../assets/active/worldCup2022ByFourGifts/radio_wallet_active.png") no-repeat;
                    }
                  }
                }
              }
            }
          }
          &.bill-no {
            
          }
        }
      }
    }
  }
}
</style>
