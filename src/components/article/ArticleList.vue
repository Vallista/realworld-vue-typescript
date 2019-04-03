<template>
  <div>
    <div v-if="!isLoading && !isArticlesEmpty">
      <div v-for="(article, index) of articles"
           :key="index">
        <transition name="list-item" mode="out-in" appear>
          <article-preview v-model="articles[index]"
                           :contents="article"/>
        </transition>
      </div>
      <pagination :articles-count="articlesCount"
                  :currentPage="listStatus.page"
                  @changePage="changePage"/>
    </div>
    <div class="article-preview placeholder">
      <span v-if="!isLoading && isArticlesEmpty">
        No articles are here... yet.
      </span>
      <span v-if="isLoading">
        Loading articles...
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import ArticlePreview from './ArticlePreview.vue'
import Pagination from '@/components/Pagination.vue'
import { Article, ArticleFilter, ListStatus } from '../../types'

@Component({
  components: {
    ArticlePreview,
    Pagination
  }
})
export default class ArticleList extends Vue {
  @Prop({ type: Object, required: true }) listStatus!: ListStatus

  articles: Array<Article> = []
  isLoading: boolean = false
  articlesCount: number = 0

  get isArticlesEmpty (): boolean {
    if (this.articles) {
      return this.articles.length < 1
    }
    return true
  }

  changePage (page: Number) {
    this.$emit('changePage', page)
  }

  @Watch('listStatus')
  init () {
    this.getArticles(this.listStatus.dispatch, this.listStatus.filter)
  }

  async getArticles (dispatch: string, param?: ArticleFilter) {
    this.isLoading = true
    const articles = await this.$store.dispatch(dispatch, param)
    this.articles = articles.articles
    this.articlesCount = articles.articlesCount
    this.isLoading = false
  }

  created () {
    this.init()
  }
}
</script>

<style>
@keyframes fadeIn {
  0% {
    transform: translateX(-40px);
    opacity: 0;
  }
  100% {
    transform: translateX(0px);
    opacity: 1;
  }
}
.list-item-enter-active {
  animation: fadeIn 0.5s;
}
.list-item-leave-active {
  animation: fadeIn 0.5s reverse;
}
.article-preview.placeholder {
  position: absolute;
}
</style>
