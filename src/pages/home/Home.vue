<template>
  <div class="home-page">
    <div class="banner" v-if="!isAuth">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to your knowledge.</p>
      </div>
    </div>
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <feed-tab :menus="tabMenus"
                    ref="feedTab"
                    @change-tab="changeTab"/>
          <article-list @changePage="changePage"
                        :list-status="listStatus"/>
        </div>
        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
              <tag-item v-for="tag in tagsList"
                        :key="tag.index"
                        :tag="tag"
                        @select-tag="selectTag(tag)"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import FeedTab from '@/components/feed-tab/FeedTab.vue'
import ArticleList from '@/components/article/ArticleList.vue'
import TagItem from '@/components/TagItem.vue'
import { ArticleFilter, ListStatus, TabItem } from '../../types'

@Component({
  components: {
    FeedTab,
    ArticleList,
    TagItem
  }
})
export default class Home extends Vue {
  $refs!: { feedTab: HTMLFormElement }
  tabMenus: Array<TabItem> = [
    {
      title: 'Your Feed',
      dispatch: 'getFeedArticles',
      isActive: false,
      isAuth: true
    },
    {
      title: 'Global Feed',
      dispatch: 'getArticles',
      isActive: true,
      isAuth: false
    }
  ]

  listStatus: ListStatus = {
    dispatch: 'getArticles',
    filter: {
      limit: 10,
      offset: 0
    },
    page: 1
  }

  tags: Array<string> = []

  get isAuth (): boolean {
    return this.$store.getters.isAuth
  }

  get tagsList (): Array<string> {
    return this.tags
  }

  setListStatus (dispatch: string, filter: ArticleFilter, page: number) {
    this.listStatus = {
      dispatch,
      filter,
      page
    }
  }

  changePage (page: number) {
    if (this.listStatus.filter.tag) {
      this.setListStatus(this.listStatus.dispatch, { offset: page * 10, limit: 10 , tag: this.listStatus.filter.tag }, page)
    } else {
      this.setListStatus(this.listStatus.dispatch, { offset: page * 10, limit: 10 }, page)
    }
  }

  changeTab (item: TabItem) {
    if (item.filter) {
      this.setListStatus(item.dispatch, item.filter, 1)
    } else {
      this.setListStatus(item.dispatch, { limit: 10 }, 1)
    }
  }

  selectTag (tag: string) {
    this.$refs.feedTab.addFeedTabMenu(tag)
    this.setListStatus('getArticles', { tag, limit: 10 } , 1)
  }

  async getTags () {
    const tags = await this.$store.dispatch('getTags')
    this.tags = tags
  }

  init () {
    this.getTags()
  }

  created () {
    this.init()
  }
}
</script>

<style>
</style>
