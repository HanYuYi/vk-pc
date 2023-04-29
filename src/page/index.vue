<template>
  <div :class="{'egame_header': $route.name=='newegame'}">
    <v-header></v-header>
    <div class="main">
      <!-- <keep-alive exclude="newegame,sponsorteam,coursedetail,userhome,vipsystem,vbmarket,jointly,ptgame,questionnaire"> -->
        <router-view></router-view>
      <!-- </keep-alive> -->
    </div>
    <v-footer></v-footer>

  </div>
</template>
<script type="text/javascript">
import header from '@/components/header'
import footer from '@/components/footer'
export default {
  name: 'index',
  components: {
    'v-header': header,
    'v-footer': footer
  },
  created () {
    /*  window.onstorage = (event) => {
        if (event.key === 'lang') {
          const messages = Object.assign(Locales[localStorage.lang], iview_i18n[localStorage.lang]);
          // 设置数据
          this.$i18n.setLocaleMessage(localStorage.lang, messages);
          // 切换语言
          this.$i18n.locale = localStorage.lang;
        }
      } */
  },
  mounted () {
    // this.startIntro()
  },
  methods: {
    //新手引导
    startIntro() {

      this.$intro().setOptions({
        steps:[
          {
            element: '#step1',
            intro: 'More features, more fun.',
            position: 'left'
          },
        ]
      })
      this.$intro().start()
    }
  }
}
</script>
<style lang="less" scoped>
  .main{padding-top:0;min-height: calc(100vh - 158px)}
  .egame_header .main.show_notice{padding-top:0;}
</style>

