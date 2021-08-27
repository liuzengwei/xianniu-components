<template>
  <el-form ref="form" inline :model="form" :label-width="labelWidth">
    <template v-for="(item, idx) in formData">
      <el-form-item
        v-if="item.type === 'input'"
        :key="idx"
        :label="item.label"
        :prop="item.prop"
      >
        <el-input
          v-model="form.value[idx].modelVal"
          :clearable="item.clearable || true"
          :placeholder="item.placeholder"
        />
      </el-form-item>
      <el-form-item
        v-if="item.type === 'select'"
        :key="idx"
        :label="item.label"
        :prop="item.prop"
      >
        <el-select
          v-model="form.value[idx].modelVal"
          :placeholder="item.placeholder"
          :clearable="item.clearable || true"
          filterable
        >
          <el-option
            v-for="(itemData, idxData) in item.data"
            :key="idxData"
            :label="itemData.label"
            :value="itemData.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="isDate(item.type)"
        :key="idx"
        :label="item.label"
        :prop="item.prop"
      >
        <xn-date
          v-model="form.value[idx].modelVal"
          :type="item.type || 'daterange'"
          :is-shortcut="showShortcut(item)"
          :placeholder="item.placeholder"
          :startPlaceholder="
            item.options && item.options.startPlaceholder
              ? item.options.startPlaceholder
              : ''
          "
          :endPlaceholder="
            item.options && item.options.endPlaceholder
              ? item.options.endPlaceholder
              : ''
          "
          :clearable="item.clearable || true"
          @on-change="onChangeDate"
          @on-format="onChangeDateFormat"
        />
      </el-form-item>
    </template>
    <el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="onSearch"
        >查询</el-button
      >
      <el-button @click="onReset">重置</el-button>
    </el-form-item>
    <div v-show="false" />
  </el-form>
</template>

<script>
export default {
  name: "XnSearch",
  props: {
    formData: {
      type: Array,
      default: () => [],
    },
    labelWidth: {
      type: String,
      default: "80px",
    },
  },
  computed: {
    isDate() {
      return (type) => {
        return [
          "date",
          "week",
          "month",
          "year",
          "dates",
          "datetime",
          "datetimerange",
          "daterange",
          "monthrange",
        ].includes(type);
      };
    },
    showShortcut() {
      return (item) => {
        let flag = "";
        if (item.type.indexOf("range") > -1) {
          flag = item.options.isShortcut;
        } else {
          flag = false;
        }

        return flag;
      };
    },
  },
  data() {
    return {
      form: {
        value: [],
      },
    };
  },
  created() {
    this.formData.forEach((item, index) => {
      this.form.value.push({
        key: item.prop,
        modelVal: "",
      });
    });
  },
  methods: {
    onSearch() {
      const formValue = {};
      if (this.formData) {
        this.formData.forEach((item, index) => {
          const key = item.prop;
          const value = this.form.value[index].modelVal;
          if (item.type === "date") {
            if (
              item.options &&
              item.options.start &&
              item.options &&
              item.options.end
            ) {
              formValue[item.options.start] = value[0] || "";
              formValue[item.options.end] = value[1] || "";
            }
          } else {
            console.log(formValue[key]);
            formValue[key] = value;
          }
        });
      }
      this.$emit("on-search", formValue);
    },
    onReset() {
      this.form.value = [];
      this.formData.forEach((item, index) => {
        this.form.value.push({
          key: item.prop,
          modelVal: "",
        });
      });
      this.$emit("on-reset");
      this.$emit("on-search", {});
    },
    onChangeDate(val) {
      // console.log(val);
    },
    onChangeDateFormat(val) {
      // console.log(val);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
