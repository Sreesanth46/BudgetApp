import { defineStore } from "pinia";
import { createGroup, listGroup, updateGroup, deleteGroup } from '@/api/group.api'
import { ERROR_TIMEOUT, STATUSES } from '@/utils/globals'

export const useGroupStore = defineStore('GroupStore', {
    state: () => {
        return {
            error: null,
            groups: null,
            status: STATUSES.PENDING
        }
    },

    getters: {
        getGroupStatus: (state) => state.status,
        getGroupError: (state) => state.error,
        getGroups: (state) => state.groups
    },

    actions: {
        async createGroups(form) {
            try {
                this.status = STATUSES.LOADING
                await createGroup(form)
                await this.fetchGroups()
                this.status = STATUSES.SUCCESS

            } catch (err) {
                this.status = STATUSES.ERROR
                this.error = err.response.data.message
            }
        },

        async fetchGroups() {
            try {
                this.status = STATUSES.LOADING
                const groups = await listGroup()
                this.groups = groups.data
                this.status = STATUSES.SUCCESS

            } catch (err) {
                this.status = STATUSES.ERROR
                this.error = err.response.data.message
            }
        },

        async updateGroup(form, id) {
            try {
                this.status = STATUSES.LOADING
                await updateGroup(form, id)
                await this.fetchGroups()
                this.status = STATUSES.SUCCESS

            } catch (err) {
                this.status = STATUSES.ERROR
                this.error = err.response.data.message
            }
        },

        async deleteGroup(id) {
            try {
                this.status = STATUSES.LOADING
                await deleteGroup(id)
                await this.fetchGroups()
                this.status = STATUSES.SUCCESS

            } catch (err) {
                this.status = STATUSES.ERROR
                this.error = err.response.data.message
            }
        },

        resetErrors() {
            setTimeout(() => {
                this.error = null
                this.status = STATUSES.PENDING
            }, ERROR_TIMEOUT)
        }
    },
})