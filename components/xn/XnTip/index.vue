<template>
  <div class="xn-tip" :class="[`xn-tip--${type}`]">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'XnTip',
  props: {
    type: {
      type: String,
      default: 'primary',
      validator: (val) => {
        return ['primary', 'warning', 'success', 'danger', 'info'].includes(
          val
        )
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "xianniu-elementui-theme/element-variables.scss";
$list: "primary", "danger", "warning", "info", "success";
$colorList: $--color-primary, $--color-danger, $--color-warning, $--color-info,
  $--color-success;
.xn-tip {
  padding: 12px;
  font-weight: 700;
  @each $c in $list {
    $i: index($list, $c);
    &.xn-tip--#{nth($list,$i)} {
      background: rgba(nth($colorList, $i), 0.1);
      // border-radius: 4px;
      border-left: 5px solid nth($colorList, $i);
    }
  }
}
</style>
