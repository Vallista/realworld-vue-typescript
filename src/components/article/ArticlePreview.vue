<template>
  <div class="article-preview">
    <div class="article-meta">
      <user-info :author="contents.author" :created="createdAt">
        <button class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{active: contents.favorited}"
                @click="toggleFavorite(contents.favorited, contents.slug)">
          <i class="ion-heart"></i> {{ contents.favoritesCount }}
        </button>
      </user-info>
    </div>
    <router-link :to="`/article/${contents.slug}`" class="preview-link">
      <h1>{{ contents.title }}</h1>
      <p>{{ contents.description }}</p>
      <span>Read more...</span>
    </router-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import moment from 'moment'
import UserInfo from '../UserInfo.vue'

@Component({
  components: {
    UserInfo
  }
})
export default class ArticlePreview extends Vue {
  @Prop(Object) contents?: any

  get createdAt (): String {
    const date = moment(this.contents.createdAt).format('MMM Do YY')
    return date
  }

  async toggleFavorite (state: boolean, slug: string) {
    if (state) {
      await this.$store.dispatch('unfavoriteArticle', slug)
    } else {
      await this.$store.dispatch('favoriteArticle', slug)
    }
  }
}
</script>

<style>
</style>
