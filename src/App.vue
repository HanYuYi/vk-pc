<template>
  <div id="app">
    <router-view></router-view>
    <!--登录后展示弹窗，王者归来/问卷调查/今日热点任意一个，一天只弹一次-->
    <hotspot-dialog></hotspot-dialog>
  </div>
</template>

<script>
//import { setCookie, getCookie, mobileCheck } from './utils/util'
import hotspotDialog from './components/hotspot-dialog'
export default {
  name: 'App',
  components: { hotspotDialog },
  computed: {
    wapUrl () {
      return this.$store.state.wapUrl
    }
  },
  mounted () {
    // 组件开始挂载时获取用户信息
    this.$store.dispatch('getUserInfo', {hideMsg: true})
  },
  methods: {
  },
  beforeCreate () {
    /* let flag = getCookie("backweb") ? true : false
    let backwebFlag = false
    if(document.location.pathname == "/"){
      if(document.location.search.indexOf("?") > -1 && document.location.search.split("?")[1] == 'backweb')
      {
        backwebFlag = true
      }
    }
    if(mobileCheck()){
      if(!flag){
        if(backwebFlag){
          setCookie("backweb", 1)
        }else{
          if(this.wapUrl){
            window.location.href = this.wapUrl
          }else {
            this.$http(this.ApiSetting.index.getKfUrl)
              .then((res) => {
                if(res.status === 1){
                  this.$store.commit('setKFUrl', res.data.cs_link)
                  this.$store.commit('setWapUrl', res.data.wap_api_link)
                  window.location.href = res.data.wap_api_link
                }
              })
          }
        }
      }
    } */
  },
  created () {
    let indexLoading = document.getElementById('index_loader')
    if (indexLoading != null) {
      document.body.removeChild(indexLoading)
    }
    if (!this.wapUrl) {
      this.$store.dispatch('getKfUrl', {hideMsg: true})
    }
  }
}
</script>

<style lang="less">
  @import './less/reset.less';
  @import './less/common.less';
  @import './less/iview.less';
  @import './less/element.less';
</style>
