<template>
  <div class="MillionBonus-page">
    <div class="block block-mptp" :class="{ 'block-mptp-line': teams.length <= 8 }"
      :style="isExpand && incHeight > 0 && { height: `${incHeight + 423}px` }">
      <div class="border" :style="isExpand && incHeight > 0 && { height: `${incHeight - 127}px` }"></div>
      <div class="display">
        <div class="title-wrapper">
          <div class="title title-mptp">点击您喜欢的战队LOGO进行竞猜，票数越高，竞猜成功之后，彩金越高哦！</div>
          <div class="right-wrapper">
            <div class="desc theme bold">我的选票数量:<span style="color:#fff">{{ myVotes }}</span></div>
            <div class="ri-coner-btn" @click="toExchange">兑换选票</div>
          </div>
        </div>
        <div class="team-wrapper" :style="isExpand && incHeight > 0 && { height: `${incHeight + 277}px` }">
          <div :class="{ 'team-card-fail': card.disuse == 1 }" class="team-card" v-for="(card, i) in teams"
            :key="i + card.team_id">
            <div class="bg"></div>
            <div class="rect"></div>
            <div class="display">
              <div class="team-logo-wrapper" v-lazy-container="lazyMatchAvatar">
                <img :data-src="card.team_image" alt="">
              </div>
              <div class="team-name">{{ card.team_name }}</div>
              <template v-if="card.disuse == 1">
                <div class="disuse">已淘汰</div>
              </template>
              <template v-else>
                <div @click="beatCall(card)" :class="{ 'bet-isCalled': card.call > 0 }" class="bet-area theme call-btn">
                  打CALL<span v-if="card.call > 0" class="num" :class="`num-${card.call}`"></span></div>
                <div class="bet-area theme vote-btn" @click="toVote(card)">投票</div>
              </template>
            </div>
          </div>
          <Loading v-if="s12teamLoading" class="list-loading" :color="'#bf9854'" />
        </div>
        <div v-if="teams.length > 8" class="up-down" @click="switchGlist">
          <div class="text">{{ isExpand ? '收起' : '查看更多'}}</div>
          <div class="icon" :class="{ 'icon-rate': isExpand }"></div>
        </div>
      </div>
    </div>
    <!-- 我的竞猜 -->
    <div class="block block-wdjc" :class="{ 'block-wdjc-nodata': myWinnings <= 0 }">
      <div class="border"></div>
      <div class="display">
        <div class="title-wrapper">
          <div class="title title-wdjc">我的竞猜</div>
          <div class="right-wrapper">
          </div>
        </div>
        <div class="table">
          <div class="table-head">
            <span class="table-title guess-title">我的竞猜</span>
            <div class="d-flex align-center">
              <date-picker placeholder="开始时间" class="time-box start_time" type="date" :clearable="false"
                :value="chooseStartDay" @on-change="setDay($event, 'start')" format="yyyy-MM-dd"></date-picker>
              <span class="zhi">至</span>
              <date-picker placeholder="结束时间" class="time-box end_time" type="date" :clearable="false"
                :value="chooseEndDay" @on-change="setDay($event, 'end')" format="yyyy-MM-dd">
              </date-picker>
              <Select v-model="currentRank" class="ri-coner-btn">
                <Option v-for="item in rankArr" :value="item.type" :key="item.id">{{ item.name }}
                </Option>
              </Select>
            </div>
          </div>
          <div class="table-body">
            <div v-if="!ajaxLoading&&myGuess.length" class="guess-content">
              <table width="100%" border="0" align="center" cellspacing="0">
                <thead>
                  <tr>
                    <th>战队名称</th>
                    <th>预言名次</th>
                    <th>投票数</th>
                    <th>投票时间</th>
                    <th>竞猜结果</th>
                    <th>彩金</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, i) in myGuess" :key="i" v-lazy-container="lazyMatchAvatar">
                    <td><img class="team-sm-logo" width="30" height="30" :data-src="item.team_image" alt="">
                      <span style="line-height:30px">{{ item.team_name }}</span>
                    </td>
                    <td>{{ typeToText(item.type) }}</td>
                    <td>{{ item.num }}</td>
                    <td>{{ item.create_time }}</td>
                    <td>{{ statusToText(item.status) }}</td>
                    <td>{{ amountTo(item) }}元</td>
                  </tr>
                  <template v-if="myGuess.length && myGuess.length < 5">
                    <tr v-for="i in (5 - myGuess.length)" :key="i">
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </template>
                </tbody>
              </table>
              <div class="pagi">
                <Page v-if="myGuess.length" :total="page.total" :page-size="page.pagesize"
                  :current.sync="page.currentpage">
                </Page>
              </div>
            </div>
            <template v-if="!ajaxLoading && (!myGuess.length)">
              <div class="no-data-wrapper d-flex flex-column align-center">
                <img class="no-data-logo" width="134" height="136" src="~@/assets/active/lols12/new/no-data-logo.png"
                  alt="">
                <div class="no-data-text">暂无数据!</div>
              </div>
            </template>
            <Loading v-if="ajaxLoading" class="list-loading" :color="'#bf9854'" />
          </div>
        </div>
        <div v-if="myWinnings > 0" class="table-desc theme">
          我的彩金总额：<span>{{ toThousands(myWinnings) }}元</span>
        </div>
        <div v-if="myWinnings > 0" :class="{ 'not-allow': forbiGetBonus }" class="confirm-btn" @click="getBonus">
          领取
        </div>
      </div>
    </div>
    <!-- 会员竞猜 -->
    <div class="block block-hyjc">
      <div class="display">
        <div class="title-wrapper">
          <div class="title title-hyjc">会员竞猜排行榜</div>
          <div class="right-wrapper">
          </div>
        </div>
        <div class="d-flex align-center justify-center">
          <div class="table bq-table">
            <div class="table-head">
              <span class="table-title bq-title">八强</span>
            </div>
            <div class="table-body">
              <table v-if="BQPhb.length" width="100%" border="0" align="center" cellspacing="0">
                <thead>
                  <tr>
                    <th>排名</th>
                    <th>队伍名称</th>
                    <th>选票数量</th>
                    <th>打call数量</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, i) in BQPhb.slice(0, 5)" :key="item.team_name + i">
                    <td>
                      <span class="num-icon num-gj" v-if="i == 0"></span>
                      <span class="num-icon num-yj" v-else-if="i == 1"></span>
                      <span class="num-icon num-jj" v-else-if="i == 2"></span>
                      <span v-else>{{ i + 1 }}</span>
                    </td>
                    <td>{{ item.team_name }}</td>
                    <td>{{ item.num }}</td>
                    <td>{{ item.call }}</td>
                  </tr>
                  <template v-if="BQPhb.length && BQPhb.length < 5">
                    <tr v-for="i in (5 - BQPhb.length)" :key="i">
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </template>
                  <!-- <div v-if="!BQPhb.length" class="no-cont theme">暂无数据</div> -->
                </tbody>
              </table>
              <template v-if="!BQPhb.length">
                <div class="no-data-wrapper d-flex flex-column align-center">
                  <img class="no-data-logo" width="134" height="136" src="~@/assets/active/lols12/new/no-data-logo.png"
                    alt="">
                  <div class="no-data-text">暂无数据!</div>
                </div>
              </template>
            </div>
          </div>
          <div class="table sq-table">
            <div class="table-head">
              <span class="table-title sq-title">四强</span>
            </div>
            <div class="table-body">
              <table v-if="SQPhb.length" width="100%" border="0" align="center" cellspacing="0">
                <thead>
                  <tr>
                    <th>排名</th>
                    <th>队伍名称</th>
                    <th>选票数量</th>
                    <th>打call数量</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, i) in SQPhb.slice(0, 5)" :key="item.team_name + i">
                    <td>
                      <span class="num-icon num-gj" v-if="i == 0"></span>
                      <span class="num-icon num-yj" v-else-if="i == 1"></span>
                      <span class="num-icon num-jj" v-else-if="i == 2"></span>
                      <span v-else>{{ i + 1 }}</span>
                    </td>
                    <td>{{ item.team_name }}</td>
                    <td>{{ item.num }}</td>
                    <td>{{ item.call }}</td>
                  </tr>
                  <template v-if="SQPhb.length && SQPhb.length < 5">
                    <tr v-for="i in (5 - SQPhb.length)" :key="i">
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </template>
                  <!-- <div v-if="!SQPhb.length" class="no-cont theme">暂无数据</div> -->
                </tbody>
              </table>
              <template v-if="!SQPhb.length">
                <div class="no-data-wrapper d-flex flex-column align-center">
                  <img class="no-data-logo" width="134" height="136" src="~@/assets/active/lols12/new/no-data-logo.png"
                    alt="">
                  <div class="no-data-text">暂无数据!</div>
                </div>
              </template>
            </div>
          </div>
          <div class="table gj-table">
            <div class="table-head">
              <span class="table-title gj-title">冠军</span>
            </div>
            <div class="table-body">
              <table v-if="GJPhb.length" width="100%" border="0" align="center" cellspacing="0">
                <thead>
                  <tr>
                    <th>排名</th>
                    <th>队伍名称</th>
                    <th>选票数量</th>
                    <th>打call数量</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, i) in GJPhb.slice(0, 5)" :key="item.team_name + i">
                    <td>
                      <span class="num-icon num-gj" v-if="i == 0"></span>
                      <span class="num-icon num-yj" v-else-if="i == 1"></span>
                      <span class="num-icon num-jj" v-else-if="i == 2"></span>
                      <span v-else>{{ i + 1 }}</span>
                    </td>
                    <td>{{ item.team_name }}</td>
                    <td>{{ item.num }}</td>
                    <td>{{ item.call }}</td>
                  </tr>
                  <template v-if="GJPhb.length && GJPhb.length < 5">
                    <tr v-for="i in (5 - GJPhb.length)" :key="i">
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </template>
                  <!-- <div v-if="!GJPhb.length" class="no-cont theme">暂无数据</div> -->
                </tbody>
              </table>
              <template v-if="!GJPhb.length">
                <div class="no-data-wrapper d-flex flex-column align-center">
                  <img class="no-data-logo" width="134" height="136" src="~@/assets/active/lols12/new/no-data-logo.png"
                    alt="">
                  <div class="no-data-text">暂无数据!</div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 活动规则 -->
    <div class="block block-gz">
      <div class="display">
        <div class="title-wrapper">
          <div class="title title-gz">活动规则</div>
          <div class="right-wrapper">
          </div>
        </div>
        <div class="gz-content">
          <ol>
            <li>全平台等级≥VIP1的会员均可参与此活动，每位会员可以免费获得一张选票。
            </li>

            <li>所有彩金只需全站1倍流水即可提款，派奖之后可以在我的竞猜页面领取奖金，领取之后奖金将会自动派发至会员的主钱包中。当用户对应的钱包余额＜最低投注额且无未结算注单时，系统将自动判定已完成活动规定的有效流水。
            </li>

            <li>领取彩金截止时间为：2022年11月8日23:59:59，会员需在指定时间之前领取彩金，逾期则视为自动放弃。</li>

            <li>有效流水仅计算产生输赢结果的注单，电竞赔率＜1.5、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水。
            </li>

            <li> 每位有效玩家、每个手机号码、电子邮箱、IP地址、每张银行卡、每台设备只能享受一次优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利；VKGAME对本活动保有最终解释权。
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '@/components/common/Loading.vue'
import { toThousands, formatDate } from '../../../../utils/util'
import { mapState } from 'vuex'
export default {
  name: 'MillionBonus',
  props: {
    teams: {
      type: Array,
      default: () => []
    },
    s12teamLoading: Boolean,
    myVotes: {
      type: Number,
      default: 0
    },
    voteRanking: {
      type: Array,
      default: () => []
    },
    // 八强,四强,冠军
    BQPhb: {
      type: Array,
      default: () => []
    },
    SQPhb: {
      type: Array,
      default: () => []
    },
    GJPhb: {
      type: Array,
      default: () => []
    },
    myWinnings: {
      type: [Number, String],
      default: 0
    },
    voteTime: {
      type: [Object],
      default: () => { }
    },
    bonusStatus: {
      type: [Number, String],
      default: 0
    },
    isS12Begin: {
      type: [String, Boolean],
      default: ''
    }
  },
  components: {
    Loading
  },
  data() {
    return {
      getBonusLoading: false,
      ajaxLoading: false,
      currentRank: 0,
      isCalled: false,
      isExpand: true,
      myGuess: [],
      chooseStartDay: '',
      chooseEndDay: '',
      page: {
        total: 0, // 数据总数
        pagesize: 5, // 每页多少个数据
        currentpage: 1 // 当前页码
      },
    }
  },
  created() {
    this.init()
  },
  watch: {
    'page.currentpage': {
      handler(newVal, oldVal) {
        console.log('页码变化了', newVal)
        this.init()
      },
    },
    chooseStartDay: 'resetInit',
    chooseEndDay: 'resetInit',
    currentRank: 'resetInit'
  },
  computed: {
    ...mapState([
      "isLogin",
      "lazyMatchAvatar"
    ]),
    // 增加的高度
    incHeight() {
      return this.teams.length > 8 ? (Math.ceil(this.teams.length / 8) * 240) - 260 : 0
    },
    rankArr() {
      let arr = [
        { id: 'all', name: '全部', type: 0 }
      ]
      return arr.concat(this.voteRanking)
    },
    forbiGetBonus() {
      return this.myWinnings <= 0 || this.bonusStatus == 1
    }
  },
  methods: {
    toThousands(num) {
      return toThousands(num)
    },
    // 页码从1开始
    resetInit() {
      this.page.currentpage = 1
      this.page.total = 0
      this.myGuess = []
      this.init()
    },
    init() {
      this.ajaxLoading = true
      let oriParams = {
        type: this.rankArr[this.currentRank].type,
        start: this.chooseStartDay,
        end: this.chooseEndDay,
        page: this.page.currentpage,
        page_size: this.page.pagesize,
      }
      for (var props in oriParams) {
        if (oriParams[props] == 0 || oriParams[props] == '') {
          delete oriParams[props]
        }
      }
      console.log('我的竞猜请求参数', oriParams)
      this.$http(this.ApiSetting.active.lols12.myGuess, oriParams)
        .then(res => {
          this.ajaxLoading = false
          console.log('我的竞猜', res)
          if (res.status == 1 && res.data) {
            this.myGuess = res.data.list.data
            this.page.total = res.data.list.total
          }
        })
        .catch(err => {
          this.ajaxLoading = false
        })
    },
    setDay(time, flag) {
      console.log('选择了开始时间', typeof (time), flag)
      if (flag == 'start') {
        if (typeof (this.chooseStartDay) == 'object') {
          this.chooseStartDay = formatDate(this.chooseStartDay)
        }
        if (this.chooseStartDay == time) {
          return;
        }
        // 如果选择的开始时间大于结束时间，互换
        if (this.chooseEndDay.length) {
          if (new Date(time) > new Date(this.chooseEndDay)) {
            this.chooseStartDay = this.chooseEndDay
            this.chooseEndDay = time
            return;
          }
        }
        this.chooseStartDay = time
      } else if (flag == 'end') {
        if (typeof (this.chooseEndDay) == 'object') {
          this.chooseEndDay = formatDate(this.chooseEndDay)
        }
        if (this.chooseEndDay == time) {
          return;
        }
        if (this.chooseStartDay.length) {
          // 结束时间小于开始时间，互换
          if (new Date(time) < new Date(this.chooseStartDay)) {
            this.chooseEndDay = this.chooseStartDay
            this.chooseStartDay = time
            return;
          }
        }
        this.chooseEndDay = time
      }
      // this.resetAndQuery()
    },
    typeToText(num) {
      switch (num) {
        case 1:
          return '八强'
        case 2:
          return '四强'
        case 3:
          return '冠军'
        default:
          return
      }
    },
    statusToText(num) {
      switch (num) {
        case 0:
          return '未开奖'
        case 1:
          return '竞猜失败'
        case 2:
          return '竞猜成功'
        default:
          return
      }
    },
    amountTo(item) {
      if (item.status == 0) {
        return '- - '
      } else {
        return toThousands(item.amount)
      }
    },
    switchGlist() {
      this.isExpand = !this.isExpand
    },
    // 打call
    beatCall(team) {
      if (!this.isLogin) {
        this.$message({ message: "请您先登录！", type: 'warning' })
        return
      }
      if (this.isS12Begin == 'before') {
        this.$message({ message: "活动尚未开始！", type: 'warning' })
        return
      }
      if (this.isS12Begin == 'after') {
        this.$message({ message: "活动已过期！", type: 'warning' })
        return
      }
      const params = {
        team_id: team.team_id,
        team_name: team.team_name,
      }
      this.$http(this.ApiSetting.active.lols12.beatCall, params)
        .then(res => {
          console.log('打call', res)
          if (res.status == 1) {
            this.$message({ message: res.message, type: 'success' })
            this.$emit('upTeamVote', res.data.my_vote)
          }
        })
    },
    // 投票
    toVote(team) {
      if (!this.isLogin) {
        this.$message({ message: "请您先登录！", type: 'warning' })
        return
      }
      if (this.isS12Begin == 'before') {
        this.$message({ message: "活动尚未开始！", type: 'warning' })
        return
      }
      if (this.isS12Begin == 'after') {
        this.$message({ message: "活动已过期！", type: 'warning' })
        return
      }
      if (this.myVotes == 0) {
        this.$message({ message: "您当前的选票数量不足，请先获取选票!", type: 'warning' })
        this.$emit('toGetVote', 1)
        return
      }
      const keysArr = Object.keys(this.voteTime)
      if (!keysArr.length) {
        this.$message({ message: "对不起，您来晚了，已截止投票了！", type: 'warning' })
        return
      } else {
        const lastTime = this.voteTime[keysArr[keysArr.length - 1]]
        console.log('最后的时间', lastTime)
        if (new Date() >= new Date(lastTime)) {
          this.$message({ message: "对不起，您来晚了，已截止投票了！", type: 'warning' })
          return
        }
        this.$emit('voteTeam', team)
      }
    },
    // 兑换选票弹窗
    toExchange() {
      if (!this.isLogin) {
        this.$message({ message: "请您先登录！", type: 'warning' })
        return
      }
      if (this.isS12Begin == 'before') {
        this.$message({ message: "活动尚未开始！", type: 'warning' })
        return
      }
      if (this.isS12Begin == 'after') {
        this.$message({ message: "活动已过期！", type: 'warning' })
        return
      }
      this.$emit('toExchangeDio')
    },
    // 领取奖金
    getBonus() {
      if (this.forbiGetBonus) {
        return
      }
      if (!this.isLogin) {
        this.$message({ message: "请您先登录！", type: 'warning' })
        return
      }
      if (this.getBonusLoading) {
        return
      }
      this.getBonusLoading = true
      this.$http(this.ApiSetting.active.lols12.getBonus)
        .then(res => {
          this.getBonusLoading = false
          console.log('领取彩金', res)
          if (res.status == 1) {
            this.$emit('getBonus')
            this.$message({ message: res.message, type: 'success' })
          }
        })
        .catch(err => {
          this.getBonusLoading = false
        })
    }
  }
}
</script>

<style lang="less" scoped>
.MillionBonus-page {
  margin-top: 41px;

  .list-loading {
    position: absolute;
  }

  .team-wrapper {
    margin-top: 20px;
    width: 100%;
    height: 257px;
    padding: 20px 10px 0;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    transition: all 0.5s;
    overflow: hidden;

    .team-card {
      position: relative;
      margin-bottom: 20px;
      margin-right: 20px;
      width: 130px;
      height: 220px;
      box-sizing: border-box;
      padding: 10px 5px 12px;
      text-align: center;
      border: solid 1px rgba(255, 235, 180, 0.2);
      transition: all .5s;
      will-change: scale;

      &:nth-child(8n) {
        margin-right: 0;
      }

      .team-name {
        font-size: 18px;
        font-weight: bold;
        color: #fff;
        line-height: 1;
        margin-top: 2px;
        margin-bottom: 5px;
      }

      .team-logo-wrapper {
        width: 120px;
        height: 118px;
        background: url('~@/assets/active/lols12/new/sprite.png');
        background-position: -1581px -14px;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          width: 70px;
          height: 70px;
        }
      }

      .bet-area {
        cursor: pointer;
        user-select: none;
        position: relative;
        margin: auto;
        width: 112px;
        height: 28px;
        line-height: 24px;
        font-size: 16px;
        text-align: center;
        box-sizing: border-box;
        border: solid 2px #258dff;
        margin-top: 3px;
        display: flex;
        align-items: center;
        justify-content: center;

        &:last-child {
          margin-top: 5px;
        }

        .num {
          display: inline-block;
          margin-left: 2px;
          width: 35px;
          height: 18px;
          background: url('~@/assets/active/lols12/new/sprite.png');
        }

        .num-1 {
          background-position: -594px -596px;
        }

        .num-2 {
          background-position: -630px -596px;
        }

        .num-3 {
          background-position: -665px -596px;
        }
      }

      .bet-isCalled {
        color: #fff;
        background-color: #258dff;
      }

      &::before {
        content: '';
        position: absolute;
        top: -5px;
        left: -5px;
        width: 13px;
        height: 13px;
        background: url('~@/assets/active/lols12/new/border-corner.png') no-repeat center center;
        background-size: 100% 100%;
      }

      &::after {
        content: '';
        position: absolute;
        bottom: -5px;
        right: -5px;
        width: 13px;
        height: 13px;
        background: url('~@/assets/active/lols12/new/border-corner.png') no-repeat center center;
        background-size: 100% 100%;
        transform: rotate(180deg);
      }

      .bg {
        pointer-events: none;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: 0.13;
        background-image: linear-gradient(to bottom, #5ea2e6, #1841b6);
      }

      .rect {
        pointer-events: none;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;

        &::before {
          content: '';
          position: absolute;
          top: -5px;
          right: -5px;
          width: 13px;
          height: 13px;
          background: url('~@/assets/active/lols12/new/border-corner.png') no-repeat center center;
          background-size: 100% 100%;
          transform: rotate(90deg);
        }

        &::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: -5px;
          width: 13px;
          height: 13px;
          background: url('~@/assets/active/lols12/new/border-corner.png') no-repeat center center;
          background-size: 100% 100%;
          transform: rotate(-90deg);
        }
      }

      &:hover {
        transform: scale(1.1);
      }

      &.team-card-active,
      &:hover {
        cursor: pointer;
        border: solid 1px #5ea2e6;

        .team-logo-wrapper {
          background: url('~@/assets/active/lols12/new/sprite.png');
          background-position: -1427px -14px;
        }

        .team-name {
          color: #fff;
        }

        .bg {
          opacity: 1;
          background-image: linear-gradient(to bottom, #5ea2e6, #1841b6);
        }

        .bet-area {
          border: solid 2px #fff;

          .num-1 {
              background-position: -594px -662px;
          }

          .num-2 {
            background-position: -630px -662px;
          }

          .num-3 {
            background-position: -665px -662px;
          }
        }

        .vote-btn,
        .call-btn {
          color: #fff;
          &.bet-isCalled {
            color: #000;
          }

          &:hover {
            background-color: #fff;
            background-image: none;
            color: #258dff;

            .num-1 {
              background-position: -594px -630px; 
            }

            .num-2 {
              background-position: -630px -630px;
            }

            .num-3 {
              background-position: -665px -630px;
            }

            &::before {
              content: '';
              width: 108px;
              height: 24px;
              box-sizing: border-box;
              border: solid 1px #258dff;
              pointer-events: none;
              position: absolute;
              left: 0;
              top: 0;
            }
          }
        }
      }

      &.team-card-fail {
        cursor: initial;
        border-color: #a3a3a3;

        .team-name {
          color: #a3a3a3;
        }

        .bg {
          opacity: 1;
          background-image: linear-gradient(to top, #1e1e1e, #4b4b4b);
        }

        .team-logo-wrapper {
          background-position: -1274px -14px;
          // opacity: .7;
        }

        .disuse {
          font-size: 16px;
          color: #a3a3a3;
          margin-top: 20px;
        }

        &::before {
          content: '';
          background: url('~@/assets/active/lols12/border-corner-gray.png') no-repeat center center;
          background-size: 100% 100%;
        }

        &::after {
          content: '';
          background: url('~@/assets/active/lols12/border-corner-gray.png') no-repeat center center;
          background-size: 100% 100%;
        }

        .rect {
          &::before {
            content: '';
            background: url('~@/assets/active/lols12/border-corner-gray.png') no-repeat center center;
            background-size: 100% 100%;
          }

          &::after {
            content: '';
            background: url('~@/assets/active/lols12/border-corner-gray.png') no-repeat center center;
            background-size: 100% 100%;
          }
        }
      }

    }
  }

  .team-sm-logo {
    display: inline-block;
  }

  .block-mptp {
    height: 423px;

    &.block-mptp-line {
      height: 364px;
    }

    .title-mptp {
      font-size: 24px !important;
      white-space: nowrap;

      &::after {
        content: none !important;
      }
    }

    .right-wrapper {

      .desc {
        white-space: nowrap;
        font-size: 16px;
        margin-right: 20px;
        margin-bottom: 4px;
      }
    }
  }

  .block-wdjc {
    height: 586px;
    text-align: center;
    &.block-wdjc-nodata {
      height: 490px;
    }

    .title-wdjc {
      background-position: -10px -1125px !important;
    }

    .border {
      height: 36px;
    }


    table {

      tr {
        &:last-child {
          td {
            border-bottom: none;
          }
        }
      }

      th {
        width: 196px;

        &:nth-child(2n) {
          background-color: rgba(37, 141, 255, 0.05);
        }
      }

      td {
        width: 196px;
        line-height: 40px;

        &:nth-child(2n) {
          background-color: rgba(37, 141, 255, 0.05);
        }
      }
    }
  }

  .block-hyjc {
    height: 481px;

    table {
      tr {
        &:last-child {
          td {
            border-bottom: none;
          }
        }
      }

      th {
        border-top: #000 1px solid;
        height: 42px;

        &:nth-child(2n + 1) {
          background-color: rgba(37, 141, 255, 0.05);
        }
      }

      td {
        height: 48px;

        &:nth-child(2n + 1) {
          background-color: rgba(37, 141, 255, 0.05);
        }
      }
    }

    .table {
      width: 380px;

      &.sq-table {
        margin-left: 20px;
        margin-right: 20px;
      }
    }
  }

  .block-gz {
    height: 397px;

    .title-gz {
      background-position: -10px -815px !important;
    }
  }

  .confirm-btn {
    margin: auto;
    user-select: none;
    cursor: pointer;
    background: url('~@/assets/active/lols12/new/sprite.png');
    background-position: -225px -477px;
    color: #eec494;
    width: 152px;
    height: 50px;
    line-height: 46px;
    text-align: center;
    font-weight: bold;
    font-size: 20px;

    &:hover {
      background: url('~@/assets/active/lols12/new/sprite.png');
      background-position: -225px -536px;
      color: #fff;
    }

    &.not-allow {
      cursor: not-allowed;
      background-position: -387px -536px;
      color: #fff;
    }
  }

  .table {
    margin: auto;
    margin-top: 40px;
    margin-bottom: 20px;
    width: 1178px;
    box-sizing: border-box;

    .table-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-align: left;
      width: 100%;
      height: 60px;
      line-height: 56px;
      padding: 0 22px;
      box-sizing: border-box;
      border-style: solid;
      border-width: 2px;
      border-image-source: linear-gradient(to right, #756049, #d6b598, #756049);
      border-image-slice: 1;
      background-color: #3b3b3b;
      color: #fff;
    }

    .table-body {
      box-sizing: border-box;
      border-style: solid;
      border-width: 2px;
      border-image-source: linear-gradient(to right, #756049, #d6b598, #756049);
      border-image-slice: 1;
      border-top: none;
      background-color: #0a0a0c;
      min-height: 284.5px;
      position: relative;

      .no-cont {
        top: calc(50% + 20px);
      }

      .pagi {
        position: absolute;
        right: 20px;
        bottom: 0;
        height: 42px;
        line-height: 40px;
        text-align: right;

        /deep/.ivu-page {
          padding: 0;
          transform: scale(0.9);
          transform-origin: right;

          .ivu-page-item {
            &:hover {
              a {
                color: #d6b598;
              }
            }
          }

          .ivu-page-item-active {
            color: #d6b598;
            border-color: #d6b598;

            a {
              color: #d6b598;
            }
          }
        }
      }
    }
  }

  .table-desc {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 20px;

    span {
      font-size: 18px;
      color: #fff;
    }
  }

  .table-title {
    display: inline-block;
    font-size: 24px;
    font-weight: bold;
    color: #fff;
  }

  table {
    box-sizing: border-box;
    text-align: center;

    th {
      border-bottom: #000 1px solid;
      height: 40px;
      box-sizing: border-box;
      color: #fff;
      font-weight: bold;
      font-size: 14px;
      width: 25%;
    }

    td {
      border-bottom: #000 1px solid;
      box-sizing: border-box;
      height: 40px;
      font-size: 14px;
      font-weight: bold;
      color: #d6b598;
      width: 25%;
    }
  }
}
</style>