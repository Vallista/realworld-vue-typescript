import axios from 'axios'
import JwtService from '../jwt.service'
import {LoginUser, RegisterUser, UpdateUser} from '../types'
import {ApiService} from "./util"

const apiService = new ApiService

const state = {
    errors: null,
    user: {},
    isAuth: !!JwtService.getToken()
}

const getters = {
    errors(state: any) {
        return state.errors
    },
    user(state: any) {
        return state.user
    },
    isAuth(state: any) {
        return state.isAuth
    }
}

const mutations = {
    setErrors(state : any, errors: any ) {
        state.errors = errors
    },

    setAuth(state: any, user: any) {
        state.isAuth = true
        state.user = user
        state.errors = {}
        JwtService.saveToken(state.user.token);
    },

    purgeAuth(state: any) {
        state.isAuth = false
        state.user = {}
        state.errors = {}
        JwtService.destroyToken()
    }
}

const actions = {

    async registerUser({ commit, dispatch }: any, userParams : RegisterUser) {
        const result = await apiService.post('/users/',{ "user": userParams } )
    },

    async loginUser({ commit } : any, userParams: LoginUser) {
        const result = await apiService.post('/users/login/', { "user": userParams } )
        commit('setAuth', result.data.user)
    },

    async updateUser({ commit } : any, userParams: UpdateUser) {
        const result = await apiService.put('/users/', { "user": userParams })
        commit('setAuth', result.data.user)
    },

    async getCurrentUser({ commit } : any) {
        const result = await apiService.get('/users/')
    },

    async checkAuth({commit}: any) {
        if (JwtService.getToken()) {
            axios.defaults.headers.common["Authorization"] = `Token ${JwtService.getToken()}`;
            try {
                const result = await apiService.get('/user/')
                commit('setAuth', result.data.user);
            } catch ({ response }) {
                commit('setErrors', response.data.errors);
            }
        } else {
            commit('purgeAuth');
        }
    },

    async logout({commit}: any) {
        commit('purgeAuth');
    },

    async getUserProfile({ commit } : any, username: string) {
        const result = await apiService.get(`/profile/${username}/`)
    },
}

export default {
    state,
    getters,
    actions,
    mutations
};
