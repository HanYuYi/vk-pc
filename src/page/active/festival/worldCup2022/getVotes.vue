<template>
  <div class="get-votes">

    <div class="center-box">
      <!-- 方法一-->
      <dl class="mode mode-1">
        <dt class="head">
          <img src="../../../../assets/active/worldCup2022/get_votes_mode_1.png" class="title">
          <p class="desc">等级≥VIP1的会员每天可以免费获得一次打call机会，同一个战队累计打call 3次，即可免费获得一张选票。</p>
        </dt>
        <dd class="content">
          <img src="../../../../assets/active/worldCup2022/get_votes_mode_1_icon.png">
          <div class="oper-btn">
            <button @click="mode1ToCall"><span class="world-cup2022-gradient-color">去打CALL</span></button>
          </div>
        </dd>
      </dl>

      <!-- 方法二-->
      <dl class="mode mode-2">
        <dt class="head">
          <img src="../../../../assets/active/worldCup2022/get_votes_mode_2.png" class="title">

          <ul class="world-cup2022-second-tabs oper-group">
            <li v-for="(txt, index) in ['今日首充金额', '虚拟币充值额外兑换']"
                :key="index"
                @click="mode2ActiveIndex = index"
                :class="{active: mode2ActiveIndex === index}">
              {{ txt }}
            </li>
          </ul>
        </dt>
        <dd class="content">
          <div v-show="mode2ActiveIndex === 0">
            <p class="desc">会员每日首充金额达到指定额度，即可兑换1张选票，会员需要依次按照档次层级兑换，<span>500元、1,000元、3,000元、5,000元</span>每个档次每日仅限兑换一次，<span>10,000元档次可以无限兑换</span>。</p>

            <div class="step-process">
              <div class="process" :style="{width: `${calcProcess(
                voteData.mode2.available_deposit,
                voteData.mode2.deposit_vote_times,
                mode2StepList)}px`}">
              </div>
              <div v-for="(row, index) in mode2StepList"
                   :key="index"
                   :style="{left: `${row.x}px`}"
                   class="step" :class="[
                     {can: index !== mode2StepList.length - 1 ?
                        (voteData.mode2.available_deposit >= row.value && voteData.mode2.deposit_vote_times === index) :
                        (voteData.mode2.available_deposit >= row.value && voteData.mode2.deposit_vote_times >= mode2StepList.length - 1)
                     },
                     {already: index !== mode2StepList.length - 1 ? (voteData.mode2.deposit_vote_times >= index + 1) : false}
                   ]">
                <div class="step-wrapper">
                  <h6 class="amount">{{ row.value }}元</h6>

                  <button v-if="voteData.mode2.deposit_vote_times >= index + 1 && index !== mode2StepList.length - 1" class="to-btn already"><span>已兑换</span></button>
                  <button v-else-if="buttonStatusByLast(
                      index,
                      mode2StepList,
                      voteData.mode2.available_deposit,
                      voteData.mode2.deposit_vote_times
                    )"
                          class="to-btn can"
                          :class="{'sway-fade':  isLogin}"
                          @click="exchangeVotes({ type: 1, from: 1 })">
                    <span>兑换</span>
                  </button>
                  <button v-else class="to-btn">
                    <span>兑换</span>
                  </button>
                </div>
              </div>
            </div>
            <div class="placeholder-el"></div>
            <p class="my-quota">今日当前首充可兑换额度：<span>{{ formatNumber(voteData.mode2.available_deposit) }}</span> 元</p>

          </div>
          <div v-show="mode2ActiveIndex === 1" class="type-2">
            <img src="../../../../assets/active/worldCup2022/get_votes_mode2_type_2.png">
          </div>

          <div class="oper-btn two">
            <template v-if="mode2ActiveIndex === 0">
              <button v-if="buttonStatusByQuick(mode2StepList, voteData.mode2.available_deposit, voteData.mode2.deposit_vote_times)"
                      @click="exchangeVotes({ type: 0, from: 1 })">
                <span class="world-cup2022-gradient-color">一键兑换</span>
              </button>
              <button v-else class="exchange">
                <span class="world-cup2022-gradient-color">一键兑换</span>
              </button>
            </template>
            <template v-if="mode2ActiveIndex === 1">
              <button v-if="!isLogin || voteData.mode2.virtual_exchange"
                      @click="exchangeVotes({ type: 1, from: 6 })">
                <span class="world-cup2022-gradient-color">立即领取</span>
              </button>
              <button v-else class="exchange">
                <span class="world-cup2022-gradient-color">立即领取</span>
              </button>
            </template>
            <router-link v-if="isLogin" to="/user/finance/">
              <span class="world-cup2022-gradient-color">立即充值</span>
            </router-link>
            <button v-else @click="$message({ message: '请您先登录', type: 'warning' })">
              <span class="world-cup2022-gradient-color">立即充值</span>
            </button>
          </div>
        </dd>
      </dl>

      <!-- 方法三-->
      <dl class="mode mode-3">
        <dt class="head">
          <img src="../../../../assets/active/worldCup2022/get_votes_mode_3.png" class="title">
          <p class="desc">会员每日体育流水达到指定额度，即可兑换1张选票，会员需要依次按照档次层级兑换，<span>100元、500元、1,000元、5,000元、10,000元</span>每个档次每日仅限兑换一次，<span>50,000元档次可以无限兑换</span>。</p>
        </dt>
        <dd class="content">
          <div class="step-process">
            <div class="process" :style="{width: `${calcProcess(
              voteData.mode3.available_water,
              voteData.mode3.water_vote_times,
              mode3StepList)}px`}">
            </div>
            <div v-for="(row, index) in mode3StepList"
                 :key="index"
                 :style="{left: `${row.x}px`}"
                 class="step" :class="[
                   {can: index !== mode3StepList.length - 1 ?
                        (voteData.mode3.available_water >= row.value && voteData.mode3.water_vote_times === index) :
                        (voteData.mode3.available_water >= row.value && voteData.mode3.water_vote_times >= mode3StepList.length - 1)
                     },
                   {already: index !== mode3StepList.length - 1 ? (voteData.mode3.water_vote_times >= index + 1) : false}
                 ]">
              <div class="step-wrapper">
                <h6 class="amount">{{ row.value }}元</h6>

                <button v-if="voteData.mode3.water_vote_times >= index + 1 && index !== mode3StepList.length - 1" class="to-btn already"><span>已兑换</span></button>
                <button v-else-if="buttonStatusByLast(
                    index,
                    mode3StepList,
                    voteData.mode3.available_water,
                    voteData.mode3.water_vote_times
                  )"
                        class="to-btn can"
                        :class="{'sway-fade':  isLogin}"
                        @click="exchangeVotes({ type: 1, from: 2 })">
                  <span>兑换</span>
                </button>
                <button v-else class="to-btn">
                  <span>兑换</span>
                </button>
              </div>
            </div>
          </div>
          <div class="placeholder-el"></div>
          <p class="my-quota">今日当前流水可兑换额度：<span>{{ formatNumber(voteData.mode3.available_water) }}</span> 元</p>

          <div class="oper-btn two">
            <button v-if="buttonStatusByQuick(mode3StepList, voteData.mode3.available_water, voteData.mode3.water_vote_times)"
                    @click="exchangeVotes({ type: 0, from: 2 })">
              <span class="world-cup2022-gradient-color">一键兑换</span>
            </button>
            <button v-else class="exchange">
              <span class="world-cup2022-gradient-color">一键兑换</span>
            </button>
            <router-link v-if="isLogin" to="/pbsports">
              <span class="world-cup2022-gradient-color">立即投注</span>
            </router-link>
            <button v-else @click="$message({ message: '请您先登录', type: 'warning' })">
              <span class="world-cup2022-gradient-color">立即投注</span>
            </button>
          </div>
        </dd>
      </dl>

      <!-- 方法四-->
      <dl class="mode mode-4">
        <dt class="head">
          <img src="../../../../assets/active/worldCup2022/get_votes_mode_4.png" class="title">
          <p class="desc">可在V币商城无限次兑换选票，还有更多精彩礼品在等待着您。
            <el-popover trigger="hover"
                        placement="bottom"
                        popper-class="p-worldCup2022-exchange"
                        width="258">
              <div class="exchange-level--popover">
                <table border="0" align="center" cellspacing="0" width="100%">
                  <thead>
                    <tr>
                      <th>等级</th>
                      <th>兑换次数</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(num, index) in [2, 3, 3, 5, 5, 8, 8, 10, 10, 13, 13, 20]" :key="index">
                      <td>VIP{{ index + 1 }}</td>
                      <td>{{ num }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div slot="reference"><span>查看兑换说明</span></div>
            </el-popover>
          </p>
        </dt>
        <dd class="content">
          <img src="../../../../assets/active/worldCup2022/mode_4_icon.png">
          <div class="oper-btn">
            <router-link to="/vbmarket"><span class="world-cup2022-gradient-color">前往商城兑换</span></router-link>
          </div>
        </dd>
      </dl>
    </div>

    <!-- 规则-->
    <dl class="rules">
      <dt><img src="../../../../assets/active/worldCup2022/get_votes_rule_title.png"></dt>
      <dd>
        <ul>
          <li><i>1</i><p>全平台等级≥VIP1的会员均可参与此活动，每位会员可以免费获得一张选票。</p></li>
          <li><i>2</i><p>未发起提款前的充值都被计算为首充。</p></li>
          <li><i>3</i><p>会员每日首充达到指定金额，即可兑换一张选票，会员在成功兑换后会扣除相应档位的充值额度，会员需要依次按照档次层级兑换，500元、1,000元、3,000元、5,000元每个档次每日仅限兑换一次，10,000元档次可以无限兑换。</p></li>
          <li><i>4</i><p>若用户当日使用虚拟币USDT首充任意金额，即可兑换一张选票。仅限当日兑换，隔日则无效。</p></li>
          <li><i>5</i><p>威客体育游戏包括：威客体育、FB体育、BTI体育、平博体育、皇冠体育、沙巴体育、IM体育，每日体育流水达到指定金额即可兑换1张选票，会员在成功兑换后会扣除相应档位的流水额度，会员需要依次按照档次层级兑换，100元、500元、1,000元、5,000元、10,000元每个档次每日仅限兑换一次，50,000元档次可以无限兑换。</p></li>
          <li><i>6</i><p>当日的首充与流水额度，仅限当日兑换，次日系统将会刷新首充与流水额度。</p></li>
          <li><i>7</i><p>等级≥VIP1的会员每天可以免费获得一次打call机会，仅限当日使用，隔日则无效。</p></li>
          <li><i>8</i><p>会员为同一个战队累计打call每满3次，即可免费获得一张选票。</p></li>
          <li><i>9</i><p>每位有效玩家、每个手机号码、电子邮箱、IP地址、每张银行卡、每台设备只能享受一次优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利；VKGAME对本活动保有最终解释权。</p></li>
        </ul>
      </dd>
    </dl>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import { formatNumberSplit } from '@/utils/util'

export default {
  name: 'getVotes',
  props: ["voteData"],
  data() {
    return {
      // 进度条总长
      PROCESS_TOTAL_WIDTH: 924,

      mode2ActiveIndex: 0,
      mode2StepList: [
        { value: 500, x: 57, composition: 500 },
        { value: 1000, x: 211, composition: 1500 },
        { value: 3000, x: 372, composition: 4500 },
        { value: 5000, x: 532, composition: 9500 },
        { value: 10000, x: 837, composition: 19500 }
      ],
      mode2VoteData: {},

      mode3StepList: [
        { value: 100, x: 57, composition: 100 },
        { value: 500, x: 189, composition: 600 },
        { value: 1000, x: 323, composition: 1600 },
        { value: 5000, x: 463, composition: 6600 },
        { value: 10000, x: 608, composition: 16600 },
        { value: 50000, x: 837, composition: 66600 }
      ],

      exchangeVoteLoading: false
    }
  },
  computed: {
    ...mapState(['isLogin'])
  },
  methods: {
    formatNumber(amount){
      return formatNumberSplit(amount)
    },

    // 方法一：去打call
    mode1ToCall() {
      this.$emit("changeTabs")
    },

    /**
     * 计算进度条长度
     * @param available
     * @param times
     * @param stepList
     * @return {number}
     */
    calcProcess(available, times, stepList) {
      let width = 0
      if (times <= 0 && available <= 0) return width
      if (available > stepList[stepList.length - 1].composition) return this.PROCESS_TOTAL_WIDTH
      if (times >= stepList.length && available > 0) return this.PROCESS_TOTAL_WIDTH
      if (times > stepList.length) return this.PROCESS_TOTAL_WIDTH


      let status = false
      for (let i = 0; i < stepList.length; i++) {
        // 已兑换过
        if (times > 0) {
          if (available === 0) {
            if (times > stepList.length) {
              return this.PROCESS_TOTAL_WIDTH
            } else {
              return stepList[times - 1].x
            }
          }
          const _width = stepList[times - 1].x
          if (available > 0 && i > times - 1) {
            if (available === stepList[i].composition - stepList[times - 1].composition) {
              width = stepList[i].x
              break
            } else if (available > stepList[i].composition - stepList[times - 1].composition) {
              if (i === stepList.length - 1) {
                width = this.PROCESS_TOTAL_WIDTH
              } else {
                width = stepList[i].x + (stepList[i + 1].x - stepList[i].x) / 2
              }
              status = true
            } else {
              if (!status) {
                width = _width + (stepList[times].x - stepList[times - 1].x) / 2
              }
            }
          }
        } else {
          // 未兑换过
          if (available === stepList[i].composition) {
            width = stepList[i].x
            break
          } else if (available > 0 && available < stepList[i].composition) {
            width = stepList[i].x / 2
            break
          } else if (available > stepList[i].composition && available < stepList[i + 1].composition) {
            width = stepList[i].x + (stepList[i + 1].x - stepList[i].x) / 2
            break
          } else if (available > stepList[stepList.length - 1].composition) {
            width = this.PROCESS_TOTAL_WIDTH
            break
          }
        }
      }
      return width
    },

    // 判断高亮的进度条按钮
    buttonStatusByLast(index, list, available, times) {
      if (!this.isLogin) return true
      // 已经领取过
      if (times > 0) {
        // 非最后一个按钮
        if (index !== list.length - 1) {
          return available >= list[index].composition - list[index - 1].composition && times === index
        } else {
          // 最后一个按钮
          // 兑换次数到倒数第二层级的时候
          if (times === list.length - 1) {
            return available >= list[list.length - 1].composition - list[times - 1].composition
          } else if (times >= list.length) {
            // 兑换次数到最后层级的时候
            return Math.floor(available / list[list.length - 1].value) > 0
          } else {
            return false
          }
        }
      } else {
        return available >= list[0].composition && index === 0
      }
    },

    // 判断高亮的一键领取按钮
    buttonStatusByQuick(list, available, times) {
      if (!this.isLogin) return true
      if (available >= list[list.length - 1].value) return true
      if (available >= list[0].value) {
        let canTimes = 0
        for (let i = 0; i < list.length; i++) {
          if (available >= list[i].value) {
            canTimes++
          }
        }
        return times < canTimes
      }
      return false
    },

    // 兑换选票
    async exchangeVotes(params) {
      if (!this.isLogin) {
        this.$message({ message: '请您先登录', type: 'warning' })
        return
      }
      if (this.exchangeVoteLoading) return
      this.exchangeVoteLoading = true
      console.info("2022世界杯兑换选票入参：", params)
      const res = await this.$http(this.ApiSetting.active.worldCup2022.exchangeVote, params)
      console.info("2022世界杯兑换选票响应：", res)

      if (res.status === 1 && res.data) {
        this.$message({ message: res.message, type: 'success' })
        this.$parent.init()
      }
      this.exchangeVoteLoading = false
    }

  }
}
</script>

<style lang="less" scoped>
.get-votes {
  .center-box {
    width: 1240px;
    margin: 0 auto;

    .mode {
      margin-top: 63px;
      .head {
        border-top: 0.1px solid transparent;
        text-align: center;
        .title {
          pointer-events: none;
        }
        .desc {
          margin: 14px auto 0;
        }
      }

      .desc {
        width: 815px;
        margin: 0 auto;
        font-size: 14px;
        line-height: 25px;
        text-align: center;
        color: #fff;
        span {
          color: #fff7a6;
        }
      }
      .content {
        border-top: 0.1px solid transparent;
        text-align: center;
        background-image: linear-gradient(90deg, transparent 5%, #7d1f37 50%, transparent 100%);
        box-shadow: 44px 3px 51px 0 rgba(17, 10, 10, 0.41);
        position: relative;
        &:before {
          position: absolute;
          left: 0;
          top: 0;
          content: "";
          width: 100%;
          height: 1px;
          background-image: linear-gradient(90deg, transparent 5%, #f34064 50%, transparent 100%);
        }
        .oper-btn {
          height: 90px;
          text-align: center;
          padding-bottom: 7px;
          button, a {
            display: inline-block;
            font-size: 16.5px;
            font-weight: bold;
            width: 205px;
            height: inherit;
            outline: 0;
            border: 0;
            cursor: pointer;
            background: url("../../../../assets/active/worldCup2022/my_guess.png") no-repeat center top;
            position: relative;
            &:hover {
              background: url("../../../../assets/active/worldCup2022/my_guess_hover.png") no-repeat center top;
            }
            span {
              position: absolute;
              inset: 0;
              height: 21px;
              top: 19px;
            }
          }
          &.two {
            margin-top: 17px;
            background: none;
            display: flex;
            justify-content: center;
            button, a {
              width: 205px;
              height: 90px;
              background: url("../../../../assets/active/worldCup2022/my_guess.png") no-repeat center top;
              position: relative;
              span {
                position: absolute;
                inset: 0;
                top: 19px;
                display: block;
              }
              &:hover {
                background: url("../../../../assets/active/worldCup2022/my_guess_hover.png") no-repeat center top;
              }
              &:first-child {
                margin-right: -8px;
              }
              &:last-child {
                margin-left: -8px;
              }
              &.exchange {
                &:hover {
                  background: url("../../../../assets/active/worldCup2022/my_guess.png") no-repeat center top;
                }
                cursor: no-drop;
                opacity: 0.4;
              }
            }
          }
        }

        // step
        .step-process {
          margin: 0 auto;
          width: 930px;
          height: 10px;
          box-sizing: border-box;
          border-radius: 5px;
          box-shadow: 0px 1px 1px 0 rgba(255, 0, 57, 0.5), inset 0px 1px 3px 0 rgba(0, 0, 0, 0.4);
          border-color: rgba(0, 0, 0, 0.06);
          background-color: rgba(69, 8, 30, 0.2);
          position: relative;
          .process {
            position: absolute;
            top: 2px;
            left: 3px;
            height: 6px;
            border-radius: 3px;
            background-image: linear-gradient(to bottom, #fff, #fff690);
            transition: width 0.3s;
          }
          .step {
            position: absolute;
            top: -4px;
            width: 16px;
            height: 16px;
            border: solid 1px #981846;
            background-color: #000;
            border-radius: 50%;
            &:before {
              position: absolute;
              top: 3px;
              left: 3px;
              content: "";
              width: 10px;
              height: 10px;
              border-radius: 50%;
              background-image: linear-gradient(to right, #B3083E, #7a1232);
            }
            .step-wrapper {
              position: absolute;
              left: -53px;
              top: 17px;
              .amount {
                margin-top: 11px;
                font-family: Roboto;
                font-size: 14px;
                font-weight: bold;
                text-align: center;
                color: #fff;
              }
              .to-btn {
                margin-top: 18px;
                outline: 0;
                border: 0;
                width: 124px;
                height: 73px;
                line-height: 0;
                font-size: 14px;
                color: #fff;
                background: url("../../../../assets/active/worldCup2022/diamond_btn.png") no-repeat center top;
                position: relative;
                opacity: 0.4;
                cursor: no-drop;
                span {
                  position: absolute;
                  inset: 0;
                  top: 5px;
                  left: 18px;
                  width: 88px;
                  height: 31px;
                  display: block;
                  line-height: 30px;
                }

                &.can {
                  cursor: pointer;
                  opacity: 1;
                  &:hover {
                    background: url("../../../../assets/active/worldCup2022/diamond_btn_hover.png") no-repeat center top;
                  }
                  &.sway-fade {
                    animation: sway 2s infinite;
                  }
                  @keyframes sway {
                    0%{transform:rotate(0)}
                    10%{transform:rotate(-15deg)}
                    20%{transform:rotate(15deg)}
                    30%{transform:rotate(-15deg)}
                    40%{transform:rotate(15deg)}
                    50%{transform:rotate(0)}
                    100%{transform:rotate(0)}
                  }
                }
                &.already {
                  cursor: auto;
                  opacity: 1;
                  background: url("../../../../assets/active/worldCup2022/get_votes_diamond_diasbled.png") no-repeat center 2px;
                  &:hover {
                    background: url("../../../../assets/active/worldCup2022/get_votes_diamond_diasbled.png") no-repeat center 2px;
                  }
                  span {
                    opacity: 0.7;
                  }
                }
              }
            }
            &.can, &.already {
              border-color: #fff7a6;
              background-color: transparent;
              background-image: linear-gradient(to right, #B3083E, #7a1232);
              &:before {
                top: 4px;
                left: 4px;
                width: 8px;
                height: 8px;
                background-image: none;
                background-color: #fff7a6;
              }
              .step-wrapper {
                .amount {
                  color: #fff7a6;
                }
              }
            }
          }
        }

        .placeholder-el {
          height: 88px;
        }

        .my-quota {
          margin-top: 35px;
          font-size: 14px;
          text-align: center;
          color: #fff;
          span {
            font-family: Roboto;
            font-size: 20px;
            font-weight: bold;
            color: #fff7a6;
          }
        }
      }
    }

    .mode-1 {
      margin-top: 52px;
      .content {
        margin-top: 17px;
        img {
          margin-top: 42px;
        }
      }
    }

    .mode-2 {
      .head {
        .oper-group {
          justify-content: center;
          margin-top: 19px;
          li {
            &:last-child {
              width: 235px;
              background: url("../../../../assets/active/worldCup2022/get_votes_2_2.png") no-repeat;
              &.active {
                background: url("../../../../assets/active/worldCup2022/get_votes_2_2_hover.png") no-repeat;
              }
            }
          }
        }
      }
      .content {
        margin-top: -10px;
        .desc {
          margin: 33px auto 0;
        }

        .step-process {
          margin: 37px auto 0;
        }

        .type-2 {
          padding: 53px 0 18px;
        }
      }
    }

    .mode-3 {
      .content {
        margin-top: 24px;
        .step-process {
          margin: 51px auto 0;
        }
      }
    }

    .mode-4 {
      .head {
        .desc {
          span {
            cursor: pointer;
            &>div {
              display: inline-block;
            }
            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
      .content {
        margin-top: 24px;
        padding-top: 45px;
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
<style lang="less">
.p-worldCup2022-exchange {
  box-shadow: 0px 15px 24px 0 rgba(0, 0, 0, 0.31);
  border-style: solid;
  border-width: 2px;
  border-image-source: linear-gradient(to top, #bc9d7f, #bd9f82, #eadfd4, #ffe7cb);
  border-image-slice: 1;
  background-color: #872139;
  padding: 10px 5px;
  .exchange-level--popover {
    width: 252px;
    margin: 0 auto;
    table {
      width: 100%;
      border: solid 1px #c2546e;
      box-sizing: border-box;
      line-height: 30px;
      font-size: 12px;
      text-align: center;
      background-color: #872139;
      tr {
        th {
          color: #591328;
          background-image: linear-gradient(to bottom, #fff, #ffe9c7);
          border-right: 1px solid #c2546e;
          border-bottom: 1px solid #c2546e;
        }
        td {
          width: 50%;
          color: #fff;
          border-right: 1px solid #c2546e;
          border-bottom: 1px solid #c2546e;
        }
      }
      tbody {
        tr {
          &:nth-child(even) {
            background-color: #9a2742;
          }
          &:last-child {
            border: 0;
          }
        }
      }
    }
  }

  .popper__arrow {
    border-width: 9px;
    &:after {
      top: 3px!important;
      border-top-color: #872139!important;
      border-bottom-color: #872139!important;
    }
  }
  &[x-placement^=bottom] {
    .popper__arrow {
      border-top-color: #ffe7cb!important;
      border-bottom-color: #ffe7cb!important;
      top: -9px!important;
    }
  }
  &[x-placement^="top"] {
    .popper__arrow {
      bottom: -9px;
      border-top-color: #bc9d7f!important;
      border-bottom-color: #bc9d7f!important;
      &:after {
        top: -9px !important;
      }
    }
  }
}
</style>
