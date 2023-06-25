import axios from 'axios'
const getBaseURL = 'http://localhost:8080'

const axiosParams = {
    baseURL: getBaseURL,
    headers: { 'Content-type': 'application/json' },
}

const axiosInstance = axios.create(axiosParams);

const api = (axios) => {
    return {
        get: (url, config) => axios.get(url, config),
        post: (url, body, config) => axios.post(url, body, config),
        put: (url, body, config) => axios.put(url, body, config),
        delete: (url, config) => axios.delete(url, config)
    }
}

export default api(axiosInstance)