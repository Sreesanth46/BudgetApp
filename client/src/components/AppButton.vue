<script setup>
const props = defineProps({
    type: { type: String, default: "submit" },
    disabled: { type: Boolean, default: false },
});
</script>

<template>
    <button
        :type="type"
        :disabled="disabled"
        :class="{ 'bg-slate-300 hover:bg-slate-300': disabled }"
        class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
    >
        <slot></slot>
    </button>
</template>
