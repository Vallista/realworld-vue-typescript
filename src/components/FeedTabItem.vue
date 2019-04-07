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
import { Component, Prop, Emit } from 'vue-property-decorator'
import { TabItem, Profile } from '../types'

@Component
export default class FeedTabItem extends Vue {
  @Prop() item?: TabItem

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

  @Emit('change-tab')
  changeTab (href: string): void {
    return
  }
}
</script>

<style>
</style>
