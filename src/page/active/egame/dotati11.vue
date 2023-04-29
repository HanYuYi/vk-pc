<template>
  <div class="dotati11">

    <h2 class="date">
      <p v-if="initInfo.active_show_time">活动时间 ：{{ initInfo.active_show_time }}</p>
    </h2>

    <!-- 子活动tabs-->
    <div class="tabs">
      <div class="tabs-bg" :style="{
        width: `${tabsList[tabActiveIndex][1].width}`,
        transform: `translateX(${bgLeft}px)`,
        backgroundImage: `url(${tabsList[tabActiveIndex][1].bg})`,
        backgroundPosition: tabActiveIndex === 0 ? 'right top' : 'left top'
        }"></div>
      <ul class="tabs-center" ref="tabRef">
        <li v-for="(arr, index) in tabsList"
             :key="index"
             class="tab-item"
             :class="{active: tabActiveIndex === index}"
             @click="tabActiveIndex = index">
          <span>{{ arr[0] }}</span>
        </li>
      </ul>
    </div>

    <!-- 子活动面板-->
    <div class="tab-panel">

      <!-- TI11首存助力-->
      <div v-if="tabActiveIndex === 0" class="first-deposit">
        <dl class="public-component active-content">
          <dt class="title">活动内容</dt>
          <dd class="content">
            <p class="desc">活动期间，会员每日完成首存≥{{ firstDepositTableList.data[0].deposit }}元，并转入对应的电竞场馆钱包，即可获得一次返利彩金，最高每日获得<span>{{ firstDepositTableList.data[firstDepositTableList.data.length - 1].bonus }}元</span>现金。</p>

            <div class="content-panel">
              <table width="100%" border="0" align="center" cellspacing="0">
                <thead>
                  <tr>
                    <th>场馆要求</th>
                    <th>首充要求(￥)</th>
                    <th>返利彩金(￥)</th>
                    <th>流水要求</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, index) in firstDepositTableList.data" :key="index">
                    <td v-if="index === 0" :rowspan="firstDepositTableList.data.length">
                      <span v-for="(txt, i) in firstDepositTableList.venue" :key="i">{{ txt }}<br></span>
                    </td>
                    <td class="bor">{{ row.deposit }}</td>
                    <td class="bor highlight">{{ row.bonus }}</td>
                    <td v-if="index === 0" :rowspan="firstDepositTableList.data.length">{{ firstDepositTableList.flow }}</td>
                  </tr>
                </tbody>
              </table>

            </div>

            <button @click="openBonusDialog"
                    class="dotati11-public-btn"
                    :class="{disabled: firstDepositData.status === 2 || firstDepositDataLoading}">
              {{ firstDepositData.status === 2 ? '今日已领取' : '立即领取' }}
            </button>

          </dd>
        </dl>

        <dl class="public-component active-rule">
          <dt class="title">活动规则</dt>
          <dd class="content">

            <div class="content-panel">
              <div class="rule">
                <ul>
                  <li>每日充值在未发起提款前都视为首充；若用户在申请此活动彩金前将存款从主钱包转出或发起提款，则不可申请此优惠活动。</li>
                  <li>符合条件的会员，可在优惠活动页面点击“立即领取”按钮，对应的活动彩金在领取成功后将自动添加至会员所选择的电竞游戏钱包中。每日仅限领取一次。</li>
                  <li>申请奖金后需在指定电竞游戏中完成相对应的流水要求，当用户对应电竞钱包余额＜最低投注额且无未结算注单时，系统将自动判定已完成活动规定的有效流水。</li>
                  <li>此优惠活动领取当天不与 电竞首存、USDT存款 领三重好礼优惠活动同时共享。若用户参与了电竞首存，需先完成电竞首存活动流水才可参加本活动，活动同时进行时，只可选择一个参加。</li>
                  <li>电竞游戏场馆仅限：小艾电竞、RG电竞、IM电竞。有效投注额仅计算产生输赢结果的注单，电竞赔率＜1.5，走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效投注。</li>
                  <li>每位有效玩家、每个手机号码、电子邮箱、IP地址、每张银行卡、每台设备只能享受一次优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利；VKGAME对本活动保有最终解释权。</li>
                </ul>
              </div>
            </div>

          </dd>
        </dl>
      </div>

      <!-- 聚首TI 包赔升级-->
      <div v-if="tabActiveIndex === 1" class="with-three">
        <div v-if="withThreeData.event_info" class="match">
          <div class="match-game">
            <h2 class="match-title">{{ withThreeData.event_info.game_name }}</h2>
            <ul>
              <li class="left">
                <img :src="withThreeData.event_info.l_team_logo" alt="">
                <p>{{ withThreeData.event_info.l_team_name }}</p>
              </li>
              <li v-if="withThreeData.event_info.game_status === 1" class="match-date">{{ withThreeDateSplit[0] }}
                <span>{{ withThreeDateSplit[1] }}</span>
                <i>VS</i>
              </li>
              <li v-if="withThreeData.event_info.game_status === 2" class="end">进行中</li>
              <li v-if="withThreeData.event_info.game_status !== 1 && withThreeData.event_info.game_status !== 2" class="end">已结束</li>
              <li class="right">
                <img :src="withThreeData.event_info.r_team_logo" alt="">
                <p>{{ withThreeData.event_info.r_team_name }}</p>
              </li>
            </ul>

            <div v-if="withThreeData.event_info.game_status === 1 && withThreeDataShowTime" class="deposit-date">
              <p>请在<strong>{{ handlerFormatCountTime(withThreeDataCountTime) }}</strong>内完成活动存款要求</p>
              <p>点击进入<router-link :to="{path:'/user/finance/'}">财务中心</router-link></p>
            </div>
            <div v-if="withThreeData.event_info.game_status === 1 && !withThreeDataShowTime" class="deposit-date">
              <p>本比赛活动要求存款时间</p>
              <p>{{ withThreeData.event_info.deposit_time }}</p>
            </div>
            <button v-if="withThreeData.event_info.game_status !== 1" @click="applyWithThreeBonus" class="dotati11-public-btn apply-btn" :class="{disabled: withThreeData.status === 16312}">
              {{ withThreeData.status === 16312 ? '已申请' : '申请包赔金'}}
            </button>
          </div>
        </div>
        <div v-else class="match empty"></div>

        <dl class="public-component active-content">
          <dt class="title">活动内容</dt>
          <dd class="content">
            <p class="desc">活动期间，会员在开赛前投注指定电竞场馆的 DOTA2Ti11 盘口赛事，若单笔注单结算为负盈利，即可申请注单包赔，领取包赔金。</p>

            <div class="content-panel">
              <table width="100%" border="0" align="center" cellspacing="0">
                <thead>
                <tr>
                  <th>会员等级要求</th>
                  <th>存款金额(￥)</th>
                  <th>单笔投注金额(￥)</th>
                  <th>包赔返利</th>
                  <th>包赔金上限(￥)</th>
                  <th>流水要求</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(row, index) in withThreeDataTableList.data" :key="index">
                  <td class="bor">{{ row.level }}</td>
                  <td v-if="index === 0" class="bor" :rowspan="withThreeDataTableList.data.length">
                    ≥{{ withThreeDataTableList.deposit }}
                  </td>
                  <td v-if="index === 0" :rowspan="withThreeDataTableList.data.length">
                    ≥{{ withThreeDataTableList.bettingAmount }}
                  </td>
                  <td class="bor">{{ row.rebate }}%</td>
                  <td class="bor highlight">{{ row.limit }}</td>
                  <td v-if="index === 0" :rowspan="withThreeDataTableList.data.length" v-html="withThreeDataTableList.flow"></td>
                </tr>
                </tbody>
              </table>

            </div>

          </dd>
        </dl>

        <dl class="public-component active-rule">
          <dt class="title">活动规则</dt>
          <dd class="content">

            <div class="content-panel">
              <div class="rule">
                <ul>
                  <li>存款时间定义：每场赛事开赛前24小时内的累计存款，每次存款时间内的存款只可申请一次保险注单活动。 例：A场保单赛事时间为10月02日04:00，有效存款时间为10月01日04:00-10月02日04:00，在此期间会员累计存款≥500元；若会员参与本场赛事投注，单笔投注额≥500元即可参加A场保单赛事。</li>
                  <li>参与包赔优惠的会员需要在电竞赛事（小艾电竞、RG电竞、IM电竞）投注仅计算产生输赢结果的注单，但不包括特殊盘口；盘口赔率要求：投注指定赛事的赔率不得低于电竞赔率＜1.5，走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效投注。</li>
                  <li>申请包赔金的注单需为全输，若会员所投注的注单结算为输一半则视为无效注单，不可申请。符合条件的用户需在注单结算后的24小时内联系在线客服申请包赔金，逾期则视为自动放弃。</li>
                  <li>包赔金将在审核通过后的3日内派发至用户指定的电竞钱包（小艾电竞、RG电竞、IM电竞三选一）中，包赔金需在所选游戏中完成对应的流水要求，流水未完成前不可再次申请本活动；当用户对应电竞钱包余额≤原钱包余额且无未结算注单时，系统将自动判定已完成活动规定的有效流水。</li>
                  <li>包赔单活动每场赛事仅限200个包赔名额，先到先得。此活动当天不与电竞首存类活动、S12救援金活动共享。若用户参与了电竞首存，需先完成电竞首存活动流水才可参加本活动；同样S12救援金与电竞包赔活动不共享，活动同时进行时，只可选择一个参加。</li>
                  <li>赛事取消或改期或其他原因导致赛事不能正常进行，则对应当期的保险投注优惠取消；若保单赛事因官方原因改变赛事时间，则有效存款时间从原开赛时间前24小时开始计算。</li>
                  <li>每位有效玩家、每个手机号码、电子邮箱、IP地址、每张银行卡、每台设备只能享受一次优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利；VKGAME对本活动保有最终解释权。</li>
                </ul>
              </div>
            </div>

          </dd>
        </dl>

      </div>

      <!-- 万元ROLL奖-->
      <div v-if="tabActiveIndex === 2" class="roll-prize">
        <dl class="public-component active-content">
          <dt class="title multiline">&nbsp;&nbsp;DOTA2 Ti11<p>专属万元 ROLL 福利</p></dt>
          <dd class="content">
            <p class="desc">活动期间，全站VIP会员需在电竞场馆投注“DOTA2 TI11联赛”且累计总有效流水≥10,000元，即可参与 DOTA2 TI11专属万元roll房抽奖。</p>

            <div class="content-panel roll-wrapper">
              <div class="left">
                <h3 class="ornaments-title">Dota2 饰品</h3>

                <div class="swiper-ornaments">
                  <swiper class="site-swiper" :options="mySwiperOptions">
                    <swiper-slide v-for="(imgObj, index) in rollPrizeOrnaments"
                                  :key="index"
                                  :style="{ backgroundImage:  `url(${imgObj})` }"/>
                  </swiper>
                  <div class="ti11-swiper-pagination"></div>
                </div>


                <button v-if="!initInfo.is_login || rollPrizeDataLoading"
                             @click="rollPrizeDataLoading ? null : $message({ message: '请您先登录', type: 'warning' })"
                        class="dotati11-public-btn to-room"
                        :class="{disabled: rollPrizeDataLoading}">
                  进入房间
                </button>
                <router-link v-else
                             :to="`/roll/${rollPrizeData.roll_no}`"
                             class="dotati11-public-btn to-room">
                  进入房间
                </router-link>

                <p class="total-flow">当前总流水：<span>{{ formatNumberByDecimal(rollPrizeData.total_water) }}元</span></p>

              </div>
              <div class="right">
                <!-- <div class="room-item">房间号： <span>{{ rollPrizeData.roll_no }}</span></div>-->
                <div class="room-item">物品数量： <span>{{ rollPrizeData.prize_count }}件</span></div>
                <div class="room-item large">奖池价值： <span>{{ rollPrizeData.prize_show_amount }}</span></div>
                <div class="room-item">开奖时间： <span>{{ rollPrizeData.lottery_time }}</span></div>
                <div class="room-item flex">倒计时：&nbsp;
                  <ul>
                    <li>
                      <div class="time-box">{{ roomCountDownList[0] }}</div>
                      <small>DAYS</small>
                    </li>
                    <li class="colon">
                      <div class="time-box">{{ roomCountDownList[1] }}</div>
                      <small>HOURS</small>
                    </li>
                    <li class="colon">
                      <div class="time-box">{{ roomCountDownList[2] }}</div>
                      <small>MINUTES</small>
                    </li>
                    <li>
                      <div class="time-box">{{ roomCountDownList[3] }}</div>
                      <small>SECONDS</small>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </dd>
        </dl>

        <dl class="public-component active-rule">
          <dt class="title">活动规则</dt>
          <dd class="content">

            <div class="content-panel">
              <div class="rule">
                <ul>
                  <li>电竞游戏场馆仅限：小艾电竞、RG电竞、IM电竞，每日充值在未发起提款前都视为首充。</li>
                  <li>此活动奖品可以折现(折现价格以roll房原价饰品7折为准计算)，用户在参与抽奖前需要并电竞场馆投注 Ti11盘口的注单，且累计有效流水≥10,000元，即可参与万元roll房抽奖。</li>
                  <li>有效投注额仅计算产生输赢结果的注单，电竞赔率＜1.5，走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效投注。</li>
                </ul>
              </div>
            </div>

          </dd>
        </dl>
      </div>
    </div>


    <div class="back-active">
      <router-link to="/active" class="botton normal dotati11-public-btn">{{$t("Return_to_activity_page")}}</router-link>
    </div>

    <!-- 活动一彩金领取弹窗-->
    <el-dialog
      :visible.sync="bonusDialogVisible"
      v-dir-center="bonusDialogVisible"
      custom-class="dotati11-bonus-dialog"
      width="690px"
      title="领取彩金"
      :close-on-click-modal="false"
      :show-close="true"
      :append-to-body="true"
      :before-close="() => { bonusDialogVisible = false }">

      <div class="dialog-main">

        <div class="select-item">
          <h4>请选择转入场馆游戏：</h4>
          <ul class="wallet-wrapper">
            <li v-for="(row, index) in firstDepositWallet"
                :key="index"
                @click="firstDepositWalletSelected = row"
                :class="{active: firstDepositWalletSelected.code === row.code}">
              {{ row.name }}
            </li>
          </ul>
        </div>

        <div class="select-item">
          <h4>请选择转入金额(¥)：</h4>
          <ul class="money-wrapper">
            <li v-for="(row, index) in firstDepositTableList.data"
                :key="index"
                @click="firstDepositData.max_bouns >= row.bonus ? firstDepositBonusSelected = row : {}"
                :class="[{active: firstDepositBonusSelected.deposit === row.deposit}, {disabled: firstDepositData.max_bouns < row.bonus }]">
              {{ formatNumber(row.deposit) }}
            </li>
          </ul>
        </div>

        <div class="select-item">
          <h4>可领取彩金(¥)：<span class="bonus">{{ firstDepositBonusSelected.bonus }}</span></h4>
        </div>

        <div class="footer-info">
          <p class="deposit-money">今日首充金额：<span>¥{{ formatNumberByDecimal(firstDepositData.first_deposit) }}</span></p>
          <button @click="takeFirstDepositBonus" class="dotati11-public-btn">确定转入</button>
          <p class="deposit-money">(本金+彩金)x3倍流水提款</p>
        </div>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import { formatNumberSplit, formatCountTime } from '@/utils/util'
import { mapState } from 'vuex'

export default {
  name: 'dotati11',
  components: { Swiper, SwiperSlide },
  data() {
    return {
      initInfo: {},
      tabActiveIndex: 0,
      bgLeft: 0,
      tabsList: [
        ["TI11首存助力", {width: 'calc((100% - 413px) / 2)', bg: require("../../../assets/active/dotati11/tab_item_1.png")}],
        ["聚首TI 包赔升级", {width: '413px', bg: require("../../../assets/active/dotati11/tab_item_2.png")}],
        ["万元ROLL奖", {width: 'calc((100% - 413px) / 2 - 2px)', bg: require("../../../assets/active/dotati11/tab_item_3.png")}]
      ],

      // TI11首存助力数据
      firstDepositData: {
        max_bouns: 0
      },
      firstDepositDataLoading: false,
      firstDepositTableList: {
        venue: ['小艾电竞', 'RG电竞', 'IM电竞'],
        data: [
          { deposit: 100, bonus: 8 },
          { deposit: 500, bonus: 18 },
          { deposit: 2000, bonus: 68 },
          { deposit: 5000, bonus: 188 },
          { deposit: 10000, bonus: 288 },
          { deposit: 50000, bonus: 688 }
        ],
        flow: '（本金+彩金）x3倍流水'
      },
      bonusDialogVisible: false,
      firstDepositWallet: [
        {name: '小艾电竞钱包', code: 'EG'},
        {name: 'RG电竞钱包', code: 'RG'},
        {name: 'IM电竞钱包', code: 'IM'}
      ],
      firstDepositWalletSelected: {},
      firstDepositBonusSelected: {},

      // 聚首TI 包赔升级数据
      withThreeData: {
        event_info: null
      },
      withThreeDataShowTime: false,
      withThreeDataCountTime: 0,
      countTimer: null,

      withThreeDataTableList: {
        deposit: 500,
        bettingAmount: 500,
        data: [
          { level: 'VIP0-VIP1', rebate: 3, limit: 88 },
          { level: 'VIP2-VIP3', rebate: 5, limit: 188 },
          { level: 'VIP4-VIP5', rebate: 10, limit: 288 },
          { level: 'VIP6-VIP7', rebate: 15, limit: 388 },
          { level: 'VIP8-VIP9', rebate: 20, limit: 588 },
          { level: 'VIP10-VIP11', rebate: 25, limit: 688 },
          { level: 'VIP12', rebate: 30, limit: 888 }
        ],
        flow: '3倍电竞流水'
      },

      // 万元ROLL奖
      rollPrizeData: {
        roll_info: null
      },
      rollPrizeDataLoading: false,
      rollPrizeOrnaments: [
        require("../../../assets/active/dotati11/ornaments_1.png"),
        require("../../../assets/active/dotati11/ornaments_2.png"),
        require("../../../assets/active/dotati11/ornaments_3.png")
      ],
      mySwiperOptions: {
        loop: true,
        autoplay: { delay: 3000, disableOnInteraction: false },
        grabCursor : true,
        on: {
          // 模拟 hover 执行分页器点击事件
          paginationRender: () => {
            const paginationElList = document.getElementsByClassName("ti11-swiper-pagination")
            for (let i = 0; i < paginationElList.length; i++) {
              paginationElList[i].onmouseover = event => {
                event.target.click()
              }
            }
          }
        },
        pagination: { el: ".ti11-swiper-pagination", clickable: true }
      },
      roomCountDownList: [0,0,0,0],
      countDownTimer: null
    }
  },

  computed: {
    ...mapState(["isLogin"]),

    withThreeDateSplit() {
      if (this.withThreeData.event_info) {
        return this.withThreeData.event_info.date_time.split(" ")
      }
      return ['', '']
    }
  },

  watch: {
    isLogin() {
      this.initData()

      this.getFirstDepositData()
      this.getWithThreeData()
      this.getRollPrizeData()
    },
    tabActiveIndex(index) {
      this.calcBgLeft(index)
      if (index === 0) {
        this.getFirstDepositData()
      }

      if (index === 1) {
        this.getWithThreeData()
      }

      if (index === 2) {
        this.getRollPrizeData()
      }

      // 定位页面位置
      const pageTop = document.documentElement.scrollTop || document.body.scrollTop
      this.$nextTick(() => {
        window.scrollTo(0 , pageTop)
      })
    },

    bonusDialogVisible(bool) {
      if (bool) {
        this.firstDepositWalletSelected = this.firstDepositWallet[0]
        this.firstDepositBonusSelected = this.firstDepositTableList.data[0]
      }
    }
  },

  mounted () {
    this.initData()

    this.getFirstDepositData()

    window.onresize = () => { this.calcBgLeft(this.tabActiveIndex) }

    this.$nextTick(() => {
      document.onkeydown = event => {
        if(event.keyCode === 37){
          if (this.tabActiveIndex <= 0) {
            this.tabActiveIndex = 2
            return
          }
          this.tabActiveIndex--
        }
        if(event.keyCode === 39){
          if (this.tabActiveIndex >= 2) {
            this.tabActiveIndex = 0
            return
          }
          this.tabActiveIndex++
        }
      }
    })
  },

  methods: {
    formatNumberByDecimal(num) {
      return formatNumberSplit(num)
    },

    formatNumber(num) {
      let value = formatNumberSplit(num)
      return value.substring(0, value.length - 3)
    },

    handlerFormatCountTime (time) {
      return formatCountTime(time)
    },

    // 计算选中tab的偏移值
    calcBgLeft(index) {
      this.$nextTick(() => {
        const tabRef = this.$refs.tabRef
        this.bgLeft = tabRef.children[index].offsetLeft
      })
    },

    // 活动全局接口初始化
    async initData() {
      const res = await this.$http(this.ApiSetting.active.dotaTi11.commonInit)
      console.info("初始化ti11活动全局信息：", res)

      if (res.status === 1 && res.data) {
        this.initInfo = res.data
      }
    },

    // 获取活动一数据
    async getFirstDepositData() {
      this.firstDepositDataLoading = true
      const res = await this.$http(this.ApiSetting.active.dotaTi11.initFirstDeposit)
      console.info("初始化ti11活动一信息：", res)

      if (res.status === 1 && res.data) {
        this.firstDepositData = res.data
      }
      this.firstDepositDataLoading = false
    },

    // 开启活动一领取彩金弹窗
    openBonusDialog() {
      if (this.firstDepositDataLoading) return
      // 今日已领取
      if (this.firstDepositData.status === 2) {
        return
      }
      // 不可领取
      if (this.firstDepositData.status !== 0) {
        this.$message({message: this.firstDepositData.statusTips, type: 'warning'})
        return
      }
      this.bonusDialogVisible = true
    },

    // 活动一提交领取彩金
    async takeFirstDepositBonus() {
      const params = {
        from: "NM",
        to: this.firstDepositWalletSelected.code,
        money: this.firstDepositBonusSelected.bonus,
        active_id: this.firstDepositData.active_id
      }
      console.info("ti11活动一领取彩金入参：", params)
      const res = await this.$http(this.ApiSetting.user.transferSubmit, params)
      console.info("ti11活动一领取彩金响应：", res)

      if (res.status === 1) {
        this.bonusDialogVisible = false
        this.$message({
          message: `领取${
            this.firstDepositBonusSelected.bonus
          }元彩金成功，本金和彩金合计${
            this.formatNumber(this.firstDepositBonusSelected.bonus + this.firstDepositBonusSelected.deposit)
          }元已转入${
            this.firstDepositWallet.filter(item => item.code === this.firstDepositWalletSelected.code)[0].name
          }`,
          type: 'success' })
        this.getFirstDepositData()
      }
    },

    // 获取活动二数据
    async getWithThreeData() {
      clearInterval(this.countTimer)
      const res = await this.$http(this.ApiSetting.active.dotaTi11.initWithThree)
      console.info(`ti11活动二展示逻辑：
        game_status 为  1:展示赛事时间   2:进行中   不为1和2:已结束；
        game_status 为  1，deposit_end_time - 当前时间 小于等于${24 * 60 * 60}，显示财务中心入口。反之则显示 活动要求存款时间；
        game_status 不为  1 ，status 为 16312，显示已申请按钮。反之显示申请包赔进按钮；
        status 不为 0，toast提示 statusTips；
      `)
      console.info("初始化ti11活动二信息：", res)

      if (res.status === 1 && res.data) {
        this.withThreeData = res.data

        // 小于24小时显示存款倒计时
        if (this.withThreeData.event_info && this.withThreeData.event_info.deposit_end_time) {
          const now =  Date.now() / 1000
          this.withThreeDataCountTime = parseInt(Math.abs(this.withThreeData.event_info.deposit_end_time - now));
          if (
            now >= this.withThreeData.event_info.deposit_start_time &&
            this.withThreeData.event_info.deposit_end_time > now &&
            this.withThreeDataCountTime <= 24 * 60 * 60
          ) {
            this.withThreeDataShowTime = true

            clearInterval(this.countTimer)
            this.countTimer = setInterval(() => {
              this.withThreeDataCountTime--
              if (this.withThreeDataCountTime < 1) {
                clearInterval(this.countTimer)
                this.getWithThreeData()
                this.withThreeDataShowTime = false
              }
            }, 1000);
          }
        }
      }
    },

    // 活动二申请包赔金
    applyWithThreeBonus() {
      // 已申请
      if (this.withThreeData.status === 16312) {
        return
      }
      // 不可领取
      if (this.withThreeData.status !== 0) {
        this.$message({message: this.withThreeData.statusTips, type: 'warning'})
        return
      }
      this.openKfWindow()
    },

    // 获取活动三数据
    async getRollPrizeData() {
      this.rollPrizeDataLoading = true
      const res = await this.$http(this.ApiSetting.active.dotaTi11.initRollPrizeData)
      console.info("初始化ti11活动三信息：", res)

      if (res.status === 1 && res.data) {
        this.rollPrizeData = res.data

        if (this.rollPrizeData.roll_info) {
          this.roomCountDown(this.rollPrizeData.roll_info.end_time)
        }
      }
      this.rollPrizeDataLoading = false
    },

    // 活动三 roll房间倒计时
    roomCountDown(timeStamp) {
      let remainingTime = timeStamp - new Date().getTime() / 1000
      const countDown = () => {
        let day = parseInt(remainingTime / (60 * 60 * 24))
        let hour = parseInt(remainingTime / 60 / 60 % 24)
        let minute = parseInt(remainingTime / 60 % 60)
        let second = parseInt(remainingTime % 60)

        return [
          day < 10 ? `0${day}` : day,
          hour < 10 ? `0${hour}` : hour,
          minute < 10 ? `0${minute}` : minute,
          second < 10 ? `0${second}` : second,
        ]
      }

      clearInterval(this.countDownTimer)
      this.countDownTimer = setInterval(() => {
        if (remainingTime > 0) {
          remainingTime--
          this.roomCountDownList = countDown()
        } else {
          this.roomCountDownList = [0,0,0,0]
          clearInterval(this.countDownTimer)
        }
      }, 1000)
    }
  },

  destroyed () {
    clearInterval(this.countDownTimer)
  },
}
</script>

<style lang="less" scoped>
@icon: url("../../../assets/active/dotati11/icon.png");
@center-width: 1080px;
@font-color: #ffda9e;
.dotati11 {
  overflow: hidden;
  background-image: url("../../../assets/active/dotati11/banner.jpg"), linear-gradient(to bottom, #592222, #210000);
  background-repeat: no-repeat, repeat;
  background-position: center top, center 748px;
  background-size: auto, 1920px auto;
  position: relative;
  &:before, &:after {
    position: absolute;
    content: "";
    pointer-events: none;
  }
  &:before {
    left: 0;
    bottom: 4px;
    width: 497px;
    height: 1005px;
    background: url("../../../assets/active/dotati11/bg_left.png") no-repeat;
  }
  &:after {
    right: 0;
    bottom: -157px;
    width: 894px;
    height: 1051px;
    background: url("../../../assets/active/dotati11/bg_right.png") no-repeat;
  }

  .date {
    margin: 532px auto 0;
    font-size: 22px;
    text-align: center;
    background-image: linear-gradient(to top, #ffdca1, #fff), linear-gradient(to bottom, #ffe1ae, #ffe1ae);
    color: #ffe1ae;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 0 10px #ecb19a;
  }

  .tabs {
    margin: 63px auto 0;
    width: 100%;
    height: 138px;
    background-image: url("../../../assets/active/dotati11/tab.png");
    background-position: -5% 0;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
    .tabs-bg {
      position: absolute;
      left: 0;
      top: 14px;
      height: 110px;
      z-index: 1;
      pointer-events: none;
      background-size: auto 100%;
      background-repeat: no-repeat;
      transition: all 0.5s;
    }
    .tabs-center {
      z-index: 2;
      position: relative;
      width: 100%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      .tab-item {
        width: calc((100% - 413px) / 2);
        overflow: hidden;
        position: relative;
        font-size: 36.5px;
        line-height: 130px;
        letter-spacing: 2.74px;
        color: @font-color;
        cursor: pointer;
        transition: all 100ms;
        &.active {
          font-size: 42.5px;
          font-weight: bold;
          letter-spacing: normal;
          color: #fff;
          text-shadow: 0.3px 2px 2px #be1d2d;
        }
        &:first-child {
          text-align: right;
          span {
            margin-right: 83px;
          }
        }
        &:nth-child(2) {
          width: 413px;
          text-align: center;
        }
        &:last-child {
          span {
            margin-left: 83px;
          }
        }
      }
    }
  }

  // 公共组件
  .public-component {
    width: 1093px;
    margin: 0 auto;
    .title {
      width: inherit;
      height: 53px;
      background-image: @icon;
      background-position: -29px -294px;
      background-repeat: no-repeat;
      font-size: 32px;
      font-weight: bold;
      line-height: 28px;
      text-align: center;
      color: #ffe6a5;
      text-shadow: 0 0 10px #c53024;
    }
    .content {
      width: 1080px;
      margin: 0 auto;
      overflow: hidden;
      .desc {
        font-size: 14.5px;
        line-height: 20px;
        color: #fff;
        padding: 0 120px;
        span {
          font-size: 21.5px;
          font-weight: bold;
          color: #fcd59b;
        }
      }
      .content-panel {
        overflow: hidden;
        table {
          text-align: center;
          thead {
            th {
              color: @font-color;
              font-size: 20px;
              line-height: 66px;
            }
          }
          tbody {
            td {
                height: 38.5px;
                font-size: 14px;
                line-height: 36px;
                color: #fff;
                box-sizing: border-box;

                &.bor {
                  border: solid 2px rgba(255, 230, 165, 0.4);
                  border-top: 0;
                }

                &.highlight {
                  color: #f8d198;
                  font-weight: bold;
                }
              }
          }
        }

        .rule {
          overflow: hidden;
          ul {
            margin: 48px 150px 0 170px;
            li {
              margin-top: 12px;
              font-size: 14px;
              line-height: 24px;
              color: #fff;
              list-style: decimal;
            }
          }
        }
      }
    }
  }

  .tab-panel {
    // 活动一
    .first-deposit {
      overflow: hidden;
      .active-content {
        margin-top: 36px;
        .desc {
          margin-top: 8px;
        }
        .content-panel {
          margin-top: 30px;
          height: 295px;
          background: url("../../../assets/active/dotati11/first_deposit_content.png") no-repeat;
          background-size: 100% 100%;
        }
        .dotati11-public-btn {
          display: block;
          margin: 20px auto 0;
        }
      }

      .active-rule {
        margin-top: 60px;
        .content {
          margin: 20px auto 0;

          .content-panel {
            height: 440px;
            background: url("../../../assets/active/dotati11/first_deposit_rule.png") no-repeat;
            background-size: 100% 100%;
          }
        }
      }
    }

    // 活动二
    .with-three {
      overflow: hidden;
      .match {
        width: @center-width;
        height: 300px;
        margin: 34px auto 0;
        display: flex;
        justify-content: right;
        background: url("../../../assets/active/dotati11/with_three_match.png") no-repeat;
        background-size: 100% 100%;
        &.empty {
          background: url("../../../assets/active/dotati11/with_three_match_empty.png") no-repeat;
          background-size: 100% 100%;
        }
        .match-game {
          width: 443px;
          .match-title {
            font-size: 16px;
            font-style: normal;
            line-height: 40px;
            letter-spacing: 1.2px;
            text-align: center;
            color: #121c29;
          }
          ul {
            margin: 42px 40px 0;
            display: flex;
            justify-content: space-between;
            .left, .right {
              background-image: @icon;
              background-position: -1259px -394px;
              width: 90px;
              height: 89px;
              text-align: center;
              line-height: 89px;
              img {
                width: 80%;
              }
              p {
                margin-top: 18px;
                font-size: 16px;
                line-height: 16px;
                letter-spacing: 1.2px;
                text-align: center;
                color: #fff;
              }
            }
            .match-date {
              margin-top: 10px;
              font-size: 16px;
              line-height: 22px;
              letter-spacing: 1.2px;
              text-align: center;
              color: #fff;
              span {
                display: block;
                font-weight: bold;
              }
              i {
                display: block;
                margin-top: 6px;
                font-size: 17.5px;
                font-weight: bold;
                font-style: italic;
                letter-spacing: 1.31px;
                text-align: center;
                color: @font-color;
              }
            }
            .end {
              font-size: 17.5px;
              font-weight: bold;
              line-height: 89px;
              font-style: italic;
              letter-spacing: 1.31px;
              text-align: center;
              color: #717171;
            }
          }
          .deposit-date {
            margin-top: 55px;
            p {
              font-size: 14px;
              line-height: 24px;
              text-align: center;
              color: @font-color;
            }
          }
          .apply-btn {
            display: block;
            margin: 35px auto 0;
          }
        }
      }

      .active-content {
        margin-top: 65px;
        .desc {
          margin-top: 15px;
        }
        .content-panel {
          margin-top: 30px;
          height: 332px;
          background: url("../../../assets/active/dotati11/with_three_content.png") no-repeat;
          background-size: 100% 100%;
          td {
            width: calc(100% / 6);
          }
        }
      }

      .active-rule {
        margin-top: 65px;
        .content {
          margin: 15px auto 0;

          .content-panel {
            height: 608px;
            background: url("../../../assets/active/dotati11/with_three_rule.png") no-repeat;
            background-size: 100% 100%;
          }
        }
      }
    }

    // 活动三
    .roll-prize {
      overflow: hidden;
      .active-content {
        margin-top: 30px;
        .title {
          height: 100px;
          background-position: -29px -153px;
          p {
            line-height: 46px;
          }
        }
        .desc {
          margin-top: 10px;
        }
        .roll-wrapper {
          margin-top: 25px;
          display: flex;
          height: 430px;
          background: url("../../../assets/active/dotati11/roll_prize_content.png") no-repeat;
          background-size: 100% 100%;
          .left {
            width: 520px;
            text-align: center;
            overflow: hidden;
            .ornaments-title {
              margin-top: 50px;
              font-size: 18px;
              line-height: 18px;
              letter-spacing: 1.35px;
              color: #ffe6a5;
            }
            .swiper-ornaments {
              width: 302px;
              height: 172px;
              margin: 12px auto 0;
              .swiper-container {
                width: inherit;
                height: inherit;
                .swiper-slide {
                  background-position: center top;
                  background-size: auto 100%;
                }
              }
              .ti11-swiper-pagination {
                margin-top: 7px;
                /deep/ .swiper-pagination-bullet {
                  background: @font-color;
                  opacity: 0.5;
                  margin: 0 5px;
                  &.swiper-pagination-bullet-active {
                    opacity: 1;
                  }
                }
              }
            }
            .to-room {
              margin-top: 30px;
              display: inline-block;
            }
            .total-flow {
              color: @font-color;
              font-size: 14px;
              span {
                font-weight: bold;
              }
            }
          }
          .right {
            margin-top: 35px;
            .room-item {
              margin-top: 44px;
              font-size: 14px;
              line-height: 14px;
              color: #fff;
              span {
                color: @font-color;
                font-weight: bold;
              }
              &.large {
                line-height: 24px;
                span {
                  font-size: 24px;
                  vertical-align: bottom;
                  text-shadow: 0 0 10px #c53024;
                }
              }
              &.flex {
                display: flex;
                ul {
                  width: 346px;
                  display: flex;
                  justify-content: space-between;
                  li {
                    width: 64px;
                    height: 85px;
                    background-color: rgba(255,255,255,0.2);
                    position: relative;
                    &:before {
                      position: absolute;
                      top: 42px;
                      left: 0;
                      content: "";
                      width: 100%;
                      height: 1px;
                      background: #121117;
                    }
                    &.colon {
                      &:after {
                        z-index: 1;
                        top: 0;
                        right: -30px;
                        position: absolute;
                        width: 30px;
                        line-height: 78px;
                        content: ':';
                        font-size: 44px;
                        text-align: center;
                        color: @font-color;
                      }
                    }
                    .time-box {
                      z-index: 2;
                      position: relative;
                      font-size: 32px;
                      font-weight: bold;
                      line-height: 85px;
                      letter-spacing: 2.4px;
                      text-align: center;
                      color: @font-color;
                    }
                    small {
                      margin-top: 10px;
                      display: block;
                      color: @font-color;
                      font-size: 14px;
                      text-align: center;
                    }
                  }
                }
              }
            }
          }
        }
      }

      .active-rule {
        margin-top: 65px;
        .content {
          margin: 15px auto 0;

          .content-panel {
            height: 241px;
            background: url("../../../assets/active/dotati11/roll_prize_rule.png") no-repeat;
            background-size: 100% 100%;
          }
        }
      }
    }
  }


  .back-active {
    padding: 41px 0 42px;
    text-align: center;
    .dotati11-public-btn {
      display: inline-block;
      width: 238px;
      height: 78px;
      background-position: -740px -385px;
      line-height: 78px;
      font-weight: normal;

      &:hover {
        background-position: -996px -385px;
      }
    }
  }
}
</style>
<style lang="less">
// 公共按钮1
.dotati11-public-btn {
  width: 194px;
  height: 79px;
  outline: 0;
  border: 0;
  cursor: pointer;
  background-color: transparent;
  background-image: url("../../../assets/active/dotati11/icon.png");
  background-position: -66px -385px;
  font-size: 24px;
  font-weight: bold;
  line-height: 79px;
  color: #ffda9e;
  transition: color 0.3s;
  &:hover {
    color: #cc2d2b;
    background-position: -276px -385px;
  }
  &.disabled {
    cursor: no-drop;
    color: #c2c2c2;
    background-position: -490px -385px;
  }
}

// 彩金dialog
.dotati11-bonus-dialog {
  background: transparent;
  .el-dialog__header {
    height: 115px;
    line-height: 132px;
    background: url("../../../assets/active/dotati11/icon.png") no-repeat;
    background-position: -1262px -242px;
    text-align: center;
    .el-dialog__title {
      line-height: 32px;
      font-weight: bold;
      font-size: 32px;
      color: #ffda9e;
      text-shadow: 0 0 10px #c53024;
    }
    .el-dialog__close {
      width: inherit;
      height: inherit;
      background: url("../../../assets/active/dotati11/icon.png") no-repeat;
      background-position: -865px -498px;
      &:hover {
        background-position: -923px -498px;
      }
    }
  }
  .el-dialog__body {
    padding: 0;
    height: 636px;
    background: url("../../../assets/active/dotati11/bonus_dialog_bg.png") no-repeat;


    .dialog-main {
      overflow: hidden;
      margin: 0 50px;
      .select-item {
        margin-top: 52px;
        h4 {
          font-size: 18px;
          font-weight: normal;
          line-height: 18px;
          color: #fff;
          .bonus {
            color: #ffda9e;
            font-weight: bold;
          }
        }
        .wallet-wrapper {
          margin-top: 30px;
          display: flex;
          li {
            width: 180px;
            height: 60px;
            margin-right: 25px;
            background: url("../../../assets/active/dotati11/icon.png") no-repeat;
            background-position: -282px -501px;
            font-size: 14px;
            line-height: 60px;
            text-align: center;
            color: #ffda9e;
            cursor: pointer;
            &:nth-child(3n + 3) {
              margin-right: 0;
            }
            &.active {
              background-position: -72px -501px;
              font-size: 18px;
              font-weight: bold;
              color: #be1d2c;
            }
          }
        }

        .money-wrapper {
          margin-top: 30px;
          display: flex;
          li {
            width: 82px;
            height: 60px;
            margin-right: 20px;
            background: url("../../../assets/active/dotati11/icon.png") no-repeat;
            background-position: -620px -501px;
            font-size: 14px;
            line-height: 60px;
            text-align: center;
            color: #ffda9e;
            cursor: pointer;

            &:nth-child(6n + 6) {
              margin-right: 0;
            }

            &.active {
              background-position: -500px -501px;
              font-size: 18px;
              font-weight: bold;
              color: #be1d2c;
            }
            &.disabled {
              cursor: no-drop;
              background-position: -748px -501px;
              color: #c2c2c2;
            }
          }
        }

      }

      .footer-info {
        margin-top: 60px;
        .deposit-money {
          font-size: 18px;
          line-height: 18px;
          text-align: center;
          color: #ffffff;
          span {
            color: #ffda9e;
          }
        }
        .dotati11-public-btn {
          display: block;
          margin: 10px auto;
        }
      }
    }
  }
}
</style>
