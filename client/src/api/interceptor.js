import { refreshAccessToken } from './login.api';
import { useUserStore } from '@stores/UserStore'
const publicRoutes = ['register', 'signup', 'login']

const interceptor = (axios) => {
    axios.interceptors.request.use((config) => {

        if (publicRoutes.includes(config.url)) return config;

        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers["authorization"] = `Bearer ${accessToken}`;
        }
        return config;

    }, (error) => {
        return Promise.reject(error);
    });

    axios.interceptors.response.use((res) => {
        return res;
    }, async (err) => {
        const originalRequest = err.config;
        if (err.response.status === 401 && err.response.data?.errorCode !== 5000 && !originalRequest._retry) {
            try {
                const refreshToken = { refreshToken: localStorage.getItem('refreshToken') }
                if (!refreshToken) return Promise.reject(err)

                const res = await refreshAccessToken({ refreshToken })
                const { accessToken } = res.data
                localStorage.setItem('accessToken', accessToken);

                originalRequest._retry = true
                axios.default.headers.common["Authorization"] = "Bearer " + accessToken
                return interceptor(originalRequest)

            } catch (_error) {
                const userStore = useUserStore();
                userStore.reset();
                localStorage.clear();
                return Promise.reject(err);
            }
        } else if (err.response.data?.errorCode === 5000) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
        }

        return Promise.reject(err);
    })
}

export default interceptor;