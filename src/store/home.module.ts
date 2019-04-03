import {Article, ArticleFilter, Articles, TabItem} from '../types'
import {ApiService} from "./util"

const apiService = new ApiService

const state = {
}

const getters = {
}

const mutations = {
}

const actions = {
  async getFeedArticles({ commit }: any, filter?: ArticleFilter) {
    const result = await apiService.get('/articles/feed/', { params: filter })
    return result.data
  },

  async getArticles({ commit }: any, filter?: ArticleFilter) {
    const result = await apiService.get('/articles/',  { params: filter })
    return result.data
  },

  async getTags({ commit }: any) {
    const result = await apiService.get('/tags/')
    return result.data.tags
  },
}

export default {
  state,
  getters,
  actions,
  mutations
};
