<template>
  <div class="billboard-new-year2023">

    <!-- 活动内容-->
    <dl class="billboard-content">
      <dt>活动期间，会员参与威客兔年风云榜，每个自然周内累计充值，累计流水，累计盈利排名前五十名的会员均可获得现金红包奖励。</dt>
      <dd>
        <table border="0" align="center" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <th>排名</th>
            <th>兔年充值王</th>
            <th>兔年流水王</th>
            <th>兔年盈利王</th>
            <th>彩金流水要求</th>
          </tr>
          <tr v-for="(amount, index) in billboardContentList" :key="index">
            <td>第{{ index < billboardContentList.length - 1 ? index + 1 : `${index + 1}至50` }}名</td>
            <td>{{ amount }}</td>
            <td>{{ amount }}</td>
            <td>{{ amount }}</td>
            <td v-if="index === 0" :rowspan="billboardContentList.length">全站8倍流水</td>
          </tr>
        </table>
      </dd>
    </dl>

    <!-- 榜单-->
    <div class="week-list">
      <!-- 上周榜单-->
      <div class="last-week">

        <div class="ranking">
          <template v-if="initInfo.last_week_ranks">
            <!-- 前三名-->
            <table class="top-list"  border="0" align="center" cellpadding="0" cellspacing="0" width="100%">
              <thead>
                <tr>
                  <th>排名</th>
                  <th>充值</th>
                  <th>流水</th>
                  <th>盈利</th>
                </tr>
              </thead>
              <tbody>
                  <tr v-for="(num, index) in lastWeekTopThree" :key="num">
                    <td :class="`tag-${num}`"></td>
                    <td width="28%">
                      <i :class="`icon-${num}`">
                        <img :src="initInfo.last_week_ranks.deposit_rank[index].head_image" alt="">
                      </i>
                      <p>{{ initInfo.last_week_ranks.deposit_rank[index].username }}</p>
                    </td>
                    <td width="28%">
                      <i :class="`icon-${num}`">
                        <img :src="initInfo.last_week_ranks.water_rank[index].head_image" alt="">
                      </i>
                      <p>{{ initInfo.last_week_ranks.water_rank[index].username }}</p>
                    </td>
                    <td width="28%">
                      <i :class="`icon-${num}`">
                        <img :src="initInfo.last_week_ranks.profit_rank[index].head_image" alt="">
                      </i>
                      <p>{{ initInfo.last_week_ranks.profit_rank[index].username }}</p>
                    </td>
                  </tr>
                </tbody>
            </table>

            <!-- 其它名次-->
            <vue-seamless-scroll :data="initInfo.last_week_ranks.deposit_rank"
                                 :class-option="{autoPlay: initInfo.last_week_ranks.deposit_rank.length > 10}"
                                 class="hide-box">
              <ul class="pj-list">
                <li v-for="(num, index) in lastWeekOther" :key="num">
                  <small>{{ num + 3 }}</small>
                  <div class="user-item">
                    <i><img :src="initInfo.last_week_ranks.deposit_rank[index + 3].head_image" alt=""></i>
                    <p>{{ initInfo.last_week_ranks.deposit_rank[index + 3].username }}</p>
                  </div>
                  <div class="user-item">
                    <i><img :src="initInfo.last_week_ranks.water_rank[index + 3].head_image" alt=""></i>
                    <p>{{ initInfo.last_week_ranks.water_rank[index + 3].username }}</p>
                  </div>
                  <div class="user-item">
                    <i><img :src="initInfo.last_week_ranks.profit_rank[index + 3].head_image" alt=""></i>
                    <p>{{ initInfo.last_week_ranks.profit_rank[index + 3].username }}</p>
                  </div>
                </li>
              </ul>
            </vue-seamless-scroll>
          </template>
          <div v-else class="new-year2023-empty"><p>暂无排名</p></div>
        </div>


        <!-- 我的排名-->
        <dl v-if="initInfo.self_data" class="my-ranking">
          <dt></dt>
          <dd>
            <ul>
              <li class="my-ranking-item">
                <p>充值<template v-if="initInfo.self_data.last_deposit_rank > 0">
                    第 <b>{{ initInfo.self_data.last_deposit_rank }}</b> 名
                  </template>
                  <template v-else>未上榜</template>
                </p>
                <h5 v-if="initInfo.last_week_ranks">{{ initInfo.self_data.last_deposit_total | formatNumberByInteger }}</h5>
                <h5 v-else>待统计</h5>
                <button v-if="initInfo.joined_conf.deposit_rank.is_reward === 1"
                        @click="receiveBonus(initInfo.self_data.last_deposit_rank, 1)"><span>领取红包</span></button>
              </li>
              <li class="my-ranking-item">
                <p>流水<template v-if="initInfo.self_data.last_water_rank > 0">
                    第 <b>{{ initInfo.self_data.last_water_rank }}</b> 名
                  </template>
                  <template v-else>未上榜</template>
                </p>
                <h5 v-if="initInfo.last_week_ranks">{{ initInfo.self_data.last_water_total | formatNumberByInteger }}</h5>
                <h5 v-else>待统计</h5>
                <button v-if="initInfo.joined_conf.water_rank.is_reward === 1"
                        @click="receiveBonus(initInfo.self_data.last_water_rank, 2)"><span>领取红包</span></button>
              </li>
              <li class="my-ranking-item">
                <p>盈利<template v-if="initInfo.self_data.last_profit_rank > 0">
                    第 <b>{{ initInfo.self_data.last_profit_rank }}</b> 名
                  </template>
                  <template v-else>未上榜</template>
                </p>
                <h5 v-if="initInfo.last_week_ranks">{{ initInfo.self_data.last_profit_total | formatNumberByInteger }}</h5>
                <h5 v-else>待统计</h5>
                <button v-if="initInfo.joined_conf.profit_rank.is_reward === 1"
                        @click="receiveBonus(initInfo.self_data.last_profit_rank, 3)"><span>领取红包</span></button>
              </li>
            </ul>
          </dd>
        </dl>
      </div>

      <!-- 本周榜单-->
      <div class="this-week">
        <h4>每日00:00:00更新最新榜单数据</h4>
        <div class="ranking">
          <template v-if="initInfo.current_week_ranks">
            <!-- 前三名-->
            <table class="top-list"  border="0" align="center" cellpadding="0" cellspacing="0" width="100%">
              <thead>
                <tr>
                  <th>排名</th>
                  <th>充值</th>
                  <th>流水</th>
                  <th>盈利</th>
                </tr>
              </thead>
              <tbody>
                  <tr v-for="(num, index) in currentWeekTopThree" :key="num">
                    <td :class="`tag-${num}`"></td>
                    <td width="28%">
                      <i :class="`icon-${num}`">
                        <img :src="initInfo.current_week_ranks.deposit_rank[index].head_image" alt="">
                      </i>
                      <p>{{ initInfo.current_week_ranks.deposit_rank[index].username }}</p>
                    </td>
                    <td  width="28%">
                      <i :class="`icon-${num}`">
                        <img :src="initInfo.current_week_ranks.water_rank[index].head_image" alt="">
                      </i>
                      <p>{{ initInfo.current_week_ranks.water_rank[index].username }}</p>
                    </td>
                    <td width="28%">
                      <i :class="`icon-${num}`">
                        <img :src="initInfo.current_week_ranks.profit_rank[index].head_image" alt="">
                      </i>
                      <p>{{ initInfo.current_week_ranks.profit_rank[index].username }}</p>
                    </td>
                  </tr>
                </tbody>
            </table>

            <!-- 其它名次-->
            <vue-seamless-scroll :data="initInfo.current_week_ranks.deposit_rank"
                                 :class-option="{autoPlay: initInfo.current_week_ranks.deposit_rank.length > 10}"
                                 class="hide-box">
              <ul class="pj-list">
                <li v-for="(num, index) in currentWeekOther" :key="num">
                  <small>{{ num + 3 }}</small>
                  <div class="user-item">
                    <i><img :src="initInfo.current_week_ranks.deposit_rank[index + 3].head_image" alt=""></i>
                    <p>{{ initInfo.current_week_ranks.deposit_rank[index + 3].username }}</p>
                  </div>
                  <div class="user-item">
                    <i><img :src="initInfo.current_week_ranks.water_rank[index + 3].head_image" alt=""></i>
                    <p>{{ initInfo.current_week_ranks.water_rank[index + 3].username }}</p>
                  </div>
                  <div class="user-item">
                    <i><img :src="initInfo.current_week_ranks.profit_rank[index + 3].head_image" alt=""></i>
                    <p>{{ initInfo.current_week_ranks.profit_rank[index + 3].username }}</p>
                  </div>
                </li>
              </ul>
            </vue-seamless-scroll>
          </template>
          <div v-else class="new-year2023-empty"><p>暂无排名</p></div>
        </div>

        <!-- 我的排名-->
        <dl v-if="initInfo.self_data" class="my-ranking">
          <dt></dt>
          <dd>
            <ul>
              <li class="my-ranking-item">
                <p>充值<template v-if="initInfo.self_data.this_deposit_rank > 0">
                    第 <b>{{ initInfo.self_data.this_deposit_rank }}</b> 名
                  </template>
                  <template v-else>未上榜</template>
                </p>
                <h5 v-if="initInfo.current_week_ranks">{{ initInfo.self_data.this_deposit_total | formatNumberByInteger }}</h5>
                <h5 v-else>待统计</h5>
              </li>
              <li class="my-ranking-item">
                <p>流水<template v-if="initInfo.self_data.this_water_rank > 0">
                    第 <b>{{ initInfo.self_data.this_water_rank }}</b> 名
                  </template>
                  <template v-else>未上榜</template>
                </p>
                <h5 v-if="initInfo.current_week_ranks">{{ initInfo.self_data.this_water_total | formatNumberByInteger }}</h5>
                <h5 v-else>待统计</h5>
              </li>
              <li class="my-ranking-item">
                <p>盈利<template v-if="initInfo.self_data.this_profit_rank > 0">
                    第 <b>{{ initInfo.self_data.this_profit_rank }}</b> 名
                  </template>
                  <template v-else>未上榜</template>
                </p>
                <h5 v-if="initInfo.current_week_ranks">{{ initInfo.self_data.this_profit_total | formatNumberByInteger }}</h5>
                <h5 v-else>待统计</h5>
              </li>
            </ul>
          </dd>
        </dl>
      </div>
    </div>

    <ul class="new-year2023-rules">
      <li>兔年充值王只计算会员的首充，会员每日充值在未发起提款前都视为首充。</li>
      <li>参与威客兔年风云榜排名前50的会员需于每周一在活动页面领取彩金，领取时间为每周一00:10:00-23:59:59，逾期则视为自动放弃，彩金将会自动派发至会员的主钱包中。</li>
      <li>彩金需完成活动规定的全站8倍有效流水。当用户钱包余额≤原钱包余额且无未结算注单时，系统将自动判定已完成活动规定的有效流水，彩金流水未完成前不可再次领取。</li>
      <li>此活动的兔年流水王领取当天不与威客雀王争霸赛活动共享；有效流水要求：电竞赔率＜1.5、亚洲盘赔率≤0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水；PT电子游戏中以下游戏不算有效流水：<activeptliushui color="#994925" styleClass="new-year2023-liushui" />。</li>
      <li>每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能使用一个账号享受优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利。本活动最终解释权归VKGAME所有。</li>
    </ul>
  </div>
</template>

<script>
import { formatNumberSplit } from "@/utils/util"
import { mapState } from 'vuex'

export default {
  name: 'billboardNewYear2023',
  data() {
    return {
      billboardContentList: [88888, 8888, 1888, 888, 588, 388, 188, 188, 188, 188, 58],
      initInfo: {
        last_week_ranks: null,
        current_week_ranks: null,
        joined_conf: {
          deposit_rank: { is_reward: 0 },
          water_rank: { is_reward: 0 },
          profit_rank: { is_reward: 0 },
        },
        self_data: {
          last_deposit_rank: 0,
          last_deposit_total: 0,
          last_profit_rank: 0,
          last_profit_total: 0,
          last_water_rank: 0,
          last_water_total: 0,
          this_deposit_rank: 0,
          this_deposit_total: 0,
          this_profit_rank: 0,
          this_profit_total: 0,
          this_water_rank: 0,
          this_water_total: 0
        },
      },
      loading: false,
      receiveLoading: false,
    }
  },
  watch: {
    isLogin() {
      this.initActiveData()
    }
  },
  computed: {
    ...mapState(["isLogin"]),

    lastWeekTopThree() {
      if (this.initInfo.last_week_ranks && this.initInfo.last_week_ranks.deposit_rank.length >= 3) {
        return 3
      }
      return this.initInfo.last_week_ranks.deposit_rank.length
    },

    lastWeekOther() {
      if (this.initInfo.last_week_ranks && this.initInfo.last_week_ranks.deposit_rank.length > 3) {
        return this.initInfo.last_week_ranks.deposit_rank.length - 3
      }
      return 0
    },

    currentWeekTopThree() {
      if (this.initInfo.current_week_ranks && this.initInfo.current_week_ranks.deposit_rank.length >= 3) {
        return 3
      }
      return this.initInfo.current_week_ranks.deposit_rank.length
    },

    currentWeekOther() {
      if (this.initInfo.current_week_ranks && this.initInfo.current_week_ranks.deposit_rank.length > 3) {
        return this.initInfo.current_week_ranks.deposit_rank.length - 3
      }
      return 0
    },
  },
  mounted () {
    this.initActiveData()
  },
  methods: {
    /**
     * 数据初始化
     * @return {Promise<void>}
     */
    async initActiveData() {
      this.loading = true
      try {
        const res = await this.$http(this.ApiSetting.active.newYear2023.rankingListInit)
        console.info("初始化2023新年活动风云榜信息：", res)
        if (res.status === 1 && res.data) {

          if (!res.data.is_login) {
            res.data.self_data = this.initInfo.self_data
          }
          this.initInfo = res.data
        }
        this.loading = false
      } catch (error) {
        console.info(error)
        this.loading = false
      }
    },

    /**
     * 领取红包
     * @param rank
     * @param rankType
     * @return {Promise<void>}
     */
    async receiveBonus(rank, rankType) {
      if (this.receiveLoading) return
      this.receiveLoading = true
      if (this.loading) {
        this.$message({ message: "数据加载中，请稍等...", type: "warning" })
        return
      }
      const params = { rank, rank_type: rankType }
      console.info("2023新年活动风云榜领取红包入参：", params)
      try {
        const res = await this.$http(this.ApiSetting.active.newYear2023.joinRankingBonus, params)
        console.info("2023新年活动风云榜领取红包响应：", res)
        if (res.status === 1) {
          this.initActiveData()

          this.$emit("receiveAwardFn", {
            type: 1,
            title: res.data.item_name,
            icon: require("../.././../../assets/active/newYear2023/money_red_packet.png"),
            waterMultiple: 8
          })
        }
        this.receiveLoading = false
      } catch (error) {
        console.info(error)
        this.receiveLoading = false
      }
    }
  },
  filters: {
    formatNumberByInteger (value) {
      const amount = formatNumberSplit(value)
      const result = amount.substring(0, amount.length - 3)
      if (result[0] === "-" && result[1] === ",") {
        return result.replace(/,/, '')
      }
      return result
    }
  }
}
</script>

<style lang="less" scoped>
.billboard-new-year2023 {
  .billboard-content {
    width: 1084px;
    height: 708px;
    margin: 40px auto 0;
    background: url("../../../../assets/active/newYear2023/billboard_content_bg.png");
    overflow: hidden;
    dt {
      font-size: 16px;
      text-align: center;
      color: #994925;
      margin: 98px auto 0;
      text-shadow: 0px 1px 1px rgba(184, 54, 18, 0.35);
    }
    dd {
      margin: 32px auto 0;
      table {
        width: 960px;
        margin: 0 auto;
        text-align: center;
        border-radius: 6px;
        overflow: hidden;
        tr {
          th {
            line-height: 50px;
            background-color: #a7442d;
            font-size: 18px;
            color: #fff;
            &:first-child {
              border-top-left-radius: 6px;
            }
            &:last-child {
              border-top-right-radius: 6px;
            }
          }
          td {
            box-sizing: border-box;
            border-right: 1px solid #ac3b36;
            border-bottom: 1px solid #ac3b36;
            width: 20%;
            line-height: 40px;
            font-size: 18px;
            font-weight: bold;
            color: #d0450f;
            &:first-child {
              font-size: 14px;
              color: #994925;
              font-weight: normal;
              border-left: 1px solid #ac3b36;
              text-shadow: 0px 1px 1px rgba(184, 54, 18, 0.35);
            }
          }
          &:nth-child(2) {
            td {
              &:last-child {
                font-size: 18px;
                color: #994925;
                font-weight: normal;
                position: relative;
                text-shadow: 0px 1px 1px rgba(184, 54, 18, 0.35);
                &::before {
                  position: absolute;
                  bottom: -1px;
                  right: -1px;
                  content: "";
                  width: inherit;
                  height: 40px;
                  box-sizing: border-box;
                  border-right: 1px solid #ac3b36;
                  border-bottom: 1px solid #ac3b36;
                  border-bottom-right-radius: 6px;
                }
              }
            }
          }
          &:last-child {
            td {
              &:first-child {
                position: relative;
               &::before {
                 position: absolute;
                 top: 1px;
                 left: -1px;
                 content: "";
                 width: inherit;
                 height: 40px;
                 box-sizing: border-box;
                 border-left: 1px solid #ac3b36;
                 border-bottom: 1px solid #ac3b36;
                 border-bottom-left-radius: 6px;
               }
              }
            }
          }
        }
      }
    }
  }

  .week-list {
    display: flex;
    justify-content: space-between;
    width: 1080px;
    margin: 40px auto 0;

    .last-week, .this-week {
      width: 524px;
      height: 1248px;
    }
    .last-week, .this-week {
      background: url("../../../../assets/active/newYear2023/last_week_bg.png");
    }
    .this-week {
      background: url("../../../../assets/active/newYear2023/this_week_bg.png");
    }

    .ranking {
      width: 472px;
      height: 898px;
      margin: 110px auto 0;
      border-radius: 20px;
      border: solid 1px rgba(253, 213, 143, 0.8);
      overflow: hidden;

      table {
        text-align: center;

        thead {
          tr {
            background-color: rgba(242,156,46, 0.3);
            th {
              line-height: 68px;
              font-size: 16px;
              font-weight: normal;
              color: #904015;
            }
          }
        }

        tbody {
          position: relative;

          &:before {
            position: absolute;
            content: "";
            width: 448px;
            height: 318px;
            top: 12px;
            left: 12px;
            border-radius: 20px;
            border: solid 2px rgba(227, 160, 83, 0.3);
            pointer-events: none;
          }

          tr {
            &:first-child {
              td {
                padding-top: 12px;
              }
            }
            td {
              &.tag-1 {
                background: url("../../../../assets/active/newYear2023/user_rank_1.png") no-repeat 30px center;
              }
              &.tag-2 {
                background: url("../../../../assets/active/newYear2023/user_rank_2.png") no-repeat 30px center;
              }
              &.tag-3 {
                background: url("../../../../assets/active/newYear2023/user_rank_3.png") no-repeat 30px center;
              }
            }

            &:nth-child(even) {
              background: url("../../../../assets/active/newYear2023/bill_table_2.png") no-repeat center top;
            }

            td {
              height: 106px;
              font-size: 14px;
              color: #a75a2b;

              .icon-1, .icon-2, .icon-3 {
                display: block;
                width: 61px;
                height: 66px;
                line-height: 75px;
                text-align: center;
                margin: 0 auto;
                img {
                  border-radius: 50%;
                  width: 42px;
                  height: 42px;
                }
              }

              .icon-1 {
                background: url("../../../../assets/active/newYear2023/user_rank_1_bor.png") no-repeat;
              }

              .icon-2 {
                background: url("../../../../assets/active/newYear2023/user_rank_2_bor.png") no-repeat;
              }

              .icon-3 {
                background: url("../../../../assets/active/newYear2023/user_rank_3_bor.png") no-repeat;
              }

              p {
                width: 80%;
                margin: 0 auto;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
          }
        }
      }

      .hide-box {
        margin: 15px auto 0;
        width: 448px;
        height: 476px;
        border-radius: 12px;
        overflow: hidden;
        .pj-list {
          li {
            height: 68px;
            border-radius: 12px;
            display: flex;

            small {
              display: block;
              width: 15%;
              font-size: 18px;
              line-height: 68px;
              text-align: center;
              color: #c1420b;
            }

            .user-item {
              display: flex;
              align-items: center;
              width: 28%;
              overflow: hidden;
              box-sizing: border-box;
              border-bottom: 1px solid rgba(236,169,91,0.5);

              i {
                display: inline-block;
                width: 32px;
                height: 32px;
                margin-right: 9px;
                background: url("../../../../assets/active/newYear2023/other_user_bor.png") no-repeat;
                border-radius: 50%;
                vertical-align: middle;
                text-align: center;
                line-height: 30px;
                overflow: hidden;

                img {
                  width: 28px;
                  height: 28px;
                  border-radius: 50%;
                }
              }

              p {
                display: inline-block;
                width: calc(100% - 32px - 20px);
                font-size: 14px;
                line-height: 68px;
                color: #a75a2b;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
          }
        }
      }
    }


    .this-week {
      h4 {
        height: 19px;
        margin-top: 80px;
        font-size: 14px;
        text-align: center;
        color: #994925;
        font-weight: normal;
      }
      .ranking {
        margin: 10px auto 0;
      }
    }

    .my-ranking {
      width: 472px;
      height: 180px;
      margin: 24px auto 0;
      border-radius: 20px;
      border: solid 1px rgba(253, 213, 143, 0.8);
      background-color: rgba(245,145,30,.2);

      dt {
        height: 21px;
        background: url("../../../../assets/active/newYear2023/my-ranking_title.png") no-repeat center top;
        margin-top: 11px;
      }
      dd {
        ul {
          display: flex;
          justify-content: space-between;
          margin-top: 18px;
          .my-ranking-item {
            width: calc(100% / 3);
            height: 100px;
            border-right: 1px solid #eca95b;
            box-sizing: border-box;
            text-align: center;
            &:last-child {
              border: 0;
            }
            p {
              font-size: 14px;
              color: #a75a2b;
              b {
                color: #c1420b;
              }
            }
            h5 {
              font-size: 20px;
              font-weight: normal;
              color: #c1420b;
              margin-top: 7px;
            }
            button {
              width: 96px;
              height: 44px;
              margin-top: 15px;
              outline: 0;
              border: 0;
              cursor: pointer;
              font-weight: normal;
              background: url("../../../../assets/active/newYear2023/week_take_can.png") no-repeat;
              background-size: 100% 100%;
              position: relative;
              transition: filter 0.1s;
              span {
                position: absolute;
                width: inherit;
                text-align: center;
                font-size: 14px;
                left: 0;
                top: 10px;
                background-image: linear-gradient(to bottom, #ffffff, #ffd598);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
              }
              &:hover {
                filter: contrast(140%);
              }
            }
          }
        }
      }
    }
  }

  .new-year2023-rules {
    height: 446px;
    background: url("../../../../assets/active/newYear2023/billboard_rule_bg.png");
    li {
      &:first-child {
        margin-top: 90px;
      }
    }
  }
}
</style>
