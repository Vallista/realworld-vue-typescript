import {ApiService} from "./util"
import {Profile, FeedTabObj} from "../types"

const apiService = new ApiService

const state = {
    currentProfile: {
        username: '',
        bio: '',
        image: '',
        following: false,
    },
    profileFeedTabMenus: [
        {
            title: 'My Articles',
            href: 'my',
            isActive: true,
            isAuth: false,
        },
        {
            title: 'Favorited Articles',
            href: 'favorited',
            isActive: false,
            isAuth: false,
        }
    ]
}

const getters = {
    currentProfile (state: any): Profile {
        return state.currentProfile
    },
    profileFeedTabMenus (state: any): Array<FeedTabObj> {
        return state.profileFeedTabMenus
    },
}

const mutations = {
    setProfile (state: any, profile: Profile) {
        state.currentProfile = profile
    },
    changeProfileTab(state: any, payload: string) {
        state.profileFeedTabMenus.forEach((menu: FeedTabObj) => {
            if (menu.href === payload) {
                menu.isActive = true
            } else {
                menu.isActive = false
            }
        })
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
