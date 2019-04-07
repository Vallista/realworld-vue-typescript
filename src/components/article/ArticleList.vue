<template>
  <div>
    <div v-if="!isLoading">
      <article-preview v-for="article in articles"
                       :key="article.index"
                       :contents="article"/>
    </div>
    <div class="article-preview" v-else>Loading articles...</div>
    <div class="article-preview" v-if="!isLoading && isArticlesEmpty">
      No articles are here... yet.
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import ArticlePreview from './ArticlePreview.vue'

@Component({
  components: {
    ArticlePreview
  }
})
export default class ArticleList extends Vue {
  @Prop(Array) articles?: Array<object>
  @Prop(Boolean) isLoading?: boolean

  get isArticlesEmpty (): boolean {
    if (this.articles) {
      return this.articles.length < 1
    }
    return true
  }
}
</script>

<style>
</style>
