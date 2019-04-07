<template>
    <div class="feed-toggle">
        <ul class="nav nav-pills outline-active">
            <feed-tab-item v-for="menu in menus"
                           :key="menu.index"
                           :item="menu"/>
        </ul>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'
import FeedTabItem from "./FeedTabItem.vue";
import {FeedTabObj} from "../types";

@Component({
    components: {
        FeedTabItem,
    }
})
export default class FeedTab extends Vue {
    get menus() : Array<FeedTabObj> {
        return this.$store.state.home.feedTabMenus
    }
}
</script>

<style>
</style>
