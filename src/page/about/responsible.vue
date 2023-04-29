<template>
  <div class="responsible about_page inner_page">
    <div class="wrapper">
      <h3 class="about_title">{{$t("Rational_game")}}</h3>
      <div class="about_page_main">
        <div class="page_nav clearfix">
          <div class="nav_box fl" v-for="item in navList" :key="item.id" @click="handleNavSelect(item.id)" :class="{'actived': item.id === currentNavId}">{{item.title}}</div>
        </div>
        <div class="content_wrapper">
          <div class="page_content" v-show="currentNavId === 1">
            <div class="page_section_main_title">{{$t("Our_commitment")}}</div>
            <div class="page_content_section">
              <div class="section_text"><span v-html="$t('VKGAME_committed_to_temperate_quizzes')"></span>
                - <a href="javascript:;" class="a_link" @click="handleNavSelect(2)">{{$t("Deposit_limits")}}</a><br/>
                - <a href="javascript:;" class="a_link" @click="handleNavSelect(4)">{{$t("Self_is_prohibited")}}</a><br/>
                {{$t("Our_customer_service_staff_accepted")}}<a href="javascrip:;" class="a_link" @click="openKfWindow()">{{$t("Contact_us")}}</a>。<br/>
                {{$t("If_you_are_looking_for")}}<a href="javascrip:;" class="a_link" @click="handleNavSelect(3)">{{$t("Self_assessment")}}</a>{{$t("This_will_help_you")}}<br/>
                {{$t("If_you_worry_about_a")}}<a href="javascrip:;" class="a_link" @click="handleNavSelect(5)">{{$t("To_view_more_information")}}</a>。
              </div>
            </div>

          </div>
          <div class="page_content" v-show="currentNavId === 2">
            <div class="page_section_main_title">{{$t("Account_limit")}}</div>
            <div class="page_content_section">
              <div class="page_section_title">{{$t("Deposit_limits")}}</div>
              <div class="section_text">
                {{$t("You_can_reduce_your_deposit")}}<br/>
                {{$t("Before_to_increase_your_deposit")}}
              </div>
            </div>
            <div class="page_content_section">
              <div class="page_section_title">{{$t("Online_account_history")}}</div>
              <div class="section_text">
                {{$t("For_the_convenience_of_you")}} <router-link class="a_link" to="/user">{{$t("Individual_center")}}</router-link>{{$t("Area_to_check_the_transaction")}}
              </div>
            </div>
          </div>
          <div class="page_content" v-show="currentNavId === 3">
            <div class="page_section_main_title">{{$t("Found_the_problem")}}</div>
            <div class="page_content_section">
              <div class="section_text">
                {{$t("Although_most_of_our_customers")}}<br/>
                {{$t("Answer_the_following_self_assessment")}}
              </div>
            </div>
            <div class="page_content_section">
              <div class="section_text" v-html="$t('Whether_you_do_quizzes')"></div>
            </div>
            <div class="page_content_section">
              <div class="section_text">
                {{$t("You_answered_yes_to_these")}}<a href="javascrip:;" class="a_link" @click="openKfWindow()">{{$t("Contact_our_customer_service_team")}}</a>。<br/>
                {{$t("We_also_suggest_you_consider")}}<a href="javascript:;" class="a_link" @click="handleNavSelect(4)">{{$t("Self_is_prohibited")}}</a>。
              </div>
            </div>
          </div>
          <div class="page_content" v-show="currentNavId === 4">
            <div class="page_section_main_title">{{$t("Temporary_dont_contest")}}</div>
            <div class="page_content_section">
              <div class="page_section_title">{{$t("suspended")}}</div>
              <div class="section_text">
                {{$t("If_you_want_to_temporarily")}}<a href="javascrip:;" class="a_link" @click="openKfWindow()">{{$t("Contact_our_customer_service_personnel")}}</a>{{$t("In_order_to_get_more")}} <br/>
                {{$t("At_risk_of_a_guessing_problem")}}<a href="javascrip:;" class="a_link" @click="openKfWindow()">{{$t("Contact_our_customer_service_personnel")}}</a>{{$t("In_order_to_get_more")}}
              </div>
            </div>
            <div class="page_content_section">
              <div class="page_section_title">{{$t("Self_is_prohibited")}}</div>
              <div class="section_text">
                <span v-html="$t('If_you_are_facing_the')"></span><a href="javascrip:;" class="a_link" @click="openKfWindow()">{{$t("Contact_our_customer_service_personnel")}}</a>{{$t("Ban_the_use_of_account")}}
              </div>
            </div>
          </div>
          <div class="page_content" v-show="currentNavId === 5">
            <div class="page_section_main_title">{{$t("Friends_and_family")}}</div>
            <div class="page_content_section" v-html="$t('We_understand_the_quiz_questions')"></div>
            <div class="page_content_section" v-html="$t('The_spending_spree')"></div>
            <div class="page_content_section">
             <span v-html="$t('We_recommend_that_you_encourage')"></span><a href="javascrip:;" class="a_link" @click="openKfWindow()">{{$t("Contact_our_customer_service_team")}}</a>{{$t("To_discuss_this_problem")}}
            </div>
          </div>
          <div class="page_content" v-show="currentNavId === 6">
            <div class="page_section_main_title">{{$t("Protection_of_minors")}}</div>
            <div class="page_content_section">
              {{$t("People_under_the_age_of")}}<a href="javascrip:;" class="a_link" @click="openKfWindow()">{{$t("Contact_us")}}</a>{{$t("Report_the_matter")}}
            </div>
            <div class="page_content_section">
              <div class="page_section_title">{{$t("Intercept_site")}}</div>
              <div class="section_text">
                {{$t("You_can_use_a_series")}}<br/>
                1. Net Nanny（<a href="http://www.netnanny.com" class="a_link" target="_blank">www.netnanny.com</a>{{$t("general_interception_software")}}<br/>
                2. CYBERsitter（<a href="http://www.cybersitter.com" class="a_link" target="_blank">www.cybersitter.com</a>{{$t("filtering_software_allows")}}<br/>
                3. GamBlock（<a href="http://www.gamblock.com" class="a_link" target="_blank">www.gamblock.com</a>{{$t("dedicated_to_intercept")}}<br/>
                4. Betfilter（<a href="http://www.betfilter.com" class="a_link" target="_blank">www.betfilter.com</a>{{$t("dedicated_to_intercept")}}<br/>
                {{$t("You_may_also_want_to")}}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'responsible',
  components: {},
  computed: {
    kfUrl () {
      return this.$store.state.kfUrl
    }
  },
  data() {
     return {
       navList: [
         {
           id: 1,
           title:  this.$t("Our_commitment")
         },
         {
           id: 2,
           title:  this.$t("Account_limit")
         },
         {
           id: 3,
           title:  this.$t("Found_the_problem")
         },
         {
           id: 4,
           title:  this.$t("Temporary_dont_contest")
         },
         {
           id: 5,
           title:  this.$t("Friends_and_family")
         },
         {
           id: 6,
           title:  this.$t("Protection_of_minors")
         }
       ],
       currentNavId: 1
     }
  },
  methods: {
    handleNavSelect (x) {
      this.currentNavId = x
    }
  }
}
</script>
<style scoped>
  .page_nav{
    border-bottom: 1px solid #17191f;
    height: 70px;
    line-height: 70px;
    padding: 0 2px;
  }
 .page_nav .nav_box{
    width: 170px;
    text-align: center;
    font-size: 18px;
    color: #7c839f;
    margin: 0 18px;
   cursor: pointer;
  }
  .page_nav .nav_box.actived{
    color: #07f1b7;
    background: url("../../assets/icon_es.png") no-repeat;
    background-position: -569px -275px;
  }
  .content_wrapper .page_content{
    min-height: 460px;
  }
  .about_page.responsible .about_page_main .page_content .page_content_section{
    line-height: 26px;
  }
</style>
