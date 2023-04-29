<template>
  <div v-if="richpayInitData.is_use_richpay" class="vrich">
    <div class="bg-box">
			<img class="big-c" src="../assets/active/vrich/big.png"/>
			<img class="small-c" src="../assets/active/vrich/small.png"/>
      <img class="coin" src="../assets/active/vrich/coin.png"/>
      <img class="slogan" src="../assets/active/vrich/txt.png"/>
      <img class="slice" src="../assets/active/vrich/Slice1.svg"/>
    </div>

    <!-- 核心功能区-->
    <section class="wallet-rank">
      <!-- 时时盈利榜-->
      <div class="rank-list">
        <p class="title">•&nbsp;&nbsp;时时盈利榜&nbsp;&nbsp;•</p>
        <div class="list-box">
          <p class="none-list" v-if="!ranks.length">暂无数据</p>
          <transition-group name="list-complete" tag="ul" class="box">
            <li v-for="(item) in ranks"
							:key="item.key"
							class="list-complete-item">
              <span>{{item.time}}</span>
              <span class="name">{{item.show_username}}</span>
              <span class="interest">{{item.status_cn}} <i>{{item.amount}}</i></span>
            </li>
          </transition-group>
        </div>
      </div>

      <!-- 钱包-->
      <div class="wallet">
        <p class="big-title">V富通钱包</p>
        <div class="row1">
          <p>
            <span class="gray">总资产</span><br>
            <span>￥{{formatNumberSplit(richpayInitData.wallet_info.total_balance)}}</span>
          </p>
          <p>
            <span class="gray">七日预期收益</span><br>
            <span>￥{{formatNumberSplit(richpayInitData.wallet_info.seven_day_ideal_income)}}</span>
          </p>
        </div>
        <div class="row2">
          <router-link :to="{name: 'userwithdraw', params: {type: 3}}"
            class="v-btn">转入
          </router-link>
          <a class="v-btn"  @click="initWithdrawParams">转出</a>
          <a class="v-btn"  @click="initRecordparams" style="width: 140px">交易明细</a>
        </div>
        <div class="row3">
          <p>
            <span class="gray">未提利息</span><br>
            <span class="blue">￥{{formatNumberSplit(richpayInitData.wallet_info.interest_balance)}}</span>
          </p>
          <p>
            <span class="gray">年利率</span>
            <el-popover trigger="hover"
							placement="bottom"
							width="200">
              <div class="rich-popover">
                <p>V富通VIP年利率</p>
								<div class="level-box">
									<li v-for="(item,i) in vip_year_conf" :key="i">
										<span>{{item.vip_name}}</span>
										<span>{{item.vip_apr ? item.vip_apr + '%' : '-'}}</span>
									</li>
								</div>
              </div>
              <i slot="reference">!</i>
            </el-popover><br>
            <span>{{richpayInitData.wallet_info.year_show}}%</span>
            <span v-if="richpayInitData.wallet_info.coupon_value"
               class="hot-tips">
              X{{ richpayInitData.wallet_info.coupon_value }}
            </span>
          </p>
          <p>
            <span class="gray">已提利息</span><br>
            <span>￥{{formatNumberSplit(richpayInitData.wallet_info.total_income)}}</span>
          </p>
        </div>
        <div class="row4">
          <p class="v-btn" @click="initWithdrawalInterest">提息</p>
          <p class="record-btn" @click="initAwardRecord()">中奖记录</p>
          <p class="gray">
            当前<span :class="richpayInitData.wallet_info.lottery_chance > 0 && 'active'"> {{richpayInitData.wallet_info.lottery_chance}} </span>次抽奖机会
						<span class="active und"
              :class="!isLogin && 'disabled'"
							@click="richpayAward()"
							v-if="richpayInitData.wallet_info.lottery_chance &&
							!richpayInitData.wallet_is_lock"> 立即抽奖
            </span>
          </p>
        </div>
      </div>

      <!-- 我的最近交易-->
      <div class="trade-list">
        <p class="title">•&nbsp;&nbsp;我的最近交易&nbsp;&nbsp;•</p>
				<p class="none-list" v-if="!recordsShow.length">{{isLogin ? '暂无数据' : '请登录' }}</p>
        <li v-for="(item,i) in recordsShow" :key="i">
          <span>{{item.time}}</span>
          <span :class="item.is_show_color && 'interest'">{{item.amount}}</span>
          <span>{{item.status_cn}}</span>
        </li>
        <div class="bottom-check" v-if="isLogin">
          <p>
            <span :class="tradeFilter && 'checked'" @click="tradeFilterChange"></span>只看提息记录
          </p>
          <p>
            <span class="left" @click="pageChange(-1)"></span>
            {{currentPage}}/{{maxPage}}
						<span class="right" @click="pageChange(+1)"></span>
          </p>
        </div>
      </div>
    </section>

    <p class="notice">
      V富通是威客电竞为您提供的专属游戏理财钱包，您将主钱包资金转入V富通后可随时转出至主钱包使用，额外还有优秀的利息和红包收益！
    </p>

    <!-- V富通钱包五大特点和优势-->
    <p class="top-title">
      V富通钱包五大特点和优势
    </p>
    <section class="advantage">
      <div class="item-box"
           v-for="(item, index) in advantageTexts"
           :key="index">
        <div class="item">
          <div class="normal">
            <p>{{item.normal[0]}}</p>
            <p v-html="item.normal[1]"></p>
          </div>
          <div class="hover">
            <p v-for="(e,j) in item.hover" :key="j">• {{e}}</p>
            <el-popover trigger="hover" placement="bottom" width="200">
              <div class="rich-popover">
                <p>V富通VIP年利率</p>
								<div class="level-box">
									<li v-for="(item,i) in vip_year_conf" :key="i">
										<span>{{item.vip_name}}</span>
										<span>{{item.vip_apr ? item.vip_apr + '%' : '-'}}</span>
									</li>
								</div>
              </div>
              <p class="show-vip" v-if="index === 2" slot="reference">查看VIP收益率表</p>
            </el-popover>
          </div>
        </div>
      </div>
    </section>

    <!-- 收益步骤-->
    <p class="top-title">V富通钱包获取收益步骤</p>
    <section class="steps">
      <div class="step">
        <p>01</p>将主钱包中完成提款流水要求的资金转入威客V富通钱包，转入资金最低1元起。
      </div>
      <div class="step">
        <p>02</p>A. 单笔资金每小时派息一次，会持续派发七日，利息收益自动加入“未提利息”;<br>
        B. 若当日单笔存入≥1000元，且该笔资金存满6小时即可免费获得1次抽奖机会。会员每日最多可获取1次抽奖机会，抽奖次数最多可累计7次。
      </div>
      <div class="step">
        <p>04</p>A. 您可将收益提至主钱包，也可提至V富通钱包继续收息。<br>
        B1. 若抽中现金自动加入主钱包，1倍流水即可提款；<br>
        B2. 若抽中翻倍券并使用，使用后当日内所有利息收益翻倍。
      </div>
      <div class="step">
        <p>03</p>A. 当“未提利息”有额度时，您可随时点击“提息”提出收益;<br>
        B. 当已获得抽奖机会时，您可点击“立即抽奖”。
      </div>
      <i></i><i></i><i></i><i></i>
    </section>

    <!-- 常见问题-->
    <p class="top-title">钱包常见问题</p>
    <section class="rule">
      <div class="inner-box">
        <p class="question">如何转入资金？</p>
        <p class="answer">只要您登录威客任何一个域名或是使用威客手机APP登录后，将您主账户上可提款额度转入至“威客V富通钱包”即可。</p>
        <p class="question">如何转出资金？</p>
        <p class="answer">要您登录威客任何一个域名或是使用威客手机APP登录后，将“威客V富通钱包”里的钱转出至主账户。</p>
        <p class="question">多久才能有收益？</p>
        <p class="answer">资金转入“威客V富通钱包”满足每1小时派发一次利息，您可随时提出利息收益到主钱包，无需流水即可提款。</p>
        <p class="question">存入时间有限制吗？</p>
        <p class="answer">无任何限制，24小时随时存入。</p>
        <p class="question">利息收益和资金转出是否有流水要求？</p>
        <p class="answer"> 利息和资金转出到主钱包后提款无任何流水要求。这里建议资金转入V富通钱包后至少保证1个小时的派息期，不足1个小时没有利息哦。</p>
        <p class="question">因不可抗力或其他原因发生变动，威客电竞有权进行任何调整，以保证提供给会员更优质的收益环境。</p>
      </div>
    </section>

    <div class="back_active_nav_b">
      <router-link to="/active" class="botton normal">{{$t("Return_to_activity_page")}}</router-link>
    </div>

    <!-- 我的中奖记录 -->
    <el-dialog
      :custom-class="'rich-award-dialog2'"
      :visible.sync="visible"
      width="550"
      :append-to-body="true"
      :lock-scroll="true">
      <div class="award-header">我的中奖记录</div>
      <div class="award-body">
        <p class="record-header"><span>抽中奖品</span><span>获得日期</span><span>状态</span></p>
        <p class="record-item" v-for="(item,i) in recordsPage.records" :key="i">
          <span>{{item.name}}</span>
          <span>{{item.time}}</span>
          <router-link v-if="item.status == 3" :to="{name: 'package', params: {from: 'richpay'}}">{{item.status_cn}}</router-link>
          <span v-else>{{item.status_cn}}</span>
        </p>
        <p class="none-record" v-if="!recordsPage.records.length && !loading">暂无数据</p>
        <p class="record-page-control" v-if="recordsPage.records.length">
          <span class="left" @click="recordPageChange(-1)"></span>
          {{recordsPage.currentPage}}/{{recordsPage.maxPage}}
          <span class="right" @click="recordPageChange(+1)"></span>
        </p>
      </div>
      <div class="award-footer" @click="visible = false"></div>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
import {mapActions, mapMutations, mapState} from 'vuex'
import { formatNumberSplit } from "../utils/util"

export default {
  name: 'vrich',
  components: {},
  data () {
    return {
      ranks: [],
      advantageTexts: [
        {normal:['时时计息','每小时计算收益<br>最低一元起存'],
        hover:['提款时将主钱包中可提资金转入V富通钱包，最低1元即可转入。','每一笔转入资金无论金额大小，每小时派息一次，持续派发七日']},
        {normal:['存取无忧','本金利息随时提<br>收益无流水要求'],
        hover:['您可24小时随时转出本金到主钱包，无任何流水要求。','您可24小时随时提利息收益到主钱包，提出收益无任何流水要求。']},
        {normal:['超高利率','相比同类余额宝<br>高出15倍利率收益'],
        hover:['为VIP用户的您提供最高16%的年利率基准收益。','翻倍券加持下最高可获得32%的利率收益，高于余额宝利率15倍']},
        {normal:['额外奖励','一周七天每天一次<br>现金翻倍券送不停'],
        hover:['当日单笔存入≥1000元，且该笔资金存满6小时即可免费获得1次抽奖机会；参与抽奖可获得利息翻倍劵或现金红包等奖励，会员每日最多可获取1次抽奖机会，抽奖时间不限；每位会员抽奖次数最多可累计7次。（VIP0用户暂无此额外奖励）']},
        {normal:['资金安全','降低风控风险<br>安心游戏更畅爽'],
        hover:['将资金从主钱包转入本钱包能最大程度避免因银行账户流水过高和交易频繁引发的银行风控风险，让您的游戏资金更安全。']},
      ],
			recordsShow: [],
			recordsAll: [],
			maxPage: 0,
			recordsInt: [],
			currentPage: 1,
      tradeFilter: false,
      vip_year_conf: [],
			timerO: "",
      luckDrawLoading: false,
      visible: false,
      loading: false,
      recordsPage: {
        currentPage: 1,
        maxPage: 20,
        records: []
      }
    }
  },
  mounted () {
    this.getRichpayData().then(() => {
      if (!this.richpayInitData.is_use_richpay) {
        this.$router.replace('/')
      }
      this.vip_year_conf = this.richpayInitData.vip_year_conf
			this.ranks = this.richpayInitData.time_to_time_records
			if (this.ranks.length > 7) {
        this.ranks.forEach(element => {
          element.key = element.show_username + Math.random()
        })
				this.timerO = setInterval(this.timer,3000)
			}
			this.initRecord()
    })
  },
	beforeDestroy () {
		this.timerO && clearInterval(this.timerO)
	},
	watch: {
		richpayInitData (newv) {
			this.initRecord()
		},
    isLogin () {
      this.getRichpayData()
    },
    visible (newv) {
      if (!newv) {
        this.recordsPage.currentPage = 1
        this.recordsPage.records = []
      }
    }
	},
  computed: {
    ...mapState(["richpayInitData","isLogin"])
  },
  methods: {
    ...mapMutations(["updateRichpayWithdraw", "updateRichpayRecord", "updateRichpayWithdrawalInterest"]),
    ...mapActions(["getRichpayData", "getRichpayAward"]),
    formatNumberSplit(num) {
      num = !num ? 0 : num
      return formatNumberSplit(num)
    },

		tradeFilterChange () {
			this.tradeFilter = !this.tradeFilter
			this.currentPage = 1
			this.recordsShow = this.tradeFilter ? this.recordsInt.slice(0,6) : this.recordsAll.slice(0,6)
			this.maxPage = this.tradeFilter ? Math.ceil(this.recordsInt.length/6) : Math.ceil(this.recordsAll.length/6)
		},

		initRecord () {
			this.currentPage = 1
			this.recordsAll = this.richpayInitData.user_records
			this.recordsInt = this.richpayInitData.user_records.filter(item => item.is_show_color)
			this.recordsShow = this.recordsAll.slice(0,6)
			this.maxPage = this.tradeFilter ? Math.ceil(this.recordsInt.length/6) : Math.ceil(this.recordsAll.length/6)
		},

		pageChange (num) {
			let maxPage
			maxPage = this.tradeFilter ? Math.ceil(this.recordsInt.length/6) : Math.ceil(this.recordsAll.length/6)
			if (this.currentPage + num <= 0 || this.currentPage + num > maxPage) return
			this.currentPage += num
			this.recordsShow = this.tradeFilter ? this.recordsInt.slice((this.currentPage-1)*6,(this.currentPage-1)*6 + 6) : this.recordsAll.slice((this.currentPage-1)*6,(this.currentPage-1)*6 + 6)
		},

    recordPageChange (num) {
			if (this.recordsPage.currentPage + num <= 0 || this.recordsPage.currentPage + num > this.recordsPage.maxPage) return
			this.recordsPage.currentPage += num
      this.initAwardRecord()
    },

		timer() {
			let a = this.ranks[0]
			this.ranks.shift()
			setTimeout(()=>{this.ranks.push(a)},1000)
		},

    // 抽奖
    richpayAward() {
      if (this.luckDrawLoading) return false
      this.luckDrawLoading = true
      this.getRichpayAward().finally(() => {
          this.luckDrawLoading = false
        })
    },
    // 初始化中奖记录弹窗
    initAwardRecord () {
      if (!this.isLogin) return this.$message({message: '请您先登录！',type: 'warning'})
      if (this.loading) return
      this.loading = true
      this.$http(this.ApiSetting.active.richPayGetPrizeList, {page: this.recordsPage.currentPage, page_size: 6})
        .then((res) => {
          if (res.status === 1) {
            this.visible = true
            this.recordsPage.maxPage = Math.ceil(res.data.count/6)
            this.recordsPage.records = res.data.list
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    // 初始化转出弹窗
    initWithdrawParams () {
      if (!this.isLogin) return this.$message({message: '请您先登录！',type: 'warning'})
      this.updateRichpayWithdraw({
        params: {
          total_balance: this.formatNumberSplit(this.richpayInitData.wallet_info.total_balance),
          richpay_seven_day_rate: this.richpayInitData.wallet_info.richpay_seven_day_rate,
          wallet_is_lock: this.richpayInitData.wallet_is_lock
        },
        visible: true
      })
    },
    // 初始化明细弹窗
    initRecordparams () {
      if (!this.isLogin) return this.$message({message: '请您先登录！',type: 'warning'})
      this.updateRichpayRecord({ visible: true })
    },
    // 初始化提息弹唱
    initWithdrawalInterest() {
      if (!this.isLogin) return this.$message({message: '请您先登录！',type: 'warning'})
      this.updateRichpayWithdrawalInterest({
        params: {
          interest_balance: this.richpayInitData.wallet_info.interest_balance,
          withdraw_min_amount: this.richpayInitData.wallet_info.withdraw_min_amount,
          wallet_is_lock: this.richpayInitData.wallet_is_lock
        },
        visible: true
      })
    }
  }

}
</script>
<style lang="less" scoped>
.vrich{
  width: 100%;
  box-sizing: border-box;
  position: relative;
  font-family: MicrosoftYaHei;
	display: flex;
	flex-direction: column;
	align-items: center;
  padding-top: 0px;
  color: #fff;
  overflow: hidden;
  background: url("../assets/active/vrich/bg.jpg") no-repeat center top;
  padding-bottom: 60px;
	.bg-box {
		width: 904px;
		height: 904px;
		position: absolute;
	  top: -180px
	}
  .big-c,.small-c {
    position: absolute;
    transform-origin: center;
  }
  .slogan {
    position: absolute;
    top: 320px;
    left: 30px
  }
  .coin {
    position: absolute;
    top: 200px;
    left: -50%;
  }
  .small-c {
    animation: rotate1 5s linear infinite;
  }
  .big-c {
    animation: rotate1 5s linear infinite;
    animation-direction: reverse;
  }
  @keyframes slice1 {
    0% {opacity: 1;transform: rotateZ(0deg)}
    20% {opacity: .6;transform: rotateZ(60deg)}
    40% {opacity: .4;transform: rotateZ(120deg)}
    50% {opacity: .2;transform: rotateZ(180deg)}
    70% {opacity: .4;transform: rotateZ(240deg)}
    80% {opacity: .6;transform: rotateZ(300deg)}
    100% {opacity: 1;transform: rotateZ(360deg)}
  }
  @keyframes rotate1 {
    0% {transform: rotateZ(0deg)}
    100% {transform: rotateZ(360deg)}
  }
  .slice {
    position: absolute;
    top: 300px;
    left: 49%;
    animation: slice1 5s linear infinite;
  }
  .top-title {
    font-size: 32px;
    font-weight: bold;
    line-height: 0.56;
    text-align: center;
    margin: 60px 0px 50px 0px;
    text-shadow: 2px 4px 4px rgba(0,0,0,.3)
  }
  .wallet-rank {
    position: relative;
    width: 1250px;
    height: 380px;
    margin-top: 500px;
    display: flex;
    justify-content: space-between;
    .rank-list {
      background: url('../assets/active/vrich/sprite.png') no-repeat -693px -30px;
      width: 280px;
      height: 372px;
      .title {
        font-size: 24px;
        color: #fff;
        font-weight: bold;
        text-align: center;
        margin: 27px 0px;
      }
      .list-box {
        width: 240px;
        height: 245px;
        margin-left: 20px;
        overflow: hidden;
        .none-list {
          font-size: 18px;
          text-decoration: underline;
          color: #ababab;
          text-align: center;
          margin-top: 100px
        }
        .box {
          overflow: hidden;
        }
        li {
          margin-bottom: 19px;
					display: flex;
					justify-content: space-between;
					span {
						display: inline-block;
					}
          span:nth-child(2) {
						width: 50px!important;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
          }
          span:nth-child(3) {
            width: 70px;
            text-align: right;
          }
        }
        .list-complete-item {
          width: 240px;
          transition: all 1s;
          .name {
            display: inline-block;
            width: 84px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        .list-complete-enter {
          transform: translateY(35px);
        }
        .list-complete-enter-to {
          transform: translateY(0px);
        }
        .list-complete-leave-to {
          transition: all .1s;
        }
        .list-complete-leave-active {
          position: absolute;
        }
      }
      .interest i{
        color: #08efbc
      }
    }
    .wallet {
      background: url('../assets/active/vrich/sprite.png') no-repeat -48px -27px;
      width: 615px;
      height: 373px;
      font-size: 18px;
      .big-title {
        font-size: 24px;
        font-weight: bold;
        margin-left: 37px;
        margin-top: 37px;
      }
      .disabled {
        pointer-events: none;
      }
      i {
        display: inline-block;
        height: 18px;
        line-height: 16px;
        width: 18px;
        border-radius: 50%;
        text-align: center;
        box-sizing: border-box;
        border: 1px solid #767c97;
        color: #767c97;
        cursor: pointer;
        font-size: 14px;
        vertical-align: unset;
        &:hover {
          border: 1px solid #09eab5;
          color: #09eab5;
        }
      }
      .gray {
        color: #ababab;
        display: inline-block;
        margin-bottom: 5px;
        .active {
          color: #09eab5;
        }
        .und {
          text-decoration: underline;
          cursor: pointer;
        }
      }
			.blue {
				color: #09eab5;
			}
      .hot-tips {
        display: inline-block;
        width: 39px;
        height: 16px;
        background: url("../assets/icon_es.png") no-repeat;
        background-position: -1416px -228px;
        font-size: 12px;
        line-height: 16px;
        letter-spacing: 0.3px;
        text-align: center;
        color: #303441;
      }
      .row1 {
        display: flex;
        width: 87%;
        margin-left: 37px;
        margin-top: 13px;
        justify-content: space-between;
        p:nth-child(2) {
          text-align: right;
        }
      }
      .v-btn {
        width: 120px;
        height: 40px;
        border: 2px solid transparent;
        border-radius: 20px;
        margin-right: 22px;
        text-align: center;
        line-height: 36px;
        font-size: 18px;
        box-sizing: border-box;
        cursor: pointer;
        background-clip: padding-box, border-box;
        background-origin: padding-box, border-box;
        background-image: linear-gradient(to right, #494d5e, #474a58), linear-gradient(90deg, #07f1b7, #07e9f1);
        &:hover {
          color: #09eab5;
        }
      }
      .row2 {
        display: flex;
        margin-left: 37px;
        margin-top: 13px;
        p {
          width: 120px;
          height: 40px;
          background-image: linear-gradient(to right, #494d5e, #3e4250), linear-gradient(90deg, #07f1b7, #07e9f1);
        }
        p:nth-child(1) {
          background-image: linear-gradient(to right, #494d5e, #474a58), linear-gradient(90deg, #07f1b7, #07e9f1);
        }
        p:nth-child(3) {
          width: 140px;
          background-image: linear-gradient(to right, #43475a, #373b4b), linear-gradient(90deg, #07f1b7, #07e9f1);
        }
      }
      .row3 {
        display: flex;
        width: 87%;
        justify-content: space-between;
        margin-left: 37px;
        margin-top: 45px;
      }
      .row4 {
        display: flex;
        width: 87%;
        justify-content: space-between;
        align-items: center;
        margin-left: 37px;
        margin-top: 15px;
        .record-btn {
          font-size: 20px;
          color: #07f0bb;
          text-decoration: underline;
          margin-left: -100px;
          cursor: pointer;
        }
      }
    }
    .trade-list {
      background: url('../assets/active/vrich/sprite.png') no-repeat -693px -30px;
      width: 280px;
      height: 372px;
      .title {
        font-size: 24px;
        color: #fff;
        font-weight: bold;
        text-align: center;
        margin: 27px 0px;
      }
			.none-list {
				font-size: 18px;
				text-decoration: underline;
				color: #ababab;
				text-align: center;
				margin-top: 130px
			}
      .interest {
        color: #07f0bb;
      }
      li {
        width: 235px;
        margin-left: 20px;
        margin-bottom: 19px;
        span:nth-child(2) {
          margin-left: 30px
        }
        span:nth-child(3) {
          float: right;
        }
        span:nth-child(4) {
          float: right;
          margin-right: 5px;
        }
      }

      .bottom-check {
        width: 240px;
        margin-left: 20px;
        margin-top: 40px;
        display: flex;
				position: absolute;
				bottom: 40px;
        justify-content: space-between;
        p:nth-child(1) {
          display: flex;
          align-items: center;
          span {
            display: inline-block;
            width: 18px;
            height: 18px;
            margin-right: 5px;
            border: 1px solid #fff;
            cursor: pointer;
            border-radius: 18px;
            &.checked {
              &::after {
                content: "";
                display: block;
                width: 12px;
                height: 12px;
                margin-top: 3px;
                margin-left: 3px;
                border-radius: 10px;
                background: #07f0bb;
              }
            }
          }
        }
        p:nth-child(2) {
          width: 80px;
          height: 16px;
          margin-top: 2px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .left {
          display: inline-block;
          width: 10px;
          height: 16px;
          cursor: pointer;
          background: url('../assets/active/vrich/btn-normal-l.png');
          &:hover {
            background: url('../assets/active/vrich/btn-hover-l.png')
          }
        }
        .right {
          display: inline-block;
          width: 10px;
          height: 16px;
          cursor: pointer;
          background: url('../assets/active/vrich/btn-normal-r.png');
          &:hover {
            background: url('../assets/active/vrich/btn-hover_r.png')
          }
        }
      }
    }
  }
  .notice {
    font-size: 17.5px;
    text-align: center;
    margin-top: 15px
  }
  .advantage {
    position: relative;
    width: 1250px;
    display: flex;
    justify-content: space-between;
    .item-box {
      width: 236px;
      height: 520px;
      position: relative;
      .item {
        width: 100%;
        height: 100%;
	      background: url('../assets/active/vrich/sprite.png') no-repeat -53px -434px;
        transform-origin: center;
        position: relative;
        cursor: pointer;
        transition: .3s linear;
        border-radius: 5%;
        // box-shadow: 0px 3px 4px rgba(0,0,0,.5);
        &:hover {
          transform: scale(1.1);
          .normal {
            opacity: 0;
            transition: .3s linear;
            transform: translate3d(-50% ,-100px ,0);
          }
          .hover {
            opacity: 1;
            transition: .3s linear;
            transform: translate3d(-50% ,0% ,0);
          }
        }
        .normal {
          width: 65%;
          position: absolute;
          bottom: 15%;
          text-align: center;
          margin-left: 50%;
          transform: translateX(-50%);
          transition: .3s linear;
          p:nth-child(1) {
            font-size: 24px;
            color: #484c5e;
            font-weight: bold;
          }
          p:nth-child(2) {
            font-size: 18px;
            color: #484c5e;
            margin-top: 10px;
          }
        }
        .hover {
          width: 85%;
          position: absolute;
          top: 65%;
          text-align: left;
          font-size: 12px;
          color: #484c5e;
          margin-left: 50%;
          transition: .3s linear;
          transform: translate3d(-50%, 100px, 0);
          opacity: 0;
          .show-vip {
            font-size: 12px;
            color: #628ce1;
            text-align: center;
            text-decoration: underline;
            margin-top: 22px;
          }
          //display: none;
        }
      }
    }
    .item-box:nth-child(2) .item{
      background: url('../assets/active/vrich/sprite.png') no-repeat -303px -434px;
    }
    .item-box:nth-child(3) .item{
      background: url('../assets/active/vrich/sprite.png') no-repeat -555px -434px;
    }
    .item-box:nth-child(4) .item{
      background: url('../assets/active/vrich/sprite.png') no-repeat -806px -434px;
    }
    .item-box:nth-child(5) .item{
      background: url('../assets/active/vrich/sprite.png') no-repeat -1057px -434px
    }
  }
  .steps {
    position: relative;
    width: 1250px;
    height: 340px;
    .step {
      position: absolute;
      width: 596px;
      height: 143px;
      font-size: 14px;
      color: #484c5e;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      p {
        position: absolute;
        font-size: 50px;
        font-family: Impact;
        color: #fff
      }
    }
    .step:nth-child(1) {
      background: url('../assets/active/vrich/sprite.png') no-repeat -59px -1060px;
      left: 0px;
      top: 0px;
      padding-left: 60px;
      padding-right: 180px;
      p {
        right: 48px;
      }
    }
    .step:nth-child(2) {
      background: url('../assets/active/vrich/sprite.png') no-repeat -704px -1060px;
      right: 0px;
      top: 0px;
      padding-left: 170px;
      padding-right: 60px;
      p {
        left: 45px;
      }
    }
    .step:nth-child(3) {
      left: 0px;
      bottom: 0px;
      padding-left: 60px;
      padding-right: 180px;
      background: url('../assets/active/vrich/sprite.png') no-repeat -59px -1251px;
      p {
        right: 45px;
      }
    }
    .step:nth-child(4) {
      right: 0px;
      bottom: 0px;
      padding-left: 170px;
      padding-right: 60px;
      background: url('../assets/active/vrich/sprite.png') no-repeat -704px -1250px;
      p {
        left: 45px;
      }
    }
    i:nth-child(5) {
     	background: url('../assets/active/vrich/sprite.png') no-repeat -1099px -1473px;
      width: 18px;
      height: 25px;
      position: absolute;
      left: 615px;
      top: 60px
    }
    i:nth-child(6) {
     	background: url('../assets/active/vrich/sprite.png') no-repeat -968px -1480px;
      width: 25px;
      height: 18px;
      position: absolute;
      left: 710px;
      top: 160px
    }
    i:nth-child(7) {
     	background: url('../assets/active/vrich/sprite.png') no-repeat  -1014px -1473px;
      width: 18px;
      height: 25px;
      position: absolute;
      left: 615px;
      top: 260px
    }
    i:nth-child(8) {
     	background: url('../assets/active/vrich/sprite.png') no-repeat  -1053px -1480px;
      width: 25px;
      height: 18px;
      position: absolute;
      left: 515px;
      top: 160px
    }
  }
  .rule {
    width: 1250px;
    height: 330px;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 20px;
    background: #383d49;
    box-shadow: 0px 3px 5px #222;
    .inner-box {
      width: 100%;
      height: 100%;
      border: 2px dashed #83868e;
      border-radius: 20px;
      padding-top: 34px;
      box-sizing: border-box;
      font-size: 14px;
      p {
        margin-left: 54px;
        line-height: 22px;
      }
      .question {
        font-weight: bold;
        position: relative;
        &::before {
          content: "•";
          position: absolute;
          left: -20px;
        }
      }
    }
  }
  .back_active_nav_b {
    width: 240px;
    height: 80px;
    border-radius: 40px;
    margin-top: 67px;
    font-size: 18px;
    text-align: center;
    line-height: 80px;
    font-weight: bold;
    cursor: pointer;
    background: url('../assets/active/vrich/sprite.png') no-repeat -1065px -91px;
    box-shadow: -2px 2px 4px #111;
    &:hover {
      background: url('../assets/active/vrich/sprite.png') no-repeat -1067px -197px;
    }
  }
}

.rich-award-dialog2 {

  .award-header {
    background: url('../assets/active/vrich/sprite.png') no-repeat -71px -1442px;
    width: 541px;
    height: 77px;
    font-size: 33px;
    font-weight: bold;
    color: #fff;
    text-align: center;
    line-height: 65px;
  }

  .award-body {
    width: 540px;
    height: 506px;
    background: #354566;
    border-radius: 20px;
    margin-top: 27px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    &::after {
      content: "";
      position: absolute;
      width: 520px;
      height: 476px;
      background: linear-gradient(to bottom, #6592ef, #202c44);
      border-radius: 20px;
      border: 2px dashed #fff;
      box-sizing: border-box;
      left: 10px;
      top: 10px;
    }

    .record-header, .record-item {
      width: 520px;
      margin-top: 30px;
      position: relative;
      z-index: 1;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #82a7f2;

      span, a {
        width: 33%;
        height: 50px;
        display: inline-block;
        text-align: center;
        font-size: 22px;
        color: #ffffff;
      }
    }

    .record-item {
      margin-top: 0px;

      span, a {
        font-size: 18px;
        line-height: 50px;
        color: #c7daff;
      }

      a {
        color: #07f0bc;
        text-decoration: underline;
        cursor: pointer;
      }
    }

    .none-record {
      z-index: 1;
      font-size: 18px;
      color: #c7daff;
      margin-top: 150px
    }

    .record-page-control {
      width: 120px;
      height: 16px;
      margin-top: 2px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: absolute;
      bottom: 50px;
      font-size: 18px;
      color: #fff;
      z-index: 1;
    }

    .left {
      display: inline-block;
      width: 16px;
      height: 25px;
      cursor: pointer;
      background: url('../assets/active/vrich/btn-normal-l.png');

      &:hover {
        background: url('../assets/active/vrich/btn-hover-l.png');
        background-size: 100% 100%;
      }

      background-size: 100% 100%;
    }

    .right {
      display: inline-block;
      width: 16px;
      height: 25px;
      cursor: pointer;
      background: url('../assets/active/vrich/btn-normal-r.png');

      &:hover {
        background: url('../assets/active/vrich/btn-hover_r.png');
        background-size: 100% 100%;
      }

      background-size: 100% 100%;
    }
  }

  .award-footer {
    width: 38px;
    height: 38px;
    position: absolute;
    bottom: -60px;
    cursor: pointer;
    background: url('../assets/active/vrich/sprite.png') no-repeat -739px -1472px;

    &:hover {
      background: url('../assets/active/vrich/sprite.png') no-repeat -845px -1472px;
    }
  }
}
</style>
<style lang="less">
  .rich-popover {
    p:nth-child(1) {
      font-size: 18px;
      color: white;
      text-align: center;
      margin-top: 18px;
      margin-bottom: 20px;
    }
		.level-box {
			width: 100%;
			height: 200px;
			display: flex;
			flex-direction: column;
			flex-wrap: wrap;
			position: relative;
			&::after {
				content: "";
				display: block;
				position: absolute;
				left: 100px;
				width: 1px;
				height: 180px;
        opacity: 0.25;
				background: #ababab;
        opacity: 0.25;
			}
		}
    li {
			width: 40%;
      display: flex;
			margin-bottom: 8px;
			margin-left: 5%;
      justify-content: space-between;
      font-size: 14px;
      span:nth-child(1) {
        color: #ababab;
      }
      span:nth-child(2) {
        color: #fff;
      }
    }
  }
  .rich-award-dialog2 {
    width: 550px;
    height: 600px;
    background: transparent;
    box-shadow: none;
    .el-dialog__header {
      display: none;
    }
    .el-dialog__body {
      padding: 0px;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
</style>
