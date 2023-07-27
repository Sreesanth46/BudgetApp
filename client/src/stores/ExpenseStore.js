import { defineStore } from "pinia";
import { createExpense, listExpenseByGroup, findExpenseById, listAllExpense, updateExpense, deleteExpense } from "@/api/expense.api"
import { ERROR_TIMEOUT, STATUSES } from '@/utils/globals'

export const useExpenseStore = defineStore('ExpenseStore', {
    state: () => {
        return {
            error: null,
            expenses: null,
            expenseById: null,
            selected: null,
            status: STATUSES.PENDING
        }
    },

    getters: {
        getExpenses: (state) => state.expenses,
        getExpenseStatus: (state) => state.status,
        getSelectedExpense: (state) => state.selected,
        getExpenseById: (state) => state.expenseById
    },

    actions: {
        async fetchExpense() {
            try {
                this.status = STATUSES.LOADING
                const res = await listAllExpense()
                this.expenses = res.data
                this.status = STATUSES.SUCCESS

            } catch (err) {
                this.setError(err)
            }
        },

        async fetchExpenseByGroupId(groupId) {
            try {
                this.status = STATUSES.LOADING
                const res = await listExpenseByGroup(groupId)
                this.expenses = res.data
                this.status = STATUSES.SUCCESS

            } catch (err) {
                this.setError(err)
            }
        },

        async fetchExpenseById(id) {
            try {
                this.status = STATUSES.LOADING
                const res = await findExpenseById(id)
                this.expenseById = res.data
                this.status = STATUSES.SUCCESS

            } catch (err) {
                this.setError(err)
            }
        },

        async createExpense(form) {
            try {
                this.status = STATUSES.LOADING
                await createExpense(form)
                await this.fetchExpense()
                this.status = STATUSES.SUCCESS

            } catch (err) {
                this.setError(err)
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