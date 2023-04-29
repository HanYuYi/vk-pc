<template>
 <div class="guide_section">
    <div class="section_s">
       <div class="section_title">如何绑定虚拟币</div>
       <p>使用交易平台的充币地址，绑定虚拟币账户后，即可将平台余额提现到虚拟币账户中。</p>
       <p>步骤1/5: 根据不同的虚拟币交易平台，进入不同的账户开设流程，获取虚拟币充币地址：</p>
       <!-- <router-link :to="{name:'guidevbdeal',params:{name:'huobi',tabname:'biurl'}}" class="color_07f1b7">点击进入查看：火币交易平台 如何获取充币地址</router-link><br><br>-->
       <router-link :to="{name:'guidevbdeal',params:{name:'okex',tabname:'biurl'}}" class="color_07f1b7">点击进入查看：欧易交易平台 如何获取充币地址</router-link><br><br>
       <router-link :to="{name:'guidevbdeal',params:{name:'gate.io',tabname:'biurl'}}" class="color_07f1b7">点击进入查看：Gate.io交易平台 如何获取充币地址</router-link><br><br>
       <p>步骤2/5: 进入个人中心，点击“个人设置-虚拟币管理”；</p>
         <img src="../../../assets/guide/vb/bind/step2.png" alt="">

       <p>步骤3/5: 点击添加虚拟币；</p>
       <img src="../../../assets/guide/vb/bind/step3.png" alt="">

       <p>步骤4/5: 输入当前账号的手机号码进行安全验证；</p>
         <img src="../../../assets/guide/vb/bind/step4.png" alt="">
       <p>步骤5/5: 在已开通账户的虚拟币交易平台，复制需要交易的支付链接，然后在以下界面，正确选择币种，并粘贴支付链接到输入框，点击保存。绑定完成后，即可向该虚拟币账户提现。</p><br>
       <img src="../../../assets/guide/vb/bind/step5.png" alt="">
    </div>
 </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  mounted() {}
};
</script>

<style scoped lang="less">
img {
  max-width:100%;
}
</style>
