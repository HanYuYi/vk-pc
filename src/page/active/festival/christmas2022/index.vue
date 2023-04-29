<template>
  <div v-cloak class="christmas2022">

    <!-- 中奖弹幕-->
    <vue-baberrage
        :isShow="true"
        :barrageList="bulletScreen"
        :throttleGap="5000"
        :boxHeight="600"
        :messageHeight="38"
        :lanesCount="10"
        :loop="false"
        class="christmas2022-baberrage" />

    <!-- 下雪特效-->
    <drift-post
        :baseBubbles="snowflakeList"
        direction="to-bottom"
        :relativeNum="7"
        :speed="1.5"
        class="snow" />

    <h4 class="date">
      活动时间{{ initInfo.show_time ? ' ：' + initInfo.show_time : '加载中' }}
    </h4>

    <div class="content-desc">
      <p>活动期间，会员每日首充金额达到指定额度，即可获得1次许<br>愿抽奖机会，最高可获得88888元！</p>

      <!-- 许愿记录-->
      <div class="wish-record">
        <button @click="openWishRecord"
                class="record-btn"></button>
      </div>

      <!-- 音乐按钮-->
      <button class="music-btn"
              @click="musicController"
              :class="{paused: !musicPlaying}">
      </button>
    </div>


    <!-- 圣诞树-->
    <div class="christmas-tree"></div>


    <!-- 许愿进度条-->
    <ul class="wish-progress">
      <div class="progress-bar" :style="{width: `${progressWidth}px`}"></div>

      <li v-for="(wishProgress, index) in wishProgressList"
          :key="index"
          class="progress-point"
          :class="{already: progressNodeStatus(index)}">

        <p class="progress-amount">￥<span>{{ wishProgress | formatNumberByInteger }}</span></p>

        <button @click="toMakeWish(index)" class="progress-btn" :class="{disabled: wishLoading}"></button>

      </li>
    </ul>

    <!-- 许愿次数-->
    <p class="wish-times">许愿次数:{{ initInfo.wish_times }}次</p>

    <!-- 立即充值-->
    <router-link to="/user/finance" class="to-recharge"></router-link>

    <!-- 今日累计首充-->
    <p class="recharge-amount">今日累计首充:￥{{ initInfo.deposit | formatNumberByFloat }}</p>


    <!-- 规则-->
    <ul class="rules">
      <li><i>1</i><p>每日未发起提款前的存款都视为首充，会员每日首充达到指定金额，即可获得一次许愿抽奖机会。</p></li>
      <li><i>2</i><p>首存累计达到500元、5,000元、10,000元、30,000元档次，每日仅限获得一次；50,000元档次可以无上限获得。此许愿抽奖机会仅当天有效，隔日则无效。</p></li>
      <li><i>3</i><p>会员获得的现金奖品系统将自动派发至会员的主钱包中，需要完成全站1倍有效流水。</p></li>
      <li><i>4</i><p>若奖品为实物奖品，请在背包中查看奖品选择快递到家，首次操作则需要自行填写详细收货地址，完成提交即可，我们将于一周内安排发货，快递单号将会发送站内信通知。除此之外您也可以在背包中选择折现，实物奖品折现后无需流水即可提款。实物奖品有效时间为15天，逾期则无法使用。</p></li>
      <li><i>5</i><p>电竞赔率＜1.5、亚洲盘赔率≤0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水；PT电子游戏中以下游戏不算有效流水：<activeptliushui color="#a52b2e" styleClass="christmas2022-rule-liushui" />。</p></li>
      <li><i>6</i><p>每位有效玩家、每个手机号码、电子邮箱、IP地址、每张银行卡、每台设备只能享受一次优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利；VKGAME对本活动保有最终解释权。</p></li>
    </ul>

    <!-- 回到活动首页-->
    <div class="christmas2022-back-home">
      <router-link to="/active" />
    </div>

    <!-- 礼物dialog-->
    <christmas2022-gift :visible.sync="wishSuccessInfo.visible" :gift-info="wishSuccessInfo.row" />

    <!-- 记录dialog-->
    <christmas2022-record :visible.sync="wishRecordVisible" />
  </div>
</template>

<script>
import { formatNumberSplit } from "@/utils/util"
import { mapState } from 'vuex'
import Christmas2022Gift from './christmas2022Gift'
import Christmas2022Record from './christmas2022Record'
import DriftPost from '../../../../components/drift-post'
import Vue from 'vue'
import { vueBaberrage, MESSAGE_TYPE } from 'vue-baberrage'
Vue.use(vueBaberrage)

export default {
  name: 'christmas2022',
  components: { Christmas2022Gift, Christmas2022Record, DriftPost },
  data() {
    return {

      initInfo: {
        already_wish_times: 0,
        wish_times: 0,
        deposit: 0
      },
      bulletScreen: [],
      loading: false,

      audio: null,
      musicPlaying: false,
      wishProgressList: [500, 5000, 10000, 30000, 50000],
      wishLoading: false,

      wishSuccessInfo: {
        visible: false,
        row: {}
      },

      wishRecordVisible: false,

      snowflakeList: [
        require("../../../../assets/active/christmas2022/snow_1.png"),
        require("../../../../assets/active/christmas2022/snow_1.png"),
        require("../../../../assets/active/christmas2022/snow_1.png"),
        require("../../../../assets/active/christmas2022/snow_1.png"),
        require("../../../../assets/active/christmas2022/snow_2.png"),
        require("../../../../assets/active/christmas2022/snow_2.png"),
        require("../../../../assets/active/christmas2022/snow_3.png"),
        require("../../../../assets/active/christmas2022/snow_4.png"),
        require("../../../../assets/active/christmas2022/snow_5.png"),
        require("../../../../assets/active/christmas2022/snow_6.png"),
        require("../../../../assets/active/christmas2022/snow_6.png"),
        require("../../../../assets/active/christmas2022/snow_6.png"),
        require("../../../../assets/active/christmas2022/snow_7.png")
      ],
    }
  },
  watch: {
    isLogin() {
      this.initActiveData()
    }
  },
  computed: {
    ...mapState(["isLogin"]),

    /**
     * 计算进度条的值
     * @return {number}
     */
    progressWidth() {
      const nodeList = [93, 93 + 188, 93 + 188 * 2, 93 + 188 * 3, 93 + 188 * 4]
      const nodeMiddleList = [93 + 94, 93 + 94 * 3, 93 + 94 * 5, 93 + 94 * 7, 943]
      const wishProgressListByFloat = this.wishProgressList.map(num => Number.parseFloat(num))
      let backValue = nodeList[this.initInfo.already_wish_times - 1]
      if ((this.initInfo.deposit > 0) ||
          (this.initInfo.already_wish_times > 0 &&
              this.initInfo.deposit > wishProgressListByFloat[this.initInfo.already_wish_times - 1])
      ) {
        for (let i = 0; i < wishProgressListByFloat.length;i++) {
          if (this.initInfo.deposit === wishProgressListByFloat[i]) {
            backValue = nodeList[i]
            break
          }
          if (i > 0) {
            if (this.initInfo.deposit > wishProgressListByFloat[wishProgressListByFloat.length - 1]) {
              backValue = nodeMiddleList[nodeMiddleList.length - 1]
              break
            }
            if (this.initInfo.deposit > wishProgressListByFloat[i - 1] && this.initInfo.deposit < wishProgressListByFloat[i]) {
              backValue = nodeMiddleList[i - 1]
            }
          }
          if (this.initInfo.deposit < wishProgressListByFloat[0]) {
            backValue = 33.5
            break
          }
        }
      }
      return backValue
    }
  },
  mounted () {
    this.playMusic()
    document.getElementsByClassName("footer")[0].classList.add("christmas2022-footer")
    this.initActiveData()
  },
  methods: {
    /**
     * 初始化2022双旦活动信息
     * @return {Promise<void>}
     */
    async initActiveData() {
      this.loading = true
      try {
        const res = await this.$http(this.ApiSetting.active.christmas2022.christmasInit)
        console.group(`${'-'.repeat(20)}2022双旦活动${'-'.repeat(20)}`)
        console.info("初始化2022双旦活动信息：", res)
        if (res.status === 1 && res.data) {
          if (res.data.bullet_screen && res.data.bullet_screen.length) {
            this.addBarrageData(res.data.bullet_screen)
          }
          // TODO
          // res.data.already_wish_times = 0
          // res.data.deposit = 1.00
          this.initInfo = res.data
        }
        this.loading = false
      } catch (error) {
        console.info(error)
        this.loading = false
      }
    },

    /**
     * 提交许愿
     * @return {Promise<void>}
     */
    async toMakeWish(nodeIndex) {
      if (this.loading || this.wishLoading) {
        return
      }
      if (this.progressNodeStatus(nodeIndex)) {
        return
      }
      if (!this.isLogin) {
        this.$message({ message: "请您先登录", type: "warning" })
        return
      }
      if (!this.initInfo.status) {
        this.$message({ message: this.initInfo.tips, type: "warning" })
        return
      }
      this.wishLoading = true
      const params = {
        level: nodeIndex + 1
      }
      console.info("2022双旦许愿入参：", params)
      try {
        const res = await this.$http(this.ApiSetting.active.christmas2022.christmasJoin, params)
        console.info("2022双旦许愿响应：", res)
        if (res.status === 1 && res.data) {
          this.wishSuccessInfo = {
            row: {
              isCash: res.data.goods_type,
              name: res.data.goods_name,
              imgLink: res.data.goods_pic
            },
            visible: true
          }

          this.initActiveData()
        }
        this.wishLoading = false
      } catch (error) {
        console.info(error)
        this.wishLoading = false
      }
    },

    /**
     * 进度条节点的状态
     * @param nodeIndex
     * @return {boolean}
     */
    progressNodeStatus(nodeIndex) {
      let backStatus = false
      if (this.initInfo.already_wish_times <= 0) {
        return backStatus
      }
      if (this.initInfo.already_wish_times - 1 >= nodeIndex && nodeIndex < this.wishProgressList.length - 1) {
        backStatus = true
      }
      return backStatus
    },

    /**
     * 开启许愿记录
     */
    openWishRecord() {
      if (!this.isLogin) {
        this.$message({ message: "请您先登录", type: "warning" })
        return
      }
      this.wishRecordVisible = true
    },

    /**
     * push中奖弹幕
     * @param list
     */
    addBarrageData(list) {
      let added = 0, timer
      clearInterval(timer)
      timer = setInterval(() => {
        this.bulletScreen = []
        if (list.length && added <= list.length) {
          const pushNum = Number.parseInt(Math.random() * 10)
          for (let i = 0; i < pushNum; i++) {
            if ((i + added) < list.length - 1) {
              this.bulletScreen.push({
                id: i + 1,
                avatar: list[i + added].head_image,
                msg: `恭喜${list[i + added].username}获得${list[i + added].goods_name}`,
                time: Math.random() * 50 + 5,
                type: MESSAGE_TYPE.NORMAL,
                barrageStyle: 'cus-style',
                extraWidth: 336
              })
            }
          }
          added += pushNum
          if (added >= list.length) {
            clearInterval(timer)
          }
        }
      }, 1000 * 10)
    },

    /**
     * 背景音乐初始化
     */
    async playMusic() {
      this.audio = new Audio()
      this.audio.loop = true
      this.audio.src = "/static/video/christmas2022_background_music.mp3"
      try {
        await this.audio.play()
        this.musicPlaying = true
      } catch (e) {
        this.musicPlaying = false
        console.info(e)
      }
    },

    /**
     * 背景音乐控制器
     */
    musicController() {
      this.musicPlaying = !this.musicPlaying
      this.musicPlaying ? this.audio.play() : this.audio.pause()
    }
  },
  filters: {
    formatNumberByInteger(value) {
      const amount = formatNumberSplit(value)
      return amount.substring(0, amount.length - 3)
    },
    formatNumberByFloat(value) {
      return formatNumberSplit(value)
    }
  },
  beforeDestroy () {
    this.audio.pause()
    document.getElementsByClassName("footer")[0].classList.remove("christmas2022-footer")
  }
}
</script>

<style lang="less" scoped>
.christmas2022 {
  border-top: 0.1px solid transparent;
  background-image:
      url("../../../../assets/active/christmas2022/banner.jpg"),
      url("../../../../assets/active/christmas2022/bg.jpg");
  background-repeat: no-repeat, no-repeat;
  background-position: center top, center 825px;

  .christmas2022-baberrage {
    position: fixed!important;
    z-index: 5;
    top: 50px;
    left: 0;
    height: 600px !important;
    margin-top: 80px;
    pointer-events: none;
    /deep/ .baberrage-lane {
      .cus-style {
        .normal {
          background-color: rgba(0, 0, 0, 0.6);
          border: solid 1px #a52b2e;
          font-size: 14px;
          color: #fff;
          padding: 0 20px;
          box-sizing: border-box;
          .baberrage-avatar {
            width: 22px;
            height: 22px;
            margin-top: 5px;
            img {
              width: inherit;
              height: inherit;
            }
          }
          .baberrage-msg {
            line-height: 32px;
            padding-left: 5px;
            font-weight: bold;
          }
        }
      }
    }
  }

  .snow {
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 3;
  }

  .date {
    margin: 514px auto 0;
    width: 652px;
    height: 58px;
    font-size: 18px;
    font-weight: normal;
    line-height: 58px;
    text-align: center;
    color: #ffe1b1;
  }

  .content-desc {
    position: relative;
    z-index: 2;
    margin: 320px auto 0;
    width: 1036px;
    height: 331px;
    background: transparent url("../../../../assets/active/christmas2022/content_desc.png") no-repeat;
    border-top: 0.1px solid transparent;
    p {
      font-size: 16px;
      line-height: 28px;
      margin-top: 176px;
      text-align: center;
      color: #a52b2e;
    }

    .wish-record {
      position: absolute;
      bottom: -154px;
      right: 117px;
      width: 85px;
      transform-origin: top center;
      animation: record-swing-animate 2.6s infinite linear;
      animation-play-state: paused;
      &::before {
        position: absolute;
        content: "";
        top: 3px;
        left: 42px;
        width: 1px;
        height: 103px;
        background-color: #c38c5d;
      }
      .record-btn {
        margin-top: 90px;
        outline: 0;
        border: 0;
        width: inherit;
        height: 108px;
        background: transparent url("../../../../assets/active/christmas2022/wish_record.png") no-repeat;
        cursor: pointer;
      }
      &:hover {
        animation-play-state: running;
      }
      @keyframes record-swing-animate {
        0% {
          transform: rotate(0deg);
        }
        25% {
          transform: rotate(-4deg);
        }
        50% {
          transform: rotate(0deg);
        }
        75% {
          transform: rotate(4deg);
        }
        100% {
          transform: rotate(0deg);
        }
      }
    }

    .music-btn {
      position: absolute;
      outline: 0;
      border: 0;
      right: -126px;
      bottom: 40px;
      width: 126px;
      height: 126px;
      cursor: pointer;
      background: transparent url("../../../../assets/active/christmas2022/music_btn.png");
      animation: music-btn-animate 1s linear infinite;
      &::before, &::after {
        position: absolute;
        content: "";
        width: inherit;
        height: inherit;
        left: 0;
        top: -2px;
        border: 1px solid red;
        border-radius: 50%;
        box-sizing: border-box;
        opacity: 0;
        animation: music-shadow-animate 1.8s linear 1s infinite;
        box-shadow: 1px 1px 30px red;
      }
      &::after {
        animation: music-shadow-animate 1.8s linear 2s infinite;
      }
      &.paused {
        animation-play-state: paused;
        background: transparent url("../../../../assets/active/christmas2022/music_btn_mute.png");
        &::before, &::after {
          display: none;
        }
      }
      @keyframes music-btn-animate {
        0% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.1);
        }
        100% {
          transform: scale(1);
        }
      }
      @keyframes music-shadow-animate {
        0% {
          transform: scale(0.46);
          opacity: 1;
        }
        100% {
          transform: scale(1.3);
          opacity: 0;
        }
      }
    }
  }

  .christmas-tree {
    margin: -44px auto 0;
    width: 100%;
    height: 1098px;
    background: transparent url("../../../../assets/active/christmas2022/christmas_tree.jpg") no-repeat center top;
    position: relative;
    z-index: 1;
    &::before, &::after {
      position: absolute;
      content: "";
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
    &::before {
      background: transparent url("../../../../assets/active/christmas2022/christmas_tree_light.jpg") no-repeat center top;
      animation: tree-light-animate 2.6s infinite;
    }
    &::after {
      background: transparent url("../../../../assets/active/christmas2022/christmas_tree_gift.png") no-repeat center top;
      z-index: 1;
    }

    @keyframes tree-light-animate {
      0% { opacity: 0; }
      50% { opacity: 1; }
      100% { opacity: 0; }
    }
  }

  .wish-progress {
    position: relative;
    margin: -25px auto 0;
    z-index: 2;
    width: 1028px;
    background: transparent url("../../../../assets/active/christmas2022/wish_progress_bg.png") no-repeat center top;
    display: flex;
    justify-content: space-evenly;
    .progress-bar {
      position: absolute;
      top: 43px;
      left: 43px;
      height: 12px;
      border-radius: 6px;
      background-image: linear-gradient(to bottom, #efcb54, #f0d961);
      transition: width 1s;
    }

    .progress-point {
      margin-top: 22px;
      width: 105px;
      background: transparent url("../../../../assets/active/christmas2022/progress_point_bg.png") no-repeat center top;
      position: relative;
      &::before {
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        width: 100%;
        height: 53px;
        background: transparent url("../../../../assets/active/christmas2022/progress_gift.png") no-repeat center 7px;
      }

      .progress-amount {
        margin-top: 58px;
        font-size: 18px;
        text-align: center;
        color: #fff;
        font-weight: bold;
        span {
          font-weight: normal;
          font-size: 20px;
          font-family: vkFont;
        }
      }

      .progress-btn {
        outline: 0;
        border: 0;
        margin-top: 13px;
        width: inherit;
        height: 57px;
        background: transparent url("../../../../assets/active/christmas2022/progress_btn.png");
        cursor: pointer;
        transition: background 0.2s,opacity 0.2s;
        &:hover {
          background: transparent url("../../../../assets/active/christmas2022/progress_btn_hover.png");
        }
        &.disabled {
          opacity: 0.7;
          cursor: auto;
        }
      }


      &:last-child {
        .progress-btn {
          background: transparent url("../../../../assets/active/christmas2022/progress_btn_infinite.png");
          &:hover {
            background: transparent url("../../../../assets/active/christmas2022/progress_btn_infinite_hover.png");
          }
        }
      }

      &.already {
        &::before {
          background: transparent url("../../../../assets/active/christmas2022/progress_gift_disabled.png") no-repeat center 7px;
        }

        .progress-amount {
          color: rgba(255, 255, 255, 0.3);
        }

        .progress-btn {
          background: transparent url("../../../../assets/active/christmas2022/progress_btn_disabled.png");
          cursor: no-drop;
          &:hover {
            background: transparent url("../../../../assets/active/christmas2022/progress_btn_disabled.png");
          }
        }
      }
    }
  }

  .wish-times {
    margin-top: 35px;
    font-size: 18px;
    text-align: center;
    color: #fff;
  }

  .to-recharge {
    display: block;
    margin: 25px auto 0;
    width: 200px;
    height: 75px;
    background: transparent url("../../../../assets/active/christmas2022/to_recharge.png");
    transition: background 0.2s;
    &:hover {
      background: transparent url("../../../../assets/active/christmas2022/to_recharge_hover.png");
    }
  }

  .recharge-amount {
    margin-top: 25px;
    font-size: 16px;
    text-align: center;
    color: #fff;
  }

  .rules {
    margin: 25px auto 0;
    width: 1036px - 130px * 2;
    height: 611px;
    background: transparent url("../../../../assets/active/christmas2022/rules.png");
    padding: 0 130px;
    overflow: hidden;
    li {
      margin-top: 12px;
      display: flex;
      &:first-child {
        margin-top: 179px;
      }
      i {
        margin-top: 2px;
        display: inline-block;
        width: 22px;
        height: 22px;
        background: transparent url("../../../../assets/active/christmas2022/rule_num_icon.png") no-repeat;
        text-align: center;
        line-height: 21px;
        color: #fff;
      }
      p {
        flex: 1;
        margin-left: 11px;
        font-size: 14px;
        line-height: 25px;
        letter-spacing: normal;
        text-align: left;
        color: #a52b2e;
      }
    }
  }

  .christmas2022-back-home {
    padding: 10px 0 40px;
    text-align: center;
    a {
      display: inline-block;
      width: 200px;
      height: 75px;
      background: transparent url("../../../../assets/active/christmas2022/back_home.png");
      transition: background 0.2s;
      &:hover {
        background: transparent url("../../../../assets/active/christmas2022/back_home_hover.png");
      }
    }
  }
}
</style>

<style lang="less">
.christmas2022-rule-liushui {
  border-color: #a52b2e;
  .ptgame_more_rule {
    tr {
      th {
        color: #a52b2e;
      }
    }
  }
  &[x-placement^=bottom] {
    .popper__arrow {
      border-bottom-color: #a52b2e;
    }
  }
  &[x-placement^="top"] {
    .popper__arrow {
      border-top-color: #a52b2e;
    }
  }
}

.christmas2022-footer {
  position: relative;
  z-index: 4;
}
</style>
