<template>
  <div class="world-cup2022-jackpot">
    <ul class="jackpot">
      <li class="amount-unit"></li>
      <li v-for="(txt, index) in filterAmount" :key="index"
          :class="`amount-${classType(txt)}`"
          :style="{
            width: `${amountImgWidthList[txt]}px`,
            backgroundPositionY: `-${typeof +txt === 'number' ? +txt * 64 : 0 }px`
          }">
      </li>
    </ul>
  </div>
</template>

<script>
import { formatNumberSplit } from "@/utils/util";

export default {
  name: 'jackpot',
  props: ["loop"],
  data() {
    return {
      amountImgWidthList: [53, 34, 47, 47, 51, 47, 50, 46, 52, 50],
      amount: 0.000000,
      newAmount: 0
    }
  },
  computed: {
    filterAmount() {
      return this.amount <= 0 ?
        ["0", ".", "0", "0", "0", ",", "0", "0", "0", ",", "0", "0"] :
        formatNumberSplit(this.amount).split("")
    }
  },
  watch: {
    loop(bool) {
      if (bool) {
        this.getJackpot()
        this.loopGetJackpot()
      } else {
        this.getJackpot()
      }
    }
  },
  methods: {
    // 返回数字对应的图片的css类名
    classType(txt) {
      if (txt.trim() === ",") {
        return "comma"
      }
      if (txt.trim() === ".") {
        return "spot"
      }
      if (typeof +txt === "number") {
        return +txt
      }
    },

    // 轮询获取奖池金额
    loopGetJackpot() {
      this.timer = setInterval(this.getJackpot, 1000 * 10)
    },

    // 获取奖池金额
    async getJackpot() {
      // const params = { current_time: (currentTimeStamp + (1000 * 60 * 60 * 24 * 30)) / 1000 }
      const res = await this.$http(this.ApiSetting.active.worldCup2022.worldCupJackpot)
      console.info("2022世界杯奖池金额响应：", res)

      if (res.status === 1 && res.data) {
        this.amount = +res.data[0]
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
    this.timer = null
  }
}
</script>

<style lang="less" scoped>
.world-cup2022-jackpot {
  width: 865px;
  height: 181px;
  background:url("../../../../assets/active/worldCup2022/jackpot_bg.png");
  margin: 18px auto 0;
  border-top: 0.1px solid transparent;
  .jackpot {
    display: flex;
    margin: 70px 0 0 190px;
    width: 630px;
    height: 64px;
    overflow: hidden;
    li {
      height: inherit;
      background-image: url("../../../../assets/active/worldCup2022/jackpot_number.png");
      background-repeat: no-repeat;
      transition: background-position  0.8s, width 0.8s;

      &.amount-unit {
        width: 53px;
        height: 65px;
        background-image: url("../../../../assets/active/worldCup2022/jackpot_unit.png");
      }
      &.amount-comma {
        margin-top: 40px;
        width: 20px;
        height: 33px;
        background-image: url("../../../../assets/active/worldCup2022/jackpot_comma.png");
        background-position: center top!important;
      }
      &.amount-spot {
        margin-top: 40px;
        width: 26px;
        height: 26px;
        background-image: url("../../../../assets/active/worldCup2022/jackpot_spot.png");
      }
    }
  }
}
</style>
