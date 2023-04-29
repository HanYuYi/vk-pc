<template>
  <div class="sport_active active_page">
    <div class="to_play_sport active_page_top_btn">
      <router-link to="/sports" class="active_page_btn"></router-link>
    </div>
    <div class="active_page_wrapper">
      <div class="wrapper">
        <div class="top_bg">
          <div class="bg1"></div>
          <div class="bg2"></div>
        </div>
        <div class="active_page_content">
          <div class="active_section_box">
            <div class="active_title">
              {{$t("Active_content")}}
            </div>
            <div class="section_box_wrapper">
              <div class="active_time">
                {{$t("All_VKGAME_members_can_enjoy")}}
              </div>
            </div>
          </div>
          <div class="active_section_box">
            <div class="active_title">
              {{$t("Activity_rules")}}
            </div>
            <div class="section_box_wrapper">
              <div class="active_desc">
                <p>{{$t("Cashback_time_fixed_for_automatically")}}<span class="default_color">{{$t("cashback_computing_cycles")}}</span></p>
                <p>{{$t("Hong_Kong_trading_at")}}<br/>
                  <span class="default_color">{{$t("Effective_calculating_formula_for_water")}}</span></p>
                <p>{{$t("Each_effective_player_mobile_phone")}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="btn back_active_nav">
        <router-link to="/active" class="botton normal">{{$t("Return_to_activity_page")}}</router-link>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'sportactive',
  components: {},
  data() {
    return {}
  },
  methods: {}
}
</script>
<style scoped>
.sport_active{
  background: url("../../../assets/active/sport/banner.jpg") no-repeat center top;
}
.to_play_sport .active_page_btn{
  width: 295px;
  height: 83px;
  background: url("../../../assets/active/sport/normal.png") no-repeat  center;
}
.to_play_sport .active_page_btn:hover{
  background: url("../../../assets/active/sport/hover.png") no-repeat  center;
}
</style>
