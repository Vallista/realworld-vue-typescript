<template>
    <form class="card comment-form">
        <div class="card-block">
            <textarea class="form-control"
                      placeholder="Write a comment..."
                      rows="3"
                      v-model="input"
                      @input="input = $event.target.value">
            </textarea>
        </div>
        <div class="card-footer">
            <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
            <button class="btn btn-sm btn-primary" @click="submitComment" :disabled="isDisabled">
                Post Comment
            </button>
        </div>
    </form>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'

@Component
export default class CommentForm extends Vue {

    input: string = ''
    isDisabled: boolean = false

    async submitComment() {
        const temp: string = this.input
        this.input = ''
        this.isDisabled = true
        try {
            await this.$store.dispatch('createComment', {
                slug: this.$route.params.slug,
                comment: {
                    body: temp
                },
            })
            await this.$store.dispatch('getComments', this.$route.params.slug)
            this.isDisabled = false
        }
        catch {
            this.input = temp
            this.isDisabled = false
        }
    }
}
</script>

<style>
</style>
