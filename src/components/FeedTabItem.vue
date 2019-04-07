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
import { FeedTabObj, Profile } from '../types'

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

  get profile (): Profile {
    return this.$store.getters.currentProfile
  }

  changeTab (href: string): void {
    if (href === 'global') {
      this.$store.commit('changeTab', href)
      this.$store.dispatch('getGlobalArticles')
    } else if (href === 'feed') {
      this.$store.commit('changeTab', href)
      this.$store.dispatch('getFeedArticles')
    } else if (href === 'my') {
      this.$store.commit('changeProfileTab', href)
      this.$store.dispatch('getArticlesByFilter', { author: this.profile.username })
    } else if (href === 'favorited') {
      this.$store.commit('changeProfileTab', href)
      this.$store.dispatch('getArticlesByFilter', { favorited: this.profile.username })
    } else {
      this.$store.dispatch('getArticlesByFilter', { tag: href })
    }
  }
}
</script>

<style>
</style>
