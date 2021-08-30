<template>
  <el-date-picker
    :value="value"
    :type="type"
    align="right"
    :placeholder="placeholder"
    :start-placeholder="startPlaceholder"
    :end-placeholder="endPlaceholder"
    :picker-options="isShortcut ? pickerOptionsPlug : {}"
    :format="format ? format : _format.format"
    :value-format="valueFormat ? valueFormat : _format.valueFormat"
    :style="styles"
    :disabled="disabled"
    :readonly="readonly"
    :clearable="clearable"
    @input="onChange"
  />
</template>

<script>
export default {
  name: "XnDate",
  model: {
    prop: "value",
    event: "on-change",
  },
  props: {
    /**
     * 显示类型
     * https://element.eleme.cn/#/zh-CN/component/datetime-picker
     * year/month/date/week/ datetime/datetimerange/daterange
     */
    type: {
      type: String,
      default: "daterange",
    },
    placeholder: {
      type: String,
      default: "请选择",
    },
    value: {
      type: [String, Array],
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    // 显示的格式
    format: {
      type: String,
      default: "",
    },
    // 值的格式
    valueFormat: {
      type: String,
      default: "",
    },
    // 开启快捷选项
    isShortcut: {
      type: Boolean,
      default: false,
    },
    firstDayOfWeek: {
      type: Number,
      default: 1,
    },
    startPlaceholder: {
      type: String,
      default: "开始日期",
    },
    endPlaceholder: {
      type: String,
      default: "结束日期",
    },
  },
  data() {
    return {
      pickerOptionsPlug: {
        shortcuts: [
          {
            text: "昨天",
            onClick(picker) {
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", [start, start]);
            },
          },
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近六个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近十二个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 360);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
    };
  },
  computed: {
    styles() {
      const _isRange = this.isRange(this.type)
      return {
        width: _isRange ? "100%" : 'auto',
      };
    },
    _format() {
      const obj = {};
      switch (this.type) {
        case "date":
          obj.format = "yyyy-MM-dd";
          obj.valueFormat = "yyyy-MM-dd";
          break;
        case "week":
          obj.format = "yyyy 第 WW 周";
          obj.valueFormat = "yyyy-MM-dd";
          break;
        case "month":
          obj.format = "yyyy-MM";
          obj.valueFormat = "yyyy-MM";
          break;
        case "year":
          obj.format = "yyyy";
          obj.valueFormat = "yyyy";
          break;
        case "dates":
          obj.format = "yyyy-MM-dd";
          obj.valueFormat = "yyyy-MM-dd";
          break;
        case "datetime":
          obj.format = "yyyy-MM-dd HH:mm:ss";
          obj.valueFormat = "yyyy-MM-dd HH:mm:ss";
          break;
        case "datetimerange":
          obj.format = "yyyy-MM-dd HH:mm:ss";
          obj.valueFormat = "yyyy-MM-dd HH:mm:ss";
          break;
        case "daterange":
          obj.format = "yyyy-MM-dd";
          obj.valueFormat = "yyyy-MM-dd HH:mm:ss";
          break;
        case "monthrange":
          obj.format = "yyyy-MM";
          obj.valueFormat = "yyyy-MM";
          break;
      }
      return obj;
    },
  },
  isRange() {
    return (type) => {
      return ["datetimerange", "daterange", "monthrange"].includes(type);
    };
  },
  methods: {
    onChange(value) {
      if (
        this.type === "datetimerange" ||
        this.type === "daterange" ||
        this.type === "monthrange"
      ) {
        const start = value && value.length ? value[0] : "";
        const end = value && value.length ? value[1] : "";
        this.$emit("on-format", { value, start: start || "", end: end || "" });
      } else {
        this.$emit("on-format", { value });
      }
      this.$emit("on-change", value || "");
    },
  },
};
</script>

<style>
</style>
