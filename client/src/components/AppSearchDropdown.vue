<script setup>
import { ref } from "vue";

const props = defineProps({
    id: { type: String },
    name: { type: String },
    options: { type: Array, default: [] },
    required: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    valueKeys: { type: Array, default: ["id"] },
    optionKeys: { type: Array, default: [] },
    modelValue: { type: String, required: true, default: "" },
    placeholder: { type: String },
});

const isFocused = ref(false);
const searchData = ref("");

const reduceObject = (obj, path) => {
    return path.reduce((prev, key) => {
        return prev?.[key];
    }, obj);
};

const emit = defineEmits(["update:modelValue", "keyup", "search"]);

function updateInput(event) {
    searchData.value = event.target.value;
    emit("search", event.target.value);
}

function blured() {
    setTimeout(() => {
        isFocused.value = false;
    }, 180);
}

function clicked(option) {
    const searchValue =
        props.optionKeys.length > 1
            ? reduceObject(option, props.optionKeys)
            : option[props.optionKeys];
    const emitValue =
        props.valueKeys.length > 1
            ? reduceObject(option, props.valueKeys)
            : option[props.valueKeys];

    searchData.value = searchValue;
    emit("update:modelValue", emitValue);
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
                    :value="searchData"
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
                    v-if="options.length > 0 && isFocused"
                >
                    <li v-for="option in options" :key="option.id">
                        <button
                            @click="clicked(option)"
                            type="button"
                            class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            <span v-if="optionKeys.length > 1">
                                {{ reduceObject(option, optionKeys) }}
                            </span>
                            <span v-else>{{ option[optionKeys] }}</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </form>
</template>

// last working - https://paste.sreesanth.me/udaxorofiq.django
