import {ApiService} from "./util"

const apiService = new ApiService

const state = {
    currentArticle: null,
    currentCommentsList: [{}],
}

const getters = {

}

const mutations = {
    setArticle(state: any, article?: object) {
        state.currentArticle = article
    },
    setComments(state: any, comments: any) {
        state.currentCommentsList = comments
    }
}

const actions = {
    async getArticle({commit}: any, slug: string) {
        const result = await apiService.get(`/articles/${slug}`)
        commit('setArticle', result.data.article)
    },

    async createArticle({commit}: any, article: object) {
        const result = await apiService.post('/articles/', { article })
    },

    async updateArticle({commit}: any, { slug, article }: any) {
        const result = await apiService.put(`/articles/${slug}`, { article })
    },

    async deleteArticle({commit}: any, slug: string) {
        const result = await apiService.delete(`/articles/${slug}`)
    },

    async createComment({commit}: any, { slug, comment }: any) {
        const result = await apiService.post(`/articles/${slug}/comments`, { comment } )
    },

    async getComments({commit}: any, slug: string) {
        const result = await apiService.get(`/articles/${slug}/comments`)
        commit('setComments', result.data.comments)
    },

    async deleteComment({commit, dispatch}: any, { slug, id }: any) {
        const result = await apiService.delete(`/articles/${slug}/comments/${id}`)
        dispatch('getComments', slug)
    },

    async favoriteArticle({commit}: any, slug: string) {
        const result = await apiService.post(`/articles/${slug}/favorite`)
        commit('setArticle', result.data.article)
    },

    async unfavoriteArticle({commit}: any, slug: string) {
        const result = await apiService.delete(`/articles/${slug}/favorite`)
        commit('setArticle', result.data.article)
    },

}

export default {
    state,
    getters,
    actions,
    mutations
};
