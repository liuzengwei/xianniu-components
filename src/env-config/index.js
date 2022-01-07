// const nodeENV = process.env.NODE_ENV;
const VUE_APP_CURRENTMODE = process.env.VUE_APP_CURRENTMODE
const RECORD_MSG =
  '© 2018-2022 xianniu.cn 版权所有 ICP备案证书号:京ICP备18030884号-2' // 备案信息
let domain = {}

domain = require(`./${VUE_APP_CURRENTMODE}`)
module.exports = {
  recordMsg: RECORD_MSG,
  test_port: 12037,
  ...domain
}
