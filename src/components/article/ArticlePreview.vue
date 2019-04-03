<template>
  <div class="article-preview">
    <div class="article-meta">
      <user-info :author="editable.author" :created="createdAt">
        <button class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{active: editable.favorited}"
                @click="toggleFavorite(editable.favorited, editable.slug)">
          <i class="ion-heart"></i> {{ editable.favoritesCount }}
        </button>
      </user-info>
    </div>
    <router-link :to="`/article/${editable.slug}`" class="preview-link">
      <h1>{{ editable.title }}</h1>
      <p>{{ editable.description }}</p>
      <span>Read more...</span>
      <ul class="tag-list">
        <li class="tag-default tag-pill tag-outline" v-for="tag in editable.tagList" :key="tag.index">
          <span>{{ tag }}</span>
        </li>
      </ul>
    </router-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import moment from 'moment'
import UserInfo from '../UserInfo.vue'
import { Article } from '../../types'

@Component({
  components: {
    UserInfo
  }
})
export default class ArticlePreview extends Vue {
  @Prop(Object) value!: Article
  @Prop(Object) contents?: any

  editable!: Article

  get createdAt (): String {
    const date = moment(this.value.createdAt).format('MMM Do YY')
    return date
  }

  async toggleFavorite (state: boolean, slug: string) {
    if (state) {
      const result = await this.$store.dispatch('unfavoriteArticle', slug)
      this.editable = result
      this.$emit('input', this.editable)
    } else {
      const result = await this.$store.dispatch('favoriteArticle', slug)
      this.editable = result
      this.$emit('input', this.editable)
    }
  }

  created () {
    this.editable = this.value
  }
}
</script>

<style scoped>
  .tag-list {
    display: flex;
    flex-wrap: nowrap;
    overflow: hidden;
  }
</style>
