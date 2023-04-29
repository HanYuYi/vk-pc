<template>
  <div class="invite-friends-page">
		<img class="left-hero" src="../../../assets/active/invitefriends/left-hero.png" alt="">
		<img class="right-hero" src="../../../assets/active/invitefriends/right-hero.png" alt="">
		<img class="left-smoke" src="../../../assets/active/invitefriends/left-smoke.png" alt="">
		<img class="right-smoke" src="../../../assets/active/invitefriends/right-smoke.png" alt="">
		<div class="mask"></div>
    <div class="invite-friends-wrapper">
		<img class="page-title" src="../../../assets/active/invitefriends/title.png" alt="">
        <div class="content">
					<div class="tab-wrapper">
						<div @click="switchTab(index)"
						:class="{'active-tab': tabIndex == index}"
						class="tab" 
						v-for="(item, index) in activityType" :key="index">
						{{item.title}}</div>
					</div>
					<div class="tab-main">
						<!-- 活动内容 -->
						<div class="table-block hdnr-block" style="height:700px" :style="tabIndex==2&&'height:550px'">
							<div class="rect"></div>
              <div class="t-title">活动时间</div>
              <div class="main-time">{{activeTime}}</div>
							<div class="t-title">活动内容</div>
							<transition name="fade-table" mode="out-in">
								<div class="sc-center" v-if="tabIndex == 0" key="sc">
									<div class="t-desc">VKGAME用户使用个人中心--推广/分享里的专属推广链接或邀请码，通过QQ、论坛、贴吧、微博等方式分享，成功邀请好友即可获得现金奖励！</div>
									<div class="t-info" @click="openRecord(0)">查看我的推广记录</div>
									<div class="sc-table">
										<table border="0" align="center" cellspacing="0" width="100%" >
											<thead>
												<tr>
													<th>推荐新用户首存金额</th>
													<th>可获得推荐礼金</th>
													<th>流水要求</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>≥100</td>
													<td class="gold">8元</td>
													<td rowspan="6">全站1倍有效流水</td>
												</tr>
												<tr>
													<td>≥1000</td>
													<td class="gold">38元</td>
												</tr>
												<tr>
													<td>≥5000</td>
													<td class="gold">58元</td>
												</tr>
												<tr>
													<td>≥10000</td>
													<td class="gold">88元</td>
												</tr>
												<tr>
													<td>≥50000</td>
													<td class="gold">388元</td>
												</tr>
												<tr>
													<td>≥100000</td>
													<td class="gold">888元</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
								<div class="zc-center" v-if="tabIndex == 1" key="zc">
									<div class="t-desc">活动期间，通过您的推广链接进行注册，并达到周累计存款要求，您和受邀请人均可获得该累计存款金额 1% 的新人奖励，最高单周可获得 <span class="gold bold">88888</span> 元哦！</div>
									<div class="t-info" @click="openRecord(1)">查看我的推广记录</div>
									<div class="zc-table">
										<table border="0" align="center" cellspacing="0" width="100%" >
											<thead>
												<tr>
													<th>邀请人等级要求</th>
													<th>周累计存款</th>
													<th>邀请人比例</th>
													<th>受邀请人比例</th>
													<th>礼金上限</th>
													<th>流水要求</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>1~2级</td>
													<td>≥5000元</td>
													<td class="gold" rowspan="6">1%</td>
													<td class="gold" rowspan="6">1%</td>
													<td class="gold">88元</td>
													<td rowspan="6">全站1倍有效流水</td>
												</tr>
												<tr>
													<td>3~5级</td>
													<td>≥10000元</td>
													<td class="gold">188元</td>
												</tr>
												<tr>
													<td>6~7级</td>
													<td>≥50000元</td>
													<td class="gold">388元</td>
												</tr>
												<tr>
													<td>8~9级</td>
													<td>≥100000元</td>
													<td class="gold">888元</td>
												</tr>
												<tr>
													<td>10~11级</td>
													<td>≥500000元</td>
													<td class="gold">8888元</td>
												</tr>
												<tr>
													<td>12级</td>
													<td>≥1000000元</td>
													<td class="gold">88888元</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
								<div class="fl-center" v-if="tabIndex == 2" key="fl">
									<div class="t-desc">活动期间，邀请人可获得每个好友从其注册时间开始计算<span class="gold bold">15</span>天的有效投注额<span class="gold bold">0.15%</span>的返利，无上限。</div>
									<div class="t-info" @click="openRecord(2)">查看我的推广记录</div>
									<div class="fl-wrapper">
										<div class="fl-block">
											<div class="fl-title">近15天好友投注总额</div>
											<div class="money">
												<b>{{ toThousands(handleDemical(activeThree.total_bet)[0]) }}.<i class="float">{{ toThousands(handleDemical(activeThree.total_bet)[1]) }}</i></b><span class="text">元</span>
											</div>
										</div>
										<div class="fl-block">
                      <div class="fl-title" v-if="sendStatus == 0">累计待派返利</div>
                      <div class="fl-title" v-if="sendStatus == 1">今日可派返利</div>
                      <div class="fl-title" v-if="sendStatus == 2">今日已派返利</div>
                      <div class="money gold">
                        <b>{{ toThousands(handleDemical(activeThree.rebate_today)[0]) }}.<i class="float">{{ toThousands(handleDemical(activeThree.rebate_today)[1]) }}</i></b><span class="text">元</span>
                      </div>
										</div>
										<div class="fl-block">
											<div class="fl-title">最近15天累计返利</div>
											<div class="money gold">
												<b>{{ toThousands(handleDemical(activeThree.total_rebate)[0]) }}.<i class="float">{{ toThousands(handleDemical(activeThree.total_rebate)[1]) }}</i></b><span class="text">元</span>
											</div>
										</div>
									</div>
								</div>
							</transition>
							<div class="btn share-btn" @click="handleShare">立即分享</div>
              <div v-if="isBindPhone == 0 && tabIndex == 2" @click="toBindPhone" class="fl-tip gold">您还未绑定手机号, 去绑定>></div>
						</div>
						<!-- 排行榜 -->
						<div class="table-block" style="height:540px">
							<div class="rect"></div>
							<div class="phb">
								<div class="left">
									<div class="p-title" :class="{'p-btitle': !isInviteList}" @click="switchPhb(0)">邀请人派奖排行榜</div>
									<transition name="fade-left" mode="out-in">
										<div class="in" v-if="isInviteList" key="one">
											<div class="pd-block" v-for="(item, index) in inviteList.slice(0, 3)" :key="index">
												<div class="jb-icon"></div>
												<div class="detail">
													<div class="line">
														<div class="gold">用户名：</div>
														<div class="username">{{ nickName(item.username) }}</div>
														<div class="gold spera">奖金：</div>
														<div>{{ toThousands(item.bonus) }}元</div>
													</div>
													<div class="line">
														<div class="gold">注册时间：</div>
														<div class="username">{{ item.register_date }}</div>
														<div class="gold spera">推荐人数：</div>
														<div>{{ item.invite_count }}</div>
													</div>
												</div>
											</div>
											<template v-if="!inviteList.length">
												<div class="pd-block" v-for="num in 3" :key="num">
													<div class="jb-icon"></div>
													<div class="detail">
														<div class="line">
															<div class="gold">用户名：</div>
															<div class="no-display username">abcdefg</div>
															<div class="gold spera">奖金：</div>
															<div class="no-display">0.00元</div>
														</div>
														<div class="line">
															<div class="gold">注册时间：</div>
															<div class="no-display username">2022年06月</div>
															<div class="gold spera">推荐人数：</div>
															<div class="no-display">0</div>
														</div>
													</div>
												</div>
											</template>
										</div>
										<div class="ed" v-else key="two">
											<div class="pd-block" v-for="(item, index) in invitedList.slice(0, 3)" :key="index">
												<div class="jb-icon"></div>
												<div class="detail">
													<div class="line">
														<div class="gold">用户名：</div>
														<div class="username">{{ nickName(item.username) }}</div>
														<div class="gold spera">奖金：</div>
														<div>{{ toThousands(item.bonus) }}元</div>
													</div>
													<div class="line" style="height:19px"></div>
												</div>
											</div>
											<template v-if="!invitedList.length">
												<div class="pd-block" v-for="num in 3" :key="num">
													<div class="jb-icon"></div>
													<div class="detail">
														<div class="line">
															<div class="gold">用户名：</div>
															<div class="no-display">abcdefg</div>
															<div class="gold spera">奖金：</div>
															<div class="no-display">0.00元</div>
														</div>
														<div class="line" style="height:19px"></div>
													</div>
												</div>
											</template>
										</div>
									</transition>
								</div>
								<div class="right">
									<div class="p-title" :class="{'p-btitle': isInviteList}" @click="switchPhb(1)">受邀请人派奖排行榜</div>
									<transition name="fade-right" mode="out-in">
										<div class="phb-table" v-if="isInviteList" key="three">
											<table border="0" align="center" cellspacing="0" width="100%" >
												<thead>
													<tr>
														<th>排名</th>
														<th>用户名</th>
														<th>推荐人数</th>
														<th>奖金</th>
													</tr>
												</thead>
												<tbody>
													<tr v-for="(item, index) in inviteList.slice(3, 10)" :key="index">
														<td>No.{{ index + 4 }}</td>
														<td>{{ nickName(item.username) }}</td>
														<td>{{ item.invite_count }}</td>
														<td class="gold">{{ toThousands(item.bonus) }}元</td>
													</tr>
													<template v-if="!inviteList.length">
														<tr>
															<td></td>
															<td></td>
															<td></td>
															<td></td>
														</tr>
														<tr>
															<td></td>
															<td></td>
															<td></td>
															<td></td>
														</tr>
														<tr>
															<td></td>
															<td></td>
															<td></td>
															<td></td>
														</tr>
														<tr>
															<td></td>
															<td class="gold text-right">暂无</td>
															<td class="gold text-left">数据</td>
															<td></td>
														</tr>
														<tr>
															<td></td>
															<td></td>
															<td></td>
															<td></td>
														</tr>
														<tr>
															<td></td>
															<td></td>
															<td></td>
															<td></td>
														</tr>
														<tr>
															<td></td>
															<td></td>
															<td></td>
															<td></td>
														</tr>
													</template>
												</tbody>
											</table>
										</div>
										<div class="phb-table invited-table" v-else key="four">
											<table border="0" align="center" cellspacing="0" width="100%" >
												<thead>
													<tr>
														<th>排名</th>
														<th>用户名</th>
														<th>奖金</th>
													</tr>
												</thead>
												<tbody>
													<tr v-for="(item, index) in invitedList.slice(3, 10)" :key="index">
														<td>No.{{ index + 4 }}</td>
														<td>{{ nickName(item.username) }}</td>
														<td class="gold">{{ toThousands(item.bonus) }}元</td>
													</tr>
													<template v-if="!invitedList.length">
														<tr>
															<td></td>
															<td></td>
															<td></td>
														</tr>
														<tr>
															<td></td>
															<td></td>
															<td></td>
														</tr>
														<tr>
															<td></td>
															<td></td>
															<td></td>
														</tr>
														<tr>
															<td></td>
															<td class="gold">暂无数据</td>
															<td></td>
														</tr>
														<tr>
															<td></td>
															<td></td>
															<td></td>
														</tr>
														<tr>
															<td></td>
															<td></td>
															<td></td>
														</tr>
														<tr>
															<td></td>
															<td></td>
															<td></td>
														</tr>
													</template>
												</tbody>
											</table>
										</div>
									</transition>
									<div class="phb-tip gold">排行榜按<span v-if="phbIndex == 0">日</span><span v-else>周</span>更新，展示最近30天获礼金最高前十名VIP会员</div>
								</div>
							</div>
						</div>
						<!-- 推广攻略 -->
						<div class="table-block" style="height:520px" v-if="tabIndex == 0">
							<div class="rect"></div>
							<div class="t-title">推广攻略</div>
							<div class="sc-tg">
								<div class="left">
									<div class="tg-title">
										<span class="num">1.</span>
										<span class="text">如何推广</span>
									</div>
									<div class="tg-desc">
										网站每一位用户都拥有个人专属推广链接及推广邀请码，可通过QQ、微博、微信、浏览器等多种方式将推广链接或邀请码分享给好友进行注册。
									</div>
								</div>
								<div class="right">
									<div class="left">
										<div class="tg-title">
											<span class="num">2.</span>
											<span class="text">如何使用</span>
										</div>
										<div class="tg-desc" v-if="swiperIndex == 0" key="sw1">
											01. 进入推广分享页面，复制推广链接或邀请码。
										</div>
										<div class="tg-desc" v-if="swiperIndex == 1" key="sw2">
											02. 把推广链接或邀请码 发给好友，若好友使用推广链接跳转注册页面时，则无需填写邀请码进行注册。
										</div>
										<div class="tg-desc" v-if="swiperIndex == 2" key="sw3">
											03. 进入推广分享页面，复制二维码。
										</div>
										<div class="tg-desc" v-if="swiperIndex == 3" key="sw4">
											04. 把二维码发送给好友,好友扫描您的推广二维码进行注册。
										</div>
									</div>
									<div class="swiper-wrapper">
										<div class="swiper-box">
											<swiper :options="mySwiperOptions" class="swiper">
												<swiper-slide>
													<div>
														<img src="../../../assets/active/invitefriends/1.jpg" alt="">
													</div>
												</swiper-slide>
												<swiper-slide>
													<div>
														<img src="../../../assets/active/invitefriends/2.jpg" alt="">
													</div>
												</swiper-slide>
												<swiper-slide>
													<div>
														<img src="../../../assets/active/invitefriends/3.jpg" alt="">
													</div>
												</swiper-slide>
												<swiper-slide>
													<div>
														<img src="../../../assets/active/invitefriends/4.jpg" alt="">
													</div>
												</swiper-slide>
											</swiper>
										</div>
										<div class="swiper-button-prev" slot="button-prev"></div>
										<div class="swiper-button-next" slot="button-next"></div>
									</div>
								</div>
							</div>
						</div>
						<!-- 活动规则 -->
						<div class="table-block  hdgz-block">
							<div class="rect"></div>
							<div class="t-title">活动规则</div>
							<div class="gz-arrow"></div>
							<div class="gz-text scgz" v-if="tabIndex == 0">
								<ol>
									<li>每日未发起提款前的存款都视为首充，每个通过您推广链接进行注册，并完成相应首存的用户，您将获得对应的邀请礼金；每个受邀请人完成对应首存，在单周邀请人能最高可获得1468元。</li>
									<li>您每邀请一位新会员，从注册的日期开始算起，可享受<span class="gold large-text">4次</span>推荐礼金，每个自然周一 00:00 刷新1次，期间每个礼金阶段都可以领取一次；逾期将会视为自动放弃。</li>
									<li>例如：用户邀请一位好友已绑定手机号和首存100元，可获取8元；若想获取下一档位38元，则需再首存1000元；礼金将会自动派发至主钱包，并需要完成1倍有效流水。</li>
									<li>普通VIP会员账号变更成代理账号时，该活动将无法参加；已经参加活动的账号变成代理账号，会即刻终止发放礼金。</li>
									<li>电竞赔率＜1.5、亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水；PT电子游戏中以下游戏不算有效流水：<activeptliushui color="#f7bc86" styleClass="inviteFrids-pop"></activeptliushui>。
									</li>
									<li>邀请人与受邀请人必须为不同身份的真实玩家，邀请人VIP等级需大于等于1级，每位有效玩家、每个手机号码、电子邮箱、IP地址(包括使用VPN)、每张银行卡、每台设备都会被判定为同一玩家。</li>
									<li>凡使用作弊手段，恶意套取奖金者，我们将保留无限期审核扣回红利及所产生的利润权利，严重者将冻结所有关联账号，VKGAME官方对本活动保有最终解释权。 </li>
								</ol>
							</div>
							<div class="gz-text zcgz" v-if="tabIndex == 1">
								<ol>
									<li>每个通过您的推广链接进行注册，并达到周累计存款≥5000元的用户，您和受邀请人均可获得该累计存款金额 1% 的新人奖励。</li>
									<li>您每邀请一位新会员，从注册的日期开始算起，可享<span class="gold large-text">4次</span>邀请周累存送，符合获取条件礼金的会员，将会在每个自然周一 00:00:00 - 23:59:59 内系统自动派发至主钱包，活动礼金需完成1倍有效流水，并更新剩余获取礼金次数；逾期将会视为自动放弃。</li>
									<li>普通VIP会员账号变更成代理账号时，该活动将无法参加；已经参加活动的账号变成代理账号，会即刻终止发放礼金。</li>
									<li>电竞赔率＜1.5、亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水；PT电子游戏中以下游戏不算有效流水：<activeptliushui color="#f7bc86" styleClass="inviteFrids-pop"></activeptliushui>。
									</li>
									<li>邀请人与受邀请人必须为不同身份的真实玩家，邀请人VIP等级需大于等于1级，每位有效玩家、每个手机号码、电子邮箱、IP地址(包括使用VPN)、每张银行卡、每台设备都会被判定为同一玩家。</li>
									<li>凡使用作弊手段，恶意套取奖金者，我们将保留无限期审核扣回红利及所产生的利润权利，严重者将冻结所有关联账号，VKGAME官方对本活动保有最终解释权。 </li>
								</ol>
							</div>
							<div class="gz-text flgz" v-if="tabIndex == 2">
								<ol>
									<li>活动有效投注额返利期限为：15天，即：从您好友注册时间开始算起。</li>
									<li>有效投注额返利解锁：单个用户有效投注额返利＜15元时，返利处于锁定状态，无法领取；单个用户有效投注额返利≥15元时，返利处于解锁状态，系统将自动发放到主钱包；若返利处于锁定状态持续到第二天未解锁，该返利＜15元 将会继续保存累计 至 返利 ≥15元，处于解锁状态自动派发，但只限于有效时间15天内计算；逾期将会视为自动放弃。</li>
									<li>每日有效投注返利结算发放时间为：次日下午 18:00 左右自动派发（发放前一日的有效投注返利）; 提款需要完成1倍全站有效流水。</li>
									<li>普通VIP会员账号变更成代理账号时，该活动将无法参加；已经参加活动的账号变成代理账号，有效投注额返利会即刻终止发放。</li>
									<li>电竞赔率＜1.5、亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水；PT电子游戏中以下游戏不算有效流水：<activeptliushui color="#f7bc86" styleClass="inviteFrids-pop"></activeptliushui>。
									</li>
									<li>邀请人与受邀请人必须为不同身份的真实玩家，邀请人VIP等级需大于等于1级，每位有效玩家、每个手机号码、电子邮箱、IP地址(包括使用VPN)、每张银行卡、每台设备都会被判定为同一玩家。</li>
									<li>凡使用作弊手段，恶意套取奖金者，我们将保留无限期审核扣回红利及所产生的利润权利，严重者将冻结所有关联账号，VKGAME官方对本活动保有最终解释权。 </li>
								</ol>
							</div>
						</div>
						<div class="btn confirm"><router-link to="/active">回到活动首页</router-link></div>
					</div>
        </div>
    </div>
		<el-dialog
		:append-to-body="true"
    custom-class="callfriends-dialog" 
		width="900px"
		top="20vh"
		:before-close="handleClose"
		:visible.sync="dialogVisible"
		>
			<div v-if="dialogVisible" class="table-block tgjl">
				<div class="rect"></div>
				<div class="close-btn" @click="() => {reset();dialogVisible = false}"></div>
				<div class="t-title">我的推广记录</div>
				<div class="line">
					<div class="l-label">返利类型：</div>
					<Select v-model="currentGiftType"
						class="type-select">
						<Option v-for="item in giftType"
										:value="item.id"
										:key="item.id">{{ item.title }}
						</Option>
					</Select>
					<div class="l-label ml-thirty">活动类型：</div>
					<Select v-model="currentActivityType"
						class="type-select">
						<Option v-for="item in filterAcType"
										:value="item.id"
										:key="item.id">{{ item.title }}
						</Option>
					</Select>
				</div>
				<div class="line">
					<div class="l-label">选择日期：</div>
					<template v-if="currentActivityType == 1">
					<date-picker class="time-box start_time"
						type="date"
						:clearable="false"
						:value="chooseWeek"
						@on-change="setWeek($event)"
						format="yyyy-MM-dd"
						></date-picker>
					</template>
					<template v-else>
						<date-picker class="time-box start_time"
							type="date"
							:clearable="false"
							format="yyyy-MM-dd"
							:value="chooseDay"
							@on-change="setDay($event)"></date-picker>
					</template>
					<template v-if="!isInvitedWeek">
						<div class="l-label ml-thirty">用户名：</div>
						<Input @on-enter="resetAndQuery" @on-blur="resetAndQuery" v-model="searchContent" placeholder="请输入" type="text"></Input>
					</template>
					<div @click="QueryRecordsByParams" class="search-btn">查询</div>
					<el-popover trigger="hover"
                      placement="bottom"
                      popper-class="week-display"
                      width="200">
            <div class="week-popover">
							<div  class="week-tips" v-html="weekTips"></div>
            </div>
            <b v-show="isShowWeekTips" slot="reference">!</b>
          </el-popover>
				</div>
				
				<div class="search-table four-perce" :class="{'three-perce':isInvitedWeek}">
					<table border="0" align="center" cellspacing="0" width="100%" >
						<thead>
							<tr>
								<th v-if="!isInvitedWeek">用户名</th>
								<th v-if="isFirstDepo">首存金额</th>
								<th v-if="isNolimit">昨日投注金额</th>
								<th v-if="isFirstDepo || isNolimit">今日已获返利</th>
								<th v-if="isInvitWeek || isInvitedWeek">周累存额</th>
								<th v-if="isInvitWeek || isInvitedWeek">周累返利</th>
								<th v-if="!isNolimit">累计返利</th>
								<th v-if="isNolimit">15天累计返利</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item, index) in recordList" :key="index">
								<td v-if="!isInvitedWeek">{{ item.invitee_name }}</td>
								<td>
									<template v-if="isFirstDepo">
										{{toThousands(item.first_deposit)}}元
									</template>
									<template v-if="isInvitWeek || isInvitedWeek">
										{{toThousands(item.total_deposit)}}元
									</template>
									<template v-if="isNolimit">
										{{toThousands(item.total_bet_amount)}}元
									</template>
								</td>
								<td class="gold">
									<template v-if="isFirstDepo">
										{{toThousands(item.active_one_rebate)}}元
									</template>
									<template v-if="isInvitWeek || isInvitedWeek">
										{{toThousands(item.active_two_rebate)}}元
									</template>
									<template v-if="isNolimit">
										{{toThousands(item.active_three_rebate)}}元
									</template>
								</td>
								<td class="gold">{{toThousands(item.total_amount)}}元</td>
							</tr>
							<template v-if="!recordList.length">
								<tr style="height:39px">
									<td v-if="!isInvitedWeek"></td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
								<tr style="height:39px">
									<td v-if="!isInvitedWeek"></td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
								<tr style="height:39px;position:relative;">
									<td></td>
									<template v-if="listLoading">
										<template v-if="isInvitedWeek">
											<Loading class="list-loading" :color="'#bf9854'" />
										</template>
										<template v-else>
											<td></td>
											<td></td>
											<Loading class="list-loading list-loading-normal" :color="'#bf9854'" />
										</template>
									</template>
									<template v-else>
										<template v-if="isInvitedWeek">
											<td class="gold">暂无数据</td>
										</template>
										<template v-else>
											<td class="gold" style="text-align:right">暂无</td>
											<td class="gold" style="text-align:left">数据</td>
										</template>
									</template>
									<td></td>
								</tr>
								<tr style="height:39px">
									<td v-if="!isInvitedWeek"></td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
								<tr style="height:39px">
									<td v-if="!isInvitedWeek"></td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
							</template>
						</tbody>
					</table>
				</div>
				<Page
				v-if="recordList.length"
        :total="page.total"
        :page-size="page.pagesize"
        :current.sync="page.currentpage">
        </Page>
			</div>
		</el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatDate, toThousands, handleDemical } from '../../../utils/util'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import Loading from '../../../components/common/Loading.vue'
import 'swiper/css/swiper.css'
const swiperEl = document.getElementsByClassName('swiper')
export default {
	name: 'callfriends',
	components: { Swiper, SwiperSlide, Loading },
	data() {
		return {
      activeTime: "",
			listLoading: false,
			searchContent: '',
			currentGiftType: 0,
			currentActivityType: 0,
			chooseDay: new Date (),
			chooseWeek: '',
			currentWeekNum: null,
			weekStart: '',
			weekEnd: '',
			weekTips: '',
			dialogVisible: false,
      swiperIndex: 0,
      mySwiperOptions: {
        allowTouchMove: true,
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        on: {
          slideChange: () => {
            this.swiperIndex = swiperEl[0].swiper.activeIndex
          }
        }
      },
			page: {
        total: 0, // 数据总数
        pagesize: 5, // 每页多少个数据
        currentpage: 1 // 当前页码
      },
			tabIndex: 0, // 三个活动切换
			sendStatus: 0, // 0：派发不足15元；1：满15元，未派发；2：满15元，已派发
      isBindPhone: null, // 是否绑定手机号，0: 未绑定，1：绑定
			phbIndex: 0, // 0 邀请人排行榜；1 受邀请人排行榜
			// 返利类型
			giftType: [
				{ id: 0, title: '邀请返利' },
				{ id: 1, title: '受邀返利' }
			],
			filterAcType: [],
			// 活动类型
			activityType: [
				{ id: 0, title: '邀请首存送' },
				{ id: 1, title: '邀请周存送' },
				{ id: 2, title: '返利无上限' }
			],
			// 活动三无限返利的数据
			activeThree: {
				rebate_today: 0.00,
				total_bet: 0.00,
				total_rebate: 0.00
			},
			// 邀请人排行榜数据
			inviteList: [],
			// 被邀请人排行榜数据
			invitedList: [],
			recordList: []
		}
	},
	watch: {
		currentGiftType(newValue) {
			if(newValue == 1) {
				this.currentActivityType = 1
				this.filterAcType = this.activityType.filter(item => item.id == 1)
			} else {
				this.filterAcType = this.activityType
			}
			this.resetAndQuery()
		},
		currentActivityType(newValue) {
			// console.log('活动类型变化了')
			if(newValue!=1) {
				this.currentGiftType = 0
			}
			this.resetAndQuery()
		},
		'page.currentpage': {
			handler(newVal,oldVal) {
				// console.log('页码变化了', newVal)
				this.QueryRecordsByParams()
			}
		}
	},
	computed: {
		...mapGetters(['head']),
		isInviteList() {
			return this.phbIndex == 0
		},
		isLogin() {
			return this.$store.state.isLogin
		},
		// 首存弹窗状态
		isFirstDepo() {
			return this.currentActivityType == 0 && this.currentGiftType == 0
		},
		// 邀请周存弹窗状态
		isInvitWeek() {
			return this.currentActivityType == 1 && this.currentGiftType == 0
		},
		// 受邀周存弹窗状态
		isInvitedWeek() {
			return this.currentActivityType == 1 && this.currentGiftType == 1
		},
		// 无限返利弹窗状态
		isNolimit() {
			return this.currentActivityType == 2 && this.currentGiftType == 0
		},
		isShowWeekTips() {
			return this.currentActivityType == 1 && this.weekStart.length > 0 && this.weekEnd.length > 0
		}
	},
	created() {
		this.initData()
		// 初始化拿上一周的数据
		const lastWeekMs = new Date().getTime() - (7 * 24 * 60 * 60 * 1000)
		this.initWeekData(new Date(lastWeekMs), 'lastWeek')
		this.filterAcType = this.activityType
	},
	methods: {
    toThousands(num) {
      return toThousands(num)
    },
    handleDemical(num) {
      return handleDemical(num)
    },
		reset() {
			this.page.currentpage = 1
			this.page.total = 0
			this.recordList = []
		},
		switchTab(tabIndex) {
			this.phbIndex = 0
			this.tabIndex = tabIndex
		},
		switchPhb(index) {
			this.phbIndex = index
		},
    toBindPhone() {
      if(!this.isLogin) {
				this.$message({message: '请您先登录', type: 'warning'})
				return;
			}
      this.$router.push('/user/infosetting/safeset')
    },
		// 打开推广记录弹窗
		openRecord(tabIndex) {
			if(!this.isLogin) {
				this.$message({message: '请您先登录', type: 'warning'})
				return;
			}
			switch(tabIndex) {
				case 0:
					this.currentGiftType = 0
					this.currentActivityType = 0
					break;
				case 1:
					if(this.phbIndex == 0) {
						this.currentGiftType = 0
						this.currentActivityType = 1
					} else {
						this.currentGiftType = 1
						this.currentActivityType = 1
					}
					break;
				case 2:
					this.currentGiftType = 0
					this.currentActivityType = 2
					break;
				default:
					this.currentGiftType = 0
					this.currentActivityType = 0
					break;
			}
			this.QueryRecordsByParams()
			this.dialogVisible = true
		},
		handleClose(done) {
			this.reset()
			this.chooseDay = new Date ()
			const lastWeekMs = new Date().getTime() - (7 * 24 * 60 * 60 * 1000)
			this.initWeekData(new Date(lastWeekMs), 'lastWeek')
			done()
		},
		setDay(time) {
			if(typeof(this.chooseDay) == 'object') {
				this.chooseDay = formatDate(this.chooseDay)
			}
			if(this.chooseDay == time) {
				return;
			}
			this.chooseDay = time
			this.resetAndQuery()
		},
		// 处理日期
		setWeek(time) {
			if(typeof(this.chooseWeek) == 'object') {
				this.chooseWeek = formatDate(this.chooseWeek)
			}
			if(this.chooseWeek == time) {
				return;
			}
			this.chooseWeek = time
			// console.log('选择的日期是', time)
			const date = new Date(time.replace(/-/g, '/'))
			this.initWeekData(date)
			this.resetAndQuery()
		},
 		handleShare() {
			if(this.isLogin) {
				this.$router.push('/user/seo')
			} else {
				this.$message({message: '请您先登录', type: 'warning'})
			}
		},
		initWeekData(CDate = new Date(), flag = '') {
			// 根据今天当前时间计算属于今年的哪一周
			let YearNum = CDate.getFullYear()
			const ISOWN = this.getISOWeeks(YearNum)
			const FirstDateNum = this.getFirstDateNum(YearNum)
			let WeekNum = this.getWeekInYear(CDate, FirstDateNum.whichDay, FirstDateNum.flag)
			if(WeekNum < 1) {
				YearNum -= 1
				WeekNum = this.getISOWeeks(YearNum)
			}
			if(WeekNum > ISOWN) {
				YearNum += 1
				WeekNum = 1
			}
			this.setWeekStatus(YearNum, WeekNum, flag)
		},
		setWeekStatus(YearNum, WeekNum, flag = '') {
			// console.log('传入的年，周', YearNum, WeekNum)
			const dayBeEnd = this.getDayBeEnd([YearNum, WeekNum])
			this.weekStart = dayBeEnd.startDay
			this.weekEnd = dayBeEnd.endDay
			this.weekTips = `${YearNum}年 第${WeekNum}周 <br/> (${this.weekStart} 至 ${this.weekEnd})`
			if(flag == 'lastWeek') {
				this.chooseWeek = dayBeEnd.startDay
			}
		},
		// 计算一年有几个标准周，52周364天，53周371天
		getISOWeeks(y) {
			let d,
				isLeap;

			d = new Date(y, 0, 1);
			isLeap = new Date(y, 1, 29).getMonth() === 1;

			//check for a Jan 1 that's a Thursday or a leap year that has a 
			//Wednesday jan 1. Otherwise it's 52
			return d.getDay() === 4 || isLeap && d.getDay() === 3 ? 53 : 52
		},
		// 计算一年的第一周第一天是哪一号（第一周必须包含第一个周四）
		getFirstDateNum(yearNum) {
			let FDinYear
			// 标记今年第一周第一天是从去年开始算，还是今年开始算，默认从今年开始算（this/last）
			let flag = 'thisYear'
			// 每年的1号
			const firstDay = new Date(yearNum, 0, 1)
			// 计算第一天是一周中的第几天, 0是星期天，6是星期六
			let dayInFirstWeek = firstDay.getDay()
			let nextMondayFistWeek
			if(dayInFirstWeek == 0) {
				// 星期天置为7
				dayInFirstWeek = 7
			}
			// 如果上一年是闰年53个周，那么今年从第二个周一开始算第一周；否则从去年的最后一个周一开始算
			if(dayInFirstWeek > 4) {
				// 如果1号后包含今年第一个星期四，则1号属于今年第一周，实际第一周第一天是去年的最后一个周一；否则实际的第一周第一天是今年第二个周一
				FDinYear = new Date(firstDay.getTime() + (8 - dayInFirstWeek) * (24 * 60 * 60 * 1000))
				flag = 'thisYear'
			} else {
				FDinYear = new Date(firstDay.getTime() - (dayInFirstWeek - 1) * (24 * 60 * 60 * 1000))
				nextMondayFistWeek = new Date(firstDay.getTime() + (8 - dayInFirstWeek) * (24 * 60 * 60 * 1000))
				flag = 'lastYear'
			}
			// 实际每年第一周的第一天是一个月中的几号
			let whichDay = FDinYear.getDate()
			if(flag == 'lastYear') {
				// 如果今年的第一周第一天从去年开始算，计算的时候不能从去年开始，否则会计算出负数
				whichDay = nextMondayFistWeek.getDate()
			}
			// console.log('一年第一天', whichDay, FDinYear, flag)
			return { whichDay, FDinYear, flag }
		},
		// 根据今天时间计算属于一年中的第几周
		getWeekNumToday() {
			const currentDate = new Date()
			const thisYear = currentDate.getFullYear()
			const FirstDateNum = this.getFirstDateNum(thisYear)
			return this.getWeekInYear(currentDate, FirstDateNum.whichDay, FirstDateNum.flag)
		},
		// 若当年第一周不包含1号，以下计算正确；
		getWeekInYear(date, whichDay, flag) {
				let d1 = new Date(date);
				let d2 = new Date(date);
				d2.setMonth(0);
				d2.setDate(whichDay);
				let rq = d1-d2;
				let days = Math.ceil(rq/(24*60*60*1000))+1;
				let num = Math.ceil(days/7);
				if(flag == 'lastYear') {
					num += 1
				}
				return num;
		},
		// 根据选择的第XX周计算该周的开始时间和结束时间
		getDayBeEnd([yearNum, weekNum], format = 'yyyy-MM-dd') {
			const FirstDateNum = this.getFirstDateNum(Number(yearNum))
			const startDayMS = new Date(FirstDateNum.FDinYear).getTime() + ((Number(weekNum) - 1) * 7 * (24 * 60 * 60 * 1000))
			const endDayMS = startDayMS + (6 * (24 * 60 * 60 * 1000))
			const startDay = formatDate(new Date(startDayMS), format)
			const endDay = formatDate(new Date(endDayMS), format)
			// console.log('周的区间', startDay, endDay)
			return { startDay, endDay }
		},
		resetAndQuery() {
			this.reset()
			this.QueryRecordsByParams()
		},
		// 初始化数据
		initData() {
			this.$http(this.ApiSetting.active.callFriends.init)
			.then(res => {
				console.log('初始化', res)
				if(res.status == 1) {
          this.activeTime = res.data.active_show_time
					this.inviteList = res.data.inviter_rank
					this.invitedList = res.data.invitee_rank
					this.sendStatus = res.data.active_three.rebate_status ? res.data.active_three.rebate_status : 0
					this.activeThree.rebate_today = res.data.active_three.rebate_today ? res.data.active_three.rebate_today : 0.00
					this.activeThree.total_bet = res.data.active_three.total_bet ? res.data.active_three.total_bet : 0.00
					this.activeThree.total_rebate = res.data.active_three.total_rebate ? res.data.active_three.total_rebate : 0.00
          if(res.data.active_three.has_mobile) {
            this.isBindPhone = res.data.active_three.has_mobile
          } else {
            if(res.data.active_three.has_mobile == 0) {
              this.isBindPhone = 0
            }
          }
				}
			})
			.catch((err) => {
				console.log(err)
			})
		},
		// 查询推广记录
		QueryRecordsByParams() {
			let date = this.currentActivityType == 1 ? this.weekStart : this.chooseDay
			if(typeof(date) == 'object') {
				date = formatDate(date)
			}
			let params = {
				active_type: this.currentActivityType + 1,
				type: this.currentGiftType + 1,
				date,
				username: this.searchContent,
				page: this.page.currentpage - 1,
				page_size: this.page.pagesize
			}
			console.log('查询推广记录', params)
			if(!params.date) {
				this.$message({message: '请您先选择日期', type: 'warning'})
				return;
			}
			this.recordList = []
			this.listLoading = true
			this.$http(this.ApiSetting.active.callFriends.records, params)
			.then(res => {
				this.listLoading = false
				console.log('结果', res)
				if(res.status == 1) {
					this.recordList = res.data.list
					this.page.total = res.data.total
				}
			})
			.catch(() => {
				this.listLoading = false
			})
		},
    // 姓名处理，一律展示9位，最后3位***
    nickName(name) {
      return name.slice(0,6) + '***'
    }
	}
}
</script>


<style lang="less">
	.week-display {
		border: 1px solid #bf9854;
		.week-tips {
			text-align: center;
		}
	}
	.week-display[x-placement^=bottom] .popper__arrow {
		border-bottom-color: #bf9854;
	}
  .inviteFrids-pop {
    background: #080f26;
    border: 1px solid #bf9854;
    box-shadow: 0 0 12px #bf9854;
    .ptgame_more_rule {
      tr {
        th {
          color: rgb(247, 188, 134);
        }
        &:nth-child(odd) {
          background: #080f26 !important;
        }
      }
    }
    &[x-placement^=bottom] {
      .popper__arrow {
        border-bottom-color: #bf9854;
      }
    }
    .popper__arrow {
      border-top-color: #bf9854 !important;
    }
  }
	.list-loading {
		margin: auto;
	}
	.list-loading-normal {
		right: 337px;
	}
	.ml-thirty {
		margin-left: 30px;
	}
	.callfriends-dialog {
		background-color: transparent;
		.ivu-select-dropdown {
			border: 1px solid #bf9854;
		}
		.ivu-date-picker-header-label:hover {
			color: #bf9854;
		}
		.ivu-date-picker-cells-cell-selected:hover em, .ivu-date-picker-cells-cell-selected em {
			box-shadow: 0 0 1px 2px #bf9854;
			color: #fff;
		}
		.ivu-date-picker-with-range .ivu-picker-panel-body {
			min-width: 432px;
		}
		.ivu-date-picker-with-range .ivu-picker-panel-content {
				float: left;
		}
		.ivu-date-picker-cells {
			margin: 10px;
		}
		.ivu-date-picker-cells-cell:hover em {
    	color: #fff;
		}
		.ivu-date-picker-cells-cell-range {
			position: relative;
		}
		.ivu-date-picker-cells-cell-range:before {
			content: '';
			display: block;
			background: #bf9854;
			border-radius: 0;
			border: 0;
			position: absolute;
			top: 2px;
			bottom: 2px;
			left: 0;
			right: 0;
			z-index: -1;
		}
		.ivu-date-picker-cells-cell-today em:after {
			background: #bf9854;
		}
		.gold {
			color: #bf9854 !important;
		}
		.ivu-select-arrow {
			background: url("../../../assets/active/invitefriends/spirit.png") no-repeat;
    	background-position: -769px -472px !important;
			height: 6px !important;
		}
		.ivu-page-next, .ivu-page-prev {
			line-height: 22px;
		}
		.ivu-page-item a {
			color: #fff;
		}
		.ivu-page-item-active {
			color: #bf9854;
			border-color: #bf9854;
			a {
				color: #bf9854;
			}
		}
		.ivu-page-item:hover a {
			color: #bf9854;
		}
		.type-select {
			text-align: left;
			.ivu-select-selection {
				width: 140px;
				border: solid 1px #bf9854;
				border-radius: 0;
				.ivu-select-selected-value {
					font-size: 14px;
				}
			}
			.ivu-select-dropdown {
				border-color: #bf9854 !important;
			}
			.ivu-select-item {
				color:#fff;
				&:hover {
					color: #bf9854;
				}
			}
			.ivu-select-item-selected, .ivu-select-item-selected:hover {
				color: #bf9854;
			}
		}
		.search-btn {
			cursor: pointer;
			user-select: none;
			width: 120px;
			height: 34px;
			line-height: 34px;
			text-align: center;
			background-color: #bf9854;
			color: #000;
			font-size: 14px;
			margin-left: 34px;
		}
		.time-box {
			cursor: pointer;
		}
		.ivu-input-wrapper {
			width: 140px;
		}
		.ivu-input {
			border-color: #bf9854;
			border-radius: 0;
		}
		.close-btn {
			cursor: pointer;
			user-select: none;
			position: absolute;
			top: -52px;
			right: 0;
			width: 22px;
			height: 22px;
			background: url("../../../assets/active/invitefriends/spirit.png") no-repeat center center;
			background-position-x: -713px;
			background-position-y: -430px;
			&:hover {
				background-position-y: -460px;
			}
		}
		.el-dialog__header {
			display: none;
		}
		.el-dialog__body {
			padding: 0;
		}
		.table-block {
			position: relative;
			width: 100%;
			height: 580px;
			margin: auto;
			box-sizing: border-box;
			border: solid 1px #bf9854;
			background-color: #080f26;
			text-align: center;
			.rect {
				position: absolute;
				width: 100%;
				height: 100%;
				left: 0;
				top: 0;
				pointer-events: none;
				&::before {
					content: '';
					position: absolute;
					top: 0;
					right: 0;
					width: 30px;
					height: 30px;
					background: url("../../../assets/active/invitefriends/spirit.png") no-repeat center center;
					background-position-x: -476px;
					background-position-y: -423px;
				}
				&::after {
					content: '';
					position: absolute;
					bottom: 0;
					right: 0;
					width: 30px;
					height: 30px;
					background: url("../../../assets/active/invitefriends/spirit.png") no-repeat center center;
					background-position-x: -476px;
					background-position-y: -456px;
				}
			}
			&::before {
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				width: 30px;
				height: 30px;
				background: url("../../../assets/active/invitefriends/spirit.png") no-repeat center center;
				background-position-x: -430px;
				background-position-y: -423px;
			}
			&::after {
				content: '';
				position: absolute;
				bottom: 0;
				left: 0;
				width: 30px;
				height: 30px;
				background: url("../../../assets/active/invitefriends/spirit.png") no-repeat center center;
				background-position-x: -430px;
				background-position-y: -456px;
			}
			.t-title {
				width: 248px;
				margin: 40px auto 30px;
				font-size: 24px;
				font-weight: bold;
				color: #bf9854;
				position: relative;
				&::before {
					content: '';
					width: 44px;
					height: 10px;
					position: absolute;
					top: 50%;
					left: 0;
					background: url("../../../assets/active/invitefriends/spirit.png");
					background-position-x: -769px;
					background-position-y: -435px;
					top: 50%;
				}
				&::after {
					content: '';
					width: 44px;
					height: 10px;
					position: absolute;
					top: 50%;
					right: 0;
					background: url("../../../assets/active/invitefriends/spirit.png");
					background-position-x: -828px;
					background-position-y: -435px;
				}
			}
			.line {
				position: relative;
				display: flex;
				box-sizing: border-box;
				width: 100%;
				padding: 0 40px;
				color: #fff;
				align-items: center;
				margin-bottom: 20px;
				&:nth-of-type(5) {
					margin-bottom: 30px;
				}
				.l-label {
					font-size: 18px;
					width: 94px;
					text-align: right;
				}
				b {
					display: inline-block;
					height: 18px;
					line-height: 16px;
					width: 18px;
					border-radius: 50%;
					text-align: center;
					-webkit-box-sizing: border-box;
					box-sizing: border-box;
					border: 1px solid #bf9854;
					color: #bf9854;
					cursor: pointer;
					font-size: 14px;
					font-style: normal;
					vertical-align: unset;
					position: absolute;
					left: 282px;
					top: 8px;
				}
			}
			.search-table {
				width: 898px;
				box-sizing: border-box;
				margin-bottom: 14px;
				table th {
					border-left: #3f3834 1px solid;
					border-right: #3f3834 1px solid;
					background-color: #bf9854;
					line-height: 49px;
					font-size: 18px;
					color: #171d30;
					box-sizing: border-box;
				}
				table td {
					line-height: 39px;
					font-size: 14px;
					color: #ffffff;
					box-sizing: border-box;
				}
				table tbody tr:nth-of-type(2n+1) {
					background: #13182a;
				}
				&.four-perce {
					table th {
						width: 25%;
					}
					table td {
						width: 25%;
					}
				}
				&.three-perce {
					table th {
						width: 33.3333%;
					}
					table td {
						width: 33.3333%;
					}
				}
			}
		}
	}
</style>
<style lang="less" scoped>
@keyframes float {
	0% {
		transform: translate3d(-50%, 0, 0);
	}
	50% {
		transform: translate3d(-50%, 10px, 0);
	}
	100% {
		transform: translate3d(-50%, 0, 0);
	}
}
@keyframes floatRight {
	0% {
		transform: translate3d(-50%, 0, 0);
	}
	50% {
		transform: translate3d(-50%, 10px, 0);
	}
	100% {
		transform: translate3d(-50%, 0, 0);
	}
}
@keyframes smokeLeft {
	0% {
		transform: translate3d(0, 0, 0);
	}
	50% {
		transform: translate3d(-30px, 0, 0);
	}
	100% {
		transform: translate3d(0, 0, 0);
	}
}
@keyframes smokeRight {
	0% {
		transform: translate3d(150px, 0, 0);
	}
	50% {
		transform: translate3d(180px, 0, 0);
	}
	100% {
		transform: translate3d(150px, 0, 0);
	}
}


.fade-left-enter-active, .fade-left-leave-active {
	transition: all .4s ease;
}
.fade-left-enter, .fade-left-leave-to {
	transform: translateX(-60px);
	opacity: 0;
}
.fade-right-enter-active, .fade-right-leave-active {
	transition: all .4s ease;
}
.fade-right-enter, .fade-right-leave-to {
	transform: translateX(60px);
	opacity: 0;
}
.fade-table-enter-active, .fade-table-leave-active {
	transition: opacity .2s;
}
.fade-table-enter, .fade-table-leave-to {
	opacity: 0;
}
.invite-friends-page {
    background-image: url("../../../assets/active/invitefriends/gold.png"),url("../../../assets/active/invitefriends/flag.png"),url("../../../assets/active/invitefriends/topbg.jpg"),linear-gradient(to top, #181840, #3a2842);
    background-repeat: no-repeat, no-repeat, no-repeat, no-repeat;
    background-position: center top, center top, center top, center top;
		position: relative;
		width: calc(100vw - 4px);
    overflow: hidden;
    min-height: 2000px;
		.left-hero {
			pointer-events: none;
			width: 1920px;
			height: 880px;
			position: absolute;
			top: 0;
			left: 50%;
			transform: translate3d(-50%, 0, 0);
			animation: float 2.5s linear infinite;
		}
		.right-hero {
			pointer-events: none;
			width: 1920px;
			height: 880px;
			position: absolute;
			top: 0;
			left: 50%;
			transform: translate3d(-50%, 0, 0);
			animation: floatRight 2.5s linear infinite;
		}
		.left-smoke {
			pointer-events: none;
			width: 1274px;
			height: 880px;
			position: absolute;
			top: 0;
			left: 0;
			animation: smokeLeft 2.5s linear infinite;
		}
		.bold {
			font-weight: bold;
		}
		.right-smoke {
			pointer-events: none;
			width: 1120px;
			height: 880px;
			position: absolute;
			top: 0;
			right: 0;
			transform: translate3d(150px, 0, 0);
			animation: smokeRight 2.5s linear infinite;
		}
		.mask {
			pointer-events: none;
			width: 100vw;
			height: 880px;
			position: absolute;
			top: 40px;
			left: 50%;
			transform: translate3d(-50%, 0, 0);
			background-image: linear-gradient(to top, #302341, rgba(255,255,255,0));
			background-repeat: no-repeat;
			background-position: center top;
		}
		.text-right {
			text-align: right;
		}
		.text-left {
			text-align: left;
		}
		.no-display {
			opacity: 0;
		}
    .invite-friends-wrapper {
				background-image: url("../../../assets/active/invitefriends/leftfloat.png"), url("../../../assets/active/invitefriends/rightfloat.png");
				background-repeat: no-repeat, no-repeat;
				background-position: left 940px, 95% 920px;
        .fl-tip {
          font-size: 15px;
          cursor: pointer;
          text-decoration: underline;
          margin-top: 12px;
        }
				.page-title {
					pointer-events: none;
					width: 1920px;
					height: 880px;
					position: relative;
					left: 50%;
					transform: translateX(-50%);
				}
				table {
					border-top: #3f3834 1px solid;
					border-right: #3f3834 1px solid;
					box-sizing: border-box;
				}
				table th {
					border-left: #3f3834 1px solid;
					border-bottom: #3f3834 1px solid;
					background-color: #bf9854;
					line-height: 49px;
					font-size: 18px;
					color: #171d30;
					box-sizing: border-box;
				}
				table td {
					border-left: #3f3834 1px solid;
					border-bottom: #3f3834 1px solid;
					line-height: 39px;
					font-size: 14px;
					color: #ffffff;
					box-sizing: border-box;
				}
        .main-time {
          color: #fff;
          font-size: 14px;
        }
				.content {
					width: 1240px;
					min-height: 100vh;
					margin: -302px auto 0;
					.tab-wrapper {
						display: flex;
						justify-content: space-between;
						.tab {
							user-select: none;
							z-index: 2;
							cursor: pointer;
							width: 364px;
							height: 134px;
							line-height: 100px;
							background: url("../../../assets/active/invitefriends/spirit.png") no-repeat center center;
							background-position-x: -473px;
							background-position-y: -22px;
							text-shadow: 0px 1px 1px rgba(255, 218, 123, 0.63);
							font-size: 24.5px;
							font-weight: bold;
							text-align: center;
							color: #080f26;
						}
						.active-tab {
							background-position-x: -34px;
							font-size: 32px;
							color: #fff;
							text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.82);
						}
					}
					.tab-main {
						.sc-table {
							width: 900px;
							margin: 20px auto 0;
							table th {
								width: 33.3333%
							}
							table td {
								width: 33.3333%;
							}
						}
						.zc-table {
							width: 900px;
							margin: 20px auto 0;
							table th {
								width: 150px;
							}
							table td {
								width: 150px;
							}
						}
						.phb-table {
							width: 440px;
							margin-top: 45px;
							table {
								border-left: #3f3834 1px solid;
								border-bottom: #3f3834 1px solid;
							}
							table th {
								width: 25%;
							}
							table td {
								line-height: 40px;
								height: 40px;
								width: 25%;
								border: none;
							}
							table tbody tr:nth-of-type(2n+1) {
								background: #13182a;
							}
						}
						.invited-table {
							table th {
								width: 33.33333%;
							}
							table td {
								width: 33.33333%;
							}
						}
						.table-block {
							position: relative;
							width: 1240px;
							margin: 36px auto 60px;
							box-sizing: border-box;
							border: solid 1px #bf9854;
							background-color: #080f26;
							text-align: center;
							transition: all .4s ease;
							.t-title {
								width: 220px;
								margin: 40px auto 18px;
								font-size: 24px;
								font-weight: bold;
								color: #bf9854;
								position: relative;
								&::before {
									content: '';
									width: 44px;
									height: 10px;
									position: absolute;
									top: 50%;
									left: 0;
									background: url("../../../assets/active/invitefriends/spirit.png");
									background-position-x: -769px;
									background-position-y: -435px;
									top: 50%;
								}
								&::after {
									content: '';
									width: 44px;
									height: 10px;
									position: absolute;
									top: 50%;
									right: 0;
									background: url("../../../assets/active/invitefriends/spirit.png");
    							background-position-x: -828px;
									background-position-y: -435px;
								}
							}
							.t-desc {
								color: #fff;
								font-size: 14px;
							}
							.t-info {
								width:fit-content;
								font-size: 18px;
								color: #bf9854;
								margin: 6px auto 0;
								cursor: pointer;
								text-decoration: underline;
								user-select: none;
							}
							.rect {
								position: absolute;
								width: 100%;
								height: 100%;
								left: 0;
								top: 0;
								pointer-events: none;
								&::before {
									content: '';
									position: absolute;
									top: 0;
									right: 0;
									width: 30px;
									height: 30px;
									background: url("../../../assets/active/invitefriends/spirit.png") no-repeat center center;
									background-position-x: -476px;
									background-position-y: -423px;
								}
								&::after {
									content: '';
									position: absolute;
									bottom: 0;
									right: 0;
									width: 30px;
									height: 30px;
									background: url("../../../assets/active/invitefriends/spirit.png") no-repeat center center;
									background-position-x: -476px;
									background-position-y: -456px;
								}
							}
							&::before {
								content: '';
								position: absolute;
								top: 0;
								left: 0;
								width: 30px;
								height: 30px;
								background: url("../../../assets/active/invitefriends/spirit.png") no-repeat center center;
								background-position-x: -430px;
								background-position-y: -423px;
							}
							&::after {
								content: '';
								position: absolute;
								bottom: 0;
								left: 0;
								width: 30px;
								height: 30px;
								background: url("../../../assets/active/invitefriends/spirit.png") no-repeat center center;
								background-position-x: -430px;
								background-position-y: -456px;
							}
						}
						.phb-tip {
							margin-top: 20px;
							font-size: 14px;
						}
						.phb {
							display: flex;
							justify-content: center;
							.left {
								margin-right: 57px;
							}
							.p-title {
								width: 240px;
								height: 52px;
								background: url("../../../assets/active/invitefriends/spirit.png") no-repeat center center;
								background-position-x: -50px;
								background-position-y: -314px;
								font-size: 24px;
								color: #ffffff;
								font-weight: bold;
								line-height: 50px;
								margin: 40px auto 35px;
								cursor: pointer;
								user-select: none;
							}
							.p-btitle {
								color: rgba(191, 152, 84, 0.6);
								background-position-x: -326px;
							}
							.pd-block {
								width: 526px;
								display: flex;
								border-bottom: 1px solid #bf9854;
								padding-bottom: 12px;
								padding-top: 8px;
								.detail {
									height: 100px;
									display: flex;
									flex-direction: column;
									justify-content: center;
									margin-left: 49px;
									font-size: 14px;
									color: #fff;
									.line {
										display: flex;
										white-space: nowrap;
										&:last-child {
											margin-top: 12px;
										}
										div {
											min-width: 70px;
											text-align: left;
											max-width: 100px;
											// text-overflow: ellipsis;
											overflow: hidden;
										}
										.username {
											width: 80px;
										}
										.gold {
											width: 75px;
											text-align: right;
										}
										.spera {
											margin-left: 30px;
										}
									}
								}
								&:first-child {
									padding-top: 0;
								}
								&:nth-child(2) {
									.jb-icon {
										background-position-x: -167px;
									}
								}
								&:last-child {
									border: none;
									padding-bottom: 0;
									.jb-icon {
										background-position-x: -279px;
									}
								}
							}
							.jb-icon {
								background: url("../../../assets/active/invitefriends/spirit.png");
								background-position-x: -54px;
								background-position-y: -404px;
								width: 84px;
								height: 100px;
								margin-left: 31px;
							}
						}
						.sc-tg {
							display: flex;
							justify-content: center;
							.left {
								width: 240px;
								height: 377px;
								border: solid 1px #bf9854;
								padding: 30px 40px;
								box-sizing: border-box;
							}
							.right {
								margin-left: 30px;
								display: flex;
								width: 756px;
								height: 377px;
								border: solid 1px #bf9854;
								padding: 30px 0 30px 0;
								box-sizing: border-box;
								.left {
									padding: 0 40px;
									height: 100%;
									border: none;
									.tg-desc {
										text-indent: -25px;
										padding-left: 25px;
									}
								}
							}
							.swiper-wrapper {
								width: 460px;
								cursor: grab;
								.swiper-box {
									width: 460px;
									height: 314px;
									margin: 0 auto;
									.swiper-slide {
										img {
											width: 436px;
											height: 314px;
											user-select: none;
										}
									}
								}
								.swiper-button-prev {
									background: url("../../../assets/active/invitefriends/spirit.png") no-repeat center center;
									background-position-x: -564px;
									background-position-y: -457px;
									width: 18px;
									left: -20px;
									height: 24px;
									&::after {
										content: none;
									}
								}
								.swiper-button-next {
									right: -20px;
									background: url("../../../assets/active/invitefriends/spirit.png") no-repeat center center;
									background-position-x: -600px;
									background-position-y: -429px;
									width: 18px;
									height: 24px;
									&::after {
										content: none;
									}
								}
							}
							.tg-title {
								font-weight: bold;
								.num {
									color: #bf9854;
									font-size: 30px;
									display: inline-block;
									font-weight: bold;
								}
								.text {
									width: 120px;
									height: 30px;
									display: inline-block;
									vertical-align: top;
									position: relative;
									top: 5px;
									background-color: #bf9854;
									text-align: center;
									line-height: 30px;
									color: #080f26;
									font-size: 19px;
									margin-left: 4px;
								}
							}
							.tg-desc {
								margin-top: 40px;
								color: #fff;
								font-size: 14px;
								line-height: 1.71;
								text-align: left;
							}
						}
					}
					.hdgz-block {
						padding-bottom: 40px;
					}
					.gz-arrow {
						margin: auto;
						width: 22px;
						height: 16px;
						background: url("../../../assets/active/invitefriends/spirit.png") no-repeat center center;
						background-position-x: -651px;
						background-position-y: -431px;
					}
					.gz-text {
						margin-top: 20px;
						text-align: left;
						padding: 0 225px;
						font-size: 14px;
						color: #fff;
						line-height: 1.71;
						ol li {
							list-style: decimal;
						}
						li {
							margin-bottom: 14px;
						}
						.large-text {
							margin: 0 4px;
						}
					}
				}
				.fl-wrapper {
					margin-top: 18px;
					display: flex;
					justify-content: center;
					.fl-block {
						background: url("../../../assets/active/invitefriends/spirit.png") no-repeat center center;
						background-position-x: -47px;
						background-position-y: -555px;
						width: 280px;
						height: 140px;
						margin-right: 29px;
            position: relative;
						&:last-of-type {
							margin-right: 0;
						}
					}
					.fl-title {
						font-size: 18px;
						font-weight: bold;
						color: #080f26;
						line-height: 50px;
					}
					.money {
						font-size: 24px;
						line-height: 90px;
						color: #fff;
						b {
							.float {
								font-size: 18px;
							}
						}
						.text {
							font-size: 18px;
							margin-left: 5px;
						}
					}
				}
				.large-text {
					font-size: 18px;
				}
				.btn {
					background: url("../../../assets/active/invitefriends/spirit.png");
					cursor: pointer;
					color: #fff;
					text-align: center;
					user-select: none;
				}
				.share-btn {
					margin: 30px auto 0;
					width: 243px;
					height: 63px;
					line-height: 63px;
					background-position-x: -46px;
    			background-position-y: -216px;
					font-size: 24px;
					&:hover {
						background-position-x: -328px;
					}
				}
				.confirm {
					width: 242px;
					height: 46px;
					background-position-x: -370px;
					background-position-y: -553px;
					font-size: 17px;
					line-height: 46px;
					margin: 0 auto 50px;
					&:hover {
    				background-position-y: -627px;
					}
				}
    }
		.gold {
			color: #bf9854 !important;
		}
}
</style>