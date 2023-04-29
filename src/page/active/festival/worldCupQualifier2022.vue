<template>
  <div class="active_page worldCupQualifier2022">
    <div class="active_page_wrapper">
      <div class="wrapper">
        <div class="top_bg">
          <div class="bg1"></div>
          <div class="bg2"></div>
        </div>
        <div class="active_page_content">
          <div class="active_section_box" style="margin-bottom: 20px">
            <div class="active_title">活动时间</div>
            <div class="section_box_wrapper">
              <div class="active_time">{{initInfo.active_show_time}}</div>
            </div>
          </div>
          <div v-if="initInfo.team_setting.length" class="active_section_box" style="margin-bottom: 20px">
            <div class="match-box">
              <div class="match-container">
                <ul class="match-list" :style="{width: `${initInfo.team_setting.length * (252 + 38)}px`, transform: `translateX(${matchPosX}px)`}">
                  <li v-for="(item, index) in initInfo.team_setting" :key="index">
                    <h3>{{ item.show_date }}</h3>
                    <div class="pk-main">
                      <div class="left">
                        <img :src="item.team_left_icon">
                        <p>{{ item.team_left_title }}</p>
                      </div>
                      <div class="time">{{ item.show_time }}</div>
                      <div class="right">
                        <img :src="item.team_right_icon">
                        <p>{{ item.team_right_title }}</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="match-switch">
                <div @click="matchController('prev')" class="switch prev" :class="{disabled: prevDisabled}"></div>
                <div @click="matchController('next')" class="switch next" :class="{disabled: nextDisabled}"></div>
              </div>
            </div>
          </div>
          <div class="active_section_box">
            <div class="active_title">{{$t("Active_content")}}</div>

            <ul class="active-tab">
              <li @click="activeIndex = 1" :class="{actived: activeIndex === 1}">世界杯预选赛逐鹿</li>
              <li @click="activeIndex = 2" :class="{actived: activeIndex === 2}">为中国助力加油！</li>
            </ul>

            <div v-show="activeIndex === 1">
              <div class="section_box_wrapper">
                <div class="active_time">会员在威客体育，投注世界杯预选赛赛事，有效投注额≥1088元并满足总进球数，即可联系客服申请活动彩金！</div>
                <table border="1" align="center" cellspacing="0" width="100%">
                  <thead>
                  <tr>
                    <th width="20%">有效投注额</th><th width="20%">进球总数为0</th><th width="20%">进球总数≥3</th><th width="20%">进球总数≥5</th><th width="20%">流水要求</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>≥1088元</td>
                    <td>10元</td>
                    <td>8元</td>
                    <td>18元</td>
                    <td rowspan="4">全站1倍流水</td>
                  </tr>
                  <tr>
                    <td>≥5188元</td>
                    <td>38元</td>
                    <td>36元</td>
                    <td>68元</td>
                  </tr>
                  <tr>
                    <td>≥20220元</td>
                    <td>108元</td>
                    <td>88元</td>
                    <td>188元</td>
                  </tr>
                  <tr>
                    <td>≥50220元</td>
                    <td>188元</td>
                    <td>138元</td>
                    <td>588元</td>
                  </tr>
                  </tbody>
                </table>
                <div class="btn">
                  <div class="d_btn normal"><router-link :to="initInfo.go_bet_link">去投注</router-link></div>
                  <div class="d_btn normal" @click="openKfWindow()">联系客服</div>
                </div>
              </div>
            </div>

            <div v-show="activeIndex === 2">
              <div class="section_box_wrapper">
                <div class="active_time">会员投注世界杯预选赛中国队赛事，单场赛事有效投注额≥1000元，即可享受返水加码！</div>
                <table border="1" align="center" cellspacing="0" width="100%">
                  <thead>
                  <tr>
                    <th>活动场馆</th><th>有效投注额</th><th>返水加码比例</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>威客体育</td>
                    <td>≥1000</td>
                    <td>0.16%</td>
                  </tr>
                  </tbody>
                </table>
                <div class="btn">
                  <div class="d_btn normal"><router-link :to="initInfo.go_bet_link">去投注</router-link></div>
                </div>
              </div>
            </div>

            <div class="active_section_box">
              <div class="active_title">{{$t("Activity_rules")}}</div>
              <div class="section_box_wrapper">
                <div class="active_desc">
                  <p>
                    1. 活动一，会员在威客体育中投注指定世界杯预选赛赛事，单场赛事中累计有效投注达到指定金额并且双方队伍进球总数达到指定个数，满足条件的会员需在注单结算后24小时之内联系在线客服申请活动彩金，逾期则视为自动放弃。<br>
                    2. 活动一，会员联系客服申请活动彩金后，活动彩金将在24小时之内派发至会员的主钱包中，彩金仅需全站1倍有效流水即可出款。流水未完成前不可再次申请此活动。<br>
                    3. 活动二，会员投注指定中国队赛事，单场赛事累计投注≥1000即可获得返水加码奖励，彩金将于比赛结束第二天自动派发！例：会员威客体育返水为0.40%，若会员满足活动参与条件，则会员的威客体育返水为0.40%+0.16%=0.56%。<br>
                    4. 本活动不计算加时赛、点球大战。参与此活动的会员需在威客体育投注让球、大小、单双、独赢四个盘口，允许投注全场、半场、滚球盘、早盘（不包括特殊盘口）。盘口要求：投注指定赛事的赔率不得低于欧盘1.75、亚洲盘及马来盘0.75。<br>
                    5. 活动二，彩金需完成全站1倍有效流水。有效流水要求：电竞赔率＜1.5、亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水；PT电子游戏中以下游戏不算有效流水：<activeptliushui></activeptliushui>。<br>
                    6. 此活动每位会员每日仅限申请一次。<br>
                    7. 每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能使用一个账号享受优惠。对违规的用户，VKGAME保留无限期审核， 和扣回红利及所产生的利润权利，本活动最终解释权归VKGAME所有。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="btn back_active_nav">
        <router-link to="/active" class="botton normal">{{$t("Return_to_activity_page")}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'worldCupQualifier2022',
  data () {
    return {
      activeIndex: 1,
      matchPosX: 0,
      prevDisabled: true,
      nextDisabled: false,
      initInfo: {
        go_bet_link: '',
        team_setting: []
      }
    }
  },
  mounted () {
    this.initActiveData()
  },
  methods: {
    initActiveData () {
      this.$http(this.ApiSetting.active.worldCupPreInit).then(res => {
        if (res.status === 1 && res.data) {
          this.initInfo = res.data
          // 定位当前赛事位置
          if (this.initInfo.team_setting.length > 2) {
            const currentIndex = this.initInfo.team_setting.findIndex((currentValue) => {
              return currentValue.status === 1
            })
            if (currentIndex > 1) {
              for (let i = 0; i < currentIndex / 2; i++) {
                this.matchController('next')
              }
            }
          } else {
            this.prevDisabled = this.nextDisabled = true
          }
        }
      })
    },
    // 控制战队切换
    matchController (dir) {
      if (dir === 'prev') {
        if (this.matchPosX < 0) {
          this.matchPosX += 290 * 2
          this.prevDisabled = this.matchPosX >= 0
          this.nextDisabled = 290 * this.initInfo.team_setting.length - Math.abs(this.matchPosX) <= 290 * 2
        }
      }
      if (dir === 'next') {
        const notEnd = 290 * this.initInfo.team_setting.length - Math.abs(this.matchPosX) > 290 * 2
        if (notEnd) {
          this.matchPosX -= 290 * 2
          this.prevDisabled = this.matchPosX >= 0
          this.nextDisabled = 290 * this.initInfo.team_setting.length - Math.abs(this.matchPosX) <= 290 * 2
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.worldCupQualifier2022 {
  background: url("../../../assets/active/worldCupQualifier2022/banner.jpg") no-repeat center top;
  .match-box {
    width: 686px;
    margin: 0 auto;
    position: relative;
    .match-container {
      width: 580px;
      margin: 0 auto;
      overflow: hidden;
      .match-list{
        transition: transform 0.3s;
        li {
          overflow: hidden;
          display: inline-block;
          width: 252px;
          height: 152px;
          background: url("../../../assets/active/worldCupQualifier2022/match_bg.png");
          margin: 0 19px;
          h3 {
            font-weight: normal;
            text-align: center;
            margin-top: 16px;
            font-size: 14px;
            color: #fff;
          }
          .pk-main {
            width: 212px;
            margin: 16px auto 0;
            display: flex;
            justify-content: space-between;
            .left, .right {
              img {
                pointer-events: none;
                width: 60px;
                height: 60px;
              }
              p {
                width: 60px;
                text-align: center;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 14px;
                color: #ffffff;
              }
            }
            .time {
              font-size: 20px;
              line-height: 20px;
              margin-top: 18px;
              font-weight: bold;
              color: #fff;
            }
          }
        }
      }
    }

    .match-switch {
      position: absolute;
      width: 100%;
      top: 43px;
      .switch {
        position: absolute;
        width: 35px;
        height: 46px;
        cursor: pointer;
        &.prev {
          left: 0;
          background: url("../../../assets/active/worldCupQualifier2022/prev.png");
          background-size: 100% 100%;
          &.disabled {
            background: url("../../../assets/active/worldCupQualifier2022/prev_disabled.png");
            background-size: 100% 100%;
            cursor: auto;
          }
        }
        &.next {
          right: 0;
          background: url("../../../assets/active/worldCupQualifier2022/next.png");
          background-size: 100% 100%;
          &.disabled {
            background: url("../../../assets/active/worldCupQualifier2022/next_disabled.png");
            background-size: 100% 100%;
            cursor: auto;
          }
        }
      }
    }
  }

  .active-tab {
    display: flex;
    justify-content: center;
    font-size: 24px;
    margin: 20px 0;
    li {
      width: 287px;
      height: 53px;
      background: url("../../../assets/active/worldCupQualifier2022/tab.png");
      text-align: center;
      line-height: 53px;
      margin: 0 11px;
      cursor: pointer;
      color: #ffffff;
      &.actived {
        background: url("../../../assets/active/worldCupQualifier2022/tab_actived.png");
        color: #262933;
      }
    }
  }

  .section_box_wrapper {
    table {
      border: none;
      margin: 20px 0 20px;

      td, th {
        border-color: #303344;
        text-align: center;
        height: 43px;
        color: #c3c3c3;
        font-size: 14px;
      }

      th {
        font-size: 16px;
        font-weight: 400;
        color: #07f1b7;
      }
    }
  }

  .btn {
    display: flex;
    justify-content: center;
    margin: 30px 0 20px;
    .d_btn {
      margin: 0 17px;
      a {
        display: block;
        color: #000;
        &:hover {
          color: #fff;
        }
      }
    }
  }
  .back_active_nav {
    margin: 20px 0 0 0;
  }
}
</style>
