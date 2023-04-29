<template>
  <div v-if="richpayInitData.is_use_richpay"
       class="rich-pay">
    <!-- 头部-->
    <div class="rich-head">
      <div class="title">
        <i class="logo"></i>
        <h4>V富通钱包</h4>
      </div>
      <router-link
        to="/richpay"
        class="jump">了解钱包详情
      </router-link>
    </div>

    <!-- 主体功能区-->
    <div class="rich-main">
      <!-- 余额区-->
      <div class="left">
        <div class="balance-panel">
          <div class="balance">
            <h6>总资产</h6>
            <p v-if="richpayInitDataLoading" v-html="loadingTag"></p>
            <p v-else>
              <span>￥</span>
              {{ formatNumberSplit(richpayInitData.wallet_info.total_balance) }}
            </p>
          </div>
          <div class="balance money-rates" style="text-align: right;">
            <h6>未提利息</h6>
            <p v-if="richpayInitDataLoading" v-html="loadingTag"></p>
            <p v-else>
              <span>￥</span>
              {{ formatNumberSplit(richpayInitData.wallet_info.interest_balance) }}
            </p>
          </div>
        </div>
        <div class="btns">
          <p v-if="richpayInitDataLoading" v-html="loadingTag"></p>
          <template v-else>
            <router-link :to="{name: 'userwithdraw', params: {type: 3}}"
                         class="el-button el-button--primary">转入
            </router-link>
            <a @click="initWithdrawParams"
               class="el-button el-button--primary">转出</a>
            <a @click="initRecordparams"
               class="el-button el-button--primary">明细</a>
            <a @click="initWithdrawalInterest"
               class="el-button el-button--primary">提息</a>
          </template>
        </div>
      </div>

      <!-- 说明区-->
      <div class="right">
        <div class="desc-panel">
          <div class="balance">
            <h6>
              年利率
              <!-- VIP年利率浮窗-->
              <el-popover
                trigger="hover"
                placement="bottom"
                popper-class="rate-explain">
                <div class="content">
                  <h6 class="title">V富通VIP年利率</h6>
                  <ul class="level-rate">
                    <li v-for="(item, index) in richpayInitData.vip_year_conf"
                        :key="index">
                      <span>{{ item.vip_name }}</span>
                      <small>{{ item.level === 0 ? '-' : `${item.vip_apr}%` }}</small>
                    </li>
                  </ul>
                </div>
                <i slot="reference"
                   class="ponit-out">!
                </i>
              </el-popover>
            </h6>
            <p v-if="richpayInitDataLoading" v-html="loadingTag"></p>
            <p v-else>{{ richpayInitData.wallet_info.year_show }}%</p>
            <i v-if="richpayInitData.wallet_info.coupon_value"
               class="hot-tips">
              X{{ richpayInitData.wallet_info.coupon_value }}
            </i>
          </div>
          <div class="balance">
            <h6>七日预期收益 </h6>
            <p v-if="richpayInitDataLoading" v-html="loadingTag"></p>
            <p v-else>
              <span>￥</span>
              {{ formatNumberSplit(richpayInitData.wallet_info.seven_day_ideal_income) }}
            </p>
          </div>
          <div class="balance" style="text-align: right;">
            <h6>已提利息</h6>
            <p v-if="richpayInitDataLoading" v-html="loadingTag"></p>
            <p v-else>
              <span>￥</span>
              {{ formatNumberSplit(richpayInitData.wallet_info.total_income) }}
            </p>
          </div>
        </div>
        <div class="oper-panel">
          <small>已获
            <span v-if="richpayInitData.wallet_info.lottery_chance">
              {{ richpayInitData.wallet_info.lottery_chance }}
            </span>
            <template v-else>
              {{ richpayInitData.wallet_info.lottery_chance }}
            </template>
            次抽奖机会
          </small>
          <a v-if="
          richpayInitData.wallet_info.lottery_chance &&
          !richpayInitData.wallet_is_lock"
             class="luck-draw"
             :class="{'disabled': luckDrawLoading}"
          @click="richpayAward">抽奖
          </a>
        </div>
      </div>
    </div>

    <!-- V富通钱包 - 转出 -->
    <useroverviewrichpay-withdraw
      :visible.sync="richpayWithdraw.visible"
      :params="richpayWithdraw.params"
      @back="transferOutBack"/>

    <!--转出成功后，参与活动领好礼 dialog-->
    <user-transfer-out-gift
      :visible.sync="transferOutBackParams.visible"
      :params="transferOutBackParams.params"/>

    <!-- V富通钱包 - 交易明细记录-->
    <useroverviewrichpay-Record :visible.sync="richpayRecord.visible"/>

    <!-- V富通钱包 - 提息-->
    <useroverviewrichpay-withdrawal-interest
      :visible.sync="richpayWithdrawalInterest.visible"
      :params="richpayWithdrawalInterest.params"/>

    <!-- V富通钱包 - 抽奖-->
    <useroverviewrichpay-award :visible.sync="richPayAwardInfo.visible"
                               :params="richPayAwardInfo.params"/>

 </div>
</template>

<script>
import { formatNumberSplit } from "../../utils/util"
import { mapActions, mapState } from 'vuex'
import UseroverviewrichpayWithdraw from "./useroverviewrichpayWithdraw"
import UseroverviewrichpayRecord from "./useroverviewrichpayRecord"
import UseroverviewrichpayWithdrawalInterest from "./useroverviewrichpayWithdrawalInterest"
import UseroverviewrichpayAward from "./useroverviewrichpayAward"
import UserTransferOutGift from "./user-transfer-out-gift"

export default {
  name: "useroverviewrichpay",
  components: {
    UseroverviewrichpayWithdraw,
    UseroverviewrichpayRecord,
    UseroverviewrichpayWithdrawalInterest,
    UseroverviewrichpayAward,
    UserTransferOutGift
  },
  data () {
    return {
      luckDrawLoading: false,
      richpayWithdraw: {                  // V富通钱包-转出 dialog控制
        visible: false,
        params: {}
      },
      richpayRecord: {                    // V富通钱包-交易明细记录 dialog控制
        visible: false
      },
      richpayWithdrawalInterest: {        // V富通钱包-提息 dialog控制
        visible: false,
        params: {}
      },
      richPayAwardInfo: {                 //V富通 抽奖弹窗
        visible: false,
        params: {
          type: 1
        }
      },
      transferOutBackParams: {            // 转出成功后，参与活动领好礼 dialog
        visible: false,
        params: {}
      },
    }
  },
  computed: {
    ...mapState(["richpayInitData", "richpayInitDataLoading"]),
    loadingTag() {
      let tag = '<span class="money_loading">'
      for (let i = 0;i < 3;i++) {
        tag += '<i class="dot"></i>'
      }
      tag += '</span>'
      return tag
    }
  },
  mounted () {
    this.getRichpayData()
  },
  methods: {
    ...mapActions(["getRichpayData"]),
    formatNumberSplit(num) {
      return formatNumberSplit(num)
    },
    // 初始化转出弹窗
    initWithdrawParams () {
      this.richpayWithdraw = {
        params: {
          total_balance: this.richpayInitData.wallet_info.total_balance,
          richpay_seven_day_rate: this.richpayInitData.wallet_info.richpay_seven_day_rate,
          wallet_is_lock: this.richpayInitData.wallet_is_lock
        },
        visible: true
      }
    },
    // 初始化明细弹窗
    initRecordparams () {
      this.richpayRecord.visible = true
    },
    // 初始化提息弹窗
    initWithdrawalInterest() {
      if (this.richpayInitData.wallet_info.interest_balance <= 0) {
        this.$message({ message: "你暂时没有未提利息哦~", type: "warning" })
        return
      }
      this.richpayWithdrawalInterest = {
        params: {
          interest_balance: this.richpayInitData.wallet_info.interest_balance,
          withdraw_min_amount: this.richpayInitData.wallet_info.withdraw_min_amount,
          wallet_is_lock: this.richpayInitData.wallet_is_lock
        },
        visible: true
      }
    },
    // 抽奖
    richpayAward() {
      if (this.luckDrawLoading) return
      this.luckDrawLoading = true
      this.$http(this.ApiSetting.active.richPaylottery)
        .then(({ status, data }) => {
          if (status === 1) {
            //data.type == 2 && storage.set('havaAward', data.coupon_id)
            this.richPayAwardInfo = {
              params: data,
              visible: true
            }
            this.getRichpayData()
          }
        })
        .finally(() => {
          this.luckDrawLoading = false
        })
    },
    transferOutBack (row) {
      let timer
      clearTimeout(timer)
      timer = setTimeout(() => {
        this.transferOutBackParams = {
          params: row,
          visible: true
        }
        clearTimeout(timer)
      }, 500)
    }
  }
}
</script>

<style lang="less" scoped>
@rich-pay-padding-x: 30px;
@rich-pay-hr: 1px;
@default-font-style: "Microsoft YaHei","\5FAE\8F6F\96C5\9ED1",Helvetica,Arial,sans-serif;
@icon: url("../../assets/icon_es.png") no-repeat;

.rich-pay {
 position: relative;
 margin-top: 20px;
 width: calc(824px - @rich-pay-padding-x * 2);
 height: calc(218px - 36px - 26px);
 padding: 36px 30px 26px;
 background-image: linear-gradient(to bottom right, rgba(72, 77, 96, 0.9), rgba(48, 52, 65, 0.1));
 border-radius: 4px;
 box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.4);
 &:before {
   position: absolute;
   content: "";
   width: 1px;
   height: 115px;
   top: 77px;
   left: calc((100% - @rich-pay-hr) / 2);
   background: @icon;
   background-position: -573px -458px;
 }
  .rich-head {
   display: flex;
   justify-content: space-between;
   .title {
     .logo {
       display: inline-block;
       width: 44px;
       height: 40px;
       background: @icon;
       background-position: -1340px -219px;
       vertical-align: top;
     }
     h4 {
       display: inline-block;
       font-family: vkFont;
       font-size: 30px;
       font-weight: normal;
       line-height: 40px;
       letter-spacing: 0.75px;
       color: #ffffff;
       margin-left: 10px;
     }
   }
   .jump {
     display: block;
     font-size: 12px;
     line-height: 32px;
     letter-spacing: 0.3px;
     color: #08edb4;
     text-decoration: underline;
   }
 }
  .rich-main {
    display: flex;
    justify-content: space-between;
    .left, .right {
      width: calc((100% - @rich-pay-hr  - @rich-pay-padding-x * 2) / 2);
      .balance-panel, .desc-panel {
        display: flex;
        justify-content: space-between;
        margin: 12px 0 26px;
        .balance {
          width: inherit;
          height: 46px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          h6 {
            font-size: 14px;
            font-weight: normal;
            line-height: 14px;
            letter-spacing: 0.35px;
            color: #7c839f;
            .ponit-out {
              display: inline-block;
              height: 18px;
              line-height: 16px;
              width: 18px;
              border-radius: 50%;
              text-align: center;
              box-sizing: border-box;
              border: 1px solid #767c97;
              color: #767c97;
              cursor: pointer;
              font-size: 14px;
              margin-left: 5px;
              vertical-align: middle;
            }
          }
          p {
            font-size: 20px;
            line-height: 20px;
            letter-spacing: 0.5px;
            font-family: vkFont;
            color: #ffffff;
            span {
              color: #7c839f;
              font-family: @default-font-style;
              font-weight: bold;
              font-size: 16px;
            }
          }
          &.money-rates {
            p {
              color: #07f1bc;
            }
          }
          .hot-tips {
            display: block;
            position: absolute;
            bottom: -20px;
            left: 0;
            width: 39px;
            height: 16px;
            background: @icon;
            background-position: -1416px -228px;
            font-size: 12px;
            line-height: 16px;
            letter-spacing: 0.3px;
            text-align: center;
            color: #303441;
          }
        }
      }
      .btns {
        width: 331px;
        display: flex;
        justify-content: space-between;
        margin-left: 20px;
      }
    }
    .right {
      width: calc((100% - @rich-pay-hr  - @rich-pay-padding-x * 2) / 2);
      .desc-panel {

      }
      .oper-panel {
        display: flex;
        justify-content: end;
        small {
          line-height: 32px;
          //margin-right: 14px;
          span {
            color: #07f1bc;
          }
        }
        .luck-draw {
          padding-left: 14px;
          font-size: 14px;
          line-height: 32px;
          letter-spacing: 0.3px;
          color: #08edb4;
          text-decoration: underline;
          cursor: pointer;
          &.disabled {
            opacity: 0.5;
          }
        }
      }
    }
  }
}

</style>
<style lang="less">
.rate-explain {
  box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.4);
  .content {
    width: 190px;
    margin: 13px auto;
    .title {
      font-size: 14px;
      font-weight: normal;
      text-align: center;
      color: #ffffff;
    }
    .level-rate {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      width: 190px;
      height: 161px;
      margin: 20px auto 0;
      align-items: center;
      position: relative;
      &:before {
        position: absolute;
        top: 4.5px;
        left: 94.5px;
        content: "";
        width: 0;
        height: 152px;
        opacity: 0.25;
        border-right: 1px solid #ababab;
      }
      li {
        width: 70px;
        font-size: 14px;
        line-height: 23px;
        text-align: left;
        display: flex;
        justify-content: space-between;
        span {
          color: #787e99;
        }
        small {
          color: #ffffff;
        }
      }
    }
  }
}
</style>
