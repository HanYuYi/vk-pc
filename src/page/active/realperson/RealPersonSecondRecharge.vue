<template>
  <div class="active_page active-universal-template RealPersonSecondRecharge-page">
    <div class="active_page_wrapper">
      <div class="wrapper">
        <div class="top_bg">
          <div class="bg1"></div>
          <div class="bg2"></div>
        </div>
        <div class="active_page_content">
          <div class="active_section_box">
            <div class="active_title">
              活动时间
            </div>
            <div class="section_box_wrapper">
              <div class="active_time">
                {{initData.active_show_time}}
              </div>
            </div>
          </div>
          <div class="active_section_box">
            <div class="active_title">
              {{$t("Event_details")}}
            </div>
            <div class="section_box_wrapper">
              <div class="active_time">
                活动期间，新会员完成注册后的第二笔存款，即可申请一次真人复存优惠，申请成功的用户可享受单笔存款最高{{initData.active_setting.rate}}的存款优惠。
              </div>
            </div>
            <div class="section_box_wrapper" :class="{'min-box':load}">
              <table v-show="!load" border="1" align="center" cellspacing="0" width="100%">
                <thead>
                  <tr align="center">
                    <th width="25%">首存金额(￥)</th>
                    <th width="25%">返利</th>
                    <th width="25%">最高赠送彩金(￥)</th>
                    <th width="25%">流水要求</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>≥{{initData.active_setting.min_deposit}}</td>
                    <td>{{initData.active_setting.rate}}</td>
                    <td class="bold-yelow">{{initData.active_setting.max_bonus}}</td>
                    <td>(本金+红利)x{{initData.active_setting.limit}} 真人</td>
                  </tr>
                </tbody>
              </table>
              <Loading v-if="load" class="list-loading" />
              <div v-if="!load && (initData.status==0 || initData.status==1) && initData.bonus>0" class="liushui_box">
                <span class="liushui">
                  {{initData.status==0 ? "当前可领取：" : "已领取："}}{{toThousands(initData.bonus)}}元彩金
                </span>
              </div>

              <div v-if="!load" class="btn text-center">
                <div class="d_btn normal" :class="{'btn-disable': initData.status == 1}" @click="openDio">
                  <div class="btn_loading_box " v-if="ajaxLoad"><span class="small_loading"></span></div>
                  <span v-else>{{btnText}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="active_section_box">
            <div class="active_title">
              {{$t("Activity_rules")}}
            </div>
            <div class="gz-content">
              <ol>
                <li>
                  符合条件的会员可在点击本优惠活动页面上“立即复存”按钮后，选择“AG真人钱包”、“PM真人钱包”、“WE真人钱包”、“欧博真人钱包”、“PT真人钱包”其中之一进行复存转账。对应的存款本金+活动奖金在转账成功后将自动添加至用户选择的真人游戏钱包中。
                </li>
                <li>此活动复存定义为：用户注册后的第二笔存款；若用户在申请前进行转账操作或未完成真人首存活动的流水要求，则不可申请复存优惠。</li>
                <li>申请奖金后需在指定真人游戏中完成相对应的流水要求，当用户对应真人钱包余额＜最低投注额且无未结算注单时，系统将自动判定已完成活动规定的有效流水。</li>
                <li>此活动不与其它复存活动共享，每个账户仅限申请一次；不可与老用户召回存款活动同一天参与；领取了此项优惠活动的新用户需先完成活动规定的流水后才可申请平台救援金活动。</li>
                <li>每位有效玩家、每个手机号码、电子邮箱、IP地址、每张银行卡、每台设备只能享受一次优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利；VKGAME对本活动保有最终解释权。</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div class="btn back_active_nav">
        <router-link to="/active" class="botton normal">{{$t("Return_to_activity_page")}}</router-link>
      </div>
    </div>
    <el-dialog :visible.sync="showDio" custom-class="active-universal-dialog" width="700px"
      :close-on-click-modal="false">
      <div class="dialog_wrapper">
        <p class="">本金+红利共：<span class="green">{{toThousands(initData.sumAmount)}}</span>元</p>
        <div>
          <span class="qianbao_tit">返利至：</span>
          <div class="wallet_box_wrapper">
            <div class="wallet_box" v-for="(item, i) in walletList" @click="chooseWallet(item, i)" :key="i"
              :class="[`${item.code}`,{'active': walletIndex == i}]">{{item.name}}</div>
          </div>
        </div>
        <div class="confirm-btn" @click="transfer">确定</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Loading from '@/components/common/Loading.vue'
import { toThousands } from '@/utils/util'
import { mapState } from 'vuex'
export default {
  name: 'RealPersonSecondRecharge',
  components: {
    Loading
  },
  data() {
    return {
      showDio: false,
      initData: {
        active_show_time: '即日起',
        status: 0, // 状态： 0  可领   1 已领取   *** 其他状态
        status_tips: '',
        bonus: 0,
        amount: 0,
        sumAmount: 0,
        active_setting: {
          limit: 18,
          max_bonus: 388,
          min_deposit: 100,
          rate: "30%"
        }
      },
      walletIndex: 0,
      walletList: [],
      load: false,
      ajaxLoad: false,
    };
  },
  computed: {
    ...mapState(["isLogin"]),
    btnText() {
      if (this.initData.status == 1) {
        return '已领取'
      } else {
        return '立即复存'
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    toThousands(num) {
      return toThousands(num)
    },
    chooseWallet(item, i) {
      this.walletIndex = i
    },
    openDio() {
      if (this.isLogin) {
        if (this.initData.status == 1) {
          return;
        } else if (this.initData.status == 0) {
          this.walletIndex = 0
          this.showDio = true
        } else {
          this.$message({
            message: this.initData.status_tips,
            type: "warning"
          })
        }
      } else {
        this.$message({
          message: "请您先登录",
          type: "warning"
        })
      }
    },
    closeDio() {
      this.showDio = false
    },
    transfer() {
      if (this.ajaxLoad) {
        return
      }
      this.ajaxLoad = true
      this.$http(this.ApiSetting.user.transferSubmit, {
        from: 'NM',
        to: this.walletList[this.walletIndex].code,
        money: this.initData.amount,
        active_id: this.initData.active_id
      })
        .then(res => {
          if (res.status == 1) {
            this.$message({
              message: `【${this.initData.sumAmount}】元本金 + 彩金已转入您的【${this.walletList[this.walletIndex].name}】!`,
              type: "success"
            })
            this.initData.status = 1
            this.closeDio()
            this.init()
          }
          this.ajaxLoad = false
        }, err => {
          this.ajaxLoad = false
        })
    },
    init() {
      if (this.load) {
        return
      }
      this.load = true
      this.$http(this.ApiSetting.active.RealPerson2022.SecondRechargeInit)
        .then(res => {
          console.log('真人复存初始化', res)
          this.load = false
          if (res.status == 1 && res.data) {
            this.initData = res.data
            this.walletList = res.data.walletList
          }
        })
        .catch(err => {
          this.load = false
        })
    }
  }
}
</script>

<style lang="less" scoped>
.RealPersonSecondRecharge-page {
  background-image: url('~@/assets/active/realman/RealPersonSecondRecharge/banner.jpg');

  .list-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .min-box {
    min-height: 180px;
    position: relative;
  }

  .bold-yelow {
    font-size: 22.5px;
    color: #f4d364;
    font-family: vkfont;
  }

  .green {
    color: #07f1b8;
  }

  .active_section_box {
    margin-bottom: 48px !important;
  }

  table {
    margin-top: 25px;

    th {
      background-color: #17191f;
      font-size: 18px;
      color: #07f1b7;
    }

    td {
      font-size: 14px;
    }
  }
}
</style>
