<template>
  <el-dialog
    :visible="visible"
    custom-class="dialog-panel"
    width="740px"
    @close="close"
    :close-on-click-modal="false">
    <div class="dialog-main">
      <h1>百万奖池</h1>
      <small>流水大于 100 元，就有机会免费获得以下奖品，流水越大，获得更好奖品几率更高哦！</small>
      <el-carousel ref="sideRef" indicator-position="outside" :autoplay="false" arrow="always" trigger="click" :loop="false">
        <el-carousel-item v-for="(item, index) in prizeList" :key="index">
          <div class="swiper-list" :style="{'background-image': `url(${item.imgUrl})`, 'background-size': '100% auto'}"><p>{{ item.name }}</p></div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'dotati10PrizeModel',
  props: {
    visible: {
      type: Boolean,
      require: true,
      default: false
    },
    prizeList: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    visible (bool) {
      if (bool) {
        this.$nextTick(() => {
          this.$refs.sideRef.setActiveItem(0)
        })
      }
    }
  },
  methods: {
    close () {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="less" scoped>
@icon: url("../../../assets/active/dotati10/icon.png");

/deep/ .dialog-panel {
  height: 492px !important;

  .el-dialog__body {
    width: 100% !important;
    margin: 30px auto 0 !important;

    .dialog-main {
      text-align: center;
      small {
        text-align: center!important;
      }
    }
  }
}
/deep/ .el-carousel {
  margin-top: 30px;
  &__container {
    width: 260px;
    height: 260px;
    margin: 0 auto;
    .el-carousel__arrow {
      width: 30px;
      height: 60px;
      background: @icon;
      border-radius: 0;
    }
    .el-carousel__arrow--left {
      left: -70px;
      background-position: -40px -120px;
    }
    .el-carousel__arrow--right {
      right: -70px;
      background-position: -90px -120px;
    }
    .el-carousel__item {
      .swiper-list {
        width: inherit;
        height: inherit;
        position: relative;
        p {
          position: absolute;
          width: 100%;
          height: 40px;
          bottom: 0;
          left: 0;
          background: rgba(0,0,0,0.7);
          font-size: 14px;
          line-height: 40px;
          color: #f8e8b9;
          text-align: center;
        }
      }
      &.is-animating {
        transition: transform 0.2s ease-in-out, -webkit-transform 0.2s ease-in-out;
      }
    }
  }
  .el-carousel__indicators {
    margin-top: 20px;
    .el-carousel__indicator {
      padding: 0 6px;
      .el-carousel__button {
        width: 20px;
        height: 20px;
        background: @icon;
        background-position: -1227px -1083px;
        opacity: 1;
        transition: 0s;
      }
      &.is-active {
        .el-carousel__button {
          background-position: -1195px -1083px;
        }
      }
    }
  }
}
</style>
