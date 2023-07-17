<script setup>
import { onMounted, reactive } from "vue";
import { storeToRefs } from "pinia";
import { useGroupStore } from "@/stores/GroupStrore";
import AppInput from "@/components/AppInput.vue";
import AppTable from "@/components/AppTable.vue";
import Loader from "@/components/Loader.vue";
import { STATUSES } from "@/utils/globals";
import AppButton from "@/components/AppButton.vue";
import { resetForm } from "@/utils/helpers";

const GroupStore = useGroupStore();

onMounted(() => {
    GroupStore.fetchGroups();
});

const { getGroupStatus, getGroups } = storeToRefs(GroupStore);

const groupform = reactive({
    name: "",
});

async function handleSubmit() {
    await GroupStore.createGroups(groupform);
    resetForm(groupform);
}

const keyValue = ["id", "name", "status", "createdAt"];
</script>

<template>
    <div class="">
        <div class="">
            <h4>Create a new group</h4>
            <form
                @submit.prevent="handleSubmit()"
                class="space-y-4 md:space-y-4"
            >
                <AppInput
                    :id="`group-name-input`"
                    v-model="groupform.name"
                    :name="`Group name`"
                    required
                />
                <AppButton> Create </AppButton>
            </form>
        </div>
        <div class="">
            <h3>List groups</h3>
            <AppTable :headers="keyValue" :keys="keyValue" :data="getGroups" />
        </div>
        <Loader v-if="getGroupStatus === STATUSES.LOADING" />
    </div>
</template>