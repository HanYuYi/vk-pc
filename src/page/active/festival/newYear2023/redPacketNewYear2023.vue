<template>
  <div class="red-packet-new-year2023">

    <h4 class="active-desc">
      活动期间，会员可在【兔兔农场】每日完成一次投喂，即可获得一次参与机会，最高可获得8888现金红包！
    </h4>

    <!-- 红包雨主要内容-->
    <dl class="red-packet-content">
      <dt v-if="redPacketNodeList[0] === 0">
        <small>红包雨开启时间：1月22日00:00:00</small>
        <div class="countdown-box">
          <p><span>倒计时</span></p>
          <ul v-if="countDownDate.length">
            <li v-if="countDownDate[0] > 0" class="day"><span class="new-year2023-gradient-color-1"><template v-if="+countDownDate[0] < 10">0</template>{{ countDownDate[0] }}</span></li>
            <li><span class="new-year2023-gradient-color-1"><template v-if="+countDownDate[1] < 10 && +countDownDate[1] > 0">0</template>{{ +countDownDate[1] >= 0 ? countDownDate[1] : '00'   }}</span></li>
            <li><span class="new-year2023-gradient-color-1">{{ countDownDate[2] }}</span></li>
            <li><span class="new-year2023-gradient-color-1">{{ countDownDate[3] }}</span></li>
          </ul>
        </div>
      </dt>
      <dt v-else-if="redPacketNodeList[0] === 1 || redPacketNodeList[1] === 1 || redPacketNodeList[2] === 1">
        <small>红包雨来袭，祝您好运！</small>
        <div class="countdown-box">
          <p><span>结束时间：1月25日00:00:00</span></p>
        </div>
      </dt>
      <dt v-else>
        <small>红包雨已结束！</small>
        <div class="countdown-box">
          <p>&nbsp;</p>
        </div>
      </dt>
      <dd>
        <div class="top">
          <ul class="red-packet-box">
            <li v-for="(amount, index) in redPacketList" :key="index">
              ￥{{ amount | formatNumberByInteger }}
            </li>
          </ul>

          <!-- 红包雨中奖名单-->
          <div class="list-winners">
            <h4></h4>
            <template v-if="initInfo.win_list && initInfo.win_list.length">
              <vue-seamless-scroll :data="initInfo.win_list"
                                   :class-option="{autoPlay: initInfo.win_list.length > 6}"
                                   class="list-winners-body">
                <ul>
                  <li v-for="(item, index) in initInfo.win_list" :key="index">
                    <p class="left">
                      <i><img :src="item.head_image" alt=""></i>
                      {{ item.username }}
                    </p>
                    <p class="right">
                      {{ item.bonus }}
                    </p>
                  </li>
                </ul>
              </vue-seamless-scroll>
            </template>
            <div v-else class="new-year2023-empty"><p>暂无排名</p></div>
          </div>
        </div>

        <!-- 红包雨进度条-->
        <div class="progress-box">
          <div class="progress-value" :style="{width: `${progressWidth}px`}"></div>
          <ul class="node-parent">
            <li v-for="(item, index) in progressNode" :key="index" :class="[
                {run: redPacketNodeList[index] > 0},
                {'not-started': redPacketNodeList[index] === 0}
               ]">

              <p class="date">{{ item.date }}</p>

              <p v-if="redPacketNodeList[index] === 0" class="status">未开始</p>
              <p v-if="redPacketNodeList[index] === 1" class="status">进行中</p>
              <p v-if="redPacketNodeList[index] === 2" class="status">已结束</p>

            </li>
          </ul>
        </div>

        <button @click="setReadyShow" class="new-year2023-btn1 open-red-packet">
          <span class="new-year2023-gradient-color">进入红包雨</span>
          <i v-if="initInfo.rain_times > 0">{{ initInfo.rain_times }}</i>
        </button>

        <p class="to-rabbit">
          完成兔兔农场投喂即可参与红包雨 <span @click="$emit('tabChange', {index: 1, top: 1600})">【前往兔兔农场】</span>
        </p>

        <div @click="openRecdDialog" class="red-packet-record">中奖明细</div>
      </dd>
    </dl>

    <ul class="new-year2023-rules">
      <li>贺岁红包雨活动将于大年初一至初三开放参与。</li>
      <li>本活动可获得参与机会的开放时间为：{{ initInfo.active_show_time }}。</li>
      <li>会员可在【兔兔农场】活动，每日完成一次投喂，即可自动兑换成一次参与红包雨机会。每日上限获得1次，最多累计3次。</li>
      <li>活动开放参与时间共计：3天，每天只能使用1次参与机会；若会员未在规定时间内参与，将视为自动放弃，会员所获得的红包需完成全站1倍有效流水。</li>
      <li>有效流水要求：电竞赔率＜1.5、亚洲盘赔率≤0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水；PT电子游戏中以下游戏不算有效流水：<activeptliushui color="#994925" styleClass="new-year2023-liushui" />。</li>
      <li>每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能使用一个账号享受优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利；VKGAME对本活动保有最终解释权。</li>
    </ul>

    <!--红包雨 ready-->
    <ready-red-packet-new-year2023 :visible.sync="readyRedPacketVisible" @readyBack="startRedPacket" />

    <!--红包雨-->
    <red-packet v-if="redPacketVisible"
                custom-class="new-year2023-red-packet-house"
                :img-obj="redPacketImg"
                @clickFn="getRedPacket">

      <div class="count-down-scr-new-year2023">
        <p class="new-year2023-gradient-color-1">红包雨
          <em class="new-year2023-gradient-color">{{ redPacketCountdown }}S</em> 后结束
        </p>
      </div>

    </red-packet>

  </div>
</template>

<script>
import { formatNumberSplit, formatCountTime } from "@/utils/util"
import redPacket from "../../../../components/red-packet"
import readyRedPacketNewYear2023 from "./dialog/readyRedPacketNewYear2023"
import { mapState } from 'vuex'

export default {
  name: 'redPacketNewYear2023',
  components: { redPacket, readyRedPacketNewYear2023 },
  data() {
    return {
      countDownDate: [],
      countDownDateTimer: null,
      redPacketList: [8888, 3888, 888, 388, 188, 88, 58, 38, 18, 8],
      initInfo: {
        win_list: [],
        my_win_list: [],
        rain_times: 0
      },
      progressNode: [
        { date: "大年初一", icon: "" },
        { date: "大年初二", icon: "" },
        { date: "大年初三", icon: "" }
      ],
      loading: false,

      redPacketNodeList: [
        this.calcRedPacketNodeList(new Date("2023-01-22 00:00:00").getTime()),
        this.calcRedPacketNodeList(new Date("2023-01-23 00:00:00").getTime()),
        this.calcRedPacketNodeList(new Date("2023-01-24 00:00:00").getTime())
      ],
      // 控制是否下红包雨
      redPacketVisible: false,
      readyRedPacketVisible: false,
      redPacketImg: require("../../../../assets/active/newYear2023/new_year2023_red.png"),
      redPacketTimer: null,
      redPacketDuration: 15,
      redPacketCountdown: 15,
      redPacketCountdownTimer: null,
      clickedRedPacket: false,
      getDelayRedPacketTimer: null
    }
  },
  computed: {
    ...mapState(["isLogin"]),

    /**
     * 周累进度条进度
     * @return {number}
     */
    progressWidth() {
      const totalLength = 437
      let initStep = 0
      this.redPacketNodeList.forEach((num, index) => {
        if (num > 0 && index > 0) {
          initStep = index
        }
      })
      return totalLength / (this.progressNode.length - 1) * initStep
    }
  },
  watch: {
    isLogin() {
      this.initActiveData()
    }
  },
  activated () {
    this.redPacketNodeList = [
      this.calcRedPacketNodeList(new Date("2023-01-22 00:00:00").getTime()),
      this.calcRedPacketNodeList(new Date("2023-01-23 00:00:00").getTime()),
      this.calcRedPacketNodeList(new Date("2023-01-24 00:00:00").getTime())
    ]
    if (this.redPacketNodeList[0] !== 0) {
      clearInterval(this.countDownDateTimer)
    }
    this.initActiveData()
  },
  mounted () {
    this.initActiveData()
    this.stillRedPacketCountdown()
  },
  methods: {
    /**
     * 数据初始化
     * @return {Promise<void>}
     */
    async initActiveData() {
      if (this.loading) return
      this.loading = true
      try {
        const res = await this.$http(this.ApiSetting.active.newYear2023.redPacketInit)
        console.info("初始化2023新年活红包雨信息：", res)
        if (res.status === 1 && res.data) {
          this.initInfo = res.data
        }
        this.loading = false
      } catch (error) {
        console.info(error)
        this.loading = false
      }
    },

    /**
     * 点击开启红包雨3 2 1准备
     */
    setReadyShow() {
      if (this.loading) {
        this.$message({ message: "数据加载中，请稍等...", type: "warning" })
        return
      }
      if (this.initInfo.status !== 0) {
        this.$message({ message: this.initInfo.status_tips, type: "warning" })
        return
      }
      this.readyRedPacketVisible = true
    },

    /**
     * 点击开启红包雨,红包雨持续15秒
     */
    startRedPacket() {
      this.redPacketVisible = true
      this.setRedPacketCountdown()

      clearTimeout(this.redPacketTimer)
      // 下红包雨15秒
      this.redPacketTimer = setTimeout(() => {
        if (!this.clickedRedPacket) {
          this.redPacketVisible = false
        }
        clearTimeout(this.redPacketTimer)
      }, this.redPacketDuration * 1000)
    },

    /**
     * 某个红包被点击后执行请求
     * @return {Promise<void>}
     */
    getRedPacket() {
      this.clickedRedPacket = true

      clearTimeout(this.getDelayRedPacketTimer)
      this.getDelayRedPacketTimer = setTimeout(async () => {
        try {
          const res = await this.$http(this.ApiSetting.active.newYear2023.redPacketJoin)
          console.info("2023新年活红包雨抢红包信息：", res)
          if (res.status === 1) {
            this.initActiveData()

            this.$emit("receiveAwardFn", {
              dialogTitle: "恭喜您抢到贺岁红包",
              type: 1,
              title: res.data.item_name,
              icon: require("../.././../../assets/active/newYear2023/money_red_packet.png"),
              waterMultiple: 1
            })
          }
        } catch (error) {
          console.info(error)
        } finally {
          this.redPacketVisible = false
          this.clickedRedPacket = false
          clearTimeout(this.redPacketTimer)
          clearInterval(this.redPacketCountdownTimer)
          clearTimeout(this.getDelayRedPacketTimer)
        }
      }, 2000)

    },

    /**
     * 红包雨开始前（1月22日00:00:00）显示倒计时
     */
    stillRedPacketCountdown() {
      const endTime = new Date("2023-01-22 00:00:00").getTime()
      clearInterval(this.countDownDateTimer)
      this.countDownDateTimer = setInterval(() => {
        const remainingDate = formatCountTime((endTime - Date.now()) / 1000)
        if (remainingDate === "00:00:00") {
          clearInterval(this.countDownDateTimer)
          this.redPacketNodeList[0] = 1
        }
        const remainingDateArr = remainingDate.split(":")
        // 大于24小时显示天
        if (Number.parseInt(remainingDateArr[0]) >= 24) {
          remainingDateArr.unshift(Number.parseInt((Number.parseInt(remainingDateArr[0]) / 24)))
          remainingDateArr[1] = Number.parseInt(remainingDateArr[1]) - remainingDateArr[0] * 24
        } else {
          remainingDateArr.unshift(0)
        }
        this.countDownDate = remainingDateArr
      }, 1000)
    },

    /**
     * 计算三天红包雨时间状态
     * @param time
     * @return {number}
     * 2: 已结束   1: 进行中  0: 未开始
     */
    calcRedPacketNodeList(time) {
      const currentTimestamp = Date.now()
      if (currentTimestamp < time) {
        return 0
      }
      if (currentTimestamp >= time && currentTimestamp < time + 1000 * 60 * 60 * 24) {
        return 1
      }
      if (currentTimestamp > time + 1000 * 60 * 60 * 24) {
        return 2
      }
    },

    /**
     * 15秒红包雨倒计时
     */
    setRedPacketCountdown() {
      this.redPacketCountdown = this.redPacketDuration

      this.redPacketCountdownTimer = setInterval(() => {
        if (this.redPacketCountdown < 1) {
          clearInterval(this.redPacketCountdownTimer)
        } else {
          this.redPacketCountdown--
        }
      }, 1000)
    },

    /**
     * 查看记录
     */
    openRecdDialog() {
      if (this.loading) {
        this.$message({ message: "数据加载中，请稍等...", type: "warning" })
        return
      }
      if (!this.initInfo.is_login) {
        this.$message({ message: "请您先登录", type: "warning" })
        return
      }
      this.$emit("viewRecord", { type: 3, list: this.initInfo.my_win_list })
    }
  },
  beforeDestroy () {
    clearInterval(this.countDownDateTimer)
    clearTimeout(this.redPacketTimer)
  },
  filters: {
    formatNumberByInteger(value) {
      const amount = formatNumberSplit(value)
      return amount.substring(0, amount.length - 3)
    }
  }
}
</script>

<style lang="less" scoped>
.red-packet-new-year2023 {
  .active-desc {
    width: 1084px;
    height: 178px;
    margin: 40px auto 0;
    background: url("../../../../assets/active/newYear2023/active3_desc_bg.png") no-repeat;
    font-size: 18px;
    font-weight: normal;
    line-height: 220px;
    text-align: center;
    color: #994925;
    text-shadow: 0px 1px 1px rgba(184, 54, 18, 0.35);
  }

  .red-packet-content {
    width: 1084px;
    height: 848px;
    margin: 40px auto 0;
    background: url("../../../../assets/active/newYear2023/red_packet_content_bg.png") no-repeat;
    overflow: hidden;
    dt {
      small {
        display: block;
        margin-top: 28px;
        text-shadow: 0px 1px 1px rgba(184, 54, 18, 0.35);
        font-size: 18px;
        text-align: center;
        color: #994925;
      }
      .countdown-box {
        height: 58px;
        margin-top: 20px;
        display: flex;
        justify-content: center;
       p {
         margin-right: 12px;
         span {
           font-family: cursive;
           font-weight: bold;
           position: relative;
           width: 100%;
           top: 13px;
           background-image: linear-gradient(to bottom, red, #a24d27);
           -webkit-background-clip: text;
           background-clip: text;
           -webkit-text-fill-color: transparent;
           font-size: 24px;
         }
       }
        ul {
          li {
            display: inline-block;
            width: 64px;
            height: 58px;
            background: url("../../../../assets/active/newYear2023/countdown_bg.png") no-repeat;
            text-align: center;
            line-height: 52px;
            position: relative;
            margin-right: 12px;
            span {
              position: relative;
              width: 100%;
              top: 0px;
              font-size: 26px;
              font-weight: bold;
            }
            &::after {
              position: absolute;
              content: "";
              width: 24px;
              height: inherit;
              right: -20px;
              top: 0;
              background: url("../../../../assets/active/newYear2023/countdown_after.png") no-repeat center 10px;
            }
            &:last-child {
              margin-right: 0;
              &::after {
                display: none;
              }
            }
            &.day {
              margin-right: 26px;
              &::after {
                right: -34px;
                width: 38px;
                content: "天";
                background: none;
                font-family: cursive;
                background-image: linear-gradient(to bottom, red, #a24d27);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
                font-size: 24px;
                font-weight: bold;
              }
            }
          }
        }
      }
    }
    dd {
      position: relative;
      .top {
        width: 1017px;
        display: flex;
        justify-content: space-between;
        margin: 20px auto 0;
        .red-packet-box {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-evenly;
          align-items: center;
          width: 738px;
          height: 400px;
          padding: 20px 3px;
          border-radius: 20px;
          border: solid 1px rgba(228, 134, 51, 0.5);
          background-color: rgba(255,170,50,.2);
          li {
            width: 134px;
            height: 174px;
            background: url("../../../../assets/active/newYear2023/red_show.png") no-repeat center center;
            line-height: 262px;
            font-size: 20px;
            text-align: center;
            color: #feeec9;
          }
        }

        .list-winners {
          width: 248px;
          height: 440px;
          border-radius: 20px;
          border: solid 1px rgba(228, 134, 51, 0.5);
          overflow: hidden;

          h4 {
            height: 60px;
            background: rgba(242,156,46, 0.4) url("../../../../assets/active/newYear2023/red_list_winners_h.png") no-repeat center center;
          }
          .list-winners-body {
            width: 234px;
            height: 360px;
            margin: 8px auto 0;
            overflow: hidden;
            ul {
              li {
                padding: 0 15px;
                line-height: 60px;
                border-radius: 4px;
                display: flex;
                justify-content: space-between;
                color: #a75a2b;
                font-size: 16px;
                text-shadow: 0px 1px 1px rgba(184, 54, 18, 0.35);
                &:nth-child(even) {
                  background-color: rgba(242,156,46, 0.3);
                }
                .left {
                  width: 60%;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  i {
                    display: inline-block;
                    width: 40px;
                    height: 40px;
                    margin-right: 10px;
                    background: url("../../../../assets/active/newYear2023/other_user_bor.png") no-repeat;
                    background-size: 100% 100%;
                    border-radius: 50%;
                    vertical-align: middle;
                    overflow: hidden;
                    line-height:38px;
                    text-align: center;
                    img {
                      width: 36px;
                      height: 36px;
                      border-radius: 50%;
                    }
                  }
                }
                .right {
                  width: 35%;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  text-align: right;
                }
              }
            }
          }
          .new-year2023-empty {
            width: 100%;
            height: 360px;
          }
        }
      }

      .progress-box {
        width: 439px;
        height: 6px;
        margin: 60px auto 0;
        display: flex;
        justify-content: space-between;
        box-shadow: inset 0 0 5px 0 rgba(3, 0, 0, 0.2);
        border: solid 1px #9e420b;
        background-color: #9e1f0e;
        position: relative;
        .progress-value {
          position: absolute;
          top: 0;
          left: 0;
          height: 6px;
          background-image: linear-gradient(to right, #ffefa5, #ffad37);
        }
        .node-parent {
          width: 100%;
          display: flex;
          justify-content: space-between;
          li {
            position: relative;
            top: -19px;
            width: 36px;
            height: 43px;
            background-color: #e1573a;
            &.not-started {
              background: url("../../../../assets/active/newYear2023/red_packet_node_disabled.png") no-repeat;
              .date, .status {
                color: #956240;
                text-shadow: 0px 1px 1px rgba(184, 54, 18, 0.15);
              }
              .status {
                text-shadow: 0px 1px 1px rgba(184, 54, 18, 0.35);
              }
            }
            &.run {
              background: url("../../../../assets/active/newYear2023/red_packet_node.png") no-repeat;
            }
            .date {
              position: absolute;
              left: -12px;
              top: -23px;
              width: 60px;
              font-size: 12px;
              text-align: center;
              color: #974019;
            }
            .status {
              position: absolute;
              left: -12px;
              top: 47px;
              width: 60px;
              font-size: 14px;
              text-align: center;
              color: #994925;
            }
            &:first-child {
              margin-left: -3px;
            }
            &:last-child {
              margin-right: -3px;
            }
          }
        }
      }

      .open-red-packet {
        display: block;
        margin: 65px auto 0;
        width: 192px;
        height: 60px;
        span {
          top: 12px;
          font-weight: bold;
        }
      }

      .to-rabbit {
        margin-top: 12px;
        font-size: 16px;
        text-align: center;
        color: #994925;
        text-shadow: 0px 1px 1px rgba(184, 54, 18, 0.35);
        span {
          color: #b83f15;
          cursor: pointer;
        }
      }

      .red-packet-record {
        width: 60px;
        height: 55px;
        background: url("../../../../assets/active/newYear2023/red_packet_record.png") no-repeat center top;
        position: absolute;
        bottom: 34px;
        right: 311px;
        font-size: 14px;
        line-height: 88px;
        text-align: center;
        color: #994825;
        text-shadow: 0px 1px 1px rgba(184, 54, 18, 0.35);
        cursor: pointer;
      }
    }
  }

  .new-year2023-rules {
    height: 488px;
    background: url("../../../../assets/active/newYear2023/red_packet_rule_bg.png") no-repeat;
    li {
      &:first-child {
        margin-top: 110px;
      }
    }
  }

}
</style>
<style lang="less">
.new-year2023-red-packet-house {
  &::before, &::after {
    position: absolute;
    content: "";
    left: 0;
    width: 100%;
    height: 145px;
    z-index: 1;
  }
  &::before {
    top: -42px;
    background: url("../../../../assets/active/newYear2023/red-packet-house_top.png") repeat no-repeat center top;
  }
  &::after {
    bottom: -42px;
    background: url("../../../../assets/active/newYear2023/red-packet-house_bottom.png") repeat no-repeat center bottom;
  }

  .count-down-scr-new-year2023 {
    width: 100%;
    height: 80px;
    position: absolute;
    left: 0;
    top: 26px;
    z-index: 1;
    text-align: center;
    background: url("../../../../assets/active/newYear2023/count_down_scr_bg.png") no-repeat center top;
    p {
      font-weight: bold;
      line-height: 80px;
      font-size: 36px;
      em {
        background-image: linear-gradient(to bottom, #ffff00, #fff);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        font-size: 34px;
      }
    }
  }
}
</style>
