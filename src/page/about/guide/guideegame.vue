<template>
  <div class="guide_section egame">
    <div class="section_s">
      <div class="section_title">
        {{$t("How_to_participate_in_betting")}}<br/>
        {{$t("The_tournament")}}
      </div>
      <div class="section_s_c">
        <p>{{$t("In_the_financial_center_electronic_sports")}}</p>
        <p>{{$t("Enter_the_page_of_electronic")}}</p>
        <div class="img_box">
          <img src="../../../assets/guide/5.jpg" alt="">
        </div>
        <p>{{$t("Select_events_and_hope")}}<span class="notice">{{$t("Bet_the_countdown_will_not")}}</span></p>
        <div class="img_box">
          <img src="../../../assets/guide/1.png" alt="">
          <img src="../../../assets/guide/2.jpg" alt="">
        </div>
        <p>{{$t("The_betting_play_box")}}</p>
        <div class="img_box">
          <img src="../../../assets/guide/3.jpg" alt="">
        </div>
        <p v-html="$t('Select_mode_RMB')"></p>
        <!-- <p>{{$t("Participate_in_the_tournament_guide")}}<span class="notice">{{$t("One_minute_before_trading_in")}}</span></p>
        <div class="img_box">
          <img src="../../../assets/guide/4.png" alt="">
        </div>
        <p>{{$t("guideegame_rule_6")}}</p>
        <div class="img_box">
          <img src="../../../assets/guide/image45.png" alt="">
        </div>-->
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'guideegame',
  components: {},
  data() {
      return {}
  },
  methods: {}
}
</script>
<style>

</style>
