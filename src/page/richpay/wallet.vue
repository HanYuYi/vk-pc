<template>
  <!-- 核心功能区-->
  <section class="wallet-rank">
    <!-- 时时盈利榜-->
    <div class="rank-list">
      <p class="title">•&nbsp;&nbsp;时时盈利榜&nbsp;&nbsp;•</p>
      <div class="list-box">
        <p class="none-list" v-if="!ranks.length">暂无数据</p>
        <transition-group name="list-complete" tag="ul" class="box">
          <li v-for="(item) in ranks"
              :key="item.key"
              class="list-complete-item">
            <span>{{item.time}}</span>
            <span class="name">{{item.show_username}}</span>
            <span class="interest">{{item.status_cn}} <i>{{item.amount}}</i></span>
          </li>
        </transition-group>
      </div>
    </div>

    <!-- 钱包-->
    <div class="wallet">
      <p class="big-title">V富通钱包</p>
      <div class="row1">
        <p>
          <span class="gray">总资产</span><br>
          <span>￥{{formatNumberSplit(richpayInitData.wallet_info.total_balance)}}</span>
        </p>
        <p style="text-align: center">
          <span class="gray">今日剩余红利额度</span><br/>
          <span class="interest blue">￥{{formatNumberSplit(richpayInitData.last_bonus)}}</span>
        </p>
        <p>
          <span class="gray">七日预期收益</span><br>
          <span>￥{{formatNumberSplit(richpayInitData.wallet_info.seven_day_ideal_income)}}</span>
        </p>
      </div>
      <div class="row2">
        <router-link :to="{name: 'userwithdraw', params: {type: 3}}"
                     class="v-btn">转入
        </router-link>
        <a class="v-btn"  @click="initWithdrawParams">转出</a>
        <a class="v-btn"  @click="initRecordparams" style="width: 140px">交易明细</a>
      </div>
      <div class="row3">
        <p>
          <span class="gray">未提利息</span><br>
          <span class="blue">￥{{formatNumberSplit(richpayInitData.wallet_info.interest_balance)}}</span>
        </p>
        <p>
          <span class="gray">年利率</span>
          <el-popover trigger="hover"
                      placement="bottom"
                      popper-class="richpay-rate"
                      width="200">
            <div class="rich-popover">
              <p>V富通VIP年利率</p>
                <div class="level-box">
                  <li v-for="(item,i) in richpayInitData.vip_year_conf" :key="i">
                    <span>{{item.vip_name}}</span>
                    <span>{{item.vip_apr ? item.vip_apr + '%' : '-'}}</span>
                  </li>
                </div>
            </div>
            <i slot="reference">!</i>
          </el-popover>
          <br>
          <span>{{richpayInitData.wallet_info.year_show}}%</span>
          <span v-if="richpayInitData.wallet_info.coupon_value"
                class="hot-tips">
            X{{ richpayInitData.wallet_info.coupon_value }}
          </span>
        </p>
        <p>
          <span class="gray">已提利息</span><br>
          <span>￥{{formatNumberSplit(richpayInitData.wallet_info.total_income)}}</span>
        </p>
      </div>
      <div class="row4">
        <p class="v-btn" @click="initWithdrawalInterest">提息</p>
        <p class="record-btn" @click="initAwardRecords">中奖记录</p>
        <p class="gray">
          当前<span :class="richpayInitData.wallet_info.lottery_chance > 0 && 'active'"> {{richpayInitData.wallet_info.lottery_chance}} </span>次抽奖机会
          <span class="active und"
                :class="!isLogin && 'disabled'"
                @click="richpayAward"
                v-if="richpayInitData.wallet_info.lottery_chance &&
              !richpayInitData.wallet_is_lock"> 立即抽奖
          </span>
        </p>
      </div>
    </div>

    <!-- 我的最近交易-->
    <div class="trade-list">
      <p class="title">•&nbsp;&nbsp;我的最近交易&nbsp;&nbsp;•</p>
      <p class="none-list" v-if="!recordsShow.length">{{isLogin ? '暂无数据' : '请登录' }}</p>
      <li v-for="(item,i) in recordsShow" :key="i">
        <span>{{item.time}}</span>
        <span :class="item.is_show_color && 'interest'">{{item.amount}}</span>
        <span>{{item.status_cn}}</span>
      </li>
      <div class="bottom-check" v-if="isLogin">
<!--        <p @click="tradeFilterChange">-->
<!--          <span :class="tradeFilter && 'checked'"></span>只看提息记录-->
<!--        </p>-->
        <Select v-model="tradeFilter"
                @on-change="tradeFilterChange"
                class="type-select">
          <Option v-for="item in bottomCheckOptions"
                  :value="item.id"
                  :key="item.id">{{ item.title }}
          </Option>
        </Select>
        <p>
          <span class="left" @click="pageChange(-1)"></span>
          {{currentPage}}/{{maxPage}}
          <span class="right" @click="pageChange(+1)"></span>
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from "vuex"
import { formatNumberSplit } from "../../utils/util"

export default {
  name: 'wallet',
  props: {

  },
  data() {
    return {
      timerO: null,
      ranks: [],
      currentPage: 1,
      recordsAll: [],                                     // 我的最近交易，所有数据
      recordsInt: [],                                     // 我的最近交易，提息数据
      recordsRedPack: [],                                 // 我的最近交易，红包数据
      recordsShow: [],                                    // 我的最近交易，当前展示数据
      maxPage: 0,
      tradeFilter: 0,
      luckDrawLoading: false,
      bottomCheckOptions: [
        { id: 0, title: "全部" },
        { id: 1, title: "提息记录" },
        { id: 2, title: "红包记录" },
      ]
    }
  },
  watch: {
    richpayInitData () {
      this.ranks = this.richpayInitData.time_to_time_records
      if (this.ranks.length > 7) {
        this.ranks.forEach(element => {
          element.key = element.show_username + Math.random()
        })
        clearInterval(this.timerO)
        this.timerO = setInterval(this.timer,3000)
      }

      this.initRecord()
    }
  },
  computed: {
    ...mapState(["richpayInitData", "isLogin"])
  },
  methods: {
    ...mapActions(["getRichpayData"]),
    formatNumberSplit(num) {
      num = !num ? 0 : num
      return formatNumberSplit(num)
    },
    // 登录验证
    verifyLogin() {
      if (!this.isLogin) {
        this.$message({message: "请您先登录！", type: "warning"})
        return false
      }
      return true
    },
    // 开启转出弹窗
    initWithdrawParams () {
      this.verifyLogin() && this.$emit("transferOut")
    },
    // 开启交易明细弹窗
    initRecordparams () {
      this.verifyLogin() && this.$emit("openTransactionDetails")
    },
    // 初始化提息弹窗
    initWithdrawalInterest() {
      if (this.verifyLogin()) {
        if (this.richpayInitData.wallet_info.interest_balance <= 0) {
          this.$message({ message: "你暂时没有未提利息哦~", type: "warning" })
          return
        }
        this.$emit("openInterest")
      }
    },
    // 抽奖
    richpayAward() {
      if (this.luckDrawLoading) return
      this.luckDrawLoading = true
      this.$http(this.ApiSetting.active.richPaylottery)
        .then(({ status , data}) => {
          if (status === 1) {
            this.$emit("luckDrawBack", data)
            this.getRichpayData()
          }
        })
        .finally(() => {
          this.luckDrawLoading = false
        })
    },
    // 中奖记录
    initAwardRecords () {
      if (this.luckDrawLoading) return
      if (!this.isLogin) {
        this.$message({message: '请您先登录！',type: 'warning'})
        return
      }
      this.$emit('openWinningRecord')
    },
    // 我的最近交易
    initRecord () {
      this.currentPage = 1
      this.recordsAll = this.richpayInitData.user_records
      this.recordsInt = this.richpayInitData.user_records.filter(item => item.is_show_color === 1)
      this.recordsRedPack = this.richpayInitData.user_records.filter(item => item.is_show_color === 2)
      this.recordsShow = this.recordsAll.slice(0,6)
      switch (this.tradeFilter) {
        case 0:
          this.maxPage = Math.ceil(this.recordsAll.length/6)
          break
        case 1:
          this.maxPage = Math.ceil(this.recordsInt.length/6)
          break
        case 2:
          this.maxPage = Math.ceil(this.recordsRedPack.length/6)
          break
      }
    },
    // 我的最近交易 - 只看提息记录
    tradeFilterChange () {
      this.currentPage = 1
      switch (this.tradeFilter) {
        case 0:
          this.recordsShow = this.recordsAll.slice(0,6)
          this.maxPage = Math.ceil(this.recordsAll.length/6)
          break
        case 1:
          this.recordsShow = this.recordsInt.slice(0,6)
          this.maxPage = Math.ceil(this.recordsInt.length/6)
          break
        case 2:
          this.recordsShow = this.recordsRedPack.slice(0,6)
          this.maxPage = Math.ceil(this.recordsRedPack.length/6)
          break
      }
    },
    // 我的最近交易 - 分页
    pageChange (num) {
      let maxPage
      switch (this.tradeFilter) {
        case 0:
          maxPage = Math.ceil(this.recordsAll.length/6)
          break
        case 1:
          maxPage = Math.ceil(this.recordsInt.length/6)
          break
        case 2:
          maxPage = Math.ceil(this.recordsRedPack.length/6)
          break
      }
      if (this.currentPage + num <= 0 || this.currentPage + num > maxPage) return
      this.currentPage += num
      switch (this.tradeFilter) {
        case 0:
          this.recordsShow = this.recordsAll.slice((this.currentPage-1)*6,(this.currentPage-1)*6 + 6)
          break
        case 1:
          this.recordsShow = this.recordsInt.slice((this.currentPage-1)*6,(this.currentPage-1)*6 + 6)
          break
        case 2:
          this.recordsShow = this.recordsRedPack.slice((this.currentPage-1)*6,(this.currentPage-1)*6 + 6)
          break
      }
    },
    timer() {
      let a = this.ranks[0]
      this.ranks.shift()
      setTimeout(()=>{this.ranks.push(a)},1000)
    },
    beforeDestroy () {
      this.timerO && clearInterval(this.timerO)
    }
  }
}
</script>

<style lang="less" scoped>
.wallet-rank {
  position: relative;
  width: 1240px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  min-height: 372px;
  .rank-list {
    background: url('../../assets/richpay/sprite.png') no-repeat;
    width: 280px;
    height: 372px;
    .title {
      font-size: 24px;
      color: #fff;
      font-weight: bold;
      text-align: center;
      margin: 27px 0;
    }
    .list-box {
      width: 240px;
      height: 245px;
      margin: 0 auto;
      overflow: hidden;

      .none-list {
        font-size: 18px;
        text-decoration: underline;
        color: #ababab;
        text-align: center;
        margin-top: 100px
      }
      .box {
        overflow: hidden;
      }
      li {
        margin-bottom: 22px;
        display: flex;
        justify-content: space-between;
        span {
          display: inline-block;
        }
        span:nth-child(2) {
          width: 50px!important;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        span:nth-child(3) {
          width: 70px;
          text-align: right;
        }
      }
      .list-complete-item {
        width: 240px;
        transition: all 1s;
        color: #fff;
        .name {
          display: inline-block;
          width: 84px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .list-complete-enter {
        transform: translateY(35px);
      }
      .list-complete-enter-to {
        transform: translateY(0px);
      }
      .list-complete-leave-to {
        transition: all .1s;
      }
      .list-complete-leave-active {
        position: absolute;
      }
    }
    .interest i{
      color: #83f9fd;
    }
  }
  .wallet {
    background: url('../../assets/richpay/wallet.png') no-repeat;
    width: 615px;
    height: 372px;
    font-size: 18px;
    color: #fff;

    .big-title {
      font-size: 24px;
      font-weight: bold;
      margin-left: 37px;
      margin-top: 37px;
    }

    .disabled {
      pointer-events: none;
    }
    i {
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
      vertical-align: unset;
      &:hover {
        border: 1px solid #83f9fd;
        color: #83f9fd;
      }
    }
    .gray {
      color: #fff;
      display: inline-block;
      margin-bottom: 5px;
      .active {
        color: #83f9fd;
      }
      .und {
        text-decoration: underline;
        cursor: pointer;
        font-size: 20px;
      }
    }
    .blue {
      color: #83f9fd;
    }
    .hot-tips {
      display: inline-block;
      width: 39px;
      height: 16px;
      background: url("../../assets/icon_es.png") no-repeat;
      background-position: -1416px -228px;
      font-size: 12px;
      line-height: 16px;
      letter-spacing: 0.3px;
      text-align: center;
      color: #303441;
    }
    .row1 {
      display: flex;
      width: 87%;
      margin-left: 37px;
      margin-top: 13px;
      justify-content: space-between;
      p:nth-child(2) {
        text-align: right;
      }
    }
    .v-btn {
      width: 120px;
      height: 40px;
      border: 2px solid transparent;
      border-radius: 20px;
      margin-right: 22px;
      text-align: center;
      line-height: 36px;
      font-size: 18px;
      box-sizing: border-box;
      cursor: pointer;
      background-clip: padding-box, border-box;
      background-origin: padding-box, border-box;
      background-image: linear-gradient(to right, #3a3db5, #3a3db5), linear-gradient(90deg, #07f1b7, #07e9f1);
      &:hover {
        background-image: linear-gradient(to right, #3e44c0, #251e88), linear-gradient(90deg, #07f1b7, #07e9f1);
      }
    }
    .row2 {
      display: flex;
      margin-left: 37px;
      margin-top: 13px;
      p {
        width: 120px;
        height: 40px;
        background-image: linear-gradient(to right, #494d5e, #3e4250), linear-gradient(90deg, #07f1b7, #07e9f1);
      }
      p:nth-child(1) {
        background-image: linear-gradient(to right, #494d5e, #474a58), linear-gradient(90deg, #07f1b7, #07e9f1);
      }
      p:nth-child(3) {
        width: 140px;
        background-image: linear-gradient(to right, #43475a, #373b4b), linear-gradient(90deg, #07f1b7, #07e9f1);
      }
    }
    .row3 {
      display: flex;
      width: 87%;
      justify-content: space-between;
      margin-left: 37px;
      margin-top: 40px;
    }
    .row4 {
      display: flex;
      width: 87%;
      justify-content: space-between;
      align-items: center;
      margin-left: 37px;
      margin-top: 12px;
      .record-btn {
        font-size: 20px;
        color: #83f9fd;
        text-decoration: underline;
        margin-left: -100px;
        cursor: pointer;
      }
    }
  }
  .trade-list {
    background: url('../../assets/richpay/sprite.png') no-repeat;
    width: 280px;
    height: 372px;
    .title {
      font-size: 24px;
      color: #fff;
      font-weight: bold;
      text-align: center;
      margin: 27px 0px;
    }
    .none-list {
      font-size: 18px;
      text-decoration: underline;
      color: #ababab;
      text-align: center;
      margin-top: 130px
    }
    .interest {
      color: #83f9fd;
    }
    li {
      width: 235px;
      margin-left: 20px;
      margin-bottom: 22px;
      color: #fff;
      span:nth-child(2) {
        margin-left: 30px
      }
      span:nth-child(3) {
        float: right;
      }
      span:nth-child(4) {
        float: right;
        margin-right: 5px;
      }
    }

    .bottom-check {
      width: 240px;
      margin-left: 20px;
      margin-top: 50px;
      display: flex;
      position: absolute;
      bottom: 25px;
      justify-content: space-between;
      color: #fff;
     /* p:nth-child(1) {
        display: flex;
        align-items: center;
        cursor: pointer;
        span {
          display: inline-block;
          width: 18px;
          height: 18px;
          margin-right: 8px;
          border: 1px solid #fff;
          border-radius: 18px;
          &.checked {
            &::after {
              content: "";
              display: block;
              width: 12px;
              height: 12px;
              margin-top: 3px;
              margin-left: 3px;
              border-radius: 10px;
              background: #83f9fd;
            }
          }
        }
      }*/
      .type-select {
        /deep/ .ivu-select-selection {
          width: 120px;
          height: 28px;
          line-height: 28px;
          border-radius: 6px;
          border: solid 1px #71e7e8;
          .ivu-select-selected-value {
            height: 28px;
            line-height: 26px;
          }
          .ivu-select-arrow {
            margin-top: -5px;
          }
        }
        /deep/ .ivu-select-dropdown {
          margin: 2px 0 5px;
          width: 120px;
          border: solid 1px #71e7e8;
          background-color: #232656;
          border-radius: 6px;
          .ivu-select-item {
            width: calc(100% - 20px);
            height: 30px;
            line-height: 30px;
            padding: 0 10px;
            margin: 0;
            color: #a1a3df;
            &:hover {
              color: #83f9fd;
            }
            &.ivu-select-item-selected {
              background-color: #373aaf;
              color: #83f9fd;
              position: relative;
              &:after {
                position: absolute;
                content: "";
                width: 14px;
                height: 14px;
                right: 14px;
                top: 8px;
                background: url("../../assets/richpay/input_selected.png") no-repeat;
              }
            }
          }
        }
      }
      p {
        width: 80px;
        height: 16px;
        margin-top: 6px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .left {
        display: inline-block;
        width: 10px;
        height: 16px;
        cursor: pointer;
        background: url('../../assets/richpay/btn-normal-l.png');
        &:hover {
          background: url('../../assets/richpay/btn-hover-l.png')
        }
      }
      .right {
        display: inline-block;
        width: 10px;
        height: 16px;
        cursor: pointer;
        background: url('../../assets/richpay/btn-normal-r.png');
        &:hover {
          background: url('../../assets/richpay/btn-hover_r.png');
        }
      }
    }
  }
}
</style>

<style lang="less">
.richpay-rate {
  box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.4);
  border: 1px solid #83f9fd;
  background: #232656;
  .rich-popover {
    p:nth-child(1) {
      font-size: 18px;
      color: white;
      text-align: center;
      margin-top: 18px;
      margin-bottom: 20px;
    }
    .level-box {
      width: 100%;
      height: 177px;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      position: relative;
      &::after {
        content: "";
        display: block;
        position: absolute;
        left: 100px;
        width: 1px;
        height: 160px;
        opacity: 0.25;
        background: #ababab;
      }
    }
    li {
      width: 40%;
      display: flex;
      margin-bottom: 4px;
      margin-left: 5%;
      justify-content: space-between;
      font-size: 14px;
      span:nth-child(1) {
        color: #fff;
      }
      span:nth-child(2) {
        color: #83f9fd;
      }
    }
  }
  .popper__arrow {
    border-top-color: #83f9fd!important;
    border-bottom-color: #83f9fd!important;
    &:after {
      border-top-color: #232656!important;
      border-bottom-color: #232656!important;
    }
  }
}
</style>
