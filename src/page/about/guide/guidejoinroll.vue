<template>
  <div class="guide_section joinroll">
    <div class="section_s">
      <div class="section_title">
        {{$t("How_to_participate_in")}}
      </div>
      <div class="section_s_c">
        <p v-html="$t('Registered_VKGAME_account_level_greater')"></p>
        <div class="img_box">
          <img src="../../../assets/guide/image31.jpg" alt="">
        </div>
        <p>{{$t("Click_on_the_need")}}</p>
      </div>
    </div>
    <div class="section_s">
      <div class="section_title">
        {{$t("View_the_results_of_ROLL")}}
      </div>
      <div class="section_s_c">
        <p>{{$t("In_the_ROLL_was_lucky")}}</p>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'guidejoinroll',
  components: {},
  data() {
      return {}
  },
  methods: {}
}
</script>
<style>

</style>
