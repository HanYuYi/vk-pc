<template>
  <div class="guide_section levelupdate">
    <div class="section_s">
      <div class="section_title">
        {{$t("How_to_upgrade_VKGAME_account")}}
      </div>
      <div class="section_s_c">
        <p>{{$t("VKGAME_site_level_can_make")}}</p>
        <p>{{$t("Players_after_login_account_can")}}</p>
        <div class="img_box">
          <img src="../../../assets/guide/image25.png" alt="">
        </div>
        <p><span class="notice">{{$t("Initial_for_LV0_users_the")}}</span></p>
        <p>{{$t("A_detailed_account_required_rating")}}</p>
        <div class="table_box">
          <table cellpadding="0" cellspacing="0">
            <tbody><tr class="title"><td>{{$t("User_level")}}</td><td>{{$t("The_integral")}}</td></tr>
            <tr><td class="lever">Lv0</td><td>---</td></tr>
            <tr><td class="lever">Lv1</td><td>=&gt; 220</td></tr>
            <tr><td class="lever">Lv2</td><td>=&gt; 220</td></tr>
            <tr><td class="lever">Lv3</td><td>=&gt; 550</td></tr>
            <tr><td class="lever">Lv4</td><td>=&gt; 900</td></tr>
            <tr><td class="lever">Lv5</td><td>=&gt; 3200</td></tr>
            <tr><td class="lever">Lv6</td><td>=&gt; 12000</td></tr>
            <tr><td class="lever">Lv7</td><td>=&gt; 48000</td></tr>
            <tr><td class="lever">Lv8</td><td>=&gt; 128000</td></tr>
            <tr><td class="lever">Lv9</td><td>=&gt; 480000</td></tr>
            <tr><td class="lever">Lv10</td><td>=&gt; 1280000</td></tr>
            <tr><td class="lever">Lv11</td><td>=&gt; 3000000</td></tr>
            <tr><td class="lever">Lv12</td><td>=&gt; 5000000</td></tr>
            </tbody></table>
        </div>
        <div class="table_box">
          <table cellpadding="0" cellspacing="0">
            <tbody><tr class="title"><td>{{$t("Gain_experience_can_use_function")}}</td><td>{{$t("Experience_value")}}</td></tr>
            <tr><td>{{$t("User_top_up")}}</td><td class="num">{{$t("Principal_experience")}}</td></tr>
            <tr><td colspan="2">{{$t("Other_ways_get_experience_value")}}<router-link class="to_link" to="/user/task">{{$t("The_task_center")}}</router-link>{{$t("To_view")}}</td></tr>
            </tbody></table>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'guidelevelupdate',
  components: {},
  data() {
      return {}
  },
  methods: {}
}
</script>
<style>

</style>
