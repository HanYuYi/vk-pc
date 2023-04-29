<template>
  <div class="guide_section seo">
    <div class="section_s">
      <div class="section_title">
        {{$t("Promotion_share")}}
      </div>
      <div class="section_s_c">
        <p>{{$t("Every_user_has_individual_exclusive")}}</p>
        <!-- <p>{{$t("Each_by_promoting_links_or")}}</p> -->
        <div class="img_box">
          <img src="../../../assets/guide/image37.jpg" alt="">
        </div>
      </div>
      <div class="section_notice" v-html="$t('Warm_prompt_the_invitation')"></div>
    </div>

  </div>
</template>
<script type="text/javascript">
export default {
  name: 'guideseo',
  components: {},
  data() {
      return {}
  },
  methods: {}
}
</script>
<style>

</style>
