<template>
  <el-col :span="computedSpan" class="desc-item">
    <div class="desc-item-content" :class="size">
      <label
        class="desc-item-label"
        :style="{ width: labelWidth }"
        v-html="label"
      />
      <div v-if="$slots" class="desc-item-value">
        <slot v-if="!isTrue" />
        <span v-else>-</span>
      </div>
    </div>
  </el-col>
</template>

<script>
export default {
  name: "XnDescriptionItem",
  inject: ["labelWidth", "column", "size"],
  props: {
    span: {
      type: [Number, String],
      required: false,
      default: 0,
    },
    label: {
      type: String,
      required: false,
      default: "",
    },
  },
  data() {
    return {
      // 子组件自己的span
      selfSpan: 0,
    };
  },
  computed: {
    isTrue(){
      return JSON.stringify(this.$slots) === '{}'
    },
    computedSpan() {
      // 子组件自己的span，用于父组件计算修改span
      if (this.selfSpan) {
        return (24 / this.column) * this.selfSpan;
      } else if (this.span) {
        // props传递的span
        return (24 / this.column) * this.span;
      } else {
        // 未传递span时，取column
        return 24 / this.column;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.desc-item {
  //   margin-bottom: 20px;
  margin: 10px 0;
  .desc-item-content {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    line-height: 1.5;
    width: 100%;
    height: 100%;
    .desc-item-label {
      text-align: right;
      display: inline-block;
      flex-grow: 0;
      flex-shrink: 0;
      color: #606266;
      font-weight: 400;
      font-size: 14px;
      line-height: 1.5;
      height: 100%;
      display: flex;
      font-weight: 600;
      justify-content: flex-end;
      align-items: flex-start;
    }
    .desc-item-value {
      flex-grow: 1;
      overflow: hidden;
      word-break: break-all;
      height: 100%;
      display: flex;
      align-items: flex-start;
      color: #444;
      padding: 0 0 0 10px;
      span {
        color: #aaa;
      }
    }
    &.small {
      .desc-item-label,
      .desc-item-value {
        padding: 10px 14px;
      }
    }
  }
}
</style>
