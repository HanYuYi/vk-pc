<template>
  <div class="active_page ly_active">
    <!--<div class="to_play_ly active_page_top_btn">
      <router-link to="/lygame" class="ly_btn active_page_btn"></router-link>
    </div>-->
    <div class="active_page_wrapper">
      <div class="wrapper">
        <div class="top_bg">
          <div class="bg1"></div>
          <div class="bg2"></div>
        </div>
        <div class="active_page_content">
          <div class="active_section_box">
            <div class="active_title">
              {{$t("The_activity_time")}}
            </div>
            <div class="section_box_wrapper">
              <div class="active_time">
                {{$t("On_October_10_2018")}}
              </div>
            </div>
          </div>
          <div class="active_section_box">
            <div class="active_title">
              {{$t("Active_content")}}
            </div>
            <div class="section_box_wrapper">
              <div class="active_time">
                {{$t("All_participating_VKGAME_chess_betting")}}
              </div>
            </div>
          </div>
          <div class="active_section_box">
            <div class="active_title">
              {{$t("Activity_rules")}}
            </div>
            <div class="section_box_wrapper">
              <div class="active_desc">
                <p>{{$t("About_1_The_return_water")}}</p>
                <p>2. {{$t("Every_player_each_mobile")}}</p>
                <p>3. {{$t("VKGAME_official_final_interpretation")}}</p>
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
  name: 'lyactive',
  components: {},
  data() {
     return {}
  },
  methods: {}
}
</script>
<style scoped>
  .active_home .active_page.ly_active{
    padding: 560px 0 80px;
  }
  .active_page.ly_active .active_page_top_btn{
    top: 540px;
  }
  .ly_active{
    background: url("../../../assets/active/lygame/banner.jpg") no-repeat center top;
  }
  .to_play_ly{
    text-align: center;
  }
  .to_play_ly .ly_btn{
    display: inline-block;
    width: 268px;
    height: 110px;
    text-align: center;
    background: url("../../../assets/lygame/ly_icons.png") no-repeat;
    background-position: -404px -62px;
  }
  .to_play_ly .ly_btn:hover{
    background-position: -404px -212px;
  }
</style>
