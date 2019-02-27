import axios from 'axios'
import {FeedTabObj, HomeState} from '../types'

const state: HomeState = {
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
    articlesList(state: HomeState) {
        return state.articles
    },
    tagsList(state: HomeState) {
        return state.tags
    }
}

const mutations = {
    clearArticles(state: HomeState) {
        state.articles = [{}]
        state.articleListIsLoading = true
    },
    setArticles(state: any, payload: Array<object>) {
        state.articles = payload
        state.articleListIsLoading = false
    },
    setArticlesCount(state: HomeState, payload: number) {
        state.articlesCount = payload
    },
    setTags(state: HomeState, payload: Array<string>) {
        state.tags = payload
    },
    changeFeedTabMenus(state: HomeState, payload: string) {
        state.feedTabMenus.forEach((menu: FeedTabObj) => {
            if (menu.href === payload) {
                menu.isActive = true
            } else {
                menu.isActive = false
            }
        })
    },
    addFeedTabMenu(state: HomeState, payload: string) {
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
    }
}

const actions = {
    async getGlobalArticles({ commit }: any) {
        commit('clearArticles')
        const result = await axios.get('https://conduit.productionready.io/api/articles')
        commit('setArticles', result.data.articles)
        commit('setArticlesCount', result.data.articlesCount)
    },
    async getFeedArticles({ commit }: any) {
        commit('clearArticles')
        const result = await axios.get('https://conduit.productionready.io/api/articles/feed')
        commit('setArticles', result.data.articles)
        commit('setArticlesCount', result.data.articlesCount)
    },
    async getArticlesByFilter({ commit }: any, filter: Object) {
        commit('clearArticles')
        const result = await axios.get('https://conduit.productionready.io/api/articles', { params: filter })
        commit('setArticles', result.data.articles)
        commit('setArticlesCount', result.data.articlesCount)
    },
    async getTags({ commit }: any) {
        const result = await axios.get('https://conduit.productionready.io/api/tags')
        commit('setTags', result.data.tags)
    },
    changeTab({commit}: any, tabName: String ) {
        commit('changeFeedTabMenus', tabName)
    },
    changeTabByTag({ commit }: any, tagName: String ) {
        commit('addFeedTabMenu', tagName)
    }
}

export default {
    state,
    getters,
    actions,
    mutations
};
