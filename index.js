import Vue from 'vue'
import './components/globalComponent';
import * as directive from './directive'
Object.keys(directive).forEach(key => {
    Vue.directive(key, directive[key])
})
