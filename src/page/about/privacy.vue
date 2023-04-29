<template>
  <div class="privacy about_page inner_page">
    <div class="wrapper">
      <h3 class="about_title">{{$t("Privacy_policy")}}</h3>
      <div class="about_page_main">
        <div class="page_main_title">{{$t("VKGAME_privacy_policy")}}</div>
        <div class="page_content">
          <div class="page_content_section">
            <div class="section_text">
              {{$t("To_save_the_customer_information")}}
            </div>
          </div>
          <div class="page_content_section">
            <div class="page_section_title">{{$t("Information_collection_and_use")}}</div>
            <div class="section_text" v-html="$t('When_the_customer_to_open')"></div>
          </div>
          <div class="page_content_section">
            <div class="page_section_title">{{$t("Trading_account")}}</div>
            <div class="section_text">
              {{$t("To_identify_the_customers_interest")}}
            </div>
          </div>
          <div class="page_content_section">
            <div class="page_section_title">{{$t("Preferential_information_transfer")}}</div>
            <div class="section_text">
              {{$t("The_registration_account_customers_can")}}
            </div>
          </div>
          <div class="page_content_section">
            <div class="page_section_title">{{$t("Change_your_personal_information")}}</div>
            <div class="section_text">
              {{$t("The_customer_may_at_any")}}
            </div>
          </div>
          <div class="page_content_section">
            <div class="page_section_title">{{$t("The_safety_and_accuracy_of")}}</div>
            <div class="section_text" v-html="$t('We_promised_to_properly')"></div>
          </div>
          <div class="page_content_section">
            <div class="page_section_title">{{$t("The_phone")}}</div>
            <div class="section_text">
              {{$t("For_staff_training_and_safety")}}
            </div>
          </div>
          <div class="page_content_section">
            <div class="page_section_title">{{$t("Small_text_files_Cookies")}}</div>
            <div class="section_text" v-html="$t('After_customers_to_use')"></div>
          </div>
          <div class="page_content_section">
            <div class="page_section_title">{{$t("Website_information")}}</div>
            <div class="section_text">
              {{$t("Our_system_will_automatically_record")}}
            </div>
          </div>
          <div class="page_content_section">
            <div class="page_section_title">{{$t("Advertising_system")}}</div>
            <div class="section_text">
              {{$t("Our_advertising_system_will_automatically")}}
            </div>
          </div>
          <div class="page_content_section">
            <div class="page_section_title">{{$t("Mosaic_gold")}}</div>
            <div class="section_text">
              {{$t("We_will_strictly_confidential_customer")}}
            </div>
          </div>
          <div class="page_content_section">
            <div class="page_section_title">{{$t("security")}}</div>
            <div class="section_text">
              {{$t("VKGAME_to_ensure_that_customers")}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'privacy',
  components: {},
  data() {
      return {}
  },
  methods: {}
}
</script>
<style>

</style>
