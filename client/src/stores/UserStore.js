import { defineStore } from "pinia";
import { verifyAccessToken } from '../api/login.api'

export const useUserStore = defineStore('UserStore', {
    state: () => {
        return {
            name: null,
            email: null,
            upi: null,
            phone: null,
            error: null,
            isLoggedIn: false
        }
    },

    getters: {
        getName: (state) => state.name,
        getEmail: (state) => state.email,
        getUpi: (state) => state.upi,
        getPhone: (state) => state.phone,
        getError: (state) => state.error,
        getIsLoggedIn: (state) => state.isLoggedIn
    },

    actions: {
        setUserDetails(details) {
            this.name = details.name
            this.email = details.email
            this.upi = details.upi
            this.phone = details.phone
        },

        setLoggedIn() {
            this.isLoggedIn = true
        },

        async verifyAccessToken() {
            try {
                const accessToken = localStorage.getItem('accessToken')
                const user = await verifyAccessToken({ accessToken })

                this.setUserDetails(user.data)
                this.setLoggedIn()
            } catch (err) {
                this.error = err.response.data.error
            }
        }
    },
})