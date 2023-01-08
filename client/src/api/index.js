import axios from 'axios'
import { store } from '../store'

const api = axios.create({
    baseURL: import.meta.env.SERVER_URL || "http://localhost:3100",
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': import.meta.env.SERVER_URL || "http://localhost:3100",
    }
})

export const signupUser = async (data) => await api.post('/api/signup', data)
export const loginUser = async (data) => await api.post('/api/login', data)
export const logoutUser = async () => await api.post('/api/logout')
export const getProfile = async () => await api.get('/api/profile')
export const refreshAccessToken = async (data) => { return await api.post('/api/refresh', data) }

export const getAllProducts = async () => await api.get('/api/products')

export const addToDbCart = async (data) => await api.post('/api/add-to-cart', data)
export const getDbCart = async () => await api.get('/api/cart')

api
    .interceptors
    .response
    .use(
        (response) => { return response; },
        (err) => {
            if (err.response.status === 401 && !err.response.data.refreshed) {

                const request = err.config

                async function refresh() {
                    const { auth } = store.getState()

                    try {
                        await refreshAccessToken({ _id: auth.user._id })
                        return instance.request(request)
                    } catch (error) {
                        console.log(error);
                        return error
                    }
                }
                refresh()
            }
        })