<template>
  <div class="game_rule">
    <div v-html="rule" class="gamerule"></div>
  </div>
</template>
<script type="text/javascript">
  export default {
      components: {},
      data() {
          return {
            rule:''
          }
      },
      mounted () {
        this.getVkgameRule()
      },
      methods: {
        getVkgameRule() {
          this.$http(this.ApiSetting.newEgame.getVkgameRule)
          .then(res => {
            if(res.status == 1 && res.data) {
              this.rule = res.data.rule
            }
          })
        },
      },
  }
</script>
<style lang="less" scoped>
.gamerule {
  padding: 20px;
  color: #c3c3c3;
}
body {
  .gamerule {
    .title {
      width: 100%;
      line-height: 30px;
      color: #07f1b7;
      font-size: 14px;
      margin-top: 15px;
    }
    .count {
      margin-bottom: 10px;
    }
    .subtitle {
      margin-top: 10px;
    }
    .section {
      div,p {
         padding-left: 10px;
      }
      p {
        line-height: 26px;
      }
    }
  }
}

</style>
