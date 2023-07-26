<script setup>
import { onMounted } from "vue";
import { useUserStore } from "@stores/UserStore";

const userStore = useUserStore();

onMounted(async () => {
    if (localStorage.getItem("accessToken")) {
        try {
            await userStore.verifyAccessToken();
        } catch (error) {
            localStorage.removeItem("accessToken");
        }
    }
});
</script>

<template>
    <div class="">
        <RouterView />
    </div>
</template>
