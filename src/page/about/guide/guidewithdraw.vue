<template>
  <div class="guide_section withdraw">
    <div class="section_s">
      <div class="section_title">
        {{$t("How_to_draw")}}
      </div>
      <div class="section_s_c">
        <p>{{$t("Login_VKGAME_accounts_vk")}}</p>
        <p>{{$t("For_the_first_time")}}</p>
        <p>{{$t("The_individual_center")}}</p>
        <div class="img_box">
          <img src="../../../assets/guide/image6.png" alt="">
        </div>
      </div>
    </div>
    <div class="section_s">
      <div class="section_s_c">
        <p>{{$t("Enter_your_withdrawal_lines")}}</p>
        <div class="img_box">
          <img src="../../../assets/guide/image9.png" alt="">
        </div>
      </div>
    </div>
    <div class="section_notice" v-html="$t('Warm_prompt_game_purse')"></div>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'guidewithdraw',
  components: {},
  data() {
      return {}
  },
  methods: {}
}
</script>
<style>

</style>
