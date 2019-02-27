<template>
    <a class="tag-pill tag-default" @click="getArticlesByTag({ tag })">{{ tag }}</a>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'

@Component
export default class TagItem extends Vue {
    @Prop(String) tag?: string

    async getArticlesByTag(params: any) {
        this.$store.dispatch('changeTabByTag', params.tag)
        this.$store.dispatch('getArticlesByFilter', params)
    }
}
</script>

<style>
</style>
