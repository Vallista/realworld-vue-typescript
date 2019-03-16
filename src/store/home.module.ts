import {Article, ArticleFilter, Articles, TabItem} from '../types'
import {ApiService} from "./util"

const apiService = new ApiService

const state = {
}

const getters = {
}

const mutations = {
    changeArticle(state: any, payload: Article) {
        state.articles.forEach((article: any) => {
            if (article.slug === payload.slug ) {
                article.favorited = payload.favorited
                article.favoritesCount = payload.favoritesCount
            }
        })
    },
}

const actions = {
    async getGlobalArticles({ commit }: any) {
        const result = await apiService.get('/articles/')
        return result.data
    },

    async getFeedArticles({ commit }: any) {
        const result = await apiService.get('/articles/feed/')
        return result.data
    },

    async getArticlesByFilter({ commit }: any, filter: ArticleFilter) {
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
