import XnTable from '../packages/XnTable/index.js'

const components = [
  XnTable
]

const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  XnTable
}
