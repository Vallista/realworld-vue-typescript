<template>
    <ul class="error-messages">
        <li v-for="(value, key) in errors"
            :key="key">
            {{ key }} {{ value[0] }}
        </li>
    </ul>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'

@Component
export default class ErrorMessageList extends Vue {
    get errors() {
        return this.$store.state.auth.errors
    }

}
</script>

<style>
</style>
