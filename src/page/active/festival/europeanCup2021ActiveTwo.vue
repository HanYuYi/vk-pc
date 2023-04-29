<template>
  <div class="europeanCup2021ActiveTwo">
    <h1 class="active-title"></h1>
    <div class="active-desc">
      <p>{{ activeInfo.date }}</p>
      <p>威客电竞VIP会员在活动存款时间内存款并参与指定体育赛事的盘口投注，若单笔注单结算为负盈利，即可申请注单包赔，领取包赔金。</p>
    </div>

    <ul class="apply-panel" :style="{'justify-content': activeInfo.applyList.length === 2 ? 'space-evenly' : 'space-between'}">
      <li v-for="(item, index) in activeInfo.applyList" :key="index" @click="item.status ? null : openApplydialog(index)" :class="{'disabled': item.status}">
        <h5 class="match-date">{{ item.date_time }}</h5>
        <div class="pk-main">
          <div class="flag-box"><img :src="item.l_team_logo" alt=""><span>{{ item.l_team_name }}</span></div>
          <em>VS</em>
          <div class="flag-box"><img :src="item.r_team_logo" alt=""><span>{{ item.r_team_name }}</span></div>
        </div>
        <button class="apply-btn" v-if="!item.status">申请包赔金</button>
        <p class="disabled-text" v-else v-html="item.txt"></p>
      </li>
    </ul>

    <table class="apply-table">
      <tr><td>会员要求</td><td>存款金额</td><td>单笔投注金额</td><td>包赔返利</td><td>包赔金额最高</td><td>流水要求</td></tr>
      <tr><td>VIP0</td><td rowspan="13">≥500</td><td rowspan="13">≥500</td><td>15%</td><td>88元</td><td rowspan="13">3倍体育</td></tr>
      <tr><td>VIP1</td><td>15%</td><td>88元</td></tr>
      <tr><td>VIP2</td><td>15%</td><td>128元</td></tr>
      <tr><td>VIP3</td><td>18%</td><td>188元</td></tr>
      <tr><td>VIP4</td><td>18%</td><td>218元</td></tr>
      <tr><td>VIP5</td><td>20%</td><td>288元</td></tr>
      <tr><td>VIP6</td><td>20%</td><td>388元</td></tr>
      <tr><td>VIP7</td><td>25%</td><td>588元</td></tr>
      <tr><td>VIP8</td><td>25%</td><td>888元</td></tr>
      <tr><td>VIP9</td><td>30%</td><td>1288元</td></tr>
      <tr><td>VIP10</td><td>30%</td><td>1388元</td></tr>
      <tr><td>VIP11</td><td>50%</td><td>1688元</td></tr>
      <tr><td>VIP12</td><td>50%</td><td>1888元</td></tr>
    </table>

    <ul class="active_rules">
      <li>1. 存款时间定义：每场赛事开赛前24小时内的累计存款，每次存款时间内的存款只可申请一次保险注单活动。 例：A场保单赛事时间为2月19日04:00，有效存款时间为2月18日04:00-2月19日04:00，在此期间会员累计存款≥500；若会员参与本场赛事投注，单笔投注额≥500即可参加A场保单赛事。</li>
      <li>2. 参与包赔优惠的会员需要在体育赛事（威客体育、平博Sports、BTi体育）投注独赢，让球，大小，单双四个盘口，允许投注上半场或全场及滚球（不包括特殊盘口）；盘口赔率要求：投注指定赛事的赔率不得低于欧盘1.75、亚洲盘及马来盘0.75。</li>
      <li>3. 申请包赔金的注单需为全输，若会员所投注的注单结算为输一半则视为无效注单，不可申请。</li>
      <li>4. 符合条件的会员需在注单结算后的24小时之内在此页面填写注单单号手动进行领取彩金，逾期则视为自动放弃。</li>
      <li>5. 包赔金将在审核通过后的3日内派发至用户指定的体育钱包（威客体育、平博Sports、BTi体育三选一）中，包赔金需在所选游戏中完成对应的流水要求，流水未完成前不可再次申请本活动；当用户对应体育钱包余额≤原钱包余额且无未结算注单时，系统将自动判定已完成活动规定的有效流水。香港盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、印尼盘≤0.75、走盘、注单取消、对冲等情况都不算有效流水。</li>
      <li>6. 包赔单活动每场赛事仅限200个包赔名额，先到先得。此活动不与平台体育首存、体育救援金活动共享。若用户参与了体育首存，需先完成体育首存活动流水才可参加本活动；同样体育救援金与体育包赔活动不共享，活动同时进行时，只可选择一个参加。</li>
      <li>7. 赛事取消或改期或其他原因导致赛事不能正常进行，则对应当期的保险投注优惠取消；若保单赛事因官方原因改变赛事时间，则有效存款时间从原开赛时间前24小时开始计算。</li>
      <li>8. 每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能使用一个账号享受优惠。对违规的用户，VKGAME保留无限期审核， 和扣回红利及所产生的利润权利，本活动最终解释权归VKGAME所有。</li>
    </ul>

    <!-- 选择包赔dailog-->
    <el-dialog
      :visible.sync="applyDialogRowDialogVisible"
      custom-class="dialog-panel"
      width="617px"
      :close-on-click-modal="false">
      <div class="dialog-main">
        <h1>申请包赔金</h1>
        <ul class="main-form">
          <li>
            <span class="form-tit">比赛名称:</span>
            <span class="form-main">
              <small class="current-match">{{ applyDialogRow.selectedRow.l_team_name }} vs {{ applyDialogRow.selectedRow.r_team_name }} {{ applyDialogRow.selectedRow.date_time }}</small>
            </span>
          </li>
          <li>
            <span class="form-tit">选择平台:</span>
            <span class="form-main">
              <span v-for="(item, index) in platformList" :key="index" @click="applyDialogRow.platformValue = item.code" class="form-radio">
                <i :class="{active: applyDialogRow.platformValue === item.code}"></i>{{ item.name }}
              </span>
            </span>
          </li>
          <li>
            <span class="form-tit">注单单号:</span>
            <span class="form-main">
              <input v-model="applyDialogRow.oddNumbers" type="text" autocomplete="off" placeholder="请输入投注记录中的注单单号" maxlength="32" class="num-input"/>
            </span>
          </li>
          <li>
            <span class="form-tit">申请包赔:</span>
            <span v-if="isLogin" class="form-main">您当前等级 <em class="form-keyword">VIP {{ userInfo.user_lever }}</em>， 可获得 <em class="form-keyword">{{ appleLeverList[userInfo.user_lever].rebate }}%</em> 包赔返利，最高可获得 <em class="form-keyword">{{ appleLeverList[userInfo.user_lever].bonus }}</em> 元彩金。</span>
          </li>
        </ul>
        <button :disabled="buttonLoading" @click="confirmEuropeCupWelfare">提交申请</button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: 'europeanCup2021ActiveTwo',
    props: {
      platformList: { type: Array, required: true }
    },
    data() {
      return {
        buttonLoading: false,
        activeInfo: {
          date: '',
          applyList: []
        },
        appleLeverList: [
          { rebate: 15, bonus: 88 },
          { rebate: 15, bonus: 88 },
          { rebate: 15, bonus: 128 },
          { rebate: 18, bonus: 188 },
          { rebate: 18, bonus: 218 },
          { rebate: 20, bonus: 288 },
          { rebate: 20, bonus: 388 },
          { rebate: 25, bonus: 588 },
          { rebate: 25, bonus: 888 },
          { rebate: 30, bonus: 1288 },
          { rebate: 30, bonus: 1388 },
          { rebate: 50, bonus: 1688 },
          { rebate: 50, bonus: 1888 }
        ],
        applyDialogRow: {
          selectedRow: {},
          platformValue: this.platformList[0] ? this.platformList[0].code : '',
          oddNumbers: ''
        },
        applyDialogRowDialogVisible: false
      }
    },
    computed: {
      ...mapState(['isLogin', 'userInfo'])
    },
    watch: {
      isLogin() {
        this.getEuropeCupCover()
      },
      applyDialogRowDialogVisible(bool) {
        if (!bool && this.platformList && this.platformList.length) {
          this.applyDialogRow.platformValue = this.platformList[0].code
          this.applyDialogRow.oddNumbers = ''
        }
      }
    },
    mounted() {
      this.getEuropeCupCover()
    },
    methods: {
      getEuropeCupCover() {
        this.$http(this.ApiSetting.active.europeanCup2021.getEuropeCupCover)
          .then(response => {
            if (response.status === 1) {
              this.activeInfo.date = response.data.active_info.active_time
              this.activeInfo.applyList = response.data.group
            }
          })
      },
      // 申请包赔
      openApplydialog(index) {
        if (!this.isLogin) {
          return this.$message({ message: '请您先登录', type: 'warning' })
        } else {
          if (!this.activeInfo.applyList[index].status) {
            this.applyDialogRow.selectedRow = this.activeInfo.applyList[index]
            this.applyDialogRowDialogVisible = true
          }
        }
      },
      // 提交包赔申请
      confirmEuropeCupWelfare() {
        if (!this.applyDialogRow.oddNumbers) {
          return this.$message({ message: '请填写注单单号', type: 'warning' })
        }
        if (!this.applyDialogRow.platformValue) {
          return this.$message({ message: '请选择平台', type: 'warning' })
        }
        const params = {
          to: this.applyDialogRow.platformValue,
          orderSN: this.applyDialogRow.oddNumbers,
          play: this.applyDialogRow.selectedRow.id
        }
        this.buttonLoading = true
        this.$http(this.ApiSetting.active.europeanCup2021.getEuropeCupWelfare, params)
          .then(response => {
            if (response.status === 1) {
              this.$emit('handleactive2Tip', response.message)
              this.applyDialogRowDialogVisible = false
            }
            this.buttonLoading = false
          })
      }
    }
  }
</script>

<style lang="less" scoped>
  .europeanCup2021ActiveTwo {

    .active-title {
      width: 100%;
      height: 117px;
      background: url("../../../assets/active/europeanCup2021/bar_2_title.png") no-repeat;
    }

    .active-desc {
      text-align: center;
      color: #a6ecf6;
      font-size: 20px;
      line-height: 30px;
      margin-top: 5px;
    }

    .apply-panel {
      display: flex;
      width: 100%;
      margin-top: 40px;
      margin-bottom: 65px;

      li {
        width: 404px;
        height: 171px;
        background: url("../../../assets/active/europeanCup2021/active2_apply_bg.png") no-repeat;
        background-size: 100% 100%;
        transition: all .3s;
        cursor: pointer;

        .match-date {
          display: block;
          text-align: center;
          font-size: 18px;
          color: #ffffff;
          font-weight: normal;
          line-height: 1.14;
          margin-top: 11px;
        }

        .pk-main {
          display: flex;
          width: 341px;
          margin: -17px auto 0;

          .flag-box {
            width: 152px;
            height: 152px;
            background: url("../../../assets/active/europeanCup2021/active2_country_bg.png");
            text-align: center;
            position: relative;

            img {
              width: 66px;
              height: 66px;
              border-radius: 50%;
              margin: 44px 0 0;
            }

            span {
              position: absolute;
              bottom: 20px;
              right: 0;
              width: 100%;
              font-size: 16px;
              color: #ffffff;
            }
          }

          em {
            display: inline-block;
            width: 37px;
            margin-right: 5px;
            font-size: 26.5px;
            line-height: 136px;
            font-weight: bold;
            color: #ffffff;
            font-style: italic;
          }
        }

        .apply-btn {
          width: 404px;
          height: 63px;
          background: url("../../../assets/active/europeanCup2021/active2_apply_btn.png") no-repeat;
          background-size: 100% 100%;
          font-size: 26.5px;
          font-weight: bold;
          letter-spacing: 2.65px;
          color: #ffffff;
          outline: 0;
          border: 0;
          cursor: pointer;
          margin-top: 17px;
          transition: all .3s;
        }

        &.disabled {
          cursor: auto;

          &:hover {
            background: url("../../../assets/active/europeanCup2021/active2_apply_bg.png") no-repeat;
            background-size: 100% 100%;
          }
        }

        &:hover {
          background: url("../../../assets/active/europeanCup2021/active2_apply_bg_hover.png") no-repeat;
          background-size: 100% 100%;
        }

        &:hover .apply-btn {
          background: url("../../../assets/active/europeanCup2021/active2_apply_btn_hover.png") no-repeat;
          background-size: 100% 100%;
          color: #acf5ff;
        }

        .disabled-text {
          display: flex;
          width: 404px;
          height: 63px;
          font-size: 18px;
          letter-spacing: 1.8px;
          text-align: center;
          color: #ffffff;
          margin-top: 17px;
          align-items: center;
          justify-content: center;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }

    .apply-table {
      width: 1240px;
      background-color: #044b57;
      color: #ffffff;
      font-size: 20px;
      border-radius: 5px;
      overflow: hidden;
      border: solid 1px #0b98ae;
      margin-top: 120px;

      tr {
        td {
          font-weight: normal;
          text-align: center;
          border: 1px solid #0b98ae;
          line-height: 50px;
        }
      }
    }

    .active_rules {
      width: 100%;
      height: 470px;
      background: url("../../../assets/active/europeanCup2021/active2_rules.png") no-repeat;
      margin-top: 79px;
      padding-top: 90px;

      li {
        width: 1177px;
        margin: 0 auto;
        font-size: 16px;
        line-height: 1.88;
        color: #a6ecf6;
      }
    }

    /deep/ .dialog-panel {
      height: 385px;
      margin-top: calc((100vh - 385px) / 2) !important;
      background: url("../../../assets/active/europeanCup2021/active2_dialog.png");

      .dialog-main {
        text-align: left;

        .main-form {
          width: 425px;
          margin: 8px auto 0;

          li {
            margin-top: 18px;

            .form-tit {
              font-size: 16px;
              color: #ffffff;
              vertical-align: top;
            }

            .form-main {
              display: inline-block;
              width: 340px;
              margin-left: 11px;
              font-size: 16px;
              color: #ffffff;

              .current-match {
                display: inline-block;
                width: 332px;
                line-height: 26px;
                padding-left: 8px;
                border-radius: 4px;
                background-color: #8fc6ce;
              }

              .form-radio {
                margin-right: 25px;
                cursor: pointer;
                line-height: 21px;

                i {
                  display: inline-block;
                  width: 16px;
                  height: 16px;
                  vertical-align: middle;
                  margin-right: 10px;
                  background: url("../../../assets/active/europeanCup2021/radio_box.png");

                  &.active {
                    background: url("../../../assets/active/europeanCup2021/radio_hover.png");
                  }
                }

                &:last-child {
                  margin-right: 0;
                }
              }

              .num-input {
                width: 324px;
                line-height: 26px;
                padding: 0 8px;
                border-radius: 4px;
                background-color: #8fc6ce;
                border: 0;
                color: #ffffff;

                &::-webkit-input-placeholder {
                  color: #29747d;
                }
                &::-moz-placeholder {
                  color: #29747d;
                }
                &:-ms-input-placeholder {
                  color: #29747d;
                }
              }

              .form-keyword {
                color: #27e6ff;
              }
            }
          }
        }
      }
    }
  }
</style>
