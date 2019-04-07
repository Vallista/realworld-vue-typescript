import {ApiService} from "./util"
import {Article, CommentData} from "../types";

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
    setArticle(state: any, article: Article) {
        state.article = article
    },
    setComments(state: any, comments: Array<CommentData>) {
        state.commentList = comments
    },
}

const actions = {
    async getArticle({commit}: any, slug: string) {
        const result = await apiService.get(`/articles/${slug}`)
        commit('setArticle', result.data.article)
        return result.data.article
    },

    async createArticle({commit}: any, article: Article) {
        try {
            const result = await apiService.post('/articles/', { article })
        } catch ({ response }){
            throw response.data.errors
        }
    },

    async updateArticle({commit}: any, { slug, article }: any) {
        const result = await apiService.put(`/articles/${slug}`, { article })
        return result.data.article
    },

    async deleteArticle({commit}: any, slug: string) {
        try {
            const result = await apiService.delete(`/articles/${slug}`)
        } catch {
            throw false
        }
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
        commit('changeArticle', result.data.article)
    },

    async unfavoriteArticle({commit}: any, slug: string) {
        const result = await apiService.delete(`/articles/${slug}/favorite`)
        commit('setArticle', result.data.article)
        commit('changeArticle', result.data.article)
    },

}

export default {
    state,
    getters,
    actions,
    mutations
};
