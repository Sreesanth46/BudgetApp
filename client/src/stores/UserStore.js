import { defineStore } from "pinia";
import { verifyAccessToken } from '@/api/login.api'
import { signUp, register } from "@/api/register.api";
import { search, update } from "@/api/user.api";
import { ERROR_TIMEOUT, STATUSES } from "@/utils/globals";


const defaultState = {
    id: null,
    name: null,
    email: null,
    upi: null,
    phone: null,
    error: null,
    isLoggedIn: false,
    users: [],
    status: STATUSES.PENDING
}

export const useUserStore = defineStore('UserStore', {
    state: () => ({ ...defaultState }),

    getters: {
        getUId: (state) => state.id,
        getName: (state) => state.name,
        getEmail: (state) => state.email,
        getUpi: (state) => state.upi,
        getPhone: (state) => state.phone,
        getError: (state) => state.error,
        getIsLoggedIn: (state) => state.isLoggedIn,
        getStatus: (state) => state.status,
        getUserList: (state) => state.users,
    },

    actions: {
        setUserDetails(details) {
            this.id = details.uId || details.id;
            this.name = details.name
            this.email = details.email
            this.upi = details.upi
            this.phone = details.phone
        },

        setLoggedIn() {
            this.isLoggedIn = true
        },

        signOut() {
            this.reset()
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
        },

        async verifyAccessToken() {
            try {
                const accessToken = localStorage.getItem('accessToken')
                const user = await verifyAccessToken({ accessToken })

                this.setUserDetails(user.data)
                this.setLoggedIn()
            } catch (err) {
                this.error = err.response.data.message
            }
        },

        async register(form) {
            try {
                this.status = STATUSES.LOADING
                await register(form)
                this.status = STATUSES.SUCCESS
            } catch (err) {
                this.setError(err);
            }
        },

        async signUp(form, token) {
            try {
                this.status = STATUSES.LOADING
                await signUp(form, token)
                this.status = STATUSES.SUCCESS
            } catch (err) {
                this.setError(err);
            }
        },

        async searchUser(query) {
            try {
                this.status = STATUSES.LOADING
                const res = await search(query)
                this.users = res.data
                this.status = STATUSES.SUCCESS
            } catch (err) {
                this.setError(err);
            }
        },

        async updateUser(form) {
            try {
                this.status = STATUSES.LOADING
                await update(form)
                this.status = STATUSES.SUCCESS
            } catch (err) {
                this.setError(err);
            }
        },

        setError(err) {
            this.status = STATUSES.ERROR
            this.error = err.response.data.message
            setTimeout(() => { this.status = STATUSES.PENDING }, ERROR_TIMEOUT)
        },

        reset() {
            Object.assign(this, defaultState);
        }
    },
})