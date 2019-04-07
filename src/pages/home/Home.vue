<template>
    <div class="home-page">
        <div class="banner" v-if="!auth">
            <div class="container">
                <h1 class="logo-font">conduit</h1>
                <p>A place to your knowledge.</p>
            </div>
        </div>
        <div class="container page">
            <div class="row">
                <div class="col-md-9">
                    <feed-tab/>
                    <article-list :articles="articlesList"/>
                </div>
                <div class="col-md-3">
                    <div class="sidebar">
                        <p>Popular Tags</p>
                        <div class="tag-list">
                            <tag-item v-for="tag in tagsList"
                                      :key="tag.index"
                                      :tag="tag"/>
                        </div>
                    </div>
                </div>

            </div>
        </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import FeedTab from '@/components/FeedTab.vue'
import ArticleList from '@/components/ArticleList.vue';
import TagItem from "@/components/TagItem.vue";

@Component({
    components: {
        FeedTab,
        ArticleList,
        TagItem,
    },
})
export default class Home extends Vue {
    get auth() {
        return this.$store.state.auth.isAuth
    }
    get articlesList(): Array<object> {
        return this.$store.getters.articlesList
    }
    get tagsList(): Array<string> {
        return this.$store.getters.tagsList
    }

    async created() {
        this.$store.dispatch('getGlobalArticles')
        this.$store.dispatch('getTags')
    }

}
</script>

<style>
</style>
