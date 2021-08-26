<template>
  <div class="flex align-items-center" style="width:100%">
    <el-select
      v-loadmore="onLoad"
      :value="value"
      :placeholder="placeholder"
      clearable
      filterable
      :allow-create="allowCreate"
      :remote="remote"
      :reserve-keyword="reserveKeyword"
      :remote-method="handleRemote"
      :value-key="valueKey"
      :disabled="disabled"
      @focus="onFocus"
      @change="onChange"
    >
      <el-option
        v-for="(item,idx) in list"
        :key="idx"
        :label="item[propsConfig.label]"
        :value="valueKey ? item : item[propsConfig.value]"
      />
    </el-select>
    <div v-if="$slots.append" slot="append" />
  </div>
</template>

<script>
export default {
  name: 'XnSelect',
  model: {
    prop: 'val',
    event: 'on-change'
  },
  props: {
    val: {
      type: [String, Number, Object],
      default: () => ''
    },
    allowCreate: {
      type: Boolean,
      default: false
    },
    disabled: Boolean,
    valueKey: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    remote: Boolean,
    reserveKeyword: Boolean,
    propsConfig: {
      type: Object,
      default: () => {
        return {
          value: 'value',
          label: 'label'
        }
      }
    },
    list: {
      type: Array,
      default: () => []
    },
    page: {
      type: Object,
      default: () => {
        return {
          pageNum: 1,
          pageSize: 10,
          total: 0
        }
      }
    }
  },
  data() {
    return {
      value: ''
    }
  },
  watch: {
    val: {
      handler(n) {
        this.value = n
      },
      immediate: true
    }
  },
  methods: {
    onLoad() {
      if (this.list.length < this.page.total) {
        this.page.pageNum++
        this.$emit('on-load', this.page.pageNum)
      }
    },
    onFocus() {
      this.$emit('on-focus')
    },
    onChange(val) {
      this.$emit('on-change', val)
    },
    handleRemote(query) {
      this.$emit('on-search', query)
    }
  }
}
</script>

<style>

</style>
