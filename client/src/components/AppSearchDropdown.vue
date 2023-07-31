<script setup>
import { ref } from "vue";

const props = defineProps({
    placeholder: { type: String },
    modelValue: { type: String, required: true, default: "" },
    data: { type: Array, default: [] },
    name: { type: String },
    keys: { type: Array, default: [] },
    id: { type: String },
});

const isFocused = ref(false);

const reduceObject = (obj, path) => {
    return path.reduce((prev, key) => {
        return prev?.[key];
    }, obj);
};

const emit = defineEmits(["update:modelValue", "keyup"]);

function updateInput(event) {
    emit("update:modelValue", event.target.value);
}

function blured() {
    setTimeout(() => {
        isFocused.value = false;
    }, 180);
}

function clicked(option) {
    if (props.keys.length > 1) {
        const value = reduceObject(option, props.keys);
        emit("update:modelValue", value);
    } else {
        emit("update:modelValue", option[props.keys]);
    }
}
</script>

<template>
    <form>
        <div class="flex flex-col gap-4">
            <div class="relative w-full">
                <label
                    :for="name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >{{ name }}</label
                >
                <input
                    type="search"
                    :placeholder="placeholder"
                    :value="modelValue"
                    @input="updateInput"
                    @keyup="() => emit('keyup')"
                    @focus="() => (isFocused = true)"
                    @blur="blured"
                    class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                    required
                />
            </div>
            <div
                id="dropdown"
                class="w-full z-10 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700"
            >
                <ul
                    class="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdown-button"
                    v-if="data.length > 0 && isFocused"
                >
                    <li v-for="item in data" :key="item.id">
                        <button
                            @click="clicked(item)"
                            type="button"
                            class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            <span v-if="keys.length > 1">
                                {{ reduceObject(item, keys) }}
                            </span>
                            <span v-else>{{ item[keys] }}</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </form>
</template>
