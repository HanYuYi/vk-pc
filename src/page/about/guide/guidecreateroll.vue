<template>
  <div class="guide_section createroll">
    <div class="section_s">
      <div class="section_title">
        {{$t("How_to_create_a_room")}}
      </div>
      <div class="section_s_c">
        <p>{{$t("In_the_jewelry_market_level")}}</p>
        <p>{{$t("login_VKGAME_account_choose")}}</p>
        <div class="img_box">
          <img src="../../../assets/guide/image27.jpg" alt="">
        </div>
        <p>{{$t("click_on_the_create")}}</p>
        <div class="img_box">
          <img src="../../../assets/guide/image28.png" alt="">
        </div>
        <p><span class="notice" v-html="$t('Description_main_fill_in_on')"></span></p>
        <p>{{$t("Add_accessories_in")}}</p>
        <div class="img_box">
          <img src="../../../assets/guide/image29.png" alt="">
        </div>
      </div>
    </div>
    <div class="section_s">
      <div class="section_title">
        {{$t("Homeowners_to_check_the_ROLL")}}
      </div>
      <div class="section_s_c">
        <p v-html="$t('After_the_room_has')"></p>
        <div class="img_box">
          <img src="../../../assets/guide/image30.jpg" alt="">
        </div>
        <p>{{$t("Click_on_the_ROLL")}}</p>
      </div>
    </div>
    <div class="section_notice">
      {{$t("Warm_prompt_all_the_rooms")}}
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'guidecreateroll',
  components: {},
  data() {
      return {}
  },
  methods: {}
}
</script>
<style>

</style>
