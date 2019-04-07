<template>
  <li class="nav-item" v-if="isVisible">
    <a class="nav-link"
       :class="{active: isActive}"
       @click="changeTab(item.href)">
      {{ item.title }}
    </a>
  </li>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { FeedTabObj } from '../types'

@Component
export default class FeedTabItem extends Vue {
  @Prop() item?: FeedTabObj

  get isVisible (): boolean {
    if (this.item && this.item.isAuth) {
      return this.item.isAuth === this.$store.getters.isAuth
    }
    return true
  }

  get isActive (): boolean {
    if (this.item) {
      return this.item.isActive
    }
    return false
  }

  changeTab (href: string): void {
    this.$store.dispatch('changeTab', href)
    if (href === 'global') {
      this.$store.dispatch('getGlobalArticles')
    } else if (href === 'feed') {
      this.$store.dispatch('getFeedArticles')
    } else {
      this.$store.dispatch('getArticlesByFilter', { tag: href })
    }
  }
}
</script>

<style>
</style>
