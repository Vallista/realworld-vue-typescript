<template>
    <div class="article-preview">
        <div class="article-meta">
            <a href=""><img :src="contents.author.image" /></a>
            <div class="info">
                <router-link :to="`/profile/${contents.author.username}`"
                             class="author">{{ contents.author.username }}
                </router-link>
                <span class="date">{{ createdAt }}</span>
            </div>
            <button class="btn btn-outline-primary btn-sm pull-xs-right" :class="{active: contents.favorited}">
                <i class="ion-heart"></i> {{ contents.favoritesCount }}
            </button>
        </div>
        <a hgref="" class="preview-link">
            <h1>{{ contents.title }}</h1>
            <p>{{ contents.description }}</p>
            <span>Read more...</span>
        </a>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'
import moment from 'moment'

@Component
export default class ArticlePreview extends Vue {
    @Prop(Object) contents?: any

    get createdAt(): String {
        const date = moment(this.contents.createdAt).format("MMM Do YY")
        return date
    }
}
</script>

<style>
</style>
