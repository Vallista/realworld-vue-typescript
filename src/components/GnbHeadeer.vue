<template>
    <nav class="navbar navbar-light">
        <div class="container">
            <router-link to="/" class="navbar-brand">conduit</router-link>
            <ul class="nav navbar-nav pull-xs-right">
                <li class="nav-item">
                    <!-- Add "active" class when you're on that page" -->
                    <router-link to="/" class="nav-link" :class="{active: currentPath === '/'}">
                        Home
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/create-article" class="nav-link" :class="{active: currentPath === '/create-article'}">
                        <i class="ion-compose"></i>&nbsp;New Post
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/setting" class="nav-link" :class="{active: currentPath === '/setting'}">
                        <i class="ion-gear-a"></i>&nbsp;Settings
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/register" class="nav-link" :class="{active: currentPath === '/register'}">
                        Sign up
                    </router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop, Watch} from 'vue-property-decorator'

@Component
export default class GnbHeader extends Vue {
    currentPath: String = ''

    created() {
        this.currentPath = this.$route.path
    }

    @Watch('$route')
    onRouteChange(): void {
        this.currentPath = this.$route.path
    }
}
</script>

<style>
</style>
