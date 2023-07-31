<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "@stores/UserStore";

const userStore = useUserStore();
const { getIsLoggedIn } = storeToRefs(userStore);

onMounted(async () => {
    if (localStorage.getItem("accessToken")) {
        try {
            await userStore.verifyAccessToken();
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
