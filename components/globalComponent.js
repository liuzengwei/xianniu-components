import Vue from 'vue' // 引入vue

/*
 * /^(?!.*(?:_|private|test.vue$)).*\.vue$/
 * 过滤不需要全局注册的组件
 * */
const requireComponent = require.context(
  '.',
  true,
  /^(?!.*(?:_|private|test.vue$)).*\.vue$/
)

function toHump(name) {
  // name.replace(/\_(\w)/g
  return name.replace(/_(\w)/g, function(all, letter) {
    return letter.toUpperCase()
  })
}
// console.log('requireComponent.keys():', requireComponent.keys()) // 打印
requireComponent.keys().forEach(fileName => {
  const config = requireComponent(fileName)
  const path = fileName.split('.')[1]

  // let s = 'text_'+path.slice(1).replace('/', '_')
  const rename = path.slice(1).replace('/', '_')

  const name = toHump(rename.replace('/index', ''))

  // console.log(name)
  Vue.component(name, config.default || config) // 动态注册该目录下的所有.vue文件
})
