import { defineStore } from "pinia";
import { addMember, listMemberByGroup, deleteMember } from '@/api/groupMember.api'
import { ERROR_TIMEOUT, STATUSES } from '@/utils/globals'

export const useGroupMemberStore = defineStore('GroupMemberStore', {
    state: () => {
        return {
            error: null,
            groupMembers: [],
            status: STATUSES.PENDING
        }
    },

    getters: {
        getGroupMemberStatus: (state) => state.status,
        getGroupMemberError: (state) => state.error,
        getMemberList: (state) => state.groupMembers
    },

    actions: {
        async addMembers(form) {
            try {
                this.status = STATUSES.LOADING
                await addMember(form)
                this.status = STATUSES.SUCCESS

            } catch (err) {
                this.setError(err)
            }
        },

        async fetchGroupMembers(groupId) {
            try {
                this.status = STATUSES.LOADING
                const res = await listMemberByGroup(groupId)
                this.groupMembers = res.data
                this.status = STATUSES.SUCCESS

            } catch (err) {
                this.setError(err)
            }
        },

        async deleteMember(id) {
            try {
                this.status = STATUSES.LOADING
                await deleteMember(id)
                this.status = STATUSES.SUCCESS

            } catch (err) {
                this.setError(err)
            }
        },

        setError(err) {
            this.status = STATUSES.ERROR
            this.error = err.response.data.message
            setTimeout(() => { this.status = STATUSES.PENDING }, ERROR_TIMEOUT)
        },
    },
})