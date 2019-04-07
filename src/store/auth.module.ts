import axios from 'axios'
import JwtService from '../jwt.service'
import {LoginUser, RegisterUser, UpdateUser} from '../types'

const state = {
    errors: null,
    user: {},
    isAuth: !!JwtService.getToken()
}

const getters = {

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

    async registerUser({ commit, dispatch } : any, userParams : RegisterUser) {
        const result = await axios.post('https://conduit.productionready.io/api/users',{ "user": userParams } )
    },

    async loginUser({ commit } : any, userParams: LoginUser) {
        const result = await axios.post('https://conduit.productionready.io/api/users/login', { "user": userParams } )
        commit('setAuth', result.data.user)
    },

    async updateUser({ commit } : any, userParams: UpdateUser) {
        const result = await axios.put('https://conduit.productionready.io/api/users', { "user": userParams })
        commit('setAuth', result.data.user)
    },

    async getCurrentUser({ commit } : any) {
        // result returns the User
        const result = await axios.get('https://conduit.productionready.io/api/users')
    },

    async checkAuth({commit}: any) {
        if (JwtService.getToken()) {
            axios.defaults.headers.common["Authorization"] = `Token ${JwtService.getToken()}`;
            try {
                const result = await axios.get('https://conduit.productionready.io/api/user')
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
        const result = await axios.get(`https://conduit.productionready.io/api/profile${username}`)
    },
}

export default {
    state,
    getters,
    actions,
    mutations
};
