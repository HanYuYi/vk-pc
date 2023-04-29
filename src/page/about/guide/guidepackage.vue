<template>
  <div class="guide_section package">
    <div class="section_s">
      <div class="section_title">
        {{$t("My_backpack")}}
      </div>
      <div class="section_s_c">
        <p>{{$t("In_the_site_to_participate")}}</p>
        <div class="img_box">
          <img src="../../../assets/guide/image38.jpg" alt="">
        </div>
        <p>{{$t("Need_to_get_deposit_retrieve_function")}}</p>
        <p v-html="$t('Click_on_the_my')"></p>
        <div class="img_box">
          <img src="../../../assets/guide/image39.png" alt="">
        </div>
        <p>{{$t("if_you_dont_remember")}}</p>
        <div class="img_box">
          <img src="../../../assets/guide/image40.png" alt="">
        </div>
        <p>{{$t("When_doing_access_operation")}}</p>
        <div class="img_box">
          <img src="../../../assets/guide/image41.png" alt="">
          <img src="../../../assets/guide/image42.png" alt="">
        </div>
      </div>
      <div class="section_notice" v-html="$t('Warm_prompt_dont_check_to')"></div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'guidepackage',
  components: {},
  data() {
      return {}
  },
  methods: {}
}
</script>
<style>

</style>
