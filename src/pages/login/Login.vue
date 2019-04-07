<template>
    <div class="auth-page">
        <div class="container page">
            <div class="row">

                <div class="col-md-6 offset-md-3 col-xs-12">
                    <h1 class="text-xs-center">Sign in</h1>
                    <p class="text-xs-center">
                        <router-link to="/register">Need an account?</router-link>
                    </p>

                    <error-message-list/>

                    <form>
                        <input-field-common v-for="fieldData in fieldDataList"
                                            :key="fieldData.index"
                                            :fieldData="fieldData"
                                            @emit="getInputValue"/>
                        <button class="btn btn-lg btn-primary pull-xs-right" @click="login">
                            Sign up
                        </button>
                    </form>
                </div>

            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'
import InputFieldCommon from "../../components/InputFieldCommon.vue";
import {InputFieldProps} from "../../types";
import ErrorMessageList from "../../components/ErrorMessageList.vue";

@Component({
    components: {
        InputFieldCommon,
        ErrorMessageList,
    }
})
export default class SignUp extends Vue {
    fieldDataList: Array<InputFieldProps> = [
        {
            inputType: 'text',
            placeholder: 'Email',
            model: 'email',
        },
        {
            inputType: 'password',
            placeholder: 'Password',
            model: 'password',
        },
    ]

    email : string = ''
    password : string = ''

    getInputValue({ value, model } : any) : void {
        switch (model) {
            case 'password' :
                this.password = value
                break
            case 'email' :
                this.email = value
                break
            default : return
        }
    }

    async login() {
        try {
            await this.$store.dispatch('loginUser', {
                email: this.email,
                password: this.password
            })
            this.$router.push('/')
        } catch({response}) {
            this.$store.commit('setErrors', response.data.errors)
        }
    }
}
</script>

<style>
</style>
