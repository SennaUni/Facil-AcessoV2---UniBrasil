import axios from 'axios';
import store from '../store';

export const api = axios.create({
    baseURL: "http://10.0.2.2:8080/api",
})

api.defaults.headers.common['Content-Type'] = 'application/json'

api.interceptors.request.use(
    async config => {
        const state = store.getState()

        if (state.auth.token) 
            config.headers.Authorization = `Bearer ${state.auth.token}`;

        return config;
    },
    error => Promise.reject(error)
)