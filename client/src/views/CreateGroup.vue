<script setup>
import { reactive } from "vue";
import { storeToRefs } from "pinia";
import { useGroupStore } from "@/stores/GroupStrore";
import AppInput from "@/components/AppInput.vue";
import Loader from "@/components/Loader.vue";
import { STATUSES } from "@/utils/globals";
import AppButton from "@/components/AppButton.vue";
import { resetForm } from "@/utils/helpers";
import { useRouter } from "vue-router";

const router = useRouter();
const GroupStore = useGroupStore();

const { getGroupStatus } = storeToRefs(GroupStore);

const groupform = reactive({
    name: "",
});

async function handleSubmit() {
    await GroupStore.createGroups(groupform);
    resetForm(groupform);
    router.push({name: 'Groups'})
}
</script>

<template>
    <div>
        <h1
            class="mb-4 text-lg leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
        >
            New Group
        </h1>
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
        <Loader v-if="getGroupStatus === STATUSES.LOADING" />
    </div>
</template>