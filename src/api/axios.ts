import axios from 'axios';

export const api = axios.create({
    baseURL: "http://10.0.2.2:8080/api",
})

api.defaults.headers.common['Content-Type'] = 'application/json'

api.interceptors.request.use(
    async config => {
        return config;
    },
    error => Promise.reject(error)
)