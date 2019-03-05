<template>
    <div>
        <div v-if="!loadingState">
            <article-preview v-for="article in articles"
                             :key="article.index"
                             :contents="article"/>
        </div>
        <div class="article-preview" v-else>Loading articles...</div>
        <div class="article-preview" v-if="!loadingState && isArticlesEmpty">
            No articles are here... yet.
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop } from 'vue-property-decorator'
import ArticlePreview from '@/components/ArticlePreview.vue'

@Component({
    components: {
        ArticlePreview,
    }
})
export default class ArticleList extends Vue {
    @Prop(Array) articles?: Array<object>

    get isArticlesEmpty(): boolean {
        if (this.articles) {
            return this.articles.length < 1
        }
        return true
    }

    get loadingState(): boolean {
        return this.$store.getters.articleListIsLoading
    }
}
</script>

<style>
</style>
