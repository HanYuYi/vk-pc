<template>
  <el-dialog
    :visible.sync="visible"
    v-backdrop
    :modal="false"
    custom-class="leave-register-tip dialog_2022"
    width="437px"
    title="完成注册可享受以下优惠"
    :close-on-click-modal="false"
    :append-to-body="true"
    :close-on-press-escape="false"
    :destroy-on-close="true"
    :before-close="close">

    <div class="top">
      <div class="desc" v-html="loginModelData.register_finish_tips"></div>
      <div class="btns">
        <button class="button_plain_2022"
                @click="$router.push({path: '/'})">
          忍痛放弃
        </button>
        <button class="button_primary_2022"
                @click="close">
          继续注册
        </button>
      </div>
    </div>

    <div class="bottom">
      <div class="tnc"></div>
      <div class="dawnbattle"></div>
    </div>

  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'leaveRegisterTip',
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapState(['loginModelData'])
  },
  methods: {
    close() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .leave-register-tip {
  position: relative;
  overflow: visible;
  .el-dialog__body {
    .top {
      .desc {
        margin: -20px 50px 27px;
        p {
          text-align: left;
          margin-top: 8px;
          font-size: 16px;
          line-height: 20px;
        }
      }
      .btns {
        display: flex;
        justify-content: space-between;
        margin: 0 50px;
        button {
          font-size: 16px;
          font-weight: normal;
          width: 164px;
          height: 48px;
          &.button_primary_2022 {
            line-height: 48px;
          }
        }
      }
    }
    .bottom {
      position: absolute;
      width: 287px;
      height: 89px;
      background-image: url("../../assets/login/leave_bottom_bg.png");
      left: 0;
      bottom: -99px;
      display: flex;
      justify-content: space-between;
      padding: 0 75px;
      * {
        margin-top: 21px;
      }
      .tnc {
        width: 129px;
        height: 50px;
        background-image: url("../../assets/login/leava_tnc.png");
      }
      .dawnbattle {
        width: 117px;
        height: 50px;
        background-image: url("../../assets/login/leave_dawnbattle.png");
      }
    }
  }
}
</style>
