<template>
  <div class="article-meta">
    <router-link :to="`/profile/${author.username}`">
      <img :src="author.image" />
    </router-link>
    <div class="info">
      <router-link :to="`/profile/${author.username}`"
                   class="author">{{ author.username }}
      </router-link>
      <span class="date">{{ created }}</span>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class UserInfo extends Vue {
  @Prop(Object) author?: any
  @Prop(String) created?: string

}
</script>

<style>
</style>
