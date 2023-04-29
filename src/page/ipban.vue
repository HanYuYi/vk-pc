<template>
  <div class="page_404">
				<div class="page_main">
						<img class="logo fl" src="../assets/ipban/logo.png" alt="" >
						<img class="line fl" src="../assets/ipban/line.png" alt="" >
						<div class="txt_content fl">
								<div>
										<img src="../assets/ipban/ban-icon.png" alt="">
										<span class="ban_tit">禁止访问</span>
								</div>
								<p class="mr_15">当前地区不允许访问</p>
								<p class="ipadress green" v-show="$store.state.ip">IP : {{$store.state.ip}}</p>
								<!-- <p class="ipadress green" v-show="$route.params.ip">IP : {{$route.params.ip}}</p> -->
								<div>
										<div class="icon kefu_icon fl"></div>
										<span>如有任何问题，请联系我们的</span>
										<a class="kefu_link green" href="javascript:;" @click="openKfWindow()"  >在线客服</a>
								</div>
								<div>
										<div class="icon email_icon fl"></div>
										<span class="upper"> 或发邮件至 cs@vkgame.com</span>
										<p>给您造成不便，敬请谅解。</p>
								</div>
								<p class="upper mr_15">We are not serving your location.</p>
								<p class="upper">Please contact our Customer Service Support 24/7 Live Help</p>
								<p class="upper">or Drop us an email to   cs@vkgame.com</p>
								<p class="upper">Apologise for any inconvenience that this may have caused.</p>
						</div>
				</div>
		</div>
</template>
<script type="text/javascript">
export default {
  name: 'ipban',
  components: {},
  data() {
    return {
		}
	},
}
</script>
<style scoped lang="less">
.page_404 {
	width: 100vw;
	height: 100vh;
	text-align: center;
	background: url("../assets/ipban/bg.jpg") no-repeat center top;
	background-size: 100% 100%;
	box-sizing: border-box;
	color:#fff;
	.ban_tit {
			font-size: 50px;
			letter-spacing: 5px;
			font-family: vkFont;
			margin-left: 10px;
	}
	.logo {
			margin-top: 182px;
	}
	.line {
			margin:0 30px;
	}
	.txt_content {
			padding: 50px 0;
			text-align: left;
			font-size: 18px;
			font-family: MicrosoftYaHei;
			line-height: 1.5;
	}
	.txt_content img, .txt_content span{
			vertical-align: middle;
	}
	.green {
			color:#07f1b7;
	}
	.kefu_link {
			text-decoration: underline;
			font-weight: bold;
	}
	.upper {
		text-transform:uppercase
	}
	.mr_15 {
		margin-top: 15px;
	}
	.page_404 {
			position: relative;
	}
	.page_main {
		width: 1000px;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50% ,-50%);
	}
	.icon {
			width:24px ;
			height: 24px;
			margin-right: 10px;
	}
	.kefu_icon {
			background:url("../assets/ipban/kefu-icon.png") no-repeat center center;
	}
	.email_icon {
			background:url("../assets/ipban/email-icon.png") no-repeat center center;
	}
}
</style>
