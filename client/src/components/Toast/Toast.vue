<script setup>
import InfoIcon from "./InfoIcon.vue";
const toastTypes = {
    info: "text-blue-800 bg-blue-50 dark:text-blue-400",
    success: " text-red-800 bg-red-50 dark:text-red-400",
    warn: "ext-green-800 bg-green-50 dark:text-green-400",
    error: "xt-yellow-800 bg-yellow-50 dark:text-yellow-300",
    default: "text-gray-800 bg-gray-50 dark:text-gray-300",
};
</script>

<template>
    <div class="grid">
        <div
            class="flex items-center p-4 mb-4 text-sm rounded-lg dark:bg-gray-800 text-blue-800 bg-blue-50 dark:text-blue-400"
            role="alert"
        >
            <InfoIcon />
            <span class="sr-only">Info</span>
            <div>
                <span class="font-medium">Info alert!</span> Change a few things
                up and try submitting again.
            </div>
        </div>
        <div
            class="flex items-center p-4 mb-4 text-sm rounded-lg dark:bg-gray-800 text-red-800 bg-red-50 dark:text-red-400"
            role="alert"
        >
            <InfoIcon />
            <span class="sr-only">Info</span>
            <div>
                <span class="font-medium">Danger alert!</span> Change a few
                things up and try submitting again.
            </div>
        </div>
        <div
            class="flex items-center p-4 mb-4 text-sm rounded-lg dark:bg-gray-800 ext-green-800 bg-green-50 dark:text-green-400"
            role="alert"
        >
            <InfoIcon />
            <span class="sr-only">Info</span>
            <div>
                <span class="font-medium">Success alert!</span> Change a few
                things up and try submitting again.
            </div>
        </div>
        <div
            class="flex items-center p-4 mb-4 text-sm rounded-lg dark:bg-gray-800 xt-yellow-800 bg-yellow-50 dark:text-yellow-300"
            role="alert"
        >
            <InfoIcon />
            <span class="sr-only">Info</span>
            <div>
                <span class="font-medium">Warning alert!</span> Change a few
                things up and try submitting again.
            </div>
        </div>
        <div
            class="flex items-center p-4 text-sm rounded-lg dark:bg-gray-800 text-gray-800 bg-gray-50 dark:text-gray-300"
            role="alert"
        >
            <InfoIcon />
            <span class="sr-only">Info</span>
            <div>
                <span class="font-medium">Dark alert!</span> Change a few things
                up and try submitting again.
            </div>
        </div>
    </div>
</template>
