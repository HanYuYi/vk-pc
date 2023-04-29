<template>
  <div class="bonus">

    <div class="center-box">
      <img src="../../../../assets/active/worldCup2022/bonus_title.png" class="title" alt="">

      <!-- 战队-->
      <div class="team-match">
        <template v-if="!teamLoading">
          <dl v-for="(item, index) in teamData.data"
              :key="index"
              class="team-item" :class="{cancel: item.is_eliminate}">
            <dt>
              <img :src="item.flag" alt="" class="flag">
              <h5 class="name">{{ item.cn_name }}</h5>
              <small v-if="item.call_num" class="call-time" :class="`t${item.call_num}`"></small>
            </dt>
            <dd>
              <button @click="toVote(item)"><span>投票</span></button>
              <button @click="toCall(item)"><span>打call {{ item.call_num ? `x${item.call_num}` : '' }}</span></button>
            </dd>
          </dl>
        </template>
        <dl v-else class="world-cup2022-loading"></dl>
      </div>

      <p class="vote-num">我的选票数量：<span>{{ teamData.totalCount.canVoteCount }}</span></p>

      <div @click="toExchangeVotes" class="exchange-votes">
        <button><span class="world-cup2022-gradient-color">选票兑换</span></button>
      </div>

      <!-- 排行榜-->
      <div class="ranking-list">
        <template v-if="!rankListLoaing">
          <dl v-for="(arr, index) in rankList"
             :key="index"
             class="ranking-item">

            <dt>{{ rankTitleList[index] }}排行榜</dt>

            <dd>
              <div class="table-bg">
                <table border="0" align="center" cellspacing="0" width="100%">
                  <thead>
                    <tr>
                      <th>排名</th>
                      <th class="align-left">球队名称</th>
                      <th>选票数量</th>
                      <th>打CALL数量</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, i) in arr" :key="i">
                      <td>
                        <template v-if="i === 0"><img src="../../../../assets/active/worldCup2022/bouns_rank_1.png"></template>
                        <template v-if="i === 1"><img src="../../../../assets/active/worldCup2022/bouns_rank_2.png"></template>
                        <template v-if="i === 2"><img src="../../../../assets/active/worldCup2022/bouns_rank_3.png"></template>
                        <template v-if="i > 2">{{ i + 1 }}</template>
                      </td>
                      <td class="align-left"><img :src="item.flag" alt="">{{ item.team_name }}</td>
                      <td>{{ item.quiz_num }}</td>
                      <td>{{ item.call_num }}</td>
                    </tr>
                  </tbody>
                </table>
                <div v-if="!arr || !arr.length"
                     class="world-cup2022-empty-data"
                     style="height: calc(100% - 40px)">
                  <i></i><p class="empty-txt">暂无数据</p>
                </div>
              </div>
            </dd>
        </dl>
        </template>
        <dl v-else class="world-cup2022-loading"></dl>
      </div>
    </div>


    <!-- 规则-->
    <dl class="rules">
      <dt><img src="../../../../assets/active/worldCup2022/get_votes_rule_title.png"></dt>
      <dd>
        <ul>
          <li><i>1</i><p>全平台等级≥VIP1的会员均可参与此活动，每位会员可以免费获得一张选票。</p></li>
          <li><i>2</i><p>此活动结束时间为2022年12月17日，领取彩金截止时间为：2022年12月21日23:59:59，会员需在指定时间之前领取彩金，逾期则视为自动放弃。</p></li>
          <li><i>3</i><p>所有彩金只需全站1倍流水即可提款，派奖之后可以在我的竞猜页面领取奖金，领取之后奖金将会自动派发至会员的主钱包中。当用户对应的钱包余额＜最低投注额且无未结算注单时，系统将自动判定已完成活动规定的有效流水。</p></li>
          <li><i>4</i><p>有效流水仅计算产生输赢结果的注单，亚洲盘赔率<0.75、欧洲盘≤1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水。</p></li>
          <li><i>5</i><p>每位有效玩家、每个手机号码、电子邮箱、IP地址、每张银行卡、每台设备只能享受一次优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利；VKGAME对本活动保有最终解释权。</p></li>
        </ul>
      </dd>
    </dl>

    <!-- 投票dialog-->
    <myVote :visible.sync="voteVisible" :voteData="toVoteData" :voteTime="voteTime" :guessType="guessType" @back="myVoteBack" />

    <!-- 选票兑换dialog-->
    <exchangeVotes :visible.sync="exchangeVotesVisible" :exchangeVotesData="exchangeVotesData" @back="myExchangeVoteBack" />
  </div>
</template>

<script>
import myVote from './dialogs/myVote'
import exchangeVotes from './dialogs/exchangeVotes'
import { mapState } from 'vuex'

export default {
  name: 'bonus',
  props: ["guessType", "voteTime", "pageScroll"],
  components: { myVote, exchangeVotes },
  data() {
    return {
      voteVisible: false,
      teamLoading: false,
      teamData: {
        data: [],
        totalCount: {}
      },

      toVoteData: {
        team: {},
        canVoteCount: 0
      },
      makeCallLoading: false,

      rankTitleList: ["八强", "四强", "季军", "亚军", "冠军"],
      rankList: [],
      rankListLoaing: false,

      exchangeVotesData: {},
      exchangeVotesVisible: false
    }
  },
  computed: {
    ...mapState(['isLogin'])
  },
  mounted () {
    this.getTeamList()

    this.getRankingList()
  },
  methods: {
    // 初始化战队信息
    async getTeamList() {
      this.teamLoading = true
      const res = await this.$http(this.ApiSetting.active.worldCup2022.callAndVoteList)
      console.info("初始化2022世界杯打call投票战队信息：", res)

      if (res.status === 1 && res.data) {
        this.teamData = res.data
        this.toVoteData.canVoteCount = res.data.totalCount.canVoteCount
        this.exchangeVotesData = res.data.totalCount
        this.scrollPageY()
      }
      this.teamLoading = false
    },

    // 开启投票dialog
    toVote(row) {
      if (row.is_eliminate) return

      if (this.voteTime && !this.voteTime.length) {
        this.$message({message: "对不起，您来晚了，已截止投票了", type: 'warning'})
        return
      }
      if (!this.isLogin) {
        this.$message({message: "请您先登录！", type: 'warning'})
        return
      }

      if (this.teamData.totalCount && this.teamData.totalCount.canVoteCount <= 0) {
        this.$message({ message: "您当前的选票数量不足，请先获取选票！", type: 'warning' })
        this.$emit("toGetVotes")
        return
      }
      this.toVoteData.team = row
      this.voteVisible = true
    },

    // 去打call
    async toCall(row) {
      if (row.is_eliminate) return
      if (this.makeCallLoading) return
      if (!this.isLogin) {
        this.$message({message: "请您先登录！", type: 'warning'})
        return
      }

      this.makeCallLoading = true
      const params = { team_id: row.id, team_name: row.cn_name }
      console.info("2022世界杯打call入参：", params)
      const res = await this.$http(this.ApiSetting.active.worldCup2022.makeCall, params)
      console.info("2022世界杯打call响应：", res)

      if (res.status === 1) {
        this.$message({ message: res.message, type: 'success' })
        this.getTeamList()
        this.getRankingList()
      }
      this.makeCallLoading = false
    },

    // 开启兑换选票dialog
    toExchangeVotes() {
      if (this.teamLoading) return
      if (!this.isLogin) {
        this.$message({message: "请您先登录！", type: 'warning'})
        return
      }
      if (!this.teamData.totalCount.depositCount &&
        !this.teamData.totalCount.waterCount &&
        !this.teamData.totalCount.virtualCount
      ) {
        this.$message({ message: "当前无可兑换选项票，请先获取选票！", type: 'warning' })
        this.$emit("toGetVotes")
        return
      }
      this.exchangeVotesVisible = true
    },

    // 初始化竞猜排行榜
    async getRankingList() {
      this.rankListLoaing = true
      const res = await this.$http(this.ApiSetting.active.worldCup2022.rankingList)
      console.info("初始化2022世界杯竞猜排行榜信息：", res)

      if (res.status === 1 && res.data) {
        this.rankList = res.data
      }
      this.rankListLoaing = false
    },

    myVoteBack() {
      this.getTeamList()
      this.getRankingList()
    },

    myExchangeVoteBack() {
      this.getTeamList()
      this.$parent.init()
    },

    // 滚动页面位置
    scrollPageY() {
      this.$nextTick(() => {
        if (this.pageScroll) {
          this.$emit('pageScrollBack')
          this.$emit('update:pageScroll', false)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.bonus {
  .center-box {
    width: 1240px;
    margin: 0 auto;

    .title {
      display: block;
      margin: 70px auto 0;
      pointer-events: none;
    }

    .team-match {
      margin-left: -5px;
      width: 1250px;
      min-height: 156px;
      margin-top: 67px;
      display: flex;
      flex-wrap: wrap;
      .team-item {
        margin-top: 10px;
        width: 179px;
        text-align: center;
        margin-right: calc(176px / 5);
        &:nth-child(6n+6) {
          margin-right: 0;
        }
        dt {
          position: relative;
          .flag {
            height: 53px;
          }
          .name {
            margin-top: 6px;
            font-size: 14px;
            color: #f9ce8a;
          }
          .call-time {
            position: absolute;
            top: 34px;
            left: 100px;
            width: 38px;
            height: 31px;
            &.t1 {
              background: url("../../../../assets/active/worldCup2022/bouns_call_1.png") no-repeat 100% 100%;
            }
            &.t2 {
              background: url("../../../../assets/active/worldCup2022/bouns_call_2.png") no-repeat 100% 100%;
            }
            &.t3 {
              background: url("../../../../assets/active/worldCup2022/bouns_call_3.png") no-repeat 100% 100%;
            }
          }
        }
        dd {
          margin-top: 5px;
          display: flex;
          button {
            outline: 0;
            border: 0;
            width: 124px;
            height: 73px;
            background: url("../../../../assets/active/worldCup2022/diamond_btn.png") no-repeat center top;
            position: relative;
            cursor: pointer;
            &:hover {
              background: url("../../../../assets/active/worldCup2022/diamond_btn_hover.png") no-repeat center top;
            }
            &:last-child {
              margin-left: 5px;
            }
            span {
              position: absolute;
              inset: 0;
              top: 5px;
              height: 31px;
              font-size: 14px;
              line-height: 32px;
              color: #fff;
            }
          }
        }
        &.cancel {
          opacity: 0.4;
          cursor: no-drop;
          dd {
            button {
              pointer-events: none;
            }
          }
        }
      }
    }

    .vote-num {
      margin-top: -9px;
      font-size: 16px;
      font-weight: bold;
      text-align: center;
      color: #fff;
      span {
        color: #f9ce8a;
      }
    }

    .exchange-votes {
      height: 90px;
      text-align: center;
      margin-top: 15px;
      button {
        font-size: 16.5px;
        font-weight: bold;
        margin-top: 6px;
        width: 205px;
        height: inherit;
        outline: 0;
        border: 0;
        cursor: pointer;
        position: relative;
        background: url("../../../../assets/active/worldCup2022/my_guess.png") no-repeat center top;
        &:hover {
          background: url("../../../../assets/active/worldCup2022/my_guess_hover.png") no-repeat center top;
        }
        span {
          position: absolute;
          inset: 0;
          height: 21px;
          top: 18px;
        }
      }
    }

    .ranking-list {
      min-height: 342px;
      margin-top: -10px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      .ranking-item {
        width: 400px;
        margin-top: 35px;
        margin-right: 20px;
        &:nth-child(3n+3) {
          margin-right: 0;
        }
        dt {
          font-size: 20px;
          line-height: 20px;
          font-weight: bold;
          color: #fff;
          text-align: center;
          background: url("../../../../assets/active/worldCup2022/bouns_rank_title.png") no-repeat center top;
        }
        dd {
          overflow: hidden;
          margin-top: 23px;
          border-radius: 10px;
          background-image: linear-gradient(to bottom, #A2242E, #6e1d33);

          .table-bg {
            border-radius: 10px;
            overflow: hidden;
            width: calc(100% - 20px);
            margin: 10px;
            height: 244px;
            background-color: #fff;
            table {
              font-size: 14px;
              line-height: 40px;
              text-align: center;
              tr {
                th {
                  background-color: #f3dada;
                  color: #a22541;
                  &.align-left {
                    text-align: left;
                  }
                }
                td {
                  font-family: Roboto;
                  color: #333;
                  &:first-child {
                    width: 67px;
                    color: #666;
                    font-size: 16px;
                  }
                  &.align-left {
                    text-align: left;
                    max-width: 126px;
                    text-overflow: ellipsis;
                    overflow: hidden;
                  }
                  img {
                    width: 29px;
                    margin-right: 6px;
                  }
                }
              }
              tbody {
                tr {
                  border-bottom: 1px solid #e6e6e6;
                  &:nth-child(5) {
                    border: 0;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  .rules {
    margin-top: 88px;
    text-align: center;
    background: url("../../../../assets/active/worldCup2022/repeat_bg.jpg") no-repeat repeat center top;
    background-size: 1920px auto;
    dt {
      padding: 49px 0 30px;
    }
    dd {
      width: 1240px;
      margin: 0 auto;
      background-image: linear-gradient(90deg, transparent 5%, #7d1f37 50%, transparent 100%);
      position: relative;
      border-top: 0.1px solid transparent;
      &:before, &:after {
        position: absolute;
        left: 0;
        top: 0;
        content: "";
        width: 100%;
        height: 1px;
        background-image: linear-gradient(90deg, transparent 5%, rgba(255,237,209, 0.5) 50%, transparent 100%);
      }
      &:after {
        top: auto;
        bottom: 0;
      }
      ul {
        border-top: 0.1px solid transparent;
        margin: 15px 160px 0 185px;
        padding-bottom: 28px;
        li {
          margin-top: 12px;
          font-size: 14px;
          line-height: 25px;
          text-align: left;
          color: #fff;
          list-style: decimal;
          display: flex;
          i {
            margin-top: 2px;
            display: inline-block;
            width: 22px;
            height: 21px;
            background: url("../../../../assets/active/worldCup2022/rule_num_icon.png") no-repeat;
            text-align: center;
            line-height: 21px;
          }
          p {
            margin-left: 6px;
            flex: 1;
          }
        }
      }
    }
  }
}
</style>
