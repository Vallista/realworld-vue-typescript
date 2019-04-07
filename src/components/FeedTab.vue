<template>
  <div class="feed-toggle">
    <ul class="nav nav-pills outline-active">
      <feed-tab-item v-for="menu in menus"
                     :key="menu.index"
                     :item="menu"/>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import FeedTabItem from './FeedTabItem.vue'
import { FeedTabObj } from '../types'

@Component({
  components: {
    FeedTabItem
  }
})
export default class FeedTab extends Vue {
  @Prop(String) location?: string

  get menus (): Array<FeedTabObj> {
    switch (this.location) {
      case 'feed':
        return this.$store.getters.feedTabMenus
      case 'profile':
        return this.$store.getters.profileFeedTabMenus
      default:
        return this.$store.getters.feedTabMenus
    }
  }
}
</script>

<style>
</style>
