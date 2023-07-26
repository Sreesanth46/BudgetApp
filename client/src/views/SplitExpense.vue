<script setup>
import { reactive } from "vue";
import { useExpenseSplitStore } from "@stores/ExpenseSplitStore";
import Loader from "@components/Loader.vue";
import AppInput from "@components/AppInput.vue";
import AppButton from "@components/AppButton.vue";
import DeleteIcon from "@icons/DeleteIcon.vue";
import { STATUSES } from "@/utils/globals";
import { resetForm } from "@/utils/helpers";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

const router = useRouter();
const ExpenseSplitStore = useExpenseSplitStore();
const { getExpenseSplitStatus } = storeToRefs(ExpenseSplitStore);
const props = defineProps(["expenseId"]);

const expenseSplitForm = reactive({
    expenseId: props.expenseId,
    splits: [
        {
            groupMemberId: "",
            splitAmount: "",
            expenseId: props.expenseId,
        },
    ],
});

function addNewSplit() {
    expenseSplitForm.splits.push({
        groupMemberId: "",
        splitAmount: "",
        expenseId: props.expenseId,
    });
}

function deleteSplit(index) {
    expenseSplitForm.splits.splice(index, 1);
    if (index === 0) this.addNewSplit();
}

async function handleSubmit() {
    await ExpenseSplitStore.createExpenseSplit(expenseSplitForm);
    resetForm(expenseSplitForm);
    if (getExpenseSplitStatus == STATUSES.SUCCESS)
        router.push({ name: "Expenses" });
}
</script>

<template>
    <div>
        <h1
            class="mb-4 text-lg leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
        >
            Split Expense
        </h1>
        <form
            @submit.prevent="handleSubmit()"
            class="space-y-4 md:space-y-4 w-1/2 p-6"
        >
            <AppInput
                :id="`expense-id-input`"
                :name="`Expense Id`"
                v-model="expenseSplitForm.expenseId"
                required
                disabled
            />
            <div v-for="(split, index) in expenseSplitForm.splits">
                <div :key="index" class="flex items-center w-full">
                    <div class="w-full place-self-start">
                        <AppInput
                            :id="`expense-split-member-${index}`"
                            :name="`Group Member`"
                            v-model="split.groupMemberId"
                            required
                        />
                        <AppInput
                            :id="`expense-split-amount-${index}`"
                            :name="`Split Amount`"
                            v-model="split.splitAmount"
                            required
                        />
                    </div>
                    <DeleteIcon
                        v-if="
                            expenseSplitForm.splits.length > 1 ||
                            split.groupMemberId.length > 0 ||
                            split.splitAmount.length > 0
                        "
                        @click="deleteSplit(index)"
                        class="w-6 h-6 mx-4 hover:text-red-600"
                    />
                </div>
            </div>
            <AppButton :type="`button`" @click="addNewSplit()"
                >New row</AppButton
            >
            <AppButton>Save</AppButton>
        </form>
        <Loader v-if="getExpenseSplitStatus === STATUSES.LOADING" />
    </div>
</template>
