<template>
    <div class="article-page">
        <div class="banner">
            <div class="container">
                <h1>{{ article.title }}</h1>
                <article-user-info :article="article"/>
            </div>
        </div>
        <div class="container page">
            <div class="row article-content">
                <div class="col-md-12">
                    {{ article.body }}
                </div>
            </div>
            <hr />

            <div class="article-actions">
                <article-user-info :article="article"/>
            </div>

            <div class="row">
                <div class="col-xs-12 col-md-8 offset-md-2">
                    <comment-form/>
                    <comment-card v-for="comment in comments"
                                  :key="comment.index"
                                  :comment="comment"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Watch} from 'vue-property-decorator'
import ArticleUserInfo from "@/components/ArticleUserInfo.vue"
import CommentForm from "@/components/CommentForm.vue"
import CommentCard from "@/components/CommentCard.vue"

@Component ({
    components: {
        ArticleUserInfo,
        CommentForm,
        CommentCard,
    }
})
export default class Article extends Vue {

    get article(): any {
        return this.$store.getters.article
    }

    get comments(): any {
        return this.$store.getters.commentList
    }

    async created() {
        await this.$store.dispatch('getArticle', this.$route.params.slug)
        await this.$store.dispatch('getComments', this.$route.params.slug)
    }

    @Watch('$route')
    async getArticle() {
        await this.$store.dispatch('getArticle', this.$route.params.slug)
    }

}
</script>

<style>
</style>
