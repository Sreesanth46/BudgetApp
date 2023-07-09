import { defineStore } from "pinia";
import { createGroup, updateGroup, deleteGroup } from '@/api/group.api'
import { STATUSES } from '@/utils/globals'

export const useGroupStore = defineStore('GroupStore', {
    state: () => {
        return {
            error: null,
            expenses: null,
            status: STATUSES.PENDING
        }
    },

    getters: {
        getGroupStatus: (state) => state.status,
        getGroupError: (state) => state.error
    },

    actions: {
        async createGroups(form) {
            try {
                this.status = STATUSES.LOADING
                await createGroup(form)
                this.status = STATUSES.SUCCESS

            } catch (err) {
                this.status = STATUSES.ERROR
                this.error = err.response.data.error
            }
        },

        async updateGroups(form, id) {
            try {
                this.status = STATUSES.LOADING
                await updateGroup(form, id)
                this.status = STATUSES.SUCCESS

            } catch (err) {
                this.status = STATUSES.ERROR
                this.error = err.response.data.error
            }
        },

        async deleteGroups(id) {
            try {
                this.status = STATUSES.LOADING
                await deleteGroup(id)
                this.status = STATUSES.SUCCESS

            } catch (err) {
                this.status = STATUSES.ERROR
                this.error = err.response.data.error
            }
        },

        resetErrors() {
            setTimeout(() => {
                this.error = null
                this.status = STATUSES.PENDING
            }, 10000)
        }
    },
})