<script setup>
import { STATES } from "@/utils/globals";
const props = defineProps(["headers", "data", "keys"]);

const reduceObject = (obj, path) => {
    return path.reduce((prev, key) => {
        return prev?.[key];
    }, obj);
};
</script>

<template>
    <div class="overflow-x-auto shadow-md sm:rounded-lg">
        <table
            class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
            <thead
                class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
                <tr>
                    <th
                        v-for="(header, i) in headers"
                        :key="i"
                        scope="col"
                        class="px-6 py-3"
                    >
                        {{ header }}
                    </th>
                    <slot name="th" />
                </tr>
            </thead>
            <tbody>
                <tr
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    v-for="(item, i) in data"
                    :key="i"
                >
                    <td v-for="(key, i) in keys" :key="i" class="px-6 py-4">
                        <span v-if="typeof key === 'object'">
                            {{ reduceObject(item, key) }}
                        </span>
                        <span v-else-if="key === 'status'">
                            {{ STATES[item[key]] }}
                        </span>
                        <span v-else>{{ item[key] }}</span>
                    </td>
                    <slot name="td" :item="item" />
                </tr>
            </tbody>
        </table>
    </div>
</template>

// TODO : figure out a way to remove the keys and use values only in both header and data