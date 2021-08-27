<template>
  <div>
    <el-table
      v-auto-height:maxHeight="authHeight"
      class="xn-table"
      :data="data"
      :border="border"
      :stripe="stripe"
      :hover="hover"
      :max-height="maxHeight"
      @selection-change="handleSelectionChange"
    >
      <slot>
        <el-table-column
          v-if="selection && data.length"
          width="50px"
          type="selection"
          :fixed="selectionFixed"
          :selectable="selectInit"
        />
        <el-table-column
          v-if="index && data.length"
          width="50px"
          label="No."
          type="index"
        />

        <el-table-column
          v-for="(item, idx) in columns"
          :key="idx"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :fixed="item.fixed"
          :sortable="item.sortable"
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
                  v-if="itemBtn.render"
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
                    >{{ itemBtn.label }}</el-button
                  >
                </template>
              </template>
            </template>
          </template>
        </el-table-column>
      </slot>
    </el-table>
    <xn-page
      :hidden="showPage"
      :total="pageQuery.total"
      :page.sync="pageQuery.pageNum"
      :limit.sync="pageQuery.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
export default {
  name: "XnTable",
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
      type: Boolean,
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
      default: false,
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
      default: "auto",
    },
    authHeight: {
      type: Number,
      default: -95,
    },
  },
  data() {
    return {
      maxHeight: 0,
    };
  },
  methods: {
    handleSelectionChange(value) {
      console.log(value);
    },
    // 处理是否可以选中
    selectInit(row, index) {
      return true;
    },
    // 点击按钮
    handleClick(method, row, idx) {
      console.log(method, row, idx);
    },
  },
};
</script>

<style lang="scss">
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
</style>
