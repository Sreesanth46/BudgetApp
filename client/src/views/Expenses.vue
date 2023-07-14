<script setup>
import { onMounted, reactive } from "vue";
import { storeToRefs } from "pinia";
import { useExpenseStore } from "@/stores/ExpenseStore";
import AppTable from "@/components/AppTable.vue";
import Loader from "@/components/Loader.vue";
import { STATUSES } from "@/utils/globals";
import AppButton from "@/components/AppButton.vue";

const ExpensesStore = useExpenseStore();
const { getExpenses, getExpenseStatus } = storeToRefs(ExpensesStore);

onMounted(() => {
    ExpensesStore.fetchExpense();
});

const keyValue = ["id", "name", "amount", "status", "createdAt"];
</script>

<template>
    <div class="p-8">
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
        <AppTable :headers="keyValue" :keys="keyValue" :data="getExpenses" />
        <Loader v-if="getExpenseStatus === STATUSES.LOADING" />
    </div>
</template>