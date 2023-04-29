<template>
  <div class="lols12-page">
    <div class="kv-video-ct">
      <video muted autoplay loop preload="auto" class="kv-bg-video">
        <source src="~@/assets/active/lols12/iYGQagazV4.mp4" type="video/mp4">
      </video>
    </div>
    <div class="slogan" ref="slogan">
      <img src="~@/assets/active/lols12/slogan-new.png" alt="">
    </div>
    <div class="award-pool" ref="awardpool">
      <img src="~@/assets/active/lols12/count-bg.png" class="ap-bg" alt="" />
      <div class="num currency"></div>
      <div class="num" :class="[{ 'colon': item == ',', 'dot': item == '.' }, `num${item}`]" v-for="(item, i) in numArr"
        :key="i"></div>
    </div>
    <div class="game-time" ref="gametime" :data-text="initData.active_show_time">{{  initData.active_show_time  }}</div>
    <div class="nav-wrapper">
      <div @click="changeNav(i)" :class="{ 'nav-active': activeNav == i }" class="nav" v-for="(item, i) in navMenu"
        :key="i">
        <div class="nav-label" :class="`nav-label-${item.key}`">{{item.label}}</div>
      </div>
    </div>
    <!-- 百万奖金 -->
    <million-bonus :s12teamLoading="s12teamLoading" :isS12Begin="isS12Begin" ref="millionBonus" @getBonus="getBonus" @upTeamVote="upTeamVote"
      @toGetVote="changeNav" @toExchangeDio="toExchangeDio" @voteTeam="voteTeam" :myWinnings="initData.my_bonus"
      :BQPhb="BQPhb" :SQPhb="SQPhb" :GJPhb="GJPhb" :voteRanking="voteRanking" :myVotes="initData.my_vote"
      :bonusStatus="initData.status" :voteTime="initData.vote_time" :teams="Teams"
      v-show="activeNav == 0" />
    <!-- 获取选票 -->
    <get-votes ref="getVotes" :isS12Begin="isS12Begin" :virtualExchange="initData.virtual_exchange"
      :depositExdTimes="initData.deposit_vote_times" :depositExAmount="initData.my_deposit"
      :waterExdTimes="initData.bet_vote_times" :waterExAmount="initData.my_bet" @exchangeVote="exchangeVote"
      @toCallPage="activeNav = 0" v-show="activeNav == 1" />
    <!-- 赛事进程 -->
    <game-progress :matchId="initData.match_id" :matchDay="initData.match_day"  ref="gamepro" v-show="activeNav == 2" />
    <!-- 赛事数据 -->
    <game-data ref="gameData" :s12team="Teams" :isS12GameBegin="isS12GameBegin" @toBetPage="activeNav = 0"
      :gamematch="gameMatch" v-show="activeNav == 3" />
    <!-- 回到首页 -->
    <div class="back-btn" @click="$router.push('/active')">回到活动首页</div>
    <!-- 弹窗 -->
    <el-dialog :lock-scroll="true" :append-to-body="true" custom-class="lols12-Dialog" width="764px" top="20vh"
      :visible.sync="isShowDio">
      <div v-if="isShowDioClose" class="close" @click="closeDio"></div>
      <div class="lols12-Dialog-wrapper" :class="`${dioClassName}-wrapper`">
        <div class="border"></div>
        <div class="display">
          <template v-if="dioClassName == 'sendFreeVote'">
            <div class="freeVote-title">恭喜您免费获得1张S12竞猜选票！</div>
            <img width="546" height="400" class="gift-img" src="~@/assets/active/lols12/call.png" alt="">
          </template>
          <template v-else>
            <div class="table">
              <div class="table-head">
                <span class="table-title" v-if="dioClassName == 'exchange'">选票兑换</span>
                <span class="table-title" v-if="dioClassName == 'toVote'">我的投票</span>
              </div>
              <div class="table-body">
                <div :class="`${dioClassName}-content`">
                  <template v-if="dioClassName == 'toVote'">
                    <div class="team-card">
                      <div class="bg"></div>
                      <div class="rect"></div>
                      <div class="display">
                        <div class="team-logo-wrapper">
                          <img v-lazy="{
                            src: myChooseTeam.team_image,
                            error: lazyMatchAvatar.error,
                            loading: lazyMatchAvatar.loading
                          }" alt="">
                        </div>
                        <div class="team-name">{{  myChooseTeam.team_name || 'name'  }}</div>
                      </div>
                    </div>
                    <div class="team-vote">
                      <div class="d-flex align-center">
                        <span class="label">预言名次</span>
                        <div class="select-wrapper theme" v-for="(item, i) in voteRankingFilter" :key="i">
                          <input v-model="VRSelected" :id="item.id" name="radio" :value="item.id" type="radio">
                          <label :for="item.id" class="name d-flex align-center">
                            <span>{{  item.name  }}</span>
                          </label>
                        </div>
                      </div>
                      <div class="d-flex align-center" style="margin-top:29px">
                        <span class="label">投票数量</span>
                        <div class="select-wrapper theme">
                          <div class="vote-box" @click="minus">
                            <div class="minus"></div>
                          </div>
                          <label class="vote-num">
                            <span class="import">{{  deVoteNum  }}</span>票
                          </label>
                          <div class="vote-box vote-box-plus" @click="plus">
                            <div class="plus"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                  <template v-if="dioClassName == 'exchange'">
                    <table width="100%" border="0" align="center" cellspacing="0">
                      <thead>
                        <tr>
                          <th>获取方式</th>
                          <th>可兑换选票数量</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>电竞流水兑换</td>
                          <td>{{  $refs.getVotes.betQuickVoAmount ? $refs.getVotes.betQuickVoAmount : 0  }}</td>
                        </tr>
                        <tr>
                          <td>每日首充兑换</td>
                          <td>{{  $refs.getVotes.depoQuickVoAmount ? $refs.getVotes.depoQuickVoAmount : 0  }}</td>
                        </tr>
                        <tr>
                          <td>虚拟币首充任意金额</td>
                          <td>{{  initData.virtual_exchange  }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </template>
                </div>
              </div>
            </div>
          </template>
          <div class="table-desc theme" v-if="dioClassName == 'exchange'">
            可兑换选票总数：<span>{{  $refs.getVotes.betQuickVoAmount + $refs.getVotes.depoQuickVoAmount +
                        initData.virtual_exchange
            
            }}票</span>
          </div>
          <div class="table-desc theme" v-if="dioClassName == 'toVote'">
            我的选票数量：<span>{{  initData.my_vote  }}票</span>
          </div>
          <div
            :class="{ 'not-allow': dioClassName == 'exchange' && ($refs.getVotes.betQuickVoAmount + $refs.getVotes.depoQuickVoAmount + initData.virtual_exchange === 0) }"
            class="confirm-btn" @click="confirmDio">
            <template v-if="dioClassName == 'exchange'">
              一键兑换
            </template>
            <template v-else>
              确定
            </template>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import GameData from './GameData.vue'
import GameProgress from './GameProgress.vue'
import GetVotes from './GetVotes.vue'
import MillionBonus from './MillionBonus.vue'
import { formatNumberSplit } from '../../../../utils/util.js'

export default {
  name: 'lols12',
  components: {
    GameData,
    GameProgress,
    GetVotes,
    MillionBonus
  },
  data() {
    return {
      s12teamLoading: false,
      isRequstPool: true,
      ExVoteBtnLoading: false,
      isS12Begin: true, // S12活动是否上线，用于是否支持投票，打call, 兑换
      isS12GameBegin: false, // S12官方比赛是否开始
      numb: '1234567.89',
      Interval: null,
      activeNav: 0,
      navMenu: [
        { key: 'bonus', label: '百万奖金' },
        { key: 'vote', label: '获取选票' },
        { key: 'process', label: '赛事进程' },
        { key: 'data', label: '赛事数据' }
      ],
      // 下面四个调试使用，不要删除
      // depositExAmount: 1500, // 首充可兑换额度
      // depositExdTimes: 1, // 充值已兑换次数
      // waterExAmount: 10000, // 流水可兑换额度
      // waterExdTimes: 4, // 流水已兑换次数
      initData: {
        match_id: 1, // 用于赛事进程查询，当前是入围赛/小组赛/淘汰赛
        match_day: 1, // 用于赛事进程查询，当前是第几天
        s12_schedule: 1,
        active_name: '2022全球总决赛 不破/不立',
        active_show_time: '2022年 08月01日00:00:00-11月16日23:59:59',
        prize_pool: '', // 总奖池
        my_vote: 0, // 总选票
        my_bonus: 0, // 我的彩金
        system_vote: 0, // vip等于大于1以上的，系统自动赠送一张选票，弹窗一次
        my_bet: 0, //流水可兑换额度
        bet_vote_times: 0, // 流水已兑换次数
        my_deposit: 0, // 首充可兑换额度
        deposit_vote_times: 0, // 充值已兑换次数
        vote_time: {}, // key: 1--八强投票截止时间  2--四强投票截止时间  3--冠军投票截止时间
        status: 0, // 0 彩金可领取；1 彩金已领取
        virtual_exchange: 0, // 虚拟币首充任意金额是否可领取一张选票 1 可兑换  0 不能兑换
      },
      activeStartTime: '', // 活动开始时间,接口返回秒，已处理为毫秒
      activeEndTime: '', // 活动结束时间，接口返回秒，已处理为毫秒
      deVoteNum: 1, // 默认投票数量
      myChooseTeam: {}, // 我要投票的战队
      VRSelected: 'quarterfinals', // 我选中的名次
      voteRanking: [
        { id: 'quarterfinals', name: '八强', type: 1 },
        { id: 'fourfinals', name: '四强', type: 2 },
        { id: 'champion', name: '冠军', type: 3 },
      ], // 排名名次
      Teams: [], // 当前的赛季的所有战队
      gameMatch: [], // 四个夏季赛
      isShowDio: false,
      sendFreeVote: false, // 等级满足要求，系统自动送一张选票
      dioClassName: '', // 弹窗类名，复用一个弹窗，更改样式 
      BQPhb: [], // 八强排行榜
      SQPhb: [], // 四强排行榜
      GJPhb: [], // 冠军排行榜
    }
  },
  created() {
    this.init()
    this.getS12Team()
    const timer = setTimeout(() => {
      if (this.initData.system_vote == 1) {
        // 系统自动赠送了选票，但是只能弹一次
        this.dioClassName = "sendFreeVote"
        this.isShowDio = true
        clearTimeout(timer)
      }
    }, 5000)
    this.getBonusPool()
    clearInterval(this.Interval)
    this.Interval = setInterval(() => {
      this.getBonusPool()
    }, 6000)
  },
  mounted() {
    if (history.scrollRestoration) {
      history.scrollRestoration = 'manual';
    }
    var tl = new TimelineLite();
    tl.from(this.$refs.slogan, 0.5, {
      scale: 0,
      autoAlpha: 0
    })

    tl.from(this.$refs.awardpool, 0.5, {
      scale: 0,
      autoAlpha: 0
    });

    tl.from(this.$refs.gametime, 0.5, {
      scale: 0,
      autoAlpha: 0
    }, "-=0.5")

    // tl.from(this.$refs.betnow, 0.2, {
    //   scale: 0,
    //   autoAlpha: 0
    // }, "-=0.5")
  },
  watch: {
    activeNav(val, oldVal) {
      console.warn('tab切换了', val, oldVal)
      // 从其他tab切换到百万奖金，为了打call或投票，把页面滚动到合适的位置，否则看不见打call
      if (val == 0&&oldVal > 0) {
        this.$nextTick(() => {
          this.toScroll()
        })
      }
      if (val == 1) {
        this.$refs.getVotes.activedNM = 0
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // 从vb商城来的，直接进投票tab
      if (from.name == 'vbmarket') {
        vm.activeNav = 0
        clearTimeout(timer)
        const timer = setTimeout(() => {
          this.toScroll()
        }, 1200)
      }
    })
  },
  beforeDestroy() {
    clearInterval(this.Interval)
  },
  computed: {
    ...mapState([
      "lazyMatchAvatar",
      "isLogin"
    ]),
    numArr() {
      return formatNumberSplit(this.numb).split('')
    },
    isShowDioClose() {
      return this.dioClassName != 'sendFreeVote'
    },
    voteRankingFilter() {
      const OriginArr = this.voteRanking
      const voteTimeArr = Object.values(this.initData.vote_time)
      if (voteTimeArr.length) {
        const nowTime = new Date()
        const index = voteTimeArr.findLastIndex(time => nowTime >= new Date(time))
        if (index != -1) {
          return OriginArr.slice(index + 1)
        } else {
          return OriginArr
        }
      }
      return OriginArr
    }
  },
  methods: {
    init() {
      this.$http(this.ApiSetting.active.lols12.init)
        .then(res => {
          if (res.status == 1 && res.data) {
            // const nowTime = new Date('2022-10-02').getTime()
            const nowTime = res.data.system_time ? res.data.system_time * 1000 : new Date().getTime()
            this.activeStartTime = res.data.active_start_time * 1000
            this.activeEndTime = res.data.active_end_time * 1000
            const S12GameST = res.data.s12_time * 1000
            console.log('S12初始化', res, res.data.game_match)
            if (nowTime >= this.activeStartTime && nowTime <= this.activeEndTime) {
              this.isS12Begin = 'begining'
            } else {
              if (nowTime < this.activeStartTime) {
                this.isS12Begin = 'before'
              } else {
                this.isS12Begin = 'after'
              }
            }
            if (nowTime >= S12GameST && nowTime <= this.activeEndTime) {
              this.isS12GameBegin = 'begining'
            } else {
              if (nowTime < S12GameST) {
                this.isS12GameBegin = 'before'
              } else {
                this.isS12GameBegin = 'after'
              }
            }
            this.initData = res.data
            this.gameMatch = res.data.game_match
            this.BQPhb = res.data.ranking[0]
            this.SQPhb = res.data.ranking[1]
            this.GJPhb = res.data.ranking[2]
            if (this.$refs.gamepro) {
              this.$refs.gamepro.activeType = res.data.match_id
              this.$refs.gamepro.activeDay = res.data.match_day
              this.$refs.gamepro.getGameVs(res.data.match_id)
              this.$refs.gamepro.gameProcess(res.data.match_id, res.data.match_day)
              if (this.$refs.gamepro.$refs.dayswiper) {
                this.$refs.gamepro.$refs.dayswiper.$swiper.slideTo(res.data.match_day - 1)
              }
            }
          }
        })
    },
    getS12Team() {
      this.s12teamLoading = true
      console.log("s12没开始，拿百万奖金的s12战队")
      this.$http(this.ApiSetting.active.lols12.getTeam, {
        tournament_code: 's12'
      }).then(res => {
        this.s12teamLoading = false
        console.log('拿到的s12战队结果')
        if (res.status == 1) {
          this.Teams = res.data
        }
      }).finally(res => this.s12teamLoading = false)
    },
    toScroll() {
      window.scrollTo({
        top: 800,
        behavior: "smooth"
      })
    },
    // 获取奖金池数据
    getBonusPool() {
      if (this.isRequstPool == 0) {
        clearInterval(this.Interval)
        return;
      }
      this.$http(this.ApiSetting.active.lols12.bonusPool)
        .then(res => {
          console.log('总奖金', res)
          if (res.status == 1 && res.data) {
            this.numb = Number(res.data.prize_pool).toFixed(2)
            this.isRequstPool = typeof (res.data.is_request) == 'number' ? res.data.is_request : true
          }
        })
    },
    // 打call后更新选票/更新战队
    upTeamVote(myVote) {
      this.initData.my_vote = myVote
      this.getS12Team()
    },
    changeNav(i) {
      if (i == 2 && this.initData.s12_schedule == 0) {
        this.$message({ message: '敬请期待 !', type: 'warning' })
        return;
      }
      this.activeNav = i
    },
    closeDio() {
      this.isShowDio = false
    },
    async confirmDio() {
      if (this.dioClassName == "sendFreeVote") {
        this.closeDio()
      }
      if (this.dioClassName == "toVote") {
        if (this.deVoteNum > this.initData.my_vote) {
          this.$message({ message: '您当前的选票数量不足，请先获取选票!', type: 'warning' })
        } else {
          const type = this.VRSelected == 'quarterfinals' ? 1 : this.VRSelected == 'fourfinals' ? 2 : 3
          // 开始投票
          this.$http(this.ApiSetting.active.lols12.beatVote, {
            team_id: this.myChooseTeam.team_id,
            team_name: this.myChooseTeam.team_name,
            type: type,
            num: this.deVoteNum
          })
            .then(res => {
              if (res.status == 1) {
                this.$message({ message: res.message, type: 'success' })
                this.closeDio()
                // 更新选票数量和竞猜记录
                this.init()
                this.$refs.millionBonus.init()
              }
            })
        }
      }
      if (this.dioClassName == "exchange") {
        console.log('当前可兑换票数', this.ExVoteBtnLoading, this.$refs.getVotes.betQuickVoAmount, this.$refs.getVotes.depoQuickVoAmount)
        const betExVoteNum = this.$refs.getVotes.betQuickVoAmount
        const depoExVoteNum = this.$refs.getVotes.depoQuickVoAmount
        const xnbExVoteNum = this.initData.virtual_exchange
        if (betExVoteNum + depoExVoteNum + xnbExVoteNum === 0) {
          return;
        }
        if (!this.isLogin) {
          this.$message({ message: "请您先登录！", type: 'warning' })
          return
        }
        if (this.ExVoteBtnLoading) {
          return
        }
        if (betExVoteNum > 0) {
          const result = await this.exchangeVoteInDio({
            from: 2,
            num: betExVoteNum
          })
          if (result) {
            if (depoExVoteNum > 0) {
              const result = await this.exchangeVoteInDio({
                from: 1,
                num: depoExVoteNum
              })
              if (result) {
                if (xnbExVoteNum > 0) {
                  const result = await this.exchangeVoteInDio({
                    from: 6,
                    num: xnbExVoteNum
                  })
                  if (result) {
                    this.$message({ message: `您已成功兑换${betExVoteNum + depoExVoteNum + xnbExVoteNum}张选票，快去选择您喜欢的战队进行投票吧`, type: 'success' })
                    this.closeDio()
                    this.init()
                  }
                } else {
                  this.$message({ message: `您已成功兑换${betExVoteNum + depoExVoteNum}张选票，快去选择您喜欢的战队进行投票吧`, type: 'success' })
                  this.closeDio()
                  this.init()
                }
              }
            } else {
              if (xnbExVoteNum > 0) {
                const result = await this.exchangeVoteInDio({
                  from: 6,
                  num: xnbExVoteNum
                })
                if (result) {
                  this.$message({ message: `您已成功兑换${betExVoteNum + xnbExVoteNum}张选票，快去选择您喜欢的战队进行投票吧`, type: 'success' })
                  this.closeDio()
                  this.init()
                }
              } else {
                this.$message({ message: result.message, type: 'success' })
                this.closeDio()
                this.init()
              }
            }
          }
        } else {
          if (depoExVoteNum > 0) {
            const result = await this.exchangeVoteInDio({
              from: 1,
              num: depoExVoteNum
            })
            if (result) {
              if (xnbExVoteNum > 0) {
                const result = await this.exchangeVoteInDio({
                  from: 6,
                  num: xnbExVoteNum
                })
                if (result) {
                  this.$message({ message: `您已成功兑换${depoExVoteNum + xnbExVoteNum}张选票，快去选择您喜欢的战队进行投票吧`, type: 'success' })
                  this.closeDio()
                  this.init()
                }
              } else {
                this.$message({ message: result.message, type: 'success' })
                this.closeDio()
                this.init()
              }
            }
          } else {
            if (xnbExVoteNum > 0) {
              const result = await this.exchangeVoteInDio({
                from: 6,
                num: xnbExVoteNum
              })
              if (result) {
                this.$message({ message: result.message, type: 'success' })
                this.closeDio()
                this.init()
              }
            }
          }
        }
      }
    },
    // 兑换选票弹窗
    toExchangeDio() {
      const totalNum = this.$refs.getVotes.betQuickVoAmount + this.$refs.getVotes.depoQuickVoAmount + this.initData.virtual_exchange
      if (totalNum == 0) {
        this.activeNav = 1
        return;
      }
      this.dioClassName = "exchange"
      this.isShowDio = true
    },
    /**
     * 兑换选票 params: { from, num }, flag: 百万奖金兑票弹窗需要请求两次接口
     * from：兑换来源 1:充值,2:投注,3:V币商城兑换,4:等级≥VIP1,5:打call兑换,6:虚拟币充值兑换
     * num：兑换选票数 默认 1 （大于1 则默认为一键兑换）
    * **/
    exchangeVote(params) {
      if (this.ExVoteBtnLoading) {
        return
      }
      this.ExVoteBtnLoading = true
      this.$http(this.ApiSetting.active.lols12.exchangeVote, params)
        .then(res => {
          this.ExVoteBtnLoading = false
          console.log('兑换', res)
          if (res.status == 1 && res.message) {
            this.$message({ message: res.message, type: 'success' })
            this.init()
          }
        })
        .catch(err => {
          this.ExVoteBtnLoading = false
        })
    },
    exchangeVoteInDio(params) {
      return new Promise((resolve, reject) => {
        this.$http(this.ApiSetting.active.lols12.exchangeVote, params)
          .then(res => {
            this.ExVoteBtnLoading = false
            if (res.status == 1) {
              resolve(res)
            } else {
              reject(false)
            }
          })
          .catch(err => {
            this.ExVoteBtnLoading = false
            console.warn(err)
            reject(false)
          })
      })
    },
    // 给战队投票
    voteTeam(team) {
      console.log('投票中', team)
      this.myChooseTeam = team
      this.dioClassName = "toVote"
      this.isShowDio = true
    },
    // 领取彩金
    getBonus() {
      this.initData.status = 1
      this.init()
    },
    minus() {
      if (this.deVoteNum <= 1) {
        this.$message({ message: '最低投1票', type: 'warning' })
        return;
      }
      this.deVoteNum = this.deVoteNum - 1
    },
    plus() {
      if (this.deVoteNum >= this.initData.my_vote) {
        this.$message({ message: '您当前的选票数量不足，请先获取选票!', type: 'warning' })
        return
      }
      this.deVoteNum = this.deVoteNum + 1
    }
  }
}
</script>

<style lang="less">
.footer {
  position: relative;
}
.lols12-Dialog {
  user-select: none;
  background: transparent;

  .el-dialog__header {
    display: none;
  }

  .el-dialog__body {
    padding: 0;
  }

  .close {
    cursor: pointer;
    position: absolute;
    bottom: -104px;
    left: 50%;
    transform: translateX(-50%);
    width: 64px;
    height: 64px;
    background: url('~@/assets/active/lols12/new/sprite.png');
    background-position: -597px -473px;

    &:hover {
      background-position: -677px -473px;
    }
  }

  .lols12-Dialog-wrapper {
    margin: auto;
    position: relative;
    width: 100%;
    box-sizing: border-box;
    text-align: center;

    .freeVote-title {
      font-size: 24px;
      font-weight: bold;
      color: #d6b598;
    }

    .gift-img {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate3D(-50%, -28px, 0);
      z-index: -1;
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
      line-height: 48px;
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

    .border {
      position: absolute;
      pointer-events: none;
      width: 100%;
      box-sizing: border-box;
      top: 184px;
      left: 0;
      border: solid 2px #d6b598;
      border-top: none;
      border-bottom: none;
      background-color: #101c34;
      transition: all 0.5s;
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 764px;
      height: 184px;
      background: url('~@/assets/active/lols12/new/dio-border-up.png') no-repeat center top;
      background-size: 100% 100%;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 764px;
      height: 247px;
      background: url('~@/assets/active/lols12/new/dio-border-down.png') no-repeat center bottom;
      background-size: 100% 100%;
    }

    .display {
      position: relative;
      z-index: 1;
      width: 100%;
      height: 100%;
    }
  }

  .sendFreeVote-wrapper {
    height: 458px;
    padding: 39px 42px 42px;

    .border {
      height: 27px;
    }

    .confirm-btn {
      margin-top: 304px;
    }

  }

  .table {
    width: 680px;
    box-sizing: border-box;

    .table-head {
      text-align: left;
      width: 100%;
      height: 60px;
      line-height: 60px;
      padding: 0 22px;
      box-sizing: border-box;
      border-style: solid;
      border-width: 2px;
      border-image-source: linear-gradient(to right, #756049, #d6b598, #756049);
      border-image-slice: 1;
      background-color: #3b3b3b;
      color: #fff;
      display: flex;
      align-items: center;
      // font-size: 24px;
    }

    .table-body {
      box-sizing: border-box;
      border-style: solid;
      border-width: 2px;
      border-image-source: linear-gradient(to right, #756049, #d6b598, #756049);
      border-image-slice: 1;
      border-top: none;
      background-color: #0a0a0c;
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
      color: #fff;
      font-weight: bold;
      font-size: 14px;
    }

    td {
      border-bottom: #000 1px solid;
      height: 40px;
      font-size: 14px;
      font-weight: bold;
      color: #d6b598;
    }
  }

  .exchange-wrapper {
    padding: 42px;

    .border {
      height: 0;
    }

    .table {
      margin-bottom: 20px;
    }
  }

  .toVote-wrapper {
    height: 477px;
    padding: 42px;

    .border {
      height: 46px;
    }

    .table {
      margin-bottom: 20px;
    }

    .table-body {
      padding: 22px 0;
    }
  }

  .exchange-content {
    width: 100%;
  }

  .toVote-content {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
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

  .team-card {
    cursor: pointer;
    position: relative;
    margin-right: 60px;
    width: 130px;
    height: 184px;
    box-sizing: border-box;
    padding: 10px 5px 12px;
    text-align: center;
    border: solid 1px rgba(255, 235, 180, 0.2);

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

    .team-name {
      margin-top: 20px;
      font-size: 18px;
      font-weight: bold;
      color: #fff;
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

    &.team-card-active,
    &:hover {
      border: solid 1px #5ea2e6;

      .team-logo-wrapper {
        background: url('~@/assets/active/lols12/new/sprite.png');
        background-position: -1427px -14px;
      }

      .bg {
        opacity: 1;
        background-image: linear-gradient(to bottom, #5ea2e6, #1841b6);
      }

      .team-name {
        color: #fff;
      }

      .team-score {
        color: #fff;
      }
    }
  }

  .team-vote {
    font-size: 14px;
    font-weight: bold;
    color: #fff;

    .select-wrapper {
      margin-left: 20px;

      &:last-of-type {
        .name {
          margin-right: 0;
        }
      }

      .name {
        cursor: pointer;
        position: relative;
        margin-right: 32px;

        span {
          margin-left: 8px;
        }
      }

      .vote-box {
        position: relative;
        cursor: pointer;
        display: inline-block;
        width: 22px;
        height: 22px;
        box-sizing: border-box;
        border: solid 2px #258dff;
      }

      .vote-box-plus {
        background-color: #258dff;
        border: none;
      }

      .minus {
        background: url('~@/assets/active/lols12/new/sprite.png');
        background-position: -855px -438px;
        width: 12px;
        height: 2px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate3d(-50%, -50%, 0);
      }

      .plus {
        background: url('~@/assets/active/lols12/new/sprite.png');
        background-position: -876px -433px;
        width: 12px;
        height: 12px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate3d(-50%, -50%, 0);
      }

      .vote-num {
        margin-left: 10px;
        margin-right: 10px;

        .import {
          margin-right: 4px;
          font-size: 30px;
          line-height: 19px;
        }
      }

      input {
        display: none;
      }

      input[type="radio"]+label::before {
        content: "";
        display: inline-block;
        width: 28px;
        height: 28px;
        box-sizing: border-box;
        border-radius: 50%;
        border: solid 2px #258dff;
      }

      input[type="radio"]:checked+label::after {
        content: "";
        display: inline-block;
        position: absolute;
        top: 8px;
        left: 5.6px;
        width: 18px;
        height: 14px;
        background: url('~@/assets/active/lols12/new/sprite.png');
        background-position: -829px -433px;
      }
    }
  }

}
</style>
<style lang="less" scoped>
/deep/::-webkit-scrollbar-thumb {
  background-image: linear-gradient(to top, #eec494, #d6b598);
}

@keyframes star {
  0% {
    opacity: 1;
  }

  25% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  75% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}


/deep/.no-data-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 220px;

  .no-data-logo {
    margin-bottom: 19px;
  }
  .no-data-text {
    font-size: 24px;
    font-weight: bold;
    color: #fff;
  }
}

/deep/.num-icon {
  display: inline-block;
  vertical-align: middle;
  width: 22px;
  height: 35px;
  background: url('~@/assets/active/lols12/new/sprite.png');

  &.num-gj {
    background-position: -18px -1342px;
  }

  &.num-yj {
    background-position: -18px -1390px;
  }

  &.num-jj {
    background-position: -18px -1439px;
  }
}

/deep/.zhi {
  color: #fff;
  font-size: 14px;
  margin-right: 10px;
}

/deep/.time-box {
  width: 140px;

  &.start_time {
    margin-right: 10px;
  }

  &.end_time {
    margin-right: 20px;
  }

  .ivu-input {
    border-radius: 0;
    border-color: #d6b598;
    background-color: transparent;

    &::placeholder {
      color: #fff;
      font-size: 16px;
    }
  }

  .ivu-select-dropdown {
    border-color: #d6b598;
  }


  .ivu-date-picker-header-label:hover {
    color: #d6b598;
  }

  .ivu-date-picker-cells-cell-selected:hover em,
  .ivu-date-picker-cells-cell-selected em {
    box-shadow: 0 0 1px 2px #d6b598;
    color: #fff;
  }

  .ivu-date-picker-with-range .ivu-picker-panel-body {
    min-width: 432px;
  }

  .ivu-date-picker-with-range .ivu-picker-panel-content {
    float: left;
  }

  .ivu-date-picker-cells {
    margin: 10px;
  }

  .ivu-date-picker-cells-cell:hover em {
    color: #d6b598;
  }

  .ivu-date-picker-cells-cell-range {
    position: relative;
  }

  .ivu-date-picker-cells-cell-range:before {
    content: '';
    display: block;
    background: #d6b598;
    border-radius: 0;
    border: 0;
    position: absolute;
    top: 2px;
    bottom: 2px;
    left: 0;
    right: 0;
    z-index: -1;
  }

  .ivu-date-picker-cells-cell-today em:after {
    background: #d6b598;
  }
}

/deep/ .list-loading {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/deep/.no-cont {
  font-size: 14px;
  font-weight: bold;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
}

/deep/.bold {
  font-weight: bold;
}

/deep/.white {
  color: #fff;
}

/deep/.theme {
  color: #d6b598;
}

.lols12-page {
  min-height: 500px;
  background-image: url('~@/assets/active/lols12/banner.jpg'), url('~@/assets/active/lols12/bg-top.jpg'),
    url('~@/assets/active/lols12/bg-bottom.jpg');
  background-color: #00040e;
  background-repeat: no-repeat, no-repeat, no-repeat;
  background-position: center top, center 1000px, center 2610px;
  padding-top: 884px;
  padding-bottom: 40px;
  position: relative;
  overflow: hidden;
  .kv-video-ct {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 80px;
    left: 0;
    min-width: 1280px;
    .kv-bg-video {
      width: 100%;
      height: 100%;
      display: block;
      margin: auto;
      max-width: 1920px;
      object-fit: cover;
      object-position: center;
    }
  }
  .slogan {
    white-space: nowrap;
    position: absolute;
    top: 260px;
    left: 50%;
    transform: translateX(-50%);
    width: 1920px;
    img {
      width: 100%;
      height: 100%;
    }
    // font-size: 70px;
    // line-height: 1;
    // font-weight: bold;
    // color: transparent;
    // text-shadow: 0px 5px 5.6px rgba(0, 0, 0, 0.95);

    // &::after {
    //   content: attr(data-text);
    //   position: absolute;
    //   left: 0;
    //   background: linear-gradient(to bottom, #fffff0, #eec68c);
    //   background-clip: text;
    //   -webkit-background-clip: text;
    //   -webkit-text-fill-color: transparent;
    //   text-shadow: none;
    // }
  }

  .game-time {
    white-space: nowrap;
    position: absolute;
    top: 798px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 24px;
    line-height: 1;
    font-weight: bold;
    color: #eec494;
    // color: transparent;
    // text-shadow: 0px 5px 5.6px rgba(0, 0, 0, 0.95);

    // &::after {
    //   content: attr(data-text);
    //   position: absolute;
    //   left: 0;
    //   background: linear-gradient(to bottom, #eec494, #eec68c);
    //   background-clip: text;
    //   -webkit-background-clip: text;
    //   -webkit-text-fill-color: transparent;
    //   text-shadow: none;
    // }
  }

  .award-pool {
    position: absolute;
    top: 614px;
    left: 50%;
    transform: translateX(-50%);
    height: 112px;
    width: 1094px;
    display: flex;
    align-items: center;
    justify-content: center;
    .ap-bg {
      position: absolute;
      max-width: 1920px;
    }
    .num {
      position: relative;
      transition: all 1s ease;
      width: 74px;
      height: 112px;
      // margin: auto -5.2px;
      background: url('~@/assets/active/lols12/new/sprite.png');

      &:nth-of-type(2) {
        margin-left: -6px;
      }

      &::after {
        content: '';
        position: absolute;
        width: 58px;
        height: 60px;
        background: url('~@/assets/active/lols12/sprite.png');
        background-position-x: -1063px;
        background-position-y: -31px;
        animation: star 4s infinite;
      }

      &:nth-child(2) {
        &::after {
          animation-duration: 3.1s;
          animation-delay: 200ms;
        }
      }

      &:nth-child(4) {
        &::after {
          animation-duration: 3.5s;
        }
      }

      &:nth-child(5) {
        &::after {
          animation-duration: 5.6s;
        }
      }

      &:nth-child(6) {
        &::after {
          animation-duration: 4.3s;
          animation-delay: 120ms;
        }
      }

      &:nth-child(8) {
        &::after {
          animation-duration: 3.8s;
          animation-delay: 60ms;
        }
      }

      &:nth-child(9) {
        &::after {
          animation-duration: 6s;
        }
      }

      &:nth-child(12) {
        &::after {
          animation-duration: 5s;
          animation-delay: 230ms;
        }
      }

      &:nth-child(13) {
        &::after {
          animation-duration: 3s;
          animation-delay: 230ms;
        }
      }
    }

    .currency {
      width: 66px;
      background-position: -1629px -207px;

      &::after {
        right: -18px;
        bottom: -11px;
      }
    }

    .colon {
      width: 36px;
      height: 60px;
      align-self: flex-end;
      background-position: -1643px -337px;

      &:nth-child(3) {
        right: 5px;
      }

      &::after {
        content: none;
      }
    }

    .num9 {
      background-position: -1788px -226px;

      &::after {
        right: -6px;
        bottom: -7px;
      }
    }

    .num8 {
      background-position: -1789px -400px;

      &::after {
        right: -5px;
        top: -23px;
      }
    }

    .num7 {
      background-position: -1788px -574px;

      &::after {
        right: 19px;
        top: 4px;
      }
    }

    .num6 {
      background-position: -1788px -748px;

      &::after {
        right: 1px;
        top: 10px;
      }
    }

    .num5 {
      background-position: -1789px -922px;

      &::after {
        right: -20px;
        top: -27px;
      }
    }

    .num4 {
      background-position: -1789px -1095px;

      &::after {
        right: -23px;
        bottom: 9px;
      }
    }

    .num3 {
      background-position: -1789px -1269px;

      &::after {
        right: 16px;
        bottom: 20px;
      }
    }

    .num2 {
      background-position: -1789px -1443px;

      &::after {
        left: -21px;
        bottom: -25px;
      }
    }

    .num1 {
      background-position: -1789px -1616px;

      &::after {
        right: -9px;
        top: -27px;
      }
    }

    .num0 {
      background-position: -1789px -1792px;

      &::after {
        left: -8px;
        top: -24px;
      }
    }

    .dot {
      width: 36px;
      height: 60px;
      align-self: flex-end;
      background-position: -1642px -416px;
      margin-right: 4px;
      &::after {
        content: none;
      }
    }
  }

  .nav-wrapper {
    margin: auto;
    width: 1246px;
    height: 72px;
    background: url('~@/assets/active/lols12/new/sprite.png');
    background-position: -10px -232px;
    display: flex;
    justify-content: space-between;
    position: relative;
    .nav {
      position: relative;
      width: 311.5px;
      height: 100%;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 24px;
      color: #e1bc96;
      font-weight: bold;
      transition: all 0.3s;
      background: url('~@/assets/active/lols12/new/sprite.png');
      background-position: -579px -64px;
      cursor: pointer;
      user-select: none;
      &:hover,
      &.nav-active {
        background: url('~@/assets/active/lols12/new/sprite.png');
        background-position: -579px -136px;
        color: #010101;
      }
    }
  }

  .back-btn {
    user-select: none;
    cursor: pointer;
    position: relative;
    margin: auto;
    width: 240px;
    height: 60px;
    line-height: 60px;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    background: url('~@/assets/active/lols12/new/sprite.png');
    background-position: -137px -599px;
    color: #eec494;

    &:hover {
      background: url('~@/assets/active/lols12/new/sprite.png');
      background-position: -137px -674px;
      color: #fff;
    }
  }

  /deep/.block {
    margin: auto;
    position: relative;
    width: 1246px;
    padding: 0 22px 42px;
    box-sizing: border-box;
    margin-bottom: 40px;
    transition: all 0.5s;

    .border {
      position: absolute;
      pointer-events: none;
      width: 100%;
      box-sizing: border-box;
      top: 227px;
      left: 0;
      border: solid 2px #d6b598;
      border-top: none;
      border-bottom: none;
      background-color: #101c34;
      transition: all 0.5s;
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 1246px;
      height: 227px;
      background: url('~@/assets/active/lols12/new/border-up.png') no-repeat center top;
      background-size: 100% 100%;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 1246px;
      height: 323px;
      background: url('~@/assets/active/lols12/new/border-down.png') no-repeat center bottom;
      background-size: 100% 100%;
    }

    .display {
      position: relative;
      z-index: 1;
      width: 100%;
      height: 100%;
    }

    .ivu-select-arrow {
      background: url("~@/assets/active/lols12/new/sprite.png") no-repeat;
      background-position: -900px -150px !important;
      width: 11px !important;
      height: 7px !important;
    }

    .ri-coner-btn {
      cursor: pointer;
      user-select: none;
      width: 132px;
      height: 28px;
      line-height: 28px;
      border: solid 2px #eec494;
      background-color: #0a0a0c;
      border-top-left-radius: 12px;
      border-bottom-right-radius: 12px;
      text-align: center;
      color: #d6b598;
      font-size: 16px;
      display: flex;
      justify-content: center;
      align-items: center;

      .ivu-select-selection {
        width: 132px;
        height: 28px;
        line-height: 28px;
        border-color: transparent;
        border-radius: 0;

        .ivu-select-selected-value {
          font-size: 16px;
          height: 28px;
          line-height: 26px;
        }
      }

      .ivu-select-dropdown {
        border-color: #d6b598 !important;
      }

      .ivu-select-item {
        color: #fff;

        &:hover {
          color: #d6b598;
        }
      }

      .ivu-select-item-selected,
      .ivu-select-item-selected:hover {
        color: #d6b598;
      }

      .tri {
        height: 0;
        width: 0;
        border: 5px solid transparent;
        border-top: 5px solid #d6b598;
        border-bottom: none;
        margin-left: 4px;
        transition: all 0.5s;
      }

      &.ri-coner-btn-active,
      &:hover {
        background-image: linear-gradient(to top, #eec494, #d6b598);
        font-weight: bold;
        color: #000;

        .tri {
          transform: rotate(180deg);
          border-top: 5px solid #000;
        }
      }
      &.ri-coner-btn-notallow {
        &:hover {
            cursor: default;
            background-image: none;
            color: #d6b598;
            font-weight: normal;
          }
      }
    }

    .title-wrapper {
      position: relative;
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 50px;

      .right-wrapper {
        height: 100%;
        box-sizing: border-box;
        padding-right: 24px;
        // border-bottom: solid 1px #305364;
        position: relative;
        left: 20px;
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;

      }

      &::before {
        content: '';
        position: absolute;
        top: 19px;
        left: -2px;
        width: 4px;
        height: 32px;
        background-color: #fff;
      }

      .title {
        position: relative;
        height: 100%;
        line-height: 67px;
        margin-left: 12px;
        font-size: 28px;
        font-weight: bold;
        color: #fff;

        &::after {
          content: '';
          position: absolute;
          right: -25px;
          top: 29px;
          width: 15px;
          height: 10px;
          background: url('~@/assets/active/lols12/new/sprite.png');
          background-position: -900px -136px;
        }
      }
    }
  }

  /deep/.gz-content {
    margin-top: 40px;
    width: 100%;
    box-sizing: border-box;
    padding: 0 12px;
    text-align: left;
    font-size: 14px;
    color: #d6b598;
    line-height: 1.71;

    ol {
      padding-left: 12px;
      list-style: decimal;
    }

    li {
      list-style: decimal;
      margin-bottom: 23px;

      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }

  /deep/.up-down {
    cursor: pointer;
    user-select: none;
    margin: auto;
    width: 70px;
    text-align: center;

    .text {
      font-size: 16px;
      color: #d6b598;
    }

    .icon {
      transition: all .3s;
      margin: auto;
      margin-top: 10px;
      width: 32px;
      height: 18px;
      background: url('~@/assets/active/lols12/new/sprite.png');
      background-position: -595px -367px;
    }

    .icon-rate {
      transform: rotate(180deg);
    }
  }
}
</style>