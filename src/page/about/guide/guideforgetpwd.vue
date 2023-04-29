<template>
  <div class="guide_section forgetpwd">
    <div class="section_s">
      <div class="section_title">
        {{$t("Forgot_password")}}
      </div>
      <div class="section_s_c">
        <p>{{$t("If_you_forget_the_login")}}</p>
        <p v-html="$t('Refer_to_the_process')"></p>
        <div class="img_box">
          <img src="../../../assets/guide/image34.jpg" alt="">
          <img src="../../../assets/guide/image35.jpg" alt="">
        </div>
        <p>{{$t("Self_service_password_change_will")}}</p>
        <div class="img_box">
          <img src="../../../assets/guide/image36.jpg" alt="">
        </div>
        <p class="notice">{{$t("Warm_prompt_if_not_set")}}</p>
        <p v-html="$t('Apply_for_artificial_retrieve')"></p>
      </div>
      <div class="section_notice">{{$t("VKGAME_promise_only_as")}}</div>
    </div>

  </div>
</template>
<script type="text/javascript">
export default {
  name: 'guideforgetpwd',
  components: {},
  data() {
      return {}
  },
  methods: {}
}
</script>
<style>

</style>
