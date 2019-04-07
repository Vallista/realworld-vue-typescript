<template>
    <div class="settings-page">
        <div class="container page">
            <div class="row">
                <div class="col-md-6 offset-md-3 col-xs-12">
                    <h1 class="text-xs-center">Your Settings</h1>
                    <error-message-list/>
                    <form>
                        <fieldset>
                            <fieldset class="form-group">
                                <input class="form-control"
                                       type="text"
                                       placeholder="URL of profile picture"
                                       v-model="image">
                            </fieldset>
                            <fieldset class="form-group">
                                <input class="form-control form-control-lg"
                                       type="text"
                                       placeholder="Your Name"
                                       v-model="username">
                            </fieldset>
                            <fieldset class="form-group">
                                <textarea class="form-control form-control-lg"
                                          rows="8"
                                          placeholder="Short bio about you"
                                          v-model="bio">
                                </textarea>
                            </fieldset>
                            <fieldset class="form-group">
                                <input class="form-control form-control-lg"
                                       type="text"
                                       placeholder="Email"
                                       v-model="email">
                            </fieldset>
                            <fieldset class="form-group">
                                <input class="form-control form-control-lg"
                                       type="password"
                                       placeholder="Password"
                                       v-model="password">
                            </fieldset>
                            <button class="btn btn-lg btn-primary pull-xs-right"
                                    @click="submit">
                                Update Settings
                            </button>
                        </fieldset>
                    </form>
                </div>

            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'
import ErrorMessageList from "../../components/ErrorMessageList.vue";

@Component({
    components: {
        ErrorMessageList,
    }
})
export default class Setting extends Vue {
    username: string = ''
    password: string = ''
    email: string = ''
    image: string = ''
    bio: string = ''

    async submit() {
        try {
            await this.$store.dispatch('updateUser', {
                username: this.username,
                password: this.password,
                email: this.email,
                image: this.image,
                bio: this.bio,
            })
            this.$router.push('/')
        } catch({ response }) {
            this.$store.commit('setErrors', response.data.errors)
        }
    }
}
</script>

<style>
</style>
