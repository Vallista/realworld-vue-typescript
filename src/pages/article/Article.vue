<template>
    <div class="article-page">

        <div class="banner">
            <div class="container">

                <h1>{{ article.title }}</h1>

                <user-info :author="article.author" :created="createdAt">
                    <button class="btn btn-sm btn-outline-secondary" :class="{active: article.author.following}">
                        <i class="ion-plus-round"></i>
                        &nbsp;
                        {{ article.author.following ? 'Unfollow' : 'Follow' }} {{ article.author.username }}
                    </button>
                    &nbsp;&nbsp;
                    <button class="btn btn-sm btn-outline-primary" :class="{active : article.favorited}">
                        <i class="ion-heart"></i>
                        &nbsp;
                        Favorite Post <span class="counter">({{ article.favoritesCount }})</span>
                    </button>
                </user-info>

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
                <user-info :author="article.author" :created="createdAt">
                    <button class="btn btn-sm btn-outline-secondary">
                        <i class="ion-plus-round"></i>
                        &nbsp;
                        Follow Eric Simons <span class="counter">(10)</span>
                    </button>
                    &nbsp;&nbsp;
                    <button class="btn btn-sm btn-outline-primary">
                        <i class="ion-heart"></i>
                        &nbsp;
                        Favorite Post <span class="counter">(29)</span>
                    </button>
                </user-info>
            </div>

            <div class="row">

                <div class="col-xs-12 col-md-8 offset-md-2">

                    <form class="card comment-form">
                        <div class="card-block">
                            <textarea class="form-control" placeholder="Write a comment..." rows="3"></textarea>
                        </div>
                        <div class="card-footer">
                            <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
                            <button class="btn btn-sm btn-primary">
                                Post Comment
                            </button>
                        </div>
                    </form>

                    <div class="card">
                        <div class="card-block">
                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        </div>
                        <div class="card-footer">
                            <a href="" class="comment-author">
                                <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
                            </a>
                            &nbsp;
                            <a href="" class="comment-author">Jacob Schmidt</a>
                            <span class="date-posted">Dec 29th</span>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-block">
                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        </div>
                        <div class="card-footer">
                            <a href="" class="comment-author">
                                <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
                            </a>
                            &nbsp;
                            <a href="" class="comment-author">Jacob Schmidt</a>
                            <span class="date-posted">Dec 29th</span>
                            <span class="mod-options">
              <i class="ion-edit"></i>
              <i class="ion-trash-a"></i>
            </span>
                        </div>
                    </div>

                </div>

            </div>

        </div>

    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Watch} from 'vue-property-decorator'
import moment from 'moment'
import UserInfo from "@/components/UserInfo.vue";

@Component ({
    components: {
        UserInfo,
    }
})
export default class Article extends Vue {

    get article(): any {
        return this.$store.state.article.currentArticle
    }

    get createdAt(): string {
        const date = moment(this.article.createdAt).format("MMM Do YY")
        return date
    }

    async created() {
        await this.$store.dispatch('getArticle', this.$route.params.slug)
    }

    @Watch('$route')
    async getArticle() {
        await this.$store.dispatch('getArticle', this.$route.params.slug)
    }

}
</script>

<style>
.banner .container .article-meta {
    /*display: flex;*/
}
.article-actions .article-meta {
    /*display: flex;*/
    /*margin: 0 auto;*/
}
</style>
