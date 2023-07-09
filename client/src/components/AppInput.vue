<script setup lang="ts">
import { PropType } from "vue";

type TInput = "email" | "password" | "number" | "date" | "search";

const props = defineProps({
    modelValue: { type: String, required: true, default: "" },
    inputType: { type: String as PropType<TInput>, default: "text" },
    name: { type: String, required: true },
    id: { type: String, required: true },
    placeholder: { type: String },
    required: { type: Boolean },
});

const emit = defineEmits(["update:modelValue"]);

function updateInput(event: any) {
    emit("update:modelValue", event.target.value);
}
</script>

<template>
    <div>
        <label :for="name" class="label-field">{{ name }}</label>
        <input
            class="input-field"
            :type="inputType"
            :name="name"
            :id="id"
            :placeholder="placeholder"
            :required="required"
            :value="modelValue"
            @input="updateInput"
        />
    </div>
</template>

<style scoped>
.input-field {
    @apply bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500;
}

.label-field {
    @apply block mb-2 text-sm font-medium text-gray-900 dark:text-white;
}

input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type="number"] {
    -moz-appearance: textfield;
}
</style>