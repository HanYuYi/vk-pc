<template>
  <div class="quartermaster">

    <!-- 活动内容文案-->
    <div class="desc-panel">
      <p>完成一定数量的每日任务, 即可免费领取神秘大奖,最高可获得888元</p>
    </div>

    <!-- 活动时间-->
    <div class="date-panel">
      <h3>活动时间: {{ initInfo.active_show_time }}</h3>
    </div>

    <!-- 每日活动-->
    <div class="title-panel active">
      <i></i>
      <h2>每日活动<p>DAILY ACTIVITIES</p></h2>
    </div>
    <ul class="active-detail">
      <li v-for="(item, index) in activeList" :key="index">
        <small v-if="item.tagTip.length" class="tag">
          {{ item.type ===  '签到' ? item.tagTip.replace(/{}/gi, formatNumber(item.data)) : item.tagTip.replace(/{}/gi, formatNumberFloat(item.data)) }}
        </small>
        <i class="icon" :style="{backgroundPosition: item.iconPos}"></i>
        <p class="type-desc"
           v-html="item.type.includes('{}') ? item.type.replace(/{}/gi, formatNumber(item.typeAmount)) : item.type"></p>
        <p class="result-desc">{{ item.rule }}{{ item.vb }}</p>
        <template v-if="initInfo.is_login">
          <!-- 0 未领取  1 已领取-->
          <!-- <template v-if="index === 0">
            <button class="finish">已自动派发</button>
          </template>-->
          <template v-if="index === 0">
            <button v-if="item.status === 1" class="finish">已自动派发</button>
            <button v-else @click="getReward(index)">{{ item.btnTxt }}</button>
          </template>
          <template v-else>
            <button v-if="item.status === 1" class="finish">已领取</button>
            <template v-else>
              <!-- V富通转账也算充值-->
              <template v-if="item.richpayData !== undefined">
                <button v-if="item.status === 0 && ((item.data > 0 && item.data >= item.typeAmount) || (item.richpayData > 0 && item.richpayData >= item.typeAmount))"
                        class="can-do"
                        @click="getReward(index)">领取奖励</button>
                <button v-else-if="item.status === 0 && ((item.richpayData > 0 && item.richpayData < item.typeAmount) || item.data > 0 && item.data < item.typeAmount)"
                        class="go-on"
                        @click="toTask(index)">继续完成
                </button>
                <button v-else @click="toTask(index)">{{ item.btnTxt }}</button>
              </template>
              <!-- 支持两种以上不同类型的游戏-->
              <template v-else-if="item.betTwoGames !== undefined">
                <button v-if="item.status === 0 && (item.data > 0 && item.data >= item.typeAmount && item.betTwoGames)"
                        class="can-do"
                        @click="getReward(index)">领取奖励</button>
                <button v-else-if="item.status === 0 && (!item.betTwoGames && item.data <= 0)"
                        @click="toTask(index)">{{ item.btnTxt }}</button>
                <button v-else @click="toTask(index)" class="go-on">继续完成</button>
              </template>
              <template v-else>
                <button v-if="item.status === 0 && item.data > 0 && item.data < item.typeAmount"
                        class="go-on"
                        @click="toTask(index)">继续完成</button>
                <button v-else-if="item.status === 0 && item.data > 0 && item.data >= item.typeAmount"
                        class="can-do"
                        @click="getReward(index)">领取奖励</button>
                <button v-else @click="toTask(index)">{{ item.btnTxt }}</button>
              </template>
            </template>
          </template>
        </template>
         <button v-else
                @click="$message({message: '请您先登录', type: 'warning'})">{{ item.btnTxt }}
        </button>
      </li>
    </ul>

    <!-- 我的奖励-->
    <div class="title-panel reward">
      <i></i>
      <h2>我的奖励<p>MY REWARD</p></h2>
    </div>
    <div class="reward-panel">
      <h3 class="task-count">本周已完成任务数量: <small>{{ initInfo.finish_task_num }}个</small></h3>
      <!-- 进度条-->
      <div class="progress" :class="{'has-count': progressCount > 0}">
        <i v-for="num in progressCount" :key="num" class="percentage"></i>
      </div>
      <ul class="progress-pointer">
        <li v-for="(count, index) in [[0,0], [15, progressNumPos[0]], [25, progressNumPos[1]], [35, progressNumPos[2]]]"
            :key="index"
            :style="{marginLeft: `${count[1]}px`}"
        >{{ count[0] }}</li>
      </ul>
      <!-- 奖励面板-->
      <ul class="reward-detail">
        <li v-for="(item, index) in rewardList"
            :key="index"
            :style="{backgroundImage: `url(${item.bg})`}">
          <h2 :style="{marginTop: index === 0 ? '71px' : index === 1 ? '67px' : '65px'}">{{ item.title }}</h2>
          <h3>{{ item.rule.replace(/{}/gi, item.num) }}</h3>
          <template v-if="initInfo.is_login">
            <button v-if="item.status === 0 && initInfo.finish_task_num >= item.num" @click="getSurprised(index)">{{ item.btnTxt }}</button>
            <button v-else class="disabled">{{ item.btnTxt }}</button>
          </template>
          <button v-else
                  @click="$message({message: '请您先登录', type: 'warning'})">
            {{ item.btnTxt }}
          </button>
        </li>
      </ul>
    </div>

    <!-- 活动规则-->
    <dl class="rule-panel">
      <dt>活动规则</dt>
      <dd>
        <ol>
          <li>每日军需任务完成后，需在活动页面领取奖励，未领取则视为主动放弃；</li>
          <li>军需礼物可以累计领取，完成35次军需任务可以领取全部三份军需礼物（彩金需完成1倍流水才能提款）；</li>
          <li>每周日凌晨24:00，军需任务累计数量清零。未领取的每日任务奖励和军需礼物视为放弃；</li>
          <li>V富通单日累计转账100元-500元至主钱包亦可视为每日充值任务达标（需满足V富通存款时间不低于6小时并领取V富通转账红包）；</li>
          <li>两种不同类型的游戏即电竞，体育，真人，电子，棋牌等大类。同类型下不同游戏不计算在本活动内；</li>
          <li>电竞赔率＜1.5、亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水；PT电子游戏中以下游戏不算有效流水：<activeptliushui color="#00fcff" styleClass="quartermaster-style-class"></activeptliushui>；</li>
          <li>每位有效玩家、每个手机号码、电子邮箱、IP地址、每张银行卡、每台设备只能享受一次优惠，如发现有违规者我们将保留无限期审核和扣回红利及所产生的利润权利。VKGAME对本活动保有最终解释权；</li>
        </ol>
      </dd>
    </dl>

    <!-- 回到活动首页-->
    <div class="back-active">
      <router-link to="/active">回到活动首页</router-link>
    </div>

    <TakeDialog :visible.sync="takeDialogVisible" :params="takeDialogParams" />
  </div>
</template>

<script>
import TakeDialog from './takeDialog'
import { formatNumberSplit } from '@/utils/util'
import { mapState } from 'vuex'

export default {
  name: "quartermaster",
  components: { TakeDialog },
  data () {
    return {
      getRewardLoading: false,
      getSurprisedLoading: false,
      takeDialogVisible: false,
      takeDialogParams: {},
      initInfo: {
        is_login: 0,
        finish_task_num: 0
      },
      // 每日活动
      activeList: [
        /*{
          type: "登录",
          rule: "V币+",
          btnTxt: "去登录",
          iconPos: "-197px -17px",
          tagTip: "",
          vb: 10,
          data: 0,
          status: 0
        },*/
        {
          type: "签到",
          rule: "V币+",
          btnTxt: "去签到",
          iconPos: "-262px -17px",
          tagTip: "已连续签到{}天",
          taskUrl: "/user",
          vb: 10,
          data: 0,
          status: 0
        },
        {
          type: '充值≥{}',
          typeAmount: 100,
          rule: "V币+",
          btnTxt: "去充值",
          iconPos: "-328px -17px",
          tagTip: "当前已充值{}元",
          taskUrl: "/user/finance",
          vb: 50,
          data: 0,
          status: 0
        },
        {
          type: '充值≥{}',
          typeAmount: 500,
          rule: "V币+",
          btnTxt: "去充值",
          iconPos: "-328px -17px",
          tagTip: "当前已充值{}元",
          taskUrl: "/user/finance",
          vb: 100,
          data: 0,
          status: 0
        },
        {
          type: "任意游戏<br>流水≥{}元",
          typeAmount: 1000,
          rule: "V币+",
          btnTxt: "去投注",
          iconPos: "-391px -17px",
          tagTip: "当前流水{}元",
          taskUrl: "/gamepage",
          vb: 20,
          data: 0,
          status: 0
        },
        {
          type: "任意游戏<br>流水≥{}元",
          typeAmount: 10000,
          rule: "V币+",
          btnTxt: "去投注",
          iconPos: "-391px -17px",
          tagTip: "当前流水{}元",
          taskUrl: "/gamepage",
          vb: 50,
          data: 0,
          status: 0
        },
        {
          type: " 投注两种以上不同类型<br>的游戏并且总流水≥{}元",
          typeAmount: 500,
          rule: "V币+",
          btnTxt: "去投注",
          iconPos: "-391px -17px",
          tagTip: "当前流水{}元",
          taskUrl: "/gamepage",
          vb: 50,
          data: 0,
          status: 0
        }
      ],
      rewardList: [
        {
          title: "最高188元",
          rule: "军需任务总数≥{}个",
          num: 15,
          status: 0,
          btnTxt: "开宝箱",
          bg: require("../../../../assets/active/quartermaster/reward_1.png")
        },
        {
          title: "最高388元",
          rule: "军需任务总数≥{}个",
          num: 25,
          status: 0,
          btnTxt: "开宝箱",
          bg: require("../../../../assets/active/quartermaster/reward_2.png")
        },
        {
          title: "最高888元",
          rule: "军需任务总数≥{}个",
          num: 35,
          status: 0,
          btnTxt: "开宝箱",
          bg: require("../../../../assets/active/quartermaster/reward_3.png")
        }
      ]
    }
  },
  computed: {
    ...mapState(["isLogin"]),
    // 计算完成个数与进度条的映射
    progressCount () {
      const fullCount = 25
      const accurateCount = fullCount / 100 * (this.initInfo.finish_task_num / 35 * 100)
      const vague = this.initInfo.finish_task_num > 1 ? Math.trunc(accurateCount) : Number.parseInt(accurateCount.toFixed(0))
      return vague > 35 ? 35 : vague
    },
    // 计算进度条中间两个数字（15, 25）位的置
    progressNumPos() {
      const fullCount = 539;
      const one = fullCount / 35 * 15 - 42,
        two = fullCount / 35 * 25 - one - (42 + 27),
        three = fullCount - one - two - (42 + 27 + 27);
      const accurateCountArr = [one, two, three];
      return accurateCountArr;
    }
  },
  watch: {
    isLogin(bool) {
      this.initActiveData()
    }
  },
  mounted () {
    this.initActiveData()
  },
  methods: {
    formatNumberFloat (num) {
      return formatNumberSplit(num)
    },
    formatNumber (num) {
      let tvalue = formatNumberSplit(num)
      return tvalue.substring(0, tvalue.length - 3)
    },
    /**
     * 初始化活动信息
     */
    initActiveData() {
      this.$http(this.ApiSetting.active.quartermasterData.init)
        .then(({status, data}) => {
          if(status === 1 && data) {
            const filterData = this.formatServiceData(data)
            this.activeList = [...filterData.day_task]
            this.rewardList = [...filterData.amg_task]
            this.initInfo.active_show_time = filterData.active_show_time
            this.initInfo.finish_task_num = filterData.finish_task_num
            this.initInfo.is_login = filterData.is_login
          }
        })
    },
    /**
     * 格式化活动数据
     * @param data {Object}
     * @return newData {Object}
     */
    formatServiceData (data) {
      const { day_task, amg_task } = data;
      const _day_task = day_task && day_task.length ? [...this.activeList].map((item, index) => {
        item.vb = day_task[index].vb
        item.data = day_task[index].data
        item.status = day_task[index].status
        // 任务3：支持V富通转账也算充值
        if (Object.keys(day_task[index]).includes("vft")) {
          item.richpayData = day_task[index].vft
        }
        // 任务6：支持两种以上不同类型的游戏
        if (Object.keys(day_task[index]).includes("bet_two_games")) {
          item.betTwoGames = day_task[index].bet_two_games
        }
        return item
      }) : this.activeList

      const _amg_task = amg_task && amg_task.length ? [...this.rewardList].map((item, index) => {
        item.num = amg_task[index].num
        item.status = amg_task[index].status
        return item
      }) : this.rewardList

      data.day_task = _day_task
      data.amg_task = _amg_task
      return data
    },
    /**
     * 做任务
     * @param i {Number}
     */
    toTask (i) {
      this.$router.push(this.activeList[i].taskUrl)
    },
    /**
     * 领取活动奖励
     * @param i {Number}
     */
    getReward (i) {
      if (i !== 0) {
        if (this.getRewardLoading) return
        this.getRewardLoading = true
        let taskid = i
        if (taskid === 0) {
          taskid = 2
        } else if (taskid === 1) {
          taskid = 1
        } else {
          taskid = i + 1
        }
        this.$http(this.ApiSetting.active.quartermasterData.takeVB, { taskid })
          .then(({status}) => {
            if (status === 1) {
              // 前端更新状态、任务个数、拆礼盒状态
              this.activeList[i].status = 1
              this.initInfo.finish_task_num = this.initInfo.finish_task_num + 1
              // this.initActiveData()
              this.takeDialogParams = {
                type: 1,
                num: this.activeList[i].vb
              }
              this.takeDialogVisible = true
            }
          })
          .finally(() => { this.getRewardLoading = false })
      } else {
        this.toTask(i)
      }
    },

    /**
     * 领取个数达到后的奖励
     * @param i {Number}
     */
    getSurprised (i) {
      if (this.getSurprisedLoading) return
      this.getSurprisedLoading = true
      this.$http(this.ApiSetting.active.quartermasterData.takeSurprised, { taskid: i + 7 })
        .then(({status, data}) => {
          if (status === 1 && data) {
            this.rewardList[i].status = 1
            // this.initActiveData()
            this.takeDialogParams = {
              type: 2,
              num: this.formatNumberFloat(data.money)
            }
            this.takeDialogVisible = true
          }
        })
        .finally(() => { this.getSurprisedLoading = false })
    }
  }
}
</script>

<style lang="less" scoped>
.quartermaster {
  background: url("../../../../assets/active/quartermaster/bg.jpg") center top no-repeat;
  min-width: 1406px;
  overflow: hidden;
  .desc-panel {
    margin-top: 462px;
    text-align: center;
    font-size: 18px;
    line-height: 49px;
    color: #e1e1e1;
  }
  .date-panel {
    margin-top: 12px;
    font-size: 14px;
    line-height: 14px;
    text-align: center;
    color: #e1e1e1;
    * {
      font-weight: normal;
    }
  }
  .title-panel {
    height: 92px;
    background: url("../../../../assets/active/quartermaster/title_bg.png") no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    i {
      display: block;
      width: 64px;
      height: 56px;
      margin-right: 7px;
      background: url("../../../../assets/active/quartermaster/icon.png") no-repeat;
    }
    h2 {
      height: 56px;
      margin-left: 7px;
      font-size: 30px;
      font-weight: bold;
      line-height: 30px;
      color: #fff;
      p {
        margin-top: 10px;
        font-size: 14px;
        line-height: 14px;
        color: #fff;
        font-weight: normal;
      }
    }
    &.active {
      margin-top: 110px;
      i {
        background-position: -9px -10px;
      }
    }
    &.reward {
      margin-top: 87px;
      i {
        background-position: -104px -10px;
      }
    }
  }
  .active-detail {
    margin: 69px auto 0;
    width: 1240px;
    height: 321px;
    background: url("../../../../assets/active/quartermaster/active_bg.png") no-repeat;
    display: flex;
    justify-content: space-between;
    li {
      margin-top: 56px;
      width: 180px;
      height: 209px;
      text-align: center;
      &:first-child,&:last-child {
        width: 190px;
      }
      /*&:first-child {
        .icon {
          margin-top: 45px;
        }
      }*/
      .tag {
        display: inline-block;
        width: 152px;
        border-radius: 10px;
        line-height: 20px;
        background-color: #ff5a04;
        font-size: 14px;
        text-align: center;
        color: #fff;
      }
      .icon {
        margin-top: 25px;
        background: url("../../../../assets/active/quartermaster/icon.png") no-repeat;
        display: inline-block;
        width: 40px;
        height: 40px;
      }
      .type-desc {
        margin-top: 5px;
        height: 30px;
        font-size: 14px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
      }
      .result-desc {
        margin-top: 17px;
        font-size: 18px;
        font-weight: bold;
        line-height: 18px;
        color: #fff;
      }
      button {
        width: 100px;
        height: 27px;
        margin-top: 23px;
        border-radius: 5px;
        background-color: #f07a3a;
        border: 0;
        outline: 0;
        font-size: 14px;
        font-weight: bold;
        line-height: 27px;

        color: #fff;
        cursor: pointer;
        &.go-on {
          background-color: #67af4a;
        }
        &.can-do {
          background-color: #ff5a04;
        }
        &.finish {
          background-color: #919191;
          cursor: not-allowed;
        }
      }
    }
  }
  .reward-panel {
    margin-top: 34px;
    height: 745px;
    background: url("../../../../assets/active/quartermaster/reward_bg.png") no-repeat no-repeat center top;
    border-top: 1px solid transparent;
    .task-count {
      margin-top: 36px;
      font-size: 18px;
      line-height: 18px;
      text-align: center;
      color: #fff;
      small {
        font-size: 18px;
        line-height: 18px;
        font-weight: bold;
        color: #ff5a04;
      }
    }
    .progress {
      margin: 27px auto 0;
      width: 559px;
      height: 44px;
      position: relative;
      &.has-count {
        &:before {
          position: absolute;
          content: "";
          top: 0;
          left: 0;
          width: 48px;
          height: 44px;
          background: url("../../../../assets/active/quartermaster/icon.png");
          background-position: -15px -90px;
        }
      }
      .percentage {
        display: inline-block;
        margin-left: -6.68px;
        width: 27px;
        height: 44px;
        background: url("../../../../assets/active/quartermaster/progress_pointer.png") repeat no-repeat;
        background-position: left center;
        &:first-child {
          margin-left: 41px;
        }
      }
    }
    .progress-pointer {
      width: 539px;
      margin: 8px auto 0;
      white-space: nowrap;
      li {
        display: inline-block;
        font-size: 22px;
        font-weight: bold;
        line-height: 22px;
        color: #1aaff8;
      }
    }
    .reward-detail {
      width: 1406px;
      margin: 80px auto 0;
      display: flex;
      li {
        width: 486px;
        height: 485px;
        background-size: 100% 100%;
        text-align: center;
        h2 {
          margin-top: 65px;
          font-size: 22px;
          line-height: 22px;
          font-weight: bold;
          color: #00fcff;
        }
        h3 {
          margin-top: 24px;
          font-size: 18px;
          font-weight: bold;
          color: #fff;
          text-decoration: underline;
        }
        button {
          margin-top: 188px;
          width: 127px;
          height: 34px;
          line-height: 34px;
          border-radius: 5px;
          background-color: #ff5a04;
          font-size: 18px;
          font-weight: bold;
          color: #fff;
          outline: 0;
          border: 0;
          cursor: pointer;
          &.disabled {
            background-color: #919191;
            cursor: not-allowed;
          }
        }
      }
    }
  }
  .rule-panel {
    margin: 48px auto 0;
    width: 754px;
    color: #00fcff;
    dt {
      text-align: center;
      font-size: 24px;
      font-weight: bold;
      line-height: 24px;
    }
    dd {
      margin-top: 20px;
      ol {
        li {
          font-size: 14px;
          line-height: 38px;
          list-style: decimal;
        }
      }
    }
  }
  .back-active {
    margin: 37px 0 50px;
    text-align: center;
    a {
      display: inline-block;
      width: 339px;
      height: 45px;
      border-radius: 21.3px;
      border: solid 2px rgba(237,237,237, 0.33);
      font-size: 18px;
      font-weight: bold;
      line-height: 45px;
      text-align: center;
      color: #fff;
    }
  }
}
</style>
<style lang="less">
  .quartermaster-style-class {
    background: #122333;
    border: 1px solid rgba(255,255,255,0.27);
    box-shadow: 0 0 12px #3c6b96;
    .ptgame_more_rule {
      background: #122333;
      tr {
        th {
          color: #fff;
        }
        &:nth-child(odd) {
          background: #122333!important;
        }
      }
    }
    &[x-placement^=bottom] {
      .popper__arrow {
        border-bottom-color: rgba(255,255,255,0.27);
      }
    }
    .popper__arrow {
      border-top-color: rgba(255,255,255,0.27) !important;
    }
  }
</style>
