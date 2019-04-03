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
          <feed-tab :menus="tabMenus"
                    ref="feedTab"
                    @change-tab="changeTab"/>
          <article-list :current-page="currentPage"
                        @changePage="changePage"
                        :list-status="listStatus"/>
        </div>
      
      </div>
    </div>
  
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import FeedTab from '../../components/feed-tab/FeedTab.vue'
import ArticleList from '../../components/article/ArticleList.vue'
import { TabItem, Profile, ArticleFilter, ListStatus } from '../../types'

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

  tabMenus: Array<TabItem> = []

  listStatus: ListStatus = {
    dispatch: 'getArticles',
    filter: {
      limit: 10
    },
    page: 1
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

  setListStatus (dispatch: string, filter: ArticleFilter, page: number) {
    this.listStatus = {
      dispatch,
      filter,
      page
    }
  }

  changePage (page: number) {
    if (this.listStatus.filter.tag) {
      this.setListStatus(this.listStatus.dispatch, {
        offset: page * 10,
        limit: 10 ,
        tag: this.listStatus.filter.tag
      }, page)
    } else {
      this.setListStatus(this.listStatus.dispatch, { offset: page * 10, limit: 10 }, page)
    }
  }

  changeTab (item: TabItem) {
    if (item.filter) {
      this.setListStatus(item.dispatch, item.filter, 1)
    }
  }
  setTabMenu () {
    this.tabMenus = [
      {
        title: 'My Articles',
        dispatch: 'getArticles',
        filter: {
          author: this.paramUsername,
          limit: 10
        },
        isActive: true,
        isAuth: false
      },
      {
        title: 'Favorited Articles',
        dispatch: 'getArticles',
        filter: {
          favorited: this.paramUsername,
          limit: 10
        },
        isActive: false,
        isAuth: false
      }
    ]
  }

  async toggleFollow (state: boolean, username: string) {
    if (state) {
      const profile = await this.$store.dispatch('unfollowUser', username)
      this.currentProfile = profile
    } else {
      const profile = await this.$store.dispatch('followUser', username)
      this.currentProfile = profile
    }
    await this.$store.dispatch('getProfile', this.paramUsername)
  }

  async getProfile () {
    const profile = await this.$store.dispatch('getProfile', this.paramUsername)
    this.currentProfile = profile
    this.setListStatus('getArticles', { author: this.paramUsername }, 1)
  }

  async init () {
    this.getProfile()
    this.setTabMenu()
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
