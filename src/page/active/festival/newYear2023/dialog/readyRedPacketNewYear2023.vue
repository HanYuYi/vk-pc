<template>
  <el-dialog
      custom-class="ready-red-packet-new-year2023"
      :visible="visible"
      v-dir-center="visible"
      width="584px"
      :show-close="false"
      :append-to-body="true"
      :lock-scroll="true"
      @close="close"
      title=""
      :close-on-click-modal="false">

    <div class="num">
      <img :src="imgUri" alt="">
    </div>

  </el-dialog>
</template>

<script>
export default {
  name: 'readyRedPacketNewYear2023',
  props: ["visible"],
  data() {
    return {
      time: 3,
      timer: null,
      imgUri: null
    }
  },
  watch: {
    visible(bool) {
      if (bool) {
        this.time = 3
        this.countDown()
      }
    }
  },
  methods: {
    countDown() {
      this.imgUri = require(`../../../../../assets/active/newYear2023/ready_${this.time}.png`)
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        if (this.time > 1) {
          this.time--
          this.imgUri = require(`../../../../../assets/active/newYear2023/ready_${this.time}.png`)
        } else {
          this.close()
          clearInterval(this.timer)
          this.$emit("readyBack")
        }
      }, 1000)
    },
    close() {
      this.$emit("update:visible", false)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .ready-red-packet-new-year2023 {
  background-image: url("../../../../../assets/active/newYear2023/ready_red_bg.png");
  background-repeat: no-repeat;
  background-color: transparent;
  box-shadow: none;
  margin: 0 auto;
  height: 803px;

  .el-dialog__header {
    height: 0;
  }

  .el-dialog__body {
    padding: 0;
    height: inherit;
    position: relative;
    overflow: hidden;

    .num {
      background-image: url("../../../../../assets/active/newYear2023/ready_red_num_box.png");
      width: 174px;
      height: 174px;
      margin: 449px auto 0;
      text-align: center;
      line-height: 174px;
    }
  }
}
</style>
