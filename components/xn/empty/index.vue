<template>
  <div class="xn-empty">
    <div class="xn-empty__icon">
      <i :class="icon" />
    </div>
    <div class="xn-empty__text">
      <span><slot>{{ text }}</slot></span>
      <div class="more">
        <slot name="more" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'XnEmpty',
  props: {
    icon: {
      type: String,
      default: 'el-icon-box'
    },
    text: {
      type: String,
      default: '暂无数据'
    }
  }
}
</script>

<style lang="scss" scoped>
.xn-empty{
    color: rgba(0,0,0,.25);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 32px 0;
    &__icon{
        font-size:38px
    }
}
</style>
