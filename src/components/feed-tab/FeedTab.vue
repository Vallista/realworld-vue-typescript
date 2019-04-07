<template>
  <div class="feed-toggle">
    <ul class="nav nav-pills outline-active">
      <feed-tab-item v-for="menu in currentTabMenus"
                     :key="menu.index"
                     @change-tab="changeTab"
                     :item="menu"/>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Emit } from 'vue-property-decorator'
import FeedTabItem from './FeedTabItem.vue'
import { TabItem } from '../../types'

@Component({
  components: {
    FeedTabItem
  }
})
export default class FeedTab extends Vue {
  @Prop(Array) menus!: Array<TabItem>

  tabMenus: Array<TabItem> = [
    {
      title: '',
      dispatch: '',
      isActive: true,
      isAuth: false
    }
  ]

  get currentTabMenus (): Array<TabItem> {
    return this.tabMenus
  }

  @Emit('change-tab')
  changeTab (item: TabItem) {
    this.tabMenus.forEach((menu: TabItem) => {
      if (menu.title === item.title) {
        menu.isActive = true
      } else {
        menu.isActive = false
      }
    })
  }

  addFeedTabMenu (href: string) {
    let arr: Array<TabItem> = []
    this.tabMenus.forEach((menu: TabItem) => {
      menu.isActive = false
      if (!(menu.title.slice(0,1) === '#')) {
        arr.push(menu)
      }
    })
    arr.push({
      title: `# ${href}`,
      dispatch: 'getArticles',
      filter: {
        tag: href,
        limit: 10
      },
      isActive: true,
      isAuth: false
    })
    this.tabMenus = arr
  }

  created () {
    this.tabMenus = this.menus
  }
}
</script>

<style>
</style>
