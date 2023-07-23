<script setup>
import { onMounted, onUnmounted, reactive } from "vue";
import { resetForm } from "@/utils/helpers";
import { useExpenseStore } from "@/stores/ExpenseStore";
import AppInput from "@/components/AppInput.vue";
import AppButton from "@/components/AppButton.vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";

const route = useRoute();
const router = useRouter();
const ExpensesStore = useExpenseStore();
const { getSelectedExpense, getExpenses } = storeToRefs(ExpensesStore);

const props = defineProps(["groupId"]);

onMounted(() => {
    if (isEditing()) {
        expenseForm.name = getSelectedExpense.value.name;
        expenseForm.amount = String(getSelectedExpense.value.amount);
        expenseForm.groupId = String(getSelectedExpense.value.groupId);
    }
});

onUnmounted(() => {
    ExpensesStore.setSelectedExpense(null);
});

function isEditing() {
    return route.name == "Edit Expense";
}

const expenseForm = reactive({
    name: "",
    amount: "",
    groupId: props.groupId,
});

async function handleSubmit() {
    if (isEditing()) {
        await ExpensesStore.updateExpense(
            expenseForm,
            getSelectedExpense.value.id
        );
    } else {
        await ExpensesStore.createExpense(expenseForm);
    }
    router.push({ name: "Expenses" });
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
                disabled
            />
            <div class="flex justify-end">
                <div class="flex gap-2">
                    <router-link :to="{ name: 'Groups' }">
                        <AppButton
                            class="bg-slate-200 text-slate-800 hover:bg-red-500"
                            :type="`button`"
                        >
                            Cancel
                        </AppButton>
                    </router-link>
                    <AppButton>
                        {{ isEditing() ? "Update" : "Save" }}
                    </AppButton>
                </div>
            </div>
        </form>
    </div>
</template>
