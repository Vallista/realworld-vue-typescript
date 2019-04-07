import {ApiService} from "./util"

const apiService = new ApiService

const state = {
    article: {
        slug: '',
        title: '',
        description: '',
        body: '',
        tagList: [''],
        createdAt: '',
        updatedAt: '',
        favorited: false,
        favoritesCount: 0,
        author: {
            username: '',
            bio: '',
            image: '',
            following: false
        }
    },
    commentList: [{
        id: 0,
        createdAt: '',
        updatedAt: '',
        body: '',
        author: {
            username: '',
            bio: '',
            image: '',
            following: false
        }
    }],
}

const getters = {
    article(state?: any) {
        return state.article
    },
    commentList(state?: any) {
        return state.commentList
    }
}

const mutations = {
    setArticle(state: any, article?: object) {
        state.article = article
    },
    setComments(state: any, comments: any) {
        state.commentList = comments
    },
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

    async favoriteArticle({commit, rootState}: any, slug: string) {
        const result = await apiService.post(`/articles/${slug}/favorite`)
        commit('setArticle', result.data.article)
        commit('changeArticle', {
            slug: result.data.article.slug,
            favorited: result.data.article.favorited,
            favoritesCount: result.data.article.favoritesCount,
        })
    },

    async unfavoriteArticle({commit}: any, slug: string) {
        const result = await apiService.delete(`/articles/${slug}/favorite`)
        commit('setArticle', result.data.article)
        commit('changeArticle', {
            slug: result.data.article.slug,
            favorited: result.data.article.favorited,
            favoritesCount: result.data.article.favoritesCount,
        })
    },

}

export default {
    state,
    getters,
    actions,
    mutations
};
