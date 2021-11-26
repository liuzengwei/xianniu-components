// 根据路由配置自动生成官网项目的路由
import navConfig from './nav.config.json'

const load = (name) => {
  return r => {
    require.ensure([], () => r(require(`./pages/${name}.vue`)))
  }
}

const loadDocs = (path) => {
  return r => require.ensure([], () =>
    r(require(`./docs${path}.md`)))
}

// 添加组件页的各个路由配置，以下这段代码要看懂必须明白 nav.config.json 文件的结构
const registerRoute = (navConfig) => {
  const route = []
  route.push({
    // 比如： /zh-CN/component
    path: '/component',
    redirect: '/component/installation',
    // 加载组件页的 component.vue
    component: load('component'),
    // 组件页的所有子路由，即各个组件，放这里，最后的路由就是 /zh-CN/component/comp-path
    children: []
  })
  navConfig.forEach((nav, index) => {
    // 指定语言的配置，比如 lang = zh-CN，navs 就是所有配置项都是中文写的
    // const navs = navConfig
    // 组件页面 lang 语言的路由配置
    if (nav.href) return
    if (nav.groups) {
      // 该项为组件
      nav.groups.forEach(group => {
        group.list.forEach(nav => {
          addRoute(nav, index)
        })
      })
    } else if (nav.children) {
      // 该项为开发指南
      nav.children.forEach(nav => {
        addRoute(nav, index)
      })
    } else {
      // 其它，比如更新日志、Element React、Element Angular
      addRoute(nav, index)
    }
    // 遍历指定语言的所有配置项
    // navs.forEach(nav => {

    // })
  })
  function addRoute(page, index) {
    // 根据 path 决定是加载 vue 文件还是加载 markdown 文件
    const component = page.path === '/changelog'
      ? load('changelog') : loadDocs(page.path)
    const child = {
      path: page.path.slice(1),
      meta: {
        title: page.title || page.name,
        description: page.description
      },
      name: 'component-' + (page.title || page.name),
      component: component.default || component
    }
    // 将子路由添加在上面的 children 中
    route[0].children.push(child)
  }
  return route
}

const route = registerRoute(navConfig)
console.log('route', route)
export default route
