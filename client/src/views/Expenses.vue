<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useExpenseStore } from "@stores/ExpenseStore";
import AppTable from "@components/AppTable.vue";
import Loader from "@components/Loader.vue";
import { STATUSES } from "@/utils/globals";
import DeleteIcon from "@icons/DeleteIcon.vue";
import EditIcon from "@icons/EditIcon.vue";
import { useRouter } from "vue-router";
import SplitIcon2 from "@/icons/SplitIcon2.vue";

const router = useRouter();
const ExpensesStore = useExpenseStore();
const { getExpenses, getExpenseStatus } = storeToRefs(ExpensesStore);

onMounted(() => {
    ExpensesStore.fetchExpense();
});

function editExpense(item) {
    ExpensesStore.setSelectedExpense(item);
    router.push({ name: "Edit Expense" });
}

function splitExpense(id) {
    router.push({ name: "Split Expense", params: { id } });
}

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
        </div>
        <AppTable :headers="headers" :keys="keyValue" :data="getExpenses">
            <template #th>
                <th>Actions</th>
            </template>
            <template #td="{ item }">
                <td class="flex">
                    <DeleteIcon
                        @click="ExpensesStore.deleteExpense(item.id)"
                        class="w-6 h-6 mx-4 mt-2 hover:text-red-600"
                    />
                    <EditIcon
                        @click="editExpense(item)"
                        class="w-6 h-6 mx-4 mt-2 hover:text-blue-600"
                    />
                    <SplitIcon2
                        @click="splitExpense(item.id)"
                        class="w-6 h-6 mx-4 mt-2 hover:fill-blue-600"
                    />
                </td>
            </template>
        </AppTable>
        <Loader v-if="getExpenseStatus === STATUSES.LOADING" />
    </div>
</template>
