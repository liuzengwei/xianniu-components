import XnTable from './main.vue'
console.log(XnTable.name)
/* istanbul ignore next */
XnTable.install = function(Vue) {
  Vue.component(XnTable.name, XnTable)
}

export default XnTable
