import Vue from 'vue'
import entry from './app.vue'
import VueRouter from 'vue-router'
import Element from 'element-ui'
import 'xianniu-elementui-theme/element-variables.scss'
Vue.use(Element)
import '../index.js'
Vue.use(VueRouter)
const router = new VueRouter({
    mode: 'hash',
    base: __dirname,
    routes: [
        {
            path: '/',
            component:()=> import('./pages/home.vue'),
        }
    ]
})


new Vue({ // eslint-disable-line
    render: h => h(entry),
    router
}).$mount('#app')
