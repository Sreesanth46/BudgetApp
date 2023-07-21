<script setup>
import { onMounted, reactive } from "vue";
import { storeToRefs } from "pinia";
import { useExpenseStore } from "@/stores/ExpenseStore";
import AppTable from "@/components/AppTable.vue";
import Loader from "@/components/Loader.vue";
import { STATUSES } from "@/utils/globals";
import AppButton from "@/components/AppButton.vue";
import DeleteIcon from "@/icons/DeleteIcon.vue";

const ExpensesStore = useExpenseStore();
const { getExpenses, getExpenseStatus } = storeToRefs(ExpensesStore);

onMounted(() => {
    ExpensesStore.fetchExpense();
});

const headers = ["id", "name", "amount", "status", "Created At", "Created By"];

const keyValue = [
    "id",
    "name",
    "amount",
    "status",
    "createdAt",
    ["createdUser", "user", "name"],
];
</script>

<template>
    <div>
        <div class="flex justify-between">
            <h1
                class="mb-4 text-lg leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
            >
                Expense
            </h1>
            <div>
                <router-link :to="{ name: 'CreateExpense' }">
                    <AppButton>New Expense</AppButton>
                </router-link>
            </div>
        </div>
        <AppTable :headers="headers" :keys="keyValue" :data="getExpenses">
            <template #th> <th>Actions</th> </template>
            <template #td="tdProp">
                <td>
                    <DeleteIcon
                        @click="ExpensesStore.deleteExpense(tdProp.id)"
                        class="w-6 h-6 mx-4 hover:text-red-600"
                    />
                </td>
            </template>
        </AppTable>
        <Loader v-if="getExpenseStatus === STATUSES.LOADING" />
    </div>
</template>