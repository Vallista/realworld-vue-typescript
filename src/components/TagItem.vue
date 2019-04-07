<template>
  <a class="tag-pill tag-default" @click="getArticlesByTag(tag)">{{ tag }}</a>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class TagItem extends Vue {
  @Prop(String) tag?: string

  async getArticlesByTag (tag: any) {
    this.$store.commit('addFeedTabMenu', tag)
    this.$store.dispatch('getArticlesByFilter', { tag })
  }
}
</script>

<style>
</style>
