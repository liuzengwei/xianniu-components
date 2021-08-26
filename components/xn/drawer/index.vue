<template>
  <el-drawer
    :title="title"
    :visible.sync="show"
    direction="rtl"
    :size="size"
    custom-class="drawer-body"
    :before-close="beforeClose"
    @open="$emit('on-open')"
    @opened="$emit('on-opened')"
  >
    <div class="drawer-content">
      <slot />
    </div>
    <div class="drawer-footer text-right">
      <slot name="footer">
        <el-button @click="onClose">关闭</el-button>
      </slot>
    </div>
  </el-drawer>
</template>

<script>
export default {
  name: 'XnDrawer',
  props: {
    show: Boolean,
    title: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: '70%'
    },
    beforeClose: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    onClose() {
      this.beforeClose()
    }
  }
}
</script>

<style scope lang="scss">
/* 解决弹出层双滚动条 */
.drawer-body {
  .el-drawer__body {
    overflow: hidden;
  }
}
</style>
