import { defineStore } from "pinia";
import { createExpense, listExpense, updateExpense, deleteExpense } from "@/api/expense.api"
import { STATUSES } from '@/utils/globals'

export const useExpenseStore = defineStore('ExpenseStore', {
    state: () => {
        return {
            error: null,
            expenses: null,
            status: STATUSES.PENDING
        }
    },

    getters: {
        getExpenses: (state) => state.expenses,
        getExpenseStatus: (state) => state.status,
    },

    actions: {
        async fetchExpense(groupId) {
            try {
                this.status = STATUSES.LOADING
                const expenses = await listExpense(groupId)
                this.expenses = expenses
                this.status = STATUSES.SUCCESS

            } catch (err) {
                this.status = STATUSES.ERROR
                this.error = err.response.data.error
            }
        },

        async createExpense(form) {
            try {
                this.status = STATUSES.LOADING
                await createExpense(form)
                await this.fetchExpense()
                this.status = STATUSES.SUCCESS

            } catch (err) {
                this.status = STATUSES.ERROR
                this.error = err.response.data.error
            }
        },

        async updateExpense(form, id) {
            try {
                this.status = STATUSES.LOADING
                await updateExpense(form, id)
                await this.fetchExpense()
                this.status = STATUSES.SUCCESS

            } catch (err) {
                this.status = STATUSES.ERROR
                this.error = err.response.data.error
            }
        },

        async deleteExpense(id) {
            try {
                this.status = STATUSES.LOADING
                await listExpense(id)
                await this.fetchExpense()
                this.status = STATUSES.SUCCESS

            } catch (err) {
                this.status = STATUSES.ERROR
                this.error = err.response.data.error
            }
        },
    },
})