<script setup>
import { onMounted, reactive } from "vue";
import { storeToRefs } from "pinia";
import { useExpenseStore } from "@/stores/ExpenseStore";
import AppInput from "@/components/AppInput.vue";
import AppTable from "@/components/AppTable.vue";
import Loader from "@/components/Loader.vue";
import { STATUSES } from "@/utils/globals";
import AppButton from "@/components/AppButton.vue";
import { resetForm } from "@/utils/helpers";

const ExpensesStore = useExpenseStore();

onMounted(() => {
    ExpensesStore.fetchExpense();
});

const { getExpenses, getExpenseStatus } = storeToRefs(ExpensesStore);

const expenseForm = reactive({
    name: "",
    amount: "",
    groupId: "",
});

async function handleSubmit() {
    await ExpensesStore.createExpense(expenseForm);
    resetForm(expenseForm);
}

const keyValue = ["id", "name", "status", "createdAt"];
</script>

<template>
    <div class="">
        <h3>Expenses</h3>
        <div class="my-2 w-1/2">
            <h4>Create expense</h4>
            <form
                @submit.prevent="handleSubmit()"
                class="space-y-4 md:space-y-4"
            >
                <AppInput
                    :id="`expense-name-input`"
                    v-model="expenseForm.name"
                    :name="`Expense name`"
                />
                <AppInput
                    :id="`expense-amount-input`"
                    v-model="expenseForm.amount"
                    :name="`Expense amount`"
                />
                <AppInput
                    :id="`expense-groupId-input`"
                    v-model="expenseForm.groupId"
                    :name="`Group ID`"
                />
                <AppButton> Create </AppButton>
            </form>
        </div>
        <Loader v-if="getExpenseStatus === STATUSES.LOADING" />
    </div>
</template>