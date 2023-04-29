<template>
  <div class="lantern2022">
		<div class="active-time">活动时间：{{formateDate(active_info.start_time*1000 || 9999) + '-' + formateDate(active_info.end_time*1000 || 9999)}}</div>
		<div class="decoration-1"></div>
		<div class="decoration-2"></div>
		<div class="decoration-3"></div>
		<div class="decoration-4"></div>
		<img class="left" src="../../../assets/active/lantern2022/left.png"/>
		<img class="right" src="../../../assets/active/lantern2022/right.png"/>
		<img class="left-1" src="../../../assets/active/lantern2022/light3.png"/>
		<img class="right-1" src="../../../assets/active/lantern2022/light4.png"/>
		<div class="big-title hang">猜灯谜 赢大奖</div>
		<div class="light-box hang hang2">
			<p class="notice">活动期间内，会员在指定场馆中达到指定流水要求，即可领取一次奖励，每个场馆仅限领取一次。</p>
			<div class="light-list">
				<div class="light" :class="item.schedule && 'active'" v-for="(item, index) in initArr" :key="index">
					<p class="game-name" :class="!item.schedule && 'disabled'">{{item.scheduleName}}</p>
					<div class="level-box">
						<p class="level" :class="item.schedule > 0 && 'active'"></p>
						<p class="level" :class="item.schedule > 1 && 'active'"></p>
						<p class="level" :class="item.schedule > 2 && 'active'"></p>
					</div>
					<div class="secret" v-if="!item.schedule">
						<p class="none">奖励未开启</p>
					</div>
					<div class="secret" v-if="item.schedule">
						<p>{{item['puzzle'][0]}}</p>
						<p>—— {{item['puzzle'][1]}}</p>
						<p v-if="item.is_have">谜底：{{item['puzzle'][2]}}</p>
					</div>
					<button class="secret-btn" :class="(item.is_have || !item.schedule) && 'disabled'"  @click="checkLoginState(index,item.is_have,!item.schedule)">{{item.is_have ? '奖励已领取' : '猜灯谜'}}</button>
					<el-popover
						placement="right"
						width="500"
						popper-class="lantern2022-pop"
						trigger="hover">
						<p class="p-name">{{item.scheduleName}}</p>
						<p class="p-game">场馆要求：<span v-for="(j,i) in item.venue" :key="j">{{j}}{{i < item.venue.length-1 ? '、' : ''}}</span></p>
						<div class="award-box">
							<div class="award-item" v-for="(k,m) in item.gift" :key="m">
								<img :src="item.img[m]"/>
								<p class="award-name" :class="item.schedule > m && 'active'">{{k}}<br>{{item.water[m]}}</p>
							</div>
						</div>
						<div class="level-box">
							<span class="dot" :class="item.schedule > 0 && 'active'"></span>
							<span class="line" :class="item.schedule > 1 && 'active'"></span>
							<span class="dot" :class="item.schedule > 1 && 'active'"></span>
							<span class="line line2" :class="item.schedule > 2 && 'active'"></span>
							<span class="dot" :class="item.schedule > 2 && 'active'"></span>
						</div>
						<p class="got" v-if="item.gift_name">您已领取【 {{item.gift_name}} 】</p>
						<p class="lantern-bottom" slot="reference">奖要<br>励求<i :class="animateKey && 'lantern-bottom-' + index"></i></p>
					</el-popover>
				</div>
			</div>
			<p class="btn-link-2" @click="checkState">我的中奖记录</p>
		</div>
		<div class="rule-box">
			<p class="rule-title">活动规则</p>
			<ol type="1">
				<li>活动期间内，会员每日在指定游戏场馆中，达到指定有效流水金额，即可领取一次奖励，每个场馆每日仅限领取一次。若当日未领取，则视为自动放弃。</li>
				<li>当会员领取相对应的活动奖励时，需要正确的回答灯谜答案，即可成功领取活动奖励。</li>
				<li>流水统计方式为当天会员在各个游戏场馆中累计有效流水，例如：会员在小艾电竞中有效流水为400元，RG电竞中有效流水500元，则会员当天在电竞中有效流水为900元。每个场馆的流水统计将在每天的00:00自动清零。</li>
				<li>会员活动的现金奖品系统将自动派发至会员的主钱包中，彩金需完成全站3倍有效流水。</li>
				<li>若奖品为实物奖品，请联系在线客服提供中奖兑换码，提供您的详细收货地址，我们将于次日安排发货，快递单号将会发送站内信通知。除此之外您也可以联系在线客服选择折现，实物奖品折现后无需流水即可提款。</li>
				<li>有效流水要求：电竞赔率＜1.5、亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水；PT电子游戏中以下游戏不算有效流水：<activeptliushui color="#fab25d" styleClass="fab25d"></activeptliushui>。</li>
				<li>每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能使用一个账号享受优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利。本活动最终解释权归VKGAME所有。</li>
			</ol>
		</div>
		<div class="big-title big-title2 hang">V币商城5折起</div>
		<div class="vb-box">
			<p class="notice">活动期间V币商城限时折扣，每日精选商品最低5折起！</p>
			<div class="d-scroll">
        <div class="d-item-box">
          <div class="d-item" v-for="(item, index) in awardList.concat(awardList)" :key="index">
            <p class="p-discount">{{item.discount}}</p>
            <img class="item-img x-center" :src="item.img"/>
            <p class="p-name"><span>{{item.name}}</span><br>{{item.tip}}</p>
            <p class="p-desc">{{item.tip1}}V币</p>
            <router-link to="/vbmarket" class="btn-link">{{item.price}} V币兑换</router-link>
          </div>
        </div>
      </div>
			<router-link to="/vbmarket" class="btn-link-2">立即兑换</router-link>
		</div>
		<router-link to="/active" class="back-btn">{{$t("Return_to_activity_page")}}</router-link>

		<el-dialog
			:visible.sync="visible"
			:append-to-body="true"
			custom-class="lantern2022-dialog"
			width="510px">
			<div v-if="visible" class="main">
				<div class="big-title hang">元宵灯谜</div>
				<div class="anwser-box">
					<p>{{initArr[scheduleIndex]['puzzle'][0]}}</p>
					<p>—— {{initArr[scheduleIndex]['puzzle'][1]}}</p>
					<p @click="changeQuestion">立即更换</p>
					<p>您有 {{initArr[scheduleIndex].count}} 次更换灯谜机会</p>
					<p>选择正确答案：</p>
					<div class="answer-list">
						<span @click="answerid = 0" :class="answerid==0 && 'active'">1.{{initArr[scheduleIndex]['puzzle'][2]}}</span>
						<span @click="answerid = 1" :class="answerid==1 && 'active'">2.{{initArr[scheduleIndex]['puzzle'][3]}}</span>
						<span @click="answerid = 2" :class="answerid==2 && 'active'">3.{{initArr[scheduleIndex]['puzzle'][4]}}</span>
					</div>
					<p class="answer-btn" @click="getAward">提交答案</p>
					<p class="notice">只有答对才能领取奖品哦！</p>
				</div>
				<div class="close" @click="visible = false;answerid = -1"></div>
			</div>
		</el-dialog>

		<el-dialog
			:visible.sync="visible2"
			:append-to-body="true"
			custom-class="lantern2022-dialog lantern2022-dialog2"
			width="510px">
			<div v-if="visible2" class="main">
				<div class="big-title hang">恭喜您获得</div>
				<div class="award-box">
					<img :src="award.gift_img"/>
					<p class="name">{{award.gift_name}}</p>
					<p class="code" v-if="award.code">{{award.code}}<span @click="doCopy(award.code)">复制</span></p>
					<p class="tip">{{award.message}}</p>
					<p class="btn" @click="awardBtnClick">{{award.code ? '联系客服' : '知道了'}}</p>
				</div>
				<div class="close" @click="visible2 = false"></div>
			</div>
			<div class="close" @click="visible2 = false"></div>
		</el-dialog>

		<el-dialog
			:visible.sync="visible3"
			:append-to-body="true"
			custom-class="lantern2022-dialog lantern2022-dialog3"
			width="360px">
			<div v-if="visible3" class="main">
				答案不对哦，请再想想重新作答～
			</div>
  	</el-dialog>

		<el-dialog
			:visible.sync="visible4"
			:append-to-body="true"
			custom-class="lantern2022-dialog lantern2022-dialog4"
			width="690px">
			<div v-if="visible4" class="main">
				<div class="big-title hang">我的中奖记录</div>
				<div class="award-box">
					<table>
					<th>日期</th><th>奖品</th><th>状态</th>
						<tr v-for="(item,i) in records" :key="i">
							<td>{{item.date}}</td>
							<td>{{item.content}}</td>
							<td>
								<span v-if="item.is_discount || item.is_send">{{item.is_discount ? '已折现' : '已领取'}}</span>
								<span v-else class="copy" @click="doCopy(item.code)">复制兑换码</span>
							</td>
						</tr>
					</table>
					<p class="none" v-if="!page.total && !load">暂无中奖记录</p>
					<Page
						v-if="page.total > 8"
						:total="page.total"
						prev-text="上一页"
						next-text="下一页"
						:page-size="page.pagesize"
						:current.sync="page.currentpage"
						@on-change="getRecord()"
						class-name="cus_page">
						</Page>
				</div>
				<div class="close" @click="visible4 = false"></div>
			</div>
		</el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'lantern2022',
  data () {
    return {
      awardList: [
        {tip1: '1,200,000', img: require('../../../assets/active/lantern2022/2/2-5.png'), name: 'iPhone 13 Pro',tip: "等级≥VIP7", status: 0,price: "600,000",discount: "-50%"},
        {tip1: '1,033,200',img: require('../../../assets/active/lantern2022/2/2-2.png'),name: '联想拯救者Y7000',tip: "等级≥VIP6", status: 0,price: "619,920",discount: "-40%"},
        {tip1: '227,700',img: require('../../../assets/active/lantern2022/2/2-8.png'),name: '新日迷你折叠电动车',tip: "等级≥VIP5", status: 0,price: "136,620",discount: "-40%"},
        {tip1: '131,850',img: require('../../../assets/active/lantern2022/2/2-3.png'),name: '拍立得mini11相机',tip: "等级≥VIP4", status: 0,price: "92,295",discount: "-30%"},
        {tip1: '98,700',img: require('../../../assets/active/lantern2022/2/2-1.png'),name: '电动冲牙器',tip: "等级≥VIP4", status: 0,price: "69,090",discount: "-30%"},
        {tip1: '78,150',img: require('../../../assets/active/lantern2022/2/2-6.png'),name: '红玫瑰花熊',tip: "等级≥VIP4", status: 0,price: "54,705",discount: "-30%"},
        {tip1: '34,500',img: require('../../../assets/active/lantern2022/2/2-4.png'),name: '罗伊斯巧克力礼盒',tip: "等级≥VIP4", status: 0,price: "27,600",discount: "-20%"},
				{tip1: '17,850',img: require('../../../assets/active/lantern2022/2/2-7.png'),name: '元宵礼盒',tip: "等级≥VIP3", status: 0,price: "16,065",discount: "-10%"}
      ],
      result: {},
			visible: false,
			visible2: false,
			visible3: false,
			visible4: false,
			active_info: {},
			answerid: -1,
			animateKey: true,
			timer: "",
			page: {
				total: 0,
				pagesize: 8,
				page: 1
			},
			records: [],
			award: {},
			initArr: [{},{},{},{},{}],
			scheduleIndex: 0,
			scheduleType: ['egame','sport','real','chess','slot'],
			initObject: {egame: {scheduleName:'电竞场馆'}, sport: {scheduleName:'体育场馆'}, real: {scheduleName:'真人场馆'}, chess: {scheduleName:'棋牌场馆'}, slot: {scheduleName:'电玩场馆'}}
    }
  },
	mounted() {
		this.initData()
		this.timer = setInterval(() => {
			this.animateKey = !this.animateKey
			setTimeout(()=>{this.animateKey = !this.animateKey},1000)
		}, 12000)
	},
	beforeDestroy() {
		this.timer && clearInterval(this.timer)
	},
	watch: {
		isLogin(ne) {
			this.initData()
		}
	},
	computed: mapState(['isLogin']),
	methods: {
		initData() {
			this.load = true
      this.$http(this.ApiSetting.active.lanTern2022.getShangYuan2022Init)
      .then(res => {
        this.load = false
				this.active_info = res.data.active_info
        if(res.status == 1 && res.data) {
					console.log(res.data)
					let arr = []
					for(let item in this.initObject) {
						arr.push({...res.data.schedule[item],...res.data.is_apply[item],...res.data.water_gift[item],...res.data.puzzleArr[item],...this.initObject[item]})
						this.initArr = arr
					}
					console.log(arr)
        }
      },err=>{
        this.load = false
      })
		},

		checkLoginState(index,a,b) {
			if (!this.isLogin) {
				return this.$message({
					message: '请您先登录',
					type: 'warning'
        })
			}
			if (a) {
				return this.$message({
					message: '您已领取奖励',
					type: 'warning'
        })
			}
			if (b) {
				return this.$message({
					message: '您未满足流水要求',
					type: 'warning'
        })
			}
			this.visible = true;
			this.scheduleIndex = index

		},

		changeQuestion() {
			if (this.initArr[this.scheduleIndex].count <= 0) {
				return this.$message({
					message: '您的更换次数已用完',
					type: 'warning'
        })
			}
			this.load = true
      this.$http(this.ApiSetting.active.lanTern2022.changeShangYuanPuzzle, {type: this.scheduleType[this.scheduleIndex]})
      .then(res => {
        this.load = false
				console.log(res)
        if(res.status == 1 && res.data) {
					//console.log(res.data)
					let newArr = [...this.initArr]
					newArr[this.scheduleIndex].puzzle = res.data.puzzle
					newArr[this.scheduleIndex].count = res.data.count
					this.initArr = newArr
					return this.$message({
						message: '更换成功',
						type: 'success'
					})
        }
      },err=>{
        this.load = false
      })
		},

		getAward() {
			if (this.answerid == -1) {
				return this.$message({
					message: '请选择答案',
					type: 'warning'
        })
			}
			if (this.answerid != 0) {
				return this.showDialog3()
			}
			this.answerid = -1
			this.load = true
      this.$http(this.ApiSetting.active.lanTern2022.joinShangYuan2022, {type: this.scheduleType[this.scheduleIndex]})
      .then(res => {
        this.load = false
        if(res.status == 1 && res.data) {
					this.award = res.data
					this.visible2 = true
					this.visible = false
					let newArr = [...this.initArr]
					newArr[this.scheduleIndex].is_have = 1
					newArr[this.scheduleIndex].gift_name = res.data.gift_name
					this.initArr = newArr
        }
      },err=>{
        this.load = false
      })
		},

		getRecord() {
			this.load = true
      this.$http(this.ApiSetting.active.lanTern2022.getShangYuanApplyGift, {page: this.page.currentpage, page_size: 8})
      .then(res => {
        this.load = false
        if(res.status == 1 && res.data) {
					this.page.total = res.data.total
					this.records = res.data.list
        }
      },err=>{
        this.load = false
      })
		},

		checkState() {
			if (!this.isLogin) {
				return this.$message({
					message: '请您先登录',
					type: 'warning'
        })
			}
			this.visible4 = true
			this.getRecord()
		},

		showDialog3() {
			this.visible = false
			this.visible2 = false
			this.visible3 = true
			setTimeout(() => {this.visible3 = false}, 2000)
		},

		formateDate(s) {
			let d =  new Date(s)
			return d.getFullYear() + '.' + ('0' + (d.getMonth() + 1)).slice(-2) + '.' + ('0' + d.getDate()).slice(-2)
		},

		awardBtnClick() {
			if (this.award.code) {
				this.openKfWindow()
			} else {
				this.visible2 = false
			}
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
    .lantern2022 {
			font-family: MicrosoftYaHei;
			width: 100%;
			height: 2050px;
			padding-top: 520px;
			position: relative;
			overflow: hidden;
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 14px;
			color: #fff;
			background: url("../../../assets/active/lantern2022/banner.jpg") no-repeat center top;
			background-color: #071b4a;
			.active-time {
				font-size: 24px;
				color: #ffbb91;
				position: absolute;
				top: 450px;
			}
			.decoration-1 {
				position: absolute;
				width: 285px;
				height: 175px;
				left: 0px;
				top: 900px;
				background: url("../../../assets/active/lantern2022/bg-left-up.png")
			}
			.decoration-2 {
				position: absolute;
				width: 243px;
				height: 83px;
				right: 0px;
				top: 900px;
				background: url("../../../assets/active/lantern2022/bg-left-down.png")
			}
			.decoration-3 {
				position: absolute;
				width: 187px;
				height: 83px;
				left: 0px;
				top: 1700px;
				background: url("../../../assets/active/lantern2022/bg-right-down.png")
			}
			.decoration-4 {
				position: absolute;
				width: 232px;
				height: 163px;
				right: 0px;
				top: 2000px;
				background: url("../../../assets/active/lantern2022/bg-right-up.png")
			}

			@keyframes leftLight {
				0% {opacity: .8;}
				20% {opacity: .5;}
				40% {opacity: .9;}
				60% {opacity: .3;}
				70% {opacity: .7;}
				80% {opacity: .4;}
				90% {opacity: .8;}
				100% {opacity: .5;}
			}
			@keyframes rightLight {
				0% {opacity: .5;}
				20% {opacity: .8;}
				40% {opacity: .4;}
				60% {opacity: .7;}
				70% {opacity: .3;}
				80% {opacity: .9;}
				90% {opacity: .5;}
				100% {opacity: .8;}
			}

			.left {
				position: absolute;
				top: 330px;
				left: 50%;
				transform: translateX(-600px);
				animation: leftLight 6s linear infinite;
			}

			.right {
				position: absolute;
				top: 402px;
				right: 50%;
				transform: translateX(640px);
				animation: rightLight 6s linear infinite;
			}

			.left-1 {
				position: absolute;
				top: 135px;
				left: 50%;
				transform: translateX(-600px);
				animation: rightLight 6s linear infinite;
			}

			.right-1 {
				position: absolute;
				top: 170px;
				right: 50%;
				transform: translateX(640px);
				animation: leftLight 6s linear infinite;
			}

			.hang {
				position: relative;
				&::after {
					content: "";
					display: block;
					position: absolute;
					bottom: -25px;
					left: 50%;
					transform: translateX(-50%);
					width: 300px;
					height: 30px;
					border-left: 6px solid #db4539;
					border-right: 6px solid #db4539;
				}
			}
			.hang2 {
				&::after {
					bottom: -30px;
				}
			}
			.big-title {
				width: 424px;
				height: 94px;
				font-size: 34px;
				color: #b10606;
				font-weight: bold;
				text-align: center;
				line-height: 94px;
				position: relative;
				background: url('../../../assets/active/lantern2022/icon.png') no-repeat -782px -256px;
				&.big-title2 {
					margin-top: 55px;
				}
			}

			.btn-link-2 {
				display: block;
				background: url('../../../assets/active/lantern2022/icon.png') no-repeat -790px -92px;
				width: 240px;
				height: 43px;
				margin-left: 50%;
				transform: translateX(-50%);
				font-size: 18px;
				font-weight: bold;
				color: #db4539;
				text-align: center;
				line-height: 43px;
				cursor: pointer;
				&:hover {
					background: url('../../../assets/active/lantern2022/icon.png') no-repeat -790px -30px;
				}
			}

			.light-box {
				width: 1240px;
				height: 700px;
				background: #b10606;
				border-radius: 27px;
				border: 5px solid #e64d40;
				box-sizing: border-box;
				margin-top: 25px;
				.notice {
					text-align: center;
					font-size: 14px;
					color: #ffe3c7;
					margin-top: 30px
				}
			}
			.light-list {
				width: 100%;
				display: flex;
				margin-top: 10px;
				justify-content: space-around;
				.light {
					width: 235px;
					height: 540px;
					background: url('../../../assets/active/lantern2022/icon.png') no-repeat -335px -13px;
					&.active {
						background: url('../../../assets/active/lantern2022/icon.png') no-repeat -38px -13px;
						.lantern-bottom {
							transform: translateX(-50%);
						}
						.level-box {
							transform: translateX(-50%);
						}
					}
					.game-name {
						width: 100%;
						height: 40px;
						margin-top: 33px;
						font-size: 24px;
						color: #b10606;
						text-align: center;
						line-height: 40px;
						&.disabled {
							color: #c74a4a;
						}
					}
					.level-box {
						width: 68px;
						height: 20px;
						margin-left: 49.5%;
						transform: translateX(-51%);
						display: flex;
						justify-content: space-around;
						.level {
							width: 10px;
							height: 10px;
							margin-top: -2px;
							background: url('../../../assets/active/lantern2022/icon.png') no-repeat -696px -61px;
							border-radius: 10px;
							&.active {
								background: url('../../../assets/active/lantern2022/icon.png') no-repeat -627px -59px;
							}
						}
					}
					.secret {
						width: 130px;
						height: 130px;
						margin-top: 70px;
						margin-left: 50%;
						transform: translateX(-50%);
						font-size: 14px;
						color: #b10606;
						.none {
							width: 100%;
							line-height: 130px;
							text-align: center;
						}
						p:nth-child(2) {
							text-align: right;
							margin-top: 5px
						}
						p:nth-child(3) {
							text-align: center;
							margin-top: 20px
						}
					}
					.secret-btn {
						background: url('../../../assets/active/lantern2022/icon.png') no-repeat -615px -210px;
						width: 106px;
						height: 42px;
						font-size: 18px;
						color: #fdf8a9;
						font-weight: bold;
						border: none;
						margin-left: 50%;
						cursor: pointer;
						transform: translateX(-50%);
						&:hover {
							background: url('../../../assets/active/lantern2022/icon.png') no-repeat -615px -292px;
						}
						&.disabled {
							background: url('../../../assets/active/lantern2022/icon.png') no-repeat  -615px -124px;
							//pointer-events: none;
						}
					}
					@keyframes light-move {
						0% {left: -10px;opacity: 1;}
						20% {left: 38px;opacity: 1;}
						21% {left: 38px;opacity: 0;}
						99% {left: 0px;opacity: 0;}
						100% {left: -10px;opacity: 1;}
					}
					.lantern-bottom {
						margin-left: 50%;
						margin-top: 68px;
						transform: translateX(-55%);
						width: 40px;
						height: 78px;
						border-radius: 10px 10px 0px 0px;
						box-sizing: border-box;
						padding-top: 10px;
						// border: 1px solid #b10606;
						font-size: 14px;
						color: #b10606;
						text-align: center;
						line-height: 30px;
						letter-spacing: 5px;
						cursor: pointer;
						position: relative;
						overflow: hidden;
						i {
							display: block;
							position: absolute;
							width: 20px;
							height: 90px;
							//box-shadow: 2px 2px 10px #f7e4a2;
							top: -5px;
							background: linear-gradient(to right,rgba(243, 223, 176,.0),rgba(243, 223, 176,.8),rgba(243, 223, 176,.0));
							transform: rotate(20deg);
							opacity: 0;
							//animation: light-move 5s linear 0s infinite;
						}
						i.lantern-bottom-0{
							animation: light-move 3s linear 0s !important;
						}
						i.lantern-bottom-1 {
							animation: light-move 3s linear 2s !important;
						}
						i.lantern-bottom-2 {
							animation: light-move 3s linear 4s !important;
						}
						i.lantern-bottom-3 {
							animation: light-move 3s linear 6s !important;
						}
						i.lantern-bottom-4 {
							animation: light-move 3s linear 8s !important;
						}
					}
				}
			}
			.rule-box {
				width: 1240px;
				height: 376px;
				background: #b10606;
				border-radius: 27px;
				border: 5px solid #e64d40;
				box-sizing: border-box;
				margin-top: 25px;
				.rule-title {
					width: 100%;
					text-align: center;
					height: 80px;
					line-height: 80px;
					font-size: 24px;
					font-weight: bold;
					color: #ffe3c7;
				}
				ol {
					width: 1140px;
					margin-left: 50px;
					color: #ffe3c7;
					font-size: 14px;
					line-height: 22px;
				}
				ol li {
					list-style-type: decimal;
				}
			}
			.vb-box {
				width: 1240px;
				height: 446px;
				background: #b10606;
				border-radius: 27px;
				border: 5px solid #e64d40;
				box-sizing: border-box;
				margin-top: 25px;
				.notice {
					margin-top: 30px;
					text-align: center;
					color: #ffe3c7
				}
				.d-scroll {
					width: 1230px;
					height: 290px;
					margin-top: 30px;
					overflow: hidden;
				}
				.d-item-box {
					height: 100%;
					width: auto;
					white-space: nowrap;
					display:inline-block;
					animation: d-item-animation 23s linear infinite;
					animation-play-state: running;
					&:hover {
						animation-play-state: paused;
					}
				}
				@keyframes d-item-animation {
					from {
						transform: translateX(0);
					}
					to {
						transform: translateX(-1840px);
					}
				}
				.d-item {
					background: url('../../../assets/active/lantern2022/icon.png') no-repeat -63px -573px;
					width: 205px;
					height: 261px;
					position: relative;
					display: inline-block;
					margin-right: 25px;
					.p-discount {
						position: absolute;
						right: 25px;
						top: -5px;
						background: url('../../../assets/active/lantern2022/icon.png') no-repeat -300px -576px;
						width: 46px;
						height: 46px;
						line-height: 40px;
						z-index: 999!important;
						font-size: 15px;
						font-weight: bold;
						margin-top: 5px;
					}
					.item-img {
						max-width: 136px;
						max-height: 136px;
						margin-top: 20px;
						margin-left: 50%;
						transform: translateX(-50%);
					}
					.p-name {
						margin-top: 0px;
						font-size: 14px;
						color: #b10606;
						span {
							color: #d25848;
						}
					}
					.p-desc {
						font-size: 14px;
						color: #b10606;
						text-decoration: line-through;
					}
					.btn-link {
						display: block;
						margin-top: 13px;
						width: 100%;
						font-size: 16px;
						text-align: center;
						color: #b10606;
					}
					p {
						width: 100%;
						text-align: center;
					}
				}
			}
			.back-btn {
				width: 286px;
				height: 65px;
				margin-top: 67px;
				background: url('../../../assets/active/lantern2022/icon.png') no-repeat -790px -161px;
				font-size: 18px;
				color: #b10606;
				font-weight: bold;
				line-height: 65px;
				text-align: center;
			}
    }
</style>
<style lang="less">
	.lantern2022-dialog {
		width: 510px!important;
		height: 600px;
		box-shadow: none;
		background: none;
		.el-dialog__header {
			display: none;
		}
		.el-dialog__body {
			height: 100%;
			padding: 0px;
		}
		.big-title {
			width: 424px;
			height: 94px;
			font-size: 34px;
			color: #b10606;
			font-weight: bold;
			text-align: center;
			line-height: 94px;
			position: relative;
			background: url('../../../assets/active/lantern2022/icon.png') no-repeat -782px -256px;
			&.big-title2 {
				margin-top: 55px;
			}
		}
		.hang {
			position: relative;
			&::after {
				content: "";
				display: block;
				position: relative;
				top: -5px;
				left: 50%;
				transform: translateX(-50%);
				width: 300px;
				height: 30px;
				border-left: 6px solid #db4539;
				border-right: 6px solid #db4539;
			}
		}
		.close {
			background: url('../../../assets/active/lantern2022/icon.png') no-repeat -495px -576px;
			width: 21px;
			height: 21px;
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			bottom: -40px;
			cursor: pointer;
			&:hover {
				background: url('../../../assets/active/lantern2022/icon.png') no-repeat -580px -576px;
			}
		}
		.main {
			display: flex;
			flex-direction: column;
			align-items: center;
			height: 100%;
			position: relative;
			.anwser-box {
				background: url('../../../assets/active/lantern2022/icon.png') no-repeat -70px -868px;
				width: 510px;
				height: 458px;
				margin-top: 25px;
				color: #ffe3c7;
				p:nth-child(1) {
					font-size: 18px;
					margin-top: 50px;
					margin-left: 50px;
				}
				p:nth-child(2) {
					font-size: 18px;
					margin-top: 20px;
					margin-right: 50px;
					text-align: right;
				}
				p:nth-child(3) {
					width: 240px;
					height: 39px;
					border: 2px solid #e64d40;
					border-radius: 40px;
					margin-top: 15px;
					margin-left: 50%;
					transform: translateX(-50%);
					font-size: 18px;
					font-weight: bold;
					text-align: center;
					line-height: 39px;
					cursor: pointer;
				}
				p:nth-child(4) {
					width: 100%;
					text-align: center;
					margin-top: 10px
				}
				p:nth-child(5) {
					font-size: 18px;
					margin-top: 40px;
					margin-left: 50px;
				}
				.answer-list {
					width: 100%;
					padding: 20px 50px;
					box-sizing: border-box;
					display: flex;
					justify-content: space-between;
					span {
						height: 40px;
						padding: 0px 10px;
						line-height: 38px;
						box-sizing: border-box;
						border: 2px solid #e64d40;
						border-radius: 20px;
						font-size: 18px;
						cursor: pointer;
						&.active {
							background: linear-gradient( to bottom, #ffe7ce, #ffcf9d);
							color: #b10606
						}
					}
				}
				.answer-btn {
					background: url('../../../assets/active/lantern2022/icon.png') no-repeat -790px -92px;
					width: 240px;
					height: 43px;
					margin-left: 50%;
					margin-top: 10px;
					transform: translateX(-50%);
					font-weight: bold;
					text-align: center;
					line-height: 43px;
					cursor: pointer;
					color: #db4539;
					font-size: 18px;
				}
				.notice {
					width: 100%;
					text-align: center;
					font-size: 14px;
					margin-top: 10px
				}
			}
		}
	}
	.lantern2022-dialog2 {
		height: 500px;
		.main {
			display: flex;
			flex-direction: column;
			align-items: center;
			height: 100%;
			position: relative;
			.award-box {
 				width: 510px;
  			height: 312px;
				background: #b10606;
				border: 6px solid #e64d40;
				border-radius: 27px;
				margin-top: 24px;
				display: flex;
				flex-direction: column;
				align-items: center;
				position: relative;
				img {
					width: 100px;
					height: 100px;
					margin-top: 30px
				}
				.name {
					font-size: 18px;
					color: #ffe3c7;
					margin-top: 20px
				}
				.code {
					font-size: 14px;
					color: #ffe3c7;
					span {
						color: #fdc556;
						text-decoration: underline;
						margin-left: 5px;
						cursor: pointer;
					}
				}
				.tip {
					font-size: 14px;
					color: #ffe3c7;
				}
				.btn {
					background: url('../../../assets/active/lantern2022/icon.png') no-repeat -790px -92px;
					width: 240px;
					height: 43px;
					font-size: 18px;
					font-weight: bold;
					text-align: center;
					line-height: 22px;
					color: #e64d40;
					cursor: pointer;
					position: absolute;
					bottom: 30px;
				}
			}
		}
	}
	.lantern2022-dialog3 {
		width: 360px!important;
		height: 200px;
		.main {
			width: 100%;
			height: 80px;
			margin-top: 300px;
			background: #b10606;
			border: solid 6px #e64d40;
			box-sizing: border-box;
			border-radius: 40px;
			font-size: 14px;
			color: #ffe3c7;
			text-align: center;
			line-height: 70px;
		}
	}
	.lantern2022-dialog4 {
			.main {
				display: flex;
				flex-direction: column;
				align-items: center;
				height: 100%;
				position: relative;
				.award-box {
					background: #b10606;
					border: 6px solid #e64d40;
					border-radius: 27px;
					width: 690px;
					height: 458px;
					margin-top: 25px;
					display: flex;
					flex-direction: column;
					align-items: center;
					color: #ffe3c7;
					.none {
						width: 100%;
						text-align: center;
						margin-top: 100px
					}
					.copy {
						color: #fdc556;
						text-decoration: underline;
						cursor: pointer;
					}
					table {
						width: 550px;
						margin-top: 20px;
						border-collapse: collapse;
						font-size: 18px;
					}
					th {
						width: 33%;
						height: 53px;
						color: #b10606;
						line-height: 53px;
						background: #ffe3c6;
					}
					td {
						text-align: center;
						height: 35px;
						font-size: 14px;
						border-bottom: 1px solid #f1c08b;
					}

					.null {
						margin-top: 150px;
					}
					.ivu-page {
						position: absolute;
						bottom: 30px;
					}
					.ivu-page-custom-text,.ivu-page-item  {
						border: none;
						a {
							font-size: 14px;
							color: #ffe4c7;
							&:hover {
								color: #fcc556!important;
							}
						}
					}
					.ivu-page-item-active {
						border: none;
						a {
							font-size: 14px;
							color: #fcc556;
						}
					}
				}
			}
	}

	.lantern2022-pop {
		border: none;
		background: url('../../../assets/active/lantern2022/icon.png') no-repeat -691px -406px;
		width: 505px;
		height: 290px;
		padding: 0px;
		-webkit-box-shadow: none;
		.popper__arrow {
			display: none;
		}
		.p-name {
			font-weight: bold;
			margin-top: 20px;
			padding-left: 15px
		}
		.p-game {
			margin-top: 3px;
			padding-left: 15px
		}
		.p-name,.p-game {
			width: 100%;
			color: #ffe1c2;
			text-align: center;
		}
		.award-box {
			padding-left: 20px;
			display: flex;
			justify-content: space-around;
			align-items: center;
			.award-item {
				width: 160px;
				position: relative;
				img {
					width: 100px;
					height: 100px;
					margin-left: 50%;
					transform: translateX(-50%);
				}
				p {
					width: 100%;
					font-size: 14px;
					margin-top: 10px;
					text-align: center;
					color: #fc7e18;
					&.active {
						color: #fdf7a1;
					}
				}
			}
		}
		.level-box {
			width: 320px;
			height: 10px;
			display: flex;
			position: relative;
			align-items: center;
			justify-content: space-between;
			left: 52%;
			transform: translateX(-50%);
			top: 10px;
			.dot {
				display: inline-block;
				width: 10px;
				height: 10px;
				background: #fc7e18;
				position: relative;
				z-index: 1;
				border-radius: 10px;
				&.active {
					background: #fdd15b;
				}
			}
			.line {
				display: inline-block;
				width: 160px;
				height: 5px;
				background: #fc7e18;
				position: absolute;
				left: 0px;
				&.line2 {
					left: 160px
				}
				&.active {
					background: #fdd15b;
				}
			}
		}
		.got {
			font-size: 14px;
			font-weight: bold;
			margin-top: 20px;
			color: #ffe794;
			text-align: center;
			padding-left: 15px;
		}
	}
	.lantern2022-pop[x-placement=left] {
		background: url('../../../assets/active/lantern2022/icon.png') no-repeat -691px -769px;
		.award-box {
			padding-right: 20px;
			padding-left: 0px;
		}
		.p-name,.p-game {
			box-sizing: border-box;
			padding-right: 15px
		}
	}
  .fab25d.el-popper {
    border-color: #fab25d;
    th {
      color: #fab25d!important;;
    }
  }
  .fab25d.el-popper[x-placement^=bottom] .popper__arrow {
    border-bottom-color: #fab25d!important;
  }
  .fab25d.el-popper[x-placement^=right] .popper__arrow {
    border-right-color: #fab25d!important;
  }
  .fab25d.el-popper[x-placement^=left] .popper__arrow {
    border-left-color: #fab25d!important;
  }
  .fab25d.el-popper[x-placement^=top] .popper__arrow {
    border-top-color: #fab25d!important;
  }
</style>
