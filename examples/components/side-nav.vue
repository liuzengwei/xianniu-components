
<template>
  <div
    class="side-nav"
    :class="{ 'is-fade': isFade }"
    :style="navStyle"
    @mouseenter="isFade = false"
  >
    <ul>
      <li v-for="(item, key) in data" :key="key" class="nav-item">
        <a v-if="!item.path && !item.href" @click="expandMenu">{{
          item.name
        }}</a>
        <a v-if="item.href" :href="item.href" target="_blank">{{
          item.name
        }}</a>
        <router-link
          v-if="item.path"
          active-class="active"
          :to="base + item.path"
          exact
          v-text="item.title || item.name"
        />
        <ul v-if="item.children" class="pure-menu-list sub-nav">
          <li
            v-for="(navItem, key1) in item.children"
            :key="key1"
            class="nav-item"
          >
            <router-link
              class=""
              active-class="active"
              :to="base + navItem.path"
              exact
              v-text="navItem.title || navItem.name"
            />
          </li>
        </ul>
        <template v-if="item.groups">
          <div v-for="(group, key2) in item.groups" :key="key2" class="nav-group">
            <div class="nav-group__title" @click="expandMenu">
              {{ group.groupName }}
            </div>
            <ul class="pure-menu-list">
              <li
                v-for="(navItem, key3) in group.list"
                v-show="!navItem.disabled"
                :key="key3"
                class="nav-item"
              >
                <router-link
                  active-class="active"
                  :to="base + navItem.path"
                  exact
                  v-text="navItem.title"
                />
              </li>
            </ul>
          </div>
        </template>
      </li>
    </ul>
    <!--<div id="code-sponsor-widget"></div>-->
  </div>
</template>

<script>
/* eslint-disable */
import bus from '../bus'
import compoLang from '../config/component.json'
export default {
  props: {
    data: Array,
    base: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      highlights: [],
      navState: [],
      isSmallScreen: false,
      isFade: false
    }
  },
  computed: {
    navStyle() {
      const style = {}
      if (this.isSmallScreen) {
        style.paddingBottom = '60px'
      }
      style.opacity = this.isFade ? '0.5' : '1'
      return style
    },
    // lang() {
    //   return this.$route.meta.lang
    // },
    langConfig() {
      console.log('compoLang', compoLang)
      return compoLang.filter((config) => config.lang === this.lang)[0]['nav']
    }
  },
  watch: {
    '$route.path'() {
      this.handlePathChange()
    },
    isFade(val) {
      bus.$emit('navFade', val)
    }
  },
  methods: {
      expandMenu(event) {
        if (!this.isSmallScreen) return;
        let target = event.currentTarget;
        if (!target.nextElementSibling || target.nextElementSibling.tagName !== 'UL') return;
        this.hideAllMenu();
        event.currentTarget.nextElementSibling.style.height = 'auto';
      }
  },
}
</script>

<style>
</style>
