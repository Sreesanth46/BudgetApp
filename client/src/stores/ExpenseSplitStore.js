import { defineStore } from "pinia";
import { ERROR_TIMEOUT, STATUSES } from '@/utils/globals'
import { createExpenseSplit, verifyAsPaid } from '../api/expenseSplit.api';

export const useExpenseSplitStore = defineStore('ExpenseSplitStore', {
    state: () => {
        return {
            error: null,
            expenseSplit: null,
            status: STATUSES.PENDING
        }
    },

    getters: {
        getExpenseSplits: (state) => state.expenseSplit,
        getExpenseSplitStatus: (state) => state.status,
    },

    actions: {

        async createExpenseSplit(form) {
            try {
                this.status = STATUSES.LOADING
                await createExpenseSplit(form)
                this.status = STATUSES.SUCCESS

            } catch (err) {
                this.setError(err)
            }
        },


        async verifyAsPaid(id) {
            try {
                this.status = STATUSES.LOADING
                await verifyAsPaid(id)
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