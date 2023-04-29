<template>
  <div class="guide_section vbrule">
    <div class="section_s">
      <div class="section_title">
        {{$t("V_c_rules")}}
      </div>
      <div class="section_s_c">
        <p>1、{{$t("What_is_V")}}</p>
        <p>{{$t("V_c_is_VKGAME_donative")}}</p>
      </div>
      <div class="section_s_c">
        <p>{{$t("How_to_make_V")}}</p>
        <p class="inner_p" v-html="$t('Sign_in_to_earn')"> </p>
        <el-popover
          placement="bottom"
          trigger="hover"
          popper-class="ptgame_more_rule_box">
          <table class="ptgame_more_rule">
            <tr><th colspan="2">有效流水不含下面游戏</th></tr>
            <tr><td>捕鱼多福</td><td>巨龙累积奖金轮盘赌</td></tr>
            <tr><td>疯狂乐透</td><td>钻石拼轮盘赌</td></tr>
            <tr><td>百家乐</td><td>迷你轮盘</td></tr>
            <tr><td>专赌21点</td><td>奖金轮盘</td></tr>
            <tr><td>炸金花</td><td>完美 21 点</td></tr>
          </table>
          <span slot="reference" class="green_c">查看详情</span>
        </el-popover>
        。
        <p v-html="$t('Sign_in_to_earn_2')"></p>
      </div>
      <div class="section_s_c">
        <p>{{$t("How_to_use_and")}}</p>
        <p v-html="$t('Participate_in_the_tournament')"></p>
      </div>
      <div class="section_s_c">
        <p>{{$t("How_to_view_detail")}}</p>
        <p>{{$t("V_c_detail_view_please")}}</p>
      </div>
      <div class="section_s_c">
        <p>{{$t("What_are_the_user")}}</p>
        <p v-html="$t('By_manual_operation_or')"></p>
        <p>{{$t("Meet_the_above_3_cases")}}</p>
      </div>
      <div class="section_s_c">
        <p>{{$t("Matters_needing_attention")}}</p>
        <p v-html="$t('V_coin_or_gift')"></p>
      </div>
    </div>

  </div>
</template>
<script type="text/javascript">
export default {
  name: 'guidevbrule',
  components: {},
  data () {
    return {}
  },
  methods: {}
}
</script>
<style>
.vbrule .section_s_c{
  padding: 5px 0;
  line-height: 20px;
}
.vbrule .inner_p {
  display: inline;
}
.green_c {
  color: #07f1b7;
  cursor: pointer;
}
</style>
