<template>
  <div class="guide_section smzf">
    <div class="section_s">
      <div class="section_title">
        {{$t("How_to_prepaid_phone")}}
      </div>
      <div class="section_s_c">
        <p>{{$t("Into_the_heart_of_the")}}</p>
        <div class="img_box">
          <img src="../../../assets/guide/image6.png" alt="">
        </div>
      </div>
    </div>
    <div class="section_s">
      <div class="section_title">
        {{$t("QQ_unionpay_alipay_and_yards")}}
      </div>
      <div class="section_s_c">
        <p class="section_desc">
          {{$t("Select_the_required_payment")}}
        </p>
        <div class="img_box">
          <img src="../../../assets/guide/image8.png" alt="">
        </div>
      </div>
    </div>
    <div class="section_notice" v-html="$t('Warm_prompt_all_qr_code')"></div>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'guidesmzf',
  components: {},
  data() {
      return {}
  },
  methods: {}
}
</script>
<style>

</style>
