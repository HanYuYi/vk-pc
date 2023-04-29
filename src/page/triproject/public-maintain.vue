<template>
  <div class="game-wrapper">

    <div class="wrapper">
    <!-- 维护提示组件-->
    <maintainpage :time="publicMaintainCompData.message"
                  :content="publicMaintainCompData.info" />
      </div>
  </div>
</template>

<script>
import maintainpage from "../../components/maintainpage"
import { mapState } from "vuex"

export default {
  name: "public-maintain",
  components: { maintainpage },
  computed: {
    ...mapState(["publicMaintainCompData"])
  }
}
</script>

<style lang="less" scoped>
.game-wrapper {
  padding-top: 80px;

  .wrapper {
    margin: 0 auto 20px;

    @media screen and (max-width: 1480px) {
      width: 1240px;
      height: 660px;
    }
    @media screen and (min-width: 1480px) {
      width: 1440px;
      height: 680px;
    }
    @media screen and (min-width: 1536px) {
      width: 1440px;
      height: 820px;
    }
  }
}
</style>
