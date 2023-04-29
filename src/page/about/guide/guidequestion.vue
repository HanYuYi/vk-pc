<template>
  <div class="guide_section question">
    <div class="section_s">
      <div class="section_title">
        {{$t("Common_problems")}}
      </div>
      <div class="section_s_c">
        <p>{{$t("Q_how_to_calculate_the")}}</p>
        <p>{{$t("A_Hong_Kong_trading_at")}}</p>
      </div>
      <div class="section_s_c">
        <p>{{$t("Q_what_is_V")}}</p>
        <p v-html="$t('A_1_the_PC_sign')"></p>
        <router-link class="to_link" to="/guide/9-2" target="_blank">{{$t("How_to_get_the_V")}}?</router-link>
      </div>
      <!-- <div class="section_s_c">
        <p>{{$t("Q_for_V_currency_quota")}}</p>
        <p>{{$t("A_convertible_V_account")}}</p>
      </div> -->
      <div class="section_s_c">
        <p>{{$t("Q_what_odds_and_represent")}}</p>
        <p>{{$t("A_at_one_at_the")}}</p>
      </div>
      <div class="section_s_c">
        <p>{{$t("Q_after_betting_can_change")}}</p>
        <p>{{$t("A_esports_early_on_before")}}</p>
      </div>
      <div class="section_s_c">
        <p>{{$t("Q_what_is_the_draw")}}</p>
        <p v-html="$t('A_single_withdrawal_limit_the')"></p>
      </div>
      <div class="section_s_c">
        <p>{{$t("Q_how_to_find_the")}}</p>
        <p>{{$t("A_can_retrieve_password_forgot")}}</p>
      </div>
      <div class="section_s_c">
        <p>{{$t("Q_what_is_the_meaning")}}</p>
        <p>{{$t("A_to_be_confirmed_example")}}</p>
      </div>
      <div class="section_s_c">
        <p>{{$t("Q_how_to_enter_the")}}</p>
        <p>{{$t("A_my_backpack_backpack")}}</p>
      </div>
      <div class="section_s_c">
        <p>{{$t("Q_what_is_water")}}</p>
        <p>{{$t("A_only_can_be_understood")}}</p>
      </div>
      <div class="section_s_c">
        <p>{{$t("Q_conditions_is_a_part")}}</p>
        <p>{{$t("A_registered_VKGAME_account_level")}}</p>
      </div>
      <div class="section_s_c">
        <p>{{$t("Q_what_is_the_ball")}}</p>
        <p>{{$t("A_ball_betting_game_refers")}}</p>
      </div>
      <div class="section_s_c">
        <p>{{$t("Q_what_is_the_return")}}</p>
        <p>{{$t("A_according_to_the_members")}}</p>
      </div>
      <div class="section_s_c">
        <p>{{$t("Q_how_to_deposit")}}</p>
        <p>{{$t("A_you_can_select_each")}}</p>
      </div>
      <div class="section_s_c">
        <p>{{$t("Q_can_immediately_after_deposit")}}</p>
        <p>{{$t("A_in_order_to_prevent")}}</p>
      </div>
    </div>

  </div>
</template>
<script type="text/javascript">
export default {
  name: 'guidequestion',
  components: {},
  data() {
      return {}
  },
  methods: {}
}
</script>
<style>
.question .section_s_c{
  padding: 5px 0;
}
</style>
