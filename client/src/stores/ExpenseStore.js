import { defineStore } from "pinia";
import { createExpense, listExpenseByGroup, listAllExpense, updateExpense, deleteExpense } from "@/api/expense.api"
import { ERROR_TIMEOUT, STATUSES } from '@/utils/globals'

export const useExpenseStore = defineStore('ExpenseStore', {
    state: () => {
        return {
            error: null,
            expenses: null,
            selected: null,
            status: STATUSES.PENDING
        }
    },

    getters: {
        getExpenses: (state) => state.expenses,
        getExpenseStatus: (state) => state.status,
        getSelectedExpense: (state) => state.selected,
    },

    actions: {
        async fetchExpense() {
            try {
                this.status = STATUSES.LOADING
                const expenses = await listAllExpense()
                this.expenses = expenses.data
                this.status = STATUSES.SUCCESS

            } catch (err) {
                this.status = STATUSES.ERROR
                this.error = err.response.data.message
            }
        },

        async fetchExpenseByGroupId(groupId) {
            try {
                this.status = STATUSES.LOADING
                const expenses = await listExpenseByGroup(groupId)
                this.expenses = expenses.data
                this.status = STATUSES.SUCCESS

            } catch (err) {
                this.status = STATUSES.ERROR
                this.error = err.response.data.message
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
                this.error = err.response.data.message
            }
        },

        async updateExpense(form, id) {
            try {
                this.status = STATUSES.LOADING
                await updateExpense(form, id)
                await this.fetchExpense()
                this.status = STATUSES.SUCCESS

            } catch (err) {
                this.setError(err)
            }
        },

        async deleteExpense(id) {
            try {
                this.status = STATUSES.LOADING
                await deleteExpense(id)
                await this.fetchExpense()
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

        setSelectedExpense(data) {
            this.selected = data
        }
    },
})