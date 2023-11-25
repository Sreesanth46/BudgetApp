<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "@stores/UserStore";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();
const { getIsLoggedIn } = storeToRefs(userStore);

onMounted(async () => {
    if (localStorage.getItem("accessToken")) {
        try {
            await userStore.verifyAccessToken();
            router.push({ name: "Dashboard" });
        } catch (error) {
            localStorage.removeItem("accessToken");
        }
    } else if (getIsLoggedIn.value) {
        userStore.reset();
    }
});
</script>

<template>
    <div class="">
        <RouterView />
    </div>
</template>
