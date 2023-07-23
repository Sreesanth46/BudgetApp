<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useGroupStore } from "@stores/GroupStrore";
import AppTable from "@components/AppTable.vue";
import Loader from "@components/Loader.vue";
import CashRegisterIcon from "@icons/CashRegisterIcon.vue";
import DeleteIcon from "@icons/DeleteIcon.vue";
import { STATUSES } from "@/utils/globals";
import AppButton from "@components/AppButton.vue";

const GroupStore = useGroupStore();

onMounted(() => {
    GroupStore.fetchGroups();
});

const { getGroupStatus, getGroups } = storeToRefs(GroupStore);

const keyValue = ["id", "name", "status", "createdAt"];
</script>

<template>
    <div class="">
        <div class="flex justify-between">
            <h1
                class="mb-4 text-lg leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
            >
                Groups
            </h1>
            <div>
                <router-link :to="{ name: 'Create Group' }">
                    <AppButton>New Group</AppButton>
                </router-link>
            </div>
        </div>
        <div class="">
            <AppTable :headers="keyValue" :keys="keyValue" :data="getGroups">
                <template #th>
                    <th>Create Expense</th>
                    <th>Actions</th>
                </template>
                <template #td="{ item }">
                    <td class="mx-auto">
                        <router-link
                            :to="{
                                name: 'Create Expense',
                                params: { id: item.id },
                            }"
                        >
                            <CashRegisterIcon
                                class="w-6 h-6 mx-4 hover:text-blue-600"
                            />
                        </router-link>
                    </td>
                    <td>
                        <DeleteIcon
                            @click="GroupStore.deleteGroup(item.id)"
                            class="w-6 h-6 mx-4 hover:text-red-600"
                        />
                    </td>
                </template>
            </AppTable>
        </div>
        <Loader v-if="getGroupStatus === STATUSES.LOADING" />
    </div>
</template>
