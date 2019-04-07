<template>
    <div>
        <div class="card">
            <div class="card-block">
                <p class="card-text">{{ comment.body }}</p>
            </div>
            <div class="card-footer">
                <router-link :to="`/profile/${comment.author.username}`" class="comment-author">
                    <img :src="comment.author.image" class="comment-author-img" />
                </router-link>
                &nbsp;
                <router-link :to="`/profile/${comment.author.username}`" class="comment-author">
                    {{ comment.author.username }}
                </router-link>
                <span class="date-posted">{{ createdAt }}</span>
                <span class="mod-options" v-if="isMine">
                    <i class="ion-trash-a" @click="deleteComment"></i>
                </span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import moment from "moment"
import {Component, Prop} from 'vue-property-decorator'


@Component
export default class CommentCard extends Vue {
    @Prop() comment?: any

    get isMine(): boolean {
        return this.comment.author.username === this.$store.getters.user.username
    }

    get createdAt(): string {
        const date = moment(this.comment.createdAt).format("MMM Do YY")
        return date
    }

    deleteComment() {
         this.$store.dispatch('deleteComment', {
             slug: this.$route.params.slug,
             id: this.comment.id,
         })
    }
}
</script>

<style>
</style>
