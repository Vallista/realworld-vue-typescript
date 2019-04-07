import axios from "axios";

export class ApiService {
    _api: string = 'https://conduit.productionready.io/api'

    get (path: string, params?: object) {
        if (params) {
            return axios.get(`${this._api}${path}`, params)
        } else {
            return axios.get(`${this._api}${path}`)
        }
    }
    post (path: string, data?: object) {
        return axios.post(`${this._api}${path}`, data)
    }
    put (path: string, data?: object) {
        return axios.put(`${this._api}${path}`, data)
    }
    delete (path: string) {
        return axios.delete(`${this._api}${path}`)
    }
}
