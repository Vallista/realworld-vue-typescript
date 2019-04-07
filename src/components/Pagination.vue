<template>
  <ul class="pagination">
    <li v-for="page in pages"
        :key="page"
        @click.prevent="changePage(page);">
      
      <a class="page-link"
         :class="paginationClass(page)">
        {{ page }}
      </a>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class Pagination extends Vue {
  @Prop(Number) articlesCount!: number
  @Prop(Number) currentPage!: number

  get pages () {
    if (typeof this.articlesCount === 'number') {
      if (this.articlesCount / 10 < 1) {
        return 1
      } else {
        return Math.floor(this.articlesCount / 10)
      }
    }
    return 1
  }

  changePage (page: Number) {
    if (page === this.currentPage) return
    this.$emit('changePage', page)
  }

  paginationClass (page: number) {
    return {
      'page-name': true,
      'active': this.currentPage === page
    }
  }

}
</script>

<style>
  .pagination {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
  }
  .page-link.active {
    background-color: #5cb85c;
    color: #ffffff;
  }
</style>
