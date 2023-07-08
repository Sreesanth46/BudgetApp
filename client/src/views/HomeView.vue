<script setup>
import { storeToRefs } from "pinia";
import Sidenav from "@components/Sidenav.vue";
import Navbar from "@components/Navbar.vue";
import { useCommonStore } from "@stores/CommonStore";
const commonStore = useCommonStore();
const { getIsSidenavOpen } = storeToRefs(commonStore);
</script>

<template>
    <div class="flex">
        <div
            class="h-screen md:flex-none z-0"
            :class="[getIsSidenavOpen ? 'w-64' : 'w-20']"
        >
            <Sidenav />
        </div>
        <div class="fixed top-0">
            <Navbar />
        </div>
        <div class="flex-grow pt-16 p-2">
            <router-view />
        </div>
    </div>
</template>
