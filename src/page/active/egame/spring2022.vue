<template>
  <div class="spring-2022">
    <h3 class="title-box">活动时间</h3>
		<p class="spring-time">{{activeTime}}</p>
    <h3 class="title-box">活动内容</h3>
		<p class="spring-time">活动期间，会员每日累计存款≥500元，投注"2022PCL春季赛"盘口即可完成签到，并参与注单包赔，且满足累计签到开箱将有机会拿到 iPhone 13 Pro 哦！</p>
		<div class="tab-box">
			<div class="tab" :class="tabFlag == 0 && 'active'" @click="tabFlag = 0"></div>
			<div class="tab" :class="tabFlag == 1 && 'active'" @click="tabFlag = 1"></div>
		</div>

		<div class="transfer-box">
			<transition name="fade-up">
				<div class="active-one" :key="1" v-if="tabFlag == 0">
					<div class="table-box">
						<table>
							<th>电竞游戏场馆</th><th>存款金额</th><th>单笔投注金额</th><th>包赔返利</th><th>包赔上限金额</th><th>流水要求</th>
							<tr>
								<td>小艾电竞、<br>IM电竞</td>
								<td>≥500</td>
								<td>≥500</td>
								<td>10%</td>
								<td>888</td>
								<td>电竞游戏5倍流水</td>
							</tr>
						</table>
					</div>
					<div class="spring-btn" :class="today_baopei && 'disabled'" @click="checkApplyState">{{today_baopei ? '今日已申请' : '立即申请'}}</div>
				</div>

				<div class="active-two" :key="2" v-else>
					<p class="sign-days">我的累计签到天数:第{{sign_days}}天</p>
					<div class="step-box">
						<div class="record-btn" @click="openRecord()">开箱记录</div>
						<div class="step-line" :class="'step-line' + level"></div>
						<div class="step-item" v-for="(item,i) in stepData" :key="i">
							<p class="h3" :class="'active' + item.status">累计签到第{{item.days}}天</p>
							<el-popover
								placement="bottom"
								width="725"
								popper-class="spring-pop-2022"
								trigger="hover">
								<div class="award-box">
									<h3 class="pop-title">有机会获得：</h3>
									<div class="award-list">
										<div class="award" v-for="(element,j) in item.data" :key="j">
											<img :src="element.icon_url"/>
											<p>{{element.desc}}</p>
										</div>
									</div>
								</div>
								<div class="box-box" :class="[item.status == 1 && 'canOpen']" slot="reference">
									<img class="box-img" :src="item.status ? item.box_img : item.box_img_d"/>
									<div class="award-box" v-if="item.status == 2">
										<img class="award" :src="item.prize"/>
									</div>
								</div>
							</el-popover>
							<div class="spring-btn" :class="[{'disabled': item.status == 0},{'special2': item.status == 2}]" @click="signBtnClick(i, item)">{{item.buttonText}}</div>
						</div>
					</div>
				</div>
			</transition>
		</div>


		<h3 class="title-box">活动规则</h3>
		<div class="spring-rule">
			<ol type="1">
				<li>会员当天累计存款≥500元 在指定电竞游戏场馆投注【2022PCL春季赛】即可完成签到，若单笔注单结算为负盈利，即可领取包赔金；每位会员每天仅限领取一次包赔金活动。当完成签到累计的第2-4-6-8天，可额外开启“补给箱”。电竞游戏场馆仅限：小艾电竞、IM电竞。</li>
				<li>符合申请包赔条件的用户需在注单结算后的24小时内手动进行领取，包赔金将在审核通过后的3日内派发至用户指定的电竞钱包（小艾电竞、IM电竞二选一）中，包赔金需在所选游戏中完成对应的流水要求，流水未完成前不可再次申请本活动；当用户对应电竞钱包余额≤原钱包余额且无未结算注单时，系统将自动判定已完成活动规定的有效流水。</li>
				<li>活动的开箱现金奖品系统将自动派发至会员的主钱包中，彩金需完成全站3倍有效流水。累计签到开箱的有效时间为：2022年04月01日00:00~2022年04月10日23:59，需要在活动页面自行领取，逾期则视为自动放弃。</li>
				<li>若奖品为实物奖品，请联系在线客服提供中奖兑换码，提供您的详细收货地址，我们将于次日安排发货，且快递单号将会发送站内信通知。除此之外您也可以联系在线客服选择折现，实物奖品折现后无需流水即可提款。</li>
				<li>此活动领取当天不与体育包赔活动、电竞首存活动、其他救援金活动共享。若用户参与了电竞首存活动，需先完成电竞首存活动流水才可参加本活动；同样其他救援金与包赔活动都不共享，活动同时进行时，只可选择一个参加。</li>
				<li>有效流水要求：电竞赔率＜1.5、亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水；PT电子游戏中以下游戏不算有效流水：<activeptliushui color="#00bd8f"></activeptliushui>。</li>
				<li>每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能使用一个账号享受优惠。对违规的用户，VKGAME保留无限期审核， 和扣回红利及所产生的利润权利，本活动最终解释权归VKGAME所有。</li>
			</ol>
		</div>

		<router-link to="/active" class="back-btn">{{$t("Return_to_activity_page")}}</router-link>

		<el-dialog
			:visible.sync="visible1"
			:append-to-body="true"
			custom-class="spring-dialog-1"
			top="200px"
			width="532px">
			<div v-if="visible1" class="main">
				<p class="title">恭喜您获得</p>
				<p class="close" @click="visible1 = false"></p>
				<div class="img-box">
					<img :src="awardData.icon_url"/>
					<p class="num">{{awardData.item_name}}</p>
				</div>
				<p class="name">恭喜您获得{{awardData.item_name}}</p>
				<p class="tip">{{awardData.message}}</p>
				<p class="copy" v-if="awardData.secret">{{awardData.secret}}<span @click="doCopy(awardData.secret)">复制</span></p>
				<div class="btn-box" v-if="awardData.secret">
					<div class="spring-btn spring-btn1" @click="visible1 = false">稍后再说</div>
					<div class="spring-btn" @click="openKfWindow()">联系客服</div>
				</div>
				<div class="btn-box" v-else>
					<div class="spring-btn" @click="visible1 = false">知道了</div>
				</div>
			</div>
		</el-dialog>

		<el-dialog
			:visible.sync="visible2"
			:append-to-body="true"
			custom-class="spring-dialog-2"
			top="200px"
			width="532px">
			<div v-if="visible2" class="main">
				<p class="title">申请包赔金</p>
				<p class="close" @click="visible2 = false"></p>
				<p class="little-title">请选择包赔金转入的钱包：</p>
				<div class="wallet-list">
					<p class="wallet" :class="i == walletFlag && 'active'" v-for="(item,i) in wallets" :key="i" @click="walletFlag = i">{{item.name}}</p>
				</div>
				<p class="little-title">请填写申请注单的注单号：</p>
				<input v-model.trim="orderText" placeholder="请填写申请注单的注单号"/>
				<div class="btn-box">
					<div class="spring-btn spring-btn1" @click="visible2 = false;orderText = ''">暂不申请</div>
					<div class="spring-btn" @click="sendApply">立即申请</div>
				</div>
			</div>
		</el-dialog>

		<el-dialog
			:visible.sync="visible3"
			:append-to-body="true"
			custom-class="spring-dialog-3"
			top="200px"
			width="532px">
			<div v-if="visible3" class="main">
				<p class="title">开箱记录</p>
				<p class="close" @click="visible3 = false"></p>
				<p class="record-title"><span>奖品名称</span><span>领取日期</span></p>
				<div class="record-list">
					<p class="none" v-if="!records.length && !loading">暂无开箱记录，快去参与活动吧~</p>
					<p class="list-item" v-for="(item,i) in records" :key="i"><span>{{item.item_name}}</span><span>{{item.create_time.split(" ")[0]}}</span></p>
				</div>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	data () {
		return {
			tabFlag: 0,
			stepData: [
				{
					status: 0,
					days: 2,
					box_img: require("../../../assets/active/spring2022/box1.png"),
					box_img_d: require("../../../assets/active/spring2022/box1-d.png"),
				},
				{
					status: 1,
					days: 4,
					box_img: require("../../../assets/active/spring2022/box2.png"),
					box_img_d: require("../../../assets/active/spring2022/box2-d.png"),
				},
				{
					status: 2,
					days: 6,
					box_img: require("../../../assets/active/spring2022/box3.png"),
					box_img_d: require("../../../assets/active/spring2022/box3-d.png"),
				},
				{
					status: 2,
					days: 8,
					box_img: require("../../../assets/active/spring2022/box4.png"),
					box_img_d: require("../../../assets/active/spring2022/box4-d.png"),
				},
			],
			visible1: false,
			visible2: false,
			visible3: false,
			walletFlag: 0,
			wallets: [
				{name: '小艾钱包',code: "EG"},
				{name: 'TF钱包',code: "TF"},
				{name: 'IM钱包',code: "IM"},
			],
			orderText: '',
			loading: false,
			activeTime: "",
			sign_days: "",
			today_baopei: "",
			is_login: 0,
			level: 0,
			records: [],
			awardData: {}
		}
	},
	mounted() {
		this.initData()
	},
	watch: {
		isLogin(ne) {
			this.initData()
		}
	},
	computed: mapState(['isLogin']),
	methods: {
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
		},
	  // 初始化中奖记录弹窗
    initData () {
      if (this.loading) return
      this.loading = true
      this.$http(this.ApiSetting.active.getActivePcl2022Init)
        .then((res) => {
          if (res.status === 1) {
						console.log(res.data)
						this.activeTime = res.data.active_show_time
						this.sign_days = res.data.sign_days
						//this.level = Math.floor(res.data.sign_days/2)
						this.level = res.data.sign_days

						this.is_login = res.data.is_login
						this.today_baopei = res.data.today_baopei

						let signInfo = []
						signInfo.push(res.data.active_setting["1"])
						signInfo.push(res.data.active_setting["2"])
						signInfo.push(res.data.active_setting["3"])
						signInfo.push(res.data.active_setting["4"])

						signInfo.forEach((item,i) => {
								item.days = (i+1)*2
								item.box_img = this.stepData[i].box_img
								item.box_img_d = this.stepData[i].box_img_d
								if (res.data.sign_days >= (i+1)*2) {
									item.status = item.prize ? 2 : 1
									item.buttonText = item.prize ? "已开箱" : "可开箱"
								} else {
									item.status = 0
									item.buttonText = "未开箱"
								}
						})

						this.stepData = signInfo
          }
        })
        .finally(() => {
          this.loading = false
        })
    },

		signBtnClick (i, item) {
			if (!this.isLogin) {
				return this.$message({message: '请您先登录',type: 'warning'})
			}

      if (this.loading || item.status != 1) return
      this.loading = true
      this.$http(this.ApiSetting.active.joinPcl2022DrawReward, {level: +i + 1})
        .then((res) => {
          if (res.status === 1) {
						this.awardData = res.data
						this.visible1 = true
          }
        })
        .finally(() => {
          this.loading = false
					this.initData()
        })
		},

		checkApplyState () {
			if (!this.isLogin) {
				return this.$message({message: '请您先登录',type: 'warning'})
			}
			if (this.today_baopei) return
			this.visible2 = true
		},

		sendApply () {
			if (!this.orderText) {
				return this.$message({message: '请填写申请注单的注单号',type: 'warning'})
			}
      if (this.loading) return
      this.loading = true
			this.$http(this.ApiSetting.active.joinPcl2022BaoPei, {wallet: this.wallets[this.walletFlag].code, order_id: this.orderText})
			.then((res) => {
				if (res.status === 1) {
					this.$message({message: '申请成功，审核通过后将派发至相应的电竞钱包内',type: 'success'})
					this.visible2 = false
					this.today_baopei = 1
				}
			})
			.finally(() => {
				this.initData()
				this.loading = false
				this.orderText = ''
			})
		},

		openRecord () {
			if (!this.isLogin) {
				return this.$message({message: '请您先登录',type: 'warning'})
			}
			this.visible3 = true

      if (this.loading) return
      this.loading = true
			this.$http(this.ApiSetting.active.getPcl2022HistoryRecord)
			.then((res) => {
				if (res.status === 1) {
					this.records = res.data.list
				}
			})
			.finally(() => {
				this.loading = false
			})
		}
	}
}
</script>

<style lang="less" scoped>
	.spring-2022 {
		width: 100%;
		height: 2318px;
		padding-top: 680px;
		box-sizing: border-box;
		display: flex;
		overflow: hidden;
		flex-direction: column;
		align-items: center;
		background: url("../../../assets/active/spring2022/bg.jpg") no-repeat center top;

		.fade-up-enter-active,.fade-up-leave-active {
			transition: all .5s;
		}
		.fade-up-enter-to {
			opacity: 1;
		}
		.fade-up-enter {
			opacity: 0;
			transform: translateY(20px);
		}
		.fade-up-leave-to {
			opacity: 0;
		}
		// .ani-right-enter {
		// 	transform: translateX(20%);
		// }
		// .ani-right-enter-active {
		// 	transition: all .2s;
		// }
		// .ani-right-leave-active {
		// 	transition: all .1s;
		// }
		// .ani-right-enter-to {
		// 	transform: translateX(0%);
		// }
		// .ani-right-leave-to {
		// 	transform: translateX(-20%);
		// }
		// .ani-left-enter {
		// 	transform: translateX(-20%);
		// }
		// .ani-left-enter-active{
		// 	transition: all .2s;
		// }
		// .ani-left-leave-active {
		// 	transition: all .1s;
		// }
		// .ani-left-enter-to {
		// 	transform: translateX(0%);
		// }
		// .ani-left-leave-to {
		// 	transform: translateX(20%);
		// }
		.transfer-box {
			width: 1250px;
			position: relative;
			height: 390px
			// display: flex;
			//justify-content: center;
			//overflow: hidden;
		}

		.title-box {
			width: 80px;
			height: 80px;
			font-size: 20px;
			font-weight: bold;
			line-height: 70px;
			color: #007b4b;
			margin-bottom: 5px;
			margin-top: 50px;
			background: url("../../../assets/active/spring2022/title-box.png") no-repeat;
		}
		.spring-time {
			font-size: 14px;
			color: #0a6241;
		}

		.active-one,.active-two{
			position: absolute;
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
		}
		.tab-box {
			width: 1250px;
			height: 85px;
			margin-top: 60px;
			display: flex;
			justify-content: space-between;
			.tab:nth-child(1) {
				width: 600px;
				height: 85px;
				cursor: pointer;
				background: url("../../../assets/active/spring2022/active1.png") no-repeat;
				&:hover,&.active {
					background: url("../../../assets/active/spring2022/active1-hover.png") no-repeat;
				}
			}
			.tab:nth-child(2) {
				width: 600px;
				height: 85px;
				cursor: pointer;
				background: url("../../../assets/active/spring2022/active2.png") no-repeat;
				&:hover,&.active {
					background: url("../../../assets/active/spring2022/active2-hover.png") no-repeat;
				}
			}
		}
		.active-one {
			.table-box {
				width: 1222px;
				height: 320px;
				margin-top: 20px;
				overflow: hidden;
				background: url("../../../assets/active/spring2022/table.png") no-repeat;
			}
			table {
				width: 1100px;
				height: 210px;
				margin-left: 61px;
				margin-top: 50px;
				background: url("../../../assets/active/spring2022/table-border.png") no-repeat;
				th {
					width: 185px;
					height: 80px;
					font-size: 20px;
					font-weight: bold;
					color: #007b4b;
					line-height: 110px;
				}
				td {
					text-align: center;
					font-size: 14px;
					color: #00bd8f;
					padding-bottom: 20px;
				}
				td:nth-child(1) {
					padding-left: 60px;
					box-sizing: border-box;
					text-align: left;
				}
			}
		}
		// .spring-btn {
		// 	width: 176px;
		// 	height: 62px;
		// 	font-size: 20px;
		// 	font-weight: bold;
		// 	color: #fff;
		// 	text-align: center;
		// 	letter-spacing: 5px;
		// 	line-height: 62px;
		// 	cursor: pointer;
		// 	background: url("../../../assets/active/spring2022/btn.png") no-repeat center top;
		// 	&:hover {
		// 		background: url("../../../assets/active/spring2022/btn-hover.png") no-repeat center top;
		// 	}
		// 	&.disabled {
		// 		cursor: pointer;
		// 		background: url("../../../assets/active/spring2022/btn-disabled.png") no-repeat center top;
		// 	}
		// }
		.spring-rule {
			width: 1220px;
			height: 480px;
			background: url("../../../assets/active/spring2022/rule.png") no-repeat center top;
			ol {
				width: 1000px;
				margin-left: 110px;
				margin-top: 70px;
			}
			ol li {
				font-size: 14px;
				color: #0a6241;
				list-style-type: decimal;
				line-height: 1.6
			}
		}
		.back-btn {
			margin-top: 40px;
			width: 378px;
			height: 80px;
			font-size: 18px;
			text-align: center;
			line-height: 80px;
			background: url("../../../assets/active/spring2022/back.png") no-repeat center top;
			&:hover {
				background: url("../../../assets/active/spring2022/back-hover.png") no-repeat center top;
			}
		}

		.sign-days {
			font-size: 17px;
			color: #0a6241;
			margin-top: 30px;
			margin-bottom: 30px
		}
		.step-box {
			width: 1240px;
			position: relative;
			display: flex;
			justify-content: space-between;
			.record-btn {
				position: absolute;
				width: 121px;
				height: 60px;
				right: 0px;
				top: -70px;
				text-align: center;
				line-height: 58px;
				font-size: 16px;
				padding-right: 10px;
				font-weight: bold;
				color: #0a6241;
				cursor: pointer;
				background: url("../../../assets/active/spring2022/record-btn.png") no-repeat center top;;
			}
			.step-line {
				position: absolute;
				width: 1238px;
				height: 17px;
				top: 30px;
				background: url("../../../assets/active/spring2022/progress-gray.png") no-repeat center top;
				&::after {
					content: "";
					display: block;
					width: 100%;
					height: 17px;
					background: url("../../../assets/active/spring2022/progress.png") no-repeat;
				}
			}
			.step-line.step-line0::after {
				width: 0%;
			}
			.step-line.step-line1::after {
				width: 12.5%;
			}
			.step-line.step-line2::after {
				width: 12.5%;
			}
			.step-line.step-line3::after {
				width: 25%;
			}
			.step-line.step-line4::after {
				width: 37.5%
			}
			.step-line.step-line5::after {
				width: 50%
			}
			.step-line.step-line6::after {
				width: 62.5%;
			}
			.step-line.step-line7::after {
				width: 75%
			}
			.step-line.step-line8::after {
				width: 100%;
			}
			.step-item {
				width: 310px;
				height: 330px;
				position: relative;
				z-index: 1;
				display: flex;
				flex-direction: column;
				align-items: center;
				.h3 {
					display: block;
					width: 162px;
					height: 64px;
					font-size: 16px;
					color: #fff;
					text-align: center;
					line-height: 64px;
					&.active0 {
						background: url("../../../assets/active/spring2022/step1.png") no-repeat center top;
					}
					&.active1 {
						background: url("../../../assets/active/spring2022/step2.png") no-repeat center top;
					}
					&.active2 {
						background: url("../../../assets/active/spring2022/step3.png") no-repeat center top;
					}
				}
				.box-box {
					width: 200px;
					height: 150px;
					margin-top: 20px;
					margin-bottom: 30px;
					position: relative;
					// &.active0 {
					// 	background: url("../../../assets/active/spring2022/box1.png") no-repeat center top;
					// }
					// &.active1 {
					// 	background: url("../../../assets/active/spring2022/box2.png") no-repeat center top;
					// }
					// &.active2 {
					// 	background: url("../../../assets/active/spring2022/box3.png") no-repeat center top;
					// }
					// &.active3 {
					// 	background: url("../../../assets/active/spring2022/box4.png") no-repeat center top;
					// }
					.box-img {
						position: relative;
						z-index: 1;
					}
					.award-box {
						width: 144px;
						height: 144px;
						position: absolute;
						top: 0px;
						left: 30px;
						z-index: 2;
						display: flex;
						justify-content: center;
						align-items: center;
						background: url("../../../assets/active/spring2022/award-bg.png") no-repeat center top;
						.award {
							width: 130px;
							height: 110px;
						}
					}
					&.canOpen::after {
						content: "";
						position: absolute;
						top: 0px;
						left: -100px;
						width: 400px;
						height: 160px;
						display: block;
						background: url("../../../assets/active/spring2022/bottom.png") no-repeat center top;
					}
					// .step-btn {
					// 	width: 176px;
					// 	height: 62px;
					// 	background: url("../../../assets/active/spring2022/step1.png") no-repeat center top;
					// }
				}
			}
		}

	}
</style>
<style lang="less">
	.spring-pop-2022 {
		border: none;
		background: transparent;
		box-shadow: none;
		.popper__arrow {
			border: none!important;
			width: 24px;
			height: 32px;
			background: url("../../../assets/active/spring2022/arrow.png") no-repeat center top;
			&::after {
				display: none;
			}
		}
		.award-box {
			margin-top: 30px;
			overflow: hidden;
			.pop-title {
				width: 100%;
				height: 60px;
				font-size: 18px;
				color: #fff;
				line-height: 60px;
				padding-left: 80px;
				box-sizing: border-box;
				background: url("../../../assets/active/spring2022/top.png") no-repeat center top;
				background-size: 100% 100%;
				position: absolute;
			}
			.award-list {
				width: 90%;
				margin-left: 5%;
				height: 250px;
				margin-top: 10px;
				display: flex;
				justify-content: center;
			}
			.award {
				//width: 223px;
				flex: 1;
				height: 250px;
				box-sizing: border-box;
				border-left: 3px solid #11c092;
				border-bottom: 3px solid #11c092;
				background: #fff;
				img {
					width: 160px;
					height: 128px;
					margin-top: 70px;
					margin-left: 50%;
					transform: translateX(-50%);
				}
				p {
					font-size: 16px;
					color: #11c092;
					text-align: center;
				}
			}
			.award:nth-last-child(1) {
				border-right: 3px solid #11c092;
			}
		}
	}
	.spring-pop-2022[x-placement="top"] {
		.award-box {
			margin-top: 0px;
			position: relative;
			top: -30px
		}
		.popper__arrow {
			bottom: -10px
		}
	}
	.spring-dialog-1,.spring-dialog-2,.spring-dialog-3 {
		background: transparent;
		.el-dialog__header {
			display: none;
		}
		.main {
			width: 532px;
			height: 451px;
			background: url("../../../assets/active/spring2022/dialog/dialog.png") no-repeat center top;
			display: flex;
			flex-direction: column;
			align-items: center;
		}
		.title {
			font-size: 22px;
			color: #fff;
			font-weight: bold;
			margin-top: 15px
		}
		.btn-box {
			position: absolute;
			bottom: 60px;
			width: 440px;
			display: flex;
			justify-content: space-around;
		}
		.close {
			position: absolute;
			right: 20px;
			top: -30px;
			width: 22px;
			height: 22px;
			cursor: pointer;
			background: url("../../../assets/active/spring2022/dialog/close.png") no-repeat center top;
			&:hover {
				background: url("../../../assets/active/spring2022/dialog/close-hover.png") no-repeat center top;
			}
		}
	}
	.spring-dialog-1 {
		.main {
			.img-box {
				width: 235px;
				height: 188px;
				margin-top: 30px;
				background: url("../../../assets/active/spring2022/dialog/award-bg.png") no-repeat center top;
				img {
					width: 160px;
					height: 128px;
					margin-top: 20px;
					margin-left: 50%;
					transform: translateX(-50%);
				}
				.num {
					text-align: center;
					font-size: 16px;
					color: #007b4b
				}
			}
			.name,.tip{
				font-size: 14px;
				color: #007b4b;
				margin-top: 5px
			}
			.copy {
				font-size: 14px;
				color: #11c092;
				margin-top: 5px;
				span {
					margin-left: 10px;
					text-decoration: underline;
					cursor: pointer;
				}
			}
		}
	}
	.spring-dialog-2 {
		.main {
			.little-title {
				margin-top: 45px;
				margin-bottom: 22px;
				font-size: 16px;
				color: #007b4b;
				text-align: left;
				width: 400px;
			}
			.wallet-list {
				width: 400px;
				display: flex;
				justify-content: space-between;
				.wallet {
					width: 122px;
					height: 40px;
					border: 2px solid #11c092;
					box-sizing: border-box;
					font-size: 14px;
					color: #11c092;
					text-align: center;
					line-height: 37px;
					cursor: pointer;
					&.active {
						border: none;
						color: #fff;
						line-height: 40px;
						background: url("../../../assets/active/spring2022/dialog/selected.png") no-repeat center top;
					}
				}
			}
			input {
				width: 400px;
				height: 40px;
				padding: 0px 20px;
				box-sizing: border-box;
				border: 2px solid #11c092;
				color: #007b4b;
				&::placeholder {
					color: rgba(17, 192, 146, 0.5)
				}
			}
		}
	}
	.spring-dialog-3 {
		.record-title {
			width: 417px;
			height: 54px;
			margin-top: 50px;
			font-size: 16px;
			color: #007b4b;
			font-weight: bold;
			background: url("../../../assets/active/spring2022/dialog/record-top.png") no-repeat center top;
			span {
				display: inline-block;
				width: 50%;
				text-align: center;
				line-height: 54px;
			}
		}
		.record-list {
			width: 417px;
			height: 238px;
			margin-top: 20px;
			padding-top: 10px;
			background: url("../../../assets/active/spring2022/dialog/record-bottom.png") no-repeat center top;
			.none {
				text-align: center;
				color: #11c092;
				margin-top: 100px;
			}
			.list-item {
				width: 400px;
				height: 50px;
				line-height: 50px;
				color: #11c092;
				span {
					display: inline-block;
					width: 50%
				}
				span:nth-child(1) {
					padding-left: 70px;
					box-sizing: border-box;
				}
				span:nth-child(2) {
					text-align: right;
					padding-right: 55px;
					box-sizing: border-box;
				}
				&::after {
					content: "";
					display: block;
					width: 100%;
					height: 2px;
					background: linear-gradient(to right,rgba(17, 192, 146, 0),rgba(17, 192, 146, 0.4),rgba(17, 192, 146, 0));
				}
			}
		}
	}
	.spring-btn {
		width: 176px;
		height: 62px;
		font-size: 20px;
		font-weight: bold;
		color: #fff;
		text-align: center;
		letter-spacing: 5px;
		line-height: 62px;
		cursor: pointer;
		background: url("../../../assets/active/spring2022/btn.png") no-repeat center top;
		&.spring-btn1 {
			background: url("../../../assets/active/spring2022/btn1.png") no-repeat center top;
			color: #11c092
		}
		&:hover {
			color: #fff;
			background: url("../../../assets/active/spring2022/btn-hover.png") no-repeat center top;
		}
		&.disabled {
			background: url("../../../assets/active/spring2022/btn-disabled.png") no-repeat center top;
		}
		&.special2 {
			color: #fff;
			background: url("../../../assets/active/spring2022/btn-hover.png") no-repeat center top;
		}
	}
</style>
