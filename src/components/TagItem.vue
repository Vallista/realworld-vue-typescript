<template>
  <a class="tag-pill tag-default" @click="selectTag(tag)">{{ tag }}</a>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Emit } from 'vue-property-decorator'

@Component
export default class TagItem extends Vue {
  @Prop(String) tag?: string

  @Emit('select-tag')
  selectTag (tag: string) {
    return tag
  }
}
</script>

<style>
</style>
