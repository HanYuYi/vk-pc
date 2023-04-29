<template>
 <div class="guide_section">
    <div class="section_s">
       <div class="section_title">虚拟币充值余额</div>
       <p>步骤1/5: 进入个人中心，点击“主钱包-充值”，或点击“财务中心-充值”；</p>
       <div class="img_box">
         <img src="../../../assets/guide/vb/buzou1-1.jpg" alt="">
         <img src="../../../assets/guide/vb/buzou1-2.jpg" alt="">
       </div>

       <p>步骤2/5:  输入充值金额，选择充值线路，点击“立即充值”按钮；</p>
       <img src="../../../assets/guide/vb/buzou2.jpg" alt="">

       <p>步骤3/5:  请在转账剩余时间结束前完成转账；</p>
       <div class="img_box">
         <img src="../../../assets/guide/vb/buzou3-1.jpg" alt="">
         <img src="../../../assets/guide/vb/buzou3-2.jpg" alt="">
       </div>

       <p>步骤4/5:  复制支付链接后，在不同的虚拟币交易平台，进入后续支付流程：</p><br>
       <!-- <router-link :to="{name:'guidevbdeal',params:{name:'huobi',tabname:'usdtdeposit'}}" class="color_07f1b7">点击进入查看：火币交易平台 如何充值USDT到VK</router-link><br><br>-->
       <router-link :to="{name:'guidevbdeal',params:{name:'okex',tabname:'buyusdt'}}" class="color_07f1b7">点击进入查看：欧易交易平台 如何充值USDT到VK</router-link><br><br>
       <router-link :to="{name:'guidevbdeal',params:{name:'gate.io',tabname:'buyusdt'}}" class="color_07f1b7">点击进入查看：Gate.io交易平台 如何充值USDT到VK</router-link><br><br>
       <!-- <router-link to="/guide/16-3/huobi" class="color_07f1b7">点击进入查看：满币交易平台 如何充值USDT到VK</router-link><br><br> -->

       <p>步骤5/5: 本次充值完成，等待游戏账号余额增加即可，不同数币到账时间略有差别，如长时间未到账，请联系客服协助解决。</p>
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
