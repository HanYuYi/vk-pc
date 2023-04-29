<template>
  <div class="guide_section rollactionrule">
    <div class="section_s">
      <div class="section_title">
        {{$t("Malicious_behavior_that")}}
      </div>
      <div class="section_s_c">
        <p class="notice">{{$t("A_malicious_behavior_many_times")}}</p>
        <p v-html="$t('Specific_malicious_behavior_that_include')"></p>
        {{$t("The_above_rules_VKGAME_reserves")}}
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'guiderollactionrule',
  components: {},
  data() {
      return {}
  },
  methods: {}
}
</script>
<style>

</style>
