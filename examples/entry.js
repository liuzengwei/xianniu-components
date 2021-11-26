import Vue from 'vue';
import entry from './app';
import VueRouter from 'vue-router';
// 引入组件库，main 是别名，在 /build/config.js 中有配置
import Element from 'main/index.js';
import hljs from 'highlight.js';

// 路由配置
import routes from './route.config';

// 官网项目的一些组件
import demoBlock from './components/demo-block';

Vue.use(Element);
Vue.use(VueRouter);

Vue.component('demo-block', demoBlock);

const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes
});
router.afterEach(route => {
  // https://github.com/highlightjs/highlight.js/issues/909#issuecomment-131686186
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll('pre code:not(.hljs)');
    Array.prototype.forEach.call(blocks, hljs.highlightBlock);
  });
  const data = 'entryTitle';
  for (let val in data) {
    if (new RegExp('^' + val, 'g').test(route.name)) {
      document.title = data[val];
      return;
    }
  }
  document.title = 'Element';
  ga('send', 'event', 'PageView', route.name);
});

new Vue({ // eslint-disable-line
  ...entry,
  router
}).$mount('#app');
