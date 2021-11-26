
import Vue from 'vue'
import entry from './app'
import VueRouter from 'vue-router'
// 引入组件库，main 是别名，在 /build/config.js 中有配置
// import Element from 'main/index.js'
import XN from 'main/index.js'
import hljs from 'highlight.js'
// 路由配置
import routes from './route.config'

// 官网项目的一些组件
import header from './components/header'
import demoBlock from './components/demo-block'
import sideNav from './components/side-nav'

import './assets/styles/common.scss'

Vue.use(XN)
Vue.use(VueRouter)

Vue.component('demo-block', demoBlock)
Vue.component('main-header', header)
Vue.component('side-nav', sideNav)

const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes
})
router.afterEach(route => {
  // https://github.com/highlightjs/highlight.js/issues/909#issuecomment-131686186
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll('pre code:not(.hljs)')
    Array.prototype.forEach.call(blocks, hljs.highlightBlock)
  })
  const data = 'entryTitle'
  for (const val in data) {
    if (new RegExp('^' + val, 'g').test(route.name)) {
      document.title = data[val]
      return
    }
  }
  document.title = 'aaaaaaaaaaaa'
})

new Vue({ // eslint-disable-line
  ...entry,
  router
}).$mount('#app')
