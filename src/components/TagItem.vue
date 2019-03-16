<template>
  <a class="tag-pill tag-default" @click="getArticlesByTag(tag)">{{ tag }}</a>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Emit } from 'vue-property-decorator'

@Component
export default class TagItem extends Vue {
  @Prop(String) tag?: string

  @Emit('get-articles-by-tag')
  getArticlesByTag (tag: string) {
    // @ts-ignore
    this.$tabMenu.add(tag)
  }
}
</script>

<style>
</style>
