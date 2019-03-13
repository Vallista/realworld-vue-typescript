import {FeedTabObj} from '../types'
import {ApiService} from "./util"

const apiService = new ApiService

const state = {
    articles: [{}],
    articlesCount: 0,
    articleListIsLoading: false,
    tags: [],
    feedTabMenus: [
        {
            title: 'Your Feed',
            href: 'feed',
            isActive: false,
            isAuth: true,
        },
        {
            title: 'Global Feed',
            href: 'global',
            isActive: true,
            isAuth: false,
        }
    ]
}

const getters = {
    articles(state: any) {
        return state.articles
    },
    articleListIsLoading(state: any) {
        return state.articleListIsLoading
    },
    tagsList(state: any) {
        return state.tags
    },
    feedTabMenus(state: any) {
        return state.feedTabMenus
    }
}

const mutations = {
    clearArticles(state: any) {
        state.articles = [{}]
        state.articleListIsLoading = true
    },
    setArticles(state: any, payload: Array<object>) {
        state.articles = payload
        state.articleListIsLoading = false
    },
    setArticlesCount(state: any, payload: number) {
        state.articlesCount = payload
    },
    setTags(state: any, payload: Array<string>) {
        state.tags = payload
    },
    changeTab(state: any, payload: string) {
        state.feedTabMenus.forEach((menu: FeedTabObj) => {
            if (menu.href === payload) {
                menu.isActive = true
            } else {
                menu.isActive = false
            }
        })
    },
    addFeedTabMenu(state: any, payload: string) {
        let arr: Array<FeedTabObj> = []
        state.feedTabMenus.forEach((menu: FeedTabObj) => {
            menu.isActive = false
            if (!(menu.title.slice(0,1) === '#')) {
                arr.push(menu)
            }
        })
        arr.push({
            title: `# ${payload}`,
            href: payload,
            isActive: true,
            isAuth: false,
        })
        state.feedTabMenus = arr
    },
    changeArticle(state: any, {slug, favorited, favoritesCount}: any) {
        state.articles.forEach((article: any) => {
            if (article.slug === slug ) {
                article.favorited = favorited
                article.favoritesCount = favoritesCount
            }
        })
    },
}

const actions = {
    async getGlobalArticles({ commit }: any) {
        commit('clearArticles')
        const result = await apiService.get('/articles/')
        commit('setArticles', result.data.articles)
        commit('setArticlesCount', result.data.articlesCount)
    },

    async getFeedArticles({ commit }: any) {
        commit('clearArticles')
        const result = await apiService.get('/articles/feed/')
        commit('setArticles', result.data.articles)
        commit('setArticlesCount', result.data.articlesCount)
    },

    async getArticlesByFilter({ commit }: any, filter: Object) {
        commit('clearArticles')
        const result = await apiService.get('/articles/',  { params: filter })
        commit('setArticles', result.data.articles)
        commit('setArticlesCount', result.data.articlesCount)
    },

    async getTags({ commit }: any) {
        const result = await apiService.get('/tags/')
        commit('setTags', result.data.tags)
    },

}

export default {
    state,
    getters,
    actions,
    mutations
};
