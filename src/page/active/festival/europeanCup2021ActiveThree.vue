<template>
  <div class="europeanCup2021ActiveThree">
    <h1 class="active-title"></h1>
    <div class="active-desc">
      <p>{{ activeInfo.date }}</p>
      <p>会员欧洲杯单场赛事中单笔投注额≥1000元，若出现以下事件，即可领取相对应的助力彩金。</p>
    </div>

    <div class="help-panel">
      <div class="help-header">
        <button @click="openHelpMoneyDialog">申请彩金</button>
        <small>所有彩金，仅需1倍体育流水即可提现。</small>
      </div>
      <ul class="help-main">
        <li v-for="(item, index) in helpTypeList" :key="index" :style="{background: `url(${item.img})`}">
          <em>{{ item.title }}</em>
          <small>发放彩金<span>{{ item.amount }}</span>元</small>
        </li>
      </ul>
    </div>

    <ul class="active_rules">
      <li>1. 此优惠活动需要会员当天在威客体育、平博Sports、BTi体育其中单个平台，欧洲杯赛事中单场投注≥1000元，即可参加此优惠活动。</li>
      <li>2. 此优惠活动只计算单场比赛中出现的事件而不计算单场比赛中事件出现的次数。例：单场比赛中出现过2次红牌，会员只能领取28元的彩金。</li>
      <li>3. 参与此优惠的会员需要在体育赛事投注独赢，让球，大小，单双四个盘口，允许投注上半场或全场（不包括特殊盘口、不包含滚球）；盘口赔率要求：不得低于欧盘1.75、亚洲盘及马来盘0.75。</li>
      <li>4. 符合条件的会员需在注单结算后的24小时之内在此页面填写注单单号手动进行领取彩金，逾期则视为自动放弃。</li>
      <li>5. 彩金将在审核通过后的3日内派发至用户指定的体育钱包（威客体育、平博Sports、BTi体育三选一）中，彩金需在所选游戏中完成对应的流水要求，流水未完成前不可再次申请本活动；当用户对应体育钱包余额≤原钱包余额且无未结算注单时，系统将自动判定已完成活动规定的有效流水。香港盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、印尼盘≤0.75、走盘、注单取消、对冲等情况都不算有效流水。</li>
      <li>6. 每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能使用一个账号享受优惠。对违规的用户，VKGAME保留无限期审核， 和扣回红利及所产生的利润权利，本活动最终解释权归VKGAME所有。</li>
    </ul>

    <!-- 申请彩金dailog-->
    <el-dialog
      :visible.sync="helpDialogRowDialogVisible"
      custom-class="dialog-panel"
      width="617px"
      :close-on-click-modal="false">
      <div class="dialog-main">
        <h1>申请彩金</h1>
        <ul class="main-form">
          <li>
            <span class="form-tit">选择平台:</span>
            <span class="form-main">
              <span v-for="(item, index) in platformList" :key="index" @click="helpDialogRow.platformValue = item.code" class="form-radio">
                <i :class="{active: helpDialogRow.platformValue === item.code}"></i>{{ item.name }}
              </span>
            </span>
          </li>
          <li>
            <span class="form-tit">注单单号:</span>
            <span class="form-main">
              <input v-model="helpDialogRow.oddNumbers" type="text" autocomplete="off" placeholder="请输入投注记录中的注单单号" maxlength="32" class="num-input"/>
            </span>
          </li>
          <li>
            <span class="form-tit">趣味玩法:</span>
            <span class="form-main">
              <span class="checkbox-box">
                <span v-for="(item, index) in [helpTypeList[0], helpTypeList[1]]" :key="index" @click="addCheckboxValue(item.code)" class="form-checkbox" :style="{'margin-left': index === 1 ? '7px' : 0}">
                  <i :class="{active: helpDialogRow.helpValueList.includes(item.code)}"></i>{{ item.title }}({{ item.amount }}元)
                </span>
              </span>
              <span class="checkbox-box">
                <span v-for="(item, index) in [helpTypeList[2], helpTypeList[3]]" :key="index" @click="addCheckboxValue(item.code)" class="form-checkbox">
                  <i :class="{active: helpDialogRow.helpValueList.includes(item.code)}"></i>{{ item.title }}({{ item.amount }}元)
                </span>
              </span>
              <span class="checkbox-box">
                <span v-for="(item, index) in [helpTypeList[4], helpTypeList[5]]" :key="index" @click="addCheckboxValue(item.code)" class="form-checkbox">
                  <i :class="{active: helpDialogRow.helpValueList.includes(item.code)}"></i>{{ item.title }}({{ item.amount }}元)
                </span>
              </span>
            </span>
          </li>
        </ul>
        <button :disabled="buttonLoading" @click="europeCupWulongWelfare">提交申请</button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {mapState} from 'vuex';

  export default {
    name: 'europeanCup2021ActiveThree',
    props: {
      platformList: { type: Array, required: true }
    },
    data() {
      return {
        buttonLoading: false,
        activeInfo: {
          date: ''
        },
        helpTypeList: [
          {img: require('../../../assets/active/europeanCup2021/active3_wulong.png'), title: '乌龙球', amount: 188, code: 'BOOST_188'},
          {img: require('../../../assets/active/europeanCup2021/active3_maozi.png'), title: '帽子戏法', amount: 128, code: 'BOOST_128'},
          {img: require('../../../assets/active/europeanCup2021/active3_meikai.png'), title: '梅开二度', amount: 88, code: 'BOOST_088'},
          {img: require('../../../assets/active/europeanCup2021/active3_dianqiu.png'), title: '点球得分', amount: 58, code: 'BOOST_058'},
          {img: require('../../../assets/active/europeanCup2021/active3_hongpai.png'), title: '出现红牌', amount: 28, code: 'BOOST_028'},
          {img: require('../../../assets/active/europeanCup2021/active3_0.png'), title: '全场0进球', amount: 18, code: 'BOOST_018'}
        ],
        helpDialogRow: {
          platformValue: this.platformList[0] ? this.platformList[0].code : '',
          oddNumbers: '',
          helpValueList: ['BOOST_188']
        },
        helpDialogRowDialogVisible: false
      }
    },
    computed: {
      ...mapState(['isLogin'])
    },
    watch: {
      isLogin() {
        this.getEuropeCupBoost()
      },
      helpDialogRowDialogVisible(bool) {
        if (!bool) {
          this.helpDialogRow.platformValue = this.platformList && this.platformList.length ? this.platformList[0].code : ''
          this.helpDialogRow.oddNumbers = ''
          this.helpDialogRow.helpValueList = ['BOOST_188']
        }
      }
    },
    mounted() {
      this.getEuropeCupBoost()
    },
    methods: {
      getEuropeCupBoost() {
        this.$http(this.ApiSetting.active.europeanCup2021.getEuropeCupBoost)
          .then(response => {
            if (response.status === 1) {
              this.activeInfo.date = response.data.active_info.active_time
            }
          })
      },
      // 申请彩金
      openHelpMoneyDialog() {
        if (!this.isLogin) {
          return this.$message({ message: '请您先登录', type: 'warning' })
        }
        this.helpDialogRowDialogVisible = true
      },
      // dialog申请彩金选择多个玩法
      addCheckboxValue(value) {
        if (this.helpDialogRow.helpValueList.includes(value)) {
          this.helpDialogRow.helpValueList.splice(this.helpDialogRow.helpValueList.indexOf(value), 1)
        } else {
          this.helpDialogRow.helpValueList.push(value)
        }
      },
      // 提交申请彩金
      europeCupWulongWelfare() {
        if (!this.helpDialogRow.oddNumbers) {
          return this.$message({ message: '请填写注单单号', type: 'warning' })
        }
        if (!this.helpDialogRow.platformValue) {
          return this.$message({ message: '请选择平台', type: 'warning' })
        }
        if (!this.helpDialogRow.helpValueList.length) {
          return this.$message({ message: '请选择趣味玩法', type: 'warning' })
        }
        const params = {
          to: this.helpDialogRow.platformValue,
          orderSN: this.helpDialogRow.oddNumbers,
          paly: this.helpDialogRow.helpValueList.join()
        }
        this.buttonLoading = true
        this.$http(this.ApiSetting.active.europeanCup2021.getEuropeCupWulongWelfare, params)
          .then(response => {
            if (response.status === 1) {
              this.$emit('handleactive3Tip', response.message)
              this.helpDialogRowDialogVisible = false
            }
            this.buttonLoading = false
          })
      }
    }
  }
</script>

<style lang="less" scoped>
  .europeanCup2021ActiveThree {
    .active-title {
      width: 100%;
      height: 117px;
      background: url("../../../assets/active/europeanCup2021/bar_3_title.png") no-repeat;
    }

    .active-desc {
      text-align: center;
      color: #a6ecf6;
      font-size: 20px;
      line-height: 30px;
      margin-top: 5px;
    }

    .help-panel {
      width: 1240px;
      margin: 30px auto 0;

      .help-header {
        text-align: center;

        button {
          width: 206px;
          height: 66px;
          background: url("../../../assets/active/europeanCup2021/active_btn.png");
          border: 0;
          outline: 0;
          font-size: 26.5px;
          font-weight: bold;
          letter-spacing: 0.66px;
          color: #29747d;
          cursor: pointer;
          transition: all .3s;

          &:hover {
            background: url("../../../assets/active/europeanCup2021/active_btn_hover.png");
          }
        }

        small {
          display: block;
          font-size: 22px;
          letter-spacing: 2.2px;
          color: #acf5ff;
          margin-top: 12px;
        }
      }

      .help-main {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        li {
          width: 600px;
          height: 177px;
          margin-top: 37px;
          display: flex;
          align-items: center;

          em {
            display: inline-block;
            width: 144px;
            font-size: 28px;
            font-weight: bold;
            letter-spacing: 2.8px;
            color: #acf5ff;
            font-style: italic;
            margin: 0 39px 0 195px;
          }

          small {
            font-size: 22px;
            letter-spacing: 2.2px;
            color: #acf5ff;

            span {
              font-size: 30px;
              font-weight: bold;
              letter-spacing: 3px;
              color: #edff5e;
            }
          }
        }
      }
    }

    .active_rules {
      width: 100%;
      height: 321px;
      background: url("../../../assets/active/europeanCup2021/active3_rules.png") no-repeat;
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

              .checkbox-box {
                display: flex;

                .form-checkbox {
                  cursor: pointer;
                  margin-right: 29px;
                  padding-bottom: 7px;

                  i {
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    vertical-align: middle;
                    margin-right: 10px;
                    background: url("../../../assets/active/europeanCup2021/checkbox_box.png");

                    &.active {
                      background: url("../../../assets/active/europeanCup2021/checkbox_box_hover.png");
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
