<script setup>
import { onMounted } from "vue";
import { useUserStore } from "@stores/UserStore";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();

onMounted(async () => {
    if (localStorage.getItem("accessToken")) {
        try {
            await userStore.verifyAccessToken();
            router.push({ name: "Body" });
        } catch (error) {
            localStorage.removeItem("accessToken");
        }
    } else {
        router.push({ name: "Login" });
    }
});
</script>

<template>
    <div class="">
        <RouterView />
    </div>
</template>