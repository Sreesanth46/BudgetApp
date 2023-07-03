<script setup>
import { onMounted, onUnmounted } from "vue";

onMounted(() => {
    document.body.classList.add("overflow-hidden");
});

onUnmounted(() => {
    document.body.classList.remove("overflow-hidden");
});
</script>

<template>
    <div>
        <div
            class="h-screen w-screen fixed top-0 left-0 bg-white z-50 grid place-content-center overflow-hidden"
        >
            <img src="@/assets/images/loader.gif" alt="Loading..." />
        </div>
    </div>
</template>