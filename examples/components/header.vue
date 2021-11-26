<template>
  <div>
      <xn-table></xn-table>
    <ul>
      <li>
        <router-link
          active-class="active"
          :to="`/guide`"
        >{{ langConfig.guide }}
        </router-link>
      </li>
      <li>
        <router-link
          active-class="active"
          :to="`/component`"
        >{{ langConfig.components }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import compoLang from '../config/component.json'
export default {
  computed: {
    langConfig() {
      return compoLang.filter((item, idx) => idx === 0)[0]['header']
    }
  }
}
</script>

<style>
</style>
