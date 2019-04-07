import {ApiService} from "./util"

const apiService = new ApiService

const state = {
    currentProfile: {}
}

const getters = {

}

const mutations = {
    setProfile(state: any, profile?: object) {
        state.currentProfile = profile
    },
}

const actions = {
    async getProfile({commit}: any, username: string) {
        const result = await apiService.get(`/profiles/${username}`)
        commit('setProfile', result.data.profile)
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
