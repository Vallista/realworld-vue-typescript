<template>
  <div class="profile-page">
    
    <div class="user-info">
      <div class="container">
        <div class="row">
          
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="currentProfile.image" class="user-img" />
            <h4>{{ currentProfile.username }}</h4>
            <p>
              {{ currentProfile.bio }}
            </p>
            <button class="btn btn-sm btn-outline-secondary action-btn"
                    v-if="!isMyProfile"
                    :class="{active: currentProfile.following}"
                    @click="toggleFollow(currentProfile.following, currentProfile.username)">
              <i class="ion-plus-round"></i>
              &nbsp;
              {{ currentProfile.following ? 'Unfollow' : 'Follow' }} {{ currentProfile.username }}
            </button>
            
            <button class="btn btn-sm btn-outline-secondary action-btn"
                    v-else="isMyProfile"
                    @click="$router.push('/setting')">
              <i class="ion-gear-a"></i>
              Edit Profile Settings
            </button>
          </div>
        
        </div>
      </div>
    </div>
    
    <div class="container">
      <div class="row">
        
        <div class="col-xs-12 col-md-10 offset-md-1">
          <feed-tab @change-tab="changeTab" :menus="currentTabMenus"/>
          <article-list :articles="currentArticles" :is-loading="isArticlesLoading"/>
        </div>
      
      </div>
    </div>
  
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import FeedTab from '../../components/FeedTab.vue'
import ArticleList from '../../components/article/ArticleList.vue'
import { Article, TabItem, Profile, ArticleFilter } from '../../types'

@Component({
  components: {
    FeedTab,
    ArticleList
  }
})
export default class ProfilePage extends Vue {
  currentProfile: Profile = {
    username: '',
    bio: '',
    image: '',
    following: false
  }

  tabMenus: Array<TabItem> = [
    {
      title: 'My Articles',
      href: 'my',
      isActive: true,
      isAuth: false
    },
    {
      title: 'Favorited Articles',
      href: 'favorited',
      isActive: false,
      isAuth: false
    }
  ]
  isArticlesLoading: boolean = false

  articles: Array<Article> = []
  articlesCount: number = 0

  get currentArticles () {
    return this.articles
  }

  get currentTabMenus () {
    return this.tabMenus
  }

  get user () {
    return this.$store.getters.user
  }

  get paramUsername () {
    return this.$route.params.id
  }

  get isMyProfile () {
    return this.user.username === this.paramUsername
  }

  changeTab (href: string) {
    switch (href) {
      case 'my':
        this.getArticles('getArticlesByFilter', { author: this.paramUsername })
        break
      case 'favorited':
        this.getArticles('getArticlesByFilter', { favorited: this.paramUsername })
        break
      default:
        this.getArticles('getGlobalArticles')
        break
    }
  }

  async toggleFollow (state: boolean, username: string) {
    if (state) {
      await this.$store.dispatch('unfollowUser', username)
    } else {
      await this.$store.dispatch('followUser', username)
    }
    await this.$store.dispatch('getProfile', this.paramUsername)
  }

  async getProfile () {
    const profile = await this.$store.dispatch('getProfile', this.paramUsername)
    this.currentProfile = profile
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

  init () {
    this.getProfile()
    this.getArticles('getArticlesByFilter', { author: this.paramUsername })
  }

  async created () {
    this.init()
  }

  @Watch('$route')
  routeChanged () {
    this.init()
  }
}
</script>

<style>
</style>
