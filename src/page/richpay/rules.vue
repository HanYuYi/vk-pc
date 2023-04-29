<template>
  <el-dialog
    v-dir-center="show"
    :visible="show"
    custom-class="public_richpay_dialog"
    title="活动规则"
    :before-close="close">

    <div class="abs_panel richpay-page-rule">
      <ul>
        <li>本活动充值渠道判定方式为：以用户历史最后一笔的充值渠道来源为准；若用户在选择参与V富通转账红包前将存款从主钱包发起提款，则当日无法领取此优惠活动。</li>
        <li>V富通转账加码：将金额从V富通钱包转出时，即可选择 是否领取加码和存放额外加码：将金额从V富通钱包转出时，若满足存放时间要求，还可领取额外随机加码，最低转出金额≥100元，才能计算派发。</li>
        <li>双重加码%可叠加计算领取V富通转出红包，按照“虚拟币充值”渠道的存款时间，转入V富通→存放 6小时以上→ 再转出至主钱包，才能享受两种额外加码福利。</li>
        <li>此活动与虚拟币存送优惠活动共享，单日共享优惠额度累计上限最高为588元，用户在选择领取V富通转账红包优惠活动成功时，则需完成(转出金额+彩金) 1倍全站流水。例：会员当日在虚拟币存送优惠活动中累计领取了100元好运金，最后在V富通转账红包送优惠活动中只能领取488元。</li>
        <li>电竞赔率＜1.5、亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水；PT电子游戏中以下游戏不算有效流水：<activeptliushui color="#83f9fd" styleClass="richpay-ptgame_more_rule"></activeptliushui>。</li>
        <li>每位有效玩家、每一手机号码、电子邮箱、相同银行卡、每一个IP地址、每一台电脑者只能享受一次优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利。VKGAME对本活动保有最终解释权。</li>
      </ul>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'rules',
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      show: this.visible
    }
  },
  watch: {
    visible () {
      this.show = this.visible
    }
  },
  methods: {
    close () {
      this.show = false
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-dialog__body {
  height: 505px;

  .richpay-page-rule {
    top: 28px;
    left: 76px;
    width: 502px;

    ul {
      li {
        margin-top: 20px;
        font-size: 14px;
        list-style: decimal;
        line-height: 18px;
        color: #fff;
      }
    }
  }
}
</style>
<style lang="less">
.richpay-ptgame_more_rule {
  border: 1px solid #37fcff;
  .ptgame_more_rule {
    tr {
      th {
        color: #37fcff;
      }
    }
  }
  .popper__arrow {
    border-top-color: #37fcff !important;
  }
}
</style>
