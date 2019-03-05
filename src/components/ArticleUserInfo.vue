<template>
    <user-info :author="article.author" :created="createdAt">
        <button class="btn btn-sm btn-outline-secondary"
                :class="{active: article.author.following}"
                @click="toggleFollow(article.author.following, article.author.username)">
            <i class="ion-plus-round"></i>
            &nbsp;
            {{ article.author.following ? 'Unfollow' : 'Follow' }} {{ article.author.username }}
        </button>
        &nbsp;&nbsp;
        <button class="btn btn-sm btn-outline-primary"
                :class="{active : article.favorited}"
                @click="toggleFavorite(article.favorited, article.slug)">
            <i class="ion-heart"></i>
            &nbsp;
            {{ article.favorited ? 'Unfavorite' : 'Favorite' }} Post
            <span class="counter"> ({{ article.favoritesCount }})</span>
        </button>
    </user-info>
</template>

<script lang="ts">
import Vue from 'vue'
import moment from "moment";
import {Component, Prop} from 'vue-property-decorator'
import UserInfo from "./UserInfo.vue";


@Component({
    components: {
        UserInfo,
    }
})
export default class ArticleUserInfo extends Vue {
    @Prop() article: any

    get createdAt(): string {
        const date = moment(this.article.createdAt).format("MMM Do YY")
        return date
    }

    async toggleFollow(state: boolean, username: string) {
        if (state) {
            await this.$store.dispatch('unfollowUser', username)
        } else {
            await this.$store.dispatch('followUser', username)
        }
        await this.$store.dispatch('getArticle', this.$route.params.slug)
    }

    async toggleFavorite(state: boolean, slug: string) {
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
