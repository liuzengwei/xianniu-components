<template>
  <div>
    <div>
      <side-nav :data="navsData" :base="`/component`" />
    </div>
    <div>
      <router-view class="content" />
    </div>
  </div>
</template>

<script>
import navsData from '../nav.config.json'
export default {
  data() {
    return {
      navsData
    }
  }
}
</script>

<style scoped>
.content{
    border: 1px solid red;
}
</style>
