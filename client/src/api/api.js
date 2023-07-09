import axios from 'axios'
import interceptor from '@/api/interceptor'
const BaseURL = import.meta.env.VITE_BASE_URL

const axiosParams = {
    baseURL: BaseURL,
    headers: { 'Content-type': 'application/json' },
}

const axiosInstance = axios.create(axiosParams);
interceptor(axiosInstance);

const api = (axios) => {
    return {
        get: (url, config) => axios.get(url, config),
        post: (url, body, config) => axios.post(url, body, config),
        put: (url, body, config) => axios.put(url, body, config),
        delete: (url, config) => axios.delete(url, config)
    }
}

export default api(axiosInstance)