<template>
  <div class="rabbit-farm-new-year2023">

    <!-- 奖品预览-->
    <div class="prize-preview">
      <vue-seamless-scroll :data="initInfo.prize_goods"
                           :class-option="optionSingleHeightTime"
                           class="preview-hide">
        <ul :style="{width: `${210 * initInfo.prize_goods.length}px`}">
          <li v-for="(item, index) in initInfo.prize_goods" :key="index">
            <i class="prize-type"
               :class="`type-${findGoodsTypeInfo(item.goods_level)}`">
            </i>
            <img :src="item.goods_pic" alt="">
            <Tooltip class="tooltip_2022" :content="item.goods_name" placement="bottom">
              <p>{{ item.goods_name }}</p>
            </Tooltip>
          </li>
        </ul>
      </vue-seamless-scroll>
    </div>

    <h4 class="active-desc">
      <p>活动期间，会员每日首充金额达到指定额度，即可获得1次投喂机会，当日或每个自然周内完成相应需求的累计次数还能喜提大奖哦！</p>
    </h4>

    <!-- 兔兔农场主体-->
    <div class="active-content">
      <div class="comprehensive">

        <!-- 左侧奖品-->
        <ul class="prize-left">
          <li v-for="(item, index) in prizeList.slice(0, 6)"
              :key="index"
              @click="toTakePrize('line', item.flag)"
              :class="[
                {receive: initInfo.bonus_status.line && initInfo.bonus_status.line[item.flag] && initInfo.bonus_status.line[item.flag].status === 2},
                {already: initInfo.bonus_status.line && initInfo.bonus_status.line[item.flag] && initInfo.bonus_status.line[item.flag].status === 1},
              ]">
            <i :style="{backgroundImage: `url(${item.icon})`}"></i>
          </li>
        </ul>

        <dl class="operating-area">

          <!-- 头部-->
          <dt>
            <img src="../../../../assets/active/newYear2023/max_prize_icon.png"
                 alt=""
                 class="max-prize-icon"
                 @click="awardDialogVisible = true">

            <div class="progress-day">
              <h5>
                <p>当日累计投喂<span>25</span>次可领取</p>
                <p><span>{{ initInfo.bonus_status.feed ? initInfo.bonus_status.feed.length : 0 }}</span> / 25</p>
              </h5>
              <div class="progress-day-bar">
                <div v-if="initInfo.bonus_status.feed" :style="{width: `${248 / 25 * initInfo.bonus_status.feed.length}px`}" class="progress-value"></div>
              </div>

            </div>

            <button @click="toTakePrize('line', prizeList[prizeList.length - 1].flag)"
                    class="take-prize"
                    :class="{already: initInfo.is_login && initInfo.bonus_status.line && initInfo.bonus_status.line['M'] && initInfo.bonus_status.line['M'].status === 1}">
              <span v-if="initInfo.is_login && initInfo.bonus_status.line && initInfo.bonus_status.line['M'] && initInfo.bonus_status.line['M'].status === 1"
                    class="new-year2023-gradient-color-1">已领取</span>
              <span v-else class="new-year2023-gradient-color-1">领取大奖</span>
            </button>

            <div @click="openRecdDialog" class="winning-record">中奖记录</div>

            <div @click="awardDialogVisible = true" class="reward-preview">奖励预览</div>

          </dt>

          <dd>
            <!-- 兔子洞-->
            <ul>
              <li v-for="num in 25" :key="num"
                  @click="rabbitPoint(num)"
                  @mouseenter="rabbitHover = num"
                  @mouseleave="rabbitHover =0;rabbitNotHover = num"
                  :class="[
                    {already: initInfo.bonus_status.feed && initInfo.bonus_status.feed.includes(num)},
                    {expect: feedRabbitTime > 0 && initInfo.bonus_status.feed && !initInfo.bonus_status.feed.includes(num)},
                  ]">
                <img v-if="initInfo.bonus_status.feed && initInfo.bonus_status.feed.includes(num)"
                     src="../../../../assets/active/newYear2023/rabbit_item_al.gif" alt=""
                     class="exhausted">
                <img v-else-if="rabbitHover === num"
                     src="../../../../assets/active/newYear2023/rabbit_item_ex.gif" alt=""
                     class="move">
                <img v-else-if="rabbitNotHover === num"
                     src="../../../../assets/active/newYear2023/rabbit_item.gif" alt=""
                     class="move-out">
                <img v-else
                     src="../../../../assets/active/newYear2023/rabbit_item.png" alt=""
                     class="normal">
              </li>
            </ul>
          </dd>
        </dl>
      </div>

      <!-- 底侧奖品-->
      <ul class="prize-bottom">
        <li v-for="(item, index) in prizeList.slice(6, 12)"
            :key="index"
            @click="toTakePrize('line', item.flag)"
            :class="[
               {receive: initInfo.bonus_status.line && initInfo.bonus_status.line[item.flag] && initInfo.bonus_status.line[item.flag].status === 2},
               {already: initInfo.bonus_status.line && initInfo.bonus_status.line[item.flag] && initInfo.bonus_status.line[item.flag].status === 1},
             ]">
          <i :style="{backgroundImage: `url(${item.icon})`}"></i>
        </li>
      </ul>

      <!-- 当天充值进度条-->
      <div class="deposit-progress">
        <div :style="{width: `${todayRechargeProgress}px`}" class="progress-value"></div>
        <ul class="node-parent">
          <li v-for="(nodeAmount, index) in depositProgressNode"
              :key="index"
              class="progress-node"
              :class="{recharged: initInfo.can_feed_num - 1 >= index}">
            <em v-if="index + 1 === depositProgressNode.length">无限</em>

            <i v-if="initInfo.can_feed_num - 1 >= index" class="bubble">
              {{ index < depositProgressNode.length - 1 ? '+1' : `+${initInfo.can_feed_num - (depositProgressNode.length - 1)}`}}
            </i>

            <p v-if="index < depositProgressNode.length - 1" class="node-desc">充值¥{{ nodeAmount }}</p>
            <p v-else class="node-desc">每多充值¥{{ nodeAmount }}</p>

          </li>
        </ul>
      </div>

      <button @click.stop="toFeedRabbit"
              class="new-year2023-btn1 feed-rabbit">
        <span class="new-year2023-gradient-color">去投喂</span>
        <i v-if="feedRabbitTime > 0">
          {{ feedRabbitTime }}
        </i>
      </button>

      <p class="recharge-today-total">
        今日累计首充：<b>￥{{ initInfo.my_deposit | formatNumberByFloat }}</b>
        <router-link to="/user/finance">【去充值】</router-link>
      </p>
    </div>

    <!-- 周累投喂奖-->
    <div class="week-prize">
      <p class="week-total-time">
        本周累计投喂进度：<b>{{ initInfo.week_feed_num }}</b> 次
      </p>

      <div class="week-progress">
        <div :style="{width: `${weekProgress}px`}" class="progress-value"></div>
        <ul class="node-parent">
          <li v-for="(item, index) in resetTimeWeekProgressNode"
              :key="index"
              class="progress-node"
              :class="[
                {available: week[item.flag] && week[item.flag].status === 2},
                {received: week[item.flag] && week[item.flag].status === 1}
              ]">

            <div class="node-item" :style="{backgroundImage: `url(${item.icon})`}">
              <p class="node-desc">投喂{{ item.time }}次</p>

              <button v-if="week[item.flag] && week[item.flag].status === 2"
                      @click="toTakePrize('week', item.flag)"
                      class="receive-btn"><span>领取</span></button>
              <button v-else-if="week[item.flag] && week[item.flag].status === 1"
                      class="receive-btn"><span>已领取</span></button>
              <button v-else
                      @click="toTakePrize('week', item.flag)"
                      class="receive-btn"><span>未达成</span></button>
            </div>

          </li>
        </ul>
      </div>
    </div>

    <ul class="new-year2023-rules">
      <li>每日未发起提款前的存款都视为首充。会员每日首充金额达到指定额度，即可获得1次投喂机会；一共有25只小兔子，每次点击投喂按钮只能选一个兔子洞投放胡萝卜，每投喂一只兔子都能获得3.88-8.88元随机现金奖励。</li>
      <li>用户需要依次按照档次层级完成，500元、1,000元、1500元、3,000元、5,000元每个档次每日仅限获取一次，10,000元档次可以无限获取；此机会仅当天有效。</li>
      <li>当用户投喂满一横线、一竖线或一对角线，可领取连线奖励；若单日25只小兔子全部喂满时，则可额外获得超级大奖。完成领取此类奖品的累计次数，仅限当日产生的次数，隔天不算。</li>
      <li>周累计奖：会员在累计投喂达到指定次数，即可获得对应累计奖，此累计次数在每周一00:00自动重置；若期间会员提前完成累计次数全部奖励，则将立即重置次数计算，无需等待至下一个自然周。</li>
      <li>若领取的奖品为实物奖品，可在个人中心-我的背包 中自行操作折现或快递到家。首次快递到家，则需要先完成填写个人收货地址信息，工作人员将在信息提交后的一周内派发兑换物。现金奖品系统将自动派发至会员的主钱包中，需完成全站1倍有效流水。</li>
      <li>此活动奖品需要用户在优惠活动页面自行点击领取；本活动奖品领取后的有效期为：自中奖之日起，实物奖品有效时间为15天，逾期则无法使用。</li>
      <li>此活动领取当天不与娱乐专场的“专属红包”活动共享，电竞赔率＜1.5、亚洲盘赔率≤0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水；PT电子游戏中以下游戏不算有效流水：<activeptliushui color="#994925" styleClass="new-year2023-liushui" />。</li>
      <li>每位有效玩家、每个手机号码、电子邮箱、IP地址、每张银行卡、每台设备只能享受一次优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利；VKGAME对本活动保有最终解释权。</li>
    </ul>

    <!-- 奖励详情dialog-->
    <view-award-new-year2023 :visible.sync="awardDialogVisible" :list="initInfo.prize_goods" />
  </div>
</template>

<script>
import { formatNumberSplit } from "@/utils/util"
import { mapState } from "vuex"
import viewAwardNewYear2023 from "./dialog/viewAwardNewYear2023"

export default {
  name: "rabbitFarmNewYear2023",
  components: { viewAwardNewYear2023 },
  data() {
    return {
      loading: false,
      initInfo: {
        bonus_status: {
          feed: []
        },
        prize_goods: [],
        my_deposit: 0,
        can_feed_num: 0,
        day_feed_num: 0,
        reset_num: 0,
        week_reset_num: 0,
        week_feed_num: 0
      },
      // 投喂兔子的loading
      feeding: false,
      // 左侧奖品坐标
      prizeList: [
        { flag: "A", icon: require("../.././../../assets/active/newYear2023/prize_a.png") },
        { flag: "B", icon: require("../.././../../assets/active/newYear2023/prize_b.png") },
        { flag: "C", icon: require("../.././../../assets/active/newYear2023/prize_c.png") },
        { flag: "D", icon: require("../.././../../assets/active/newYear2023/prize_d.png") },
        { flag: "E", icon: require("../.././../../assets/active/newYear2023/prize_e.png") },
        { flag: "F", icon: require("../.././../../assets/active/newYear2023/prize_f.png") },
        { flag: "G", icon: require("../.././../../assets/active/newYear2023/prize_g.png") },
        { flag: "H", icon: require("../.././../../assets/active/newYear2023/prize_h.png") },
        { flag: "I", icon: require("../.././../../assets/active/newYear2023/prize_i.png") },
        { flag: "J", icon: require("../.././../../assets/active/newYear2023/prize_e.png") },
        { flag: "K", icon: require("../.././../../assets/active/newYear2023/prize_k.png") },
        { flag: "L", icon: require("../.././../../assets/active/newYear2023/prize_l.png") },
        { flag: "M" }
      ],
      // 当日充值进度条
      depositProgressNode: [500, 1000, 1500, 3000, 5000, 10000, 10000],
      // 周累计进度条
      weekProgressNode: [
        { flag: "N", time: 18, icon: require("../../../../assets/active/newYear2023/week_progress_n.png") },
        { flag: "O", time: 38, icon: require("../../../../assets/active/newYear2023/week_progress_o.png") },
        { flag: "P", time: 68, icon: require("../../../../assets/active/newYear2023/week_progress_p.png") },
        { flag: "Q", time: 88, icon: require("../../../../assets/active/newYear2023/week_progress_q.png") },
        { flag: "R", time: 100, icon: require("../../../../assets/active/newYear2023/week_progress_r.png") }
      ],
      // 奖品类型
      goodsTypeList: [
        { id: 1, type: [3, 7] },
        { id: 2, type: 2 },
        { id: 3, type: 8 }
      ],
      awardDialogVisible: false,
      receiveAwardTitleList: ["恭喜您获得随机奖励", "领取成功"],
      rabbitHover: 0,
      rabbitNotHover: 0
    }
  },
  watch: {
    isLogin() {
      this.initActiveData()
    }
  },
  computed: {
    ...mapState(["isLogin"]),

    week() {
      return this.initInfo.bonus_status.week || {}
    },

    optionSingleHeightTime () {
      return {
        direction: 2,
        limitMoveNum: 5
      }
    },

    /**
     * 当日充值进度条进度
     * @return {number}
     */
    todayRechargeProgress() {
      const totalLength = 804
      if (this.initInfo.can_feed_num > this.depositProgressNode.length) {
        return totalLength
      }
      return totalLength / (this.depositProgressNode.length - 1) * this.initInfo.can_feed_num
    },

    /**
     * 返回充值后得周累进度条节点数据
     * @return {array}
     */
    resetTimeWeekProgressNode() {
      return this.weekProgressNode.map(item => { return { ...item, time: this.initInfo.week_reset_num * 100 + item.time } })
    },

    /**
     * 周累进度条进度
     * @return {number}
     */
    weekProgress() {
      const totalLength = 860
      let initStep = 0
      this.resetTimeWeekProgressNode.forEach((item, index) => {
        if (this.week[item.flag]) {
          initStep = index
        }
      })
      return totalLength / (this.resetTimeWeekProgressNode.length - 1) * initStep
    },

    /**
     * 可投喂次数
     */
    feedRabbitTime() {
      return this.initInfo.can_feed_num - this.initInfo.reset_num * 25 - this.initInfo.day_feed_num
    }

  },
  mounted () {
    this.initActiveData()
  },
  methods: {
    /**
     * 兔兔农村数据初始化
     * @return {Promise<void>}
     */
    async initActiveData() {
      this.loading = true
      try {
        const res = await this.$http(this.ApiSetting.active.newYear2023.rabbitFarmInit)
        console.info("初始化2023新年活动兔兔农场信息：", res)
        if (res.status === 1 && res.data) {
          // 全局公共数据
          this.$emit("publicInfo", {
            activeTime: res.data.active_show_time,
            marqueeList: res.data.billboard_tips,
            isLogin: res.data.is_login
          })

          this.initInfo = res.data

        }
        this.loading = false
      } catch (error) {
        console.info(error)
        this.loading = false
      }
    },

    /**
     * 查找奖品类型
     * @param type
     * @return {{}}
     */
    findGoodsTypeInfo(type) {
      let num = 0
      for (const item of this.goodsTypeList) {
        if (typeof item.type === "number") {
          if (type === item.type) {
            num = item.id
            break
          }
        } else {
          if (type >= item.type[0] && type <= item.type[1]) {
            num = item.id
            break
          }
        }
      }
      return num
    },

    /**
     * 点击兔子洞
     * @param rabbitX
     */
    rabbitPoint(rabbitX) {
      if (!this.publicVerify()) {
        return
      }
      const feedList = this.initInfo.bonus_status.feed
      if (feedList && feedList.includes(rabbitX)) {
        this.$message({ message: "您已经投喂过啦！", type: "warning" })
        return
      }
      if (this.feedRabbitTime <= 0) {
        this.$message({ message: "您的投喂次数不足，请先充值获得次数", type: "warning" })
        return
      }
      this.submitFeeding(rabbitX, 0)
    },

    /**
     * 点击投喂按钮
     */
    toFeedRabbit() {
      if (!this.publicVerify()) {
        return
      }
      const feedList = this.initInfo.bonus_status.feed
      if (feedList && feedList.length === 25) {
        this.$message({ message: "请您先领取投喂奖励！", type: "warning" })
        return
      }
      if (this.feedRabbitTime <= 0) {
        this.$message({ message: "您的投喂次数不足，请先充值获得次数", type: "warning" })
        return
      }
      this.$emit("toRabbitPanel", {index: 1, top: 1600})
    },

    /**
     * 点击投喂按钮后，有投喂次数的情况下，提交投喂请求
     * 领取兔子周边左侧、底侧的奖励 和 周累投喂奖励
     * @param rabbitX
     * @param dialogType
     * @return {Promise<void>}
     */
    async submitFeeding(rabbitX, dialogType) {
      if (this.feeding) return
      this.feeding = true
      const params = { position: rabbitX }
      console.info("2023新年活动领取奖励入参：", params)
      try {
        const res = await this.$http(this.ApiSetting.active.newYear2023.getRabbitBonus, params)
        console.info("2023新年活动领取奖励响应：", res)
        if (res.status === 1 && res.data) {

          this.$emit("receiveAwardFn", {
            asyncUpdate: true,
            dialogTitle: this.receiveAwardTitleList[dialogType],
            type: res.data.goods_type,
            title: res.data.goods_name,
            icon: res.data.goods_pic,
            waterMultiple: 1
          })
        }
        this.feeding = false
      } catch (e) {
        console.info(e)
        this.feeding = false
      }
    },

    /**
     * 公共验证
     * @return status
     */
    publicVerify() {
      let status = true
      if (this.loading) {
        this.$message({ message: "数据加载中，请稍等...", type: "warning" })
        status = false
        return status
      }
      if (!this.initInfo.is_login) {
        this.$message({message: "请您先登录", type: "warning"})
        status = false
        return status
      }
      return status
    },

    /**
     * 领取兔子周边左侧、底侧的奖励 和 周累投喂奖励
     * @param filed
     * @param giftX
     */
    toTakePrize(filed, giftX) {
      if (!this.publicVerify()) return
      // 2 可领  1 已领
      const currentFiled = this.initInfo.bonus_status[filed]
      if (currentFiled && currentFiled[giftX] && currentFiled[giftX].status === 1) {
        return
      }
      if (!currentFiled || !currentFiled[giftX] || currentFiled[giftX].status !== 2) {
        this.$message({ message: "您的投喂次数不足，请继续投喂达标后再来领取", type: "warning" })
        return
      }
      this.submitFeeding(giftX, 1)
    },

    /**
     * 查看记录
     */
    openRecdDialog() {
      if (!this.publicVerify()) return
      this.$emit("viewRecord", { type: 1 })
    }

  },
  filters: {
    formatNumberByFloat(value) {
      return formatNumberSplit(value)
    }
  }
}
</script>

<style lang="less" scoped>
.rabbit-farm-new-year2023 {
  .prize-preview {
    width: 1084px;
    height: 368px;
    margin: 40px auto 0;
    background: url("../../../../assets/active/newYear2023/prize_preview_bg.png") no-repeat center top;
    overflow: hidden;
    .preview-hide {
      width: 1066px;
      margin: 89px auto 0;
      overflow: hidden;
      user-select: none;
      ul {
        min-width: 1066px;
        li {
          width: 182px;
          height: 250px;
          display: inline-block;
          margin: 0 14px;
          background: url("../../../../assets/active/newYear2023/prize_item_bg.png") no-repeat center top;
          .prize-type {
            margin: 0 auto;
            width: 69px;
            height: 70px;
            font-weight: bold;
            font-size: 13px;
            display: flex;
            justify-content: center;
            align-items: center;
            &.type-1 {
              background: url("../../../../assets/active/newYear2023/prize_type_1.png");
            }
            &.type-2 {
              background: url("../../../../assets/active/newYear2023/prize_type_2.png");
            }
            &.type-3 {
              background: url("../../../../assets/active/newYear2023/prize_type_3.png");
            }
          }
          img {
            display: block;
            margin: 4px auto 0;
            max-width: 80px;
            height: 66px;

          }
          p {
            width: 70%;
            margin: 20px auto 0;
            font-size: 14px;
            text-align: center;
            color: #fffae1;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
      }
    }
  }

  .active-desc {
    width: 1084px;
    height: 176px;
    margin: 40px auto 0;
    background: url("../../../../assets/active/newYear2023/active_desc_bg.png") no-repeat;
    font-size: 16px;
    font-weight: normal;
    line-height: 27px;
    color: #994925;
    overflow: hidden;
    p {
      width: 940px;
      margin: 100px auto 0;
      line-height: 27px;
      text-shadow: 0px 1px 1px rgba(184, 54, 18, 0.35);
    }
  }

  .active-content {
    width: 1084px;
    height: 1288px;
    margin: 40px auto 0;
    background: url("../../../../assets/active/newYear2023/active_content_bg.png") no-repeat;

    .comprehensive {
      display: flex;
      margin-left: 106px;
      .prize-left {
        width: 135px;
        margin-top: 33px;
        li {
          width: 128px;
          height: 128px;
          background: url("../../../../assets/active/newYear2023/prize_bg.png") no-repeat;
          cursor: pointer;
          margin-bottom: 8px;
          i {
            display: block;
            width: inherit;
            height: inherit;
            background-repeat: no-repeat;
            background-position: center center;
          }
          &.receive {
            background: none;
            position: relative;
            &:before {
              position: absolute;
              content: "";
              width: 158px;
              height: 158px;
              left: -15px;
              top: -15px;
              background: url("../../../../assets/active/newYear2023/prize_active_bg_1.png") no-repeat center center;
            }
            &:hover {
              &:before {
                background: url("../../../../assets/active/newYear2023/prize_active_bg_2.png") no-repeat;
              }
            }
          }
          &.already {
            position: relative;
            &:after {
              position: absolute;
              content: "";
              width: 72px;
              height: 24px;
              left: 28px;
              bottom: 7px;
              background: url("../../../../assets/active/newYear2023/prize_bg_al_tag.png") no-repeat;
            }
          }
        }
      }
      .operating-area {
        width: 746px;
        dt {
          margin-top: 6px;
          display: flex;
          .max-prize-icon {
            width: 118px;
            height: 146px;
            cursor: pointer;
          }
          .progress-day {
            margin-top: 70px;
            margin-left: 12px;
            width: 250px;
            h5 {
              display: flex;
              justify-content: space-between;
              p {
                font-size: 16px;
                font-weight: normal;
                color: #994825;
                text-shadow: 0px 1px 1px rgba(184, 54, 18, 0.35);
                span {
                  color: #bf351d;
                }
              }
            }
            .progress-day-bar {
              margin-top: 15px;
              height: 8px;
              border-radius: 6px;
              border: solid 1px #9e420b;
              background-color: #9e1f0e;
              box-shadow: inset 0 0 5px 0 rgba(3, 0, 0, 0.2);
              .progress-value {
                height: 8px;
                border-radius: 4px;
                background-image: linear-gradient(to right, #ffefa5, #ffad37);
              }
            }
          }
          .take-prize {
            width: 136px;
            height: 60px;
            margin-top: 63px;
            margin-left: 20px;
            position: relative;
            background: url("../../../../assets/active/newYear2023/take_prize.png") no-repeat;
            border: 0;
            outline: 0;
            cursor: pointer;
            transition: filter 0.1s;
            &:hover {
              filter: contrast(150%);
            }
            span {
              position: absolute;
              width: 100%;
              top: 15px;
              left: 0;
              font-size: 18px;
              text-align: center;
            }
            &.already {
              cursor: auto;
              background: url("../../../../assets/active/newYear2023/take_prize_al.png") no-repeat;
              &:hover {
                filter: none;
              }
            }
          }
          .winning-record, .reward-preview {
            margin-top: 64px;
            width: 56px;
            height: 53px;
            font-size: 14px;
            line-height: 92px;
            text-align: center;
            color: #994825;
            text-shadow: 0px 1px 1px rgba(184, 54, 18, 0.35);
            cursor: pointer;
          }
          .winning-record {
            margin-left: 50px;
            background: url("../../../../assets/active/newYear2023/winning_record_icon.png") no-repeat center top;
          }
          .reward-preview {
            margin-left: 37px;
            background: url("../../../../assets/active/newYear2023/reward_preview_icon.png") no-repeat center top;
          }
        }
        dd {
          height: 679px;
          padding: 5px 0 2px;
          margin-top: 8px;
          background-color: rgba(255,163,54, 0.5);
          border-radius: 20px;
          border: solid 1px rgba(255,210,133, 0.8);
          ul {
            height: inherit;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-evenly;
            align-items: center;
            li {
              width: 138px;
              height: 128px;
              cursor: pointer;
              position: relative;
              img {
                position: absolute;
                pointer-events: none;
                &.exhausted {
                  left: -2px;
                  top: -29px;
                }
                &.move {
                  left: -2px;
                  top: -4px;
                }
                &.move-out {
                  left: -4px;
                  top: -4px;
                }
                &.normal {
                  left: -4px;
                  top: -4px;
                }
              }
              &.expect {
                &:hover {
                  cursor: url("../../../../assets/active/newYear2023/radish.png"), default;
                }
              }
              &.already {
                background: none;
                position: relative;
              }
            }
          }
        }
      }
    }
    .prize-bottom {
      margin-left: 106px;
      margin-top: 3px;
      width: 861px;
      display: flex;
      justify-content: space-between;
      li {
        width: 128px;
        height: 128px;
        background: url("../../../../assets/active/newYear2023/prize_bg.png") no-repeat;
        cursor: pointer;
        border-radius: 48px;
        i {
          display: block;
          width: inherit;
          height: inherit;
          background-repeat: no-repeat;
          background-position: center center;
        }
        &.receive {
          background: none;
          position: relative;
          &:before {
            position: absolute;
            content: "";
            width: 158px;
            height: 158px;
            left: -15px;
            top: -15px;
            background: url("../../../../assets/active/newYear2023/prize_active_bg_1.png") no-repeat center center;
          }
          &:hover {
            &:before {
              background: url("../../../../assets/active/newYear2023/prize_active_bg_2.png") no-repeat;
            }
          }
        }
        &.already {
          &.already {
            position: relative;
            &:after {
              position: absolute;
              content: "";
              width: 72px;
              height: 24px;
              left: 28px;
              bottom: 7px;
              background: url("../../../../assets/active/newYear2023/prize_bg_al_tag.png") no-repeat;
            }
          }
        }
      }
    }

    .deposit-progress {
      width: 804px;
      height: 8px;
      margin: 100px auto 0;
      box-shadow: inset 0 0 5px 0 rgba(3, 0, 0, 0.2);
      border: solid 1px #9e420b;
      background-color: #9e1f0e;
      position: relative;
      .progress-value {
        position: absolute;
        top: 0;
        left: 0;
        height: 8px;
        background-image: linear-gradient(to right, #ffefa5, #ffad37);
      }

      .node-parent {
        display: flex;
        justify-content: space-between;
        .progress-node {
          position: relative;
          top: -28px;
          width: 71px;
          height: 73px;
          background: url("../../../../assets/active/newYear2023/progress_node.png") no-repeat;

          .node-desc {
            width: 120px;
            text-shadow: 0px 1px 1px rgba(184, 54, 18, 0.35);
            margin: 80px 0 0 -26px;
            font-size: 14px;
            text-align: center;
            color: #994925;
          }

          &.recharged {
            background: none;
            position: relative;
            &::before {
              position: absolute;
              left: -6px;
              top: -5px;
              content: "";
              width: 83px;
              height: 83px;
              background: url("../../../../assets/active/newYear2023/progress_node_re.png") no-repeat;
            }
            .bubble {
              position: absolute;
              bottom: 0;
              right: 0;
              display: block;
              padding: 0 6px;
              height: 24px;
              border-radius: 12px;
              box-sizing: border-box;
              font-size: 16px;
              border: 2px solid #ffe49d;
              background-image: linear-gradient(to bottom, rgba(211,55,17, 0.7), #d33711);
              line-height: 20px;
              color: #fffae2;
            }
          }
          &:first-child {
            margin-left: -4px;
          }
          &:last-child {
            margin-right: -4px;
            background: url("../../../../assets/active/newYear2023/progress_node_last.png") no-repeat;
            &.recharged {
              &::before {
                position: absolute;
                left: -6px;
                top: -5px;
                content: "";
                width: 83px;
                height: 83px;
                background: url("../../../../assets/active/newYear2023/progress_node_last_re.png") no-repeat;
              }
            }
            em {
              display: block;
              position: absolute;
              width: 40px;
              height: 20px;
              text-align: center;
              line-height: 20px;
              right: 0;
              top: -23px;
              font-size: 14px;
              color: #9a450d;
              border-radius: 10px;
              background-color: #f8e03e;
              &::after {
                background-color: #f8e03e;
                position: absolute;
                content: "";
                width: 10px;
                height: 4px;
                right: 15px;
                top: 19px;
                clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
              }
            }
          }
        }
      }
    }

    .feed-rabbit {
      margin: 80px auto 0;
      width: 188px;
      height: 68px;
      span {
        font-weight: bold;
        top: 15px;
      }
    }

    .recharge-today-total {
      text-align: center;
      margin-top: 8px;
      color: #994925;
      font-size: 14px;
      text-shadow: 0px 1px 1px rgba(184, 54, 18, 0.35);
      b {
        color: #bf351d;
      }
      a {
        color: #994925;
      }
    }
  }

  .week-prize {
    width: 1084px;
    height: 424px;
    margin: 40px auto 0;
    background: url("../../../../assets/active/newYear2023/week_prize_bg.png") no-repeat;
    overflow: hidden;
    .week-total-time {
      margin-top: 90px;
      font-size: 16px;
      text-align: center;
      color: #994925;
      text-shadow: 0px 1px 1px rgba(184, 54, 18, 0.35);
      b {
        color: #bf351d;
      }
    }

    .week-progress {
      width: 860px;
      height: 8px;
      margin: 38px auto 0;
      box-shadow: inset 0 0 5px 0 rgba(3, 0, 0, 0.2);
      border: solid 1px #9e420b;
      background-color: #9e1f0e;
      position: relative;
      .progress-value {
        position: absolute;
        top: 0;
        left: 0;
        height: 8px;
        background-image: linear-gradient(to right, #ffefa5, #ffad37);
      }

      .node-parent {
        display: flex;
        justify-content: space-between;
        li {
          position: relative;
          top: -8px;
          width: 24px;
          height: 24px;
          background: url("../../../../assets/active/newYear2023/week_progress_node.png") no-repeat;
          &:first-child {
            margin-left: -3px;
          }
          &:last-child {
            margin-right: -2px;
          }

          .node-item {
            position: absolute;
            width: 200px;
            background-repeat: no-repeat;
            background-position: center 26px;
            left: -88px;
            top: 30px;
            text-align: center;
            .node-desc {
              font-size: 14px;
              color: #994925;
              text-shadow: 0px 1px 1px rgba(184, 54, 18, 0.35);
            }
            .receive-btn {
              display: block;
              width: 96px;
              height: 50px;
              margin: 147px auto 0;
              border: 0;
              outline: 0;
              background: url("../../../../assets/active/newYear2023/week_take_disabled.png") no-repeat;
              position: relative;
              span {
                position: absolute;
                width: inherit;
                text-align: center;
                font-size: 16px;
                left: 0;
                top: 11.5px;
                background-image: linear-gradient(to bottom, #93949d, #7a7e95);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
              }
            }
          }
          &.available, &.received {
            background: url("../../../../assets/active/newYear2023/week_progress_node_al.png") no-repeat;
          }
          &.available {
            .node-item {
              .receive-btn {
                cursor: pointer;
                background: url("../../../../assets/active/newYear2023/week_take_can.png") no-repeat;
                transition: filter 0.1s;
                span {
                  background-image: linear-gradient(to bottom, #ffffff, #ffd598);
                }
                &:hover {
                  filter: contrast(140%);
                }
              }
            }
          }
          &.received {
            .node-item {
              .receive-btn {
                background: url("../../../../assets/active/newYear2023/week_take_rec.png") no-repeat;
                span {
                  background-image: linear-gradient(to bottom, #ffffff, #ffd598);
                }
              }
            }
          }
        }
      }
    }
  }

  .new-year2023-rules {
    height: 688px;
    background: url("../../../../assets/active/newYear2023/rabbit_farm_rule.png") no-repeat;
    li {
      &:first-child {
        margin-top: 90px;
      }
    }
  }
}
</style>
