import { refreshAccessToken } from './login.api';
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
        console.log(err.response);
        if (err.response.status === 401 && err.response.data?.errorCode !== 5000) {
            try {
                const refreshToken = { refreshToken: localStorage.getItem('refreshToken') }
                if (!refreshToken) return Promise.reject(err)

                const res = await refreshAccessToken({ refreshToken })
                localStorage.setItem('accessToken', res.data.accessToken);

            } catch (_error) {
                return Promise.reject(err);
            }
        } else {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
        }

        return Promise.reject(err);
    })
}

export default interceptor;