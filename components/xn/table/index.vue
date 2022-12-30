<template>
  <div class="xn-table-box">
    <slot name="tools" />
    <el-table
      ref="table"
      class="xn-table"
      :class="{ 'disabled-all-selection': disabledAllSelection }"
      :data="data"
      :border="border"
      :stripe="stripe"
      :hover="hover"
      :row-key="rowKey"
      v-bind="$attrs"
      @selection-change="handleSelectionChange"
      @sort-change="handleSortChange"
    >
      <el-table-column
        v-if="selection && data.length"
        width="50px"
        type="selection"
        :fixed="selectionFixed"
        :reserve-selection="reserveSelection"
        :selectable="handleSelect"
      />
      <el-table-column
        v-if="index && data.length"
        width="50px"
        label="No."
        type="index"
      />
      <slot>
        <el-table-column
          v-for="(item, idx) in newColumns"
          :key="idx"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :fixed="item.fixed"
          :sortable="item.sortable"
          :align="item.align || 'center'"
          :show-overflow-tooltip="item.showOverflowTooltip!=undefined ? item.showOverflowTooltip : true"
          v-bind="item"
        >
          <template slot-scope="{ row, $index }">
            <expand-dom
              v-if="item.render"
              :column="item"
              :row="row"
              :render="item.render"
              :index="idx"
            />
            <span v-else>{{ row[item.prop] }}</span>
            <template v-if="item.more && item.more.options.length">
              <template v-for="(itemBtn, idxBtn) in item.more.options">
                <expand-dom
                  v-if="itemBtn.render && itemBtn.show&&itemBtn.show(row)"
                  :key="idxBtn"
                  :column="itemBtn"
                  :row="row"
                  :render="itemBtn.render"
                  :index="idxBtn"
                />
                <template v-else>
                  <el-button
                    v-if="itemBtn.show ? itemBtn.show(row) : true"
                    :key="idxBtn"
                    :disabled="itemBtn.disabled ? itemBtn.disabled(row) : false"
                    :type="itemBtn.type || 'text'"
                    :size="itemBtn.size || 'mini'"
                    :icon="itemBtn.icon"
                    :plain="itemBtn.plain"
                    @click="handleClick(itemBtn.methods, row, $index)"
                    >{{
                      typeof itemBtn.label === "function"
                        ? itemBtn.label(row)
                        : itemBtn.label
                    }}</el-button
                  >
                </template>
              </template>
            </template>
          </template>
        </el-table-column>
      </slot>
    </el-table>
    <xn-page
      :hidden="!showPage"
      :total="page.total"
      :page.sync="page.pageNum"
      :limit.sync="page.pageSize"
      v-bind="$attrs"
      @pagination="getList"
    />
  </div>
</template>

<script>
export default {
  name: "XnTable1",
  components: {
    expandDom: {
      functional: true,
      props: {
        row: Object,
        render: Function,
        index: Number,
        column: {
          type: Object,
          default: null,
        },
      },
      render: (h, ctx) => {
        const params = {
          row: ctx.props.row,
          index: ctx.props.index,
        };
        if (ctx.props.column) params.column = ctx.props.column;
        return ctx.props.render(h, params);
      },
    },
  },
  props: {
    getList: {
      type: Function,
      default: () => {},
    },
    index: {
      type: Boolean,
      default: true,
    },
    selection: {
      type: [Function, Boolean],
      default: false,
    },
    data: {
      type: Array,
      default: () => [],
    },
    selectionFixed: {
      type: [Boolean, String],
      default: false,
    },
    border: {
      type: Boolean,
      default: true,
    },
    stripe: {
      type: Boolean,
      default: true,
    },
    hover: {
      type: Boolean,
      default: true,
    },
    columns: {
      type: Array,
      require: true,
      default: () => [],
    },
    showPage: {
      type: [Boolean, String],
      default: true,
    },
    rowKey: {
      type: String,
      default: "",
    },
    max: {
      type: Number,
      default: 0,
    },
    reserveSelection: {
      type: Boolean,
      default: false,
    },
    page: {
      type: Object,
      default: () => {
        return {
          pageNum: 1,
          pageSize: 15,
          total: 0,
        };
      },
    },
    selectable: {
      type: [Object, Function],
      default: null,
    },
  },
  data() {
    return {
      maxHeight: 0,
      selectedList: [],
      disabledAll: false,
    };
  },
  computed: {
    disabledAllSelection() {
      return this.max > 0 || this.disabledAll;
    },
    newColumns() {
      return this.columns.filter((item) => {
        return typeof item.show === "function"
          ? item.show()
          : item.show === undefined || item.show === true;
      });
    },
  },
  methods: {
    handleSelectionChange(value) {
      this.selectedList = value;
      this.$emit("on-selection", value);
    },
    // 处理是否可以选中
    handleSelect(row, index) {
      if (this.selectable && typeof this.selectable === "function") {
        return this.selectable(row);
      } else {
        if (row.isDisabled) {
          return 0;
        } else {
          const check = this.selectedList.find((v) => {
            // eslint-disable-next-line eqeqeq
            return v.id == row.id;
          });
          if (!check && this.selectedList.length === this.max && this.max > 0) {
            return 0;
          } else {
            return 1;
          }
        }
      }
    },
    // 点击按钮
    handleClick(method, row, idx) {
      this.$emit("handle-buttons", { method, row, idx });
    },
    toggleRowSelection(row, status) {
      this.$refs.table.toggleRowSelection(row, status);
    },
    clearSelection() {
      this.$refs.table.clearSelection();
    },
    doLayout() {
      this.$refs.table.doLayout();
    },
    handleSortChange({ column, prop, order }) {
      this.$emit("on-sort-change", { column, prop, order });
    },
  },
};
</script>

<style lang="scss">
.xn-table-box {
  width: 100%;
}
.xn-table .el-table__body-wrapper::-webkit-scrollbar {
  width: 15px;
  height: 15px;
}

/*滚动条滑块*/
.xn-table .el-table__body-wrapper::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  // box-shadow: inset 0 0 5px #d8d8d8;
  background: #eee;
}

/*滚动条轨道*/
.xn-table .el-table__body-wrapper::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.5);
}
.xn-table.disabled-all-selection {
  .el-table__header-wrapper .el-checkbox {
    display: none;
  }
}
</style>
