<script setup>
import { reactive } from "vue";
import { resetForm } from "@/utils/helpers";
import { useExpenseStore } from "@/stores/ExpenseStore";
import AppInput from "@/components/AppInput.vue";
import AppButton from "@/components/AppButton.vue";

const ExpensesStore = useExpenseStore();

const expenseForm = reactive({
    name: "",
    amount: "",
    groupId: "",
});

async function handleSubmit() {
    await ExpensesStore.createExpense(expenseForm);
    resetForm(expenseForm);
}
</script>

<template>
    <div>
        <h1
            class="mb-4 text-lg leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
        >
            New Expense
        </h1>
        <form
            @submit.prevent="handleSubmit()"
            class="space-y-4 md:space-y-4 w-1/2 p-6"
        >
            <AppInput
                :id="`expense-name-input`"
                v-model="expenseForm.name"
                :name="`Expense name`"
                required
            />
            <AppInput
                :id="`expense-amount-input`"
                v-model="expenseForm.amount"
                :name="`Expense amount`"
                required
            />
            <AppInput
                :id="`expense-groupId-input`"
                v-model="expenseForm.groupId"
                :name="`Group ID`"
                required
            />
            <div class="flex justify-end">
                <div class="flex w-1/3">
                    <router-link :to="{ name: 'Expenses' }">
                        <AppButton
                            class="bg-slate-100 text-slate-800 hover:bg-slate-300"
                            :type="`button`"
                        >
                            Cancel
                        </AppButton>
                    </router-link>
                    <AppButton> Save </AppButton>
                </div>
            </div>
        </form>
    </div>
</template>