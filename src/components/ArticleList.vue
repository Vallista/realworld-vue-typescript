<template>
    <div>
        <div v-if="!loadingState">
            <article-preview v-for="article in articles"
                             :key="article.index"
                             :contents="article"/>
        </div>
        <div v-else>Loading articles...</div>
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
    get loadingState(): Boolean {
        return this.$store.state.home.articleListIsLoading
    }
}
</script>

<style>
</style>
