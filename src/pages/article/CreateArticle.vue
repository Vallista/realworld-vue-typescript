<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-10 offset-md-1 col-xs-12">
          <error-message-list/>
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input type="text"
                       class="form-control form-control-lg"
                       placeholder="Article Title"
                       :value="editable.title"
                       @input="updateTitle($event.target.value)">
              </fieldset>
              <fieldset class="form-group">
                <input type="text"
                       class="form-control"
                       placeholder="What's this article about?"
                       :value="editable.description"
                       @input="updateDesc($event.target.value)">
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control"
                          rows="8"
                          placeholder="Write your article (in markdown)"
                          :value="editable.body"
                          @input="updateBody($event.target.value)">
                </textarea>
              </fieldset>
              <fieldset class="form-group">
                <input type="text"
                       class="form-control"
                       :value="tagInput"
                       @input="updateTagInput($event.target.value)"
                       @keyup.enter="addTag($event.target.value)"
                       placeholder="Enter tags">
                <div class="tag-list">
                  <a v-for="tag in editable.tagList"
                     :key="tag.index"
                     class="tag-pill tag-default">
                    {{ tag }}
                  </a>
                </div>
              </fieldset>
              <button class="btn btn-lg pull-xs-right btn-primary"
                      type="button"
                      @click="submit">
                Publish Article
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
import { Component } from 'vue-property-decorator'
import ErrorMessageList from '../../components/ErrorMessageList.vue'
import { NewArticle } from '../../types'

@Component({
  components: {
    ErrorMessageList
  }
})
export default class CreateArticle extends Vue {

  tagInput: string = ''

  editable: NewArticle = {
    title: '',
    description: '',
    body: '',
    tagList: []
  }

  updateTitle (value: string) {
    this.editable.title = value
  }

  updateDesc (value: string) {
    this.editable.description = value
  }

  updateBody (value: string) {
    this.editable.body = value
  }

  updateTagInput (value: string) {
    this.tagInput = value
  }

  addTag (value: string): void {
    if (value !== '') {
      this.tagInput = ''
      this.editable.tagList.push(value)
    }
  }

  async submit () {
    try {
      await this.$store.dispatch('createArticle', this.editable)
      this.$router.push('/')
    } catch (errors) {
      this.$store.commit('setErrors', errors)
    }
  }
}
</script>

<style>
</style>
