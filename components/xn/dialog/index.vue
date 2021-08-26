<template>
  <el-dialog
    v-drag="drag"
    :title="title"
    :visible="show"
    :width="width"
    :before-close="beforeClose"
    :show-close="false"
    :append-to-body="appendToBody"
    :top="top"
    @open="$emit('on-open')"
    @opened="$emit('on-opened')"
  >
    <template #title>
      <span class="el-dialog__title">{{ title }}</span>
      <div class="el-dialog__headerbtn" @click="onClose">
        <span class="el-dialog__close el-icon el-icon-close close" />
      </div>
    </template>
    <slot />

    <span slot="footer">
      <slot name="footer">
        <el-button @click="onClose">取消</el-button>
        <el-button v-if="showConfirm" type="primary" @click="onConfirm">{{
          confirmText
        }}</el-button>
      </slot>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'XnDialog',
  props: {
    beforeClose: {
      type: Function,
      default: () => {}
    },
    top: {
      type: String,
      default: '15vh'
    },
    title: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '460px'
    },
    show: {
      type: Boolean,
      default: false
    },
    showConfirm: {
      type: Boolean,
      default: true
    },
    appendToBody: {
      type: Boolean,
      default: false
    },
    confirmText: {
      type: String,
      default: '确认'
    },
    drag: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: ''
    }
  },
  methods: {
    onClose() {
      this.beforeClose()
    },
    onConfirm() {
      this.$emit('on-confirm')
    }
  }
}
</script>

<style lang="scss" scoped>
.el-dialog__headerbtn:hover {
  .close {
    border-color: #ff745c;
  }
}
.close {
  border-radius: 4px;
}
</style>
