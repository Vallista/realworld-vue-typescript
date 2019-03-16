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
                    @change-tab="changeTab"/>
          <article-list :articles="articles"
                        :is-loading="isArticlesLoading"/>
        </div>
        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
              <tag-item v-for="tag in tagsList"
                        :key="tag.index"
                        :tag="tag"
                        @get-articles-by-tag="getArticles('getArticlesByFilter', { tag })"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import FeedTab from '@/components/FeedTab.vue'
import ArticleList from '@/components/article/ArticleList.vue'
import TagItem from '@/components/TagItem.vue'
import { Article, ArticleFilter, TabItem } from '../../types'

@Component({
  components: {
    FeedTab,
    ArticleList,
    TagItem
  }
})
export default class Home extends Vue {
  @Prop(String) contents?: string

  tabMenus: Array<TabItem> = [
    {
      title: 'Your Feed',
      href: 'feed',
      isActive: false,
      isAuth: true
    },
    {
      title: 'Global Feed',
      href: 'global',
      isActive: true,
      isAuth: false
    }
  ]

  articles?: Array<Article> = []
  isArticlesLoading: boolean = false
  articlesCount: number = 0

  tags: Array<string> = []

  get isAuth (): boolean {
    return this.$store.getters.isAuth
  }

  get tagsList (): Array<string> {
    return this.tags
  }

  changeTab (href: string) {
    switch (href) {
      case 'global':
        this.getArticles('getGlobalArticles')
        break
      case 'feed':
        this.getArticles('getFeedArticles')
        break
      default:
        this.getArticles('getGlobalArticles')
        break
    }
  }

  async getArticles (dispatch: string, param?: ArticleFilter) {
    this.isArticlesLoading = true
    let articles
    if (param) {
      articles = await this.$store.dispatch(dispatch, param)
    } else {
      articles = await this.$store.dispatch(dispatch)
    }
    this.articles = articles.articles
    this.articlesCount = articles.articlesCount
    this.isArticlesLoading = false
  }

  async getTags () {
    const tags = await this.$store.dispatch('getTags')
    this.tags = tags
  }

  init () {
    this.getArticles('getGlobalArticles')
    this.getTags()
  }

  created () {
    this.init()
  }
}
</script>

<style>
</style>
