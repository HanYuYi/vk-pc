<template>
  <el-dialog
    :visible="visible"
    custom-class="dialog-panel"
    width="740px"
    @close="close"
    :close-on-click-modal="false">
    <div class="dialog-main">
      <h1>领取彩金</h1>
      <small>选择要转入的钱包</small>
      <ul class="wallet-wrapper">
        <li v-for="item in walletList" :key="item.id"
            :class="{active: item.code === platformType}"
            @click="platformType = item.code"
            :style="{'background-position': item.imgPosition}">
        </li>
      </ul>
      <button class="submit" @click="confirmAmountRowMethod">确认</button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'dotati10WalletModal',
  props: {
    visible: {
      type: Boolean,
      require: true,
      default: false
    }
  },
  data () {
    return {
      walletList: [
        {id: 0, name: '小艾电竞', imgPosition: '-783px -1208px', code: 'EG'},
        {id: 1, name: 'RG钱包', imgPosition: '-991px -1208px', code: 'RG'},
        {id: 2, name: 'TF钱包', imgPosition: '-783px -1315px', code: 'TF'},
        {id: 3, name: 'IM钱包', imgPosition: '-991px -1315px', code: 'IM'}
      ],
      platformType: ''
    }
  },
  mounted () {
    this.platformType = this.walletList[0].code
  },
  methods: {
    close () {
      this.$emit('update:visible', false)
    },
    confirmAmountRowMethod () {
      this.close()
      this.$emit('callbackWallet', this.platformType)
    }
  }
}
</script>

<style lang="less" scoped>
@icon: url("../../../assets/active/dotati10/icon.png");

.wallet-wrapper {
  width: 398px;
  li {
    display: inline-block;
    width: 169px;
    height: 68px;
    margin: 20px 0 0 20px;
    padding: 10px;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.3);
    line-height: 68px;
    color: #fff;
    cursor: pointer;
    border-radius: 6px;
    position: relative;
    background: @icon;
    &.active {
      &:before {
        display: block;
        content: "";
        box-sizing: border-box;
        position: absolute;
        top: -11px;
        left: -11px;
        width: 211px;
        height: 111px;
        background: @icon;
        background-position: -772px -1066px;
      }
    }
    &:nth-child(odd) {
      margin: 20px 0 0 0;
    }
  }
}
</style>
