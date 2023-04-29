<template>
 <div class="guide_section">
   <div class="section_s">
     <div class="section_title">什么是虚拟币</div>
     <p>虚拟币是一种不具备实体形式的、仅以数字形式存在的货币，也称之为“数字货币”。

     其性质与实体货币相似，允许在互联网上即时地、无地理限制地转让，主流的数字货币如USDT(泰达币)、BTC(比特币)、ETH(以太坊)等。

     用户可以通过数字货币交易平台购买数字货币，在平台进行支付、兑换成人民币从而进行游戏。</p>
     <router-link :to="{name:'guidevbdeal',params:{name:'okex'}}" class="color_07f1b7">点击查看如何交易虚拟币 >>>></router-link>
   </div>
    <div class="section_s">
       <div class="section_title">虚拟币有哪些优势</div>
       <p>
         ·高度加密<br>
         与银行卡等传统交易方式相比，玩家不需要给出自己的姓名或卡号即可完成虚拟币交易，避免敏感信息泄露。<br><br>
         ·交易快速<br>
         虚拟币所采用的区块链技术具有去中心化特点，不需要清算中心机构来处理数据，交易时间大大缩短。<br><br>
         ·去中心化<br>
         不由央行或当局发行，不受银行监管，玩家可随心所欲地使用存放在自己数字钱包里的资金。
       </p>
    </div>
    <div class="section_s">
       <div class="section_title">虚拟币币种推荐</div>
       <p>
        泰达币（Tether）也被称为USDT，其价值等同于美元。1 USDT≈1 美元，该特点使USDT成为全球加密数字货币中规模最大、流通性最高的稳定币，具有良好的保值性，也是网站所使用的主要币种。<br><br>

       泰达币（USDT）的主要优势为：安全、便捷，其具体表现在：<br>

       安全方面：价格稳定、流通性高、匿名交易；便捷方面：不受银行监管、24小时随时交易、全球交易无地域限制。</p>
    </div>
    <div class="section_s">
       <div class="section_title">虚拟币交易平台推荐</div>
       <p>
        <!-- ·火币<br>

         火币网是老牌虚拟币交易平台之一，以太坊、莱特币等上百种数字货币的交易及投资。
          <router-link :to="{name:'guidevbdeal',params:{name:'huobi'}}"   class="color_07f1b7">了解更多</router-link><br><br>-->

         ·欧易<br>

         欧易是全球著名的数字资产交易平台之一，主要面向全球用户提供比特币、莱特币、以太币等数字资产的币币和衍生品交易服务。
          <router-link :to="{name:'guidevbdeal',params:{name:'okex'}}"  class="color_07f1b7">了解更多</router-link><br><br>

         ·Gate.io<br>

         Gate.io 数字资产交易平台成立于2013年，在行业内深耕8年，多次登上全球行业内权威机构的真实交易量、透明数字资产、高投资回报率等排行榜单前十，是全球最值得信赖的数字货币交易所之一。
          <router-link :to="{name:'guidevbdeal',params:{name:'gate.io'}}" class="color_07f1b7">了解更多</router-link><br><br>

         <!-- ·满币<br>

         满币网提供安全、稳定、多语言与多币种的虚拟币交易服务。   <router-link to="" class="color_07f1b7">了解更多</router-link> -->
       </p>
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
</style>
