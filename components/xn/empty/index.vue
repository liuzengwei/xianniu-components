<template>
  <div class="xn-empty">
    <el-empty :image-size="size" :description="desc" :image="image"></el-empty>
  </div>
</template>

<script>
export default {
  name: "XnEmpty",
  props: {
    size: {
      type: Number,
      default: 80,
    },
    image: {
      type: String,
      default: "el-icon-box",
    },
    desc: {
      type: String,
      default: "暂无数据",
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
