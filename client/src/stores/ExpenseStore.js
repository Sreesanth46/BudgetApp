import { defineStore } from "pinia";
import { listExpense } from "@/api/expense.api"

export const useExpenseStore = defineStore('ExpenseStore', {
    state: () => {
        return {
            error: null,
            expenses: null
        }
    },

    getters: {},

    actions: {
        async fetchExpense(groupId) {
            try {
                const expenses = await listExpense(groupId)
                this.expenses = expenses
            } catch (err) {
                this.error = err.response.data.error
            }
        }
    },
})