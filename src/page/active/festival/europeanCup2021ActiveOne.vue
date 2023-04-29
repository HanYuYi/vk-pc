<template>
  <div class="europeanCup2021ActiveOne">
    <h1 class="active-title"></h1>
    <div class="active-desc">
      <p>{{ activeInfo.date }}</p>
      <p>活动期间会员投注欧洲杯赛事，达到指定投注额即可获得彩金，每满666元即可提现并免费获得一次幸运转盘抽奖机会。</p>
    </div>

    <div class="bets-panel">
      <ul>
        <li v-for="(item, index) in activeInfo.betsList" :key="index" :class="{'active': item.codeNum === 'true'}">
          <h1><span>￥</span>{{ item.rewardAmount }}</h1>
          <h3>{{ item.codeNum === "true" ? '已累计' : '待获取' }}</h3>
          <p>投注额 ≥ {{ item.betsAmount }}</p>
        </li>
      </ul>
      <div class="progress-panel">
        <div class="progress-box">
          <div class="progress" :style="{'width': `${1110 / 3 * currentAmountIndex}px`}">
            <div class="progress-tip">
              <div class="tip-icon"></div>
              <div class="tip-desc">今日彩金获得进度</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="luck_draw">
      <div class="left">
        <div class="total-amount"><span :class="{dont: !activeInfo.totalAmount }">￥</span>{{ activeInfo.totalAmount }}</div>
        <button @click="getAmountRowMethod" class="get-btn">领取666彩金</button>
      </div>
      <div class="right">
        <LuckyWheel
          ref="LuckyWheel"
          width="510px"
          height="510px"
          :prizes="luckDrawOptions.prizes"
          :blocks="luckDrawOptions.blocks"
          :buttons="luckDrawOptions.buttons"
          :defaultConfig="luckDrawOptions.defaultConfig"
          @start="startCallBack"
          @end="endCallBack"
        />
        <div class="remaining-times">{{ isLogin ? `剩${activeInfo.remainingTimes}次` : '请登录' }}</div>
      </div>
    </div>

    <ul class="active_rules">
      <li>1. 此优惠活动将计算VIP会员在威客体育、平博Sports、BTi体育这三个平台中投注欧洲杯赛事累计有效流水。 </li>
      <li>2. VIP会员每日累计流水对应的彩金将自动叠加至存钱罐中，当存钱罐中的彩金满足666元时，VIP会员可选择提现彩金并额外获得一次抽取幸运转盘的机会。</li>
      <li>3. 储蓄罐彩金需手动领取，提现所获得的666元彩金需在对应体育游戏中完成3倍有效流水；当会员存钱罐满足666元并已经领取之后，存钱罐金额将会自动扣减，重新计算。若活动结束会员的存钱罐未满足666元，则视为自动放弃。</li>
      <li>4. 此活动彩金需在体育游戏中完成对应的流水要求；当会员对应体育钱包余额≤原钱包余额且无未结算注单时，系统将自动判定已完成活动规定的有效流水。香港盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、印尼盘≤0.75、走盘、注单取消、对冲等情况都不算有效流水。</li>
      <li>5. 每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能使用一个账号享受优惠。对违规的用户，VKGAME保留无限期审核， 和扣回红利及所产生的利润权利，本活动最终解释权归VKGAME所有。</li>
    </ul>

    <!-- 领取彩金dialog-->
    <el-dialog
      :visible.sync="getAmountRowDialogVisible"
      custom-class="dialog-panel amount-dialog"
      width="623px"
      :close-on-click-modal="false">
      <div class="dialog-main">
        <h1>领取彩金</h1>
        <ul :style="{'justify-content': platformList.length < 3 ? 'space-evenly' : 'space-between'}">
          <li v-for="(item, index) in platformList" :key="index" :class="{active: item.code === platformType}" @click="platformType = item.code">{{ item.name }}</li>
        </ul>
        <button :disabled="buttonLoading" @click="confirmAmountRowMethod">确认转入</button>
      </div>
    </el-dialog>

    <!-- 抽奖结果dialog-->
    <el-dialog
      :visible.sync="luckDraw.dialogVisible"
      custom-class="dialog-panel luck-dialog"
      width="623px"
      :close-on-click-modal="false">
      <div class="dialog-main">
        <h1>恭喜获奖</h1>
        <img :src="luckDraw.icon_url" alt="">
        <h5>{{ luckDraw.good_title }}</h5>
        <h5>价值：{{ luckDraw.money }}</h5>
        <b v-if="luckDraw.ex_code">兑换码：{{ luckDraw.ex_code }} <span @click="$copyText(luckDraw.ex_code)">复制</span></b>
        <small :class="{top: !luckDraw.ex_code}">{{ luckDraw.ex_code ? '备份兑换码也向您的站内信信箱中发放了一份,您也可以从那里找到它。' : '您的奖励已自动划入您的账户，进入个人中心即可查看！' }}</small>
        <button v-if="luckDraw.ex_code" @click="openKfWindow()">联系客服领奖</button>
        <button v-else @click="luckDraw.dialogVisible = false">知道了</button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import LuckDraw from 'vue-luck-draw'
  import { mapState } from 'vuex'

  export default {
    name: 'europeanCup2021ActiveOne',
    data() {
      return {
        buttonLoading: false,
        activeInfo: {
          date: '',
          totalAmount: 0,
          betsList: [
            {
              rewardAmount: 28,
              betsAmount: '2,000',
              code: 'one'
            },
            {
              rewardAmount: 58,
              betsAmount: '10,000',
              code: 'two'
            },
            {
              rewardAmount: 88,
              betsAmount: '50,000',
              code: 'three'
            }
          ],
          remainingTimes: 0,
        },
        luckDrawOptions: {
          prizes: [],
          buttons: [{
            radius: '50px',
            imgs: [{ src: require('../../../assets/active/europeanCup2021/luckDraw_go.png'), width: '130%', top: '-175%' }]
          }],
          blocks: [
            { padding: '52px', imgs: [{ src: require('../../../assets/active/europeanCup2021/luckDraw_bg.png'), width: '100%', rotate: true }] },
            { padding: '0px' },
          ],
          defaultConfig: {
            gutter: '2.5px'
          },
        },
        getAmountRow: {},
        getAmountRowDialogVisible: false,
        luckDraw: {
          dialogVisible: false
        },
        luckDrawStatus: false,
        platformList: [],
        platformType: '',
        luckDrawSpinning: false
      }
    },
    computed: {
      ...mapState(['isLogin']),
      currentAmountIndex() {
        let num = 0
        for(let i =0; i < this.activeInfo.betsList.length; i++) {
          if (this.activeInfo.betsList[i].codeNum === 'true') {
            num = i + 1
          }
        }
        return num;
      }
    },
    watch: {
      isLogin() {
        this.getEuropeCupInit()
      },
      getAmountRowDialogVisible(bool) {
        if (!bool && this.platformList && this.platformList.length) {
          this.platformType = this.platformList[0].code
        }
      }
    },
    mounted() {
      this.getEuropeCupInit()
    },
    methods: {
      // 获取活动信息
      getEuropeCupInit () {
        this.$http(this.ApiSetting.active.europeanCup2021.getEuropeCupInit)
          .then(response => {
            if (response.status === 1) {
              for(let i = 0; i < this.activeInfo.betsList.length; i++) {
                this.$set(this.activeInfo.betsList[i], 'codeNum', response.data.bet[this.activeInfo.betsList[i].code])
              }
              this.activeInfo.totalAmount = response.data.bet_money
              this.activeInfo.date = response.data.active_info.active_time
              this.activeInfo.remainingTimes = response.data.lucky_times
              this.platformList = response.data.game
              this.platformType = response.data.game[0].code
              this.luckDrawOptions.prizes = response.data.good_list && response.data.good_list.length ? this.filterLuckDrawPrizes(response.data.good_list) : []
              if (!response.data.good_list.length) {
                this.luckDrawSpinning = true
              }
              this.$emit('sendPlatformList', response.data.game)
            }
          })
      },
      // 处理转盘的值
      filterLuckDrawPrizes(arr) {
        for(let i = 0;i < arr.length;i++) {
          if (arr[i].desc.includes('十日') || arr[i].desc.includes('iPhone')) {
            arr[i].background = '#c7d64f'
          } else {
            arr[i].background = '#b1f6fe'
          }
          arr[i].title = arr[i].desc
          arr[i].fonts = [{ text: `${arr[i].desc}\n价值: ${Number.parseInt(arr[i].money)}${arr[i].money_type === 1 ? '元' : arr[i].money_type === 2 ? 'V币' : ''}`, wordWrap: false, top: 18, fontSize: '16px' }]
          if (arr[i].desc.includes('V币')) arr[i].imgs = [{ src: require('../../../assets/active/europeanCup2021/luckDraw_vb.png'), width: '45%', top: '35%' }]
          if (arr[i].desc.includes('棒球帽')) arr[i].imgs = [{ src: require('../../../assets/active/europeanCup2021/luckDraw_mz.png'), width: '45%', top: '35%' }]
          if (arr[i].desc.includes('红包')) arr[i].imgs = [{ src: require('../../../assets/active/europeanCup2021/luckDraw_hb.png'), width: '50%', top: '35%' }]
          if (arr[i].desc.includes('足球')) arr[i].imgs = [{ src: require('../../../assets/active/europeanCup2021/luckDraw_zq.png'), width: '50%', top: '35%' }]
          if (arr[i].desc.includes('iPhone')) arr[i].imgs = [{ src: require('../../../assets/active/europeanCup2021/luckDraw_iPhone.png'), width: '46%', top: '35%' }]
          if (arr[i].desc.includes('十日')) arr[i].imgs = [{ src: require('../../../assets/active/europeanCup2021/luckDraw_sry.png'), width: '70%', top: '35%' }]
        }
        return arr
      },
      // 开始抽奖，获取奖品
      startCallBack () {
        if (!this.isLogin) {
          return this.$message({ message: '请您先登录', type: 'warning' })
        }
        // 转盘旋转中...
        if (this.luckDrawSpinning) return
        if (this.activeInfo.remainingTimes) {
          this.$refs.LuckyWheel.play()
          this.luckDrawSpinning = true
          let timer;
          clearTimeout(timer)
          timer = setTimeout(() => {
            this.$http(this.ApiSetting.active.europeanCup2021.getEuropeLottey)
              .then(response => {
                let LuckyWheelIndex = 0
                if (response.status === 1) {
                  for (let i = 0; i < this.luckDrawOptions.prizes.length;i++) {
                    if (this.luckDrawOptions.prizes[i].id === response.data.good_id) {
                      LuckyWheelIndex = i
                      break;
                    }
                  }
                  this.luckDraw = { ...response.data }
                  this.getEuropeCupInit()
                  this.luckDrawStatus = true
                } else {
                  this.luckDraw = {}
                }
                this.$refs.LuckyWheel.stop(LuckyWheelIndex)
              })
          }, 3000)
        } else {
          this.$message({ message: '剩余次数不足，请累计彩金获得次数哦！', type: 'warning' })
        }
      },
      // 抽奖完成，转盘停止旋转
      endCallBack () {
        if (this.luckDrawStatus) {
          this.$set(this.luckDraw, 'dialogVisible', true)
          this.luckDrawStatus = false
        }
        this.luckDrawSpinning = false
      },
      // 领取666彩金
      getAmountRowMethod() {
        if (!this.isLogin) {
          return this.$message({ message: '请您先登录', type: 'warning' })
        }
        if (this.activeInfo.totalAmount < 666) {
          return this.$message({ message: '累计彩金不足，请累计超过 666 元彩金后再来领取哦！', type: 'warning' })
        }
        this.getAmountRowDialogVisible = true
      },
      // 提交领取的彩金
      confirmAmountRowMethod() {
        if (!this.platformType) {
          return this.$message({ message: '请选择平台', type: 'warning' })
        }
        this.buttonLoading = true
        this.$http(this.ApiSetting.active.europeanCup2021.exEuropeCupMoeny, { type: this.platformType })
        .then(response => {
          if (response.status === 1) {
            this.$emit('handleactive1Tip', response.message)
            this.getAmountRowDialogVisible = false
            this.getEuropeCupInit()
          }
          this.buttonLoading = false
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .europeanCup2021ActiveOne {
    .active-title {
      width: 100%;
      height: 117px;
      background: url("../../../assets/active/europeanCup2021/bar_1_title.png") no-repeat;
    }

    .active-desc {
      text-align: center;
      color: #a6ecf6;
      font-size: 20px;
      line-height: 30px;
      margin-top: 5px;
    }

    .bets-panel {
      margin-top: -32px;

      ul {
        display: flex;

        li {
          width: calc(1240px / 3);
          height: 329px;
          background: url("../../../assets/active/europeanCup2021/active1_bets_amount.png");

           h1 {
             font-size: 78.5px;
             color: #029fb4;
             margin: 120px 0 0 140px;

             span {
               font-size: 30px;
               font-weight: normal;
               margin-right: -5px;
             }
           }

          h3 {
            font-size: 26px;
            font-weight: normal;
            color: #03a0b6;
            text-align: center;
            margin-top: 11px;
          }

          p {
            font-size: 22px;
            color: #c7d64f;
            text-align: center;
            margin-top: 23px;
          }

          &.active {
            background: url("../../../assets/active/europeanCup2021/active1_bets_amount_active.png");

            h1 {
              color: #edff5e;
            }

            h3, p {
              color: #ffffff;
            }
          }
        }
      }

      .progress-panel {
        margin-top: 36px;

        .progress-box {
          width: 1110px;
          height: 10px;
          border-radius: 5px;
          background-color: #044b57;
          margin: 0 auto;

          .progress {
            width: 0;
            height: 10px;
            border-radius: 5px;
            border: solid 2px #2ab0c3;
            background-color: #bbf6ff;
            box-sizing: border-box;
            box-shadow: 1px 0 4px 0 #bbf6ff;
            position: relative;

            .progress-tip {
              width: 148px;
              position: absolute;
              right: -72px;
              top: -59px;
              text-align: center;

              .tip-icon {
                display: inline-block;
                width: 60px;
                height: 60px;
                background: url("../../../assets/active/europeanCup2021/active1_progress_icon.png");
                animation: tip-icon-side 1s ease-out infinite;
              }

              @keyframes tip-icon-side {
                0% {transform: translateY(0px);}
                30% {transform: translateY(-50px);}
                100% {transform: translateY(0px);}
              }

              .tip-desc {
                font-size: 18px;
                color: #a6ecf6;
                margin-top: 13px;
              }
            }
          }
        }
      }
    }

    .luck_draw {
      display: flex;
      width: 1032px;
      margin: 0 auto;

      .left {
        width: 457px;
        height: 495px;
        background: url("../../../assets/active/europeanCup2021/active1_luck_left.png");
        position: relative;
        margin: 64px 65px 0 0;

        .total-amount {
          position: absolute;
          width: 200px;
          height: 105px;
          top: 210px;
          left: 122px;
          text-align: center;
          line-height: 105px;
          font-size: 64px;
          font-weight: bold;
          letter-spacing: -3.2px;
          color: #167886;

          span {
            font-size: 33.5px;
            font-weight: normal;
            margin-right: -2px;

            &.dont {
              margin-right: -2px;
            }
          }
        }

        .get-btn {
          position: absolute;
          outline: 0;
          border: 0;
          top: 350px;
          left: 114px;
          width: 224px;
          height: 77px;
          background: url("../../../assets/active/europeanCup2021/active1_luck_left_btn.png") no-repeat;
          font-size: 25px;
          font-weight: bold;
          letter-spacing: 0.63px;
          color: #ffffff;
          cursor: pointer;
          transition: background .5s;

          &:hover {
            background: url("../../../assets/active/europeanCup2021/active1_luck_left_btn_hover.png") no-repeat;
          }
        }
      }

      .right {
        margin: 51px 0 0 0;
        border-radius: 50%;
        box-shadow: 0 4px 7px 0 rgba(6, 39, 44, 0.76);
        position: relative;

        .remaining-times {
          position: absolute;
          width: 100%;
          font-size: 20px;
          color: #ffffff;
          top: 257px;
          left: 0;
          text-align: center;
          pointer-events: none;
        }
      }
    }

    .active_rules {
      width: 100%;
      height: 267px;
      background: url("../../../assets/active/europeanCup2021/active1_rules.png") no-repeat;
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

    /deep/ .amount-dialog {
      margin-top: calc((100vh - 320px) / 2) !important;
      background: url("../../../assets/active/europeanCup2021/active1_get_amount.png");

      .dialog-main {

        ul {
          width: 557px;
          margin: 47px auto 53px;
          display: flex;

          li {
            width: 160px;
            height: 60px;
            border-radius: 5px;
            box-shadow: 0 1px 4px 0 rgba(3, 8, 8, 0.65);
            text-align: center;
            line-height: 60px;
            font-size: 20px;
            font-weight: bold;
            color: #56ebff;
            border-color: #024f5a;
            background-color: #024f5a;
            border-width: 1px;
            border-style: solid;
            transition: all .3s;
            cursor: pointer;

            &:hover, &.active {
              border-image-slice: 1;
              background-origin: border-box;
              background-clip: content-box, border-box;
              border-image-source: linear-gradient(to top, #00e1ff, #b2f5ff, #00e1ff);
              background-image: linear-gradient(to bottom, #024f5a, #024f5a), linear-gradient(to top, #00e1ff, #b2f5ff, #00e1ff);
              color: #ffffff;
            }
          }
        }
      }
    }

    /deep/ .luck-dialog {
      height: 506px;
      margin-top: calc((100vh - 506px) / 2) !important;
      background: url("../../../assets/active/europeanCup2021/active1_luckDarw.png");

      .el-dialog__header {
        .el-dialog__headerbtn {
          top: 94px;
        }
      }

      .dialog-main {

        h1 {
          top: 105px;
        }

        img {
          height: 103px;
          margin-top: 86px;
        }

        h5 {
          font-size: 20px;
          line-height: 20px;
          color: #e1f8fc;
          font-weight: normal;
          margin-top: 6px;
        }

        b {
          font-size: 20px;
          color: #e1f8fc;

          span {
            border-bottom: 1px solid #e1f8fc;
            cursor: pointer;

            &:active {
              font-size: 19px;
            }

            &:focus {
              font-size: 20px;
            }
          }
        }

        small {
          display: block;
          font-size: 20px;
          color: #56ebff;
          padding: 0 100px;
          margin-top: 5px;

          &.top {
            margin-top: 25px;
          }
        }
      }
    }
  }
</style>
