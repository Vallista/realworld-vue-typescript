<template>
  <user-info :author="article.author" :created="createdAt">
    <button class="btn btn-sm btn-outline-secondary"
            v-if="!isMyArticle"
            :class="{active: article.author.following}"
            @click="toggleFollow(article.author.following, article.author.username)">
      <i class="ion-plus-round"></i>
      &nbsp;
      {{ article.author.following ? 'Unfollow' : 'Follow' }} {{ article.author.username }}
    </button>
    &nbsp;&nbsp;
    <button class="btn btn-sm btn-outline-primary"
            v-if="!isMyArticle"
            :class="{active : article.favorited}"
            @click="toggleFavorite(article.favorited, article.slug)">
      <i class="ion-heart"></i>
      &nbsp;
      {{ article.favorited ? 'Unfavorite' : 'Favorite' }} Post
      <span class="counter"> ({{ article.favoritesCount }})</span>
    </button>


    <button class="btn btn-sm btn-outline-secondary"
            v-if="isMyArticle"
            @click="editArticle">
      <i class="ion-edit"></i>
      &nbsp;
      Edit Article
    </button>
    &nbsp;&nbsp;
    <button class="btn btn-sm btn-outline-danger"
            v-if="isMyArticle"
            @click="deleteArticle">
      <i class="ion-trash-a"></i>
      &nbsp;
      Delete Article
    </button>
  </user-info>
</template>

<script lang="ts">
import Vue from 'vue'
import moment from 'moment'
import { Component, Prop } from 'vue-property-decorator'
import UserInfo from '../UserInfo.vue'
import { User } from '../../types'

@Component({
  components: {
    UserInfo
  }
})
export default class ArticleUserInfo extends Vue {
  @Prop() article: any

  get isMyArticle (): boolean {
    return this.user.username === this.article.author.username
  }

  get user (): User {
    return this.$store.getters.user
  }

  get createdAt (): string {
    const date = moment(this.article.createdAt).format('MMM Do YY')
    return date
  }

  async toggleFollow (state: boolean, username: string) {
    if (state) {
      await this.$store.dispatch('unfollowUser', username)
    } else {
      await this.$store.dispatch('followUser', username)
    }
    await this.$store.dispatch('getArticle', this.$route.params.slug)
  }

  async toggleFavorite (state: boolean, slug: string) {
    if (state) {
      await this.$store.dispatch('unfavoriteArticle', slug)
    } else {
      await this.$store.dispatch('favoriteArticle', slug)
    }
  }

  async editArticle () {
    this.$router.push(`/edit-article/${this.article.slug}`)
  }

  async deleteArticle () {
    await this.$store.dispatch('deleteArticle', this.article.slug)
    this.$router.push('/')
  }
}
</script>

<style>
</style>
