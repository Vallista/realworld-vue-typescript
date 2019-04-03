<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <router-link to="/login">Have an account?</router-link>
          </p>
          <error-message-list/>
          <form>
            <input-field-common v-for="fieldData in fieldDataList"
                                :key="fieldData.index"
                                :fieldData="fieldData"
                                @emit="getInputValue"
                                :enter-callback="register"/>
            <button class="btn btn-lg btn-primary pull-xs-right" type="button" @click="register">
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
import { Component, Prop } from 'vue-property-decorator'
import InputFieldCommon from '@/components/InputFieldCommon.vue'
import { InputFieldProps } from '../../types'
import ErrorMessageList from '../../components/ErrorMessageList.vue'

@Component({
  components: {
    InputFieldCommon,
    ErrorMessageList
  }
})
export default class SignUp extends Vue {
  fieldDataList: Array<InputFieldProps> = [
    {
      inputType: 'text',
      placeholder: 'Your Name',
      model: 'name'
    },
    {
      inputType: 'text',
      placeholder: 'Email',
      model: 'email'
    },
    {
      inputType: 'password',
      placeholder: 'Password',
      model: 'password'
    }
  ]

  name: string = ''
  email: string = ''
  password: string = ''

  getInputValue ({ value, model }: any): void {
    switch (model) {
      case 'name':
        this.name = value
        break
      case 'password':
        this.password = value
        break
      case 'email':
        this.email = value
        break
      default: return
    }
  }

  async register () {
    try {
      await this.$store.dispatch('registerUser', {
        email: this.email,
        username: this.name,
        password: this.password
      })
      await this.$store.dispatch('loginUser', {
        email: this.email,
        password: this.password
      })
      this.$router.push('/')
    } catch ({ response }) {
      this.$store.commit('setErrors', response.data.errors)
    }
  }
}
</script>

<style>
</style>
