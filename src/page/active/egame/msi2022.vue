<template>
  <div class="msi2022">
    <img src="../../../assets/active/msi2022/banner-web.jpg"/>
		<div class="main-content">
			<p class="msi2022-title t1"></p>
			<p class="msi2022-notice">{{activeData.start_time}}-{{activeData.end_time}}</p>
			<div class="tabs">
				<div class="tab1" :class="!tabIndex && 'active'" @click="tabIndex = 0"></div>
				<div class="tab2" :class="tabIndex && 'active'" @click="tabIndex = 1"></div>
			</div>

			<div class="content-1" v-if="!tabIndex">
				<p class="msi2022-title t2"></p>
				<p class="msi2022-notice">活动期间，会员每日首充每满100元即可获得MSI盲盒券，并参与2022MSI限定开盲盒活动，拯救者等你来拿！</p>
				<p class="record-btn" @click="handleRecord()"></p>
				<p class="tickets-num">我的盲盒券：<span>{{activeData.my_coupon}}张</span></p>
				<div class="box">
					<div class="box-item" v-for="i in 3" :key="i" :class="'box-' + i">
						<p class="check-award" @click="awardIndex = i-1;openShow1 = true"></p>
						<p class="open-btn" :class="!activeData.gift_info[i] && 'disabled'" @click="handleDraw(i)"></p>
					</div>
				</div>
				<div class="rule-box">
					<p class="msi2022-title t3"></p>
					<ol type="1">
						<li>会员每日首充每满100元即可获得一张盲盒券，每位会员每日最高可获得60张，会员可以在活动页面自行选择三种类型盲盒进行开奖，黄金盲盒需消耗3张盲盒券，钻石盲盒需消耗8张盲盒券，限定盲盒需消耗18张盲盒券。</li>
						<li>每日未发起提款前的存款都视为首充；每日获得的盲盒券仅限当日使用，隔日则无效。</li>
						<li>活动的现金奖品系统将自动派发至会员的主钱包中，彩金需完成全站3倍有效流水，奖品领取有效期为：自中奖之日起，15日内有效，若奖品为实物奖品，请联系在线客服提供中奖兑换码，提供您的详细收货地址，我们将于次日安排发货，快递单号将会发送站内信通知；除此之外您也可以联系在线客服选择折现，实物奖品折现后无需流水即可提款。</li>
						<li>有效流水要求：电竞赔率＜1.5、亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水；PT电子游戏中以下游戏不算有效流水：
						  <el-popover trigger="hover"
							placement="top"
							popper-class="msi2022-popover"
							width="430">
								<div class="msi2022">
									<li v-for="(item,i) in gameList" :key="i">
										<span>{{item}}</span>
									</li>
								</div>
								<span slot="reference">查看详情</span>
            	</el-popover>	。</li>
						<li>每位有效玩家、每个手机号码、电子邮箱、IP地址、每张银行卡、每台设备只能享受一次优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利；VKGAME对本活动保有最终解释权。 </li>
					</ol>
				</div>
				<router-link to="/active" class="back"></router-link>
			</div>

			<div class="content-2" v-if="tabIndex">
				<p class="msi2022-title t2"></p>
				<p class="msi2022-notice">活动期间，会员每日投注【MSI英雄联盟】赛事，早盘单场比赛累计有效投注≥500元，若出现以下玩法，即可领取活动彩金。</p>
				<table>
					<tr><td>早盘单场累计有效投注额</td><td>≥500元</td><td>≥1000元</td><td>≥3000元</td><td>≥5000元</td><td>≥10000元</td></tr>
					<tr><td>单局总人头28+</td><td>18元</td><td>38元</td><td>58元</td><td>88元</td><td>128元</td></tr>
					<tr><td>单局推塔总数15+</td><td>28元</td><td>58元</td><td>88元</td><td>128元</td><td>188元</td></tr>
					<tr><td>彩金流水要求</td><td colspan="5">1倍电竞流水</td></tr>
					<tr><td>游戏场馆</td><td colspan="5">小艾电竞、RG电竞、IM电竞</td></tr>
				</table>
				<div class="table-bg"></div>
				<div class="server-btn" @click="openKfWindow()"></div>
				<div class="rule-box">
					<p class="msi2022-title t3"></p>
					<ol type="1">
						<li>此优惠活动只计算会员在小艾电竞、RG电竞、IM电竞中投注【英雄联盟MSI】早盘单场比赛的累计有效投注，若投注其他盘口或赛事，则不会计算。</li>
						<li>参与特殊玩法助力优惠的会员需要在电竞游戏场馆（小艾电竞、RG电竞、IM电竞）早盘投注MSI英雄联盟 赛事；盘口赔率要求：投注指定赛事的赔率不得低于电竞赔率1.5。   </li>
						<li>符合条件的会员，需在比赛结束后24小时内联系在线客服申请优惠，彩金将在审核通过后的3日内派发至用户指定的电竞钱包中；此活动彩金需在所选的电竞场馆里完成1倍有效流水，在流水未完成前不可再次申请本活动，每日仅限领取一次彩金，逾期则视为自动放弃。</li>
						<li>当用户对应电竞钱包余额≤原钱包余额且无未结算注单时，系统将自动判定已完成活动规定的有效流水，有效投注额仅计算产生输赢的注单，电竞赔率＜1.5、注单取消、对冲、未结算等注单不计算为有效投注。</li>
						<li>每位有效玩家、每个手机号码、电子邮箱、IP地址、每张银行卡、每台设备只能享受一次优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利；VKGAME对本活动保有最终解释权。 </li>
					</ol>
				</div>
				<router-link to="/active" class="back"></router-link>
			</div>

			<el-dialog
			:visible.sync="openShow"
			custom-class="msi2022-dialog"
			:append-to-body="true">
				<div class="close" @click="openShow=false"></div>
				<div class="d-title"></div>
				<div class="d-list-box" v-if="pageData.count>0">
					<p><span>获奖日期</span><span>奖品名称</span></p>
					<p v-for="(item,i) in recordList" :key="i"><span>{{item.create_time.split(" ")[0]}}</span><span>{{item.item_name}}</span></p>
				</div>
				<p class="no-data" v-if="pageData.count==0">暂无数据</p>
        <el-pagination
					small
					layout="prev, pager, next"
					:pager-count="5"
					v-if="pageData.count>0"
					:total="pageData.count"
					:page-size="pageData.page_size"
					:current-page.sync="pageData.current_page"
					@current-change="handlePageChange"
					class="pagination">
				</el-pagination>
			</el-dialog>

			<el-dialog
			:visible.sync="openShow1"
			custom-class="msi2022-dialog d2"
			:append-to-body="true">
				<div class="close" @click="openShow1=false"></div>
				<div class="d-title" :class="'d-title' + awardIndex"></div>
				<div class="award-box">
					<div class="award-item" v-for="(item,i) in awardData[awardIndex]" :key="i">
						<img :src="item.img"/>
						<p>{{item.name}}</p>
					</div>
				</div>
			</el-dialog>

			<el-dialog
			:visible.sync="openShow2"
			custom-class="msi2022-dialog d3"
			:append-to-body="true">
				<div class="close" @click="openShow2=false"></div>
				<div class="d-title"></div>
				<div class="notice">恭喜您获得:{{getAward.item_name}}</div>
				<img :src="getAward.icon_url"/>
				<p class="service" v-if="getAward.secret">
					使用兑换码联系客服或折现<br>
					{{getAward.secret}} <span @click="doCopy(getAward.secret)">复制</span>
				</p>
				<p class="service" v-else>{{getAward.message}}</p>
			</el-dialog>

		</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	data () {
		return {
			tabIndex: 0,
			gameList: ['捕鱼多福','奖金轮盘','巨龙累积奖金轮盘赌','迷你轮盘','疯狂乐透','完美21点','钻石拼轮盘赌','炸金花','百家乐','专赌21点'],
			openShow: false,
			openShow1: false,
			openShow2: false,
			recordList: [],
			pageData: {
				count: 0,
				page_size: 5,
				current_page: 1,
			},
			activeData: {
				gift_info: {},
				gift_records: {
					list: []
				}
			},
			loading: false,
			awardIndex: 0,
			awardData: {
				0: [
					{img: require("../../../assets/active/msi2022/award/1.png"), name: '388V币'},
					{img: require("../../../assets/active/msi2022/award/2.png"), name: 'V富通1.5倍券'},
					{img: require("../../../assets/active/msi2022/award/3.png"), name: '5.8元现金'},
					{img: require("../../../assets/active/msi2022/award/4.png"), name: '电竞耳机'}
				],
				1: [
					{img: require("../../../assets/active/msi2022/award/1.png"), name: '888V币'},
					{img: require("../../../assets/active/msi2022/award/5.png"), name: 'V富通2倍券'},
					{img: require("../../../assets/active/msi2022/award/6.png"), name: '50Q币'},
					{img: require("../../../assets/active/msi2022/award/7.png"), name: '电竞鼠标'}
				],
				2: [
					{img: require("../../../assets/active/msi2022/award/3.png"), name: '16元现金'},
					{img: require("../../../assets/active/msi2022/award/8.png"), name: '京东购物卡'},
					{img: require("../../../assets/active/msi2022/award/9.png"), name: '电竞椅'},
					{img: require("../../../assets/active/msi2022/award/10.png"), name: '拯救者R9000P'}
				]
			},
			getAward: {}
		}
	},
	mounted () {
		this.initData()
	},
	watch: {
		isLogin(ne) {
			this.initData()
		}
	},
	computed: mapState(['isLogin']),
	methods: {
		initData (t) {
      this.$http(this.ApiSetting.active.getActiveMsi2022Init)
      .then(res => {
        if(res.status == 1) {
					console.log(res.data)
					this.activeData = res.data
					if (res.data.gift_records) {
						this.pageData.count = res.data.gift_records.total
					}
					if (t) {
						this.handlePageChange()
					}
        }
      })
		},

		handlePageChange () {
			console.log(this.pageData.current_page)
			let page = this.pageData.current_page - 1
			if (this.activeData.gift_records.list.length) {
				this.recordList = this.activeData.gift_records.list.slice(page*5,page*5+5)
			}
		},

		handleDraw (i) {
      if (this.loading) return
      this.loading = true
      this.$http(this.ApiSetting.active.joinActiveMsi2022Draw,{level:i})
      .then(res => {
        if(res.status == 1) {
					this.getAward = res.data
					this.openShow2 = true
					let arr = [3,8,18]
					this.activeData.my_coupon -= arr[i-1]
					this.changeStatus()
        }
      })
      .finally(() => {
        this.loading = false
      })
		},

		changeStatus() {
			if (this.activeData.my_coupon < 18) {
				this.activeData.gift_info[3] = false
			}
			if (this.activeData.my_coupon < 8) {
				this.activeData.gift_info[2] = false
			}
			if (this.activeData.my_coupon < 3) {
				this.activeData.gift_info[1] = false
			}
		},

		handleRecord () {
			if (!this.isLogin) {
				return this.$message({
          message: '请您先登录',
          type: 'warning'
        })
			}
			this.pageData.current_page = 1
			this.openShow = true
			this.initData(true)
		},

    doCopy(text) {
      this.$copyText(text).then((e) => {
        this.$message({
          message: '兑换码复制成功，请即时联系客服兑换',
          type: 'success'
        })
      }, function (e) {
        this.$message({
          message: this.$t("Copy_the_failure"),
          type: 'warning'
        })
      })
    }
	},
}
</script>

<style lang="less" scoped>
	.msi2022 {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		.main-content {
			width: 1920px;
			// height: 1540px;
			padding-bottom: 50px;
			display: flex;
			flex-direction: column;
			align-items: center;
			background: url("../../../assets/active/msi2022/bg-web.jpg");
			.msi2022-title {
				width: 131px;
				height: 27px;
				margin-top: 40px;
				margin-bottom: 18px;
				display: block;
			}
			.msi2022-notice {
				font-size: 14px;
				color: #171717;
				text-align: center;
			}
			.t1 {
				background: url("../../../assets/active/msi2022/sprite.png")  -10px -10px;
			}
			.t2 {
				background: url("../../../assets/active/msi2022/sprite.png")  -10px -56px;
			}
			.t3 {
				background: url("../../../assets/active/msi2022/sprite.png")  -10px -101px;
			}
			.tabs {
				width: 688px;
				height: 58px;
				margin-top: 37px;
				display: flex;
				justify-content: space-between;
			}
			.tab1 {
				width: 344px;
				height: 58px;
				cursor: pointer;
				background: url("../../../assets/active/msi2022/sprite.png")  -10px -569px;
				&:hover {
					background: url("../../../assets/active/msi2022/sprite.png")  -10px -477px;
				}
				&.active {
					background: url("../../../assets/active/msi2022/sprite.png")  -10px -397px;
				}
			}
			.tab2 {
				width: 344px;
				height: 58px;
				cursor: pointer;
				background: url("../../../assets/active/msi2022/sprite.png")  -377px -569px;
				&:hover {
					background: url("../../../assets/active/msi2022/sprite.png")  -377px -477px;
				}
				&.active {
					background: url("../../../assets/active/msi2022/sprite.png")  -377px -397px;
				}
			}
			.rule-box {
				width: 988px;
				height: 438px;
				margin-top: 50px;
				display: flex;
				flex-direction: column;
				align-items: center;
				background: url("../../../assets/active/msi2022/bg.png");
				ol {
					width: 755px;
					li {
						font-size: 14px;
						color: #171717;
						margin-bottom: 20px;
						line-height: 1.6;
						list-style-type: decimal;
						span {
							color: #0048d9;
							cursor: pointer;
							text-decoration: underline;
						}
					}
				}
			}
			.back {
				display: block;
				background: url('../../../assets/active/msi2022/sprite.png') no-repeat -546px -217px;
				width: 267px;
				height: 47px;
				margin-top: 50px;
				transition: .2s;
				&:hover {
					transform: scale(1.2);
				}
			}
		}
		.content-1 {
			width: 988px;
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;
			.record-btn {
				position: absolute;
				background: url('../../../assets/active/msi2022/sprite.png') no-repeat -358px -86px;
				width: 110px;
				height: 32px;
				right: 0px;
				top: 76px;
				cursor: pointer;
				transition: .2s;
				&:hover {
					transform: scale(1.2);
				}
			}
			.tickets-num {
				margin-top: 40px;
				background: url('../../../assets/active/msi2022/sprite.png') no-repeat -358px -149px;
				width: 147px;
				height: 38px;
				right: 0px;
				top: 70px;
				font-size: 14px;
				color: #a5d9a9;
				text-align: center;
				line-height: 38px;
				span {
					color: #fff
				}
			}
			.box {
				width: 988px;
				height: 493px;
				margin-top: 20px;
				display: flex;
				justify-content: space-between;
				.box-item {
					width: 289px;
					height: 493px;
					position: relative;
					background: url('../../../assets/active/msi2022/box-1.png') no-repeat;
				}
				.box-2 {
					background: url('../../../assets/active/msi2022/box-2.png') no-repeat;
				}
				.box-3 {
					background: url('../../../assets/active/msi2022/box-3.png') no-repeat;
				}
				.check-award {
					width: 122px;
					height: 35px;
					position: absolute;
					top: 33px;
					left: 86px;
					cursor: pointer;
					transition: .2s;
					background: url('../../../assets/active/msi2022/sprite.png') no-repeat -546px -85px;
					&:hover {
						transform: scale(1.2);
					}
				}
				.open-btn {
					width: 147px;
					height: 46px;
					position: absolute;
					bottom: 36px;
					left: 71px;
					cursor: pointer;
					transition: .2s;
					background: url('../../../assets/active/msi2022/sprite.png') no-repeat -358px -217px;
					&:hover {
						transform: scale(1.2);
					}
					&.disabled {
						background: url('../../../assets/active/msi2022/sprite.png') no-repeat -358px -293px;
						pointer-events: none;
					}
				}
			}

		}
		.content-2 {
			width: 988px;
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;
			table {
				width: 776px;
				margin-top: 30px;
				position: relative;
				z-index: 2;
				td {
					border: 1px solid #555;
					height: 40px;
					text-align: center;
					color: #171717;
					background: #fff
				}
				td:nth-child(1) {
					width: 179px;
					background: transparent
				}

			}
			.table-bg {
				position: absolute;
				z-index: 0;
				top: 134px;
				left: 106px;
				width: 180px;
				height: 205px;
				background: linear-gradient(to bottom, #5ff1cd, #d7c890)
			}
			.server-btn {
				background: url('../../../assets/active/msi2022/sprite.png') no-repeat -546px -146px;
				width: 147px;
				height: 46px;
				margin-top: 30px;
				cursor: pointer;
				transition: .2s;
				&:hover {
					transform: scale(1.2);
				}
			}
		}
	}
</style>
<style lang="less">
	.msi2022-popover {
		width: 430px;
		height: 280px;
		background: url("../../../assets/active/msi2022/pop.png") no-repeat;
		border: none;
		margin-bottom: 0px!important;
		padding: 0px;
		box-shadow: none;
		.popper__arrow {
			display: none;
		}
		.msi2022 {
			width: 100%;
			height: 50%;
			margin-top: 100px;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: center;
			position: relative;
			li {
				width: 40%;
				height: 20px!important;
				font-size: 14px;
				color: #171717;
				text-align: center;
			}
			&::after {
				position: absolute;
				content: "";
				display: block;
				width: 1px;
				height: 100%;
				background: #171717
			}
		}
	}
	.msi2022-dialog {
		width: 430px;
		height: 430px;
		background: url("../../../assets/active/msi2022/award-list.png") no-repeat;
		overflow: hidden;
		.el-dialog__header {
			display: none;
		}
		.el-dialog__body {
			padding: 0px;
		}
		.close {
			width: 32px;
			height: 32px;
			position: absolute;
			right: 27px;
			top: 27px;
			cursor: pointer;
			background: url('../../../assets/active/msi2022/sprite.png') no-repeat -358px -24px;
		}
		.d-title {
			width: 170px;
			height: 27px;
			margin-top: 50px;
			margin-left: 131px;
			background: url('../../../assets/active/msi2022/sprite.png') no-repeat -10px -192px;
		}
		.d-list-box {
			margin-left: 50%;
			transform: translateX(-50%);
			width: 250px;
			height: 210px;
			margin-top: 40px;
			font-size: 14px;
			color: #171717;
			position: relative;
			p {
				height: 35px;
			}
			span {
				display: inline-block;
				width: 50%;
				text-align: center;
			}
			&::after {
				content: "";
				display: block;
				width: 1px;
				height: 195px;
				position: absolute;
				top: 0px;
				left: 125px;
				background: #171717;
			}
		}

		.pagination {
			width: 350px;
			display: flex;
			justify-content: center;
			margin-left: 50%;
			transform: translateX(-50%);
			position: absolute;
			bottom: 30px;
			color: #171717;
			.el-pager {
				width: auto;
				display: flex;
				justify-content: space-around;
			}
			.el-icon-more {
				display: none;
			}
			.btn-prev {
				width: 28px;
				height: 28px;
				background: url('../../../assets/active/msi2022/sprite.png') no-repeat -437px -26px;
				border: none;
				cursor: pointer;
				margin-right: 10px
			}
			.number {
				width: 28px;
				height: 28px;
				text-align: center;
				line-height: 28px;
				cursor: pointer;
				margin: 0px 10px
			}
			.number.active{
				width: 28px;
				height: 28px;
				background: url('../../../assets/active/msi2022/sprite.png') no-repeat -513px -26px;
				border: none;
				color: #a5d9a9!important;
				text-align: center;
				line-height: 28px;
			}
			.btn-next {
				width: 28px;
				height: 28px;
				background: url('../../../assets/active/msi2022/sprite.png') no-repeat -588px -26px;
				border: none;
				cursor: pointer;
				margin-left: 10px
			}
		}
		.no-data {
			text-align: center;
			margin-top: 150px
		}

	}

	.msi2022-dialog.d2 {
		width: 470px;
		height: 485px;
		background: url("../../../assets/active/msi2022/award-show.png") no-repeat;
		.d-title {
			width: 273px;
			height: 27px;
			margin-top: 50px;
			margin-left: 100px;
			background: url('../../../assets/active/msi2022/sprite.png') no-repeat -9px -238px;
		}
		.d-title1 {
			background: url('../../../assets/active/msi2022/sprite.png') no-repeat -10px -283px;
		}
		.d-title2 {
			background: url('../../../assets/active/msi2022/sprite.png') no-repeat -9px -329px;
		}
		.award-box {
			width: 337px;
			height: 315px;
			margin-left: 50%;
			margin-top: 40px;
			transform: translateX(-50%);
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			.award-item {
				width: 160px;
				height: 150px;
				background: url('../../../assets/active/msi2022/1.png') no-repeat;
				position: relative;
				img {
					max-width: 80%;
					max-height: 60%;
					margin-left: 50%;
					margin-top: 38%;
					transform: translate3D(-50%,-50%,0);
				}
				p {
					position: absolute;
					font-size: 14px;
					font-weight: bold;
					width: 100%;
					text-align: center;
					bottom: 5px;
					color: #fff
				}
			}
		}
	}

	.msi2022-dialog.d3 {
		.d-title {
			width: 134px;
			height: 27px;
			margin-top: 50px;
			margin-left: 149px;
			background: url('../../../assets/active/msi2022/sprite.png') no-repeat -10px -147px;
		}
		.notice {
			width: 100%;
			text-align: center;
			font-size: 14px;
			color: #171717;
			margin-top: 9px
		}
		img {
			max-width: 253px;
			max-height: 174px;
			margin-top: 26px;
			margin-left: 50%;
			transform: translateX(-50%);
		}
		.service {
			width: 100%;
			text-align: center;
			line-height: 1.5;
			font-size: 14px;
			color: #171717;
			position: absolute;
			bottom: 50px;
			span {
				text-decoration: underline;
				cursor: pointer;
			}
		}
	}
</style>
