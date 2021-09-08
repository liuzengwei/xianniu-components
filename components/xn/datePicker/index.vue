<template>
  <div class="date-picker">
    <el-date-picker
      v-model="search[fieldName]"
      :type="type"
      :format="format"
      :disabled="disabled"
      :value-format="valueFormat"
      :clearable="clearable"
      :picker-options="pickerOptions"
      :default-time="'00:00:00'"
      @change="handle"
      placeholder="请选择日期"
    />
  </div>
</template>

<script>
export default {
  name: 'DatePicker',
  props: {
    type: {
      type: String,
      required: false,
      default: () => 'date'
    },
    gtToday: {
      type: Boolean,
      required: false,
      default: () => false
    },
    /* 搜索参数值{} */
    search: {
      type: Object,
      required: true,
      default: () => {}
    },
    /* 清除日期 */
    clearable: {
      type: Boolean,
      required: false,
      default: () => true
    },
    /* 字段名称绑定默认为createDate,字符串类型值;非必传参数 */
    fieldName: {
      type: String,
      required: false,
      default: () => 'createDate'
    },
    /* 日期格式 */
    format: {
      type: String,
      required: false,
      default: () => 'yyyy-MM-dd'
    },
    valueFormat: {
      type: String,
      required: false,
      default: () => 'yyyy-MM-dd HH:mm:ss'
    },
    disabled: {
      type: Boolean,
      required: false,
      default: () => false
    },
    /* 默认是选择今天及今天以前数据 */
    isHistory: {
      type: Boolean,
      required: false,
      default: () => true
    }
  },
  data() {
    const history = this.isHistory
    const gtToday = this.gtToday
    return {
      pickerOptions: {
        disabledDate(time) {
          // return time.getTime() > Date.now() + 8.64e7;
          /* 今日结束日期 */
          if (history) {
            const yesterdayFinish =
              new Date(
                new Date(
                  new Date().setDate(new Date().getDate() - 1)
                ).toLocaleDateString()
              ).getTime() +
              24 * 60 * 60 * 1000 -
              1 +
              8.64e7
            return time.getTime() > yesterdayFinish
          }
          /* 选择今天及未来的日期 */
          const gtTime = gtToday ? 0 : 24 * 60 * 60 * 1000
          return time.getTime() < Date.now() - gtTime
        }
      }
    }
  },
  methods: {
      handle() {
          if(this.isHistory){
              return
          }
       let startAt = new Date(this.search[this.fieldName]) * 1000 /1000;
        if(startAt < Date.now()) {
            this.search[this.fieldName] = new Date();
        }
      }
  },
}
</script>

<style scoped>
.date-picker >>> .el-date-editor {
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
}

.date-picker {
  line-height: 40px;
  height: 40px;
  box-sizing: border-box;
}
</style>
