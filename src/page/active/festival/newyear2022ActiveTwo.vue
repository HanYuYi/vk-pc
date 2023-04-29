<template>
  		<div class="component">
			<p class="p-title">活动时间</p>
			<p class="p-text">{{initData.active_show_time}}</p>
			<p class="p-title">活动内容</p>
			<p class="p-text">活动期间，会员参与威客虎王争霸赛，每个自然周内累计充值，累计流水，累计盈利排名前十名的会员均可获得现金红包奖励。</p>
			<div class="table-box">
				<table class="table1">
					<tr><td>排名</td><td>虎年充值王</td><td>虎年流水王</td><td>虎年盈利王</td></tr>
					<tr v-for="(item, i) in tigerData.slice(0,5)" :key="i">
						<td>{{item.level}}</td><td>{{item.t1}}</td><td>{{item.t1}}</td><td>{{item.t1}}</td>
					</tr>
				</table>
				<table class="table2">
					<tr><td>排名</td><td>虎年充值王</td><td>虎年流水王</td><td>虎年盈利王</td></tr>
					<tr v-for="(item, i) in tigerData.slice(5,10)" :key="i">
						<td>{{item.level}}</td><td>{{item.t1}}</td><td>{{item.t1}}</td><td>{{item.t1}}</td>
					</tr>
				</table>
				<table class="table3">
					<tr><td>彩金流水要求</td></tr>
					<tr>
						<td>
							<p>全站5倍流水<br><br>立即领取</p>
							<button class="btn" :class="initData.joined_conf.deposit_rank.is_reward == 2 && 'disabled'" @click="tigerEmit(initData.self_data.last_deposit_rank,1)">充值王红包</button>
							<button class="btn" :class="initData.joined_conf.water_rank.is_reward == 2 && 'disabled'" @click="tigerEmit(initData.self_data.last_water_rank,2)">流水王红包</button>
							<button class="btn" :class="initData.joined_conf.profit_rank.is_reward == 2 && 'disabled'" @click="tigerEmit(initData.self_data.last_profit_rank,3)">盈利王红包</button>
						</td>
					</tr>
				</table>
			</div>

			<div class="rank-box">
				<div class="rank-1">
					<p class="big-title">上周排名</p>
					<p class="title"><span>排名</span><span>充值王</span><span>流水王</span><span>盈利王</span></p>
					<div class="scroll-box">
						<p class="null" v-if="!scrollData1.length && !initData.stat_not_done">活动第二周才有排行哦</p>
						<p class="null" v-if="!scrollData1.length && initData.stat_not_done">(排行统计中)</p>
						<transition-group name="list-complete" tag="ul" class="box" >
							<li v-for="item in scrollData1" v-bind:key="item.level" class="list-complete-item">
								<p>{{ item.level }}</p>
								<p class="img-box">
									<img :src="item.deposit_rank.head_image" onerror="this.src='/pc_static/defaultimg/headimg.png';console.clear()" v-if="item.deposit_rank"/>
									<span v-if="item.deposit_rank">{{item.deposit_rank.username}}</span>
								</p>
								<p class="img-box">
									<img :src="item.water_rank.head_image" onerror="this.src='/pc_static/defaultimg/headimg.png';console.clear()" v-if="item.water_rank"/>
									<span v-if="item.water_rank">{{item.water_rank.username}}</span>
								</p>
								<p class="img-box">
									<img :src="item.profit_rank.head_image" onerror="this.src='/pc_static/defaultimg/headimg.png';console.clear()" v-if="item.profit_rank"/>
									<span v-if="item.profit_rank">{{item.profit_rank.username}}</span>
								</p>
							</li>
						</transition-group>
					</div>
				</div>
				<div class="rank-1">
					<p class="big-title">本周排名</p>
					<p class="title"><span>排名</span><span>充值王</span><span>流水王</span><span>盈利王</span></p>
					<div class="scroll-box">
						<p class="null" v-if="!scrollData2.length">(排行统计中)</p>
						<transition-group name="list-complete" tag="ul">
							<li v-for="item in scrollData2" v-bind:key="item.level" class="list-complete-item">
								<p>{{ item.level }}</p>
								<p class="img-box">
									<img :src="item.deposit_rank.head_image" onerror="this.src='/pc_static/defaultimg/headimg.png';console.clear()" v-if="item.deposit_rank"/>
									<span v-if="item.deposit_rank">{{item.deposit_rank.username}}</span>
								</p>
								<p class="img-box">
									<img :src="item.water_rank.head_image" onerror="this.src='/pc_static/defaultimg/headimg.png';console.clear()" v-if="item.water_rank"/>
									<span v-if="item.water_rank">{{item.water_rank.username}}</span>
								</p>
								<p class="img-box">
									<img :src="item.profit_rank.head_image" onerror="this.src='/pc_static/defaultimg/headimg.png';console.clear()" v-if="item.profit_rank"/>
									<span v-if="item.profit_rank">{{item.profit_rank.username}}</span>
								</p>
							</li>
						</transition-group>
					</div>
				</div>

				<div class="my-rank">
					<p>本周我的<br>排名</p>
					<p class="null" v-if="!isLogin">(请您先登录)</p>
					<p class="box" v-if="isLogin">
						<span>充值</span>
						<span>{{getRankText(initData.self_data.last_deposit_rank)}}</span>
						<span>{{initData.is_monday ? initData.self_data.last_deposit_total : initData.self_data.this_deposit_total}}</span>
					</p>
					<p class="box" v-if="isLogin">
						<span>流水</span>
						<span>{{getRankText(initData.self_data.last_water_rank)}}</span>
						<span>{{initData.is_monday ? initData.self_data.last_water_total : initData.self_data.this_water_total}}</span>
					</p>
					<p class="box" v-if="isLogin">
						<span>盈利</span>
						<span>{{getRankText(initData.self_data.last_profit_rank)}}</span>
						<span>{{initData.is_monday ? initData.self_data.last_profit_total : initData.self_data.this_profit_total}}</span>
					</p>
					<ol>
						<li>虎王争霸赛排名数据每日00:00:00左右更新</li>
						<li>彩金领取时间为每周一00:10:00-23:59:59</li>
					</ol>
				</div>
			</div>

			<div class="rule-box">
				<p class="p-title">活动规则</p>
				<ol type="1">
					<li>虎年充值王只计算会员的首充，会员每日充值在未发起提款前都视为首充。</li>
					<li>参与虎王争霸排名前十的会员需于每周一在活动页面领取彩金，领取时间为每周一00:10:00-23:59:59，逾期则视为自动放弃，彩金将会自动派发至会员的主钱包中。</li>
					<li>彩金需完成活动规定的全站5倍有效流水。当用户钱包余额≤原钱包余额且无未结算注单时，系统将自动判定已完成活动规定的有效流水，彩金流水未完成前不可再次领取。</li>
					<li>有效流水要求：电竞赔率＜1.5、亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水；PT电子游戏中以下游戏不算有效流水：<activeptliushui color="#000" styleClass="c9412f"></activeptliushui>。</li>
					<li>每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能使用一个账号享受优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利。本活动最终解释权归VKGAME所有。</li>
				</ol>
			</div>

		</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'newyear2022ActiveTwo',
	props: {
		initData: {
			type: Object,
			default: {}
		}
	},
	computed: mapState(['isLogin']),
	data() {
		return {
			step: 2,
			stepData: [{name:"虎踏春来", tip: "首充500"},{name:"如虎添翼", tip: "首充5000"},{name:"招财进虎", tip: "首充10000"},{name:"福虎生威", tip: "首充30000"},{name:"龙腾虎跃", tip: "首充100000"}],
			tigerData: [
				{level: '第一名', t1: '8888'},
				{level: '第二名', t1: '5888'},
				{level: '第三名', t1: '1888'},
				{level: '第四名', t1: '888'},
				{level: '第五名', t1: '588'},
				{level: '第六名', t1: '388'},
				{level: '第七名', t1: '188'},
				{level: '第八名', t1: '88'},
				{level: '第九名', t1: '68'},
				{level: '第十名', t1: '18'},
			],
			scrollData1: [],
			scrollData2: [],
			tabKey: 1,
			timerO: "",
			timerO2: ""
		}
	},
	watch: {
		initData(now) {
			this.setData()
		}
	},
	mounted() {
		this.setData()
	},
	beforeDestroy() {
		this.timerO && clearInterval(this.timerO)
		this.timerO2 && clearInterval(this.timerO2)
	},
	methods: {
		setData() {
			let rank1 = this.initData.current_week_ranks
			let rank2 = this.initData.last_week_ranks
			if (rank2.deposit_rank) {
				let num2 = Math.max(rank2.deposit_rank.length, rank2.profit_rank.length, rank2.water_rank.length)

				for (let i = 0; i < num2; i++) {
					let obj = {deposit_rank: "", water_rank: "", profit_rank: "", level: this.tigerData[i].level}
					rank2.deposit_rank[i] && (obj.deposit_rank = rank2.deposit_rank[i])
					rank2.water_rank[i] && (obj.water_rank = rank2.water_rank[i])
					rank2.profit_rank[i] && (obj.profit_rank = rank2.profit_rank[i])
					this.scrollData1.push(obj)
				}
			}

			if (rank1.deposit_rank) {
				let num1 = Math.max(rank1.deposit_rank.length, rank1.profit_rank.length, rank1.water_rank.length)

				for (let i = 0; i < num1; i++) {
					let obj = {deposit_rank: "", water_rank: "", profit_rank: "", level: this.tigerData[i].level}
					rank1.deposit_rank[i] && (obj.deposit_rank = rank1.deposit_rank[i])
					rank1.water_rank[i] && (obj.water_rank = rank1.water_rank[i])
					rank1.profit_rank[i] && (obj.profit_rank = rank1.profit_rank[i])

					this.scrollData2.push(obj)
				}
			}

			if (this.scrollData2.length > 5) {
				this.timerO = setInterval(this.timer,3000)
			}
			if (this.scrollData1.length  > 5) {
				this.timerO2 = setInterval(this.timer2,3000)
			}
		},
		getStepStyle() {
			let str =  `background: linear-gradient(to right, #ffe794 ${25 * (this.step-1)}%, #9a1c02 ${25 * (this.step-1)}%)`
			return str
		},
		timer() {
			let a = this.scrollData2[0]
			this.scrollData2.shift()
			setTimeout(()=>{this.scrollData2.push(a)},1000)
		},
		timer2() {
			let a = this.scrollData1[0]
			this.scrollData1.shift()
			setTimeout(()=>{this.scrollData1.push(a)},1000)
		},
		tigerEmit(rank,type) {
			this.$emit('tigerEmit', {rank: rank,rank_type: type})
		},
		getRankText(rank) {
			let target = ['(第一名)','(第二名)','(第三名)','(第四名)','(第五名)','(第六名)','(第七名)','(第八名)','(第九名)','(第十名)']
			if (rank == 0 || rank > 10 || !this.initData.is_monday) return ""
			return target[rank - 1]
		},
	}
}
</script>

<style>

</style>
