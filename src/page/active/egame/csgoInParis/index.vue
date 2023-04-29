<template>
  <div v-cloak class="csgo-paris">

    <!-- 粒子特效-->
    <div class="drift-box">
      <drift-post :relativeNum="10" class="drift drift-left" />
      <drift-post :relativeNum="10" class="drift drift-right" />
    </div>

    <dl class="date">
      <dt class="csgo-paris-txt-fff-b6bfc8">活动时间</dt>
      <dd>{{ activeData.show_time }}</dd>
    </dl>

    <h1 class="active-content">活动期间，每日首充≥100元且在【2023 CSGO 巴黎Major】中累计有效流水≥1000元的会员，即可进行签到领取彩金并获得一次开宝箱的机会！</h1>

    <!-- 签到领彩金模块-->
    <dl class="sign-bonus">
      <dt></dt>
      <dd>
        <p class="bill-tips"><i></i>今日累计有效流水：<span>{{ activeData.sign_bet_amount | formatNumberByFloat }}</span> 元</p>

        <ul class="sign-block" :class="{'loading': loading}">

          <li v-for="(value, key, index) in activeData.sign_detail"
              :key="index"
              :class="[
                {'signed-in': value === 1},
                {'is-today': activeData.today === key}
              ]">
            <h5>{{ activeData.today === key ? "今日" : key }}</h5>
            <p>+ <b>5</b> 元</p>
          </li>
        </ul>

        <p class="sign-txt">恭喜签到成功，记得去免费抽奖哦！</p>

        <button v-if="activeData.sign_status === -1 && !activeData.is_rest"
                class="csgo-paris-primary-btn disabled">
          <span>今日已签到</span>
        </button>
        <button v-else @click="submitSignIn" class="csgo-paris-primary-btn">
          <i :class="{'small_loading': signLoading}"></i>
          <span>立即签到</span>
        </button>
      </dd>
    </dl>

    <!-- 开箱有惊喜模块-->
    <div class="scrollArea" ref="scrollArea">
      <!-- 开箱中奖弹幕-->
      <vue-baberrage
          :isShow="true"
          :barrageList="bulletScreen"
          :throttleGap="5000"
          :boxHeight="600"
          :messageHeight="48"
          :lanesCount="5"
          :loop="false"
          class="csgo-paris-baberrage" />
      <dl class="treasure-chest">
        <dt></dt>
        <dd>

          <!-- 宝箱模块-->
          <vue-seamless-scroll ref="seamlessRef"
                              :data="activeData.prize_list"
                              :class-option="{
                                autoPlay: seamlessOptions.autoPlay,
                                step: seamlessOptions.step,
                                hoverStop: seamlessOptions.hoverStop,
                                direction: 2,
                                limitMoveNum: LIMIT_SCROLL
                              }"
                              class="box-block-scroll"
                              :class="{'loading': loading}">

            <ul class="box-block" :style="{width: `${activeData.prize_list.length * 228}px`}">

              <li v-for="(item, index) in activeData.prize_list"
                  :key="index"
                  :style="{
                  'background-image': `url(${treasureChestList[item.gift_type - 1]}), url(${require(`../../../../assets/active/egame/csgoInParis/${drawIndex === index ? 'box_li_bg_highlight' : 'box_li'}.png`)})`
                  }">
                <img :src="item.goods_pic" class="gift" alt="">
                <p>{{ item.goods_name }}</p>

                <span v-if="drawIndex === index" class="highlight"></span>
              </li>

            </ul>

          </vue-seamless-scroll>

          <button @click="viewBoxRecord" class="unboxing-record">【 <span>查看抽奖记录</span> 】</button>

          <button v-if="activeData.open_status === -1 && !activeData.is_rest"
                  class="csgo-paris-primary-btn disabled">
            <span>今日已开箱</span>
          </button>
          <button v-else
                  @click="submitOpenBox"
                  class="csgo-paris-primary-btn">
            <i :class="{'small_loading': drawLoading}"></i>
            <span>开启宝箱</span>
          </button>

        </dd>
      </dl>
    </div>
    <dl class="rules">
      <dt></dt>
      <dd>
        <ul>
          <li>电竞游戏场馆仅限：小艾电竞、TF电竞、IM电竞、RG电竞，有效流水将累计计算以上所有电竞场馆。</li>
          <li>会员每日未发起提款前的有效存款都将视为首充。</li>
          <li>符合条件的会员需在当日00:00-23:59进行签到，逾期则视为自动放弃。会员获得的抽奖机会仅限当天使用，不可累积。</li>
          <li>奖品领取有效期为：自中奖之日起，15日内有效，若奖品为实物奖品，请您在背包中选择快递到家，填写您的收货地址，我们将于次日安排发货，快递单号将会发送站内信通知；除此之外您也可以在背包中自行折现，实物奖品折现后无需流水即可提款。</li>
          <li>活动的现金奖品系统将自动派发至会员的主钱包中，彩金需完成全站3倍有效流水，活动流水未完成前不可再次申请本活动。用户申请优惠前提款，则不可申请本次活动。</li>
          <li>有效流水要求：电竞赔率＜1.5，走盘、注单取消、对冲、未结算、串关、实时兑现等不计算为有效流水。</li>
          <li>每位有效玩家、每一手机号码、电子邮箱、相同银行卡、每一个IP地址、每一台电脑者只能享受一次优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利，VKGAME对本活动保有最终解释权。</li>
        </ul>
      </dd>
    </dl>

    <router-link to="/active" class="csgo-paris-primary-btn back-home"><span>返回活动首页</span></router-link>

    <!-- 中奖信息Dialog-->
    <csgoInParisGift :visible.sync="drawVisible" :gif-data="drawData" />

    <!-- 中奖记录Dialog-->
    <csgoInParisRecord :visible.sync="recordVisible" :record-data="activeData.open_history" />

  </div>
</template>

<script>
import { mapState } from "vuex"
import { RulesValidator } from "../../../../utils/Validators"
import { formatNumberSplit } from "@/utils/util"
import csgoInParisGift from "./csgoInParisGift"
import csgoInParisRecord from "./csgoInParisRecord"
import Vue from "vue"
import { vueBaberrage, MESSAGE_TYPE } from "vue-baberrage"
import DriftPost from "../../../../components/drift-post"

Vue.use(vueBaberrage)

export default {
  name: "csgoInParis",

  components: {DriftPost, csgoInParisGift, csgoInParisRecord },

  data () {
    return {
      loading: false,

      // 签到loading
      signLoading: false,

      // 开箱loading
      drawLoading: false,

      // 宝箱滚动动态配置
      seamlessOptions: {
        autoPlay: true,
        step: 2,
        hoverStop: true
      },

      // 开箱中奖高亮索引
      drawIndex: -1,

      // 开箱记录弹窗
      recordVisible: false,

      // 开箱中奖信息弹窗
      drawVisible: false,

      // 开箱中奖信息弹窗的数据
      drawData: {},

      activeData: {
        // 是否为非比赛日
        is_rest: false,

        sign_bet_amount: 0,

        // 签到数据
        sign_detail: {},

        show_time: "",

        today: "",

        // 签到状态， -1: 已签到、休赛日  0: 不能签到  1: 可以签到
        sign_status: 0,
        sign_tips: "",

        // 开箱状态， -1: 已开箱、休赛日  0: 不能开箱  1: 可以开箱
        open_status: 0,
        open_tips: "",

        // 宝箱数据
        prize_list: [],

        // 开箱记录
        open_history: [],

        // 开箱中奖弹幕
        bullet_screen: []

      },

      bulletScreen: [],

      // 宝箱礼物背景类型，1: iphone  2: V币  3: 游戏物品  4: 现金  5: 实物
      treasureChestList: [
        require("../../../../assets/active/egame/csgoInParis/box_1.png"),
        require("../../../../assets/active/egame/csgoInParis/box_2.png"),
        require("../../../../assets/active/egame/csgoInParis/box_3.png"),
        require("../../../../assets/active/egame/csgoInParis/box_4.png"),
        require("../../../../assets/active/egame/csgoInParis/box_5.png")
      ],

      // 列表长度大于等于该值才会滚动
      LIMIT_SCROLL: 5

    }
  },

  computed: {
    ...mapState(["isLogin"])
  },

  watch: {
    isLogin () {
      this.initActiveData()
    }
  },

  mounted () {
    this.initActiveData()
  },

  methods: {
    /**
     * 获取活动数据
     * @returns {Promise<void>}
     */
    async initActiveData () {
      this.loading = true
      try {
        const res = await this.$http(this.ApiSetting.csgoInParis.csgoPairsMajorInit)
        console.info("csgo major活动初始化响应：", res)
        if (res.status === 1) {

          const keysList = Object.keys(res.data.sign_detail)

          if (keysList.length) {
            const newSignDetail = {}
            keysList.map((key, index) => {
              if (index < 12) {
                newSignDetail[key] = res.data.sign_detail[key]
              }
            })
            res.data.sign_detail = newSignDetail
          }

          this.activeData = res.data
          this.intersectionObserver(this.addBarrageData,res.data.bullet_screen);
          this.loading = false
        }
      } catch (e) {
        this.loading = false
        throw e
      }
    },

    /**
     * push中奖弹幕
     * @param list
     */
    addBarrageData (list) {
      let added = 0
      let bulletTimer
      clearInterval(bulletTimer)
      bulletTimer = setInterval(() => {
        this.bulletScreen = []
        if (list.length && added <= list.length) {
          const pushNum = Number.parseInt(Math.random() * 10)
          for (let i = 0; i < pushNum; i++) {
            if ((i + added) < list.length - 1) {
              this.bulletScreen.push({
                id: i + 1,
                avatar: list[i + added].head_image,
                msg: `恭喜${list[i + added].username}获得${list[i + added].goods_name}！`,
                time: Math.random() * 50 + 5,
                type: MESSAGE_TYPE.NORMAL,
                barrageStyle: "cus-style",
                extraWidth: 336
              })
            }
          }
          added += pushNum
          if (added >= list.length) {
            clearInterval(bulletTimer)
          }
        }
      }, 1000 * 10)
    },

    /**
     * 提交签到
     * @returns {Promise<void>}
     */
    async submitSignIn () {
      const rulesValidator = new RulesValidator([
        { validator: this.signLoading },
        { validator: this.loading, message: "数据加载中，请稍后..." },
        { validator: this.activeData.is_rest, message: "今日为非比赛日，请明日再来" },
        { validator: this.activeData.sign_status === -1 },
        { validator: this.activeData.sign_status === 0, message: this.activeData.sign_tips }
      ])

      if (rulesValidator.status) {
        this.signLoading = true
        try {
          const res = await this.$http(this.ApiSetting.csgoInParis.sign)
          console.info("csgo major活动签到响应：", res)
          if (res.status === 1) {
            this.$message({ type: "success", message: "签到成功，彩金已转入主钱包，3倍流水即可提款" })
            this.initActiveData()
          }
          this.signLoading = false
        } catch (e) {
          this.signLoading = false
          throw e
        }
      }
    },

    /**
     * 查看开箱记录
     */
    viewBoxRecord () {
      const rulesValidator = new RulesValidator([
        { validator: this.loading, message: "数据加载中，请稍后..." },
        { validator: this.isLogin === 0, message: "请您先登录" }
      ])

      if (rulesValidator.status) {
        this.recordVisible = true
      }
    },

    /**
     * 提交开宝箱
     */
    async submitOpenBox () {
      // TODO
      // const ind = Number.parseInt(Math.random() * 10)
      // console.log(ind)
      // console.log(this.activeData.prize_list[ind])
      // this.openBoxAnimate(this.activeData.prize_list[ind])
      // return
      const rulesValidator = new RulesValidator([
        { validator: this.drawLoading },
        { validator: this.loading, message: "数据加载中，请稍后..." },
        { validator: this.activeData.is_rest, message: "今日为非比赛日，请明日再来" },
        { validator: this.activeData.open_status === -1 },
        { validator: this.activeData.open_status === 0, message: this.activeData.open_tips }
      ])

      if (rulesValidator.status) {
        this.drawLoading = true
        try {
          const res = await this.$http(this.ApiSetting.csgoInParis.draw)
          console.info("csgo major活动开箱响应：", res)
          this.drawLoading = false

          if (res.status === 1) {
            await this.initActiveData()

            await this.$nextTick()
            this.openBoxAnimate(res.data)
          }
        } catch (e) {
          this.drawLoading = false
          throw e
        }
      }
    },

    /**
     * 开宝箱动画
     * @param giftData
     */
    openBoxAnimate (giftData) {
      this.seamlessOptions.hoverStop = false
      this.seamlessOptions.step = 100
      this.seamlessOptions.autoPlay = true

      const seamlessRef = this.$refs.seamlessRef.$el.children[0]
      // 中奖礼物的索引
      const giftIndex = this.activeData.prize_list.findIndex(item => item.id === giftData.id)
      // 盒子的宽度
      const boxLiWidth = 228
      // 滚动的个数
      let scrollNum = giftIndex - (this.LIMIT_SCROLL - 1)
      if (scrollNum < this.LIMIT_SCROLL) scrollNum = 0

      let timer
      clearInterval(timer)
      timer = setInterval(() => {

        if (this.seamlessOptions.step <= 7) {
          let translateX = Math.abs(Number.parseInt(seamlessRef.style.transform.split("translate(")[1].split("px")[0]))
          if (translateX > this.activeData.prize_list.length * boxLiWidth) {
            translateX = translateX - this.activeData.prize_list.length * boxLiWidth
          }
          if (
            translateX >= scrollNum * boxLiWidth && translateX <= 1240 + scrollNum * boxLiWidth) {
            this.seamlessOptions.autoPlay = false
            this.seamlessOptions.step = 0
            this.drawIndex = giftIndex
            setTimeout(() => {
              this.openBoxMethod(giftData)
            }, 1000)
            clearInterval(timer)
          }
        } else {
          this.seamlessOptions.step -= 1
        }
      }, 50)

    },

    /**
     * 配置弹窗信息，打开弹窗
     * @param giftData
     */
    openBoxMethod (giftData) {
      this.drawData = {
        price: giftData.goods_price,
        type: giftData.gift_type,
        typeBg: this.treasureChestList[giftData.gift_type - 1],
        iconUrl: giftData.icon_url,
        name: giftData.item_name
      }
      this.drawVisible = true
    },
    /**可视区域观察
     * callback 任务
     * data 数据
     * @param bullet_screen
    */
    intersectionObserver (callback=Function, data = null){
      const observer = new IntersectionObserver(
        function(items) {
          items.forEach(function(item) {
            const container = item.target;
            if(item.intersectionRatio>0){
              callback(data)
              observer.unobserve(container);
              console.log('观察器执行完后已销毁')
            }
          });
        }
      );
      observer.observe(this.$refs['scrollArea']);
    }
  },
  filters: {
    formatNumberByFloat (value) {
      return formatNumberSplit(value)
    }
  }
}
</script>

<style lang="less" scoped>
.csgo-paris {
  border-top: 0.1px solid transparent;
  background-repeat: no-repeat, no-repeat;
  background-position: center 80px, center 880px;
  background-image: url("../../../../assets/active/egame/csgoInParis/banner.png"),
  url("../../../../assets/active/egame/csgoInParis/bg.png");

  .drift-box {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .drift {
      position: absolute;
      pointer-events: none;
      &.drift-left {
        clip-path: polygon(0% 0%, 60% 0%, 20% 100%, 0% 100%);
      }
      &.drift-right {
        clip-path: polygon(40% 0%, 100% 0%, 100% 100%, 80% 100%);
      }
    }
  }


  .csgo-paris-baberrage {
    position: absolute!important;
    z-index: 5;
    top: 5px;
    left: 0;
    right: 0;
    height: 270px !important;
    pointer-events: none;
    /deep/ .baberrage-lane {
      .cus-style {
        .normal {
          border: 1px solid #3099bf;
          background-image: linear-gradient(to right, #38b8a2, #3099bf);
          font-size: 14px;
          color: #ffffff;
          box-sizing: border-box;
          padding: 0 12px;
          .baberrage-avatar {
            width: 24px;
            height: 24px;
            margin-top: 8px;
            img {
              width: inherit;
              height: inherit;
            }
          }
          .baberrage-msg {
            line-height: 40px;
            padding-left: 12px;
            font-weight: bold;
          }
        }
      }
    }
  }

  .date {
    margin-top: 638px;
    text-align: center;
    font-size: 24px;
    line-height: 48px;
    color: #fff;
    dt {
      line-height: 40px;
      font-size: 32px;
    }
    dd {
      margin-top: 12px;
      line-height: 54px;
      font-size: 24px;
      color: #d7dcdf;
      background: url("../../../../assets/active/egame/csgoInParis/date_bg.png") no-repeat center top;
    }
  }

  .active-content {
    width: 1240px;
    margin: 145px auto 0;
    background: url("../../../../assets/active/egame/csgoInParis/active_content_bg.png") no-repeat center top;
    font-size: 14px;
    font-weight: normal;
    line-height: 80px;
    color: #fff;
    text-indent: 164px;
  }

  .sign-bonus {
    width: 1268px;
    margin: 120px auto 0;
    dt {
      height: 100px;
      background: url("../../../../assets/active/egame/csgoInParis/sign_bonus_title_bg.png") no-repeat center top;
    }
    dd {
      position: relative;
      margin-top: 10px;
      background: url("../../../../assets/active/egame/csgoInParis/sign_bonus_main_bg.png") no-repeat center top;

      .bill-tips {
        position: absolute;
        line-height: 36px;
        font-size: 14px;
        top: -56px;
        right: 24px;
        color: rgba(255, 255, 255, 0.6);
        i {
          display: inline-block;
          width: 20px;
          height: 20px;
          margin-right: 8px;
          vertical-align: sub;
          background: url("../../../../assets/active/egame/csgoInParis/bill_tips_icon.png");
        }
        span {
          color: #ffffff
        }
      }

      .sign-block {
        height: 372px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-content: center;
        li {
          width: 200px;
          height: 168px;
          margin: 4px;
          text-align: center;
          background: url("../../../../assets/active/egame/csgoInParis/sign_li.png");
          h5 {
            margin-top: 16px;
            line-height: 20px;
            color: #fff;
            font-size: 14px;
            font-weight: normal;
          }
          p {
            margin-top: 92px;
            line-height: 20px;
            color: rgba(255, 255, 255, 0.8);
            font-size: 15px;
            b {
              font-size: 18px;
            }
          }

          &.signed-in {
            background-repeat: no-repeat;
            background-position:  right top, center top;
            background-image: url("../../../../assets/active/egame/csgoInParis/sign_li_tag.png"),
            url("../../../../assets/active/egame/csgoInParis/sign_li_signed.png");
          }

          &.is-today {
            background: url("../../../../assets/active/egame/csgoInParis/sign_li_today.png");

            &.signed-in {
              background-repeat: no-repeat;
              background-position:  right top, center top;
              background-image: url("../../../../assets/active/egame/csgoInParis/sign_li_tag.png"),
              url("../../../../assets/active/egame/csgoInParis/sign_li_today.png");
            }
          }
        }

        &.loading {
          background: url("../../../../assets/btn-loader.gif") no-repeat center;
          background-size: 64px;
        }
      }

      .sign-txt {
        margin-top: 18px;
        font-size: 14px;
        line-height: 20px;
        text-align: center;
        color: rgba(255, 255, 255, 0.8);
      }

      .csgo-paris-primary-btn {
        margin: 32px auto 0;
      }
    }
  }
  .scrollArea{
    padding-top: 150px;
    position: relative;
    .treasure-chest {
      width: 1240px;
      margin: 0 auto;
      overflow: hidden;
      dt {
        height: 100px;
        background: url("../../../../assets/active/egame/csgoInParis/treasure_chest_title_bg.png") no-repeat center top;
      }
      dd {
        margin-top: 17px;
        background: url("../../../../assets/active/egame/csgoInParis/treasure_chest_main_bg.png") no-repeat center top;
        /deep/ .box-block-scroll {
          height: 220px;
          padding: 20px 0;

          &>div {
            overflow: visible!important;
            &>div {
              overflow: visible!important;

              .box-block {
                display: flex;
                justify-content: center;

                li {
                  position: relative;
                  width: 220px;
                  height: 220px;
                  margin: 0 4px;
                  background-repeat: no-repeat;
                  background-position: center 72px, center top;

                  .gift {
                    display: block;
                    margin: 28px auto 0;
                    height: 106px;
                  }

                  p {
                    margin-top: 45px;
                    font-size: 14px;
                    line-height: 20px;
                    text-align: center;
                    color: rgba(255, 255, 255, 0.8);
                  }

                  .highlight {
                    position: absolute;
                    top: -16px;
                    left: -16px;
                    width: 252px;
                    height: 252px;
                    background: url("../../../../assets/active/egame/csgoInParis/box_li_highlight.png") no-repeat center top;
                  }
                }

              }

            }
          }

          &.loading {
            background: url("../../../../assets/btn-loader.gif") no-repeat center;
            background-size: 64px;
          }
        }

        .unboxing-record {
          display: block;
          background: transparent;
          margin: 25px auto 0;
          outline: 0;
          border: 0;
          cursor: pointer;
          font-size: 14px;
          line-height: 20px;
          text-align: center;
          color: rgba(255, 255, 255, 0.8);
          span {
            text-decoration: underline;
          }
        }

        .csgo-paris-primary-btn {
          margin: 32px auto 0;
        }
      }
    }
  }


  .rules {
    width: 1240px;
    margin: 178px auto 0;
    dt {
      height: 72px;
      background: url("../../../../assets/active/egame/csgoInParis/rule_title_bg.png") no-repeat center top;
    }
    dd {
      margin-top: 24px;
      background: url("../../../../assets/active/egame/csgoInParis/rule_main_bg.png") no-repeat center top;
      overflow: hidden;
      ul {
        margin: 35px 119px 45px 130px;
        color: rgba(255, 255, 255, 0.8);
        font-size: 14px;
        li {
          margin-top: 10px;
          line-height: 28px;
          list-style: decimal;
        }
      }
    }
  }

  .back-home {
    margin: 32px auto;
    text-align: center;
    line-height: 68px;
  }
}
</style>

<style lang="less">
// 渐变文字
.csgo-paris-txt-fff-b6bfc8 {
  background-image: linear-gradient(to bottom, #fff, #b6bfc8);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

// 按钮
.csgo-paris-primary-btn {
  display: block;
  width: 280px;
  height: 68px;
  outline: 0;
  border: 0;
  cursor: pointer;
  font-weight: bold;
  background: url("../../../../assets/active/egame/csgoInParis/primary_btn.png");
  transition: background 0.3s;
  span {
    font-size: 20px;
    .csgo-paris-txt-fff-b6bfc8;
  }
  .small_loading {
    width: 22px;
    height: 22px;
    vertical-align: bottom;
    margin-right: 8px;
  }
  &:hover {
    background: url("../../../../assets/active/egame/csgoInParis/primary_btn_hover.png");
  }
  &.disabled {
    pointer-events: none;
    background: url("../../../../assets/active/egame/csgoInParis/primary_btn_disabled.png");
    span {
      background-image: linear-gradient(to bottom, #fff, #b8bfc1);
    }
  }
}
</style>
