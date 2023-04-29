<template>
  <div class="page_404">
    <div class="page_logo">
      <img src="../assets/404/logo.png" alt="">
    </div>
    <div class="page_main">
      {{$t('Cant_find_something')}}<router-link to="/" class="to_index">{{$t('Here')}}</router-link>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'page404',
  components: {},
  data() {
    return {}
  },
  methods: {}
}
</script>
<style scoped lang="less">
.page_404 {
	text-align: center;
	background: url("../assets/404/404.jpg") no-repeat center top;
	height: 1080px;
	box-sizing: border-box;
	padding: 150px 0 110px;
	.page_logo {
		height: 62px;
	}
	.page_main {
		padding-top: 600px;
		font-size: 16px;
		.to_index {
			text-decoration: underline;
			color: #7c839f;
			font-size: 16px;
		}
	}
}
</style>
