<template>
  <div class="newyear-2022">
		<div class="bg-linear"></div>
		<div class="main-box">
			<div class="tab">
				<p class="tab-normal" :class="tabKey == 1 && 'active'" @click="tabKey = 1">五虎福袋</p>
				<p class="tab-normal" :class="tabKey == 2 && 'active'" @click="tabKey = 2">虎王争霸</p>
			</div>

			<transition name="ani-up">
				<keep-alive>
				<newyear2022ActiveOne v-if="tabKey == 1"
					:initData="luck_bag_init"
					:awardDataList="awardDataList"
					@bagEmit="bagEmit"
					@recordEmit="recordEmit"
				></newyear2022ActiveOne>
				<newyear2022ActiveTwo v-if="tabKey == 2"
					:initData="tiger_king_init"
					@tigerEmit="tigerEmit"
				></newyear2022ActiveTwo>
				</keep-alive>
			</transition>

			<router-link to="/active" class="back-btn">{{$t("Return_to_activity_page")}}</router-link>
		</div>
  <el-dialog
    :visible.sync="visible"
		:append-to-body="true"
    custom-class="newyear-dialog"
		width="680px">
    <div v-if="visible" class="main">
			<p class="title">恭喜您获得</p>
			<p class="close" @click="visible = false"></p>
			<div class="img-box">
				<img :src="awardData.item_url"/>
				<p class="num" v-if="awardData.item_type == 2">{{awardData.item_name.split('元')[0]}}<span>元</span></p>
			</div>
			<p class="name">{{awardData.item_name}}</p>
			<p class="tip">{{awardData.item_type == 2 ? '彩金直接转入您的主钱包' : '使用兑换码联系客服领取或折现'}}</p>
			<p class="copy" v-if="awardData.secret">{{awardData.secret}}<span @click="doCopy(awardData.secret)">复制</span></p>
			<button class="btn" @click="btnClick(awardData.item_type)">{{awardData.item_type == 2 ? '知道了' : '联系客服'}}</button>
    </div>
  </el-dialog>

	<el-dialog
    :visible.sync="visible2"
		:append-to-body="true"
    custom-class="newyear-dialog"
		width="680px">
    <div v-if="visible2" class="main">
			<p class="title">我的中奖记录</p>
			<p class="close" @click="visible2 = false"></p>
			<p class="td"><span>日期</span><span>奖品</span><span>状态</span></p>
			<p class="null" v-if="!page.total && !load">暂无中奖记录</p>
			<li class="award-item" v-for="(item, i) in page.recordData" :key="i" @click="awardShow(item)">
				<span>{{item.time}}</span><span>{{item.desc}}</span><span :class="item.status == 4 && 'active'">{{item.status_cn}}</span>
			</li>
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
  </el-dialog>

  </div>
</template>

<script>
import newyear2022ActiveOne from './newyear2022ActiveOne.vue'
import newyear2022ActiveTwo from './newyear2022ActiveTwo.vue'
import { mapState } from 'vuex'

export default {
	data() {
		return {
			step: 0,
			stepData: [{name:"虎踏春来", tip: "首充500"},{name:"如虎添翼", tip: "首充5000"},{name:"招财进虎", tip: "首充10000"},{name:"福虎生威", tip: "首充30000"},{name:"龙腾虎跃", tip: "首充100000"}],
			bagData: [0, 0, 0, 0, 0],
			awardDataList: [],
			tabKey: 1,
			visible: false,
			visible2: false,
			page: {
				total: 0,
				pagesize: 8,
				currentpage: 1,
				recordData: []
			},
			luck_bag_init: {luck_conf:[]},
			tiger_king_init: {},
			awardData: {}
		}
	},
	components: { newyear2022ActiveOne, newyear2022ActiveTwo },
	computed: mapState(['isLogin']),
	watch: {
		visible(ne) {
			!ne && (this.awardData = {...this.awardData,...this.luck_bag_init.prize_got})
			//!ne && this.initData()
		},
		isLogin(ne) {
			this.initData()
		}
	},
	mounted() {
		this.initData()
	},
	methods: {
		initData() {
			this.load = true
      this.$http(this.ApiSetting.active.newYear2022.getNewYear2022Init)
      .then(res => {
        this.load = false
        if(res.status == 1 && res.data) {
					this.luck_bag_init = res.data.luck_bag_init
					this.tiger_king_init = res.data.tiger_king_init
					this.awardData = {...this.awardData,...res.data.luck_bag_init.prize_got}
					let awardDataList = []
					for (let i = 0; i < 5; i++) {
						let j = i + 1
						awardDataList.push(res.data.luck_bag_init.prize_info[j])
					}
					this.awardDataList = awardDataList
        }
      },err=>{
        this.load = false
      })
		},

		bagEmit(data) {
			if (data.is_reward != 2) {
				this.getBag(data)
			} else {
				this.visible = true
			}
		},

		recordEmit() {
			this.getRecord()
		},

		tigerEmit(e) {
			if (!this.isLogin) {
				return this.$message({
            message: '请您先登录',
            type: 'warning'
          })
			}
			if (this.load) {
				return
			}
			this.load = true
      this.$http(this.ApiSetting.active.newYear2022.joinTigerKing, e)
      .then(res => {
        this.load = false
        if (res.status == 1 && res.data) {
					this.awardData = res.data.bonusInfo
					this.$set(this.tiger_king_init,'joined_conf',res.data.bonusInfo.joined_conf)
					this.visible = true
        }
      },err=>{
        this.load = false
      })
		},

		getBag(data) {
			if (!this.isLogin) {
				return this.$message({
            message: '请您先登录',
            type: 'warning'
          })
			}
			if (this.load) {
				return
			}
			this.load = true
      this.$http(this.ApiSetting.active.newYear2022.joinNewYear2022, {bag_level: data.bag_level})
      .then(res => {
        this.load = false
        if(res.status == 1 && res.data) {
					this.awardData = res.data
					this.luck_bag_init.prize_got = res.data
					this.$set(this.luck_bag_init,'lucky_conf',res.data.luck_conf)
					this.visible = true
        }
      },err=>{
        this.load = false
      })
		},

		getRecord() {
			if (!this.isLogin) {
				return this.$message({
            message: '请您先登录',
            type: 'warning'
          })
			}
			this.visible2 = true
			this.load = true
      this.$http(this.ApiSetting.active.newYear2022.getNewYear2022PrizeList, {page: this.page.currentpage})
      .then(res => {
        this.load = false
        if(res.status == 1 && res.data) {
					this.page.total = res.data.record_list.total || 0
					this.page.recordData = res.data.record_list.data || []
        }
      },err=>{
        this.load = false
      })
		},

		btnClick(type) {
			if (type == 2) {
				this.visible = false
			} else {
				this.openKfWindow()
			}
		},

		awardShow(item) {
			if (item.status == 1) return
			this.awardData.item_type = item.item_type
			this.awardData.item_url = item.item_url
			this.awardData.secret = item.secret
			this.awardData.item_name = item.desc
			this.visible2 = false
			this.visible = true
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
.newyear-2022{
  font-family: MicrosoftYaHei;
  padding-top: 0px;
  min-height: 1809px;
	// min-width: 1920px;
	position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  color: #fff;
  background: url("../../../assets/active/newyear2022/banner.jpg") no-repeat center top;
	//background-size: 100%;
	background-color: #c9412f;
	.bg-linear {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0px;
		left: 0px;
		background: linear-gradient(to right,rgba(0,0,0,.4) 0%,rgba(0,0,0,0) 20%, rgba(0,0,0,0) 80%, rgba(0,0,0,.4))
	}
	.main-box {
		position: relative;
		z-index: 1;
	}
  .tab {
		width: 1240px;
		margin-top: 550px;
		display: flex;
		justify-content: space-between;
		align-items: end;
		.tab-normal {
			background: url('../../../assets/active/newyear2022/newyear.png') no-repeat -744px -83px;
			width: 608px;
			height: 119px;
			font-size: 35px;
			font-weight: bold;
			color: #ffface;
			text-align: center;
			line-height: 115px;
			letter-spacing: 15px;
			cursor: pointer;
		}
		.tab-normal.active {
			background: url('../../../assets/active/newyear2022/newyear.png') no-repeat -108px -37px;
			width: 608px;
			height: 165px;
			font-size: 35px;
			font-weight: bold;
			color: #c9412f;
			text-align: center;
			line-height: 205px;
			letter-spacing: 15px;
			cursor: pointer;
		}
  }

	.ani-up-enter {
		transform: translateY(40px);
	}
	.ani-up-enter-active {
		transition: all .2s;
	}
	.ani-up-enter-to {
		transform: translateY(0px);
	}

	/deep/ .component .p-title {
		font-family: vkFont;
		font-size: 28px;
		margin-top: 30px;
		color: #ffface;
		text-align: center;
	}
	/deep/ .component .p-text {
		font-size: 14px;
		margin-top: 5px;
		color: #ffface;
		text-align: center;
	}
	/deep/ .component {
		display: flex;
		flex-direction: column;
		align-items: center;

		.btn {
			background: url('../../../assets/active/newyear2022/newyear.png') no-repeat -107px -515px;
			margin-top: 20px;
			width: 170px;
			height: 50px;
			line-height: 40px;
			font-size: 18px;
			font-weight: bold;
			border: none;
			color: #c9412f;
			&:hover {
				color: #ffface;
				cursor: pointer;
				background: url('../../../assets/active/newyear2022/newyear.png') no-repeat -106px -605px;
			}
			&.disabled {
				opacity: .7;
				pointer-events: none;
			}
		}
		.btn-2 {
			color: #d8d2cf;
			padding-bottom: 5px;
			background: url('../../../assets/active/newyear2022/newyear.png') no-repeat -1579px -120px;
			pointer-events: none;
		}
		.step-box {
			width: 1080px;
			margin-top: 20px;
			position: relative;
			display: flex;
			justify-content: space-between;
			.line {
				position: absolute;
				width: 1000px;
				height: 8px;
				top: 35px;
				left: 50%;
				transform: translateX(-50%);
				background: #9a1c02;
				box-shadow: 0px 1px 1px 0 #7a1602;
			}
			.step-item {
				position: relative;
				z-index: 1;
				width: 80px;
				height: 70px;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;
				p {
					font-size: 17px;
					font-weight: bold;
					color: #f9ddb7;
				}
				.dot {
					width: 16px;
					height: 16px;
					border-radius: 50%;
					border: 1px solid #9a1c02;
					box-shadow: 0px 1px 1px 0 rgba(122, 22, 2, 0.72);
					background-color: #c9412f;
					&.active {
						background: linear-gradient(to bottom, #fabb45, #fee289);
						border: 1px solid #fabb45;
					}
				}
				span {
					font-size: 11px;
					color: #f9ddb7;
				}
			}
		}

		.bags-box {
			width: 1200px;
			display: flex;
			justify-content: space-between;
			margin-top: 27px;
			.btn {
				margin-left: 50%;
				transform: translateX(-50%);
			}
			.btn3 {
				position: relative;
				top: -5px;
			}
			.btn4 {
				position: relative;
				top: -20px;
			}
			.bag {
				cursor: pointer;
			}
			.bag-0 {
				background: url('../../../assets/active/newyear2022/newyear.png') no-repeat -105px -265px;
				width: 198px;
				height: 172px;
			}
			.bag-1 {
				background: url('../../../assets/active/newyear2022/newyear.png') no-repeat -354px -265px;
				width: 203px;
				height: 173px;
			}
			.bag-2 {
				background: url('../../../assets/active/newyear2022/newyear.png') no-repeat -584px -264px;
				width: 226px;
				height: 173px;
			}
			.bag-3 {
				background: url('../../../assets/active/newyear2022/newyear.png') no-repeat -841px -264px;
				width: 217px;
				height: 178px;
			}
			.bag-4 {
				background: url('../../../assets/active/newyear2022/newyear.png') no-repeat -1083px -249px;
				width: 222px;
				height: 196px;
				position: relative;
				top: -10px;
			}
		}

		.rule-box {
			background: url('../../../assets/active/newyear2022/newyear.png') no-repeat -105px -811px;
			width: 1240px;
			height: 278px;
			box-sizing: border-box;
			padding: 0px 0px;
			color: #c9412f;
			.p-title {
				color: #c9412f;
				margin-top: 20px;
			}
			ol {
				width: 1120px;
				margin-left: 70px;
				margin-top: 15px;
				font-size: 14px;
				line-height: 22px;
			}
		}
		ol li {
			list-style-type: decimal;
		}
	}
	/deep/ .component {
		.table-box {
			width: 1240px;
			margin-top: 30px;
			display: flex;
			background: #ffefd9;
			color: #c9412f;
			.table1,.table2 {
				width: 455px;
				height: 285px;
				td:nth-child(1) {
					background: #a13426;
					color: #ffd59b
				}
			}
			.table3 {
				width: 330px;
				height: 285px;
				.btn {
					margin-top: 0px;
				}
				p {
					margin-bottom: 10px;
				}
			}
			td {
				border: 1px solid #ffd59b;
				text-align: center;
				font-size: 16px;
			}
			tr:nth-child(1) {
				height: 47px;
				font-weight: bold;
			}
		}
		.rank-box {
			width: 1240px;
			margin-top: 30px;
			display: flex;
			color: #ffebc2;
			position: relative;
			.rank-1 {
				background: url('../../../assets/active/newyear2022/newyear.png') no-repeat -860px -1220px;
				width: 509px;
				height: 496px;
				display: flex;
				flex-direction: column;
				align-items: center;
				.big-title {
					margin-top: 45px;
					margin-left: 30px;
					font-size: 17px;
					font-weight: bold;
					color: #ffebc2;
					letter-spacing: 10px;
				}
				.title {
					width: 80%;
					margin-top: 80px;
					display: flex;
					justify-content: space-between;
					font-size: 16px;
					font-weight: bold;
				}
				.scroll-box {
					width: 85%;
					margin-top: 10px;
					height: 275px;
					overflow: hidden;
					position: relative;
					.null {
						text-align: center;
						margin-top: 120px;
					}
					.list-complete-item {
						width: 100%;
						height: 55px;
						transition: all 1s;
						display: flex;
						justify-content: space-between;
						align-items: center;
						p:nth-child(1) {
							width: 55px;
							text-align: center;
							margin-right: 10px;
						}
						.img-box {
							width: 100px;
							display: flex;
							justify-content: space-between;
							align-items: center;
						}
						img {
							width: 41px;
							height: 41px;
							border-radius: 50%;
						}
						span {
							display: block;
							font-size: 14px;
							width: 54px;
							height: 18px;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
						}
					}
					.list-complete-enter {
						transform: translateY(30px);
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
			}
			.my-rank {
				background: url('../../../assets/active/newyear2022/newyear.png') no-repeat -1457px -1261px;
				width: 246px;
				height: 448px;
				margin-top: 40px;
				display: flex;
				flex-direction: column;
				align-items: center;
				position: relative;
				p:nth-child(1) {
					margin-top: 50px;
					font-size: 26px;
					font-weight: bold;
					text-align: center;
					color: #f7c389;
					letter-spacing: 8px;
				}
				.null {
					margin-top: 110px;
					margin-bottom: 60px;
					font-size: 14px;
					color: #ffface;
				}

				.box:nth-child(2) {
					margin-top: 80px;
				}
				.box {
					width: 180px;
					margin-top: 10px;
					display: flex;
					justify-content: space-between;
					align-items: center;
					color: #ffface;
					span:nth-child(1) {
						font-size: 17.5px;
						font-weight: bold;
					}
					span:nth-child(2) {
						font-size: 14px;
					}
				}
				ol {
					position: absolute;
					bottom: 22px;
					left: 50px;
					width: 180px;
					font-size: 14px;
					color: #ffface;
					line-height: 1.57;
					li {
						list-style-type: disc;
					}
				}
			}
		}
		.rule-box {
			margin-top: 35px
		}
	}
	.main-box .back-btn {
		margin-top: 46px;
		margin-bottom: 46px;
		margin-left: 50%;
		transform: translateX(-50%);
		display: block;
		background: url('../../../assets/active/newyear2022/newyear.png') no-repeat -351px -510px;
		width: 266px!important;
		height: 93px!important;
		text-align: center;
		line-height: 93px;
		color: #ffebc2;
		font-size: 17.5px;
		&:hover {
			color: #c9412f;
			background: url('../../../assets/active/newyear2022/newyear.png') no-repeat -351px -626px;
		}
	}
}
</style>
<style lang="less">
	.newyear2022 {
		border: none;
		background: url('../../../assets/active/newyear2022/newyear.png') no-repeat -675px -512px;
		width: 493px;
		height: 240px;
		padding: 0px;
		-webkit-box-shadow: none;
		.popper__arrow {
			display: none;
		}
		.award-box {
			height: 100%;
			padding-right: 20px;
			display: flex;
			justify-content: space-around;
			align-items: center;
			.award-item {
				width: 160px;
				position: relative;
				img {
					width: 150px;
					height: 150px;
					margin-left: 50%;
					transform: translateX(-50%);
				}
				.num {
					position: absolute;
					top: 70px;
					font-size: 16px;
					font-weight: bold;
					color: #ffe794;
					span {
						font-size: 14px;
						font-weight: normal;
					}
				}
				p {
					width: 100%;
					font-size: 14px;
					margin-top: 20px;
					text-align: center;
					color: #f9ddb7
				}
			}
		}
	}
	.newyear2022[x-placement=left] {
		background: url('../../../assets/active/newyear2022/newyear.png') no-repeat -1246px -513px;
	}

  .c9412f.el-popper {
    border-color: #c9412f;
    th {
      color: #c9412f!important;;
    }
  }
  .c9412f.el-popper[x-placement^=bottom] .popper__arrow {
    border-bottom-color: #c9412f!important;
  }
  .c9412f.el-popper[x-placement^=right] .popper__arrow {
    border-right-color: #c9412f!important;
  }
  .c9412f.el-popper[x-placement^=left] .popper__arrow {
    border-left-color: #c9412f!important;
  }
  .c9412f.el-popper[x-placement^=top] .popper__arrow {
    border-top-color: #c9412f!important;
  }
	.newyear-dialog {
		background: url('../../../assets/active/newyear2022/newyear.png') no-repeat -105px -1168px;
		width: 680px;
		height: 585px;
		box-shadow: none;
		.el-dialog__header {
			display: none;
		}
		.el-dialog__body {
			height: 100%;
			padding: 0px;
		}
		.main {
			display: flex;
			flex-direction: column;
			align-items: center;
			height: 100%;
			position: relative;
			.title {
				margin-top: 80px;
				font-size: 35px;
				font-weight: bold;
				color: #c9412f;
				text-align: center;
			}
			.close {
				position: absolute;
				right: 0px;
				top: 70px;
				cursor: pointer;
				background: url('../../../assets/active/newyear2022/newyear.png') no-repeat -1410px -128px;
				width: 28px;
				height: 29px;
				&:hover {
					background: url('../../../assets/active/newyear2022/newyear.png') no-repeat -1490px -128px;
				}
			}
			.img-box {
				margin-top: 40px;
				width: 370px;
				height: 222px;
				box-sizing: border-box;
				display: flex;
				justify-content: center;
				align-items: center;
				border:  solid 6px #f9ddb7;
				position: relative;
				img {
					max-width: 200px;
					max-height: 200px;
				}
				.num {
					position: absolute;
					top: 120px;
					font-size: 22px;
					font-weight: bold;
					color: #ffe794;
					span {
						font-size: 17px;
					}
				}
			}
			.name,.tip {
				font-size: 18px;
				color: #c9412f;
				margin-top: 10px;
			}
			.copy {
				color: #ff9a45;
				font-size: 18px;
				margin-top: 10px;
				span {
					margin-left: 5px;
					color: #c9412f;
					text-decoration: underline;
					cursor: pointer;
				}
			}
			.btn {
				background: url('../../../assets/active/newyear2022/newyear.png') no-repeat -107px -515px;
				position: absolute;
				bottom: 30px;
				padding: 0px;
				width: 170px;
				height: 50px;
				line-height: 40px;
				font-size: 18px;
				font-weight: bold;
				border: none;
				color: #c9412f;
				&:hover {
					color: #ffface;
					cursor: pointer;
					background: url('../../../assets/active/newyear2022/newyear.png') no-repeat -106px -605px;
				}
			}

			.td {
				width: 580px;
				height: 53px;
				margin-top: 44px;
				line-height: 53px;
				box-sizing: border-box;
				background: #ffd59b;
				font-size: 18px;
				color: #c9412f;
				display: flex;
				justify-content: space-between;
				padding: 0px 67px
			}

			.award-item {
				width: 580px;
				height: 36px;
				font-size: 14px;
				line-height: 36px;
				box-sizing: border-box;
				color: #c9412f;
				padding: 0px 67px;
				display: flex;
				justify-content: space-between;
				border-bottom: 1px solid #ffd59b;
				span:nth-child(1) {
					margin-left: 5px;
					margin-right: 10px
				}
				span:nth-child(3) {
					color: #7f7064;
					&.active {
						color: #c9412f;
						text-decoration: underline;
						cursor: pointer;
					}
				}
			}
			.null {
				margin-top: 150px;
			}
			.ivu-page {
				position: absolute;
				bottom: 10px;
			}
			.ivu-page-custom-text,.ivu-page-item  {
				border: none;
				a {
					font-size: 14px;
					color: #7f7064;
					&:hover {
						color: #c9412f!important;
					}
				}
			}
			.ivu-page-item-active {
				border: none;
				a {
					font-size: 14px;
					color: #c9412f;
				}
			}
		}
	}
</style>
