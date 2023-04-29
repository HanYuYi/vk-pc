<template>
  <div class="guide_section kjzf">
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
        {{$t("Quick_payment")}}
      </div>
      <div class="section_s_c">
        <p class="section_desc" v-html="$t('Open_the_bank_on')"></p>
        <div class="img_box">
          <img src="../../../assets/guide/image7.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'guidekjzf',
  components: {},
  data() {
      return {}
  },
  methods: {}
}
</script>
<style>

</style>
