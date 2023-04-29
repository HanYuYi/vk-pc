<template>
	<div class="component">
		<p class="p-title">活动时间</p>
		<p class="p-text">{{initData.active_show_time}}</p>
		<p class="p-title">活动内容</p>
		<p class="p-text">活动期间，会员每日首充达到指定金额，即可获得一次拆福袋的机会，拆福袋将有机会获得iPhone13 Pro Max 哦！</p>

		<button class="btn btn-1" @click="$emit('recordEmit')">我的中奖记录</button>

		<div class="step-box">
			<div class="line" :style="getStepStyle()"></div>
			<div class="step-item" v-for="(item, i) in stepData" :key="i">
				<p>{{item.name}}</p>
				<p class="dot" :class="i < step && 'active'"></p>
				<span>{{item.tip}}</span>
			</div>
		</div>

		<div class="bags-box">
			<div class="bag-item" v-for="(item, i) in initData.lucky_conf" :key="i">
				<el-popover
					placement="right"
					width="500"
					popper-class="newyear2022"
					trigger="hover">
					<div class="award-box">
						<div class="award-item" v-for="(element, j) in awardDataList[i]" :key="j">
							<img :src="element.icon_url"/>
							<p class="num" v-if="element.type == 2">{{element.desc.split("元")[0]}}<span>元</span></p>
							<p>{{element.desc}}</p>
						</div>
					</div>
					<div class="bag" :class="'bag-' + i" slot="reference"></div>
				</el-popover>
				<button class="btn" :class="['btn' + i]" v-if="item.is_show" @click="bagEmit(i)">{{item.is_reward == 2 ? '查看奖品' : '拆福袋'}}</button>
			</div>
		</div>

		<div class="rule-box">
			<p class="p-title">活动规则</p>
			<ol type="1">
				<li>会员每日首充达到指定金额，即可获得一次拆福袋的机会，每位会员每日仅限参与一次，会员每日未发起提款前的存款都视为首充。</li>
				<li>若奖品为实物奖品，请联系在线客服提供中奖兑换码，提供您的详细收货地址，我们将于次日安排发货，快递单号将会发送站内信通知。除此之外您也可以联系在线客服选择折现，实物奖品折现后无需流水即可提款。</li>
				<li>会员获得的现金奖品系统将自动派发至会员的主钱包中，需要完成全站1倍有效流水。</li>
				<li>有效流水要求：电竞赔率＜1.5、亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水；PT电子游戏中以下游戏不算有效流水：<activeptliushui color="#000" styleClass="c9412f"></activeptliushui>。</li>
				<li>每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能使用一个账号享受优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利。本活动最终解释权归VKGAME所有。</li>
			</ol>
		</div>

	</div>
</template>

<script>
export default {
	name: 'newyear2022ActiveOne',
	props: {
		initData: {
			type: Object,
			default: {}
		},
		awardDataList: {
			type: Array,
			default: []
		}
	},
	data() {
		return {
			step: 0,
			stepData: [{name:"虎踏春来", tip: "首充500"},{name:"如虎添翼", tip: "首充5000"},{name:"招财进虎", tip: "首充10000"},{name:"福虎生威", tip: "首充30000"},{name:"龙腾虎跃", tip: "首充100000"}],
			bagData: [0, 0, 0, 0, 0],
			awardKey: 0
		}
	},
	mounted() {
		//this.computedStep()
	},
	watch: {
		initData() {
			this.computedStep()
		}
	},
	methods: {
		bagEmit(i) {
			this.$emit('bagEmit', this.initData.lucky_conf[i])
		},
		getStepStyle() {
			let str =  `background: linear-gradient(to right, #ffe794 ${25 * (this.step-1)}%, #9a1c02 ${25 * (this.step-1)}%)`
			return str
		},
		computedStep() {
			let step = 0
			let num = Number(this.initData.first_deposit)
			if (num >= 500) {
				step =  1
			}
			if (num >= 5000) {
				step =  2
			}
			if (num >= 10000) {
				step =  3
			}
			if (num >= 30000) {
				step =  4
			}
			if (num >= 100000) {
				step =  5
			}
			this.step = step
		},
	}
}
</script>

<style>

</style>
