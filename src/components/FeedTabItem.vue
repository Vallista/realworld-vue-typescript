<template>
    <li class="nav-item">
        <a class="nav-link"
           :class="{active: isActive}"
           @click="changeTab">
            {{ item.title }}
        </a>
    </li>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { Component, Prop } from 'vue-property-decorator'
    import { FeedTabObj } from "../types";

    @Component
    export default class FeedTabItem extends Vue {
        @Prop() item?: FeedTabObj
        get isActive() : Boolean {
            if (this.item) {
                return this.item.isActive
            }
            return false
        }

        changeTab(): void {
            if (this.item) {
                this.$store.dispatch('changeTab', this.item.href)
            }
        }
    }
</script>

<style>
</style>
