import axios from 'axios'
const getBaseURL = 'http://localhost:8080'

const axiosParams = {
    baseURL: getBaseURL(),
    headers: { 'Content-type': 'application/json' },
}

const axiosInstance = axios.create(axiosParams);

const api = (axios) => {
    return {
        get: (url, config) => axios.get(url, config),
        post: (url, config, body) => axios.get(url, body, config),
        put: (url, config, body) => axios.get(url, body, config),
        delete: (url, config) => axios.get(url, config)
    }
}

export default api(axiosInstance)