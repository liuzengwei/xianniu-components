<template>
  <div class="desc" :class="{ 'desc-border': border }">
    <div
      v-if="title || $slots.more"
      class="desc-header flex justify-content-between align-items-center"
    >
      <h1 v-if="title" class="desc-title" v-html="title" />
      <div class="more" v-if="$slots.more">
        <slot name="more"></slot>
      </div>
    </div>
    <slot name="title" />
    <el-row class="desc-row" :style="bodyStyle">
      <slot />
    </el-row>
  </div>
</template>

<script>
export default {
  name: "XnDescription",
  provide() {
    return {
      labelWidth: this.labelWidth,
      column: this.column,
      size: this.size,
      middle: this.middle,
    };
  },
  props: {
    // // 数据源，监听数据重绘
    // 标题
    title: {
      type: String,
      default: "",
    },
    border: Boolean,
    // 边距
    // margin: {
    //   type: String,
    //   default: "0",
    // },
    // label宽度
    labelWidth: {
      type: String,
      default: "80px",
    },
    column: {
      // 每行显示的项目个数
      type: [Number, String],
      default: 3,
    },
    size: {
      // 大小
      type: String,
      default: "",
    },
    bodyStyle: {
      type: Object,
      default: () => {
        return {
          padding: "20px",
        };
      },
    },
    middle: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    // data: {
    //   handler() {
    //     this.$nextTick(() => {
    //       // 筛选出子组件e-desc-item
    //       const dataSource = this.$slots.default;
    //       const dataList = [];
    //       dataSource.forEach((item) => {
    //         if (
    //           item.componentOptions &&
    //           item.componentOptions.tag === "xn-description-item"
    //         ) {
    //           dataList.push(item.componentInstance);
    //         }
    //       });
    //       // 剩余span
    //       let leftSpan = this.column;
    //       const len = dataList.length;
    //       dataList.forEach((item, index) => {
    //         // 处理column与span之间的关系
    //         // 剩余的列数小于设置的span数
    //         const hasLeft = leftSpan <= (item.span || 1);
    //         // 当前列的下一列大于了剩余span
    //         const nextColumnSpan =
    //           index < len - 1 && dataList[index + 1].span >= leftSpan;
    //         // 是最后一行的最后一列
    //         const isLast = index === len - 1;
    //         if (hasLeft || nextColumnSpan || isLast) {
    //           // 满足以上条件，需要自动补全span，避免最后一列出现残缺的情况
    //           item.selfSpan = leftSpan;
    //           leftSpan = this.column;
    //         } else {
    //           leftSpan -= item.span || 1;
    //         }
    //       });
    //     });
    //   },
    //   deep: true,
    //   immediate: true,
    // },
  },
};
</script>

<style scoped lang="scss">
.desc + .desc {
  margin-top: 20px;
}
.desc {
  width: 100%;
  &-header {
    padding: 10px 20px;
    display: flex;
    border-bottom: 1px solid #e8eaec;
  }
  &.desc-border {
    border: 1px solid #e6ebf5;
    border-radius: 4px;
  }
  background-color: #fff;

  .desc-title {
    margin: 0;
    color: #ff745c;
    font-weight: 700;
    font-size: 15px;
    line-height: 1.5715;
  }
  .desc-row {
    display: flex;
    flex-wrap: wrap;
    border-radius: 2px;
    width: 100%;
    & > :not([class*="desc-item"]) {
      width: 100%;
    }
  }
}
</style>
