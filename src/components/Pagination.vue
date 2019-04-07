<template>
    <nav>
        <ul class="pagination">
            <li v-for="page in pages"
                :key="page"
                :class="paginationClass(page)"
                @click.prevent="changePage(page);">

                <a class="page-link">
                    {{ page }}
                </a>
            </li>
        </ul>
    </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'

@Component
export default class Pagination extends Vue {
    @Prop(Array) pages?: Array<number>
    @Prop(Number) currentPage?: number

    changePage(page: number) {
        if (page === this.currentPage) return
        this.$emit("changePage", page)
    }
    paginationClass(page: number) {
        return {
            "page-name": true,
            'active': this.currentPage === page
        }
    }
}
</script>

<style>
</style>
