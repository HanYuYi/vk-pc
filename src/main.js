// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import 'element-remove'
// App前引入element，防止打包后自定会议样式被覆盖失效
import { Message, MessageBox, Popover, Dialog, Pagination, Input, Form as ELForm, FormItem, Cascader } from 'element-ui'
import 'element-ui/lib/theme-chalk/form.css'
import 'element-ui/lib/theme-chalk/form-item.css'
import 'element-ui/lib/theme-chalk/input.css'
import 'element-ui/lib/theme-chalk/cascader.css'
import 'element-ui/lib/theme-chalk/scrollbar.css'
import 'animate.css'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import VueI18n from 'vue-i18n'
import Locales from './locale'
import iview_i18n from '@/utils/iview_i18n'
import storage from '@/utils/storage'
import $http from '@/common/http'
import ApiSetting from '@/common/serviceModule'
import VueClipboard from 'vue-clipboard2'
import 'vue-happy-scroll/docs/happy-scroll.css'
import VueLazyload from 'vue-lazyload'
import browserDetect from 'vue-browser-detect-plugin'
import directives from './directives'
import activeptliushui from '@/components/activeptliushui'
// import 'video.js/dist/video-js.css'
/* 自走棋新手引导使用 */
// import VueIntro from 'vue-introjs';
// import 'intro.js/introjs.css';
// Vue.use(VueIntro);
import { RecycleScroller} from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
Vue.component('RecycleScroller', RecycleScroller)
Vue.component('activeptliushui', activeptliushui)
directives(Vue)
Vue.component('activeptliushui', activeptliushui)
Vue.use(browserDetect)
Vue.use(VueLazyload)

Vue.use(Dialog)
Vue.use(Pagination)
Vue.use(Popover)
Vue.use(VueI18n)
Vue.use(VueClipboard)
Vue.use(Input)
Vue.use(ELForm)
Vue.use(FormItem)
Vue.use(Cascader)
Vue.prototype.$http = $http
Vue.prototype.ApiSetting = ApiSetting
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = function (opt) {
  Message({
    // dangerouslyUseHTMLString:opt.dangerouslyUseHTMLString?opt.dangerouslyUseHTMLString:false,
    type: opt.type,
    message: opt.message,
    duration: opt.duration ? opt.duration : 2000
  })
}

Vue.config.lang = storage.get.lang || navigator.language || 'zh-CN'
Vue.config.productionTip = false
if (!iview_i18n[Vue.config.lang] || !Locales[Vue.config.lang]) {
  Vue.config.lang = 'zh-CN'
}
let messages = {}
messages[Vue.config.lang] = Object.assign(Locales[Vue.config.lang], iview_i18n[Vue.config.lang])

const i18n = new VueI18n({
  locale: Vue.config.lang,
  messages
})

Vue.use(iView, {
  // iview组件国际化
  i18n (path, options) {
    let value = i18n.t(path, options)
    if (value !== null && value !== undefined) return value
    return ''
  }
})

/**
 * 打开客服弹窗
 * @param isProxy   是否打开代理客服
 * @param urlIndex  普通用户客服线路索引
 */
Vue.prototype.openKfWindow = function (isProxy = false, index = 0, immediately = false) {
  let kf_url = ''
  if (isProxy) {
    kf_url = store.state.kf_proxy_Url
    window.open(kf_url, 'chatwindow', 'height=666,width=600')
  } else {
    if (immediately) {
      kf_url = store.state.kfUrlByList
    } else {
      kf_url = store.state.kfUrl
    }
    window.open(immediately ? kf_url[index].link : kf_url, 'chatwindow', 'height=666,width=600')
  }
}

router.afterEach(function (to) {
  // if (window.ga) {
  //   window.ga('set', 'page', to.fullPath) // 你可能想根据请求参数添加其他参数，可以修改这里的 to.fullPath
  //   window.ga('send', 'pageview')
  // }
  if (window.dataLayer) {
    function gtag () { dataLayer.push(arguments) }
    gtag('config', 'G-94KSF19R4W', {'page_path': to.fullPath})
  }
})
// 定义中央事件总线
const EventBus = new Vue()
Vue.prototype.EventBus = EventBus
/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App),
  created () {
  },
  methods: {

  }
})
