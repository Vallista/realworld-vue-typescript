import {ApiService} from "./util"

const apiService = new ApiService

const state = {
}

const getters = {
}

const mutations = {
}

const actions = {
    async getProfile({commit}: any, username: string) {
        try {
            const result = await apiService.get(`/profiles/${username}`)
            return result.data.profile
        } catch ({response}) {
            throw response
        }
    },
    async followUser({commit}: any, username: string) {
        const result = await apiService.post(`/profiles/${username}/follow`)
        commit('setProfile', result.data.profile)
    },
    async unfollowUser({commit}: any, username: string) {
        const result = await apiService.delete(`/profiles/${username}/follow`)
        commit('setProfile', result.data.profile)
    },
}

export default {
    state,
    getters,
    actions,
    mutations
};
