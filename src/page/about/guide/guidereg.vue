<template>
  <div class="guide_section reg">
    <div class="section_s">
      <div class="section_title">
        {{$t("Account_registration_process")}}
      </div>
      <div class="section_s_c">
        <div class="section_desc">
          {{$t("Enter_VKGAME_website_vkgam")}}
        </div>
        <div class="img_box">
          <img src="../../../assets/guide/image3.jpg" alt="">
        </div>
      </div>
    </div>
    <div class="section_s">
      <div class="section_title">用户有三种方式注册账号</div>
      <div class="section_s_c">
        <p class="section_desc">
          1.用户名密码注册方式：<br>用户名 - 用来登入帐户，必须6-12位小写字母数字；<br>密码 - 有大小写之分，必须6-20位大小写字母数字或下划线；
        </p>
        <div class="img_box">
          <img src="../../../assets/guide/image4.jpg" alt="">
        </div>
      </div>

      <div class="section_s_c">
        <p>
          2.手机号码注册方式：<br>默认选择【中国大陆+86，非大陆地址注册点击+86后的△键点击下拉框选择您所在地区】，发送验证码【账户注册成功则默认为账户绑定此手机号】；<br>验证码 - 输入验证码点击【立即注册】即可注册成功，如验证码一直没有收到，请联系【在线客服】查询；<br>邀请码 - 如无邀请者则无需填写邀请码；
        </p>
        <div class="img_box">
          <img src="../../../assets/guide/image5.jpg" alt="">
        </div>
      </div>

      <div class="section_s_c">
        <p>
          3.极速注册：<br>无需输入账号、密码、手机号，只需验证成功即可快速注册账号；
        </p>
        <div class="img_box">
          <img src="../../../assets/guide/rigister_fast.jpg" alt="">
        </div>
      </div>
    </div>
    <div class="section_notice" v-html="$t('Note_the_user_registration_process')"></div>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'guidereg',
  components: {},
  data() {
      return {}
  },
  methods: {}
}
</script>
<style>

</style>
