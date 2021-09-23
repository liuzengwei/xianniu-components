import Vue from 'vue'

import XnTable from './XnTable/index'
import XnUpload from './XnUpload/index'
import XnEmpty from './XnEmpty/index'
import XnCity from './XnCity/index'
import XnSearch from './XnSearch/index'
import XnDate from './XnDate/index'
import XnTip from './XnTip/index'
import XnPage from './Pagination/index'
import XnDialog from './XnDialog/index'
import XnExport from './XnExport/index'
import XnTree from './XnTree/index'
const components = {
    XnTable,
    XnUpload,
    XnEmpty,
    XnCity,
    XnSearch,
    XnDate,
    XnPage,
    XnDialog,
    XnTip,
    XnExport,
    XnTree
};

Object.keys(components).forEach(name => {
    Vue.component(name, components[name]);
});

export default components;