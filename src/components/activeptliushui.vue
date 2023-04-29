<template>
<!--pt电子流水不计算的游戏-->
 <el-popover
 placement="bottom"
 trigger="hover"
 :popper-class="styleClass ? 'ptgame_more_rule_box ' + styleClass : 'ptgame_more_rule_box'">
   <table class="ptgame_more_rule">
    <tr><th colspan="2">有效流水不含下面游戏</th></tr>
    <tr><td>捕鱼多福</td><td>巨龙累积奖金轮盘赌</td></tr>
    <tr><td>疯狂乐透</td><td>钻石拼轮盘赌</td></tr>
    <tr><td>百家乐</td><td>迷你轮盘</td></tr>
    <tr><td>专赌21点</td><td>奖金轮盘</td></tr>
    <tr><td>炸金花</td><td>完美 21 点</td></tr>
   </table>
 <span class="hovef" slot="reference" :style="[{color:color},styleObj]">查看详情</span>
 </el-popover>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  props: {
    color:{
      type:String,
      default:"#07f1b7"
    },
		styleClass: {
      type:String,
      default:""
		},
    styleObj:Object
  },
  mounted() {

	}
};
</script>

<style scoped lang="less">
 /*pt电子流水不计算的游戏*/
.green_c{
    color: #07f1b7;
    cursor: pointer;
}
.hovef {
  text-decoration: underline;
  cursor: pointer;
}
.ptgame_more_rule_box {
	width: 480px;
	padding: 0 !important;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.35);

}
.ptgame_more_rule {
	color: #fff;
	font-size: 14px;
	tr {
		&:nth-child(odd) {
			background: #1c1e25;
		}
		td {
			&:first-child {
				border-right: 1px solid #4b5064;
			}
		}
	}
	th {
		color: #07f1b7;
		font-weight: normal;
		height: 40px;
		text-align: center;
	}
	td {
		border-top: 1px solid #4b5064;
		height: 40px;
		text-align: center;
		width: 240px;
	}
}
</style>
