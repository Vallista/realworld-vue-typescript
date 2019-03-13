<template>
  <div class="profile-page">
    
    <div class="user-info">
      <div class="container">
        <div class="row">
          
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>
              {{ profile.bio }}
            </p>
            <button class="btn btn-sm btn-outline-secondary action-btn"
                    :class="{active: profile.following}"
                    @click="toggleFollow(profile.following, profile.username)">
              <i class="ion-plus-round"></i>
              &nbsp;
              {{ profile.following ? 'Unfollow' : 'Follow' }} {{ profile.username }}
            </button>
          </div>
        
        </div>
      </div>
    </div>
    
    <div class="container">
      <div class="row">
        
        <div class="col-xs-12 col-md-10 offset-md-1">
          <feed-tab location="profile"/>
          <article-list :articles="articles"/>
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

@Component({
  components: {
    FeedTab,
    ArticleList
  }
})
export default class Profile extends Vue {
  get user () {
    return this.$store.getters.user
  }

  get username () {
    return this.$route.params.id
  }

  get profile () {
    return this.$store.getters.currentProfile
  }

  get articles () {
    return this.$store.getters.articles
  }

  async toggleFollow (state: boolean, username: string) {
    if (state) {
      await this.$store.dispatch('unfollowUser', username)
    } else {
      await this.$store.dispatch('followUser', username)
    }
    await this.$store.dispatch('getProfile', this.username)
  }

  async created () {
    this.$store.dispatch('getProfile', this.username)
    this.$store.dispatch('getArticlesByFilter', { author: this.username })
  }

  @Watch('$route')
  routeChanged () {
    console.log('changed')
  }
}
</script>

<style>
</style>
