<template>
  <div class="CertainCompen-page">
    <!-- 共88场包赔赛事 -->
    <div class="block block-zcbp">
      <div class="border"></div>
      <div class="display">
        <div class="title title-bpss">
          共 <span class="num">{{gameListArr.length}}</span> 场包赔赛事
        </div>
        <div class="table table-bpss">
          <div class="table-body">
            <div class="bpss-cards-wrapper">
              <swiper v-if="gameListArr.length&&!matchLoading" :options="cardSwiperOptions" class="match-card-swiper">
                <swiper-slide v-for="(item, i) in gameListArr" :key="i">
                  <div class="match-card">
                    <div class="card-head">
                      <div class="game-season">{{ item.game_name }}</div>
                      <div class="game-time">{{ item.date_time }}</div>
                    </div>
                    <div class="card-content">
                      <div class="card-block">
                        <img width="60" height="60" v-lazy="{
                          src: item.l_team_logo,
                          error: lazyMatchAvatar.error,
                          loading: lazyMatchAvatar.loading
                        }" alt="">
                        <div class="team-name">{{ item.l_team_name }}</div>
                      </div>
                      <div class="card-block">
                        <div class="card-vs">{{ gameStatu(item.game_status) }}</div>
                      </div>
                      <div class="card-block">
                        <img width="60" height="60" v-lazy="{
                          src: item.r_team_logo,
                          error: lazyMatchAvatar.error,
                          loading: lazyMatchAvatar.loading
                        }" alt="">
                        <div class="team-name">{{ item.r_team_name }}</div>
                      </div>
                    </div>
                  </div>
                  <div class="bottom-block d-flex align-center justify-center" v-if="item.game_status == 3">
                    <div @click="apply(item)" class="confirm-btn bpj-btn">申请包赔金</div>
                  </div>
                  <div class="bottom-block d-flex align-center justify-center flex-column" v-else>
                    <template v-if="item.showCountDownTime">
                      <div>请在<strong>{{formatCountTime(item.countTime)}}</strong>内完成活动存款要求</div>
                      <div>点击进入<router-link :to="{path:'/user/finance/'}">财务中心</router-link></div>
                    </template>
                    <template v-else>
                      <div>本比赛活动要求存款时间</div>
                      <div>{{formatDate(item.deposit_start_time*1000,'yyyy.MM.dd HH:mm')}}-{{formatDate(item.deposit_end_time*1000,'yyyy.MM.dd HH:mm')}}</div>
                    </template>
                  </div>
                </swiper-slide>
              </swiper>
              <Loading v-if="matchLoading" class="list-loading" :color="'#bf9854'" />
              <div v-if="gameListArr.length&&!matchLoading" class="swiper-button-prev-card" slot="button-prev">
                <div class="btn"></div>
              </div>
              <div v-if="gameListArr.length&&!matchLoading" class="swiper-button-next-card" slot="button-next">
                <div class="btn"></div>
              </div>
              <template v-if="!matchLoading && (!gameListArr.length)">
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
    <!-- 活动内容 -->
    <div class="block block-bpnr">
      <div class="border"></div>
      <div class="display">
        <div class="title title-hdnr">活动内容</div>
        <div class="desc">威客电竞VIP会员在活动存款时间内存款并参与指定电竞赛事的盘口投注，若单笔注单结算为负盈利，即可申请注单包赔，领取包赔金。</div>
        <div class="table">
          <div class="table-body">
            <table width="100%" border="0" align="center" cellspacing="0">
              <thead>
                <tr>
                  <th>全员等级要求</th>
                  <th>存款金额</th>
                  <th>单笔投注金额</th>
                  <th>包赔返利</th>
                  <th>包赔金上限</th>
                  <th>流水要求</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>VIP0</td>
                  <td rowspan="13">≥500元</td>
                  <td rowspan="13">≥500元</td>
                  <td>10%</td>
                  <td class="blue">68元</td>
                  <td rowspan="13">电竞3倍流水</td>
                </tr>
                <tr>
                  <td>VIP1</td>
                  <td>10%</td>
                  <td class="blue">88元</td>
                </tr>
                <tr>
                  <td>VIP2</td>
                  <td>15%</td>
                  <td class="blue">128元</td>
                </tr>
                <tr>
                  <td>VIP3</td>
                  <td>15%</td>
                  <td class="blue">168元</td>
                </tr>
                <tr>
                  <td>VIP4</td>
                  <td>15%</td>
                  <td class="blue">188元</td>
                </tr>
                <tr>
                  <td>VIP5</td>
                  <td>18%</td>
                  <td class="blue">258元</td>
                </tr>
                <tr>
                  <td>VIP6</td>
                  <td>18%</td>
                  <td class="blue">288元</td>
                </tr>
                <tr>
                  <td>VIP7</td>
                  <td>18%</td>
                  <td class="blue">388元</td>
                </tr>
                <tr>
                  <td>VIP8</td>
                  <td>20%</td>
                  <td class="blue">528元</td>
                </tr>
                <tr>
                  <td>VIP9</td>
                  <td>20%</td>
                  <td class="blue">688元</td>
                </tr>
                <tr>
                  <td>VIP10</td>
                  <td>20%</td>
                  <td class="blue">888元</td>
                </tr>
                <tr>
                  <td>VIP11</td>
                  <td>25%</td>
                  <td class="blue">1,288元</td>
                </tr>
                <tr>
                  <td>VIP12</td>
                  <td>30%</td>
                  <td class="blue">1,888元</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <!-- 活动规则 -->
    <div class="block block-bpgz">
      <div class="border"></div>
      <div class="display">
        <div class="title title-hdgz">活动规则</div>
        <div class="gz-content">
          <ol>
            <li>
              存款时间定义：每场赛事开赛前24小时内的累计存款，每次存款时间内的存款只可申请一次保险注单活动。
              例：A场保单赛事时间为10月19日04:00，有效存款时间为10月18日04:00-10月19日04:00，在此期间会员累计存款≥500元；若会员参与本场赛事投注，单笔投注额≥500元即可参加A场保单赛事。
            </li>

            <li>参与包赔优惠的会员需要在电竞赛事（小艾电竞、RG电竞、IM电竞）中投注，仅计算产生输赢结果的注单，电竞赔率＜1.5，走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等注单不计算有效注单。
            </li>

            <li>申请包赔金的注单需为全输，若会员所投注的注单结算为输一半则视为无效注单，不可申请。
            </li>

            <li>符合条件的用户需在注单结算后的24小时内联系在线客服申请包赔金，逾期则视为自动放弃。
            </li>

            <li>
              包赔金将在审核通过后的3日内派发至用户指定的电竞钱包（小艾电竞、RG电竞、IM电竞三选一）中，包赔金需在所选游戏中完成对应的流水要求，流水未完成前不可再次申请本活动；当用户对应电竞钱包余额≤原钱包余额且无未结算注单时，系统将自动判定已完成活动规定的有效流水。
            </li>

            <li>
              包赔单活动每场赛事仅限200个包赔名额，先到先得。此活动不与平台电竞首存、S12救援金活动共享。若用户参与了电竞首存，需先完成电竞首存活动流水才可参加本活动；同样S12救援金与电竞包赔活动不共享，活动同时进行时，只可选择一个参加。
            </li>

            <li>赛事取消或改期或其他原因导致赛事不能正常进行，则对应当期的保险投注优惠取消；若保单赛事因官方原因改变赛事时间，则有效存款时间从原开赛时间前24小时开始计算。</li>

            <li>每位有效玩家、每个手机号码、电子邮箱、IP地址、每张银行卡、每台设备只能享受一次优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利；VKGAME对本活动保有最终解释权。 </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '@/components/common/Loading.vue'
import { mapState } from 'vuex'
import { formatDate, formatCountTime } from '@/utils/util'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  name: 'CertainCompen',
  components: {
    Swiper,
    SwiperSlide,
    Loading
  },
  created() {
    this.init()
    this.getGameList()
  },
  computed: {
    ...mapState([
      "isLogin",
      "lazyMatchAvatar"
    ]),
  },
  data() {
    return {
      initInfo: {
        status_tip: ''
      },
      matchLoading: false,
      gameListArr: [],
      cardSwiperOptions: {
        slidesPerView: 4,
        spaceBetween: 20,
        // allowTouchMove: false,
        observer: true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents: true,
        navigation: { nextEl: '.swiper-button-next-card', prevEl: '.swiper-button-prev-card' },
      },
    }
  },
  methods: {
    init() {
      this.$http(this.ApiSetting.active.lols12.sub.compenInit)
        .then(res => {
          console.log('包赔金初始化', res)
          if (res.status == 1 && res.data) {
            this.initInfo = res.data;
          }
        })
    },
    getGameList() {
      if (this.matchLoading) {
        return
      }
      this.matchLoading = true
      this.$http(this.ApiSetting.active.lols12.sub.getMatchList)
        .then(res => {
          this.matchLoading = false
          if (res.status == 1 && res.data) {
            this.gameListArr = res.data;

            this.gameListArr.forEach(item => {
              const currentTime = new Date().getTime()
              item.showCountDownTime = false;
              if (currentTime >= item.deposit_start_time * 1000 && currentTime <= item.deposit_end_time * 1000) {
                let cuntdown = parseInt(Math.abs(item.deposit_end_time * 1000 - new Date().getTime()) / 1000);
                console.log('倒计时cd', cuntdown, item.id)
                item.countTime = cuntdown;
                item.showCountDownTime = true
              }
            })
            if (this.gameListArr.filter(item => item.showCountDownTime).length) {
              this.cuountInter = setInterval(() => {
                this.gameListArr.forEach(e => {
                  e.countTime--
                  if (e.countTime < 1) {
                    e.showCountDownTime = false
                    e.game_status = 2
                  }
                })
                this.$forceUpdate()
              }, 1000);
            }
          }
        })
        .catch(err => {
          this.matchLoading = false
        })
    },
    gameStatu(status) {
      switch (status) {
        case 1:
          return '未开始'
        case 2:
          return '比赛中'
        case 3:
          return '已结束'
        case 4:
          return '已结束'
        default:
          return
      }
    },
    apply(item) {
      if (this.initInfo.status == 0) {
        if (item.deposit_status == 0) {
          this.$message({
            message: '存款未达到要求！',
            type: 'warning'
          })
        } else if (item.game_status == 4) {
          this.$message({
            message: '该活动已过期！',
            type: 'warning'
          })
        } else {
          this.openKfWindow()
        }
      } else {
        this.$message({
          message: this.initInfo.status_tip,
          type: 'warning'
        })
      }
    },
    formatDate(num, formate) {
      return formatDate(num, formate)
    },
    formatCountTime(time) {
      return formatCountTime(time)
    },
  }
}
</script>

<style lang="less" scoped>
.CertainCompen-page {
  .bpj-btn {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }

  .bottom-block {
    margin-top: 20px;
    width: 100%;
    height: 50px;
    text-align: center;
    color: #d6b598;
    line-height: 1.67;
  }

  .bpss-cards-wrapper {
    margin: auto;
    margin-top: 22px;
    width: 956px;
    height: 195px;
    position: relative;

    .match-card-swiper {
      width: 100%;
      height: 100%;
      cursor: grab;
    }

    .match-card {
      width: 224px;
      height: 125px;
      box-sizing: border-box;
      padding: 2px;
      background-image: linear-gradient(to bottom, #5ea2e6, #1841b6);

      .card-head {
        height: 28px;
        width: 100%;
        background-color: #000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 0 10px;
        line-height: 1;
        font-size: 12px;
        color: #d6b598;
      }

      .card-content {
        width: 100%;
        height: 94px;
        box-sizing: border-box;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .card-block {
          flex: 1;
        }

        .team-name {
          line-height: 1;
          margin-top: 8px;
          color: #fff;
          font-size: 12px;
          font-weight: bold;
        }

        .card-vs {
          font-size: 18px;
          font-weight: bold;
          color: #fff;
        }
      }
    }

    .swiper-button-prev-card,
    .swiper-button-next-card {
      cursor: pointer;
      width: 30px;
      z-index: 10;
      height: 50px;
      position: absolute;
      top: 50%;
      transform: translate3d(0, -50%, 0);
      background: url('~@/assets/active/lols12/sub/sprite.png');
    }

    .swiper-button-prev-card {
      left: -45px;
      background-position: -10px -197px;

      &:hover {
        background-position: -10px -317px;
      }

      &.swiper-button-disabled {
        cursor: not-allowed;
        background-position: -10px -257px;
      }
    }

    .swiper-button-next-card {
      right: -45px;
      background-position: -50px -197px;

      &:hover {
        background-position: -50px -317px;
      }

      &.swiper-button-disabled {
        cursor: not-allowed;
        background-position: -50px -257px;
      }
    }
  }
}
</style>